# Sprint 03E Continuation: Hotels & Resorts Knowledge Check v6 (m4-l4 extra 1) and correct-option position proposal (2026-11-18)

Mode: Draft only. Not published. Restore point: manual snapshot 1307 "Before Hotels & Resorts Knowledge Check v6 (m4-l4 extra 1 correct option reword)".
Input: findings 1 and 2 of `reports/sprint-03e-hotels-kc-v5-registration-2026-11-18.md`.

- Finding 1 (reversed absolute-word cue in m4-l4 extra 1): **fixed and registered** as v6.
- Finding 2 (correct-option position skew in the 84 generated extra questions): **proposed only, not applied**. Nothing in the Core, `dairyQuizCore.ts` or any shared file was changed for it.

## 1. Finding 1: what was registered

| Item | Detail |
|---|---|
| New file | `apps/IndustryKnowledge/hospitalityHotelsKnowledgeChecksV6.ts` (4,738 bytes, SHA-256 `ff0225db...afdcf4`, identical to the tested copy): one entry (`hospitality-hotels-m4-l4`, extra seed 1, chapter 1) with the reworded correct option, `reviseHotelExtraSeedV6()`, the manifest `buildHotelKnowledgeCheckMigrationV6()` (version `hospitality-hotels-kc-v6`) and `applyHotelKnowledgeCheckV6()` |
| Edited file | `apps/IndustryKnowledge/hospitalityHotelsCore.tsx`: 3 hunks, +276 bytes, each a single exact match: (1) imports and re-exports the v6 migration; (2) wraps the existing `applyHotelKnowledgeCheckV5(...)` chain in `applyHotelKnowledgeCheckV6(...)`; (3) maps the extra seeds through `reviseHotelExtraSeedV6(prefix, i + 1, reviseHotelExtraSeedV5(prefix, i + 1, extra))` and adds the closing parenthesis. The `EXTRA_SEEDS` table is not edited |
| Not touched | `hospitalityHotelsKnowledgeChecksV2.ts`, `V3.ts`, `V4.ts`, `V5.ts`, module registries 01-05, `reviewHolds.ts`, `dairyQuizCore.ts`, `lessonFlowCore.ts`, `assessmentCoverage.ts`, `fashionM2Core.tsx`, content files, stored progress, database, config, the other sub-industries |

### Wording

| | Option | Characters |
|---|---|---|
| Before (v5) correct | "Only when target demand and connectivity support it" | 51 (longest of four) |
| After (v6) correct | "When target demand and connectivity support it" | 46 (second longest) |
| Distractor, unchanged from v5 | "When the hotel has fewer facilities than rivals" | 47 |
| Distractor, unchanged from v5 | "When the hotel is a short walk from the beach" | 45 |
| Distractor, unchanged from v5 | "When rates sit below those of nearby rivals" | 43 |

The three v5 distractors already had no absolute or softer-absolute word, shared the "When ..." frame and were within 4 characters of each other, so no distractor needed rewording. Removing "Only" from the correct option is enough: the four options now share one frame, none carries a listed absolute word (2 of 8 options across the two generated questions before, 0 of 8 after), the spread is 4 characters (8 before) and the correct option's length rank moved from longest to second. The stem, applied variant, chapter link and explanation come from the Core and are not restated in v6. The Core explanation still reads "Beach access helps only if target demand and connectivity support it"; that is explanation text, not an option, and the Core was not edited beyond the three additive hunks.

Correct options of the 42 extra seeds carrying a listed absolute word: 3 of 42 before, 2 of 42 after (m3-l5 extra 1 "No: ..." and m5-l4 extra 2 "... not guaranteed profit or savings", both balanced as described in the v5 report).

### Registration rule

The seed keeps its slot (4), so `pairedQuiz` rotation, option order, the correct option's position and question selection are unchanged. Because the correct option's wording changes, the two questions are re-identified rather than edited in place: `hospitality-hotels-m4-l4-v5-4a|4b` (retired) become `hospitality-hotels-m4-l4-v6-4a|4b`. The manifest lists both pairs with chapter 1 and version `hospitality-hotels-kc-v6`. v6 is the outermost wrapper, so v2 to v5 never see v6 IDs and v6 only matches `-v5-` IDs of its own lesson and slot. M5-10 (REV-P0-01) is not involved: the seed names chapter 1 of m4-l4, not chapter 1 of m5-l4.

## 2. Before and after (EXECUTED for finding 1)

