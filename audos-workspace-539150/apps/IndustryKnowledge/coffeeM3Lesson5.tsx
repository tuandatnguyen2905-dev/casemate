import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '5. Distribution & Sales Channels';

const deck = [
  c3Chapter({
    title: 'Physical Stores and Location-Based Distribution', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why location is the main form of distribution for a coffeehouse and how store networks are built.',
    mateIntro: 'A café cannot ship its product to customers the way a packaged-goods brand can. It has to be where they already are.',
    keyInsight: 'For a coffeehouse, the store is both the factory and the shop, so location is the main form of distribution. Network density, site type and format decide who can reach the brand, how often and at what rent, and a chain that wins on sites can win on traffic before it wins on product.',
    statTiles: [
      { value: '6', label: 'Location choices', subtitle: 'High street to network density', description: 'High-street sites, shop-in-shop, landmark flagships, tourist areas, drive-through and network density.' },
      { value: '985', label: 'Highlands Coffee stores in Vietnam at end of 2025', subtitle: 'The Viet Media and VietnamPlus, Momentum Works', description: 'The largest coffee chain network in the country.' },
      { value: '21.2M', label: 'International visitors to Vietnam in 2025', subtitle: 'National Authority of Tourism', description: 'A visitor flow that tourist-area cafés can reach.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Store counts are tied to the date of each report, and Phúc Long is reported at 237 stores by one source and nearly 200 by another, so counts should be read with their dates.',
    narrative: [
      { label: 'What it is', text: 'Location-based distribution means reaching customers through physical outlets placed where they live, work, study, shop or travel. It covers street sites, shopping-centre units, counters inside other stores, landmark locations and car-based formats.' },
      { label: 'Why it is happening', text: 'Because the drink is made on the spot, the store cannot be replaced by a warehouse. Each site has a rent, a footfall and a catchment, so network design is a decision about where traffic is cheapest to capture and where a brand wants to be seen.' },
      { label: 'Real-world example', text: 'A chain opens flagships in landmark buildings for brand image, standard stores on busy streets for volume, counters inside supermarkets for shared traffic and drive-through lanes on car routes. Each is a different way of placing the same product in front of customers.' },
      { label: 'Vietnam example', text: 'Highlands reached 985 stores by the end of 2025, including Vietnam’s first drive-through, with same-store sales up over 8%. Phúc Long is reported at 237 stores, Katinat at 114 and Starbucks at 150, and a preliminary comparison reports Phúc Long kiosks inside WinMart supermarkets. Starbucks Reserve opened at Bitexco in April 2025, while The Coffee House fell from 150 to 94 stores by end-2024 and Café Amazon exited Vietnam in November 2025. Vietnam received nearly 21.2 million international visitors in 2025, and the iPOS.vn first-half 2026 report estimates about 329,200 food and beverage outlets.' },
      { label: 'Business impact', text: 'Site selection drives rent, traffic and brand image, and a poor site is hard to fix. Dense networks improve convenience and brand awareness but can cannibalise sales between nearby stores.' },
    ],
    visualKind: 'coffee-m3-51-physical', visualHeading: 'Six location choices',
    visualIntro: 'See six ways a coffeehouse chooses where to be and what each decides.',
    imageAlt: 'Casemate orbit diagram of six physical-store location choices for coffeehouses',
    keyTerms: [
      { term: 'Footfall', definition: 'The number of people passing or entering a location.' },
      { term: 'Catchment', definition: 'The area from which a store draws most of its customers.' },
      { term: 'Cannibalisation', definition: 'Sales taken from one store of a brand by another nearby store of the same brand.' },
      { term: 'Same-store sales', definition: 'Sales growth measured only on stores open in both periods.' },
    ],
    recap: [
      'The store is both factory and shop, so location is distribution.',
      'Site types include high street, shop-in-shop, flagship, tourist areas and drive-through.',
      'Dense networks add convenience but can cannibalise sales.',
      'Store counts are tied to dates and sources.',
    ],
    chapterRecap: 'Location decides who can reach a coffeehouse. The best networks combine site types for different jobs and track returns store by store.',
    deepDiveTitle: 'Why store counts alone do not show the strength of a network',
    body: <C3DeepDive paragraphs={[
      'A chain can grow its store count while sales per store fall. Same-store sales growth, such as Highlands’ reported rise of over 8% in 2025, shows whether existing stores are earning more.',
      'Closures matter too: The Coffee House shrank from 150 to 94 stores in two years while competitors expanded, so counts reflect strategy as well as demand.' ]} evidence="Store counts are from The Viet Media, VietnamPlus reporting Momentum Works, VietnamBiz and VnExpress International; the Phúc Long and WinMart kiosks and Starbucks details are from VietnamFinance and Vietstock; The Coffee House counts are from Vietnam Investment Review; tourism data are from the Vietnam News Agency; the first-half 2026 outlet estimate is from iPOS.vn." />,
    sources: citeC3('vietmediaChains', 'vietnamplusChains', 'vietnambizChains', 'vnexpressChains', 'vietnamfinanceChains', 'vietstockDrinks', 'virNewModels', 'vnaTourism', 'iposH12026'),
  }),
  c3Chapter({
    title: 'Digital Ordering, Delivery Platforms, and Direct Channels', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare third-party delivery platforms with brand-owned digital channels on reach, cost and customer relationship.',
    mateIntro: 'A customer can order your drink through a platform app or through your own. The two look similar on a phone, but they work very differently for the business.',
    keyInsight: 'Third-party platforms rent reach at the price of commission and customer ownership, while brand-owned apps build a lasting customer asset at the cost of development and marketing. Most chains need both, using platforms for reach and direct channels to keep the relationship.',
    statTiles: [
      { value: '6', label: 'Comparison dimensions', subtitle: 'Reach to setup effort', description: 'Reach, cost per order, customer data, loyalty, brand control and setup effort.' },
      { value: 'US$2.1B', label: 'Vietnam online food delivery value in 2025', subtitle: 'Momentum Works, up 19%', description: 'Completed app orders only, across all food, not just coffee.' },
      { value: '20–30%', label: 'Typical commission on a delivery order', subtitle: 'Tuoi Tre, excluding advertising', description: 'A cost that leaves the operator on each sale.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Delivery value covers all food and drink on apps, not coffee alone, and commissions are reported by restaurants, not a fixed rate.',
    narrative: [
      { label: 'What it is', text: 'Digital ordering lets customers buy through a delivery app, a brand app, a messaging service or a website. Third-party platforms list many brands and handle discovery, payment and delivery, while direct channels are owned by the brand and give it the customer data.' },
      { label: 'Why it is happening', text: 'Platforms bring users quickly but charge commission and hold the data. Brand apps take longer to build but let a chain keep a customer, offer rewards and avoid commission on repeat orders. Operators pay for convenience in one channel and invest for ownership in the other.' },
      { label: 'Real-world example', text: 'A chain joins two delivery apps to reach new users, then offers a discount through its own app to move regulars to a channel where it keeps the whole sale and the customer’s details.' },
      { label: 'Vietnam example', text: 'Vietnamese consumers spent US$2.1 billion on online food delivery in 2025, up 19%, with ShopeeFood and GrabFood at 48% each and beFood at 4%. Restaurants complained of commissions of 20–30% per order excluding advertising, and Baemin, Gojek and Loship exited while Xanh SM Ngon entered in June 2025. Highlands launched its HighlandsĐI member app on 19 December 2025 with pre-order and prepaid top-up, and The Coffee House’s vendor case study describes about 100,000 app downloads after two years. Vendor-reported results should be read with caution.' },
      { label: 'Business impact', text: 'The channel mix shapes margin, data and bargaining power. Heavy reliance on platforms exposes an operator to commission changes, while direct channels cost money to build and may take years to reach scale.' },
    ],
    visualKind: 'coffee-m3-52-digital', visualHeading: 'Platform versus brand-owned channel',
    visualIntro: 'Compare a third-party platform with a brand-owned channel across five dimensions.',
    imageAlt: 'Casemate comparison of third-party delivery platforms and brand-owned digital channels',
    keyTerms: [
      { term: 'Delivery platform', definition: 'An app that lists restaurants and handles ordering, payment and courier delivery.' },
      { term: 'Direct channel', definition: 'A sales channel owned and operated by the brand itself.' },
      { term: 'Duopoly', definition: 'A market where two companies hold most of the share.' },
      { term: 'Customer data', definition: 'Information on who buys what and when, held by the channel owner.' },
    ],
    recap: [
      'Platforms rent reach at the cost of commission and customer ownership.',
      'Brand-owned channels build a customer asset but take time and money.',
      'Two platforms hold 96% of Vietnam delivery value.',
      'Most chains need both channels.',
    ],
    chapterRecap: 'The channel decision is about who owns the customer. Use platforms to reach and direct channels to keep, and judge each on net margin and data, not on sales alone.',
    deepDiveTitle: 'Why a platform duopoly changes the negotiation',
    body: <C3DeepDive paragraphs={[
      'When two platforms hold 96% of delivery value, an operator that leaves one loses access to a large part of delivery demand. Bargaining power sits with the platforms, and commissions are hard to negotiate.',
      'Exits and entries can change this, as with the June 2025 entry of Xanh SM Ngon, but operators still invest in their own channels to reduce reliance.' ]} evidence="Delivery shares and values are from Momentum Works reported by VnExpress International and VCCI; commissions are from Tuoi Tre; the HighlandsĐI launch is a company announcement; the Zalo and The Coffee House results are vendor-reported case studies. The bargaining-power reasoning is our own." />,
    sources: citeC3('vnexpressDelivery', 'vcciDelivery', 'tuoitreDelivery', 'highlandsApp', 'coffeeHouseApp'),
  }),
  c3Chapter({
    title: 'Omnichannel Integration and Fulfillment Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain what must be integrated for stores, apps and delivery to work as one system and where fulfilment strains.',
    mateIntro: 'Adding channels is easy. Making them work together without slowing the line is the hard part.',
    keyInsight: 'Omnichannel growth adds value only when one operation can fulfil in-store, pre-order and delivery orders without hurting service. Integration of orders, stock, loyalty and data decides whether extra channels add profitable demand or simply shift sales and add congestion.',
    statTiles: [
      { value: '6', label: 'Integration links', subtitle: 'Pre-order to fulfilment timing', description: 'Pre-order and pick-up, delivery integration, unified loyalty, data capture, stock and menu sync, and fulfilment timing.' },
      { value: '19 Dec 2025', label: 'HighlandsĐI replaced Highlands Rewards', subtitle: 'Company announcement', description: 'Adds pre-order and prepaid top-up to the loyalty tiers.' },
      { value: '2M+', label: 'Users drawn by a 40-day Highlands Zalo Mini App campaign', subtitle: 'Vendor case study, March 2025', description: 'A vendor-reported result.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Zalo figures are a vendor case study, and no public Vietnam data on how delivery orders congest café production was found.',
    narrative: [
      { label: 'What it is', text: 'Omnichannel integration connects store, app, delivery and messaging channels so that orders, stock, loyalty and customer data are managed together. Fulfilment management decides how orders from each channel are prepared, timed and handed over.' },
      { label: 'Why it is happening', text: 'A single bar and a single team prepare orders from every channel. If delivery tickets arrive in a rush, in-store customers wait longer; if stock is not synchronised, apps show items that cannot be made. Integration therefore protects both service and margin.' },
      { label: 'Real-world example', text: 'A chain lets customers pre-order and pay in its app, schedules pick-up times to spread the load, sends delivery orders to the same preparation queue, and counts points for all of them in one account.' },
      { label: 'Vietnam example', text: 'Highlands introduced HighlandsĐI on 19 December 2025 with pre-order and prepaid top-up features and tiers based on 12-month spend. A Zalo Mini App campaign reported by the vendor drew over 2 million app users in 40 days, identified 56.9% and gained 347,000 Zalo follows. Masan, which bought Phúc Long in 2022, says it plans to integrate the chain’s loyalty programme with the group’s retail ecosystem. From June 2025 Decree 70/2025/ND-CP also extended point-of-sale e-invoices to qualifying restaurants, a further record that must reconcile across channels, although a secondary source reports its replacement from 1 July 2026. No public Vietnam data on delivery congestion in cafés was found.' },
      { label: 'Business impact', text: 'Integrated channels lower friction for customers and give operators data to plan staff, stock and promotions. Poorly integrated channels raise complaints, waste and cost without raising profit.' },
    ],
    visualKind: 'coffee-m3-53-omni', visualHeading: 'Six links in an omnichannel order',
    visualIntro: 'See the six links that must work together and what each protects.',
    imageAlt: 'Casemate map of six integration links for omnichannel coffeehouse fulfilment',
    keyTerms: [
      { term: 'Omnichannel', definition: 'Selling through several channels managed as one connected system.' },
      { term: 'Fulfilment', definition: 'Preparing and handing over an order to the customer or courier.' },
      { term: 'Pre-order', definition: 'An order placed and often paid in advance for collection.' },
      { term: 'Stock sync', definition: 'Updating online menus so items show only when they can be made.' },
    ],
    recap: [
      'One bar and one team serve every channel.',
      'Integration of orders, stock, loyalty and data protects service.',
      'Pre-order and prepaid top-up can ease queues and capture data.',
      'Congestion evidence for Vietnam cafés was not found.',
    ],
    chapterRecap: 'Omnichannel works when channels share one operation. Extra demand is valuable only if orders can be prepared on time without hurting in-store service.',
    deepDiveTitle: 'Why delivery can help or hurt the same store',
    body: <C3DeepDive paragraphs={[
      'Delivery adds sales in quiet hours when staff would otherwise be idle. At the lunch rush, the same orders compete with walk-in customers for the same bar and can slow everyone.',
      'Operators handle this by pausing delivery at peaks, using separate prep stations or scheduling orders. The right answer depends on the layout and the daypart.' ]} evidence="HighlandsĐI details are from the company announcement; Zalo results are from a vendor case study; the Masan plan is from a Masan Group interview; e-invoice details are from the government portal and a secondary accounting-software source; the delivery congestion reasoning is our own illustration, as no Vietnam data was found." />,
    sources: citeC3('highlandsApp', 'highlandsZalo', 'masanPhucLong', 'decree70', 'decree70Review'),
  }),
];

const quiz = c3Quiz('coffee-m3-l5', [
  { chapter: '1', objective: 'State the distribution form', question: 'What is the main form of distribution for a coffeehouse?', application: 'A brand wants to reach more customers. What is its main lever?', correct: 'Location, through physical stores', wrong: ['Shipping beans only', 'Wholesale only', 'Television only'], explanation: 'The store is factory and shop. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the store count', question: 'How many stores did Highlands have in Vietnam at the end of 2025?', application: 'An analyst sizes the largest chain. What is the count?', correct: '985', wrong: ['94', '150', '2,000'], explanation: 'It is tied to a date and source. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain a network risk', question: 'What is a risk of a dense store network?', application: 'Two stores of one brand sit near each other. What may happen?', correct: 'Cannibalisation of sales between nearby stores', wrong: ['Unlimited sales growth', 'No rent', 'No staff needed'], explanation: 'Density has a cost. Review Chapter 1.' },
  { chapter: '2', objective: 'Recall delivery value', question: 'How much did Vietnamese consumers spend on online food delivery in 2025?', application: 'A founder sizes delivery. What is the figure?', correct: 'US$2.1 billion', wrong: ['US$21 million', 'US$210 billion', 'US$2.1 trillion'], explanation: 'It covers all food, not coffee alone. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall platform shares', question: 'What shares did ShopeeFood and GrabFood hold of Vietnam delivery in 2025?', application: 'An owner negotiates with platforms. What is the structure?', correct: '48% each', wrong: ['5% each', '90% and 10%', '1% and 99%'], explanation: 'Together they hold 96%. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare channels', question: 'What does a brand-owned app offer that a platform generally does not?', application: 'A chain wants to know its repeat customers. Which channel helps?', correct: 'Direct customer data and no per-order commission', wrong: ['Larger existing user base', 'Instant reach', 'Courier network'], explanation: 'Direct channels build an asset. Review Chapter 2.' },
  { chapter: '2', objective: 'Judge a source', question: 'What type of source is the Coffee House app download figure?', application: 'A slide cites 100,000 downloads. What caution applies?', correct: 'A vendor-reported case study', wrong: ['An audited filing', 'A court record', 'A census'], explanation: 'Vendor results may flatter. Review Chapter 2.' },
  { chapter: '3', objective: 'State when omnichannel adds value', question: 'When does omnichannel growth add value?', application: 'A chain adds delivery. What condition must hold?', correct: 'When one operation can fulfil all channels without hurting service', wrong: ['When every channel has its own kitchen', 'When prices are cut on every channel', 'When data is ignored'], explanation: 'Integration decides the outcome. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the launch date', question: 'When did HighlandsĐI replace Highlands Rewards?', application: 'A member asks when the app began. What date applies?', correct: '19 December 2025', wrong: ['1 January 2015', '30 June 2020', '4 July 2030'], explanation: 'Check the company announcement. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on delivery congestion in Vietnamese cafés?', application: 'A report claims a delay figure. Is there a public source?', correct: 'No public Vietnam data was found', wrong: ['Delays average 5 minutes', 'Delivery never causes delays', 'A law limits delivery orders'], explanation: 'Evidence gaps are stated. Review Chapter 3.' },
]);

export const LESSON_C3_5: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how coffeehouses reach customers through stores, delivery platforms, direct channels and integrated fulfilment.',
    keyTakeaways: [
      'The store is both factory and shop, so location is distribution.',
      'Highlands reached 985 stores by end-2025; store counts are tied to dates and sources.',
      'Platforms rent reach at the price of commission and customer data; two platforms hold 96% of delivery.',
      'Brand-owned channels build a customer asset but take time to scale.',
      'Omnichannel adds value only when one operation can fulfil every channel.',
    ],
    businessImplications: 'Choose sites by traffic and rent, use platforms for reach and direct channels to keep customers, and integrate fulfilment before adding channels.',
    remember: 'Reach is rented on a platform and owned in your own channel.',
    nextLesson: 'Industry Ecosystem & Stakeholders',
  },
};
