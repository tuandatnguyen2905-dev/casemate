// Case Drill → Charts narration scripts (Audio Mode).
//
// One script per Charts question id, built only from what the learner sees
// before submitting: the case context (plus client objective, Case Journey
// framing and key terms when the drill shows them) and the question with its
// required instructions. Answer keys, options, explanations, worked answers and
// exhibit values are never read. The same builder runs when audio is
// pre-generated and in the browser, so the stored source/script hashes can be
// compared with the live content: any edit makes the stored audio stale and
// Audio Mode falls back to the transcript instead of playing it.

export const CHART_NARRATION_VERSION = 'charts-narration-v1';

export interface ChartNarrationJourney {
  name: string;
  stageRole?: string;
  role: string;
  decision: string;
  timeframe: string;
}

export interface ChartNarrationSource {
  id: string;
  title: string;
  context: string;
  clientObjective: string;
  journey: ChartNarrationJourney | null;
  keyTerms: string[];
  task: string;
  instruction: string;
  guidance: string[];
  answerFormat: string[];
  exhibitGuide: string[];
  answerMode: string;
  answerUnit: string;
  contentVersion: string;
}

export type ChartNarrationSegmentKind = 'context' | 'question';

export interface ChartNarrationSegment {
  kind: ChartNarrationSegmentKind;
  label: string;
  /** Display lines for the transcript, as the learner reads them on screen. */
  transcript: string[];
  /** Speech-ready text sent to the voice model. */
  script: string;
  scriptHash: string;
}

export interface ChartNarrationValidation {
  ok: boolean;
  issues: string[];
  warnings: string[];
}

export interface ChartNarration {
  id: string;
  version: string;
  sourceHash: string;
  segments: ChartNarrationSegment[];
  validation: ChartNarrationValidation;
}

interface PresentedQuestion {
  context: string;
  task: string;
  instruction: string;
  guidance: string[];
  answerFormat: string[];
  exhibitGuide: string[];
  keyTerms: string[];
}

export interface ChartNarrationDeps {
  clarifyUnitsDeep: <T>(value: T) => T;
  clarifyUnitText: (value: string) => string;
  present: (
    input: { businessContext?: string; instruction?: string; question?: string },
    options: { hasExhibits: boolean },
  ) => PresentedQuestion;
  journeyFor: (question: any) => { name?: string; role?: string; decision?: string; timeframe?: string } | null | undefined;
}

const clean = (value: unknown): string => String(value ?? '').replace(/\s+/g, ' ').trim();
const cleanList = (values: unknown): string[] => (Array.isArray(values) ? values.map(clean).filter(Boolean) : []);

/** Stable 53-bit string hash (cyrb53), hex. Identical in Node and the browser. */
export function narrationHash(text: string): string {
  let h1 = 0xdeadbeef ^ text.length;
  let h2 = 0x41c6ce57 ^ text.length;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
}

/** The learner-visible source for one Charts question, mirroring QuestionLibrary / ExpertDrillExperience. */
export function chartNarrationSource(question: any, deps: ChartNarrationDeps): ChartNarrationSource {
  const exhibits = question?.exhibits?.length ? question.exhibits : question?.exhibit ? [question.exhibit] : [];
  const shown = deps.clarifyUnitsDeep({
    title: String(question?.title || ''),
    businessContext: String(question?.businessContext || ''),
    instruction: String(question?.instruction || ''),
    question: String(question?.question || ''),
    clientObjective: String(question?.clientObjective || ''),
  });
  const presented = deps.present(
    { businessContext: shown.businessContext, instruction: shown.instruction, question: shown.question },
    { hasExhibits: exhibits.length > 0 },
  );
  const structured = Boolean(question?.structuredAnswer) && question?.skill !== 'market-sizing';
  const context = clean(presented.context);
  const objectiveText = clean(shown.clientObjective);
  const clientObjective = structured && objectiveText && !(context && context.includes(objectiveText)) ? objectiveText : '';
  const rawJourney = structured ? deps.journeyFor(question) : null;
  const journey = rawJourney
    ? {
        name: clean(deps.clarifyUnitText(String(rawJourney.name || ''))),
        stageRole: clean(question?.journeyStageRole),
        role: clean(deps.clarifyUnitText(String(rawJourney.role || ''))),
        decision: clean(deps.clarifyUnitText(String(rawJourney.decision || ''))),
        timeframe: clean(deps.clarifyUnitText(String(rawJourney.timeframe || ''))),
      }
    : null;
  return {
    id: String(question?.id || ''),
    title: clean(shown.title),
    context,
    clientObjective,
    journey,
    keyTerms: cleanList(presented.keyTerms),
    task: clean(presented.task),
    instruction: clean(presented.instruction),
    guidance: cleanList(presented.guidance),
    // Structured drills do not show the generic answer-format prompt (their answer fields ask for it).
    answerFormat: structured ? [] : cleanList(presented.answerFormat),
    exhibitGuide: cleanList(presented.exhibitGuide),
    answerMode: structured ? 'structured' : String(question?.answerMode || ''),
    answerUnit: clean(question?.answerUnit ? deps.clarifyUnitText(String(question.answerUnit)) : ''),
    contentVersion: clean(question?.contentVersion),
  };
}

