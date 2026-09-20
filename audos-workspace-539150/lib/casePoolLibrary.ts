/**
 * casePoolLibrary.ts — 100 prebuilt full consulting cases for Case Pool.
 *
 * The full text of all 100 cases is exported to data/case-pool-library.json;
 * the content lives in code because the space compiler cannot import JSON at
 * runtime (see the notes in lib/caseLibraryShared.ts and lib/programTimelines.ts).
 *
 * Iron rule (same as the case-math library): every number in "key_findings"
 * and "recommendation" is COMPUTED from the case's own data tables, so a case
 * can never contradict its model answer.
 *
 * Distribution per the brief:
 * Industry — FMCG 20 · Banking/Finance 15 · Retail 15 · Tech/E-commerce 15 ·
 * Healthcare 10 · Logistics 10 · Real estate 8 · Consulting/Big4 7.
 * Type — profitability 25 · growth/market-entry 25 · operations 20 ·
 * strategy 15 · M&A 10 · other 5.
 * Difficulty — easy 20 · medium 50 · hard 30.
 *
 * No AI call anywhere on this path: drawing a case is synchronous and instant.
 */

import {
  CaseDifficulty,
  CaseExhibit,
  chart,
  metric,
  money,
  n,
  pct,
  round1,
  round2,
  spread,
  table,
} from './caseLibraryShared';

export type { CaseDifficulty, CaseExhibit } from './caseLibraryShared';

export interface CaseModelAnswer {
  situation_analysis: string;
  framework_applied: string;
  key_findings: string[];
  recommendation: string;
}

export interface FullCase {
  id: string;
  title: string;
  industry: string;
  type: string;
  difficulty: CaseDifficulty;
  situation: string;
  key_question: string;
  data_exhibits: CaseExhibit[];
  framework_hints: string[];
  model_answer: CaseModelAnswer;
  tags: string[];
}

export const POOL_INDUSTRY_LABELS: Record<string, string> = {
  fmcg: 'FMCG',
  banking: 'Banking & Finance',
  retail: 'Retail',
  tech: 'Tech & E-commerce',
  healthcare: 'Healthcare & Pharma',
  logistics: 'Logistics',
  'real-estate': 'Real Estate',
  consulting: 'Consulting & Big4',
};

export const POOL_TYPE_LABELS: Record<string, string> = {
  profitability: 'Profitability',
  growth: 'Growth & Market Entry',
  operations: 'Operations',
  strategy: 'Strategy',
  mna: 'M&A',
  other: 'Other',
};

/* --------------------------------------------------------------------------
 * Vietnamese / Southeast Asian business context
 * ------------------------------------------------------------------------ */

/** [company name, flagship product/service, territory or segment] */
type Company = [string, string, string];

interface IndustryPack {
  label: string;
  companies: Company[];
  segments: string[];
  channels: string[];
}

const INDUSTRIES: Record<string, IndustryPack> = {
  fmcg: {
    label: 'FMCG',
    companies: [
      ['Masan Consumer', 'Nam Ngư fish sauce', 'condiments'],
      ['Vinamilk', '180ml fresh-milk cartons', 'drinking milk'],
      ['Nestlé Việt Nam', '180ml MILO cartons', 'nutritional drinks'],
      ['Suntory PepsiCo Việt Nam', 'TEA+ oolong tea', 'soft drinks'],
      ['Acecook Việt Nam', 'Hảo Hảo instant noodles', 'instant noodles'],
      ['TH True Milk', '180ml TH fresh milk', 'drinking milk'],
      ['Sabeco', 'Saigon Lager beer', 'beer'],
      ['Nutifood', 'GrowPLUS+ formula milk', 'infant formula'],
      ['Trung Nguyên Legend', 'G7 instant coffee', 'coffee'],
      ['Mondelez Kinh Đô', 'Kinh Đô mooncakes', 'confectionery'],
      ['Vinasoy', 'Fami soy milk', 'plant-based milk'],
      ['Unilever Việt Nam', 'OMO Matic laundry detergent', 'home care'],
    ],
    segments: ['Tier-1 urban', 'Tier-2 urban', 'Northern rural', 'Southern rural', 'Gifting channel', 'Export'],
    channels: ['Modern trade (MT)', 'General trade (GT)', 'E-commerce', 'HORECA'],
  },
  banking: {
    label: 'Banking & Finance',
    companies: [
      ['Techcombank', 'high-balance account packages', 'retail customers'],
      ['VPBank', 'cashback credit cards', 'retail banking'],
      ['MB Bank', 'the MB Bank app', 'digital banking'],
      ['ACB', 'SME business lending', 'SME'],
      ['TPBank', 'LiveBank self-service kiosks', 'digital banking'],
      ['Home Credit Việt Nam', 'consumer installment loans', 'consumer finance'],
      ['VIB', 'co-branded credit cards', 'retail banking'],
      ['SSI', 'retail brokerage accounts', 'securities'],
      ['Bảo Việt Nhân thọ', 'investment-linked insurance policies', 'insurance'],
      ['VNDirect', 'the DStock trading platform', 'securities'],
    ],
    segments: ['Priority customers', 'Mass-market customers', 'SME', 'Large corporates', 'Young customers under 30', 'Micro-merchants'],
    channels: ['Branches', 'Digital app', 'Distribution partners', 'Telesales'],
  },
  retail: {
    label: 'Retail',
    companies: [
      ['Central Retail Việt Nam', 'GO! hypermarkets', 'TP.HCM'],
      ['WinMart+', 'WinMart+ stores', 'Hà Nội'],
      ['Bách Hóa Xanh', 'Bách Hóa Xanh stores', 'Bình Dương'],
      ['Thế Giới Di Động', 'TGDĐ phone stores', 'Đà Nẵng'],
      ['FPT Shop', 'FPT Shop stores', 'Cần Thơ'],
      ['Co.opmart', 'Co.opmart supermarkets', 'TP.HCM'],
      ['PNJ', 'PNJ jewellery stores', 'TP.HCM'],
      ['Highlands Coffee', 'Highlands Coffee shops', 'Hà Nội'],
      ['The Coffee House', 'The Coffee House shops', 'TP.HCM'],
      ['AEON Việt Nam', 'AEON shopping malls', 'Hà Nội'],
    ],
    segments: ['City-centre stores', 'Residential-area stores', 'Provincial stores', 'Mall stores', 'Franchise stores', 'Mini outlets'],
    channels: ['Physical stores', 'Ordering app', 'E-commerce marketplaces', 'B2B wholesale'],
  },
  tech: {
    label: 'Tech & E-commerce',
    companies: [
      ['Tiki', 'the TikiNOW fast-delivery service', 'e-commerce'],
      ['MoMo', 'the MoMo e-wallet', 'fintech'],
      ['VNG', 'Zalo Cloud business plans', 'platforms'],
      ['Grab Việt Nam', 'GrabBike rides', 'ride-hailing'],
      ['Coolmate', 'D2C fashion orders', 'D2C'],
      ['KiotViet', 'retail software plans', 'SaaS'],
      ['Base.vn', 'Base Work+ plans', 'SaaS'],
      ['VNPay', 'QR payment transactions', 'fintech'],
      ['be Group', 'beCar rides', 'ride-hailing'],
      ['Sendo', 'marketplace orders', 'e-commerce'],
    ],
    segments: ['Urban users', 'Provincial users', 'Household businesses', 'SMEs', 'Gen Z users', 'Professional sellers'],
    channels: ['Mobile app', 'Website', 'Direct sales team', 'Agency partners'],
  },
  healthcare: {
    label: 'Healthcare & Pharma',
    companies: [
      ['Nhà thuốc Long Châu', 'Long Châu pharmacies', 'pharmacy retail chain'],
      ['Bệnh viện Vinmec', 'general health-check packages', 'private hospital'],
      ['Dược Hậu Giang', 'Hapacol painkillers', 'pharma manufacturing'],
      ['Pharmacity', 'Pharmacity pharmacies', 'pharmacy retail chain'],
      ['Bệnh viện Tâm Anh', 'all-in maternity packages', 'private hospital'],
      ['Traphaco', 'Boganic liver tonic', 'pharma manufacturing'],
      ['Diag', 'at-home testing packages', 'diagnostics'],
    ],
    segments: ['Inner-city patients', 'Provincial patients', 'Insurance-covered customers', 'Corporate clients', 'Premium customers', 'Mass-market customers'],
    channels: ['Walk-in facilities', 'Online booking', 'Partner-hospital channel', 'Pharmacy wholesale'],
  },
  logistics: {
    label: 'Logistics',
    companies: [
      ['Viettel Post', 'intra-city parcels', 'TP.HCM'],
      ['Giao Hàng Nhanh', 'e-commerce orders', 'Hà Nội'],
      ['J&T Express Việt Nam', 'inter-province orders', 'Đồng Nai'],
      ['Gemadept', 'port containers', 'Hải Phòng'],
      ['Ninja Van Việt Nam', 'COD orders', 'Bình Dương'],
      ['Transimex', 'cold-storage pallets', 'TP.HCM'],
      ['ITL Corp', '5-tonne truck runs', 'Long An'],
    ],
    segments: ['Large e-commerce clients', 'Small sellers', 'B2B manufacturing clients', 'Import-export clients', 'Retail-chain clients', 'Pharma clients'],
    channels: ['Post offices', 'Doorstep pickup', 'Franchise partners', 'Marketplace API integrations'],
  },
  'real-estate': {
    label: 'Real Estate',
    companies: [
      ['Nam Long Group', 'Ehome apartments', 'TP.HCM'],
      ['Khang Điền', 'compound townhouses', 'TP. Thủ Đức'],
      ['Ecopark', 'Ecopark township apartments', 'Hưng Yên'],
      ['Đất Xanh Group', 'mid-range apartments', 'Bình Dương'],
      ['Becamex IDC', 'industrial-park factories', 'Bình Dương'],
      ['Phú Mỹ Hưng', 'premium apartments', 'TP.HCM'],
    ],
    segments: ['Owner-occupiers', 'Individual investors', 'Provincial buyers', 'Foreign buyers', 'Corporate tenants', 'Young first-time buyers'],
    channels: ['F1 distribution floors', 'In-house sales team', 'Freelance brokers', 'Online channel'],
  },
  consulting: {
    label: 'Consulting & Big4',
    companies: [
      ['Deloitte Việt Nam', 'risk advisory services', 'Advisory'],
      ['EY Việt Nam', 'tax advisory services', 'Tax'],
      ['KPMG Việt Nam', 'audit services', 'Audit'],
      ['PwC Việt Nam', 'digital-transformation consulting', 'Consulting'],
      ['FPT Digital', 'enterprise digital-transformation projects', 'Consulting'],
    ],
    segments: ['FDI clients', 'Vietnamese private conglomerates', 'State-owned enterprises', 'Fast-growing SMEs', 'Financial institutions', 'Regional clients'],
    channels: ['Direct consulting teams', 'Regional network', 'Public tenders', 'Client referrals'],
  },
};

/**
 * Industry vocabulary. Some templates mention "raw materials", "factory",
 * "lines", or "outlets" — right for FMCG and retail but meaningless for a bank
 * or a consulting firm. Each template pulls its own industry's words from this
 * table instead of defaulting to manufacturing terms.
 */
interface IndustryTerms {
  /** The industry's biggest input cost. */
  input: string;
  /** The chain of steps that produces the product or service. */
  line: string;
  /** Where that chain happens. */
  site: string;
  /** The chain's final step. */
  lastStep: string;
  /** A customer-facing operating point (plural). */
  outlets: string;
  /** A customer-facing operating point (singular). */
  outlet: string;
  /** A regional node in the network. */
  hub: string;
  /** The network of those nodes. */
  network: string;
}

const INDUSTRY_TERMS: Record<string, IndustryTerms> = {
  fmcg: {
    input: 'raw material inputs',
    line: 'production line',
    site: 'factory',
    lastStep: 'Packing & dispatch',
    outlets: 'company-run outlets',
    outlet: 'outlet',
    hub: 'distribution centre',
    network: 'distribution network',
  },
  banking: {
    input: 'deposit funding',
    line: 'application-processing workflow',
    site: 'operations centre',
    lastStep: 'Approval & handover',
    outlets: 'transaction points',
    outlet: 'transaction point',
    hub: 'regional operations centre',
    network: 'operations network',
  },
  retail: {
    input: 'goods purchased from suppliers',
    line: 'goods-handling process',
    site: 'fulfilment centre',
    lastStep: 'Packing & dispatch',
    outlets: 'stores',
    outlet: 'store',
    hub: 'distribution centre',
    network: 'distribution network',
  },
  tech: {
    input: 'infrastructure and operations staffing',
    line: 'order-processing workflow',
    site: 'operations centre',
    lastStep: 'Completion & handover',
    outlets: 'service points',
    outlet: 'service point',
    hub: 'regional operations centre',
    network: 'operations network',
  },
  healthcare: {
    input: 'drug and consumable inputs',
    line: 'examination and sample-processing workflow',
    site: 'facility',
    lastStep: 'Results & handover',
    outlets: 'facilities',
    outlet: 'facility',
    hub: 'regional testing centre',
    network: 'facility network',
  },
  logistics: {
    input: 'fuel and freight inputs',
    line: 'sorting line',
    site: 'sorting centre',
    lastStep: 'Packing & dispatch',
    outlets: 'post offices',
    outlet: 'post office',
    hub: 'regional sorting centre',
    network: 'sorting network',
  },
  'real-estate': {
    input: 'construction materials',
    line: 'project-delivery process',
    site: 'project office',
    lastStep: 'Acceptance & handover',
    outlets: 'sales floors',
    outlet: 'sales floor',
    hub: 'regional project office',
    network: 'project network',
  },
  consulting: {
    input: 'consulting staff',
    line: 'work-allocation process',
    site: 'operations unit',
    lastStep: 'Review & handover',
    outlets: 'offices',
    outlet: 'office',
    hub: 'regional office',
    network: 'office network',
  },
};

function terms(industry: string): IndustryTerms {
  return INDUSTRY_TERMS[industry] || INDUSTRY_TERMS.fmcg;
}

/** Southeast Asian markets used by the market-entry cases. */
const SEA_MARKETS: Array<[string, number, number]> = [
  // [market name, population (million), average category spend (USD/person/year)]
  ['Thailand', 71.7, 74],
  ['Indonesia', 281.6, 41],
  ['Philippines', 117.3, 36],
  ['Malaysia', 34.3, 96],
  ['Cambodia', 17.4, 23],
  ['Myanmar', 54.5, 15],
];

