import { classifyProgramCompany, type ProgramIndustryId } from './programIndustries';

export interface CaseTypeRecommendation {
  label: string;
  drillSkillId: 'market_sizing' | 'case_math' | 'structures' | 'charts';
}

const CASE_TYPES_BY_INDUSTRY: Record<ProgramIndustryId, CaseTypeRecommendation[]> = {
  fmcg: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'structures' },
  ],
  tobacco: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'structures' },
  ],
  retail: [
    { label: 'Operations / Process', drillSkillId: 'structures' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'market_sizing' },
  ],
  banking: [
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'M&A / Due Diligence', drillSkillId: 'charts' },
    { label: 'Operations', drillSkillId: 'structures' },
  ],
  insurance: [
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'M&A / Due Diligence', drillSkillId: 'charts' },
    { label: 'Operations', drillSkillId: 'structures' },
  ],
  logistics: [
    { label: 'Operations', drillSkillId: 'structures' },
    { label: 'Cost Reduction', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'market_sizing' },
  ],
  consulting: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'structures' },
  ],
  tech: [
    { label: 'Market Entry', drillSkillId: 'market_sizing' },
    { label: 'Profitability / Unit Economics', drillSkillId: 'case_math' },
    { label: 'Growth Strategy', drillSkillId: 'structures' },
  ],
  industrial: [
    { label: 'Operations', drillSkillId: 'structures' },
    { label: 'Cost Reduction', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'market_sizing' },
  ],
  healthcare: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Market Entry', drillSkillId: 'structures' },
    { label: 'Profitability', drillSkillId: 'case_math' },
  ],
  realestate: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Due Diligence', drillSkillId: 'charts' },
  ],
  agriculture: [
    { label: 'Operations / Supply Chain', drillSkillId: 'structures' },
    { label: 'Cost Reduction', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'market_sizing' },
  ],
  other: [
    { label: 'Market Sizing', drillSkillId: 'market_sizing' },
    { label: 'Profitability', drillSkillId: 'case_math' },
    { label: 'Market Entry', drillSkillId: 'structures' },
  ],
};

function industryFromText(value?: string | null): ProgramIndustryId | null {
  const key = String(value || '').toLowerCase();
  if (!key) return null;
  if (/fmcg|consumer|hàng tiêu dùng|personal care|food|beverage/.test(key)) return 'fmcg';
  if (/retail|bán lẻ|fashion/.test(key)) return 'retail';
  if (/bank|finance|financial|ngân hàng|tài chính/.test(key)) return 'banking';
  if (/insurance|bảo hiểm/.test(key)) return 'insurance';
  if (/logistics|supply chain|chuỗi cung ứng/.test(key)) return 'logistics';
  if (/consult|tư vấn|professional service/.test(key)) return 'consulting';
  if (/tech|technology|e-commerce|công nghệ/.test(key)) return 'tech';
  if (/industrial|manufactur|sản xuất/.test(key)) return 'industrial';
  if (/health|pharma|y tế|dược/.test(key)) return 'healthcare';
  if (/real estate|property|bất động sản/.test(key)) return 'realestate';
  if (/agri|nông nghiệp/.test(key)) return 'agriculture';
  if (/tobacco|thuốc lá/.test(key)) return 'tobacco';
  return null;
}

export function caseRecommendationsForProgram(input: {
  industry?: string | null;
  company?: string | null;
  program?: string | null;
}): CaseTypeRecommendation[] {
  const industry = industryFromText(input.industry) || classifyProgramCompany(input.company || input.program || '');
  return CASE_TYPES_BY_INDUSTRY[industry] || CASE_TYPES_BY_INDUSTRY.other;
}

export function openRecommendedCaseDrill(skillId: CaseTypeRecommendation['drillSkillId'], sessionId?: string | null) {
  try {
    localStorage.setItem(`casemate-case-drill-focus:${sessionId || 'preview'}`, JSON.stringify({ skillId }));
  } catch (_) {
    // Case Drill still opens normally if private browsing blocks local storage.
  }
  window.dispatchEvent(new CustomEvent('casemateCaseDrillFocus', { detail: { skillId } }));
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill' } }));
}
