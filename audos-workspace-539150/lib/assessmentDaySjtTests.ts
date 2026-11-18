import sjt1 from '../data/assessmentday-sjt-1.json';
import sjt2 from '../data/assessmentday-sjt-2.json';
import sjt3 from '../data/assessmentday-sjt-3.json';
import sjt4 from '../data/assessmentday-sjt-4.json';
import sjt5 from '../data/assessmentday-sjt-5.json';
import type { SituationalFormat, SituationalQuestion, SituationalTest } from './situationalJudgement';

// AssessmentDay Practice Situational Judgement Tests 1-5. Each test has four
// scenarios of four situations (16 questions) in four formats, all untimed:
//   1. Most and Least Likely to Perform  - pick the most and the least likely response (4 options)
//   2. Ranked Responses                  - rank 4 responses from most to least effective
//   3. Most and Least Effective          - pick the most and the least effective response (4 options)
//   4. Rated Responses                   - rate 5 responses, each rating used once
// The Answers booklets print the model grade and commentary for every response.

type RawFormat = 'most_least_likely' | 'ranked' | 'most_least_effective' | 'rated';
type RawOption = [string, string, string];

interface RawQuestion {
  c: string;
  s: string;
  o: RawOption[];
}

interface RawSection {
  f: RawFormat;
  scenario: string;
  q: RawQuestion[];
}

interface RawSjtTest {
  n: number;
  sections: RawSection[];
}

const SOURCE = 'AssessmentDay';
const LABELS = ['A', 'B', 'C', 'D', 'E'];
const RATING_NAMES = ['Very Effective', 'Effective', 'Slightly Effective', 'Ineffective', 'Counterproductive'];
const RANK_NAMES = ['Most effective', '2nd most effective', '3rd most effective', 'Least effective'];
const MOST_LEAST_ORDER = ['M', 'R', 'W', 'L'];
const MOST_LEAST_NAMES: Record<string, string> = {
  M: 'Most effective',
  R: 'Reasonable',
  W: 'Not particularly appropriate',
  L: 'Least effective',
};

interface SectionInfo {
  format: SituationalFormat;
  title: string;
  instruction: string;
  hint: string;
  mostLabel?: string;
  leastLabel?: string;
}

const SECTIONS: Record<RawFormat, SectionInfo> = {
  most_least_likely: {
    format: 'most_least',
    title: 'Most and least likely to perform',
    instruction: 'Choose the response you would be most likely to make and the response you would be least likely to make.',
    hint: 'Read all four responses first. The most likely response is the one that deals with the cause of the problem, involves the right people and fits the company\u2019s stated policy; the least likely one ignores the issue or makes it worse.',
    mostLabel: 'Most likely',
    leastLabel: 'Least likely',
  },
  ranked: {
    format: 'ranked',
    title: 'Ranked responses',
    instruction: 'Rank the four responses from the most effective to the least effective. Use each rank once.',
    hint: 'Start by finding the best and the worst response, then place the other two between them. Prefer responses that act early, gather facts and keep the right people informed.',
  },
  most_least_effective: {
    format: 'most_least',
    title: 'Most and least effective',
    instruction: 'Choose the most effective response and the least effective response.',
    hint: 'Read all four responses first. The most effective response addresses the real problem and the people affected; the least effective one avoids responsibility or makes the situation worse.',
    mostLabel: 'Most effective',
    leastLabel: 'Least effective',
  },
  rated: {
    format: 'rated',
    title: 'Rated responses',
    instruction: 'Rate every response as Very Effective, Effective, Slightly Effective, Ineffective or Counterproductive. Use each rating once.',
    hint: 'Order the five responses from best to worst first, then give the best one Very Effective and the worst one Counterproductive.',
  },
};

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/** The printed commentary has stray closing brackets and a trailing page marker; tidy them for display. */
function tidyNote(raw: string): string {
  const text = raw.replace(/\s*-\s*End of Practice Situational Judgement Test \d+\s*-\s*$/i, '');
  let depth = 0;
  let out = '';
  for (const ch of text) {
    if (ch === '(') depth += 1;
    if (ch === ')') {
      if (depth === 0) continue;
      depth -= 1;
    }
    out += ch;
  }
  return out.replace(/(^|[^.])\.\.(?!\.)/g, '$1.').replace(/\s{2,}/g, ' ').trim();
}

