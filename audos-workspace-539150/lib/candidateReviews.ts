// Casemate — candidate reviews and the "Recommended for Your Target Program"
// matching rules used by My Roadmap.
//
// Reviews are entered manually by the founder (table `candidate_reviews`,
// written only by the casemate-candidate-reviews-v1 server function) and are
// what the learner sees as Source Evidence. Everything here is rule-based:
//   - A review matches the learner's target EXACTLY when company + program match
//     and the position matches (a review without a position covers the whole
//     program). Same company with another program/position, or a company in the
//     same industry, is a RELATED match. Anything else is ignored.
//   - A review's topics are the founder's tags; with no tags, keyword rules over
//     the review text pick them.
//   - Within each group (Domain Knowledge, Aptitude Test, Case Drill) topics are
//     ranked by the number of exact-match reviews mentioning them, then related
//     reviews; remaining slots are filled with general preparation suggestions
//     ranked by the program's industry, function and published test formats.
// Only topics that exist in Casemate's own content are ever recommended.

import { classifyProgramCompany, industryLabel } from './programIndustries';
import type { ProgramIndustryId } from './programIndustries';

export const CANDIDATE_REVIEWS_TABLE = 'candidate_reviews';
/**
 * The candidate_reviews table could not be created yet (WorkspaceDB table limit
 * reached). While false, reviews are never queried — no failing request — and
 * every learner gets general preparation. Set to true once the table exists.
 */
export const CANDIDATE_REVIEWS_STORAGE_READY = false;
export const CANDIDATE_REVIEWS_HOOK = '/api/hooks/execute/workspace-539150/casemate-candidate-reviews-v1';
export const CANDIDATE_REVIEWS_UPDATED_EVENT = 'casemate:candidate-reviews-updated';

export const LABEL_EXACT = 'Từ review của ứng viên';
export const LABEL_RELATED = 'Tham khảo liên quan';
export const LABEL_FALLBACK = 'Gợi ý chuẩn bị chung';
export const EVIDENCE_DISCLAIMER = 'Dựa trên chia sẻ của ứng viên, không phải yêu cầu chính thức của nhà tuyển dụng';

export const MAX_CARDS_PER_GROUP = 3;

export type RecommendationGroup = 'domain' | 'aptitude' | 'case_drill';
export type ReviewType = 'interview' | 'aptitude_test' | 'case' | 'other';
export type MatchKind = 'exact' | 'related' | 'fallback';

export const REVIEW_TYPES: Array<{ id: ReviewType; label: string }> = [
  { id: 'interview', label: 'Interview' },
  { id: 'aptitude_test', label: 'Aptitude test' },
  { id: 'case', label: 'Case' },
  { id: 'other', label: 'Other' },
];

export const REVIEW_FIELD_LIMITS = {
  company: 120,
  program: 160,
  position: 120,
  review_text: 8000,
  source_note: 300,
} as const;

export const MAX_REVIEW_TAGS = 12;