/** Vietnamese provinces/cities used by the territory-expansion cases. */
const VN_CITIES: Array<[string, number, number]> = [
  // [province/city, population (million), average income (million VND/month)]
  ['TP.HCM', 9.4, 9.2],
  ['Hà Nội', 8.6, 8.6],
  ['Bình Dương', 2.8, 8.1],
  ['Đồng Nai', 3.3, 6.4],
  ['Hải Phòng', 2.1, 6.8],
  ['Đà Nẵng', 1.3, 6.6],
  ['Cần Thơ', 1.3, 5.4],
  ['Nghệ An', 3.4, 4.1],
  ['Thanh Hoá', 3.7, 4.0],
  ['Khánh Hoà', 1.3, 5.2],
];

/* --------------------------------------------------------------------------
 * Case-building utilities
 * ------------------------------------------------------------------------ */

interface Ctx {
  industry: string;
  industryLabel: string;
  company: string;
  product: string;
  where: string;
  segments: string[];
  channels: string[];
}

type Builder = (c: Ctx, k: number, diff: CaseDifficulty) => Omit<FullCase, 'id' | 'industry' | 'type'>;

function ma(
  situationAnalysis: string,
  frameworkApplied: string,
  keyFindings: string[],
  recommendation: string,
): CaseModelAnswer {
  return {
    situation_analysis: situationAnalysis,
    framework_applied: frameworkApplied,
    key_findings: keyFindings,
    recommendation,
  };
}

/** Difficulty sets the model answer's depth: easy 3 · medium 4 · hard 5 findings. */
function fnd(diff: CaseDifficulty, all: string[]): string[] {
  const take = diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5;
  return all.slice(0, Math.min(take, all.length));
}

/** Easy cases get an extra guiding sentence; hard cases get an extra twist. */
function sit(diff: CaseDifficulty, base: string, easyHint: string, hardTwist: string): string {
  if (diff === 'easy') return `${base} ${easyHint}`;
  if (diff === 'hard') return `${base} ${hardTwist}`;
  return base;
}

function pickN<T>(pool: T[], count: number, offset: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < count; i += 1) out.push(pool[(offset + i) % pool.length]);
  return out;
}

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

/* ==========================================================================
 * PROFITABILITY (13 cases — 5 templates)
 * ======================================================================== */

const profMarginSqueeze: Builder = (c, k, diff) => {
  const years = ['2023', '2024', '2025'];
  const rev0 = 860 + k * 260;
  const rev = [rev0, round1(rev0 * 1.16), round1(rev0 * 1.34)];
  const cogsPct = [0.61, 0.638, 0.669];
  const sgaPct = [0.24, 0.247, 0.256];
  const cogs = rev.map((r, i) => round1(r * cogsPct[i]));
  const sga = rev.map((r, i) => round1(r * sgaPct[i]));
  const op = rev.map((r, i) => round1(r - cogs[i] - sga[i]));
  const opm = op.map((o, i) => (o / rev[i]) * 100);
  const revGrowth = ((rev[2] - rev[0]) / rev[0]) * 100;
  const opIfHeld = round1(rev[2] * (opm[0] / 100));
  const gap = round1(opIfHeld - op[2]);
  const cogsShift = (cogsPct[2] - cogsPct[0]) * 100;
  const sgaShift = (sgaPct[2] - sgaPct[0]) * 100;

  return {
    title: `Revenue up but profit down — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} grew revenue ${pct(revGrowth)} over three years on its flagship ${c.product}, yet operating profit slid from ${money(op[0])} to ${money(op[2])}. Management wants the strategy team to find the cause before next month's board meeting.`,
      'Hint: start with the profitability tree — split revenue and costs into separate branches, then track each cost as a share of revenue year by year.',
      'Extra twist: the CFO insists "rising input prices are a market problem — nothing we can do", while the sales director argues the higher selling costs are a necessary investment to defend share. You must adjudicate with the numbers.',
    ),
    key_question: `Why is profit falling while revenue grows, and what must ${c.company} do to restore the ${pct(opm[0])} margin of 2023?`,
    data_exhibits: [
      table(
        'Results 2023–2025 (billion VND)',
        ['Year', 'Revenue', 'Cost of goods sold', 'Selling & admin costs', 'Operating profit'],
        years.map((y, i) => [y, rev[i], cogs[i], sga[i], op[i]]),
      ),
      chart('line', 'Operating margin by year', years, opm.map((m) => round1(m)), '%'),
    ],
    framework_hints: ['Profitability Framework (revenue tree – cost tree)', 'Issue Tree / MECE', 'Value Chain Analysis'],
    model_answer: ma(
      `A classic profitability case: revenue grew ${pct(revGrowth)} yet absolute profit still fell ${money(round1(op[0] - op[2]))}. Since revenue is rising, the problem sits entirely on the cost side — specifically, costs growing FASTER than revenue. The job is to split costs into branches and see which branch is eating the margin.`,
      'Profitability Framework: Profit = Revenue − COGS − Selling & admin. Because the revenue branch is growing, park it and dig the cost tree by share of revenue (not absolute amounts).',
      fnd(diff, [
        `Operating margin fell from ${pct(opm[0])} (2023) to ${pct(opm[2])} (2025) — a loss of ${pct(opm[0] - opm[2])} percentage points.`,
        `COGS is the main culprit: its share of revenue rose from ${pct(cogsPct[0] * 100)} to ${pct(cogsPct[2] * 100)} — ${pct(cogsShift)} percentage points.`,
        `Selling & admin contributed the rest: up from ${pct(sgaPct[0] * 100)} to ${pct(sgaPct[2] * 100)} — ${pct(sgaShift)} percentage points.`,
        `Holding the 2023 margin of ${pct(opm[0])}, 2025 profit would have been ${money(opIfHeld)} instead of ${money(op[2])} — the ${money(gap)} gap is the size of the opportunity.`,
        `Revenue up ${pct(revGrowth)} but profit down ${pct(((op[0] - op[2]) / op[0]) * 100)} shows growth being "bought" with discounts and selling costs, not real demand.`,
      ]),
      `Prioritize the COGS branch — it accounts for ${pct((cogsShift / (cogsShift + sgaShift)) * 100)} of the margin decline: renegotiate long-term input contracts, review wastage norms, and rebalance the portfolio toward high-margin SKUs. In parallel, tie the selling-cost budget to incremental revenue targets instead of a fixed percentage. Recovering just half the ${money(gap)} gap already lifts profit above the 2023 level.`,
    ),
    tags: ['profitability', 'margin', 'cost-structure', c.industry],
  };
};

const profSegment: Builder = (c, k, diff) => {
  const segs = pickN(c.segments, 4, k);
  const rev = [round1(420 + k * 40), round1(310 + k * 28), round1(250 + k * 22), round1(160 + k * 18)];
  const gmPct = [38 + (k % 3), 31 - (k % 2), 24 + (k % 2), 44 - (k % 3)];
  const gm = rev.map((r, i) => round1((r * gmPct[i]) / 100));
  const revTotal = round1(sum(rev));
  const fixedTotal = round1(revTotal * 0.22);
  const fixed = rev.map((r) => round1((fixedTotal * r) / revTotal));
  const op = gm.map((g, i) => round1(g - fixed[i]));
  const opm = op.map((o, i) => (o / rev[i]) * 100);
  const best = [0, 1, 2, 3].reduce((a, b) => (opm[a] >= opm[b] ? a : b));
  const worst = [0, 1, 2, 3].reduce((a, b) => (opm[a] <= opm[b] ? a : b));
  const opTotal = round1(sum(op));

  return {
    title: `Which segment actually earns — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} serves four customer segments in its ${c.where} business. This year's operating profit is ${money(opTotal)} on ${money(revTotal)} of revenue — below plan. The CEO suspects some segments are being "subsidized" by the others but has no evidence.`,
      'Hint: compute EACH segment’s operating margin — don’t just look at revenue; the biggest-revenue segment is not necessarily the most profitable.',
      `Extra twist: the ${money(fixedTotal)} of fixed costs is currently allocated by revenue, but operations reports that the ${segs[worst]} segment consumes twice its revenue share in service resources. State clearly how your conclusion changes if you reallocate.`,
    ),
    key_question: `Which segments should ${c.company} double down on, and which should it shrink or restructure?`,
    data_exhibits: [
      table(
        'Results by customer segment (billion VND)',
        ['Segment', 'Revenue', 'Gross margin (%)', 'Gross profit', 'Allocated fixed costs', 'Operating profit'],
        segs.map((s, i) => [s, rev[i], gmPct[i], gm[i], fixed[i], op[i]]),
        'Fixed costs are allocated in proportion to revenue.',
      ),
      chart('pie', 'Gross-profit mix by segment', segs, gm, 'billion VND'),
    ],
    framework_hints: ['Profitability Framework by segment', 'MECE Principle', 'BCG Growth-Share Matrix'],
    model_answer: ma(
      `The total looks fine (${money(opTotal)} operating profit), but the aggregate hides a huge spread between segments: operating margin runs from ${pct(opm[worst])} to ${pct(opm[best])}. The question isn't "is the company profitable" but "where should the next dong of capital go".`,
      'Profitability Framework split by segment, combined with BCG-style portfolio thinking: rank each segment by margin and size to decide invest, hold, or restructure.',
      fnd(diff, [
        `${segs[best]} is the healthiest segment: ${pct(opm[best])} operating margin on ${money(rev[best])} of revenue.`,
        `${segs[worst]} is weakest at ${pct(opm[worst])} — contributing only ${money(op[worst])} despite ${pct((rev[worst] / revTotal) * 100)} of revenue.`,
        `The margin spread between the two ends is ${pct(opm[best] - opm[worst])} percentage points — large enough to change resource allocation.`,
        `If ${segs[worst]} reached the company-average margin (${pct((opTotal / revTotal) * 100)}), profit would rise by ${money(round1(rev[worst] * (opTotal / revTotal) - op[worst]))}.`,
        `A methodology warning: fixed costs are allocated by revenue. If ${segs[worst]} really consumes double its revenue share in resources, its true profit is even lower than ${money(op[worst])} — and the conclusion gets stronger.`,
      ]),
      `Pour the sales and product budget into ${segs[best]} — that is where each extra dong of revenue creates the most profit. For ${segs[worst]}, don't cut immediately: set a 2-quarter milestone — raise prices or cut cost-to-serve to reach a minimum ${pct((opTotal / revTotal) * 100)} margin; if it misses, shrink it and redeploy the resources. Before any big decision, redo the cost allocation on actual resource consumption.`,
    ),
    tags: ['profitability', 'segmentation', 'portfolio', c.industry],
  };
};

const profChannel: Builder = (c, k, diff) => {
  const chans = pickN(c.channels, 4, k);
  const rev = [round1(520 + k * 45), round1(680 + k * 30), round1(240 + k * 60), round1(180 + k * 20)];
  const discPct = [18, 9, 24, 12];
  const serveCostPct = [11, 19, 14, 8];
  const gmBasePct = 42 + (k % 4);
  const netRev = rev.map((r, i) => round1(r * (1 - discPct[i] / 100)));
  const gm = netRev.map((r) => round1((r * gmBasePct) / 100));
  const serveCost = rev.map((r, i) => round1((r * serveCostPct[i]) / 100));
  const op = gm.map((g, i) => round1(g - serveCost[i]));
  const opm = op.map((o, i) => (o / rev[i]) * 100);
  const best = [0, 1, 2, 3].reduce((a, b) => (opm[a] >= opm[b] ? a : b));
  const worst = [0, 1, 2, 3].reduce((a, b) => (opm[a] <= opm[b] ? a : b));
  const revTotal = round1(sum(rev));
  const opTotal = round1(sum(op));
  const topRevIdx = rev.indexOf(Math.max(...rev));
  const topRevRank = op.slice().sort((a, b) => b - a).indexOf(op[topRevIdx]) + 1;

  return {
    title: `Channel mix and profit — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} sells ${c.product} through four channels. Total channel revenue reaches ${money(revTotal)} but profit is only ${money(opTotal)}. The biggest-revenue channel also gets the sales team's top priority, and the commercial director wants to know whether that is the right call.`,
      'Hint: gross revenue tells you nothing — subtract discounts to get net revenue, then subtract the cost of serving each channel.',
      'Extra twist: the contract with the big retail chain locks its discount level for the next 18 months, so "cut the discount" is not immediately feasible. The answer must respect this constraint.',
    ),
    key_question: `How should ${c.company} shift its channel mix to raise profit without losing market coverage?`,
    data_exhibits: [
      table(
        'P&L by distribution channel (billion VND)',
        ['Channel', 'Gross revenue', 'Discount (%)', 'Net revenue', 'Gross profit', 'Channel cost-to-serve', 'Profit'],
        chans.map((ch, i) => [ch, rev[i], discPct[i], netRev[i], gm[i], serveCost[i], op[i]]),
        `Gross margin on net revenue is assumed uniform at ${gmBasePct}% across channels.`,
      ),
      chart('bar', 'Profit by channel', chans, op, 'billion VND'),
    ],
    framework_hints: ['Profitability Framework by channel', '4Ps / Marketing Mix (Place)', 'Value Chain Analysis'],
    model_answer: ma(
      `Revenue and profit are out of sync across channels. ${chans[best]} earns the highest margin (${pct(opm[best])}) while ${chans[worst]} manages only ${pct(opm[worst])}. The cause sits in two items that a gross-revenue report never shows: discounts and channel cost-to-serve.`,
      'Profitability Framework applied per channel, read with the "Place" P of the 4Ps: each channel has its own economics, so the decision must rest on profit after discounts and cost-to-serve.',
      fnd(diff, [
        `${chans[best]} earns best: ${money(op[best])} profit on ${money(rev[best])} revenue — a ${pct(opm[best])} margin.`,
        `${chans[worst]} is weakest at ${pct(opm[worst])} — a ${discPct[worst]}% discount plus ${serveCostPct[worst]}% cost-to-serve eats nearly all its gross profit.`,
        `The biggest-revenue channel is ${chans[topRevIdx]}, yet it ranks only #${topRevRank} on profit — clear evidence that revenue is steering decisions wrong.`,
        `Shifting 10% of revenue from ${chans[worst]} to ${chans[best]} adds roughly ${money(round1((rev[worst] * 0.1 * (opm[best] - opm[worst])) / 100))} of profit with no increase in total revenue.`,
        `Discounts are a stronger lever than cost-to-serve: each percentage point of discount clawed back in ${chans[worst]} is worth ${money(round1((rev[worst] * gmBasePct) / 10000))} of extra profit.`,
      ]),
      `Switch the sales team's target from revenue to profit by channel, and put more resources behind ${chans[best]}. For ${chans[worst]}, with the discount locked by contract, the remaining lever is cost-to-serve: consolidate deliveries, set minimum order quantities, and automate order processing. Schedule the discount renegotiation for the contract's expiry — and bring this channel P&L as the evidence.`,
    ),
    tags: ['profitability', 'channel-mix', 'pricing', c.industry],
  };
};

