import type { MfgElectricalChapterVisual } from './mfgElectricalVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Electrical & Energy Equipment Manufacturing Module 03 (business models, customers and channels), keyed by visualKind. */
export const MFG_ELECTRICAL_M3_VISUALS: Record<string, MfgElectricalChapterVisual> = {
  'mfg-electrical-m3-1': {
    heading: 'One manufacturing base, three ways to turn products into sales',
    intro: 'Manufacturers make and sell standardized or configured electrical products to distributors, contractors, utilities, industrial users and developers. The offer can be a standard product, a customized one or a private-label supply.',
    spec: {
      layout: 'pathway', title: '01 How Do Electrical Equipment Manufacturers Make Money?', kicker: '',
      trunk: [
        { label: 'Manufacture electrical products', detail: 'Standardized or configured equipment' },
        { label: 'Prove reliability and compliance', detail: 'Range and engineering set differentiation' },
      ],
      optionsLabel: 'Product offers — alternatives, not steps',
      options: [
        { label: 'Standard products', detail: 'Repeatable platforms sold through distributor scale', items: ['e.g. breakers'] },
        { label: 'Customization', detail: 'Application engineering and project testing added', items: ['e.g. transformers'] },
        { label: 'Private label', detail: 'Products supplied for another seller’s brand' },
      ],
      afterLabel: 'Who pays',
      after: [{ label: 'Distributors, contractors, utilities, developers', detail: 'Plus industrial users', kind: 'outcome' }],
      note: 'In Vietnam, local manufacturers can combine standardized components with configured panels, enclosures, cables and selected equipment.',
      takeaway: 'Product sales remain foundational, but reliability, compliance, range and engineering determine differentiation.',
    },
  },
  'mfg-electrical-m3-2': {
    heading: 'Own-brand, OEM and component suppliers earn margin from different things',
    intro: 'The same factory can sell under its own brand, supply an OEM, or provide components and industrial equipment. Each model puts product margin at risk in a different place.',
    spec: {
      layout: 'table', title: '02 How Do OEM, Own-Brand and Component Models Differ?', kicker: '',
      headers: ['Model', 'What the buyer receives', 'What protects product margin'],
      rows: [
        { label: 'Own-brand products', a: 'Branded standard or configured products', b: 'Range, compliance and distributor scale' },
        { label: 'OEM supply', a: 'Equipment built into another firm’s offer', b: 'Meeting the OEM’s specification reliably' },
        { label: 'Component supply', a: 'Parts for panels, enclosures and cables', b: 'Repeatable platforms and consistent quality' },
        { label: 'Industrial equipment', a: 'Configured equipment for industrial users', b: 'Application engineering and project testing' },
      ],
      note: 'Evaluate the product boundary, application, voltage or capacity, customer requirement and compliance evidence before comparing margins across models.',
      takeaway: 'Product sales remain foundational, but reliability, compliance, range and engineering determine differentiation.',
    },
  },
  'mfg-electrical-m3-3': {
    heading: 'The further from stock toward engineered solutions, the more performance responsibility the maker carries',
    intro: 'Suppliers can sell stocked devices, build to order, or engineer integrated solutions that bundle equipment, design, installation, monitoring and maintenance. Solutions deepen relationships but add delivery and performance obligations.',
    spec: {
      layout: 'table', title: '03 How Do Make-to-Stock, Build-to-Order and Engineering-to-Order Compare?', kicker: '',
      headers: ['Model', 'What the customer buys', 'Obligation the maker takes on'],
      rows: [
        { label: 'Make-to-stock', a: 'Standard devices sold separately', b: 'Availability and product compliance' },
        { label: 'Build-to-order', a: 'Equipment configured to an order', b: 'Correct configuration and delivery' },
        { label: 'Engineering-to-order', a: 'Integrated switchgear, protection, controls', b: 'Engineering and commissioning quality' },
        { label: 'Maintenance contracts', a: 'Ongoing service after commissioning', b: 'Response commitments, spares, trained teams' },
        { label: 'Equipment as a Service', a: 'Outcome-based use, e.g. energy optimization', b: 'Performance responsibility over the term' },
      ],
      note: 'Service-led growth needs trained teams, spares, response commitments, data governance and clear contract boundaries.',
      takeaway: 'Solutions and services can deepen relationships but add delivery and performance obligations.',
    },
  },
  'mfg-electrical-m3-4': {
    heading: 'Low-voltage, high-voltage and renewable equipment are separate segments',
    intro: 'Products are segmented by function, voltage, application, technology and project complexity. A low-voltage breaker and a high-voltage cable follow different qualification routes, sales cycles and service risks.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Electrical Equipment Products Segmented?', kicker: '',
      root: 'Electrical equipment products', rootDetail: 'Segmented by function, voltage, application, technology and project complexity',
      groups: [
        { label: 'Low voltage', detail: 'Components and protection, e.g. breakers', items: ['Breakers', 'Components'] },
        { label: 'High voltage', detail: 'Grid equipment with longer qualification', items: ['High-voltage cable', 'Grid equipment'] },
        { label: 'Renewable equipment', detail: 'Conversion and connection for new generation', items: ['Power conversion', 'Storage interfaces'] },
      ],
      note: 'Size each category using compatible ratings, standards, customers and channels rather than a broad sector total.',
      takeaway: 'Technical barriers, buying processes and economics differ substantially by segment.',
    },
  },
  'mfg-electrical-m3-5': {
    heading: 'Voltage, capacity, application and customization together define what a product must be',
    intro: 'Medium-voltage, industrial-system and critical-power products differ by rating, application and project complexity. Those choices set the qualification route, sales cycle and service risk.',
    spec: {
      layout: 'driverTree', title: '05 How Do Voltage, Capacity, Specification and Customization Affect Products?', kicker: '',
      root: { label: 'Product specification', detail: 'What the buyer actually orders' },
      drivers: [
        { label: 'Voltage level', detail: 'Changes technical barriers and qualification', children: [{ label: 'Medium voltage' }, { label: 'Low vs high voltage' }] },
        { label: 'Capacity and rating', detail: 'Must match compatible ratings and standards', children: [{ label: 'Rated capacity' }, { label: 'Applicable standards' }] },
        { label: 'Application', detail: 'Sets what reliability means in use', children: [{ label: 'Industrial systems', detail: 'Drives and distribution' }, { label: 'Critical power', detail: 'UPS and continuity' }] },
        { label: 'Customization', detail: 'Raises project complexity and service risk', children: [{ label: 'Project complexity' }, { label: 'Qualification route' }] },
      ],
      note: 'Size each category using compatible ratings, standards, customers and channels rather than a broad sector total.',
      takeaway: 'Technical barriers, buying processes and economics differ substantially by segment.',
    },
  },
  'mfg-electrical-m3-6': {
    heading: 'Lifecycle services follow the asset from selection to modernization',
    intro: 'Services run from equipment selection and studies through installation, commissioning, inspection, repairs, monitoring, software support, retrofit and modernization. Replacing an aging protection relay can extend asset life without replacing the full system.',
    spec: {
      layout: 'flow', title: '06 How Do Lifecycle Services and Integrated Solutions Differ From Product Sales?', kicker: '',
      steps: [
        { label: 'Consulting', detail: 'Equipment selection and studies' },
        { label: 'Installation', detail: 'Installation and commissioning' },
        { label: 'Maintenance', detail: 'Inspection and repairs' },
        { label: 'Digital service', detail: 'Monitoring and software support' },
        { label: 'Modernization', detail: 'Retrofit, e.g. an aging protection relay' },
        { label: 'Extended asset life', detail: 'Better monitoring without full replacement', kind: 'outcome' },
      ],
      loop: 'A product sale happens once; each service stage can recur when delivery is repeatable and trusted.',
      note: 'Local service coverage can reduce response time and strengthen imported or domestically manufactured equipment offers.',
      takeaway: 'Lifecycle services create recurring revenue when delivery quality is repeatable and trusted.',
    },
  },
  'mfg-electrical-m3-7': {
    heading: 'Utilities and developers buy proven performance, compliance and support ahead of price',
    intro: 'Utilities and developers buy through formal procurement for generation, transmission, distribution, grid modernization, renewable connection and storage integration. A renewable project evaluates inverters, transformers, switchgear, protection, controls and warranties as one system.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases Electrical and Energy Equipment?', kicker: '',
      root: 'Utility and developer buyers', rootDetail: 'Formal procurement — price alone does not decide',
      groups: [
        { label: 'Proven performance', detail: 'Will it work as specified?', items: ['Reliability', 'References'] },
        { label: 'Safety and rules', detail: 'Can it be accepted on the network?', items: ['Compliance', 'Grid connection'] },
        { label: 'Bankability and lifecycle', detail: 'Can the project fund and sustain it?', items: ['Project finance', 'Long-term support'] },
      ],
      note: 'In Vietnam, PDP8 opportunities still depend on tender timing, bankability, permitting, technical specifications and grid readiness.',
      takeaway: 'Utilities and developers prioritize safety, proven performance and lifecycle support over price alone.',
    },
  },
  'mfg-electrical-m3-8': {
    heading: 'Factories, critical facilities and installers stress different requirements',
    intro: 'Applications range from factory motors and distribution to hospital and data-center continuity and residential wiring. A data center emphasizes redundancy and power quality; a contractor emphasizes availability, documentation and installation efficiency.',
    spec: {
      layout: 'table', title: '08 How Do Utility, Industrial, EPC and Developer Requirements Differ?', kicker: '',
      headers: ['Customer', 'Typical equipment', 'What they emphasize'],
      rows: [
        { label: 'Industrial plant', a: 'Factory motors and distribution', b: 'Factory uptime' },
        { label: 'Hospital or data center', a: 'Continuity and critical power', b: 'Redundancy and power quality' },
        { label: 'Commercial project', a: 'Panels and controls', b: 'Shared basics: safety, compatibility, ownership cost' },
        { label: 'Contractor or installer', a: 'Residential wiring and protection', b: 'Availability, documentation, installation efficiency' },
      ],
      note: 'Tailor product tiers, inventory, channels, training and service to industrial regions, commercial projects and installer networks.',
      takeaway: 'Reliability, safety, compatibility and ownership cost are common, but priorities vary by application.',
    },
  },
  'mfg-electrical-m3-9': {
    heading: 'Four purchase criteria break down into safety, access and energy-cost questions',
    intro: 'Buyers weigh reliability, compliance, lead time and total cost of ownership, with priorities that vary by application. Building safety, residential access and energy cost are where these criteria become concrete.',
    spec: {
      layout: 'driverTree', title: '09 How Do Reliability, Compliance, Lead Time and TCO Shape Purchasing?', kicker: '',
      root: { label: 'Purchase decision', detail: 'Weights shift by application' },
      drivers: [
        { label: 'Reliability', detail: 'Continuity of supply in use', children: [{ label: 'Redundancy' }, { label: 'Power quality' }] },
        { label: 'Compliance', detail: 'Safe, documented installation', children: [{ label: 'Building safety' }, { label: 'Documentation' }] },
        { label: 'Lead time', detail: 'Product reachable when needed', children: [{ label: 'Availability' }, { label: 'Residential access', detail: 'Reach through installer networks' }] },
        { label: 'TCO', detail: 'Cost beyond the purchase price', children: [{ label: 'Energy cost' }, { label: 'Ownership cost' }] },
      ],
      note: 'Tailor product tiers, inventory, channels, training and service to industrial regions, commercial projects and installer networks.',
      takeaway: 'Reliability, safety, compatibility and ownership cost are common, but priorities vary by application.',
    },
  },
  'mfg-electrical-m3-10': {
    heading: 'A hypothetical USD1,000 equipment sale leaves USD210 contribution after defined costs',
    intro: 'Revenue can come from equipment sales, project orders, engineering, milestones, parts and services. This hypothetical example shows how defined costs reduce one equipment sale to its contribution.',
    spec: {
      layout: 'waterfall', title: '10 How Do Electrical Equipment Manufacturers Generate Revenue?', kicker: H,
      unit: 'USD', basis: `${H} — one equipment sale, defined cost scope`,
      items: [
        { label: 'Equipment sale', value: 1000, kind: 'start' },
        { label: 'BOM', value: 520, kind: 'subtract' },
        { label: 'Labor', value: 120, kind: 'subtract' },
        { label: 'Factory overhead', value: 100, kind: 'subtract' },
        { label: 'Testing', value: 30, kind: 'subtract' },
        { label: 'Logistics', value: 20, kind: 'subtract' },
        { label: 'Contribution (21%)', value: 210, kind: 'total' },
      ],
      note: `${H}. Not actual equipment prices or margins. Order value, backlog, billing, recognized revenue and cash remain separate; define product, scope, warranty, tax and revenue basis.`,
      takeaway: 'Hypothetically, a USD1,000 sale with USD790 of defined cost generates USD210 contribution, or 21%.',
    },
  },
  'mfg-electrical-m3-11': {
    heading: 'Spreading a fixed factory cost over more units lowers cost per unit',
    intro: 'Cost spans materials, components, labor, factory assets, energy, testing, scrap, warranty and working capital. Move the hypothetical sliders to see how volume changes fixed cost per unit.',
    spec: {
      layout: 'scenario', title: '11 What Determines Manufacturing and Product-Lifecycle Costs?', kicker: H,
      inputs: [
        { key: 'fixed', label: 'Fixed factory cost', min: 100000, max: 600000, step: 10000, value: 300000, unit: 'USD' },
        { key: 'units', label: 'Units produced', min: 500, max: 2000, step: 50, value: 1000, unit: 'units' },
      ],
      outputs: [
        { label: 'Fixed cost per unit', unit: 'USD', digits: 0, compute: (v) => v.fixed / v.units },
        { label: 'Change vs 1,000 units', unit: 'USD', digits: 0, compute: (v) => v.fixed / v.units - v.fixed / 1000 },
      ],
      assumption: `${H}. Illustrative inputs, not factory data: USD300,000 over 1,000 units is USD300 per unit; over 1,500 units it is USD200, assuming capacity, mix and quality remain feasible.`,
      note: 'Higher utilization can also create congestion or quality loss. Separate rated capacity, practical capacity, production volume, utilization, throughput and product mix.',
      takeaway: 'Hypothetically, USD300,000 fixed cost is USD300 per unit at 1,000 units and USD200 at 1,500 units, if capacity, mix and quality remain feasible.',
    },
  },
  'mfg-electrical-m3-12': {
    heading: 'Profitability KPIs roll up from utilization, OEE, quality losses, inventory and delivery',
    intro: 'KPIs only compare when products, lines and periods are aligned. OEE multiplies availability, performance and quality under defined rules, and is not a universal score for every engineering-to-order manufacturer.',
    spec: {
      layout: 'driverTree', title: '12 Which KPIs Drive Electrical Equipment Profitability?', kicker: '',
      root: { label: 'Equipment profitability', detail: 'For aligned products, lines and periods' },
      formula: 'OEE = Availability × Performance × Quality',
      drivers: [
        { label: 'Capacity utilization', detail: 'Used vs practical or rated capacity', children: [{ label: 'Cost per unit' }] },
        { label: 'OEE', detail: 'For suitable equipment or lines', op: '×', children: [{ label: 'Availability' }, { label: 'Performance' }, { label: 'Quality' }] },
        { label: 'Quality losses', detail: 'Defined quality gate first', children: [{ label: 'FPY' }, { label: 'Defect rate' }, { label: 'Scrap' }, { label: 'Rework cost' }] },
        { label: 'Inventory and delivery', detail: 'Cash tied up and promises kept', children: [{ label: 'Inventory turnover' }, { label: 'OTD' }] },
        { label: 'Warranty cost', detail: 'Field failures after shipment' },
      ],
      note: 'Define numerator, denominator, product mix, standard time, quality gate and cost scope before benchmarking factories on these KPIs.',
      takeaway: `${H}: if USD200 of copper per unit rises 10%, cost rises USD20 and USD300 gross profit falls to USD280 at a fixed price, or USD290 if USD10 is passed through.`,
    },
  },
  'mfg-electrical-m3-13': {
    heading: 'Product complexity, purchase frequency and customer concentration decide the route to customers',
    intro: 'Manufacturers combine direct utility and industrial sales, wholesale access for standardized products, project specification through EPCs and local support through dealers. A firm may sell transformers directly while cables and breakers flow through distributors.',
    spec: {
      layout: 'decision', title: '13 How Do Manufacturers Acquire Customers and Projects?', kicker: '',
      root: { label: 'Product and customer', detail: 'Complexity, frequency, concentration' },
      question: 'Which route matches how technical the product is and how customers buy it?',
      branches: [
        { condition: 'Engineered, few large buyers', outcome: 'Direct projects', detail: 'e.g. transformers to utilities and industry', tone: 'positive' },
        { condition: 'Specified inside a larger project', outcome: 'EPC partners', detail: 'Win the specification through the EPC', tone: 'positive' },
        { condition: 'Standardized, frequent purchases', outcome: 'Authorized distributors', detail: 'e.g. cables, breakers, wiring products', tone: 'positive' },
        { condition: 'Needs local support after sale', outcome: 'Service partners and dealers', detail: 'Accountable warranty support', tone: 'caution' },
      ],
      note: 'Strong coverage combines specification influence, reliable inventory, project relationships and accountable warranty support.',
      takeaway: 'The right channel matches technical complexity, purchase frequency and customer concentration.',
    },
  },
  'mfg-electrical-m3-14': {
    heading: 'Distributors, dealers, EPCs and tenders connect the manufacturer to buyers — and can collide',
    intro: 'Standardized products reach buyers through wholesale distributors and authorized dealers, while projects are specified through EPCs or bought directly by utilities and industry. Overlapping routes create channel conflict.',
    spec: {
      layout: 'ecosystem', title: '14 How Do Distributors, OEM Agreements, EPCs and Tenders Work?', kicker: '',
      center: { label: 'Manufacturer', detail: 'Chooses which route serves each product' },
      actors: [
        { label: 'Distributor network', relation: 'Wholesale access for standardized products', flows: ['product', 'money'] },
        { label: 'Authorized dealers', relation: 'Local support and warranty handling', flows: ['service', 'product'] },
        { label: 'EPCs', relation: 'Specify equipment into projects', flows: ['information', 'money'] },
        { label: 'Utilities and industry (tenders)', relation: 'Buy directly through formal procurement', flows: ['money', 'information'] },
        { label: 'Channel conflict', relation: 'Direct and distributor sales overlap', flows: ['risk'] },
      ],
      note: 'Strong coverage combines specification influence, reliable inventory, project relationships and accountable warranty support.',
      takeaway: 'The right channel matches technical complexity, purchase frequency and customer concentration.',
    },
  },
  'mfg-electrical-m3-15': {
    heading: 'Digital tools hand off to technical sales before local fulfilment',
    intro: 'Digital channels cover discovery, specification, quotation, repeat ordering, certificates, order status and service history. An engineer configures ratings online, validates the application with technical sales and is fulfilled from local inventory.',
    spec: {
      layout: 'flow', title: '15 How Do Technical Sales and Long-Term Service Relationships Support Growth?', kicker: '',
      steps: [
        { label: 'Digital catalogue', detail: 'Online discovery and specification', owner: 'Engineer' },
        { label: 'Configuration', detail: 'Ratings configured and quoted online', owner: 'Engineer' },
        { label: 'Technical handoff', detail: 'Application validated with a person', owner: 'Technical sales' },
        { label: 'Online ordering', detail: 'Order placed and tracked', owner: 'Customer' },
        { label: 'Inventory visibility', detail: 'Fulfilled from local stock', owner: 'Distributor' },
        { label: 'Customer portal', detail: 'Certificates and service history', kind: 'outcome', owner: 'Manufacturer' },
      ],
      loop: 'Service history and repeat ordering in the portal keep the relationship going.',
      note: 'In Vietnam, build Vietnamese technical content, genuine-product verification, regional stock visibility and service booking into digital channels.',
      takeaway: 'Digital channels work best when connected to accurate data, fulfillment and human technical support.',
    },
  },
  'mfg-electrical-m3-16': {
    heading: 'Suppliers, distributors and utilities sit in a wider ecosystem of participants',
    intro: 'The ecosystem spans materials, components, equipment brands, engineering firms, contractors, developers, users, service providers, standards organizations and regulators. System performance depends on all of them, not one manufacturer.',
    spec: {
      layout: 'taxonomy', title: '16 Who Participates in the Electrical Equipment Ecosystem?', kicker: '',
      root: 'Electrical equipment ecosystem', rootDetail: 'Participant categories — one project usually involves all of them',
      groups: [
        { label: 'Suppliers', items: ['Materials', 'Components'] },
        { label: 'Equipment and engineering', items: ['Equipment brands', 'Engineering firms', 'Contractors'] },
        { label: 'Distributors', detail: 'Route products to contractors and users' },
        { label: 'Utilities and users', items: ['Utilities', 'Developers', 'Industrial users'] },
        { label: 'Service providers', detail: 'Installation, commissioning and service' },
        { label: 'Standards and regulators', items: ['Standards organizations', 'Regulators'] },
      ],
      note: 'Capability gaps can arise at design, procurement, installation, laboratory, commissioning or service stages.',
      takeaway: 'System performance depends on the wider ecosystem, not one manufacturer alone.',
    },
  },
  'mfg-electrical-m3-17': {
    heading: 'A grid project hands work between manufacturers, EPCs, test bodies and the utility',
    intro: 'A grid project requires aligned specifications, tests, construction, protection settings, communications and operational acceptance. Manufacturers, EPCs and testing bodies each carry part of that sequence.',
    spec: {
      layout: 'flow', title: '17 How Do Manufacturers, Suppliers, EPCs, Utilities and Test Bodies Collaborate?', kicker: '',
      steps: [
        { label: 'Aligned specifications', detail: 'Requirements agreed across parties', owner: 'Utility and EPC' },
        { label: 'Tests', detail: 'Equipment evidence before shipment', owner: 'Manufacturer and testing body' },
        { label: 'Construction', detail: 'Installation on site', owner: 'EPC' },
        { label: 'Protection settings', detail: 'Configured for the network', owner: 'Manufacturer and EPC' },
        { label: 'Communications', detail: 'Control and monitoring links', owner: 'EPC' },
        { label: 'Operational acceptance', detail: 'System accepted into service', kind: 'outcome', owner: 'Utility' },
      ],
      note: 'Capability gaps can arise at design, procurement, installation, laboratory, commissioning or service stages.',
      takeaway: 'System performance depends on the wider ecosystem, not one manufacturer alone.',
    },
  },
  'mfg-electrical-m3-18': {
    heading: 'Partners around a delivery consortium each contribute a capability',
    intro: 'Equipment, software, storage, EPC, utility, university, laboratory and domestic manufacturing participants cooperate. An international power-electronics provider can pair its technology with local enclosures, integration, installation and service.',
    spec: {
      layout: 'ecosystem', title: '18 How Do Standards, Regulators, Technology and Service Partners Shape Delivery?', kicker: '',
      center: { label: 'Project delivery', detail: 'Complementary capabilities, not one firm doing everything' },
      actors: [
        { label: 'Technology partners', relation: 'Supply power electronics and software', flows: ['product', 'information'] },
        { label: 'Local manufacturing', relation: 'Enclosures, integration and installation', flows: ['product', 'service'] },
        { label: 'Project consortiums', relation: 'EPC, utility and storage partners share scope', flows: ['money', 'risk'] },
        { label: 'Research', relation: 'Universities and laboratories test and develop', flows: ['information'] },
        { label: 'Workforce', relation: 'Skills transferred to local teams', flows: ['service'] },
        { label: 'Policy', relation: 'Standards and regulation set the rules', flows: ['oversight'] },
      ],
      note: 'Partnerships should include knowledge transfer, quality governance, testing, workforce development and commercial responsibility.',
      takeaway: 'Partnerships combine complementary capabilities without requiring every firm to build everything internally.',
    },
  },
};
