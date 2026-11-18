import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for E-commerce & Online Marketplaces Module 05, keyed by visualKind. */
export const ECOM_M5_VISUALS: Record<string, ChapterVisual> = {
  'ecom-m5-11-convenience': {
    heading: 'Where shopper effort leaks between search and reorder',
    intro: 'Each stage removes a different kind of effort. Look for the stage where one failure in stock, payment or delivery undoes the convenience built everywhere else.',
    spec: {
      layout: 'flow', title: 'Convenience, Speed and Frictionless Shopping', kicker: '',
      steps: [
        { label: 'Mobile discovery', detail: 'Find and compare products, specifications and reviews on a smartphone', kind: 'stage' },
        { label: 'Streamlined checkout', detail: 'Simple registration, address entry and saved payment reduce abandonment', kind: 'stage' },
        { label: 'Flexible fulfillment', detail: 'Home delivery, pickup or scheduled options suited to need', kind: 'stage' },
        { label: 'Order visibility', detail: 'Accurate estimates, real-time tracking and delay communication remove uncertainty', kind: 'stage' },
        { label: 'Replenishment', detail: 'Reorder lists and reminders make recurring essentials effortless', kind: 'outcome' },
      ],
      loop: 'Once most competitors offer a feature, customers notice it mainly when it fails, so advantage comes from consistent execution across stock, payment, delivery and service.',
      note: 'Routine essentials reward reliable replenishment; considered purchases such as electronics reward specifications, reviews and easy returns.',
      takeaway: 'Convenience is now a baseline, so measure effort and failure across the whole journey while keeping affordability, reliability and service intact.',
    },
  },
  'ecom-m5-12-discovery': {
    heading: 'Four tests a recommendation must pass to earn the sale',
    intro: 'Recommendations, creators and livestreams can all raise attention. Check which test each one supports, because failing any of them turns discovery into noise.',
    spec: {
      layout: 'driverTree', title: 'Personalization, Social Discovery and Content-Led Shopping', kicker: '',
      root: { label: 'Discovery that converts and keeps trust', detail: 'Judged by conversion, return, repeat and customer trust, not engagement alone' },
      drivers: [
        { label: 'Relevance', detail: 'Built on permitted behavioral and contextual signals', children: [
          { label: 'Personalized recommendations' },
          { label: 'No repetitive or intrusive suggestions' },
        ] },
        { label: 'Credibility', detail: 'Demonstration and social proof add context', children: [
          { label: 'Creator tutorials' },
          { label: 'Livestream questions answered live' },
          { label: 'User reviews and images' },
        ] },
        { label: 'Transparency', detail: 'Shoppers can tell content from advertising', children: [
          { label: 'Clear sponsorship disclosure' },
          { label: 'Accurate listings' },
        ] },
        { label: 'Product quality', detail: 'Quality, delivery and support decide returns and repeat behavior' },
      ],
      note: 'Discovery amplifies the underlying experience, including its failures.',
      takeaway: 'Personalization and creator content lift conversion only when relevance, credibility, transparency and product quality all hold.',
    },
  },
  'ecom-m5-13-value': {
    heading: 'Why the cheapest listing can cost the shopper more',
    intro: 'Read each row as a cost the price tag hides. Notice which rows matter most by category: authenticity for beauty or electronics, freshness for groceries, repairability for durable goods.',
    spec: {
      layout: 'compare', title: 'Value Consciousness, Trust and Responsible Consumption', kicker: '',
      leftTitle: 'Price-only view', rightTitle: 'Total-value view',
      rows: [
        { label: 'Cost counted', a: 'Displayed item price', b: 'Item, delivery, return and expected-use costs together' },
        { label: 'Product risk', a: 'Listings assumed equivalent', b: 'Verified sellers, traceability and authenticity assurance' },
        { label: 'Service', a: 'Noticed only after a failure', b: 'Clear refunds, return conditions and warranty' },
        { label: 'Product life', a: 'Ends at the transaction', b: 'Durability, repair, resale and reuse' },
        { label: 'Environmental claims', a: 'Taken at face value', b: 'Backed by credible evidence' },
      ],
      note: 'Vietnamese shoppers may pay more for verified authenticity in higher-risk categories while staying promotion-sensitive for standardized goods.',
      takeaway: 'Customers pay more when quality, authenticity, convenience and service lower perceived risk and raise total value.',
    },
  },
  'ecom-m5-21-ai': {
    heading: 'From shopper guidance to delegated purchases, with authority kept clear',
    intro: 'AI enters commerce through many use cases, but each must earn its place. See how the uses fan out and then answer to the same governance and the same measurable outcome.',
    spec: {
      layout: 'pathway', title: 'Artificial Intelligence and Intelligent Commerce', kicker: '',
      trunk: [
        { label: 'Large assortments, complex decisions', detail: 'Shoppers need guidance; businesses need automation', kind: 'stage' },
      ],
      optionsLabel: 'AI use-case groups',
      options: [
        { label: 'Conversational shopping', detail: 'Generative AI answers questions, compares products and prepares a choice' },
        { label: 'Recommendations', detail: 'Match preference and context to the assortment' },
        { label: 'Natural-language search', detail: 'Conversational and local-language queries' },
        { label: 'Forecasting and fraud detection', detail: 'Demand, inventory and fraud signals behind the storefront' },
        { label: 'Agentic commerce', detail: 'An authorized agent may complete selected multi-step tasks; still emerging' },
      ],
      afterLabel: 'Every use answers to',
      after: [
        { label: 'Responsible governance', detail: 'Accuracy, bias, privacy, transparency, payment authorization and human escalation', kind: 'stage' },
        { label: 'Measurable outcome', detail: 'Better relevance, conversion, service quality or operating cost', kind: 'outcome' },
      ],
      note: 'DHL’s 2026 survey finds 29% of shoppers willing to let AI make decisions or purchases within five years (33% Gen Z, 36% millennials); commercial survey research, not a market forecast.',
      takeaway: 'Automation creates advantage only when it measurably improves relevance, conversion, service or cost while the customer keeps authority.',
    },
  },
  'ecom-m5-22-automation': {
    heading: 'Automation speeds up whatever data discipline it finds',
    intro: 'Before automating catalog, order or inventory work, ask whether teams agree on what a product, an order and a customer are. The answer decides which way automation pushes.',
    spec: {
      layout: 'decision', title: 'Automation, Cloud Infrastructure and Data Analytics', kicker: '',
      root: { label: 'Plan to automate commerce operations', detail: 'Catalog, orders, inventory, support and fraud on cloud capacity linked by APIs' },
      question: 'Do teams share product, order and customer definitions, with clear data ownership?',
      branches: [
        { condition: 'Yes: standard processes, owned data', outcome: 'Operations scale consistently', detail: 'Automation reconciles orders and stock, analytics forecasts demand, monitoring flags payment or delivery exceptions', tone: 'positive' },
        { condition: 'Partly: systems linked, data uneven', outcome: 'Returns fall short of expectations', detail: 'Poor data, integration cost and cybersecurity weaknesses limit what technology improves', tone: 'caution' },
        { condition: 'No: fragmented systems and definitions', outcome: 'Inconsistency arrives faster', detail: 'Automation scales a bad process as readily as a good one', tone: 'negative' },
      ],
      note: 'A Vietnamese multichannel retailer can connect marketplace, owned-store, warehouse and accounting records through APIs and common definitions.',
      takeaway: 'Reliable data, integrated systems and defined processes come before automation, not after it.',
    },
  },
  'ecom-m5-23-payments': {
    heading: 'Payment options, threats and controls designed as one system',
    intro: 'Read the groups together: each payment option brings its own fraud pattern and cost, and each control adds friction. Look for the balance between acceptance and protection.',
    spec: {
      layout: 'taxonomy', title: 'Digital Payments, Cybersecurity and Transaction Trust', kicker: '',
      root: 'Transaction trust at checkout', rootDetail: 'A conversion factor and a risk-management requirement at once',
      groups: [
        { label: 'Payment options', items: ['Digital wallets', 'Cards', 'Bank transfers', 'QR-related methods', 'Cross-border settlement'] },
        { label: 'Digital threats', items: ['Account takeover', 'Phishing', 'Payment fraud', 'Data breach', 'Data misuse'] },
        { label: 'Proportionate controls', items: ['Risk-based authentication', 'Anomaly monitoring', 'Incident response'] },
        { label: 'Choosing the method mix', items: ['Customer preference', 'Transaction risk', 'Regulation', 'Processing cost and settlement timing'] },
      ],
      note: 'Excessive friction loses legitimate buyers; weak controls create loss and disruption. Aim for useful acceptance, not the longest list of methods.',
      takeaway: 'Convenient payment and proportionate security are one capability that drives both conversion and risk.',
    },
  },
  'ecom-m5-31-social': {
    heading: 'A creator’s demo is only the first step of a livestream sale',
    intro: 'Follow one creator-led sale from attention to repeat purchase. The later steps, delivery and measurement, decide whether the demand the content created was worth having.',
    spec: {
      layout: 'flow', title: 'Social Commerce, Livestreaming and Creator-Led Sales', kicker: '',
      steps: [
        { label: 'Creator relevance', detail: 'Reach an audience with matching interests that is not actively searching', kind: 'stage' },
        { label: 'Demonstration and interaction', detail: 'Short video or livestream shows the product and answers questions', kind: 'stage' },
        { label: 'Sponsorship disclosure', detail: 'Paid and affiliate relationships are made clear to viewers', kind: 'stage' },
        { label: 'Shoppable checkout', detail: 'Content links directly to the product and purchase', kind: 'stage' },
        { label: 'Fulfillment and returns', detail: 'Listing, inventory, delivery and support absorb a sudden demand spike', kind: 'stage' },
        { label: 'Repeat contribution', detail: 'Judged by conversion, return, repeat and CAC, not engagement', kind: 'outcome' },
      ],
      note: 'Vietnam’s marketplace competition increasingly includes livestream and short-form video alongside search-led shopping, as reflected in Metric and MOIT reporting.',
      takeaway: 'Social commerce is a distribution system with operating consequences: engagement counts only when it becomes profitable, trusted repeat sales.',
    },
  },
  'ecom-m5-32-omni': {
    heading: 'One shared record behind every store, marketplace and social touchpoint',
    intro: 'Customers move between channels mid-journey. See what each channel contributes and what the shared systems must keep aligned so the customer’s context is not lost.',
    spec: {
      layout: 'ecosystem', title: 'Omnichannel Integration and the Convergence of Retail Channels', kicker: '',
      center: { label: 'Unified commerce systems', detail: 'Connected product, order, payment, inventory and customer records' },
      actors: [
        { label: 'Marketplaces', relation: 'Add reach; listings must show accurate availability', flows: ['product', 'money'] },
        { label: 'Brand-owned store and app', relation: 'Direct commerce and integrated loyalty across eligible channels', flows: ['money', 'information'] },
        { label: 'Physical stores', relation: 'Act as pickup, return and ship-from-store nodes', flows: ['product', 'service'] },
        { label: 'Social channels', relation: 'Diversify acquisition through discovery that draws on shared stock', flows: ['information'] },
        { label: 'Messaging', relation: 'A service touchpoint that needs the same order context', flows: ['service', 'information'] },
      ],
      note: 'More channels add reach and complexity: inventory, price, data and channel conflict need coordination. Assortment can differ by channel role without confusing customers.',
      takeaway: 'Commerce is organized around the journey, so value comes from clear channel roles, accurate availability and coherent service.',
    },
  },
  'ecom-m5-33-crossborder': {
    heading: 'What turns overseas interest into a delivered order',
    intro: 'Overseas shoppers can see a product instantly. Match each barrier to the capability that must be built into the offer from the start, not added afterwards.',
    spec: {
      layout: 'table', title: 'Cross-Border Commerce and Regional Market Expansion', kicker: '',
      headers: ['Barrier to buying', 'Capability in the offer', 'What it involves'],
      rows: [
        { label: 'Delivery cost and time', a: 'Regional fulfillment', b: 'Warehouses or partners closer to target markets' },
        { label: 'Customs', a: 'Customs coordination', b: 'Declarations, duties, taxes and documentation' },
        { label: 'Returns', a: 'Cross-border returns', b: 'Refund and product recovery across countries' },
        { label: 'Trust', a: 'Localized storefront', b: 'Language, currency, pricing, payment and support suited to the market' },
        { label: 'Destination rules', a: 'Compliance by design', b: 'Destination requirements built into listings, shipping and returns' },
      ],
      note: 'DHL’s 2026 commercial survey: 70% of surveyed shoppers buy internationally, up from 60% in 2025, and 45% buy across borders more than monthly; not official trade statistics.',
      takeaway: 'International growth works when localization, compliance and delivery feel as dependable as a domestic order.',
    },
  },
  'ecom-m5-41-regulation': {
    heading: 'Platform duties toward sellers, buyers and the state under Vietnam’s new e-commerce law',
    intro: 'Vietnam’s e-commerce law and its implementing decree took effect on 1 July 2026. Look at each relationship around the platform and the operating workflow it now needs.',
    spec: {
      layout: 'ecosystem', title: 'E-Commerce Regulation, Consumer Protection and Platform Accountability', kicker: '',
      center: { label: 'Platform operator', detail: 'Accountable for rules, information, complaints, records and violations' },
      actors: [
        { label: 'Sellers', relation: 'Seller verification where required; action on violations', flows: ['oversight', 'information'] },
        { label: 'Consumers', relation: 'Accurate product information, complaint handling and dispute access', flows: ['service', 'information'] },
        { label: 'Livestream and affiliate partners', relation: 'Truthful product claims and disclosed commercial relationships', flows: ['information', 'money'] },
        { label: 'Foreign sellers and imported goods', relation: 'Cross-border seller and product requirements', flows: ['product', 'oversight'] },
        { label: 'Tax obligations', relation: 'Records, reporting and payment duties', flows: ['money', 'information'] },
        { label: 'Government and MOIT', relation: 'Law and decree set duties; MOIT summarizes implementation', flows: ['oversight'] },
      ],
      note: 'Law 122/2025/QH15 and Decree 248/2026/ND-CP took effect on 1 July 2026, verified against official Government records on 25 October 2026; operating duties follow MOIT’s 3 July 2026 summary.',
      takeaway: 'Compliance is becoming a platform capability built into onboarding, moderation and records, not a back-office checklist.',
    },
  },
  'ecom-m5-42-sustainability': {
    heading: 'Delivery footprint depends on the whole system, not a green label',
    intro: 'A parcel’s environmental outcome comes from several operating choices at once. Look for the drivers that also cut cost or returns, since those improve margin and impact together.',
    spec: {
      layout: 'driverTree', title: 'Sustainability, Green Logistics and Circular Commerce', kicker: '',
      root: { label: 'Measured environmental outcome of delivery', detail: 'Tracked across packaging, transport and returns rather than claimed from one change' },
      drivers: [
        { label: 'Distance', detail: 'How far each parcel travels to the customer' },
        { label: 'Consolidation', detail: 'Combine deliveries to reduce trips or packaging' },
        { label: 'Packaging', detail: 'Right-sized, suitable materials that still keep goods safe' },
        { label: 'Utilization', detail: 'How fully routes and vehicles are used' },
        { label: 'Returns', detail: 'Accurate descriptions, sizing and quality prevent reverse trips and waste' },
      ],
      note: 'Circular models (resale, refurbishment, repair, reuse) can extend product life. No emissions benchmark is claimed; communicate improvements with evidence to avoid greenwashing.',
      takeaway: 'Sustainability creates value when measured gains in packaging, routes and returns also protect safety, reliability and margin.',
    },
  },
  'ecom-m5-43-data': {
    heading: 'Matching each data-governance control to the exposure it contains',
    intro: 'Personalization, partners and AI all widen who touches customer data. Read across each row to see which exposure a control limits.',
    spec: {
      layout: 'table', title: 'Data Privacy, Cybersecurity and Responsible Digital Governance', kicker: '',
      headers: ['Control', 'How it works', 'Exposure it limits'],
      rows: [
        { label: 'Privacy-conscious personalization', a: 'Appropriate use, notice and choice for each data use', b: 'Misuse of account and behavior data' },
        { label: 'Access control', a: 'Access limited by role and need', b: 'Unnecessary exposure of sensitive records' },
        { label: 'Security monitoring', a: 'Detect suspicious and unauthorized activity', b: 'Threats going unnoticed' },
        { label: 'Third-party risk review', a: 'Partner selection, contracts, technical controls and monitoring', b: 'Harm caused through a partner system' },
        { label: 'AI governance', a: 'Controls on model data, reliability, transparency and harm', b: 'Automation risk' },
        { label: 'Incident preparedness', a: 'Response, recovery and communication procedures', b: 'Prolonged disruption and trust damage' },
      ],
      note: 'E-commerce data spans account, behavior, payment, delivery and seller information; applicable privacy, cybersecurity and e-commerce requirements vary by jurisdiction.',
      takeaway: 'Data-driven growth lasts when security, transparency, customer rights and continuity are governed alongside personalization.',
    },
  },
  'ecom-m5-51-global': {
    heading: 'Where the next wave of digital commerce demand comes from',
    intro: 'The growth sources differ in maturity and evidence. Group them by the kind of growth they add, then ask how much confidence each deserves before capital is allocated.',
    spec: {
      layout: 'taxonomy', title: 'Global Growth Outlook and Emerging Sources of Demand', kicker: '',
      root: 'Sources of future e-commerce demand', rootDetail: 'Quality, profitability and accessibility, not transaction count alone',
      groups: [
        { label: 'Broader participation', items: ['Digital adoption by less-connected groups and regions', 'Cross-border trade with overseas consumers'] },
        { label: 'New forms of commerce', items: ['Social commerce', 'AI-enabled commerce', 'Circular commerce'] },
        { label: 'Wider transaction scope', items: ['B2B digitalization of procurement and suppliers'] },
        { label: 'Mature-market priorities', items: ['Efficiency', 'Retention', 'Profitability', 'Customer experience'] },
      ],
      note: 'Classify each source as established, emerging or speculative before investing: a survey signal, current behavior and a long-term technology scenario carry different evidence strength. No universal growth forecast is claimed.',
      takeaway: 'Growth will vary by market and category, and investment should follow the maturity of the evidence.',
    },
  },
  'ecom-m5-52-vietnam': {
    heading: 'MOIT 2025 and VECOM 2024 figures are not one trend line',
    intro: 'The two headline numbers look like consecutive years but come from different publishers and methods. Compare scope row by row instead of reading a change between them.',
    spec: {
      layout: 'compare', title: 'Vietnam E-Commerce Growth Outlook and Market Opportunities', kicker: '',
      leftTitle: 'MOIT estimate for 2025', rightTitle: 'VECOM estimate for 2024',
      rows: [
        { label: 'Total market', a: 'About US$31B', b: 'US$32B' },
        { label: 'Retail share', a: 'About 11% of retail goods and consumer-service revenue', b: 'About 12% of the broad retail denominator' },
        { label: 'Online retail goods', a: 'Not stated in the cited communication', b: 'US$22.5B' },
        { label: 'Publisher and source', a: 'Official ministry communication', b: 'EBI 2025, quoted in a separate MOIT article' },
      ],
      note: 'VECOM’s higher 2024 figure does not show contraction: publishers and methodologies differ, so each figure is contextual evidence only.',
      takeaway: 'Vietnam’s opportunity is real, but the next phase rewards seller productivity, trusted transactions and sustainable economics over promotion-led expansion.',
    },
  },
  'ecom-m5-53-priorities': {
    heading: 'Screening a popular trend before it becomes a funded priority',
    intro: 'Run a candidate opportunity through the business-specific filters. Watch where a popular idea fails, and where the same idea suits a different kind of participant.',
    spec: {
      layout: 'decision', title: 'Strategic Opportunities and Priorities for Industry Participants', kicker: '',
      root: { label: 'Candidate opportunity', detail: 'Experience, AI, channels, seller enablement, cross-border, circular or performance-led investment' },
      question: 'After all seven filters, do customer demand, capability and economics align?',
      branches: [
        { condition: 'Yes, all three align', outcome: 'Prioritize with performance-led investment', detail: 'Fund against clear outcomes, then measure, learn and reallocate', tone: 'positive' },
        { condition: 'Fits another participant better', outcome: 'Choose a different subset', detail: 'An SME may favor differentiated products and selected channels; a platform, seller tools, trust and logistics', tone: 'caution' },
        { condition: 'Popular but fails a filter', outcome: 'Not a priority for this business', detail: 'Its capital, people and integration capacity would be taken from stronger initiatives', tone: 'negative' },
      ],
      note: 'The seven filters: customer need, competition, capability, financial feasibility, regulatory exposure, long-term differentiation and performance measures.',
      takeaway: 'The strongest opportunity connects an identifiable need with capabilities the business can deliver reliably and profitably.',
    },
  },
};
