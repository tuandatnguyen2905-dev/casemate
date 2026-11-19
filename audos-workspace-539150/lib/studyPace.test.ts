import { buildWeeklyPlan } from './prepRoadmap';
import { bucketPracticeSessions, buildWeekSchedule, goalProgress } from './roadmapProgress';
import {
  EXPECTED_STANDARD_TOTALS,
  STUDY_PACES,
  applyStudyPace,
  parseStudyPaceConfig,
  paceForWeek,
  planActivityTotal,
  planWithPaceTargets,
  verifyPaceTemplates,
  withPaceChange,
} from './studyPace';

function expectEqual(actual: unknown, expected: unknown, scenario: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${scenario}: expected ${e}, received ${a}`);
}

export function runStudyPaceRegressionTests() {
  expectEqual(verifyPaceTemplates(), [], 'templates add up to 182 / 272 / 417 on the standard 24-week plan');

  const baseline = buildWeeklyPlan(24, 'intermediate', new Date(2026, 10, 16));
  expectEqual(baseline.map((week) => week.phase), [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4], 'standard phase boundaries are weeks 1-6, 7-13, 14-20, 21-24');
  expectEqual(planWithPaceTargets(baseline, 'balanced'), baseline, 'Balanced equals the existing baseline 24-week plan exactly');

  const schedule = buildWeekSchedule(buildWeeklyPlan(24, 'beginner', new Date(2026, 10, 16)), '2026-11-16');
  STUDY_PACES.forEach((pace) => {
    expectEqual(planActivityTotal(planWithPaceTargets(schedule, pace)), EXPECTED_STANDARD_TOTALS[pace], `${pace} whole-plan total for a fresh week-1 user`);
  });
  expectEqual(planActivityTotal(applyStudyPace(schedule, null)), 272, 'a learner who never chose a pace is on Balanced');

  const hardcoreFromWeek5 = withPaceChange(null, 'hardcore', 5, '2026-12-14T00:00:00.000Z');
  const repaced = applyStudyPace(schedule, hardcoreFromWeek5);
  expectEqual(repaced.slice(0, 4).map((week) => [week.case_pool_target, week.case_drill_target, week.aptitude_target]), [[2, 7, 1], [2, 7, 1], [2, 7, 1], [2, 7, 1]], 'ended weeks keep their Balanced targets');
  expectEqual([repaced[4].case_pool_target, repaced[4].case_drill_target, repaced[4].aptitude_target], [3, 10, 2], 'the current week takes the new pace');
  expectEqual(planActivityTotal(repaced), 4 * 10 + 2 * 15 + 7 * 18 + 7 * 19 + 4 * 17, 'mixed-pace whole-plan total');

  expectEqual(withPaceChange(hardcoreFromWeek5, 'hardcore', 5, 'later').history, hardcoreFromWeek5.history, 'applying the saved pace again is a no-op');
  expectEqual(withPaceChange(hardcoreFromWeek5, 'slow', 5).history.map((entry) => [entry.pace, entry.from_week]), [['balanced', 1], ['slow', 5]], 'a second change in the same week replaces the first');
  expectEqual(withPaceChange(hardcoreFromWeek5, 'balanced', 5).history.map((entry) => [entry.pace, entry.from_week]), [['balanced', 1]], 'switching back in the same week restores the earlier pace');
  const later = withPaceChange(hardcoreFromWeek5, 'balanced', 9);
  expectEqual(later.history.map((entry) => [entry.pace, entry.from_week]), [['balanced', 1], ['hardcore', 5], ['balanced', 9]], 'a later change keeps every earlier segment');
  expectEqual([paceForWeek(later, 4), paceForWeek(later, 5), paceForWeek(later, 8), paceForWeek(later, 9)], ['balanced', 'hardcore', 'hardcore', 'balanced'], 'each week reads the segment that owns it');
  expectEqual(withPaceChange(null, 'slow', 1).history.map((entry) => [entry.pace, entry.from_week]), [['slow', 1]], 'a plan that has not started is re-paced from week 1');

  expectEqual(parseStudyPaceConfig(JSON.stringify(later)), later, 'a saved config round-trips');
  expectEqual(parseStudyPaceConfig({ pace: 'hardcore' })?.history.map((entry) => [entry.pace, entry.from_week]), [['hardcore', 1]], 'a bare pace applies to the whole plan');
  expectEqual(parseStudyPaceConfig({ pace: 'turbo' }), null, 'an unknown pace is ignored');
  expectEqual(parseStudyPaceConfig({ history: [{ pace: 'slow', from_week: 3 }] })?.history.map((entry) => [entry.pace, entry.from_week]), [['balanced', 1], ['slow', 3]], 'weeks before the first saved segment are Balanced');

  const week5Start = schedule[4].start_date;
  const time = new Date(`${week5Start}T10:00:00`).getTime();
  const sessions = Array.from({ length: 9 }, (_, index) => ({ track: 'case_drill' as const, key: `lib:q${index}`, time: time + index }));
  sessions.push({ track: 'case_drill', key: 'lib:q0', time: time + 100 });
  const done = bucketPracticeSessions(sessions, schedule)[5].case_drill_done;
  expectEqual(done, 9, 'a retake of the same drill is counted once');
  expectEqual(goalProgress(done, applyStudyPace(schedule, null)[4].case_drill_target), { counted: 7, extra: 2, pct: 100, complete: true }, 'Balanced caps the week at 100% and shows extras');
  expectEqual(goalProgress(done, repaced[4].case_drill_target), { counted: 9, extra: 0, pct: 90, complete: false }, 'earlier extras count toward a raised current-week target');
  expectEqual(goalProgress(done, applyStudyPace(schedule, withPaceChange(null, 'slow', 5))[4].case_drill_target), { counted: 5, extra: 4, pct: 100, complete: true }, 'a lowered target caps at 100% with the rest as extra');
}

runStudyPaceRegressionTests();
