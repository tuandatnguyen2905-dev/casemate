import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { COFFEE_SOURCES } from './coffeeM1Core';

export type CoffeeModule02VisualKind = `coffee-m2-${string}`;

export interface CoffeeM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: CoffeeModule02VisualKind;
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

export interface CoffeeM2LessonBundle {
  deck: CoffeeM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 02 adds Vietnam coffee supply data from customs, trade-association and USDA reporting, the EU
 * deforestation regulation, the 2026 minimum-wage decree, logistics and cold-chain estimates, and company
 * disclosures on roasting and tea sourcing. Prices, volumes and capacities are tied to their source and date,
 * and where sources disagree the chapter says so.
 */
export const COFFEE_M2_SOURCES = {
  ...COFFEE_SOURCES,
  vicofaExport2025: { title: 'Coffee sets a US$9 billion export record: what the VICOFA chairman says', href: 'https://tuoitre.vn/nld/ca-phe-lap-ky-luc-xuat-khau-9-ti-usd-chu-tich-vicofa-noi-gi-196260107135624368.htm', publisher: 'Nguoi Lao Dong via Tuoi Tre (Vietnamese-language)', note: 'VICOFA reports 2025 exports of 1.59 million tonnes and about US$9 billion, with Robusta at 1.3 million tonnes and US$6.65 billion, and a rise from US$4.24 billion in 2023 and US$5.48 billion in 2024.' },
  vietnamnetExport: { title: 'Deep processing lifts Vietnam\u2019s coffee close to US$9 billion', href: 'https://vietnamnet.vn/en/deep-processing-lifts-vietnam-s-coffee-close-to-us-9-billion-2492047.html', publisher: 'VietnamNet (customs data)', note: 'Customs-based 2025 coffee exports of US$8.92 billion, Robusta 73.8% of value, and record processed coffee exports of US$1.78 billion, up 50.4%.' },
  vovCoffeePrices: { title: 'Coffee exports soar at year-end, surpassing US$8.3 billion mark', href: 'https://english.vov.vn/en/economy/coffee-exports-soar-at-year-end-surpassing-us83-billion-mark-post1258084.vov', publisher: 'VOV (Vietnam Customs data)', note: 'Eleven-month 2025 average export prices: Robusta about US$5,125 a tonne, up 40.8%, and Arabica about US$6,650, up 91.0%.' },
  maeCropYear: { title: 'Coffee exports hit record high of $8.4 bln', href: 'https://en.mae.gov.vn/Pages/chi-tiet-tin-Eng.aspx?ItemID=9069', publisher: 'Ministry of Agriculture and Environment (VICOFA conference report)', note: 'For the 2024\u201325 crop year, exports above 1.5 million tonnes worth over US$8.4 billion; the EU took 47.2% of volume.' },
  usdaCoffeeAnnual: { title: 'Vietnam: Coffee Annual (May 2026)', href: 'https://www.fas.usda.gov/data/gain/2026/05/vietnam-coffee-annual', publisher: 'USDA Foreign Agricultural Service', note: 'Marketing-year 2025/26 production of 31.7 million bags (30.5 million Robusta), Robusta area 630,200 ha and yield 2.90 tonnes per hectare, domestic consumption 4.9 million bags and imports 1.3 million bags, led by Laos at 45% in the first half.' },
  usdaCoffeeSemi: { title: 'Vietnam: Coffee Semi-Annual (2025)', href: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Coffee+Semi-Annual_Ho+Chi+Minh+City_Vietnam_VM2025-0051.pdf', publisher: 'USDA Foreign Agricultural Service', note: 'Average local coffee price of about VND 118,000 a kilogram in 2024/25, up 125%; farmers and traders follow London and Chicago exchange prices daily; processors raised imports to offset high local prices.' },
  vtvCoffeePrices: { title: 'Coffee prices rise, many caf\u00e9s start raising selling prices', href: 'https://vtv.vn/kinh-te/gia-ca-phe-tang-nhieu-quan-ca-phe-bat-dau-tang-gia-ban-20250305144338847.htm', publisher: 'VTV (Vietnamese-language)', note: 'March 2025 report of caf\u00e9 price rises of 10\u201320%, ingredients said to be about 20\u201335% of a cup\u2019s cost, and shops that held prices while adding menu variety.' },
  eudrCommission: { title: 'Regulation on deforestation-free products', href: 'https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en', publisher: 'European Commission', note: 'Application from 30 December 2026 for large and medium operators and 30 June 2027 for micro and small operators; soluble coffee added from 30 December 2027.' },
  efiEudrVietnam: { title: 'Preparedness check of the coffee sector in Viet Nam for the EUDR', href: 'https://efi.int/publication/preparedness-check-coffee-sector-viet-nam-eu-deforestation-regulation', publisher: 'European Forest Institute', note: 'Assesses whether the traceability and legality information needed for EU due diligence is available in the Vietnamese coffee sector.' },
  minWageDecree: { title: 'Regional minimum wages from 1 January 2026 (Decree 293/2025/ND-CP)', href: 'https://vss.gov.vn/english/news/Pages/external-information.aspx?CateID=184&ItemID=12822', publisher: 'Vietnam Social Security (news summary)', note: 'Region I minimum wage rises to VND 5,310,000 a month and VND 25,500 an hour, an average rise of 7.2%, with other regions between VND 3.7 and 4.73 million.' },
  highlandsRoastery: { title: 'Highlands Coffee opens Highlands C\u00e1i M\u00e9p roastery', href: 'https://vietnamnews.vn/economy/1715967/highlands-coffee-opens-highlands-cai-mep-roastery.html', publisher: 'Viet Nam News', note: 'April 2025 opening of a VND 500 billion, 24,000 sq m roastery near C\u00e1i M\u00e9p Port, planned capacity of 75,000 tonnes a year as operations mature.' },
  highlandsPlant2023: { title: 'Highlands Coffee invests nearly VND 500 billion in a new roasting plant', href: 'https://www.highlandscoffee.com.vn/vn/dau-tu-gan-500-ty-xay-nha-may-rang-xay-moi-chuan-quoc-te-highlands-coffee-dua-ca-phe-rang-xay-viet-nam-len-ban-do-the-gioi.html', publisher: 'Highlands Coffee (company announcement, Vietnamese-language)', note: 'Company statement of initial capacity near 10,000 tonnes a year and food-safety systems including FSSC 22000, ISO 22000 and HACCP; a company claim.' },
  virDrinksChains: { title: 'Domestic drinks chains set to step up', href: 'https://vir.com.vn/domestic-drinks-chains-set-to-step-up-127713.html', publisher: 'Vietnam Investment Review', note: 'Confirms the C\u00e1i M\u00e9p plant\u2019s initial capacity of about 10,000 tonnes a year with potential to reach 75,000.' },
  phucLongTea: { title: 'Ph\u00fac Long tea: origin and freshness', href: 'https://www.phuclong.com.vn/ve-chung-toi/ve-chung-toi/tra', publisher: 'Ph\u00fac Long (company website, Vietnamese-language)', note: 'Company statement that its tea comes from two hills it owns in Th\u00e1i Nguy\u00ean and B\u1ea3o L\u1ed9c, with plants built there to dry leaves right after harvest; a company claim.' },
  phucLongAbout: { title: 'About Ph\u00fac Long', href: 'https://phuclong.com.vn/ve-chung-toi/ve-phuc-long', publisher: 'Ph\u00fac Long (company website, Vietnamese-language)', note: 'Company history including a tea and coffee processing plant in Binh Duong from 2007 and a plant in My Phuoc 3 Industrial Park from 2018, and sales of packaged tea and coffee through supermarkets and online.' },
  masanPhucLong: { title: 'Ph\u00fac Long\u2019s CEO: Vietnamese tea bridges generational and cultural differences', href: 'https://www.masangroup.com/news/market-news/ceo-plh/', publisher: 'Masan Group (interview)', note: 'Masan acquired Ph\u00fac Long in 2022; plans to integrate its loyalty programme with the group\u2019s retail ecosystem and to work on sustainable packaging.' },
  logisticsGdp: { title: 'Logistics costs are terrible, Vietnamese firms struggle to compete', href: 'https://thanhnien.vn/chi-phi-logistics-rat-khung-khiep-doanh-nghiep-viet-kho-canh-tranh-185250915191158026.htm', publisher: 'Thanh Nien (Vietnamese-language)', note: 'Reports Vietnam\u2019s logistics cost at about 16.5% of GDP in 2025 against a world average of about 11.6%.' },
  vietnamBriefingLogistics: { title: 'Vietnam e-commerce logistics market: costs, trends and opportunities', href: 'https://www.vietnam-briefing.com/news/vietnam-e-commerce-logistics-market.html/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Logistics at 16\u201317% of GDP, last-mile delivery at 53% of logistics cost, cold storage about 60% in Ho Chi Minh City, and cold-chain market of about US$850 million in 2025; e-commerce context.' },
  chainRace2025: { title: 'The coffee chain battle: Highlands, Ph\u00fac Long and Katinat race to expand outlets', href: 'https://doanhnhan.baophapluat.vn/cuoc-chien-chuoi-ca-phe-highlands-phuc-long-katinat-chay-dua-mo-rong-diem-ban-gianh-giat-tung-met-vuong-86554.html', publisher: 'Doanh nhan (Vietnamese-language business news)', note: 'Reports Ph\u00fac Long\u2019s first-half 2025 revenue of VND 858 billion, up 10.3%, and profit after tax of VND 86 billion, up 63.5%, and Highlands\u2019 2024 pre-tax profit of about VND 1,050 billion as reported by its parent group.' },
  fiinColdChain: { title: 'FiinGroup highlights Vietnam\u2019s cold chain growth potential', href: 'https://fiingroup.vn/NewsInsights/Detail/11461189?lang=en-US%2Cen-us%2Cvi-vn', publisher: 'FiinGroup', note: 'Cold-chain market of US$202 million in 2024, trucks 78% of cold transport in the south and 19 storage operators holding about 64% of capacity; differs from other cold-chain estimates by scope.' },
} satisfies Record<string, FashionM2Source>;
export type CoffeeM2SourceId = keyof typeof COFFEE_M2_SOURCES;
export const citeC2 = (...ids: CoffeeM2SourceId[]): FashionM2Source[] => ids.map((id) => COFFEE_M2_SOURCES[id]);

export const C2DeepDive = F2DeepDive;
export const c2Quiz = f2Quiz;

export function c2Chapter(input: Omit<CoffeeM2CardData, 'concepts'>): CoffeeM2CardData {
  return { ...input, concepts: [] };
}
