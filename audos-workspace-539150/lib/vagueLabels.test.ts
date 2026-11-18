import { CASE_POOL_LIBRARY } from './casePoolLibrary';
import {
  CHARTS_EASY_CASE_POOL_CASES,
  CHARTS_EASY_QUESTIONS,
  CHARTS_EASY_RECORDS,
  chartsEasyContext,
  chartsEasyPoolTask,
  validateChartsEasyBank,
  type ChartsEasyRecord,
} from './chartsEasyBank';
import { EXPERT_CASE_EXPANSION } from './expertCaseExpansion';
import { ALL_LIBRARY_QUESTIONS, type LibraryExhibit, type LibraryQuestion } from './skillQuestionLibrary';
import { findUndefinedVagueLabels, type LabelAuditItem } from './vagueLabelAudit';

const OLD_STAGE_NAMES = /\b(?:Core|Growth|Pilot|Adjacency|At-risk)\b/;

function fail(message: string): never {
  throw new Error(`Vague-label audit: ${message}`);
}

function exhibitsOf(question: LibraryQuestion): LibraryExhibit[] {
  return question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
}

function questionItem(question: LibraryQuestion): LabelAuditItem {
  const exhibits = exhibitsOf(question);
  const footnotes = exhibits.map((exhibit) => exhibit.footnote || '');
  const text = [question.businessContext, question.clientObjective, question.instruction, question.question, ...footnotes].filter(Boolean).join(' ');
  return { id: question.id, text, exhibits };
}

function exhibitStrings(exhibit: LibraryExhibit): string[] {
  return [
    exhibit.title,
    exhibit.footnote || '',
    ...(exhibit.categories || []),
    ...(exhibit.series || []).map((series) => series.name),
    ...(exhibit.axisConfig ? [exhibit.axisConfig.xLabel || '', exhibit.axisConfig.yLabel || ''] : []),
  ];
}

function recordText(record: ChartsEasyRecord): string {
  return [record.title, record.question, ...record.options, record.key, record.why, record.data, chartsEasyContext(record), ...record.exhibits.flatMap(exhibitStrings)].join('\n');
}

function detectorSelfTest(): void {
  const stage = findUndefinedVagueLabels([{ id: 'x', text: 'A plain brief.', exhibits: [{ categories: ['Core', 'Growth', 'Pilot'] }] }]);
  if (stage.length !== 1) fail('Core/Growth/Pilot with no definition must be flagged.');
  const neutralBad = findUndefinedVagueLabels([{ id: 'x', text: 'A plain brief.', exhibits: [{ categories: ['Business Line A', 'Business Line B'] }] }]);
  if (neutralBad.length !== 1) fail('Business Line A/B with no definition must be flagged.');
  const neutralOk = findUndefinedVagueLabels([{ id: 'x', text: 'Business Lines A and B are two distinct operating lines.', exhibits: [{ categories: ['Business Line A', 'Business Line B'] }] }]);
  if (neutralOk.length) fail('A defined Business Line family must pass.');
  const letters = findUndefinedVagueLabels([{ id: 'x', text: 'Plain.', exhibits: [{ categories: ['A', 'B', 'C', 'D'] }] }]);
  if (letters.length !== 1) fail('Bare letter labels with no definition must be flagged.');
  const planTier = findUndefinedVagueLabels([{ id: 'x', text: 'Plain.', exhibits: [{ categories: ['Starter', 'Core', 'Plus', 'Max'] }] }]);
  if (planTier.length) fail('A single plan name such as Core inside a real plan ladder must not be flagged.');
}

