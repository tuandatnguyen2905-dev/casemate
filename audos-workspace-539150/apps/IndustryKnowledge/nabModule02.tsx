import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';
import { applyChapterVisualText } from './chapterVisualText';
import { VisualView } from './fashionVisualKit';
import { NAB_M2_VISUALS } from './nabM2VisualSpecs';

export interface NabModule02Source {
  title: string;
  href: string;
  publisher: string;
}

export interface NabModule02Narrative {
  label: 'What it is' | 'How it works' | 'Real-world example' | 'Why it matters';
  text: string;
}

export interface NabModule02CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: NabModule02Narrative[];
  visualKind: NabModule02VisualKind;
  visualHeading: string;
  visualIntro: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: NabModule02Source[];
}

export interface NabModule02Question {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId: string;
  objective: string;
}

export interface NabModule02Takeaways {
  learned: string;
  keyTakeaways: string[];
  businessImplications: string;
  remember: string;
  nextLesson: string;
}

export const NAB_MODULE02_LESSONS = [
  { title: 'Value Chain Overview', description: 'Map the upstream, midstream, and downstream blocks and follow products, information, services, and money through them.', takeaways: ['The chain links suppliers, brand owners, bottlers, distributors, channels, and consumers.', 'Products move forward, money moves back, and information moves in both directions.', 'Different participants create value through different capabilities.'] },
  { title: 'Upstream Activities', description: 'Understand ingredients, packaging, equipment, supplier networks, input costs, and supply risks.', takeaways: ['Water is the bulk of the drink, while packaging is a major cost block.', 'Commodity exposure and supplier power shape procurement choices.', 'Local sourcing can reduce logistics and currency risk.'] },
  { title: 'Midstream Activities', description: 'Follow formulation, processing, quality control, filling, warehousing, and operational efficiency.', takeaways: ['Manufacturing converts a controlled recipe into a safe, consistent product.', 'Quality controls run across water, ingredients, process, and finished goods.', 'Capacity use, changeovers, storage, and transport shape unit economics.'] },
  { title: 'Downstream Activities', description: 'Trace beverages through distributors, retail, foodservice, digital channels, merchandising, and last-mile delivery.', takeaways: ['Route-to-market design determines availability and execution.', 'Vietnam combines fragmented traditional trade with growing modern and digital channels.', 'Winning requires both brand demand and disciplined outlet execution.'] },
  { title: 'Inputs, Outputs & Value Creation', description: 'Connect stage-level inputs and outputs to costs, profit pools, scale, differentiation, and competitive value.', takeaways: ['The package and route to market can cost more than the liquid.', 'Concentrate and brand economics differ from capital-heavy bottling economics.', 'Scale, brand, distribution, and formulation IP are core value levers.'] },
  { title: 'Global vs. Local Value Chain', description: 'Compare centralized global capabilities with Vietnam-based production, distribution, localization, imports, and exports.', takeaways: ['Global systems centralize selected IP while local operators bottle and sell.', 'Vietnam mixes domestic inputs and production with imported materials and equipment.', 'Localization balances consistency, cost, consumer fit, and resilience.'] },
];

const SOURCES = {
  cokeSystem: { title: 'The Coca-Cola System', href: 'https://coca-colacompany.com/', publisher: 'The Coca-Cola Company' },
  chainGuide: { title: 'Breaking Down the Chain: A Guide to the Soft Drink Industry', href: 'https://changelabsolutions.org/', publisher: 'ChangeLab Solutions' },
  packaging: { title: 'Cost Competitiveness of PET, Aluminium and Glass Beverage Containers', href: 'https://international-aluminium.org/', publisher: 'International Aluminium Institute' },
  cokeFiling: { title: 'Finished-product versus concentrate operations', href: 'https://investors.coca-colacompany.com/', publisher: 'The Coca-Cola Company Investor Relations' },
  imarc: { title: 'Carbonated Soft Drink Manufacturing Cost Analysis', href: 'https://www.imarcgroup.com/', publisher: 'IMARC Group' },
  macrotrends: { title: 'Coca-Cola Net Profit Margin', href: 'https://www.macrotrends.net/', publisher: 'Macrotrends' },
  vietnamSugar: { title: 'Vietnam sugar trade and import quotas', href: 'https://vietnamnews.vn/', publisher: 'Vietnam News' },
  tayNinh: { title: 'Suntory PepsiCo opens US$300 million Vietnam plant', href: 'https://www.theasset.com/', publisher: 'The Asset' },
  swire: { title: 'Swire Coca-Cola Vietnam inaugurates Long An plant', href: 'https://www.swirecocacola.com/', publisher: 'Swire Coca-Cola' },
  thp: { title: 'Tan Hiep Phat production and brands', href: 'https://www.thp.com.vn/', publisher: 'Tan Hiep Phat' },
  mordor: { title: 'Retail Industry in Vietnam', href: 'https://www.mordorintelligence.com/', publisher: 'Mordor Intelligence' },
  grandView: { title: 'Vietnam Carbonated Soft Drinks Market', href: 'https://www.grandviewresearch.com/', publisher: 'Grand View Research' },
  go2market: { title: 'General Trade vs Modern Trade in Vietnam', href: 'https://go2market.vn/', publisher: 'go2market' },
  oecd: { title: 'OECD Economic Surveys: Viet Nam 2025', href: 'https://www.oecd.org/', publisher: 'OECD' },
} satisfies Record<string, NabModule02Source>;

function DeepDive({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

function card(input: Omit<NabModule02CardData, 'concepts' | 'chapterRecap'> & { chapterRecap?: string }): NabModule02CardData {
  return { ...input, concepts: [], chapterRecap: input.chapterRecap ?? '' };
}

const lesson21: NabModule02CardData[] = [
  card({
    title: 'From Ingredients to Finished Beverages', chapterTitle: 'From Ingredients to Finished Beverages', readingTime: '5',
    objective: 'Trace a beverage from raw ingredients and packaging inputs to a finished, sale-ready product.',
    mateIntro: 'Pick up a bottle in a campus shop. Its journey began long before the label went on: with treated water, sweetener, flavor, carbon dioxide, packaging resin, and production equipment arriving on schedule.',
    keyInsight: 'A beverage value chain is a linked transformation system: upstream inputs become a controlled formula, then a packaged product, then an item available for a consumer to buy.',
    narrative: [
      { label: 'What it is', text: 'The non-alcoholic beverage value chain groups work into upstream supply, midstream manufacturing, and downstream route to market. These blocks are connected, so a failure in one block affects the others.' },
      { label: 'How it works', text: 'Suppliers provide water-treatment capability, sweeteners, flavors, carbon dioxide, packaging, and equipment. Plants formulate, process, fill, label, and check the drink. Distributors and channels then place the finished SKU where demand occurs.' },
      { label: 'Real-world example', text: 'For a Pepsi sold in Vietnam, sugar may be domestic or imported, concentrate is combined with treated water and carbon dioxide in a local plant, and the packaged bottle moves through distributors to traditional or modern retail.' },
      { label: 'Why it matters', text: 'The map helps a student locate business functions. Procurement works with inputs, Manufacturing and Quality govern conversion, and Sales, Trade Marketing, and Logistics govern market availability.' },
    ],
    visualKind: 'nab-vc-21-1', visualHeading: 'End-to-end beverage value chain', visualIntro: 'Follow the physical product from suppliers to the consumer; click to enlarge the complete chain.',
    keyTerms: [{ term: 'Upstream', definition: 'Inputs and supplier activities before beverage production.' }, { term: 'Midstream', definition: 'Formulation, processing, quality control, filling, and packaging.' }, { term: 'Downstream', definition: 'Distribution, channels, marketing, and final sale.' }, { term: 'SKU', definition: 'A distinct product, size, flavor, or pack format managed in inventory.' }],
    recap: ['The chain has upstream, midstream, and downstream blocks.', 'A finished drink combines ingredients, packaging, manufacturing, and route-to-market work.', 'Business functions can be located along the chain.'],
    deepDiveTitle: 'Why the three-block map is useful', body: <DeepDive><p>The blocks are an analytical tool, not three isolated companies. A brand owner may control formulation and marketing, a bottler may manufacture and distribute, and outside suppliers may provide materials and machinery.</p><p>When diagnosing a business problem, start by locating the affected block and then trace dependencies in both directions. A packaging delay can reduce plant output; lower output can weaken shelf availability; weak availability can waste marketing demand.</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.chainGuide, SOURCES.tayNinh],
  }),
  card({
    title: 'Who Creates Value Along the Chain?', chapterTitle: 'Who Creates Value Along the Chain?', readingTime: '5',
    objective: 'Explain how suppliers, concentrate owners, bottlers, distributors, retailers, and service partners create different forms of value.',
    mateIntro: 'The company with the famous logo is not the only business behind a drink. Several partners earn a return because each solves a different problem: formulation, safe production, local reach, credit, refrigeration, or convenient access.',
    keyInsight: 'Value is created whenever a participant makes the drink safer, more distinctive, easier to produce, or easier for the consumer to find and buy.',
    narrative: [
      { label: 'What it is', text: 'Value creation means improving usefulness or willingness to pay. Ingredient and packaging suppliers provide reliable inputs; brand owners provide recipes and brand demand; bottlers convert at scale; distributors and retailers create reach and convenience.' },
      { label: 'How it works', text: 'Each participant performs a specialized activity and captures part of the consumer price. Concentrate owners protect formulation and brand assets, while bottlers carry plants and working capital. Distributors break bulk and serve fragmented outlets.' },
      { label: 'Real-world example', text: 'The Coca-Cola system separates concentrate and syrup creation from authorized local bottling, packaging, distribution, and sale. That structure combines centralized brand control with local execution.' },
      { label: 'Why it matters', text: 'Understanding who creates which value prevents a common mistake: assuming revenue equals economic power. A high-revenue bottler may have heavier assets and lower margins than the owner of concentrate and brand IP.' },
    ],
    visualKind: 'nab-vc-21-2', visualHeading: 'Participants and value added', visualIntro: 'See the distinctive contribution each participant makes before the final sale.',
    keyTerms: [{ term: 'Brand owner', definition: 'The company controlling brand, portfolio, and often formulation IP.' }, { term: 'Bottler', definition: 'The operator that mixes, fills, packages, and often distributes finished beverages.' }, { term: 'Distributor', definition: 'An intermediary that holds inventory, breaks bulk, and serves outlets.' }, { term: 'Value capture', definition: 'The share of economic return retained by a participant.' }],
    recap: ['Different participants solve different customer and operating problems.', 'Brand, formulation, scale, reach, and convenience are separate sources of value.', 'Asset intensity helps explain why margins differ by participant.'],
    deepDiveTitle: 'Creation is different from capture', body: <DeepDive><p>A participant can create important value without keeping most of it. Bargaining power, scarcity, switching costs, capital needs, and competition determine how much value is captured as profit.</p><p>That is why value-chain analysis asks two questions: what useful transformation happens here, and how defensible is the participant’s claim on the resulting economics?</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.cokeFiling, SOURCES.chainGuide],
  }),
  card({
    title: 'How Products, Information, and Money Flow', chapterTitle: 'How Products, Information, and Money Flow', readingTime: '5',
    objective: 'Distinguish the physical product, commercial information, service, and payment flows that coordinate the beverage chain.',
    mateIntro: 'A truck moving bottles is only the visible flow. At the same time, an outlet sends orders, a distributor reports sales, a brand shares a promotion plan, and payment moves back through the chain.',
    keyInsight: 'Products generally move toward consumers, money moves back toward producers and suppliers, and information moves both ways to coordinate supply with demand.',
    narrative: [
      { label: 'What it is', text: 'A value chain contains several simultaneous flows: physical goods, demand and inventory information, services such as transport and merchandising, and payments or credit.' },
      { label: 'How it works', text: 'Forecasts and orders trigger production and replenishment. Finished goods move to distribution points and outlets. Sales data and stock signals return upstream, while consumer payment is divided among channel members and suppliers.' },
      { label: 'Real-world example', text: 'A convenience-store promotion raises expected demand. The retailer shares an order, the distributor replenishes stock, the manufacturer schedules output, merchandisers check displays, and cash settles backward under agreed terms.' },
      { label: 'Why it matters', text: 'Poor information creates either stock-outs or excess inventory. Poor payment discipline strains working capital. Good coordination improves service levels without simply adding more stock everywhere.' },
    ],
    visualKind: 'nab-vc-21-3', visualHeading: 'Four connected flows', visualIntro: 'Compare the direction of product, information, services, and money across the same partners.',
    keyTerms: [{ term: 'Demand signal', definition: 'Information indicating what consumers or outlets are likely to buy.' }, { term: 'Service flow', definition: 'Transport, merchandising, quality, and support activities delivered between parties.' }, { term: 'Payment terms', definition: 'Rules governing when and how one party pays another.' }, { term: 'Working capital', definition: 'Cash tied up in inventory and receivables while operations continue.' }],
    recap: ['The physical chain is only one of four connected flows.', 'Information should move both upstream and downstream.', 'Payment timing and inventory jointly shape working-capital needs.'],
    deepDiveTitle: 'Use flows to diagnose execution', body: <DeepDive><p>If shelves are empty while a warehouse is full, the physical stock exists but information or service execution has failed. If sales are strong but cash is scarce, payment terms or collections may be the constraint.</p><p>Separating the flows turns a vague “supply-chain problem” into a specific question that the right function can address.</p></DeepDive>,
    sources: [SOURCES.chainGuide, SOURCES.cokeSystem],
  }),
];

