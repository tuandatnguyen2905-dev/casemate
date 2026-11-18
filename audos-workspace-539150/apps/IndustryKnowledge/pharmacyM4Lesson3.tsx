import { P4DeepDive, citeP4, p4Chapter, p4Quiz } from './pharmacyM4Core';
import type { PharmacyM4LessonBundle } from './pharmacyM4Core';

const LESSON = '3. Competitor Benchmarking';

const deck = [
  p4Chapter({
    title: 'Store Network, Geographic Coverage and Accessibility', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare chains on where their stores are, not only how many they have.',
    mateIntro: 'Store counts are the easiest number to quote and the easiest to misuse. Where the stores are, and when they were counted, matter just as much.',
    keyInsight: 'Store count shows reach, but meaningful benchmarking compares geographic coverage and productivity, using one reporting date for every chain.',
    statTiles: [
      { value: '7', label: 'Network benchmarking checks', subtitle: 'Store count to local access', description: 'Total store count, regional split, big-city versus other-region coverage, local density, accessibility, store openings and closures, and consistency of the reporting date.' },
      { value: '3,457', label: 'Chain pharmacy stores in 2025', subtitle: 'Up from 492 in 2019', description: 'Q&Me modern-trade counts as reproduced by a report aggregator.' },
      { value: '1,977 / 938 / 326', label: 'Long Châu, Pharmacity and An Khang stores in the 2025 survey', subtitle: 'Q&Me count by chain', description: 'A survey count at one date, lower than the company-reported end-2025 networks.' },
    ],
    statsNote: 'The first tile is a count of checks from this lesson; the store numbers come from a secondary reproduction of a Q&Me survey, so they differ from company-reported networks at other dates (Long Châu reports 2,417 at end-2025).',
    narrative: [
      { label: 'What it is', text: 'Store network benchmarking compares how many outlets each chain has, where they are, and how easily customers can reach them. A bigger network gives more convenience, but a map of stores says more than a total: a chain with many stores in two big cities competes differently from one spread across provinces. Benchmarks are only fair when every chain is counted on the same date and with the same definition.' },
      { label: 'Why it is happening', text: 'Medicine is a nearby purchase, and customers often choose the closest dependable pharmacy. Chains therefore race to be close to homes, workplaces and clinics, but each new site adds cost, so coverage has to be judged against what each store sells.' },
      { label: 'Real-world example', text: 'An analyst builds a table of chains by region on one survey date, adds the share of stores outside the largest cities, checks how many stores opened and closed in the period, and then divides sales by stores to see whether wide coverage is also productive.' },
      { label: 'Vietnam example', text: 'In the 2025 Q&Me count, Long Châu had 1,977 stores, of which 322 were in Ho Chi Minh City, 235 in Hanoi and 1,420 elsewhere, which is about 72% outside the two big cities by our own calculation. Pharmacity had 938, strongest in Ho Chi Minh City with 397; An Khang had 326 and no Hanoi store; Guardian 126, Medicare 64, Phano 14 and Matsumoto Kiyoshi 12. Chain stores rose from 492 in 2019 to 3,457 in 2025, and Vietcap says Long Châu held more than half of chain stores by May 2025.' },
      { label: 'Business impact', text: 'Network coverage shows where a chain can serve customers, but only combined with productivity does it show whether that reach is an advantage. Fair benchmarking uses one date and one definition, and treats store count as a starting point.' },
    ],
    visualKind: 'pharmacy-m4-31-network', visualHeading: 'Where the chains’ stores are',
    visualIntro: 'Read the table of 2025 chain stores by region and compare reach beyond the big cities.',
    imageAlt: 'Casemate table of 2025 pharmacy chain store counts by region in Vietnam',
    keyTerms: [
      { term: 'Store network', definition: 'The full set of outlets a chain operates.' },
      { term: 'Geographic coverage', definition: 'How widely a chain’s stores are spread across regions.' },
      { term: 'Local density', definition: 'The number of a chain’s stores within a given local area.' },
      { term: 'Reporting date', definition: 'The date to which a store count refers.' },
    ],
    recap: [
      'Store count shows reach but not where or how productively.',
      'Regional spread differs sharply between chains.',
      'Benchmarks must use one date and one definition.',
      'Coverage is judged together with sales per store.',
    ],
    chapterRecap: 'Network coverage shows where a chain can serve customers, but only combined with productivity does it show whether that reach is an advantage. Fair benchmarking uses one date and one definition, and treats store count as a starting point.',
    deepDiveTitle: 'Why two store counts for the same chain can both be right',
    body: <P4DeepDive paragraphs={[
      'A survey counts stores on the dates it collects data, while a company reports its network at the end of a quarter or year and may include different formats. A gap between the two is therefore not necessarily an error.',
      'When comparing chains, take every figure from the same publisher and date, and say so, instead of mixing a survey count for one chain with a company figure for another.' ]} evidence="Chain and regional counts are from a Q&Me modern-trade report as reproduced by a report aggregator and a CafeBiz report of the same survey; the share outside the two big cities is our own calculation from those counts. The more-than-half share is from Vietcap research." />,
    sources: citeP4('qmeSeries', 'qmeChains', 'vietcapRace', 'shsPharmacy'),
  }),
  p4Chapter({
    title: 'Product Assortment, Pricing and Customer Experience', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare chains on what customers actually experience: range, like-for-like price, stock and service.',
    mateIntro: 'Customers do not compare store counts. They compare whether the product is there, whether the price is fair and whether the service can be trusted.',
    keyInsight: 'The strongest proposition combines availability, credible value and dependable service, since promotions attract customers but experience builds trust.',
    statTiles: [
      { value: '7', label: 'Customer comparison factors', subtitle: 'Assortment breadth to brand trust', description: 'Assortment breadth, price benchmarking, availability performance, service quality, professional credibility, customer experience and brand trust.' },
      { value: '~70%', label: 'Returning-customer rate claimed for Long Châu', subtitle: 'Group statement', description: 'A company-group claim, not an independent measure.' },
      { value: '< 2 hours', label: 'Delivery commitment for Long Châu orders', subtitle: 'Group statement', description: 'A commitment stated by the group, applying to eligible orders.' },
    ],
    statsNote: 'The first tile is a count of factors from this lesson; the other two figures are company-group statements and have not been independently checked.',
    narrative: [
      { label: 'What it is', text: 'Assortment, pricing and customer experience benchmarking compares what each chain offers and how it feels to buy there. It covers the breadth of prescription, over-the-counter, device, supplement and personal-care ranges; prices for like-for-like products; whether common items are in stock; waiting times and helpfulness; staff credibility; and trust in the brand. Because pharmacy products differ in pack size and formulation, price comparisons are only meaningful when products are truly equivalent.' },
      { label: 'Why it is happening', text: 'Health purchases carry risk, so customers weigh reliability and advice together with price. Chains also earn more on some categories than others, so range choices change both the customer offer and the economics.' },
      { label: 'Real-world example', text: 'A benchmarking team visits stores of several chains with the same basket, records which items are in stock, adjusts prices for pack size, times the wait at the counter, notes how staff explain use and referral, and scores complaint handling.' },
      { label: 'Vietnam example', text: 'Long Châu’s Plus format combines pharmacy and convenience ranges, and an independent analyst notes that supplements and personal care carry higher margins. The Long Châu group says it commits to delivery in under two hours and that about 70% of customers return, both company claims. A VNeID-based online purchase service was reported in 2025, but Law 44/2024 bans online retail of certain medicines, so digital convenience has legal limits. Pharmacity has run a private-label range since 2015, according to a third-party profile.' },
      { label: 'Business impact', text: 'Assortment, price and service are what customers feel, so benchmarking them like for like shows where a chain’s proposition is genuinely stronger. Promotions can draw a first visit, but availability and dependable service decide repeat purchases and trust.' },
    ],
    visualKind: 'pharmacy-m4-32-experience', visualHeading: 'Seven ways customers compare pharmacies',
    visualIntro: 'See the seven factors customers weigh and what a fair comparison checks for each.',
    imageAlt: 'Casemate tree mind map of seven factors customers use to compare pharmacies',
    keyTerms: [
      { term: 'Assortment breadth', definition: 'The range of product categories a pharmacy carries.' },
      { term: 'Like-for-like price', definition: 'A price compared for the same product, pack size and formulation.' },
      { term: 'Availability performance', definition: 'How reliably commonly requested products are in stock.' },
      { term: 'Private label', definition: 'A product sold under a retailer’s own brand.' },
    ],
    recap: [
      'Customers compare range, price, stock and service together.',
      'Price comparisons must be like for like.',
      'Promotions attract; experience builds trust.',
      'Digital convenience is bounded by regulation.',
    ],
    chapterRecap: 'Assortment, price and service are what customers feel, so benchmarking them like for like shows where a chain’s proposition is genuinely stronger. Promotions can draw a first visit, but availability and dependable service decide repeat purchases and trust.',
    deepDiveTitle: 'How to run a fair mystery-basket comparison',
    body: <P4DeepDive paragraphs={[
      'Choose a small basket of common products, including a prescription-free medicine, a supplement and a personal-care item, and record the exact brand, pack size and price in each chain on the same day.',
      'Add observations that numbers miss, such as waiting time, whether staff asked about symptoms and whether the item was in stock. Repeat the comparison on other days before drawing conclusions.' ]} evidence="The seven factors are described qualitatively in the supplied material. Delivery and returning-customer figures are group statements; the margin comment is an independent analyst view; the online rule is from a Drug Administration letter quoting the amended law; Pharmacity’s private label is from a third-party profile." />,
    sources: citeP4('kennoLongChau', 'chungtaTouchpoints', 'techsciEpharmacy', 'dav1136', 'aktaPharmacity'),
  }),
  p4Chapter({
    title: 'Financial Performance, Operational Efficiency and Digital Capability', chapterTitle: LESSON, readingTime: '7',
    objective: 'Use sales per store, margins and cost control to judge whether a chain’s growth is turning into profit.',
    mateIntro: 'Revenue can grow for years while a chain loses money. The benchmark that matters is what each store earns after costs.',
    keyInsight: 'Productivity links market position to profit: a chain that attracts customers but cannot manage stock, labour and store costs may not turn growth into earnings.',
    statTiles: [
      { value: '8', label: 'Financial and efficiency benchmarks', subtitle: 'Sales per store to digital capability', description: 'Revenue growth, sales per store, gross margin, net margin, inventory productivity, labour and rent cost, accumulated losses and digital capability.' },
      { value: 'US$43K / 18K / 16K', label: 'Monthly sales per store in 2023 at Long Châu, Pharmacity and An Khang', subtitle: 'Broker figures', description: 'From a 2023 investor presentation; later company figures are in VND.' },
      { value: '23.4%', label: 'Long Châu gross margin in 2025', subtitle: 'Up from 22.2% in 2024', description: 'A broker estimate for the Long Châu business.' },
    ],
    statsNote: 'The first tile is a count of benchmarks from this lesson; the sales-per-store and margin figures are broker or company numbers for different years and currencies, so compare each within its own source.',
    narrative: [
      { label: 'What it is', text: 'Financial benchmarking compares chains on growth and, more importantly, on profitability and efficiency. Sales per store show how productive each outlet is; gross margin shows what remains after buying the goods; net margin shows what remains after all costs; and inventory, labour and rent efficiency show where profit is made or lost. Digital capability, such as stock visibility, forecasting and order fulfilment, supports all of these by cutting waste and improving availability.' },
      { label: 'Why it is happening', text: 'A pharmacy chain carries high fixed costs in rent, staff and stock. Profit therefore depends on getting enough sales through each store, and on using data and systems to keep stock and labour in line with demand.' },
      { label: 'Real-world example', text: 'An investor lines up revenue growth, sales per store, gross and net margin, stock days and accumulated losses for each chain, then asks what is driving the differences: more customers, better mix, tighter stock or lower cost per store.' },
      { label: 'Vietnam example', text: 'In 2023 a Vietcap comparison put monthly sales per store at about US$43,000 for Long Châu against about US$18,000 for Pharmacity and US$16,000 for An Khang, with Long Châu making a small profit and the others losses. For 2025, Long Châu reported revenue of VND 34,501 billion, up 36%, an average of about VND 1.2 billion per store per month, a gross margin of 23.4% from 22.2% a year earlier, and a net margin of about 2.1%. An Khang lost VND 112.96 billion in 2025, with accumulated losses of VND 1,115.3 billion, while Pharmacity reported profit from the fourth quarter of 2025.' },
      { label: 'Business impact', text: 'Financial benchmarking shows whether market position is converting into earnings. Chains that combine high sales per store, disciplined costs and strong systems can fund growth, while those that cannot may be forced to restructure.' },
    ],
    visualKind: 'pharmacy-m4-33-financial', visualHeading: 'Sales per store, 2023',
    visualIntro: 'Compare average monthly sales per store at the three largest chains in 2023.',
    imageAlt: 'Casemate bar chart of average monthly sales per store at Long Chau, Pharmacity and An Khang in 2023',
    keyTerms: [
      { term: 'Sales per store', definition: 'The average revenue an outlet earns in a period.' },
      { term: 'Gross margin', definition: 'Sales less the cost of goods sold, as a share of sales.' },
      { term: 'Net margin', definition: 'Profit after all costs as a share of sales.' },
      { term: 'Accumulated loss', definition: 'The total of losses over several years.' },
    ],
    recap: [
      'Sales per store show how productive each outlet is.',
      'Gross and net margin show where profit is kept or lost.',
      'Stock, labour and rent efficiency drive store profit.',
      'Digital capability supports availability and cost control.',
    ],
    chapterRecap: 'Financial benchmarking shows whether market position is converting into earnings. Chains that combine high sales per store, disciplined costs and strong systems can fund growth, while those that cannot may be forced to restructure.',
    deepDiveTitle: 'Why a gross margin gain is not the same as profit',
    body: <P4DeepDive paragraphs={[
      'A higher gross margin means the chain keeps more of each sale after paying suppliers, helped by mix, better terms or private labels. It does not show what stores, staff, rent and logistics cost.',
      'Net margin reflects those costs. A chain can have a healthy gross margin and still lose money if sales per store are too low to cover its operating expenses.' ]} evidence="The eight benchmarks are described qualitatively in the supplied material. The 2023 comparison is from a Vietcap investor presentation; 2025 revenue, average sales and margins are from broker and company-reported figures in the press; An Khang and Pharmacity results are from Vietnamese financial news and a company press release." />,
    sources: citeP4('vietcapVad2024', 'longChauAvg2025', 'acbsFrt', 'longChauNetMargin', 'fptRetail2025', 'anKhang2025', 'pharmacityPress'),
  }),
];

