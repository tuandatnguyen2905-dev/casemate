import type { LogisticsContractChapterVisual } from './logisticsContractVisualSpecs';

/** Chapter-specific Learning Visuals for Contract Logistics & Warehousing Module 04, keyed by visualKind. */
export const LOGISTICS_CONTRACT_M4_VISUALS: Record<string, LogisticsContractChapterVisual> = {
  'logistics-contract-m4-1': {
    heading: 'Global, regional and local providers compete for different scopes of the same chain',
    intro: 'Providers range from multinational networks to basic local storage. A global provider and a local specialist may compete for different scopes in one customer chain.',
    spec: {
      layout: 'pathway', title: 'How Competitive Is Contract Logistics & Warehousing?', kicker: '',
      trunk: [
        { label: 'Customer supply chain', detail: 'Several scopes inside one chain' },
        { label: 'Define service responsibility', detail: 'Before naming direct competitors' },
      ],
      optionsLabel: 'Competitor groups — alternatives for each scope, not steps',
      options: [
        { label: 'Global integrators', detail: 'Multinational networks' },
        { label: 'Regional 3PLs', detail: 'Regional coverage' },
        { label: 'Local operators', detail: 'From basic local storage upward' },
      ],
      note: 'A global provider and local specialist may compete for different scopes in one customer chain.',
      takeaway: 'Competition is fragmented by complexity, sector and geography, so rivals depend on the scope being served.',
    },
  },
  'logistics-contract-m4-2': {
    heading: 'Specialist competitors split rivalry by contract type, sector and technology',
    intro: 'Beyond broad networks, the market includes specialized cold, automotive, spare-parts and fulfillment operations. Which rivals matter depends on the service responsibility in question.',
    spec: {
      layout: 'taxonomy', title: "How Do Porter's Five Forces Apply to Contract Logistics?", kicker: '',
      root: 'Specialist competitive segments', rootDetail: 'Segments of rivalry — define service responsibility first',
      groups: [
        { label: 'Contract specialists', detail: 'Focused on managed contract operations' },
        { label: 'Sector specialists', detail: 'Product-specific know-how', items: ['Cold', 'Automotive', 'Spare parts'] },
        { label: 'Technology-enabled providers', detail: 'Compete through systems', items: ['Fulfillment operations'] },
      ],
      note: 'Define service responsibility before identifying direct competitors.',
      takeaway: 'Competition is fragmented by complexity, sector and geography rather than one uniform rivalry.',
    },
  },
  'logistics-contract-m4-3': {
    heading: 'Facilities can be copied; proven operations and transitions cannot',
    intro: 'Advantage is built from procedures, trained labor, systems, assets, customer knowledge, implementation evidence and long-term performance.',
    spec: {
      layout: 'driverTree', title: 'What Creates Competitive Barriers and Advantages?', kicker: '',
      root: { label: 'Competitive advantage', detail: 'Barriers that take time to build' },
      drivers: [
        { label: 'Proven operation', detail: 'Long-term performance', children: [{ label: 'Reliability' }, { label: 'Implementation' }] },
        { label: 'Know-how', detail: 'Procedures and trained labor', children: [{ label: 'Sector expertise' }, { label: 'Technology integration' }] },
        { label: 'Reach', detail: 'Sites and assets', children: [{ label: 'Network coverage' }] },
        { label: 'Switching costs', detail: 'Cost of moving a live warehouse', children: [{ label: 'Stock transfer' }, { label: 'Data migration' }, { label: 'Service continuity' }] },
      ],
      note: 'Use reference operations and measured transition capability as proof.',
      takeaway: 'Facilities are replicable; trusted operating systems and transitions take time.',
    },
  },
  'logistics-contract-m4-4': {
    heading: 'DHL Supply Chain, CEVA and DSV: global providers described by portfolio, not ranked',
    intro: 'Global providers offer multinational warehousing, fulfillment and integrated logistics under different business portfolios.',
    spec: {
      layout: 'taxonomy', title: 'Who Are the Major Global Contract Logistics Providers?', kicker: '',
      root: 'Global contract logistics providers', rootDetail: 'Listed without ranking — portfolios differ',
      groups: [
        { label: 'DHL Supply Chain', detail: 'Contract-logistics portfolio' },
        { label: 'CEVA', detail: 'Contract logistics and integrated services' },
        { label: 'DSV', detail: 'Warehousing and contract logistics' },
        { label: 'Where they differ', items: ['Sector', 'Geography', 'Network', 'Service model'] },
      ],
      note: 'Armstrong ranks warehousing space, while Ti may rank contract-logistics revenue; these are not equivalent.',
      takeaway: 'Global providers overlap but differ by sector, geography, network and service model.',
    },
  },
  'logistics-contract-m4-5': {
    heading: 'Compare the relevant service unit, not the parent company’s size',
    intro: 'Providers such as GXO, Kuehne+Nagel and Nippon Express run warehousing, fulfillment and integrated logistics under different business portfolios.',
    spec: {
      layout: 'table', title: 'How Do Integrated, Specialist and Local Operators Differ?', kicker: '',
      headers: ['Comparison lens', 'Question to ask', 'Why parent size alone misleads'],
      rows: [
        { label: 'Sector', a: 'Does the unit serve this sector?', b: 'Portfolios differ by business line' },
        { label: 'Geography', a: 'Is there local capability where needed?', b: 'Global reach is not local capability' },
        { label: 'Service model', a: 'Warehousing, fulfillment or integrated logistics?', b: 'One parent can run several models' },
        { label: 'Ranking basis', a: 'Warehouse space or contract-logistics revenue?', b: 'The two rankings are not equivalent' },
      ],
      note: 'GXO, Kuehne+Nagel and Nippon Express are named from their official sources; the chapter does not rank them.',
      takeaway: 'Global providers overlap but differ by sector, geography, network and service model — compare the unit that will serve you.',
    },
  },
  'logistics-contract-m4-6': {
    heading: 'In Vietnam, developers, 3PLs and carriers can share one operation without competing',
    intro: 'Vietnam’s market combines local operations, property, transport, fulfillment, cold chain and customer relationships. A developer can lease a facility while a 3PL operates it and a carrier distributes orders.',
    spec: {
      layout: 'ecosystem', title: "Which Companies and Infrastructure Providers Shape Vietnam's Market?", kicker: '',
      center: { label: 'Customer operation in Vietnam', detail: 'Map responsibility, assets, systems and scope' },
      actors: [
        { label: 'Warehouse developers', relation: 'Lease the facility', flows: ['service', 'money'] },
        { label: 'Domestic 3PLs', relation: 'Operate the warehouse', flows: ['service'] },
        { label: 'Integrated groups', relation: 'Combine several logistics services', flows: ['service', 'information'] },
        { label: 'Transport operators', relation: 'Distribute orders', flows: ['product'] },
        { label: 'Specialists', relation: 'Add capabilities such as cold chain', flows: ['service', 'risk'] },
        { label: 'International-local partnerships', relation: 'Combine global and local capability', flows: ['information', 'service'] },
      ],
      note: 'Map actual responsibility, customer, assets, systems and contract scope.',
      takeaway: 'Infrastructure providers and logistics operators can cooperate without being direct competitors.',
    },
  },
  'logistics-contract-m4-7': {
    heading: 'Six benchmarks for comparing providers against the actual customer profile',
    intro: 'Providers are compared on sites, throughput, people, systems, transition experience, peak handling and product-specific controls.',
    spec: {
      layout: 'table', title: 'How Should Contract Logistics Providers Be Compared?', kicker: '',
      headers: ['Benchmark', 'What to examine', 'Watch-out'],
      rows: [
        { label: 'Locations', a: 'Sites versus the customer’s network', b: 'Largest network is not best fit' },
        { label: 'Capacity', a: 'Throughput and peak handling', b: 'Test against the real peak' },
        { label: 'Inventory accuracy', a: 'Physical stock versus system records', b: 'Needs a defined method and period' },
        { label: 'Order performance', a: 'Orders handled to standard', b: 'Benchmark the actual order profile' },
        { label: 'WMS and automation', a: 'Systems and automated flows', b: 'Fixed flows can underperform in high variety' },
        { label: 'Scalability', a: 'Transition experience and growth room', b: 'Product-specific controls must scale too' },
      ],
      note: 'Highly automated fixed flows can underperform in low-volume, high-variety operations.',
      takeaway: 'Best fit matters more than largest network or most automation.',
    },
  },
  'logistics-contract-m4-8': {
    heading: 'A low headline bid can hide excluded cost, service and viability risks',
    intro: 'Proposals differ in fixed, variable, transition and change costs, as well as service, account governance, investment and financial capacity.',
    spec: {
      layout: 'compare', title: 'How Do Footprint, Service Quality, Technology and Economics Differ?', kicker: '',
      leftTitle: 'Headline bid price', rightTitle: 'Normalized total-cost comparison',
      rows: [
        { label: 'Total cost', a: 'Lowest visible rate', b: 'Fixed, variable, transition and change costs' },
        { label: 'Scope', a: 'Peak capacity or key services may be excluded', b: 'Same assumptions across proposals' },
        { label: 'SLA', a: 'Commitments loosely stated', b: 'Measurable commitments, methods, periods and remedies' },
        { label: 'Financial resilience', a: 'Not tested', b: 'Investment and financial capacity checked' },
      ],
      note: 'Normalize assumptions and adjustment mechanisms before comparing proposals.',
      takeaway: 'A sustainable contract balances price, quality, flexibility and provider viability.',
    },
  },
  'logistics-contract-m4-9': {
    heading: 'Transparent billing and flexible terms keep customers over the long run',
    intro: 'Sustainable advantage depends on how cost, service, account governance and financial capacity hold up after the contract is signed.',
    spec: {
      layout: 'driverTree', title: 'Which Capabilities Explain Sustainable Competitive Advantage?', kicker: '',
      root: { label: 'Sustainable advantage', detail: 'Customers stay and contracts stay viable' },
      drivers: [
        { label: 'Billing transparency', detail: 'Customers can see what they pay for', children: [{ label: 'Normalized assumptions' }, { label: 'Clear adjustment mechanisms' }] },
        { label: 'Contract flexibility', detail: 'Terms that absorb change', children: [{ label: 'Priced change costs' }, { label: 'Peak capacity included' }] },
        { label: 'Retention', detail: 'Relationship continues', children: [{ label: 'Account governance' }, { label: 'Consistent service' }] },
      ],
      note: 'The lowest bid can become expensive if peak capacity or key services were excluded.',
      takeaway: 'Advantage lasts when the contract balances price, quality, flexibility and provider viability.',
    },
  },
  'logistics-contract-m4-10': {
    heading: 'Accuracy has to hold at every repeated warehouse step',
    intro: 'Reliability comes from repeated receiving, storage, replenishment, picking and dispatch supported by disciplined management.',
    spec: {
      layout: 'flow', title: 'Why Do Inventory Accuracy and Fulfillment Reliability Matter?', kicker: '',
      steps: [
        { label: 'Receiving', detail: 'Physical stock recorded correctly' },
        { label: 'Storage', detail: 'Stock matches system records' },
        { label: 'Replenishment', detail: 'Pick faces refilled to standard work' },
        { label: 'Picking', detail: 'Productivity without mispicks' },
        { label: 'Dispatch', detail: 'Reliable fulfillment to the customer', kind: 'outcome' },
      ],
      loop: 'Daily management and root-cause routines across shifts and sites correct errors at their source.',
      note: 'A faster line that increases mispicks harms both provider and customer.',
      takeaway: 'Throughput creates value only when quality and safety remain controlled.',
    },
  },
  'logistics-contract-m4-11': {
    heading: 'Speed alone erodes value; planned capacity and improvement compound it',
    intro: 'Cost efficiency comes from repeated receiving, storage, replenishment, picking and dispatch managed with discipline, not from pushing throughput alone.',
    spec: {
      layout: 'compare', title: 'How Do Cost Efficiency, Capacity and Continuous Improvement Create Advantage?', kicker: '',
      leftTitle: 'Throughput pushed for speed', rightTitle: 'Controlled, improving operation',
      rows: [
        { label: 'Order accuracy', a: 'Faster line increases mispicks', b: 'Accuracy protected while speed rises' },
        { label: 'Capacity planning', a: 'Reacts to volume as it arrives', b: 'Labor and space planned ahead' },
        { label: 'Continuous improvement', a: 'Errors repeat across shifts', b: 'Root-cause routines across shifts and sites' },
        { label: 'Result', a: 'Harms provider and customer', b: 'Lower cost with controlled quality' },
      ],
      note: 'Build daily management and root-cause routines across shifts and sites.',
      takeaway: 'Throughput creates value only when quality and safety remain controlled.',
    },
  },
  'logistics-contract-m4-12': {
    heading: 'Visibility, support, security and governance turn a vendor into a trusted partner',
    intro: 'Trust rests on stock and order information, exceptions handling, system access, outage recovery and joint reviews.',
    spec: {
      layout: 'taxonomy', title: 'How Do Technology, Customer Trust and Risk Management Support Growth?', kicker: '',
      root: 'Capabilities behind customer trust', rootDetail: 'Capability areas, built together',
      groups: [
        { label: 'Data', detail: 'Stock and order information', items: ['Real-time visibility', 'Integration'] },
        { label: 'Response', detail: 'Exceptions and escalation', items: ['Customer support'] },
        { label: 'Risk', detail: 'System access and outage recovery', items: ['Cybersecurity', 'Continuity'] },
        { label: 'Review', detail: 'Joint reviews', items: ['Performance governance'] },
      ],
      note: 'A portal adds little if inventory records or escalation ownership are unreliable.',
      takeaway: 'Reliable data and risk response move providers from task execution to trusted partnership.',
    },
  },
  'logistics-contract-m4-13': {
    heading: 'Recurring contracts are the strength; labor, fixed commitments and price pressure the weakness',
    intro: 'The industry’s strengths lie in recurring relationships, while its weaknesses lie in labor and capacity.',
    spec: {
      layout: 'compare', title: "What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Revenue base', a: 'Recurring contracts and relationships', b: 'Price pressure, especially on basic storage' },
        { label: 'Capability', a: 'Integrated sector expertise deepens switching cost', b: 'Labor and capacity constraints' },
        { label: 'Cost structure', a: 'Recurring volume helps recover commitments', b: 'Labor and fixed commitments' },
      ],
      note: 'Focus on profitable segments and flexible capacity.',
      takeaway: 'Outsourcing growth is attractive, but every contract requires sound operating fit and economics.',
    },
  },
  'logistics-contract-m4-14': {
    heading: 'Outsourcing and specialties open opportunities; cost and failure are the threats',
    intro: 'Opportunities sit in outsourcing, omnichannel and specialties, while threats come from cost and service failure.',
    spec: {
      layout: 'table', title: 'What Opportunities and Threats Shape Contract Logistics?', kicker: '',
      headers: ['Factor', 'Opportunity', 'Threat'],
      rows: [
        { label: 'Outsourcing opportunity', a: 'Outsourcing growth brings new contracts', b: 'Poor operating fit or economics' },
        { label: 'Expertise and integration', a: 'Omnichannel and specialty services', b: 'Basic storage stays price-sensitive' },
        { label: 'Technology and service risk', a: 'Integration deepens switching cost', b: 'Cost overruns and service failure' },
      ],
      note: 'Basic storage remains price-sensitive while integrated sector expertise can deepen switching cost.',
      takeaway: 'Outsourcing growth is attractive, but every contract requires sound operating fit and economics.',
    },
  },
  'logistics-contract-m4-15': {
    heading: 'Commit, phase or stop: gating growth against volume and margin risk',
    intro: 'Strategic risks include forecast error, unpriced work, transition, integration, adoption, labor and dependence on major contracts. A customer delay can strand dedicated site and automation investment.',
    spec: {
      layout: 'decision', title: 'What Strategic Choices Must Contract Logistics Providers Make?', kicker: '',
      root: { label: 'New dedicated site or automation', detail: 'Long-term commitment under variable demand' },
      question: 'Are volume, pricing and implementation risks controlled enough to commit?',
      branches: [
        { condition: 'Volume confirmed, work priced, workforce ready', outcome: 'Scale the commitment', detail: 'Pass the stop-or-scale gate', tone: 'positive' },
        { condition: 'Forecast uncertain or adoption unproven', outcome: 'Phase the investment', detail: 'Use phases, volume bands and minimum commitments', tone: 'caution' },
        { condition: 'Unpriced work or heavy customer concentration', outcome: 'Stop or renegotiate', detail: 'Margin and volume risk too high', tone: 'negative' },
      ],
      note: 'Use phases, volume bands, minimum commitments and stop-or-scale gates.',
      takeaway: 'Disciplined growth protects against long-term commitments under variable demand.',
    },
  },
};
