import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type CoffeeModule01VisualKind = `coffee-m1-${string}`;

export interface CoffeeM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: CoffeeModule01VisualKind;
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

export interface CoffeeM1LessonBundle {
  deck: CoffeeM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 01 for coffeehouse and foodservice retail draws on market-research summaries, an industry survey
 * published by iPOS.vn and Nestlé Professional, Momentum Works’ chain and delivery reports as reported by the press,
 * company results reported through parent groups, tourism statistics and Vietnamese legal texts.
 * Market-size figures use different definitions in different sources and are never combined; store counts are
 * tied to a reporting date.
 */
export const COFFEE_SOURCES = {
  euromonitorFoodservice: { title: 'Consumer Foodservice in Vietnam', href: 'https://www.euromonitor.com/consumer-foodservice-in-vietnam/report', publisher: 'Euromonitor International (market research summary)', note: 'Reports 2025 consumer foodservice value sales of VND 678 trillion, up 5% in current terms, covering cafés/bars, full-service and limited-service restaurants, cafeterias and street stalls; notes inflation and rising operating costs.' },
  iposReport2025: { title: 'iPOS.vn and Nestlé Professional publish the 2025 Vietnam food and beverage market report', href: 'https://ipos.vn/thong-cao-bao-chi-ipos-vn-va-nestle-professional-cong-bo-bao-cao-thi-truong-kinh-doanh-am-thuc-tai-viet-nam-nam-2025/', publisher: 'iPOS.vn (press release, Vietnamese-language)', note: 'Estimates about 329,500 outlets and VND 726.5 trillion revenue in 2025, with a 2026 forecast of 333,600 outlets and VND 760 trillion.' },
  vcciFnb2026: { title: 'Vietnam F&B market in 2026 heads for VND 760,000 billion revenue and 333,600 outlets', href: 'https://vcci.com.vn/news/thi-truong-fb-viet-nam-2026-huong-toi-doanh-thu-760000-ty-dong-quy-mo-333600-cua-hang', publisher: 'VCCI (Vietnamese-language)', note: 'Reports the survey base of 3,001 businesses and about 3,045 diners, that 65.58% of businesses had stable or growing revenue and that 69.38% faced rising raw-material costs.' },
  vcciFnbEnglish: { title: 'Vietnamese to spend $29 billion on F&B in 2026', href: 'https://en.vcci.com.vn/economic-news/vietnamese-to-spend-29-billion-on-fb-in-2026-116675', publisher: 'VCCI (English-language)', note: 'English summary of the iPOS.vn and Nestlé Professional report, including 57.11% of operators concerned about e-invoicing and standardised tax rules.' },
  iposH12026: { title: 'iPOS.vn and Nestlé Professional publish the first-half 2026 Vietnam F&B market report', href: 'https://ipos.vn/ipos-vn-va-nestle-professional-cong-bo-bao-cao-thi-truong-kinh-doanh-am-thuc-tai-viet-nam-6-thang-dau-nam-2026/', publisher: 'iPOS.vn (press release, Vietnamese-language)', note: 'First-half 2026 revenue of about VND 432.7 trillion, about 329,200 outlets, trend rankings among diners and the gap between food and beverage outlets that grew.' },
  mwyFnb: { title: 'Vietnam F&B market 2026: size and chains', href: 'https://mwyconsulting.com/insights/vietnam-consumer-market/vietnam-food-and-beverage-market', publisher: 'MWY Consulting (independent summary)', note: 'Secondary comparison of three differently defined 2025 market figures, including VND 843.1 trillion from national statistics that also counts accommodation.' },
  momentumChains: { title: 'Coffee and Tea Chains in Southeast Asia 2026', href: 'https://momentum.asia/insights/detail/coffee-and-tea-chains-in-southeast-asia', publisher: 'Momentum Works (report description)', note: 'Southeast Asia modern coffee and tea chains reached US$9.9 billion in 2025, up 52% from 2021, with competition shifting to operating systems, supply chains and digital infrastructure.' },
  vietnamplusChains: { title: 'Vietnam’s beverage chain market exceeds 1.3 billion USD', href: 'https://en.vietnamplus.vn/vietnams-beverage-chain-market-exceeds-13-billion-usd-post339464.vnp', publisher: 'VietnamPlus (reporting Momentum Works)', note: 'Vietnam’s coffee chain segment at US$725 million in 2025, up 27%; Milano Coffee about 2,500 outlets and Highlands Coffee 985; coffee chains only, not the whole coffeehouse market.' },
  vnexpressChains: { title: 'Vietnam ranks as Southeast Asia’s 3rd largest market for coffee and tea chains', href: 'https://e.vnexpress.net/news/business/economy/vietnam-ranks-as-southeast-asia-s-3rd-largest-market-for-coffee-and-tea-chains-5051914.html', publisher: 'VnExpress International (reporting Momentum Works)', note: 'Combined coffee and tea chains US$1.34 billion; a typical store serves 300–400 cups a day while leading brands sell 600–800; Café Amazon exited Vietnam in November 2025.' },
  vietnamplusRegional: { title: 'Vietnamese coffee chains emerge among Southeast Asia’s largest', href: 'https://en.vietnamplus.vn/vietnamese-coffee-chains-emerge-among-southeast-asias-largest-post339527.vnp', publisher: 'VietnamPlus (reporting Momentum Works)', note: 'Seven coffee chains with more than 1,000 outlets in Southeast Asia by February 2026; Starbucks over 2,000 stores regionally; Highlands about 928 outlets at end of September 2025 and Milano’s network largely franchise-agency based.' },
  vietnambizChains: { title: 'The 2025 shake-out: which beverage chains shone and which faded', href: 'https://vietnambiz.vn/nam-thanh-loc-2025-chuoi-do-uong-nao-ruc-ro-va-chuoi-nao-da-lui-tan-20251216115151666.htm', publisher: 'VietnamBiz (Vietnamese-language)', note: 'Store counts for Highlands, Phúc Long, Starbucks, Katinat and Trung Nguyên Legend through 2025; The Coffee House halved its stores and Café Amazon left; Highlands opened a roasting plant and the first drive-thru.' },
  highlandsPhucLongQ3: { title: 'Highlands Coffee and Phúc Long: impressive growth as Vietnam’s F&B market heats up', href: 'https://kinhtedouong.vn/highlands-coffee-va-phuc-long-tang-truong-an-tuong-thi-truong-fb-viet-soi-dong-129368.html', publisher: 'Kinh te Do thi (Vietnamese-language)', note: 'Third-quarter 2025 results as reported from parent groups: Highlands opened 109 company-operated and 4 franchised stores to reach 928; Phúc Long quarterly revenue of VND 516 billion.' },
  vietmediaChains: { title: 'As Mixue retreats, Vietnam’s coffee and tea chain market splits in two', href: 'https://en.thevietmedia.net/vietnam-beverage-chain-rebalancing/', publisher: 'The Viet Media', note: 'Highlands 985 stores and same-store sales up over 8% in 2025; Phúc Long 237, Katinat 114 and Starbucks 150.' },
  grandViewCoffee: { title: 'Coffee Market Size, Share and Trends Report, 2026–2033', href: 'https://www.grandviewresearch.com/industry-analysis/coffee-market', publisher: 'Grand View Research (market research summary)', note: 'Global coffee market valued at US$249.3 billion in 2025; Europe the largest region at 32.5% of revenue; notes premiumisation and Circana data on foodservice coffee servings.' },
  mordorFoodserviceCoffee: { title: 'Foodservice Coffee Market Size, Share and 2031 Growth Trends Report', href: 'https://www.mordorintelligence.com/industry-reports/foodservice-coffee-market', publisher: 'Mordor Intelligence (market research summary)', note: 'Foodservice coffee market of US$524.35 billion in 2025; Europe the largest and Asia-Pacific the fastest-growing; takeaway and grab-and-go gaining while chains scale and independents redefine their value.' },
  fortuneFoodserviceCoffee: { title: 'Foodservice Coffee Market Size, Growth, Global Report 2034', href: 'https://www.fortunebusinessinsights.com/industry-reports/food-service-coffee-market-100798', publisher: 'Fortune Business Insights (market research summary)', note: 'A different publisher’s foodservice coffee estimate of US$625.52 billion in 2025, used to show how definitions change the figure.' },
  icoVietnam: { title: 'Country coffee profile: Vietnam', href: 'https://ico.org/documents/cy2018-19/icc-124-9e-profile-vietnam.pdf', publisher: 'International Coffee Organization', note: 'Coffee introduced by French missionaries in 1857; Robusta about 97% of Vietnamese production; production boomed after 1986 reforms; background only because farming is outside this retail scope.' },
  columbiaTrungNguyen: { title: 'Chasing Starbucks Dreams: Trung Nguyen and its global expansion', href: 'https://business.columbia.edu/sites/default/files-efs/pubfiles/192/Trung_Nguyen.pdf', publisher: 'Columbia Business School (case study)', note: 'Describes coffee as a long-standing local habit, sidewalk cafés, and Trung Nguyen opening cafés in clusters of three in 1998 to advertise its brand.' },
  highlandsProfile: { title: 'Highlands Coffee', href: 'https://en.wikipedia.org/wiki/Highlands_Coffee', publisher: 'Wikipedia (encyclopedia, secondary)', note: 'Highlands Coffee established in 1999, first shop in 2002 in Ho Chi Minh City, 80 shops by 2009 and Jollibee buying 50% in 2012; a secondary source for company history.' },
  bbcStarbucks: { title: 'Starbucks Vietnam: why the US chain cannot crack a coffee-loving nation', href: 'https://www.bbc.com/news/world-asia-66167222', publisher: 'BBC News', note: 'Describes Highlands starting as a luxury chain, then cutting prices, and Starbucks’ limited footprint in a market with strong local coffee habits.' },
  kafadarCoffee: { title: 'A history of coffee', href: 'https://sites.duke.edu/rethinkingglobalcities/files/2014/09/64Kafadar16-coffeehistory.pdf', publisher: 'Cemal Kafadar, Duke University repository (academic paper)', note: 'Quotes an Ottoman historian dating the first Istanbul coffeehouses to about 1554–55 and describes them as meeting places for conversation, games and literature.' },
  britishMuseumCoffee: { title: 'Life in a cup: coffee culture in the Islamic world', href: 'https://www.britishmuseum.org/sites/default/files/2021-10/Life_in_a_cup_coffee_culture_in_the_Islamic_world_large_print_guide_1021.pdf', publisher: 'British Museum (exhibition guide)', note: 'Origins in Yemen, spread to Istanbul and onward; first European coffeehouses in Livorno (1632) and Venice (1640), London in 1652 and an estimated 3,000 English coffeehouses by 1675.' },
  coffeeWavesOverview: { title: 'How coffee reshaped societies: from Ottoman coffeehouses to third-wave culture', href: 'https://dabov.us/blog/cultural-transformations-driven-by-coffee-drinking', publisher: 'Dabov (secondary overview)', note: 'Popular overview describing second-wave Starbucks-style coffee and the third-wave focus on origin, direct trade and precise brewing; used only for the general description of the waves.' },
  vnexpressDelivery: { title: 'Vietnamese spend $2.1B on food delivery in 2025', href: 'https://e.vnexpress.net/news/business/data-speaks/vietnamese-spend-2-1b-on-food-delivery-in-2025-5011109.html', publisher: 'VnExpress International (reporting Momentum Works)', note: 'Online food-delivery value of US$2.1 billion in 2025, up 19%, with ShopeeFood and GrabFood 48% each and beFood 4%.' },
  vcciDelivery: { title: 'Vietnam’s online food delivery market jumps 19% in 2025 as duopoly tightens grip', href: 'https://en.vcci.com.vn/economic-news/vietnams-online-food-delivery-market-jumps-19-in-2025-as-duopoly-tightens-grip-115008', publisher: 'VCCI (English-language)', note: 'Counts only completed orders placed through delivery apps; notes exits of Baemin, Gojek and Loship and the entry of Xanh SM Ngon in June 2025.' },
  tuoitreDelivery: { title: 'Food delivery apps enter new competition race in Vietnam', href: 'https://news.tuoitre.vn/food-delivery-apps-enter-new-competition-race-in-vietnam-103250714122856371.htm', publisher: 'Tuoi Tre News', note: 'Restaurants complain of commissions of 20–30% per order excluding advertising; a worked example of VND 100,000 leaving VND 70,000 at 30%.' },
  vnaTourism: { title: 'International arrivals to Vietnam hit new record in 2025, up over 20%', href: 'https://vietnam.vnanet.vn/english/tin-van/international-arrivals-to-vietnam-hit-new-record-in-2025-up-over-20-420386.html', publisher: 'Vietnam News Agency (reporting the National Authority of Tourism)', note: 'Nearly 21.2 million international visitors in 2025, up 20.4% and 17.8% above 2019, with a 2026 target of 25 million.' },
  foodSafetyLaw: { title: 'Consolidated Law on Food Safety 61/VBHN-VPQH of 2025', href: 'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Van-ban-hop-nhat-61-VBHN-VPQH-2025-Luat-An-toan-thuc-pham-671006.aspx', publisher: 'Thu Vien Phap Luat (Vietnamese-language)', note: 'Sets food-safety conditions for places that prepare and serve food and drink, including water, waste, storage, hygiene and the health and training of food handlers.' },
  foodSafetyCertificate: { title: 'Procedure for the food safety compliance certificate', href: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/tu-van-phap-luat/89834/thu-tuc-cap-giay-chung-nhan-co-so-du-dieu-kien-an-toan-thuc-pham-chi-tiet-thuc-hien-tu-01-7-2025', publisher: 'Thu Vien Phap Luat (Vietnamese-language)', note: 'Lists the file for a food-service establishment: business registration, facility description, health confirmation for the owner and food handlers, and trained-staff list; 20 working days to process.' },
  decree70: { title: 'Decree 70/2025/ND-CP amending the rules on invoices and documents', href: 'https://xaydungchinhsach.chinhphu.vn/nghi-dinh-70-2025-nd-cp-sua-doi-bo-sung-quy-dinh-ve-hoa-don-chung-tu-11925032321512617.htm', publisher: 'Chinhphu.vn (government portal, Vietnamese-language)', note: 'Government decree amending the invoice rules, effective 1 June 2025.' },
  decree70Review: { title: 'Decree 70/2025: 13 new points, when will they expire?', href: 'https://bizzi.vn/en/new-points-of-decree-70-2025-nd-cp-on-electronic-invoices/', publisher: 'Bizzi (accounting software provider, secondary)', note: 'Explains POS e-invoices for qualifying restaurants and households from June 2025 and reports that Decree 254/2026/ND-CP ended Decree 70’s validity from 1 July 2026; check the current text.' },
} satisfies Record<string, FashionM2Source>;
export type CoffeeSourceId = keyof typeof COFFEE_SOURCES;
export const citeC1 = (...ids: CoffeeSourceId[]): FashionM2Source[] => ids.map((id) => COFFEE_SOURCES[id]);

export const C1DeepDive = F2DeepDive;
export const c1Quiz = f2Quiz;

export function c1Chapter(input: Omit<CoffeeM1CardData, 'concepts'>): CoffeeM1CardData {
  return { ...input, concepts: [] };
}
