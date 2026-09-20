import type { LearningCard } from './learningDecks';
import type { TopicGroupId } from './topicGroups';

export type PillarId =
  | 'supply-chain'
  | 'rnd-product'
  | 'finance'
  | 'marketing-sales'
  | 'people-career'
  | 'surprising';

export interface PillarDefinition {
  id: PillarId;
  label: string;
  icon: string;
  description: string;
}

export const KNOWLEDGE_PILLARS: PillarDefinition[] = [
  { id: 'supply-chain', label: 'Supply Chain & Operations', icon: 'Factory', description: 'Operating model, sourcing, capacity, delivery and process performance.' },
  { id: 'rnd-product', label: 'R&D & Product', icon: 'FlaskConical', description: 'Product design, technology, quality, innovation and the customer proposition.' },
  { id: 'finance', label: 'Finance & Investment', icon: 'Banknote', description: 'Revenue, cost, capital, risk, returns and the metrics leaders manage.' },
  { id: 'marketing-sales', label: 'Marketing & Sales', icon: 'Target', description: 'Customers, channels, pricing, go-to-market and commercial execution.' },
  { id: 'people-career', label: 'People & Career', icon: 'Users', description: 'Organization, roles, capabilities, career paths and interview expectations.' },
  { id: 'surprising', label: 'Surprising Insights', icon: 'Zap', description: 'Counterintuitive dynamics, hidden trade-offs and interview-grade insights.' },
];

export interface IndustrySubcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  signals: string[];
}

const subcategory = (
  id: string,
  name: string,
  description: string,
  icon: string,
  signals: string[],
): IndustrySubcategory => ({ id, name, description, icon, signals });

