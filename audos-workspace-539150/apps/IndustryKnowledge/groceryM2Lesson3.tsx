import { G2DeepDive, citeG2, g2Chapter, g2Quiz } from './groceryM2Core';
import type { GroceryM2LessonBundle } from './groceryM2Core';

const LESSON = '3. Midstream Activities';

const deck = [
  g2Chapter({
    title: 'Warehousing, Distribution, and Inventory Management', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how warehousing and inventory control turn purchasing decisions into availability while limiting waste and cost.',
    mateIntro: 'The best purchasing deal is worthless if the goods sit in the wrong warehouse or spoil on the way. Midstream is where buying becomes a full shelf, or an expensive pile of stock.',
    keyInsight: 'Midstream efficiency directly affects product availability, operating costs, and waste. Retailers must balance inventory availability against the cost of holding excess stock, particularly for perishable goods.',
    statTiles: [
      { value: '6', label: 'Midstream activities', subtitle: 'Warehouse to loss prevention', description: 'Warehouse operations, distribution centres, forecasting, replenishment, cold-chain management and loss prevention.' },
      { value: '2,559', label: 'Bach Hoa Xanh stores at the end of 2025', subtitle: '789 opened during the year', description: 'Company-reported network that distribution and inventory systems have to keep supplied.' },
      { value: '3', label: 'Operating levers MWG named for 2025', subtitle: 'Store cost, wastage, warehouse-logistics cost', description: 'Tightening these helped Bach Hoa Xanh report a second consecutive year of profit.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store and lever details are from Mobile World Group’s own 2025 business summary, and the company did not publish the chain’s profit or margin.',
    narrative: [
      { label: 'What it is', text: 'Midstream activities connect suppliers with retail outlets through warehousing, inventory control, distribution and transport. Retailers may run their own distribution centres, outsource logistics to third-party providers or combine centralised and regional facilities. Inventory management is especially important in grocery because products differ in shelf life, storage conditions, sales velocity and replenishment frequency, while general merchandise may have longer storage cycles but more complex assortments.' },
      { label: 'Why it is happening', text: 'A shelf stays full only if the right quantity reaches the right store at the right time. Too little stock loses sales and too much ties up cash and, for fresh food, turns into waste, so careful balance is needed.' },
      { label: 'Real-world example', text: 'Warehouses receive, store, sort and prepare products for distribution, and distribution centres consolidate supplier deliveries and allocate goods to individual stores. Retailers estimate demand from historical sales, seasonality, promotions and local shopping patterns, trigger orders automatically or manually when stock falls below target, keep chilled, frozen and temperature-sensitive products at the right temperature, and reduce damage, spoilage, theft and stock discrepancies.' },
      { label: 'Vietnam example', text: 'Mobile World Group reports that Bach Hoa Xanh opened 789 stores in 2025 to reach 2,559, with revenue of about VND 46.9 trillion, up 14%, and named optimising store costs, reducing wastage and controlling warehouse and logistics costs among the reasons it was profitable for a second consecutive year. For a chain adding stores that quickly, inventory forecasting and distribution capacity have to grow in step with the network.' },
      { label: 'Business impact', text: 'Warehousing and inventory management translate procurement decisions into reliable product availability. Effective systems reduce waste, improve stock turnover and support consistent store operations.' },
    ],
    visualKind: 'grocery-m2-31-warehousing', visualHeading: 'Turning purchasing into availability',
    visualIntro: 'See six midstream activities and the outcome each one delivers.',
    imageAlt: 'Casemate tree mind map of six warehousing and inventory activities and the outcome of each',
    keyTerms: [
      { term: 'Distribution centre', definition: 'A facility that consolidates supplier deliveries and allocates goods to stores.' },
      { term: 'Replenishment', definition: 'Restocking when inventory falls below a target level.' },
      { term: 'Stock turnover', definition: 'How quickly inventory is sold and replaced.' },
      { term: 'Shrinkage', definition: 'Stock lost to damage, spoilage, theft or record errors.' },
    ],
    recap: [
      'Midstream links suppliers to stores through warehousing, inventory control and transport.',
      'Shelf life, storage and sales speed make grocery inventory demanding.',
      'Balance availability against the cost of excess stock.',
      'Forecasting, replenishment, cold chain and loss prevention reduce waste.',
    ],
    chapterRecap: 'Warehousing and inventory management translate procurement decisions into reliable product availability. Effective systems reduce waste, improve stock turnover, and support consistent store operations.',
    deepDiveTitle: 'Why a perishable item has two ways to fail',
    body: <G2DeepDive paragraphs={[
      'A tray of chilled meat that sells out by noon means lost sales and a disappointed shopper. A tray still on the shelf at closing time means waste and cost, and the decision on how many to send was made the day before.' ,
      'Retailers narrow the gap by forecasting at store and product level, replenishing more often in smaller quantities and tracking waste by category, so that mistakes show up quickly and are corrected.',
    ]} evidence="The activities are described qualitatively in the supplied material. Store, revenue and lever details are from Mobile World Group’s own 2025 summary and a VnExpress report of it; the company did not disclose Bach Hoa Xanh’s margin." />,
    sources: citeG2('mwgBusiness2025', 'vnexpressBhx', 'vietcapGrocery'),
  }),
  g2Chapter({
    title: 'Transportation and Logistics Coordination', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how transport capacity, schedules and storage conditions combine, and how Vietnam’s logistics cost compares with its neighbours.',
    mateIntro: 'Every kilometre a lorry drives adds cost to a bag of rice or a box of fish. In a country where logistics is expensive, how well goods are moved can matter as much as how they are made.',
    keyInsight: 'Logistics performance depends on the coordination of transport capacity, delivery schedules, storage conditions, and demand forecasts. Disruptions at any point can increase costs or leave retail shelves understocked.',
    statTiles: [
      { value: '16–17%', label: 'Vietnam’s logistics cost as a share of GDP, 2024', subtitle: 'Ministry of Industry and Trade portal', description: 'Compared with 11% in Japan, 13% in Malaysia and Indonesia, and 8% in Singapore.' },
      { value: '12–15%', label: 'Target logistics cost share of GDP by 2035', subtitle: 'Decision 2229/QD-TTg, October 2025', description: 'Part of a strategy to make Vietnam’s logistics more efficient.' },
      { value: '70–80%', label: 'Target share of enterprises outsourcing logistics', subtitle: 'Same strategy, 2025–2035', description: 'Outsourcing to specialist providers is expected to grow.' },
    ],
    statsNote: 'These are a government portal comparison and official strategy targets; they describe the national logistics environment, not the cost of any retailer.',
    narrative: [
      { label: 'What it is', text: 'Transportation moves products between farms, factories, ports, warehouses, distribution centres, stores and fulfilment facilities. The network may include road freight, container shipping, air freight and specialised temperature-controlled transport. Grocery retailers generally need frequent replenishment and careful handling, while general merchandise retailers may prioritise shipment consolidation, container utilisation and cost-efficient long-distance transport.' },
      { label: 'Why it is happening', text: 'Goods cross several stages and modes, each with its own capacity, timing and conditions. When these are not coordinated, costs rise and products arrive late or damaged, so shelves can go empty.' },
      { label: 'Real-world example', text: 'Inbound logistics move products from farms, factories, import terminals and suppliers to warehouses, while outbound distribution delivers stock from distribution centres to stores or fulfilment facilities. Retailers plan routes to cut travel time, fuel use and transport cost, combine shipments from several suppliers to improve vehicle use, preserve fresh, chilled and frozen goods through temperature-controlled transport, and outsource transport, warehousing or fulfilment to specialist providers.' },
      { label: 'Vietnam example', text: 'The Ministry of Industry and Trade’s logistics portal reported Vietnam’s logistics costs at 16–17% of GDP in 2024, against 11% in Japan, 13% in Malaysia and Indonesia and 8% in Singapore. A 2025 national strategy sets targets of 12–15% by 2035, outsourcing by 70–80% of enterprises and digital solutions in 80% of logistics firms, and FiinGroup estimates the cold-chain market at US$202 million in 2024, growing 8–13% a year to 2028.' },
      { label: 'Business impact', text: 'Logistics coordination connects physical supply with retail demand. A well-designed network improves delivery reliability while controlling transport costs and product losses.' },
    ],
    visualKind: 'grocery-m2-32-logistics-cost', visualHeading: 'Logistics cost as a share of GDP',
    visualIntro: 'Compare Vietnam’s logistics cost with four neighbours and comparators.',
    imageAlt: 'Casemate bar chart of logistics cost as a share of GDP for Vietnam, Malaysia, Indonesia, Japan and Singapore',
    keyTerms: [
      { term: 'Inbound logistics', definition: 'Moving products from suppliers and import points to warehouses.' },
      { term: 'Outbound distribution', definition: 'Delivering stock from distribution centres to stores or fulfilment points.' },
      { term: 'Load consolidation', definition: 'Combining shipments to use vehicles more fully.' },
      { term: 'Temperature-controlled transport', definition: 'Vehicles that keep fresh, chilled or frozen goods at a set temperature.' },
    ],
    recap: [
      'Transport links farms, factories, ports, warehouses, stores and fulfilment sites.',
      'Grocery needs frequent, careful replenishment; merchandise favours consolidation.',
      'Coordination of capacity, schedules, storage and forecasts drives performance.',
      'Disruption anywhere raises cost or empties shelves.',
    ],
    chapterRecap: 'Logistics coordination connects physical supply with retail demand. A well-designed network improves delivery reliability while controlling transportation costs and product losses.',
    deepDiveTitle: 'Why logistics cost is a retailer’s problem even when it outsources',
    body: <G2DeepDive paragraphs={[
      'Using a third-party logistics provider moves the work but not the consequences. If delivery is late or a chilled load warms in transit, the retailer still has an empty shelf or a write-off.' ,
      'That is why retailers set service levels with providers, share forecasts and track on-time and in-full delivery, and why national efforts to cut logistics cost matter to anyone selling goods that move long distances.',
    ]} evidence="The activities are described qualitatively in the supplied material. The logistics cost comparison is from the Ministry of Industry and Trade’s logistics portal (March 2024), the targets are from Decision 2229/QD-TTg, and the cold-chain estimate is a FiinGroup figure rather than an official statistic." />,
    sources: citeG2('logisticsCostPortal', 'logisticsStrategy', 'fiinColdChain'),
  }),
  g2Chapter({
    title: 'Demand Planning, Data Integration, and Supply-Chain Technology', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the main supply-chain systems and explain why connecting them matters more than owning any one.',
    mateIntro: 'Every sale, every delivery and every order leaves a trace. Retailers that connect these traces can see tomorrow’s shortage today. Those that keep them in separate systems find out when the shelf is empty.',
    keyInsight: 'The strategic value of supply-chain technology lies in turning operational data into better decisions. Accurate forecasts and timely information can reduce stockouts, excess inventory, and avoidable waste.',
    statTiles: [
      { value: '6', label: 'Planning and technology tools', subtitle: 'Forecasting to AI-assisted planning', description: 'Demand forecasting, ERP, WMS, TMS, EDI and AI-assisted planning.' },
      { value: '1 Jun 2025', label: 'Vietnam’s e-invoice rules took effect', subtitle: 'Decree 70/2025/ND-CP', description: 'Purchasing and billing systems have to produce compliant electronic documents.' },
      { value: '7M+', label: 'Successful online transactions at Bach Hoa Xanh in 2025', subtitle: '+150% in the year', description: 'About VND 2.3 trillion, nearly 5% of the chain’s revenue.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the e-invoice date is from an official policy summary and the online figures are from the company’s own 2025 summary.',
    narrative: [
      { label: 'What it is', text: 'Retailers use sales records, inventory data, supplier information and promotional calendars to plan product flows across their networks. Modern systems increasingly connect procurement, warehousing, transport and store-level sales through integrated digital platforms. Technology can improve forecasting and operational visibility, but its effectiveness depends on data quality, system integration, staff capability and supplier participation.' },
      { label: 'Why it is happening', text: 'Retail generates enormous amounts of data, and the value is realised only when it is turned into decisions: how much to order, where to send it and when to replenish. Systems that connect partners help avoid duplicate work and delays.' },
      { label: 'Real-world example', text: 'Retailers predict sales by product, location, season and promotional period; integrate purchasing, finance, inventory and operational data in enterprise resource planning systems; track stock locations, picking and productivity in warehouse management systems; and coordinate carriers, routes, schedules and freight costs in transportation management systems. They exchange purchase orders, invoices and shipment information through electronic data interchange, and use AI to identify demand patterns and recommend replenishment quantities.' },
      { label: 'Vietnam example', text: 'Vietnam’s e-invoice rules under Decree 70/2025 took effect on 1 June 2025, which pushes purchasing and billing data into connected electronic systems. The 2025 national logistics strategy aims for digital solutions in 80% of logistics firms, and Bach Hoa Xanh reported more than 7 million successful online transactions in 2025, worth about VND 2.3 trillion and growing 150%, which depends on accurate stock and order data.' },
      { label: 'Business impact', text: 'Digital integration improves visibility across the midstream value chain. Retailers gain the greatest benefit when systems connect suppliers, logistics operations and store-level demand rather than operating as isolated tools.' },
    ],
    visualKind: 'grocery-m2-33-planning', visualHeading: 'Six tools that turn operating data into decisions',
    visualIntro: 'See six planning and technology tools around one goal and what each gives a retailer.',
    imageAlt: 'Casemate mind map of six supply-chain planning and technology tools and what each gives',
    keyTerms: [
      { term: 'ERP', definition: 'Enterprise resource planning software that integrates purchasing, finance, inventory and operations.' },
      { term: 'WMS', definition: 'Warehouse management system that tracks stock locations and picking.' },
      { term: 'TMS', definition: 'Transportation management system that coordinates carriers, routes and freight cost.' },
      { term: 'EDI', definition: 'Electronic data interchange for exchanging orders, invoices and shipment data between partners.' },
    ],
    recap: [
      'Sales, inventory, supplier and promotion data drive planning.',
      'Integrated platforms connect procurement, warehousing, transport and store sales.',
      'Value depends on data quality, integration, staff capability and supplier participation.',
      'Turn data into decisions that reduce stockouts, excess stock and waste.',
    ],
    chapterRecap: 'Digital integration improves visibility across the midstream value chain. Retailers gain the greatest benefit when systems connect suppliers, logistics operations, and store-level demand rather than operating as isolated tools.',
    deepDiveTitle: 'Why bad data makes good software useless',
    body: <G2DeepDive paragraphs={[
      'A forecasting tool fed with incomplete sales records, wrong product codes or inaccurate stock counts will produce confident, wrong answers. The software is only as good as the records that go in.' ,
      'Retailers therefore start with the basics: accurate product master data, reliable stock counts and consistent supplier information. Only then do advanced forecasts and AI planning give returns.',
    ]} evidence="The tools are described qualitatively in the supplied material. The e-invoice date is from an official policy summary, the digitalisation target is from the national logistics strategy and the online figures are Mobile World Group’s own." />,
    sources: citeG2('vnEInvoice', 'logisticsStrategy', 'mwgBusiness2025'),
  }),
];

const quiz = g2Quiz('grocery-m2-l3', [
  { chapter: '1', objective: 'Describe midstream', question: 'What do midstream activities do?', application: 'Goods move from suppliers to stores through warehouses. Which stage is this?', correct: 'Connect suppliers with outlets through warehousing, inventory control, distribution and transport', wrong: ['Grow crops', 'Design store logos', 'Run loyalty schemes'], explanation: 'Midstream turns procurement into availability. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the inventory balance', question: 'What must retailers balance in inventory management?', application: 'A store overstocks fresh milk. What was missed?', correct: 'Availability against the cost of holding excess stock, especially for perishables', wrong: ['Sales against advertising', 'Staff against stock', 'Colour against size'], explanation: 'Midstream efficiency affects availability, cost and waste. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe cold-chain management', question: 'What does cold-chain management maintain?', application: 'Frozen products arrive warm. Which process failed?', correct: 'Appropriate temperatures for chilled, frozen and other temperature-sensitive products', wrong: ['Shelf displays', 'Staff rosters', 'Loyalty points'], explanation: 'Cold chain protects quality and food safety. Review Chapter 1.' },
  { chapter: '1', objective: 'List loss-prevention aims', question: 'What does inventory loss prevention reduce?', application: 'A store has frequent stock discrepancies. What should it address?', correct: 'Damage, spoilage, theft and stock discrepancies', wrong: ['Sales volume', 'Customer visits', 'Supplier choice'], explanation: 'Loss prevention protects margin. Review Chapter 1.' },
  { chapter: '2', objective: 'State the logistics principle', question: 'What does logistics performance depend on?', application: 'Shelves are empty despite stock in the warehouse. What may be wrong?', correct: 'Coordination of transport capacity, delivery schedules, storage conditions and demand forecasts', wrong: ['Only vehicle colour', 'Only fuel price', 'Only store size'], explanation: 'Disruption at any point raises cost or understocks shelves. Review Chapter 2.' },
  { chapter: '2', objective: 'Read Vietnam’s logistics cost', question: 'About what share of GDP did Vietnam’s logistics cost represent in 2024 according to the ministry’s logistics portal?', application: 'A planner compares countries. What was Vietnam’s share?', correct: 'About 16–17%', wrong: ['About 8%', 'About 30%', 'About 1%'], explanation: 'Japan 11%, Malaysia and Indonesia 13%, Singapore 8%. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe route planning', question: 'What is the purpose of route optimisation?', application: 'A fleet reorganises its delivery routes. What does it aim to reduce?', correct: 'Travel time, fuel consumption and transport costs', wrong: ['Product quality', 'Store hours', 'Supplier count'], explanation: 'Routes are planned for efficiency. Review Chapter 2.' },
  { chapter: '2', objective: 'Define 3PL', question: 'What does third-party logistics mean?', application: 'A retailer outsources warehousing and delivery. What is this called?', correct: 'Outsourcing transport, warehousing or fulfilment to specialist providers', wrong: ['Buying from three suppliers', 'Opening three stores', 'Selling in three channels'], explanation: '3PL providers handle logistics for other companies. Review Chapter 2.' },
  { chapter: '3', objective: 'State the value of supply-chain technology', question: 'Where does the strategic value of supply-chain technology lie?', application: 'A retailer buys software but decisions do not improve. What was missing?', correct: 'In turning operational data into better decisions', wrong: ['In owning more systems', 'In replacing all staff', 'In hiding data'], explanation: 'Accurate forecasts and timely information reduce stockouts, excess inventory and waste. Review Chapter 3.' },
  { chapter: '3', objective: 'Define EDI', question: 'What does electronic data interchange do?', application: 'Orders and invoices pass automatically between a retailer and a supplier. What is this?', correct: 'Exchanges purchase orders, invoices and shipment information between business partners', wrong: ['Designs product packaging', 'Measures store traffic', 'Prints price labels'], explanation: 'EDI speeds and standardises partner communication. Review Chapter 3.' },
]);

export const LESSON_G2_3: GroceryM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how warehousing and inventory control create availability, how transport and logistics are coordinated, how Vietnam’s logistics cost compares and how supply-chain technology turns data into decisions.',
    keyTakeaways: [
      'Midstream efficiency drives availability, operating cost and waste.',
      'Balance availability against the cost of holding excess stock, especially for perishables.',
      'Logistics performance depends on coordinating capacity, schedules, storage and forecasts.',
      'Vietnam’s logistics cost is high against its neighbours and targeted to fall.',
      'Technology pays when it turns operating data into better decisions.',
    ],
    businessImplications: 'Forecast at store and product level, replenish more often in smaller quantities, set service levels with logistics providers, and fix data quality and integration before adding advanced tools.',
    remember: 'Availability is built in the warehouse and on the road long before it shows on the shelf.',
    nextLesson: 'Store Network & Channel Operations',
  },
};
