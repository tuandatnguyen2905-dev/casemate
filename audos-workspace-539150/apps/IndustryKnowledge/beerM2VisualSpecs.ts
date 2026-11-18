import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Beer & Alcoholic Drinks Module 02, keyed by visualKind. */
export const BEER_M2_VISUALS: Record<string, ChapterVisual> = {
  'beer-m2-21-1-category-chain': {
    heading: 'One shared chain that splits at the conversion step',
    intro: 'Beer, wine and spirits all start with sourcing and end with selling. Watch where the paths separate, because that step decides where capital and risk sit.',
    spec: {
      layout: 'pathway', title: 'From Raw Ingredients to Alcoholic Beverages', kicker: '',
      trunk: [
        { label: 'Upstream sourcing', detail: 'Agricultural materials, packaging, utilities, equipment and the suppliers behind them', kind: 'stage' },
      ],
      optionsLabel: 'Midstream conversion by category',
      options: [
        { label: 'Beer: brew and ferment', detail: 'Water, malted barley, hops and yeast; mashing, boiling, fermentation and conditioning' },
        { label: 'Wine: crush and ferment', detail: 'Grapes are crushed, fermented and may be aged; tied to one harvest and origin' },
        { label: 'Spirits: ferment, distil, mature', detail: 'Distillation concentrates alcohol, often followed by years of maturation in oak' },
      ],
      afterLabel: 'Downstream',
      after: [
        { label: 'Distribution and final sale', detail: 'Channels, marketing and a selling occasion turn the drink into consumer value', kind: 'outcome' },
      ],
      note: 'Value density explains trade: Scotch and cognac ship worldwide from a defined origin, while beer, mostly water, is usually brewed near consumers. No stage-level value shares are shown because the research does not quantify them.',
      takeaway: 'A brewer optimises throughput and dense local routes, a winery depends on harvest and origin, and a distiller finances maturing stock.',
    },
  },
  'beer-m2-21-2-value-creators': {
    heading: 'Creating value is not the same as keeping it',
    intro: 'Each participant solves a different problem for the next one. Compare what each contributes with how easily it can be replaced, which shapes its share of the return.',
    spec: {
      layout: 'table', title: 'Who Creates Value Along the Chain?', kicker: '',
      headers: ['Participant', 'Value it creates', 'Hold on the return'],
      rows: [
        { label: 'Farmers', a: 'Grow the base crop', b: 'Essential, but commodity crops usually face more price competition' },
        { label: 'Maltsters and ingredient suppliers', a: 'Standardise the crop; malt supplies enzymes and fermentable material', b: 'Depends on how substitutable the specified input is' },
        { label: 'Packaging suppliers', a: 'Protect and present the drink', b: 'Essential but more substitutable inputs' },
        { label: 'Producers', a: 'Convert recipes into consistent units and build brand meaning', b: 'Brand equity, proprietary yeast or aged stock can command more of the profit pool' },
        { label: 'Distributors and outlets', a: 'Hold stock, extend credit, break bulk and create occasions', b: 'Route density helps, but an asset-heavy distributor may retain a modest return' },
      ],
      note: 'Sabeco’s reported reach of more than 200,000 shops through 11 trading companies (Voice of Vietnam, 2024) shows distribution reach, not a margin. No verified per-stage margin benchmark exists for Vietnam beer.',
      takeaway: 'Revenue is not economic power: scarce, protected or hard-to-replace capabilities capture the larger share of the return.',
    },
  },
  'beer-m2-21-3-three-flows': {
    heading: 'Goods go forward, cash comes back and the State takes a share',
    intro: 'Each participant exchanges more than product with the producer. Read the flow tags to see where orders, payments and excise reporting pass through.',
    spec: {
      layout: 'ecosystem', title: 'How Products, Information, and Money Flow', kicker: '',
      center: { label: 'Producer', detail: 'Turns demand signals into batches, then settles payments and tax liability' },
      actors: [
        { label: 'Suppliers', relation: 'Deliver inputs and are paid back under payment terms', flows: ['product', 'money'] },
        { label: 'Distributor', relation: 'Replenished by the producer; orders, stock data and payment move back', flows: ['product', 'information', 'money'] },
        { label: 'Outlet', relation: 'Orders from the distributor; sell-out data shows what moved', flows: ['product', 'information', 'money'] },
        { label: 'Consumer', relation: 'Pays a price with excise inside it; promotions shape the demand forecast', flows: ['money', 'information'] },
        { label: 'The State', relation: 'Collects excise and receives tax reporting through the formal chain', flows: ['money', 'oversight'] },
      ],
      note: 'Vietnam’s beer Special Consumption Tax is a reported 65% in the research period, scheduled to rise toward 90% by 2031 after the June 2025 National Assembly vote (AFP). No consumer-price increase is inferred.',
      takeaway: 'When product, cash and information fall out of sync, shelves can be empty while a warehouse is full.',
    },
  },
  'beer-m2-22-1-ingredients': {
    heading: 'Water, grain, grapes and cane: three different sourcing baskets',
    intro: 'Beer, wine and spirits do not draw on one commodity basket. Sort the inputs by category, then note which ones Vietnam grows and which it imports.',
    spec: {
      layout: 'taxonomy', title: 'Where Alcoholic Beverage Ingredients Come From', kicker: '',
      root: 'Alcoholic beverage inputs', rootDetail: 'Origin, crop quality and biology set flavour, yield and continuity',
      groups: [
        { label: 'Beer', detail: 'Local water combined with traded malt and hops', items: ['Treated water', 'Malted barley', 'Hops', 'Yeast', 'Rice, maize or sugar adjuncts'] },
        { label: 'Wine', detail: 'Vineyard- and climate-bound', items: ['Grapes carrying sugar and place-specific character'] },
        { label: 'Spirits', detail: 'The crop base differs by category', items: ['Grains', 'Grapes', 'Molasses or sugarcane', 'Agave', 'Rice'] },
        { label: 'Vietnam sourcing', detail: 'Essentially no malting barley or hops grown', items: ['Barley and hops enter through imports', 'Local rice as beer adjunct and rượu base'] },
      ],
      note: '99% of US hops come from the Pacific Northwest (Choices Magazine, 2025; US only, not a global share). Global wine production was 227m hL in 2025, an OIV figure reported by trade press, near a roughly 60-year low.',
      takeaway: 'Hops are only about 3.5% of a US brewer’s expenses yet define bitterness and aroma, so rank inputs by impact, not spend.',
    },
  },
  'beer-m2-22-2-supplier-ecosystem': {
    heading: 'Everything that must reach the brewery before a can is filled',
    intro: 'Malt and hops are only part of the kit. Look at the suppliers whose crowns, gases, spares or power can stop a line as surely as a missing ingredient.',
    spec: {
      layout: 'ecosystem', title: 'Suppliers, Packaging, and Production Inputs', kicker: '',
      center: { label: 'Brewery plant', detail: 'Procurement, Engineering, Quality and Planning synchronise every delivery to the schedule' },
      actors: [
        { label: 'Maltster', relation: 'Intermalt in Cai Mep malts imported Australian barley for Heineken Vietnam, Carlsberg and local brewers', flows: ['product'] },
        { label: 'Ingredient suppliers', relation: 'Hops, yeast and adjuncts delivered to the specifications brand and operations set', flows: ['product'] },
        { label: 'Packaging suppliers', relation: 'Glass bottles, aluminium cans, PET, kegs, closures, labels and cartons', flows: ['product', 'money'] },
        { label: 'Utilities', relation: 'Water treatment, energy and gases', flows: ['service'] },
        { label: 'Equipment makers', relation: 'Brewhouse, fermentation and filling equipment, plus spares and technical response', flows: ['product', 'service'] },
        { label: 'Laboratories and logistics', relation: 'Test incoming materials and deliver them in line with the production plan', flows: ['service', 'information'] },
      ],
      note: 'Intermalt’s reported 2020 capacity is 110,000 t/yr from a US$70m project investment, not an annual operating cost. Judge suppliers on landed and total system cost, not the quoted unit price.',
      takeaway: 'A pack redesign changes material cost, freight weight, line tooling and shelf presentation together, so functions must plan it jointly.',
    },
  },
  'beer-m2-22-3-risk-map': {
    heading: 'Why a cheap input can still be the riskiest one',
    intro: 'Input risk is not ranked by spend. Follow how price movement and interruption combine with operational impact, and which response matches each exposure.',
    spec: {
      layout: 'driverTree', title: 'Understanding Input Costs and Supply Risks', kicker: '',
      root: { label: 'Input risk', detail: 'Price movement and interruption probability, multiplied by operational impact' },
      formula: 'Input risk = (price movement + interruption probability) × operational impact',
      drivers: [
        { label: 'Price movement', detail: 'Managed with contracts and hedging', op: '+', children: [
          { label: 'Barley and aluminium prices' },
          { label: 'Energy-driven glass cost' },
          { label: 'FX and freight on imports' },
        ] },
        { label: 'Interruption probability', detail: 'Managed with dual sourcing and safety stock', op: '+', children: [
          { label: 'Climate effects on crops and water' },
          { label: 'Few qualified origins, as with hops' },
          { label: 'Long replenishment lead times' },
        ] },
        { label: 'Operational impact', detail: 'Reduced by recipe or pack flexibility', op: '×', children: [
          { label: 'Substitutability of the input' },
          { label: 'Effect on the plant' },
          { label: 'Revenue stopped if supply fails' },
        ] },
      ],
      note: 'Vietnam imports its barley and hops, so even domestic brewers face world prices, FX, freight and border lead times. Intermalt is local processing of imported barley, not agricultural self-sufficiency; import volumes were not verified.',
      takeaway: 'A small buffer suits a common carton but is dangerous for a long-lead proprietary crown: match the control to the exposure.',
    },
  },
  'beer-m2-23-1-production-tracks': {
    heading: 'Fermentation is shared; distillation and time are not',
    intro: 'All three drinks rely on yeast, but they leave the plant differently. Compare each track’s steps with the cash and planning consequence it creates.',
    spec: {
      layout: 'table', title: 'How Beer, Wine, and Spirits Are Produced', kicker: '',
      headers: ['Track', 'Production steps', 'What it means for the business'],
      rows: [
        { label: 'Beer', a: 'Mashing, wort boiling with hops, fermentation, conditioning, filtration, packaging', b: 'Fast inventory turn; tanks can bottleneck a fast packaging line' },
        { label: 'Wine', a: 'Crushing, pressing, fermentation and optional ageing', b: 'Harvest seasonality and vintage variation' },
        { label: 'Spirits', a: 'Ferment a crop-derived wash, distil, often mature in oak, blend and bottle', b: 'Still capacity and a maturation warehouse whose output cannot be accelerated later' },
        { label: 'Vietnamese rượu', a: 'Local rice fermented and distilled rather than brewed as lager', b: 'A local crop following the spirits path' },
      ],
      note: 'Scotch whisky must mature for at least three years and cognac X.O. for at least ten, per a secondary source; primary legal text was not checked, so treat these as illustrative.',
      takeaway: 'For spirits, today’s production decision becomes saleable stock years ahead: too little constrains revenue and too much ties up cash.',
    },
  },
  'beer-m2-23-2-quality-packaging': {
    heading: 'Quality gates from water intake to batch release',
    intro: 'Quality is built in stage by stage, not inspected in at the end. Follow the gates a batch must pass and how batch codes keep a deviation contained.',
    spec: {
      layout: 'flow', title: 'Maturation, Quality Control, and Packaging', kicker: '',
      steps: [
        { label: 'Incoming materials', detail: 'Water, ingredients and packaging tested against specification', kind: 'stage' },
        { label: 'Process control', detail: 'Time, temperature, hygiene and fermentation held within limits', kind: 'stage' },
        { label: 'Maturation checks', detail: 'Condition and specification monitored where the drink is aged', kind: 'stage' },
        { label: 'Packaging inspection', detail: 'Fill, closure integrity, labels and batch codes checked', kind: 'stage' },
        { label: 'Release', detail: 'Only compliant batches are approved to enter distribution', kind: 'outcome' },
      ],
      loop: 'Batch codes link finished units to their materials and process records, so a deviation can be traced and contained.',
      note: 'Vietnam plants combine ISO 22000 and HACCP systems with applicable QCVN technical requirements. No plant-level defect or recall metrics were available in the research.',
      takeaway: 'Early detection keeps a small drift from becoming a large write-off or recall.',
    },
  },
  'beer-m2-23-3-efficiency': {
    heading: 'What actually lowers the cost of each litre',
    intro: 'A bigger plant is not automatically cheaper. Trace how each physical lever reaches unit cost, and notice where pushing one metric damages another.',
    spec: {
      layout: 'driverTree', title: 'Production Efficiency and Manufacturing Economics', kicker: '',
      root: { label: 'Unit cost and service', detail: 'Fixed plant cost spread over saleable volume, plus variable losses' },
      drivers: [
        { label: 'Capacity utilisation', detail: 'Spreads plant and equipment cost across units produced', children: [
          { label: 'Less downtime', detail: 'More saleable volume' },
          { label: 'Preventive maintenance', detail: 'Fewer unplanned interruptions' },
        ] },
        { label: 'Yield', detail: 'Better yield reduces input cost per unit' },
        { label: 'Changeovers and SKU variety', detail: 'Fewer changeovers release hours; more SKUs consume cleaning, setup and packaging material' },
        { label: 'Energy, water and maintenance', detail: 'Variable conversion costs that scale does not remove' },
        { label: 'Finished-goods inventory', detail: 'Running slow SKUs to keep a line busy creates stock and discounting' },
      ],
      note: 'Scale indicators: Heineken’s Vung Tau brewery at about 1.1 billion litres a year (vendor-reported) and Sabeco’s more than 2.2 billion litres across 26 factories. Heineken’s >€0.6bn of 2024 gross savings is company-wide.',
      takeaway: 'The right schedule minimises total system cost while meeting demand, rather than keeping every line as busy as possible.',
    },
  },
  'beer-m2-24-1-route-market': {
    heading: 'From a brewery pallet to a cold bottle in a neighbourhood shop',
    intro: 'Distribution works in layers, and each layer does work the producer would otherwise fund. Follow where bulk movement becomes frequent outlet service.',
    spec: {
      layout: 'pathway', title: 'How Alcoholic Beverages Reach Consumers', kicker: '',
      trunk: [
        { label: 'Plant', detail: 'Finished cases, cans and kegs leave in bulk', kind: 'stage' },
        { label: 'Primary distribution', detail: 'Bulk movement to a depot or distributor', kind: 'stage' },
        { label: 'Distributor or depot', detail: 'Holds regional stock, breaks bulk, manages outlet credit and collects payment', kind: 'stage' },
      ],
      optionsLabel: 'How the final layer is served',
      options: [
        { label: 'Secondary distribution', detail: 'Routes serve trade outlets in smaller quantities' },
        { label: 'Wholesalers', detail: 'Add reach where outlet density or geography makes direct service uneconomic' },
        { label: 'Last mile', detail: 'Completes the consumer order, especially through digital channels' },
      ],
      afterLabel: 'Result',
      after: [
        { label: 'Cold availability at the outlet', detail: 'A bar, a neighborhood shop or a delivered online order', kind: 'outcome' },
      ],
      note: 'Sabeco reportedly serves more than 200,000 shops through 11 national and regional trading companies and exports to 30 countries (Voice of Vietnam; company reach, not a national statistic). No per-channel margins were verified.',
      takeaway: 'Removing an intermediary removes its services too, so compare total cost to serve, not one layer’s margin.',
    },
  },
  'beer-m2-24-2-on-off-trade': {
    heading: 'A bar sale and a shop sale are two different businesses',
    intro: 'The same bottle earns its place differently in each channel. Compare the occasion, the execution and the commercial role row by row.',
    spec: {
      layout: 'compare', title: 'Understanding On-Trade and Off-Trade Channels', kicker: '',
      leftTitle: 'On-trade', rightTitle: 'Off-trade',
      rows: [
        { label: 'Where', a: 'Bars, restaurants, hotels, beer clubs and quán nhậu', b: 'Traditional shops, supermarkets, convenience stores and online channels' },
        { label: 'Occasion', a: 'Bought and consumed on the premises', b: 'Bought for consumption elsewhere' },
        { label: 'Execution', a: 'Cold serve, draught systems, menus, staff advocacy and activation', b: 'Assortment, shelf, chilled availability, promotions and replenishment' },
        { label: 'Commercial role', a: 'Creates occasions and brand experience', b: 'Take-home volume, comparison and pack-price choice' },
        { label: 'Vietnam pressure', a: 'Drink-driving enforcement has pushed some occasions away', b: 'Mom-and-pop stores stay central as some drinking moves home' },
      ],
      note: 'A reported 52.7% offline share for Vietnam beer is a commercial vendor estimate of offline versus online, so it is not the off-trade share. No current primary on-/off-trade split was verified.',
      takeaway: 'Channel mix changes pack demand, margin structure and logistics; an on-premise activation cannot substitute for retail stock.',
    },
  },
  'beer-m2-24-3-constraints': {
    heading: 'Four ways to respond as beer excise climbs toward 90%',
    intro: 'A known multi-year tax path forces a price and mix choice. Compare the producer’s options, remembering that each one shifts demand or margin.',
    spec: {
      layout: 'decision', title: 'Marketing, Distribution, and Regulatory Constraints', kicker: '',
      root: { label: 'Scheduled beer SCT rise', detail: '65% in the research period, rising in steps toward 90% by 2031' },
      question: 'How does the producer absorb the higher tax in its price architecture?',
      branches: [
        { condition: 'Pass through', outcome: 'Consumer price rises', detail: 'Demand may fall; no actual pass-through rate was verified', tone: 'caution' },
        { condition: 'Absorb', outcome: 'Margin narrows', detail: 'The shelf price is defended at the cost of profit', tone: 'negative' },
        { condition: 'Premiumise', outcome: 'Mix shifts to higher-value offers', detail: 'Works only if brand preference supports the higher price', tone: 'positive' },
        { condition: 'Redesign packs', outcome: 'Pack architecture changes', detail: 'Pack mix and no/low products respond to tax and shifting occasions', tone: 'caution' },
      ],
      note: 'Drink-driving enforcement also changes the cost of on-trade occasions and can move consumption toward take-home. Marketing, availability and compliance must be designed together inside these rules.',
      takeaway: 'Separate the statutory rate from actual consumer-price pass-through before judging any response.',
    },
  },
  'beer-m2-25-1-input-output': {
    heading: 'What each stage takes in and hands on, waste included',
    intro: 'Every stage transforms several kinds of input. Read the outputs column closely: records, by-products, waste and data count as outputs too.',
    spec: {
      layout: 'table', title: 'Understanding Inputs and Outputs Across the Chain', kicker: '',
      headers: ['Stage', 'Inputs', 'Outputs'],
      rows: [
        { label: 'Upstream', a: 'Crops, water, packaging materials and equipment', b: 'Qualified ingredients and packs' },
        { label: 'Midstream', a: 'Material, labour, energy and capital', b: 'Finished SKUs, quality records, spent grain, recovered carbon dioxide and wastewater' },
        { label: 'Downstream', a: 'Inventory, brand plans and cash needs', b: 'Availability, transactions and market information' },
        { label: 'A local brewery', a: 'Imported malt and hops, water, energy, packaging and labour', b: 'Cases on domestic routes; tax, sales and inventory data returned' },
      ],
      note: 'Spent grain can become animal feed and recovered carbon dioxide can return to productive use, but wastewater must be treated. Recovery rates for Vietnamese plants were not quantified.',
      takeaway: 'An output is useful only if it meets the next stage’s specification; faster filling adds nothing if defects or unsold stock rise.',
    },
  },
  'beer-m2-25-2-cost-profit': {
    heading: 'Cost layers, the excise layer and the levers that defend profit',
    intro: 'Cost, tax and profit sit in different layers of the shelf price. Keep excise out of factory cost, then see which levers protect margin.',
    spec: {
      layout: 'taxonomy', title: 'Where Costs and Profits Are Generated', kicker: '',
      root: 'Beer price architecture', rootDetail: 'No verified itemised cost split exists, so no percentages are assigned',
      groups: [
        { label: 'Materials', items: ['Malt: the largest ingredient cost', 'Hops: small but distinctive'] },
        { label: 'Packaging', detail: 'A major cost block that can exceed the liquid' },
        { label: 'Conversion and route to market', items: ['Plant energy and labour', 'Depreciation', 'Warehousing and distribution', 'Selling and administrative costs'] },
        { label: 'Excise', detail: 'A tax in the price architecture, not a manufacturing input' },
        { label: 'Profit levers', items: ['Price and premium mix', 'Procurement and productivity', 'Brand and reach'] },
      ],
      note: 'Heineken reported a 15.1% operating-profit beia margin in 2024; Sabeco reported about VND4.3 trillion after-tax profit on VND30.5 trillion of 2023 revenue, roughly 14% net. Different companies and metrics, so not a ranking.',
      takeaway: 'Calling a tax rise factory inflation hides the real lever: separate cost reduction, price, mix and tax.',
    },
  },
  'beer-m2-25-3-advantage': {
    heading: 'The reinforcing loop that makes a brewer hard to copy',
    intro: 'Two brewers can buy similar malt and cans. Follow how preference, volume, density and cash reinforce each other, and where the loop can break.',
    spec: {
      layout: 'flow', title: 'How Alcoholic Beverage Companies Create Competitive Value', kicker: '',
      steps: [
        { label: 'Brand preference', detail: 'Consumers ask for the brand, supporting volume and mix', kind: 'stage' },
        { label: 'Volume', detail: 'Supports plant and route density', kind: 'stage' },
        { label: 'Density and scale', detail: 'Lower unit cost and better availability', kind: 'stage' },
        { label: 'Cash generation', detail: 'Funds innovation, assets and marketing', kind: 'outcome' },
      ],
      loop: 'Reinvestment strengthens brand and network so the cycle repeats; too many SKUs, promotions or excess reach can reverse it.',
      note: 'Sabeco’s 26-factory footprint and 200,000+ shop reach illustrate scale and access; for spirits, aged inventory is a moat that takes years to build. This is a causal framework, not a measured model.',
      takeaway: 'A product feature can be copied, a coordinated system cannot quickly; find the weakest link before investing.',
    },
  },
  'beer-m2-26-1-global-chain': {
    heading: 'What multinationals centralise and what stays in each market',
    intro: 'Global does not mean every bottle crosses an ocean. Compare which capabilities gain from scale or IP control and which gain from closeness to the market.',
    spec: {
      layout: 'compare', title: 'How Global Alcoholic Beverage Supply Chains Operate', kicker: '',
      leftTitle: 'Centralised across markets', rightTitle: 'Localised near demand',
      rows: [
        { label: 'Brand and portfolio', a: 'Brand standards and portfolio choices', b: 'Prices, occasions and channel plans' },
        { label: 'Procurement', a: 'Globally traded barley, hops, aluminium and equipment', b: 'Packaging and delivery' },
        { label: 'Recipes and quality', a: 'Recipe IP and common quality systems', b: 'Applied inside each in-market brewery' },
        { label: 'Production', a: 'Scotch and cognac made and matured at origin', b: 'Beer brewed in-market by Heineken, Carlsberg and AB InBev' },
        { label: 'Route to market', a: 'Governed through specifications, audits and data', b: 'Channels, licences and local routes' },
      ],
      note: 'Ownership is one coordination mechanism, not the only one. The research gives no verified percentage of centralised versus local activity.',
      takeaway: 'Centralisation buys scale and consistency; localisation cuts freight and improves fit but adds local assets and execution complexity.',
    },
  },
  'beer-m2-26-2-vietnam-chain': {
    heading: 'Brewed locally at scale, rooted in imported barley',
    intro: 'Vietnam’s beer is made and sold at home, yet its first link sits on overseas farms. Follow the chain from import to outlet and note where global exposure enters.',
    spec: {
      layout: 'flow', title: 'Vietnam\'s Alcoholic Beverage Value Chain', kicker: '',
      steps: [
        { label: 'Imported barley and hops', detail: 'Malting barley, hops and selected materials arrive from abroad', kind: 'stage' },
        { label: 'Local malting', detail: 'Intermalt at Cai Mep turns imported Australian barley into malt (110,000 t/yr)', kind: 'stage' },
        { label: 'Brewing and packaging', detail: 'Local water and packaging; Vung Tau at about 1.1 billion litres a year', kind: 'stage' },
        { label: 'Trade networks', detail: 'National and regional distributors; Sabeco reaches 200,000+ shops', kind: 'stage' },
        { label: 'On- and off-trade outlets', detail: 'Local revenue earned on a partly global cost base', kind: 'outcome' },
      ],
      note: 'Sabeco reports 26 factories with more than 2.2 billion litres of capacity. Location, ownership and brand origin differ: foreign-controlled scale operators sit alongside state-linked Habeco.',
      takeaway: 'Revenue is local, but parts of the cost base move with commodities, exchange rates and freight.',
    },
  },
  'beer-m2-26-3-global-vietnam': {
    heading: 'Deciding activity by activity what to localise',
    intro: 'Localisation is not all-or-nothing. Start from one activity and let its economics decide whether it moves near demand, stays at origin or keeps a protected import link.',
    spec: {
      layout: 'decision', title: 'Localization, Imports, Exports, and Dependencies', kicker: '',
      root: { label: 'One value-chain activity', detail: 'Crop growing, processing, brewing, packaging or distribution' },
      question: 'What drives this activity’s economics?',
      branches: [
        { condition: 'Heavy, water-based product', outcome: 'Brew locally', detail: 'Shipping water is costly, so local beer brewing usually wins', tone: 'positive' },
        { condition: 'Origin is part of the product', outcome: 'Keep at origin and import', detail: 'Scotch, cognac and wine; world wine exports reached €33.8bn in 2025', tone: 'caution' },
        { condition: 'Crop not efficiently grown locally', outcome: 'Onshore the processing step', detail: 'Intermalt malts imported barley locally while agriculture stays global', tone: 'positive' },
        { condition: 'Specification or scale only abroad', outcome: 'Import with protection', detail: 'Diversify origins, hold buffers or use contracts against FX, tariff and continuity risk', tone: 'caution' },
      ],
      note: 'Sabeco reportedly exports to 30 countries, while Vietnam imports malting barley, hops, wine and premium spirits. Trade volumes and values were not verified, so only the direction of dependency is shown.',
      takeaway: 'Resilience comes from a deliberate mix of local capability and diversified global links, chosen one activity at a time.',
    },
  },
};
