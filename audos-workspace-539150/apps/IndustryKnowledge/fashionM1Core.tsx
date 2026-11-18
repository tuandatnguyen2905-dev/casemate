import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type FashionModule01VisualKind = `fashion-m1-${string}`;

export interface FashionM1Source { title: string; href: string; publisher: string; note?: string }
export interface FashionM1Narrative {
  label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact';
  text: string;
}
export interface FashionM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM1Narrative[];
  visualKind: FashionModule01VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  statsNote?: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: FashionM1Source[];
}
export interface FashionM1Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface FashionM1Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface FashionM1LessonBundle { deck: FashionM1CardData[]; quiz: FashionM1Question[]; takeaways: FashionM1Takeaways }

/**
 * Every entry points at the publishing organisation itself, so a learner can open
 * the original and check a figure against its own definition. Market sizes quoted
 * in this module are commercial estimates, not official statistics, and each card
 * repeats that caveat so a number is never quoted without its scope.
 */
export const FASHION_M1_SOURCES = {
  fortuneApparel: { title: 'Apparel Market Size, Share & Industry Analysis', href: 'https://www.fortunebusinessinsights.com/', publisher: 'Fortune Business Insights', note: 'Publisher of the global apparel estimate quoted here; check the category definition and base year in the report itself.' },
  grandViewSportswear: { title: 'Sportswear Market Size, Share & Trends Analysis Report', href: 'https://www.grandviewresearch.com/industry-analysis/sportswear-market', publisher: 'Grand View Research', note: 'Publisher of the global sportswear estimate; its definition may overlap the apparel total.' },
  kenVietnamApparel: { title: 'Vietnam Apparel Market Outlook', href: 'https://www.kenresearch.com/industry-reports/vietnam-apparel-market', publisher: 'Ken Research', note: 'Publisher of the Vietnam apparel estimate; a commercial estimate, not an official national statistic.' },
  gsoRetail: { title: 'Retail sales of goods and consumer services', href: 'https://www.nso.gov.vn/en/', publisher: 'National Statistics Office of Vietnam', note: 'Official national statistics. Covers the whole retail sector, not fashion and sports retail alone.' },
  moitEcommerce: { title: 'Vietnam E-commerce development reporting', href: 'https://moit.gov.vn/en/', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Official Vietnamese e-commerce reporting; confirm the measurement scope before formal use.' },
  bofStateOfFashion: { title: 'The State of Fashion', href: 'https://www.businessoffashion.com/', publisher: 'The Business of Fashion & McKinsey & Company', note: 'The standard annual industry report; the public reference for segment, channel and digital-shift framing.' },
  deloitteRetail: { title: 'Global Powers of Retailing and consumer industry research', href: 'https://www.deloitte.com/global/en.html', publisher: 'Deloitte', note: 'Annual ranking of the world’s largest retailers plus channel and format research.' },
  wtoTextiles: { title: 'Textiles and clothing: introduction to the trade rules', href: 'https://www.wto.org/english/tratop_e/texti_e/texintro_e.htm', publisher: 'World Trade Organization', note: 'Official account of the quota system and its phase-out, which reshaped global apparel sourcing.' },
  wtoStats: { title: 'World Trade Statistical Review', href: 'https://www.wto.org/english/res_e/statis_e/wts_e.htm', publisher: 'World Trade Organization', note: 'Official merchandise trade statistics, including clothing and textiles exports by economy.' },
  unctadTrade: { title: 'Trade analysis and global value chains', href: 'https://unctad.org/topic/trade-analysis', publisher: 'UNCTAD (United Nations Conference on Trade and Development)', note: 'UN analysis of how production and consumption divide across countries.' },
  iloGarment: { title: 'Textiles, clothing, leather and footwear sector', href: 'https://www.ilo.org/industries-and-sectors', publisher: 'International Labour Organization', note: 'UN agency coverage of the garment and footwear production base and its working conditions.' },
  emfFashion: { title: 'Fashion and the circular economy', href: 'https://www.ellenmacarthurfoundation.org/topics/fashion/overview', publisher: 'Ellen MacArthur Foundation', note: 'The reference framework for repair, resale, reuse and take-back models.' },
  worldBankVietnam: { title: 'Vietnam country overview and economic data', href: 'https://www.worldbank.org/en/country/vietnam', publisher: 'World Bank', note: 'Official macroeconomic context — income, consumption and growth — behind domestic retail demand.' },
  vietnamBriefing: { title: 'Vietnam retail, e-commerce and manufacturing coverage', href: 'https://www.vietnam-briefing.com/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Advisory analysis of the Vietnamese market; secondary coverage, so verify against official statistics.' },
} satisfies Record<string, FashionM1Source>;
export type FashionM1SourceId = keyof typeof FASHION_M1_SOURCES;
export const citeF1 = (...ids: FashionM1SourceId[]): FashionM1Source[] => ids.map((id) => FASHION_M1_SOURCES[id]);

export function F1DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {evidence ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
          <strong className="text-slate-800">Evidence note: </strong>{evidence}
        </p>
      ) : null}
    </div>
  );
}

export function f1Chapter(input: Omit<FashionM1CardData, 'concepts'>): FashionM1CardData {
  return { ...input, concepts: [] };
}

export function f1Quiz(prefix: string, seeds: DairyQuizSeed[]): FashionM1Question[] {
  return pairedQuiz(prefix, seeds) as FashionM1Question[];
}
