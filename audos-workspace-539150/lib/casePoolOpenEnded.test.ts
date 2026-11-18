import { CASE_POOL_LIBRARY, CASE_POOL_MCQ_IMPORT_AUDIT, SELECTABLE_CASE_POOL_LIBRARY, type FullCase } from './casePoolLibrary';
import {
  CHARTS_EASY_CASE_POOL_CASES,
  CHARTS_EASY_QUESTIONS,
  CHARTS_EASY_RECORDS,
  chartsEasyContext,
  chartsEasyPoolTask,
  validateChartsEasyBank,
} from './chartsEasyBank';
import { chartsEasyPoolAnswer } from './chartsEasyPoolAnswer';
import {
  STRUCTURES_EASY_CASE_POOL_CASES,
  STRUCTURES_EASY_QUESTIONS,
  STRUCTURES_EASY_RECORDS,
  structuresEasyPoolTask,
  validateStructuresEasyBank,
} from './structuresEasyBank';
import { ALL_LIBRARY_QUESTIONS, CASE_DRILL_EMBEDDED_OPTION_AUDIT } from './skillQuestionLibrary';
import {
  casePoolTaskFromDrill,
  drillEmbeddedOptionProblems,
  findEmbeddedOptions,
  findMcqContent,
  poolCaseMcqProblems,
  splitEmbeddedOptions,
  stripMcqContent,
  stripPoolCaseMcq,
} from './casePoolMcqGuard';
import { learnerFacingStoredPrompt, libraryCaseTaskText, toLearnerFacingPoolCase, toLearnerFacingQuestion } from './learnerFacingContent';

function fail(message: string): never {
  throw new Error(`Case Pool open-ended audit: ${message}`);
}

function assert(condition: unknown, message: string): void {
  if (!condition) fail(message);
}

const CAPTION_FIELDS = ['title', 'subtitle', 'footnote', 'sourceNote', 'analyticalPurpose', 'label', 'context', 'note'];

/** Everything a learner reads about a case before submitting. */
function learnerFacingText(item: FullCase): string[] {
  const exhibits = [...(item.data_exhibits || []), ...(item.journey_exhibits || [])] as unknown as Array<Record<string, unknown>>;
  const captions = exhibits.flatMap((exhibit) => CAPTION_FIELDS.map((field) => String(exhibit[field] ?? '')));
  return [item.title, item.situation, item.key_question, item.objective || '', ...(item.constraints || []), ...(item.approach_tips || []), ...(item.framework_hints || []), ...captions].filter(Boolean);
}

function numbersIn(text: string): string[] {
  return (text.match(/\d+(?:,\d{3})*(?:\.\d+)?/g) || []).map((value) => value.replace(/,/g, ''));
}

