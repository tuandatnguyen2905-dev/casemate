// Match & Sort data model. Content lives in ./content and never in components.
// Every reference uses stable string IDs; array positions are display order only.

export type ActivityType = 'concept-matching' | 'category-sorting' | 'sequence-builder';

/** Deck registry names used by apps/IndustryKnowledge (same convention as reviewHolds.ts `moduleKey`). */
export type SourceModuleKey =
  | 'COMMERCIAL_BANKING_MODULE01' | 'COMMERCIAL_BANKING_MODULE02' | 'COMMERCIAL_BANKING_MODULE03' | 'COMMERCIAL_BANKING_MODULE04' | 'COMMERCIAL_BANKING_MODULE05'
  | 'CONSUMER_FINANCE_MODULE01' | 'CONSUMER_FINANCE_MODULE02' | 'CONSUMER_FINANCE_MODULE03' | 'CONSUMER_FINANCE_MODULE04' | 'CONSUMER_FINANCE_MODULE05'
  | 'FMCG_BEAUTY_MODULE01' | 'FMCG_BEAUTY_MODULE02' | 'FMCG_BEAUTY_MODULE03' | 'FMCG_BEAUTY_MODULE04' | 'FMCG_BEAUTY_MODULE05'
  | 'FMCG_HOUSEHOLD_MODULE01' | 'FMCG_HOUSEHOLD_MODULE02' | 'FMCG_HOUSEHOLD_MODULE03' | 'FMCG_HOUSEHOLD_MODULE04' | 'FMCG_HOUSEHOLD_MODULE05'
  | 'FMCG_TOBACCO_MODULE01' | 'FMCG_TOBACCO_MODULE02' | 'FMCG_TOBACCO_MODULE03' | 'FMCG_TOBACCO_MODULE04' | 'FMCG_TOBACCO_MODULE05'
  | 'MFG_BUILDING_MODULE01' | 'MFG_BUILDING_MODULE02' | 'MFG_BUILDING_MODULE03' | 'MFG_BUILDING_MODULE04' | 'MFG_BUILDING_MODULE05'
  | 'MFG_PACKAGING_MODULE01' | 'MFG_PACKAGING_MODULE02' | 'MFG_PACKAGING_MODULE03' | 'MFG_PACKAGING_MODULE04' | 'MFG_PACKAGING_MODULE05'
  | 'MFG_ELECTRICAL_MODULE01' | 'MFG_ELECTRICAL_MODULE02' | 'MFG_ELECTRICAL_MODULE03' | 'MFG_ELECTRICAL_MODULE04' | 'MFG_ELECTRICAL_MODULE05'
  | 'HEALTHCARE_PRODUCTS_MODULE01' | 'HEALTHCARE_PRODUCTS_MODULE02' | 'HEALTHCARE_PRODUCTS_MODULE03' | 'HEALTHCARE_PRODUCTS_MODULE04' | 'HEALTHCARE_PRODUCTS_MODULE05'
  | 'PROFESSIONAL_AUDIT_MODULE01' | 'PROFESSIONAL_AUDIT_MODULE02' | 'PROFESSIONAL_AUDIT_MODULE03' | 'PROFESSIONAL_AUDIT_MODULE04' | 'PROFESSIONAL_AUDIT_MODULE05'
  | 'LOGISTICS_CONTRACT_MODULE01' | 'LOGISTICS_CONTRACT_MODULE02' | 'LOGISTICS_CONTRACT_MODULE03' | 'LOGISTICS_CONTRACT_MODULE04' | 'LOGISTICS_CONTRACT_MODULE05'
  | 'LOGISTICS_EXPRESS_MODULE01' | 'LOGISTICS_EXPRESS_MODULE02' | 'LOGISTICS_EXPRESS_MODULE03' | 'LOGISTICS_EXPRESS_MODULE04' | 'LOGISTICS_EXPRESS_MODULE05'
  /** Activities generated at runtime from the chapter the reader displays (`generator.ts`); they cite the reader's own deck. */
  | 'READER_GENERATED';

export interface ChapterRef {
  sourceModuleKey: SourceModuleKey;
  /** Exact key of the lesson in the module's DECKS registry. */
  lessonTitle: string;
  /** Chapter title as rendered (numeric prefix stripped). */
  chapterTitle: string;
  /** Original 0-based index in the lesson deck (review holds keep held chapters in place). */
  chapterIndex: number;
  /** Source IDs from the chapter's own source registry (BANKING_SOURCES / CONSUMER_FINANCE_SOURCES). */
  sourceIds: string[];
  /** What in the chapter grounds this activity. */
  grounding: string;
}

