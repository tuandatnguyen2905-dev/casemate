// Casemate "Case Drill" micro-drills backend (v1).
//
// Where Case Pool (apps/CaseDrillLog) runs FULL cases end-to-end, this module
// powers the separate Case Drill app: CaseCoach-style rapid micro-drills. A
// candidate picks one sub-skill (Structures, Case Math, Market Sizing,
// Calculations, Charts, Creativity), gets a freshly generated prompt, works
// it against a short countdown, and receives instant feedback plus a model
// answer from Mate.
//
// Two things are ensured client-side on app load (same pattern as the Case
// Pool engine in apps/CaseDrillLog/serverFunctions.ts):
//   1. The `casemate-micro-drill-v1` server-functions hook (generate + grade).
//   2. The MCP customer-tools registry entries `generate_micro_drill` and
//      `grade_micro_drill`, so Mate can run and grade micro-drills straight
//      from the conversation. The registry is read-merge-written (never
//      clobbered), and the hook-execute endpoint shape is derived from the
//      existing Case Pool tool entries so both engines stay wired the same
//      way.
//
// v1.1 HARDENS THE PAYWALL: the hook's generate action verifies Casemate
// Pro server-side against platform-owned records (see the "Casemate Pro
// server-side boundary" block inside the hook code), so direct
// hook calls that bypass components/PaywallGate.tsx — or agent tool calls
// that slip past the prompt boundary — no longer create drills for
// non-subscribers. The grade action stays ungated so an already-generated
// drill can always be finished (graded or skipped) and nobody is left
// mid-rep. Non-subscribers get a structured HTTP 402
// { code: 'subscription_required', plan, upgrade, ... } that Mate relays
// warmly; transient verification failures return 503 instead so a platform
// hiccup never shows a paying member the upgrade screen.
//
// v1.3 TURNS THE RESULT INTO TEACHING-GRADE COACHING: grading now returns
// four structured sections instead of a short blurb - (1) how to approach
// this TYPE of drill (grader-tailored steps, with a curated per-skill
// playbook as fallback so the section never comes back empty), (2) the
// model answer, (3) feedback on the candidate's own answer (strengths /
// what was missing), and (4) 1-3 concrete next steps. Skipped or blank
// reps degrade gracefully: they still get the approach playbook, the model
// answer, and the next steps - just no score.
//
// v1.4 LOCKS THE "CASE MATH" FORMAT (founder-approved mold): a Case Math rep
// is no longer one bare question but a coherent linked mini-case, generated
// entirely in ENGLISH - (1) a named company + the decision its leadership
// must make, (2) a data table whose figures CHAIN into each other (one
// figure derives the next), (3) 3-4 stacked questions where each answer
// feeds the next, and (4) a detailed step-by-step worked solution: the
// actual arithmetic per step, the intermediate result, a short thinking tip
// per step, and a consultant-style closing interpretation. Generation runs a
// second self-check pass that recomputes every step against the data table
// and corrects (or regenerates) inconsistent numbers before the drill is
// saved, so a case never contradicts its own solution. The structured case
// (without the solution) travels in chart_json (format case_math_v1) and the
// structured solution in model_answer (JSON, format case_math_solution_v1);
// the app renders both with dedicated UI and old plain-text rows degrade
// gracefully.

import { CASEMATE_ENTITLEMENT_SNIPPET, ACCESS_RULES_VERSION } from '../../lib/proAccess';

export const MICRO_DRILL_HOOK_NAME = 'casemate-micro-drill-v1';
export const MICRO_DRILL_HOOK_VERSION = 'micro-drill-v1.5';
export const MICRO_DRILL_WORKSPACE_ID = 'workspace-539150';

// The Case Pool hook — used only to DERIVE the correct agent-tool endpoint
// shape from its already-registered, known-working registry entries.
const CASE_POOL_HOOK_NAME = 'casemate-case-drill-v4';

const HOOK_DESCRIPTION = `Casemate Case Drill micro-drill engine: generates short timed sub-skill reps (structures, case math as linked multi-layer mini-cases solved step by step, market sizing, calculations, charts, creativity) personalized to the candidate's matched industry/function, and grades each rep with teaching-grade coaching: how to approach that drill type, a model answer, feedback on the candidate's own answer, and concrete next steps; generation is gated server-side to Casemate Pro subscribers or an active free-access window — launch week / founding-member month (${MICRO_DRILL_HOOK_VERSION}, ${ACCESS_RULES_VERSION})`;

export interface MicroSkillSpec {
  id: string;
  label: string;
  hint: string;
  seconds: number;
}

// Client-side catalog (mirrors SKILLS inside the hook code — keep in sync).
export const MICRO_SKILLS: MicroSkillSpec[] = [
  { id: 'structures', label: 'Structures', hint: 'Build a MECE framework for a fresh prompt', seconds: 120 },
  { id: 'case_math', label: 'Case Math', hint: 'A linked mini-case: chained data, layered questions', seconds: 300 },
  { id: 'market_sizing', label: 'Market Sizing', hint: 'Top-down / bottom-up estimation rep', seconds: 120 },
  { id: 'calculations', label: 'Calculations', hint: 'Rapid-fire arithmetic, percentages, growth rates', seconds: 60 },
  { id: 'charts', label: 'Charts', hint: 'Read an exhibit and answer under pressure', seconds: 90 },
  { id: 'creativity', label: 'Creativity', hint: 'Generate many distinct ideas, fast', seconds: 90 },
];

