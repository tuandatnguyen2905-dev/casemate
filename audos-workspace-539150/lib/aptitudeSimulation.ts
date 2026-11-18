import test01 from '../data/aptitude-sim-test-01.json';
import test02 from '../data/aptitude-sim-test-02.json';
import mock from '../data/aptitude-sim-mock.json';

// Aptitude Test Simulation: full-length 25-question rounds modelled on the
// Talented Candidate 2022 (UVTN) Round 1 aptitude test. Text is transcribed from
// the supplied files; charts, tables and abstract figures are drawn at runtime
// from the original PDF pages (see components/PdfCropFigure.tsx).

/** [pdf page, x0, y0, x1, y1] in PDF points. */
export type SimCrop = [number, number, number, number, number];
export type SimSection = 'V' | 'Q' | 'A';

export const SECTION_LABEL: Record<SimSection, string> = {
  V: 'Verbal Reasoning',
  Q: 'Quantitative Reasoning',
  A: 'Abstract Reasoning',
};

export interface SimGroup {
  title: string;
  intro?: string;
  note?: string;
  before: SimCrop[];
}

export interface SimQuestion {
  n: number;
  sec: SimSection;
  group?: SimGroup;
  intro?: string;
  introTitle?: string;
  before: SimCrop[];
  stem: string;
  after: SimCrop[];
  /** Option texts; empty when the options are the lettered pictures. */
  options: string[];
  labels: string[];
  answer: string;
  review: SimCrop[];
}

export interface SimTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  minutes: number;
  url: string;
  keyUrl: string | null;
  keyNote: string;
  questions: SimQuestion[];
}

interface RawQuestion {
  n: number;
  sec: SimSection;
  g?: string;
  intro?: string;
  introTitle?: string;
  before?: SimCrop[];
  stem?: string;
  after?: SimCrop[];
  tf?: boolean;
  ds?: boolean;
  sets?: boolean;
  letters?: number;
  options?: string[];
  answer: string;
  review?: SimCrop[];
}

interface RawTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  minutes: number;
  url: string;
  keyUrl?: string;
  keyNote: string;
  groups?: Record<string, SimGroup>;
  questions: RawQuestion[];
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const TRUE_FALSE = ['True', 'False', 'Can\u2019t tell'];
const SETS = ['Set A', 'Set B', 'Neither'];
const SUFFICIENCY = [
  'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.',
  'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.',
  'Statements (1) and (2) TOGETHER are NOT SUFFICIENT.',
  'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
  'EACH statement ALONE is sufficient.',
];

function build(raw: RawTest): SimTest {
  const byNumber = new Map<number, RawQuestion>();
  raw.questions.forEach((q) => byNumber.set(q.n, q));
  const questions = raw.questions.map((q): SimQuestion => {
    let intro = q.intro;
    let introTitle = q.introTitle;
    if (intro && intro.startsWith('@')) {
      const source = byNumber.get(Number(intro.slice(1)));
      intro = source?.intro;
      introTitle = introTitle || source?.introTitle;
    }
    const options = q.tf ? TRUE_FALSE : q.ds ? SUFFICIENCY : q.sets ? SETS : q.options || [];
    const count = options.length || q.letters || 0;
    return {
      n: q.n,
      sec: q.sec,
      group: q.g && raw.groups ? raw.groups[q.g] : undefined,
      intro,
      introTitle,
      before: q.before || [],
      stem: q.stem || '',
      after: q.after || [],
      options: q.letters ? [] : options,
      labels: LETTERS.slice(0, count),
      answer: q.answer,
      review: q.review || [],
    };
  });
  return {
    id: raw.id,
    name: raw.name,
    subtitle: raw.subtitle,
    description: raw.description,
    minutes: raw.minutes,
    url: raw.url,
    keyUrl: raw.keyUrl || null,
    keyNote: raw.keyNote,
    questions,
  };
}

let cache: SimTest[] | null = null;

export function loadSimulationTests(): SimTest[] {
  if (!cache) {
    cache = [test01, test02, mock].map((raw) => build(raw as unknown as RawTest));
  }
  return cache;
}
