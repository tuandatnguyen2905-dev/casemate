// Hotels & Resorts Knowledge Check v6: removes the last absolute-word cue left by v5, registered through a fifth versioned
// assessment migration (the v5 IDs of the affected extra seed are retired by the manifest, v6 IDs introduced).
// Why: v5 reworded the distractors of the EXTRA_SEEDS of hospitalityHotelsCore.tsx and left their correct options untouched.
// For m4-l4 extra 1 ('When does a beach location actually help a hotel compete?') the correct option read "Only when target
// demand and connectivity support it" while the three v5 distractors no longer began with "Only", so it became the only option
// of its question that carried an absolute word and the cue was reversed (the odd option out was the right answer).
// What changed: the correct option of that one seed is reworded to "When target demand and connectivity support it" (46
// characters). The three v5 distractors (45, 43 and 47 characters, none with an absolute word) are kept as v5 defines them, so
// the four options now share the same "When ..." frame, carry no absolute word and sit within 4 characters of each other, with
// the correct option second longest.
// What did not change: the stem, applied variant, chapter link and explanation (they stay in hospitalityHotelsCore.tsx and are
// never restated here), the slot of the seed (so `pairedQuiz` rotation, option order, the correct option's position and question
// selection are unchanged), the 10 questions of every lesson, the other 41 extra seeds and the 87 chapter-specific seeds. The
// v5 distractors are read from the v5 chain, not restated, so they cannot drift.
// Slots: m4-l4 has three chapter seeds, so its first extra seed takes generic slot 4. v5 renamed `hospitality-hotels-m4-l4-4a|b`
// to `hospitality-hotels-m4-l4-v5-4a|b`; v6 renames those to `hospitality-hotels-m4-l4-v6-4a|b`. Retired IDs are never reused
// or edited, and stored attempts, scores, drafts and completion records are never rewritten: they keep the IDs of the
// questions answered. Held chapter M5-10 (REV-P0-01, chapter 1 of m5-l4) is not involved: this seed names chapter 1 of m4-l4.

export const HOTEL_KC_V6_VERSION = 'hospitality-hotels-kc-v6';

/** Generic slot of the first EXTRA_SEEDS entry; the second entry takes the next slot. */
export const HOTEL_KC_V6_FIRST_EXTRA_SLOT = 4;

export interface HotelKcV6Seed {
  /** Lesson-local chapter number (1-based) named by the extra seed, the question's `moduleId`. */
  chapter: number;
  correct: string;
}

/** Lesson prefix → extra seed number (1 = first EXTRA_SEEDS entry, 2 = second) → chapter link and the reworded correct option. */
export const HOTEL_KC_V6: Record<string, Record<number, HotelKcV6Seed>> = {
  'hospitality-hotels-m4-l4': {
    1: { chapter: 1, correct: 'When target demand and connectivity support it' },
  },
};

/** Replaces the correct option of an extra seed. Everything else, including the distractors from v5, stays as the chain defines it. */
export function reviseHotelExtraSeedV6<S extends { correct: string }>(lesson: string, extraNumber: number, seed: S): S {
  const revised = HOTEL_KC_V6[lesson]?.[extraNumber];
  return revised ? { ...seed, correct: revised.correct } : seed;
}

export interface HotelKcV6MigrationEntry {
  lesson: string;
  /** The v5 ID retired by this migration. */
  retiredId: string;
  replacementId: string;
  chapter: number;
  migrationVersion: typeof HOTEL_KC_V6_VERSION;
}

/** Versioned assessment migration manifest (v5 extra-seed IDs to v6): every retired ID and the new ID that replaces it. */
export function buildHotelKnowledgeCheckMigrationV6(): HotelKcV6MigrationEntry[] {
  return Object.entries(HOTEL_KC_V6).flatMap(([lesson, seeds]) =>
    Object.entries(seeds).flatMap(([extraNumber, seed]) => {
      const slot = HOTEL_KC_V6_FIRST_EXTRA_SLOT + Number(extraNumber) - 1;
      return (['a', 'b'] as const).map((variant) => ({
        lesson,
        retiredId: `${lesson}-v5-${slot}${variant}`,
        replacementId: `${lesson}-v6-${slot}${variant}`,
        chapter: seed.chapter,
        migrationVersion: HOTEL_KC_V6_VERSION,
      }));
    }),
  );
}

/** Renames the questions generated from revised extra seeds from their v5 IDs to v6 IDs. Everything else is returned untouched. */
export function applyHotelKnowledgeCheckV6<Q extends { id: string }>(lesson: string, questions: Q[]): Q[] {
  const revised = HOTEL_KC_V6[lesson];
  if (!revised) return questions;
  return questions.map((question) => {
    const match = question.id.match(/^(.*)-v5-(\d+)([ab])$/);
    if (!match || match[1] !== lesson || !revised[Number(match[2]) - HOTEL_KC_V6_FIRST_EXTRA_SLOT + 1]) return question;
    return { ...question, id: `${lesson}-v6-${match[2]}${match[3]}` };
  });
}
