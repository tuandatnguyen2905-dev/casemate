// Casemate — Aptitude Test server side: the `get_aptitude_test_info` MCP tool
// Mate can call mid-conversation, and the workspace hook behind it.
//
// WHY A HOOK AND NOT A DIRECT DB READ: a customer-tools registry entry can only
// call an allow-listed endpoint, and it carries the visitor's session rather
// than a workspace DB token. So the tool points at this hook's public execute
// alias (/api/hooks/execute/workspace-539150/casemate-aptitude-info-v1); the
// platform forwards X-Session-Id, and the hook resolves that into the
// candidate's own aptitude_attempts rows.
//
// The hook answers two different questions in one call, because Mate normally
// needs both at once:
//   1. WHAT EXISTS — all eight live aptitude families and every test with its
//      question count, time limit and difficulty range.
//   2. HOW THIS CANDIDATE IS DOING — attempts, best score, most recent score.
//
// KEEPING THE CATALOGUE IN SYNC: the hook cannot import
// lib/diagrammaticLibrary.ts (it runs in a sandbox with no module loader), so
// the test list is rebuilt below. Bump
// CATALOGUE_VERSION whenever the library changes and the next app open
// re-deploys the hook automatically.

const WORKSPACE_ID = 'workspace-539150';

export const APTITUDE_HOOK_NAME = 'casemate-aptitude-info-v1';
export const APTITUDE_TOOL_NAME = 'get_aptitude_test_info';

/** Bump when the question bank or the family list changes. */
const CATALOGUE_VERSION = 'aptitude-catalogue-v54-aptitude-question-bank';

const APTITUDE_HOOK_DESCRIPTION =
  'Casemate Aptitude Test info service. Backs the get_aptitude_test_info MCP tool: returns all twelve live aptitude '
  + 'families and every Diagrammatic, Inductive, Deductive, Error Checking, Spatial, Numerical, Verbal and '
  + 'Situational Judgement test with its question count, timing and difficulty range, and — scoped to the calling visitor '
  + 'via X-Session-Id, an email, or a user_key — their attempt count, best score and most recent score from the '
  + 'aptitude_attempts table. Read-only. '
  + `(${CATALOGUE_VERSION})`;

