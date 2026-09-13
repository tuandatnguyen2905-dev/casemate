// Casemate — Diagrammatic Reasoning question bank (50 questions / 5 tests).
//
// LANGUAGE: this bank is ENGLISH throughout — test names, descriptions, the
// pattern label on every question, and (via lib/diagrammatic.ts) the rule
// explanation in the answer review. The aptitude round at Techcombank,
// Unilever, L'Oréal and the rest is sat in English, so practising in English is
// the point, not an oversight.
//
// WHY THIS IS A .ts MODULE AND NOT A .json IMPORT: the space compiler cannot
// import a JSON file at runtime (same constraint documented in
// lib/caseLibraryShared.ts and lib/programTimelines.ts). The bank therefore
// lives here as a typed constant, and data/diagrammatic-questions.json holds a
// byte-identical mirror so the question set stays readable/diffable outside
// the code. Edit BOTH when you change a question.
//
// Each entry is a COMPACT RULE SPEC, not an expanded grid: lib/diagrammatic.ts
// derives the eight visible cells, the correct option, the four near-miss
// distractors and the explanation from the same rule, so the answer key can
// never drift away from the picture on screen.
//
// SOURCE MATERIAL. The five AssessmentDay practice booklets the founder
// supplied use two formats, and both are represented here:
//   * booklets 1, 3, 4, 5 — "Set A / Set B / neither" classification
//     (30 questions each). Rebuilt as the `set_ab` tests below.
//   * booklet 2 — input → operator → output process diagrams (20 questions).
//     Rebuilt as `3x3` matrix and 4/5-step sequence tests, which is the same
//     "apply the hidden transformation" skill in the format Vietnamese MT
//     programmes actually use on screen.
// The rule vocabulary (count, shaded/striped, distinct shape types, total
// straight edges, odd/even, curved vs straight, size, corner position) is
// lifted from the booklets' own solution pages.

import type { BankSpec, ExpandedQuestion, ExpandedTest } from './diagrammatic';
import { expandQuestion } from './diagrammatic';

