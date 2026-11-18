/** Vietnamese text for one authored flashcard, keyed by its cardId. `en` is the English front it was translated from. */
export interface ViFlashcard {
  en: string;
  front: string;
  back: string;
  explanation: string;
  example?: string;
  terms?: string[];
  /** Multiple choice: Vietnamese text by option id; option ids and the correct id come from the English card. */
  options?: Record<string, string>;
  /** Fill in the blank: an authored Vietnamese answer and its explicit synonyms (no fuzzy matching). */
  answer?: string;
  acceptedAnswers?: string[];
}

/** Vietnamese text for one authored Match & Sort activity, keyed by activityId. `enTitle` is the English title it was translated from. */
export interface ViMatchActivity {
  enTitle: string;
  title: string;
  learningObjective: string;
  instructions: string;
  summary: string;
  promptLabel?: string;
  answerLabel?: string;
  /** Text by item id: prompts, answers, sort items or sequence steps. */
  items: Record<string, string>;
  /** Explanation and hint by pair id (concept matching) or item id (sorting and sequences). */
  notes: Record<string, { explanation: string; hint: string }>;
  categories?: Record<string, { label: string; description: string }>;
  /** Misconception notes by item id, then by the wrong category id. */
  misplaced?: Record<string, Record<string, string>>;
  sequenceEvidence?: string;
}