const lesson22: NabModule02CardData[] = [
  card({
    title: 'Where Beverage Ingredients Come From', chapterTitle: 'Where Beverage Ingredients Come From', readingTime: '5',
    objective: 'Identify the main beverage ingredients, their sourcing routes, and the reasons water and sweeteners deserve special attention.',
    mateIntro: 'Most of a soft drink is water, yet procurement still manages a surprisingly broad basket: sugar, concentrate, flavors, carbon dioxide, caffeine, vitamins, minerals, and fruit inputs.',
    keyInsight: 'Ingredient sourcing mixes local essentials with globally traded materials; quality, continuity, and landed cost matter as much as the quoted purchase price.',
    narrative: [
      { label: 'What it is', text: 'Ingredient sourcing secures the liquid inputs that define safety, taste, nutrition, and consistency. Carbonated water averages about 94% of a soft drink by volume, while sweetener commonly represents about 6–12% in the cited guide.' },
      { label: 'How it works', text: 'Plants treat local water to specification, buy sweeteners under contracts, and receive controlled flavors or concentrate. Specialized additives are approved and tested before use. Procurement balances supplier qualification, lead time, currency, and quality.' },
      { label: 'Real-world example', text: 'Vietnam uses both domestic and imported sugar. The research records a recent comparison of about 250,000 tonnes exported and 640,000 tonnes imported, showing why local beverage economics remain exposed to trade and price conditions.' },
      { label: 'Why it matters', text: 'A low-cost ingredient is not valuable if it creates quality failure or production downtime. Sourcing decisions therefore combine economics with food safety and continuity of supply.' },
    ],
    visualKind: 'nab-vc-22-1', visualHeading: 'Ingredient sourcing map', visualIntro: 'Separate locally treated, agricultural, globally traded, and controlled formulation inputs.',
    keyTerms: [{ term: 'Landed cost', definition: 'Purchase price plus freight, duties, handling, and currency effects.' }, { term: 'Concentrate', definition: 'A controlled flavor base combined locally with water and other ingredients.' }, { term: 'Supplier qualification', definition: 'Approval based on quality, safety, capacity, and reliability.' }, { term: 'Dual sourcing', definition: 'Using more than one approved supplier to reduce dependency.' }],
    recap: ['Water is the largest physical ingredient.', 'Sweeteners and specialist inputs may connect the plant to commodity and import markets.', 'Supplier quality and continuity are part of input economics.'],
    deepDiveTitle: 'Why the cheapest quote can be expensive', body: <DeepDive><p>An input’s total cost includes testing, yield, scrap, transport, inventory, and disruption risk. A supplier with a slightly higher unit price may create lower total system cost if quality and delivery are more reliable.</p><p>Procurement teams therefore evaluate specifications and service history alongside price.</p></DeepDive>,
    sources: [SOURCES.chainGuide, SOURCES.vietnamSugar],
  }),
  card({
    title: 'Packaging, Equipment, and Supplier Networks', chapterTitle: 'Packaging, Equipment, and Supplier Networks', readingTime: '5',
    objective: 'Explain how packaging materials, production equipment, and supplier networks support beverage availability and economics.',
    mateIntro: 'Consumers see a bottle or can; operations sees resin or sheet, closures, labels, cartons, pallets, filling lines, maintenance parts, and suppliers that must all arrive in the right sequence.',
    keyInsight: 'Packaging is both a consumer interface and a major cost block, while equipment determines the formats, speed, quality, and scale a plant can deliver.',
    narrative: [
      { label: 'What it is', text: 'The supplier ecosystem includes PET, aluminum, glass, cartons, closures, labels, secondary packaging, water-treatment systems, fillers, inspection equipment, and maintenance support.' },
      { label: 'How it works', text: 'Brand and operations teams set pack specifications. Procurement qualifies suppliers; engineering selects and maintains lines; planning matches material deliveries to production. Compatibility matters because a line can only run formats it is designed and tooled to handle.' },
      { label: 'Real-world example', text: 'The cited packaging comparison finds PET cheaper than aluminum, with glass the most expensive across the studied regions. The best format still depends on product, channel, brand position, handling, and recovery needs.' },
      { label: 'Why it matters', text: 'Packaging typically represents about 25–35% of beverage cost of goods in the research. A pack decision therefore affects margin, logistics weight, shelf impact, and capital requirements at the same time.' },
    ],
    visualKind: 'nab-vc-22-2', visualHeading: 'Packaging and equipment ecosystem', visualIntro: 'See how materials, machinery, services, and specifications converge at the filling line.',
    keyTerms: [{ term: 'Primary packaging', definition: 'The container directly holding the beverage.' }, { term: 'Secondary packaging', definition: 'Cartons, trays, or wrap grouping units for handling.' }, { term: 'Line compatibility', definition: 'Whether equipment can run a chosen container and format.' }, { term: 'Total cost of ownership', definition: 'Purchase, operation, maintenance, and downtime cost over an asset’s life.' }],
    recap: ['Packaging is a system, not only a container.', 'Equipment choices shape feasible formats and capacity.', 'Packaging economics connect procurement, brand, engineering, and logistics.'],
    deepDiveTitle: 'The network behind one pack', body: <DeepDive><p>A label change can affect artwork approval, print lead time, stock obsolescence, line setup, and retailer timing. This is why packaging changes require cross-functional governance.</p><p>Supplier networks also include technical services. Spare parts, calibration, and maintenance response can be as important as the original machine purchase.</p></DeepDive>,
    sources: [SOURCES.packaging, SOURCES.chainGuide],
  }),
  card({
    title: 'Understanding Input Costs and Supply Risks', chapterTitle: 'Understanding Input Costs and Supply Risks', readingTime: '5',
    objective: 'Connect commodity volatility, supplier power, climate, currency, and logistics risk to practical sourcing responses.',
    mateIntro: 'A procurement plan can look efficient until sugar prices move, imported equipment parts are delayed, or local water availability tightens. Resilience asks what happens when the normal plan stops being normal.',
    keyInsight: 'Input risk comes from both price movement and supply interruption; companies respond with contracts, inventory choices, supplier diversification, and local sourcing where feasible.',
    narrative: [
      { label: 'What it is', text: 'Supply risk is the possibility that an input becomes more expensive, arrives late, fails quality standards, or becomes unavailable. Sugar, aluminum, PET resin, water, and imported machinery each carry different exposures.' },
      { label: 'How it works', text: 'Teams map spend, dependency, lead time, substitutability, and operational impact. High-impact dependencies receive stronger contracts, approved alternatives, buffers, or design changes. Commodity and currency exposure is monitored rather than treated as fixed.' },
      { label: 'Real-world example', text: 'Vietnam’s net sugar-import position exposes beverage producers to global price and trade conditions. Water availability also faces climate and salinity pressure, especially in the Mekong Delta.' },
      { label: 'Why it matters', text: 'Supplier power rises when few alternatives meet the required specification. A resilient sourcing choice may cost slightly more in normal periods but protect revenue and customer service during disruption.' },
    ],
    visualKind: 'nab-vc-22-3', visualHeading: 'Input risk and response matrix', visualIntro: 'Connect each exposure to the operational consequence and an appropriate response.',
    keyTerms: [{ term: 'Price volatility', definition: 'Unpredictable movement in input cost over time.' }, { term: 'Supplier power', definition: 'A supplier’s ability to influence price or terms because alternatives are limited.' }, { term: 'Safety stock', definition: 'Extra inventory held to absorb uncertainty.' }, { term: 'Localization', definition: 'Moving sourcing or production closer to the market served.' }],
    recap: ['Price risk and continuity risk are related but different.', 'Dependency and substitutability determine supplier power.', 'Diversification, contracts, buffers, and localization are targeted responses.'],
    deepDiveTitle: 'Match the response to the risk', body: <DeepDive><p>Holding more stock can help with long lead times but cannot solve poor ingredient quality. Dual sourcing can reduce dependency but may be impossible for proprietary concentrate. Water risk requires treatment, efficiency, and site-level planning.</p><p>Good resilience is selective: it spends protection where disruption would create the greatest business damage.</p></DeepDive>,
    sources: [SOURCES.vietnamSugar, SOURCES.packaging],
  }),
];

