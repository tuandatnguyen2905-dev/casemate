import { C4DeepDive, citeC4, c4Chapter, c4Quiz } from './coffeeM4Core';
import type { CoffeeM4LessonBundle } from './coffeeM4Core';

const LESSON = '1. Industry Competition Structure';

const deck = [
  c4Chapter({
    title: 'Market Fragmentation and Industry Consolidation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why Vietnam’s coffeehouse and foodservice market is both fragmented and consolidating, and what each trend means for competitors.',
    mateIntro: 'Most of the places selling you a coffee or a meal are small. Yet the chains you see on every corner are slowly winning a larger share.',
    keyInsight: 'The industry is moving toward a more organized competitive structure, but it is not becoming a chain-only market. Scale offers advantages, while local relevance and disciplined store economics remain essential for survival.',
    statTiles: [
      { value: '5', label: 'Key fragmentation and consolidation activities', subtitle: 'Independent competition to portfolio rationalization', description: 'Independent competition, chain expansion, market consolidation, format diversification and portfolio rationalization.' },
      { value: '8.3%', label: 'Share of 2025 Vietnam F&B revenue earned by chains of at least 10 branded outlets', subtitle: 'iPOS.vn and Nestlé Professional, up from about 7.3%', description: 'Independents earned the remaining 91.7%, so the market is still fragmented.' },
      { value: '~50,000', label: 'F&B outlets reported as closed in the first half of 2025', subtitle: 'VietnamBiz, citing the iPOS.vn first-half report', description: 'A sign of the exits that feed consolidation.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The revenue shares cover all food and beverage outlets, not coffee alone, and the closure figure is as reported by VietnamBiz and was not checked against the iPOS.vn report itself.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s coffeehouse and foodservice retail industry remains highly fragmented. Independent cafés, traditional eateries, family-owned restaurants, and small local operators coexist with organized chains and international brands. Independent businesses benefit from local familiarity and flexible operations, while chains can leverage standardized processes, centralized procurement, brand awareness, and broader marketing resources.' },
      { label: 'Why it is happening', text: 'Consolidation is becoming more visible as organized operators expand and weaker businesses exit or restructure. Euromonitor identifies independent operators as dominant in Vietnam’s consumer foodservice market, while also highlighting chain expansion, competitive pressure, and the importance of operational efficiency. The wider market therefore combines a large independent base with a growing organized segment.' },
      { label: 'Real-world example', text: 'Neighbourhood cafés and restaurants compete through convenient locations, familiar products, affordable prices and owner-led service, while organized operators open more outlets and enter new districts. Operators with stronger capital, supply networks and management systems pick up opportunities when weaker competitors close, and retailers add kiosks, takeaway outlets, flagship cafés and smaller neighbourhood stores to reach different segments. Underperforming outlets are closed, leases renegotiated or formats repositioned.' },
      { label: 'Vietnam example', text: 'An iPOS.vn and Nestlé Professional report deck puts independents at 91.7% of 2025 F&B revenue and chains of at least 10 branded outlets at 8.3%, up from about 7.3% in 2024. VietnamBiz reported, citing the iPOS.vn first-half 2025 report, that about 50,000 F&B outlets had stopped trading, while the larger coffee chains kept opening. The first-half 2026 survey found 42.7% of establishments with revenue down at least 5% and only 20.22% growing by more than 5%, and Highlands opened its 1,000th outlet in June 2026 in Hanoi’s Tây Hồ area, in premises previously run by another café chain. Euromonitor’s consumer foodservice report separates independent from chained outlets and notes inflation and rising operating costs; only its summary page could be read for this module.' },
      { label: 'Business impact', text: 'Fragmentation creates opportunities for new concepts, but it also intensifies competition for customers and locations. The advantage increasingly belongs to operators that combine recognizable positioning with sustainable store-level economics.' },
    ],
    visualKind: 'coffee-m4-11-fragmentation', visualHeading: 'Where F&B revenue sits',
    visualIntro: 'Compare the revenue share of independents with chains in 2025 and chains in 2024.',
    imageAlt: 'Casemate bar chart of independent and chain shares of Vietnam F&B revenue',
    keyTerms: [
      { term: 'Fragmentation', definition: 'A market spread across many small competitors, none with a large share.' },
      { term: 'Consolidation', definition: 'A shift of share toward fewer, larger operators as others exit or are bought.' },
      { term: 'Portfolio rationalization', definition: 'Closing, repositioning or renegotiating weak outlets to improve returns.' },
      { term: 'Chain', definition: 'Here, a group of at least 10 branded outlets, as defined in the iPOS.vn report.' },
    ],
    recap: [
      'Independents still earn most F&B revenue in Vietnam.',
      'Chains are growing from a small base as weaker operators exit.',
      'Scale helps, but local relevance and store economics decide survival.',
      'Operators rationalise portfolios by closing, renegotiating or repositioning.',
    ],
    chapterRecap: 'Fragmentation creates opportunities for new concepts, but it also intensifies competition for customers and locations. The advantage increasingly belongs to operators that combine recognizable positioning with sustainable store-level economics.',
    deepDiveTitle: 'Why a small share gain by chains can still reshape the market',
    body: <C4DeepDive paragraphs={[
      'A move from about 7.3% to 8.3% of revenue looks small, but across a market worth hundreds of trillions of dong it is a large amount of sales shifting toward organised operators in one year.',
      'The shift is also uneven: some chains grow fast while many independents lose revenue, so averages hide both winners and losers.' ]} evidence="Revenue shares are from the iPOS.vn and Nestlé Professional report deck; the closure figure is from VietnamBiz; the first-half 2026 survey figures and the Highlands 1,000th outlet are from The Investor; the Euromonitor point is from its summary page. The share-shift reasoning is our own." />,
    sources: citeC4('iposReportDeck', 'vietnambizShakeout', 'investorLargerPlayers', 'euromonitorFoodservice', 'agroMilano'),
  }),
  c4Chapter({
    title: 'Competitive Dimensions and Basis of Competition', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the dimensions on which coffeehouses compete and explain why the right basis of competition differs by format and customer.',
    mateIntro: 'A commuter wants speed, a coffee enthusiast wants beans, and a student wants a seat. The same market contains all three.',
    keyInsight: 'There is no single basis of competition across the industry. Brands must prioritize the factors most relevant to their target customers and deliver them consistently at a commercially viable cost.',
    statTiles: [
      { value: '6', label: 'Competitive dimensions', subtitle: 'Product differentiation to operational efficiency', description: 'Product differentiation, price and value, location and convenience, experience and service, brand and cultural relevance, and operational efficiency.' },
      { value: 'VND 29–75K vs 35–70K', label: 'Price bands of Highlands and Phúc Long', subtitle: 'VietnamBiz, July 2025', description: 'Nearly equal, so price is not what separates them.' },
      { value: 'VND 30–40K', label: 'Price band where mid-tier chains are squeezed', subtitle: 'iPOS.vn, via The Viet Media', description: 'Neither cheap enough for mass chains nor strong enough for a premium.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The price bands are reported ranges, not menu audits, and the squeezed-middle band is an industry observation.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retailers compete across several dimensions, including product quality, price, menu variety, convenience, location, ambience, service, brand image, and digital accessibility. The importance of each factor varies by format and consumption occasion. A commuter may prioritize speed and location, while a specialty coffee customer may place greater emphasis on bean quality and preparation expertise.' },
      { label: 'Why it is happening', text: 'Competition also occurs at the operational level. Procurement costs, labor productivity, menu engineering, store utilization, and inventory control influence whether a retailer can maintain attractive prices while protecting margins.' },
      { label: 'Real-world example', text: 'Brands differentiate through distinctive coffee profiles, signature drinks and food quality; compete on core prices, bundles and perceived value; win on location, opening hours, takeaway speed and delivery coverage; and build experience through ambience, staff, cleanliness and order accuracy. They also rely on a recognisable, locally adapted identity and on consistent recipes, procurement scale, staff productivity, waste control and fast fulfilment.' },
      { label: 'Vietnam example', text: 'VietnamBiz reported in July 2025 that Highlands (VND 29,000–75,000) and Phúc Long (VND 35,000–70,000) sit in nearly the same price band, so customers choose on experience, space and taste. Katinat sits at VND 35,000–70,000 and is described by commentators as winning on distinctive store design, while Starbucks has adapted its menu with salt coffee, coconut coffee and matcha. iPOS.vn describes a squeezed middle: chains priced around VND 30,000–40,000 without the brand pull of Highlands or Starbucks. Momentum Works’ head of market research said success now depends less on the best drinks or largest network and more on supply chain, store management and digital systems.' },
      { label: 'Business impact', text: 'Competitive advantage comes from choosing a coherent position rather than attempting to excel at every dimension. The strongest operators align customer expectations, brand identity, and operating capabilities.' },
    ],
    visualKind: 'coffee-m4-12-dimensions', visualHeading: 'Six dimensions of competition',
    visualIntro: 'See the six dimensions and the question each answers for the customer.',
    imageAlt: 'Casemate orbit diagram of six competitive dimensions in coffeehouse retail',
    keyTerms: [
      { term: 'Basis of competition', definition: 'The factors on which rivals win customers, such as price, quality, convenience or experience.' },
      { term: 'Menu engineering', definition: 'Designing the menu around item popularity and margin.' },
      { term: 'Coherent position', definition: 'A set of choices on price, product and experience that fit one target customer.' },
      { term: 'Squeezed middle', definition: 'Mid-priced brands that are neither cheap nor distinctive enough to hold customers.' },
    ],
    recap: [
      'Brands compete on product, price, location, experience, brand and efficiency.',
      'The weight of each dimension depends on format and occasion.',
      'Operational capability decides whether prices and margins can both hold.',
      'A coherent position beats trying to excel at everything.',
    ],
    chapterRecap: 'Competitive advantage comes from choosing a coherent position rather than attempting to excel at every dimension. The strongest operators align customer expectations, brand identity, and operating capabilities.',
    deepDiveTitle: 'Why equal prices make the other dimensions decisive',
    body: <C4DeepDive paragraphs={[
      'When two brands charge nearly the same, the customer’s choice turns on what else differs: seat comfort, taste, queue time, app convenience or how the store feels. Those are the dimensions where investment shows.',
      'It also means a brand cannot buy preference with a lower price alone, because rivals can match it, but a distinctive experience is slower to copy.' ]} evidence="Price bands are from a VietnamBiz article read as a search excerpt; the squeezed-middle framework is iPOS.vn as reported by The Viet Media; the Momentum Works comment is from VietnamPlus; Starbucks menu changes are from VietnamBiz; the Katinat view is commentary reported by Vinalink. The reasoning about equal prices is our own." />,
    sources: citeC4('vietnambizHighlandsPhucLong', 'vietmediaSplit', 'vietnamplusRegional', 'vietnambizShakeout', 'katinatProfile'),
  }),
  c4Chapter({
    title: 'Barriers to Entry and Competitive Intensity', chapterTitle: LESSON, readingTime: '7',
    objective: 'Distinguish the barriers to opening one café from the barriers to building a sustainable chain.',
    mateIntro: 'Opening a café is easy to imagine. Keeping it busy, profitable and copyable across twenty sites is another matter.',
    keyInsight: 'Low barriers to opening a store do not imply low barriers to building a sustainable chain. Long-term competitiveness requires operational capabilities and customer loyalty that competitors cannot easily replicate.',
    statTiles: [
      { value: '6', label: 'Entry and intensity factors', subtitle: 'Capital to switching', description: 'Capital requirements, location access, brand differentiation, operational scalability, customer acquisition, and switching and substitution.' },
      { value: '1,000+', label: 'Mixue stores in Vietnam by 2023', subtitle: 'The Viet Media', description: 'A low-price chain that scaled fast and then retreated.' },
      { value: '>400', label: 'International outlets Mixue closed in its latest fiscal year', subtitle: 'The Viet Media, citing Mixue’s report', description: 'Vietnam and Indonesia bore much of the retreat.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Mixue figures are as reported by The Viet Media from the company’s annual report and are international, not Vietnam-only.',
    narrative: [
      { label: 'What it is', text: 'Entering the industry can be relatively straightforward for a small independent café, but building a profitable and scalable business is more difficult. Initial barriers include startup capital, suitable premises, equipment, supplier access, food safety compliance, staff recruitment, and customer acquisition. Scaling into a chain introduces additional challenges in standardization, management, technology, logistics, and brand consistency.' },
      { label: 'Why it is happening', text: 'Competitive intensity is amplified by the number of available alternatives and the ease with which customers can switch between cafés and foodservice outlets. A new concept may attract initial interest, but sustained performance requires repeat demand, appropriate pricing, and a viable cost structure.' },
      { label: 'Real-world example', text: 'A new chain must fund fit-out, equipment, deposits, working capital and early losses; secure sites with traffic at affordable occupancy cost; give customers a clear reason to choose it over nearby alternatives; build repeatable recipes, training and inventory systems; and win awareness through local marketing, social media, promotions and referrals. It competes with other cafés, convenience stores, street vendors, restaurants and home consumption.' },
      { label: 'Vietnam example', text: 'Mixue entered Vietnam in 2018, priced cups at VND 25,000–30,000 and passed 1,000 stores by 2023, but rapid rollout raised density, outlets of the same brand began cannibalising each other and promotions pushed cups as low as VND 8,000. Café Amazon, Thailand’s largest chain, entered in 2020, never passed 30 stores and left Vietnam in 2025, with its Thai partner recording repeated losses. VietnamBiz reports that Chuk Tea & Coffee, once at about 50 stores, and King Coffee are down to five or six each, and that The Coffee House shrank from 150 stores at its peak to 93 at takeover by Golden Gate and fewer later. A Vinalink commentary notes the Chinese tea chain Chagee entered Vietnam in early 2025.' },
      { label: 'Business impact', text: 'Entry barriers increase as businesses move from a single outlet to a multi-store network. Sustainable competition requires more than opening stores: it requires a differentiated proposition, repeat demand, and a replicable operating model.' },
    ],
    visualKind: 'coffee-m4-13-barriers', visualHeading: 'Six hurdles to a sustainable chain',
    visualIntro: 'Read the six hurdles and what each requires of a growing business.',
    imageAlt: 'Casemate cards of six barriers to entry and competitive intensity in coffeehouse retail',
    keyTerms: [
      { term: 'Barrier to entry', definition: 'A cost or obstacle that makes it harder for a newcomer to compete.' },
      { term: 'Switching cost', definition: 'What a customer gives up by choosing another provider; low in cafés.' },
      { term: 'Substitute', definition: 'A different product or format that meets the same need.' },
      { term: 'Cannibalisation', definition: 'Sales taken from one outlet of a brand by another nearby outlet of the same brand.' },
    ],
    recap: [
      'Opening one café is easy; building a profitable chain is not.',
      'Customers can switch at almost no cost.',
      'Scaling adds standardisation, management, technology and logistics challenges.',
      'Several chains scaled quickly and then shrank or exited.',
    ],
    chapterRecap: 'Entry barriers increase as businesses move from a single outlet to a multi-store network. Sustainable competition requires more than opening stores: it requires a differentiated proposition, repeat demand, and a replicable operating model.',
    deepDiveTitle: 'What the chain exits of 2025 teach about barriers',
    body: <C4DeepDive paragraphs={[
      'Café Amazon, Mixue’s international retreat and The Coffee House’s shrinkage show that backing, a known name or a fast rollout do not protect a chain that lacks a reason for customers to stay.',
      'In each case the weakness was repeat demand and store economics, the capabilities the brief names as the real barrier, not the cost of opening the first outlet.' ]} evidence="Mixue figures and price points are from The Viet Media; Café Amazon, Chuk, King Coffee and The Coffee House details are from VietnamBiz, which gives two different counts for The Coffee House; the Chagee entry is from a Vinalink commentary. Causes of each exit are as described by the press and are not company statements." />,
    sources: citeC4('vietmediaSplit', 'vietnambizShakeout', 'vietstockDrinks', 'virNewModels', 'katinatProfile', 'vnexpressChains'),
  }),
];

const quiz = c4Quiz('coffee-m4-l1', [
  { chapter: '1', objective: 'State the market structure', question: 'How is Vietnam’s coffeehouse and foodservice industry best described?', application: 'An analyst calls it a chain-dominated market. What is missing?', correct: 'Highly fragmented, with a growing organised segment', wrong: ['Dominated by one chain', 'Closed to new entrants', 'Entirely independent with no chains'], explanation: 'Independents still dominate revenue while chains grow. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the revenue split', question: 'What share of 2025 F&B revenue did chains of at least 10 outlets earn in the iPOS.vn report?', application: 'A student wants the chain share. What is the figure?', correct: '8.3%', wrong: ['91.7%', '50%', '0.3%'], explanation: 'Independents earned 91.7%. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain consolidation', question: 'What helps larger operators gain share when weaker competitors close?', application: 'A chain sees a rival’s site become vacant. What lets it act?', correct: 'Stronger capital, supply networks and management systems', wrong: ['Lower brand awareness', 'Fewer outlets', 'Weaker procurement'], explanation: 'Capabilities decide who captures openings. Review Chapter 1.' },
  { chapter: '2', objective: 'State the competition rule', question: 'What does the chapter say about the basis of competition?', application: 'A founder wants to win on every dimension. What should they do?', correct: 'There is no single basis; brands prioritise what their target customers value', wrong: ['Price is always decisive', 'Location is always decisive', 'Only brand matters'], explanation: 'Choose a coherent position. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare prices', question: 'How do the price bands of Highlands and Phúc Long compare?', application: 'Customers choose between them. What separates them?', correct: 'They are nearly equal, so experience, space and taste decide', wrong: ['Highlands is ten times cheaper', 'Phúc Long is ten times cheaper', 'They sell different products only'], explanation: 'Equal prices make other dimensions decisive. Review Chapter 2.' },
  { chapter: '2', objective: 'Define the squeezed middle', question: 'Who is in the “squeezed middle” in iPOS.vn’s framework?', application: 'A chain prices at VND 30,000–40,000 with no distinctive brand. Where is it?', correct: 'Mid-tier operators neither cheap enough for mass chains nor strong enough for a premium', wrong: ['The largest chains', 'Street vendors only', 'Delivery platforms'], explanation: 'The middle is where pain concentrates. Review Chapter 2.' },
  { chapter: '3', objective: 'State the barrier insight', question: 'What does low cost of opening a store imply about building a chain?', application: 'A friend says cafés are easy to start, so chains must be too. What is wrong?', correct: 'Nothing; low opening barriers do not mean low barriers to a sustainable chain', wrong: ['Chains are as easy as single stores', 'Opening costs decide everything', 'Chains need no systems'], explanation: 'Capabilities and loyalty are the real barrier. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Mixue’s path', question: 'What happened to Mixue in Vietnam according to The Viet Media?', application: 'A founder cites Mixue as proof of low-price success. What changed?', correct: 'It scaled past 1,000 stores by 2023 and then faced saturation and cannibalisation', wrong: ['It never entered Vietnam', 'It raised prices to premium', 'It bought Highlands'], explanation: 'Density hurt franchisees. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a market exit', question: 'Why is Café Amazon cited in this chapter?', application: 'An analyst lists exits. What does Café Amazon show?', correct: 'It entered in 2020, never passed 30 stores and left in 2025', wrong: ['It became the largest chain', 'It merged with Starbucks', 'It entered in 2025'], explanation: 'Backing alone is not enough. Review Chapter 3.' },
  { chapter: '3', objective: 'Note a source conflict', question: 'How should the two different store counts for The Coffee House be treated?', application: 'One paragraph says 48 stores and another says over 80. What should an analyst do?', correct: 'Flag the conflict and tie each count to its source and date', wrong: ['Average them', 'Use the higher one silently', 'Ignore both'], explanation: 'Counts vary by date and source. Review Chapter 3.' },
]);

export const LESSON_C4_1: CoffeeM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how fragmented and consolidating the Vietnam coffeehouse market is, on what dimensions rivals compete and which barriers matter.',
    keyTakeaways: [
      'The industry is becoming more organised but is not chain-only.',
      'Independents earn about 91.7% of F&B revenue; chains 8.3%.',
      'There is no single basis of competition, so choose a coherent position.',
      'Low barriers to opening a store do not mean low barriers to a sustainable chain.',
      'Fast rollouts without repeat demand and store economics have ended in closures.',
    ],
    businessImplications: 'Pick a clear position, test store economics before scaling and build capabilities rivals cannot easily copy.',
    remember: 'Opening a store is easy; keeping it profitable is the competition.',
    nextLesson: 'Key Industry Players',
  },
};