const HOOK_CODE = String.raw`
const body = request.body || {};
const query = request.query || {};
const action = String(body.action || query.action || '');
const sessionId = String(request.headers['x-session-id'] || request.headers['X-Session-Id'] || body.sessionId || body.session_id || '');

function asObject(value) {
  if (!value) return {};
  if (typeof value === 'object') return value;
  try { return JSON.parse(value); } catch (error) { return {}; }
}

function firstNamed(items, fallback) {
  return Array.isArray(items) && items[0] && items[0].name ? String(items[0].name) : fallback;
}

function cleanJson(text) {
  const raw = String(text || '').trim();
  const unfenced = raw.replace(/^\x60\x60\x60(?:json)?\s*/i, '').replace(/\s*\x60\x60\x60$/i, '');
  const start = unfenced.indexOf('{');
  const end = unfenced.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Mate returned an unreadable response. Please try again.');
  return JSON.parse(unfenced.slice(start, end + 1));
}

function clampText(value, max) {
  const text = String(value === null || value === undefined ? '' : value);
  return text.length > max ? text.slice(0, max) : text;
}

function withServerTimeout(promise, timeoutMs, message) {
  let timeoutId;
  const timeout = new Promise(function (_, reject) {
    timeoutId = setTimeout(function () {
      reject(new Error(message));
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(function () {
    clearTimeout(timeoutId);
  });
}

` +
  CASEMATE_ENTITLEMENT_SNIPPET +
  String.raw`
// Casemate boundary for micro-drill generation (access-v1 shared snippet
// above: active Pro subscription OR the one-time launch week OR a
// founding-member free month). Responds 402 subscription_required / 503
// subscription_check_unavailable itself; returns false when generation must
// not proceed.
async function ensureProForGenerate() {
  return !!(await ensureCasemateAccessForGenerate('Case Drill', 'case-drill', 'Case Drill'));
}

// ---- Micro-drill sub-skill catalog (mirrors MICRO_SKILLS client-side) -----
const SKILLS = {
  structures: {
    label: 'Structures',
    seconds: 120,
    task: 'One crisp business question the candidate must STRUCTURE (not solve): e.g. "A Vietnamese bubble-tea chain sees falling store profits - how would you break down the problem?". The test is a MECE framework built fast, so the prompt needs NO exhibit numbers. drill_data should be empty or at most one line of context.',
    judge: 'Reward a MECE top level (3-4 branches), branches tailored to THIS prompt rather than a memorized framework, and one level of concrete sub-points. Punish overlap, gaps, and generic textbook trees.',
    model: 'model_answer = a clean MECE framework: 3-4 UPPERCASE top branches, each with 2-3 short sub-points, plus one line on where you would start and why.',
    approach: [
      'Restate the question in one line to lock the objective - what decision or number does the client actually need?',
      'Pick 3-4 top-level branches driven by THIS prompt (e.g. revenue vs cost, internal vs external) - never a memorized textbook tree.',
      'Test the top level for MECE: no overlaps, no gaps - every possible driver of the problem has exactly one home.',
      'Add one level of concrete sub-points per branch, using the client context from the prompt (products, channels, customers).',
      'Close by saying which branch you would dig into first and why - a structure without a priority is a map without a route.',
    ],
    practice: [
      'Run 2-3 more Structures reps back-to-back - getting to a MECE top level fast is a muscle, not a trick.',
      'After each rep, redraw your tree once without the timer and fix the overlap or gap you missed under pressure.',
      'Open a full case in Case Pool and practice starting it with this same structuring discipline.',
    ],
  },
  case_math: {
    label: 'Case Math',
    seconds: 300,
    task: 'One coherent quantitative MINI-CASE in the locked Casemate format: a named company facing a real decision, a LINKED data table whose figures chain into each other (each figure is used to derive the next), and 3-4 stacked questions where each answer feeds the next (e.g. market size -> revenue -> profit -> breakeven and feasibility). Solvable on paper within the time limit. Built by the dedicated case-math generator below, not the generic drill prompt.',
    judge: 'Grade ACROSS the question layers: did they chain the data correctly, is the setup right at each layer, does the arithmetic hold, and did they interpret the final number against the decision? A correct method with one carried slip beats a lucky final number. Reward clearly labeled per-question answers with units and a short concluding interpretation.',
    model: 'model_answer = the full step-by-step worked solution: one step per question layer, each showing the actual arithmetic and the intermediate result with its unit, plus a short thinking tip per step, closed with a consultant-style interpretation of what the numbers mean for the decision.',
    approach: [
      'Read the context first and lock WHAT DECISION the math must answer - write it as one line before touching any number.',
      'Scan the data table and map the chain: which figure feeds which (population -> users -> frequency -> share -> price -> costs). The links ARE the case.',
      'Work the questions strictly in order - each answer is an input to the next layer, so label every intermediate result with its unit.',
      'Show the setup before computing at every layer (formula first, then plug in the numbers), and carry units through each step.',
      'Close like a consultant: interpret the final number against the decision - breakeven as a % of the market, the safety margin, the key risk.',
    ],
    practice: [
      'Do a Calculations rep next - raw arithmetic speed is what buys you thinking time inside a linked case.',
      'Rework this case without the timer and write out the full chain - the data-linking pattern is what transfers to the next case.',
      'Take a profitability or market-entry full case in Case Pool, where the same layered math runs inside a complete interview.',
    ],
  },
  market_sizing: {
    label: 'Market Sizing',
    seconds: 120,
    task: 'One estimation question (a market, demand, or operational quantity - Vietnamese or Southeast Asian setting preferred). Give at most 2-3 anchor facts in drill_data (e.g. population, household size, a price point) - NEVER the answer or the funnel; the structure and assumptions are the test.',
    judge: 'Reward an explicit top-down or bottom-up structure, stated assumptions with sensible values, clean arithmetic, and a sanity check. The exact final number matters far less than the logic.',
    model: 'model_answer = one clean estimation walk: the chosen structure, each assumption with its value, the arithmetic, the final estimate, and a one-line sanity check.',
    approach: [
      'Commit to a direction out loud: top-down (population, then filter down) or bottom-up (one unit, then scale up).',
      'Write the funnel as labeled steps BEFORE plugging in numbers (e.g. population > households > % who buy > spend per year).',
      'Give every assumption an explicit, defensible round value - a justified 100 beats an unexplained 87.',
      'Multiply down the funnel cleanly, keeping units at each step so the final figure has a real meaning.',
      'Sanity-check the result against an anchor you know ("does that size make sense next to the population?") and say so.',
    ],
    practice: [
      'Run another Market Sizing rep using the OPPOSITE direction (top-down if you went bottom-up) to build both muscles.',
      'Memorize 5-6 anchor numbers for your market (population, households, urban share, a common price point) - funnels get twice as fast.',
      'Take a market-sizing full case in Case Pool, where you also defend the assumptions in a full write-up.',
    ],
  },
  calculations: {
    label: 'Calculations',
    seconds: 60,
    task: 'A rapid-fire set of exactly 4 short numeric items in drill_data, numbered 1-4, one per line: percentages, growth rates, margins, break-evens, quick multiplications with business flavor (e.g. "1. 12% of 350,000", "2. Revenue grows 8% per year for 2 years from 500 - end value?"). The prompt just tells them to answer all 4 in order.',
    judge: 'Score by how many of the 4 answers are numerically right (small rounding is fine). Reward showing answers in order; speed matters, working does not need to be shown.',
    model: 'model_answer = the 4 correct answers, numbered, each with a one-line mental-math shortcut.',
    approach: [
      'Scan all items first: knock out the instant ones, flag the multi-step ones - order of attack is part of the skill.',
      'Use decomposition shortcuts: 12% of 350,000 = 10% + 2% (35,000 + 7,000); growth over 2 years compounds, it does not just add.',
      'Keep answers numbered and in order - a right number attached to the wrong item earns nothing.',
      'Give each answer a 3-second magnitude check before moving on: dropped or added zeros are the number one killer.',
    ],
    practice: [
      'Do one Calculations rep daily - mental-math speed compounds faster than any other case skill.',
      'Drill percentage-growth pairs specifically (8% for 2 years, 10% for 3) until compounding is reflex.',
      'Then take a Case Math rep and notice how much thinking time the faster arithmetic buys you.',
    ],
  },
  charts: {
    label: 'Charts',
    seconds: 90,
    task: 'One chart-reading question. Return exhibit_chart (3-5 points) AND mirror its exact numbers in drill_data as "- label: value" lines. The question must require actually using the chart: identify the driver of a change, compute a share or growth rate from the bars, or draw the one insight an interviewer would expect.',
    judge: 'Reward reading the right numbers off the exhibit, any computation done correctly, and stating the insight in one crisp sentence. Punish answers that ignore the data.',
    model: 'model_answer = the correct reading: the relevant numbers, the computation, and the one-sentence insight.',
    approach: [
      'Read the title, the unit, and the axis FIRST - most exhibit mistakes are unit mistakes, not reading mistakes.',
      'Find what changed most or breaks the pattern - the question almost always points at the biggest mover or the outlier.',
      'Pull the exact numbers you need off the exhibit and do the computation explicitly (share, growth rate, gap).',
      'Answer as ONE crisp sentence: the number PLUS what it means for the client - the "so what" is what gets scored.',
    ],
    practice: [
      'Run another Charts rep with a different chart type (line vs pie vs bar) - each hides the insight differently.',
      'Practice writing the one-sentence insight FIRST, then the supporting numbers - interviewers hear the "so what" first.',
      'Full cases in Case Pool open with a real exhibit - use one to practice reading data inside a live case.',
    ],
  },
  creativity: {
    label: 'Creativity',
    seconds: 90,
    task: 'One brainstorm prompt asking for AT LEAST 8 distinct ideas fast (e.g. "List ways a Vietnamese supermarket chain could cut food waste"). No numbers needed; drill_data may hold one line of context. The test is volume + variety under time pressure.',
    judge: 'Reward the count of genuinely DISTINCT ideas (target 8+), variety across categories (customer, operations, partners, pricing, technology...), and at least one non-obvious idea. Duplicates and rephrasings count once.',
    model: 'model_answer = 10 strong example ideas grouped under 3-4 short category labels.',
    approach: [
      'Generate first, judge later - evaluating while brainstorming is what kills volume under a clock.',
      'Sweep categories systematically: customers, product, pricing, operations, partners, technology - 2-3 ideas per bucket beats 8 from one.',
      'Push past the first five obvious ideas - the non-obvious ones after them are where the credit is.',
      'Close by flagging the 1-2 ideas you would explore first, so raw volume ends with judgment.',
    ],
    practice: [
      'Run another Creativity rep and aim to beat your idea COUNT from this one - volume is the trainable part.',
      'Practice the category sweep on everyday problems (how could this cafe sell more?) so the buckets become automatic.',
      'In your next full case, use the same sweep when the prompt asks "what else could they do?".',
    ],
  },
};
const SKILL_IDS = Object.keys(SKILLS);

function normalizeSkill(raw) {
  const text = String(raw || '').toLowerCase().trim();
  if (!text || text === 'mixed' || text === 'random' || text === 'any' || text === 'surprise me') return null;
  if (/structur|framework|mece|issue.tree/.test(text)) return 'structures';
  if (/case.?math|quant|math/.test(text)) return 'case_math';
  if (/siz|estimat|guesstimate/.test(text)) return 'market_sizing';
  if (/calc|arithmetic|percent|mental/.test(text)) return 'calculations';
  if (/chart|exhibit|graph|data.read/.test(text)) return 'charts';
  if (/creativ|brainstorm|idea/.test(text)) return 'creativity';
  const direct = text.replace(/[^a-z]+/g, '_');
  return SKILLS[direct] ? direct : null;
}

// Same sanitizer contract as the Case Pool engine: numeric values only, at
// most 5 points, a renderable type - or null (drill still stands on its text).
function sanitizeChart(raw) {
  const chart = asObject(raw);
  const allowedTypes = ['bar', 'pie', 'line'];
  const source = Array.isArray(chart.data) ? chart.data : [];
  const points = [];
  source.forEach(function (item) {
    if (!item || typeof item !== 'object' || points.length >= 5) return;
    const label = clampText(String(item.label === undefined || item.label === null ? '' : item.label).trim(), 60);
    const value = Number(item.value);
    if (label && Number.isFinite(value) && value >= 0) points.push({ label: label, value: value });
  });
  if (points.length < 2) return null;
  let type = String(chart.type || '').toLowerCase().trim();
  if (allowedTypes.indexOf(type) < 0) type = 'bar';
  return {
    type: type,
    title: clampText(String(chart.title || '').trim(), 120) || 'Exhibit',
    unit: clampText(String(chart.unit || '').trim(), 48),
    data: points,
  };
}

// ---- Case Math linked mini-case format (micro-drill-v1.4) -----------------
// Case Math no longer produces one bare question: each item is a coherent
// mini-case (context + decision -> linked data table -> multi-layer questions
// -> detailed step-by-step solution), generated in ENGLISH and self-checked
// for internal arithmetic consistency before it is saved. The structured case
// (without the solution) travels in chart_json; the structured solution lives
// in model_answer as JSON so publicDrill keeps hiding it until grading.
const CASE_MATH_FORMAT = 'case_math_v1';
const CASE_MATH_SOLUTION_FORMAT = 'case_math_solution_v1';

function cleanStringList(items, maxItems, maxLen) {
  return (Array.isArray(items) ? items : [])
    .map(function (item) { return clampText(String(item === null || item === undefined ? '' : item).trim(), maxLen); })
    .filter(function (item) { return item.length > 0; })
    .slice(0, maxItems);
}

function sanitizeCaseMath(raw) {
  const spec = asObject(raw);
  const title = clampText(String(spec.title || '').trim(), 120);
  const context = clampText(String(spec.context || '').trim(), 1200);
  const table = [];
  (Array.isArray(spec.data_table) ? spec.data_table : []).forEach(function (row) {
    if (!row || typeof row !== 'object' || table.length >= 10) return;
    const label = clampText(String(row.label === undefined || row.label === null ? '' : row.label).trim(), 90);
    const value = clampText(String(row.value === undefined || row.value === null ? '' : row.value).trim(), 90);
    const note = clampText(String(row.note === undefined || row.note === null ? '' : row.note).trim(), 160);
    if (label && value) table.push(note ? { label: label, value: value, note: note } : { label: label, value: value });
  });
  const questions = cleanStringList(spec.questions, 5, 300);
  const steps = [];
  (Array.isArray(spec.solution_steps) ? spec.solution_steps : []).forEach(function (step) {
    if (!step || typeof step !== 'object' || steps.length >= 6) return;
    const label = clampText(String(step.label === undefined || step.label === null ? '' : step.label).trim(), 120);
    const work = clampText(String(step.work === undefined || step.work === null ? '' : step.work).trim(), 900);
    const result = clampText(String(step.result === undefined || step.result === null ? '' : step.result).trim(), 200);
    const tip = clampText(String(step.tip === undefined || step.tip === null ? '' : step.tip).trim(), 300);
    if (work && result) steps.push({ label: label, work: work, result: result, tip: tip });
  });
  const close = clampText(String(spec.consultant_close || '').trim(), 900);
  if (!context || table.length < 4 || questions.length < 3 || steps.length < questions.length || !close) return null;
  return { title: title || 'Case Math', context: context, data_table: table, questions: questions, solution_steps: steps, consultant_close: close };
}

function formatCaseMathSolution(solution) {
  const lines = [];
  (Array.isArray(solution.steps) ? solution.steps : []).forEach(function (step, index) {
    lines.push('STEP ' + (index + 1) + (step.label ? ' - ' + step.label : ''));
    lines.push(String(step.work || ''));
    lines.push('=> ' + String(step.result || ''));
    if (step.tip) lines.push('TIP: ' + String(step.tip));
    lines.push('');
  });
  if (solution.close) lines.push('CONSULTANT\'S CLOSE: ' + String(solution.close));
  return lines.join('\n').trim();
}

function parseCaseMathSolution(raw) {
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || typeof parsed !== 'object' || parsed.format !== CASE_MATH_SOLUTION_FORMAT) return null;
    if (!Array.isArray(parsed.steps) || parsed.steps.length === 0) return null;
    return { format: CASE_MATH_SOLUTION_FORMAT, steps: parsed.steps, close: String(parsed.close || '') };
  } catch (error) {
    return null;
  }
}

// Model answer + structured solution for a drill row: Case Math rows store
// the solution as structured JSON (steps + consultant close); every other
// skill - and old-format Case Math rows - store plain text and degrade
// gracefully (solution stays null).
function solutionPayload(drill) {
  const solution = drill.skill === 'case_math' ? parseCaseMathSolution(drill.model_answer) : null;
  return {
    solution: solution,
    modelAnswerText: solution ? formatCaseMathSolution(solution) : String(drill.model_answer || ''),
  };
}

async function verifyCaseMathNumbers(spec) {
  const checkResult = await platform.generateText({
    systemPrompt: 'You are a meticulous arithmetic checker for business mini-cases. Return valid JSON only, with no markdown.',
    userPrompt: [
      'Below is a quantitative mini-case: given data, stacked questions, and a step-by-step solution.',
      'Recompute EVERY solution step strictly from the data table (and from earlier step results). Small rounding differences (under 2%) are acceptable.',
      'CASE: ' + JSON.stringify({ context: spec.context, data_table: spec.data_table, questions: spec.questions, solution_steps: spec.solution_steps, consultant_close: spec.consultant_close }),
      'If every step\'s arithmetic and result reconcile with the data table, return {"consistent":true}.',
      'If anything does NOT reconcile, recompute the correct solution yourself and return {"consistent":false,"corrected_solution_steps":[{"label":"string","work":"string","result":"string","tip":"string"}],"corrected_consultant_close":"string"} - exactly one step per question, in order, with the actual arithmetic shown in "work" and the intermediate result with its unit in "result"; keep or improve the thinking tips, and rewrite the consultant close so it matches the corrected numbers. ALL text in ENGLISH.',
    ].join('\n'),
    model: 'gpt-4o-mini',
    maxTokens: 2500,
  });
  return cleanJson(checkResult.text);
}

async function latestAssessment() {
  const result = await db.query('assessment_results', {
    where: { session_id: sessionId },
    orderBy: [{ column: 'created_at', direction: 'desc' }],
    limit: 1,
  });
  return result.rows && result.rows[0] ? result.rows[0] : null;
}

async function loadDrill(drillId) {
  const found = await db.query('micro_drills', {
    where: [{ column: 'id', operator: '=', value: drillId }, { column: 'session_id', operator: '=', value: sessionId }],
    limit: 1,
  });
  return found.rows && found.rows[0] ? found.rows[0] : null;
}

function publicDrill(row) {
  const copy = {};
  Object.keys(row).forEach(function (key) { if (key !== 'model_answer') copy[key] = row[key]; });
  return copy;
}

if (!sessionId) {
  respond(401, { error: 'Sign in to run and save your micro-drills.' });
} else if (action === 'generate' && !(await ensureProForGenerate())) {
  // ensureProForGenerate already responded (402 subscription_required or
  // 503 subscription_check_unavailable) — nothing more to do here.
} else if (action === 'generate') {
  const assessment = await latestAssessment();
  const direction = asObject(assessment && assessment.result_json);
  const targetIndustry = assessment ? firstNamed(direction.industry_fit, '') : '';
  const targetFunction = assessment ? firstNamed(direction.function_fit, '') : '';

  const history = await db.query('micro_drills', {
    where: [{ column: 'session_id', operator: '=', value: sessionId }],
    orderBy: [{ column: 'created_at', direction: 'desc' }],
    limit: 60,
  });
  const historyRows = history.rows || [];

  // Skill: explicit pick wins; otherwise rotate to the least-practiced skill,
  // avoiding the most recent one so consecutive drills always vary.
  let skillId = normalizeSkill(body.skill || body.skill_type || query.skill);
  if (!skillId) {
    const counts = {};
    SKILL_IDS.forEach(function (id) { counts[id] = 0; });
    historyRows.forEach(function (row) { if (counts[row.skill] !== undefined) counts[row.skill] += 1; });
    const lastSkill = historyRows[0] ? historyRows[0].skill : null;
    let pool = SKILL_IDS.filter(function (id) { return id !== lastSkill; });
    if (pool.length === 0) pool = SKILL_IDS.slice();
    const minCount = Math.min.apply(null, pool.map(function (id) { return counts[id]; }));
    const leastPracticed = pool.filter(function (id) { return counts[id] === minCount; });
    skillId = leastPracticed[Math.floor(Math.random() * leastPracticed.length)];
  }
  const skill = SKILLS[skillId];

  // Freshness: never repeat a recent topic, and force a rotating angle so
  // back-to-back reps of the same skill land in different business contexts.
  const recentPrompts = historyRows
    .filter(function (row) { return row.skill === skillId; })
    .slice(0, 8)
    .map(function (row) { return '- ' + clampText(String(row.prompt || '').replace(/\s+/g, ' '), 140); });
  const ANGLES = ['FMCG or food & beverage', 'banking or consumer finance', 'e-commerce or digital platforms', 'logistics or supply chain', 'retail or convenience', 'telecom or technology services', 'healthcare or pharma', 'travel, tourism or hospitality', 'agriculture or manufacturing', 'education or online services'];
  const angle = ANGLES[Math.floor(Math.random() * ANGLES.length)];

  if (skillId === 'case_math') {
    // ---- Case Math (micro-drill-v1.4): linked mini-case, generate+verify --
    try {
      const caseSystemPrompt = 'You are Mate, Casemate\'s warm but rigorous case-interview coach for Vietnamese university candidates. Create ONE original "Case Math" mini-case: a compact, internally consistent quantitative business case. ALL content must be in ENGLISH. Return valid JSON only, with no markdown.';
      const caseUserPrompt = [
        'THE LOCKED FORMAT - all four parts are required:',
        '1. CONTEXT (2-4 sentences): a NAMED fictional company plus ONE concrete decision its leadership must make, ending with what the math must answer (e.g. "how long until breakeven, and is year 1 a profit or a loss?").',
        '2. LINKED DATA TABLE (5-8 rows): given figures that DEPEND on each other, so the solver must use one figure to derive the next (e.g. population -> % who are regular users -> purchase frequency -> target market share -> price per unit -> variable cost per unit -> annual fixed cost). NEVER a flat list of unrelated numbers, and NEVER include a figure that already answers one of the questions.',
        '3. MULTI-LAYER QUESTIONS (3-4): stacked questions where each answer feeds the next (e.g. market size -> annual revenue -> annual profit -> breakeven volume and a feasibility check).',
        '4. SOLUTION: solution_steps with EXACTLY one step per question, in the same order. Each step shows the ACTUAL arithmetic in "work" (e.g. "40% x 20,000,000 = 8,000,000 regular drinkers"), states the intermediate result with its unit in "result", and gives one short thinking tip in "tip" (the habit or trap for that step). Then consultant_close: 2-3 sentences interpreting the final numbers against the decision - e.g. breakeven as a % of the market, the safety margin, the key risk.',
        'BUSINESS CONTEXT: set it in ' + angle + (targetIndustry ? ', OR in the candidate\'s matched industry (' + targetIndustry + ') if that fits more naturally' : '') + ' - a realistic Vietnamese or Southeast Asian company preferred. Use friendly round numbers so every step is doable on paper within ' + skill.seconds + ' seconds.',
        targetFunction ? 'Candidate\'s matched function (flavor only, never mention it): ' + targetFunction + '.' : '',
        'INTERNAL CONSISTENCY IS CRITICAL: before answering, recompute every solution step from the data table and make sure the arithmetic matches exactly.',
        recentPrompts.length ? 'DO NOT reuse the topics or company situations of these recent drills:\n' + recentPrompts.join('\n') : '',
        'Return this exact JSON shape:',
        '{"title":"string","context":"string","data_table":[{"label":"string","value":"string","note":"string, may be empty"}],"questions":["string"],"solution_steps":[{"label":"string","work":"string - the arithmetic, real line breaks allowed","result":"string - the intermediate result with its unit","tip":"string"}],"consultant_close":"string"}'
      ].filter(function (line) { return line !== ''; }).join('\n');

      let caseSpec = null;
      for (let attempt = 0; attempt < 2 && !caseSpec; attempt += 1) {
        const generatedResult = await platform.generateText({
          systemPrompt: caseSystemPrompt,
          userPrompt: caseUserPrompt,
          model: 'gpt-4o-mini',
          maxTokens: 3500,
        });
        let candidate = null;
        try { candidate = sanitizeCaseMath(cleanJson(generatedResult.text)); } catch (parseError) { candidate = null; }
        if (!candidate) continue;
        // Self-check pass: an independent call recomputes every step from the
        // data table; inconsistent solutions are corrected in place (or the
        // whole case is regenerated) so the given data, the questions, and
        // the worked solution always reconcile.
        let check = null;
        try {
          check = await verifyCaseMathNumbers(candidate);
        } catch (verifyError) {
          console.error('Case Math verification unavailable - accepting unverified case', verifyError);
          caseSpec = candidate;
          break;
        }
        if (check && check.consistent === true) {
          caseSpec = candidate;
        } else if (check) {
          const corrected = sanitizeCaseMath({
            title: candidate.title,
            context: candidate.context,
            data_table: candidate.data_table,
            questions: candidate.questions,
            solution_steps: check.corrected_solution_steps,
            consultant_close: check.corrected_consultant_close || candidate.consultant_close,
          });
          if (corrected) caseSpec = corrected;
        }
      }

      if (!caseSpec) {
        respond(500, { error: 'Mate could not build a numerically consistent Case Math mini-case this time. Please try again.' });
      } else {
        const questionLines = caseSpec.questions.map(function (question, index) { return (index + 1) + '. ' + question; }).join('\n');
        const promptText = (caseSpec.title ? caseSpec.title + '\n' : '') + caseSpec.context + '\n\nAnswer each question in order - every answer feeds the next:\n' + questionLines;
        const dataLines = caseSpec.data_table.map(function (row) { return '- ' + row.label + ': ' + row.value + (row.note ? ' (' + row.note + ')' : ''); }).join('\n');
        const inserted = await db.insert('micro_drills', {
          skill: skillId,
          skill_label: skill.label,
          prompt: clampText(promptText, 3000),
          drill_data: clampText(dataLines, 4000),
          chart_json: { format: CASE_MATH_FORMAT, title: caseSpec.title, context: caseSpec.context, data_table: caseSpec.data_table, questions: caseSpec.questions },
          time_limit_seconds: skill.seconds,
          target_industry: targetIndustry || null,
          target_function: targetFunction || null,
          model_answer: JSON.stringify({ format: CASE_MATH_SOLUTION_FORMAT, steps: caseSpec.solution_steps, close: caseSpec.consultant_close }),
          status: 'pending',
          session_id: sessionId,
        });
        const row = inserted.insertedRows[0];
        respond(200, {
          success: true,
          drill: publicDrill(row),
          skill: skillId,
          skill_label: skill.label,
          time_limit_seconds: skill.seconds,
          personalized: !!assessment,
          case_format: CASE_MATH_FORMAT,
          message: 'A new Case Math linked mini-case (id ' + row.id + ', ' + skill.seconds + '-second limit) is saved to this candidate\'s Case Drill log. It follows the locked format: a company context with a decision, a linked data table where each figure feeds the next, and multi-layer questions. If you are presenting it in chat: give the context, then the data lines compactly (keep the line breaks and their order - the chain matters), then the numbered questions; tell them the time limit and to answer ALL questions in order in ONE message, showing their arithmetic. Then grade with the grade_micro_drill tool using this drill id. Mention the Case Drill app in the dock has a real countdown timer and a formatted data table. NEVER reveal the solution before grading.',
        });
      }
    } catch (error) {
      console.error('Case Math generation failed', error);
      respond(500, { error: 'Mate could not build this Case Math mini-case. Please try again.' });
    }
  } else {
    const systemPrompt = 'You are Mate, Casemate\'s warm but rigorous case-interview coach for Vietnamese university candidates. Create ONE original micro-drill: a tiny, self-contained rep of a single sub-skill, answerable within a strict time limit. ALL content - prompt, drill data, and model answer - must be in ENGLISH (the language these assessment rounds are run in); keep real Vietnamese company and place names as they are. Return valid JSON only, with no markdown.';
    const userPrompt = [
      'SUB-SKILL: ' + skill.label + ' (time limit: ' + skill.seconds + ' seconds - the drill MUST be answerable within it).',
      'WHAT TO CREATE: ' + skill.task,
      'BUSINESS CONTEXT: set it in ' + angle + (targetIndustry ? ', OR in the candidate\'s matched industry (' + targetIndustry + ') if that fits the sub-skill more naturally' : '') + '. Vietnamese or Southeast Asian setting preferred where natural.',
      targetFunction ? 'Candidate\'s matched function (flavor only, never mention it): ' + targetFunction + '.' : '',
      recentPrompts.length ? 'DO NOT reuse the topics or company situations of these recent drills:\n' + recentPrompts.join('\n') : '',
      'MODEL ANSWER: ' + skill.model + ' It must be fully correct and self-contained - the candidate studies it right after the drill.',
      'Formatting: prompt is 1-3 short sentences (plain text). drill_data uses REAL line breaks, one "- label: value" fact per line, or an empty string when the sub-skill needs no data. model_answer uses REAL line breaks and simple UPPERCASE section labels where helpful - no markdown syntax.',
      skillId === 'charts'
        ? 'Also return exhibit_chart: {"type":"bar|line|pie","title":"string","unit":"string","data":[{"label":"string","value":123}]} with 3-5 points, plain numbers only (unit goes in the unit field). The EXACT same numbers must appear in drill_data.'
        : '',
      'Return this exact JSON shape:',
      '{"prompt":"string","drill_data":"string","model_answer":"string"' + (skillId === 'charts' ? ',"exhibit_chart":{"type":"bar","title":"string","unit":"string","data":[{"label":"string","value":123}]}' : '') + '}'
    ].filter(function (line) { return line !== ''; }).join('\n');

    try {
      const generatedResult = await platform.generateText({
        systemPrompt: systemPrompt,
        userPrompt: userPrompt,
        model: 'gpt-4o-mini',
        maxTokens: 2000,
      });
      const generated = cleanJson(generatedResult.text);
      const chart = skillId === 'charts' ? sanitizeChart(generated.exhibit_chart) : null;
      const inserted = await db.insert('micro_drills', {
        skill: skillId,
        skill_label: skill.label,
        prompt: clampText(String(generated.prompt || ''), 2000),
        drill_data: clampText(String(generated.drill_data || ''), 4000),
        chart_json: chart,
        time_limit_seconds: skill.seconds,
        target_industry: targetIndustry || null,
        target_function: targetFunction || null,
        model_answer: clampText(String(generated.model_answer || ''), 8000),
        status: 'pending',
        session_id: sessionId,
      });
      const row = inserted.insertedRows[0];
      respond(200, {
        success: true,
        drill: publicDrill(row),
        skill: skillId,
        skill_label: skill.label,
        time_limit_seconds: skill.seconds,
        personalized: !!assessment,
        message: 'A new ' + skill.label + ' micro-drill (id ' + row.id + ', ' + skill.seconds + '-second limit) is saved to this candidate\'s Case Drill log. If you are presenting it in chat: give the prompt and the data lines compactly (keep the line breaks), tell them the time limit and to answer in ONE message as fast as they can, then grade it with the grade_micro_drill tool using this drill id. Mention they can also open the Case Drill app from the dock for a real countdown timer. NEVER reveal the model answer before grading.',
      });
    } catch (error) {
      console.error('Micro-drill generation failed', error);
      respond(500, { error: error && error.message ? error.message : 'Mate could not generate this drill. Please try again.' });
    }
  }
} else if (action === 'grade') {
  const drillId = parseInt(body.drillId || body.drill_id || query.drill_id, 10);
  const answerText = clampText(String(body.answer || '').trim(), 8000);
  const elapsedRaw = parseInt(body.elapsedSeconds || body.elapsed_seconds, 10);
  const elapsedSeconds = Number.isFinite(elapsedRaw) && elapsedRaw >= 0 ? elapsedRaw : null;
  const timedOut = body.timedOut === true || body.timed_out === true || String(body.timed_out || body.timedOut || '') === 'true';

  if (!drillId) {
    respond(400, { error: 'Mate could not tell which drill to grade. Please refresh and try again.' });
  } else {
    const drill = await loadDrill(drillId);
    if (!drill) {
      respond(404, { error: 'That micro-drill was not found in your drill log.' });
    } else if (drill.status !== 'pending') {
      respond(400, { error: 'This drill is already finished - generate a fresh one to keep drilling.' });
    } else if (!answerText) {
      // Empty answer = give up / time ran out with nothing written: reveal the
      // approach playbook + model answer + next steps, record the rep as
      // skipped, never score it.
      const skillSpec = SKILLS[drill.skill] || SKILLS.structures;
      const reveal = solutionPayload(drill);
      const now = new Date().toISOString();
      const updated = await db.update('micro_drills', {
        id: drillId,
        session_id: sessionId,
        status: 'pending',
      }, {
        status: 'skipped',
        elapsed_seconds: elapsedSeconds,
        timed_out: timedOut,
        completed_on: now,
        updated_at: now,
      });
      if (!updated.updatedRows || !updated.updatedRows[0]) {
        respond(400, { error: 'This drill is already finished - generate a fresh one to keep drilling.' });
      } else {
        respond(200, {
          success: true,
          skipped: true,
          drill: updated.updatedRows[0],
          approach: skillSpec.approach,
          next_steps: skillSpec.practice,
          model_answer: reveal.modelAnswerText,
          solution: reveal.solution,
          message: 'Drill marked as skipped (not scored) - reps under time pressure are supposed to feel hard. If you are presenting it in chat: reassure them warmly, walk the approach steps (how to attack this drill type), show the model answer compactly, give the next steps, and offer another rep of the same skill right away.' + (reveal.solution ? ' This was a Case Math mini-case: walk the solution step by step (each step\'s arithmetic, intermediate result, and thinking tip), then end with the consultant-style close.' : ''),
        });
      }
    } else {
      let claimResult = null;
      try {
        const claimNow = new Date().toISOString();
        claimResult = await db.update('micro_drills', {
          id: drillId,
          session_id: sessionId,
          status: 'pending',
        }, {
          status: 'grading',
          updated_at: claimNow,
        });
      } catch (error) {
        console.error('Micro-drill grading failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not grade this drill. Please try again.' });
      }

      if (claimResult && (!claimResult.updatedRows || !claimResult.updatedRows[0])) {
        respond(400, { error: 'This drill is already finished - generate a fresh one to keep drilling.' });
      } else if (claimResult) {
      const skill = SKILLS[drill.skill] || SKILLS.structures;
      const reveal = solutionPayload(drill);
      const systemPrompt = 'You are Mate, Casemate\'s fair and specific micro-drill grader. This was a SHORT timed rep of one sub-skill, not a full case - grade the sub-skill only, quickly and concretely. Return valid JSON only, with no markdown.';
      const userPrompt = [
        'SUB-SKILL: ' + skill.label + ' (time limit ' + drill.time_limit_seconds + 's' + (elapsedSeconds !== null ? ', candidate used about ' + elapsedSeconds + 's' : '') + (timedOut ? ', the countdown hit ZERO before they submitted' : '') + ').',
        'DRILL PROMPT: ' + String(drill.prompt || ''),
        drill.drill_data ? 'DRILL DATA: ' + String(drill.drill_data) : '',
        'ANSWER KEY (ground truth - never assume the candidate saw it): ' + reveal.modelAnswerText,
        'HOW TO JUDGE THIS SUB-SKILL: ' + skill.judge,
        'CANDIDATE ANSWER: ' + answerText,
        'Score 1-5 (5 = interview-ready under time pressure; a timed-out but strong partial answer can still score 3). feedback = 2-3 warm, candid sentences citing their own words or numbers and tying them to the answer key above. strengths = up to 3 short bullets. improvements = up to 3 short bullets, each a concrete move for the NEXT rep.',
        'approach_steps = 3-5 short strings teaching the reusable METHOD for attacking this type of ' + skill.label + ' drill: what to do first, second, third - grounded in THIS drill so the candidate can replay it, never generic filler like "practice more" or "stay structured".',
        'next_steps = 1-3 short strings telling this candidate exactly what to practice next and how, based on where their answer fell short.',
        'Language: write feedback, strengths, improvements, approach_steps, and next_steps in the same language the candidate wrote their answer in (Vietnamese or English); keep all numbers exact.',
        'Return this exact JSON shape:',
        '{"score":1,"feedback":"string","strengths":["string"],"improvements":["string"],"approach_steps":["string"],"next_steps":["string"]}'
      ].filter(function (line) { return line !== ''; }).join('\n\n');

      try {
        const gradeResult = await withServerTimeout(
          platform.generateText({
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            model: 'gpt-4o-mini',
            maxTokens: 1600,
          }),
          28000,
          'Mate timed out while grading this drill. Please try again.',
        );
        const grade = cleanJson(gradeResult.text);
        const score = Math.max(1, Math.min(5, Math.round(Number(grade.score) || 3)));
        function cleanList(items, max) {
          return (Array.isArray(items) ? items : [])
            .map(function (item) { return clampText(String(item === null || item === undefined ? '' : item).trim(), 400); })
            .filter(function (item) { return item.length > 0; })
            .slice(0, max);
        }
        const approachSteps = cleanList(grade.approach_steps, 5);
        const nextSteps = cleanList(grade.next_steps, 3);
        const feedback = {
          feedback: clampText(grade.feedback || 'Nice rep - keep drilling.', 4000),
          strengths: cleanList(grade.strengths, 3),
          improvements: cleanList(grade.improvements, 3),
          // Teaching-grade guidance (micro-drill-v1.3): drill-tailored steps
          // from the grader, with the curated per-skill playbook as fallback
          // so these sections never come back empty.
          approach: approachSteps.length >= 3 ? approachSteps : skill.approach,
          next_steps: nextSteps.length > 0 ? nextSteps : skill.practice,
        };
        const now = new Date().toISOString();
        // json columns must be passed as JSON strings on update (raw objects
        // fail with "invalid input syntax for type json").
        const updated = await db.update('micro_drills', {
          id: drillId,
          session_id: sessionId,
          status: 'grading',
        }, {
          answer_text: answerText,
          elapsed_seconds: elapsedSeconds,
          timed_out: timedOut,
          score: score,
          feedback_json: JSON.stringify(feedback),
          status: 'completed',
          completed_on: now,
          updated_at: now,
        });
        respond(200, {
          success: true,
          drill: updated.updatedRows[0],
          score: score,
          feedback: feedback,
          approach: feedback.approach,
          next_steps: feedback.next_steps,
          model_answer: reveal.modelAnswerText,
          solution: reveal.solution,
          message: 'Grade saved to this candidate\'s Case Drill log. If you are presenting it in chat: lead with the score (x/5) and the feedback, then the strengths and improvement bullets compactly, then teach the approach steps (the reusable method for this drill type), show the model answer so they see what good looks like, and close with the 1-3 next steps - then offer another rep (same skill to consolidate, or a different one for variety).' + (reveal.solution ? ' This was a Case Math mini-case: present the model answer as the step-by-step solution (each step\'s arithmetic, intermediate result, and thinking tip) and end with the consultant-style close.' : ''),
        });
      } catch (error) {
        try {
          await db.update('micro_drills', {
            id: drillId,
            session_id: sessionId,
            status: 'grading',
          }, {
            status: 'pending',
            updated_at: new Date().toISOString(),
          });
        } catch (restoreError) {
          console.error('Micro-drill grading claim restore failed', restoreError);
        }
        console.error('Micro-drill grading failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not grade this drill. Please try again.' });
      }
      }
    }
  }
} else {
  respond(400, { error: 'Unknown micro-drill action. Use action=generate (optional skill: structures | case_math | market_sizing | calculations | charts | creativity, or omit to rotate the least-practiced skill) or action=grade (drill_id + answer + optional elapsed_seconds/timed_out; an empty answer marks the drill skipped and reveals the model answer).' });
}
`;

