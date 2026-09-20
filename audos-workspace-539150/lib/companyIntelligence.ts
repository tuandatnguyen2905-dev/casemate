// Casemate — Company Intelligence social-listening pipeline (v1).
//
// WHAT THIS IS: a server-side pipeline (workspace hook `casemate-company-intel-v1`)
// that, per company in the verified program database:
//   1. SCRAPES public sources via the platform web-search integration
//      (SerpAPI `POST /api/search`) with targeted site: queries — ITviec,
//      Glassdoor, JobStreet VN, public Facebook groups, LinkedIn, and
//      annual-report/press coverage. No authentication, public data only.
//   2. Stores the RAW results first (company_intelligence.raw_data), so the
//      pipeline can re-analyze without re-scraping (action=reanalyze).
//   3. Runs an AI analysis + credibility-filtering layer (platform.generateText)
//      that extracts three signal buckets — culture-fit dimensions,
//      competitive rate, company challenges — with per-signal credibility
//      scoring (source credibility × specificity × recency). Signals below
//      the threshold are NOT discarded: they are stored flagged tentative.
//   4. Writes one new `company_intelligence` row per company per run (history
//      kept — newest row per company_id wins) and logs per-company,
//      per-source outcomes to `intel_scrape_runs`.
//
// SCHEDULING: a daily task-scheduler job (ensureCompanyIntelSchedule) executes
// the hook with a small batch; the hook only refreshes companies whose data
// is older than INTEL_STALE_DAYS (7). Net effect: every company is re-scraped
// on a rolling ~7-day cycle while each single execution stays comfortably
// inside the hook sandbox's 50-fetch / 5-minute limits (6 searches + 1 AI
// call per company, batch of ≤5 companies per execution).
//
// DEPLOYMENT: like every Casemate hook, the code lives HERE as the source of
// truth and is deployed/refreshed idempotently by ensureCompanyIntelHook(),
// called from the founder-only Usage dashboard (hook management endpoints
// require an authenticated founder session; customers can only execute).
//
// CONSUMPTION (fit engine): the Direction card in AgentChatView reads the
// newest row per company (shared read) and — where a record exists — shows
// (a) difficulty-to-get-in from competitive_rate, (b) a culture-compatibility
// read cross-referencing the candidate's MBTI + work-style (OCP) answers
// against the scraped culture dimensions, and (c) the company's current
// challenges. Companies with no record fall back to today's behavior — no
// intel UI renders and the match % is never touched.

export const INTEL_WORKSPACE_ID = 'workspace-539150';
export const INTEL_HOOK_NAME = 'casemate-company-intel-v1';
export const INTEL_PIPELINE_VERSION = 'intel-v1';
/** A company's intel is considered fresh for this many days. */
export const INTEL_STALE_DAYS = 7;
/** Signals scoring below this are stored flagged `tentative` (never shown as facts). */
export const INTEL_CREDIBILITY_THRESHOLD = 0.45;
export const INTEL_SCHEDULE_NAME = 'Casemate company intel re-scrape (rolling 7-day)';

/* ============================================================================
 * Company registry — every company in data/mt-programs.json (verified
 * programs + directory). `short` is the site-search alias; `aliases` are the
 * extra names the Direction card matches program rows against.
 * ==========================================================================*/

export interface IntelCompany {
  id: string;
  name: string;
  short: string;
  industry: string;
  aliases: string[];
}