export interface CandidateReview {
  id: number;
  company: string;
  program: string;
  position: string | null;
  review_type: ReviewType;
  review_text: string;
  source_note: string | null;
  topic_tags: string[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProgramRow {
  program_id?: string | null;
  program_name?: string | null;
  company?: string | null;
  industry?: string | null;
  sector?: string | null;
  product_categories?: string | null;
  aptitude_test_types?: string | null;
  other_assessment_stages?: string | null;
}

export interface RecommendationTarget {
  company: string | null;
  program: string | null;
  position: string | null;
  programId?: string | null;
}

export interface RecommendationTopic {
  /** 'dk:<sector id>' | 'apt:<test family>' | 'cd:<library skill>' */
  tag: string;
  group: RecommendationGroup;
  /** Domain Knowledge sector id, Aptitude Test family id or Case Drill library skill id. */
  contentId: string;
  title: string;
  /** Domain Knowledge sector group id (fmcg, banking, …). */
  groupId?: string;
  groupLabel?: string;
  keywords: string[];
}

/* ----------------------------------------------------------------------------
 * Text helpers
 * --------------------------------------------------------------------------*/

/** Lowercase, accent-free, punctuation-free text for keyword and name matching. */
export function foldText(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9&+#]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsPhrase(haystack: string, phrase: string): boolean {
  if (!phrase) return false;
  return ` ${haystack} `.includes(` ${phrase} `);
}

/* ----------------------------------------------------------------------------
 * Topic catalogue (existing Casemate content only)
 * --------------------------------------------------------------------------*/

const DK_GROUP_LABELS: Record<string, string> = {
  fmcg: 'FMCG',
  retail: 'Retail',
  banking: 'Banking & Finance',
  tech: 'Technology',
  mfg: 'Manufacturing',
  logistics: 'Logistics',
  agri: 'Agriculture',
  realestate: 'Real Estate',
  hospitality: 'Hospitality',
  healthcare: 'Healthcare',
  professional: 'Professional Services',
};

// Domain Knowledge sub-industries (apps/IndustryKnowledge INDUSTRY_CATEGORIES).
// Keywords avoid accent-stripped Vietnamese words that collide with everyday words.
const DOMAIN_SECTORS: Array<[string, string, string, string[]]> = [
  ['fmcg-dairy', 'Dairy', 'fmcg', ['dairy', 'milk', 'vinamilk', 'th true milk', 'nutifood', 'frieslandcampina', 'dutch lady', 'yogurt', 'sua tuoi', 'sua bot']],
  ['fmcg-packaged-food', 'Packaged Food & Confectionery', 'fmcg', ['packaged food', 'confectionery', 'snack', 'snacks', 'banh keo', 'mondelez', 'orion', 'kinh do', 'acecook', 'instant noodle', 'mi goi', 'seasoning', 'ajinomoto', 'nestle', 'masan']],
  ['fmcg-beverages-na', 'Non-Alcoholic Beverages', 'fmcg', ['beverage', 'beverages', 'soft drink', 'nuoc giai khat', 'nuoc ngot', 'pepsi', 'pepsico', 'suntory', 'coca cola', 'coca', 'energy drink', 'tan hiep phat', 'urc']],
  ['fmcg-beverages-alc', 'Beer & Alcoholic Beverages', 'fmcg', ['beer', 'heineken', 'carlsberg', 'sabeco', 'habeco', 'ab inbev', 'alcohol', 'alcoholic', 'brewery']],
  ['fmcg-beauty', 'Beauty & Personal Care', 'fmcg', ['beauty', 'cosmetic', 'cosmetics', 'my pham', 'skincare', 'l oreal', 'loreal', 'makeup']],
  ['fmcg-household', 'Household & Personal Care', 'fmcg', ['household', 'home care', 'unilever', 'p&g', 'procter', 'detergent', 'bot giat', 'hygiene', 'personal care']],
  ['fmcg-tobacco', 'Tobacco & Next-Generation Products', 'fmcg', ['tobacco', 'thuoc la', 'jti', 'japan tobacco', 'british american tobacco', 'vinataba', 'heated tobacco', 'nicotine']],
  ['retail-fashion', 'Fashion, Sports & Lifestyle Retail', 'retail', ['fashion', 'apparel', 'thoi trang', 'uniqlo', 'adidas', 'decathlon', 'sportswear', 'lifestyle retail', 'fast retailing', 'muji']],
  ['retail-grocery', 'Grocery & General Merchandise Retail', 'retail', ['grocery', 'supermarket', 'sieu thi', 'hypermarket', 'central retail', 'big c', 'tops market', 'winmart', 'wincommerce', 'aeon', 'lotte mart', 'bach hoa xanh', 'modern trade', 'convenience store', 'circle k', 'ministop']],
  ['retail-pharmacy', 'Pharmacy Retail', 'retail', ['pharmacy', 'nha thuoc', 'long chau', 'pharmacity', 'an khang', 'drugstore']],
  ['retail-coffee', 'Coffeehouse & Foodservice Retail', 'retail', ['coffee chain', 'coffeehouse', 'coffee shop', 'starbucks', 'highlands', 'phuc long', 'katinat', 'the coffee house', 'foodservice', 'f&b']],
  ['banking-commercial', 'Commercial Banking', 'banking', ['commercial bank', 'commercial banking', 'ngan hang', 'bank', 'banking', 'techcombank', 'vpbank', 'vietcombank', 'bidv', 'acb', 'msb', 'uob', 'hsbc', 'sme', 'loan', 'loans', 'deposit', 'casa', 'tin dung', 'retail banking', 'corporate banking']],
  ['banking-consumer-finance', 'Consumer Finance', 'banking', ['consumer finance', 'home credit', 'fe credit', 'tai chinh tieu dung', 'installment', 'tra gop', 'mcredit']],
  ['banking-insurance', 'Life Insurance', 'banking', ['insurance', 'bao hiem', 'life insurance', 'manulife', 'prudential', 'aia', 'bancassurance']],
  ['banking-fintech', 'Payments & Fintech', 'banking', ['fintech', 'payment', 'payments', 'thanh toan', 'e wallet', 'ewallet', 'vi dien tu', 'momo', 'zalopay', 'vnpay', 'seamoney', 'shopeepay', 'monee']],
  ['tech-enterprise-sw', 'Enterprise Software & IT Services', 'tech', ['software', 'saas', 'it services', 'enterprise software', 'fpt software', 'cloud', 'erp', 'nab innovation']],
  ['tech-ecommerce', 'E-Commerce & Digital Marketplaces', 'tech', ['e commerce', 'ecommerce', 'thuong mai dien tu', 'marketplace', 'shopee', 'lazada', 'tiki', 'tiktok shop', 'gmv', 'seller', 'sellers']],
  ['tech-gaming', 'Gaming & Digital Entertainment', 'tech', ['gaming', 'game', 'games', 'garena', 'vng', 'esports']],
  ['tech-electronics', 'Consumer Electronics & Semiconductors', 'tech', ['semiconductor', 'semiconductors', 'chip', 'chips', 'samsung', 'intel', 'texas instruments', 'consumer electronics', 'oppo']],
  ['tech-telecom', 'Telecommunications & Connectivity', 'tech', ['telecom', 'telecommunications', 'vien thong', 'viettel', 'vnpt', 'mobifone', '5g']],
  ['tech-adtech', 'Digital Marketing & AdTech', 'tech', ['adtech', 'digital marketing', 'performance marketing', 'programmatic', 'pmax', 'wpp', 'media agency', 'advertising']],
  ['tech-social', 'Social & Communication Platforms', 'tech', ['social media', 'social platform', 'zalo', 'facebook', 'communication platform']],
  ['mfg-electronics', 'Consumer Electronics & Appliances', 'mfg', ['appliances', 'home appliances', 'panasonic', 'electronics manufacturing', 'dien may']],
  ['mfg-machinery', 'Machinery & Power Tools', 'mfg', ['machinery', 'power tools', 'techtronic', 'tti', 'bosch', 'equipment manufacturing']],
  ['mfg-electrical', 'Electrical & Energy Equipment', 'mfg', ['electrical equipment', 'energy equipment', 'schneider', 'hitachi energy', 'siemens', 'ge vernova', 'power grid', 'energy']],
  ['mfg-textiles', 'Textiles & Apparel Manufacturing', 'mfg', ['textile', 'textiles', 'garment', 'may mac', 'det may', 'apparel manufacturing']],
  ['mfg-building', 'Building Materials & Coatings', 'mfg', ['building materials', 'coatings', 'paint', 'knauf', 'cement', 'xi mang', 'construction materials', 'akzonobel']],
  ['mfg-packaging', 'Packaging, Labels & Industrial Materials', 'mfg', ['packaging', 'labels', 'bao bi', 'avery dennison', 'industrial materials', 'tetra pak']],
  ['logistics-freight', 'Freight Forwarding & Ocean Logistics', 'logistics', ['freight', 'forwarding', 'freight forwarding', 'ocean', 'shipping', 'maersk', 'expeditors', 'container', 'sea freight', 'air freight']],
  ['logistics-contract', 'Contract Logistics & Warehousing', 'logistics', ['contract logistics', 'warehousing', 'warehouse', 'kho bai', 'fulfillment', 'fulfilment', '3pl']],
  ['logistics-express', 'Express & Last-Mile Delivery', 'logistics', ['express delivery', 'last mile', 'giao hang', 'spx', 'j&t', 'ghn', 'ghtk', 'ninja van', 'courier', 'shipper']],
  ['logistics-distribution', 'Distribution & Market Expansion Services', 'logistics', ['distribution', 'dksh', 'market expansion', 'phan phoi', 'distributor']],
  ['agri-livestock', 'Livestock & Animal Feed', 'agri', ['livestock', 'animal feed', 'thuc an chan nuoi', 'chan nuoi', 'de heus', 'cargill', 'c p group']],
  ['agri-commodities', 'Agricultural Commodities & Trading', 'agri', ['agricultural commodities', 'commodity trading', 'commodities', 'louis dreyfus', 'nong san', 'rice export']],
  ['agri-crop', 'Crop Production & Agricultural Processing', 'agri', ['crop', 'crops', 'agricultural processing', 'nong nghiep', 'fertilizer', 'phan bon', 'seeds', 'farming']],
  ['realestate-development', 'Property Development & Investment', 'realestate', ['property development', 'real estate', 'bat dong san', 'vinhomes', 'developer', 'real estate investment']],
  ['realestate-advisory', 'Property Advisory & Management', 'realestate', ['property advisory', 'savills', 'cbre', 'jll', 'property management']],
  ['realestate-proptech', 'Property Technology & Marketplaces', 'realestate', ['proptech', 'propertyguru', 'property marketplace']],
  ['hospitality-hotels', 'Hotels & Resorts', 'hospitality', ['hotel', 'hotels', 'resort', 'resorts', 'khach san', 'hospitality', 'accor', 'marriott', 'vinpearl']],
  ['hospitality-restaurants', 'Restaurant Chains', 'hospitality', ['restaurant', 'restaurants', 'nha hang', 'golden gate', 'kfc', 'mcdonald', 'lotteria', 'jollibee', 'pizza']],
  ['healthcare-products', 'Healthcare Products & Nutrition', 'healthcare', ['healthcare', 'abbott', 'nutrition', 'pharmaceutical', 'pharma', 'duoc pham', 'medical devices', 'y te']],
  ['professional-audit', 'Audit & Assurance', 'professional', ['audit', 'kiem toan', 'assurance', 'big4', 'big 4', 'kpmg', 'pwc']],
  ['professional-consulting', 'Management & Technology Consulting', 'professional', ['consulting', 'consultant', 'tu van', 'management consulting', 'strategy consulting', 'mckinsey', 'bcg', 'bain', 'accenture', 'abeam', 'deloitte', 'ey']],
  ['professional-advisory', 'Project & Construction Advisory', 'professional', ['project advisory', 'construction advisory', 'turner & townsend', 'cost management', 'quantity surveying']],
];

const APTITUDE_FAMILIES: Array<[string, string, string[]]> = [
  ['numerical', 'Numerical Reasoning', ['numerical', 'numeric', 'numerical reasoning', 'so hoc', 'toan hoc', 'bai toan', 'data interpretation', 'percentage', 'percentages', 'phan tram', 'math', 'maths', 'tinh nham']],
  ['verbal', 'Verbal Reasoning', ['verbal', 'verbal reasoning', 'doc hieu', 'reading comprehension', 'true false cannot say', 'english test', 'grammar', 'ngu phap']],
  ['logical', 'Logical Reasoning', ['logical', 'logic', 'logical reasoning', 'tu duy logic', 'iq', 'iq test']],
  ['inductive', 'Inductive Reasoning', ['inductive', 'inductive reasoning', 'quy nap', 'abstract reasoning', 'pattern', 'patterns']],
  ['deductive', 'Deductive Reasoning', ['deductive', 'deductive reasoning', 'dien dich', 'syllogism', 'syllogisms', 'tam doan luan']],
  ['diagrammatic', 'Diagrammatic Reasoning', ['diagrammatic', 'diagram', 'diagrams', 'abstract', 'matrix', 'matrices']],
  ['error_checking', 'Error Checking', ['error checking', 'kiem tra loi', 'checking accuracy', 'clerical']],
  ['spatial', 'Spatial Reasoning', ['spatial', 'spatial reasoning', 'khong gian', 'rotation', 'xoay hinh', 'cube']],
  ['situational', 'Situational Judgement', ['situational judgement', 'situational judgment', 'situational', 'sjt', 'tinh huong', 'xu ly tinh huong']],
  ['critical', 'Critical Thinking', ['critical thinking', 'tu duy phan bien', 'watson glaser', 'assumption', 'assumptions', 'ccat']],
  ['mechanical', 'Mechanical Reasoning', ['mechanical', 'mechanical reasoning', 'co khi', 'lever', 'levers', 'pulley', 'pulleys', 'gears']],
  ['in_tray', 'In-Tray & E-Tray', ['in tray', 'intray', 'e tray', 'etray', 'inbox exercise', 'email prioritisation', 'email prioritization', 'prioritisation exercise']],
];

const CASE_SKILLS: Array<[string, string, string[]]> = [
  ['structures', 'Structures', ['structure', 'structures', 'structuring', 'issue tree', 'framework', 'frameworks', 'cau truc', 'cay van de', 'market entry', 'gia nhap thi truong', 'mece', 'hypothesis', 'gia thuyet']],
  ['calculations', 'Calculations', ['calculation', 'calculations', 'case math', 'tinh toan', 'break even', 'hoa von', 'roi', 'npv', 'payback', 'margin', 'margins', 'profitability', 'loi nhuan', 'bien loi nhuan']],
  ['market-sizing', 'Market Sizing', ['market sizing', 'guesstimate', 'guesstimates', 'estimate', 'estimation', 'uoc tinh', 'quy mo thi truong', 'market size']],
  ['charts', 'Charts', ['chart', 'charts', 'exhibit', 'exhibits', 'graph', 'graphs', 'bieu do', 'do thi', 'data interpretation', 'doc so lieu', 'phan tich so lieu', 'bang so lieu']],
  ['creativity', 'Creativity', ['creativity', 'creative', 'sang tao', 'brainstorm', 'brainstorming', 'idea', 'ideas', 'y tuong', 'campaign', 'marketing plan', 'imc', 'activation', 'new product', 'product development']],
];

function folded(list: string[]): string[] {
  return [...new Set(list.map(foldText).filter(Boolean))];
}

export const RECOMMENDATION_TOPICS: RecommendationTopic[] = [
  ...DOMAIN_SECTORS.map(([id, title, groupId, keywords]) => ({
    tag: `dk:${id}`,
    group: 'domain' as const,
    contentId: id,
    title,
    groupId,
    groupLabel: DK_GROUP_LABELS[groupId] || groupId,
    keywords: folded(keywords),
  })),
  ...APTITUDE_FAMILIES.map(([id, title, keywords]) => ({
    tag: `apt:${id}`,
    group: 'aptitude' as const,
    contentId: id,
    title,
    keywords: folded(keywords),
  })),
  ...CASE_SKILLS.map(([id, title, keywords]) => ({
    tag: `cd:${id}`,
    group: 'case_drill' as const,
    contentId: id,
    title,
    keywords: folded(keywords),
  })),
];

const TOPIC_BY_TAG = new Map(RECOMMENDATION_TOPICS.map((topic) => [topic.tag, topic]));

export function topicByTag(tag: string): RecommendationTopic | undefined {
  return TOPIC_BY_TAG.get(tag);
}

export function topicsForGroup(group: RecommendationGroup): RecommendationTopic[] {
  return RECOMMENDATION_TOPICS.filter((topic) => topic.group === group);
}

export const GROUP_ORDER: RecommendationGroup[] = ['domain', 'aptitude', 'case_drill'];

export const GROUP_LABEL: Record<RecommendationGroup, string> = {
  domain: 'Domain Knowledge',
  aptitude: 'Aptitude Test',
  case_drill: 'Case Drill',
};

/* ----------------------------------------------------------------------------
 * Review topics
 * --------------------------------------------------------------------------*/

export function isValidTopicTag(tag: unknown): tag is string {
  return typeof tag === 'string' && TOPIC_BY_TAG.has(tag);
}

export function parseTopicTags(value: unknown): string[] {
  let raw = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = [];
    }
  }
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.filter(isValidTopicTag))];
}

