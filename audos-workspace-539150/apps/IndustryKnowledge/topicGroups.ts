// Casemate Domain Knowledge — glossary-first topic groups for every industry deck.
// The common chapters are supplemented by dedicated sub-sector chapters for the five industries
// where candidates need to understand materially different business models inside one label.

export type SubsectorTopicId =
  | 'tech-telecom'
  | 'tech-blockchain'
  | 'tech-ai-ml'
  | 'tech-semiconductor'
  | 'tech-ecommerce'
  | 'tech-fintech'
  | 'banking-retail'
  | 'banking-commercial'
  | 'banking-investment'
  | 'banking-fintech'
  | 'banking-insurance'
  | 'banking-capital-markets'
  | 'banking-microfinance'
  | 'retail-traditional-modern'
  | 'retail-ecommerce'
  | 'retail-convenience'
  | 'retail-department-stores'
  | 'manufacturing-automotive'
  | 'manufacturing-electronics'
  | 'manufacturing-steel-materials'
  | 'manufacturing-chemicals'
  | 'manufacturing-construction-materials'
  | 'consulting-strategy'
  | 'consulting-management'
  | 'consulting-it'
  | 'consulting-big4';

export type TopicGroupId =
  | 'economics-micro'
  | 'economics-macro'
  | 'economics-toolkits'
  | 'logistics-freight'
  | 'logistics-warehousing'
  | 'logistics-last-mile'
  | 'logistics-planning'
  | 'insurance-life'
  | 'insurance-general'
  | 'insurance-distribution'
  | 'insurance-risk'
  | 'tobacco-operations'
  | 'tobacco-commercial'
  | 'tobacco-regulation'
  | 'glossary'
  | 'overview'
  | SubsectorTopicId
  | 'supply-chain'
  | 'rnd-product'
  | 'finance'
  | 'marketing-sales'
  | 'people-career'
  | 'surprising';

export interface TopicGroupMeta {
  id: TopicGroupId;
  label: string;
  shortLabel: string;
  emoji: string;
  /** Lucide icon name resolved through the app's ICONS map. */
  icon: string;
  blurb: string;
  /** Token expression used for the group header chip and rail. */
  accent: string;
}

