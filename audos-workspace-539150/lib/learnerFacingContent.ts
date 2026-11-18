/*
 * Learner-facing content guard shared by Case Drill and Case Pool.
 *
 * Authoring records may annotate MCQ options with a rationale ("…; reverse the
 * ranking"), repeat the task as an objective, or re-print exhibit values as
 * prose. Everything a learner sees before submitting must come through these
 * functions, which split each item into: context, task, answer choices (all of
 * them, unmarked), and post-submission material (key, choice notes, worked
 * answer). Nothing here changes ids, links, numeric checks or the correct
 * choice - only where text is shown.
 */

import { poolCaseGuidance } from './caseGuidance';
import { noteEmbeddedOptionRepair, splitEmbeddedOptions, stripEmbeddedOptionLists } from './casePoolMcqGuard';
import { clarifyUnitLabel, clarifyUnitText, clarifyUnitsDeep } from './unitLabels';

export const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// A note after "; " that names the method error behind a wrong choice.
const CHOICE_ERROR_LABEL = /\b(instead of|reverse the ranking|stop at |as the denominator|conflate|overlook|focus only on|omit the|treats? negative|treats? index points|measures only|uses alpha without|uses the complement|uses the difference|the mean is the|the peak itself is|average the three rates|apply the last rate|are interchangeable)\b/i;

// An inline error explanation after a numeric claim ("38% because the largest slice…").
const INLINE_ERROR_CLAUSE = /\s+\b(because|regardless of|without)\b[^;]*$/i;

// Self-critique appended to a weak issue tree ("…, leaving revenue and mix untested").
const TREE_CRITIQUE = /(?:,\s*|;\s*|\s+)\b(leaving|without|excluding|before|instead of|ignore|defer|skip)\b[^;]*$/i;

const ANSWER_MARKER_LINE = /^\s*(answer key|correct option|correct answer|why \/ scoring)\s*:/i;

export interface ChoiceSplit {
  choices: string[];
  correct: string | null;
  notes: string[];
  changed: boolean;
}

function normalise(text: string): string {
  return String(text || '').toLowerCase().replace(/[^\p{L}\p{N}%.\- ]+/gu, ' ').replace(/\s+/g, ' ').trim();
}

function splitNote(option: string): { head: string; note: string } {
  const index = option.indexOf('; ');
  if (index < 0) return { head: option.trim(), note: '' };
  return { head: option.slice(0, index).trim(), note: option.slice(index + 2).trim() };
}

function stripTreeCritique(option: string): { head: string; note: string } {
  const prefix = option.match(/^(Root:[^→]*→\s*)/)?.[1] || '';
  const body = option.slice(prefix.length).trim();
  let head = body;
  let note = '';
  for (let guard = 0; guard < 3; guard += 1) {
    const match = head.match(TREE_CRITIQUE);
    if (!match || match.index === undefined || match.index === 0) break;
    note = `${head.slice(match.index).replace(/^[,;\s]+/, '').replace(/[.]$/, '')}${note ? `; ${note}` : ''}`;
    head = head.slice(0, match.index).trim();
  }
  head = head.replace(/[,;]\s*$/, '');
  if (head && !/[.!?]$/.test(head)) head = `${head}.`;
  return { head: `${prefix}${head}`, note };
}

interface ChoicePart {
  raw: string;
  head: string;
  note: string;
}

function splitChoiceText(option: string): ChoicePart {
  const { head, note } = splitNote(option);
  if (note && CHOICE_ERROR_LABEL.test(note)) return { raw: option, head, note };
  const inline = head.match(INLINE_ERROR_CLAUSE);
  if (inline && inline.index !== undefined && /\d/.test(head.slice(0, inline.index))) {
    const claim = head.slice(0, inline.index).trim();
    const reason = head.slice(inline.index).trim();
    return { raw: option, head: note ? `${claim}; ${note}` : claim, note: reason };
  }
  return { raw: option, head: option, note: '' };
}

/**
 * Remove rationale that marks an option as right or wrong. Options stay in the
 * same order; an option that becomes identical to another after its rationale
 * is removed is dropped (it was only distinguishable by the giveaway text).
 */
