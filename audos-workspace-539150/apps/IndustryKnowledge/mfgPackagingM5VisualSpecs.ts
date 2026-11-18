import type { MfgPackagingChapterVisual } from './mfgPackagingVisualSpecs';

/** Chapter-specific Learning Visuals for Packaging, Labels & Industrial Materials Module 05 (consumer, technology, market and channel, regulatory and sustainability trends, growth outlook), keyed by visualKind. */
export const MFG_PACKAGING_M5_VISUALS: Record<string, MfgPackagingChapterVisual> = {
  'mfg-packaging-m5-1': {
    heading: 'Packaging needs now cover both what the pack does and what it tells the user',
    intro: 'FMCG, healthcare and industrial buyers expect convenience and protection from the pack. They also expect clear information on labels, codes, materials and disposal.',
    spec: {
      layout: 'taxonomy', title: '01 How Are FMCG, Healthcare and Industrial Packaging Needs Changing?', kicker: '',
      root: 'What packaging is expected to deliver', rootDetail: 'Two families of need — both must work together',
      groups: [
        { label: 'Function', items: ['Easy opening', 'Dispensing', 'Product protection', 'Appearance'] },
        { label: 'Clear information', items: ['Readable labels', 'QR or security features', 'Material information', 'Disposal guidance'] },
      ],
      note: 'Balance convenience and branding with material efficiency, affordability, production fit and credible environmental claims.',
      takeaway: 'Packaging creates customer value through function and information, but claims require accurate data and practical systems.',
    },
  },
  'mfg-packaging-m5-2': {
    heading: 'Convenience, protection, premium look and digital identification each add customer value',
    intro: 'Protection and digital identification sit alongside convenience and appearance. A connected label extends information access only if the printed identity stays reliable.',
    spec: {
      layout: 'driverTree', title: '02 Why Are Convenience, Protection and Premium Experience Important?', kicker: '',
      root: { label: 'Customer value of the pack', detail: 'Why buyers pay attention to packaging' },
      drivers: [
        { label: 'Convenience', detail: 'Easier use', children: [{ label: 'Easy opening' }, { label: 'Dispensing' }] },
        { label: 'Protection', detail: 'Product arrives and stays intact' },
        { label: 'Premium experience', detail: 'Appearance and brand presentation' },
        { label: 'Digital identification', detail: 'Information beyond the printed pack', children: [{ label: 'QR codes' }, { label: 'Security features' }] },
      ],
      note: 'A connected label can extend information access, but the printed identity, data governance and customer usability must remain reliable.',
      takeaway: 'Packaging creates customer value through function and information, but claims require accurate data and practical systems.',
    },
  },
  'mfg-packaging-m5-3': {
    heading: 'Trust depends on whether a connected label or claim is backed by reliable data',
    intro: 'E-commerce and traceability put more information on the pack. Brand experience and responsible claims build trust only when data governance and usability hold up.',
    spec: {
      layout: 'decision', title: '03 How Are E-Commerce, Traceability and Trust Shaping Demand?', kicker: '',
      root: { label: 'Connected label or environmental claim', detail: 'Information offered to the buyer or consumer' },
      question: 'Is it backed by accurate data and a practical system?',
      branches: [
        { condition: 'Printed identity, data and usability reliable', outcome: 'Use it to build trust', detail: 'Supports brand experience', tone: 'positive' },
        { condition: 'Data incomplete or poorly governed', outcome: 'Fix data before launch', detail: 'Assign ownership of the information', tone: 'caution' },
        { condition: 'Claim not credible', outcome: 'Do not make the claim', detail: 'Responsible claims only', tone: 'negative' },
      ],
      note: 'Balance convenience and branding with material efficiency, affordability, production fit and credible environmental claims.',
      takeaway: 'Packaging creates customer value through function and information, but claims require accurate data and practical systems.',
    },
  },
  'mfg-packaging-m5-4': {
    heading: 'Adopt machine vision or new barrier materials only where a measurable case exists',
    intro: 'Automated inspection and new barrier materials are spreading. Each use case needs a clear baseline, operator skills, customer trials and scale economics.',
    spec: {
      layout: 'decision', title: '04 How Are Automation and Digital Quality Inspection Evolving?', kicker: '',
      root: { label: 'Candidate technology', detail: 'For example machine vision or a new barrier material' },
      question: 'Does it deliver measurable productivity, flexibility or functional performance?',
      branches: [
        { condition: 'Clear baseline and proven gain', outcome: 'Adopt and scale', detail: 'Skills and substrate available', tone: 'positive' },
        { condition: 'Promising but untested', outcome: 'Run customer trials first', detail: 'Measure against the baseline', tone: 'caution' },
        { condition: 'No measurable gain or poor scale economics', outcome: 'Do not invest yet', tone: 'negative' },
      ],
      note: 'Target use cases with clear baselines, substrate availability, operator skills, customer trials and scale economics.',
      takeaway: 'Technology should deliver measurable productivity, flexibility or functional performance across the lifecycle.',
    },
  },
  'mfg-packaging-m5-5': {
    heading: 'Digital printing, lightweighting and functional materials are separate technology tracks',
    intro: 'Variable print and digital workflows change how packs are printed. Simpler and recyclable structures, plus specialized adhesives, coatings, films and laminates, change what they are made of.',
    spec: {
      layout: 'taxonomy', title: '05 How Are Digital Printing, Smart Packaging and Traceability Developing?', kicker: '',
      root: 'Packaging technology tracks', rootDetail: 'Categories of development — not a sequence',
      groups: [
        { label: 'Digital printing', items: ['Variable print', 'Digital workflows'] },
        { label: 'Lightweighting', items: ['Simpler structures', 'Recyclable structures'] },
        { label: 'Functional materials', items: ['Specialized adhesives', 'Coatings', 'Films and laminates'] },
        { label: 'Smart operations', items: ['Automated inspection', 'Predictive maintenance'] },
      ],
      note: 'Replacing a multilayer with a simpler structure requires validation of shelf life, seal, print, line speed, transport and recovery.',
      takeaway: 'Technology should deliver measurable productivity, flexibility or functional performance across the lifecycle.',
    },
  },
  'mfg-packaging-m5-6': {
    heading: 'Production analytics and testing prove whether new materials perform across the lifecycle',
    intro: 'Advanced materials, industrial data and AI pay off only when results are measured. Production analytics tracks the plant, and testing validates the structure from shelf life to recovery.',
    spec: {
      layout: 'driverTree', title: '06 How Are Advanced Materials, Industrial Data and AI Being Applied?', kicker: '',
      root: { label: 'Measurable lifecycle performance', detail: 'Evidence that a technology or material works' },
      drivers: [
        { label: 'Production analytics', detail: 'Plant productivity', children: [{ label: 'Predictive maintenance' }, { label: 'Automated inspection data' }] },
        { label: 'Product testing', detail: 'Functional performance', children: [{ label: 'Shelf life' }, { label: 'Seal' }, { label: 'Print' }] },
        { label: 'Line and transport testing', detail: 'Works in the supply chain', children: [{ label: 'Line speed' }, { label: 'Transport' }] },
        { label: 'Recovery', detail: 'Works at end of life' },
      ],
      note: 'Target use cases with clear baselines, substrate availability, operator skills, customer trials and scale economics.',
      takeaway: 'Technology should deliver measurable productivity, flexibility or functional performance across the lifecycle.',
    },
  },
  'mfg-packaging-m5-7': {
    heading: 'Export partnerships link product design to local stock and technical response',
    intro: 'Localization and export supply need shipping protection and online procurement to connect. The chain runs from product design and export standards to documents, forecasts, stock and support.',
    spec: {
      layout: 'flow', title: '07 How Are Localization, Exports and Manufacturing Partnerships Evolving?', kicker: '',
      steps: [
        { label: 'Product design', detail: 'Shipping protection designed in' },
        { label: 'Export standards', detail: 'Specifications the destination requires' },
        { label: 'Electronic documents', detail: 'Online procurement and order records' },
        { label: 'Forecasts', detail: 'Shared planning with the customer' },
        { label: 'Local stock', detail: 'Supply close to factories' },
        { label: 'Technical response', detail: 'Reliable support when problems arise', kind: 'outcome' },
      ],
      note: 'Optimized transit packaging can reduce damage, freight cube and handling cost beyond the purchase price of the box.',
      takeaway: 'Packaging suppliers increasingly compete on total supply-chain efficiency and ease of doing business.',
    },
  },
  'mfg-packaging-m5-8': {
    heading: 'The real cost of transit packaging is more than the price of the box',
    intro: 'Transport efficiency and digital proofing change what customers compare. Damage, freight cube, handling and approval effort all sit on top of the purchase price.',
    spec: {
      layout: 'driverTree', title: '08 How Are Customer Consolidation and Channel Requirements Changing?', kicker: '',
      root: { label: 'Total supply-chain cost', detail: 'What the customer really pays for packaging' },
      formula: 'Box price + damage + freight + handling + ordering effort',
      drivers: [
        { label: 'Purchase price', detail: 'Price of the box itself' },
        { label: 'Damage', detail: 'Product lost or returned in transit' },
        { label: 'Freight cube', detail: 'Space the pack takes in transport' },
        { label: 'Handling cost', detail: 'Labour to pack and move goods' },
        { label: 'Ordering effort', detail: 'Ease of doing business', children: [{ label: 'Digital proofing' }, { label: 'Digital orders' }] },
      ],
      note: 'Optimized transit packaging can reduce damage, freight cube and handling cost beyond the purchase price of the box.',
      takeaway: 'Packaging suppliers increasingly compete on total supply-chain efficiency and ease of doing business.',
    },
  },
  'mfg-packaging-m5-9': {
    heading: 'Portfolios are widening across cartons, cushioning, labels and industrial materials',
    intro: 'Suppliers customize portfolios of cartons, mailers, cushioning, labels and industrial materials for distributed logistics and factories. Export specifications and forecast integration shape what goes into each.',
    spec: {
      layout: 'taxonomy', title: '09 How Are Customization and Packaging Portfolios Developing?', kicker: '',
      root: 'Supply portfolio for logistics and factories', rootDetail: 'Product families — customized by customer and destination',
      groups: [
        { label: 'Cartons and mailers', detail: 'Shipping packs built to export specifications' },
        { label: 'Cushioning', detail: 'Protection in transit' },
        { label: 'Labels', detail: 'Identification and logistics information' },
        { label: 'Industrial materials', detail: 'Supplies for factory production' },
        { label: 'Planning services', detail: 'Forecast integration and digital orders' },
      ],
      note: 'Connect product design, export standards, electronic documents, forecasts, local stock and reliable technical response.',
      takeaway: 'Packaging suppliers increasingly compete on total supply-chain efficiency and ease of doing business.',
    },
  },
  'mfg-packaging-m5-11': {
    heading: 'EPR duties are worked out step by step for each packaging type and entity',
    intro: 'Vietnam EPR duties depend on current official rules, covered packaging, responsible entity, exemptions and the chosen compliance route. Decree 110 was issued 1 Apr 2026, and Circular 24 gives detailed guidance.',
    spec: {
      layout: 'flow', title: '11 How Do EPR, Packaging Waste and Environmental Duties Apply?', kicker: '',
      steps: [
        { label: 'Check current official text', detail: 'Decree 110 and Circular 24', owner: 'Compliance team' },
        { label: 'Covered packaging?', detail: 'Confirm the packaging type is in scope', kind: 'decision' },
        { label: 'Responsible entity', detail: 'Identify who carries the duty' },
        { label: 'Exemption?', detail: 'Check exemption and transitional provisions', kind: 'decision' },
        { label: 'Data and reporting', detail: 'Accurate volume and composition data' },
        { label: 'Recycling route', detail: 'Choose and document the compliance route', kind: 'outcome' },
      ],
      note: 'Decree 110 effective 25 May 2026. Do not invent rates, thresholds or exemptions; retain official-source and entity-specific caveats.',
      takeaway: 'Recycling potential is not actual recycling rate, and design claims do not prove collection, sorting or end-market performance.',
    },
  },
  'mfg-packaging-m5-12': {
    heading: 'Recycling, circularity, traceability, EPR and voluntary claims are different things',
    intro: 'EPR scope sets producer and importer duties for covered packaging. Recyclability claims, recycled inputs and traceability each need their own evidence.',
    spec: {
      layout: 'table', title: '12 How Do Recycling, Circularity, Traceability and Voluntary Claims Differ?', kicker: '',
      headers: ['Concept', 'What it covers', 'What it needs'],
      rows: [
        { label: 'EPR duty', a: 'Producer and importer responsibilities', b: 'Entity-specific scope and exemptions' },
        { label: 'Recycling', a: 'Recovery of covered packaging', b: 'Working local recycling options' },
        { label: 'Circularity', a: 'Material redesign, recycled inputs, lightweighting', b: 'Trade-offs checked across the system' },
        { label: 'Traceability', a: 'Tracking materials and volumes', b: 'Accurate reporting data' },
        { label: 'Voluntary claims', a: 'Recyclability statements on the pack', b: 'Support from local systems' },
      ],
      note: 'Decree 110 was issued 1 April 2026 and took effect 25 May 2026; duties vary by packaging and responsible entity, and Circular 24 provides guidance.',
      takeaway: 'Regulatory readiness requires entity-specific scope, accurate volume and composition data, and practical recovery pathways.',
    },
  },
  'mfg-packaging-m5-13': {
    heading: 'Future demand rests on essential goods, industrial materials, exports and technical needs',
    intro: 'Demand from essential goods and industrial materials underpins growth. Global estimates differ, so check the source basis before using any forecast.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Packaging Demand?', kicker: '',
      root: { label: 'Future packaging demand', detail: 'Where durable demand comes from' },
      drivers: [
        { label: 'Essential goods', detail: 'Durable consumer demand' },
        { label: 'Industrial materials', detail: 'Factory production needs', children: [{ label: 'Films' }, { label: 'Tapes' }] },
        { label: 'Export supply chains', detail: 'Vietnam manufacturing for export' },
        { label: 'Technical requirements', detail: 'Specification-driven supply', children: [{ label: 'Advanced printing' }, { label: 'Identification' }, { label: 'Testing' }] },
      ],
      note: 'The two global estimates differ—US$1.175T with 3.5% growth to 2030 versus FBI’s US$1.109T 2025 estimate and US$1.591T 2034 forecast.',
      takeaway: 'Attractive growth combines durable demand, technical differentiation, efficient conversion and a credible route to scale.',
    },
  },
  'mfg-packaging-m5-14': {
    heading: 'Strengthening the base opens several higher-value directions',
    intro: 'Moving beyond cost-led conversion starts with stronger inputs, quality and customer integration. From there, e-commerce, printing, identification, specialty materials, automation and circular materials are options.',
    spec: {
      layout: 'pathway', title: '14 Where Are Higher-Value Conversion and Sustainable Solutions Emerging?', kicker: '',
      trunk: [
        { label: 'Cost-led conversion', detail: 'Today’s starting point for many converters' },
        { label: 'Stronger inputs and quality', detail: 'Plus customer integration and recycling connections' },
      ],
      optionsLabel: 'Higher-value opportunities — alternatives, not steps',
      options: [
        { label: 'E-commerce packaging', detail: 'Formats for online distribution' },
        { label: 'Advanced printing and identification', detail: 'Higher-value print and codes' },
        { label: 'Films and tapes', detail: 'Specialty materials for factories' },
        { label: 'Testing and automation', detail: 'Technical services and efficient conversion' },
        { label: 'Circular materials', detail: 'Recycled and recyclable solutions' },
      ],
      note: 'Move from cost-led conversion toward specification-driven supply while strengthening inputs, quality, customer integration and recycling connections.',
      takeaway: 'Attractive growth combines durable demand, technical differentiation, efficient conversion and a credible route to scale.',
    },
  },
  'mfg-packaging-m5-15': {
    heading: 'Positioning means shifting from cost-led conversion to specification-driven supply',
    intro: 'Companies can position around specialty labels and circular infrastructure instead of price alone. That needs stronger inputs, quality, customer integration and recycling connections.',
    spec: {
      layout: 'compare', title: '15 How Should Packaging Companies Position Themselves?', kicker: '',
      leftTitle: 'Cost-led conversion', rightTitle: 'Specification-driven supply',
      rows: [
        { label: 'Basis of winning', a: 'Lowest price per unit', b: 'Technical differentiation' },
        { label: 'Typical offer', a: 'Standard converted formats', b: 'Specialty labels and validated materials' },
        { label: 'Customer link', a: 'Transactional orders', b: 'Customer integration' },
        { label: 'Sustainability role', a: 'Compliance minimum', b: 'Connections to circular infrastructure' },
        { label: 'Route to scale', a: 'Volume only', b: 'Durable demand plus efficient conversion' },
      ],
      note: 'Move from cost-led conversion toward specification-driven supply while strengthening inputs, quality, customer integration and recycling connections.',
      takeaway: 'Attractive growth combines durable demand, technical differentiation, efficient conversion and a credible route to scale.',
    },
  },
};