function detectorSelfTest(): void {
  const positives: Array<[string, string]> = [
    ['A. B. C. D. list', 'Which one?\n\nA. first\nB. second\nC. third\nD. fourth'],
    ['A) B) list', 'Which one?\nA) first\nB) second'],
    ['(A) (B) list', 'Which one?\n(A) first\n(B) second\n(C) third'],
    ['inline (A) (B)', 'Which one? (A) first (B) second (C) third'],
    ['inline A) B)', 'Pick one: A) first B) second C) third'],
    ['Choices header', 'The task.\nChoices:\nsomething'],
    ['Answer choices header', 'The task.\n\nAnswer choices:\n'],
    ['Option A: list', 'Task.\nOption A: first\nOption B: second\nOption C: third'],
    ['Correct answer', 'The correct answer is Business Line A.'],
    ['Correct option label', 'Correct option: A. Business Line A'],
    ['Answer key', 'Answer key: A. something'],
    ['Why / scoring', 'Why / scoring: because the others are wrong'],
    ['distractor', 'The distractors are plausible but wrong.'],
    ['option explanation', 'Option explanations follow the key.'],
    ['answer letters', 'the letters label the points (separate from the answer letters)'],
    ['option verdict', 'Option B is incorrect because it adds the wrong lines.'],
  ];
  positives.forEach(([name, text]) => assert(findMcqContent(text).length > 0, `the detector missed: ${name}.`));
  const negatives: Array<[string, string]> = [
    ['plain task', 'Which Yonder Farms line generates the highest gross profit? Calculate the gross profit of each line using the exhibits.'],
    ['two business options named inline', 'Management must choose between Option A and Option B for the rollout.'],
    ['two labelled business options', 'Option A: build in-house\nOption B: partner with a distributor'],
    ['plan names in prose', 'Plan A. Next steps follow. Plan B. More steps follow.'],
    ['numbered steps', '1) read the exhibit\n2) calculate each line'],
    ['bullet points', '- first\n- second'],
    ['points labelled A to E in a definition', 'Options A to E are five alternative installer options; the exhibit plots each option.'],
    ['a worked conclusion', 'Business Line A: 54 × 28% = 15.12 billion VND'],
  ];
  negatives.forEach(([name, text]) => assert(findMcqContent(text).length === 0, `the detector flagged legitimate text: ${name}.`));
  assert(findMcqContent('A worked answer may say the correct answer needs working.', { postSubmission: true }).length === 0, 'a worked answer may use the plain wording “correct answer”.');

  const leaky = 'Which line earns the most?\n\nA. Line A: 10 × 20% = 2.00\nB. Line B: 5 × 30% = 1.50\nC. Line C: 8 × 10% = 0.80\nD. Line D: 4 × 20% = 0.80';
  const split = splitEmbeddedOptions(leaky);
  assert(split.stem === 'Which line earns the most?' && split.options.length === 4 && split.options[0] === 'Line A: 10 × 20% = 2.00', 'splitEmbeddedOptions must separate the stem from four options.');
  assert(findMcqContent(stripMcqContent(leaky)).length === 0 && !/Line B/.test(stripMcqContent(leaky)), 'stripMcqContent must remove every option.');
  const task = casePoolTaskFromDrill(leaky, 'Show your working.');
  assert(task === 'Which line earns the most? Show your working.', `casePoolTaskFromDrill must keep only the stem and the instruction; got “${task}”.`);
  const inline = splitEmbeddedOptions('Pick one (A) first; (B) second; (C) third');
  assert(inline.stem === 'Pick one' && inline.options.join('|') === 'first|second|third', 'inline (A) (B) options must be separated.');
}

