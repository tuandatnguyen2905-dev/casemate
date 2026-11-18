import { EcomDeepDive, citeEcom, ecomChapter, ecomQuiz } from './ecomM1Core';
import type { EcomM1LessonBundle } from './ecomM1Core';

const LESSON = 'Industry Definition & Scope';

const deck = [
  ecomChapter({
    title: 'Definition and Core Characteristics of E-Commerce', chapterTitle: LESSON, readingTime: '6',
    objective: 'Define e-commerce, separate it from online retail alone, and identify the systems that have to work together for a transaction to complete.',
    mateIntro: 'People picture a website. The website is the easy part. What decides whether this business works is everything behind it — the payment that clears, the parcel that arrives and the seller the buyer was right to trust.',
    keyInsight: 'E-commerce is an integrated commercial system rather than simply a website or online store. Its competitiveness depends on the coordination of customer experience, technology, payments, logistics, merchant operations, and trust.',
    statTiles: [
      { value: '6', label: 'Core activity groups', subtitle: 'Online retail to data-driven commerce', description: 'Online retail, B2B commerce, direct-to-consumer, digital products, transaction infrastructure and data.' },
      { value: '4', label: 'Transaction models in scope', subtitle: 'B2C, B2B, C2C and D2C', description: 'E-commerce is broader than consumer online retail on its own.' },
      { value: 'System', label: 'Not a storefront', description: 'Experience, technology, payments, logistics, merchant operations and trust all have to work at once.' },
    ],
    statsNote: 'All three tiles are counts and framing taken from this lesson, not measured market data. The global and Vietnam market figures appear in Lessons 3 and 4.',
    narrative: [
      { label: 'What it is', text: 'E-commerce, or electronic commerce, refers to the buying and selling of goods and services through electronic networks, primarily websites, mobile applications and digital platforms. It encompasses the commercial activities that support online transactions, including product discovery, digital marketing, ordering, payment, fulfilment, customer service and post-purchase support.' },
      { label: 'Why it is happening', text: 'E-commerce is broader than online retail alone. It includes business-to-consumer (B2C) transactions, business-to-business (B2B) commerce, consumer-to-consumer (C2C) transactions and direct-to-consumer (D2C) models. Transactions may involve physical goods, digital products, subscriptions or services, so a single definition of the market will always exclude something another analyst counts.' },
      { label: 'Real-world example', text: 'Consumers purchase fashion, electronics, beauty products and household goods through digital channels; businesses buy equipment, materials and office supplies through online procurement platforms; and brands sell directly through their own websites, apps and social commerce channels. Alongside the physical goods sit subscriptions, online courses, software and digital content that never enter a warehouse at all.' },
      { label: 'Vietnam example', text: 'In Vietnam the same definition has to stretch across a formal marketplace order, a livestream purchase from a household seller and a subscription paid by card, because all three are e-commerce and all three are counted differently by different publishers. That is why the Vietnam chapters in Lesson 4 attach a source and a definition to every figure rather than quoting a single market size.' },
      { label: 'Business impact', text: 'The industry connects digital interfaces with physical or digital delivery systems. Platforms must support listings, search, ordering, payment processing, delivery coordination, returns and customer support, and then use behaviour, transaction history and product performance data to improve merchandising, marketing and operations. A weakness in any one of those links is felt by the customer as a single failure.' },
    ],
    visualKind: 'ecom-m1-11-definition', visualHeading: 'Six activities that make up e-commerce',
    visualIntro: 'See the six activity groups around the system they belong to, and what each one supplies.',
    imageAlt: 'Casemate orbit map of the six core activities of e-commerce',
    keyTerms: [
      { term: 'B2C and B2B', definition: 'Business-to-consumer and business-to-business transactions; both are e-commerce but they differ in order size, approval process and payment terms.' },
      { term: 'C2C', definition: 'Consumer-to-consumer trade, where a platform intermediates a sale between two individuals.' },
      { term: 'D2C', definition: 'Direct-to-consumer, where a brand sells through its own channels instead of through a retailer or marketplace.' },
      { term: 'Digitally delivered product', definition: 'A subscription, course, software licence or piece of content fulfilled electronically rather than shipped.' },
    ],
    recap: [
      'E-commerce covers the whole transaction process, not just the ordering screen.',
      'It spans B2C, B2B, C2C and D2C, and physical, digital and service products.',
      'Platforms must coordinate discovery, payment, fulfilment, returns and support.',
      'Transaction and behaviour data is an operating input, not just reporting.',
    ],
    chapterRecap: 'E-commerce includes the digital transaction process and the supporting systems that enable online trade. Its scope spans multiple business models, product categories, customer groups and technology-enabled services.',
    deepDiveTitle: 'Why the storefront is the cheapest part',
    body: <EcomDeepDive paragraphs={[
      'Building a website that can take an order has become close to a commodity: templates, checkout tools and payment gateways are available to anyone. What is not commoditised is everything the order then depends on — accurate stock, a payment that clears, a parcel that arrives when promised and a seller the buyer was right to trust.',
      'That is why this industry is analysed as a system. A platform with excellent search and a weak delivery network loses customers after the first order; one with reliable logistics and poor fraud control loses the sellers whose goods get copied. The weakest link sets the ceiling, and it is rarely the interface.',
    ]} evidence="The definition, the four transaction models and the six activity groups are from the supplied brief, which describes them qualitatively and gives no measured figures at this point. The weakest-link argument is our own." />,
    sources: citeEcom('unctadDigitalEconomy', 'unctadMeasuring'),
  }),
  ecomChapter({
    title: 'Definition and Scope of Digital Marketplaces', chapterTitle: LESSON, readingTime: '7',
    objective: 'Distinguish a marketplace from an online store and explain what a platform must manage once it hosts independent sellers.',
    mateIntro: 'An online store worries about its own stock. A marketplace worries about other people’s — their listings, their service and their honesty — while the customer blames the platform for all of it.',
    keyInsight: 'The defining feature of a marketplace is its ability to coordinate transactions between multiple independent participants. Its value increases when it attracts both buyers and sellers, maintains transaction trust, and reduces the friction involved in discovering, purchasing, and delivering products.',
    statTiles: [
      { value: '3', label: 'Marketplace types', subtitle: 'General, social, specialised', description: 'From broad multi-category platforms to narrow category or industry platforms.' },
      { value: '7', label: 'Functions beyond matching', description: 'Payments, logistics, advertising, seller verification, reviews, dispute resolution and financing.' },
      { value: '2', label: 'Sides to keep balanced', subtitle: 'Buyers and sellers', description: 'Value rises only when both grow together; either side alone stalls the platform.' },
    ],
    statsNote: 'The tiles count the marketplace types and functions described in this lesson. They are structural counts, not measured platform statistics.',
    narrative: [
      { label: 'What it is', text: 'A digital marketplace is an online platform that connects multiple sellers with potential buyers and facilitates transactions between them. Unlike a traditional online store that primarily sells its own inventory, a marketplace typically enables third-party merchants to list products or services, manage offers and reach customers through a shared digital environment.' },
      { label: 'Why it is happening', text: 'Marketplaces may operate as general-purpose platforms serving many product categories or as specialised platforms focusing on a particular industry, product type or customer group. Their functions extend well beyond matching buyers and sellers to include payments, logistics, advertising, seller verification, customer reviews, dispute resolution and financing services.' },
      { label: 'Real-world example', text: 'General marketplaces such as Amazon and Shopee serve multiple categories and large customer groups. Social commerce marketplaces such as TikTok Shop integrate shopping with creator content, product demonstrations and livestreaming. Specialised platforms concentrate on handmade products, travel services, automotive products or business procurement.' },
      { label: 'Vietnam example', text: 'Vietnam shows the social variant especially clearly: a platform that began as entertainment now carries product demonstration, livestream selling and checkout in the same session, which means discovery and transaction trust are managed by the same interface. Lesson 4 looks at how Vietnamese sellers choose between that and a conventional marketplace listing.' },
      { label: 'Business impact', text: 'Operators provide merchant dashboards, listing tools, order management, advertising and analytics on the supply side, and coordinate checkout, payments, shipping, refunds and dispute handling on the demand side. Reviews, seller verification, content moderation and marketplace policies then reduce fraud and improve buyer confidence — the work that makes a stranger’s product safe enough to buy.' },
    ],
    visualKind: 'ecom-m1-12-marketplace', visualHeading: 'What a marketplace does beyond matching',
    visualIntro: 'Read the marketplace types and the shared services an operator has to run underneath them.',
    imageAlt: 'Casemate tree map of digital marketplace types and operator functions',
    keyTerms: [
      { term: 'Digital marketplace', definition: 'A platform that connects multiple independent sellers with buyers and facilitates the transaction between them.' },
      { term: 'Third-party merchant', definition: 'An independent seller listing on a platform it does not own, using the platform’s traffic and services.' },
      { term: 'Seller verification', definition: 'Checking a merchant’s identity and legitimacy before or while it trades on a platform.' },
      { term: 'Dispute resolution', definition: 'The process a platform runs when a buyer and seller disagree about an order, refund or product condition.' },
    ],
    recap: [
      'A marketplace hosts other sellers; an online store sells its own inventory.',
      'Marketplaces may be general-purpose, social or specialised by category.',
      'Operators supply payments, logistics, advertising, verification and dispute handling.',
      'Value depends on holding both sides and keeping transactions trustworthy.',
    ],
    chapterRecap: 'Digital marketplaces are a major segment of e-commerce, distinguished by their multi-seller structure and intermediary role. They create value by connecting participants and providing shared infrastructure, but must manage trust, seller quality and the interests of both buyers and merchants.',
    deepDiveTitle: 'The intermediary problem',
    body: <EcomDeepDive paragraphs={[
      'A marketplace sits between two customers whose interests do not fully align. Buyers want low prices, fast delivery and easy returns; sellers want healthy margins, low commission and protection from unreasonable claims. Every policy the operator writes — return windows, dispute defaults, ranking rules, fee levels — moves value from one side to the other.',
      'This is why governance is a commercial function rather than an administrative one. Lean too far toward buyers and good sellers leave for a channel where they keep more margin; lean too far toward sellers and buyers stop trusting what they receive. The platform’s skill is holding a balance that neither side would choose on its own.',
    ]} evidence="Marketplace types, operator functions and the trust mechanisms are from the supplied brief. No platform-level seller counts, commission rates or dispute statistics are supplied, so none are stated. The two-sided governance argument is our own." />,
    sources: citeEcom('unctadDigitalEconomy', 'econSea'),
  }),
  ecomChapter({
    title: 'Industry Boundaries, Business Models and Market Scope', chapterTitle: LESSON, readingTime: '7',
    objective: 'Draw the boundary around the industry and explain why GMV, online retail sales and platform revenue must never be used interchangeably.',
    mateIntro: 'Four numbers can describe the same platform and differ by an order of magnitude. Before you quote any of them, work out which one answers the question you were actually asked.',
    keyInsight: 'Defining the market carefully is essential for industry research. Gross merchandise value (GMV), online retail sales, marketplace revenue, payment volume, and total e-commerce-related economic activity measure different things and should not be treated as interchangeable.',
    statTiles: [
      { value: '6', label: 'Adjacent sectors', subtitle: 'Retail, advertising, logistics, fintech, cloud, social', description: 'They supply infrastructure or traffic, but their revenue is not the same market.' },
      { value: '5', label: 'Business models in scope', subtitle: 'Inventory-led to supporting services', description: 'Each recognises revenue differently and carries a different cost structure.' },
      { value: '4', label: 'Metrics never interchangeable', subtitle: 'GMV, online retail sales, platform revenue, payment volume', description: 'Mixing them is the most common error in e-commerce research.' },
    ],
    statsNote: 'The tiles count the sectors, models and metrics listed in this lesson; they are a framework for reading figures, not measurements themselves.',
    narrative: [
      { label: 'What it is', text: 'The e-commerce industry overlaps with several adjacent sectors, including retail, digital advertising, logistics, financial technology, cloud computing and social media. These sectors provide essential infrastructure or customer acquisition capabilities, but their revenues are not necessarily part of the same e-commerce market measurement.' },
      { label: 'Why it is happening', text: 'The industry also contains different business models. Some businesses own and sell inventory, while others operate marketplaces, provide software for merchants, or facilitate transactions without directly owning the products. These differences affect revenue recognition, operating costs, customer relationships and competitive dynamics.' },
      { label: 'Real-world example', text: 'An inventory-led retailer books the full sale value as revenue. A third-party marketplace selling the identical basket books only its commission, advertising and service fees. Two companies can therefore move the same value of goods while reporting very different revenue, and neither is being misleading.' },
      { label: 'Vietnam example', text: 'The same discipline applies to Vietnamese sources. The Ministry of Industry and Trade, the Vietnam E-commerce Association and commercial research firms all publish market figures built on different coverage, so the numbers diverge. The answer is not to pick the most attractive one but to state which definition is being used, as Lesson 4 does.' },
      { label: 'Business impact', text: 'GMV measures the value of transactions facilitated or sold, whereas platform revenue typically reflects commissions, fees, advertising and other recognised income. An investment case or market-share claim that moves between the two without saying so is not a strong argument, and an experienced reader will spot it immediately.' },
    ],
    visualKind: 'ecom-m1-13-boundaries', visualHeading: 'Five business models and what their headline numbers mean',
    visualIntro: 'Compare how each model earns with what its reported number actually measures.',
    imageAlt: 'Casemate mirrored mind map of e-commerce business models and their revenue measures',
    keyTerms: [
      { term: 'GMV', definition: 'Gross merchandise value — the total value of transactions across a platform, before returns, discounts and fees.' },
      { term: 'Take rate', definition: 'The share of transaction value a platform keeps as commission and fees; the bridge between GMV and revenue.' },
      { term: 'Revenue recognition', definition: 'The accounting rule deciding whether a company books the full sale or only its fee, which depends on whether it owns the goods.' },
      { term: 'Payment volume', definition: 'The value processed through a payment provider, which may include transactions outside e-commerce altogether.' },
    ],
    recap: [
      'Retail, advertising, logistics, fintech, cloud and social media are adjacent, not the same market.',
      'Inventory-led, marketplace, infrastructure, social commerce and supporting services differ structurally.',
      'Revenue recognition depends on whether the business owns the goods.',
      'GMV, online retail sales, platform revenue and payment volume are four distinct measures.',
    ],
    chapterRecap: 'The industry includes online merchants, marketplaces, commerce-enabling technology and related transaction services. Clear boundaries and consistent metrics are necessary for meaningful comparisons across companies, countries and business models.',
    deepDiveTitle: 'The comparison that quietly breaks',
    body: <EcomDeepDive paragraphs={[
      'Picture two competitors moving the same value of goods. One owns its inventory and therefore reports the full sale value as revenue. The other runs a marketplace and reports only the commission and service income it keeps. Rank them by revenue and the retailer looks much larger; rank them by goods moved and they are equal. Neither figure is wrong because the accounting follows who owns the goods.',
      'Neither figure is wrong, and neither company is hiding anything — the accounting simply follows who owns the goods. The error belongs to the analyst who puts the two numbers in one column. The working habit that prevents it is dull but reliable: write the definition next to the number every time, and refuse to build a chart from figures whose definitions you cannot state.',
    ]} evidence="The adjacent sectors, business models and the warning about interchangeable metrics are from the supplied brief. The two-competitor illustration is qualitative and does not claim a measured company figure." />,
    sources: citeEcom('unctadMeasuring', 'emarketerForecast', 'econSea'),
  }),
];

