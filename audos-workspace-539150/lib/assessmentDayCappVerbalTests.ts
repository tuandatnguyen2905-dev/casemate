import capp1 from '../data/assessmentday-capp-verbal-1.json';
import capp2 from '../data/assessmentday-capp-verbal-2.json';
import capp3 from '../data/assessmentday-capp-verbal-3.json';
import capp4 from '../data/assessmentday-capp-verbal-4.json';
import type { VerbalQuestion, VerbalTest } from './verbalReasoning';

// AssessmentDay Capp Verbal tests: 15 sets per test, untimed. Every set shares
// one stimulus and asks about each of its items:
//   ab    - which of two messages (A or B) a response replies to / resembles in style
//   cloze - choose the right word for a gap (lettered options)
//   fix   - type the corrected spelling, word or punctuation
//   rank  - place a response 1st to 5th from most positive (or best received)
//   tfcs  - True / False / Cannot Say
// Each item becomes one question that repeats the shared stimulus above it.

type SetKind = 'ab' | 'cloze' | 'fix' | 'rank' | 'tfcs';

type RawItemTuple = [string, string[], string, string];

interface RawSet {
  s: number;
  k: SetKind;
  g?: string;
  p: string;
  i: RawItemTuple[];
}

interface RawCappVerbalTest {
  n: number;
  sets: RawSet[];
}

const SOURCE = 'AssessmentDay';
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const RANKS = ['1st', '2nd', '3rd', '4th', '5th'];
const TFCS = ['True', 'False', 'Cannot Say'];

// Test 4 asks which passage a message resembles (not which it replies to) for these sets.
const STYLE_MATCH_SETS: Record<number, number[]> = { 4: [2, 6] };
// Test 4 set 8 ranks responses by how well they were received rather than how positive they are.
const RECEPTION_SETS: Record<number, number[]> = { 4: [8] };

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function normaliseTyped(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function acceptedSpellings(answer: string): string[] {
  const variants = [normaliseTyped(answer), normaliseTyped(answer.replace(/['\u2019]/g, ''))];
  return variants.filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);
}

function passageLabelFor(kind: SetKind): string {
  switch (kind) {
    case 'ab': return 'Messages A and B';
    case 'cloze': return 'Passage with word choices';
    case 'fix': return 'Passage to correct';
    case 'rank': return 'Responses to rank';
    default: return 'Passage';
  }
}

function buildQuestion(test: RawCappVerbalTest, set: RawSet, item: RawItemTuple, itemIndex: number, questionNumber: number): VerbalQuestion {
  const [text, rawOptions, answer, officialExplanation] = item;
  const id = `capp-verbal-${test.n}-s${pad2(set.s)}-q${itemIndex + 1}`;
  const base = {
    kind: 'verbal' as const,
    id,
    difficulty: 'mixed' as const,
    passage: set.p,
    passageLabel: passageLabelFor(set.k),
    patternName: `${SOURCE} Capp Verbal Test ${test.n} - set ${set.s} (${set.k === 'ab' ? 'message style' : set.k === 'cloze' ? 'word choice' : set.k === 'fix' ? 'corrections' : set.k === 'rank' ? 'ranking' : 'True / False / Cannot Say'})`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: questionNumber,
    answerKeySource: 'official' as const,
  };
  const note = officialExplanation ? `\n\nAssessmentDay explanation: ${officialExplanation}` : '';

  if (set.k === 'ab') {
    const styleMatch = (STYLE_MATCH_SETS[test.n] || []).includes(set.s);
    const correct = `Passage ${answer}`;
    const guide = set.g ? `\n\nStyle of the two messages: ${set.g}` : '';
    return {
      ...base,
      promptLabel: 'Response',
      prompt: styleMatch
        ? `Which passage does this message match more closely in style, A or B? ${text}`
        : `Which message does this response best reply to, A or B? Judge by style of communication only. ${text}`,
      options: ['Passage A', 'Passage B'],
      optionLabels: ['Passage A', 'Passage B'],
      correctAnswer: correct,
      explanation: `Correct answer: ${correct}.${guide}${note}`,
    };
  }

  if (set.k === 'cloze') {
    const labels = rawOptions.map((_, index) => LETTERS[index]);
    return {
      ...base,
      promptLabel: 'Word choice',
      prompt: `Choose the word that correctly completes the gap: ${text}`,
      options: labels,
      optionLabels: labels,
      optionTexts: rawOptions,
      correctAnswer: answer,
      explanation: `Correct answer: ${answer} (${rawOptions[LETTERS.indexOf(answer)]}).${note}`,
    };
  }

  if (set.k === 'fix') {
    return {
      ...base,
      promptLabel: 'Correction',
      prompt: `Type the corrected word (fix the error in spelling, grammar or punctuation): ${text}`,
      options: [],
      optionLabels: [],
      correctAnswer: answer,
      answerKind: 'text',
      textAccept: acceptedSpellings(answer),
      textExact: true,
      answerLabel: answer,
      explanation: `Correct answer: ${answer}.${answer === answer.toLowerCase() ? '' : ' Capital letters are not marked, so a lower-case answer is also accepted.'}${note}`,
    };
  }

  if (set.k === 'rank') {
    const reception = (RECEPTION_SETS[test.n] || []).includes(set.s);
    return {
      ...base,
      promptLabel: 'Response',
      prompt: reception
        ? `Where does this response rank, from 1st (most well-received) to 5th (least well-received), judged by its language? ${text}`
        : `Where does this response rank, from 1st (most positive) to 5th (least positive)? ${text}`,
      options: RANKS.slice(),
      optionLabels: RANKS.slice(),
      correctAnswer: answer,
      explanation: `Correct position: ${answer}.${note}`,
    };
  }

  return {
    ...base,
    promptLabel: 'Statement',
    prompt: text,
    options: TFCS.slice(),
    optionLabels: TFCS.slice(),
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}.${note}`,
  };
}

function buildTest(raw: RawCappVerbalTest): VerbalTest {
  let number = 0;
  const questions: VerbalQuestion[] = [];
  raw.sets.forEach((set) => {
    set.i.forEach((item, itemIndex) => {
      number += 1;
      questions.push(buildQuestion(raw, set, item, itemIndex, number));
    });
  });
  return {
    id: `capp-verbal-${raw.n}`,
    name: `${SOURCE} Capp Verbal Test ${raw.n}`,
    subtitle: `AD-CAPP-${pad2(raw.n)} \u00b7 ${questions.length} questions`,
    description: `${raw.sets.length} sets, untimed: match responses to message style (A or B), choose the right word for a gap, type the correction for a spelling, grammar or punctuation error, rank responses from most to least positive, and judge True / False / Cannot Say statements. Official AssessmentDay answers and explanations.`,
    difficulty: 'mixed',
    timeLimitSeconds: 0,
    questions,
    sourceOrganization: SOURCE,
    answerKeySource: 'official',
  };
}

let cache: VerbalTest[] | null = null;

export function loadAssessmentDayCappVerbalTests(): VerbalTest[] {
  if (!cache) {
    cache = ([capp1, capp2, capp3, capp4] as unknown as RawCappVerbalTest[]).map(buildTest);
  }
  return cache;
}