const profUnitEconomics: Builder = (c, k, diff) => {
  const t = terms(c.industry);
  const cohorts = ['Open under 1 year', 'Open 1–2 years', 'Open 2–3 years', 'Open over 3 years'];
  const count = [42 + k * 6, 55 + k * 4, 38 + k * 3, 64 + k * 5];
  const revPer = [round1(680 + k * 40), round1(940 + k * 45), round1(1080 + k * 50), round1(1150 + k * 55)];
  const opexPer = [round1(760 + k * 30), round1(830 + k * 32), round1(850 + k * 35), round1(880 + k * 38)];
  const profitPer = revPer.map((r, i) => round1(r - opexPer[i]));
  const capex = 2400 + k * 180;
  const mature = profitPer[3];
  const payback = round1(capex / mature);
  const newLoss = round1((profitPer[0] * count[0]) / 1000);
  const totalMonthly = round1(sum(profitPer.map((p, i) => (p * count[i]) / 1000)));

  return {
    title: `Unit economics of one ${t.outlet} — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} operates ${sum(count)} ${t.outlets} and plans to open 30 more next year. The board worries the opening pace is outrunning profitability: new sites lose money early on, and nobody is sure how long payback takes. Figures are in million VND/month per ${t.outlet}.`,
      `Hint: compute the average profit of one ${t.outlet} in each age cohort, then divide the initial investment by the mature cohort's profit to get the payback time.`,
      'Extra twist: next year’s 30 new sites sit in provinces with roughly 15% lower purchasing power than the current territory, while the initial investment barely changes. Explain how that shifts the payback math.',
    ),
    key_question: `Should ${c.company} go ahead with the 30 new sites, and what conditions must hold for the expansion to create value?`,
    data_exhibits: [
      table(
        `Unit economics by ${t.outlet} age cohort (million VND/month/site)`,
        ['Cohort', 'Sites', 'Revenue/month', 'Operating cost/month', 'Profit/month'],
        cohorts.map((label, i) => [label, count[i], revPer[i], opexPer[i], profitPer[i]]),
        `Initial investment per ${t.outlet}: ${n(capex)} million VND.`,
      ),
      metric(
        'Payback time of a mature site',
        `${n(payback)} months`,
        `Investment of ${n(capex)} million VND divided by the ${n(mature)} million VND/month profit of the 3-year-plus cohort.`,
      ),
    ],
    framework_hints: ['Unit Economics', 'Profitability Framework', 'Cost-Benefit Analysis (payback)'],
    model_answer: ma(
      `${c.company}'s ${t.outlet} model is fundamentally healthy — a mature site earns ${n(mature)} million VND/month — but it loses money early. So the real question isn't "is expansion right or wrong" but "how fast can we open before the cash flow can't take it".`,
      `Unit Economics: build the economics of ONE ${t.outlet} across its lifecycle (revenue − operating cost → profit → payback), and only then scale up to the network.`,
      fnd(diff, [
        `Each ${t.outlet} only turns profitable after about a year: the under-1-year cohort loses ${n(Math.abs(profitPer[0]))} million VND/month, while the 1–2-year cohort already earns ${n(profitPer[1])} million VND/month.`,
        `A mature ${t.outlet} pays back in ${n(payback)} months — acceptable for ${c.industryLabel}, but every new site must "carry" its early loss period first.`,
        `The ${count[0]} newest sites are dragging network profit down by ${money(Math.abs(newLoss), 'billion VND/month')}; total network profit is ${money(totalMonthly, 'billion VND/month')}.`,
        `Per-site revenue rises ${pct(((revPer[3] - revPer[0]) / revPer[0]) * 100)} from year one to maturity while operating cost rises only ${pct(((opexPer[3] - opexPer[0]) / opexPer[0]) * 100)} — the maturity curve comes from revenue, not cost cutting.`,
        `If the 30 new sites face 15% lower purchasing power, mature profit falls to about ${n(round1(revPer[3] * 0.85 - opexPer[3]))} million VND/month and payback stretches to roughly ${n(round1(capex / (revPer[3] * 0.85 - opexPer[3])))} months.`,
      ]),
      `Keep expanding, but with discipline: cap new openings so that total early-stage losses never exceed the mature network's profit, and screen locations against a minimum projected revenue of ${n(round1(opexPer[1] * 1.1))} million VND/month by year two. In low-purchasing-power provinces the initial investment must come down (smaller sites, leaner formats) for the payback math to hold. Prioritize shortening the maturity curve — it is the biggest value lever.`,
    ),
    tags: ['profitability', 'unit-economics', 'expansion', c.industry],
  };
};

const profCostShock: Builder = (c, k, diff) => {
  const t = terms(c.industry);
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const inputIdx = [100, 108, 121, 134];
  const price = [round1(100 + k * 6), round1(100 + k * 6), round1(103 + k * 6), round1(103 + k * 6)];
  const inputSharePct = 58;
  const unitCost = inputIdx.map((idx) => round1(((100 * inputSharePct) / 100) * (idx / 100) + (100 - inputSharePct) * 0.42));
  const gm = price.map((p, i) => round1(p - unitCost[i]));
  const gmPct = gm.map((g, i) => (g / price[i]) * 100);
  const vol = [round1(12.4 + k * 1.1), round1(12.1 + k * 1.1), round1(11.6 + k * 1.05), round1(11.2 + k * 1.0)];
  const gpTotal = gm.map((g, i) => round1((g * vol[i]) / 100));
  const priceNeeded = round1(unitCost[3] / (1 - gmPct[0] / 100));
  const priceUpPct = ((priceNeeded - price[3]) / price[3]) * 100;

  return {
    title: `An input-cost shock — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `The cost of ${t.input} for ${c.product} has risen ${pct(inputIdx[3] - inputIdx[0], 0)} over four quarters. ${c.company} has raised prices only once — ${pct(((price[2] - price[0]) / price[0]) * 100)} in Q3 — and is steadily losing margin. Prices and costs are indexed to 100 at Q1 for comparison; volume is in million units.`,
      'Hint: separate price and unit cost into two lines, compute gross margin per quarter, then find the price needed to restore the original margin.',
      'Extra twist: every past 1% price rise cut volume by about 0.8%. Weigh that elasticity before recommending another increase.',
    ),
    key_question: `How much of the cost increase should ${c.company} pass through to price, and what should it do with the rest?`,
    data_exhibits: [
      table(
        'Price, cost, and volume by quarter (index, Q1 = 100)',
        ['Quarter', 'Input-cost index', 'Price (index)', 'Unit cost (index)', 'Unit gross margin', 'Volume (million units)'],
        quarters.map((q, i) => [q, inputIdx[i], price[i], unitCost[i], gm[i], vol[i]]),
        `${t.input.charAt(0).toUpperCase()}${t.input.slice(1)} made up ${inputSharePct}% of unit cost at Q1.`,
      ),
      chart('line', 'Unit gross margin by quarter (%)', quarters, gmPct.map((g) => round1(g)), '%'),
    ],
    framework_hints: ['Profitability Framework (cost tree)', 'Pricing Strategies / price elasticity', 'Value Chain Analysis'],
    model_answer: ma(
      `Input costs rose ${pct(inputIdx[3] - inputIdx[0], 0)} but price has only risen ${pct(((price[3] - price[0]) / price[0]) * 100)}, so gross margin eroded from ${pct(gmPct[0])} to ${pct(gmPct[3])}. This is the classic pass-through problem: how much to pass on, when, and how to cover the rest.`,
      'Profitability Framework at the unit level (price − unit cost = gross margin), combined with Pricing Strategies to weigh the elasticity impact on volume.',
      fnd(diff, [
        `Unit gross margin fell ${pct(gmPct[0] - gmPct[3])} percentage points, from ${pct(gmPct[0])} (Q1) to ${pct(gmPct[3])} (Q4).`,
        `Absolute gross profit fell from ${money(gpTotal[0])} to ${money(gpTotal[3])} — losing both margin and volume.`,
        `Restoring the Q1 margin of ${pct(gmPct[0])} requires the price index to reach ${n(priceNeeded)} — another ${pct(priceUpPct)} above today.`,
        `At −0.8 elasticity, a ${pct(priceUpPct)} rise would cut volume by about ${pct(priceUpPct * 0.8)} — a single full pass-through is too risky.`,
        `Volume has already fallen ${pct(((vol[0] - vol[3]) / vol[0]) * 100)} since Q1 after just one increase, showing demand is already soft and the pricing headroom is narrower than theory suggests.`,
      ]),
      `Pass the price through in small steps rather than one jump: two increases of about ${pct(priceUpPct / 2)} a quarter apart, prioritizing the least price-sensitive SKUs and channels. The remaining gap must come from cost, not customers: lock forward input contracts to cap volatility, review service specs, and tighten wastage norms. Track unit gross margin — not revenue — as the monthly KPI.`,
    ),
    tags: ['profitability', 'pricing', 'cost-shock', c.industry],
  };
};

/* ==========================================================================
 * GROWTH & MARKET ENTRY (12 cases — 5 templates)
 * ======================================================================== */

const growthMarketEntry: Builder = (c, k, diff) => {
  const markets = pickN(SEA_MARKETS, 3, k);
  const home: [string, number, number] = ['Vietnam', 100.3, 68 + k];
  const rows = [home, ...markets];
  const size = rows.map(([, pop, spend]) => round1((pop * spend) / 1000));
  const rivals = [6, 9, 12, 7, 5, 4].slice(0, rows.length).map((x, i) => x + ((k + i) % 3));
  const tariff = [0, 12, 8, 15, 5, 10].slice(0, rows.length);
  const targetIdx = 1 + size.slice(1).indexOf(Math.max(...size.slice(1)));
  const target = rows[targetIdx][0];
  const targetSize = size[targetIdx];
  const homeSize = size[0];
  const sizeRatio = targetSize / homeSize;
  const sharePlan = 3;
  const revPotential = round1((targetSize * sharePlan) / 100);

  return {
    title: `Should we expand into ${target} — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} holds a solid position in Vietnam with ${c.product} and is weighing a regional move. Leadership has shortlisted three Southeast Asian markets and needs a grounded recommendation before the strategy off-site. Industry size is estimated as population times per-capita category spend.`,
      'Hint: a market-entry case always has two halves — is the market attractive, and do we have the advantages to win there. Don’t answer only the first half.',
      'Extra twist: a regional conglomerate has just announced a major investment in the very largest market on the list, and the window may be only ~12 months. Weigh speed to market as part of the advice.',
    ),
    key_question: `Should ${c.company} expand into ${target}? If so, by which mode — build, joint venture, or M&A?`,
    data_exhibits: [
      table(
        'Comparing the target markets',
        ['Market', 'Population (million)', 'Category spend (USD/person/year)', 'Industry size (billion USD)', 'Major competitors', 'Import tariff (%)'],
        rows.map(([name, pop, spend], i) => [name, pop, spend, size[i], rivals[i], tariff[i]]),
      ),
      chart('bar', 'Industry size by market (billion USD)', rows.map(([name]) => name), size, 'billion USD'),
    ],
    framework_hints: ['Market Entry Framework', '4Cs (Customer, Company, Competition, Context)', "Porter's 5 Forces"],
    model_answer: ma(
      `${target} is the biggest market in the set at ${money(targetSize, 'billion USD')} — ${n(sizeRatio, 2)}× ${c.company}'s current Vietnamese market. But size is only half the story — it must sit next to competitive intensity, tariff barriers, and the company's real capabilities.`,
      'Market Entry Framework on two axes: Market attractiveness (size × growth × profitability) × Our competitive position (product, cost, brand, channels). Use 4Cs to scan each axis and Porter 5 Forces to read the destination market’s industry structure.',
      fnd(diff, [
        `${target} is the most attractive on size: ${money(targetSize, 'billion USD')} — ${n(sizeRatio, 2)}× Vietnam.`,
        `But it is also the most crowded (${rivals[targetIdx]} major competitors) — winning share will be expensive.`,
        `The ${tariff[targetIdx]}% import tariff makes an export-from-Vietnam model hard to price competitively; winning requires local production or packaging.`,
        `Just ${sharePlan}% share equals ${money(revPotential, 'billion USD')} of revenue — big enough to justify the effort, small enough to be a realistic target rather than a dream.`,
        `Timing is real: if a regional conglomerate takes the position first, the later cost of winning share rises sharply — speed to market is worth more than a perfect plan.`,
      ]),
      `Enter ${target}, and enter via M&A or a joint venture with a local player that already owns distribution — not a greenfield build. Reasons: the ${tariff[targetIdx]}% tariff wipes out the cost advantage of exporting from Vietnam, ${rivals[targetIdx]} large competitors already hold the shelves, and the time window doesn't allow 3–4 years of channel building. Target ${sharePlan}% share within 3 years (${money(revPotential, 'billion USD')} of revenue), with a 12-month checkpoint: if the cost of winning one share point runs 30% over budget, stop and pivot to market number two.`,
    ),
    tags: ['market-entry', 'growth', 'international', c.industry],
  };
};

