// Casemate "Domain Knowledge" backend (v3) — the Casemate Pro centerpiece.
//
// v0.8 reshaped the one-shot industry BRIEF into an ARTICLE LIBRARY; v0.9
// DEEPENS the content from "how the industry works" summaries into SPECIALIST
// domain/product knowledge. Per industry, six topic articles (the taxonomy —
// never a generic encyclopedia), in presentation order:
//   category_products — THE HEADLINE: why the category is named/classified
//                       the way it is, product composition & how it is
//                       produced, decoded labels (e.g. "bia không độ"),
//                       and consumer insight
//   functions      — what each function does day-to-day + the specialist
//                    knowledge each function carries in THIS industry
//   metrics        — the metrics insiders/interviewers actually use
//   value_chain    — the value chain (Vietnam + global), where margin sits
//   case_studies   — brand & startup case studies
//   how_it_works   — SUPPLEMENTARY backgrounder (demoted from headline)
//
// Generation is steered by the founder's depth bar (few-shot exemplars in
// the prompt) plus per-industry `productAngles` from the catalog; generic
// filler is banned and unsourceable claims are omitted, never invented.
//
// Content model: AI-generated + WEB-GROUNDED per topic — the hook runs live
// topic-scoped web searches (platform web-search integration), feeds them
// into generation, and stores the REAL sources next to the article
// (WorkspaceDB `industry_articles`, shared rows) so every article renders a
// genuine Sources section. Sources are never fabricated: the displayed list
// is exactly the web results used for grounding. If generation fails, the
// article falls back to the v0.7 cached brief (`industry_briefs`, all 11
// industries ready) so no industry is ever a broken page — and if even that
// is missing, a graceful "content coming soon" payload is returned.
//
// Founder-verified overrides (`industry_brief_overrides`, one row per
// industry+section, active=true) keep working: section_id === topic_id, so
// an override marks the matching ARTICLE as founder-verified on read.
//
// Access: `article` and `brief` are gated server-side by the shared Casemate
// access boundary (lib/proAccess.ts — subscription OR launch week OR
// founding-member month). `list` and `articles` are free — the MENUS are
// visible; the content is paid. UNCHANGED from v0.5/v0.7.
//
// Agent deep-open: when Mate fetches an article via its MCP tool (the call
// carries ?via=agent), the hook drops a session-scoped pointer row in
// `industry_article_pointers`; the app reads the newest fresh pointer on
// open and jumps straight to that article. That is how Mate can POINT a
// candidate to the right article, not just describe it.
//
// Same self-registration pattern as the Case Pool / Case Drill engines: the
// app ensures the hook and Mate's MCP tools on mount; both are idempotent.

import {
  CASEMATE_ENTITLEMENT_SNIPPET,
  ACCESS_RULES_VERSION,
  storedSessionEmail,
} from '../../lib/proAccess';
import { INDUSTRY_CATALOG, INDUSTRY_TOPICS } from './industryCatalog';

export const INDUSTRY_HOOK_NAME = 'casemate-industry-brief-v1';
export const INDUSTRY_HOOK_VERSION = 'industry-knowledge-v3';
export const INDUSTRY_WORKSPACE_ID = 'workspace-539150';
// Brief cache version: UNCHANGED so the 11 cached v0.7 briefs stay valid —
// they are the day-one fallback layer for every article.
export const BRIEF_CONTENT_VERSION = 'brief-v1';
// Article cache version: bump when the prompt, visual specs, or taxonomy
// change so stale cached articles are regenerated. article-v2 = the v0.9
// specialist-depth prompts (category_products topic, depth bar, no filler).
export const ARTICLE_CONTENT_VERSION = 'article-v2';

const HOOK_DESCRIPTION = `Casemate Domain Knowledge engine: a topic-organized, illustrated, source-cited SPECIALIST article library for the 11 industries behind the 20 verified MT/consulting programs. Six articles per industry, led by a category/product/consumer deep-dive (why the category is named the way it is, product composition & production, decoded labels, consumer insight), plus functions day-to-day with their specialist knowledge, insider interview metrics, the value chain, brand & startup case studies, and a supplementary how-it-works backgrounder. Each article is web-grounded with REAL displayed sources (unsourceable claims omitted, never invented), cached in industry_articles with the v0.7 brief as fallback; founder-verified overrides merged on read; article/brief access gated server-side to Casemate Pro / launch-week / founding members; agent article fetches drop a session pointer so the app deep-opens the article (${INDUSTRY_HOOK_VERSION}, ${ARTICLE_CONTENT_VERSION}, ${BRIEF_CONTENT_VERSION}, ${ACCESS_RULES_VERSION})`;

// Compact catalog embedded in the hook (only the fields the server needs).
const HOOK_CATALOG = INDUSTRY_CATALOG.map((entry) => ({
  id: entry.id,
  label: entry.label,
  shortLabel: entry.shortLabel,
  tagline: entry.tagline,
  programs: entry.programs,
  alsoKnownFor: entry.alsoKnownFor,
  matchCompanies: entry.matchCompanies,
  matchHints: entry.matchHints,
  searchQueries: entry.searchQueries,
  productAngles: entry.productAngles,
}));

const HOOK_TOPICS = INDUSTRY_TOPICS.map((topic) => ({
  id: topic.id,
  label: topic.label,
  shortLabel: topic.shortLabel,
  blurb: topic.blurb,
  titleTemplate: topic.titleTemplate,
  queryTemplates: topic.queryTemplates,
}));

