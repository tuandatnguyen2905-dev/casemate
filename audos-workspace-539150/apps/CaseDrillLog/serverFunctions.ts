import { CASEMATE_ENTITLEMENT_SNIPPET, ACCESS_RULES_VERSION } from '../../lib/proAccess';

export const CASE_DRILL_HOOK_NAME = 'casemate-case-drill-v4';
export const CASE_DRILL_HOOK_VERSION = 'case-drill-v14.1-library-open-rubric';
export const CASE_DRILL_WORKSPACE_ID = 'workspace-539150';

const HOOK_DESCRIPTION = `Casemate Case Pool full-case engine — live case generation (14 case types incl. banking/Big-4/ops/digital specialties, industry- and function-aware mixed rotation, optional program targeting, selectable Easy/Medium/Hard difficulty, exhibits rendered in the clearest form for the data — chart or table), guided walkthrough coaching, rubric grading — every graded case returns a model answer (framework, key findings, recommendation), a matched/missing delta comparison against it, and an action plan whose items each carry a why tied to that delta — give-up reveal with model answers, and grading for the 100 prebuilt Case Library cases against their own published model answer; generation is gated server-side to Casemate Pro subscribers or an active free-access window — launch week / founding-member month (${CASE_DRILL_HOOK_VERSION}, ${ACCESS_RULES_VERSION})`;

// v13 (solve a library case in place): adds action=grade_library, which grades
// an answer to one of the 100 prebuilt Case Library cases. Those cases live in
// the app bundle (lib/casePoolLibrary.ts), not in WorkspaceDB, so there is no
// row to load - the case travels in the request body and the action upserts a
// completed row into case_practice_cases keyed by
// practice_focus = 'library:<case id>' (a queryable column; re-attempting a
// case overwrites its previous grade). Two deliberate differences from the
// Case Room grade: (1) the model answer is NOT invented at grade time - the
// library already ships one, so it is passed in as the reference standard and
// stored verbatim in grade_report.model_answer, which keeps the grade
// consistent with the model answer the learner can reveal in the app; and
// (2) the rubric is the shared LIBRARY_RUBRIC below, since prebuilt cases
// carry no per-case rubric. Because the row lands in the same table with a
// real score, library attempts flow into the dashboard, progress ring, grade
// trend, and per-type performance exactly like Case Room cases. Generation,
// walkthrough, reveal, the Case Room grade, and all gating are untouched.
// v12 (learning-gap grade report): grading now ALSO returns (1) model_answer
// - the answer an excellent candidate would give to THIS case (the framework
// to apply, 3-5 key findings worked from the case numbers, and an
// answer-first recommendation), (2) delta - a specific comparison of the
// candidate's answer against that model answer (matched = what they got
// right, missing = the exact elements absent or wrong - never generic
// advice), and (3) recommendations upgraded from plain strings to
// {action, why} objects where every why ties the action back to THIS
// case's delta (rendered as "Why?" in the app). Storage: the
// recommendations_json column now holds the {action, why} array, and the
// model answer / delta / summary live in rubric_json._casemate.grade_report
// (WorkspaceDB tables cannot gain new columns after creation). Older graded
// rows (string recommendations, no grade_report) still render unchanged in
// the app. Generation, walkthrough, reveal, and all gating are untouched.
// v11 (exhibit legibility + difficulty selector): (1) generate now accepts
// an optional difficulty (easy | medium | hard, default medium; synonyms like
// foundations/intermediate/stretch normalize). Easy adds explicit guiding
// sub-questions and simple round numbers; Hard removes the guidance, demands
// multi-step quant, and requires TWO exhibit blocks plus one distractor fact.
// The chosen level is stored on the row (difficulty) and in the meta
// envelope (difficulty_id). (2) Exhibit rendering is matched to the data
// shape: the model now PICKS the clearest representation (line = trend,
// bar = few-category comparison, pie = part-to-whole, TABLE = reference or
// anchor facts, mixed units, or dense multi-field data) — the old per-type
// chart kind is a suggestion only — and exhibit_chart may carry a
// columns/rows table payload. Rule encoded in the prompt: if a chart does
// not make the numbers faster to grasp than a table, render a table; never
// chart data for decoration. Paywall/trial gating is UNCHANGED from v10.
// v10 (v0.7 trial rules): the paywall boundary moves to the SHARED Casemate
// access snippet (lib/proAccess.ts) — generation now also unlocks during the
// one-time launch-week window and for first-65 founding members' free month,
// with identical rules across Case Pool, Case Drill, Industry Knowledge, and
// the client paywall gate. Only the boundary block changed; case generation,
// grading, walkthrough, and reveal logic are untouched.
// v9: HARDENS THE PAYWALL — the generate action verifies Casemate Pro
// (promo-monthly, monthly, or six-month access) SERVER-SIDE, so calling the
// hook directly (bypassing components/PaywallGate.tsx) or via the agent
// tools no longer creates cases for non-subscribers. The caller's session id
// (X-Session-Id) is resolved to a contact through platform-owned records
// only — never a trusted client claim (see the "Casemate Pro server-side
// boundary" block inside the hook code for the exact mechanism). Grade,
// walkthrough, and reveal stay ungated so already-generated cases keep
// working and nobody is stranded mid-rep. Non-subscribers receive a
// structured HTTP 402 { code: 'subscription_required', plan, upgrade, ... }
// that Mate and the apps can relay warmly; transient verification failures
// return 503 { code: 'subscription_check_unavailable' } instead, so a
// platform hiccup never shows a paying member the upgrade screen.
// v8.1: the customer-facing tool is RENAMED — the full-case practice room is
// now called "Case Pool" (the separate Case Drill app is the new micro-drills
// room). Only the user-facing message strings changed; generation, grading,
// walkthrough, and reveal logic are untouched.
// v4: adds a case-type catalog (market entry, profitability, market sizing,
// growth strategy, M&A, pricing, competitive response) with an explicit pick
// or a least-practiced mixed rotation; generation no longer requires a saved
// fit assessment (it falls back to a strong general case and a default
// target); and the action/case_type can arrive via query string so the
// workspace's MCP agent tools (generate_practice_case / grade_practice_case)
// can call the same hook. Extra per-case state (mode, case type id, photo
// provenance, structured answer, walkthrough transcript) lives under
// rubric_json._casemate because WorkspaceDB tables cannot gain new columns
// after creation. The grade action always strips the envelope before the
// rubric reaches the grading prompt.
// v8: cases now open with a visual data exhibit - generation also returns
// exhibit_chart (a 3-5 point chart spec whose kind is mapped from the case
// type: pie for profitability breakdowns, bar for market entry / financial
// trends / channel comparisons, line for growth trends; market sizing charts
// only anchor facts, never the estimation answer). The chart is sanitized
// and stored under rubric_json._casemate.exhibit_chart, and its numbers are
// REQUIRED to mirror the "Exhibit 1" block of case_data - so grading,
// walkthrough, reveal, and the chat agent (which all read the case_data
// text) stay fully consistent. No other generation or grading logic changed.
// v7: diversifies the catalog by industry/function - six specialist case
// types join the core eight: financial_analysis, credit_assessment (banking
// & financial services), due_diligence (Big 4 / professional services),
// operations_optimization (logistics / supply chain / cost reduction),
// unit_economics (e-commerce / fintech), and distribution_strategy (FMCG /
// insurance / healthcare route-to-market). The mixed rotation also accepts
// preferred_types (an array of case type ids the app derives from the
// candidate's matched industry/function - see caseTypeCatalog.ts) so "Mix it
// up" rotates within the candidate's relevant set; without it the rotation
// covers the full catalog, exactly as before. Generation and grading flow is
// otherwise unchanged.
// v6: adds the Product Launch case type (target/positioning, go-to-market,
// launch economics, risks) \u2014 commonly tested in FMCG and e-commerce MT
// assessment rounds.
// v5: adds action=reveal (give up \u2192 model answer; the case is recorded as
// skipped, status completed with NO score, so dashboards keep it in history
// but grade metrics exclude it \u2014 grading a skipped case is rejected) and an
// optional targetProgram on generate so \u201cStart Case Pool for this program\u201d
// can aim a case at one specific program.
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

function validTarget(value) {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 && parsed <= 100 ? parsed : null;
}

function clampText(value, max) {
  const text = String(value === null || value === undefined ? '' : value);
  return text.length > max ? text.slice(0, max) : text;
}

function splitRubric(raw) {
  const full = asObject(raw);
  const meta = asObject(full._casemate);
  const rubric = {};
  Object.keys(full).forEach(function (key) { if (key !== '_casemate') rubric[key] = full[key]; });
  return { rubric: rubric, meta: meta };
}

function mergeRubric(rubric, meta) {
  const merged = {};
  Object.keys(rubric).forEach(function (key) { merged[key] = rubric[key]; });
  merged._casemate = meta;
  return merged;
}

` +
  CASEMATE_ENTITLEMENT_SNIPPET +
  String.raw`
// Casemate boundary for full-case generation (access-v1 shared snippet
// above: active Pro subscription OR the one-time launch week OR a
// founding-member free month). Responds 402 subscription_required / 503
// subscription_check_unavailable itself; returns false when generation must
// not proceed.
async function ensureProForGenerate() {
  return !!(await ensureCasemateAccessForGenerate('Case Pool', 'case-drill-log', 'Case Pool'));
}

