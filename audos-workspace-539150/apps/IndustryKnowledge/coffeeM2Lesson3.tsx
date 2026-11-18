import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '3. Midstream Activities';

const deck = [
  c2Chapter({
    title: 'Warehousing, Storage, and Inventory Control', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how storage conditions and inventory control protect quality and cash.',
    mateIntro: 'Beans keep for months, milk for days. Storing each product correctly and counting it accurately saves money and protects taste.',
    keyInsight: 'Inventory management must balance product availability against waste and holding costs. Accurate stock visibility, appropriate storage conditions, and replenishment based on actual demand are particularly important for products with short shelf lives.',
    statTiles: [
      { value: '6', label: 'Key storage and inventory activities', subtitle: 'Goods receiving to waste prevention', description: 'Goods receiving, storage management, stock rotation, inventory monitoring, replenishment planning and waste prevention.' },
      { value: '~60%', label: 'Share of Vietnam’s cold-storage capacity in Ho Chi Minh City', subtitle: 'Vietnam Briefing, e-commerce logistics context', description: 'Cold storage is concentrated in the south, with about 25% in Hanoi and the north.' },
      { value: '~64%', label: 'Share of southern cold-storage capacity held by 19 large operators', subtitle: 'FiinGroup', description: 'Large sites of over 30,000 pallets each dominate capacity.' },
    ],
    statsNote: 'The first tile is a count from this lesson; cold-chain market size differs by source and scope (about US$202 million in 2024 per FiinGroup and about US$850 million in 2025 per Vietnam Briefing), so capacity shares are shown instead.',
    narrative: [
      { label: 'What it is', text: 'Midstream activities connect suppliers and production facilities with individual retail outlets. They include receiving, inspecting, storing, allocating, and replenishing ingredients, packaging, and other operating supplies. Businesses with multiple outlets may use central warehouses, regional distribution centers, direct-to-store delivery, or a combination of these arrangements.' },
      { label: 'Why it is happening', text: 'Storage requirements differ by product. Coffee beans, dry ingredients, chilled dairy, frozen food, fresh produce, and prepared items have different temperature, humidity, handling, and shelf-life requirements. Poor inventory control can cause spoilage, inconsistent quality, and unnecessary working-capital commitments.' },
      { label: 'Real-world example', text: 'Staff check quantities, specifications, packaging integrity, expiry dates and documents on arrival; keep ambient, chilled and frozen goods apart at the right temperatures; apply first-expired, first-out rotation; track stock, consumption, expiry, shrinkage and record discrepancies; set reorder points and safety stock from demand and lead times; and adjust orders and allocation to avoid overstock and spoilage.' },
      { label: 'Vietnam example', text: 'Vietnam’s cold storage is concentrated: Vietnam Briefing puts about 60% of capacity in Ho Chi Minh City and about 25% in Hanoi and the north, and FiinGroup finds that in the south 19 operators with more than 30,000 pallets each hold about 64% of capacity. Cold-chain market estimates differ, at about US$202 million in 2024 versus about US$850 million in 2025, because the scope differs. A Ho Chi Minh City café owner whose bean price had risen about 60% in a year said the shop would buy more beans at a time to soften the impact, which raises storage and cash needs. The sources reviewed give no published inventory-loss rates for Vietnamese café chains, so none are stated.' },
      { label: 'Business impact', text: 'Warehousing and inventory control protect ingredient quality while ensuring that stores have the materials required for daily operations. Effective systems reduce waste, improve availability, and release cash tied up in excess stock.' },
    ],
    visualKind: 'coffee-m2-31-storage', visualHeading: 'Six storage and inventory controls',
    visualIntro: 'See six controls as cards and what each protects.',
    imageAlt: 'Casemate cards of six warehousing and inventory controls in foodservice',
    keyTerms: [
      { term: 'FEFO', definition: 'First-expired, first-out: using the items that expire soonest first.' },
      { term: 'Safety stock', definition: 'Extra stock held to cover uncertain demand or delivery delays.' },
      { term: 'Shrinkage', definition: 'Stock lost through waste, error or theft.' },
      { term: 'Working capital', definition: 'Cash tied up in stock and other short-term items.' },
    ],
    recap: [
      'Warehouses and stores hold ambient, chilled and frozen goods with different needs.',
      'Poor control causes spoilage, inconsistency and tied-up cash.',
      'Rotate by expiry and replenish from actual demand.',
      'Accurate stock visibility cuts waste and improves availability.',
    ],
    chapterRecap: 'Warehousing and inventory control protect ingredient quality while ensuring that stores have the materials required for daily operations. Effective systems reduce waste, improve availability, and release cash tied up in excess stock.',
    deepDiveTitle: 'The trade-off between buying in bulk and keeping stock fresh',
    body: <C2DeepDive paragraphs={[
      'Buying more at once can lock in a price and reduce the number of orders, but it needs space, cash and a product that keeps. It suits roasted beans better than fresh milk.',
      'Each product therefore needs its own rule for how much to hold, based on shelf life, price risk and the cost of running out.' ]} evidence="The six activities are described in the supplied material. Cold-storage shares are from Vietnam Briefing and FiinGroup, which use different scopes; the bulk-buying remark is from a VTV report of one café owner." />,
    sources: citeC2('vietnamBriefingLogistics', 'fiinColdChain', 'vtvCoffeePrices'),
  }),
  c2Chapter({
    title: 'Distribution, Transportation, and Store Replenishment', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how distribution is designed around products and stores, and what makes delivery costly in Vietnam.',
    mateIntro: 'A truck that arrives at the wrong time can block a busy store. Replenishment has to fit both the product and the outlet.',
    keyInsight: 'Distribution must be designed around the characteristics of the products and the operating requirements of each outlet. Reliable, appropriately timed replenishment can improve freshness and availability without creating excessive delivery and storage costs.',
    statTiles: [
      { value: '6', label: 'Key distribution activities', subtitle: 'Route planning to performance monitoring', description: 'Route planning, delivery scheduling, cold-chain transportation, centralized distribution, direct-to-store delivery and delivery performance monitoring.' },
      { value: '16.5%', label: 'Vietnam’s logistics cost as a share of GDP in 2025', subtitle: 'Thanh Nien, against about 11.6% worldwide', description: 'Other estimates range from 16% to 20%.' },
      { value: '53%', label: 'Share of logistics cost taken by last-mile delivery', subtitle: 'Vietnam Briefing, e-commerce context', description: 'Delivering to the final point is the costliest leg.' },
    ],
    statsNote: 'The first tile is a count from this lesson; logistics-cost estimates vary by scope and publisher, and the last-mile share is reported for e-commerce, so use both as indicators for foodservice.',
    narrative: [
      { label: 'What it is', text: 'Distribution moves ingredients, semi-finished products, packaging, and operating supplies from suppliers or central facilities to retail outlets. The network may involve direct supplier deliveries, centralized distribution, third-party logistics providers, or specialized transport for temperature-sensitive products.' },
      { label: 'Why it is happening', text: 'Delivery frequency and route design influence product freshness, labor planning, storage requirements, and transportation costs. Stores with limited backroom space may need frequent replenishment, while outlets in distant or congested locations can require more complex logistics planning.' },
      { label: 'Real-world example', text: 'Planners group deliveries by geography, demand, delivery windows and vehicle capacity; fit replenishment to receiving capacity, peak periods and storage; keep chilled and frozen goods in suitable conditions in transit; consolidate orders across stores; receive fresh or specialist items directly from qualified suppliers; and track on-time delivery, accuracy, damage, shortages and cost.' },
      { label: 'Vietnam example', text: 'Vietnam’s logistics cost was about 16.5% of GDP in 2025 against a world average of about 11.6%, and Vietnam Briefing reports last-mile delivery at 53% of logistics cost and food and beverage e-commerce delivery costing 30–40% more than general goods because of cold-chain needs. In the south, trucks carry 78% of cold transport. Highlands kept opening more than 100 stores a year and ended 2025 with 985, each needing regular replenishment, and its Cai Mep roastery sits near a port. The sources reviewed give no published delivery-frequency data for café chains, so none is stated.' },
      { label: 'Business impact', text: 'Distribution links upstream supply with store-level demand. An effective network improves availability and freshness while controlling delivery expenses and minimizing disruption to store operations.' },
    ],
    visualKind: 'coffee-m2-32-distribution', visualHeading: 'Six distribution activities and what each controls',
    visualIntro: 'See six distribution activities on two sides of the centre and what each controls.',
    imageAlt: 'Casemate sides mind map of six distribution and replenishment activities',
    keyTerms: [
      { term: 'Cold chain', definition: 'Keeping chilled or frozen goods at the right temperature from supplier to store.' },
      { term: 'Direct-to-store delivery', definition: 'Supplier delivery straight to an outlet.' },
      { term: 'Third-party logistics', definition: 'A specialist firm that runs storage or transport for a business.' },
      { term: 'Last mile', definition: 'The final leg of delivery to the customer or store.' },
    ],
    recap: [
      'Distribution may be direct, centralised or run by logistics firms.',
      'Frequency and routes affect freshness, labour, storage and cost.',
      'Design delivery around product traits and outlet needs.',
      'Monitor on-time delivery, accuracy, damage and cost.',
    ],
    chapterRecap: 'Distribution links upstream supply with store-level demand. An effective network improves availability and freshness while controlling delivery expenses and minimizing disruption to store operations.',
    deepDiveTitle: 'Why a small store needs more frequent deliveries',
    body: <C2DeepDive paragraphs={[
      'A kiosk with a tiny backroom cannot hold several days of milk and bakery items, so it needs smaller, more frequent drops. That raises delivery cost per unit but protects freshness.',
      'A larger store can accept bigger, less frequent deliveries and save transport cost. The right schedule depends on space, shelf life and sales.' ]} evidence="The six activities are described in the supplied material. Logistics-cost figures are from a Thanh Nien report and Vietnam Briefing, and the cold-transport share from FiinGroup; store counts are from VietnamBiz and Momentum Works data reported by VietnamPlus; the roastery location is from Viet Nam News." />,
    sources: citeC2('logisticsGdp', 'vietnamBriefingLogistics', 'fiinColdChain', 'vietnambizChains', 'highlandsRoastery'),
  }),
  c2Chapter({
    title: 'Production Planning, Quality Control, and Supply Coordination', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how forecasting, production planning and quality controls must inform each other.',
    mateIntro: 'Deciding how much to roast, bake or prepare is a forecast. Keeping it safe and consistent as it moves is a control. The two must talk to each other.',
    keyInsight: 'The value of an efficient supply network depends on its ability to connect planning with execution. Demand forecasts, production schedules, inventory records, and quality controls should inform one another, rather than operate as separate processes.',
    statTiles: [
      { value: '6', label: 'Key planning and quality activities', subtitle: 'Forecasting to exception management', description: 'Demand forecasting, production planning, allocation management, quality assurance, traceability and exception management.' },
      { value: '10,000 t', label: 'Initial annual capacity of Highlands’ Cái Mép roastery', subtitle: 'Company statement, planned 75,000 t', description: 'Shows the scale at which a roasting plan must match store demand.' },
      { value: 'FSSC 22000', label: 'Food-safety system standard cited for the Highlands roastery', subtitle: 'Company announcement', description: 'Alongside ISO 22000 and HACCP, as a company claim.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the capacity and certifications are company statements of design and standards, not audited output or audit results.',
    narrative: [
      { label: 'What it is', text: 'Midstream coordination also includes determining how much product to prepare, when to replenish ingredients, and how to distribute supplies across the network. For chains with central kitchens or roasting facilities, production plans must align with store forecasts and transport schedules. For stores preparing products on-site, ingredient availability and preparation capacity become particularly important.' },
      { label: 'Why it is happening', text: 'Quality must be maintained as products move between facilities and outlets. This includes temperature monitoring, sanitation, product identification, traceability, handling procedures, and the management of non-conforming goods.' },
      { label: 'Real-world example', text: 'Planners use sales history, promotions, seasonality, weather and local events to estimate demand; schedule roasting, baking or central-kitchen output to expected use; share limited or perishable stock by store demand and remaining shelf life; check condition, temperature records and handling; record supplier, batch and delivery data to support investigations and recalls; and respond to shortages, delays, equipment problems and quality deviations.' },
      { label: 'Vietnam example', text: 'Highlands’ Cái Mép roastery, opened in April 2025, uses German Probat roasting equipment, automated processes and quality assurance systems, with an initial capacity near 10,000 tonnes a year and a planned 75,000, and the company cites FSSC 22000, ISO 22000 and HACCP systems. Phúc Long says it built plants at its tea hills so leaves are dried right after harvest. Vietnam’s Law on Food Safety sets conditions for premises that prepare food and drink, and the certificate file for a food-service establishment includes a health confirmation for staff handling food. The sources reviewed give no published data on forecast accuracy, allocation or recall events at Vietnamese café chains, so none are stated.' },
      { label: 'Business impact', text: 'Production planning and quality coordination help maintain consistent products across locations. Integrated information and clear operating procedures reduce errors, improve responsiveness, and support safe foodservice delivery.' },
    ],
    visualKind: 'coffee-m2-33-planning', visualHeading: 'Six layers linking planning to execution',
    visualIntro: 'Climb from demand forecasting at the base to exception management at the top.',
    imageAlt: 'Casemate pyramid of six layers linking production planning, quality control and supply coordination',
    keyTerms: [
      { term: 'Traceability', definition: 'Records that let a product be followed from supplier to customer.' },
      { term: 'Non-conforming goods', definition: 'Items that fail specifications or safety checks.' },
      { term: 'Allocation', definition: 'Sharing limited stock among stores according to demand.' },
      { term: 'HACCP', definition: 'A food-safety system that identifies and controls hazards.' },
    ],
    recap: [
      'Plans must decide how much to prepare, replenish and distribute.',
      'Central facilities must align output with store forecasts and transport.',
      'Quality must hold as products move between sites.',
      'Forecasts, schedules, stock records and quality controls should inform each other.',
    ],
    chapterRecap: 'Production planning and quality coordination help maintain consistent products across locations. Integrated information and clear operating procedures reduce errors, improve responsiveness, and support safe foodservice delivery.',
    deepDiveTitle: 'Why traceability matters before anything goes wrong',
    body: <C2DeepDive paragraphs={[
      'If a batch of milk or a bakery item is found to be unsafe, a business with batch and delivery records can quickly find which stores received it and remove it. Without records, it may have to pull much more stock.',
      'Recording batch and supplier data at receiving is a small daily task that pays off when an investigation or recall begins.' ]} evidence="The six activities are described in the supplied material. Roastery details are from Viet Nam News and a Highlands company announcement and are company statements; Phúc Long details are company statements; legal items are from the consolidated Law on Food Safety and a procedure summary." />,
    sources: citeC2('highlandsRoastery', 'highlandsPlant2023', 'virDrinksChains', 'phucLongTea', 'foodSafetyLaw', 'foodSafetyCertificate'),
  }),
];

const quiz = c2Quiz('coffee-m2-l3', [
  { chapter: '1', objective: 'State the inventory balance', question: 'What must inventory management balance?', application: 'A store keeps overstocking milk. What is the trade-off?', correct: 'Product availability against waste and holding costs', wrong: ['Sales against advertising', 'Price against colour', 'Staff against music'], explanation: 'Too much wastes, too little loses sales. Review Chapter 1.' },
  { chapter: '1', objective: 'Define FEFO', question: 'What does first-expired, first-out mean?', application: 'A fridge holds two batches of cream. Which is used first?', correct: 'Using the items that expire soonest first', wrong: ['Using the newest first', 'Using the cheapest first', 'Using the largest first'], explanation: 'It cuts expiry losses. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate storage types', question: 'Why are ambient, chilled and frozen goods stored separately?', application: 'A warehouse mixes them. What goes wrong?', correct: 'They need different temperature, humidity and handling conditions', wrong: ['They look different', 'They cost the same', 'They weigh the same'], explanation: 'Conditions differ. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the cold-storage concentration', question: 'Where is about 60% of Vietnam’s cold-storage capacity, per Vietnam Briefing?', application: 'A planner locates cold storage. Where is it?', correct: 'Ho Chi Minh City', wrong: ['Hanoi only', 'Da Nang only', 'Hue only'], explanation: 'It is concentrated in the south. Review Chapter 1.' },
  { chapter: '2', objective: 'State how distribution is designed', question: 'What should distribution be designed around?', application: 'A chain plans deliveries to small kiosks. What should guide it?', correct: 'The characteristics of the products and the operating requirements of each outlet', wrong: ['The supplier’s timetable only', 'The largest truck', 'The cheapest route only'], explanation: 'Fit product and outlet. Review Chapter 2.' },
  { chapter: '2', objective: 'List a delivery measure', question: 'Which is a delivery performance measure?', application: 'A logistics manager tracks performance. Which belongs?', correct: 'On-time delivery', wrong: ['Staff birthdays', 'Poster count', 'Logo size'], explanation: 'It shows reliability. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Vietnam’s logistics cost', question: 'About what share of GDP was Vietnam’s logistics cost in 2025 per one report?', application: 'An analyst compares costs. What is the figure?', correct: 'About 16.5%', wrong: ['About 1.65%', 'About 65%', 'About 6%'], explanation: 'Higher than the world average. Review Chapter 2.' },
  { chapter: '3', objective: 'State what the network depends on', question: 'What does an efficient supply network’s value depend on?', application: 'A chain has forecasts and quality checks run apart. What is missing?', correct: 'Connecting planning with execution so forecasts, schedules, inventory and quality inform one another', wrong: ['Keeping them separate', 'Only buying more', 'Only cutting staff'], explanation: 'Integrate the processes. Review Chapter 3.' },
  { chapter: '3', objective: 'Define traceability', question: 'What does traceability allow?', application: 'A batch is found unsafe. How does traceability help?', correct: 'Following supplier, batch and delivery records to support investigations and recalls', wrong: ['Raising prices', 'Hiding the problem', 'Skipping checks'], explanation: 'Records speed response. Review Chapter 3.' },
  { chapter: '3', objective: 'Read company claims', question: 'How should the roastery’s FSSC 22000 and ISO 22000 systems be read?', application: 'A slide quotes the certifications. What should be noted?', correct: 'As company statements, not audit results', wrong: ['As government rules', 'As independent audits', 'As industry averages'], explanation: 'Source type matters. Review Chapter 3.' },
]);

export const LESSON_C2_3: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how storage, distribution and planning keep ingredients fresh, available and traceable between suppliers and stores.',
    keyTakeaways: [
      'Inventory must balance availability against waste and holding cost.',
      'Store each product to its own temperature and shelf-life needs.',
      'Design distribution around products and outlets.',
      'Logistics cost is high in Vietnam and last-mile delivery is the costliest leg.',
      'Forecasts, production plans, stock records and quality controls must inform each other.',
    ],
    businessImplications: 'Rotate stock by expiry, design delivery schedules around each outlet and keep traceability records from receiving onward.',
    remember: 'Plan and control together, or neither works.',
    nextLesson: 'Store Network & Channel Operations',
  },
};