/** Topics found by keyword in free text (used when the founder selected none). */
export function detectTopicTags(text: string): string[] {
  const haystack = foldText(text);
  if (!haystack) return [];
  return RECOMMENDATION_TOPICS.filter((topic) => topic.keywords.some((keyword) => containsPhrase(haystack, keyword))).map((topic) => topic.tag);
}

export function reviewTopicTags(review: Pick<CandidateReview, 'topic_tags' | 'review_text'>): { tags: string[]; source: 'manual' | 'keyword' } {
  const manual = parseTopicTags(review.topic_tags);
  if (manual.length > 0) return { tags: manual, source: 'manual' };
  return { tags: detectTopicTags(review.review_text), source: 'keyword' };
}

/** Sentence-ish excerpt around the first keyword of the topic, or the opening of the review. */
export function excerptForTopic(text: string, topic: RecommendationTopic | null, maxLength = 240): string {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength || !topic) return clean;
  const sentences = clean.split(/(?<=[.!?。])\s+/);
  const hit = sentences.find((sentence) => {
    const haystack = foldText(sentence);
    return topic.keywords.some((keyword) => containsPhrase(haystack, keyword));
  });
  return hit || clean;
}

/* ----------------------------------------------------------------------------
 * Target and review matching
 * --------------------------------------------------------------------------*/

