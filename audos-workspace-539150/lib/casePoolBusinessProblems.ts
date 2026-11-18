/**
 * casePoolBusinessProblems.ts - the "Business problem" filter in the Case Pool library.
 *
 * Every selectable full case was read (brief + task) and given one primary problem type
 * from its central decision. Cases whose brief names no single business decision are
 * listed in CASE_POOL_BUSINESS_PROBLEM_REVIEW instead of being forced into a category;
 * the library shows them under "All cases" only.
 *
 * This tag is separate from FullCase.type, which Case Room history, recommendations and
 * saved drill-log rows still use, and from FullCase.skill_focus, which grading and
 * Case Drill links use. A case id missing from both lists is reported by
 * unclassifiedPoolCaseIds() so new cases are tagged on purpose.
 */

import type { CaseDifficulty } from './caseLibraryShared';
import type { FullCase } from './casePoolLibrary';

export type BusinessProblem =
  | 'profitability'
  | 'growth'
  | 'market-entry'
  | 'pricing'
  | 'operations'
  | 'investment'
  | 'competitive-response'
  | 'mna';

/** Display order of the filter chips. */
export const BUSINESS_PROBLEMS: Array<{ id: BusinessProblem; label: string; description: string }> = [
  { id: 'profitability', label: 'Profitability', description: 'Find why profit or margin is falling, or where profit really comes from, and fix it.' },
  { id: 'growth', label: 'Growth', description: 'Grow revenue through new customers, segments, channels, products or sites, or better retention.' },
  { id: 'market-entry', label: 'Market Entry', description: 'Decide whether, where or how to enter a new country, province, location or channel.' },
  { id: 'pricing', label: 'Pricing', description: 'Set or change a price, pass a cost increase through, or decide on a discount, coupon or promotion.' },
  { id: 'operations', label: 'Operations', description: 'Fix capacity, process, network, sourcing, inventory or service-quality problems.' },
  { id: 'investment', label: 'Investment & Portfolio', description: 'Allocate limited capital across business units, projects or portfolios.' },
  { id: 'competitive-response', label: 'Competitive Response', description: 'Respond to a competitor that threatens share or price.' },
  { id: 'mna', label: 'M&A', description: 'Value an acquisition or deliver the synergies a deal promised.' },
];

