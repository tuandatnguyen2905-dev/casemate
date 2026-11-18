import { C1DeepDive, citeC1, c1Chapter, c1Quiz } from './coffeeM1Core';
import type { CoffeeM1LessonBundle } from './coffeeM1Core';

const LESSON = '3. Global Market Overview';

const deck = [
  c1Chapter({
    title: 'Global Market Size and Growth', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read global coffee and foodservice market estimates with their definitions and explain why growth does not equal profit.',
    mateIntro: 'Global coffee numbers look huge, and they come from different yardsticks. Knowing what each one counts matters more than the size.',
    keyInsight: 'Global demand remains supported by habitual coffee consumption and eating-out occasions, but market growth does not automatically translate into higher profitability. Operators must manage labor, rent, ingredient prices, and consumer price sensitivity while developing a differentiated customer proposition.',
    statTiles: [
      { value: '5', label: 'Key global market activities', subtitle: 'Market expansion to performance measurement', description: 'Market expansion, category diversification, premiumization, value positioning and performance measurement.' },
      { value: '~US$249B', label: 'Global coffee market in 2025', subtitle: 'Grand View Research', description: 'Retail coffee products and other channels.' },
      { value: '~US$524B', label: 'Global foodservice coffee market in 2025', subtitle: 'Mordor Intelligence', description: 'Coffee sold through foodservice settings, measured on a different basis.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the two market figures use different definitions, a third publisher estimates foodservice coffee at about US$626 billion, and none should be read as coffeehouse revenue or compared with the others.',
    narrative: [
      { label: 'What it is', text: 'The global coffeehouse and foodservice retail industry operates within a broad consumer market shaped by everyday food consumption, out-of-home dining, beverage purchases, and demand for convenient meal solutions. Its performance varies by geography, format, and product category, with established markets emphasizing differentiation and operational efficiency while many emerging markets continue to benefit from urbanization and rising consumer spending.' },
      { label: 'Why it is happening', text: 'Market-size estimates must be interpreted carefully because reports use different definitions. The global coffee market includes retail coffee products and other channels, whereas the foodservice coffee market focuses on coffee sold through foodservice settings. These figures should not be treated as interchangeable measures of coffeehouse revenue.' },
      { label: 'Real-world example', text: 'Operators enter new cities and countries as demand for branded beverages grows; add tea, cold drinks, bakery and light meals to raise spend per visit; launch specialty coffee and signature drinks to support differentiated pricing; use entry-level products, bundles and smaller formats for price-sensitive customers; and track same-store sales, transaction frequency, average order value and store profit.' },
      { label: 'Vietnam example', text: 'Grand View Research puts the global coffee market at about US$249.3 billion in 2025 with Europe the largest region at 32.5%, Mordor Intelligence puts foodservice coffee at about US$524 billion and names Asia-Pacific the fastest-growing region, and Fortune Business Insights estimates foodservice coffee at about US$626 billion. Against these, Momentum Works estimates Vietnam’s branded coffee-chain segment at only US$725 million in 2025, up 27%, a chain-only measure that shows how narrow definitions change the size of the same industry.' },
      { label: 'Business impact', text: 'The global industry offers growth opportunities across beverage, café, and foodservice formats. However, market estimates need consistent definitions, and operators must balance revenue expansion with sustainable unit economics.' },
    ],
    visualKind: 'coffee-m1-31-global-size', visualHeading: 'Three 2025 global estimates, three definitions',
    visualIntro: 'Compare three 2025 estimates and note why they cannot be read as one market.',
    imageAlt: 'Casemate bar chart of three differently defined 2025 global coffee and foodservice coffee market estimates',
    keyTerms: [
      { term: 'Foodservice coffee', definition: 'Coffee sold through cafés, restaurants and other foodservice settings.' },
      { term: 'Same-store sales', definition: 'Sales growth from stores open in both periods compared.' },
      { term: 'Value positioning', definition: 'Using entry-level products, bundles or small formats to serve price-sensitive customers.' },
      { term: 'CAGR', definition: 'Compound annual growth rate.' },
    ],
    recap: [
      'Coffee and eating-out habits support global demand.',
      'Estimates use different definitions and are not interchangeable.',
      'Growth does not automatically mean profit.',
      'Track same-store sales, frequency, order value and store profit.',
    ],
    chapterRecap: 'The global industry offers growth opportunities across beverage, café, and foodservice formats. However, market estimates need consistent definitions, and operators must balance revenue expansion with sustainable unit economics.',
    deepDiveTitle: 'Why a foodservice figure can be larger than a total-market figure',
    body: <C1DeepDive paragraphs={[
      'Here the foodservice coffee estimate from one publisher is larger than another publisher’s total coffee market. That is not a contradiction: each counts different things, such as retail value, menu prices or channel mix.',
      'When using a figure, record who published it, what it counts and for which year, and avoid mixing it with others.' ]} evidence="The five activities are described in the supplied material. Global figures are from publisher summaries of Grand View Research, Mordor Intelligence and Fortune Business Insights; the Vietnam chain estimate is from Momentum Works as reported by VietnamPlus. Forecasts differ by publisher and are not used." />,
    sources: citeC1('grandViewCoffee', 'mordorFoodserviceCoffee', 'fortuneFoodserviceCoffee', 'vietnamplusChains'),
  }),
  c1Chapter({
    title: 'Regional Markets and Competitive Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare how regions differ and how operators adapt standard capabilities to local conditions.',
    mateIntro: 'A café in Europe, a drive-through in the United States and a tea-and-coffee chain in Vietnam all sell coffee, in very different ways.',
    keyInsight: 'There is no single global model that guarantees success. Successful international and regional operators adapt their menus, prices, store formats, and service experiences to local consumption patterns while preserving their core brand proposition.',
    statTiles: [
      { value: '5', label: 'Key regional and expansion activities', subtitle: 'North America to international expansion', description: 'North American, European, Asia-Pacific and emerging markets, and international expansion models.' },
      { value: '~US$9.9B', label: 'Southeast Asia’s modern coffee and tea chain market in 2025', subtitle: 'Momentum Works, up 52% from 2021', description: 'The regional context for Vietnam’s chains.' },
      { value: '7', label: 'Southeast Asian coffee chains with more than 1,000 outlets in February 2026', subtitle: 'Momentum Works, via VietnamPlus', description: 'Shows how concentrated large networks are.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the regional market value and chain counts are research-firm estimates reported by the press and cover chains, not whole markets.',
    narrative: [
      { label: 'What it is', text: 'Global coffeehouse and foodservice markets differ according to consumption habits, income levels, retail infrastructure, and local food culture. North America and Europe have established café and restaurant markets, while Asia-Pacific has become an important growth region for modern beverage chains and evolving café formats.' },
      { label: 'Why it is happening', text: 'Competitive models also vary. International brands often rely on standardized products and recognizable brand identities, while regional and local operators may benefit from stronger knowledge of local preferences, more flexible pricing, and lower-cost store formats.' },
      { label: 'Real-world example', text: 'North American competition stresses convenience, loyalty programmes and drive-through; European cafés combine drinks, food, socialising and local hospitality; Asia-Pacific chains expand in urban sites with digital ordering and local drinks; emerging-market operators adapt to purchasing power, infrastructure and strong independents; and international brands enter through franchising, licensing, joint ventures or owned stores.' },
      { label: 'Vietnam example', text: 'Momentum Works ranks Vietnam third in Southeast Asia for coffee and tea chains, with a combined US$1.34 billion in 2025 behind Indonesia (US$3.15 billion) and Thailand (US$2.25 billion). Starbucks runs more than 2,000 stores across the region but only about 150 in Vietnam, Café Amazon left Vietnam in November 2025 after five years, and Mixue was reported to be scaling back, while local Highlands Coffee reached 985 stores.' },
      { label: 'Business impact', text: 'Regional success depends on adapting standardized business capabilities to local conditions. Market entry decisions should account for consumer behavior, competitive intensity, purchasing power, and the economics of each operating format.' },
    ],
    visualKind: 'coffee-m1-32-regions', visualHeading: 'How competition differs across regions',
    visualIntro: 'Read the table of regions and routes by competitive emphasis and typical enabler.',
    imageAlt: 'Casemate table comparing how competition differs across coffeehouse and foodservice regions',
    keyTerms: [
      { term: 'Joint venture', definition: 'A business owned and run together by two or more partners.' },
      { term: 'Licensing', definition: 'Letting a partner use a brand and system, usually for a fee.' },
      { term: 'Purchasing power', definition: 'What customers in a market can afford to spend.' },
      { term: 'Local adaptation', definition: 'Changing menus, prices or formats to suit a local market.' },
    ],
    recap: [
      'Regions differ in habits, incomes, infrastructure and food culture.',
      'International and local operators have different strengths.',
      'No single model guarantees success everywhere.',
      'Entry decisions should weigh behaviour, rivals, income and format economics.',
    ],
    chapterRecap: 'Regional success depends on adapting standardized business capabilities to local conditions. Market entry decisions should account for consumer behavior, competitive intensity, purchasing power, and the economics of each operating format.',
    deepDiveTitle: 'Why strong global brands can still stay small locally',
    body: <C1DeepDive paragraphs={[
      'A global brand can have thousands of stores in one region and only a modest number in a market with deep local habits. Familiar local taste, price expectations and neighbourhood cafés can limit how far a standard proposition travels.',
      'The lesson for entrants is to test local fit before committing to a large network.' ]} evidence="The five activities are described in the supplied material. Regional figures are from Momentum Works data reported by VnExpress and VietnamPlus; regional rankings by size are from a Mordor Intelligence summary; Vietnam store counts are from VietnamBiz and the same press reports." />,
    sources: citeC1('momentumChains', 'vnexpressChains', 'vietnamplusRegional', 'mordorFoodserviceCoffee', 'grandViewCoffee', 'vietnambizChains'),
  }),
  c1Chapter({
    title: 'Global Competitive and Operating Trends', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why advantage is shifting from menu and brand alone to the integration of systems, digital engagement and fulfilment.',
    mateIntro: 'Brand and menu still matter, but the winners are increasingly the ones with better systems behind the counter.',
    keyInsight: 'The competitive advantage is shifting toward the ability to integrate brand differentiation, operational discipline, digital engagement, and efficient fulfillment. Expansion without these capabilities can increase complexity faster than it increases value.',
    statTiles: [
      { value: '5', label: 'Key competitive and operating trends', subtitle: 'Digital engagement to experience differentiation', description: 'Digital customer engagement, operational standardization, flexible store formats, supply-chain optimization and experience differentiation.' },
      { value: '300–400 vs 600–800', label: 'Cups a day at a typical store versus leading chains', subtitle: 'Momentum Works, via VnExpress', description: 'Shows how systems and automation affect throughput.' },
      { value: '+3%', label: 'Growth in US foodservice coffee servings in 2024/25', subtitle: 'Circana, cited by Grand View Research', description: 'A sign of continued out-of-home coffee consumption.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the cup figures are a regional chain-report estimate and the US servings figure is a market-data provider statistic cited in a research summary.',
    narrative: [
      { label: 'What it is', text: 'Global coffeehouse and foodservice competition increasingly extends beyond menu quality and brand recognition. Operators are investing in digital infrastructure, standardized store systems, supply-chain coordination, loyalty programs, and alternative fulfillment channels to strengthen customer relationships and improve operational productivity.' },
      { label: 'Why it is happening', text: 'At the same time, customers continue to expect convenience, consistent quality, and experiences that justify the price paid. This creates pressure for businesses to combine scalable systems with relevant menus and appealing physical environments.' },
      { label: 'Real-world example', text: 'Operators use mobile apps, personalised offers and integrated loyalty; keep recipes, training and procurement consistent; run smaller takeaway outlets, kiosks, flagship cafés and delivery kitchens; forecast demand to cut waste and secure ingredients; and differentiate through store design, product innovation, service and community spaces.' },
      { label: 'Vietnam example', text: 'Momentum Works says Southeast Asian chains are industrialising through automation, digital ordering and QR-based processes, and expects competition to turn on operating efficiency, digital infrastructure and supply-chain optimisation. In 2025 Highlands opened a roasting plant and a drive-through format, reported same-store sales growth of more than 8% and kept opening more than 100 stores a year, while The Coffee House halved its store count, showing that expansion without capability can backfire.' },
      { label: 'Business impact', text: 'Global competition increasingly rewards operators that coordinate customer experience with efficient execution. Technology and expansion are valuable when they improve repeat purchasing, service quality, and store-level economics.' },
    ],
    visualKind: 'coffee-m1-33-trends', visualHeading: 'Five competitive capabilities compared',
    visualIntro: 'Place five capabilities on a matrix of contribution to repeat purchase and difficulty to copy.',
    imageAlt: 'Casemate matrix of five competitive capabilities by contribution to repeat purchase and difficulty to copy',
    keyTerms: [
      { term: 'Supply-chain optimisation', definition: 'Forecasting demand, cutting waste and securing ingredients.' },
      { term: 'Flexible store format', definition: 'A smaller or specialised outlet such as a kiosk or delivery kitchen.' },
      { term: 'Operational standardisation', definition: 'Consistent recipes, training, procurement and service standards.' },
      { term: 'Throughput', definition: 'How many orders a store can serve in a period.' },
    ],
    recap: [
      'Competition now extends beyond menu quality and brand.',
      'Systems, digital tools and fulfilment channels raise productivity.',
      'Customers still expect convenience, consistency and worth.',
      'Expansion without capability adds complexity faster than value.',
    ],
    chapterRecap: 'Global competition increasingly rewards operators that coordinate customer experience with efficient execution. Technology and expansion are valuable when they improve repeat purchasing, service quality, and store-level economics.',
    deepDiveTitle: 'What higher cups per day really tells you',
    body: <C1DeepDive paragraphs={[
      'A store that sells 600–800 cups a day instead of 300–400 spreads rent and labour over many more sales. Throughput is therefore one of the most powerful levers on store profit.',
      'Automation, mobile ordering and clear workflows raise throughput without needing a bigger counter, which is why chains invest in them.' ]} evidence="The five trends are described in the supplied material. The cup figures and the shift toward automation are from Momentum Works as reported by VnExpress and VietnamPlus; Highlands and The Coffee House details are from VietnamBiz and The Viet Media; the US servings figure is a Circana statistic cited by Grand View Research." />,
    sources: citeC1('vnexpressChains', 'momentumChains', 'vietnambizChains', 'vietmediaChains', 'grandViewCoffee'),
  }),
];

const quiz = c1Quiz('coffee-m1-l3', [
  { chapter: '1', objective: 'Read estimates carefully', question: 'Why should global coffee and foodservice coffee figures not be treated as interchangeable?', application: 'A report compares the two directly. What is the problem?', correct: 'They use different definitions of what the market includes', wrong: ['They are always identical', 'One is in a different currency by definition', 'Both measure coffeehouse revenue'], explanation: 'Definitions differ. Review Chapter 1.' },
  { chapter: '1', objective: 'State what growth does not guarantee', question: 'What does market growth not automatically deliver?', application: 'A market is growing 5% a year. What does that not prove?', correct: 'Higher profitability for operators', wrong: ['Any coffee consumption', 'Any demand', 'Any new stores'], explanation: 'Costs matter. Review Chapter 1.' },
  { chapter: '1', objective: 'List operator costs', question: 'What must operators manage while differentiating?', application: 'A chain expands into a new city. What costs should it watch?', correct: 'Labour, rent, ingredient prices and consumer price sensitivity', wrong: ['Only advertising', 'Only logos', 'Only supplier names'], explanation: 'Unit economics decide. Review Chapter 1.' },
  { chapter: '1', objective: 'Use performance measures', question: 'Which measures should operators track?', application: 'A chain wants to know if growth is healthy. What should it measure?', correct: 'Same-store sales, transaction frequency, average order value and store-level profitability', wrong: ['Number of posters', 'Slogans', 'Uniform colours'], explanation: 'These show store health. Review Chapter 1.' },
  { chapter: '2', objective: 'State there is no single model', question: 'What does the chapter say about a global model?', application: 'A brand wants to copy its home model everywhere. What is the caution?', correct: 'No single model guarantees success; operators adapt to local patterns', wrong: ['One model works everywhere', 'Only franchising works', 'Only company stores work'], explanation: 'Local adaptation. Review Chapter 2.' },
  { chapter: '2', objective: 'Name entry routes', question: 'Which routes do companies use to enter new markets?', application: 'A brand plans international growth. What are its options?', correct: 'Franchising, licensing, joint ventures or company-owned stores', wrong: ['Only advertising', 'Only online sales', 'Only wholesale'], explanation: 'Each route trades capital and control. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain Asia-Pacific growth', question: 'How is Asia-Pacific described?', application: 'An investor looks for growth regions. What does the chapter say?', correct: 'An important growth region for modern beverage chains and evolving café formats', wrong: ['A market with no chains', 'A declining region', 'A region with no coffee culture'], explanation: 'Growth is regional. Review Chapter 2.' },
  { chapter: '3', objective: 'State where advantage is shifting', question: 'Where is competitive advantage shifting?', application: 'Two chains have the same menu. What differentiates them?', correct: 'Toward integrating brand, operational discipline, digital engagement and efficient fulfilment', wrong: ['Toward menu names alone', 'Toward store colour', 'Toward random pricing'], explanation: 'Systems matter. Review Chapter 3.' },
  { chapter: '3', objective: 'Warn about expansion', question: 'What can expansion without these capabilities do?', application: 'A chain opens many stores without systems. What risk follows?', correct: 'Increase complexity faster than value', wrong: ['Cut all costs', 'Guarantee profit', 'Remove competition'], explanation: 'Capability must lead. Review Chapter 3.' },
  { chapter: '3', objective: 'Interpret cups per day', question: 'What does 600–800 cups a day versus 300–400 suggest?', application: 'Two stores have the same rent. Which has the advantage?', correct: 'Higher throughput spreads fixed costs over more sales', wrong: ['Higher rent', 'Lower quality', 'Fewer customers'], explanation: 'Throughput lifts profit. Review Chapter 3.' },
]);

export const LESSON_C1_3: CoffeeM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read global market estimates with their definitions, compare regional models and explain why operating systems now drive competitive advantage.',
    keyTakeaways: [
      'Global estimates use different definitions and cannot be mixed.',
      'Market growth does not guarantee profit.',
      'No single global model works everywhere.',
      'Advantage is shifting to integrated systems, digital engagement and fulfilment.',
      'Throughput and unit economics decide store profit.',
    ],
    businessImplications: 'Record the definition behind every market figure, adapt formats to local conditions and build systems before accelerating expansion.',
    remember: 'A bigger market is not a better margin.',
    nextLesson: 'How the Vietnam Market Works',
  },
};