const HOOK_CODE =
  String.raw`
const body = request.body || {};
const query = request.query || {};
const action = String(body.action || query.action || '');
const via = String(body.via || query.via || '');
const sessionId = String(request.headers['x-session-id'] || request.headers['X-Session-Id'] || body.sessionId || body.session_id || '');
` +
  CASEMATE_ENTITLEMENT_SNIPPET +
  String.raw`
const BRIEF_VERSION = '` +
  BRIEF_CONTENT_VERSION +
  String.raw`';
const ARTICLE_VERSION = '` +
  ARTICLE_CONTENT_VERSION +
  String.raw`';
const INDUSTRIES = ` +
  JSON.stringify(HOOK_CATALOG) +
  String.raw`;
const TOPICS = ` +
  JSON.stringify(HOOK_TOPICS) +
  String.raw`;

// Which of the industry's catalog search queries anchors each topic.
const TOPIC_CATALOG_QUERY_INDEX = { category_products: 1, how_it_works: 0, functions: 1, metrics: 2, value_chain: 0, case_studies: 1 };

const TOPIC_HINTS = {
  category_products: ['product', 'products', 'category', 'composition', 'ingredient', 'ingredients', 'made of', 'how it is made', "how it's made", 'production process', 'consumer insight', 'consumer behaviour', 'consumer behavior', 'why people buy', 'deep-dive', 'deep dive', 'positioning'],
  how_it_works: ['how it works', 'how the industry works', 'overview', 'market structure', 'landscape', 'how does', 'backgrounder', 'background'],
  functions: ['function', 'functions', 'day-to-day', 'day to day', 'roles', 'rotation', 'job', 'daily'],
  metrics: ['metric', 'metrics', 'kpi', 'kpis', 'numbers', 'ratio', 'benchmark'],
  value_chain: ['value chain', 'chain', 'supply chain', 'distribution', 'upstream', 'downstream'],
  case_studies: ['case study', 'case studies', 'brand', 'startup', 'story', 'stories', 'example', 'examples', 'company'],
};

function asObject(value) {
  if (!value) return {};
  if (typeof value === 'object') return value;
  try { return JSON.parse(value); } catch (error) { return {}; }
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
  const text = String(value === null || value === undefined ? '' : value).trim();
  return text.length > max ? text.slice(0, max) : text;
}

function clampList(value, maxItems, mapper) {
  return (Array.isArray(value) ? value : []).slice(0, maxItems).map(mapper).filter(function (item) { return item !== null; });
}

function findIndustry(raw) {
  const text = String(raw || '').toLowerCase().trim();
  if (!text) return null;
  for (let i = 0; i < INDUSTRIES.length; i += 1) {
    if (INDUSTRIES[i].id === text) return INDUSTRIES[i];
  }
  for (let i = 0; i < INDUSTRIES.length; i += 1) {
    const entry = INDUSTRIES[i];
    if (entry.label.toLowerCase() === text || entry.shortLabel.toLowerCase() === text) return entry;
  }
  // Fuzzy: company names, hints, partial labels — so Mate can pass
  // "FMCG in Vietnam", "Nestlé", or "banking" and land on the right content.
  for (let i = 0; i < INDUSTRIES.length; i += 1) {
    const entry = INDUSTRIES[i];
    const hitHint = entry.matchHints.some(function (hint) { return text.includes(hint); });
    const hitCompany = entry.matchCompanies.some(function (hint) { return text.includes(hint); });
    const hitLabel = text.includes(entry.shortLabel.toLowerCase()) || entry.label.toLowerCase().includes(text);
    const hitProgram = entry.programs.some(function (program) { return text.includes(program.company.toLowerCase()) || program.company.toLowerCase().includes(text); });
    if (hitHint || hitCompany || hitLabel || hitProgram) return entry;
  }
  return null;
}

function findTopic(raw) {
  const text = String(raw || '').toLowerCase().trim();
  if (!text) return null;
  for (let i = 0; i < TOPICS.length; i += 1) {
    if (TOPICS[i].id === text) return TOPICS[i];
  }
  for (let i = 0; i < TOPICS.length; i += 1) {
    const topic = TOPICS[i];
    if (topic.label.toLowerCase() === text || topic.shortLabel.toLowerCase() === text) return topic;
  }
  for (let i = 0; i < TOPICS.length; i += 1) {
    const topic = TOPICS[i];
    const hints = TOPIC_HINTS[topic.id] || [];
    if (hints.some(function (hint) { return text.includes(hint); })) return topic;
  }
  return null;
}

function defaultTitleFor(topic, entry) {
  return topic.titleTemplate.replace('{industry}', entry.shortLabel);
}

function matchedIndustryIdsFor(direction) {
  const ordered = [];
  function push(id) { if (id && ordered.indexOf(id) < 0) ordered.push(id); }
  const programs = Array.isArray(direction.programs) ? direction.programs : [];
  programs.forEach(function (program) {
    const company = String((program && program.company) || '').toLowerCase();
    const industryLabel = String((program && program.industry) || '').toLowerCase();
    INDUSTRIES.forEach(function (entry) {
      const hit = entry.matchCompanies.some(function (hint) { return company.includes(hint); }) ||
        entry.matchHints.some(function (hint) { return industryLabel.includes(hint); });
      if (hit) push(entry.id);
    });
  });
  const fits = Array.isArray(direction.industry_fit) ? direction.industry_fit : [];
  fits.forEach(function (fit) {
    const name = String((fit && fit.name) || '').toLowerCase();
    INDUSTRIES.forEach(function (entry) {
      if (entry.matchHints.some(function (hint) { return name.includes(hint); })) push(entry.id);
    });
  });
  return ordered;
}

function matchedProgramsFor(entry, direction) {
  return (Array.isArray(direction.programs) ? direction.programs : [])
    .filter(function (program) {
      const company = String((program && program.company) || '').toLowerCase();
      const industryLabel = String((program && program.industry) || '').toLowerCase();
      return entry.matchCompanies.some(function (hint) { return company.includes(hint); }) ||
        entry.matchHints.some(function (hint) { return industryLabel.includes(hint); });
    })
    .map(function (program) { return { rank: program.rank, company: program.company, program: program.program, match_percent: program.match_percent }; });
}

async function latestAssessment() {
  if (!sessionId) return null;
  const result = await db.query('assessment_results', {
    where: { session_id: sessionId },
    orderBy: [{ column: 'created_at', direction: 'desc' }],
    limit: 1,
  });
  return result.rows && result.rows[0] ? result.rows[0] : null;
}

async function loadCachedBrief(industryId) {
  const found = await db.query('industry_briefs', {
    where: [
      { column: 'industry_id', operator: '=', value: industryId },
      { column: 'version', operator: '=', value: BRIEF_VERSION },
      { column: 'status', operator: '=', value: 'ready' },
    ],
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 1,
  });
  return found.rows && found.rows[0] ? found.rows[0] : null;
}

async function loadCachedArticle(industryId, topicId) {
  const found = await db.query('industry_articles', {
    where: [
      { column: 'industry_id', operator: '=', value: industryId },
      { column: 'topic_id', operator: '=', value: topicId },
      { column: 'version', operator: '=', value: ARTICLE_VERSION },
      { column: 'status', operator: '=', value: 'ready' },
    ],
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 1,
  });
  return found.rows && found.rows[0] ? found.rows[0] : null;
}

async function loadOverrides(industryId) {
  try {
    const found = await db.query('industry_brief_overrides', {
      where: [
        { column: 'industry_id', operator: '=', value: industryId },
        { column: 'active', operator: 'IS NOT NULL', value: null },
      ],
      orderBy: [{ column: 'id', direction: 'desc' }],
      limit: 20,
    });
    return (found.rows || []).filter(function (row) { return row.active === true; }).map(function (row) {
      return {
        section_id: String(row.section_id || ''),
        content_md: row.content_md ? String(row.content_md) : null,
        content_json: row.content_json ? asObject(row.content_json) : null,
      };
    }).filter(function (row) { return !!row.section_id && (row.content_md || row.content_json); });
  } catch (error) {
    console.error('override read failed', error);
    return [];
  }
}

async function loadAllActiveOverrides() {
  try {
    const found = await db.query('industry_brief_overrides', {
      orderBy: [{ column: 'id', direction: 'desc' }],
      limit: 100,
    });
    return (found.rows || []).filter(function (row) { return row.active === true && row.industry_id && row.section_id; });
  } catch (error) {
    return [];
  }
}

async function webGround(queries) {
  const sources = [];
  const seen = {};
  const capped = (Array.isArray(queries) ? queries : []).slice(0, 3);
  for (let i = 0; i < capped.length; i += 1) {
    try {
      const result = await proFetchJson(PRO_API_BASE + '/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: capped[i], searchType: 'web', num: 6 }),
      });
      const items = result.ok && Array.isArray(result.body.results) ? result.body.results : [];
      items.forEach(function (item) {
        if (!item || !item.title || sources.length >= 15) return;
        const link = clampText(item.link || '', 300);
        if (link && seen[link]) return;
        if (link) seen[link] = true;
        sources.push({
          title: clampText(item.title, 160),
          link: link,
          snippet: clampText(item.snippet || '', 320),
        });
      });
    } catch (error) {
      console.error('web grounding search failed', error);
    }
  }
  return sources;
}

function articleQueriesFor(entry, topic) {
  const queries = [];
  const anchorIndex = TOPIC_CATALOG_QUERY_INDEX[topic.id] || 0;
  if (entry.searchQueries[anchorIndex]) queries.push(entry.searchQueries[anchorIndex]);
  (topic.queryTemplates || []).forEach(function (template) {
    queries.push(template.split('{industry}').join(entry.shortLabel));
  });
  return queries.slice(0, 3);
}

/* ------------------------------------------------------------------------
 * Brief generation (v0.7 pipeline — kept intact as the fallback layer and
 * for Mate's existing get_industry_brief tool)
 * ---------------------------------------------------------------------- */

function sanitizeBrief(raw, entry) {
  const generated = asObject(raw);
  const how = asObject(generated.how_it_works);
  const chain = asObject(generated.value_chain);
  const brief = {
    headline: clampText(generated.headline, 200) || (entry.label + ' in Vietnam — how it really works'),
    vn_snapshot: clampText(generated.vn_snapshot, 1200),
    how_it_works: {
      vietnam: clampText(how.vietnam, 2400),
      global: clampText(how.global, 2000),
    },
    functions: clampList(generated.functions, 7, function (item) {
      const fn = asObject(item);
      const name = clampText(fn.name, 120);
      if (!name) return null;
      return { name: name, day_to_day: clampText(fn.day_to_day, 900), tip: clampText(fn.tip, 400) };
    }),
    metrics: clampList(generated.metrics, 8, function (item) {
      const metric = asObject(item);
      const name = clampText(metric.name, 120);
      if (!name) return null;
      return { name: name, what_it_is: clampText(metric.what_it_is, 500), how_its_used: clampText(metric.how_its_used, 500) };
    }),
    value_chain: {
      stages: clampList(chain.stages, 8, function (item) {
        const stage = asObject(item);
        const name = clampText(stage.stage, 120);
        if (!name) return null;
        return { stage: name, what_happens: clampText(stage.what_happens, 500), vn_note: clampText(stage.vn_note, 500) };
      }),
      global_note: clampText(chain.global_note, 800),
    },
    case_studies: clampList(generated.case_studies, 6, function (item) {
      const study = asObject(item);
      const company = clampText(study.company, 120);
      if (!company) return null;
      let kind = String(study.kind || '').toLowerCase();
      if (kind !== 'startup') kind = 'major';
      return { company: company, kind: kind, story: clampText(study.story, 900), takeaway: clampText(study.takeaway, 400) };
    }),
    interview_angle: clampText(generated.interview_angle, 1200),
  };
  const complete = brief.how_it_works.vietnam && brief.functions.length >= 3 && brief.metrics.length >= 3 && brief.value_chain.stages.length >= 3 && brief.case_studies.length >= 2;
  if (!complete) throw new Error('Mate could not build a complete brief this time. Please try again.');
  return brief;
}

async function generateBrief(entry) {
  const sources = await webGround(entry.searchQueries);
  const sourceLines = sources.map(function (source, index) {
    return (index + 1) + '. ' + source.title + ' — ' + source.snippet;
  }).join('\n');
  const programLines = entry.programs.map(function (program) {
    return '- ' + program.company + ' — ' + program.program;
  }).join('\n');

  const systemPrompt = 'You are Mate, Casemate\'s industry-knowledge analyst for Vietnamese university candidates preparing for management trainee (MT) and consulting selection. Write like a sharp senior friend who has worked in the industry in Vietnam: concrete, specific, numbers where sensible, zero fluff. Everything must be useful IN AN INTERVIEW. Never invent precise statistics you are not sure of — use ranges or say "roughly". Return valid JSON only, with no markdown.';
  const userPrompt = [
    'INDUSTRY: ' + entry.label + ' (Vietnam focus).',
    'WHY THE READER CARES: they matched to these Vietnamese early-career programs in this industry and must understand it well enough to interview:',
    programLines,
    'Other recognizable players to draw on: ' + entry.alsoKnownFor.join(', ') + '.',
    sourceLines ? 'FRESH WEB CONTEXT (use to ground claims; do not cite by number):\n' + sourceLines : 'No web context available — rely on well-established industry knowledge and keep numbers approximate.',
    'WRITE THESE FIVE SECTIONS:',
    '1. how_it_works — vietnam: how this industry actually works in Vietnam (market structure, channels, who has power, what is changing, 2-3 short paragraphs). global: how the industry works globally and what is different about Vietnam (1-2 short paragraphs).',
    '2. functions — 4-6 functions a trainee actually rotates through in THIS industry (use the real function names from the programs above where possible). For each: name, day_to_day (what the job concretely looks like day to day — meetings, tools, deliverables, who they work with), tip (one sentence on how to talk about this function in an interview).',
    '3. metrics — 5-8 metrics interviewers in this industry actually probe (e.g. for FMCG: market share, distribution coverage/numeric vs weighted, GRP, sell-in vs sell-out). For each: name, what_it_is (plain-language definition, formula if simple), how_its_used (the question or trade-off an interviewer builds around it).',
    '4. value_chain — stages: 4-7 stages from input to end customer; for each: stage, what_happens, vn_note (the Vietnam-specific reality of that stage — who the players are, what is hard). global_note: one short paragraph on how the global value chain differs.',
    '5. case_studies — 4-5 REAL stories: at least 2 major brands operating in Vietnam and at least 1 Vietnamese/regional startup or challenger in this industry. For each: company, kind (major | startup), story (what they did and what happened, specific), takeaway (the interview-ready lesson in one sentence).',
    'ALSO: headline — one sharp line for the brief. vn_snapshot — a 3-5 sentence executive snapshot of the industry in Vietnam right now. interview_angle — a short paragraph: how a candidate should USE this brief in the interviews for the programs listed above (what to name-drop, which metric to reach for, which story fits which question).',
    'Return this exact JSON shape:',
    '{"headline":"string","vn_snapshot":"string","how_it_works":{"vietnam":"string","global":"string"},"functions":[{"name":"string","day_to_day":"string","tip":"string"}],"metrics":[{"name":"string","what_it_is":"string","how_its_used":"string"}],"value_chain":{"stages":[{"stage":"string","what_happens":"string","vn_note":"string"}],"global_note":"string"},"case_studies":[{"company":"string","kind":"major","story":"string","takeaway":"string"}],"interview_angle":"string"}',
  ].filter(function (line) { return line !== ''; }).join('\n\n');

  // maxTokens matters: the platform default (~1500 tokens) truncates a full
  // five-section brief mid-JSON; 4000 gives comfortable headroom (verified).
  const generatedResult = await platform.generateText({
    systemPrompt: systemPrompt,
    userPrompt: userPrompt,
    model: 'gpt-4o-mini',
    maxTokens: 4000,
  });
  const brief = sanitizeBrief(cleanJson(generatedResult.text), entry);
  return { brief: brief, sources: sources };
}

function briefResponse(entry, brief, sources, overrides, cached, generatedAt, matched, matchedPrograms) {
  const verifiedSections = overrides.map(function (override) { return override.section_id; });
  return {
    success: true,
    industry: { id: entry.id, label: entry.label, short_label: entry.shortLabel, tagline: entry.tagline },
    matched: matched,
    matched_programs: matchedPrograms,
    program_links: entry.programs,
    brief: brief,
    overrides: overrides,
    verified_sections: verifiedSections,
    sources: sources,
    cached: cached,
    generated_at: generatedAt,
    version: BRIEF_VERSION,
    message: 'Industry brief for ' + entry.label + (matched ? ' — one of THIS candidate\'s matched industries' : '') + '. If you are presenting it in chat: do NOT dump the whole JSON. Lead with the vn_snapshot, then give the 2-3 pieces most relevant to what they asked, each compactly with line breaks. Tie it to their matched programs (' + entry.programs.map(function (p) { return p.company; }).join(', ') + ') where natural. Sections listed in verified_sections are founder-verified — prefer their override content. NOTE: Domain Knowledge is now a full ARTICLE LIBRARY — for a specific readable article with illustrations and cited sources, prefer get_industry_article (topics: how_it_works, functions, metrics, value_chain, case_studies); it also makes the app open straight to that article. Deep-link the Domain Knowledge app (app://industry-knowledge) either way, and offer a practice case in their industry as the next step.',
  };
}

/* ------------------------------------------------------------------------
 * Article generation (v0.8)
 * ---------------------------------------------------------------------- */

// v0.9 depth bar: the founder's own examples of the specificity every
// article must hit, encoded as few-shot exemplars for the writer model.
const DEPTH_BAR = [
  'DEPTH BAR — concrete examples of the specificity EVERY section must hit. The examples come from beverages/FMCG; produce the EQUIVALENT insider depth for THIS industry and THIS topic:',
  '- Category naming: "FMCG" is not just a label — it means fast-moving (bought weekly, consumed in days, short shelf cycles) consumer goods: low ticket, thin per-unit margins, huge volumes, so distribution coverage and shelf velocity decide winners. Explain WHY this industry\'s categories are named/classified the way they are, at that level.',
  '- Product & process: a can of beer and a can of Coca-Cola are produced completely differently — beer is BREWED (malted barley, hops, water, yeast; fermentation over days to weeks creates the alcohol and much of the carbonation), while a cola is a syrup-blending and forced-carbonation line measured in minutes; that difference drives capex, lead times, quality control, and plant design. Explain what this industry\'s products/services actually ARE and how they are made or delivered at that level.',
  '- Decoding labels: Vietnamese non-alcoholic beer (0.0% beer) is real brewed beer that is dealcoholized afterwards (e.g. vacuum distillation) or has its fermentation arrested — which is why it tastes like beer, sidesteps drink-driving penalties, and is marketed and taxed differently. Decode THIS industry\'s equivalent jargon and confusing product labels.',
  '- Consumer insight: name WHAT actually drives purchase (occasions, habit loops, price anchors, who decides vs who pays) and WHY brands position the way they do — never vague lines like "consumers increasingly demand quality".',
].join('\n');

const DEPTH_RULES = [
  'HARD RULES ON DEPTH AND HONESTY:',
  '- BANNED: filler sentences ("the industry is large and growing", "plays a vital role", "is highly competitive", "consumers are increasingly..."). Every paragraph must teach something a smart outsider does NOT already know.',
  '- Specific factual claims — ingredients, production steps, regulations, named figures — must be supported by the web context provided or by well-established, uncontroversial industry knowledge. If you cannot support a claim, OMIT it. Never invent facts, numbers, sources, or citations.',
  '- Thin public information is never an excuse for filler: go as deep as the sources allow, keep figures as ranges ("roughly", "~"), and write fewer but denser sections instead of padding.',
].join('\n');

const TOPIC_SPECS = {
  category_products: {
    focus: 'The specialist product knowledge that makes a candidate sound like an insider: WHY this industry\'s categories are named/classified the way they are (and what the name implies about the economics), what the flagship products/services actually ARE and how they are made or delivered step by step (composition, inputs, production process, how adjacent products differ in how they are made), the confusing labels and variants decoded, and the consumer insight — what really drives purchase and why brands position the way they do.',
    sections: 'Write 4-6 dense sections, for example: why the category is called what it is called (name, classification, and the economics the name implies); what the flagship product actually is and how it is made or delivered, step by step; how two adjacent products in this industry differ in composition, production, and economics; the labels/variants outsiders misread, decoded; what actually drives the customer to buy and how that explains how the brands position themselves.',
    visuals: 'Include one {"type":"flow"} visual walking the production/delivery process of ONE flagship product or service from raw input to end product (4-7 steps; label = the step, note = what happens there and why it matters commercially), and one {"type":"table"} visual comparing 2-4 real products/variants in the category (columns like ["Product","What it actually is / how it is made","What that means commercially"], every cell concrete).',
  },
  functions: {
    focus: 'What each function/rotation in this industry concretely does day-to-day, tied to the real programs listed — meetings, tools, deliverables, who they work with — plus the SPECIALIST knowledge each function is expected to carry in THIS industry (e.g. what a Trade Marketing person must know about numeric vs weighted distribution, what a Supply Planner must know about production lead times), and how to talk about each in an interview.',
    sections: 'Write one short section per function (4-6 functions, using the real function names from the programs where possible): the concrete day-to-day, the industry-specific knowledge that function is expected to master (name the actual concepts, systems, and numbers they live in), what makes someone good at it, and one sentence on how a candidate should talk about it.',
    visuals: 'Include one {"type":"table"} visual with columns ["Function","A typical day","Specialist knowledge they carry"] and one row per function (4-6 rows, each cell one tight, concrete sentence), and one {"type":"flow"} visual showing a typical trainee rotation path through those functions in a sensible order (label = function, note = what you prove at that stop).',
  },
  metrics: {
    focus: 'The metrics insiders actually run this industry on and interviewers actually probe — what each one is, the formula in plain language when simple, realistic Vietnam magnitudes as RANGES when (and only when) the sources support them, and the interview question or trade-off built around each.',
    sections: 'Cover 6-8 metrics grouped into 3-4 sections by theme (e.g. market metrics, channel metrics, money metrics). For each metric: what it is, the plain-language formula if simple, a realistic magnitude or range for Vietnam when the sources support it, and the exact trade-off or question an interviewer builds around it.',
    visuals: 'Include one {"type":"table"} visual with columns ["Metric","What it is","The interview question"] covering the 6-8 metrics, and one {"type":"bar"} visual that makes ONE metric tangible with a worked example (2-6 bars; the caption MUST begin with "Illustrative example:").',
  },
  value_chain: {
    focus: 'The industry value chain from input to end customer, with the Vietnam reality of every stage — who the players are, what PHYSICALLY happens at each stage (the production/logistics detail an insider would give), where margin and power actually sit — and how the global chain differs.',
    sections: 'Write 3-5 sections: the chain at a glance; the upstream stages in Vietnam (what physically happens, who does it, what is hard); the downstream stages in Vietnam; where margin and power actually sit and why (rough splits as ranges when the sources support them); how the global chain differs.',
    visuals: 'Include one {"type":"flow"} visual with 4-7 steps covering the full chain in order (label = stage name, note = the Vietnam reality of that stage in one concrete sentence), and one {"type":"split"} visual comparing the Vietnam chain (left) vs the global chain (right) with 3-4 points per side.',
  },
  case_studies: {
    focus: 'REAL case studies: at least 2 major brands operating in Vietnam and at least 1 Vietnamese or regional startup/challenger — what they did, the mechanics of WHY it worked or failed (channel moves, product reformulations, pricing, positioning), what happened, and the interview-ready lesson. Only real companies and real events; numbers as ranges when unsure.',
    sections: 'Write one section per story (4-5 stories): heading = the company plus the move in a few words; body = the situation, what they concretely did (the insider mechanics, not just "they innovated"), what happened (specific, numbers as ranges when unsure); end the body with the one-sentence takeaway a candidate can reuse.',
    visuals: 'Include one {"type":"table"} visual with columns ["Company","The move","What happened","Takeaway"] and one row per story (each cell one tight phrase), and one {"type":"stats"} visual with 3-4 figures that anchor the stories (use "~" ranges when not precise; caption must state the basis).',
  },
  how_it_works: {
    focus: 'SUPPLEMENTARY BACKGROUND READING — the deep product, function, and metric articles are the headline; this one orients. How this industry is structured in Vietnam: market shape, channels, who holds power, how money is actually made, what is changing right now — then how the global playbook differs. Even as background it must be insider-grade: real channels, real players, real margin mechanics, zero generic overview language.',
    sections: 'Write 4-6 sections, for example: the shape of the market in Vietnam; who holds the power (channels and players, named); how money is actually made, in plain language; what is changing right now; how the global industry differs and why that difference matters in an interview.',
    visuals: 'Include one {"type":"stats"} visual with 3-5 headline figures about the Vietnam market (values are short strings like "~USD 5B" or "25-30%"; use ranges or "~" whenever a source is not precise; the caption must state the basis, e.g. "Approximate figures from the cited sources"), and one {"type":"split"} visual comparing Vietnam (left) vs Global (right) with 3-4 punchy points per side.',
  },
};

function sanitizeVisual(item) {
  const visual = asObject(item);
  const type = String(visual.type || '').toLowerCase();
  const title = clampText(visual.title, 140);
  const caption = clampText(visual.caption, 400);
  if (type === 'bar') {
    const items = clampList(visual.items, 8, function (rawItem) {
      const it = asObject(rawItem);
      const label = clampText(it.label, 90);
      const value = Number(it.value);
      if (!label || !Number.isFinite(value) || value < 0) return null;
      return { label: label, value: value, note: clampText(it.note, 160) };
    });
    if (items.length < 2) return null;
    return { type: 'bar', title: title, caption: caption, unit: clampText(visual.unit, 40), items: items };
  }
  if (type === 'flow') {
    const steps = clampList(visual.steps, 8, function (rawStep) {
      const step = asObject(rawStep);
      const label = clampText(step.label, 90);
      if (!label) return null;
      return { label: label, note: clampText(step.note, 240) };
    });
    if (steps.length < 3) return null;
    return { type: 'flow', title: title, caption: caption, steps: steps };
  }
  if (type === 'stats') {
    const items = clampList(visual.items, 6, function (rawItem) {
      const it = asObject(rawItem);
      const label = clampText(it.label, 90);
      const value = clampText(it.value, 40);
      if (!label || !value) return null;
      return { label: label, value: value, note: clampText(it.note, 160) };
    });
    if (items.length < 2) return null;
    return { type: 'stats', title: title, caption: caption, items: items };
  }
  if (type === 'split') {
    const left = asObject(visual.left);
    const right = asObject(visual.right);
    const mapPoints = function (points) {
      return clampList(points, 5, function (point) {
        const text = clampText(point, 240);
        return text ? text : null;
      });
    };
    const leftPoints = mapPoints(left.points);
    const rightPoints = mapPoints(right.points);
    if (leftPoints.length < 2 || rightPoints.length < 2) return null;
    return {
      type: 'split',
      title: title,
      caption: caption,
      left: { title: clampText(left.title, 80) || 'Vietnam', points: leftPoints },
      right: { title: clampText(right.title, 80) || 'Global', points: rightPoints },
    };
  }
  if (type === 'table') {
    const columns = clampList(visual.columns, 5, function (column) {
      const text = clampText(column, 60);
      return text ? text : null;
    });
    if (columns.length < 2) return null;
    const rows = clampList(visual.rows, 8, function (rawRow) {
      const cells = (Array.isArray(rawRow) ? rawRow : []).slice(0, columns.length).map(function (cell) { return clampText(cell, 240); });
      while (cells.length < columns.length) cells.push('');
      return cells.some(function (cell) { return cell !== ''; }) ? cells : null;
    });
    if (rows.length < 2) return null;
    return { type: 'table', title: title, caption: caption, columns: columns, rows: rows };
  }
  return null;
}

function sanitizeArticle(raw, entry, topic) {
  const generated = asObject(raw);
  const sections = clampList(generated.sections, 8, function (rawSection) {
    const section = asObject(rawSection);
    const heading = clampText(section.heading, 140);
    const bodyText = clampText(section.body, 4000);
    const bullets = clampList(section.bullets, 6, function (bullet) {
      const text = clampText(bullet, 280);
      return text ? text : null;
    });
    if (!heading || (!bodyText && bullets.length === 0)) return null;
    return { heading: heading, body: bodyText, bullets: bullets };
  });
  const visuals = clampList(generated.visuals, 5, sanitizeVisual);
  const article = {
    title: clampText(generated.title, 200) || defaultTitleFor(topic, entry),
    dek: clampText(generated.dek, 320),
    sections: sections,
    visuals: visuals,
    key_takeaways: clampList(generated.key_takeaways, 6, function (item) {
      const text = clampText(item, 280);
      return text ? text : null;
    }),
    interview_angle: clampText(generated.interview_angle, 1200),
  };
  let bodyLength = 0;
  article.sections.forEach(function (section) { bodyLength += section.body.length; });
  const complete = article.sections.length >= 3 && article.visuals.length >= 2 && bodyLength >= 1000;
  if (!complete) throw new Error('Mate could not build a complete article this time. Please try again.');
  const words = Math.round(bodyLength / 5.5);
  article.read_minutes = Math.max(3, Math.min(15, Math.round(words / 200) + 1));
  return article;
}

async function generateArticle(entry, topic) {
  const sources = await webGround(articleQueriesFor(entry, topic));
  const sourceLines = sources.map(function (source, index) {
    return (index + 1) + '. ' + source.title + ' — ' + source.snippet;
  }).join('\n');
  const programLines = entry.programs.map(function (program) {
    return '- ' + program.company + ' — ' + program.program;
  }).join('\n');
  const spec = TOPIC_SPECS[topic.id];
  const angleLines = (entry.productAngles || []).map(function (angle) { return '- ' + angle; }).join('\n');

  const systemPrompt = 'You are Mate, Casemate\'s industry-knowledge writer for Vietnamese university candidates preparing for management trainee (MT) and consulting selection. You write COURSE-GRADE SPECIALIST explainers — the knowledge an insider carries, not an encyclopedia summary: why categories are named the way they are, what products are actually made of and how they are produced, what really drives the consumer, what each function truly does, the metrics the business actually runs on. Concrete, specific, warm but zero fluff, everything useful IN AN INTERVIEW. Never invent precise statistics — use ranges or say "roughly". Never invent citations, publication names, or URLs: the platform attaches the real source list separately; if a claim has no support, omit the claim entirely. Return valid JSON only, with no markdown fences.';
  const userPrompt = [
    'ARTICLE TOPIC: "' + topic.label + '" for the industry: ' + entry.label + ' (Vietnam focus).',
    'FOCUS: ' + spec.focus,
    'WHY THE READER CARES: they matched to these Vietnamese early-career programs in this industry and must sound like an insider in the interview — not like someone who read a generic summary:',
    programLines,
    'Other recognizable players to draw on: ' + entry.alsoKnownFor.join(', ') + '.',
    angleLines ? 'SPECIALIST ANGLES the Casemate founder expects this industry\'s library to nail — weave the ones relevant to THIS topic into the article at full depth (skip the ones that belong to other topics):\n' + angleLines : '',
    DEPTH_BAR,
    sourceLines ? 'FRESH WEB CONTEXT (ground specific, recent claims in these; do not cite by number in the text):\n' + sourceLines : 'No web context available — rely on well-established industry knowledge, keep every number approximate ("roughly", ranges), and make no claims about the last 12 months.',
    DEPTH_RULES,
    'SECTIONS: ' + spec.sections + ' Each section body is 2-4 short paragraphs separated by a blank line; add 2-4 "bullets" to a section only when a tight list genuinely helps.',
    'VISUALS (the illustrations rendered inside the article): ' + spec.visuals + ' Use ONLY these visual types: bar, flow, stats, split, table. Every number in a visual must be grounded in the web context above or the caption must clearly mark it as illustrative/approximate.',
    'ALSO: title — sharp and specific, no clickbait. dek — a one-sentence standfirst under the title. key_takeaways — 3-5 one-line takeaways a candidate should remember. interview_angle — a short paragraph on how to USE this article in interviews for the programs above (what to name-drop, what to reach for, which question it answers).',
    'Return this exact JSON shape:',
    '{"title":"string","dek":"string","sections":[{"heading":"string","body":"string","bullets":["string"]}],"visuals":[{"type":"stats","title":"string","caption":"string","items":[{"label":"string","value":"string","note":"string"}]},{"type":"split","title":"string","caption":"string","left":{"title":"string","points":["string"]},"right":{"title":"string","points":["string"]}},{"type":"flow","title":"string","caption":"string","steps":[{"label":"string","note":"string"}]},{"type":"bar","title":"string","caption":"string","unit":"string","items":[{"label":"string","value":123,"note":"string"}]},{"type":"table","title":"string","caption":"string","columns":["string"],"rows":[["string"]]}],"key_takeaways":["string"],"interview_angle":"string"}',
    'Only include the visuals the VISUALS instruction asks for (2-3 total) — the shape above just shows every allowed type.',
  ].filter(function (line) { return line !== ''; }).join('\n\n');

  // Long article bodies: the platform default (~1500 tokens) truncates
  // mid-JSON; 7000 gives comfortable headroom for the deeper v0.9 articles
  // (denser sections + the depth-bar detail + visuals).
  const generatedResult = await platform.generateText({
    systemPrompt: systemPrompt,
    userPrompt: userPrompt,
    model: 'gpt-4o-mini',
    maxTokens: 7000,
  });
  const article = sanitizeArticle(cleanJson(generatedResult.text), entry, topic);
  return { article: article, sources: sources };
}

// Day-one safety net: shape the matching section of the cached v0.7 brief
// into a readable article (with a real visual where the data allows) so an
// article NEVER renders broken just because fresh generation failed.
// NOTE: category_products (new in v0.9) has no brief section — it returns
// null here on purpose, which surfaces the graceful "coming soon" state.
function fallbackArticleFromBrief(entry, topic, brief) {
  const sections = [];
  const visuals = [];

  if (topic.id === 'how_it_works') {
    if (brief.vn_snapshot) sections.push({ heading: 'Vietnam snapshot', body: brief.vn_snapshot, bullets: [] });
    if (brief.how_it_works && brief.how_it_works.vietnam) sections.push({ heading: 'How it works in Vietnam', body: brief.how_it_works.vietnam, bullets: [] });
    if (brief.how_it_works && brief.how_it_works.global) sections.push({ heading: 'How the global picture differs', body: brief.how_it_works.global, bullets: [] });
  } else if (topic.id === 'functions') {
    (brief.functions || []).forEach(function (fn) {
      if (!fn || !fn.name) return;
      sections.push({ heading: fn.name, body: fn.day_to_day || '', bullets: fn.tip ? ['Interview tip: ' + fn.tip] : [] });
    });
    const rows = (brief.functions || []).filter(function (fn) { return fn && fn.name; }).slice(0, 8).map(function (fn) {
      return [clampText(fn.name, 90), clampText(fn.day_to_day, 240), clampText(fn.tip, 240)];
    });
    if (rows.length >= 2) visuals.push({ type: 'table', title: 'Functions at a glance', caption: 'From Mate\'s grounded industry brief.', columns: ['Function', 'A typical day', 'Interview tip'], rows: rows });
  } else if (topic.id === 'metrics') {
    (brief.metrics || []).forEach(function (metric) {
      if (!metric || !metric.name) return;
      const parts = [];
      if (metric.what_it_is) parts.push(metric.what_it_is);
      if (metric.how_its_used) parts.push('In the interview: ' + metric.how_its_used);
      sections.push({ heading: metric.name, body: parts.join('\n\n'), bullets: [] });
    });
    const rows = (brief.metrics || []).filter(function (metric) { return metric && metric.name; }).slice(0, 8).map(function (metric) {
      return [clampText(metric.name, 90), clampText(metric.what_it_is, 240), clampText(metric.how_its_used, 240)];
    });
    if (rows.length >= 2) visuals.push({ type: 'table', title: 'Metrics at a glance', caption: 'From Mate\'s grounded industry brief.', columns: ['Metric', 'What it is', 'The interview question'], rows: rows });
  } else if (topic.id === 'value_chain') {
    const stages = (brief.value_chain && Array.isArray(brief.value_chain.stages)) ? brief.value_chain.stages : [];
    stages.forEach(function (stage) {
      if (!stage || !stage.stage) return;
      const parts = [];
      if (stage.what_happens) parts.push(stage.what_happens);
      if (stage.vn_note) parts.push('Vietnam reality: ' + stage.vn_note);
      sections.push({ heading: stage.stage, body: parts.join('\n\n'), bullets: [] });
    });
    if (brief.value_chain && brief.value_chain.global_note) {
      sections.push({ heading: 'How the global chain differs', body: brief.value_chain.global_note, bullets: [] });
    }
    const steps = stages.filter(function (stage) { return stage && stage.stage; }).slice(0, 8).map(function (stage) {
      return { label: clampText(stage.stage, 90), note: clampText(stage.vn_note || stage.what_happens, 240) };
    });
    if (steps.length >= 3) visuals.push({ type: 'flow', title: 'The value chain, stage by stage', caption: 'From Mate\'s grounded industry brief.', steps: steps });
  } else if (topic.id === 'case_studies') {
    (brief.case_studies || []).forEach(function (study) {
      if (!study || !study.company) return;
      const parts = [];
      if (study.story) parts.push(study.story);
      if (study.takeaway) parts.push('Takeaway: ' + study.takeaway);
      sections.push({ heading: study.company + (study.kind === 'startup' ? ' (startup / challenger)' : ''), body: parts.join('\n\n'), bullets: [] });
    });
    const rows = (brief.case_studies || []).filter(function (study) { return study && study.company; }).slice(0, 8).map(function (study) {
      return [clampText(study.company, 90), clampText(study.story, 240), clampText(study.takeaway, 240)];
    });
    if (rows.length >= 2) visuals.push({ type: 'table', title: 'The stories at a glance', caption: 'From Mate\'s grounded industry brief.', columns: ['Company', 'What happened', 'Takeaway'], rows: rows });
  }

  if (sections.length === 0) return null;
  let bodyLength = 0;
  sections.forEach(function (section) { bodyLength += (section.body || '').length; });
  return {
    title: defaultTitleFor(topic, entry),
    dek: brief.headline || entry.tagline,
    sections: sections,
    visuals: visuals,
    key_takeaways: [],
    interview_angle: brief.interview_angle || '',
    read_minutes: Math.max(3, Math.min(15, Math.round(bodyLength / 5.5 / 200) + 1)),
  };
}

async function writeAgentPointer(entry, topic) {
  if (via !== 'agent' || !sessionId) return;
  try {
    await db.insert('industry_article_pointers', {
      session_id: sessionId,
      industry_id: entry.id,
      topic_id: topic ? topic.id : null,
      source: 'agent_tool',
    });
  } catch (error) {
    console.error('article pointer write failed', error);
  }
}

function articleResponse(entry, topic, article, sources, overrides, flags) {
  const override = overrides.find(function (item) { return item.section_id === topic.id; }) || null;
  return {
    success: true,
    industry: { id: entry.id, label: entry.label, short_label: entry.shortLabel, tagline: entry.tagline },
    topic: { id: topic.id, label: topic.label, short_label: topic.shortLabel },
    matched: flags.matched,
    matched_programs: flags.matchedPrograms,
    program_links: entry.programs,
    article: article,
    override: override,
    verified: !!override,
    sources: sources,
    cached: !!flags.cached,
    fallback: !!flags.fallback,
    generated_at: flags.generatedAt || null,
    version: ARTICLE_VERSION,
    message: 'Article "' + article.title + '" (' + topic.label + ' — ' + entry.label + ')' + (flags.matched ? ', one of THIS candidate\'s matched industries' : '') + '. If you are presenting it in chat: do NOT dump the JSON. Give the dek plus the 2-3 points most relevant to what they asked, mention it cites ' + sources.length + ' real web source(s), then deep-link the Domain Knowledge app (app://industry-knowledge) — the app will open STRAIGHT to this article (with its illustrations and full Sources section) because you fetched it. ' + (override ? 'This article is founder-verified — prefer the override content. ' : '') + (flags.fallback ? 'NOTE: this is the grounded brief version; the fully illustrated article is still being prepared — say the app version keeps improving. ' : '') + 'Offer a practice case in this industry as the next step.',
  };
}

/* ------------------------------------------------------------------------
 * Actions
 * ---------------------------------------------------------------------- */

if (action === 'list') {
  const assessment = await latestAssessment();
  const direction = asObject(assessment && assessment.result_json);
  const matchedIds = assessment ? matchedIndustryIdsFor(direction) : [];
  const articleRows = await db.query('industry_articles', {
    where: [
      { column: 'version', operator: '=', value: ARTICLE_VERSION },
      { column: 'status', operator: '=', value: 'ready' },
    ],
    limit: 100,
  });
  const readyByIndustry = {};
  (articleRows.rows || []).forEach(function (row) {
    const key = String(row.industry_id || '');
    if (!readyByIndustry[key]) readyByIndustry[key] = {};
    readyByIndustry[key][String(row.topic_id || '')] = true;
  });
  const industries = INDUSTRIES.map(function (entry) {
    const readyTopics = Object.keys(readyByIndustry[entry.id] || {});
    return {
      id: entry.id,
      label: entry.label,
      short_label: entry.shortLabel,
      tagline: entry.tagline,
      companies: entry.programs.map(function (program) { return program.company; }),
      programs: entry.programs,
      matched: matchedIds.indexOf(entry.id) >= 0,
      article_topics: TOPICS.length,
      articles_ready: readyTopics.length,
    };
  });
  industries.sort(function (a, b) {
    const ma = matchedIds.indexOf(a.id);
    const mb = matchedIds.indexOf(b.id);
    return (ma < 0 ? 999 : ma) - (mb < 0 ? 999 : mb);
  });
  respond(200, {
    success: true,
    has_assessment: !!assessment,
    matched_industry_ids: matchedIds,
    topics: TOPICS.map(function (topic) { return { id: topic.id, label: topic.label }; }),
    industries: industries,
    message: 'The 11 industries behind Casemate\'s 20 verified programs — each is a SPECIALIST article library of ' + TOPICS.length + ' topic articles (a category/product/consumer deep-dive as the headline, functions day-to-day, insider interview metrics, value chain, case studies, plus a how-the-industry-works backgrounder as supplementary reading)' + (assessment ? ', with THIS candidate\'s matched industries first (matched=true)' : ' — no saved fit assessment for this candidate yet, so no personal ordering') + '. If you are presenting this in chat: name their matched industries first with the program that links them there, then offer a specific article with get_industry_article (or the industry\'s article list with list_industry_articles). Reading an article requires Casemate Pro (or an active free-access window) — the article tool enforces that itself.',
  });
} else if (action === 'articles' || action === 'article') {
  const DOMAIN_VERSION = 'domain-v1';
  const DOMAIN_TOPIC = { id: 'structured_curriculum', label: 'Structured learning path' };
  const DOMAIN_INDUSTRIES = [
    { id: 'fmcg', label: 'FMCG (Fast Moving Consumer Goods)', shortLabel: 'FMCG' },
    { id: 'banking', label: 'Banking & Financial Services', shortLabel: 'Banking' },
    { id: 'tech', label: 'Technology & Digital', shortLabel: 'Technology' },
    { id: 'retail', label: 'Retail', shortLabel: 'Retail' },
    { id: 'industrial-manufacturing', label: 'Industrial & Manufacturing', shortLabel: 'Manufacturing' },
    { id: 'basic-economics', label: 'Basic Economics', shortLabel: 'Economics' },
    { id: 'logistics', label: 'Logistics & Supply Chain', shortLabel: 'Logistics' },
    { id: 'insurance', label: 'Insurance', shortLabel: 'Insurance' },
    { id: 'tobacco', label: 'Tobacco', shortLabel: 'Tobacco' },
  ];
  const DOMAIN_ALIASES = {
    'fmcg': 'fmcg', 'consumer goods': 'fmcg',
    'banking': 'banking', 'bank': 'banking', 'finance': 'banking', 'financial services': 'banking', 'consumer-finance-fintech': 'banking',
    'tech': 'tech', 'technology': 'tech', 'digital': 'tech', 'ecommerce-digital': 'tech', 'telecom-tech': 'tech',
    'retail': 'retail',
    'industrial': 'industrial-manufacturing', 'manufacturing': 'industrial-manufacturing', 'industrial-manufacturing': 'industrial-manufacturing',
    'basic economics': 'basic-economics', 'economics': 'basic-economics', 'microeconomics': 'basic-economics', 'macroeconomics': 'basic-economics',
    'logistics': 'logistics', 'supply chain': 'logistics', 'logistics-supply-chain': 'logistics',
    'insurance': 'insurance',
    'tobacco': 'tobacco'
  };
  const requestedRaw = body.industry || body.industry_id || query.industry || query.industry_id || '';
  const requestedId = DOMAIN_ALIASES[String(requestedRaw).toLowerCase().trim()] || String(requestedRaw).toLowerCase().trim();
  const requestedEntry = DOMAIN_INDUSTRIES.find(function (item) { return item.id === requestedId; });
  const rowsResult = await db.query('industry_articles', {
    where: [
      { column: 'version', operator: '=', value: DOMAIN_VERSION },
      { column: 'status', operator: '=', value: 'ready' },
    ],
    orderBy: [{ column: 'updated_at', direction: 'desc' }],
    limit: 100,
  });
  const rows = rowsResult.rows || [];
  if (action === 'articles') {
    if (requestedRaw && !requestedEntry) {
      return respond(404, { error: 'Unknown industry: ' + clampText(requestedRaw, 80), code: 'unknown_industry', valid_industries: DOMAIN_INDUSTRIES });
    }
    const entries = requestedEntry ? [requestedEntry] : DOMAIN_INDUSTRIES;
    return respond(200, {
      success: true,
      app_name: 'Domain Knowledge',
      topics: [DOMAIN_TOPIC],
      industries: entries.map(function (entry) {
        const row = rows.find(function (item) { return item.industry_id === entry.id && item.topic_id === DOMAIN_TOPIC.id; });
        return {
          id: entry.id,
          label: entry.label,
          short_label: entry.shortLabel,
          articles: [{
            topic_id: DOMAIN_TOPIC.id,
            topic_label: DOMAIN_TOPIC.label,
            title: row ? row.title : 'Domain Knowledge: ' + entry.label,
            status: row ? 'ready' : 'new',
            generated_at: row ? (row.generated_at || row.updated_at || null) : null,
          }],
        };
      }),
      message: 'Eight Vietnam-specific industry learning paths plus Basic Economics. The app adds Flashcards, adaptive Learn, Test, Match, Memory Score and scheduled reviews to beginner explanations and formulas; Consulting and the old Overview & Market section are no longer part of the curriculum.',
    });
  }
  if (!requestedEntry) {
    return respond(404, { error: 'Unknown industry: ' + clampText(requestedRaw, 80), code: 'unknown_industry', valid_industries: DOMAIN_INDUSTRIES });
  }
  const access = await ensureCasemateAccessForGenerate('Domain Knowledge', 'industry-knowledge', 'Domain Knowledge');
  if (access) {
    const row = rows.find(function (item) { return item.industry_id === requestedEntry.id && item.topic_id === DOMAIN_TOPIC.id; });
    if (!row) return respond(404, { error: 'Domain Knowledge article not found', code: 'article_pending', industry: requestedEntry });
    await writeAgentPointer(requestedEntry, DOMAIN_TOPIC);
    return respond(200, {
      success: true,
      app_name: 'Domain Knowledge',
      industry: requestedEntry,
      topic: DOMAIN_TOPIC,
      article: asObject(row.content_json),
      sources: Array.isArray(row.sources_json) ? row.sources_json : [],
      cached: true,
      generated_at: row.generated_at || row.updated_at || null,
      message: 'Use this sourced Vietnam-market briefing directly. The Domain Knowledge app has been pointed to the same article for the candidate.',
    });
  }
} else if (action === 'articles-legacy') {
  const requested = body.industry || body.industry_id || query.industry || query.industry_id;
  const entry = requested ? findIndustry(requested) : null;
  if (requested && !entry) {
    respond(404, {
      error: 'Mate could not tell which industry you meant by "' + clampText(requested, 80) + '". Valid industries: ' + INDUSTRIES.map(function (item) { return item.id + ' (' + item.label + ')'; }).join(', ') + '.',
      code: 'unknown_industry',
    });
  } else {
    const assessment = await latestAssessment();
    const direction = asObject(assessment && assessment.result_json);
    const matchedIds = assessment ? matchedIndustryIdsFor(direction) : [];
    const articleRows = await db.query('industry_articles', {
      where: [
        { column: 'version', operator: '=', value: ARTICLE_VERSION },
        { column: 'status', operator: '=', value: 'ready' },
      ],
      limit: 100,
    });
    const cachedByKey = {};
    (articleRows.rows || []).forEach(function (row) {
      cachedByKey[String(row.industry_id || '') + '|' + String(row.topic_id || '')] = row;
    });
    const overrideRows = await loadAllActiveOverrides();
    const overrideByKey = {};
    overrideRows.forEach(function (row) {
      overrideByKey[String(row.industry_id || '') + '|' + String(row.section_id || '')] = true;
    });
    const buildArticles = function (industryEntry) {
      return TOPICS.map(function (topic) {
        const key = industryEntry.id + '|' + topic.id;
        const cachedRow = cachedByKey[key];
        return {
          topic_id: topic.id,
          topic_label: topic.label,
          title: (cachedRow && (cachedRow.title || asObject(cachedRow.content_json).title)) || defaultTitleFor(topic, industryEntry),
          blurb: topic.blurb,
          status: cachedRow ? 'ready' : 'new',
          verified: !!overrideByKey[key],
          generated_at: cachedRow ? (cachedRow.generated_at || cachedRow.created_at || null) : null,
        };
      });
    };
    if (entry) {
      respond(200, {
        success: true,
        industry: { id: entry.id, label: entry.label, short_label: entry.shortLabel, tagline: entry.tagline },
        matched: matchedIds.indexOf(entry.id) >= 0,
        matched_programs: matchedProgramsFor(entry, direction),
        articles: buildArticles(entry),
        message: 'The ' + entry.label + ' article library, grouped by topic. status=ready means the article opens instantly; status=new means the first open researches live sources (~30-60 seconds). verified=true articles carry founder-verified content. If you are presenting this in chat: list the article titles by topic compactly, then offer to open one with get_industry_article — reading requires Casemate Pro or an active free-access window (that tool enforces it).',
      });
    } else {
      const industries = INDUSTRIES.map(function (industryEntry) {
        return {
          id: industryEntry.id,
          label: industryEntry.label,
          short_label: industryEntry.shortLabel,
          matched: matchedIds.indexOf(industryEntry.id) >= 0,
          articles: buildArticles(industryEntry),
        };
      });
      industries.sort(function (a, b) {
        const ma = matchedIds.indexOf(a.id);
        const mb = matchedIds.indexOf(b.id);
        return (ma < 0 ? 999 : ma) - (mb < 0 ? 999 : mb);
      });
      respond(200, {
        success: true,
        has_assessment: !!assessment,
        matched_industry_ids: matchedIds,
        topics: TOPICS.map(function (topic) { return { id: topic.id, label: topic.label, blurb: topic.blurb }; }),
        industries: industries,
        message: 'Casemate\'s full article library: ' + TOPICS.length + ' topic articles per industry across ' + INDUSTRIES.length + ' industries, matched industries first. Present matched industries\' articles first; open a specific one with get_industry_article.',
      });
    }
  }
} else if (action === 'article') {
  const requestedIndustry = body.industry || body.industry_id || query.industry || query.industry_id;
  const requestedTopic = body.topic || body.topic_id || query.topic || query.topic_id;
  const entry = findIndustry(requestedIndustry);
  const topic = findTopic(requestedTopic);
  if (!entry) {
    respond(404, {
      error: 'Mate could not tell which industry you meant' + (requestedIndustry ? ' by "' + clampText(requestedIndustry, 80) + '"' : '') + '. Valid industries: ' + INDUSTRIES.map(function (item) { return item.id + ' (' + item.label + ')'; }).join(', ') + '.',
      code: 'unknown_industry',
    });
  } else if (!topic) {
    respond(404, {
      error: 'Mate could not tell which article topic you meant' + (requestedTopic ? ' by "' + clampText(requestedTopic, 80) + '"' : '') + '. Valid topics: ' + TOPICS.map(function (item) { return item.id + ' (' + item.label + ')'; }).join(', ') + '.',
      code: 'unknown_topic',
    });
  } else {
    const access = await ensureCasemateAccessForGenerate('Domain Knowledge', 'industry-knowledge', 'Domain Knowledge');
    if (access) {
      const assessment = await latestAssessment();
      const direction = asObject(assessment && assessment.result_json);
      const matchedIds = assessment ? matchedIndustryIdsFor(direction) : [];
      const flags = {
        matched: matchedIds.indexOf(entry.id) >= 0,
        matchedPrograms: matchedProgramsFor(entry, direction),
        cached: false,
        fallback: false,
        generatedAt: null,
      };
      try {
        const overrides = await loadOverrides(entry.id);
        const cachedRow = await loadCachedArticle(entry.id, topic.id);
        if (cachedRow && body.refresh !== true) {
          flags.cached = true;
          flags.generatedAt = cachedRow.generated_at || cachedRow.created_at;
          const cachedArticle = asObject(cachedRow.content_json);
          await writeAgentPointer(entry, topic);
          respond(200, articleResponse(entry, topic, cachedArticle, Array.isArray(cachedRow.sources_json) ? cachedRow.sources_json : [], overrides, flags));
        } else {
          let generated = null;
          try {
            generated = await generateArticle(entry, topic);
          } catch (generationError) {
            console.error('Article generation failed — trying brief fallback', generationError);
          }
          if (generated) {
            const now = new Date().toISOString();
            // json columns must be passed as JSON STRINGS (raw arrays/objects
            // fail with "invalid input syntax for type json").
            await db.insert('industry_articles', {
              industry_id: entry.id,
              topic_id: topic.id,
              version: ARTICLE_VERSION,
              status: 'ready',
              title: generated.article.title,
              content_json: JSON.stringify(generated.article),
              sources_json: JSON.stringify(generated.sources),
              model: 'gpt-4o-mini',
              generated_at: now,
              session_id: null,
            });
            flags.generatedAt = now;
            await writeAgentPointer(entry, topic);
            respond(200, articleResponse(entry, topic, generated.article, generated.sources, overrides, flags));
          } else {
            // Graceful day-one fallback: shape the cached v0.7 brief section
            // into an article instead of failing.
            const briefRow = await loadCachedBrief(entry.id);
            const fallback = briefRow ? fallbackArticleFromBrief(entry, topic, asObject(briefRow.content_json)) : null;
            if (fallback) {
              flags.fallback = true;
              flags.generatedAt = briefRow.generated_at || briefRow.created_at;
              await writeAgentPointer(entry, topic);
              respond(200, articleResponse(entry, topic, fallback, Array.isArray(briefRow.sources_json) ? briefRow.sources_json : [], overrides, flags));
            } else {
              respond(200, {
                success: false,
                pending: true,
                industry: { id: entry.id, label: entry.label, short_label: entry.shortLabel },
                topic: { id: topic.id, label: topic.label },
                error: 'This article is still being prepared — content coming soon. Please try again in a moment.',
                code: 'article_pending',
                message: 'The article could not be generated right now and no cached content exists yet. Tell the candidate warmly that this article is coming soon and offer another topic or industry — never invent the content yourself.',
              });
            }
          }
        }
      } catch (error) {
        console.error('Industry article failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not load this article. Please try again.' });
      }
    }
  }
} else if (action === 'brief') {
  const requested = body.industry || body.industry_id || query.industry || query.industry_id;
  const entry = findIndustry(requested);
  if (!entry) {
    respond(404, {
      error: 'Mate could not tell which industry you meant' + (requested ? ' by "' + clampText(requested, 80) + '"' : '') + '. Valid industries: ' + INDUSTRIES.map(function (item) { return item.id + ' (' + item.label + ')'; }).join(', ') + '.',
      code: 'unknown_industry',
    });
  } else {
    const access = await ensureCasemateAccessForGenerate('Domain Knowledge', 'industry-knowledge', 'Domain Knowledge');
    if (access) {
      const assessment = await latestAssessment();
      const direction = asObject(assessment && assessment.result_json);
      const matchedIds = assessment ? matchedIndustryIdsFor(direction) : [];
      const matched = matchedIds.indexOf(entry.id) >= 0;
      const matchedPrograms = matchedProgramsFor(entry, direction);

      try {
        const overrides = await loadOverrides(entry.id);
        const cachedRow = await loadCachedBrief(entry.id);
        if (cachedRow && body.refresh !== true) {
          respond(200, briefResponse(entry, asObject(cachedRow.content_json), Array.isArray(cachedRow.sources_json) ? cachedRow.sources_json : [], overrides, true, cachedRow.generated_at || cachedRow.created_at, matched, matchedPrograms));
        } else {
          const generated = await generateBrief(entry);
          const now = new Date().toISOString();
          // json columns must be passed as JSON STRINGS (raw arrays/objects
          // fail with "invalid input syntax for type json").
          await db.insert('industry_briefs', {
            industry_id: entry.id,
            version: BRIEF_VERSION,
            status: 'ready',
            content_json: JSON.stringify(generated.brief),
            sources_json: JSON.stringify(generated.sources),
            model: 'gpt-4o-mini',
            generated_at: now,
            session_id: null,
          });
          respond(200, briefResponse(entry, generated.brief, generated.sources, overrides, false, now, matched, matchedPrograms));
        }
      } catch (error) {
        console.error('Industry brief failed', error);
        respond(500, { error: error && error.message ? error.message : 'Mate could not build this industry brief. Please try again.' });
      }
    }
  }
} else {
  respond(400, { error: 'Unknown industry-knowledge action. Use action=list (industry menu, matched first), action=articles (article library for one industry — industry: id/label/company — or all industries when omitted), action=article (one full illustrated article — industry + topic, one of: category_products, functions, metrics, value_chain, case_studies, how_it_works; requires Casemate Pro or an active free-access window), or action=brief (legacy five-section brief; same access rules).' });
}
`;