| Check | Before (v5) | After (v6) |
|---|---|---|
| Questions, 21 lessons with extra seeds | 210, exactly 10 per lesson | 210, exactly 10 per lesson |
| Questions whose ID changed | - | 2 (`...-m4-l4-v5-4a`, `...-v5-4b`) |
| Questions whose option text changed | - | 2 (only the correct option) |
| Option ids, answer-key position, stem, explanation, chapter, objective changed | - | 0 / 0 / 0 for all 210 |
| Structure (`validateLessonQuiz` logic) | 0 problems | 0 problems |
| ID safety | 210 unique | 210 unique; 0 retired IDs still generated; 0 new IDs colliding with a before ID |
| Assessment coverage (`planAssessment` and `playThrough` logic): 63 chapters | 1 held, 62 valid, 0 without questions, 2 invalid questions (the two M5-10 questions, excluded as restricted), 0 blocked, 0 takeaways unreachable | identical; per-lesson plan mode, valid count and per-chapter status and question count identical in all 21 lessons |
| Chapter gating and progression (`chapterProgress`, 0 to 3 submitted checks, 21 lessons = 84 states) | reference | identical in every state |
| Cross-mode access (`openBySubmittedChecks`, same states, plus the status rebuild used by Chooser, Flashcards and Match & Sort) | reference | identical in every state, so cross-mode parity is unchanged |
| Play-through (submit every available check in order) | 0 chapters left locked, Lesson Takeaways reachable in every lesson | same |
| Held chapter M5-10 | m5-l4 plan `under-review / ready / ready`, 8 valid questions | unchanged; no v6 question names chapter 1 |

