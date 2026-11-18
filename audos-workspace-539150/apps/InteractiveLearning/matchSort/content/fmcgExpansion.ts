// Match & Sort packs for the FMCG expansion curricula. One concept-matching activity per lesson pairs a
// key term from each chapter with the definition that chapter shows; sequence builders are added only for
// chapters whose source marks a genuinely consecutive process (`seq`). Packs exist only for live curricula.

import type { MatchSortActivity, MatchSortPack, SourceModuleKey } from '../types';
import { chapterRef, defineActivities } from './shared';
import type { ActivityDraft } from './shared';
import { FMCG_EXPANSION_BUILT } from '../../../IndustryKnowledge/fmcgExpansionRegistry';
import { FX_MODULE_LABELS } from '../../../IndustryKnowledge/fmcgExpansionCore';
import type { FxBuilt, FxLesson } from '../../../IndustryKnowledge/fmcgExpansionCore';

const lessonPhrase = (title: string) => title.replace(/\?$/, '').replace(/^(How|What|Why|Which|Who|Where|When|Should)\s+/i, '').toLowerCase();

function lessonActivities(built: FxBuilt, moduleIndex: number, lessonIndex: number, lesson: FxLesson): ActivityDraft[] {
  const { curriculum } = built;
  const key = built.modules[moduleIndex].key as SourceModuleKey;
  const base = `${curriculum.slug}-m${moduleIndex + 1}-l${lessonIndex + 1}`;
  const used = new Set<string>();
  const picks = lesson.chapters.map((chapter, chapterIndex) => {
    const term = chapter.terms.find(([name]) => !used.has(name.toLowerCase())) ?? chapter.terms[0];
    used.add(term[0].toLowerCase());
    return { chapter, chapterIndex, term: term[0], definition: term[1] };
  });
  const matching: ActivityDraft = {
    activityId: `${base}-key-terms`,
    type: 'concept-matching',
    title: `Match the key terms: ${lesson.title}`,
    learningObjective: `Connect each key term from ${lesson.title} with its meaning.`,
    instructions: 'Select a term, then select the definition that matches it. Check your answers when every term is paired.',
    summary: `You can now explain the core vocabulary of ${lesson.title}.`,
    promptLabel: 'Key term',
    answerLabel: 'Definition',
    items: {
      prompts: picks.map((pick, index) => ({ id: `t${index + 1}`, text: pick.term })),
      answers: picks.map((pick, index) => ({ id: `d${index + 1}`, text: pick.definition })),
    },
    pairs: picks.map((pick, index) => ({
      id: `p${index + 1}`,
      promptId: `t${index + 1}`,
      answerId: `d${index + 1}`,
      explanation: `Chapter ${pick.chapterIndex + 1} (${pick.chapter.t}) uses this term to ${pick.chapter.o.charAt(0).toLowerCase()}${pick.chapter.o.slice(1)}`,
      hint: `Think about what Chapter ${pick.chapterIndex + 1} explains about ${lessonPhrase(pick.chapter.t)}.`,
    })),
    sourceRefs: picks.map((pick) => chapterRef(key, lesson.title, pick.chapterIndex, pick.chapter.t, pick.chapter.src, pick.definition)),
  };
  const sequences: ActivityDraft[] = lesson.chapters.flatMap((chapter, chapterIndex) => (chapter.seq ? [{
    activityId: `${base}-c${chapterIndex + 1}-sequence`,
    type: 'sequence-builder' as const,
    title: `Put the steps in order: ${chapter.t.replace(/\?$/, '')}`,
    learningObjective: chapter.o,
    instructions: 'Arrange the steps from first to last, then check your order.',
    summary: chapter.take,
    isSequentialProcess: true as const,
    sequenceEvidence: chapter.seq.evidence,
    items: chapter.seq.steps.map(([text, explanation], index) => ({ id: `s${index + 1}`, text, explanation, hint: 'Ask which step must already be complete before this one can start.' })),
    correctSequence: chapter.seq.steps.map((_, index) => `s${index + 1}`),
    sourceRefs: [chapterRef(key, lesson.title, chapterIndex, chapter.t, chapter.src, chapter.seq.evidence)],
  }] : []));
  return [matching, ...sequences];
}

export const FMCG_EXPANSION_PACKS: MatchSortPack[] = FMCG_EXPANSION_BUILT.flatMap((built) => built.curriculum.modules.map((module, moduleIndex): MatchSortPack => {
  const activities: MatchSortActivity[] = defineActivities(built.curriculum.id, `m${moduleIndex + 1}`, module.lessons.flatMap((lesson, lessonIndex) => lessonActivities(built, moduleIndex, lessonIndex, lesson)));
  return {
    packId: `${built.curriculum.id}-m${moduleIndex + 1}-practice`,
    title: `${built.curriculum.name}: ${FX_MODULE_LABELS[moduleIndex]} practice`,
    industryId: built.curriculum.id,
    moduleId: `m${moduleIndex + 1}`,
    sourceModuleKey: built.modules[moduleIndex].key as SourceModuleKey,
    contentStatus: 'Ready for Review',
    contentNotes: ['Generated from chapter key terms and marked process chapters; optional practice that never changes Knowledge Check scores or lesson completion.'],
    activities,
  };
}));