export const INTEL_COMPANIES: IntelCompany[] = [
  { id: 'unilever-vietnam', name: 'Unilever Vietnam', short: 'Unilever', industry: 'FMCG', aliases: ['unilever'] },
  { id: 'loreal-vietnam', name: "L'Oréal Vietnam", short: "L'Oreal", industry: 'FMCG / Beauty', aliases: ["l'oreal", 'loreal'] },
  { id: 'suntory-pepsico-vietnam', name: 'Suntory PepsiCo Vietnam', short: 'Suntory PepsiCo', industry: 'Beverage / FMCG', aliases: ['suntory pepsico', 'pepsico'] },
  { id: 'carlsberg-vietnam', name: 'Carlsberg Vietnam', short: 'Carlsberg', industry: 'Beverage', aliases: ['carlsberg'] },
  { id: 'central-retail-vietnam', name: 'Central Retail Vietnam', short: 'Central Retail', industry: 'Retail', aliases: ['central retail'] },
  { id: 'abinbev-vietnam', name: 'AB InBev Vietnam', short: 'AB InBev', industry: 'Beverage', aliases: ['ab inbev', 'anheuser busch'] },
  { id: 'home-credit-vietnam', name: 'Home Credit Vietnam', short: 'Home Credit', industry: 'Consumer Finance / Fintech', aliases: ['home credit'] },
  { id: 'shopee-monee', name: 'Shopee & Monee (SeaMoney)', short: 'Shopee', industry: 'E-commerce / Digital Financial Services', aliases: ['shopee', 'seamoney', 'monee', 'sea group'] },
  { id: 'nestle-vietnam', name: 'Nestlé Vietnam', short: 'Nestle', industry: 'FMCG', aliases: ['nestle'] },
  { id: 'momo', name: 'MoMo', short: 'MoMo', industry: 'Fintech', aliases: ['momo', 'm service'] },
  { id: 'techcombank', name: 'Techcombank', short: 'Techcombank', industry: 'Banking', aliases: ['techcombank'] },
  { id: 'viettel', name: 'Viettel', short: 'Viettel', industry: 'Telecom / Tech', aliases: ['viettel'] },
  { id: 'uob-vietnam', name: 'UOB Vietnam', short: 'UOB', industry: 'Banking', aliases: ['uob'] },
  { id: 'prudential-vietnam', name: 'Prudential Vietnam', short: 'Prudential', industry: 'Insurance', aliases: ['prudential'] },
  { id: 'expeditors-vietnam', name: 'Expeditors Vietnam', short: 'Expeditors', industry: 'Logistics / Supply Chain', aliases: ['expeditors'] },
  { id: 'propertyguru-vietnam', name: 'PropertyGuru Vietnam', short: 'PropertyGuru', industry: 'PropTech', aliases: ['propertyguru', 'batdongsan'] },
  { id: 'pg-vietnam', name: 'P&G Vietnam', short: 'P&G', industry: 'FMCG', aliases: ['p g', 'procter gamble', 'procter and gamble'] },
  { id: 'deloitte-vietnam', name: 'Deloitte Vietnam', short: 'Deloitte', industry: 'Professional Services / Big 4', aliases: ['deloitte'] },
  { id: 'ey-vietnam', name: 'EY Vietnam', short: 'EY', industry: 'Professional Services / Big 4', aliases: ['ey', 'ernst young', 'ernst and young'] },
  { id: 'abbott-vietnam', name: 'Abbott Vietnam', short: 'Abbott', industry: 'Healthcare / Nutrition / Pharma', aliases: ['abbott'] },
  { id: 'pwc-vietnam', name: 'PwC Vietnam', short: 'PwC', industry: 'Consulting / Big 4', aliases: ['pwc', 'pricewaterhousecoopers'] },
  { id: 'kpmg-vietnam', name: 'KPMG Vietnam', short: 'KPMG', industry: 'Consulting / Big 4', aliases: ['kpmg'] },
  { id: 'mckinsey-vietnam', name: 'McKinsey & Company (Vietnam)', short: 'McKinsey', industry: 'Management Consulting', aliases: ['mckinsey'] },
  { id: 'bcg-vietnam', name: 'Boston Consulting Group (Vietnam)', short: 'BCG', industry: 'Management Consulting', aliases: ['bcg', 'boston consulting'] },
  { id: 'masan-group', name: 'Masan Group', short: 'Masan', industry: 'FMCG / Retail', aliases: ['masan'] },
  { id: 'vinamilk', name: 'Vinamilk', short: 'Vinamilk', industry: 'FMCG / Dairy', aliases: ['vinamilk'] },
  { id: 'heineken-vietnam', name: 'HEINEKEN Vietnam', short: 'Heineken', industry: 'Beverage / FMCG', aliases: ['heineken'] },
];

/** The six scraped culture dimensions (all scored 0–10). */
export const INTEL_DIMENSION_KEYS = [
  'work_pace_pressure',
  'management_style_flatness',
  'learning_development',
  'team_collaboration',
  'work_life_balance',
  'internal_mobility',
] as const;

export type IntelDimensionKey = (typeof INTEL_DIMENSION_KEYS)[number];

export const INTEL_DIMENSION_LABELS: Record<IntelDimensionKey, string> = {
  work_pace_pressure: 'Work pace / pressure',
  management_style_flatness: 'Flat vs hierarchical management',
  learning_development: 'Learning & development',
  team_collaboration: 'Team collaboration',
  work_life_balance: 'Work–life balance',
  internal_mobility: 'Career growth speed',
};

/* ============================================================================
 * Server-side hook code (sandbox JavaScript, NOT TypeScript). No backticks
 * or unintended ${} inside — the block is interpolated into String.raw.
 * ==========================================================================*/

const INTEL_HOOK_REGISTRY = INTEL_COMPANIES.map((c) => ({
  id: c.id,
  name: c.name,
  short: c.short,
  industry: c.industry,
}));

const INTEL_HOOK_DESCRIPTION = `Casemate company-intelligence social-listening pipeline: scrapes public sources per program-database company (ITviec, Glassdoor, JobStreet VN, public Facebook groups, LinkedIn, annual reports/press) via the platform web-search integration, stores raw results, then runs an AI analysis + credibility-filtering layer extracting culture-fit dimensions, competitive rate, and company challenges into company_intelligence (history kept; per-source run log in intel_scrape_runs). Actions: run (batch, freshness-aware — only companies staler than ${INTEL_STALE_DAYS} days unless companies[]/force given), reanalyze (re-run analysis on stored raw_data without re-scraping). Triggered manually from the founder Usage dashboard and daily by the '${INTEL_SCHEDULE_NAME}' schedule for a rolling 7-day refresh. (${INTEL_PIPELINE_VERSION})`;

