// Casemate — My Roadmap "Today's Focus": read-only skill measurement.
//
// Answers "what should I improve today, and how will I know I improved?" from
// the learner's own graded results. It is strictly separate from roadmap
// completion %: nothing here counts sessions, and nothing is written anywhere.
//
// Aptitude Test (per comparable category = the question's source_category, else
// the test family)
//   score      = graded correct / graded attempted x 100
//   window     = attempts completed in the last APTITUDE_WINDOW_DAYS days
//   eligible   = at least APTITUDE_MIN_GRADED graded answers in the window
//   counted    = answered, right/wrong-keyed questions only. Unanswered items,
//                partial-credit families (Situational Judgement, In-Tray),
//                rows without a completion time and duplicate rows (same row id,
//                or same test + completion time) are ignored.
//
// Case Drill (per comparable skill = skill + scoring rubric + score scale)
//   score      = mean of the 0-100 normalised rubric scores
//   eligible   = at least CASE_DRILL_MIN_DRILLS comparable scored drills
//   counted    = Question Library attempts (and micro-drills that carry a
//                rubric and scale marker). Legacy micro-drills with no marker
//                are never converted into a number. A question retaken later
//                counts once, with its latest score.
//
// Weakest = lowest rounded score per feature; ties go to the larger sample,
// then alphabetical. Next goal = next 5-percentage-point milestone strictly
// above the displayed score (capped at 100). It is a goal, not a prediction.
// Before/after = the same skill recomputed without its latest graded session,
// so the change shown is measured performance, never the target milestone.

import { answerEntries, isGradableAnswer } from './aptitudeProgress';

export const APTITUDE_MIN_GRADED = 10;
export const APTITUDE_WINDOW_DAYS = 90;
export const CASE_DRILL_MIN_DRILLS = 3;
export const GOAL_STEP_PP = 5;

export type FocusFeature = 'case_drill' | 'aptitude';

export interface AptitudeAttemptInput {
  id?: number | string | null;
  test_type?: string | null;
  test_id?: string | null;
  answers_json?: unknown;
  completed_at?: unknown;
  created_at?: unknown;
}

export interface CaseDrillAttemptInput {
  source?: 'library' | 'micro' | string | null;
  id?: number | string | null;
  question_id?: string | null;
  skill?: string | null;
  rubric_id?: string | null;
  scale?: number | string | null;
  overall_score?: number | string | null;
  score?: number | string | null;
  completed_on?: unknown;
  updated_at?: unknown;
}

interface AptitudeSample {
  attemptId: string;
  time: number;
  category: string;
  attempted: number;
  correct: number;
}

interface CaseDrillSample {
  id: string;
  questionKey: string;
  skill: string;
  rubric: string;
  scale: number;
  pct: number;
  time: number;
}

interface SkillStat {
  key: string;
  skillId: string;
  label: string;
  rawScore: number;
  score: number;
  count: number;
  correct: number;
  attempted: number;
  rubricId: string | null;
  latestId: string;
  latestTime: number;
}

export interface FocusDelta {
  before: number;
  after: number;
  deltaPp: number;
  latestTime: number;
}

export interface FocusSkill {
  feature: FocusFeature;
  /** Aptitude family / category id, or Case Drill Question Library skill id. */
  skillId: string;
  label: string;
  score: number;
  count: number;
  correct: number;
  attempted: number;
  rubricId: string | null;
  sampleText: string;
  /** Next 5pp milestone strictly above `score`; null once the score is 100%. */
  goal: number | null;
  goalPp: number | null;
  goalReached: boolean;
  delta: FocusDelta | null;
  previousWeakest: { label: string; score: number } | null;
}

export interface FocusEmpty {
  need: number;
  have: number;
  closestLabel: string | null;
}

export type FocusTile =
  | { status: 'ready'; skill: FocusSkill }
  | ({ status: 'empty' } & FocusEmpty);

export interface SkillFocus {
  aptitude: FocusTile;
  caseDrill: FocusTile;
}

