import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Beer & Alcoholic Drinks Module 01, keyed by visualKind. */
export const BEER_M1_VISUALS: Record<string, ChapterVisual> = {
  'beer-m1-11-1-ecosystem': {
    heading: 'A taxed chain that runs from farm to glass',
    intro: 'Drinks above about 0.5% ABV are made, moved and sold like other consumer goods, but the State takes part at every step. Look at who sits around the producer and what flows between them.',
    spec: {
      layout: 'ecosystem', title: 'What Is the Alcoholic Beverages Industry?', kicker: '',
      center: { label: 'Drink producer', detail: 'Brews beer, ferments wine or distils spirits into a branded drink' },
      actors: [
        { label: 'Farm inputs', relation: 'Malted cereals, grapes or fruit become beer, wine or spirits', flows: ['product'] },
        { label: 'Distributors and outlets', relation: 'Get the drink to the drinker and pay the producer', flows: ['product', 'money'] },
        { label: 'Drinker', relation: 'Pays a shelf price with excise tax collected inside it', flows: ['money'] },
        { label: 'The State', relation: 'Sits across the whole chain, collecting excise tax and licensing sellers', flows: ['oversight', 'money'] },
      ],
      note: 'Kirin Holdings puts global beer consumption at about 194.12 million kL in 2024 (brewer-compiled estimate); Astute Analytica values Vietnam’s beer market at about US$7.89 billion (commercial estimate).',
      takeaway: 'Alcohol is a regulated-product business as much as a consumer-goods business, so tax and licensing belong on the industry map.',
    },
  },
  'beer-m1-11-2-traits': {
    heading: 'Why a lager maker cannot be run like a lemonade maker',
    intro: 'Five traits separate alcohol from other fast-moving consumer goods. Read each row from the trait to the strategy it forces, then to the evidence.',
    spec: {
      layout: 'table', title: 'What Makes This Industry Unique?', kicker: '',
      headers: ['Trait', 'What it changes in strategy', 'Proof point'],
      rows: [
        { label: 'The State shares every sale', a: 'Excise tax and licensing shape price and access', b: 'Vietnam’s beer SCT is 65% today, reported to climb toward 90% by 2031' },
        { label: 'Beer local, spirits travel', a: 'Breweries in each market; aged spirits exported from an origin', b: 'Beer is heavy, low-value liquid; valuable aged spirits can cross oceans' },
        { label: 'Value in brands and aged stock', a: 'Distillers finance stock long before any sale', b: 'Scotch matures at least three years, cognac X.O. at least ten (secondary source)' },
        { label: 'Distribution reach decides sales', a: 'B2B2C: regulation limits direct sales to drinkers', b: 'Sabeco’s reach into 200,000+ shops is described as a moat' },
        { label: 'Health and regulation move demand', a: 'Volume can fall while value rises', b: 'WHO: about 2.6 million deaths in 2019; Vietnam bans driving after any alcohol' },
      ],
      note: 'The 90% path is as reported by AFP under Law No. 66/2025/QH15; the full statutory schedule was not read from the legal gazette.',
      takeaway: 'Distribution, premium mix and managing regulation matter as much as taste, and a falling volume can hide rising value.',
    },
  },
  'beer-m1-11-3-boundaries': {
    heading: 'Where a barley farm, a hard seltzer and rượu fall',
    intro: 'The boundary changes the number. Check which businesses and which drinks are counted before comparing any statistic.',
    spec: {
      layout: 'taxonomy', title: 'Where Does the Industry Begin and End?', kicker: '',
      root: 'Alcoholic beverages industry boundary', rootDetail: 'Two dimensions: along the chain and across products',
      groups: [
        { label: 'Along the chain', items: ['Upstream inputs', 'Midstream brewing, fermenting, distilling', 'Downstream distribution and sale'] },
        { label: 'In scope by HS Chapter 22', items: ['2203 beer from malt', '2204 wine of fresh grapes', '2205 vermouth; 2206 cider, perry, mead, sake', '2208 spirits and liqueurs'] },
        { label: 'Moving edges', items: ['No/low beer at the 0.5% ABV line', 'RTDs: about 83% of hard seltzers malt-based', 'Rượu: 2208 or a fermented drink'] },
        { label: 'An input, not a drink', items: ['2207 undenatured ethyl alcohol at 80% or more'] },
      ],
      note: 'An IWSR and NielsenIQ compilation counts RTD plus ready-to-serve as a US$13.9 billion global category, about 12.5% of beverage-alcohol value; the 83% malt-based share is US-focused.',
      takeaway: 'A beer statistic, an alcoholic beverages statistic and one that includes RTDs measure different things.',
    },
  },
  'beer-m1-11-4-classification': {
    heading: 'One extra step, distillation, splits the business models',
    intro: 'All three pillars start with fermentation. Watch how distilling and maturing change strength, stock, travel and industry concentration.',
    spec: {
      layout: 'pathway', title: 'Understanding Beer, Wine, and Spirits', kicker: '',
      trunk: [
        { label: 'Sugar from a farm crop', detail: 'Malted cereals, grapes or fruit, or rice in Vietnam', kind: 'stage' },
        { label: 'Fermentation', detail: 'Yeast turns sugar into alcohol and carbon dioxide; beer takes one to two weeks', kind: 'stage' },
      ],
      optionsLabel: 'Where the pillars part ways',
      options: [
        { label: 'Beer', detail: 'About 5% ABV; a local, distribution-heavy volume business led by a few global groups' },
        { label: 'Wine', detail: 'About 12% ABV; a fragmented, climate-exposed farm business' },
        { label: 'Spirits', detail: 'Distilled to about 40% ABV and matured; an export-led, aged-inventory brand business' },
      ],
      note: 'BarthHaas 2022 (via trade press): the top four brewing groups made about 60% of top-40 output. In Vietnam about 91% of alcohol consumed is beer, a vendor estimate; wine and spirits are not sized.',
      takeaway: 'The production method predicts the business model: local volume for beer, fragmented farming for wine, aged brands for spirits.',
    },
  },
  'beer-m1-11-5-consumers': {
    heading: 'Night out, night in or a gift: the occasion picks the drink',
    intro: 'The industry sells to the trade but builds for the drinker. Pick an occasion and see which product and price it pulls.',
    spec: {
      layout: 'decision', title: 'Who Are the Industry’s Consumers?', kicker: '',
      root: { label: 'Drinker choosing a drink', detail: 'Reached through the trade: distributors, retailers, bars and restaurants' },
      question: 'Which occasion is it?',
      branches: [
        { condition: 'Social night out (on-trade)', outcome: 'Volume and brand-building', detail: 'Bars, restaurants, hotels and beer clubs carry the round' },
        { condition: 'Everyday at home (off-trade)', outcome: 'Value beer and ready-to-drink', detail: 'Price sensitivity pushes some drinkers to trade down' },
        { condition: 'Gift or celebration', outcome: 'Premium or aged spirits', detail: 'Some drinkers drink less but better' },
      ],
      note: 'WHO: consumption per adult fell from 5.7 to 5.5 litres of pure alcohol between 2010 and 2019. Vietnam’s zero-tolerance driving rule moves occasions toward home; Vietnamese age, income and gender segmentation was not verified.',
      takeaway: 'Winning the trade and understanding occasions are different jobs, and moderation is reshaping every occasion.',
    },
  },
  'beer-m1-12-1-craft-to-industry': {
    heading: 'From a batch that varied to a bottle that never does',
    intro: 'For millennia alcoholic drinks were local and variable. Follow the shifts that made them repeatable commercial products.',
    spec: {
      layout: 'flow', title: 'From Ancient Fermentation to Modern Alcoholic Beverages', kicker: '',
      steps: [
        { label: 'Local, seasonal craft', detail: 'Made from whatever grain, grape or fruit a community grew; batches varied', kind: 'stage' },
        { label: 'Controlled fermentation', detail: 'Producers learn to understand and control yeast turning sugar into alcohol', kind: 'stage' },
        { label: 'Distillation', detail: 'A second route to alcohol, concentrating strength', kind: 'stage' },
        { label: 'Science and scale', detail: '19th- and 20th-century methods make drinks repeatable, safe and shippable', kind: 'stage' },
        { label: 'Standardised brands', detail: 'Identical bottles moved across a country and sold at volume', kind: 'outcome' },
      ],
      loop: 'Craft did not disappear: in Vietnam a village still and a modern brewery coexist, and rượu is classified as HS 2208 or HS 2206 by process.',
      note: 'The research record states only that fermented drinks date back millennia; no origins or dates for individual drinks are claimed.',
      takeaway: 'Today’s winners compete on consistency, brand and distribution rather than on inventing a new kind of drink.',
    },
  },
  'beer-m1-12-2-tech-timeline': {
    heading: 'Discoveries that turned brewing and distilling into engineering',
    intro: 'Each milestone removed a limit on quality, volume or shelf life. Ask what each one made repeatable.',
    spec: {
      layout: 'timeline', title: 'How Brewing, Distillation, and Technology Evolved', kicker: '',
      events: [
        { period: '1830', label: 'Coffey’s continuous column still', detail: 'Spirit distilled in one uninterrupted process, not batch by batch', status: 'historical' },
        { period: '1860s', label: 'Pasteur stabilises beer', detail: 'Work on fermentation and pasteurisation', status: 'historical' },
        { period: '1883', label: 'Pure lager yeast isolated at Carlsberg', detail: 'Emil Christian Hansen’s strain standardises the dominant beer style', status: 'historical' },
        { period: 'Undated in the record', label: 'Refrigeration', detail: 'Year-round brewing becomes possible', status: 'historical' },
        { period: '2020', label: 'Malting comes onshore in Vietnam', detail: 'US$70 million Intermalt plant at Cai Mep, 110,000 tonnes of capacity', status: 'historical' },
      ],
      note: 'Dates follow the Module 01 research record. Heineken’s Vung Tau brewery, about 1.1 billion litres a year (vendor figure), shows the same technologies at industrial scale.',
      takeaway: 'Technology moved the contest from making a drink to making it identically, cheaply and everywhere.',
    },
  },
  'beer-m1-12-3-consolidation': {
    heading: 'Mega-mergers buy reach while craft fills the gaps',
    intro: 'Distribution networks and buying power take decades to build, so acquisitions buy them. Compare how scale groups and craft brewers compete.',
    spec: {
      layout: 'compare', title: 'The Rise of Global Alcoholic Beverage Companies', kicker: '',
      leftTitle: 'Global brewing groups', rightTitle: 'Craft brewers',
      rows: [
        { label: 'How they win', a: 'Lower procurement cost and wider distribution reach', b: 'Distinctiveness' },
        { label: 'How they grow', a: 'Mega-mergers roll up hundreds of local brands', b: 'Small scale needs less capital' },
        { label: 'Operating model', a: 'Group owns portfolio and buying power; brewing stays in each market', b: 'Struggle to replicate national distribution' },
        { label: 'United States beer sales, 2025', a: '68% large domestic non-craft, plus 20% imports', b: 'About 12%' },
      ],
      note: 'BarthHaas 2022 (trade press): the top four groups made about 60% of the top 40’s roughly 1.67 billion hectolitres; AB InBev alone about 518 million, roughly 31%. Different years and markets.',
      takeaway: 'Craft is a counter-trend, not a reversal: most volume still sits with scale players.',
    },
  },
  'beer-m1-12-4-vn-timeline': {
    heading: 'From colonial breweries to a ThaiBev-controlled Sabeco',
    intro: 'Vietnam’s beer ownership map was built in stages. Note where capital and regulation changed direction.',
    spec: {
      layout: 'timeline', title: 'The Development of Vietnam’s Alcoholic Beverage Industry', kicker: '',
      events: [
        { period: 'French colonial era', label: 'Brewing arrives', detail: 'Hommel in Hanoi roots Habeco; the Saigon brewery, BGI, roots Sabeco', status: 'historical' },
        { period: 'After reunification', label: 'Two state-owned giants', detail: 'Habeco and Sabeco run as large state-owned enterprises', status: 'historical' },
        { period: 'Mid-2010s', label: 'Equitisation and HOSE listing', detail: 'Heritage brands begin moving toward investors; exact dates not verified', status: 'historical' },
        { period: 'December 2017', label: 'ThaiBev takes control of Sabeco', detail: '53.59% bought from the Ministry of Industry and Trade for US$4.78 billion, via Viet Beverage', status: 'historical' },
        { period: 'January 2020', label: 'Drink-driving enforcement begins', status: 'historical' },
        { period: 'June 2025', label: 'Excise path to 90% agreed', status: 'historical' },
      ],
      note: 'Heineken (through the Vietnam Brewery joint venture) and Carlsberg entered on dates the research does not state; the 49% foreign ownership cap detail is as reported in trade press.',
      takeaway: 'Ownership explains behaviour: the brewers met later regulatory shocks with very different balance sheets.',
    },
  },
  'beer-m1-13-1-evidence-tiers': {
    heading: 'Rank the source before you quote the alcohol number',
    intro: 'Volume, value and intake per person come from sources of different reliability. Sort each figure by evidence tier before using it.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Global Alcoholic Beverages Market', kicker: '',
      root: 'Evidence behind a global alcohol figure', rootDetail: 'Label tier, year, unit and geography every time',
      groups: [
        { label: 'Official and institutional', detail: 'Most comparable', items: ['WHO: 5.5 litres pure alcohol per adult, 2019', 'OIV wine data'] },
        { label: 'Industry trackers', detail: 'Useful, but compiled by interested parties', items: ['Kirin: 194.12 million kL of beer, 2024', 'IWSR forecasts'] },
        { label: 'Commercial vendor estimates', detail: 'Can diverge widely; always labelled', items: ['Astute Analytica: Vietnam US$7.89 billion, 91% beer, 8.3 litres per capita'] },
        { label: 'Left out', detail: 'Unverified or too divergent', items: ['Global beer value: US$748–800 billion vendor range', 'Global spirits market size'] },
      ],
      note: 'No figures from Vietnam’s General Statistics Office were verified, so every Vietnamese market number carries a vendor-estimate label.',
      takeaway: 'Name the source type before the number, and say what the number cannot tell you.',
    },
  },
  'beer-m1-13-2-growth-signals': {
    heading: 'Fewer litres, more money: what lifts alcohol value',
    intro: 'In 2024 beer litres rose, total alcohol volume fell and value rose. Split value into its two drivers to see how all three can be true.',
    spec: {
      layout: 'driverTree', title: 'Global Market Size and Growth', kicker: '',
      root: { label: 'Global beverage-alcohol value, 2024', detail: 'Up about 1% while volume fell about 1% (IWSR)' },
      formula: 'Value = volume × value per litre',
      drivers: [
        { label: 'Volume', detail: 'Flat to slightly down', op: '×', children: [
          { label: 'Emerging-region growth', detail: 'Population and income add litres; beer up 0.5% in 2024 (Kirin)' },
          { label: 'Moderation in mature markets', detail: 'WHO per-adult intake fell from 5.7 to 5.5 litres, 2010 to 2019' },
        ] },
        { label: 'Value per litre', detail: 'Edging up', op: '×', children: [
          { label: 'Premiumisation', detail: 'Fewer but pricier units lift value even when volume is flat' },
        ] },
      ],
      note: 'IWSR forecasts about US$34 billion of value growth across key markets by 2034, led by India: growth, not market size. Astute Analytica projects Vietnam beer at US$14.85 billion by 2033 (7.27% a year), a single-vendor forecast made before the excise increases.',
      takeaway: 'Strategy follows what is actually moving: value in mature markets, volume plus mix in emerging ones.',
    },
  },
  'beer-m1-13-3-pillars': {
    heading: 'Beer leads on litres, spirits on value per litre',
    intro: 'Each pillar is tracked in its own unit by a different body. See how beer, wine and spirits differ once they are lined up carefully.',
    spec: {
      layout: 'taxonomy', title: 'Global Beer, Wine, and Spirits Consumption', kicker: '',
      root: 'Three pillars, each measured its own way', rootDetail: 'Convert units and name the year before comparing',
      groups: [
        { label: 'Beer: volume-led', items: ['About 1,941 million hl consumed, 2024 (Kirin)', 'Roughly nine times wine’s volume, indicative only'] },
        { label: 'Wine: supply-constrained', items: ['208 million hl consumed, 2025, down 2.7% (OIV)', 'Production about 225.8 million hl in 2024, a 60-year low'] },
        { label: 'Spirits: value-led', items: ['No global figure verified', 'Diageo FY2026 net sales US$19,643 million', 'Pernod Ricard FY2025 net sales €10,959 million'] },
        { label: 'Ready-to-drink: adjacent', items: ['IWSR forecast: about 12% volume growth 2022–2027, to roughly US$40 billion'] },
      ],
      note: 'Beer and wine figures come from different years and sources; Diageo and Pernod Ricard report different fiscal years and currencies, so they are not additive.',
      takeaway: 'Beer is volume-led, wine is supply-constrained and spirits are value-led.',
    },
  },
  'beer-m1-13-4-markets': {
    heading: 'Who tops the beer league depends on the denominator',
    intro: 'Total litres reward population, litres per person reward habit and growth rewards momentum. Compare who leads under each lens.',
    spec: {
      layout: 'table', title: 'Major Production and Consumption Markets', kicker: '',
      headers: ['Ranking lens', 'Who leads', 'What it rewards'],
      rows: [
        { label: 'Total volume', a: 'Asia, 32.6% of 2024 beer; China the top country for 22 years', b: 'Population' },
        { label: 'Intake per person', a: 'Czech Republic, 148.8 litres of beer; Europe, 9.2 litres pure alcohol per adult (2019)', b: 'Drinking habit' },
        { label: 'Growth, 2024', a: 'India +14.6%, Russia +9.0%, Thailand +5.8%; China −3.7%', b: 'Momentum in emerging markets' },
      ],
      note: 'Kirin’s tracker is brewer-compiled; WHO pure-alcohol figures are not comparable with beer-only litres. A vendor ranks Vietnam about 9th by beer volume, about 2.2% of the world.',
      takeaway: 'Investment follows growth rather than size, which is why Asia attracts plants even as China plateaus.',
    },
  },
  'beer-m1-13-5-trade-flows': {
    heading: 'Value density decides which drinks cross a border',
    intro: 'A bottle of Scotch can cross oceans; a pint of lager mostly cannot. Test each drink against freight cost to see what travels finished.',
    spec: {
      layout: 'decision', title: 'International Trade and Market Dynamics', kicker: '',
      root: { label: 'A drink sold abroad', detail: 'Recorded under HS 2203 beer, 2204 wine or 2208 spirits' },
      question: 'Is its value per litre high enough to pay for long-distance shipping?',
      branches: [
        { condition: 'Yes: aged spirits and wine', outcome: 'Ships as a finished good', detail: 'World wine exports about 94.8 million hl worth €33.8 billion in 2025, value down 6.7% (OIV)' },
        { condition: 'No: heavy, low-value beer', outcome: 'Brewed locally; inputs and brands travel', detail: 'Barley, malt, hops and aluminium cross borders; brands travel through licences and ownership' },
      ],
      note: 'Four dynamics reshape flows: premiumisation, moderation, climate pressure on wine supply and growth shifting toward markets such as India. Pernod Ricard FY2025: China down 21%, India up 6%.',
      takeaway: 'Spirits are exposed to tariffs and export markets, wine to climate, and beer to commodity inputs and local regulation.',
    },
  },
  'beer-m1-14-1-glance': {
    heading: 'Label Vietnam’s beer figures before you quote them',
    intro: 'The most repeated Vietnam beer numbers trace to one commercial report. Separate what it estimates for 2024 from what it projects for 2033.',
    spec: {
      layout: 'compare', title: 'Vietnam\'s Alcoholic Beverages Market at a Glance', kicker: '',
      leftTitle: 'Observed estimate, 2024', rightTitle: 'Vendor forecast, 2033',
      rows: [
        { label: 'Beer-market value', a: 'About US$7.89 billion', b: 'US$14.85 billion, a 7.27% CAGR' },
        { label: 'What kind of figure', a: 'A modelled figure for a period already passed', b: 'A projection built on assumptions' },
        { label: 'Main caveat', a: 'Commercial estimate, not official statistics', b: 'Published before the full 2027 to 2031 excise path; optimistic' },
        { label: 'Cross-check', a: 'Kirin’s 194.12 million kL puts Vietnam near 2% of world volume', b: 'No official baseline or consensus forecast' },
      ],
      note: 'Astute Analytica also estimates consumption above 3.8 million kL and ranks Vietnam roughly ninth globally, about 2.2% of world volume. No General Statistics Office series was verified.',
      takeaway: 'Say “commercial estimate for 2024” and “vendor forecast to 2033”, never official fact.',
    },
  },
  'beer-m1-14-2-consumption': {
    heading: 'A beer-heavy 8.3 litres with an unsplit remainder',
    intro: 'Pure alcohol adjusts for strength so beer, wine and spirits can be added up. See how much of Vietnam’s intake is beer and how little is known about the rest.',
    spec: {
      layout: 'driverTree', title: 'Beer, Wine, and Spirits Consumption in Vietnam', kicker: '',
      root: { label: 'Adult intake, Vietnam, 2024', detail: 'About 8.3 litres of pure alcohol (vendor estimate)' },
      formula: 'Pure alcohol = beer + wine + spirits + other drinks',
      drivers: [
        { label: 'Beer', detail: 'About 91%: mass social and at-home occasions', op: '+' },
        { label: 'Spirits', detail: 'Domestic rice-based rượu plus imported whisky and cognac; not sized', op: '+' },
        { label: 'Wine', detail: 'Small and import-reliant; not sized', op: '+' },
        { label: 'Other drinks', detail: 'Share the derived 9% remainder with wine and spirits', op: '+' },
      ],
      note: 'The 91% is a share of alcohol consumed, not of retail value. WHO’s 5.5 litres per adult worldwide (2019) uses a different source and year, so it is not a direct comparison.',
      takeaway: 'Beer drives factories and distribution, while a small imported-spirit category can still support premium brands.',
    },
  },
  'beer-m1-14-3-geography': {
    heading: 'Barley from abroad, beer brewed near each region',
    intro: 'Heavy beer is brewed close to the drinker, but its inputs travel far. Follow imported barley into malting, then see where each brewer’s strength sits.',
    spec: {
      layout: 'pathway', title: 'Domestic Production and Geographic Structure', kicker: '',
      trunk: [
        { label: 'Imported barley and hops', detail: 'Compact inputs, such as Australian barley, exposed to world prices and exchange rates', kind: 'stage' },
        { label: 'Malting at Cai Mep', detail: 'Intermalt’s US$70 million plant, 110,000 tonnes of capacity (reported 2020)', kind: 'stage' },
      ],
      optionsLabel: 'Brewed close to regional demand',
      options: [
        { label: 'North', detail: 'Habeco heritage position; produces more than 800 million litres' },
        { label: 'Centre', detail: 'Carlsberg/Huda strength' },
        { label: 'South and nationwide', detail: 'Heineken’s Vung Tau, about 1.1 billion litres a year; Sabeco, about 26 factories, more than 2.2 billion litres capacity' },
      ],
      note: 'Vendor estimates that mix capacity and output, so they are not like-for-like; no official province-level output or regional share was verified.',
      takeaway: 'Local brewing cuts logistics cost, but import dependence keeps brewers exposed to commodities, exchange rates and climate.',
    },
  },
  'beer-m1-14-4-players': {
    heading: 'Four brewers, four ownership models, one oligopoly',
    intro: 'Similar lager, very different owners. Compare how ownership, brands and route to market separate Vietnam’s four scale brewers.',
    spec: {
      layout: 'table', title: 'Key Market Participants and Industry Structure', kicker: '',
      headers: ['Brewer', 'Ownership', 'Brands and position'],
      rows: [
        { label: 'Sabeco', a: 'ThaiBev-controlled since buying 53.59% for US$4.78 billion, December 2017', b: 'Bia Saigon and 333; 26 factories; 200,000+ shops via 11 trading companies' },
        { label: 'Heineken Vietnam', a: 'Vietnam Brewery joint venture', b: 'Heineken and Tiger brands' },
        { label: 'Habeco', a: 'State-linked', b: 'Rooted in Bia Hà Nội' },
        { label: 'Carlsberg Vietnam', a: 'Foreign-controlled scale player', b: 'With Huda, described as strong in the central region' },
      ],
      note: 'Capacity and ownership show an oligopoly qualitatively; no current primary-verified market-share table exists, so none is shown.',
      takeaway: 'Ownership shapes capital and culture, distribution shapes availability and regional heritage shapes consumer pull.',
    },
  },
  'beer-m1-14-5-trade': {
    heading: 'What enters Vietnam, what is made there and what leaves',
    intro: 'Trade is more than finished bottles crossing a border. See how inputs, premium imports and beer exports connect around the local market.',
    spec: {
      layout: 'ecosystem', title: 'Vietnam\'s Alcoholic Beverage Trade', kicker: '',
      center: { label: 'Vietnam’s drinks market', detail: 'Import-dependent upstream, local brewing, an export edge' },
      actors: [
        { label: 'Barley and hops suppliers abroad', relation: 'Compact inputs shipped in because they cost less to move than beer', flows: ['product', 'money'] },
        { label: 'Intermalt and local breweries', relation: 'Malt imported barley and brew most beer locally', flows: ['product'] },
        { label: 'Wine and spirits origins', relation: 'Send finished, origin-linked premium products', flows: ['product', 'money'] },
        { label: 'Export markets', relation: 'Sabeco reports exports to about 30 countries; value and volume not stated', flows: ['product', 'money'] },
        { label: 'Customs classification', relation: 'HS 2203 beer, 2204 and 2205 wine and vermouth, 2206 other fermented, 2208 spirits', flows: ['oversight'] },
      ],
      note: 'Vietnam customs and UN Comtrade totals were not pulled in the research, so no trade balance is calculated.',
      takeaway: 'Brewers watch commodity prices and exchange rates; wine and spirits importers also watch tariffs and customs classification.',
    },
  },
  'beer-m1-15-1-economic': {
    heading: 'Why brewer profit can fall faster than beer sales',
    intro: 'Economic growth does not guarantee brewer profit. Trace how income, price, input costs and channel each push on the result.',
    spec: {
      layout: 'driverTree', title: 'Economic Drivers of Alcoholic Beverage Demand', kicker: '',
      root: { label: 'Brewer profit', detail: 'Plants, people and distribution are fixed costs, so profit can drop faster than revenue' },
      drivers: [
        { label: 'Disposable income', detail: 'Sets the number and quality of occasions; weak confidence cheapens them', op: '+' },
        { label: 'Shelf price', detail: 'Excise plus producer pricing; a higher price protects margin but can cut demand', op: '±' },
        { label: 'Imported input costs', detail: 'Barley, hops, aluminium and equipment bring commodity and currency exposure', op: '−' },
        { label: 'Channel mix', detail: 'Discretionary on-trade occasions weaken faster than at-home buying', op: '±' },
      ],
      note: 'First nine months of 2023 (trade press, different measures, not additive): Sabeco revenue down about 12% and profit 26%; Habeco revenue down 6.3% and profit 39%; Vietnam Brewery volume down 16.5%.',
      takeaway: 'Manage price, pack, channel and cost together; premiumisation helps only if drinkers still see value in the brand.',
    },
  },
  'beer-m1-15-2-regulation': {
    heading: 'Pass it on, absorb it or change the mix as the SCT steps up',
    intro: 'The tax schedule is known, but the consumer response is not. Test each response a brewer can make to a rising excise rate.',
    spec: {
      layout: 'decision', title: 'Regulation, Taxation, and Industry Compliance', kicker: '',
      root: { label: 'Beer SCT rises from a 65% baseline', detail: '70% in 2027, then five points a year to 90% in 2031 (Law No. 66/2025/QH15, as reported by AFP)' },
      question: 'How does the brewer handle each tax step?',
      branches: [
        { condition: 'Pass it through', outcome: 'Higher shelf price', detail: 'Volume risk; no price-elasticity estimate was available', tone: 'caution' },
        { condition: 'Absorb part of it', outcome: 'Lower margin', detail: 'Protects price position at a cost to profit', tone: 'caution' },
        { condition: 'Change mix or pack', outcome: 'Offset through what is sold', detail: 'Premium, pack-size or no/low alternatives', tone: 'positive' },
      ],
      note: 'Decree 100 drink-driving enforcement from January 2020 also moves occasions toward home; compliance must update pricing, labels, promotions and distributor guidance.',
      takeaway: 'A dated schedule makes regulatory risk partly planable, but volume and channel effects stay uncertain.',
    },
  },
  'beer-m1-15-3-social': {
    heading: 'Moderation shows up as less, better, no/low and at home',
    intro: '“Drinking less” is only one way behaviour shifts. See how one social trend splits into four responses that can grow at the same time.',
    spec: {
      layout: 'pathway', title: 'Social Attitudes and Changing Consumption Behavior', kicker: '',
      trunk: [
        { label: 'Health awareness and moderation', detail: 'WHO: per-adult intake fell from 5.7 to 5.5 litres of pure alcohol, 2010 to 2019', kind: 'stage' },
      ],
      optionsLabel: 'Responses that coexist, even in one person',
      options: [
        { label: 'Drink less', detail: 'Fewer occasions or smaller amounts' },
        { label: 'Drink better', detail: 'Fewer but more premium servings' },
        { label: 'Choose no/low', detail: 'Keep the ritual with little or no ethanol; Heineken 0.0 volume +10% globally in 2024 (company-reported)' },
        { label: 'Drink at home', detail: 'Driving risk moves social drinking away from quán nhậu; directional, not quantified' },
      ],
      afterLabel: 'What the portfolio must cover',
      after: [
        { label: 'Value, premium, no/low and at-home', detail: 'One broad moderation strategy misses the occasion', kind: 'outcome' },
      ],
      takeaway: 'Plan by occasion: premium and no/low can grow together because both answer a wish for more control.',
    },
  },
  'beer-m1-15-4-technology': {
    heading: 'Match each brewing innovation to the problem it solves',
    intro: 'Innovation creates value when it removes a constraint. Read each arena from the tool to the problem to the evidence.',
    spec: {
      layout: 'table', title: 'Technology and Production Innovation', kicker: '',
      headers: ['Arena', 'Constraint it answers', 'Evidence and limits'],
      rows: [
        { label: 'Plant: process control', a: 'Variation, waste, water and energy', b: 'Vietnam’s scale plants use modern quality systems; efficiency gains not verified' },
        { label: 'Product: alcohol removal', a: 'Moderation, without losing taste', b: 'Heineken 0.0 volume up 10% in 2024 against 1.6% total beer growth (company-reported)' },
        { label: 'Route to market: outlet data', a: 'Reach across fragmented outlets', b: 'Sabeco’s 200,000+ shops make a use case for digital execution' },
      ],
      note: 'The Heineken figures show faster growth, not that technology caused demand; Vietnam adoption rates were not quantified.',
      takeaway: 'Judge innovation by the constraint it removes and the measurable outcome it changes, not by novelty.',
    },
  },
  'beer-m1-15-5-environment': {
    heading: 'Environmental pressure along a drink’s life, crop to recovery',
    intro: 'Sustainability is a supply and operations question before it is a marketing claim. Follow the lifecycle and note where each pressure lands.',
    spec: {
      layout: 'flow', title: 'Environmental and Sustainability Pressures', kicker: '',
      steps: [
        { label: 'Crops', detail: 'Climate hits grapes and barley; wine output about 225.8 million hectolitres in 2024, a 60-year low (OIV)', kind: 'stage' },
        { label: 'Brewing', detail: 'Heating, cooling and cleaning large liquid volumes uses water and energy', kind: 'stage' },
        { label: 'Packaging', detail: 'Glass, aluminium and PET add material and transport weight', kind: 'stage' },
        { label: 'Logistics', detail: 'Heavy beer rewards local production; Vietnam still imports barley and hops', kind: 'stage' },
        { label: 'Recovery', detail: 'Spent grain, carbon-dioxide recovery and reusable packs, judged within a boundary', kind: 'outcome' },
      ],
      note: 'No verified Vietnam brewery water, energy, packaging-recycling or emissions series was available, so no savings are shown.',
      takeaway: 'A credible claim names a baseline year, a unit, an operating boundary and a source.',
    },
  },
};