function conversionTests(): void {
  const leakySource = {
    id: 'case-test-leak',
    title: 'Test case',
    industry: 'fmcg',
    type: 'profitability',
    difficulty: 'easy',
    situation: 'Background.\nChoices:\nA) one\nB) two',
    key_question: 'Which line earns the most?\n\nA. Line A: 10 × 20% = 2.00\nB. Line B: 5 × 30% = 1.50\nC. Line C: 8 × 10% = 0.80',
    answer_choices: ['Line A: 10 × 20% = 2.00', 'Line B: 5 × 30% = 1.50'],
    data_exhibits: [],
    journey_exhibits: [{ title: 'Exhibit', footnote: 'Correct answer: A' }],
    framework_hints: [],
    approach_tips: ['Option A: compare lines\nOption B: compare margins\nOption C: compare revenue'],
    objective: 'Which line earns the most?\n(A) Line A (B) Line B',
    constraints: ['Name the correct option and justify it.'],
    model_answer: { situation_analysis: 'Answer key: A. Line A', framework_applied: '', key_findings: ['Correct option: A. Line A', 'Why / scoring: the other options are distractors.'], recommendation: 'Line A' },
    tags: [],
  } as unknown as FullCase;

  const problems = poolCaseMcqProblems(leakySource);
  ['answer_choices', 'situation', 'key_question', 'objective', 'constraints[0]', 'approach_tips[0]', 'journey_exhibits 1 footnote', 'model_answer.situation_analysis', 'model_answer.key_findings[0]', 'model_answer.key_findings[1]']
    .forEach((where) => assert(problems.some((problem) => problem.includes(where)), `the Case Pool validator missed a leak in ${where}.`));

  const imported = toLearnerFacingPoolCase(leakySource);
  assert(imported.answer_choices === undefined, 'import must drop answer_choices.');
  assert(findMcqContent(imported.key_question).length === 0 && !/Line B/.test(imported.key_question), 'import must remove a lettered option list from the task.');
  assert(libraryCaseTaskText(imported) === imported.key_question, 'the grader and the saved attempt must receive the task only.');

  const stripped = stripPoolCaseMcq(leakySource);
  const strippedProblems = poolCaseMcqProblems({ ...stripped, model_answer: undefined });
  assert(strippedProblems.length === 0, `the import strip left MCQ content behind: ${strippedProblems.join(' | ')}`);
  assert(stripped.answer_choices === undefined, 'the import strip must drop answer_choices.');

  const sharedExhibits = [{ title: 'Revenue by line', unit: 'billion VND' }];
  const untouched = stripPoolCaseMcq({ id: 'x', journey_exhibits: sharedExhibits });
  assert(untouched.journey_exhibits === sharedExhibits, 'a clean exhibit list must keep its identity because Case Drill shares it by reference.');

  const saved = 'Which line earns the most?\n\nAnswer choices:\nA. Line A: 10 × 20% = 2.00\nB. Line B: 5 × 30% = 1.50\nC. Line C: 8 × 10% = 0.80\nD. Line D: 4 × 20% = 0.80';
  assert(findMcqContent(learnerFacingStoredPrompt(saved)).length === 0, 'a saved prompt that stored its options must be shown without them.');

  const embeddedDrill = toLearnerFacingQuestion({
    id: 'test-embedded',
    skill: 'charts',
    answerMode: 'choice',
    question: 'Which line earns the most?\nA. Line A\nB. Line B\nC. Line C\nD. Line D',
    correctAnswer: 'Line A',
    explanation: 'Because.',
  } as never) as { question: string; options?: string[] };
  assert(embeddedDrill.question === 'Which line earns the most?' && embeddedDrill.options?.join('|') === 'Line A|Line B|Line C|Line D', 'a Case Drill question with typed-in options must keep them only in the options field.');
  const alreadySeparated = toLearnerFacingQuestion({
    id: 'test-separated',
    skill: 'charts',
    answerMode: 'choice',
    question: 'Which line earns the most?\nA. Line A\nB. Line B',
    options: ['Line A', 'Line B', 'Line C', 'Line D'],
    correctAnswer: 'Line A',
    explanation: 'Because.',
  } as never) as { question: string; options?: string[] };
  assert(alreadySeparated.question === 'Which line earns the most?' && alreadySeparated.options?.length === 4, 'options that already live in the options field must not be replaced or duplicated in the stem.');
}

function sourceRecordTests(): void {
  assert(CASE_POOL_MCQ_IMPORT_AUDIT.length === 0, `Case Pool sources still contain MCQ content: ${CASE_POOL_MCQ_IMPORT_AUDIT.slice(0, 8).join(' | ')}`);
  assert(validateChartsEasyBank().length === 0, `Charts Easy bank: ${validateChartsEasyBank().join(' | ')}`);
  assert(validateStructuresEasyBank().length === 0, `Structures Easy bank: ${validateStructuresEasyBank().join(' | ')}`);

  CASE_POOL_LIBRARY.forEach((item) => {
    const itemProblems = poolCaseMcqProblems(item);
    assert(itemProblems.length === 0, `${item.id} still shows MCQ content: ${itemProblems.slice(0, 3).join(' | ')}`);
    assert(item.answer_choices === undefined, `${item.id} still carries answer_choices.`);
    assert(libraryCaseTaskText(item) === item.key_question, `${item.id} task text must not have anything appended.`);
  });
  assert(SELECTABLE_CASE_POOL_LIBRARY.every((item) => item.id.startsWith('case-')), 'Case Pool case ids must keep their stable form.');
}