const lesson23: NabModule02CardData[] = [
  card({
    title: 'How Beverages Are Manufactured', chapterTitle: 'How Beverages Are Manufactured', readingTime: '5',
    objective: 'Sequence formulation, water treatment, blending, processing, filling, and packing in a beverage plant.',
    mateIntro: 'A recipe is not yet a product. Manufacturing must reproduce the same taste and safety outcome at high speed, across thousands of units, while keeping the formula controlled.',
    keyInsight: 'Beverage manufacturing is a repeatable conversion process: prepare approved inputs, control the recipe, apply the required treatment, then fill and pack under defined conditions.',
    narrative: [
      { label: 'What it is', text: 'Manufacturing converts ingredients and packaging into saleable SKUs. Core steps can include water treatment, dosing, blending, carbonation, heat treatment or aseptic handling, filling, closing, labeling, and secondary packing.' },
      { label: 'How it works', text: 'A production order specifies recipe, batch size, and pack. Operators verify materials, automated systems dose ingredients, and process controls hold variables within limits. The product then enters a format-specific filling line.' },
      { label: 'Real-world example', text: 'Under the concentrate model, a brand owner supplies concentrate or syrup specifications. A local bottler adds treated water, sweetener, and carbon dioxide where required, then packages the finished drink.' },
      { label: 'Why it matters', text: 'Every step influences consistency, safety, yield, and speed. A small dosing or setup error can affect an entire batch, so standard work and traceability are central.' },
    ],
    visualKind: 'nab-vc-23-1', visualHeading: 'Manufacturing process flow', visualIntro: 'Follow the controlled conversion from approved inputs to packed finished goods.',
    keyTerms: [{ term: 'Formulation', definition: 'The defined recipe and product specification.' }, { term: 'Blending', definition: 'Controlled mixing of water and ingredients.' }, { term: 'Carbonation', definition: 'Dissolving carbon dioxide into a beverage.' }, { term: 'Aseptic', definition: 'Processing and filling designed to prevent contamination without relying on an unopened cold chain.' }],
    recap: ['Manufacturing begins with an approved recipe and materials.', 'Processing steps depend on product requirements.', 'Filling and packing must preserve the controlled product.'],
    deepDiveTitle: 'Different drinks need different processes', body: <DeepDive><p>Carbonated soft drinks require carbonation and pressure-compatible filling. Some juices and teas may use pasteurization or aseptic systems. The correct process depends on product chemistry, desired shelf life, package, and safety plan.</p><p>The research supports the process categories, not one universal sequence for every drink.</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.chainGuide],
  }),
  card({
    title: 'Quality Control, Processing, and Packaging', chapterTitle: 'Quality Control, Processing, and Packaging', readingTime: '5',
    objective: 'Explain how quality controls protect product safety and consistency from incoming materials through finished packaging.',
    mateIntro: 'A bottle can look perfect and still fail if the water, seal, recipe, or hygiene control is wrong. Quality is therefore built into the process, not inspected only at the end.',
    keyInsight: 'Quality control combines preventive systems, in-process checks, testing, and traceability so that each batch meets food-safety and product specifications.',
    narrative: [
      { label: 'What it is', text: 'Quality control covers incoming water and materials, process conditions, fill and closure integrity, labeling, and finished-product tests. Plants use food-safety systems such as HACCP and ISO 22000 alongside applicable Vietnamese technical regulations.' },
      { label: 'How it works', text: 'Critical limits are defined, measured, and recorded. Out-of-specification material or product is isolated while teams investigate. Batch and packaging codes allow affected output to be traced.' },
      { label: 'Real-world example', text: 'A carbonated line may check water quality, syrup ratio, carbonation, fill level, cap or seam integrity, label accuracy, and finished taste before release.' },
      { label: 'Why it matters', text: 'Quality failure can harm consumers and destroy trust. Preventive controls also reduce waste because they detect drift before a large quantity is produced.' },
    ],
    visualKind: 'nab-vc-23-2', visualHeading: 'Quality gates across the line', visualIntro: 'See where material, process, package, and release checks protect the product.',
    keyTerms: [{ term: 'HACCP', definition: 'A system for identifying and controlling significant food-safety hazards.' }, { term: 'Critical limit', definition: 'A boundary that a controlled process must not exceed.' }, { term: 'Traceability', definition: 'The ability to follow materials and product through recorded batches.' }, { term: 'Release', definition: 'Formal approval that finished goods may enter distribution.' }],
    recap: ['Quality starts with incoming materials and continues through release.', 'Preventive controls are stronger than end-only inspection.', 'Traceability makes investigation and containment possible.'],
    deepDiveTitle: 'Quality and operations share the same goal', body: <DeepDive><p>Quality controls should not be treated as a separate department’s paperwork. Stable processes improve safety and also protect yield, speed, and customer service.</p><p>The strongest plants make deviations visible quickly and give operators clear rules for stopping, isolating, and escalating.</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.chainGuide],
  }),
  card({
    title: 'Storage, Transportation, and Operational Efficiency', chapterTitle: 'Storage, Transportation, and Operational Efficiency', readingTime: '5',
    objective: 'Connect warehousing, transport, SKU complexity, capacity use, and changeovers to service and unit cost.',
    mateIntro: 'The line has stopped, but the work has not. Finished goods must be stored, picked, loaded, transported, and replenished without damage or expiry—and the next production run must start efficiently.',
    keyInsight: 'Operational efficiency balances high asset use with the flexibility to serve many SKUs, channels, and delivery points.',
    narrative: [
      { label: 'What it is', text: 'Post-production operations include pallet handling, warehousing, inventory rotation, transport planning, and delivery to distribution points. Inside the plant, capacity use, downtime, yield, and changeover time shape output cost.' },
      { label: 'How it works', text: 'Plans group compatible production runs, then allocate finished goods to demand. Warehouses protect stock and rotate it by shelf-life rules. Transport consolidates loads while meeting channel timing and product handling needs.' },
      { label: 'Real-world example', text: 'A company with many flavors, sizes, and formats may lose line time during changeovers. Chilled RTD coffee or juice adds temperature-control needs that shelf-stable products do not share.' },
      { label: 'Why it matters', text: 'A plant can make efficiently yet still disappoint customers if the warehouse or transport network cannot deliver. End-to-end efficiency measures service as well as factory speed.' },
    ],
    visualKind: 'nab-vc-23-3', visualHeading: 'Operations efficiency loop', visualIntro: 'Connect planning, line use, warehousing, transport, and service outcomes.',
    keyTerms: [{ term: 'Capacity utilization', definition: 'Actual output relative to available production capacity.' }, { term: 'Changeover', definition: 'Time and work needed to switch a line between products or packs.' }, { term: 'Inventory rotation', definition: 'Dispatching stock in an order that protects remaining shelf life.' }, { term: 'Cold chain', definition: 'Temperature-controlled storage and transport.' }],
    recap: ['Factory efficiency and delivery service must be managed together.', 'SKU variety creates changeover and inventory complexity.', 'Handling and temperature needs differ by product.'],
    deepDiveTitle: 'Why maximum utilization is not always optimal', body: <DeepDive><p>Running one SKU for a long period improves line efficiency but can create too much inventory and delay other products. Frequent switching improves responsiveness but consumes time and material.</p><p>Operations planning finds a workable balance among demand, service, shelf life, and production economics.</p></DeepDive>,
    sources: [SOURCES.tayNinh, SOURCES.swire, SOURCES.thp],
  }),
];

const lesson24: NabModule02CardData[] = [
  card({
    title: 'How Beverages Reach the Market', chapterTitle: 'How Beverages Reach the Market', readingTime: '5',
    objective: 'Describe primary, secondary, and last-mile distribution and the roles of wholesalers and distributors.',
    mateIntro: 'A finished pallet has no consumer value while it sits at the plant. Route to market turns factory output into reliable availability across cities, neighborhoods, campuses, cafés, and small shops.',
    keyInsight: 'Distribution is a layered reach system: primary movement positions bulk inventory, secondary movement serves outlets, and last-mile delivery completes the consumer order.',
    narrative: [
      { label: 'What it is', text: 'Primary distribution moves goods from plant to a distribution center or distributor. Secondary distribution moves smaller quantities to outlets. Last-mile delivery reaches the final consumer, especially in digital commerce.' },
      { label: 'How it works', text: 'Manufacturers allocate stock by region. Distributors hold inventory, extend service or credit, break bulk, and operate routes. Wholesalers may add another layer where the outlet base is fragmented.' },
      { label: 'Real-world example', text: 'A plant can ship full truckloads to a regional distributor. That distributor then sends mixed cases to many small shops, while a quick-commerce partner may deliver single consumer orders from a local store or dark store.' },
      { label: 'Why it matters', text: 'Route design sets the trade-off among reach, service frequency, inventory, and cost. The best network is the one that matches channel economics and consumer demand density.' },
    ],
    visualKind: 'nab-vc-24-1', visualHeading: 'Layered route-to-market network', visualIntro: 'Follow full loads, outlet replenishment, and last-mile orders through different network layers.',
    keyTerms: [{ term: 'Primary distribution', definition: 'Bulk movement from plant to a distribution point.' }, { term: 'Secondary distribution', definition: 'Movement from distributor to trade outlets.' }, { term: 'Break bulk', definition: 'Splitting large shipments into smaller outlet orders.' }, { term: 'Route to market', definition: 'The designed path and partners used to reach customers.' }],
    recap: ['Distribution works in layers with different economics.', 'Distributors create reach, inventory availability, and service.', 'Demand density influences route cost.'],
    deepDiveTitle: 'Direct is not automatically cheaper', body: <DeepDive><p>Removing an intermediary also removes the services that intermediary performed. A manufacturer going direct may need to fund vehicles, local inventory, sales calls, credit, and collections.</p><p>Channel design should compare total system cost and service—not only the visible distributor margin.</p></DeepDive>,
    sources: [SOURCES.mordor, SOURCES.grandView, SOURCES.chainGuide],
  }),
  card({
    title: 'Retail, Foodservice, and Digital Channels', chapterTitle: 'Retail, Foodservice, and Digital Channels', readingTime: '5',
    objective: 'Compare general trade, modern trade, convenience, foodservice, e-commerce, and quick-commerce channel needs.',
    mateIntro: 'The same drink behaves like a different business in a neighborhood shop, a supermarket, a café, and a delivery app. Pack, price, visibility, and service expectations all change.',
    keyInsight: 'Channels are distinct demand systems; each has different shoppers, order patterns, economics, data, and execution requirements.',
    narrative: [
      { label: 'What it is', text: 'General Trade includes fragmented independent outlets. Modern Trade includes supermarkets, minimarts, and convenience chains. Foodservice covers restaurants, cafés, hotels, and other on-premise occasions. Digital channels include e-commerce and quick commerce.' },
      { label: 'How it works', text: 'Companies tailor assortment, pack size, promotion, delivery, and account management by channel. Modern chains provide structured data and centralized negotiation; small outlets require route density; foodservice may require equipment or menu activation.' },
      { label: 'Real-world example', text: 'The research estimates mom-and-pop stores at about 59.35% of Vietnam retail in 2025 and about 50.2% of carbonated-soft-drink revenue. Modern trade was estimated near 29% of total retail by 2024 and growing.' },
      { label: 'Why it matters', text: 'A portfolio that wins in one channel may underperform in another. Channel strategy prevents a company from treating all outlets as identical doors.' },
    ],
    visualKind: 'nab-vc-24-2', visualHeading: 'Multi-channel distribution network', visualIntro: 'Compare channel roles, order patterns, and the consumer occasions they serve.',
    keyTerms: [{ term: 'General Trade', definition: 'Fragmented independent shops, markets, and traditional outlets.' }, { term: 'Modern Trade', definition: 'Organized supermarkets, minimarts, and convenience chains.' }, { term: 'Foodservice', definition: 'Channels where drinks are consumed through restaurants, cafés, hotels, or similar venues.' }, { term: 'Quick commerce', definition: 'Fast digital ordering and local delivery from nearby inventory.' }],
    recap: ['Channels differ in shopper mission and operating model.', 'Traditional trade remains central in Vietnam.', 'Modern and digital channels add data and new service expectations.'],
    deepDiveTitle: 'Read channel percentages carefully', body: <DeepDive><p>Published estimates can differ because they use different categories, years, and definitions of retail value. The 59.35%, 50.2%, and 29% figures should not be added together.</p><p>Use each statistic for the question it actually answers: total retail structure, CSD channel mix, or modern-trade development.</p></DeepDive>,
    sources: [SOURCES.mordor, SOURCES.grandView, SOURCES.go2market],
  }),
  card({
    title: 'Marketing, Distribution Execution, and Delivery', chapterTitle: 'Marketing, Distribution Execution, and Delivery', readingTime: '5',
    objective: 'Explain how brand demand, trade marketing, merchandising, distributor execution, and last-mile delivery work together.',
    mateIntro: 'An advertisement can create desire, but the sale is lost if the product is warm, hidden, out of stock, or absent from the app. Commercial success joins demand creation with availability.',
    keyInsight: 'Marketing creates preference; distribution execution converts that preference into a purchase by making the right product visible, available, and deliverable.',
    narrative: [
      { label: 'What it is', text: 'Brand marketing builds awareness and preference. Trade marketing shapes channel programs. Sales and distributors secure listings and replenishment. Merchandising manages display, price communication, and cooler or shelf execution.' },
      { label: 'How it works', text: 'A campaign sets a target consumer and occasion, then commercial teams translate it into channel-specific packs, promotions, stock plans, outlet materials, and delivery capacity. Field information feeds back into the next plan.' },
      { label: 'Real-world example', text: 'A student-focused energy-drink campaign may combine mass media, chilled single cans in convenience stores, displays in general trade, café activation, and app visibility during evening study hours.' },
      { label: 'Why it matters', text: 'Demand creation without execution wastes media. Execution without brand pull can leave stock sitting. Coordinated planning raises both sell-in to outlets and sell-out to consumers.' },
    ],
    visualKind: 'nab-vc-24-3', visualHeading: 'From demand creation to delivery', visualIntro: 'See the feedback loop joining marketing, outlet execution, replenishment, and consumer purchase.',
    keyTerms: [{ term: 'Trade marketing', definition: 'Programs designed to win within retail and distribution channels.' }, { term: 'Merchandising', definition: 'In-outlet execution of availability, display, price, and promotion.' }, { term: 'Sell-in', definition: 'Sales from manufacturer or distributor into the trade.' }, { term: 'Sell-out', definition: 'Sales from an outlet to final consumers.' }],
    recap: ['Brand demand and physical availability are complementary.', 'Merchandising turns plans into outlet reality.', 'Sell-out signals should feed replenishment and future activity.'],
    deepDiveTitle: 'The last meter matters', body: <DeepDive><p>Downstream advantage is often built through repeated small actions: correct assortment, working coolers, visible price, fresh stock, and reliable delivery. These actions are difficult to copy at scale because they depend on routines across many outlets.</p><p>For MT roles, downstream performance links Sales, Marketing, Supply Chain, and Finance.</p></DeepDive>,
    sources: [SOURCES.mordor, SOURCES.go2market, SOURCES.chainGuide],
  }),
];