export const INDUSTRY_SUBCATEGORIES: Record<string, IndustrySubcategory[]> = {
  banking: [
    subcategory('commercial-banking', 'Commercial Banking', 'Retail lending, deposits, credit cards and SME banking.', 'Landmark', ['retail banking', 'commercial banking', 'deposit', 'casa', 'credit card', 'mortgage', 'consumer lending', 'sme', 'branch', 'loan']),
    subcategory('investment-banking', 'Investment Banking', 'M&A advisory, IPO underwriting and capital markets.', 'Banknote', ['investment banking', 'm&a', 'merger', 'acquisition', 'ipo', 'underwriting', 'capital market', 'advisory', 'deal', 'valuation']),
    subcategory('private-equity-venture-capital', 'Private Equity & Venture Capital', 'Deal sourcing, fund structures and portfolio management.', 'Briefcase', ['private equity', 'venture capital', 'fund', 'deal sourcing', 'portfolio company', 'term sheet', 'exit', 'carried interest', 'due diligence']),
    subcategory('asset-management-securities', 'Asset Management & Securities', 'Fund management, portfolio construction and brokerage.', 'Target', ['asset management', 'securities', 'brokerage', 'portfolio', 'fund management', 'exchange', 'equity', 'bond', 'wealth']),
    subcategory('banking-insurance', 'Insurance', 'Life, general insurance and bancassurance within financial services.', 'ShieldCheck', ['insurance', 'life insurance', 'general insurance', 'bancassurance', 'premium', 'claims', 'underwriting', 'policy']),
    subcategory('banking-fintech', 'Fintech', 'Digital banking, payment gateways, lending platforms and neobanks.', 'Cpu', ['fintech', 'digital banking', 'payment', 'wallet', 'gateway', 'neobank', 'embedded finance', 'platform lending', 'mobile banking']),
  ],
  tech: [
    subcategory('telecom-industry', 'Telecom Industry', 'Mobile operators, network infrastructure, spectrum and 5G.', 'Cpu', ['telecom', 'mobile operator', 'network', 'spectrum', '5g', 'subscriber', 'tower', 'arpu']),
    subcategory('ai-machine-learning', 'Artificial Intelligence & Machine Learning', 'Model development, MLOps and applied AI products.', 'Sparkles', ['artificial intelligence', 'machine learning', 'ai ', 'model', 'mlops', 'inference', 'training data', 'algorithm']),
    subcategory('semiconductor-hardware', 'Semiconductor & Hardware', 'Chip design, fabrication and the hardware supply chain.', 'Cpu', ['semiconductor', 'chip', 'fabrication', 'fab', 'hardware', 'wafer', 'packaging', 'yield', 'foundry']),
    subcategory('software-saas', 'Software & SaaS', 'Product development, ARR/MRR and SaaS go-to-market.', 'Layers3', ['software', 'saas', 'arr', 'mrr', 'subscription', 'cloud', 'developer', 'product-led', 'churn']),
    subcategory('blockchain-web3', 'Blockchain & Web3', 'DeFi, NFTs, smart contracts and tokenomics.', 'Globe2', ['blockchain', 'web3', 'defi', 'nft', 'smart contract', 'token', 'crypto', 'distributed ledger']),
    subcategory('gaming-interactive-entertainment', 'Gaming & Interactive Entertainment', 'Game development, monetization and esports.', 'Zap', ['gaming', 'game', 'esports', 'free-to-play', 'in-app purchase', 'player', 'studio', 'live ops']),
    subcategory('ecommerce-technology', 'Ecommerce Technology', 'Platform, logistics and payment technology for digital commerce.', 'Store', ['ecommerce', 'e-commerce', 'marketplace', 'seller', 'fulfilment', 'fulfillment', 'checkout', 'merchant', 'gmv']),
  ],
  retail: [
    subcategory('hypermarket-supermarket', 'Hypermarket & Supermarket', 'Format economics, category management and shrinkage.', 'Store', ['hypermarket', 'supermarket', 'category management', 'shelf', 'shrinkage', 'central retail', 'winmart', 'modern trade']),
    subcategory('convenience-store', 'Convenience Store', 'Location economics, SKU rationalization and high-frequency missions.', 'Store', ['convenience', 'circle k', 'ministop', '7-eleven', 'small format', 'location', 'sku rationalization', 'food to go']),
    subcategory('fnb-restaurant', 'F&B & Restaurant', 'QSR, casual dining and food-delivery integration.', 'CookingPot', ['restaurant', 'f&b', 'qsr', 'casual dining', 'menu', 'food delivery', 'kitchen', 'table turnover']),
    subcategory('fashion-apparel', 'Fashion & Apparel', 'Fast fashion, inventory turns and visual merchandising.', 'ShoppingCart', ['fashion', 'apparel', 'fast fashion', 'inventory turn', 'visual merchandising', 'season', 'collection', 'markdown']),
    subcategory('ecommerce-online-retail', 'Ecommerce & Online Retail', 'Marketplace fulfillment, GMV and retail media.', 'Globe2', ['ecommerce', 'e-commerce', 'shopee', 'lazada', 'tiktok shop', 'fulfilment', 'fulfillment', 'gmv', 'retail media']),
    subcategory('pharmacy-health-retail', 'Pharmacy & Health Retail', 'Regulation, cold chain and OTC versus prescription economics.', 'HeartPulse', ['pharmacy', 'health retail', 'otc', 'prescription', 'cold chain', 'drug', 'pharmacist', 'regulatory']),
  ],
  'industrial-manufacturing': [
    subcategory('automotive-mobility', 'Automotive & Mobility', 'OEM economics, dealerships, EV transition and supply chains.', 'Factory', ['automotive', 'vehicle', 'oem', 'dealership', 'ev', 'electric vehicle', 'mobility', 'assembly']),
    subcategory('steel-metal-materials', 'Steel, Metal & Materials', 'Commodity pricing, production processes and B2B sales.', 'Factory', ['steel', 'metal', 'material', 'commodity', 'blast furnace', 'rolling mill', 'smelter', 'b2b']),
    subcategory('chemical-plastics', 'Chemical & Plastics', 'Petrochemicals, specialty chemicals and ESG pressure.', 'FlaskConical', ['chemical', 'plastic', 'petrochemical', 'polymer', 'specialty chemical', 'feedstock', 'process safety', 'esg']),
    subcategory('energy-oil-gas', 'Energy & Oil & Gas', 'Upstream/downstream economics and Vietnam’s renewable transition.', 'Zap', ['energy', 'oil', 'gas', 'upstream', 'downstream', 'renewable', 'power', 'electricity', 'refinery']),
    subcategory('construction-real-estate', 'Construction & Real Estate', 'Project management, developer economics and REITs.', 'Building2', ['construction', 'real estate', 'property', 'developer', 'reit', 'project management', 'cement', 'building']),
  ],
  consulting: [
    subcategory('strategy-consulting', 'Strategy Consulting', 'MBB-style delivery, issue trees and hypothesis-driven problem solving.', 'Briefcase', ['strategy consulting', 'strategy', 'mbb', 'issue tree', 'hypothesis', 'market entry', 'growth strategy']),
    subcategory('management-operations-consulting', 'Management & Operations Consulting', 'Process improvement, lean and digital transformation.', 'Target', ['management consulting', 'operations consulting', 'process improvement', 'lean', 'digital transformation', 'operating model']),
    subcategory('financial-advisory', 'Financial Advisory', 'Due diligence, valuation and restructuring.', 'Banknote', ['financial advisory', 'due diligence', 'valuation', 'restructuring', 'transaction', 'deal', 'forensic']),
    subcategory('hr-organizational-consulting', 'HR & Organizational Consulting', 'Talent strategy, change management and organization development.', 'Users', ['hr consulting', 'organization', 'organisational', 'talent strategy', 'change management', 'workforce', 'culture']),
    subcategory('it-technology-consulting', 'IT & Technology Consulting', 'ERP implementation, cloud migration and cybersecurity.', 'Cpu', ['it consulting', 'technology consulting', 'erp', 'cloud migration', 'cybersecurity', 'system implementation', 'data transformation']),
  ],
  logistics: [
    subcategory('freight-shipping', 'Freight & Shipping', 'Ocean, air and road freight, Incoterms and rates.', 'Truck', ['freight', 'shipping', 'ocean', 'air cargo', 'road transport', 'incoterm', 'freight rate', 'customs']),
    subcategory('last-mile-delivery', 'Last-Mile Delivery', 'Unit economics and network density in Vietnam delivery.', 'Truck', ['last mile', 'delivery', 'j&t', 'giao hang nhanh', 'ghtk', 'stop density', 'failed delivery', 'courier']),
    subcategory('warehousing-fulfillment', 'Warehousing & Fulfillment', 'WMS, slotting, cold storage and order flow.', 'Factory', ['warehouse', 'warehousing', 'fulfilment', 'fulfillment', 'wms', 'slotting', 'storage', 'pick and pack']),
    subcategory('3pl-integrated-logistics', '3PL & Integrated Logistics', '3PL versus 4PL and contract-logistics economics.', 'Layers3', ['3pl', '4pl', 'contract logistics', 'integrated logistics', 'logistics provider', 'outsourcing', 'control tower']),
    subcategory('cold-chain-pharma-logistics', 'Cold Chain & Pharma Logistics', 'Temperature control, compliance and specialist distribution.', 'ShieldCheck', ['cold chain', 'pharma logistics', 'temperature', 'refrigerated', 'vaccine', 'validation', 'regulatory']),
  ],
  insurance: [
    subcategory('life-insurance', 'Life Insurance', 'Traditional, unit-linked and bancassurance products in Vietnam.', 'ShieldCheck', ['life insurance', 'unit-linked', 'bancassurance', 'mortality', 'persistency', 'policy', 'agency']),
    subcategory('general-non-life-insurance', 'General/Non-Life Insurance', 'Motor, property and liability risk.', 'ShieldCheck', ['general insurance', 'non-life', 'motor', 'property', 'liability', 'casualty', 'claims']),
    subcategory('health-insurance', 'Health Insurance', 'Group and individual health products and claims management.', 'HeartPulse', ['health insurance', 'medical', 'group health', 'individual health', 'hospital', 'claims management']),
    subcategory('reinsurance', 'Reinsurance', 'Treaty versus facultative cover and cedant relationships.', 'Globe2', ['reinsurance', 'treaty', 'facultative', 'cedant', 'retention', 'catastrophe', 'risk transfer']),
  ],
  tobacco: [
    subcategory('conventional-cigarettes', 'Conventional Cigarettes', 'Leaf sourcing, blend engineering, excise and Vietnam’s market.', 'Factory', ['cigarette', 'leaf', 'blend', 'combustible', 'excise', 'sin tax', 'tobacco manufacturing']),
    subcategory('heated-tobacco-products', 'Heated Tobacco Products', 'HTP technology, IQOS/GLO and Vietnam’s regulatory status.', 'Cpu', ['heated tobacco', 'htp', 'iqos', 'glo', 'heat-not-burn', 'device', 'tobacco stick']),
    subcategory('vaping-e-cigarettes', 'Vaping & E-cigarettes', 'Nicotine salts, device hardware and regulatory challenges.', 'Zap', ['vaping', 'e-cigarette', 'e cigarette', 'nicotine salt', 'vape', 'device hardware', 'liquid']),
    subcategory('nicotine-alternatives', 'Nicotine Alternatives', 'NRT, pouches and harm-reduction frameworks.', 'HeartPulse', ['nicotine alternative', 'nrt', 'pouch', 'harm reduction', 'cessation', 'nicotine replacement']),
  ],
};