const growthNewSegment: Builder = (c, k, diff) => {
  const segs = pickN(c.segments, 4, k + 2);
  const pop = [round1(8.2 + k * 0.6), round1(14.5 + k * 0.9), round1(5.1 + k * 0.4), round1(21.3 + k * 1.2)];
  const spend = [round1(4.8 + k * 0.3), round1(2.1 + k * 0.15), round1(9.4 + k * 0.5), round1(1.2 + k * 0.1)];
  const growth = [11 + (k % 4), 18 + (k % 3), 7 + (k % 2), 22 + (k % 5)];
  const cac = [420 + k * 20, 260 + k * 15, 780 + k * 30, 180 + k * 10];
  // Size (million people) × spend (million VND/person) is already in trillion VND —
  // don't divide by 1,000 again, or every segment rounds down to 0.
  const value = pop.map((p, i) => round1(p * spend[i]));
  const bestValue = value.indexOf(Math.max(...value));
  const bestGrowth = growth.indexOf(Math.max(...growth));
  const efficiency = value.map((v, i) => round1((v * 1000) / cac[i]));
  const bestEff = efficiency.indexOf(Math.max(...efficiency));
  const topSpendIdx = spend.indexOf(Math.max(...spend));

  return {
    title: `Which new customer segment to go after — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company}'s core market for ${c.product} has slowed to single-digit growth. Leadership wants the next growth engine to come from under-served customer segments and has commissioned research on four candidates.`,
      'Hint: a segment’s value = size × average spend. Only then set it against the cost of acquiring a customer.',
      'Extra twist: the current sales team is trained only for the core segment, and serving the highest-spend segment requires an entirely different advisory skill set. Factor the cost of building that capability into the recommendation.',
    ),
    key_question: `Which segment should ${c.company} prioritise as its growth engine for the next 3 years, and why?`,
    data_exhibits: [
      table(
        'Assessing the four candidate segments',
        ['Segment', 'Size (million people)', 'Spend (million VND/person/year)', 'Market value (trillion VND)', 'Growth (%/year)', 'Cost per customer acquired (thousand VND)'],
        segs.map((s, i) => [s, pop[i], spend[i], value[i], growth[i], cac[i]]),
      ),
      chart('pie', 'Market value by segment (trillion VND)', segs, value, 'trillion VND'),
    ],
    framework_hints: ['Market Sizing (top-down)', '4Cs (Customer, Company, Competition, Context)', 'Ansoff Matrix (market development)'],
    model_answer: ma(
      `The four segments differ fundamentally: ${segs[bestValue]} is the largest by value (${money(value[bestValue], 'trillion VND')}), ${segs[bestGrowth]} grows fastest (${growth[bestGrowth]}%/year), and ${segs[bestEff]} is the cheapest to reach per unit of value. No option wins on all three criteria, so the choice must follow whichever criterion matters most to ${c.company} right now.`,
      'Ansoff Matrix, "market development" cell (existing product – new customers): examine each segment through the 4Cs and quantify it with top-down market sizing.',
      fnd(diff, [
        `${segs[bestValue]} has the largest market value: ${money(value[bestValue], 'trillion VND')} (${pct((value[bestValue] / sum(value)) * 100)} of the total opportunity).`,
        `${segs[bestGrowth]} grows fastest at ${growth[bestGrowth]}%/year — over 3 years it will expand by roughly ${pct((Math.pow(1 + growth[bestGrowth] / 100, 3) - 1) * 100)}.`,
        `Customer acquisition cost varies by up to ${n(round1(Math.max(...cac) / Math.min(...cac)), 1)}× between segments (${n(Math.min(...cac))} to ${n(Math.max(...cac))} thousand VND).`,
        `On marketing-capital efficiency, ${segs[bestEff]} leads — each thousand VND of acquisition cost buys the most market value.`,
        `The highest-spend segment (${segs[topSpendIdx]}) is also the most expensive to reach (${n(cac[topSpendIdx])} thousand VND/customer) and demands a new sales capability — its true cost is higher than the table shows.`,
      ]),
      `Go after ${segs[bestGrowth]} first: growth of ${growth[bestGrowth]}%/year and an acquisition cost of ${n(cac[bestGrowth])} thousand VND/customer let ${c.company} build a position before competitors notice — and crucially, the current team can serve it. Pilot in two provinces for 6 months with clear acquisition-cost targets before scaling nationwide. Keep ${segs[bestValue]} in scope for phase two — it is bigger, but it requires new capabilities and so cannot be the first move.`,
    ),
    tags: ['growth', 'segmentation', 'market-sizing', c.industry],
  };
};

const growthChannelExpansion: Builder = (c, k, diff) => {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const online = [round1(86 + k * 12), round1(112 + k * 14), round1(148 + k * 16), round1(196 + k * 19)];
  const offline = [round1(640 + k * 30), round1(628 + k * 28), round1(615 + k * 26), round1(602 + k * 24)];
  const total = online.map((o, i) => round1(o + offline[i]));
  const onlineShare = online.map((o, i) => (o / total[i]) * 100);
  const onlineGrowth = ((online[3] - online[0]) / online[0]) * 100;
  const offlineChange = ((offline[3] - offline[0]) / offline[0]) * 100;
  const totalChange = ((total[3] - total[0]) / total[0]) * 100;
  const projected = round1(online[3] * Math.pow(online[3] / online[0], 4 / 3));

  return {
    title: `The shift to the online channel — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company}'s online revenue from ${c.product} is growing fast while the traditional channel has flattened and started slipping. The board is debating whether to invest heavily in digital or defend the existing network. Figures are in billion VND per quarter.`,
      'Hint: compute the online channel’s share each quarter and compare its growth with the traditional channel’s decline — that tells you whether this is real growth or just migration.',
      'Extra twist: about 40% of online orders come from customers who already bought in stores, meaning part of the "growth" is just internal migration. The answer must isolate the genuinely new growth.',
    ),
    key_question: `How should ${c.company} allocate investment between the online channel and the traditional network over the next 2 years?`,
    data_exhibits: [
      table(
        'Revenue by channel and quarter (billion VND)',
        ['Quarter', 'Online channel', 'Traditional channel', 'Total', 'Online share (%)'],
        quarters.map((q, i) => [q, online[i], offline[i], total[i], round1(onlineShare[i])]),
      ),
      chart('line', 'Online revenue by quarter', quarters, online, 'billion VND'),
    ],
    framework_hints: ['Ansoff Matrix', 'Profitability Framework by channel', 'Value Chain Analysis'],
    model_answer: ma(
      `The online channel grew ${pct(onlineGrowth)} across four quarters, the traditional channel fell ${pct(Math.abs(offlineChange))}, and total revenue ${totalChange >= 0 ? 'rose' : 'fell'} only ${pct(Math.abs(totalChange))}. That last number is the one that matters: it shows most of the online growth is coming from the traditional channel's own customers, not new ones.`,
      'Ansoff Matrix to separate "market penetration" (old customers, new channel) from "market development" (new customers), plus channel-level profitability analysis to see whether every migrated dong improves or worsens margins.',
      fnd(diff, [
        `The online channel grew ${pct(onlineGrowth)} over four quarters and lifted its share from ${pct(onlineShare[0])} to ${pct(onlineShare[3])}.`,
        `The traditional channel lost ${money(round1(offline[0] - offline[3]))}, while online gained only ${money(round1(online[3] - online[0]))} — a net difference of ${money(round1(online[3] - online[0] - (offline[0] - offline[3])))}.`,
        `Total revenue ${totalChange >= 0 ? 'rose just' : 'fell'} ${pct(Math.abs(totalChange))} — this is mostly channel migration, not market growth.`,
        `With 40% of online orders coming from existing customers, real growth is only about ${money(round1((online[3] - online[0]) * 0.6))}, far below the surface number.`,
        `On the current trajectory, the online channel will reach roughly ${money(projected)} per quarter within a year and pass the ${pct(30, 0)} share mark — enough to force a restructuring of the store network, not just an add-on channel.`,
      ]),
      `Invest in the online channel, but frame it as a business-model transformation, not an extra sales channel. Concretely: measure by customer rather than by channel (a customer who buys in both places is worth more than one who buys in one), and re-plan the store network around new roles — showroom, experience, and pickup point — instead of mass closures. Set explicit targets for growth that comes from NEW customers, because only that part actually grows the company.`,
    ),
    tags: ['growth', 'omnichannel', 'digital', c.industry],
  };
};

const growthProductLaunch: Builder = (c, k, diff) => {
  const scenarios = ['Penetration price', 'Market-average price', 'Premium price'];
  const price = [round1(38 + k * 4), round1(52 + k * 5), round1(74 + k * 7)];
  const vol = [round1(9.6 + k * 0.8), round1(6.2 + k * 0.5), round1(3.1 + k * 0.25)];
  const unitCost = round1(28 + k * 3);
  const cm = price.map((p) => round1(p - unitCost));
  const cmTotal = cm.map((m, i) => round1((m * vol[i]) / 1000));
  const fixedLaunch = round1(Math.max(...cmTotal) * 0.62);
  const profit = cmTotal.map((t) => round1(t - fixedLaunch));
  const best = profit.indexOf(Math.max(...profit));
  const runnerUp = profit.slice().sort((a, b) => b - a)[1];
  const breakEvenVol = cm.map((m) => round1((fixedLaunch * 1000) / m));

  return {
    title: `Pricing a new product launch — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} is preparing to launch a new line alongside ${c.product}. Market research has built three price scenarios with projected first-year volumes. Unit variable cost is ${n(unitCost)} thousand VND, and fixed launch costs are ${money(fixedLaunch)}.`,
      'Hint: for each scenario, compute the unit contribution margin and multiply by volume — the scenario with the highest revenue is not necessarily the most profitable.',
      `Extra twist: the market leader may respond with a 10% price cut if ${c.company} chooses penetration pricing, which would drag that scenario's projected volume down by about a quarter.`,
    ),
    key_question: `Which price should ${c.company} choose for the new product, and how much must it sell at that price to break even?`,
    data_exhibits: [
      table(
        'Three price scenarios for year one',
        ['Scenario', 'Price (thousand VND)', 'Volume (million units)', 'Unit contribution margin', 'Total contribution margin (billion VND)', 'Profit after launch costs'],
        scenarios.map((s, i) => [s, price[i], vol[i], cm[i], cmTotal[i], profit[i]]),
        `Variable cost ${n(unitCost)} thousand VND/unit; fixed launch costs ${money(fixedLaunch)}.`,
      ),
      metric(
        'Most profitable scenario',
        scenarios[best],
        `Profit of ${money(profit[best])} — ${money(round1(profit[best] - runnerUp))} above the runner-up.`,
      ),
    ],
    framework_hints: ['Pricing Strategies', 'Profitability Framework (contribution margin)', 'Market Sizing (bottom-up)'],
    model_answer: ma(
      `The three scenarios trade price against volume in opposite directions. What decides the case is not revenue but total contribution margin: a low price sells more units that each contribute less, and vice versa. After deducting the ${money(fixedLaunch)} fixed launch cost, ${scenarios[best]} delivers the highest profit at ${money(profit[best])}.`,
      'Pricing Strategies combined with contribution-margin analysis: for each price, compute (price − variable cost) × volume, subtract fixed costs, then sanity-check with break-even volume.',
      fnd(diff, [
        `${scenarios[best]} is optimal on profit: ${money(profit[best])}, versus ${money(profit[0])} and ${money(profit[2])} for the other two options.`,
        `Unit contribution margins differ by ${n(round1(cm[2] - cm[0]))} thousand VND between premium and penetration pricing — enough to offset most of the volume gap.`,
        `Break-even volume: ${n(breakEvenVol[best] / 1000, 2)} million units for the optimal scenario, about ${pct((breakEvenVol[best] / 1000 / vol[best]) * 100)} of projected volume — a fairly wide safety margin.`,
        `The penetration scenario needs ${n(breakEvenVol[0] / 1000, 2)} million units just to break even — far riskier despite the largest headline revenue.`,
        `If the rival cuts prices 10% and the penetration scenario loses a quarter of its volume, that option's profit drops to ${money(round1((cm[0] * vol[0] * 0.75) / 1000 - fixedLaunch))} — further reinforcing the case against going low.`,
      ]),
      `Choose ${scenarios[best]}. It delivers the highest profit (${money(profit[best])}), has a healthy buffer above break-even, and — most importantly — does not trigger a price war ${c.company} would struggle to win against the market leader. Defend the price with perceived value — packaging, brand story, merchandising — rather than promotions. Set a 6-month review point: if actual volume falls below ${n(breakEvenVol[best] / 1000, 2)} million units, revisit the price before raising the marketing budget.`,
    ),
    tags: ['growth', 'pricing', 'product-launch', c.industry],
  };
};

const growthGeoExpansion: Builder = (c, k, diff) => {
  const cities = pickN(VN_CITIES, 4, k + 1);
  const rivalSites = [24, 18, 9, 6].map((x, i) => x + ((k + i) % 5));
  const openCost = cities.map(([, , income]) => round1(1800 + income * 90));
  const revPerSite = cities.map(([, pop, income], i) => round1((pop * income * 62) / (rivalSites[i] + 3)));
  const paybackMonths = revPerSite.map((r, i) => round1(openCost[i] / (r * 0.22)));
  const bestIdx = paybackMonths.indexOf(Math.min(...paybackMonths));
  const worstIdx = paybackMonths.indexOf(Math.max(...paybackMonths));

  return {
    title: `Expanding into provincial markets — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} is close to saturation in ${c.where} and wants to extend its ${c.product} network to other provinces. The development team has surveyed four territories with very different population sizes, purchasing power, and competitor density.`,
      'Hint: expected revenue per site depends on both purchasing power and how many competitors are already there — use payback time to compare provinces fairly.',
      'Extra twist: this year’s budget only covers two territories, and the operations team warns that opening in distant provinces adds about 15% to management costs versus the plan.',
    ),
    key_question: `Which territories should ${c.company} enter first, and in what order of priority?`,
    data_exhibits: [
      table(
        'Comparing the four target territories',
        ['Territory', 'Population (million)', 'Income (million VND/month)', 'Competitor sites', 'Cost to open 1 site (million VND)', 'Expected revenue/site/year (million VND)', 'Payback (months)'],
        cities.map(([name, pop, income], i) => [name, pop, income, rivalSites[i], openCost[i], revPerSite[i], paybackMonths[i]]),
        'Expected revenue assumes operating profit at 22% of revenue.',
      ),
      chart('bar', 'Expected revenue per site by territory', cities.map(([name]) => name), revPerSite, 'million VND/year'),
    ],
    framework_hints: ['Market Entry Framework', 'Market Sizing (bottom-up)', 'Cost-Benefit Analysis (payback)'],
    model_answer: ma(
      `The four territories cannot be compared on population or income alone, because competitor density completely changes the revenue a site can capture. Once everything is converted to payback time, the gap is stark: ${cities[bestIdx][0]} pays back in ${n(paybackMonths[bestIdx])} months while ${cities[worstIdx][0]} takes ${n(paybackMonths[worstIdx])} months.`,
      'The Market Entry Framework applied at province level: attractiveness (population × purchasing power) set against competitive intensity, then converted into a single yardstick — payback time — for ranking.',
      fnd(diff, [
        `${cities[bestIdx][0]} is the best territory: ${n(paybackMonths[bestIdx])}-month payback with expected revenue of ${n(revPerSite[bestIdx])} million VND/site/year.`,
        `${cities[worstIdx][0]} is the least attractive (${n(paybackMonths[worstIdx])} months) — its competitor density of ${rivalSites[worstIdx]} sites is the main cause.`,
        `The payback spread between the two extremes is ${n(round1(paybackMonths[worstIdx] - paybackMonths[bestIdx]))} months, large enough to dictate the rollout order.`,
        `With budget for only two territories, choosing ${cities[bestIdx][0]} plus the runner-up saves roughly ${n(round1(paybackMonths[worstIdx] - paybackMonths[bestIdx]))} months of tied-up capital versus the worst pick.`,
        `Adding 15% management cost for distant provinces stretches payback for the outlying territories by roughly ${n(round1(paybackMonths[worstIdx] * 0.15))} months — recheck before committing.`,
      ]),
      `Enter ${cities[bestIdx][0]} first: open 3–4 sites to validate the revenue assumptions over 2 quarters, then scale. Pick the second territory by payback time after adding the 15% management cost — the table flatters the more distant provinces. Avoid spreading across all four: a thin network in many provinces neither achieves operating scale nor builds brand recognition anywhere.`,
    ),
    tags: ['growth', 'expansion', 'market-entry', c.industry],
  };
};

