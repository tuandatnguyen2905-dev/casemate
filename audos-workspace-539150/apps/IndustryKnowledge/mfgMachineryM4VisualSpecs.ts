import type { MfgMachineryChapterVisual } from './mfgMachineryM1VisualSpecs';

/** Chapter-specific Learning Visuals for Machinery & Power Tools Module 04, keyed by visualKind. */
export const MFG_MACHINERY_M4_VISUALS: Record<string, MfgMachineryChapterVisual> = {
  'mfg-machinery-m4-1': {
    heading: 'Power tools and industrial machinery reward different capabilities, so they compete as separate markets',
    intro: 'Different customer processes, ticket sizes, switching costs, standards, manufacturing scales and service intensity shape rivalry, so concentration must be analyzed by defined category.',
    spec: {
      layout: 'compare', title: 'Competitive Structure Across Industry Segments', kicker: '',
      leftTitle: 'Professional power tools', rightTitle: 'Machine tools and industrial machinery',
      rows: [
        { label: 'What wins', a: 'Brands, cordless ecosystems and distribution', b: 'Precision, automation and application knowledge' },
        { label: 'Unit of competition', a: 'A battery-platform tool fleet', b: 'Process capability and integration' },
        { label: 'Offer shape', a: 'Broad, standardized portfolios', b: 'Customization and service' },
        { label: 'Concentration evidence', a: 'GMI: top five took 70.2% of 2025 revenue', b: 'Specialized categories, measured separately' },
      ],
      note: 'GMI estimates TTI took 21.1% of 2025 revenue in its defined power-tools market: a commercial estimate, not a machinery-wide share. Local channels compete on availability and response.',
      takeaway: 'Concentration and winning capabilities vary by product category; power tools and industrial machinery are not one market.',
    },
  },
  'mfg-machinery-m4-2': {
    heading: 'An entrant either funds a head-on portfolio or wins a niche that incumbents underserve',
    intro: 'Incumbents compound knowledge, scale, installed bases and relationships, but specialists can solve underserved applications or local service gaps.',
    spec: {
      layout: 'decision', title: 'Barriers to Entry and Competitive Intensity', kicker: '',
      root: { label: 'New entrant', detail: 'Faces capital and R&D, brand, qualification, switching-cost and safety barriers' },
      question: 'Which incumbent capability does the target segment require?',
      branches: [
        { condition: 'Broad battery system, dealers and repair', outcome: 'Head-on entry needs sustained investment', detail: 'Matching the full platform is slow', tone: 'caution' },
        { condition: 'Underserved application or service gap', outcome: 'Enter a focused niche', detail: 'One trade, customized machinery or service', tone: 'positive' },
        { condition: 'No certification or customer proof', outcome: 'Not yet able to qualify', detail: 'Customers qualify suppliers first', tone: 'negative' },
      ],
      note: 'Domestic entrants in Vietnam can focus on customized machinery, components, integration, service or locally relevant tool ranges rather than broad head-on portfolios.',
      takeaway: 'Defensible positions come from capabilities that cannot be replicated quickly, while entrants can win focused niches.',
    },
  },
  'mfg-machinery-m4-3': {
    heading: 'Five power-tool groups defend positions with different brand, platform and service mixes',
    intro: 'Battery compatibility and accessories create switching cost, while segment focus, direct relationships, dealer strength and support differentiate each offer.',
    spec: {
      layout: 'table', title: 'Leading Global Power Tool Manufacturers', kicker: '',
      headers: ['Company', 'Brands or reach', 'How it differentiates'],
      rows: [
        { label: 'TTI', a: 'Milwaukee, Ryobi and AEG', b: 'Milwaukee professional ecosystems; Ryobi accessible DIY breadth' },
        { label: 'Stanley Black & Decker', a: 'DEWALT, Craftsman and Stanley', b: 'A multi-brand portfolio' },
        { label: 'Bosch', a: 'Professional and DIY users', b: 'Covers both user segments' },
        { label: 'Makita', a: 'Professional users', b: 'A broad professional cordless range' },
        { label: 'Hilti', a: 'Professional construction', b: 'Specialized tools with direct service and fleet management' },
      ],
      note: 'Listed in the order the chapter names them, not ranked. Do not treat parent-company size or GMI market share as a universal technical ranking.',
      takeaway: 'Leading power-tool firms defend positions through distinct combinations of brands, platforms, portfolios, channels and service.',
    },
  },
  'mfg-machinery-m4-4': {
    heading: 'Industrial machinery leaders cluster by machine category, so each group competes on its own',
    intro: 'Precision, throughput, automation, software, customization, price, installed base and service differ by machine category and customer industry.',
    spec: {
      layout: 'taxonomy', title: 'Leading Industrial Machinery and Machine Tool Manufacturers', kicker: '',
      root: 'Industrial machinery leadership', rootDetail: 'Grouped by category and application, not ranked',
      groups: [
        { label: 'Sheet-metal systems', items: ['AMADA', 'TRUMPF'] },
        { label: 'Machining', detail: 'Serve different machining needs', items: ['DMG MORI', 'Haas Automation', 'Okuma/Makino'] },
        { label: 'Category specialists', detail: 'Other firms lead their own categories', items: ['Robotics', 'Controls', 'Compressors', 'Handling', 'Heavy equipment'] },
      ],
      note: 'A laser sheet-metal system and a CNC machining center can share factory customers but are not direct substitutes. In Vietnam, global OEMs sell through subsidiaries, distributors and integrators.',
      takeaway: 'Industrial machinery leadership is product- and application-specific; no universal company hierarchy represents the whole industry.',
    },
  },
  'mfg-machinery-m4-5': {
    heading: 'In Vietnam, each type of participant competes on a different strength',
    intro: 'International brands compete on technology and reputation, domestic companies on cost, customization and response, and distributors and integrators on access, application and lifecycle support.',
    spec: {
      layout: 'table', title: "Vietnam's Competitive Landscape", kicker: '',
      headers: ['Participant type', 'Competes on', 'Where it plays'],
      rows: [
        { label: 'International brands', a: 'Technology and reputation', b: 'Advanced machinery, supplied internationally' },
        { label: 'Domestic manufacturers', a: 'Cost, customization and response', b: 'Selected parts, systems and fabrication' },
        { label: 'Distributors', a: 'Access', b: 'Brand distribution and local supply' },
        { label: 'Integrators', a: 'Application', b: 'Industrial integration and project services' },
        { label: 'Service providers', a: 'Lifecycle support', b: 'Maintenance, repair and adaptation' },
      ],
      note: 'THACO Industries, VEAM and LILAMA work in different activities and should not be ranked as one market. China supplied over 63% of roughly US$61B broad machinery/equipment imports in 2025: source-country share, not brand share.',
      takeaway: 'Vietnam combines imported technology with local manufacturing, engineering, channels and service capabilities.',
    },
  },
  'mfg-machinery-m4-6': {
    heading: 'The best power-tool brand depends on how a user weights six benchmark dimensions',
    intro: 'Benchmark Milwaukee, Ryobi, DEWALT, Bosch, Makita, Hilti and specialists on duty, ergonomics, batteries, accessories, safety, availability, service, total ownership and price.',
    spec: {
      layout: 'driverTree', title: 'Benchmarking Global Power Tool Brands', kicker: '',
      root: { label: 'Best fit for this user and job', detail: 'Not size or awareness alone' },
      drivers: [
        { label: 'Product performance', children: [{ label: 'Duty' }, { label: 'Ergonomics and safety' }] },
        { label: 'Brand positioning', children: [{ label: 'Professional specialization' }, { label: 'Consumer accessibility' }] },
        { label: 'Battery compatibility', children: [{ label: 'Fleet compatibility' }, { label: 'Genuine batteries' }] },
        { label: 'Portfolio breadth', children: [{ label: 'Accessories' }, { label: 'Occasional-use versatility' }] },
        { label: 'Distribution reach', children: [{ label: 'Authorized stock' }, { label: 'Dealer advice' }] },
        { label: 'Service and pricing', children: [{ label: 'Repair turnaround' }, { label: 'Total ownership and price' }] },
      ],
      note: 'A contractor may weight fleet compatibility and repair turnaround; a household user price, ease and versatility. State evidence and weights; qualitative tables are not verified rankings.',
      takeaway: 'The strongest brand depends on target user and job—not size or awareness alone.',
    },
  },
  'mfg-machinery-m4-7': {
    heading: 'Machinery suppliers are benchmarked on application evidence, ending in lifecycle cost',
    intro: 'Advanced equipment can fail commercially with weak local support, while low acquisition cost can be unsuitable for required precision or uptime.',
    spec: {
      layout: 'flow', title: 'Benchmarking Industrial Machinery and Vietnam Market Participants', kicker: '',
      steps: [
        { label: 'Set acceptance criteria', detail: 'Part quality, cycle, changeover, uptime', owner: 'Factory' },
        { label: 'Application tests', detail: 'Precision, throughput and integration' },
        { label: 'Reference sites', detail: 'Service evidence and response' },
        { label: 'TCO scenarios', detail: 'Capex, energy, parts and lifecycle cash' },
        { label: 'Supplier selection', detail: 'Against criteria and roadmap, not list price', kind: 'outcome' },
      ],
      note: 'In Vietnam, international suppliers offer mature technology; domestic and regional firms can offer responsiveness and customization with varying technical depth.',
      takeaway: 'Customer outcomes and local operating conditions matter more than brand prestige.',
    },
  },
  'mfg-machinery-m4-8': {
    heading: 'Competitiveness needs useful innovation and repeatable execution together',
    intro: 'Advanced technology creates no value if it cannot be manufactured, delivered, operated and maintained reliably at an accepted cost.',
    spec: {
      layout: 'driverTree', title: 'Technology, Product Quality, and Operational Efficiency', kicker: '',
      root: { label: 'Sustainable competitiveness', detail: 'Innovation that survives manufacturing and field use' },
      formula: 'Useful innovation × repeatable, serviceable execution',
      drivers: [
        { label: 'Continuous R&D', children: [{ label: 'Tools: motors, batteries, ergonomics' }, { label: 'Machinery: precision, automation' }] },
        { label: 'Quality management', children: [{ label: 'Metrology' }, { label: 'Traceability' }] },
        { label: 'Manufacturing productivity', children: [{ label: 'Yield' }, { label: 'Cost control' }] },
        { label: 'Product reliability', children: [{ label: 'Durability and vibration' }, { label: 'Uptime' }] },
        { label: 'Technology integration', children: [{ label: 'Sensors and data' }, { label: 'Software' }] },
        { label: 'Lifecycle performance', children: [{ label: 'Serviceability' }, { label: 'Field performance' }] },
      ],
      note: 'Predictive monitoring is useful only with reliable sensors, data, a maintenance process, parts and customer adoption.',
      takeaway: 'Sustainable competitiveness balances useful innovation with repeatable, serviceable, commercially viable execution.',
    },
  },
  'mfg-machinery-m4-9': {
    heading: 'Each relationship touchpoint removes a purchase, operation or downtime risk',
    intro: 'A capable product underperforms if unavailable or unsupported: machinery customers need consultation and uptime, and tool users need compatible stock and fast repair.',
    spec: {
      layout: 'flow', title: 'Brand, Distribution, Service, and Customer Relationships', kicker: '',
      steps: [
        { label: 'Brand positioning', detail: 'Communicates performance and fit' },
        { label: 'Channel access', detail: 'Stock and demonstration', owner: 'Dealer / distributor' },
        { label: 'Technical sales', detail: 'Selects the right application' },
        { label: 'After-sales support', detail: 'Training, parts, repair and maintenance', owner: 'Service' },
        { label: 'Customer retention', detail: 'Repeat purchase through platforms', kind: 'outcome' },
      ],
      loop: 'Fast repair, genuine parts and compatible stock keep the installed-base relationship and bring the customer back.',
      note: 'In Vietnam, Vietnamese-language documentation, industrial-region stock and accessible service can differentiate similar imported products.',
      takeaway: 'Customer relationships are advantage when they reduce purchase, operation and downtime risk.',
    },
  },
  'mfg-machinery-m4-10': {
    heading: 'Engineering and installed bases are strengths; capital and component exposure are weaknesses',
    intro: 'Large firms fund platforms and channels, smaller firms can be flexible but lack scale and service, and Vietnam adds industrial demand and import dependency.',
    spec: {
      layout: 'taxonomy', title: 'SWOT Analysis of the Machinery & Power Tools Industry', kicker: '',
      root: 'Machinery and power tools SWOT', rootDetail: 'Define it per product and company',
      groups: [
        { label: 'Strengths', items: ['Engineering', 'Brands', 'Installed bases'] },
        { label: 'Weaknesses', items: ['Capital needs', 'R&D burden', 'Component and inventory exposure'] },
        { label: 'Opportunities', items: ['Automation', 'Cordless', 'Connectivity', 'Localization', 'Aftermarket'] },
        { label: 'Threats', items: ['Price pressure', 'Trade', 'Shortages', 'Counterfeits', 'Rapid change'] },
      ],
      note: 'Cordless ecosystems support repeat sales but require continuous battery, tool, accessory and service investment. Connect each item to evidence, priorities, owners and triggers.',
      takeaway: 'Technology and essential productivity demand create opportunity, but profitability depends on managing capital, complexity, supply and service.',
    },
  },
  'mfg-machinery-m4-11': {
    heading: 'Each strategic challenge has a matching operational response',
    intro: 'Falling behind reduces relevance while overinvestment weakens returns; price-only rivalry erodes service and quality; dependency increases disruption.',
    spec: {
      layout: 'table', title: 'Strategic Challenges and Competitive Responses', kicker: '',
      headers: ['Challenge', 'Risk if mishandled', 'Response'],
      rows: [
        { label: 'Technology transition', a: 'Lost relevance or overinvestment', b: 'Staged technology cases' },
        { label: 'Supply resilience', a: 'Disruption from concentrated components', b: 'Qualify alternatives; risk maps' },
        { label: 'Price/margin management', a: 'Price-only rivalry erodes service', b: 'Standardized platforms; product-tier economics' },
        { label: 'Talent development', a: 'Skill shortages', b: 'Train technicians; talent plans' },
        { label: 'Quality/authenticity', a: 'Counterfeit products', b: 'Authenticated channels; traceability' },
        { label: 'Service differentiation', a: 'Weak support for installed assets', b: 'Grow service around installed assets' },
      ],
      note: 'Vietnam supplier upgrading needs precision, quality systems, documentation, delivery and direct OEM linkage; service networks are a practical differentiator.',
      takeaway: 'Resilient companies combine selective innovation with disciplined operations, sourcing, talent and customer support.',
    },
  },
};
