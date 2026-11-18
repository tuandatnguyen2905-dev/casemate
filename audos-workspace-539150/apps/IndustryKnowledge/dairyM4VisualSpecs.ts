import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Dairy Module 04 (Competitive Landscape), keyed by exact chapter title. */
export const DAIRY_M4_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  '01 How Concentrated Is Dairy Competition?': {
    heading: 'Concentration looks different category by category',
    intro: 'A leader’s share depends on which market you measure. Compare a broad dairy market with a narrow category to see how contestable each is.',
    spec: {
      layout: 'compare', title: 'How Concentrated Is Dairy Competition?', kicker: '',
      leftTitle: 'Overall dairy market', rightTitle: 'Packaged soy milk',
      rows: [
        { label: 'Leader’s share', a: 'Vinamilk about 39.5-40% (2024)', b: 'Vinasoy above 70%' },
        { label: 'Field', a: 'Several large manufacturers lead major categories', b: 'One specialist dominates a narrow category' },
        { label: 'Pricing power', a: 'Spread across several strong players', b: 'Concentrated in the category leader' },
        { label: 'Route for a newcomer', a: 'Hard head-on at national scale', b: 'Test entry through a niche or channel' },
      ],
      note: 'Pricing power differs by category, so assess each category separately.',
      takeaway: 'Judge how contestable dairy is one category at a time, not for the market as a whole.',
    },
  },
  '02 What Are Dairy\'s Barriers to Entry?': {
    heading: 'The bill for competing nationwide',
    intro: 'Entering dairy at national scale means paying for several capital-heavy assets before the first sale. See what makes up that bill.',
    spec: {
      layout: 'driverTree', title: 'What Are Dairy\'s Barriers to Entry?', kicker: '',
      root: { label: 'Cost of national-scale entry', detail: 'Heavy upfront investment protects incumbents' },
      drivers: [
        { label: 'Dairy farms', detail: 'Herds and land for a steady raw milk supply' },
        { label: 'Processing and UHT lines', detail: 'Plants that turn raw milk into packaged products' },
        { label: 'Quality assurance systems', detail: 'Testing and controls before products can be sold' },
        { label: 'Distribution infrastructure', detail: 'Networks to reach outlets across the country' },
      ],
      note: 'TH true MILK’s launch project was presented in 2010 as a USD 1.2 billion investment in farming and processing in Nghệ An.',
      takeaway: 'High entry costs slow national-scale rivals, so newcomers usually test niches or channels first.',
    },
  },
  '03 How Do the Five Forces Shape Rivalry?': {
    heading: 'Rating each pressure on dairy margins',
    intro: 'Five forces explain why some dairy categories earn thin margins. Read each rating with the evidence behind it.',
    spec: {
      layout: 'table', title: 'How Do the Five Forces Shape Rivalry?', kicker: '',
      headers: ['Force', 'Rating', 'Evidence'],
      rows: [
        { label: 'Rivalry among competitors', a: 'High', b: 'Vinamilk held about 55% of liquid milk in 2018; look-alike products compete on price' },
        { label: 'Supplier power', a: 'Mixed', b: 'About USD 1.2 billion of dairy imports in 2024; smallholders have few buyers' },
        { label: 'Buyer power', a: 'Increasing', b: 'Modern trade about 27% of retail sales in 2024 and expanding' },
        { label: 'Substitutes', a: 'Increasing', b: 'Soy, oat and almond drinks; Fami soy milk launched in 2001' },
        { label: 'New entrants', a: 'Generally low at scale', b: 'Niche entry: Nutricare founded 18 October 2010 for medical nutrition' },
      ],
      note: 'Rate each force for the specific category, not for dairy as a whole.',
      takeaway: 'Strong rivalry, import-linked costs and demanding retailers together explain dairy margin pressure.',
    },
  },
  '01 Who Are the Major Global Dairy Participants?': {
    heading: 'Five domestic paths into Vietnam’s dairy market',
    intro: 'Vietnam’s leading domestic companies started at different times and chose different scopes. Trace when each one emerged and what it focused on.',
    spec: {
      layout: 'timeline', title: 'Who Are the Major Global Dairy Participants?', kicker: '',
      events: [
        { period: '1976', label: 'Vinamilk: broad portfolio', detail: 'Started with three dairy factories; now sells in 65 markets', status: 'historical' },
        { period: '1989', label: 'Nutifood: selected categories', detail: 'Launched by a group of doctors; owns the NutiMilk 6S farm', status: 'historical' },
        { period: '1997', label: 'Vinasoy: soy specialist', detail: 'Grew from the Trường Xuân factory; Fami launched in 2001', status: 'historical' },
        { period: '2003', label: 'Moc Chau Milk: highland heritage', detail: 'First UHT plant; part of the Vinamilk system since 2019', status: 'historical' },
        { period: '26 December 2010', label: 'TH true MILK: fresh and farm-based', detail: 'Launched in Nghĩa Đàn; reports over 40% of fresh milk', status: 'historical' },
      ],
      note: 'Vinamilk was equitized in 2003 and listed on HOSE on 19 January 2006; it acquired 75% of GTNFoods, Moc Chau’s parent, in 2019.',
      takeaway: 'Broad portfolios give reach, while category focus builds positions broad players struggle to challenge.',
    },
  },
  '02 Who Are the Major Vietnamese Dairy Participants?': {
    heading: 'Global brands that still have to localize',
    intro: 'Multinationals bring brands and expertise into Vietnam. See where each one competes and what it brings.',
    spec: {
      layout: 'ecosystem', title: 'Who Are the Major Vietnamese Dairy Participants?', kicker: '',
      center: { label: 'Vietnam’s dairy and nutrition market', detail: 'Mainstream dairy, infant formula and adult nutrition' },
      actors: [
        { label: 'FrieslandCampina Vietnam', relation: 'Dutch Lady and Yomost for mainstream milk, Friso for nutrition; factories in Hà Nam and Bình Dương', flows: ['product'] },
        { label: 'Nestlé Vietnam', relation: 'Milo and NAN from a group selling in 185 countries', flows: ['product', 'information'] },
        { label: 'Abbott', relation: 'Similac, PediaSure, Ensure and Glucerna; in Vietnam since 1995', flows: ['product', 'information'] },
        { label: 'Danone', relation: 'Its Aptamil business in Vietnam doubled in one year', flows: ['product'] },
        { label: 'Distributors and healthcare channels', relation: 'Carry multinational brands to shoppers and professionals', flows: ['product', 'service'] },
      ],
      note: 'FrieslandCampina reported €13.4 billion revenue in 2025; Nestlé’s 2025 Nutrition and Health Science sales were CHF 14.3 billion.',
      takeaway: 'Multinationals raise the bar on formulation and marketing, but must localize price, pack and distribution.',
    },
  },
  '03 How Do Player Business Models and Positions Differ?': {
    heading: 'Every share figure needs its denominator',
    intro: 'Dairy market shares are quoted against very different markets. Group each figure by the market it actually measures.',
    spec: {
      layout: 'taxonomy', title: 'How Do Player Business Models and Positions Differ?', kicker: '',
      root: 'Market share by definition', rootDetail: 'Indicative figures, not directly comparable',
      groups: [
        { label: 'Overall dairy', items: ['Vinamilk about 39.5–40% (2024)', 'FrieslandCampina Vietnam about 10–18%', 'Nestlé Vietnam about 7–8%'] },
        { label: 'Liquid and drinking milk', items: ['Vinamilk 55% of liquid milk (2018)', 'TH true MILK about 11–15% of drinking milk'] },
        { label: 'Narrow categories', items: ['TH true MILK over 40% of fresh milk', 'Vinasoy over 70% of packaged soy milk', 'Abbott over 24% of milk powder'] },
      ],
      note: 'Confirm the original research, category definition and reporting year before treating any figure as definitive; revenue share may also differ from volume share.',
      takeaway: 'State the category, metric and year before comparing any two dairy players.',
    },
  },
  '01 How Should Dairy Competitors Be Benchmarked?': {
    heading: 'What each brand promises and what backs it up',
    intro: 'Dairy brands position on familiarity, natural sourcing or nutritional expertise. Compare each promise with the proof behind it.',
    spec: {
      layout: 'table', title: 'How Should Dairy Competitors Be Benchmarked?', kicker: '',
      headers: ['Company', 'Positioning', 'What backs the promise'],
      rows: [
        { label: 'Vinamilk', a: 'Broad and accessible, mass-market to premium', b: 'Green Farm fresh milk with GlobalG.A.P.-compliant feed' },
        { label: 'TH true MILK', a: 'Fresh, farm-based and natural', b: 'Organic milk to the European standard' },
        { label: 'FrieslandCampina', a: 'Mainstream plus specialized nutrition', b: 'Dutch Lady for milk; Friso for infant nutrition' },
        { label: 'VitaDairy', a: 'Colostrum-based specialized nutrition', b: 'ColosBaby flagship line' },
      ],
      note: 'Breadth lets one company serve many segments, but the brand must stay coherent.',
      takeaway: 'Check that product, price and channel deliver what the brand claims.',
    },
  },
  '02 How Do Portfolio, Distribution, and Milk Sourcing Compare?': {
    heading: 'What lets a brand charge its price',
    intro: 'Each competitor justifies its price point differently. Follow what each pricing choice depends on.',
    spec: {
      layout: 'decision', title: 'How Do Portfolio, Distribution, and Milk Sourcing Compare?', kicker: '',
      root: { label: 'A dairy price point', detail: 'Raw materials, formulation, packaging and brand spend all feed in' },
      question: 'What justifies this price?',
      branches: [
        { condition: 'Wide price ladder', outcome: 'Serves many household budgets', detail: 'Vinamilk, from condensed milk to infant formula; each tier must stay distinct' },
        { condition: 'Believable farm story', outcome: 'Premium over mainstream', detail: 'TH UHT milk without preservatives, six-month shelf life; needs consistent quality', tone: 'positive' },
        { condition: 'Split by need', outcome: 'Accessible and higher-priced lines', detail: 'Dutch Lady and Yomost accessible; Friso for infant nutrition' },
        { condition: 'Niche claim', outcome: 'Price rests on credibility', detail: 'ColosBaby uses imported ColosIgG 24h colostrum under an exclusive arrangement', tone: 'caution' },
      ],
      takeaway: 'Innovation and premiums pay only when they answer a clear need at a viable cost.',
    },
  },
  '03 How Do Profitability, Brand Positioning, and Differentiation Compare?': {
    heading: 'Owning reach versus earning trust in focused channels',
    intro: 'Some competitors win by being everywhere; others by reaching the right buyers well. Compare the two distribution approaches.',
    spec: {
      layout: 'compare', title: 'How Do Profitability, Brand Positioning, and Differentiation Compare?', kicker: '',
      leftTitle: 'Reach-led', rightTitle: 'Focus-led',
      rows: [
        { label: 'Players', a: 'Vinamilk; FrieslandCampina with distributors', b: 'TH true mart; specialized nutrition brands' },
        { label: 'Channels', a: 'Traditional retail, modern trade, branded stores, online', b: 'Own stores, hospitals, pharmacies, healthcare professionals' },
        { label: 'Proof point', a: 'Vinamilk: 653 stores, digital program in 1,165 outlets across 63 provinces', b: 'TH: nearly 400 stores and cold storage for over 20,000 pallets' },
        { label: 'Advantage', a: 'Availability everywhere, hard to copy', b: 'Fresh handling, education and trust' },
      ],
      note: 'The source cites more than 200,000 general-trade outlets for Vinamilk; verify this against a defined reporting period.',
      takeaway: 'Match channel strategy to storage needs, target customer and cost to serve.',
    },
  },
  '01 Why Do Milk Sourcing and Food Safety Drive Success?': {
    heading: 'Protecting quality from farm to outlet',
    intro: 'Sourcing control and cold-chain discipline decide whether safe, fresh products reach shelves. Follow the capabilities a product passes through.',
    spec: {
      layout: 'flow', title: 'Why Do Milk Sourcing and Food Safety Drive Success?', kicker: '',
      steps: [
        { label: 'Farm development', detail: 'TH farms are designed around roughly 2,400 milking cows each', kind: 'stage' },
        { label: 'Quality standards', detail: 'Testing, hygiene, animal health; GlobalG.A.P. feed and Control Union organic audits', kind: 'stage' },
        { label: 'Cold-chain storage', detail: 'TH’s Nghĩa Đàn warehouses total about 20,000 m² in normal, cold and frozen zones', kind: 'stage' },
        { label: 'Forecasting and coordination', detail: 'Plan for short-shelf-life fresh milk to avoid stockouts and expiry', kind: 'stage' },
        { label: 'Broad retail coverage', detail: 'Modern grocery is only about 11% (2023), so traditional outlets stay key', kind: 'outcome' },
      ],
      note: 'Supplier diversification lowers disruption risk: New Zealand (22%), the EU (21%) and Australia (14%) led Vietnam’s 2024 dairy imports (USDA).',
      takeaway: 'Coverage creates value only when products arrive in the right condition at an acceptable cost.',
    },
  },
  '02 How Do Scale, Efficiency, and Distribution Build Advantage?': {
    heading: 'Trust and scale: two advantages built differently',
    intro: 'Durable advantage in dairy comes from consumer trust and from cost efficiency. See what builds each one.',
    spec: {
      layout: 'driverTree', title: 'How Do Scale, Efficiency, and Distribution Build Advantage?', kicker: '',
      root: { label: 'Durable dairy advantage' },
      drivers: [
        { label: 'Brand trust', children: [
          { label: 'Consistent quality', detail: 'FrieslandCampina complaint ratio 0.68 in 2025 vs 0.76 in 2024' },
          { label: 'Credible, compliant claims' },
          { label: 'Transparent labeling' },
          { label: 'Complaint and recall handling' },
        ] },
        { label: 'Scale efficiency', children: [
          { label: 'Production utilization', detail: 'TH: 27 lines; Mega Plant designed for over 500 million liters a year' },
          { label: 'Procurement efficiency' },
          { label: 'Operational productivity', detail: 'Moc Chau feed plant built in 2013' },
          { label: 'Measured marketing spend' },
        ] },
      ],
      note: 'Scale alone does not guarantee profitability: capacity must match demand, with utilization, inventory and distribution costs managed.',
      takeaway: 'Trust is built slowly and lost quickly, while scale pays only when plants stay full.',
    },
  },
  '03 How Do Brand Trust and Innovation Sustain Growth?': {
    heading: 'From consumer insight to a validated launch',
    intro: 'New dairy products pass through insight and testing before they reach shelves. Follow the route and the categories companies weigh.',
    spec: {
      layout: 'pathway', title: 'How Do Brand Trust and Innovation Sustain Growth?', kicker: '',
      trunk: [
        { label: 'Consumer insight', detail: 'Taste, purchase behavior and unmet needs; Nutifood cites a research institute in Sweden', kind: 'stage' },
        { label: 'Technical validation', detail: 'Safety, stability and compliance; Vinamilk cites Bureau Veritas, Intertek and TÜV', kind: 'stage' },
      ],
      optionsLabel: 'Candidate categories, where demand supports them',
      options: [
        { label: 'Organic and A2 milk' },
        { label: 'Lower-sugar and lactose-free' },
        { label: 'Plant-based beverages' },
      ],
      afterLabel: 'Bring it to market',
      after: [
        { label: 'Speed to market', detail: 'Parallel work on formulation, packaging and registration', kind: 'stage' },
        { label: 'Launch', detail: 'Vinamilk launched durian-flavored yogurt in China in 2023', kind: 'outcome' },
      ],
      note: 'Digital tools help only with accurate data and real adoption: Vinamilk’s outlet program covered 1,165 stores in 2023, and Vinamilk Rewards launched in Q4 2023.',
      takeaway: 'Judge a pipeline by consumer need, technical validation and speed to market.',
    },
  },
  '01 What Are the Industry Strengths and Weaknesses?': {
    heading: 'Home-grown capabilities rivals take years to copy',
    intro: 'Vietnam’s dairy industry competes from a set of domestic strengths. Weigh each one by the evidence and how hard it is to copy.',
    spec: {
      layout: 'table', title: 'What Are the Industry Strengths and Weaknesses?', kicker: '',
      headers: ['Strength', 'Evidence', 'What it gives'],
      rows: [
        { label: 'Established domestic brands', a: 'Vinamilk reaches 65 countries and ranks 36th by revenue globally', b: 'Recognition and consumer trust' },
        { label: 'Manufacturing capabilities', a: 'Moc Chau Milk: first UHT plant 2003, feed plant 2013', b: 'Scale and a wider product range' },
        { label: 'Distribution coverage', a: 'Vinamilk 653 stores; nearly 400 TH true mart stores', b: 'Availability and brand visibility' },
        { label: 'Farm modernization', a: 'Vinamilk Green Farm; TH’s certified organic farm', b: 'Raw milk quality and supply stability' },
      ],
      note: 'Their long-term value depends on continued operational improvement and consumer trust.',
      takeaway: 'Judge strengths against rivals by asking which ones are hard to copy.',
    },
  },
  '02 Where Are the Main Opportunities and Threats?': {
    heading: 'Structural gaps beside new growth openings',
    intro: 'Vietnam’s dairy sector faces supply and cost constraints while new segments open up. Group the weaknesses and opportunities side by side.',
    spec: {
      layout: 'taxonomy', title: 'Where Are the Main Opportunities and Threats?', kicker: '',
      root: 'Weaknesses and opportunities', rootDetail: 'Each weakness links to cost, supply or perception',
      groups: [
        { label: 'Weaknesses', detail: 'Domestic milk meets about 30–45% of demand (definitions vary)', items: ['Limited domestic raw milk', 'Imported inputs: about USD 1.2 billion in 2024', 'Scale gaps: about 3.3 cows per 1,000 people', 'Preference for foreign brands in nutrition'] },
        { label: 'Opportunities', detail: 'Consumption is 26-28 liters a year versus 35 in Thailand', items: ['Premium: organic, protein, lactose-free', 'Healthy aging and specialized nutrition', 'Plant-based beverages', 'Regional exports; Vinamilk in 65 markets', 'Digital commerce: over 4 million orders (2023)'] },
      ],
      note: 'Industry bodies put self-sufficiency at about 38-40% in 2024, against a 60% target for 2030 (VnEconomy).',
      takeaway: 'Opportunities pay off only when demand is validated and the route to market is sustainable.',
    },
  },
  '03 What Strategic Tradeoffs Must Dairy Leaders Manage?': {
    heading: 'External risks that compound at once',
    intro: 'Dairy threats rarely arrive alone: weather, prices, competition and rules interact. See how each one presses on margins.',
    spec: {
      layout: 'driverTree', title: 'What Strategic Tradeoffs Must Dairy Leaders Manage?', kicker: '',
      root: { label: 'Pressure on dairy margins', detail: 'Costs, market access and distribution economics' },
      drivers: [
        { label: 'Commodity volatility', detail: 'Powder, feed, energy, packaging and freight; Fonterra expects continued volatility' },
        { label: 'International competition', detail: 'Lower tariffs under CPTPP support New Zealand dairy' },
        { label: 'Climate change', detail: 'Heat stress and weather; Fonterra flagged a possible El Niño' },
        { label: 'Regulatory changes', detail: 'Circular 33/2024/TT-BYT took effect on 1 January 2025' },
        { label: 'Substitute products', detail: 'Plant-based drinks; Danone cites flexitarian demand' },
      ],
      note: 'Climate stress can raise feed costs while global prices lift input expenses, just as consumers grow more price-sensitive.',
      takeaway: 'Map how threats interact before prioritizing responses.',
    },
  },
};
