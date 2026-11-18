import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Non-Alcoholic Beverages Module 01, keyed by visualKind. */
export const NAB_M1_VISUALS: Record<string, ChapterVisual> = {
  'nab-def-1-ecosystem': {
    heading: 'Cheap water in, a branded drink within arm’s reach out',
    intro: 'Every beverage business runs the same four activities. Follow them in order and notice that most of the value is added after the liquid is made.',
    spec: {
      layout: 'flow', title: 'What Is the Non-Alcoholic Beverage Industry?', kicker: '',
      steps: [
        { label: 'Source inputs', detail: 'Water, sweeteners, flavours and packaging', kind: 'stage' },
        { label: 'Formulate and produce', detail: 'Often a concentrate model: the brand owner makes the concentrate, local bottlers add water', kind: 'stage' },
        { label: 'Package, distribute and market', detail: 'Bottles and cans, delivery routes and the brand people remember', kind: 'stage' },
        { label: 'Sell to consumers', detail: 'Shops, restaurants and online, at low unit prices and very high volume', kind: 'outcome' },
      ],
      loop: 'Repeat purchase closes the loop: Coca-Cola is consumed about 2.2 billion times a day, so scale rather than price earns the money.',
      note: 'The boundary is below 0.5% alcohol by volume. Transparency Market Research estimates the global market at roughly USD 1,401 billion in 2024; that is one estimate, not a settled total.',
      takeaway: 'A beverage company is an FMCG machine that turns cheap inputs into branded, packaged drinks sold again and again.',
    },
  },
  'nab-def-2-characteristics': {
    heading: 'Why the cheapest part of a soft drink is the liquid',
    intro: 'Two near-identical sodas can sell very differently. See which traits decide the impulse sale, and why taste is only one of them.',
    spec: {
      layout: 'driverTree', title: 'What Makes the Beverage Industry Unique?', kicker: '',
      root: { label: 'Winning the impulse sale', detail: 'Often decided in seconds by the brand that is top-of-mind, cold and within reach' },
      drivers: [
        { label: 'Brand top-of-mind', detail: 'Coca-Cola and Pepsi enjoy 90%+ brand awareness; shoppers buy what they remember' },
        { label: 'Distribution reach', detail: 'A drink shoppers cannot find loses; Vietnam’s traditional shops make deep local distribution decisive' },
        { label: 'Packaging economics', detail: 'The bottle or can is often the biggest cost block, roughly 25-35% of a mass-market soft drink' },
        { label: 'Cold chain and cooler', detail: 'A chilled drink at eye level drives impulse sales; owning the cooler often owns the sale' },
        { label: 'Price-pack architecture', detail: 'The right size at the right price for each channel and occasion' },
      ],
      note: 'The packaging share is an estimate attributed to the International Aluminium Institute (2024); actual shares vary by product and pack.',
      takeaway: 'Beverage companies compete on memory, availability and pack economics as much as on what is in the bottle.',
    },
  },
  'nab-def-3-scope': {
    heading: 'One alcohol rule, then a blurry edge',
    intro: 'Is drinkable yogurt a beverage? Run any drink through the 0.5% ABV test, then check whether it is a core category or an edge case that sources count differently.',
    spec: {
      layout: 'decision', title: 'Where Does the Industry Begin and End?', kicker: '',
      root: { label: 'A drink on the shelf', detail: 'Water, soda, juice, tea, a wellness shot or a flavoured milk' },
      question: 'Is it below 0.5% alcohol by volume, and which kind of drink is it?',
      branches: [
        { condition: 'Below 0.5%, core category', outcome: 'In scope', detail: 'Water, soft drinks, juices, RTD tea and coffee, energy, sports, plant-based and functional', tone: 'positive' },
        { condition: 'Below 0.5%, overlaps another industry', outcome: 'Adjacent: sometimes counted', detail: 'Drinkable dairy, cafe and foodservice drinks, wellness shots', tone: 'caution' },
        { condition: 'Above the line', outcome: 'Out of scope', detail: 'Beer, wine, spirits and traditional fermented alcoholic drinks', tone: 'negative' },
      ],
      note: 'Because firms treat the adjacent categories differently, reported market sizes range from a few hundred billion dollars to well over a trillion (Transparency Market Research, 2024; Market Research Future, 2025).',
      takeaway: 'Check the market definition and reporting period before comparing any two market-size figures.',
    },
  },
  'nab-def-4-taxonomy': {
    heading: 'One drinks shelf, five different businesses',
    intro: 'Water, soda, tea and energy drinks sit side by side but have different margins, buyers and growth. Group the brands by family before comparing them.',
    spec: {
      layout: 'taxonomy', title: 'Exploring the Beverage Product Landscape', kicker: '',
      root: 'Non-alcoholic beverage portfolio', rootDetail: 'Each family is segmented into value, mid-range and premium tiers and by need',
      groups: [
        { label: 'Water', detail: 'Still, sparkling and flavoured', items: ['Aquafina', 'La Vie', 'Dasani'] },
        { label: 'Carbonated soft drinks', items: ['Coca-Cola', 'Pepsi', '7Up', 'Sprite'] },
        { label: 'Juices, RTD tea and coffee', items: ['C2', 'Tea+', 'Canned coffee'] },
        { label: 'Energy and sports', items: ['Sting', 'Number 1', 'Red Bull', 'Pocari Sweat'] },
        { label: 'Plant-based and functional', items: ['Soy and oat drinks', 'Probiotics', 'Electrolytes'] },
      ],
      note: 'Bottled water was about 36.6% of global revenue in 2025 (Market Research Future). In Vietnam, RTD tea was 34.2% of 2023 soft-drink volume and RTD coffee grew about 18% in 2024 (Worldpanel by Numerator).',
      takeaway: 'Vietnam is tea-led, so a portfolio built on the global water-and-cola picture would miss its largest category.',
    },
  },
  'nab-def-5-matrix': {
    heading: 'The occasion picks the category before the brand does',
    intro: 'A student before an exam and a family at dinner are both beverage customers. Read each row to see what the group buys and what tips its choice.',
    spec: {
      layout: 'table', title: 'Who Drinks What—and Why?', kicker: '',
      headers: ['Customer group', 'What they reach for', 'What tips the choice'],
      rows: [
        { label: 'Young people', a: 'Energy drinks and RTD tea while studying, working late or on the go', b: 'Energy and taste; 60%+ of energy-drink buyers globally are aged 18-35' },
        { label: 'Families', a: 'Larger, value-focused packs shared at meals', b: 'Price and value' },
        { label: 'Health-conscious buyers', a: 'Low and zero-sugar, tea and functional drinks', b: 'Health perception' },
        { label: 'Impulse shoppers', a: 'An ice-cold single serve nearby', b: 'Availability: is it cold and close?' },
      ],
      note: 'About 68.4% of global demand is off-trade (bought in shops) and the rest on-trade. Vietnam’s sweetened-beverage intake per person rose roughly sevenfold between 2002 and 2017 (KenResearch, 2024).',
      takeaway: 'Demand is driven by who is buying and the need behind the moment, so portfolios target occasions, not just people.',
    },
  },
  'nab-def-hist-1-origins': {
    heading: 'How a pharmacy-counter novelty became a bottled industry',
    intro: 'Fizzy drinks began as a scientific curiosity. Trace the dates at which carbonation, branding and bottling arrived.',
    spec: {
      layout: 'timeline', title: 'From Early Refreshments to Modern Beverages', kicker: '',
      events: [
        { period: '1767', label: 'Priestley carbonates water', detail: 'Joseph Priestley creates the fizzy base that soft drinks are built on', status: 'historical' },
        { period: '1885', label: 'Dr Pepper appears', detail: 'One of the first branded soft drinks, served at soda fountains', status: 'historical' },
        { period: '1886', label: 'Coca-Cola is created in Atlanta', detail: 'Pharmacist John Stith Pemberton; drinks still mixed one glass at a time', status: 'historical' },
        { period: '1899', label: 'First Coca-Cola bottling plant', detail: 'Chattanooga, Tennessee: the drink becomes portable and consistent', status: 'historical' },
      ],
      note: 'Founding and bottling dates come from The Coca-Cola Company’s own company history.',
      takeaway: 'Science made the drink, branding made it chosen by name, and bottling made it an industry that could reach beyond one city.',
    },
  },
  'nab-def-hist-2-technology': {
    heading: 'The production breakthroughs that let a drink travel further',
    intro: 'Why can a carton of juice sit on a shelf for months? Follow the chain of technologies, each one widening how far and how cheaply drinks could go.',
    spec: {
      layout: 'flow', title: 'How Technology Transformed Beverage Production', kicker: '',
      steps: [
        { label: 'Artificial carbonation', detail: 'Creates the fizzy soft-drink category itself', kind: 'stage' },
        { label: 'Franchise bottling', detail: 'Licensed local partners fill and distribute, so one brand is produced worldwide', kind: 'stage' },
        { label: 'Pasteurisation and quality control', detail: 'Drinks become safe and consistent at industrial scale', kind: 'stage' },
        { label: 'Lighter packaging', detail: 'Heavy glass gives way to aluminium cans and PET, cutting cost', kind: 'stage' },
        { label: 'Aseptic processing', detail: 'Sterile product in sterile packs stays shelf-stable without preservatives or refrigeration', kind: 'outcome' },
      ],
      note: 'In Vietnam, Tan Hiep Phat adopted aseptic lines in the mid-2000s, letting it sell preservative-free RTD tea deep into a market with limited refrigeration.',
      takeaway: 'Carbonation created the category, bottling scaled it, and packaging plus aseptic processing decided its reach.',
    },
  },
  'nab-def-hist-3-global': {
    heading: 'Waves of new categories riding one franchise model',
    intro: 'Global beverage giants were not built in one step. See how the franchise model and heavy marketing powered each new category wave.',
    spec: {
      layout: 'pathway', title: 'The Rise of Global Beverage Brands', kicker: '',
      trunk: [
        { label: 'Franchise bottling model', detail: 'Coca-Cola and later Pepsi expand worldwide through local partners', kind: 'stage' },
        { label: 'Mass marketing', detail: 'The 1970s-80s Cola Wars define FMCG competition and TV advertising', kind: 'stage' },
      ],
      optionsLabel: 'Category waves',
      options: [
        { label: 'Cola', detail: 'Coca-Cola and Pepsi become global staples' },
        { label: 'Ready-to-drink coffee and tea', detail: 'Suntory and Kirin pioneer canned formats in Japan, 1960s-70s' },
        { label: 'Energy drinks', detail: 'Red Bull, 1987, reworked from Krating Daeng; Monster follows from 2002' },
        { label: 'Functional drinks', detail: 'PepsiCo buys Poppi for about USD 1.95 billion; Coca-Cola launches Simply Pop (2025)' },
      ],
      afterLabel: 'What each wave produces',
      after: [
        { label: 'A new category and new global winners', kind: 'outcome' },
      ],
      note: 'RTD is now the format that leads Asian markets, including Vietnam. The Poppi price is as reported for the 2025 acquisition.',
      takeaway: 'Each wave reused the same playbook, franchise reach plus marketing, to create a new category with its own leaders.',
    },
  },
  'nab-def-hist-4-vietnam': {
    heading: 'A young market where globals and local champions arrived together',
    intro: 'Vietnam drinks more bottled tea than cola. Follow the reforms, entries and launches that explain why domestic brands compete head-to-head with global giants.',
    spec: {
      layout: 'timeline', title: "The Evolution of Vietnam's Beverage Industry", kicker: '',
      events: [
        { period: '1986', label: 'Doi Moi reforms', detail: 'The economy is liberalised and opened to foreign investment', status: 'historical' },
        { period: '1994', label: 'Coca-Cola and PepsiCo enter', detail: 'Tan Hiep Phat (THP) is founded the same year', status: 'historical' },
        { period: '2001', label: 'Number 1 Energy Drink', detail: 'THP’s launch helps build a domestic champion', status: 'historical' },
        { period: '2003', label: 'URC launches C2 green tea', detail: 'Helps make RTD tea Vietnam’s defining format', status: 'historical' },
        { period: 'Mid-2000s', label: 'THP invests in aseptic lines', detail: 'Preservative-free, shelf-stable drinks and a durable distribution edge', status: 'historical' },
        { period: '2013', label: 'SPVB joint venture forms', detail: 'PepsiCo’s local operations consolidated: Suntory 51% / PepsiCo 49%', status: 'historical' },
      ],
      note: 'Dates come from company histories (SPVB, Tan Hiep Phat, URC Vietnam).',
      takeaway: 'Opening up created the market, and domestic players won share by backing RTD tea and aseptic technology.',
    },
  },
  'nab-def-m1-global-1': {
    heading: 'The building blocks behind any global market total',
    intro: 'A global market figure bundles categories, channels, regions and occasions. Check which blocks a source includes before you quote its total.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Global Beverage Market', kicker: '',
      root: 'Global NAB market', rootDetail: 'A portfolio of categories and channels, not one uniform product',
      groups: [
        { label: 'Product families', detail: '9+ families in the saved scope', items: ['Packaged water and CSD', 'Juices', 'RTD tea and coffee', 'Energy and sports', 'Plant-based and functional'] },
        { label: 'Channels', items: ['Retail / off-trade (~68.4% of end-use)', 'Foodservice / on-trade'] },
        { label: 'Measurement choices', items: ['Revenue or volume', 'Geography', 'Year'] },
      ],
      note: 'The saved research uses a broad Transparency Market Research estimate of about USD 1,401 billion for 2024; narrower definitions that drop juices or dairy-adjacent drinks give smaller totals.',
      takeaway: 'Market totals only become comparable after scope, geography, metric and year are aligned.',
    },
  },
  'nab-def-m1-global-2': {
    heading: 'Where faster growth hides inside a steady market',
    intro: 'The whole market and its fastest categories grow at different speeds. See which forces add up to industry growth and where a portfolio can outpace it.',
    spec: {
      layout: 'driverTree', title: 'How Fast Is the Industry Growing?', kicker: '',
      root: { label: 'Industry growth', detail: 'Broad NAB forecast of roughly 6–7% CAGR through the early 2030s (saved research)' },
      drivers: [
        { label: 'Population', detail: 'More potential buyers' },
        { label: 'Consumption frequency', detail: 'How often people buy a drink' },
        { label: 'Price', detail: 'What each drink sells for' },
        { label: 'Product mix', detail: 'The share of sales in each category' },
        { label: 'Faster categories', detail: 'Energy drinks: about USD 106 billion in 2025, growing near 8% (Fortune Business Insights)' },
      ],
      note: 'CAGR smooths a start and end value into one rate and hides year-to-year volatility; treat forecasts as scenarios, not guaranteed demand.',
      takeaway: 'A company can outgrow the market by shifting its portfolio toward faster categories, not only by selling more of the same drink.',
    },
  },
  'nab-def-m1-global-3': {
    heading: 'Water leads one ranking, tea leads another',
    intro: 'A global report says water leads; a Vietnam shelf says tea. Compare the two views to see that they measure different markets in different units.',
    spec: {
      layout: 'compare', title: 'What Are People Drinking Around the World?', kicker: '',
      leftTitle: 'Broad global view', rightTitle: 'Vietnam view',
      rows: [
        { label: 'Measured by', a: 'Share of revenue', b: 'Share of soft-drink volume' },
        { label: 'Leading category', a: 'Bottled water, about 36.6%', b: 'RTD tea, 34.2%' },
        { label: 'Year and source', a: '2025, Market Research Future', b: '2023, Research & Markets' },
        { label: 'Growth signal', a: 'Varies with local prices, climate and habits', b: 'RTD coffee up 18% year on year in 2024 (Worldpanel by Numerator)' },
      ],
      note: 'Value share and volume share use different denominators, so the two leaders cannot be ranked against each other.',
      takeaway: 'A global winner can be a local follower, so portfolio and launch decisions need local category data.',
    },
  },
  'nab-def-m1-global-4': {
    heading: 'Biggest region or best fit?',
    intro: 'Asia-Pacific is the largest demand pool, but size alone does not make a market attractive. Test a market against fit and cost to serve.',
    spec: {
      layout: 'decision', title: "Where Are the World's Biggest Beverage Markets?", kicker: '',
      root: { label: 'A candidate market', detail: 'Asia-Pacific ~35%, North America ~21.7%, China ~14% (about USD 151B in 2025)' },
      question: 'Do income, local taste, regulation and route to market favour your category?',
      branches: [
        { condition: 'Large and a good fit', outcome: 'Prioritise', detail: 'Population potential converts into commercial demand', tone: 'positive' },
        { condition: 'Smaller share, high value', outcome: 'Still worth serving', detail: 'North America is smaller by share but high in revenue per buyer', tone: 'positive' },
        { condition: 'Large but a poor fit', outcome: 'May be unattractive', detail: 'Regulation, distribution cost or consumer habits work against the product', tone: 'negative' },
      ],
      note: 'Regional shares are from the saved research (Market Research Future, 2025) and depend on its market definition.',
      takeaway: 'Market prioritisation combines size with fit, growth, margin potential, risk and ease of entry.',
    },
  },
  'nab-def-m1-global-5': {
    heading: 'Ship the formula, bottle the water locally',
    intro: 'A drink is mostly water, so shipping finished bottles is expensive. See what the brand owner keeps central and what partners and suppliers handle near demand.',
    spec: {
      layout: 'ecosystem', title: 'How Beverages Move Across Borders', kicker: '',
      center: { label: 'Global brand owner', detail: 'Keeps brand, formula and portfolio strategy coordinated centrally' },
      actors: [
        { label: 'Local bottling partners', relation: '225+ independent partners in Coca-Cola’s cited system receive concentrate or rights and manufacture', flows: ['product', 'money'] },
        { label: 'Cross-border input suppliers', relation: 'Concentrate, ingredients, packaging materials and machinery cross borders selectively', flows: ['product'] },
        { label: 'Local water and sweetener sources', relation: 'Heavy inputs sourced near the plant', flows: ['product'] },
        { label: 'Local distributors and retailers', relation: 'Adapt packs, price-packs and distribution to each market', flows: ['product', 'information'] },
      ],
      note: 'Operating know-how and brand rights also cross borders; finished products travel mainly at the premium end.',
      takeaway: 'Global systems separate high-margin intellectual property from capital-intensive local execution.',
    },
  },
  'nab-def-m1-vietnam-1': {
    heading: 'Litres and revenue tell two halves of Vietnam’s story',
    intro: 'Vietnam’s headline figures confirm scale. Compare what the volume and the value numbers each measure before using either in a case.',
    spec: {
      layout: 'compare', title: "Vietnam's Beverage Market at a Glance", kicker: '',
      leftTitle: 'Market volume', rightTitle: 'Market value',
      rows: [
        { label: 'What it counts', a: 'Litres sold', b: 'Sales revenue' },
        { label: '2023 figure', a: '4.658 billion litres of soft drinks, up 4.8%', b: 'Near USD 8.25 billion' },
        { label: 'Source', a: 'Research & Markets via GlobeNewswire', b: '6Wresearch estimate' },
        { label: 'How it grows', a: 'More litres', b: 'Higher prices, premium mix or higher-value categories' },
      ],
      note: 'The two figures come from different sources, so do not divide one by the other to infer an average price.',
      takeaway: 'Headline size proves importance; category, geography, channel and competitor detail show where value is created.',
    },
  },
  'nab-def-m1-vietnam-2': {
    heading: 'Tea first, with water and coffee gaining',
    intro: 'If you expected cola to lead Vietnam, the shelf will surprise you. Compare each category’s volume weight with its growth signal.',
    spec: {
      layout: 'table', title: 'What Are Vietnamese Consumers Drinking?', kicker: '',
      headers: ['Category', 'Volume weight', 'Signal to watch'],
      rows: [
        { label: 'RTD tea', a: '34.2% of 2023 volume, about 1.594B of 4.658B litres', b: 'Largest category, rooted in tea culture' },
        { label: 'Bottled water', a: '~20% of volume', b: 'Large and fast-growing: cited 9.9% CAGR' },
        { label: 'Carbonated soft drinks', a: 'Roughly 18% of volume', b: 'Higher revenue share than volume share' },
        { label: 'RTD coffee', a: 'Smaller base', b: 'Fastest cited growth: +18% year on year in 2024' },
      ],
      note: 'Volume shares are from Research & Markets / GlobeNewswire (2024); RTD coffee growth is from Worldpanel by Numerator (2024).',
      takeaway: 'A portfolio built from global averages would miss Vietnam’s tea-led structure and its water and coffee growth.',
    },
  },
  'nab-def-m1-vietnam-3': {
    heading: 'Demand clusters in the south; capacity follows logistics',
    intro: 'More than half of consumption sits around one metropolitan region. Compare where drinks are consumed with what drives where they are made and stored.',
    spec: {
      layout: 'compare', title: 'Where Are Beverages Produced and Consumed?', kicker: '',
      leftTitle: 'Where demand sits', rightTitle: 'Where capacity goes',
      rows: [
        { label: 'Headline', a: 'HCMC region ~54% of national consumption', b: 'A USD 300 million SPVB plant and a USD 136 million Coca-Cola facility' },
        { label: 'Rest of the country', a: 'North 29%, Central 17%', b: 'Regional distributors carry stock to fragmented outlets' },
        { label: 'What decides it', a: 'Population, income and outlet density', b: 'Proximity to demand, land and utilities, suppliers, labour, transport links' },
      ],
      note: 'The regional split is a VietData (2023) consumption estimate; plant locations follow separate investment and logistics decisions.',
      takeaway: 'Geography drives delivery cost, freshness and how fast high-velocity outlets can be replenished.',
    },
  },
  'nab-def-m1-vietnam-4': {
    heading: 'Concentrated at the factory, fragmented at the shelf',
    intro: 'Four producers lead the market, yet each must still win store by store. Follow how producer scale fans out into very different retail routes.',
    spec: {
      layout: 'pathway', title: "How Vietnam's Beverage Market Is Structured", kicker: '',
      trunk: [
        { label: 'Top four producers, ~57%', detail: 'SPVB, Coca-Cola, THP and URC (VIRAC, 2024)', kind: 'stage' },
        { label: 'Portfolios, factories, distributors, coolers', detail: 'The assets large producers use to reach buyers', kind: 'stage' },
      ],
      optionsLabel: 'Routes to consumers',
      options: [
        { label: 'General trade', detail: 'Tạp hóa stores, kiosks and markets: broad reach and impulse sales' },
        { label: 'Modern trade', detail: 'Supermarkets, minimarts and convenience stores: organised visibility' },
        { label: 'Digital channels', detail: 'Discovery and data' },
      ],
      note: 'SPVB leads by non-trade volume, while THP competes at scale with local brands and deep distribution.',
      takeaway: 'Strategy must win both corporate rivalry among large producers and execution across thousands of outlets.',
    },
  },
  'nab-def-m1-vietnam-5': {
    heading: 'Local plants, selectively imported inputs, three routes out',
    intro: 'A bottle in a tạp hóa can combine local water, imported machinery and packaging priced on world markets. Trace the links and spot where risk sits.',
    spec: {
      layout: 'flow', title: "Vietnam's Beverage Trade and Supply Links", kicker: '',
      steps: [
        { label: 'Inputs and equipment', detail: 'Selected sweeteners, packaging materials, flavors and high-speed machinery from wider networks', kind: 'stage' },
        { label: 'Vietnam production', detail: 'Local water and bottling; SPVB’s $300M Long An plant, Coca-Cola’s $136M LEED Gold facility', kind: 'stage' },
        { label: 'Distributors', detail: 'Regional networks feeding a fragmented traditional trade', kind: 'stage' },
        { label: 'Traditional, modern and digital retail', detail: 'Traditional is the backbone; modern trade projected at 44.5% of FMCG by 2031', kind: 'outcome' },
      ],
      note: 'The 44.5% figure is a projection. The saved research has no complete national trade balance, so none is inferred here.',
      takeaway: 'Resilience depends on diversified inputs, reliable plants, working-capital discipline and coverage across every channel.',
    },
  },
  'nab-def-m1-drivers-1': {
    heading: 'Rising incomes open the door; affordability decides who walks in',
    intro: 'GDP can rise while one shopper trades up and another buys a smaller pack. See the levers that turn economic potential into actual purchases.',
    spec: {
      layout: 'driverTree', title: 'The Economics Behind Beverage Demand', kicker: '',
      root: { label: 'Beverage demand that converts to sales' },
      formula: 'Demand = buyers × frequency × affordable pack and category choice, realised only where the drink is available',
      drivers: [
        { label: 'Number of buyers', detail: '45M+ middle-class consumers in Vietnam in 2024 (saved research)', op: '×' },
        { label: 'Drinking frequency', detail: 'Income growth can raise how often people buy', op: '×' },
        { label: 'Affordability and pack', detail: 'Inflation pushes shoppers to value brands, promotions or smaller packs', op: '×' },
        { label: 'Availability', detail: 'Nearby, visible and often cold, or the intended sale is lost', op: '×' },
      ],
      note: 'GDP growth of 6–7% a year is context from the Module 01 research; the 60% middle-class share for 2027 is a projection, not an observed result.',
      takeaway: 'Growth expands the addressable market, but price-pack architecture and channel design decide who can participate.',
    },
  },
  'nab-def-m1-drivers-2': {
    heading: 'Rules that decide what can be sold and what it costs',
    intro: 'A reformulation can change taste, tax, label and pack at once. Follow how rules first set eligibility, then add cost, and which responses companies choose.',
    spec: {
      layout: 'pathway', title: 'Regulation: The Rules of the Beverage Industry', kicker: '',
      trunk: [
        { label: 'Food safety and labeling', detail: 'Ingredients, hygiene, testing, labels and claims decide market access and trust', kind: 'stage' },
        { label: 'Tax and packaging duties', detail: 'Sugary-drink SCT and packaging EPR add direct or lifecycle cost', kind: 'stage' },
      ],
      optionsLabel: 'How companies respond',
      options: [
        { label: 'Reformulation', detail: 'Change ingredients to meet nutrition, tax or compliance needs' },
        { label: 'Pack changes', detail: 'Redesign formats for cost and recovery' },
        { label: 'Compliance systems', detail: 'Avoid launch delays and margin squeeze' },
        { label: 'Portfolio shifts', detail: 'Move weight toward products the rules favour' },
      ],
      note: 'WHO counted 104 countries with a sugar-sweetened beverage tax in 2023. Vietnam’s SCT on qualifying sugary drinks is staged at 8% from 2027 and 10% from 2028, as cited from Law No. 66/2025/QH15 in Module 05.',
      takeaway: 'Regulatory readiness becomes an advantage when competitors react slowly.',
    },
  },
  'nab-def-m1-drivers-3': {
    heading: 'Culture sets the need; identity and health pick the drink',
    intro: 'A student, a family and a commuter all buy drinks for different reasons. Group the social forces that create occasions and shift the portfolio.',
    spec: {
      layout: 'taxonomy', title: 'How Society Shapes Beverage Consumption', kicker: '',
      root: 'Social forces behind beverage occasions', rootDetail: 'Brands translate each need into formats, claims, packs and messages',
      groups: [
        { label: 'Culture and habit', items: ['Tea culture supports RTD tea leadership', 'Local habits decide which format wins'] },
        { label: 'Age and life stage', items: ['Young adults are 60%+ of global energy-drink buyers', 'Core energy audience aged 18–35'] },
        { label: 'Daily routines', items: ['Studying, dining and commuting', 'Exercise and sharing'] },
        { label: 'Health and ingredient attitudes', items: ['30M+ Vietnamese seek drinks free from artificial ingredients', 'Sugar-free, natural and functional choices'] },
      ],
      note: 'Sweetened-drink intake per person in Vietnam rose about 7× from 2002–2017 in the cited evidence; health perception can differ from measured nutrition.',
      takeaway: 'A product succeeds when it fits a real occasion and a local habit; a copied global proposition can miss both.',
    },
  },
  'nab-def-m1-drivers-4': {
    heading: 'Each technology earns its place by removing a bottleneck',
    intro: 'A shelf-stable tea in a rural shop and a chilled drink ordered by app reach buyers differently. Match each technology to the constraint it removes.',
    spec: {
      layout: 'table', title: 'Technology Changing the Beverage Industry', kicker: '',
      headers: ['Technology', 'What it changes', 'Commercial effect'],
      rows: [
        { label: 'Aseptic processing', a: 'Safety and shelf life through sterile filling', b: 'Ambient distribution; Tan Hiep Phat’s shelf-stable RTD reach' },
        { label: 'Packaging', a: 'Weight and convenience', b: 'Lower cost and easier handling' },
        { label: 'Cold chain', a: 'Temperature-controlled storage and transport', b: 'Chilled and premium products beyond major cities' },
        { label: 'E-commerce and quick commerce', a: 'Discovery and app-based delivery', b: 'New urban routes for premium and functional brands' },
        { label: 'Forecasting and consumer data', a: 'Demand information', b: 'Shorter feedback loops and better decisions' },
      ],
      takeaway: 'Technology creates value only when it measurably improves cost, quality, service or growth.',
    },
  },
  'nab-def-m1-drivers-5': {
    heading: 'Who is pushing beverage makers to rethink the package',
    intro: 'When the package can cost more than the liquid, recovery rules and consumer expectations hit margins directly. See each source of pressure on the producer.',
    spec: {
      layout: 'ecosystem', title: 'Sustainability and Environmental Pressures', kicker: '',
      center: { label: 'Beverage producer', detail: 'Chooses materials, formats, water use and how impacts are measured' },
      actors: [
        { label: 'Regulators', relation: 'Vietnam’s EPR packaging obligations in force since 2024 make producers responsible for recovery', flows: ['oversight', 'money'] },
        { label: 'Packaging supply', relation: 'Plastic is about 40.7% of global beverage packaging (2024 estimate)', flows: ['product', 'risk'] },
        { label: 'Recycling systems', relation: 'Less than 9% of all plastic produced is recycled, a broad global benchmark', flows: ['risk'] },
        { label: 'Water sources', relation: 'Withdrawal and replenishment call for credible stewardship', flows: ['risk'] },
        { label: 'Consumers and buyers', relation: 'Expect less plastic and reward lighter, recyclable or reusable formats', flows: ['information'] },
      ],
      note: 'The packaging share and the recycling rate use different denominators and should not be subtracted from each other.',
      takeaway: 'Sustainability now shapes product design, compliance cost, supply resilience and brand trust, so claims need a defined metric.',
    },
  },
};