const APTITUDE_HOOK_CODE = String.raw`
const body = request.body || {};
const query = request.query || {};
const headers = request.headers || {};

// The 30 Diagrammatic tests, mirroring lib/diagrammaticLibrary.ts: 10 per
// difficulty level, 30 questions each. Odd-numbered tests are the matrix /
// sequence format, even-numbered tests are Set A / Set B classification.
const LEVELS = [
  ['easy', 'Easy', 20, 'one predictable rule per question'],
  ['medium', 'Medium', 25, 'two rules running at the same time'],
  ['hard', 'Hard', 30, 'three or more simultaneous rules with near-miss distractors'],
];
const TESTS = [];
LEVELS.forEach(function (level) {
  for (var i = 1; i <= 15; i += 1) {
    var isMatrix = i % 2 === 1;
    TESTS.push({
      id: 'dr-' + level[0] + '-' + (i < 10 ? '0' : '') + i,
      name: level[1] + ' Test ' + i,
      format: isMatrix ? 'matrix' : 'set_ab',
      questions: 30,
      minutes: level[2],
      difficulty: level[1] + ' (' + level[3] + ')',
      focus: isMatrix
        ? '3x3 matrices and 4-5 step sequences: find the hidden rule and pick the missing figure from five options.'
        : 'Set A / Set B classification: work out both set rules, then decide whether the question figure belongs to set A, set B, or neither.',
    });
  }
});

// Three AssessmentDay Diagrammatic Reasoning tests (Tests 3-5): 30 Set A / Set B questions, 25 minutes each.
const AD_DIAGRAMMATIC_TESTS = [];
// Two AssessmentDay Diagrammatic Reasoning tests (Tests 1-2): 30 operator / process questions, 25 minutes each, four pictures A-D.
for (var adp = 1; adp <= 2; adp += 1) {
  AD_DIAGRAMMATIC_TESTS.push({
    id: 'dra-0' + adp,
    name: 'AssessmentDay Diagrammatic Test ' + adp,
    format: 'process_operators_booklet_pictures',
    questions: 30,
    minutes: 25,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Original booklet pictures: a key of operators (change shading, rotate, mirror, swap, replace, resize) and a process from an input diagram to an output diagram with one part missing; choose the diagram or operator that replaces the question mark, the operator with no effect or the operator that can be removed, from four pictures A-D; official answers with a written explanation for each; internet connection needed.',
  });
}
for (var adt = 3; adt <= 5; adt += 1) {
  AD_DIAGRAMMATIC_TESTS.push({
    id: 'dra-0' + adt,
    name: 'AssessmentDay Diagrammatic Test ' + adt,
    format: 'set_ab_booklet_pictures',
    questions: 30,
    minutes: 25,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Original booklet figures: two sets (Set A and Set B) each follow a hidden rule, and the candidate decides whether the Figure belongs to Set A, Set B or neither set; official answers with the rule for each set quoted from the Solutions booklet.',
  });
}

// The 30 Inductive Reasoning tests, mirroring lib/inductiveLibrary.ts: 30
// questions each, 25 minutes, every question running exactly two rules.
const INDUCTIVE_TESTS = [];
// Twelve AssessmentDay Inductive Reasoning booklets (Tests 1-12): a sequence of five figures, pick the next from pictures A-E, 25 minutes.
[[1, 30, 'two rules', 'Mixed'], [2, 30, 'three rules', 'Mixed'], [3, 30, 'three rules', 'Mixed'], [4, 30, 'three or four rules', 'Mixed'], [5, 30, 'two or three rules; each question asks what replaces the question mark', 'Mixed'], [6, 30, 'three rules', 'Mixed'], [7, 30, 'one to three rules', 'Mixed'], [8, 30, 'two rules', 'Mixed'], [9, 30, 'three rules', 'Mixed'], [10, 22, 'one or two rules', 'Easy'], [11, 22, 'one or two rules', 'Medium'], [12, 22, 'three or four rules', 'Difficult']].forEach(function (air) {
  INDUCTIVE_TESTS.push({
    id: 'adir-' + air[0],
    name: 'AssessmentDay Inductive Reasoning Test ' + air[0],
    format: 'sequence_booklet_pictures',
    questions: air[1],
    minutes: 25,
    difficulty: air[3],
    source: 'AssessmentDay',
    focus: 'A sequence of five original booklet figures with five pictures A-E to choose the next from (' + air[2] + ' per question); official answers with the rules written out; internet connection needed.',
  });
});
// Four AssessmentDay Inductive Logic tests: 12 question sets of 4 figures (48 questions), 12 minutes; assign each new figure to Set A or Set B.
for (var ail = 1; ail <= 4; ail += 1) {
  INDUCTIVE_TESTS.push({
    id: 'ild-' + ail,
    name: 'AssessmentDay Inductive Logic Test ' + ail,
    format: 'set_ab_booklet_figures',
    questions: 48,
    minutes: 12,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Twelve question sets: six diamond figures (nine letters and/or numbers each) are already filed under Set A or Set B, the candidate finds the rule behind each set and assigns four new figures; original booklet figures (internet connection needed), official answers and both rules written out for every set.',
  });
}
for (var it = 1; it <= 34; it += 1) {
  INDUCTIVE_TESTS.push({
    id: 'ir-' + (it < 10 ? '0' : '') + it,
    name: 'Inductive Test ' + it,
    format: 'sequence',
    questions: 30,
    minutes: 25,
    focus: 'A sequence of five figures runs under exactly two rules; pick the sixth figure from five options A-E.',
  });
}

// The 30 Deductive Reasoning tests, mirroring lib/deductiveLibrary.ts: 30
// questions each, 25 minutes. Ten tests are Easy, ten Medium and ten Hard;
// the original Tests 1-10 retain their established difficulty.
const DEDUCTIVE_TESTS = [];
// Four AssessmentDay Deductive Reasoning tests: 22 questions, 25 minutes, premises shown as original booklet artwork.
for (var add = 1; add <= 4; add += 1) {
  DEDUCTIVE_TESTS.push({
    id: 'add-' + add,
    name: 'AssessmentDay Deductive Test ' + add,
    format: 'booklet_premises_pictures',
    questions: 22,
    minutes: 25,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Original booklet premises (verbal, numerical, tables, abstract rules or diagrams) shown as pictures; judge the statement True, False or Insufficient Information, or choose the plan, flights or statement that fits from options A-E; official answers with the written explanation for each question; internet connection needed.',
  });
}
for (var dt = 1; dt <= 46; dt += 1) {
  var dtier = dt > 30 ? ['Easy', 'Medium', 'Hard'][(dt - 31) % 3] : dt <= 3 || (dt >= 11 && dt <= 17)
    ? 'Easy'
    : (dt >= 4 && dt <= 6) || (dt >= 18 && dt <= 24)
      ? 'Medium'
      : 'Hard';
  DEDUCTIVE_TESTS.push({
    id: 'dr-' + (dt < 10 ? '0' : '') + dt,
    name: 'Deductive Test ' + dt,
    format: 'premises',
    questions: 30,
    minutes: 25,
    difficulty: dtier,
    focus: 'A passage of premises (syllogisms, if-then arguments, rankings, prices, plan tables) and a statement to judge: True, False, or Insufficient Information — plus five-option "which plan fits" table questions.',
  });
}

// The 30 Error Checking tests, mirroring lib/errorCheckingLibrary.ts: 30
// questions each, 10 minutes (20 seconds a question). Ten tests are Easy, ten
// Medium and ten Hard; the original Tests 1-10 retain their established difficulty.
const ERROR_CHECKING_TESTS = [];
// Five AssessmentDay Error Checking tests: 20 questions in four sections, 20 seconds a question (6 min 40 s), original booklet exhibits.
for (var aec = 1; aec <= 5; aec += 1) {
  ERROR_CHECKING_TESTS.push({
    id: 'adec-' + aec,
    name: 'AssessmentDay Error Checking Test ' + aec,
    format: 'booklet_exhibits_five_options',
    questions: 20,
    minutes: 6.7,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Four sections of five questions on original booklet exhibits (security-code table, personal and address details, original and altered data, business cards): pick the correct version of a value, the combinations that do or do not appear in the data, or the number of errors, from five options A-E (case sensitive, option E is often None of the above); official answers, with the Solutions booklet page showing the errors in red; internet connection needed.',
  });
}
for (var ec = 1; ec <= 45; ec += 1) {
  var ectier = ec > 30 ? ['Easy', 'Medium', 'Hard'][(ec - 31) % 3] : ec <= 3 || (ec >= 11 && ec <= 17)
    ? 'Easy'
    : (ec >= 4 && ec <= 6) || (ec >= 18 && ec <= 24)
      ? 'Medium'
      : 'Hard';
  ERROR_CHECKING_TESTS.push({
    id: 'ec-' + (ec < 10 ? '0' : '') + ec,
    name: 'Error Checking Test ' + ec,
    format: 'data_tables',
    questions: 30,
    minutes: 10,
    difficulty: ectier,
    focus: 'An original data table and a hand-copied version: count the errors in a row, spot which column or row holds the mistake, judge the whole-table error count, or pick the correct version of a value from five near-miss options.',
  });
}

// The 30 Spatial Reasoning tests, mirroring lib/spatialLibrary.ts: 30 questions
// each, 20 minutes, with a 9 Easy / 12 Medium / 9 Hard mix in every test.
const SPATIAL_TESTS = [];
// Four AssessmentDay Spatial Reasoning picture tests: 22 booklet questions each, 40 seconds a question.
for (var asr = 1; asr <= 4; asr += 1) {
  SPATIAL_TESTS.push({
    id: 'sp-ad-0' + asr,
    name: 'AssessmentDay Spatial Reasoning Test ' + asr,
    format: 'booklet_pictures',
    questions: 22,
    minutes: 14.7,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Original booklet pictures with four labelled options A-D: rotations, reflections, folding nets into cubes, boxes and pyramids, assembling pieces and top views; official answers.',
  });
}
for (var sr = 1; sr <= 46; sr += 1) {
  SPATIAL_TESTS.push({
    id: 'sr-' + (sr < 10 ? '0' : '') + sr,
    name: 'Test ' + sr,
    format: 'mixed_visual',
    questions: 30,
    minutes: 20,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: '2D rotation, reflection, odd-one-out, sequences, matrix completion, 3D folding, 3D unfolding, isometric block rotation, top views and piece assembly; four SVG options A-D.',
  });
}

// Numerical Reasoning begins with all 12 reconstructed AssessmentDay tests,
// then six other sourced tests, followed by the 30 original responsive-table tests.
const NUMERICAL_TESTS = [{
  id: 'assessmentday-numerical-test-1',
  name: 'Numerical Reasoning Test 1',
  format: 'reconstructed_charts_and_tables',
  questions: 12,
  minutes: 15,
  difficulty: 'Mixed',
  source: 'AssessmentDay',
  focus: 'AssessmentDay warm-up test with four responsive structured exhibits and official worked solutions.',
}];
for (var ad = 2; ad <= 12; ad += 1) {
  NUMERICAL_TESTS.push({
    id: 'assessmentday-numerical-test-' + ad,
    name: 'Numerical Reasoning Test ' + ad,
    format: 'reconstructed_charts_and_tables',
    questions: 30,
    minutes: 30,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'AssessmentDay question set with every table, bar, stacked bar, line or pie exhibit reconstructed as responsive structured data; worked calculations are included.',
  });
}
// Six AssessmentDay Numerical Comprehension tests: 18 text-only word problems, five options, 18 minutes each.
for (var nc = 1; nc <= 6; nc += 1) {
  NUMERICAL_TESTS.push({
    id: 'assessmentday-numerical-comprehension-' + nc,
    name: 'Numerical Comprehension Test ' + nc,
    format: 'text_word_problems',
    questions: 18,
    minutes: 18,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Text-only numerical word problems (percentages, ratios, fractions, exchange rates, unit conversions, interest, pay and profit) with five options A-E; pick the closest if the exact answer is missing; official step-by-step solutions.',
  });
}
// Two AssessmentDay Advanced Numerical Reasoning tests: 30 questions, 30 minutes, no calculator; Comparison of Quantities (Q1-15, options A-D) then Sufficiency of Information (Q16-30, options A-E).
for (var an = 1; an <= 2; an += 1) {
  NUMERICAL_TESTS.push({
    id: 'assessmentday-advanced-numerical-' + an,
    name: 'Advanced Numerical Reasoning Test ' + an,
    format: 'comparison_and_sufficiency',
    questions: 30,
    minutes: 30,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Text-only advanced numerical test without a calculator: 15 Comparison of Quantities questions (is quantity A greater, B greater, equal, or not enough information) and 15 Sufficiency of Information questions (are statements 1 and 2 enough to answer the question); official step-by-step solutions.',
  });
}
// Four AssessmentDay Capp Numerical tests: 12 questions on tables and charts (original booklet pictures), calculator allowed, no time limit; answers are lettered options, typed numbers or rankings.
for (var cp = 1; cp <= 4; cp += 1) {
  NUMERICAL_TESTS.push({
    id: 'assessmentday-capp-numerical-' + cp,
    name: 'Capp Numerical Test ' + cp,
    format: 'picture_exhibits_mixed_answers',
    questions: 12,
    minutes: null,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Original booklet tables and charts (drawn from the booklet PDFs, so an internet connection is needed); the candidate picks a lettered option, types a number, or ranks items from highest to lowest; official step-by-step solutions; no time limit, the time taken is recorded.',
  });
}
// Two AssessmentDay Cut-e style Numerical tests: six booklet exhibits shown together above True / False / Cannot Say statements, 18 minutes.
[[1, 37], [2, 38]].forEach(function (cn) {
  NUMERICAL_TESTS.push({
    id: 'cute-numerical-' + cn[0],
    name: 'AssessmentDay Cut-e Style Numerical Test ' + cn[0],
    format: 'reading_exhibits_true_false_cannot_say',
    questions: cn[1],
    minutes: 18,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Six original booklet exhibits (tables, bar, line and pie charts, currency conversions) in a scrollable panel above every statement; the candidate judges True / False / Cannot Say from the exhibits only; official answers with the working for each statement (Test 2 question 38 is keyed from the data because the Solutions booklet stops at 37); internet connection needed.',
  });
});
[
  ['mckinsey-pst-a', 'McKinsey Problem Solving Test — Practice Test A', 26, 60, 'McKinsey'],
  ['mckinsey-pst-b', 'McKinsey Problem Solving Test — Practice Test B', 26, 60, 'McKinsey'],
  ['mckinsey-pst-c', 'McKinsey Problem Solving Test — Practice Test C', 26, 60, 'McKinsey'],
  ['raf-ast-numerical-practice', 'RAF Airmen Selection Test — Numerical Reasoning Practice', 14, 15, 'Royal Air Force (RAF)'],
  ['mathcentre-numerical-practice-1', 'Numerical Reasoning Practice Test 1', 23, 25, 'mathcentre / University of Hertfordshire'],
  ['civil-service-fast-track-numerical', 'Civil Service Fast Track — Numerical Exercise', 4, null, 'Civil Service Fast Track Apprenticeship'],
].forEach(function (sourceTest) {
  NUMERICAL_TESTS.push({
    id: sourceTest[0],
    name: sourceTest[1],
    format: 'source_attributed',
    questions: sourceTest[2],
    minutes: sourceTest[3],
    difficulty: 'Mixed',
    source: sourceTest[4],
    focus: 'Source-attributed numerical practice with its original timing, question structure and responsive exhibits.',
  });
});
for (var nr = 1; nr <= 30; nr += 1) {
  NUMERICAL_TESTS.push({
    id: 'nr-' + (nr < 10 ? '0' : '') + nr,
    name: 'Numerical Test ' + nr,
    format: 'responsive_data_tables',
    questions: 30,
    minutes: 30,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'Original FMCG, banking, workforce, demographic, market-share and financial tables; A-D questions on lookups, totals, ratios, percentages, weighted averages and projections.',
  });
}

// The 30 Verbal Reasoning tests: six original business passages per test, five
// True / False / Cannot Say statements each, 25 minutes and a 9/12/9 mix.
const VERBAL_TESTS = [];
// Eleven AssessmentDay verbal comprehension tests (no Test 10 was supplied): [number, questions kept, seconds per question].
[[1, 30, 60], [2, 30, 60], [3, 30, 60], [4, 30, 60], [5, 20, 30], [6, 20, 30], [7, 16, 30], [8, 16, 60], [9, 15, 60], [11, 16, 60], [12, 16, 60]].forEach(function (adv) {
  VERBAL_TESTS.push({
    id: 'avc-' + (adv[0] < 10 ? '0' : '') + adv[0],
    name: 'AssessmentDay Verbal Comprehension Test ' + adv[0],
    format: 'passage_multiple_choice',
    questions: adv[1],
    minutes: Math.round(adv[1] * adv[2] / 6) / 10,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Short passage followed by a multiple-choice question answered only from the passage; the answer key and explanations are official for Tests 1-8, 11 and 12 (AssessmentDay solutions booklets) and derived from the passage for Test 9, which has no solutions booklet.',
  });
});
// Three AssessmentDay Cut-e style verbal tests: one reading booklet, 38 True / False / Cannot Say statements, 18 minutes.
for (var cv = 1; cv <= 3; cv += 1) {
  VERBAL_TESTS.push({
    id: 'cute-0' + cv,
    name: 'AssessmentDay Cut-e Style Verbal Test ' + cv,
    format: 'reading_booklet_true_false_cannot_say',
    questions: 38,
    minutes: 18,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'One long reading booklet (company brochure with tabs) and 38 True / False / Cannot Say statements judged only from the booklet, with official answers and explanations.',
  });
}
// Four AssessmentDay Syllogisms tests: 20 questions, two premises and five candidate conclusions, 10 seconds a question.
for (var sy = 1; sy <= 4; sy += 1) {
  VERBAL_TESTS.push({
    id: 'syl-0' + sy,
    name: 'AssessmentDay Syllogisms Test ' + sy,
    format: 'syllogism_five_conclusions',
    questions: 20,
    minutes: 3.3,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Two premises (treated as fact even when abstract or untrue) and five candidate conclusions A-E - All, No, Some, Some are not, No valid conclusion - of which exactly one must be true; 10 seconds per question; official answers (the Solutions booklets print the answer only).',
  });
}
// Four AssessmentDay Capp verbal tests: 15 sets each, untimed, mixed answer types (A/B style match, word choice, typed corrections, ranking, True / False / Cannot Say).
[72, 76, 75, 78].forEach(function (cappQuestions, cappIndex) {
  VERBAL_TESTS.push({
    id: 'capp-verbal-' + (cappIndex + 1),
    name: 'AssessmentDay Capp Verbal Test ' + (cappIndex + 1),
    format: 'capp_mixed_sets',
    questions: cappQuestions,
    minutes: 0,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: '15 sets, untimed: pick which of two messages (A or B) a response replies to or resembles in style, choose the right word for a gap, type the correction for a spelling, grammar or punctuation error, rank five responses from most to least positive (answered as 1st to 5th per response), and judge True / False / Cannot Say statements; official answers and explanations.',
  });
});
for (var vr = 1; vr <= 30; vr += 1) {
  VERBAL_TESTS.push({
    id: 'vr-' + (vr < 10 ? '0' : '') + vr,
    name: 'Verbal Test ' + vr,
    format: 'passage_statements',
    questions: 30,
    minutes: 25,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'Six original passages on Vietnamese business, banking, technology, healthcare and social trends; judge each statement True, False or Cannot Say using only the passage.',
  });
}

// The 30 Situational Judgement tests, mirroring
// lib/situationalJudgement.ts: 30 untimed questions each, with five forced
// ratings and a 9 Easy / 12 Medium / 9 Hard mix in every test.
const SITUATIONAL_TESTS = [];
// Five AssessmentDay Practice Situational Judgement Tests: four scenarios of four situations (16 questions), untimed, four formats.
for (var adsjt = 1; adsjt <= 5; adsjt += 1) {
  SITUATIONAL_TESTS.push({
    id: 'ad-sjt-' + adsjt,
    name: 'AssessmentDay SJT Test ' + adsjt,
    format: 'four_formats',
    questions: 16,
    minutes: null,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Four scenarios of four situations each: (1) pick the response you would be most and least likely to make, (2) rank four responses from most to least effective, (3) pick the most and the least effective response, (4) rate five responses from Very Effective to Counterproductive using each rating once. Untimed; official AssessmentDay model answers with commentary on every response; partial credit for answers close to the model.',
  });
}
for (var sjt = 1; sjt <= 45; sjt += 1) {
  SITUATIONAL_TESTS.push({
    id: 'sjt-' + (sjt < 10 ? '0' : '') + sjt,
    name: 'Test ' + sjt,
    format: 'forced_rating',
    questions: 30,
    minutes: null,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'A workplace scenario with five actions; assign Very Effective, Effective, Slightly Effective, Ineffective and Counterproductive exactly once. Proximity to the model order earns partial credit.',
  });
}

// Fifteen AssessmentDay Logical Reasoning tests (Tests 1 to 15): a grid of symbols or a pattern with one cell/section missing.
const LOGICAL_TESTS = [];
[[1, 'Easy', 12, 70, 12], [2, 'Easy', 12, 70, 12], [3, 'Medium', 12, 70, 12], [4, 'Easy', 12, 70, 12], [5, 'Medium', 12, 70, 12], [6, 'Hard', 12, 70, 12], [7, 'Medium', 12, 70, 12], [8, 'Hard', 12, 70, 12], [9, 'Easy', 12, 70, 12], [10, 'Medium', 12, 70, 12], [11, 'Hard', 12, 70, 12], [12, 'Medium', 12, 70, 12], [13, 'Easy', 15, 30, 9], [14, 'Easy', 15, 30, 9], [15, 'Easy', 15, 30, 9]].forEach(function (lr) {
  LOGICAL_TESTS.push({
    id: 'lr-' + (lr[0] < 10 ? '0' : '') + lr[0],
    name: 'AssessmentDay Logical Reasoning Test ' + lr[0],
    format: lr[4] === 9 ? 'pattern_missing_section' : 'symbol_grid_missing_cell',
    questions: lr[2],
    minutes: Math.round(lr[2] * lr[3] / 6) / 10,
    seconds_per_question: lr[3],
    options_per_question: lr[4],
    difficulty: lr[1],
    source: 'AssessmentDay',
    focus: lr[4] === 9
      ? 'A pattern with one section missing and nine lettered options; the original booklet pictures with the official answers (the Solutions booklet shows the correct option only).'
      : 'A 3x3 grid of symbols with one cell missing and twelve lettered options; two or three hidden rules run across the rows and down the columns; original booklet pictures with the official answers and the rules explained in the review.',
  });
});

// Five AssessmentDay Critical Thinking tests, Assumptions section (booklets 1, 2, 3, 5, 6, 7, 8 and 9): 12 questions in 12 minutes.
const CRITICAL_TESTS = [];
[1, 2, 3, 5, 6, 7, 8, 9].forEach(function (ct) {
  CRITICAL_TESTS.push({
    id: 'ct-assumptions-' + ct,
    name: 'Assumptions Test ' + ct,
    format: 'assumption_made_or_not',
    questions: 12,
    minutes: 12,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'Four short statements with three proposed assumptions each; for every assumption choose Assumption Made (the statement takes it for granted) or Assumption Not Made. Official AssessmentDay answers with an explanation for every question.',
  });
});

// Four AssessmentDay Mechanical Reasoning tests: 20 questions in 12 minutes, each with a picture and four or five options.
const MECHANICAL_TESTS = [];
[1, 2, 3, 4].forEach(function (mr) {
  MECHANICAL_TESTS.push({
    id: 'mr-' + mr,
    name: 'AssessmentDay Mechanical Reasoning Test ' + mr,
    format: 'picture_multiple_choice',
    questions: 20,
    minutes: 12,
    difficulty: 'Mixed',
    source: 'AssessmentDay',
    focus: 'A picture of a lever, pulley, gear, belt drive, fluid or force system and a question about what will happen; one correct option from four or five. Original booklet pictures with the official answers and a worked explanation for every question.',
  });
});

for (var lgg = 1; lgg <= 35; lgg += 1) {
  LOGICAL_TESTS.push({
    id: 'lg-' + (lgg < 10 ? '0' : '') + lgg,
    name: 'Logical Reasoning Practice Test ' + lgg,
    format: 'symbol_grid_or_sequence_generated',
    questions: 20,
    minutes: 20,
    seconds_per_question: 60,
    options_per_question: 5,
    difficulty: ['Easy', 'Medium', 'Hard'][(lgg - 1) % 3],
    source: 'Casemate original',
    focus: 'Original practice set: work out the two or three rules that run across a grid or sequence of symbols and choose the figure that completes it; rules written out afterwards.',
  });
}
for (var ctg = 1; ctg <= 42; ctg += 1) {
  CRITICAL_TESTS.push({
    id: 'ct-gen-' + ctg,
    name: 'Assumptions Practice Test ' + ctg,
    format: 'assumption_made_or_not',
    questions: 12,
    minutes: 12,
    difficulty: 'Mixed',
    source: 'Casemate original',
    focus: 'Four short workplace statements with three proposed assumptions each; choose Assumption Made or Assumption Not Made. Every question has a written explanation.',
  });
}
MECHANICAL_TESTS.push({
  id: 'mr-5',
  name: 'Mechanical Reasoning Test 5',
  format: 'described_mechanisms_multiple_choice',
  questions: 20,
  minutes: 12,
  difficulty: 'Mixed',
  source: 'Casemate original',
  focus: 'Levers, pulleys, gears, belts, hydraulics, ramps, torque and work described in words; every answer is computed from the numbers given and has a worked explanation.',
});

const IN_TRAY_TESTS = [
  { id: 'it-free', name: 'In-Tray Exercise 3', company: 'Graduate Retail Banking', format: 'in_tray', items: 13, minutes: 90, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'First day as interim retail manager of a bank branch: set a priority and write the actions for each of 13 items, then mark yourself against the model answers.' },
  { id: 'it-1', name: 'In-Tray Exercise 1', company: 'Rest Well Lodges', format: 'in_tray', items: 13, minutes: 90, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'First day as general manager of a hotel: prioritise 13 items (finance, planning, analysis) and list the actions, with the model priorities and actions.' },
  { id: 'it-2', name: 'In-Tray Exercise 2', company: 'Newtown Telecom', format: 'in_tray_scored_criteria', items: 14, minutes: 90, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'Back at work as customer services manager: deal with 14 items; the marking guide awards points (with bonus points) for each action taken.' },
  { id: 'et-1', name: 'E-Tray Exercise 1', company: 'Bannon & Loew Consulting', format: 'e_tray_indicators', items: 10, documents: 7, minutes: 60, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'A consultant in the London office answers 10 e-mails using 7 supporting documents; marked against positive and negative behavioural indicators per e-mail and for the whole exercise.' },
  { id: 'et-2', name: 'E-Tray Exercise 2', company: 'Cannon Carlisle', format: 'e_tray_most_least_effective', items: 10, documents: 9, minutes: 45, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'A new consultant joining the Entrepreneur Fast-Track team answers 10 e-mails using 9 documents (organogram, minutes, client profile, menu, team-building exercises, meeting schedule); for each e-mail choose the most and the least effective of four responses, then see the ranking and the reason for each option.' },
  { id: 'et-free', name: 'E-Tray Exercise 3', company: 'Ainswell Consulting Partners', format: 'e_tray_most_least_effective', items: 4, documents: 3, minutes: 15, difficulty: 'Mixed', source: 'AssessmentDay', focus: 'Four e-mails and three documents; for each e-mail choose the most and the least effective response, then see the ranking and the reason for each option.' },
];

const SIMULATION_TESTS = [
  { id: 'sim-01', name: 'Aptitude Test 01', format: 'full_round_simulation', questions: 25, minutes: 30, difficulty: 'Mixed', source: 'UVTN 2022 (Talented Candidate, Round 1)', focus: '9 verbal reasoning (True / False / Can\'t tell, argument evaluation), 10 quantitative reasoning (data sufficiency and a case with charts and tables) and 6 abstract reasoning questions in one 30-minute sitting; answer key only, no written explanations.' },
  { id: 'sim-02', name: 'Aptitude Test 02', format: 'full_round_simulation', questions: 25, minutes: 30, difficulty: 'Mixed', source: 'UVTN 2022 (Talented Candidate, Round 1)', focus: 'Same 9 + 10 + 6 structure with different content (the Chapman passage, a Telyss heating-systems case, new abstract figures); answer key only, no written explanations.' },
  { id: 'sim-mock', name: 'Mock Aptitude Test', format: 'full_round_simulation', questions: 25, minutes: 30, difficulty: 'Mixed', source: 'UVTN 2022 (Talented Candidate, Round 1)', focus: '9 verbal, 10 quantitative (an easyAirways route-profitability and maintenance-cost case) and 6 abstract questions; the review shows the official answer key explanation for every question.' },
];

const FAMILIES = [
  { id: 'diagrammatic', name: 'Diagrammatic Reasoning', status: 'available' },
  { id: 'inductive', name: 'Inductive Reasoning', status: 'available' },
  { id: 'deductive', name: 'Deductive Reasoning', status: 'available' },
  { id: 'error_checking', name: 'Error Checking', status: 'available' },
  { id: 'spatial', name: 'Spatial Reasoning', status: 'available' },
  { id: 'numerical', name: 'Numerical Reasoning', status: 'available' },
  { id: 'verbal', name: 'Verbal Reasoning', status: 'available' },
  { id: 'situational', name: 'Situational Judgement', status: 'available' },
  { id: 'logical', name: 'Logical Reasoning', status: 'available' },
  { id: 'critical', name: 'Critical Thinking', status: 'available' },
  { id: 'mechanical', name: 'Mechanical Reasoning', status: 'available' },
  { id: 'in_tray', name: 'In-Tray & E-Tray', status: 'available' },
];

function pick(name) {
  return body[name] != null ? body[name] : query[name];
}

function headerValue(name) {
  const keys = Object.keys(headers || {});
  for (let i = 0; i < keys.length; i += 1) {
    if (String(keys[i]).toLowerCase() === name) return headers[keys[i]];
  }
  return null;
}

const emailRaw = String(pick('email') || '').trim().toLowerCase();
const email = emailRaw.indexOf('@') > 0 ? emailRaw : '';
const explicitUserKey = String(pick('user_key') || '').trim();
const sessionId = String(pick('session_id') || headerValue('x-session-id') || '').trim();

function clock(seconds) {
  if (seconds == null) return null;
  const total = Math.max(0, Math.round(Number(seconds)));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return minutes + ':' + (rest < 10 ? '0' : '') + rest;
}

function shape(row) {
  return {
    test_id: row.test_id,
    test_name: row.test_name,
    score: Number(row.score),
    total: Number(row.total),
    percent: row.percent == null ? null : Number(row.percent),
    duration: clock(row.duration_seconds),
    timed_out: row.timed_out === true,
    taken_at: row.completed_at || row.created_at,
  };
}

async function loadAttempts() {
  // Preference order: an explicit key the caller passed, then the signed-in
  // email, then the visitor session the platform forwarded with the tool call.
  const wheres = [];
  if (explicitUserKey) wheres.push({ user_key: explicitUserKey });
  if (email) wheres.push({ user_key: 'email:' + email });
  if (sessionId) wheres.push({ session_id: sessionId });
  for (let i = 0; i < wheres.length; i += 1) {
    const result = await db.query('aptitude_attempts', {
      where: wheres[i],
      orderBy: [{ column: 'created_at', direction: 'desc' }],
      limit: 50,
    });
    const rows = result && result.rows ? result.rows : [];
    if (rows.length) return rows;
  }
  return [];
}

try {
  const totalQuestions = TESTS.reduce(function (sum, t) { return sum + t.questions; }, 0);
  let rows = [];
  let lookupError = null;
  try {
    rows = await loadAttempts();
  } catch (error) {
    lookupError = error && error.message ? error.message : String(error);
    console.error('[aptitude-info] score lookup failed: ' + lookupError);
  }

  const diagrammatic = rows.filter(function (r) { return !r.test_type || r.test_type === 'diagrammatic'; });
  let best = null;
  diagrammatic.forEach(function (row) {
    if (!best || Number(row.score) > Number(best.score)) best = row;
  });
  const last = diagrammatic.length ? diagrammatic[0] : null;

  const inductive = rows.filter(function (r) { return r.test_type === 'inductive'; });
  let inductiveBest = null;
  inductive.forEach(function (row) {
    if (!inductiveBest || Number(row.score) > Number(inductiveBest.score)) inductiveBest = row;
  });
  const inductiveLast = inductive.length ? inductive[0] : null;

  const deductive = rows.filter(function (r) { return r.test_type === 'deductive'; });
  let deductiveBest = null;
  deductive.forEach(function (row) {
    if (!deductiveBest || Number(row.score) > Number(deductiveBest.score)) deductiveBest = row;
  });
  const deductiveLast = deductive.length ? deductive[0] : null;

  const errorChecking = rows.filter(function (r) { return r.test_type === 'error_checking'; });
  let errorCheckingBest = null;
  errorChecking.forEach(function (row) {
    if (!errorCheckingBest || Number(row.score) > Number(errorCheckingBest.score)) errorCheckingBest = row;
  });
  const errorCheckingLast = errorChecking.length ? errorChecking[0] : null;

  const spatial = rows.filter(function (r) { return r.test_type === 'spatial'; });
  let spatialBest = null;
  spatial.forEach(function (row) {
    if (!spatialBest || Number(row.score) > Number(spatialBest.score)) spatialBest = row;
  });
  const spatialLast = spatial.length ? spatial[0] : null;

  function summarizeFamily(type) {
    const entries = rows.filter(function (r) { return r.test_type === type; });
    let familyBest = null;
    entries.forEach(function (row) {
      if (!familyBest || Number(row.score) > Number(familyBest.score)) familyBest = row;
    });
    return { rows: entries, best: familyBest, last: entries.length ? entries[0] : null };
  }
  const numerical = summarizeFamily('numerical');
  const verbal = summarizeFamily('verbal');
  const logical = summarizeFamily('logical');
  const critical = summarizeFamily('critical');
  const mechanical = summarizeFamily('mechanical');
  const inTray = summarizeFamily('in_tray');
  const simulation = summarizeFamily('simulation');

  const situational = rows.filter(function (r) { return r.test_type === 'situational'; });
  let situationalBest = null;
  situational.forEach(function (row) {
    var rowPercent = row.percent == null ? Number(row.score) : Number(row.percent);
    var bestPercent = situationalBest && situationalBest.percent != null
      ? Number(situationalBest.percent)
      : situationalBest ? Number(situationalBest.score) : -1;
    if (!situationalBest || rowPercent > bestPercent) situationalBest = row;
  });
  const situationalLast = situational.length ? situational[0] : null;

  const perTest = {};
  diagrammatic.forEach(function (row) {
    const key = row.test_id;
    if (!perTest[key] || Number(row.score) > Number(perTest[key].score)) perTest[key] = row;
  });

  let summary =
    'Casemate has an Aptitude Test app covering 12 aptitude families.'
    + ' Every family has at least 50 tests except Mechanical Reasoning (5 tests) and In-Tray & E-Tray (6 exercises). The app shows every test in one list: a tile for each test type (with its test count) filters the list, and there is a search box, an AssessmentDay or Casemate original filter and a Random test button; tests have no long descriptions.'
    + ' Diagrammatic Reasoning is live with '
    + TESTS.length + ' tests (' + totalQuestions
    + ' questions in total, 30 per test, each one timed), organised into three difficulty levels - Easy, '
    + 'Medium and Hard, 15 tests per level - filterable in the app, with a "random test at my level" option. '
    + 'Diagrammatic Reasoning also lists ' + AD_DIAGRAMMATIC_TESTS.length + ' AssessmentDay tests in their own AssessmentDay tab: Tests 1 and 2 are operator / process questions (30 questions and 25 minutes each, a key of operators, an input and an output diagram and four pictures A-D, with the official explanation for each) and Tests 3-5 are Set A / Set B tests (30 questions and 25 minutes each, the original booklet figures, official answers and the rule for each set explained in the review); all use the original booklet pictures and need an internet connection. '
    + 'Inductive Reasoning is also live with ' + INDUCTIVE_TESTS.length
    + ' tests: 12 AssessmentDay Inductive Reasoning booklets (Tests 1 to 12; sequences of five original booklet figures with pictures A-E, 30 questions each in Tests 1 to 9 and 22 each in Tests 10 to 12 rated Easy, Medium and Difficult, 25 minutes, official answers and rules, internet connection needed), then 4 AssessmentDay Inductive Logic tests (12 question sets of 4 figures, 48 questions and 12 minutes each; six diamond figures are already filed under Set A or Set B and the candidate finds the rule for each set and assigns four new figures; original booklet figures, official answers and both rules explained) followed by 34 original tests (30 questions each, 25 minutes): a sequence of five figures runs under exactly two rules and the '
    + 'candidate picks the figure that comes next from five options A-E, with both rules explained afterwards. '
    + 'Deductive Reasoning is also live with ' + DEDUCTIVE_TESTS.length
    + ' tests: 4 AssessmentDay Deductive Reasoning tests first (22 questions each, 25 minutes; the premises - verbal, numerical, tables, abstract rules or diagrams - are the original booklet artwork, and the candidate judges True / False / Insufficient Information or picks the plan, flights or statement that fits from options A-E; official answers with the written explanation for each question; internet connection needed), then 46 original tests (30 questions each, 25 minutes; Easy, Medium and Hard): a passage of premises and '
    + 'a statement to judge True / False / Insufficient Information, plus five-option plan-table questions, with '
    + 'the reasoning explained afterwards. '
    + 'Error Checking is also live with ' + ERROR_CHECKING_TESTS.length
    + ' tests: 5 AssessmentDay Error Checking tests first (20 questions each in four sections of five, 20 seconds a question so 6 minutes 40 seconds, original booklet exhibits, official answers, the Solutions page with the errors in red, internet connection needed), then 45 original tests (30 questions each, 10 minutes - 20 seconds a question; Easy, Medium and Hard): an '
    + 'original data table and a hand-copied version, and the candidate spots exactly where they differ - row '
    + 'error counts, locate the column or row, whole-table counts, and correct-version lookups - with every '
    + 'corrupted cell highlighted in the review afterwards. '
    + 'Spatial Reasoning is also live with ' + SPATIAL_TESTS.length
    + ' tests: 4 AssessmentDay picture tests (22 booklet questions each, 40 seconds per question, official answers) followed by 46 original tests (30 questions each, 20 minutes; every test mixes 9 Easy, 12 Medium and 9 Hard): rotation, '
    + 'reflection, odd-one-out, spatial sequences, matrix completion, 3D folding and unfolding, isometric block '
    + 'rotation, top views and piece assembly, with four SVG options A-D and the rule explained afterwards. '
    + 'Numerical Reasoning is live with ' + NUMERICAL_TESTS.length
    + ' tests: all 12 reconstructed AssessmentDay tests (Test 1 has 12 questions and 15 minutes; Tests 2-12 have 30 questions and 30 minutes each), 6 AssessmentDay Numerical Comprehension tests (18 text-only word problems each, five options, 18 minutes, official step-by-step solutions), 2 AssessmentDay Advanced Numerical Reasoning tests (30 questions and 30 minutes each, no calculator: 15 Comparison of Quantities questions with four options, then 15 Sufficiency of Information questions with five options, official step-by-step solutions), 4 AssessmentDay Capp Numerical tests (12 questions each on original booklet tables and charts - lettered options, typed numeric answers and rankings, calculator allowed, no time limit, official step-by-step solutions, internet connection needed), 2 AssessmentDay Cut-e style Numerical tests (37 and 38 True / False / Cannot Say statements on six original booklet exhibits, 18 minutes, official answers and workings, internet connection needed), six additional sourced tests with their original timing, and 30 original responsive-table tests. Every chart and table is rendered from structured data and worked calculations are included. '
    + 'Verbal Reasoning is live with ' + VERBAL_TESTS.length
    + ' tests: 11 source-attributed AssessmentDay verbal comprehension tests (multiple choice on short passages, 15-30 questions each, 30 or 60 seconds per question) then 3 Cut-e style tests (one reading booklet, 38 True / False / Cannot Say statements, 18 minutes), 4 AssessmentDay Syllogisms tests (20 questions each, two premises and five possible conclusions, 10 seconds per question), 4 untimed AssessmentDay Capp tests (15 sets and 72-78 questions each: message style A/B, word choice, typed corrections, response ranking, True / False / Cannot Say) and 30 original tests (30 questions each, 25 minutes; every test mixes 9 Easy, 12 Medium and 9 Hard) with six business passages per test and five True / False / Cannot Say statements per passage. '
    + 'Logical Reasoning is also live with ' + LOGICAL_TESTS.length
    + ' tests: 15 AssessmentDay tests (Tests 1 to 15) and 35 original Casemate tests (lg-01 to lg-35: 20 grid or sequence questions each, five options, 60 seconds a question, rules written out afterwards). Of the AssessmentDay tests, Tests 1 to 12 are 12 questions each at 70 seconds per question, a grid of symbols with one cell missing and 12 lettered options; Tests 13, 14 and 15 are 15 questions at 30 seconds each, a pattern with a missing section and 9 options. The original booklet pictures are drawn from the booklet PDFs (an internet connection is needed), the answers are official, and the review shows the Solutions picture with the correct cell outlined and the rules explained. '
    + 'Situational Judgement is live with ' + SITUATIONAL_TESTS.length
    + ' untimed tests: 5 source-attributed AssessmentDay Practice SJTs (16 questions each: most and least likely to perform, ranked responses, most and least effective, and rated responses, with the official model answers and commentary on every response) followed by 45 original tests (30 questions each; every test mixes 9 Easy, 12 Medium and 9 Hard) with realistic Vietnamese MT and consulting workplace scenarios, five responses rated Very Effective through Counterproductive, each label used once, with proximity partial credit and model-answer review. '
    + 'Critical Thinking (CCAT-style, Assumptions section) is live with ' + CRITICAL_TESTS.length
    + ' tests: 8 AssessmentDay tests (Assumptions Tests 1, 2, 3, 5, 6, 7, 8 and 9) and 42 original Casemate Assumptions Practice Tests (ct-gen-1 to ct-gen-42): 12 questions each in 12 minutes; every question gives a short statement and one proposed assumption to mark Assumption Made or Assumption Not Made, with the official answers and explanations. '
    + 'Mechanical Reasoning is live with ' + MECHANICAL_TESTS.length
    + ' tests: 4 AssessmentDay tests (Tests 1 to 4) and an original Casemate Test 5 written as mechanism descriptions: 20 questions each in 12 minutes, every question a picture of a lever, pulley, gear, belt-drive or fluid system with four or five options, official answers and a worked explanation for each. The original booklet pictures are drawn from the PDF, so an internet connection is needed. '
    + 'In-Tray & E-Tray is also live with ' + IN_TRAY_TESTS.length
    + ' AssessmentDay exercises (3 In-Tray and 3 E-Tray), titled simply In-Tray Exercise 1 to 3 and E-Tray Exercise 1 to 3: the original booklet pages are shown as pictures and the candidate works through the inbox against a timer. In-Tray exercises (In-Tray 1: Rest Well Lodges, 13 items; In-Tray 2: Newtown Telecom, 14 items; In-Tray 3, formerly the free exercise: Graduate Retail Banking, 13 items; 90 minutes each) ask the candidate to set a priority (High, Medium or Low) and write the actions for each item, then self-mark against the model answers. E-Tray exercises: E-Tray 1 (Bannon and Loew Consulting, 10 e-mails and 7 documents, 60 minutes) is marked against the official positive and negative indicators; E-Tray 2 (Cannon Carlisle, 10 e-mails and 9 documents, 45 minutes) and E-Tray 3 (formerly the free exercise: Ainswell Consulting Partners, 4 e-mails and 3 documents, 15 minutes) ask for the most and the least effective of four responses to each e-mail and are auto-scored, one point for each correct pick. Results are saved as in_tray attempts. '
    + 'A separate dock app, Bank of Aptitude Question, holds every question from five parts of the book Ultimate Aptitude Tests by Jim Barrett, 421 questions in 11 tests. Logical Reasoning (abstract visual): Test 1 Constructs (15 cube-folding rows, 60 yes or no answers, 8 minutes), Test 2 Sequences (32 items, two missing shapes each, 15 minutes) and Test 3 Perceptual (32 odd-one-out and what-comes-next items, 10 minutes). Numerical Reasoning (abstract numerical): Test 4 Reasoning (36 number-pair matching items, 10 minutes) and Test 5 Interpolation (20 missing-number items, 8 minutes). Verbal Reasoning (abstract verbal): Test 6 Deduction (25 questions in 7 scenarios, 20 minutes) and Test 7 Analysis (33 questions in 13 scenarios, 15 minutes). Mechanical Reasoning (physical): Test 8 Dynamics (25 questions with a drawing, 10 minutes) and Test 9 Tracing (58 lines to follow, 5 minutes). Spatial Reasoning: Test 10 Formation (70 same-or-different shape answers in 14 sets, 10 minutes) and Test 11 3D tests (10 block stacks, 3 side views each, 5 minutes). Each question shows its original figure, lets the candidate pick an answer, check it and read the books answer and explanation; it is a practice bank, not a timed test, and the pictures need an internet connection. '
    + 'Separately from the twelve families, the Aptitude Test Simulation app (its own app in the dock) offers ' + SIMULATION_TESTS.length
    + ' full-length mock rounds in the style of the Talented Candidate 2022 Round 1 aptitude test: Aptitude Test 01, Aptitude Test 02 and the Mock Aptitude Test, each with 25 questions (9 verbal reasoning, 10 quantitative reasoning with case exhibits, 6 abstract reasoning) in one 30-minute sitting with no breaks, a question navigator with flags, a section breakdown and a full review; the Mock Aptitude Test review includes the official explanations. The old Mixed Aptitude Test has been removed and this app replaces it. Three answer keys have their own apps in the dock and are no longer inside the Aptitude Test Simulation app. The HSBC Test app holds the HSBC online assessment answer key: 48 real items (17 visual sequences, 8 calendar puzzles, 6 schedule and room puzzles, 7 pie-chart items, 5 stacked-bar or graph items and 5 ordering puzzles) shown as screenshots with the correct answer, the working for the calculable ones and the original short notes from the key; it is a study key, not a timed test. The Shopee Test app holds the Shopee round 1 test answer key: 39 items from a screen recording (9 numerical reasoning, 10 verbal reasoning True / False / Cannot Say, 10 integrated reasoning on charts and tables, 10 logical sequences), each with the screenshot, the answer, the working where it can be calculated and the original Vietnamese note; items are tagged as matching the key, taken from the key only, worked out by Casemate, disputed (the Belgium earnings item, where the key note gives 86,300 pounds but dividing by the exchange rate gives 65,200) or with no answer recorded (two chart items whose screenshots are cropped and eight logical sequences). The PepsiCo Test app holds the PepsiCo online test answer key: 35 items (8 charts, 4 tables, 13 verbal reasoning, 10 logical picture sequences), where every answer was worked out by Casemate because the source had no answer key. '
    + 'All twelve families are live. Taking tests requires an active 14-day trial or Casemate Pro; the catalogue lookup itself remains available. The whole app is in English on purpose, because the real aptitude round is sat in English.';
  if (verbal.last) {
    summary += ' Their most recent Verbal Reasoning attempt was ' + (verbal.last.test_name || verbal.last.test_id)
      + ', scoring ' + verbal.last.score + '/' + verbal.last.total + '.';
  }
  if (numerical.last) {
    summary += ' Their most recent Numerical Reasoning attempt was ' + (numerical.last.test_name || numerical.last.test_id)
      + ', scoring ' + numerical.last.score + '/' + numerical.last.total + '.';
  }
  if (simulation.last) {
    summary += ' Their most recent Aptitude Test Simulation attempt was ' + (simulation.last.test_name || simulation.last.test_id)
      + ', scoring ' + simulation.last.score + '/' + simulation.last.total + '.';
  }
  if (inTray.last) {
    summary += ' Their most recent In-Tray / E-Tray attempt was ' + (inTray.last.test_name || inTray.last.test_id)
      + ', scoring ' + inTray.last.score + '/' + inTray.last.total + '.';
  }
  if (mechanical.last) {
    summary += ' Their most recent Mechanical Reasoning attempt was ' + (mechanical.last.test_name || mechanical.last.test_id)
      + ', scoring ' + mechanical.last.score + '/' + mechanical.last.total + '.';
  }
  if (critical.last) {
    summary += ' Their most recent Critical Thinking attempt was ' + (critical.last.test_name || critical.last.test_id)
      + ', scoring ' + critical.last.score + '/' + critical.last.total + '.';
  }
  if (logical.last) {
    summary += ' Their most recent Logical Reasoning attempt was ' + (logical.last.test_name || logical.last.test_id)
      + ', scoring ' + logical.last.score + '/' + logical.last.total + '.';
  }
  if (situationalLast) {
    summary += ' Their most recent Situational Judgement attempt was ' + (situationalLast.test_name || situationalLast.test_id)
      + ', matching ' + (situationalLast.percent == null ? situationalLast.score + '/' + situationalLast.total : situationalLast.percent + '%') + ' of the model judgement.';
  }
  if (spatialLast) {
    summary += ' Their most recent Spatial Reasoning attempt was ' + (spatialLast.test_name || spatialLast.test_id)
      + ', scoring ' + spatialLast.score + '/' + spatialLast.total + '.';
  }
  if (errorCheckingLast) {
    summary += ' Their most recent Error Checking attempt was ' + (errorCheckingLast.test_name || errorCheckingLast.test_id)
      + ', scoring ' + errorCheckingLast.score + '/' + errorCheckingLast.total + '.';
  }
  if (deductiveLast) {
    summary += ' Their most recent Deductive Reasoning attempt was ' + (deductiveLast.test_name || deductiveLast.test_id)
      + ', scoring ' + deductiveLast.score + '/' + deductiveLast.total + '.';
  }
  if (inductiveLast) {
    summary += ' Their most recent Inductive Reasoning attempt was ' + (inductiveLast.test_name || inductiveLast.test_id)
      + ', scoring ' + inductiveLast.score + '/' + inductiveLast.total + '.';
  }
  if (last) {
    summary += ' Their most recent attempt was ' + (last.test_name || last.test_id) + ', scoring '
      + last.score + '/' + last.total + '.';
    if (best && best.id !== last.id) {
      summary += ' Their best score is ' + best.score + '/' + best.total
        + ' on ' + (best.test_name || best.test_id) + '.';
    }
  } else if (!verbal.last && !numerical.last && !situationalLast && !spatialLast && !errorCheckingLast && !deductiveLast && !inductiveLast) {
    summary += ' This candidate has not taken an aptitude test yet - suggest starting with Easy Test 1.';
  }

  respond(200, {
    success: true,
    app: {
      id: 'aptitude-test',
      name: 'Aptitude Test',
      free: false,
      trial_days: 14,
      requires_pro_after_trial: true,
      language: 'English (questions, answer options and rule explanations)',
      note: 'All tests are included during the 14-day trial and with Casemate Pro.',
    },
    families: FAMILIES,
    diagrammatic: {
      status: 'available',
      tests: TESTS.concat(AD_DIAGRAMMATIC_TESTS),
      test_count: TESTS.length + AD_DIAGRAMMATIC_TESTS.length,
      total_questions: totalQuestions + AD_DIAGRAMMATIC_TESTS.length * 30,
      difficulty_levels: ['Easy (15 tests)', 'Medium (15 tests)', 'Hard (15 tests)'],
      formats: [
        '3x3 matrix with the last cell missing, pick 1 of 5 options A-E',
        'A 4 or 5 step sequence, pick the next figure from 5 options A-E',
        'Set A / Set B: does the question figure belong to set A, set B, or neither',
        'AssessmentDay operators and processes: follow an input diagram through a key of operators to the output diagram and pick the missing diagram or operator from four pictures A-D',
      ],
      rule_types: ['rotation', 'mirror flip', 'fill style', 'size', 'count', 'position', 'shape type', 'colour', 'total straight edges', 'odd/even count', 'curved vs straight'],
    },
    inductive: {
      status: 'available',
      tests: INDUCTIVE_TESTS,
      test_count: INDUCTIVE_TESTS.length,
      total_questions: INDUCTIVE_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      format: '50 tests: 12 AssessmentDay Inductive Reasoning booklets (Tests 1 to 12; five-figure sequences with pictures A-E, 25 minutes each) and 4 AssessmentDay Inductive Logic tests (12 sets of 4 figures, 48 questions, 12 minutes: assign each new diamond figure to Set A or Set B, with the rule for each set explained) and 34 original tests where a sequence of five figures runs under exactly two rules; pick the sixth figure from five options A-E, with both rules explained after submission.',
      rule_types: ['rotation', 'movement clockwise / anticlockwise', 'fill alternation', 'number of sides', 'shaded-segment rotation', 'count increment', 'mirroring', 'grid position', 'notches', 'bar level'],
    },
    deductive: {
      status: 'available',
      tests: DEDUCTIVE_TESTS,
      test_count: DEDUCTIVE_TESTS.length,
      total_questions: DEDUCTIVE_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['AssessmentDay tests: mixed', 'Original bank: Easy (Tests 1-3, 11-17), Medium (Tests 4-6, 18-24), Hard (Tests 7-10, 25-30)', 'Tests 31-46 rotate Easy, Medium, Hard'],
      format: '50 tests: 4 AssessmentDay Deductive Reasoning tests (22 questions, 25 minutes, original booklet premises, tables and diagrams, options A-E, official answers with a written explanation for each question; internet connection needed) and 46 original tests. A passage of premises and a statement to judge: True, False, or Insufficient Information — plus five-option "which plan fits" table questions, with the reasoning explained after submission.',
      question_families: ['syllogisms', 'conditional (if-then) arguments', 'ranking & ordering', 'numeric relationships', 'plan-selection tables'],
    },
    error_checking: {
      status: 'available',
      tests: ERROR_CHECKING_TESTS,
      test_count: ERROR_CHECKING_TESTS.length,
      total_questions: ERROR_CHECKING_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['Easy (Tests 1-3, 11-17)', 'Medium (Tests 4-6, 18-24)', 'Hard (Tests 7-10, 25-30)', 'Tests 31-45 rotate Easy, Medium, Hard'],
      format: 'An original data table and a hand-copied version rendered side by side; the candidate spots exactly where they differ at 20 seconds a question, with every corrupted cell highlighted after submission.',
      question_families: ['row error counts', 'correct-version lookups', 'locate the column', 'locate the row', 'whole-table error counts'],
      error_types: ['adjacent characters transposed', 'digit changed', 'letter changed', 'letter case flipped', 'look-alike characters (0/O, 1/I, 5/S, 8/B, 2/Z, 6/G) at hard level'],
    },
    spatial: {
      status: 'available',
      tests: SPATIAL_TESTS,
      test_count: SPATIAL_TESTS.length,
      total_questions: SPATIAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['Mixed per test: 9 Easy, 12 Medium, 9 Hard'],
      format: 'Original responsive SVG visuals with four options A-D; 30 questions and 20 minutes per test.',
      question_families: ['2D rotation', 'reflection', 'rotation odd-one-out', 'spatial sequences', 'matrix completion', '3D folding', '3D unfolding', 'isometric block rotation', 'top views', 'piece assembly'],
    },
    numerical: {
      status: 'available',
      tests: NUMERICAL_TESTS,
      test_count: NUMERICAL_TESTS.length,
      total_questions: NUMERICAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['Mixed source tests', 'Original bank: 9 Easy, 12 Medium, 9 Hard per test'],
      format: '62 tests total: all 12 AssessmentDay reconstructions, 6 AssessmentDay Numerical Comprehension word-problem tests (18 questions, 18 minutes), 2 AssessmentDay Advanced tests (comparison of quantities and sufficiency of information, 30 questions, 30 minutes), 4 AssessmentDay Capp tests (12 questions each, picture exhibits, options / typed answers / rankings, untimed), 2 AssessmentDay Cut-e style tests (six booklet exhibits, True / False / Cannot Say, 18 minutes), six other source-attributed tests, and 30 original responsive-table tests. Timings and answer-option counts follow each source.',
      question_families: ['table lookup', 'totals', 'ratios', 'percentage change', 'weighted averages', 'multi-step projections', 'chart interpretation'],
    },
    verbal: {
      status: 'available',
      tests: VERBAL_TESTS,
      test_count: VERBAL_TESTS.length,
      total_questions: VERBAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['AssessmentDay tests: mixed', 'Original bank: 9 Easy, 12 Medium, 9 Hard per test'],
      format: '52 tests: 11 AssessmentDay verbal comprehension tests, 3 AssessmentDay Cut-e style tests (one reading booklet, 38 True / False / Cannot Say statements, 18 minutes), 4 AssessmentDay Syllogisms tests (two premises, five conclusions A-E, 10 seconds per question) (multiple choice, source timing), 4 AssessmentDay Capp tests (15 untimed sets each: message style A/B, word choice, typed corrections, ranking, True / False / Cannot Say) and 30 original tests (six 150-250 word passages each, five True / False / Cannot Say statements per passage, 30 questions and 25 minutes).',
      topics: ['business', 'banking', 'FMCG', 'technology', 'healthcare', 'workforce and social trends'],
    },
    logical: {
      status: 'available',
      tests: LOGICAL_TESTS,
      test_count: LOGICAL_TESTS.length,
      total_questions: LOGICAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['Easy (Tests 1, 2, 4, 9, 13, 14 and 15)', 'Medium (Tests 3, 5, 7, 10 and 12)', 'Hard (Tests 6, 8 and 11)'],
      format: '50 tests: 35 original Casemate tests (20 questions, 60 seconds each) and fifteen AssessmentDay tests with the original booklet pictures: Tests 1 to 12 show a grid of symbols with one cell missing and 12 lettered options (12 questions, 70 seconds each); Tests 13, 14 and 15 show a pattern with a missing section and 9 options (15 questions, 30 seconds each). Official answers; the rules are explained for the 12-option tests.',
    },
    mechanical: {
      status: 'available',
      tests: MECHANICAL_TESTS,
      test_count: MECHANICAL_TESTS.length,
      total_questions: MECHANICAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['AssessmentDay tests: mixed'],
      format: 'Five Mechanical Reasoning tests (AssessmentDay Tests 1 to 4 plus original Casemate Test 5), each with 20 questions and a 12-minute limit: a picture of a mechanical system and one correct option from four or five. Original booklet pictures (internet connection needed), official answers and a worked explanation for every question.',
      topics: ['levers and balance', 'pulleys', 'gears and belt drives', 'fluids and pressure', 'forces and stability'],
    },
    simulation: {
      status: 'available',
      app: 'Aptitude Test Simulation',
      tests: SIMULATION_TESTS,
      test_count: SIMULATION_TESTS.length,
      total_questions: SIMULATION_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      format: 'Three full-length 25-question rounds, 30 minutes each, with no breaks between the verbal, quantitative and abstract sections. One correct answer per question. Charts, tables and figures are drawn from the original files (internet connection needed). Scores are saved as simulation attempts.',
      sections: ['Verbal Reasoning (Q1-9)', 'Quantitative Reasoning (Q10-19)', 'Abstract Reasoning (Q20-25)'],
      pepsico_answer_key: {
        app: 'PepsiCo Test (its own dock app)',
        title: 'PepsiCo numerical test: answer key',
        items: 35,
        item_types: ['charts (8)', 'tables (4)', 'verbal reasoning (13: True / False / Cannot say, plus one pick-the-true-statement)', 'logical reasoning picture sequences (10)'],
        format: 'Screenshots of thirty-five questions (twelve numerical, thirteen verbal, ten logical picture sequences) with the answer and full working. The source had no answer key, so all thirty-five answers are worked out by Casemate and tagged as derived. Item 8 (online to in-store sales ratio, 2022) works out at 2.78 : 1, which is not among its options (closest 2.73 : 1), so it is flagged for the candidate to check. Logical Item 27 (rotating line and ball) and Item 31 (top shape, body and arrow; E or D) are the least certain of the ten sequences. Verbal Item 24 is a mismatched screenshot (the social responsibility passage under the gun statement) answered Cannot say. Verbal Item 17 (internet bandwidth main argument) is answered False as a judgement call, with Cannot say as the other reading. Not timed and not scored.',
      },
      shopee_answer_key: {
        app: 'Shopee Test (its own dock app)',
        title: 'Shopee round 1 test: answer key',
        items: 39,
        item_types: ['numerical reasoning (9)', 'verbal reasoning (10)', 'integrated reasoning (10)', 'logical sequences (10)'],
        format: 'Screenshots from a screen recording of the test, with the answer, the working where it can be calculated, and the key\'s own Vietnamese notes. Not timed and not scored. Statuses: matches the key and re-derived, from the key only, derived by Casemate, disputed, or no answer recorded.',
      },
      hsbc_answer_key: {
        app: 'HSBC Test (its own dock app)',
        title: 'HSBC online assessment: answer key',
        items: 48,
        item_types: ['visual sequences (17)', 'calendar puzzles (8)', 'schedules and rooms (6)', 'pie charts (7)', 'bar charts and graphs (5)', 'ordering puzzles (5)'],
        format: 'Screenshots of real interactive items with the correct answer drawn in, plus the answer in words, the working where it can be calculated, and the key\'s own Vietnamese notes. Three items (a meeting-schedule calendar, an office calendar and the hospital procedures schedule) have no written answer in the key; the first two carry a worked answer flagged as derived. Not timed and not scored.',
      },
    },
    in_tray: {
      status: 'available',
      tests: IN_TRAY_TESTS,
      test_count: IN_TRAY_TESTS.length,
      difficulty_levels: ['AssessmentDay exercises: mixed'],
      format: 'Six AssessmentDay exercises numbered In-Tray 1 to 3 and E-Tray 1 to 3 (In-Tray 3 and E-Tray 3 were the free exercises) with the original booklet pages shown as pictures (internet connection needed). In-Tray: choose a priority and write the actions for every item, then tick off the model answers; In-Tray 2 uses the official points table with bonus points. E-Tray 1: write a reply to each e-mail and mark against the official positive and negative indicators. E-Tray 2 (Cannon Carlisle, 10 e-mails, 45 minutes) and E-Tray 3 (Ainswell, 4 e-mails, 15 minutes): choose the most and least effective response for each e-mail (auto-scored, one point for each correct pick). Scores are self-marked or auto-marked and saved with the attempt.',
      competencies: ['analysis and problem solving', 'planning and organising', 'relationship management', 'financial management', 'focus on quality solutions'],
    },
    critical: {
      status: 'available',
      tests: CRITICAL_TESTS,
      test_count: CRITICAL_TESTS.length,
      total_questions: CRITICAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['AssessmentDay tests: mixed'],
      format: '50 tests: eight AssessmentDay Critical Thinking tests (Assumptions Tests 1, 2, 3, 5, 6, 7, 8 and 9) and 42 original Casemate Assumptions Practice Tests, each with 12 questions and a 12-minute limit: four statements with three proposed assumptions each, answered Assumption Made or Assumption Not Made. Official answers and explanations.',
      topics: ['assumptions', 'statements and implications', 'logical justification'],
    },
    situational: {
      status: 'available',
      tests: SITUATIONAL_TESTS,
      test_count: SITUATIONAL_TESTS.length,
      total_questions: SITUATIONAL_TESTS.reduce(function (sum, test) { return sum + Number(test.questions); }, 0),
      difficulty_levels: ['AssessmentDay tests: mixed', 'Original bank: 9 Easy, 12 Medium, 9 Hard per test'],
      format: '50 untimed tests: 5 AssessmentDay Practice SJTs (16 questions each in four formats: most and least likely to perform with four responses, ranked responses 1 to 4, most and least effective with four responses, and rated responses with five responses and five ratings used once) and 45 original tests (30 questions each, five workplace responses receive Very Effective, Effective, Slightly Effective, Ineffective and Counterproductive exactly once). Proximity to the model answer earns partial credit.',
      competency_families: ['planning and organising', 'people and relationships', 'analysis and decision-making', 'professional integrity', 'client service', 'collaboration', 'governance', 'change leadership'],
    },
    user: {
      identified: !!(explicitUserKey || email || sessionId),
      found: diagrammatic.length > 0,
      attempts: diagrammatic.length,
      best: best ? shape(best) : null,
      last: last ? shape(last) : null,
      best_per_test: Object.keys(perTest).map(function (key) { return shape(perTest[key]); }),
      inductive: {
        found: inductive.length > 0,
        attempts: inductive.length,
        best: inductiveBest ? shape(inductiveBest) : null,
        last: inductiveLast ? shape(inductiveLast) : null,
      },
      deductive: {
        found: deductive.length > 0,
        attempts: deductive.length,
        best: deductiveBest ? shape(deductiveBest) : null,
        last: deductiveLast ? shape(deductiveLast) : null,
      },
      error_checking: {
        found: errorChecking.length > 0,
        attempts: errorChecking.length,
        best: errorCheckingBest ? shape(errorCheckingBest) : null,
        last: errorCheckingLast ? shape(errorCheckingLast) : null,
      },
      spatial: {
        found: spatial.length > 0,
        attempts: spatial.length,
        best: spatialBest ? shape(spatialBest) : null,
        last: spatialLast ? shape(spatialLast) : null,
      },
      numerical: {
        found: numerical.rows.length > 0,
        attempts: numerical.rows.length,
        best: numerical.best ? shape(numerical.best) : null,
        last: numerical.last ? shape(numerical.last) : null,
      },
      verbal: {
        found: verbal.rows.length > 0,
        attempts: verbal.rows.length,
        best: verbal.best ? shape(verbal.best) : null,
        last: verbal.last ? shape(verbal.last) : null,
      },
      logical: {
        found: logical.rows.length > 0,
        attempts: logical.rows.length,
        best: logical.best ? shape(logical.best) : null,
        last: logical.last ? shape(logical.last) : null,
      },
      mechanical: {
        found: mechanical.rows.length > 0,
        attempts: mechanical.rows.length,
        best: mechanical.best ? shape(mechanical.best) : null,
        last: mechanical.last ? shape(mechanical.last) : null,
      },
      simulation: {
        found: simulation.rows.length > 0,
        attempts: simulation.rows.length,
        best: simulation.best ? shape(simulation.best) : null,
        last: simulation.last ? shape(simulation.last) : null,
      },
      in_tray: {
        found: inTray.rows.length > 0,
        attempts: inTray.rows.length,
        best: inTray.best ? shape(inTray.best) : null,
        last: inTray.last ? shape(inTray.last) : null,
      },
      critical: {
        found: critical.rows.length > 0,
        attempts: critical.rows.length,
        best: critical.best ? shape(critical.best) : null,
        last: critical.last ? shape(critical.last) : null,
      },
      situational: {
        found: situational.length > 0,
        attempts: situational.length,
        best: situationalBest ? shape(situationalBest) : null,
        last: situationalLast ? shape(situationalLast) : null,
      },
      lookup_error: lookupError,
    },
    summary: summary,
  });
} catch (error) {
  console.error('[aptitude-info] failed', error);
  respond(500, {
    success: false,
    error: 'Could not read the aptitude test info: ' + (error && error.message ? error.message : String(error)),
  });
}
`;