export function splitChoiceRationale(options: string[], correct?: string | null): ChoiceSplit {
  const raw = (options || []).map((option) => String(option ?? '').trim()).filter(Boolean);
  const correctRaw = correct ? String(correct).trim() : '';
  if (raw.length < 2) return { choices: raw, correct: correctRaw || null, notes: [], changed: false };

  const parts: ChoicePart[] = raw.every((option) => /^Root:/.test(option))
    ? raw.map((option) => ({ raw: option, ...stripTreeCritique(option) }))
    : raw.map(splitChoiceText);
  if (!raw[0].startsWith('Root:')) {
    // A note now carried by a single choice (typically the key's lesson) would mark that choice.
    const carriers = parts.filter((part) => part.head.includes('; '));
    if (carriers.length === 1) {
      const split = splitNote(carriers[0].head);
      carriers[0].head = split.head;
      carriers[0].note = [split.note, carriers[0].note].filter(Boolean).join('; ');
    }
  }
  const bare = (text: string) => text.replace(/[.]$/, '');
  if (!parts.some((part) => bare(part.head) !== bare(part.raw))) {
    return { choices: raw, correct: correctRaw || null, notes: [], changed: false };
  }

  const correctIndex = raw.indexOf(correctRaw);
  const order = correctIndex >= 0
    ? [correctIndex, ...raw.map((_, index) => index).filter((index) => index !== correctIndex)]
    : raw.map((_, index) => index);
  const seen = new Set<string>();
  const keep = new Set<number>();
  order.forEach((index) => {
    const key = normalise(parts[index].head);
    if (seen.has(key)) return;
    seen.add(key);
    keep.add(index);
  });

  const choices: string[] = [];
  const notes: string[] = [];
  let mappedCorrect: string | null = correctRaw || null;
  parts.forEach((part, index) => {
    const head = bare(part.head);
    if (!keep.has(index)) {
      notes.push(`Removed duplicate choice "${head}" (only its rationale differed: ${part.note || 'none'}).`);
      return;
    }
    const letter = CHOICE_LETTERS[choices.length];
    choices.push(head);
    if (index === correctIndex) mappedCorrect = head;
    if (part.note) notes.push(`${letter}. ${head} - ${bare(part.note)}.`);
  });
  return { choices, correct: mappedCorrect, notes, changed: true };
}

function choiceNotesText(notes: string[]): string {
  const visible = notes.filter((note) => !note.startsWith('Removed duplicate choice'));
  return visible.length ? `Answer-choice notes:\n${visible.join('\n')}` : '';
}

/* ------------------------------------------------------------------ text */

const EXHIBIT_TRANSCRIPTION = /\n*\s*Exhibit data as printed:[^\n]*(\n(?!\n)[^\n]*)*/gi;

export function stripExhibitTranscription(text: string): string {
  return String(text || '').replace(EXHIBIT_TRANSCRIPTION, '').replace(/\n{3,}/g, '\n\n').trim();
}

function numbersIn(text: string): Set<string> {
  return new Set((String(text || '').match(/\d[\d,]*(?:\.\d+)?/g) || []).map((value) => value.replace(/,/g, '')));
}

/** Drop a "SUPPLIED CASE FACTS" list that only repeats the brief's own figures. */
function dropRepeatedFactList(context: string): string {
  const match = String(context || '').match(/^([\s\S]*?)\n\nSUPPLIED CASE FACTS\n([\s\S]*?)(\n\n[A-Z][A-Z ]{3,}\n[\s\S]*)?$/);
  if (!match) return context;
  const [, prose, facts, rest = ''] = match;
  const proseNumbers = numbersIn(prose);
  const factNumbers = [...numbersIn(facts)];
  if (!factNumbers.length || !factNumbers.every((value) => proseNumbers.has(value))) return context;
  return `${prose.trim()}${rest}`;
}

function sentencesOf(text: string): string[] {
  return String(text || '').replace(/([.?!])\s+/g, '$1\n').split(/\n+/).map((sentence) => sentence.trim()).filter(Boolean);
}