const CASES_BY_PROBLEM: Record<BusinessProblem, string[]> = {
  'profitability': [
    'case-cm-calc-h05', 'case-cm-calc-e05', 'case-cm-calc-h08', 'case-structures-easy-001',
    'case-structures-easy-009', 'case-structures-easy-017', 'case-structures-easy-025', 'case-structures-easy-033',
    'case-001', 'case-002', 'case-003', 'case-006', 'case-007', 'case-012', 'case-013', 'case-016', 'case-018',
    'case-021', 'case-022', 'case-097', 'case-099',
  ],
  'growth': [
    'case-cm-cre-pd01', 'case-cm-cre-pd02', 'case-cm-cre-pd03', 'case-cm-cre-pd04', 'case-cm-cre-pd05',
    'case-cm-cre-pd06', 'case-cm-cre-pd07', 'case-cm-cre-pd08', 'case-cm-cre-pd09', 'case-cm-cre-pd10',
    'case-cm-cre-im01', 'case-cm-cre-im02', 'case-cm-cre-im03', 'case-cm-cre-im04', 'case-cm-cre-im05',
    'case-cm-cre-im06', 'case-cm-cre-im07', 'case-cm-cre-im08', 'case-cm-cre-im09', 'case-cm-cre-im10',
    'case-cm-cre-ar01', 'case-cm-cre-ar02', 'case-cm-cre-ar03', 'case-cm-cre-ar04', 'case-cm-cre-ar05',
    'case-cm-cre-ar06', 'case-cm-cre-ar07', 'case-cm-cre-ar08', 'case-cm-cre-ar09', 'case-cm-cre-ar10',
    'case-cm-calc-e01', 'case-cm-calc-h03', 'case-cm-calc-e03', 'case-cm-calc-h11', 'case-cm-calc-e11',
    'case-structures-easy-005', 'case-structures-easy-006', 'case-structures-easy-013', 'case-structures-easy-021',
    'case-structures-easy-022', 'case-structures-easy-029', 'case-structures-easy-030', 'case-jrn-16', 'case-jrn-21',
    'case-004', 'case-009', 'case-019', 'case-024', 'case-027', 'case-028', 'case-032', 'case-033', 'case-037',
    'case-038', 'case-042', 'case-043', 'case-047', 'case-048',
  ],
  'market-entry': [
    'case-cm-calc-h12', 'case-cm-calc-e12', 'case-structures-easy-003', 'case-structures-easy-011',
    'case-structures-easy-019', 'case-structures-easy-027', 'case-026', 'case-030', 'case-031', 'case-035',
    'case-036', 'case-040', 'case-041', 'case-045', 'case-046', 'case-050',
  ],
  'pricing': [
    'case-cm-calc-h01', 'case-cm-calc-h02', 'case-cm-calc-e02', 'case-cm-calc-e04', 'case-cm-calc-h10',
    'case-cm-calc-e10', 'case-010', 'case-015', 'case-025', 'case-029', 'case-034', 'case-039', 'case-044',
    'case-049', 'case-096',
  ],
  'operations': [
    'case-cm-calc-h06', 'case-cm-calc-e06', 'case-cm-calc-h07', 'case-cm-calc-e07', 'case-cm-calc-e08',
    'case-cm-calc-h09', 'case-cm-calc-e09', 'case-structures-easy-002', 'case-structures-easy-007',
    'case-structures-easy-010', 'case-structures-easy-015', 'case-structures-easy-018', 'case-structures-easy-023',
    'case-structures-easy-026', 'case-structures-easy-031', 'case-structures-easy-034', 'case-jrn-12', 'case-051',
    'case-052', 'case-054', 'case-055', 'case-057', 'case-058', 'case-060', 'case-061', 'case-063', 'case-064',
    'case-066', 'case-067', 'case-069', 'case-070',
  ],
  'investment': [
    'case-structures-easy-008', 'case-structures-easy-016', 'case-structures-easy-024', 'case-structures-easy-032',
    'case-072', 'case-073', 'case-075', 'case-076', 'case-078', 'case-079', 'case-081', 'case-082', 'case-084',
    'case-085',
  ],
  'competitive-response': [
    'case-071', 'case-074', 'case-077', 'case-080', 'case-083',
  ],
  'mna': [
    'case-structures-easy-004', 'case-structures-easy-012', 'case-structures-easy-020', 'case-structures-easy-028',
    'case-086', 'case-088', 'case-089', 'case-091', 'case-092', 'case-094', 'case-095',
  ],
};