function buildQuestion(test: RawSjtTest, section: RawSection, sectionIndex: number, raw: RawQuestion, questionIndex: number, questionNumber: number): SituationalQuestion {
  const info = SECTIONS[section.f];
  const labels = raw.o.map((_, index) => LABELS[index]);
  const grades = raw.o.map((option) => option[2]);
  const notes = raw.o.map((option) => tidyNote(option[1]));
  let optimalRanking: string[];
  let optionGrades: string[];
  let correctAnswer: string;
  let explanation: string;

  if (info.format === 'most_least') {
    optimalRanking = MOST_LEAST_ORDER.map((grade) => labels[grades.indexOf(grade)]);
    optionGrades = grades.map((grade) => MOST_LEAST_NAMES[grade]);
    const most = optimalRanking[0];
    const least = optimalRanking[optimalRanking.length - 1];
    correctAnswer = `${most}>${least}`;
    explanation = `Model answer: ${most} is the ${(info.mostLabel || 'most effective').toLowerCase()} response and ${least} is the ${(info.leastLabel || 'least effective').toLowerCase()} response. The other two are graded Reasonable (${optimalRanking[1]}) and Not particularly appropriate (${optimalRanking[2]}). AssessmentDay\u2019s commentary on each response is shown against it.`;
  } else {
    const names = info.format === 'ranked' ? RANK_NAMES : RATING_NAMES;
    optimalRanking = labels
      .map((label, index) => ({ label, rank: Number(grades[index]) }))
      .sort((a, b) => a.rank - b.rank)
      .map((entry) => entry.label);
    optionGrades = grades.map((grade) => names[Number(grade)]);
    correctAnswer = optimalRanking.join('>');
    explanation = `Model order, best first: ${optimalRanking.map((label, index) => `${label} (${names[index]})`).join(', ')}. AssessmentDay\u2019s commentary on each response is shown against it.`;
  }

  return {
    id: `ad-sjt-${test.n}-q${pad2(questionNumber)}`,
    kind: 'situational',
    difficulty: 'mixed',
    prompt: raw.s,
    options: raw.o.map((option) => option[0]),
    optionLabels: labels,
    correctAnswer,
    optimalRanking,
    competency: raw.c || info.title,
    explanation,
    hint: info.hint,
    format: info.format,
    scenario: section.scenario,
    sectionTitle: `Scenario ${sectionIndex + 1} \u00b7 ${info.title}`,
    instruction: info.instruction,
    mostLabel: info.mostLabel,
    leastLabel: info.leastLabel,
    optionNotes: notes,
    optionGrades,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: questionNumber,
    answerKeySource: 'official',
  };
}

function buildTest(raw: RawSjtTest): SituationalTest {
  let number = 0;
  const questions: SituationalQuestion[] = [];
  raw.sections.forEach((section, sectionIndex) => {
    section.q.forEach((question, questionIndex) => {
      number += 1;
      questions.push(buildQuestion(raw, section, sectionIndex, question, questionIndex, number));
    });
  });
  return {
    id: `ad-sjt-${raw.n}`,
    name: `${SOURCE} SJT Test ${raw.n}`,
    subtitle: `AD-SJT-${pad2(raw.n)} \u00b7 ${questions.length} questions`,
    description: 'Four workplace scenarios of four situations each, in four formats: most and least likely to perform, ranked responses, most and least effective, and rated responses. Untimed, with the official AssessmentDay model answers and commentary on every response.',
    difficulty: 'mixed',
    difficultyBreakdown: `${SOURCE} \u00b7 4 formats`,
    timeLimitSeconds: 0,
    questions,
  };
}

let cache: SituationalTest[] | null = null;

export function loadAssessmentDaySjtTests(): SituationalTest[] {
  if (!cache) {
    cache = ([sjt1, sjt2, sjt3, sjt4, sjt5] as unknown as RawSjtTest[]).map(buildTest);
  }
  return cache;
}