const APTITUDE_LABELS: Record<string, string> = {
  diagrammatic: 'Diagrammatic Reasoning',
  inductive: 'Inductive Reasoning',
  deductive: 'Deductive Reasoning',
  error_checking: 'Error Checking',
  spatial: 'Spatial Reasoning',
  numerical: 'Numerical Reasoning',
  verbal: 'Verbal Reasoning',
  situational: 'Situational Judgement',
  logical: 'Logical Reasoning',
  critical: 'Critical Thinking',
  mechanical: 'Mechanical Reasoning',
  in_tray: 'In-Tray / E-Tray',
};

const CASE_SKILL_LABELS: Record<string, string> = {
  charts: 'Charts',
  structures: 'Structures',
  calculations: 'Calculations',
  creativity: 'Creativity',
  'market-sizing': 'Market Sizing',
  'case-math': 'Case Math',
};

export function aptitudeCategoryLabel(category: string): string {
  return APTITUDE_LABELS[category] || titleCase(category);
}

export function caseSkillLabel(skill: string): string {
  return CASE_SKILL_LABELS[skill] || titleCase(skill);
}

function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function timeOf(...values: unknown[]): number {
  for (const value of values) {
    if (value == null || value === '') continue;
    const time = new Date(value as string).getTime();
    if (Number.isFinite(time) && time > 0) return time;
  }
  return 0;
}

