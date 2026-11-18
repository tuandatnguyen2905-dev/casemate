import type { MfgTextilesChapterVisual } from './mfgTextilesVisualSpecs';

/** Chapter-specific Learning Visuals for Textiles & Apparel Manufacturing Module 04, keyed by visualKind. */
export const MFG_TEXTILES_M4_VISUALS: Record<string, MfgTextilesChapterVisual> = {
  'mfg-textiles-m4-1': {
    heading: 'Competition happens within separate segments, from material producers to niche specialists',
    intro: 'Fiber and material producers, mills, garment factories, integrated suppliers and technical or premium specialists compete in different ways. Each stage has its own barriers, costs and sources of advantage.',
    spec: {
      layout: 'taxonomy', title: '01 How Competitive Is Textiles & Apparel Manufacturing?', kicker: '',
      root: 'Competitive segments', rootDetail: 'Map competitors by process, product, buyer, integration, capacity, quality and delivery responsibility',
      groups: [
        { label: 'Fiber and material producers', detail: 'Compete on materials and processing' },
        { label: 'Mills', detail: 'Capital-intensive processes such as dyeing' },
        { label: 'Contract factories', detail: 'Labor-intensive garment production for buyers' },
        { label: 'Integrated groups', detail: 'Control several stages from material to garment' },
        { label: 'Niche producers', detail: 'Technical or premium specialists' },
      ],
      note: 'A capital-intensive dyeing mill and a labor-intensive garment factory should not be compared as one homogeneous business.',
      takeaway: 'Each value-chain stage has different barriers, costs and sources of advantage.',
    },
  },
  'mfg-textiles-m4-2': {
    heading: 'Apply the five forces to one stage at a time, because mills and garment factories face different pressures',
    intro: 'Porter’s Five Forces describe the pressures around a business. In textiles and apparel they must be read stage by stage, because each value-chain stage has different barriers, costs and sources of advantage.',
    spec: {
      layout: 'ecosystem', title: '02 How Do Porter\'s Five Forces Apply to Manufacturing?', kicker: '',
      center: { label: 'The stage being analysed', detail: 'e.g. a textile mill or a full-package garment supplier' },
      actors: [
        { label: 'Rivals in the same stage', relation: 'Who competes on the same process and product?', flows: ['risk'] },
        { label: 'Buyers', relation: 'How much can they press on price and terms?', flows: ['money'] },
        { label: 'Input suppliers', relation: 'How dependent is the stage on its materials?', flows: ['product'] },
        { label: 'New entrants', relation: 'How hard is it to enter this stage?', flows: ['risk'] },
        { label: 'Substitutes', relation: 'What other source or stage could replace it?', flows: ['risk'] },
      ],
      note: 'Stage economics differ: a capital-intensive dyeing mill and a labor-intensive garment factory should not be compared as one homogeneous business.',
      takeaway: 'Each value-chain stage has different barriers, costs and sources of advantage.',
    },
  },
  'mfg-textiles-m4-3': {
    heading: 'Six barriers decide how hard a textile or garment stage is to enter',
    intro: 'Barriers come from investment, process knowledge, workforce, tests, audits, operating records, utilities, wastewater, distribution and buyer trust. They are strongest in technically demanding stages.',
    spec: {
      layout: 'driverTree', title: '03 What Creates Scale, Capability and Buyer-Trust Barriers?', kicker: '',
      root: { label: 'Barrier to entry', detail: 'Stronger in technically demanding stages' },
      drivers: [
        { label: 'Capital', detail: 'Investment in equipment and utilities', op: '+' },
        { label: 'Technical capability', detail: 'Process knowledge and workforce skill', op: '+' },
        { label: 'Buyer qualification', detail: 'Tests and audits before approval', op: '+' },
        { label: 'Environmental compliance', detail: 'Wastewater and environmental infrastructure', op: '+' },
        { label: 'Operational reliability', detail: 'Operating records that show repeatable performance', op: '+' },
        { label: 'Customer access', detail: 'Distribution and buyer trust', op: '+' },
      ],
      note: 'Dyeing requires process and environmental infrastructure, while garment entry still needs trained labor, quality systems and buyer approval. A defensible niche needs more than low labor cost.',
      takeaway: 'Capital, qualification and compliance create stronger barriers in technically demanding stages.',
    },
  },
  'mfg-textiles-m4-4': {
    heading: 'Toray, Far Eastern New Century and Vardhman Textiles hold different material positions — not ranks',
    intro: 'Global material participants span fibers, polyester value chains, yarns, fabrics and functional materials. Each company named here occupies a distinct position, and the chapter does not rank them.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Textile and Apparel Manufacturers?', kicker: '',
      root: 'Material-side positions', rootDetail: 'Grouped by role; the order carries no meaning',
      groups: [
        { label: 'Fibers and functional materials', items: ['Toray'] },
        { label: 'Materials and textile production', items: ['Far Eastern New Century'] },
        { label: 'Yarn and fabric', items: ['Vardhman Textiles'] },
      ],
      note: 'Synthetic-fiber scale, yarn capability and integrated knit apparel are distinct positions, not one company ranking. Assess relevance by material, processing, customer application, geography and partnership potential.',
      takeaway: 'Material leaders compete through scale, technical depth, consistency and application fit.',
    },
  },
  'mfg-textiles-m4-5': {
    heading: 'Upstream, integrated and garment manufacturers cover different segment scopes, so compare each with its own peers',
    intro: 'Some participants work upstream in fibers and polyester value chains, others integrate knitwear manufacturing through to apparel. Segment scope decides who is a fair comparison.',
    spec: {
      layout: 'table', title: '05 How Do Upstream, Garment and Integrated Manufacturers Differ?', kicker: '',
      headers: ['Position', 'Segment scope', 'Compare with'],
      rows: [
        { label: 'Upstream materials', a: 'Fibers, polyester value chains, yarns and fabrics', b: 'Other material producers (e.g. Indorama Ventures)' },
        { label: 'Integrated knit apparel', a: 'Integrated knitwear and apparel manufacturing', b: 'Other integrated suppliers (e.g. Shenzhou International)' },
        { label: 'Garment manufacturing', a: 'Converting fabric into garments', b: 'Garment factories with a similar product mix' },
      ],
      note: 'Positions are distinct, not one company ranking. Assess supplier relevance by material, processing, customer application, geography and partnership potential.',
      takeaway: 'Material leaders compete through scale, technical depth, consistency and application fit.',
    },
  },
  'mfg-textiles-m4-6': {
    heading: 'Vietnam’s participants group by role and ownership, and are not ranked against each other',
    intro: 'Vietnam’s industry includes performance-apparel specialists, integrated textile-garment groups, and domestic and foreign-invested manufacturers. Eclat, Vinatex, Thanh Cong and Garment 10 serve different product mixes.',
    spec: {
      layout: 'taxonomy', title: '06 Which Domestic and FDI Participants Shape Vietnam\'s Industry?', kicker: '',
      root: 'Participants in Vietnam’s industry', rootDetail: 'Grouped by role; the order carries no meaning',
      groups: [
        { label: 'Performance fabric and apparel', items: ['Eclat Textile'] },
        { label: 'Textile-garment groups', detail: 'Group and integrated textile-garment context', items: ['Vinatex', 'Thanh Cong'] },
        { label: 'Apparel manufacturing', items: ['Garment 10'] },
        { label: 'By ownership', items: ['FDI factories', 'Domestic suppliers'] },
      ],
      note: 'These companies serve different product mixes and should not be ranked universally. Compare by actual product, integration, buyer base, capability, service and operating period.',
      takeaway: 'Scale matters, but development, integration, buyer relationships and execution determine order retention.',
    },
  },
  'mfg-textiles-m4-7': {
    heading: 'Each factory metric must be normalized for product complexity before factories are compared',
    intro: 'Factories are compared on labor hours, line efficiency, defects, rework, cutting waste, processing loss, cycle time and batch flexibility. Complex outerwear needs different labor content and quality controls than a basic T-shirt.',
    spec: {
      layout: 'table', title: '07 How Should Textile and Garment Manufacturers Be Compared?', kicker: '',
      headers: ['Metric', 'What it measures', 'Normalize by'],
      rows: [
        { label: 'Productivity', a: 'Labor hours, machine utilization, line efficiency', b: 'Style and operation' },
        { label: 'First-pass quality', a: 'Output meeting requirements without rework', b: 'Style and material' },
        { label: 'Material yield', a: 'Material converted into conforming output', b: 'Material' },
        { label: 'Lead time', a: 'Cycle time from order to shipment', b: 'Order size' },
        { label: 'Flexibility', a: 'Batch flexibility', b: 'Order size and learning curve' },
      ],
      note: 'Product complexity sits behind every row: complex outerwear requires different labor content and quality controls than a basic T-shirt.',
      takeaway: 'Benchmarking must adjust for material, product complexity and production stage.',
    },
  },
  'mfg-textiles-m4-8': {
    heading: 'A productive factory is still exposed if its customer portfolio, delivery or traceability is weak',
    intro: 'Commercial strength covers buyer concentration, market mix, order stability, margins, on-time shipment, audit status and transparency. It converts factory capability into stable customer relationships.',
    spec: {
      layout: 'decision', title: '08 How Do Capacity, Productivity, Quality and Lead Time Differ?', kicker: '',
      root: { label: 'A productive factory', detail: 'Capacity, productivity and quality in place' },
      question: 'Is its commercial position as strong as its operations?',
      branches: [
        { condition: 'Diverse portfolio, on-time delivery, traceable', outcome: 'Stable, profitable relationships', tone: 'positive' },
        { condition: 'One buyer dominates capacity', outcome: 'Vulnerable to that buyer’s decisions', tone: 'caution' },
        { condition: 'Compliance evidence unreliable', outcome: 'Orders at risk despite productivity', tone: 'negative' },
      ],
      note: 'Track contribution by account, repeat orders, forecasts, payment, delivery, audit closure and development conversion.',
      takeaway: 'Commercial strength converts factory capability into stable, profitable customer relationships.',
    },
  },
  'mfg-textiles-m4-9': {
    heading: 'Pricing, compliance and development services each create advantage and each needs its own tracking',
    intro: 'Advantage comes from buyer concentration, order stability, margins, audit status and value-added service. Track each capability by account so commercial strength is visible.',
    spec: {
      layout: 'table', title: '09 Which Sourcing, Development, Compliance and Customer Capabilities Create Advantage?', kicker: '',
      headers: ['Capability', 'What it earns', 'Track it with'],
      rows: [
        { label: 'Pricing', a: 'Margin that matches the account', b: 'Contribution by account' },
        { label: 'Compliance', a: 'Buyer confidence in the evidence', b: 'Audit closure' },
        { label: 'Development services', a: 'Value-added service beyond assembly', b: 'Development conversion' },
        { label: 'Account stability', a: 'Order stability across buyers', b: 'Repeat orders, forecasts and payment' },
      ],
      note: 'A productive factory remains vulnerable if one buyer dominates capacity or compliance evidence is unreliable.',
      takeaway: 'Commercial strength converts factory capability into stable, profitable customer relationships.',
    },
  },
  'mfg-textiles-m4-10': {
    heading: 'Delivery reliability is built order by order, from material control to shipment',
    intro: 'Productivity, quality and delivery depend on procurement, workflow, training, machine maintenance, in-process quality, realistic commitments and shipment control. Cost, quality and delivery must be optimized together.',
    spec: {
      layout: 'flow', title: '10 Why Do Productivity, Quality and Delivery Reliability Matter?', kicker: '',
      steps: [
        { label: 'Material control', detail: 'Procurement delivers the right materials on time', owner: 'Planning and purchasing' },
        { label: 'Line balance', detail: 'Workflow and training remove bottlenecks', owner: 'Production' },
        { label: 'In-process quality', detail: 'Defects caught on the line, not at the end', owner: 'Quality' },
        { label: 'Milestones', detail: 'Realistic commitments tracked against plan', kind: 'decision', owner: 'Merchandising' },
        { label: 'Shipment control', detail: 'On-time, conforming shipment', kind: 'outcome', owner: 'Factory' },
      ],
      loop: 'Daily management and early escalation protect seasonal delivery and buyer confidence.',
      note: 'Short-term overtime can recover schedule but may raise defects and labor cost if bottlenecks remain unresolved.',
      takeaway: 'Cost, quality and delivery must be optimized together.',
    },
  },
  'mfg-textiles-m4-11': {
    heading: 'Overtime can rescue one schedule; prevention and capacity planning protect every order',
    intro: 'Short-term overtime can recover schedule but may raise defects and labor cost if bottlenecks remain unresolved. Quality prevention and capacity planning protect on-time delivery instead.',
    spec: {
      layout: 'compare', title: '11 How Do Material Sourcing, Cost and Compliance Create Advantage?', kicker: '',
      leftTitle: 'Recover with short-term overtime', rightTitle: 'Prevent with planning and quality',
      rows: [
        { label: 'Schedule', a: 'Can recover in the short term', b: 'Capacity planned to realistic commitments' },
        { label: 'Bottlenecks', a: 'May remain unresolved', b: 'Found and fixed early' },
        { label: 'Defects', a: 'May rise', b: 'Prevented in process' },
        { label: 'Labor cost', a: 'May rise', b: 'Controlled by plan' },
        { label: 'On-time delivery', a: 'At risk while bottlenecks persist', b: 'Protected by early escalation' },
      ],
      note: 'Use daily management and early escalation to protect seasonal delivery and buyer confidence.',
      takeaway: 'Cost, quality and delivery must be optimized together.',
    },
  },
  'mfg-textiles-m4-12': {
    heading: 'An integration or capability investment builds buyer trust only if it really reduces buyer risk',
    intro: 'Strong suppliers coordinate mills, factories, accessories and logistics alongside product development, traceability, responsible production and skills. An integrated supplier shortens lead time only if internal handoffs are managed better than external sourcing.',
    spec: {
      layout: 'decision', title: '12 How Do Product Development, Technology and Buyer Trust Support Growth?', kicker: '',
      root: { label: 'Proposed investment', detail: 'e.g. integrated sourcing, material innovation, digital systems or workforce development' },
      question: 'Does it reduce buyer risk, backed by credible environmental and labor evidence?',
      branches: [
        { condition: 'Handoffs and capacity managed better', outcome: 'Shorter lead time and stronger trust', detail: 'Integration outperforms external sourcing', tone: 'positive' },
        { condition: 'Benefit not yet proven', outcome: 'Pilot before scaling', detail: 'Measure lead time and quality first', tone: 'caution' },
        { condition: 'Evidence not credible', outcome: 'Trust does not grow', detail: 'Environmental controls and social compliance must be auditable', tone: 'negative' },
      ],
      note: 'Invest where integration reduces buyer risk and where environmental and labor evidence is credible.',
      takeaway: 'Strong suppliers combine execution with sourcing, compliance and continuous capability development.',
    },
  },
  'mfg-textiles-m4-13': {
    heading: 'Broad recurring demand is a strength, but buyer power exposes basic production',
    intro: 'The industry’s strengths lie in manufacturing and relationships, its weaknesses in dependency and low-value models. Sportswear and technical textiles offer a route to differentiation.',
    spec: {
      layout: 'table', title: '13 What Are the Industry\'s Main Strengths and Weaknesses?', kicker: '',
      headers: ['Factor', 'SWOT position', 'What it means'],
      rows: [
        { label: 'Recurring demand', a: 'Strength', b: 'Demand for textiles and apparel is broad' },
        { label: 'Buyer power', a: 'Weakness', b: 'Basic production is exposed to price pressure' },
        { label: 'Low-value models', a: 'Weakness', b: 'Dependency on cost competition' },
        { label: 'Technical opportunity', a: 'Opportunity', b: 'Sportswear and technical textiles can differentiate' },
      ],
      note: 'Technical opportunities require material, development and test capability.',
      takeaway: 'Demand is broad, but basic production remains exposed to buyer power and cost competition.',
    },
  },
  'mfg-textiles-m4-14': {
    heading: 'Export experience, material dependency and trade threats sit in different SWOT quadrants',
    intro: 'Strengths come from manufacturing and relationships, weaknesses from dependency, opportunities from technical and integrated production, and threats from volatility and compliance failure.',
    spec: {
      layout: 'taxonomy', title: '14 What Opportunities and Threats Shape Textile and Garment Manufacturing?', kicker: '',
      root: 'Textile and garment SWOT', rootDetail: 'Four quadrants, read together',
      groups: [
        { label: 'Strengths', items: ['Export experience', 'Manufacturing relationships'] },
        { label: 'Weaknesses', items: ['Material dependency', 'Low-value models'] },
        { label: 'Opportunities', items: ['Technical production', 'Integrated production', 'Green production'] },
        { label: 'Threats', items: ['Trade threats', 'Volatility', 'Compliance failure'] },
      ],
      note: 'Use established export experience to deepen materials, product development, green production and market diversification.',
      takeaway: 'Demand is broad, but basic production remains exposed to buyer power and cost competition.',
    },
  },
  'mfg-textiles-m4-15': {
    heading: 'Each of six risk types needs its own control',
    intro: 'Risks include order reductions, delays, currencies, input prices, capacity, maintenance, quality, working conditions, chemicals, wastewater and traceability. A material delay can trigger idle labor, air freight, overtime and late shipment.',
    spec: {
      layout: 'table', title: '15 What Strategic Choices Must Manufacturers Make?', kicker: '',
      headers: ['Risk', 'Example exposure', 'Control'],
      rows: [
        { label: 'Demand risk', a: 'Order reductions', b: 'Order scenarios' },
        { label: 'Supply risk', a: 'Material delays and input prices', b: 'Alternative sources' },
        { label: 'Operational risk', a: 'Capacity, maintenance and quality', b: 'Milestone governance' },
        { label: 'Financial risk', a: 'Currencies', b: 'Cash planning' },
        { label: 'Labor risk', a: 'Working conditions', b: 'Safe work' },
        { label: 'Compliance risk', a: 'Chemicals, wastewater and traceability', b: 'Auditable environmental systems' },
      ],
      note: 'A material delay can trigger idle labor, air freight, overtime and late shipment, damaging margin and buyer trust.',
      takeaway: 'Resilience requires coordinated commercial, operational, financial and responsible-production controls.',
    },
  },
};