const COMPANY_NOISE = new Set([
  'vietnam', 'viet', 'nam', 'vn', 'group', 'corporation', 'corp', 'company', 'co', 'ltd', 'jsc', 'plc', 'limited', 'inc',
  'tap', 'doan', 'cong', 'ty', 'tnhh', 'cp', 'the',
]);

const PROGRAM_NOISE = new Set([
  'program', 'programme', 'programs', 'programmes', 'chuong', 'trinh', 'the', 'of', 'for', 'and', '&', 'vietnam', 'viet', 'nam', 'vn',
]);

export function companyKey(value: unknown): string {
  return foldText(value).split(' ').filter((token) => token && !COMPANY_NOISE.has(token)).join(' ');
}

function programKey(value: unknown): string {
  return foldText(value).split(' ').filter((token) => token && !PROGRAM_NOISE.has(token)).join(' ');
}

function programAcronyms(value: unknown): string[] {
  const text = String(value ?? '');
  const inParens = [...text.matchAll(/\(([^)]+)\)/g)].map((match) => foldText(match[1]));
  const capitals = [...text.matchAll(/\b([A-Z]{3,8})\b/g)].map((match) => foldText(match[1]));
  return [...new Set([...inParens, ...capitals].filter((item) => item.length >= 2))];
}

