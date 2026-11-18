// Sprint 04F Vietnamese localization checks, run against the live module graph the app uses (same setup as
// glossaryCoverage.test.tsx: react, react-dom and a DOM-like global). Prints the coverage dashboard and fails
// on identity drift, stale or unsafe translations, terminology the guide forbids, broken Vietnamese text and
// fill-in-the-blank prompts that reveal their answer. Fallbacks are reported, never counted as translated.
import {
  COMMERCIAL_BANKING_MODULE01_DECKS, COMMERCIAL_BANKING_MODULE01_QUIZZES, COMMERCIAL_BANKING_MODULE01_TAKEAWAYS,
  COMMERCIAL_BANKING_MODULE02_DECKS, COMMERCIAL_BANKING_MODULE02_QUIZZES, COMMERCIAL_BANKING_MODULE02_TAKEAWAYS,
  COMMERCIAL_BANKING_MODULE03_DECKS, COMMERCIAL_BANKING_MODULE03_QUIZZES, COMMERCIAL_BANKING_MODULE03_TAKEAWAYS,
  COMMERCIAL_BANKING_MODULE04_DECKS, COMMERCIAL_BANKING_MODULE04_QUIZZES, COMMERCIAL_BANKING_MODULE04_TAKEAWAYS,
  COMMERCIAL_BANKING_MODULE05_DECKS, COMMERCIAL_BANKING_MODULE05_QUIZZES, COMMERCIAL_BANKING_MODULE05_TAKEAWAYS,
  hydrateIndustryModule,
} from '../industryModuleHydration';
import { CB_CASES } from '../commercialBankingCases';
import type { BankingCardData, BankingCaseStudy } from '../commercialBankingCore';
import { GLOSSARY_INDEX } from '../glossary/glossaryIndex';
import { PRACTICE_DECKS } from '../../InteractiveLearning/flashcards/decks/practice';
import { MATCH_SORT_PACKS } from '../../InteractiveLearning/matchSort/content';
import { createCbLocalizer, freshCaseTranslation } from '../localization/commercialBanking/cbLocalizer';
import { CB_VI_MODULE01 } from '../localization/commercialBanking/cbViModule01';
import { CB_VI_MODULE02 } from '../localization/commercialBanking/cbViModule02';
import { CB_VI_MODULE03 } from '../localization/commercialBanking/cbViModule03';
import { CB_VI_MODULE04 } from '../localization/commercialBanking/cbViModule04';
import { CB_VI_MODULE05 } from '../localization/commercialBanking/cbViModule05';
import { CB_VI_CASES } from '../localization/commercialBanking/cbViCases';
import { CB_VI_LESSONS, CB_VI_MODULES } from '../localization/commercialBanking/cbViNav';
import { keepsNumbers } from '../localization/numberCheck';
import { computeLocalizationCoverage, formatCoverageMatrix, formatRatio } from '../localization/localizationCoverage';
import type { CoverageModuleData } from '../localization/localizationCoverage';
import { CB_VI_FLASHCARDS, CB_VI_MATCH_SORT } from '../localization/practice/cbViPractice';
import { blankPromptIsSafe, localizeActivity, localizeFlashcard } from '../localization/practice/practiceLocalization';
import { VI_AVOIDED_TERMS } from '../localization/viTerminology';
import { CB_VI_VISUALS } from '../localization/commercialBanking/cbViVisuals';
import { overlayVisualSpec } from '../localization/visualLocalization';
import { chapterPairs, localizeGeneratedCard } from '../localization/practice/generatedPractice';
import { writeLearningLanguage } from '../localization/learningLanguage';
import { uiCorrectCount, uiText } from '../localization/uiText';
import { CB_M1_VISUALS } from '../commercialBankingM01VisualSpecs';
import { CB_M2_VISUALS } from '../commercialBankingM02VisualSpecs';
import { CB_M3_VISUALS } from '../commercialBankingM03VisualSpecs';
import { CB_M4_VISUALS } from '../commercialBankingM04VisualSpecs';
import { CB_M5_VISUALS } from '../commercialBankingM05VisualSpecs';
import type { FlashcardContent } from '../../InteractiveLearning/flashcards/models';

const CB_VI_MODULES_BY_NUMBER: Record<number, typeof CB_VI_MODULE01> = { 1: CB_VI_MODULE01, 2: CB_VI_MODULE02, 3: CB_VI_MODULE03, 4: CB_VI_MODULE04, 5: CB_VI_MODULE05 };
const MODULE_TITLES = ['How the Industry Works', 'How Value Moves Through the Industry', 'How Companies Make Money', 'Who Competes—and Why They Win', 'What Is Changing Next'];
const failures: string[] = [];
const fail = (message: string) => failures.push(message);

