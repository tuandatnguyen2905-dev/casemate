/**
 * Learner-facing presentation of stored case content (display only).
 *
 * Stored questions and cases are never rewritten here: answer keys are synced
 * by content hash and graders read the stored fields, so every function below
 * only decides WHERE a stored sentence is shown and drops a sentence that is
 * already visible elsewhere on the same screen.
 *
 * - Case Context keeps the business situation and the decision/problem.
 * - Exhibit-reading sentences (what a chart shows, units, column definitions,
 *   data caveats) move next to the exhibits.
 * - Glossary sentences become key terms; skill labels leave the task.
 * - The full task is shown once; tree builders get a concise root question.
 */

export interface PresentedQuestion {
  /** Business situation and decision, using only stored sentences. */
  context: string;
  keyTerms: string[];
  /** Shown beside the exhibits: how to read them, units, data caveats. */
  exhibitGuide: string[];
  /** Task-level guidance shown with the question (never a second question). */
  guidance: string[];
  /** A generic answer-format prompt split off the task; views with a four-part answer area omit it. */
  answerFormat: string[];
  instruction: string;
  /** The full task, shown once. */
  task: string;
  skillLabels: string[];
  /** Concise starting node for issue-tree builders. */
  rootQuestion: string;
}

export interface QuestionContentSource {
  businessContext?: string | null;
  instruction?: string | null;
  question?: string | null;
  /** An authored root (for example the Easy bank's suggested tree root). */
  authoredRoot?: string | null;
}

export interface PoolCaseContentSource {
  situation?: string | null;
  objective?: string | null;
  constraints?: string[] | null;
  key_question?: string | null;
  approach_tips?: string[] | null;
}

export interface PresentedPoolCase {
  situation: string;
  skillLabels: string[];
  answerFormat: string[];
  keyTerms: string[];
  exhibitGuide: string[];
  guidance: string[];
  objective: string;
  constraints: string[];
  keyQuestion: string;
  approachTips: string[];
  rootQuestion: string;
}

type SentenceRole = 'situation' | 'key-term' | 'exhibit-guide' | 'guidance' | 'skill-label';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'have', 'in', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their', 'this', 'to', 'was', 'were', 'which', 'with', 'what', 'your', 'you',
]);

const EXHIBIT_NOUN = '(?:exhibit|exhibits|chart|charts|table|tables|graph|graphs|data table|bar chart|line chart|slope ?graph|slopegraph|funnel|heatmap|heat map|waterfall|bridge|bubble chart|scatter plot|scatter|matrix|figure|figures shown)';
/** A sentence or clause whose subject is the exhibit itself: "the exhibit gives …", "Exhibit 2 plots …", "In the exhibits, …". */
const EXHIBIT_REFERENCE = new RegExp(`(?:^|[;(]\\s*|,\\s+and\\s+)(?:(?:the|this|these|each|both|all|every)\\s+)?(?:\\w+\\s+)?${EXHIBIT_NOUN}(?:\\s+\\d)?\\s+(?:gives?|shows?|plots?|compares?|lists?|counts?|tracks?|reports?|places?|decomposes?|splits?|covers?|uses?|is|are|does|do|has|have)\\b|^(?:in|on)\\s+the\\s+${EXHIBIT_NOUN},|(?:^|[;(]\\s*|,\\s+and\\s+)(?:each|every)\\s+(?:slice|bar|line|bubble|column|point|dot|cell|row|stage|ring|step)\\s+(?:shows?|is|counts?|gives?|represents?|joins?|tracks?|sits?)\\b`, 'i');
const UNIT_STATEMENT = /^(?:all\s+)?(?:figures|values|numbers|amounts|costs?|revenues?|volumes?|prices?|sales|spend|data|money|monetary values|currency|shares?)\b[^.;]{0,90}\b(?:are|is)\s+(?:in|shown in|expressed in|measured in|given in|stated in|reported in)\b/i;
const VALUES_ARE = /^(?:values|figures|numbers)\s+are\b/i;
const COLUMN_DEFINITION = /^[A-Z][^.;()]{0,50}\((?:%|pp|[^)]{0,20}(?:VND|USD)[^)]{0,12})\)\s+(?:is|are|means)\s+the\s+(?:share|percentage|number|ratio|measure|count|amount|value)\s+of\b/;
const READING_START = /^(?:read|look at|look for|compare the (?:bars|lines|columns|slopes)|each (?:line|bar|bubble|column|row|stage|segment|point|cell|dot))\b/i;
const KEY_TERM_START = /^(?:plain-language terms?|key terms?|terms used|glossary|definitions?|in plain language)\s*:/i;
const FOR_REFERENCE = /^for reference,/i;
const SKILL_LABEL = /^(?:primary consulting skill|primary skill|skill focus|skill tested|learning objective|drill type)\s*:/i;
const META_CASE = /\bis an? (?:easy|medium|hard|expert) (?:case|drill|question) that (?:requires|tests|asks)\b/i;
const STRUCTURE_GUIDANCE = /\b(?:needs|wants|requires) a (?:testable|clear|structured|mece|focused) (?:decision )?(?:structure|tree|framework|issue tree)\b/i;
const DECISION_CUE = /\b(?:is considering|are considering|is deciding|must decide|needs to decide|is evaluating|are evaluating|is weighing|wants to|wants at least|must choose|must commit|is choosing|faces this case|whether to)\b/i;
const TASK_VERB = /\b(?:state|recommend|answer|explain|identify|write|calculate|estimate|decide|choose|build|list|justify|propose)\b/i;
const IMPERATIVE_START = /^(?:estimate|calculate|compute|build|use|show|state|explain|identify|recommend|compare|write|develop|give|allocate|define|assume|list|propose|prioriti[sz]e|decide|determine|work out|outline|design|draft|choose|rank|separate|structure|break|size|reconcile|assess|evaluate|analy[sz]e|answer|name|describe|set out|take|cite|cover|keep|start|check|find|apply|treat|create|generate|suggest|plan|map|test)\b/i;
const QUESTION_WORD = /^(?:what|which|how|why|where|when|who|whom|whose|should|would|could|can|is|are|does|do|did|will|has|have)\b/i;
const META_ROOT = /^(?:which|what)\s+(?:[\w-]+\s+){0,2}(?:issue[- ]tree|structure|decomposition|framework|tree|breakdown)\b|^how would you (?:structure|break down|decompose)\b|\bstrongest starting point\b|\bmost (?:complete|decision-useful)\b/i;
/** The generic four-part answer prompt appended to restored questions; the answer area already asks for these parts. */
const ANSWER_FORMAT_PROMPT = /^what is the key observation, what insight does it reveal, why does it matter, and what should management do next\?$/i;