function phraseWithin(longer: string, shorter: string): boolean {
  return shorter.length >= 2 && containsPhrase(longer, shorter);
}

export function companiesMatch(a: unknown, b: unknown): boolean {
  const left = companyKey(a);
  const right = companyKey(b);
  if (!left || !right) return false;
  if (left === right) return true;
  return phraseWithin(left, right) || phraseWithin(right, left);
}

export function programsMatch(a: unknown, b: unknown, company?: unknown): boolean {
  const companyTokens = new Set(companyKey(company).split(' ').filter(Boolean));
  const strip = (value: unknown) => programKey(value).split(' ').filter((token) => !companyTokens.has(token)).join(' ');
  const left = strip(a);
  const right = strip(b);
  if (left && right) {
    if (left === right) return true;
    const [shorter, longer] = left.length <= right.length ? [left, right] : [right, left];
    if (shorter.length >= 4 && containsPhrase(longer, shorter)) return true;
  }
  const leftAcronyms = programAcronyms(a);
  const rightAcronyms = programAcronyms(b);
  if (leftAcronyms.some((acronym) => acronym === right || rightAcronyms.includes(acronym))) return true;
  return rightAcronyms.some((acronym) => acronym === left);
}

export function positionsMatch(a: unknown, b: unknown): boolean {
  const left = foldText(a);
  const right = foldText(b);
  if (!left || !right) return true;
  if (left === right) return true;
  return phraseWithin(left, right) || phraseWithin(right, left);
}

const INDUSTRY_TEXT_RULES: Array<[ProgramIndustryId, RegExp]> = [
  ['tobacco', /\b(tobacco|thuoc la|nicotine)\b/],
  ['insurance', /\b(insurance|bao hiem)\b/],
  ['banking', /\b(bank|banking|banks|financial|finance|ngan hang|tai chinh|fintech|payments?)\b/],
  ['consulting', /\b(consult\w*|professional services?|audit|advisory|tu van)\b/],
  ['advertising', /\b(advertising|marketing agency|media agency|agency|pr)\b/],
  ['logistics', /\b(logistics?|supply chain|shipping|freight|delivery|express)\b/],
  ['retail', /\b(retail\w*|ban le|fashion|apparel|supermarket|grocery)\b/],
  ['fmcg', /\b(fmcg|consumer goods|food|foods|beverages?|dairy|personal care|home care|cosmetics?|beauty|confectionery)\b/],
  ['tech', /\b(tech|technology|e commerce|ecommerce|software|internet|digital|telecom\w*|gaming|platform)\b/],
  ['industrial', /\b(industrial|manufactur\w*|engineering|electrical|energy|automotive|chemicals?|building materials|semiconductors?|electronics)\b/],
  ['healthcare', /\b(health\w*|pharma\w*|medical|nutrition)\b/],
  ['realestate', /\b(real estate|property|properties|bat dong san)\b/],
  ['agriculture', /\b(agri\w*|commodit\w*|livestock|animal feed|nong nghiep)\b/],
];

export function industryFromText(value: unknown): ProgramIndustryId | null {
  const text = foldText(value);
  if (!text) return null;
  for (const [industry, pattern] of INDUSTRY_TEXT_RULES) if (pattern.test(text)) return industry;
  return null;
}

export function findProgramRow(programs: ProgramRow[], target: RecommendationTarget | null): ProgramRow | null {
  if (!target) return null;
  if (target.programId) {
    const byId = programs.find((row) => row.program_id && row.program_id === target.programId);
    if (byId) return byId;
  }
  if (!target.program && !target.company) return null;
  const sameCompany = target.company ? programs.filter((row) => companiesMatch(row.company, target.company)) : programs;
  return sameCompany.find((row) => target.program && programsMatch(row.program_name, target.program, target.company)) || null;
}

export function industryOfCompany(company: unknown, programs: ProgramRow[]): ProgramIndustryId | null {
  const row = programs.find((item) => companiesMatch(item.company, company));
  const fromRow = row ? industryFromText(row.industry) || industryFromText(row.sector) : null;
  if (fromRow) return fromRow;
  const classified = classifyProgramCompany(String(company || ''));
  return classified !== 'other' ? classified : null;
}

export function targetIndustry(target: RecommendationTarget | null, programRow: ProgramRow | null, programs: ProgramRow[]): ProgramIndustryId | null {
  if (!target) return null;
  const fromRow = programRow ? industryFromText(programRow.industry) || industryFromText(programRow.sector) : null;
  if (fromRow) return fromRow;
  const fromCompany = industryOfCompany(target.company, programs);
  if (fromCompany) return fromCompany;
  return industryFromText(`${target.company || ''} ${target.program || ''}`);
}

export type ReviewMatch = { level: 'exact' | 'related'; reason: 'program' | 'company' | 'industry' };

export function matchReviewToTarget(
  review: Pick<CandidateReview, 'company' | 'program' | 'position'>,
  target: RecommendationTarget | null,
  industries: { target: ProgramIndustryId | null; review: ProgramIndustryId | null },
): ReviewMatch | null {
  if (!target || (!target.company && !target.program)) return null;
  const sameCompany = !!target.company && companiesMatch(review.company, target.company);
  if (sameCompany) {
    const sameProgram = !!target.program && programsMatch(review.program, target.program, target.company);
    if (sameProgram && positionsMatch(review.position, target.position)) return { level: 'exact', reason: 'program' };
    return { level: 'related', reason: 'company' };
  }
  if (industries.target && industries.review && industries.target !== 'other' && industries.target === industries.review) {
    return { level: 'related', reason: 'industry' };
  }
  return null;
}

