/*
 * MCQ-content guard for Case Pool.
 *
 * Case Pool is for solving full, open-ended cases. A question that exists in
 * Case Drill as a multiple-choice item keeps its options in a separate
 * `options` field there; nothing in this module's callers may copy those
 * options, the keyed option, a distractor or an option explanation into a Case
 * Pool task, description, objective, constraint, tip or exhibit caption.
 *
 * Detection looks for the shapes MCQ text actually takes: a lettered option
 * list ("A.", "A)", "(A)"), an "Answer choices" / "Choices:" header, answer
 * markers ("Correct answer", "Answer key", "Why / scoring"), distractor or
 * option-explanation wording, and "Option A:" style labels.
 *
 * This file has no imports on purpose: it is used by the import path, the
 * learner-facing guard and the tests, and must never create an import cycle.
 */

export interface McqFinding {
  rule: string;
  excerpt: string;
}

const LETTERS = 'ABCDEF';

const LIST_LINE = /^\s*(?:\(([A-Fa-f])\)|([A-Fa-f])[.)])\s+(\S.*)$/;
const LABELLED_LINE = /^\s*(?:option|choice)\s+([A-Fa-f])\s*[:.)\u2013-]\s*(\S.*)$/i;

const INLINE_PAREN = /\(A\)\s*\S[\s\S]{0,400}?\(B\)\s*\S/;
const INLINE_CLOSE = /(?:^|[\s:;,])A\)\s+\S[\s\S]{0,400}?\sB\)\s+\S/;

const HEADER_LINE = /^\s*(?:answer\s+)?(?:choices|options)\s*:\s*$|^\s*(?:answer\s+)?choices\s*:/i;
const MARKER_LINE = /^\s*(?:answer key|correct (?:answer|option|choice)|why\s*\/\s*scoring|distractors?|option explanations?)\s*:/i;

const MARKER_PATTERNS: Array<[string, RegExp]> = [
  ['correct answer or option', /\b(?:correct|keyed)\s+(?:answer|option|choice)s?\b/i],
  ['answer key', /\banswer\s+key\b/i],
  ['scoring explanation of options', /\bwhy\s*\/\s*scoring\b/i],
  ['distractor', /\bdistractors?\b/i],
  ['incorrect option', /\b(?:incorrect|wrong)\s+(?:options?|choices?|answers?)\b/i],
  ['answer letters', /\banswer\s+letters?\b/i],
  ['option explanation', /\b(?:option|choice)\s+explanations?\b/i],
  ['option verdict', /\b(?:[Oo]ption|[Cc]hoice)\s+[A-F]\b[^.\n]{0,80}\b(?:is|are)\s+(?:correct|incorrect|wrong|right)\b/],
];

interface Run {
  start: number;
  end: number;
}

function lineLetter(line: string): { letter: string; text: string; labelled: boolean } | null {
  const plain = LIST_LINE.exec(line);
  if (plain) return { letter: (plain[1] || plain[2]).toUpperCase(), text: plain[3].trim(), labelled: false };
  const labelled = LABELLED_LINE.exec(line);
  if (labelled) return { letter: labelled[1].toUpperCase(), text: labelled[2].trim(), labelled: true };
  return null;
}

/**
 * Runs of lines labelled A, B, C ... in order (blank lines between items are
 * allowed). "A./A)/(A)" lists need A and B; "Option A:" lists need A, B and C,
 * because a business case may legitimately weigh two named options.
 */
function optionRuns(lines: string[]): Run[] {
  const runs: Run[] = [];
  let index = 0;
  while (index < lines.length) {
    const first = lineLetter(lines[index]);
    if (!first || first.letter !== 'A') {
      index += 1;
      continue;
    }
    let expected = 1;
    let end = index + 1;
    let cursor = index + 1;
    while (cursor < lines.length) {
      if (!lines[cursor].trim()) {
        cursor += 1;
        continue;
      }
      const next = lineLetter(lines[cursor]);
      if (!next || next.letter !== LETTERS[expected] || next.labelled !== first.labelled) break;
      expected += 1;
      cursor += 1;
      end = cursor;
    }
    if (expected >= (first.labelled ? 3 : 2)) {
      runs.push({ start: index, end });
      index = end;
    } else {
      index += 1;
    }
  }
  return runs;
}

const excerpt = (value: string): string => value.replace(/\s+/g, ' ').trim().slice(0, 90);

