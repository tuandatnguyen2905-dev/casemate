import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Non-Alcoholic Beverages Module 04, keyed by visualKind. */
export const NAB_M4_VISUALS: Record<string, ChapterVisual> = {
  'nab-m4-41-1-market-structure': {
    heading: 'Why a global leader can trail on a Vietnam shelf',
    intro: 'Two rankings that disagree may both be right. Check whether they share the same market boundary before deciding which competitor is ahead.',
    spec: {
      layout: 'decision', title: 'Understanding Beverage Market Competition', kicker: '',
      root: { label: 'Two competitor rankings disagree', detail: 'A global ranking names one leader while a Vietnam shelf shows another' },
      question: 'Do both use the same product category, geography, customer, period and value-or-volume measure?',
      branches: [
        { condition: 'Yes, the boundaries match', outcome: 'Compare shares or concentration', detail: 'Combined leader share or a full index such as HHI, if share data are complete', tone: 'positive' },
        { condition: 'No, the boundaries differ', outcome: 'Both rankings can be true', detail: 'Global carbonated soft drinks is not Vietnam ready-to-drink tea, energy, coffee or water', tone: 'caution' },
        { condition: 'Shares are not comparable', outcome: 'Use transparent qualitative structure', detail: 'Estimates from different legal entities or retail panels cannot simply be combined', tone: 'negative' },
      ],
      note: 'In Vietnam, the Coca-Cola and PepsiCo systems face local and regional portfolios from Suntory PepsiCo Vietnam, Tan Hiep Phat, URC, Masan Consumer and Nestlé; disclosure is too uneven for a precise total-market ranking.',
      takeaway: 'Market definition comes before market share, and value and volume shares answer different questions.',
    },
  },
  'nab-m4-41-2-five-forces': {
    heading: 'Packaging suppliers, chains and cafés squeeze returns too',
    intro: 'A strong brand can still lose profit to pressures outside the rivalry. Read each force as a mechanism in a named market, not as a universal score.',
    spec: {
      layout: 'ecosystem', title: 'The Forces Shaping Competitive Intensity', kicker: '',
      center: { label: 'Rivalry among beverage brands', detail: 'Frequent launches, promotion, cooler competition and costly shelf access' },
      actors: [
        { label: 'Packaging and input suppliers', relation: 'Commodity-linked packaging can pressure producer costs and terms', flows: ['product', 'money'] },
        { label: 'Organised chains', relation: 'Negotiate centrally and can transfer promotional cost to suppliers', flows: ['money', 'service'] },
        { label: 'General-trade outlets', relation: 'Many small outlets; fragmented buyers hold different leverage from chains', flows: ['product', 'money'] },
        { label: 'Substitutes', relation: 'Bottled water, fresh drinks, cafés and home preparation solve the same need', flows: ['product'] },
        { label: 'New entrants', relation: 'Co-packing and e-commerce lower entry barriers; distribution depth stays hard to replicate', flows: ['product', 'information'] },
      ],
      note: 'Force strength varies by category and channel, and the forces interact: strong substitutes can intensify rivalry.',
      takeaway: 'Five Forces evaluates who captures value, so the strongest force is specific to the market being assessed.',
    },
  },
  'nab-m4-41-3-barriers-power': {
    heading: 'A co-packer can make the drink but cannot buy the cooler space',
    intro: 'Production is the easiest barrier to rent. Compare a niche entrant and a scaled incumbent stage by stage to see where advantage really sits.',
    spec: {
      layout: 'compare', title: 'Entry Barriers, Substitutes, and Market Power', kicker: '',
      leftTitle: 'Niche entrant using a co-packer', rightTitle: 'Scaled incumbent',
      rows: [
        { label: 'Production', a: 'Contracts production and avoids the capital of a plant', b: 'Suntory PepsiCo Vietnam announced more than US$300 million for a sixth plant in Long An' },
        { label: 'Capacity', a: 'Sized for a narrow target channel', b: 'Planned up to 800 million litres per year; company-stated, not current output' },
        { label: 'Demand', a: 'Must build awareness and repeat purchase from scratch', b: 'Established brands reduce perceived risk' },
        { label: 'Access', a: 'Digital channels aid discovery but not a permanent cooler place', b: 'Distribution, data and relationships improve execution' },
        { label: 'Switching', a: 'Low consumer switching costs help win trial', b: 'Low switching costs keep the incumbent under pressure' },
      ],
      note: 'Structural barriers (minimum efficient scale, regulation, channel economics) differ from strategic ones (brand investment, exclusive assets, service routines); neither is automatically permanent.',
      takeaway: 'Entrants should attack where incumbent advantages are weakest, and incumbents must renew capabilities rather than rely on historical scale.',
    },
  },
  'nab-m4-42-1-global-landscape': {
    heading: 'Four reported totals that do not make a league table',
    intro: 'Each company reports a different measure, in a different currency or period. Read the scope caution beside every figure before comparing scale.',
    spec: {
      layout: 'table', title: 'Major Global Beverage Companies', kicker: '',
      headers: ['Company', 'Reported figure', 'Scope caution'],
      rows: [
        { label: 'Coca-Cola', a: 'US$47.1 billion consolidated net revenue, 2024', b: 'Company metric, not brand revenue or market size' },
        { label: 'PepsiCo', a: 'US$91.854 billion net revenue, 2024', b: 'Beverages 42% and convenient foods 58% of the revenue mix' },
        { label: 'Monster', a: 'US$7.49 billion net sales, 2024', b: 'Concentrated in energy drinks; net sales are not market share' },
        { label: 'Red Bull', a: '13.969 billion cans and €12.196 billion group turnover, 2025', b: 'Company-reported, in another currency and year' },
      ],
      note: 'Concentrate, finished-goods, food and bottling activities produce different revenue intensity, so these figures cannot be ranked as shares.',
      takeaway: 'Company size, beverage sales, brand strength and category leadership are separate measures of competitive position.',
    },
  },
  'nab-m4-42-2-vietnam-landscape': {
    heading: 'Multinational systems meet focused local portfolios in one cooler',
    intro: 'Vietnam’s competitors overlap selectively. Group them by how they compete, then look for where portfolios, price tiers and channels collide.',
    spec: {
      layout: 'taxonomy', title: 'Leading Beverage Players in Vietnam', kicker: '',
      root: 'Beverage competitors in Vietnam', rootDetail: 'No clean national ranking: public disclosures are uneven across entities',
      groups: [
        { label: 'Global beverage systems', items: ['Coca-Cola’s beverage system', 'Suntory PepsiCo Vietnam: Suntory 51%, PepsiCo 49%, bottler for both'] },
        { label: 'Local and regional portfolios', items: ['Tan Hiep Phat', 'URC Vietnam', 'Masan Consumer'] },
        { label: 'Further players and specialists', items: ['Nestlé', 'Red Bull', 'Other category specialists'] },
      ],
      note: 'SPVB’s 2024 Long An announcement described a sixth plant with planned investment above US$300 million and capacity up to 800 million litres annually (company-stated).',
      takeaway: 'Assess competitive threat where portfolios, price tiers, channels and occasions overlap, not from one national ranking.',
    },
  },
  'nab-m4-42-3-position-scorecard': {
    heading: 'Leader by value, leader by litres, leader by outlets',
    intro: 'Different metrics can crown different leaders. Start from the business question, then pick the metric and note what it leaves out.',
    spec: {
      layout: 'table', title: 'Understanding Market Shares and Competitive Positions', kicker: '',
      headers: ['Business question', 'Metric', 'What it misses'],
      rows: [
        { label: 'Who captures the most spending?', a: 'Value share', b: 'Fewer units can still lead, as with a premium energy brand' },
        { label: 'Who sells the most units?', a: 'Volume share', b: 'Can reward discounting and hide premium strength' },
        { label: 'Who is largest as a company?', a: 'Reported revenue', b: 'Follows company accounting, not consumer-market leadership' },
        { label: 'How many outlets carry it?', a: 'Numeric distribution', b: 'Measures access, not necessarily sell-out' },
        { label: 'Are the important outlets covered?', a: 'Weighted distribution', b: 'Adjusts for outlet importance, but is still access' },
        { label: 'Where can strength travel?', a: 'Portfolio and geographic coverage', b: 'Breadth is not relevance in one occasion' },
      ],
      note: 'For every share, record numerator, denominator, category, geography, channel, period, value or volume basis and source method; never add shares from different panels.',
      takeaway: 'Competitive position is multi-dimensional, so choose the metric from the decision and state its denominator.',
    },
  },
  'nab-m4-43-1-benchmark-process': {
    heading: 'Start a benchmark from the decision, not the data at hand',
    intro: 'Comparing a Vietnam tea brand with a global corporation fills a table without answering anything. Follow the order that keeps the comparison fair.',
    spec: {
      layout: 'flow', title: 'How to Compare Beverage Competitors', kicker: '',
      steps: [
        { label: 'Define the decision', detail: 'For example a Vietnam energy-drink choice, not a general company comparison', kind: 'stage' },
        { label: 'Select the benchmark set', detail: 'Direct and adjacent rivals meeting in the same energy occasions and channels', kind: 'stage' },
        { label: 'Align scope and period', detail: 'Match geography and evidence period before any scoring', kind: 'stage' },
        { label: 'Choose criteria', detail: 'Separate outcome metrics from capability drivers such as cost to serve', kind: 'stage' },
        { label: 'Document provenance', detail: 'Record source, date and transformation; mark gaps instead of filling them', kind: 'stage' },
        { label: 'Explain the differences', detail: 'Say why rivals perform differently and test any weights for sensitivity', kind: 'outcome' },
      ],
      note: 'Nestlé group revenue or global water presence would not answer a narrow Vietnam energy-drink question.',
      takeaway: 'A benchmark is useful only when its competitor set, criteria, evidence period and scoring rules fit the decision.',
    },
  },
  'nab-m4-43-2-commercial-matrix': {
    heading: 'An energy drink’s promise fails if its pack or route does not fit',
    intro: 'Rivals sharing a cooler can sell aspiration, affordability or routine. Check that every commercial choice supports the same offer before comparing prices.',
    spec: {
      layout: 'driverTree', title: 'Brand Positioning, Pricing, and Distribution', kicker: '',
      root: { label: 'A coherent, purchasable offer', detail: 'Target, promise, pack, price and availability reinforce one another' },
      formula: 'Offer strength = target + positioning + portfolio + price-pack + distribution, compared on equivalent packs and channels',
      drivers: [
        { label: 'Target and occasion', detail: 'Which consumers and consumption occasions the offer chooses', op: '+' },
        { label: 'Positioning', detail: 'Intended meaning versus alternatives, backed by consumer or strategy evidence', op: '+' },
        { label: 'Portfolio', detail: 'SPVB covers CSD, energy, water and tea; THP’s Number 1 and tea brands stay focused', op: '+' },
        { label: 'Price-pack', detail: 'Exact pack, channel, city, date, regular or promotional price, and taxes', op: '+' },
        { label: 'Distribution', detail: 'Monster and Red Bull pair distinctive identity with partner distribution', op: '+' },
      ],
      note: 'A smaller pack may have a lower out-of-pocket price but a higher price per litre; do not present intuitive map coordinates as measured fact.',
      takeaway: 'Benchmark the whole offer system: a brand promise cannot win if the pack is unaffordable or distribution misses the target channel.',
    },
  },
  'nab-m4-43-3-strategy-systems': {
    heading: 'Partner-built reach versus owned local manufacturing',
    intro: 'Two rivals can build scale through very different capability systems. Compare what each owns, what it borrows and what a copier would have to rebuild.',
    spec: {
      layout: 'compare', title: 'Competitive Strengths and Strategic Differences', kicker: '',
      leftTitle: 'Monster: focused brand, partner capabilities', rightTitle: 'SPVB: broad portfolio, local manufacturing',
      rows: [
        { label: 'Core choice', a: 'A focused brand', b: 'A broad portfolio' },
        { label: 'Production capacity', a: 'Extensive co-packing arrangements', b: 'Substantial local manufacturing investment' },
        { label: 'Market access', a: 'Coca-Cola network distribution arrangements', b: 'Portfolio breadth to contest more occasions' },
        { label: 'What must hold', a: 'Strong governance of partners', b: 'Demand and execution that keep plants productive' },
      ],
      note: 'Replace labels such as “strong distribution” with mechanisms: outlet reach, service frequency, cooler execution, order data and distributor economics.',
      takeaway: 'Copying one tactic is not copying a capability system; the reinforcing fit is what rivals struggle to reproduce.',
    },
  },
  'nab-m4-44-1-brand-equity': {
    heading: 'From two-second recognition to the repeat purchase',
    intro: 'Recognition gets a brand into the cooler decision; the product has to earn the next one. Follow where each part of brand strength does its work.',
    spec: {
      layout: 'flow', title: 'Why Brand Strength Matters', kicker: '',
      steps: [
        { label: 'Awareness', detail: 'Earns a place in consideration during a quick cooler choice', kind: 'stage' },
        { label: 'Distinctive assets', detail: 'Colour, shape, name or sound speed recognition', kind: 'stage' },
        { label: 'Relevant meaning', detail: 'Creates preference over the alternatives on offer', kind: 'stage' },
        { label: 'Trust', detail: 'Reduces the perceived risk of choosing', kind: 'stage' },
        { label: 'Consistent experience', detail: 'The product justifies the promise and wins the repeat sale', kind: 'outcome' },
      ],
      note: 'Red Bull built a focused energy identity and reported sales in 178 countries in 2025 (company-reported). Track consideration, preference, penetration and repeat, not social engagement alone.',
      takeaway: 'Brand strength reduces choice friction only while the product, availability and experience keep justifying the promise.',
    },
  },
  'nab-m4-44-2-scale-reach': {
    heading: 'Volume helps only after complexity is subtracted',
    intro: 'A big network or plant is not a moat by itself. Weigh what extra volume improves against the costs it adds, then check the outlet evidence.',
    spec: {
      layout: 'driverTree', title: 'Distribution Reach and Economies of Scale', kicker: '',
      root: { label: 'Real scale advantage', detail: 'Productive, profitable availability rather than nominal capacity or outlet count' },
      formula: 'Real scale advantage = gains from higher volume − added complexity and service burden',
      drivers: [
        { label: 'Gains from volume', op: '+', children: [{ label: 'Line utilisation' }, { label: 'Procurement' }, { label: 'Route density' }, { label: 'Forecast accuracy and technology leverage' }] },
        { label: 'Costs of growth', op: '−', children: [{ label: 'Too many SKUs' }, { label: 'Working capital' }, { label: 'Management layers' }, { label: 'Service burden and distant stops' }] },
        { label: 'Outlet evidence', detail: 'On-shelf and cold availability, sales per outlet, service cost and repeat' },
      ],
      note: 'SPVB’s Long An plant, announced in April 2024 as its 6th plant, is planned at up to 800 million litres a year: company-stated future capacity, not current output.',
      takeaway: 'A broad but unproductive network is not a moat; scale pays only when the extra volume stays productive.',
    },
  },
  'nab-m4-44-3-learning-system': {
    heading: 'Test cheaply, then scale only the evidence-backed winners',
    intro: 'Launch count is not innovation. Follow an idea through the tests that come before scarce line time and national distribution, and see where it can stop.',
    spec: {
      layout: 'pathway', title: 'Innovation, Efficiency, and Customer Understanding', kicker: '',
      trunk: [
        { label: 'Consumer research', detail: 'Defines the job and the unmet need', kind: 'stage' },
        { label: 'Prototype', detail: 'Tests the proposition with low-cost demand checks', kind: 'stage' },
        { label: 'Manufacturability check', detail: 'Operations validate the formula before line time and packaging inventory', kind: 'stage' },
        { label: 'Channel test', detail: 'Measures conversion before national distribution', kind: 'decision' },
      ],
      optionsLabel: 'Stage gate decision',
      options: [
        { label: 'Advance', detail: 'Increase investment as evidence strengthens' },
        { label: 'Change', detail: 'Correct the offer and test again' },
        { label: 'Stop', detail: 'Retire weak ideas to protect resources' },
      ],
      afterLabel: 'After launch',
      after: [
        { label: 'Post-launch learning', detail: 'Data informs expansion or correction; repeat shows durable value', kind: 'outcome' },
      ],
      note: 'Monster’s filings highlight demand forecasting, co-packing capacity and distribution as operating dependencies: innovation and execution cannot be separated.',
      takeaway: 'Speed to learning matters more than launch count; a launch that cannot be produced, distributed or repeated profitably is only activity.',
    },
  },
  'nab-m4-45-1-swot-matrix': {
    heading: 'Inside the industry or around it: sorting beverage SWOT factors',
    intro: '“Health-conscious consumers” describe external change, not an owned capability. Sort each factor by whether it sits inside the industry or arises around it.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Industry’s SWOT', kicker: '',
      root: 'Beverage industry SWOT', rootDetail: 'Casemate’s evidence-based synthesis, not official company statements',
      groups: [
        { label: 'Strengths: internal, favourable', items: ['Broad beverage systems', 'Established routes'] },
        { label: 'Weaknesses: internal, unfavourable', items: ['Portfolio complexity', 'Route complexity'] },
        { label: 'Opportunities: external, favourable', items: ['New health-oriented occasions'] },
        { label: 'Threats: external, unfavourable', items: ['Tax', 'Input volatility', 'Substitution'] },
      ],
      note: 'An industry strength may not belong to every company: established distribution helps incumbents more than a new entrant without relationships.',
      takeaway: 'Classify each factor by locus and direction, explain its mechanism and prioritise it by evidence, rather than dumping facts into boxes.',
    },
  },
  'nab-m4-45-2-risk-map': {
    heading: 'How a sugar threshold travels from tax law to portfolio',
    intro: 'A tax hits only the formulations it covers, yet its effects spread through price, mix and retailer talks. Follow the path from trigger to response.',
    spec: {
      layout: 'flow', title: 'Key Competitive Risks and Challenges', kicker: '',
      steps: [
        { label: 'Trigger', detail: 'Special Sales Tax on qualifying beverages above 5g sugar per 100ml', kind: 'stage' },
        { label: 'Rate steps', detail: '8% from 1 January 2027, then 10% from 1 January 2028', kind: 'stage' },
        { label: 'Exposure', detail: 'Only qualifying formulations; regulated exclusions apply', kind: 'stage' },
        { label: 'Transmission', detail: 'Price, mix, reformulation, retailer negotiations and consumer choice shift together', kind: 'stage' },
        { label: 'Mitigation', detail: 'Reformulation, portfolio, pricing, route data and execution', kind: 'outcome' },
      ],
      note: 'Rates and dates follow Vietnam’s enacted roadmap; separate threshold, exclusions and implementation guidance. Input, FX, water and route risks transmit through operations and economics in the same way.',
      takeaway: 'A risk matters through its mechanism, so better reformulation and execution can turn the same pressure into relative advantage.',
    },
  },
  'nab-m4-45-3-response-map': {
    heading: 'Pair every challenge with supporting moves and a signpost',
    intro: 'The first visible response is often a new product. Read across each row for the moves that must accompany it and the evidence that justifies the next commitment.',
    spec: {
      layout: 'table', title: 'Strategic Opportunities and Business Responses', kicker: '',
      headers: ['Challenge', 'Coordinated response', 'Signpost to monitor'],
      rows: [
        { label: 'Sugar or health pressure', a: 'Reformulate, reposition and redesign price-packs', b: 'Reformulation test results, repeat rate, price elasticity' },
        { label: 'Weak channel access', a: 'Expand selected channels; partner as Monster does with distribution agreements', b: 'Outlet productivity' },
        { label: 'Input or supply volatility', a: 'Diversify supply and improve productivity', b: 'Supply continuity' },
        { label: 'Need for scale', a: 'SPVB’s Long An capacity with renewable-energy and recycled-plastic packaging plans', b: 'Capacity utilisation' },
        { label: 'Regulatory uncertainty', a: 'Stage commitments and take no-regret moves first', b: 'Regulatory guidance' },
      ],
      note: 'Rank moves by strategic fit, consumer value, regulatory compliance, economics, capability readiness, speed to evidence, reversibility and downside risk.',
      takeaway: 'A response works when it targets the risk mechanism, so portfolio, price-pack, route and operations must move together.',
    },
  },
};
