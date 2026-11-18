/**
 * Flags category labels that a learner cannot interpret from the question itself.
 *
 * Two kinds of finding:
 *  1. Business-stage names used as a set of segments or lines (Core, Growth, Pilot,
 *     Adjacency, At-risk). They imply product types, maturity stages or a narrative
 *     the source does not support, so they must not label chart/table categories.
 *  2. Neutral label families (Segment A, Business Line B, Market 1, Site C, Options A to E)
 *     are allowed, but only when the question text says what they are.
 */

export interface LabelAuditExhibit {
  title?: string;
  kind?: string;
  categories?: unknown;
  series?: unknown;
  columns?: unknown;
  rows?: unknown;
  footnote?: string;
  analyticalPurpose?: string;
}

export interface LabelAuditItem {
  id: string;
  /** Every learner-visible sentence that could define a label: context, question, instruction, footnotes. */
  text: string;
  exhibits?: LabelAuditExhibit[];
}

export const VAGUE_STAGE_LABELS = ['Core', 'Growth', 'Pilot', 'Adjacency', 'At-risk'] as const;

const NEUTRAL_FAMILIES = [
  'Segment', 'Business Line', 'Market', 'Site', 'Store', 'Product', 'Channel', 'Region',
  'Option', 'Unit', 'Brand', 'Group', 'Class', 'Tier', 'Type', 'Plan', 'Zone', 'Cluster', 'Line',
];

const NEUTRAL_LABEL = new RegExp(`^(${NEUTRAL_FAMILIES.join('|')}) ([A-Z]|[0-9]{1,2})$`);
const BARE_LETTER = /^[A-Z]$/;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stringsFrom(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];
}

/** Category names, series names and first-column table cells of one exhibit. */
export function exhibitLabels(exhibit: LabelAuditExhibit): string[] {
  const labels = [...stringsFrom(exhibit.categories)];
  if (Array.isArray(exhibit.series)) {
    for (const entry of exhibit.series) {
      if (entry && typeof entry === 'object' && typeof (entry as { name?: unknown }).name === 'string') labels.push((entry as { name: string }).name);
    }
  }
  if (Array.isArray(exhibit.rows)) {
    for (const row of exhibit.rows) {
      if (Array.isArray(row) && typeof row[0] === 'string') labels.push(row[0]);
    }
  }
  return labels.map((label) => label.trim()).filter(Boolean);
}

function isDefined(label: string, text: string): boolean {
  const escaped = escapeRegExp(label);
  return new RegExp(`\\b${escaped}\\b[^.]{0,60}\\b(?:means|refers to|is defined as|stands for)\\b`, 'i').test(text);
}

function neutralFamilyDefined(family: string, firstSuffix: string, text: string): boolean {
  const plural = `${escapeRegExp(family)}s`;
  return new RegExp(`\\b${plural}\\s+${escapeRegExp(firstSuffix)}\\b`).test(text)
    || new RegExp(`\\b${escapeRegExp(family)} ${escapeRegExp(firstSuffix)}\\b[^.]{0,40}\\b(?:is|are|means|refers to)\\b`).test(text);
}

function bareLettersDefined(text: string): boolean {
  return /\b\w+s\s+A\s+(?:to|through)\s+[B-Z]\b/.test(text) || /\b\w+s\s+A,\s*B\b/.test(text);
}

export function findUndefinedVagueLabels(items: LabelAuditItem[]): string[] {
  const problems: string[] = [];
  for (const item of items) {
    (item.exhibits || []).forEach((exhibit, exhibitIndex) => {
      const labels = exhibitLabels(exhibit);
      const where = `${item.id} exhibit ${exhibitIndex + 1}`;

      const stage = VAGUE_STAGE_LABELS.filter((name) => labels.includes(name));
      if (stage.length >= 2) {
        const undefinedStage = stage.filter((name) => !isDefined(name, item.text));
        if (undefinedStage.length) problems.push(`${where} labels categories with undefined stage names: ${undefinedStage.join(', ')}.`);
      }

      const families = new Map<string, string[]>();
      for (const label of labels) {
        const match = NEUTRAL_LABEL.exec(label);
        if (match) families.set(match[1], [...(families.get(match[1]) || []), match[2]]);
      }
      families.forEach((suffixes, family) => {
        if (suffixes.length >= 2 && !neutralFamilyDefined(family, suffixes[0], item.text)) {
          problems.push(`${where} uses ${family} ${suffixes[0]}, ${family} ${suffixes[1]}... without saying what they are.`);
        }
      });

      const bare = labels.filter((label) => BARE_LETTER.test(label));
      if (bare.length >= 3 && !bareLettersDefined(item.text)) {
        problems.push(`${where} uses bare letter labels (${bare.slice(0, 3).join(', ')}...) without saying what they are.`);
      }
    });
  }
  return problems;
}
