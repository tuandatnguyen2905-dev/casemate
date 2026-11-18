import type { MfgPackagingChapterVisual } from './mfgPackagingVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Packaging, Labels & Industrial Materials Module 03 (business models, products and segmentation, customers, revenue and cost, channels, ecosystem), keyed by visualKind. */
export const MFG_PACKAGING_M3_VISUALS: Record<string, MfgPackagingChapterVisual> = {
  'mfg-packaging-m3-1': {
    heading: 'Contract conversion and specialty materials earn money in different ways',
    intro: 'Some companies manufacture to customer specifications; others sell proprietary labels, films, adhesives and security features. Many combine both with design, testing and support.',
    spec: {
      layout: 'compare', title: '01 How Do Packaging and Label Companies Make Money?', kicker: '',
      leftTitle: 'Contract conversion', rightTitle: 'Specialty materials',
      rows: [
        { label: 'What is sold', a: 'B2B manufacturing to customer specifications', b: 'Proprietary labels, films, adhesives and security features' },
        { label: 'Who sets the spec', a: 'Mainly the customer', b: 'Supplier develops it, customer validates it' },
        { label: 'Value added', a: 'Reliable conversion, stocking and delivery', b: 'Design, testing and troubleshooting' },
        { label: 'Main requirement', a: 'Efficient, repeatable production', b: 'Repeat demand that funds testing and support' },
      ],
      note: 'Example: a qualified protective-film supplier combines material, precision slitting, line trials, stocking and technical response.',
      takeaway: 'Differentiation is strongest when products and services solve validated customer production or compliance problems.',
    },
  },
  'mfg-packaging-m3-2': {
    heading: 'Repeat supply is the base; integrated services are added on top',
    intro: 'A supplier first earns repeat orders for a qualified material. It can then add services such as line trials, stocking and technical response that make it harder to replace.',
    spec: {
      layout: 'pathway', title: '02 How Do Integrated Producers, Converters and Contract Manufacturers Differ?', kicker: '',
      trunk: [
        { label: 'Qualified material', detail: 'Film, label or adhesive approved by the customer' },
        { label: 'Precision conversion', detail: 'Slitting and converting to the customer specification' },
        { label: 'Repeat supply', detail: 'Recurring orders against agreed specifications', kind: 'outcome' },
      ],
      optionsLabel: 'Integrated services a supplier may add — options, not steps',
      options: [
        { label: 'Line trials', detail: 'Proves performance on the customer line' },
        { label: 'Stocking', detail: 'Holds inventory close to demand' },
        { label: 'Technical response', detail: 'Troubleshoots problems in production' },
        { label: 'Design and testing', detail: 'Develops and validates new formats' },
      ],
      note: 'Build R&D and service only where repeat customer demand supports testing, support and working-capital requirements.',
      takeaway: 'Integrated services pay off when they solve validated customer production or compliance problems on top of reliable repeat supply.',
    },
  },
  'mfg-packaging-m3-3': {
    heading: 'Four business models differ in what the customer buys and what the supplier must prove',
    intro: 'Volume, custom, specialty and design-to-manufacture models sit side by side. Branded products and qualified partnerships are two ways to defend margin.',
    spec: {
      layout: 'table', title: '03 How Do Volume, Custom, Specialty and Design-to-Manufacture Models Compare?', kicker: '',
      headers: ['Model', 'What the customer buys', 'What it depends on'],
      rows: [
        { label: 'Volume', a: 'Standard formats in repeat quantities', b: 'Efficient conversion and low cost' },
        { label: 'Custom', a: 'Products made to its own specification', b: 'Accurate specifications and approvals' },
        { label: 'Specialty', a: 'Branded labels, films, adhesives, security features', b: 'Testing and validated performance' },
        { label: 'Design-to-manufacture', a: 'Design, testing and production together', b: 'A qualified partnership and repeat demand' },
      ],
      note: 'Models can coexist in one company; R&D and service should follow repeat customer demand.',
      takeaway: 'Differentiation is strongest when branded products or qualified partnerships solve validated customer production or compliance problems.',
    },
  },
  'mfg-packaging-m3-4': {
    heading: 'Packaging products group into material and format families',
    intro: 'Corrugated, cartons, pouches, bottles, labels, tapes and engineered substrates belong to different families. Each family has its own tests, economics and risks.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Packaging Products Segmented by Material and Format?', kicker: '',
      root: 'Packaging and related products', rootDetail: 'Families by material and format — segment further by function and application',
      groups: [
        { label: 'Paper packaging', items: ['Corrugated', 'Cartons', 'Bags'] },
        { label: 'Flexible packaging', items: ['Pouches', 'Films'] },
        { label: 'Rigid packaging', items: ['Bottles', 'Trays', 'Closures'] },
        { label: 'Labels and identification', items: ['Decorative labels', 'Logistics labels'] },
        { label: 'Industrial materials', items: ['Tapes', 'Liners', 'Engineered substrates'] },
      ],
      note: 'A food-contact pouch, shipping carton and electronics protective film are all packaging-related but have different tests, economics and risks.',
      takeaway: 'Products should be segmented by function and application rather than material alone.',
    },
  },
  'mfg-packaging-m3-5': {
    heading: 'Standard, customized and performance products need different proof',
    intro: 'A shipping carton, a printed food-contact pouch and an electronics protective film or tape are tested and priced differently.',
    spec: {
      layout: 'table', title: '05 How Do Standard, Customized and Performance Products Differ?', kicker: '',
      headers: ['Product type', 'Example', 'What must be proven'],
      rows: [
        { label: 'Standard', a: 'Shipping carton', b: 'Protection and dimensions at competitive cost' },
        { label: 'Customized', a: 'Printed food-contact flexible pouch', b: 'Hygiene, print and barrier' },
        { label: 'Performance', a: 'Electronics protective film or industrial tape', b: 'Adhesive, precision and customer qualification' },
      ],
      note: 'Select applications aligned with equipment, hygiene, print, adhesive, barrier, precision and customer qualification capability.',
      takeaway: 'Products should be segmented by function and application rather than material alone.',
    },
  },
  'mfg-packaging-m3-6': {
    heading: 'Printing, labels, engineering and technical services each add value beyond the substrate',
    intro: 'Rigid packs and specialty films and laminates earn more when the supplier adds print, identification, engineered performance and technical support.',
    spec: {
      layout: 'driverTree', title: '06 How Do Printing, Labels, Engineering and Technical Services Add Value?', kicker: '',
      root: { label: 'Value beyond the substrate', detail: 'What the customer pays for on top of the material' },
      drivers: [
        { label: 'Printing', detail: 'Appearance and brand information', children: [{ label: 'Decorative print' }, { label: 'Print quality' }] },
        { label: 'Labels', detail: 'Identification on the pack', children: [{ label: 'Decorative labels' }, { label: 'Logistics labels' }] },
        { label: 'Engineering', detail: 'Functional performance', children: [{ label: 'Barrier' }, { label: 'Specialty films and laminates' }] },
        { label: 'Technical services', detail: 'Fit with the customer process', children: [{ label: 'Testing' }, { label: 'Customer qualification' }] },
      ],
      note: 'Rigid packaging and specialty films and laminates carry different tests, economics and risks.',
      takeaway: 'Products should be segmented by function and application rather than material alone, because services change what the customer actually buys.',
    },
  },
  'mfg-packaging-m3-7': {
    heading: 'Buyers range from consumer brands to factories and exporters',
    intro: 'Buyers range from visual consumer packs to regulated labels, sensitive-component protection, transport packaging and manufacturing materials.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases Packaging, Labels and Industrial Materials?', kicker: '',
      root: 'Buyers of packaging, labels and materials', rootDetail: 'Customer segments — each buys for a different reason',
      groups: [
        { label: 'Food and beverage', detail: 'Visual consumer packs' },
        { label: 'Personal care', detail: 'Branded consumer packs' },
        { label: 'Healthcare', detail: 'Regulated labels' },
        { label: 'Electronics', detail: 'Sensitive-component protection' },
        { label: 'Logistics and exports', detail: 'Transport packaging' },
        { label: 'Industrial production', detail: 'Manufacturing materials' },
      ],
      note: 'Map qualification, documentation, line trials, forecast, inventory and complaint response by customer segment.',
      takeaway: 'Customer value depends on product risk, brand requirements and the operational failures packaging prevents.',
    },
  },
  'mfg-packaging-m3-8': {
    heading: 'Each segment values packaging for the failure it prevents',
    intro: 'A healthcare label emphasizes accuracy and traceability, while an industrial buyer may prioritize adhesion, tolerance and supply continuity.',
    spec: {
      layout: 'table', title: '08 How Do FMCG, Healthcare, Electronics and Industrial Needs Differ?', kicker: '',
      headers: ['Segment', 'What the buyer emphasizes', 'Failure it wants to prevent'],
      rows: [
        { label: 'FMCG and personal care', a: 'Visual appeal and brand requirements', b: 'A pack that weakens the brand on shelf' },
        { label: 'Healthcare', a: 'Accuracy and traceability', b: 'Wrong or untraceable labelling' },
        { label: 'Electronics', a: 'Sensitive-component protection', b: 'Damaged components' },
        { label: 'Industrial production', a: 'Adhesion, tolerance and supply continuity', b: 'Interrupted manufacturing' },
      ],
      note: 'Map qualification, documentation, line trials, forecast, inventory and complaint response by segment.',
      takeaway: 'Customer value depends on product risk, brand requirements and the operational failures packaging prevents.',
    },
  },
  'mfg-packaging-m3-9': {
    heading: 'Five purchasing criteria combine into one supplier decision',
    intro: 'Healthcare and export buyers weigh cost against MOQ, lead time, quality and compliance. Each criterion links to supplier work such as documentation, line trials or inventory.',
    spec: {
      layout: 'driverTree', title: '09 How Do Cost, MOQ, Lead Time, Quality and Compliance Shape Purchasing?', kicker: '',
      root: { label: 'Purchasing decision', detail: 'Which supplier and format the buyer approves' },
      drivers: [
        { label: 'Cost', detail: 'Price of the accepted product' },
        { label: 'MOQ', detail: 'Minimum quantity per order', children: [{ label: 'Forecast' }, { label: 'Inventory' }] },
        { label: 'Lead time', detail: 'Speed and reliability of supply', children: [{ label: 'Stock position' }, { label: 'Logistics and exports' }] },
        { label: 'Quality', detail: 'Consistent performance', children: [{ label: 'Line trials' }, { label: 'Complaint response' }] },
        { label: 'Compliance', detail: 'Evidence the product meets requirements', children: [{ label: 'Qualification' }, { label: 'Documentation' }] },
      ],
      note: 'A healthcare label emphasizes accuracy and traceability; weightings differ by segment.',
      takeaway: 'Customer value depends on product risk, brand requirements and the operational failures packaging prevents.',
    },
  },
  'mfg-packaging-m3-10': {
    heading: 'How USD20,000 of order revenue becomes USD5,000 contribution',
    intro: 'A hypothetical order of 100,000 accepted packs at USD0.20 each. Material, production waste and conversion cost are deducted to show contribution.',
    spec: {
      layout: 'waterfall', title: '10 How Do Packaging Manufacturers Generate Revenue?', kicker: H,
      unit: 'USD', basis: 'HYPOTHETICAL — 100,000 accepted packs at USD0.20 each',
      items: [
        { label: 'Order revenue', value: 20000, kind: 'start' },
        { label: 'Material input', value: 9000, kind: 'subtract' },
        { label: 'Production waste', value: 1000, kind: 'subtract' },
        { label: 'Conversion cost', value: 5000, kind: 'subtract' },
        { label: 'Contribution', value: 5000, kind: 'total' },
      ],
      note: `${H}. Contribution margin = 5,000 / 20,000 = 25%. Revenue can also come from custom orders, conversion fees, tooling and setup, design services and supply agreements when contractually chargeable. Do not present illustrative prices or costs as company or market benchmarks.`,
      takeaway: 'Revenue only becomes contribution after material, waste and conversion cost are covered — every chargeable item must be in the contract.',
    },
  },
  'mfg-packaging-m3-11': {
    heading: 'Material utilization and defects decide the cost of each accepted unit',
    intro: 'Hypothetical example: 10,000 input units at 90% material utilization and 2% defects give 8,820 accepted units. Spreading USD900 of conversion cost over them costs about USD0.102 each.',
    spec: {
      layout: 'scenario', title: '11 What Determines Packaging Conversion Cost?', kicker: H,
      inputs: [
        { key: 'input', label: 'Input units', min: 5000, max: 20000, step: 500, value: 10000, unit: 'units' },
        { key: 'util', label: 'Material utilization', min: 70, max: 100, step: 1, value: 90, unit: '%' },
        { key: 'defect', label: 'Defects on produced units', min: 0, max: 10, step: 0.5, value: 2, unit: '%' },
        { key: 'cost', label: 'Total conversion cost', min: 300, max: 1500, step: 50, value: 900, unit: 'USD' },
      ],
      outputs: [
        { label: 'Produced units', unit: 'units', digits: 0, compute: (v) => (v.input * v.util) / 100 },
        { label: 'Accepted units', unit: 'units', digits: 0, compute: (v) => ((v.input * v.util) / 100) * (1 - v.defect / 100) },
        { label: 'Cost per accepted unit', unit: 'USD', digits: 3, compute: (v) => v.cost / (((v.input * v.util) / 100) * (1 - v.defect / 100)) },
      ],
      assumption: `${H}. Illustrative inputs, not market data. Conversion cost stands for substrate, ink and adhesive, labor, energy, depreciation, tooling and setup, scrap, quality, maintenance, warehousing and freight.`,
      note: 'Separate material loss, defective output and accepted output when costing yield and quality.',
      takeaway: 'Cost must be divided by accepted output, not input, so material loss and defects raise the real cost of every good unit.',
    },
  },
  'mfg-packaging-m3-12': {
    heading: 'A fixed USD600 setup weighs far more on a 5,000-unit run than on a 20,000-unit run',
    intro: 'Hypothetical example: USD600 of setup costs USD0.03 per unit over 20,000 units but USD0.12 over 5,000 units, before material or run cost. This is why MOQs and short-run prices exist.',
    spec: {
      layout: 'scenario', title: '12 Which KPIs Drive Packaging Manufacturing Profitability?', kicker: H,
      inputs: [
        { key: 'setup', label: 'Setup and changeover cost', min: 200, max: 1200, step: 50, value: 600, unit: 'USD' },
        { key: 'run', label: 'Run length', min: 2000, max: 40000, step: 1000, value: 20000, unit: 'units' },
      ],
      outputs: [
        { label: 'Setup cost per unit', unit: 'USD', digits: 3, compute: (v) => v.setup / v.run },
        { label: 'Setup cost per thousand units', unit: 'USD', digits: 1, compute: (v) => (v.setup / v.run) * 1000 },
      ],
      assumption: `${H}. Illustrative inputs, not market data; excludes material and run cost.`,
      note: 'Other KPIs to state with product, process, unit and denominator: capacity and utilization, OEE, material utilization, yield and scrap, throughput, FPY and defects, ASP and margin, inventory and OTD, working capital.',
      takeaway: 'Shorter runs carry more setup cost per unit, so they need MOQ, short-run pricing or setup recovery to stay profitable.',
    },
  },
  'mfg-packaging-m3-13': {
    heading: 'Direct accounts and digital catalogs serve different kinds of buyer',
    intro: 'Large factories are served through negotiated contracts and account management. Smaller users can order through digital catalogs and electronic orders, and both need accurate digital data.',
    spec: {
      layout: 'compare', title: '13 How Do Packaging Manufacturers Acquire and Serve Customers?', kicker: '',
      leftTitle: 'Direct accounts', rightTitle: 'Digital catalogs',
      rows: [
        { label: 'Typical buyer', a: 'Large factories with negotiated contracts', b: 'Smaller users with fragmented demand' },
        { label: 'Technical complexity', a: 'High: specifications, proofing, forecasts', b: 'Lower: standard listed items' },
        { label: 'Customer control', a: 'Shared planning and traceability dashboards', b: 'Self-service electronic orders' },
        { label: 'Service cost', a: 'Account management per customer', b: 'Lower cost per order' },
      ],
      note: 'Combine account management for large factories with distributors for smaller users, with accurate digital data across both.',
      takeaway: 'Channels should balance customer control, technical complexity, fragmented demand and service cost.',
    },
  },
  'mfg-packaging-m3-14': {
    heading: 'The customer profile decides which sales channel fits',
    intro: 'Key accounts suit large technical buyers, while specialist distributors reach smaller users. Artwork approval only speeds things up when version control and authority are clear.',
    spec: {
      layout: 'decision', title: '14 How Do Direct B2B, Key Accounts, Distributors and Export Channels Work?', kicker: '',
      root: { label: 'New customer or order', detail: 'Size, technical complexity and location of demand' },
      question: 'Which channel serves this customer at an acceptable service cost?',
      branches: [
        { condition: 'Large factory, complex specification', outcome: 'Key account or direct B2B', detail: 'Negotiated contract, forecasts, digital proofing', tone: 'positive' },
        { condition: 'Smaller user, fragmented demand', outcome: 'Specialist distributor', detail: 'Wider reach at lower service cost', tone: 'positive' },
        { condition: 'Buyer abroad', outcome: 'Export channel', detail: 'Needs clear specifications and documentation', tone: 'caution' },
        { condition: 'Artwork authority unclear', outcome: 'Fix approval before production', detail: 'Align version control and specifications', tone: 'negative' },
      ],
      note: 'Digital artwork approval reduces delay only when version control, customer authority and production specifications are aligned.',
      takeaway: 'Channels should balance customer control, technical complexity, fragmented demand and service cost.',
    },
  },
  'mfg-packaging-m3-15': {
    heading: 'From technical sales to a planned supply agreement',
    intro: 'Technical sales turns a customer need into a specification. Qualification proves it, and integrated planning keeps supply running under the agreement.',
    spec: {
      layout: 'flow', title: '15 How Do Customer Specification, Qualification and Supply Agreements Work?', kicker: '',
      steps: [
        { label: 'Technical sales', detail: 'Understands the customer process and need', owner: 'Supplier' },
        { label: 'Customer specification', detail: 'Material, format and performance agreed', owner: 'Customer and supplier' },
        { label: 'Qualification', detail: 'Proofing, trials and documentation approved', kind: 'decision', owner: 'Customer' },
        { label: 'Supply agreement', detail: 'Negotiated contract terms', owner: 'Both' },
        { label: 'Integrated planning', detail: 'Forecasts, electronic orders, traceability dashboards', kind: 'outcome', owner: 'Both' },
      ],
      loop: 'Forecasts and order data feed the next planning cycle.',
      note: 'Digital artwork approval reduces delay only when version control, customer authority and production specifications are aligned.',
      takeaway: 'Channels should balance customer control, technical complexity, fragmented demand and service cost.',
    },
  },
  'mfg-packaging-m3-16': {
    heading: 'Converters sit between material producers, customers and end-of-life systems',
    intro: 'The packaging ecosystem includes paper mills, resin and chemical suppliers, converters, label firms, machinery providers, brands and factories. It also includes distributors, laboratories, regulators and recyclers.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Packaging Ecosystem?', kicker: '',
      center: { label: 'Converters and label firms', detail: 'Turn materials into packaging and labels' },
      actors: [
        { label: 'Paper mills', relation: 'Supply fiber-based materials', flows: ['product', 'money'] },
        { label: 'Resin and chemical suppliers', relation: 'Supply resins, inks and adhesives', flows: ['product', 'money'] },
        { label: 'Machinery providers', relation: 'Supply equipment and service', flows: ['product', 'service'] },
        { label: 'Brands and factories', relation: 'Customers that specify and pay', flows: ['money', 'information'] },
        { label: 'Distributors', relation: 'Reach smaller users', flows: ['product', 'money'] },
        { label: 'Laboratories', relation: 'Test and validate', flows: ['service', 'information'] },
        { label: 'Regulators', relation: 'Set rules such as Decree 110', flows: ['oversight'] },
        { label: 'Recyclers', relation: 'Recover used packaging', flows: ['product', 'risk'] },
      ],
      note: 'A recyclable redesign can fail if barrier performance, sealing, line speed, sorting or recycled-material markets are unsuitable.',
      takeaway: 'Industry upgrading depends on alignment across materials, production, customer requirements and end-of-life systems.',
    },
  },
  'mfg-packaging-m3-17': {
    heading: 'A new pack moves from material producer to customer line, with testing at each step',
    intro: 'Material producers, converters and printers, laboratories and customers must work together for a new structure to reach production. Regulators set the rules it must meet.',
    spec: {
      layout: 'flow', title: '17 How Do Material Producers, Converters, Printers and Customers Collaborate?', kicker: '',
      steps: [
        { label: 'Material supply', detail: 'Substrate, resin, ink and adhesive', owner: 'Material producers' },
        { label: 'Conversion and print', detail: 'Structure, sealing and print', owner: 'Converters and printers' },
        { label: 'Testing', detail: 'Barrier and performance checks', kind: 'decision', owner: 'Laboratories' },
        { label: 'Line trial', detail: 'Line speed and fit on the filling line', kind: 'decision', owner: 'Customers' },
        { label: 'Compliant production', detail: 'Meets regulatory requirements', kind: 'outcome', owner: 'All, under regulators' },
      ],
      loop: 'Customer co-development feeds trial results back to material and design choices.',
      note: 'Build partnerships for testing, skills, recycling feedstock, equipment, customer co-development and Decree 110 compliance.',
      takeaway: 'Industry upgrading depends on alignment across materials, production, customer requirements and end-of-life systems.',
    },
  },
  'mfg-packaging-m3-18': {
    heading: 'A recyclable redesign succeeds only if equipment, testing, rules and recycling all line up',
    intro: 'Equipment, testing, regulation, logistics and collection systems all affect whether a pack can be delivered and recovered. A weak link in any of them can stop a redesign.',
    spec: {
      layout: 'driverTree', title: '18 How Do Equipment, Testing, Regulators, Recyclers and Logistics Shape Delivery?', kicker: '',
      root: { label: 'Recyclable redesign that works', detail: 'Produced, delivered and recovered in practice' },
      drivers: [
        { label: 'Equipment and software', detail: 'Can the line run it?', children: [{ label: 'Sealing' }, { label: 'Line speed' }] },
        { label: 'Testing', detail: 'Does it still protect?', children: [{ label: 'Barrier performance' }] },
        { label: 'Regulators', detail: 'Does it meet the rules?', children: [{ label: 'Decree 110 compliance' }] },
        { label: 'Logistics', detail: 'Can it be delivered to the customer intact?' },
        { label: 'Collection and recycling', detail: 'Can it be recovered?', children: [{ label: 'Sorting' }, { label: 'Recycled-material markets' }] },
      ],
      note: 'A recyclable redesign can fail if barrier performance, sealing, line speed, sorting or recycled-material markets are unsuitable.',
      takeaway: 'Industry upgrading depends on alignment across materials, production, customer requirements and end-of-life systems.',
    },
  },
};