/* ==========================================================================
 * OPERATIONS (10 cases — 4 templates)
 * ======================================================================== */

const opsBottleneck: Builder = (c, k, diff) => {
  const t = terms(c.industry);
  const stations = [
    'Stage 1 — Intake',
    'Stage 2 — Core processing',
    'Stage 3 — Inspection',
    `Stage 4 — ${t.lastStep}`,
  ];
  const capacity = [round1(420 + k * 26), round1(260 + k * 12), round1(380 + k * 22), round1(340 + k * 18)];
  const cycle = capacity.map((cap) => round1(3600 / cap));
  const defect = [1.2 + (k % 3) * 0.3, 3.8 + (k % 4) * 0.4, 0.9 + (k % 2) * 0.2, 1.6 + (k % 3) * 0.25];
  const bottleneck = capacity.indexOf(Math.min(...capacity));
  const throughput = capacity[bottleneck];
  const secondLowest = capacity.slice().sort((a, b) => a - b)[1];
  const upside = round1(secondLowest - throughput);
  const upsidePct = (upside / throughput) * 100;
  const idleCost = round1(sum(capacity.map((cap) => cap - throughput)) / capacity.length);

  return {
    title: `A capacity bottleneck in the ${t.line} — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} cannot keep up with peak-season demand for ${c.product}, even though management believes the ${t.site} still has spare capacity. The operations team has measured each stage's capacity in units per hour and recorded defect rates.`,
      `Hint: the capacity of the whole ${t.line} always equals the capacity of its weakest stage — find that stage before considering any solution.`,
      'Extra twist: the weakest stage also has the highest defect rate, and every defective unit must restart from the beginning of the chain. That makes true usable capacity even lower than the measured number.',
    ),
    key_question: `What is the real capacity of ${c.company}'s ${t.line}, and where would investment raise output the most per dong spent?`,
    data_exhibits: [
      table(
        'Capacity and quality by stage',
        ['Stage', 'Capacity (units/hour)', 'Cycle time (seconds/unit)', 'Defect rate (%)'],
        stations.map((s, i) => [s, capacity[i], cycle[i], round1(defect[i])]),
      ),
      chart('bar', 'Capacity by stage (units/hour)', stations.map((s) => s.split('—')[0].trim()), capacity, 'units/hr'),
    ],
    framework_hints: ['Theory of Constraints / bottleneck analysis', 'Value Chain Analysis', 'Issue Tree / Logic Tree'],
    model_answer: ma(
      `The ${t.site} is not short of overall capacity — it is short of capacity in exactly one place. ${stations[bottleneck]} manages only ${n(throughput)} units/hour, well below the other stages, so the entire ${t.line} is locked at that rate no matter how strong the other three are.`,
      'Theory of Constraints: identify the bottleneck → exploit it fully → subordinate everything else to its pace → elevate its capacity → repeat when the bottleneck moves.',
      fnd(diff, [
        `The bottleneck is ${stations[bottleneck]} at ${n(throughput)} units/hour — that IS the true capacity of the whole ${t.line}.`,
        `The other three stages run below capacity by an average of ${n(idleCost)} units/hour — paid-for capacity going to waste.`,
        `Raising the bottleneck to match the second-weakest stage (${n(secondLowest)} units/hour) adds ${n(upside)} units/hour of output, a gain of ${pct(upsidePct)}.`,
        `The ${pct(defect[bottleneck])} defect rate right at the bottleneck is the costliest loss: every defective unit burns the ${t.site}'s scarcest capacity.`,
        `Merely halving defects at the bottleneck recovers about ${n(round1((throughput * defect[bottleneck]) / 200))} units/hour — at almost no capital cost.`,
      ]),
      `Focus all effort on ${stations[bottleneck]}, ordered from cheapest to most expensive. Start with what costs nothing: cut defects at the bottleneck, strip every non-value-adding task from this stage, and schedule shifts so the bottleneck never stops during breaks. Only then consider capacity investment, targeting ${n(secondLowest)} units/hour (+${pct(upsidePct)} output). Do not invest in the other three stages — extra capacity there produces not one additional unit.`,
    ),
    tags: ['operations', 'bottleneck', 'throughput', c.industry],
  };
};

const opsNetwork: Builder = (c, k, diff) => {
  const t = terms(c.industry);
  const hubs = ['Northern hub', 'Central hub', 'Southern hub', 'Mekong Delta satellite hub'];
  const volume = [round1(48 + k * 5), round1(19 + k * 2), round1(62 + k * 6), round1(14 + k * 1.5)];
  const costPer = [round1(22 + k * 1.2), round1(31 + k * 1.6), round1(19 + k * 1.1), round1(38 + k * 2.1)];
  const leadTime = [round1(28 + k), round1(41 + k * 1.4), round1(24 + k * 0.8), round1(52 + k * 1.8)];
  const onTime = [94 - (k % 4), 87 - (k % 3), 96 - (k % 2), 78 - (k % 5)];
  const totalVol = round1(sum(volume));
  const totalCost = round1(sum(volume.map((v, i) => (v * costPer[i]) / 1000)));
  const blendedCost = round1((totalCost * 1000) / totalVol);
  const worst = costPer.indexOf(Math.max(...costPer));
  const best = costPer.indexOf(Math.min(...costPer));
  const savingIfMerged = round1((volume[worst] * (costPer[worst] - blendedCost)) / 1000);

  return {
    title: `Optimising the ${t.network} — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} runs four ${t.hub}s for ${c.product}. Cost per order is about 15% above competitors and the COO suspects the network is too fragmented. Volume is in thousand orders/day, cost in thousand VND/order.`,
      'Hint: compute the network-wide average cost first, then compare each hub against it to see which one is dragging costs up.',
      'Extra twist: the most expensive hub serves the highest-margin customer group, and closing it would nearly double that region’s service time.',
    ),
    key_question: `How should ${c.company} restructure the ${t.network} to cut costs without breaking its service-time commitments?`,
    data_exhibits: [
      table(
        `Performance by ${t.hub}`,
        ['Hub', 'Volume (thousand orders/day)', 'Cost (thousand VND/order)', 'Service time (hours)', 'On-time (%)'],
        hubs.map((h, i) => [h, volume[i], costPer[i], leadTime[i], onTime[i]]),
      ),
      metric(
        'Network-wide average cost',
        `${n(blendedCost)} thousand VND/order`,
        `Total cost of ${money(totalCost, 'billion VND/day')} divided by ${n(totalVol)} thousand orders per day.`,
      ),
    ],
    framework_hints: ['Value Chain Analysis', 'Profitability Framework (cost to serve)', 'Cost-Benefit Analysis'],
    model_answer: ma(
      `The network-wide average is ${n(blendedCost)} thousand VND/order, but that number hides a huge spread: ${hubs[best]} costs only ${n(costPer[best])} thousand VND/order while ${hubs[worst]} costs ${n(costPer[worst])} — a gap of ${pct(((costPer[worst] - costPer[best]) / costPer[best]) * 100)}. The cause is almost certainly scale: the most expensive hub is also the lowest-volume one.`,
      'Value Chain Analysis at the customer-fulfilment step, combined with per-node cost analysis checked against service commitments.',
      fnd(diff, [
        `${hubs[worst]} is the least efficient node: ${n(costPer[worst])} thousand VND/order, ${pct(((costPer[worst] - blendedCost) / blendedCost) * 100)} above the network average.`,
        `Volume and cost are clearly linked: ${hubs[best]} handles ${n(volume[best])} thousand orders/day at the lowest cost, while ${hubs[worst]} handles only ${n(volume[worst])}.`,
        `${hubs[worst]} also has the worst on-time rate (${onTime[worst]}%) and the longest service time (${n(leadTime[worst])} hours) — it is both expensive and poor.`,
        `Consolidating ${hubs[worst]}'s volume at the network-average cost would save about ${money(savingIfMerged, 'billion VND/day')}.`,
        `But be careful: high-margin customers in that region would see service times nearly double, so the cost savings could be offset by lost revenue.`,
      ]),
      `Do not close ${hubs[worst]} yet. First try pushing more volume through it — consolidate routes, take on nearby B2B clients — to test the scale hypothesis, because if it holds, unit cost will fall on its own while service times stay intact. Set a clear milestone: after 2 quarters, if unit cost is still more than 20% above average, switch to a small satellite-hub model with outsourced last-mile delivery. In parallel, quantify the value of the region's high-margin customers so the ${money(savingIfMerged, 'billion VND/day')} saving can be weighed against the revenue at risk.`,
    ),
    tags: ['operations', 'supply-chain', 'network', c.industry],
  };
};

const opsService: Builder = (c, k, diff) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const onTime = [96, 94, 91, 87, 84, 81].map((x) => x - (k % 4));
  const complaints = [120, 168, 245, 372, 468, 590].map((x) => round1(x * (1 + k * 0.12)));
  const compensation = complaints.map((x) => round1((x * (1.8 + k * 0.15)) / 1000));
  const volume = [round1(240 + k * 18), round1(258 + k * 19), round1(292 + k * 21), round1(348 + k * 25), round1(390 + k * 28), round1(432 + k * 31)];
  const onTimeDrop = onTime[0] - onTime[5];
  const volGrowth = ((volume[5] - volume[0]) / volume[0]) * 100;
  const compTotal = round1(sum(compensation));
  const complaintRate = complaints.map((x, i) => (x / (volume[i] * 1000)) * 100);

  return {
    title: `Service quality sliding as volume grows — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company}'s ${c.product} volume has surged over six months, but the on-time rate has fallen from ${onTime[0]}% to ${onTime[5]}% and complaints have multiplied. The largest customer has warned it will review the contract. Volume is in thousand orders/month, compensation costs in billion VND.`,
      'Hint: put complaints over total volume rather than looking at absolute counts — more volume naturally means more complaints; the question is whether they grow faster or slower than volume.',
      'Extra twist: operations blames understaffing, while the tech team says the dispatch system is overloaded. The budget covers only one of the two fixes.',
    ),
    key_question: `What is the root cause of the service-quality decline, and where should ${c.company} prioritise the fix?`,
    data_exhibits: [
      table(
        'Six months of operating metrics',
        ['Month', 'Volume (thousand orders)', 'On-time (%)', 'Complaints', 'Complaint rate (%)', 'Compensation cost (billion VND)'],
        months.map((m, i) => [m, volume[i], onTime[i], complaints[i], round2(complaintRate[i]), compensation[i]]),
      ),
      chart('line', 'On-time delivery rate by month (%)', months, onTime, '%'),
    ],
    framework_hints: ['Issue Tree / Logic Tree', 'Value Chain Analysis', 'MECE Principle'],
    model_answer: ma(
      `Volume rose ${pct(volGrowth)} in six months and service quality fell in step — the on-time rate lost ${pct(onTimeDrop, 0)} percentage points. The crux: the complaint rate per order climbed from ${pct(complaintRate[0], 2)} to ${pct(complaintRate[5], 2)}, i.e. quality is deteriorating FASTER than volume is growing. That is the signature of a system at its capacity ceiling, not of normal growth.`,
      'An Issue Tree splits the causes into MECE branches — capacity (people, vehicles), systems (dispatch, technology), process (ways of working), and demand mix (harder orders?) — then eliminates each branch with data.',
      fnd(diff, [
        `On-time delivery fell ${pct(onTimeDrop, 0)} percentage points in 6 months, from ${onTime[0]}% to ${onTime[5]}%.`,
        `The complaint rate rose from ${pct(complaintRate[0], 2)} to ${pct(complaintRate[5], 2)} — a ${n(round1(complaintRate[5] / complaintRate[0]), 1)}× deterioration, faster than volume growth.`,
        `Cumulative compensation costs have reached ${money(compTotal)} — large enough on their own to justify an investment in a fix.`,
        `The decline became clear in March when volume passed ${n(volume[2])} thousand orders — most likely the current system's capacity threshold.`,
        `The biggest risk is not in the table: the largest customer is threatening to review the contract, so the potential damage far exceeds the ${money(compTotal)} in compensation.`,
      ]),
      `Pin down the breaking point at ${n(volume[2])} thousand orders/month, then test both hypotheses with existing data before spending: if dispatch queue times are rising while output per person is flat, the bottleneck is the system; if output per person is falling, it is the people. With budget for only one path, prioritise the dispatch system — it raises the capacity ceiling for every future volume level, while hiring merely buys time. Meanwhile, proactively renegotiate delivery commitments with the largest customer, because losing the contract costs far more than ${money(compTotal)} in compensation.`,
    ),
    tags: ['operations', 'service-quality', 'scaling', c.industry],
  };
};