function chartsEasyTests(): void {
  assert(CHARTS_EASY_CASE_POOL_CASES.length === CHARTS_EASY_RECORDS.length, 'every Charts Easy record must keep its Case Pool case.');
  CHARTS_EASY_RECORDS.forEach((record, index) => {
    const item = CHARTS_EASY_CASE_POOL_CASES[index];
    const question = CHARTS_EASY_QUESTIONS[index];
    assert(item.id === `case-${record.code.toLowerCase()}`, `${record.code} Case Pool id changed.`);
    assert(item.key_question === chartsEasyPoolTask(record), `${record.code} Case Pool task must be the open task.`);

    const visible = learnerFacingText(item).join('\n');
    record.options.forEach((option) => assert(!visible.includes(option), `${record.code} shows an answer option before submission: “${option}”.`));
    assert(!/answer letters?|answer options?/i.test(visible), `${record.code} refers to answer options.`);
    assert(visible.includes(chartsEasyContext(record, 'pool')), `${record.code} Case Pool situation must keep the shared brief.`);

    // Case Drill keeps its four options in the separate field.
    assert(question.options?.length === 4 && question.options.includes(record.key), `${record.code} Case Drill must keep its four options and key.`);
    assert(findEmbeddedOptions(question.question).length === 0, `${record.code} Case Drill question text must not contain its options.`);

    // Facts are intact and the worked answer is derived from them.
    assert(item.journey_exhibits === record.exhibits, `${record.code} must keep the shared exhibit objects.`);
    const worked = chartsEasyPoolAnswer(record);
    assert(worked.key_calculations.length > 0, `${record.code} worked answer could not be computed from its exhibits.`);
    const reference = `${worked.key_calculations.join('\n')}\n${worked.key_findings.join('\n')}`.replace(/,/g, '');
    numbersIn(record.key).forEach((value) => assert(reference.includes(value), `${record.code} worked answer does not reproduce ${value} from the answer key.`));
    assert(item.model_answer.recommendation === record.key, `${record.code} Case Pool conclusion must match Case Drill.`);
    const reveal = JSON.stringify(item.model_answer);
    assert(!/Answer key|Correct option|Why \/ scoring/i.test(reveal), `${record.code} worked answer still carries answer-key scaffolding.`);
  });
}

function structuresEasyTests(): void {
  assert(STRUCTURES_EASY_CASE_POOL_CASES.length === STRUCTURES_EASY_RECORDS.length, 'every Structures Easy record must keep its Case Pool case.');
  STRUCTURES_EASY_RECORDS.forEach((record, index) => {
    const item = STRUCTURES_EASY_CASE_POOL_CASES[index];
    const question = STRUCTURES_EASY_QUESTIONS[index];
    assert(item.id === `case-${record.id}`, `${record.id} Case Pool id changed.`);
    assert(item.key_question === structuresEasyPoolTask(record), `${record.id} Case Pool task must be the open task.`);
    assert(!/Which issue tree is the strongest/i.test(item.key_question), `${record.id} task still uses the multiple-choice wording.`);
    const visible = learnerFacingText(item).join('\n');
    record.options.forEach((option) => assert(!visible.includes(option), `${record.id} shows a Case Drill tree option before submission.`));
    assert(!/four trees|decision above/i.test(visible), `${record.id} refers to the four Case Drill trees.`);
    assert(question.options?.length === 4, `${record.id} Case Drill must keep its four options.`);
    assert(findEmbeddedOptions(question.question).length === 0, `${record.id} Case Drill question text must not contain its options.`);
    assert(JSON.stringify(item.model_answer.issue_tree) === JSON.stringify(record.branches.map((branch) => `${branch.charAt(0).toUpperCase()}${branch.slice(1)}`)), `${record.id} worked answer must keep the model branches.`);
    assert(!/decision above/.test(JSON.stringify(item.model_answer)), `${record.id} worked answer still quotes a distractor tree.`);
  });
}

