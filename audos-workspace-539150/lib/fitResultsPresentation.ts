export function stripMatePrefix(text: string): string {
  return String(text || '')
    .replace(/^Mate\s+(noticed|recommends|sees)\s*(that\s+)?/i, '')
    .replace(/^You\s+showcased\s+/i, '')
    .replace(/\s*Mate\s+recommends:?\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sentenceCase(raw: unknown): string {
  const value = String(raw || '')
    .replace(/^[\s\u200B-\u200D\u2060\uFEFF•·▪◦‣⁃\-–—]+/u, '')
    .trim();
  if (!value) return '';
  return value.replace(/\p{L}/u, (letter) => letter.toLocaleUpperCase('en'));
}

function plainEvidenceFromRawScores(raw: string): string | null {
  const scorePattern = /\b(university|gpa|certifications?|competitions?|research|projects?|job-description keyword coverage|keyword coverage|technical(?: tools?)?|leadership|extracurriculars?)\s*[:=-]?\s*(\d{1,3})(?:\s*\/\s*100|%)?/gi;
  const scores = new Map<string, number>();
  let match: RegExpExecArray | null;
  while ((match = scorePattern.exec(raw))) scores.set(match[1].toLowerCase(), Number(match[2]));
  if (scores.size < 2) return null;
  const academic = Math.max(scores.get('university') ?? -1, scores.get('gpa') ?? -1);
  const certifications = scores.get('certification') ?? scores.get('certifications') ?? -1;
  const competitions = scores.get('competition') ?? scores.get('competitions') ?? -1;
  const projects = scores.get('project') ?? scores.get('projects') ?? -1;
  const keywords = scores.get('job-description keyword coverage') ?? scores.get('keyword coverage') ?? -1;
  const technical = scores.get('technical') ?? scores.get('technical tools') ?? -1;
  const leadership = scores.get('leadership') ?? scores.get('extracurricular') ?? scores.get('extracurriculars') ?? -1;
  const parts: string[] = [];
  if (academic >= 0) parts.push(academic >= 70 ? 'Strong academic background' : academic >= 40 ? 'Academic foundation is developing' : 'Academic evidence is limited');
  if (certifications >= 0 || competitions >= 0) {
    const strongest = Math.max(certifications, competitions);
    parts.push(strongest >= 70 ? 'certifications or competition evidence is strong' : strongest > 0 ? 'certifications and competitions provide some supporting evidence' : 'no certification or competition evidence is confirmed yet');
  }
  if (leadership >= 0) parts.push(leadership >= 60 ? 'leadership evidence is clear' : leadership > 0 ? 'leadership evidence needs a more measurable example' : 'no leadership example is confirmed yet');
  if (projects === 0) parts.push('no target-relevant project is confirmed yet');
  if (keywords >= 0 && keywords < 50) parts.push('the CV does not yet show enough target-role keywords');
  if (technical >= 0 && technical < 50) parts.push('target tools are not yet clearly evidenced');
  return sentenceCase(`${parts.join('; ')}.`);
}

export function isMbtiCriterion(item: { id?: unknown; label?: unknown; label_en?: unknown } | null | undefined): boolean {
  const id = String(item?.id || '').toLowerCase();
  const label = String(item?.label_en || item?.label || '').toLowerCase();
  return id.includes('mbti') || label.includes('mbti');
}

export function isResearchCriterion(item: unknown): boolean {
  if (typeof item === 'string') return /\bresearch\b|\bpublications?\b/i.test(item.replace(/[_-]+/g, ' '));
  const value = item && typeof item === 'object' ? item as Record<string, unknown> : {};
  const text = [value.id, value.label_en, value.label, value.dimension].map((part) => String(part || '')).join(' ').replace(/[_-]+/g, ' ');
  return /\bresearch\b|\bpublications?\b/i.test(text);
}

export function isMotivationCriterion(item: unknown): boolean {
  if (typeof item === 'string') return /\bmotivation\b|\bpersonal preferences?\b/i.test(item.replace(/[_-]+/g, ' '));
  const value = item && typeof item === 'object' ? item as Record<string, unknown> : {};
  const text = [value.id, value.label_en, value.label, value.dimension].map((part) => String(part || '')).join(' ').replace(/[_-]+/g, ' ');
  return /\bmotivation\b|\bpersonal preferences?\b/i.test(text);
}

function finiteFitScore(value: unknown): number | null {
  if (value == null || value === '') return null;
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}

function fitNameKey(value: unknown): string {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function resolveMotivationFitScore(analysis: any, functionScores: any[] = [], targetFunction = ''): number | null {
  const availableFunctionScores = functionScores.length
    ? functionScores
    : Array.isArray(analysis?.function_fit_scores) ? analysis.function_fit_scores
      : Array.isArray(analysis?.fa_engine?.function_fit_scores) ? analysis.fa_engine.function_fit_scores : [];
  const targetKey = fitNameKey(targetFunction);
  const matchedFunction = availableFunctionScores.find((row) => {
    const rowKey = fitNameKey(row?.name || row?.id);
    return targetKey && rowKey && (rowKey === targetKey || rowKey.includes(targetKey) || targetKey.includes(rowKey));
  }) || availableFunctionScores[0];
  const functionScore = finiteFitScore(matchedFunction?.breakdown?.motivation?.score);
  if (functionScore != null && functionScore > 0) return functionScore;

  const candidates = [
    analysis?.motivation_fit_score,
    analysis?.motivationFit,
    analysis?.dimension_scores?.motivation,
    analysis?.dimensions?.motivation,
    analysis?.fa_engine?.dimensions?.motivation,
  ].map(finiteFitScore);
  const positive = candidates.find((score) => score != null && score > 0);
  if (positive != null) return positive;
  return candidates.find((score) => score != null) ?? functionScore;
}

export function humanizeCriterionLabel(raw: unknown): string {
  const value = String(raw || '').replace(/\s*\(\s*\d+(?:\.\d+)?%\s*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^cognitive$/i.test(value)) return 'Academic Foundation';
  if (/^university tier$/i.test(value)) return 'University Background';
  if (/^gpa band$/i.test(value)) return 'Academic Performance';
  return value;
}

function humanizeFitEvidence(raw: unknown): string {
  return String(raw || '')
    .replace(/\b(.+?)\s+is\s+Tier\s*\d+\s+in\s+fa_university_ranking\b/gi, '$1 is recognized in Casemate’s university reference list')
    .replace(/\b(.+?)\s+band selected from\s+fa_gpa_bands\b/gi, '$1 band is confirmed from your CV')
    .replace(/\bculture vector\b/gi, 'culture profile')
    .replace(/\bfa_[a-z0-9_]+\b/gi, '')
    .replace(/\bTier\s*\d+\s*,?\s*/gi, '')
    .replace(/\b(?:conservative\s+)?default\s*=\s*\d+(?:\.\d+)?\s*pts?\b/gi, 'level not provided')
    .replace(/\b\d+(?:\.\d+)?\s*pts?\b/gi, '')
    .replace(/\b\d+(?:\.\d+)?%\b/g, '')
    .replace(/\(\s*([^,()]+?)\s*,\s*\)/g, '($1)')
    .replace(/,\s*,/g, ', ')
    .replace(/\(\s*,?\s*\)/g, '')
    .replace(/\s+([,.;:)])/g, '$1')
    .replace(/([(;])\s*,/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function compactFitEvidence(raw: unknown, maxLen = 150): string {
  let text = stripMatePrefix(humanizeFitEvidence(raw))
    .replace(/\s*\[[^\]]+\]/g, '')
    .replace(/\b(?:questionnaire|cv):[^\s|]+/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  const plainEvidence = plainEvidenceFromRawScores(text);
  if (plainEvidence) return plainEvidence.length > maxLen ? `${plainEvidence.slice(0, maxLen - 1)}…` : plainEvidence;
  const parts = text.split(/\s*\|\s*/).map((part) => part.trim()).filter(Boolean);
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const part of parts) {
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(part);
  }
  text = unique.slice(0, 2).join(' · ');
  if (text.length > maxLen) text = `${text.slice(0, maxLen - 1)}…`;
  return text;
}

function looksLikeBareKeyword(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  if (/soft compatibility signal/i.test(trimmed)) return true;
  if (trimmed.length <= 28 && !/[.!?]/.test(trimmed) && trimmed.split(/\s+/).length <= 4) return true;
  return false;
}

/** Stable dedup key — gap-row tips often end with “.” while engine tips are stripped. */
function watchLineKey(line: string): string {
  return stripMatePrefix(line)
    .toLowerCase()
    .replace(/\.+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isProfessionalEvidenceTip(text: string): boolean {
  const key = watchLineKey(text);
  return /add (?:target-function|a )/.test(key) && /internship|certification|skill evidence/.test(key);
}

function rewriteEngineSubScoreTip(cleaned: string): string {
  const topic = cleaned.replace(/^strengthen the lowest cited sub-score:\s*/i, '').trim();
  if (!topic) return 'Add one concrete, measurable example that backs up your fit story.';
  if (/motivation|why.?this|structured motivation/i.test(topic)) {
    return 'Sharpen your why-this-company and why-this-role story with one specific reason and one proof from your CV or goals.';
  }
  if (/professional|internship|cv|experience/i.test(topic)) {
    return 'Add one target-role internship, project, or certification with a clear outcome.';
  }
  if (/leadership|extracurricular/i.test(topic)) {
    return 'Add one leadership or team example with what you owned and one measurable result.';
  }
  if (/work.?style|ocp|culture/i.test(topic)) {
    return 'Back up your work-style preferences with one team or project example.';
  }
  if (/academic|cognitive|gpa|analytical/i.test(topic)) {
    return 'Add one academic or analytical example with numbers or a clear decision.';
  }
  const plain = topic.replace(/^structured\s+/i, '').toLowerCase();
  return `Strengthen your ${plain} with one specific, measurable example.`;
}

// Engine bookkeeping such as "Below threshold: Cognitive (15%)" or a missing
// work-style / preference signal says nothing a candidate can act on.
function isEngineThresholdLine(text: string): boolean {
  if (/^below threshold\b/i.test(text)) return true;
  return /^no confirmed evidence for\b/i.test(text) && /work.?style|preference|culture|corporate fit|mbti|personality|motivation/i.test(text);
}

export function formatConcernLine(raw: unknown): string {
  if (isEngineThresholdLine(String(raw || '').trim())) return '';
  const cleaned = stripMatePrefix(humanizeFitEvidence(raw))
    .replace(/^Missing evidence for\s+/i, '')
    .replace(/^clear evidence of\s+/i, '')
    .replace(/\.$/, '');
  if (!cleaned || isMbtiCriterion({ label: cleaned }) || isResearchCriterion(cleaned) || isMotivationCriterion(cleaned)) return '';
  const plainEvidence = plainEvidenceFromRawScores(cleaned);
  if (plainEvidence) return plainEvidence;
  if (/^strengthen the lowest cited sub-score:/i.test(cleaned)) {
    return rewriteEngineSubScoreTip(cleaned);
  }
  if (looksLikeBareKeyword(cleaned)) {
    const topic = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    return `Prepare one example linking ${topic} to this role.`;
  }
  if (isProfessionalEvidenceTip(cleaned)) {
    return 'Add one target-role internship, certification, or project with a clear outcome.';
  }
  const lower = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
  return sentenceCase(lower.length > 110 ? `${lower.slice(0, 107)}…` : lower);
}

export function watchLineFromConcern(raw: unknown): string | null {
  const line = formatConcernLine(raw);
  return line || null;
}

function formatGapNextForWatch(next: string): string {
  const formatted = formatConcernLine(next);
  if (formatted) return formatted;
  return stripMatePrefix(next);
}

export function buildWatchListLines(input: {
  engineConcerns?: unknown[];
  gapRows?: { label?: string; next?: string; summary?: string }[];
  limit?: number;
}): string[] {
  const limit = input.limit ?? 8;
  const lines: string[] = [];
  const seen = new Set<string>();
  let professionalTipCount = 0;
  const push = (line: string) => {
    const display = sentenceCase(stripMatePrefix(line).trim());
    const key = watchLineKey(display);
    if (!key || seen.has(key)) return;
    if (isProfessionalEvidenceTip(display)) {
      if (professionalTipCount >= 2) return;
      professionalTipCount += 1;
    }
    seen.add(key);
    lines.push(display);
  };
  for (const row of input.gapRows || []) {
    if (isResearchCriterion(row.label) || isMotivationCriterion(row.label)) continue;
    if (row.next) push(formatGapNextForWatch(row.next));
    if (row.label && row.summary) push(`${row.label}: ${compactFitEvidence(row.summary, 90)}`);
  }
  for (const raw of input.engineConcerns || []) {
    const line = watchLineFromConcern(raw);
    if (!line) continue;
    if (isProfessionalEvidenceTip(line) && professionalTipCount >= 2) continue;
    push(line);
  }
  return lines.slice(0, limit);
}

export function mergePeerHintsIntoActions(
  actions: any[],
  peer: { gaps_vs_peers?: string[]; strengths_vs_peers?: string[] } | null | undefined,
  limit = 12,
): any[] {
  if (!peer) return actions.slice(0, limit);
  const extra: any[] = [];
  (peer.gaps_vs_peers || []).slice(0, 2).forEach((gap, index) => {
    const text = stripMatePrefix(gap);
    if (!text) return;
    extra.push({
      id: `peer-gap-${index}`,
      priority: 'Medium',
      category: 'Profile',
      action: text,
      recommendedAction: text,
    });
  });
  const merged = [...actions, ...extra];
  const seen = new Set<string>();
  return merged.filter((item) => {
    const key = stripMatePrefix(item?.action || item?.recommendedAction || item?.gap || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

function normalizeActionCategory(raw: string): string {
  const value = stripMatePrefix(raw).toLowerCase();
  if (value.includes('case')) return 'Case drill';
  if (value.includes('profile') || value.includes('cv') || value.includes('language')) return 'Update profile / CV';
  if (value.includes('network') || value.includes('referral')) return 'Networking';
  if (value.includes('interview') || value.includes('story')) return 'Interview prep';
  return stripMatePrefix(raw) || 'Preparation';
}

const CATEGORY_ALTERNATES: Record<string, string[]> = {
  'Update profile / CV': [
    'Add one measurable bullet (metric + decision + outcome) to your strongest internship or project.',
    'List one certification or course tied to your target function with completion date.',
    'Refresh your skills section with three tools you used on a real task.',
  ],
  'Case drill': [
    'Complete one market-sizing or profitability drill and capture your answer structure in five bullets.',
    'Record a three-minute recommendation summary from a practice case and replay for clarity.',
  ],
  'Interview prep': [
    'Draft two STAR stories that map to your target function and rehearse them aloud once.',
    'Prepare one thoughtful question per interview round about rotation scope and success metrics.',
  ],
  Networking: [
    'Message one alumnus in your target industry with a specific question about their rotation.',
    'Attend one employer webinar and note three culture signals to reference in motivation answers.',
  ],
};

export function expandRecommendationAlternatives(
  actions: any[],
  input: { gapRows?: { label?: string; next?: string }[]; targetFunction?: string; limit?: number } = {},
): any[] {
  const limit = input.limit ?? 12;
  const seen = new Set<string>();
  const out: any[] = [];
  const push = (item: any) => {
    const text = stripMatePrefix(item?.action || item?.recommendedAction || item?.text || item?.gap || '');
    const key = text.toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };
  (actions || []).forEach(push);
  for (const row of input.gapRows || []) {
    if (!row.next) continue;
    const text = stripMatePrefix(row.next);
    if (!text) continue;
    push({
      id: `gap-alt-${out.length}`,
      priority: 'Medium',
      category: row.label || 'Growth area',
      action: text,
      recommendedAction: text,
    });
  }
  const categories = new Set(
    out.map((item) => normalizeActionCategory(String(item.casemate_function || item.casemateFunction || item.category || ''))),
  );
  for (const category of categories) {
    const alternates = CATEGORY_ALTERNATES[category] || [];
    let inCategory = out.filter((item) => normalizeActionCategory(String(item.category || item.casemate_function || '')) === category).length;
    for (const text of alternates) {
      if (inCategory >= 3) break;
      push({ id: `alt-${category}-${inCategory}`, priority: 'Medium', category, action: text, recommendedAction: text });
      inCategory += 1;
    }
  }
  if (input.targetFunction) {
    push({
      id: 'target-function-intern',
      priority: 'High',
      category: 'Update profile / CV',
      action: `Seek a ${input.targetFunction} internship or project and mirror program JD keywords in your bullet points.`,
      recommendedAction: `Seek a ${input.targetFunction} internship or project and mirror program JD keywords in your bullet points.`,
    });
  }
  return out.slice(0, limit);
}