// ---- Case type catalog (v4): 7 distinct interview case types --------------
const CASE_TYPES = {
  market_entry: {
    label: 'Market Entry',
    brief: 'A client is deciding whether (and how) to enter a new market, country, city, or customer segment. The candidate must weigh market attractiveness, ability to win, entry mode (build / partner / acquire), and economics before recommending go or no-go.',
    focus: 'Market attractiveness vs ability to win, entry economics, and a clear go/no-go call',
  },
  profitability: {
    label: 'Profitability',
    brief: 'A client\u2019s profits are declining (or below target) and the candidate must diagnose why \u2014 splitting profit into revenue and cost drivers, isolating the segment or line where the problem sits with the exhibit data \u2014 and recommend fixes.',
    focus: 'A clean profit tree, isolating the real driver in the numbers, and fixes tied to that driver',
  },
  market_sizing: {
    label: 'Market Sizing & Estimation',
    brief: 'The candidate must estimate the size of a market or an operational quantity (units, revenue, demand) with NO exhibit giving the answer \u2014 they must build a top-down or bottom-up estimation with explicit, sensible assumptions and clean arithmetic, then sanity-check the result. Provide only a few anchor facts in the case data (e.g. population, household size, a price point) \u2014 the structure and assumptions are the test.',
    focus: 'A logical estimation structure, explicit stated assumptions, clean arithmetic, and a sanity check',
  },
  growth_strategy: {
    label: 'Growth Strategy',
    brief: 'A client wants to grow revenue significantly (e.g. double in 3\u20135 years) and the candidate must structure the growth options \u2014 existing products/markets, new segments, new channels, new products, partnerships \u2014 size the most promising levers with the exhibit data, and recommend a prioritized growth path.',
    focus: 'A MECE growth-lever tree, sizing the biggest levers, and a prioritized recommendation',
  },
  mna: {
    label: 'M&A / Acquisition',
    brief: 'A client is considering acquiring (or merging with) a specific target company. The candidate must assess standalone value, synergies (revenue and cost), risks and integration challenges, and whether the indicated price makes sense \u2014 ending with a clear acquire / don\u2019t acquire / negotiate recommendation.',
    focus: 'Standalone value + synergies vs price, deal risks, and a decisive recommendation',
  },
  pricing: {
    label: 'Pricing',
    brief: 'A client must price a new product or re-price an existing one. The candidate should consider cost-based, competitor-based, and value-based anchors, compute the relevant unit economics from the exhibits, weigh volume/price trade-offs, and land on a specific price (or range) with reasoning.',
    focus: 'Using cost, competitor, and value anchors; unit economics; and landing a specific price',
  },
  competitive_response: {
    label: 'Competitive Response',
    brief: 'A competitor just made an aggressive move against the client (price cut, new product launch, new entrant, big marketing push). The candidate must assess the threat\u2019s real impact with the data, lay out response options (match, differentiate, defend key segments, do nothing), and recommend a response with its economics.',
    focus: 'Quantifying the threat, a full option set, and a recommended response backed by numbers',
  },
  product_launch: {
    label: 'Product Launch',
    brief: 'A client is preparing to launch a new product (or has just launched one) and the candidate must design the launch: target segment and positioning, channel and go-to-market plan, pricing and launch economics (break-even or first-year volume from the exhibit data), and the key launch risks. Launch cases are common in FMCG and e-commerce MT assessment rounds.',
    focus: 'A clear target/positioning choice, a concrete go-to-market plan, launch economics worked from the data, and launch risks',
  },
  financial_analysis: {
    label: 'Financial Analysis',
    brief: 'A decision-maker (a bank team, an advisory group, or a company board) must judge a business from its financial statements \u2014 revenue quality, margin trends, cost structure, cash generation, and simple ratios \u2014 and act on the verdict (invest, restructure, approve, or walk away). The exhibits carry simplified P&L and balance-sheet lines the candidate must actually work. Core to banking and Big 4 selection.',
    focus: 'Reading the statements systematically, computing the ratios and trends that matter, and a decision grounded in them',
  },
  credit_assessment: {
    label: 'Credit Assessment',
    brief: 'A bank must decide whether to extend (or restructure) a loan to a specific business. The candidate must judge repayment capacity \u2014 cash flow versus debt service, collateral, industry and management risk \u2014 from the exhibit numbers and recommend approve, decline, or approve with conditions. The signature banking MT case.',
    focus: 'Structured repayment logic, debt-service math worked from the exhibits, and a clear conditioned credit decision',
  },
  due_diligence: {
    label: 'Due Diligence',
    brief: 'An acquirer or an audit-adjacent advisory team is reviewing a target company before a deal signs. The candidate must test whether the target\'s reported numbers hold up \u2014 revenue recognition, margin sustainability, one-off items, working-capital red flags \u2014 quantify the issues found, and advise how they change the deal. Mirrors Big 4 transaction and audit work.',
    focus: 'A structured red-flag review, quantifying each issue from the exhibits, and a clear deal implication',
  },
  operations_optimization: {
    label: 'Operations & Cost Optimization',
    brief: 'A client\'s operation (a plant, a warehouse network, a delivery fleet, a service center) is underperforming on cost, capacity, or service level. The candidate must locate the bottleneck or cost driver in the exhibit data, size the improvement levers, and recommend a prioritized fix. Central to logistics, supply chain, and cost-reduction interviews.',
    focus: 'Isolating the binding constraint or cost driver in the numbers, sizing each lever, and a sequenced fix',
  },
  unit_economics: {
    label: 'Unit Economics',
    brief: 'A digital business (e-commerce, wallet or consumer fintech, delivery, subscription) is growing fast but may lose money on every order or user. The candidate must build the per-order or per-user economics from the exhibits \u2014 contribution margin, acquisition cost versus lifetime value, path to break-even \u2014 and recommend how to make the model work. The staple of e-commerce and fintech selection.',
    focus: 'A clean per-unit P&L, acquisition-cost versus lifetime-value logic, and levers that credibly close the gap',
  },
  distribution_strategy: {
    label: 'Distribution & Channel Strategy',
    brief: 'A client must design or fix its route to market \u2014 traditional trade versus modern trade versus e-commerce, direct sales forces, distributors, agents, or bancassurance \u2014 deciding which channels to prioritize and how to win them. The candidate must compare channel economics and coverage with the exhibit data and land a concrete channel plan. Common in FMCG, insurance, and healthcare selection.',
    focus: 'Comparing channel economics and reach from the data, a prioritized channel mix, and how to win each channel',
  },
};
const CASE_TYPE_IDS = Object.keys(CASE_TYPES);

// ---- Difficulty levels (v11): the user-selectable Easy/Medium/Hard dial ---
// Easy = more structure/guidance and simpler numbers; Medium = balanced;
// Hard = more ambiguity, two exhibits, tougher multi-step quant. The chosen
// level is stored on the case row (difficulty) and in the meta envelope
// (difficulty_id) so history and dashboards stay traceable.
const DIFFICULTY_LEVELS = {
  easy: {
    label: 'Easy',
    prompt: [
      'DIFFICULTY: EASY - a confidence-building case.',
      'Give the candidate extra structure: end the prompt with 2-3 explicit guiding sub-questions that walk them through the analysis (for example: first, what drives X? then, what do the numbers say? finally, what would you recommend?).',
      'Use simple, round numbers that divide cleanly - the math should be doable mentally in one or two steps.',
      'Keep case_data lean: exactly ONE exhibit block and no distractor facts - every number provided is needed for the answer.',
    ].join(' '),
  },
  medium: {
    label: 'Medium',
    prompt: [
      'DIFFICULTY: MEDIUM - a balanced, realistic interview case.',
      'The prompt states the client situation and one clear question - no extra guiding sub-questions beyond that.',
      'Use realistic numbers that take 2-3 calculation steps; ONE exhibit block in case_data (two only if the case truly needs them).',
    ].join(' '),
  },
  hard: {
    label: 'Hard',
    prompt: [
      'DIFFICULTY: HARD - a stretch case at final-round level.',
      'Be deliberately ambiguous: the prompt gives the client situation and ONE broad question with no guiding sub-questions - the candidate must scope the problem themselves.',
      'Tougher quant: multi-step calculations with non-round numbers (percentages, growth rates, weighted averages) that must be combined across exhibits.',
      'case_data must contain TWO exhibit blocks (starting "Exhibit 1 - <title>:" and "Exhibit 2 - <title>:") plus exactly one plausible but non-essential distractor fact that a sharp candidate should recognize and set aside.',
    ].join(' '),
  },
};

function normalizeDifficulty(raw) {
  const text = String(raw || '').toLowerCase().trim();
  if (!text) return null;
  if (/easy|found|beginner|starter|simple|gentle/.test(text)) return 'easy';
  if (/hard|stretch|advanc|difficult|tough|expert|final/.test(text)) return 'hard';
  if (/med|intermediate|balanc|standard|normal|regular/.test(text)) return 'medium';
  return null;
}