let ensureHookPromise: Promise<void> | null = null;

// Hook installation remains available to authenticated workspace-management
// surfaces. Customer sessions execute the published hook directly because
// hook list/PATCH endpoints intentionally reject them with 401.

export function ensureIndustryBriefServerFunction(): Promise<void> {
  if (ensureHookPromise) return ensureHookPromise;

  ensureHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${INDUSTRY_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) throw new Error('The Domain Knowledge backend is not available yet. Please refresh and try again.');
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === INDUSTRY_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${INDUSTRY_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: INDUSTRY_HOOK_NAME,
          description: HOOK_DESCRIPTION,
          code: HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Mate could not activate the Domain Knowledge backend. Please try again.');
      return;
    }

    if (
      existing.description !== HOOK_DESCRIPTION ||
      existing.code !== HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${INDUSTRY_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: HOOK_DESCRIPTION, code: HOOK_CODE, enabled: true }),
      });
      if (!updateResponse.ok) throw new Error('Mate could not update the Domain Knowledge backend. Please try again.');
    }
  })().catch((error) => {
    ensureHookPromise = null;
    throw error;
  });

  return ensureHookPromise;
}

export async function callIndustryBriefServerFunction(
  action: 'list' | 'brief' | 'articles' | 'article',
  payload: Record<string, unknown>,
  sessionId: string,
) {
  const response = await fetch(
    `/api/workspaces/${INDUSTRY_WORKSPACE_ID}/hooks/${INDUSTRY_HOOK_NAME}/execute`,
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
    const error = new Error(result.error || 'Mate could not complete that request. Please try again.') as Error & { code?: string; pending?: boolean };
    error.code = result.code;
    error.pending = !!result.pending;
    throw error;
  }
  return result;
}

