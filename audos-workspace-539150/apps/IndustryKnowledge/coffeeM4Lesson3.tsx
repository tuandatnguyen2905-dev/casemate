import { C4DeepDive, citeC4, c4Chapter, c4Quiz } from './coffeeM4Core';
import type { CoffeeM4LessonBundle } from './coffeeM4Core';

const LESSON = '3. Competitor Benchmarking';

const deck = [
  c4Chapter({
    title: 'Store Network, Geographic Coverage, and Accessibility', chapterTitle: LESSON, readingTime: '6',
    objective: 'Benchmark competitor networks on size, coverage, location quality, format and productivity, with dates and definitions attached.',
    mateIntro: 'A map full of pins looks impressive. What matters is how many of those pins are busy, profitable and in the right places.',
    keyInsight: 'Network scale matters when it improves accessibility, brand awareness, and operating efficiency. The objective is not simply to maximize outlet count, but to build a network of locations that can attract demand and operate profitably.',
    statTiles: [
      { value: '6', label: 'Network benchmarking activities', subtitle: 'Outlet count to expansion discipline', description: 'Outlet count, geographic reach, location quality, store format, network productivity and expansion discipline.' },
      { value: '1,000', label: 'Highlands outlets reached in June 2026', subtitle: 'The Investor and Agro.gov.vn', description: 'Up from 815 in January 2025 and 985 at end-2025.' },
      { value: '~2,500', label: 'Milano Coffee outlets reported by Momentum Works', subtitle: 'Largely a franchise-agency model', description: 'The only Vietnamese chain above 1,000 by outlet count, but a different model from company-run chains.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Milano’s count includes points of sale and is a company website figure repeated by Momentum Works, so it is not comparable with company-run store counts, and no comparable province-level coverage data for each brand was found.',
    narrative: [
      { label: 'What it is', text: 'Store network size influences brand visibility, customer convenience, purchasing scale, and the ability to reach different demand clusters. However, outlet count alone does not indicate market leadership or profitability because brands differ in store size, format, franchise structure, and sales productivity.' },
      { label: 'Why it is happening', text: 'Vietnam’s branded coffee market demonstrates these differences. Momentum Works’ 2026 report, as summarized by VietnamPlus, estimated the coffee-chain segment at US$725 million in 2025 and identified Milano Coffee and Highlands Coffee among the largest networks. Other chains compete through more selective expansion and differentiated formats.' },
      { label: 'Real-world example', text: 'Benchmarking compares the reported number of locations, checking the date and outlet definition; coverage across Hanoi, Ho Chi Minh City, other major cities and secondary markets; location quality, including visibility, traffic, accessibility, nearby competition and occupancy cost; and formats from flagships and standard outlets to kiosks, takeaway stores and franchise units. It then looks at sales per outlet, comparable-store growth and store contribution, and at openings alongside closures, relocations and payback.' },
      { label: 'Vietnam example', text: 'Highlands grew from 815 stores in January 2025 to 928 by September, 985 by year-end and 1,000 in June 2026, opening more than 100 a year, while Phúc Long grew from over 167 to nearly 200 stores outside WinMart by VietnamBiz’s count, or to 237 including kiosks by The Viet Media’s, and had 220 standalone outlets in the second quarter of 2026. VietnamBiz notes that after taking most of the best street sites, chains are moving into universities, large enterprises and culturally significant locations: Katinat opened in Hoa Sen University, Highlands opened a store for students of a Ho Chi Minh City technical university and Starbucks planned a store at Văn Lang University. Starbucks opened five stores in the Mekong Delta in mid-2025 and Phúc Long plans 40–50 new stores, with a focus on Hanoi, in 2026. Highlands’ same-store sales rose over 8% in 2025 and 11.5% in the second quarter of 2026, which shows existing stores earning more.' },
      { label: 'Business impact', text: 'Network benchmarking should combine size, coverage, location quality, and outlet productivity. A smaller but more productive network can outperform a larger network with weak store economics.' },
    ],
    visualKind: 'coffee-m4-31-network', visualHeading: 'Reported store counts around end-2025',
    visualIntro: 'Compare the reported outlet counts of five brands and read the caution under the chart.',
    imageAlt: 'Casemate bar chart of reported store counts of Vietnamese coffee brands around end-2025',
    keyTerms: [
      { term: 'Outlet count', definition: 'The number of operating locations, which depends on the definition and date used.' },
      { term: 'Network productivity', definition: 'Sales or contribution per outlet, not just the number of outlets.' },
      { term: 'Comparable-store growth', definition: 'Sales growth measured only on outlets open in both periods.' },
      { term: 'Location quality', definition: 'How well a site combines traffic, visibility, accessibility and cost.' },
    ],
    recap: [
      'Outlet count shows reach, not leadership or profit.',
      'Check the date and definition behind every count.',
      'Chains are moving into universities, workplaces and cultural sites.',
      'Comparable-store growth shows whether existing stores earn more.',
    ],
    chapterRecap: 'Network benchmarking should combine size, coverage, location quality, and outlet productivity. A smaller but more productive network can outperform a larger network with weak store economics.',
    deepDiveTitle: 'Why Milano and Highlands cannot be ranked by outlet count alone',
    body: <C4DeepDive paragraphs={[
      'Milano’s network is largely built through franchise agents and counts stores and points of sale, while Highlands’ stores are mostly company-run. A count of 2,500 and a count of 1,000 therefore describe different businesses.',
      'To compare them fairly, an analyst would need sales per outlet and outlet definitions from both, which are not public for Milano.' ]} evidence="Highlands counts are from VietnamBiz, VietData, The Viet Media, The Investor and Agro.gov.vn; Phúc Long counts are from The Viet Media, VietnamBiz, DNSE and The Investor; Milano is from VietnamPlus and Agro.gov.vn reporting Momentum Works and the company website; location moves are from VietnamBiz. The Milano comparison reasoning is our own." />,
    sources: citeC4('vietnamplusRegional', 'agroMilano', 'vietnambizShakeout', 'vietdataHighlands', 'vietmediaSplit', 'investorLargerPlayers', 'dnseChains', 'milanoFranchise'),
  }),
  c4Chapter({
    title: 'Product Assortment, Pricing, and Customer Experience', chapterTitle: LESSON, readingTime: '6',
    objective: 'Benchmark the full customer proposition, not menu prices alone, and note where evidence on experience is missing.',
    mateIntro: 'Two drinks at the same price can be very different purchases once you count the seat, the queue, the app and the taste.',
    keyInsight: 'Effective benchmarking evaluates the full customer proposition rather than comparing menu prices in isolation. A meaningful comparison considers product quality, portion size, experience, convenience, and perceived value together.',
    statTiles: [
      { value: '6', label: 'Proposition benchmarking activities', subtitle: 'Menu breadth to customer perception', description: 'Menu breadth, price architecture, product differentiation, customer experience, digital convenience and customer perception.' },
      { value: 'VND 35–70K', label: 'Reported price band of Phúc Long and Katinat', subtitle: 'VietnamBiz and Vinalink', description: 'Highlands is reported at VND 29,000–75,000.' },
      { value: '4', label: 'Drink groups on Phúc Long Unicorn’s menu', subtitle: 'VietnamBiz', description: 'Milk tea, coffee, fruit tea and ice-blended drinks.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Price bands are reported ranges and one source gives Katinat at VND 40,000–60,000; no public brand-level customer-satisfaction or review data was found.',
    narrative: [
      { label: 'What it is', text: 'Competitors differ in their core product categories, signature offerings, price levels, menu breadth, customization options, and store experience. Some emphasize accessible everyday coffee, while others compete through premium beverages, tea specialization, specialty coffee, or distinctive café environments.' },
      { label: 'Why it is happening', text: 'Customer experience also depends on consistency, waiting time, staff service, cleanliness, and digital convenience. A brand’s intended positioning should be compared with how customers actually experience its products and stores.' },
      { label: 'Real-world example', text: 'Benchmarking compares menu breadth across coffee, tea, cold drinks, bakery items, meals and seasonal products; price architecture from entry-level items and signatures to bundles and premium offers; differences in recipes, ingredients, local adaptation and innovation; experience through ambience, seating, service, cleanliness and order accuracy; digital convenience in ordering, payment, loyalty, delivery and pickup; and perception through surveys, reviews, repeat purchase and complaints.' },
      { label: 'Vietnam example', text: 'Highlands is reported at VND 29,000–75,000, Phúc Long at VND 35,000–70,000 and Katinat at VND 35,000–70,000 with an estimated average near VND 50,000, while Starbucks is clearly higher. Phúc Long Unicorn offers four drink groups and Phúc Long pushes cakes, ice cream and yoghurt, aiming for food at about 11% of 2026 revenue; Starbucks has added salt coffee, coconut coffee and matcha. On digital convenience, Highlands replaced Highlands Rewards with the HighlandsĐI app on 19 December 2025, Phúc Long gives one point per VND 10,000, and Starbucks is reported as stressing loyalty and cashless payment. No public brand-level survey or review data was found, so customer perception must be gathered first-hand.' },
      { label: 'Business impact', text: 'Product and experience benchmarking identifies where a brand offers meaningful customer value and where competitors perform better. The findings should inform menu development, pricing, service standards, and positioning.' },
    ],
    visualKind: 'coffee-m4-32-proposition', visualHeading: 'Four brands’ price bands and positioning',
    visualIntro: 'Read each brand’s reported price band and the evidence on how it is positioned.',
    imageAlt: 'Casemate table of price bands and positioning of four Vietnamese coffee brands',
    keyTerms: [
      { term: 'Price architecture', definition: 'How entry, signature, bundle and premium prices are arranged across a menu.' },
      { term: 'Perceived value', definition: 'The customer’s sense of what they get for the price.' },
      { term: 'Digital convenience', definition: 'Ease of ordering, paying, collecting and earning rewards through digital tools.' },
      { term: 'Positioning', definition: 'The place a brand aims to hold in customers’ minds relative to rivals.' },
    ],
    recap: [
      'Benchmark the whole proposition, not menu prices alone.',
      'Reported price bands for the big chains overlap heavily.',
      'Menu, space, service and digital convenience separate brands.',
      'Customer perception needs first-hand research where public data are missing.',
    ],
    chapterRecap: 'Product and experience benchmarking identifies where a brand offers meaningful customer value and where competitors perform better. The findings should inform menu development, pricing, service standards, and positioning.',
    deepDiveTitle: 'How to gather the evidence that public data do not provide',
    body: <C4DeepDive paragraphs={[
      'Visit each brand at the same daypart, order a comparable drink and note price, wait time, seat availability, cleanliness and how easy the app was. Repeat across several stores to separate brand standards from one store’s luck.',
      'Add short customer interviews and a review sample. The result is evidence of how customers actually experience each proposition, which is what the brief says should be compared with intended positioning.' ]} evidence="Price bands are from VietnamBiz, Vinalink and DNSE read as excerpts; the Unicorn menu, food push and Starbucks flavours are from VietnamBiz and Vietnam.vn; digital programmes are from Highlands’ announcement, Phúc Long’s website and DNSE. The mystery-shop method is our own suggestion." />,
    sources: citeC4('vietnambizHighlandsPhucLong', 'katinatProfile', 'dnseChains', 'vietnambizShakeout', 'phucLongResults', 'highlandsApp', 'phucLongRewards'),
  }),
  c4Chapter({
    title: 'Financial Performance, Operational Efficiency, and Digital Capability', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read financial and operating benchmarks with the right caution and separate verified results from estimates.',
    mateIntro: 'A crowded store and a growing map are not the same as a profitable business. Benchmarks need numbers behind them, and numbers need labels.',
    keyInsight: 'A competitor’s visible expansion or popularity should not be treated as proof of superior financial performance. The most useful benchmarks connect customer demand to unit economics, operational execution, and sustainable returns.',
    statTiles: [
      { value: '6', label: 'Financial and operational benchmarking activities', subtitle: 'Sales performance to evidence quality', description: 'Sales performance, profitability, labor efficiency, inventory and waste, digital capability and evidence quality.' },
      { value: 'VND 22.8M', label: 'Phúc Long average daily revenue per store in 2025', subtitle: 'Masan results via Vietnam.vn, up 6%', description: 'Rose to VND 26.2 million in the second quarter of 2026.' },
      { value: '>10%', label: 'Phúc Long net profit margin in 2025', subtitle: 'VND 195 billion on nearly VND 1,900 billion', description: 'Before minority interests.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Highlands reports EBITDA and Phúc Long reports net profit, so the two are not comparable, and no comparable unit economics for Katinat or Starbucks Vietnam were found.',
    narrative: [
      { label: 'What it is', text: 'Financial and operational benchmarking helps distinguish brands that attract attention from those that convert demand into sustainable returns. Relevant measures include revenue growth, comparable-store sales, average transaction value, gross margin, labor productivity, rent burden, waste, and store investment payback.' },
      { label: 'Why it is happening', text: 'Digital capabilities also influence competitiveness by improving ordering convenience, customer retention, demand forecasting, and operational visibility. Euromonitor identifies digital engagement, loyalty programs, delivery, and operating efficiency as important competitive themes in Vietnam’s consumer foodservice market.' },
      { label: 'Real-world example', text: 'Analysts compare revenue growth, same-store sales, order value and frequency; gross margin, operating expenses, store contribution and return on capital; sales per labour hour, staffing, preparation time and throughput; stock availability, usage, spoilage and turnover; owned ordering channels, loyalty engagement and data use; and, finally, they separate reported results from analyst estimates, survey perceptions and third-party store-count snapshots.' },
      { label: 'Vietnam example', text: 'Highlands reported EBITDA of about PHP 666 million (over VND 297 billion) in the third quarter of 2025, up 17.1%, nine-month EBITDA of about VND 852 billion, and VND 1,097 billion for the full year, with same-store sales up over 8%; a press report puts average store EBITDA near VND 640 million per half-year, about VND 3.5 million a day. Phúc Long reported revenue of nearly VND 1,900 billion and net profit of VND 195 billion, and targets 2026 revenue of VND 2,300–2,500 billion and EBITDA of VND 370–418 billion. Euromonitor’s summary page lists delivery and location themes; its digital and loyalty themes could not be checked because the full report is paid. A Vietnam-wide survey found 42.7% of surveyed establishments with revenue down at least 5% in the first half of 2026, so chain results are not the whole market.' },
      { label: 'Business impact', text: 'Financial and operational benchmarks provide a more reliable view of competitive strength than brand visibility alone. Where public data are incomplete, analysts should clearly distinguish verified results from estimates and qualitative observations.' },
    ],
    visualKind: 'coffee-m4-33-financial', visualHeading: 'Reported measures and their cautions',
    visualIntro: 'Read each reported measure, then the caution that goes with it.',
    imageAlt: 'Casemate table of reported financial and operating measures for Vietnamese coffee chains with cautions',
    keyTerms: [
      { term: 'EBITDA', definition: 'Earnings before interest, tax, depreciation and amortisation.' },
      { term: 'Same-store sales', definition: 'Sales growth on outlets open in both compared periods.' },
      { term: 'Unit economics', definition: 'Revenue and cost per store or per order.' },
      { term: 'Evidence quality', definition: 'How reliable a figure is, based on its source, date and definition.' },
    ],
    recap: [
      'Expansion and popularity are not proof of profit.',
      'Compare like with like: same source, year and definition.',
      'EBITDA and net profit are different measures.',
      'Separate reported results from estimates and observation.',
    ],
    chapterRecap: 'Financial and operational benchmarks provide a more reliable view of competitive strength than brand visibility alone. Where public data are incomplete, analysts should clearly distinguish verified results from estimates and qualitative observations.',
    deepDiveTitle: 'Why Highlands’ and Phúc Long’s figures cannot be put in one column',
    body: <C4DeepDive paragraphs={[
      'Highlands’ parent group discloses EBITDA, a measure before depreciation and financing costs. Phúc Long’s owner discloses net profit before minority interests, a measure after them, so the two numbers describe different things.',
      'To compare them fairly an analyst would need the same measure for both, or would convert using disclosed depreciation and interest, which the public reports do not fully provide.' ]} evidence="Highlands figures are from VietData reporting Jollibee Foods Corporation, Agro.gov.vn and The Viet Media; the per-store EBITDA figure is from a Vietstock excerpt; Phúc Long figures are from Vietnam.vn reporting Masan and The Investor; the survey result is from The Investor; the Euromonitor point is from its summary page. A 2024 Highlands figure of about VND 1,050 billion appears elsewhere in this course and was labelled EBITDA by one outlet and pre-tax profit by another." />,
    sources: citeC4('vietdataHighlands', 'agroMilano', 'vietmediaSplit', 'vietstockRepositioning', 'phucLongResults', 'investorLargerPlayers', 'euromonitorFoodservice', 'chainRace2025'),
  }),
];

const quiz = c4Quiz('coffee-m4-l3', [
  { chapter: '1', objective: 'State the network objective', question: 'What should the objective of network expansion be?', application: 'A chain wants more pins on the map. What should it aim for instead?', correct: 'A network of locations that can attract demand and operate profitably', wrong: ['The largest outlet count at any cost', 'The cheapest sites only', 'No closures ever'], explanation: 'Scale must improve accessibility and efficiency. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the Highlands path', question: 'Which sequence of Highlands store counts matches the reports?', application: 'An analyst plots growth. What is the path?', correct: '815 in January 2025, 928 by September, 985 at end-2025, 1,000 in June 2026', wrong: ['100, 200, 300, 400', '985 in January 2025, then falling', '1,000 in 2020, then closures'], explanation: 'Counts are tied to dates. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare Milano and Highlands', question: 'Why is Milano’s outlet count not directly comparable with Highlands’?', application: 'A deck ranks them by count. What is wrong?', correct: 'Milano is largely a franchise-agency network counting points of sale, a different model', wrong: ['Milano has no stores', 'Highlands is a delivery app', 'Both count exactly the same things'], explanation: 'Definitions differ. Review Chapter 1.' },
  { chapter: '2', objective: 'State the benchmarking rule', question: 'What should product and pricing benchmarking evaluate?', application: 'An analyst compares only menu prices. What is missing?', correct: 'The full customer proposition: quality, portion, experience, convenience and perceived value together', wrong: ['Only the lowest price', 'Only the logo', 'Only the number of drinks'], explanation: 'Price alone misleads. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Unicorn’s menu', question: 'How many drink groups does Phúc Long Unicorn’s menu balance?', application: 'A student describes Unicorn. What does the menu cover?', correct: 'Four: milk tea, coffee, fruit tea and ice-blended drinks', wrong: ['One only', 'Ten', 'None'], explanation: 'It broadened beyond milk tea. Review Chapter 2.' },
  { chapter: '2', objective: 'Note an evidence gap', question: 'What did the research find on brand-level customer-satisfaction data?', application: 'A report quotes satisfaction scores for each chain. Is there a public source?', correct: 'No public brand-level survey or review data was found', wrong: ['It shows Highlands is first', 'It shows Starbucks is last', 'It is published monthly'], explanation: 'First-hand research is needed. Review Chapter 2.' },
  { chapter: '3', objective: 'State the profit rule', question: 'What does visible expansion prove about financial performance?', application: 'A chain opens many stores. What can be concluded about profit?', correct: 'Nothing on its own; benchmarks must link demand to unit economics and returns', wrong: ['That it is the most profitable', 'That it has no costs', 'That it will never close stores'], explanation: 'Popularity is not profit. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Phúc Long’s margin', question: 'What net profit margin did Phúc Long report for 2025?', application: 'An analyst checks the margin. What was reported?', correct: 'Above 10%', wrong: ['About 1%', 'About 50%', 'Negative'], explanation: 'VND 195 billion on nearly VND 1,900 billion. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare measures', question: 'Why can Highlands’ EBITDA and Phúc Long’s net profit not be compared directly?', application: 'A table lists both side by side. What is wrong?', correct: 'They are different measures, before and after depreciation and financing', wrong: ['They are in different currencies', 'One is a forecast of tea prices', 'Both are identical'], explanation: 'Compare like with like. Review Chapter 3.' },
  { chapter: '3', objective: 'Judge a source', question: 'What could not be checked about Euromonitor’s themes on digital engagement and loyalty?', application: 'A slide cites them as fact. What is the limit?', correct: 'The full report is paid, and only the summary page could be read', wrong: ['The report does not exist', 'The report is free', 'The report is about tea only'], explanation: 'Label what was and was not read. Review Chapter 3.' },
]);

export const LESSON_C4_3: CoffeeM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can benchmark competitors on network, proposition and financial performance, with dates, definitions and caveats attached.',
    keyTakeaways: [
      'Outlet count shows reach, not leadership or profit.',
      'Highlands reached 1,000 outlets in June 2026; Milano’s larger count is a different model.',
      'Benchmark the whole proposition, not menu prices alone.',
      'Compare like with like: EBITDA and net profit are different measures.',
      'Separate reported results from estimates and gaps.',
    ],
    businessImplications: 'Build benchmarks from sales per store, contribution and customer experience, and label every figure with source, date and definition.',
    remember: 'A bigger map is not a better business.',
    nextLesson: 'Key Success Factors',
  },
};