const PILLAR_SET = new Set<string>(KNOWLEDGE_PILLARS.map((pillar) => pillar.id));
const PILLAR_SIGNALS: Record<PillarId, string[]> = {
  'supply-chain': ['supply', 'operation', 'process', 'capacity', 'factory', 'source', 'logistics', 'distribution', 'quality', 'network'],
  'rnd-product': ['product', 'r&d', 'research', 'innovation', 'technology', 'design', 'development', 'feature', 'proposition'],
  finance: ['finance', 'revenue', 'cost', 'margin', 'profit', 'capital', 'investment', 'valuation', 'return', 'cash', 'risk'],
  'marketing-sales': ['marketing', 'sales', 'customer', 'channel', 'price', 'brand', 'go-to-market', 'commercial', 'segment', 'acquisition'],
  'people-career': ['career', 'role', 'people', 'team', 'talent', 'organization', 'interview', 'skill', 'manager', 'culture'],
  surprising: ['surprising', 'counterintuitive', 'myth', 'insight', 'hidden', 'unexpected', 'trade-off', 'reality'],
};

export interface SubcategoryStudyCard {
  card: LearningCard;
  pillar: PillarId;
}

function searchableCard(card: LearningCard): string {
  return [card.title, card.front, ...(card.back || []), ...(card.diagram || [])].join(' ').toLowerCase();
}

