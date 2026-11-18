import type { AgriLivestockChapterVisual } from './agriLivestockVisualSpecs';

/** Chapter-specific Learning Visuals for Livestock & Animal Feed Module 05, keyed by visualKind. */
export const AGRI_LIVESTOCK_M5_VISUALS: Record<string, AgriLivestockChapterVisual> = {
  'agri-livestock-m5-1': {
    heading: 'Income, relative affordability and traceability expectations shift demand between species',
    intro: 'Animal-protein demand is shaped by income, safety, quality, origin and welfare expectations. Poultry can gain share when affordability or health perceptions shift relative to pork or beef.',
    spec: {
      layout: 'driverTree', title: '01 How Are Animal Protein Consumption Patterns Changing?', kicker: '',
      root: { label: 'Demand mix across species', detail: 'Which proteins consumers choose' },
      drivers: [
        { label: 'Income growth', detail: 'Changes how much protein and which kinds' },
        { label: 'Relative affordability', detail: 'Price of one species against another', children: [{ label: 'Pork' }, { label: 'Beef' }, { label: 'Poultry' }] },
        { label: 'Health perceptions', detail: 'Can move demand between species' },
        { label: 'Traceable product', detail: 'Safety, origin and welfare expectations' },
      ],
      note: 'Separate consumption volume, farm output, processing sales and feed demand by species and period. Outlook projections are not confirmed outcomes.',
      takeaway: 'Consumer preferences shift species and product demand, changing production planning and feed requirements.',
    },
  },
  'agri-livestock-m5-2': {
    heading: 'A shift in consumer preference travels through production planning into feed requirements',
    intro: 'Urbanization and changing preferences move demand between poultry, dairy, eggs and other proteins. Producers then re-plan species and stages, which changes the feed they need.',
    spec: {
      layout: 'flow', title: '02 How Do Consumer Preferences Influence Livestock Production?', kicker: '',
      steps: [
        { label: 'Urbanization', detail: 'Convenience, safety and quality expectations' },
        { label: 'Product demand shifts', detail: 'e.g. toward poultry, dairy and eggs' },
        { label: 'Production planning', detail: 'Species, stage and capacity adjusted' },
        { label: 'Feed requirements', detail: 'Feed demand by species and stage changes', kind: 'outcome' },
      ],
      note: 'Separate consumption volume, farm output, processing sales and feed demand by species and period.',
      takeaway: 'Consumer preferences shift species and product demand, changing production planning and feed requirements.',
    },
  },
  'agri-livestock-m5-3': {
    heading: 'Modernizing farms buy systems, services, specialized products and proof',
    intro: 'Commercial farms are demanding systems, services and products that improve efficiency, cost and risk control. A farm adopts specialized feed and environment monitoring after a measured trial.',
    spec: {
      layout: 'taxonomy', title: '03 How Are Food Safety, Traceability, and Quality Expectations Evolving?', kicker: '',
      root: 'What modernizing commercial farms demand', rootDetail: 'Categories of offer, each judged on measured results',
      groups: [
        { label: 'Systems', items: ['Standard protocol', 'Contract production'] },
        { label: 'Services', items: ['Farm advice', 'Biosecurity service'] },
        { label: 'Products', items: ['Specialized nutrition'] },
        { label: 'Performance evidence', detail: 'Baseline and comparable cohort before scale' },
      ],
      note: 'Use baseline, comparable cohort, implementation cost, training, maintenance and outcome evidence before scale.',
      takeaway: 'Modernization rewards suppliers that demonstrate measurable animal and farm economics.',
    },
  },
  'agri-livestock-m5-4': {
    heading: 'Sensors and dashboards turn intake, weight and barn data into performance exceptions',
    intro: 'Sensors connect feed intake, weight gain and temperature to identify performance exceptions. Formulation software can then act on what the data shows.',
    spec: {
      layout: 'flow', title: '04 How Are Genetics and Nutrition Technologies Improving Livestock Productivity?', kicker: '',
      steps: [
        { label: 'Feed intake sensor', detail: 'Measures what animals eat' },
        { label: 'Barn environment', detail: 'Temperature and conditions logged' },
        { label: 'Performance dashboard', detail: 'Links intake, weight gain and temperature' },
        { label: 'Exception flagged', detail: 'Performance off target', kind: 'decision' },
        { label: 'Formulation software', detail: 'Diet adjusted to the finding', kind: 'outcome' },
      ],
      loop: 'New sensor readings confirm whether the adjustment worked.',
      note: 'Validate data quality, calibration, species, farm conditions, skills, connectivity, maintenance and economics.',
      takeaway: 'Precision can improve utilization and reduce waste when data, infrastructure and implementation are reliable.',
    },
  },
  'agri-livestock-m5-5': {
    heading: 'Deploy a precision tool only where data, infrastructure and skills are reliable',
    intro: 'Least-cost formulas, animal weighing and farm management systems depend on reliable data. Validation on the actual farm decides whether a tool should scale.',
    spec: {
      layout: 'decision', title: '05 How Are Automation and Precision Livestock Farming Evolving?', kicker: '',
      root: { label: 'Precision tool proposed', detail: 'e.g. animal weight data feeding a farm management system' },
      question: 'Are data quality, connectivity, skills and maintenance reliable on this farm?',
      branches: [
        { condition: 'Calibrated, connected, staff trained', outcome: 'Scale the tool', tone: 'positive' },
        { condition: 'Data quality unproven', outcome: 'Validate on the farm first', detail: 'A least-cost formula is only as good as its data', tone: 'caution' },
        { condition: 'No connectivity or maintenance', outcome: 'Do not deploy yet', tone: 'negative' },
      ],
      note: 'Validate data quality, calibration, species, farm conditions, skills, connectivity, maintenance and economics.',
      takeaway: 'Precision can improve utilization and reduce waste when data, infrastructure and implementation are reliable.',
    },
  },
  'agri-livestock-m5-6': {
    heading: 'New feed inputs fall into alternative proteins, nutritional additives and health additives',
    intro: 'New ingredients and technologies aim to improve performance, health or resource efficiency. An agricultural by-product is processed and tested before partial inclusion in a feed formula.',
    spec: {
      layout: 'taxonomy', title: '06 How Are Data, Sensors, and Digital Farm Management Systems Changing Operations?', kicker: '',
      root: 'Alternative and functional feed inputs', rootDetail: 'Each must pass the same viability tests',
      groups: [
        { label: 'Alternative protein sources', items: ['Insect meal', 'Microbial protein', 'Agricultural by-product'] },
        { label: 'Nutritional additives', items: ['Amino acid', 'Enzyme'] },
        { label: 'Health-oriented additives', items: ['Probiotic', 'Functional additive'] },
      ],
      note: 'Require specification, digestibility, contaminant control, consistency, supply scale, regulatory status and farm evidence.',
      takeaway: 'Alternative inputs offer diversification only when nutrition, safety, availability, approval and cost are viable.',
    },
  },
  'agri-livestock-m5-7': {
    heading: 'Traceability lets a processor follow a product issue back to the ingredient lot',
    intro: 'A processor traces a product issue back to farm, feed batch and ingredient lot. Digital records at each link make the trace fast enough to act on supplier risk.',
    spec: {
      layout: 'flow', title: '07 How Are Livestock Supply Chains and Market Channels Evolving?', kicker: '',
      steps: [
        { label: 'Product issue found', owner: 'Processor' },
        { label: 'Farm record', detail: 'Which farm and cohort supplied it', owner: 'Farm' },
        { label: 'Feed batch', detail: 'Which batch the animals ate', owner: 'Feed mill' },
        { label: 'Ingredient lot', detail: 'Which supplier lot went into it', owner: 'Ingredient sourcing' },
        { label: 'Supplier risk response', detail: 'Escalation, recall or alternative sourcing', kind: 'outcome' },
      ],
      note: 'Digital traceability links each record; define identifiers, data ownership, verification, escalation and recall.',
      takeaway: 'Integrated information and supply systems improve visibility, quality and disruption response.',
    },
  },
  'agri-livestock-m5-8': {
    heading: 'Feed production, processing lots and strategic inventory each need defined triggers',
    intro: 'Coordination across feed, farms, processing and distribution depends on traceable records and resilience plans. Each control point needs identifiers and a defined response.',
    spec: {
      layout: 'table', title: '08 How Are Contract Farming and Vertical Integration Changing the Industry?', kicker: '',
      headers: ['Control point', 'What to define', 'Response it enables'],
      rows: [
        { label: 'Feed production', a: 'Batch identifiers and data ownership', b: 'Trace to ingredient lot' },
        { label: 'Processing lot', a: 'Lot identifiers and verification', b: 'Targeted recall' },
        { label: 'Strategic inventory', a: 'Inventory triggers', b: 'Alternative sourcing in disruption' },
        { label: 'Escalation', a: 'Who acts, and when', b: 'Faster disruption response' },
      ],
      note: 'Define identifiers, data ownership, verification, escalation, recall, alternative sourcing and inventory triggers.',
      takeaway: 'Integrated information and supply systems improve visibility, quality and disruption response.',
    },
  },
  'agri-livestock-m5-9': {
    heading: 'Commercialization pushes small farms toward scale, contracts, cooperatives or integrators',
    intro: 'Production is shifting toward commercial, contracted, cooperative and integrated models. Small farms join a cooperative or contract network to access inputs, protocols and markets.',
    spec: {
      layout: 'pathway', title: '09 How Are Modern Distribution and Traceability Systems Developing?', kicker: '',
      trunk: [{ label: 'Commercialization', detail: 'Higher standards and scale expected' }],
      optionsLabel: 'Routes a small farm can take — alternatives, not steps',
      options: [
        { label: 'Larger farm', detail: 'Scale up independently' },
        { label: 'Contract farming', detail: 'Inputs and purchase terms from a partner' },
        { label: 'Cooperative', detail: 'Shared access to inputs and markets' },
        { label: 'Integrator', detail: 'Production inside an integrated chain' },
      ],
      afterLabel: 'Structural result',
      after: [
        { label: 'Automation', detail: 'Standardized, equipped production' },
        { label: 'Central processing', detail: 'Higher standards, more dependence', kind: 'outcome' },
      ],
      note: 'Assess bargaining, contract fairness, exit, farmer capability, disease concentration and regional social impact.',
      takeaway: 'Consolidation can improve scale and standards while pressuring smallholders and increasing dependence.',
    },
  },
  'agri-livestock-m5-10': {
    heading: 'Each control adds cost but can earn reliability, confidence or market access',
    intro: 'Controls are tightening on health, feed, residues, safety, waste, pollution and greenhouse gases. Each one costs money and can also return value.',
    spec: {
      layout: 'compare', title: '10 How Do Livestock Regulations and Animal Health Policies Affect Farming?', kicker: '',
      leftTitle: 'What compliance costs', rightTitle: 'What it can return',
      rows: [
        { label: 'Disease prevention', a: 'Biosecurity controls and surveillance', b: 'More reliable production' },
        { label: 'Veterinary medicine', a: 'Treatment records and residue controls', b: 'Buyer confidence' },
        { label: 'Traceability', a: 'Record systems across the chain', b: 'Market access' },
        { label: 'Emission', a: 'Waste and greenhouse gas controls', b: 'Meets tightening requirements' },
      ],
      note: 'Map current competent authority, product, species, farm, processor and market requirements to accountable controls.',
      takeaway: 'Compliance raises cost but can improve reliability, confidence and market access.',
    },
  },
  'agri-livestock-m5-11': {
    heading: 'Responsible-production controls need an accountable owner and a record',
    intro: 'A farm records treatments and manure controls while a mill monitors contaminants and batches. Each control has an owner and leaves evidence.',
    spec: {
      layout: 'table', title: '11 How Are Animal Welfare and Responsible Production Standards Evolving?', kicker: '',
      headers: ['Control', 'Accountable party', 'What is recorded'],
      rows: [
        { label: 'Feed contaminant', a: 'Feed mill', b: 'Contaminant results by batch' },
        { label: 'Farm record', a: 'Farm', b: 'Treatments given to animals' },
        { label: 'Manure management', a: 'Farm', b: 'Manure controls applied' },
        { label: 'Market requirement', a: 'Processor', b: 'Requirements mapped to controls' },
      ],
      note: 'Map current competent authority, product, species, farm, processor and market requirements to accountable controls.',
      takeaway: 'Compliance raises cost but can improve reliability, confidence and market access.',
    },
  },
  'agri-livestock-m5-12': {
    heading: 'Diet, inputs, housing and welfare monitoring cut impact while protecting performance',
    intro: 'Improved diet and housing reduce waste and heat stress while protecting performance. Sustainability practices work when they also deliver an operating or market benefit.',
    spec: {
      layout: 'driverTree', title: '12 How Do Environmental and Climate Challenges Affect Livestock Operations?', kicker: '',
      root: { label: 'Lower resource use and impact', detail: 'With animal health and productivity maintained' },
      drivers: [
        { label: 'Diet', detail: 'Less waste per unit of output', children: [{ label: 'Feed conversion' }, { label: 'Nutrient utilization' }] },
        { label: 'Inputs', children: [{ label: 'Responsible sourcing' }, { label: 'By-product use' }] },
        { label: 'Barn design', detail: 'Reduces heat stress', children: [{ label: 'Housing' }, { label: 'Ventilation' }] },
        { label: 'Welfare monitoring', detail: 'Checks animals as practices change' },
      ],
      note: 'Set boundaries and measure feed, water, energy, emissions, welfare, cost and output rather than relying on labels.',
      takeaway: 'Sustainability is viable when environmental improvement aligns with operating or market benefit.',
    },
  },
  'agri-livestock-m5-13': {
    heading: 'Future growth pools span demand, specialty nutrition, integration and traceability',
    intro: 'Future growth comes from performance feed, modern facilities, services, integration, digital farming and value-added products. A supplier develops species-specialist nutrition and technical services for professionalizing farms.',
    spec: {
      layout: 'taxonomy', title: '13 What Factors Will Drive Future Livestock Demand?', kicker: '',
      root: 'Where future livestock growth can come from', rootDetail: 'Size varies by species, geography and scale',
      groups: [
        { label: 'Animal protein demand', detail: 'Underlying consumer demand' },
        { label: 'Specialty nutrition', detail: 'Species-specialist feed and services' },
        { label: 'Integrated production', detail: 'Coordinated feed, farm and processing' },
        { label: 'Traceability', detail: 'Value-added, verifiable products' },
      ],
      note: 'Outlook projections are not confirmed outcomes. Test target farms, demand, ingredient supply, evidence, distribution, working capital, biosecurity and scale economics.',
      takeaway: 'Opportunity varies by species, geography, scale, technology and risk-management capability.',
    },
  },
  'agri-livestock-m5-14': {
    heading: 'Each investment opportunity has its own test before scaling',
    intro: 'Farm modernization, veterinary services and alternative ingredients are emerging opportunities. Each must be tested against target farms, supply, evidence and economics.',
    spec: {
      layout: 'table', title: '14 Where Are Productivity and Investment Opportunities Emerging?', kicker: '',
      headers: ['Opportunity', 'Who it serves', 'Test before scaling'],
      rows: [
        { label: 'Farm modernization', a: 'Professionalizing farms', b: 'Target farm demand and working capital' },
        { label: 'Veterinary service', a: 'Farms managing disease risk', b: 'Biosecurity evidence and distribution' },
        { label: 'Alternative ingredient', a: 'Feed producers diversifying inputs', b: 'Ingredient supply and scale economics' },
      ],
      note: 'Test target farms, demand, ingredient supply, evidence, distribution, working capital, biosecurity and scale economics.',
      takeaway: 'Opportunity varies by species, geography, scale, technology and risk-management capability.',
    },
  },
  'agri-livestock-m5-15': {
    heading: 'Every future-risk workstream gets an owner, staged investment and stop-or-scale criteria',
    intro: 'Sourcing, investment, production, commercial and sustainability strategies must align with changing requirements. Prioritize accountable owners, staged investment, leading indicators and resilience plans.',
    spec: {
      layout: 'pathway', title: '15 How Should Livestock Producers Prepare for Future Industry Risks?', kicker: '',
      trunk: [
        { label: 'Accountable owner', detail: 'One owner per workstream' },
        { label: 'Staged investment', detail: 'Commit capital in stages' },
      ],
      optionsLabel: 'Strategy workstreams — run in parallel, not steps',
      options: [
        { label: 'Sourcing', items: ['Ingredient diversification', 'Procurement risk'] },
        { label: 'Production', items: ['Feed formulation', 'Farm automation'] },
        { label: 'Animal health', items: ['Biosecurity'] },
        { label: 'Commercial', items: ['Farmer relationship'] },
        { label: 'Responsibility', items: ['Sustainability target'] },
      ],
      afterLabel: 'For every workstream',
      after: [
        { label: 'Leading indicators', detail: 'Tracked against a resilience plan' },
        { label: 'Stop-or-scale review', detail: 'Criteria set in advance', kind: 'decision' },
      ],
      takeaway: 'Long-term competitiveness combines cost discipline, animal health, reliable supply, technical capability and responsible production.',
    },
  },
};