function vietnameseStrings(value: unknown, path: string, out: Array<[string, string]> = []): Array<[string, string]> {
  if (typeof value === 'string') out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((item, index) => vietnameseStrings(item, `${path}.${index}`, out));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => { if (key !== 'en' && key !== 'enTitle' && key !== 'sourceVerifiedAt') vietnameseStrings(item, `${path}.${key}`, out); });
  return out;
}

function checkVietnameseText() {
  const all = [
    ...vietnameseStrings(CB_VI_MODULE01, 'module01'),
    ...vietnameseStrings(CB_VI_MODULE02, 'module02'),
    ...vietnameseStrings(CB_VI_MODULE03, 'module03'),
    ...vietnameseStrings(CB_VI_MODULE04, 'module04'),
    ...vietnameseStrings(CB_VI_MODULE05, 'module05'),
    ...vietnameseStrings(CB_VI_CASES, 'cases'),
    ...vietnameseStrings(CB_VI_LESSONS, 'nav'),
    ...vietnameseStrings(Object.fromEntries(Object.entries(CB_VI_MODULES).map(([key, copy]) => [key, { ...copy, learningPath: copy.learningPath(5) }])), 'modules'),
    ...vietnameseStrings(CB_VI_FLASHCARDS, 'flashcards').filter(([path]) => !/acceptedAnswers/.test(path)),
    ...vietnameseStrings(CB_VI_MATCH_SORT, 'matchSort'),
    ...vietnameseStrings(CB_VI_VISUALS, 'visuals'),
  ];
  all.forEach(([path, text]) => {
    if (text !== text.normalize('NFC')) fail(`${path}: not NFC-normalised`);
    if (/\uFFFD|Ã[\u0080-\u00bf]|Â[\u0080-\u00bf]|á[»º]/.test(text)) fail(`${path}: mojibake`);
    if (text.length > 60 && !/[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]/i.test(text)) fail(`${path}: long text without Vietnamese diacritics`);
    VI_AVOIDED_TERMS.forEach((term) => { if (text.toLowerCase().includes(term.toLowerCase())) fail(`${path}: uses avoided term “${term}”`); });
  });
  console.log(`Vietnamese strings checked: ${all.length}`);
}

async function moduleData(): Promise<CoverageModuleData[]> {
  await Promise.all(MODULE_TITLES.map((title) => hydrateIndustryModule('banking-commercial', title)));
  const decks = [COMMERCIAL_BANKING_MODULE01_DECKS, COMMERCIAL_BANKING_MODULE02_DECKS, COMMERCIAL_BANKING_MODULE03_DECKS, COMMERCIAL_BANKING_MODULE04_DECKS, COMMERCIAL_BANKING_MODULE05_DECKS];
  const quizzes = [COMMERCIAL_BANKING_MODULE01_QUIZZES, COMMERCIAL_BANKING_MODULE02_QUIZZES, COMMERCIAL_BANKING_MODULE03_QUIZZES, COMMERCIAL_BANKING_MODULE04_QUIZZES, COMMERCIAL_BANKING_MODULE05_QUIZZES];
  const takeaways = [COMMERCIAL_BANKING_MODULE01_TAKEAWAYS, COMMERCIAL_BANKING_MODULE02_TAKEAWAYS, COMMERCIAL_BANKING_MODULE03_TAKEAWAYS, COMMERCIAL_BANKING_MODULE04_TAKEAWAYS, COMMERCIAL_BANKING_MODULE05_TAKEAWAYS];
  return MODULE_TITLES.map((moduleTitle, index) => ({ moduleTitle, decks: decks[index] as Record<string, BankingCardData[]>, quizzes: quizzes[index] as CoverageModuleData['quizzes'], takeaways: takeaways[index] as Record<string, unknown> }));
}

