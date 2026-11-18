import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';

export type PackagedFoodVisualKind = `packaged-food-m1-${string}`;
export interface PackagedFoodSource { id: string; title: string; href: string; publisher: string }
export interface PackagedFoodNarrative { label: 'What it is' | 'How it works' | 'Global example' | 'Vietnam example' | 'Why it matters'; text: string }
export interface PackagedFoodCardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: PackagedFoodNarrative[];
  visualKind: PackagedFoodVisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: PackagedFoodSource[];
}
export interface PackagedFoodQuestion { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface PackagedFoodTakeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }

export const PF_SOURCES = {
  s01: { id: 'pf-m01-s01', title: 'Global Packaged Food Market to Surpass US$5,080 Billion by 2032', href: 'https://finance.yahoo.com/news/global-packaged-food-market-surpass-153000167.html', publisher: 'Maximize Market Research via PR Newswire — commercial estimate, not official statistics' },
  s02: { id: 'pf-m01-s02', title: 'The Global Confectionery Market Trends You Need to Know', href: 'https://www.gourmetpro.co/blog/global-confectionery-market/', publisher: 'GourmetPro citing Statista — commercial estimate' },
  s03: { id: 'pf-m01-s03', title: 'Confectionery market and chocolate/sugar subsegment estimates', href: 'https://www.globenewswire.com/news-release/2025/07/15/3115814/0/en/confectionary-market-size-to-reach-usd-467-81-billion-by-2034-fueled-by-health-conscious-trends-and-innovation.html', publisher: 'GlobeNewswire / FMI / Stellar — commercial estimates with different definitions' },
  s04: { id: 'pf-m01-s04', title: 'Mondelez International Q4 and Full-Year 2024 Results', href: 'https://www.marketbeat.com/earnings/reports/2025-2-4-mondelez-international-inc-stock/', publisher: 'Mondelez audited results via MarketBeat' },
  s05: { id: 'pf-m01-s05', title: 'Nestlé Full-Year 2024 Results', href: 'https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2024', publisher: 'Nestlé S.A. audited company results' },
  s06: { id: 'pf-m01-s06', title: 'Codex Alimentarius — Joint FAO/WHO Food Standards Programme', href: 'https://www.fao.org/fao-who-codexalimentarius/about-codex/en/', publisher: 'FAO/WHO Codex Alimentarius Commission — official' },
  s07: { id: 'pf-m01-s07', title: 'HS Chapters 17, 18 and 19 reference', href: 'https://www.findhs.codes/HTSCodes/TR/Of-Heading-1806', publisher: 'findhs.codes — third-party HS reference, not an official WCO publication' },
  s08: { id: 'pf-m01-s08', title: "How Orion leads Vietnam's confectionery industry", href: 'https://e.vnexpress.net/news/companies/how-orion-leads-vietnams-confectionary-industry-4565635.html', publisher: 'VnExpress International citing Nielsen — secondary industry data' },
  s09: { id: 'pf-m01-s09', title: 'Kinh Do: phasing out confectionery, investing in cooking oil', href: 'https://www.kdc.vn/en/bai-viet/giam-banh-keo-kinh-do-day-manh-dau-tu-vao-dau-an', publisher: 'KIDO Group / Kinh Do company source' },
  s10: { id: 'pf-m01-s10', title: 'Food-preservation and packaging history', href: 'https://pubmed.ncbi.nlm.nih.gov/14492983/', publisher: 'PubMed supports Appert only; other dates are corroborating secondary history' },
} satisfies Record<string, PackagedFoodSource>;
export type PackagedFoodSourceId = keyof typeof PF_SOURCES;
export const citePf = (...ids: PackagedFoodSourceId[]) => ids.map((id) => PF_SOURCES[id]);

export function EvidenceNote({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><span className="font-black text-slate-800">Evidence note: </span>{children}</p>;
}

export function chapter(input: Omit<PackagedFoodCardData, 'concepts'>): PackagedFoodCardData { return { ...input, concepts: [] }; }

export interface PfQuizSeed { chapter: string; objective: string; question: string; application: string; correct: string; wrong: [string, string, string]; explanation: string }
const OPTION_IDS = ['a', 'b', 'c', 'd'];
export function pairedQuiz(prefix: string, seeds: PfQuizSeed[]): PackagedFoodQuestion[] {
  const pairs = seeds.map((seed, seedIndex) => [seed.question, seed.application].map((question, pairIndex) => {
    const rotation = (seedIndex * 2 + pairIndex + 1) % 4;
    const raw = [seed.correct, ...seed.wrong];
    const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return {
      id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`,
      question,
      options: rotated.map((text, index) => ({ id: OPTION_IDS[index], text })),
      correctOptionId: OPTION_IDS[rotated.indexOf(seed.correct)],
      explanation: seed.explanation,
      moduleId: seed.chapter,
      objective: seed.objective,
    };
  }) as [PackagedFoodQuestion, PackagedFoodQuestion]);
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}
