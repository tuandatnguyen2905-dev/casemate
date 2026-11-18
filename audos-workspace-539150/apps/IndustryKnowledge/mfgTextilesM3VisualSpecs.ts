import type { MfgTextilesChapterVisual } from './mfgTextilesVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Textiles & Apparel Manufacturing Module 03, keyed by visualKind. */
export const MFG_TEXTILES_M3_VISUALS: Record<string, MfgTextilesChapterVisual> = {
  'mfg-textiles-m3-1': {
    heading: 'In contract manufacturing the factory is paid to convert buyer inputs to the buyer’s specification',
    intro: 'Factories convert buyer designs and inputs into garments. In CMT the factory mainly cuts, sews and finishes on buyer-controlled inputs, so quality against the specification is what it sells.',
    spec: {
      layout: 'flow', title: '01 How Do Textile and Garment Manufacturers Make Money?', kicker: '',
      steps: [
        { label: 'Design and specifications', detail: 'Buyer sets the style, fit and quality requirements', owner: 'Buyer' },
        { label: 'Buyer-controlled inputs', detail: 'Fabric and materials supplied under the buyer’s control', owner: 'Buyer' },
        { label: 'Cut, make, trim', detail: 'Cutting, sewing and finishing on the factory’s lines', owner: 'Factory' },
        { label: 'Quality against specification', detail: 'Output must meet the buyer’s specifications', kind: 'decision', owner: 'Factory and buyer' },
        { label: 'Conversion fee', detail: 'Revenue for labor and capacity rather than materials', kind: 'outcome', owner: 'Factory' },
      ],
      loop: 'Meeting specifications earns repeat orders, but pricing power stays limited when competition centers on labor and capacity.',
      note: 'An OEM supplier goes further: it sources approved materials and delivers finished goods. ILO recommends gradual movement from CMT toward FOB and higher-value activities.',
      takeaway: 'Contract manufacturing provides demand access but limits pricing power when competition centers on labor and capacity.',
    },
  },
  'mfg-textiles-m3-2': {
    heading: 'CMT and full-package models put design, materials, inventory and working capital with different parties',
    intro: 'CMT mainly monetizes cutting, sewing and finishing on buyer-controlled inputs. OEM or full-package/FOB sourcing can add approved material procurement and finished-goods delivery, subject to the actual contract.',
    spec: {
      layout: 'compare', title: '02 How Do CMT, OEM and Full-Package Models Differ?', kicker: '',
      leftTitle: 'CMT (Cut-Make-Trim)', rightTitle: 'OEM / full-package (FOB sourcing model)',
      rows: [
        { label: 'Buyer design', a: 'Factory works to the buyer’s design', b: 'Production to the buyer’s design' },
        { label: 'Material procurement', a: 'Factory receives buyer fabric', b: 'Supplier buys approved fabric and trims' },
        { label: 'What the factory sells', a: 'Cutting, sewing and finishing', b: 'Finished garments delivered under contract' },
        { label: 'Inventory risk', a: 'Materials stay with the buyer', b: 'Supplier carries materials and work in process' },
        { label: 'Working capital', a: 'Mainly labor and overhead', b: 'Also funds approved materials' },
      ],
      note: 'The industry’s FOB sourcing label is not automatically identical to the Incoterms FOB delivery rule. Document who owns design, materials, work in process, export obligations, defects, price risk and working capital.',
      takeaway: 'CMT, OEM and the FOB sourcing label allocate design, materials, inventory, quality and commercial risk differently.',
    },
  },
  'mfg-textiles-m3-3': {
    heading: 'Each step beyond assembly adds a capability and a matching responsibility',
    intro: 'ODM adds product design or development, OBM owns and markets a brand, and vertical integration controls several material and manufacturing stages. Each adds capability and risk beyond assembly.',
    spec: {
      layout: 'table', title: '03 How Do ODM, OBM and Vertically Integrated Models Compare?', kicker: '',
      headers: ['Model', 'Capability added beyond assembly', 'Responsibility and risk taken on'],
      rows: [
        { label: 'ODM', a: 'Product development: proposes styles and fabrics', b: 'Design effort before an order is confirmed' },
        { label: 'OBM', a: 'Brand ownership and marketing', b: 'Demand generation, pricing and channel risk' },
        { label: 'Vertical integration', a: 'Controls several material and manufacturing stages', b: 'Capital and inventory across those stages' },
      ],
      note: 'Build merchandising, development, sourcing, finance, governance and market capabilities before assuming higher-value roles.',
      takeaway: 'Moving up the value chain can improve differentiation while increasing design, sourcing, capital, inventory, customer and market responsibility.',
    },
  },
  'mfg-textiles-m3-4': {
    heading: 'Basics, sportswear and home textiles are separate segments a factory must be equipped for',
    intro: 'Product segments differ in material, fit, construction, performance, equipment and quality requirements. Factories should choose categories that match their equipment, skills, materials, testing and buyers.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Textile and Apparel Products Segmented?', kicker: '',
      root: 'Textile and apparel product segments', rootDetail: 'Each segment has its own material, fit, construction, performance, equipment and quality requirements',
      groups: [
        { label: 'Basics', detail: 'Staple garments such as basic T-shirts' },
        { label: 'Sportswear', detail: 'Performance requirements shape material and construction' },
        { label: 'Home textiles', detail: 'Textile products outside apparel' },
        { label: 'Fit to the factory', items: ['Factory equipment', 'Workforce skill', 'Material access', 'Testing', 'Buyer relationships'] },
      ],
      note: 'Specialization builds capability but concentrates exposure to selected customers and demand cycles.',
      takeaway: 'Specialization improves capability while increasing exposure to selected customers and demand cycles.',
    },
  },
  'mfg-textiles-m3-5': {
    heading: 'Fashion, workwear and technical products must be benchmarked against their own requirements',
    intro: 'Fashion apparel, workwear and technical textiles differ in material, fit, construction, performance, equipment and quality. Technical outerwear cannot be benchmarked fairly against basic T-shirts using labor cost alone.',
    spec: {
      layout: 'table', title: '05 How Do Knitwear, Wovens, Basics and Technical Garments Differ?', kicker: '',
      headers: ['Segment', 'Requirements that dominate', 'Fair comparison'],
      rows: [
        { label: 'Fashion apparel', a: 'Style, fit and material changes', b: 'Against similar fashion styles' },
        { label: 'Workwear', a: 'Construction and durability', b: 'Against comparable workwear' },
        { label: 'Technical textiles', a: 'Performance, equipment and testing', b: 'Against comparable technical products' },
      ],
      note: 'Example: technical outerwear cannot be benchmarked fairly against basic T-shirts using labor cost alone.',
      takeaway: 'Specialization improves capability while increasing exposure to selected customers and demand cycles.',
    },
  },
  'mfg-textiles-m3-6': {
    heading: 'Development services turn a buyer concept into a production-ready product',
    intro: 'Development services turn buyer concepts into production-ready products through prototypes, fit, patterns, material selection, construction methods and test coordination.',
    spec: {
      layout: 'flow', title: '06 How Do Product Development and Manufacturing Services Add Value?', kicker: '',
      steps: [
        { label: 'Buyer concept', detail: 'The idea the supplier must make producible', owner: 'Buyer' },
        { label: 'Sampling', detail: 'Prototypes to agree fit and appearance', owner: 'Supplier' },
        { label: 'Patterns and grading', detail: 'Patterns graded across sizes', owner: 'Supplier' },
        { label: 'Fabric sourcing', detail: 'Material selection for the product', owner: 'Supplier' },
        { label: 'Technical development', detail: 'Construction methods for production', owner: 'Supplier' },
        { label: 'Testing and packaging', detail: 'Test coordination and packaging specification', owner: 'Supplier' },
        { label: 'Production-ready product', kind: 'outcome', owner: 'Buyer and supplier' },
      ],
      loop: 'Combining digital patterns, fit knowledge and manufacturability feedback reduces sample rounds.',
      note: 'Experienced technical teams can improve conversion, lead time and order retention with relatively asset-light capability.',
      takeaway: 'Development services move suppliers earlier in the product lifecycle and reduce price-only competition.',
    },
  },
  'mfg-textiles-m3-7': {
    heading: 'What a buyer purchases is a bundle of six requirements, weighted differently by each buyer type',
    intro: 'Mass, fashion, online-first, premium and wholesale customers differ in order size, launch rhythm and replenishment needs. Each weighs cost, quality, delivery, flexibility, compliance and forecast visibility differently.',
    spec: {
      layout: 'driverTree', title: '07 Who Purchases Textile and Apparel Manufacturing Services?', kicker: '',
      root: { label: 'Buyer relationship', detail: 'Confidence that the supplier can deliver the order' },
      drivers: [
        { label: 'Target cost', detail: 'The price the program can carry', op: '+' },
        { label: 'Quality', detail: 'Product meets the buyer’s requirements', op: '+' },
        { label: 'Delivery', detail: 'Shipments arrive when promised', op: '+' },
        { label: 'Flexibility', detail: 'Smaller tests and rapid replenishment', op: '+' },
        { label: 'Compliance', detail: 'Confidence in supplier governance', op: '+' },
        { label: 'Forecast visibility', detail: 'Volume consistency the factory can plan around', op: '+' },
      ],
      note: 'An online-first brand may value smaller tests and rapid replenishment while a mass retailer emphasizes volume consistency. Segment account economics by development effort, order stability, margin, capacity fit, payment terms and risk.',
      takeaway: 'Buyer relationships combine price, quality, delivery, adaptability and confidence in supplier governance.',
    },
  },
  'mfg-textiles-m3-8': {
    heading: 'Specialized customers buy performance, durability and repeatable supply',
    intro: 'Sportswear, uniforms, industrial workwear, healthcare, hospitality and outdoor products carry functional requirements. These customers value technical evidence and reliability more than the lowest price.',
    spec: {
      layout: 'taxonomy', title: '08 How Do Brands, Retailers, Buying Offices and Sourcing Firms Differ?', kicker: '',
      root: 'Specialized customers and what they value', rootDetail: 'Functional requirements, not lowest price',
      groups: [
        { label: 'Customer segments', items: ['Sportswear', 'Uniforms', 'Industrial workwear', 'Healthcare', 'Hospitality', 'Outdoor products'] },
        { label: 'Performance fabrics', detail: 'Approved materials that meet functional requirements' },
        { label: 'Durability', detail: 'Skilled sewing and controlled processes' },
        { label: 'Repeat supply', detail: 'Disciplined documentation so re-orders match' },
      ],
      note: 'A protective garment claim needs applicable material, construction and test evidence, not marketing language alone.',
      takeaway: 'Specialized customers value technical evidence and reliability more than the lowest price.',
    },
  },
  'mfg-textiles-m3-9': {
    heading: 'A functional claim wins selection only when evidence backs it',
    intro: 'Customers with functional requirements select suppliers on technical evidence and reliability. A protective garment claim needs applicable material, construction and test evidence, not marketing language alone.',
    spec: {
      layout: 'decision', title: '09 How Do Price, Quality, Compliance, Lead Time and Reliability Shape Selection?', kicker: '',
      root: { label: 'Protective or ergonomic claim', detail: 'Made for a garment a specialized customer is selecting' },
      question: 'Is the claim backed by applicable material, construction and test evidence?',
      branches: [
        { condition: 'Evidence complete', outcome: 'Supplier competes on reliability', detail: 'Approved materials, controlled process and test records', tone: 'positive' },
        { condition: 'Evidence partial', outcome: 'Test before approval', detail: 'e.g. ergonomics or fit not yet validated', tone: 'caution' },
        { condition: 'Marketing language only', outcome: 'Claim not supported', detail: 'Lowest price does not compensate', tone: 'negative' },
      ],
      note: 'Technical segments require approved materials, skilled sewing, controlled processes, tests and disciplined documentation.',
      takeaway: 'Specialized customers value technical evidence and reliability more than the lowest price.',
    },
  },
  'mfg-textiles-m3-10': {
    heading: 'Hypothetical: how a USD12 garment price splits into cost and a USD2.50 contribution',
    intro: 'Revenue can come from CMT fees, full-package garments, fabric, finishing, sampling or development. This hypothetical garment shows how material ownership turns a selling price into cost and contribution.',
    spec: {
      layout: 'waterfall', title: '10 How Do Textile and Garment Manufacturers Generate Revenue?', kicker: '',
      unit: 'USD per garment', basis: `${H} — one garment; tax, freight and working capital not included`,
      items: [
        { label: 'Selling price', value: 12, kind: 'start' },
        { label: 'Fabric', value: 5, kind: 'subtract' },
        { label: 'Trims', value: 1, kind: 'subtract' },
        { label: 'Labor', value: 2, kind: 'subtract' },
        { label: 'Overhead', value: 1.5, kind: 'subtract' },
        { label: 'Contribution', value: 2.5, kind: 'total' },
      ],
      note: `${H}. Cost = 5 + 1 + 2 + 1.50 = USD9.50; contribution = 12 − 9.50 = USD2.50, a 20.8% margin. Not a Vietnamese average. Under CMT the fabric would not be in the factory’s revenue or cost.`,
      takeaway: 'Gross order value, revenue, cash and margin depend on material ownership and contract terms.',
    },
  },
  'mfg-textiles-m3-11': {
    heading: 'Hypothetical: line efficiency is accepted output in standard minutes divided by available operator minutes',
    intro: 'Profitability reflects labor minutes alongside materials, overhead and order mix. Move the sliders to see how SMV, operators, shift minutes and accepted pieces change line efficiency.',
    spec: {
      layout: 'scenario', title: '11 What Determines Garment Manufacturing Costs and Profitability?', kicker: '',
      inputs: [
        { key: 'smv', label: 'SMV per garment', min: 15, max: 25, step: 1, value: 20, unit: 'min' },
        { key: 'operators', label: 'Operators on the line', min: 25, max: 35, step: 1, value: 30, unit: 'operators' },
        { key: 'minutes', label: 'Available minutes per operator', min: 420, max: 540, step: 30, value: 480, unit: 'min' },
        { key: 'pieces', label: 'Accepted pieces', min: 500, max: 700, step: 10, value: 600, unit: 'pcs' },
      ],
      outputs: [
        { label: 'Earned minutes', unit: 'min', digits: 0, compute: (v) => v.pieces * v.smv },
        { label: 'Available minutes', unit: 'min', digits: 0, compute: (v) => v.operators * v.minutes },
        { label: 'Line efficiency', unit: '%', digits: 1, compute: (v) => (v.pieces * v.smv) / (v.operators * v.minutes) * 100 },
      ],
      assumption: `${H}. Defaults: 600 × 20 = 12,000 earned minutes; 30 × 480 = 14,400 available; efficiency 83.3%. Illustrative inputs, not market data.`,
      note: 'Use accepted output and state the SMV/SAM convention. Define product complexity, learning curve, breaks and operators before benchmarking.',
      takeaway: 'Profitability reflects material consumption, trims, labor minutes, overhead, quality, logistics, financing and order mix.',
    },
  },
  'mfg-textiles-m3-12': {
    heading: 'Hypothetical: a fabric price rise and rework cost erode contribution when the selling price is fixed',
    intro: 'KPIs only compare when products, methods and periods align. This hypothetical shows how a fabric cost increase and rework move contribution from USD2.50 to USD1.70.',
    spec: {
      layout: 'scenario', title: '12 Which KPIs Drive Textile and Garment Performance?', kicker: '',
      inputs: [
        { key: 'price', label: 'Selling price', min: 10, max: 14, step: 0.5, value: 12, unit: 'USD' },
        { key: 'rise', label: 'Fabric cost increase', min: 0, max: 30, step: 1, value: 10, unit: '%' },
        { key: 'rework', label: 'Rework cost', min: 0, max: 1, step: 0.1, value: 0.3, unit: 'USD' },
      ],
      outputs: [
        { label: 'Fabric cost', unit: 'USD', digits: 2, compute: (v) => 5 * (1 + v.rise / 100) },
        { label: 'Contribution before rework', unit: 'USD', digits: 2, compute: (v) => v.price - 5 * (1 + v.rise / 100) - 4.5 },
        { label: 'Contribution after rework', unit: 'USD', digits: 2, compute: (v) => v.price - 5 * (1 + v.rise / 100) - 4.5 - v.rework },
        { label: 'Margin after rework', unit: '%', digits: 1, compute: (v) => (v.price - 5 * (1 + v.rise / 100) - 4.5 - v.rework) / v.price * 100 },
      ],
      assumption: `${H}. USD5 fabric plus USD4.50 trims, labor and overhead. Defaults: 5 × 10% = 0.50 more fabric cost, contribution 2.50 → 2.00, then 2.00 − 0.30 rework = USD1.70.`,
      note: 'Line efficiency differs from labor or machine utilization, accepted output from production, and factory efficiency from profitability. Define numerator, denominator, style, size mix and cost scope before comparing.',
      takeaway: 'KPIs require aligned products, methods and periods, and factory efficiency is not the same as profitability.',
    },
  },
  'mfg-textiles-m3-13': {
    heading: 'Orders reach a factory by alternative routes, then depend on account management',
    intro: 'Manufacturers sell through direct brand and retail teams, agents, buying houses, traders and export intermediaries. The route shapes forecast visibility, price and planning.',
    spec: {
      layout: 'pathway', title: '13 How Do Manufacturers Acquire Buyers and Orders?', kicker: '',
      trunk: [
        { label: 'Factory capability', detail: 'Merchandising, development and compliance on offer' },
      ],
      optionsLabel: 'Routes to buyers — alternatives, not steps',
      options: [
        { label: 'Direct sourcing', detail: 'Brand and retail sourcing teams buy directly' },
        { label: 'Agents and buying houses', detail: 'Access and coordination, with added cost and distance' },
        { label: 'Trading companies', detail: 'Traders and export intermediaries place the order' },
      ],
      afterLabel: 'Once orders flow',
      after: [
        { label: 'Account management', detail: 'Communication and development deepen the relationship', kind: 'outcome' },
      ],
      note: 'A buying house can provide access and coordination but inserts cost and distance from final buyer decisions.',
      takeaway: 'Customer access influences forecast visibility, price, planning and long-term growth.',
    },
  },
  'mfg-textiles-m3-14': {
    heading: 'A buying house brings access but keeps the factory further from the buyer',
    intro: 'Buying houses and sourcing agents connect factories with buyers. They provide access and coordination but insert cost and distance from final buyer decisions.',
    spec: {
      layout: 'compare', title: '14 How Do Sourcing Agents, Buying Offices and Supplier Qualification Work?', kicker: '',
      leftTitle: 'Order through a buying house', rightTitle: 'Direct buyer relationship',
      rows: [
        { label: 'Access', a: 'Intermediary brings the buyer', b: 'Factory reaches brand or retail teams' },
        { label: 'Coordination', a: 'Intermediary coordinates the order', b: 'Factory merchandising coordinates' },
        { label: 'Cost', a: 'Intermediary inserts cost', b: 'No intermediary layer' },
        { label: 'Qualification', a: 'Factory qualified through the intermediary', b: 'Factory qualifies with the buyer' },
        { label: 'Customer ownership', a: 'Relationship sits with the intermediary', b: 'Relationship sits with the factory' },
      ],
      note: 'Invest in merchandising, product development, communication and compliance to deepen direct relationships.',
      takeaway: 'Customer access influences forecast visibility, price, planning and long-term growth.',
    },
  },
  'mfg-textiles-m3-15': {
    heading: 'Shared digital information strengthens direct buyer relationships only when the data is good',
    intro: 'Systems for capabilities, approvals, materials, work in process, defects, milestones, documents and shipment readiness connect factory and buyer. A dashboard is useful only when shop-floor transactions are timely and exceptions trigger action.',
    spec: {
      layout: 'driverTree', title: '15 How Do Direct Relationships and Long-Term Contracts Support Growth?', kicker: '',
      root: { label: 'Stronger direct relationship', detail: 'Accurate information improves production and buyer decisions' },
      formula: 'Value = information shared × data quality',
      drivers: [
        { label: 'Supplier discovery', detail: 'Buyers can find capabilities and approvals', op: '+' },
        { label: '3D sampling', detail: 'Development approvals move faster', op: '+' },
        { label: 'Production dashboards', detail: 'Work in process, defects and milestones visible', op: '+' },
        { label: 'Buyer portals', detail: 'Documents and shipment readiness shared', op: '+' },
        { label: 'Integrated planning', detail: 'Materials, line balance and quality aligned', op: '+' },
        { label: 'Data quality', detail: 'Timely shop-floor transactions; without it the rest fails', op: '×' },
      ],
      note: 'Prioritize practical visibility for planning, line balance, quality, material arrival and buyer communication.',
      takeaway: 'Digitalization creates value when accurate information improves production and buyer decisions.',
    },
  },
  'mfg-textiles-m3-16': {
    heading: 'The textile and apparel ecosystem spans the production chain, commercial actors, services and institutions',
    intro: 'Participants include materials suppliers, processors, manufacturers, agents, buyers, laboratories, logistics, associations, schools, finance and government. Gaps in any group can constrain the whole chain.',
    spec: {
      layout: 'taxonomy', title: '16 Who Participates in the Textile and Apparel Ecosystem?', kicker: '',
      root: 'Ecosystem participants', rootDetail: 'Groups of roles, not a sequence',
      groups: [
        { label: 'Production chain', items: ['Fiber suppliers', 'Processors', 'Garment factories'] },
        { label: 'Commercial', items: ['Agents', 'Buyers'] },
        { label: 'Services', items: ['Logistics', 'Laboratories', 'Finance'] },
        { label: 'Institutions', items: ['Associations', 'Schools', 'Government'] },
      ],
      note: 'Local linkage gaps in materials, skills, laboratories or environmental infrastructure can constrain the whole chain.',
      takeaway: 'Competitiveness depends on the collective supplier and support ecosystem.',
    },
  },
  'mfg-textiles-m3-17': {
    heading: 'One garment order ties mills, accessory suppliers, factory lines, inspectors, forwarders and buyer teams together',
    intro: 'A garment order links approved mills, trim suppliers, factory lines, inspectors, forwarders and buyer teams. Each moves product, money, information or oversight around the order.',
    spec: {
      layout: 'ecosystem', title: '17 How Do Mills, Factories, Brands, Logistics and Finance Collaborate?', kicker: '',
      center: { label: 'A garment order', detail: 'Produced on the factory’s lines' },
      actors: [
        { label: 'Approved mills', relation: 'Supply the fabric', flows: ['product'] },
        { label: 'Accessory and trim suppliers', relation: 'Supply trims and accessories', flows: ['product'] },
        { label: 'Brand buyer teams', relation: 'Set requirements and pay', flows: ['money', 'information'] },
        { label: 'Inspectors', relation: 'Check quality before shipment', flows: ['oversight'] },
        { label: 'Forwarders', relation: 'Move the finished goods', flows: ['product', 'service'] },
        { label: 'Finance and institutions', relation: 'Fund and support the chain', flows: ['money', 'service'] },
      ],
      note: 'Local linkage gaps in materials, skills, laboratories or environmental infrastructure can constrain the whole chain.',
      takeaway: 'Competitiveness depends on the collective supplier and support ecosystem.',
    },
  },
  'mfg-textiles-m3-18': {
    heading: 'Each partnership type supports a different part of a manufacturer’s upgrading',
    intro: 'Partnerships cover machinery, digital systems, materials, buyer qualification, workforce, wastewater, energy and logistics. They accelerate upgrading when tied to measurable customer and operating needs.',
    spec: {
      layout: 'table', title: '18 How Do Standards, Inspection, Associations and Regulators Shape Delivery?', kicker: '',
      headers: ['Partnership', 'What it supports', 'Upgrading link'],
      rows: [
        { label: 'Technology partners', a: 'Machinery and digital systems', b: 'Productivity and visibility' },
        { label: 'Buyer programs', a: 'Buyer qualification', b: 'Productivity, quality and compliance tied to repeat orders' },
        { label: 'Training', a: 'Workforce skills', b: 'Business-training links and inclusive reskilling' },
        { label: 'Research', a: 'Materials', b: 'Domestic value-chain development' },
        { label: 'Infrastructure', a: 'Wastewater, energy and logistics', b: 'Shared operating needs' },
        { label: 'Finance', a: 'Funding for coordinated investment', b: 'Upgrading tied to customer needs' },
      ],
      note: 'ILO emphasizes business-training links, a sector skills strategy, domestic value-chain development and inclusive reskilling.',
      takeaway: 'Coordinated investment accelerates upgrading when tied to measurable customer and operating needs.',
    },
  },
};