export function normalizeForCompare(text: string): string {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9%.'\s]+/g, ' ')
    .replace(/\.(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function contentTokens(text: string): string[] {
  return normalizeForCompare(text).split(' ').filter((word) => word && !STOP_WORDS.has(word));
}

/** True when `candidate` says nothing that `shown` does not already say. */
export function isCoveredBy(candidate: string, shown: string, threshold = 0.9): boolean {
  const a = normalizeForCompare(candidate);
  const b = normalizeForCompare(shown);
  if (!a) return true;
  if (!b) return false;
  if (b.includes(a)) return true;
  const tokens = contentTokens(candidate);
  if (tokens.length < 5) return false;
  const pool = new Set(contentTokens(shown));
  const covered = tokens.filter((word) => pool.has(word)).length;
  return covered / tokens.length >= threshold;
}

const ABBREVIATIONS = /(?:\b(?:e\.g|i\.e|vs|etc|approx|incl|Mr|Ms|Dr|No|Co|Inc|Ltd|St|Jr|Sr|U\.S))\.$/i;

/** Splits prose into sentences without breaking decimals, abbreviations or list lines. */
export function splitSentences(text: string): string[] {
  const out: string[] = [];
  String(text || '').split(/\n+/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    let start = 0;
    const pattern = /([.?!])(["”’)]?)\s+(?=["“(]?[A-Z0-9À-Ỹ])/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(trimmed))) {
      const end = match.index + match[1].length + match[2].length;
      const piece = trimmed.slice(start, end).trim();
      if (ABBREVIATIONS.test(piece)) continue;
      if (piece) out.push(piece);
      start = end;
    }
    const rest = trimmed.slice(start).trim();
    if (rest) out.push(rest);
  });
  return out;
}

function joinSentences(sentences: string[]): string {
  return sentences.join(' ').replace(/[ \t]+/g, ' ').trim();
}

interface Line { sentences: string[] }

function splitLines(text: string): Line[] {
  return String(text || '').split(/\n/).map((line) => ({ sentences: splitSentences(line) }));
}

/** Rebuilds text from kept sentences, keeping the author's line breaks and list lines. */
function joinLines(lines: Line[]): string {
  return lines
    .map((line) => joinSentences(line.sentences))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** A "Plain-language terms:" paragraph is a glossary as a whole, however many definitions it holds. */
function isGlossaryLine(line: Line): boolean {
  return line.sentences.length > 0 && KEY_TERM_START.test(line.sentences[0]);
}

function classifyContextSentence(sentence: string): SentenceRole {
  if (KEY_TERM_START.test(sentence) || FOR_REFERENCE.test(sentence)) return 'key-term';
  if (SKILL_LABEL.test(sentence) || META_CASE.test(sentence)) return 'skill-label';
  if (STRUCTURE_GUIDANCE.test(sentence)) return 'guidance';
  if (EXHIBIT_REFERENCE.test(sentence) || UNIT_STATEMENT.test(sentence) || VALUES_ARE.test(sentence) || COLUMN_DEFINITION.test(sentence) || READING_START.test(sentence)) return 'exhibit-guide';
  return 'situation';
}

function skillLabelText(sentence: string): string {
  const meta = sentence.match(/requires the candidate to (.+?)\.?$/i);
  if (meta) return capitalise(meta[1]);
  return sentence.replace(SKILL_LABEL, '').trim();
}

function keyTermText(sentence: string): string {
  return capitalise(sentence.replace(KEY_TERM_START, '').replace(FOR_REFERENCE, '').trim());
}

function capitalise(value: string): string {
  const text = value.trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function isQuestionSentence(sentence: string): boolean {
  return /\?["”’)]?$/.test(sentence.trim());
}

/**
 * "Lotus Mart, a grocery retailer, faces this case: The client wants X." reads
 * as two facts. Only the connective wording changes; every fact is kept.
 */
function situationFromQuestion(sentence: string): string {
  const framed = sentence.match(/^(.+?),\s+(an?\s+[^,]+?),\s+faces this case:\s*(.+)$/i);
  if (framed) {
    const subject = framed[1].trim();
    const descriptor = framed[2].trim();
    const fact = capitalise(framed[3].trim());
    return `${subject} is ${descriptor.replace(/^an?\s+/i, (article) => article.toLowerCase())}. ${/[.!?]$/.test(fact) ? fact : `${fact}.`}`;
  }
  return sentence;
}

/** "X operates in Y." adds nothing once the question names X as a Y organisation. */
function isRestatedOperatesSentence(sentence: string, shown: string): boolean {
  const match = sentence.match(/^(.+?) operates in (.+?)\.?$/i);
  if (!match) return false;
  const text = normalizeForCompare(shown);
  return text.includes(normalizeForCompare(match[1])) && text.includes(normalizeForCompare(match[2]));
}

interface SplitQuestion {
  situation: string[];
  keyTerms: string[];
  exhibitGuide: string[];
  answerFormat: string[];
  task: string;
}

const HEADING_LINE = /^[A-Z][A-Z0-9 &/:-]{2,}$/;
const TEMPLATED_SITUATION = /,\s+an?\s+[^,]+,\s+faces\b|\bfaces this case:/i;
const NAMED_SUBJECT_STATEMENT = /^(?:the\s+)?[A-Z][\w&'’.-]*(?:\s+[A-Z][\w&'’.-]*){0,4}\s+(?:is|are|has|have|had|was|were|faces|wants|needs|operates|sells|runs|plans|expects|reports|reported|launched|saw|sees|lost|gained|grew|fell|rose|declined|considers|decided|must|will|can|serves|makes|owns)\b/;

/** Only clear business statements move from the question into Case Context; anything else stays in the task. */
function isSituationStatement(sentence: string): boolean {
  if (HEADING_LINE.test(sentence) || IMPERATIVE_START.test(sentence) || /\byou\b/i.test(sentence)) return false;
  return TEMPLATED_SITUATION.test(sentence) || NAMED_SUBJECT_STATEMENT.test(sentence);
}

function splitQuestion(question: string): SplitQuestion {
  const lines = splitLines(question);
  const sentences = lines.flatMap((line) => line.sentences);
  const firstAskIndex = sentences.findIndex((sentence) => isQuestionSentence(sentence) || IMPERATIVE_START.test(sentence));
  const result: SplitQuestion = { situation: [], keyTerms: [], exhibitGuide: [], answerFormat: [], task: '' };
  let index = -1;
  const taskLines = lines.map((line) => ({
    sentences: line.sentences.filter((sentence) => {
      index += 1;
      if (ANSWER_FORMAT_PROMPT.test(sentence) && index > 0) {
        result.answerFormat.push(sentence);
        return false;
      }
      if (KEY_TERM_START.test(sentence) || FOR_REFERENCE.test(sentence)) {
        result.keyTerms.push(keyTermText(sentence));
        return false;
      }
      const beforeAsk = firstAskIndex === -1 ? index < sentences.length - 1 : index < firstAskIndex;
      if (beforeAsk && isSituationStatement(sentence)) {
        result.situation.push(situationFromQuestion(sentence));
        return false;
      }
      return true;
    }),
  }));
  result.task = joinLines(taskLines);
  if (!result.task && result.situation.length) result.task = result.situation.pop() as string;
  return result;
}

function pushDistinct(target: string[], value: string, shown: string[]): void {
  const text = value.trim();
  if (!text) return;
  if ([...shown, ...target].some((prior) => isCoveredBy(text, prior))) return;
  target.push(text);
}

/** Drops sentences of `text` that an earlier block already shows. */
export function withoutRepeatedSentences(text: string, shown: string[]): string {
  const kept: string[] = [];
  const lines = splitLines(text).map((line) => ({
    sentences: line.sentences.filter((sentence) => {
      if ([...shown, ...kept].some((prior) => isCoveredBy(sentence, prior))) return false;
      kept.push(sentence);
      return true;
    }),
  }));
  return joinLines(lines);
}

/** First ask of a multi-part question, e.g. "Should X fund A or B, what decides it, and …?" → "Should X fund A or B?" */
function firstAsk(sentence: string): string {
  const text = sentence.trim().replace(/\s+/g, ' ');
  const cut = text.search(/,\s+(?:and\s+|or\s+)?(?:what|which|how|why|where|when|who|whether|and what|and which|and how)\b/i);
  const head = cut > 0 ? text.slice(0, cut) : text.replace(/\?["”’)]?$/, '');
  return `${head.replace(/[,;:\s]+$/, '')}?`;
}

/**
 * The node an issue tree starts from. An authored root wins; otherwise the
 * first business question of the task, cut to its first ask; otherwise the
 * problem statement itself. Never the whole multi-sentence prompt.
 */
export function conciseRootQuestion(task: string, situation: string[] = [], authoredRoot?: string | null): string {
  if (authoredRoot && authoredRoot.trim()) return authoredRoot.trim();
  const sentences = splitSentences(task).filter((sentence) => !HEADING_LINE.test(sentence));
  const ask = sentences.find((sentence) => isQuestionSentence(sentence) && QUESTION_WORD.test(sentence));
  if (ask) {
    const root = firstAsk(ask);
    if (!META_ROOT.test(root) || !situation.length) return root;
  }
  const imperative = sentences.find((sentence) => /^(?:estimate|size|calculate)\b/i.test(sentence));
  if (imperative) return imperative.trim().replace(/(?:,\s*|\s+)(?:and\s+|then\s+)?(?:state|show|explain|give|report|justify)\b.*$/i, '.').replace(/\.\.$/, '.');
  const facts = situation.flatMap((part) => splitSentences(part));
  const decision = facts.find((sentence) => DECISION_CUE.test(sentence));
  const problem = decision || facts.find((sentence) => !/ operates in /i.test(sentence) && !HEADING_LINE.test(sentence) && !/^(?:do not|don't|exclude|include|use only)\b/i.test(sentence));
  if (problem) {
    const faces = problem.match(/^(.+?),\s+an?\s+[^,]+?,\s+faces\s+(.+?)\.?$/i);
    if (faces) return `How should ${faces[1].trim()} respond to ${faces[2].trim().replace(/^this case:\s*/i, '')}?`;
    return problem.trim();
  }
  return sentences.length === 1 ? sentences[0].trim() : (ask ? firstAsk(ask) : sentences[0]?.trim() || '');
}

/** Learner-facing layout of a Case Drill library question. */
export function presentLibraryQuestion(source: QuestionContentSource, options: { hasExhibits?: boolean } = {}): PresentedQuestion {
  const hasExhibits = options.hasExhibits !== false;
  const keyTerms: string[] = [];
  const exhibitGuide: string[] = [];
  const guidance: string[] = [];
  const skillLabels: string[] = [];
  const split = splitQuestion(String(source.question || ''));
  const taskText = split.task;

  const questionSituation = split.situation;
  const contextLines = splitLines(String(source.businessContext || '')).map((line) => ({
    sentences: isGlossaryLine(line) ? (keyTerms.push(...line.sentences.map(keyTermText)), []) : line.sentences.filter((sentence) => {
      const role = classifyContextSentence(sentence);
      if (role === 'key-term') { keyTerms.push(keyTermText(sentence)); return false; }
      if (role === 'skill-label') { skillLabels.push(skillLabelText(sentence)); return false; }
      if (role === 'exhibit-guide' && hasExhibits) { exhibitGuide.push(sentence); return false; }
      if (role === 'guidance') { guidance.push(sentence); return false; }
      if (isRestatedOperatesSentence(sentence, joinSentences(questionSituation))) return false;
      return true;
    }),
  }));
  const situation: string[] = [];
  const contextText = withoutRepeatedSentences(joinLines(contextLines), []);
  if (contextText) situation.push(contextText);
  questionSituation.forEach((sentence) => pushDistinct(situation, sentence, []));
  split.keyTerms.forEach((term) => pushDistinct(keyTerms, term, situation));
  split.exhibitGuide.forEach((line) => pushDistinct(exhibitGuide, line, situation));

  const context = situation.join(contextText.includes('\n') ? '\n' : ' ').trim();
  const instructionLines = splitLines(String(source.instruction || ''));
  let movingReadingTip = false;
  instructionLines.forEach((line) => {
    line.sentences = line.sentences.filter((sentence) => {
      const readingTip = hasExhibits && READING_START.test(sentence) && !TASK_VERB.test(sentence);
      const continuation = movingReadingTip && !IMPERATIVE_START.test(sentence) && !isQuestionSentence(sentence) && !TASK_VERB.test(sentence);
      movingReadingTip = readingTip || continuation;
      if (movingReadingTip) { pushDistinct(exhibitGuide, sentence, [context]); return false; }
      return true;
    });
  });
  const shownBeforeTask = [context, ...keyTerms, ...exhibitGuide, ...guidance];
  const instruction = withoutRepeatedSentences(joinLines(instructionLines), [...shownBeforeTask, taskText]);
  const task = withoutRepeatedSentences(taskText, [...shownBeforeTask, instruction]) || taskText;

  return {
    context,
    keyTerms,
    exhibitGuide,
    guidance,
    answerFormat: split.answerFormat,
    instruction,
    task,
    skillLabels,
    rootQuestion: conciseRootQuestion(task, situation, source.authoredRoot),
  };
}

const READING_TIP = /\b(?:read|reading)\b[^.]*\b(?:from|off|in) the (?:data table|chart|exhibit|table|axis)\b|^each (?:line|bar|bubble|column|stage|segment|point|cell|dot)\b|\bvalues are (?:percentages|counts|indexed|in)\b/i;

/** Learner-facing layout of a Case Pool library case. */
export function presentPoolCase(source: PoolCaseContentSource, authoredRoot?: string | null, options: { hasExhibits?: boolean } = {}): PresentedPoolCase {
  const hasExhibits = options.hasExhibits !== false;
  const keyTerms: string[] = [];
  const exhibitGuide: string[] = [];
  const guidance: string[] = [];
  const skillLabels: string[] = [];
  const split = splitQuestion(String(source.key_question || ''));
  const situationLines = splitLines(String(source.situation || '')).map((line) => ({
    sentences: isGlossaryLine(line) ? (keyTerms.push(...line.sentences.map(keyTermText)), []) : line.sentences.filter((sentence) => {
      const role = classifyContextSentence(sentence);
      if (role === 'key-term') { keyTerms.push(keyTermText(sentence)); return false; }
      if (role === 'exhibit-guide' && hasExhibits) { exhibitGuide.push(sentence); return false; }
      if (role === 'guidance') { guidance.push(sentence); return false; }
      if (role === 'skill-label') { skillLabels.push(skillLabelText(sentence)); return false; }
      if (isRestatedOperatesSentence(sentence, joinSentences(split.situation))) return false;
      return true;
    }),
  }));
  const situation: string[] = [];
  const baseSituation = withoutRepeatedSentences(joinLines(situationLines), []);
  if (baseSituation) situation.push(baseSituation);
  split.situation.forEach((sentence) => pushDistinct(situation, sentence, []));
  split.keyTerms.forEach((term) => pushDistinct(keyTerms, term, situation));

  const situationText = situation.join(baseSituation.includes('\n') ? '\n' : ' ').trim();
  const keyQuestion = withoutRepeatedSentences(split.task, [situationText, ...keyTerms]) || split.task;
  const objective = withoutRepeatedSentences(String(source.objective || ''), [situationText, keyQuestion]);

  const taskSentences = splitSentences(keyQuestion);
  const constraints: string[] = [];
  (source.constraints || []).forEach((constraint) => {
    const text = String(constraint || '').trim();
    if (!text) return;
    if (taskSentences.some((sentence) => isCoveredBy(text, sentence, 0.75))) return;
    pushDistinct(constraints, text, [situationText, objective]);
  });

  const approachTips: string[] = [];
  (source.approach_tips || []).forEach((tip) => {
    const text = String(tip || '').trim();
    if (!text) return;
    if (hasExhibits && READING_TIP.test(text)) {
      pushDistinct(exhibitGuide, text, []);
      return;
    }
    pushDistinct(approachTips, text, [situationText, keyQuestion, objective, ...constraints]);
  });

  return {
    situation: situationText,
    skillLabels,
    answerFormat: split.answerFormat,
    keyTerms,
    exhibitGuide,
    guidance: guidance.filter((line) => ![...constraints, keyQuestion].some((shown) => isCoveredBy(line, shown, 0.75))),
    objective,
    constraints,
    keyQuestion,
    approachTips,
    rootQuestion: conciseRootQuestion(keyQuestion, situation, authoredRoot),
  };
}

export interface SharedExhibitNote {
  label: 'Note' | 'Source';
  text: string;
  exhibitNumbers: number[];
}

/**
 * A footnote or source sentence repeated under several exhibits is printed
 * once below the exhibit grid instead, naming the exhibits it covers.
 */
export function shareRepeatedExhibitNotes<T extends { footnote?: string; sourceNote?: string }>(exhibits: T[]): { exhibits: T[]; shared: SharedExhibitNote[] } {
  if (exhibits.length < 2) return { exhibits, shared: [] };
  const shared: SharedExhibitNote[] = [];
  const split = (key: 'footnote' | 'sourceNote', label: SharedExhibitNote['label']) => {
    const perExhibit = exhibits.map((exhibit) => splitSentences(String(exhibit[key] || '')));
    const owners = new Map<string, number[]>();
    perExhibit.forEach((sentences, index) => sentences.forEach((sentence) => {
      const list = owners.get(sentence) || [];
      if (!list.includes(index)) owners.set(sentence, [...list, index]);
    }));
    const repeated = new Set([...owners].filter(([, indexes]) => indexes.length > 1).map(([sentence]) => sentence));
    const groups = new Map<string, string[]>();
    repeated.forEach((sentence) => {
      const numbers = (owners.get(sentence) || []).map((index) => index + 1).join(',');
      groups.set(numbers, [...(groups.get(numbers) || []), sentence]);
    });
    groups.forEach((sentences, numbers) => shared.push({ label, text: sentences.join(' '), exhibitNumbers: numbers.split(',').map(Number) }));
    return perExhibit.map((sentences) => sentences.filter((sentence) => !repeated.has(sentence)).join(' ') || undefined);
  };
  const notes = split('footnote', 'Note');
  const sources = split('sourceNote', 'Source');
  if (!shared.length) return { exhibits, shared };
  return {
    exhibits: exhibits.map((exhibit, index) => ({ ...exhibit, footnote: exhibit.footnote ? notes[index] : exhibit.footnote, sourceNote: exhibit.sourceNote ? sources[index] : exhibit.sourceNote })),
    shared,
  };
}

export function exhibitNumberList(numbers: number[]): string {
  if (numbers.length <= 1) return `Exhibit ${numbers[0] ?? ''}`.trim();
  const contiguous = numbers.every((value, index) => index === 0 || value === numbers[index - 1] + 1);
  if (contiguous) return `Exhibits ${numbers[0]}–${numbers[numbers.length - 1]}`;
  return `Exhibits ${numbers.slice(0, -1).join(', ')} and ${numbers[numbers.length - 1]}`;
}

/** Label/value lines that only restate an exhibit's own data points. */
export function restatesExhibitData(lines: string, points: Array<{ label: string; value: number | string }>): boolean {
  const rows = String(lines || '').split('\n').map((line) => line.replace(/^\s*[-•*]\s*/, '').trim()).filter(Boolean);
  if (!rows.length || !points.length) return false;
  const known = new Set(points.map((point) => `${normalizeForCompare(point.label)}|${String(point.value).replace(/,/g, '')}`));
  return rows.every((row) => {
    const match = row.match(/^(.+?)\s*[:=]\s*([-+]?[\d.,]+)\s*(?:%|[A-Za-z ]{0,20})?$/);
    if (!match) return false;
    return known.has(`${normalizeForCompare(match[1])}|${match[2].replace(/,/g, '')}`);
  });
}
