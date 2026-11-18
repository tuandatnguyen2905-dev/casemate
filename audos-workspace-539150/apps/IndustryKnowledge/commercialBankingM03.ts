import { CB_LESSON_31, CB_LESSON_32, CB_LESSON_33 } from './commercialBankingM03B01';
import { CB_LESSON_34, CB_LESSON_35, CB_LESSON_36 } from './commercialBankingM03B02';
import { COMMERCIAL_BANKING_REVIEW_STATUS } from './commercialBankingCore';
import type { BankingCardData } from './commercialBankingCore';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import { applyChapterVisualText, applyHeldVisualText } from './chapterVisualText';
import { CB_M3_HELD_KINDS, CB_M3_VISUALS } from './commercialBankingM03VisualSpecs';

export const COMMERCIAL_BANKING_MODULE03_STATUS = COMMERCIAL_BANKING_REVIEW_STATUS;
export const COMMERCIAL_BANKING_MODULE03_LESSONS = [
  { title: '3.1 Industry Business Models', description: 'Separate credit-led and fee-led engines; compare retail, corporate, universal, specialist and digital-first models.', takeaways: ['Identify the revenue engine first.', 'Connect models to funding, cost, risk and capital.', 'Judge risk-adjusted return, not scale alone.'] },
  { title: '3.2 Products, Services & Segmentation', description: 'Map products to customer jobs, classify income correctly and build segment-product profitability.', takeaways: ['Deposits, loans and services play different roles.', 'Compare net fees and distinguish bancassurance commissions.', 'Price is not profit.'] },
  { title: '3.3 Customer Segments & Needs', description: 'Understand customer groups, needs, coverage models and lifetime relationship economics.', takeaways: ['Segment by need and complexity.', 'Trust is part of the product.', 'Optimize risk-adjusted lifetime value.'] },
  { title: '3.4 Revenue Streams & Cost Structure', description: 'Calculate NII and NIM, trace the P&L waterfall and read bank financial statements correctly.', takeaways: ['NIM uses average earning assets.', 'Growth can be offset by funding and provisions.', 'Compare periods, bases and definitions.'] },
  { title: '3.5 Distribution & Sales Channels', description: 'Design omnichannel journeys and evaluate CAC, cost-to-serve, retention and relationship value.', takeaways: ['Channels are one coordinated system.', 'Physical and digital complement each other.', 'Measure completed journeys and total economics.'] },
  { title: '3.6 Industry Ecosystem & Stakeholders', description: 'Map the ecosystem, financial-stability interactions and the verified deposit-insurance boundary.', takeaways: ['Stability is layered.', 'Deposit insurance is capped.', 'Legal verification limits must remain visible.'] },
];
const BUNDLES = [CB_LESSON_31, CB_LESSON_32, CB_LESSON_33, CB_LESSON_34, CB_LESSON_35, CB_LESSON_36];
export const COMMERCIAL_BANKING_MODULE03_DECKS: Record<string, BankingCardData[]> = {};
export const COMMERCIAL_BANKING_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COMMERCIAL_BANKING_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = COMMERCIAL_BANKING_MODULE03_LESSONS[index].title;
  COMMERCIAL_BANKING_MODULE03_DECKS[key] = bundle.deck;
  COMMERCIAL_BANKING_MODULE03_QUIZZES[key] = bundle.quiz;
  COMMERCIAL_BANKING_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COMMERCIAL_BANKING_MODULE03_DECKS, CB_M3_VISUALS);
applyHeldVisualText(COMMERCIAL_BANKING_MODULE03_DECKS, CB_M3_HELD_KINDS);
