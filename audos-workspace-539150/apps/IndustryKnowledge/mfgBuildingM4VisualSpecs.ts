import type { MfgBuildingChapterVisual } from './mfgBuildingVisualSpecs';

/** Chapter-specific Learning Visuals for Building Materials & Coatings Module 04, keyed by visualKind. */
export const MFG_BUILDING_M4_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  'mfg-building-m4-1': {
    heading: 'Commodity segments compete on cost and scale; specialty segments on tested performance',
    intro: 'Cement rivalry is regional and freight-sensitive; protective coatings can compete through tested system performance and application support.',
    spec: {
      layout: 'compare', title: '01 How Competitive Is Building Materials & Coatings?', kicker: '',
      leftTitle: 'Commodity segments (e.g. cement)', rightTitle: 'Specialty segments (e.g. protective coatings)',
      rows: [
        { label: 'Competes on', a: 'Cost, scale and utilization', b: 'Formulation, brand and service' },
        { label: 'Rivalry scope', a: 'Regional, limited by freight', b: 'Wherever performance is valued' },
        { label: 'Key assets', a: 'Fixed assets and resources', b: 'Technical know-how and certification' },
        { label: 'What wins orders', a: 'Delivered cost and availability', b: 'Tested system performance and application support' },
      ],
      note: 'Determine whether advantage comes from cost, location, utilization, brand, dealer coverage, specification or technical niche.',
      takeaway: 'Commodity segments compete through cost and scale while specialty segments add formulation, brand and service differentiation.',
    },
  },
  'mfg-building-m4-2': {
    heading: 'The five forces play out differently for heavy materials and specialty coatings',
    intro: 'Value-to-weight, regional freight and channel access change each force by product category, so the analysis has to be run per category.',
    spec: {
      layout: 'table', title: "02 How Do Porter's Five Forces Apply Across Product Categories?", kicker: '',
      headers: ['Force', 'Heavy commodity materials', 'Specialty coatings and systems'],
      rows: [
        { label: 'Rivalry', a: 'Regional and freight-sensitive', b: 'On tested performance and support' },
        { label: 'Threat of entry', a: 'Fixed assets and resource access deter it', b: 'Know-how, certification and trust deter it' },
        { label: 'Buyer power', a: 'Strong where grades are comparable', b: 'Weaker once a system is specified' },
        { label: 'Supplier power', a: 'Resource and energy inputs', b: 'Formulation raw materials' },
        { label: 'Channel access', a: 'Depots within freight reach', b: 'Dealer coverage and specification' },
      ],
      note: 'Low value-to-weight keeps heavy-material competition local; channels decide reach for packaged products.',
      takeaway: 'Commodity segments compete through cost and scale while specialty segments add formulation, brand and service differentiation.',
    },
  },
  'mfg-building-m4-3': {
    heading: 'Four kinds of barrier protect incumbents',
    intro: 'Entry is shaped by fixed assets, resources, technical know-how, certification, distribution and customer trust. These group into scale, location, brand and technical barriers.',
    spec: {
      layout: 'taxonomy', title: '03 What Creates Scale, Location, Brand and Technical Barriers?', kicker: '',
      root: 'Entry barriers', rootDetail: 'Types of barrier — their weight differs by category',
      groups: [
        { label: 'Scale', detail: 'Large fixed assets need high utilization', items: ['Fixed assets', 'Utilization'] },
        { label: 'Location', detail: 'Low value-to-weight favours nearby plants', items: ['Resource access', 'Regional freight'] },
        { label: 'Brand', detail: 'Preference built over time', items: ['Customer trust', 'Dealer coverage'] },
        { label: 'Technical', detail: 'Proof that the product performs', items: ['Know-how', 'Certification', 'Specification'] },
      ],
      takeaway: 'Commodity segments compete through cost and scale while specialty segments add formulation, brand and service differentiation.',
    },
  },
  'mfg-building-m4-4': {
    heading: 'Global participants fall into distinct types, with no single hierarchy',
    intro: 'Holcim and Saint-Gobain illustrate broad construction solutions; Sherwin-Williams, PPG and AkzoNobel illustrate coatings. Regional producers compete within their own categories.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Building-Materials Participants?', kicker: '',
      root: 'Types of global participant', rootDetail: 'Examples named in the chapter — not a ranking',
      groups: [
        { label: 'Broad construction solutions', detail: 'Diversified international groups', items: ['Holcim', 'Saint-Gobain'] },
        { label: 'Coatings specialists', detail: 'Paints and coatings portfolios', items: ['Sherwin-Williams', 'PPG', 'AkzoNobel'] },
        { label: 'Regional producers', detail: 'Compete within distinct product categories and geographies' },
      ],
      note: 'Benchmark only comparable products, geographies, customers and operating capabilities — not brand recognition alone.',
      takeaway: 'There is no unified hierarchy across cement, steel, systems, glass, ceramics and coatings.',
    },
  },
  'mfg-building-m4-5': {
    heading: 'Each category has its own specialists and its own comparison set',
    intro: 'Cement, steel, systems, glass and ceramics, and coatings are separate competitive arenas. The chapter names VICEM for cement, Hoa Phat for steel and Viglacera for glass and ceramics.',
    spec: {
      layout: 'table', title: '05 How Do Cement, Systems, Ceramics, Glass and Coatings Specialists Differ?', kicker: '',
      headers: ['Category', 'Example named in the chapter', 'Compare only with'],
      rows: [
        { label: 'Cement', a: 'VICEM', b: 'Cement producers in comparable geographies' },
        { label: 'Steel', a: 'Hoa Phat', b: 'Comparable steel products and customers' },
        { label: 'Construction systems', a: 'Holcim, Saint-Gobain', b: 'Comparable solution portfolios' },
        { label: 'Glass and ceramics', a: 'Viglacera', b: 'Comparable glass or ceramic products' },
        { label: 'Coatings', a: 'Sherwin-Williams, PPG, AkzoNobel', b: 'Comparable coatings applications' },
      ],
      note: 'Examples illustrate categories, not rank. A strong cement producer and a strong coatings company are not on one scale.',
      takeaway: 'There is no unified hierarchy across cement, steel, systems, glass, ceramics and coatings.',
    },
  },
  'mfg-building-m4-6': {
    heading: 'Judging influence in Vietnam needs like-for-like comparison, not brand recognition',
    intro: "Vietnam's market includes diversified international groups, coatings specialists, regional producers and Vietnamese manufacturers. Which ones matter depends on the product category being examined.",
    spec: {
      layout: 'decision', title: "06 Which Manufacturers Shape Vietnam's Market?", kicker: '',
      root: { label: 'A manufacturer active in Vietnam', detail: 'International group, specialist, regional or Vietnamese producer' },
      question: 'Is it being compared on comparable products, geographies, customers and operating capabilities?',
      branches: [
        { condition: 'Yes, like-for-like within one category', outcome: 'Benchmark its position in that category', tone: 'positive' },
        { condition: 'Categories mixed (e.g. cement with coatings)', outcome: 'Split by category before comparing', detail: 'No unified hierarchy exists across them', tone: 'caution' },
        { condition: 'Only brand recognition', outcome: 'Not enough evidence of market influence', tone: 'negative' },
      ],
      note: 'The chapter does not rank manufacturers in Vietnam.',
      takeaway: 'There is no unified hierarchy across cement, steel, systems, glass, ceramics and coatings.',
    },
  },
  'mfg-building-m4-7': {
    heading: 'A sound benchmark normalizes first, then links operations to returns',
    intro: 'Production volume alone can hide weak utilization, freight economics, quality, margin or cash conversion. Choose category-specific units and normalize before comparing.',
    spec: {
      layout: 'flow', title: '07 How Should Building-Materials Manufacturers Be Compared?', kicker: '',
      steps: [
        { label: 'Pick category and unit', detail: 'Category-specific, never mixed' },
        { label: 'Normalize', detail: 'Period, mix, region and application' },
        { label: 'Compare operations', detail: 'Capacity, utilization and unit cost' },
        { label: 'Link to customer value', detail: 'Delivery, retention and pricing' },
        { label: 'Connect to financial return', detail: 'Margin, capital and cash conversion', kind: 'outcome' },
      ],
      takeaway: 'Useful benchmarking connects operating performance to customer value and financial return.',
    },
  },
  'mfg-building-m4-8': {
    heading: 'Each benchmark area has its own measures and its own blind spot',
    intro: 'Capacity, cost, energy, quality, product performance and distribution are measured differently. Looking at volume alone hides most of them.',
    spec: {
      layout: 'table', title: '08 How Do Capacity, Cost, Energy, Quality and Distribution Differ?', kicker: '',
      headers: ['Benchmark area', 'Example measures', 'What volume alone hides'],
      rows: [
        { label: 'Capacity', a: 'Utilization of usable capacity', b: 'Idle or weakly used plant' },
        { label: 'Cost', a: 'Unit cost and freight', b: 'Weak freight economics' },
        { label: 'Energy', a: 'Energy and environmental intensity', b: 'Exposure to energy prices' },
        { label: 'Quality', a: 'Yield and defects', b: 'Rework and lost trust' },
        { label: 'Product performance', a: 'Strength, durability, adhesion, coverage', b: 'Whether customers get value in use' },
        { label: 'Distribution', a: 'Delivery and retention', b: 'Service gaps that lose repeat orders' },
      ],
      note: 'Innovation shows up through R&D and product performance, not output volume.',
      takeaway: 'Useful benchmarking connects operating performance to customer value and financial return.',
    },
  },
  'mfg-building-m4-9': {
    heading: 'Advantage comes from technical, commercial and sustainability capabilities together',
    intro: 'Capabilities such as R&D, market reach and environmental data only create advantage when they connect to customer value and financial return.',
    spec: {
      layout: 'taxonomy', title: '09 Which Technical, Commercial and Sustainability Capabilities Create Advantage?', kicker: '',
      root: 'Capabilities that create advantage', rootDetail: 'Assessed together, normalized by category',
      groups: [
        { label: 'Technical', detail: 'Products that perform', items: ['R&D', 'Product performance', 'Low defects'] },
        { label: 'Commercial', detail: 'Reaching and keeping customers', items: ['Market reach', 'Pricing', 'Delivery', 'Retention'] },
        { label: 'Sustainability', detail: 'Credible environmental evidence', items: ['Environmental data', 'Energy intensity'] },
      ],
      note: 'Normalize period, mix, region and application before comparing capabilities across companies.',
      takeaway: 'Useful benchmarking connects operating performance to customer value and financial return.',
    },
  },
  'mfg-building-m4-10': {
    heading: 'Cost advantage rests on raw-material access, utilization and process discipline',
    intro: 'Raw-material access, energy and waste reduction, standardized processes, freight and inventory together set the cost and productivity a manufacturer can achieve.',
    spec: {
      layout: 'driverTree', title: '10 Why Do Raw-Material Access, Cost and Utilization Matter?', kicker: '',
      root: { label: 'Cost and productivity position', detail: 'Unit cost relative to comparable producers' },
      drivers: [
        { label: 'Raw-material access', detail: 'Secure, nearby and consistent inputs' },
        { label: 'Utilization', detail: 'Fixed cost spread over output' },
        { label: 'Energy and waste', detail: 'Reduction lowers cost and emissions' },
        { label: 'Standardized processes', detail: 'Consistency and traceability' },
        { label: 'Freight and inventory', detail: 'Cost to reach the customer' },
      ],
      note: 'Low cost is not enough for technical products: a differentiated waterproofing system fails commercially if stock, contractor skill or technical support is unreliable.',
      takeaway: 'Sustainable advantage combines operational discipline with customer-relevant differentiation.',
    },
  },
  'mfg-building-m4-11': {
    heading: 'Quality and reliability are built along the chain from process to installed result',
    intro: 'Consistent quality starts with standardized processes and traceability, but it reaches the customer only through reliable inventory, freight, dealers and application expertise.',
    spec: {
      layout: 'flow', title: '11 How Do Quality, Reliability and Distribution Create Advantage?', kicker: '',
      steps: [
        { label: 'Standardized processes', detail: 'Same output batch after batch', owner: 'Plant' },
        { label: 'Traceable quality', detail: 'Problems found and fixed fast', owner: 'Quality team' },
        { label: 'Inventory and freight', detail: 'Product available when needed', owner: 'Logistics' },
        { label: 'Dealer availability', detail: 'Stock close to contractors', owner: 'Dealers' },
        { label: 'Application expertise', detail: 'Correct installation on site', owner: 'Contractors with technical support' },
        { label: 'Reliable installed result', detail: 'Earns repeat orders and trust', kind: 'outcome', owner: 'Customer' },
      ],
      takeaway: 'Sustainable advantage combines operational discipline with customer-relevant differentiation.',
    },
  },
  'mfg-building-m4-12': {
    heading: 'Brand and technical credibility only drive growth when delivery and compliance hold up',
    intro: 'A differentiated waterproofing system fails commercially if stock, contractor skill or technical support is unreliable. Compliance with relevant standards and credible evidence protect the brand.',
    spec: {
      layout: 'decision', title: '12 How Do Brand, Technical Credibility and Service Support Growth?', kicker: '',
      root: { label: 'Differentiated product', detail: 'e.g. a waterproofing system' },
      question: 'Are delivery, contractor skill, technical support and compliance evidence all reliable?',
      branches: [
        { condition: 'All reliable', outcome: 'Brand and technical credibility support growth', tone: 'positive' },
        { condition: 'Compliance or sustainability evidence weak', outcome: 'Fix the evidence before promoting', detail: 'Claims must match relevant standards', tone: 'caution' },
        { condition: 'Stock or support unreliable', outcome: 'Fails commercially despite differentiation', tone: 'negative' },
      ],
      note: 'Balance utilization and cost with product quality, dealer availability, project service and credible sustainability evidence.',
      takeaway: 'Sustainable advantage combines operational discipline with customer-relevant differentiation.',
    },
  },
  'mfg-building-m4-13': {
    heading: 'Essential demand and manufacturing strength sit against capital, energy and freight weaknesses',
    intro: 'The industry is strong in essential demand and manufacturing, and weak in capital, energy and freight. Higher-value niches are where selective upgrading can pay.',
    spec: {
      layout: 'compare', title: "13 What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Demand', a: 'Essential, structural demand', b: 'Risk of building ahead of demand' },
        { label: 'Assets', a: 'Established manufacturing base', b: 'High capital requirements' },
        { label: 'Inputs', a: 'Scale in commodity segments', b: 'Energy-intensive production' },
        { label: 'Logistics', a: 'Plants serve regional markets', b: 'Freight-sensitive heavy products' },
        { label: 'Portfolio', a: 'Higher-value niches open to upgrading', b: 'Niches need formulation and service capability' },
      ],
      note: 'Two competitive patterns coexist: commodity scale and cost, and specialty differentiation and service.',
      takeaway: 'The strategic challenge is selective upgrading without losing cost discipline or overinvesting ahead of demand.',
    },
  },
  'mfg-building-m4-14': {
    heading: 'Opportunities and threats, and the structural exposure that magnifies them',
    intro: 'Opportunities lie in infrastructure, renovation and specialties; threats come from cycles, discounting and regulation. Capital intensity and excess capacity make the threats bite harder.',
    spec: {
      layout: 'taxonomy', title: '14 What Opportunities and Threats Shape Building Materials?', kicker: '',
      root: 'External forces on building materials', rootDetail: 'Considered together, not in sequence',
      groups: [
        { label: 'Opportunities', detail: 'Where demand can grow', items: ['Infrastructure', 'Renovation', 'Specialties'] },
        { label: 'Threats', detail: 'What can erode margin', items: ['Construction cycles', 'Discounting', 'Regulation'] },
        { label: 'Structural exposure', detail: 'Magnifies cycles and discounting', items: ['Capital intensity', 'Excess capacity'] },
      ],
      note: 'Match capacity and sustainability investment to realistic demand, customer willingness to pay and policy or procurement support.',
      takeaway: 'The strategic challenge is selective upgrading without losing cost discipline or overinvesting ahead of demand.',
    },
  },
  'mfg-building-m4-15': {
    heading: 'Stage upgrade investments against evidence of demand and support',
    intro: 'Near-zero cement can create long-term value, but IEA estimates early CCS-based production costs 75–150% above conventional plants by region. Cyclical demand makes timing critical.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Manufacturers Make?', kicker: '',
      root: { label: 'Capacity or transition investment', detail: 'e.g. near-zero cement or a specialty line' },
      question: 'Do realistic demand, customer willingness to pay and policy or procurement support justify it?',
      branches: [
        { condition: 'Evidence on all three', outcome: 'Invest in stages as demand is confirmed', tone: 'positive' },
        { condition: 'Partial evidence', outcome: 'Upgrade selectively; keep cost discipline', tone: 'caution' },
        { condition: 'Demand not yet credible', outcome: 'Defer; avoid overinvesting ahead of demand', tone: 'negative' },
      ],
      note: 'The 75–150% IEA figure is a regional production-cost range, not a retail price or universal outcome.',
      takeaway: 'The strategic challenge is selective upgrading without losing cost discipline or overinvesting ahead of demand.',
    },
  },
};
