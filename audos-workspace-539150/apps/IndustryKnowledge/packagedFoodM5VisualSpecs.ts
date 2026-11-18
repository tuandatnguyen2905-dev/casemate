import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Packaged Food Module 05, keyed by visualKind. Held chapters have no spec. */
export const PACKAGED_FOOD_M5_VISUALS: Record<string, ChapterVisual> = {
  'packaged-food-m5-51-1': {
    heading: 'Indulgence stays, but each snack category reshapes it differently',
    intro: 'Shoppers still want treats while health awareness, convenience and value change the format. Look at how each category bends to that tension in its own way.',
    spec: {
      layout: 'taxonomy', title: 'How Packaged Food Consumers Are Changing', kicker: '',
      root: 'Indulgence meets health awareness', rootDetail: 'Treats remain; portions, ingredients and labels change',
      groups: [
        { label: 'Chocolate', detail: 'Leans toward premium indulgence' },
        { label: 'Candy and gum', detail: 'Faces sharper sugar pressure' },
        { label: 'Savoury snacks', detail: 'Responds through baked or lower-salt cues' },
        { label: 'Biscuits', detail: 'Bridges everyday comfort and fibre or grain propositions' },
      ],
      note: 'In Vietnam, a reported 2022 estimate of roughly 2 kg of confectionery per person versus about 3 kg globally suggests headroom; it is secondary industry data, not an official consumption series.',
      takeaway: 'Choose which tension a proposition resolves; there is no single average consumer to design for.',
    },
  },
  'packaged-food-m5-51-2': {
    heading: 'Why cutting sugar moves taste, texture, cost and claims at once',
    intro: 'A better-for-you product is built from several levers, each with its own constraint. Read what limits every lever before promising a healthier product.',
    spec: {
      layout: 'driverTree', title: 'Health, Wellness, and Better-for-You Products', kicker: '',
      root: { label: 'Credible better-for-you product', detail: 'Better nutritional or consumption profile with a valued eating experience' },
      formula: 'Proposition = reformulation + portion control + functional benefit + communication, validated together',
      drivers: [
        {
          label: 'Reformulation', detail: 'Change the recipe; taste acceptance limits how far to go at once', op: '+',
          children: [{ label: 'Taste and texture' }, { label: 'Shelf life and cost' }],
        },
        { label: 'Portion control', detail: 'Change intake through pack or serving design without rebuilding the recipe', op: '+' },
        { label: 'Functional benefit', detail: 'Needs scientific and legal support', op: '+' },
        { label: 'Communication', detail: 'Transparent ingredients and labels that never overstate benefits', op: '+' },
      ],
      note: 'Vendor chocolate forecasts link growth to healthier variants, but their scopes and methods differ, so their market sizes are not averaged.',
      takeaway: 'R&D, Regulatory, Brand and Operations must validate taste, claims, process and consumer understanding together.',
    },
  },
  'packaged-food-m5-51-3': {
    heading: 'Tet gift box versus everyday treat: two premium equations',
    intro: 'Premium is a reason to pay, not a gold wrapper. Compare what earns the higher price at a gifting peak with what earns it week after week.',
    spec: {
      layout: 'compare', title: 'Premiumization and Emerging Consumer Preferences', kicker: '',
      leftTitle: 'Premium gifting (Tet, Mid-Autumn)', rightTitle: 'Everyday premium',
      rows: [
        { label: 'Reason to pay', a: 'Packaging, presentation and social meaning', b: 'A category cue: origin, ingredients, texture, novelty or flavour' },
        { label: 'When demand comes', a: 'Concentrated peaks in the Tet and Mid-Autumn periods', b: 'Year-round, through repeat purchase' },
        { label: 'What execution needs', a: 'Availability and execution at the peaks', b: 'Price architecture to enter, trade up and choose an occasion' },
        { label: 'Main risk', a: 'Forecasting and markdown risk', b: 'Trial that never converts into repeat and margin' },
      ],
      note: 'Premium and better-for-you overlap but differ: a single-origin bar can be premium without a health claim.',
      takeaway: 'Premiumisation grows value through proposition and mix, not simply through a higher price.',
    },
  },
  'packaged-food-m5-52-1': {
    heading: 'Choose how much to change before building the prototype',
    intro: 'Every launch should start from a job such as recruiting, defending or trading up. See how that job leads to renovation, extension or a new platform, then through evidence gates to scale.',
    spec: {
      layout: 'pathway', title: 'Innovation in Packaged Food Products', kicker: '',
      trunk: [
        { label: 'Consumer and business job', detail: 'Recruit, defend, trade up, improve wellness or open an occasion', kind: 'stage' },
      ],
      optionsLabel: 'Degree of change',
      options: [
        { label: 'Renovation', detail: 'Improve an existing product or pack' },
        { label: 'Line extension', detail: 'Add a related flavour, format, size or tier' },
        { label: 'Innovation platform', detail: 'A repeatable new proposition or technical capability' },
      ],
      afterLabel: 'Stage gates before scale',
      after: [
        { label: 'Prototype', detail: 'Turn the insight into a testable product', kind: 'stage' },
        { label: 'Sensory and safety validation', detail: 'Check taste, texture and safety together', kind: 'decision' },
        { label: 'Plant trial', detail: 'Test line settings and cost at production scale', kind: 'decision' },
        { label: 'Launch and repeat measurement', detail: 'Scale only after technical and demand evidence', kind: 'outcome' },
      ],
      note: 'Packaging can be the innovation: barrier performance, portion format, convenience and recyclability can change economics with the recipe unchanged.',
      takeaway: 'Innovation is a learning sequence; SKUs without a clear role create changeovers, slow stock and cannibalisation.',
    },
  },
  'packaged-food-m5-52-2': {
    heading: 'From a production-line signal to a better operating decision',
    intro: 'A smart factory earns its keep only when data changes what teams do. Follow each signal to the action it triggers and the outcome measured against a baseline.',
    spec: {
      layout: 'flow', title: 'Technology Transforming Food Manufacturing', kicker: '',
      steps: [
        { label: 'Sensors observe', detail: 'Capture process, quality and equipment condition signals', kind: 'stage' },
        { label: 'Machine vision detects', detail: 'Cameras and software flag product or process variation', kind: 'stage' },
        { label: 'Analytics predicts', detail: 'Anticipates equipment failure and quality risk', kind: 'stage' },
        { label: 'Teams adjust', detail: 'Change maintenance, settings or control plans; people still decide hold or release', kind: 'decision' },
        { label: 'Measured outcome', detail: 'Yield, quality and uptime against a baseline, sustained over time', kind: 'outcome' },
      ],
      loop: 'Each result feeds the next round of sensing; poor sensor quality or uncontrolled models create false confidence instead.',
      note: 'The sources support a qualitative smart-factory direction in Vietnam, but no quantified yield improvement for Orion or Mondelez Kinh Do, so none is claimed.',
      takeaway: 'Value comes from changed decisions, not installation; calibration, traceability and accountability stay with people.',
    },
  },
  'packaged-food-m5-52-3': {
    heading: 'AI proposes the options; accountable teams prove and decide',
    intro: 'AI widens the search across research, the factory, planning and shopper discovery. Check what proof each function still owes before an output becomes a decision.',
    spec: {
      layout: 'ecosystem', title: 'Digitalization, AI, and Smart Operations', kicker: '',
      center: { label: 'Accountable human owner', detail: 'Governance: data quality, validation, access control and monitoring' },
      actors: [
        { label: 'Packaging materials research', relation: 'A Nestlé and IBM tool suggests high-barrier candidates; barrier, migration, safety and recyclability tests still follow', flows: ['information', 'risk'] },
        { label: 'Formulation', relation: 'Generates candidate solutions that still need technical proof', flows: ['information'] },
        { label: 'Quality and maintenance', relation: 'Detects variation and predicts equipment risk for teams to act on', flows: ['information', 'oversight'] },
        { label: 'Demand planning', relation: 'Forecasts are challenged by commercial and supply teams', flows: ['information'] },
        { label: 'Shopper discovery', relation: 'Recommendations and live content aid discovery; engagement is not category sales', flows: ['information', 'risk'] },
      ],
      note: 'The Nestlé–IBM work is a named R&D collaboration, not a proven rollout or quantified saving. The 88% figure covers Southeast Asian survey respondents, not Vietnam confectionery buyers.',
      takeaway: 'AI can shorten search but not skip proof: human-in-the-loop review turns outputs into trusted choices.',
    },
  },
  'packaged-food-m5-53-1': {
    heading: 'An exciting segment, or one this company can actually win?',
    intro: 'Research points to several growing themes but gives no Vietnam segment sizes. Test each condition below and note what each segment’s economics depend on.',
    spec: {
      layout: 'driverTree', title: 'Emerging Packaged Food Market Segments', kicker: '',
      root: { label: 'Segment opportunity worth scaling', detail: 'Requires demand, willingness to pay, route fit and a capability to win' },
      drivers: [
        { label: 'Demand', detail: 'Segment size and repeat rate, tested rather than assumed' },
        {
          label: 'Willingness to pay and margin', detail: 'Unit economics differ by segment',
          children: [
            { label: 'Premium chocolate', detail: 'Depends on cocoa and gifting' },
            { label: 'Functional snacks', detail: 'Require claim evidence' },
            { label: 'Sugar-free candy', detail: 'May need different ingredients and process' },
            { label: 'Single-serve packs', detail: 'Affect packaging cost per kilogram' },
          ],
        },
        { label: 'Route fit', detail: 'Premium urban demand, affordable single-serve formats, gifting and online discovery' },
        { label: 'Capability to win', detail: 'Strategic fit with company capabilities against competition' },
      ],
      note: 'The research lacks primary Vietnam forecasts for premium chocolate, better-for-you snacks and candy, so the comparison stays qualitative.',
      takeaway: 'Direction is not market size: test repeat, margin and ability to win before committing scale.',
    },
  },
  'packaged-food-m5-53-2': {
    heading: 'Vietnam’s newer channels add shopper missions without retiring general trade',
    intro: 'Each route carries assortment, stock, information and payment to a different shopper mission. Compare the roles before assigning packs, prices and promotions.',
    spec: {
      layout: 'table', title: 'How Retail and Distribution Channels Are Changing', kicker: '',
      headers: ['Channel', 'Shopper mission', 'What it adds'],
      rows: [
        { label: 'General trade', a: 'Mass reach through independent shops and traditional outlets', b: 'Outlet breadth: a volume and reach moat' },
        { label: 'Modern trade', a: 'Organised retail chains', b: 'Key-account scale and data' },
        { label: 'Convenience', a: 'Immediate missions', b: 'Changes assortment and negotiation' },
        { label: 'E-commerce and live commerce', a: 'Search, bundles and gifting', b: 'Faster discovery and data' },
      ],
      note: 'Vietnam e-commerce reached an estimated US$22 billion in 2024, up 18% year on year (e-Conomy SEA 2024 via VietnamPlus); that is total e-commerce, not confectionery sales.',
      takeaway: 'Channel evolution is additive; prices, packs or promotions that undermine one another are the risk to manage.',
    },
  },
  'packaged-food-m5-53-3': {
    heading: 'Distribution that learns: from discovery to replenishment',
    intro: 'Faster delivery is only half of the future route-to-market. Follow how each order produces data that improves the next decision, and where the loop breaks.',
    spec: {
      layout: 'flow', title: 'The Future of Packaged Food Distribution', kicker: '',
      steps: [
        { label: 'Discover', detail: 'Content, search and recommendations, including marketplaces and live commerce', kind: 'stage' },
        { label: 'Convert', detail: 'Stores and platforms turn interest into orders', kind: 'stage' },
        { label: 'Fulfil', detail: 'Warehouses, distributors and last mile pick, pack and deliver', kind: 'stage' },
        { label: 'Learn from sell-through', detail: 'Sales from trade inventory to shoppers improve demand planning', kind: 'outcome' },
      ],
      loop: 'Digital demand without inventory creates cancellations; inventory without visibility creates slow stock.',
      note: 'Live commerce suits shelf-stable, visually demonstrable gift packs; that fit is a mechanism, not a verified category-share statistic.',
      takeaway: 'Digital visibility and physical availability must run as one hybrid system.',
    },
  },
  'packaged-food-m5-55-1': {
    heading: 'Label every packaged food outlook figure before using it',
    intro: 'Company results, vendor estimates, forecasts and scenarios answer different questions. Sort each figure by type and keep its period, category and source attached.',
    spec: {
      layout: 'taxonomy', title: 'Where Is the Packaged Food Industry Heading?', kicker: '',
      root: 'Packaged food outlook evidence', rootDetail: 'Each figure carries its own category, geography, period and vendor scope',
      groups: [
        { label: 'Observed results', detail: 'Reported company results, distinct from market estimates' },
        {
          label: 'Global commercial forecasts',
          items: [
            'Packaged food: US$3,730 billion (2025) to US$5,080 billion by 2032, about 4.5% CAGR',
            'Chocolate: US$144.65 billion (2025) to US$205.39 billion by 2033, about 4.48% CAGR',
          ],
        },
        {
          label: 'Vietnam forecasts',
          items: [
            'Confectionery: VND66 trillion by 2025, about 7% a year (older industry forecast)',
            'Total e-commerce: near US$63 billion by 2030',
          ],
        },
        { label: 'Scenarios', detail: 'Base, upside and downside, built on drivers the company can observe and influence' },
      ],
      note: 'These come from different vendors and categories: do not average them or treat them as official statistics.',
      takeaway: 'The shared growth narrative is sturdier than any one number, while commodity and compliance costs set the downside.',
    },
  },
  'packaged-food-m5-55-2': {
    heading: 'Invest, pilot, partner or decline: matching growth to a right to win',
    intro: 'A fast-growing segment can still destroy value without the right brand, process or route. Follow the branch that matches the company’s fit.',
    spec: {
      layout: 'decision', title: 'Emerging Growth Segments and Opportunities', kicker: '',
      root: { label: 'Promising growth theme', detail: 'Premium chocolate, reduced-sugar or functional snacks, single-serve, seasonal gifting or e-commerce bundles' },
      question: 'Does the company have a credible right to win here?',
      branches: [
        { condition: 'Strong fit with brand, process and route', outcome: 'Invest', detail: 'For example, a strong biscuit brand extending into premium gifting', tone: 'positive' },
        { condition: 'Plausible fit, weak evidence', outcome: 'Run a pilot', detail: 'Set target, hypothesis, channel, margin, repeat and stop criteria', tone: 'caution' },
        { condition: 'Attractive theme, missing capability', outcome: 'Partner', detail: 'Preserve option value before full commitment', tone: 'caution' },
        { condition: 'Little fit', outcome: 'Decline', detail: 'Do not chase trend excitement the company cannot execute', tone: 'negative' },
      ],
      note: 'In Vietnam, young urban demand and digital channels support opportunity, while imported commodity exposure, affordability and strong local execution raise the capability bar.',
      takeaway: 'Opportunity equals market attractiveness multiplied by a credible right to win, and pilots earn the scale.',
    },
  },
  'packaged-food-m5-55-3': {
    heading: 'Every packaged food growth lever carries a cost elsewhere in the plan',
    intro: 'Growth, margin and trust choices interact. Read each choice with its upside and the trade-off it creates, then decide what the scorecard must track.',
    spec: {
      layout: 'table', title: 'Strategic Opportunities and Risks for Businesses', kicker: '',
      headers: ['Strategic choice', 'Upside', 'Trade-off to manage'],
      rows: [
        { label: 'Premiumisation', a: 'Grows mix and can offset cost', b: 'Can narrow volume' },
        { label: 'Smaller packs', a: 'Protect affordability', b: 'Raise packaging cost per kilogram' },
        { label: 'Sustainable materials', a: 'Can improve compliance', b: 'Require line and barrier validation' },
        { label: 'Volume ambition', a: 'Growth in sales', b: 'Can hide deteriorating quality or economics without a balanced scorecard' },
      ],
      note: 'Cocoa as a scenario variable: ICCO projected 2023/24 world cocoa production at 4,461 thousand tonnes, down 11.7% year on year, with a 439-thousand-tonne deficit; a crop-year signal, not a permanent forecast.',
      takeaway: 'Track the assumptions behind each choice and reallocate as sell-through, repeat, cost or regulation changes.',
    },
  },
};
