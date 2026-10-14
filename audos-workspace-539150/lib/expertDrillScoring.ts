import type { LibraryQuestion } from './skillQuestionLibrary';

export interface ExpertResponse {
  calculation: string;
  keyInsight: string;
  supportingEvidence: string;
  businessImplication: string;
  recommendedAction: string;
}

export interface ExpertScoreBreakdown {
  label: string;
  score: number;
  maximum: number;
}

export interface ExpertScoreResult {
  score: number;
  level: 'Expert' | 'Strong' | 'Developing' | 'Needs Improvement';
  breakdown: ExpertScoreBreakdown[];
  strongestPart: string;
  missingInsight: string;
  evidenceUsed: string[];
  evidenceOverlooked: string[];
  implicationFeedback: string;
  recommendationFeedback: string;
}

function normalise(value: string): string {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function matchedTerms(text: string, terms: string[] = []): string[] {
  const haystack = normalise(text);
  return terms.filter((term) => haystack.includes(normalise(term)));
}

function contentScore(text: string, maximum: number, terms: string[] = []): number {
  const clean = text.trim();
  if (!clean) return 0;
  const lengthShare = Math.min(1, clean.length / 180);
  const termShare = terms.length ? Math.min(1, matchedTerms(clean, terms).length / Math.min(4, terms.length)) : 1;
  return Math.round(maximum * (0.35 * lengthShare + 0.65 * termShare));
}

function exhibitReferenceCount(text: string): number {
  const references = new Set(Array.from(text.matchAll(/exhibit\s*([1-3])/gi), (match) => match[1]));
  return references.size;
}

function levelFor(score: number): ExpertScoreResult['level'] {
  if (score >= 85) return 'Expert';
  if (score >= 70) return 'Strong';
  if (score >= 50) return 'Developing';
  return 'Needs Improvement';
}

export function scoreExpertResponse(question: LibraryQuestion, response: ExpertResponse): ExpertScoreResult {
  const hints = question.scoringHints || {};
  const evidenceMatches = matchedTerms(response.supportingEvidence, hints.evidenceTerms);
  const references = exhibitReferenceCount(response.supportingEvidence);
  const numericReferences = (response.supportingEvidence.match(/\d+(?:[.,]\d+)?%?/g) || []).length;
  const evidenceScore = Math.min(25, contentScore(response.supportingEvidence, 19, hints.evidenceTerms) + Math.min(4, references * 2) + Math.min(2, numericReferences));

  let breakdown: ExpertScoreBreakdown[];
  if (question.difficulty === 'hard') {
    const observationScore = Math.min(20, contentScore(response.supportingEvidence, 15, hints.evidenceTerms) + Math.min(3, references * 2) + Math.min(2, numericReferences));
    const insightScore = contentScore(response.keyInsight, 30, hints.insightTerms);
    const implicationScore = contentScore(response.businessImplication, 25, hints.implicationTerms);
    const recommendationScore = contentScore(response.recommendedAction, 15, hints.actionTerms);
    const completeSections = [response.supportingEvidence, response.keyInsight, response.businessImplication, response.recommendedAction].filter((value) => value.trim()).length;
    const communicationScore = Math.min(10, completeSections * 2 + (response.keyInsight.length <= 420 && response.recommendedAction.length <= 520 ? 2 : 0));
    breakdown = [
      { label: 'Key observation and data reading', score: observationScore, maximum: 20 },
      { label: 'Key insight identification', score: insightScore, maximum: 30 },
      { label: 'Business implication', score: implicationScore, maximum: 25 },
      { label: 'Recommended action', score: recommendationScore, maximum: 15 },
      { label: 'Communication clarity', score: communicationScore, maximum: 10 },
    ];
  } else if (question.calculationRequired) {
    const calculationScore = contentScore(response.calculation, 30, hints.calculationTerms);
    const logicScore = Math.min(15, Math.round(Math.min(1, response.calculation.trim().length / 180) * 8) + Math.min(7, (response.calculation.match(/[=×x÷+−-]/g) || []).length));
    const interpretationScore = contentScore(response.keyInsight, 20, hints.insightTerms);
    const implicationScore = contentScore(response.businessImplication, 20, hints.implicationTerms);
    const recommendationScore = contentScore(response.recommendedAction, 15, hints.actionTerms);
    breakdown = [
      { label: 'Calculation accuracy', score: calculationScore, maximum: 30 },
      { label: 'Calculation logic', score: logicScore, maximum: 15 },
      { label: 'Interpretation of the result', score: interpretationScore, maximum: 20 },
      { label: 'Business implication', score: implicationScore, maximum: 20 },
      { label: 'Recommendation and communication', score: recommendationScore, maximum: 15 },
    ];
  } else {
    const insightScore = contentScore(response.keyInsight, 30, hints.insightTerms);
    const implicationScore = contentScore(response.businessImplication, 20, hints.implicationTerms);
    const recommendationScore = contentScore(response.recommendedAction, 15, hints.actionTerms);
    const completeSections = [response.keyInsight, response.supportingEvidence, response.businessImplication, response.recommendedAction].filter((value) => value.trim()).length;
    const communicationScore = Math.min(10, completeSections * 2 + (response.keyInsight.length <= 420 && response.recommendedAction.length <= 520 ? 2 : 0));
    breakdown = [
      { label: 'Key insight and prioritization', score: insightScore, maximum: 30 },
      { label: 'Use of evidence across exhibits', score: evidenceScore, maximum: 25 },
      { label: 'Business implication', score: implicationScore, maximum: 20 },
      { label: 'Recommendation or next step', score: recommendationScore, maximum: 15 },
      { label: 'Communication quality and structure', score: communicationScore, maximum: 10 },
    ];
  }

  let score = breakdown.reduce((sum, item) => sum + item.score, 0);
  const evidenceThresholdMissed = question.difficulty === 'hard'
    ? numericReferences < 2
    : references < (question.evidenceRequired || 2) || numericReferences < 2;
  if (evidenceThresholdMissed) score = Math.min(score, 69);
  if (!response.businessImplication.trim()) score = Math.min(score, 49);
  if (!response.recommendedAction.trim()) score = Math.min(score, 69);
  if (question.calculationRequired && breakdown[0].score < 15) score = Math.min(score, 69);

  const strongest = [...breakdown].sort((a, b) => b.score / b.maximum - a.score / a.maximum)[0];
  const weakest = [...breakdown].sort((a, b) => a.score / a.maximum - b.score / b.maximum)[0];
  const allExpectedEvidence = hints.evidenceTerms || [];
  const overlooked = allExpectedEvidence.filter((term) => !evidenceMatches.includes(term)).slice(0, 5);

  return {
    score,
    level: levelFor(score),
    breakdown,
    strongestPart: `${strongest.label} was strongest (${strongest.score}/${strongest.maximum}).`,
    missingInsight: weakest.score === weakest.maximum
      ? 'The response covers every rubric area; the next improvement is sharper prioritization and implementation detail.'
      : `${weakest.label} is the largest improvement opportunity (${weakest.score}/${weakest.maximum}).`,
    evidenceUsed: evidenceMatches.length ? evidenceMatches.slice(0, 6) : ['No expected exhibit evidence was matched clearly.'],
    evidenceOverlooked: overlooked.length ? overlooked : ['No major expected evidence marker was omitted.'],
    implicationFeedback: response.businessImplication.trim()
      ? `The implication is ${contentScore(response.businessImplication, 20, hints.implicationTerms) >= 14 ? 'decision-relevant and linked to the client objective' : 'present but needs a clearer economic, risk, or strategic consequence'}.`
      : 'No business implication was provided; a data observation alone cannot score highly.',
    recommendationFeedback: response.recommendedAction.trim()
      ? `The recommendation is ${contentScore(response.recommendedAction, 15, hints.actionTerms) >= 10 ? 'practical and evidence-linked' : 'directionally reasonable but needs a more specific action, owner, test, or decision gate'}.`
      : 'No recommended action was provided.',
  };
}
