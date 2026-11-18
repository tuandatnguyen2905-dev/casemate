import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Beer & Alcoholic Drinks Module 05, keyed by visualKind. */
export const BEER_M5_VISUALS: Record<string, ChapterVisual> = {
  'beer-m5-51-1-consumer-map': {
    heading: 'Global moderation versus Vietnam’s younger, beer-led base',
    intro: 'Both markets are changing how people drink, but from different starting points. Compare what drives frequency, trade-up and occasions in each.',
    spec: {
      layout: 'compare', title: 'How Alcoholic Beverage Consumers Are Changing', kicker: '',
      leftTitle: 'Global pattern', rightTitle: 'Vietnam pattern',
      rows: [
        { label: 'Starting point', a: 'Many developed markets ageing, drinking less often and more selectively', b: 'Younger, beer-dominant base: beer about 91% of alcohol volume (vendor estimate, not official)' },
        { label: 'Consumption signal', a: 'WHO: 5.7 to 5.5 litres of pure alcohol per person aged 15+, 2010 to 2019', b: 'No validated generational frequency dataset; treat Gen Z claims as hypotheses' },
        { label: 'Market signal', a: 'IWSR 2024 estimate: volume about −1%, value about +1%', b: 'Rising incomes support trade-up' },
        { label: 'What reshapes occasions', a: 'Health awareness, budgets and next-day performance', b: 'Zero-tolerance drink-driving enforcement makes transport, venue and alcohol content deliberate' },
      ],
      note: 'Kirin’s brewer-compiled tracker puts global beer at about 194.12 million kilolitres in 2024, up only 0.5%. Revenue growth may reflect price, mix, inflation or currency, not higher consumption.',
      takeaway: 'Manage the portfolio by occasion and segment, because one average volume target hides moves in opposite directions.',
    },
  },
  'beer-m5-51-2-moderation': {
    heading: 'When a no-alcohol beer adds an occasion rather than stealing one',
    intro: 'Moderation can cut litres while no/low keeps the consumer in the occasion. Follow the question that separates incremental sales from cannibalisation.',
    spec: {
      layout: 'decision', title: 'Moderation, Premiumization, and Low/No-Alcohol Alternatives', kicker: '',
      root: { label: 'No-alcohol beer purchase', detail: 'Read trial, repeat, previous beverage, time and venue at occasion level' },
      question: 'What would this buyer have drunk otherwise?',
      branches: [
        { condition: 'Nothing the brewer served', outcome: 'Incremental', detail: 'The alcohol-free beer wins a social occasion the portfolio would have missed', tone: 'positive' },
        { condition: 'The brewer’s full-strength beer', outcome: 'Cannibalising', detail: 'The same buyer simply replaces a full-strength beer in the portfolio', tone: 'caution' },
        { condition: 'A drink from another category', outcome: 'Still strategically useful', detail: 'Keeps a consumer the brewer was otherwise losing to another category', tone: 'positive' },
      ],
      note: 'IWSR estimates non-alcoholic beer volume up about 9% globally in 2024. Heineken reported Heineken 0.0 up about 10% and its flagship brand up 9%, company results rather than market shares. No Vietnam no/low share was validated.',
      takeaway: 'Market growth alone cannot answer the portfolio question; occasion-level data on trial, repeat and the previous drink can.',
    },
  },
  'beer-m5-51-3-vietnam-behaviour': {
    heading: 'Aspiration and drink-driving enforcement redraw the Vietnamese night out',
    intro: 'Rising incomes widen choice while zero-tolerance rules raise the cost of an unplanned venue visit. The likely responses are plausible hypotheses, not measured shifts.',
    spec: {
      layout: 'pathway', title: 'Emerging Consumer Behaviors in Vietnam', kicker: '',
      trunk: [
        { label: 'Income and urbanisation', detail: 'More modern-retail choice and more premium options', kind: 'stage' },
        { label: 'Zero-tolerance enforcement', detail: 'Raises the cost of an unplanned on-trade occasion', kind: 'stage' },
      ],
      optionsLabel: 'Likely responses (size unverified)',
      options: [
        { label: 'Designated transport', detail: 'The journey home becomes part of planning the occasion' },
        { label: 'More at-home consumption', detail: 'Convenience formats suit smaller households and planned occasions' },
        { label: 'Smaller serves', detail: 'Less alcohol within the same social occasion' },
        { label: 'No/low choices', detail: 'Joining the occasion without alcohol' },
      ],
      afterLabel: 'Commercial response',
      after: [
        { label: 'Packs for home and modern retail', kind: 'stage' },
        { label: 'Responsible on-trade service', detail: 'Safe-transport thinking that preserves the occasion without encouraging more drinking', kind: 'outcome' },
      ],
      note: 'Law 44/2019/QH14 applies from 1 January 2020; Decree 168 took effect 1 January 2025 and is amended by Decree 238 from 15 August 2026. No national dataset quantifies the on-trade-to-home shift.',
      takeaway: 'Measure pack mix, alcohol-free share and transport arrangements before claiming that occasions have moved.',
    },
  },
  'beer-m5-52-1-product': {
    heading: 'Liquid, format and proposition aimed at a single consumer job',
    intro: 'Innovation is more than a new flavour. Sort the pipeline into what is in the glass, how it is packed and what it promises the drinker.',
    spec: {
      layout: 'taxonomy', title: 'How Alcoholic Beverage Products Are Evolving', kicker: '',
      root: 'Alcoholic-drink product innovation', rootDetail: 'Each concept defines its occasion, taste, price, alcohol claim, pack and channel together',
      groups: [
        { label: 'Liquid', detail: 'What is in the glass', items: ['No/low beer by arrested fermentation', 'Vacuum distillation or membrane separation', 'Localised premium lagers', 'Wine: aroma and texture trade-offs'] },
        { label: 'Format', detail: 'How it is packed and served', items: ['RTDs turning spirits brands into easy serves', 'Packs for smaller or at-home occasions', 'Convenient packaged formats'] },
        { label: 'Proposition', detail: 'What it promises', items: ['Benefit and reason to believe', 'Price and target occasion', 'Honest, compliant alcohol claim'] },
      ],
      note: 'Concepts pass desirability, technical, commercial and regulatory gates. IWSR estimates non-alcoholic beer volume up about 9% in 2024; Pernod Ricard reported RTDs up 7% in FY2025, a company result. Vietnam product shares and R&D spend were not validated.',
      takeaway: 'A concept that wins a tasting but fails on cost, shelf life or compliant claims is not a business innovation.',
    },
  },
  'beer-m5-52-2-production': {
    heading: 'Closing the brewery control loop from sensor to verified saving',
    intro: 'Small drift in fermentation or packaging becomes a large loss at scale. Follow how a measured signal turns into a controlled action and a checked result.',
    spec: {
      layout: 'flow', title: 'Technology Transforming Production', kicker: '',
      steps: [
        { label: 'Set the baseline', detail: 'Current loss, frequency, cost and quality impact', kind: 'stage' },
        { label: 'Sense', detail: 'Process sensors, laboratory quality data and maintenance signals', kind: 'stage' },
        { label: 'Decide', detail: 'Analytics flags drift; operators stay in the loop where safety or quality matter', kind: 'decision' },
        { label: 'Act', detail: 'Automation stabilises repeatable tasks and improves set-points', kind: 'stage' },
        { label: 'Verify the outcome', detail: 'Yield, right-first-time quality, downtime, energy, water and packaging loss', kind: 'outcome' },
      ],
      loop: 'Automation can make a bad rule repeat faster, so process ownership and exception handling stay part of every cycle.',
      note: 'Heineken reported more than EUR0.6 billion gross savings in 2024 and Pernod Ricard a completed EUR900 million FY2023–25 programme; Diageo’s roughly US$850m is a target from FY2027. No source assigns these results to automation alone.',
      takeaway: 'Ask which loss the technology removes, not whether the plant uses AI.',
    },
  },
  'beer-m5-52-3-digital': {
    heading: 'Naming the commercial decision before choosing an AI model',
    intro: 'A digital tool earns its place by changing a specific decision. Read what each use case improves and the guardrail it needs in a regulated category.',
    spec: {
      layout: 'table', title: 'Digitalization, AI, and Business Innovation', kicker: '',
      headers: ['Use case', 'Decision it changes', 'Guardrail needed'],
      rows: [
        { label: 'Revenue growth management', a: 'Separate price, mix and volume to improve price-pack architecture', b: 'No promotions or claims that breach alcohol-marketing rules' },
        { label: 'Demand forecasting', a: 'Align production and inventory with fewer stock-outs', b: 'Run beside the existing process and record overrides' },
        { label: 'Outlet pack allocation', a: 'Use sell-out signals to place packs and predict holiday demand', b: 'Never treat distributor sell-in as consumer demand' },
        { label: 'Consumer feedback summaries', a: 'Find patterns in unstructured feedback faster', b: 'Age, privacy and bias checks; no automated targeting' },
      ],
      note: 'A credible use case names the decision, user, input data, baseline, success metric and human approval. No verified alcoholic-beverage AI adoption rate was available.',
      takeaway: 'A narrow, measurable forecast can beat ambitious personalisation because outcomes are clearer and compliance risk is lower.',
    },
  },
  'beer-m5-53-1-value-volume': {
    heading: 'Decomposing a value rise while litres fall',
    intro: 'IWSR estimates global beverage-alcohol volume about 1% lower in 2024 while value rose about 1%. Break value growth into the parts that could explain it.',
    spec: {
      layout: 'driverTree', title: 'The Shift from Volume to Value', kicker: '',
      root: { label: 'Change in value sales', detail: 'Global beverage alcohol 2024: value about +1%, volume about −1% (IWSR estimate)' },
      formula: 'Value change = volume + price realisation + mix + tax + inflation and currency',
      drivers: [
        { label: 'Volume', detail: 'Litres and units; moderation removes some occasions', op: '+' },
        { label: 'Price realisation', detail: 'List price after discounts, promotions and terms', op: '+' },
        { label: 'Mix', detail: 'Premium tiers, packs, categories and channels', op: '+', children: [
          { label: 'RTDs', detail: 'About +2% volume and nearly +5% value in 2024 (estimate)' },
          { label: 'US hard tea', detail: '+31% volume; a US sub-segment, not global RTD growth' },
        ] },
        { label: 'Excise and tax', detail: 'Vietnam’s enacted 2027–31 path lifts price but weakens affordability', op: '+' },
        { label: 'Inflation and currency', detail: 'Raise money sales without any extra consumption', op: '+' },
      ],
      note: 'IWSR figures are commercial estimates of 2024 movement, not a guaranteed long-run relationship. Pair revenue with litres, penetration, repeat and gross margin.',
      takeaway: '“Value up” is healthy only when mix and repeat drive it, not tax and inflation alone.',
    },
  },
  'beer-m5-53-2-channel-evolution': {
    heading: 'The roles bars, shops, chains and apps play once the occasion is chosen',
    intro: 'The consumer picks the occasion first and the channel follows. See what each channel contributes and the pressure it faces.',
    spec: {
      layout: 'ecosystem', title: 'How Alcoholic Beverage Sales Channels Are Evolving', kicker: '',
      center: { label: 'The consumer’s occasion', detail: 'Chosen first; the sale then lands in a bar, a shop, a supermarket or a digital order' },
      actors: [
        { label: 'On-trade venues', relation: 'Trial, experience and premium service; exposed to drink-driving enforcement and discretionary spending', flows: ['service', 'money'] },
        { label: 'Modern trade chains', relation: 'Scale packs with data and reach, but gain bargaining power over suppliers', flows: ['product', 'information'] },
        { label: 'Traditional trade outlets', relation: 'Independent stores and wholesalers supply reach', flows: ['product', 'money'] },
        { label: 'Digital ordering', relation: 'Supports discovery and ordering where law permits', flows: ['information'] },
      ],
      note: 'A vendor estimates offline channels at 52.7% of Vietnam beer in 2025, with an unclear definition; it does not measure an on-trade-to-off-trade shift.',
      takeaway: 'Give each channel a job in reach, trial, experience or economics, because sales alone can reward a route that destroys margin.',
    },
  },
  'beer-m5-53-3-distribution': {
    heading: 'One shared demand plan branching into many routes to the outlet',
    intro: 'A digital order still needs a physical bottle, a licence and stock. Follow how one plan fans out into routes and comes back as sell-out learning.',
    spec: {
      layout: 'pathway', title: 'The Future of Alcoholic Beverage Distribution', kicker: '',
      trunk: [
        { label: 'Shared demand view', detail: 'Common product and outlet definitions across every route', kind: 'stage' },
        { label: 'Outlet segmentation', detail: 'Group outlets by mission, potential, service needs and economics', kind: 'stage' },
      ],
      optionsLabel: 'Fulfilment routes',
      options: [
        { label: 'Distributors', detail: 'Traditional-trade reach into fragmented outlets' },
        { label: 'Key accounts', detail: 'Retailers expecting reliable fulfilment and commercial insight' },
        { label: 'Digital ordering', detail: 'Better visibility, but it cannot bypass alcohol law' },
      ],
      afterLabel: 'Learn and control',
      after: [
        { label: 'Sell-out signal', detail: 'Final consumer purchases, not distributor sell-in shipments', kind: 'stage' },
        { label: 'Age and licence checks', detail: 'Built into the route alongside cost to serve', kind: 'outcome' },
      ],
      note: 'Pilot in one city, channel and pack family, and scale only if availability or economics improve. No Vietnam e-commerce size or route-technology adoption statistic was validated.',
      takeaway: 'Distribution is becoming more connected, not less physical: the aim is availability and lower working capital, not merely more channels.',
    },
  },
  'beer-m5-54-1-regulatory-timeline': {
    heading: 'Vietnam’s alcohol rules from the 2019 harm law to the 2031 tax step',
    intro: 'An enacted law, its effective date and an amending decree are different events. Read each date by its legal status before drawing business conclusions.',
    spec: {
      layout: 'timeline', title: 'The Changing Regulatory Environment', kicker: '',
      events: [
        { period: '14 June 2019', label: 'Law 44/2019/QH14 enacted', detail: 'Alcohol-harm prevention framework', status: 'historical' },
        { period: '1 January 2020', label: 'Law 44/2019/QH14 takes effect', detail: 'Basis for zero-tolerance drink-driving enforcement', status: 'historical' },
        { period: '1 January 2025', label: 'Decree 168/2024 takes effect', detail: 'Road-traffic penalties and licence points', status: 'historical' },
        { period: '14 June 2025', label: 'Law 66/2025/QH15 enacted', detail: 'Excise law with future annual rate steps written in', status: 'historical' },
        { period: '1 January 2026', label: 'Law 66/2025/QH15 takes effect', detail: 'Beer and alcohol of 20° or more at 65%; below 20° at 35%', status: 'historical' },
        { period: '15 August 2026', label: 'Decree 238/2026 amends Decree 168', detail: 'Check the consolidated current text before quoting penalties', status: 'historical' },
        { period: '1 January 2027–31', label: 'Annual excise steps, already enacted', detail: 'Beer and ≥20°: 70% rising to 90%; below 20°: 40% rising to 60%', status: 'forecast' },
      ],
      note: 'The future rate steps are enacted law, not proposals. Effects on price, margin and occasions are strategic interpretation, not legal text.',
      takeaway: 'Two enacted systems, drink-driving enforcement and a written excise schedule, shape the outlook; confirm instrument, dates and provision first.',
    },
  },
  'beer-m5-54-2-circularity': {
    heading: 'Returnable glass versus one-way recyclable packs: no universal winner',
    intro: 'Neither pack is better everywhere. Compare what each system depends on, then ask which measured input changed from a stated baseline.',
    spec: {
      layout: 'compare', title: 'Sustainable Production, Packaging, and Water Management', kicker: '',
      leftTitle: 'Returnable bottle', rightTitle: 'One-way recyclable pack',
      rows: [
        { label: 'Performs well when', a: 'It completes many trips through a dense collection network', b: 'Collection and high-quality recycling are in place' },
        { label: 'Performs poorly when', a: 'Transport, breakage or washing is inefficient', b: 'Packs are not collected or recycled to high quality' },
        { label: 'Main levers', a: 'Consumer return, cleaning and reverse-logistics economics', b: 'Lightweight glass, optimised cans and recycled content' },
        { label: 'Vietnam fit', a: 'Can fit established on-trade loops', b: 'Recycled-content percentages not verified' },
      ],
      note: 'Compare material, filling, transport, collection, washing, loss rate and end of life. Water use must reflect local basin conditions. A “by 2030” target is a commitment; only measured progress against a baseline is an achievement.',
      takeaway: 'The best packaging system is local, so claim superiority only from a full-system comparison, never from one attribute.',
    },
  },
  'beer-m5-54-3-esg-response': {
    heading: 'Turning an ESG pledge into owned, evidenced controls',
    intro: 'A policy on a website does not control a sales visit, a brewery line or a supplier. Follow the steps that turn a commitment into credible disclosure.',
    spec: {
      layout: 'flow', title: 'How Alcoholic Beverage Companies Respond to ESG and Compliance', kicker: '',
      steps: [
        { label: 'Commit', detail: 'State the ambition with scope and baseline', kind: 'stage' },
        { label: 'Assign owners', detail: 'A named function and decision rights for each risk', kind: 'stage' },
        { label: 'Assess risk and train', detail: 'Public health, traffic safety, water use, packaging waste and marketing conduct', kind: 'stage' },
        { label: 'Control', detail: 'Prevent, detect and respond inside operations and channels', kind: 'stage' },
        { label: 'Disclose with evidence', detail: 'Baseline to actual outcome, including limitations and gaps', kind: 'outcome' },
      ],
      loop: 'Current-law monitoring feeds back into controls: decree amendments and the published 2027–31 excise path need a live process, not a static slide.',
      note: 'Tax rates and dates are enacted facts; strategic responses are interpretation, and company-specific response effectiveness was not measured.',
      takeaway: 'ESG and compliance become capabilities only when commitments have owners, controls and measured progress, gaps included.',
    },
  },
  'beer-m5-55-1-outlook': {
    heading: 'A flat 2024 baseline and forecasts that must never be added together',
    intro: 'Each figure has its own period, geography and definition. Read the baseline first, then treat every later point as a conditional forecast.',
    spec: {
      layout: 'timeline', title: 'Where Is the Alcoholic Beverage Industry Heading?', kicker: '',
      events: [
        { period: '2024', label: 'Global alcohol baseline', detail: 'IWSR estimate: volume about −1%, value about +1%', status: 'historical' },
        { period: '2024', label: 'Global beer tracker', detail: 'Kirin: about 194.12 million kilolitres, +0.5%', status: 'historical' },
        { period: '2024', label: 'Vietnam beer vendor estimate', detail: 'About US$7.89 billion, from a single commercial source', status: 'historical' },
        { period: '2027–31', label: 'Vietnam excise escalation', detail: 'Enacted annual steps: a downside for volume and affordability', status: 'forecast' },
        { period: '2033', label: 'Vietnam beer vendor forecast', detail: 'US$14.85 billion; may not reflect the full tax path', status: 'forecast' },
        { period: 'By 2034', label: 'IWSR key-markets forecast', detail: 'About US$34 billion of value growth, led by India, then Brazil and Mexico', status: 'forecast' },
      ],
      note: 'IWSR’s US$34 billion is value growth across selected markets; the vendor figure is one national beer market estimate. Plan a base, upside and downside case instead of one point.',
      takeaway: 'The defensible outlook is modest, uneven and value-led, with Vietnam’s demographic potential facing a visible tax headwind.',
    },
  },
  'beer-m5-55-2-opportunity': {
    heading: 'Screening no/low, premium and RTD pools for a right to win',
    intro: 'A fast-growing segment attracts rivals too. For each pool, compare why it looks attractive with what still has to be proved in Vietnam.',
    spec: {
      layout: 'table', title: 'Emerging Industry Segments and Opportunities', kicker: '',
      headers: ['Opportunity pool', 'Why it attracts', 'What must be proved'],
      rows: [
        { label: 'No/low beer', a: 'Global volume about +9% in 2024 (IWSR estimate); fits enforcement-shaped occasions', b: 'Taste, repeat and incremental occasions' },
        { label: 'Premium beer', a: 'Captures income-led trade-up', b: 'Margin after the same rising beer excise' },
        { label: 'RTDs', a: 'Volume forecast about 12% higher over 2022–27, toward roughly US$40 billion (commercial compilation)', b: 'Category, tax, route and consumer fit' },
        { label: 'Craft, wine and local specialities', a: 'Urban niches', b: 'Any validated Vietnam numbers; current evidence is thin' },
      ],
      note: 'Global growth figures do not establish Vietnam demand or company profitability. Evidence should strengthen as investment rises: interviews, pilots, repeat purchase, stable unit economics.',
      takeaway: 'Opportunity equals an attractive demand pool plus a credible right to win, compliant economics and proof that consumers repeat.',
    },
  },
  'beer-m5-55-3-risk-response': {
    heading: 'Pairing each strategic bet with its early-warning signal',
    intro: 'Opportunities and risks interact, so every bet needs an owner, leading indicators and a trigger to adapt or stop. Read what each bet should watch.',
    spec: {
      layout: 'table', title: 'Strategic Opportunities and Risks for Businesses', kicker: '',
      headers: ['Strategic bet', 'What to track', 'Risk it must withstand'],
      rows: [
        { label: 'No/low launch', a: 'Taste repeat and incremental occasions', b: 'Moderation removing alcoholic occasions' },
        { label: 'Selective premiumisation', a: 'Mix, penetration and affordability', b: 'Rising excise weakening affordability' },
        { label: 'Cost programme', a: 'Quality and capability kept intact', b: 'Commodity prices and execution complexity' },
        { label: 'New formats and packs', a: 'Portfolio and production complexity', b: 'Many SKUs while promising lower complexity' },
      ],
      note: 'Heineken reported more than EUR0.6 billion gross savings in 2024 and Pernod Ricard a completed EUR900 million FY2023–25 programme; Diageo’s roughly US$850 million is a target from FY2027. Periods and scopes differ, so do not rank them.',
      takeaway: 'Defend value, not volume: link every bet to an owner, a downside trigger and a prepared contingency.',
    },
  },
};
