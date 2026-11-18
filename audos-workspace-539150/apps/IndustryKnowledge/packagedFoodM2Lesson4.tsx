import { EvidenceNote, chapter, citePfM2, pairedQuiz } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.4 Downstream Activities';

const deck: PackagedFoodCardData[] = [
  chapter({
    title: 'How Packaged Food Products Reach Consumers',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Trace primary, secondary and last-mile distribution and explain the services performed by distributors and wholesalers.',
    mateIntro: 'A finished biscuit at the factory has not created a consumer sale. It still needs inventory, transport, credit, outlet coverage and replenishment before a shopper can choose it.',
    keyInsight: 'Packaged-food distribution is a layered service system: primary distribution positions bulk stock, secondary distribution reaches outlets, and the last mile completes the shopper order.',
    narrative: [
      { label: 'What it is', text: 'Primary distribution moves finished cases from the plant to a company depot or distributor. Secondary distribution breaks that stock into outlet-sized drops. The last mile connects an outlet or fulfilment point to the shopper, especially in e-commerce and quick commerce.' },
      { label: 'How it works', text: 'Distributors and wholesalers hold stock, break bulk, plan routes, extend credit to small outlets, collect payment and absorb part of the inventory risk. Removing an intermediary means the manufacturer must replace those services.' },
      { label: 'Global example', text: 'A multinational can standardise forecasting and brand systems, but it still adapts warehousing, distributor coverage and service frequency to local geography and retail structure.' },
      { label: 'Vietnam example', text: 'Orion Food Vina built leadership through deep local distribution and reported more than US$400 million of revenue in 2022. The figure shows company scale, not the size of Vietnam’s whole packaged-food market.' },
      { label: 'Why it matters', text: 'Distribution depth is difficult to copy because it is made of thousands of repeated operating routines and relationships, not simply trucks or warehouses.' },
    ],
    visualKind: 'packaged-food-m2-24-1',
    visualHeading: 'Follow the route from plant to shopper',
    visualIntro: 'Map each inventory hand-off, the service performed and the information that travels back upstream.',
    imageAlt: 'Layered packaged-food route from factory through depot, distributor, outlet and shopper',
    statTiles: [
      { value: '>US$400m', label: 'Orion Food Vina revenue, 2022', subtitle: 'Vietnam company scale', description: 'Reported by VnExpress; this is company revenue, not market size or distributor revenue.' },
    ],
    keyTerms: [
      { term: 'Primary distribution', definition: 'Bulk movement from a factory to a depot or distributor inventory point.' },
      { term: 'Secondary distribution', definition: 'Movement from a distributor or depot to individual trade outlets.' },
      { term: 'Break bulk', definition: 'Split large factory shipments into the smaller quantities required by outlets.' },
      { term: 'Cost to serve', definition: 'The full cost of supplying and supporting a customer, outlet or channel.' },
    ],
    recap: [
      'Finished stock normally moves through several distribution layers.',
      'Intermediaries provide inventory, credit, route and collection services.',
      'Route density and service frequency affect cost to serve.',
      'A direct model must replace every service removed from the chain.',
    ],
    chapterRecap: 'Evaluate distribution by total service economics and availability, not by the visible intermediary margin alone.',
    deepDiveTitle: 'Why distribution breadth becomes a moat',
    body: (
      <div className="space-y-4">
        <p>Outlet coverage compounds. More productive stops improve route economics; reliable service strengthens retailer relationships; better availability produces more sell-out data; and that data improves the next forecast. A competitor cannot recreate this loop by signing one logistics contract.</p>
        <p>Breadth is not enough. A listed SKU can still be unavailable, damaged, stale or poorly replenished. Distribution quality therefore combines numeric coverage with in-stock performance, stock rotation and execution.</p>
        <EvidenceNote>The research did not verify Orion’s outlet or distributor count, or Vietnam confectionery distributor margins. No network count or margin percentage is inferred here.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06'),
  }),
  chapter({
    title: 'Understanding Retail and Distribution Channels',
    chapterTitle: LESSON,
    readingTime: '7',
    objective: 'Compare General Trade, Modern Trade, convenience and e-commerce without inventing a channel-share split.',
    mateIntro: 'The same snack competes in different commercial systems: a neighbourhood shop values frequent small drops and credit, while a supermarket values listings, planograms, promotions and reliable case supply.',
    keyInsight: 'Vietnam requires both General Trade breadth and Modern Trade discipline; e-commerce adds data and convenience but does not erase physical fulfilment economics.',
    narrative: [
      { label: 'What it is', text: 'General Trade includes family-run shops, wet-market stalls and kiosks. Modern Trade includes supermarkets, hypermarkets and convenience chains. E-commerce and quick commerce add digital discovery, ordering and delivery.' },
      { label: 'How it works', text: 'General Trade is fragmented and commonly served through distributors and wholesalers. Modern Trade concentrates volume in key accounts that negotiate assortment, listings, promotions and shelf position. Online channels add platform terms, picking and last-mile delivery.' },
      { label: 'Global example', text: 'Global brand owners manage retailer relationships and category plans while tailoring pack sizes, price points and promotions to each channel.' },
      { label: 'Vietnam example', text: 'WinMart+, Circle K, GS25 and Bách Hóa Xanh illustrate expanding organised retail, while family shops and market stalls remain the essential fragmented-trade challenge. Shopee, Lazada and TikTok Shop can support shelf-stable snacks and gift sets.' },
      { label: 'Why it matters', text: 'Channel choice changes working capital, buyer power, data access, service level and promotion economics. A channel with more sales can still be less attractive if its total cost to serve is ignored.' },
    ],
    visualKind: 'packaged-food-m2-24-2',
    visualHeading: 'Compare four routes to the shopper',
    visualIntro: 'Read each route by customer structure, operating requirement, source of power and execution priority.',
    imageAlt: 'Comparison of General Trade, Modern Trade, convenience and e-commerce channels',
    statTiles: [
      { value: '~66%', label: 'ChocoPie share of Vietnam’s “pie” segment, 2022', subtitle: 'Nielsen via VnExpress', description: 'A product-segment share that illustrates focused channel execution; it is not total confectionery share.' },
      { value: '~VND66tn', label: 'Vietnam confectionery forecast, 2025', subtitle: 'Commercial industry forecast', description: 'Nielsen figure reported by VnExpress; not an official statistic and not a packaged-food channel value.' },
    ],
    keyTerms: [
      { term: 'General Trade (GT)', definition: 'Fragmented independent retail such as family shops, kiosks and wet-market stalls.' },
      { term: 'Modern Trade (MT)', definition: 'Organised retail such as supermarkets, hypermarkets and convenience chains.' },
      { term: 'Key account', definition: 'A large retail customer managed through central commercial terms and joint plans.' },
      { term: 'Planogram', definition: 'A prescribed arrangement of products and facings on a retail shelf.' },
    ],
    recap: [
      'GT provides fragmented reach through distributor-led service.',
      'MT offers scale and data but concentrates buyer power.',
      'Convenience prioritises immediate availability and small missions.',
      'E-commerce still carries platform, fulfilment and delivery costs.',
    ],
    chapterRecap: 'A winning route-to-market assigns the right pack, price, stock and service model to each channel.',
    deepDiveTitle: 'Do not invent the GT–MT split',
    body: (
      <div className="space-y-4">
        <p>Store count, sales value and sales volume are different denominators. General Trade can dominate outlet count without holding the same share of value in every category. Chocolate gifting, everyday biscuits and savoury snacks can also have different channel mixes.</p>
        <p>A sound channel recommendation starts with a clearly defined category, period and metric. It then compares net revenue, promotion, fees, credit, delivery frequency, returns and working capital rather than treating gross sell-in as profit.</p>
        <EvidenceNote>No current primary-verified GT-versus-MT percentage, per-channel margin benchmark or confectionery e-commerce share was available in row 23. These remain explicit research gaps.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06'),
  }),
  chapter({
    title: 'Marketing, Merchandising, and Retail Execution',
    chapterTitle: LESSON,
    readingTime: '7',
    objective: 'Explain how brand marketing, trade marketing, merchandising and field execution convert distribution into consumer sales.',
    mateIntro: 'Distribution earns a place in the outlet; retail execution earns the sale. An unavailable product, a hidden display or a missed seasonal window can waste the demand created by advertising.',
    keyInsight: 'Packaged-food execution joins availability, visibility, price and promotion, with especially high stakes around Tết and Mid-Autumn gifting peaks.',
    narrative: [
      { label: 'What it is', text: 'Brand marketing builds preference. Trade marketing translates that strategy into channel programmes. Merchandising manages shelf and display. Sales and field teams secure stock, price, promotion and replenishment at outlet level.' },
      { label: 'How it works', text: 'A campaign becomes a channel-specific assortment, price-pack plan, display, promotion and stock target. Sell-in, inventory and sell-through signals then guide replenishment and the next activation.' },
      { label: 'Global example', text: 'Mondelez delivered 4.3% organic net-revenue growth in FY2024 despite severe cocoa inflation, illustrating the commercial value of brands and distribution; the result is corporate growth, not a retail-execution ROI measure.' },
      { label: 'Vietnam example', text: 'Tết gift boxes and Mid-Autumn mooncakes concentrate execution into short windows. Forecasting, packaging, distributor loading, displays and sell-through control must align before the occasion loses relevance.' },
      { label: 'Why it matters', text: 'Commercial teams are measured on outcomes at the shelf: the right SKU must be present, visible, correctly priced and supported by a promotion that creates profitable sell-through.' },
    ],
    visualKind: 'packaged-food-m2-24-3',
    visualHeading: 'Turn a brand plan into shelf execution',
    visualIntro: 'Connect preference, channel plans, the four execution checks and sell-through feedback.',
    imageAlt: 'Marketing and retail execution loop for packaged food',
    statTiles: [
      { value: '+4.3%', label: 'Mondelez organic net-revenue growth, FY2024', subtitle: 'Global corporate result', description: 'Audited company result cited in the research; not a Vietnam market-growth or merchandising-return figure.' },
    ],
    keyTerms: [
      { term: 'Trade marketing', definition: 'Channel programmes that translate brand strategy into retailer and outlet execution.' },
      { term: 'Merchandising', definition: 'Managing assortment, shelf position, displays and product presentation at retail.' },
      { term: 'Sell-in', definition: 'Sales from a manufacturer to a distributor or retailer.' },
      { term: 'Sell-through', definition: 'Sales from the channel to the final shopper.' },
    ],
    recap: [
      'Brand marketing and trade execution perform different jobs.',
      'Availability, visibility, price and promotion are the core checks.',
      'Sell-in is not evidence of shopper sell-through.',
      'Seasonal peaks raise the cost of forecast and execution errors.',
    ],
    chapterRecap: 'Demand creation produces value only when the right product is available and converts into shopper sell-through.',
    deepDiveTitle: 'Why seasonal inventory behaves differently',
    body: (
      <div className="space-y-4">
        <p>Seasonal confectionery has a commercial deadline. Packaging, gift relevance and display value can fall sharply after the occasion, so excess inventory may require discounting while a stock-out loses an unrecoverable selling window.</p>
        <p>Teams therefore separate sell-in from sell-through, monitor stock by channel and protect replenishment lead times. The same discipline applies globally, but Vietnam’s Tết and Mid-Autumn calendar makes it especially visible.</p>
        <EvidenceNote>The research supports the importance of Tết and Mid-Autumn qualitatively but does not quantify their share of annual confectionery sales. No seasonal percentage is presented.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s06'),
  }),
];

const quiz: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l4', [
  { chapter: '1', objective: 'Map distribution layers', question: 'What is secondary distribution?', application: 'A regional distributor breaks mixed cases into small drops for family shops. Which layer is operating?', correct: 'Movement from a distributor or depot to trade outlets', wrong: ['Bulk ingredient movement into a factory', 'A shopper collecting an online order', 'Global cocoa procurement'], explanation: 'Secondary distribution serves individual outlets from a regional stock point. Review Chapter 2.4.1.' },
  { chapter: '1', objective: 'Evaluate intermediary services', question: 'Why might removing a distributor fail to lower total cost?', application: 'A manufacturer goes direct and must add local inventory, vans, credit and collections. What was overlooked?', correct: 'The distributor margin paid for services the manufacturer must now replace', wrong: ['Finished food no longer needs transport', 'Retailers stop requiring stock', 'Direct sales eliminate working capital'], explanation: 'Compare the full replacement cost and service level, not only the visible margin. Review Chapter 2.4.1.' },
  { chapter: '1', objective: 'Understand distribution quality', question: 'Which measure best complements outlet coverage?', application: 'A SKU is listed in many stores but often missing from the shelf. What weakness does this reveal?', correct: 'In-stock availability and replenishment quality', wrong: ['A larger market-size estimate', 'More factory depreciation', 'A different HS code'], explanation: 'Numeric breadth creates little value when stock is unavailable or poorly rotated. Review Chapter 2.4.1.' },
  { chapter: '1', objective: 'Read company evidence', question: 'What does Orion’s >US$400m figure represent?', application: 'A slide labels the figure Vietnam confectionery market size. What is the correction?', correct: 'Orion Food Vina company revenue in 2022', wrong: ['Official Vietnam packaged-food output', 'Distributor profit in 2024', 'ChocoPie global sales'], explanation: 'The source reports company revenue, not a market or channel total. Review Chapter 2.4.1.' },
  { chapter: '2', objective: 'Compare GT and MT', question: 'Which feature most clearly distinguishes General Trade?', application: 'A sales team serves thousands of independent family shops through distributors. Which channel is this?', correct: 'Fragmented independent outlets commonly reached through layered distribution', wrong: ['Centrally negotiated supermarket chains only', 'Manufacturer-owned factories', 'Export customs warehouses'], explanation: 'General Trade is fragmented and depends heavily on distribution breadth. Review Chapter 2.4.2.' },
  { chapter: '2', objective: 'Understand key accounts', question: 'What is a key-account responsibility in Modern Trade?', application: 'A supermarket chain negotiates listings, displays and a joint promotion centrally. Who manages this?', correct: 'The manufacturer’s key-account team', wrong: ['Cocoa farmers', 'Factory quality control only', 'Last-mile consumers'], explanation: 'Modern Trade concentrates negotiation and planning in large retail accounts. Review Chapter 2.4.2.' },
  { chapter: '2', objective: 'Use evidence gaps correctly', question: 'What precise channel statistic was not verified in the research?', application: 'An analyst claims GT holds exactly 80% of Vietnam confectionery sales. What should happen?', correct: 'Keep the GT–MT percentage unquantified unless a category-, period- and metric-specific source is added', wrong: ['Present it as an official statistic', 'Apply the figure to every packaged-food category', 'Replace sales value with store count'], explanation: 'Row 23 explicitly records the current GT–MT split as a research gap. Review Chapter 2.4.2.' },
  { chapter: '3', objective: 'Distinguish sell-in and sell-through', question: 'What does sell-through measure?', application: 'Retailers received a seasonal gift range, but shoppers did not buy it. Which measure exposes the issue?', correct: 'Sales from the channel to final shoppers', wrong: ['Factory output before distribution', 'Shipments from manufacturer to distributor', 'Agricultural input purchases'], explanation: 'Sell-in can look strong while shopper sell-through remains weak. Review Chapter 2.4.3.' },
  { chapter: '3', objective: 'Apply retail execution', question: 'Which four checks form the lesson’s retail-execution framework?', application: 'Advertising created demand, but the SKU is absent and the promotion label is wrong. Which capability failed?', correct: 'Availability, visibility, price and promotion', wrong: ['Harvest, grinding, conching and moulding', 'Imports, exports, tariffs and FX', 'Hiring, payroll, audit and tax'], explanation: 'Retail execution converts brand demand at the shelf through these four checks. Review Chapter 2.4.3.' },
  { chapter: '3', objective: 'Manage seasonal execution', question: 'Why is excess seasonal confectionery especially risky?', application: 'Gift boxes remain after Tết. Why can ordinary replenishment logic not fully solve the problem?', correct: 'The selling occasion and much of the product’s commercial relevance have passed', wrong: ['The products become official statistics', 'Distributors no longer provide any service', 'All confectionery must be exported'], explanation: 'Seasonal windows make forecast error harder to recover through later sales. Review Chapter 2.4.3.' },
]);

const takeaways: PackagedFoodTakeaways = {
  learned: 'You can trace layered distribution, compare Vietnam’s main retail channels and explain how marketing and field execution create shopper sell-through.',
  keyTakeaways: [
    'Primary, secondary and last-mile distribution perform different jobs.',
    'Distributors provide inventory, credit, route and collection services.',
    'Vietnam requires General Trade breadth and Modern Trade key-account discipline.',
    'Availability, visibility, price and promotion turn brand demand into sales.',
    'Tết and Mid-Autumn make forecasting and sell-through control commercially decisive.',
  ],
  businessImplications: 'A commercial recommendation should specify the channel, pack, service level, promotion, working-capital effect and evidence base—not merely call for “more distribution.”',
  remember: 'Distribution earns access; retail execution converts access into profitable sell-through.',
  nextLesson: 'Inputs, Outputs & Value Creation',
};

export const PACKAGED_FOOD_M2_LESSON4 = { deck, quiz, takeaways };
