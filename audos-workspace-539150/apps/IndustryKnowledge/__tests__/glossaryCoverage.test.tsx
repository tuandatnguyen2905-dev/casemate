// Essential Terms coverage for the whole Domain Knowledge catalogue, resolved from the live catalogue the app
// uses (`loadLearningModeCatalog`) and the authored glossary data. Prints the coverage table and the review
// queues, then fails only on structural problems (broken ids, mappings or sources). Factual verification is
// reported, never assumed. Needs the apps/IndustryKnowledge module graph (react, react-dom, lucide-react) and
// a DOM-like global (jsdom preloaded), the same setup as learningModeRouting.test.tsx.
import { loadLearningModeCatalog } from '../App';
import { glossaryCoverage, loadAllGlossaries } from '../glossary/glossaryCoverage';

export async function runGlossaryCoverage() {
  const [catalog, glossaries] = await Promise.all([loadLearningModeCatalog(), loadAllGlossaries()]);
  const report = glossaryCoverage(catalog, glossaries);
  console.log(`Curricula inspected: ${report.curriculaInspected} · lessons inspected: ${report.lessonsInspected}`);
  console.log(`Lessons with glossary: ${report.lessonsWithGlossary} · without: ${report.lessonsWithoutGlossary} · unique terms: ${report.uniqueTerms}`);
  console.log(report.table);
  console.log(`Structurally valid: ${report.structurallyValid ? 'yes' : 'no'}`);
  report.structuralProblems.forEach((problem) => console.log(`  structure: ${problem}`));
  report.invalidMappings.forEach((item) => console.log(`  mapping: ${item.curriculumId} ${item.lessonKey ?? ''} ${item.chapter !== undefined ? `ch.${item.chapter + 1}` : ''} ${item.termId ?? ''} — ${item.detail}`));
  report.conflictingIds.forEach((item) => console.log(`  conflicting id: ${item.termId} (${item.curriculumId}) — ${item.detail}`));
  report.duplicateDefinitions.forEach((item) => console.log(`  duplicate definition: ${item.detail}`));
  report.unusedEntries.forEach((item) => console.log(`  unused: ${item.curriculumId} ${item.termId}`));
  console.log(`Terms needing source or review (not verified): ${report.termsNeedingVerification.length}`);
  report.termsNeedingVerification.forEach((item) => console.log(`  ${item.curriculumId} ${item.termId}: ${item.detail}`));
  console.log(`Ambiguous acronyms: ${report.ambiguousAcronyms.map((item) => `${item.acronym} [${item.termIds.join(', ') || 'flagged only'}]`).join('; ') || 'none'}`);
  console.log(`Mapped terms not found in chapter text (review relevance): ${report.mappingsNotInText.length}`);
  report.mappingsNotInText.forEach((item) => console.log(`  ${item.curriculumId} ${item.lessonKey} ch.${(item.chapter ?? 0) + 1} ${item.termId}`));
  console.log(`Unexplained abbreviations in glossary lessons: ${report.unknownAbbreviations.slice(0, 40).map((item) => `${item.acronym}×${item.chapters}`).join(', ') || 'none'}`);
  if (!report.structurallyValid) throw new Error('Essential Terms data has structural problems; see the lines above.');
  return report;
}

runGlossaryCoverage().catch((error) => { console.error(error.message); throw error; });