export function chartSourceHash(source: ChartNarrationSource): string {
  return `${source.id}:${narrationHash(JSON.stringify([
    CHART_NARRATION_VERSION,
    source.id,
    source.title,
    source.context,
    source.clientObjective,
    source.journey,
    source.keyTerms,
    source.task,
    source.instruction,
    source.guidance,
    source.answerFormat,
    source.exhibitGuide,
    source.answerMode,
    source.answerUnit,
    source.contentVersion,
  ]))}`;
}

const sentence = (value: string): string => {
  const text = clean(value);
  if (!text) return '';
  const capitalised = text.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`);
  return /[.?!:;]["')\]]?$/.test(capitalised) ? capitalised : `${capitalised}.`;
};

/** Abbreviations expanded for speech when the text does not already spell them out. */
const SPOKEN_ABBREVIATIONS: Array<[RegExp, string]> = [
  [/\bSKUs\b/g, 'stock-keeping units'],
  [/\bSKU\b/g, 'stock-keeping unit'],
  [/\bSMEs\b/g, 'small and medium-sized enterprises'],
  [/\bSME\b/g, 'small and medium-sized enterprise'],
  [/\bSMBs\b/g, 'small and medium-sized businesses'],
  [/\bSMB\b/g, 'small and medium-sized business'],
  [/\bARR\b/g, 'annual recurring revenue'],
  [/\bARPU\b/g, 'average revenue per user'],
  [/\bNOPBT\b/g, 'net operating profit before tax'],
  [/\bCAGR\b/g, 'compound annual growth rate'],
  [/\bMAT\b/g, 'moving annual total'],
  [/\bYoY\b/g, 'year over year'],
  [/\bMoM\b/g, 'month over month'],
  [/\bQoQ\b/g, 'quarter over quarter'],
  [/\bP&L\b/g, 'profit and loss'],
  [/\bEBITDA\b/g, 'E-B-I-T-D-A'],
  [/\bCFO\b/g, 'C-F-O'],
  [/\bCOO\b/g, 'C-O-O'],
  [/\bCEO\b/g, 'C-E-O'],
  [/\bKPIs\b/g, 'K-P-Is'],
  [/\bKPI\b/g, 'K-P-I'],
];

export const SPOKEN_ABBREVIATION_MAP: Record<string, string> = Object.fromEntries(
  SPOKEN_ABBREVIATIONS.map(([pattern, spoken]) => [pattern.source.replace(/\\b/g, ''), spoken]),
);

/** Speech-ready wording: same facts, figures and order; symbols and abbreviations spelled out. */
export function toSpeech(value: string): string {
  let text = clean(value)
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\u2014/g, ' - ');
  // "ABC (spelled-out name)" reads the spelled-out name once.
  text = text.replace(/\b([A-Z][A-Za-z&]*[A-Z]s?)\s*\(([^()]{3,80})\)/g, (match, acronym: string, inner: string) => (
    inner.trim()[0]?.toLowerCase() === acronym[0].toLowerCase() ? inner.trim() : match
  ));
  text = text
    .replace(/\s*→\s*/g, ', then ')
    .replace(/([A-Z][\w&.'-]*)\s*×\s*([A-Z])/g, '$1 and $2')
    .replace(/\s*×\s*/g, ' times ')
    .replace(/\b(FY\d{4}|Y\d{1,2}|Q[1-4]|\d{4})\s*[–-]\s*(?=FY\d{4}|Y\d{1,2}|Q[1-4]|\d{4}\b)/g, '$1 to ')
    .replace(/(\d)\s*–\s*(\d)/g, '$1 to $2')
    .replace(/\s+[–-]\s+/g, ', ')
    .replace(/–/g, ', ')
    .replace(/-to-/g, ' to ')
    .replace(/\bFY(\d{4})\b/g, 'fiscal year $1')
    .replace(/\bY(\d{1,2})\b/g, 'year $1')
    .replace(/\be\.g\./gi, 'for example')
    .replace(/\bi\.e\./gi, 'that is')
    .replace(/\bvs\.?(?=\s)/gi, 'versus');
  for (const [pattern, spoken] of SPOKEN_ABBREVIATIONS) text = text.replace(pattern, spoken);
  text = text
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\bVND\s+(billion|million|thousand)\b/g, '$1 Vietnamese dong')
    .replace(/\bUSD\s+(billion|million|thousand)\b/g, '$1 US dollars')
    .replace(/\bVND\b/g, 'Vietnamese dong')
    .replace(/\bUSD\b/g, 'US dollars')
    .replace(/\$\s?(\d[\d,]*(?:\.\d+)?)(\s?(?:billion|million|thousand))?/g, '$1$2 US dollars')
    .replace(/(\d)\s?pp\b/g, '$1 percentage points')
    .replace(/(\d)\s?%/g, '$1 percent')
    .replace(/(\d)\s?bn\b/g, '$1 billion')
    .replace(/(\d)\s?ml\b/g, '$1 millilitre')
    .replace(/(\d)\s?(am|pm)\b/gi, (_, digit: string, period: string) => `${digit} ${period.toUpperCase()}`)
    .replace(/(\d(?:\.\d+)?)x\b/g, '$1 times')
    .replace(/(^|[\s(])[-−](\d)/g, '$1minus $2')
    .replace(/(^|[\s(])\+(\d)/g, '$1plus $2')
    .replace(/\s+([,.;:?!])/g, '$1')
    .replace(/,\s*,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return text;
}

function answerNote(source: ChartNarrationSource): string {
  if (source.answerMode === 'choice' || source.answerMode === 'multiple-choice') return 'Choose your answer from the options on screen.';
  if (source.answerMode === 'number' || source.answerMode === 'percentage' || source.answerMode === 'currency') {
    return source.answerUnit ? `Type one value in the answer box, in ${source.answerUnit}.` : 'Type one value in the answer box.';
  }
  return 'Write your answer in the answer panel.';
}

export function buildChartNarration(source: ChartNarrationSource): ChartNarration {
  const contextLines: string[] = [];
  if (source.context) {
    contextLines.push(sentence(source.title));
    contextLines.push(sentence(source.context));
    if (source.clientObjective) contextLines.push(sentence(`Client objective: ${source.clientObjective}`));
    if (source.journey) {
      contextLines.push(sentence(`Case Journey: ${source.journey.name}`));
      if (source.journey.role) contextLines.push(sentence(`Your role: ${source.journey.role}`));
      if (source.journey.decision) contextLines.push(sentence(`The decision: ${source.journey.decision}`));
      if (source.journey.timeframe) contextLines.push(sentence(`Timeframe: ${source.journey.timeframe}`));
    }
    if (source.keyTerms.length) contextLines.push(sentence(`Key terms: ${source.keyTerms.join(' ')}`));
  }
  const questionLines: string[] = [];
  if (!source.context) questionLines.push(sentence(source.title));
  if (!source.context && source.clientObjective) questionLines.push(sentence(`Client objective: ${source.clientObjective}`));
  questionLines.push(sentence(source.task));
  if (source.instruction) questionLines.push(sentence(source.instruction));
  source.guidance.forEach((line) => questionLines.push(sentence(line)));
  source.exhibitGuide.forEach((line) => questionLines.push(sentence(line)));
  source.answerFormat.forEach((line) => questionLines.push(sentence(`Answer format: ${line}`)));
  if (!source.context && source.keyTerms.length) questionLines.push(sentence(`Key terms: ${source.keyTerms.join(' ')}`));
  const questionTranscript = questionLines.filter(Boolean);
  const segment = (kind: ChartNarrationSegmentKind, label: string, lead: string, lines: string[], tail = ''): ChartNarrationSegment => {
    const script = [lead, ...lines.map(toSpeech), tail].filter(Boolean).join('\n');
    return { kind, label, transcript: lines, script, scriptHash: narrationHash(script) };
  };
  const segments: ChartNarrationSegment[] = [];
  if (contextLines.filter(Boolean).length) segments.push(segment('context', 'Context', 'Here is the case.', contextLines.filter(Boolean)));
  segments.push(segment('question', 'Question', 'Here is your question.', questionTranscript, answerNote(source)));
  const narration: ChartNarration = {
    id: source.id,
    version: CHART_NARRATION_VERSION,
    sourceHash: chartSourceHash(source),
    segments,
    validation: { ok: true, issues: [], warnings: [] },
  };
  narration.validation = validateChartNarration(source, narration);
  return narration;
}

const count = (text: string, pattern: RegExp): number => (text.match(pattern) || []).length;

/** Checks every script against its source before audio is generated (and again before it is played). */
export function validateChartNarration(source: ChartNarrationSource, narration: ChartNarration, answerKey?: { correctAnswer?: string; options?: string[] }): ChartNarrationValidation {
  const issues: string[] = [];
  const warnings: string[] = [];
  if (!source.task) issues.push('Question text is empty.');
  if (!narration.segments.some((segment) => segment.kind === 'question')) issues.push('Question segment is missing.');
  if (source.context && !narration.segments.some((segment) => segment.kind === 'context')) issues.push('Context exists on screen but has no Context segment.');
  if (!source.context && narration.segments.some((segment) => segment.kind === 'context')) issues.push('Context segment invented for a drill without context.');
  narration.segments.forEach((segment) => {
    const display = segment.transcript.join(' ');
    const script = segment.script;
    const where = segment.label;
    if (/\b(undefined|null|NaN)\b/.test(script)) issues.push(`${where}: script contains an empty placeholder.`);
    const figures = display.match(/\d[\d,]*(?:\.\d+)?/g) || [];
    figures.forEach((figure) => {
      if (!script.includes(figure)) issues.push(`${where}: figure ${figure} is missing from the script.`);
    });
    const negatives = count(display, /(^|[\s(])[-−]\d/g);
    if (count(script, /\bminus \d/g) !== negatives) issues.push(`${where}: negative sign count differs (${negatives} on screen).`);
    const percents = count(display, /\d\s?%/g) + count(display, /\bper ?cent\b/gi);
    if (count(script, /\bper ?cent\b/gi) < percents) issues.push(`${where}: a percentage unit was dropped.`);
    (['billion', 'million', 'thousand'] as const).forEach((unit) => {
      if (count(script, new RegExp(`\\b${unit}\\b`, 'gi')) < count(display, new RegExp(`\\b${unit}\\b`, 'gi'))) issues.push(`${where}: unit "${unit}" was dropped.`);
    });
    if (count(script, /Vietnamese dong/g) < count(display, /\bVND\b/g)) issues.push(`${where}: a VND amount lost its currency.`);
    if (count(script, /US dollars/g) < count(display, /\bUSD\b|\$\d/g)) issues.push(`${where}: a USD amount lost its currency.`);
    const exhibitRefs = display.match(/\bExhibits? \d+/g) || [];
    exhibitRefs.forEach((ref) => { if (!script.includes(ref)) issues.push(`${where}: "${ref}" reference is missing.`); });
    if (count(script, /\?/g) < count(display, /\?/g)) issues.push(`${where}: a sub-question was dropped.`);
    const quarterRefs = display.match(/\bQ[1-4]\b/g) || [];
    quarterRefs.forEach((ref) => { if (!script.includes(ref)) issues.push(`${where}: period ${ref} is missing.`); });
    (display.match(/\bFY\d{4}\b/g) || []).forEach((ref) => { if (!script.includes(`fiscal year ${ref.slice(2)}`)) issues.push(`${where}: ${ref} is missing.`); });
    (display.match(/\b[A-Z][A-Za-z&]*[A-Z]s?\b/g) || []).forEach((acronym) => {
      if (['VND', 'USD', 'II', 'III', 'IV'].includes(acronym) || /^(FY|Y|Q)\d/.test(acronym)) return;
      const spoken = SPOKEN_ABBREVIATION_MAP[acronym];
      if (script.includes(acronym)) return;
      if (spoken && script.includes(spoken)) return;
      const spelled = display.match(new RegExp(`\\b${acronym.replace(/[&]/g, '\\&')}\\s*\\(([^()]+)\\)`));
      if (spelled && script.includes(spelled[1].trim())) return;
      issues.push(`${where}: abbreviation ${acronym} is neither read nor expanded.`);
    });
    const names = (display.match(/[a-z,;:] [A-Z][a-zà-ỹ]+(?:[A-Z][a-z]+)?/g) || []).map((match) => match.slice(2));
    names.forEach((name) => { if (!script.includes(name)) issues.push(`${where}: name "${name}" is missing.`); });
    const ratio = script.length / Math.max(1, display.length);
    if (ratio < 0.85) issues.push(`${where}: script is much shorter than the source (${Math.round(ratio * 100)}%).`);
  });
  if (answerKey?.correctAnswer && (source.answerMode === 'choice' || source.answerMode === 'multiple-choice')) {
    const key = clean(answerKey.correctAnswer);
    const allText = narration.segments.map((segment) => segment.script).join(' ');
    const visible = narration.segments.map((segment) => segment.transcript.join(' ')).join(' ');
    if (key.length >= 4 && allText.includes(toSpeech(key)) && !visible.includes(key)) issues.push('Script contains the answer key.');
    if (key.length >= 4 && visible.includes(key)) warnings.push('The on-screen question text already contains the correct option wording.');
  }
  return { ok: issues.length === 0, issues, warnings };
}
