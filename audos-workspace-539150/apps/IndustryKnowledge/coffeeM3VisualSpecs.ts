import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Coffee & Foodservice Retail Module 03, keyed by visualKind. */
export const COFFEE_M3_VISUALS: Record<string, ChapterVisual> = {
  'coffee-m3-11-independent': {
    heading: 'What a single café owner gains, and what small scale costs',
    intro: 'The same owner who can change the menu overnight is also the business’s single point of failure. Read each row left to right: the strength, then the limit it comes with.',
    spec: {
      layout: 'compare', title: 'Independent Cafés and Owner-Operated Foodservice Businesses', kicker: '',
      leftTitle: 'What owner control makes possible', rightTitle: 'What small scale and owner-dependence cost',
      rows: [
        { label: 'Decisions', a: 'The owner changes menu, price or hours the same day', b: 'No head office to absorb a bad quarter' },
        { label: 'Buying', a: 'Local roasters, bakers and wholesalers chosen directly', b: 'Small order volumes give little purchasing power' },
        { label: 'Management', a: 'Regular customers known by name', b: 'Rarely a dedicated finance, training or marketing team' },
        { label: 'Identity and continuity', a: 'A concept fitted to one neighbourhood or customer group', b: 'Quality can depend on the owner being present' },
      ],
      note: 'An iPOS.vn and Nestlé Professional survey reports independents earned 91.7% of Vietnam’s 2025 F&B revenue and chains of at least 10 branded outlets 8.3%, up from about 7.3% in 2024; it covers all F&B, not coffee alone.',
      takeaway: 'An independent grows only when the owner builds systems that work without constant personal involvement.',
    },
  },
  'coffee-m3-12-ownership': {
    heading: 'Where a coffee brand’s edge lies decides who owns the next store',
    intro: 'Company stores, franchisees and agents can all carry the same sign. Start from what makes the brand win, then see which ownership route follows and who puts in the capital.',
    spec: {
      layout: 'decision', title: 'Chain-Owned and Franchise Business Models', kicker: '',
      root: { label: 'Brand owner planning expansion', detail: 'Choose between company-owned, franchise and agency or supply-led outlets' },
      question: 'Where does the brand’s advantage lie?',
      branches: [
        { condition: 'In the customer experience', outcome: 'Own and run the stores', detail: 'Highlands: 716 of 850 stores company-managed at end-2024; full store profit, full capital cost', tone: 'positive' },
        { condition: 'In supply and brand reach', outcome: 'Grow through franchisees or agents', detail: 'Milano says it earns by supplying coffee to about 2,000 outlets in 57 provinces (company claim)', tone: 'caution' },
      ],
      note: 'Partner networks need policing: Milano describes disputes when agents mix in outside products, and E-Coffee advertises a zero-fee franchise. Store counts are company or press figures tied to a date.',
      takeaway: 'Ownership model decides who invests, who controls quality and who carries the risk of a weak outlet.',
    },
  },
  'coffee-m3-13-hybrid': {
    heading: 'What each low-capital coffee format gives away',
    intro: 'Kiosks, counters inside supermarkets and showcase stores all cut the cost of reaching customers. Read the last column to see what each format hands to someone else in return.',
    spec: {
      layout: 'table', title: 'Hybrid, Asset-Light, and Specialized Business Models', kicker: '',
      headers: ['Format', 'Vietnam example', 'What it gives up'],
      rows: [
        { label: 'Mixed ownership', a: 'Trung Nguyên ran 106 Legend stores beside about 800 E-Coffee franchise stores', b: 'Control of franchised outlets; risk of brand blur' },
        { label: 'Kiosk and small format', a: 'E-Coffee formats from about four square metres', b: 'Seating and space' },
        { label: 'Shop-in-shop counter', a: 'Phúc Long kiosks inside WinMart supermarkets', b: 'Control of the site and its rules' },
        { label: 'Flagship or drive-through', a: 'Starbucks Reserve at Bitexco, April 2025; Highlands’ first drive-through, 2025', b: 'Store profit, for brand image or car access' },
        { label: 'Roaster-retailer line', a: 'Phúc Long packaged tea and coffee in supermarkets', b: 'More capital, and the retailer meets the customer' },
        { label: 'Delivery-only kitchen', a: 'No public Vietnam data found', b: 'A dining room and walk-in trade' },
      ],
      note: 'E-Coffee’s packages (conversion VND 56–196 million, investment VND 65–245 million) and its 3,000-store target are company statements.',
      takeaway: 'Each format needs a clear job and a clear return, or the group pays for several models and gains from none.',
    },
  },
  'coffee-m3-21-menu': {
    heading: 'Turning a drink-only café visit into a bigger bill',
    intro: 'Drinks bring customers through the door, but most leave with nothing else. Follow the routes a menu offers from the core drink to a higher average ticket.',
    spec: {
      layout: 'pathway', title: 'Core Product Categories and Menu Architecture', kicker: '',
      trunk: [
        { label: 'Focused core of drinks', detail: 'Coffee, tea and other beverages carry traffic; 77% of 200 sampled receipts were drink only', kind: 'stage' },
      ],
      optionsLabel: 'Routes to a bigger bill',
      options: [
        { label: 'Food pairing', detail: 'Receipts with food averaged VND 162,000 against VND 88,000 for drink only' },
        { label: 'Sizes and add-ons', detail: 'Size options and extras lift the bill without adding stores' },
        { label: 'Seasonal items', detail: 'A rotating limited item gives customers a reason to return' },
        { label: 'Packaged products', detail: 'Bagged coffee or tea sold at the till to take away' },
      ],
      afterLabel: 'Result',
      after: [
        { label: 'Higher average ticket', detail: 'About VND 110,000 a visit in the sample, if service stays fast', kind: 'outcome' },
      ],
      note: 'The Q&Me study covers only 200 receipts, so it is indicative. Momentum Works put coffee chains at US$725 million in 2025 and coffee and tea chains at US$1.34 billion, leaving tea chains near US$615 million by subtraction.',
      takeaway: 'Moving a few drink-only visits to drink plus food changes the bill more than a small price rise would.',
    },
  },
  'coffee-m3-22-formats': {
    heading: 'Linger, grab or deliver: café formats sorted by how long customers stay',
    intro: 'A seat that holds one student for three hours earns very differently from a counter that serves six takeaway orders. Group the formats by dwell time before comparing their prices.',
    spec: {
      layout: 'taxonomy', title: 'Service Formats and Consumption Occasions', kicker: '',
      root: 'Café service formats', rootDetail: 'Each format is a bet on one consumption occasion',
      groups: [
        { label: 'Stay and linger', detail: 'Needs seating, ambience and power sockets', items: ['Dine-in café', 'Study and work space', 'Late-night and 24/7 café'] },
        { label: 'Grab and go', detail: 'Needs speed, a short menu and little seating', items: ['Takeaway counter or kiosk', 'Drive-through lane'] },
        { label: 'Consume elsewhere', detail: 'Orders through apps, with ShopeeFood and GrabFood at 48% each', items: ['Delivery to home or office'] },
      ],
      note: 'Students interviewed by VietNamNet in April 2025 visited two to four times a week for VND 45,000–65,000 drinks (interviews, not a survey). Highlands opened Vietnam’s first drive-through in 2025; delivery reached US$2.1 billion in 2025.',
      takeaway: 'Operators lose when they run a study-style space on takeaway-style prices; format and price must match the occasion.',
    },
  },
  'coffee-m3-23-price': {
    heading: 'A coffee price holds only when the difference behind it is visible',
    intro: 'Customers compare café prices on their phones in seconds. See what happens to a price position with and without a reason the customer can see.',
    spec: {
      layout: 'decision', title: 'Price Positioning and Differentiation', kicker: '',
      root: { label: 'A brand picks its place on the price ladder', detail: 'From street-stall prices to premium, then costs for beans, rent and wages move' },
      question: 'Can customers see what the price pays for?',
      branches: [
        { condition: 'Yes, a visible premium', outcome: 'Price can be defended when costs rise', detail: 'Starbucks Reserve at Bitexco, opened April 2025, rests on a landmark setting', tone: 'positive' },
        { condition: 'Yes, low price by design', outcome: 'Value position held by small formats', detail: 'A VND 25,000 coffee sits at the mass-market end (operator example)', tone: 'positive' },
        { condition: 'No clear difference', outcome: 'Discounting and drift both ways', detail: 'A middle brand must beat kiosks on quality and premium cafés on price', tone: 'negative' },
      ],
      note: 'BBC News in 2023 put a Starbucks medium drink near VND 90,000 against an average wage of about US$345 a month, and said Highlands cut prices after starting as a luxury chain. VTV reported café price rises of 10–20% in early 2025.',
      takeaway: 'Brands that can explain their price through a visible difference defend margin; the rest rely on promotions.',
    },
  },
  'coffee-m3-31-segments': {
    heading: 'Which café customer segments the evidence can actually support',
    intro: 'Students, Gen Z, tourists and families are all named as segments, but they are not measured equally well. Read the last column before designing an offer around any of them.',
    spec: {
      layout: 'table', title: 'Demographic and Lifestyle-Based Segments', kicker: '',
      headers: ['Segment', 'What the evidence shows', 'How strong the evidence is'],
      rows: [
        { label: 'Students', a: 'Two to four café visits a week on VND 45,000–65,000 drinks; one spends 10–15% of an allowance', b: 'Interviews, not a survey' },
        { label: 'Budget-conscious Gen Z', a: '49% of Gen Z respondents hold strictly to a spending budget', b: 'Survey, date not shown' },
        { label: 'Broad café drinkers', a: '57% of respondents enjoy drinks at cafés and milk-tea shops', b: 'Survey, date not shown' },
        { label: 'International tourists', a: 'Nearly 21.2 million arrivals in 2025, up 20.4%', b: 'Official count' },
        { label: 'Families and higher-income groups', a: 'No public Vietnam coffee-specific data found', b: 'Evidence gap: treat as a hypothesis' },
      ],
      note: 'The same Decision Lab survey found 84% of respondents set limits on out-of-home spending; tourist numbers are from the National Authority of Tourism.',
      takeaway: 'Build offers around segments that show a measurable difference in behaviour or spend, and test the rest first.',
    },
  },
  'coffee-m3-32-behaviour': {
    heading: 'Who comes along and what gets ordered drive the café receipt',
    intro: 'Two customers of the same age can leave very different receipts. See which behaviours push spend per receipt up or down in one small sample.',
    spec: {
      layout: 'driverTree', title: 'Behavioral Segments and Purchase Occasions', kicker: '',
      root: { label: 'Spend per receipt', detail: 'About VND 110,000 on average across 200 sampled chain receipts (Q&Me, indicative)' },
      drivers: [
        { label: 'Group size', detail: 'Solo visits made up 61–62% of receipts; groups reached up to VND 180,000' },
        { label: 'Basket content', detail: 'Drink-only receipts about VND 88,000; receipts with food about VND 162,000' },
        { label: 'Occasion and channel', detail: 'Delivery, US$2.1 billion in 2025, adds an at-home or office occasion' },
        { label: 'Visit frequency', detail: 'How often the same customer returns' },
        { label: 'Time of day', detail: 'No public Vietnam data on visits by daypart was found' },
      ],
      note: 'The receipt study has only 200 receipts, so it shows how to analyse behaviour rather than a market-wide fact.',
      takeaway: 'Read your own receipts before assuming what a segment is worth: group size and food move the ticket most.',
    },
  },
  'coffee-m3-33-loyalty': {
    heading: 'How a café rewards app turns anonymous cups into known regulars',
    intro: 'A discount to an anonymous customer cannot be targeted or measured. Follow how a loyalty programme links purchases to a person and what it should prove.',
    spec: {
      layout: 'flow', title: 'Customer Needs, Purchase Criteria, and Loyalty', kicker: '',
      steps: [
        { label: 'Identify the customer', detail: 'A vendor-reported Highlands Zalo campaign identified 56.9% of over 2 million users', kind: 'stage' },
        { label: 'Reward each purchase', detail: 'Phúc Long gives one point per VND 10,000; 100 points buy a free medium drink', kind: 'stage' },
        { label: 'Tier by spend', detail: 'HighlandsĐI, from 19 December 2025, sets tiers on 12-month spend', kind: 'stage' },
        { label: 'Personalise offers', detail: 'Purchase data replaces blanket discounts with targeted rewards', kind: 'stage' },
        { label: 'Count incremental visits', detail: 'Visits that would not have happened without the programme, not sign-ups', kind: 'outcome' },
      ],
      loop: 'Taste, value and convenience still decide the first visit; rewards only make the next choice easier.',
      note: 'Zalo and The Coffee House results are vendor case studies, and no public member counts were found. A Decision Lab survey found 84% of respondents limit out-of-home spending.',
      takeaway: 'Loyalty programmes work by identifying customers and rewarding repeat behaviour, not by discounting everyone.',
    },
  },
  'coffee-m3-41-revenue': {
    heading: 'Sorting coffeehouse revenue by who actually keeps it',
    intro: 'One cup can add to an operator’s sales, a brand owner’s supply income and a platform’s commission. Group the streams by who earns them before reading any revenue figure.',
    spec: {
      layout: 'taxonomy', title: 'Core Revenue Streams and Sales Mix', kicker: '',
      root: 'Coffeehouse revenue streams', rootDetail: 'Grouped by who earns each one',
      groups: [
        { label: 'Store operator', detail: 'Beverages carry most revenue; food lifts the ticket', items: ['Beverage sales', 'Food and add-ons'] },
        { label: 'Brand owner', detail: 'Income that does not require running every store', items: ['Coffee and materials supplied to agents', 'Franchise fees and royalties'] },
        { label: 'Roaster-retailer', detail: 'Phúc Long sells packaged tea and coffee through supermarkets', items: ['Packaged coffee and tea'] },
        { label: 'Operator and platform', detail: 'A VND 100,000 order at 30% commission leaves VND 70,000', items: ['Delivery sales'] },
      ],
      note: 'Highlands’ about VND 15–16 million a day per store at end-2024 is a reporter’s estimate; Phúc Long reported VND 858 billion of first-half 2025 revenue. In a small Q&Me study 18.5% of receipts included food.',
      takeaway: 'Diverse streams add stability only when each is profitable on its own terms.',
    },
  },
  'coffee-m3-42-cost': {
    heading: 'Inside a VND 25,000 cup, including the part the source leaves unexplained',
    intro: 'An operator’s example splits one cup into three itemised costs and a balance nobody explains. Read what each line covers, and why the balance is not profit.',
    spec: {
      layout: 'driverTree', title: 'Cost Structure and Operating Leverage', kicker: '',
      root: { label: 'A VND 25,000 coffee', detail: 'Operator example reported by VnExpress, not an audit' },
      formula: 'Price = ingredients + labour + fixed costs + unexplained balance',
      drivers: [
        { label: 'Ingredients', detail: 'About VND 5,500, roughly 22% of price; VTV puts ingredients at 20–35%', op: '+' },
        { label: 'Labour', detail: 'About VND 4,500; Region I minimum wage VND 5.31 million a month from 2026', op: '+' },
        { label: 'Fixed costs per cup', detail: 'About VND 5,000; housing, electricity and water prices rose 6.08% in 2025', op: '+' },
        { label: 'Unexplained balance', detail: 'VND 10,000 by subtraction; may hold other costs, fees, tax or margin', op: '+' },
      ],
      note: 'Hypothetical illustration from the chapter: VND 2 million of daily fixed costs is VND 10,000 a cup over 200 cups and VND 5,000 over 400. That spreading is operating leverage. In a VCCI report, 69.38% of businesses faced rising raw-material costs.',
      takeaway: 'Fixed costs spread over volume, so extra cups lift profit faster than sales and falling volume cuts it faster.',
    },
  },
  'coffee-m3-43-unit': {
    heading: 'How many cups a coffee store must sell before it stops losing money',
    intro: 'Money is made or lost one store at a time. Move the sliders to see how daily cups and fixed costs decide whether a single store clears break-even.',
    spec: {
      layout: 'scenario', title: 'Unit Economics, Break-Even, and Profitability', kicker: '',
      inputs: [
        { key: 'cups', label: 'Cups sold a day', min: 200, max: 800, step: 10, value: 300, unit: 'cups' },
        { key: 'fixed', label: 'Daily fixed costs', min: 4, max: 8, step: 0.5, value: 6, unit: 'VND million' },
      ],
      outputs: [
        { label: 'Contribution per day', unit: 'VND million', digits: 2, compute: (v) => (v.cups * 19500) / 1e6 },
        { label: 'Daily profit or loss', unit: 'VND million', digits: 2, compute: (v) => (v.cups * 19500 - v.fixed * 1e6) / 1e6 },
        { label: 'Break-even volume', unit: 'cups a day', digits: 0, compute: (v) => (v.fixed * 1e6) / 19500 },
      ],
      assumption: 'Hypothetical: a VND 25,000 cup with VND 5,500 ingredient cost leaves VND 19,500 contribution; daily fixed costs start at an assumed VND 6 million.',
      note: 'Momentum Works reported typical Vietnam stores serve 300–400 cups a day and leading brands 600–800. Payback rules of thumb of 4–8 months for kiosks and 18–36 months for premium cafés are unaudited.',
      takeaway: 'Chain averages hide weak and strong stores, so judge each store on whether it clears break-even quickly.',
    },
  },
  'coffee-m3-51-physical': {
    heading: 'Why a café’s address is its distribution channel',
    intro: 'A drink made on the spot cannot be shipped from a warehouse, so the site choice is the distribution choice. Follow how one constraint fans out into site types and then a network.',
    spec: {
      layout: 'pathway', title: 'Physical Stores and Location-Based Distribution', kicker: '',
      trunk: [
        { label: 'The store is factory and shop', detail: 'The drink is made where it is sold, so the brand must go to its customers', kind: 'stage' },
      ],
      optionsLabel: 'Where to place a store',
      options: [
        { label: 'High-street sites', detail: 'Visible frontage on busy roads for walk-in volume' },
        { label: 'Shop-in-shop counters', detail: 'Phúc Long kiosks inside WinMart supermarkets share traffic' },
        { label: 'Landmark flagships', detail: 'Starbucks Reserve at Bitexco, opened April 2025, for brand image' },
        { label: 'Tourist areas', detail: 'Nearly 21.2 million international visitors in 2025' },
        { label: 'Drive-through lanes', detail: 'Highlands opened Vietnam’s first in 2025' },
      ],
      afterLabel: 'Then judge the network',
      after: [
        { label: 'Density and same-store sales', detail: 'Highlands reached 985 stores by end-2025 with same-store sales up over 8%', kind: 'stage' },
        { label: 'Watch cannibalisation and closures', detail: 'The Coffee House fell from 150 to 94 stores by end-2024', kind: 'outcome' },
      ],
      note: 'Store counts are tied to report dates: Phúc Long is reported at 237 stores by one source and nearly 200 by another; Café Amazon exited Vietnam in November 2025.',
      takeaway: 'A chain that wins on sites can win on traffic before it wins on product.',
    },
  },
  'coffee-m3-52-digital': {
    heading: 'Renting app reach versus owning the coffee customer',
    intro: 'A platform order and a brand-app order look alike on the phone. Compare who pays, who keeps the customer’s details and how long each takes to build.',
    spec: {
      layout: 'compare', title: 'Digital Ordering, Delivery Platforms, and Direct Channels', kicker: '',
      leftTitle: 'Third-party delivery platform', rightTitle: 'Brand-owned app or channel',
      rows: [
        { label: 'Reach', a: 'Large user base; ShopeeFood and GrabFood at 48% each', b: 'Only customers the brand attracts itself' },
        { label: 'Cost per order', a: 'Commission of 20–30% before advertising', b: 'Development and marketing cost, no per-order commission' },
        { label: 'Customer data', a: 'Largely held by the platform', b: 'Held by the brand' },
        { label: 'Loyalty', a: 'Weak; customers compare across brands', b: 'Points, tiers and pre-order, as in HighlandsĐI' },
        { label: 'Time to scale', a: 'Fast to join', b: 'Slow: The Coffee House reported about 100,000 downloads after two years' },
      ],
      note: 'Vietnam online food delivery reached US$2.1 billion in 2025, up 19% (Momentum Works), across all food. Baemin, Gojek and Loship exited and Xanh SM Ngon entered in June 2025. App download figures are vendor-reported.',
      takeaway: 'Platforms rent reach and brand-owned channels build an asset, so most chains need both.',
    },
  },
  'coffee-m3-53-omni': {
    heading: 'One bar, every channel: keeping café orders moving',
    intro: 'Walk-in, pre-order and delivery tickets all land on the same bar and team. Follow an order through the steps that decide whether a new channel adds profit or only adds queues.',
    spec: {
      layout: 'flow', title: 'Omnichannel Integration and Fulfillment Management', kicker: '',
      steps: [
        { label: 'Order placed in any channel', detail: 'Walk-in, app pre-order, delivery platform or messaging app', kind: 'stage' },
        { label: 'Menu and stock checked', detail: 'Online menus show items only when they can be made', kind: 'stage' },
        { label: 'One preparation queue', detail: 'Store and delivery tickets share the same bar and team', kind: 'stage' },
        { label: 'Timed handover', detail: 'Scheduled pick-ups spread the load; delivery can pause at peaks', kind: 'decision' },
        { label: 'Points to one account', detail: 'Store, app and delivery purchases count toward one loyalty identity', kind: 'outcome' },
      ],
      loop: 'Data from every channel then plans staff, stock and promotions for the next rush.',
      note: 'HighlandsĐI added pre-order and prepaid top-up from 19 December 2025; a vendor-reported Zalo Mini App campaign drew over 2 million users in 40 days. No public Vietnam data on delivery congestion in cafés was found.',
      takeaway: 'Extra channels add profitable demand only if one operation can fulfil all of them without hurting service.',
    },
  },
  'coffee-m3-61-supply': {
    heading: 'The partners behind a coffee counter, from farm to app',
    intro: 'Few chains grow, roast, ship and code everything themselves. See what each supply-side partner provides and where it creates a dependence.',
    spec: {
      layout: 'ecosystem', title: 'Supply-Side Partners and Business Enablers', kicker: '',
      center: { label: 'Coffeehouse chain', detail: 'Buys capabilities it does not build itself' },
      actors: [
        { label: 'Growers and exporters', relation: 'About 31.7 million bags produced in 2025/26, 4.9 million used at home (USDA)', flows: ['product', 'money'] },
        { label: 'Roasters', relation: 'Highlands’ VND 500 billion roastery near Cái Mép: about 10,000 tonnes initially, 75,000 potential', flows: ['product'] },
        { label: 'Tea and ingredient suppliers', relation: 'Tea, milk and syrups; Phúc Long says its tea comes from two hills it owns', flows: ['product', 'money'] },
        { label: 'Equipment and packaging makers', relation: 'Machines, refrigeration, cups and packaging', flows: ['product', 'money'] },
        { label: 'Cold-chain logistics', relation: '19 storage operators hold about 64% of cold-storage capacity (FiinGroup)', flows: ['service', 'risk'] },
        { label: 'Technology vendors', relation: 'Ordering, payment and loyalty software, such as Zalo Mini App and loyalty platform builders', flows: ['information', 'service'] },
      ],
      note: 'Capacity figures are company or press statements. Cold-chain estimates differ by scope: FiinGroup gives US$202 million for 2024, another source about US$850 million for 2025.',
      takeaway: 'Each partner adds a capability the operator need not build and a dependence it must manage.',
    },
  },
  'coffee-m3-62-demand': {
    heading: 'Gatekeepers standing between a coffee brand and its buyers',
    intro: 'Platforms, landlords and host retailers each give a café access to customers and take something back. Read what each one controls and what it charges for that access.',
    spec: {
      layout: 'table', title: 'Demand-Side Stakeholders and Channel Intermediaries', kicker: '',
      headers: ['Gatekeeper', 'What it controls', 'What it takes'],
      rows: [
        { label: 'Delivery platforms', a: 'Delivery discovery; ShopeeFood and GrabFood each held 48% of US$2.1 billion in 2025', b: 'Commission of 20–30% per order, before advertising' },
        { label: 'Landlords', a: 'Who gets prime sites', b: 'Rent; no public coffeehouse rent data found' },
        { label: 'Retail partners', a: 'Space for counters, as with Phúc Long kiosks in WinMart', b: 'Space, rent and often the rules' },
        { label: 'Marketing and messaging channels', a: 'Reach to customers, such as Zalo Mini App (vendor-reported)', b: 'Sets the terms of access' },
        { label: 'Payment providers', a: 'How customers pay', b: 'Fees not publicly reported' },
      ],
      note: 'beFood held the remaining 4% of delivery value. Masan owns both Phúc Long and WinMart and plans to link Phúc Long’s loyalty programme with its retail ecosystem.',
      takeaway: 'Operators that diversify access routes and build direct relationships are less exposed to any single intermediary.',
    },
  },
  'coffee-m3-63-community': {
    heading: 'Coffeehouse rule dates to track from 2024 to the end of 2026',
    intro: 'Packaging, invoicing, wage and trade rules each arrive on their own date, and some change again. Follow the dates, then check the current legal text before planning around any of them.',
    spec: {
      layout: 'timeline', title: 'Regulators, Industry Associations, and Community Stakeholders', kicker: '',
      events: [
        { period: '1 January 2024', label: 'Packaging recycling duties begin', detail: 'Producers and importers of covered packaging; those under VND 30 billion revenue exempt', status: 'historical' },
        { period: '1 June 2025', label: 'Point-of-sale e-invoices extended', detail: 'Decree 70/2025/ND-CP reaches qualifying restaurants; 57.11% of surveyed operators were concerned', status: 'historical' },
        { period: '9 October 2025', label: 'VICOFA charter approved', detail: 'Voluntary coffee and cocoa association with nearly 100 members', status: 'historical' },
        { period: '1 January 2026', label: 'Higher regional minimum wage', detail: 'Region I minimum of VND 5.31 million a month', status: 'historical' },
        { period: '1 July 2026', label: 'Decree 70 reportedly replaced', detail: 'Reported by a secondary source only', status: 'historical' },
        { period: '30 December 2026', label: 'EU deforestation regulation applies', detail: 'Large and medium operators; affects coffee exporters rather than cafés directly', status: 'forecast' },
      ],
      note: 'The consolidated Food Safety Law applies throughout: the compliance certificate file takes 20 working days to process. Whether packaging duties reach a café’s own cups depends on classification and was not verified.',
      takeaway: 'Rules shape cost as much as rent does, so confirm the current legal text before relying on any date.',
    },
  },
};
