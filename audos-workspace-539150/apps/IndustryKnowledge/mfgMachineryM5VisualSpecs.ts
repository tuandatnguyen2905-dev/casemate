import type { MfgMachineryChapterVisual } from './mfgMachineryM1VisualSpecs';

/** Chapter-specific Learning Visuals for Machinery & Power Tools Module 05, keyed by visualKind. */
export const MFG_MACHINERY_M5_VISUALS: Record<string, MfgMachineryChapterVisual> = {
  'mfg-machinery-m5-1': {
    heading: 'Total cost of ownership adds installation, use, service, downtime and replacement to the price',
    intro: 'Labor and cost pressure make lost production, rework, energy and service delays commercially visible, so buyers compare lifecycle value rather than catalogue price.',
    spec: {
      layout: 'driverTree', title: 'Demand for Productivity, Reliability, and Total Cost of Ownership', kicker: '',
      root: { label: 'Total cost of ownership', detail: 'What the equipment really costs over its life' },
      formula: 'Purchase + installation + use + service + downtime + replacement',
      drivers: [
        { label: 'Purchase', children: [{ label: 'Acquisition' }, { label: 'Financing' }] },
        { label: 'Installation', children: [{ label: 'Installation work' }, { label: 'Operator training' }] },
        { label: 'Use', children: [{ label: 'Energy' }, { label: 'Consumables' }] },
        { label: 'Service', children: [{ label: 'Maintenance' }, { label: 'Local parts' }, { label: 'Technician coverage' }] },
        { label: 'Downtime', children: [{ label: 'Lost production' }, { label: 'Rework' }] },
        { label: 'Replacement', children: [{ label: 'End-of-life cost' }] },
      ],
      note: 'A higher-priced machine can be the lower-cost option when it improves yield and uptime, while a cheaper tool can be expensive if failures stop a crew. Quantify baseline, gain and payback; do not promise savings without evidence.',
      takeaway: 'Purchasing is shifting from lowest price toward measurable performance and lifecycle value.',
    },
  },
  'mfg-machinery-m5-2': {
    heading: 'Cordless convenience depends on a whole battery platform, not a single tool',
    intro: 'Shared batteries and chargers can simplify fleets and encourage repeat purchases, while lightweight design, charge visibility, vibration control and accessible accessories shape daily experience.',
    spec: {
      layout: 'ecosystem', title: 'Cordless Convenience, Compatibility, and User Experience', kicker: '',
      center: { label: 'Battery ecosystem', detail: 'Compatible tools, batteries, chargers and accessories' },
      actors: [
        { label: 'Professional user', relation: 'Standardizes on one battery family', flows: ['money', 'information'] },
        { label: 'Tool range', relation: 'Drills, saws, grinders, fastening tools', flows: ['product'] },
        { label: 'Batteries and chargers', relation: 'Genuine packs and suitable charging', flows: ['product', 'risk'] },
        { label: 'Accessories', relation: 'Accessible stock for daily jobs', flows: ['product'] },
        { label: 'Authorized dealers', relation: 'Inventory and warranty', flows: ['service'] },
        { label: 'Repair and end-of-life', relation: 'Repair turnaround and safe battery handling', flows: ['service', 'risk'] },
      ],
      note: 'Platform compatibility reduces duplicate batteries and chargers but creates switching costs, which makes long-term support important.',
      takeaway: 'Convenience is an ecosystem proposition spanning tools, batteries, accessories, ergonomics, availability and service.',
    },
  },
  'mfg-machinery-m5-3': {
    heading: 'Smart manufacturing starts at one bottleneck and scales only when avoided loss exceeds cost',
    intro: 'AI can support maintenance, inspection, scheduling, anomaly detection and parameter optimization, but value depends on reliable data and integration around a defined operational problem.',
    spec: {
      layout: 'flow', title: 'Smart Manufacturing, Automation, and Artificial Intelligence', kicker: '',
      steps: [
        { label: 'Pick one bottleneck', detail: 'A defined operational problem' },
        { label: 'Set baseline downtime', detail: 'Measure before connecting anything' },
        { label: 'Connect condition data', detail: 'Sensors, controls and analytics' },
        { label: 'Validate alerts', detail: 'Technicians confirm predictions', owner: 'Human accountability' },
        { label: 'Stop or scale', detail: 'Does avoided loss exceed lifecycle cost?', kind: 'decision' },
        { label: 'Scale the use case', detail: 'Secure, maintainable architecture', kind: 'outcome' },
      ],
      note: 'PwC’s survey of 443 senior executives expects median highly automated processes to rise from 18% to 50% by 2030: expectations, not measured adoption. Legacy interfaces, cybersecurity, skills and data ownership need plans.',
      takeaway: 'Smart manufacturing creates value when reliable data and integration solve a defined operational problem.',
    },
  },
  'mfg-machinery-m5-4': {
    heading: 'Cordless performance in real work depends on electrical, thermal, mechanical and software choices together',
    intro: 'Higher output and portability increase thermal, durability and safety demands. A high-output tool needs a matched pack, current control, motor, cooling, gearbox, enclosure and software protection, not a headline battery specification.',
    spec: {
      layout: 'driverTree', title: 'Battery Technology, Brushless Motors, and Advanced Product Engineering', kicker: '',
      root: { label: 'Performance in real applications', detail: 'A system result, not one component' },
      drivers: [
        { label: 'Electrical', children: [{ label: 'Brushless motor' }, { label: 'Matched battery cells' }, { label: 'Current control' }] },
        { label: 'Thermal', children: [{ label: 'Thermal design' }, { label: 'Cooling path' }] },
        { label: 'Mechanical', children: [{ label: 'Gearbox' }, { label: 'Enclosure' }, { label: 'Vibration reduction' }] },
        { label: 'Software and safety', children: [{ label: 'Battery management' }, { label: 'Software protection' }, { label: 'Torque control' }] },
        { label: 'Validation', children: [{ label: 'Duty-cycle testing' }, { label: 'Application testing' }] },
      ],
      note: 'In machinery the same systems logic joins sensors, efficient drives, precision control, modularity and automation interfaces. Local suppliers can enter through parts, housings, electronics, chargers, testing and repair once quality is repeatable.',
      takeaway: 'Product innovation is system-based: electrical, mechanical, software, thermal, safety and user-experience choices must work together.',
    },
  },
  'mfg-machinery-m5-5': {
    heading: 'Equipment demand comes from four engines that move on different cycles',
    intro: 'Capital spending, financing, utilization, construction cycles, replacement age and policy shape demand differently, so diversifying customers can reduce exposure to one project type or industrial cycle.',
    spec: {
      layout: 'taxonomy', title: 'Regional Demand, Industrial Investment, and Market Diversification', kicker: '',
      root: 'Sources of equipment demand', rootDetail: 'Each needs its own offer, inventory and sales cycle',
      groups: [
        { label: 'Greenfield investment', detail: 'New factories', items: ['Production machinery', 'Automation', 'Commissioning'] },
        { label: 'Modernization', detail: 'Existing lines', items: ['Line upgrades', 'Automation retrofits'] },
        { label: 'Construction/projects', detail: 'Construction and infrastructure', items: ['Drilling', 'Cutting', 'Fastening', 'Material processing'] },
        { label: 'Replacement/service', detail: 'Installed equipment', items: ['Planned maintenance', 'Replacement of aged equipment'] },
        { label: 'Specialized applications', detail: 'Advanced manufacturing', items: ['Energy', 'Electronics', 'Semiconductor', 'Data projects'] },
      ],
      note: 'MOIT estimated Vietnam’s 2025 industrial production index rose 9.5% and manufacturing/processing 10.6%: broad production indicators, not machinery demand or power-tool sales.',
      takeaway: 'Demand comes from both new investment and replacement or modernization of installed equipment, and varies sharply by end market.',
    },
  },
  'mfg-machinery-m5-6': {
    heading: 'One asset record links the buyer journey from online research to maintenance and replacement',
    intro: 'Standard tools, accessories and parts suit online ordering, while complex machinery still needs engineering consultation; digital catalogues, configuration, quotations, records and service scheduling can shorten the journey.',
    spec: {
      layout: 'flow', title: 'Digital Sales, Omnichannel Distribution, and Service-Led Growth', kicker: '',
      steps: [
        { label: 'Digital discovery', detail: 'Researches specifications online', owner: 'Customer' },
        { label: 'Technical selection', detail: 'Adviser confirms the application', owner: 'Technical adviser' },
        { label: 'Fulfillment', detail: 'Dealer stock; accessories ordered digitally', owner: 'Distributor' },
        { label: 'Monitoring', detail: 'Connected asset enables proactive service' },
        { label: 'Maintenance', detail: 'Authorized service booked on the asset record', owner: 'Service' },
        { label: 'Replacement', detail: 'Next purchase from the same record', kind: 'outcome' },
      ],
      note: 'Deloitte says aftermarket-service margins can be more than twice those of equipment sales alone, not a universal result, and its agentic aftermarket examples keep human approval for critical actions.',
      takeaway: 'Digital channels create most value when integrated with technical advice, inventory, delivery and dependable service.',
    },
  },
  'mfg-machinery-m5-7': {
    heading: 'Safety, conformity and cybersecurity are built in one sequence from requirements to post-market',
    intro: 'Manufacturers must identify requirements by product and destination, assess hazards, implement controls, test, document conformity and support safe use. Connected machinery adds access, update and control-system risks that can affect safety.',
    spec: {
      layout: 'flow', title: 'Machinery Safety, Product Compliance, and Cybersecurity', kicker: '',
      steps: [
        { label: 'Map requirements', detail: 'By product role and destination', owner: 'Export readiness' },
        { label: 'Hazard assessment', detail: 'Including digital-technology risks' },
        { label: 'Design controls', detail: 'Cybersecurity by design; protected control integrity' },
        { label: 'Conformity assessment', detail: 'Applicable procedure and testing', kind: 'decision' },
        { label: 'Technical documentation', detail: 'Declaration and instructions' },
        { label: 'Post-market support', detail: 'Secure updates and vulnerability handling', kind: 'outcome' },
      ],
      note: 'EU Regulation 2023/1230 applies from 20 January 2027, replacing Directive 2006/42/EC for products in scope; technical documentation is retained for 10 years. Requirements are scope-specific.',
      takeaway: 'Safety, documentation and safety-relevant cybersecurity should be designed together early in product development.',
    },
  },
  'mfg-machinery-m5-8': {
    heading: 'A machine designed for repair and upgrades has more lifecycle options than complete replacement',
    intro: 'Efficient motors and controls can reduce operating energy, and maintenance, replaceable components, repair, refurbishment and remanufacturing can extend life and preserve equipment value.',
    spec: {
      layout: 'pathway', title: 'Energy Efficiency, Circularity, and Sustainable Manufacturing', kicker: '',
      trunk: [
        { label: 'Durable design', detail: 'Built for diagnosis and parts replacement' },
        { label: 'Efficient operation', detail: 'Efficient motors and controls cut energy' },
        { label: 'Subsystem wears or ages', detail: 'A decision on what happens next', kind: 'decision' },
      ],
      optionsLabel: 'Lifecycle options: alternatives, not steps',
      options: [
        { label: 'Repair', detail: 'Replace the failed component' },
        { label: 'Upgrade', detail: 'Modernize the obsolete subsystem' },
        { label: 'Refurbishment', detail: 'Restore condition and keep using' },
        { label: 'Remanufacturing', detail: 'Preserve equipment value' },
        { label: 'Complete replacement', detail: 'When the design cannot be repaired or upgraded' },
      ],
      note: 'Battery collection and recovery matter for cordless platforms. EU Regulation 2024/1781 (ESPR) frames future product-specific requirements and digital product passports; verify which measure applies to each product.',
      takeaway: 'Sustainability creates practical value when it lowers resource use, extends useful life or supports credible market-access and procurement needs.',
    },
  },
  'mfg-machinery-m5-9': {
    heading: 'Headline market growth matters only after it is filtered by scope, mix and downside risk',
    intro: 'Industrial modernization, construction, replacement and productivity needs can support demand, cordless systems, automation and lifecycle services can shift mix, and capital cost, financing, trade and end-market cycles create downside risk.',
    spec: {
      layout: 'driverTree', title: 'Global Market Outlook and Growth Drivers', kicker: '',
      root: { label: 'Growth a company can serve', detail: 'Profitable, capability-backed growth' },
      drivers: [
        { label: 'Demand drivers', children: [{ label: 'Industrial modernization' }, { label: 'Construction' }, { label: 'Equipment replacement' }] },
        { label: 'Mix shifts', children: [{ label: 'Cordless adoption' }, { label: 'Industrial automation' }, { label: 'Aftermarket' }] },
        { label: 'Downside risks', children: [{ label: 'Capital cost and financing' }, { label: 'Trade' }, { label: 'End-market cycles' }] },
        { label: 'Scope match', detail: 'Test segments separately', children: [{ label: 'Market boundary' }, { label: 'Customer cycle' }, { label: 'Ticket size and service' }] },
      ],
      note: 'GVR estimates its defined power-tools market at US$34.7B in 2025 and forecasts US$72.3B in 2033 (9.9% CAGR): a scope-specific forecast, not industrial machinery and not a confirmed result.',
      takeaway: 'Headline growth is useful only after matching market scope to the products, applications and economics a company can actually serve.',
    },
  },
  'mfg-machinery-m5-10': {
    heading: 'Vietnamese firms start from distribution and service, then choose higher-value opportunities as quality is proven',
    intro: 'Industrial expansion increases the installed base, and progression should follow demonstrated quality and customer need. MOIT priorities on robots/AI, digital twins and efficient drives are policy directions and pilots, not guaranteed outcomes.',
    spec: {
      layout: 'pathway', title: 'Strategic Opportunities for Vietnam', kicker: '',
      trunk: [
        { label: 'Distribution capability', detail: 'Authorized distribution and parts' },
        { label: 'Lifecycle service', detail: 'Maintenance and application engineering; capture failure data' },
      ],
      optionsLabel: 'Next opportunities, each gated by customer-backed milestones',
      options: [
        { label: 'Precision components', detail: 'Machining, tooling and qualified local parts' },
        { label: 'Automation integration', detail: 'Controls and integration' },
        { label: 'Sustainable solutions', detail: 'Refurbishment and efficient equipment' },
        { label: 'OEM partnership', detail: 'Selected OEM work once process capability is proven' },
      ],
      note: 'Supplier upgrading requires metrology, traceability, quality systems, delivery discipline, standards, a technical workforce and sustained links with multinational and domestic customers.',
      takeaway: 'Vietnam can combine growing domestic demand with a staged move from distribution and service toward qualified engineering and higher-value production.',
    },
  },
};
