import { clarifyUnitText } from './unitLabels';

export interface FeedbackAction {
  action: string;
  why: string;
}

export interface FeedbackPriorities {
  evidenceToRevisit: string[];
  nextStep: FeedbackAction | null;
  furtherImprovements: FeedbackAction[];
}

type ActionLike = string | { action?: unknown; text?: unknown; why?: unknown; reason?: unknown } | null | undefined;

function cleanText(value: unknown): string {
  return clarifyUnitText(String(value ?? '').trim());
}

function cleanAction(value: ActionLike): FeedbackAction | null {
  if (!value) return null;
  if (typeof value === 'string') {
    const action = cleanText(value);
    return action ? { action, why: '' } : null;
  }
  const action = cleanText(value.action) || cleanText(value.text);
  if (!action) return null;
  return { action, why: cleanText(value.why) || cleanText(value.reason) };
}

function keyOf(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isEmptyEvidence(value: string): boolean {
  return /^(?:none|n\/?a|not applicable|no evidence(?: missed| overlooked| to revisit)?|nothing(?: missed| overlooked)?)\.?$/i.test(value.trim());
}

function clarifyEvidence(value: string): string {
  const text = value.trim();
  // Legacy graders sometimes returned only figures such as “1,457; 11%; 34%”.
  // Keep the exact evidence, but explain what the learner must do with it.
  const withoutNumbers = text
    .replace(/\b(?:VND|USD|bn|mn|million|billion|thousand|m|k|pp|x)\b/gi, '')
    .replace(/[\d.,()+\-–—/%$€£₫¥₹\s;:|]+/g, '')
    .trim();
  if (!text || withoutNumbers) return text;
  return `Recheck the exhibit figure${/[;,|]/.test(text) ? 's' : ''} ${text}: identify the metric, unit and period, then explain how the evidence supports or changes your answer.`;
}

function uniqueStrings(values: unknown[], max: number): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  values.forEach((value) => {
    const text = cleanText(value);
    const key = keyOf(text);
    if (!text || !key || isEmptyEvidence(text) || seen.has(key) || result.length >= max) return;
    seen.add(key);
    result.push(clarifyEvidence(text));
  });
  return result;
}

/**
 * Normalizes new and legacy feedback without inventing evidence issues. Legacy
 * recommendations can supply priorities, but only explicit evidence fields can
 * populate “Evidence to revisit”.
 */
export function buildFeedbackPriorities({
  evidenceToRevisit = [],
  legacyEvidence = [],
  nextStep,
  furtherImprovements = [],
  legacyRecommendations = [],
  fallbackActions = [],
}: {
  evidenceToRevisit?: unknown[];
  legacyEvidence?: unknown[];
  nextStep?: ActionLike;
  furtherImprovements?: ActionLike[];
  legacyRecommendations?: ActionLike[];
  fallbackActions?: ActionLike[];
}): FeedbackPriorities {
  const candidates = [nextStep, ...furtherImprovements, ...legacyRecommendations, ...fallbackActions]
    .map(cleanAction)
    .filter((item): item is FeedbackAction => Boolean(item));
  const seen = new Set<string>();
  const uniqueActions = candidates.filter((item) => {
    const key = keyOf(item.action);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    evidenceToRevisit: uniqueStrings([...evidenceToRevisit, ...legacyEvidence], 4),
    nextStep: uniqueActions[0] || null,
    furtherImprovements: uniqueActions.slice(1, 3),
  };
}
