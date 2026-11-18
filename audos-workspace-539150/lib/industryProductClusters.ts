/**
 * Industry / product clustering for cross-user peer benchmarking.
 * Scope: sub-sector + product cluster (e.g. beverages, dairy) — not company-level.
 */

export type ProductClusterId =
  | 'beverages'
  | 'dairy'
  | 'packaged_food'
  | 'personal_care'
  | 'beauty_cosmetics'
  | 'retail_general'
  | 'fashion_retail'
  | 'ecommerce'
  | 'banking'
  | 'insurance'
  | 'fintech'
  | 'consulting'
  | 'marketing_agency'
  | 'logistics_transport'
  | 'manufacturing'
  | 'tech_software'
  | 'healthcare_pharma'
  | 'other_consumer'
  | 'other';

export interface ProductClusterMeta {
  id: ProductClusterId;
  labelEn: string;
  labelVi: string;
  majorIndustry?: string;
  subSector?: string;
}

export const PRODUCT_CLUSTERS: ProductClusterMeta[] = [
  { id: 'beverages', labelEn: 'Beverages (soft drinks, beer, coffee chains)', labelVi: 'Đồ uống (nước ngọt, bia, chuỗi cafe)', majorIndustry: 'consumer_retail', subSector: 'fmcg_food_beverage' },
  { id: 'dairy', labelEn: 'Dairy & nutrition', labelVi: 'Sữa & dinh dưỡng', majorIndustry: 'consumer_retail', subSector: 'fmcg_food_beverage' },
  { id: 'packaged_food', labelEn: 'Packaged food & snacks', labelVi: 'Thực phẩm đóng gói & snack', majorIndustry: 'consumer_retail', subSector: 'fmcg_food_beverage' },
  { id: 'personal_care', labelEn: 'Personal care & home care', labelVi: 'Chăm sóc cá nhân & gia dụng', majorIndustry: 'consumer_retail', subSector: 'fmcg_personal_beauty' },
  { id: 'beauty_cosmetics', labelEn: 'Beauty & cosmetics', labelVi: 'Mỹ phẩm & làm đẹp', majorIndustry: 'consumer_retail', subSector: 'fmcg_personal_beauty' },
  { id: 'retail_general', labelEn: 'Retail & modern trade', labelVi: 'Bán lẻ & kênh phân phối', majorIndustry: 'consumer_retail', subSector: 'retail' },
  { id: 'fashion_retail', labelEn: 'Fashion & lifestyle retail', labelVi: 'Thời trang & lifestyle', majorIndustry: 'consumer_retail', subSector: 'fashion' },
  { id: 'ecommerce', labelEn: 'E-commerce & marketplaces', labelVi: 'Thương mại điện tử', majorIndustry: 'consumer_retail', subSector: 'ecommerce' },
  { id: 'banking', labelEn: 'Banking', labelVi: 'Ngân hàng', majorIndustry: 'finance_banking_insurance', subSector: 'banking' },
  { id: 'insurance', labelEn: 'Insurance', labelVi: 'Bảo hiểm', majorIndustry: 'finance_banking_insurance', subSector: 'insurance' },
  { id: 'fintech', labelEn: 'Fintech & payments', labelVi: 'Fintech & thanh toán', majorIndustry: 'finance_banking_insurance', subSector: 'fintech' },
  { id: 'consulting', labelEn: 'Management consulting', labelVi: 'Tư vấn quản trị', majorIndustry: 'professional_services', subSector: 'management_consulting' },
  { id: 'marketing_agency', labelEn: 'Marketing, advertising & PR', labelVi: 'Marketing, quảng cáo & PR', majorIndustry: 'professional_services', subSector: 'marketing_advertising_pr' },
  { id: 'logistics_transport', labelEn: 'Logistics & transportation', labelVi: 'Logistics & vận tải', majorIndustry: 'logistics_supply_chain', subSector: 'transportation' },
  { id: 'manufacturing', labelEn: 'Manufacturing & industrial', labelVi: 'Sản xuất & công nghiệp', majorIndustry: 'manufacturing_industry', subSector: 'manufacturing' },
  { id: 'tech_software', labelEn: 'Technology & software', labelVi: 'Công nghệ & phần mềm', majorIndustry: 'technology', subSector: 'software_it' },
  { id: 'healthcare_pharma', labelEn: 'Healthcare & pharma', labelVi: 'Y tế & dược phẩm', majorIndustry: 'healthcare_pharma' },
  { id: 'other_consumer', labelEn: 'Other consumer & retail', labelVi: 'Tiêu dùng & bán lẻ (khác)', majorIndustry: 'consumer_retail' },
  { id: 'other', labelEn: 'Other industries', labelVi: 'Ngành khác' },
];

const CLUSTER_BY_ID = Object.fromEntries(PRODUCT_CLUSTERS.map((c) => [c.id, c])) as Record<ProductClusterId, ProductClusterMeta>;

const SUB_SECTOR_DEFAULT: Record<string, ProductClusterId> = {
  fmcg_food_beverage: 'packaged_food',
  fmcg_personal_beauty: 'personal_care',
  retail: 'retail_general',
  fashion: 'fashion_retail',
  ecommerce: 'ecommerce',
  banking: 'banking',
  insurance: 'insurance',
  fintech: 'fintech',
  management_consulting: 'consulting',
  marketing_advertising_pr: 'marketing_agency',
  transportation: 'logistics_transport',
  warehousing: 'logistics_transport',
  aviation_maritime: 'logistics_transport',
  manufacturing: 'manufacturing',
  software_it: 'tech_software',
  ai_data: 'tech_software',
};

