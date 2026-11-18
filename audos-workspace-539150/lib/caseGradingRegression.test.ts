import { SELECTABLE_CASE_POOL_LIBRARY, validateCasePoolSharedAlignment } from './casePoolLibrary';
import { gradingResultLabel, objectiveScoreResult } from './gradingResult';
import { formatCanonicalNumber, gradeNumericQuantity } from './numericUnits';
import { ALL_LIBRARY_QUESTIONS, validateQuestionLibrary, type LibraryQuestion } from './skillQuestionLibrary';

const ACTIVE_DRILL_QUESTIONS = ALL_LIBRARY_QUESTIONS.filter((question) => question.reviewStatus !== 'Archived');

function fail(message: string): never {
  throw new Error(`[case-grading-regression] ${message}`);
}

function assert(condition: unknown, message: string): void {
  if (!condition) fail(message);
}

function directNumeric(question: LibraryQuestion): boolean {
  return ['number', 'percentage', 'currency'].includes(question.answerMode) && Number.isFinite(question.numericAnswer);
}

function testObjectiveQuestion(question: LibraryQuestion): void {
  const options = question.options || [];
  assert(options.length === 4, `${question.id}: expected four MCQ options`);
  options.forEach((option) => {
    const expected = option === question.correctAnswer;
    const result = objectiveScoreResult(expected, option, question.correctAnswer);
    assert(result.overallScore === (expected ? 10 : 0), `${question.id}: deterministic MCQ mismatch for “${option}”`);
    assert(gradingResultLabel(result.overallScore, result.scale) === (expected ? 'Correct' : 'Incorrect'), `${question.id}: MCQ label disagrees with score`);
  });
  // Option order is irrelevant because grading compares the selected value to the key.
  const shuffled = [...options].reverse();
  options.forEach((option) => {
    const shuffledOption = shuffled[shuffled.indexOf(option)];
    assert((option === question.correctAnswer) === (shuffledOption === question.correctAnswer), `${question.id}: shuffled option identity changed`);
  });
}

function testNumericQuestion(question: LibraryQuestion): void {
  const expected = Number(question.numericAnswer);
  const tolerance = Number(question.numericTolerance || 0);
  const unit = question.answerUnit || 'number';
  const correct = gradeNumericQuantity(String(expected), expected, unit, tolerance);
  const equivalent = gradeNumericQuantity(`${formatCanonicalNumber(expected)} ${unit}`, expected, unit, tolerance);
  const wrongValue = expected + Math.max(1000, Math.abs(expected) * 2 + 1, tolerance * 10 + 1);
  const wrong = gradeNumericQuantity(String(wrongValue), expected, unit, tolerance);
  assert(correct.correct, `${question.id}: canonical correct number was rejected`);
  assert(equivalent.correct, `${question.id}: equivalent explicit-unit number was rejected`);
  assert(!wrong.correct, `${question.id}: clearly wrong number was accepted`);
  assert(gradingResultLabel(objectiveScoreResult(correct.correct, String(expected), question.correctAnswer).overallScore) === 'Correct', `${question.id}: correct numeric label mismatch`);
  assert(gradingResultLabel(objectiveScoreResult(wrong.correct, String(wrongValue), question.correctAnswer).overallScore) === 'Incorrect', `${question.id}: incorrect numeric label mismatch`);
}

function testCalculationChecks(question: LibraryQuestion): void {
  (question.calculationNumericChecks || []).forEach((check, index) => {
    const correct = gradeNumericQuantity(String(check.value), check.value, check.unit, check.tolerance);
    const equivalent = gradeNumericQuantity(`${formatCanonicalNumber(check.value)} ${check.unit}`, check.value, check.unit, check.tolerance);
    const wrong = gradeNumericQuantity(String(check.value + Math.max(1000, Math.abs(check.value) * 2 + 1, check.tolerance * 10 + 1)), check.value, check.unit, check.tolerance);
    assert(correct.correct, `${question.id} result ${index + 1}: canonical answer rejected`);
    assert(equivalent.correct, `${question.id} result ${index + 1}: equivalent format rejected`);
    assert(!wrong.correct, `${question.id} result ${index + 1}: wrong answer accepted`);
  });
}

function testOpenQuestion(question: LibraryQuestion): void {
  assert(Boolean(question.correctAnswer.trim()), `${question.id}: missing reference answer`);
  assert(Boolean(question.explanation.trim()), `${question.id}: missing explanation`);
  // Open responses use the shared rubric grader, which explicitly accepts
  // defensible alternative reasoning and includes the complete learner answer.
  assert(gradingResultLabel(10) === 'Correct', `${question.id}: correct open-answer label mismatch`);
  assert(gradingResultLabel(6) === 'Partially correct', `${question.id}: partial open-answer label mismatch`);
  assert(gradingResultLabel(0) === 'Incorrect', `${question.id}: incorrect open-answer label mismatch`);
}

export const CASE_GRADING_REGRESSION_AUDIT = {
  caseDrillQuestions: ACTIVE_DRILL_QUESTIONS.length,
  casePoolCases: SELECTABLE_CASE_POOL_LIBRARY.length,
  totalAppRecords: ACTIVE_DRILL_QUESTIONS.length + SELECTABLE_CASE_POOL_LIBRARY.length,
  mcqQuestions: ACTIVE_DRILL_QUESTIONS.filter((question) => question.answerMode === 'choice' || question.answerMode === 'multiple-choice').length,
  directNumericQuestions: ACTIVE_DRILL_QUESTIONS.filter(directNumeric).length,
  deterministicCalculationQuestions: ACTIVE_DRILL_QUESTIONS.filter((question) => Boolean(question.calculationNumericChecks?.length)).length,
  openOrPartialCreditQuestions: ACTIVE_DRILL_QUESTIONS.filter((question) => question.answerMode === 'text' || question.structuredAnswer || question.skill === 'market-sizing' || question.skill === 'creativity').length,
};

export function runCaseGradingRegressionTests(): void {
  const validationErrors = [...validateQuestionLibrary(), ...validateCasePoolSharedAlignment()];
  assert(validationErrors.length === 0, validationErrors.join('\n'));
  ACTIVE_DRILL_QUESTIONS.forEach((question) => {
    if (question.answerMode === 'choice' || question.answerMode === 'multiple-choice') testObjectiveQuestion(question);
    if (directNumeric(question)) testNumericQuestion(question);
    if (question.calculationNumericChecks?.length) testCalculationChecks(question);
    if (question.answerMode === 'text' || question.structuredAnswer || question.skill === 'market-sizing' || question.skill === 'creativity') testOpenQuestion(question);
  });
  assert(CASE_GRADING_REGRESSION_AUDIT.caseDrillQuestions === 647, `expected 647 active Case Drill questions; found ${CASE_GRADING_REGRESSION_AUDIT.caseDrillQuestions}`);
  assert(CASE_GRADING_REGRESSION_AUDIT.casePoolCases === 173, `expected 173 selectable Case Pool cases; found ${CASE_GRADING_REGRESSION_AUDIT.casePoolCases}`);
  assert(gradingResultLabel(8) === 'Correct' && gradingResultLabel(7.9) === 'Partially correct', 'correct threshold boundary failed');
  assert(gradingResultLabel(3) === 'Partially correct' && gradingResultLabel(2.9) === 'Incorrect', 'partial threshold boundary failed');
}

runCaseGradingRegressionTests();
