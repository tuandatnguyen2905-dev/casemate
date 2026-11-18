import part1 from '../data/career-aptitude-barrett-part-1.json';
import part2 from '../data/career-aptitude-barrett-part-2.json';
import part3 from '../data/career-aptitude-barrett-part-3.json';
import part4 from '../data/career-aptitude-barrett-part-4.json';

export const CAREER_APTITUDE_PDF_URL = 'https://storage.googleapis.com/audos-images/attachments/general/5453dcdd-9e7c-40b6-8617-7ead7cfab1fd.pdf';

export type CareerAptitudeCategory =
  | 'verification'
  | 'formation'
  | 'physical_analysis'
  | 'verbal_penetration'
  | 'numerical_deduction'
  | 'observation'
  | 'critical_dissection';

export interface CareerAptitudeOption {
  label: string;
  text: string;
}

export interface CareerAptitudeQuestion {
  kind: 'career_aptitude';
  id: string;
  difficulty: 'mixed';
  sourceOrganization: string;
  prompt: string;
  options: CareerAptitudeOption[];
  correctAnswer: string;
  explanation: string;
  aptitudeCategory: CareerAptitudeCategory;
  questionNumber: number;
  pdfPage: number;
  crop: { x: number; y: number; width: number; height: number };
  answerMode: 'choice';
}

export interface CareerAptitudeTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  timeLimitSeconds: number;
  sourceOrganization: string;
  instructions: string;
  questions: CareerAptitudeQuestion[];
}

interface RawPart {
  tests: CareerAptitudeTest[];
}

let cache: CareerAptitudeTest[] | null = null;

export function loadCareerAptitudeBook(): CareerAptitudeTest[] {
  if (!cache) {
    cache = [part1, part2, part3, part4]
      .flatMap((part) => (part as unknown as RawPart).tests)
      .map((test) => ({
        ...test,
        difficulty: 'mixed' as const,
        questions: test.questions.map((question) => ({
          ...question,
          difficulty: 'mixed' as const,
        })),
      }));
  }
  return cache;
}
