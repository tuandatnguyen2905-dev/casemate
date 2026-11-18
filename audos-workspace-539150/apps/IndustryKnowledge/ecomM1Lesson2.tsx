import { EcomDeepDive, citeEcom, ecomChapter, ecomQuiz } from './ecomM1Core';
import type { EcomM1LessonBundle } from './ecomM1Core';

const LESSON = 'Industry History & Development';

const deck = [
  ecomChapter({
    title: 'Early E-Commerce and the Development of Online Retail', chapterTitle: LESSON, readingTime: '6',
    objective: 'Trace the capabilities early online retail had to build, and explain why they remain the foundation of the industry today.',
    mateIntro: 'The first online shops were catalogues with an order form attached. Everything that made them into real retail — payment that felt safe, search that found things, parcels that arrived — had to be built afterwards.',
    keyInsight: 'The early evolution of e-commerce established the foundations of digital retail: accessible product information, convenient transactions, secure payments, and reliable fulfilment. These capabilities remain essential even as the industry adopts newer technologies.',
    statTiles: [
      { value: '5', label: 'Foundations built', subtitle: 'Storefront to customer database', description: 'Digital storefronts, secure payment, search, logistics and customer records.' },
      { value: 'Standardised', label: 'The first categories to work', subtitle: 'Books, electronics, travel bookings', description: 'Products a buyer could judge without handling them moved online first.' },
      { value: 'Still', label: 'Required today', description: 'Newer technology sits on top of these foundations; it does not replace them.' },
    ],
    statsNote: 'The tiles summarise the foundations described in this lesson. The brief supplies no dated milestones or adoption percentages for the early period, so none are given.',
    narrative: [
      { label: 'What it is', text: 'The early development of e-commerce was closely linked to the expansion of the internet, web browsers, digital payment systems and online retail infrastructure. Businesses initially used digital channels to publish product information and accept orders, gradually developing more sophisticated online shopping experiences.' },
      { label: 'Why it is happening', text: 'As internet access expanded, online retail moved from a relatively specialised channel toward a mainstream distribution model. Companies invested in searchable product catalogues, digital storefronts, secure checkout, customer databases and delivery networks, because each missing capability was a reason a shopper would abandon the purchase.' },
      { label: 'Real-world example', text: 'Secure payment systems made remote transactions easier and increased consumer confidence; search engines and catalogue tools helped consumers locate products across growing online inventories; and warehousing, parcel delivery and shipment tracking supported order fulfilment. Merchants used transaction records and customer profiles to support service, retention and targeted promotion.' },
      { label: 'Vietnam example', text: 'Vietnam’s later development took place with smartphones, digital payment options, logistics networks and marketplace infrastructure already available. These capabilities supported the mobile, marketplace and social-commerce patterns examined in Lesson 4.' },
      { label: 'Business impact', text: 'Categories such as books, electronics and travel bookings helped establish early consumer adoption because they were standardised enough to judge from a description. Improvements in logistics and payment then widened the range of products for which buying unseen became reasonable, which is still how new categories move online today.' },
    ],
    visualKind: 'ecom-m1-21-early', visualHeading: 'What early e-commerce had to build first',
    visualIntro: 'Follow the five capabilities in the order they had to arrive, and what each one delivered.',
    imageAlt: 'Casemate timeline-branch mind map of the foundations of early online retail',
    keyTerms: [
      { term: 'Digital storefront', definition: 'A website presenting products, prices, descriptions and an ordering path.' },
      { term: 'Secure checkout', definition: 'A payment process protecting card and account details, which is what made remote purchase acceptable.' },
      { term: 'Shipment tracking', definition: 'Visibility of a parcel between dispatch and delivery, which reduces the buyer’s uncertainty after paying.' },
      { term: 'Customer database', definition: 'Stored transaction records and profiles used for service, retention and targeted promotion.' },
    ],
    recap: [
      'Early sites published product information and accepted orders.',
      'Secure payment raised consumer confidence in remote transactions.',
      'Search, warehousing, delivery and tracking made fulfilment practical.',
      'Standardised categories such as books and travel moved online first.',
    ],
    chapterRecap: 'Early e-commerce grew through improvements in internet access, digital storefronts, payments and fulfilment. These foundations enabled online commerce to expand into a broader and more sophisticated commercial ecosystem.',
    deepDiveTitle: 'Why some categories moved online long before others',
    body: <EcomDeepDive paragraphs={[
      'A book is the same book wherever it is bought, so a title and a price tell a buyer everything they need. A flight has a fixed departure time and seat. These were the categories that moved online first, not because the sellers were braver but because the information gap between the screen and the product was almost zero.',
      'Categories where touch, fit or freshness matter followed much later, and only once returns, photography, sizing data and delivery speed had closed enough of that gap. The pattern still holds: when a new category starts moving online, look for the capability that recently made judging it from a screen reasonable.',
    ]} evidence="The foundations and the early categories are from the supplied brief, which does not date them or quantify adoption. The information-gap explanation for category sequencing is our own." />,
    sources: citeEcom('unctadDigitalEconomy', 'wtoEcommerce'),
  }),
  ecomChapter({
    title: 'The Rise of Digital Marketplaces and Platform Economies', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how network effects turned marketplaces into platform ecosystems and what that made important competitively.',
    mateIntro: 'Once one platform held the buyers, the question for a merchant stopped being how do I get customers and became how much of my margin do I hand over to reach them.',
    keyInsight: 'Marketplaces changed the structure of online retail by turning customer traffic, seller participation, transaction data, and platform services into strategic assets. Their growth also increased the importance of platform governance, commission structures, and the balance of power between operators and merchants.',
    statTiles: [
      { value: '2-sided', label: 'The network effect', subtitle: 'Buyers attract sellers, sellers attract buyers', description: 'Each side makes the platform more valuable to the other.' },
      { value: '5', label: 'Monetisation routes', subtitle: 'Commission to fulfilment fees', description: 'Commissions, advertising, seller subscriptions, fulfilment fees and other services.' },
      { value: 'Governance', label: 'The new competitive question', description: 'Who sets the rules, and how value is split between operator and merchant.' },
    ],
    statsNote: 'The tiles describe the platform mechanics set out in this lesson. No commission rates, seller counts or platform shares are supplied in the brief, so none are quoted.',
    narrative: [
      { label: 'What it is', text: 'As online commerce matured, marketplaces became increasingly important by allowing many sellers to reach customers through a shared platform. Instead of each merchant building an independent online store and acquiring customers separately, marketplace operators offered centralised product discovery, transaction tools and customer traffic.' },
      { label: 'Why it is happening', text: 'This model created network effects: more sellers increased product variety, while more buyers made the platform more attractive to sellers. Growth on one side therefore pulled the other side along, which is a very different dynamic from a single store whose growth tracks its own marketing spend.' },
      { label: 'Real-world example', text: 'Marketplaces developed complementary services such as seller advertising, fulfilment, payment processing, consumer protection and analytics. Operators earn commissions, advertising fees, seller subscriptions, fulfilment fees and other service income, so a platform’s revenue can grow faster than the goods moving across it.' },
      { label: 'Vietnam example', text: 'Vietnamese merchants feel the consequence directly. A household seller can reach a national audience within days of listing, which would be impossible independently, but the same seller then competes on a ranked page against near-identical offers and pays commission plus advertising to stay visible. Reach arrives immediately; margin has to be defended continuously.' },
      { label: 'Business impact', text: 'Competition shifted from individual online stores toward platforms seeking scale, trust and engagement. Ratings, reviews, seller histories and dispute processes let buyers assess transaction risk, and operators compete through assortment, pricing, convenience, delivery performance and trust rather than on the shopping interface alone.' },
    ],
    visualKind: 'ecom-m1-22-marketplaces', visualHeading: 'Independent store economics against platform economics',
    visualIntro: 'Compare how each model gets customers, grows and decides what has to be managed.',
    imageAlt: 'Casemate layered mind map comparing independent online store and marketplace platform models',
    keyTerms: [
      { term: 'Network effect', definition: 'A product becoming more valuable to each user as more users join; in marketplaces it runs between buyers and sellers.' },
      { term: 'Platform governance', definition: 'The rules an operator sets on ranking, fees, returns and seller conduct, which decide how value splits between the sides.' },
      { term: 'Seller advertising', definition: 'Paid placement merchants buy to be seen on a platform, and a major revenue line for operators.' },
      { term: 'Reputation system', definition: 'Ratings, reviews, seller history and dispute records that let a buyer judge an unfamiliar seller.' },
    ],
    recap: [
      'Marketplaces gave merchants centralised discovery, tools and traffic.',
      'Network effects made each side more valuable to the other.',
      'Operators monetise through commission, advertising, subscriptions and fulfilment.',
      'Governance and commission structure decide the operator–merchant balance.',
    ],
    chapterRecap: 'Digital marketplaces transformed e-commerce from a collection of individual online stores into interconnected platform ecosystems. Network effects and platform services became major sources of competitive advantage, while governance and merchant relationships became increasingly important.',
    deepDiveTitle: 'What a merchant actually buys from a platform',
    body: <EcomDeepDive paragraphs={[
      'A merchant joining a marketplace is buying access to demand it could not reach alone, and paying for it in commission, advertising and a degree of control. That trade is often worth making, particularly early, because building an audience independently is slow and expensive.',
      'What changes over time is the price of staying. As more sellers crowd the same ranked page, visibility costs more, and the platform — which sees every transaction — knows exactly how much margin each category can bear. A merchant with no channel of its own has no alternative to accept, which is why experienced sellers treat marketplace reach and direct customer relationships as two investments rather than one choice.',
    ]} evidence="Network effects, monetisation routes and the governance point are from the supplied brief, which gives no commission rates or platform shares. The analysis of a merchant\u2019s bargaining position over time is our own." />,
    sources: citeEcom('econSea', 'unctadDigitalEconomy'),
  }),
  ecomChapter({
    title: 'Mobile Commerce, Social Commerce and Omnichannel Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how mobile and social channels changed discovery and purchase, and what omnichannel integration requires.',
    mateIntro: 'Nobody sets out to go shopping on a video app. They are watching something, a product appears, and three taps later it is bought. That is a different kind of demand from a search box.',
    keyInsight: 'E-commerce has evolved from a primarily search-and-purchase activity into an experience shaped by mobile convenience, content, social influence, and integrated shopping journeys. The distinction between marketing, entertainment, and commerce is becoming less clear.',
    statTiles: [
      { value: '6', label: 'Shifts in this chapter', subtitle: 'Mobile to personalisation', description: 'Mobile commerce, social commerce, influencer discovery, omnichannel, digital payments and personalisation.' },
      { value: 'Unplanned', label: 'How social demand starts', description: 'Discovery happens inside entertainment rather than at the start of a shopping task.' },
      { value: 'One journey', label: 'What omnichannel must deliver', description: 'Online stores, physical locations, apps, inventory and service integrated into a single experience.' },
    ],
    statsNote: 'The tiles describe the framework used in this lesson. The brief supplies no measured mobile, social or omnichannel shares, so none are stated here.',
    narrative: [
      { label: 'What it is', text: 'The spread of smartphones and mobile applications made shopping more accessible and more frequent. Mobile commerce enabled consumers to search for products, compare prices, complete transactions and track orders from a single device, while digital wallets and improved mobile checkout further reduced transaction friction.' },
      { label: 'Why it is happening', text: 'Social media then became an important channel for product discovery and purchase. Influencers, short-form videos, livestreams and community recommendations connected entertainment and shopping, so demand increasingly begins without the customer intending to shop at all.' },
      { label: 'Real-world example', text: 'Creators and brands showcase products through social content, livestreams and in-app shopping features, while consumers discover products through recommendations, demonstrations, reviews and community content. Recommendation systems and customer data then tailor product discovery, offers and communication.' },
      { label: 'Vietnam example', text: 'In Vietnam, livestream selling and creator recommendation sit alongside conventional marketplace search, while e-wallets, QR payments and bank transfers support checkout. Lesson 4 examines what that channel mix means for how Vietnamese sellers choose where to sell.' },
      { label: 'Business impact', text: 'Established retailers responded with omnichannel strategies integrating online stores, physical locations, mobile apps, inventory systems and customer service, so customers can research online, purchase through different channels and use store pickup or cross-channel returns. Competition now depends on connecting discovery, purchase, fulfilment and engagement into one consistent experience.' },
    ],
    visualKind: 'ecom-m1-23-mobile', visualHeading: 'Six shifts that moved shopping beyond the search box',
    visualIntro: 'Read each shift alongside the part of the customer journey it changes.',
    imageAlt: 'Casemate flow-branch mind map of mobile, social, influencer, omnichannel, payment and personalisation shifts',
    keyTerms: [
      { term: 'Mobile commerce', definition: 'Discovery, comparison, purchase and order tracking carried out on a mobile device.' },
      { term: 'Social commerce', definition: 'Selling inside social platforms, where content, creator recommendation and checkout sit together.' },
      { term: 'Livestream selling', definition: 'Selling through a live broadcast in which products are demonstrated and bought in the same session.' },
      { term: 'Omnichannel retail', definition: 'Integrating stores, websites, apps, inventory and service so the customer experiences one journey.' },
    ],
    recap: [
      'Mobile made shopping more accessible and more frequent.',
      'Social platforms turned entertainment into a discovery channel.',
      'Digital wallets and improved checkout cut transaction friction.',
      'Omnichannel integrates stores, apps, inventory and service into one journey.',
    ],
    chapterRecap: 'Mobile, social and omnichannel models expanded e-commerce beyond traditional websites and marketplace search. Competition increasingly depends on the ability to connect product discovery, purchasing, fulfilment and customer engagement into a consistent experience.',
    deepDiveTitle: 'Demand that nobody went looking for',
    body: <EcomDeepDive paragraphs={[
      'Search-led commerce serves demand that already exists: somebody wants a kettle and types kettle. Content-led commerce creates demand that did not exist a minute earlier, which changes what a seller must be good at. In search, the winning skills are listing quality, price and availability. In content, they are the demonstration, the creator relationship and being able to fulfil a sudden spike.',
      'The operational consequence is usually underestimated. A livestream can sell a month of stock in an hour, and the same session generates returns and questions at a rate a small merchant has never handled. Treating social commerce as a marketing experiment rather than a distribution channel is how sellers end up with sales they cannot service.',
    ]} evidence="The six shifts, the convergence of entertainment and commerce, and the omnichannel description are from the supplied brief, which gives no channel-share figures. The contrast between search-led and content-led demand, and its operational consequence, is our own." />,
    sources: citeEcom('econSea', 'vietnamBriefing'),
  }),
];