const opsWorkforce: Builder = (c, k, diff) => {
  const units = ['Branch A', 'Branch B', 'Branch C', 'Branch D'];
  const staff = [86 + k * 6, 64 + k * 4, 112 + k * 8, 48 + k * 3];
  const output = [round1(9.2 + k * 0.7), round1(8.1 + k * 0.6), round1(10.4 + k * 0.8), round1(7.2 + k * 0.5)];
  const productivity = output.map((o, i) => round1((o * 1000) / staff[i]));
  const laborCost = staff.map((s) => round1((s * 16.4) / 1000));
  const costPerUnit = laborCost.map((lc, i) => round1((lc * 1000) / (output[i] * 1000)));
  const best = productivity.indexOf(Math.max(...productivity));
  const worst = productivity.indexOf(Math.min(...productivity));
  const gap = ((productivity[best] - productivity[worst]) / productivity[worst]) * 100;
  const totalStaff = sum(staff);
  const staffIfBest = round1((sum(output) * 1000) / productivity[best]);
  const staffSaved = round1(totalStaff - staffIfBest);

  return {
    title: `Productivity gaps across branches — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} runs four branches doing identical work for ${c.product}, yet labour cost per unit of output differs markedly. The HR director wants to know whether this is about scale, people, or ways of working. Output is in thousand units/month, costs in billion VND/month.`,
      'Hint: compute output per head for each branch, then test how many people would be needed if every branch hit the best branch’s level.',
      'Extra twist: the most productive branch also has the highest attrition, so its model may not be sustainable to replicate as-is.',
    ),
    key_question: `How far can ${c.company} lift system-wide productivity, and what would it take to get there?`,
    data_exhibits: [
      table(
        'Productivity and labour cost by branch',
        ['Branch', 'Headcount', 'Output (thousand units/month)', 'Productivity (units/person/month)', 'Labour cost (billion VND/month)', 'Cost/unit (thousand VND)'],
        units.map((u, i) => [u, staff[i], output[i], productivity[i], laborCost[i], costPerUnit[i]]),
        'Assumes average labour cost of 16.4 million VND/person/month.',
      ),
      chart('bar', 'Productivity by branch (units/person/month)', units, productivity, 'units/person'),
    ],
    framework_hints: ['Internal benchmarking', "McKinsey 7-S Framework", 'Value Chain Analysis'],
    model_answer: ma(
      `Four branches do the same job, yet productivity spans ${pct(gap)} — from ${n(productivity[worst])} to ${n(productivity[best])} units/person/month. That gap is far larger than scale can explain, so the cause almost certainly lies in ways of working and management systems, not in the people.`,
      'Internal benchmarking to size the gap, then McKinsey 7-S to find the cause: looking at "Staff" and "Skills" alone is not enough — examine "Systems" (tools, processes), "Structure" (role design), and "Style" (how shifts are managed) too.',
      fnd(diff, [
        `${units[best]} achieves ${n(productivity[best])} units/person/month, ${pct(gap)} above ${units[worst]}.`,
        `Labour cost per unit ranges from ${n(costPerUnit[best])} to ${n(costPerUnit[worst])} thousand VND — a direct hit to margin.`,
        `Scale does not explain the gap: ${units[best]} has ${staff[best]} staff, neither the largest nor the smallest branch.`,
        `If all four branches matched ${units[best]}'s productivity, the system would need only ${n(staffIfBest)} people instead of ${n(totalStaff)} — freeing ${n(staffSaved)} people to serve growth.`,
        `Replicate with care: high attrition at ${units[best]} suggests part of its productivity comes from unsustainable work intensity.`,
      ]),
      `Send a small team into ${units[best]} for two weeks to separate what drives its productivity: tools and process (replicable, sustainable) versus work intensity (should not be copied). Then transfer the replicable part to ${units[worst]} first — that is where each percentage point of improvement is worth most. Target closing half the gap within 6 months, and use the ${n(staffSaved)} freed-up staff to serve growth rather than cutting them, because layoffs would kill the motivation to join the improvement effort.`,
    ),
    tags: ['operations', 'productivity', 'benchmarking', c.industry],
  };
};

/* ==========================================================================
 * STRATEGY (8 cases — 3 templates)
 * ======================================================================== */

const stratCompetitiveResponse: Builder = (c, k, diff) => {
  const players = [c.company, 'Market leader', 'Local rival', 'Low-cost entrant'];
  const price = [round1(100 + k * 5), round1(112 + k * 5), round1(96 + k * 4), round1(78 + k * 3)];
  const share = [24 + (k % 5), 31 - (k % 3), 18 + (k % 4), 9 + (k % 6)];
  const gm = [38 - (k % 4), 44 - (k % 3), 33 + (k % 2), 21 + (k % 3)];
  const outlets = [1240 + k * 90, 1860 + k * 110, 980 + k * 70, 420 + k * 140];
  const priceGap = ((price[0] - price[3]) / price[0]) * 100;
  const shareAtRisk = round1(share[0] * 0.18);
  const gmIfMatch = round1(gm[0] - priceGap * 0.8);

  return {
    title: `Responding to a low-cost entrant — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `A new entrant has arrived in the ${c.where} market priced about ${pct(priceGap)} below ${c.company} and has taken ${share[3]}% share within a year. Internally, opinion is split between cutting prices to fight back and holding position. Prices are indexed with ${c.company} = ${n(price[0])}.`,
      'Hint: before deciding whether to cut prices, compute what a cut would leave of your margin — and whether the entrant can endure longer than you can.',
      'Extra twist: the entrant is backed by a foreign investment fund and has openly accepted 3 years of losses to buy share. In a pure price war you would almost certainly lose on staying power.',
    ),
    key_question: `How should ${c.company} respond to the low-cost entrant — match its price, hold price and differentiate, or launch a fighter brand?`,
    data_exhibits: [
      table(
        'The competitive landscape',
        ['Company', 'Price (index)', 'Market share (%)', 'Gross margin (%)', 'Points of sale'],
        players.map((p, i) => [p, price[i], share[i], gm[i], outlets[i]]),
      ),
      chart('bar', 'Market share by company (%)', players, share, '%'),
    ],
    framework_hints: ["Porter's 5 Forces", "Porter's Generic Strategies", 'Pricing Strategies'],
    model_answer: ma(
      `The entrant has taken ${share[3]}% of the market with prices ${pct(priceGap)} lower, but its gross margin is only ${gm[3]}% versus ${c.company}'s ${gm[0]}%. That says two things: it has no real cost advantage, and it is buying share with investors' money. The strategic question is therefore not "should we cut prices" but "on which axis can we win".`,
      "Porter's 5 Forces to gauge the threat from the new entrant, combined with Generic Strategies: when you cannot win on the low-cost axis, move the game to differentiation or focus.",
      fnd(diff, [
        `The entrant has the lowest gross margin in the market (${gm[3]}%) — its model survives on funding, not efficiency.`,
        `If ${c.company} matched the entrant's price, gross margin would fall from ${gm[0]}% to about ${pct(gmIfMatch)} — margin lost on ALL existing sales, not just the contested part.`,
        `${c.company}'s network of ${n(outlets[0])} points of sale is ${n(round1(outlets[0] / outlets[3]), 1)}× the entrant's — an asset they cannot copy quickly and the foundation for a differentiation strategy.`,
        `The share genuinely at risk is only about ${pct(shareAtRisk)} — the most price-sensitive customers — not the full ${share[0]}%.`,
        `The market leader charges ${pct(((price[1] - price[0]) / price[0]) * 100)} more than ${c.company} yet holds ${share[1]}% share, proof this market will pay a premium for the right value.`,
      ]),
      `Do not cut prices on the main line — that sacrifices ${pct(gm[0] - gmIfMatch)} margin points on all sales to defend ${pct(shareAtRisk)} of share, a terrible trade. Instead, launch a fighter brand in the low-price segment to block price-sensitive customers without diluting the main brand's price, and invest in what the entrant lacks: the ${n(outlets[0])}-outlet footprint, after-sales service, and brand trust. Track the entrant's financial health — at a ${gm[3]}% gross margin, pressure will reach them before it reaches you.`,
    ),
    tags: ['strategy', 'competition', 'pricing', c.industry],
  };
};

const stratPortfolio: Builder = (c, k, diff) => {
  const units = ['Traditional core business', 'Digital business', 'Premium business', 'International business'];
  const marketGrowth = [3 + (k % 3), 24 + (k % 6), 11 + (k % 4), 16 + (k % 5)];
  const relShare = [round1(1.8 + k * 0.1), round1(0.4 + k * 0.05), round1(1.2 + k * 0.08), round1(0.3 + k * 0.04)];
  const rev = [round1(1420 + k * 90), round1(210 + k * 45), round1(480 + k * 40), round1(160 + k * 30)];
  const op = rev.map((r, i) => round1((r * [17, -8, 14, -3][i]) / 100));
  const revTotal = round1(sum(rev));
  const opTotal = round1(sum(op));
  const star = 1;
  const cash = 0;

  return {
    title: `Rebalancing the business portfolio — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} has four business units with very different growth rates and profitability. The core still generates most of the profit but its market has nearly stopped growing, while the fastest-growing digital unit is losing money. The board must decide capital allocation for the next three years.`,
      'Hint: place the four units on two axes — market growth rate and relative share versus the largest competitor — then read them through the four cells of the BCG matrix.',
      'Extra twist: cash flow from the core is shrinking about 5% a year, so the window for using it to fund the growth units is narrowing. Sequencing matters more than spend levels.',
    ),
    key_question: `How should ${c.company} allocate capital across the four units — which to invest in, which to maintain, and which to divest?`,
    data_exhibits: [
      table(
        'The four-unit portfolio',
        ['Business unit', 'Market growth (%/year)', 'Relative market share', 'Revenue (billion VND)', 'Operating profit (billion VND)'],
        units.map((u, i) => [u, marketGrowth[i], relShare[i], rev[i], op[i]]),
        'Relative share = own share divided by the largest competitor’s share; above 1.0 means market leadership.',
      ),
      chart('bar', 'Revenue by business unit', units, rev, 'billion VND'),
    ],
    framework_hints: ['BCG Growth-Share Matrix', 'GE-McKinsey Matrix', 'Profitability Framework'],
    model_answer: ma(
      `Placing the four units on the BCG matrix gives a very clear picture: ${units[cash]} is the "cash cow" (relative share ${n(relShare[cash], 1)} but market growth of only ${marketGrowth[cash]}%/year), ${units[star]} is a "question mark" (market growing ${marketGrowth[star]}%/year but relative share still ${n(relShare[star], 1)}), and the international unit sits weakest on both axes.`,
      'BCG Growth-Share Matrix: market growth on the vertical axis, relative share on the horizontal. Cash cows generate cash, stars need feeding, question marks demand a decisive choice, dogs should be divested.',
      fnd(diff, [
        `${units[cash]} generates ${money(op[cash])} of profit — ${pct((op[cash] / opTotal) * 100)} of the total — and is the funding source for everything else.`,
        `${units[star]} has a market growing ${marketGrowth[star]}%/year but relative share of only ${n(relShare[star], 1)} and a loss of ${money(Math.abs(op[star]))} — a textbook "question mark" that forces a choice: invest hard to win position, or exit.`,
        `The international unit is weak on both axes (relative share ${n(relShare[3], 1)}, loss of ${money(Math.abs(op[3]))}) while contributing just ${pct((rev[3] / revTotal) * 100)} of revenue — the clearest divestment candidate.`,
        `${units[2]} is the most balanced: market growing ${marketGrowth[2]}%/year, already leading (relative share ${n(relShare[2], 1)}), and profitable at ${money(op[2])} — keep feeding it into a second pillar.`,
        `Time is the real constraint: core cash flow shrinks 5%/year, so the budget available for ${units[star]} keeps getting smaller — half-hearted investment is the surest way to lose both.`,
      ]),
      `Divest the international unit and redirect all of those resources into ${units[star]}, with a decisive commitment: enough capital to push relative share above 1.0 within 3 years, with annual checkpoints. Milk ${units[cash]} for cash but keep enough investment to hold its position — don't let the cash cow die early while it is still the only funding source. Keep feeding ${units[2]} at a moderate level so it becomes the second profit pillar as the core declines.`,
    ),
    tags: ['strategy', 'portfolio', 'BCG', c.industry],
  };
};