const INTEL_HOOK_CODE = String.raw`
const body = request.body || {};
const query = request.query || {};
const action = String(body.action || query.action || 'run');
const API_BASE = 'https://audos.com';
const PIPELINE_VERSION = ${JSON.stringify(INTEL_PIPELINE_VERSION)};
const CRED_THRESHOLD = ${INTEL_CREDIBILITY_THRESHOLD};
const STALE_MS = ${INTEL_STALE_DAYS} * 86400000;
const COMPANIES = ${JSON.stringify(INTEL_HOOK_REGISTRY)};

function clampInt(value, min, max, dflt) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, n));
}

// One targeted public-web query per source family. Facebook and LinkedIn are
// covered through site-restricted web search (direct scraping is blocked for
// unauthenticated callers); ITviec/Glassdoor/JobStreet review pages and
// annual-report/press coverage surface well through search snippets.
function buildQueries(c) {
  return [
    { source: 'itviec', searchType: 'web', query: 'site:itviec.com "' + c.short + '" review OR "đánh giá"' },
    { source: 'glassdoor', searchType: 'web', query: 'site:glassdoor.com "' + c.short + '" Vietnam reviews' },
    { source: 'jobstreet', searchType: 'web', query: '(site:jobstreet.vn OR site:vn.jobstreet.com) "' + c.short + '" review OR "đánh giá"' },
    { source: 'facebook', searchType: 'web', query: 'site:facebook.com "' + c.short + '" ("management trainee" OR culture OR review OR "phỏng vấn" OR "môi trường làm việc")' },
    { source: 'linkedin', searchType: 'web', query: 'site:linkedin.com "' + c.name + '" (culture OR "work environment" OR "management trainee" OR challenges)' },
    { source: 'press', searchType: 'news', dateRange: 'year', query: '"' + c.name + '" (strategy OR "annual report" OR transformation OR growth OR "chiến lược" OR "thách thức")' },
  ];
}

async function searchOnce(spec) {
  const payload = { query: spec.query, searchType: spec.searchType || 'web', num: 20 };
  if (spec.dateRange) payload.dateRange = spec.dateRange;
  const res = await fetch(API_BASE + '/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data = null;
  try { data = await res.json(); } catch (error) { data = null; }
  if (!res.ok || !data || data.success !== true) {
    throw new Error('search failed (' + res.status + '): ' + String(data && data.error ? data.error : 'no results payload'));
  }
  return (Array.isArray(data.results) ? data.results : []).slice(0, 20).map(function (r) {
    return {
      title: String(r.title || '').slice(0, 200),
      link: String(r.link || '').slice(0, 300),
      snippet: String(r.snippet || '').slice(0, 400),
    };
  });
}

// Parse the model's JSON answer even when it wraps it in fences or prose.
function extractJson(text) {
  let t = String(text || '');
  t = t.split(String.fromCharCode(96)).join('');
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Analysis did not return JSON');
  return JSON.parse(t.slice(start, end + 1));
}

const ANALYSIS_SYSTEM_PROMPT =
  'You are a rigorous labor-market intelligence analyst for Vietnamese management-trainee candidates. ' +
  'You receive raw public social-listening search results (titles, links, snippets) about ONE company, grouped by source. ' +
  'Extract STRUCTURED, EVIDENCE-GROUNDED signals. Never invent facts not supported by the provided snippets.\n\n' +
  'CREDIBILITY RUBRIC (apply per signal):\n' +
  '- source_credibility: press/annual report 0.9; itviec/glassdoor/jobstreet employee review 0.6; linkedin post 0.5; anonymous facebook comment 0.35.\n' +
  '- recency_weight: 2 when the content is clearly from the last 12 months, else 1.\n' +
  '- specificity: 0.3 for vague claims ("good culture") up to 1.0 for concrete detail ("sales KPIs reviewed weekly by VP").\n' +
  '- credibility_score = min(1, source_credibility * specificity * (recency_weight === 2 ? 1.25 : 0.85)).\n' +
  '- tentative = credibility_score < ' + String(CRED_THRESHOLD) + '. Tentative signals are kept but must NOT drive dimension scores.\n\n' +
  'Respond with ONLY one JSON object (no prose, no markdown) of this exact shape:\n' +
  '{\n' +
  '  "signals": [up to 24 of {"text": string<=200 chars, "bucket": "culture"|"competitive"|"challenge", "source_type": "itviec"|"glassdoor"|"jobstreet"|"facebook"|"linkedin"|"press", "source_credibility": number, "recency_weight": 1|2, "specificity": number, "credibility_score": number, "tentative": boolean}],\n' +
  '  "culture_dimensions": {"work_pace_pressure": D, "management_style_flatness": D, "learning_development": D, "team_collaboration": D, "work_life_balance": D, "internal_mobility": D} where D = {"score": 0-10 number or null when evidence is insufficient, "evidence": short string, "confidence": "high"|"medium"|"low"} — work_pace_pressure: 0 calm to 10 extreme pressure; management_style_flatness: 0 very hierarchical to 10 very flat/autonomous; the other four: 0 weak to 10 excellent,\n' +
  '  "competitive_rate": {"difficulty_score": 0-10 number or null, "pass_rate_estimate": string like "~5%" or "unknown", "profile_bar": short string describing GPA/experience bar seen in accepted-candidate stories or "unknown", "evidence": [short strings]},\n' +
  '  "company_challenges": [up to 6 of {"challenge": short string, "kind": "strategic"|"employee_pain"|"industry_headwind", "source_type": string, "credibility": number}]\n' +
  '}\n' +
  'Only non-tentative signals may support culture_dimensions scores, competitive_rate, and company_challenges. When a dimension has no credible evidence, set score null and confidence "low" — never guess.';

function analysisPrompt(company, raw) {
  const lines = [];
  raw.forEach(function (block) {
    lines.push('SOURCE: ' + block.source + ' (query: ' + block.query + ')');
    block.results.slice(0, 12).forEach(function (r) {
      lines.push('- [' + r.link + '] ' + r.title + ' :: ' + r.snippet);
    });
    lines.push('');
  });
  return 'Company: ' + company.name + ' (industry: ' + company.industry + ', Vietnam). ' +
    'Analyze the raw public results below and produce the JSON described in your instructions.\n\n' +
    lines.join('\n');
}

async function analyze(company, raw) {
  const result = await platform.generateText({
    systemPrompt: ANALYSIS_SYSTEM_PROMPT,
    userPrompt: analysisPrompt(company, raw),
    model: 'gpt-4o-mini',
    maxTokens: 3800,
  });
  return extractJson(result && result.text ? result.text : '');
}

function confidenceOf(parsed) {
  const signals = Array.isArray(parsed.signals) ? parsed.signals : [];
  const credible = signals.filter(function (s) { return s && Number(s.credibility_score) >= CRED_THRESHOLD; });
  const sources = {};
  credible.forEach(function (s) { sources[String(s.source_type || '')] = true; });
  const sourceCount = Object.keys(sources).length;
  if (credible.length >= 8 && sourceCount >= 3) return 'high';
  if (credible.length >= 3 && sourceCount >= 2) return 'medium';
  return 'tentative';
}

async function logRun(runId, trigger, company, status, error, outcomes, signalCount, confidence, startedAt) {
  try {
    await db.insert('intel_scrape_runs', {
      run_id: runId,
      trigger: trigger,
      company_id: company.id,
      company_name: company.name,
      status: status,
      error: error || null,
      sources: JSON.stringify(outcomes || []),
      signal_count: signalCount || 0,
      confidence_level: confidence || null,
      started_at: startedAt,
      finished_at: new Date().toISOString(),
    });
  } catch (logError) {
    console.error('[company-intel] run log write failed for ' + company.id, logError);
  }
}

async function storeIntel(company, parsed, raw, outcomes, scrapedAt) {
  const confidence = confidenceOf(parsed);
  const signals = Array.isArray(parsed.signals) ? parsed.signals.slice(0, 40) : [];
  const sourcesScraped = raw.map(function (block) {
    return {
      source: block.source,
      query: block.query,
      result_count: block.results.length,
      urls: block.results.slice(0, 10).map(function (r) { return r.link; }),
    };
  });
  await db.insert('company_intelligence', {
    company_id: company.id,
    company_name: company.name,
    culture_dimensions: JSON.stringify(parsed.culture_dimensions || {}),
    competitive_rate: JSON.stringify(parsed.competitive_rate || {}),
    company_challenges: JSON.stringify(Array.isArray(parsed.company_challenges) ? parsed.company_challenges.slice(0, 8) : []),
    confidence_level: confidence,
    signals: JSON.stringify(signals),
    sources_scraped: JSON.stringify(sourcesScraped),
    last_scraped_at: scrapedAt,
    raw_data: JSON.stringify(raw),
    pipeline_version: PIPELINE_VERSION,
  });
  return { confidence: confidence, signalCount: signals.length };
}

async function processCompany(company, trigger, runId) {
  const startedAt = new Date().toISOString();
  const outcomes = [];
  const raw = [];
  const specs = buildQueries(company);
  for (let i = 0; i < specs.length; i += 1) {
    const spec = specs[i];
    try {
      const results = await searchOnce(spec);
      raw.push({ source: spec.source, query: spec.query, results: results });
      outcomes.push({ source: spec.source, ok: true, result_count: results.length });
    } catch (error) {
      outcomes.push({ source: spec.source, ok: false, result_count: 0, error: String(error && error.message ? error.message : error) });
    }
  }
  const totalResults = raw.reduce(function (sum, block) { return sum + block.results.length; }, 0);
  if (totalResults === 0) {
    const message = 'No public results from any source';
    await logRun(runId, trigger, company, 'error', message, outcomes, 0, null, startedAt);
    return { company_id: company.id, company_name: company.name, status: 'error', error: message, sources: outcomes };
  }
  let parsed = null;
  try {
    parsed = await analyze(company, raw);
  } catch (error) {
    const message = 'AI analysis failed: ' + String(error && error.message ? error.message : error);
    await logRun(runId, trigger, company, 'error', message, outcomes, 0, null, startedAt);
    return { company_id: company.id, company_name: company.name, status: 'error', error: message, sources: outcomes };
  }
  const scrapedAt = new Date().toISOString();
  const stored = await storeIntel(company, parsed, raw, outcomes, scrapedAt);
  await logRun(runId, trigger, company, 'success', null, outcomes, stored.signalCount, stored.confidence, startedAt);
  return {
    company_id: company.id,
    company_name: company.name,
    status: 'success',
    signal_count: stored.signalCount,
    confidence_level: stored.confidence,
    sources: outcomes,
  };
}

async function newestByCompany() {
  const result = await db.query('company_intelligence', {
    select: ['id', 'company_id', 'last_scraped_at'],
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 500,
  });
  const map = {};
  (result.rows || []).forEach(function (row) {
    const key = String(row.company_id || '');
    if (!key || map[key]) return;
    map[key] = row;
  });
  return map;
}

function resolveRequested(list) {
  const wanted = [];
  (Array.isArray(list) ? list : []).forEach(function (value) {
    const norm = String(value || '').trim().toLowerCase();
    if (!norm) return;
    const found = COMPANIES.find(function (c) { return c.id === norm || c.name.toLowerCase() === norm; });
    if (found && wanted.indexOf(found) < 0) wanted.push(found);
  });
  return wanted;
}

if (action === 'run') {
  try {
    const runId = 'run-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
    const trigger = String(body.trigger || 'manual');
    const batchSize = clampInt(body.batch_size, 1, 5, 3);
    const requested = resolveRequested(body.companies);
    const newest = await newestByCompany();
    const now = Date.now();
    const isStale = function (c) {
      const row = newest[c.id];
      if (!row || !row.last_scraped_at) return true;
      const t = Date.parse(row.last_scraped_at);
      return !Number.isFinite(t) || now - t >= STALE_MS;
    };
    let targets;
    if (requested.length > 0) {
      // Explicit list (manual re-scrape) ignores freshness — capped at 5 per
      // execution; the dashboard loops batches client-side.
      targets = requested.slice(0, 5);
    } else {
      const stale = COMPANIES.filter(isStale);
      stale.sort(function (a, b) {
        const ta = newest[a.id] && newest[a.id].last_scraped_at ? Date.parse(newest[a.id].last_scraped_at) || 0 : 0;
        const tb = newest[b.id] && newest[b.id].last_scraped_at ? Date.parse(newest[b.id].last_scraped_at) || 0 : 0;
        return ta - tb;
      });
      targets = stale.slice(0, batchSize);
    }
    const processed = [];
    for (let i = 0; i < targets.length; i += 1) {
      try {
        processed.push(await processCompany(targets[i], trigger, runId));
      } catch (error) {
        processed.push({
          company_id: targets[i].id,
          company_name: targets[i].name,
          status: 'error',
          error: String(error && error.message ? error.message : error),
        });
      }
    }
    const succeeded = {};
    processed.forEach(function (p) { if (p.status === 'success') succeeded[p.company_id] = true; });
    const staleRemaining = COMPANIES.filter(function (c) { return !succeeded[c.id] && isStale(c); }).length;
    respond(200, {
      success: true,
      run_id: runId,
      processed: processed,
      total_companies: COMPANIES.length,
      stale_remaining: staleRemaining,
    });
  } catch (error) {
    console.error('[company-intel] run failed', error);
    respond(500, { success: false, error: 'Intel run failed: ' + String(error && error.message ? error.message : error) });
  }
} else if (action === 'reanalyze') {
  // Re-run the AI analysis + credibility layer on the stored raw_data — no
  // scraping, no search quota. companies[] is required (max 5 per call).
  try {
    const runId = 'reanalyze-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
    const requested = resolveRequested(body.companies);
    if (requested.length === 0) {
      respond(400, { success: false, error: 'reanalyze requires companies: [company_id, ...] (max 5).' });
    } else {
      const processed = [];
      const targets = requested.slice(0, 5);
      for (let i = 0; i < targets.length; i += 1) {
        const company = targets[i];
        const startedAt = new Date().toISOString();
        try {
          const existing = await db.query('company_intelligence', {
            where: { company_id: company.id },
            orderBy: [{ column: 'id', direction: 'desc' }],
            limit: 1,
          });
          const row = existing.rows && existing.rows[0] ? existing.rows[0] : null;
          let raw = null;
          if (row && row.raw_data) {
            raw = typeof row.raw_data === 'string' ? JSON.parse(row.raw_data) : row.raw_data;
          }
          if (!Array.isArray(raw) || raw.length === 0) {
            const message = 'No stored raw_data for this company yet — run a scrape first.';
            await logRun(runId, 'reanalyze', company, 'error', message, [], 0, null, startedAt);
            processed.push({ company_id: company.id, company_name: company.name, status: 'error', error: message });
            continue;
          }
          const parsed = await analyze(company, raw);
          const outcomes = raw.map(function (block) { return { source: block.source, ok: true, result_count: (block.results || []).length }; });
          const stored = await storeIntel(company, parsed, raw, outcomes, row.last_scraped_at || new Date().toISOString());
          await logRun(runId, 'reanalyze', company, 'success', null, outcomes, stored.signalCount, stored.confidence, startedAt);
          processed.push({ company_id: company.id, company_name: company.name, status: 'success', signal_count: stored.signalCount, confidence_level: stored.confidence });
        } catch (error) {
          const message = String(error && error.message ? error.message : error);
          await logRun(runId, 'reanalyze', company, 'error', message, [], 0, null, startedAt);
          processed.push({ company_id: company.id, company_name: company.name, status: 'error', error: message });
        }
      }
      respond(200, { success: true, run_id: runId, processed: processed });
    }
  } catch (error) {
    console.error('[company-intel] reanalyze failed', error);
    respond(500, { success: false, error: 'Reanalyze failed: ' + String(error && error.message ? error.message : error) });
  }
} else {
  respond(400, { error: 'Unknown action. Use action=run (optional companies[], batch_size, trigger) or action=reanalyze (companies[] required).' });
}
`;

