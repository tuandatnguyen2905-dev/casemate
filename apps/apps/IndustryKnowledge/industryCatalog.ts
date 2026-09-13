// Casemate Domain Knowledge — nine-industry catalog and deep-article taxonomy.
// The app id remains `industry-knowledge`; only the customer-facing name changed.

export interface IndustryProgramLink {
  id: string;
  company: string;
  program: string;
}

export interface IndustryCatalogEntry {
  id: string;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: string;
  programs: IndustryProgramLink[];
  alsoKnownFor: string[];
  matchCompanies: string[];
  matchHints: string[];
  searchQueries: string[];
  productAngles: string[];
}

export const INDUSTRY_CATALOG: IndustryCatalogEntry[] = [
  {
    id: 'fmcg',
    label: 'FMCG (Fast Moving Consumer Goods)',
    shortLabel: 'FMCG',
    tagline: 'Consumer demand, route to market and high-velocity brand economics',
    icon: 'ShoppingCart',
    programs: [
      { id: 'unilever-uflp', company: 'Unilever Vietnam', program: 'Unilever Future Leaders Programme' },
      { id: 'nestle-sparkthenext-2026', company: 'Nestlé Vietnam', program: 'Nestlé #SparkTheNext Leaders' },
      { id: 'suntory-pepsico-mt', company: 'Suntory PepsiCo Vietnam', program: 'Management Trainee' },
    ],
    alsoKnownFor: ['Vinamilk', 'Masan Consumer', 'P&G Vietnam', 'HEINEKEN Vietnam'],
    matchCompanies: ['unilever', 'nestlé', 'nestle', 'pepsico', 'p&g', 'vinamilk', 'masan', 'heineken', 'carlsberg', 'loreal', "l'oréal"],
    matchHints: ['fmcg', 'consumer goods', 'food', 'beverage', 'beauty', 'home care'],
    searchQueries: ['Vietnam FMCG market route to market 2025', 'Vietnam general trade modern trade consumer goods'],
    productAngles: ['Price-pack architecture', 'General trade versus modern trade', 'Brand and distributor economics'],
  },
  {
    id: 'banking',
    label: 'Banking & Financial Services',
    shortLabel: 'Banking',
    tagline: 'Balance-sheet economics, risk and Vietnam’s mobile-first financial transformation',
    icon: 'Landmark',
    programs: [
      { id: 'techcombank-futuregen-2027', company: 'Techcombank', program: 'Future Gen' },
      { id: 'uob-vietnam-ma', company: 'UOB Vietnam', program: 'Management Associate' },
    ],
    alsoKnownFor: ['Vietcombank', 'VPBank', 'MB Bank', 'MoMo', 'ZaloPay'],
    matchCompanies: ['techcombank', 'uob', 'vietcombank', 'vpbank', 'mb bank', 'momo', 'zalopay', 'vnpay', 'home credit'],
    matchHints: ['banking', 'financial services', 'finance', 'fintech', 'consumer finance'],
    searchQueries: ['Vietnam banking SBV Basel III digital banking', 'Vietnam fintech payments banking transformation'],
    productAngles: ['CASA and net interest margin', 'Underwriting and credit risk', 'Digital banking and payments'],
  },
  {
    id: 'tech',
    label: 'Technology & Digital',
    shortLabel: 'Technology',
    tagline: 'Products, platforms, data and unit economics in Vietnam’s digital ecosystem',
    icon: 'Cpu',
    programs: [
      { id: 'shopee-monee-gdp', company: 'Shopee & Monee', program: 'Global Development Program' },
      { id: 'viettel-future-changemakers', company: 'Viettel', program: 'Future Changemakers' },
      { id: 'momo-talent-2026', company: 'MoMo', program: 'MoMo Talent' },
    ],
    alsoKnownFor: ['FPT', 'VNG', 'VNPay', 'Grab', 'TikTok Shop'],
    matchCompanies: ['shopee', 'monee', 'viettel', 'fpt', 'vng', 'grab', 'tiktok', 'lazada'],
    matchHints: ['technology', 'tech', 'digital', 'e-commerce', 'ecommerce', 'platform', 'software', 'gaming', 'saas', 'edtech'],
    searchQueries: ['Vietnam digital economy technology ecosystem', 'Vietnam startups ecommerce fintech SaaS'],
    productAngles: ['Product-market fit', 'Growth loops and retention', 'Marketplace and SaaS unit economics'],
  },
  {
    id: 'retail',
    label: 'Retail',
    shortLabel: 'Retail',
    tagline: 'Store economics, category management and omnichannel execution',
    icon: 'Store',
    programs: [
      { id: 'central-retail-ma-2026', company: 'Central Retail Vietnam', program: 'Management Associate' },
    ],
    alsoKnownFor: ['WinCommerce', 'Saigon Co.op', 'AEON Vietnam', 'LOTTE Mart'],
    matchCompanies: ['central retail', 'wincommerce', 'winmart', 'saigon co.op', 'aeon', 'lotte'],
    matchHints: ['retail', 'supermarket', 'convenience store', 'merchandising'],
    searchQueries: ['Vietnam retail market modern trade penetration', 'Vietnam supermarket ecommerce omnichannel'],
    productAngles: ['Store-level P&L', 'Category and shelf economics', 'Omnichannel inventory'],
  },
  {
    id: 'industrial-manufacturing',
    label: 'Industrial & Manufacturing',
    shortLabel: 'Manufacturing',
    tagline: 'Vietnam’s export factories, lean operations and resilient supply networks',
    icon: 'Building2',
    programs: [],
    alsoKnownFor: ['Samsung Vietnam', 'Intel Products Vietnam', 'LG', 'Foxconn'],
    matchCompanies: ['samsung', 'intel', 'lg ', 'foxconn', 'bosch', 'siemens', 'schneider', 'ge vernova'],
    matchHints: ['industrial', 'manufacturing', 'electronics', 'factory', 'engineering', 'energy equipment'],
    searchQueries: ['Vietnam manufacturing FDI China plus one', 'Vietnam electronics manufacturing supply chain'],
    productAngles: ['Capacity and bottlenecks', 'Lean and OEE', 'Supplier resilience and localization'],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    shortLabel: 'Consulting',
    tagline: 'Hypothesis-led problem solving, transformation delivery and trusted advice',
    icon: 'Briefcase',
    programs: [],
    alsoKnownFor: ['McKinsey & Company', 'Boston Consulting Group', 'Bain & Company', 'Deloitte', 'Accenture'],
    matchCompanies: ['mckinsey', 'bcg', 'boston consulting', 'bain', 'deloitte', 'accenture', 'pwc', 'ey', 'kpmg'],
    matchHints: ['consulting', 'strategy consulting', 'management consulting', 'financial advisory', 'technology consulting'],
    searchQueries: ['Vietnam consulting market strategy digital transformation', 'Vietnam consulting graduate careers case interviews'],
    productAngles: ['Hypothesis-led problem solving', 'Transformation delivery', 'Client and project economics'],
  },
  {
    id: 'basic-economics',
    label: 'Basic Economics',
    shortLabel: 'Economics',
    tagline: 'Microeconomics, macroeconomics, and 43 problem-solving toolkits for complete beginners',
    icon: 'Landmark',
    programs: [],
    alsoKnownFor: ['Microeconomics', 'Macroeconomics', 'Consulting Toolkits'],
    matchCompanies: [],
    matchHints: ['economics', 'microeconomics', 'macroeconomics', 'business fundamentals'],
    searchQueries: [],
    productAngles: ['Microeconomics', 'Macroeconomics', '43 Consulting Toolkits'],
  },
  {
    id: 'logistics',
    label: 'Logistics & Supply Chain',
    shortLabel: 'Logistics',
    tagline: 'Freight, fulfillment and the networks behind Vietnam’s trade economy',
    icon: 'Truck',
    programs: [
      { id: 'expeditors-mt', company: 'Expeditors Vietnam', program: 'Management Trainee' },
    ],
    alsoKnownFor: ['Maersk', 'DHL', 'Gemadept', 'Viettel Post', 'GHN'],
    matchCompanies: ['expeditors', 'maersk', 'dhl', 'gemadept', 'viettel post', 'ghn', 'giao hang'],
    matchHints: ['logistics', 'supply chain', 'freight', 'shipping', 'delivery'],
    searchQueries: ['Vietnam logistics market ecommerce last mile', 'Vietnam freight forwarding supply chain'],
    productAngles: ['Freight forwarding', 'Network and warehouse economics', 'Last-mile density'],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    shortLabel: 'Insurance',
    tagline: 'Protection, distribution and long-duration risk economics',
    icon: 'ShieldCheck',
    programs: [
      { id: 'prudential-strivers-2025', company: 'Prudential Vietnam', program: 'The Strivers' },
    ],
    alsoKnownFor: ['Bao Viet', 'Manulife Vietnam', 'AIA Vietnam', 'Dai-ichi Life'],
    matchCompanies: ['prudential', 'bao viet', 'manulife', 'aia', 'dai-ichi', 'pvi'],
    matchHints: ['insurance', 'life insurance', 'non-life', 'actuarial'],
    searchQueries: ['Vietnam insurance penetration bancassurance', 'Vietnam life non-life insurance market'],
    productAngles: ['Pricing and reserves', 'Agency and bancassurance', 'Persistency and claims'],
  },
  {
    id: 'tobacco',
    label: 'Tobacco & NGP',
    shortLabel: 'Tobacco & NGP',
    tagline: 'A mature regulated category shaped by excise, compliance and public health',
    icon: 'HeartPulse',
    programs: [],
    alsoKnownFor: ['Vinataba', 'British American Tobacco', 'Japan Tobacco International'],
    matchCompanies: ['vinataba', 'british american tobacco', 'bat vietnam', 'japan tobacco', 'jti'],
    matchHints: ['tobacco', 'cigarette'],
    searchQueries: ['Vietnam tobacco market regulation BAT JTI', 'Vietnam heated tobacco e-cigarette ban 2025'],
    productAngles: ['Excise and portfolio economics', 'Regulated route to market', 'Compliance and illicit trade'],
  },
];