/** Cases with no single business decision, grouped by the content fix they need before they can be tagged. */
export const CASE_POOL_BUSINESS_PROBLEM_REVIEW: Array<{ reason: string; caseIds: string[] }> = [
  {
    reason: "Estimation exercise: the brief asks for a market size and names no client decision.",
    caseIds: [
      'case-cm-ms-a01', 'case-cm-ms-a02', 'case-cm-ms-a03', 'case-cm-ms-a04', 'case-cm-ms-a05', 'case-cm-ms-a06',
      'case-cm-ms-a07', 'case-cm-ms-a08', 'case-cm-ms-a09', 'case-cm-ms-a10', 'case-cm-ms-a11', 'case-cm-ms-a12',
      'case-cm-ms-b01', 'case-cm-ms-b02', 'case-cm-ms-b03', 'case-cm-ms-b04', 'case-cm-ms-b05', 'case-cm-ms-b06',
      'case-cm-ms-b07', 'case-cm-ms-b08', 'case-cm-ms-b09', 'case-cm-ms-b10', 'case-cm-ms-b11', 'case-cm-ms-b12',
      'case-cm-ms-c01', 'case-cm-ms-c02', 'case-cm-ms-c03', 'case-cm-ms-c04', 'case-cm-ms-c05', 'case-cm-ms-c06',
      'case-cm-ms-c07', 'case-cm-ms-c08', 'case-cm-ms-d01', 'case-cm-ms-d02', 'case-cm-ms-d03', 'case-cm-ms-d04',
      'case-cm-ms-d05', 'case-cm-ms-d06', 'case-cm-ms-d07', 'case-cm-ms-d08', 'case-cm-ms-e01', 'case-cm-ms-e02',
      'case-cm-ms-e03', 'case-cm-ms-e04', 'case-cm-ms-e05', 'case-cm-ms-e06', 'case-cm-ms-e07', 'case-cm-ms-e08',
    ],
  },
  {
    reason: "Message brief: the task is a campaign idea and message with a comprehension test, not a commercial decision.",
    caseIds: [
      'case-cm-cre-bi01', 'case-cm-cre-bi02', 'case-cm-cre-bi03', 'case-cm-cre-bi04', 'case-cm-cre-bi05',
      'case-cm-cre-bi06', 'case-cm-cre-bi07', 'case-cm-cre-bi08', 'case-cm-cre-bi09', 'case-cm-cre-bi10',
    ],
  },
  {
    reason: "Cohort calculation with no stated management decision.",
    caseIds: [
      'case-cm-calc-h04',
    ],
  },
  {
    reason: "Chart-reading drill: the decision is one line of context, the task asks for a chart reading, and the exhibit often does not bear on that decision.",
    caseIds: [
      'case-e-ch-001', 'case-e-ch-002', 'case-e-ch-003', 'case-e-ch-004', 'case-e-ch-005', 'case-e-ch-006',
      'case-e-ch-007', 'case-e-ch-008', 'case-e-ch-009', 'case-e-ch-010', 'case-e-ch-011', 'case-e-ch-012',
      'case-e-ch-013', 'case-e-ch-014', 'case-e-ch-015', 'case-e-ch-016', 'case-e-ch-017', 'case-e-ch-018',
      'case-e-ch-019', 'case-e-ch-020', 'case-e-ch-021', 'case-e-ch-022', 'case-e-ch-023', 'case-e-ch-024',
      'case-e-ch-025', 'case-e-ch-026', 'case-e-ch-044', 'case-e-ch-045', 'case-e-ch-046', 'case-e-ch-047',
      'case-e-ch-048', 'case-e-ch-049', 'case-e-ch-050', 'case-e-ch-051', 'case-e-ch-052', 'case-e-ch-053',
      'case-e-ch-054', 'case-e-ch-055', 'case-e-ch-056', 'case-e-ch-057', 'case-e-ch-058', 'case-e-ch-059',
      'case-e-ch-060', 'case-e-ch-061', 'case-e-ch-062', 'case-e-ch-063', 'case-e-ch-064', 'case-e-ch-065',
      'case-e-ch-066', 'case-e-ch-067', 'case-e-ch-068',
    ],
  },
  {
    reason: "Unclear who the contract farmers are (suppliers or customers), so it could be Operations or Growth.",
    caseIds: [
      'case-structures-easy-014',
    ],
  },
];

const PROBLEM_BY_CASE = new Map<string, BusinessProblem>(
  (Object.keys(CASES_BY_PROBLEM) as BusinessProblem[]).flatMap((problem) => CASES_BY_PROBLEM[problem].map((id) => [id, problem] as const)),
);
const REVIEW_CASE_IDS = new Set(CASE_POOL_BUSINESS_PROBLEM_REVIEW.flatMap((group) => group.caseIds));

export function businessProblemForCase(caseId: string | null | undefined): BusinessProblem | null {
  return PROBLEM_BY_CASE.get(String(caseId || '')) || null;
}

export function businessProblemLabel(problem: BusinessProblem | null | undefined): string {
  return BUSINESS_PROBLEMS.find((item) => item.id === problem)?.label || '';
}

/** Chips to show: only problems that at least one of these cases carries, in display order. */
export function businessProblemsPresent(cases: Array<Pick<FullCase, 'id'>>): BusinessProblem[] {
  const present = new Set(cases.map((item) => businessProblemForCase(item.id)).filter(Boolean));
  return BUSINESS_PROBLEMS.map((item) => item.id).filter((id) => present.has(id));
}

/** Selectable cases that are neither tagged nor listed for review. Should be empty. */
export function unclassifiedPoolCaseIds(cases: Array<Pick<FullCase, 'id'>>): string[] {
  return cases.map((item) => item.id).filter((id) => !PROBLEM_BY_CASE.has(id) && !REVIEW_CASE_IDS.has(id));
}

