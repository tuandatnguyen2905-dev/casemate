// Casemate — Aptitude Test server side: the `get_aptitude_test_info` MCP tool
// Mate can call mid-conversation, and the workspace hook behind it.
//
// WHY A HOOK AND NOT A DIRECT DB READ: a customer-tools registry entry can only
// call an allow-listed endpoint, and it carries the visitor's session rather
// than a workspace DB token. So the tool points at this hook's public execute
// alias (/api/hooks/execute/workspace-539150/casemate-aptitude-info-v1); the
// platform forwards X-Session-Id, and the hook resolves that into the
// candidate's own aptitude_attempts rows.
//
// The hook answers two different questions in one call, because Mate normally
// needs both at once:
//   1. WHAT EXISTS — all eight live aptitude families and every test with its
//      question count, time limit and difficulty range.
//   2. HOW THIS CANDIDATE IS DOING — attempts, best score, most recent score.
//
// KEEPING THE CATALOGUE IN SYNC: the hook cannot import
// lib/diagrammaticLibrary.ts (it runs in a sandbox with no module loader), so
// the test list is rebuilt below with the same 3×10 structure. Bump
// CATALOGUE_VERSION whenever the library changes and the next app open
// re-deploys the hook automatically.

const WORKSPACE_ID = 'workspace-539150';

export const APTITUDE_HOOK_NAME = 'casemate-aptitude-info-v1';
export const APTITUDE_TOOL_NAME = 'get_aptitude_test_info';

/** Bump when the question bank or the family list changes. */
const CATALOGUE_VERSION = 'aptitude-catalogue-v10-all-eight-families';

const APTITUDE_HOOK_DESCRIPTION =
  'Casemate Aptitude Test info service. Backs the get_aptitude_test_info MCP tool: returns all eight live aptitude '
  + 'families and every Diagrammatic, Inductive, Deductive, Error Checking, Spatial, Numerical, Verbal and '
  + 'Situational Judgement test with its question count, timing and difficulty range, and — scoped to the calling visitor '
  + 'via X-Session-Id, an email, or a user_key — their attempt count, best score and most recent score from the '
  + 'aptitude_attempts table. Read-only. '
  + `(${CATALOGUE_VERSION})`;

