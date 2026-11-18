import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Dairy Module 01 (Industry Overview & Context), keyed by exact chapter title. */
export const DAIRY_M1_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  '01 What Is the Dairy Industry?': {
    heading: 'A global farm base and a Vietnam market with room to grow',
    intro: 'Dairy runs from millions of farming households to branded products on Vietnamese shelves. Compare the global scale with how much Vietnam still consumes per person.',
    spec: {
      layout: 'compare', title: 'What Is the Dairy Industry?', kicker: '',
      leftTitle: 'Global dairy', rightTitle: 'Vietnam dairy',
      rows: [
        { label: 'Who takes part', a: 'About 150 million households produce milk (FAO)', b: 'Domestic manufacturers, international brands and specialized nutrition companies' },
        { label: 'Scale', a: 'About 950 million tonnes of milk produced in 2024', b: 'Competition across multiple product categories' },
        { label: 'Consumption benchmark', a: 'Thailand 35 and Singapore 45 liters a person a year', b: '26–28 liters a person a year (VnEconomy)' },
      ],
      note: 'The industry covers production, processing and commercialization of milk and milk-derived products, from liquid milk and powder to cheese and specialized nutrition.',
      takeaway: 'Scale and rural reach make dairy matter for food security, employment and agricultural development.',
    },
  },
  '02 What Makes the Dairy Industry Unique?': {
    heading: 'Steady demand, so the winners are decided elsewhere',
    intro: 'People drink milk in good years and bad. See which of the five characteristics decide performance once demand itself is stable.',
    spec: {
      layout: 'driverTree', title: 'What Makes the Dairy Industry Unique?', kicker: '',
      root: { label: 'Dairy company performance', detail: 'Depends on differentiation, trust and cost control more than on demand growth' },
      drivers: [
        { label: 'Essential consumption', detail: 'Everyday nutrition across life stages keeps demand steady' },
        { label: 'Diverse applications', detail: 'Households, specialized nutrition, food services, bakery and confectionery' },
        { label: 'Quality-sensitive purchasing', detail: 'Safety, nutrition, taste, reputation and suitability drive the choice' },
        { label: 'Strong brand competition', detail: 'Innovation, distribution coverage, advertising, pricing and trust' },
        { label: 'Input-cost exposure', detail: 'Raw milk, powder, feed, packaging, energy, transport and exchange rates' },
      ],
      note: 'Dairy imports were about USD 1.2 billion in 2024 (USDA); processors often lock in raw-material prices three to six months ahead (Shinhan Securities).',
      takeaway: 'In a stable market, trust and cost discipline separate leaders from followers.',
    },
  },
  '03 Where Does the Dairy Industry Begin and End?': {
    heading: 'Liquid milk: the everyday segment where reach decides',
    intro: 'Liquid milk is bought often and found everywhere. Read the segment profile to see why distribution and brand recognition matter most here.',
    spec: {
      layout: 'taxonomy', title: 'Where Does the Dairy Industry Begin and End?', kicker: '',
      root: 'Liquid milk segment', rootDetail: 'Everyday milk, from fresh milk to ready-to-drink nutrition',
      groups: [
        { label: 'Products', items: ['Pasteurized fresh milk', 'UHT milk', 'Reconstituted milk', 'Ready-to-drink nutrition'] },
        { label: 'Target customers', items: ['Households', 'Children', 'Working adults', 'General consumers'] },
        { label: 'Purchase factors', items: ['Taste and nutrition', 'Quality and brand trust', 'Shelf life and convenience', 'Price'] },
        { label: 'Commercial traits', items: ['Frequent consumption', 'Broad retail availability', 'Strong domestic and international competition'] },
      ],
      note: 'Vinamilk held about 55% of Vietnam’s liquid milk market in 2018 (Just Food), and liquid milk is about 40% of Vinamilk’s revenue (Shinhan Securities).',
      takeaway: 'High purchase frequency and broad availability make reach and brand recognition decisive.',
    },
  },
  '04 Understanding Dairy Products and Categories': {
    heading: 'Where credibility is the price of entry',
    intro: 'Milk powder and specialized nutrition are bought for a specific user. Follow the segment into its product types and see why trust works as a barrier.',
    spec: {
      layout: 'pathway', title: 'Understanding Dairy Products and Categories', kicker: '',
      trunk: [
        { label: 'Milk powder and specialized nutrition', detail: 'Formulation, suitability and credibility matter most', kind: 'stage' },
      ],
      optionsLabel: 'Product types',
      options: [
        { label: 'Whole and skimmed milk powder', detail: 'WMP and SMP' },
        { label: 'Infant formula', detail: 'Parents and caregivers decide' },
        { label: 'Growing-up milk', detail: 'Age-specific nutrition' },
        { label: 'Adult and older-consumer powder', detail: 'Specific nutritional requirements' },
      ],
      afterLabel: 'What it takes to compete',
      after: [
        { label: 'Quality assurance and compliance', detail: 'Higher requirements than everyday dairy', kind: 'stage' },
        { label: 'Premium positioning', detail: 'Supported by trust, but costly to get wrong', kind: 'outcome' },
      ],
      note: 'Danone said its Aptamil business in Vietnam doubled in one year; Abbott is reported at over 24% of milk powder in the source’s category.',
      takeaway: 'Trust and compliance keep entrants out and support premium prices, while raising the cost of any failure.',
    },
  },
  '05 Who Are the Dairy Industry\'s Customers?': {
    heading: 'Households buy often; businesses buy to specification',
    intro: 'The buyer is not always the consumer. Compare consumer and business customers before choosing a product, channel or message.',
    spec: {
      layout: 'compare', title: 'Who Are the Dairy Industry\'s Customers?', kicker: '',
      leftTitle: 'B2C customers', rightTitle: 'B2B customers',
      rows: [
        { label: 'Who they are', a: 'Infants and children via parents, adolescents, households, older adults', b: 'Cafés and restaurants, schools, food manufacturers, retailers' },
        { label: 'What they buy', a: 'Liquid milk, yogurt, formula, specialized nutrition', b: 'Milk, cream, butter, cheese, whey and finished goods for resale' },
        { label: 'How they buy', a: 'Often, in small quantities', b: 'Larger volumes with consistent specifications' },
        { label: 'What wins them', a: 'Taste, price, brand recognition and suitability', b: 'Consistency, reliable supply and compliance' },
      ],
      note: 'Reported estimates for 2025: industry revenue about VND 133.04 trillion (around 1% growth), imports about USD 1.26 billion, exports about USD 354.1 million. The 40-liter consumption goal for 2030 is a policy target, not an outcome.',
      takeaway: 'Modest overall growth means companies must win specific needs, not wait for the market to rise.',
    },
  },
  '01 How Did Modern Dairy Production Begin?': {
    heading: 'From the family cow to an integrated supply chain',
    intro: 'Dairy farming changed in three phases. Follow them in order to see where today’s large integrated players came from.',
    spec: {
      layout: 'flow', title: 'How Did Modern Dairy Production Begin?', kicker: '',
      steps: [
        { label: 'Traditional dairy farming', detail: 'Small-scale farmers supply local buyers; output depends on animal health, weather and seasons', kind: 'stage' },
        { label: 'Industrialization', detail: 'Mechanized milking, refrigeration and centralized processing raise productivity and consistency', kind: 'stage' },
        { label: 'Integrated supply chains', detail: 'Farms, plants, packaging makers, distributors and retailers linked for efficiency and quality control', kind: 'outcome' },
      ],
      note: 'Pasteurization’s scientific foundations date from the 1860s, and Tetra Pak launched aseptic packaging in 1961.',
      takeaway: 'This evolution explains today’s structure: large integrated players, aseptic supply chains and global ingredient trade.',
    },
  },
  '02 How Did Dairy Processing and Preservation Evolve?': {
    heading: 'Four technologies that let milk leave the farm safely',
    intro: 'Milk spoils quickly. Match each breakthrough to the problem it solved and what it made possible.',
    spec: {
      layout: 'table', title: 'How Did Dairy Processing and Preservation Evolve?', kicker: '',
      headers: ['Technology', 'What it does', 'What it made possible'],
      rows: [
        { label: 'Pasteurization (1860s)', a: 'Heat treatment reduces harmful microorganisms', b: 'Safer milk' },
        { label: 'UHT processing', a: 'Heats milk rapidly at very high temperatures to commercial sterility', b: 'With aseptic packs, storage without refrigeration' },
        { label: 'Aseptic packaging (1961)', a: 'Protects processed milk from recontamination', b: 'Longer shelf life and easier transport' },
        { label: 'Automated dairy farming', a: 'Equipment and digital monitoring', b: 'Consistent milking, herd management and productivity' },
      ],
      note: 'Louis Pasteur’s work set the scientific foundations for pasteurization; Tetra Pak launched its aseptic system in 1961.',
      takeaway: 'Together these breakthroughs made dairy safer, more accessible and easier to distribute across markets.',
    },
  },
  '03 How Did Global Dairy Companies and Trade Develop?': {
    heading: 'Why Vietnam still leans on imported milk',
    intro: 'Vietnam started with a small dairy cattle sector. Trace the early constraints and responses that still shape import dependence and investment today.',
    spec: {
      layout: 'driverTree', title: 'How Did Global Dairy Companies and Trade Develop?', kicker: '',
      root: { label: 'Today’s import dependence and investment priorities' },
      drivers: [
        { label: 'Hot, humid climate', detail: 'Makes cattle management and milk productivity harder' },
        { label: 'Limited farming tradition', detail: 'Historically a less-developed dairy cattle sector' },
        { label: 'Few natural hubs', detail: 'Moc Chau in Son La grew on highland conditions' },
        { label: 'Processing capacity', detail: 'Domestic manufacturers turned milk into a widely distributed staple' },
      ],
      note: 'Milestones that followed: Vinamilk founded in 1976, equitized and listed 2003–2006, and TH true MILK’s entry from 2010.',
      takeaway: 'Early climate and geography constraints still explain where Vietnam invests and what it imports.',
    },
  },
  '04 How Has Vietnam\'s Dairy Industry Developed?': {
    heading: 'Three corporate turning points in Vietnamese dairy',
    intro: 'Vietnam’s modern dairy market was shaped by a few company milestones. Read them in order and note how each changed competition.',
    spec: {
      layout: 'timeline', title: 'How Has Vietnam\'s Dairy Industry Developed?', kicker: '',
      events: [
        { period: '1976', label: 'Vinamilk established', detail: 'From three former factories, it becomes central to domestic processing and distribution', status: 'historical' },
        { period: '2003–2006', label: 'Equitization and listing', detail: 'Restructuring, capital mobilization and expansion on a market-oriented model', status: 'historical' },
        { period: 'From 2010', label: 'TH true MILK enters', detail: 'A farm-to-product model built on concentrated farming and fresh milk positioning', status: 'historical' },
      ],
      takeaway: 'These milestones set the competitive landscape and investment direction of the modern Vietnamese dairy market.',
    },
  },
  '01 How Is the Global Dairy Market Structured?': {
    heading: 'A near-flat total hiding segments that grow',
    intro: 'The global market barely grew in 2024. See the four forces behind long-term demand and why some segments can rise while the total stalls.',
    spec: {
      layout: 'driverTree', title: 'How Is the Global Dairy Market Structured?', kicker: '',
      root: { label: 'Global dairy market', detail: 'About USD 893 billion; 0.6% growth in 2024 and about 0.5% projected for 2025' },
      drivers: [
        { label: 'Population and consumption', detail: 'Growth and rising consumption in some emerging markets' },
        { label: 'Income and nutrition awareness', detail: 'More spending on packaged milk, yogurt, cheese and premium nutrition' },
        { label: 'Price fluctuations', detail: 'Raw milk, feed, energy and transport costs move retail prices' },
        { label: 'Product mix', detail: 'Protein-rich, lactose-free and specialized nutrition grow differently from traditional dairy' },
      ],
      note: 'The market value and growth rates depend on one source’s market definition, coverage and method; they are not universal estimates.',
      takeaway: 'Knowing which drivers are active explains a stagnant total alongside strongly growing segments.',
    },
  },
  '02 How Are Global Dairy Production and Markets Measured?': {
    heading: 'Three headwinds that keep reported growth low',
    intro: 'Underlying demand can be stable while the headline growth rate stays low. See how each headwind shows up in the numbers.',
    spec: {
      layout: 'table', title: 'How Are Global Dairy Production and Markets Measured?', kicker: '',
      headers: ['Headwind', 'How it shows up', 'Effect on the market'],
      rows: [
        { label: 'Commodity volatility', a: 'Milk powder, butter and ingredient prices swing internationally', b: 'Distorts value growth' },
        { label: 'Inflation and affordability', a: 'Higher living costs', b: 'Switching to cheaper brands, fewer premium purchases' },
        { label: 'Changing dietary preferences', a: 'Plant-based options; concern about sugar, lactose and environment', b: 'Reshapes product development and demand' },
      ],
      note: 'The roughly USD 893 billion market value and 0.6% growth for 2024 come from one source and depend on its definition.',
      takeaway: 'A low growth rate does not prove weak demand; check which headwinds are moving the total.',
    },
  },
  '03 Which Regions Drive Dairy Production and Consumption?': {
    heading: 'Two giant markets, opposite supply models',
    intro: 'China and India are both large dairy markets but supply them very differently. Compare the two models before judging trade flows.',
    spec: {
      layout: 'compare', title: 'Which Regions Drive Dairy Production and Consumption?', kicker: '',
      leftTitle: 'China', rightTitle: 'India',
      rows: [
        { label: 'Supply model', a: 'Significant domestic production combined with imports', b: 'Extensive domestic dairy sector supplies the market' },
        { label: 'Demand', a: 'Liquid milk, yogurt, cheese, powder and ingredients for food manufacturing', b: 'Dairy deeply integrated into everyday diets' },
        { label: 'Trade role', a: 'Important buyer of imported ingredients and selected premium dairy', b: 'Largely self-sufficient' },
      ],
      note: 'Asia-Pacific is a major consumption region; in Southeast Asia, urbanization, rising incomes and modern retail are changing consumption.',
      takeaway: 'Import-dependent and self-sufficient markets compete and trade very differently.',
    },
  },
  '04 Who Are the Major Global Dairy Participants?': {
    heading: 'City life turns loose milk into branded premium dairy',
    intro: 'Southeast Asia’s dairy demand is reshaped by economics rather than tradition. Follow the shifts from the forces that start them.',
    spec: {
      layout: 'pathway', title: 'Who Are the Major Global Dairy Participants?', kicker: '',
      trunk: [
        { label: 'Urbanization', detail: 'Access to supermarkets, convenience stores, e-commerce and brands', kind: 'stage' },
        { label: 'Rising purchasing power', detail: 'Some consumers can afford more value per purchase', kind: 'stage' },
      ],
      optionsLabel: 'How demand shifts',
      options: [
        { label: 'Unpackaged to branded' },
        { label: 'Basic to premium' },
        { label: 'Fortified and convenient formats' },
        { label: 'Health-led choices', detail: 'Protein, digestive health and reduced sugar' },
      ],
      note: 'China is an important market for imported ingredients and premium dairy; India is a major domestic market.',
      takeaway: 'Urbanizing markets change in structure, not just in size, which opens room for differentiated products.',
    },
  },
  '05 How Do International Dairy Trade and Market Dynamics Work?': {
    heading: 'Who produces milk and who ships it abroad',
    intro: 'The biggest milk producer is not the biggest exporter. See what each region brings to world dairy trade and how importing countries depend on them.',
    spec: {
      layout: 'ecosystem', title: 'How Do International Dairy Trade and Market Dynamics Work?', kicker: '',
      center: { label: 'International dairy trade', detail: 'Prices and supply formed by where regions specialize' },
      actors: [
        { label: 'India', relation: 'World’s largest milk producer; output largely absorbed domestically', flows: ['product'] },
        { label: 'European Union', relation: 'Advanced processing; major exporter of cheese, butter and milk powder', flows: ['product', 'money'] },
        { label: 'United States', relation: 'Large-scale production serving domestic and export markets', flows: ['product', 'money'] },
        { label: 'New Zealand and Fonterra', relation: 'Export-oriented; the cooperative collects, processes and exports powder and ingredients', flows: ['product', 'money'] },
        { label: 'Importing countries', relation: 'Rely on suppliers to supplement local production or obtain missing ingredients', flows: ['money', 'risk'] },
      ],
      takeaway: 'Advantage comes from combining production scale, processing capability and export infrastructure, not milk volume alone.',
    },
  },
  '01 What Does Vietnam\'s Dairy Market Look Like?': {
    heading: 'Structural forces behind Vietnam’s steady dairy growth',
    intro: 'Vietnam’s dairy revenue has grown through economic ups and downs. See the three long-term forces that explain it.',
    spec: {
      layout: 'driverTree', title: 'What Does Vietnam\'s Dairy Market Look Like?', kicker: '',
      root: { label: 'Vietnam dairy market revenue', detail: 'VND 63.1 trillion in 2024, up from VND 50 trillion in 2019 (~4.8% CAGR, cited source)' },
      drivers: [
        { label: 'Rising disposable income', detail: 'Spending on packaged dairy, fortified milk, yogurt and premium products' },
        { label: 'Urbanization and retail development', detail: 'Supermarkets, convenience stores and e-commerce widen access to brands' },
        { label: 'Nutrition awareness', detail: 'Buyers weigh nutritional value, ingredients, convenience and quality' },
      ],
      note: 'Another cited estimate puts the 2024 market near $4.22B; estimates differ with product scope and method.',
      takeaway: 'Because the drivers are structural and long-term, growth has held up through economic fluctuations.',
    },
  },
  '02 How Are Dairy Products Consumed in Vietnam?': {
    heading: 'Pressures that stop revenue growth becoming margin',
    intro: 'A growing market does not guarantee better margins. See where the three constraints press on a Vietnamese dairy manufacturer.',
    spec: {
      layout: 'ecosystem', title: 'How Are Dairy Products Consumed in Vietnam?', kicker: '',
      center: { label: 'Vietnamese dairy manufacturer', detail: 'Revenue grows, but margin is squeezed from several sides' },
      actors: [
        { label: 'Price-sensitive households', relation: 'Affordability matters most when budgets are under pressure', flows: ['money'] },
        { label: 'Multinational brands and imports', relation: 'Compete directly with domestic manufacturers', flows: ['product', 'risk'] },
        { label: 'Global ingredient suppliers', relation: 'Imported inputs carry international price swings', flows: ['product', 'money', 'risk'] },
        { label: 'Currency markets', relation: 'Foreign exchange movements change ingredient costs', flows: ['risk'] },
      ],
      note: 'Revenue rose from VND 50 trillion in 2019 to VND 63.1 trillion in 2024 in the cited source.',
      takeaway: 'Market value growth does not automatically improve every player’s profit margin.',
    },
  },
  '03 How Is Vietnam\'s Dairy Production System Structured?': {
    heading: 'Liquid milk leads, but the shares do not add up cleanly',
    intro: 'Vietnam’s dairy market splits into a few core categories. Compare each category’s cited share with how its products are differentiated.',
    spec: {
      layout: 'table', title: 'How Is Vietnam\'s Dairy Production System Structured?', kicker: '',
      headers: ['Category', 'Cited share', 'How products differ'],
      rows: [
        { label: 'Liquid milk', a: '~47.6%', b: 'Freshness, processing method, fat content and fortification' },
        { label: 'Milk powder', a: '29%–45% across sources', b: 'Age groups and nutritional needs; trust, composition and price' },
        { label: 'Yogurt', a: '~14.5%', b: 'Flavor, texture, sugar level and probiotic positioning' },
        { label: 'Other dairy', a: '~8.9%', b: 'Remaining products in the cited breakdown' },
      ],
      note: 'The milk powder range suggests definition differences, so do not combine these shares into one distribution until definitions are reconciled.',
      takeaway: 'A brand strong in liquid milk may face very different buyers and rivals in yogurt or powder.',
    },
  },
  '04 Who Are the Key Players in Vietnam\'s Dairy Industry?': {
    heading: 'New preferences opening a higher-margin tier',
    intro: 'Three preference shifts are reshaping what Vietnamese consumers buy. Group the product responses each one invites.',
    spec: {
      layout: 'taxonomy', title: 'Who Are the Key Players in Vietnam\'s Dairy Industry?', kicker: '',
      root: 'Emerging dairy preferences', rootDetail: 'Premium-tier opportunities beyond mainstream liquid milk',
      groups: [
        { label: 'Health-oriented choices', items: ['Less sugar', 'Additional protein', 'Specific nutritional benefits'] },
        { label: 'Premium and specialized', items: ['Organic', 'Lactose-free', 'Products for particular needs'] },
        { label: 'Convenience', items: ['Ready-to-drink formats', 'Smaller packages', 'Products for busy urban lifestyles'] },
      ],
      note: 'In the cited breakdown liquid milk is ~47.6% of the market and yogurt ~14.5%; milk powder estimates range from 29% to 45%.',
      takeaway: 'These preferences support premium products that can command higher margins than mainstream milk.',
    },
  },
  '05 How Do Imports, Distribution, and Local Supply Shape the Market?': {
    heading: 'Local farms, imported powder and two retail battles',
    intro: 'Vietnam’s processors sit between domestic farms, overseas suppliers and very different urban and rural shoppers. See what each link contributes and risks.',
    spec: {
      layout: 'ecosystem', title: 'How Do Imports, Distribution, and Local Supply Shape the Market?', kicker: '',
      center: { label: 'Domestic dairy processors', detail: 'Collect or procure raw materials, process, build brands and distribute' },
      actors: [
        { label: 'Domestic dairy farms', relation: 'Moc Chau, Nghe An, Lam Dong, Ha Nam and Cu Chi; meet about 30–45% of demand', flows: ['product', 'money'] },
        { label: 'International suppliers', relation: 'New Zealand, the United States and the European Union; about 55–70% of processing inputs', flows: ['product', 'money', 'risk'] },
        { label: 'Urban modern trade', relation: 'Supermarkets, convenience stores and e-commerce in Hanoi and Ho Chi Minh City', flows: ['product', 'money'] },
        { label: 'Rural general trade', relation: 'Traditional grocery outlets with different preferences and purchasing power', flows: ['product', 'money'] },
      ],
      note: 'The supply and import shares are cited estimates on different bases, not exact inverses; the 400,000+ cattle figure needs checking against official statistics.',
      takeaway: 'Domestic supply adds security only if it stays cost-competitive, while imports tie processors to global prices and exchange rates.',
    },
  },
  '01 How Do Economic Conditions Affect Dairy Demand?': {
    heading: 'Rules on standards, prices and paperwork',
    intro: 'Regulation shapes how dairy is produced, priced, labeled and sold. Read each policy area with its business impact.',
    spec: {
      layout: 'table', title: 'How Do Economic Conditions Affect Dairy Demand?', kicker: '',
      headers: ['Policy area', 'What it covers', 'Business impact'],
      rows: [
        { label: 'Technical regulations (QCVN)', a: 'Product classification and quality requirements', b: 'Compliance obligations by milk type' },
        { label: 'Labeling and claims', a: 'Descriptions, nutrition information and marketing claims', b: 'Non-compliance can close market access' },
        { label: 'Food safety', a: 'Testing, traceability and quality control through to retail', b: 'Builds consumer trust and premium credibility' },
        { label: 'Milk price management', a: 'Certain products for children under 6', b: 'Limits how those products are priced or promoted' },
        { label: 'School Milk Program', a: 'Children’s nutrition through school milk', b: 'Institutional demand for compliant suppliers' },
        { label: 'Tax and e-invoicing', a: 'Ministry of Finance rules', b: 'Compliance burden for small retailers' },
      ],
      note: 'The Ministry of Health oversees food safety and labeling; the Ministry of Finance handles taxation.',
      takeaway: 'Policy-aware companies turn compliance into an advantage, especially in institutional channels.',
    },
  },
  '02 Why Do Food Safety and Regulation Matter in Dairy?': {
    heading: 'Trading up, trading down and the cost of imported milk',
    intro: 'Economic conditions hit both what shoppers buy and what milk costs to make. See the forces that squeeze or support dairy margins.',
    spec: {
      layout: 'driverTree', title: 'Why Do Food Safety and Regulation Matter in Dairy?', kicker: '',
      root: { label: 'Dairy margin under economic pressure', detail: 'Affordability balanced against margin protection' },
      drivers: [
        { label: 'Demand mix', detail: 'Two groups moving in opposite directions', children: [{ label: 'Higher-income consumers trade up' }, { label: 'Budget-constrained buyers trade down', detail: 'Cheaper brands, smaller packages, promotions' }] },
        { label: 'Feed and farm costs', detail: 'Feed and energy are the largest variable farm costs, both price-linked' },
        { label: 'Imported inputs and FX', detail: 'A weaker dong raises the local cost of imported materials' },
        { label: 'Cost management', detail: 'Long-term procurement, efficient production, diversified suppliers, inventory planning' },
      ],
      takeaway: 'Dairy is not one demand curve: economic pressure splits it into premium and mass segments with different economics.',
    },
  },
  '03 How Are Dairy Technology and Production Practices Evolving?': {
    heading: 'Beyond price and brand: what shoppers now check',
    intro: 'Consumers judge dairy on more than price and familiarity. Group the new purchase criteria and the specialized needs they create.',
    spec: {
      layout: 'taxonomy', title: 'How Are Dairy Technology and Production Practices Evolving?', kicker: '',
      root: 'Changing dairy consumption', rootDetail: 'Freshness, nutrition, sugar, transparency and suitability now influence choice',
      groups: [
        { label: 'New purchase criteria', items: ['Ingredient transparency and labels', 'Trust, safety and traceability', 'Convenience and ready-to-drink'] },
        { label: 'Specialized dietary needs', items: ['Lactose-free for lactose intolerance', 'A2 milk (beta-casein variant)', 'Plant-based: soy, oat, almond', 'Reduced sugar'] },
      ],
      note: 'Specialized segments are typically smaller but faster-growing than mainstream categories, and they support premium pricing.',
      takeaway: 'Brands win the premium-intent shopper with clear labeling, fitting formulations and evidence-based claims.',
    },
  },
  '04 How Are Consumer Preferences Changing the Industry?': {
    heading: 'Will this technology actually pay off?',
    intro: 'Automated milking, SCADA and blockchain are already used in dairy, with mixed results. Test a technology proposal before assuming it creates value.',
    spec: {
      layout: 'decision', title: 'How Are Consumer Preferences Changing the Industry?', kicker: '',
      root: { label: 'A technology proposal', detail: 'Automated milking, herd sensors, AI, SCADA, digital quality control or traceability' },
      question: 'Do scale, operator skills and data quality fit the operation?',
      branches: [
        { condition: 'Yes, all three fit', outcome: 'Measurable gains', detail: 'Better herd health, consistent batches, traceability and lower per-liter milk cost', tone: 'positive' },
        { condition: 'Data or skills are weak', outcome: 'Unreliable results', detail: 'AI models and blockchain records are only as good as the data entered', tone: 'caution' },
        { condition: 'Scale too small', outcome: 'Capital hard to recover', detail: 'Return depends on scale and operating context', tone: 'negative' },
      ],
      note: 'Processing technology and traceability are increasingly prerequisites for institutional buyers, export markets and premium brands.',
      takeaway: 'Judge dairy technology on measurable outcomes, implementation cost and data quality, not on the technology itself.',
    },
  },
  '05 What External Risks and Opportunities Shape Dairy\'s Future?': {
    heading: 'Heat stress today, market-access rules tomorrow',
    intro: 'In Vietnam’s climate, environmental management is both a daily farm cost and a growing condition of doing business. Group the practices by what they protect.',
    spec: {
      layout: 'taxonomy', title: 'What External Risks and Opportunities Shape Dairy\'s Future?', kicker: '',
      root: 'Environmental management in dairy', rootDetail: 'An operational necessity and a strategic priority',
      groups: [
        { label: 'Heat and climate resilience', detail: 'Heat stress cuts feed intake, reproduction and milk yield', items: ['Ventilation, shade and cooling', 'Reliable drinking water', 'Monitoring animal condition', 'Planning for water, extreme weather and feed'] },
        { label: 'Environmental performance', detail: 'Methane and manure are the main emission sources', items: ['Manure, feed and energy management', 'Wastewater treatment', 'Manure to fertilizer or biogas', 'Net-zero initiatives'] },
      ],
      note: 'Net-zero results depend on implementation and measurement; export buyers, institutional customers and ESG-focused investors increasingly assess performance.',
      takeaway: 'Sustainability is becoming a market-access requirement, not just an ethical aspiration.',
    },
  },
};