function yonderFarmsTests(): void {
  const record = CHARTS_EASY_RECORDS.find((item) => item.code === 'E-CH-050');
  if (!record) fail('E-CH-050 (Yonder Farms) is missing.');
  const text = recordText(record);
  if (OLD_STAGE_NAMES.test(text)) fail('Yonder Farms still contains Core, Growth, Pilot or Adjacency.');

  const [revenue, margin] = record.exhibits;
  const revenueValues = revenue.series?.[0].values.join(',');
  const marginValues = margin.series?.[0].values.join(',');
  if (revenueValues !== '54,40,31' || marginValues !== '28,36,23') fail('Yonder Farms revenue and margin values must be unchanged.');
  const labels = ['Business Line A', 'Business Line B', 'Business Line C'];
  if (revenue.categories?.join('|') !== labels.join('|') || margin.categories?.join('|') !== labels.join('|')) fail('Yonder Farms exhibits must use Business Line A, B and C.');
  if (!/Business Lines A, B and C are three distinct aquaculture operating lines/.test(chartsEasyContext(record))) fail('Yonder Farms context must define the three lines.');

  const profits = [54 * 0.28, 40 * 0.36, 31 * 0.23].map((value) => Number(value.toFixed(2)));
  if (profits.join(',') !== '15.12,14.4,7.13') fail('Yonder Farms gross-profit arithmetic changed.');
  if (record.key !== 'Business Line A: 54 × 28% = 15.12 billion VND') fail('The current-gross-profit answer must remain Business Line A (15.12 billion VND).');
  if (record.options.filter((option) => option === record.key).length !== 1) fail('Yonder Farms key must match exactly one option.');
  if (record.options.some((option) => /compare absolute|test /i.test(option))) fail('Yonder Farms options must not carry commentary that marks the correct one.');

  if (!/current gross profit/i.test(record.question) || !/does not show where a feed-efficiency investment/i.test(record.question)) {
    fail('Yonder Farms question must separate current gross profit from incremental feed-efficiency profit.');
  }
  if (!/incremental profit/.test(record.why) || !/feed cost/.test(record.why)) fail('Yonder Farms model answer must state what the exhibits cannot prove.');

  const poolTask = chartsEasyPoolTask(record);
  if (!/current gross profit/i.test(poolTask) || !/incremental profit/i.test(poolTask)) fail('Yonder Farms Case Pool task must separate current gross profit from incremental feed-efficiency profit.');
  if (OLD_STAGE_NAMES.test(poolTask) || /Business Line [A-C]\b/.test(poolTask)) fail('Yonder Farms Case Pool task must not name a line or use an old stage name.');
  const poolCase = CHARTS_EASY_CASE_POOL_CASES.find((item) => item.related_drill_ids?.includes('E-CH-050'));
  if (!poolCase) fail('Yonder Farms Case Pool case is missing.');
  if (!/Business Lines A, B and C are three distinct aquaculture operating lines/.test(poolCase.situation)) fail('Yonder Farms Case Pool brief must define the three lines.');
  if (!poolCase.model_answer.key_findings.some((finding) => /^Limit of this evidence:.*incremental profit/.test(finding))) fail('Yonder Farms Case Pool worked answer must state what the exhibits cannot prove.');
  if (poolCase.model_answer.recommendation !== record.key) fail('Yonder Farms Case Pool worked answer must keep the current-gross-profit answer.');
}

function lineTemplateTests(): void {
  const lineRecords = CHARTS_EASY_RECORDS.filter((record) => record.exhibits[0]?.categories?.[0] === 'Business Line A');
  if (lineRecords.length !== 5) fail(`Expected 5 Business Line records, found ${lineRecords.length}.`);
  lineRecords.forEach((record) => {
    const revenue = record.exhibits[0].series?.[0].values || [];
    const margin = record.exhibits[1].series?.[0].values || [];
    const profit = revenue.map((value, index) => Number(((value * margin[index]) / 100).toFixed(2)));
    const best = profit.indexOf(Math.max(...profit));
    const expected = `Business Line ${'ABC'[best]}: ${revenue[best]} × ${margin[best]}% = ${profit[best].toFixed(2)} billion VND`;
    if (!record.key.startsWith(expected)) fail(`${record.code} key must stay the highest current gross profit: ${expected}.`);
    if (OLD_STAGE_NAMES.test(recordText(record))) fail(`${record.code} still contains an old stage name.`);
  });
}

function donutTemplateTests(): void {
  const donuts = CHARTS_EASY_RECORDS.filter((record) => record.exhibits[0]?.categories?.[0] === 'Segment A');
  if (donuts.length !== 4) fail(`Expected 4 Segment donut records, found ${donuts.length}.`);
  donuts.forEach((record) => {
    const categories = record.exhibits[0].categories || [];
    const values = record.exhibits[0].series?.[0].values || [];
    if (values.reduce((sum, value) => sum + value, 0) !== 100) fail(`${record.code} slices must total 100.`);
    const share = new Map(categories.map((label, index) => [label, values[index]]));
    const match = /^(\d+)% \((.+?) (\d+)% \+ (.+?) (\d+)%\)/.exec(record.key);
    if (!match) fail(`${record.code} key could not be read.`);
    const [, total, first, firstValue, second, secondValue] = match;
    if (share.get(first) !== Number(firstValue) || share.get(second) !== Number(secondValue)) fail(`${record.code} key must quote the exhibit values.`);
    const top = [...values].sort((a, b) => b - a).slice(0, 2).reduce((sum, value) => sum + value, 0);
    if (Number(total) !== top || top !== Number(firstValue) + Number(secondValue)) fail(`${record.code} key must be the share of the two largest slices.`);
  });
}