Stored attempts, scores and completion: nothing was written. A stored chapter-1 record of m4-l4 written under the v5 IDs is left untouched, still counts as a submission for gating, and, as in v2 to v5, its stored question IDs no longer match the current chapter questions, so the per-question detail is not shown and that chapter check does not contribute to the aggregated lesson accuracy until retaken (existing engine behaviour of `aggregateChapterScores`; the chapter's `latest`, `best` and attempt history remain). An unsubmitted draft on the retired IDs is replaced by a fresh draft on reopening. No learner loses access.

## 3. Finding 2: position proposal (NOT APPLIED, for review)

### Cause, measured

`pairedQuiz` puts the correct option first in `[correct, ...wrong]` and rotates by `(seedIndex + pairIndex) % 4`; the correct option's final position is `(4 - rotation) % 4`. Extra seeds always take slots 4 and 5 (seed indexes 3 and 4), so their rotations are fixed:

| Slot | Variant | Rotation | Correct option position |
|---|---|---|---|
| 4 | a (recall) | 3 | b |
| 4 | b (applied) | 0 | a |
| 5 | a (recall) | 0 | a |
| 5 | b (applied) | 1 | d |

Measured over the 84 generated extra questions (21 per slot, EXECUTED with the real `pairedQuiz`): **a 42 (50.0%), b 21 (25.0%), c 0 (0.0%), d 21 (25.0%)**. Position c never holds the correct answer.

The other 126 questions of the same lessons (chapter seeds in slots 1 to 3) are also not uniform: a 21, b 21, c 42, d 42 (16.7 / 16.7 / 33.3 / 33.3%). Whole 10-question lessons today: a 63 (30.0%), b 42 (20.0%), c 42 (20.0%), d 63 (30.0%); every lesson is a 3 / 2 / 2 / 3 pattern. The chapter-seed skew sits in slots 1 to 3 handled by v2 to v4 and is outside the instruction (84 extras only).

### Why it needs a new migration, and how to avoid `dairyQuizCore.ts`

Option wording stays the same, but if the same question ID is kept, a stored answer such as `b` would silently point at different text. A reorder must therefore retire the 84 IDs and issue new ones (proposed `hospitality-hotels-m{m}-l{l}-v7-{4|5}{a|b}`, version `hospitality-hotels-kc-v7`) under the same registration pattern as v2 to v6.

The rotation is not edited in `dairyQuizCore.ts` (shared by every sub-industry; its SHA-256 `80def0a1...6a9` is unchanged and every other sub-industry's quizzes are byte-identical by construction). Instead, a Hotels-only post-step `applyHotelPositionsV7(lesson, questions)` in a new `hospitalityHotelsKnowledgeChecksV7.ts` would run as the outermost wrapper in the Core (one import hunk, one wrapper hunk, one closing parenthesis, as for v5 and v6). For each generated extra question of the 21 listed lessons it moves the correct option to a target position from a fixed table, keeps the three distractors in their existing relative order, reassigns the option ids a to d by position, recomputes `correctOptionId` and renames the question. It never rewrites option text, stems, explanations or chapter links.

```ts
const IDS = ['a', 'b', 'c', 'd'] as const;

/** lesson prefix -> target correct-option position for slots 4a, 4b, 5a, 5b (index into a, b, c, d). */
export const HOTEL_KC_V7_POSITIONS: Record<string, [number, number, number, number]> = { /* table P1 or P2 below */ };

export function applyHotelPositionsV7<Q extends { id: string; options: Array<{ id: string; text: string }>; correctOptionId: string }>(lesson: string, questions: Q[]): Q[] {
  const targets = HOTEL_KC_V7_POSITIONS[lesson];
  if (!targets) return questions;
  return questions.map((question) => {
    const match = question.id.match(/^(.*?)-(?:v\d+-)?([45])([ab])$/);
    if (!match || match[1] !== lesson) return question;
    const target = targets[(Number(match[2]) - 4) * 2 + (match[3] === 'b' ? 1 : 0)];
    const correct = question.options.find((option) => option.id === question.correctOptionId)!;
    const rest = question.options.filter((option) => option !== correct);
    let next = 0;
    const options = IDS.map((id, position) => ({ id, text: position === target ? correct.text : rest[next++].text }));
    return { ...question, id: `${lesson}-v7-${match[2]}${match[3]}`, options, correctOptionId: IDS[target] };
  });
}
```

The v7 manifest would list the 84 pairs (current v6/v5/generic ID to `-v7-` ID). A chapter-seed question (slots 1 to 3), m1 and m3-l4 are not matched and are returned untouched.

### Two target tables (both measured, EXECUTED with the real `pairedQuiz`, the real v6 file and the code above)

Both keep every lesson at 10 questions, keep option wording identical (210/210 questions have the same option texts; 210/210 the same correct option text; 210/210 the same stem, explanation and chapter), leave 126 questions unrenamed, and give 0 `validateLessonQuiz` problems, 210 unique IDs and 0 collisions with current IDs.

| Position of the correct option | Now: 84 extras | P1: 84 extras | P2: 84 extras | Now: 210 whole lessons | P1: 210 | P2: 210 |
|---|---|---|---|---|---|---|
| a | 42 (50.0%) | 21 (25.0%) | 32 (38.1%) | 63 (30.0%) | 42 (20.0%) | 53 (25.2%) |
| b | 21 (25.0%) | 21 (25.0%) | 31 (36.9%) | 42 (20.0%) | 42 (20.0%) | 52 (24.8%) |
| c | 0 (0.0%) | 21 (25.0%) | 10 (11.9%) | 42 (20.0%) | 63 (30.0%) | 52 (24.8%) |
| d | 21 (25.0%) | 21 (25.0%) | 11 (13.1%) | 63 (30.0%) | 63 (30.0%) | 53 (25.2%) |
| Per-lesson count pattern (a/b/c/d of 10) | 3/2/2/3 | 2/2/3/3 | 3/2/2/3 or 2/3/3/2 | | | |

- **P1, extras uniform.** Each lesson's four extra questions hold all four positions once (rotating by lesson, so within each slot the spread is 4 to 6 per position). It fixes the stated finding exactly (25% each, c no longer empty). It does not improve balance at lesson level: because the chapter seeds lean to c and d, whole lessons move from 30/20/20/30 to 20/20/30/30, the same largest deviation (5 points) in the other direction.
- **P2, whole lessons balanced.** Each lesson's extras are chosen to offset the chapter-seed lean (a/b get more extras, c/d fewer), with the recall and applied variants of one seed never sharing a position. Whole lessons reach 25.2 / 24.8 / 24.8 / 25.2% with every lesson at 2 or 3 per position, but the extras alone read 38 / 37 / 12 / 13%.

Recommendation: P2 if the aim is what a learner sees in a 10-question check (it removes the position cue at lesson level); P1 if the aim is exactly the extras metric of the finding. P1 and P2 can be combined later with a re-seed of the chapter-seed slots, which is outside this instruction and would touch the v2 to v4 tables.

Target positions per lesson (slots 4a, 4b, 5a, 5b):

```text
P1                                        P2
m2-l1 b c d a   m4-l1 b c d a             m2-l1 a b a d   m4-l1 b a c b
m2-l2 c d a b   m4-l2 c d a b             m2-l2 a b c b   m4-l2 b a a d
m2-l3 d a b c   m4-l3 d a b c             m2-l3 a d a b   m4-l3 b c b a
m2-l4 a b c d   m4-l4 a b c d             m2-l4 b a c b   m4-l4 d a a b
m2-l5 b c d a   m4-l5 b c d a             m2-l5 b a a d   m4-l5 c b b a
m2-l6 c d a b   m5-l1 d a b c             m2-l6 b c b a   m5-l1 a b a d
m3-l1 d a b c   m5-l2 a b c d             m3-l1 d a a b   m5-l2 a b c b
m3-l2 a b c d   m5-l3 b c d a             m3-l2 c b b a   m5-l3 a d a b
m3-l3 b c d a   m5-l4 c d a b             m3-l3 a b a d   m5-l4 b a c b
m3-l5 d a b c   m5-l5 d a b c             m3-l5 a b c b   m5-l5 b a a d
m3-l6 a b c d                             m3-l6 a d a b
```

m4-l4 sits at slots 4a and 4b in this table and its two question IDs are the ones renamed in v6; the v7 manifest would chain v5 to v6 to v7 for those two (the proposal's regex accepts `-v6-` IDs).

### Impact if approved

- 84 question IDs retired and reissued (4 of the 10 questions of each of the 21 lessons). Stored attempts, scores, drafts and completion keep their old IDs and are never rewritten; the same two consequences as v2 to v6 apply (per-question detail hidden and no contribution to aggregated lesson accuracy for a chapter whose last attempt names retired IDs until retaken; an unsubmitted draft on retired IDs is replaced). Chapter gating reads submission records, so no learner loses access.
- Other sub-industries: no change (no shared file edited; they keep the existing rotation). The same position skew pattern would apply to any other sub-industry that uses extra seeds in slots 4 and 5 and is out of scope here.
- The chapter-seed skew (c and d 33% each) is left as is.

## 4. Findings and open points

1. **Finding 1 closed in Draft.** No absolute word or length cue remains in m4-l4 extra 1. A reviewer should read the reworded option against the chapter 1 text of m4-l4 once (the chapter prose was not re-read, same limitation as v2 to v5).
2. **Finding 2 needs a decision**: P1 or P2 (or neither), then a v7 registration. Until then the extra questions keep the 50 / 25 / 0 / 25 position pattern.
3. **Chapter seeds are also skewed** (c and d 33% each). Because the whole-lesson metric is what a learner experiences, a combined rebalance of all 10 questions per lesson would give the best result but needs a change to the v2 to v4 seed tables.
4. Unchanged from the v5 report: m2-l1 extra 1 still has an 18 character spread (no absolute word, left with its generic ID); a rebalance of its options could be folded into the same v7 migration if wanted.

## NOT RUN

- The repository test files (`assessmentCoverage.test.tsx`, `crossModeAccess.test.ts`, `lessonFlowProgression.test.ts`, `progressSync.test.ts`, `learningModeRouting.test.tsx`, `lessonFlowReader.test.tsx`, `practiceReview/__tests__/renderedGrounding.test.ts`, `matchSort/__tests__/generator.test.ts`): they need the full application module graph, which cannot be run through the bridge. The equivalent checks ran in a Node harness that uses the real `dairyQuizCore.ts` (`pairedQuiz`, `selectLessonQuestions`, `validateLessonQuiz`), the real v6 file, a copy of the v5 apply functions with the real m4-l4 entries, and ports of `questionProblem`, `planAssessment`, `chapterProgress`, `lessonTakeawaysAvailable`, `openBySubmittedChecks` (`lessonFlowCore.ts`) and `playThrough` (`assessmentCoverage.ts`).
- Harness limits: for the 20 lessons other than m4-l4, the chapter seeds and extra seeds are stubs with the real chapter links, so wording-level checks are real only for m4-l4 extra 1; position, ID, count, coverage, gating and cross-mode results do not depend on option text and are valid for all 21 lessons. m5-l4 chapter 1 is modelled as restricted. The v2 to v4 renames, m1 and m3-l4 are not modelled (not affected).
- Full-app TypeScript compile, jsdom/DOM tests and a browser Draft check. `hospitalityHotelsKnowledgeChecksV6.ts` compiles under `tsc --strict` on its own; the Core edit uses the same typing as the v5 edit. No rendered-UI claim is made.
