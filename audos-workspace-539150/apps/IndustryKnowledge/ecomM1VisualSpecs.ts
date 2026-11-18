import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for E-commerce & Online Marketplaces Module 01, keyed by visualKind. */
export const ECOM_M1_VISUALS: Record<string, ChapterVisual> = {
  'ecom-m1-11-definition': {
    heading: 'E-commerce is a system that fails at its weakest link',
    intro: 'An order touches far more than a storefront. Sort the transaction models, the products sold and the systems that must all work for one sale to complete.',
    spec: {
      layout: 'taxonomy', title: 'Definition and Core Characteristics of E-Commerce', kicker: '',
      root: 'E-commerce', rootDetail: 'Buying and selling through websites, apps and digital platforms, plus everything that supports the sale',
      groups: [
        { label: 'Transaction models', items: ['B2C: business to consumer', 'B2B: business to business', 'C2C: consumer to consumer', 'D2C: brand direct to consumer'] },
        { label: 'What can be sold', items: ['Physical goods', 'Digital products and content', 'Subscriptions', 'Services and online courses'] },
        { label: 'Customer-facing systems', items: ['Customer experience: discovery and ordering', 'Technology: listings, search and checkout', 'Payments that clear'] },
        { label: 'Systems behind the order', items: ['Logistics: delivery and returns', 'Merchant operations: accurate stock', 'Trust: a seller worth trusting'] },
      ],
      note: 'The transaction models and activity groups are a qualitative framing from the brief, not measured market data; publishers count each model differently.',
      takeaway: 'Taking an order is close to a commodity; the payment, delivery and trust behind it decide whether the business works.',
    },
  },
  'ecom-m1-12-marketplace': {
    heading: 'The marketplace operator answers for other people’s sellers',
    intro: 'A marketplace hosts independent sellers, yet the buyer blames the platform for everything. See what the operator runs for each side to make a stranger’s product safe to buy.',
    spec: {
      layout: 'ecosystem', title: 'Definition and Scope of Digital Marketplaces', kicker: '',
      center: { label: 'Marketplace operator', detail: 'Coordinates many independent sellers and buyers in one shared environment' },
      actors: [
        { label: 'Third-party merchants', relation: 'Use merchant dashboards, listing tools, order management, advertising and analytics', flows: ['product', 'service'] },
        { label: 'Buyers', relation: 'Rely on the operator for checkout, payments, shipping, refunds and dispute handling', flows: ['money', 'service'] },
        { label: 'Creators on social marketplaces', relation: 'On TikTok Shop, creator content, demonstrations and livestreams sit beside checkout', flows: ['information'] },
        { label: 'Trust and policy controls', relation: 'Reviews, seller verification, content moderation and marketplace policies reduce fraud', flows: ['oversight'] },
      ],
      note: 'Marketplaces may be general (Amazon, Shopee), social (TikTok Shop) or specialised by category, such as handmade goods, travel or business procurement.',
      takeaway: 'Every policy on returns, disputes, ranking or fees moves value between buyers and sellers, so governance is a commercial function.',
    },
  },
  'ecom-m1-13-boundaries': {
    heading: 'GMV, sales, revenue and payment volume answer different questions',
    intro: 'Two companies moving the same goods can report very different revenue. Read what each metric counts before putting any two numbers in one column.',
    spec: {
      layout: 'table', title: 'Industry Boundaries, Business Models and Market Scope', kicker: '',
      headers: ['Metric', 'What it counts', 'Trap to avoid'],
      rows: [
        { label: 'GMV', a: 'Total value of transactions across a platform, before returns, discounts and fees', b: 'Treating it as the platform’s revenue' },
        { label: 'Online retail sales', a: 'Value of goods and services sold online, on a publisher’s chosen coverage', b: 'Comparing publishers that cover different things' },
        { label: 'Platform revenue', a: 'Commissions, fees, advertising and other recognised income', b: 'Ranking a marketplace against a retailer that books the full sale' },
        { label: 'Payment volume', a: 'Value processed through a payment provider', b: 'It may include transactions outside e-commerce altogether' },
        { label: 'Take rate', a: 'Share of transaction value a platform keeps as commission and fees', b: 'It is the bridge between GMV and revenue, not a size' },
      ],
      note: 'Revenue recognition follows who owns the goods. Retail, advertising, logistics, fintech, cloud and social media are adjacent sectors whose revenue is not the same market.',
      takeaway: 'Write the definition next to every number, and never build a chart from figures whose definitions you cannot state.',
    },
  },
  'ecom-m1-21-early': {
    heading: 'Why books and flights sold online before fit-and-feel goods',
    intro: 'Early sites were catalogues with an order form. See which capabilities had to be added, and why categories easy to judge from a screen moved first.',
    spec: {
      layout: 'pathway', title: 'Early E-Commerce and the Development of Online Retail', kicker: '',
      trunk: [
        { label: 'Internet and web browsers spread', detail: 'Businesses publish product information and accept orders online', kind: 'stage' },
        { label: 'Digital storefronts', detail: 'Websites show products, prices, descriptions and an ordering path', kind: 'stage' },
      ],
      optionsLabel: 'Capabilities added to stop abandoned purchases',
      options: [
        { label: 'Secure checkout', detail: 'Protects card and account details, raising confidence in remote purchase' },
        { label: 'Search and catalogue tools', detail: 'Help buyers locate products across growing online inventories' },
        { label: 'Warehousing, delivery and tracking', detail: 'Make fulfilment practical and reduce uncertainty after paying' },
        { label: 'Customer databases', detail: 'Transaction records support service, retention and targeted promotion' },
      ],
      afterLabel: 'Which categories moved online',
      after: [
        { label: 'Standardised categories first', detail: 'Books, electronics and travel bookings could be judged from a description', kind: 'stage' },
        { label: 'Touch, fit and freshness later', detail: 'Once returns, photography, sizing data and delivery speed closed the gap', kind: 'outcome' },
      ],
      note: 'The brief gives no dated milestones or adoption percentages for this period. Vietnam developed later, with smartphones, digital payments and marketplaces already available.',
      takeaway: 'When a new category moves online, look for the capability that recently made judging it from a screen reasonable.',
    },
  },
  'ecom-m1-22-marketplaces': {
    heading: 'The buyer–seller loop that lets platforms outgrow single stores',
    intro: 'A single store grows with its own marketing spend; a marketplace grows when each side pulls in the other. Follow the loop, then notice what staying visible costs the merchant.',
    spec: {
      layout: 'flow', title: 'The Rise of Digital Marketplaces and Platform Economies', kicker: '',
      steps: [
        { label: 'Merchant joins the platform', detail: 'Buys access to centralised discovery, transaction tools and customer traffic', kind: 'stage' },
        { label: 'Product variety grows', detail: 'More sellers widen the assortment on the same platform', kind: 'stage' },
        { label: 'More buyers arrive', detail: 'Greater choice, ratings and reviews make the platform more attractive', kind: 'stage' },
        { label: 'Visibility gets dearer', detail: 'Sellers crowd the same ranked page and pay commission plus advertising', kind: 'stage' },
        { label: 'Operator revenue compounds', detail: 'Commissions, advertising, seller subscriptions and fulfilment fees can outgrow goods moved', kind: 'outcome' },
      ],
      loop: 'More buyers make the platform more attractive to sellers, which pulls more sellers in and restarts the loop.',
      note: 'The brief gives no commission rates, seller counts or platform shares. In Vietnam a household seller can reach a national audience within days of listing.',
      takeaway: 'Reach arrives immediately but margin must be defended continuously, so experienced sellers also build direct customer relationships.',
    },
  },
  'ecom-m1-23-mobile': {
    heading: 'Search-led shopping meets demand; content-led shopping creates it',
    intro: 'Mobile and social channels moved discovery inside entertainment. Compare what a seller must be good at when the buyer searches and when a video sells to them.',
    spec: {
      layout: 'compare', title: 'Mobile Commerce, Social Commerce and Omnichannel Development', kicker: '',
      leftTitle: 'Search-led commerce', rightTitle: 'Content-led commerce',
      rows: [
        { label: 'Where demand starts', a: 'Somebody already wants a kettle and types kettle', b: 'A product appears while the viewer is watching something else' },
        { label: 'Typical channels', a: 'Search on a marketplace or mobile app', b: 'Short-form videos, livestreams and creator recommendations' },
        { label: 'Winning seller skills', a: 'Listing quality, price and availability', b: 'The demonstration, the creator relationship and handling a sudden spike' },
        { label: 'Operational exposure', a: 'Serves demand that already exists', b: 'A livestream can sell a month of stock in an hour, then bring returns and questions' },
      ],
      note: 'Digital wallets and improved mobile checkout cut friction for both. Omnichannel retailers connect stores, apps, inventory and service into one journey.',
      takeaway: 'Treat social commerce as a distribution channel, not a marketing experiment, or sales arrive that the seller cannot service.',
    },
  },
  'ecom-m1-31-global': {
    heading: 'What moves the 20.5% online share of world retail',
    intro: 'EMARKETER’s forecast puts retail e-commerce at US$6.419 trillion in 2025. A share is a ratio, so check whether the online numerator or the total retail denominator moved.',
    spec: {
      layout: 'driverTree', title: 'Global Market Size, Growth and Development', kicker: '',
      root: { label: 'Retail e-commerce share of worldwide retail, 2025', detail: '20.5% on EMARKETER’s February 2025 commercial forecast' },
      formula: 'Share = retail e-commerce sales ÷ total retail sales',
      drivers: [
        {
          label: 'Retail e-commerce sales', detail: 'US$6.419 trillion forecast for 2025; excludes travel and event tickets',
          children: [
            { label: 'First-time adoption', detail: 'Still meaningful in emerging markets such as Vietnam' },
            { label: 'Conversion and retention', detail: 'Main levers once most buyers in mature markets shop online' },
            { label: 'Efficiency and category expansion', detail: 'Further growth sources in established economies' },
          ],
        },
        { label: 'Total retail sales', detail: 'A weak year for store sales can lift the share without online strength', op: '÷' },
      ],
      note: 'One publisher’s commercial forecast, published 22 May 2025: not an official statistic or GMV measure, and not comparable with national estimates.',
      takeaway: 'Read the share and the absolute value together, and check the exclusions before sizing a market from the headline.',
    },
  },
  'ecom-m1-32-platforms': {
    heading: 'Global e-commerce rivals compete on whole ecosystems, not storefronts',
    intro: 'The platforms named here win on different mixes of scale, content, control and curation. Group them by archetype and note what each relies on.',
    spec: {
      layout: 'taxonomy', title: 'Major Markets, Platforms and Competitive Structure', kicker: '',
      root: 'Global e-commerce competitors', rootDetail: 'China and the United States are central; Southeast Asia, India and Latin America offer expansion',
      groups: [
        { label: 'Broad marketplace ecosystems', items: ['Amazon: marketplace with fulfilment and seller services', 'Alibaba and JD.com: different mixes of marketplace, owned retail and logistics'] },
        { label: 'Regional platforms', items: ['Shopee and Lazada: multiple Southeast Asian markets'] },
        { label: 'Content-led commerce', items: ['TikTok Shop: content discovery, creator influence and in-app shopping'] },
        { label: 'Control and curation', items: ['Direct-to-consumer brands: own customer relationships and first-party data', 'Specialised marketplaces: curated selection and specialist knowledge'] },
      ],
      note: 'The brief gives no market shares or platform revenues. Entrants often have to rebuild payment acceptance, delivery coverage and dispute handling for each market.',
      takeaway: 'Scale helps only where local payment, logistics and discovery habits let it apply, so a smaller local rival can still win.',
    },
  },
  'ecom-m1-33-trends': {
    heading: 'Every e-commerce growth trend arrives with a cost attached',
    intro: 'As channel expansion slows, new trends open growth but make attention dearer and delivery promises harder. Follow where that pressure leads.',
    spec: {
      layout: 'pathway', title: 'Global Industry Trends and Structural Changes', kicker: '',
      trunk: [
        { label: 'Rapid channel expansion slows', detail: 'Competition moves to customer experience, operational efficiency and profitability', kind: 'stage' },
      ],
      optionsLabel: 'Structural changes reshaping discovery and purchase',
      options: [
        { label: 'AI-enabled shopping', detail: 'Conversational search, recommendation systems and shopping assistants' },
        { label: 'Social and creator commerce', detail: 'Livestreams and creator communities connect demonstration with purchase' },
        { label: 'Cross-border selling', detail: 'Marketplace infrastructure lets merchants reach international customers' },
        { label: 'Omnichannel retail', detail: 'Online and store channels combined into one way to discover and buy' },
        { label: 'Fulfilment optimisation', detail: 'Inventory placement, order routing, delivery reliability and reverse logistics' },
      ],
      afterLabel: 'Where the pressure lands',
      after: [
        { label: 'Acquisition costs rise', detail: 'Competition for attention grows and delivery-speed expectations harden', kind: 'stage' },
        { label: 'Profitability management decides', detail: 'Contribution margin, promotional spend, advertising efficiency and customer lifetime value', kind: 'outcome' },
      ],
      note: 'The brief gives no measured acquisition costs, margins or adoption rates. In Vietnam these pressures arrive together rather than in sequence.',
      takeaway: 'Judge each channel on contribution after fulfilment, payment fees, returns and acquisition cost, and each customer on whether they return.',
    },
  },
  'ecom-m1-41-vietnam': {
    heading: 'MOIT’s 2025 figure and VECOM’s 2024 figure are not a time series',
    intro: 'VECOM’s 2024 total is higher than MOIT’s 2025 total, but that does not prove the market shrank. Keep publisher, period and scope beside each number.',
    spec: {
      layout: 'compare', title: 'Market Size, Growth and Digital Adoption', kicker: '',
      leftTitle: 'MOIT estimate for 2025', rightTitle: 'VECOM EBI 2025 estimate for 2024',
      rows: [
        { label: 'Market total', a: 'About US$31 billion', b: 'US$32 billion' },
        { label: 'Share of retail and consumer services', a: 'About 11% of retail goods and consumer-service revenue', b: 'About 12% of the same broad denominator' },
        { label: 'Reported growth', a: '25.5% higher than the prior year', b: 'Not stated in this chapter' },
        { label: 'Component inside the total', a: 'None broken out here', b: 'US$22.5 billion of online retail goods, not to be added on top' },
        { label: 'Where it appears', a: 'MOIT market report, published 23 October 2026', b: 'Quoted in a separate MOIT article' },
      ],
      note: 'Both are estimates from different publishers, periods and methodologies, verified against MOIT pages on 25 October 2026. Size a specific product category separately.',
      takeaway: 'Market size alone does not show profitability, and two publishers’ totals cannot be read as growth or decline.',
    },
  },
  'ecom-m1-42-platforms': {
    heading: 'Platform reach in Vietnam is cheap to start and costly to depend on',
    intro: 'Marketplaces, social channels, retailer apps and owned storefronts all reach Vietnamese buyers. What decides a seller’s position later is what it builds of its own.',
    spec: {
      layout: 'decision', title: 'Major Platforms and Competitive Landscape in Vietnam', kicker: '',
      root: { label: 'Seller winning orders on platforms', detail: 'Shopee competes on assortment and promotions, TikTok Shop on video and livestreams, Lazada on seller services' },
      question: 'Is part of the platform margin spent on something the business keeps?',
      branches: [
        { condition: 'Yes', outcome: 'The seller keeps an alternative', detail: 'A customer list, a direct storefront or a brand people ask for by name', tone: 'positive' },
        { condition: 'No', outcome: 'The channel sets its own price', detail: 'Commission, voucher funding, advertising to hold rank and impulse-buy returns keep rising', tone: 'negative' },
      ],
      note: 'The brief gives no commission rates, platform shares or acquisition costs. Choose channels by product category, target audience, margin, brand positioning and customer cost.',
      takeaway: 'Use platform reach to find customers, and invest part of what it earns in a customer relationship the business owns.',
    },
  },
  'ecom-m1-43-behaviour': {
    heading: 'Each trust signal Vietnamese shoppers expect has a price tag',
    intro: 'Vietnamese buyers compare prices and look for proof before trusting an unfamiliar seller. See how they check each expectation and what meeting it costs the merchant.',
    spec: {
      layout: 'table', title: 'Consumer Behaviour, Merchant Participation and Local Characteristics', kicker: '',
      headers: ['Shopper expectation', 'How shoppers check it', 'What it costs the merchant'],
      rows: [
        { label: 'Low price and good offers', a: 'Compare prices, vouchers, shipping fees and promotions across platforms', b: 'Margin, against lower-priced alternatives' },
        { label: 'Confidence in the product', a: 'Ratings, customer photos, creator demonstrations and livestream interaction', b: 'Content creation, which small sellers struggle with' },
        { label: 'Authentic goods', a: 'Clear product information and reliable sellers', b: 'Authentic product costs more than a convincing imitation' },
        { label: 'Easy delivery and returns', a: 'Accurate delivery estimates, convenient payment and straightforward returns', b: 'Fulfilment and reverse logistics' },
        { label: 'Responsive support', a: 'Help when an order from an unfamiliar merchant goes wrong', b: 'Staff to answer questions' },
      ],
      note: 'The merchant base runs from established brands to household businesses. The brief gives no measured return rates or basket values.',
      takeaway: 'Because price comparison is routine, trust spending is recovered through repeat purchase rather than higher prices.',
    },
  },
  'ecom-m1-51-economic': {
    heading: 'More online shoppers is not the same as more online revenue',
    intro: 'Internet access shows how many people could buy, not how often or how much. Break revenue into its parts to see what each economic driver actually moves.',
    spec: {
      layout: 'driverTree', title: 'Economic, Demographic and Consumer Drivers', kicker: '',
      root: { label: 'Online revenue from a customer base', detail: 'Can stay flat while active customer counts rise' },
      formula: 'Revenue = active customers × purchase frequency × basket value',
      drivers: [
        {
          label: 'Active customers', detail: 'How many people buy online',
          children: [
            { label: 'Urbanisation and digital literacy', detail: 'Familiarity with apps, digital payment and online security supports adoption' },
            { label: 'Younger digital segments', detail: 'Receptive to social commerce, mobile-first and creator-led shopping' },
          ],
        },
        {
          label: 'Purchase frequency', detail: 'How often each customer buys', op: '×',
          children: [
            { label: 'Busy urban lifestyles', detail: 'Raise the appeal of home delivery and digital ordering' },
            { label: 'Retention', detail: 'Repeat buyers need no second acquisition cost' },
          ],
        },
        {
          label: 'Basket value', detail: 'How much each order is worth', op: '×',
          children: [
            { label: 'Disposable income', detail: 'Widens the range of products and services bought online' },
            { label: 'Inflation and uncertainty', detail: 'Shrink order values and raise demand for promotions' },
          ],
        },
      ],
      note: 'The brief gives no measured income, frequency or basket data. In Vietnam new buyers arrive steadily but arrive discount-aware.',
      takeaway: 'If the base grows while frequency, basket value and retention fall, the business is buying customers its economics do not yet support.',
    },
  },
  'ecom-m1-52-tech': {
    heading: 'One order’s journey and the failure each system prevents',
    intro: 'Customers remember whether the right item arrived when promised, not the product page. Follow an order from discovery to return and name the failure each layer prevents.',
    spec: {
      layout: 'flow', title: 'Technology, Logistics and Digital Infrastructure Drivers', kicker: '',
      steps: [
        { label: 'Product discovery', detail: 'Recommendation engines stop shoppers missing products they would have bought', kind: 'stage' },
        { label: 'Checkout and payment', detail: 'Digital wallets, banking apps, QR payments and gateways reduce checkout friction', kind: 'stage' },
        { label: 'Stock allocation', detail: 'Inventory visibility stops selling something that cannot be shipped', kind: 'stage' },
        { label: 'Last-mile delivery', detail: 'Delivery networks and shipment tracking make arrival reliable', kind: 'stage' },
        { label: 'Returns and refunds', detail: 'Reverse logistics stops a return turning into a refund dispute', kind: 'outcome' },
      ],
      note: 'Fraud prevention and reliable systems protect every stage; AI helps only with good data, integration and implementation. In Vietnam the physical layer is often the binding constraint.',
      takeaway: 'A better checkout cannot compensate for unreliable delivery, inaccurate inventory or weak after-sales service.',
    },
  },
  'ecom-m1-53-regulation': {
    heading: 'Vietnam’s e-commerce law moves seller checks into the rulebook',
    intro: 'Seller verification, disclosure and complaint handling became legal requirements in July 2026. Follow the dates, then note who carries the burden.',
    spec: {
      layout: 'timeline', title: 'Regulatory, Competitive and Sustainability Factors', kicker: '',
      events: [
        { period: '10 December 2025', label: 'Law on E-Commerce 122/2025/QH15 enacted', detail: 'Covers platform operation, seller identity, disclosure, complaints and unlawful listings', status: 'historical' },
        { period: '30 June 2026', label: 'Decree 248/2026/ND-CP issued', detail: 'Applied alongside the law', status: 'historical' },
        { period: '1 July 2026', label: 'Law and decree take effect', detail: 'Platforms and sellers face verification, disclosure and complaint-handling requirements', status: 'historical' },
        { period: '3 July 2026', label: 'MOIT implementation summary', detail: 'Adds public operating rules, record retention and cooperation with authorities', status: 'historical' },
      ],
      note: 'Tax, consumer protection, data, counterfeit and cross-border rules also apply, and parcel, packaging and returns growth adds sustainability pressure. Orientation only, not legal advice.',
      takeaway: 'Compliance raises the floor on who can trade, so merchants already verifying, disclosing and handling complaints gain relative position.',
    },
  },
};
