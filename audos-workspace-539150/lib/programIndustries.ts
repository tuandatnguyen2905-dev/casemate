export type ProgramIndustryId =
  | 'fmcg'
  | 'tobacco'
  | 'retail'
  | 'banking'
  | 'insurance'
  | 'tech'
  | 'consulting'
  | 'logistics'
  | 'industrial'
  | 'healthcare'
  | 'realestate'
  | 'agriculture'
  | 'other';

export interface ProgramIndustry {
  id: ProgramIndustryId;
  label: string;
  shortLabel: string;
}

export const PROGRAM_INDUSTRIES: ProgramIndustry[] = [
  { id: 'fmcg', label: 'FMCG & Consumer Goods', shortLabel: 'FMCG' },
  { id: 'tobacco', label: 'Tobacco', shortLabel: 'Tobacco' },
  { id: 'retail', label: 'Retail & Fashion', shortLabel: 'Retail' },
  { id: 'banking', label: 'Banking & Finance', shortLabel: 'Finance' },
  { id: 'insurance', label: 'Insurance', shortLabel: 'Insurance' },
  { id: 'tech', label: 'E-commerce & Technology', shortLabel: 'Technology' },
  { id: 'consulting', label: 'Consulting & Professional Services', shortLabel: 'Consulting' },
  { id: 'logistics', label: 'Logistics & Supply Chain', shortLabel: 'Logistics' },
  { id: 'industrial', label: 'Industry & Manufacturing', shortLabel: 'Industry' },
  { id: 'healthcare', label: 'Healthcare & Pharmaceuticals', shortLabel: 'Healthcare' },
  { id: 'realestate', label: 'Real Estate', shortLabel: 'Real Estate' },
  { id: 'agriculture', label: 'Agriculture', shortLabel: 'Agriculture' },
  { id: 'other', label: 'Other', shortLabel: 'Other' },
];

const COMPANY_MATCHERS: Array<[ProgramIndustryId, string[]]> = [
  ['fmcg', ['unilever', "l'oreal", 'p&g', 'nestle', 'suntory pepsico', 'carlsberg', 'ab inbev', 'mondelez', 'masan group', 'vinamilk', 'c.p group']],
  ['tobacco', ['japan tobacco international', 'jti', 'british american tobacco', 'bat']],
  ['retail', ['central retail', 'decathlon', 'muji', 'starbucks', 'starbuck', 'uniqlo', 'adidas', 'fast retailing']],
  ['banking', ['techcombank', 'vpbank', 'uob vietnam', 'hsbc', 'msb', 'acb', 'home credit']],
  ['insurance', ['manulife', 'prudential']],
  ['tech', ['shopee', 'seamoney', 'monee', 'tiktok', 'garena', 'vng', 'zalo', 'spx', 'nab innovation', 'pmax', 'momo']],
  ['consulting', ['deloitte', 'ey', 'dksh', 'turner & townsend']],
  ['logistics', ['expeditors', 'maersk']],
  ['industrial', ['bosch', 'hitachi energy', 'schneider electric', 'techtronic industries', 'panasonic', 'knauf', 'texas instruments', 'oppo', 'avery dennison']],
  ['healthcare', ['abbott']],
  ['realestate', ['propertyguru', 'savills']],
  ['agriculture', ['louis dreyfus']],
];

export function normalizeCompanyName(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9&'.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function classifyProgramCompany(company: string): ProgramIndustryId {
  const normalized = normalizeCompanyName(company);
  for (const [industry, companies] of COMPANY_MATCHERS) {
    if (companies.some((candidate) => {
      const key = normalizeCompanyName(candidate);
      return normalized === key || normalized.startsWith(`${key} `) || normalized.includes(` ${key} `);
    })) {
      return industry;
    }
  }
  return 'other';
}

export function industryLabel(id: ProgramIndustryId): string {
  return PROGRAM_INDUSTRIES.find((industry) => industry.id === id)?.label || 'Other';
}