const APTITUDE_HOOK_CODE = String.raw`
const body = request.body || {};
const query = request.query || {};
const headers = request.headers || {};

// The 30 Diagrammatic tests, mirroring lib/diagrammaticLibrary.ts: 10 per
// difficulty level, 30 questions each. Odd-numbered tests are the matrix /
// sequence format, even-numbered tests are Set A / Set B classification.
const LEVELS = [
  ['easy', 'Easy', 20, 'one predictable rule per question'],
  ['medium', 'Medium', 25, 'two rules running at the same time'],
  ['hard', 'Hard', 30, 'three or more simultaneous rules with near-miss distractors'],
];
const TESTS = [];
LEVELS.forEach(function (level) {
  for (var i = 1; i <= 10; i += 1) {
    var isMatrix = i % 2 === 1;
    TESTS.push({
      id: 'dr-' + level[0] + '-' + (i < 10 ? '0' : '') + i,
      name: level[1] + ' Test ' + i,
      format: isMatrix ? 'matrix' : 'set_ab',
      questions: 30,
      minutes: level[2],
      difficulty: level[1] + ' (' + level[3] + ')',
      focus: isMatrix
        ? '3x3 matrices and 4-5 step sequences: find the hidden rule and pick the missing figure from five options.'
        : 'Set A / Set B classification: work out both set rules, then decide whether the question figure belongs to set A, set B, or neither.',
    });
  }
});

// The 30 Inductive Reasoning tests, mirroring lib/inductiveLibrary.ts: 30
// questions each, 25 minutes, every question running exactly two rules.
const INDUCTIVE_TESTS = [];
for (var it = 1; it <= 30; it += 1) {
  INDUCTIVE_TESTS.push({
    id: 'ir-' + (it < 10 ? '0' : '') + it,
    name: 'Inductive Test ' + it,
    format: 'sequence',
    questions: 30,
    minutes: 25,
    focus: 'A sequence of five figures runs under exactly two rules; pick the sixth figure from five options A-E.',
  });
}

// The 30 Deductive Reasoning tests, mirroring lib/deductiveLibrary.ts: 30
// questions each, 25 minutes. Ten tests are Easy, ten Medium and ten Hard;
// the original Tests 1-10 retain their established difficulty.
const DEDUCTIVE_TESTS = [];
for (var dt = 1; dt <= 30; dt += 1) {
  var dtier = dt <= 3 || (dt >= 11 && dt <= 17)
    ? 'Easy'
    : (dt >= 4 && dt <= 6) || (dt >= 18 && dt <= 24)
      ? 'Medium'
      : 'Hard';
  DEDUCTIVE_TESTS.push({
    id: 'dr-' + (dt < 10 ? '0' : '') + dt,
    name: 'Deductive Test ' + dt,
    format: 'premises',
    questions: 30,
    minutes: 25,
    difficulty: dtier,
    focus: 'A passage of premises (syllogisms, if-then arguments, rankings, prices, plan tables) and a statement to judge: True, False, or Insufficient Information — plus five-option "which plan fits" table questions.',
  });
}

// The 30 Error Checking tests, mirroring lib/errorCheckingLibrary.ts: 30
// questions each, 10 minutes (20 seconds a question). Ten tests are Easy, ten
// Medium and ten Hard; the original Tests 1-10 retain their established difficulty.
const ERROR_CHECKING_TESTS = [];
for (var ec = 1; ec <= 30; ec += 1) {
  var ectier = ec <= 3 || (ec >= 11 && ec <= 17)
    ? 'Easy'
    : (ec >= 4 && ec <= 6) || (ec >= 18 && ec <= 24)
      ? 'Medium'
      : 'Hard';
  ERROR_CHECKING_TESTS.push({
    id: 'ec-' + (ec < 10 ? '0' : '') + ec,
    name: 'Error Checking Test ' + ec,
    format: 'data_tables',
    questions: 30,
    minutes: 10,
    difficulty: ectier,
    focus: 'An original data table and a hand-copied version: count the errors in a row, spot which column or row holds the mistake, judge the whole-table error count, or pick the correct version of a value from five near-miss options.',
  });
}

// The 30 Spatial Reasoning tests, mirroring lib/spatialLibrary.ts: 30 questions
// each, 20 minutes, with a 9 Easy / 12 Medium / 9 Hard mix in every test.
const SPATIAL_TESTS = [];
for (var sr = 1; sr <= 30; sr += 1) {
  SPATIAL_TESTS.push({
    id: 'sr-' + (sr < 10 ? '0' : '') + sr,
    name: 'Test ' + sr,
    format: 'mixed_visual',
    questions: 30,
    minutes: 20,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: '2D rotation, reflection, odd-one-out, sequences, matrix completion, 3D folding, 3D unfolding, isometric block rotation, top views and piece assembly; four SVG options A-D.',
  });
}

// The 30 Numerical Reasoning tests: six original responsive data exhibits per
// test, five A-D calculation questions each, 30 minutes and a 9/12/9 mix.
const NUMERICAL_TESTS = [];
for (var nr = 1; nr <= 30; nr += 1) {
  NUMERICAL_TESTS.push({
    id: 'nr-' + (nr < 10 ? '0' : '') + nr,
    name: 'Numerical Test ' + nr,
    format: 'responsive_data_tables',
    questions: 30,
    minutes: 30,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'Original FMCG, banking, workforce, demographic, market-share and financial tables; A-D questions on lookups, totals, ratios, percentages, weighted averages and projections.',
  });
}

// The 30 Verbal Reasoning tests: six original business passages per test, five
// True / False / Cannot Say statements each, 25 minutes and a 9/12/9 mix.
const VERBAL_TESTS = [];
for (var vr = 1; vr <= 30; vr += 1) {
  VERBAL_TESTS.push({
    id: 'vr-' + (vr < 10 ? '0' : '') + vr,
    name: 'Verbal Test ' + vr,
    format: 'passage_statements',
    questions: 30,
    minutes: 25,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'Six original passages on Vietnamese business, banking, technology, healthcare and social trends; judge each statement True, False or Cannot Say using only the passage.',
  });
}

// The 30 Situational Judgement tests, mirroring
// lib/situationalJudgement.ts: 30 untimed questions each, with five forced
// ratings and a 9 Easy / 12 Medium / 9 Hard mix in every test.
const SITUATIONAL_TESTS = [];
for (var sjt = 1; sjt <= 30; sjt += 1) {
  SITUATIONAL_TESTS.push({
    id: 'sjt-' + (sjt < 10 ? '0' : '') + sjt,
    name: 'Test ' + sjt,
    format: 'forced_rating',
    questions: 30,
    minutes: null,
    difficulty: 'Mixed (9 Easy, 12 Medium, 9 Hard)',
    focus: 'A workplace scenario with five actions; assign Very Effective, Effective, Slightly Effective, Ineffective and Counterproductive exactly once. Proximity to the model order earns partial credit.',
  });
}

const FAMILIES = [
  { id: 'diagrammatic', name: 'Diagrammatic Reasoning', status: 'available' },
  { id: 'inductive', name: 'Inductive Reasoning', status: 'available' },
  { id: 'deductive', name: 'Deductive Reasoning', status: 'available' },
  { id: 'error_checking', name: 'Error Checking', status: 'available' },
  { id: 'spatial', name: 'Spatial Reasoning', status: 'available' },
  { id: 'numerical', name: 'Numerical Reasoning', status: 'available' },
  { id: 'verbal', name: 'Verbal Reasoning', status: 'available' },
  { id: 'situational', name: 'Situational Judgement', status: 'available' },
];

function pick(name) {
  return body[name] != null ? body[name] : query[name];
}

function headerValue(name) {
  const keys = Object.keys(headers || {});
  for (let i = 0; i < keys.length; i += 1) {
    if (String(keys[i]).toLowerCase() === name) return headers[keys[i]];
  }
  return null;
}

const emailRaw = String(pick('email') || '').trim().toLowerCase();
const email = emailRaw.indexOf('@') > 0 ? emailRaw : '';
const explicitUserKey = String(pick('user_key') || '').trim();
const sessionId = String(pick('session_id') || headerValue('x-session-id') || '').trim();

function clock(seconds) {
  if (seconds == null) return null;
  const total = Math.max(0, Math.round(Number(seconds)));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return minutes + ':' + (rest < 10 ? '0' : '') + rest;
}

function shape(row) {
  return {
    test_id: row.test_id,
    test_name: row.test_name,
    score: Number(row.score),
    total: Number(row.total),
    percent: row.percent == null ? null : Number(row.percent),
    duration: clock(row.duration_seconds),
    timed_out: row.timed_out === true,
    taken_at: row.completed_at || row.created_at,
  };
}

async function loadAttempts() {
  // Preference order: an explicit key the caller passed, then the signed-in
  // email, then the visitor session the platform forwarded with the tool call.
  const wheres = [];
  if (explicitUserKey) wheres.push({ user_key: explicitUserKey });
  if (email) wheres.push({ user_key: 'email:' + email });
  if (sessionId) wheres.push({ session_id: sessionId });
  for (let i = 0; i < wheres.length; i += 1) {
    const result = await db.query('aptitude_attempts', {
      where: wheres[i],
      orderBy: [{ column: 'created_at', direction: 'desc' }],
      limit: 50,
    });
    const rows = result && result.rows ? result.rows : [];
    if (rows.length) return rows;
  }
  return [];
}

try {
  const totalQuestions = TESTS.reduce(function (sum, t) { return sum + t.questions; }, 0);
  let rows = [];
  let lookupError = null;
  try {
    rows = await loadAttempts();
  } catch (error) {
    lookupError = error && error.message ? error.message : String(error);
    console.error('[aptitude-info] score lookup failed: ' + lookupError);
  }

  const diagrammatic = rows.filter(function (r) { return !r.test_type || r.test_type === 'diagrammatic'; });
  let best = null;
  diagrammatic.forEach(function (row) {
    if (!best || Number(row.score) > Number(best.score)) best = row;
  });
  const last = diagrammatic.length ? diagrammatic[0] : null;

  const inductive = rows.filter(function (r) { return r.test_type === 'inductive'; });
  let inductiveBest = null;
  inductive.forEach(function (row) {
    if (!inductiveBest || Number(row.score) > Number(inductiveBest.score)) inductiveBest = row;
  });
  const inductiveLast = inductive.length ? inductive[0] : null;

  const deductive = rows.filter(function (r) { return r.test_type === 'deductive'; });
  let deductiveBest = null;
  deductive.forEach(function (row) {
    if (!deductiveBest || Number(row.score) > Number(deductiveBest.score)) deductiveBest = row;
  });
  const deductiveLast = deductive.length ? deductive[0] : null;

  const errorChecking = rows.filter(function (r) { return r.test_type === 'error_checking'; });
  let errorCheckingBest = null;
  errorChecking.forEach(function (row) {
    if (!errorCheckingBest || Number(row.score) > Number(errorCheckingBest.score)) errorCheckingBest = row;
  });
  const errorCheckingLast = errorChecking.length ? errorChecking[0] : null;

  const spatial = rows.filter(function (r) { return r.test_type === 'spatial'; });
  let spatialBest = null;
  spatial.forEach(function (row) {
    if (!spatialBest || Number(row.score) > Number(spatialBest.score)) spatialBest = row;
  });
  const spatialLast = spatial.length ? spatial[0] : null;

  function summarizeFamily(type) {
    const entries = rows.filter(function (r) { return r.test_type === type; });
    let familyBest = null;
    entries.forEach(function (row) {
      if (!familyBest || Number(row.score) > Number(familyBest.score)) familyBest = row;
    });
    return { rows: entries, best: familyBest, last: entries.length ? entries[0] : null };
  }
  const numerical = summarizeFamily('numerical');
  const verbal = summarizeFamily('verbal');

  const situational = rows.filter(function (r) { return r.test_type === 'situational'; });
  let situationalBest = null;
  situational.forEach(function (row) {
    var rowPercent = row.percent == null ? Number(row.score) : Number(row.percent);
    var bestPercent = situationalBest && situationalBest.percent != null
      ? Number(situationalBest.percent)
      : situationalBest ? Number(situationalBest.score) : -1;
    if (!situationalBest || rowPercent > bestPercent) situationalBest = row;
  });
  const situationalLast = situational.length ? situational[0] : null;

  const perTest = {};
  diagrammatic.forEach(function (row) {
    const key = row.test_id;
    if (!perTest[key] || Number(row.score) > Number(perTest[key].score)) perTest[key] = row;
  });

  let summary =
    'Casemate has an Aptitude Test app covering 8 aptitude families. Diagrammatic Reasoning is live with '
    + TESTS.length + ' tests (' + totalQuestions
    + ' questions in total, 30 per test, each one timed), organised into three difficulty levels - Easy, '
    + 'Medium and Hard, 10 tests per level - filterable in the app, with a "random test at my level" option. '
    + 'Inductive Reasoning is also live with ' + INDUCTIVE_TESTS.length
    + ' tests (30 questions each, 25 minutes): a sequence of five figures runs under exactly two rules and the '
    + 'candidate picks the figure that comes next from five options A-E, with both rules explained afterwards. '
    + 'Deductive Reasoning is also live with ' + DEDUCTIVE_TESTS.length
    + ' tests (30 questions each, 25 minutes; ten Easy, ten Medium and ten Hard): a passage of premises and '
    + 'a statement to judge True / False / Insufficient Information, plus five-option plan-table questions, with '
    + 'the reasoning explained afterwards. '
    + 'Error Checking is also live with ' + ERROR_CHECKING_TESTS.length
    + ' tests (30 questions each, 10 minutes - 20 seconds a question; ten Easy, ten Medium and ten Hard): an '
    + 'original data table and a hand-copied version, and the candidate spots exactly where they differ - row '
    + 'error counts, locate the column or row, whole-table counts, and correct-version lookups - with every '
    + 'corrupted cell highlighted in the review afterwards. '
    + 'Spatial Reasoning is also live with ' + SPATIAL_TESTS.length
    + ' tests (30 questions each, 20 minutes; every test mixes 9 Easy, 12 Medium and 9 Hard): rotation, '
    + 'reflection, odd-one-out, spatial sequences, matrix completion, 3D folding and unfolding, isometric block '
    + 'rotation, top views and piece assembly, with four SVG options A-D and the rule explained afterwards. '
    + 'Numerical Reasoning is live with ' + NUMERICAL_TESTS.length
    + ' tests (30 questions each, 30 minutes; every test mixes 9 Easy, 12 Medium and 9 Hard): six original responsive data tables on FMCG, banking, workforce, demographics, market share and financials, with four A-D choices and worked calculations. '
    + 'Verbal Reasoning is live with ' + VERBAL_TESTS.length
    + ' tests (30 questions each, 25 minutes; every test mixes 9 Easy, 12 Medium and 9 Hard): six original business passages per test, each followed by five True / False / Cannot Say statements and answer logic. '
    + 'Situational Judgement is live with ' + SITUATIONAL_TESTS.length
    + ' untimed tests (30 questions each; every test mixes 9 Easy, 12 Medium and 9 Hard): realistic Vietnamese MT and consulting workplace scenarios, five responses rated Very Effective through Counterproductive, each label used once, with proximity partial credit and model-answer review. '
    + 'All eight families are live and free - no Casemate Pro needed. The whole app is in English on purpose, because the real aptitude round is sat in English.';
  if (verbal.last) {
    summary += ' Their most recent Verbal Reasoning attempt was ' + (verbal.last.test_name || verbal.last.test_id)
      + ', scoring ' + verbal.last.score + '/' + verbal.last.total + '.';
  }
  if (numerical.last) {
    summary += ' Their most recent Numerical Reasoning attempt was ' + (numerical.last.test_name || numerical.last.test_id)
      + ', scoring ' + numerical.last.score + '/' + numerical.last.total + '.';
  }
  if (situationalLast) {
    summary += ' Their most recent Situational Judgement attempt was ' + (situationalLast.test_name || situationalLast.test_id)
      + ', matching ' + (situationalLast.percent == null ? situationalLast.score + '/' + situationalLast.total : situationalLast.percent + '%') + ' of the model judgement.';
  }
  if (spatialLast) {
    summary += ' Their most recent Spatial Reasoning attempt was ' + (spatialLast.test_name || spatialLast.test_id)
      + ', scoring ' + spatialLast.score + '/' + spatialLast.total + '.';
  }
  if (errorCheckingLast) {
    summary += ' Their most recent Error Checking attempt was ' + (errorCheckingLast.test_name || errorCheckingLast.test_id)
      + ', scoring ' + errorCheckingLast.score + '/' + errorCheckingLast.total + '.';
  }
  if (deductiveLast) {
    summary += ' Their most recent Deductive Reasoning attempt was ' + (deductiveLast.test_name || deductiveLast.test_id)
      + ', scoring ' + deductiveLast.score + '/' + deductiveLast.total + '.';
  }
  if (inductiveLast) {
    summary += ' Their most recent Inductive Reasoning attempt was ' + (inductiveLast.test_name || inductiveLast.test_id)
      + ', scoring ' + inductiveLast.score + '/' + inductiveLast.total + '.';
  }
  if (last) {
    summary += ' Their most recent attempt was ' + (last.test_name || last.test_id) + ', scoring '
      + last.score + '/' + last.total + '.';
    if (best && best.id !== last.id) {
      summary += ' Their best score is ' + best.score + '/' + best.total
        + ' on ' + (best.test_name || best.test_id) + '.';
    }
  } else if (!verbal.last && !numerical.last && !situationalLast && !spatialLast && !errorCheckingLast && !deductiveLast && !inductiveLast) {
    summary += ' This candidate has not taken an aptitude test yet - suggest starting with Easy Test 1.';
  }

  respond(200, {
    success: true,
    app: {
      id: 'aptitude-test',
      name: 'Aptitude Test',
      free: true,
      language: 'English (questions, answer options and rule explanations)',
      note: 'No paywall - every test is free.',
    },
    families: FAMILIES,
    diagrammatic: {
      status: 'available',
      tests: TESTS,
      test_count: TESTS.length,
      total_questions: totalQuestions,
      difficulty_levels: ['Easy (10 tests)', 'Medium (10 tests)', 'Hard (10 tests)'],
      formats: [
        '3x3 matrix with the last cell missing, pick 1 of 5 options A-E',
        'A 4 or 5 step sequence, pick the next figure from 5 options A-E',
        'Set A / Set B: does the question figure belong to set A, set B, or neither',
      ],
      rule_types: ['rotation', 'mirror flip', 'fill style', 'size', 'count', 'position', 'shape type', 'colour', 'total straight edges', 'odd/even count', 'curved vs straight'],
    },
    inductive: {
      status: 'available',
      tests: INDUCTIVE_TESTS,
      test_count: INDUCTIVE_TESTS.length,
      total_questions: INDUCTIVE_TESTS.length * 30,
      format: 'A sequence of five figures runs under exactly two rules; pick the sixth figure from five options A-E, with both rules explained after submission.',
      rule_types: ['rotation', 'movement clockwise / anticlockwise', 'fill alternation', 'number of sides', 'shaded-segment rotation', 'count increment', 'mirroring', 'grid position', 'notches', 'bar level'],
    },
    deductive: {
      status: 'available',
      tests: DEDUCTIVE_TESTS,
      test_count: DEDUCTIVE_TESTS.length,
      total_questions: DEDUCTIVE_TESTS.length * 30,
      difficulty_levels: ['Easy (Tests 1-3, 11-17)', 'Medium (Tests 4-6, 18-24)', 'Hard (Tests 7-10, 25-30)'],
      format: 'A passage of premises and a statement to judge: True, False, or Insufficient Information — plus five-option "which plan fits" table questions, with the reasoning explained after submission.',
      question_families: ['syllogisms', 'conditional (if-then) arguments', 'ranking & ordering', 'numeric relationships', 'plan-selection tables'],
    },
    error_checking: {
      status: 'available',
      tests: ERROR_CHECKING_TESTS,
      test_count: ERROR_CHECKING_TESTS.length,
      total_questions: ERROR_CHECKING_TESTS.length * 30,
      difficulty_levels: ['Easy (Tests 1-3, 11-17)', 'Medium (Tests 4-6, 18-24)', 'Hard (Tests 7-10, 25-30)'],
      format: 'An original data table and a hand-copied version rendered side by side; the candidate spots exactly where they differ at 20 seconds a question, with every corrupted cell highlighted after submission.',
      question_families: ['row error counts', 'correct-version lookups', 'locate the column', 'locate the row', 'whole-table error counts'],
      error_types: ['adjacent characters transposed', 'digit changed', 'letter changed', 'letter case flipped', 'look-alike characters (0/O, 1/I, 5/S, 8/B, 2/Z, 6/G) at hard level'],
    },
    spatial: {
      status: 'available',
      tests: SPATIAL_TESTS,
      test_count: SPATIAL_TESTS.length,
      total_questions: SPATIAL_TESTS.length * 30,
      difficulty_levels: ['Mixed per test: 9 Easy, 12 Medium, 9 Hard'],
      format: 'Original responsive SVG visuals with four options A-D; 30 questions and 20 minutes per test.',
      question_families: ['2D rotation', 'reflection', 'rotation odd-one-out', 'spatial sequences', 'matrix completion', '3D folding', '3D unfolding', 'isometric block rotation', 'top views', 'piece assembly'],
    },
    numerical: {
      status: 'available',
      tests: NUMERICAL_TESTS,
      test_count: NUMERICAL_TESTS.length,
      total_questions: NUMERICAL_TESTS.length * 30,
      difficulty_levels: ['Mixed per test: 9 Easy, 12 Medium, 9 Hard'],
      format: 'Six original responsive data tables per test, each followed by five A-D calculation questions; 30 questions and 30 minutes.',
      question_families: ['table lookup', 'totals', 'ratios', 'percentage change', 'weighted averages', 'multi-step projections'],
    },
    verbal: {
      status: 'available',
      tests: VERBAL_TESTS,
      test_count: VERBAL_TESTS.length,
      total_questions: VERBAL_TESTS.length * 30,
      difficulty_levels: ['Mixed per test: 9 Easy, 12 Medium, 9 Hard'],
      format: 'Six original 150-250 word passages per test, each followed by five statements answered True, False or Cannot Say; 30 questions and 25 minutes.',
      topics: ['business', 'banking', 'FMCG', 'technology', 'healthcare', 'workforce and social trends'],
    },
    situational: {
      status: 'available',
      tests: SITUATIONAL_TESTS,
      test_count: SITUATIONAL_TESTS.length,
      total_questions: SITUATIONAL_TESTS.length * 30,
      difficulty_levels: ['Mixed per test: 9 Easy, 12 Medium, 9 Hard'],
      format: 'Untimed forced rating: five workplace responses receive Very Effective, Effective, Slightly Effective, Ineffective and Counterproductive exactly once; proximity to the model order earns partial credit.',
      competency_families: ['planning and organising', 'people and relationships', 'analysis and decision-making', 'professional integrity', 'client service', 'collaboration', 'governance', 'change leadership'],
    },
    user: {
      identified: !!(explicitUserKey || email || sessionId),
      found: diagrammatic.length > 0,
      attempts: diagrammatic.length,
      best: best ? shape(best) : null,
      last: last ? shape(last) : null,
      best_per_test: Object.keys(perTest).map(function (key) { return shape(perTest[key]); }),
      inductive: {
        found: inductive.length > 0,
        attempts: inductive.length,
        best: inductiveBest ? shape(inductiveBest) : null,
        last: inductiveLast ? shape(inductiveLast) : null,
      },
      deductive: {
        found: deductive.length > 0,
        attempts: deductive.length,
        best: deductiveBest ? shape(deductiveBest) : null,
        last: deductiveLast ? shape(deductiveLast) : null,
      },
      error_checking: {
        found: errorChecking.length > 0,
        attempts: errorChecking.length,
        best: errorCheckingBest ? shape(errorCheckingBest) : null,
        last: errorCheckingLast ? shape(errorCheckingLast) : null,
      },
      spatial: {
        found: spatial.length > 0,
        attempts: spatial.length,
        best: spatialBest ? shape(spatialBest) : null,
        last: spatialLast ? shape(spatialLast) : null,
      },
      numerical: {
        found: numerical.rows.length > 0,
        attempts: numerical.rows.length,
        best: numerical.best ? shape(numerical.best) : null,
        last: numerical.last ? shape(numerical.last) : null,
      },
      verbal: {
        found: verbal.rows.length > 0,
        attempts: verbal.rows.length,
        best: verbal.best ? shape(verbal.best) : null,
        last: verbal.last ? shape(verbal.last) : null,
      },
      situational: {
        found: situational.length > 0,
        attempts: situational.length,
        best: situationalBest ? shape(situationalBest) : null,
        last: situationalLast ? shape(situationalLast) : null,
      },
      lookup_error: lookupError,
    },
    summary: summary,
  });
} catch (error) {
  console.error('[aptitude-info] failed', error);
  respond(500, {
    success: false,
    error: 'Could not read the aptitude test info: ' + (error && error.message ? error.message : String(error)),
  });
}
`;

