import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Coffee & Foodservice Retail Module 05, keyed by visualKind. */
export const COFFEE_M5_VISUALS: Record<string, ChapterVisual> = {
  'coffee-m5-11-experience': {
    heading: 'A photogenic café still has to earn its seats',
    intro: 'People choose a café for the place as much as the drink. Follow how four experience choices must end in visits and spending that cover their cost.',
    spec: {
      layout: 'pathway', title: 'Experience-Driven Consumption and Lifestyle Integration', kicker: '',
      trunk: [
        { label: 'Café as a place to stay', detail: 'Customers socialise, study, work remotely, meet and unwind, not only drink', kind: 'stage' },
      ],
      optionsLabel: 'Experience choices operators make',
      options: [
        { label: 'Experience-based store design', detail: 'Distinct spaces for socialising, studying, remote work or premium coffee appreciation' },
        { label: 'Occasion-based marketing', detail: 'Offers for morning routines, afternoon breaks, group gatherings and evening visits' },
        { label: 'Community building', detail: 'Workshops, tastings and music nights; Starbucks’ Siren Calling concert drew 12,000 people' },
        { label: 'Experience consistency', detail: 'Ambience, service, presentation and communication aligned across locations' },
      ],
      afterLabel: 'The test it must pass',
      after: [
        { label: 'Visits and spend cover the cost', detail: 'Food, events or pricing lift spend when guests buy one drink and stay for hours', kind: 'outcome' },
      ],
      note: 'iPOS.vn found only 14.24% of diners had tried none of the listed trends in the first half of 2026, a survey share. Students interviewed in 2025 visited two to four times a week for VND 45,000–65,000 drinks; interviews, not a survey.',
      takeaway: 'Experience becomes part of the product only when the traffic and spending it attracts justify what it costs.',
    },
  },
  'coffee-m5-12-value': {
    heading: 'Where the drink price ladder is gaining and losing diners',
    intro: 'Diners moved out of the cheapest drink band and into the middle. Read each rung of the ladder alongside the evidence of what customers will pay for.',
    spec: {
      layout: 'table', title: 'Value-Conscious Consumption and Premiumization', kicker: '',
      headers: ['Rung of the ladder', 'What it must offer', 'Vietnam signal'],
      rows: [
        { label: 'Entry-level drinks', a: 'An affordable price that still feels worth it', b: 'Diners spending under VND 35,000 fell from 41.64% to 29.44%' },
        { label: 'Core bestsellers', a: 'Demand, contribution margin and simple preparation together', b: 'Diners spending VND 36,000–70,000 rose from 48.29% to 61.78%' },
        { label: 'Premium options', a: 'Specialty coffee, signature or seasonal drinks, traceable ingredients', b: 'Starbucks near VND 90,000 for a medium drink (BBC, 2023)' },
        { label: 'Affordable bundles', a: 'Drinks paired with bakery, snacks or meals for perceived value', b: 'Receipts with food averaged VND 162,000 against VND 88,000 drink only; small sample' },
      ],
      note: 'Spending shares are iPOS.vn survey shares of diners for the first half of 2026, not sales values, and the earlier point is undated. The VND 21,000–35,000 band is squeezed between VND 7,000–15,000 kiosks and mid-tier brands.',
      takeaway: 'Customers trade into the middle when the benefit is visible, so every price point needs a clear reason.',
    },
  },
  'coffee-m5-13-personalisation': {
    heading: 'Drink choices customers want, kept simple enough to make',
    intro: 'Personalisation reaches the cup, the label, the customer data and the packaging. In each group, look for options that add relevance without slowing the line.',
    spec: {
      layout: 'taxonomy', title: 'Health, Personalization, and Responsible Consumption', kicker: '',
      root: 'Personalisation without friction', rootDetail: 'Relevant choices a store can deliver quickly, accurately and lawfully',
      groups: [
        { label: 'Customisable menus', items: ['Sweetness and ice', 'Milk and serving size', 'Selected add-ons'] },
        { label: 'Health-oriented options', items: ['Lower-sugar recipes tested against demand', 'Lighter drinks', 'Ingredient alternatives'] },
        { label: 'Transparent product information', items: ['Ingredients and allergens', 'Serving sizes', 'Nutritional information'] },
        { label: 'Responsible data use', items: ['Loyalty programmes holding preferences', 'Clear, specific, recorded consent', 'Silence or default consent not allowed'] },
        { label: 'Responsible consumption', items: ['Starbucks: VND 10,000 off and 2 bonus Stars for a reusable cup', 'Starbucks: VND 500 per paper bag', 'Highlands: VND 8,000 off for a personal cup'] },
      ],
      note: 'Law 91/2025/QH15 took effect on 1 January 2026; Decree 330/2026/ND-CP sets fines of VND 30–50 million for processing without valid consent. Cup offers are company promotions, and no Vietnam data on lower-sugar demand was found.',
      takeaway: 'Every extra option adds stock, training and errors, so offer a short list of clear choices that customers actually want.',
    },
  },
  'coffee-m5-21-digital': {
    heading: 'A coffee app pays only if identified customers come back',
    intro: 'Downloads and sign-ups are not the score. Trace digital value to repeat visits, bigger baskets and service gains, net of what each channel costs.',
    spec: {
      layout: 'driverTree', title: 'Digital Ordering, Loyalty, and Customer Data', kicker: '',
      root: { label: 'Value from digital channels', detail: 'Incremental sales, retention and service efficiency, not adoption counts' },
      formula: 'Digital value = incremental sales + retention + service efficiency − channel costs',
      drivers: [
        { label: 'Digital ordering', detail: 'QR ordering, pre-ordering and self-service counters at chains with more than 100 outlets', op: '+' },
        { label: 'Loyalty integration', detail: 'HighlandsĐI from 19 December 2025 with tiers on 12-month spend; Phúc Long one point per VND 10,000', op: '+' },
        { label: 'Customer analytics', detail: 'A vendor-reported Zalo Mini App campaign drew over 2 million users and identified 56.9%', op: '+' },
        { label: 'Channel costs', detail: 'Delivery commissions of 20–30% before advertising, plus promotions and own-technology upkeep', op: '−' },
      ],
      note: 'Jollibee Group says most Highlands digital sales so far transacted through third-party aggregators, with the app a growing share. Law 91/2025/QH15 now requires recorded consent for the data these tools collect.',
      takeaway: 'Judge digital tools by the repeat purchases and savings they create, measured after channel costs.',
    },
  },
  'coffee-m5-22-automation': {
    heading: 'Standard recipes first, robot arms second',
    intro: 'A machine repeats whatever process it is given. Check whether the basics are in place before deciding where automation earns its cost.',
    spec: {
      layout: 'decision', title: 'Automation, AI, and Smart Store Operations', kicker: '',
      root: { label: 'Automation or AI proposal', detail: 'Beverage machines, demand forecasting, integrated store management or performance monitoring' },
      question: 'Are recipes, portions, ordering flow and data already standard and reliable?',
      branches: [
        { condition: 'Yes, and the step is costly', outcome: 'Automate where time, waste or errors are high', detail: 'Chagee’s QR-coded cups let machines mix drinks in seconds with little staff input', tone: 'positive' },
        { condition: 'No, processes still vary', outcome: 'Fix process and data first', detail: 'Automation only repeats variation faster; forecasting needs reliable data and staff training', tone: 'negative' },
        { condition: 'Peak demand exceeds one machine', outcome: 'Plan for the bottleneck', detail: 'One robot café makes a drink in about two minutes, yet peak waits can pass 10 minutes', tone: 'caution' },
      ],
      note: 'The robot café is a single Ho Chi Minh City shop, open about a month in March 2026, not a market trend. Highlands’ best-in-class store profitability is a company claim; no Vietnam chain data on forecast accuracy was found.',
      takeaway: 'Automation pays where standard processes already exist and returns can be measured; otherwise it speeds up inconsistency.',
    },
  },
  'coffee-m5-23-innovation': {
    heading: 'How a trending drink earns a permanent menu slot',
    intro: 'A new flavour can be copied within weeks. Follow the test-and-measure loop that decides whether an item stays, changes or leaves the menu.',
    spec: {
      layout: 'flow', title: 'Product Innovation and Data-Driven Menu Development', kicker: '',
      steps: [
        { label: 'Source the idea', detail: 'Trends, signature drinks or regional coffee, tea, fruit and spices', kind: 'stage' },
        { label: 'Limited-time launch', detail: 'A temporary listing tests real demand before any permanent slot', kind: 'stage' },
        { label: 'Menu performance analysis', detail: 'Sales volume, gross margin, repeat purchase, preparation time and ingredient overlap', kind: 'stage' },
        { label: 'Keep, refine or remove', detail: 'Weigh earnings per hour of bar time against complexity and waste', kind: 'decision' },
        { label: 'Rapid iteration', detail: 'Recipes, pricing, packaging and serving format adjusted from store results and feedback', kind: 'stage' },
        { label: 'Permanent menu item', detail: 'Sells repeatedly at a good margin without slowing the bar', kind: 'outcome' },
      ],
      loop: 'Rivals imitate quickly: ultra-cheap fixed-price drinks topped the iPOS.vn first-half 2026 trend ranking at 39.19%, and takeaway kiosks advertise VND 7,000 drinks.',
      note: 'Starbucks now launches trend items such as salt coffee, coconut coffee and matcha. No public Vietnam data on limited-time-product results was found.',
      takeaway: 'Innovation counts when it is commercially repeatable: attention without margin or simplicity does not last.',
    },
  },
  'coffee-m5-31-omnichannel': {
    heading: 'Every channel brings the cup to the customer at a different cost',
    intro: 'The same customer may sit in, take away and order delivery in one week. Look at what each channel brings to the operation and what it takes from the order.',
    spec: {
      layout: 'ecosystem', title: 'Omnichannel Consumption and Delivery-Led Fulfillment', kicker: '',
      center: { label: 'One store’s fulfilment operation', detail: 'A single bar serving dine-in, takeaway, owned-app and delivery orders' },
      actors: [
        { label: 'Dine-in customers', relation: 'Social and experiential visits; slowed when delivery orders congest the bar', flows: ['money', 'service'] },
        { label: 'Takeaway customers', relation: 'Home, office and on-the-go convenience; Euromonitor headings call takeaway and delivery dominant', flows: ['money', 'product'] },
        { label: 'Owned app and direct ordering', relation: 'HighlandsĐI pre-order and prepaid top-up since 19 December 2025; first-party data', flows: ['money', 'information'] },
        { label: 'ShopeeFood and GrabFood', relation: 'Reach at 48% of delivery each in 2025, for commissions of 20–30% before advertising', flows: ['product', 'money'] },
        { label: 'beFood and new entrants', relation: 'beFood held 4%; Xanh SM Ngon entered in June 2025', flows: ['product'] },
      ],
      note: 'Vietnamese consumers spent US$2.1 billion on online food delivery in 2025, up 19% (Momentum Works); this covers all food, not coffee alone. No public data on coffee delivery margins or packaging cost was found.',
      takeaway: 'Judge each channel by contribution per order after commissions, packaging, discounts and congestion, not by order volume.',
    },
  },
  'coffee-m5-32-expansion': {
    heading: 'From an opening boom to pruning weak coffee sites',
    intro: 'Chain growth has moved from opening everywhere to closing weak stores and opening selectively. Read the dates to see how expansion became disciplined.',
    spec: {
      layout: 'timeline', title: 'Chain Expansion, Market Consolidation, and Geographic Diversification', kicker: '',
      events: [
        { period: '2021–23', label: 'Chain opening boom', detail: 'Mixue reaches around 1,000 Vietnam outlets by 2023', status: 'historical' },
        { period: 'Mid-2025', label: 'Starbucks enters the Mekong Delta', detail: 'Five stores open, diversifying beyond the largest cities', status: 'historical' },
        { period: 'Early 2026', label: 'Underperforming stores close', detail: 'Insight Asia sees rebalancing with localised saturation; Mixue closed more than 400 stores worldwide', status: 'historical' },
        { period: 'First half of 2026', label: 'Outlet count steadies', detail: 'About 329,200 F&B outlets, down 0.1% from end-2025; about 43% report lower revenue', status: 'historical' },
        { period: 'June 2026', label: 'Highlands opens its 1,000th outlet', detail: 'Same-store sales rose 11.5% in the second quarter', status: 'historical' },
        { period: 'Second half of 2026', label: 'Expansion appetite eases', detail: '52.01% of F&B businesses plan to expand, down from 57.31%', status: 'current' },
      ],
      note: 'Outlet counts and expansion plans are iPOS.vn survey figures; Highlands’ milestone and same-store sales are company figures reported by the press. Phúc Long, with 220 standalone outlets, plans 40–50 openings focused on Hanoi.',
      takeaway: 'Store count is no longer the scoreboard: chains that open on proven unit economics and prune weak sites gain share.',
    },
  },
  'coffee-m5-33-formats': {
    heading: 'Kiosk or destination café: one drink, two businesses',
    intro: 'A four-square-metre kiosk and a destination café can sell an identical cup. Compare what drives profit in each before copying one model onto another site.',
    spec: {
      layout: 'compare', title: 'Hybrid Formats, Convenience, and New Consumption Occasions', kicker: '',
      leftTitle: 'Compact kiosk or takeaway store', rightTitle: 'Destination café',
      rows: [
        { label: 'What decides profit', a: 'Volume, low rent, lean staffing and speed', b: 'Average spend and longer visits' },
        { label: 'Menu and occasion', a: 'Short menu for routine, commuter and high-frequency purchases', b: 'Food, ambience, events or specialty products' },
        { label: 'Vietnam example', a: 'E-Coffee formats from about 4 m²; VND 7,000 drinks near schools', b: 'Phúc Long’s Unicorn format; Starbucks Reserve at Bitexco, April 2025' },
        { label: 'Hybrid variant', a: 'Phúc Long kiosks inside WinMart supermarkets', b: 'A robot café combined with a self-service flower shop' },
        { label: 'What a pilot measures', a: 'Sales density, labour productivity and payback', b: 'Investment, food sales and payback' },
      ],
      note: 'Highlands opened Vietnam’s first drive-through in 2025, and Jollibee Group says its mostly company-owned network can expand through more capital-efficient formats. No public Vietnam data on payback by format was found.',
      takeaway: 'Match each format to a defined occasion and its own financial model rather than one store design everywhere.',
    },
  },
  'coffee-m5-41-foodsafety': {
    heading: 'Following an ingredient from supplier to cup, on record',
    intro: 'Fifty stores cannot run on one owner’s habits. Follow the controls an ingredient passes through and how rule changes feed back into store procedures.',
    spec: {
      layout: 'flow', title: 'Food Safety, Traceability, and Regulatory Compliance', kicker: '',
      steps: [
        { label: 'Supplier verification', detail: 'Qualifications, ingredient specifications, certificates and traceability documents checked', kind: 'stage' },
        { label: 'Receiving and storage', detail: 'Documented receiving checks and storage temperatures', kind: 'stage' },
        { label: 'Preparation and sanitation', detail: 'Hygiene, allergen handling, cleaning schedules and equipment maintenance by trained staff', kind: 'stage' },
        { label: 'Inspection and records', detail: 'Routine internal inspections and records anyone can audit', kind: 'stage' },
        { label: 'Trusted, consistent network', detail: 'Lower contamination, quality and reputation risk as stores and menus grow', kind: 'outcome' },
      ],
      loop: 'Rules change: Decree 70/2025/ND-CP extended e-invoices to qualifying restaurants from 1 June 2025, and a secondary source reports it was replaced from 1 July 2026. A register naming each rule, source, date and checker keeps procedures current.',
      note: 'A food safety compliance certificate file is stated to take 20 working days. 57.11% of iPOS.vn survey operators were concerned about e-invoicing and tax rules. Highlands’ FSSC 22000, ISO 22000 and HACCP roastery systems are a company claim.',
      takeaway: 'Compliance scales only as a daily operating system built into supplier checks and store routines.',
    },
  },
  'coffee-m5-42-sustainability': {
    heading: 'Bag fees versus cup rewards: two nudges toward less waste',
    intro: 'Coffee chains in Vietnam use both a charge and a discount to change packaging habits. Compare how each works and what would prove it cuts waste.',
    spec: {
      layout: 'compare', title: 'Sustainable Packaging, Waste Reduction, and Resource Efficiency', kicker: '',
      leftTitle: 'Charge a fee', rightTitle: 'Reward reuse',
      rows: [
        { label: 'How it changes behaviour', a: 'Through a cost; lands better when the money goes to a visible cause', b: 'Through a benefit for bringing a cup or bottle' },
        { label: 'Vietnam example', a: 'Starbucks charges VND 500 per paper bag since 26 December 2024', b: 'Starbucks VND 10,000 off and 2 bonus Stars; Highlands VND 8,000 off' },
        { label: 'What proves it works', a: 'Bags avoided per store', b: 'Cups reused per store' },
        { label: 'What it depends on', a: 'Customer acceptance and the actual impact of materials', b: 'Cost, customer adoption, hygiene and collection infrastructure' },
      ],
      note: 'Around 30 billion nylon bags are used in Vietnam each year, 80% discarded after one use (association estimate, 2023). Cup offers, including Passio’s VND 10,000 off through 31 December 2026, are promotions whose current terms were not checked.',
      takeaway: 'A sustainability initiative is credible only with a measure such as bags avoided or cups reused; otherwise it is a claim.',
    },
  },
  'coffee-m5-43-governance': {
    heading: 'The promises a coffee chain makes and how it keeps them',
    intro: 'Every promotion, loyalty sign-up and franchise deal is a promise to someone. Read what each area requires and where Vietnamese rules or cases already apply.',
    spec: {
      layout: 'table', title: 'Responsible Marketing, Consumer Data, and Corporate Governance', kicker: '',
      headers: ['Area of trust', 'What it requires', 'Vietnam evidence'],
      rows: [
        { label: 'Transparent promotions', a: 'Clear conditions, eligibility, expiry dates and limitations', b: 'No coffeehouse complaint or enforcement data found' },
        { label: 'Data governance', a: 'Limited collection, managed access and verifiable consent with records kept', b: 'Law 91/2025/QH15 from 1 January 2026; VND 30–50 million for no valid consent or log' },
        { label: 'Responsible product claims', a: 'Accurate, supported health, nutrition, origin and sustainability statements', b: 'No claim-enforcement data found' },
        { label: 'Partner oversight', a: 'Operating standards for franchisees, delivery partners, suppliers and agencies', b: 'Milano describes disputes when agents mix in outside products; E-Coffee runs a zero-fee franchise' },
      ],
      note: 'Fines rise to VND 50–70 million for continuing after a request to stop, and reach VND 3 billion for most other violations. These are legal maxima, not typical outcomes; small businesses have partial exemptions.',
      takeaway: 'A well-kept consent log and clear partner standards cost less than a dispute and protect customer loyalty.',
    },
  },
  'coffee-m5-51-growth': {
    heading: 'Telling real coffee demand apart from price, promotion and new stores',
    intro: 'Revenue can rise without more customers wanting more coffee. Split reported growth into its sources and read each market figure at its own scope.',
    spec: {
      layout: 'driverTree', title: 'Market Growth, Demand Drivers, and Future Prospects', kicker: '',
      root: { label: 'Reported chain sales growth', detail: 'Momentum Works: coffee chains US$725 million (+27%), tea chains US$617 million (+28%) in 2025' },
      formula: 'Sales growth = demand expansion + price increases + promotions + outlet additions',
      drivers: [
        { label: 'Genuine demand expansion', detail: 'More or higher-value demand, helped by nearly 21.2 million international visitors in 2025', op: '+' },
        { label: 'Price increases', detail: 'Higher tickets as rent, labour and ingredient costs rise; Region I minimum wage VND 5.31 million a month', op: '+' },
        { label: 'Promotions', detail: 'Discount-led sales that may not repeat at full price', op: '+' },
        { label: 'Outlet additions', detail: 'Phúc Long’s 2026 target relies partly on 40–50 new stores, a company aim', op: '+' },
      ],
      note: 'Chain figures cover branded chains only, not independent cafés or restaurants. iPOS.vn estimated all F&B revenue at VND 432.7 trillion in the first half of 2026, up 6.55%, yet about 43% of outlets reported lower revenue.',
      takeaway: 'Only demand expansion captured at a sound store contribution makes growth durable; price- and outlet-led growth can hide weak demand.',
    },
  },
  'coffee-m5-52-valuechain': {
    heading: 'Own the roastery or buy from a trusted roaster?',
    intro: 'Advantage in coffee can start at the farm and the roastery, not only the counter. Use one test to decide which stages to own and which to partner on.',
    spec: {
      layout: 'decision', title: 'Strategic Opportunities Across the Value Chain', kicker: '',
      root: { label: 'A value-chain stage', detail: 'Sourcing, roasting, packaged products, distribution, partnerships or new revenue streams' },
      question: 'Does the stage strongly affect quality, cost or reliability, and can the business use the capacity?',
      branches: [
        { condition: 'Yes to both', outcome: 'Own or tightly coordinate it', detail: 'Highlands’ VND 500 billion roastery near Cái Mép: about 10,000 tonnes initially, potential for 75,000', tone: 'positive' },
        { condition: 'Important, but volume too small', outcome: 'Partner with a trusted supplier', detail: 'A single café buys from a trusted roaster; Phúc Long kiosks sit inside WinMart supermarkets', tone: 'caution' },
        { condition: 'Demand not yet validated', outcome: 'Hold the new revenue stream', detail: 'Catering, corporate and event services need proven demand; no Vietnam data was found', tone: 'negative' },
      ],
      note: 'USDA estimates Vietnam produced about 31.7 million bags of coffee in 2025/26 and used 4.9 million at home; customs-based processed-coffee exports were US$1.78 billion in 2025, up 50.4%.',
      takeaway: 'Advantage comes from coordinating the stages that shape quality, cost and reliability, not from owning every step.',
    },
  },
  'coffee-m5-53-priorities': {
    heading: 'Layering durable coffee advantage, with emphasis set by size',
    intro: 'A distinctive concept gets noticed; a system gets paid. Follow a sensible order of priorities, then see how the emphasis differs by type of business.',
    spec: {
      layout: 'pathway', title: 'Strategic Priorities for Sustainable Competitive Advantage', kicker: '',
      trunk: [
        { label: 'Strategic positioning', detail: 'Target customer, core occasion, price tier and reasons to choose the brand', kind: 'stage' },
        { label: 'Operational excellence', detail: 'Standard recipes, training, procurement, quality control and store monitoring', kind: 'stage' },
        { label: 'Customer retention', detail: 'Consistent value, relevant rewards, service quality and engagement', kind: 'stage' },
        { label: 'Financial discipline', detail: 'Contribution margins, rent-to-sales, labour productivity, inventory loss and payback', kind: 'stage' },
      ],
      optionsLabel: 'Emphasis by type of business',
      options: [
        { label: 'Independent café', detail: 'A focused concept and close customer relationships' },
        { label: 'Larger chain', detail: 'Standardised execution, procurement scale, portfolio optimisation and integrated customer data' },
        { label: 'Low-price kiosk', detail: 'Wins on tight cost control' },
      ],
      afterLabel: 'As the network grows',
      after: [
        { label: 'Capability development', detail: 'Management systems, training, digital infrastructure and leadership pipelines', kind: 'outcome' },
      ],
      note: 'The order is a teaching suggestion. Phúc Long targets 2026 EBITDA of VND 370–418 billion on revenue of VND 2,300–2,500 billion, and Highlands aims to list in Vietnam in Q1 2027; both are company aims.',
      takeaway: 'Differentiation attracts customers, but execution discipline and sound economics make that attraction last.',
    },
  },
};
