import type { RetailSectorContent } from './retailSectorTypes';

export const RETAIL_FASHION_CONTENT: RetailSectorContent = {
  modules: {
    'How the Industry Works': 'Understand what fashion, sports, and lifestyle retail covers — apparel, footwear, accessories, and sporting goods — and the forces shaping shopper demand.',
    'How Value Moves Through the Industry': 'Follow the journey from design and sourcing, through distribution, to stores, e-commerce, and the shopper who finally buys.',
    'How Companies Make Money': 'Explore the business models, product ranges, customer segments, revenue and cost structure, sales channels, and ecosystem partners behind fashion, sports, and lifestyle retail.',
    'Who Competes—and Why They Win': 'Understand how international chains, local brands, department stores, and online marketplaces compete on assortment, price, and brand.',
    'What Is Changing Next': 'Explore how online channels, sustainability expectations, and changing shopper behaviour are reshaping fashion and lifestyle retail.',
  },
  lessons: {
    'm1-scope': {
      description: 'Learn which product categories, retail formats, and business activities belong to fashion, sports, and lifestyle retail — and where its boundaries sit.',
      takeaways: [
        'The sector spans apparel, footwear, accessories, sportswear, and sporting equipment sold through owned stores, department-store concessions, franchises, and online channels.',
        'Fashion retail is distinguished from most other retail by seasonality: assortments are planned in advance and have a limited commercial life before they must be marked down.',
        'The boundary with brand manufacturing is blurred — many fashion players both design the product and operate the stores that sell it.',
      ],
    },
    'm1-history': {
      description: 'Follow the developments that moved fashion retail from tailors and general stores to fast fashion, global chains, and omnichannel brands.',
      takeaways: [
        'Ready-to-wear manufacturing and standardised sizing turned clothing from a bespoke service into a retail product that could be stocked and compared.',
        'Fast fashion compressed design-to-shelf lead times, shifting competitive advantage from seasonal forecasting toward speed and in-season reaction.',
        'E-commerce and social media removed the store as the only point of discovery, forcing retailers to connect physical and digital experiences.',
      ],
    },
    'm1-global': {
      description: 'Explore the global scale of fashion and sportswear retail, the leading markets, and the business models that dominate them.',
      takeaways: [
        'Global fashion retail is concentrated among a small number of large groups operating vertically integrated specialty formats, alongside a long tail of local and independent players.',
        'Sportswear has grown faster than general apparel in many markets, supported by athleisure demand and brand-led marketing.',
        'Market size figures vary widely by source because some include footwear, accessories, and sporting equipment while others count apparel only — always check the definition.',
      ],
    },
    'm1-vietnam': {
      description: 'See how fashion, sports, and lifestyle retail is organised in Vietnam and what shapes local performance.',
      takeaways: [
        'Vietnam combines international specialty chains such as Uniqlo, Zara, H&M, and Decathlon with domestic brands, local chains, and a very large informal and market-stall segment.',
        'Vietnam is a major apparel and footwear manufacturing base, so domestic retail sits alongside — but is commercially separate from — a large export garment industry.',
        'Urban shopping-mall development in Hanoi and Ho Chi Minh City has been the main route to market for international brands entering the country.',
      ],
    },
    'm1-drivers': {
      description: 'Understand how incomes, shopper behaviour, technology, and regulation move fashion and lifestyle retail.',
      takeaways: [
        'Rising disposable income and a young urban population support premiumisation, while price sensitivity keeps value formats and promotions important.',
        'Social commerce and livestream selling have become significant demand channels, shortening the distance between discovery and purchase.',
        'Import duties, trade agreements, and e-commerce tax rules directly affect landed cost and therefore the retail price a brand can offer.',
      ],
    },

    'm2-overview': {
      description: 'See the stages, partners, and flows that connect design and sourcing to the shopper in fashion retail.',
      takeaways: [
        'The chain runs design and range planning, sourcing and manufacturing, distribution, store and online retail, and after-sales service.',
        'Product, information, and money move together: buying decisions made months ahead determine what can be sold, discounted, or reordered later.',
        'Fashion chains are unusually sensitive to timing — value is lost when the right product arrives in the wrong week or the wrong store.',
      ],
    },
    'm2-sourcing': {
      description: 'Explore how fashion retailers buy: vendor selection, range planning, private label, and the cost drivers behind each garment.',
      takeaways: [
        'Buying and merchandising teams commit to assortments, quantities, and price points well before the season, which makes forecasting accuracy a core competitive skill.',
        'Private label and own-brand ranges raise gross margin but transfer design, quality, and inventory risk onto the retailer.',
        'Fabric cost, labour, factory lead time, freight, and duty together set the landed cost that any retail price must cover.',
      ],
    },
    'm2-logistics': {
      description: 'Understand how distribution centres, replenishment, and inventory decisions keep the right product in the right store.',
      takeaways: [
        'Allocation decides which store receives which sizes and colours; poor allocation creates stockouts in one store and markdowns in another.',
        'Fashion inventory is a depreciating asset — the longer it sits, the less it is worth, so stock turn is watched as closely as gross margin.',
        'Omnichannel fulfilment such as ship-from-store and click-and-collect improves availability but raises handling cost and complicates stock accuracy.',
      ],
    },
    'm2-stores': {
      description: 'Learn how store formats, location choices, and daily execution shape the performance of a fashion retail network.',
      takeaways: [
        'Format choice — flagship, mall unit, outlet, concession, or franchise — determines rent, traffic quality, and the assortment a site can carry.',
        'Location economics turn on footfall, catchment income, anchor tenants, and lease terms rather than floor area alone.',
        'Visual merchandising, fitting-room experience, and staff product knowledge convert footfall into transactions.',
      ],
    },
    'm2-customer': {
      description: 'Trace the shopper journey from discovery through purchase to returns, exchanges, and repeat visits.',
      takeaways: [
        'Discovery increasingly begins online or on social platforms even when the purchase is completed in store, so the two channels must show consistent price and availability.',
        'Returns and exchanges are a structural cost in apparel because fit cannot be verified before purchase, and online return rates are materially higher than in store.',
        'Loyalty programmes and customer data turn one-off transactions into repeat purchase frequency, which is the cheapest source of growth.',
      ],
    },
    'm2-value': {
      description: 'Map where margin is created and captured across the fashion chain, and where it leaks away.',
      takeaways: [
        'Value is created through design relevance, sourcing efficiency, availability, and brand strength — not through any single stage alone.',
        'Markdown is the main source of margin leakage: the gap between planned and achieved gross margin usually reflects buying and allocation errors.',
        'Full-price sell-through is the clearest single indicator of whether a range matched demand.',
      ],
    },

    'm3-models': {
      description: 'Compare the operating models fashion retailers use and the trade-offs between margin, control, and investment.',
      takeaways: [
        'Vertically integrated specialty retail controls design, sourcing, and stores, which gives margin and speed but demands heavy capital and inventory risk.',
        'Multi-brand and department-store models carry third-party brands, lowering design risk but compressing margin and reducing differentiation.',
        'Franchise and distributor models let a brand enter a market with limited capital, at the cost of direct control over execution and customer data.',
      ],
    },
    'm3-assortment': {
      title: 'Products, Services & Segmentation',
      subtitle: 'Categories, Performance, and Price Tiers',
      description: 'Map the core product categories, performance and lifestyle ranges, and price tiers that shape a fashion, sports, and lifestyle portfolio.',
      takeaways: [
        'Apparel, footwear, and accessories are managed as categories that balance variety, relevance, pricing, and availability.',
        'Performance claims support premium pricing only when customers perceive a real benefit and the brand can substantiate it.',
        'Value, mid-market, premium, and luxury tiers need costs, product benefits, and customer experience that fit the tier being served.',
      ],
    },
    'm3-segments': {
      description: 'Understand who shops fashion and lifestyle retail, on which occasions, and what drives the choice.',
      takeaways: [
        'Segments are defined by lifestyle, occasion, and price sensitivity more than by demographics alone — the same shopper buys across tiers for different needs.',
        'Sports and athleisure buyers weigh performance claims and brand credibility alongside styling, which supports higher price points.',
        'Gifting, back-to-school, and seasonal peaks concentrate a disproportionate share of annual sales into a few trading weeks.',
      ],
    },
    'm3-revenue': {
      description: 'See how fashion retailers earn revenue, where their costs sit, and which levers actually move profit.',
      takeaways: [
        'Revenue comes from own-store sales, online sales, concessions, franchise and wholesale income, and in some cases licensing.',
        'The main cost blocks are cost of goods, rent, payroll, logistics, and marketing — rent and payroll are largely fixed, so sales density drives profitability.',
        'Gross margin after markdown, not headline gross margin, is the number that determines whether a season was profitable.',
      ],
    },
    'm3-store-economics': {
      title: 'Distribution & Sales Channels',
      subtitle: 'How Products Reach Shoppers',
      description: 'Compare physical stores, e-commerce, social commerce, and omnichannel fulfilment as routes from brand to shopper.',
      takeaways: [
        'A store is both a sales outlet and a brand environment, and each format has a distinct role in the network.',
        'Marketplaces bring reach while brand-owned channels bring customer data and control; online performance depends on more than traffic.',
        'Omnichannel needs connected inventory, data, systems, and processes, not just several channels.',
      ],
    },
    'm3-ecosystem': {
      description: 'Identify the suppliers, landlords, platforms, and regulators that surround fashion and lifestyle retail.',
      takeaways: [
        'Garment and footwear factories, fabric mills, and sourcing agents sit upstream and set cost, quality, and lead time.',
        'Shopping-mall operators and landlords are commercial partners whose leasing terms materially affect retail profitability.',
        'E-commerce marketplaces and logistics providers have become channel gatekeepers, influencing both reach and margin.',
      ],
    },

    'm4-structure': {
      description: 'Analyse concentration, entry barriers, buyer and supplier power, substitutes, and rivalry in fashion retail.',
      takeaways: [
        'Barriers to entry are low for a single store or online shop but high for a national chain, which needs capital, supply, and prime locations.',
        'Buyer power is high because switching cost is near zero and price comparison is immediate online.',
        'Rivalry is intense and often expressed through promotional depth, which is why discipline on markdown is itself a competitive capability.',
      ],
    },
    'm4-players': {
      description: 'Meet the international chains, local brands, and platforms shaping competition in Vietnam and the region.',
      takeaways: [
        'International specialty chains compete on range, speed, and global brand recognition supported by centralised sourcing.',
        'Domestic brands compete on local fit, price, and responsiveness to local taste, often with stronger traditional-trade and social-commerce reach.',
        'Online marketplaces aggregate many small sellers and compete primarily on price and convenience rather than brand.',
      ],
    },
    'm4-benchmarking': {
      description: 'Benchmark fashion retail competitors on positioning, price, assortment, store network, and channel reach.',
      takeaways: [
        'Compare rivals on store count and location quality, price architecture, option count, and the share of sales that is own-brand.',
        'Benchmarks only hold when the comparison uses the same category scope and reporting period.',
        'Channel mix is a differentiator in its own right: two retailers of similar size can have very different economics depending on their online share.',
      ],
    },
    'm4-success': {
      description: 'Identify the capabilities a fashion retailer must build to win consistently.',
      takeaways: [
        'Buying accuracy, supply responsiveness, location quality, brand clarity, and inventory discipline are the recurring winning capabilities.',
        'Speed matters more than perfect forecasting: the ability to react in season reduces both stockouts and markdown.',
        'Scale only helps when it is converted into better sourcing terms and higher sales density, not just more stores.',
      ],
    },
    'm4-swot': {
      description: 'Connect the strengths and opportunities of fashion retail with the weaknesses and threats leaders must manage.',
      takeaways: [
        'Strengths include brand equity, prime locations, and customer data; weaknesses centre on inventory risk and fixed lease commitments.',
        'Opportunities lie in online growth, athleisure, and underserved regional cities; threats include discount competition and shifting trend cycles.',
        'The hardest strategic choice is how much assortment risk to take for newness without eroding full-price sell-through.',
      ],
    },

    'm5-consumer': {
      description: 'Track how shopper expectations around value, sustainability, and self-expression are changing fashion demand.',
      takeaways: [
        'Shoppers increasingly expect both value and newness, which pressures retailers to improve speed without deepening discounts.',
        'Resale, rental, and second-hand platforms are normalising for a segment of consumers and compete for the same wardrobe spend.',
        'Athleisure and comfort-led dressing continue to blur the line between sportswear and everyday apparel.',
      ],
    },
    'm5-technology': {
      description: 'Explore the digital, data, and in-store technologies reshaping how fashion retail is run.',
      takeaways: [
        'Demand forecasting and allocation analytics reduce markdown by placing stock where it will sell at full price.',
        'RFID and unified inventory systems improve stock accuracy, which is the precondition for reliable omnichannel fulfilment.',
        'Virtual try-on and sizing tools target the return rate, which is the largest controllable cost in online apparel.',
      ],
    },
    'm5-channel': {
      description: 'Follow where growth is moving across malls, high street, marketplaces, and brand-owned digital channels.',
      takeaways: [
        'Growth is shifting toward brand-owned digital channels and social commerce, which protect margin and customer data better than marketplaces.',
        'Physical stores are being re-cast as discovery, fulfilment, and returns points rather than purely as points of sale.',
        'Regional and Tier 2 city expansion is a significant remaining growth channel in Vietnam.',
      ],
    },
    'm5-regulatory': {
      description: 'Understand the compliance, sustainability, and reporting changes affecting fashion retail operations.',
      takeaways: [
        'Labelling, origin, and import documentation requirements affect which products can be listed and at what landed cost.',
        'E-commerce tax and invoicing rules have tightened, which particularly affects online and social-commerce sellers.',
        'Sustainability claims now attract scrutiny, so material, recycling, and supply-chain statements need evidence rather than marketing language.',
      ],
    },
    'm5-outlook': {
      description: 'Assess the growth outlook, material risks, and strategic opportunities in fashion and lifestyle retail.',
      takeaways: [
        'Growth is more likely to come from higher sales density, better full-price sell-through, and online mix than from store count alone.',
        'The main risks are markdown pressure, rising rent and payroll, and trend misjudgement on committed inventory.',
        'Companies that pair disciplined buying with genuine channel integration are best positioned for the next phase.',
      ],
    },
  },
};
