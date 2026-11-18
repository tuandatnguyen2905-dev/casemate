import type { ReactNode } from 'react';
import { EvidenceNote, pairedQuiz } from './packagedFoodM1Core';
import type { PackagedFoodCardData as BasePackagedFoodCardData, PackagedFoodQuestion, PackagedFoodSource, PackagedFoodTakeaways, PfQuizSeed } from './packagedFoodM1Core';

export { EvidenceNote, pairedQuiz };
export type { PackagedFoodQuestion, PackagedFoodTakeaways, PfQuizSeed };
export type PackagedFoodM2VisualKind = `packaged-food-m2-${string}`;
export interface PackagedFoodM2CardData extends Omit<BasePackagedFoodCardData, 'visualKind' | 'body' | 'sources'> {
  visualKind: PackagedFoodM2VisualKind;
  body: ReactNode;
  sources: PackagedFoodSource[];
}
export type PackagedFoodCardData = PackagedFoodM2CardData;

export const PACKAGED_FOOD_M2_SOURCES: Record<string, PackagedFoodSource> = {
  'pf-m02-s01': { id: 'pf-m02-s01', title: 'Global Packaged Food Market to Surpass US$5,080 Billion by 2032', href: 'https://finance.yahoo.com/news/global-packaged-food-market-surpass-153000167.html', publisher: 'Maximize Market Research via PR Newswire — commercial estimate, not official statistics' },
  'pf-m02-s02': { id: 'pf-m02-s02', title: 'Mondelez International Q4 & Full-Year 2024 Earnings Results', href: 'https://www.marketbeat.com/earnings/reports/2025-2-4-mondelez-international-inc-stock/', publisher: 'Mondelez audited results via MarketBeat' },
  'pf-m02-s03': { id: 'pf-m02-s03', title: 'Nestlé Full-Year 2024 Results', href: 'https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2024', publisher: 'Nestlé S.A. audited company results' },
  'pf-m02-s04': { id: 'pf-m02-s04', title: 'Codex Alimentarius — Joint FAO/WHO Food Standards Programme', href: 'https://www.fao.org/fao-who-codexalimentarius/about-codex/en/', publisher: 'FAO/WHO Codex Alimentarius Commission — official' },
  'pf-m02-s05': { id: 'pf-m02-s05', title: 'HS Chapters 17, 18 and 19 reference', href: 'https://www.findhs.codes/HTSCodes/TR/Of-Heading-1806', publisher: 'findhs.codes — third-party HS reference, not an official WCO publication' },
  'pf-m02-s06': { id: 'pf-m02-s06', title: "How Orion leads Vietnam's confectionery industry", href: 'https://e.vnexpress.net/news/companies/how-orion-leads-vietnams-confectionary-industry-4565635.html', publisher: 'VnExpress International citing Nielsen — secondary industry data' },
  'pf-m02-s07': { id: 'pf-m02-s07', title: 'Kinh Do confectionery and the Mondelez transaction', href: 'https://www.kdc.vn/en/bai-viet/giam-banh-keo-kinh-do-day-manh-dau-tu-vao-dau-an', publisher: 'KIDO Group / Kinh Do company source' },
  'pf-m02-s08': { id: 'pf-m02-s08', title: 'ICCO Quarterly Bulletin of Cocoa Statistics, May 2024', href: 'https://www.businessghana.com/site/news/business/307995/ICCO-Releases-New-Quarterly-Bulletin-Of-Cocoa-Statistics-For-May-2024', publisher: 'International Cocoa Organization via BusinessGhana' },
  'pf-m02-s09': { id: 'pf-m02-s09', title: 'Ghana and Côte d’Ivoire cocoa concentration', href: 'https://africa.businessinsider.com/strategy/cocoa-pricing-in-africa-ghana-and-ivory-coast-to-tackle-cocoa-price-volatility/l26pr6h', publisher: 'Business Insider Africa — secondary, snippet-verified' },
  'pf-m02-s10': { id: 'pf-m02-s10', title: "Protecting Vietnam's demand for milling wheat", href: 'https://newuswheat.mysites.io/trade-activity/protecting-vietnams-growing-demand-for-u-s-soft-white-wheat/', publisher: 'U.S. Wheat Associates — trade-body estimate, snippet-verified' },
  'pf-m02-s11': { id: 'pf-m02-s11', title: 'Mondelez expands Cocoa Life commitment', href: 'https://www.confectioneryproduction.com/news/41474/mondelez-international-commits-additional-600-million-to-cocoa-life-scheme-amid-major-sector-test/', publisher: 'Confectionery Production reporting company figures' },
};
export type PackagedFoodM2SourceId = keyof typeof PACKAGED_FOOD_M2_SOURCES;
export const citePfM2 = (...ids: PackagedFoodM2SourceId[]): PackagedFoodSource[] => ids.map((id) => PACKAGED_FOOD_M2_SOURCES[id]);
export function chapter(input: Omit<PackagedFoodM2CardData, 'concepts'>): PackagedFoodM2CardData { return { ...input, concepts: [] }; }