function practiceCoverage() {
  const cbDecks = PRACTICE_DECKS.filter((deck) => deck.industryId === 'banking-commercial');
  const counts = { classic: { done: 0, total: 0 }, interactive: { done: 0, total: 0 }, stale: [] as string[], lessonCounts: {} as Record<string, { done: number; total: number }> };
  cbDecks.forEach((deck) => deck.cards.forEach((card) => {
    const bucket = card.interaction ? counts.interactive : counts.classic;
    bucket.total += 1;
    const vi = CB_VI_FLASHCARDS[card.cardId];
    if (!vi) return;
    const localized = localizeFlashcard(card, vi);
    if (!localized) { counts.stale.push(card.cardId); return; }
    if (localized.cardId !== card.cardId || localized.chapterId !== card.chapterId) fail(`flashcard ${card.cardId}: identity changed`);
    if (localized.interaction?.type === 'mcq' && card.interaction?.type === 'mcq' && localized.interaction.correctOptionId !== card.interaction.correctOptionId) fail(`flashcard ${card.cardId}: answer key changed`);
    if (localized.interaction?.type === 'fill_blank' && !blankPromptIsSafe(localized.front, [localized.interaction.answer, ...(localized.interaction.acceptedAnswers ?? [])])) fail(`flashcard ${card.cardId}: prompt reveals the answer`);
    bucket.done += 1;
  }));
  Object.keys(CB_VI_FLASHCARDS).forEach((cardId) => { if (!cbDecks.some((deck) => deck.cards.some((card) => card.cardId === cardId))) counts.stale.push(`${cardId} (no such card)`); });

  const activities = MATCH_SORT_PACKS.filter((pack) => pack.industryId === 'banking-commercial').flatMap((pack) => pack.activities);
  const matchSort = { ratio: { done: 0, total: activities.length }, stale: [] as string[], lessonCounts: {} };
  activities.forEach((activity) => {
    const vi = CB_VI_MATCH_SORT[activity.activityId];
    if (!vi) return;
    const localized = localizeActivity(activity, vi);
    if (!localized) { matchSort.stale.push(activity.activityId); return; }
    if (JSON.stringify(localized.sourceRefs) !== JSON.stringify(activity.sourceRefs)) fail(`activity ${activity.activityId}: chapter references changed`);
    matchSort.ratio.done += 1;
  });
  return { flashcards: counts, matchSort };
}

/** Every Vietnamese Learning Visual overlay must still apply to its English spec (same title, shape and numbers). */
function visualCoverage() {
  const english: Record<string, { spec: object }> = { ...CB_M1_VISUALS, ...CB_M2_VISUALS, ...CB_M3_VISUALS, ...CB_M4_VISUALS, ...CB_M5_VISUALS };
  let applied = 0;
  Object.entries(CB_VI_VISUALS).forEach(([kind, overlay]) => {
    const source = english[kind];
    if (!source) return fail(`visual ${kind}: no such visualKind`);
    const localized = overlayVisualSpec(source.spec as Record<string, unknown>, overlay);
    if (!localized) return fail(`visual translation not applied: ${kind}`);
    if ((localized as { layout?: unknown }).layout !== (source.spec as { layout?: unknown }).layout) return fail(`visual ${kind}: layout changed`);
    applied += 1;
  });
  console.log(`Learning Visuals with Vietnamese: ${applied}/${Object.keys(english).length} (others keep the English diagram)`);
}

/** Practice & Review chrome labels and a generated chapter card in Vietnamese; English is restored afterwards. */
function practiceChrome() {
  const required = ['Question', 'Answer', 'Reveal answer', 'Check answer', 'Show answer', 'Try again', 'Again', 'Hard', 'Good', 'Easy', 'Multiple choice', 'Fill in the blank',
    'Check answers', 'Show answers', 'Next activity', 'Return to Lesson', 'Practice & Review', 'Flashcards', 'Match & Sort'];
  writeLearningLanguage('vi');
  try {
    required.forEach((label) => { if (uiText(label) === label) fail(`Practice & Review label without Vietnamese: ${label}`); });
    if (uiCorrectCount(2, 4) !== '2/4 \u0111\u00fang') fail('Match & Sort score line is not localized');
  } finally {
    writeLearningLanguage('en');
  }
  if (uiText('Reveal answer') !== 'Reveal answer') fail('English labels changed after switching back');
  const en = { title: '01 What Is NIM?', keyInsight: 'Margin is what a bank earns between lending and funding.', keyTerms: [{ term: 'NIM', definition: 'Net interest income divided by average earning assets.' }] };
  const vi = { title: '01 NIM l\u00e0 g\u00ec?', keyInsight: 'Bi\u00ean l\u00e3i r\u00f2ng l\u00e0 ph\u1ea7n ng\u00e2n h\u00e0ng thu \u0111\u01b0\u1ee3c gi\u1eefa cho vay v\u00e0 huy \u0111\u1ed9ng v\u1ed1n.', keyTerms: [{ term: 'NIM', definition: 'Thu nh\u1eadp l\u00e3i thu\u1ea7n chia cho t\u00e0i s\u1ea3n sinh l\u00e3i b\u00ecnh qu\u00e2n.' }] };
  const pairs = chapterPairs(en, vi);
  const card = { cardId: 'kt-banking-commercial-nim', deckId: 'd', chapterId: 'd-ch01', front: 'What does \u201cNIM\u201d mean?', back: en.keyTerms[0].definition, explanation: en.keyInsight, practicalExample: '', keyTerms: ['NIM'], origin: 'generated' } as unknown as FlashcardContent;
  const localized = localizeGeneratedCard(card, pairs);
  if (!localized || localized.cardId !== card.cardId || localized.back !== vi.keyTerms[0].definition || localized.front !== '\u201cNIM\u201d ngh\u0129a l\u00e0 g\u00ec?') fail('generated key-term card is not localized as expected');
  if (localizeGeneratedCard({ ...card, back: 'Net interest income divided.' } as FlashcardContent, pairs)) fail('a generated card whose answer is part of a field must stay English');
  console.log('Practice & Review chrome and generated chapter cards: checked');
}

