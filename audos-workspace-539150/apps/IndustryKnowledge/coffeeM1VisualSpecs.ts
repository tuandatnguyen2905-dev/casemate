import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Coffee & Foodservice Retail Module 01, keyed by visualKind. */
export const COFFEE_M1_VISUALS: Record<string, ChapterVisual> = {
  'coffee-m1-11-definition': {
    heading: 'Why a café tracks customers, visits and spend together',
    intro: 'Sales equal customers times visits times spend. See which of the five core activities feeds each part, and why improving only one can hide a weakness in another.',
    spec: {
      layout: 'driverTree', title: 'Industry Definition and Core Characteristics', kicker: '',
      root: { label: 'Store sales and performance', detail: 'Experience-driven, location-sensitive and operationally intensive' },
      formula: 'Sales = customers × visits × spend',
      drivers: [
        { label: 'Customer traffic', detail: 'How many people come', op: '×', children: [{ label: 'Retail transactions', detail: 'Dine-in, takeaway, drive-through, click-and-collect and delivery' }] },
        { label: 'Repeat visits', detail: 'Whether customers return', op: '×', children: [{ label: 'Customer relationships', detail: 'Loyalty programmes, an app and personalised offers' }, { label: 'Hospitality and experience', detail: 'Seating, ambience and a place to meet, study or work' }] },
        { label: 'Average transaction value', detail: 'What each visit spends', op: '×', children: [{ label: 'Beverage preparation', detail: 'Espresso-based drinks, brewed coffee, tea and seasonal specials' }, { label: 'Food preparation and service', detail: 'Pastries, sandwiches, desserts and light meals' }] },
        { label: 'Store-level productivity', detail: 'What the site earns for the space and staff used', op: '•' },
      ],
      note: 'Euromonitor puts Vietnam’s consumer foodservice at VND 678 trillion in 2025, up 5% in current terms; a separate survey estimates about 329,500 outlets. Different definitions, so do not combine them.',
      takeaway: 'Performance comes from traffic, ticket, repeat visits and store productivity together, not from the menu alone.',
    },
  },
  'coffee-m1-12-categories': {
    heading: 'Six formats chasing the same VND 40,000 morning drink',
    intro: 'A café, a bakery and a fast-food outlet can compete for one customer occasion. See what each format offers the customer deciding where to spend.',
    spec: {
      layout: 'ecosystem', title: 'Industry Scope and Business Categories', kicker: '',
      center: { label: 'One customer occasion', detail: 'A morning drink worth VND 40,000, bought wherever it fits best' },
      actors: [
        { label: 'Specialty coffeehouses', relation: 'Win on espresso quality, brewing methods and origin', flows: ['product'] },
        { label: 'Mainstream café chains', relation: 'Standard menus and consistent service across many stores', flows: ['product', 'service'] },
        { label: 'Independent cafés', relation: 'Local identity and owner-led service', flows: ['service'] },
        { label: 'Quick-service restaurants', relation: 'Speed, takeaway and delivery; coffee-led menus for breakfast and afternoon', flows: ['product', 'service'] },
        { label: 'Casual and fast-casual dining', relation: 'Broader menus and more substantial meals', flows: ['product'] },
        { label: 'Bakery cafés and hybrids', relation: 'Coffee, pastries and seating add purchase occasions', flows: ['product', 'service'] },
      ],
      note: 'Highlands Coffee, with 985 stores at the end of 2025 (company-reported), brought the Paris Baguette bakery brand under its umbrella in 2025, a bakery-café hybrid move.',
      takeaway: 'Define rivals by customer occasion and spend, not by product label, or you miss the competitor that takes the customer.',
    },
  },
  'coffee-m1-13-models': {
    heading: 'What a coffee brand trades when partners fund its stores',
    intro: 'Company-owned chains keep control; franchised networks grow on partners’ capital. Compare the trade-offs, then see which model Highlands and Milano chose.',
    spec: {
      layout: 'compare', title: 'Revenue Models and Operating Formats', kicker: '',
      leftTitle: 'Company-owned stores', rightTitle: 'Franchised stores',
      rows: [
        { label: 'Who funds the outlet', a: 'The chain invests in each outlet', b: 'Partners fund and run outlets under the brand' },
        { label: 'Operating control', a: 'Staffing, service and pricing set directly', b: 'Brand sets standards; the partner runs the store' },
        { label: 'Expansion speed', a: 'Limited by the chain’s own capital', b: 'Faster, using partner capital' },
        { label: 'How the brand earns', a: 'Keeps store sales and carries store costs', b: 'Earns fees or royalties' },
        { label: 'Vietnam example', a: 'Highlands: 109 self-operated and 4 franchised openings, third quarter of 2025', b: 'Milano Coffee: about 2,500 outlets, largely via franchise agency' },
      ],
      note: 'Hybrid brands keep flagship stores and franchise elsewhere. Delivery commissions of 20–30% per order, as reported by restaurants, can erode either model’s margin.',
      takeaway: 'Whichever model a brand picks, growth lasts only if a repeatable store format stays profitable after rent, labour and commissions.',
    },
  },
  'coffee-m1-21-evolution': {
    heading: 'From conversation house to multi-purpose café',
    intro: 'Coffeehouses began as meeting places, and each later format added options without removing the old ones. Start at the roots, then see the four ways modern cafés branched out.',
    spec: {
      layout: 'pathway', title: 'Evolution of Coffeehouses and Modern Café Culture', kicker: '',
      trunk: [
        { label: 'Coffeehouses as meeting places', detail: 'Istanbul in 1554–55; an estimated 3,000 in England by 1675', kind: 'stage' },
        { label: 'Traditional Vietnamese coffee culture', detail: 'Coffee introduced in 1857; family-run sidewalk cafés keep local rituals', kind: 'stage' },
      ],
      optionsLabel: 'What later formats added',
      options: [
        { label: 'Branded café chains', detail: 'Standard menus, design and service; Highlands opened its first shop in 2002' },
        { label: 'Specialty roasters', detail: 'Bean origin, roasting and brewing' },
        { label: 'Lifestyle cafés', detail: 'Ambience and space to work or meet' },
        { label: 'Premium operators', detail: 'Higher prices for distinctive ingredients, craft and experience' },
      ],
      afterLabel: 'Where it stands now',
      after: [
        { label: 'Multi-purpose consumption space', detail: 'Named a leading beverage trend in the iPOS.vn survey, first half of 2026', kind: 'outcome' },
      ],
      note: 'Historical dates are indicative, from an Ottoman historian and a British Museum guide. Robusta makes up about 97% of Vietnamese production.',
      takeaway: 'Customers now visit for convenience, connection, work and brand as well as the drink, so one store format rarely fits everyone.',
    },
  },
  'coffee-m1-22-organised': {
    heading: 'How Vietnam’s coffee chains turned know-how into systems',
    intro: 'Organised chains grew by clustering stores, buying centrally and replicating formats. Follow the milestones and notice how complexity rose with every step in scale.',
    spec: {
      layout: 'timeline', title: 'Development of Organized Foodservice Retail', kicker: '',
      events: [
        { period: '1998', label: 'Trung Nguyên opens cafés in clusters of three', detail: 'Managers keep control of design, service and quality while the brand advertises', status: 'historical' },
        { period: '2009', label: 'Highlands runs 80 shops in six cities', detail: 'From a secondary company-history source', status: 'historical' },
        { period: '2012', label: 'Jollibee buys 50% of Highlands', status: 'historical' },
        { period: '2025', label: 'Roasting plant near Cai Mep port', detail: 'Reported at VND 500 billion; the first drive-through format also opens', status: 'historical' },
        { period: 'End of 2025', label: 'Highlands reaches 985 stores', detail: 'Still opening more than 100 stores a year, per the parent-company report', status: 'historical' },
      ],
      note: 'Scale brings new burdens: 57.11% of F&B operators surveyed worried about e-invoicing and standardised tax rules.',
      takeaway: 'Scale improves buying and brand visibility, but chains must standardise the core while staying relevant to local tastes.',
    },
  },
  'coffee-m1-23-digital': {
    heading: 'Every digital step in a café order adds sales and a cost',
    intro: 'Follow one order from discovery on a map to a repeat visit. At each step, ask who earns from the transaction and who holds the customer data.',
    spec: {
      layout: 'flow', title: 'Digitalization and the Omnichannel Shift', kicker: '',
      steps: [
        { label: 'Online discovery', detail: 'Search, maps, social media and creator content bring new customers', kind: 'stage' },
        { label: 'Mobile ordering', detail: 'Order before arriving, or through a delivery marketplace', kind: 'stage' },
        { label: 'Cashless payment', detail: 'Paid by phone, creating transaction data', kind: 'stage' },
        { label: 'Fulfilment', detail: 'In store, drive-through or delivery, where platforms keep a 20–30% commission', kind: 'stage' },
        { label: 'Digital loyalty', detail: 'Points, memberships and stored value reward the return visit', kind: 'outcome' },
      ],
      loop: 'Transaction data feeds back into menus, promotions, staffing and stock.',
      note: 'Online food delivery in Vietnam reached US$2.1 billion in 2025, up 19% (Momentum Works estimate, app orders only); ShopeeFood and GrabFood held 48% each and beFood 4%.',
      takeaway: 'A channel that only moves existing customers onto a commission adds cost, not profit, so own the relationship beyond paid platform traffic.',
    },
  },
  'coffee-m1-31-global-size': {
    heading: 'Global coffee estimates that measure different markets',
    intro: 'One publisher’s foodservice coffee figure is larger than another’s total coffee market. Read what each estimate counts before quoting any of them.',
    spec: {
      layout: 'table', title: 'Global Market Size and Growth', kicker: '',
      headers: ['Estimate (2025)', 'What it counts', 'Publisher and caveat'],
      rows: [
        { label: 'About US$249.3 billion', a: 'Global coffee market: retail coffee products and other channels; Europe largest at 32.5%', b: 'Grand View Research estimate' },
        { label: 'About US$524 billion', a: 'Foodservice coffee: coffee sold through foodservice settings; Asia-Pacific fastest-growing', b: 'Mordor Intelligence estimate, different basis' },
        { label: 'About US$626 billion', a: 'Foodservice coffee, with a different scope again', b: 'Fortune Business Insights estimate' },
        { label: 'US$725 million', a: 'Vietnam’s branded coffee-chain segment only, up 27%', b: 'Momentum Works, chain-only measure' },
      ],
      note: 'None of these is coffeehouse revenue, and they cannot be added or compared; publisher forecasts differ and are not used.',
      takeaway: 'Record who published a figure, what it counts and for which year, and never mix it with another estimate.',
    },
  },
  'coffee-m1-32-regions': {
    heading: 'Why a coffee model that works in one region stalls in another',
    intro: 'Regions differ in habits, incomes, infrastructure and food culture. Group them by what competition rewards, then see how brands enter and how Southeast Asia’s chain markets rank.',
    spec: {
      layout: 'taxonomy', title: 'Regional Markets and Competitive Models', kicker: '',
      root: 'Global coffeehouse and foodservice markets', rootDetail: 'No single model guarantees success everywhere',
      groups: [
        { label: 'Established markets', items: ['North America: convenience, loyalty programmes, drive-through', 'Europe: drinks, food, socialising and local hospitality'] },
        { label: 'Growth markets', items: ['Asia-Pacific: urban chains, digital ordering, local drinks', 'Emerging markets: purchasing power, infrastructure, strong independents'] },
        { label: 'Entry routes for international brands', items: ['Franchising', 'Licensing', 'Joint ventures', 'Owned stores'] },
        { label: 'Southeast Asia coffee and tea chains, 2025', items: ['Indonesia: US$3.15 billion', 'Thailand: US$2.25 billion', 'Vietnam: US$1.34 billion, third'] },
      ],
      note: 'Chain figures are Momentum Works estimates covering chains, not whole markets. Starbucks runs more than 2,000 stores across the region but about 150 in Vietnam; Café Amazon left Vietnam in November 2025.',
      takeaway: 'Adapt menus, prices, formats and service to local patterns while keeping the core brand, and test local fit before building a large network.',
    },
  },
  'coffee-m1-33-trends': {
    heading: 'Front-of-house appeal now needs back-of-house systems',
    intro: 'Brand and menu still win attention, but throughput and consistency come from systems behind the counter. Sort the five trends by where they do their work.',
    spec: {
      layout: 'taxonomy', title: 'Global Competitive and Operating Trends', kicker: '',
      root: 'Competitive and operating trends', rootDetail: 'Advantage comes from integrating them, not from any one alone',
      groups: [
        { label: 'Facing the customer', items: ['Digital customer engagement: apps, personalised offers, loyalty', 'Experience differentiation: store design, product innovation, service', 'Flexible store formats: takeaway outlets, kiosks, flagships, delivery kitchens'] },
        { label: 'Behind the counter', items: ['Operational standardisation: recipes, training, procurement', 'Supply-chain optimisation: forecast demand, cut waste, secure ingredients'] },
      ],
      note: 'A typical store serves 300–400 cups a day against 600–800 at leading chains (Momentum Works estimate). In 2025 Highlands reported same-store sales growth of more than 8%, while The Coffee House halved its store count.',
      takeaway: 'Expansion without these systems adds complexity faster than it adds value.',
    },
  },
  'coffee-m1-41-market-size': {
    heading: 'Two credible sizes for Vietnam’s eating-out market',
    intro: 'Euromonitor and the iPOS.vn survey measure eating and drinking out differently, so their totals differ. Compare what each counts before choosing one for your question.',
    spec: {
      layout: 'compare', title: 'Market Size, Growth, and Industry Structure', kicker: '',
      leftTitle: 'Euromonitor consumer foodservice', rightTitle: 'iPOS.vn and Nestlé survey',
      rows: [
        { label: 'What is counted', a: 'Cafés and bars, restaurants, cafeterias and street stalls', b: 'Total F&B revenue, from 3,001 businesses and about 3,045 diners' },
        { label: '2025 estimate', a: 'About VND 678 trillion', b: 'About VND 726.5 trillion' },
        { label: 'Growth and structure', a: 'Up 5% in current terms, not adjusted for inflation', b: 'About 329,500 outlets, up 2.0%; 65.58% of businesses stable or growing' },
      ],
      note: 'Separate estimates, not a range. In the first half of 2026 the survey found revenue of about VND 432.7 trillion, up 6.55%, yet about 43% of outlets reported lower revenue. A national-statistics figure of about VND 843.1 trillion also counts accommodation.',
      takeaway: 'In a fragmented market, aggregate growth does not guarantee returns at the individual store.',
    },
  },
  'coffee-m1-42-formats': {
    heading: 'Vietnam chain store counts measure presence, not sales',
    intro: 'Chain networks are counted at different dates and with different outlet types. Read each count with its caveat before ranking any brand.',
    spec: {
      layout: 'table', title: 'Coffeehouse Market and Leading Business Formats', kicker: '',
      headers: ['Chain', 'Reported network', 'What to keep in mind'],
      rows: [
        { label: 'Milano Coffee', a: 'About 2,500 outlets', b: 'Self-published; counts stores and points of sale, via franchise agency' },
        { label: 'Highlands Coffee', a: '985 stores at the end of 2025', b: 'Revenue up nearly 16%' },
        { label: 'Phúc Long', a: 'About 237', b: 'Nearly 200 outside its WinMart points' },
        { label: 'Starbucks', a: 'About 150', b: 'Reported at the end of 2025' },
        { label: 'Katinat', a: '114', b: 'Counted in September 2025, a different date' },
        { label: 'Trung Nguyên Legend', a: 'About 112 locations', b: 'An expected end-2025 figure' },
      ],
      note: 'Chains are one segment beside traditional, specialty, lifestyle and hybrid cafés: Momentum Works puts branded coffee chains at US$725 million in 2025, up 27%. The Coffee House halved its stores and Café Amazon exited in November 2025.',
      takeaway: 'Chain growth has been selective, so match concept, menu and store economics to a clearly defined customer.',
    },
  },
  'coffee-m1-43-behavior': {
    heading: 'One customer, a cheap weekday drink and a premium weekend café',
    intro: 'Vietnamese customers split spending by occasion rather than trading up or down. Compare the two purchase modes and the channel each leans on.',
    spec: {
      layout: 'compare', title: 'Consumer Behavior, Pricing, and Channel Development', kicker: '',
      leftTitle: 'Value-oriented purchases', rightTitle: 'Experience-led consumption',
      rows: [
        { label: 'What is bought', a: 'Entry-level drinks, lunch sets, bundles and promotions', b: 'Premium cafés, distinctive interiors and seasonal menus' },
        { label: 'Why customers pay', a: 'Routine, frequent and price-sensitive', b: 'Quality, service, location or experience justify the difference' },
        { label: 'Typical channel', a: 'Delivery and takeaway to save time', b: 'In-store ambience, social interaction and immediate consumption' },
        { label: 'Early-2026 trend signal', a: 'Ultra-cheap fixed-price drinks top the diner ranking at 39.19%', b: '24/7 coffee and garden barbecue also among the trends' },
        { label: 'Margin risk', a: 'Vouchers of up to 50% and 20–30% delivery commissions', b: 'Each visit must justify the higher price' },
      ],
      note: 'Diners planning to cut eating-out spending were nearly three times those planning to spend more (iPOS.vn, first half of 2026). A VND 100,000 delivery order at 30% commission leaves VND 70,000.',
      takeaway: 'Offer an affordable everyday option and a distinct premium experience, and control discounting and fulfilment costs across both.',
    },
  },
  'coffee-m1-51-economy': {
    heading: 'Visitors and cities create potential; confidence decides spending',
    intro: 'Income, urban growth, tourism and busier lives add potential customers, while uncertainty holds spending back. See which levers push demand up and which one brakes it.',
    spec: {
      layout: 'driverTree', title: 'Economic, Demographic, and Tourism Drivers', kicker: '',
      root: { label: 'Actual foodservice spending', detail: 'How much of the potential customer base becomes visits and spend' },
      formula: 'Spending = potential customers × purchasing power and confidence',
      drivers: [
        { label: 'Disposable income', detail: 'Supports premium drinks, specialty coffee and higher-value dining', op: '+' },
        { label: 'Urbanisation', detail: 'Dense residential and commercial areas support accessible cafés and takeaway', op: '+' },
        { label: 'Tourism', detail: 'Nearly 21.2 million international visitors in 2025, up 20.4%', op: '+', children: [{ label: 'Target for 2026', detail: '25 million visitors, a policy target rather than a forecast' }] },
        { label: 'Lifestyle changes', detail: 'Busy schedules lift takeaway and delivery; younger consumers eat out', op: '+' },
        { label: 'Economic uncertainty', detail: 'Inflation and household budgets push customers to cheaper options or fewer visits', op: '−' },
      ],
      note: 'In early 2026 nearly three times as many diners planned to cut eating-out spending as to raise it, and 69.38% of businesses faced higher raw-material costs (iPOS.vn survey).',
      takeaway: 'Match prices, formats and sites to local purchasing power and to traffic during opening hours.',
    },
  },
  'coffee-m1-52-culture': {
    heading: 'Should a trending seasonal drink go network-wide?',
    intro: 'Trends spread fast through social media and fade just as fast. Follow the test an operator can run before committing every store to a new drink.',
    spec: {
      layout: 'decision', title: 'Consumer Preferences and Sociocultural Factors', kicker: '',
      root: { label: 'Limited trial in a few stores', detail: 'A new seasonal drink offered for a limited period', kind: 'decision' },
      question: 'Do customers come back for it, not just try it once?',
      branches: [
        { condition: 'Repeat purchases hold up', outcome: 'Give it a permanent place', detail: 'It suits local taste and the brand, and customers want to repeat it', tone: 'positive' },
        { condition: 'Only first-time sales', outcome: 'Drop it with little lost', detail: 'A short-lived trend; imported concepts do not always fit', tone: 'caution' },
      ],
      note: 'Only 14.24% of diners had not tried any current trend in early 2026, and ultra-cheap fixed-price drinks led at 39.19% (iPOS.vn and Nestlé Professional survey). Café Amazon left Vietnam in November 2025.',
      takeaway: 'Lasting differentiation comes from local taste, clear identity, consistent quality and an experience worth repeating, not from chasing every trend.',
    },
  },
  'coffee-m1-53-pressures': {
    heading: 'Licences and records set how fast a café chain can open stores',
    intro: 'A new store cannot open until its licences and food-safety certificate are in place. Follow the compliance steps, then note the cost pressures that continue once it trades.',
    spec: {
      layout: 'flow', title: 'Technology, Regulation, and Environmental Pressures', kicker: '',
      steps: [
        { label: 'Prepare compliant premises', detail: 'Water, waste handling and storage meet the Law on Food Safety', kind: 'stage' },
        { label: 'Document staff health and training', detail: 'Health confirmation for owner and handlers, plus a trained-staff list', kind: 'stage' },
        { label: 'Apply for the food-safety certificate', detail: 'Processing takes 20 working days, per the official procedure summary', kind: 'stage' },
        { label: 'Connect point-of-sale e-invoicing', detail: 'Decree 70/2025/ND-CP extended it to qualifying restaurants from 1 June 2025', kind: 'stage' },
        { label: 'Open and keep systems running', detail: 'Point of sale, ordering, payments, loyalty and stock records support cost control', kind: 'outcome' },
      ],
      loop: 'Building licence, health-certificate and training records into every opening checklist turns compliance into a routine.',
      note: 'A secondary source reports that Decree 254/2026/ND-CP replaced Decree 70 from 1 July 2026, so check current rules. In the survey 57.11% of operators worried about e-invoicing and tax rules and 69.38% faced higher raw-material costs.',
      takeaway: 'Scaling without systems raises inconsistency, waste and compliance risk, so technology and compliance are part of growth, not support.',
    },
  },
};