// ---- Exhibit specs (v8, reworked v11): the visual exhibit per case type ---
// The generator must return exhibit_chart data that mirrors the "Exhibit 1"
// block of case_data; the app renders it above the case facts. v11: the
// type below is a SUGGESTION - the model picks whichever representation
// makes the numbers fastest to grasp (line for trends, bar for few-category
// comparisons, pie for part-to-whole, TABLE for reference/anchor facts,
// mixed units, or dense multi-field data). Rule: if a chart does not beat a
// table for legibility, it must be a table - never chart for decoration.
// market_sizing exhibits carry only anchor facts, never the answer.
const CASE_TYPE_CHARTS = {
  profitability: { type: 'pie', guidance: 'the revenue or cost breakdown at the heart of the diagnosis (e.g. revenue share by product line, or cost share by cost bucket)' },
  market_entry: { type: 'bar', guidance: 'the size or growth of the target market by segment or region' },
  market_sizing: { type: 'table', guidance: 'ONLY anchor/reference facts (e.g. population by segment, household size, a price point) - these are lookup data, so a clean table usually reads fastest; NEVER show the estimation funnel down to the answer - building the estimation is the whole test' },
  growth_strategy: { type: 'line', guidance: 'the client revenue or volume trend across 3-5 periods' },
  mna: { type: 'bar', guidance: 'the revenue or EBITDA of the acquisition target across 3-5 periods' },
  pricing: { type: 'bar', guidance: 'the competitor or reference price points the candidate must anchor against' },
  competitive_response: { type: 'bar', guidance: 'market share or sales by player, or client sales before and after the competitor move' },
  product_launch: { type: 'bar', guidance: 'target segment sizes or channel volumes relevant to the launch decision' },
  financial_analysis: { type: 'bar', guidance: 'the year-over-year revenue or cost trend (3-5 periods) from the simplified P&L' },
  credit_assessment: { type: 'bar', guidance: 'the borrower cash flow or revenue versus annual debt service across periods' },
  due_diligence: { type: 'bar', guidance: 'the reported revenue or margin trend of the target that the candidate must probe' },
  operations_optimization: { type: 'bar', guidance: 'throughput, capacity, or cost per unit by node, line, or SKU' },
  unit_economics: { type: 'bar', guidance: 'the per-order or per-user economics components (e.g. basket value, delivery cost, discounts, payment fees)' },
  distribution_strategy: { type: 'bar', guidance: 'channel size, growth, or margin compared across the channels in play' },
};

// Sanitize the model's exhibit_chart before it is stored: numeric values
// only, at most 5 chart points, a type the app can actually render, and
// (v11) an optional columns/rows table payload for table exhibits. Returns
// null (exhibit silently omitted) when the data is unusable - the case
// still stands on its text exhibits, so a case with no usable exhibit
// never shows an empty chart shell.
function sanitizeChart(raw, fallbackType) {
  const chart = asObject(raw);
  const allowedTypes = ['bar', 'pie', 'line', 'funnel', 'table'];
  const source = Array.isArray(chart.data) ? chart.data : [];
  const points = [];
  source.forEach(function (item) {
    if (!item || typeof item !== 'object' || points.length >= 5) return;
    const label = clampText(String(item.label === undefined || item.label === null ? '' : item.label).trim(), 60);
    const value = Number(item.value);
    if (label && Number.isFinite(value) && value >= 0) points.push({ label: label, value: value });
  });
  const columns = (Array.isArray(chart.columns) ? chart.columns : [])
    .map(function (cell) { return clampText(String(cell === undefined || cell === null ? '' : cell).trim(), 60); })
    .filter(function (cell) { return cell.length > 0; })
    .slice(0, 5);
  const rows = (Array.isArray(chart.rows) ? chart.rows : [])
    .map(function (row) {
      return (Array.isArray(row) ? row : []).map(function (cell) {
        return clampText(String(cell === undefined || cell === null ? '' : cell).trim(), 80);
      });
    })
    .filter(function (row) { return row.some(function (cell) { return cell.length > 0; }); })
    .slice(0, 8);
  const hasTable = columns.length >= 2 && rows.length >= 2;
  if (points.length < 2 && !hasTable) return null;
  let type = String(chart.type || '').toLowerCase().trim();
  if (allowedTypes.indexOf(type) < 0) type = fallbackType;
  const sanitized = {
    type: type,
    title: clampText(String(chart.title || '').trim(), 120) || 'Data provided',
    unit: clampText(String(chart.unit || '').trim(), 48),
    data: points,
  };
  if (hasTable) {
    // A full columns/rows payload always wins - the model sent table data.
    sanitized.type = 'table';
    sanitized.columns = columns;
    sanitized.rows = rows;
  }
  return sanitized;
}

function normalizeCaseType(raw) {
  const text = String(raw || '').toLowerCase().trim();
  if (!text || text === 'mixed' || text === 'mix' || text === 'random' || text === 'any' || text === 'surprise me') return null;
  if (/m\s*&\s*a|m&a|merger|acquisi|valuation/.test(text)) return 'mna';
  if (/due diligence|diligence|audit/.test(text)) return 'due_diligence';
  if (/credit|lend|loan/.test(text)) return 'credit_assessment';
  if (/financial analysis|financial statement|financial performance|finance case/.test(text)) return 'financial_analysis';
  if (/unit econom|ltv|cac|per.order|per.user/.test(text)) return 'unit_economics';
  if (/distribut|channel|route.to.market|bancassurance/.test(text)) return 'distribution_strategy';
  if (/operation|cost reduction|cost.cutting|capacity|bottleneck|process improvement|supply chain/.test(text)) return 'operations_optimization';
  if (/siz|estimat|guesstimate/.test(text)) return 'market_sizing';
  if (/entry|enter/.test(text)) return 'market_entry';
  if (/launch|new product|go.to.market|gtm/.test(text)) return 'product_launch';
  if (/profit/.test(text)) return 'profitability';
  if (/growth|grow/.test(text)) return 'growth_strategy';
  if (/pric/.test(text)) return 'pricing';
  if (/competit|response|defend/.test(text)) return 'competitive_response';
  const direct = text.replace(/[^a-z]+/g, '_');
  return CASE_TYPES[direct] ? direct : null;
}

function typeIdOfCase(row) {
  const meta = asObject(asObject(row.rubric_json)._casemate);
  if (meta.case_type_id && CASE_TYPES[meta.case_type_id]) return meta.case_type_id;
  return normalizeCaseType(row.case_type);
}

async function latestAssessment() {
  const result = await db.query('assessment_results', {
    where: { session_id: sessionId },
    orderBy: [{ column: 'created_at', direction: 'desc' }],
    limit: 1,
  });
  return result.rows && result.rows[0] ? result.rows[0] : null;
}

async function loadCase(caseId) {
  const found = await db.query('case_practice_cases', {
    where: [{ column: 'id', operator: '=', value: caseId }, { column: 'session_id', operator: '=', value: sessionId }],
    limit: 1,
  });
  return found.rows && found.rows[0] ? found.rows[0] : null;
}

const WALKTHROUGH_STEPS = ['structure', 'math', 'recommendation'];

// v13: the shared rubric for prebuilt Case Library cases. Generated Case Room
// cases get a rubric written for them; library cases ship with a model answer
// instead, so grading applies these standard weights (identical dimensions and
// weighting to the generated ones, so scores are comparable on the dashboard).
const LIBRARY_RUBRIC = {
  structure: {
    weight: 25,
    excellent: 'A MECE structure tailored to THIS client question, stated up front and then actually followed.',
    watch_for: 'A memorised framework recited without adapting it to the client\'s real question.',
  },
  math: {
    weight: 25,
    excellent: 'Correct arithmetic worked from the exhibit figures, with the decisive numbers quoted explicitly.',
    watch_for: 'Conclusions asserted without computing anything from the exhibits, or figures misread.',
  },
  communication: {
    weight: 20,
    excellent: 'Answer-first, signposted, and concise enough to deliver out loud in an interview.',
    watch_for: 'A wall of text, or the recommendation buried at the very end.',
  },
  recommendation_quality: {
    weight: 30,
    excellent: 'A specific, decisive recommendation backed by the case numbers, with the main risk and a next step.',
    watch_for: 'A vague \'it depends\' with no decision, or advice the case data does not support.',
  },
};

