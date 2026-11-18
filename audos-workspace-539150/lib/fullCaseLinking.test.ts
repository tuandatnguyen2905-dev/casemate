import { CASE_POOL_ELIGIBLE_JOURNEY_IDS } from './caseJourneys';
import { CASE_POOL_LIBRARY, DRILL_FULL_CASE_LINK_AUDIT, SELECTABLE_CASE_POOL_LIBRARY } from './casePoolLibrary';
import { CHARTS_EASY_CASE_POOL_CASES, CHARTS_EASY_QUESTIONS } from './chartsEasyBank';
import { ALL_LIBRARY_QUESTIONS, DRILL_SOURCE_CASE_AUDIT } from './skillQuestionLibrary';
import { STRUCTURES_EASY_CASE_POOL_CASES, STRUCTURES_EASY_QUESTIONS } from './structuresEasyBank';

export function runFullCaseLinkingTests() {
  const selectable = new Map(SELECTABLE_CASE_POOL_LIBRARY.map((item) => [item.id, item]));
  const storedIds = new Set(CASE_POOL_LIBRARY.map((item) => item.id));
  const questionsById = new Map(ALL_LIBRARY_QUESTIONS.map((question) => [question.id, question]));
  const { linked, flaggedMissingSource, standalone } = DRILL_FULL_CASE_LINK_AUDIT;

  if (linked.length + flaggedMissingSource.length + standalone.length !== ALL_LIBRARY_QUESTIONS.length) {
    throw new Error('Every Case Drill question must be exactly one of linked, flagged or standalone.');
  }
  ALL_LIBRARY_QUESTIONS.forEach((question) => {
    if (question.source_case_id === undefined) throw new Error(`${question.id} has no nullable source_case_id field.`);
    if (question.source_case_id && !storedIds.has(question.source_case_id)) {
      throw new Error(`${question.id} records ${question.source_case_id}, which is not a Case Pool case.`);
    }
  });

  linked.forEach(({ drillId, sourceCaseId }) => {
    const target = sourceCaseId ? selectable.get(sourceCaseId) : undefined;
    if (!target) throw new Error(`${drillId} is linked but ${sourceCaseId} cannot be opened.`);
    const question = questionsById.get(drillId);
    const names = [...(target.related_drill_ids || []), ...(target.journey_stages || []).map((stage) => stage.drillId)];
    if (!names.includes(drillId) && !(question?.sourceCaseId && names.includes(question.sourceCaseId))) {
      throw new Error(`${drillId} opens ${sourceCaseId}, but that case does not name the drill.`);
    }
  });
  flaggedMissingSource.forEach(({ drillId, sourceCaseId, note }) => {
    if (!note) throw new Error(`${drillId} is flagged without a reason.`);
    if (sourceCaseId && selectable.has(sourceCaseId)) throw new Error(`${drillId} is flagged although ${sourceCaseId} can be opened.`);
  });
  DRILL_SOURCE_CASE_AUDIT.unlinked.forEach(({ drillId, sourceCaseId, reason }) => {
    if (sourceCaseId !== null || !reason) throw new Error(`${drillId} needs an explicit null relationship and reason.`);
  });

  [...CHARTS_EASY_CASE_POOL_CASES, ...STRUCTURES_EASY_CASE_POOL_CASES].forEach((item) => {
    (item.related_drill_ids || []).forEach((drillId) => {
      if (!linked.some((link) => link.drillId === drillId && link.sourceCaseId === item.id)) throw new Error(`${drillId} must open ${item.id}.`);
    });
  });
  const easyLinked = linked.filter((link) => link.sourceCaseId?.startsWith('case-e-ch-') || link.sourceCaseId?.startsWith('case-structures-easy-'));
  if (easyLinked.length !== CHARTS_EASY_QUESTIONS.length + STRUCTURES_EASY_QUESTIONS.length) {
    throw new Error(`Expected ${CHARTS_EASY_QUESTIONS.length + STRUCTURES_EASY_QUESTIONS.length} Easy-bank links; found ${easyLinked.length}.`);
  }

  for (let index = 1; index <= 10; index += 1) {
    const journeyId = `jrn-${String(index).padStart(2, '0')}`;
    ALL_LIBRARY_QUESTIONS.filter((question) => question.journeyId === journeyId).forEach((question) => {
      if (question.source_case_id !== null) throw new Error(`${question.id} must stay unlinked while ${journeyId} is unpublished.`);
      if (!flaggedMissingSource.some((item) => item.drillId === question.id)) throw new Error(`${question.id} must be flagged as missing its source.`);
    });
  }
  CASE_POOL_ELIGIBLE_JOURNEY_IDS.forEach((journeyId) => {
    const caseId = `case-${journeyId}`;
    ALL_LIBRARY_QUESTIONS.filter((question) => question.journeyId === journeyId).forEach((question) => {
      if (question.source_case_id !== caseId) throw new Error(`${question.id} must keep its recorded source ${caseId}.`);
      const isLinked = linked.some((link) => link.drillId === question.id);
      if (isLinked !== selectable.has(caseId)) throw new Error(`${question.id} button state must follow whether ${caseId} can be opened.`);
    });
  });
}

runFullCaseLinkingTests();