export const TOPIC_GROUPS: TopicGroupMeta[] = [
  {
    id: 'glossary',
    label: 'Term Sheet / Key Terms',
    shortLabel: 'Term Sheet',
    emoji: '',
    icon: 'BookOpen',
    blurb: 'Essential language first: plain definitions, practical context, and why each term matters before the specialist cards.',
    accent: 'var(--space-brand-primary-600)',
  },
  {
    id: 'economics-micro',
    label: 'Microeconomics',
    shortLabel: 'Micro',
    emoji: '',
    icon: 'Target',
    blurb: 'How buyers, firms, and markets make choices when resources are limited.',
    accent: 'var(--space-brand-primary-600)',
  },
  {
    id: 'economics-macro',
    label: 'Macroeconomics',
    shortLabel: 'Macro',
    emoji: '',
    icon: 'Landmark',
    blurb: 'GDP, inflation, employment, policy, trade, and the economy-wide business cycle.',
    accent: 'var(--space-brand-primary-700)',
  },
  {
    id: 'economics-toolkits',
    label: '43 Consulting Toolkits',
    shortLabel: 'Toolkits',
    emoji: '',
    icon: 'Briefcase',
    blurb: '43 strategy, operations, and finance tools explained in plain English.',
    accent: 'var(--space-semantic-warning-700)',
  },
  { id: 'tech-telecom', label: 'Telecom Industry', shortLabel: 'Telecom', emoji: '', icon: 'Cpu', blurb: 'Networks, subscribers, spectrum economics and telecom careers in Vietnam.', accent: 'var(--space-brand-primary-700)' },
  { id: 'tech-blockchain', label: 'Blockchain', shortLabel: 'Blockchain', emoji: '', icon: 'Cpu', blurb: 'Distributed ledgers, practical use cases, regulation and Web3 economics.', accent: 'var(--space-brand-primary-700)' },
  { id: 'tech-ai-ml', label: 'AI & Machine Learning', shortLabel: 'AI / ML', emoji: '', icon: 'Cpu', blurb: 'Models, data, compute, applied AI products and Vietnam talent paths.', accent: 'var(--space-brand-primary-700)' },
  { id: 'tech-semiconductor', label: 'Semiconductor', shortLabel: 'Chips', emoji: '', icon: 'Cpu', blurb: 'Chip design, packaging, testing, fabrication economics and local opportunity.', accent: 'var(--space-brand-primary-700)' },
  { id: 'tech-ecommerce', label: 'E-commerce', shortLabel: 'E-commerce', emoji: '', icon: 'Store', blurb: 'Marketplace models, seller economics, fulfilment and growth roles.', accent: 'var(--space-brand-primary-700)' },
  { id: 'tech-fintech', label: 'Fintech', shortLabel: 'Fintech', emoji: '', icon: 'Landmark', blurb: 'Payments, wallets, lending partnerships, regulation and unit economics.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-retail', label: 'Retail Banking', shortLabel: 'Retail', emoji: '', icon: 'Landmark', blurb: 'Accounts, deposits, cards, mortgages, consumer lending and branch or mobile journeys.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-commercial', label: 'Corporate Banking', shortLabel: 'Corporate', emoji: '', icon: 'Landmark', blurb: 'Business lending, cash management, trade finance and relationship economics.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-investment', label: 'Investment Banking', shortLabel: 'Investment', emoji: '', icon: 'Landmark', blurb: 'Advisory, underwriting, transactions and deal-team careers.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-fintech', label: 'Fintech', shortLabel: 'Fintech', emoji: '', icon: 'Cpu', blurb: 'Digital payments, wallets, embedded finance, data and platform economics.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-insurance', label: 'Insurance', shortLabel: 'Insurance', emoji: '', icon: 'ShieldCheck', blurb: 'Risk pooling, underwriting, distribution, claims and insurance careers.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-capital-markets', label: 'Securities & Capital Markets', shortLabel: 'Markets', emoji: '', icon: 'Banknote', blurb: 'Brokerage, exchanges, asset management, market infrastructure and careers.', accent: 'var(--space-brand-primary-700)' },
  { id: 'banking-microfinance', label: 'Microfinance', shortLabel: 'Microfinance', emoji: '', icon: 'Landmark', blurb: 'Small-ticket finance, inclusion, field operations and portfolio quality.', accent: 'var(--space-brand-primary-700)' },
  { id: 'retail-traditional-modern', label: 'Traditional Trade vs Modern Trade', shortLabel: 'GT vs MT', emoji: '', icon: 'Store', blurb: 'How fragmented stores and organised chains differ in reach, data and economics.', accent: 'var(--space-brand-primary-700)' },
  { id: 'retail-ecommerce', label: 'E-commerce Retail', shortLabel: 'E-commerce', emoji: '', icon: 'Store', blurb: 'Digital storefronts, marketplaces, fulfilment and online merchandising.', accent: 'var(--space-brand-primary-700)' },
  { id: 'retail-convenience', label: 'Convenience Chains', shortLabel: 'Convenience', emoji: '', icon: 'Store', blurb: 'Small-box retail, high-frequency missions, food-to-go and store networks.', accent: 'var(--space-brand-primary-700)' },
  { id: 'retail-department-stores', label: 'Department Stores', shortLabel: 'Department', emoji: '', icon: 'Building2', blurb: 'Anchor locations, concession models, category curation and experiential retail.', accent: 'var(--space-brand-primary-700)' },
  { id: 'manufacturing-automotive', label: 'Automotive', shortLabel: 'Automotive', emoji: '', icon: 'Factory', blurb: 'Vehicle assembly, suppliers, localisation, quality and engineering careers.', accent: 'var(--space-brand-primary-700)' },
  { id: 'manufacturing-electronics', label: 'Electronics Manufacturing', shortLabel: 'Electronics', emoji: '', icon: 'Factory', blurb: 'High-volume assembly, component ecosystems, yield and export manufacturing.', accent: 'var(--space-brand-primary-700)' },
  { id: 'manufacturing-steel-materials', label: 'Steel & Materials', shortLabel: 'Materials', emoji: '', icon: 'Factory', blurb: 'Commodity cycles, blast furnaces, rolling mills, energy and capital intensity.', accent: 'var(--space-brand-primary-700)' },
  { id: 'manufacturing-chemicals', label: 'Chemicals', shortLabel: 'Chemicals', emoji: '', icon: 'FlaskConical', blurb: 'Process safety, feedstocks, batch economics and industrial applications.', accent: 'var(--space-brand-primary-700)' },
  { id: 'manufacturing-construction-materials', label: 'Construction Materials', shortLabel: 'Construction', emoji: '', icon: 'Building2', blurb: 'Cement, glass, tiles and other materials linked to Vietnam construction demand.', accent: 'var(--space-brand-primary-700)' },
  { id: 'logistics-freight', label: 'Freight & Cross-border', shortLabel: 'Freight', emoji: '', icon: 'Truck', blurb: 'International transport, carriers, documentation and customs.', accent: 'var(--space-semantic-success-700)' },
  { id: 'logistics-warehousing', label: 'Warehousing & Fulfilment', shortLabel: 'Warehousing', emoji: '', icon: 'Factory', blurb: 'Storage, order fulfilment, inventory flow and operating productivity.', accent: 'var(--space-semantic-success-700)' },
  { id: 'logistics-last-mile', label: 'Last-mile Delivery', shortLabel: 'Last mile', emoji: '', icon: 'Truck', blurb: 'Delivery networks, stop density, failed delivery and recipient experience.', accent: 'var(--space-semantic-success-700)' },
  { id: 'logistics-planning', label: 'Supply Chain Planning', shortLabel: 'Planning', emoji: '', icon: 'Target', blurb: 'Forecasting, network design, capacity and resilience.', accent: 'var(--space-semantic-success-700)' },
  { id: 'insurance-life', label: 'Life Insurance', shortLabel: 'Life', emoji: '', icon: 'ShieldCheck', blurb: 'Long-duration protection, pricing and policy persistency.', accent: 'var(--space-semantic-success-600)' },
  { id: 'insurance-general', label: 'General & Health Insurance', shortLabel: 'General', emoji: '', icon: 'ShieldCheck', blurb: 'Health, property, motor and other short-duration claims.', accent: 'var(--space-semantic-success-600)' },
  { id: 'insurance-distribution', label: 'Distribution & Customer', shortLabel: 'Distribution', emoji: '', icon: 'Users', blurb: 'Agency, bancassurance, suitable advice and customer experience.', accent: 'var(--space-semantic-success-600)' },
  { id: 'insurance-risk', label: 'Underwriting, Risk & Capital', shortLabel: 'Risk', emoji: '', icon: 'Banknote', blurb: 'Risk selection, reserves, reinsurance and solvency.', accent: 'var(--space-semantic-success-600)' },
  { id: 'tobacco-operations', label: 'Manufacturing & Supply', shortLabel: 'Operations', emoji: '', icon: 'Factory', blurb: 'Materials, manufacturing, traceability and quality control.', accent: 'var(--space-semantic-danger-700)' },
  { id: 'tobacco-commercial', label: 'Legal-market Commercial', shortLabel: 'Commercial', emoji: '', icon: 'Store', blurb: 'Portfolio, pricing, lawful channels and excise economics.', accent: 'var(--space-semantic-danger-700)' },
  { id: 'tobacco-regulation', label: 'Regulation & Public Health', shortLabel: 'Regulation', emoji: '', icon: 'HeartPulse', blurb: 'Law, public health, compliance and illicit-trade control.', accent: 'var(--space-semantic-danger-700)' },
  {
    id: 'supply-chain',
    label: 'Supply Chain & Operations',
    shortLabel: 'Operations',
    emoji: '🏭',
    icon: 'Factory',
    blurb: 'Raw materials, sourcing, production process, logistics and distribution channels.',
    accent: 'var(--space-semantic-warning-500)',
  },
  {
    id: 'rnd-product',
    label: 'R&D & Product',
    shortLabel: 'R&D',
    emoji: '🔬',
    icon: 'FlaskConical',
    blurb: 'Development lifecycle, key ingredients and components, innovation and quality standards.',
    accent: 'var(--space-semantic-success-500)',
  },
  {
    id: 'finance',
    label: 'Finance & Investment',
    shortLabel: 'Finance',
    emoji: '💵',
    icon: 'Banknote',
    blurb: 'Revenue models, capex versus opex, margin structure, working capital and the KPIs MTs own.',
    accent: 'var(--space-brand-primary-700)',
  },
  {
    id: 'marketing-sales',
    label: 'Marketing & Sales',
    shortLabel: 'Commercial',
    emoji: '🎯',
    icon: 'Target',
    blurb: 'Go-to-market, channel strategy, pricing psychology, trade versus brand marketing and sell-in versus sell-out.',
    accent: 'var(--space-semantic-danger-500)',
  },
  {
    id: 'people-career',
    label: 'People & Career',
    shortLabel: 'Career',
    emoji: '👔',
    icon: 'Users',
    blurb: 'MT functions, org structure, career ladders, valued skills and what interviewers actually ask.',
    accent: 'var(--space-neutral-600)',
  },
  {
    id: 'surprising',
    label: 'Surprising Insights',
    shortLabel: 'Insider',
    emoji: '⚡',
    icon: 'Zap',
    blurb: 'Counterintuitive facts and insider knowledge most candidates get wrong.',
    accent: 'var(--space-semantic-warning-700)',
  },
];

export const TOPIC_GROUP_IDS: TopicGroupId[] = TOPIC_GROUPS.map((group) => group.id);

const TOPIC_GROUP_INDEX = new Map<TopicGroupId, TopicGroupMeta>(TOPIC_GROUPS.map((group) => [group.id, group]));

export function topicGroupMeta(id: TopicGroupId): TopicGroupMeta {
  return TOPIC_GROUP_INDEX.get(id) || TOPIC_GROUPS[0];
}

export function topicGroupOrder(id: TopicGroupId): number {
  const index = TOPIC_GROUP_IDS.indexOf(id);
  return index === -1 ? TOPIC_GROUP_IDS.length : index;
}
