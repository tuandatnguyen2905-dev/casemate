import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Packaged Food Module 03 (business models and economics), keyed by visualKind. */
export const PACKAGED_FOOD_M3_VISUALS: Record<string, ChapterVisual> = {
  'packaged-food-m3-31-1': {
    heading: 'Brand, factory and trade relationship can sit in different hands',
    intro: 'An Oreo pack may pass through several owners before it is opened. Compare what each business model owns and which companies in the chapter illustrate it.',
    spec: {
      layout: 'table', title: 'Who Owns, Produces, and Sells Packaged Foods?', kicker: '',
      headers: ['Business model', 'What it owns or controls', 'Illustration in the chapter'],
      rows: [
        { label: 'Integrated branded manufacturer', a: 'Brands, recipes, factories and route-to-market in one company', b: 'Mondelez: Cadbury, Milka, Oreo, Toblerone and Ritz' },
        { label: 'Specialist operator', a: 'A narrower category or capability rather than a broad portfolio', b: 'Concentrates expertise instead of spanning many categories' },
        { label: 'Local manufacturing and brand system', a: 'Factories in Vietnam, or Vietnamese brands with a broad commercial system', b: 'Orion Food Vina in Binh Duong and Bac Ninh; Masan Consumer' },
        { label: 'Acquisition for scale', a: 'Buys a factory, brands, commercial relationships or all three', b: 'Mondelez bought 80% of Kinh Do’s confectionery operation in 2014' },
      ],
      note: 'Mondelez’s US$36.441 billion FY2024 net revenue is one company’s result, and the reported VND7,846 billion for 80% of Kinh Do’s confectionery operation was a company-specific deal; neither is a benchmark.',
      takeaway: 'Ask separately who owns the brand, the factory and the customer relationship; the answer predicts the work each company must do.',
    },
  },
  'packaged-food-m3-31-2': {
    heading: 'Follow shopper demand to see whose biscuit it really is',
    intro: 'Two biscuits from the same type of line can earn for different owners. Ask who owns shopper demand, then read the scorecard each model is judged on.',
    spec: {
      layout: 'decision', title: 'Branded Manufacturers, Private Labels, and Contract Production', kicker: '',
      root: { label: 'A biscuit leaves the production line', detail: 'Similar factory work, different owner of the consumer relationship' },
      question: 'Who owns shopper demand?',
      branches: [
        { condition: 'The manufacturer’s own brand', outcome: 'Branded manufacturer', detail: 'Funds innovation, marketing and trade activation; watches penetration, price and positioning' },
        { condition: 'The retailer’s brand', outcome: 'Private-label supplier', detail: 'Makes a retailer-owned proposition; competes on specification, reliability, capacity and cost' },
        { condition: 'Neither: it sells production', outcome: 'Contract manufacturer', detail: 'Sells manufacturing performance; watches quality, delivery, yield and line utilization' },
      ],
      note: 'Nestlé’s CHF91.354 billion is total 2024 group sales, not confectionery revenue. Vietnam private-label penetration and contract-manufacturing margins are research gaps and stay unquantified.',
      takeaway: 'Brand ownership and factory ownership can be separated, and each model competes on a different capability.',
    },
  },
  'packaged-food-m3-31-3': {
    heading: 'Which line of the profit bridge each business model can move',
    intro: 'Every model starts from volume times realized price and subtracts the same cost lines. Look for the lines a brand owner, a contract producer and an integrated producer can structurally improve.',
    spec: {
      layout: 'driverTree', title: 'How Different Business Models Generate Profit', kicker: '',
      root: { label: 'Profit', detail: 'What remains of revenue after product, route-to-market and brand costs' },
      formula: 'Profit = volume × realized price − (ingredients + packaging + conversion + logistics + trade spend + brand investment)',
      drivers: [
        { label: 'Revenue', detail: 'Volume × realized price', op: '+', children: [
          { label: 'Brand-led lever', detail: 'Willingness to pay and repeat purchase' },
          { label: 'Mix and price-pack architecture', detail: 'Richer composition of products, packs, tiers and channels' },
        ] },
        { label: 'Ingredients, packaging and conversion', detail: 'Exposed to commodity inflation', op: '−', children: [
          { label: 'Production-led lever', detail: 'Reliable throughput and factory utilization' },
          { label: 'Integrated lever', detail: 'Scale procurement and localization' },
        ] },
        { label: 'Logistics, trade spend and brand investment', detail: 'Costs of reaching and persuading the shopper', op: '−', children: [
          { label: 'Distribution productivity', detail: 'More output from the same route-to-market' },
          { label: 'Operating leverage', detail: 'Fixed costs spread across greater or more valuable output' },
        ] },
      ],
      note: 'Orion’s KRW543.6 billion FY2024 consolidated operating profit (up 10.4%) and Masan Consumer’s Q3 2024 VND7.987 trillion revenue and 46.8% gross margin are company results with different measures and periods; they cannot be ranked.',
      takeaway: 'Treat a successful company’s result as evidence of a mechanism, then test whether that mechanism exists in the business you analyse.',
    },
  },
  'packaged-food-m3-32-1': {
    heading: 'HS 1704, 1806 and 1905: classify the recipe before the price',
    intro: 'Chocolate, biscuits, candy and savory snacks share a shelf but depend on different inputs. Read each family’s recipe exposure before judging its price or profit.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Packaged Food and Confectionery Categories', kicker: '',
      root: 'Packaged food and confectionery', rootDetail: 'Classify by product family; “snacks” alone is too broad for commercial analysis',
      groups: [
        { label: 'Biscuits and bakery', detail: 'HS heading 1905', items: ['Wheat, sugar and edible oil', 'Oreo and Ritz'] },
        { label: 'Chocolate confectionery', detail: 'HS heading 1806, cocoa-containing', items: ['Cocoa', 'Cadbury and KitKat'] },
        { label: 'Sugar confectionery', detail: 'HS heading 1704, without cocoa', items: ['Sugar and glucose systems', 'Bibica and Hai Ha'] },
        { label: 'Savory snacks', detail: 'Potato or corn based', items: ['Potato, corn and frying oil'] },
      ],
      note: 'HS descriptions come from a third-party reference, not an official WCO publication. Orion ChocoPie’s approximately 66% is a 2022 Nielsen estimate for Vietnam’s “pie” segment only, not confectionery overall.',
      takeaway: 'A cocoa shock reshapes a chocolate cost bridge but not a potato snack’s, so diagnose economics family by family.',
    },
  },
  'packaged-food-m3-32-2': {
    heading: 'Mainstream reach versus premium mix under one master brand',
    intro: 'A small premium pack and a large value pack can serve different shoppers within one brand. Compare how each tier earns value and what the company evidence does and does not show.',
    spec: {
      layout: 'compare', title: 'Mass-Market, Premium, and Product Segmentation', kicker: '',
      leftTitle: 'Mass market', rightTitle: 'Premium',
      rows: [
        { label: 'How it wins', a: 'Reach, affordability and volume', b: 'Higher willingness to pay through brand, recipe, format or experience' },
        { label: 'How value grows', a: 'More shoppers buying more units', b: 'Premiumisation: a richer product and price mix, not just volume' },
        { label: 'Pack and price signal', a: 'Large family pack: higher checkout ticket, better value per unit', b: 'Small premium pack: low ticket, high price per unit of weight' },
        { label: 'Company evidence', a: 'Vietnam keeps a broad mainstream, price-sensitive base', b: 'Mondelez chocolate revenue +7.4% in FY2024; Masan Convenience Food +11% in Q3 2024' },
      ],
      note: 'Both growth figures are corporate results, not market growth, and neither splits price, mix and volume. Tier, occasion, format, channel and need can each define a segment.',
      takeaway: 'Premiumisation works when shoppers perceive added value; raising price without a stronger proposition is a different strategy.',
    },
  },
  'packaged-food-m3-32-3': {
    heading: 'What each rung of the price-pack ladder is there to do',
    intro: 'A low-ticket pack may exist to recruit shoppers rather than to maximise margin. Read each portfolio role, the job it performs and the question to ask before keeping it.',
    spec: {
      layout: 'table', title: 'How Product Portfolios and Positioning Shape Pricing', kicker: '',
      headers: ['Portfolio role', 'Job in the ladder', 'Question to ask'],
      rows: [
        { label: 'Access pack', a: 'Protects reach with a low absolute ticket', b: 'Does it recruit shoppers a core or premium line can retain?' },
        { label: 'Everyday core', a: 'Drives repeat purchase', b: 'Is its price gap supported by a visible benefit?' },
        { label: 'Occasion pack', a: 'Serves a specific occasion and channel', b: 'Which occasion and channel does it actually serve?' },
        { label: 'Premium or gifting line', a: 'Captures greater willingness to pay', b: 'Is there a credible product, brand, format or occasion benefit?' },
        { label: 'Price-point defender', a: 'Holds a key price point as budgets change', b: 'What does it risk cannibalizing?' },
      ],
      note: 'Mondelez spans Oreo and Ritz biscuits and premium Toblerone; breadth diversifies exposure but does not remove input risk. About 2 kg per person in Vietnam versus roughly 3 kg globally (2022) is an industry estimate suggesting headroom, not proof of growth.',
      takeaway: 'Positioning makes the ladder believable; without a visible difference, a higher price looks arbitrary and invites trade-down.',
    },
  },
  'packaged-food-m3-33-1': {
    heading: 'Retail buyer, shopper, consumer and eater each make a separate call',
    intro: 'The person who pays the manufacturer is rarely the one who eats the snack. Follow the decision chain from shelf to repeat purchase and note which team serves each step.',
    spec: {
      layout: 'flow', title: 'Who Are the Customers and Consumers?', kicker: '',
      steps: [
        { label: 'Trade customer lists it', detail: 'Distributor or retailer decides whether the product reaches the shelf', kind: 'stage', owner: 'Sales' },
        { label: 'Shopper chooses and pays', detail: 'Decides whether it enters the basket; the pack must be recognisable and appealing', kind: 'decision', owner: 'Brand and Insights' },
        { label: 'Consumer uses it', detail: 'The person or household the product was bought for', kind: 'stage', owner: 'Brand and Insights' },
        { label: 'Eater tastes it', detail: 'Shopper, child, family member or gift recipient experiences taste and texture', kind: 'stage', owner: 'Innovation' },
        { label: 'Repeat purchase', detail: 'Consumer preference creates long-run demand', kind: 'outcome' },
      ],
      loop: 'For an impulse snack the roles may collapse into one person; across a household or a gift they separate.',
      note: 'WinMart reported Vietnamese-made goods at more than 90% of its 2024 offer: one retailer’s assortment, not a national sales share or a measured consumer preference.',
      takeaway: 'State whose problem you are solving: a key-account plan targets the retailer, a pack redesign the shopper, a reformulation the eater.',
    },
  },
  'packaged-food-m3-33-2': {
    heading: 'Checkout candy, family pack or Tết box: the occasion sets the format',
    intro: 'One consumer can buy three very different packs because the job keeps changing. Start from the occasion and see which format, price and purchase driver win.',
    spec: {
      layout: 'decision', title: 'Consumption Occasions and Purchase Drivers', kicker: '',
      root: { label: 'Occasion brief', detail: 'Who, when, where, need, product and price' },
      question: 'What job is this purchase doing?',
      branches: [
        { condition: 'Impulse at checkout', outcome: 'Visible single serve at a low ticket', detail: 'Availability and visibility convert immediate desire' },
        { condition: 'Everyday or on-the-go snacking', outcome: 'Portable, convenient, affordable pack', detail: 'Convenience converts desire; affordability controls access' },
        { condition: 'In-home sharing', outcome: 'Resealable or family format', detail: 'Taste and indulgence for a group, at good value' },
        { condition: 'Gifting at Tết or Mid-Autumn', outcome: 'Presentation suited to the recipient', detail: 'Suitability, trust and cultural timing matter beyond premium cues' },
      ],
      note: 'The chapter supports Tết and Mid-Autumn as important gifting contexts, but no verified percentage exists for their share of annual sales.',
      takeaway: 'Align pack, shelf, message and availability to the occasion’s job rather than to an average consumer.',
    },
  },
  'packaged-food-m3-33-3': {
    heading: 'Vietnam’s coexisting need spaces and the product choices they suggest',
    intro: 'Vietnamese demand is not moving in one direction. Read each need space with the commercial choice it suggests, and treat each as a hypothesis to test.',
    spec: {
      layout: 'taxonomy', title: 'How Vietnamese Consumer Preferences Are Changing', kicker: '',
      root: 'Vietnamese packaged-food demand', rootDetail: 'Simultaneous segments, not a single linear shift; one person can move between them',
      groups: [
        { label: 'Affordability', detail: 'Value-seeking family buyer', items: ['Accessible packs', 'Local propositions'] },
        { label: 'Convenience', detail: 'Urban convenience shopper', items: ['Portable formats'] },
        { label: 'Health and wellness', detail: 'Health-conscious consumer', items: ['Portion control', 'Reduced sugar or renovation'] },
        { label: 'Local relevance', detail: 'Strong local-taste affinity', items: ['Flavors suited to local habits'] },
        { label: 'Gifting and trade-up', detail: 'Tết gift buyer', items: ['Presentation and timing', 'Premium experiences'] },
      ],
      note: 'About 2 kg per person versus roughly 3 kg globally (2022) and a VND66 trillion forecast for 2025 are commercial estimates via VnExpress, not GSO actuals. More than 90% Vietnamese goods in WinMart’s offer is an assortment claim, not preference.',
      takeaway: 'Affordability, premiumisation, local relevance and wellness can grow at the same time, so validate each with current evidence before scaling.',
    },
  },
  'packaged-food-m3-34-1': {
    heading: 'Splitting a sales result into volume, realized price and mix',
    intro: 'A chocolate bar, a family biscuit pack and a Tết gift box create revenue differently. Break the top line into its drivers before explaining why it moved.',
    spec: {
      layout: 'driverTree', title: 'How Packaged Food Companies Earn Revenue', kicker: '',
      root: { label: 'Net revenue', detail: 'Branded SKU sales plus secondary streams' },
      formula: 'Core revenue = volume × realized price, shaped by mix',
      drivers: [
        { label: 'Volume', detail: 'Units sold' },
        { label: 'Realized price', detail: 'Revenue per unit after commercial terms', op: '×', children: [
          { label: 'List or shelf price', detail: 'Not revenue on its own' },
          { label: 'Promotions and discounts' },
          { label: 'Returns and channel terms' },
        ] },
        { label: 'Mix', detail: 'Category, tier, pack, occasion and channel composition', op: '±', children: [
          { label: 'Affordable everyday packs', detail: 'Protect reach' },
          { label: 'Tết and Mid-Autumn ranges', detail: 'Can lift mix' },
        ] },
        { label: 'Secondary streams', op: '+', children: [
          { label: 'Exports' },
          { label: 'B2B or foodservice supply', detail: 'Bakeries, cafés and caterers' },
          { label: 'Seasonal ranges', detail: 'Gift boxes and mooncakes' },
        ] },
      ],
      note: 'Mondelez’s FY2024 net revenues of US$36,441 million and 7.4% chocolate revenue growth are one company’s global results, not industry size or market growth. Orion held prices flat from 2018, prioritising volume and availability.',
      takeaway: '“Revenue increased” is not a diagnosis: ask whether shoppers bought more, paid more, traded up or shifted channel.',
    },
  },
  'packaged-food-m3-34-2': {
    heading: 'Where cocoa, flour, oil and freight enter the snack cost stack',
    intro: 'Two snacks at the same shelf price can carry very different cost exposures. Start with the category’s ingredient basket, then follow the product through the plant and route to market.',
    spec: {
      layout: 'pathway', title: 'Ingredients, Manufacturing, Packaging, and Distribution Costs', kicker: '',
      trunk: [
        { label: 'Recipe and pack', detail: 'Ingredients are the pivotal variable cost', kind: 'stage' },
      ],
      optionsLabel: 'Ingredient basket by category',
      options: [
        { label: 'Chocolate', detail: 'Cocoa; record cocoa inflation pressured Mondelez’s 2025 outlook' },
        { label: 'Biscuits and candy', detail: 'Sugar, wheat or flour, dairy, and edible or palm oil' },
        { label: 'Savory snacks', detail: 'Potatoes, corn and frying oil' },
      ],
      afterLabel: 'Layers above the ingredients',
      after: [
        { label: 'Packaging', detail: 'Much of it varies with production volume', kind: 'stage' },
        { label: 'Conversion in the plant', detail: 'Manufacturing labor, overhead and energy', kind: 'stage' },
        { label: 'Warehousing and transport', detail: 'Plus distributor economics on the route to market', kind: 'stage' },
        { label: 'Marketing and trade spending', detail: 'Selling costs that affect operating profit rather than gross profit', kind: 'outcome' },
      ],
      note: 'No verified itemized cost percentages exist in this research, so the stack is qualitative. Orion’s approximately 70% ingredient-cost surge is a company case, not an industry inflation rate.',
      takeaway: 'Name the cost that is structurally important for the specific category before proposing a response.',
    },
  },
  'packaged-food-m3-34-3': {
    heading: 'Mondelez margins at three levels show why the level must be named',
    intro: 'Gross, operating and net margin subtract different costs and can move very differently. Read each level with its secondary FY2024 and FY2025 ratios before comparing any company.',
    spec: {
      layout: 'table', title: 'Margins, Pricing, and Profitability Drivers', kicker: '',
      headers: ['Margin level', 'What it reflects', 'Mondelez FY2024 to FY2025 (secondary)'],
      rows: [
        { label: 'Gross margin', a: 'Revenue left after the company’s reported cost of goods', b: '39.12% to 28.38%' },
        { label: 'Operating margin', a: 'After operating expenses', b: '17.41% to 9.21%' },
        { label: 'Net margin', a: 'After financing, tax and other below-operating effects', b: '12.65% to 6.36%' },
      ],
      note: 'Mondelez ratios come from a secondary compilation of 10-K data and need primary reconfirmation. Masan Consumer’s 46.8% Q3 2024 gross margin covers a broader portfolio; Coca-Cola (61.06%) and PepsiCo (54.55%) are corporate comparators, not packaged-food averages.',
      takeaway: 'Margins recover only when price, mix and productivity outrun input inflation, so state the level, period and scope first.',
    },
  },
  'packaged-food-m3-35-1': {
    heading: 'Distributor breadth in general trade, account depth in modern trade',
    intro: 'General and modern trade are different outlet systems, not simply small versus large stores. Compare how each is reached, served and measured in Vietnam.',
    spec: {
      layout: 'compare', title: 'Understanding General Trade and Modern Trade', kicker: '',
      leftTitle: 'General trade (GT)', rightTitle: 'Modern trade (MT)',
      rows: [
        { label: 'Outlets', a: 'Fragmented independents: mom-and-pop shops and wet-market sellers', b: 'Supermarkets, hypermarkets, minimarts and convenience chains' },
        { label: 'How it is reached', a: 'Distributors and wholesalers hold inventory, break bulk and extend credit', b: 'Key accounts with negotiated listings, trade terms, promotions and shared planning' },
        { label: 'Core question', a: 'How many relevant outlets can we reach?', b: 'How well do we sell through once listed?' },
        { label: 'Vietnam position', a: 'Traditional channels still dominate overall', b: 'Top seven players held nearly 90% of modern-channel value in 2024' },
      ],
      note: 'Nearly 90% is concentration within modern-channel value, not total grocery; the overall Vietnam GT/MT value split is a research gap.',
      takeaway: 'For an impulse snack, being in reach and in stock at the moment of choice can beat a rival’s brand preference.',
    },
  },
  'packaged-food-m3-35-2': {
    heading: 'Why “digital” is too vague a label for wholesale, minimart and app channels',
    intro: 'The same biscuit can move by the carton, by the unit or in an app basket. Group the channels by the distribution job they solve rather than lumping them together as “digital”.',
    spec: {
      layout: 'taxonomy', title: 'Wholesale, Convenience Stores, and Digital Channels', kicker: '',
      root: 'Routes beyond the supermarket shelf', rootDetail: 'One portfolio, several service models',
      groups: [
        { label: 'Wholesale', detail: 'Aggregates demand and breaks bulk', items: ['Holds inventory', 'Resells in smaller lots'] },
        { label: 'Minimarts and convenience', detail: 'Proximity and frequent missions', items: ['WinCommerce: 3,733 stores as of September 2024', 'Bach Hoa Xanh'] },
        { label: 'Digital ordering', detail: 'Searchable assortment and delivery', items: ['E-commerce', 'Quick-commerce'] },
        { label: 'B2B and foodservice', detail: 'Business use cases', items: ['Bakeries', 'Cafés', 'Caterers'] },
      ],
      note: 'Vietcap identifies minimarts as a major growth format. No packaged-food e-commerce share or per-channel margin is verified in this research.',
      takeaway: 'Separate who holds stock, takes the order, fulfils it and owns the data; those jobs set each channel’s economics.',
    },
  },
  'packaged-food-m3-35-3': {
    heading: 'A listing only earns the right to compete for sell-through',
    intro: 'Shipping into a channel is not the same as shopper demand. Follow the execution loop from outlet selection to results review, and check cash as well as volume.',
    spec: {
      layout: 'flow', title: 'Distribution Economics and Commercial Execution', kicker: '',
      steps: [
        { label: 'Select outlets and assortment', detail: 'Balance reach against the cost and risk of service', kind: 'stage' },
        { label: 'Secure availability', detail: 'Sell-in places stock with distributors and retailers', kind: 'stage' },
        { label: 'Win visibility', detail: 'The correct shelf and displays', kind: 'stage' },
        { label: 'Activate promotion', detail: 'Trade spend must convert into sell-through', kind: 'stage' },
        { label: 'Replenish', detail: 'Keep product in stock where shoppers decide', kind: 'stage' },
        { label: 'Review results', detail: 'Numeric distribution, on-shelf availability, rate of sale, trade-spend effectiveness, returns, receivables', kind: 'outcome' },
      ],
      loop: 'The review resets the next round of outlet, assortment and trade-spend choices.',
      note: 'GT trades service complexity and credit risk for breadth; MT trades concentrated buyer power (nearly 90% of modern-channel value held by seven players) for scale and data. No margin or break-even benchmark is verified.',
      takeaway: 'Never celebrate shipment volume without checking sell-through and cash.',
    },
  },
  'packaged-food-m3-36-1': {
    heading: 'Farm to shelf: who supplies, governs and carries risk around the brand',
    intro: 'The brand on the pack is only the visible centre of the system. See what each stakeholder supplies, which flows tie it to the manufacturer and what risk it absorbs.',
    spec: {
      layout: 'ecosystem', title: 'Mapping the Packaged Food Ecosystem', kicker: '',
      center: { label: 'Food manufacturer and brand owner', detail: 'Carries product, brand and compliance risk' },
      actors: [
        { label: 'Agricultural producers and processors', relation: 'Supply cocoa and other inputs; face climate and commodity risk', flows: ['product', 'risk'] },
        { label: 'Ingredient and packaging suppliers', relation: 'Provide inputs and packaging; paid as cash moves upstream', flows: ['product', 'money'] },
        { label: 'Distributors and wholesalers', relation: 'Move product downstream; carry inventory and credit risk', flows: ['product', 'money', 'risk'] },
        { label: 'Retailers and foodservice', relation: 'Control access to the shelf and to shoppers', flows: ['product', 'money', 'information'] },
        { label: 'Consumers', relation: 'Create demand that pays for the whole system', flows: ['money', 'information'] },
        { label: 'Standards bodies', relation: 'Set standards that affect every stage', flows: ['oversight'] },
      ],
      note: 'Mondelez’s approximately 90% of cocoa via Cocoa Life and approximately 96% recyclable packaging (2024) are company metrics; the nearly 90% modern-channel concentration has a different denominator. Do not combine them.',
      takeaway: 'Map dependency and power together: what each party supplies, what risk it absorbs and how easily it can be replaced.',
    },
  },
  'packaged-food-m3-36-2': {
    heading: 'What suppliers, distributors and retailers trade besides product and cash',
    intro: 'Every commercial interface allocates service, information and risk as well as value. Compare what flows each way and where bargaining power is shifting.',
    spec: {
      layout: 'table', title: 'Commercial Relationships Across Suppliers and Channels', kicker: '',
      headers: ['Interface', 'What each side provides', 'Power or risk to watch'],
      rows: [
        { label: 'Supplier and manufacturer', a: 'Inputs and assurance, in return for demand and specifications', b: 'Cocoa scarcity can strengthen upstream pricing power' },
        { label: 'Manufacturer and distributor', a: 'Reach and working capital, in return for product and terms', b: 'Needed to reach fragmented traditional outlets; inventory and credit' },
        { label: 'Manufacturer and retailer', a: 'Shopper access and data, in return for listings and promotions', b: 'Seven players held nearly 90% of modern-channel value in 2024' },
        { label: 'Long-term sourcing programme', a: 'Supply and sustainability commitments, as in Cocoa Life', b: 'Sourcing percentage reported; no contract terms verified' },
      ],
      note: 'The cheapest quoted input is not necessarily the lowest total-risk option. No supplier, distributor or retailer margin splits are verified in this research.',
      takeaway: 'Negotiate total value, including quality, inventory, cash, data, compliance and resilience, not unit price alone.',
    },
  },
  'packaged-food-m3-36-3': {
    heading: 'Not every rule-setter binds: Codex, HS headings and Vietnam’s food-safety law',
    intro: 'A product can be commercially attractive and still fail on safety, labelling or classification. Group each institution by the kind of authority it holds before deciding who must respond.',
    spec: {
      layout: 'taxonomy', title: 'Regulators, Industry Associations, and Strategic Partnerships', kicker: '',
      root: 'Institutions around packaged food', rootDetail: 'Their authority and business implications are not interchangeable',
      groups: [
        { label: 'Binding national regulation', detail: 'Enforces applicable law in Vietnam', items: ['Law on Food Safety (2010)', 'Ministry of Health', 'Vietnam Food Administration'] },
        { label: 'International standards', detail: 'Reference frameworks, not a domestic regulator', items: ['Codex Alimentarius: joint FAO/WHO programme since 1963'] },
        { label: 'Trade classification', detail: 'Organises traded goods', items: ['HS Chapters 17, 18 and 19 (third-party reference)'] },
        { label: 'Collective and voluntary', detail: 'Coordinate interests or pursue shared outcomes', items: ['Industry associations', 'Strategic partnerships for sourcing, innovation and sustainability'] },
      ],
      note: 'No named Vietnamese confectionery association or exact EUDR dates are verified in this research; add them only from primary legal or association sources.',
      takeaway: 'Classify an instrument as binding, advisory, classificatory, collective or voluntary before deciding who owns the response.',
    },
  },
};