const quiz = ecomQuiz('ecom-m1-l1', [
  { chapter: '1', objective: 'Define e-commerce', question: 'What does e-commerce cover?', application: 'A definition stops at the checkout button. What is it missing?', correct: 'Buying and selling through electronic networks plus the activities that support the transaction', wrong: ['Only the design of an online store', 'Only parcel delivery and warehousing', 'Only digital advertising campaigns'], explanation: 'It covers discovery, marketing, ordering, payment, fulfilment, service and post-purchase support. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify the transaction models', question: 'Which transaction models does e-commerce include?', application: 'A plan counts consumer orders only. What else belongs in scope?', correct: 'B2C, B2B, C2C and D2C', wrong: ['B2C only', 'B2B and C2C only', 'D2C only'], explanation: 'E-commerce is broader than online retail alone and spans all four models. Review Chapter 1.' },
  { chapter: '1', objective: 'State the system insight', question: 'What does e-commerce competitiveness depend on?', application: 'A retailer redesigns its website and still loses customers. What was not fixed?', correct: 'Coordination of experience, technology, payments, logistics, merchant operations and trust', wrong: ['The visual design of the homepage alone', 'The number of products listed alone', 'The size of the advertising budget alone'], explanation: 'E-commerce is an integrated system rather than simply a website. Review Chapter 1.' },
  { chapter: '2', objective: 'Distinguish a marketplace', question: 'What distinguishes a marketplace from a traditional online store?', application: 'A platform lists goods from hundreds of independent sellers. Which model is it?', correct: 'It enables third-party merchants to sell in a shared digital environment', wrong: ['It sells only its own inventory', 'It refuses to process payments', 'It operates without any customer reviews'], explanation: 'A marketplace connects multiple sellers with buyers rather than selling only its own stock. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify marketplace functions', question: 'Which functions do marketplaces provide beyond matching buyers and sellers?', application: 'An operator plans to offer listings only. What is it leaving out?', correct: 'Payments, logistics, advertising, seller verification, reviews, dispute resolution and financing', wrong: ['Only product photography', 'Only warehouse construction', 'Only price setting for every seller'], explanation: 'Marketplace functions extend well beyond matching. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain marketplace value', question: 'When does a marketplace increase in value?', application: 'A platform adds sellers but loses buyers. What happens to its value?', correct: 'When it attracts both buyers and sellers, maintains trust and reduces friction', wrong: ['When it adds sellers regardless of buyer numbers', 'When it raises commissions on every order', 'When it removes its review system'], explanation: 'Value rises when both sides grow and transactions stay trustworthy. Review Chapter 2.' },
  { chapter: '3', objective: 'Identify adjacent sectors', question: 'Which sectors overlap with e-commerce without being part of the same market measurement?', application: 'A market size adds a logistics firm’s revenue to platform revenue. What is wrong?', correct: 'Retail, digital advertising, logistics, financial technology, cloud computing and social media', wrong: ['Agriculture, mining and forestry', 'Construction and real estate only', 'Pharmaceuticals and healthcare only'], explanation: 'These sectors supply infrastructure or traffic but their revenues are not necessarily part of the e-commerce market. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain revenue recognition', question: 'Why can a marketplace report far lower revenue than an inventory-led retailer moving the same goods?', application: 'Two competitors move identical volume but report very different revenue. Why?', correct: 'The marketplace books commissions and fees, while the retailer books the full sale value', wrong: ['The marketplace sells at much lower prices', 'The retailer counts transactions twice', 'The marketplace excludes its largest sellers'], explanation: 'Revenue recognition depends on whether the business owns the products. Review Chapter 3.' },
  { chapter: '3', objective: 'Distinguish GMV from revenue', question: 'What does gross merchandise value measure?', application: 'A deck labels GMV as platform revenue. What is the correction?', correct: 'The value of transactions facilitated or sold, not the income the platform recognises', wrong: ['The commission a platform charges', 'The profit a platform earns', 'The advertising a platform sells'], explanation: 'GMV measures transaction value; platform revenue reflects commissions, fees and advertising. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply measurement discipline', question: 'What must accompany any e-commerce market figure?', application: 'Two reports give very different Vietnam market sizes. What should you check first?', correct: 'The definition and coverage behind it', wrong: ['The currency it is quoted in only', 'The length of the report only', 'The year the publisher was founded'], explanation: 'Clear boundaries and consistent metrics are necessary for meaningful comparison. Review Chapter 3.' },
]);

export const LESSON_ECOM_1: EcomM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can define e-commerce and digital marketplaces, separate them from adjacent sectors, and read the four market metrics without confusing them.',
    keyTakeaways: [
      'E-commerce is an integrated system; the storefront is its cheapest component.',
      'It spans B2C, B2B, C2C and D2C, across physical, digital and service products.',
      'A marketplace hosts independent sellers and must govern a two-sided relationship.',
      'Marketplace functions extend to payments, logistics, verification and disputes.',
      'GMV, online retail sales, platform revenue and payment volume are four distinct measures.',
    ],
    businessImplications: 'Write the definition beside every number: a marketplace and an inventory-led retailer moving identical goods will report revenues an order of magnitude apart, and comparing them directly produces a conclusion that is simply wrong.',
    remember: 'Name the model and the metric before you quote the size.',
    nextLesson: 'Industry History & Development',
  },
};