/* ============================================================================
 * MCP tool registry entry
 * ==========================================================================*/

interface CustomerToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description?: string; required?: boolean }>;
  action: {
    type: 'api_call';
    method: 'GET' | 'POST';
    endpoint: string;
    bodyMapping?: Record<string, string>;
  };
}

const APTITUDE_TOOL: CustomerToolDefinition = {
  name: APTITUDE_TOOL_NAME,
  description:
    'Look up Casemate’s Aptitude Test app. Call this whenever the candidate asks about aptitude tests, '
    + 'diagrammatic / inductive / deductive / logical / abstract / spatial / numerical / verbal reasoning, error checking / data accuracy, '
    + 'situational judgement / SJT tests, the aptitude round at an MT programme, what practice tests exist, how many questions or how long '
    + 'a test takes, or how they did on a test they already took. '
    + 'Returns all twelve live aptitude families (including In-Tray & E-Tray) and every Diagrammatic, Inductive, Deductive, Error Checking, Spatial, Numerical, Verbal and '
    + 'Situational Judgement test with its question count, timing, format and difficulty, '
    + 'and this candidate’s own attempt count, best score and most recent score. Relay accurately that the catalogue lookup is informational, '
    + 'while taking tests requires an active 14-day trial or Casemate Pro, and the whole app is in '
    + 'ENGLISH on purpose, because the real aptitude round is sat in English.',
  parameters: {
    email: {
      type: 'string',
      required: false,
      description:
        'The candidate’s sign-in email, if you know it. Optional — the platform already forwards their session, '
        + 'so leave this out unless the candidate explicitly gave you an email to look up.',
    },
  },
  action: {
    type: 'api_call',
    method: 'POST',
    endpoint: `/api/hooks/execute/${WORKSPACE_ID}/${APTITUDE_HOOK_NAME}`,
    bodyMapping: { email: 'email' },
  },
};