function signalScore(text: string, signals: string[]): number {
  return signals.reduce((score, signal) => score + (text.includes(signal.toLowerCase()) ? Math.max(2, signal.split(' ').length * 2) : 0), 0);
}

function inferredPillar(card: LearningCard): PillarId {
  if (PILLAR_SET.has(card.topic)) return card.topic as PillarId;
  const text = searchableCard(card);
  let best = KNOWLEDGE_PILLARS[0].id;
  let bestScore = -1;
  for (const pillar of KNOWLEDGE_PILLARS) {
    const score = signalScore(text, PILLAR_SIGNALS[pillar.id]);
    if (score > bestScore) {
      best = pillar.id;
      bestScore = score;
    }
  }
  return best;
}

export function subcategoriesForIndustry(industrySlug: string): IndustrySubcategory[] {
  return INDUSTRY_SUBCATEGORIES[industrySlug] || [];
}

export function subcategoryById(industrySlug: string, subcategoryId: string): IndustrySubcategory | null {
  return subcategoriesForIndustry(industrySlug).find((item) => item.id === subcategoryId) || null;
}

export function buildSubcategoryStudyMap(industrySlug: string, cards: LearningCard[]): Record<string, SubcategoryStudyCard[]> {
  const categories = subcategoriesForIndustry(industrySlug);
  const map: Record<string, SubcategoryStudyCard[]> = Object.fromEntries(categories.map((item) => [item.id, []]));
  if (categories.length === 0) return map;
  const curriculum = cards.filter((card) => card.topic !== 'glossary');

  // Assign every existing card once first. Relevance wins, while the load penalty keeps broad
  // foundation cards distributed across the industry rather than collecting in one category.
  curriculum.forEach((card, cardIndex) => {
    const text = searchableCard(card);
    let chosen = categories[cardIndex % categories.length];
    let bestScore = Number.NEGATIVE_INFINITY;
    categories.forEach((item) => {
      const score = signalScore(text, item.signals) - map[item.id].length * 0.35;
      if (score > bestScore) {
        chosen = item;
        bestScore = score;
      }
    });
    map[chosen.id].push({ card, pillar: inferredPillar(card) });
  });

  // Each specialist category must be a useful standalone study plan. Pad thin pillar sections
  // with the most relevant unlisted cards until every category has at least 24 cards: four in
  // each of the six common pillars. A card is never duplicated inside one category.
  categories.forEach((item) => {
    const used = new Set(map[item.id].map(({ card }) => card.id));
    KNOWLEDGE_PILLARS.forEach((pillar) => {
      let pillarCount = map[item.id].filter((entry) => entry.pillar === pillar.id).length;
      if (pillarCount >= 4) return;
      const ranked = curriculum
        .filter((card) => !used.has(card.id))
        .map((card) => {
          const text = searchableCard(card);
          const nativePillar = inferredPillar(card);
          return {
            card,
            score: signalScore(text, item.signals) * 10 + signalScore(text, PILLAR_SIGNALS[pillar.id]) + (nativePillar === pillar.id ? 8 : 0),
          };
        })
        .sort((left, right) => right.score - left.score || left.card.order - right.card.order);
      for (const candidate of ranked) {
        if (pillarCount >= 4) break;
        used.add(candidate.card.id);
        map[item.id].push({ card: candidate.card, pillar: pillar.id });
        pillarCount += 1;
      }
    });
    map[item.id].sort((left, right) => {
      const pillarDelta = KNOWLEDGE_PILLARS.findIndex((pillar) => pillar.id === left.pillar) - KNOWLEDGE_PILLARS.findIndex((pillar) => pillar.id === right.pillar);
      return pillarDelta || left.card.order - right.card.order;
    });
  });

  return map;
}