const lesson25: NabModule02CardData[] = [
  card({
    title: 'Understanding Inputs and Outputs', chapterTitle: 'Understanding Inputs and Outputs', readingTime: '5',
    objective: 'Map the physical, service, information, and financial inputs and outputs at each value-chain stage.',
    mateIntro: 'Every stage receives something, transforms it, and hands something more useful to the next stage. The output is not always a bottle: it can also be quality assurance, availability, consumer data, or credit.',
    keyInsight: 'Inputs and outputs reveal the transformation logic of each stage and make hidden dependencies visible.',
    narrative: [
      { label: 'What it is', text: 'Upstream turns resources into qualified ingredients, packs, and equipment. Midstream turns those inputs into safe finished SKUs. Downstream turns inventory and brand plans into availability, transactions, and market information.' },
      { label: 'How it works', text: 'For each stage, list the physical inputs, enabling services, information, cash needs, transformation activity, and resulting outputs. Then identify who receives each output and what quality standard they require.' },
      { label: 'Real-world example', text: 'A filling line receives approved syrup, treated water, containers, labor, energy, and a production order. It outputs coded cases, quality records, production data, wastewater, and packaging waste.' },
      { label: 'Why it matters', text: 'This map prevents narrow optimization. Raising line speed is not valuable if it creates defects, excess stock, or warehouse congestion.' },
    ],
    visualKind: 'nab-vc-25-1', visualHeading: 'Stage-by-stage input/output map', visualIntro: 'Compare what enters, what changes, and what leaves upstream, midstream, and downstream.',
    keyTerms: [{ term: 'Transformation', definition: 'The activity that makes an input more useful to the next customer.' }, { term: 'By-product', definition: 'A secondary material created alongside the main output.' }, { term: 'Waste stream', definition: 'Material or water requiring recovery, treatment, or disposal.' }, { term: 'Internal customer', definition: 'The next function or stage relying on an output.' }],
    recap: ['Every stage transforms multiple kinds of input.', 'Outputs include information and waste as well as finished goods.', 'The next stage defines whether an output is useful.'],
    deepDiveTitle: 'Use the map before choosing a KPI', body: <DeepDive><p>A KPI should reflect the intended transformation. Procurement needs cost and service; manufacturing needs safety, quality, yield, and output; distribution needs availability and delivery productivity.</p><p>One metric alone can create unintended behavior, so balanced measures are usually more informative.</p></DeepDive>,
    sources: [SOURCES.chainGuide, SOURCES.imarc],
  }),
  card({
    title: 'Where Costs and Profits Are Generated', chapterTitle: 'Where Costs and Profits Are Generated', readingTime: '5',
    objective: 'Compare cost blocks and explain why concentrate owners, brand owners, bottlers, and manufacturers can have different margin structures.',
    mateIntro: 'The liquid looks like the product, but the research shows packaging and distribution can cost more than what is inside. Profit depends on who owns scarce assets and who carries heavy operating costs.',
    keyInsight: 'Revenue, cost, and profit pools are distributed unevenly: intangible formulation and brand assets can earn strong margins, while bottling converts large revenue through capital-heavy operations.',
    narrative: [
      { label: 'What it is', text: 'The research’s broad CSD cost benchmarks place water and ingredients around 15–20%, packaging around 25–35%, manufacturing labor and overhead around 20–25%, and logistics around 10–15%. These are indicative ranges, not one universal P&L.' },
      { label: 'How it works', text: 'A concentrate owner monetizes formula and brand across a system. A bottler buys inputs, operates plants, holds inventory, and distributes finished goods. The bottler may report more revenue while retaining a lower gross margin.' },
      { label: 'Real-world example', text: 'Coca-Cola has stated that finished-product operations generate higher net operating revenue but lower gross profit margin than concentrate operations. The research also cites roughly 5–15% net profit for a standalone CSD manufacturing plant.' },
      { label: 'Why it matters', text: 'Comparing companies requires matching the operating model. A lower-margin bottler is not automatically worse; it performs a different, asset-intensive role.' },
    ],
    visualKind: 'nab-vc-25-2', visualHeading: 'Cost blocks and profit-pool logic', visualIntro: 'Read the cited cost ranges beside the different economics of concentrate and finished-product operations.',
    keyTerms: [{ term: 'Gross margin', definition: 'Revenue remaining after direct cost of goods sold.' }, { term: 'Profit pool', definition: 'The profit available within a stage or activity.' }, { term: 'Asset intensity', definition: 'The amount of physical capital required to operate.' }, { term: 'Cost of goods sold', definition: 'Direct cost of producing the goods sold.' }],
    recap: ['Packaging is the largest cited cost block.', 'Concentrate and finished-product operations have different economics.', 'Operating-model context is essential when comparing margins.'],
    deepDiveTitle: 'How to use benchmark ranges', body: <DeepDive><p>The cost ranges come from industry models and packaging research. They should guide hypotheses, not be pasted into every company case. Category, package, plant scale, geography, and accounting treatment can change the mix.</p><p>For a case interview, state the benchmark, identify its scope, and ask what is different about the company being analyzed.</p></DeepDive>,
    sources: [SOURCES.packaging, SOURCES.imarc, SOURCES.cokeFiling, SOURCES.macrotrends],
  }),
  card({
    title: 'How Companies Create Competitive Value', chapterTitle: 'How Companies Create Competitive Value', readingTime: '5',
    objective: 'Explain how scale, differentiation, formulation IP, brand equity, and distribution efficiency create defensible value.',
    mateIntro: 'Two companies can buy similar sugar and packaging, yet one earns more. The difference is often a system: a product people prefer, a network that reaches more outlets, and operations that spread cost over greater volume.',
    keyInsight: 'Competitive value comes from combining lower system cost with meaningful differentiation—and making both difficult for rivals to copy.',
    narrative: [
      { label: 'What it is', text: 'Scale spreads fixed costs and strengthens purchasing. Differentiation supports preference and price. Formulation IP protects product identity. Distribution depth improves availability. Portfolio discipline limits complexity.' },
      { label: 'How it works', text: 'Advantages reinforce one another. Strong brands support volume; volume supports plant and route density; density lowers unit cost and improves service; better service protects the brand.' },
      { label: 'Real-world example', text: 'A brand owner can protect concentrate IP while local bottlers build plants and distribution. Tan Hiep Phat illustrates a local vertically integrated model with more than one billion liters of annual production cited in the research.' },
      { label: 'Why it matters', text: 'A single successful product can be copied more easily than a coordinated system of brand, formula, capacity, quality, and outlet relationships.' },
    ],
    visualKind: 'nab-vc-25-3', visualHeading: 'Competitive value flywheel', visualIntro: 'See how preference, scale, efficiency, availability, and reinvestment can reinforce one another.',
    keyTerms: [{ term: 'Economies of scale', definition: 'Lower average cost as volume spreads fixed resources.' }, { term: 'Differentiation', definition: 'Meaningful features or associations that distinguish an offer.' }, { term: 'Brand equity', definition: 'The value created by awareness, trust, and preference.' }, { term: 'Distribution depth', definition: 'The breadth and quality of outlet coverage.' }],
    recap: ['Scale and differentiation can reinforce each other.', 'Brand, IP, and distribution are difficult-to-copy assets.', 'Portfolio complexity can weaken otherwise strong economics.'],
    deepDiveTitle: 'Advantage is a system, not a slogan', body: <DeepDive><p>A premium claim without product quality is fragile. A low-cost plant without demand runs below capacity. Wide distribution without replenishment discipline produces stock-outs or waste.</p><p>The strongest advantage links consumer value with operational capability and channel execution.</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.cokeFiling, SOURCES.thp],
  }),
];