if (!sessionId) {
  respond(401, { error: 'Sign in to generate and save your case practice.' });
} else if ((action === 'generate' || action === 'open_library') && !(await ensureProForGenerate())) {
  // ensureProForGenerate already responded (402 subscription_required or
  // 503 subscription_check_unavailable) — nothing more to do here.
} else if (action === 'generate') {
  const assessment = await latestAssessment();
  const direction = asObject(assessment && assessment.result_json);
  const assessmentTarget = validTarget(direction.required_case_count);
  const targetCount = assessmentTarget || validTarget(body.targetCount) || 12;
  const mode = body.mode === 'guided' ? 'guided' : 'classic';
  // v11: the user-chosen difficulty dial. Unknown or missing values fall
  // back to a balanced Medium so older clients and agent tool calls keep
  // working exactly as before.
  const difficultyId = normalizeDifficulty(body.difficulty || body.difficulty_level || query.difficulty) || 'medium';
  const difficultyLevel = DIFFICULTY_LEVELS[difficultyId];

  const targetIndustry = firstNamed(direction.industry_fit, 'Business strategy (general \u2014 no saved fit assessment yet)');
  const targetFunction = firstNamed(direction.function_fit, 'General management');
  const topProgram = Array.isArray(direction.programs) && direction.programs[0] ? direction.programs[0] : {};
  // Program-targeted drills (v5): \u201cStart Case Pool for this program\u201d passes
  // targetProgram so the generated case mirrors that program\u2019s world even
  // when it is not the candidate\u2019s top-ranked match.
  const programOverride = clampText(String(body.targetProgram || body.target_program || query.target_program || '').trim(), 200);
  const focusProgramName = programOverride || String(topProgram.program || topProgram.company || '');
  const competitiveness = Number(topProgram.competitiveness || 4);
  const readinessBar = competitiveness >= 5 ? 4.3 : competitiveness >= 4 ? 4.0 : 3.8;

  const history = await db.query('case_practice_cases', {
    where: [{ column: 'session_id', operator: '=', value: sessionId }],
    orderBy: [{ column: 'created_at', direction: 'desc' }],
    limit: 100,
  });
  const historyRows = history.rows || [];
  const completedCount = historyRows.filter(function (row) { return row.status === 'completed'; }).length;
  const sequence = completedCount + 1;

  // Case type: explicit pick wins; otherwise mixed rotation \u2014 pick the type
  // this candidate has practiced least, avoiding the type of their most
  // recent case so consecutive drills always vary. v7: the app may pass
  // preferred_types (the case type ids mapped to this candidate's matched
  // industry/function \u2014 see caseTypeCatalog.ts), in which case the rotation
  // stays within THEIR relevant set instead of the full catalog.
  let caseTypeId = normalizeCaseType(body.caseType || body.case_type || query.case_type);
  let typeSource = caseTypeId ? 'picked' : 'mixed';
  if (!caseTypeId) {
    const preferredRaw = Array.isArray(body.preferredTypes) ? body.preferredTypes : (Array.isArray(body.preferred_types) ? body.preferred_types : []);
    const preferred = [];
    preferredRaw.forEach(function (item) {
      const id = normalizeCaseType(item);
      if (id && preferred.indexOf(id) < 0) preferred.push(id);
    });
    const rotationIds = preferred.length >= 2 ? preferred : CASE_TYPE_IDS;
    const counts = {};
    rotationIds.forEach(function (id) { counts[id] = 0; });
    historyRows.forEach(function (row) {
      const id = typeIdOfCase(row);
      if (id && counts[id] !== undefined) counts[id] += 1;
    });
    const lastTypeId = historyRows[0] ? typeIdOfCase(historyRows[0]) : null;
    let pool = rotationIds.filter(function (id) { return id !== lastTypeId; });
    if (pool.length === 0) pool = rotationIds.slice();
    const minCount = Math.min.apply(null, pool.map(function (id) { return counts[id]; }));
    const leastPracticed = pool.filter(function (id) { return counts[id] === minCount; });
    caseTypeId = leastPracticed[Math.floor(Math.random() * leastPracticed.length)];
  }
  const caseType = CASE_TYPES[caseTypeId];
  const chartSpec = CASE_TYPE_CHARTS[caseTypeId] || null;

  const systemPrompt = 'You are Mate, Casemate\'s warm but rigorous case-interview coach for Vietnamese university candidates. Create one original, realistic practice case. Write ALL case content - title, prompt, case facts, exhibit labels, and rubric text - in ENGLISH (the language these case rounds are run in); keep real Vietnamese company and place names as they are. Return valid JSON only, with no markdown.';
  const userPrompt = [
    'Create practice case number ' + sequence + ' of ' + targetCount + '.',
    'CASE TYPE (mandatory): ' + caseType.label + '. ' + caseType.brief,
    'What this case type must test: ' + caseType.focus + '.',
    difficultyLevel.prompt,
    'Candidate target industry: ' + targetIndustry + '.',
    'Candidate target function: ' + targetFunction + '.',
    'Top target program/company: ' + (focusProgramName || 'management trainee or consulting recruitment') + '.',
    programOverride ? 'This case is SPECIFICALLY practice for the ' + programOverride + ' selection process \u2014 set it in an industry and business context that mirrors what that program tests.' : '',
    'Candidate snapshot: ' + String((assessment && assessment.candidate_snapshot) || 'No assessment snapshot available \u2014 build a strong general business case for a Vietnamese MT/consulting candidate.') + '.',
    'Set the case in a realistic industry context (Vietnamese or Southeast Asian setting preferred where natural). The case_type field in your JSON must be exactly "' + caseType.label + '".',
    'Use numbers that can be solved without outside research. Keep the prompt challenging but answerable in 20\u201330 minutes.',
    'Tailor the rubric\'s "excellent" and "watch_for" strings to THIS case type and THIS case\'s specific numbers \u2014 e.g. a Market Sizing case rewards explicit assumptions and a sanity check; an M&A case rewards synergies-vs-price logic.',
    'Formatting for case_data (critical \u2014 it renders as plain text): use REAL line breaks, never one long paragraph. Put each fact on its own line, group facts under short section labels, leave a blank line between sections, and present every exhibit as its own block starting "Exhibit 1 \u2014 <title>:" followed by one "- label: value" line per data point. No markdown tables.',
    'Formatting for prompt: 2\u20133 short paragraphs separated by blank lines \u2014 client situation first, then the question.',
    chartSpec
      ? 'Visual exhibit (mandatory for this case type): also return exhibit_chart - the visual "Exhibit 1" handout the app renders above the case facts. FIRST pick the representation that makes the numbers FASTEST to grasp: "line" for a trend across time periods, "bar" for comparing a few categories, "pie" only for a part-to-whole split of one total, "table" for reference or anchor facts, mixed units, or dense multi-field data. THE RULE: if a chart would not make the numbers faster to grasp than a table, use "table" - never chart data for decoration. For this case type the exhibit should show ' + chartSpec.guidance + '; the suggested form is "' + chartSpec.type + '", but override it whenever the data you actually generate reads clearer another way. For chart forms use 3-5 data points, each {"label","value"} where value is a plain number (no currency symbols, no thousands separators) and every point shares ONE unit given in the top-level "unit" field (e.g. "VND bn", "% of revenue") - if the numbers need different units, use "table" instead. For "table" return "columns" (2-4 short headers) and "rows" (2-6 rows of short text cells - units may sit inside cells) and leave "data" as an empty array. Keep labels short and legible. CONSISTENCY IS CRITICAL: the exact same numbers must appear in case_data as the "Exhibit 1" block, and the prompt narrative must never contradict them.'
      : '',
    'Return this exact JSON shape:',
    '{"case_title":"string","case_type":"' + caseType.label + '","practice_focus":"string","prompt":"string","case_data":"string with all facts and exhibits","rubric":{"structure":{"weight":25,"excellent":"string","watch_for":"string"},"math":{"weight":25,"excellent":"string","watch_for":"string"},"communication":{"weight":20,"excellent":"string","watch_for":"string"},"recommendation_quality":{"weight":30,"excellent":"string","watch_for":"string"}}' + (chartSpec ? ',"exhibit_chart":{"type":"bar|pie|line|table","title":"string","unit":"string","data":[{"label":"string","value":123}],"columns":["string"],"rows":[["string"]]}' : '') + '}'
  ].filter(function (line) { return line !== ''; }).join('\n');

  try {
    const generatedResult = await platform.generateText({
      systemPrompt: systemPrompt,
      userPrompt: userPrompt,
      model: 'gpt-4o-mini',
      // Hard cases carry two exhibits and a full rubric - an explicit cap
      // prevents the JSON from being silently truncated mid-generation.
      maxTokens: 3000,
    });
    const generated = cleanJson(generatedResult.text);
    const rubric = asObject(generated.rubric);
    const metaEnvelope = { mode: mode, case_type_id: caseTypeId, type_source: typeSource, difficulty_id: difficultyId };
    const exhibitChart = chartSpec ? sanitizeChart(generated.exhibit_chart, chartSpec.type) : null;
    if (exhibitChart) metaEnvelope.exhibit_chart = exhibitChart;
    const inserted = await db.insert('case_practice_cases', {
      case_title: String(generated.case_title || 'Personalized practice case'),
      case_type: caseType.label,
      difficulty: difficultyLevel.label,
      target_program: focusProgramName,
      target_industry: targetIndustry,
      target_function: targetFunction,
      target_count: targetCount,
      readiness_bar: readinessBar,
      source_assessment_id: assessment ? assessment.id : null,
      practice_focus: String(generated.practice_focus || caseType.focus),
      prompt: String(generated.prompt || ''),
      case_data: String(generated.case_data || ''),
      rubric_json: mergeRubric(rubric, metaEnvelope),
      status: 'pending',
      session_id: sessionId,
    });
    respond(200, {
      success: true,
      case: inserted.insertedRows[0],
      case_type_id: caseTypeId,
      case_type_label: caseType.label,
      difficulty: difficultyLevel.label,
      mode: mode,
      targetSource: assessmentTarget ? 'assessment' : (validTarget(body.targetCount) ? 'manual' : 'default'),
      personalized: !!assessment,
      message: 'A new ' + caseType.label + ' practice case (difficulty: ' + difficultyLevel.label + ', id ' + inserted.insertedRows[0].id + ') is saved to this candidate\'s Case Pool log. If you are presenting it in chat: give the title, the prompt, and the case facts/exhibits compactly (keep the line breaks), then tell them they can EITHER answer right here in one message (you will grade it with the grade_practice_case tool using this case id) OR open the Case Pool app from the dock to work it with typing, photo-of-handwriting, or a guided step-by-step walkthrough.' + (exhibitChart ? ' Inside the app, the Exhibit 1 data also renders visually - as a chart or a clean table, whichever form reads clearest - like a real interview handout.' : ''),
    });
  } catch (error) {
    console.error('Case generation failed', error);
    respond(500, { error: error && error.message ? error.message : 'Mate could not generate this case. Please try again.' });
  }
} else if (action === 'open_library') {
  // A prebuilt library case must exist in the candidate's drill log BEFORE
  // they begin answering. This server-side, idempotent upsert avoids the old
  // browser-write race that surfaced as "not found in your drill log" on submit.
  const lib = asObject(body.libraryCase);
  const libraryId = clampText(lib.id, 40).trim();
  if (!libraryId) {
    respond(400, { error: 'Mate could not tell which library case was opened. Please reopen the case and try again.' });
  } else {
    const focusKey = 'library:' + libraryId;
    try {
      const existingRows = await db.query('case_practice_cases', {
        where: [
          { column: 'session_id', operator: '=', value: sessionId },
          { column: 'practice_focus', operator: '=', value: focusKey },
        ],
        orderBy: [{ column: 'created_at', direction: 'desc' }],
        limit: 1,
      });
      let row = existingRows.rows && existingRows.rows[0] ? existingRows.rows[0] : null;
      if (!row) {
        const model = asObject(lib.model_answer);
        const findings = (Array.isArray(model.key_findings) ? model.key_findings : [])
          .slice(0, 6)
          .map(function (item) { return clampText(item, 700).trim(); })
          .filter(function (item) { return item.length > 0; });
        const rubric = Object.assign({}, LIBRARY_RUBRIC, {
          reference_model_answer: {
            note: 'Published model answer for this exact library case — the standard a 5/5 answer reaches. Grade the candidate against it; never contradict it.',
            framework: clampText(model.framework, 1200).trim(),
            key_findings: findings,
            recommendation: clampText(model.recommendation, 3000).trim(),
          },
        });
        const meta = {
          mode: 'library',
          source: 'library',
          library_case_id: libraryId,
          pool_type: clampText(lib.pool_type, 40).trim(),
          pool_industry: clampText(lib.pool_industry, 40).trim(),
          difficulty_id: clampText(lib.difficulty_id, 20).trim(),
        };
        const inserted = await db.insert('case_practice_cases', {
          case_title: clampText(lib.title, 300).trim() || 'Case Library case',
          case_type: clampText(lib.type_label, 120).trim() || 'Full case',
          difficulty: clampText(lib.difficulty_label, 60).trim() || null,
          practice_focus: focusKey,
          prompt: clampText(lib.situation, 5000).trim() + (lib.key_question ? '\n\nKey question: ' + clampText(lib.key_question, 1200).trim() : ''),
          case_data: clampText(lib.exhibits_text, 8000).trim(),
          rubric_json: mergeRubric(rubric, meta),
          status: 'pending',
          session_id: sessionId,
        });
        row = inserted.insertedRows && inserted.insertedRows[0] ? inserted.insertedRows[0] : null;
      }
      if (!row) throw new Error('Drill-log insert returned no row');
      respond(200, { success: true, case: row, created: !(existingRows.rows && existingRows.rows[0]) });
    } catch (error) {
      const detail = error && error.message ? error.message : String(error);
      console.error('Library case open logging failed: ' + detail);
      respond(500, { error: 'Mate could not start your drill log. Please reopen the case and try again.' });
    }
  }
} else if (action === 'walkthrough') {
  const caseId = parseInt(body.caseId, 10);
  const stepKey = String(body.step || '');
  const responseText = clampText(String(body.response || '').trim(), 8000);
  const stepIndex = WALKTHROUGH_STEPS.indexOf(stepKey);

  if (!caseId || stepIndex < 0) {
    respond(400, { error: 'Mate could not read that walkthrough step. Please refresh and try again.' });
  } else if (responseText.length < 30) {
    respond(400, { error: 'Give Mate a little more to work with \u2014 at least a couple of sentences for this step.' });
  } else {
    const practiceCase = await loadCase(caseId);
    if (!practiceCase) {
      respond(404, { error: 'That practice case was not found in your drill log.' });
    } else if (practiceCase.status === 'completed') {
      respond(400, { error: 'This case is already graded \u2014 generate a new one to keep drilling.' });
    } else {
      const parts = splitRubric(practiceCase.rubric_json);
      const meta = parts.meta;
      const walkthrough = asObject(meta.walkthrough);
      const steps = Array.isArray(walkthrough.steps) ? walkthrough.steps : [];

      if (steps.length !== stepIndex) {
        respond(409, { error: 'This walkthrough moved on \u2014 reopen the case to continue where you left off.' });
      } else {
        const stepGoals = {
          structure: 'Judge whether the structure is MECE, tailored to THIS case rather than a memorized framework, and covers the drivers hidden in the case facts.',
          math: 'Check the calculations against the exhibits in the case data: the setup, the arithmetic, and whether the candidate interpreted what the result means.',
          recommendation: 'Judge whether the recommendation is answer-first, backed by the candidate\'s own numbers, and includes risks or next steps.',
        };
        const isFinal = stepIndex === WALKTHROUGH_STEPS.length - 1;
        const prior = steps.map(function (item) {
          return String(item.step || '').toUpperCase() + ' \u2014 the candidate said: ' + String(item.response || '');
        }).join('\n');

        const systemPrompt = 'You are Mate, Casemate\'s warm but rigorous case-interview coach, walking one candidate through one case step by step. Coach ONLY the current step. Be candid, supportive, and specific \u2014 quote their own words and the case facts. Return valid JSON only, with no markdown.';
        const userPrompt = [
          'CASE TITLE: ' + practiceCase.case_title,
          'CASE TYPE: ' + practiceCase.case_type,
          'PROMPT: ' + practiceCase.prompt,
          'CASE DATA: ' + String(practiceCase.case_data || ''),
          'RUBRIC: ' + JSON.stringify(parts.rubric),
          prior ? 'EARLIER STEPS:\n' + prior : 'This is the first step of the walkthrough.',
          'CURRENT STEP: ' + stepKey + '. ' + stepGoals[stepKey],
          'CANDIDATE RESPONSE FOR THIS STEP: ' + responseText,
          isFinal
            ? 'This is the final step, so set next_question to an empty string.'
            : 'Then write next_question: one warm, specific question that opens the ' + WALKTHROUGH_STEPS[stepIndex + 1] + ' step, pointing the candidate at the exact case facts or exhibit numbers they should use.',
          'Language: write feedback, strengths, gaps, model_hint, and next_question in the same language the candidate wrote their response in (Vietnamese or English); keep all numbers and framework names exact.',
          'Return this exact JSON shape:',
          '{"step_score":1,"feedback":"2-4 warm, specific sentences about this step","strengths":["string"],"gaps":["string"],"model_hint":"one concrete example of a stronger move for this step, not a full answer","next_question":"string"}'
        ].join('\n\n');

        try {
          const coachResult = await platform.generateText({
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            model: 'gpt-4o-mini',
          });
          const coach = cleanJson(coachResult.text);
          const entry = {
            step: stepKey,
            question: clampText(walkthrough.next_question || '', 2000),
            response: responseText,
            step_score: Math.max(1, Math.min(5, Math.round(Number(coach.step_score) || 3))),
            feedback: clampText(coach.feedback || 'Nice work \u2014 keep going.', 4000),
            strengths: (Array.isArray(coach.strengths) ? coach.strengths : []).slice(0, 4).map(function (item) { return clampText(item, 500); }),
            gaps: (Array.isArray(coach.gaps) ? coach.gaps : []).slice(0, 4).map(function (item) { return clampText(item, 500); }),
            model_hint: clampText(coach.model_hint || '', 2000),
          };
          steps.push(entry);
          const done = steps.length >= WALKTHROUGH_STEPS.length;
          const updatedWalkthrough = {
            steps: steps,
            current: done ? 'done' : WALKTHROUGH_STEPS[steps.length],
            next_question: done ? '' : clampText(coach.next_question || '', 2000),
          };
          if (done) {
            updatedWalkthrough.draft_answer = 'STRUCTURE:\n' + String(steps[0].response) + '\n\nMATH & NUMBERS:\n' + String(steps[1].response) + '\n\nRECOMMENDATION:\n' + String(steps[2].response);
          }
          meta.mode = 'guided';
          meta.walkthrough = updatedWalkthrough;
          // db.update mis-serializes raw arrays/objects for json columns
          // ("invalid input syntax for type json"), so json fields are always
          // passed as JSON strings on update.
          const updated = await db.update('case_practice_cases', { id: caseId, session_id: sessionId }, {
            rubric_json: JSON.stringify(mergeRubric(parts.rubric, meta)),
            updated_at: new Date().toISOString(),
          });
          respond(200, { success: true, case: updated.updatedRows[0], coach: entry, done: done });
        } catch (error) {
          console.error('Walkthrough coaching failed', error);
          respond(500, { error: error && error.message ? error.message : 'Mate could not review this step. Please try again.' });
        }
      }
    }
  }
} else if (action === 'grade') {
  const caseId = parseInt(body.caseId || body.case_id || query.case_id, 10);
  const answerText = String(body.answer || '').trim();
  if (!caseId || answerText.length < 80) {
    respond(400, { error: 'Share a complete answer of at least 80 characters (structure, numbers, and a recommendation) so Mate can grade it fairly.' });
  } else {
    const practiceCase = await loadCase(caseId);
    if (!practiceCase) {
      respond(404, { error: 'That practice case was not found in your drill log.' });
    } else if (asObject(asObject(practiceCase.rubric_json)._casemate).skipped) {
      respond(400, { error: 'This case was skipped and its answer revealed, so it cannot be graded \u2014 generate a fresh case to keep drilling.' });
    } else {
      const parts = splitRubric(practiceCase.rubric_json);
      const meta = parts.meta;
      const clientMeta = asObject(body.meta);
      if (clientMeta.mode === 'photo' || clientMeta.mode === 'guided' || clientMeta.mode === 'classic') {
        meta.mode = clientMeta.mode;
      }
      if (typeof clientMeta.photoUrl === 'string' && clientMeta.photoUrl.indexOf('https://storage.googleapis.com/') === 0) {
        meta.photo_url = clampText(clientMeta.photoUrl, 1000);
      }
      const structured = asObject(clientMeta.structured);
      if (structured.structure || structured.math || structured.recommendation || structured.diagram) {
        meta.structured = {
          structure: clampText(structured.structure, 8000),
          math: clampText(structured.math, 8000),
          recommendation: clampText(structured.recommendation, 8000),
          diagram: clampText(structured.diagram, 8000),
        };
      }

      const modeNote = meta.mode === 'photo'
        ? 'The answer was transcribed from a photo of the candidate\'s handwritten working notes and then edited by them. Grade the content and clarity of the answer itself; never comment on handwriting or photo quality.'
        : meta.mode === 'guided'
          ? 'The candidate built this answer step by step in a guided walkthrough with you. Grade the assembled answer on its own merits.'
          : '';

      const systemPrompt = 'You are Mate, Casemate\'s fair and specific case-interview grader. Apply only the supplied case and rubric. Return valid JSON only, with no markdown.';
      const userPrompt = [
        'CASE TITLE: ' + practiceCase.case_title,
        'CASE TYPE: ' + practiceCase.case_type,
        'PROMPT: ' + practiceCase.prompt,
        'CASE DATA: ' + String(practiceCase.case_data || ''),
        'RUBRIC: ' + JSON.stringify(parts.rubric),
        modeNote,
        'CANDIDATE ANSWER: ' + answerText,
        'Grade each dimension from 1 to 5. Cite concrete evidence from the answer and give one immediately actionable next step for every dimension. The overall score must be an integer from 1 to 5 reflecting the weighted rubric. Be candid, supportive, and specific.',
        'Also write model_answer - the answer an excellent candidate would give to THIS case, worked from the case data: framework (name the framework or structure to apply and, in one sentence, why it fits this case), key_findings (3 to 5 short bullets, each one concrete insight computed from the case numbers - include the actual figures), and recommendation (the clear answer-first conclusion: the decision or direction and its strongest reason).',
        'Then write delta - a specific comparison of the candidate\'s answer against that model_answer. matched = the elements the candidate got right: name the exact analysis, structure branch, or number (e.g. "Computed the break-even volume correctly at 40,000 units"). missing = the specific elements absent or wrong versus the model answer (e.g. "Skipped the competitive analysis entirely - never asked who else serves this segment"). NEVER write generic items like "improve your structure" - every item must name a concrete element of THIS case. Give 1-4 items per list; matched may be empty only if truly nothing matched.',
        'Then write recommendations as 2-4 objects, each {"action","why"}: action = one specific practice step; why = one sentence that ties the action DIRECTLY to this case\'s delta - reference the exact element from missing and why it matters for this case type (e.g. "In this case you skipped the competitive analysis - a core step of any market entry structure, so this rep closes that gap."). Never write a boilerplate why that could apply to any case.',
        'Language: write model_answer, delta, and every why in the same language the candidate wrote their answer in (Vietnamese or English); keep all numbers and framework names exact.',
        'Return this exact JSON shape:',
        '{"score":1,"summary":"string","breakdown":{"structure":{"score":1,"evidence":"string","next_step":"string"},"math":{"score":1,"evidence":"string","next_step":"string"},"communication":{"score":1,"evidence":"string","next_step":"string"},"recommendation_quality":{"score":1,"evidence":"string","next_step":"string"}},"model_answer":{"framework":"string","key_findings":["string","string","string"],"recommendation":"string"},"delta":{"matched":["string"],"missing":["string"]},"recommendations":[{"action":"string","why":"string"},{"action":"string","why":"string"}]}'
      ].filter(function (line) { return line !== ''; }).join('\n\n');

      try {
        const gradeResult = await platform.generateText({
          systemPrompt: systemPrompt,
          userPrompt: userPrompt,
          model: 'gpt-4o-mini',
          // v12: the grade now also carries a full model answer, delta, and
          // reasoned action plan - cap high enough that the JSON never
          // truncates mid-generation.
          maxTokens: 3000,
        });
        const grade = cleanJson(gradeResult.text);
        const dimensions = ['structure', 'math', 'communication', 'recommendation_quality'];
        const breakdown = {};
        const dimensionScores = [];
        dimensions.forEach(function (key) {
          const item = asObject(grade.breakdown && grade.breakdown[key]);
          const itemScore = Math.max(1, Math.min(5, Math.round(Number(item.score) || 1)));
          dimensionScores.push(itemScore);
          breakdown[key] = {
            score: itemScore,
            evidence: String(item.evidence || 'No clear evidence was provided.'),
            next_step: String(item.next_step || 'Make this dimension more explicit in your next answer.'),
          };
        });
        const fallbackScore = Math.round(dimensionScores.reduce(function (sum, value) { return sum + value; }, 0) / dimensionScores.length);
        const score = Math.max(1, Math.min(5, Math.round(Number(grade.score) || fallbackScore)));
        // v12: recommendations are {action, why} objects - the why ties each
        // action back to THIS case's delta. Plain-string items (an older or
        // partial model response) are kept with an empty why so nothing is
        // silently dropped.
        const recommendations = (Array.isArray(grade.recommendations) ? grade.recommendations : []).slice(0, 5).map(function (item) {
          if (item && typeof item === 'object' && !Array.isArray(item)) {
            return { action: clampText(item.action || item.text || '', 600).trim(), why: clampText(item.why || item.reason || '', 800).trim() };
          }
          return { action: clampText(item, 600).trim(), why: '' };
        }).filter(function (item) { return item.action.length > 0; });
        // v12: the model answer + delta comparison live in the meta envelope
        // (rubric_json._casemate.grade_report) because WorkspaceDB tables
        // cannot gain new columns after creation. Missing/empty fields are
        // stored as null so the app simply hides those sections.
        const cleanReportList = function (list, max) {
          return (Array.isArray(list) ? list : []).slice(0, max).map(function (item) { return clampText(item, 500).trim(); }).filter(function (item) { return item.length > 0; });
        };
        const modelAnswerRaw = asObject(grade.model_answer);
        const modelAnswer = {
          framework: clampText(modelAnswerRaw.framework, 600).trim(),
          key_findings: cleanReportList(modelAnswerRaw.key_findings, 5),
          recommendation: clampText(modelAnswerRaw.recommendation, 1500).trim(),
        };
        const deltaRaw = asObject(grade.delta);
        const delta = { matched: cleanReportList(deltaRaw.matched, 6), missing: cleanReportList(deltaRaw.missing, 6) };
        meta.grade_report = {
          summary: clampText(grade.summary || '', 1200).trim(),
          model_answer: (modelAnswer.framework || modelAnswer.key_findings.length > 0 || modelAnswer.recommendation) ? modelAnswer : null,
          delta: (delta.matched.length > 0 || delta.missing.length > 0) ? delta : null,
        };
        const now = new Date().toISOString();
        // json columns must be passed as JSON strings on update (raw arrays
        // fail with "invalid input syntax for type json" — the bug that left
        // every v3 case permanently ungraded).
        const updated = await db.update('case_practice_cases', { id: caseId, session_id: sessionId }, {
          answer_text: answerText,
          score: score,
          score_breakdown_json: JSON.stringify(breakdown),
          recommendations_json: JSON.stringify(recommendations),
          rubric_json: JSON.stringify(mergeRubric(parts.rubric, meta)),
          target_count: validTarget(practiceCase.target_count) || validTarget(body.targetCount),
          readiness_bar: Number(practiceCase.readiness_bar || 4),
          status: 'completed',
          completed_on: now,
          updated_at: now,
        });
        respond(200, {
          success: true,
          case: updated.updatedRows[0],
          message: 'Grade saved to this candidate\'s Case Pool log and their progress tracker updated. If you are presenting it in chat: lead with the overall grade (x/5); then show Mate\'s model answer for this exact case from rubric_json._casemate.grade_report.model_answer (the framework, the key findings, and the recommendation) so they see what good looks like; then the delta from grade_report.delta - what they got right and what they missed; then the per-dimension evidence and next steps compactly; and close with the action plan - each item in recommendations_json is {action, why}, so give every action WITH its why, which ties it to what was missing in this case. Remind them the full report and their progress live in the Case Pool app.',
        });
      } catch (error) {
        console.error('Case grading failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not grade this answer. Please try again.' });
      }
    }
  }
} else if (action === 'grade_library') {
  const lib = asObject(body.libraryCase);
  const libraryId = clampText(lib.id, 40).trim();
  const answerText = String(body.answer || '').trim();
  if (!libraryId) {
    respond(400, { error: 'Mate could not tell which library case this answer belongs to. Please reopen the case and try again.' });
  } else if (answerText.length < 80) {
    respond(400, { error: 'Share a complete answer of at least 80 characters (your structure, the numbers you worked out, and a recommendation) so Mate can grade it fairly.' });
  } else {
    const libModel = asObject(lib.model_answer);
    const referenceFindings = (Array.isArray(libModel.key_findings) ? libModel.key_findings : [])
      .slice(0, 6)
      .map(function (item) { return clampText(item, 700).trim(); })
      .filter(function (item) { return item.length > 0; });
    // The library's own model answer IS the reference standard - it is never
      // regenerated, so what the learner reveals in the app and what they were
      // graded against are always the same text.
    const referenceAnswer = {
      framework: clampText(libModel.framework_applied, 900).trim(),
      key_findings: referenceFindings,
      recommendation: clampText(libModel.recommendation, 2500).trim(),
    };
    const title = clampText(lib.title, 300).trim() || 'Case Library case';
    const typeLabel = clampText(lib.type_label, 120).trim() || 'Full case';
    const industryLabel = clampText(lib.industry_label, 120).trim();
    const difficultyLabel = clampText(lib.difficulty_label, 60).trim();
    const situation = clampText(lib.situation, 5000).trim();
    const keyQuestion = clampText(lib.key_question, 1200).trim();
    const exhibitsText = clampText(lib.exhibits_text, 6000).trim();
    const promptText = situation + (keyQuestion ? '\n\nKey question: ' + keyQuestion : '');

    const systemPrompt = 'You are Mate, Casemate\'s fair and specific case-interview grader. Grade only against the supplied case, rubric, and reference answer. Return valid JSON only, with no markdown.';
    const userPrompt = [
      'CASE TITLE: ' + title,
      'CASE TYPE: ' + typeLabel,
      industryLabel ? 'INDUSTRY: ' + industryLabel : '',
      difficultyLabel ? 'DIFFICULTY: ' + difficultyLabel : '',
      'SITUATION: ' + situation,
      'KEY QUESTION: ' + keyQuestion,
      'CASE DATA (the exhibits the candidate was shown): ' + exhibitsText,
      'RUBRIC: ' + JSON.stringify(LIBRARY_RUBRIC),
      'REFERENCE MODEL ANSWER (written by Casemate for THIS exact case - treat it as the standard a 5/5 answer reaches; do not rewrite it): ' + JSON.stringify(referenceAnswer),
      'CANDIDATE ANSWER: ' + answerText,
      'Grade each rubric dimension from 1 to 5. Cite concrete evidence quoted from the candidate\'s own answer and give one immediately actionable next step per dimension. The overall score must be an integer from 1 to 5 reflecting the weighted rubric. Be candid, supportive, and specific - a 5 is reserved for an answer that matches the reference on structure, numbers, and decisiveness.',
      'Then write delta - a specific comparison of the candidate\'s answer against the REFERENCE MODEL ANSWER above. matched = what they got right, naming the exact analysis, structure branch, or figure (e.g. "Identified the bottleneck stage correctly at 260 units/hour"). missing = the specific elements absent or wrong versus the reference (e.g. "Never quantified the throughput gain from lifting the bottleneck"). NEVER write generic items like "improve your structure" - every item must name a concrete element of THIS case. Give 1-4 items per list; matched may be empty only if truly nothing matched.',
      'Then write recommendations as 2-4 objects, each {"action","why"}: action = one specific practice step; why = one sentence tying that action DIRECTLY to an item in missing for THIS case. Never write a why that could apply to any case.',
      'Language: write the summary, delta, and every why in the same language the candidate wrote their answer in (Vietnamese or English); keep all numbers and framework names exact.',
      'Return this exact JSON shape:',
      '{"score":1,"summary":"string","breakdown":{"structure":{"score":1,"evidence":"string","next_step":"string"},"math":{"score":1,"evidence":"string","next_step":"string"},"communication":{"score":1,"evidence":"string","next_step":"string"},"recommendation_quality":{"score":1,"evidence":"string","next_step":"string"}},"delta":{"matched":["string"],"missing":["string"]},"recommendations":[{"action":"string","why":"string"},{"action":"string","why":"string"}]}'
    ].filter(function (line) { return line !== ''; }).join('\n\n');

    try {
      const gradeResult = await platform.generateText({
        systemPrompt: systemPrompt,
        userPrompt: userPrompt,
        model: 'gpt-4o-mini',
        maxTokens: 2400,
      });
      const grade = cleanJson(gradeResult.text);
      const dimensions = ['structure', 'math', 'communication', 'recommendation_quality'];
      const breakdown = {};
      const dimensionScores = [];
      dimensions.forEach(function (key) {
        const item = asObject(grade.breakdown && grade.breakdown[key]);
        const itemScore = Math.max(1, Math.min(5, Math.round(Number(item.score) || 1)));
        dimensionScores.push(itemScore);
        breakdown[key] = {
          score: itemScore,
          evidence: String(item.evidence || 'No clear evidence was provided.'),
          next_step: String(item.next_step || 'Make this dimension more explicit in your next answer.'),
        };
      });
      const fallbackScore = Math.round(dimensionScores.reduce(function (sum, value) { return sum + value; }, 0) / dimensionScores.length);
      const score = Math.max(1, Math.min(5, Math.round(Number(grade.score) || fallbackScore)));
      const recommendations = (Array.isArray(grade.recommendations) ? grade.recommendations : []).slice(0, 5).map(function (item) {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return { action: clampText(item.action || item.text || '', 600).trim(), why: clampText(item.why || item.reason || '', 800).trim() };
        }
        return { action: clampText(item, 600).trim(), why: '' };
      }).filter(function (item) { return item.action.length > 0; });
      const cleanReportList = function (list, max) {
        return (Array.isArray(list) ? list : []).slice(0, max).map(function (item) { return clampText(item, 500).trim(); }).filter(function (item) { return item.length > 0; });
      };
      const deltaRaw = asObject(grade.delta);
      const delta = { matched: cleanReportList(deltaRaw.matched, 6), missing: cleanReportList(deltaRaw.missing, 6) };

      const metaEnvelope = {
        mode: 'library',
        source: 'library',
        library_case_id: libraryId,
        pool_type: clampText(lib.pool_type, 40).trim(),
        pool_industry: clampText(lib.pool_industry, 40).trim(),
        difficulty_id: clampText(lib.difficulty_id, 20).trim(),
        grade_report: {
          summary: clampText(grade.summary || '', 1200).trim(),
          model_answer: (referenceAnswer.framework || referenceAnswer.key_findings.length > 0 || referenceAnswer.recommendation) ? referenceAnswer : null,
          delta: (delta.matched.length > 0 || delta.missing.length > 0) ? delta : null,
        },
      };

      // practice_focus doubles as the lookup key so a re-attempt overwrites the
      // previous grade instead of stacking duplicate rows in the dashboard.
      const focusKey = 'library:' + libraryId;
      const now = new Date().toISOString();
      const existingRows = await db.query('case_practice_cases', {
        where: [
          { column: 'session_id', operator: '=', value: sessionId },
          { column: 'practice_focus', operator: '=', value: focusKey },
        ],
        limit: 1,
      });
      const previous = existingRows.rows && existingRows.rows[0] ? existingRows.rows[0] : null;

      // Saved in the two shapes this hook has always used, because json columns
      // behave differently on the two operations: INSERT takes plain objects
      // (see the generate action) while UPDATE requires JSON STRINGS - passing
      // a raw array to update fails with 'invalid input syntax for type json',
      // the bug that once left every case permanently ungraded. So a first
      // attempt inserts the case row, and the grade is always written by an
      // update, whether the row is new or a re-attempt.
      let rowId;
      if (previous) {
        rowId = previous.id;
      } else {
        const inserted = await db.insert('case_practice_cases', {
          case_title: title,
          case_type: typeLabel,
          difficulty: difficultyLabel || null,
          practice_focus: focusKey,
          prompt: promptText,
          case_data: exhibitsText,
          rubric_json: mergeRubric(LIBRARY_RUBRIC, {
            mode: 'library',
            source: 'library',
            library_case_id: libraryId,
          }),
          status: 'pending',
          session_id: sessionId,
        });
        rowId = inserted.insertedRows[0].id;
      }

      const updated = await db.update('case_practice_cases', { id: rowId, session_id: sessionId }, {
        case_title: title,
        case_type: typeLabel,
        difficulty: difficultyLabel || null,
        prompt: promptText,
        case_data: exhibitsText,
        answer_text: answerText,
        score: score,
        score_breakdown_json: JSON.stringify(breakdown),
        recommendations_json: JSON.stringify(recommendations),
        rubric_json: JSON.stringify(mergeRubric(LIBRARY_RUBRIC, metaEnvelope)),
        target_count: validTarget(body.targetCount) || (previous ? validTarget(previous.target_count) : null),
        readiness_bar: 4,
        status: 'completed',
        completed_on: now,
        updated_at: now,
      });
      const savedRow = updated.updatedRows[0];

      respond(200, {
        success: true,
        case: savedRow,
        score: score,
        attempt: previous ? 'retry' : 'first',
        message: 'Graded a Case Library case (' + title + ') and saved it to this candidate\'s Case Pool log, so it now counts on their dashboard and progress tracker. If you are presenting it in chat: lead with the overall grade (x/5), then what they matched and what they missed versus the published model answer, then the per-dimension evidence, and close with the action plan - every item is {action, why}.',
      });
    } catch (error) {
      console.error('Library case grading failed', error);
      respond(500, { error: error && error.message ? error.message : 'Mate could not grade this answer. Please try again.' });
    }
  }
} else if (action === 'reveal' || action === 'giveup') {
  const caseId = parseInt(body.caseId || body.case_id || query.case_id, 10);
  if (!caseId) {
    respond(400, { error: 'Mate could not tell which case to reveal. Please refresh and try again.' });
  } else {
    const practiceCase = await loadCase(caseId);
    if (!practiceCase) {
      respond(404, { error: 'That practice case was not found in your drill log.' });
    } else if (practiceCase.status === 'completed') {
      respond(400, { error: 'This case is already finished \u2014 generate a new one to keep drilling.' });
    } else {
      const parts = splitRubric(practiceCase.rubric_json);
      const meta = parts.meta;
      const systemPrompt = 'You are Mate, Casemate\u2019s warm but rigorous case-interview coach. A candidate gave up on a practice case and asked to see a model answer. Write the answer you would want them to study \u2014 clear, specific, and grounded ONLY in the supplied case facts. Return plain text (no markdown syntax beyond simple UPPERCASE section labels).';
      const userPrompt = [
        'CASE TITLE: ' + practiceCase.case_title,
        'CASE TYPE: ' + practiceCase.case_type,
        'PROMPT: ' + practiceCase.prompt,
        'CASE DATA: ' + String(practiceCase.case_data || ''),
        'RUBRIC (what excellent looks like): ' + JSON.stringify(parts.rubric),
        'Write the model answer in three labeled sections, in this order: STRUCTURE (the MECE breakdown you would use and why together it covers the question), MATH & NUMBERS (work the key calculations from the case data step by step, showing the arithmetic), RECOMMENDATION (answer-first, backed by those numbers, with one or two risks or next steps).',
        'Write the model answer in ENGLISH (the case itself is in English); keep all numbers and framework names exact.',
        'Keep it under 450 words. Use REAL line breaks between sections and steps.',
      ].join('\n\n');
      try {
        const modelResult = await platform.generateText({
          systemPrompt: systemPrompt,
          userPrompt: userPrompt,
          model: 'gpt-4o-mini',
        });
        const now = new Date().toISOString();
        meta.skipped = true;
        meta.skipped_on = now;
        meta.model_answer = clampText(String(modelResult.text || '').trim(), 8000);
        // Skipped cases are recorded (status completed, NO score) so they show
        // in the dashboard history but never count toward grade metrics.
        const updated = await db.update('case_practice_cases', { id: caseId, session_id: sessionId }, {
          rubric_json: JSON.stringify(mergeRubric(parts.rubric, meta)),
          status: 'completed',
          completed_on: now,
          updated_at: now,
        });
        respond(200, {
          success: true,
          case: updated.updatedRows[0],
          skipped: true,
          message: 'Case marked as skipped (not scored) and the model answer saved to this candidate\u2019s drill log. If you are presenting it in chat: reassure them that skipping is a normal part of learning, show the model answer compactly, remind them this case does not count toward their average, and offer a fresh case when they are ready.',
        });
      } catch (error) {
        console.error('Case reveal failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not reveal this case. Please try again.' });
      }
    }
  }
} else {
  respond(400, { error: 'Unknown case drill action. Use action=generate (optional case_type: market_entry | profitability | market_sizing | growth_strategy | mna | pricing | competitive_response | product_launch | financial_analysis | credit_assessment | due_diligence | operations_optimization | unit_economics | distribution_strategy, or omit for a mixed rotation \u2014 optionally scoped by preferred_types, an array of the case types relevant to the candidate; optional target_program to aim the case at one program; optional difficulty: easy | medium | hard, default medium - easy adds guidance and simple numbers, hard adds ambiguity, two exhibits, and tougher quant), action=grade (case_id + answer), action=reveal (case_id \u2014 give up and get the model answer; the case is recorded as skipped and not scored), or action=walkthrough.' });
}
`;

let ensurePromise: Promise<void> | null = null;

// Hook installation remains available to authenticated workspace-management
// surfaces through ensureCaseDrillServerFunction. Customer sessions execute
// the already-published hook directly; hook management correctly returns 401.

export function ensureCaseDrillServerFunction(): Promise<void> {
  if (ensurePromise) return ensurePromise;

  ensurePromise = (async () => {
    // Fire-and-forget: give Mate's in-chat generate_practice_case tool the
    // new difficulty argument. Never blocks or fails the hook path.
    ensureAgentToolDifficulty().catch(() => {});
    const listResponse = await fetch(`/api/workspaces/${CASE_DRILL_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) throw new Error('The Case Pool backend is not available yet. Please refresh and try again.');
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === CASE_DRILL_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${CASE_DRILL_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: CASE_DRILL_HOOK_NAME,
          description: HOOK_DESCRIPTION,
          code: HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Mate could not activate the Case Pool backend. Please try again.');
      return;
    }

    if (
      existing.description !== HOOK_DESCRIPTION ||
      existing.code !== HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${CASE_DRILL_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: HOOK_DESCRIPTION, code: HOOK_CODE, enabled: true }),
      });
      if (!updateResponse.ok) throw new Error('Mate could not update the Case Pool backend. Please try again.');
    }
  })().catch((error) => {
    ensurePromise = null;
    throw error;
  });

  return ensurePromise;
}

