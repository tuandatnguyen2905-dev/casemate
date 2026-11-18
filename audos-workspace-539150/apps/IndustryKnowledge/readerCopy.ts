// Learner-facing wording repairs for chapter text that generated curricula build from chapter titles.
// Builders lower-case the whole title into a sentence ("Explain what is consumer finance? and apply it…"),
// which breaks question titles and lower-cases acronyms and place names. These helpers only touch the
// span that equals the lower-cased title; every other character of the authored text is kept.

const KEEP_CASE = new Set(['vietnam', 'vietnamese', 'asean', 'asia', 'asia-pacific', 'southeast', 'europe', 'european', 'china', 'chinese', 'japan', 'korea', 'india', 'us', 'u.s.', 'uk', 'eu']);
const VERB_AFTER_AND = /^(apply|translate|use|compare|connect|link|test|turn|evaluate|assess|explain|describe|identify|recognise|recognize|interpret|judge|weigh|map|measure)\b/i;

const stripNumber = (title: string) => String(title ?? '').replace(/^\s*\d{1,2}(?:\.\d{1,2})*\.?\s+(?=\S)/, '').trim();

function wordCase(original: string): string {
  const bare = original.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
  if (/[A-Z].*[A-Z]/.test(bare) || /\d/.test(bare) && /[A-Z]/.test(bare)) return original;
  if (KEEP_CASE.has(bare.toLowerCase()) || /^Vietnam/i.test(bare)) return original.replace(bare, bare.charAt(0).toUpperCase() + bare.slice(1).toLowerCase());
  return original.toLowerCase();
}

/** The title as it should read inside a sentence: lower case except acronyms and place names. */
export function inlineTitle(title: string): string {
  return stripNumber(title).split(/(\s+)/).map((part) => (/\s/.test(part) ? part : wordCase(part))).join('');
}

/** A question title quoted in sentence case, e.g. “What is consumer finance?”. */
export function quotedQuestion(title: string): string {
  const inline = inlineTitle(title);
  return `\u201C${inline.charAt(0).toUpperCase()}${inline.slice(1)}\u201D`;
}

const isQuestion = (title: string) => /\?\s*$/.test(stripNumber(title));

function findTitleSpan(text: string, title: string): { start: number; end: number } | null {
  const lowered = stripNumber(title).toLowerCase();
  if (lowered.length < 4) return null;
  const start = text.indexOf(lowered);
  if (start < 0) return null;
  return { start, end: start + lowered.length };
}

/**
 * "Explain what is consumer finance? and apply it to …" → "Answer “What is consumer finance?” and apply it to …".
 * "Explain vietnam retail market outlook and …" → "Explain Vietnam retail market outlook and …".
 * Text that does not contain the lower-cased title is returned unchanged.
 */
export function readableObjective(objective: string | undefined, title: string | undefined): string {
  const text = String(objective ?? '');
  if (!text || !title) return text;
  const span = findTitleSpan(text, title);
  if (!span) return text;
  const before = text.slice(0, span.start);
  const after = text.slice(span.end);
  if (!isQuestion(title)) return `${before}${inlineTitle(title)}${after}`;
  const verb = /^\s*(Explain|Understand|Assess|Evaluate|Define|Describe|Analyse|Analyze|Examine|Learn)\s+$/i.exec(before);
  if (!verb) return `${before}${quotedQuestion(title)}${after.replace(/^\./, '')}`;
  const verbLower = verb[1].toLowerCase();
  const rest = after.trim();
  if (!rest || rest === '.') return `Answer ${quotedQuestion(title)}.`;
  if (/^and\s/i.test(rest)) {
    const tail = rest.slice(4);
    return VERB_AFTER_AND.test(tail) ? `Answer ${quotedQuestion(title)} ${rest}` : `Answer ${quotedQuestion(title)} and ${verbLower} ${tail}`;
  }
  return `Answer ${quotedQuestion(title)} and ${verbLower} it ${rest}`;
}

/** Same repair for running text (Mate introductions) that embeds the lower-cased title mid-sentence. */
export function readableSentence(text: string | undefined, title: string | undefined): string {
  const value = String(text ?? '');
  if (!value || !title) return value;
  const span = findTitleSpan(value, title);
  if (!span) return value;
  const replacement = isQuestion(title) ? quotedQuestion(title) : inlineTitle(title);
  const after = value.slice(span.end);
  return `${value.slice(0, span.start)}${replacement}${isQuestion(title) ? after.replace(/^\./, '') : after}`;
}

const stableHash = (value: string) => {
  let hash = Array.from(value).reduce((state, character) => (Math.imul(state, 31) + character.charCodeAt(0)) >>> 0, 7);
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b) >>> 0;
  return (hash ^ (hash >>> 16)) >>> 0;
};

/**
 * A lesson whose every correct answer sits in the same option position is predictable. Such lessons get a stable,
 * per-question rotation of the displayed options. Option ids travel with their text, so stored answers, scores and
 * answer keys are unchanged; lessons that already vary are returned as they are.
 */
export function varyAnswerPositions<Q extends { id: string; options: Array<{ id: string; text: string }>; correctOptionId: string }>(questions: Q[] | undefined): Q[] | undefined {
  if (!Array.isArray(questions) || questions.length < 4) return questions;
  // Malformed questions are left for the lesson engine to drop; rotating them here would throw.
  if (questions.some((question) => !question?.id || !Array.isArray(question.options) || question.options.some((option) => !option))) return questions;
  const positions = questions.map((question) => question.options.findIndex((option) => option.id === question.correctOptionId));
  if (positions.some((position) => position < 0) || new Set(positions).size > 1) return questions;
  return questions.map((question) => {
    const shift = stableHash(question.id) % question.options.length;
    return shift ? { ...question, options: [...question.options.slice(shift), ...question.options.slice(0, shift)] } : question;
  });
}