function poolParityTests(): void {
  CHARTS_EASY_RECORDS.forEach((record, index) => {
    const drill = CHARTS_EASY_QUESTIONS[index];
    const poolCase = CHARTS_EASY_CASE_POOL_CASES[index];
    if (drill.businessContext !== chartsEasyContext(record)) fail(`${record.code} Case Drill context drifted from the shared definition.`);
    if (!poolCase.situation.startsWith(chartsEasyContext(record, 'pool'))) fail(`${record.code} Case Pool situation drifted from the shared definition.`);
    if (drill.correctAnswer !== record.key || poolCase.model_answer.recommendation !== record.key) fail(`${record.code} Case Drill and Case Pool answers must match.`);
    if (poolCase.key_question !== chartsEasyPoolTask(record)) fail(`${record.code} Case Pool task drifted from the open-ended task built for it.`);
  });
}

function expertTests(): void {
  EXPERT_CASE_EXPANSION.forEach((question) => {
    const problems = findUndefinedVagueLabels([questionItem(question)]);
    if (problems.length) fail(problems.join(' '));
    const terms = [...(question.scoringHints?.calculationTerms || []), ...(question.scoringHints?.evidenceTerms || [])];
    terms.filter((term) => /^Segment [A-Z]$/.test(term)).forEach((term) => {
      if (!question.correctAnswer.includes(term)) fail(`${question.id} scoring term "${term}" is not in its model answer.`);
      if (!exhibitsOf(question).some((exhibit) => exhibitStrings(exhibit).includes(term))) fail(`${question.id} scoring term "${term}" is not an exhibit label.`);
    });
    if (OLD_STAGE_NAMES.test(`${question.correctAnswer} ${question.businessContext}`)) fail(`${question.id} model answer still uses an old stage name.`);
  });
}

function wholeLibraryTests(): void {
  const problems = [
    ...findUndefinedVagueLabels(ALL_LIBRARY_QUESTIONS.map(questionItem)),
    ...findUndefinedVagueLabels(CASE_POOL_LIBRARY.map((item) => ({
      id: item.id,
      text: [item.situation, item.key_question, item.objective, ...(item.journey_exhibits || []).map((exhibit) => exhibit.footnote || '')].filter(Boolean).join(' '),
      exhibits: item.journey_exhibits || [],
    }))),
  ];
  if (problems.length) fail(`${problems.length} undefined label(s): ${problems.slice(0, 8).join(' | ')}`);
}

function placeholderNameTests(): void {
  const problems: string[] = [];
  ALL_LIBRARY_QUESTIONS.forEach((question) => {
    const item = questionItem(question);
    const generatedChart = /^charts-(\d{3})$/.exec(question.id);
    exhibitsOf(question).forEach((exhibit, index) => {
      const labels = [...(exhibit.categories || []), ...(exhibit.series || []).map((series) => series.name)];
      if (labels.some((label) => /^(?:Alpha|Bravo|Charlie|Delta)$/.test(label))) {
        problems.push(`${question.id} exhibit ${index + 1} still labels categories Alpha, Bravo, Charlie or Delta.`);
      }
      if (!generatedChart || Number(generatedChart[1]) > 100) return;
      const families = new Map<string, number>();
      labels.forEach((label) => {
        const match = /^(.+) ([A-E])$/.exec(label);
        if (match) families.set(match[1], (families.get(match[1]) || 0) + 1);
      });
      families.forEach((count, family) => {
        if (count < 3) return;
        const stem = family.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/y$/, '(?:y|ies)');
        if (!new RegExp(`${stem}s? A, (?:${stem}s? )?B`).test(item.text)) problems.push(`${question.id} exhibit ${index + 1} uses ${family} A, B, C... but its context does not say what they are.`);
      });
    });
  });
  if (problems.length) fail(`${problems.length} placeholder label problem(s): ${problems.slice(0, 8).join(' | ')}`);
}

export function runVagueLabelTests(): void {
  detectorSelfTest();
  placeholderNameTests();
  const bankErrors = validateChartsEasyBank();
  if (bankErrors.length) fail(`Charts Easy bank: ${bankErrors.join(' | ')}`);
  yonderFarmsTests();
  lineTemplateTests();
  donutTemplateTests();
  poolParityTests();
  expertTests();
  wholeLibraryTests();
}

runVagueLabelTests();