// Mate's in-chat Case Pool tools live in the platform's customer-tools
// registry (see the mcp-agent-tools integration). This adds the optional
// `difficulty` argument to generate_practice_case so Mate can start a case
// at the level the candidate asked for. Read-modify-write: only that one
// tool entry is touched, and only when the argument is missing — every other
// registered tool passes through unchanged. Best-effort by design: if the
// registry is unreadable we leave it alone (the hook itself already accepts
// difficulty either way).
const DIFFICULTY_TOOL_DESCRIPTION =
  'Case difficulty. easy = extra guidance and simple round numbers; medium = balanced (default); hard = ambiguous prompt, two exhibits, tougher multi-step quant. Pass it when the candidate asks for an easier or harder case; omit it otherwise.';

async function ensureAgentToolDifficulty(): Promise<void> {
  const url = `/api/workspace-settings/${CASE_DRILL_WORKSPACE_ID}/customer-tools`;
  const readResponse = await fetch(url);
  if (!readResponse.ok) return;
  const payload = await readResponse.json().catch(() => null);
  const registry = payload && payload.registry;
  if (!registry || !Array.isArray(registry.tools)) return;
  const tool = registry.tools.find((entry: any) => entry && entry.name === 'generate_practice_case');
  if (!tool || (tool.parameters && tool.parameters.difficulty)) return;
  tool.parameters = {
    ...(tool.parameters || {}),
    difficulty: {
      type: 'string',
      required: false,
      enum: ['easy', 'medium', 'hard'],
      description: DIFFICULTY_TOOL_DESCRIPTION,
    },
  };
  if (tool.action) {
    tool.action.bodyMapping = { ...(tool.action.bodyMapping || {}), difficulty: 'difficulty' };
  }
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registry }),
  });
}

