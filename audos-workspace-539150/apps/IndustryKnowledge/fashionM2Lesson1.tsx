import { F2DeepDive, citeF2, f2Chapter, f2Quiz } from './fashionM2Core';
import type { FashionM2LessonBundle } from './fashionM2Core';

const LESSON = '1. Value Chain Overview';

const deck = [
  f2Chapter({
    title: 'Value Chain Structure and Key Participants', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the participants that make up the Fashion, Sports & Lifestyle Retail value chain and explain why its structure differs from one company to the next.',
    mateIntro: 'Before you can fix anything in this industry you have to know who is holding which piece. Seven groups stand between a cotton field and a customer, and no two companies own the same combination of them.',
    keyInsight: 'Value creation is distributed across multiple stages, from product development and sourcing to distribution and customer service. Competitive advantage depends on how effectively companies coordinate these activities, control costs, maintain product quality, and deliver products that meet consumer expectations.',
    statTiles: [
      { value: '7', label: 'Participant groups', description: 'From raw material suppliers through to the end consumer.' },
      { value: 'Varies', label: 'By business model', subtitle: 'No standard configuration', description: 'Some brands own design, marketing and retail while outsourcing production entirely.' },
      { value: 'Coordination', label: 'Where advantage sits', description: 'Cost, quality and availability all depend on how the stages work together.' },
    ],
    statsNote: 'Counts describe the value chain framework used in this lesson, not measured cost or margin shares between stages.',
    narrative: [
      { label: 'What it is', text: 'The value chain of Fashion, Sports & Lifestyle Retail encompasses the activities required to transform raw materials and product concepts into finished goods that reach consumers through physical and digital retail channels. It connects material suppliers, designers, manufacturers, logistics providers, brand owners, distributors, retailers, technology providers and end customers.' },
      { label: 'Why it is happening', text: 'The structure varies according to the business model. Some brands control product design, marketing and retail operations while outsourcing manufacturing, whereas other businesses rely on third-party suppliers and multi-brand retailers across most stages of the chain. There is no single standard shape to compare a company against.' },
      { label: 'Real-world example', text: 'Raw material suppliers provide cotton, polyester, leather, rubber, recycled fibres, textiles and packaging materials. Product designers and developers translate market insights and brand concepts into designs, specifications, prototypes and collections. Manufacturers and contract producers then convert those materials into finished apparel, footwear, accessories, sports equipment and lifestyle products.' },
      { label: 'Vietnam example', text: 'Vietnam appears at two separate points on the same diagram. Its textile, garment and footwear factories sit in the manufacturing and contract-production layer for international buyers, while local brands, distributors and retail platforms occupy the downstream layer serving domestic shoppers. Treating those two positions as one business is the most common analytical error in a Vietnam value chain study.' },
      { label: 'Business impact', text: 'Brand owners manage positioning, merchandising, product standards, pricing, marketing and supplier relationships; logistics providers coordinate transport, warehousing, inventory handling, order fulfilment and delivery; retailers sell through owned stores, multi-brand partners, malls, marketplaces and social commerce; and end consumers generate demand and feed information back through purchasing behaviour, reviews, returns and repeat purchase. Knowing which participant holds which decision is how a team locates the real bottleneck instead of blaming the nearest one.' },
    ],
    visualKind: 'fashion-m2-11-participants', visualHeading: 'Who does what in the chain',
    visualIntro: 'Compare what each participant contributes with the decision each one actually controls.',
    imageAlt: 'Casemate table mapping the participants in the fashion, sports and lifestyle retail value chain',
    keyTerms: [
      { term: 'Value chain', definition: 'The full sequence of activities that turns raw materials and product concepts into finished goods delivered to a customer.' },
      { term: 'Contract producer', definition: 'A manufacturer that produces goods to a buyer’s specification rather than selling under its own brand.' },
      { term: 'Brand owner', definition: 'The company that controls positioning, product standards, pricing and marketing, whether or not it manufactures.' },
      { term: 'Vertical integration', definition: 'Owning several consecutive stages of the chain rather than buying those activities from third parties.' },
    ],
    recap: [
      'The chain spans material supply, design, manufacturing, logistics, branding, retail and the consumer.',
      'Its structure changes with the business model: what is owned and what is outsourced.',
      'Advantage comes from coordination, cost control, quality and meeting consumer expectations.',
      'Consumers return value as feedback, not only as revenue.',
    ],
    chapterRecap: 'The industry value chain connects a broad network of specialised participants. Understanding their roles and interdependencies helps companies identify operational bottlenecks, cost pressures and opportunities to improve product availability and customer satisfaction.',
    deepDiveTitle: 'Why no two chains look the same',
    body: <F2DeepDive paragraphs={[
      'A vertically integrated retailer that designs, sources, manufactures and sells its own product carries every cost and every decision, which makes it slow to change but hard to copy. A brand that outsources production and sells through multi-brand partners carries far less fixed cost, but it also controls neither the factory floor nor the shop floor. Both models exist in this industry and both can work; what cannot work is benchmarking one against the other as if they faced the same cost structure.',
      'This is why the first question in any value chain analysis is not where is the cost, but who owns the decision. A brand complaining about late deliveries may have outsourced production planning to a supplier it gave no demand forecast. A retailer complaining about markdowns may be buying nine months ahead with no in-season flexibility. The symptom appears at one stage and the cause usually sits at another.',
    ]} evidence="The research material describes the participant roles qualitatively and supplies no measured cost or margin split between the stages, so no share figures are stated here." />,
    sources: citeF2('wtoValueChain', 'bofStateOfFashion', 'iloSectors'),
  }),
  f2Chapter({
    title: 'Product, Information and Financial Flows', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how products, information, money and services move through the chain, and what goes wrong when the flows fall out of step.',
    mateIntro: 'Goods move one way, money moves the other, and information has to move in every direction at once. When those three get out of sync you end up short of what sells and buried in what does not.',
    keyInsight: 'An efficient value chain requires coordination between physical product movement and information exchange. Poor visibility between suppliers, brands and retailers can create excess inventory, product shortages, delays and unnecessary operating costs.',
    statTiles: [
      { value: '4', label: 'Flows to coordinate', subtitle: 'Product, information, financial, service', description: 'Each one can fail independently of the others.' },
      { value: 'Two-way', label: 'Information direction', description: 'Demand, specifications, stock and feedback travel in multiple directions.' },
      { value: '4', label: 'Integrating systems', subtitle: 'ERP, PLM, WMS, OMS', description: 'They connect information across otherwise separate operational stages.' },
    ],
    statsNote: 'Counts describe the flow framework used in this lesson; the research material supplies no measured inventory or delay figures.',
    narrative: [
      { label: 'What it is', text: 'The value chain operates through interconnected flows of products, information, services and money. Physical products generally move from suppliers and manufacturers toward warehouses, retail outlets and consumers. At the same time, information about demand, product specifications, inventory, orders and customer feedback moves across the network in multiple directions.' },
      { label: 'Why it is happening', text: 'Each flow has a different speed and a different owner. Product moves on shipping schedules measured in weeks, payment moves on contractual terms measured in days, and information can move instantly but only if someone has built the connection. The mismatch between those speeds is where inefficiency accumulates.' },
      { label: 'Real-world example', text: 'Financial flows move payments between retailers, distributors, brand owners, manufacturers and suppliers according to purchasing contracts, payment terms and sales arrangements. Service flows add design support, quality inspection, transportation, merchandising, customer service and product repair to the value actually delivered.' },
      { label: 'Vietnam example', text: 'For a Vietnamese supplier producing to an overseas buyer’s order, the information flow is the fragile one: a forecast that never arrives, or arrives late, turns into overtime, air freight or idle capacity. Payment terms compound it, because a supplier financing materials ahead of a delayed settlement has less room to absorb a schedule change.' },
      { label: 'Business impact', text: 'Enterprise Resource Planning (ERP), Product Lifecycle Management (PLM), Warehouse Management Systems (WMS) and Order Management Systems (OMS) can connect information across different operational stages. Where they are not connected, each function optimises locally and the chain as a whole loses the visibility that prevents excess stock and stockouts occurring at the same time.' },
    ],
    visualKind: 'fashion-m2-12-flows', visualHeading: 'Four flows moving through one chain',
    visualIntro: 'Trace each flow’s direction of travel and the specific failure it produces when it breaks.',
    imageAlt: 'Casemate table comparing product, information, financial and service flows in retail',
    keyTerms: [
      { term: 'Supply chain visibility', definition: 'The extent to which partners can see demand, inventory and order status across the chain rather than only inside their own operation.' },
      { term: 'ERP', definition: 'Enterprise Resource Planning — a system connecting finance, procurement, inventory and operations on shared data.' },
      { term: 'PLM', definition: 'Product Lifecycle Management — a system holding designs, specifications, materials and approvals from concept to production.' },
      { term: 'Demand feedback', definition: 'Sales reports, reviews, social engagement, return reasons and enquiries fed back into product and inventory planning.' },
    ],
    recap: [
      'Product flows downstream; information flows in every direction.',
      'Financial flows follow contracts and payment terms, not delivery dates.',
      'Service flows add design, inspection, merchandising, support and repair.',
      'ERP, PLM, WMS and OMS connect the information so planning can act on it.',
    ],
    chapterRecap: 'The value chain depends on more than the movement of physical products. Coordinated information, financial and service flows help retailers improve forecasting, reduce inefficiencies and respond more effectively to changes in consumer demand.',
    deepDiveTitle: 'Why excess stock and stockouts appear together',
    body: <F2DeepDive paragraphs={[
      'It looks contradictory for a retailer to be overstocked and out of stock at the same time, but it is the normal result of poor visibility. Stock is bought against a forecast made centrally, allocated against an assumption about where demand will appear, and then not moved when the assumption turns out to be wrong. The total quantity can be exactly right while the distribution of it is exactly wrong.',
      'The fix is rarely more inventory. It is a shorter path between the till and the buy: sell-through data that reaches allocation weekly rather than seasonally, return reasons coded consistently enough to act on, and a supplier who sees the same demand signal the brand sees. Each of those is an information change rather than a stock change, which is why the systems layer matters commercially and not just technically.',
    ]} evidence="The research material describes the flows and the consequences of poor visibility qualitatively, and supplies no measured inventory, delay or cost figures, so none are claimed here." />,
    sources: citeF2('deloitteRetail', 'bofStateOfFashion', 'worldBankLpi'),
  }),
];