/** Remove sentences from `text` that already appear in any of `others`. */
function withoutRepeatedSentences(text: string, others: string[]): string {
  const known = new Set(others.flatMap(sentencesOf).map(normalise).filter((sentence) => sentence.split(' ').length >= 6));
  if (!known.size) return text;
  return String(text || '')
    .split('\n')
    .map((line) => sentencesOf(line).filter((sentence) => !known.has(normalise(sentence))).join(' '))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function contains(haystack: string, needle: string): boolean {
  const a = normalise(haystack);
  const b = normalise(needle);
  return Boolean(b) && a.includes(b);
}

/* ------------------------------------------------------------------ units */

function clarifyExhibitUnits<T>(exhibit: T): T {
  const next = clarifyUnitsDeep(exhibit);
  const datasetId = (exhibit as { datasetId?: unknown } | null)?.datasetId;
  return next !== exhibit && datasetId !== undefined ? { ...next, datasetId } as T : next;
}

const QUESTION_UNIT_TEXT_FIELDS = ['question', 'businessContext', 'instruction', 'clientObjective', 'workingPrompt', 'explanation', 'correctAnswer'] as const;

// Runs before any option splitting so every option and the key are rewritten the same way and still match.
function withClearQuestionUnits<T extends QuestionLike>(question: T): T {
  const next: QuestionLike = { ...question };
  QUESTION_UNIT_TEXT_FIELDS.forEach((field) => {
    if (typeof question[field] === 'string') next[field] = clarifyUnitText(question[field]);
  });
  if (question.options) next.options = question.options.map((option) => clarifyUnitText(option));
  if (typeof question.answerUnit === 'string') next.answerUnit = clarifyUnitLabel(question.answerUnit);
  if (question.exhibits) next.exhibits = question.exhibits.map(clarifyExhibitUnits);
  if (question.exhibit) next.exhibit = clarifyExhibitUnits(question.exhibit);
  return next as T;
}

function withClearPoolUnits<T extends PoolCaseLike>(item: T): T {
  const next: PoolCaseLike = { ...item, situation: clarifyUnitText(item.situation), key_question: clarifyUnitText(item.key_question) };
  if (typeof item.objective === 'string') next.objective = clarifyUnitText(item.objective);
  if (item.constraints) next.constraints = item.constraints.map((constraint) => clarifyUnitText(constraint));
  if (item.data_exhibits) next.data_exhibits = item.data_exhibits.map(clarifyExhibitUnits);
  if (item.journey_exhibits) next.journey_exhibits = item.journey_exhibits.map(clarifyExhibitUnits);
  if (item.model_answer) next.model_answer = clarifyUnitsDeep(item.model_answer);
  return next as T;
}

/* --------------------------------------------------------------- Case Drill */

interface QuestionLike {
  id?: string;
  skill?: string;
  workingPrompt?: string;
  answerMode?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  question?: string;
  instruction?: string;
  businessContext?: string;
  clientObjective?: string;
  answerUnit?: string;
  exhibits?: unknown[];
  exhibit?: unknown;
}

const MARKET_SIZING_WORKING_PROMPT = 'Issue tree (not graded) \u2192 Components \u2192 bottom-up model \u2192 calculated result.';

export function toLearnerFacingQuestion<T extends QuestionLike>(source: T): T {
  const question = withClearQuestionUnits(source);
  const next: QuestionLike = { ...question };
  const isChoice = question.answerMode === 'choice' || question.answerMode === 'multiple-choice';
  // Options live only in the separate `options` field. A list typed into the question text is moved there
  // (or dropped when `options` already holds it) so it is never shown twice or appended to the stem.
  if (isChoice || question.options?.length) {
    const embedded = splitEmbeddedOptions(question.question);
    if (embedded.options.length >= 2) {
      next.question = embedded.stem;
      if (!question.options?.length) next.options = embedded.options;
      noteEmbeddedOptionRepair(question.id);
    }
    (['question', 'businessContext', 'instruction', 'clientObjective', 'workingPrompt'] as const).forEach((field) => {
      const value = next[field];
      if (typeof value === 'string' && value) {
        const cleaned = stripEmbeddedOptionLists(value);
        if (cleaned !== value) {
          next[field] = cleaned;
          noteEmbeddedOptionRepair(question.id);
        }
      }
    });
  }
  if (isChoice && question.options?.length) {
    const split = splitChoiceRationale(question.options, question.correctAnswer);
    if (split.changed) {
      next.options = split.choices;
      if (split.correct) next.correctAnswer = split.correct;
      const notes = choiceNotesText(split.notes);
      if (notes) next.explanation = [question.explanation, notes].filter(Boolean).join('\n\n');
    }
  }
  if (question.instruction && question.question && normalise(question.instruction) === normalise(question.question)) {
    next.instruction = undefined;
  }
  // A sizing placeholder must describe the workflow, never the model decomposition.
  if (question.skill === 'market-sizing' && question.workingPrompt) {
    next.workingPrompt = MARKET_SIZING_WORKING_PROMPT;
  }
  if (question.businessContext) {
    const hasExhibit = Boolean(question.exhibits?.length || question.exhibit);
    let context = dropRepeatedFactList(next.businessContext || question.businessContext);
    if (hasExhibit) context = stripExhibitTranscription(context);
    next.businessContext = context;
  }
  return next as T;
}

/* ---------------------------------------------------------------- Case Pool */

// Case Pool is open-ended. It never carries answer choices: not in the task, the description, the objective,
// a constraint, a tip, an exhibit caption or a separate field. Options exist only in Case Drill.

interface PoolCaseLike {
  situation: string;
  objective?: string;
  key_question: string;
  answer_choices?: string[];
  constraints?: string[];
  data_exhibits?: unknown[];
  journey_exhibits?: unknown[];
  model_answer?: Record<string, any>;
  framework_hints?: string[];
  approach_tips?: string[];
  journey_id?: string;
}

const LETTERED_LINE = /^\s*([A-F])[.)]\s+(.+)$/;

