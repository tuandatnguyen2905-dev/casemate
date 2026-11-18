import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { FASHION_M5_SOURCES } from './fashionM5Core';

export type GroceryModule01VisualKind = `grocery-m1-${string}`;

export interface GroceryM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: GroceryModule01VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  statsNote?: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: FashionM2Source[];
}

export interface GroceryM1LessonBundle {
  deck: GroceryM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

const { deloitteRetail, gsoRetail, moitTrade, vietnamBriefing, worldBankVietnam, nsoPress2025, vietnamplusRetail2025, vovDomesticReport, vnEcommerceLaw, vnEcommerceDecree, vnLabelling, vnEInvoice, vnPdpl, vietnamplusEpr, laodongFakes } = FASHION_M5_SOURCES;

/**
 * Sources for the grocery and general merchandise modules: official Vietnamese statistics and
 * ministry reporting, NielsenIQ and Euromonitor figures as relayed by named publishers, company
 * history pages and retail rankings. Each note says what a figure does and does not cover,
 * because grocery, food and total-retail definitions differ between publishers.
 */
export const GROCERY_SOURCES = {
  deloitteRetail, gsoRetail, moitTrade, vietnamBriefing, worldBankVietnam, nsoPress2025, vietnamplusRetail2025, vovDomesticReport, vnEcommerceLaw, vnEcommerceDecree, vnLabelling, vnEInvoice, vnPdpl, vietnamplusEpr, laodongFakes,
  moitDomesticReport: { title: 'Vietnam Domestic Market Report 2025 announced', href: 'https://www.vietnam.vn/en/cong-bo-bao-cao-thi-truong-noi-dia-viet-nam-2025', publisher: 'Vietnam.vn (Government portal; Ministry of Industry and Trade report)', note: 'US$269 billion retail market in 2025, growth of 9\u201310%, and counts of markets, supermarkets and shopping centres; covers all retail, not grocery alone.' },
  govRetailReport: { title: 'Vietnam 2025 domestic market report (Government publication)', href: 'https://bcp.cdnchinhphu.vn/334894974524682240/2025/12/30/bc-ttnd2025-tv-1-17670677595272000393255.pdf', publisher: 'Government of Vietnam (Ministry of Industry and Trade, National Statistics Office data)', note: 'Vietnamese-language report: trends in markets, supermarkets and shopping centres 2020\u20132024, supermarket grades, geographic distribution and e-commerce.' },
  vnRetailPromote: { title: 'Promote solutions to develop the domestic market and stimulate consumer demand', href: 'https://www.vietnam.vn/en/day-manh-cac-giai-phap-phat-trien-thi-truong-trong-nuoc-kich-cau-tieu-dung', publisher: 'Vietnam.vn (Government portal)', note: 'National Statistics Office retail structure for 2024 and the end-2024 count of markets, supermarkets, shopping malls and convenience stores.' },
  usdaRetailFoods: { title: 'Retail Foods Annual: Vietnam, 2025', href: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Retail+Foods+Annual_Ho+Chi+Minh+City_Vietnam_VM2025-0034.pdf', publisher: 'U.S. Department of Agriculture, Foreign Agricultural Service (Euromonitor data)', note: 'Food retail sales and channel shares for 2024; food retail only, so not comparable with total-retail figures.' },
  nielsenGrocery: { title: 'Grocery stores embrace new look, strengthening support for manufacturers', href: 'https://vietnamnews.vn/economy/1717713/grocery-stores-embrace-new-look-strengthening-support-for-manufacturers.html', publisher: 'Viet Nam News (reporting NielsenIQ Vietnam)', note: 'Share of traditional trade in FMCG sales, the number of grocery stores and a consumer survey on store preference.' },
  hanoitimesModern: { title: 'Expanded modern retail chains fuel presence of Vietnamese goods', href: 'https://hanoitimes.vn/expanded-modern-retail-chains-fuel-presence-of-vietnamese-goods.708598.html', publisher: 'Hanoi Times', note: 'Modern retail\u2019s share of retail sales and chain expansion targets for WinMart+ and Bach Hoa Xanh in 2025.' },
  vcciDomestic: { title: 'Vietnam\u2019s retail goods and services market value hits $270 bln in 2025, domestic chains dominate', href: 'https://en.vcci.com.vn/vcci-news/vietnams-retail-goods-and-services-market-value-hits-270-bln-in-2025-domestic-chains-dominate-114648', publisher: 'Vietnam Chamber of Commerce and Industry (VCCI)', note: 'Outlet counts and entry histories of the leading Vietnamese and foreign chains at the end of 2025, as reported.' },
  deloitteGpr2025: { title: 'Global Powers of Retailing 2025', href: 'https://www.deloitte.com/content/dam/assets-shared/docs/industries/consumer/2025/deloitte-global-powers-of-retailing-2025.pdf', publisher: 'Deloitte', note: 'Ranking of the 250 largest retailers by retail revenue for fiscal 2023 (years ending by 30 June 2024); company revenue includes non-grocery sales.' },
  pigglyWiggly: { title: 'History of Piggly Wiggly', href: 'https://www.pigglywiggly.com/history/', publisher: 'Piggly Wiggly, LLC', note: 'Company account of the first self-service grocery store, opened in Memphis in 1916.' },
  icscGrocery: { title: 'Grocery stores\u2019 enduring appeal to shoppers, investors and developers', href: 'https://www.icsc.com/news-and-views/icsc-exchange/grocery-stores-enduring-appeal-to-shoppers-investors-and-developers', publisher: 'International Council of Shopping Centers (ICSC)', note: 'Account of Piggly Wiggly and of King Kullen, regarded as the first true supermarket (1930).' },
  carrefourHistory: { title: 'Carrefour Group history', href: 'https://www.carrefour.com/en/group/history', publisher: 'Carrefour Group', note: 'Company account of its first supermarket (1960) and first hypermarket (15 June 1963).' },
  vietnamplusInflation: { title: 'Vietnam wraps up 2025 with solid growth and 3.31% inflation', href: 'https://en.vietnamplus.vn/vietnam-wraps-up-2025-with-solid-growth-and-331-inflation-post338762.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Reports National Statistics Office data on 2025 inflation and consumer demand.' },
  virMa2016: { title: '2016’s top 5 largest M&A deals in Vietnam', href: 'https://vir.com.vn/2016s-top-5-largest-ma-deals-in-vietnam-46692.html', publisher: 'Vietnam Investment Review', note: 'Central Group’s April 2016 purchase of Big C Vietnam (43 stores and 30 shopping centres) and TCC’s purchase of Metro Cash & Carry Vietnam (19 wholesale centres, enterprise value reported at €655 million).' },
  vnnAuchan: { title: 'Saigon Co.op takes over 18 Auchan supermarkets', href: 'https://vietnamnet.vn/en/saigon-coop-takes-over-18-auchan-supermarkets-545840.html', publisher: 'VietNamNet', note: 'June 2019 transfer of Auchan’s 18 supermarkets and online business in Vietnam to Saigon Co.op; Auchan entered in 2015 and reported revenue of about €45 million in 2018.' },
  vnnRetailMa: { title: 'Big M&A deals of retail giants in Vietnam', href: 'https://vietnamnet.vn/en/big-m-a-deals-of-retail-giants-in-vietnam-2153907.html', publisher: 'VietNamNet', note: 'Casino’s Big C entered Vietnam in 1998, was sold to Central Group in 2016 and was renamed GO! and Tops Market in 2021. Reported deal values differ between outlets.' },
  vnnWesternExit: { title: 'Why Western retailers say goodbye to Vietnam?', href: 'https://vietnamnet.vn/en/why-western-retailers-say-goodbye-to-vietnam-535203.html', publisher: 'VietNamNet (reporting Ho Chi Minh City Law newspaper)', note: 'Links the exits of Metro, Casino’s Big C and Auchan to business strategy, competition from local and regional peers and the growth of e-commerce.' },
  worldpanelGb: { title: 'British shoppers seek autumn staples, while grocery inflation edges up to 2.5%', href: 'https://worldpanelbynumerator.com/insights/shoppers-seek-autumn-staples-while-grocery-inflation-edges-up-to-2-5', publisher: 'Worldpanel by Numerator (formerly Kantar Worldpanel)', note: 'Great Britain grocery market shares for the 12 weeks to 4 October 2026: Tesco 27.8%, Sainsbury’s 15.2%, Asda 11.5%, Aldi 10.5%, Lidl 8.6%; till-roll methodology covering grocers only.' },
  worldpanelLidl: { title: 'UK grocery inflation eases as early May grey skies dampen sales of summer essentials', href: 'https://worldpanelbynumerator.com/insights/grocery-inflation-eases-amid-slower-summer-demand', publisher: 'Worldpanel by Numerator', note: 'Lidl reached 8.6% for the 12 weeks to 17 May 2026 and became Britain’s fifth-largest grocer; it held 1.4% of the market twenty-five years earlier.' },
} satisfies Record<string, FashionM2Source>;
export type GrocerySourceId = keyof typeof GROCERY_SOURCES;
export const citeG1 = (...ids: GrocerySourceId[]): FashionM2Source[] => ids.map((id) => GROCERY_SOURCES[id]);

export const G1DeepDive = F2DeepDive;
export const g1Quiz = f2Quiz;

export function g1Chapter(input: Omit<GroceryM1CardData, 'concepts'>): GroceryM1CardData {
  return { ...input, concepts: [] };
}