/* ============================================================================
 * Founder-session deploy helpers (hook management endpoints require an
 * authenticated founder session — customers can only EXECUTE hooks).
 * ==========================================================================*/

let ensureIntelHookPromise: Promise<void> | null = null;

/** Idempotent: create or refresh the casemate-company-intel-v1 hook. */
export function ensureCompanyIntelHook(): Promise<void> {
  if (ensureIntelHookPromise) return ensureIntelHookPromise;

  ensureIntelHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) {
      throw new Error('Hook management is unavailable in this session (open this dashboard from App Studio / a founder session).');
    }
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === INTEL_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: INTEL_HOOK_NAME,
          description: INTEL_HOOK_DESCRIPTION,
          code: INTEL_HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Could not deploy the company-intelligence pipeline hook.');
      return;
    }

    if (
      existing.description !== INTEL_HOOK_DESCRIPTION ||
      existing.code !== INTEL_HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: INTEL_HOOK_DESCRIPTION,
          code: INTEL_HOOK_CODE,
          enabled: true,
        }),
      });
      if (!updateResponse.ok) throw new Error('Could not update the company-intelligence pipeline hook.');
    }
  })().catch((error) => {
    ensureIntelHookPromise = null;
    throw error;
  });

  return ensureIntelHookPromise;
}

