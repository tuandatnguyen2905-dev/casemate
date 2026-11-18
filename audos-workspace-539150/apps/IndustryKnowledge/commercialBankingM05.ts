import { CB_LESSON_51, CB_LESSON_52 } from './commercialBankingM05B01';
import { CB_LESSON_53, CB_LESSON_54, COMMERCIAL_BANKING_LESSON54_STATUS } from './commercialBankingM05B02';
import { CB_LESSON_55 } from './commercialBankingM05B03';
import { COMMERCIAL_BANKING_REVIEW_STATUS } from './commercialBankingCore';
import type { BankingCardData } from './commercialBankingCore';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import { applyChapterVisualText, applyHeldVisualText } from './chapterVisualText';
import { CB_M5_HELD_KINDS, CB_M5_VISUALS } from './commercialBankingM05VisualSpecs';

export const COMMERCIAL_BANKING_MODULE05_STATUS = COMMERCIAL_BANKING_REVIEW_STATUS;
export const COMMERCIAL_BANKING_MODULE05_LEGAL_STATUS = COMMERCIAL_BANKING_LESSON54_STATUS;

export const COMMERCIAL_BANKING_MODULE05_LESSONS = [
  { title: '5.1 Consumer Trends', description: 'Understand how digital-first behaviour, trust, inclusion, and distinct household, SME, and corporate needs reshape banking.' },
  { title: '5.2 Technology & Innovation Trends', description: 'Explore operating-model transformation, governed AI, data analytics, APIs, and emerging financial ecosystems.' },
  { title: '5.3 Market & Channel Trends', description: 'Follow the shift toward mobile, hybrid, and ecosystem distribution and connect it to banking relationship economics.' },
  { title: '5.4 Regulatory & Sustainability Trends', description: 'Under review — the legal and regulatory detail in this lesson is being verified against primary texts.' },
  { title: '5.5 Growth Outlook & Strategic Opportunities', description: 'Interpret the outlook, prioritise growth spaces, and practise risk-adjusted strategic choices for banks.' },
];

const BUNDLES = [CB_LESSON_51, CB_LESSON_52, CB_LESSON_53, CB_LESSON_54, CB_LESSON_55];
export const COMMERCIAL_BANKING_MODULE05_DECKS: Record<string, BankingCardData[]> = {};
export const COMMERCIAL_BANKING_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COMMERCIAL_BANKING_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = COMMERCIAL_BANKING_MODULE05_LESSONS[index].title;
  COMMERCIAL_BANKING_MODULE05_DECKS[key] = bundle.deck;
  COMMERCIAL_BANKING_MODULE05_QUIZZES[key] = bundle.quiz;
  COMMERCIAL_BANKING_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COMMERCIAL_BANKING_MODULE05_DECKS, CB_M5_VISUALS);
applyHeldVisualText(COMMERCIAL_BANKING_MODULE05_DECKS, CB_M5_HELD_KINDS);
