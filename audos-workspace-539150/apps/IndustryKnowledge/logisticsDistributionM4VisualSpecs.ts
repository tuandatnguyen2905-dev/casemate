import type { LogisticsDistributionChapterVisual } from './logisticsDistributionVisualSpecs';

/** Chapter-specific Learning Visuals for Distribution & Market Expansion Services Module 04 (competition, players, benchmarking, success factors, SWOT), keyed by visualKind. */
export const LOGISTICS_DISTRIBUTION_M4_VISUALS: Record<string, LogisticsDistributionChapterVisual> = {
  'logistics-distribution-m4-1': {
    heading: 'Five sources of pressure surround a distribution service provider',
    intro: 'Principals can consolidate appointments, major retailers negotiate terms and digital routes can bypass intermediaries. How strongly each force bites depends on portfolio rights, channel access, switching cost and service differentiation.',
    spec: {
      layout: 'ecosystem', title: '01 Five Forces in Distribution Services', kicker: '',
      center: { label: 'Distribution service provider', detail: 'Power set by portfolio rights, channel access, switching cost and service' },
      actors: [
        { label: 'Principals — supplier power', relation: 'Can consolidate appointments into fewer partners', flows: ['product', 'oversight'] },
        { label: 'Major retailers — buyer power', relation: 'Negotiate terms with the provider', flows: ['money', 'risk'] },
        { label: 'New entrants', relation: 'Add capacity in the same categories and channels', flows: ['risk'] },
        { label: 'Digital routes — substitutes', relation: 'Can bypass intermediaries altogether', flows: ['information', 'product'] },
        { label: 'Rival providers', relation: 'Compete for the same principals and outlets', flows: ['service'] },
      ],
      note: 'A distributor with unique regulated capability faces different forces from a commodity wholesaler. Assess by category, province and channel.',
      takeaway: 'Power depends on portfolio rights, channel access, switching cost and service differentiation.',
    },
  },
  'logistics-distribution-m4-2': {
    heading: 'Scale wins on systems and procurement; local density wins on route economics',
    intro: 'Competition ranges from local wholesalers to national and multinational service providers. Each side of that range brings a different advantage, and nominal reach can hide weak routes.',
    spec: {
      layout: 'compare', title: '02 Fragmentation, Scale and Market Access', kicker: '',
      leftTitle: 'National and multinational scale', rightTitle: 'Local density and relationships',
      rows: [
        { label: 'Typical player', a: 'National and multinational service providers', b: 'Local wholesalers' },
        { label: 'Main advantage', a: 'Systems and procurement', b: 'Route economics and local relationships' },
        { label: 'What it builds', a: 'Scale and coverage', b: 'Density and local relationship' },
        { label: 'Coverage risk', a: 'Nominal national reach can hide costly low-density routes', b: 'Reach limited to the local area' },
      ],
      note: 'Benchmark active productive outlets, not map coverage.',
      takeaway: 'Scale helps systems and procurement, but local density and relationships determine route economics.',
    },
  },
  'logistics-distribution-m4-3': {
    heading: 'Whether a distributor keeps a channel role depends on what it adds beyond moving stock',
    intro: 'Providers defend roles through execution, insight and service rather than inventory movement alone. A principal may insource key accounts but retain GT distribution.',
    spec: {
      layout: 'decision', title: '03 Switching, Qualification and Disintermediation', kicker: '',
      root: { label: 'Principal reviewing a channel role', detail: 'Reviewed channel by channel, not for the whole relationship' },
      question: 'Does the distributor add qualification, data, integration or relationships the principal cannot easily replace?',
      branches: [
        { condition: 'Yes — integrated and qualified', outcome: 'Role retained; switching is costly', detail: 'Technical integration and relationships raise switching cost', tone: 'positive' },
        { condition: 'Partly — e.g. key accounts', outcome: 'Principal may insource that channel', detail: 'While retaining the distributor for GT', tone: 'caution' },
        { condition: 'No — inventory movement only', outcome: 'Exposed to a direct route', detail: 'Digital tools can enable the principal to go direct', tone: 'negative' },
      ],
      note: 'Plan channel-by-channel role evolution.',
      takeaway: 'Technical integration and customer relationships can increase switching cost, while digital tools can enable direct routes.',
    },
  },
  'logistics-distribution-m4-4': {
    heading: 'A global provider pairs a regional platform with sector-specific service lines',
    intro: 'Official DKSH disclosures illustrate market insights, sales, marketing, distribution, regulatory and after-sales services. One company portfolio is evidence of a model, not the definition of the whole industry.',
    spec: {
      layout: 'pathway', title: '04 Global Market Expansion Providers', kicker: '',
      trunk: [
        { label: 'Regional reach', detail: 'A platform spanning several markets' },
        { label: 'Sector expertise', detail: 'Capabilities specific to each sector served' },
      ],
      optionsLabel: 'Integrated services illustrated by DKSH disclosures — selected per principal, not a sequence',
      options: [
        { label: 'Market insights', detail: 'Understanding the market before and after entry' },
        { label: 'Sales and marketing', detail: 'Building and converting demand' },
        { label: 'Distribution service', detail: 'Moving product to customers' },
        { label: 'Regulatory services', detail: 'Support for market-access requirements' },
        { label: 'After-sales', detail: 'Service once the product is sold' },
      ],
      afterLabel: 'Before relying on it',
      after: [{ label: 'Governance and verification', detail: 'Verify actual country and category service availability', kind: 'decision' }],
      note: 'One company portfolio is evidence of a model, not the definition of the whole industry.',
      takeaway: 'Global providers combine regional platforms with sector-specific capabilities.',
    },
  },
  'logistics-distribution-m4-5': {
    heading: 'Vietnam’s distribution businesses fall into different participant types serving different routes',
    intro: 'Domestic firms, foreign-invested providers, specialists and digital operators serve different routes. Compare them only on verified entity and segment scope.',
    spec: {
      layout: 'taxonomy', title: '05 Vietnam Distribution Businesses', kicker: '',
      root: 'Vietnam distribution participants', rootDetail: 'Vary by product rights, channels, geography and risk model',
      groups: [
        { label: 'Domestic network', detail: 'Domestic firms with their own routes' },
        { label: 'Foreign-invested provider', detail: 'Providers with foreign investment' },
        { label: 'Importer', detail: 'Brings product rights into the market' },
        { label: 'Wholesaler', detail: 'Resells to outlets and smaller traders' },
        { label: 'Specialist', detail: 'Focused on a category or channel' },
        { label: 'Digital operator', detail: 'Serves digital routes' },
      ],
      note: 'Broad company revenue cannot establish distribution market share. Compare only verified entity and segment scope.',
      takeaway: 'Vietnam participants vary by product rights, channels, geography and risk model.',
    },
  },
  'logistics-distribution-m4-6': {
    heading: 'Broad providers offer scale; specialists win where category depth matters',
    intro: 'Broad providers offer scale; specialists offer category knowledge, technical selling or channel access. A specialist can outperform a broad provider in a narrow regulated or technical niche.',
    spec: {
      layout: 'compare', title: '06 Broad-Market Versus Specialized Providers', kicker: '',
      leftTitle: 'Broad-market provider', rightTitle: 'Specialized provider',
      rows: [
        { label: 'Core offer', a: 'Scale and portfolio breadth', b: 'Category knowledge and depth' },
        { label: 'Selling', a: 'Wide channel coverage', b: 'Technical selling or specific channel access' },
        { label: 'Compliance', a: 'Spread across many categories', b: 'Built for a narrow regulated niche' },
        { label: 'Best fit', a: 'Principals needing breadth', b: 'Narrow regulated or technical products' },
      ],
      note: 'Select capability against product and channel requirements; check account concentration on either side.',
      takeaway: 'Portfolio breadth and specialization solve different principal needs.',
    },
  },
  'logistics-distribution-m4-7': {
    heading: 'Route contribution decomposes into outlet quality, productivity and cost to serve',
    intro: 'Compare active productive outlets, sales per visit, sales per representative and route contribution. Two providers with equal numeric coverage can still have different weighted distribution and economics.',
    spec: {
      layout: 'driverTree', title: '07 Coverage and Commercial Productivity', kicker: '',
      root: { label: 'Route contribution', detail: 'The benchmark that matters, not outlet counts alone' },
      drivers: [
        { label: 'Active outlet', detail: 'Outlets that actually buy, in a normalized universe' },
        { label: 'Weighted coverage', detail: 'Outlet quality, not just numeric coverage' },
        { label: 'Strike rate', detail: 'Visits that turn into orders', op: '×' },
        { label: 'Sales rep', detail: 'Sales per visit and per representative', op: '×' },
        { label: 'Cost to serve', detail: 'Route cost deducted from sales', op: '−' },
      ],
      note: 'Normalize the outlet universe and period before comparing providers.',
      takeaway: 'Coverage benchmarks need outlet quality, productivity and cost context.',
    },
  },
  'logistics-distribution-m4-8': {
    heading: 'A list of brand relationships means little until scope, tenure and results are checked',
    intro: 'Benchmark portfolio fit, conflict management, renewal and cross-service execution. Many principals can create concentration resilience or operating complexity.',
    spec: {
      layout: 'table', title: '08 Service Portfolio and Brand Relationships', kicker: '',
      headers: ['Benchmark', 'What to check', 'Misreading to avoid'],
      rows: [
        { label: 'Principal', a: 'Portfolio fit and conflict management', b: 'More principals is not automatically better' },
        { label: 'Tenure', a: 'How long the relationship has run', b: 'Long tenure without performance evidence' },
        { label: 'Exclusivity', a: 'Documented rights only', b: 'Inferring exclusivity or rights without evidence' },
        { label: 'Service breadth', a: 'Cross-service execution', b: 'Listing services that are not delivered' },
        { label: 'Retention', a: 'Renewals of principal contracts', b: 'Ignoring why principals leave' },
      ],
      note: 'Many principals can create concentration resilience or operating complexity. Do not infer exclusivity or rights without evidence.',
      takeaway: 'Brand relationships indicate capability only when scope, tenure and performance are understood.',
    },
  },
  'logistics-distribution-m4-9': {
    heading: 'Technology pays only when adoption carries through to execution and returns',
    intro: 'Benchmark system adoption, master-data quality, fill rate, OTIF, contribution, DIO, DSO and working-capital return. A modern dashboard can coexist with poor collections or outlet data.',
    spec: {
      layout: 'flow', title: '09 Technology, Execution and Financial Quality', kicker: '',
      steps: [
        { label: 'DMS adoption', detail: 'The system is actually used across the business' },
        { label: 'Data quality', detail: 'Reliable outlet and product master data' },
        { label: 'Execution', detail: 'Fill rate and OTIF delivery' },
        { label: 'Margin', detail: 'Contribution from the orders served' },
        { label: 'Working capital', detail: 'DIO, DSO and working-capital return', kind: 'outcome' },
      ],
      note: 'A modern dashboard can coexist with poor collections or outlet data. Use aligned definitions and audited data where available.',
      takeaway: 'Technology is valuable when it improves execution and returns.',
    },
  },
  'logistics-distribution-m4-10': {
    heading: 'Adding an outlet only helps when it builds profitable density in the territory',
    intro: 'Providers need both account negotiation and field service that retains productive outlets. Adding distant outlets may hurt service and contribution.',
    spec: {
      layout: 'decision', title: '10 Retail Relationships and Geographic Density', kicker: '',
      root: { label: 'Candidate outlet or account', detail: 'Proposed addition to a province’s territory' },
      question: 'Does it add profitable density that field service can retain?',
      branches: [
        { condition: 'Inside a dense, productive territory', outcome: 'Add and retain with field service', detail: 'Outlet trust and density reinforce each other', tone: 'positive' },
        { condition: 'Key account', outcome: 'Negotiate centrally, then serve in the field', detail: 'Needs both account negotiation and field service', tone: 'caution' },
        { condition: 'Distant from current routes', outcome: 'Defer the addition', detail: 'May hurt service and contribution', tone: 'negative' },
      ],
      note: 'Prioritize profitable density by province.',
      takeaway: 'Durable customer access combines relationships with efficient territory density.',
    },
  },
  'logistics-distribution-m4-11': {
    heading: 'A joint business plan turns principal strategy into a repeating local execution cycle',
    intro: 'Capabilities include forecasting, pricing, promotions, key accounts, field sales and performance reviews. A launch plan without replenishment and credit controls can create returns.',
    spec: {
      layout: 'flow', title: '11 Supplier Partnerships and Commercial Capability', kicker: '',
      steps: [
        { label: 'Portfolio plan', detail: 'Agree the principal’s strategy for the market', owner: 'Principal and provider' },
        { label: 'Forecast', detail: 'Plan demand and replenishment', owner: 'Provider' },
        { label: 'Launch and trade plan', detail: 'Pricing, promotions and credit controls', owner: 'Provider' },
        { label: 'Field execution', detail: 'Key accounts and field sales', owner: 'Provider' },
        { label: 'Performance review', detail: 'Governance against the joint plan', kind: 'decision', owner: 'Principal and provider' },
      ],
      loop: 'Each performance review resets the next portfolio plan.',
      note: 'Use joint business plans with explicit owners.',
      takeaway: 'Strong partnerships turn principal strategy into disciplined local execution.',
    },
  },
  'logistics-distribution-m4-12': {
    heading: 'Scalable execution rests on three linked capabilities: data, people and capital',
    intro: 'Outlet masters, trained teams, credit discipline and inventory funding determine scalable execution. Sales growth can fail when receivables and stock consume liquidity.',
    spec: {
      layout: 'driverTree', title: '12 Data, Talent and Working Capital', kicker: '',
      root: { label: 'Scalable execution', detail: 'Growth the business can fund and run' },
      drivers: [
        { label: 'Data', detail: 'Accurate outlet masters', children: [{ label: 'Master data' }] },
        { label: 'Talent', detail: 'Trained managers and sales teams', children: [{ label: 'Manager' }, { label: 'Sales rep' }] },
        { label: 'Working capital', detail: 'Credit discipline and inventory funding', children: [{ label: 'Credit' }, { label: 'Inventory' }] },
      ],
      note: 'Sales growth can fail when receivables and stock consume liquidity. Tie incentives to contribution, service and cash.',
      takeaway: 'Data quality, people and capital are linked operating capabilities.',
    },
  },
  'logistics-distribution-m4-13': {
    heading: 'Distribution’s strengths come with weaknesses that thin margins amplify',
    intro: 'Relationships and infrastructure support demand while thin margins amplify errors. A strong route can still underperform through trade leakage and overdue receivables.',
    spec: {
      layout: 'compare', title: '13 Strengths and Weaknesses', kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Market access', a: 'Essential local access through relationships', b: 'Execution complexity across many outlets' },
        { label: 'Demand', a: 'Recurring demand supported by infrastructure', b: 'Trade leakage can erode route results' },
        { label: 'Capital', a: 'Infrastructure that supports demand', b: 'Working capital tied in stock and overdue receivables' },
        { label: 'Margin', a: 'Earned on recurring volume', b: 'Thin margins amplify errors' },
      ],
      note: 'Audit profitability by customer and route.',
      takeaway: 'Distribution offers essential access but often carries working-capital and execution complexity.',
    },
  },
  'logistics-distribution-m4-14': {
    heading: 'The same market shifts open new services and new ways to bypass the provider',
    intro: 'Data, e-commerce and outsourced execution expand opportunity while principals and retailers gain alternatives. A provider can add marketplace operations but also face direct brand selling.',
    spec: {
      layout: 'table', title: '14 Opportunities and Threats', kicker: '',
      headers: ['Shift', 'Opportunity', 'Threat'],
      rows: [
        { label: 'Modernization', a: 'New services for modern retail', b: 'Retailers gain alternatives to the provider' },
        { label: 'E-commerce', a: 'Add marketplace operations', b: 'Direct brand selling — disintermediation' },
        { label: 'Value added', a: 'Data and outsourced execution services', b: 'Principals gain alternative providers' },
      ],
      note: 'Disintermediation and consolidation sit on the threat side of these shifts. Build capabilities with measurable customer value.',
      takeaway: 'Retail modernization creates new services and new bypass risks.',
    },
  },
  'logistics-distribution-m4-15': {
    heading: 'Strategic choices branch from category focus and the capital available to fund them',
    intro: 'Choices include specialist depth, integrated services, geographic expansion and digital enablement. Each must be staged against signed demand and operating evidence.',
    spec: {
      layout: 'pathway', title: '15 Strategic Positioning and Investment', kicker: '',
      trunk: [
        { label: 'Focus', detail: 'Which categories the provider will serve' },
        { label: 'Capital discipline', detail: 'Investment capacity available' },
      ],
      optionsLabel: 'Positioning options — alternatives or combinations, not steps',
      options: [
        { label: 'Specialist depth', detail: 'Category knowledge in chosen niches' },
        { label: 'Integrated services', detail: 'Broader service scope for principals' },
        { label: 'Geographic expansion', detail: 'New territories and scale, including by acquisition' },
        { label: 'Digital enablement', detail: 'Technology across the route' },
      ],
      afterLabel: 'Funding gate',
      after: [{ label: 'Stage the investment', detail: 'Release capital against signed demand and operating evidence', kind: 'decision' }],
      note: 'National expansion without route density can destroy returns.',
      takeaway: 'Strategy should align category focus, coverage ambition and investment capacity.',
    },
  },
};