let ensureIntelSchedulePromise: Promise<'created' | 'exists'> | null = null;

/**
 * Idempotent: register the daily task-scheduler job that keeps the intel on a
 * rolling 7-day refresh (each daily execution only touches companies whose
 * data is older than INTEL_STALE_DAYS, ≤5 per run).
 */
export function ensureCompanyIntelSchedule(): Promise<'created' | 'exists'> {
  if (ensureIntelSchedulePromise) return ensureIntelSchedulePromise;

  ensureIntelSchedulePromise = (async (): Promise<'created' | 'exists'> => {
    const listResponse = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/schedules`);
    if (!listResponse.ok) {
      throw new Error('Scheduler is unavailable in this session (open this dashboard from App Studio / a founder session).');
    }
    const payload = await listResponse.json().catch(() => null);
    const schedules = Array.isArray(payload) ? payload : (payload && payload.schedules) || [];
    const existing = schedules.find((s: any) => s && s.name === INTEL_SCHEDULE_NAME);
    if (existing) {
      if (existing.status === 'cancelled' || existing.status === 'failed') {
        await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/schedules/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'pending' }),
        }).catch(() => undefined);
      }
      return 'exists';
    }
    const createResponse = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: INTEL_SCHEDULE_NAME,
        description:
          'Runs the casemate-company-intel-v1 hook daily; each run refreshes up to 5 companies whose intelligence is older than 7 days, so every program-database company is re-scraped on a rolling 7-day cycle.',
        frequency: 'daily',
        time: '20:30',
        timezone: 'UTC',
        actionType: 'hook',
        actionPayload: {
          hookName: INTEL_HOOK_NAME,
          payload: { action: 'run', batch_size: 5, trigger: 'scheduled' },
        },
      }),
    });
    if (!createResponse.ok) throw new Error('Could not register the weekly re-scrape schedule.');
    return 'created';
  })().catch((error) => {
    ensureIntelSchedulePromise = null;
    throw error;
  });

  return ensureIntelSchedulePromise;
}

export interface IntelRunCompanyResult {
  company_id: string;
  company_name: string;
  status: 'success' | 'error';
  signal_count?: number;
  confidence_level?: string;
  error?: string;
  sources?: Array<{ source: string; ok: boolean; result_count: number; error?: string }>;
}

export interface IntelRunResult {
  success: boolean;
  run_id?: string;
  processed?: IntelRunCompanyResult[];
  total_companies?: number;
  stale_remaining?: number;
  error?: string;
}

/** Execute the pipeline hook (works for founder sessions; hook must be deployed). */
export async function executeIntelHook(payload: Record<string, unknown>): Promise<IntelRunResult | null> {
  try {
    const response = await fetch(`/api/workspaces/${INTEL_WORKSPACE_ID}/hooks/${INTEL_HOOK_NAME}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => null);
    return (data as IntelRunResult) || null;
  } catch (error) {
    console.warn('[company-intel] hook execute failed:', error);
    return null;
  }
}

