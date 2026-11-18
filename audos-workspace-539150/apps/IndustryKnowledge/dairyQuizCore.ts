export interface DairyQuizOption {
  id: string;
  text: string;
}

export interface DairyQuizQuestion {
  id: string;
  question: string;
  options: DairyQuizOption[];
  correctOptionId: string;
  explanation: string;
  moduleId: string;
  objective: string;
}

export interface DairyLessonTakeaways {
  learned: string;
  keyTakeaways: string[];
  businessImplications: string;
  remember: string;
  nextLesson: string;
}

/**
 * One seed can produce two questions: a recall question and an applied variant that
 * reuses the same option set rotated into a different order.
 * `chapter` is the 1-based chapter number inside the lesson, so the quiz can link
 * a wrong answer back to the chapter that explains it.
 */
export interface DairyQuizSeed {
  chapter: string;
  objective: string;
  question: string;
  application: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
}

/** Every lesson quiz renders exactly this many questions. */
export const QUESTIONS_PER_LESSON = 10;

const OPTION_IDS = ['a', 'b', 'c', 'd'];

/**
 * Picks exactly QUESTIONS_PER_LESSON questions from per-seed [recall, applied] pairs.
 * Question IDs, option order and chapter links of every kept question are unchanged.
 * - 10+ seeds: one recall question per seed; the first seed of every chapter is kept
 *   before any chapter gets a second, then the rest fill in seed order.
 * - Fewer seeds: every recall question, then applied variants spread across chapters.
 * - Fewer than 5 seeds cannot reach 10 without repeats; validateLessonQuiz reports it.
 */
export function selectLessonQuestions<Q>(pairs: Array<[Q, Q]>, chapters: string[]): Q[] {
  const target = QUESTIONS_PER_LESSON;
  const indexes = pairs.map((_, index) => index);
  const byChapterRound = [...indexes].sort((left, right) => {
    const rank = (index: number) => chapters.slice(0, index).filter((chapter) => chapter === chapters[index]).length;
    return rank(left) - rank(right) || left - right;
  });
  if (pairs.length >= target) {
    const kept = new Set(byChapterRound.slice(0, target));
    return indexes.filter((index) => kept.has(index)).map((index) => pairs[index][0]);
  }
  const doubled = new Set(byChapterRound.slice(0, target - pairs.length));
  return indexes.flatMap((index) => (doubled.has(index) ? [pairs[index][0], pairs[index][1]] : [pairs[index][0]]));
}

export function pairedQuiz(prefix: string, seeds: DairyQuizSeed[]): DairyQuizQuestion[] {
  const pairs = seeds.map((seed, seedIndex) =>
    [seed.question, seed.application].map((question, pairIndex) => {
      const rotation = (seedIndex + pairIndex) % 4;
      const raw = [seed.correct, ...seed.wrong];
      const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
      return {
        id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`,
        question,
        options: rotated.map((text, index) => ({ id: OPTION_IDS[index], text })),
        correctOptionId: OPTION_IDS[rotated.indexOf(seed.correct)],
        explanation: seed.explanation,
        moduleId: seed.chapter,
        objective: seed.objective,
      };
    }) as [DairyQuizQuestion, DairyQuizQuestion],
  );
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}

interface QuizLike {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId: string;
}

/**
 * Structural check for one lesson quiz: exactly QUESTIONS_PER_LESSON questions, four
 * distinct options, exactly one correct option, an explanation, a chapter reference
 * inside the lesson, and no repeated IDs or question stems. Returns problems; empty means valid.
 */
export function validateLessonQuiz(questions: QuizLike[], chapterCount?: number): string[] {
  const problems: string[] = [];
  if (questions.length !== QUESTIONS_PER_LESSON) problems.push(`expected ${QUESTIONS_PER_LESSON} MCQs, found ${questions.length}`);
  const ids = new Set<string>();
  const stems = new Set<string>();
  questions.forEach((question) => {
    const label = question.id || '(missing id)';
    if (!question.id) problems.push('question without id');
    else if (ids.has(question.id)) problems.push(`${label}: duplicate id`);
    ids.add(question.id);
    const stem = String(question.question ?? '').trim().toLowerCase();
    if (!stem) problems.push(`${label}: empty question`);
    else if (stems.has(stem)) problems.push(`${label}: duplicate question text`);
    stems.add(stem);
    const options = question.options ?? [];
    if (options.length !== 4) problems.push(`${label}: expected 4 options, found ${options.length}`);
    if (new Set(options.map((option) => option.id)).size !== options.length) problems.push(`${label}: repeated option id`);
    const texts = options.map((option) => String(option.text ?? '').trim().toLowerCase());
    if (texts.some((text) => !text)) problems.push(`${label}: empty option`);
    if (new Set(texts).size !== texts.length) problems.push(`${label}: repeated option text`);
    if (options.filter((option) => option.id === question.correctOptionId).length !== 1) problems.push(`${label}: correct option must match exactly one option`);
    if (!String(question.explanation ?? '').trim()) problems.push(`${label}: missing explanation`);
    const chapter = Number(question.moduleId);
    if (!Number.isInteger(chapter) || chapter < 1 || (chapterCount !== undefined && chapter > chapterCount)) problems.push(`${label}: invalid chapter reference ${question.moduleId}`);
  });
  return problems;
}