function yonderFarmsTests(): void {
  const item = CHARTS_EASY_CASE_POOL_CASES.find((entry) => entry.id === 'case-e-ch-050');
  const record = CHARTS_EASY_RECORDS.find((entry) => entry.code === 'E-CH-050');
  const stored = CASE_POOL_LIBRARY.find((entry) => entry.id === 'case-e-ch-050');
  if (!item || !record || !stored) fail('Yonder Farms (case-e-ch-050) is missing.');

  assert(stored.key_question === 'Which Yonder Farms line generates the highest gross profit? Calculate the gross profit of each line using the exhibits, then explain what management should compare before prioritizing feed-efficiency improvements.', 'the Yonder Farms task must be the open-ended prompt.');
  assert(findMcqContent(stored.key_question).length === 0, 'the Yonder Farms task must hold no options.');
  const visible = learnerFacingText(stored).join('\n');
  ['15.12 billion VND', '14.40 billion VND', '7.13 billion VND', '15.12 VND bn', '14.40 VND bn', '7.13 VND bn', '11.16'].forEach((leak) => assert(!visible.includes(leak), `Yonder Farms shows “${leak}” before submission.`));
  assert(!/limit of this evidence|feed cost|incremental profit/i.test(visible), 'Yonder Farms must not state its model reasoning before submission.');

  const [revenue, margin] = record.exhibits;
  assert(revenue.series?.[0].values.join(',') === '54,40,31' && margin.series?.[0].values.join(',') === '28,36,23', 'Yonder Farms revenue and margin facts must be unchanged.');
  assert(revenue.categories?.join('|') === 'Business Line A|Business Line B|Business Line C', 'Yonder Farms line labels must be unchanged.');
  assert(/Business Lines A, B and C are three distinct aquaculture operating lines/.test(stored.situation), 'Yonder Farms must still define its three lines.');
  assert(stored.journey_exhibits === record.exhibits, 'Yonder Farms must keep its shared exhibits.');

  const worked = JSON.stringify(stored.model_answer);
  ['54 × 28% = 15.12', '40 × 36% = 14.40', '31 × 23% = 7.13', 'Limit of this evidence', 'feed-efficiency investment'].forEach((fragment) => assert(worked.includes(fragment), `the Yonder Farms worked answer must include “${fragment}”.`));
  assert(!worked.includes('11.16') && !/Correct option|Answer key|Why \/ scoring/i.test(worked), 'the Yonder Farms worked answer must not carry a distractor or answer-key scaffolding.');
  assert(stored.model_answer.recommendation === 'Business Line A: 54 × 28% = 15.12 billion VND', 'the current-gross-profit conclusion must remain Business Line A.');
  assert(record.options.length === 4 && record.options.includes(record.key), 'Case Drill must keep the Yonder Farms options in the separate options field.');
}

function caseDrillTests(): void {
  const problems = drillEmbeddedOptionProblems(ALL_LIBRARY_QUESTIONS);
  assert(problems.length === 0, `Case Drill questions still embed options: ${problems.slice(0, 5).join(' | ')}`);
  assert(CASE_DRILL_EMBEDDED_OPTION_AUDIT.remaining.length === 0, 'the Case Drill embedded-option audit must be empty.');
  ALL_LIBRARY_QUESTIONS.filter((question) => question.options?.length).forEach((question) => {
    (question.options || []).filter((option) => option.length >= 25).forEach((option) => {
      assert(!question.question.includes(option), `${question.id} appends an option to its question text: “${option.slice(0, 60)}”.`);
    });
  });
}

export function runCasePoolOpenEndedTests(): void {
  detectorSelfTest();
  conversionTests();
  sourceRecordTests();
  chartsEasyTests();
  structuresEasyTests();
  yonderFarmsTests();
  caseDrillTests();
}

runCasePoolOpenEndedTests();