/* ----------------------------------------------------------------------------
 * General preparation (fallback) ranking
 * --------------------------------------------------------------------------*/

const DOMAIN_GROUP_BY_INDUSTRY: Record<ProgramIndustryId, string | null> = {
  fmcg: 'fmcg',
  tobacco: 'fmcg',
  retail: 'retail',
  banking: 'banking',
  insurance: 'banking',
  tech: 'tech',
  consulting: 'professional',
  advertising: 'tech',
  logistics: 'logistics',
  industrial: 'mfg',
  healthcare: 'healthcare',
  realestate: 'realestate',
  agriculture: 'agri',
  other: null,
};

const DOMAIN_DEFAULTS: Record<ProgramIndustryId, string[]> = {
  fmcg: ['fmcg-household', 'fmcg-packaged-food', 'fmcg-beverages-na'],
  tobacco: ['fmcg-tobacco', 'fmcg-packaged-food', 'retail-grocery'],
  retail: ['retail-grocery', 'retail-fashion', 'retail-pharmacy'],
  banking: ['banking-commercial', 'banking-fintech', 'banking-consumer-finance'],
  insurance: ['banking-insurance', 'banking-commercial', 'banking-fintech'],
  tech: ['tech-ecommerce', 'banking-fintech', 'tech-enterprise-sw'],
  consulting: ['professional-consulting', 'professional-audit', 'banking-commercial'],
  advertising: ['tech-adtech', 'fmcg-beauty', 'tech-social'],
  logistics: ['logistics-express', 'logistics-contract', 'logistics-freight'],
  industrial: ['mfg-electrical', 'mfg-machinery', 'mfg-building'],
  healthcare: ['healthcare-products', 'retail-pharmacy', 'fmcg-packaged-food'],
  realestate: ['realestate-development', 'realestate-advisory', 'realestate-proptech'],
  agriculture: ['agri-commodities', 'agri-livestock', 'agri-crop'],
  other: ['fmcg-household', 'banking-commercial', 'retail-grocery'],
};

const APTITUDE_DEFAULTS: Record<ProgramIndustryId, string[]> = {
  fmcg: ['numerical', 'verbal', 'situational'],
  tobacco: ['numerical', 'verbal', 'situational'],
  retail: ['numerical', 'situational', 'verbal'],
  banking: ['numerical', 'verbal', 'logical'],
  insurance: ['numerical', 'verbal', 'logical'],
  tech: ['logical', 'numerical', 'critical'],
  consulting: ['numerical', 'critical', 'verbal'],
  advertising: ['verbal', 'logical', 'situational'],
  logistics: ['numerical', 'logical', 'situational'],
  industrial: ['numerical', 'logical', 'mechanical'],
  healthcare: ['numerical', 'verbal', 'situational'],
  realestate: ['numerical', 'verbal', 'logical'],
  agriculture: ['numerical', 'logical', 'verbal'],
  other: ['numerical', 'verbal', 'logical'],
};

// Same industry → case-type mapping as lib/caseTypeRecommendations.ts, expressed
// as Case Drill library skills (case_math → calculations).
const CASE_DEFAULTS: Record<ProgramIndustryId, string[]> = {
  fmcg: ['market-sizing', 'calculations', 'structures'],
  tobacco: ['market-sizing', 'calculations', 'structures'],
  retail: ['structures', 'calculations', 'market-sizing'],
  banking: ['calculations', 'charts', 'structures'],
  insurance: ['calculations', 'charts', 'structures'],
  tech: ['market-sizing', 'calculations', 'structures'],
  consulting: ['market-sizing', 'calculations', 'structures'],
  advertising: ['creativity', 'structures', 'market-sizing'],
  logistics: ['structures', 'calculations', 'market-sizing'],
  industrial: ['structures', 'calculations', 'market-sizing'],
  healthcare: ['market-sizing', 'structures', 'calculations'],
  realestate: ['market-sizing', 'calculations', 'charts'],
  agriculture: ['structures', 'calculations', 'market-sizing'],
  other: ['market-sizing', 'calculations', 'structures'],
};

const CASE_FUNCTION_RULES: Array<[RegExp, string]> = [
  [/\b(marketing|brand|trade marketing|communication\w*|creative|campaigns?)\b/, 'creativity'],
  [/\b(finance|financial|accounting|audit|controlling|investment)\b/, 'calculations'],
  [/\b(supply chain|operations?|logistics|manufactur\w*|procurement|planning)\b/, 'structures'],
  [/\b(data|analytics|business intelligence|bi|insight\w*)\b/, 'charts'],
  [/\b(strategy|business development|commercial|sales|customer development)\b/, 'market-sizing'],
];

const APTITUDE_FUNCTION_RULES: Array<[RegExp, string]> = [
  [/\b(engineer\w*|technical|maintenance|manufactur\w*|ky thuat)\b/, 'mechanical'],
  [/\b(finance|financial|accounting|audit|controlling)\b/, 'numerical'],
];

/** Test families named in the program's researched online-test description (programs.aptitude_test_types). */
export function aptitudeFamiliesFromText(text: unknown): string[] {
  const haystack = foldText(text);
  if (!haystack) return [];
  const hits: Array<{ id: string; at: number }> = [];
  topicsForGroup('aptitude').forEach((topic) => {
    let at = -1;
    topic.keywords.forEach((keyword) => {
      const index = ` ${haystack} `.indexOf(` ${keyword} `);
      if (index >= 0 && (at < 0 || index < at)) at = index;
    });
    if (at >= 0) hits.push({ id: topic.contentId, at });
  });
  return hits.sort((a, b) => a.at - b.at).map((hit) => hit.id);
}

export interface FallbackPick {
  contentId: string;
  why: string;
}

function uniquePush(list: string[], values: string[]) {
  values.forEach((value) => {
    if (!list.includes(value)) list.push(value);
  });
}