const stratDigital: Builder = (c, k, diff) => {
  const inits = ['Core process automation', 'Customer data platform', 'Self-service sales channel', 'Core system upgrade'];
  const invest = [round1(48 + k * 6), round1(72 + k * 9), round1(36 + k * 5), round1(180 + k * 20)];
  const impact = [round1(32 + k * 4), round1(41 + k * 6), round1(28 + k * 4), round1(64 + k * 8)];
  const months = [9, 14, 6, 30];
  const risk = ['Low', 'Medium', 'Low', 'High'];
  const roi = impact.map((im, i) => round1((im / invest[i]) * 100));
  const payback = invest.map((iv, i) => round1((iv / impact[i]) * 12));
  const best = roi.indexOf(Math.max(...roi));
  const worst = roi.indexOf(Math.min(...roi));
  const totalInvest = round1(sum(invest));
  const budget = round1(totalInvest * 0.45);

  return {
    title: `Prioritising digital transformation — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} has four competing digital-transformation proposals totalling ${money(totalInvest)} of requested investment, while the approved budget is only ${money(budget)}. Every department insists its project matters most, and the executive team needs an objective basis for ranking.`,
      'Hint: convert every proposal to the same yardsticks — annual return on investment and payback time — before comparing them.',
      'Extra twist: the core system upgrade has the slowest payback but is a technical prerequisite for two other projects. Dropping it would reduce the impact of the remaining projects.',
    ),
    key_question: `Which initiatives should ${c.company} choose within the ${money(budget)} budget, and in what sequence?`,
    data_exhibits: [
      table(
        'The four digital proposals',
        ['Initiative', 'Investment (billion VND)', 'Profit impact (billion VND/year)', 'Time to deliver (months)', 'Risk level', 'Payback (months)'],
        inits.map((it, i) => [it, invest[i], impact[i], months[i], risk[i], payback[i]]),
      ),
      metric(
        'Most capital-efficient initiative',
        `${inits[best]} — ROI ${pct(roi[best], 0)}/year`,
        `Pays back in ${n(payback[best])} months on an investment of ${money(invest[best])}.`,
      ),
    ],
    framework_hints: ['Cost-Benefit Analysis', 'MECE Principle', 'Issue Tree / Logic Tree'],
    model_answer: ma(
      `The four proposals differ hugely on capital efficiency: ROI ranges from ${pct(roi[worst], 0)} to ${pct(roi[best], 0)} per year. But ranking purely on ROI would produce the wrong decision, because of a technical dependency between projects — a factor the table doesn't show.`,
      'Cost-Benefit Analysis to convert every proposal into comparable ROI and payback figures, then a dependency layer on top to catch the constraints single numbers cannot express.',
      fnd(diff, [
        `${inits[best]} is the most capital-efficient: ROI of ${pct(roi[best], 0)}/year, payback in just ${n(payback[best])} months, ${risk[best].toLowerCase()} risk.`,
        `${inits[worst]} is weakest on ROI (${pct(roi[worst], 0)}/year) and takes ${months[worst]} months to deliver at ${risk[worst].toLowerCase()} risk.`,
        `The ${money(budget)} budget covers only about ${pct((budget / totalInvest) * 100)} of the total ask — selection is unavoidable; you cannot do everything.`,
        `The three cheapest initiatives together cost ${money(round1(totalInvest - Math.max(...invest)))} and deliver ${money(round1(sum(impact) - Math.max(...impact)))}/year — just inside budget if the biggest project is dropped.`,
        `But the technical dependency overturns that simple conclusion: without the core upgrade, the dependent projects' real impact falls below the table's numbers, so the "saving" is illusory.`,
      ]),
      `Start with ${inits[best]} this quarter — it pays back in ${n(payback[best])} months, carries low risk, and the cash it generates helps fund the rest. In parallel, break the core system project into small phases and build only the parts the other initiatives depend on, rather than a full one-shot upgrade — that preserves technical feasibility without consuming the whole budget. Defer the remainder to next year, when real results can update the estimates.`,
    ),
    tags: ['strategy', 'digital', 'prioritization', c.industry],
  };
};

/* ==========================================================================
 * M&A (5 cases — 2 templates)
 * ======================================================================== */

const mnaTargetValuation: Builder = (c, k, diff) => {
  const targetRev = round1(680 + k * 120);
  const targetEbitda = round1(targetRev * (0.14 + k * 0.01));
  const targetMargin = (targetEbitda / targetRev) * 100;
  const ownRev = round1(targetRev * (3.2 + k * 0.3));
  const ownEbitda = round1(ownRev * (0.19 + k * 0.005));
  const ownMargin = (ownEbitda / ownRev) * 100;
  const askEv = round1(targetEbitda * (11 + k * 0.5));
  const askMultiple = round1(askEv / targetEbitda);
  const sectorMultiple = round1(8.5 + k * 0.2);
  const fairEv = round1(targetEbitda * sectorMultiple);
  const premium = round1(askEv - fairEv);
  const synergy = round1(targetRev * 0.045 + ownRev * 0.012);
  const evWithSynergy = round1((targetEbitda + synergy) * sectorMultiple);
  const headroom = round1(evWithSynergy - askEv);

  return {
    title: `Valuing an acquisition — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} is considering acquiring an industry peer to expand quickly in ${c.where}. The seller is asking an enterprise value of ${money(askEv)}, or ${n(askMultiple, 1)}× EBITDA — above the sector average multiple of ${n(sectorMultiple, 1)}×. Management needs to know whether the price is reasonable.`,
      'Hint: compare the asking multiple with the sector average to size the premium, then test whether synergies are worth enough to cover it.',
      'Extra twist: about 30% of the target’s revenue comes from three large customers, and two of them are already your customers too — part of that revenue would overlap rather than add.',
    ),
    key_question: `Is the ${money(askEv)} asking price reasonable, and what is the most ${c.company} should pay for this deal?`,
    data_exhibits: [
      table(
        'Buyer vs target financials (billion VND)',
        ['Metric', `${c.company} (buyer)`, 'Target company'],
        [
          ['Revenue', ownRev, targetRev],
          ['EBITDA', ownEbitda, targetEbitda],
          ['EBITDA margin (%)', round1(ownMargin), round1(targetMargin)],
          ['Asking price (EV)', '—', askEv],
          ['EV/EBITDA multiple', '—', round1(askMultiple)],
          ['Sector average multiple', '—', sectorMultiple],
        ],
      ),
      metric(
        'Premium over the sector-based valuation',
        money(premium),
        `Asking price of ${money(askEv)} versus ${money(fairEv)} at the sector multiple of ${n(sectorMultiple, 1)}×.`,
      ),
    ],
    framework_hints: ['M&A Valuation (EV/EBITDA multiples)', 'Cost-Benefit Analysis', 'Value Chain Analysis (synergies)'],
    model_answer: ma(
      `The seller is asking ${n(askMultiple, 1)}× EBITDA while the sector trades at ${n(sectorMultiple, 1)}× — the ${money(premium)} premium is justified only if ${c.company} can create value the current owners cannot. In other words, the whole deal stands or falls on the synergy question.`,
      'EV/EBITDA multiple valuation as the anchor, then apply the rule: maximum price = standalone value + achievable synergies, and the buyer should never hand the full synergy value to the seller upfront.',
      fnd(diff, [
        `The target's EBITDA margin is ${pct(targetMargin)}, ${pct(ownMargin - targetMargin)} percentage points below ${c.company}'s ${pct(ownMargin)} — there is improvement headroom after the deal.`,
        `The sector multiple of ${n(sectorMultiple, 1)}× implies a standalone value of ${money(fairEv)}, meaning the seller is asking ${money(premium)} on top.`,
        `Estimated synergies of ${money(synergy)}/year from shared-cost optimisation and cross-selling lift the enterprise value to ${money(evWithSynergy)}.`,
        `After synergies, the asking price still leaves ${money(headroom)} of headroom — the deal creates value, but the safety margin is thin.`,
        `Customer concentration thins that margin further: if part of the 30% of revenue from three large customers overlaps with existing accounts, the real incremental revenue will be below assumptions.`,
      ]),
      `The deal is worth pursuing, but not at this price. Offer ${money(round1(fairEv + synergy * 0.4))} — standalone value plus roughly 40% of the synergies — because the buyer creates those synergies and should not pay them all to the seller. If the seller holds at ${money(askEv)}, structure the gap as an earn-out tied to future results, so the seller bears the revenue-overlap risk. Detailed due diligence on the three large customers is mandatory before signing anything.`,
    ),
    tags: ['mna', 'valuation', 'synergy', c.industry],
  };
};

const mnaSynergy: Builder = (c, k, diff) => {
  const buckets = ['Procurement cost optimisation', 'Network & warehouse consolidation', 'Cross-selling to the new customer base', 'Management de-layering'];
  const value = [round1(64 + k * 8), round1(48 + k * 6), round1(92 + k * 12), round1(36 + k * 4)];
  const monthsTo = [9, 18, 24, 12];
  const certainty = [85, 70, 40, 90];
  const costToGet = [round1(12 + k * 1.5), round1(38 + k * 4), round1(26 + k * 3), round1(44 + k * 5)];
  const riskAdj = value.map((v, i) => round1((v * certainty[i]) / 100));
  const netValue = riskAdj.map((v, i) => round1(v - costToGet[i]));
  const totalClaimed = round1(sum(value));
  const totalAdj = round1(sum(riskAdj));
  const totalNet = round1(sum(netValue));
  const best = netValue.indexOf(Math.max(...netValue));
  const worst = netValue.indexOf(Math.min(...netValue));

  return {
    title: `Realising post-merger synergies — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} has just closed a merger and promised investors ${money(totalClaimed)}/year of synergies. Six months in, very little value has actually landed and leadership needs a credible execution plan. Each synergy bucket carries a different certainty level and cost to capture.`,
      'Hint: multiply each promised value by its certainty to get the risk-adjusted value, then subtract the cost to capture — that number is the real value.',
      'Extra twist: the largest synergy bucket depends on merging two sales teams with very different cultures and incentive schemes, and attrition in the acquired team has doubled since the deal was announced.',
    ),
    key_question: `Which synergies are genuinely achievable, and in what order should ${c.company} pursue them over the next 24 months?`,
    data_exhibits: [
      table(
        'The four promised synergy buckets (billion VND/year)',
        ['Synergy bucket', 'Promised value', 'Time to capture (months)', 'Certainty (%)', 'Cost to capture', 'Risk-adjusted net value'],
        buckets.map((b, i) => [b, value[i], monthsTo[i], certainty[i], costToGet[i], netValue[i]]),
      ),
      chart('bar', 'Risk-adjusted net value by bucket', buckets, netValue, 'billion VND/year'),
    ],
    framework_hints: ['Post-Merger Integration', 'Cost-Benefit Analysis', "McKinsey 7-S Framework"],
    model_answer: ma(
      `The ${money(totalClaimed)} promised to investors is a nominal number. Adjusted for certainty it becomes ${money(totalAdj)}; after subtracting capture costs, net value is only ${money(totalNet)} — about ${pct((totalNet / totalClaimed) * 100)} of what was promised. Step one is resetting expectations to reality before any plan is discussed.`,
      'A post-merger integration frame: rank each bucket by risk-adjusted value minus capture cost, then sequence by speed to capture. Use McKinsey 7-S to spot the soft barriers — where most synergies die.',
      fnd(diff, [
        `${buckets[best]} has the highest net value: ${money(netValue[best])}/year, achievable within ${monthsTo[best]} months.`,
        `${buckets[worst]} has the lowest net value (${money(netValue[worst])}/year) — its ${money(costToGet[worst])} capture cost eats nearly all the value.`,
        `Cross-selling carries the biggest promise (${money(value[2])}) but only ${certainty[2]}% certainty and a ${monthsTo[2]}-month timeline — the single largest risk in the whole plan.`,
        `Cost synergies (procurement, overhead) are far more certain (${certainty[0]}% and ${certainty[3]}%) than revenue synergies (${certainty[2]}%) — a pattern that repeats across most deals.`,
        `Doubled attrition in the sales team is an early warning: if the people leave, the ${money(value[2])} bucket will never materialise no matter how good the plan is.`,
      ]),
      `Execute ${buckets[best]} and the cost buckets first — they are certain, fast, and build the credibility the rest of the integration needs. For cross-selling, add no further resources until the people problem is fixed: align incentive schemes, retain the key salespeople, and make customer-relationship ownership explicit. At the same time, proactively re-guide investors to the ${money(totalNet)} level — losing credibility from a missed promise costs far more than an early correction.`,
    ),
    tags: ['mna', 'integration', 'synergy', c.industry],
  };
};

/* ==========================================================================
 * OTHER (2 cases — 2 templates)
 * ======================================================================== */

const otherPricing: Builder = (c, k, diff) => {
  const points = ['Cut 10%', 'Hold', 'Raise 8%', 'Raise 15%'];
  const price = [round1(90 + k * 4), round1(100 + k * 4), round1(108 + k * 5), round1(115 + k * 5)];
  const vol = [round1(14.2 + k), round1(12.0 + k * 0.85), round1(10.3 + k * 0.7), round1(8.8 + k * 0.6)];
  const unitCost = round1(62 + k * 3);
  const revenue = price.map((p, i) => round1((p * vol[i]) / 100));
  const cm = price.map((p) => round1(p - unitCost));
  const profit = cm.map((m, i) => round1((m * vol[i]) / 100));
  const best = profit.indexOf(Math.max(...profit));
  const bestRev = revenue.indexOf(Math.max(...revenue));
  const elasticity = round1(((vol[2] - vol[1]) / vol[1]) / ((price[2] - price[1]) / price[1]));
  const volDrop = Math.abs(((vol[2] - vol[1]) / vol[1]) * 100);

  return {
    title: `Repricing and demand elasticity — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} has not adjusted ${c.product} prices in two years despite rising costs. Market research has just completed a price-sensitivity study and built four scenarios. Unit variable cost is currently ${n(unitCost)} (same index units as price).`,
      'Hint: compute contribution profit for each scenario — the highest-revenue scenario is usually not the most profitable one.',
      'Extra twist: the largest customer accounts for 22% of volume and holds a contract clause allowing it to walk if prices rise more than 10%. Weigh that constraint before recommending.',
    ),
    key_question: `Which price scenario should ${c.company} choose to maximise profit, and which accompanying risks must be managed?`,
    data_exhibits: [
      table(
        'Four price scenarios and projected volumes',
        ['Scenario', 'Price (index)', 'Volume (million units)', 'Revenue', 'Unit contribution margin', 'Contribution profit'],
        points.map((p, i) => [p, price[i], vol[i], revenue[i], cm[i], profit[i]]),
        `Unit variable cost: ${n(unitCost)} (index).`,
      ),
      chart('line', 'Contribution profit by price scenario', points, profit, 'index'),
    ],
    framework_hints: ['Pricing Strategies', 'Profitability Framework (contribution margin)', 'Market Sizing'],
    model_answer: ma(
      `Revenue and profit peak in different scenarios: revenue is highest at "${points[bestRev]}", while profit is highest at "${points[best]}" with ${n(profit[best])}. That is the classic trap of setting targets on revenue.`,
      'Pricing Strategies grounded in demand elasticity, combined with contribution-margin analysis: at each price, profit = (price − variable cost) × volume.',
      fnd(diff, [
        `"${points[best]}" maximises profit at ${n(profit[best])}, beating the hold-price option by ${n(round1(profit[best] - profit[1]))}.`,
        `Estimated demand elasticity is about ${n(elasticity, 2)} — demand is inelastic, so a price rise loses less volume than the extra margin it gains.`,
        `The 10% cut is the worst option: revenue of ${n(revenue[0])} looks attractive but profit is only ${n(profit[0])} because unit contribution margin drops to ${n(cm[0])}.`,
        `Unit contribution margin differs by ${n(round1(cm[3] - cm[0]))} between the highest and lowest scenarios — with variable cost at ${n(unitCost)}, every price point moves profit sharply.`,
        `The contract clause changes the advice: the customer holding 22% of volume can walk if prices rise more than 10%, so the 15% scenario risks losing a fifth of volume — a risk the table doesn't show.`,
      ]),
      `Choose the 8% increase — it stays under the large customer's 10% contract threshold, exploits the inelastic demand, and improves profit by ${n(round1(profit[2] - profit[1]))} versus holding. Communicate the change 60 days ahead with a clear input-cost rationale, and consider a bespoke long-term contract price to retain the large customer. Track volume monthly through the first quarter: if it falls more than the forecast ${pct(volDrop)}, pause and reassess before planning the next increase.`,
    ),
    tags: ['pricing', 'elasticity', 'profitability', c.industry],
  };
};