const quiz = p4Quiz('pharmacy-m4-l3', [
  { chapter: '1', objective: 'State what store count shows', question: 'What does store count show on its own?', application: 'A report ranks chains by store count only. What is missing?', correct: 'Reach, but not geographic coverage or productivity', wrong: ['Profit per store', 'Customer satisfaction', 'Product quality'], explanation: 'Count is a starting point. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply a fair benchmark', question: 'What makes a store-count comparison fair?', application: 'An analyst mixes survey counts and company figures. What should change?', correct: 'Use one reporting date and one definition for every chain', wrong: ['Use the largest number for each chain', 'Ignore dates', 'Count only big cities'], explanation: 'Dates and definitions differ. Review Chapter 1.' },
  { chapter: '1', objective: 'Read regional coverage', question: 'In the 2025 Q&Me count, where were most Long Châu stores?', application: 'A reader checks the regional table. What does it show?', correct: 'Outside Ho Chi Minh City and Hanoi, about 72% of its stores', wrong: ['All in Ho Chi Minh City', 'All in Hanoi', 'Evenly in three cities'], explanation: 'Long Châu spread beyond the big cities. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe growth in chain stores', question: 'How did chain pharmacy stores change between 2019 and 2025?', application: 'A student reads the bar chart. What happened?', correct: 'They rose from 492 to 3,457', wrong: ['They fell by half', 'They stayed at 492', 'They reached 50,000'], explanation: 'Chains grew quickly but stay a small share of outlets. Review Chapter 1.' },
  { chapter: '2', objective: 'State the strongest proposition', question: 'What combination makes the strongest pharmacy proposition?', application: 'A chain relies on promotions alone. What is missing?', correct: 'Availability, credible value and dependable service', wrong: ['Discounts only', 'Store count only', 'Advertising only'], explanation: 'Experience builds trust. Review Chapter 2.' },
  { chapter: '2', objective: 'Make a fair price comparison', question: 'When is a price comparison between pharmacies meaningful?', application: 'Two chains sell similar-looking products in different pack sizes. What should be done?', correct: 'When products are truly equivalent, adjusted for pack size and formulation', wrong: ['Whenever labels look alike', 'Only on the cheapest item', 'Never'], explanation: 'Like-for-like matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognise a company claim', question: 'How should the claim that about 70% of Long Châu customers return be treated?', application: 'A slide quotes the figure. What should a careful reader note?', correct: 'As a company-group statement that has not been independently checked', wrong: ['As audited fact', 'As a government statistic', 'As irrelevant'], explanation: 'Source type matters. Review Chapter 2.' },
  { chapter: '3', objective: 'Compare sales per store in 2023', question: 'Which chain had the highest monthly sales per store in the 2023 comparison?', application: 'An investor reads the bar chart. Which is highest?', correct: 'Long Châu, at about US$43,000', wrong: ['Pharmacity, at about US$43,000', 'An Khang, at about US$43,000', 'All were equal'], explanation: 'Productivity differed widely. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain productivity and profit', question: 'Why may a chain that attracts customers still not earn profit?', application: 'A chain grows revenue but loses money. What may explain it?', correct: 'It cannot manage stock, labour and store costs well enough', wrong: ['Customers dislike profit', 'Revenue always equals profit', 'Margins do not matter'], explanation: 'Growth must convert to earnings. Review Chapter 3.' },
  { chapter: '3', objective: 'Distinguish gross from net margin', question: 'What does net margin show that gross margin does not?', application: 'Two chains have similar gross margins. How can profit differ?', correct: 'Profit after all costs, including stores, staff, rent and logistics', wrong: ['Only the supplier price', 'Only the sales mix', 'Only advertising'], explanation: 'Costs sit below gross margin. Review Chapter 3.' },
]);

export const LESSON_P4_3: PharmacyM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can benchmark chains on network and coverage, on what customers experience, and on productivity and profit, using like-for-like data.',
    keyTakeaways: [
      'Store count shows reach, not coverage or productivity.',
      'Use one date and one definition when comparing chains.',
      'Compare range, like-for-like price, stock and service together.',
      'Promotions attract customers; dependable service builds trust.',
      'Sales per store and margins show whether growth becomes profit.',
    ],
    businessImplications: 'Benchmark competitors on the same date and definition, and judge them by productivity and customer experience as well as size.',
    remember: 'Reach is not the same as performance.',
    nextLesson: 'Key Success Factors',
  },
};
