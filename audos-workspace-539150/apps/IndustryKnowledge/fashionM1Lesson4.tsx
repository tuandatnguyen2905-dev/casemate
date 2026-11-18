import { F1DeepDive, citeF1, f1Chapter, f1Quiz } from './fashionM1Core';
import type { FashionM1LessonBundle } from './fashionM1Core';

const LESSON = '4. Vietnam Market Overview';

const deck = [
  f1Chapter({
    title: 'Market Size and Consumer Demand', chapterTitle: LESSON, readingTime: '7',
    objective: 'Separate Vietnam’s total retail market from the apparel category, and describe what drives domestic demand at different price points.',
    mateIntro: 'Vietnam’s retail market and Vietnam’s apparel market differ by more than thirty times. Quoting the wrong one is the single most common error in a Vietnam retail case.',
    keyInsight: 'Vietnam offers opportunities for both mass-market and higher-value retail positioning. Retailers need to balance changing consumer expectations against purchasing power, price sensitivity, brand preference and differences in demand across customer groups.',
    statTiles: [
      { value: '$269B', label: 'Total retail, 2025', subtitle: 'Up roughly 9–10% on 2024', description: 'All goods and consumer services — not fashion and sports alone.' },
      { value: '$7.52B', label: 'Apparel market, 2025', subtitle: 'Ken Research estimate', description: 'The category figure; about 36 times smaller than total retail.' },
      { value: '6.8%', label: 'Apparel CAGR to 2031', subtitle: 'Toward USD 11.14 billion', description: 'A projection dependent on the report methodology.' },
    ],
    statsNote: 'All figures are estimates provided in the research material and should be verified against their original publications before formal use.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s retail market provides a domestic growth environment for fashion, sports and lifestyle businesses. Rising retail activity, expanding digital commerce and consumer interest in fashion and active lifestyles create opportunities for both domestic and international retailers.' },
      { label: 'Why it is happening', text: 'The overall retail market must be distinguished from the narrower apparel and sportswear categories. Total retail covers food, fuel, electronics and consumer services, so using it as a proxy for clothing demand overstates the opportunity by an order of magnitude.' },
      { label: 'Real-world example', text: 'Retail sales of goods and consumer services were estimated at approximately USD 269 billion in 2025, growing around 9–10% on 2024. Ken Research estimates Vietnam’s apparel market at approximately USD 7.52 billion in 2025, potentially reaching USD 11.14 billion by 2031 at a 6.8% CAGR.' },
      { label: 'Vietnam example', text: 'Fashion products serve everyday clothing needs, professional settings and self-expression, while sportswear demand is associated with fitness, recreation, comfort and the use of athletic clothing in everyday life. Consumers evaluate products on affordability, quality, brand recognition, functionality and perceived value.' },
      { label: 'Business impact', text: 'Demand differs across age groups, income levels, lifestyles and product categories, which creates viable positions at several price points. Retailers benefit from identifying the segments most relevant to their portfolio rather than chasing the market average.' },
    ],
    visualKind: 'fashion-m1-41-vietnam', visualHeading: 'Vietnam: separate the totals before you use them',
    visualIntro: 'Read each supplied estimate alongside exactly what it does and does not cover.',
    imageAlt: 'Casemate table separating Vietnam total retail from the apparel category estimate',
    keyTerms: [
      { term: 'Total retail sales', definition: 'Sales of all goods and consumer services across the economy, far broader than any single retail category.' },
      { term: 'Category demand', definition: 'Spending within a defined product category such as apparel, which must be sized separately from total retail.' },
      { term: 'Perceived value', definition: 'The customer’s judgement of what a product is worth relative to its price, combining quality, brand and functionality.' },
      { term: 'Price sensitivity', definition: 'How strongly demand responds to a change in price, which varies sharply across Vietnamese customer segments.' },
    ],
    recap: [
      'Total retail was estimated near USD 269 billion in 2025, growing about 9–10%.',
      'The apparel market was estimated near USD 7.52 billion in 2025.',
      'Apparel is projected toward USD 11.14 billion by 2031 at 6.8% CAGR.',
      'Demand varies by age, income, lifestyle and category, supporting several price points.',
    ],
    chapterRecap: 'Assess category-specific demand, spending behaviour and price sensitivity rather than using total retail expenditure as a direct measure of fashion and sports retail sales.',
    deepDiveTitle: 'The thirty-six times mistake',
    body: <F1DeepDive paragraphs={[
      'USD 269 billion and USD 7.52 billion both describe Vietnam retail in 2025, and they differ by roughly thirty-six times. The first counts every grocery basket, phone and haircut in the country. The second counts clothing. A business plan that sizes its addressable market from the first number will raise expectations no assortment can meet.',
      'The same discipline applies to the growth rates. Total retail growing 9–10% and apparel growing 6.8% are not in conflict — they measure different things over different periods from different publishers. Report them separately, name the source for each, and never average them into a single headline rate.',
    ]} evidence="Both figures are estimates supplied in the research material. The apparel figure depends on Ken Research’s market definition and is not an official national statistic." />,
    sources: citeF1('gsoRetail', 'kenVietnamApparel', 'worldBankVietnam'),
  }),
  f1Chapter({
    title: 'Distribution Channels, Consumption Centres and Supply Base', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map Vietnam’s retail channel mix and consumption centres, and separate the country’s export manufacturing role from its domestic retail market.',
    mateIntro: 'Vietnam makes clothing for the world and buys clothing for itself. These are two different businesses with different customers — do not let one stand in for the other.',
    keyInsight: 'Vietnam’s market structure combines established physical retail networks with growing digital distribution. Retailers must distinguish between the country’s role as a manufacturing and export base and its role as a domestic consumer market.',
    statTiles: [
      { value: '$32B', label: 'E-commerce market, 2025', subtitle: 'Supplied research estimate', description: 'Scope and measurement basis require verification before formal use.' },
      { value: '~12%', label: 'Of total retail revenue', subtitle: 'E-commerce share', description: 'Measured against total goods and consumer service sales.' },
      { value: '2', label: 'Primary consumption centres', subtitle: 'Hanoi and Ho Chi Minh City', description: 'Then Da Nang and Hai Phong as secondary urban markets.' },
    ],
    statsNote: 'The e-commerce estimate is supplied research material; its market definition and measurement scope need verification.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s market combines traditional shopping channels, brand-owned stores, shopping malls, e-commerce marketplaces and social commerce. At the same time, the country’s textile, apparel and footwear manufacturing base connects domestic retail to international supply chains.' },
      { label: 'Why it is happening', text: 'Traditional stores, specialty retailers, malls, brand websites and marketplaces coexist rather than replacing one another. Their relative importance varies by customer segment, brand positioning and product category, so a single channel strategy rarely fits a whole portfolio.' },
      { label: 'Real-world example', text: 'The research material estimates Vietnam’s e-commerce market at approximately USD 32 billion in 2025, equivalent to nearly 12% of total retail sales of goods and consumer service revenue. Hanoi and Ho Chi Minh City are the important centres for branded retail, malls and higher purchasing power, with Da Nang and Hai Phong also offering opportunity.' },
      { label: 'Vietnam example', text: 'Industrial areas and secondary cities may offer demand from working populations seeking affordable, practical, everyday products. Vietnam also has substantial textile, garment and footwear manufacturing supported by international sourcing and export relationships.' },
      { label: 'Business impact', text: 'Export manufacturing output is not equivalent to domestic retail sales: the two have different customers, revenue structures and market indicators. Conflating them inflates the apparent size of the domestic opportunity.' },
    ],
    visualKind: 'fashion-m1-42-channels', visualHeading: 'Vietnam channels, cities and supply base',
    visualIntro: 'Review each element of the market structure alongside the analytical caution that goes with it.',
    imageAlt: 'Casemate table of Vietnam retail channels, consumption centres and manufacturing base',
    keyTerms: [
      { term: 'Channel mix', definition: 'The combination of traditional stores, specialty retail, malls, brand websites and marketplaces a retailer sells through.' },
      { term: 'Consumption centre', definition: 'An urban market concentrating branded retail, modern formats and relatively strong purchasing power.' },
      { term: 'Export manufacturing base', definition: 'Production capacity serving international buyers, with revenue and customers separate from domestic retail.' },
      { term: 'Secondary city demand', definition: 'Opportunity in industrial areas and smaller cities, typically weighted toward affordable, practical, everyday products.' },
    ],
    recap: [
      'Traditional stores, specialty retail, malls, brand sites and marketplaces coexist.',
      'E-commerce was estimated near USD 32 billion in 2025, about 12% of total retail.',
      'Hanoi and Ho Chi Minh City lead, with Da Nang and Hai Phong following.',
      'Export manufacturing output must never be read as domestic retail sales.',
    ],
    chapterRecap: 'Market analysis should separately evaluate domestic consumer expenditure, online retail performance and export-oriented production to avoid overstating market size.',
    deepDiveTitle: 'Two Vietnams in one market study',
    body: <F1DeepDive paragraphs={[
      'Vietnam appears twice in most global apparel analyses: once as a production and export centre supplying international brands, and once as a consumer market buying from domestic and international retailers. The factories and the shoppers are connected only loosely — much of what is made locally is shipped out, and much of what is sold locally is imported or made to a different specification.',
      'For a retail case, this means the manufacturing statistics answer a sourcing question, not a demand question. A strong export base tells you about available capacity, lead times and supplier relationships. It tells you nothing about how many of those garments Vietnamese consumers will buy at a given price.',
    ]} evidence="The e-commerce estimate requires verification of its market definition and measurement scope. The research material explicitly separates export manufacturing from domestic retail sales." />,
    sources: citeF1('moitEcommerce', 'gsoRetail', 'vietnamBriefing'),
  }),
];