export function studyCardsForSubcategory(
  industrySlug: string,
  subcategoryId: string,
  cards: LearningCard[],
): SubcategoryStudyCard[] {
  return buildSubcategoryStudyMap(industrySlug, cards)[subcategoryId] || [];
}

export function cardsForSubcategoryPillar(
  industrySlug: string,
  subcategoryId: string,
  pillar: PillarId,
  cards: LearningCard[],
): LearningCard[] {
  return studyCardsForSubcategory(industrySlug, subcategoryId, cards)
    .filter((entry) => entry.pillar === pillar)
    .map((entry) => entry.card);
}

export interface KnowledgeRecommendation {
  industrySlug: string;
  subcategoryId: string | null;
  name: string;
  icon: string;
  why: string;
  pillar?: PillarId;
}

function recommendation(
  industrySlug: string,
  subcategoryId: string | null,
  name: string,
  icon: string,
  why: string,
  pillar?: PillarId,
): KnowledgeRecommendation {
  return { industrySlug, subcategoryId, name, icon, why, pillar };
}

function includesAny(value: string, terms: string[]): boolean {
  return terms.some((term) => value.includes(term));
}

export function knowledgeRecommendationsForProgram(program: string, company?: string | null): KnowledgeRecommendation[] {
  const value = `${company || ''} ${program || ''}`.toLowerCase();

  if (includesAny(value, ['mckinsey', 'bcg', 'bain', 'deloitte', 'accenture', 'consult'])) return [
    recommendation('consulting', 'strategy-consulting', 'Strategy Consulting', 'Briefcase', 'Build the hypothesis-led problem solving expected in strategy interviews.'),
    recommendation('consulting', 'management-operations-consulting', 'Management & Operations Consulting', 'Connect recommendations to process, operating-model and transformation delivery.'),
    recommendation('consulting', 'financial-advisory', 'Financial Advisory', 'Strengthen diligence, valuation and transaction fluency.'),
    recommendation('banking', 'commercial-banking', 'Client-industry lens: Banking', 'Landmark', 'Practice applying consulting structures to a common financial-services client context.'),
  ];

  if (includesAny(value, ['grab', 'j&t', 'giao hàng nhanh', 'giao hang nhanh', 'ghtk', 'logistics', 'expeditors', 'maersk', 'dhl'])) return [
    recommendation('logistics', 'last-mile-delivery', 'Last-Mile Delivery', 'Truck', 'Understand route density, service levels and delivery unit economics.'),
    recommendation('logistics', '3pl-integrated-logistics', '3PL & Integrated Logistics', 'Layers3', 'See how providers design and price end-to-end logistics solutions.'),
    recommendation('tech', 'ecommerce-technology', 'Ecommerce Technology', 'Store', 'Connect delivery operations to marketplace, merchant and checkout technology.'),
  ];

  if (includesAny(value, ['techcombank', 'vpbank', 'vib', 'uob', 'vietcombank', 'bank', 'finance', 'fintech'])) return [
    recommendation('banking', 'commercial-banking', 'Commercial Banking', 'Landmark', 'Master deposits, lending, cards and SME economics.'),
    recommendation('banking', 'investment-banking', 'Investment Banking', 'Banknote', 'Build capital-markets, transaction and advisory fluency.'),
    recommendation('banking', 'banking-fintech', 'Fintech', 'Cpu', 'Understand digital banking, payments and platform lending.'),
  ];

  if (includesAny(value, ['shopee', 'vng', 'fpt', 'momo', 'viettel', 'technology', 'digital', 'software', 'tech '])) return [
    recommendation('tech', 'ecommerce-technology', 'Ecommerce Technology', 'Store', 'Learn the platform, logistics and payment stack behind digital commerce.'),
    recommendation('tech', 'software-saas', 'Software & SaaS', 'Layers3', 'Understand product delivery, recurring revenue and SaaS go-to-market.'),
    recommendation('tech', 'ai-machine-learning', 'AI & Machine Learning', 'Sparkles', 'Build practical fluency in models, MLOps and applied AI.'),
  ];

  if (includesAny(value, ['central retail', 'vingroup', 'wincommerce', 'winmart', 'masan consumer', 'retail', 'aeon', 'lotte'])) return [
    recommendation('retail', 'hypermarket-supermarket', 'Hypermarket & Supermarket', 'Store', 'Master format, category, shelf and shrinkage economics.'),
    recommendation('retail', 'ecommerce-online-retail', 'Ecommerce & Online Retail', 'Globe2', 'Understand omnichannel fulfillment, GMV and retail media.'),
    recommendation('fmcg', null, 'FMCG Core Foundations', 'ShoppingCart', 'Connect retail execution to consumer brands, distributors and trade marketing.', 'marketing-sales'),
  ];

  if (includesAny(value, ['samsung', 'intel', 'semiconductor', 'electronics'])) return [
    recommendation('industrial-manufacturing', 'automotive-mobility', 'Automotive & Mobility', 'Factory', 'Compare complex assembly systems, supplier quality and localization.'),
    recommendation('industrial-manufacturing', 'steel-metal-materials', 'Steel, Metal & Materials', 'Factory', 'Build fluency in capital-intensive production and commodity cycles.'),
    recommendation('tech', 'semiconductor-hardware', 'Semiconductor & Hardware', 'Cpu', 'Study chip design, fabrication, packaging and hardware supply chains.'),
  ];

  if (includesAny(value, ['vinfast', 'bosch', 'automotive', 'mobility'])) return [
    recommendation('industrial-manufacturing', 'automotive-mobility', 'Automotive & Mobility', 'Factory', 'Focus on OEM economics, dealerships, EV transition and supply chains.'),
    recommendation('industrial-manufacturing', 'energy-oil-gas', 'Energy & Oil & Gas', 'Zap', 'Understand the energy system supporting electrification.'),
  ];

  if (includesAny(value, ['ge vernova', 'siemens', 'schneider', 'energy', 'oil', 'gas', 'industrial', 'manufacturing'])) return [
    recommendation('industrial-manufacturing', 'energy-oil-gas', 'Energy & Oil & Gas', 'Zap', 'Understand project economics and Vietnam’s energy transition.'),
    recommendation('industrial-manufacturing', 'steel-metal-materials', 'Steel, Metal & Materials', 'Factory', 'Learn capital intensity, commodity exposure and B2B selling.'),
    recommendation('industrial-manufacturing', 'construction-real-estate', 'Construction & Real Estate', 'Building2', 'Connect industrial demand to projects, developers and infrastructure.'),
  ];

  if (includesAny(value, ['prudential', 'manulife', 'aia', 'insurance'])) return [
    recommendation('insurance', 'life-insurance', 'Life Insurance', 'ShieldCheck', 'Master long-duration products, persistency and distribution.'),
    recommendation('insurance', 'health-insurance', 'Health Insurance', 'HeartPulse', 'Understand claims, provider economics and customer value.'),
    recommendation('insurance', 'reinsurance', 'Reinsurance', 'Globe2', 'See how insurers transfer risk and manage capital.'),
  ];

  if (includesAny(value, ['bat', 'jti', 'tobacco', 'vinataba'])) return [
    recommendation('tobacco', 'conventional-cigarettes', 'Conventional Cigarettes', 'Factory', 'Understand regulated category economics, excise and route to market.'),
    recommendation('tobacco', 'heated-tobacco-products', 'Heated Tobacco Products', 'Cpu', 'Compare device ecosystems and evolving regulation.'),
    recommendation('tobacco', 'nicotine-alternatives', 'Nicotine Alternatives', 'HeartPulse', 'Study harm-reduction frameworks and adjacent products.'),
  ];

  const fmcgSlug = includesAny(value, ['l’oréal', "l'oreal", 'loreal', 'p&g', 'personal care'])
    ? 'fmcg-personal-home-care'
    : includesAny(value, ['heineken', 'carlsberg', 'beer'])
      ? 'fmcg-beer'
      : includesAny(value, ['vinamilk', 'dairy', 'nestlé', 'nestle'])
        ? 'fmcg-dairy'
        : includesAny(value, ['pepsi', 'suntory', 'beverage', 'drink'])
          ? 'fmcg-beverages'
          : includesAny(value, ['masan', 'ajinomoto', 'seasoning', 'condiment'])
            ? 'fmcg-seasonings'
            : 'fmcg-snacks';
  const fmcgTrackName: Record<string, string> = {
    'fmcg-dairy': 'Dairy',
    'fmcg-beer': 'Beer & Alcohol',
    'fmcg-beverages': 'Soft Drinks & Beverages',
    'fmcg-snacks': 'Snacks & Confectionery',
    'fmcg-personal-home-care': 'Personal Care & Home Care',
    'fmcg-seasonings': 'Condiments & Seasonings',
  };
  return [
    recommendation(fmcgSlug, null, fmcgTrackName[fmcgSlug], 'ShoppingCart', 'Build category-specific operating, product and commercial fluency.'),
    recommendation('fmcg', null, 'FMCG Core Foundations', 'BookOpen', 'Understand high-velocity consumer economics across categories.'),
    recommendation('fmcg', null, 'FMCG Marketing & Sales', 'Target', 'Master route to market, brand building and trade execution.', 'marketing-sales'),
  ];
}

export function topicIsPillar(value: TopicGroupId | string): value is PillarId {
  return PILLAR_SET.has(value);
}