const quiz = ecomQuiz('ecom-m1-l2', [
  { chapter: '1', objective: 'Identify the early foundations', question: 'Which foundations did early e-commerce establish?', application: 'A new market launches online retail. Which capabilities must exist?', correct: 'Accessible product information, convenient transactions, secure payments and reliable fulfilment', wrong: ['Only social media advertising', 'Only livestream selling tools', 'Only artificial intelligence recommendations'], explanation: 'These foundations remain essential even as newer technologies arrive. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain early category adoption', question: 'Which categories helped establish early consumer adoption?', application: 'A history claims fresh groceries led online adoption. What is the correction?', correct: 'Standardised offerings such as books, electronics and travel bookings', wrong: ['Fresh food and perishable goods', 'Bespoke tailoring and made-to-measure items', 'Heavy industrial machinery'], explanation: 'Standardised categories were judged easily from a description and moved online first. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall what payment enabled', question: 'What did secure online payment systems achieve?', application: 'Shoppers abandon checkout over security concerns. Which development addressed this?', correct: 'They made remote transactions easier and increased consumer confidence', wrong: ['They removed the need for delivery', 'They eliminated product returns', 'They replaced customer service teams'], explanation: 'Secure payment made remote purchase acceptable to a wider group of buyers. Review Chapter 1.' },
  { chapter: '2', objective: 'Explain the marketplace shift', question: 'What did marketplace operators offer merchants?', application: 'A small seller cannot afford to acquire customers alone. What does a marketplace supply?', correct: 'Centralised product discovery, transaction tools and customer traffic', wrong: ['Guaranteed profit margins', 'Free nationwide advertising forever', 'Exclusive rights to a product category'], explanation: 'Marketplaces let many sellers reach customers through a shared platform. Review Chapter 2.' },
  { chapter: '2', objective: 'Define the network effect', question: 'How does the marketplace network effect work?', application: 'A platform adds thousands of sellers and buyer numbers rise too. What is happening?', correct: 'More sellers increase variety, and more buyers make the platform more attractive to sellers', wrong: ['More sellers automatically reduce buyer numbers', 'Buyer growth has no effect on seller participation', 'Platforms grow only through advertising spend'], explanation: 'Each side makes the platform more valuable to the other. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify platform monetisation', question: 'How do marketplace operators earn money?', application: 'An operator wants revenue beyond commission. What else is available?', correct: 'Commissions, advertising fees, seller subscriptions, fulfilment fees and other service income', wrong: ['Only a fixed annual membership fee', 'Only interest on held balances', 'Only the sale of their own inventory'], explanation: 'Operators monetise through several routes at once. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain reputation systems', question: 'What do ratings, reviews and seller histories allow buyers to do?', application: 'A buyer faces an unfamiliar seller. What helps them decide?', correct: 'Assess transaction risk before purchasing', wrong: ['Negotiate the commission rate', 'Access the platform’s financial accounts', 'Set the delivery schedule themselves'], explanation: 'Reputation systems help buyers judge the risk of an unfamiliar seller. Review Chapter 2.' },
  { chapter: '3', objective: 'Describe the evolution of shopping', question: 'How has e-commerce evolved according to this lesson?', application: 'A strategy assumes all demand starts with a search. What is it missing?', correct: 'From search-and-purchase into an experience shaped by mobile convenience, content and social influence', wrong: ['From mobile back to desktop browsing', 'From marketplaces back to independent stores', 'From digital payment back to cash on delivery'], explanation: 'Marketing, entertainment and commerce are becoming less distinct. Review Chapter 3.' },
  { chapter: '3', objective: 'Identify social commerce mechanics', question: 'How do creators and brands sell through social commerce?', application: 'A brand wants to reach buyers inside a social platform. Which formats apply?', correct: 'Social content, livestreams and in-app shopping features', wrong: ['Printed catalogues and direct mail', 'Trade exhibitions and wholesale fairs', 'Billboard and radio advertising only'], explanation: 'Creators and brands showcase products through content, livestreams and in-app shopping. Review Chapter 3.' },
  { chapter: '3', objective: 'Define omnichannel integration', question: 'What do omnichannel strategies integrate?', application: 'A retailer runs its app and stores as separate businesses. What does omnichannel require?', correct: 'Online stores, physical locations, mobile apps, inventory systems and customer service', wrong: ['Only the website and the mobile app', 'Only the warehouse and the delivery fleet', 'Only advertising across several media'], explanation: 'Omnichannel integrates channels, inventory and service into one journey. Review Chapter 3.' },
]);

export const LESSON_ECOM_2: EcomM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can trace e-commerce from early online retail through the rise of platform marketplaces to mobile, social and omnichannel commerce.',
    keyTakeaways: [
      'Information, payment, search, fulfilment and customer records are still the foundations.',
      'Standardised categories moved online first because they were easy to judge from a screen.',
      'Network effects turned traffic, sellers, data and services into strategic assets.',
      'Governance and commission structure decide how value splits with merchants.',
      'Content-led discovery creates demand that search-led commerce never sees.',
    ],
    businessImplications: 'Treat marketplace reach and a direct customer relationship as two separate investments: reach arrives quickly and its price rises, while a channel you own is slow to build and cheap to keep.',
    remember: 'Each era added a new way to create demand without removing the duty to deliver it.',
    nextLesson: 'Global Market Overview',
  },
};
