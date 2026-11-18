import type { MfgBuildingChapterVisual } from './mfgBuildingVisualSpecs';

/** Chapter-specific Learning Visuals for Building Materials & Coatings Module 05, keyed by visualKind. */
export const MFG_BUILDING_M5_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  'mfg-building-m5-1': {
    heading: 'Buyers are shifting from buying a product to buying a finished result',
    intro: 'Renovation demand for repainting, waterproofing and repairs puts weight on ease of application, low maintenance and suitability for weather, moisture, heat or corrosion.',
    spec: {
      layout: 'compare', title: '01 How Are Construction and Renovation Requirements Changing?', kicker: '',
      leftTitle: 'Judged on product price alone', rightTitle: 'Judged on the complete building outcome',
      rows: [
        { label: 'What is bought', a: 'A can, bag or sheet at a price', b: 'A repainted, waterproofed or repaired building' },
        { label: 'Application', a: 'Left to the site', b: 'Easy to apply, with instructions and training' },
        { label: 'Performance', a: 'Generic claims', b: 'Suited to weather, moisture, heat or corrosion' },
        { label: 'After handover', a: 'Not considered', b: 'Visual quality, comfort and low maintenance' },
      ],
      note: 'Translate local climate and contractor needs into compatible systems, instructions, training and realistic performance claims.',
      takeaway: 'Customers increasingly evaluate complete building outcomes rather than product price alone.',
    },
  },
  'mfg-building-m5-2': {
    heading: 'Lifecycle cost adds everything after purchase to the installed price',
    intro: 'Lifecycle cost is installed cost plus operation, maintenance, repair, replacement and end-of-life cost. Durability and quality lower the later terms.',
    spec: {
      layout: 'driverTree', title: '02 Why Are Durability, Quality and Lifecycle Value More Important?', kicker: '',
      root: { label: 'Lifecycle cost', detail: 'Total cost over the building element’s life' },
      formula: 'Installed + operation + maintenance + repair + replacement + end-of-life',
      drivers: [
        { label: 'Installed cost', detail: 'Product price plus application', children: [{ label: 'Product price' }, { label: 'Ease of application' }] },
        { label: 'Operation', detail: 'Comfort and energy in use' },
        { label: 'Maintenance and repair', detail: 'Lower when quality is consistent', children: [{ label: 'Durability' }, { label: 'Visual quality' }] },
        { label: 'Replacement', detail: 'Delayed by resistance to weather, moisture, heat or corrosion' },
        { label: 'End-of-life', detail: 'Removal and disposal' },
      ],
      takeaway: 'Customers increasingly evaluate complete building outcomes rather than product price alone.',
    },
  },
  'mfg-building-m5-3': {
    heading: 'Climate exposure and design expectations each call for a specific product response',
    intro: 'A reflective exterior coating can be assessed through appearance, application, weatherability, maintenance and building conditions — design and climate response together.',
    spec: {
      layout: 'table', title: '03 How Are Climate and Design Expectations Shaping Products?', kicker: '',
      headers: ['Expectation', 'What customers look for', 'Product response'],
      rows: [
        { label: 'Heat', a: 'Comfort indoors', b: 'Reflective exterior coatings' },
        { label: 'Moisture', a: 'Dry, sound structures', b: 'Compatible waterproofing systems' },
        { label: 'Weather', a: 'Finishes that last outdoors', b: 'Weatherable coatings' },
        { label: 'Corrosion', a: 'Protected metal and structures', b: 'Protective, corrosion-resistant systems' },
        { label: 'Design', a: 'Visual quality and appearance', b: 'Colour and finish range' },
      ],
      note: 'Performance claims must be realistic for local climate and building conditions.',
      takeaway: 'Customers increasingly evaluate complete building outcomes rather than product price alone.',
    },
  },
  'mfg-building-m5-4': {
    heading: 'Digital quality monitoring closes the loop from sensor data to measured results',
    intro: 'Sensors, laboratory systems and predictive maintenance let plants act on data. The value shows up only in measured yield, energy and quality against a clear baseline.',
    spec: {
      layout: 'flow', title: '04 How Are Automation and Digital Quality Monitoring Evolving?', kicker: '',
      steps: [
        { label: 'Set a baseline', detail: 'Current yield, energy and quality' },
        { label: 'Sense the process', detail: 'Sensors capture process data' },
        { label: 'Test in the laboratory', detail: 'Laboratory systems check batches and colour' },
        { label: 'Analyse and predict', detail: 'Flag drift; predictive maintenance' },
        { label: 'Automate the adjustment', detail: 'Correct the process quickly' },
        { label: 'Measured improvement', detail: 'Yield, energy and quality vs baseline', kind: 'outcome' },
      ],
      loop: 'Each measured result becomes the baseline for the next improvement.',
      note: 'Digital colour tools extend the same data discipline to customer selection.',
      takeaway: 'Technology creates value when it improves measurable factory or customer performance.',
    },
  },
  'mfg-building-m5-5': {
    heading: 'Technology is advancing in the factory, in materials and in specification',
    intro: 'Development spans process analytics and laboratory systems, protective formulations, insulation and adhesives, and BIM data and specification tools.',
    spec: {
      layout: 'taxonomy', title: '05 How Are Advanced Materials and Coating Technologies Developing?', kicker: '',
      root: 'Technology development areas', rootDetail: 'Areas, each judged on measurable performance',
      groups: [
        { label: 'Factory', detail: 'Make products more consistently', items: ['Sensors', 'Process analytics', 'Laboratory systems'] },
        { label: 'Materials and coatings', detail: 'Better in-use performance', items: ['Protective formulations', 'Insulation', 'Adhesives'] },
        { label: 'Specification', detail: 'Help customers choose correctly', items: ['BIM data', 'Visualization', 'Specification tools'] },
      ],
      note: 'Prioritize yield, energy, quality, durability, selection and application problems with clear baselines and scale economics.',
      takeaway: 'Technology creates value when it improves measurable factory or customer performance.',
    },
  },
  'mfg-building-m5-6': {
    heading: 'Digital product data helps only when it is current and traceable',
    intro: 'A BIM object supports selection only when product data, system compatibility and technical documentation are current. Traceability links the record to what was actually made.',
    spec: {
      layout: 'decision', title: '06 How Are Energy-Efficient Processes and Digital Product Data Evolving?', kicker: '',
      root: { label: 'Digital product record', detail: 'e.g. a BIM object for an advanced coating' },
      question: 'Are product data, system compatibility and technical documentation current and traceable?',
      branches: [
        { condition: 'Current and traceable', outcome: 'Supports selection and specification', tone: 'positive' },
        { condition: 'Partly outdated', outcome: 'Update before specifiers rely on it', tone: 'caution' },
        { condition: 'Not maintained', outcome: 'Misleads selection; withdraw or fix', tone: 'negative' },
      ],
      note: 'In the plant, energy-efficiency projects need the same discipline: clear baselines and scale economics.',
      takeaway: 'Technology creates value when it improves measurable factory or customer performance.',
    },
  },
  'mfg-building-m5-7': {
    heading: 'Category demand signals feed a coordinated offer sold through several channels',
    intro: 'Demand from transport, industrial parks, housing, commercial buildings and maintenance reaches manufacturers through dealers, projects, catalogs and specification tools.',
    spec: {
      layout: 'pathway', title: '07 How Are Infrastructure, Renovation and Project Channels Evolving?', kicker: '',
      trunk: [
        { label: 'Read demand signals by category', detail: 'Infrastructure and renovation' },
        { label: 'Build a coordinated offer', detail: 'Distribution, digital information, technical engagement' },
      ],
      optionsLabel: 'Routes to market — alternatives, often combined',
      options: [
        { label: 'Project procurement', detail: 'Transport, industrial parks, commercial buildings' },
        { label: 'Dealers', detail: 'Housing and maintenance demand' },
        { label: 'Catalogs', detail: 'Product range and data' },
        { label: 'Specification tools', detail: 'Support designers and engineers' },
      ],
      note: 'Improve dealer capability, project pipelines and specification support alongside reading demand.',
      takeaway: 'Market access increasingly requires coordinated physical distribution, digital information and technical engagement.',
    },
  },
  'mfg-building-m5-8': {
    heading: 'Modernized channels combine dealer stock with digital discovery and technical engagement',
    intro: 'Channel modernization means coordinating physical distribution, digital information and technical engagement rather than relying on dealer stock alone.',
    spec: {
      layout: 'compare', title: '08 How Are Consolidation, Exports and Channel Modernization Developing?', kicker: '',
      leftTitle: 'Dealer-stock access', rightTitle: 'Modernized, coordinated access',
      rows: [
        { label: 'Discovery', a: 'Dealer counter and catalogs', b: 'Digital discovery and specification tools' },
        { label: 'Physical distribution', a: 'Whatever the dealer holds', b: 'Dealer stock aligned with project pipelines' },
        { label: 'Technical engagement', a: 'Ad hoc', b: 'Planned specification support' },
        { label: 'Demand reading', a: 'New-construction orders as they come', b: 'New construction and renovation signals by category' },
      ],
      note: 'Keep product measures separate when tracking channel or export change: tonnes, m² and units are not combined.',
      takeaway: 'Market access increasingly requires coordinated physical distribution, digital information and technical engagement.',
    },
  },
  'mfg-building-m5-9': {
    heading: 'An integrated system bundles compatible components into one offer',
    intro: 'A manufacturer can bundle waterproofing, adhesives, grouts and finishes to simplify compatibility and procurement, especially for renovation work.',
    spec: {
      layout: 'taxonomy', title: '09 How Are Integrated Systems and Higher-Value Portfolios Expanding?', kicker: '',
      root: 'Integrated system offer', rootDetail: 'Components chosen to work together',
      groups: [
        { label: 'Waterproofing', detail: 'Protects the substrate' },
        { label: 'Adhesives', detail: 'Fixes tiles or panels' },
        { label: 'Grouts', detail: 'Seals joints' },
        { label: 'Finishes', detail: 'Appearance and surface protection' },
        { label: 'Technical engagement', detail: 'Instructions and specification support' },
      ],
      note: 'Bundling simplifies compatibility for the contractor and procurement for the buyer.',
      takeaway: 'Market access increasingly requires coordinated physical distribution, digital information and technical engagement.',
    },
  },
  'mfg-building-m5-11': {
    heading: 'Digital product information rules are arriving in stages',
    intro: 'EU Regulation 2024/3110 supports digital construction-product information and a future Digital Product Passport system, but detailed duties depend on product rules and implementation.',
    spec: {
      layout: 'timeline', title: '11 How Are Industrial Emissions and Resource Efficiency Requirements Evolving?', kicker: '',
      events: [
        { period: 'Framework', label: 'EU Regulation 2024/3110', detail: 'Revised construction-products framework with digital information', status: 'current' },
        { period: 'Now', label: 'Manufacturers build traceable data', detail: 'Performance and environmental information', status: 'current' },
        { period: 'Next', label: 'Product rules and implementation', detail: 'Set the detailed duties per product', status: 'forecast' },
        { period: 'Later', label: 'Construction DPP system', detail: 'Commission empowered to establish it', status: 'forecast' },
      ],
      note: 'Stage energy, SCM, alternative-fuel and lower-emission coating formulation investments against economics.',
      takeaway: 'Sustainability is becoming a market-access and investment issue that requires product-specific evidence.',
    },
  },
  'mfg-building-m5-12': {
    heading: 'A credible low-carbon claim is built from product-specific evidence',
    intro: 'Low-carbon and circularity claims need lifecycle assessment and traceable data for the specific product before they can support market access.',
    spec: {
      layout: 'flow', title: '12 How Are Low-Carbon Materials, Circularity and Claims Developing?', kicker: '',
      steps: [
        { label: 'Define the product', detail: 'Scope, application and geography' },
        { label: 'Lifecycle assessment', detail: 'Environmental impact of that product' },
        { label: 'Traceable data', detail: 'Secondary materials, recyclability, process change' },
        { label: 'Substantiated claim', detail: 'Says only what the evidence supports' },
        { label: 'Market access', detail: 'Credible claim accepted by buyers', kind: 'outcome' },
      ],
      note: 'Low-carbon routes carry cost: IEA estimates early CCS-based near-zero cement production costs 75–150% above conventional plants depending on region.',
      takeaway: 'Sustainability is becoming a market-access and investment issue that requires product-specific evidence.',
    },
  },
  'mfg-building-m5-13': {
    heading: 'Future demand combines core-volume recovery with higher-value needs',
    intro: 'Demand will come from volume recovery in core materials plus premium finishes, waterproofing, corrosion protection, repair, technical service, energy efficiency and verifiable environmental information.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Building-Materials Demand?', kicker: '',
      root: { label: 'Future building-materials demand', detail: 'Volume and value, by category' },
      drivers: [
        { label: 'Core-volume recovery', detail: 'Volume returning in core materials', children: [{ label: 'Infrastructure' }, { label: 'Construction activity' }] },
        { label: 'Higher-value products', detail: 'Premium and protective', children: [{ label: 'Premium finishes' }, { label: 'Waterproofing' }, { label: 'Corrosion protection' }] },
        { label: 'Integrated solutions', detail: 'Systems with service', children: [{ label: 'Repair' }, { label: 'Technical service' }] },
        { label: 'Performance and evidence', detail: 'What buyers increasingly require', children: [{ label: 'Energy efficiency' }, { label: 'Environmental information' }] },
      ],
      note: 'Coatings only: Grand View Research estimates US$219.9B in 2025 and forecasts US$333.6B for 2033 — a commercial estimate, not the whole industry. Growth does not guarantee profit.',
      takeaway: 'The strongest opportunities combine demand recovery with selective product and capability upgrading.',
    },
  },
  'mfg-building-m5-14': {
    heading: 'Higher-value opportunities pair a demand need with a capability to serve it',
    intro: 'Renovation, protection, repair and energy efficiency offer higher value than commodity volume, while operational upgrading protects returns underneath them.',
    spec: {
      layout: 'table', title: '14 Where Are Higher-Value Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      headers: ['Opportunity', 'Demand it serves', 'Capability it needs'],
      rows: [
        { label: 'Premium finishes', a: 'Renovation and visual quality', b: 'Formulation and dealer reach' },
        { label: 'Waterproofing and repair', a: 'Moisture and building damage', b: 'Compatible systems and trained application' },
        { label: 'Corrosion protection', a: 'Infrastructure and industrial assets', b: 'Tested protective systems' },
        { label: 'Energy efficiency', a: 'Comfort and operating cost', b: 'Verifiable performance data' },
        { label: 'Operational upgrading', a: 'Cost discipline under price pressure', b: 'Energy, freight and utilization control' },
      ],
      note: 'Prioritize segments where customer demand, channel access, technical capability and willingness to pay support sustainable returns.',
      takeaway: 'The strongest opportunities combine demand recovery with selective product and capability upgrading.',
    },
  },
  'mfg-building-m5-15': {
    heading: 'Position only where demand, access, capability and willingness to pay line up',
    intro: 'Growth in coatings or materials does not guarantee profit when discounting, freight, energy, idle capacity or receivables deteriorate.',
    spec: {
      layout: 'decision', title: '15 How Should Building-Materials Companies Position Themselves?', kicker: '',
      root: { label: 'Candidate position', detail: 'e.g. protective systems or sustainability differentiation' },
      question: 'Do customer demand, channel access, technical capability and willingness to pay all support sustainable returns?',
      branches: [
        { condition: 'All four in place', outcome: 'Upgrade selectively into this segment', tone: 'positive' },
        { condition: 'Demand exists, capability or access weak', outcome: 'Build capability before scaling', tone: 'caution' },
        { condition: 'Volume growth only, margins deteriorating', outcome: 'Growth will not become profit', detail: 'Discounting, freight, energy, idle capacity or receivables', tone: 'negative' },
      ],
      note: 'Sustainability differentiation needs verifiable environmental information to count with customers.',
      takeaway: 'The strongest opportunities combine demand recovery with selective product and capability upgrading.',
    },
  },
};