// The signed-in email stored by the platform session (EmailGate / register).
// Sent to the hook only as a VERIFICATION HINT: the hook independently proves
// the email belongs to this session via the platform session store and checks
// the subscription server-side — a forged value cannot unlock anything, but a
// correct one saves the hook from enumerating subscribers.
function storedSessionEmail(): string | null {
  try {
    const stored = localStorage.getItem(`space_session_${CASE_DRILL_WORKSPACE_ID}`);
    if (!stored) return null;
    const session = JSON.parse(stored);
    return typeof session.email === 'string' && session.email.includes('@') ? session.email : null;
  } catch {
    return null;
  }
}

export async function callCaseDrillServerFunction(
  action: 'generate' | 'open_library' | 'grade' | 'grade_library' | 'walkthrough' | 'reveal',
  payload: Record<string, unknown>,
  sessionId: string,
) {
  const response = await fetch(
    `/api/workspaces/${CASE_DRILL_WORKSPACE_ID}/hooks/${CASE_DRILL_HOOK_NAME}/execute`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionId,
      },
      body: JSON.stringify({ action, sessionId, customerEmail: storedSessionEmail() || undefined, ...payload }),
    },
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.error) {
    throw new Error(result.error || 'Mate could not complete that request. Please try again.');
  }
  return result;
}