export const INDUSTRY_IDS = INDUSTRY_CATALOG.map((entry) => entry.id);

export interface IndustryTopic {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  blurb: string;
  titleTemplate: string;
  queryTemplates: string[];
}

export const INDUSTRY_TOPICS: IndustryTopic[] = [
  {
    id: 'domain_overview',
    label: 'Complete domain briefing',
    shortLabel: 'Deep dive',
    icon: 'BookOpen',
    blurb: 'Market structure, opportunities, MT functions, recruiter skills, interview cases and Casemate’s insider take — in one Vietnam-specific guide.',
    titleTemplate: 'Domain Knowledge: {industry}',
    queryTemplates: [
      '{industry} Vietnam market overview growth regulation 2025',
      '{industry} Vietnam management trainee functions skills interview cases',
    ],
  },
];

export const TOPIC_IDS = INDUSTRY_TOPICS.map((topic) => topic.id);

export function topicById(topicId: string | null | undefined): IndustryTopic | null {
  const id = String(topicId || '').toLowerCase().trim();
  return INDUSTRY_TOPICS.find((topic) => topic.id === id) || null;
}

export function defaultArticleTitle(topic: IndustryTopic, entry: IndustryCatalogEntry): string {
  return topic.titleTemplate.replace('{industry}', entry.shortLabel);
}

