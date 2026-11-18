import { CB_LESSON_21, CB_LESSON_22, CB_LESSON_23 } from './commercialBankingM02B4';
import { CB_LESSON_24, CB_LESSON_25, CB_LESSON_26 } from './commercialBankingM02B5';
import { COMMERCIAL_BANKING_REVIEW_STATUS } from './commercialBankingCore';
import { CB_M2_HELD_KINDS, CB_M2_VISUALS } from './commercialBankingM02VisualSpecs';
import { applyChapterVisualText, applyHeldVisualText } from './chapterVisualText';
import type { BankingCardData } from './commercialBankingCore';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export const COMMERCIAL_BANKING_MODULE02_STATUS = COMMERCIAL_BANKING_REVIEW_STATUS;

export const COMMERCIAL_BANKING_MODULE02_LESSONS = [
  { title: '2.1 Value Chain Overview', description: 'Map funding, intermediation, service, revenue and risk, then follow money, information and risk through the system.', takeaways: ['Funding is the financial input.', 'Risk and regulation span every stage.', 'Flows, balances and revenue must stay distinct.'] },
  { title: '2.2 Upstream Activities', description: 'Understand deposits, wholesale funding, CASA, weighted cost of funds, liquidity, ALM and regulatory capital.', takeaways: ['Funding mix drives cost and resilience.', 'CASA supports NIM but not guaranteed profit.', 'Funding cost, liquidity and solvency are separate questions.'] },
  { title: '2.3 Midstream Activities', description: 'Follow underwriting, Vietnam’s five debt groups, NPLs, provisions, collections, write-offs and recovery.', takeaways: ['Credit quality is produced across the lifecycle.', 'NPL equals Groups 3–5.', 'Exact DPD bands and provision rates remain restricted.'] },
  { title: '2.4 Downstream Activities', description: 'Compare service channels, retail or SME or corporate relationships and the digital customer journey.', takeaways: ['Channels work as one relationship.', 'Segment service models differ.', 'Reliable completion and recovery define digital experience.'] },
  { title: '2.5 Inputs, Outputs & Value Creation', description: 'Classify banking inputs and outputs, calculate NII and NIM, and build a profitability waterfall.', takeaways: ['NIM equals NII divided by average earning assets.', 'NIM is not a simple spread.', 'Costs and credit risk determine what profit survives.'] },
  { title: '2.6 Global vs. Local Value Chain', description: 'Compare global and Vietnam operations, localise the chain and explain stability or resolution safely.', takeaways: ['Global groups operate through local entities.', 'Vietnam adds credit room and intense CASA competition.', 'Historical zero-dong acquisitions are not an automatic current response.'] },
];

const BUNDLES = [CB_LESSON_21, CB_LESSON_22, CB_LESSON_23, CB_LESSON_24, CB_LESSON_25, CB_LESSON_26];
export const COMMERCIAL_BANKING_MODULE02_DECKS: Record<string, BankingCardData[]> = {};
export const COMMERCIAL_BANKING_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COMMERCIAL_BANKING_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = COMMERCIAL_BANKING_MODULE02_LESSONS[index].title;
  COMMERCIAL_BANKING_MODULE02_DECKS[key] = bundle.deck;
  COMMERCIAL_BANKING_MODULE02_QUIZZES[key] = bundle.quiz;
  COMMERCIAL_BANKING_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COMMERCIAL_BANKING_MODULE02_DECKS, CB_M2_VISUALS);
applyHeldVisualText(COMMERCIAL_BANKING_MODULE02_DECKS, CB_M2_HELD_KINDS);
