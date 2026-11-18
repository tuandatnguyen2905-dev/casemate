// Incremental coverage manifest for wave 2. One row per implemented curriculum in scope:
// 41 implemented, minus banking-commercial and banking-consumer-finance (a parallel task), leaves 39.
// Status uses the fixed vocabulary in types.ts. A curriculum is never Integrated until the later
// consolidation pass has registered it and the Practice & Review suites pass.

import { UNDERSIZED_ELIGIBLE_DECK_IDS } from './integrationManifest';
import { PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS, PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS, PROFESSIONAL_AUDIT_FLASHCARD_DECKS, PROFESSIONAL_AUDIT_MATCH_SORT_PACKS } from './professionalAudit';
import { EXCLUDED_CARDS, PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY } from './professionalAudit/chapterIntegrity';
import { PROFESSIONAL_AUDIT_SOURCE } from './professionalAudit/source';
import type { CoverageRow } from './types';

type Entry = [industryId: string, curriculum: string, group: string, wave: '2A' | '2B' | '2C' | '2D' | '2E', holdNote: string];

const NONE = 'None recorded in reviewHolds.ts at read time (absence of a hold does not verify a claim)';

export const WAVE2_SCOPE: Entry[] = [
  ['fmcg-beverages-na', 'Non-Alcoholic Beverages', 'FMCG & Consumer Goods', '2A', NONE],
  ['fmcg-beverages-alc', 'Beer & Alcoholic Beverages', 'FMCG & Consumer Goods', '2A', NONE],
  ['fmcg-packaged-food', 'Packaged Food & Confectionery', 'FMCG & Consumer Goods', '2A', 'Module 05 lesson Regulatory & Sustainability Trends is held (REV-P0-13)'],
  ['fmcg-dairy', 'Dairy', 'FMCG & Consumer Goods', '2A', 'None recorded; 31 chapter-title/content mismatches were previously reported and must be re-read, not inferred'],
  ['banking-fintech', 'Payments & Fintech', 'Banking & Financial Services', '2B', NONE],
  ['banking-insurance', 'Life Insurance', 'Banking & Financial Services', '2B', NONE],
  ['professional-consulting', 'Management & Technology Consulting', 'Professional & Business Services', '2B', NONE],
  ['professional-audit', 'Audit & Assurance', 'Professional & Business Services', '2B', 'REV-P0-10 holds Module 02, lesson Global vs. Local Value Chain, chapter 3; class D, excluded'],
  ['professional-advisory', 'Project & Construction Advisory', 'Professional & Business Services', '2B', 'REV-P0-05 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['tech-enterprise-sw', 'Enterprise Software & IT Services', 'Technology & Digital', '2C', NONE],
  ['tech-ecommerce', 'E-Commerce & Digital Marketplaces', 'Technology & Digital', '2C', NONE],
  ['tech-gaming', 'Gaming & Digital Entertainment', 'Technology & Digital', '2C', NONE],
  ['tech-adtech', 'Digital Marketing & AdTech', 'Technology & Digital', '2C', NONE],
  ['tech-social', 'Social & Communication Platforms', 'Technology & Digital', '2C', NONE],
  ['tech-telecom', 'Telecommunications & Connectivity', 'Technology & Digital', '2C', NONE],
  ['tech-electronics', 'Consumer Electronics & Semiconductors', 'Technology & Digital', '2C', NONE],
  ['mfg-electronics', 'Consumer Electronics & Appliances', 'Manufacturing & Engineering', '2D', NONE],
  ['mfg-machinery', 'Machinery & Power Tools', 'Manufacturing & Engineering', '2D', NONE],
  ['mfg-electrical', 'Electrical & Energy Equipment', 'Manufacturing & Engineering', '2D', 'REV-P0-08 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['mfg-textiles', 'Textiles & Apparel Manufacturing', 'Manufacturing & Engineering', '2D', 'REV-P0-16b holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['mfg-building', 'Building Materials & Coatings', 'Manufacturing & Engineering', '2D', 'REV-P0-16c holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['mfg-packaging', 'Packaging, Labels & Industrial Materials', 'Manufacturing & Engineering', '2D', 'REV-P0-16a holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['retail-fashion', 'Fashion, Sports & Lifestyle Retail', 'Retail & Commerce', '2D', NONE],
  ['retail-grocery', 'Grocery & General Merchandise Retail', 'Retail & Commerce', '2D', NONE],
  ['retail-pharmacy', 'Pharmacy Retail', 'Retail & Commerce', '2D', 'REV-P0-15 holds Module 05, Technology & Innovation Trends, one chapter'],
  ['retail-coffee', 'Coffeehouse & Foodservice Retail', 'Retail & Commerce', '2D', NONE],
  ['agri-livestock', 'Livestock & Animal Feed', 'Agribusiness', '2D', NONE],
  ['agri-commodities', 'Agricultural Commodities & Trading', 'Agribusiness', '2D', NONE],
  ['agri-crop', 'Crop Production & Agricultural Processing', 'Agribusiness', '2D', NONE],
  ['logistics-freight', 'Freight Forwarding & Ocean Logistics', 'Logistics & Supply Chain', '2E', 'REV-P0-07 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['logistics-contract', 'Contract Logistics & Warehousing', 'Logistics & Supply Chain', '2E', 'REV-P0-16d holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['logistics-express', 'Express & Last-Mile Delivery', 'Logistics & Supply Chain', '2E', 'REV-P0-16e holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['logistics-distribution', 'Distribution & Market Expansion Services', 'Logistics & Supply Chain', '2E', 'REV-P0-06 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['realestate-development', 'Property Development & Investment', 'Real Estate & PropTech', '2E', 'REV-P0-03a/b/c hold chapters in Modules 01, 02 and 05'],
  ['realestate-advisory', 'Property Advisory & Management', 'Real Estate & PropTech', '2E', 'REV-P0-04a/b hold chapters in Modules 01 and 05'],
  ['realestate-proptech', 'Property Technology & Marketplaces', 'Real Estate & PropTech', '2E', NONE],
  ['hospitality-hotels', 'Hotels & Resorts', 'Hospitality & Foodservice', '2E', 'REV-P0-01 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['hospitality-restaurants', 'Restaurant Chains', 'Hospitality & Foodservice', '2E', 'REV-P0-02 holds Module 05, Regulatory & Sustainability Trends, one chapter'],
  ['healthcare-products', 'Healthcare Products & Nutrition', 'Healthcare & Life Sciences', '2E', 'REV-P0-09 holds Module 02, Upstream Activities, one chapter'],
];

const cards = PROFESSIONAL_AUDIT_FLASHCARD_DECKS;
const eligibleCards = PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.reduce((sum, deck) => sum + deck.cards.length, 0);
const activities = PROFESSIONAL_AUDIT_MATCH_SORT_PACKS.flatMap((pack) => pack.activities);
const eligibleActivities = PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS.flatMap((pack) => pack.activities);
const count = (kind: string) => PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.filter((row) => row.integrity === kind).length;

export const PROFESSIONAL_AUDIT_ROW: CoverageRow = {
  industryId: 'professional-audit',
  curriculum: 'Audit & Assurance',
  group: 'Professional & Business Services',
  status: 'Blocked by Source or Review Hold',
  totalLessons: PROFESSIONAL_AUDIT_SOURCE.reduce((sum, module) => sum + module.lessons.length, 0),
  lessonsInspected: PROFESSIONAL_AUDIT_SOURCE.reduce((sum, module) => sum + module.lessons.length, 0),
  lessonsWithFlashcards: PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.length,
  totalCards: eligibleCards,
  lessonsWithMatchSort: new Set(eligibleActivities.map((activity) => `${activity.sourceRefs[0].sourceModuleKey}::${activity.sourceRefs[0].lessonTitle}`)).size,
  totalActivities: eligibleActivities.length,
  sourceMapping: `All 90 chapters classified against the live curriculum (professionalAudit/chapterIntegrity.ts): ${count('A')} A Fully Aligned, ${count('B')} B Partially Aligned, ${count('C')} C Misaligned, ${count('D')} D Restricted/Unverifiable. 10 lessons show another lesson\u2019s material. Content-owner remediation list: reports/audit-assurance-source-integrity-2026-11-08.md.`,
  contentQuality: `Of ${cards.reduce((sum, deck) => sum + deck.cards.length, 0)} authored cards, ${eligibleCards} passed review on A/B chapters and are eligible; ${Object.keys(EXCLUDED_CARDS).length} are excluded (C/D chapter, example or explanation beyond the text, generic prompt, near-duplicate). All ${activities.length} activities are excluded (hints leaking answers, overlapping categories, a list shown as stages, or a C chapter). Totals in this row count eligible content only.`,
  reviewHold: 'REV-P0-10 (Module 02, Global vs. Local Value Chain, chapter 3) is class D and never cited. Module 01 Vietnam Market Overview chapter 4 is also D (its substance is unverifiable legal-status claims). No other hold.',
  testsExecuted: 'Executed 2026-11-08 against a byte-verified mirror of the saved Draft source and the live module graph: __tests__/chapterIntegrity.test.ts 9/9, __tests__/professionalAudit.test.ts 13/13, __tests__/validators.test.ts 17/17.',
  remaining: `Not integrated. Only PROFESSIONAL_AUDIT_ELIGIBLE_* may be registered; ${UNDERSIZED_ELIGIBLE_DECK_IDS.length} eligible decks have fewer than 4 cards and ${PROFESSIONAL_AUDIT_FLASHCARD_DECKS.length - PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.length} lessons have no eligible card until the curriculum is corrected and re-classified.`,
};

export const WAVE2_COVERAGE: CoverageRow[] = WAVE2_SCOPE.map(([industryId, curriculum, group, wave, hold]) => (industryId === 'professional-audit' ? PROFESSIONAL_AUDIT_ROW : {
  industryId, curriculum, group,
  status: 'Not Started' as const,
  totalLessons: 27, lessonsInspected: 0, lessonsWithFlashcards: 0, totalCards: 0, lessonsWithMatchSort: 0, totalActivities: 0,
  sourceMapping: 'Not started',
  contentQuality: 'Not started',
  reviewHold: hold,
  testsExecuted: 'None',
  remaining: `All 27 lessons (wave ${wave}).`,
}));