const otherOrg: Builder = (c, k, diff) => {
  const functions = ['Front-line advisory team', 'Technical specialists', 'Operations support', 'Management & coordination'];
  const heads = [148 + k * 12, 62 + k * 6, 94 + k * 8, 38 + k * 3];
  const cost = heads.map((h, i) => round1((h * [38, 52, 21, 68][i]) / 1000));
  const billable = [72, 64, 0, 18].map((x) => Math.max(0, x - (k % 5)));
  const revenue = heads.map((h, i) => round1((h * billable[i] * 2.4) / 1000));
  const totalHeads = sum(heads);
  const totalCost = round1(sum(cost));
  const totalRev = round1(sum(revenue));
  const margin = ((totalRev - totalCost) / totalRev) * 100;
  const spanOfControl = round1((totalHeads - heads[3]) / heads[3]);
  const overheadShare = ((cost[2] + cost[3]) / totalCost) * 100;
  const revPerBillablePoint = round1(revenue[0] / billable[0]);

  return {
    title: `Restructuring the staffing model — ${c.company}`,
    difficulty: diff,
    situation: sit(
      diff,
      `${c.company} is growing ${c.product} revenue well, but margins keep thinning because staff costs are rising faster. The organisation has ${n(totalHeads)} people, with a growing share not directly generating revenue. Costs and revenue are in billion VND/year.`,
      'Hint: split staff into revenue-generating and support groups, then compute each group’s share of cost.',
      'Extra twist: the front-line team’s billable-hours ratio has dropped 6 percentage points in two years, and managers say the cause is growing internal admin work, not a lack of client work.',
    ),
    key_question: `How should ${c.company} restructure the organisation to restore margins without weakening client-serving capacity?`,
    data_exhibits: [
      table(
        'Staffing structure by function',
        ['Function', 'Headcount', 'Cost (billion VND/year)', 'Billable hours (%)', 'Revenue generated (billion VND/year)'],
        functions.map((f, i) => [f, heads[i], cost[i], billable[i], revenue[i]]),
      ),
      chart('bar', 'Staff cost by function', functions, cost, 'billion VND/year'),
    ],
    framework_hints: ["McKinsey 7-S Framework", 'Value Chain Analysis', 'Profitability Framework'],
    model_answer: ma(
      `The current margin is ${pct(margin)} on revenue of ${money(totalRev)}. The problem is not pay levels but structure: non-revenue-generating groups absorb ${pct(overheadShare)} of total staff cost, and even the front-line team's billable ratio is falling.`,
      'McKinsey 7-S to distinguish a structure problem (Structure — span of control, support-to-front-line ratio) from a systems problem (Systems — admin processes eroding billable hours), avoiding the reflex of mechanical headcount cuts.',
      fnd(diff, [
        `Support and management overhead absorbs ${pct(overheadShare)} of total staff cost — high against the ${c.industryLabel} benchmark.`,
        `The current span of control is ${n(spanOfControl, 1)} people per manager; widening it to 8 would remove roughly ${n(round1(heads[3] - (totalHeads - heads[3]) / 8))} management positions.`,
        `The front line bills only ${billable[0]}% of hours — each additional percentage point is worth about ${money(revPerBillablePoint)} of revenue without hiring anyone.`,
        `Recovering the 6 lost percentage points of billable time would add about ${money(round1(revPerBillablePoint * 6))} of revenue — more than the savings from cutting support staff.`,
        `That points to a systems root cause, not a headcount one: the admin burden is turning the most expensive people into the least productive ones.`,
      ]),
      `Don't start with cuts. Attack the lost billable hours first: automate internal reporting, centralise admin into the support function, and drop meetings that create no value — recovering the 6 lost points alone is worth about ${money(round1(revPerBillablePoint * 6))}, more than any downsizing option. In parallel, widen spans of control naturally through growth rather than layoffs: hold the number of managers flat while the front line grows. Only consider cuts after both levers are exhausted.`,
    ),
    tags: ['organization', 'productivity', 'cost-structure', c.industry],
  };
};

/* ==========================================================================
 * Assembling the library — industry, type, and difficulty mix per the brief (scale of 50)
 * ======================================================================== */

const TYPE_PLAN: Array<[string, number]> = [
  ['profitability', 25],
  ['growth', 25],
  ['operations', 20],
  ['strategy', 15],
  ['mna', 10],
  ['other', 5],
];

const DIFF_PLAN: Record<string, [number, number, number]> = {
  profitability: [5, 13, 7],
  growth: [5, 12, 8],
  operations: [4, 10, 6],
  strategy: [3, 8, 4],
  mna: [2, 5, 3],
  other: [1, 2, 2],
};

/** Industry × case-type matrix: row and column totals both match the brief. */
const INDUSTRY_MATRIX: Array<[string, Record<string, number>]> = [
  ['fmcg', { profitability: 6, growth: 6, operations: 4, strategy: 3, mna: 1, other: 0 }],
  ['banking', { profitability: 4, growth: 4, operations: 3, strategy: 2, mna: 2, other: 0 }],
  ['retail', { profitability: 4, growth: 3, operations: 3, strategy: 2, mna: 1, other: 2 }],
  ['tech', { profitability: 4, growth: 4, operations: 2, strategy: 3, mna: 2, other: 0 }],
  ['healthcare', { profitability: 2, growth: 3, operations: 2, strategy: 1, mna: 1, other: 1 }],
  ['logistics', { profitability: 3, growth: 2, operations: 3, strategy: 1, mna: 1, other: 0 }],
  ['real-estate', { profitability: 2, growth: 2, operations: 2, strategy: 1, mna: 1, other: 0 }],
  ['consulting', { profitability: 0, growth: 1, operations: 1, strategy: 2, mna: 1, other: 2 }],
];

const BUILDERS: Record<string, Builder[]> = {
  profitability: [profMarginSqueeze, profSegment, profChannel, profUnitEconomics, profCostShock],
  growth: [growthMarketEntry, growthNewSegment, growthChannelExpansion, growthProductLaunch, growthGeoExpansion],
  operations: [opsBottleneck, opsNetwork, opsService, opsWorkforce],
  strategy: [stratCompetitiveResponse, stratPortfolio, stratDigital],
  mna: [mnaTargetValuation, mnaSynergy],
  other: [otherPricing, otherOrg],
};

function buildLibrary(): FullCase[] {
  const out: FullCase[] = [];
  // The company cursor advances continuously per industry across all case types,
  // so two cases in the same industry rarely share both template and company.
  const companyCursor = new Map<string, number>();
  // Count how many times each template is used, so every use gets a different
  // build parameter.
  const builderUse = new Map<string, number>();

  TYPE_PLAN.forEach(([kind, count]) => {
    const [easy, medium, hard] = DIFF_PLAN[kind];
    const diffs = spread<CaseDifficulty>(
      (new Array(easy).fill('easy') as CaseDifficulty[])
        .concat(new Array(medium).fill('medium'))
        .concat(new Array(hard).fill('hard')),
      3,
    );
    const builders = BUILDERS[kind];

    let indexInType = 0;
    INDUSTRY_MATRIX.forEach(([industry, plan]) => {
      const take = plan[kind] || 0;
      const pack = INDUSTRIES[industry];
      for (let i = 0; i < take; i += 1) {
        const cursor = companyCursor.get(industry) || 0;
        companyCursor.set(industry, cursor + 1);
        const [company, product, where] = pack.companies[cursor % pack.companies.length];
        const ctx: Ctx = {
          industry,
          industryLabel: pack.label,
          company,
          product,
          where,
          segments: pack.segments,
          channels: pack.channels,
        };
        const builderIndex = indexInType % builders.length;
        const builder = builders[builderIndex];
        // The build parameter counts per template (0, 1, 2, …) rather than using
        // the company cursor. That way two cases from the same template never
        // share a data set — even across different industries — and the
        // parameter stays in the small range where every template's revenue
        // scale, margins, and valuation multiples remain sensible.
        const useKey = `${kind}:${builderIndex}`;
        const variant = builderUse.get(useKey) || 0;
        builderUse.set(useKey, variant + 1);
        const built = builder(ctx, variant, diffs[indexInType]);
        out.push({
          id: `case-${String(out.length + 1).padStart(3, '0')}`,
          industry,
          type: kind,
          ...built,
        });
        indexInType += 1;
      }
    });
  });

  return out;
}

export const CASE_POOL_LIBRARY: FullCase[] = buildLibrary();

export const POOL_TYPES: string[] = TYPE_PLAN.map(([kind]) => kind);

export const POOL_INDUSTRIES: string[] = INDUSTRY_MATRIX.map(([industry]) => industry);

/* --------------------------------------------------------------------------
 * Instant case draw + "Recommended for you" suggestions
 * ------------------------------------------------------------------------ */

export interface PoolFilters {
  difficulty?: CaseDifficulty | 'all';
  type?: string | 'all';
  industry?: string | 'all';
  excludeIds?: string[];
}

/** Draw a random case — synchronous, no AI call, under a millisecond. */
export function pickRandomPoolCase(filters: PoolFilters = {}): FullCase | null {
  const matches = (p: FullCase) =>
    (!filters.difficulty || filters.difficulty === 'all' || p.difficulty === filters.difficulty) &&
    (!filters.type || filters.type === 'all' || p.type === filters.type) &&
    (!filters.industry || filters.industry === 'all' || p.industry === filters.industry);
  const exclude = new Set(filters.excludeIds || []);
  let pool = CASE_POOL_LIBRARY.filter((p) => matches(p) && !exclude.has(p.id));
  // If everything in the filter has been practised, drop the exclusion rather than returning empty.
  if (pool.length === 0) pool = CASE_POOL_LIBRARY.filter(matches);
  if (pool.length === 0) pool = CASE_POOL_LIBRARY;
  return pool[Math.floor(Math.random() * pool.length)] || null;
}

export interface PoolHistoryRecord {
  case_id?: string | null;
  case_type?: string | null;
  industry?: string | null;
  difficulty?: string | null;
}

/**
 * "Recommended for you": prioritise the industries and case types the user has
 * practised least. No history → a starter set of 1 easy (FMCG profitability) ·
 * 1 medium (banking growth) · 1 hard (strategy), per the brief.
 */
export function recommendPoolCases(history: PoolHistoryRecord[], count = 3): FullCase[] {
  const done = new Set(history.map((h) => String(h.case_id || '')).filter(Boolean));
  const fresh = CASE_POOL_LIBRARY.filter((p) => !done.has(p.id));
  const source = fresh.length >= count ? fresh : CASE_POOL_LIBRARY;

  if (history.length === 0) {
    const starters: Array<[string, string, CaseDifficulty]> = [
      ['fmcg', 'profitability', 'easy'],
      ['banking', 'growth', 'medium'],
      ['', 'strategy', 'hard'],
    ];
    const picks: FullCase[] = [];
    starters.forEach(([industry, type, difficulty]) => {
      const exact = source.find(
        (p) =>
          !picks.includes(p) &&
          p.type === type &&
          p.difficulty === difficulty &&
          (!industry || p.industry === industry),
      );
      const relaxed = exact || source.find((p) => !picks.includes(p) && p.type === type && p.difficulty === difficulty);
      const loose = relaxed || source.find((p) => !picks.includes(p) && p.difficulty === difficulty);
      if (loose) picks.push(loose);
    });
    return picks.slice(0, count);
  }

  const typeCount = new Map<string, number>();
  const industryCount = new Map<string, number>();
  POOL_TYPES.forEach((t) => typeCount.set(t, 0));
  POOL_INDUSTRIES.forEach((i) => industryCount.set(i, 0));
  history.forEach((h) => {
    const t = String(h.case_type || '');
    const i = String(h.industry || '');
    if (typeCount.has(t)) typeCount.set(t, (typeCount.get(t) || 0) + 1);
    if (industryCount.has(i)) industryCount.set(i, (industryCount.get(i) || 0) + 1);
  });
  const maxType = Math.max(1, ...Array.from(typeCount.values()));
  const maxIndustry = Math.max(1, ...Array.from(industryCount.values()));

  const scored = source
    .map((p) => ({
      item: p,
      // High score = little practice = suggest first. Industry and type weigh equally.
      score:
        (1 - (typeCount.get(p.type) || 0) / maxType) + (1 - (industryCount.get(p.industry) || 0) / maxIndustry),
    }))
    .sort((a, b) => b.score - a.score);

  // Round 1 keeps the three suggestions distinct in BOTH type and industry, so
  // the user doesn't get three cases from one industry just because it's unpractised.
  const picks: FullCase[] = [];
  const seenTypes = new Set<string>();
  const seenIndustries = new Set<string>();
  scored.forEach((entry) => {
    if (picks.length >= count) return;
    if (seenTypes.has(entry.item.type) || seenIndustries.has(entry.item.industry)) return;
    seenTypes.add(entry.item.type);
    seenIndustries.add(entry.item.industry);
    picks.push(entry.item);
  });
  scored.forEach((entry) => {
    if (picks.length >= count || picks.includes(entry.item) || seenTypes.has(entry.item.type)) return;
    seenTypes.add(entry.item.type);
    picks.push(entry.item);
  });
  scored.forEach((entry) => {
    if (picks.length < count && !picks.includes(entry.item)) picks.push(entry.item);
  });
  return picks.slice(0, count);
}

export function poolRecommendationReason(history: PoolHistoryRecord[], item: FullCase): string {
  if (history.length === 0) return 'A balanced starter set — begin here';
  const sameType = history.filter((h) => h.case_type === item.type).length;
  const sameIndustry = history.filter((h) => h.industry === item.industry).length;
  if (sameIndustry === 0) return `You haven't practised the ${POOL_INDUSTRY_LABELS[item.industry] || item.industry} industry yet`;
  if (sameType === 0) return `You haven't practised ${POOL_TYPE_LABELS[item.type] || item.type} cases yet`;
  return `You've practised ${POOL_TYPE_LABELS[item.type] || item.type} only ${sameType} ${sameType === 1 ? 'time' : 'times'}`;
}