/* ============================================================================
 * Client read helpers — Direction card + founder dashboard.
 * ==========================================================================*/

export interface IntelDimensionScore {
  score: number | null;
  evidence?: string;
  confidence?: string;
}

export interface IntelChallenge {
  challenge: string;
  kind?: string;
  source_type?: string;
  credibility?: number;
}

export interface CompanyIntelRecord {
  id: number;
  company_id: string;
  company_name: string;
  culture_dimensions: Partial<Record<IntelDimensionKey, IntelDimensionScore>>;
  competitive_rate: {
    difficulty_score: number | null;
    pass_rate_estimate: string;
    profile_bar: string;
    evidence: string[];
  };
  company_challenges: IntelChallenge[];
  confidence_level: 'high' | 'medium' | 'tentative';
  sources_scraped: Array<{ source: string; result_count?: number; urls?: string[] }>;
  signals: any[];
  last_scraped_at: string | null;
  pipeline_version?: string;
}

function parseJsonValue(value: any): any {
  if (value == null) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(String(value));
  } catch {
    return null;
  }
}

function numOrNull(value: any): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Rows (ordered id DESC) → newest parsed record per company_id. */
export function parseIntelRows(rows: any[] | null | undefined): CompanyIntelRecord[] {
  const list = Array.isArray(rows) ? rows : [];
  const byCompany: Record<string, CompanyIntelRecord> = {};
  list.forEach((row) => {
    const companyId = String((row && row.company_id) || '');
    if (!companyId || byCompany[companyId]) return; // rows arrive id desc — first wins
    const dims = parseJsonValue(row.culture_dimensions) || {};
    const dimensions: Partial<Record<IntelDimensionKey, IntelDimensionScore>> = {};
    INTEL_DIMENSION_KEYS.forEach((key) => {
      const entry = dims && typeof dims === 'object' ? (dims as any)[key] : null;
      if (!entry || typeof entry !== 'object') return;
      dimensions[key] = {
        score: numOrNull(entry.score),
        evidence: typeof entry.evidence === 'string' ? entry.evidence : undefined,
        confidence: typeof entry.confidence === 'string' ? entry.confidence : undefined,
      };
    });
    const rate = parseJsonValue(row.competitive_rate) || {};
    const challengesRaw = parseJsonValue(row.company_challenges);
    const sourcesRaw = parseJsonValue(row.sources_scraped);
    const signalsRaw = parseJsonValue(row.signals);
    const confidence = String(row.confidence_level || 'tentative');
    byCompany[companyId] = {
      id: Number(row.id) || 0,
      company_id: companyId,
      company_name: String(row.company_name || companyId),
      culture_dimensions: dimensions,
      competitive_rate: {
        difficulty_score: numOrNull((rate as any).difficulty_score),
        pass_rate_estimate: typeof (rate as any).pass_rate_estimate === 'string' ? (rate as any).pass_rate_estimate : 'unknown',
        profile_bar: typeof (rate as any).profile_bar === 'string' ? (rate as any).profile_bar : 'unknown',
        evidence: Array.isArray((rate as any).evidence) ? (rate as any).evidence.map((e: any) => String(e)).slice(0, 6) : [],
      },
      company_challenges: (Array.isArray(challengesRaw) ? challengesRaw : [])
        .filter((c: any) => c && typeof c.challenge === 'string' && c.challenge.trim())
        .slice(0, 8),
      confidence_level: confidence === 'high' || confidence === 'medium' ? (confidence as 'high' | 'medium') : 'tentative',
      sources_scraped: Array.isArray(sourcesRaw) ? sourcesRaw : [],
      signals: Array.isArray(signalsRaw) ? signalsRaw : [],
      last_scraped_at: row.last_scraped_at ? String(row.last_scraped_at) : null,
      pipeline_version: row.pipeline_version ? String(row.pipeline_version) : undefined,
    };
  });
  return Object.keys(byCompany).map((key) => byCompany[key]);
}

