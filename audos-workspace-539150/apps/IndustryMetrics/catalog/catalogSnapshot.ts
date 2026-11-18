// Read-only snapshot of the Domain Knowledge catalog. Taken once from
// reports/domain-knowledge-catalog-reconciliation-2026-10-31.md (master catalog table) and
// cross-checked against the 41 curriculum keys in
// reports/domain-knowledge-assessment-inventory-2026-11-05.json. The live catalog in
// apps/IndustryKnowledge is not imported, so this library cannot affect it.
// 2026-11-12: Beauty, Household and Tobacco moved from Coming Soon to implemented when their
// curricula were activated (apps/IndustryKnowledge/fmcgExpansionRegistry.ts).

export type CatalogAvailability = 'implemented' | 'coming-soon';

export interface CatalogSubIndustry {
  id: string;
  label: string;
  groupId: string;
  availability: CatalogAvailability;
}

export interface CatalogGroup {
  id: string;
  label: string;
}

export const CATALOG_SOURCE = {
  reconciliation: 'reports/domain-knowledge-catalog-reconciliation-2026-10-31.md',
  inventory: 'reports/domain-knowledge-assessment-inventory-2026-11-05.json',
  inspectedOn: '2026-11-08',
} as const;

export const CATALOG_GROUPS: readonly CatalogGroup[] = [
  { id: 'fmcg', label: 'FMCG & Consumer Goods' },
  { id: 'retail', label: 'Retail & Commerce' },
  { id: 'banking', label: 'Banking & Financial Services' },
  { id: 'tech', label: 'Technology & Digital' },
  { id: 'manufacturing', label: 'Manufacturing & Engineering' },
  { id: 'logistics', label: 'Logistics & Supply Chain' },
  { id: 'agribusiness', label: 'Agribusiness' },
  { id: 'realestate', label: 'Real Estate & PropTech' },
  { id: 'hospitality', label: 'Hospitality & Foodservice' },
  { id: 'healthcare', label: 'Healthcare & Life Sciences' },
  { id: 'professional', label: 'Professional & Business Services' },
];

const sub = (id: string, label: string, groupId: string, availability: CatalogAvailability = 'implemented'): CatalogSubIndustry => ({ id, label, groupId, availability });

export const CATALOG_SUB_INDUSTRIES: readonly CatalogSubIndustry[] = [
  sub('fmcg-dairy', 'Dairy', 'fmcg'),
  sub('fmcg-packaged-food', 'Packaged Food & Confectionery', 'fmcg'),
  sub('fmcg-beverages-na', 'Non-Alcoholic Beverages', 'fmcg'),
  sub('fmcg-beverages-alc', 'Beer & Alcoholic Beverages', 'fmcg'),
  sub('fmcg-beauty', 'Beauty & Personal Care', 'fmcg'),
  sub('fmcg-household', 'Household & Personal Care', 'fmcg'),
  sub('fmcg-tobacco', 'Tobacco & Next-Generation Products', 'fmcg'),
  sub('retail-fashion', 'Fashion, Sports & Lifestyle Retail', 'retail'),
  sub('retail-grocery', 'Grocery & General Merchandise Retail', 'retail'),
  sub('retail-pharmacy', 'Pharmacy Retail', 'retail'),
  sub('retail-coffee', 'Coffeehouse & Foodservice Retail', 'retail'),
  sub('banking-commercial', 'Commercial Banking', 'banking'),
  sub('banking-consumer-finance', 'Consumer Finance', 'banking'),
  sub('banking-insurance', 'Life Insurance', 'banking'),
  sub('banking-fintech', 'Payments & Fintech', 'banking'),
  sub('tech-enterprise-sw', 'Enterprise Software & IT Services', 'tech'),
  sub('tech-ecommerce', 'E-Commerce & Digital Marketplaces', 'tech'),
  sub('tech-gaming', 'Gaming & Digital Entertainment', 'tech'),
  sub('tech-electronics', 'Consumer Electronics & Semiconductors', 'tech'),
  sub('tech-telecom', 'Telecommunications & Connectivity', 'tech'),
  sub('tech-adtech', 'Digital Marketing & AdTech', 'tech'),
  sub('tech-social', 'Social & Communication Platforms', 'tech'),
  sub('mfg-electronics', 'Consumer Electronics & Appliances', 'manufacturing'),
  sub('mfg-machinery', 'Machinery & Power Tools', 'manufacturing'),
  sub('mfg-electrical', 'Electrical & Energy Equipment', 'manufacturing'),
  sub('mfg-textiles', 'Textiles & Apparel Manufacturing', 'manufacturing'),
  sub('mfg-building', 'Building Materials & Coatings', 'manufacturing'),
  sub('mfg-packaging', 'Packaging, Labels & Industrial Materials', 'manufacturing'),
  sub('logistics-freight', 'Freight Forwarding & Ocean Logistics', 'logistics'),
  sub('logistics-contract', 'Contract Logistics & Warehousing', 'logistics'),
  sub('logistics-express', 'Express & Last-Mile Delivery', 'logistics'),
  sub('logistics-distribution', 'Distribution & Market Expansion Services', 'logistics'),
  sub('agri-livestock', 'Livestock & Animal Feed', 'agribusiness'),
  sub('agri-commodities', 'Agricultural Commodities & Trading', 'agribusiness'),
  sub('agri-crop', 'Crop Production & Agricultural Processing', 'agribusiness'),
  sub('realestate-development', 'Property Development & Investment', 'realestate'),
  sub('realestate-advisory', 'Property Advisory & Management', 'realestate'),
  sub('realestate-proptech', 'Property Technology & Marketplaces', 'realestate'),
  sub('hospitality-hotels', 'Hotels & Resorts', 'hospitality'),
  sub('hospitality-restaurants', 'Restaurant Chains', 'hospitality'),
  sub('healthcare-products', 'Healthcare Products & Nutrition', 'healthcare'),
  sub('professional-audit', 'Audit & Assurance', 'professional'),
  sub('professional-consulting', 'Management & Technology Consulting', 'professional'),
  sub('professional-advisory', 'Project & Construction Advisory', 'professional'),
];

export const IMPLEMENTED_CURRICULUM_IDS: readonly string[] = CATALOG_SUB_INDUSTRIES.filter((s) => s.availability === 'implemented').map((s) => s.id);
export const COMING_SOON_IDS: readonly string[] = CATALOG_SUB_INDUSTRIES.filter((s) => s.availability === 'coming-soon').map((s) => s.id);

export function subIndustryById(id: string): CatalogSubIndustry | undefined {
  return CATALOG_SUB_INDUSTRIES.find((s) => s.id === id);
}

export function groupById(id: string): CatalogGroup | undefined {
  return CATALOG_GROUPS.find((g) => g.id === id);
}
