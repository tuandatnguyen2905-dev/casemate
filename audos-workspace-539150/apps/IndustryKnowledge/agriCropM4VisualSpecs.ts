import type { AgriCropChapterVisual } from './agriCropVisualSpecs';

/** Chapter-specific Learning Visuals for Crop Production & Agricultural Processing Module 04, keyed by visualKind. */
export const AGRI_CROP_M4_VISUALS: Record<string, AgriCropChapterVisual> = {
  'agri-crop-m4-1': {
    heading: 'Crop production is a fragmented field of producers of different scale and integration',
    intro: 'Producers and processors differ in scale, integration and specialization, so competition is judged within each crop, region and role rather than across the whole industry.',
    spec: {
      layout: 'taxonomy', title: 'How Competitive Is Crop Production?', kicker: '',
      root: 'Competitors in crop production', rootDetail: 'Fragmented; differ by scale, integration and specialization',
      groups: [
        { label: 'Smallholder', detail: 'Small, family-run scale' },
        { label: 'Cooperative', detail: 'Producers gaining scale as a group' },
        { label: 'Integrated group', detail: 'Links farming, processing and markets' },
      ],
      note: 'Commodity crops emphasize cost and reliability, while specialty products add origin and quality differentiation.',
      takeaway: 'Farm and processing competition require different benchmarks across crops and value-chain stages.',
    },
  },
  'agri-crop-m4-2': {
    heading: 'Rivals compete on cost and reliability in commodities, on origin and quality in specialties',
    intro: 'Commercial farms, independent processors and specialty processors sit at different value-chain stages, so the pressure each faces and the benchmark it needs differ.',
    spec: {
      layout: 'table', title: 'How Do Porter’s Five Forces Apply to Farming?', kicker: '',
      headers: ['Participant', 'Where it competes', 'What buyers judge it on'],
      rows: [
        { label: 'Commercial farm', a: 'Farm stage, at scale', b: 'Cost and reliability in commodity crops' },
        { label: 'Independent processor', a: 'Processing stage, buying raw crop', b: 'Cost and reliability of processed output' },
        { label: 'Specialty processor', a: 'Specialized processing niche', b: 'Origin and quality differentiation' },
      ],
      note: 'Compare participants within the relevant crop, region and role.',
      takeaway: 'Farm and processing competition require different benchmarks across crops and value-chain stages.',
    },
  },
  'agri-crop-m4-3': {
    heading: 'Defensible advantage combines productivity, reliability and hard-to-copy capabilities',
    intro: 'Barriers span land, infrastructure, capital, expertise, working capital, standards and buyer trust. Advantage lasts only when competitors cannot copy it economically.',
    spec: {
      layout: 'driverTree', title: 'What Determines Competitive Advantages Among Producers?', kicker: '',
      root: { label: 'Defensible advantage', detail: 'Hard for competitors to copy economically' },
      drivers: [
        { label: 'Productivity', detail: 'More output per resource', children: [{ label: 'Yield and cost' }, { label: 'Processing efficiency' }] },
        { label: 'Reliability', detail: 'Supply buyers can count on', children: [{ label: 'Raw material security' }, { label: 'Quality' }] },
        { label: 'Hard-to-copy capabilities', detail: 'Barriers rivals cannot easily cross', children: [{ label: 'Market access' }, { label: 'Capital and technology' }] },
      ],
      note: 'Basic production can have lower formal entry barriers than a controlled ingredient facility. Expansion without supply, utilization and customer advantage is not a moat.',
      takeaway: 'Defensible advantage combines productivity, reliability and capabilities competitors cannot copy economically.',
    },
  },
  'agri-crop-m4-4': {
    heading: 'Compare global groups role by role, not by overall size',
    intro: 'Groups such as ofi and Cargill show how sourcing, processing and market access work, but their strengths differ by crop and business line.',
    spec: {
      layout: 'pathway', title: 'Who Are the Major Participants in Global Crop Production?', kicker: '',
      trunk: [
        { label: 'Name the group', detail: 'E.g. ofi or Cargill' },
        { label: 'Fix crop and business line', detail: 'Groups differ by crop and line' },
      ],
      optionsLabel: 'Role-specific comparison — separate lenses, not a ranking',
      options: [
        { label: 'Ingredients', detail: 'What it supplies to manufacturers' },
        { label: 'Origination', detail: 'How it sources crops at origin' },
        { label: 'Processing', detail: 'What it transforms' },
        { label: 'Logistics', detail: 'How product moves' },
        { label: 'Distribution', detail: 'How it reaches customers' },
      ],
      afterLabel: 'Then check the local crop',
      after: [{ label: 'Local crop position', detail: 'Parent scale is not leadership in every local crop', kind: 'outcome' }],
      note: 'Use official company sources for each role, as this chapter does.',
      takeaway: 'Global groups illustrate sourcing, processing and market access but differ by crop and business line.',
    },
  },
  'agri-crop-m4-5': {
    heading: 'Farms grow the crop; integrated global groups link sourcing, processing and market access',
    intro: 'Commercial farms, cooperatives and smallholders produce the crop, while integrated groups such as ADM and Louis Dreyfus Company work across production-linked supply chains.',
    spec: {
      layout: 'compare', title: 'How Do Commercial Farms, Cooperatives, and Smallholders Differ?', kicker: '',
      leftTitle: 'Farm producers (commercial, cooperative, smallholder)', rightTitle: 'Integrated groups (e.g. ADM, Louis Dreyfus Company)',
      rows: [
        { label: 'Position in the chain', a: 'Grow and harvest the crop', b: 'Source, process and supply ingredients' },
        { label: 'Market access', a: 'Through buyers, groups or contracts', b: 'Own sourcing and customer channels' },
        { label: 'What varies', a: 'Scale and organization of the farm', b: 'Strength by crop and business line' },
        { label: 'Fair comparison', a: 'Against farms of the same crop', b: 'Business line by business line' },
      ],
      note: 'Do not treat parent scale as leadership in every local crop.',
      takeaway: 'Global groups illustrate sourcing, processing and market access but differ by crop and business line.',
    },
  },
  'agri-crop-m4-6': {
    heading: 'Vietnam’s crop participants are best mapped crop by crop',
    intro: 'Households, cooperatives, enterprises, processors and international companies take part crop by crop. Rice milling, coffee preparation and fruit preservation need different capabilities.',
    spec: {
      layout: 'taxonomy', title: 'Who Are the Important Crop Production Participants in Vietnam?', kicker: '',
      root: 'Vietnam crop participants', rootDetail: 'Grouped by crop, then by role',
      groups: [
        { label: 'Rice', detail: 'Milling capability' },
        { label: 'Coffee', detail: 'Coffee preparation capability' },
        { label: 'Cashew', detail: 'Its own processing capability' },
        { label: 'Fruit and vegetables', detail: 'Preservation capability' },
        { label: 'Roles within each crop', items: ['Households', 'Cooperative', 'Enterprises', 'Processors', 'Exporter', 'International companies'] },
      ],
      note: 'Benchmark firms within products, specifications and markets.',
      takeaway: 'Vietnam’s advantage combines production knowledge and export links, with room to improve productivity, quality and value capture.',
    },
  },
  'agri-crop-m4-7': {
    heading: 'Producers can be benchmarked only when crop, variety, region, season and system match',
    intro: 'Yield, cost, quality, labor, water and profit comparisons need aligned units and accounting. One tonne per hectare of a high-value fruit is not equivalent to one tonne per hectare of rice.',
    spec: {
      layout: 'decision', title: 'How Should Crop Producers Be Compared?', kicker: '',
      root: { label: 'Two producers to benchmark', detail: 'Yield, cost, quality, labor, water, profit' },
      question: 'Same crop and variety, region, season and production system?',
      branches: [
        { condition: 'Yes, with aligned units and accounting', outcome: 'Compare the full scorecard', detail: 'Yield and cost per hectare, quality, labor productivity, water efficiency, farm profit', tone: 'positive' },
        { condition: 'Same crop, different season or system', outcome: 'Segment before comparing', detail: 'Use compatible NSO data and definitions', tone: 'caution' },
        { condition: 'Different crops, e.g. fruit vs rice', outcome: 'Do not rank by tonnes per hectare', detail: 'Add price, quality, cycle and cost context', tone: 'negative' },
      ],
      takeaway: 'Farm benchmarking requires the same crop, variety, region, season and production system; yield volume across different crops is not economic equivalence.',
    },
  },
  'agri-crop-m4-8': {
    heading: 'Benchmarks trace how inputs become accepted marketable product',
    intro: 'Crop productivity, input cost, sourcing, throughput, recovery, utilization and rejection each show where resources are lost on the way to accepted product.',
    spec: {
      layout: 'flow', title: 'How Do Yield, Cost, and Operating Models Differ?', kicker: '',
      steps: [
        { label: 'Inputs applied', detail: 'Input efficiency: input cost per unit of output', owner: 'Farm' },
        { label: 'Field yield', detail: 'Comparable only with crop, variety, season and system', owner: 'Farm' },
        { label: 'Processing recovery', detail: 'Usable output per raw input; throughput and utilization', owner: 'Plant' },
        { label: 'Quality acceptance', detail: 'Rejection rate against specification', owner: 'Buyer' },
        { label: 'Accepted marketable product', kind: 'outcome' },
      ],
      note: 'Use compatible NSO data and facility definitions.',
      takeaway: 'Benchmarking should show how efficiently resources become accepted marketable product.',
    },
  },
  'agri-crop-m4-9': {
    heading: 'Six commercial and financial capabilities decide whether low cost turns into advantage',
    intro: 'Commercial and financial outcomes sit alongside operational performance. A premium product creates value only when recurring demand exceeds its added cost.',
    spec: {
      layout: 'table', title: 'Which Capabilities Explain Farm-Level Competitive Advantage?', kicker: '',
      headers: ['Capability', 'What it shows', 'How to measure it'],
      rows: [
        { label: 'Delivered cost', a: 'Competitiveness at the customer', b: 'Cost per delivered unit' },
        { label: 'Grade', a: 'Quality the customer accepts', b: 'Grade achieved against specification' },
        { label: 'Retention', a: 'Whether demand recurs', b: 'Repeat business; customer concentration' },
        { label: 'Distribution', a: 'Reliable delivery and access', b: 'Delivery performance' },
        { label: 'Export readiness', a: 'Ability to serve overseas buyers', b: 'Readiness for destination requirements' },
        { label: 'Financial return', a: 'Whether premiums beat added cost', b: 'Delivered contribution' },
      ],
      takeaway: 'Low production cost is insufficient when quality, delivery or customer access is weak.',
    },
  },
  'agri-crop-m4-10': {
    heading: 'Invest where the measured bottleneck is, not in technology for its own sake',
    intro: 'Field and factory performance can improve without proportional resource expansion. Reducing drying loss can create value before adding acreage or plant capacity.',
    spec: {
      layout: 'decision', title: 'Why Do Soil, Seeds, and Agronomic Knowledge Matter?', kicker: '',
      root: { label: 'Need more quality output', detail: 'Before expanding acreage or plant capacity' },
      question: 'Where is the measured bottleneck?',
      branches: [
        { condition: 'Low field yield', outcome: 'Yield management', detail: 'Soil, seed and agronomic knowledge', tone: 'positive' },
        { condition: 'Slow or late field operations', outcome: 'Suitable mechanization', detail: 'Better timeliness and labor productivity', tone: 'positive' },
        { condition: 'Plant downtime or idle capacity', outcome: 'Maintenance and utilization', detail: 'Keep existing capacity running', tone: 'caution' },
        { condition: 'No bottleneck measured', outcome: 'Measure before investing', detail: 'Technology for its own sake adds cost', tone: 'negative' },
      ],
      takeaway: 'Productivity, recovery and utilization directly shape unit cost and available quality output.',
    },
  },
  'agri-crop-m4-11': {
    heading: 'Cutting loss and raising recovery can beat expanding area or capacity',
    intro: 'Input optimization, processing yield and post-harvest care improve field and factory performance without proportional resource expansion.',
    spec: {
      layout: 'compare', title: 'How Do Farming Efficiency and Risk Management Create Advantage?', kicker: '',
      leftTitle: 'Expand acreage or plant capacity', rightTitle: 'Improve efficiency first',
      rows: [
        { label: 'Resources needed', a: 'More land, inputs and plant', b: 'Existing resources used better' },
        { label: 'Input optimization', a: 'Input bill grows with area', b: 'Lower input use per tonne' },
        { label: 'Post-harvest', a: 'Existing drying losses grow too', b: 'Drying loss reduced at source' },
        { label: 'Processing yield', a: 'More raw input at the same recovery', b: 'More usable output per tonne' },
        { label: 'Unit cost', a: 'Stuck at current efficiency', b: 'Falls as usable output rises' },
      ],
      note: 'Invest in the measured bottleneck, not technology for its own sake.',
      takeaway: 'Productivity, recovery and utilization directly shape unit cost and available quality output.',
    },
  },
  'agri-crop-m4-12': {
    heading: 'Reliable quality comes from planning supply against customer commitments',
    intro: 'Quantity, timing and specification are aligned with customer commitments across cultivation, handling and processing. A processing defect may start in variety choice or harvest handling.',
    spec: {
      layout: 'flow', title: 'How Do Quality and Market Access Support Long-Term Success?', kicker: '',
      steps: [
        { label: 'Customer collaboration', detail: 'Real demand and specification', owner: 'Buyer and supplier' },
        { label: 'Production plan', detail: 'Quantity and timing to match', owner: 'Farm' },
        { label: 'Supplier coordination', detail: 'Farmers and collectors on shared specs', owner: 'Collector' },
        { label: 'Quality system', detail: 'Controls in handling and processing', owner: 'Factory' },
        { label: 'Traceability', detail: 'Links a defect back to variety or harvest', owner: 'Factory' },
        { label: 'Contingency', detail: 'Escalation when supply or quality slips', kind: 'outcome' },
      ],
      loop: 'Traced defects and escalations feed the next production plan.',
      takeaway: 'Reliable supply and quality require decisions across cultivation, handling and processing to reflect real demand.',
    },
  },
  'agri-crop-m4-13': {
    heading: 'The same factor can be a strength or a weakness depending on execution',
    intro: 'Strengths and weaknesses differ by crop and model. Export experience, for example, is a strength only while compliance and customer retention are sustained.',
    spec: {
      layout: 'compare', title: 'What Are Crop Production’s Major Strengths and Weaknesses?', kicker: '',
      leftTitle: 'A strength when…', rightTitle: 'A weakness when…',
      rows: [
        { label: 'Regional expertise', a: 'Production knowledge fits crop and region', b: 'Quality stays uneven' },
        { label: 'Modernization', a: 'It lifts productivity and value capture', b: 'It lags, leaving cost gaps' },
        { label: 'Export experience', a: 'Compliance and retention are sustained', b: 'Compliance or retention slip' },
        { label: 'Climate and input threats', a: 'Planned for crop by crop', b: 'Climate, resource and cost shocks hit' },
      ],
      note: 'Tailor SWOT to crop, region and processing stage.',
      takeaway: 'Opportunity centers on productivity and value capture while vulnerability stems from climate, resources, cost and uneven quality.',
    },
  },
  'agri-crop-m4-14': {
    heading: 'Fragmentation and value-added products each carry an opportunity and a threat',
    intro: 'Opportunities and threats differ by crop and model. Growth comes from productivity and value capture; vulnerability from climate, resources, cost and uneven quality.',
    spec: {
      layout: 'table', title: 'What Opportunities and Threats Affect Crop Producers?', kicker: '',
      headers: ['Factor', 'Opportunity', 'Threat'],
      rows: [
        { label: 'Fragmentation', a: 'Coordinate producers for consistent supply', b: 'Uneven quality across many small lots' },
        { label: 'Value-added product', a: 'Capture more value per crop', b: 'Added cost outruns customer value' },
        { label: 'Productivity', a: 'Lower unit cost from current resources', b: 'Input cost pressure erodes gains' },
        { label: 'Climate and resources', a: 'Resilient practice steadies supply', b: 'Weather and resource limits cut output' },
      ],
      note: 'Tailor SWOT to crop, region and processing stage.',
      takeaway: 'Opportunity centers on productivity and value capture while vulnerability stems from climate, resources, cost and uneven quality.',
    },
  },
  'agri-crop-m4-15': {
    heading: 'Resilience needs farm, procurement, processing, finance and market plans working together',
    intro: 'Weather, yield, raw shortages, deterioration, equipment failure, labor, cash and customer changes all threaten the business. A poor harvest can idle a plant, while excess output can create waste.',
    spec: {
      layout: 'driverTree', title: 'What Strategic Decisions Must Farmers and Agribusinesses Make?', kicker: '',
      root: { label: 'Business resilience', detail: 'Coordinated planning across the chain' },
      drivers: [
        { label: 'Farm planning', children: [{ label: 'Climate', detail: 'Weather and yield shocks' }] },
        { label: 'Procurement planning', children: [{ label: 'Inputs and price', detail: 'Input cost and price swings' }, { label: 'Supply diversity', detail: 'Raw-material shortages' }] },
        { label: 'Processing planning', children: [{ label: 'Quality and storage', detail: 'Deterioration and equipment failure' }] },
        { label: 'Finance planning', children: [{ label: 'Finance', detail: 'Cash and labor needs' }] },
        { label: 'Market planning', children: [{ label: 'Market risk', detail: 'Customer changes and surplus output' }] },
      ],
      note: 'Scenario planning should connect production, capacity, cash and market triggers.',
      takeaway: 'Resilience requires coordinated farm, procurement, processing, finance and market planning.',
    },
  },
};
