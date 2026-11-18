import type { MfgBuildingChapterVisual } from './mfgBuildingVisualSpecs';

/** Chapter-specific Learning Visuals for Building Materials & Coatings Module 01, keyed by visualKind. */
export const MFG_BUILDING_M1_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  'mfg-building-m1-1': {
    heading: 'The industry spans structural materials, finishes, coatings and specialised systems, all supported by technical services',
    intro: 'The industry covers materials used to construct, protect, finish and maintain buildings and infrastructure. Segment them, because their economics and channels differ.',
    spec: {
      layout: 'taxonomy', title: '01 What Is the Building Materials & Coatings Industry?', kicker: '',
      root: 'Building materials & coatings', rootDetail: 'Separate segments with different economics and channels',
      groups: [
        { label: 'Structural / heavy materials', detail: 'Used to construct buildings and infrastructure', items: ['Cement', 'Concrete', 'Steel'] },
        { label: 'Finishing products', detail: 'Used to finish interiors and facades', items: ['Tiles', 'Glass', 'Sanitary ware'] },
        { label: 'Architectural coatings', detail: 'Protect and finish surfaces', items: ['Paints', 'Coatings'] },
        { label: 'Specialised systems', detail: 'Protect and maintain performance', items: ['Insulation', 'Adhesives', 'Sealants'] },
        { label: 'Technical services', detail: 'Guidance that turns a product into installed performance' },
      ],
      note: 'Example: a waterproofing system combines substrate preparation, primer, membrane or coating, joints, compatible finishes and correct application.',
      takeaway: 'The industry creates value through installed performance, reliability, application ease and lifecycle economics as well as production.',
    },
  },
  'mfg-building-m1-2': {
    heading: 'A building material is judged in the installed building envelope, not only at the factory gate',
    intro: 'Building materials are made to construct, protect, finish and maintain buildings. What a buyer ultimately gets depends on how the whole system performs once installed.',
    spec: {
      layout: 'compare', title: '02 What Makes Building-Material Manufacturing Unique?', kicker: '',
      leftTitle: 'Value judged at production', rightTitle: 'Value judged in the building envelope',
      rows: [
        { label: 'What is delivered', a: 'A product that leaves the plant', b: 'A protected, finished building surface' },
        { label: 'Who shapes the result', a: 'The manufacturer alone', b: 'Manufacturer plus preparation and application on site' },
        { label: 'Example', a: 'A waterproofing membrane sold by the roll or pack', b: 'Substrate, primer, membrane, joints and finishes working together' },
        { label: 'Measure of success', a: 'Output and conformance', b: 'Installed performance, reliability and application ease' },
        { label: 'Time horizon', a: 'The point of sale', b: 'Lifecycle economics, including maintenance' },
      ],
      takeaway: 'The industry creates value through installed performance, reliability, application ease and lifecycle economics as well as production.',
    },
  },
  'mfg-building-m1-3': {
    heading: 'Manufacturers, contractors, distributors, specifiers and applicators carry separate responsibilities',
    intro: 'Building-material manufacturers produce physical materials and coatings. Contractors build, distributors resell, specifiers select and applicators install. Integrated firms can hold several roles without the roles becoming identical.',
    spec: {
      layout: 'table', title: '03 Where Does the Industry Begin and End?', kicker: '',
      headers: ['Participant', 'Responsibility', 'Boundary with manufacturing'],
      rows: [
        { label: 'Material manufacturer', a: 'Produces materials and coatings; supplies a tested system', b: 'The core of the industry' },
        { label: 'Ready-mix producer', a: 'Supplies mixed concrete to projects', b: 'Check where product scope begins' },
        { label: 'Distributor', a: 'Resells products', b: 'Route to market, not production' },
        { label: 'Specifier', a: 'Selects products for a project', b: 'Influences demand; does not produce' },
        { label: 'Construction contractor', a: 'Builds; prepares surfaces under project conditions', b: 'Contracting, not manufacturing' },
        { label: 'Applicator', a: 'Installs or applies products', b: 'Controls the installed result' },
        { label: 'Building owner', a: 'Lives with operating performance', b: 'Outside the industry; the end user' },
      ],
      note: 'Define product, contract, responsible party, site condition, acceptance and warranty scope before assigning a failure or a revenue line.',
      takeaway: 'Building-material manufacturing is not construction contracting: production, specification, installation and operating performance have separate responsibilities.',
    },
  },
  'mfg-building-m1-4': {
    heading: 'Each material and coating category has its own resources, process, unit and economics',
    intro: 'Categories use different resources, manufacturing processes, units, logistics, specifications and economics. Segment evidence by actual product, grade, application, unit and route to market.',
    spec: {
      layout: 'taxonomy', title: '04 Understanding Major Material and Coating Categories', kicker: '',
      root: 'Material and coating categories', rootDetail: 'Distinct categories — do not merge their data',
      groups: [
        { label: 'Cement and clinker', detail: 'Clinker is an intermediate, not finished cement' },
        { label: 'Concrete and aggregates', detail: 'Concrete combines cement, aggregates, water and admixtures; aggregate is not a finished manufactured product' },
        { label: 'Masonry, ceramics and glass', items: ['Masonry', 'Ceramics', 'Glass'] },
        { label: 'Paint', detail: 'Architectural finish' },
        { label: 'Protective coating', detail: 'Formulated and applied as part of a surface system' },
        { label: 'Chemicals and insulation', items: ['Construction chemical', 'Insulation'] },
      ],
      takeaway: 'Cement is not concrete, clinker is not finished cement, aggregate is not a finished product, and architectural paint and protective coatings can require different system performance.',
    },
  },
  'mfg-building-m1-5': {
    heading: 'A construction-chemical system serves several customers and stakeholders, each with a different stake',
    intro: 'Construction chemicals such as waterproofing are sold as systems. Specifiers, dealers, contractors, applicators and owners each influence or depend on how the system performs.',
    spec: {
      layout: 'ecosystem', title: "05 Who Are the Industry's Customers and Stakeholders?", kicker: '',
      center: { label: 'Construction-chemical manufacturer', detail: 'For example, a waterproofing system supplier' },
      actors: [
        { label: 'Specifier', relation: 'Selects the system for a project', flows: ['information'] },
        { label: 'Distributor or dealer', relation: 'Stocks, resells and pays for product', flows: ['product', 'money'] },
        { label: 'Contractor', relation: 'Buys and prepares the substrate', flows: ['money', 'product'] },
        { label: 'Applicator', relation: 'Applies primer, membrane and joints', flows: ['service', 'information'] },
        { label: 'Building owner', relation: 'Relies on the installed result and maintenance', flows: ['risk', 'service'] },
      ],
      note: 'Heavy materials, finishing products, architectural coatings and specialised systems reach customers through different channels.',
      takeaway: 'Value comes from installed performance, reliability, application ease and lifecycle economics, so every stakeholder in the chain matters, not only the buyer.',
    },
  },
  'mfg-building-m1-6': {
    heading: 'Construction materials moved from local methods to industrial production, engineered products and now digital tools',
    intro: 'The industry evolved from local construction methods to industrial cement, steel, glass and ceramics, then to engineered insulation, adhesives, sealants and coatings.',
    spec: {
      layout: 'timeline', title: '06 How Did Traditional Construction Materials Develop?', kicker: '',
      events: [
        { period: 'Earlier', label: 'Local construction methods', detail: 'Materials made and used close to the site', status: 'historical' },
        { period: 'Industrialisation', label: 'Industrial heavy materials', detail: 'Cement, steel, glass and ceramics at scale', status: 'historical' },
        { period: 'Engineering', label: 'Engineered products', detail: 'Insulation, adhesives, sealants and coatings', status: 'historical' },
        { period: 'Now', label: 'Digital tools', detail: 'Colour matching, BIM data and laboratory automation', status: 'current' },
      ],
      note: 'Digital tools complement, rather than replace, large-scale kilns, furnaces and tile lines.',
      takeaway: 'Competition has shifted from material supply alone toward coordinated systems, technical support and lifecycle performance.',
    },
  },
  'mfg-building-m1-7': {
    heading: 'Industrial scale arrived through different routes for cement, glass, ceramics and coatings, then standards and sustainability followed',
    intro: 'Each category industrialised around its own production asset. Standardisation and sustainability expectations now apply across all of them.',
    spec: {
      layout: 'pathway', title: '07 How Did Cement, Glass, Ceramics and Coatings Industrialize?', kicker: '',
      trunk: [
        { label: 'Local construction methods', detail: 'Small-scale, site-based production' },
        { label: 'Industrial production', detail: 'Large plants replace local supply' },
      ],
      optionsLabel: 'Category routes — parallel, not sequential',
      options: [
        { label: 'Cement', detail: 'Large-scale kilns' },
        { label: 'Glass', detail: 'Furnaces' },
        { label: 'Ceramics', detail: 'Tile lines' },
        { label: 'Coatings', detail: 'Engineered formulations' },
      ],
      afterLabel: 'Shared pressures',
      after: [
        { label: 'Standardisation', detail: 'Consistent, specifiable quality' },
        { label: 'Sustainability', detail: 'Material efficiency, alternative fuels, supplementary cementitious materials, CCS', kind: 'outcome' },
      ],
      takeaway: 'Competition has shifted from material supply alone toward coordinated systems, technical support and lifecycle performance.',
    },
  },
  'mfg-building-m1-8': {
    heading: 'Digital and laboratory tools now sit on top of large kilns, furnaces and tile lines',
    intro: 'Digital colour matching, BIM data and laboratory automation complement large-scale production assets and support more specialised products.',
    spec: {
      layout: 'table', title: '08 How Are Modern Manufacturing Technologies Changing the Industry?', kicker: '',
      headers: ['Technology', 'What it complements', 'Competitive effect'],
      rows: [
        { label: 'Laboratory automation', a: 'Kilns, furnaces and tile lines', b: 'More consistent quality' },
        { label: 'Digital colour matching', a: 'Paint and coatings ranges', b: 'Specialised finishes for customers' },
        { label: 'BIM data', a: 'Project specification', b: 'Products easier to specify as systems' },
        { label: 'Application guidance', a: 'Dealer and site support', b: 'Better installed results' },
      ],
      takeaway: 'Competition has shifted from material supply alone toward specialised, coordinated systems, technical support and lifecycle performance.',
    },
  },
  'mfg-building-m1-9': {
    heading: 'Vietnamese manufacturers can differentiate on quality, guidance, dealer support and climate-matched system solutions',
    intro: 'As competition moves beyond material supply, manufacturers in Vietnam can stand out through consistent quality, application guidance, dealer support and solutions matched to local climate.',
    spec: {
      layout: 'driverTree', title: "09 How Has Vietnam's Building-Materials Industry Developed?", kicker: '',
      root: { label: 'Differentiation beyond material supply', detail: 'Where Vietnamese manufacturers can compete' },
      drivers: [
        { label: 'Consistent quality', detail: 'Reliable performance across batches' },
        { label: 'Application guidance', detail: 'Helps installers achieve the intended result' },
        { label: 'Dealer support', detail: 'Keeps products available and explained' },
        { label: 'Climate-matched solutions', detail: 'Products suited to local conditions' },
        { label: 'System solutions', detail: 'Coordinated products plus technical support' },
      ],
      takeaway: 'Competition has shifted from material supply alone toward coordinated systems, technical support and lifecycle performance.',
    },
  },
  'mfg-building-m1-10': {
    heading: 'Heavy materials, branded finishes and specialty systems follow different economics and must be sized separately',
    intro: 'Global categories differ in transport economics, capital intensity, construction exposure, branding, formulation and technical-service needs. A coatings estimate covers coatings only.',
    spec: {
      layout: 'table', title: '10 How Is the Global Building-Materials Industry Structured?', kicker: '',
      headers: ['Category group', 'Economics driven by', 'Sizing discipline'],
      rows: [
        { label: 'Heavy materials', a: 'Transport economics, capital intensity, construction exposure', b: 'Size cement, steel, glass and tiles separately' },
        { label: 'Branded finishes', a: 'Branding and formulation', b: 'Coatings estimates apply to coatings only' },
        { label: 'Specialty systems', a: 'Formulation and technical service', b: 'Size chemicals separately' },
      ],
      note: 'GVR estimates paints and coatings at US$219.9B in 2025 and forecasts US$333.6B in 2033 (5.4% CAGR, 2026–2033). This is a commercial estimate for one segment, not the whole building-materials industry.',
      takeaway: 'There is no single growth pattern across heavy materials, branded finishes and specialty systems.',
    },
  },
  'mfg-building-m1-11': {
    heading: 'Capacity, production, sales and revenue measure different things at different moments',
    intro: 'A cement plant can produce inventory in one period, sell it later and recognise revenue under its accounting and contract terms. Each measure has its own entity, period and unit.',
    spec: {
      layout: 'flow', title: '11 How Are Building-Materials Markets Measured?', kicker: '',
      steps: [
        { label: 'Capacity', detail: 'What the plant could produce' },
        { label: 'Production volume', detail: 'Quantity produced in a stated period' },
        { label: 'Sales volume and shipments', detail: 'Quantity sold or moved, possibly later' },
        { label: 'Recognised revenue', detail: 'Booked under accounting and contract terms', kind: 'outcome' },
      ],
      note: 'Construction spending, market value and installed area measure other entities again. Product units include tonnes, cubic meters, square meters and liters. State category, unit, geography, period and historical, estimate or forecast status.',
      takeaway: 'Production capacity is not actual production, production is not sales or revenue, and building-material market value is not total construction market value.',
    },
  },
  'mfg-building-m1-12': {
    heading: 'Demand for each category depends on construction cycles, exposure, transport reach and service needs',
    intro: 'Categories respond differently to the same construction cycle, because they differ in construction exposure, transport economics and technical-service requirements.',
    spec: {
      layout: 'driverTree', title: '12 Which Regions and Construction Segments Drive Demand?', kicker: '',
      root: { label: 'Demand seen by one category', detail: 'No single growth pattern across categories' },
      drivers: [
        { label: 'Construction cycles', detail: 'Upswings and slowdowns in building activity' },
        { label: 'Construction exposure', detail: 'How closely the category tracks building activity' },
        { label: 'Transport economics', detail: 'Shapes which regions a plant can serve' },
        { label: 'Branding and formulation', detail: 'Matter more for finishes' },
        { label: 'Technical-service needs', detail: 'Matter more for specialty systems' },
      ],
      note: 'Use coatings forecasts only for coatings products; size cement, steel, glass, tiles and chemicals separately.',
      takeaway: 'There is no single growth pattern across heavy materials, branded finishes and specialty systems, so demand must be read category by category.',
    },
  },
  'mfg-building-m1-13': {
    heading: 'Global participants group into heavy-material producers, coatings companies and specialty-chemical suppliers',
    intro: 'Participant types follow the category they make, because each category has its own capital intensity, branding, formulation and technical-service requirements.',
    spec: {
      layout: 'taxonomy', title: '13 Who Are the Major Global Participant Types?', kicker: '',
      root: 'Global participant types', rootDetail: 'Types, not a ranking of companies',
      groups: [
        { label: 'Heavy-material producers', detail: 'Capital-intensive and transport-sensitive', items: ['Cement', 'Steel', 'Glass', 'Tiles'] },
        { label: 'Coatings companies', detail: 'Compete on branding and formulation', items: ['Paints', 'Coatings'] },
        { label: 'Specialty-chemical suppliers', detail: 'Compete on formulation and technical service', items: ['Construction chemicals'] },
      ],
      note: 'GVR market figures cover paints and coatings only; they do not describe heavy-material producers.',
      takeaway: 'There is no single growth pattern across heavy materials, branded finishes and specialty systems, so compare participants within their own type.',
    },
  },
  'mfg-building-m1-14': {
    heading: 'Heavy materials and specialty chemicals respond to demand and trade through different economics',
    intro: 'Categories differ in transport economics, capital intensity, construction exposure, formulation and technical service, so demand and trade affect them differently.',
    spec: {
      layout: 'compare', title: '14 How Do Construction Demand, Trade and Material Economics Interact?', kicker: '',
      leftTitle: 'Heavy materials', rightTitle: 'Specialty chemicals',
      rows: [
        { label: 'Main economics', a: 'Transport cost and capital intensity', b: 'Formulation and technical service' },
        { label: 'Link to demand', a: 'Direct exposure to construction volume', b: 'Depends on specification and application' },
        { label: 'Trade', a: 'Freight limits how far product travels', b: 'Higher-value product can travel further' },
        { label: 'How to size', a: 'By product and unit, e.g. tonnes', b: 'Separately from coatings and heavy materials' },
      ],
      takeaway: 'There is no single growth pattern across heavy materials, branded finishes and specialty systems.',
    },
  },
  'mfg-building-m1-15': {
    heading: "Vietnam's manufacturers serve housing, industrial, infrastructure, commercial and export demand through distributors and project supply",
    intro: 'Domestic production and demand are tied to housing, industrial parks, infrastructure, commercial projects and exports, reached through distributors and direct project supply.',
    spec: {
      layout: 'ecosystem', title: "15 What Does Vietnam's Building-Materials Ecosystem Look Like?", kicker: '',
      center: { label: 'Vietnamese building-material manufacturers', detail: 'Cement and clinker, coatings and other categories' },
      actors: [
        { label: 'Housing', relation: 'Residential construction demand', flows: ['money'] },
        { label: 'Industrial parks', relation: 'Factory and warehouse projects', flows: ['money'] },
        { label: 'Infrastructure', relation: 'Public works demand', flows: ['money', 'risk'] },
        { label: 'Commercial projects', relation: 'Offices, retail and similar buildings', flows: ['money'] },
        { label: 'Export buyers', relation: 'Overseas demand for volume', flows: ['product', 'money'] },
        { label: 'Distributors', relation: 'Channel for coatings and packaged goods', flows: ['product', 'money', 'risk'] },
        { label: 'Project supply', relation: 'Direct deliveries to sites', flows: ['product', 'service'] },
      ],
      note: 'Cement and clinker sales were 112M tonnes in 2025 (about 75M domestic, 37M exports) — physical volume, not revenue.',
      takeaway: 'Vietnam has broad manufacturing scale, but volume does not automatically create attractive margins.',
    },
  },
  'mfg-building-m1-16': {
    heading: 'Vietnamese cement and clinker leaves the plant through domestic distributors, project supply or export',
    intro: 'Cement and clinker are measured in physical tonnes sold. Each route to market carries its own freight, price, inventory and receivables profile.',
    spec: {
      layout: 'pathway', title: '16 How Are Cement, Concrete and Aggregates Produced and Sold?', kicker: '',
      trunk: [
        { label: 'Cement and clinker production', detail: 'Physical tonnes, not revenue' },
      ],
      optionsLabel: 'Routes to market — alternatives, not steps',
      options: [
        { label: 'Domestic via distributors', detail: 'Dealer stock serving housing demand' },
        { label: 'Domestic project supply', detail: 'Infrastructure, industrial and commercial sites' },
        { label: 'Exports', detail: 'Nearly 37M tonnes in 2025' },
      ],
      afterLabel: 'Evaluate by route',
      after: [
        { label: 'Margin check', detail: 'Utilization, energy, freight, price, inventory, receivables', kind: 'outcome' },
      ],
      note: 'Total 2025 sales of 112M tonnes included over 75M tonnes domestic. Tonnes must not be combined with m² or units from other categories.',
      takeaway: 'Vietnam has broad manufacturing scale, but volume does not automatically create attractive margins.',
    },
  },
  'mfg-building-m1-17': {
    heading: 'Tiles, sanitary ware and construction glass are each reported in their own unit and cannot be added together',
    intro: 'Ceramics and glass are measured in square metres or units, not tonnes. Keep each product measure separate and evaluate each category on its own.',
    spec: {
      layout: 'table', title: '17 How Are Ceramics, Glass, Paints and Coatings Structured?', kicker: '',
      headers: ['Category', 'Unit of measure', 'Vietnam 2025 reference'],
      rows: [
        { label: 'Ceramic tiles', a: 'Square metres', b: '550M m² output' },
        { label: 'Sanitary ware', a: 'Units', b: '16M units output' },
        { label: 'Construction glass', a: 'Square metres', b: '158M m² output' },
        { label: 'Paints and coatings', a: 'Product-specific measure', b: 'No figure in this chapter; size separately' },
      ],
      note: 'Different product units: never combine them into one market-size total.',
      takeaway: 'Vietnam has broad manufacturing scale, but volume does not automatically create attractive margins.',
    },
  },
  'mfg-building-m1-18': {
    heading: 'Domestic demand and exports draw on the same plants but carry different volumes and risks',
    intro: 'Vietnamese production serves both domestic projects and exports. The same tonnes can carry very different freight, price and collection outcomes depending on where they go.',
    spec: {
      layout: 'compare', title: '18 How Do Domestic Demand, Exports and Major Participants Interact?', kicker: '',
      leftTitle: 'Domestic demand', rightTitle: 'Exports',
      rows: [
        { label: 'Cement and clinker, 2025', a: 'Over 75M tonnes', b: 'Nearly 37M tonnes' },
        { label: 'Demand sources', a: 'Housing, industrial parks, infrastructure, commercial projects', b: 'Overseas buyers' },
        { label: 'Route', a: 'Distributors and project supply', b: 'Export shipments' },
        { label: 'What to watch', a: 'Price, inventory and receivables', b: 'Freight and price' },
      ],
      note: 'Volumes are physical sales, not revenue. Sanitary ware (16M units) and tiles (550M m²) are separate measures.',
      takeaway: 'Vietnam has broad manufacturing scale, but volume does not automatically create attractive margins.',
    },
  },
  'mfg-building-m1-19': {
    heading: 'Utilization, input and freight costs, and working capital decide whether Vietnamese volume earns a margin',
    intro: 'Evaluate utilization, energy, freight, price, inventory and receivables category by category. Large volume alone does not show whether a plant is profitable.',
    spec: {
      layout: 'taxonomy', title: '19 What Capacity, Cost and Environmental Constraints Shape Vietnam?', kicker: '',
      root: 'Constraints on Vietnamese margins', rootDetail: 'Assess each category separately, e.g. glass versus cement',
      groups: [
        { label: 'Capacity', detail: 'Utilization of installed plants', items: ['Utilization'] },
        { label: 'Cost', detail: 'Inputs and delivery', items: ['Energy', 'Freight'] },
        { label: 'Commercial', detail: 'What the market pays', items: ['Price'] },
        { label: 'Working capital', detail: 'Cash tied up in the business', items: ['Inventory', 'Receivables'] },
      ],
      note: 'Keep tonnes, square metres and units separate when comparing categories.',
      takeaway: 'Vietnam has broad manufacturing scale, but volume does not automatically create attractive margins.',
    },
  },
  'mfg-building-m1-20': {
    heading: 'Several indicators, not one macro number, show where construction and infrastructure demand is heading',
    intro: 'Track starts, public disbursement, developer health, distributor stock, energy prices and specification changes rather than one macro indicator. Delayed projects raise inventory and collection risk.',
    spec: {
      layout: 'table', title: '20 How Do Construction and Infrastructure Cycles Affect Demand?', kicker: '',
      headers: ['Indicator', 'What it signals', 'Risk if ignored'],
      rows: [
        { label: 'Construction starts', a: 'New project demand', b: 'Capacity planned for demand that never arrives' },
        { label: 'Public disbursement', a: 'Pace of infrastructure work', b: 'Delayed projects and idle inventory' },
        { label: 'Developer health', a: 'Ability of private projects to pay', b: 'Collection risk' },
        { label: 'Distributor stock', a: 'Inventory already in the channel', b: 'Overstocked dealers' },
        { label: 'Climate exposure', a: 'Need for waterproofing and corrosion protection', b: 'Missed demand for protective systems' },
      ],
      takeaway: 'Industry outcomes reflect the interaction of demand quality, production cost, regulation and innovation.',
    },
  },
  'mfg-building-m1-21': {
    heading: 'Energy, minerals, metals, resins, pigments and freight together set a manufacturer’s cost base',
    intro: 'Input and energy costs move with property and construction cycles. Each category is exposed to a different mix of minerals, metals, chemicals, energy and freight.',
    spec: {
      layout: 'driverTree', title: '21 How Do Raw Materials, Energy and Freight Affect Manufacturers?', kicker: '',
      root: { label: 'Manufacturer cost pressure', detail: 'Varies by category and cycle' },
      drivers: [
        { label: 'Energy', detail: 'Track energy prices' },
        { label: 'Minerals and metals', detail: 'Inputs for heavy materials' },
        { label: 'Resins and pigments', detail: 'Inputs for coatings', op: '+' },
        { label: 'Freight', detail: 'Moving inputs and finished goods', op: '+' },
        { label: 'Property-cycle timing', detail: 'Delayed projects add inventory and collection cost', op: '+' },
      ],
      takeaway: 'Industry outcomes reflect the interaction of demand quality, production cost, regulation and innovation.',
    },
  },
  'mfg-building-m1-22': {
    heading: 'Meeting building codes and technical standards decides whether a product can be specified at all',
    intro: 'Building codes, technical standards and environmental requirements shape which products projects can select. Specification changes are a demand signal worth tracking.',
    spec: {
      layout: 'decision', title: '22 Why Do Product Rules and Technical Standards Matter?', kicker: '',
      root: { label: 'A product proposed for a project', detail: 'Material, coating or system' },
      question: 'Does it meet the applicable building codes, technical standards and specification?',
      branches: [
        { condition: 'Meets and is documented', outcome: 'Can be specified and sold', detail: 'Evidence supports the claim', tone: 'positive' },
        { condition: 'Specification has changed', outcome: 'Re-test and update documentation', detail: 'Demand can shift quickly', tone: 'caution' },
        { condition: 'Does not meet', outcome: 'Excluded from the project', detail: 'Even if price is attractive', tone: 'negative' },
      ],
      note: 'The revised EU construction-products framework includes digital information and enables a construction Digital Product Passport; detailed application depends on product rules and implementation.',
      takeaway: 'Industry outcomes reflect the interaction of demand quality, production cost, regulation and innovation.',
    },
  },
  'mfg-building-m1-23': {
    heading: 'Performance expectations are rising for climate resilience, digital product information and lower-carbon production',
    intro: 'Climate exposure, technical standards and environmental expectations are raising what products must prove. Innovation now covers performance, information and production methods.',
    spec: {
      layout: 'taxonomy', title: '23 How Are Technology and Product Performance Expectations Evolving?', kicker: '',
      root: 'Rising performance expectations', rootDetail: 'Areas evolving in parallel',
      groups: [
        { label: 'Climate resilience', detail: 'Demand can rise with climate exposure', items: ['Waterproofing', 'Corrosion protection'] },
        { label: 'Digital product information', detail: 'EU framework enables a Digital Product Passport' },
        { label: 'Energy and input efficiency', detail: 'Material efficiency and alternative fuels' },
        { label: 'Specification changes', detail: 'Track them as a market signal' },
      ],
      takeaway: 'Industry outcomes reflect the interaction of demand quality, production cost, regulation and innovation.',
    },
  },
  'mfg-building-m1-24': {
    heading: 'Environmental requirements push producers toward a set of decarbonisation levers and documented compliance',
    intro: 'Environmental requirements and expectations are rising. The IEA identifies several levers for cement, each with different costs depending on region.',
    spec: {
      layout: 'pathway', title: '24 How Do Sustainability and Environmental Pressures Shape the Industry?', kicker: '',
      trunk: [
        { label: 'Environmental requirements', detail: 'Codes, rules and buyer expectations' },
        { label: 'Producer response', detail: 'Choose levers by category and region' },
      ],
      optionsLabel: 'Levers identified by the IEA — options, not steps',
      options: [
        { label: 'Material efficiency' },
        { label: 'Alternative fuels' },
        { label: 'Supplementary cementitious materials' },
        { label: 'Carbon capture (CCS)' },
      ],
      afterLabel: 'Then',
      after: [
        { label: 'Compliance evidence', detail: 'Documented product and environmental information', kind: 'outcome' },
      ],
      note: 'The IEA estimates early CCS-based near-zero cement production costs at 75–150% above conventional plants, depending on region.',
      takeaway: 'Industry outcomes reflect the interaction of demand quality, production cost, regulation and innovation.',
    },
  },
};