let ensureHookPromise: Promise<void> | null = null;

// Hook installation remains available to authenticated workspace-management
// surfaces. Customer sessions execute the published hook directly because
// hook list/PATCH endpoints intentionally reject them with 401.

export function ensureMicroDrillServerFunction(): Promise<void> {
  if (ensureHookPromise) return ensureHookPromise;

  ensureHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${MICRO_DRILL_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) throw new Error('The Case Drill backend is not available yet. Please refresh and try again.');
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === MICRO_DRILL_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${MICRO_DRILL_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: MICRO_DRILL_HOOK_NAME,
          description: HOOK_DESCRIPTION,
          code: HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Mate could not activate the Case Drill backend. Please try again.');
      return;
    }

    if (
      existing.description !== HOOK_DESCRIPTION ||
      existing.code !== HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${MICRO_DRILL_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: HOOK_DESCRIPTION, code: HOOK_CODE, enabled: true }),
      });
      if (!updateResponse.ok) throw new Error('Mate could not update the Case Drill backend. Please try again.');
    }
  })().catch((error) => {
    ensureHookPromise = null;
    throw error;
  });

  return ensureHookPromise;
}

// The signed-in email stored by the platform session (EmailGate / register).
// Sent to the hook only as a VERIFICATION HINT: the hook independently proves
// the email belongs to this session via the platform session store and checks
// the subscription server-side — a forged value cannot unlock anything, but a
// correct one saves the hook from enumerating subscribers.
function storedSessionEmail(): string | null {
  try {
    const stored = localStorage.getItem(`space_session_${MICRO_DRILL_WORKSPACE_ID}`);
    if (!stored) return null;
    const session = JSON.parse(stored);
    return typeof session.email === 'string' && session.email.includes('@') ? session.email : null;
  } catch {
    return null;
  }
}

