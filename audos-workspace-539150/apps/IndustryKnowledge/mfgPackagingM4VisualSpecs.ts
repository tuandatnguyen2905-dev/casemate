import type { MfgPackagingChapterVisual } from './mfgPackagingVisualSpecs';

/** Chapter-specific Learning Visuals for Packaging, Labels & Industrial Materials Module 04 (competition structure, key players, benchmarking, success factors, SWOT), keyed by visualKind. */
export const MFG_PACKAGING_M4_VISUALS: Record<string, MfgPackagingChapterVisual> = {
  'mfg-packaging-m4-1': {
    heading: 'Standard formats compete on cost; specialized products compete on service and switching costs',
    intro: 'Integrated material groups, large packaging firms, regional converters, label specialists and industrial-material suppliers compete in different ways. A commodity carton is easier to switch than a validated industrial label.',
    spec: {
      layout: 'compare', title: '01 How Competitive Is Packaging, Labels & Industrial Materials?', kicker: '',
      leftTitle: 'Cost competition (standard formats)', rightTitle: 'Service competition (specialized products)',
      rows: [
        { label: 'Example', a: 'Commodity carton', b: 'Validated industrial label or adhesive' },
        { label: 'What wins', a: 'Scale and efficiency', b: 'Technical depth and service' },
        { label: 'Switching suppliers', a: 'Relatively easy', b: 'Harder once integrated into an automated line' },
        { label: 'Durable value comes from', a: 'Low conversion cost', b: 'Local response, precision, qualification' },
      ],
      note: 'Choose segments where local response, flexibility, precision, qualification or technical service creates durable value.',
      takeaway: 'Standard formats reward scale and efficiency while specialized products reward technical depth and switching costs.',
    },
  },
  'mfg-packaging-m4-2': {
    heading: 'The five forces press harder on standard formats than on integrated specialty products',
    intro: 'The same five forces apply across packaging categories, but their strength changes with scale and with how deeply a product is integrated into the customer process.',
    spec: {
      layout: 'table', title: "02 How Do Porter's Five Forces Apply Across Packaging Categories?", kicker: '',
      headers: ['Force', 'Standard formats', 'Integrated specialty products'],
      rows: [
        { label: 'Rivalry', a: 'Many converters, price-led', b: 'Fewer qualified suppliers' },
        { label: 'Buyer power', a: 'Strong: switching is easy', b: 'Weaker: switching needs revalidation' },
        { label: 'Supplier power', a: 'Input costs squeeze thin margins', b: 'Input costs matter, but service adds value' },
        { label: 'Threat of entry', a: 'Limited mainly by scale', b: 'Limited by qualification and technical depth' },
        { label: 'Substitutes', a: 'Other formats or materials', b: 'Alternatives must pass customer validation' },
      ],
      note: 'A commodity carton can switch suppliers more easily than a validated industrial label or adhesive integrated into an automated line.',
      takeaway: 'Standard formats reward scale and efficiency while specialized products reward technical depth and switching costs.',
    },
  },
  'mfg-packaging-m4-3': {
    heading: 'Four kinds of barrier protect an established supplier',
    intro: 'Scale, switching, qualification and technical barriers make a supplier harder to replace. Specialization and qualification barriers matter most for validated products.',
    spec: {
      layout: 'taxonomy', title: '03 What Creates Scale, Switching, Qualification and Technical Barriers?', kicker: '',
      root: 'Barriers to replacing a supplier', rootDetail: 'Types of barrier — one product can face several',
      groups: [
        { label: 'Scale', detail: 'Efficiency in high-volume standard formats' },
        { label: 'Switching', detail: 'Product integrated into an automated line' },
        { label: 'Qualification', detail: 'Customer validation of label, adhesive or material' },
        { label: 'Technical', detail: 'Specialization, precision and technical service' },
      ],
      note: 'A commodity carton can switch suppliers more easily than a validated industrial label or adhesive integrated into an automated line.',
      takeaway: 'Standard formats reward scale and efficiency while specialized products reward technical depth and switching costs.',
    },
  },
  'mfg-packaging-m4-4': {
    heading: 'Global packaging groups illustrate different portfolio exposures, not one ranking',
    intro: 'International Paper and Mondi illustrate fiber exposure, Amcor broad packaging and Sealed Air protection. Sonoco covers consumer and industrial packaging.',
    spec: {
      layout: 'table', title: '04 Who Are the Major Global Packaging Participants?', kicker: '',
      headers: ['Global participant', 'Portfolio context in its official source', 'Illustrates'],
      rows: [
        { label: 'Amcor', a: 'Global packaging portfolio', b: 'Broad packaging' },
        { label: 'Sealed Air', a: 'Protective and food packaging', b: 'Protection' },
        { label: 'Sonoco', a: 'Consumer and industrial packaging', b: 'Consumer and industrial mix' },
        { label: 'International Paper', a: 'Fiber-based packaging', b: 'Fiber exposure' },
        { label: 'Mondi', a: 'Paper and flexible packaging', b: 'Fiber exposure' },
      ],
      note: 'Listed in no particular order. Company relevance depends on material, product, customer and geography.',
      takeaway: 'Company relevance depends on material, product, customer and geography—not one universal packaging ranking.',
    },
  },
  'mfg-packaging-m4-5': {
    heading: 'Players differ mainly by the material and product they focus on',
    intro: 'Paper, plastic, metal, label and specialty players serve different categories. International Paper is fiber-based, while Duy Tan and Binh Minh are Vietnam plastics businesses.',
    spec: {
      layout: 'taxonomy', title: '05 How Do Paper, Plastic, Metal, Label and Specialty Players Differ?', kicker: '',
      root: 'Packaging participants by material focus', rootDetail: 'Groups, not a ranking — check each actual product portfolio',
      groups: [
        { label: 'Paper and fiber', items: ['International Paper', 'Mondi', 'DOHACO'] },
        { label: 'Plastics', items: ['Duy Tan', 'Binh Minh', 'An Phat'] },
        { label: 'Protective and specialty', items: ['Sealed Air'] },
        { label: 'Diversified', items: ['Amcor', 'Sonoco'] },
        { label: 'Labels', items: ['Specialized label converters'] },
        { label: 'Metal', detail: 'No metal-packaging company is profiled in this chapter' },
      ],
      note: 'Binh Minh product scope should be checked before direct comparison.',
      takeaway: 'Company relevance depends on material, product, customer and geography—not one universal packaging ranking.',
    },
  },
  'mfg-packaging-m4-6': {
    heading: "Vietnam's named participants cover plastics, paper and material-related businesses",
    intro: 'Duy Tan, Binh Minh, DOHACO, An Phat and specialized label converters serve different local categories. Verify actual product portfolios before comparing them.',
    spec: {
      layout: 'table', title: "06 Which Manufacturers Participate in Vietnam's Packaging Market?", kicker: '',
      headers: ['Vietnam participant', 'Context in its official source', 'Check before comparing'],
      rows: [
        { label: 'Duy Tan Plastics', a: 'Plastics and packaging-related', b: 'Which packaging lines it actually makes' },
        { label: 'Binh Minh Plastics', a: 'Plastic products', b: 'Product scope before direct comparison' },
        { label: 'DOHACO (Dong Hai Ben Tre)', a: 'Paper and packaging', b: 'Fiber formats and customers served' },
        { label: 'An Phat Holdings', a: 'Plastics and material-related', b: 'Share of portfolio that is packaging' },
        { label: 'Specialized label converters', a: 'Labels for local customers', b: 'Technical capability and customers' },
      ],
      note: 'Global groups such as Mondi illustrate fiber and flexible exposure; compare like with like by material, product, customer and geography.',
      takeaway: 'Company relevance depends on material, product, customer and geography—not one universal packaging ranking.',
    },
  },
  'mfg-packaging-m4-7': {
    heading: 'Normalize first, then compare capacity and delivery',
    intro: 'Suppliers can only be compared fairly after material, format, complexity, run length, process and customer requirement are made comparable. Capacity and delivery are then measured on that basis.',
    spec: {
      layout: 'flow', title: '07 How Should Packaging Manufacturers Be Compared?', kicker: '',
      steps: [
        { label: 'Define the requirement', detail: 'Material, format and customer requirement' },
        { label: 'Normalize the basis', detail: 'Complexity, run length and process' },
        { label: 'Measure capacity', detail: 'Usable capacity and utilization' },
        { label: 'Measure delivery', detail: 'On-time delivery and customer response' },
        { label: 'Compare on evidence', detail: 'Alongside waste, flexibility and technical evidence', kind: 'outcome' },
      ],
      note: 'A large converter may underperform a specialist on short runs, code accuracy, technical validation or customer response.',
      takeaway: 'Scale should be assessed alongside waste, flexibility, customer access and technical evidence.',
    },
  },
  'mfg-packaging-m4-8': {
    heading: 'Each benchmark metric measures something different and needs its own evidence',
    intro: 'Capacity, material yield, cost, quality, delivery and customer portfolio answer different questions about a manufacturer. Material yield is the share of material converted into conforming output.',
    spec: {
      layout: 'table', title: '08 How Do Capacity, Yield, Cost, Quality and Delivery Differ?', kicker: '',
      headers: ['Metric', 'What it measures', 'Evidence to look for'],
      rows: [
        { label: 'Capacity', a: 'Output the plant can actually run', b: 'Utilization after setup and changeover' },
        { label: 'Material yield', a: 'Material converted into conforming output', b: 'Scrap and loss records' },
        { label: 'Cost', a: 'Cost per accepted unit', b: 'Margin on a normalized product basis' },
        { label: 'Quality', a: 'Conformance of output', b: 'Defects, print and dimensions' },
        { label: 'Delivery', a: 'Reliability of supply', b: 'On-time delivery' },
        { label: 'Customer portfolio', a: 'Spread of revenue across accounts', b: 'Account concentration' },
      ],
      note: 'Normalize material, format, complexity, run length, process and customer requirement before ranking suppliers.',
      takeaway: 'Scale should be assessed alongside waste, flexibility, customer access and technical evidence.',
    },
  },
  'mfg-packaging-m4-9': {
    heading: 'Advantage beyond scale comes from quality, flexibility, compliance and sustainability evidence',
    intro: 'A specialist can beat a large converter on short runs, code accuracy, technical validation or customer response. Documentation, recyclability and traceability add to that advantage.',
    spec: {
      layout: 'driverTree', title: '09 Which Technology, Customer and Sustainability Capabilities Create Advantage?', kicker: '',
      root: { label: 'Competitive advantage', detail: 'What wins beyond plant size' },
      drivers: [
        { label: 'Technology and quality', detail: 'Accurate, consistent output', children: [{ label: 'Code accuracy' }, { label: 'Print and dimensions' }] },
        { label: 'Customer flexibility', detail: 'Fit with customer needs', children: [{ label: 'Short runs' }, { label: 'Customer response' }] },
        { label: 'Compliance', detail: 'Proof the product meets requirements', children: [{ label: 'Documentation' }, { label: 'Technical validation' }] },
        { label: 'Sustainability', detail: 'Credible environmental information', children: [{ label: 'Recyclability' }, { label: 'Traceability' }] },
      ],
      note: 'A large converter may underperform a specialist on short runs, code accuracy, technical validation or customer response.',
      takeaway: 'Scale should be assessed alongside waste, flexibility, customer access and technical evidence.',
    },
  },
  'mfg-packaging-m4-10': {
    heading: 'Procurement and planning decisions flow through to delivery reliability',
    intro: 'Input sourcing, setup, yield and maintenance come before the customer sees a delivery. A weakness early in the chain shows up as late or short supply.',
    spec: {
      layout: 'flow', title: '10 Why Do Procurement, Yield and Production Planning Matter?', kicker: '',
      steps: [
        { label: 'Procurement', detail: 'Input sourcing at the right cost and quality' },
        { label: 'Production planning', detail: 'Setup and run scheduling' },
        { label: 'Conversion at yield', detail: 'Limiting scrap and loss' },
        { label: 'Maintenance and traceability', detail: 'Keeping lines running and output tracked' },
        { label: 'Delivery reliability', detail: 'Right product, on time', kind: 'outcome' },
      ],
      note: 'Use customer trials and measurable performance to guide automation, material redesign and circular investment.',
      takeaway: 'Long-term success combines operating discipline with technical and customer integration.',
    },
  },
  'mfg-packaging-m4-11': {
    heading: 'Advantage combines efficient production with co-development alongside the customer',
    intro: 'Quality, customization and reliability come from two sources. One is operating discipline inside the plant; the other is technical work with the customer.',
    spec: {
      layout: 'compare', title: '11 How Do Quality, Customization and Reliability Create Advantage?', kicker: '',
      leftTitle: 'Production efficiency', rightTitle: 'Customer co-development',
      rows: [
        { label: 'Focus', a: 'Yield, setup and maintenance', b: 'Line compatibility and technical support' },
        { label: 'Delivers', a: 'Reliable quality at controlled cost', b: 'Customized products that fit the line' },
        { label: 'Evidence', a: 'Measurable plant performance', b: 'Customer trials' },
        { label: 'Risk if missing', a: 'Waste and unreliable supply', b: 'Products the customer cannot run' },
      ],
      note: 'Lightweighting creates value only if protection, conversion, filling, logistics and recovery remain acceptable.',
      takeaway: 'Long-term success combines operating discipline with technical and customer integration.',
    },
  },
  'mfg-packaging-m4-12': {
    heading: 'A material redesign should scale only when lifecycle evidence supports it',
    intro: 'Engineering, customer relationships and compliance support growth when a change such as lightweighting is proven. Quality systems and lifecycle evidence decide whether it goes ahead.',
    spec: {
      layout: 'decision', title: '12 How Do Engineering, Customer Relationships and Compliance Support Growth?', kicker: '',
      root: { label: 'Proposed redesign', detail: 'For example, lightweighting a pack' },
      question: 'Do protection, conversion, filling, logistics and recovery remain acceptable?',
      branches: [
        { condition: 'Proven in customer trials', outcome: 'Scale with quality systems in place', detail: 'Lifecycle evidence documented', tone: 'positive' },
        { condition: 'Partly proven', outcome: 'Extend trials and measure', detail: 'Close gaps before committing', tone: 'caution' },
        { condition: 'Fails any lifecycle stage', outcome: 'Do not launch', detail: 'Redesign or keep the current pack', tone: 'negative' },
      ],
      note: 'Use customer trials and measurable performance to guide automation, material redesign and circular investment.',
      takeaway: 'Long-term success combines operating discipline with technical and customer integration.',
    },
  },
  'mfg-packaging-m4-13': {
    heading: 'Broad recurring demand is the core strength; input exposure and price pressure are the weak spots',
    intro: 'The industry benefits from broad B2B demand and specialty openings. It is weakened by dependence on inputs and by price pressure.',
    spec: {
      layout: 'compare', title: "13 What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Demand', a: 'Broad, recurring B2B demand', b: 'Standard formats face price pressure' },
        { label: 'Value capture', a: 'Specialty opportunity where customers pay for capability', b: 'Dependence on input supply and cost' },
        { label: 'Sustainability', a: 'Recyclable structures can open demand', b: 'Collection systems still limit recovery' },
      ],
      note: 'A recyclable structure may require equipment, validation and customer approval while collection systems still limit recovery.',
      takeaway: 'The best opportunities align durable demand with capability, customer willingness to pay and controllable risk.',
    },
  },
  'mfg-packaging-m4-14': {
    heading: 'E-commerce and specialties are the openings; inputs, substitution and regulation are the threats',
    intro: 'External opportunities come from e-commerce and specialties. Threats come from raw-material volatility, substitution and regulatory change.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Packaging and Labels?', kicker: '',
      headers: ['External factor', 'Opportunity or threat', 'What it asks of the company'],
      rows: [
        { label: 'E-commerce', a: 'Opportunity', b: 'Formats suited to new logistics needs' },
        { label: 'Specialties', a: 'Opportunity', b: 'Technical capability customers pay for' },
        { label: 'Raw-material dependence', a: 'Threat: volatility', b: 'Diversify suppliers' },
        { label: 'Substitution', a: 'Threat', b: 'Keep products relevant to customer needs' },
        { label: 'Regulatory change', a: 'Threat and trigger for change', b: 'Equipment, validation and customer approval' },
      ],
      note: 'A recyclable structure may require equipment, validation and customer approval while collection systems still limit recovery.',
      takeaway: 'The best opportunities align durable demand with capability, customer willingness to pay and controllable risk.',
    },
  },
  'mfg-packaging-m4-15': {
    heading: 'Commit capital only when demand, capability and risk line up',
    intro: 'Manufacturers must decide where to invest while managing customer concentration and capital discipline. Staging capital against utilization keeps risk controllable.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Packaging Manufacturers Make?', kicker: '',
      root: { label: 'Proposed investment', detail: 'New capacity, capability or recyclable structure' },
      question: 'Does it align durable demand with capability, willingness to pay and controllable risk?',
      branches: [
        { condition: 'Demand and utilization confirmed', outcome: 'Invest in stages', detail: 'Stage capital against utilization', tone: 'positive' },
        { condition: 'Demand rests on few customers', outcome: 'Diversify before scaling', detail: 'Reduce customer concentration', tone: 'caution' },
        { condition: 'Claims or market demand unproven', outcome: 'Validate first', detail: 'Connect sustainability to real market demand', tone: 'negative' },
      ],
      note: 'Diversify customers and suppliers, validate claims, stage capital against utilization and connect sustainability to real market demand.',
      takeaway: 'The best opportunities align durable demand with capability, customer willingness to pay and controllable risk.',
    },
  },
};