const lesson26: NabModule02CardData[] = [
  card({
    title: 'How Global Beverage Supply Chains Operate', chapterTitle: 'How Global Beverage Supply Chains Operate', readingTime: '5',
    objective: 'Explain why global beverage systems centralize selected intellectual property while localizing bottling, distribution, and selling.',
    mateIntro: 'Shipping finished water-heavy drinks around the world would be costly. Global systems instead move knowledge, concentrate, standards, equipment, and selected materials—then produce close to demand.',
    keyInsight: 'Global beverage companies separate what benefits from central control from what benefits from local scale and market knowledge.',
    narrative: [
      { label: 'What it is', text: 'The global model can centralize brand ownership, portfolio strategy, formula, and concentrate while local bottlers handle treated water, sweetener, filling, packaging, distribution, and customer relationships.' },
      { label: 'How it works', text: 'Central standards preserve product identity. Local operations invest in plants and routes, comply with local rules, and adapt execution. Contracts and quality systems coordinate the network.' },
      { label: 'Real-world example', text: 'The Coca-Cola system creates concentrates and syrups and sells them to authorized bottling partners, who combine, package, merchandise, and distribute finished beverages in their territories.' },
      { label: 'Why it matters', text: 'The split avoids transporting the heaviest ingredient—water—over long distances while protecting brand and formulation consistency.' },
    ],
    visualKind: 'nab-vc-26-1', visualHeading: 'Centralized capabilities, localized execution', visualIntro: 'Compare the activities commonly held at the center with those performed close to the market.',
    keyTerms: [{ term: 'Concentrate model', definition: 'Central production of a controlled base combined with local bottling.' }, { term: 'Bottling territory', definition: 'A market area served by an authorized bottling operator.' }, { term: 'Global standard', definition: 'A shared specification or process applied across markets.' }, { term: 'Local execution', definition: 'Market-specific production, sales, and distribution activity.' }],
    recap: ['Global systems centralize selected IP and standards.', 'Water-heavy production and route to market are often local.', 'Coordination preserves consistency across partners.'],
    deepDiveTitle: 'Control does not require owning every activity', body: <DeepDive><p>A company can govern quality and brand outcomes through specifications, authorization, audits, data, and commercial agreements. Ownership is one coordination mechanism, not the only one.</p><p>The right boundary depends on capital, local knowledge, risk, and the strategic importance of the activity.</p></DeepDive>,
    sources: [SOURCES.cokeSystem, SOURCES.cokeFiling],
  }),
  card({
    title: "Vietnam's Beverage Production and Distribution Network", chapterTitle: "Vietnam's Beverage Production and Distribution Network", readingTime: '5',
    objective: 'Describe Vietnam’s mix of multinational plants, local producers, distributors, and fragmented retail channels.',
    mateIntro: 'Vietnam’s beverage network is both modern and fragmented: large automated plants feed a market where many purchases still happen through small independent outlets.',
    keyInsight: 'Vietnam combines expanding industrial capacity with a route to market that must serve traditional trade, modern chains, foodservice, and digital demand.',
    narrative: [
      { label: 'What it is', text: 'The network includes multinational bottlers, domestic manufacturers, regional distributors, wholesalers, modern retail chains, and a very large base of traditional outlets.' },
      { label: 'How it works', text: 'Plants position inventory into regional networks. Distributor routes serve fragmented stores; key-account teams serve organized chains; digital partners add another ordering and delivery layer.' },
      { label: 'Real-world example', text: 'The research cites Suntory PepsiCo’s USD 300 million Tay Ninh plant, Swire Coca-Cola’s USD 136 million Long An plant, and Tan Hiep Phat production above one billion liters annually.' },
      { label: 'Why it matters', text: 'Plant investment creates capacity, but commercial value depends on reaching outlets consistently. Vietnam therefore rewards both manufacturing scale and route-to-market depth.' },
    ],
    visualKind: 'nab-vc-26-2', visualHeading: 'Vietnam production and distribution network', visualIntro: 'See how large plants connect with distributors and several channel types.',
    keyTerms: [{ term: 'FDI', definition: 'Foreign direct investment in productive assets or businesses.' }, { term: 'Key account', definition: 'A strategically important organized customer managed centrally.' }, { term: 'Vertically integrated', definition: 'Controlling multiple stages of the value chain.' }, { term: 'Outlet universe', definition: 'The total set of potential points of sale in a market.' }],
    recap: ['Vietnam has significant multinational and domestic production.', 'Traditional trade remains essential to outlet reach.', 'Capacity investment and distribution depth must work together.'],
    deepDiveTitle: 'Why southern plant investment matters', body: <DeepDive><p>The research identifies major investments in Tay Ninh and Long An, close to large southern demand and logistics corridors. Plant location decisions can balance market access, land, utilities, labor, and network fit.</p><p>No unsupported national capacity total is inferred from these individual projects.</p></DeepDive>,
    sources: [SOURCES.tayNinh, SOURCES.swire, SOURCES.thp, SOURCES.mordor],
  }),
  card({
    title: 'Localization, Imports, Exports, and Dependencies', chapterTitle: 'Localization, Imports, Exports, and Dependencies', readingTime: '5',
    objective: 'Evaluate localization choices and Vietnam’s dependencies on imported ingredients, materials, machinery, and global trade conditions.',
    mateIntro: '“Made in Vietnam” can still depend on imported aluminum sheet, specialized flavors, or high-speed machinery. Local production and global dependency can be true at the same time.',
    keyInsight: 'Localization is selective: companies localize where proximity and adaptation add value while retaining imports for capabilities or materials not efficiently available locally.',
    narrative: [
      { label: 'What it is', text: 'Localization adapts sourcing, formulation, packaging, production, and route to market to local economics and consumer preferences. Import dependencies remain where specialized inputs, materials, or equipment are required.' },
      { label: 'How it works', text: 'Companies compare landed cost, quality, scale, lead time, currency exposure, and strategic control. Co-packing can give smaller brands local capacity without building a plant. Exports use available capacity and regional market access.' },
      { label: 'Real-world example', text: 'Vietnam can source water, some sugar, glass, and PET locally, while the research identifies dependence on imported aluminum sheet, selected flavors, and high-speed machinery. Domestic players include Tan Hiep Phat; URC bottles locally under a Philippine parent.' },
      { label: 'Why it matters', text: 'A localized chain can improve fit and resilience, but excessive dependence on one market or supplier can expose cost and continuity. The objective is a deliberate portfolio of local and global links.' },
    ],
    visualKind: 'nab-vc-26-3', visualHeading: 'Global versus Vietnam comparison', visualIntro: 'Compare what is centralized, imported, localized, and distributed within Vietnam.',
    keyTerms: [{ term: 'Import dependency', definition: 'Reliance on foreign supply for an important input or capability.' }, { term: 'Co-packing', definition: 'Contract manufacturing and packaging for another brand.' }, { term: 'Currency exposure', definition: 'Cost or revenue sensitivity to exchange-rate movement.' }, { term: 'Localization strategy', definition: 'A deliberate choice of which activities and offers to adapt locally.' }],
    recap: ['Local production can still contain imported dependencies.', 'Localization decisions balance cost, quality, fit, and resilience.', 'Co-packing lowers the entry barrier for smaller brands.'],
    deepDiveTitle: 'Why Vietnam attracts beverage investment', body: <DeepDive><p>The research highlights labor costs, a young and growing middle class, GDP growth, and ASEAN access. The OECD source records FDI inflows averaging about 4.8% of GDP over 2015–2023.</p><p>These conditions support investment, but individual projects still depend on category demand, infrastructure, regulation, and company strategy.</p></DeepDive>,
    sources: [SOURCES.oecd, SOURCES.thp, SOURCES.vietnamSugar],
  }),
];

export const NAB_MODULE02_DECKS: Record<string, NabModule02CardData[]> = {
  'Value Chain Overview': lesson21,
  'Upstream Activities': lesson22,
  'Midstream Activities': lesson23,
  'Downstream Activities': lesson24,
  'Inputs, Outputs & Value Creation': lesson25,
  'Global vs. Local Value Chain': lesson26,
};

applyChapterVisualText(NAB_MODULE02_DECKS, NAB_M2_VISUALS);

type VisualMode = 'flow' | 'network' | 'compare' | 'loop' | 'bars';
interface VisualData { title: string; subtitle: string; mode: VisualMode; nodes: Array<{ label: string; detail: string; value?: string; pct?: number }>; leftTitle?: string; rightTitle?: string; takeaway: string }
const VISUALS = {
  'nab-vc-21-1': { title: 'From inputs to a consumer purchase', subtitle: 'One connected chain, three operating blocks', mode: 'flow', nodes: [{ label: 'Ingredients & packs', detail: 'Water · sweetener · concentrate · CO₂ · containers' }, { label: 'Manufacture', detail: 'Treat · blend · process · fill · check' }, { label: 'Distribution', detail: 'Plant · DC · distributor · outlet' }, { label: 'Consumer', detail: 'Availability becomes a purchase' }], takeaway: 'Every hand-off must protect quality, timing, and information.' },
  'nab-vc-21-2': { title: 'Who adds what?', subtitle: 'Specialized participants create different forms of value', mode: 'network', nodes: [{ label: 'Suppliers', detail: 'Reliable qualified inputs' }, { label: 'Brand owner', detail: 'Formula, portfolio, preference' }, { label: 'Bottler', detail: 'Safe conversion at scale' }, { label: 'Distributor', detail: 'Inventory, credit, reach' }, { label: 'Retailer', detail: 'Convenience and final access' }], takeaway: 'Value comes from solving a distinct problem for the next participant or consumer.' },
  'nab-vc-21-3': { title: 'Four flows across one chain', subtitle: 'Direction explains coordination', mode: 'compare', leftTitle: 'Toward the consumer', rightTitle: 'Back and both ways', nodes: [{ label: 'Physical product →', detail: 'Ingredients, packs, finished goods' }, { label: 'Services →', detail: 'Transport, merchandising, support' }, { label: 'Money ←', detail: 'Payment and credit settlement' }, { label: 'Information ↔', detail: 'Orders, forecasts, inventory, sales data' }], takeaway: 'A visible stock problem may begin as an information or payment problem.' },
  'nab-vc-22-1': { title: 'Ingredient sourcing map', subtitle: 'Different inputs need different sourcing logic', mode: 'network', nodes: [{ label: 'Local water', detail: 'Treated to product specification' }, { label: 'Agricultural inputs', detail: 'Sugar and fruit concentrates' }, { label: 'Controlled inputs', detail: 'Concentrate and flavor systems' }, { label: 'Process inputs', detail: 'CO₂, caffeine, vitamins, minerals' }], takeaway: 'Quality, continuity, and landed cost matter together.' },
  'nab-vc-22-2': { title: 'Supplier ecosystem around the line', subtitle: 'Materials and equipment converge in one production system', mode: 'network', nodes: [{ label: 'Primary packs', detail: 'PET · aluminum · glass · cartons' }, { label: 'Closures & labels', detail: 'Seal, identity, compliance' }, { label: 'Secondary packs', detail: 'Cases, trays, wrap, pallets' }, { label: 'Equipment', detail: 'Treatment, filling, inspection' }, { label: 'Technical service', detail: 'Parts, maintenance, calibration' }], takeaway: 'A pack choice changes material, machine, logistics, and brand economics.' },
  'nab-vc-22-3': { title: 'Risk → impact → response', subtitle: 'Match protection to the exposure', mode: 'network', leftTitle: 'Exposure', rightTitle: 'Targeted response', nodes: [{ label: 'Commodity price', detail: 'Contracts and planning' }, { label: 'Single supplier', detail: 'Qualify alternatives' }, { label: 'Long import lead time', detail: 'Selective buffers' }, { label: 'Water stress', detail: 'Efficiency and site planning' }], takeaway: 'Resilience is selective protection, not maximum inventory everywhere.' },
  'nab-vc-23-1': { title: 'Controlled manufacturing flow', subtitle: 'The exact sequence varies by beverage', mode: 'flow', nodes: [{ label: 'Approve inputs', detail: 'Verify material and batch' }, { label: 'Treat & dose', detail: 'Prepare water and ingredients' }, { label: 'Blend & process', detail: 'Carbonate, heat treat, or aseptically handle as required' }, { label: 'Fill & close', detail: 'Protect the finished drink' }, { label: 'Label & pack', detail: 'Create a traceable saleable SKU' }], takeaway: 'Standard control turns a recipe into consistent high-volume output.' },
  'nab-vc-23-2': { title: 'Quality gates across the line', subtitle: 'Prevention, detection, containment, release', mode: 'flow', nodes: [{ label: 'Incoming', detail: 'Water, ingredient, and pack approval' }, { label: 'Process', detail: 'Recipe and critical-condition checks' }, { label: 'Package', detail: 'Fill, closure, seam, label' }, { label: 'Finished goods', detail: 'Test, code, isolate if needed' }, { label: 'Release', detail: 'Approve before distribution' }], takeaway: 'Quality is built into each hand-off, not added by a final inspection.' },
  'nab-vc-23-3': { title: 'Operational efficiency loop', subtitle: 'Plan, run, store, deliver, learn', mode: 'loop', nodes: [{ label: 'Demand plan', detail: 'SKU and timing requirements' }, { label: 'Production plan', detail: 'Sequence runs and changeovers' }, { label: 'Warehouse', detail: 'Protect and rotate inventory' }, { label: 'Transport', detail: 'Consolidate and deliver' }, { label: 'Service signal', detail: 'Feed results into the next plan' }], takeaway: 'The best factory result is one the network can store, deliver, and sell.' },
  'nab-vc-24-1': { title: 'Layered route to market', subtitle: 'Bulk movement becomes convenient availability', mode: 'flow', nodes: [{ label: 'Plant', detail: 'Full pallets and production stock' }, { label: 'DC / distributor', detail: 'Regional inventory and allocation' }, { label: 'Outlet routes', detail: 'Mixed orders and replenishment' }, { label: 'Last mile', detail: 'Single consumer order where relevant' }, { label: 'Consumer', detail: 'Right drink, place, time, condition' }], takeaway: 'Each layer trades scale for reach and service.' },
  'nab-vc-24-2': { title: 'One portfolio, several channels', subtitle: 'Channel needs differ', mode: 'network', nodes: [{ label: 'General Trade', detail: 'Fragmented reach and frequent routes' }, { label: 'Modern Trade', detail: 'Central negotiation and structured data' }, { label: 'Convenience', detail: 'Immediate occasions and chilled singles' }, { label: 'Foodservice', detail: 'Menu, equipment, and on-premise use' }, { label: 'Digital', detail: 'Search, data, and rapid delivery' }], takeaway: 'Channel strategy adapts the offer and service without losing brand coherence.' },
  'nab-vc-24-3': { title: 'Demand-to-delivery loop', subtitle: 'Preference and execution reinforce each other', mode: 'loop', nodes: [{ label: 'Brand demand', detail: 'Awareness and preference' }, { label: 'Channel plan', detail: 'Pack, price, promotion, stock' }, { label: 'Outlet execution', detail: 'List, display, chill, replenish' }, { label: 'Purchase', detail: 'Consumer converts availability' }, { label: 'Sell-out data', detail: 'Improve the next plan' }], takeaway: 'Marketing wins only when execution makes the promise purchasable.' },
  'nab-vc-25-1': { title: 'Inputs become outputs', subtitle: 'Every stage serves the next stage', mode: 'network', leftTitle: 'Inputs', rightTitle: 'Outputs', nodes: [{ label: 'Upstream', detail: 'Resources → qualified ingredients and packs' }, { label: 'Midstream', detail: 'Materials + services → safe finished SKUs and records' }, { label: 'Downstream', detail: 'Inventory + plans → availability, transactions, and data' }, { label: 'System effects', detail: 'Waste and by-products also leave the process' }], takeaway: 'An output is valuable only when it meets the next stage’s requirement.' },
  'nab-vc-25-2': { title: 'Indicative CSD cost blocks', subtitle: 'Research ranges; category and company economics vary', mode: 'bars', nodes: [{ label: 'Packaging', detail: 'Largest cited block', value: '25–35%', pct: 100 }, { label: 'Manufacturing labor + overhead', detail: 'Plant conversion cost', value: '20–25%', pct: 71 }, { label: 'Water + ingredients', detail: 'The liquid inputs', value: '15–20%', pct: 57 }, { label: 'Logistics', detail: 'Movement through the network', value: '10–15%', pct: 43 }], takeaway: 'The package and movement can cost more than the liquid inside.' },
  'nab-vc-25-3': { title: 'Competitive value flywheel', subtitle: 'Capabilities reinforce one another', mode: 'loop', nodes: [{ label: 'Product & brand preference', detail: 'Create demand and pricing power' }, { label: 'Volume & scale', detail: 'Spread fixed cost and strengthen buying' }, { label: 'Efficient operations', detail: 'Protect cost, quality, and service' }, { label: 'Distribution depth', detail: 'Turn demand into availability' }, { label: 'Reinvestment', detail: 'Strengthen the next cycle' }], takeaway: 'A connected system is harder to copy than one isolated feature.' },
  'nab-vc-26-1': { title: 'Global center, local edge', subtitle: 'Centralize what needs control; localize what needs proximity', mode: 'compare', leftTitle: 'Often centralized', rightTitle: 'Often localized', nodes: [{ label: 'Brand & portfolio', detail: 'Shared strategic direction' }, { label: 'Formula & concentrate', detail: 'Protected consistency' }, { label: 'Bottling & packaging', detail: 'Close to heavy water and demand' }, { label: 'Sales & distribution', detail: 'Local channels and relationships' }], takeaway: 'The model combines IP control with local capital and market knowledge.' },
  'nab-vc-26-2': { title: 'Vietnam beverage network', subtitle: 'Industrial capacity meets a fragmented market', mode: 'network', nodes: [{ label: 'Multinational plants', detail: 'Suntory PepsiCo and Swire Coca-Cola examples' }, { label: 'Domestic producers', detail: 'Tan Hiep Phat and local portfolios' }, { label: 'Distributors', detail: 'Regional inventory and outlet routes' }, { label: 'Traditional trade', detail: 'Large fragmented outlet base' }, { label: 'Modern + digital', detail: 'Chains, apps, and delivery partners' }], takeaway: 'Production scale creates value only when the route to market converts it into availability.' },
  'nab-vc-26-3': { title: 'Global links and local choices', subtitle: 'Vietnam combines local production with selected dependencies', mode: 'compare', leftTitle: 'Vietnam-localized', rightTitle: 'Global / imported links', nodes: [{ label: 'Water and some sugar', detail: 'Local availability with quality and trade exposure' }, { label: 'Production & distribution', detail: 'Plants and routes close to demand' }, { label: 'Aluminum sheet & selected flavors', detail: 'Imported dependencies in the research' }, { label: 'High-speed machinery', detail: 'Global technology and parts exposure' }], takeaway: 'Localization is a portfolio choice, not an all-local or all-global label.' },
} satisfies Record<string, VisualData>;