export async function callMicroDrillServerFunction(
  action: 'generate' | 'grade',
  payload: Record<string, unknown>,
  sessionId: string,
  options: { signal?: AbortSignal; timeoutMs?: number } = {},
) {
  const timeoutMs = options.timeoutMs ?? (action === 'grade' ? 30_000 : 90_000);
  const controller = new AbortController();
  let didTimeout = false;

  const abortFromCaller = () => controller.abort();
  if (options.signal?.aborted) {
    abortFromCaller();
  } else {
    options.signal?.addEventListener('abort', abortFromCaller, { once: true });
  }

  const timeoutId = window.setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(
      `/api/workspaces/${MICRO_DRILL_WORKSPACE_ID}/hooks/${MICRO_DRILL_HOOK_NAME}/execute`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({ action, sessionId, customerEmail: storedSessionEmail() || undefined, ...payload }),
        signal: controller.signal,
      },
    );

    const raw = await response.text();
    let result: any = {};
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      throw new Error(
        response.ok
          ? 'Mate returned an unreadable response. Please try again.'
          : `Mate's grading service failed with HTTP ${response.status}. Please try again.`,
      );
    }

    if (!response.ok || result.error) {
      throw new Error(result.error || `Mate's grading service failed with HTTP ${response.status}. Please try again.`);
    }
    return result;
  } catch (error) {
    if (didTimeout || controller.signal.aborted) {
      throw new Error(
        action === 'grade'
          ? 'Mate could not finish grading within 30 seconds. Please try again.'
          : `Mate could not generate the drill within ${Math.round(timeoutMs / 1000)} seconds. Please try again.`,
      );
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    options.signal?.removeEventListener('abort', abortFromCaller);
  }
}