type KeywordRule = { cluster: ProductClusterId; patterns: RegExp };

const KEYWORD_RULES: KeywordRule[] = [
  { cluster: 'dairy', patterns: /\b(dairy|milk|sữa|vinamilk|nutifood|th true|nutriboost)\b/i },
  { cluster: 'beverages', patterns: /\b(beverage|soft drink|nước ngọt|pepsi|coca|beer|bia|heineken|suntory|carlsberg|katinat|coffee chain|chuỗi cafe)\b/i },
  { cluster: 'packaged_food', patterns: /\b(snack|confectionery|chocolate|mondelez|nestl|food chain|fmcg food|processed food)\b/i },
  { cluster: 'beauty_cosmetics', patterns: /\b(cosmetic|mỹ phẩm|makeup|skincare|l'oreal|loreal|closeup)\b/i },
  { cluster: 'personal_care', patterns: /\b(personal care|home care|hygiene|unilever|p&g|procter)\b/i },
  { cluster: 'fashion_retail', patterns: /\b(fashion|uniqlo|adidas|apparel|garment)\b/i },
  { cluster: 'retail_general', patterns: /\b(retail|supermarket|hypermarket|central retail|modern trade|bán lẻ)\b/i },
  { cluster: 'ecommerce', patterns: /\b(e-?commerce|marketplace|shopee|lazada|tiktok shop)\b/i },
  { cluster: 'banking', patterns: /\b(bank|ngân hàng|techcombank|vpbank|hsbc)\b/i },
  { cluster: 'consulting', patterns: /\b(consulting|tư vấn|deloitte|ey |mckinsey|bain)\b/i },
  { cluster: 'tech_software', patterns: /\b(software|saas|garena|vng|fintech app)\b/i },
];

function normalizeText(parts: Array<string | undefined | null>): string {
  return parts
    .map((p) => String(p || '').trim())
    .filter(Boolean)
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function productClusterLabel(id: ProductClusterId | string | null | undefined, locale: 'en' | 'vi' = 'vi'): string {
  const meta = CLUSTER_BY_ID[id as ProductClusterId];
  if (!meta) return locale === 'vi' ? 'Ngành khác' : 'Other industries';
  return locale === 'vi' ? meta.labelVi : meta.labelEn;
}

export function resolveProductCluster(input: {
  majorIndustry?: string;
  subSector?: string;
  company?: string;
  role?: string;
  description?: string;
  sector?: string;
}): ProductClusterId {
  const blob = normalizeText([input.company, input.role, input.description, input.sector]);
  for (const rule of KEYWORD_RULES) {
    if (rule.patterns.test(blob)) return rule.cluster;
  }
  const sub = String(input.subSector || '').trim();
  if (sub && SUB_SECTOR_DEFAULT[sub]) return SUB_SECTOR_DEFAULT[sub];
  const major = String(input.majorIndustry || '').trim();
  if (major === 'consumer_retail') return 'other_consumer';
  if (major === 'technology') return 'tech_software';
  if (major === 'finance_banking_insurance') return 'banking';
  if (major === 'professional_services') return 'consulting';
  if (major === 'logistics_supply_chain') return 'logistics_transport';
  if (major === 'manufacturing_industry') return 'manufacturing';
  if (major === 'healthcare_pharma') return 'healthcare_pharma';
  return 'other';
}

export function resolveTargetProgramCluster(company: string, industryLabel: string, legacySector?: string): ProductClusterId {
  const sectorMap: Record<string, { majorIndustry?: string; subSector?: string }> = {
    fmcg: { majorIndustry: 'consumer_retail', subSector: 'fmcg_food_beverage' },
    retail: { majorIndustry: 'consumer_retail', subSector: 'retail' },
    banking: { majorIndustry: 'finance_banking_insurance', subSector: 'banking' },
    tech: { majorIndustry: 'technology', subSector: 'software_it' },
    consulting: { majorIndustry: 'professional_services', subSector: 'management_consulting' },
    advertising: { majorIndustry: 'professional_services', subSector: 'marketing_advertising_pr' },
    logistics: { majorIndustry: 'logistics_supply_chain', subSector: 'transportation' },
    industrial: { majorIndustry: 'manufacturing_industry', subSector: 'manufacturing' },
    healthcare: { majorIndustry: 'healthcare_pharma' },
  };
  const key = String(legacySector || '').trim().toLowerCase();
  const mapped = sectorMap[key];
  return resolveProductCluster({
    company,
    sector: industryLabel,
    majorIndustry: mapped?.majorIndustry,
    subSector: mapped?.subSector,
  });
}

export function clustersFromExperiences(
  experiences: Array<{ company?: string; role?: string; description?: string; sector?: string; major_industry?: string; sub_sector?: string }>,
): ProductClusterId[] {
  const set = new Set<ProductClusterId>();
  for (const exp of experiences || []) {
    set.add(
      resolveProductCluster({
        company: exp.company,
        role: exp.role,
        description: exp.description,
        sector: exp.sector,
        majorIndustry: exp.major_industry,
        subSector: exp.sub_sector,
      }),
    );
  }
  return Array.from(set).filter((id) => id !== 'other');
}
