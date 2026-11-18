import { C5DeepDive, citeC5, c5Chapter, c5Quiz } from './coffeeM5Core';
import type { CoffeeM5LessonBundle } from './coffeeM5Core';

const LESSON = '3. Market & Channel Trends';

const deck = [
  c5Chapter({
    title: 'Omnichannel Consumption and Delivery-Led Fulfillment', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why omnichannel growth must be judged on channel-specific economics and how operators can improve delivery contribution.',
    mateIntro: 'A customer may sit in on Monday, take away on Tuesday and order delivery on Friday. Each of those orders earns the business a different amount.',
    keyInsight: 'Omnichannel growth requires channel-specific economics rather than simply maximizing order volume. Operators need to identify which products, promotions, and fulfillment methods generate profitable incremental demand.',
    statTiles: [
      { value: '4', label: 'Key omnichannel activities', subtitle: 'Channel menus to integrated fulfillment', description: 'Channel-specific menus, direct ordering, delivery optimization and integrated fulfillment.' },
      { value: 'US$2.1B', label: 'Vietnam online food delivery value in 2025', subtitle: 'Momentum Works via VnExpress, up 19%', description: 'All food, not coffee alone.' },
      { value: '48% each', label: 'ShopeeFood and GrabFood shares of delivery in 2025', subtitle: 'Momentum Works via VnExpress', description: 'beFood held 4%; two platforms hold 96%.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Delivery value and shares cover completed app orders for all food and drink, and the Euromonitor point is taken from its report page headings; the full March 2026 analysis could not be read.',
    narrative: [
      { label: 'What it is', text: 'Consumers increasingly combine dine-in, takeaway, direct digital ordering, and third-party delivery depending on their schedules and consumption occasions. Dine-in remains important for social and experiential visits, while delivery and takeaway provide convenience for home, office, and on-the-go consumption.' },
      { label: 'Why it is happening', text: 'Vietnam’s consumer foodservice market has seen delivery strengthen its role in fulfillment, according to Euromonitor’s March 2026 industry analysis. However, delivery can introduce platform commissions, packaging costs, discounting pressure, and quality risks during transit.' },
      { label: 'Real-world example', text: 'Operators develop products and packaging suited to dine-in, takeaway and delivery; encourage owned-channel ordering where it improves economics and retention; review platform commissions, promotion costs, delivery radius, order accuracy and packaging; and coordinate in-store counters, mobile ordering and delivery platforms to reduce congestion and errors.' },
      { label: 'Vietnam example', text: 'Vietnamese consumers spent US$2.1 billion on online food delivery in 2025, up 19%, with ShopeeFood and GrabFood at 48% each and beFood at 4%, and restaurants report commissions of 20–30% before advertising. Euromonitor’s report page for Vietnam carries headings that take-away and delivery remain structurally dominant fulfilment channels and that delivery expansion reinforces the advantages of accessible standalone and retail locations. Phúc Long describes delivery as an increasingly important part of its retail revenue, Jollibee Group says most of Highlands’ digital sales transact through third-party aggregators, and HighlandsĐI added pre-order and prepaid top-up from 19 December 2025. Baemin, Gojek and Loship exited and Xanh SM Ngon entered in June 2025. No public Vietnam data on coffee delivery margins or packaging cost was found.' },
      { label: 'Business impact', text: 'Omnichannel distribution expands customer access and convenience, but channel profitability varies. Businesses should integrate customer experience across channels while monitoring the full cost of fulfilling each order.' },
    ],
    visualKind: 'coffee-m5-31-omnichannel', visualHeading: 'Four levers of omnichannel fulfilment',
    visualIntro: 'See the four levers around channel-specific economics and what each controls.',
    imageAlt: 'Casemate orbit diagram of four omnichannel fulfilment levers for coffeehouses',
    keyTerms: [
      { term: 'Omnichannel', definition: 'Selling through several channels managed as one connected system.' },
      { term: 'Platform commission', definition: 'A share of each order kept by a delivery platform.' },
      { term: 'Incremental demand', definition: 'Sales that would not have happened without the channel.' },
      { term: 'Fulfilment congestion', definition: 'Delays that arise when too many orders from different channels hit one operation.' },
    ],
    recap: [
      'Customers mix dine-in, takeaway, direct and delivery orders.',
      'Delivery adds commissions, packaging costs and quality risk.',
      'Judge each channel on profitable incremental demand.',
      'Coordinate channels to cut congestion and errors.',
    ],
    chapterRecap: 'Omnichannel distribution expands customer access and convenience, but channel profitability varies. Businesses should integrate customer experience across channels while monitoring the full cost of fulfilling each order.',
    deepDiveTitle: 'Why more delivery orders can mean less profit',
    body: <C5DeepDive paragraphs={[
      'If a delivery order carries a commission, extra packaging and a discount, and it slows the bar for walk-in customers, it can earn less than a smaller dine-in order, even though it looks bigger in sales.',
      'The test is contribution per order after all costs, which is why the brief asks operators to find the products and promotions that generate profitable incremental demand.' ]} evidence="Delivery data are from Momentum Works as reported by VnExpress and VCCI; commissions are from Tuoi Tre; Euromonitor is cited from its report page headings only; Phúc Long’s comment is from Vietnam.vn reporting Masan; the aggregator statement is from the Jollibee Group release; the app launch is from Highlands’ announcement. The contribution reasoning is our own." />,
    sources: citeC5('vnexpressDelivery', 'vcciDelivery', 'tuoitreDelivery', 'euromonitorFoodservice', 'phucLongResults', 'jollibeeHighlands', 'highlandsApp'),
  }),
  c5Chapter({
    title: 'Chain Expansion, Market Consolidation, and Geographic Diversification', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why expansion is becoming selective and how store portfolios are managed in a consolidating market.',
    mateIntro: 'Opening a store used to be the headline. Now the question is whether the store you opened last year is doing better than the one you opened the year before.',
    keyInsight: 'The competitive advantage is shifting from opening more stores to building a productive and replicable store network. Expansion should follow proven unit economics, not substitute for them.',
    statTiles: [
      { value: '4', label: 'Key expansion activities', subtitle: 'Site selection to scalable operating systems', description: 'Selective site expansion, store portfolio management, geographic diversification and scalable operating systems.' },
      { value: '1,000', label: 'Highlands outlets reached in June 2026', subtitle: 'The Investor and Agro.gov.vn', description: 'Opened in Hanoi, in premises previously run by another café chain.' },
      { value: '52.01%', label: 'Share of F&B businesses planning to expand in H2 2026', subtitle: 'iPOS.vn, down from 57.31%', description: 'Appetite is easing but still majority.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The expansion-plan figures are survey shares of businesses, and the Highlands count is a company milestone reported by the press.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s coffee and tea chain market continues to attract investment, but expansion is increasingly selective. Established brands can benefit from brand recognition, procurement scale, standardized processes, and stronger digital infrastructure, while smaller operators may compete through local relevance, flexibility, and lower fixed costs.' },
      { label: 'Why it is happening', text: 'Recent reporting indicates that the country’s coffee and tea chain market exceeded US$1.3 billion in 2025. At the same time, broader F&B data for H1 2026 show that market growth has been uneven across operators, reinforcing the importance of site selection, store productivity, and financial discipline.' },
      { label: 'Real-world example', text: 'Operators prioritise locations by footfall, target-customer density, rent, accessibility and competition; compare new-store performance with mature outlets and close, relocate or redesign persistently weak sites; assess suburban districts, secondary cities, transport hubs and tourism destinations; and standardise procurement, training, quality control and reporting before accelerating.' },
      { label: 'Vietnam example', text: 'Tuoi Tre reports that, after a 2021–23 boom, chains have been closing underperforming stores since early 2026: Mixue, with around 1,000 Vietnam outlets by 2023, closed more than 400 stores worldwide, and an Insight Asia director calls the market a rebalancing phase with localised saturation, while Highlands, Phúc Long, Katinat and Starbucks keep expanding. Highlands opened its 1,000th outlet in June 2026 as same-store sales rose 11.5% in the second quarter; Phúc Long had 220 standalone outlets and plans 40–50 openings, focused on Hanoi. The iPOS.vn survey counts about 329,200 F&B outlets, down 0.1% from end-2025, with about 43% reporting lower revenue, and Starbucks opened five Mekong Delta stores in mid-2025. Nearly 21.2 million international visitors came in 2025. No public data on store economics in secondary cities was found.' },
      { label: 'Business impact', text: 'Market consolidation creates opportunities for well-managed operators to gain share, but growth is not guaranteed by brand visibility or store count alone. Disciplined expansion and consistent store productivity are essential to long-term resilience.' },
    ],
    visualKind: 'coffee-m5-32-expansion', visualHeading: 'Uneven growth and easing expansion appetite',
    visualIntro: 'Compare the share of outlets growing and of businesses planning to expand.',
    imageAlt: 'Casemate bar chart of first-half 2026 growth and expansion plans of Vietnamese F&B businesses',
    keyTerms: [
      { term: 'Consolidation', definition: 'A shift of share toward fewer, stronger operators as others close or merge.' },
      { term: 'Localised saturation', definition: 'Too many outlets in one area, so stores take sales from each other.' },
      { term: 'Store portfolio', definition: 'The full set of a brand’s stores and formats, managed for returns.' },
      { term: 'Replicable network', definition: 'A store network whose economics can be repeated site after site.' },
    ],
    recap: [
      'Expansion is becoming selective, not stopped.',
      'Growth is uneven across operators and formats.',
      'Weak stores are closed, relocated or redesigned.',
      'Proven unit economics should come before openings.',
    ],
    chapterRecap: 'Market consolidation creates opportunities for well-managed operators to gain share, but growth is not guaranteed by brand visibility or store count alone. Disciplined expansion and consistent store productivity are essential to long-term resilience.',
    deepDiveTitle: 'Why a falling outlet count can still mean a healthy market',
    body: <C5DeepDive paragraphs={[
      'Outlet numbers fell only 0.1% in the first half of 2026 after a sharp thinning in 2025, which suggests the clearing-out is slowing. Closures of weak stores can raise the average store’s sales and margin.',
      'What matters for a chain is whether its remaining and new stores earn more, which is why same-store sales and daily revenue per store are the preferred tests.' ]} evidence="Chain consolidation and Insight Asia comments are from Tuoi Tre; Highlands’ milestone and same-store sales are from The Investor and Agro.gov.vn; Phúc Long figures are from The Investor and Vietnam.vn; outlet counts and expansion plans are from the iPOS.vn first-half 2026 press release; the Starbucks Mekong Delta point is from VietnamBiz; tourism is from the Vietnam News Agency. The market-health reasoning is our own." />,
    sources: citeC5('tuoitreRebalancing', 'investorLargerPlayers', 'agroMilano', 'iposH12026Detail', 'vietnambizShakeout', 'vnaTourism', 'phucLongResults'),
  }),
  c5Chapter({
    title: 'Hybrid Formats, Convenience, and New Consumption Occasions', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how format innovation matches a business model to a consumption occasion and how formats should be piloted.',
    mateIntro: 'A four-square-metre kiosk and a two-storey destination café can sell the same drink. They are very different businesses.',
    keyInsight: 'Format innovation allows operators to match the business model to the consumption occasion. The optimal format depends on local demand density, menu complexity, service expectations, and site economics.',
    statTiles: [
      { value: '4', label: 'Key format activities', subtitle: 'Compact formats to format piloting', description: 'Compact convenience formats, destination stores, hybrid food-and-beverage concepts and format piloting.' },
      { value: 'About 4 m²', label: 'Smallest format offered under Trung Nguyên E-Coffee packages', subtitle: 'The Investor', description: 'A compact, low-entry-cost option.' },
      { value: 'VND 7,000', label: 'Price of the cheapest takeaway kiosk drinks', subtitle: 'Tuoi Tre, April 2026', description: 'Small kiosks near schools and transport hubs.' },
    ],
    statsNote: 'The first tile is a count from this lesson. E-Coffee terms are company statements, kiosk prices are reported by the press, and no public Vietnam data on payback by format was found beyond unaudited rule-of-thumb ranges.',
    narrative: [
      { label: 'What it is', text: 'Operators are exploring formats that respond to different cost structures and customer needs. These include compact takeaway stores, kiosks, drive-through outlets, cafés integrated with retail or hospitality locations, delivery-focused kitchens, and larger destination stores built around social experiences.' },
      { label: 'Why it is happening', text: 'Each format offers a different balance of rent, staffing, throughput, customer dwell time, and average transaction value. A compact outlet may serve routine purchases efficiently, while a destination café may justify a larger investment through longer visits, food sales, and stronger experiential differentiation.' },
      { label: 'Real-world example', text: 'Operators use smaller footprints for takeaway, commuter traffic and high-frequency transactions; build larger spaces where ambience, food, events or specialty products justify longer visits; combine drinks with bakery, light meals, retail products or complementary services; and test new formats in limited locations, comparing investment, sales density, labour productivity and payback before scaling.' },
      { label: 'Vietnam example', text: 'Trung Nguyên’s E-Coffee offers formats from about four square metres, Phúc Long runs kiosks inside WinMart supermarkets alongside its Unicorn flagship format, and low-price takeaway kiosks near schools and transport hubs sell drinks from VND 7,000 using small simplified formats. Highlands opened Vietnam’s first drive-through in 2025, Starbucks Reserve opened at Bitexco in April 2025, and Jollibee Group says Highlands’ predominantly company-owned network gives a foundation to expand through more capital-efficient formats. A Ho Chi Minh City robot café combines coffee with a self-service flower shop, a hybrid example from a single shop. No public data on delivery-focused coffee kitchens or on payback by format was found.' },
      { label: 'Business impact', text: 'Flexible store formats can expand market reach and improve cost alignment. Operators should evaluate each format against a defined customer occasion and a distinct financial model rather than applying one store design to every location.' },
    ],
    visualKind: 'coffee-m5-33-formats', visualHeading: 'Four formats matched to occasions',
    visualIntro: 'Read each format, what it suits and a Vietnam example.',
    imageAlt: 'Casemate table of four coffeehouse store formats matched to consumption occasions',
    keyTerms: [
      { term: 'Kiosk', definition: 'A small counter-style outlet with little or no seating.' },
      { term: 'Destination store', definition: 'A larger store built so customers stay and spend longer.' },
      { term: 'Sales density', definition: 'Sales per square metre or per store, used to compare formats.' },
      { term: 'Piloting', definition: 'Testing a new format at a few sites before rolling it out.' },
    ],
    recap: [
      'Formats differ in rent, staffing, throughput, dwell time and ticket.',
      'Compact formats suit routine purchases; destination stores suit longer visits.',
      'Hybrid concepts combine drinks with food, retail or services.',
      'Pilot new formats and compare payback before scaling.',
    ],
    chapterRecap: 'Flexible store formats can expand market reach and improve cost alignment. Operators should evaluate each format against a defined customer occasion and a distinct financial model rather than applying one store design to every location.',
    deepDiveTitle: 'Why each format needs its own financial model',
    body: <C5DeepDive paragraphs={[
      'A kiosk lives on volume and low rent, so staffing, speed and a short menu decide its profit. A destination café lives on average spend and longer visits, so food, ambience and events decide it.',
      'Copying one model’s costs onto the other gives a wrong answer, which is why piloting should measure investment, sales density, labour productivity and payback for each format separately.' ]} evidence="E-Coffee details are from The Investor; kiosk prices are from Tuoi Tre; WinMart kiosks and Unicorn are from VietnamFinance and VietnamBiz; the drive-through and Bitexco are from VietnamBiz and Vietstock; the capital-efficient formats comment is from the Jollibee Group release; the robot café is a single-shop report from Dan Tri. The separate-model reasoning is our own." />,
    sources: citeC5('investorEcoffee', 'tuoitreRebalancing', 'vietnamfinanceChains', 'vietnambizShakeout', 'vietstockDrinks', 'jollibeeHighlands', 'roboticCafe', 'secondaryUnitEconomics'),
  }),
];

const quiz = c5Quiz('coffee-m5-l3', [
  { chapter: '1', objective: 'State the omnichannel rule', question: 'What does omnichannel growth require?', application: 'A chain celebrates higher delivery order volume. What should it check?', correct: 'Channel-specific economics rather than simply maximising order volume', wrong: ['More promotions on every channel', 'One menu for all channels', 'Fewer data checks'], explanation: 'Profit varies by channel. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall platform shares', question: 'What combined share of Vietnam online food delivery did ShopeeFood and GrabFood hold in 2025?', application: 'An owner assesses platform power. What is the share?', correct: '96%, with 48% each', wrong: ['10%', '48% in total', '4%'], explanation: 'beFood held 4%. Review Chapter 1.' },
  { chapter: '1', objective: 'Name delivery costs', question: 'Which costs can delivery introduce?', application: 'A manager reviews a delivery sale. What comes off?', correct: 'Platform commissions, packaging costs, discounting pressure and transit quality risks', wrong: ['Only taxes', 'No extra costs', 'Only courier tips'], explanation: 'All reduce contribution. Review Chapter 1.' },
  { chapter: '2', objective: 'State the expansion insight', question: 'Where is competitive advantage shifting?', application: 'A chain still counts store openings as success. What should it track?', correct: 'From opening more stores to building a productive, replicable store network', wrong: ['Toward more closures only', 'Toward fewer customers', 'Toward lower quality'], explanation: 'Expansion follows proven economics. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the milestone', question: 'When did Highlands open its 1,000th outlet?', application: 'An analyst dates the chain’s milestone. What date applies?', correct: 'June 2026', wrong: ['January 2015', 'March 2020', 'December 2030'], explanation: 'It was in Hanoi. Review Chapter 2.' },
  { chapter: '2', objective: 'Read the survey', question: 'What share of F&B businesses planned to expand in H2 2026, according to iPOS.vn?', application: 'An investor checks expansion appetite. What was reported?', correct: '52.01%, down from 57.31%', wrong: ['5.2%', '97%', 'No business'], explanation: 'Appetite is easing. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain localised saturation', question: 'What does Insight Asia mean by localised saturation?', application: 'Two stores of one brand sit on the same road. What may happen?', correct: 'Dense networks where outlets of the same brand take sales from each other', wrong: ['Shortage of coffee beans', 'Too few customers nationwide', 'No rent'], explanation: 'Dense rollouts reduce average revenue. Review Chapter 2.' },
  { chapter: '3', objective: 'State the format insight', question: 'What does format innovation allow operators to do?', application: 'A brand uses one store design everywhere. What is missing?', correct: 'Match the business model to the consumption occasion', wrong: ['Remove the menu', 'Avoid all rent', 'Use only delivery'], explanation: 'Occasion drives format. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a compact format', question: 'How small can an E-Coffee format be, according to The Investor?', application: 'A founder wants the lowest entry cost. What size is offered?', correct: 'From about 4 square metres', wrong: ['At least 400 square metres', 'Exactly 100 square metres', 'Only drive-through lanes'], explanation: 'Kiosk formats start small. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe piloting', question: 'What should format piloting compare?', application: 'A chain tests a drive-through at two sites. What should it compare?', correct: 'Investment, sales density, labour productivity and payback periods', wrong: ['Only logo colours', 'Only the number of seats', 'Only staff names'], explanation: 'Pilot before scaling. Review Chapter 3.' },
]);

export const LESSON_C5_3: CoffeeM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how channels, store networks and formats are changing in Vietnam’s coffeehouse market and how to judge each.',
    keyTakeaways: [
      'Omnichannel growth must be judged on channel-specific economics.',
      'Two platforms hold 96% of Vietnam delivery value and charge 20–30% commissions.',
      'Expansion is shifting from store counts to productive, replicable networks.',
      'Formats should match occasions and be piloted with their own financial models.',
      'Evidence on coffee delivery margins and format payback in Vietnam is missing.',
    ],
    businessImplications: 'Track contribution by channel and format, close or redesign weak stores and expand only on proven unit economics.',
    remember: 'Count profit per order and per store, not just orders and stores.',
    nextLesson: 'Regulatory & Sustainability Trends',
  },
};
