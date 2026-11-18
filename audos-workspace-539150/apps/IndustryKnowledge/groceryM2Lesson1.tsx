import { G2DeepDive, citeG2, g2Chapter, g2Quiz } from './groceryM2Core';
import type { GroceryM2LessonBundle } from './groceryM2Core';

const LESSON = '1. Value Chain Overview';

const deck = [
  g2Chapter({
    title: 'Value Chain Structure and Main Participants', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the stages and participants that move products from their sources to shoppers and the role the retailer plays in coordinating them.',
    mateIntro: 'A tin of sardines or a bunch of morning glory has passed through several hands before it reaches a shelf. The retailer sits in the middle, and its job is to make a scattered supply feel like one reliable shop.',
    keyInsight: 'Retailers create value not only by selling products but also by coordinating fragmented suppliers, ensuring product availability, managing inventory, maintaining quality, and providing convenient shopping experiences.',
    statTiles: [
      { value: '5', label: 'Core retailer activities', subtitle: 'Coordination to fulfilment', description: 'Supplier coordination, product sourcing, distribution and logistics, retail operations and consumer fulfilment.' },
      { value: '~1.4M', label: 'Grocery stores in Vietnam', subtitle: 'NielsenIQ Vietnam', description: 'The downstream end of the chain, contributing up to 65% of fast-moving consumer goods sales.' },
      { value: 'US$15.7B', label: 'Consumer-oriented products imported into Vietnam, 2024', subtitle: '+9.9% (USDA)', description: 'A large flow that reaches shelves mostly through importers and distributors.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store count is a NielsenIQ figure reported by Viet Nam News and the import value is a USDA figure for consumer-oriented agricultural products, so neither measures the whole value chain.',
    narrative: [
      { label: 'What it is', text: 'The value chain of grocery and general merchandise retail covers all the activities needed to move products from their original sources to end consumers. It connects raw-material producers, manufacturers, processors, distributors, logistics providers, retailers and consumers. The structure varies by category: fresh food typically involves agricultural producers, food processors, cold-chain operators and quality-control systems, while packaged goods and household merchandise often rely on manufacturers, importers, wholesalers and centralised distribution networks.' },
      { label: 'Why it is happening', text: 'Supply is scattered across many small producers and suppliers, while demand is concentrated in stores that need steady availability. The retailer becomes the point where the two meet, and the value it adds is in coordination as much as in selling.' },
      { label: 'Real-world example', text: 'Retailers establish relationships with farmers, manufacturers, importers and wholesalers; select products on quality, price, consumer demand and supply reliability; move goods from production sites to warehouses, distribution centres and stores; and manage assortment, pricing, merchandising, checkout and service. They then fulfil demand through physical stores, click-and-collect or home delivery.' },
      { label: 'Vietnam example', text: 'Broker research by Vietcap describes a fragmented fresh-food chain in Vietnam in which millions of agricultural households are the source, and large retailers rarely buy directly from them, so traders, collectors and cooperatives bridge the gap and products pass through several layers. At the other end, NielsenIQ counts nearly 1.4 million grocery stores, and consumer-oriented products worth US$15.7 billion were imported in 2024, mostly through importers and distributors.' },
      { label: 'Business impact', text: 'The value chain links supply-side production with consumer demand. Retailers sit at the centre of this system, coordinating product flows, commercial relationships and customer-facing activities.' },
    ],
    visualKind: 'grocery-m2-11-structure', visualHeading: 'From source to shopper: the grocery value chain',
    visualIntro: 'Follow six stages from producers to consumers and see what each one contributes.',
    imageAlt: 'Casemate flow of six stages in the grocery value chain from primary producers to consumers',
    keyTerms: [
      { term: 'Value chain', definition: 'All the activities that move a product from its source to the end consumer.' },
      { term: 'Cold chain', definition: 'Temperature-controlled storage and transport for perishable products.' },
      { term: 'Wholesaler', definition: 'A business that buys from many suppliers and sells in bulk to retailers.' },
      { term: 'Fulfilment', definition: 'Delivering the product to the customer through a store, pickup point or home delivery.' },
    ],
    recap: [
      'The chain links producers, manufacturers, distributors, logistics firms, retailers and consumers.',
      'Fresh food and packaged goods follow different structures.',
      'Retailers add value through coordination, availability, inventory, quality and convenience.',
      'Retailers sit at the centre of product flows and commercial relationships.',
    ],
    chapterRecap: 'The value chain links supply-side production with consumer demand. Retailers sit at the center of this system, coordinating product flows, commercial relationships, and customer-facing activities.',
    deepDiveTitle: 'Why coordination is a product in itself',
    body: <G2DeepDive paragraphs={[
      'A shopper rarely thinks about how many farms, factories and trucks stand behind a shelf. What the shopper notices is whether the product is there, fresh and fairly priced. Delivering that reliably from a scattered supply is the retailer’s real service.' ,
      'It is also why retailers that coordinate well can earn margin on goods they do not make: they save the customer and the supplier the cost of finding each other.',
    ]} evidence="The structure and activities are described qualitatively in the supplied material. The Vietnamese fresh-food chain description is broker research from October 2024, the store count is NielsenIQ data as reported by Viet Nam News, and the import value is USDA data for consumer-oriented agricultural products." />,
    sources: citeG2('vietcapGrocery', 'nielsenGrocery', 'usdaRetailFoods'),
  }),
  g2Chapter({
    title: 'Value Chain Participants and Relationships', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how bargaining power, intermediaries and supporting services shape cost, speed, quality and the distribution of profit.',
    mateIntro: 'Two retailers can sell the same product and pay very different prices for it. One buys direct in large volumes, while the other buys through a wholesaler. The relationships in the chain matter as much as the product.',
    keyInsight: 'The efficiency of the value chain depends on how well participants coordinate supply, information, and payments. Larger retailers may gain advantages through purchasing scale and stronger supplier relationships, while smaller retailers may rely on wholesalers and local distribution networks.',
    statTiles: [
      { value: '6', label: 'Participant groups', subtitle: 'Producers to supporting services', description: 'Primary producers, manufacturers, intermediaries, logistics services, retail distribution and supporting services.' },
      { value: '14', label: 'WinEco farms', subtitle: 'WinCommerce’s own clean-vegetable supply', description: 'Company-reported farms producing to VietGAP and GlobalGAP standards.' },
      { value: '4', label: 'Strategic protein suppliers named for Bach Hoa Xanh', subtitle: 'CP Foods, Minh Phu, Navico, Godaco', description: 'Supply contracts for pork, chicken and seafood sourced from original producers, per broker research.' },
    ],
    statsNote: 'The first tile is a count from this lesson; farm and supplier details are company statements reported by a news outlet and by Vietcap, and they show sourcing models rather than industry averages.',
    narrative: [
      { label: 'What it is', text: 'Grocery and general merchandise retail involves a network of organisations with different responsibilities, resources and bargaining power. Some retailers buy directly from producers, while others depend on intermediaries to aggregate products, manage transport or provide access to specialised suppliers. The relationships between participants influence product cost, delivery speed, quality assurance and the distribution of profit across the chain.' },
      { label: 'Why it is happening', text: 'Participants differ in size and power, and each depends on the others, so the way supply, information and payments are coordinated sets efficiency. Scale gives larger retailers negotiating strength, while smaller retailers rely on wholesalers and local networks.' },
      { label: 'Real-world example', text: 'Farmers supply vegetables, fruit, meat, dairy inputs and other agricultural products, while food companies produce packaged foods, beverages, cleaning products and personal-care goods. Wholesalers and trading companies consolidate products from multiple suppliers, transport companies and third-party logistics providers handle warehousing, transport and fulfilment, and supermarkets, convenience stores, minimarts, traditional retailers and e-commerce platforms connect products with shoppers. Banks, payment providers, technology vendors, testing laboratories and packaging companies support operations.' },
      { label: 'Vietnam example', text: 'Vietcap reports that Bach Hoa Xanh buys pork, chicken and seafood under strategic contracts with CP Foods, Minh Phu, Navico and Godaco, and sources vegetables and fruit from cooperatives and larger suppliers. WinCommerce runs 14 WinEco farms for vegetables and works with MEATDeli for meat. For imports, a USDA report says most Vietnamese retailers buy through importers and distributors, and only a few large chains, such as MM Mega Market and WinMart, import directly.' },
      { label: 'Business impact', text: 'The industry operates through an interconnected network rather than a simple linear sequence. The degree of integration between participants shapes cost efficiency, operational reliability and competitive advantage.' },
    ],
    visualKind: 'grocery-m2-12-participants', visualHeading: 'A network, not a straight line',
    visualIntro: 'See six groups of participants around the retail network and what each affects.',
    imageAlt: 'Casemate orbit mind map of six participant groups in the grocery retail value chain',
    keyTerms: [
      { term: 'Bargaining power', definition: 'A participant’s ability to influence price and terms in a commercial relationship.' },
      { term: 'Intermediary', definition: 'A wholesaler or trader that consolidates products from several suppliers.' },
      { term: 'Third-party logistics (3PL)', definition: 'A specialist that provides warehousing, transport or fulfilment for another company.' },
      { term: 'Direct sourcing', definition: 'Buying from the producer without intermediaries.' },
    ],
    recap: [
      'Participants differ in responsibilities, resources and bargaining power.',
      'Retailers either buy directly or rely on intermediaries.',
      'Relationships shape cost, speed, quality and profit distribution.',
      'The industry is a network, not a simple line.',
    ],
    chapterRecap: 'The industry operates through an interconnected network rather than a simple linear sequence. The degree of integration between participants shapes cost efficiency, operational reliability, and competitive advantage.',
    deepDiveTitle: 'Why scale changes who captures the margin',
    body: <G2DeepDive paragraphs={[
      'A retailer that can buy a full truckload from a producer saves the margin that an intermediary would have taken, and may win better payment terms. A small shop buying a few cartons from a wholesaler pays for that service in the price.' ,
      'That does not make intermediaries unnecessary: they give small retailers access to many products in small quantities. The question is which route gives the lowest total cost for a given product and a given retailer.',
    ]} evidence="The participant roles are described qualitatively in the supplied material. The Vietnamese sourcing examples are from broker research, a news report on WinCommerce and a USDA report; they are company-level examples, not industry-wide patterns." />,
    sources: citeG2('vietcapGrocery', 'winEcoFarms', 'usdaRetailFoods'),
  }),
];

const quiz = g2Quiz('grocery-m2-l1', [
  { chapter: '1', objective: 'Define the value chain', question: 'What does the value chain of grocery and general merchandise retail cover?', application: 'A student maps the chain. What should it include?', correct: 'All activities that move products from their sources to end consumers', wrong: ['Only store checkout', 'Only advertising', 'Only product manufacturing'], explanation: 'The chain connects producers, manufacturers, distributors, logistics firms, retailers and consumers. Review Chapter 1.' },
  { chapter: '1', objective: 'Contrast fresh and packaged chains', question: 'How does the structure differ between fresh food and packaged goods?', application: 'Two products travel different routes. What explains this?', correct: 'Fresh food involves producers, processors, cold chain and quality control; packaged goods rely on manufacturers, importers, wholesalers and central distribution', wrong: ['They follow identical routes', 'Packaged goods need cold chain and fresh food does not', 'Neither involves logistics'], explanation: 'Structure varies by product category. Review Chapter 1.' },
  { chapter: '1', objective: 'State the retailer’s role', question: 'How do retailers create value in the chain?', application: 'A retailer says it only sells products. What is missing?', correct: 'By coordinating fragmented suppliers, ensuring availability, managing inventory, maintaining quality and providing convenience', wrong: ['By producing all goods themselves', 'By avoiding suppliers', 'By selling at the lowest price only'], explanation: 'Retailers sit at the centre of product flows and relationships. Review Chapter 1.' },
  { chapter: '1', objective: 'List retailer activities', question: 'Which activity belongs to consumer fulfilment?', application: 'A shopper orders online and collects at a store. Which activity is this?', correct: 'Delivering through stores, click-and-collect services or home delivery', wrong: ['Farming', 'Raw-material processing', 'Packaging design'], explanation: 'Consumer fulfilment completes the chain. Review Chapter 1.' },
  { chapter: '1', objective: 'Read the Vietnamese fresh chain', question: 'Why do fresh products in Vietnam often pass through several layers?', application: 'A retailer wants to buy vegetables directly from farms. What obstacle does it face?', correct: 'Small-scale agriculture and complex supply chains make traders, collectors and cooperatives necessary bridges', wrong: ['Farmers refuse to sell', 'Vegetables cannot be transported', 'Retailers have no storage'], explanation: 'Fresh-food supply is fragmented. Review Chapter 1.' },
  { chapter: '2', objective: 'Describe network relationships', question: 'What do relationships between participants influence?', application: 'Two retailers pay different costs for the same product. What explains it?', correct: 'Product cost, delivery speed, quality assurance and the distribution of profit', wrong: ['Only store design', 'Only advertising', 'Only the product name'], explanation: 'Relationships shape economic outcomes. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare large and small retailers', question: 'How do larger and smaller retailers typically source?', application: 'A hypermarket and a small shop buy rice. How do they differ?', correct: 'Larger retailers gain from purchasing scale and supplier relationships; smaller ones rely on wholesalers and local distribution', wrong: ['Both buy identically', 'Small retailers have more bargaining power', 'Large retailers never buy directly'], explanation: 'Efficiency depends on coordination of supply, information and payments. Review Chapter 2.' },
  { chapter: '2', objective: 'Define intermediaries', question: 'What do wholesalers and trading companies do?', application: 'A trader collects products from many small suppliers. What is this role?', correct: 'Consolidate products from multiple suppliers', wrong: ['Make the products', 'Design store layouts', 'Collect consumer data'], explanation: 'Intermediaries aggregate and give access to specialised suppliers. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify supporting services', question: 'Which of these supports retail operations?', application: 'A retailer relies on payments, testing and packaging. Which group is this?', correct: 'Banks, payment providers, technology vendors, laboratories and packaging companies', wrong: ['Only farmers', 'Only competitors', 'Only customers'], explanation: 'Supporting services sit alongside the core flow. Review Chapter 2.' },
  { chapter: '2', objective: 'State the network principle', question: 'What does the industry operate as?', application: 'An analyst draws the chain as a single line. What is the better picture?', correct: 'An interconnected network rather than a simple linear sequence', wrong: ['A single straight line', 'A closed loop of retailers only', 'A set of unrelated firms'], explanation: 'Integration between participants shapes cost, reliability and advantage. Review Chapter 2.' },
]);

export const LESSON_G2_1: GroceryM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the stages and participants of the grocery value chain, the retailer’s coordinating role, and how relationships and bargaining power shape cost and profit.',
    keyTakeaways: [
      'The value chain connects producers, manufacturers, distributors, logistics firms, retailers and consumers.',
      'Structure differs between fresh food and packaged goods.',
      'Retailers create value by coordinating suppliers, availability, inventory, quality and convenience.',
      'Relationships and scale shape cost, speed, quality and the distribution of profit.',
      'The industry works as a network, not a line.',
    ],
    businessImplications: 'Map the real chain for each product category, choose between direct and intermediated sourcing on total cost, and invest in the coordination capabilities that customers experience as availability.',
    remember: 'The retailer’s edge is coordination: right product, right place, right time, at a fair price.',
    nextLesson: 'Sourcing & Supplier Partnerships',
  },
};