function normalize(text: unknown): string {
  return String(text || '').toLowerCase();
}

export function matchedIndustryIds(direction: Record<string, any> | null | undefined): string[] {
  if (!direction || typeof direction !== 'object') return [];
  const ordered: string[] = [];
  const push = (id: string) => {
    if (id && !ordered.includes(id)) ordered.push(id);
  };

  const programs = Array.isArray(direction.programs) ? direction.programs : [];
  for (const program of programs) {
    const company = normalize(program?.company);
    const industryLabel = normalize(program?.industry);
    for (const entry of INDUSTRY_CATALOG) {
      if (
        entry.matchCompanies.some((hint) => company.includes(hint)) ||
        entry.matchHints.some((hint) => industryLabel.includes(hint))
      ) push(entry.id);
    }
  }

  const industryFit = Array.isArray(direction.industry_fit) ? direction.industry_fit : [];
  for (const fit of industryFit) {
    const name = normalize(fit?.name);
    for (const entry of INDUSTRY_CATALOG) {
      if (entry.matchHints.some((hint) => name.includes(hint))) push(entry.id);
    }
  }
  return ordered;
}

export function matchedProgramsForIndustry(
  entry: IndustryCatalogEntry,
  direction: Record<string, any> | null | undefined,
): Array<{ company: string; program: string; rank?: number }> {
  const programs = Array.isArray(direction?.programs) ? (direction as any).programs : [];
  const matches: Array<{ company: string; program: string; rank?: number }> = [];
  for (const program of programs) {
    const company = normalize(program?.company);
    const industryLabel = normalize(program?.industry);
    const hit =
      entry.matchCompanies.some((hint) => company.includes(hint)) ||
      entry.matchHints.some((hint) => industryLabel.includes(hint));
    if (hit) {
      matches.push({
        company: String(program?.company || ''),
        program: String(program?.program || ''),
        rank: Number.isFinite(Number(program?.rank)) ? Number(program.rank) : undefined,
      });
    }
  }
  return matches;
}