function normalizeKey(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function containsWholeWords(haystack: string, needle: string): boolean {
  if (!haystack || !needle) return false;
  return (' ' + haystack + ' ').includes(' ' + needle + ' ');
}

/** Match a free-form program-database company name to the intel registry. */
export function findIntelCompany(companyName: string): IntelCompany | null {
  const key = normalizeKey(companyName);
  if (!key) return null;
  return (
    INTEL_COMPANIES.find((c) => {
      const candidates = [c.name, c.short, ...c.aliases];
      return candidates.some((alias) => {
        const aliasKey = normalizeKey(alias);
        return !!aliasKey && (containsWholeWords(key, aliasKey) || containsWholeWords(aliasKey, key));
      });
    }) || null
  );
}

/** The newest intel record for a program row's company — null = no data yet (graceful fallback). */
export function findCompanyIntel(
  companyName: string,
  records: CompanyIntelRecord[] | null | undefined,
): CompanyIntelRecord | null {
  if (!records || records.length === 0) return null;
  const company = findIntelCompany(companyName);
  if (!company) return null;
  return records.find((r) => r.company_id === company.id) || null;
}

/** Whole days since this record was scraped (null when unknown). */
export function intelAgeDays(record: CompanyIntelRecord | null | undefined): number | null {
  if (!record || !record.last_scraped_at) return null;
  const t = Date.parse(record.last_scraped_at);
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / 86400000));
}

export function intelConfidenceLabel(level: string): string {
  if (level === 'high') return 'High confidence';
  if (level === 'medium') return 'Medium confidence';
  return 'Tentative — low-confidence signals';
}

export function intelDifficultyLabel(score: number | null): string {
  if (score == null) return 'Unknown';
  if (score >= 9) return 'Extremely competitive';
  if (score >= 7) return 'Very competitive';
  if (score >= 4) return 'Competitive';
  return 'Moderate';
}

/* ============================================================================
 * Culture compatibility — MBTI + work-style (OCP) × scraped culture dims.
 * Display-only guidance: it NEVER changes the program match %.
 * ==========================================================================*/

export interface CultureCompatibility {
  percent: number;
  basis: 'mbti' | 'workstyle' | 'mbti+workstyle';
  notes: string[];
}

interface DimPreference {
  key: IntelDimensionKey;
  preference: number; // the candidate's comfort point on the 0–10 dim scale
  weight: number;
}

function mbtiPreferences(mbtiType: string): DimPreference[] {
  const type = String(mbtiType || '').toUpperCase();
  const has = (letter: string) => type.includes(letter);
  // Documented heuristic (comfort points, 0–10): introverts prefer calmer
  // pace; intuitive-thinking types prefer flat/autonomous environments
  // (e.g. INTJ → flatness comfort 7.5, so a very hierarchical company reads
  // as a gap); feelers weigh collaboration higher; L&D + mobility are
  // universally desirable for MT candidates.
  const pace = 5.5 + (has('E') ? 1 : -1) + (has('P') ? 0.5 : -0.5);
  const flatness = 5 + (has('N') ? 1.5 : 0) + (has('T') ? 1 : 0) - (has('S') && has('J') ? 1 : 0);
  const collaboration = 5.5 + (has('F') ? 1.5 : 0) + (has('E') ? 1 : 0);
  const wlb = 6.5 + (has('I') ? 0.5 : 0);
  return [
    { key: 'work_pace_pressure', preference: Math.max(0, Math.min(10, pace)), weight: 1.2 },
    { key: 'management_style_flatness', preference: Math.max(0, Math.min(10, flatness)), weight: 1.2 },
    { key: 'learning_development', preference: 8, weight: 1 },
    { key: 'team_collaboration', preference: Math.max(0, Math.min(10, collaboration)), weight: 1 },
    { key: 'work_life_balance', preference: Math.max(0, Math.min(10, wlb)), weight: 1 },
    { key: 'internal_mobility', preference: 7.5, weight: 0.8 },
  ];
}

