import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Packaged Food & Confectionery Module 04, keyed by visualKind. */
export const PACKAGED_FOOD_M4_VISUALS: Record<string, ChapterVisual> = {
  'packaged-food-m4-41-1': {
    heading: 'Where confectionery categories concentrate and where they fragment',
    intro: 'Packaged food is not one market. Read across each category to see how concentrated it is and what rivals actually compete on.',
    spec: {
      layout: 'table', title: 'Understanding Competition in Packaged Food & Confectionery', kicker: '',
      headers: ['Category', 'Structure at the top', 'Main basis of competition'],
      rows: [
        { label: 'Chocolate', a: 'More concentrated at the top', b: 'Brand heritage and cocoa-procurement scale' },
        { label: 'Biscuits', a: 'More local fragmentation retained', b: 'Local formats, tastes and price' },
        { label: 'Sugar confectionery', a: 'More local fragmentation retained', b: 'Local taste, value packs and seasonal relevance' },
        { label: 'Savoury snacks', a: 'Between global scale and local freshness', b: 'Scale combined with freshness and route execution' },
      ],
      note: 'The 2018 ICCO/Candy Industry ranking describes the global top tier qualitatively; no current CR5, CR10 or HHI was verified. In Vietnam, Orion and Mondelez Kinh Do lead, Bibica and Hai Ha challenge, and a long tail stays fragmented.',
      takeaway: 'Define the category boundary first: brand and procurement decide chocolate, while local taste and price keep candy and biscuits fragmented.',
    },
  },
  'packaged-food-m4-41-2': {
    heading: 'Cocoa, retailers and substitutes squeeze margin from outside the rivalry',
    intro: 'A strong brand can still lose margin. See which pressure enters from each side of the industry and the mechanism it works through.',
    spec: {
      layout: 'ecosystem', title: 'The Five Forces Shaping Industry Competition', kicker: '',
      center: { label: 'Packaged-food industry profit', detail: 'Shaped by pressure around the firm, not only by direct competitors' },
      actors: [
        { label: 'Established rivals', relation: 'Their pricing and hedging choices decide how much of an input shock can be passed through', flows: ['money'] },
        { label: 'Potential entrants', relation: 'Entry adds capacity to the category', flows: ['product'] },
        { label: 'Substitutes', relation: 'Fresh, better-for-you and private-label alternatives redirect occasions', flows: ['product'] },
        { label: 'Ingredient suppliers', relation: 'Commodity scarcity raises input cost, as record cocoa inflation did in 2024', flows: ['money', 'risk'] },
        { label: 'Trade buyers', relation: 'Retailer consolidation, modern trade and digital channels raise transparency and bargaining power', flows: ['money', 'information'] },
      ],
      note: 'Apply the forces category by category: cocoa supplier power matters most for chocolate, sugar scrutiny weighs more on candy. Vietnam’s traditional-trade base still preserves manufacturer influence in many outlets.',
      takeaway: 'Link each force to its mechanism, financial effect and feasible response, because the dominant force differs by category.',
    },
  },
  'packaged-food-m4-41-3': {
    heading: 'Building a confectionery line is quick; national trust and reach are not',
    intro: 'Follow a newcomer from local launch to national ambition, then compare the three routes that trade speed for control, cost or risk.',
    spec: {
      layout: 'pathway', title: 'Entry Barriers and Competitive Advantages', kicker: '',
      trunk: [
        { label: 'Small-scale launch', detail: 'A craft confectioner can launch locally; buying a production line may take months', kind: 'stage' },
        { label: 'National mass-market ambition', detail: 'Needs working capital, consistent quality, marketing and route coverage while incumbents earn scale benefits', kind: 'decision' },
      ],
      optionsLabel: 'Entry routes to national scale',
      options: [
        { label: 'Choose a niche', detail: 'Compete in a narrower space with limited reach' },
        { label: 'Partner for reach', detail: 'Use distributor and retailer relationships someone else has built' },
        { label: 'Acquire a platform', detail: 'Mondelez bought 80% of Kinh Do’s confectionery operation in 2014' },
      ],
      afterLabel: 'Hardest advantage to copy',
      after: [
        { label: 'Brand trust and distribution moat', detail: 'Repeated quality and deep outlet relationships take far longer than a factory line', kind: 'outcome' },
      ],
      note: 'The reported VND7,846 billion consideration for 80% of Kinh Do Binh Duong’s confectionery business is a 2014 company transaction, not a current valuation multiple.',
      takeaway: 'At national FMCG scale, brand trust and distribution breadth are harder to copy than a recipe or a factory line.',
    },
  },
  'packaged-food-m4-42-1': {
    heading: 'Four confectionery leaders, four incompatible yardsticks',
    intro: 'Read ownership and portfolio first, then check what each headline figure actually measures before treating it as scale.',
    spec: {
      layout: 'table', title: 'Major Global Packaged Food Companies', kicker: '',
      headers: ['Company', 'Ownership and portfolio', 'Supported figure and what it measures'],
      rows: [
        { label: 'Mars', a: 'Private; chocolate and Wrigley gum scale', b: 'Ranked first by 2018 net confectionery sales in the ICCO table; no later figure asserted' },
        { label: 'Ferrero', a: 'Private; premium brands such as Kinder and Ferrero Rocher', b: 'EUR19.3 billion FY2024/25 consolidated revenue' },
        { label: 'Mondelez', a: 'Listed; biscuits and chocolate through Oreo, Cadbury, Milka and Toblerone', b: '4.3% FY2024 organic growth' },
        { label: 'Nestlé', a: 'Listed; KitKat sits within a much wider food group', b: 'CHF91.354 billion total 2024 group sales, not confectionery revenue' },
      ],
      note: 'Company-reported figures on different bases and periods: never rank 2018 confectionery sales against later group revenue as if equivalent.',
      takeaway: 'Name what each figure measures: private-company opacity and group totals cannot be forced into one ranking.',
    },
  },
  'packaged-food-m4-42-2': {
    heading: 'Who really competes in Vietnam confectionery, and who only sits nearby',
    intro: 'A famous food company is not automatically a confectionery leader. Sort each firm by its current category role before comparing it.',
    spec: {
      layout: 'taxonomy', title: 'Key Packaged Food Companies in Vietnam', kicker: '',
      root: 'Vietnam confectionery and adjacent food players', rootDetail: 'Classified by current category role, not by fame or ownership alone',
      groups: [
        { label: 'Localised multinational', detail: 'Foreign-owned but deeply localised', items: ['Orion Food Vina: plants in Binh Duong and Bac Ninh', 'ChocoPie and broad execution', 'Vietnam revenue above US$400 million (2022)'] },
        { label: 'Acquired heritage platform', detail: 'Multinational capability with Vietnamese brand heritage', items: ['Mondelez Kinh Do'] },
        { label: 'Domestic challengers', detail: 'Defend local taste, value and seasonal propositions', items: ['Bibica', 'Hai Ha'] },
        { label: 'Adjacent or former category owners', detail: 'Share channels but do not lead core confectionery', items: ['KIDO: exited core confectionery after the Mondelez deal', 'Masan Consumer: scaled in noodles and condiments'] },
      ],
      note: 'Orion group’s 2024 result is consolidated; keep Vietnam company figures separate from group results.',
      takeaway: 'Correct classification stops a team comparing businesses that serve different categories and occasions.',
    },
  },
  'packaged-food-m4-42-3': {
    heading: 'The denominator behind a 66% pie-segment share',
    intro: 'The same share figure can be sound or misleading. Test the claim against its category, basis, geography and year.',
    spec: {
      layout: 'decision', title: 'Understanding Market Share and Competitive Positioning', kicker: '',
      root: { label: 'Claim: ChocoPie holds about 66% share', detail: 'Nielsen figure reported by VnExpress' },
      question: 'Share of what, on which basis, where and when?',
      branches: [
        { condition: 'Vietnam pie segment, 2022', outcome: 'Supported: niche leadership', detail: 'Shows localisation and leadership within pies', tone: 'positive' },
        { condition: 'All Vietnam confectionery', outcome: 'Overclaim: not supported', detail: 'A pie leader need not lead chocolate, biscuits or candy', tone: 'negative' },
        { condition: 'Value or volume not stated', outcome: 'Incomplete claim', detail: 'Value share rewards price and mix; volume share counts units or weight', tone: 'caution' },
      ],
      note: 'Mondelez Kinh Do’s strength is especially relevant in biscuits and chocolate, which is a different denominator again.',
      takeaway: 'Leadership means something only when category, geography, year and value-or-volume basis are written into the claim.',
    },
  },
  'packaged-food-m4-43-1': {
    heading: 'Normalise scope, period and basis before any confectionery league table',
    intro: 'Follow the order of work in a disciplined benchmark: comparability comes before data collection, and gaps are labelled rather than filled.',
    spec: {
      layout: 'flow', title: 'How to Benchmark Packaged Food Companies', kicker: '',
      steps: [
        { label: 'Define the question', detail: 'Pick dimensions that explain performance: category role, portfolio, price tier, footprint, distribution', kind: 'stage' },
        { label: 'Align scope and period', detail: 'Match category, geography, fiscal period, currency and revenue basis', kind: 'stage' },
        { label: 'Separate facts from interpretations', detail: '“Strong route-to-market” needs evidence such as availability or operating footprint', kind: 'stage' },
        { label: 'Tag evidence quality and gaps', detail: 'Label directional comparisons and secondary sources instead of hiding gaps', kind: 'stage' },
        { label: 'Comparable benchmark', detail: 'Mars, Ferrero, Mondelez and Nestlé within the 2018 ranking only', kind: 'outcome' },
      ],
      note: 'Ferrero FY2024/25 consolidated revenue and Nestlé 2024 total group sales belong in separate context rows, not in the same ranking.',
      takeaway: 'Refusing a false comparison builds more credibility than a precise-looking table that mixes different measures.',
    },
  },
  'packaged-food-m4-43-2': {
    heading: 'Why a premium chocolate can lose to the product always in reach',
    intro: 'Product, price and availability interact. Trace how each driver feeds recruiting shoppers, trading them up and keeping shelves stocked profitably.',
    spec: {
      layout: 'driverTree', title: 'Comparing Products, Pricing, and Distribution', kicker: '',
      root: { label: 'Profitable shopper wins', detail: 'Recruit shoppers, trade them up and keep products available' },
      drivers: [
        { label: 'Product proposition', detail: 'Category, quality, format, flavour and occasion', op: '+', children: [{ label: 'Premium architecture', detail: 'Illustrated by Ferrero' }, { label: 'Broad occasion portfolio', detail: 'Mondelez biscuits and chocolate' }] },
        { label: 'Price-pack architecture', detail: 'Tier, pack size, promotion and realised price', op: '+', children: [{ label: 'Entry price via pack size' }, { label: 'Equivalent packs compared', detail: 'In the same channel context' }] },
        { label: 'Distribution quality', detail: 'Availability, assortment, visibility and replenishment', op: '+', children: [{ label: 'Sell-through, not listing' }, { label: 'Service frequency and credit' }] },
      ],
      note: 'Orion’s ChocoPie position combines product adaptation with deep Vietnam execution. No like-for-like margin or price-per-kilogram dataset was verified, so pricing stays qualitative.',
      takeaway: 'Benchmark the commercial system, not isolated attributes: distribution value comes from sell-through, not listing alone.',
    },
  },
  'packaged-food-m4-43-3': {
    heading: 'Scale, premium and focus: the exposure hidden inside each strength',
    intro: 'A strength is a capability that changes demand, cost, reach or speed. Read each row to see the exposure the same capability brings.',
    spec: {
      layout: 'compare', title: 'Identifying Competitive Strengths and Weaknesses', kicker: '',
      leftTitle: 'Strength it creates', rightTitle: 'Weakness it can bring',
      rows: [
        { label: 'Scale', a: 'Procurement leverage', b: 'More complexity' },
        { label: 'Premium positioning', a: 'Supports price', b: 'Raises expectations' },
        { label: 'Focused portfolio', a: 'Builds expertise', b: 'Concentrates commodity or occasion risk' },
        { label: 'Orion in Vietnam', a: 'More than US$400 million revenue and pie-segment leadership show localisation and reach', b: 'No proof of leadership in every category; group 2024 operating profit is not Vietnam profit' },
        { label: 'Domestic challengers', a: 'Local relevance', b: 'A much smaller scale base' },
      ],
      note: 'Use the chain observe, compare, explain and conclude. Mondelez’s breadth comes with cocoa exposure in chocolate; a directional benchmark or secondary source is not audited fact.',
      takeaway: 'State the mechanism and evidence confidence behind every judgment, including the downside of the same strength.',
    },
  },
  'packaged-food-m4-44-1': {
    heading: 'The promise sells the first pack; the opened pack earns the second',
    intro: 'Brand equity and quality do different jobs. Compare what each creates and what goes wrong when one is missing.',
    spec: {
      layout: 'compare', title: 'Why Brand Equity and Product Quality Matter', kicker: '',
      leftTitle: 'Brand equity', rightTitle: 'Product quality',
      rows: [
        { label: 'What it is', a: 'Recognition, meaning and trust attached to the offer', b: 'Reliable delivery of safety, taste, texture and format' },
        { label: 'What it creates', a: 'Expectation and the first purchase', b: 'Trust, habit and the repeat purchase' },
        { label: 'Without the other', a: 'Price without quality creates trial loss', b: 'Quality without recognition can remain invisible' },
        { label: 'Who produces it', a: 'Brand teams', b: 'R&D, Quality and Operations: process control, supplier standards, shelf life' },
        { label: 'Illustrations', a: 'Ferrero, KitKat and Cadbury brand systems', b: 'Orion’s ChocoPie pairs a recognised proposition with local production' },
      ],
      note: 'ChocoPie’s reported 66% share of Vietnam’s pie segment in 2022 does not isolate brand, quality, price or distribution effects; the mechanism is a reasoned synthesis.',
      takeaway: 'Pricing power lasts only while the product repeatedly delivers the brand’s promise.',
    },
  },
  'packaged-food-m4-44-2': {
    heading: 'How plant efficiency and outlet reach feed each other',
    intro: 'Cost, service and working capital move together. Follow the reinforcing loop from procurement to sell-through, and note where it can run backwards.',
    spec: {
      layout: 'flow', title: 'Manufacturing Efficiency and Distribution Reach', kicker: '',
      steps: [
        { label: 'Procurement scale', detail: 'Lowers unit cost, though leaders stay exposed to record cocoa inflation', kind: 'stage' },
        { label: 'Efficient factories', detail: 'Strong yield, uptime and utilisation; fewer quality holds and changeovers', kind: 'stage' },
        { label: 'Savings fund reach', detail: 'Inventory placement, credit, service frequency and outlet execution', kind: 'stage' },
        { label: 'On-shelf availability', detail: 'Right assortment replenished before demand is lost', kind: 'stage' },
        { label: 'Volume and sell-through', detail: 'Higher volume improves utilisation and restarts the loop', kind: 'outcome' },
      ],
      loop: 'The loop can reverse when complexity, stock-outs or weak sell-through appear.',
      note: 'Secondary reporting says Orion held Vietnam prices flat from 2018 despite an approximately 70% ingredient-cost increase: a company case for that period, not a sector-wide cost benchmark.',
      takeaway: 'Efficient production and dependable reach are complementary; neither creates a lasting advantage alone.',
    },
  },
  'packaged-food-m4-44-3': {
    heading: 'Each new SKU must earn a defined job in the range',
    intro: 'More SKUs do not equal innovation. Put a proposed launch through the tests for incrementality, margin, complexity and route fit.',
    spec: {
      layout: 'decision', title: 'Innovation, Pricing, and Portfolio Management', kicker: '',
      root: { label: 'Proposed launch or extension', detail: 'A new product, pack, price tier or occasion offer' },
      question: 'Does it have a defined job and pass the portfolio tests before scaling?',
      branches: [
        { condition: 'Clear job, incremental, profitable, fits the route', outcome: 'Scale the launch', detail: 'Recruits, premiumises, defends share or meets a new health need', tone: 'positive' },
        { condition: 'Sales mainly taken from its own range', outcome: 'Rethink the role', detail: 'Cannibalisation adds little beyond what the portfolio already earns', tone: 'caution' },
        { condition: 'No target consumer, occasion or price role', outcome: 'Do not scale', detail: 'Splits demand, adds changeovers and creates slow inventory', tone: 'negative' },
      ],
      note: 'Mondelez’s 7.4% FY2024 chocolate revenue growth is a corporate category result; it does not isolate innovation, volume, price or a Vietnam outcome.',
      takeaway: 'Innovation creates advantage only when it solves a need, earns a portfolio role and can be made and distributed profitably.',
    },
  },
  'packaged-food-m4-45-1': {
    heading: 'Connecting the four SWOT boxes into a confectionery strategy',
    intro: 'Keep strengths and weaknesses internal and opportunities and threats external, then look for where a strength can capture an opportunity.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Industry\'s SWOT', kicker: '',
      root: 'Packaged food and confectionery industry SWOT', rootDetail: 'Internal structure versus external change, at one level of analysis',
      groups: [
        { label: 'Strengths (internal)', items: ['Brands', 'Habitual demand', 'Scale', 'Distribution reach'] },
        { label: 'Weaknesses (internal)', items: ['Commodity exposure', 'Sugar pressure', 'Cost to serve'] },
        { label: 'Opportunities (external)', items: ['Premium and better-for-you mix', 'Vietnam per-capita headroom', 'Gifting', 'E-commerce and convenience channels'] },
        { label: 'Threats (external)', items: ['Cocoa volatility', 'Compliance', 'Distribution and seasonal-execution pressure'] },
      ],
      note: 'Vietnam’s roughly 2 kg per-capita confectionery consumption versus about 3 kg globally, and the VND66 trillion 2025 forecast, are secondary industry estimates of directional headroom, not official statistics.',
      takeaway: 'Use brand and reach to capture premium growth while reducing commodity, health and execution exposure.',
    },
  },
  'packaged-food-m4-45-2': {
    heading: 'Same cocoa shock, very different damage',
    intro: 'Two companies can face the same shock and suffer very differently. Trace severity to where the shock enters, how exposed the business is and how well it can respond.',
    spec: {
      layout: 'driverTree', title: 'Major Competitive Risks and Challenges', kicker: '',
      root: { label: 'Damage from a competitive shock', detail: 'Depends on exposure and response capacity, not on the shock alone' },
      formula: 'Severity rises with exposure and falls with response capacity',
      drivers: [
        { label: 'Where the shock enters', children: [{ label: 'Margin', detail: 'Commodity and FX shocks' }, { label: 'Demand', detail: 'Sugar scrutiny and substitutes' }, { label: 'Execution', detail: 'Stock-outs and weak seasonal planning' }] },
        { label: 'Category exposure', children: [{ label: 'Chocolate', detail: 'Cocoa' }, { label: 'Biscuits', detail: 'Wheat and oil' }, { label: 'Candy', detail: 'Stronger sugar-reduction pressure' }] },
        { label: 'Response capacity', children: [{ label: 'Premium mix and hedging' }, { label: 'Flexible packs and strong availability' }, { label: 'Scale to absorb shocks', detail: 'Smaller domestic Vietnam firms have less' }] },
      ],
      note: 'Mondelez anticipated an approximately 10% FY2025 adjusted-EPS decline amid record cocoa inflation: company guidance, not an industry forecast or a measure of cocoa prices.',
      takeaway: 'Separate demand, margin and execution channels instead of combining all risk into one score, then prioritise mitigation.',
    },
  },
  'packaged-food-m4-45-3': {
    heading: 'Matching premium, reformulation, hedging and route levers to the risk',
    intro: 'A response must fit the mechanism: a procurement saving cannot fix weak demand. Follow diagnosis to the right lever, then to measurement.',
    spec: {
      layout: 'pathway', title: 'How Companies Respond to Strategic Challenges', kicker: '',
      trunk: [
        { label: 'Diagnose the mechanism', detail: 'Does the challenge hit demand, margin or execution?', kind: 'decision' },
      ],
      optionsLabel: 'Match the lever to the mechanism',
      options: [
        { label: 'Demand levers', items: ['Premium mix', 'Reformulation', 'Local taste'] },
        { label: 'Margin levers', items: ['Hedging', 'Productivity', 'Price-pack architecture'] },
        { label: 'Execution levers', items: ['Inventory and channel discipline', 'Deep GT reach and modern-channel activation', 'Tet and Mid-Autumn planning'] },
      ],
      afterLabel: 'Then measure and adapt',
      after: [
        { label: 'Track leading and lagging indicators', detail: 'Distribution, sell-through, repeat, mix, yield, gross profit and stock-outs', kind: 'stage' },
        { label: 'Adapt before the full-year result', detail: 'Act before a seasonal or commodity shock becomes a full-year result', kind: 'outcome' },
      ],
      note: 'Globally, cocoa cost and sugar-reduction pressure dominate the supported evidence; in Vietnam, distribution breadth and seasonal execution add immediate competitive weight.',
      takeaway: 'Resilience comes from coordinated portfolio, cost and route decisions, each with an owner and a measure.',
    },
  },
};