/** Option-list shapes only: used where answer-marker words may legitimately appear. */
export function findEmbeddedOptions(text: unknown): McqFinding[] {
  const value = String(text ?? '');
  if (!value.trim()) return [];
  const findings: McqFinding[] = [];
  const lines = value.split('\n');
  optionRuns(lines).forEach((run) => findings.push({ rule: 'lettered option list', excerpt: excerpt(lines[run.start]) }));
  if (INLINE_PAREN.test(value)) findings.push({ rule: 'inline (A) (B) options', excerpt: excerpt(value.slice(Math.max(0, value.search(/\(A\)/)))) });
  else if (INLINE_CLOSE.test(value)) findings.push({ rule: 'inline A) B) options', excerpt: excerpt(value.slice(Math.max(0, value.search(/A\)\s/)))) });
  const header = lines.find((line) => HEADER_LINE.test(line));
  if (header) findings.push({ rule: 'answer choices header', excerpt: excerpt(header) });
  return findings;
}

/**
 * Every MCQ shape: option lists, headers, answer markers, distractor and option-explanation wording.
 * A worked answer (`postSubmission`) may say what the right answer is, so the plain "correct answer" wording is
 * allowed there; option lists, answer-key labels and distractor commentary never are.
 */
export function findMcqContent(text: unknown, options: { postSubmission?: boolean } = {}): McqFinding[] {
  const value = String(text ?? '');
  if (!value.trim()) return [];
  const findings = findEmbeddedOptions(value);
  const lines = value.split('\n');
  const markerLine = lines.find((line) => MARKER_LINE.test(line));
  if (markerLine) findings.push({ rule: 'answer marker line', excerpt: excerpt(markerLine) });
  MARKER_PATTERNS.forEach(([rule, pattern]) => {
    if (options.postSubmission && rule === 'correct answer or option') return;
    const match = pattern.exec(value);
    if (match) findings.push({ rule, excerpt: excerpt(value.slice(Math.max(0, match.index - 20), match.index + 70)) });
  });
  return findings;
}

function dropMarkerSentences(line: string): string {
  const sentences = line.replace(/([.!?])\s+/g, '$1\n').split('\n');
  if (sentences.length === 1 && !MARKER_PATTERNS.some(([, pattern]) => pattern.test(line))) return line;
  return sentences.filter((sentence) => !MARKER_PATTERNS.some(([, pattern]) => pattern.test(sentence))).join(' ');
}

