import type { MfgTextilesChapterVisual } from './mfgTextilesVisualSpecs';

/** Chapter-specific Learning Visuals for Textiles & Apparel Manufacturing Module 05, keyed by visualKind. */
export const MFG_TEXTILES_M5_VISUALS: Record<string, MfgTextilesChapterVisual> = {
  'mfg-textiles-m5-1': {
    heading: 'Consumer expectations reach the factory as measurable brand requirements',
    intro: 'Brands translate consumer expectations into softness, stretch, breathability, moisture management, fit, longevity, care and target price. Manufacturers must turn those into material, construction, test and cost requirements.',
    spec: {
      layout: 'table', title: '01 How Are Apparel Demand and Buyer Requirements Changing?', kicker: '',
      headers: ['Consumer outcome', 'Brand translates it into', 'Factory must specify'],
      rows: [
        { label: 'Comfort', a: 'Softness, stretch, breathability and fit', b: 'Material and construction' },
        { label: 'Affordability', a: 'Target price', b: 'Cost' },
        { label: 'Durability', a: 'Longevity and care', b: 'Tests such as wash performance' },
      ],
      note: 'Sportswear prioritizes stretch and moisture handling while basics emphasize comfort, wash performance and affordability.',
      takeaway: 'Manufacturers must balance function, quality and cost across increasingly varied buyer briefs.',
    },
  },
  'mfg-textiles-m5-2': {
    heading: 'Performance, versatility and easy care are distinct parts of a functional buyer brief',
    intro: 'Buyer briefs increasingly combine performance, versatility and easy care with quality and cost. Sportswear prioritizes stretch and moisture handling, while basics emphasize comfort and wash performance.',
    spec: {
      layout: 'taxonomy', title: '02 Why Are Functionality, Quality and Sustainability More Important?', kicker: '',
      root: 'Functional requirements in a buyer brief', rootDetail: 'Balanced against quality and target price',
      groups: [
        { label: 'Performance', items: ['Stretch', 'Breathability', 'Moisture management'] },
        { label: 'Versatility', detail: 'Briefs vary by product, so requirements must be balanced each time' },
        { label: 'Easy care', items: ['Care', 'Wash performance'] },
      ],
      note: 'Translate consumer outcomes into measurable material, construction, test and cost requirements.',
      takeaway: 'Manufacturers must balance function, quality and cost across increasingly varied buyer briefs.',
    },
  },
  'mfg-textiles-m5-3': {
    heading: 'Smaller, faster programs are worth taking only when setup costs stay controlled',
    intro: 'Buyers test more designs, reduce initial quantities, replenish winners and adapt colors, sizes or branding. Frequent style changes raise setup, material swaps and planning complexity even when total volume is unchanged.',
    spec: {
      layout: 'decision', title: '03 How Are Smaller Orders and Faster Product Cycles Evolving?', kicker: '',
      root: { label: 'Small-batch or fast-cycle program', detail: 'Small batches, rapid replenishment, customization and short development' },
      question: 'Do setup and style-change costs stay economically controlled?',
      branches: [
        { condition: 'Modular lines and style-change costing', outcome: 'Serve the program profitably', detail: 'Flexible scheduling absorbs changes', tone: 'positive' },
        { condition: 'Costs only partly covered', outcome: 'Apply minimum-order rules', detail: 'Price setup economics into the order', tone: 'caution' },
        { condition: 'Setup costs uncontrolled', outcome: 'Flexibility erodes margin', detail: 'More changes, same volume, higher cost', tone: 'negative' },
      ],
      note: 'Use modular lines, digital development, minimum-order rules and style-change costing to serve responsive programs profitably.',
      takeaway: 'Flexibility is valuable only when smaller orders and faster cycles remain economically controlled.',
    },
  },
  'mfg-textiles-m5-4': {
    heading: 'Each smart-manufacturing tool targets a specific bottleneck and has its own precondition',
    intro: 'Smart manufacturing covers MES, scheduling, automated spreading and cutting, vision inspection, machine data and analytics. Technology should solve defined productivity, quality or delivery bottlenecks.',
    spec: {
      layout: 'table', title: '04 How Are Automated Cutting and Smart Manufacturing Developing?', kicker: '',
      headers: ['Technology', 'Bottleneck it targets', 'Precondition'],
      rows: [
        { label: 'Automated cutting', a: 'Spreading and cutting', b: 'Scale economics' },
        { label: 'Digital planning', a: 'Scheduling through MES', b: 'Data discipline' },
        { label: 'AI inspection', a: 'Defect detection', b: 'Representative data, validated thresholds, human review' },
        { label: 'Predictive maintenance', a: 'Machine downtime', b: 'Machine data and maintenance routines' },
        { label: 'Factory analytics', a: 'Performance across mills and factories', b: 'Measurable use cases' },
        { label: 'Worker adoption', a: 'Use on the shop floor', b: 'Training' },
      ],
      note: 'Start with measurable use cases, data discipline, maintenance, training and scale economics rather than technology labels.',
      takeaway: 'Technology should solve defined productivity, quality or delivery bottlenecks.',
    },
  },
  'mfg-textiles-m5-5': {
    heading: 'A 3D sample cuts iterations but physical validation is still required',
    intro: 'Digital development offers virtual fit and appearance, pattern accuracy and fewer physical iterations. A 3D sample cannot replace required physical validation of fit, hand feel and performance.',
    spec: {
      layout: 'compare', title: '05 How Are Digital Patterns, 3D Samples and MES Improving Operations?', kicker: '',
      leftTitle: 'Virtual sample (3D simulation)', rightTitle: 'Physical validation',
      rows: [
        { label: 'Fit', a: 'Virtual fit check', b: 'Required on a physical sample' },
        { label: 'Appearance', a: 'Simulated appearance', b: 'Confirmed on the real fabric' },
        { label: 'Hand feel', a: 'Cannot be assessed', b: 'Required' },
        { label: 'Functional fabrics', a: 'Performance assumed', b: 'Performance verified by test' },
        { label: 'Iterations', a: 'Fewer physical rounds', b: 'Still needed before production' },
      ],
      note: 'Combine design tools with technical teams, approved materials, test evidence and production-ready specifications.',
      takeaway: 'Digital development and advanced materials create advantage when performance and claims are verified.',
    },
  },
  'mfg-textiles-m5-6': {
    heading: 'Digital patterns, recycled fibers and traceability create advantage only when claims are verified',
    intro: 'Advanced development combines pattern accuracy, recycled or regenerated inputs and performance finishes. Each creates advantage only when performance and claims are verified.',
    spec: {
      layout: 'driverTree', title: '06 How Can AI and Advanced Materials Transform Production?', kicker: '',
      root: { label: 'Advantage from advanced materials', detail: 'Only when performance and claims are verified' },
      drivers: [
        { label: 'Digital patterns', detail: 'Pattern accuracy and fewer physical iterations', op: '+', children: [{ label: 'Pattern accuracy' }, { label: 'Fewer iterations' }] },
        { label: 'Recycled fibers', detail: 'Recycled or regenerated inputs', op: '+', children: [{ label: 'Regenerated inputs' }, { label: 'Performance finishes' }] },
        { label: 'Material traceability', detail: 'Records that support the material claim', op: '×', children: [{ label: 'Approved materials' }, { label: 'Test evidence' }] },
      ],
      note: 'A 3D sample can reduce iterations but cannot replace required physical validation of fit, hand feel and performance.',
      takeaway: 'Digital development and advanced materials create advantage when performance and claims are verified.',
    },
  },
  'mfg-textiles-m5-7': {
    heading: 'A tariff difference starts a sourcing review, but switching risk decides the move',
    intro: 'Brands reallocate products across manufacturing hubs based on capacity, materials, quality, tariffs, logistics and risk. A 2026 tariff difference can change landed cost, but switching suppliers carries development, quality and timing risk.',
    spec: {
      layout: 'decision', title: '07 How Are Sourcing Diversification and Regional Networks Evolving?', kicker: '',
      root: { label: 'Tariff difference between hubs', detail: 'e.g. a 2026 tariff change alters landed cost' },
      question: 'Does the gain still hold after development, quality and timing risk?',
      branches: [
        { condition: 'Gain outweighs switching risk', outcome: 'Add or shift a sourcing country', detail: 'Multi-country sourcing', tone: 'positive' },
        { condition: 'Gain uncertain', outcome: 'Diversify suppliers gradually', detail: 'Supplier diversification spreads risk', tone: 'caution' },
        { condition: 'Switching risk outweighs gain', outcome: 'Keep the supplier, manage exposure', detail: 'Trade-aware sourcing without a move', tone: 'negative' },
      ],
      note: 'VietnamPlus reports tariff and cost pressure; suppliers are emphasizing higher-value orders, productivity and market diversification.',
      takeaway: 'Location decisions balance cost, trade, capability, lead time and resilience — not wages alone.',
    },
  },
  'mfg-textiles-m5-8': {
    heading: 'Total landed cost adds freight, duties, delays, quality and coordination to the product price',
    intro: 'Total landed cost is product cost plus freight, duties, inventory, delays, quality and coordination costs. Regional linkages and vertical integration change several of these at once.',
    spec: {
      layout: 'driverTree', title: '08 How Are Lead Times, Supplier Consolidation and Visibility Changing?', kicker: '',
      root: { label: 'Total landed cost', detail: 'What a sourcing location really costs' },
      formula: 'Product cost + freight + duties + inventory + delays + quality + coordination',
      drivers: [
        { label: 'Product cost', detail: 'The factory price' },
        { label: 'Freight and duties', detail: 'Logistics and tariffs', op: '+', children: [{ label: 'Freight' }, { label: 'Duties' }] },
        { label: 'Inventory and delays', detail: 'Lead time carried as stock or lost to waiting', op: '+', children: [{ label: 'Inventory' }, { label: 'Delays' }] },
        { label: 'Quality and coordination', detail: 'Cost of defects and managing suppliers', op: '+', children: [{ label: 'Quality' }, { label: 'Coordination' }] },
      ],
      note: 'Regional linkages and vertical integration can change lead time and coordination cost; compare locations on the full total, not wages alone.',
      takeaway: 'Location decisions balance cost, trade, capability, lead time and resilience — not wages alone.',
    },
  },
  'mfg-textiles-m5-9': {
    heading: 'Visibility pays off when an early alert leads to a planning action',
    intro: 'Export supply chains share specifications, approvals, material status, production milestones, quality records, documents and logistics across firms. An early fabric-delay alert creates value when planners can act on it.',
    spec: {
      layout: 'flow', title: '09 How Can Vietnam Upgrade Within Export Supply Chains?', kicker: '',
      steps: [
        { label: 'Order tracking', detail: 'Material status and milestones recorded', owner: 'Factory' },
        { label: 'Early alert', detail: 'e.g. a fabric delay flagged through a supplier portal', owner: 'Supplier' },
        { label: 'Integrated planning', detail: 'Planners see the impact across lines', owner: 'Planning' },
        { label: 'Exception action', detail: 'Resequence work, expedite approval or revise delivery', kind: 'decision', owner: 'Planning and buyer' },
        { label: 'Reliable delivery', kind: 'outcome', owner: 'Buyer' },
      ],
      loop: 'Material traceability and digital quality records keep the data accurate enough to act on.',
      note: 'Connect buyer portals to purchasing, inventory, production, quality and logistics with clear data ownership.',
      takeaway: 'Visibility improves reliability only when data is accurate and operationally actionable.',
    },
  },
  'mfg-textiles-m5-10': {
    heading: 'Each requirement type has its own source of authority and its own checker',
    intro: 'Legal duties, trade-origin rules, buyer programs and voluntary standards have different authority. Which ones apply depends on product, process, market and contract.',
    spec: {
      layout: 'table', title: '10 How Do Labor, Safety and Product-Origin Requirements Affect Manufacturers?', kicker: '',
      headers: ['Requirement type', 'Where its authority comes from', 'Who checks it'],
      rows: [
        { label: 'Legal duty', a: 'Law where the factory operates, e.g. labor and safety', b: 'Government authorities' },
        { label: 'Trade-origin rule', a: 'Trade rules of the destination market', b: 'Customs, using origin documentation' },
        { label: 'Buyer requirement', a: 'The buyer’s contract or program', b: 'Buyer audits and reviews' },
        { label: 'Voluntary standard', a: 'An industry framework a firm adopts', b: 'The program’s own verification' },
        { label: 'Product compliance', a: 'Rules for that product in that market', b: 'Market authorities; buyers may test' },
      ],
      note: 'Applicability depends on product, process, market, contract and jurisdiction. Buyer audits or voluntary programs do not automatically replace Vietnamese law, and prospective destination-market rules are not current universal obligations.',
      takeaway: 'Legal duties, trade-origin rules, buyer programs and voluntary standards have different authority and applicability.',
    },
  },
  'mfg-textiles-m5-11': {
    heading: 'Water, waste and worker-safety improvements also support quality and economics',
    intro: 'Responsible production covers dyeing water and chemicals, factory energy, cutting scraps, defects, recycling pathways, working conditions and safety. Marker efficiency can reduce both fabric cost and waste.',
    spec: {
      layout: 'table', title: '11 How Are Chemical Management and Wastewater Requirements Evolving?', kicker: '',
      headers: ['Focus', 'Where it arises', 'Link to quality or economics'],
      rows: [
        { label: 'Water efficiency', a: 'Dyeing water, chemicals and wastewater', b: 'Chemical controls and auditable evidence' },
        { label: 'Waste reduction', a: 'Cutting scraps and defects', b: 'Marker efficiency lowers fabric cost and waste' },
        { label: 'Worker safety', a: 'Working conditions on the floor', b: 'Safe work and credible labor evidence' },
      ],
      note: 'Prioritize wastewater, chemical controls, energy, safe work, material yield and claims supported by auditable evidence.',
      takeaway: 'Sustainability is strongest when resource, labor and product improvements also support quality and economics.',
    },
  },
  'mfg-textiles-m5-12': {
    heading: 'An environmental claim should be made only when auditable evidence supports it',
    intro: 'Energy efficiency, circular materials and recycled content can support environmental claims. Recycled content still requires performance and traceability controls before a claim is credible.',
    spec: {
      layout: 'decision', title: '12 How Are Traceability, Circularity and Environmental Claims Changing?', kicker: '',
      root: { label: 'Environmental claim', detail: 'e.g. energy efficiency, recycled content or circular materials' },
      question: 'Is the claim supported by auditable evidence?',
      branches: [
        { condition: 'Auditable evidence, performance and traceability controlled', outcome: 'Claim is credible', tone: 'positive' },
        { condition: 'Recycled content without controls', outcome: 'Verify performance and traceability first', tone: 'caution' },
        { condition: 'No credible evidence', outcome: 'Do not make the claim', tone: 'negative' },
      ],
      note: 'Marker efficiency can reduce both fabric cost and waste; recycled content still requires performance and traceability controls.',
      takeaway: 'Sustainability is strongest when resource, labor and product improvements also support quality and economics.',
    },
  },
  'mfg-textiles-m5-13': {
    heading: 'Future demand comes from several drivers, and the apparel forecast is a market, not factory revenue',
    intro: 'Demand comes from apparel, functional products, online channels, emerging economies, material innovation and specialized textile applications. GVR forecasts apparel from about US$1.8T in 2025 to about US$2.5T in 2033.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Textile and Apparel Demand?', kicker: '',
      root: { label: 'Future textile and apparel demand', detail: 'Broad but uneven growth' },
      drivers: [
        { label: 'Apparel demand', detail: 'GVR forecast: ~US$1.8T (2025) to ~US$2.5T (2033), 4.1% CAGR 2026–2033', op: '+' },
        { label: 'Sportswear', detail: 'Functional products', op: '+' },
        { label: 'Digital commerce', detail: 'Online channels', op: '+' },
        { label: 'Technical textiles', detail: 'Specialized textile applications', op: '+' },
        { label: 'Integrated supply', detail: 'Category fit and value capture', op: '+' },
        { label: 'Sustainable production', detail: 'Material innovation', op: '+' },
      ],
      note: 'The apparel-market forecast is a commercial estimate, not a forecast for Vietnam exports or factory revenue; connect it to specific buyer programs.',
      takeaway: 'Growth is broad but uneven; manufacturing gains depend on category fit, productivity and value capture.',
    },
  },
  'mfg-textiles-m5-14': {
    heading: 'From order-driven assembly, three upgrade routes open once customers back the investment',
    intro: 'Opportunities lie in commercially viable yarn, fabric, processing, accessories, development, testing, traceability and environmental performance. ILO recommends stronger domestic linkages, transition from CMT toward FOB and green transition.',
    spec: {
      layout: 'pathway', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      trunk: [
        { label: 'Order-driven assembly', detail: 'CMT on buyer inputs' },
        { label: 'Customer-backed investment gate', detail: 'A buyer program justifies the investment', kind: 'decision' },
      ],
      optionsLabel: 'Upgrade routes — alternatives, not steps',
      options: [
        { label: 'Upstream localization', detail: 'Yarn, fabric, processing and accessories' },
        { label: 'Product development', detail: 'Development, automation and testing capability' },
        { label: 'Green production', detail: 'Environmental performance and traceability' },
      ],
      note: 'Use customer-backed investment gates for materials, technology, workforce, compliance, finance and export-market diversification.',
      takeaway: 'Vietnam’s opportunity is to move from order-driven assembly toward integrated, technical and higher-value capability.',
    },
  },
  'mfg-textiles-m5-15': {
    heading: 'Positioning means shifting from order-driven assembly to integrated, skilled and diversified manufacturing',
    intro: 'Vietnam’s manufacturers can move from order-driven assembly toward integrated, technical and higher-value capability. ILO recommends domestic linkages, transition from CMT toward FOB, technology transfer and sector skills development.',
    spec: {
      layout: 'compare', title: '15 How Should Vietnam Manufacturers Position Themselves?', kicker: '',
      leftTitle: 'Order-driven assembly', rightTitle: 'Integrated, higher-value position',
      rows: [
        { label: 'Business model', a: 'CMT on buyer inputs', b: 'FOB and integrated manufacturing' },
        { label: 'Capability', a: 'Labor and capacity', b: 'Automation and skills' },
        { label: 'Materials', a: 'Buyer-supplied inputs', b: 'Stronger domestic linkages' },
        { label: 'Markets', a: 'Depends on current buyers', b: 'Export-market diversification' },
        { label: 'Investment', a: 'Capacity added for current orders', b: 'Customer-backed investment gates' },
      ],
      note: 'Technology transfer, green transition and sector skills development support the shift.',
      takeaway: 'Vietnam’s opportunity is to move from order-driven assembly toward integrated, technical and higher-value capability.',
    },
  },
};