async function glossaryCounts() {
  return Promise.all(GLOSSARY_INDEX.map(async (entry) => {
    const data = await entry.load();
    return { curriculumId: entry.curriculumId, terms: data.terms.length, withVietnamese: data.terms.filter((term) => Boolean(term.definitionVi)).length };
  }));
}

export async function runLocalizationVi() {
  checkVietnameseText();
  visualCoverage();
  practiceChrome();
  const modules = await moduleData();
  const cases = Object.entries(CB_CASES as Record<string, BankingCaseStudy>).reduce((acc, [id, study]) => {
    const fresh = freshCaseTranslation(study);
    if (fresh.state === 'translated') acc.fresh.push(id); else acc.stale.push(`${id}: ${fresh.state}`);
    return acc;
  }, { total: Object.keys(CB_CASES).length, fresh: [] as string[], stale: [] as string[] });
  Object.entries(CB_VI_CASES).forEach(([id, vi]) => {
    const study = (CB_CASES as Record<string, BankingCaseStudy>)[id];
    (['context', 'problem', 'action', 'mechanism', 'outcome', 'takeaway'] as const).forEach((field) => { if (study && !keepsNumbers(study[field], vi[field])) fail(`case ${id}.${field}: a number from the English source is missing`); });
  });
  const practice = practiceCoverage();
  const report = await computeLocalizationCoverage({
    commercialBanking: modules,
    localizerFor: async (module) => createCbLocalizer(CB_VI_MODULES_BY_NUMBER[module] ?? {}),
    cases,
    flashcards: practice.flashcards,
    matchSort: practice.matchSort,
    glossary: await glossaryCounts(),
    otherCurricula: [],
  });
  console.log('\nVIETNAMESE COVERAGE');
  console.log(`Interface labels with Vietnamese: ${report.interface.labels} (${report.interface.note})`);
  console.log(`General Info chapters: ${formatRatio(report.generalInfo)}`);
  report.generalInfo.staleOrPartial.forEach((line) => console.log(`  partial/stale: ${line}`));
  console.log(`Flashcards: classic ${formatRatio(report.flashcards.classic)}, interactive ${formatRatio(report.flashcards.interactive)}`);
  report.flashcards.stale.forEach((line) => console.log(`  flashcard fallback: ${line}`));
  console.log(`Match & Sort activities: ${formatRatio(report.matchSort)}`);
  report.matchSort.stale.forEach((line) => console.log(`  activity fallback: ${line}`));
  console.log(`Knowledge Check questions: ${formatRatio(report.knowledgeCheck)}`);
  report.knowledgeCheck.englishFallback.forEach((line) => console.log(`  English fallback: ${line}`));
  console.log(`Case studies: ${formatRatio(report.caseStudies)}`);
  report.caseStudies.stale.forEach((line) => console.log(`  case: ${line}`));
  report.glossary.curricula.forEach((row) => console.log(`Glossary ${row.curriculumId}: ${row.withVietnamese}/${row.terms} terms with a Vietnamese definition (04E data, reused as-is)`));
  console.log(`\n${formatCoverageMatrix(report)}`);
  report.idDrift.forEach(fail);
  report.generalInfo.staleOrPartial.forEach((line) => fail(`General Info not fully current: ${line}`));
  report.flashcards.stale.forEach((line) => fail(`flashcard translation not applied: ${line}`));
  report.matchSort.stale.forEach((line) => fail(`activity translation not applied: ${line}`));
  report.caseStudies.stale.filter((line) => !line.endsWith('missing')).forEach((line) => fail(`case translation stale: ${line}`));
  if (failures.length) {
    failures.forEach((line) => console.log(`FAIL ${line}`));
    throw new Error(`${failures.length} Vietnamese localization problem(s); see the lines above.`);
  }
  console.log('\nAll Vietnamese localization checks passed.');
  return report;
}

runLocalizationVi().catch((error) => { console.error(error.message); throw error; });
