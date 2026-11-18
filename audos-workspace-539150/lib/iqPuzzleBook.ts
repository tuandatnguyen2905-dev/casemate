import level01 from '../data/iq-puzzles-level-01.json';
import level02 from '../data/iq-puzzles-level-02.json';
import level03 from '../data/iq-puzzles-level-03.json';
import level04 from '../data/iq-puzzles-level-04.json';
import level05 from '../data/iq-puzzles-level-05.json';
import levels06To10 from '../data/iq-puzzles-levels-06-10.json';
import level11 from '../data/iq-puzzles-level-11.json';
import level12 from '../data/iq-puzzles-level-12.json';
import level13 from '../data/iq-puzzles-level-13.json';
import level14 from '../data/iq-puzzles-level-14.json';
import level15 from '../data/iq-puzzles-level-15.json';
import levels16To18 from '../data/iq-puzzles-levels-16-18.json';
import levels19To20 from '../data/iq-puzzles-levels-19-20.json';

export const IQ_PUZZLES_PDF_URL = 'https://storage.googleapis.com/audos-images/attachments/general/829d60aa-8fe2-4684-a601-515bf084cc48.pdf';

export type IqPuzzleCategory =
  | 'numerical'
  | 'diagrammatic'
  | 'inductive'
  | 'spatial'
  | 'verbal'
  | 'deductive'
  | 'error_checking';

export interface IqPuzzleQuestion {
  kind: 'iq_puzzle';
  id: string;
  difficulty: 'mixed';
  sourceOrganization: string;
  prompt: string;
  correctAnswer: string;
  explanation: string;
  puzzleCategory: IqPuzzleCategory;
  puzzleNumber: number;
  pdfPage: number;
  crop: { x: number; y: number; width: number; height: number };
  answerMode: 'text' | 'self';
}

export interface IqPuzzleTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  timeLimitSeconds: 0;
  sourceOrganization: string;
  questions: IqPuzzleQuestion[];
}

interface RawLevel {
  level: number;
  name: string;
  subtitle: string;
  description: string;
  sourceOrganization: string;
  timeLimitSeconds: number;
  questions: IqPuzzleQuestion[];
}

const rawLevels = [
  level01,
  level02,
  level03,
  level04,
  level05,
  ...(levels06To10 as unknown as { tests: RawLevel[] }).tests,
  level11,
  level12,
  level13,
  level14,
  level15,
  ...(levels16To18 as unknown as { tests: RawLevel[] }).tests,
  ...(levels19To20 as unknown as { tests: RawLevel[] }).tests,
] as unknown as RawLevel[];

let cache: IqPuzzleTest[] | null = null;

export function loadIqPuzzleBook(): IqPuzzleTest[] {
  if (!cache) {
    cache = rawLevels
      .slice()
      .sort((a, b) => a.level - b.level)
      .map((level) => ({
        id: `iq-puzzles-level-${String(level.level).padStart(2, '0')}`,
        name: level.name,
        subtitle: level.subtitle,
        description: level.description,
        difficulty: 'mixed',
        timeLimitSeconds: 0,
        sourceOrganization: level.sourceOrganization,
        questions: (level.questions as unknown as IqPuzzleQuestion[][]).flat() as IqPuzzleQuestion[],
      }));
  }
  return cache;
}
