import { G2DeepDive, citeG2, g2Chapter, g2Quiz } from './groceryM2Core';
import type { GroceryM2LessonBundle } from './groceryM2Core';

const LESSON = '2. Upstream Activities';

const deck = [
  g2Chapter({
    title: 'Raw Materials, Agricultural Production, and Product Manufacturing', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify the upstream activities behind grocery and general merchandise and the risks that pass through to retailers.',
    mateIntro: 'A storm over the vegetable-growing highlands or a jump in energy prices can empty a shelf a week later, though the store owns neither farm nor factory. Upstream is where a retailer’s costs and risks quietly begin.',
    keyInsight: 'Retailers are exposed to upstream risks even when they do not directly own farms or factories. Weather disruptions, commodity-price changes, energy costs, production capacity, and supplier quality can all affect retail margins and product availability.',
    statTiles: [
      { value: '6', label: 'Upstream activities', subtitle: 'Farming to quality assurance', description: 'Agricultural production, livestock and aquaculture, food processing, consumer goods manufacturing, packaging and quality assurance.' },
      { value: '~35%', label: 'Fresh food’s share of Bach Hoa Xanh sales, H1 2024', subtitle: 'Broker estimate', description: 'Meat, fruit and vegetables are the main contributors, so the chain is highly exposed to upstream supply.' },
      { value: '14', label: 'WinEco farms', subtitle: 'WinCommerce vegetable supply', description: 'Company-reported farms across northern, southern and highland regions producing to VietGAP and GlobalGAP standards.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the fresh-food share is a broker estimate and the farm count is a company statement reported by a news outlet.',
    narrative: [
      { label: 'What it is', text: 'Upstream activities begin with the production and processing of goods before they enter retail distribution. In grocery these include farming, livestock production, fishing, food processing and beverage manufacturing, while general merchandise adds textile production, plastics manufacturing, electronics assembly and household-goods production. Upstream performance affects availability, input cost, quality, traceability and a retailer’s ability to respond to changing demand.' },
      { label: 'Why it is happening', text: 'Retail margins are thin, so a swing in crop prices, energy cost or supplier quality passes quickly into prices and availability. Retailers cannot control these risks directly, but they can plan for them through sourcing choices and supplier relationships.' },
      { label: 'Real-world example', text: 'Upstream actors grow rice, vegetables, fruit and other crops for retail sale, produce meat, eggs, milk, fish and seafood, and convert agricultural products into frozen foods, canned goods, dairy products and packaged meals. Consumer-goods manufacturers produce detergents, personal-care products, kitchenware and household supplies, while packaging and labelling prepare products for transport, storage, shelf and regulation and quality assurance tests for safety, consistency and standards.' },
      { label: 'Vietnam example', text: 'Vietcap’s broker research notes that Vietnam’s fresh food comes mainly from millions of small agricultural households, which makes the chain fragmented. About 35% of Bach Hoa Xanh’s sales in the first half of 2024 came from fresh food, according to the broker’s estimate, and WinCommerce supplies vegetables from 14 WinEco farms. A USDA report also notes that Vietnam is a major producer of pork, poultry, seafood, fruit and vegetables, and the government promotes local products through the One Commune One Product programme.' },
      { label: 'Business impact', text: 'Upstream activities establish the cost, quality and reliability of products entering the retail system. Strong sourcing practices help retailers manage volatility and maintain consistent product standards.' },
    ],
    visualKind: 'grocery-m2-21-upstream', visualHeading: 'Where cost, quality and reliability begin',
    visualIntro: 'See six upstream activities and the risk each passes on to retailers.',
    imageAlt: 'Casemate mind map of six upstream activities and the retail exposure each creates',
    keyTerms: [
      { term: 'Upstream', definition: 'The activities that produce and process goods before they reach retail distribution.' },
      { term: 'Aquaculture', definition: 'Farming of fish, shrimp and other aquatic products.' },
      { term: 'Commodity price', definition: 'The market price of basic goods such as grain, meat or energy.' },
      { term: 'Quality assurance', definition: 'Testing and controls that keep products safe and consistent.' },
    ],
    recap: [
      'Upstream covers farming, livestock, fishing, processing and manufacturing.',
      'General merchandise adds textiles, plastics, electronics and household goods.',
      'Upstream sets cost, quality, traceability and availability.',
      'Strong sourcing practices manage volatility.',
    ],
    chapterRecap: 'Upstream activities establish the cost, quality, and reliability of products entering the retail system. Strong sourcing practices help retailers manage volatility and maintain consistent product standards.',
    deepDiveTitle: 'Why fresh food carries the most upstream risk',
    body: <G2DeepDive paragraphs={[
      'Fresh products cannot be stockpiled for long, depend on weather and disease, and are produced by many small suppliers. A bad harvest or a livestock disease appears at once as higher prices or empty shelves.' ,
      'Packaged goods are more forgiving because they can be stored and sourced from large manufacturers, which is why retailers with high fresh-food sales invest more in upstream relationships and quality systems.',
    ]} evidence="The activities are described qualitatively in the supplied material. The fresh-food share is a broker estimate for one chain, the farm count is a company statement, and the USDA and Vietcap observations describe the market in general terms." />,
    sources: citeG2('vietcapGrocery', 'winEcoFarms', 'usdaRetailFoods'),
  }),
  g2Chapter({
    title: 'Supplier Selection, Procurement, and Contracting', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how procurement terms beyond price influence margin, availability and differentiation.',
    mateIntro: 'The cheapest quote is rarely the cheapest supplier. A late delivery, a minimum order that is too big or a product that fails inspection can cost more than the discount saved.',
    keyInsight: 'Procurement is a major source of retail competitiveness because even small differences in purchasing cost, supplier terms, and product availability can influence margins and shelf prices across high-volume product categories.',
    statTiles: [
      { value: '6', label: 'Procurement activities', subtitle: 'Evaluation to diversification', description: 'Supplier evaluation, price negotiation, contract management, assortment planning, direct sourcing and diversification.' },
      { value: '~20% each', label: 'Share of modern grocery retail held by WinCommerce and Bach Hoa Xanh, 2023', subtitle: 'Broker estimate', description: 'Scale at this level strengthens purchasing power with suppliers.' },
      { value: '5', label: 'Companies named as importing directly from the United States', subtitle: 'MM Mega Market, WinMart and others', description: 'Most Vietnamese retailers buy imported goods through importers or distributors instead.' },
    ],
    statsNote: 'The first tile is a count from this lesson; market shares are broker estimates and the import observation is from a USDA report on U.S. products, so they illustrate procurement models rather than total imports.',
    narrative: [
      { label: 'What it is', text: 'Procurement identifies suppliers, negotiates commercial terms, selects product assortments and arranges purchasing volumes. Retailers may work with local producers, multinational manufacturers, importers, wholesalers or specialised suppliers depending on their format and target market. Decisions consider more than purchase price: lead times, minimum order quantities, payment terms, delivery reliability, product differentiation and compliance requirements also matter.' },
      { label: 'Why it is happening', text: 'In high-volume categories a small difference in unit cost, payment terms or availability becomes a large difference in margin and shelf price. Procurement is therefore a main lever of competitiveness.' },
      { label: 'Real-world example', text: 'Retailers assess product quality, production capacity, delivery performance, certifications and financial stability; agree prices, promotional contributions, rebates and payment terms; and set delivery schedules, quality requirements, return policies and service levels. They plan assortments of national brands, private-label products, imported goods and local specialties, buy vegetables, fruit or seafood directly from qualified producers, and keep alternative sources for critical products.' },
      { label: 'Vietnam example', text: 'Vietcap notes that retailers with high fresh-food sales can buy directly from large agricultural producers and secure favourable back margins, particularly for protein, while vegetables and fruit are harder because supply is more fragmented. Bach Hoa Xanh and WinCommerce each held about 20% of modern grocery in 2023, and a USDA report says that only a few large chains import directly, since most Vietnamese retailers prefer to buy imported goods from importers and distributors because of complex procedures and tariffs.' },
      { label: 'Business impact', text: 'Procurement determines which products enter the retail network and under what commercial conditions. Effective procurement balances affordability, quality, supply security and product differentiation.' },
    ],
    visualKind: 'grocery-m2-22-procurement', visualHeading: 'Procurement decides what enters the network, and on what terms',
    visualIntro: 'See six procurement activities and what each one decides.',
    imageAlt: 'Casemate tree mind map of six procurement activities and what each decides',
    keyTerms: [
      { term: 'Back margin', definition: 'Income a retailer earns from suppliers through rebates and contributions, in addition to the sales margin.' },
      { term: 'Minimum order quantity', definition: 'The smallest volume a supplier will sell in one order.' },
      { term: 'Service level', definition: 'An agreed standard for delivery timeliness and completeness.' },
      { term: 'Direct sourcing', definition: 'Buying from the producer without an intermediary.' },
    ],
    recap: [
      'Procurement covers supplier choice, terms, volumes and assortments.',
      'Lead times, minimums, payment terms, reliability and compliance matter beyond price.',
      'Small cost and terms differences scale across high-volume categories.',
      'Balance affordability, quality, supply security and differentiation.',
    ],
    chapterRecap: 'Procurement determines which products enter the retail network and under what commercial conditions. Effective procurement balances affordability, quality, supply security, and product differentiation.',
    deepDiveTitle: 'Why buying direct is easier for protein than for vegetables',
    body: <G2DeepDive paragraphs={[
      'Meat, eggs and seafood are produced by a smaller number of large companies, so a retailer can sign a supply contract for volume and quality. Vegetables and fruit come from many small farms, so retailers work through cooperatives and wholesalers.' ,
      'As large retailers grow, they can help larger suppliers of vegetables and fruit to emerge, which in turn makes supply more stable. Until then, a mix of sources is the practical answer.',
    ]} evidence="The procurement activities are described qualitatively in the supplied material. The market shares and sourcing observations are from Vietcap broker research and the import observation is from a USDA report; both describe general patterns." />,
    sources: citeG2('vietcapGrocery', 'usdaRetailFoods'),
  }),
  g2Chapter({
    title: 'Supplier Standards, Traceability, and Risk Management', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how audits, traceability and contingency planning protect product integrity, and how Vietnam’s traceability rules are developing.',
    mateIntro: 'When a batch of chilled chicken has to be pulled, the retailer needs to know in minutes which suppliers, farms and stores were involved. Traceability is the system that makes that possible.',
    keyInsight: 'Supplier governance is both a risk-control function and a source of consumer trust. Weak upstream controls can lead to product recalls, reputational damage, regulatory penalties, and loss of customer confidence.',
    statTiles: [
      { value: '6', label: 'Governance activities', subtitle: 'Audits to sustainability screening', description: 'Supplier audits, product traceability, food-safety verification, import compliance, contingency planning and sustainability screening.' },
      { value: '1 Jan 2026', label: 'Amended Law on Product and Goods Quality took effect', subtitle: 'Law 78/2025/QH15', description: 'Adds a traceability and supply-chain transparency article; traceability is mandatory for high-risk products set by ministries.' },
      { value: '2', label: 'National standards for tracing codes and data carriers', subtitle: 'TCVN 13274:2020 and TCVN 13275:2020', description: 'Circular 02/2024/TT-BKHCN requires conformity and a one-step-forward, one-step-back principle.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the legal points are from legal-database summaries, and mandatory traceability depends on products a ministry designates as high-risk, so confirm the current list.',
    narrative: [
      { label: 'What it is', text: 'Retailers must assess risks related to food safety, product authenticity, labour practices, environmental performance and regulatory compliance. These concerns matter most for fresh food, chilled products, imported merchandise and categories with specific safety standards. Traceability systems help identify product origins, track batches, manage recalls and investigate quality incidents across the supply chain.' },
      { label: 'Why it is happening', text: 'A single failure upstream can reach many customers quickly, so retailers carry responsibility for what they sell. Governance protects consumers and the retailer’s reputation, and it increasingly meets legal requirements.' },
      { label: 'Real-world example', text: 'Retailers review production facilities, hygiene practices, working conditions and compliance records; record supplier information, batch numbers, production dates and distribution routes; and check test results, certifications and handling requirements. They verify documents, product standards, labelling and customs requirements for imports, identify alternative suppliers and prepare for shortages or logistics interruptions, and assess packaging waste, responsible sourcing and environmental risks.' },
      { label: 'Vietnam example', text: 'Vietnam’s amended Law on Product and Goods Quality, effective 1 January 2026, adds a traceability and supply-chain transparency article under which traceability becomes mandatory for products a ministry designates as high-risk, and encourages it for others. Circular 02/2024/TT-BKHCN sets a one-step-forward, one-step-back principle and national standards for tracing codes. Retailers such as WinCommerce already stress VietGAP/GlobalGAP-standard vegetables and MEATDeli meat produced to European standards.' },
      { label: 'Business impact', text: 'Upstream risk management protects product integrity and supply continuity. Traceability, supplier standards and contingency planning are essential for building a resilient retail value chain.' },
    ],
    visualKind: 'grocery-m2-23-governance', visualHeading: 'Supplier governance protects both product and trust',
    visualIntro: 'See six governance activities around supplier risk and what each one protects.',
    imageAlt: 'Casemate orbit mind map of six supplier-governance activities and what each protects',
    keyTerms: [
      { term: 'Traceability', definition: 'The ability to follow a product back to its supplier, batch and production date.' },
      { term: 'Recall', definition: 'Removing an unsafe or faulty product batch from sale and from customers.' },
      { term: 'Supplier audit', definition: 'A review of a supplier’s facilities, practices and compliance records.' },
      { term: 'Contingency planning', definition: 'Preparing alternative sources and responses for shortages or disruption.' },
    ],
    recap: [
      'Risks cover food safety, authenticity, labour, environment and compliance.',
      'Traceability records origins, batches and distribution routes for recalls and investigations.',
      'Weak controls cause recalls, penalties and lost trust.',
      'Standards, traceability and contingency plans build resilience.',
    ],
    chapterRecap: 'Upstream risk management protects product integrity and supply continuity. Traceability, supplier standards, and contingency planning are essential for building a resilient retail value chain.',
    deepDiveTitle: 'Why one step forward and one step back is enough to start',
    body: <G2DeepDive paragraphs={[
      'A retailer does not need to know every stage of a product’s life to act quickly. If it knows who supplied each batch and where that batch was sent, it can pull the affected stock and tell the supplier.' ,
      'Extending the same record one step at a time up the chain, to the producer and then the farm, builds a full picture without requiring everything at once, and fits the stepwise approach Vietnam’s rules take.',
    ]} evidence="The governance activities are described qualitatively in the supplied material. The legal points are from legal-database summaries of the amended Law on Product and Goods Quality and Circular 02/2024/TT-BKHCN; mandatory scope depends on ministerial lists." />,
    sources: citeG2('productQualityLaw', 'traceCircular', 'winCommerceExpansion', 'vnLabelling'),
  }),
];

const quiz = g2Quiz('grocery-m2-l2', [
  { chapter: '1', objective: 'Name upstream activities', question: 'Which of these is an upstream activity in grocery retail?', application: 'A farm grows vegetables and a plant makes canned goods. Which stage are they?', correct: 'Agricultural production and food processing', wrong: ['Store checkout', 'Customer loyalty programmes', 'Home delivery'], explanation: 'Upstream begins with production and processing. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe upstream risk', question: 'Why are retailers exposed to upstream risks?', application: 'A retailer owns no farms. Why can weather still hurt it?', correct: 'Weather, commodity prices, energy costs, capacity and supplier quality affect margins and availability even without ownership', wrong: ['Retailers always own farms', 'Upstream risks do not reach retail', 'Only exporters are affected'], explanation: 'Upstream performance affects cost, quality and availability. Review Chapter 1.' },
  { chapter: '1', objective: 'Add general merchandise upstream', question: 'What does general merchandise add upstream?', application: 'A retailer also sells kettles and clothing. What upstream activities apply?', correct: 'Textile production, plastics manufacturing, electronics assembly and household-goods production', wrong: ['Only farming', 'Only fishing', 'Only milk production'], explanation: 'General merchandise has its own manufacturing base. Review Chapter 1.' },
  { chapter: '2', objective: 'List procurement considerations', question: 'What does procurement consider beyond purchase price?', application: 'A supplier offers the lowest price but delivers late. What did the buyer overlook?', correct: 'Lead times, minimum orders, payment terms, delivery reliability, differentiation and compliance', wrong: ['Only the supplier’s logo', 'Only the supplier’s location', 'Nothing else'], explanation: 'Supplier selection weighs several factors. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain why procurement matters', question: 'Why is procurement a major source of competitiveness?', application: 'A small cost difference appears across a million units. What happens?', correct: 'Small differences in cost, terms and availability influence margins and shelf prices across high-volume categories', wrong: ['It does not matter in high volume', 'It affects only luxury goods', 'It only affects advertising'], explanation: 'Scale magnifies small differences. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare protein and produce sourcing', question: 'Why is sourcing vegetables and fruit harder than sourcing protein in Vietnam?', application: 'A retailer can sign a pork contract but struggles with vegetables. Why?', correct: 'Vegetable and fruit supply is more fragmented, while protein supply is more centralised', wrong: ['Vegetables are always imported', 'Protein has more suppliers', 'Vegetables have no seasons'], explanation: 'Fragmentation makes cooperative and wholesaler sourcing necessary. Review Chapter 2.' },
  { chapter: '2', objective: 'Define supplier diversification', question: 'What is the purpose of supplier diversification?', application: 'A retailer keeps two sources for rice. What does this achieve?', correct: 'To reduce supply-disruption risk for critical products', wrong: ['To increase prices', 'To avoid contracts', 'To remove quality checks'], explanation: 'Alternative sources provide resilience. Review Chapter 2.' },
  { chapter: '3', objective: 'Describe governance value', question: 'Why is supplier governance both risk control and a source of trust?', application: 'A recall damages a retailer’s reputation. What could have reduced the risk?', correct: 'Strong upstream controls reduce recalls, penalties and loss of customer confidence', wrong: ['Weak controls build trust', 'Governance has no effect on reputation', 'Only advertising protects reputation'], explanation: 'Weak upstream controls can cause serious damage. Review Chapter 3.' },
  { chapter: '3', objective: 'Define traceability', question: 'What does a traceability system do?', application: 'A retailer must find all stores that received a faulty batch. What helps?', correct: 'Identifies product origins, tracks batches, manages recalls and supports investigations', wrong: ['Sets selling prices', 'Designs shelves', 'Hires staff'], explanation: 'Traceability records suppliers, batches and distribution routes. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Vietnamese traceability rules', question: 'What principle does Circular 02/2024/TT-BKHCN set for traceability systems?', application: 'A system must be able to identify the previous and next stage. What is the principle called?', correct: 'One step forward, one step back', wrong: ['Two steps forward, none back', 'Only the final sale is recorded', 'Traceability is optional everywhere'], explanation: 'Systems must support forward and backward tracking. Review Chapter 3.' },
]);

export const LESSON_G2_2: GroceryM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can identify the upstream activities behind grocery retail, explain how procurement terms and supplier governance shape cost and trust, and describe how traceability rules are developing in Vietnam.',
    keyTakeaways: [
      'Retailers are exposed to upstream weather, price, energy, capacity and quality risks.',
      'Procurement is a major source of competitiveness through terms as well as price.',
      'Fresh protein is easier to source directly than vegetables and fruit.',
      'Traceability, supplier standards and contingency plans protect trust and supply.',
      'Vietnam is moving toward mandatory traceability for high-risk products.',
    ],
    businessImplications: 'Evaluate suppliers on total reliability, keep alternative sources for critical products, build traceability one step at a time and treat supplier governance as part of the brand.',
    remember: 'Know your suppliers, your terms and your batches before a problem tests them.',
    nextLesson: 'Distribution, Logistics & Inventory',
  },
};