function numberOf(value: unknown): number | null {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function wasAnswered(entry: Record<string, unknown>): boolean {
  if (typeof entry.answered === 'boolean') return entry.answered;
  const chosen = entry.chosen;
  if (chosen === null || chosen === undefined) return false;
  if (typeof chosen === 'string') return chosen.trim() !== '';
  return true;
}

/* ----------------------------------------------------------------------------
 * Normalisation
 * --------------------------------------------------------------------------*/

export function normalizeAptitudeAttempts(rows: readonly AptitudeAttemptInput[]): AptitudeSample[] {
  const seenIds = new Set<string>();
  const seenSignatures = new Set<string>();
  const samples: AptitudeSample[] = [];
  rows.forEach((row, index) => {
    if (!row) return;
    const time = timeOf(row.completed_at, row.created_at);
    if (!time) return;
    const rowId = row.id != null && row.id !== '' ? String(row.id) : '';
    const attemptId = `apt:${rowId || `${row.test_type || ''}:${row.test_id || ''}:${time}:${index}`}`;
    const signature = `${row.test_type || ''}|${row.test_id || ''}|${time}`;
    if (seenIds.has(attemptId) || seenSignatures.has(signature)) return;
    seenIds.add(attemptId);
    seenSignatures.add(signature);

    const seenQuestions = new Set<string>();
    const byCategory = new Map<string, { attempted: number; correct: number }>();
    answerEntries(row.answers_json).forEach((entry) => {
      if (!isGradableAnswer(entry, row.test_type ?? null) || !wasAnswered(entry)) return;
      const questionId = typeof entry.question_id === 'string' ? entry.question_id : '';
      if (questionId) {
        if (seenQuestions.has(questionId)) return;
        seenQuestions.add(questionId);
      }
      const category = String(typeof entry.source_category === 'string' && entry.source_category ? entry.source_category : row.test_type || '').trim();
      if (!category) return;
      const bucket = byCategory.get(category) || { attempted: 0, correct: 0 };
      bucket.attempted += 1;
      if (entry.is_correct === true) bucket.correct += 1;
      byCategory.set(category, bucket);
    });
    byCategory.forEach((bucket, category) => {
      samples.push({ attemptId, time, category, attempted: bucket.attempted, correct: bucket.correct });
    });
  });
  return samples;
}

export function normalizeCaseDrillAttempts(rows: readonly CaseDrillAttemptInput[]): CaseDrillSample[] {
  const seen = new Set<string>();
  const samples: CaseDrillSample[] = [];
  rows.forEach((row) => {
    if (!row) return;
    const source = row.source === 'micro' ? 'micro' : 'library';
    if (row.id == null || row.id === '') return;
    const id = `${source}:${row.id}`;
    if (seen.has(id)) return;
    seen.add(id);
    const scale = numberOf(row.scale);
    const rubric = String(row.rubric_id || '').trim();
    const skill = String(row.skill || '').trim().toLowerCase().replace(/_/g, '-');
    const time = timeOf(row.completed_on, row.updated_at);
    const overall = numberOf(row.overall_score) ?? numberOf(row.score);
    if (!scale || scale <= 0 || !rubric || !skill || !time || overall == null) return;
    samples.push({
      id,
      questionKey: source === 'library' ? `lib:${row.question_id || row.id}` : id,
      skill,
      rubric,
      scale,
      pct: Math.min(100, Math.max(0, (overall / scale) * 100)),
      time,
    });
  });
  return samples;
}

/* ----------------------------------------------------------------------------
 * Evaluation
 * --------------------------------------------------------------------------*/

function compareWeakest(a: SkillStat, b: SkillStat): number {
  return a.score - b.score || b.count - a.count || a.label.localeCompare(b.label);
}

function evaluateAptitude(samples: readonly AptitudeSample[], now: number, excludeAttempt?: string) {
  const cutoff = now - APTITUDE_WINDOW_DAYS * 86400000;
  const groups = new Map<string, SkillStat>();
  samples.forEach((sample) => {
    if (sample.attemptId === excludeAttempt || sample.time < cutoff || sample.time > now + 86400000) return;
    const existing = groups.get(sample.category) || {
      key: sample.category,
      skillId: sample.category,
      label: aptitudeCategoryLabel(sample.category),
      rawScore: 0,
      score: 0,
      count: 0,
      correct: 0,
      attempted: 0,
      rubricId: null,
      latestId: sample.attemptId,
      latestTime: sample.time,
    };
    existing.attempted += sample.attempted;
    existing.correct += sample.correct;
    existing.count = existing.attempted;
    if (sample.time >= existing.latestTime) {
      existing.latestTime = sample.time;
      existing.latestId = sample.attemptId;
    }
    groups.set(sample.category, existing);
  });
  const all = [...groups.values()].filter((stat) => stat.attempted > 0);
  all.forEach((stat) => {
    stat.rawScore = (stat.correct / stat.attempted) * 100;
    stat.score = Math.round(stat.rawScore);
  });
  return { all, eligible: all.filter((stat) => stat.attempted >= APTITUDE_MIN_GRADED), min: APTITUDE_MIN_GRADED };
}

function evaluateCaseDrill(samples: readonly CaseDrillSample[], excludeId?: string) {
  const latestPerQuestion = new Map<string, CaseDrillSample>();
  samples.forEach((sample) => {
    if (sample.id === excludeId) return;
    const key = `${sample.skill}|${sample.rubric}|${sample.scale}|${sample.questionKey}`;
    const current = latestPerQuestion.get(key);
    if (!current || sample.time > current.time || (sample.time === current.time && sample.id > current.id)) {
      latestPerQuestion.set(key, sample);
    }
  });
  const groups = new Map<string, { stat: SkillStat; total: number }>();
  latestPerQuestion.forEach((sample) => {
    const key = `${sample.skill}|${sample.rubric}|${sample.scale}`;
    const entry = groups.get(key) || {
      stat: {
        key,
        skillId: sample.skill,
        label: caseSkillLabel(sample.skill),
        rawScore: 0,
        score: 0,
        count: 0,
        correct: 0,
        attempted: 0,
        rubricId: sample.rubric,
        latestId: sample.id,
        latestTime: sample.time,
      },
      total: 0,
    };
    entry.total += sample.pct;
    entry.stat.count += 1;
    if (sample.time >= entry.stat.latestTime) {
      entry.stat.latestTime = sample.time;
      entry.stat.latestId = sample.id;
    }
    groups.set(key, entry);
  });
  const all = [...groups.values()].map(({ stat, total }) => {
    stat.rawScore = total / stat.count;
    stat.score = Math.round(stat.rawScore);
    return stat;
  });
  return { all, eligible: all.filter((stat) => stat.count >= CASE_DRILL_MIN_DRILLS), min: CASE_DRILL_MIN_DRILLS };
}

export function nextGoal(score: number): { goal: number | null; goalPp: number | null; reached: boolean } {
  const rounded = Math.round(score);
  if (rounded >= 100) return { goal: null, goalPp: null, reached: true };
  const goal = Math.min(100, (Math.floor(rounded / GOAL_STEP_PP) + 1) * GOAL_STEP_PP);
  return { goal, goalPp: goal - rounded, reached: false };
}

type Evaluation = { all: SkillStat[]; eligible: SkillStat[]; min: number };

function buildTile(
  feature: FocusFeature,
  current: Evaluation,
  evaluateWithout: (latestId: string) => Evaluation,
): FocusTile {
  if (current.eligible.length === 0) {
    const closest = current.all.slice().sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))[0];
    const have = closest ? closest.count : 0;
    return { status: 'empty', need: Math.max(1, current.min - have), have, closestLabel: closest ? closest.label : null };
  }
  const weakest = current.eligible.slice().sort(compareWeakest)[0];
  const before = evaluateWithout(weakest.latestId);
  const beforeSame = before.eligible.find((stat) => stat.key === weakest.key) || null;
  const beforeWeakest = before.eligible.slice().sort(compareWeakest)[0] || null;
  const goal = nextGoal(weakest.score);
  return {
    status: 'ready',
    skill: {
      feature,
      skillId: weakest.skillId,
      label: weakest.label,
      score: weakest.score,
      count: weakest.count,
      correct: weakest.correct,
      attempted: weakest.attempted,
      rubricId: weakest.rubricId,
      sampleText: feature === 'aptitude'
        ? `${weakest.correct}/${weakest.attempted} correct`
        : `${weakest.count} rated drill${weakest.count === 1 ? '' : 's'}`,
      goal: goal.goal,
      goalPp: goal.goalPp,
      goalReached: goal.reached,
      delta: beforeSame
        ? { before: beforeSame.score, after: weakest.score, deltaPp: weakest.score - beforeSame.score, latestTime: weakest.latestTime }
        : null,
      previousWeakest: beforeWeakest && beforeWeakest.key !== weakest.key
        ? { label: beforeWeakest.label, score: beforeWeakest.score }
        : null,
    },
  };
}

