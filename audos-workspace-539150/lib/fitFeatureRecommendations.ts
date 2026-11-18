import { caseRecommendationsForProgram } from './caseTypeRecommendations';
import { classifyProgramCompany } from './programIndustries';

export type FeatureRecommendationRow = {
  id: string;
  priority: 'High' | 'Medium';
  category: 'CV' | 'Domain Knowledge' | 'Case Drill' | 'Case Pool';
  text: string;
};

type RecommendationTarget = {
  company: string;
  program: string;
  industry?: string | null;
};

type RecommendationProfile = {
  experiences?: Array<{ role?: string; description?: string }>;
};

const KNOWLEDGE_MODULE_BY_INDUSTRY: Record<string, string> = {
  fmcg: 'FMCG & Consumer Goods', tobacco: 'FMCG & Consumer Goods', retail: 'Retail & Commerce',
  banking: 'Banking & Financial Services', insurance: 'Banking & Financial Services', tech: 'Technology & Digital',
  industrial: 'Manufacturing & Engineering', logistics: 'Logistics & Supply Chain', agriculture: 'Agribusiness',
  realestate: 'Real Estate & PropTech', healthcare: 'Healthcare & Life Sciences', consulting: 'Professional & Business Services',
  advertising: 'Technology & Digital', hospitality: 'Hospitality & Foodservice',
};

function recommendationIndustryId(target: RecommendationTarget): string {
  const companyIndustry = classifyProgramCompany(target.company);
  if (companyIndustry !== 'other') return companyIndustry;
  const text = `${target.industry || ''} ${target.program}`.toLowerCase();
  if (/fmcg|consumer|food|beverage|dairy|tobacco/.test(text)) return 'fmcg';
  if (/retail|commerce|fashion/.test(text)) return 'retail';
  if (/bank|finance|insurance|fintech/.test(text)) return 'banking';
  if (/tech|software|digital|e-commerce|telecom|gaming/.test(text)) return 'tech';
  if (/advertis|marketing|media/.test(text)) return 'advertising';
  if (/manufactur|industrial|engineer/.test(text)) return 'industrial';
  if (/logistics|supply chain|freight/.test(text)) return 'logistics';
  if (/agri|farm/.test(text)) return 'agriculture';
  if (/real estate|property|proptech/.test(text)) return 'realestate';
  if (/health|pharma|life science/.test(text)) return 'healthcare';
  if (/hotel|hospitality|foodservice|restaurant/.test(text)) return 'hospitality';
  if (/consult|professional service|audit|advisory/.test(text)) return 'consulting';
  return 'other';
}

type CompetitionEvidence = { competition?: string; title?: string; category?: string };

const COMPETITION_SHORTLISTS = {
  business: ['Unilever Future Leaders\' League (UFLL)', 'P&G CEO Challenge', 'NielsenIQ Case Competition'],
  data: ['Tomorrow Marketers Business Analytics & Consulting Case', 'DataVision: From Metrics to Strategy', 'The Future Business Analyst Case Competition'],
  mt: ['Doanh Nhân Tập Sự (DNTS)', 'Ứng Viên Tài Năng (UVTN)', 'Next Trainee Challenge'],
  finance: ['CFA Research Challenge', 'I-INVEST! Finance Competition', 'Deloitte Tax Challenge'],
  marketing: ['Vietnam Young Lions', 'Young Marketers', 'Marketing On Air (MOA)'],
} as const;

export function competitionSuggestionForTarget(targetFunction: string, achievements: CompetitionEvidence[] = []): string {
  const evidenceText = achievements.map((item) => `${item.category || ''} ${item.competition || ''} ${item.title || ''}`.toLowerCase()).join(' | ');
  const target = targetFunction.toLowerCase();
  const preferred = /finance|account|bank|audit/.test(target)
    ? (['business', 'data', 'mt', 'finance'] as const)
    : /marketing|brand|growth|communication/.test(target)
      ? (['business', 'data', 'mt', 'marketing'] as const)
      : /data|analytics|technology|product|digital/.test(target)
        ? (['business', 'mt', 'data'] as const)
        : /human resources|\bhr\b|people|talent/.test(target)
          ? (['mt', 'business', 'data'] as const)
          : (['business', 'mt', 'data'] as const);
  const categoryPatterns: Record<(typeof preferred)[number], RegExp> = {
    business: /\bbusiness\b|business case|case competition/,
    data: /data|analytics|analyst/,
    mt: /\bmt\b|management trainee|dnts|ung vien tai nang|ứng viên tài năng/,
    finance: /finance|account|bank|audit|cfa|invest|tax/,
    marketing: /marketing|brand|creative|young lions/,
  };
  const category = preferred.find((candidate) => !categoryPatterns[candidate].test(evidenceText)) || preferred[0];
  const names = COMPETITION_SHORTLISTS[category].filter((name) => !evidenceText.includes(name.toLowerCase())).slice(0, 3);
  const label = category === 'data' ? 'Data & Analytics' : category === 'mt' ? 'MT Format' : category.charAt(0).toUpperCase() + category.slice(1);
  return `Consider a ${label} competition from Casemate’s catalog, such as ${names.join(', ')}. Choose one that matches ${targetFunction || 'your target function'} and check the organiser’s current application details.`;
}

export function featureRecommendationRows(
  target: RecommendationTarget,
  selectedFunction: string,
  profile: RecommendationProfile,
): FeatureRecommendationRow[] {
  const industryId = recommendationIndustryId(target);
  const knowledgeModule = KNOWLEDGE_MODULE_BY_INDUSTRY[industryId] || '';
  const caseIndustry = knowledgeModule || target.industry || 'general business';
  const caseTypes = caseRecommendationsForProgram(target).map((item) => item.label).slice(0, 3);
  const functionLabel = selectedFunction || 'this target role';
  const hasExperience = (profile.experiences || []).some((item) => item.role || item.description);
  const cvEvidence = hasExperience
    ? `Edit your strongest CV bullet for ${functionLabel}: name the action you owned, add a measurable result, and mirror only the target keywords you genuinely used.`
    : `Edit your CV for ${functionLabel}: add one relevant course, project, competition, or volunteer example with the action you took and the outcome.`;
  return [
    { id: 'feature-cv-evidence', priority: 'High', category: 'CV', text: cvEvidence },
    { id: 'feature-cv-tools', priority: 'High', category: 'CV', text: 'Edit the Skills section so tools you genuinely used are named consistently, then mention each important tool in the CV bullet where you applied it.' },
    ...(knowledgeModule ? [{ id: 'feature-domain', priority: 'Medium' as const, category: 'Domain Knowledge' as const, text: `Review the existing ${knowledgeModule} knowledge module for concepts and vocabulary relevant to ${target.company}.` }] : []),
    { id: 'feature-case-drill', priority: 'Medium', category: 'Case Drill', text: `Practise ${caseTypes.join(', ')} drills for ${caseIndustry}. Focus on a clear structure, accurate maths, and a concise recommendation.` },
    { id: 'feature-case-pool', priority: 'Medium', category: 'Case Pool', text: `Choose ${caseIndustry} cases that use ${caseTypes.join(', ')} problem types, then compare your approach with the worked solution.` },
  ];
}
