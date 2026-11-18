import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Beer & Alcoholic Drinks Module 04, keyed by visualKind. */
export const BEER_M4_VISUALS: Record<string, ChapterVisual> = {
  'beer-m4-41-1-concentration': {
    heading: 'Few big brewers fight on brand, many winemakers on origin',
    intro: 'How many rivals share a market decides how they compete. Follow each branch to see what rivalry looks like when a few groups dominate and when thousands share the field.',
    spec: {
      layout: 'decision', title: 'Understanding Competition in Alcoholic Beverages', kicker: '',
      root: { label: 'Competition structure', detail: 'How many rivals, how large, how similar and how easily others can join' },
      question: 'Do a few large firms hold most of the market?',
      branches: [
        { condition: 'Yes: concentrated oligopoly', outcome: 'Rivalry through brand, price tiers, packs and distribution', detail: 'Global beer, brand-led spirits and Vietnam’s four-group beer market; expect stable leaders' },
        { condition: 'No: fragmented market', outcome: 'Producers separate through origin, style and reputation', detail: 'Wine: many small contests, no single firm sets the pace' },
      ],
      note: 'BarthHaas data reported by Brauwelt: the top four made about 60% and AB InBev about 31% (about 518 million hl) of 2022 top-40 output, by volume, not all beer. Vietnam’s US$7.89 billion (2024) is a vendor estimate; player shares are not verified.',
      takeaway: 'Read the structure before the scoreboard: it tells you whether rivals will fight on brand and reach or on origin and reputation.',
    },
  },
  'beer-m4-41-2-forces': {
    heading: 'The State presses on every force acting on alcohol profits',
    intro: 'Each force pulls profit away from the industry in its own way. Notice how tax, licensing and rules reach into all of them, not just one.',
    spec: {
      layout: 'ecosystem', title: 'The Five Forces Shaping Industry Competition', kicker: '',
      center: { label: 'Industry profit pool', detail: 'Beer, wine and spirits; squeezed whenever the forces are strong' },
      actors: [
        { label: 'Rivalry among incumbents', relation: 'Concentrated beer fights on brand and reach; fragmented wine also faces weather', flows: ['money'] },
        { label: 'Threat of new entrants', relation: 'Strong entry protection in beer; spirits shielded by brand strength and long ageing', flows: ['risk'] },
        { label: 'Substitutes', relation: 'No/low and moderation cap price; Heineken 0.0 grew 10% in 2024 (company-reported)', flows: ['product'] },
        { label: 'Supplier power', relation: 'Barley, malt, aluminium and glass carry price and currency risk', flows: ['product', 'money'] },
        { label: 'Buyer power', relation: 'Large retailers push for lower prices and better terms', flows: ['money'] },
        { label: 'The State', relation: 'Licences, excise and marketing rules shape all five; Vietnam SCT reported 65% to 90% by 2031', flows: ['oversight'] },
      ],
      note: 'WHO: global alcohol per person fell from 5.7 to 5.5 litres of pure alcohol (2010 to 2019), not beer only. Sabeco’s reported nine-month 2023 revenue fell about 12% and profit about 26%; the sources do not split the causes.',
      takeaway: 'Name the force and the category you mean: beer, wine and spirits feel the same pressures with different weights.',
    },
  },
  'beer-m4-41-3-barriers': {
    heading: 'Stacked barriers push challengers into niches, partnerships or purchases',
    intro: 'Brand, scale, distribution, licences and excise stack on top of one another. See which barriers a newcomer meets and the three routes that still lead in.',
    spec: {
      layout: 'pathway', title: 'Entry Barriers and Competitive Power', kicker: '',
      trunk: [
        { label: 'Hardest to buy: brand and distribution', detail: 'Years of consistent quality and marketing; stock, credit, vehicles and relationships', kind: 'stage' },
        { label: 'Stacked on top: scale, licences, excise', detail: 'Incumbents’ lower unit cost, plus compliance work and cash needs', kind: 'stage' },
      ],
      optionsLabel: 'Routes that still lead in',
      options: [
        { label: 'Craft or regional niche', detail: 'Low capital at small scale, but rarely national reach' },
        { label: 'Partner for the missing capability', detail: 'A well-funded entrant borrows capacity or routes' },
        { label: 'Buy a protected position', detail: 'ThaiBev bought 53.59% of Sabeco for US$4.78 billion in 2017 (historical, not a valuation)' },
      ],
      afterLabel: 'What usually follows',
      after: [
        { label: 'Incumbent leadership persists', detail: 'Unless a law, a new channel or a taste shift changes the rules', kind: 'outcome' },
      ],
      note: 'Sabeco reported 200,000+ shops through 11 trading companies and 26 factories (FY2023). US beer sales split roughly craft 12%, large domestic non-craft 68% and imports 20% (2025 academic analysis): a US-only scale-plus-niche shape.',
      takeaway: 'The barriers money cannot buy quickly, brand and distribution, explain why challengers choose niches, partners or acquisitions.',
    },
  },
  'beer-m4-42-1-global': {
    heading: 'Hectolitre leagues and prestige leagues crown different leaders',
    intro: 'Brewers are ranked by how much they brew; spirits houses by sales and brand prestige. Compare how each league leads before reading any group figure.',
    spec: {
      layout: 'compare', title: 'Who Leads the Global Alcoholic Beverage Industry?', kicker: '',
      leftTitle: 'Global beer groups', rightTitle: 'Spirits brand houses',
      rows: [
        { label: 'How the league is ranked', a: 'Hectolitres brewed, here 2022 output', b: 'Sales and brand prestige' },
        { label: 'Leaders named', a: 'AB InBev, Heineken, China Resources Snow Breweries, Carlsberg', b: 'Diageo and Pernod Ricard' },
        { label: 'How they lead', a: 'Scale and local brewing across many markets', b: 'Brand equity and aged stock' },
        { label: 'Example brands', a: 'Budweiser, Corona, Heineken, Tiger, Tuborg, 1664 Blanc', b: 'Johnnie Walker, Smirnoff, Jameson, Absolut, Chivas, Martell' },
        { label: 'Reported scale', a: 'AB InBev revenue US$59.77 billion (FY2024); Heineken EUR35,955 million', b: 'Diageo net sales US$19,643 million, year to 30 June 2026' },
      ],
      note: 'Currencies, fiscal years and revenue bases differ, so these figures describe each company and do not form a league table. Groups also cross categories: Diageo owns Guinness and Carlsberg sells soft drinks.',
      takeaway: 'Name the league before the leader, and never treat a group total as a local-market result.',
    },
  },
  'beer-m4-42-2-vietnam': {
    heading: 'Vietnam’s four beer groups sorted by the owner behind them',
    intro: 'Brand, owner and local operation are three separate facts. Group the four leaders by ownership type, then read each one’s brands and footprint.',
    spec: {
      layout: 'taxonomy', title: 'Major Alcoholic Beverage Companies in Vietnam', kicker: '',
      root: 'Vietnam beer leaders', rootDetail: 'Heineken Vietnam and Sabeco contest the lead; Habeco and Carlsberg Vietnam are regional challengers',
      groups: [
        { label: 'Local arms of international groups', items: ['Heineken Vietnam: Heineken, Tiger, Bia Viet', 'Vung Tau brewery about 1.1 billion litres (vendor estimate)', 'Carlsberg Vietnam: Huda, strong in the central region'] },
        { label: 'Controlled by ThaiBev', items: ['Sabeco: Bia Saigon and 333', '53.59% bought for US$4.78 billion in 2017', '26 factories, 200,000+ shops, exports to about 30 countries'] },
        { label: 'State-linked northern brewer', items: ['Habeco: Bia Hanoi and Truc Bach'] },
      ],
      note: 'Reported 2023 results show direction, not ranking: Sabeco nine-month revenue about −12% and profit about −26%; Habeco profit about US$12.3 million (−39%); Vietnam Brewery volume −16.5%. Periods and bases differ.',
      takeaway: 'Ownership helps explain funding and priorities, but it does not by itself explain performance.',
    },
  },
  'beer-m4-42-3-positioning': {
    heading: 'Litres, revenue, shop count and intent are four separate lenses',
    intro: 'Two firms can both honestly claim to be number one. Read what each lens measures and what it rewards before accepting any share claim.',
    spec: {
      layout: 'table', title: 'Understanding Market Share and Competitive Positioning', kicker: '',
      headers: ['Lens', 'What it measures', 'What it rewards or shows'],
      rows: [
        { label: 'Volume share', a: 'Litres or hectolitres sold in a defined market', b: 'Affordable, widely available mainstream products' },
        { label: 'Value share', a: 'Revenue in a defined market', b: 'Price and mix: a premium brand can lead with fewer litres' },
        { label: 'Reach', a: 'Access, such as Sabeco’s 200,000+ shops (FY2023)', b: 'Distribution, not a sales outcome' },
        { label: 'Positioning', a: 'Place on the price ladder and in buyers’ minds', b: 'Intent: Heineken Vietnam premium-led, Sabeco mainstream scale' },
      ],
      note: 'Within Heineken, the Heineken brand grew 9% in 2024 while total beer volume rose 1.6% organically (company-reported). No verified Vietnam player share is shown.',
      takeaway: 'When volume and value shares diverge, price and mix are at work, and growing value can beat growing litres.',
    },
  },
  'beer-m4-43-1-workflow': {
    heading: 'Aligning currency, year and revenue basis before any ranking',
    intro: 'Heineken alone reports two revenue figures for one year. Follow the steps that make company figures comparable, and note where a gap stays open.',
    spec: {
      layout: 'flow', title: 'How to Benchmark Alcoholic Beverage Companies', kicker: '',
      steps: [
        { label: 'Define peers and metric', detail: 'Same category and role: scale, profitability, reach or portfolio', kind: 'stage' },
        { label: 'Label the currency', detail: 'USD, EUR, DKK and VND; conversions are approximate', kind: 'stage' },
        { label: 'Match the fiscal year', detail: 'Diageo and Pernod Ricard end 30 June; AB InBev, Heineken and Carlsberg use calendar years', kind: 'stage' },
        { label: 'Align the revenue basis', detail: 'Heineken FY2024: revenue EUR35,955 million, net revenue EUR29,821 million', kind: 'stage' },
        { label: 'Keep beer and spirits apart', detail: 'Their margins are not like-for-like', kind: 'stage' },
        { label: 'Interpret and flag gaps', detail: 'Explain differences; treat unmatched figures as directional evidence', kind: 'outcome' },
      ],
      note: 'Heineken’s operating (beia) margin was 15.1% in FY2024; Diageo’s 28.9% before exceptional items covers the year to 30 June 2026 on a different definition. Sabeco’s VND30.5 trillion (about US$1.2 billion) is an FY2023 figure.',
      takeaway: 'Normalise first and compare second, so differences are explained rather than simply ranked.',
    },
  },
  'beer-m4-43-2-compare': {
    heading: 'Grading each shelf-and-route benchmark by its evidence level',
    intro: 'Outlet counts, brand claims, capacity estimates and missing prices carry very different weight. Sort each commercial benchmark by how strong its source is.',
    spec: {
      layout: 'taxonomy', title: 'Comparing Brands, Products, Pricing, and Distribution', kicker: '',
      root: 'Commercial benchmarks', rootDetail: 'Brands, products, pricing and distribution',
      groups: [
        { label: 'Reported numbers', detail: 'Strongest evidence', items: ['Sabeco: 200,000+ shops via 11 trading companies', 'Sabeco: 26 factories, FY2023'] },
        { label: 'Company statements', detail: 'Useful but self-described', items: ['Heineken 0.0 up 10% in 2024', 'Pernod Ricard RTDs up 7% in FY2025', 'Brand portfolios of Heineken, Carlsberg and AB InBev'] },
        { label: 'Vendor estimates', detail: 'Label as commercial figures', items: ['Heineken Vung Tau capacity about 1.1 billion litres'] },
        { label: 'Gaps: not verified', detail: 'Show the gap instead of guessing', items: ['Shelf or per-litre prices for all four groups', 'Network size of Habeco and Carlsberg Vietnam'] },
      ],
      note: 'A fair price comparison fixes pack size, channel, place and date, and separates list price from realised price; shelf prices include excise.',
      takeaway: 'Distribution is the hardest benchmark to copy, and an unsupported “Brand X is cheaper” claim is weak analysis.',
    },
  },
  'beer-m4-43-3-matrix': {
    heading: 'Margin pairs that can and cannot be set side by side',
    intro: 'A 14% margin means nothing until you ask compared with whom and on what basis. Read each pairing’s caveat and the confidence it allows.',
    spec: {
      layout: 'table', title: 'Understanding Competitive Strengths and Weaknesses', kicker: '',
      headers: ['Pairing', 'What the figures show', 'Confidence and caveat'],
      rows: [
        { label: 'Heineken vs Carlsberg', a: '15.1% operating (beia), FY2024, vs 15.8%, H1 2026', b: 'Directionally similar: full year vs half-year; Carlsberg includes soft drinks' },
        { label: 'Diageo vs scaled brewers', a: '28.9% before exceptional items, year to 30 June 2026', b: 'Not comparable: aged, premium spirits stock, not better execution' },
        { label: 'Sabeco vs Habeco', a: 'About 14% vs about 5% net margin, 2023 (derived)', b: 'Moderate to low: our arithmetic from different sources and periods' },
        { label: 'Vietnam net vs group operating', a: 'Sabeco and Habeco net margins against Heineken or Diageo', b: 'Must not be compared: different margin definitions' },
      ],
      note: 'Derived: VND4.3 trillion ÷ VND30.5 trillion for Sabeco (FY2023) and US$12.3 million ÷ US$237.6 million for Habeco. Scale and network as the drivers are analysis, not sourced.',
      takeaway: 'A strength is a measured gap plus a likely cause and a confidence level, written as analysis rather than as fact.',
    },
  },
  'beer-m4-44-1-brand': {
    heading: 'How trust in a label becomes a price gap on the shelf',
    intro: 'Two bottles of similar liquid can sell at very different prices. Trace the drivers that turn brand equity and consistent quality into pricing power.',
    spec: {
      layout: 'driverTree', title: 'Why Brand Equity and Product Quality Matter', kicker: '',
      root: { label: 'Pricing power and premium mix', detail: 'Hold or raise price and shift sales toward higher-priced products' },
      drivers: [
        { label: 'Brand equity', detail: 'Value a name adds beyond the liquid', children: [{ label: 'Awareness' }, { label: 'Trust' }, { label: 'Associations' }] },
        { label: 'Quality consistency', detail: 'Same experience in every bottle, batch and market', children: [{ label: 'Process control across local breweries' }, { label: 'One visible failure erodes years of trust' }] },
        { label: 'Buyer and outlet response', detail: 'Repeat purchase, acceptance of a higher price, outlets keen to stock it' },
      ],
      note: 'Heineken reported its Heineken brand up 9% in 2024 against total beer volume up 1.6% organically (company-reported, global). No verified Vietnam brand-equity or price-premium data exist.',
      takeaway: 'Brand equity protects margin when volume is flat, and premiumisation means more value per occasion, not more drinking.',
    },
  },
  'beer-m4-44-2-reach': {
    heading: 'The self-funding loop between shop coverage and unit cost',
    intro: 'Reach turns brand into sales, and volume turns into lower unit cost. Follow the loop and notice how it can become a burden when volume falls.',
    spec: {
      layout: 'flow', title: 'Distribution Reach and Economies of Scale', kicker: '',
      steps: [
        { label: 'Distribution reach', detail: 'Stock, credit, vehicles and relationships put product within reach', kind: 'stage' },
        { label: 'Volume sold', detail: 'Availability often decides the purchase', kind: 'stage' },
        { label: 'Economies of scale', detail: 'Fixed plant and purchasing costs spread over more units', kind: 'stage' },
        { label: 'Cash to reinvest', detail: 'Lower unit cost and volume fund more reach', kind: 'outcome' },
      ],
      loop: 'Each turn widens the lead: Sabeco serves 200,000+ shops through 11 trading companies and 26 factories (FY2023, company-reported). When volume falls, the same fixed network spreads cost over fewer units.',
      note: 'Cost programmes defend margin: Heineken >EUR0.6 billion gross savings (2024); Pernod Ricard EUR900 million over FY2023 to FY2025; Diageo targets about US$850 million from FY2027. They are not directly comparable.',
      takeaway: 'Reach and scale fund each other, so leadership is sticky and challengers start with a region, a partner or an acquisition.',
    },
  },
  'beer-m4-44-3-framework': {
    heading: 'Portfolio, innovation, operations and tax skill keep value growing',
    intro: 'Tastes, rules and costs keep moving. See which four capabilities let a brewer grow value without relying on volume alone.',
    spec: {
      layout: 'driverTree', title: 'Innovation, Portfolio Strategy, and Operational Excellence', kicker: '',
      root: { label: 'Relevance and resilience', detail: 'Growth through value and premium mix, not volume alone' },
      drivers: [
        { label: 'Balanced portfolio', detail: 'Brands, tiers, formats and occasions reduce dependence on one product' },
        { label: 'Selective innovation', detail: 'Extensions into no/low and RTD', children: [{ label: 'Heineken 0.0 up 10% in 2024' }, { label: 'Pernod Ricard RTDs up 7% in FY2025' }] },
        { label: 'Operational excellence', detail: 'Consistent quality at competitive cost', children: [{ label: 'Sabeco runs 26 factories' }, { label: 'Vung Tau about 1.1 billion litres (vendor estimate)' }] },
        { label: 'Regulatory capability', detail: 'Vietnam SCT reported to rise from 65% to 90% by 2031; drink-driving enforcement since 2020' },
      ],
      note: 'NielsenIQ data compiled by OhBEV put RTD and ready-to-serve at about US$13.9 billion, roughly 12.5% of beverage alcohol: a commercial estimate with unclear scope. The weights of the factors are analysis.',
      takeaway: 'Weakness in any one factor undermines the others, because brand, scale, cash and compliance fund one another.',
    },
  },
  'beer-m4-45-1-swot': {
    heading: 'Sorting beer’s facts into what firms control and what they face',
    intro: 'The figures in each box are sourced; placing them in a box is judgment. Check whether each item is internal or external before using it.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Industry’s SWOT', kicker: '',
      root: 'Beer-led alcoholic beverages', rootDetail: 'An industry-level SWOT, not one firm',
      groups: [
        { label: 'Strengths (internal)', items: ['Powerful brands, scale and distribution', 'AB InBev record FY2024 revenue US$59.77 billion despite volumes down 1.4%'] },
        { label: 'Weaknesses (internal)', items: ['Slow-growing, volume-taxed core', 'Global beer about 194.12 million kilolitres in 2024, up 0.5%', 'Large, slower-moving organisations (analysis)'] },
        { label: 'Opportunities (external)', items: ['Premiumisation', 'No/low-alcohol and RTDs', 'Vietnam beer about US$7.89 billion in 2024 (vendor estimate)'] },
        { label: 'Threats (external)', items: ['Moderation: 5.7 to 5.5 litres of pure alcohol per person, 2010 to 2019 (WHO)', 'Vietnam SCT reported 65% to 90% by 2031', 'Drink-driving rules tightened since 2020'] },
      ],
      note: 'Excise spans both sides: an external threat, and an internal test of the ability to manage it. Sabeco’s reported nine-month 2023 revenue fell about 12% and profit about 26%.',
      takeaway: 'A SWOT is the start of strategy: each box should point to a strength to use, a weakness to fix or a threat to prepare for.',
    },
  },
  'beer-m4-45-2-pressures': {
    heading: 'A slow global drift versus Vietnam’s near-term tax and enforcement shock',
    intro: 'The same threats land differently in a mature global industry and in young, beer-centric Vietnam. Compare where each pressure hits: demand, margin or both.',
    spec: {
      layout: 'compare', title: 'Competitive Risks and Strategic Challenges', kicker: '',
      leftTitle: 'Global industry', rightTitle: 'Vietnam',
      rows: [
        { label: 'Main pressure', a: 'Secular moderation in developed markets', b: 'Twin regulatory shock: excise and drink-driving' },
        { label: 'Demand signal', a: 'Alcohol per person 5.7 to 5.5 litres, 2010 to 2019 (WHO); beer +0.5% in 2024', b: 'Drink-driving enforcement tightened from 2020' },
        { label: 'Margin signal', a: 'Commodity and currency exposure; stronger large retailers (analysis)', b: 'SCT on beer and strong liquor reported 65% to 90% by 2031' },
        { label: 'Recent results', a: 'Premiumisation does the growth work', b: 'Sabeco nine-month 2023 revenue about −12%, profit −26%; Habeco profit −39%' },
        { label: 'Speed of the shift', a: 'Slower structural trend', b: 'More acute and near-term; still about US$7.89 billion in 2024 (vendor estimate)' },
      ],
      note: 'Excise acts on both demand and margin. The sources do not isolate how much of the 2023 declines came from weak spending, enforcement or tax expectations.',
      takeaway: 'With volume taxed and softening, judge success on margin, mix and cost control, and expect Vietnam to feel it sooner.',
    },
  },
  'beer-m4-45-3-responses': {
    heading: 'Matching each beer-market threat to the response it calls for',
    intro: 'Different threats call for different moves and capabilities. Pick the challenge, then read the typical response, remembering that examples illustrate rather than prove cause.',
    spec: {
      layout: 'decision', title: 'How Companies Respond to Competitive Challenges', kicker: '',
      root: { label: 'Defend value while volume is taxed and softening', detail: 'The common imperative behind every response' },
      question: 'Which challenge is pressing hardest?',
      branches: [
        { condition: 'Excise rises', outcome: 'Price and pack architecture, cost programmes', detail: 'Heineken reported >EUR0.6 billion of gross savings in 2024' },
        { condition: 'Moderation spreads', outcome: 'No/low and RTD options', detail: 'Heineken 0.0 +10% (2024); Pernod Ricard RTDs +7% (FY2025)' },
        { condition: 'Demand dips', outcome: 'Flex costs and support compliant on-trade', detail: 'Pernod Ricard completed a EUR900 million efficiency programme, FY2023 to FY2025' },
        { condition: 'Retailers gain power', outcome: 'Joint planning and brand pull', detail: 'Analysis: no quantified example in the research' },
        { condition: 'Out-scaled by rivals', outcome: 'Partnership or acquisition', detail: 'ThaiBev bought 53.59% of Sabeco for US$4.78 billion in 2017' },
      ],
      note: 'Vietnamese brewers’ responses to the SCT path were not documented, so Vietnam moves are options for analysis. Global examples are company-reported and use different fiscal years and definitions.',
      takeaway: 'Name the challenge, the response, the capability and the evidence, and keep moderation and compliance in the plan because they protect the licence to operate.',
    },
  },
};
