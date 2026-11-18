import { CB_LESSON_11, CB_LESSON_12 } from './commercialBankingM01B1';
import { CB_LESSON_13, CB_LESSON_14 } from './commercialBankingM01B2';
import { CB_LESSON_15 } from './commercialBankingM01B3';
import { COMMERCIAL_BANKING_REVIEW_STATUS } from './commercialBankingCore';
import type { BankingCardData } from './commercialBankingCore';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import { applyChapterVisualText, applyHeldVisualText } from './chapterVisualText';
import { CB_M1_VISUALS, CB_M1_HELD_KINDS } from './commercialBankingM01VisualSpecs';

export const COMMERCIAL_BANKING_MODULE01_STATUS = COMMERCIAL_BANKING_REVIEW_STATUS;

export const COMMERCIAL_BANKING_MODULE01_LESSONS = [
  { title: '1.1 Industry Definition & Scope', description: 'Define commercial banking, its balance-sheet mechanics, boundaries, products and customer groups.', takeaways: ['Commercial banks connect deposits, credit and payments.', 'Liquidity and maturity transformation create value and fragility.', 'Licence, funding and risk define the industry boundary.'] },
  { title: '1.2 Industry History & Development', description: 'Follow the emergence of modern institutions, crisis regulation, digital banking and Vietnam’s two-tier system.', takeaways: ['Modern banking combines private intermediation with public stability architecture.', 'Crises shaped capital, liquidity and resolution rules.', 'Vietnam’s system reflects reform, opening and restructuring.'] },
  { title: '1.3 Global Market Overview', description: 'Read global scale, assets, credit, deposits, performance metrics, major institutions and financial-stability safeguards.', takeaways: ['Asset size is not profit or safety.', 'Stocks, flows and income must stay distinct.', 'NIM, ROA, ROE, NPL and CAR answer different questions.'] },
  { title: '1.4 Vietnam Market Overview', description: 'Understand Vietnam’s banking depth, demand, regulatory structure, major banks and digital transformation.', takeaways: ['Vietnam is a bank-dominated, policy-shaped system.', 'Major banks follow different ownership and competitive models.', 'Digital reach must be matched by asset quality and trust.'] },
  { title: '1.5 Industry Drivers & External Factors', description: 'Trace economic, regulatory, social, technology and sustainability forces into banking outcomes.', takeaways: ['Drivers move demand, margin, credit quality and risk.', 'Regulation defines the feasible set for bank strategy.', 'Growth, trust and resilience must advance together.'] },
];

const BUNDLES = [CB_LESSON_11, CB_LESSON_12, CB_LESSON_13, CB_LESSON_14, CB_LESSON_15];
export const COMMERCIAL_BANKING_MODULE01_DECKS: Record<string, BankingCardData[]> = {};
export const COMMERCIAL_BANKING_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COMMERCIAL_BANKING_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = COMMERCIAL_BANKING_MODULE01_LESSONS[index].title;
  COMMERCIAL_BANKING_MODULE01_DECKS[key] = bundle.deck;
  COMMERCIAL_BANKING_MODULE01_QUIZZES[key] = bundle.quiz;
  COMMERCIAL_BANKING_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COMMERCIAL_BANKING_MODULE01_DECKS, CB_M1_VISUALS);
applyHeldVisualText(COMMERCIAL_BANKING_MODULE01_DECKS, CB_M1_HELD_KINDS);