/** Removes option lists, choice headers, answer-marker lines and sentences that talk about options. */
export function stripMcqContent(text: unknown): string {
  const value = String(text ?? '');
  if (!value.trim()) return '';
  const lines = value.split('\n');
  const drop = new Set<number>();
  optionRuns(lines).forEach((run) => {
    for (let index = run.start; index < run.end; index += 1) drop.add(index);
  });
  lines.forEach((line, index) => {
    if (HEADER_LINE.test(line) || MARKER_LINE.test(line)) drop.add(index);
  });
  const kept = lines
    .filter((_, index) => !drop.has(index))
    .map((line) => {
      let next = line;
      const paren = INLINE_PAREN.test(next) ? next.search(/\(A\)/) : -1;
      if (paren >= 0) next = next.slice(0, paren);
      else if (INLINE_CLOSE.test(next)) next = next.slice(0, Math.max(0, next.search(/(?:^|[\s:;,])A\)\s/)));
      return dropMarkerSentences(next).trimEnd();
    });
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Strips only option-list shapes (lists, inline lists, headers); wording about options is left alone. */
export function stripEmbeddedOptionLists(text: unknown): string {
  const value = String(text ?? '');
  if (!findEmbeddedOptions(value).length) return value;
  const lines = value.split('\n');
  const drop = new Set<number>();
  optionRuns(lines).forEach((run) => {
    for (let index = run.start; index < run.end; index += 1) drop.add(index);
  });
  lines.forEach((line, index) => {
    if (HEADER_LINE.test(line)) drop.add(index);
  });
  return lines
    .filter((_, index) => !drop.has(index))
    .map((line) => {
      const paren = INLINE_PAREN.test(line) ? line.search(/\(A\)/) : -1;
      if (paren >= 0) return line.slice(0, paren).trimEnd();
      if (INLINE_CLOSE.test(line)) return line.slice(0, Math.max(0, line.search(/(?:^|[\s:;,])A\)\s/))).trimEnd();
      return line;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Separates options that were typed into a question's text from the question
 * itself. The stem has no options left; `options` holds them in order.
 */
export function splitEmbeddedOptions(text: unknown): { stem: string; options: string[] } {
  const value = String(text ?? '');
  const lines = value.split('\n');
  const [run] = optionRuns(lines);
  if (run) {
    const options = lines
      .slice(run.start, run.end)
      .map((line) => lineLetter(line)?.text || '')
      .filter(Boolean);
    const stem = [...lines.slice(0, run.start), ...lines.slice(run.end)]
      .filter((line) => !HEADER_LINE.test(line))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    return { stem, options };
  }
  const paren = value.search(/\(A\)\s*\S/);
  if (paren >= 0 && INLINE_PAREN.test(value)) {
    const parts = value.slice(paren).split(/\(([A-F])\)\s*/).slice(1);
    const options: string[] = [];
    for (let index = 0; index + 1 < parts.length; index += 2) options.push(parts[index + 1].trim().replace(/[;,]\s*$/, ''));
    return { stem: value.slice(0, paren).trim(), options: options.filter(Boolean) };
  }
  return { stem: value.trim(), options: [] };
}

/**
 * The only way a Case Drill question becomes a Case Pool task: the question
 * stem with every option, header and answer marker removed, followed by an
 * instruction that asks for the learner's own written work.
 */
export function casePoolTaskFromDrill(question: unknown, instruction = ''): string {
  const { stem } = splitEmbeddedOptions(question);
  const task = stripMcqContent(stem);
  return [task, instruction.trim()].filter(Boolean).join(' ').trim();
}

/* ------------------------------------------------------------ Case Pool cases */

interface CaptionedExhibit {
  [key: string]: unknown;
}

export interface PoolCaseTextLike {
  id: string;
  title?: string;
  situation?: string;
  key_question?: string;
  objective?: string;
  constraints?: string[];
  approach_tips?: string[];
  framework_hints?: string[];
  answer_choices?: unknown;
  data_exhibits?: unknown[];
  journey_exhibits?: unknown[];
  journey_stages?: Array<{ prompt?: string }>;
  model_answer?: object;
}

/** Exhibit fields a learner reads before submitting. Cells, series values and categories are data, not captions. */
const CAPTION_FIELDS = ['title', 'subtitle', 'footnote', 'sourceNote', 'analyticalPurpose', 'structureRole', 'timePeriod', 'note', 'label', 'context'];

function captionProblems(exhibits: unknown[] | undefined, where: string): string[] {
  const problems: string[] = [];
  (exhibits || []).forEach((exhibit, index) => {
    const source = (exhibit || {}) as CaptionedExhibit;
    CAPTION_FIELDS.forEach((field) => {
      const value = source[field];
      if (typeof value !== 'string') return;
      findMcqContent(value).forEach((finding) => problems.push(`${where} ${index + 1} ${field}: ${finding.rule} (“${finding.excerpt}”)`));
    });
  });
  return problems;
}

const MODEL_ANSWER_TEXT_FIELDS = ['situation_analysis', 'framework_applied', 'recommendation'];
const MODEL_ANSWER_LIST_FIELDS = ['key_findings', 'key_calculations', 'insights', 'implications', 'plausible_alternatives', 'issue_tree'];

/**
 * Every problem in one Case Pool case: MCQ content in anything a learner reads
 * before submitting (task, description, objective, constraints, tips, exhibit
 * captions), a retained `answer_choices` field, and option/answer-key
 * scaffolding in the worked answer.
 */
export function poolCaseMcqProblems(item: PoolCaseTextLike): string[] {
  const problems: string[] = [];
  const scan = (field: string, value: unknown, postSubmission = false) => {
    findMcqContent(value, { postSubmission }).forEach((finding) => problems.push(`${item.id} ${field}: ${finding.rule} (“${finding.excerpt}”)`));
  };
  if (Array.isArray(item.answer_choices) ? item.answer_choices.length > 0 : item.answer_choices !== undefined && item.answer_choices !== null) {
    problems.push(`${item.id} answer_choices: a Case Pool case must not carry answer choices.`);
  }
  scan('title', item.title);
  scan('situation', item.situation);
  scan('key_question', item.key_question);
  scan('objective', item.objective);
  (item.constraints || []).forEach((entry, index) => scan(`constraints[${index}]`, entry));
  (item.approach_tips || []).forEach((entry, index) => scan(`approach_tips[${index}]`, entry));
  (item.framework_hints || []).forEach((entry, index) => scan(`framework_hints[${index}]`, entry));
  (item.journey_stages || []).forEach((stage, index) => scan(`journey_stages[${index}].prompt`, stage?.prompt));
  problems.push(...captionProblems(item.data_exhibits, `${item.id} data_exhibits`));
  problems.push(...captionProblems(item.journey_exhibits, `${item.id} journey_exhibits`));
  const model = (item.model_answer || {}) as Record<string, unknown>;
  MODEL_ANSWER_TEXT_FIELDS.forEach((field) => scan(`model_answer.${field}`, model[field], true));
  MODEL_ANSWER_LIST_FIELDS.forEach((field) => {
    const value = model[field];
    if (Array.isArray(value)) value.forEach((entry, index) => scan(`model_answer.${field}[${index}]`, entry, true));
  });
  return problems;
}

export function validateCasePoolOpenEnded(items: PoolCaseTextLike[]): string[] {
  return items.flatMap(poolCaseMcqProblems);
}

function stripExhibitCaptions<T>(exhibits: T[] | undefined): T[] | undefined {
  if (!exhibits?.length) return exhibits;
  const next: T[] = [];
  for (const exhibit of exhibits) {
    const source = (exhibit || {}) as CaptionedExhibit;
    const cleaned: CaptionedExhibit = {};
    for (const field of CAPTION_FIELDS) {
      const value = source[field];
      if (typeof value === 'string' && findMcqContent(value).length) cleaned[field] = stripMcqContent(value);
    }
    next.push(Object.keys(cleaned).length ? ({ ...source, ...cleaned } as unknown as T) : exhibit);
  }
  // Exhibit objects are shared with Case Drill by reference, so an untouched list keeps its identity.
  return next.some((entry, index) => entry !== exhibits[index]) ? next : exhibits;
}

/**
 * Last line of defence at import: removes MCQ content from every learner-facing
 * field of a Case Pool case and drops any answer_choices. The import audit and
 * the tests still fail when a source needed this, so the source gets repaired.
 */
export function stripPoolCaseMcq<T extends PoolCaseTextLike>(item: T): T {
  const next: PoolCaseTextLike = { ...item };
  (['situation', 'key_question', 'objective'] as const).forEach((field) => {
    const value = item[field];
    if (typeof value === 'string' && findMcqContent(value).length) next[field] = stripMcqContent(value);
  });
  (['constraints', 'approach_tips'] as const).forEach((field) => {
    const list = item[field];
    if (list?.some((entry) => findMcqContent(entry).length)) next[field] = list.map((entry) => stripMcqContent(entry)).filter(Boolean);
  });
  if (item.answer_choices !== undefined) next.answer_choices = undefined;
  if (item.data_exhibits) next.data_exhibits = stripExhibitCaptions(item.data_exhibits);
  if (item.journey_exhibits) next.journey_exhibits = stripExhibitCaptions(item.journey_exhibits);
  return next as T;
}

/* ---------------------------------------------------------------- Case Drill */

const repairedEmbeddedOptions = new Set<string>();

/** Records that a Case Drill question had options typed into its text and was separated at load. */
export function noteEmbeddedOptionRepair(questionId: string | undefined): void {
  if (questionId) repairedEmbeddedOptions.add(questionId);
}

export function embeddedOptionRepairs(): string[] {
  return [...repairedEmbeddedOptions].sort();
}

interface DrillTextLike {
  id: string;
  answerMode?: string;
  options?: string[];
  question?: string;
  businessContext?: string;
  instruction?: string;
  clientObjective?: string;
  workingPrompt?: string;
}

/**
 * Multiple-choice Case Drill questions whose learner-facing text still carries an option list. Options belong only in
 * `options`. Questions that are not multiple choice are not scanned: a lettered list there is case content.
 */
export function drillEmbeddedOptionProblems(questions: DrillTextLike[]): string[] {
  const problems: string[] = [];
  questions.forEach((question) => {
    if (!(question.answerMode === 'choice' || question.answerMode === 'multiple-choice' || question.options?.length)) return;
    (['question', 'businessContext', 'instruction', 'clientObjective', 'workingPrompt'] as const).forEach((field) => {
      findEmbeddedOptions(question[field]).forEach((finding) => problems.push(`${question.id} ${field}: ${finding.rule} (“${finding.excerpt}”) — options belong in the separate options field.`));
    });
  });
  return problems;
}
