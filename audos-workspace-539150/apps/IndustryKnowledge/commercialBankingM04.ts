import { CB_LESSON_41, CB_LESSON_42, CB_LESSON_43 } from './commercialBankingM04B03';
import { CB_LESSON_44, CB_LESSON_45 } from './commercialBankingM04B04';
import { COMMERCIAL_BANKING_REVIEW_STATUS } from './commercialBankingCore';
import { applyChapterVisualText, applyHeldVisualText } from './chapterVisualText';
import { CB_M4_HELD_KINDS, CB_M4_VISUALS } from './commercialBankingM04VisualSpecs';
import type { BankingCardData } from './commercialBankingCore';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export const COMMERCIAL_BANKING_MODULE04_STATUS = COMMERCIAL_BANKING_REVIEW_STATUS;
export const COMMERCIAL_BANKING_MODULE04_LESSONS = [
  { title: '4.1 Industry Competition Structure', description: 'Map bank rivalry, apply Five Forces and understand why trust, funding and capital are hard to copy.', takeaways: ['Competition spans funding, lending and activity.', 'Entry barriers do not remove substitutes.', 'Bank moats are capability systems.'] },
  { title: '4.2 Key Industry Players', description: 'Profile global and Vietnam banks by model, scope and evidence without unsupported rankings.', takeaways: ['Scale is context, not quality.', 'Positioning is multidimensional.', 'Every share needs scope and date.'] },
  { title: '4.3 Competitor Benchmarking', description: 'Build a fourteen-metric benchmark, preserve Data Not Verified fields and interpret trade-offs.', takeaways: ['Create a data dictionary first.', 'Keep mismatched evidence out.', 'Avoid single-metric winners.'] },
  { title: '4.4 Key Success Factors', description: 'Link funding, asset quality, capital, efficiency, distribution, innovation and trust to outcomes.', takeaways: ['Capabilities work as a system.', 'Efficiency needs investment context.', 'Trust converts innovation into franchise value.'] },
  { title: '4.5 SWOT & Strategic Challenges', description: 'Build evidence-led SWOTs, trace compound risks and design responses with KPI guardrails.', takeaways: ['Separate internal and external.', 'Trace risk transmission.', 'Pair actions with measures and guardrails.'] },
];
const BUNDLES = [CB_LESSON_41, CB_LESSON_42, CB_LESSON_43, CB_LESSON_44, CB_LESSON_45];
export const COMMERCIAL_BANKING_MODULE04_DECKS: Record<string, BankingCardData[]> = {};
export const COMMERCIAL_BANKING_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COMMERCIAL_BANKING_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = COMMERCIAL_BANKING_MODULE04_LESSONS[index].title;
  COMMERCIAL_BANKING_MODULE04_DECKS[key] = bundle.deck;
  COMMERCIAL_BANKING_MODULE04_QUIZZES[key] = bundle.quiz;
  COMMERCIAL_BANKING_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COMMERCIAL_BANKING_MODULE04_DECKS, CB_M4_VISUALS);
applyHeldVisualText(COMMERCIAL_BANKING_MODULE04_DECKS, CB_M4_HELD_KINDS);
