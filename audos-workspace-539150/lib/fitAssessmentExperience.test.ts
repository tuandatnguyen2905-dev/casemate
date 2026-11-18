import {
  FIT_ASSESSMENT_RESTORE_COLUMNS,
  FIT_RESTORE_CACHE_TTL_MS,
  FIT_RESTORE_TIMEOUT_MS,
  FIT_ROADMAP_RESTORE_COLUMNS,
  didFitRestoreTimeout,
  encodeFitRestoreCache,
  getTourPopoverPosition,
  parseFitRestoreCache,
  tourMotionSettings,
  type FitRestoreSnapshot,
} from './fitAssessmentExperience';

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
}

const snapshot: FitRestoreSnapshot = {
  target: { id: 'program-1', program: 'Graduate Program' },
  selectedFunction: 'Finance',
  fitAnalysis: { matching_ratio: 82 },
  assessmentResultId: 42,
  stage: 5,
};

export function runFitAssessmentExperienceRegressionTests() {
  assert(FIT_RESTORE_TIMEOUT_MS === 3000, 'restore hard timeout must remain three seconds');
  assert(!didFitRestoreTimeout(1000, 3999), 'restore must remain eligible before the deadline');
  assert(didFitRestoreTimeout(1000, 4000), 'restore must release the UI at the deadline');

  const cached = parseFitRestoreCache(encodeFitRestoreCache(snapshot, 10_000), 10_001);
  assert(cached?.assessmentResultId === 42 && cached.stage === 5, 'fresh cached result must restore immediately');
  assert(parseFitRestoreCache(encodeFitRestoreCache(snapshot, 10_000), 10_000 + FIT_RESTORE_CACHE_TTL_MS + 1) === null, 'stale cached results must be ignored');
  assert(parseFitRestoreCache('{"savedAt":10000,"snapshot":{"stage":5}}', 10_001) === null, 'partial cached results must be ignored safely');

  assert(FIT_ASSESSMENT_RESTORE_COLUMNS.join(',') === 'id,result_json,recommended_subroles', 'assessment recovery must not fetch unused columns');
  assert(!FIT_ROADMAP_RESTORE_COLUMNS.includes('plan_json' as never), 'roadmap recovery must not fetch the large weekly plan');

  const desktop = getTourPopoverPosition({ left: 900, top: 80, bottom: 124, width: 120 }, 1200, 800, 380);
  assert(desktop.x <= 808 && desktop.y === 136, 'desktop coach mark must stay inside the viewport and below a high target');
  assert(desktop.transform.startsWith('translate3d('), 'coach-mark movement must use a compositor transform');

  const mobile = getTourPopoverPosition({ left: 2, top: 700, bottom: 744, width: 44 }, 360, 780, 336);
  assert(mobile.x === 12 && mobile.y === 380, 'mobile coach mark must clamp horizontally and move above a low target');
  assert(tourMotionSettings(false).transitionMs === 300 && tourMotionSettings(false).scrollBehavior === 'smooth', 'default motion must be smooth and 300ms');
  assert(tourMotionSettings(true).transitionMs === 0 && tourMotionSettings(true).scrollBehavior === 'auto', 'reduced motion must disable animation and smooth scrolling');
}

runFitAssessmentExperienceRegressionTests();