export type EstimatedTimeFilter = 'all' | 'under-25' | '25-30' | '30-plus';
export type CompletionFilter = 'all' | 'not-started' | 'opened' | 'completed';

export interface PoolFilters {
  query: string;
  industry: string;
  businessProblem: BusinessProblem | 'all';
  /** 'off' ignores Creativity; 'all' keeps only Creativity cases; a category keeps that category. */
  creativity: string;
  /** 'off' ignores Market Sizing; 'all' keeps only Market Sizing cases; a format keeps that format. */
  marketSizing: string;
  difficulty: CaseDifficulty | 'all';
  estimatedTime: EstimatedTimeFilter;
  completion: CompletionFilter;
}

export const DEFAULT_POOL_FILTERS: PoolFilters = {
  query: '',
  industry: 'all',
  businessProblem: 'all',
  creativity: 'off',
  marketSizing: 'off',
  difficulty: 'all',
  estimatedTime: 'all',
  completion: 'all',
};

export function isDefaultPoolFilters(filters: PoolFilters): boolean {
  return (Object.keys(DEFAULT_POOL_FILTERS) as Array<keyof PoolFilters>).every((key) =>
    key === 'query' ? !filters.query.trim() : filters[key] === DEFAULT_POOL_FILTERS[key],
  );
}

/** Strip diacritics so accent-free typing still finds cases. */
export function normalizeSearchText(value: string): string {
  const lowered = String(value || '').toLowerCase().normalize('NFD');
  let out = '';
  for (const ch of lowered) {
    const code = ch.codePointAt(0) || 0;
    if (code >= 0x0300 && code <= 0x036f) continue;
    out += ch === 'đ' ? 'd' : ch;
  }
  return out.trim();
}

type FilterableCase = Pick<FullCase, 'id' | 'title' | 'situation' | 'key_question' | 'objective' | 'tags' | 'industry' | 'difficulty' | 'estimated_minutes' | 'creativity_category' | 'market_sizing_format'>;

export function filterPoolCases<T extends FilterableCase>(
  cases: T[],
  filters: PoolFilters,
  progress: { completedIds: Set<string>; openedIds: Set<string> },
): T[] {
  const tokens = normalizeSearchText(filters.query).split(' ').filter(Boolean);
  return cases.filter((item) => {
    // Creativity cases keep an internal compatibility difficulty, so a difficulty filter never matches them.
    if (filters.difficulty !== 'all' && (item.creativity_category || item.difficulty !== filters.difficulty)) return false;
    if (filters.industry !== 'all' && item.industry !== filters.industry) return false;
    if (filters.businessProblem !== 'all' && businessProblemForCase(item.id) !== filters.businessProblem) return false;
    if (filters.creativity === 'all' && !item.creativity_category) return false;
    if (filters.creativity !== 'off' && filters.creativity !== 'all' && item.creativity_category !== filters.creativity) return false;
    if (filters.marketSizing === 'all' && !item.market_sizing_format) return false;
    if (filters.marketSizing !== 'off' && filters.marketSizing !== 'all' && item.market_sizing_format !== filters.marketSizing) return false;
    const minutes = item.estimated_minutes || 25;
    if (filters.estimatedTime === 'under-25' && minutes >= 25) return false;
    if (filters.estimatedTime === '25-30' && (minutes < 25 || minutes > 30)) return false;
    if (filters.estimatedTime === '30-plus' && minutes < 30) return false;
    const isCompleted = progress.completedIds.has(item.id);
    const isOpened = progress.openedIds.has(item.id);
    if (filters.completion === 'completed' && !isCompleted) return false;
    if (filters.completion === 'opened' && (!isOpened || isCompleted)) return false;
    if (filters.completion === 'not-started' && (isOpened || isCompleted)) return false;
    if (tokens.length === 0) return true;
    const haystack = normalizeSearchText(
      [item.title, item.situation, item.key_question, item.objective || '', (item.tags || []).join(' ')].join(' '),
    );
    return tokens.every((token) => haystack.includes(token));
  });
}
