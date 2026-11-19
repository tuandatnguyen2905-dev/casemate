/**
 * casePoolContinue.ts - "Continue with the full case" recommendations for My Roadmap.
 *
 * A Case Drill question that was built from a Case Pool case records that case's stable id
 * (source_case_id). When the learner has completed such a drill but has not started the case itself,
 * My Roadmap recommends that exact case. The recommendation carries the stable id (casePoolCaseId),
 * never a title, so it opens the case through the same verified path as any other named case.
 *
 * Nothing here reads case content, scoring or difficulty, and nothing is written: the list is derived
 * from the learner's completed practice each time My Roadmap renders.
 */

import type { PracticeSession } from './roadmapProgress';
import type { PreparationRecommendation } from './prepRoadmap';

export interface DrillCaseLink {
  drillId: string;
  /** Stable Case Pool id of the case the drill was built from; null when the drill has no source case. */
  sourceCaseId: string | null;
}

export interface ContinueCase {
  caseId: string;
  /** Completed Case Drill questions that were built from this case. */
  drillIds: string[];
  /** Completion time (epoch ms) of the most recent of those drills. */
  lastDrillAt: number;
}

export type ContinueRecommendation = PreparationRecommendation & {
  casePoolCaseId: string;
  continuedDrills: number;
};

/** One recommendation line per case, so a journey case with several finished drills still reads as one step. */
export const MAX_CONTINUE_CASES = 2;

/** Completed Case Drill question ids (Question Library attempts and Structures trees) with their latest completion time. */
export function completedDrillTimes(sessions: PracticeSession[]): Map<string, number> {
  const out = new Map<string, number>();
  sessions.forEach((session) => {
    if (session.track !== 'case_drill') return;
    const match = /^(?:lib|tree):(.+)$/.exec(session.key);
    if (!match) return;
    out.set(match[1], Math.max(out.get(match[1]) || 0, session.time));
  });
  return out;
}

/** Raw Case Pool references of every case the learner has already started or solved. */
export function startedCaseRefs(sessions: PracticeSession[]): string[] {
  const refs = new Set<string>();
  sessions.forEach((session) => {
    if (session.track !== 'case_pool') return;
    const match = /^(?:case|tree):(.+)$/.exec(session.key);
    if (match) refs.add(match[1].replace(/^pool-/, ''));
  });
  return Array.from(refs);
}

/**
 * Cases to continue with, most recently drilled first. A case is offered only when at least one of its
 * drills is completed and the learner has not started that case in Case Pool.
 * `resolveCaseId` maps a raw reference (case id or source id) to a stable case id, or null.
 */
export function continueCaseCandidates(input: {
  sessions: PracticeSession[];
  links: DrillCaseLink[];
  resolveCaseId: (ref: string) => string | null;
  limit?: number;
}): ContinueCase[] {
  const done = completedDrillTimes(input.sessions);
  if (done.size === 0) return [];
  const started = new Set<string>();
  startedCaseRefs(input.sessions).forEach((ref) => {
    const id = input.resolveCaseId(ref);
    if (id) started.add(id);
  });

  const byCase = new Map<string, ContinueCase>();
  input.links.forEach(({ drillId, sourceCaseId }) => {
    const time = done.get(drillId);
    if (!sourceCaseId || time === undefined || started.has(sourceCaseId)) return;
    const entry = byCase.get(sourceCaseId) || { caseId: sourceCaseId, drillIds: [], lastDrillAt: 0 };
    if (!entry.drillIds.includes(drillId)) entry.drillIds.push(drillId);
    entry.lastDrillAt = Math.max(entry.lastDrillAt, time);
    byCase.set(sourceCaseId, entry);
  });

  return Array.from(byCase.values())
    .sort((a, b) => b.lastDrillAt - a.lastDrillAt || b.drillIds.length - a.drillIds.length || a.caseId.localeCompare(b.caseId))
    .slice(0, input.limit ?? MAX_CONTINUE_CASES);
}

/** The recommendation record for one case; it names the case by its stable Case Pool id. */
export function continueRecommendation(item: ContinueCase, order: number): ContinueRecommendation {
  const count = item.drillIds.length;
  return {
    id: `continue-full-case-${item.caseId}`,
    category: 'Case practice',
    gap: `You completed ${count} Case Drill ${count === 1 ? 'question' : 'questions'} from this case but have not solved the full case yet.`,
    reason: 'Case Drill practises one step of a case; the full case puts the steps together.',
    recommendedAction: 'Continue with the full case',
    priority: 'Medium',
    casemateFunction: 'Case Pool',
    order,
    casePoolCaseId: item.caseId,
    continuedDrills: count,
  };
}
