import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type FashionModule02VisualKind = `fashion-m2-${string}`;

export interface FashionM2Source { title: string; href: string; publisher: string; note?: string }
export interface FashionM2Narrative {
  label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact';
  text: string;
}
export interface FashionM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: FashionModule02VisualKind;
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
  sources: FashionM2Source[];
}
export interface FashionM2Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface FashionM2Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface FashionM2LessonBundle { deck: FashionM2CardData[]; quiz: FashionM2Question[]; takeaways: FashionM2Takeaways }

/**
 * Every entry points at the publishing organisation itself, so a learner can open
 * the original and check a claim against its own definition. The value-chain
 * material in this module is structural rather than statistical: where a chapter
 * has no measured figure, it says so instead of supplying one.
 */
export const FASHION_M2_SOURCES = {
  wtoValueChain: { title: 'Value chain \u2014 WTO glossary', href: 'https://www.wto.org/english/thewto_e/glossary_e/value_chain_e.htm', publisher: 'World Trade Organization', note: 'The official definition of a value chain used in trade analysis.' },
  wtoTextiles: { title: 'Textiles and clothing: introduction to the trade rules', href: 'https://www.wto.org/english/tratop_e/texti_e/texintro_e.htm', publisher: 'World Trade Organization', note: 'Official account of the quota system and its phase-out, which shaped where apparel is made.' },
  unctadTrade: { title: 'Trade analysis and global value chains', href: 'https://unctad.org/topic/trade-analysis', publisher: 'UNCTAD (United Nations Conference on Trade and Development)', note: 'UN analysis of how production stages and value capture divide across countries.' },
  unctadMaritime: { title: 'Review of Maritime Transport', href: 'https://unctad.org/topic/transport-and-trade-logistics/review-of-maritime-transport', publisher: 'UNCTAD', note: 'Official reference on freight rates, shipping capacity and trade logistics cost.' },
  worldBankLpi: { title: 'Logistics Performance Index', href: 'https://lpi.worldbank.org/', publisher: 'World Bank', note: 'Country-level benchmark for customs, infrastructure, shipment timeliness and tracking.' },
  worldBankVietnam: { title: 'Vietnam country overview and economic data', href: 'https://www.worldbank.org/en/country/vietnam', publisher: 'World Bank', note: 'Official macroeconomic context behind Vietnam\u2019s production base and domestic demand.' },
  iloSectors: { title: 'Textiles, clothing, leather and footwear sector', href: 'https://www.ilo.org/industries-and-sectors', publisher: 'International Labour Organization', note: 'UN agency coverage of the garment and footwear production base and its working conditions.' },
  betterWork: { title: 'Better Work \u2014 garment factory programme', href: 'https://betterwork.org/', publisher: 'International Labour Organization & International Finance Corporation', note: 'Factory-level compliance and productivity programme covering Vietnamese garment suppliers.' },
  textileExchange: { title: 'Materials and fibre standards', href: 'https://textileexchange.org/', publisher: 'Textile Exchange', note: 'Reference body for recycled and preferred-fibre standards and material traceability claims.' },
  emfFashion: { title: 'Fashion and the circular economy', href: 'https://www.ellenmacarthurfoundation.org/topics/fashion/overview', publisher: 'Ellen MacArthur Foundation', note: 'The reference framework for repair, resale, reuse and take-back models.' },
  bofStateOfFashion: { title: 'The State of Fashion', href: 'https://www.businessoffashion.com/', publisher: 'The Business of Fashion & McKinsey & Company', note: 'The standard annual industry report; the public reference for sourcing, channel and margin framing.' },
  deloitteRetail: { title: 'Global Powers of Retailing and consumer industry research', href: 'https://www.deloitte.com/global/en.html', publisher: 'Deloitte', note: 'Annual ranking of the world\u2019s largest retailers plus channel, format and cost research.' },
  gsoRetail: { title: 'Retail sales of goods and consumer services', href: 'https://www.nso.gov.vn/en/', publisher: 'National Statistics Office of Vietnam', note: 'Official national statistics. Covers the whole retail sector, not fashion and sports retail alone.' },
  moitTrade: { title: 'Trade, industry and e-commerce reporting', href: 'https://moit.gov.vn/en/', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Official Vietnamese reporting on textiles, trade policy and e-commerce; confirm scope before formal use.' },
  vietnamBriefing: { title: 'Vietnam retail, e-commerce and manufacturing coverage', href: 'https://www.vietnam-briefing.com/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Advisory analysis of the Vietnamese market; secondary coverage, so verify against official statistics.' },
} satisfies Record<string, FashionM2Source>;
export type FashionM2SourceId = keyof typeof FASHION_M2_SOURCES;
export const citeF2 = (...ids: FashionM2SourceId[]): FashionM2Source[] => ids.map((id) => FASHION_M2_SOURCES[id]);

export function F2DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
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

export function f2Chapter(input: Omit<FashionM2CardData, 'concepts'>): FashionM2CardData {
  return { ...input, concepts: [] };
}

export function f2Quiz(prefix: string, seeds: DairyQuizSeed[]): FashionM2Question[] {
  return pairedQuiz(prefix, seeds) as FashionM2Question[];
}