function targetName(target: RecommendationTarget | null): string {
  if (!target) return 'your target program';
  return [target.company, target.program].filter(Boolean).join(' ') || 'your target program';
}

export function fallbackRanking(
  group: RecommendationGroup,
  target: RecommendationTarget | null,
  industry: ProgramIndustryId | null,
  programRow: ProgramRow | null,
): FallbackPick[] {
  const key: ProgramIndustryId = industry || 'other';
  const sectorLabel = industry && industry !== 'other' ? industryLabel(industry) : null;
  const functionText = foldText(target?.position);
  const name = targetName(target);
  const picks: FallbackPick[] = [];
  const add = (contentId: string, why: string) => {
    if (!picks.some((pick) => pick.contentId === contentId)) picks.push({ contentId, why });
  };

  if (group === 'domain') {
    if (target) {
      // Company/program names are strong signals; industry/sector wording only
      // counts inside the target industry's own Domain Knowledge group.
      const names = foldText([target.company, target.program].filter(Boolean).join(' '));
      const sectorText = foldText([programRow?.industry, programRow?.sector, programRow?.product_categories].filter(Boolean).join(' '));
      const ownGroup = DOMAIN_GROUP_BY_INDUSTRY[key];
      topicsForGroup('domain')
        .map((topic) => ({
          topic,
          score: topic.keywords.reduce((sum, keyword) => sum
            + (containsPhrase(names, keyword) ? 3 : 0)
            + (topic.groupId === ownGroup && containsPhrase(sectorText, keyword) ? 1 : 0), 0),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .forEach(({ topic }) => add(topic.contentId, `${target.company || 'Your target company'} works in ${topic.title}. Know how this industry makes money before your interviews.`));
    }
    DOMAIN_DEFAULTS[key].forEach((id) => {
      const topic = topicByTag(`dk:${id}`);
      if (!topic) return;
      add(id, target
        ? `Core industry knowledge for ${sectorLabel || 'MT'} programs like ${name}.`
        : `A common industry topic in MT interviews. Pick a target to make this specific.`);
    });
    return picks;
  }

  if (group === 'aptitude') {
    const published = aptitudeFamiliesFromText(programRow?.aptitude_test_types);
    published.forEach((id) => add(id, 'Listed in Casemate’s research on this program’s online test.'));
    APTITUDE_FUNCTION_RULES.forEach(([pattern, id]) => {
      if (functionText && pattern.test(functionText)) add(id, `Often tested for ${target?.position} roles.`);
    });
    APTITUDE_DEFAULTS[key].forEach((id) => add(id, target
      ? `A common online test format for ${sectorLabel || 'MT'} programs.`
      : 'One of the most common online test formats in MT recruitment.'));
    return picks;
  }

  const order: string[] = [];
  CASE_FUNCTION_RULES.forEach(([pattern, id]) => {
    if (functionText && pattern.test(functionText)) uniquePush(order, [id]);
  });
  uniquePush(order, CASE_DEFAULTS[key]);
  const caseReason: Record<string, string> = {
    structures: 'Practise structuring issue trees for market-entry and operations questions.',
    calculations: 'Practise profitability and break-even maths under time pressure.',
    'market-sizing': 'Practise estimating market size step by step.',
    charts: 'Practise reading exhibits and pulling out the key insight fast.',
    creativity: 'Practise generating structured ideas for growth and marketing questions.',
  };
  order.forEach((id) => {
    const base = caseReason[id] || 'Practise this case skill.';
    add(id, target && sectorLabel ? `A frequent case skill in ${sectorLabel} interviews. ${base}` : base);
  });
  return picks;
}

/* ----------------------------------------------------------------------------
 * Recommendations
 * --------------------------------------------------------------------------*/

export interface EvidenceItem {
  reviewId: number;
  level: 'exact' | 'related';
  reason: ReviewMatch['reason'];
  excerpt: string;
  fullText: string;
  company: string;
  program: string;
  position: string | null;
  reviewType: ReviewType;
  sourceNote: string | null;
}

export interface RecommendationCard {
  topic: RecommendationTopic;
  kind: MatchKind;
  label: string;
  why: string;
  exactCount: number;
  relatedCount: number;
  evidence: EvidenceItem[];
}

export interface RecommendationResult {
  groups: Record<RecommendationGroup, RecommendationCard[]>;
  matchedReviewCount: { exact: number; related: number };
}

export interface BuildRecommendationsInput {
  target: RecommendationTarget | null;
  reviews: CandidateReview[];
  programs: ProgramRow[];
  /** When known, Domain Knowledge topics outside this set are not recommended. */
  availableSectorIds?: string[] | null;
}

function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`;
}

function evidenceWhy(card: { kind: MatchKind; exactCount: number; relatedCount: number; evidence: EvidenceItem[] }, target: RecommendationTarget | null): string {
  if (card.kind === 'exact') {
    const where = [target?.program, target?.company ? `at ${target.company}` : ''].filter(Boolean).join(' ');
    const extra = card.relatedCount > 0 ? ` (+${plural(card.relatedCount, 'related review')})` : '';
    return `Mentioned in ${plural(card.exactCount, 'candidate review')} for ${where || 'your target program'}${extra}.`;
  }
  const sameCompany = card.evidence.some((item) => item.reason === 'company');
  const sameIndustry = card.evidence.some((item) => item.reason === 'industry');
  const scope = sameCompany && sameIndustry
    ? `other programs at ${target?.company || 'this company'} and the same industry`
    : sameCompany
      ? `other programs or roles at ${target?.company || 'this company'}`
      : 'programs in the same industry';
  return `Mentioned in ${plural(card.relatedCount, 'candidate review')} from ${scope}.`;
}

export function buildRecommendations(input: BuildRecommendationsInput): RecommendationResult {
  const { target, reviews, programs } = input;
  const available = input.availableSectorIds ? new Set(input.availableSectorIds) : null;
  const isOffered = (topic: RecommendationTopic) => topic.group !== 'domain' || !available || available.has(topic.contentId);
  const programRow = findProgramRow(programs, target);
  const industry = targetIndustry(target, programRow, programs);

  const tally = new Map<string, { exact: EvidenceItem[]; related: EvidenceItem[] }>();
  let exactReviews = 0;
  let relatedReviews = 0;
  reviews.forEach((review) => {
    const match = matchReviewToTarget(review, target, { target: industry, review: industryOfCompany(review.company, programs) });
    if (!match) return;
    if (match.level === 'exact') exactReviews += 1;
    else relatedReviews += 1;
    reviewTopicTags(review).tags.forEach((tag) => {
      const topic = topicByTag(tag);
      if (!topic || !isOffered(topic)) return;
      const entry = tally.get(tag) || { exact: [], related: [] };
      entry[match.level].push({
        reviewId: review.id,
        level: match.level,
        reason: match.reason,
        excerpt: excerptForTopic(review.review_text, topic),
        fullText: review.review_text,
        company: review.company,
        program: review.program,
        position: review.position,
        reviewType: review.review_type,
        sourceNote: review.source_note,
      });
      tally.set(tag, entry);
    });
  });

  const groups = {} as Record<RecommendationGroup, RecommendationCard[]>;
  GROUP_ORDER.forEach((group) => {
    const fallback = fallbackRanking(group, target, industry, programRow);
    const fallbackRank = (contentId: string) => {
      const index = fallback.findIndex((pick) => pick.contentId === contentId);
      return index < 0 ? Number.MAX_SAFE_INTEGER : index;
    };
    const evidenceCards: RecommendationCard[] = topicsForGroup(group)
      .filter((topic) => tally.has(topic.tag))
      .map((topic) => {
        const entry = tally.get(topic.tag)!;
        const kind: MatchKind = entry.exact.length > 0 ? 'exact' : 'related';
        const card = {
          topic,
          kind,
          label: kind === 'exact' ? LABEL_EXACT : LABEL_RELATED,
          exactCount: entry.exact.length,
          relatedCount: entry.related.length,
          evidence: [...entry.exact, ...entry.related],
          why: '',
        };
        card.why = evidenceWhy(card, target);
        return card;
      })
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'exact' ? -1 : 1;
        if (a.kind === 'exact' && b.exactCount !== a.exactCount) return b.exactCount - a.exactCount;
        if (b.relatedCount !== a.relatedCount) return b.relatedCount - a.relatedCount;
        return fallbackRank(a.topic.contentId) - fallbackRank(b.topic.contentId);
      });

    const cards = evidenceCards.slice(0, MAX_CARDS_PER_GROUP);
    for (const pick of fallback) {
      if (cards.length >= MAX_CARDS_PER_GROUP) break;
      const topic = topicsForGroup(group).find((item) => item.contentId === pick.contentId);
      if (!topic || !isOffered(topic) || cards.some((card) => card.topic.tag === topic.tag)) continue;
      cards.push({ topic, kind: 'fallback', label: LABEL_FALLBACK, why: pick.why, exactCount: 0, relatedCount: 0, evidence: [] });
    }
    groups[group] = cards;
  });

  return { groups, matchedReviewCount: { exact: exactReviews, related: relatedReviews } };
}

/* ----------------------------------------------------------------------------
 * Review form validation (mirrors the server function)
 * --------------------------------------------------------------------------*/

export interface ReviewDraft {
  company: string;
  program: string;
  position: string;
  review_type: ReviewType;
  review_text: string;
  source_note: string;
  topic_tags: string[];
}

export type ReviewDraftErrors = Partial<Record<keyof ReviewDraft, string>>;

export function validateReviewDraft(draft: ReviewDraft): ReviewDraftErrors {
  const errors: ReviewDraftErrors = {};
  const required: Array<keyof typeof REVIEW_FIELD_LIMITS> = ['company', 'program', 'review_text'];
  required.forEach((field) => {
    if (!String(draft[field] || '').trim()) errors[field] = 'Required.';
  });
  (Object.keys(REVIEW_FIELD_LIMITS) as Array<keyof typeof REVIEW_FIELD_LIMITS>).forEach((field) => {
    const limit = REVIEW_FIELD_LIMITS[field];
    if (String(draft[field] || '').trim().length > limit) errors[field] = `Keep this under ${limit} characters.`;
  });
  if (!REVIEW_TYPES.some((type) => type.id === draft.review_type)) errors.review_type = 'Choose a review type.';
  if (draft.topic_tags.length > MAX_REVIEW_TAGS) errors.topic_tags = `Choose at most ${MAX_REVIEW_TAGS} tags.`;
  if (draft.topic_tags.some((tag) => !isValidTopicTag(tag))) errors.topic_tags = 'One of the tags is not recognised.';
  return errors;
}

export function normalizeReviewRow(row: any): CandidateReview | null {
  const id = Number(row?.id);
  if (!Number.isFinite(id)) return null;
  const type = REVIEW_TYPES.some((item) => item.id === row?.review_type) ? row.review_type as ReviewType : 'other';
  const text = String(row?.review_text || '').trim();
  const company = String(row?.company || '').trim();
  const program = String(row?.program || '').trim();
  if (!text || !company || !program) return null;
  return {
    id,
    company,
    program,
    position: String(row?.position || '').trim() || null,
    review_type: type,
    review_text: text,
    source_note: String(row?.source_note || '').trim() || null,
    topic_tags: parseTopicTags(row?.topic_tags),
    created_at: row?.created_at ? String(row.created_at) : null,
    updated_at: row?.updated_at ? String(row.updated_at) : null,
  };
}
