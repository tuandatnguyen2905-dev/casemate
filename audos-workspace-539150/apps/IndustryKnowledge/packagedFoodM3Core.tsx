import type { ReactNode } from 'react';
import type { PackagedFoodCardData as BasePackagedFoodCardData, PackagedFoodQuestion, PackagedFoodSource, PackagedFoodTakeaways, PfQuizSeed } from './packagedFoodM1Core';

export type { PackagedFoodQuestion, PackagedFoodTakeaways, PfQuizSeed };
export type PackagedFoodM3VisualKind = `packaged-food-m3-${string}`;
export interface PackagedFoodM3CardData extends Omit<BasePackagedFoodCardData, 'visualKind' | 'body' | 'sources'> {
  visualKind: PackagedFoodM3VisualKind;
  body: ReactNode;
  sources: PackagedFoodSource[];
}
/** Authoring drafts use a richer lesson envelope; the module registry normalizes it for FlashcardDeck. */
export type PackagedFoodCardData = any;

export function EvidenceNote({ children, title = 'Evidence note', sources, sourceIds }: { children: ReactNode; title?: string; sources?: unknown; sourceIds?: string[] }) {
  const ids = sourceIds?.join(', ');
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><span className="font-black text-slate-800">{title}: </span>{children}{ids ? <span className="mt-1 block text-[10px] text-slate-500">Sources: {ids}</span> : null}{sources ? null : null}</div>;
}

export const PACKAGED_FOOD_M3_SOURCES: Record<string, PackagedFoodSource> = {
  'pf-m03-s01': { id: 'pf-m03-s01', title: 'Mondelez International Q4 & Full-Year 2024 Earnings Results', href: 'https://www.marketbeat.com/earnings/reports/2025-2-4-mondelez-international-inc-stock/', publisher: 'Mondelez audited results via MarketBeat' },
  'pf-m03-s02': { id: 'pf-m03-s02', title: 'Nestlé Full-Year 2024 Results', href: 'https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2024', publisher: 'Nestlé S.A. audited company results' },
  'pf-m03-s03': { id: 'pf-m03-s03', title: 'Codex Alimentarius — Joint FAO/WHO Food Standards Programme', href: 'https://www.fao.org/fao-who-codexalimentarius/about-codex/en/', publisher: 'FAO/WHO Codex Alimentarius Commission — official' },
  'pf-m03-s04': { id: 'pf-m03-s04', title: 'HS Chapters 17, 18 and 19 reference', href: 'https://www.findhs.codes/HTSCodes/TR/Of-Heading-1806', publisher: 'findhs.codes — third-party HS reference, not an official WCO publication' },
  'pf-m03-s05': { id: 'pf-m03-s05', title: "How Orion leads Vietnam's confectionery industry", href: 'https://e.vnexpress.net/news/companies/how-orion-leads-vietnams-confectionary-industry-4565635.html', publisher: 'VnExpress International citing Nielsen — secondary industry data' },
  'pf-m03-s06': { id: 'pf-m03-s06', title: 'Kinh Do confectionery and the Mondelez transaction', href: 'https://www.kdc.vn/en/bai-viet/giam-banh-keo-kinh-do-day-manh-dau-tu-vao-dau-an', publisher: 'KIDO Group / Kinh Do company source' },
  'pf-m03-s07': { id: 'pf-m03-s07', title: 'Masan Group & Masan Consumer Q3 / 9M 2024 results', href: 'https://e.nhipcaudautu.vn/companies/masan-generates-us866-million-per-day-in-jan-sep-3360664/', publisher: 'Nhip Cau Dau Tu reporting company results' },
  'pf-m03-s08': { id: 'pf-m03-s08', title: 'Modern Grocery Retail Sector — Minimarts in Vietnam', href: 'https://www.vietcap.com.vn/en/research-center/modern-grocery-retail-sector-minimarts-to-dominate-modern-grocery-retailing-in-vietnam', publisher: 'Vietcap brokerage sector research' },
  'pf-m03-s09': { id: 'pf-m03-s09', title: 'Orion profit grows on record China and Vietnam sales', href: 'https://www.koreajoongangdaily.com/business/orion-profit-grows-on-record-china-vietnam-sales/11509292', publisher: 'Korea JoongAng Daily reporting Orion FY2024 results' },
  'pf-m03-s10': { id: 'pf-m03-s10', title: 'Mondelez profitability ratios derived from 10-K filings', href: 'https://www.stock-analysis-on.net/NASDAQ/Company/Mondelez-International-Inc/Ratios/Profitability', publisher: 'Stock Analysis on Net — secondary ratios; reconfirm against primary 10-K before publication' },
};
export type PackagedFoodM3SourceId = keyof typeof PACKAGED_FOOD_M3_SOURCES;
export const citePfM3 = (...ids: PackagedFoodM3SourceId[]): PackagedFoodSource[] => ids.map((id) => PACKAGED_FOOD_M3_SOURCES[id]);
export function chapter<T extends Record<string, any>>(input: T): T & { concepts: [] } { return { ...input, concepts: [] }; }

const OPTION_IDS = ['a', 'b', 'c', 'd'];
function questionFrom(seed: any, id: string, transfer = false): PackagedFoodQuestion {
  const options: string[] = transfer && seed.transferOptions ? seed.transferOptions : seed.options;
  const correctIndex: number = transfer && Number.isInteger(seed.transferCorrectIndex) ? seed.transferCorrectIndex : seed.correctIndex;
  const basePrompt = seed.question ?? seed.prompt;
  const prompt = transfer && seed.transferQuestion ? seed.transferQuestion : transfer ? `Practical application: ${basePrompt}` : basePrompt;
  const number = Number((id.match(/q(\d+)/i) ?? [])[1] ?? 1);
  const chapterRef = seed.chapter ?? (number <= 3 ? '1' : number <= 6 ? '2' : '3');
  return {
    id,
    question: prompt,
    options: options.map((text, index) => ({ id: OPTION_IDS[index], text })),
    correctOptionId: OPTION_IDS[correctIndex],
    explanation: transfer && seed.transferExplanation ? seed.transferExplanation : seed.explanation,
    moduleId: chapterRef,
    objective: seed.concept ?? seed.takeaway ?? 'Apply the chapter concept',
  };
}

export function pairedQuiz(prefixOrSeed: string | any[] | Record<string, any>, seeds?: any[]): PackagedFoodQuestion[] {
  if (typeof prefixOrSeed === 'string') {
    return (seeds ?? []).flatMap((seed, index) => [questionFrom(seed, `${prefixOrSeed}-${index + 1}a`), questionFrom(seed, `${prefixOrSeed}-${index + 1}b`, true)]);
  }
  if (Array.isArray(prefixOrSeed)) {
    return prefixOrSeed.flatMap((seed, index) => [questionFrom(seed, `${seed.id ?? `pf-m3-q${index + 1}`}-a`), questionFrom(seed, `${seed.id ?? `pf-m3-q${index + 1}`}-b`, true)]);
  }
  const seed = prefixOrSeed;
  return [questionFrom(seed, `${seed.id}-a`), questionFrom(seed, `${seed.id}-b`, true)];
}
