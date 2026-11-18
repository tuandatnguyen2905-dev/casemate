// Read-only Knowledge Check coverage over the live catalogue the app uses (loadLearningModeCatalog): recalculated
// counts of curricula, lessons, chapters, chapters with a valid assessment, with zero usable questions and with
// invalid question data, plus how many chapters a missing assessment would block. Fails when any chapter or any
// lesson's takeaways stay unreachable after every available check is submitted.
// Needs the apps/IndustryKnowledge module graph (react, react-dom, lucide-react) and a DOM-like global (jsdom
// preloaded), the same setup as learningModeRouting.test.tsx.
import { loadLearningModeCatalog } from '../App';
import { auditAssessmentCoverage, coverageReport } from '../assessmentCoverage';

export async function runAssessmentCoverage() {
  const coverage = auditAssessmentCoverage(await loadLearningModeCatalog());
  coverageReport(coverage).forEach((line) => console.log(line));
  if (coverage.blockedNow || coverage.takeawaysUnreachable) {
    throw new Error(`${coverage.blockedNow} chapter(s) and ${coverage.takeawaysUnreachable} lesson takeaways are unreachable after every available Knowledge Check is submitted`);
  }
  return coverage;
}

runAssessmentCoverage().catch((error) => { console.error(error.message); throw error; });