/* ============================================================================
 * MCP customer-tools registration — get_industry_article /
 * list_industry_articles / get_industry_brief / list_industries
 *
 * Read-merge-write on the workspace customer-tools registry (same pattern as
 * the Case Pool / Case Drill engines): every existing tool is preserved, and
 * the PUT is skipped when the industry entries are already current.
 * NOTE: the PUT body is { value: <registry> } — NOT { registry: ... }.
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

function industryToolDefinitions(): RegistryTool[] {
  const endpointFor = (action: string, extra = '') =>
    `/api/hooks/execute/${INDUSTRY_WORKSPACE_ID}/${INDUSTRY_HOOK_NAME}?action=${action}${extra}`;
  return [
    {
      name: 'get_industry_article',
      description:
        `Fetch ONE full article from Casemate's Domain Knowledge article library — topic-organized, illustrated, cited with REAL web sources, and written at SPECIALIST insider depth. Use it whenever the candidate wants to actually understand something about an industry: the headline category/product/consumer deep-dive — why the category is named the way it is, what the products are actually made of and how they're produced, decoded labels, what drives purchase (topic category_products); what a function does day-to-day and the specialist knowledge it carries (functions); the metrics its interviews test (metrics); its value chain (value_chain); brand/startup stories (case_studies); or a how-the-industry-works backgrounder — supplementary reading, not the lead (how_it_works). Pass industry as an id (fmcg, retail, banking, consumer-finance-fintech, ecommerce-digital, telecom-tech, insurance, logistics-supply-chain, proptech, consulting-big4, healthcare-nutrition), a label, or a company name ("Nestlé", "Techcombank") — the tool resolves it; same for topic (id or plain words like "value chain", "metrics"). IMPORTANT: fetching an article also makes the Domain Knowledge app open STRAIGHT to it for this candidate — so present the dek + the 2-3 most relevant points compactly (never dump the JSON), mention the real cited sources, and deep-link the app (app://industry-knowledge) to read it with illustrations. Requires an active Casemate Pro subscription OR an active free-access window — checked server-side; a subscription_required error is the paywall working: relay it warmly per the Free vs Casemate Pro boundary. First open of an article can take ~30-60 seconds (live research); later opens are instant (cached). [${INDUSTRY_HOOK_VERSION}]`,
      parameters: {
        industry: {
          type: 'string',
          required: true,
          description: 'Industry id, label, or a company name to resolve (e.g. "fmcg", "Banking", "Nestlé").',
        },
        topic: {
          type: 'string',
          required: true,
          description: 'Article topic: category_products (the headline product/category/consumer deep-dive) | functions | metrics | value_chain | case_studies | how_it_works (supplementary backgrounder). Plain words like "products", "value chain" or "interview metrics" also resolve.',
        },
      },
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('article', '&via=agent'),
        bodyMapping: { industry: 'industry', topic: 'topic' },
      },
    },
    {
      name: 'list_industry_articles',
      description:
        `List the articles in Casemate's Domain Knowledge library for ONE industry (pass industry as id, label, or company name) or for ALL industries (omit it). Free to call for anyone — it is the menu: article titles grouped by the six topics (the category/product/consumer deep-dive first, then functions day-to-day, interview metrics, value chain, brand & startup case studies, and a how-the-industry-works backgrounder as supplementary reading), with ready/new status and founder-verified flags, matched industries first. Use it when a candidate asks what they can read about an industry, then open a specific article with get_industry_article (that tool enforces the paid boundary itself). [${INDUSTRY_HOOK_VERSION}]`,
      parameters: {
        industry: {
          type: 'string',
          required: false,
          description: 'Optional industry id, label, or company name; omit for the full library overview.',
        },
      },
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('articles'),
        bodyMapping: { industry: 'industry' },
      },
    },
    {
      name: 'get_industry_brief',
      description:
        `Fetch the candidate's program-linked, Vietnam-grounded five-section INDUSTRY BRIEF (how it works VN+global, functions day-to-day, interview metrics, value chain, real case studies) in one call. Prefer get_industry_article when the candidate wants to READ about one specific thing — the article library is richer, illustrated, and opens in the app; use this brief when you need the whole industry picture at once to answer a broad question. Pass the industry as an id (fmcg, retail, banking, consumer-finance-fintech, ecommerce-digital, telecom-tech, insurance, logistics-supply-chain, proptech, consulting-big4, healthcare-nutrition), a label, or a company name (e.g. "Nestlé", "Techcombank") — the tool resolves it. Present it per the returned message (lead with the snapshot, never dump the JSON) and deep-link the Domain Knowledge app (app://industry-knowledge). Requires an active Casemate Pro subscription OR an active free-access window (launch week / founding-member month) — checked server-side; relay a subscription_required error warmly per the Free vs Casemate Pro boundary. [${INDUSTRY_HOOK_VERSION}]`,
      parameters: {
        industry: {
          type: 'string',
          required: true,
          description: 'Industry id, label, or a company name to resolve (e.g. "fmcg", "Banking", "Nestlé").',
        },
      },
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('brief'),
        bodyMapping: { industry: 'industry' },
      },
    },
    {
      name: 'list_industries',
      description:
        `List Casemate's 11 industry-knowledge industries (the ones behind the 20 verified Vietnamese MT/consulting programs), with THIS candidate's matched industries flagged and ordered first when they have a saved fit assessment, plus how many of each industry's ${INDUSTRY_TOPICS.length} topic articles are ready. Free to call for anyone — use it when a candidate asks what industries Casemate covers or which industries THEY should study; for the article titles within one industry use list_industry_articles. Present their matched industries first, each tied to the program that links them there. [${INDUSTRY_HOOK_VERSION}]`,
      parameters: {},
      action: {
        type: 'api_call',
        method: 'POST',
        endpoint: endpointFor('list'),
        bodyMapping: {},
      },
    },
  ];
}

let ensureToolsPromise: Promise<void> | null = null;

export function ensureIndustryBriefAgentTools(): Promise<void> {
  if (ensureToolsPromise) return ensureToolsPromise;

  ensureToolsPromise = (async () => {
    await ensureIndustryBriefServerFunction();

    const registryResponse = await fetch(`/api/workspace-settings/${INDUSTRY_WORKSPACE_ID}/customer-tools`);
    let registry: { version: number; tools: RegistryTool[] } = { version: 1, tools: [] };
    if (registryResponse.ok) {
      const payload = await registryResponse.json().catch(() => null);
      if (payload?.registry && Array.isArray(payload.registry.tools)) {
        registry = payload.registry;
      } else if (payload?.registry) {
        return; // unexpected shape — never risk clobbering it
      }
    } else if (registryResponse.status !== 404) {
      return; // transient read failure — retry on next app load
    }

    const desired = industryToolDefinitions();
    const current = new Map(registry.tools.map((tool) => [tool.name, tool]));
    const upToDate = desired.every((tool) => {
      const existing = current.get(tool.name);
      return !!existing && JSON.stringify(existing) === JSON.stringify(tool);
    });
    if (upToDate) return;

    const others = registry.tools.filter((tool) => !desired.some((d) => d.name === tool.name));
    const putResponse = await fetch(`/api/workspace-settings/${INDUSTRY_WORKSPACE_ID}/customer-tools`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: { version: registry.version || 1, tools: [...others, ...desired] } }),
    });
    if (!putResponse.ok) throw new Error(`Could not register the Domain Knowledge agent tools (${putResponse.status})`);
  })().catch((error) => {
    ensureToolsPromise = null;
    console.warn('[IndustryKnowledge] MCP tool registration deferred:', error);
  });

  return ensureToolsPromise;
}
