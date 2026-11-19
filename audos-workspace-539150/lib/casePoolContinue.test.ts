import { completedDrillTimes, continueCaseCandidates, continueRecommendation, startedCaseRefs } from './casePoolContinue';
import type { PracticeSession } from './roadmapProgress';

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function ids(items: Array<{ caseId: string }>): string {
  return items.map((item) => item.caseId).join(',');
}

export function runCasePoolContinueTests() {
  const session = (track: PracticeSession['track'], key: string, time: number): PracticeSession => ({ track, key, time });
  const links = [
    { drillId: 'd1', sourceCaseId: 'case-a' },
    { drillId: 'd2', sourceCaseId: 'case-a' },
    { drillId: 'd3', sourceCaseId: 'case-b' },
    { drillId: 'd4', sourceCaseId: 'case-c' },
    { drillId: 'd5', sourceCaseId: null },
    { drillId: 'd6', sourceCaseId: 'case-d' },
  ];
  const resolveCaseId = (ref: string) => {
    const value = ref.toLowerCase();
    if (value === 'cm-x-01') return 'case-b';
    return ['case-a', 'case-b', 'case-c', 'case-d'].includes(value) ? value : null;
  };
  const sessions = [
    session('case_drill', 'lib:d1', 100),
    session('case_drill', 'lib:d2', 300),
    session('case_drill', 'tree:d3', 200),
    session('case_drill', 'lib:d4', 50),
    session('case_drill', 'lib:d5', 500),
    session('case_drill', 'micro:9', 600),
    session('case_pool', 'case:CM-X-01', 10),
    session('case_pool', 'case-row:7', 11),
    session('aptitude', 'apt:x', 5),
  ];

  expect(Array.from(completedDrillTimes(sessions).keys()).sort().join(',') === 'd1,d2,d3,d4,d5', 'Only library and Structures drills count as completed drills.');
  expect(startedCaseRefs(sessions).join(',') === 'CM-X-01', 'Only Case Pool sessions with a case reference count as started cases.');

  const out = continueCaseCandidates({ sessions, links, resolveCaseId });
  expect(ids(out) === 'case-a,case-c', 'A case started by source id must be skipped; the rest are ordered by latest drill.');
  expect(out[0].drillIds.join(',') === 'd1,d2' && out[0].lastDrillAt === 300, 'Drills of one case are grouped under that case.');
  expect(continueCaseCandidates({ sessions: [], links, resolveCaseId }).length === 0, 'No completed drills means no recommendation.');
  expect(continueCaseCandidates({ sessions: [session('case_drill', 'lib:unknown', 1)], links, resolveCaseId }).length === 0, 'A drill with no source case recommends nothing.');
  expect(ids(continueCaseCandidates({ sessions: [...sessions, session('case_pool', 'tree:pool-case-a', 400)], links, resolveCaseId })) === 'case-c', 'A case started through a Structures tree is skipped.');

  const rec = continueRecommendation(out[0], 0);
  expect(rec.casePoolCaseId === 'case-a' && rec.casemateFunction === 'Case Pool' && rec.continuedDrills === 2, 'The recommendation names the case by its stable id.');
}

runCasePoolContinueTests();
