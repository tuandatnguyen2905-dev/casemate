import type { AgriCropChapterVisual } from './agriCropVisualSpecs';

/** Chapter-specific Learning Visuals for Crop Production & Agricultural Processing Module 05, keyed by visualKind. */
export const AGRI_CROP_M5_VISUALS: Record<string, AgriCropChapterVisual> = {
  'agri-crop-m5-1': {
    heading: 'Business buyers expect predictable specifications, quality records and aligned supply',
    intro: 'Manufacturers, retailers and industrial buyers need predictable grades, volumes and delivery. Moisture and maturity variation can disrupt a customer’s process.',
    spec: {
      layout: 'table', title: 'How Are Food and Agricultural Demand Patterns Changing?', kicker: '',
      headers: ['Buyer requirement', 'What the buyer expects', 'Cost of missing it'],
      rows: [
        { label: 'Specification', a: 'Predictable grade, moisture and maturity', b: 'Variation disrupts the customer process' },
        { label: 'Quality record', a: 'Documented consistency across lots', b: 'Weaker retention' },
        { label: 'Production alignment', a: 'Calendars and storage linked to buyer plans', b: 'Higher downstream cost' },
      ],
      takeaway: 'Consistency and reliability reduce downstream cost and strengthen retention alongside price.',
    },
  },
  'agri-crop-m5-2': {
    heading: 'Reliable volume and long-term relationships compete alongside price',
    intro: 'Buyers value predictable volumes and delivery as well as price. Linking production calendars, storage and buyer plans turns one-off sales into lasting relationships.',
    spec: {
      layout: 'compare', title: 'How Do Consumer Preferences Influence Crop Production?', kicker: '',
      leftTitle: 'Price-only sale', rightTitle: 'Reliable long-term relationship',
      rows: [
        { label: 'Basis of the sale', a: 'Price on the day', b: 'Price plus consistency and reliability' },
        { label: 'Volume reliability', a: 'Whatever is available', b: 'Planned volumes from production calendars' },
        { label: 'Buyer’s downstream cost', a: 'Higher when supply varies', b: 'Lower with predictable supply' },
        { label: 'Retention', a: 'Buyer can switch any season', b: 'Strengthened over time' },
      ],
      note: 'Moisture and maturity variation can disrupt a customer process.',
      takeaway: 'Volume reliability and long-term relationships reduce downstream cost and strengthen retention alongside price.',
    },
  },
  'agri-crop-m5-3': {
    heading: 'Traceability and value addition pay only when buyers require them and execution is reliable',
    intro: 'Markets ask for origin, handling, functionality, shelf life and responsible-practice information. A customized ingredient can solve a formulation need that a raw crop may not.',
    spec: {
      layout: 'decision', title: 'How Are Quality and Traceability Requirements Evolving?', kicker: '',
      root: { label: 'Proposed premium offer', detail: 'Origin traceability, specialty product, ingredient, customization or responsible sourcing' },
      question: 'Do buyers require it, will they pay, and can we execute reliably?',
      branches: [
        { condition: 'Required, paid for and reliably delivered', outcome: 'Offer it', detail: 'E.g. a customized ingredient for a formulation need', tone: 'positive' },
        { condition: 'Buyer interest, willingness to pay unknown', outcome: 'Test before committing', detail: 'Weigh willingness to pay against data and processing cost', tone: 'caution' },
        { condition: 'No buyer requirement', outcome: 'Do not add the cost', detail: 'The raw crop may already meet the need', tone: 'negative' },
      ],
      takeaway: 'Traceability and value addition create advantage only when buyers require them and execution is reliable.',
    },
  },
  'agri-crop-m5-4': {
    heading: 'Each precision tool pays only if it fits the crop, farm, connectivity, skills and budget',
    intro: 'Digital tools support crop monitoring, irrigation, pests, input use and performance. Shared services can give small farms access to equipment and data.',
    spec: {
      layout: 'table', title: 'How Is Precision Agriculture Transforming Crop Production?', kicker: '',
      headers: ['Tool', 'What it supports', 'Fit test'],
      rows: [
        { label: 'Remote sensing', a: 'Crop monitoring, pests and performance', b: 'Connectivity and skills to use the data' },
        { label: 'Weather planning', a: 'Irrigation and input timing', b: 'Matched to the crop and farm' },
        { label: 'Mechanization service', a: 'Shared equipment for small farms', b: 'Affordable per use' },
      ],
      note: 'Measure agronomic and economic outcomes rather than feature adoption.',
      takeaway: 'Digital agriculture creates value when matched to crop, farm, connectivity, skills and affordability.',
    },
  },
  'agri-crop-m5-5': {
    heading: 'Farm records and precision inputs form a season-to-season improvement loop',
    intro: 'Precision inputs work from good farm records, and each season’s results are measured in agronomic and economic terms, not by feature adoption.',
    spec: {
      layout: 'flow', title: 'How Are Seeds, Irrigation, and Farm Automation Improving Productivity?', kicker: '',
      steps: [
        { label: 'Keep farm records', detail: 'Field, input and yield history' },
        { label: 'Plan precision inputs', detail: 'Seed, water and nutrients by need' },
        { label: 'Apply and monitor', detail: 'Track crop response in season' },
        { label: 'Measure outcomes', detail: 'Agronomic and economic results', kind: 'outcome' },
      ],
      loop: 'Each season’s records refine the next input plan.',
      note: 'Shared services can give small farms access to equipment and data.',
      takeaway: 'Precision inputs and farm records create value when matched to crop, farm, connectivity, skills and affordability.',
    },
  },
  'agri-crop-m5-6': {
    heading: 'Processing automation pays back only when gains outweigh its full lifecycle cost',
    intro: 'Automation and controls now reach grading, processing, storage and production planning. Payback has to include installation, training, spare parts, data and utilization.',
    spec: {
      layout: 'driverTree', title: 'How Are Data, Remote Sensing, and Digital Farming Tools Evolving?', kicker: '',
      root: { label: 'Modernization payback', detail: 'Gains justify lifecycle investment' },
      formula: 'Payback = operating gains − lifecycle cost, at real utilization',
      drivers: [
        { label: 'Operating gains', op: '+', children: [
          { label: 'Automated sorting', detail: 'Grading quality' },
          { label: 'Process sensors', detail: 'Recovery and control' },
          { label: 'Predictive maintenance', detail: 'Uptime' },
          { label: 'Digital inventory', detail: 'Storage visibility' },
          { label: 'Production analytics', detail: 'Throughput planning' },
        ] },
        { label: 'Lifecycle cost', op: '−', children: [{ label: 'Installation' }, { label: 'Training' }, { label: 'Spare parts' }, { label: 'Data' }, { label: 'Calibration and maintenance' }] },
        { label: 'Utilization', op: '×', detail: 'Enough raw-material throughput to use the equipment' },
      ],
      takeaway: 'Modernization pays when throughput, quality, recovery and uptime gains justify lifecycle investment.',
    },
  },
  'agri-crop-m5-7': {
    heading: 'Resilient varieties, soil health and climate information each answer a different climate pressure',
    intro: 'Farms are responding to weather variability, water constraints, soil pressure and extreme events. World Bank CSA guidance weighs productivity, resilience and mitigation trade-offs.',
    spec: {
      layout: 'table', title: 'How Are Farm-to-Market Relationships Changing?', kicker: '',
      headers: ['Adaptation response', 'Pressure it answers', 'Evidence to look for'],
      rows: [
        { label: 'Resilient variety', a: 'Weather variability and extreme events', b: 'Measured yield stability locally' },
        { label: 'Soil health', a: 'Soil pressure', b: 'Measured soil and yield results' },
        { label: 'Climate information', a: 'Weather variability and water limits', b: 'Better-timed decisions, measured' },
      ],
      note: 'Use crop- and region-specific practices with measured results.',
      takeaway: 'Adaptation must fit local agronomy and economics to stabilize productivity and raw supply.',
    },
  },
  'agri-crop-m5-8': {
    heading: 'Water efficiency and crop diversity stabilize supply in different ways',
    intro: 'Both respond to weather variability and water constraints, and both must be judged on productivity, resilience and trade-offs in the local setting.',
    spec: {
      layout: 'compare', title: 'How Are Cooperatives and Contract Farming Evolving?', kicker: '',
      leftTitle: 'Water efficiency', rightTitle: 'Crop diversity',
      rows: [
        { label: 'Pressure addressed', a: 'Water constraints', b: 'Weather variability and extreme events' },
        { label: 'Productivity test', a: 'Does yield stay up with less water?', b: 'Does total farm output hold up?' },
        { label: 'Resilience test', a: 'Does it cushion dry periods?', b: 'Does it spread weather risk?' },
        { label: 'Local fit', a: 'Water source, crop and cost', b: 'Agronomy and markets for each crop' },
      ],
      note: 'World Bank CSA guidance evaluates productivity, resilience and mitigation trade-offs; use crop- and region-specific practices with measured results.',
      takeaway: 'Water efficiency and crop diversity must fit local agronomy and economics to stabilize productivity and raw supply.',
    },
  },
  'agri-crop-m5-9': {
    heading: 'Pick the post-harvest or processing upgrade that matches a real loss and buyer need',
    intro: 'Preservation, handling and transformation upgrades can turn existing production into more marketable output. Cold chain, for example, fails economically without volume and reliable energy.',
    spec: {
      layout: 'decision', title: 'How Are Agricultural Supply Chains Creating New Opportunities?', kicker: '',
      root: { label: 'Post-harvest or processing investment', detail: 'Start from crop-specific losses and buyer needs' },
      question: 'Which loss or need is real, with enough volume and demand?',
      branches: [
        { condition: 'Dry crop losing quality', outcome: 'Drying and storage', tone: 'positive' },
        { condition: 'Perishables with volume and reliable energy', outcome: 'Cold chain', tone: 'positive' },
        { condition: 'Buyer needs a new format', outcome: 'Processing upgrade or ingredient development', tone: 'positive' },
        { condition: 'Residue with a viable use', outcome: 'By-product use', tone: 'caution' },
        { condition: 'Low volume or weak demand', outcome: 'Do not invest yet', detail: 'Utilization would not support the cost', tone: 'negative' },
      ],
      takeaway: 'Loss reduction and processing can create more marketable output from existing production when utilization and demand support investment.',
    },
  },
  'agri-crop-m5-10': {
    heading: 'Compliance runs daily from field to shipment, not as a final check',
    intro: 'Quality, safety, labeling, records and destination-market requirements apply at every stage. A late pre-shipment check cannot correct every farm or storage failure.',
    spec: {
      layout: 'flow', title: 'How Do Agriculture, Land, and Food Safety Policies Affect Farming?', kicker: '',
      steps: [
        { label: 'Cultivation', detail: 'Food-safe practice and supplier records', owner: 'Farm' },
        { label: 'Handling and storage', detail: 'Records kept at each transfer', owner: 'Collector' },
        { label: 'Processing', detail: 'Quality, safety and labeling controls', owner: 'Processor' },
        { label: 'Distribution', detail: 'Destination-market requirements', owner: 'Exporter' },
        { label: 'Export compliance', detail: 'Pre-shipment check confirms, not repairs', kind: 'outcome', owner: 'Exporter' },
      ],
      note: 'Verify current product-specific requirements with authorities.',
      takeaway: 'Compliance should operate daily across cultivation, handling, processing and distribution.',
    },
  },
  'agri-crop-m5-11': {
    heading: 'Testing finds a problem; traceability shows where it started',
    intro: 'Testing and traceability support the same compliance goal in different ways. A late check can reveal a failure but cannot correct it on the farm or in storage.',
    spec: {
      layout: 'compare', title: 'How Are Sustainable Farming and Resource Efficiency Evolving?', kicker: '',
      leftTitle: 'Testing', rightTitle: 'Traceability',
      rows: [
        { label: 'What it does', a: 'Checks a lot against requirements', b: 'Records origin, handling, processing and distribution events' },
        { label: 'When it happens', a: 'At set control points', b: 'At every step, every day' },
        { label: 'What it reveals', a: 'Whether this lot passes', b: 'Where a failure began' },
        { label: 'Limit', a: 'A late check cannot fix earlier failures', b: 'Only as good as the daily records' },
      ],
      note: 'Verify current product-specific requirements with authorities.',
      takeaway: 'Testing and traceability should operate daily across cultivation, handling, processing and distribution.',
    },
  },
  'agri-crop-m5-12': {
    heading: 'Each resource-efficiency lever needs both an environmental and a commercial case',
    intro: 'Land, water, energy, waste, packaging and by-products are managed across farms and factories. Processing residue creates value only with a safe, suitable and economic use.',
    spec: {
      layout: 'table', title: 'How Do Climate Risks Shape Agricultural Production?', kicker: '',
      headers: ['Lever', 'Environmental case', 'Commercial test'],
      rows: [
        { label: 'Efficient inputs', a: 'Less input per tonne', b: 'Lower input cost' },
        { label: 'Soil and land', a: 'Healthier soil and land', b: 'Sustained yield' },
        { label: 'Loss reduction', a: 'Less waste', b: 'More marketable output' },
        { label: 'By-product recovery', a: 'Residue used, not discarded', b: 'Safe, suitable and economic use' },
        { label: 'Energy efficiency', a: 'Less energy per unit', b: 'Lower energy cost' },
        { label: 'Responsible supply', a: 'Practice claims with defined boundaries', b: 'Evidence buyers accept' },
      ],
      note: 'Define boundaries and evidence for sustainability claims.',
      takeaway: 'Resource efficiency supports resilience when environmental improvement and commercial feasibility are both credible.',
    },
  },
  'agri-crop-m5-13': {
    heading: 'Growth investment is staged: confirm supply and offtake, pilot, then stop or scale',
    intro: 'Productivity, value-added products and digital investment drive growth only with demand and a risk-adjusted return. A business stages processing upgrades after confirming supply and offtake.',
    spec: {
      layout: 'flow', title: 'What Will Drive Future Crop Production Demand and Investment?', kicker: '',
      steps: [
        { label: 'Confirm raw supply', detail: 'Productive farms can deliver the volume' },
        { label: 'Confirm offtake', detail: 'Demand for the product is real' },
        { label: 'Pilot', detail: 'Test the productivity, value-added or digital investment' },
        { label: 'Check utilization', detail: 'Is the asset used enough?' },
        { label: 'Stop or scale', detail: 'Against agreed criteria', kind: 'decision' },
      ],
      takeaway: 'Sustainable growth combines demand with efficient production, suitable processing and risk-adjusted return.',
    },
  },
  'agri-crop-m5-14': {
    heading: 'Value-creation opportunities sit in modern processing, integration and market diversity',
    intro: 'Opportunities come from technology, preservation, ingredients and integrated customer-oriented models, each needing demand and a risk-adjusted return.',
    spec: {
      layout: 'driverTree', title: 'Where Are Productivity and Value-Creation Opportunities Emerging?', kicker: '',
      root: { label: 'Sustainable growth', detail: 'Demand plus efficient, suitable operations' },
      drivers: [
        { label: 'Suitable processing', children: [{ label: 'Modern processing', detail: 'Technology, preservation and ingredients' }] },
        { label: 'Efficient production', children: [{ label: 'Integration', detail: 'Integrated customer-oriented models' }] },
        { label: 'Demand', children: [{ label: 'Market diversity', detail: 'More customers and markets' }] },
        { label: 'Risk-adjusted return', detail: 'Stop-or-scale criteria after a pilot' },
      ],
      note: 'Stage processing upgrades after confirming supply and offtake.',
      takeaway: 'Sustainable growth combines demand with efficient production, suitable processing and risk-adjusted return.',
    },
  },
  'agri-crop-m5-15': {
    heading: 'Start from the crop’s gap, choose the matching upgrade, then plan the chain as one',
    intro: 'Rice, coffee, fruit, vegetables, cashew and other regional strengths each need their own improvements. Better quality and lower loss can add value without more volume.',
    spec: {
      layout: 'pathway', title: 'How Should Crop Producers Respond to Future Industry Challenges?', kicker: '',
      trunk: [
        { label: 'Identify the crop gap', detail: 'Rice, coffee, fruit, vegetables, cashew' },
        { label: 'Check supply and economics', detail: 'Realistic raw supply and customer economics' },
      ],
      optionsLabel: 'Upgrade options — chosen per gap, not all at once',
      options: [
        { label: 'Farm productivity' },
        { label: 'Producer organization' },
        { label: 'Post-harvest infrastructure' },
        { label: 'Processing modernization' },
        { label: 'Value-added products' },
        { label: 'Traceability' },
      ],
      afterLabel: 'Connect the chain',
      after: [{ label: 'Integrated planning', detail: 'Productive farms, efficient processing, verified demand', kind: 'outcome' }],
      takeaway: 'Vietnam can capture more value by connecting productive farms with efficient processing and verified market demand.',
    },
  },
};