/**
 * Refine MBTI comfort points with the candidate's OCP work-style answers
 * (1–5 preference vector from the corporate-fit questionnaire) where the
 * axes map cleanly onto the scraped dimensions.
 */
function applyWorkStyle(prefs: DimPreference[], workStyle: Record<string, number>): DimPreference[] {
  const value = (key: string): number | null => {
    const n = Number((workStyle as any)[key]);
    return Number.isFinite(n) && n >= 1 && n <= 5 ? n : null;
  };
  return prefs.map((p) => {
    let preference = p.preference;
    if (p.key === 'team_collaboration') {
      const teamwork = value('teamwork');
      if (teamwork != null) preference = teamwork * 2;
    } else if (p.key === 'learning_development') {
      const dev = value('reward_development');
      if (dev != null) preference = Math.max(6, dev * 2);
    } else if (p.key === 'work_life_balance') {
      // The corporate-fit questionnaire now measures this axis directly
      // ('Cân bằng & linh hoạt', added per the 2026-08 model review) — use
      // the real answer when present; older 8-axis payloads keep the
      // supportive-axis proxy so saved results are unaffected.
      const wlbPref = value('work_life_balance');
      if (wlbPref != null) {
        preference = wlbPref * 2;
      } else {
        const supportive = value('supportive');
        if (supportive != null) preference = (preference + supportive * 2) / 2;
      }
    } else if (p.key === 'work_pace_pressure') {
      const competitive = value('competitive');
      const results = value('results');
      if (competitive != null && results != null) {
        preference = (preference + ((competitive + results) / 2) * 2) / 2;
      }
    }
    return { key: p.key, preference: Math.max(0, Math.min(10, preference)), weight: p.weight };
  });
}

/**
 * Cross-reference the candidate's MBTI type and/or OCP work-style vector with
 * a company's scraped culture dimensions. Returns null when there is nothing
 * to compare (no candidate signal, or fewer than 3 scored dimensions) — the
 * card simply shows nothing, matching the graceful-fallback rule.
 */
export function computeCultureCompatibility(
  record: CompanyIntelRecord | null | undefined,
  mbtiType?: string | null,
  workStyle?: Record<string, number> | null,
): CultureCompatibility | null {
  if (!record) return null;
  const hasMbti = typeof mbtiType === 'string' && mbtiType.trim().length === 4;
  const hasWorkStyle = !!workStyle && Object.keys(workStyle).length > 0;
  if (!hasMbti && !hasWorkStyle) return null;

  let prefs = mbtiPreferences(hasMbti ? (mbtiType as string) : 'XXXX');
  if (hasWorkStyle) prefs = applyWorkStyle(prefs, workStyle as Record<string, number>);

  const comparisons: Array<{ pref: DimPreference; score: number; diff: number }> = [];
  prefs.forEach((pref) => {
    const dim = record.culture_dimensions[pref.key];
    if (!dim || dim.score == null) return;
    comparisons.push({ pref, score: dim.score, diff: dim.score - pref.preference });
  });
  if (comparisons.length < 3) return null;

  const weightSum = comparisons.reduce((sum, c) => sum + c.pref.weight, 0);
  const weightedAbsDiff = comparisons.reduce((sum, c) => sum + Math.abs(c.diff) * c.pref.weight, 0) / Math.max(1, weightSum);
  const percent = Math.max(5, Math.min(98, Math.round(100 - weightedAbsDiff * 9.5)));

  const notes: string[] = [];
  const sorted = [...comparisons].sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  sorted.slice(0, 2).forEach((c) => {
    if (Math.abs(c.diff) < 2.5) return;
    const label = INTEL_DIMENSION_LABELS[c.pref.key];
    if (c.pref.key === 'work_pace_pressure') {
      notes.push(
        c.diff > 0
          ? `${label}: community signals read ${Math.round(c.score)}/10 — hotter than your style prefers.`
          : `${label}: reads calmer (${Math.round(c.score)}/10) than the pace you said you enjoy.`,
      );
    } else if (c.pref.key === 'management_style_flatness') {
      notes.push(
        c.diff < 0
          ? `You lean autonomous/flat; reviews describe a more hierarchical culture (${Math.round(c.score)}/10 flat).`
          : `Reviews describe a flatter culture (${Math.round(c.score)}/10) than the structure you prefer.`,
      );
    } else {
      notes.push(
        c.diff < 0
          ? `${label}: community signals read ${Math.round(c.score)}/10 — below what you look for.`
          : `${label}: reads strong (${Math.round(c.score)}/10) versus your baseline.`,
      );
    }
  });
  const best = [...comparisons].sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff))[0];
  if (best && Math.abs(best.diff) <= 1.5 && notes.length < 3) {
    notes.push(`${INTEL_DIMENSION_LABELS[best.pref.key]} (${Math.round(best.score)}/10) aligns well with your style.`);
  }

  return {
    percent,
    basis: hasMbti && hasWorkStyle ? 'mbti+workstyle' : hasMbti ? 'mbti' : 'workstyle',
    notes: notes.slice(0, 3),
  };
}
