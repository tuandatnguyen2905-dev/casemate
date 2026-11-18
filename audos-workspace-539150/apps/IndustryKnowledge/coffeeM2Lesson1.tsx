import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '1. Value Chain Overview';

const deck = [
  c2Chapter({
    title: 'Coffeehouse & Foodservice Retail Value Chain Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the stages of the coffeehouse and foodservice value chain and why coordination between them decides performance.',
    mateIntro: 'A cup of coffee reaches the customer after beans are bought, moved, roasted, brewed and served. Each handoff can add value or lose it.',
    keyInsight: 'The value chain is a connected operating system rather than a simple sequence of suppliers and stores. Coordination between procurement, inventory, preparation, service, and demand forecasting determines product consistency, speed, waste, and profitability.',
    statTiles: [
      { value: '5', label: 'Key value chain activities', subtitle: 'Upstream sourcing to supporting activities', description: 'Upstream sourcing, midstream logistics, store-level transformation, customer-facing retail and supporting activities.' },
      { value: '20–35%', label: 'Share of a cup’s cost attributed to ingredients', subtitle: 'VTV report, an estimate', description: 'Shows that most of the cost sits beyond the ingredients themselves.' },
      { value: '10–20%', label: 'Menu price increases reported at cafés in early 2025', subtitle: 'VTV report', description: 'A response to higher bean costs.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the cost share and price rises are a television news report and should be read as indicative, not as audited figures.',
    narrative: [
      { label: 'What it is', text: 'The coffeehouse and foodservice retail value chain includes the activities required to source ingredients, transform them into food and beverages, distribute them to outlets, and serve customers through dine-in, takeaway, delivery, and digital channels.' },
      { label: 'Why it is happening', text: 'Unlike packaged-food retail, much of the value is created at the point of service. Ingredients may be sourced externally, but preparation, customization, presentation, hospitality, and fulfillment directly influence the final customer experience.' },
      { label: 'Real-world example', text: 'A chain buys beans, tea, milk, food ingredients, packaging and equipment; stores and moves them to outlets; roasts, grinds, brews, cooks, assembles and packages in store; sells dine-in, takeaway, drive-through, delivery and digital orders; and holds the whole system together with brand standards, technology, quality assurance, people, marketing and financial control.' },
      { label: 'Vietnam example', text: 'Highlands Coffee opened a VND 500 billion roastery near Cái Mép Port in April 2025 to supply its stores, then operated 985 stores by the end of 2025 including Vietnam’s first drive-through, which shows several stages under one brand. Phúc Long says its tea comes from two hills it owns in Thái Nguyên and Bảo Lộc, with plants there that dry the leaves right after harvest, and sells packaged tea and coffee through supermarkets as well as its stores. When bean prices rose in 2025, cafés raised menu prices by 10–20% or held prices and widened menus.' },
      { label: 'Business impact', text: 'The industry value chain connects external supply networks with store-level preparation and customer service. Competitive performance depends on integrating these activities into a reliable, cost-effective, and customer-oriented system.' },
    ],
    visualKind: 'coffee-m2-11-structure', visualHeading: 'Five stages of the value chain',
    visualIntro: 'Follow five stages from sourcing to supporting activities and see what each adds.',
    imageAlt: 'Casemate five-step flow of the coffeehouse and foodservice retail value chain',
    keyTerms: [
      { term: 'Value chain', definition: 'The linked activities that turn inputs into a product the customer buys.' },
      { term: 'Point of service', definition: 'The place and moment where the product is prepared and delivered to the customer.' },
      { term: 'Demand forecasting', definition: 'Estimating future sales to plan purchasing, staffing and preparation.' },
      { term: 'Vertical integration', definition: 'A business doing several stages of the chain itself.' },
    ],
    recap: [
      'The chain runs from sourcing and logistics through store preparation to customer service.',
      'Much of the value is created at the point of service.',
      'Procurement, inventory, preparation, service and forecasting must be coordinated.',
      'Coordination decides consistency, speed, waste and profit.',
    ],
    chapterRecap: 'The industry value chain connects external supply networks with store-level preparation and customer service. Competitive performance depends on integrating these activities into a reliable, cost-effective, and customer-oriented system.',
    deepDiveTitle: 'Why the store is both the last step of production and the point of sale',
    body: <C2DeepDive paragraphs={[
      'In a packaged-goods chain, the product is finished before it reaches the shelf. In a café, the drink is made while the customer waits, so staff skill, equipment and workflow are part of production.',
      'That is why a delay in supply or a weak preparation routine shows up at once as a slow queue or an inconsistent drink.' ]} evidence="The five activities are described in the supplied material. Roastery details are from Viet Nam News and the Highlands announcement; store counts are from Momentum Works data reported by VietnamPlus; Phúc Long details are company statements; the cost share and price rises are from a VTV report." />,
    sources: citeC2('highlandsRoastery', 'vietnamplusChains', 'vietnambizChains', 'phucLongTea', 'phucLongAbout', 'vtvCoffeePrices'),
  }),
  c2Chapter({
    title: 'Key Participants and Their Roles', chapterTitle: LESSON, readingTime: '7',
    objective: 'Name the main participants in the chain and explain why bargaining power is shared unevenly among them.',
    mateIntro: 'From the farm to the checkout, many businesses touch a drink. Some set prices; others only pass them along.',
    keyInsight: 'Value creation and bargaining power are distributed unevenly across the chain. Businesses that control high-value customer relationships, strong brands, scarce ingredients, or efficient distribution systems may capture a greater share of the final retail value.',
    statTiles: [
      { value: '7', label: 'Key participants', subtitle: 'Producers to consumers', description: 'Agricultural producers, processors and manufacturers, distributors and wholesalers, equipment and technology providers, retail operators, digital intermediaries and consumers.' },
      { value: 'US$8.92B', label: 'Vietnam coffee exports in 2025', subtitle: 'Customs-based figure reported by VietnamNet', description: 'Shows the scale of the upstream trade that retailers buy against.' },
      { value: '47.2%', label: 'Share of Vietnam’s coffee export volume going to the EU in the 2024–25 crop year', subtitle: 'Ministry of Agriculture and Environment', description: 'A reminder that domestic buyers compete with export demand for beans.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the export value is customs-based and VICOFA rounds it to about US$9 billion, and the EU share is for the crop year to September 2025.',
    narrative: [
      { label: 'What it is', text: 'Multiple participants contribute to the coffeehouse and foodservice value chain, including agricultural producers, processors, manufacturers, importers, distributors, equipment providers, technology platforms, store operators, and consumers. Their roles differ according to the business format and the degree of vertical integration.' },
      { label: 'Why it is happening', text: 'Large chains may centralize purchasing, product development, logistics, and quality control, while independent cafés often rely on local suppliers, specialist roasters, and third-party service providers. Delivery platforms and payment providers have also become important intermediaries in the customer transaction.' },
      { label: 'Real-world example', text: 'Farmers grow coffee, tea, cocoa, fruit and grains; processors roast coffee and make dairy, alternative milk, syrups and bakery items; distributors aggregate and deliver; equipment and technology firms supply espresso machines, ovens, refrigeration and ordering systems; operators build menus and serve customers; digital intermediaries handle discovery, orders, payment and delivery; and consumers drive demand through what they buy.' },
      { label: 'Vietnam example', text: 'Vietnam exported about US$8.92 billion of coffee in 2025, with the EU taking 47.2% of volume in the 2024–25 crop year, so local roasters and chains buy in a market shaped by export prices. Independent shops depend on local suppliers: one Ho Chi Minh City owner reported paying VND 230,000 a kilogram for beans, up VND 20,000 in a month and about 60% above a year earlier, and held drink prices while adding menu variety. ShopeeFood and GrabFood held 48% each of delivery spending in 2025 and charge commissions of 20–30%, showing how intermediaries capture share.' },
      { label: 'Business impact', text: 'The value chain depends on coordination among agricultural, manufacturing, logistics, technology, and retail participants. Retailers must manage supplier relationships while protecting the quality and consistency of the customer experience.' },
    ],
    visualKind: 'coffee-m2-12-participants', visualHeading: 'Seven participants and their roles',
    visualIntro: 'See the seven participants as cards and what each contributes.',
    imageAlt: 'Casemate cards of seven participants in the coffeehouse and foodservice value chain',
    keyTerms: [
      { term: 'Bargaining power', definition: 'The ability to influence price and terms in a deal.' },
      { term: 'Digital intermediary', definition: 'A platform that connects customers and operators for discovery, orders, payment or delivery.' },
      { term: 'Specialist roaster', definition: 'A business that roasts coffee to a particular quality or style.' },
      { term: 'Wholesaler', definition: 'A business that buys in bulk and resells to retailers.' },
    ],
    recap: [
      'Producers, processors, distributors, technology firms, operators, platforms and consumers all take part.',
      'Roles vary with business format and vertical integration.',
      'Chains centralise; independents rely on local suppliers and roasters.',
      'Brands, scarce inputs, customer relationships and efficient distribution capture more value.',
    ],
    chapterRecap: 'The value chain depends on coordination among agricultural, manufacturing, logistics, technology, and retail participants. Retailers must manage supplier relationships while protecting the quality and consistency of the customer experience.',
    deepDiveTitle: 'Who captures the value when a delivery order is placed',
    body: <C2DeepDive paragraphs={[
      'A delivery platform shows the shop to the customer, takes payment and arranges the courier, and in return keeps a share of the sale. The shop prepares the product but may not own the customer relationship.',
      'Operators that build their own app, loyalty programme or strong brand keep more of that relationship, and more of the value.' ]} evidence="The seven participants are described in the supplied material. Export figures are from VietnamNet and the Ministry of Agriculture and Environment; bean prices at an independent café are from a VTV report; delivery shares are from Momentum Works data reported by VnExpress and commissions from a Tuoi Tre report." />,
    sources: citeC2('vietnamnetExport', 'maeCropYear', 'vtvCoffeePrices', 'vnexpressDelivery', 'tuoitreDelivery'),
  }),
  c2Chapter({
    title: 'Product, Information, and Financial Flows', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how product, information and financial flows interact and why synchronising them cuts waste and cost.',
    mateIntro: 'Beans move one way, orders and data move the other, and money moves between them. When the three drift apart, shelves empty or stock spoils.',
    keyInsight: 'Operational efficiency improves when product, information, and financial flows are synchronized. Accurate sales data and timely replenishment information help reduce stockouts, spoilage, excess inventory, and unnecessary operating costs.',
    statTiles: [
      { value: '5', label: 'Key flow activities', subtitle: 'Product flow to channel coordination', description: 'Product flow, information flow, financial flow, demand synchronization and channel coordination.' },
      { value: 'VND 118,000/kg', label: 'Average local coffee price in 2024/25', subtitle: 'USDA, up 125%', description: 'Farmers and traders follow London and Chicago prices daily, so price information travels fast.' },
      { value: '20–30%', label: 'Typical commission on a delivery order', subtitle: 'Restaurants, excluding advertising', description: 'A financial flow that leaves the operator on every delivery sale.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the bean price is a USDA estimate of the average local price and the commission range is a press report of restaurant complaints, not a fixed rate.',
    narrative: [
      { label: 'What it is', text: 'Three interconnected flows underpin the industry value chain. Product flows move ingredients and finished items toward outlets and customers; information flows communicate demand, specifications, orders, and feedback; financial flows transfer payments and distribute revenue among participants.' },
      { label: 'Why it is happening', text: 'These flows become more complex as a business expands across multiple outlets and channels. A retailer may receive ingredients from several suppliers, consolidate inventory across distribution centers, and fulfill orders from both physical stores and digital platforms.' },
      { label: 'Real-world example', text: 'Coffee beans move from producers through processors and distributors to roasting facilities or stores; forecasts, stock levels, specifications and feedback inform purchasing and production; customers pay the retailer, which settles supplier invoices, payroll, rent and platform commissions; point-of-sale data guides replenishment, staffing and production; and online orders, in-store sales, delivery status and payments are reconciled across systems.' },
      { label: 'Vietnam example', text: 'USDA reports that Vietnamese farmers and traders watch London and Chicago coffee prices daily on their phones and adjust selling and storage decisions, so price information flows quickly down to the cost of a café’s beans; the average local price was about VND 118,000 a kilogram in 2024/25, up 125%. Delivery sales add a financial flow of 20–30% commission, and from 1 June 2025 Decree 70/2025/ND-CP extended point-of-sale e-invoices to qualifying restaurants, a secondary source reports that the decree was later replaced from 1 July 2026, so sales records now also flow to the tax authority.' },
      { label: 'Business impact', text: 'Product, information, and financial flows must work together to support availability, service quality, and financial control. Integrated systems become increasingly important as outlet networks and sales channels expand.' },
    ],
    visualKind: 'coffee-m2-13-flows', visualHeading: 'Five flows that must work together',
    visualIntro: 'Read the table of five flows, what moves in each and an example from a café chain.',
    imageAlt: 'Casemate table of product, information and financial flows in a coffeehouse value chain',
    keyTerms: [
      { term: 'Product flow', definition: 'The movement of ingredients and finished items toward customers.' },
      { term: 'Information flow', definition: 'The movement of demand, orders, specifications and feedback.' },
      { term: 'Financial flow', definition: 'The movement of payments and revenue among participants.' },
      { term: 'Reconciliation', definition: 'Matching records from different systems to check they agree.' },
    ],
    recap: [
      'Product, information and financial flows run together.',
      'Complexity grows with outlets and channels.',
      'Sales data and timely replenishment cut stockouts, spoilage and excess stock.',
      'Integrated systems matter more as the network expands.',
    ],
    chapterRecap: 'Product, information, and financial flows must work together to support availability, service quality, and financial control. Integrated systems become increasingly important as outlet networks and sales channels expand.',
    deepDiveTitle: 'What goes wrong when the flows drift apart',
    body: <C2DeepDive paragraphs={[
      'If sales data reaches the buyer a week late, orders follow last week’s demand and a promotion can empty the milk fridge, or leave too much to spoil. If payments to suppliers lag, supply may be limited.',
      'Linking sales, stock and supplier records so each updates the others is what keeps availability high and cost under control.' ]} evidence="The five activities are described in the supplied material. Bean price information is from USDA reporting; commission figures are from a Tuoi Tre report; the e-invoice decree is from a government portal with a secondary accounting-software source on its replacement, so check the current text." />,
    sources: citeC2('usdaCoffeeSemi', 'tuoitreDelivery', 'decree70', 'decree70Review', 'vnexpressDelivery'),
  }),
];

const quiz = c2Quiz('coffee-m2-l1', [
  { chapter: '1', objective: 'State how the chain operates', question: 'How does the chapter describe the value chain?', application: 'A manager sees it as a list of suppliers. What is missing?', correct: 'As a connected operating system rather than a simple sequence of suppliers and stores', wrong: ['As a single supplier', 'As a store-only process', 'As a marketing tool'], explanation: 'Coordination is the point. Review Chapter 1.' },
  { chapter: '1', objective: 'Locate the value', question: 'Where is much of the value created in coffeehouse retail?', application: 'Two shops buy the same beans. What differs?', correct: 'At the point of service', wrong: ['At the farm only', 'In the warehouse only', 'In advertising only'], explanation: 'Preparation and hospitality matter. Review Chapter 1.' },
  { chapter: '1', objective: 'List the activities', question: 'Which activity covers roasting, grinding, brewing and cooking?', application: 'A store roasts and brews on site. Which stage is that?', correct: 'Store-level transformation', wrong: ['Upstream sourcing only', 'Midstream logistics only', 'Customer insight only'], explanation: 'It is the transformation step. Review Chapter 1.' },
  { chapter: '2', objective: 'State the power distribution', question: 'How are value and bargaining power distributed?', application: 'A brand with loyal customers negotiates with suppliers. What helps it?', correct: 'Unevenly, favouring strong brands, scarce ingredients, customer relationships and efficient distribution', wrong: ['Equally among all', 'Only to farmers', 'Only to platforms'], explanation: 'Power is uneven. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare chains and independents', question: 'What do independent cafés often rely on?', application: 'A small café has no central buying. Where does it buy?', correct: 'Local suppliers, specialist roasters and third-party service providers', wrong: ['A central warehouse of its own', 'Only imports', 'Only delivery apps'], explanation: 'Scale differs. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall platform shares', question: 'What shares did ShopeeFood and GrabFood hold of Vietnamese delivery in 2025?', application: 'An analyst describes delivery. What is the structure?', correct: '48% each', wrong: ['5% each', '90% and 10%', '1% and 99%'], explanation: 'A near-duopoly. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify intermediaries', question: 'What do digital intermediaries do?', application: 'A platform handles discovery, order and courier. What is its role?', correct: 'Facilitate online discovery, order processing, payment and delivery', wrong: ['Grow coffee', 'Make espresso machines', 'Roast beans'], explanation: 'They sit between customer and operator. Review Chapter 2.' },
  { chapter: '3', objective: 'State how efficiency improves', question: 'When does operational efficiency improve?', application: 'A chain wants to cut stockouts and spoilage. What should it do?', correct: 'When product, information and financial flows are synchronised', wrong: ['When flows are separate', 'When data is delayed', 'When orders are manual'], explanation: 'Synchronisation helps. Review Chapter 3.' },
  { chapter: '3', objective: 'Name the information flow', question: 'Which flow communicates demand, specifications, orders and feedback?', application: 'Forecasts guide purchasing. Which flow is that?', correct: 'Information flow', wrong: ['Product flow only', 'Financial flow only', 'Cleaning flow'], explanation: 'It carries data. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply a financial flow', question: 'What is one deduction in the financial flow of a delivery order?', application: 'An owner reviews a delivery sale. What comes off?', correct: 'The platform commission, reported at 20–30%', wrong: ['Nothing', 'Only taxes', 'Only courier tips'], explanation: 'Commission reduces net sales. Review Chapter 3.' },
]);

export const LESSON_C2_1: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the stages of the coffeehouse value chain, name its participants and explain how product, information and financial flows interact.',
    keyTakeaways: [
      'The value chain is a connected operating system.',
      'Much of the value is created at the point of service.',
      'Bargaining power is uneven across participants.',
      'Product, information and financial flows must be synchronised.',
      'Integrated systems matter more as networks and channels grow.',
    ],
    businessImplications: 'Coordinate sourcing, stock, preparation and service as one system and protect the customer relationship from intermediaries.',
    remember: 'The chain is only as strong as its weakest handoff.',
    nextLesson: 'Sourcing & Supplier Partnerships',
  },
};