/* ============================================================================
 * MCP tool registry entry
 * ==========================================================================*/

interface CustomerToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description?: string; required?: boolean }>;
  action: {
    type: 'api_call';
    method: 'GET' | 'POST';
    endpoint: string;
    bodyMapping?: Record<string, string>;
  };
}

const APTITUDE_TOOL: CustomerToolDefinition = {
  name: APTITUDE_TOOL_NAME,
  description:
    'Look up Casemate’s Aptitude Test app. Call this whenever the candidate asks about aptitude tests, '
    + 'diagrammatic / inductive / deductive / logical / abstract / spatial / numerical / verbal reasoning, error checking / data accuracy, '
    + 'situational judgement / SJT tests, the aptitude round at an MT programme, what practice tests exist, how many questions or how long '
    + 'a test takes, or how they did on a test they already took. '
    + 'Returns all eight live aptitude families and every Diagrammatic, Inductive, Deductive, Error Checking, Spatial, Numerical, Verbal and '
    + 'Situational Judgement test with its question count, timing, format and difficulty, '
    + 'and this candidate’s own attempt count, best score and most recent score. Two things to relay accurately: '
    + 'every test is FREE (never tell the candidate this app needs Casemate Pro), and the whole app is in '
    + 'ENGLISH on purpose, because the real aptitude round is sat in English.',
  parameters: {
    email: {
      type: 'string',
      required: false,
      description:
        'The candidate’s sign-in email, if you know it. Optional — the platform already forwards their session, '
        + 'so leave this out unless the candidate explicitly gave you an email to look up.',
    },
  },
  action: {
    type: 'api_call',
    method: 'POST',
    endpoint: `/api/hooks/execute/${WORKSPACE_ID}/${APTITUDE_HOOK_NAME}`,
    bodyMapping: { email: 'email' },
  },
};