export type NabModule02VisualKind = keyof typeof VISUALS;

function FlowVisual({ data }: { data: VisualData }) {
  return <div className="grid gap-3 md:grid-cols-5">{data.nodes.map((node, index) => <div key={node.label} className="relative min-w-0 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"><p className="text-xs font-black text-slate-900">{node.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{node.detail}</p>{index < data.nodes.length - 1 && <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-black text-white md:block">→</span>}</div>)}</div>;
}

function NetworkVisual({ data }: { data: VisualData }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.nodes.map((node, index) => <div key={node.label} className={`rounded-xl border p-4 ${index === 1 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}><p className="text-xs font-black text-slate-900">{node.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{node.detail}</p></div>)}</div>;
}

function CompareVisual({ data }: { data: VisualData }) {
  const split = Math.ceil(data.nodes.length / 2);
  return <div className="grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-red-600">{data.leftTitle}</p><div className="mt-3 space-y-2">{data.nodes.slice(0, split).map((node) => <div key={node.label} className="rounded-lg bg-white p-3 ring-1 ring-red-100"><p className="text-xs font-black text-slate-900">{node.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{node.detail}</p></div>)}</div></div><div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">{data.rightTitle}</p><div className="mt-3 space-y-2">{data.nodes.slice(split).map((node) => <div key={node.label} className="rounded-lg bg-white p-3 ring-1 ring-slate-200"><p className="text-xs font-black text-slate-900">{node.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{node.detail}</p></div>)}</div></div></div>;
}

function BarsVisual({ data }: { data: VisualData }) {
  return <div className="space-y-4">{data.nodes.map((node) => <div key={node.label}><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-black text-slate-900">{node.label}</p><p className="text-[11px] text-slate-500">{node.detail}</p></div><p className="shrink-0 text-sm font-black text-red-600">{node.value}</p></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-red-600" style={{ width: `${node.pct ?? 0}%` }} /></div></div>)}</div>;
}

export function renderNabModule02Visual(kind: NabModule02VisualKind): ReactNode {
  const visual = NAB_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}

interface QuizSeed { chapter: '1' | '2' | '3'; objective: string; question: string; application: string; correct: string; wrong: [string, string, string]; explanation: string }
const optionIds = ['a', 'b', 'c', 'd'];
function pairedQuiz(prefix: string, seeds: QuizSeed[]): NabModule02Question[] {
  const pairs = seeds.map((seed, seedIndex) => [seed.question, seed.application].map((question, pairIndex) => {
    const rotation = (seedIndex + pairIndex) % 4;
    const raw = [seed.correct, ...seed.wrong];
    const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return { id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`, question, options: rotated.map((text, index) => ({ id: optionIds[index], text })), correctOptionId: optionIds[rotated.indexOf(seed.correct)], explanation: seed.explanation, moduleId: seed.chapter, objective: seed.objective };
  }) as [NabModule02Question, NabModule02Question]);
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}

const q21 = pairedQuiz('nab-21', [
  { chapter: '1', objective: 'Trace the end-to-end chain', question: 'Which sequence best represents the beverage value chain?', application: 'A team maps ingredients, a filling plant, distributors, and retailers. Which framework are they using?', correct: 'Upstream → midstream → downstream', wrong: ['Downstream → upstream → midstream', 'Marketing → finance → HR', 'Retail → farming → formulation'], explanation: 'Inputs sit upstream, conversion sits midstream, and route to market sits downstream.' },
  { chapter: '1', objective: 'Locate functions along the chain', question: 'Where do formulation, filling, and quality control mainly sit?', application: 'A graduate rotates through blending and packaging lines. Which block is this?', correct: 'Midstream', wrong: ['Upstream', 'Downstream', 'Final consumption'], explanation: 'These activities convert approved inputs into finished products.' },
  { chapter: '1', objective: 'Trace the end-to-end chain', question: 'What is the final point at which the chain’s value is realized?', application: 'A packaged bottle is still in a regional warehouse. What event completes the chain described in the lesson?', correct: 'A consumer purchase', wrong: ['A supplier quotation', 'A production plan', 'A quality meeting'], explanation: 'The chain ultimately serves a consumer occasion and transaction.' },
  { chapter: '2', objective: 'Explain participant value creation', question: 'What distinctive value does a distributor add?', application: 'Small stores need mixed cases, local inventory, and frequent service. Who commonly provides this?', correct: 'Breaking bulk and extending market reach', wrong: ['Creating the secret formula', 'Producing PET resin', 'Setting food-safety law'], explanation: 'Distributors position inventory and serve fragmented outlets.' },
  { chapter: '2', objective: 'Compare value creation and capture', question: 'Why can a concentrate owner have higher margins than a bottler?', application: 'One participant owns formula and brand; another owns plants and inventory. Which explanation fits their margin difference?', correct: 'It controls valuable intangibles while the bottler carries heavier operations', wrong: ['It always sells more physical liters', 'It has no quality obligations', 'Bottlers do not create value'], explanation: 'The operating models differ in asset intensity and ownership of IP.' },
  { chapter: '2', objective: 'Identify value-creating roles', question: 'Which participant most directly creates final shopping convenience?', application: 'A cold bottle is available beside a campus checkout. Which participant provides the last access point?', correct: 'The retailer', wrong: ['The flavor supplier', 'The equipment maker', 'The concentrate laboratory'], explanation: 'Retailers create proximity, presentation, and final transaction access.' },
  { chapter: '3', objective: 'Distinguish chain flows', question: 'Which flow usually moves backward from consumer toward suppliers?', application: 'A student pays a store and settlement moves through the channel. Which flow is this?', correct: 'Money', wrong: ['Finished product', 'Packaging material', 'Carbon dioxide'], explanation: 'Payment generally moves back through the chain.' },
  { chapter: '3', objective: 'Distinguish chain flows', question: 'Which flow should move in both directions?', application: 'Forecasts move toward suppliers while sales data moves toward the brand. Which flow is being described?', correct: 'Information', wrong: ['Only finished goods', 'Only cash', 'Only waste'], explanation: 'Orders, forecasts, inventory, and sales signals coordinate both directions.' },
  { chapter: '3', objective: 'Diagnose flow failures', question: 'A warehouse has stock but stores are empty. What is the most likely type of issue?', application: 'Physical inventory exists, yet replenishment did not happen. Which flow deserves investigation first?', correct: 'Information or service execution', wrong: ['Formula ownership', 'Consumer payment only', 'Ingredient farming only'], explanation: 'The stock exists; ordering, allocation, transport, or merchandising may have failed.' },
  { chapter: '3', objective: 'Connect flow to working capital', question: 'What ties up cash while goods wait to sell or customers wait to pay?', application: 'Inventory rises and retailer receivables lengthen. Which concept explains the cash pressure?', correct: 'Working capital', wrong: ['Brand awareness', 'Carbonation', 'Market share'], explanation: 'Inventory and receivables consume working capital.' },
]);

const q22 = pairedQuiz('nab-22', [
  { chapter: '1', objective: 'Identify major ingredients', question: 'What is the largest physical input in a typical carbonated soft drink?', application: 'A plant prioritizes treatment of the ingredient forming about 94% of cited soft-drink volume. What is it?', correct: 'Water', wrong: ['Sweetener', 'Flavor concentrate', 'Carbon dioxide'], explanation: 'The cited guide reports carbonated water at about 94% of volume.' },
  { chapter: '1', objective: 'Explain sweetener sourcing', question: 'What cited range describes sweetener share in a soft drink?', application: 'A learner sees a 6–12% formulation range. Which input does it refer to?', correct: 'About 6–12%', wrong: ['About 25–35%', 'About 50–60%', 'About 80–90%'], explanation: 'ChangeLab Solutions provides the 6–12% sweetener range.' },
  { chapter: '1', objective: 'Assess landed cost', question: 'What does landed cost add to purchase price?', application: 'An imported flavor looks cheap before freight, duty, and currency effects. Which measure should procurement compare?', correct: 'Freight, duties, handling, and currency effects', wrong: ['Only advertising cost', 'Only retailer margin', 'Only factory depreciation'], explanation: 'Landed cost captures the cost of bringing the input to use.' },
  { chapter: '1', objective: 'Explain Vietnam sourcing exposure', question: 'Why does Vietnam’s sugar trade position matter to beverage producers?', application: 'The research shows imports exceeding exports. What risk does this highlight?', correct: 'Exposure to global trade and price conditions', wrong: ['No need for supplier contracts', 'Elimination of currency risk', 'Guaranteed domestic surplus'], explanation: 'Net import dependence links local cost to external conditions.' },
  { chapter: '2', objective: 'Explain packaging economics', question: 'Which container was cheapest in the cited comparison?', application: 'A team reviews the cited PET, aluminum, and glass study. Which material had the lowest cost?', correct: 'PET', wrong: ['Glass', 'Aluminum in every case', 'All were identical'], explanation: 'The cited research ranked PET cheapest, aluminum in the middle, and glass highest.' },
  { chapter: '2', objective: 'Connect packaging and equipment', question: 'Why does line compatibility matter?', application: 'Marketing proposes a new pack that the filler cannot run. What constraint was missed?', correct: 'Equipment must be able to run the selected container and format', wrong: ['Retailers set the recipe', 'Distributors make concentrate', 'Labels replace quality checks'], explanation: 'Pack and equipment specifications must work as one system.' },
  { chapter: '2', objective: 'Identify packaging roles', question: 'What is secondary packaging?', application: 'Cases, trays, and shrink wrap group bottles for handling. What category are they?', correct: 'Material grouping units for handling and transport', wrong: ['The liquid recipe', 'The consumer payment', 'The brand trademark'], explanation: 'Secondary packs group primary containers.' },
  { chapter: '3', objective: 'Distinguish supply risks', question: 'Which is a continuity risk rather than only a price risk?', application: 'A sole approved supplier cannot deliver a critical closure. What type of issue is this?', correct: 'The input is unavailable when needed', wrong: ['A media campaign underperforms', 'A retailer changes shelf layout', 'Consumers prefer another flavor'], explanation: 'Continuity risk concerns the ability to obtain the input.' },
  { chapter: '3', objective: 'Match risk responses', question: 'What response most directly reduces single-supplier dependency?', application: 'A material has one approved source and high operational impact. What should procurement pursue?', correct: 'Qualify an alternative supplier', wrong: ['Increase television advertising', 'Reduce finished-goods labels', 'Remove batch records'], explanation: 'A qualified alternative reduces dependency where substitution is feasible.' },
  { chapter: '3', objective: 'Assess supplier power', question: 'When is supplier power likely to be highest?', application: 'Few firms can meet a proprietary specification and switching takes months. What does this imply?', correct: 'When qualified alternatives are scarce', wrong: ['When many equivalent suppliers compete', 'When the input is easy to substitute', 'When lead times are zero'], explanation: 'Scarcity of acceptable alternatives strengthens supplier leverage.' },
]);

const q23 = pairedQuiz('nab-23', [
  { chapter: '1', objective: 'Sequence manufacturing', question: 'What should happen before blending begins?', application: 'A batch is scheduled but materials are not yet confirmed. What is the next correct control?', correct: 'Verify approved inputs and the production order', wrong: ['Ship to retailers', 'Launch advertising', 'Collect consumer payment'], explanation: 'Manufacturing starts with approved materials and instructions.' },
  { chapter: '1', objective: 'Explain the concentrate model', question: 'What does a local bottler commonly add to concentrate?', application: 'A bottler receives the controlled flavor base. Which local inputs complete the drink where required?', correct: 'Treated water, sweetener, and carbon dioxide', wrong: ['Retail shelves and cash', 'Only labels', 'Only advertising'], explanation: 'The bottler converts concentrate and local inputs into finished product.' },
  { chapter: '1', objective: 'Differentiate processes', question: 'Do all beverages follow exactly the same processing sequence?', application: 'A carbonated drink and an aseptic tea share a plant. Should their process plans be identical?', correct: 'No, the required process depends on product and package', wrong: ['Yes, every beverage is identical', 'Yes, only the label changes', 'No, because quality control is optional'], explanation: 'Carbonation, pasteurization, and aseptic handling apply according to product needs.' },
  { chapter: '2', objective: 'Explain preventive quality', question: 'Why is end-only inspection insufficient?', application: 'A defect is discovered after an entire shift is produced. What would earlier process controls have improved?', correct: 'They can detect drift before large output is affected', wrong: ['They eliminate all records', 'They replace supplier approval', 'They guarantee sales growth'], explanation: 'Prevention and in-process detection limit risk and waste.' },
  { chapter: '2', objective: 'Identify quality gates', question: 'Which is a packaging quality check?', application: 'An operator tests whether a can seam protects the drink. What type of check is this?', correct: 'Closure or seam integrity', wrong: ['Consumer segmentation', 'Distributor credit', 'Brand awareness'], explanation: 'The package must remain sealed and compliant.' },
  { chapter: '2', objective: 'Explain traceability', question: 'What does batch coding support?', application: 'Quality must isolate the output connected to one ingredient lot. Which capability enables this?', correct: 'Tracing affected product and materials', wrong: ['Setting retail prices', 'Choosing a celebrity', 'Calculating market share'], explanation: 'Traceability links materials, process, and finished batches.' },
  { chapter: '2', objective: 'Explain product release', question: 'What does release mean?', application: 'Finished goods have passed required checks. What formal step allows distribution?', correct: 'Approval that finished goods may enter distribution', wrong: ['A retailer pays late', 'A supplier sends a quote', 'A campaign is designed'], explanation: 'Release is the quality authorization to distribute.' },
  { chapter: '3', objective: 'Connect capacity and service', question: 'What does capacity utilization measure?', application: 'A plant compares actual output with available production capability. Which metric is this?', correct: 'Actual output relative to available capacity', wrong: ['Retail share relative to competitors', 'Cash relative to debt', 'Ads relative to sales'], explanation: 'Capacity utilization indicates how fully production resources are used.' },
  { chapter: '3', objective: 'Explain changeover economics', question: 'Why can many SKUs reduce line efficiency?', application: 'A line repeatedly switches flavors and bottle sizes. What cost increases?', correct: 'Changeover time and complexity', wrong: ['Formula secrecy disappears', 'Retailers stop selling', 'Water becomes imported'], explanation: 'Switches consume setup time and can create material loss.' },
  { chapter: '3', objective: 'Balance operations', question: 'Why might maximum line utilization be a poor objective by itself?', application: 'A long run raises utilization but creates excess stock and delays other SKUs. What is missing?', correct: 'Demand, inventory, and service trade-offs', wrong: ['More packaging colors', 'Less traceability', 'Higher retailer credit'], explanation: 'End-to-end performance balances efficiency with service and inventory.' },
]);

const q24 = pairedQuiz('nab-24', [
  { chapter: '1', objective: 'Describe distribution layers', question: 'What is primary distribution?', application: 'A full truck moves pallets from the plant to a regional distributor. Which layer is this?', correct: 'Bulk movement from plant to a distribution point', wrong: ['Single-order delivery to a consumer', 'Shelf merchandising', 'Formula development'], explanation: 'Primary distribution positions bulk stock in the network.' },
  { chapter: '1', objective: 'Describe distribution layers', question: 'What is secondary distribution?', application: 'A distributor sends mixed cases to neighborhood stores. Which layer is this?', correct: 'Movement from distributor to trade outlets', wrong: ['Ingredient farming', 'Concentrate creation', 'Consumer research only'], explanation: 'Secondary distribution serves outlets from positioned stock.' },
  { chapter: '1', objective: 'Explain distributor value', question: 'What does break bulk mean?', application: 'A distributor splits a pallet into many store-sized orders. What service is being performed?', correct: 'Split large shipments into smaller orders', wrong: ['Blend concentrate with water', 'Create brand advertising', 'Set national regulations'], explanation: 'Breaking bulk makes efficient plant shipments usable by small outlets.' },
  { chapter: '2', objective: 'Compare channels', question: 'Which channel includes mom-and-pop shops?', application: 'A salesperson visits independent neighborhood stores. Which channel is this?', correct: 'General Trade', wrong: ['Only Modern Trade', 'Only foodservice', 'Only export'], explanation: 'General Trade covers fragmented independent outlets.' },
  { chapter: '2', objective: 'Compare channels', question: 'Which channel commonly uses centralized negotiation and structured data?', application: 'A supermarket chain negotiates nationally and sends scanner data. Which channel is this?', correct: 'Modern Trade', wrong: ['Agricultural supply', 'Contract manufacturing', 'Ingredient trading'], explanation: 'Organized chains are characteristic of Modern Trade.' },
  { chapter: '2', objective: 'Read Vietnam channel evidence', question: 'Can the cited 59.35%, 50.2%, and 29% figures be added together?', application: 'An analyst wants to total three channel statistics from different scopes. What should they do?', correct: 'No, they use different categories and definitions', wrong: ['Yes, they form one market total', 'Yes, because all are 2025 data', 'No, because percentages are never useful'], explanation: 'The figures refer to total retail, CSD revenue, and modern-trade development with differing scopes.' },
  { chapter: '2', objective: 'Explain digital channels', question: 'What distinguishes quick commerce?', application: 'A consumer orders one drink for rapid local delivery. Which channel model applies?', correct: 'Fast digital ordering fulfilled from nearby inventory', wrong: ['Ocean freight', 'Concentrate licensing', 'Farm procurement'], explanation: 'Quick commerce combines digital demand with local last-mile fulfillment.' },
  { chapter: '3', objective: 'Connect marketing and execution', question: 'What is the role of merchandising?', application: 'A field rep checks stock, price, display, and cooler condition. What activity is this?', correct: 'Execute availability, display, price, and promotion in outlet', wrong: ['Manufacture concentrate', 'Audit imported machinery', 'Treat plant water'], explanation: 'Merchandising turns a commercial plan into outlet reality.' },
  { chapter: '3', objective: 'Distinguish sell-in and sell-out', question: 'What is sell-out?', application: 'A bottle moves from a convenience store to the final shopper. Which measure records this?', correct: 'Sales from an outlet to consumers', wrong: ['Sales into a distributor', 'Purchase of ingredients', 'Factory depreciation'], explanation: 'Sell-out is the final consumer transaction.' },
  { chapter: '3', objective: 'Connect demand and availability', question: 'Why can strong advertising still fail to generate sales?', application: 'Consumers want the product but shelves are empty. What capability failed?', correct: 'Distribution and outlet execution', wrong: ['Formula secrecy', 'Water treatment only', 'Tax accounting only'], explanation: 'Preference converts only when the product is available and visible.' },
]);

const q25 = pairedQuiz('nab-25', [
  { chapter: '1', objective: 'Map stage inputs and outputs', question: 'Which is an output of a filling line besides finished cases?', application: 'A manager maps coded cases, test records, and wastewater. Which statement is correct?', correct: 'Quality records and waste streams are also outputs', wrong: ['Only revenue is an output', 'Only advertising is an output', 'There are no non-product outputs'], explanation: 'Processes produce information and waste as well as the main product.' },
  { chapter: '1', objective: 'Explain transformation', question: 'What makes an output valuable?', application: 'A warehouse receives damaged cases that cannot ship. Did the prior stage create a useful output?', correct: 'It meets the next stage’s requirements', wrong: ['It uses the cheapest input', 'It maximizes one machine speed', 'It creates the most paperwork'], explanation: 'Value is judged by usefulness to the next customer.' },
  { chapter: '1', objective: 'Avoid narrow optimization', question: 'Why is line speed alone an incomplete KPI?', application: 'Speed rises but defects and congestion increase. What should the team conclude?', correct: 'It ignores quality, inventory, and downstream effects', wrong: ['Speed can never be measured', 'Warehouses do not matter', 'Defects increase consumer demand'], explanation: 'Balanced performance considers the whole transformation.' },
  { chapter: '2', objective: 'Explain cost structure', question: 'What is the largest cited CSD cost block?', application: 'A case uses the research benchmark ranges. Which block should be tested first at 25–35%?', correct: 'Packaging', wrong: ['Water alone', 'Consumer research', 'Corporate tax'], explanation: 'Packaging is the largest block in the cited benchmark.' },
  { chapter: '2', objective: 'Interpret benchmark ranges', question: 'How should the cited cost ranges be used?', application: 'A candidate applies the same percentages to every company without adjustment. What is wrong?', correct: 'As hypotheses that require company-specific validation', wrong: ['As universal audited results', 'As consumer survey scores', 'As legal limits'], explanation: 'Category, package, scale, and geography can change the mix.' },
  { chapter: '2', objective: 'Compare operating models', question: 'Which operation commonly has higher revenue but lower gross margin?', application: 'A company owns finished-product plants and distribution rather than only concentrate. What pattern does Coca-Cola describe?', correct: 'Finished-product operations', wrong: ['Concentrate-only operations', 'Retail regulation', 'Supplier auditing'], explanation: 'Coca-Cola states that finished-product operations generate higher revenue but lower gross margin.' },
  { chapter: '2', objective: 'Explain profit pools', question: 'Why can brand and formulation capture strong economics?', application: 'A company owns scarce IP and consumer preference across many bottlers. What supports its profit pool?', correct: 'Valuable intangibles that scale across the system', wrong: ['More warehouse damage', 'Longer changeovers', 'Less distribution'], explanation: 'IP and brand can scale without the same finished-goods asset burden.' },
  { chapter: '3', objective: 'Explain competitive value', question: 'What do economies of scale do?', application: 'Volume rises while fixed plant and route resources are spread further. What happens?', correct: 'Lower average cost by spreading fixed resources', wrong: ['Guarantee premium pricing', 'Remove all competition', 'Eliminate quality controls'], explanation: 'Scale can reduce average cost but does not guarantee demand or differentiation.' },
  { chapter: '3', objective: 'Explain defensibility', question: 'Which combination is hardest to copy?', application: 'A rival can imitate a flavor but lacks brand, capacity, and outlet reach. What protects the leader?', correct: 'A system of brand, IP, operations, and distribution', wrong: ['One advertising slogan', 'One low-price promotion', 'One packaging color'], explanation: 'Connected capabilities create stronger defensibility than an isolated feature.' },
  { chapter: '3', objective: 'Connect capability flywheel', question: 'How can distribution depth reinforce brand value?', application: 'Consumers repeatedly find the product in the right place and condition. What effect follows?', correct: 'Availability converts preference into repeated purchase', wrong: ['It eliminates production planning', 'It replaces product quality', 'It removes all channel cost'], explanation: 'Reliable availability helps brand demand become sales and habit.' },
]);

const q26 = pairedQuiz('nab-26', [
  { chapter: '1', objective: 'Explain global chain design', question: 'Which capability is commonly centralized in the concentrate model?', application: 'A multinational protects one activity at the global center. Which is it?', correct: 'Formula and concentrate control', wrong: ['Every local retail visit', 'All local water transport', 'Every last-mile order'], explanation: 'Selected IP and standards are centralized.' },
  { chapter: '1', objective: 'Explain localization logic', question: 'Why is bottling often local?', application: 'A company wants to avoid long-distance transport of the heaviest ingredient. What should it localize?', correct: 'Production close to water and demand', wrong: ['The global trademark', 'All portfolio strategy', 'Every concentrate formula'], explanation: 'Local bottling reduces transport of water-heavy finished goods and improves market fit.' },
  { chapter: '1', objective: 'Explain coordination', question: 'How can a brand owner control outcomes without owning every bottler?', application: 'A partner operates the plant, but the brand needs consistency. Which mechanisms help?', correct: 'Specifications, authorization, audits, data, and agreements', wrong: ['No quality standards', 'Only consumer advertising', 'No information sharing'], explanation: 'Governance mechanisms coordinate quality and commercial outcomes.' },
  { chapter: '2', objective: 'Describe Vietnam production', question: 'Which investment is cited at USD 300 million?', application: 'A student reviews the Tay Ninh project. Which company built it?', correct: 'Suntory PepsiCo’s Tay Ninh plant', wrong: ['A neighborhood wholesaler', 'A sugar farm only', 'An e-commerce warehouse only'], explanation: 'The research cites Suntory PepsiCo’s USD 300 million Tay Ninh plant.' },
  { chapter: '2', objective: 'Describe Vietnam production', question: 'What is notable about Swire Coca-Cola’s Long An plant in the research?', application: 'Which project combines a USD 136 million investment with a cited green-building milestone?', correct: 'It is cited as Vietnam’s first F&B facility with LEED Gold', wrong: ['It produces only imported water', 'It removed all distribution partners', 'It is a retail-only project'], explanation: 'The research identifies the Long An facility and its LEED Gold distinction.' },
  { chapter: '2', objective: 'Connect capacity and distribution', question: 'Why is plant capacity alone insufficient?', application: 'A large plant produces efficiently but stores do not receive stock. What is missing?', correct: 'Route-to-market execution', wrong: ['More secret concentrate', 'Less demand information', 'No quality release'], explanation: 'Capacity creates value only when distribution converts output into availability.' },
  { chapter: '2', objective: 'Describe local players', question: 'Which company is the cited vertically integrated Vietnamese player?', application: 'Number 1, Dr Thanh, and Zero Degree belong to which producer?', correct: 'Tan Hiep Phat', wrong: ['URC only', 'OECD', 'International Aluminium Institute'], explanation: 'The research identifies Tan Hiep Phat as a major local producer.' },
  { chapter: '3', objective: 'Evaluate import dependencies', question: 'Which input is identified as an import dependency?', application: 'A can producer needs a material the research says is often imported. Which is it?', correct: 'Aluminum sheet', wrong: ['All local water', 'Every retail shelf', 'Consumer payment'], explanation: 'The research identifies aluminum sheet among imported dependencies.' },
  { chapter: '3', objective: 'Explain co-packing', question: 'What does co-packing allow a smaller brand to do?', application: 'A startup wants local production without building a plant. Which model fits?', correct: 'Rent contract manufacturing and packaging capacity', wrong: ['Avoid all food-safety rules', 'Own every distributor immediately', 'Eliminate working capital'], explanation: 'Co-packing provides production access without full plant investment.' },
  { chapter: '3', objective: 'Assess localization choices', question: 'What is the best description of localization?', application: 'A company keeps formula control global but adapts sourcing, packs, and channels in Vietnam. What is this?', correct: 'A selective portfolio of local and global activities', wrong: ['A requirement to source everything locally', 'A ban on global standards', 'Only a translation exercise'], explanation: 'Localization balances fit, cost, control, and resilience.' },
]);

export const NAB_MODULE02_QUIZZES: Record<string, NabModule02Question[]> = {
  'Value Chain Overview': q21,
  'Upstream Activities': q22,
  'Midstream Activities': q23,
  'Downstream Activities': q24,
  'Inputs, Outputs & Value Creation': q25,
  'Global vs. Local Value Chain': q26,
};

export const NAB_MODULE02_TAKEAWAYS: Record<string, NabModule02Takeaways> = {
  'Value Chain Overview': { learned: 'You can now map the beverage chain, identify who creates value, and distinguish the four flows that coordinate it.', keyTakeaways: ['Upstream supplies inputs; midstream converts; downstream reaches demand.', 'Brand owners, bottlers, distributors, and retailers create different value.', 'Products, services, money, and information move in different directions.', 'A flow map helps locate business problems and responsible functions.'], businessImplications: 'Companies improve performance by coordinating decisions across stages instead of optimizing one block in isolation.', remember: 'Product forward, money back, information both ways.', nextLesson: 'Upstream Activities' },
  'Upstream Activities': { learned: 'You can now explain ingredient and packaging sourcing, equipment dependencies, cost exposure, and targeted supply-risk responses.', keyTakeaways: ['Water dominates volume; packaging is a major cost block.', 'Supplier quality and continuity belong in total cost.', 'Equipment and pack choices form one production system.', 'Risk responses must match price, continuity, quality, or climate exposure.'], businessImplications: 'Procurement creates value through total-system economics and resilience, not simply the lowest quote.', remember: 'Buy the reliable system outcome, not only the cheapest unit.', nextLesson: 'Midstream Activities' },
  'Midstream Activities': { learned: 'You can now follow manufacturing, explain preventive quality, and connect factory choices with warehousing and delivery.', keyTakeaways: ['Recipes become products through controlled processing and filling.', 'Quality is built into every stage and supported by traceability.', 'SKU variety creates changeover and inventory complexity.', 'End-to-end service matters more than line speed alone.'], businessImplications: 'Operations leaders balance safety, quality, cost, capacity, inventory, and service at the same time.', remember: 'A fast line is useful only when it makes the right product safely and the network can deliver it.', nextLesson: 'Downstream Activities' },
  'Downstream Activities': { learned: 'You can now compare route layers and channels and explain how marketing and execution combine to create a sale.', keyTakeaways: ['Primary, secondary, and last-mile routes solve different movement problems.', 'Vietnam remains highly dependent on traditional trade.', 'Modern, foodservice, and digital channels need tailored execution.', 'Brand demand must meet availability, visibility, and delivery.'], businessImplications: 'Commercial advantage comes from repeatable execution across many outlets and channels, not advertising alone.', remember: 'Demand is valuable only when the product is purchasable.', nextLesson: 'Inputs, Outputs & Value Creation' },
  'Inputs, Outputs & Value Creation': { learned: 'You can now map transformations, read indicative cost structures, compare operating models, and identify defensible value levers.', keyTakeaways: ['Each stage creates outputs for a next customer.', 'Packaging is the largest cited CSD cost block.', 'Concentrate and finished-product economics should not be compared without context.', 'Scale, brand, IP, operations, and distribution reinforce one another.'], businessImplications: 'Strategy should target the system capabilities that improve both consumer value and economic capture.', remember: 'The liquid is only one part of the cost; the business system is the advantage.', nextLesson: 'Global vs. Local Value Chain' },
  'Global vs. Local Value Chain': { learned: 'You can now explain the global concentrate model, Vietnam’s production and distribution network, and selective localization.', keyTakeaways: ['Global systems centralize selected IP and standards.', 'Bottling and route to market benefit from local proximity.', 'Vietnam combines major plant investment with fragmented retail reach.', 'Local production can still depend on imported materials and machinery.'], businessImplications: 'Companies must design a deliberate mix of global control, local adaptation, and diversified dependencies.', remember: 'Local versus global is not a binary choice; it is a value-chain design decision.', nextLesson: 'Module 03 · Business Models & Economics' },
};
