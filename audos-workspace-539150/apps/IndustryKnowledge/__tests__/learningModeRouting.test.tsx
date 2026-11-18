// Learning Mode Chooser routing for every implemented sub-industry, resolved from the live catalogue the app
// uses (INDUSTRY_CATEGORIES, AVAILABLE_CATEGORY_IDS, the lesson registry and the shared deck dispatcher).
// Prints the progress bar (verified / implemented sub-industries), coverage per industry group and the chapters
// without practice content, then fails when any sub-industry is not verified.
// Needs the apps/IndustryKnowledge module graph (react, react-dom, lucide-react) and a DOM-like global (jsdom
// preloaded), the same setup as apps/InteractiveLearning/practiceReview/__tests__.
import { loadLearningModeCatalog } from '../App';
import { auditLearningModes, progressBarText } from '../learningModeAudit';

const FLASHCARD_COVERAGE_TARGET = 50;

export async function runLearningModeRouting() {
  const audit = auditLearningModes(await loadLearningModeCatalog());
  console.log(`Chooser routing  ${progressBarText(audit.verified, audit.implemented)}`);
  audit.groups.forEach((group) => {
    console.log(`  ${group.name}: ${group.verified}/${group.implemented} verified · ${group.chaptersWithFlashcards}/${group.chapters} chapters with flashcards · ${group.chaptersWithMatchSort}/${group.chapters} with Match & Sort · ${group.flashcards} flashcards`);
  });
  audit.subIndustries.forEach((item) => {
    const missingFlashcards = item.missing.filter((chapter) => chapter.missing.includes('flashcards')).length;
    const missingMatchSort = item.missing.filter((chapter) => chapter.missing.includes('match-sort')).length;
    console.log(`  ${item.verified ? '✓' : '✗'} ${item.name}: ${item.routedLessons}/${item.openableLessons} lessons routed · ${item.flashcards} flashcards${item.flashcards < FLASHCARD_COVERAGE_TARGET ? ` (below the ${FLASHCARD_COVERAGE_TARGET}+ target)` : ''} · ${missingFlashcards} chapters without flashcards · ${missingMatchSort} without Match & Sort`);
    item.failures.forEach((failure) => console.log(`      ${failure}`));
  });
  const failing = audit.subIndustries.filter((item) => !item.verified);
  if (failing.length) throw new Error(`${failing.length} of ${audit.implemented} implemented sub-industries failed chooser routing: ${failing.map((item) => item.id).join(', ')}`);
  return audit;
}

runLearningModeRouting().catch((error) => { console.error(error.message); throw error; });