/* ============================================================================
 * Idempotent deployment (runs on app open and on space load)
 * ==========================================================================*/

let ensurePromise: Promise<void> | null = null;

async function ensureHook(): Promise<void> {
  const listResponse = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks`);
  if (!listResponse.ok) throw new Error('Could not list workspace hooks.');
  const payload = await listResponse.json();
  const hooks = Array.isArray(payload) ? payload : payload.hooks || [];
  const existing = hooks.find((hook: any) => hook.name === APTITUDE_HOOK_NAME);

  if (!existing) {
    const created = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: APTITUDE_HOOK_NAME,
        description: APTITUDE_HOOK_DESCRIPTION,
        code: APTITUDE_HOOK_CODE,
        language: 'javascript',
        enabled: true,
      }),
    });
    if (!created.ok) throw new Error('Could not create the aptitude info hook.');
    return;
  }

  if (
    existing.description !== APTITUDE_HOOK_DESCRIPTION ||
    existing.code !== APTITUDE_HOOK_CODE ||
    existing.enabled !== true
  ) {
    const updated = await fetch(`/api/workspaces/${WORKSPACE_ID}/hooks/${existing.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: APTITUDE_HOOK_DESCRIPTION,
        code: APTITUDE_HOOK_CODE,
        enabled: true,
      }),
    });
    if (!updated.ok) throw new Error('Could not update the aptitude info hook.');
  }
}