/* ============================================================================
 * MCP customer-tools registration
 *
 * Registers generate_micro_drill / grade_micro_drill in the workspace's
 * customer-tools registry (the mcp-agent-tools integration) so Mate can run
 * timed micro-drills for a candidate mid-conversation. The registry is
 * read-merge-written: every existing tool (fit assessment, Case Pool case
 * tools, drill-log summary...) is preserved verbatim, and the PUT is skipped
 * entirely when the micro-drill entries are already current.
 *
 * Endpoint shape: registered tools may only call allow-listed prefixes (e.g.
 * /api/hooks/). We DERIVE the endpoint from the already-registered Case Pool
 * hook tools (generate_practice_case / grade_practice_case) by swapping in
 * this hook's name/id - so the micro tools are wired exactly like the tools
 * that are already proven to work in this workspace. If no template exists we
 * fall back to the hook-execute route documented in the mcp-agent-tools
 * integration docs: /api/hooks/execute/{workspaceId}/{hookName}.
 * ==========================================================================*/

interface RegistryTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  action: {
    type: 'api_call';
    method: string;
    endpoint: string;
    bodyMapping?: Record<string, string>;
  };
}

function microToolDefinitions(endpointFor: (action: string) => string): RegistryTool[] {
  return [
    {
      name: 'generate_micro_drill',
      description:
        `Create ONE short, timed Case Drill micro-drill for the candidate and save it to their drill log. Use whenever they ask for a quick drill, rapid-fire practice, or to train one sub-skill: structures (MECE frameworks), case_math (a linked multi-layer mini-case: chained data table + stacked questions solved step by step, 5-minute clock), market_sizing (estimation), calculations (fast arithmetic/percentages), charts (read an exhibit), creativity (brainstorm many ideas). Pass skill for a specific sub-skill; omit it to rotate their least-practiced skill. Returns the drill prompt, data, and time limit - present it, let them answer in one message, then grade with grade_micro_drill. This is DIFFERENT from generate_practice_case, which creates a FULL 20-30 minute case in the Case Pool. Requires an active Casemate Pro plan OR an active seven-day trial / capped legacy founding entitlement - the tool checks server-side, so just call it; if it returns a subscription_required error, relay it warmly per the Free vs Casemate Pro boundary and deep-link Settings → Account & Subscription. [${MICRO_DRILL_HOOK_VERSION}]`,
      parameters: {
        skill: {
          type: 'string',
          required: false,
          enum: ['structures', 'case_math', 'market_sizing', 'calculations', 'charts', 'creativity'],
          description: 'Sub-skill to drill; omit to rotate the least-practiced one.',
        },
      },
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('generate'),
        bodyMapping: { skill: 'skill' },
      },
    },
    {
      name: 'grade_micro_drill',
      description:
        `Grade the candidate's answer to a Case Drill micro-drill created with generate_micro_drill. Pass the drill_id and their full answer text; returns a 1-5 score plus full structured coaching: approach steps (the reusable method for this drill type), feedback with strengths and what was missing in their answer, the model answer, and 1-3 next steps to practice. For case_math drills the model answer is a step-by-step worked solution (each step's arithmetic, its intermediate result, and a thinking tip, plus a consultant-style close) - walk it step by step when presenting. Pass an EMPTY answer to mark the drill skipped and reveal the approach, model answer, and next steps without a score (when they give up or the timer beat them). Never invent a drill grade yourself - this tool's grade is the grade. [${MICRO_DRILL_HOOK_VERSION}]`,
      parameters: {
        drill_id: { type: 'number', required: true, description: 'The drill id returned by generate_micro_drill.' },
        answer: { type: 'string', required: false, description: "The candidate's full answer; empty to skip and reveal the model answer." },
        elapsed_seconds: { type: 'number', required: false, description: 'Roughly how many seconds the candidate took, when known.' },
      },
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('grade'),
        bodyMapping: { drill_id: 'drill_id', answer: 'answer', elapsed_seconds: 'elapsed_seconds' },
      },
    },
  ];
}

