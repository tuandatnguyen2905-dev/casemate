import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Dairy Module 05 (Trends & Outlook), keyed by exact chapter title. */
export const DAIRY_M5_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  '01 How Are Nutrition and Consumption Preferences Changing?': {
    heading: 'Fresh or reconstituted: a question the label must answer',
    intro: 'Shoppers increasingly favor fresh milk, but much liquid milk is still made from powder. Compare the two and what each asks of the brand.',
    spec: {
      layout: 'compare', title: 'How Are Nutrition and Consumption Preferences Changing?', kicker: '',
      leftTitle: 'Fresh milk', rightTitle: 'Reconstituted or recombined milk',
      rows: [
        { label: 'Made from', a: 'Fresh raw milk', b: 'Milk powder mixed with water' },
        { label: 'Weight in the market', a: 'A growing preference among some shoppers', b: 'Still 32.3% of Vietnam’s liquid milk in 2023' },
        { label: 'What shoppers look for', a: 'Natural image, clear ingredients, transparent production', b: 'A clear statement of what the product is' },
        { label: 'Brand response', a: 'TH was first to print raw-milk origin on packaging', b: 'Labeling that explains the difference' },
      ],
      takeaway: 'Because fresh versus reconstituted is a trust question, clear communication is part of the product.',
    },
  },
  '02 How Do Health, Convenience, and Innovation Shape Demand?': {
    heading: 'Premium demand is real but narrow',
    intro: 'Organic, eco-managed and A2 milk attract shoppers who link price with quality. Follow how premium positioning meets the limits of income and awareness.',
    spec: {
      layout: 'pathway', title: 'How Do Health, Convenience, and Innovation Shape Demand?', kicker: '',
      trunk: [
        { label: 'Premium positioning', detail: 'Quality, specialized nutrition and responsible production', kind: 'stage' },
      ],
      optionsLabel: 'Higher-value segments',
      options: [
        { label: 'Organic milk', detail: 'TH certified under EU rules (EC 834/2007) in April 2017; launched 17 August 2017' },
        { label: 'Eco-managed farm milk', detail: 'Milk from environmentally managed farms' },
        { label: 'A2-protein milk', detail: 'A specialized nutritional attribute' },
      ],
      afterLabel: 'What limits the market',
      after: [
        { label: 'Income and awareness', detail: 'Actual demand varies with both', kind: 'stage' },
        { label: 'Target those who can pay', detail: 'Ask who pays more, for what benefit, on which occasion', kind: 'outcome' },
      ],
      takeaway: 'Aim premium lines at the segments with the income and awareness to pay.',
    },
  },
  '03 Which Consumer Segments and Behaviors Are Emerging?': {
    heading: 'How daily routines reshape the dairy range',
    intro: 'Plant-based diets and changing households open new segments. Group the alternatives, the lifestyle shifts and the formats that answer them.',
    spec: {
      layout: 'taxonomy', title: 'Which Consumer Segments and Behaviors Are Emerging?', kicker: '',
      root: 'Emerging segments and behaviors', rootDetail: 'Match formats and nutrition to how people live',
      groups: [
        { label: 'Plant-based alternatives', detail: 'Unsweetened or low-sugar; not nutritional equivalents of dairy', items: ['Soy, such as Fami since 2001', 'Almond and walnut', 'Oat'] },
        { label: 'Lifestyle shifts', items: ['Urbanization', 'Smaller households', 'Aging populations', 'Busy routines'] },
        { label: 'Formats that follow', items: ['Single-serve packs', 'Nutrition for older adults', 'Products for children or active consumers'] },
      ],
      note: 'Per-capita consumption of 26–28 liters a year, against 35 in Thailand and 45 in Singapore, leaves headroom for growth (VnEconomy).',
      takeaway: 'Occasion-led formats let a company serve niches that one standard pack cannot.',
    },
  },
  '01 How Is Dairy Farming Technology Evolving?': {
    heading: 'Farm data matters only when it changes a herd decision',
    intro: 'Smart farms turn sensor readings into herd decisions. Follow the data from the cow to the farmer’s action.',
    spec: {
      layout: 'flow', title: 'How Is Dairy Farming Technology Evolving?', kicker: '',
      steps: [
        { label: 'Sensors and wearables', detail: 'Thousands of data points a day on health, feeding, milk and reproduction', kind: 'stage' },
        { label: 'Dairy Management System', detail: 'Consolidates the data for herd management', kind: 'stage' },
        { label: 'AI anomaly detection', detail: 'Flags animals needing attention; depends on data quality and implementation', kind: 'stage' },
        { label: 'Herd decision', detail: 'An earlier health check or a feed adjustment', kind: 'outcome' },
      ],
      takeaway: 'Ask which decision a farm tool improves, what data it needs and how fast it pays back.',
    },
  },
  '02 How Are Manufacturing and Quality Systems Innovating?': {
    heading: 'Robotic milking trades labor for capital',
    intro: 'Automated milking cuts repetitive work but needs heavy investment. Weigh the gains against the costs that decide payback.',
    spec: {
      layout: 'driverTree', title: 'How Are Manufacturing and Quality Systems Innovating?', kicker: '',
      root: { label: 'Payback of robotic milking', detail: 'Farm scale and technical support decide it' },
      drivers: [
        { label: 'Individual-animal data', detail: 'More consistent monitoring with feeding and herd systems', op: '+' },
        { label: 'Less repetitive manual work', detail: 'Lower reliance on routine milking labor', op: '+' },
        { label: 'High initial investment', detail: 'Limits adoption among smaller farms', op: '−' },
        { label: 'Maintenance requirements', detail: 'Ongoing technical support is needed', op: '−' },
      ],
      note: 'Estimates of robotic milking systems in use range from about 34,000 to more than 50,000 worldwide; roughly 5% of US dairy operations use them (AgDaily; NSW DPI).',
      takeaway: 'Automation shifts cost from labor to capital, so payback depends on scale and support.',
    },
  },
  '03 How Is Product Development Changing?': {
    heading: 'New records and new recipes, each with a condition attached',
    intro: 'Traceability and product innovation both promise value. Check what each offers and the condition it must meet.',
    spec: {
      layout: 'table', title: 'How Is Product Development Changing?', kicker: '',
      headers: ['Innovation', 'What it offers', 'Condition for value'],
      rows: [
        { label: 'Digital traceability', a: 'Links farm, collection, processing, distribution and retail records; QR codes', b: 'Accurate data entered at every step' },
        { label: 'Blockchain', a: 'Shared records that are hard to alter', b: 'Does not prove the original data are accurate' },
        { label: 'New formulations', a: 'Lactose-free, high-protein, reduced-sugar, plant-based', b: 'Meets a real need at acceptable cost' },
        { label: 'Packaging', a: 'Convenience or lower environmental impact', b: 'Tied to use: TH’s 500 ml organic carton, 17 August 2017' },
      ],
      takeaway: 'Verification matters more than the ledger, and innovation pays only when need meets cost.',
    },
  },
  '01 How Are Retail Channels Evolving?': {
    heading: 'Neighborhood grocers versus organized chains',
    intro: 'General trade gives reach; modern trade gives presentation. Compare the two, and check what each share figure measures.',
    spec: {
      layout: 'compare', title: 'How Are Retail Channels Evolving?', kicker: '',
      leftTitle: 'General trade (GT)', rightTitle: 'Modern trade (MT)',
      rows: [
        { label: 'Formats', a: 'Independent grocers and small retailers', b: 'Supermarkets, hypermarkets, convenience chains' },
        { label: 'Strength', a: 'Extensive geographic reach', b: 'Structured merchandising and brand presentation' },
        { label: '2024 share (Cimigo)', a: '62% of retail sales; first absolute decline (-5%)', b: '27%; sales +4%, outlets up 11% in two years' },
        { label: 'Reported trend', a: 'Distribution share from 60.5% to 56.1%', b: 'Gaining with urbanization and retailer expansion' },
      ],
      note: 'Verify the period, categories and whether a figure measures value, volume or coverage before drawing conclusions.',
      takeaway: 'Choose channels by product and customer, weighing coverage, control and cost to serve together.',
    },
  },
  '02 How Are Digital and Direct Channels Developing?': {
    heading: 'Online orders add data and delivery demands',
    intro: 'Online channels make shelf-stable dairy easy to buy and reorder. See what they add and what they demand.',
    spec: {
      layout: 'driverTree', title: 'How Are Digital and Direct Channels Developing?', kicker: '',
      root: { label: 'Value of online dairy sales', detail: 'Marketplaces, retailer websites and brand-owned stores' },
      drivers: [
        { label: 'Convenience', detail: 'Easier buying of powdered milk, packaged milk and multipacks', op: '+' },
        { label: 'Retention', detail: 'Subscriptions and recurring orders', op: '+' },
        { label: 'Customer data', detail: 'Promotions and personalized offers', op: '+' },
        { label: 'Fulfillment and temperature control', detail: 'Delivery demands rise with online volume', op: '−' },
      ],
      note: 'Cimigo puts e-commerce at about 11% of retail sales in 2024, up 43% in absolute sales; Vinamilk reported over 4 million online orders in 2023.',
      takeaway: 'Online growth pays when convenience and data outweigh fulfillment cost.',
    },
  },
  '03 How Are Portfolios and Markets Expanding?': {
    heading: 'Three capabilities that make a channel mix work',
    intro: 'A channel mix works only if products arrive intact, new markets are chosen well and channels run as one system. Compare the three capabilities.',
    spec: {
      layout: 'table', title: 'How Are Portfolios and Markets Expanding?', kicker: '',
      headers: ['Capability', 'What it requires', 'Evidence'],
      rows: [
        { label: 'Cold chain and last mile', a: 'Temperature control for chilled products; ambient-stable packs are more flexible', b: 'TH storage for over 20,000 pallets' },
        { label: 'International expansion', a: 'Product fit, approvals, competitive prices, distribution partners', b: 'Middle East about 7% of Vinamilk revenue; delivery times rose from 30 to 45 days' },
        { label: 'Omnichannel integration', a: 'Aligned prices, promotions, inventory and customer data', b: 'Outlet program in 1,165 stores across 63 provinces (2023)' },
      ],
      note: 'Target export markets include Cambodia, China, the Middle East and selected African countries; exports add regulatory, logistics and currency risk.',
      takeaway: 'Test reliability, export readiness and consistent data against cost to serve.',
    },
  },
  '01 How Are Food Safety and Regulation Evolving?': {
    heading: 'Labels that match their legal definitions',
    intro: 'Terms like “fresh milk” and “organic” must meet set definitions. Follow what happens when a label does or does not.',
    spec: {
      layout: 'decision', title: 'How Are Food Safety and Regulation Evolving?', kicker: '',
      root: { label: 'A dairy label', detail: '“Fresh milk,” “reconstituted milk,” “organic” and nutrition claims' },
      question: 'Do the terms and claims match applicable definitions?',
      branches: [
        { condition: 'Matched and substantiated', outcome: 'Less consumer confusion', detail: 'Clear nutrition facts help shoppers tell categories apart', tone: 'positive' },
        { condition: 'Mislabeled or unsupported', outcome: 'Lost trust and enforcement', detail: 'Compliance is part of brand credibility', tone: 'negative' },
        { condition: 'Product for under-sixes', outcome: 'Extra rules apply', detail: 'Circular 33/2024/TT-BYT took effect on 1 January 2025', tone: 'caution' },
      ],
      takeaway: 'Treat compliance as a brand lever as well as a risk and cost line.',
    },
  },
  '02 How Are Environmental and Resource Pressures Changing Dairy?': {
    heading: 'A certificate covers its scope and no more',
    intro: 'Farm certifications support consistent practices, food safety and traceability. Compare what a certificate shows with what it cannot claim.',
    spec: {
      layout: 'compare', title: 'How Are Environmental and Resource Pressures Changing Dairy?', kicker: '',
      leftTitle: 'What a certificate shows', rightTitle: 'What it does not show',
      rows: [
        { label: 'Systems', a: 'VietGAP, GlobalG.A.P., applicable organic frameworks', b: 'Benefits outside the certified scope' },
        { label: 'Coverage', a: 'Compliance with a defined standard', b: 'Every quality or environmental benefit' },
        { label: 'Relevance', a: 'Depends on operation and target market', b: 'Automatic value in every market' },
        { label: 'Example', a: 'TH chain certified by Control Union, April 2017', b: 'Anything beyond EC 834/2007 and EC 889/2008' },
      ],
      takeaway: 'Describe a certification by its exact standard and scope.',
    },
  },
  '03 How Are Packaging and Circularity Expectations Developing?': {
    heading: 'Rules and partners that shape everyday operations',
    intro: 'Packaging rules, farmer relationships and tax changes affect cost and continuity. See how each party connects to the manufacturer.',
    spec: {
      layout: 'ecosystem', title: 'How Are Packaging and Circularity Expectations Developing?', kicker: '',
      center: { label: 'Dairy manufacturer', detail: 'Builds packaging, sourcing and compliance into operating plans' },
      actors: [
        { label: 'Packaging regulators (EPR)', relation: 'Since 1 January 2024 producers must recycle packaging; cartons 20% at first', flows: ['oversight', 'money'] },
        { label: 'Recycling and collection', relation: 'Progress depends on collection, recycling capacity and technology', flows: ['service'] },
        { label: 'Partner farmers', relation: 'Contracts, training, quality payments and financing; Green Farms buy local corn and grass', flows: ['product', 'money'] },
        { label: 'Tax authority', relation: 'Decree 70/2025/ND-CP: POS e-invoices from 1 June 2025', flows: ['oversight'] },
        { label: 'Smaller retailers and suppliers', relation: 'May need help adapting to new processes', flows: ['service', 'risk'] },
      ],
      note: 'A milk carton is roughly 75% pulp, 21% polymer and 4% aluminum. E-invoicing applies to household businesses with revenue of at least VND 1 billion selling directly to consumers.',
      takeaway: 'Packaging, suppliers and compliance belong in daily operations, not occasional projects.',
    },
  },
  '01 What Drivers Could Support Dairy Growth?': {
    heading: 'Value can grow while volume stays flat',
    intro: 'Powdered milk volume is expected to stay flat while value improves. See which levers carry growth when units do not.',
    spec: {
      layout: 'driverTree', title: 'What Drivers Could Support Dairy Growth?', kicker: '',
      root: { label: 'Powdered milk value' },
      formula: 'Value = volume × average price and mix',
      drivers: [
        { label: 'Volume', detail: 'Expected to stay relatively flat', op: '×' },
        { label: 'Price and mix', op: '×', children: [{ label: 'Premiumization' }, { label: 'Pricing changes' }, { label: 'Shift to specialized nutrition' }] },
      ],
      note: 'Shinhan puts powder at about 15% of Vinamilk revenue (liquid 40%, yogurt 25%, condensed 20%). Projections of 12–13% liquid milk growth, VND 66 trillion revenue and ~41.7% gross margin are unverified estimates; the last two are Vinamilk-only.',
      takeaway: 'With flat volume, growth comes from mix and price, so margins and portfolio choices matter more.',
    },
  },
  '02 Where Are the Main Investment and Competitive Opportunities?': {
    heading: 'Export upside, checked market by market',
    intro: 'Exports could offset domestic softness, but outcomes differ by market. Follow how the outlook varies by destination.',
    spec: {
      layout: 'decision', title: 'Where Are the Main Investment and Competitive Opportunities?', kicker: '',
      root: { label: 'Export expansion', detail: 'An extra revenue source beyond the home market' },
      question: 'What does each market’s outlook depend on?',
      branches: [
        { condition: 'China', outcome: 'Double-digit growth expected', detail: 'Vinamilk expects it to continue in 2026 (VNDirect)', tone: 'positive' },
        { condition: 'Middle East', outcome: 'Positive but slower to serve', detail: 'About 7% of consolidated revenue; longer shipping times', tone: 'caution' },
        { condition: 'Other markets', outcome: 'Validate before counting on it', detail: 'Check against reported export data for each market', tone: 'caution' },
      ],
      note: 'The 12–13% liquid milk growth and Vinamilk’s VND 66.477 trillion 2026 plan (+4.3%) are forecasts, not verified market data.',
      takeaway: 'Judge export upside market by market against reported data.',
    },
  },
  '03 What Risks and Scenarios Should Leaders Plan For?': {
    heading: 'Plan for a range, not a single number',
    intro: 'Dairy growth plans face cost, competition, affordability, ESG and forecast risks at once. Read each risk with its evidence and response.',
    spec: {
      layout: 'table', title: 'What Risks and Scenarios Should Leaders Plan For?', kicker: '',
      headers: ['Risk', 'Evidence', 'Response'],
      rows: [
        { label: 'Imported input volatility', a: 'About USD 1.2 billion of dairy imports in 2024', b: 'Lock in prices three to six months ahead' },
        { label: 'Intensifying competition', a: 'Similac, NAN, Friso and Aptamil in specialized nutrition', b: 'Defensible differentiation' },
        { label: 'Affordability', a: 'Purchasing power not fully recovered; cautious 2026 plan', b: 'A portfolio across price points' },
        { label: 'ESG investment costs', a: 'Vinamilk 2023–2027 tree planting: VND 15 billion', b: 'Weigh regulation and long-term return' },
        { label: 'Forecast uncertainty', a: '2026 forecasts VND 65.4 to 70.1 trillion, about 7% apart', b: 'Use several scenarios' },
      ],
      takeaway: 'Test any dairy plan against several scenarios and keep options open.',
    },
  },
};