async function ensureTool(): Promise<void> {
  const url = `/api/workspace-settings/${WORKSPACE_ID}/customer-tools`;
  const response = await fetch(url);
  let registry: { version: number; tools: CustomerToolDefinition[] } = { version: 1, tools: [] };
  if (response.ok) {
    const payload = await response.json();
    if (payload && payload.registry && Array.isArray(payload.registry.tools)) registry = payload.registry;
  } else if (response.status !== 404) {
    throw new Error(`Could not read the customer tools registry (${response.status}).`);
  }

  const current = registry.tools.find((tool) => tool.name === APTITUDE_TOOL_NAME);
  if (current && JSON.stringify(current) === JSON.stringify(APTITUDE_TOOL)) return;

  // Read-modify-write: PUT replaces the whole array, so every OTHER Casemate
  // tool (get_assessment_result, generate_practice_case, …) must be carried
  // over untouched.
  const next = {
    version: registry.version || 1,
    tools: registry.tools.filter((tool) => tool.name !== APTITUDE_TOOL_NAME).concat([APTITUDE_TOOL]),
  };
  const saved = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: next }),
  });
  if (!saved.ok) throw new Error(`Could not register ${APTITUDE_TOOL_NAME} (${saved.status}).`);
}

/**
 * Deploy (or refresh) the hook AND Mate's get_aptitude_test_info tool. Safe to
 * call on every mount — it only writes when something actually differs, and it
 * resolves at most once per page load.
 */
export function ensureAptitudeInfoHook(): Promise<void> {
  if (ensurePromise) return ensurePromise;
  ensurePromise = (async () => {
    await ensureHook();
    await ensureTool();
  })().catch((error) => {
    ensurePromise = null;
    console.warn('[aptitude-info] deployment failed:', error);
    throw error;
  });
  return ensurePromise;
}