let ensureToolsPromise: Promise<void> | null = null;

export function ensureMicroDrillAgentTools(): Promise<void> {
  if (ensureToolsPromise) return ensureToolsPromise;

  ensureToolsPromise = (async () => {
    // The hook must exist before tools can point at it (and we may need its id
    // for endpoint derivation below).
    await ensureMicroDrillServerFunction();

    const registryResponse = await fetch(`/api/workspace-settings/${MICRO_DRILL_WORKSPACE_ID}/customer-tools`);
    let registry: { version: number; tools: RegistryTool[] } = { version: 1, tools: [] };
    if (registryResponse.ok) {
      const payload = await registryResponse.json().catch(() => null);
      if (payload?.registry && Array.isArray(payload.registry.tools)) {
        registry = payload.registry;
      } else if (payload?.registry) {
        // Unexpected registry shape - do not risk clobbering it.
        return;
      }
    } else if (registryResponse.status !== 404) {
      // Transient failure - try again on the next app load rather than
      // overwriting a registry we could not read.
      return;
    }

    // Derive the hook-execute endpoint shape from the already-working Case
    // Pool tool entries (swap hook name and, when present, hook id).
    let caseHook: any = null;
    let microHook: any = null;
    try {
      const hooksResponse = await fetch(`/api/workspaces/${MICRO_DRILL_WORKSPACE_ID}/hooks`);
      if (hooksResponse.ok) {
        const hooksPayload = await hooksResponse.json();
        const hooks = Array.isArray(hooksPayload) ? hooksPayload : hooksPayload.hooks || [];
        caseHook = hooks.find((hook: any) => hook.name === CASE_POOL_HOOK_NAME) || null;
        microHook = hooks.find((hook: any) => hook.name === MICRO_DRILL_HOOK_NAME) || null;
      }
    } catch {
      /* endpoint derivation falls back below */
    }

    const template = registry.tools.find((tool) => {
      const endpoint = tool?.action?.endpoint || '';
      if (!endpoint) return false;
      if (endpoint.includes(CASE_POOL_HOOK_NAME)) return true;
      return !!(caseHook?.id && endpoint.includes(caseHook.id));
    });

    const endpointFor = (action: string): string => {
      if (template) {
        let base = template.action.endpoint.split('?')[0];
        base = base.split(CASE_POOL_HOOK_NAME).join(MICRO_DRILL_HOOK_NAME);
        if (caseHook?.id && microHook?.id) base = base.split(caseHook.id).join(microHook.id);
        return `${base}?action=${action}`;
      }
      return `/api/hooks/execute/${MICRO_DRILL_WORKSPACE_ID}/${MICRO_DRILL_HOOK_NAME}?action=${action}`;
    };

    const desired = microToolDefinitions(endpointFor);
    const current = new Map(registry.tools.map((tool) => [tool.name, tool]));
    const upToDate = desired.every((tool) => {
      const existing = current.get(tool.name);
      return !!existing && JSON.stringify(existing) === JSON.stringify(tool);
    });
    if (upToDate) return;

    const others = registry.tools.filter((tool) => !desired.some((d) => d.name === tool.name));
    const putResponse = await fetch(`/api/workspace-settings/${MICRO_DRILL_WORKSPACE_ID}/customer-tools`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // NOTE: the PUT body is asymmetric with the GET response: GET returns
      // { registry: ... } but PUT expects { value: ... } (a { registry: ... }
      // body is rejected with HTTP 400 by the platform's validation).
      body: JSON.stringify({ value: { version: registry.version || 1, tools: [...others, ...desired] } }),
    });
    if (!putResponse.ok) throw new Error(`Could not register the micro-drill agent tools (${putResponse.status})`);
  })().catch((error) => {
    ensureToolsPromise = null;
    // Non-fatal: the app works without the chat tools; retry on next load.
    console.warn('[CaseDrill] MCP tool registration deferred:', error);
  });

  return ensureToolsPromise;
}
