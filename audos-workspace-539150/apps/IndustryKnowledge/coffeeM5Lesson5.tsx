import { C5DeepDive, citeC5, c5Chapter, c5Quiz } from './coffeeM5Core';
import type { CoffeeM5LessonBundle } from './coffeeM5Core';

const LESSON = '5. Growth Outlook & Strategic Opportunities';

const deck = [
  c5Chapter({
    title: 'Market Growth, Demand Drivers, and Future Prospects', chapterTitle: LESSON, readingTime: '7',
    objective: 'Distinguish genuine demand expansion from growth driven by price rises, promotions or outlet additions, and read market figures at the right scope.',
    mateIntro: 'More sales do not always mean more demand, and more demand does not always mean more profit. This chapter separates the three.',
    keyInsight: 'The market offers room for growth, but future performance will depend on capturing demand profitably. Operators need to distinguish genuine demand expansion from sales growth driven by price increases, promotions, or excessive outlet additions.',
    statTiles: [
      { value: '4', label: 'Key growth activities', subtitle: 'Demand-based expansion to performance-based forecasting', description: 'Demand-based expansion, category diversification, tourism-linked opportunities and performance-based forecasting.' },
      { value: 'US$725M', label: 'Vietnam coffee chain market in 2025, up 27%', subtitle: 'Momentum Works via VietnamPlus', description: 'Branded coffee chains only, not the whole coffeehouse industry.' },
      { value: 'US$617M', label: 'Vietnam tea chain market in 2025, up 28%', subtitle: 'Momentum Works via The Viet Media', description: 'Branded tea chains only.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The market sizes cover branded chains only, the H1 2026 revenue is an iPOS.vn estimate for all F&B, Phúc Long’s figures are company targets, and no independent 2030 forecast for Vietnam coffeehouses was found in the sources reviewed.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s coffeehouse and foodservice retail industry has a favorable long-term demand base supported by an established coffee culture, urban lifestyles, tourism, and the continued development of branded foodservice. Growth opportunities extend beyond traditional cafés into specialty beverages, food-and-beverage combinations, convenience formats, and premium experiences.' },
      { label: 'Why it is happening', text: 'Momentum Works estimated Vietnam’s coffee chain market at US$725 million in 2025, up 27% year on year, and its tea chain market at US$617 million, up 28%. These figures refer specifically to branded coffee and tea chains, not the entire coffeehouse or foodservice industry. The broader outlook remains positive but uneven. Industry reporting indicates that consumers continue to spend while becoming more selective about where their money goes. Rising rent, labor, ingredient, and competitive pressures mean that revenue growth does not automatically translate into stronger profitability.' },
      { label: 'Real-world example', text: 'Operators identify the customer segments, consumption occasions and locations with sustainable demand before investing in new stores; explore specialty coffee, tea, bakery, light meals and complementary products that fit the brand; assess locations near tourist destinations, transport hubs and hospitality clusters; and model revenue, operating costs, store contribution and payback under different demand scenarios.' },
      { label: 'Vietnam example', text: 'The iPOS.vn first-half 2026 report estimated F&B revenue at VND 432.7 trillion, up 6.55%, but about 43% of outlets reported lower revenue, and drink outlets growing (15.82%) lagged food outlets (25.64%). Highlands reached 1,000 outlets in June 2026, while Phúc Long reported a 26.9% revenue rise in the second quarter and targets 2026 revenue of VND 2,300–2,500 billion, 22–32% higher, partly from 40–50 new stores and a larger food share. Nearly 21.2 million international visitors came in 2025, with a 25 million target for 2026, and Euromonitor’s page notes inflation and rising operating costs. The Region I minimum wage is VND 5.31 million a month from 1 January 2026. Phúc Long’s targets are company aims, not forecasts.' },
      { label: 'Business impact', text: 'The industry’s structural demand drivers support further development, but growth prospects vary by brand, format, and location. Businesses that align expansion with defensible demand and sound unit economics are better positioned to capture future opportunities.' },
    ],
    visualKind: 'coffee-m5-51-growth', visualHeading: 'Vietnam branded chain market, 2025',
    visualIntro: 'Compare the coffee and tea chain markets and read the scope note.',
    imageAlt: 'Casemate bar chart of Vietnam branded coffee and tea chain market sizes in 2025',
    keyTerms: [
      { term: 'Demand expansion', definition: 'Growth from more or higher-value customer demand, not just higher prices or more outlets.' },
      { term: 'Branded chain', definition: 'A group of outlets operating under one brand, as used in the Momentum Works market sizes.' },
      { term: 'Scenario modelling', definition: 'Estimating results under different demand and cost assumptions.' },
      { term: 'Payback', definition: 'The time needed to recover the investment in a store from its cash flow.' },
    ],
    recap: [
      'Demand is supported by coffee culture, urban lifestyles, tourism and branded foodservice.',
      'Chain market figures cover branded chains, not the whole industry.',
      'Rising costs mean revenue growth is not profit growth.',
      'Model store contribution and payback under different demand cases.',
    ],
    chapterRecap: 'The industry\u2019s structural demand drivers support further development, but growth prospects vary by brand, format, and location. Businesses that align expansion with defensible demand and sound unit economics are better positioned to capture future opportunities.',
    deepDiveTitle: 'Why a market-size figure must be read with its scope',
    body: <C5DeepDive paragraphs={[
      'US$725 million describes coffee chains and US$617 million tea chains; neither describes independent cafés, street stalls or restaurants. A planner who treats them as the whole market would overstate what a new café can capture.',
      'Similarly, a company’s growth target is an ambition: it tells you how it intends to compete, not what the market will deliver.' ]} evidence="Chain market sizes are from VietnamPlus, VnExpress and The Viet Media reporting Momentum Works; H1 2026 data are from the iPOS.vn press release and The Investor; Phúc Long targets are from Vietnam.vn reporting Masan; tourism is from the Vietnam News Agency; the Euromonitor point is from its summary page; wages are from Vietnam Social Security. The scope reasoning is our own." />,
    sources: citeC5('vietnamplusChains', 'vietmediaSplit', 'iposH12026Detail', 'investorLargerPlayers', 'phucLongResults', 'vnaTourism', 'euromonitorFoodservice', 'minWageDecree'),
  }),
  c5Chapter({
    title: 'Strategic Opportunities Across the Value Chain', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe opportunities beyond opening outlets and explain why coordinating critical activities beats owning every stage.',
    mateIntro: 'Value is created long before a drink reaches the counter: in the farm, the roastery, the supplier relationship and the recipe.',
    keyInsight: 'Value-chain integration can create advantages that are harder to replicate than individual menu items. The objective is not necessarily to own every stage of the chain, but to coordinate critical activities that influence quality, cost, reliability, and differentiation.',
    statTiles: [
      { value: '5', label: 'Key value-chain opportunities', subtitle: 'Sourcing to new revenue streams', description: 'Strategic sourcing, product and brand development, operational integration, partnership-based growth and new revenue streams.' },
      { value: '31.7M bags', label: 'Vietnam coffee production in 2025/26', subtitle: 'USDA', description: 'A domestic base where 4.9 million bags are used at home.' },
      { value: 'US$1.78B', label: 'Vietnam processed-coffee exports in 2025, up 50.4%', subtitle: 'VietnamNet, customs-based', description: 'Shows how far value-added coffee already reaches.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Production is a USDA estimate, the export figure is customs-based and refers to processed coffee, not coffeehouse sales, and no public Vietnam data on catering, corporate beverage services or event revenue for coffee brands was found.',
    narrative: [
      { label: 'What it is', text: 'Growth opportunities exist across the industry value chain, not only in opening retail outlets. Operators can improve their competitiveness through stronger sourcing relationships, local ingredient development, product innovation, centralized preparation, logistics optimization, and more effective customer engagement.' },
      { label: 'Why it is happening', text: 'Vietnam’s established coffee-producing base provides opportunities to develop differentiated products and strengthen connections between domestic ingredients and consumer-facing brands. Value creation can also come from improving supplier reliability, reducing operational waste, and developing proprietary products or retail offerings that complement core beverage sales.' },
      { label: 'Real-world example', text: 'Operators build reliable supplier relationships and assess ingredient quality, consistency and traceability; develop signature blends, proprietary recipes, packaged coffee, tea products or merchandise where demand is validated; improve procurement planning, distribution, stock visibility and standard preparation; collaborate with local producers, bakeries, hospitality businesses, tourism operators or complementary retail brands; and evaluate catering, corporate beverage services, event partnerships and packaged-product sales.' },
      { label: 'Vietnam example', text: 'USDA reports Vietnam produced about 31.7 million bags of coffee in 2025/26 and used 4.9 million at home, and customs data show processed coffee exports of US$1.78 billion in 2025, up 50.4%. Highlands opened a VND 500 billion roastery near Cái Mép in April 2025 with initial capacity of about 10,000 tonnes and potential for 75,000, Phúc Long says its tea comes from two hills it owns and sells packaged tea and coffee through supermarkets, and Katinat tells a story around Vietnamese produce. Milano earns by supplying coffee to agents, and Masan plans to integrate Phúc Long’s loyalty programme with its retail ecosystem. Phúc Long kiosks sit inside WinMart supermarkets, a partnership with a retail brand. No public Vietnam data on catering, corporate or event revenue was found.' },
      { label: 'Business impact', text: 'Value-chain opportunities allow businesses to diversify revenue and strengthen operational control. Strategic partnerships and selective integration can improve competitiveness without requiring every operator to build a fully owned supply chain.' },
    ],
    visualKind: 'coffee-m5-52-valuechain', visualHeading: 'Five opportunities across the value chain',
    visualIntro: 'See five opportunities around value-chain integration and what each adds.',
    imageAlt: 'Casemate map of five value-chain opportunities for coffeehouse operators',
    keyTerms: [
      { term: 'Value-chain integration', definition: 'Coordinating or owning critical stages of the chain from sourcing to the customer.' },
      { term: 'Proprietary product', definition: 'A product developed and sold exclusively by one brand.' },
      { term: 'Centralised preparation', definition: 'Preparing ingredients or semi-finished items in one place for many stores.' },
      { term: 'Selective integration', definition: 'Owning or tightly coordinating only the stages that most affect advantage.' },
    ],
    recap: [
      'Opportunities exist beyond opening outlets.',
      'Domestic coffee supply supports differentiated products.',
      'Coordinate critical activities rather than owning every stage.',
      'New revenue streams need validated demand.',
    ],
    chapterRecap: 'Value-chain opportunities allow businesses to diversify revenue and strengthen operational control. Strategic partnerships and selective integration can improve competitiveness without requiring every operator to build a fully owned supply chain.',
    deepDiveTitle: 'When owning a stage pays and when a partner is enough',
    body: <C5DeepDive paragraphs={[
      'Highlands invested in its own roastery because coffee quality and supply are central to its brand and its volume can fill a large plant. A single café with a small volume would be better buying from a trusted roaster.',
      'The test is whether a stage strongly affects quality, cost or reliability and whether the business can use the capacity; if not, a partnership is usually cheaper and faster.' ]} evidence="Production figures are from USDA; processed-coffee exports are from VietnamNet; the roastery is from Viet Nam News and Highlands announcements; Phúc Long’s tea hills are a company claim; Milano is from CafeF; Masan’s plan is from a Masan Group interview; WinMart kiosks are from VietnamFinance. The own-or-partner test is our own." />,
    sources: citeC5('usdaCoffeeAnnual', 'vietnamnetExport', 'highlandsRoastery', 'virDrinksChains', 'phucLongTea', 'phucLongAbout', 'katinatProfile', 'milanoFranchise', 'masanPhucLong', 'vietnamfinanceChains'),
  }),
  c5Chapter({
    title: 'Strategic Priorities for Sustainable Competitive Advantage', chapterTitle: LESSON, readingTime: '7',
    objective: 'Name the priorities that turn a distinctive concept into durable performance and match them to business size.',
    mateIntro: 'A good idea gets noticed. A good system gets paid. The priorities here are the ones that connect the two.',
    keyInsight: 'Sustainable advantage comes from combining differentiation with execution discipline. A distinctive concept attracts customers, but consistent operations, sound economics, and customer retention determine whether that attraction becomes sustainable business performance.',
    statTiles: [
      { value: '5', label: 'Key strategic priorities', subtitle: 'Positioning to capability development', description: 'Strategic positioning, operational excellence, customer retention, financial discipline and capability development.' },
      { value: 'VND 370–418B', label: 'Phúc Long’s 2026 EBITDA target', subtitle: 'Vietnam.vn, reporting Masan', description: 'A company aim, with revenue targeted at VND 2,300–2,500 billion.' },
      { value: 'Q1 2027', label: 'Highlands’ target quarter for a Vietnam listing', subtitle: 'Agro.gov.vn', description: 'A target that raises reporting and governance standards.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Both figures are company targets, not forecasts, and no public Vietnam data on independent café performance or leadership pipelines was found.',
    narrative: [
      { label: 'What it is', text: 'As competition intensifies, operators need to prioritize capabilities that support durable performance rather than short-lived attention. These include a clear brand proposition, consistent products, effective location management, disciplined pricing, capable employees, reliable technology, and strong financial controls.' },
      { label: 'Why it is happening', text: 'The direction of competition is increasingly consistent with a shift toward operational efficiency, digital infrastructure, and supply-chain optimization. Momentum Works’ 2026 market reporting highlights these capabilities as important areas of competition for Southeast Asian coffee and tea chains. For independent businesses, the priority may be a focused concept and close customer relationships. For larger chains, it may be standardized execution, procurement scale, store portfolio optimization, and integrated customer data. The most appropriate strategy depends on business size, resources, and target positioning.' },
      { label: 'Real-world example', text: 'Businesses define the target customer, core occasion, price tier and reasons to choose the brand; standardise recipes, training, procurement, quality control and store monitoring; build loyalty through consistent value, relevant rewards, service quality and engagement; track contribution margins, rent-to-sales, labour productivity, inventory loss and payback; and invest in management systems, training, digital infrastructure and leadership pipelines.' },
      { label: 'Vietnam example', text: 'Momentum Works’ head of market research says success depends less on the best drinks or the largest network and more on systems across supply chains, store management and digital infrastructure, and iPOS.vn’s three-tier view places strong brands, low-cost players and a squeezed middle priced around VND 30,000–40,000. Phúc Long targets 2026 revenue of VND 2,300–2,500 billion and EBITDA of VND 370–418 billion, with a shorter payback; Highlands, which reports high single-digit same-store sales growth in Q1 2026 and 11.5% in Q2, aims to list in Vietnam in the first quarter of 2027. Starbucks Vietnam is now led by a Vietnamese chief executive, Phúc Long’s brand has been led since late 2024 by a former Starbucks Vietnam head, and low-price kiosks win on tight cost control. All targets are company aims.' },
      { label: 'Business impact', text: 'Long-term competitiveness requires a coherent strategy supported by strong execution. Businesses should align brand differentiation, operational capability, customer retention, and financial discipline around a clear and measurable growth model.' },
    ],
    visualKind: 'coffee-m5-53-priorities', visualHeading: 'Five priorities from foundation to capability',
    visualIntro: 'Read the five layers and the measure each connects to.',
    imageAlt: 'Casemate pyramid of five strategic priorities for sustainable competitive advantage in coffeehouse retail',
    keyTerms: [
      { term: 'Strategic positioning', definition: 'Choices on target customer, occasion, price tier and reasons to choose a brand.' },
      { term: 'Contribution margin', definition: 'Price less variable cost: what a sale adds toward fixed costs and profit.' },
      { term: 'Rent-to-sales ratio', definition: 'Rent as a share of a store’s sales, a common test of site affordability.' },
      { term: 'Leadership pipeline', definition: 'Managers developed to run more stores and new functions as the business grows.' },
    ],
    recap: [
      'Durable performance needs positioning, consistency, location discipline and financial control.',
      'Operational efficiency, digital and supply capability are rising competitive areas.',
      'Independents focus on concept and relationships; chains on systems and scale.',
      'Differentiation attracts; execution and economics sustain.',
    ],
    chapterRecap: 'Long-term competitiveness requires a coherent strategy supported by strong execution. Businesses should align brand differentiation, operational capability, customer retention, and financial discipline around a clear and measurable growth model.',
    deepDiveTitle: 'How to choose priorities when resources are limited',
    body: <C5DeepDive paragraphs={[
      'A small business cannot build everything at once. A sensible order is to settle positioning first, then fix the operating basics, then retention, then financial tracking, and invest in capability as the network grows.',
      'The brief’s point is that the right answer depends on size and positioning: an independent concentrates on a focused concept and customer relationships; a chain adds procurement scale and integrated data.' ]} evidence="The Momentum Works view is from VietnamPlus; the three-tier framework is iPOS.vn as reported by The Viet Media; Phúc Long targets are from Vietnam.vn reporting Masan; Highlands’ listing aim is from Agro.gov.vn and same-store sales from Jollibee Group and The Investor; leadership details are from VietnamBiz. The sequencing is our own teaching suggestion." />,
    sources: citeC5('vietnamplusRegional', 'momentumChains', 'vietmediaSplit', 'phucLongResults', 'agroMilano', 'jollibeeHighlands', 'investorLargerPlayers', 'vietnambizShakeout', 'tuoitreRebalancing'),
  }),
];

const quiz = c5Quiz('coffee-m5-l5', [
  { chapter: '1', objective: 'State the growth insight', question: 'What will future performance depend on, according to the chapter?', application: 'A chain boasts higher sales. What should it check?', correct: 'Capturing demand profitably', wrong: ['Opening as many outlets as possible', 'Raising prices every month', 'Avoiding all promotions'], explanation: 'Distinguish genuine demand from price, promotion or outlet-driven growth. Review Chapter 1.' },
  { chapter: '1', objective: 'Read the market scope', question: 'What do the US$725 million and US$617 million figures cover?', application: 'A planner treats them as the whole coffeehouse market. What is wrong?', correct: 'Only branded coffee chains and branded tea chains', wrong: ['The entire foodservice industry', 'Independent cafés only', 'Street stalls only'], explanation: 'Scope matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a target correctly', question: 'How should Phúc Long’s 2026 revenue range of VND 2,300–2,500 billion be treated?', application: 'A deck cites it as a market forecast. What is the correction?', correct: 'As a company target, not a forecast', wrong: ['As audited results', 'As a government figure', 'As a global average'], explanation: 'Targets are aims. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the survey split', question: 'Which grew more in the iPOS.vn H1 2026 survey, food outlets or drink outlets?', application: 'An analyst compares the segments. What was reported?', correct: 'Food outlets: 25.64% growing against 15.82% of drink outlets', wrong: ['Drink outlets by a wide margin', 'Neither grew', 'They were equal'], explanation: 'Growth is uneven. Review Chapter 1.' },
  { chapter: '2', objective: 'State the integration insight', question: 'What is the objective of value-chain integration?', application: 'A brand thinks it must own every stage. What is the better view?', correct: 'To coordinate critical activities that influence quality, cost, reliability and differentiation', wrong: ['To own every stage', 'To avoid suppliers', 'To cut all menu items'], explanation: 'Selective integration can be enough. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall roastery capacity', question: 'What initial capacity did the Highlands Cái Mép roastery have?', application: 'An analyst sizes the roastery. What is the starting capacity?', correct: 'About 10,000 tonnes a year, with potential for 75,000', wrong: ['About 10 tonnes', 'About 750 tonnes', 'About 7.5 million tonnes'], explanation: 'It is a company capacity statement. Review Chapter 2.' },
  { chapter: '2', objective: 'Note an evidence gap', question: 'What did the research find on catering and corporate beverage revenue for Vietnamese coffee brands?', application: 'A deck quotes its size. Is there a public source?', correct: 'No public Vietnam data was found', wrong: ['It is 20% of sales', 'It is zero', 'It is published monthly'], explanation: 'Gaps are stated explicitly. Review Chapter 2.' },
  { chapter: '3', objective: 'State the advantage insight', question: 'What combination creates sustainable advantage?', application: 'A distinctive concept loses customers after a year. What was missing?', correct: 'Differentiation combined with execution discipline', wrong: ['Differentiation alone', 'Low prices alone', 'More outlets alone'], explanation: 'Execution and economics sustain attraction. Review Chapter 3.' },
  { chapter: '3', objective: 'Match priorities to size', question: 'What may be an independent business’s priority?', application: 'A single café plans its strategy. What should it focus on?', correct: 'A focused concept and close customer relationships', wrong: ['Procurement scale', 'A national loyalty platform', 'Opening 100 stores'], explanation: 'Strategy depends on size. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe iPOS.vn’s framework', question: 'Where does iPOS.vn place chains priced around VND 30,000–40,000 without a strong brand?', application: 'A mid-priced chain wonders why it struggles. What is the explanation?', correct: 'In the squeezed middle between strong brands and low-cost players', wrong: ['Among the strongest brands', 'Among low-cost players', 'Outside the market'], explanation: 'The middle is under pressure. Review Chapter 3.' },
]);

export const LESSON_C5_5: CoffeeM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read market-growth figures at the right scope, identify value-chain opportunities and choose strategic priorities that fit a business’s size.',
    keyTakeaways: [
      'Distinguish genuine demand growth from price-, promotion- or outlet-driven sales growth.',
      'Branded chain market sizes cover chains only, not the whole industry.',
      'Coordinate critical value-chain activities rather than owning every stage.',
      'Differentiation attracts; execution discipline and economics sustain.',
      'Company targets are aims, not forecasts.',
    ],
    businessImplications: 'Model unit economics under different demand cases, integrate selectively and align brand, operations, retention and finance around a measurable growth model.',
    remember: 'Growth is only valuable when it is profitable, supportable and repeatable.',
    nextLesson: 'Back to module overview',
  },
};