const quiz = f1Quiz('fashion-m1-l4', [
  { chapter: '1', objective: 'Recall Vietnam total retail', question: 'What is the supplied estimate for Vietnam’s total retail sales in 2025?', application: 'A deck cites Vietnam total retail at USD 26.9 billion. What is the correction?', correct: 'About USD 269 billion, up roughly 9–10% on 2024', wrong: ['About USD 26.9 billion', 'About USD 7.52 billion', 'About USD 32 billion'], explanation: 'Retail sales of goods and consumer services were estimated near USD 269 billion in 2025. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall Vietnam apparel size', question: 'What is the supplied estimate for Vietnam’s apparel market in 2025?', application: 'An analyst needs the clothing category figure, not total retail. Which applies?', correct: 'About USD 7.52 billion', wrong: ['About USD 269 billion', 'About USD 11.14 billion', 'About USD 399.4 billion'], explanation: 'Ken Research estimates Vietnam apparel at approximately USD 7.52 billion in 2025. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate total retail from category', question: 'Why must total retail not be used as a measure of fashion retail demand?', application: 'A plan sizes its market from the USD 269 billion figure. What is the error?', correct: 'Total retail covers all goods and consumer services, far beyond clothing', wrong: ['Total retail excludes all clothing sales', 'Total retail is measured in a different currency', 'Total retail is a projection, not an estimate'], explanation: 'The figure covers the broader retail sector, not only Fashion, Sports & Lifestyle Retail. Review Chapter 1.' },
  { chapter: '1', objective: 'Read the apparel projection', question: 'What is the projected Vietnam apparel market by 2031?', application: 'A forecast needs the 2031 apparel figure and its growth rate. Which applies?', correct: 'About USD 11.14 billion at a 6.8% CAGR', wrong: ['About USD 2,307 billion at 3.52%', 'About USD 269 billion at 9–10%', 'About USD 32 billion at 12%'], explanation: 'Apparel is projected to potentially reach USD 11.14 billion by 2031 at a 6.8% CAGR. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify demand drivers', question: 'On what do Vietnamese consumers evaluate fashion and sports products?', application: 'A positioning study considers brand alone. What else drives the decision?', correct: 'Affordability, quality, brand recognition, functionality and perceived value', wrong: ['Export volume and factory certification', 'Freight cost and customs duty', 'Store opening hours only'], explanation: 'Consumers may evaluate products on affordability, quality, brand recognition, functionality and perceived value. Review Chapter 1.' },
  { chapter: '2', objective: 'Recall the e-commerce estimate', question: 'What is the supplied estimate for Vietnam’s e-commerce market in 2025?', application: 'A digital plan needs the e-commerce size and its share of retail. Which applies?', correct: 'About USD 32 billion, nearly 12% of total retail revenue', wrong: ['About USD 269 billion, nearly 50% of retail', 'About USD 7.52 billion, nearly 3% of retail', 'About USD 3.2 billion, nearly 1% of retail'], explanation: 'E-commerce was estimated near USD 32 billion in 2025, equivalent to nearly 12% of total retail. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify consumption centres', question: 'Which cities are named as Vietnam’s main retail consumption centres?', application: 'A store rollout plan lists only Hanoi. Which other centres does the lesson name?', correct: 'Ho Chi Minh City alongside Hanoi, then Da Nang and Hai Phong', wrong: ['Can Tho and Nha Trang only', 'Hue and Vinh only', 'Bien Hoa and Thu Dau Mot only'], explanation: 'Hanoi and Ho Chi Minh City lead, with Da Nang and Hai Phong also providing opportunity. Review Chapter 2.' },
  { chapter: '2', objective: 'Separate export from domestic retail', question: 'Why must export manufacturing output not be treated as domestic retail sales?', application: 'A market study adds garment export value to domestic apparel sales. What is wrong?', correct: 'The two have different customers, revenue structures and market indicators', wrong: ['Export data is always unavailable', 'Domestic retail is always larger than exports', 'Manufacturing and retail use the same currency'], explanation: 'Export manufacturing and domestic retail have different customers and revenue structures. Review Chapter 2.' },
  { chapter: '2', objective: 'Characterise secondary market demand', question: 'What demand do industrial areas and secondary cities typically offer?', application: 'A retailer expands beyond the two largest cities. What should it expect?', correct: 'Working populations seeking affordable, practical, everyday products', wrong: ['Exclusively luxury and super-premium demand', 'No meaningful retail demand at all', 'Demand identical to Hanoi and Ho Chi Minh City'], explanation: 'Industrial areas and secondary cities may offer demand for affordable, practical, everyday products. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe the channel mix', question: 'How do Vietnam’s retail channels relate to each other?', application: 'A strategy assumes e-commerce has replaced physical retail. What is the reality?', correct: 'Traditional stores, specialty retail, malls, brand sites and marketplaces coexist', wrong: ['E-commerce has fully replaced physical stores', 'Only shopping malls remain commercially viable', 'Traditional stores have disappeared from the market'], explanation: 'The channels coexist, with relative importance varying by segment, positioning and category. Review Chapter 2.' },
]);

export const LESSON_1_4: FashionM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can size Vietnam’s apparel opportunity correctly, map its channel mix and consumption centres, and separate its export base from its consumer market.',
    keyTakeaways: [
      'Total retail near USD 269 billion is not the same as apparel near USD 7.52 billion.',
      'Apparel is projected toward USD 11.14 billion by 2031 at 6.8% CAGR.',
      'E-commerce was estimated near USD 32 billion, about 12% of total retail.',
      'Hanoi and Ho Chi Minh City lead; secondary cities favour everyday value.',
      'Export manufacturing output is not domestic retail demand.',
    ],
    businessImplications: 'Size the category, not the economy: the total retail figure and the apparel figure differ by roughly thirty-six times, and a plan built on the wrong one sets expectations no assortment can meet.',
    remember: 'Vietnam is a production base and a consumer market — analyse them separately.',
    nextLesson: 'Industry Drivers & External Forces',
  },
};
