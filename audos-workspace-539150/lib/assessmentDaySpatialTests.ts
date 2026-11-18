import sourceTests from '../data/assessmentday-spatial-tests.json';
import type { SpatialExpandedQuestion, SpatialTest } from './spatial';

// AssessmentDay Spatial Reasoning tests 1-4: 22 picture questions each with four
// labelled options (A-D) and 40 seconds per question. The question artwork is
// the original booklet page, drawn at runtime from the booklet PDF (see
// SpatialPdfFigure in apps/AptitudeTest/App.tsx); the answers come from the
// matching Solutions booklets, which print the answer letter only.

export interface SpatialPdfSource {
  url: string;
  page: number;
  /** Crop box in PDF points: [x0, y0, x1, y1]. */
  box: [number, number, number, number];
}

interface RawQuestion {
  q: number;
  p: number;
  t: string;
  a: 'A' | 'B' | 'C' | 'D';
  b: [number, number, number, number];
}

interface RawTest {
  id: string;
  n: number;
  pdf: string;
  sec: number;
  questions: RawQuestion[];
}

const SOURCE = 'AssessmentDay';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawTest, raw: RawQuestion): SpatialExpandedQuestion {
  return {
    kind: 'spatial',
    id: `${test.id}-q${pad2(raw.q)}`,
    difficulty: 'mixed',
    prompt: raw.t,
    stimulus: [],
    options: [],
    optionLabels: ['A', 'B', 'C', 'D'],
    correctAnswer: raw.a,
    explanation: `Correct answer: ${raw.a}. AssessmentDay's Solutions booklet prints the answer only, with no worked explanation. Try the manipulation again in your head, or sketch it, to see why the other options fail.`,
    patternName: `${SOURCE} Spatial Reasoning Test ${test.n} - question ${raw.q}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: raw.q,
    pdfSource: { url: test.pdf, page: raw.p, box: raw.b } as SpatialPdfSource,
  } as unknown as SpatialExpandedQuestion;
}

function buildTest(raw: RawTest): SpatialTest {
  const count = raw.questions.length;
  return {
    id: raw.id,
    name: `${SOURCE} Spatial Reasoning Test ${raw.n}`,
    subtitle: `AD-SR-${pad2(raw.n)} \u00b7 ${count} questions`,
    description: `${count} picture questions with four labelled options: rotations, reflections, folding nets into cubes, boxes and pyramids, assembling pieces and top views. ${raw.sec} seconds per question. Official AssessmentDay answers.`,
    difficulty: 'mixed',
    difficultyBreakdown: 'Source test',
    timeLimitSeconds: raw.sec * count,
    questions: raw.questions.map((question) => buildQuestion(raw, question)),
    sourceOrganization: SOURCE,
  } as unknown as SpatialTest;
}

let cache: SpatialTest[] | null = null;

export function loadAssessmentDaySpatialTests(): SpatialTest[] {
  if (!cache) {
    cache = (sourceTests as unknown as { tests: RawTest[] }).tests
      .slice()
      .sort((a, b) => a.n - b.n)
      .map(buildTest);
  }
  return cache;
}