export function computeSkillFocus(
  aptitudeRows: readonly AptitudeAttemptInput[],
  caseDrillRows: readonly CaseDrillAttemptInput[],
  now: number = Date.now(),
): SkillFocus {
  const aptitudeSamples = normalizeAptitudeAttempts(aptitudeRows);
  const caseSamples = normalizeCaseDrillAttempts(caseDrillRows);
  return {
    aptitude: buildTile(
      'aptitude',
      evaluateAptitude(aptitudeSamples, now),
      (latestId) => evaluateAptitude(aptitudeSamples, now, latestId),
    ),
    caseDrill: buildTile(
      'case_drill',
      evaluateCaseDrill(caseSamples),
      (latestId) => evaluateCaseDrill(caseSamples, latestId),
    ),
  };
}

export interface FocusAnnotation {
  feature: FocusFeature;
  score: number;
  goal: number | null;
  goalPp: number | null;
  goalReached: boolean;
}

/** The weakest skill's score and goal, for the recommendation card of the same topic. */
export function focusAnnotationFor(
  focus: SkillFocus | null,
  group: 'aptitude' | 'case_drill' | 'domain',
  contentId: string,
): FocusAnnotation | null {
  if (!focus || group === 'domain') return null;
  const tile = group === 'aptitude' ? focus.aptitude : focus.caseDrill;
  if (tile.status !== 'ready' || tile.skill.skillId !== contentId) return null;
  const { feature, score, goal, goalPp, goalReached } = tile.skill;
  return { feature, score, goal, goalPp, goalReached };
}