export function splitTaskChoices(text: string): { task: string; choices: string[] } {
  const lines = String(text || '').split('\n');
  const choices: string[] = [];
  const rest: string[] = [];
  lines.forEach((line) => {
    const match = line.match(LETTERED_LINE);
    if (match) choices.push(match[2].trim());
    else rest.push(line);
  });
  if (choices.length < 2) return { task: String(text || '').trim(), choices: [] };
  return { task: rest.join('\n').replace(/\n*\s*Answer choices:\s*$/i, '').trim(), choices };
}

/** "Generic instruction. Source task: <specific task>" -> specific task first, said once. */
function leadWithSpecificTask(task: string): string {
  const match = task.match(/^([\s\S]*?)\s*(?:Original calculation task|Source task):\s*([\s\S]+)$/i);
  if (!match) return task;
  const generic = match[1].trim().replace(/\bthe (?:source|stated) task\b/gi, 'this task');
  const specific = match[2].trim();
  return generic ? `${specific}\n\n${generic}` : specific;
}

export function toLearnerFacingPoolCase<T extends PoolCaseLike>(source: T): T {
  const item = withClearPoolUnits(source);
  const next: PoolCaseLike = { ...item };
  const hasExhibits = Boolean(item.journey_exhibits?.length || item.data_exhibits?.length);
  // A lettered option list typed into the task is dropped here; the import audit still reports the source.
  const { task: rawTask } = splitTaskChoices(item.key_question);
  let task = leadWithSpecificTask(rawTask);
  next.answer_choices = undefined;

  let situation = hasExhibits ? stripExhibitTranscription(item.situation) : String(item.situation || '').trim();
  situation = withoutRepeatedSentences(situation, [task]) || situation;
  next.situation = situation;

  const objective = String(item.objective || '').trim();
  if (objective && (contains(task, objective) || contains(situation, objective) || contains(objective, task))) {
    if (contains(objective, task) && !contains(task, objective)) task = objective;
    next.objective = '';
  } else if (objective) {
    next.objective = withoutRepeatedSentences(objective, [task, situation]);
  }
  next.key_question = task;

  const guidance = poolCaseGuidance(item);
  next.framework_hints = guidance.frameworks.map((hint) => clarifyUnitText(hint));
  next.approach_tips = guidance.approach.map((tip) => clarifyUnitText(tip));
  return next as T;
}

/** The task text a Case Pool attempt stores and the grader reads: the open task only. */
export function libraryCaseTaskText(item: Pick<PoolCaseLike, 'key_question'>): string {
  return item.key_question;
}

/* ------------------------------------------------------------ stored prompt */

/**
 * Guard for prompts already saved on attempt rows (Case Room, retry, chat):
 * removes exhibit transcription, answer-key lines and any option list while
 * keeping every fact.
 */
export function learnerFacingStoredPrompt(prompt: string): string {
  const text = stripExhibitTranscription(String(prompt || ''));
  const lines = text.split('\n').filter((line) => !ANSWER_MARKER_LINE.test(line));
  // Attempts saved before Case Pool became open-ended stored the task followed by its options; the options are never shown again.
  return stripEmbeddedOptionLists(lines.join('\n')).trim();
}