interface ActivityBase {
  activityId: string;
  industryId: string;
  moduleId: string;
  lessonId: string;
  /** Primary chapter: `${sourceModuleKey}::${lessonTitle}::${chapterTitle}`. */
  chapterId: string;
  type: ActivityType;
  title: string;
  learningObjective: string;
  instructions: string;
  /** Shown once every answer is correct. */
  summary: string;
  sourceRefs: ChapterRef[];
  /** Absent on authored activities; 'generated' when built at runtime from displayed chapter text. */
  origin?: 'authored' | 'generated';
  /** What a generated activity tests (one objective per activity and chapter, e.g. 'key-terms'). */
  objectiveKey?: string;
}

export interface MatchItem {
  id: string;
  text: string;
}

export interface MatchPair {
  id: string;
  promptId: string;
  answerId: string;
  /** Why the pair belongs together. Shown once the pair is correct. */
  explanation: string;
  /** Points at the concept without revealing the answer. Shown when the pair is wrong. */
  hint: string;
}

export interface ConceptMatchingActivity extends ActivityBase {
  type: 'concept-matching';
  promptLabel: string;
  answerLabel: string;
  items: { prompts: MatchItem[]; answers: MatchItem[] };
  pairs: MatchPair[];
}

export interface SortCategory {
  id: string;
  label: string;
  description: string;
}

export interface SortItem {
  id: string;
  text: string;
  categoryId: string;
  explanation: string;
  hint: string;
  /** Optional misconception notes keyed by the wrong category a learner may choose. */
  misplaced?: Partial<Record<string, string>>;
}

export interface CategorySortingActivity extends ActivityBase {
  type: 'category-sorting';
  categories: SortCategory[];
  items: SortItem[];
}

export interface SequenceStep {
  id: string;
  text: string;
  /** Why this step sits where it does (its dependency on the previous step). */
  explanation: string;
  hint: string;
}

export interface SequenceBuilderActivity extends ActivityBase {
  type: 'sequence-builder';
  /** Must be true: only genuinely sequential processes may use this activity type. */
  isSequentialProcess: true;
  /** Evidence from the chapter that the stages are consecutive, not alternatives. */
  sequenceEvidence: string;
  items: SequenceStep[];
  correctSequence: string[];
}

export type MatchSortActivity = ConceptMatchingActivity | CategorySortingActivity | SequenceBuilderActivity;

export interface MatchSortPack {
  packId: string;
  title: string;
  industryId: string;
  moduleId: string;
  sourceModuleKey: SourceModuleKey;
  /** Mirrors the source curriculum's own review status. */
  contentStatus: string;
  contentNotes: string[];
  activities: MatchSortActivity[];
}

// Runtime state ---------------------------------------------------------------------------

export type Phase = 'working' | 'checked';

export interface ResultEntry {
  /** Prompt, sort item or step ID. */
  id: string;
  correct: boolean;
}

export interface CheckResult {
  entries: ResultEntry[];
  correct: number;
  total: number;
  allCorrect: boolean;
  revealed: boolean;
}

export interface MatchingState {
  kind: 'concept-matching';
  pairs: Record<string, string>;
  selectedPrompt: string | null;
  selectedAnswer: string | null;
  locked: string[];
  phase: Phase;
  result: CheckResult | null;
  checks: number;
}

export interface SortingState {
  kind: 'category-sorting';
  placements: Record<string, string>;
  selectedItem: string | null;
  locked: string[];
  phase: Phase;
  result: CheckResult | null;
  checks: number;
}

export interface SequenceState {
  kind: 'sequence-builder';
  order: string[];
  phase: Phase;
  result: CheckResult | null;
  checks: number;
  lastMoved: string | null;
}

export type ActivityState = MatchingState | SortingState | SequenceState;

export type ActivityAction =
  | { type: 'select-prompt'; id: string }
  | { type: 'select-answer'; id: string }
  | { type: 'pair'; promptId: string; answerId: string }
  | { type: 'unpair'; promptId: string }
  | { type: 'select-item'; id: string }
  | { type: 'place'; itemId: string; categoryId: string }
  | { type: 'place-selected'; categoryId: string }
  | { type: 'unplace'; itemId: string }
  | { type: 'move-step'; id: string; toIndex: number }
  | { type: 'move-step-by'; id: string; delta: number }
  | { type: 'clear-selection' }
  | { type: 'check' }
  | { type: 'retry' }
  | { type: 'reveal' }
  | { type: 'reset' };

// Attempts and completion (kept separate from Knowledge Check scores) -------------------------

export interface AttemptSummary {
  at: string;
  correct: number;
  total: number;
  allCorrect: boolean;
  revealed: boolean;
}

export interface ActivityRecord {
  activityId: string;
  attempts: AttemptSummary[];
  /** First check that was fully correct without revealing answers. */
  completedAt?: string;
  firstCheckAllCorrect?: boolean;
  /** The learner chose to reveal answers before completing. */
  revealedAt?: string;
}

export type MatchSortProgress = Record<string, ActivityRecord>;

export interface MatchSortAttemptEvent {
  activityId: string;
  chapterId: string;
  type: ActivityType;
  attempt: AttemptSummary;
  attemptNumber: number;
}