/* ============================================================================
 * Idempotent deployment (runs on app open and on space load)
 * ==========================================================================*/

let ensurePromise: Promise<void> | null = null;

async function ensureHook(): Promise<void> {
  const listResponse = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks`);
  if (!listResponse.ok) throw new Error('Could not list workspace hooks.');
  const payload = await listResponse.json();
  const hooks = Array.isArray(payload) ? payload : payload.hooks || [];
  const existing = hooks.find((hook: any) => hook.name === APTITUDE_HOOK_NAME);

  if (!existing) {
    const created = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: APTITUDE_HOOK_NAME,
        description: APTITUDE_HOOK_DESCRIPTION,
        code: APTITUDE_HOOK_CODE,
        language: 'javascript',
        enabled: true,
      }),
    });
    if (!created.ok) throw new Error('Could not create the aptitude info hook.');
    return;
  }

  if (
    existing.description !== APTITUDE_HOOK_DESCRIPTION ||
    existing.code !== APTITUDE_HOOK_CODE ||
    existing.enabled !== true
  ) {
    const updated = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks/${existing.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: APTITUDE_HOOK_DESCRIPTION,
        code: APTITUDE_HOOK_CODE,
        enabled: true,
      }),
    });
    if (!updated.ok) throw new Error('Could not update the aptitude info hook.');
  }
}

async function ensureTool(): Promise<void> {
  const url = `/api/workspace-settings/${WORKSPACE_ID}/customer-tools`;
  const response = await fetch(url);
  let registry: { version: number; tools: CustomerToolDefinition[] } = { version: 1, tools: [] };
  if (response.ok) {
    const payload = await response.json();
    if (payload && payload.registry && Array.isArray(payload.registry.tools)) registry = payload.registry;
  } else if (response.status !== 404) {
    throw new Error(`Could not read the customer tools registry (${response.status}).`);
  }

  const current = registry.tools.find((tool) => tool.name === APTITUDE_TOOL_NAME);
  if (current && JSON.stringify(current) === JSON.stringify(APTITUDE_TOOL)) return;

  // Read-modify-write: PUT replaces the whole array, so every OTHER Casemate
  // tool (get_assessment_result, generate_practice_case, …) must be carried
  // over untouched.
  const next = {
    version: registry.version || 1,
    tools: registry.tools.filter((tool) => tool.name !== APTITUDE_TOOL_NAME).concat([APTITUDE_TOOL]),
  };
  const saved = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: next }),
  });
  if (!saved.ok) throw new Error(`Could not register ${APTITUDE_TOOL_NAME} (${saved.status}).`);
}

/**
 * Deploy (or refresh) the hook AND Mate's get_aptitude_test_info tool. Safe to
 * call on every mount — it only writes when something actually differs, and it
 * resolves at most once per page load.
 */
export function ensureAptitudeInfoHook(): Promise<void> {
  if (ensurePromise) return ensurePromise;
  ensurePromise = (async () => {
    await ensureHook();
    await ensureTool();
  })().catch((error) => {
    ensurePromise = null;
    console.warn('[aptitude-info] deployment failed:', error);
    throw error;
  });
  return ensurePromise;
}
