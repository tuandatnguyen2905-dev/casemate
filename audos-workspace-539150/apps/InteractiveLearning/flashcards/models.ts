// Smart Flashcards data model. Content (what a card says) is kept separate from review state
// (how well a learner knows it) and from presentation (components/). Every identity is a stable
// string ID; nothing is keyed by array position.

export type RecallRating = 'again' | 'hard' | 'good' | 'easy';

export const RECALL_RATINGS: readonly RecallRating[] = ['again', 'hard', 'good', 'easy'];

/**
 * `mastered` is a current status, never a permanent one: a mastered card still comes due and a
 * single Again demotes it to `learning`.
 */
export type CardLearningState = 'unseen' | 'learning' | 'mastered';

/** Points back at the read-only curriculum text a card was drawn from. */
export interface SourceRef {
  /** Workspace path of the curriculum file, e.g. `apps/IndustryKnowledge/commercialBankingM01B1.tsx`. */
  file: string;
  chapterId: string;
  /** Verbatim excerpt from `file` that supports the card. Validated by the source-mapping test. */
  excerpt: string;
  /** Citation IDs the source chapter already lists (e.g. `cb-m01-s08`). */
  citationIds?: string[];
}

/** Which kind of chapter content a card tests, in General Info order. */
export type CardConceptCategory = 'concept' | 'insight' | 'term' | 'mechanism' | 'driver' | 'example' | 'application' | 'indicator' | 'risk' | 'implication';

/** Cognitive step a card asks for: recall → mechanism → implication → application. */
export type CardStage = 'recall' | 'mechanism' | 'implication' | 'application';

/** How a card is studied. A card without an `interaction` is `classic` (flip to reveal). */
export type FlashcardType = 'classic' | 'mcq' | 'fill_blank';

export interface McqOption {
  /** Stable within the card, e.g. `a`. */
  id: string;
  text: string;
}

/** Multiple choice: `front` is the question and `back` repeats the correct option's text. */
export interface McqInteraction {
  type: 'mcq';
  options: McqOption[];
  correctOptionId: string;
}

/**
 * Fill in the blank: `front` is the statement with one blank written as `____`, `back` is the completed
 * statement. Matching ignores case, surrounding space and (in `standard` mode) punctuation; it never
 * guesses beyond `answer` and the listed `acceptedAnswers`.
 */
export interface FillBlankInteraction {
  type: 'fill_blank';
  answer: string;
  /** Explicit synonyms and abbreviations the chapter supports. No fuzzy matching beyond this list. */
  acceptedAnswers?: string[];
  /** `exact` keeps punctuation significant (formulas, symbols); default `standard`. */
  matching?: 'standard' | 'exact';
}

export type CardInteraction = McqInteraction | FillBlankInteraction;

export interface FlashcardContent {
  cardId: string;
  deckId: string;
  industryId: string;
  moduleId: string;
  lessonId: string;
  chapterId: string;
  /** Question or term prompt shown before reveal. */
  front: string;
  /** The answer. */
  back: string;
  explanation: string;
  practicalExample: string;
  keyTerms: string[];
  sourceRefs: SourceRef[];
  // Optional metadata. Older cards and stored review state never carry it, so nothing may require it.
  /** Written by an author (flashcards/decks) or built from the chapter's displayed text. */
  origin?: 'authored' | 'generated';
  conceptCategory?: CardConceptCategory;
  stage?: CardStage;
  difficulty?: 'introductory' | 'standard' | 'advanced';
  /** General Info section the answer is shown in, e.g. "Concept breakdown · How it works". */
  sourceSection?: string;
  /** The chapter's learning objective, as the chapter data states it. */
  learningObjective?: string;
  /** Present on MCQ and fill-in-the-blank cards only; absent means a classic flip card. */
  interaction?: CardInteraction;
}

/** One chapter of the source lesson, as it existed when the deck was authored. */
export interface ChapterRef {
  chapterId: string;
  /** 1-based position in the source lesson; also the existing app's lesson-local chapter number. */
  number: number;
  /** Title without the numeric prefix, as the existing reader displays it. */
  title: string;
  /** Exact title literal in the source file (used to detect drift). */
  sourceTitle: string;
}

export interface LessonSource {
  /** Main curriculum file for the lesson. */
  file: string;
  /** Key the existing app uses for review holds, e.g. `COMMERCIAL_BANKING_MODULE01`. */
  moduleKey: string;
  /** Lesson title exactly as used by the existing lesson registry. */
  lessonTitle: string;
  /** Text that opens the lesson block in `file`. */
  startMarker: string;
  /** Text that opens the next lesson block in `file`. */
  endMarker: string;
  /** Literal that begins each chapter entry inside the lesson block. */
  chapterMarker: string;
  /** contentSha256 of `file` when the deck was authored. */
  readAtSha256: string;
  readAt: string;
  /** Other files cards cite (e.g. shared definitions), with the block that contains the excerpts. */
  supportingFiles?: Array<{ file: string; startMarker: string; endMarker: string; readAtSha256: string }>;
}

export interface FlashcardDeckContent {
  deckId: string;
  title: string;
  description: string;
  industryId: string;
  industryLabel: string;
  moduleId: string;
  moduleLabel: string;
  lessonId: string;
  lessonTitle: string;
  source: LessonSource;
  chapters: ChapterRef[];
  cards: FlashcardContent[];
  /** Mirrors the source curriculum's own review status; flashcards never upgrade it. */
  contentStatus: string;
  mappingNotes: string[];
  /** Built at runtime from text the chapters display; such cards carry no authored practical example. */
  generated?: boolean;
}

export interface CardSchedule {
  /** ISO time the card is next due; null while unseen. */
  dueAt: string | null;
  /** Current interval in days (fractional for the short relearn step). */
  intervalDays: number;
  ease: number;
  lapses: number;
  /** Consecutive successful recalls since the last Again. */
  repetitions: number;
}

export interface ReviewEvent {
  at: string;
  rating: RecallRating;
  previousState: CardLearningState;
  nextState: CardLearningState;
  intervalDays: number;
  dueAt: string;
}

export interface CardReviewState {
  cardId: string;
  deckId: string;
  state: CardLearningState;
  /** 0–1 moving average of recent ratings (Again 0, Hard 0.4, Good 0.75, Easy 1). */
  confidence: number;
  schedule: CardSchedule;
  lastReviewedAt: string | null;
  reviewHistory: ReviewEvent[];
}

export interface FlashcardStoreSnapshot {
  schemaVersion: 1;
  cards: Record<string, CardReviewState>;
  updatedAt: string | null;
}

/** Milliseconds since the epoch. Inject a fixed clock in tests. */
export type Clock = () => number;