const quiz = f2Quiz('fashion-m2-l1', [
  { chapter: '1', objective: 'Define the value chain', question: 'What does the Fashion, Sports & Lifestyle Retail value chain cover?', application: 'A plan starts at the factory gate and ends at the till. What is it leaving out?', correct: 'Every activity turning raw materials and product concepts into goods that reach consumers', wrong: ['Only the manufacturing stage', 'Only store operations and marketing', 'Only international freight and customs clearance'], explanation: 'The chain spans material supply, design, production, logistics, branding, retail and the end customer. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify the participants', question: 'Which participants does the value chain connect?', application: 'A stakeholder map lists brands and retailers only. Who is missing from it?', correct: 'Material suppliers, designers, manufacturers, logistics providers, brands, retailers and consumers', wrong: ['Only brand owners and their advertising agencies', 'Only factories and freight forwarders', 'Only landlords, banks and regulators'], explanation: 'The chain connects material suppliers, designers, manufacturers, logistics providers, brand owners, distributors, retailers, technology providers and end customers. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain structural variation', question: 'Why does value chain structure differ between companies in this industry?', application: 'Two competitors of similar size own completely different stages. What explains that?', correct: 'The business model decides which stages are owned and which are outsourced', wrong: ['Regulation fixes the structure by country', 'Structure is identical across the industry', 'Only company age determines the structure'], explanation: 'Some brands control design, marketing and retail while outsourcing manufacturing; others rely on third-party suppliers and multi-brand retailers. Review Chapter 1.' },
  { chapter: '1', objective: 'Locate competitive advantage', question: 'Where does competitive advantage come from in this value chain?', application: 'A retailer has the lowest material cost but still loses share. What is it missing?', correct: 'Coordinating activities, controlling cost, maintaining quality and meeting consumer expectations', wrong: ['Owning every stage of the chain outright', 'Having the lowest material cost on its own', 'Operating the largest store network on its own'], explanation: 'Advantage depends on how effectively companies coordinate activities, control costs, maintain quality and meet consumer expectations. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the consumer role', question: 'What do end consumers contribute to the chain besides revenue?', application: 'A brand ignores return reasons and reviews. What input is it discarding?', correct: 'Feedback through purchasing behaviour, reviews, returns and repeat purchase', wrong: ['Production capacity during peak season', 'Material specifications for the next collection', 'Freight capacity on export routes'], explanation: 'End consumers generate demand and provide feedback through purchasing behaviour, reviews, returns and repeat purchases. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify the flows', question: 'Which flows run through the value chain alongside physical product?', application: 'A chain review covers goods movement only. What else belongs in scope?', correct: 'Information, financial and service flows', wrong: ['Only financial flows', 'Only marketing communications', 'Only export documentation'], explanation: 'The chain operates through interconnected flows of products, information, services and money. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe information flow', question: 'In which direction does information move through the chain?', application: 'A system pushes forecasts downstream but collects nothing back. What is wrong?', correct: 'In multiple directions across the network, not only downstream', wrong: ['Downstream only, from supplier to customer', 'Upstream only, from customer to supplier', 'Information does not move between partners'], explanation: 'Information about demand, specifications, inventory, orders and feedback moves across the network in multiple directions. Review Chapter 2.' },
  { chapter: '2', objective: 'Diagnose poor visibility', question: 'What does poor visibility between suppliers, brands and retailers create?', application: 'A retailer is overstocked and out of stock at the same time. What explains it?', correct: 'Excess inventory, product shortages, delays and unnecessary operating costs', wrong: ['Lower material prices across the board', 'Automatically faster production lead times', 'Guaranteed improvement in gross margin'], explanation: 'Poor visibility can create excess inventory, shortages, delays and unnecessary operating cost at the same time. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify demand feedback', question: 'Which inputs make up demand feedback in this chain?', application: 'A buying team wants real signals for the next range. Which inputs apply?', correct: 'Sales reports, product reviews, social engagement, return reasons and customer enquiries', wrong: ['Supplier audit reports and factory certificates', 'Freight invoices and customs declarations', 'Store lease terms and rent reviews'], explanation: 'Sales reports, reviews, social engagement, return reasons and enquiries help improve product development and inventory planning. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognise the integrating systems', question: 'Which systems connect information across operational stages?', application: 'Each function keeps its own spreadsheet and nothing reconciles. What is needed?', correct: 'ERP, PLM, WMS and OMS', wrong: ['Only a point-of-sale till system', 'Only a social media scheduling tool', 'Only an email marketing platform'], explanation: 'ERP, PLM, WMS and OMS can connect information across different operational stages. Review Chapter 2.' },
]);

export const LESSON_2_1: FashionM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can map the participants in the Fashion, Sports & Lifestyle Retail value chain, explain why its structure varies by business model, and trace the product, information, financial and service flows that run through it.',
    keyTakeaways: [
      'Seven participant groups connect raw material supply to the end consumer.',
      'What a company owns versus outsources is a business model choice, not an industry standard.',
      'Advantage comes from coordination, cost control, quality and meeting expectations.',
      'Information moves in every direction; product and money move on different clocks.',
      'Poor visibility produces excess stock and shortages simultaneously.',
    ],
    businessImplications: 'Ask who owns the decision before asking where the cost sits: the symptom usually appears at one stage while the cause sits at another, and the fix is often an information change rather than an inventory change.',
    remember: 'Coordinate the chain — owning more of it is not the same as running it better.',
    nextLesson: 'Sourcing & Supplier Partnerships',
  },
};
