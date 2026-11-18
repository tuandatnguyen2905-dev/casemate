import type { MfgBuildingChapterVisual } from './mfgBuildingVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Building Materials & Coatings Module 03, keyed by visualKind. */
export const MFG_BUILDING_M3_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  'mfg-building-m3-1': {
    heading: 'Commodity scale and project supply earn money in different places',
    intro: 'A cement producer optimizes resource, kiln and freight economics; a project supplier wins by being specified and delivering the package. Each model sets its own investment, pricing power and risk.',
    spec: {
      layout: 'compare', title: '01 How Do Building-Materials Companies Make Money?', kicker: '',
      leftTitle: 'Commodity scale (e.g. cement, steel, glass)', rightTitle: 'Project supply (project packages)',
      rows: [
        { label: 'What is sold', a: 'Large volumes of a standard material', b: 'A package defined for one project' },
        { label: 'Where money is made', a: 'Resource, kiln and freight economics', b: 'Winning specification and delivering the package' },
        { label: 'Main investment', a: 'Heavy plant and resource access', b: 'Technical support and working capital' },
        { label: 'Pricing power', a: 'Limited; cost position decides', b: 'Stronger once the package is specified' },
        { label: 'Main risk', a: 'Construction cycles, input and energy costs', b: 'Project risk and working-capital strain' },
      ],
      note: 'Select the model that fits capital, capability, distribution, specification influence and working-capital capacity.',
      takeaway: 'Business-model choice determines investment, pricing power, customer ownership and risk.',
    },
  },
  'mfg-building-m3-2': {
    heading: 'Three ways to organise a building-materials business',
    intro: 'Some companies sell integrated systems, some specialise in branded products and some lead through distribution. Each needs different capital and capabilities.',
    spec: {
      layout: 'taxonomy', title: '02 How Do Integrated, Specialized and Distribution Models Differ?', kicker: '',
      root: 'Business-model families', rootDetail: 'Alternatives — a group can combine them, but each is managed differently',
      groups: [
        { label: 'Integrated systems', detail: 'Several compatible products sold as one solution', items: ['Project packages', 'Technical solutions', 'System compatibility'] },
        { label: 'Specialized branded products', detail: 'Brand and formulation create preference', items: ['Branded paints', 'Tiles', 'Construction chemicals'] },
        { label: 'Distribution-led', detail: 'Reach and availability win the sale', items: ['Dealer demand', 'Stock and delivery', 'Trade credit'] },
      ],
      note: 'A coatings company invests in formulation, dealer demand and technical service; an integrated supplier must also manage how its products work together.',
      takeaway: 'Business-model choice determines investment, pricing power, customer ownership and risk.',
    },
  },
  'mfg-building-m3-3': {
    heading: 'Who owns the customer changes from model to model',
    intro: 'Commodity, branded, private-label, specialty, project and solution models differ in where pricing power comes from and who controls the customer relationship.',
    spec: {
      layout: 'table', title: '03 How Do Commodity, Branded, Project and Solution Models Compare?', kicker: '',
      headers: ['Model', 'Pricing power rests on', 'Who owns the customer'],
      rows: [
        { label: 'Commodity', a: 'Cost position and freight reach', b: 'Buyer, comparing price and availability' },
        { label: 'Branded', a: 'Brand preference and dealer demand', b: 'Manufacturer, through its brand' },
        { label: 'Private label', a: 'Contract production efficiency', b: 'The brand owner, not the producer' },
        { label: 'Specialty formulation', a: 'Formulation and tested performance', b: 'Manufacturer, through technical service' },
        { label: 'Project', a: 'Specification and package delivery', b: 'Developer or contractor on the project' },
        { label: 'Solution', a: 'Solving a defined technical problem', b: 'Shared with specifiers and applicators' },
      ],
      note: 'Define product scope, application, project and geography before comparing models.',
      takeaway: 'Business-model choice determines investment, pricing power, customer ownership and risk.',
    },
  },
  'mfg-building-m3-4': {
    heading: 'The portfolio splits into structural, envelope, finishing and specialty segments',
    intro: 'Building materials range from cement and steel to paints and repair systems. Customers judge each segment through different specifications, economics and service needs.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Structural, Finishing and Specialty Materials Segmented?', kicker: '',
      root: 'Building-materials segments', rootDetail: 'Categories, judged on different criteria',
      groups: [
        { label: 'Structural materials', detail: 'Bulk, specification-grade materials', items: ['Cement', 'Concrete', 'Steel', 'Aggregates'] },
        { label: 'Envelope', detail: 'Enclose and insulate the building', items: ['Glass', 'Insulation'] },
        { label: 'Finishing', detail: 'Appearance and everyday use', items: ['Architectural coatings', 'Tiles', 'Sanitary ware'] },
        { label: 'Specialty systems', detail: 'Technical, application-sensitive', items: ['Waterproofing', 'Sealants', 'Adhesives', 'Repair systems'] },
      ],
      note: 'Build category portfolios around relevant channels, tests, site conditions and customer willingness to pay.',
      takeaway: 'Customers judge each segment through different specifications, economics and service needs.',
    },
  },
  'mfg-building-m3-5': {
    heading: 'A commodity grade is bought on spec and price; a differentiated product must prove system performance',
    intro: 'Commodity cement is selected differently from a chemical-resistant coating whose substrate, preparation and system performance need validation.',
    spec: {
      layout: 'compare', title: '05 How Do Commodity Grades and Differentiated Products Compare?', kicker: '',
      leftTitle: 'Commodity grade (e.g. cement)', rightTitle: 'Differentiated product (e.g. protective coating)',
      rows: [
        { label: 'Selection basis', a: 'Grade, price and availability', b: 'Substrate, preparation and system performance' },
        { label: 'Proof required', a: 'Conformity to the stated grade', b: 'Validation of the whole system' },
        { label: 'Service need', a: 'Reliable delivery', b: 'Technical support on site' },
        { label: 'Economics', a: 'Scale and freight', b: 'Willingness to pay for performance' },
      ],
      note: 'Envelope and insulation products also depend on tests and site conditions, not price alone.',
      takeaway: 'Customers judge each segment through different specifications, economics and service needs.',
    },
  },
  'mfg-building-m3-6': {
    heading: 'Technical service adds value at each step from substrate to validated result',
    intro: 'Construction chemicals and finishing systems only perform when substrate, preparation and application are right, so technical service is part of what the customer buys.',
    spec: {
      layout: 'flow', title: '06 How Do Technical Services and System Solutions Add Value?', kicker: '',
      steps: [
        { label: 'Assess substrate and site', detail: 'Condition, moisture and exposure', owner: 'Technical service' },
        { label: 'Specify a compatible system', detail: 'Construction chemicals plus finish', owner: 'Manufacturer and specifier' },
        { label: 'Prepare the surface', detail: 'Preparation decides adhesion and life', owner: 'Applicator' },
        { label: 'Apply with site support', detail: 'Trained application, correct conditions', owner: 'Applicator with technical service' },
        { label: 'Validate system performance', detail: 'Interior finish or protection works as specified', kind: 'outcome', owner: 'Customer' },
      ],
      loop: 'Field results feed back into tests, instructions and the category portfolio.',
      takeaway: 'Customers judge each segment through different specifications, economics and service needs.',
    },
  },
  'mfg-building-m3-7': {
    heading: 'Different people specify, buy, install and maintain the same product',
    intro: 'An architect may specify fire or thermal performance while a contractor focuses on installation reliability and schedule. A homeowner renovating weighs appearance and price.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases Building Materials and Coatings?', kicker: '',
      root: 'Roles in the purchase decision', rootDetail: 'One person can hold several roles',
      groups: [
        { label: 'Specifiers', detail: 'Set fire or thermal performance', items: ['Architects', 'Engineers'] },
        { label: 'Home-renovation buyers', detail: 'Appearance, price and availability', items: ['Homeowners', 'Small renovators'] },
        { label: 'Installers', detail: 'Installation reliability and schedule', items: ['Contractors', 'Applicators'] },
        { label: 'Users and maintainers', detail: 'Lifecycle and low maintenance', items: ['Occupants', 'Building owners'] },
      ],
      note: 'Align product, samples, credit, technical documents, delivery and field support to the decision chain.',
      takeaway: 'Manufacturers must understand who specifies, buys, installs, uses and maintains the product.',
    },
  },
  'mfg-building-m3-8': {
    heading: 'Each customer type needs a different mix of product, documents and support',
    intro: 'Contractors, developers, specifiers, dealers and industrial users weigh appearance, price, availability, application, delivery, lifecycle, documentation and technical resistance differently.',
    spec: {
      layout: 'table', title: '08 How Do Contractors, Developers, Specifiers and Dealers Differ?', kicker: '',
      headers: ['Customer type', 'Main priority', 'What the manufacturer provides'],
      rows: [
        { label: 'Contractors', a: 'Installation reliability and schedule', b: 'Samples, delivery and field support' },
        { label: 'Developers', a: 'Price, appearance and delivery', b: 'Credit and dependable supply' },
        { label: 'Specifiers', a: 'Fire or thermal performance', b: 'Technical documents' },
        { label: 'Dealers', a: 'Availability and margin', b: 'Stock, credit and demand support' },
        { label: 'Industrial users', a: 'Technical resistance and lifecycle', b: 'Documentation and field support' },
      ],
      note: 'Map the full decision chain before setting price, samples or credit terms.',
      takeaway: 'Manufacturers must understand who specifies, buys, installs, uses and maintains the product.',
    },
  },
  'mfg-building-m3-9': {
    heading: 'A purchase decision breaks down into price, performance, logistics and support',
    intro: 'Developers and distributors rarely decide on price alone; availability, delivery, documentation and field support also shape what gets bought.',
    spec: {
      layout: 'driverTree', title: '09 How Do Price, Performance, Logistics and Support Shape Purchasing?', kicker: '',
      root: { label: 'Purchase decision', detail: 'What a developer or distributor commits to' },
      drivers: [
        { label: 'Price', detail: 'Delivered cost to the buyer', children: [{ label: 'Product price' }, { label: 'Credit terms' }] },
        { label: 'Performance', detail: 'Fit to the application', children: [{ label: 'Technical resistance' }, { label: 'Appearance' }, { label: 'Lifecycle' }] },
        { label: 'Logistics', detail: 'Getting it to site on time', children: [{ label: 'Availability' }, { label: 'Delivery' }] },
        { label: 'Support', detail: 'Help to specify and install', children: [{ label: 'Samples and documents' }, { label: 'Field support' }] },
      ],
      note: 'Distributors weigh availability and credit heavily because they hold the stock.',
      takeaway: 'Manufacturers must understand who specifies, buys, installs, uses and maintains the product.',
    },
  },
  'mfg-building-m3-10': {
    heading: 'From revenue to operating result in a hypothetical 1,000-tonne sale',
    intro: 'HYPOTHETICAL — selling 1,000 tonnes at USD100 produces USD100,000 revenue; variable cost and fixed-cost allocation then reduce it to the operating result.',
    spec: {
      layout: 'waterfall', title: '10 How Do Building-Materials Manufacturers Generate Revenue?', kicker: H,
      unit: 'USD', basis: `${H}: 1,000 tonnes at USD100 per tonne; USD60 variable cost per tonne; USD20,000 fixed-cost allocation`,
      items: [
        { label: 'Revenue', value: 100000, kind: 'start' },
        { label: 'Variable cost', value: 60000, kind: 'subtract' },
        { label: 'Contribution', value: 0, kind: 'total' },
        { label: 'Fixed-cost allocation', value: 20000, kind: 'subtract' },
        { label: 'Operating result', value: 0, kind: 'total' },
      ],
      note: 'Revenue can come from product sales, volume contracts, project supply, dealer sales, specialty products and technical service. Order, shipment, revenue, cash and profit remain separate; do not present hypothetical prices or costs as market data.',
      takeaway: 'Selling 1,000 tonnes at USD100 produces USD100,000 revenue; after USD60 variable cost per tonne and USD20,000 fixed-cost allocation the operating result is USD20,000 (hypothetical).',
    },
  },
  'mfg-building-m3-11': {
    heading: 'Lower utilization spreads the same fixed plant cost over fewer tonnes',
    intro: 'HYPOTHETICAL — USD1.2m annual fixed plant cost is USD12 per tonne at 100,000 tonnes but USD20 per tonne at 60,000 tonnes. Move the sliders to see the effect.',
    spec: {
      layout: 'scenario', title: '11 What Determines Plant, Product and Distribution Costs?', kicker: H,
      inputs: [
        { key: 'fixed', label: 'Annual fixed plant cost', min: 0.6, max: 2.4, step: 0.1, value: 1.2, unit: 'USD m' },
        { key: 'tonnes', label: 'Tonnes produced per year', min: 40000, max: 120000, step: 10000, value: 100000, unit: 'tonnes' },
      ],
      outputs: [
        { label: 'Fixed cost per tonne', unit: 'USD/tonne', digits: 1, compute: (v) => (v.fixed * 1000000) / v.tonnes },
      ],
      assumption: `${H}. Illustrative inputs, not market data; product mix and all other costs kept constant.`,
      note: 'Other cost drivers: raw materials, energy and fuel, labor, maintenance, depreciation, packaging, freight, quality and environment, and working capital. Separate rated, practical and utilized capacity.',
      takeaway: 'USD1.2m annual fixed plant cost is USD12 per tonne at 100,000 tonnes but USD20 per tonne at 60,000 tonnes, holding mix and other assumptions constant (hypothetical).',
    },
  },
  'mfg-building-m3-12': {
    heading: 'Profitability KPIs trace back to volume, price, unit cost and capital',
    intro: 'KPIs need product-appropriate units and aligned scopes. Each one explains a different part of margin and return.',
    spec: {
      layout: 'driverTree', title: '12 Which KPIs Drive Building-Materials Profitability?', kicker: '',
      root: { label: 'Profitability', detail: 'Gross and EBITDA margin, ROIC' },
      formula: 'Gross contribution = price − variable cost per unit',
      drivers: [
        { label: 'Volume', detail: 'How much is made and sold', children: [{ label: 'Capacity utilization' }, { label: 'Production and sales volume' }] },
        { label: 'Price', detail: 'Realised selling price', children: [{ label: 'ASP' }] },
        { label: 'Unit cost', detail: 'Cost to make each unit', children: [{ label: 'Cost per unit' }, { label: 'Energy per unit' }, { label: 'Yield' }, { label: 'Scrap and rework' }, { label: 'OEE', detail: 'Only where the process fits' }] },
        { label: 'Capital and service', detail: 'Capital tied up to deliver', children: [{ label: 'Inventory turnover' }, { label: 'OTD' }, { label: 'Capital intensity' }] },
      ],
      note: 'HYPOTHETICAL: at USD100 price and USD60 variable cost including USD20 energy, a 25% energy-price rise adds USD5 and cuts contribution from USD40 to USD35; a USD3 price increase restores it to USD38. Never rank tonnes, cubic meters, square meters and liters together.',
      takeaway: 'A 25% energy-price rise on USD20 energy cost cuts contribution from USD40 to USD35, and a USD3 price increase restores it to USD38 (hypothetical).',
    },
  },
  'mfg-building-m3-13': {
    heading: 'Winning a project runs from discovery to site support',
    intro: 'Online data can support discovery, but a specified waterproofing system still needs stock, delivery, trained application and site support.',
    spec: {
      layout: 'flow', title: '13 How Do Manufacturers Acquire Projects and Customers?', kicker: '',
      steps: [
        { label: 'Discovery', detail: 'Online data and technical content', owner: 'Manufacturer marketing' },
        { label: 'Specification', detail: 'Product written into the project', owner: 'Technical sales with specifiers' },
        { label: 'Project procurement', detail: 'Direct project terms agreed', owner: 'Developer or contractor' },
        { label: 'Supply from plant or depot', detail: 'Bulk logistics, stock and delivery', owner: 'Manufacturer or dealer' },
        { label: 'Trained application and site support', detail: 'Turns the order into a working result', kind: 'outcome', owner: 'Contractor with technical service' },
      ],
      loop: 'Delivered projects and trained contractors make the next specification easier to win.',
      takeaway: 'Distribution is a strategic system for availability, credit, service and customer influence.',
    },
  },
  'mfg-building-m3-14': {
    heading: 'Products leave the plant through several alternative channels',
    intro: 'Heavy materials move through regional plants and depots; from there, dealers, wholesalers, retail, e-commerce and direct technical sales each reach different buyers.',
    spec: {
      layout: 'pathway', title: '14 How Do Dealers, Distributors, Retail and Direct B2B Channels Work?', kicker: '',
      trunk: [
        { label: 'Manufacturing plant', detail: 'Regional for heavy materials' },
        { label: 'Depots and local inventory', detail: 'Availability close to demand' },
      ],
      optionsLabel: 'Channels to the buyer — alternatives, often used together',
      options: [
        { label: 'Dealer networks', detail: 'Local stock, credit and contractor relationships' },
        { label: 'Wholesalers and specialists', detail: 'Breadth of range and category expertise' },
        { label: 'Retail', detail: 'Renovation and smaller buyers' },
        { label: 'E-commerce and digital discovery', detail: 'Product data and online selection' },
        { label: 'Direct B2B technical sales', detail: 'Projects and industrial users' },
      ],
      note: 'Combine local inventory and dealers with technical content, contractor training and disciplined channel economics.',
      takeaway: 'Distribution is a strategic system for availability, credit, service and customer influence.',
    },
  },
  'mfg-building-m3-15': {
    heading: 'A specification only becomes demand if the channel can deliver it',
    intro: 'Showrooms and specification work create preference, but a specified system still needs stock, delivery, trained application and site support.',
    spec: {
      layout: 'decision', title: '15 How Do Specification Selling and Product Approval Influence Demand?', kicker: '',
      root: { label: 'Product shown and specified', detail: 'Via showroom, samples or technical sales' },
      question: 'Is it approved for the project and supported by stock, delivery and trained application?',
      branches: [
        { condition: 'Approved and fully supported', outcome: 'Specification converts into demand', detail: 'Buyer orders the named product', tone: 'positive' },
        { condition: 'Approved but not stocked or supported locally', outcome: 'Substitution risk on site', detail: 'Contractor may switch products', tone: 'caution' },
        { condition: 'Not specified or approved', outcome: 'Competes mainly on price and availability', tone: 'negative' },
      ],
      note: 'Showrooms influence selection; they do not replace channel availability or site support.',
      takeaway: 'Distribution is a strategic system for availability, credit, service and customer influence.',
    },
  },
  'mfg-building-m3-16': {
    heading: 'Manufacturers sit inside a wide network of specifiers, builders and overseers',
    intro: 'Producers coordinate with chemicals firms, distributors, architects, engineers, contractors, developers, laboratories, regulators, finance and recyclers.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Building-Materials Ecosystem?', kicker: '',
      center: { label: 'Manufacturer', detail: 'Produces the material or coating' },
      actors: [
        { label: 'Chemicals firms', relation: 'Supply raw materials and additives', flows: ['product', 'money'] },
        { label: 'Distributors', relation: 'Stock, sell and extend credit', flows: ['product', 'money'] },
        { label: 'Architects and engineers', relation: 'Specify performance', flows: ['information'] },
        { label: 'Contractors', relation: 'Install and apply', flows: ['product', 'service'] },
        { label: 'Developers', relation: 'Commission and pay for projects', flows: ['money'] },
        { label: 'Laboratories and regulators', relation: 'Test and set rules', flows: ['oversight', 'information'] },
        { label: 'Finance', relation: 'Fund plants and projects', flows: ['money', 'risk'] },
        { label: 'Recyclers', relation: 'Recover materials at end of life', flows: ['product'] },
      ],
      note: 'A coating can meet factory specification yet fail because the substrate, preparation, environment or curing was unsuitable.',
      takeaway: 'Installed performance depends on the construction ecosystem, not the product in isolation.',
    },
  },
  'mfg-building-m3-17': {
    heading: 'Accountability passes along a chain from specification to maintenance',
    intro: 'Manufacturers, specifiers, contractors and developers each own a step. Feedback and accountability have to run across the whole chain.',
    spec: {
      layout: 'flow', title: '17 How Do Manufacturers, Contractors, Developers and Specifiers Collaborate?', kicker: '',
      steps: [
        { label: 'Specification', detail: 'Performance and product set', owner: 'Architects and engineers' },
        { label: 'Sale', detail: 'Product, terms and documents', owner: 'Manufacturer or dealer' },
        { label: 'Delivery', detail: 'Right product, on time, in condition', owner: 'Manufacturer and suppliers' },
        { label: 'Installation', detail: 'Substrate, preparation and curing', owner: 'Contractor' },
        { label: 'Inspection', detail: 'Checks against the specification', owner: 'Developer, labs or regulators' },
        { label: 'Maintenance', detail: 'Keeps the installed result working', kind: 'outcome', owner: 'Building owner' },
      ],
      loop: 'Inspection and maintenance findings flow back to specification and product design.',
      takeaway: 'Installed performance depends on the construction ecosystem, not the product in isolation.',
    },
  },
  'mfg-building-m3-18': {
    heading: 'Installed performance depends on more than the product leaving the factory',
    intro: 'A coating can meet factory specification yet fail because the substrate, preparation, environment or curing was unsuitable. Suppliers, labs, regulators, logistics and contractors all affect the result.',
    spec: {
      layout: 'driverTree', title: '18 How Do Suppliers, Laboratories, Regulators and Logistics Partners Shape Delivery?', kicker: '',
      root: { label: 'Installed performance', detail: 'What the building owner actually gets' },
      drivers: [
        { label: 'Product as made', detail: 'Inputs and factory control', children: [{ label: 'Supplier inputs' }, { label: 'Laboratory testing' }] },
        { label: 'Delivery', detail: 'Logistics partners', children: [{ label: 'Stock availability' }, { label: 'Condition on arrival' }] },
        { label: 'Site application', detail: 'Contractors', children: [{ label: 'Substrate' }, { label: 'Preparation' }, { label: 'Curing' }] },
        { label: 'Environment', detail: 'Site conditions during and after application' },
        { label: 'Oversight and end of life', detail: 'Regulators and recovery partners', children: [{ label: 'Rules and inspection' }, { label: 'Recovery and recycling' }] },
      ],
      note: 'Build feedback and accountability across specification, sale, delivery, installation, inspection and maintenance.',
      takeaway: 'Installed performance depends on the construction ecosystem, not the product in isolation.',
    },
  },
};