export const DIAGRAMMATIC_BANK: BankSpec = {
  version: '1.1.0',
  sourceNote:
    'Question patterns recreated from the five AssessmentDay Diagrammatic Reasoning practice booklets (Tests 1-5). Booklets 1, 3, 4 and 5 use the Set A / Set B / neither classification format; booklet 2 uses an input-operator-output process format. Casemate rebuilds both families as structured rule specs rendered live as SVG. All wording is English, matching the language the real aptitude round is sat in.',
  tests: [
    {
      id: 'diagrammatic-test-1',
      name: 'Test 1',
      format: 'matrix',
      subtitle: 'Matrices & sequences — starter',
      description:
        'Every question runs a SINGLE rule: rotation, fill, count, size, position or shape type. Start here if you have never sat a diagrammatic test.',
      difficulty: 'easy',
      timeLimitSeconds: 720,
      questions: [
        { id: 'd1q01', d: 'easy', g: 'sequence_5', t: 'arrow', r: { rotation: ['col', 0, 45] }, src: 'AssessmentDay Test 2 (transformation sequence)' },
        { id: 'd1q02', d: 'easy', g: '3x3', t: 'square', r: { fill: ['byr', 'outline', 'striped', 'solid'] }, src: 'AssessmentDay Test 1 Q10 (striped / shaded / unshaded)' },
        { id: 'd1q03', d: 'easy', g: '3x3', t: 'circle', r: { count: ['byc', 1, 2, 3] }, src: 'AssessmentDay Test 1 Q20 (counting circles)' },
        { id: 'd1q04', d: 'easy', g: '3x3', t: 'triangle', r: { size: ['byc', 'small', 'medium', 'large'] }, src: 'AssessmentDay Test 1 Q25 (comparing sizes)' },
        { id: 'd1q05', d: 'easy', g: '3x3', t: 'lshape', r: { rotation: ['row', 0, 90] }, src: 'AssessmentDay Test 2 (operator: rotate)' },
        { id: 'd1q06', d: 'easy', g: '3x3', t: 'circle', r: { type: ['byr', 'circle', 'square', 'triangle'] }, src: 'AssessmentDay Test 1 Q11 (different shape types)' },
        { id: 'd1q07', d: 'easy', g: 'sequence_5', t: 'hexagon', r: { fill: ['cyc', 'outline', 'solid'] }, src: 'AssessmentDay Test 1 Q15 (alternating shaded / unshaded)' },
        { id: 'd1q08', d: 'easy', g: '3x3', t: 'star5', r: { position: ['byc', 'top-left', 'center', 'bottom-right'] }, src: 'AssessmentDay Test 1 Q22 (corner position)' },
        { id: 'd1q09', d: 'easy', g: 'sequence_4', t: 'diamond', r: { count: ['cyc', 1, 2, 3, 4] }, src: 'AssessmentDay Test 1 Q12 (increasing count)' },
        { id: 'd1q10', d: 'easy', g: 'sequence_4', t: 'tshape', r: { rotation: ['col', 0, 90] }, src: 'AssessmentDay Test 2 (operator: rotate 90°)' },
      ],
    },
    {
      id: 'diagrammatic-test-2',
      name: 'Test 2',
      format: 'set_ab',
      subtitle: 'Set A / Set B — starter',
      description:
        'The exact format of the source booklets: two sets of figures, each following its own rule. Work out both rules, then decide whether the question figure belongs to set A, set B, or neither.',
      difficulty: 'easy',
      timeLimitSeconds: 600,
      questions: [
        { id: 'd2q01', d: 'easy', g: 'set_ab', t: ['star5'], a: ['count', 4], b: ['count', 3], ans: 'A', src: 'AssessmentDay Test 1 Q1 / Q24 (counting shapes)' },
        { id: 'd2q02', d: 'easy', g: 'set_ab', t: ['circle', 'square', 'triangle'], a: ['shaded', 1], b: ['shaded', 2], ans: 'B', src: 'AssessmentDay Test 1 Q4 (number of shaded shapes)' },
        { id: 'd2q03', d: 'easy', g: 'set_ab', t: ['circle', 'square', 'triangle', 'pentagon', 'hexagon'], a: ['distinct', 3], b: ['distinct', 2], ans: 'B', src: 'AssessmentDay Test 1 Q11 (number of different shape KINDS)' },
        { id: 'd2q04', d: 'medium', g: 'set_ab', t: ['circle', 'square', 'triangle', 'spiral'], a: ['family', 'curved'], b: ['family', 'straight'], ans: 'C', src: 'AssessmentDay Test 1 Q5 (curved vs straight edges)' },
        { id: 'd2q05', d: 'medium', g: 'set_ab', t: ['square', 'triangle', 'hexagon'], a: ['striped', 2], b: ['striped', 1], ans: 'A', src: 'AssessmentDay Test 1 Q10 (striped shapes)' },
        { id: 'd2q06', d: 'medium', g: 'set_ab', t: ['star5', 'circle'], a: ['parity', 'even'], b: ['parity', 'odd'], ans: 'A', src: 'AssessmentDay Test 1 Q12 (even / odd count)' },
        { id: 'd2q07', d: 'medium', g: 'set_ab', t: ['square', 'circle', 'triangle'], a: ['large', 1], b: ['large', 2], ans: 'B', src: 'AssessmentDay Test 1 Q25 (comparing sizes)' },
        { id: 'd2q08', d: 'hard', g: 'set_ab', t: ['triangle', 'square', 'pentagon', 'hexagon'], a: ['edges', 12], b: ['edges', 9], ans: 'A', src: 'AssessmentDay Test 1 Q19 / Q30 (total straight edges)' },
        { id: 'd2q09', d: 'hard', g: 'set_ab', t: ['diamond', 'cross'], a: ['count', 5], b: ['count', 4], ans: 'C', src: 'AssessmentDay Test 1 Q26 (counting blocks)' },
        { id: 'd2q10', d: 'hard', g: 'set_ab', t: ['square', 'pentagon', 'star5', 'circle'], a: ['shaded', 3], b: ['striped', 2], ans: 'C', src: 'AssessmentDay Test 1 Q13 / Q29 (fill style by shape type)' },
      ],
    },
    {
      id: 'diagrammatic-test-3',
      name: 'Test 3',
      format: 'matrix',
      subtitle: 'Matrices & sequences — two rules',
      description:
        'Every question runs TWO rules in parallel (rotation + fill, or count + colour). This is the level you will actually meet in the aptitude round at Techcombank, Unilever and L’Oréal.',
      difficulty: 'medium',
      timeLimitSeconds: 720,
      questions: [
        { id: 'd3q01', d: 'medium', g: '3x3', t: 'arrow', r: { rotation: ['col', 0, 90], fill: ['byr', 'outline', 'striped', 'solid'] }, src: 'AssessmentDay Test 2 (two operators in series)' },
        { id: 'd3q02', d: 'medium', g: '3x3', t: 'pentagon', r: { size: ['lat', 'small', 'medium', 'large'], fill: ['latr', 'outline', 'solid', 'striped'] }, src: 'AssessmentDay Test 4 (no repeat within a row or column)' },
        { id: 'd3q03', d: 'medium', g: 'sequence_5', t: 'spiral', r: { rotation: ['col', 0, 45], size: ['cyc', 'small', 'medium', 'large'] }, src: 'AssessmentDay Test 2 (two-property sequence)' },
        { id: 'd3q04', d: 'medium', g: '3x3', t: 'circle', r: { count: ['byr', 1, 2, 3], color: ['byc', 'ink', 'red', 'blue'] }, src: 'AssessmentDay Test 3 (colour as a rule)' },
        { id: 'd3q05', d: 'medium', g: '3x3', t: 'tshape', r: { rotation: ['grid', 0, 90, 45] }, src: 'AssessmentDay Test 2 (rotation across both rows and columns)' },
        { id: 'd3q06', d: 'medium', g: '3x3', t: 'star6', r: { count: ['lat', 1, 2, 3], position: ['byr', 'top-left', 'center', 'bottom-right'] }, src: 'AssessmentDay Test 1 Q22 (position + count)' },
        { id: 'd3q07', d: 'medium', g: 'sequence_4', t: 'lshape', r: { rotation: ['col', 0, 90], fill: ['cyc', 'solid', 'outline'] }, src: 'AssessmentDay Test 2 (rotation + alternating fill)' },
        { id: 'd3q08', d: 'medium', g: '3x3', t: 'circle', r: { type: ['lat', 'circle', 'square', 'triangle'], fill: ['byr', 'outline', 'striped', 'solid'] }, src: 'AssessmentDay Test 4 (shape type + fill style)' },
        { id: 'd3q09', d: 'medium', g: '3x3', t: 'hexagon', r: { size: ['byc', 'large', 'medium', 'small'], count: ['byr', 3, 2, 1] }, src: 'AssessmentDay Test 5 (size + count moving in opposite directions)' },
        { id: 'd3q10', d: 'medium', g: 'sequence_5', t: 'arrow', r: { rotation: ['col', 0, -45], count: ['cyc', 1, 2] }, src: 'AssessmentDay Test 2 (anticlockwise rotation)' },
      ],
    },
    {
      id: 'diagrammatic-test-4',
      name: 'Test 4',
      format: 'set_ab',
      subtitle: 'Set A / Set B — advanced',
      description:
        'The same two-set format, but the rules are far harder to spot: total straight edges, how many KINDS of shape, two fill styles crossing over. Several questions answer “neither set”.',
      difficulty: 'hard',
      timeLimitSeconds: 600,
      questions: [
        { id: 'd4q01', d: 'medium', g: 'set_ab', t: ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star5'], a: ['distinct', 4], b: ['distinct', 3], ans: 'A', src: 'AssessmentDay Test 1 Q11 (number of shape kinds)' },
        { id: 'd4q02', d: 'medium', g: 'set_ab', t: ['square', 'triangle', 'star5'], a: ['shaded', 2], b: ['shaded', 3], ans: 'C', src: 'AssessmentDay Test 1 Q24 (number of shaded shapes)' },
        { id: 'd4q03', d: 'medium', g: 'set_ab', t: ['circle', 'square', 'diamond'], a: ['large', 2], b: ['large', 3], ans: 'B', src: 'AssessmentDay Test 1 Q25 (size)' },
        { id: 'd4q04', d: 'medium', g: 'set_ab', t: ['cross', 'hexagon'], a: ['count', 3], b: ['count', 5], ans: 'C', src: 'AssessmentDay Test 1 Q26 (counting blocks)' },
        { id: 'd4q05', d: 'hard', g: 'set_ab', t: ['triangle', 'square', 'pentagon', 'hexagon', 'star4'], a: ['edges', 16], b: ['edges', 10], ans: 'B', src: 'AssessmentDay Test 1 Q19 / Q30 (total straight edges)' },
        { id: 'd4q06', d: 'hard', g: 'set_ab', t: ['square', 'pentagon', 'hexagon', 'star5'], a: ['striped', 3], b: ['striped', 1], ans: 'A', src: 'AssessmentDay Test 1 Q21 (counting striped shapes)' },
        { id: 'd4q07', d: 'hard', g: 'set_ab', t: ['circle', 'spiral', 'square', 'pentagon'], a: ['family', 'straight'], b: ['family', 'curved'], ans: 'A', src: 'AssessmentDay Test 1 Q5 (curved vs straight edges)' },
        { id: 'd4q08', d: 'hard', g: 'set_ab', t: ['star4', 'triangle'], a: ['parity', 'odd'], b: ['parity', 'even'], ans: 'B', src: 'AssessmentDay Test 1 Q12 (even / odd)' },
        { id: 'd4q09', d: 'hard', g: 'set_ab', t: ['square', 'circle', 'pentagon', 'star5'], a: ['shaded', 1], b: ['striped', 1], ans: 'C', src: 'AssessmentDay Test 1 Q13 (only one kind is shaded)' },
        { id: 'd4q10', d: 'hard', g: 'set_ab', t: ['diamond', 'triangle'], a: ['count', 6], b: ['count', 4], ans: 'A', src: 'AssessmentDay Test 1 Q3 (counting elements)' },
      ],
    },
    {
      id: 'diagrammatic-test-5',
      name: 'Test 5',
      format: 'matrix',
      subtitle: 'Matrices & sequences — three rules',
      description:
        'The hardest level: THREE rules running on one figure at the same time. Clear this and the aptitude round at most MT programmes will feel easy.',
      difficulty: 'hard',
      timeLimitSeconds: 900,
      questions: [
        { id: 'd5q01', d: 'hard', g: '3x3', t: 'arrow', r: { rotation: ['col', 0, 90], fill: ['byr', 'outline', 'striped', 'solid'], size: ['lat', 'small', 'medium', 'large'] }, src: 'AssessmentDay Test 2 (three operators in series)' },
        { id: 'd5q02', d: 'hard', g: '3x3', t: 'arrow', r: { type: ['lat', 'arrow', 'lshape', 'tshape'], rotation: ['row', 0, 90], fill: ['byc', 'solid', 'outline', 'striped'] }, src: 'AssessmentDay Test 4 (shape type + rotation + fill)' },
        { id: 'd5q03', d: 'hard', g: '3x3', t: 'star5', r: { count: ['lat', 1, 2, 3], fill: ['latr', 'solid', 'outline', 'striped'], position: ['byr', 'top-left', 'center', 'bottom-right'] }, src: 'AssessmentDay Test 1 Q1 (shaded star + position)' },
        { id: 'd5q04', d: 'hard', g: 'sequence_5', t: 'spiral', r: { rotation: ['col', 0, 45], size: ['cyc', 'small', 'medium', 'large'], fill: ['cyc', 'outline', 'solid'] }, src: 'AssessmentDay Test 2 (three-property sequence)' },
        { id: 'd5q05', d: 'hard', g: '3x3', t: 'hexagon', r: { count: ['lat', 1, 2, 3], size: ['latr', 'small', 'medium', 'large'], fill: ['byr', 'outline', 'striped', 'solid'] }, src: 'AssessmentDay Test 5 (three latin-square properties)' },
        { id: 'd5q06', d: 'hard', g: '3x3', t: 'tshape', r: { rotation: ['grid', 0, 45, 90], count: ['byc', 1, 2, 3], fill: ['byr', 'solid', 'outline', 'striped'] }, src: 'AssessmentDay Test 2 (two-way rotation + count)' },
        { id: 'd5q07', d: 'hard', g: 'sequence_4', t: 'lshape', r: { rotation: ['col', 0, 90], fill: ['cyc', 'solid', 'striped', 'outline'], count: ['cyc', 1, 2] }, src: 'AssessmentDay Test 2 (three rules on offset cycles)' },
        { id: 'd5q08', d: 'hard', g: '3x3', t: 'pentagon', r: { type: ['latr', 'pentagon', 'hexagon', 'star6'], fill: ['lat', 'outline', 'solid', 'striped'], size: ['byr', 'small', 'medium', 'large'] }, src: 'AssessmentDay Test 4 (three overlapping latin squares)' },
        { id: 'd5q09', d: 'hard', g: '3x3', t: 'arrow', r: { rotation: ['lat', 0, 120, 240], position: ['lat', 'top-left', 'center', 'bottom-right'], count: ['byc', 1, 2, 3] }, src: 'AssessmentDay Test 5 (rotation + position + count)' },
        { id: 'd5q10', d: 'hard', g: 'sequence_5', t: 'arrow', r: { rotation: ['col', 0, 45], size: ['cyc', 'small', 'large'], position: ['cyc', 'top-left', 'center', 'bottom-right'] }, src: 'AssessmentDay Test 2 (three different cycle lengths)' },
      ],
    },
  ],
};

/**
 * Expand the whole bank for the UI. A spec that cannot be expanded (an
 * impossible set rule, say) is DROPPED with a console error rather than
 * throwing — one bad question must never take the whole app down mid-test.
 */
export function loadDiagrammaticTests(): ExpandedTest[] {
  return DIAGRAMMATIC_BANK.tests
    .map((test) => {
      const questions: ExpandedQuestion[] = [];
      test.questions.forEach((spec) => {
        try {
          questions.push(expandQuestion(spec));
        } catch (error) {
          console.error(`[aptitude] skipping question ${spec.id}:`, error);
        }
      });
      return {
        id: test.id,
        name: test.name,
        format: test.format,
        subtitle: test.subtitle,
        description: test.description,
        difficulty: test.difficulty,
        timeLimitSeconds: test.timeLimitSeconds,
        questions,
      };
    })
    .filter((test) => test.questions.length > 0);
}
