import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Dairy Module 03 (Business Models & Economics), keyed by exact chapter title. */
export const DAIRY_M3_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  '01 How Does an Integrated Dairy Producer Operate?': {
    heading: 'Buying local brands deal by deal',
    intro: 'Lactalis grew by acquiring established dairy businesses. Follow the deals and the debt to see what acquisition-led growth buys and what it costs.',
    spec: {
      layout: 'timeline', title: 'How Does an Integrated Dairy Producer Operate?', kicker: '',
      events: [
        { period: '1933', label: 'Lactalis founded', detail: 'A French family-owned group', status: 'historical' },
        { period: '2006', label: 'Galbani acquired', detail: 'An established local brand with plants and distribution', status: 'historical' },
        { period: '2011', label: 'Parmalat acquired', detail: 'Another brand portfolio joins the group', status: 'historical' },
        { period: '2018', label: 'Siggi’s acquired', detail: 'Brands now include Président, Galbani and Parmalat', status: 'historical' },
        { period: 'End of 2024', label: 'About €30.3 billion revenue', detail: 'Reported debt of about €5.0 billion', status: 'historical' },
      ],
      note: 'Revenue and debt are company-reported figures for 2024.',
      takeaway: 'Acquisitions buy brands, plants and distribution fast, but each deal adds integration effort and debt.',
    },
  },
  '02 How Do Processors and Brand Owners Create Value?': {
    heading: 'When the farmers own the processor',
    intro: 'In a cooperative, members supply the milk and share the results. Compare three large cooperatives by who owns them and where their milk comes from.',
    spec: {
      layout: 'table', title: 'How Do Processors and Brand Owners Create Value?', kicker: '',
      headers: ['Cooperative', 'Farmer-owners', 'Where the milk comes from'],
      rows: [
        { label: 'DFA', a: 'About 9,000; the largest US dairy cooperative', b: 'Serves the US market' },
        { label: 'Arla Foods', a: 'About 12,700 farmers', b: 'Pools milk from seven European countries' },
        { label: 'FrieslandCampina', a: 'About 14,000 member farmers; €13.4 billion revenue in 2025', b: 'Pools milk from farmers in several countries' },
      ],
      note: 'Members supply the milk, own the cooperative and share in its economic performance across collection, processing and commercialization.',
      takeaway: 'Cooperatives stabilize raw milk supply, but member ownership shapes their pricing and investment decisions.',
    },
  },
  '03 How Do Cooperative, Private-Label, and Specialized Models Differ?': {
    heading: 'Running the chain from pasture to own-brand store',
    intro: 'Vinamilk and TH true MILK operate across several value-chain stages. Follow the integrated chain and note how much capital each stage ties up.',
    spec: {
      layout: 'flow', title: 'How Do Cooperative, Private-Label, and Specialized Models Differ?', kicker: '',
      steps: [
        { label: 'Own dairy farms', detail: 'TH launched in December 2010 with about 10,000 cows; Vinamilk lists 15 farms', kind: 'stage' },
        { label: 'Raw milk collection', detail: 'Run under one planning system with the farms', kind: 'stage' },
        { label: 'Processing plants', detail: 'Vinamilk: 16 factories across Vietnam, Cambodia, Laos and the US', kind: 'stage' },
        { label: 'Cold-chain warehousing', detail: 'TH’s Nghĩa Đàn complex holds over 20,000 pallets in normal, cold and frozen storage', kind: 'stage' },
        { label: 'Multi-channel and own stores', detail: 'TH cites nearly 400 TH true mart stores; Vinamilk had 653 stores in December 2023', kind: 'outcome' },
      ],
      note: 'Vinamilk’s 2023 annual report cites a 13% rise in own-store revenue and over 4 million online orders; these are company figures.',
      takeaway: 'Integration buys steadier quality, planning and availability at the price of heavy capital in farms, plants and stores.',
    },
  },
  '01 How Do Liquid Milk and Processed Dairy Portfolios Differ?': {
    heading: 'Mass-market dairy wins on cost and coverage',
    intro: 'Mass-market products are built for broad access. See the product families in this tier and the two conditions every one of them depends on.',
    spec: {
      layout: 'pathway', title: 'How Do Liquid Milk and Processed Dairy Portfolios Differ?', kicker: '',
      trunk: [
        { label: 'Mass-market dairy', detail: 'Affordable, available, familiar formats for everyday use', kind: 'stage' },
      ],
      optionsLabel: 'Product families',
      options: [
        { label: 'Condensed milk', detail: 'Ông Thọ and Ngôi Sao Phương Nam for coffee, tea, desserts and cooking' },
        { label: 'Affordable UHT milk', detail: 'Standardized cartons; about 2.05 billion liters of liquid milk produced in 2024' },
        { label: 'Food-service ingredients', detail: 'Cafés, beverage shops and bakeries buy bulk packs and repeat often' },
      ],
      afterLabel: 'What decides who profits',
      after: [
        { label: 'Traditional grocery reach', detail: 'About 62% of retail sales in 2024 (Cimigo); numeric distribution is the key metric', kind: 'stage' },
        { label: 'Low unit cost', detail: 'Production and packaging scale', kind: 'outcome' },
      ],
      takeaway: 'Mass-market economics run on volume and unit cost, so check reach and cost position before assuming margins.',
    },
  },
  '02 How Do Yogurt, Cheese, Butter, and Other Categories Compete?': {
    heading: 'The mainstream shelf: brand trust in many sizes',
    intro: 'Mainstream products balance price, quality and trust. Group the formats a mainstream portfolio uses to serve different occasions.',
    spec: {
      layout: 'taxonomy', title: 'How Do Yogurt, Cheese, Butter, and Other Categories Compete?', kicker: '',
      root: 'Mainstream dairy portfolio', rootDetail: 'Accessibility combined with brand differentiation',
      groups: [
        { label: 'UHT liquid milk', detail: 'Long unopened shelf life widens reach', items: ['Vinamilk 100%', 'Dutch Lady (FrieslandCampina)'] },
        { label: 'Yogurt', detail: 'A chilled snack with more value per liter', items: ['Plain, sweetened, flavored', 'Drinking yogurt'] },
        { label: 'Plant-based drinks', detail: 'An alternative with a different nutrition profile', items: ['Soy milk such as Fami (Vinasoy)'] },
        { label: 'Pack sizes', detail: 'Change price per serving', items: ['Single-serve for school and on-the-go', 'Family cartons for home'] },
      ],
      note: 'SIG states one aseptic filling machine can produce up to 16 product variants, which is how processors run several sizes on one line.',
      takeaway: 'Formats and pack sizes let mainstream brands serve more occasions without competing on price alone.',
    },
  },
  '03 How Do Positioning and Portfolio Strategy Drive Mix?': {
    heading: 'A premium needs a reason the shopper can verify',
    intro: 'Premium dairy can sell well above mass-market prices, but only with proof. Test a premium proposition against the evidence shoppers expect.',
    spec: {
      layout: 'decision', title: 'How Do Positioning and Portfolio Strategy Drive Mix?', kicker: '',
      root: { label: 'A premium dairy product', detail: 'Organic, premium fresh, A2, premium plant-based or specialized nutrition' },
      question: 'Is there a clear, credible reason to pay more?',
      branches: [
        { condition: 'Verified benefit', outcome: 'A wide price gap can hold', detail: 'Certified organic (TH’s European certification, April 2017) or specialized nutrition with credible claims', tone: 'positive' },
        { condition: 'Benefit unclear', outcome: 'Shoppers will not pay the gap', detail: 'A2’s claim concerns protein composition, not lactose, so the reason must be explained', tone: 'caution' },
        { condition: 'Costly to serve', outcome: 'Margin erodes', detail: 'Chilled fresh milk lasts days, raising waste and stockout risk', tone: 'negative' },
      ],
      note: 'The source estimates some premium products cost 30% to more than 100% above mass-market alternatives; this is indicative, not a universal premium.',
      takeaway: 'The larger the price gap, the stronger the proof the consumer expects.',
    },
  },
  '01 How Are Dairy Consumers Segmented?': {
    heading: 'What parents weigh before buying children’s milk',
    intro: 'Parents buy for their children, so trust often outweighs price. See the four criteria behind the choice and the rules that frame it.',
    spec: {
      layout: 'driverTree', title: 'How Are Dairy Consumers Segmented?', kicker: '',
      root: { label: 'A parent’s choice of children’s milk', detail: 'A trust-driven decision made by parents or caregivers' },
      drivers: [
        { label: 'Growth and development', detail: 'Stage-based formulas: infant, follow-on, growing-up' },
        { label: 'Nutritional composition', detail: 'Protein, calcium, vitamin D, DHA and HMO, matched to the child' },
        { label: 'Brand trust', detail: 'Established brands and clear labeling lower perceived risk' },
        { label: 'Price sensitivity', detail: 'Some buy premium; others compare unit prices, packs and promotions' },
      ],
      note: 'Price Law 2023 (effective 1 July 2024) lists milk for children under 6 for price stabilization; Circular 33/2024/TT-BYT governs formula for children up to 36 months and price declarations.',
      takeaway: 'Communicate age suitability, composition and quality clearly, without unsupported health claims.',
    },
  },
  '02 What Do Institutional and B2B Customers Need?': {
    heading: 'Young shoppers try; fitness-minded adults compare labels',
    intro: 'Younger consumers and fitness-oriented adults both buy dairy, for different reasons. Compare what each group looks for and what earns its repeat purchase.',
    spec: {
      layout: 'compare', title: 'What Do Institutional and B2B Customers Need?', kicker: '',
      leftTitle: 'Students and young consumers', rightTitle: 'Adults and fitness-oriented consumers',
      rows: [
        { label: 'Main needs', a: 'Convenience, appealing flavors, affordable prices', b: 'Protein, sugar management, digestive comfort' },
        { label: 'Typical products', a: 'Ready-to-drink packs, flavored milk, drinking yogurt', b: 'High-protein, unsweetened and lactose-free lines' },
        { label: 'What drives the choice', a: 'Packaging, novelty and promotions', b: 'Protein and sugar per serving, ingredient transparency' },
        { label: 'What builds repeat', a: 'Brand and digital engagement after trial', b: 'Claims backed by composition and evidence' },
      ],
      note: 'In 2024 modern trade was about 27% and e-commerce about 11% of Vietnam’s retail sales (Cimigo), channels where promotions are easy to compare.',
      takeaway: 'Flavor and convenience win trial with the young; measurable attributes win the label-reading adult.',
    },
  },
  '03 How Do Consumption Occasions Shape Choice?': {
    heading: 'Older adults buy suitability; businesses buy reliability',
    intro: 'Older consumers and business customers judge dairy on very different terms. Group what each one needs from a supplier.',
    spec: {
      layout: 'taxonomy', title: 'How Do Consumption Occasions Shape Choice?', kicker: '',
      root: 'Two segments, two sets of needs', rootDetail: 'Suitability defines older adults; partnership defines B2B buyers',
      groups: [
        { label: 'Older adults', detail: 'Position by need, not age alone', items: ['Bone health: calcium and vitamin D', 'Adequate protein', 'Specialized nutrition, not interchangeable', 'Routine-based brand loyalty'] },
        { label: 'B2B customers', detail: 'Cafés, hotels, schools and hospitals', items: ['Supply reliability', 'Consistent taste and texture', 'Volume pricing and payment terms', 'Food safety documentation'] },
      ],
      note: 'Abbott’s Vietnam range includes Ensure, Glucerna and PediaSure, each for a different purpose. Many processors depend on imported powders, whey, butter and cheese (USDA), which makes reliability a selling point.',
      takeaway: 'Responsible, need-based claims win older adults; dependable service builds long B2B relationships.',
    },
  },
  '01 How Do Volume, Price, and Product Mix Create Revenue?': {
    heading: 'Split revenue three ways before judging growth',
    intro: 'Dairy revenue comes from several products, channels and markets. Break it down along each lens to see dependence and growth options.',
    spec: {
      layout: 'table', title: 'How Do Volume, Price, and Product Mix Create Revenue?', kicker: '',
      headers: ['Revenue lens', 'What to split', 'What the evidence shows'],
      rows: [
        { label: 'Product category', a: 'Liquid milk, powder, yogurt, condensed milk, cream, butter, cheese', b: 'Liquid and powdered milk are over 70% of market revenue (VnEconomy)' },
        { label: 'Channel', a: 'Distributors, retailers, food service, institutions', b: 'Retail in 2024: about 62% traditional, 27% modern, 11% e-commerce (Cimigo)' },
        { label: 'Geography', a: 'Domestic market versus exports and overseas operations', b: 'Vinamilk: overseas business 20% of revenue, up 15%, in 65 markets (2025 annual report)' },
      ],
      note: 'The source’s roughly 80% domestic share for Vinamilk should be checked against the reporting year and accounting definition.',
      takeaway: 'Assess each category, channel and market for contribution and profitability, not just total revenue.',
    },
  },
  '02 How Do Raw Milk, Feed, Packaging, and Processing Shape Cost?': {
    heading: 'Net price on one side, three cost blocks on the other',
    intro: 'A dairy price must satisfy shoppers, channels, costs and regulators at once. See how pricing choices and the main cost categories meet in the margin.',
    spec: {
      layout: 'driverTree', title: 'How Do Raw Milk, Feed, Packaging, and Processing Shape Cost?', kicker: '',
      root: { label: 'Operating margin' },
      formula: 'Margin = net price − (COGS + selling and marketing + administration and R&D)',
      drivers: [
        { label: 'Net price', op: '+', children: [{ label: 'Premium or competitive pricing' }, { label: 'Less trade discounts and listing fees' }, { label: 'Price rules for some under-six products' }] },
        { label: 'COGS', detail: '55–60% of revenue: raw milk, imported powder, packaging, manufacturing', op: '−' },
        { label: 'Selling and marketing', detail: '20–25%: advertising, promotions, distributor incentives', op: '−' },
        { label: 'Administration and R&D', detail: '5–7%: overhead, compliance, formulation and testing', op: '−' },
      ],
      note: 'Cost shares are illustrative estimates; accounting classifications differ, so use company financial statements. Domestic raw milk covers only about 38-40% of demand, linking COGS to world prices.',
      takeaway: 'Check willingness to pay, channel needs, cost and regulation together in any dairy pricing case.',
    },
  },
  '03 How Do Gross Margin, Inventory, and Working Capital Affect Profitability?': {
    heading: 'Gross margin tests pricing; net margin tests everything else',
    intro: 'Two margins answer two different questions. Compare what each one measures before using a cited range.',
    spec: {
      layout: 'compare', title: 'How Do Gross Margin, Inventory, and Working Capital Affect Profitability?', kicker: '',
      leftTitle: 'Gross margin', rightTitle: 'Net profit margin',
      rows: [
        { label: 'Formula', a: '(Revenue − COGS) ÷ revenue', b: 'Net profit ÷ revenue' },
        { label: 'Cited ranges', a: 'Industry 35–42%; Vinamilk about 41.7–41.9%', b: '12–16%, varying by company, year and accounting' },
        { label: 'What it captures', a: 'Pricing power and input costs', b: 'Overhead, financing and tax as well' },
        { label: 'Example', a: 'Fonterra adjusts product mix through the season', b: 'Lactalis 2024: €1.4 billion operating income, €359 million net (1.2%)' },
      ],
      note: 'All ranges are source estimates; compare companies only on the same period, cost classification and peer group.',
      takeaway: 'Utilization, procurement and planning can lift margin without raising prices.',
    },
  },
  '01 How Do General and Modern Trade Differ?': {
    heading: 'Keeping thousands of small shops stocked',
    intro: 'General trade gives dairy brands reach into neighborhoods and rural areas. See what decides availability across a large outlet network.',
    spec: {
      layout: 'driverTree', title: 'How Do General and Modern Trade Differ?', kicker: '',
      root: { label: 'Availability in general trade', detail: 'Traditional grocery stores and neighborhood shops' },
      drivers: [
        { label: 'Distributor coverage', detail: 'Determines whether rural and neighborhood outlets carry the product' },
        { label: 'Route planning', detail: 'Organizing visits to serve many small outlets efficiently' },
        { label: 'Replenishment', detail: 'Delivery frequency and restocking to avoid stockouts' },
        { label: 'Outlet base', detail: '200,000+ outlets cited; needs a defined company, scope and year' },
      ],
      note: 'Share estimates disagree: the source shows 60.5% (2020) falling to 56.1% (2024); Cimigo puts traditional trade near 62% in 2024 and FiinGroup near 55% in 2023. Modern grocery penetration was about 11% in 2023 against a 34% regional median (Vietcap).',
      takeaway: 'General trade gives reach but raises cost to serve, so compare coverage against control and cost.',
    },
  },
  '02 How Do Foodservice and Institutional Channels Work?': {
    heading: 'Renting shelf space versus running your own stores',
    intro: 'Supermarket chains and company-owned stores both give dairy brands organized retail. Compare what each offers and what it costs.',
    spec: {
      layout: 'compare', title: 'How Do Foodservice and Institutional Channels Work?', kicker: '',
      leftTitle: 'Modern trade', rightTitle: 'Owned retail (D2C)',
      rows: [
        { label: 'Examples', a: 'WinMart, Co.opmart, GO!; WinMart+ added 718 stores in nine months of 2025', b: 'Vinamilk stores (653 in 2023); nearly 400 TH true mart stores' },
        { label: 'What it gives', a: 'Structured merchandising and visibility for organic and new products', b: 'Control of presentation, service and first-party data' },
        { label: 'What it costs', a: 'Listing fees, promotions and retailer bargaining power', b: 'Stores, staff, technology, inventory and delivery' },
        { label: 'Reported share', a: 'About 20% of revenue (source); 27%–33% of retail by other estimates', b: 'Vinamilk store revenue up 13% in 2023' },
      ],
      note: 'Chilled products in either channel need disciplined storage and rotation to limit spoilage.',
      takeaway: 'Judge modern trade on shelf productivity and terms, and owned stores on whether they beat third-party retail.',
    },
  },
  '03 How Are E-commerce and Direct Channels Changing Sales?': {
    heading: 'Big accounts and online orders each set their own conditions',
    intro: 'Key accounts and online channels add recurring volume and data, but each sets demanding terms. Read what each buyer type needs and what to watch.',
    spec: {
      layout: 'table', title: 'How Are E-commerce and Direct Channels Changing Sales?', kicker: '',
      headers: ['Channel', 'What the buyer needs', 'What to watch'],
      rows: [
        { label: 'Cafés and restaurants', a: 'The same taste and performance in every batch', b: 'Condensed milk makes café chains big bulk buyers' },
        { label: 'Hotels and catering', a: 'Predictable deliveries in bulk quantities', b: 'Logistics reliability is part of the product' },
        { label: 'Schools and hospitals', a: 'Specifications, procurement documents, food safety compliance', b: 'Documentation is part of the sale' },
        { label: 'Marketplaces', a: 'Shopee and Lazada: reach and easy price comparison', b: 'Platform fees; e-commerce about 11% of 2024 retail (Cimigo)' },
        { label: 'Brand-owned sites and apps', a: 'Direct ordering, education and repeat purchase', b: 'Profit after delivery, packaging and returns' },
      ],
      note: 'Shelf-stable cartons, powder and multipacks ship more easily than chilled products. Vinamilk reports over 4 million online orders in 2023.',
      takeaway: 'Key accounts bring volume and dependence; online growth only counts if orders stay profitable.',
    },
  },
  '01 How Do Farms, Processors, and Ingredient Suppliers Interact?': {
    heading: 'The specialist suppliers behind every carton',
    intro: 'Dairy companies depend on a network of specialized suppliers. See what each supplier group provides and why losing one would hurt.',
    spec: {
      layout: 'ecosystem', title: 'How Do Farms, Processors, and Ingredient Suppliers Interact?', kicker: '',
      center: { label: 'Dairy farms and processors', detail: 'Quality, cost and reliability depend on upstream suppliers' },
      actors: [
        { label: 'Livestock genetics suppliers', relation: 'Breeding stock and services that build yield and herd health over years', flows: ['product', 'service'] },
        { label: 'Feed companies', relation: 'De Heus, Cargill and CP supply animal nutrition, a major cost and quality input', flows: ['product', 'money'] },
        { label: 'Packaging system suppliers', relation: 'Tetra Pak and SIG aseptic systems set shelf life and distribution options', flows: ['product', 'service'] },
        { label: 'Equipment and consumables', relation: 'Milking, refrigeration, cleaning, lab materials and maintenance; downtime has direct cost', flows: ['product', 'service', 'risk'] },
      ],
      note: 'Vietnam’s dairy herd grew from about 228,000 head in 2014 to roughly 335,000 in 2024, about 3.3 dairy cows per 1,000 people (VnEconomy).',
      takeaway: 'Map critical inputs and ask how easily each supplier could be replaced.',
    },
  },
  '02 How Do Retailers and Distributors Influence Value Capture?': {
    heading: 'Who makes the dairy and who carries it to the shelf',
    intro: 'Manufacturers turn milk into products; partners move them to shoppers. Group the players by the role they play.',
    spec: {
      layout: 'taxonomy', title: 'How Do Retailers and Distributors Influence Value Capture?', kicker: '',
      root: 'Dairy manufacturing and distribution', rootDetail: 'Value depends on efficiency, quality, brands and reliable delivery',
      groups: [
        { label: 'Domestic manufacturers', items: ['Vinamilk', 'TH true MILK', 'Moc Chau Milk', 'Nutifood', 'IDP'] },
        { label: 'Multinationals', items: ['FrieslandCampina', 'Nestlé', 'Abbott'] },
        { label: 'Distribution and logistics', items: ['Regional and local distributors', 'Third-party logistics (3PL)', 'Cold-chain operators'] },
        { label: 'Retail partners', items: ['WinMart and WinMart+', 'Co.opmart', 'GO!', 'E-commerce platforms'] },
      ],
      note: 'Reconstituted powder’s share of Vietnam’s liquid milk fell from 92% in 2008 to 32.3% in 2023 (VnEconomy), a shift toward fresh milk processing.',
      takeaway: 'Compare domestic and multinational players on capabilities, and partners on reliable delivery in the right condition.',
    },
  },
  '03 How Do Regulators and Supporting Institutions Shape the Ecosystem?': {
    heading: 'Rule-makers and helpers around a dairy business',
    intro: 'Regulators set the framework; associations, researchers and financiers help companies work within it. See what each one contributes.',
    spec: {
      layout: 'ecosystem', title: 'How Do Regulators and Supporting Institutions Shape the Ecosystem?', kicker: '',
      center: { label: 'Dairy business', detail: 'Must track current rules, keep documentation and build compliance into operations' },
      actors: [
        { label: 'Agriculture and livestock authorities', relation: 'Animal health and farming rules; a 60% raw-milk self-sufficiency aim for 2030', flows: ['oversight'] },
        { label: 'Ministry of Health', relation: 'Food safety, nutrition information, formula rules and price stabilization for under-6 milk', flows: ['oversight'] },
        { label: 'Trade and finance authorities', relation: 'Imports, exports, taxation and price management', flows: ['oversight', 'money'] },
        { label: 'Vietnam Dairy Association (VDA)', relation: 'Represents industry interests; first congress 25 March 2010', flows: ['information'] },
        { label: 'Research and international bodies', relation: 'Universities, IDF, IFCN and FAO supply evidence, benchmarks and data', flows: ['information'] },
        { label: 'Financial partners', relation: 'Banks and equipment financing set the pace of modernization', flows: ['money'] },
      ],
      note: 'Agency responsibilities can overlap and change, so consult current official regulations rather than historical descriptions.',
      takeaway: 'Include a compliance and policy-change check in any dairy industry case.',
    },
  },
};
