import type { RetailSectorContent } from './retailSectorTypes';

export const RETAIL_GROCERY_CONTENT: RetailSectorContent = {
  modules: {
    'How the Industry Works': 'Understand what grocery and general merchandise retail covers — the formats, the categories, and the high-frequency shopper demand that drives them.',
    'How Value Moves Through the Industry': 'Follow the journey from supplier and farm through distribution centres and cold chain to the shelf and the checkout.',
    'How Companies Make Money': 'Explore the business models grocers use, the products and customers they serve, how revenue and costs work, how products reach shoppers, and the ecosystem around them.',
    'Who Competes—and Why They Win': 'Understand how supermarket chains, minimarket networks, wet markets, and online grocers compete on price, proximity, and availability.',
    'What Is Changing Next': 'Explore how modern trade expansion, online grocery, and fresh-food demand are reshaping Vietnamese grocery retail.',
  },
  lessons: {
    'm1-scope': {
      description: 'Learn which formats, categories, and activities belong to grocery and general merchandise retail — and where its boundaries sit.',
      takeaways: [
        'The sector spans hypermarkets, supermarkets, minimarkets and convenience stores, cash-and-carry wholesale, and traditional wet markets and grocery stalls.',
        'Assortment splits into fresh (produce, meat, seafood), packaged food and beverages, and non-food general merchandise — each with very different handling and margin profiles.',
        'Grocery is defined by high purchase frequency and low basket value, which makes availability and proximity matter more than brand prestige.',
      ],
    },
    'm1-history': {
      description: 'Follow the developments that moved grocery from traditional markets to self-service supermarkets and modern minimarket chains.',
      takeaways: [
        'Self-service formats replaced counter service and shifted labour cost from the retailer to the shopper, enabling far wider assortments.',
        'Scanning, barcodes, and point-of-sale data turned grocery into a data business, enabling category management and precise replenishment.',
        'In Vietnam, modern trade grew from a small base alongside a dominant traditional-trade sector, and minimarkets rather than hypermarkets became the main expansion format.',
      ],
    },
    'm1-global': {
      description: 'Explore the global scale of grocery retail, the leading operators, and the formats that dominate different markets.',
      takeaways: [
        'Grocery is the largest retail sector globally by turnover, but operates on some of the thinnest net margins in retail.',
        'Leading international grocers compete through scale purchasing, private label penetration, and supply chain efficiency rather than price alone.',
        'Format mix varies sharply by market: hypermarkets dominate some countries while discounters or convenience formats lead others.',
      ],
    },
    'm1-vietnam': {
      description: 'See how grocery and general merchandise retail is organised in Vietnam and what shapes local performance.',
      takeaways: [
        'Vietnam combines modern-trade chains such as WinMart and WinMart+, Co.opmart, Bach Hoa Xanh, GO!/Big C, and MM Mega Market with a very large traditional-trade base.',
        'Traditional trade — wet markets and small grocery stores — still accounts for a major share of grocery volume, especially for fresh food.',
        'Modern-trade growth has concentrated on small-format minimarkets close to residential areas rather than large out-of-town stores.',
      ],
    },
    'm1-drivers': {
      description: 'Understand how incomes, urbanisation, food safety concerns, and regulation move grocery retail.',
      takeaways: [
        'Urbanisation and smaller households favour frequent small-basket shopping at nearby stores over weekly stock-up trips.',
        'Food safety and traceability concerns are a primary reason shoppers migrate from wet markets to modern trade for fresh categories.',
        'Inflation in staple food prices has an immediate and visible effect on basket size and on the mix between branded and private-label goods.',
      ],
    },

    'm2-overview': {
      description: 'See the stages, partners, and flows that connect suppliers and farms to the grocery shelf.',
      takeaways: [
        'The chain runs supplier and farm sourcing, consolidation and distribution, store replenishment, shelf availability, and checkout.',
        'Fresh and ambient goods follow separate physical flows: fresh needs cold chain and daily replenishment, ambient can be cycled less often.',
        'Point-of-sale data flows back upstream and drives ordering, so information accuracy determines physical availability.',
      ],
    },
    'm2-sourcing': {
      description: 'Explore how grocers buy: supplier negotiation, farm sourcing, private label, and the cost drivers behind shelf price.',
      takeaways: [
        'Grocery buying is a continuous negotiation over cost price, trade terms, promotional funding, and listing rather than a seasonal commitment.',
        'Private label raises percentage margin and differentiates the assortment, but requires the retailer to own quality control and demand risk.',
        'Fresh sourcing often runs through farm partnerships and collection points to secure consistent supply, grading, and traceability.',
      ],
    },
    'm2-logistics': {
      description: 'Understand how distribution centres, cold chain, and replenishment keep the shelf full without overstocking.',
      takeaways: [
        'Centralised distribution lowers unit logistics cost and improves availability compared with direct-to-store delivery from many suppliers.',
        'Cold-chain integrity across storage, transport, and in-store display determines shrink and food safety in fresh categories.',
        'Shrink — spoilage, damage, and loss — is a direct margin cost and is managed through ordering accuracy, rotation, and markdown timing.',
      ],
    },
    'm2-stores': {
      description: 'Learn how store formats, location choices, and daily execution shape grocery network performance.',
      takeaways: [
        'Format choice sets the economics: a minimarket trades a narrow range and high rent per square metre for proximity and frequency.',
        'Catchment density and walking or riding distance matter more than mall footfall for everyday grocery missions.',
        'Planogram compliance, shelf replenishment discipline, and queue management are the daily execution levers that protect sales.',
      ],
    },
    'm2-customer': {
      title: 'Inputs, Outputs & Value Creation',
      subtitle: 'Resources, Results, and Value Capture',
      description: 'Map the inputs retailers combine, the outputs they are judged on, and how value is created, captured, and distributed.',
      takeaways: [
        'Retail productivity comes from combining merchandise, infrastructure, capital, people, technology, and information effectively, not from investment alone.',
        'High sales do not prove value creation if they come with excess inventory, low margins, high fulfilment cost, or waste.',
        'The lowest purchase price is not always the lowest total cost once transport, storage, handling, losses, and financing are counted.',
      ],
    },
    'm2-value': {
      title: 'Global vs. Local Value Chain',
      subtitle: 'Sourcing Reach, Resilience, and Vietnam',
      description: 'Compare global and local sourcing networks, see how Vietnam’s chain mixes them, and decide where each fits.',
      takeaways: [
        'Global sourcing widens choice and scale but adds landed-cost, lead-time, currency, and compliance exposure.',
        'Local sourcing improves freshness and responsiveness where domestic suppliers can meet quality, volume, and traceability needs.',
        'The best value chain is product-specific: hybrid models that combine both are more resilient than dependence on one source.',
      ],
    },

    'm3-models': {
      description: 'Compare large-format, convenience, traditional, digital, private-label, and franchise models and the trade-offs each makes between range, proximity, control, and capital.',
      takeaways: [
        'Large formats win on breadth and purchasing scale, but high fixed costs make sales productivity and inventory turnover critical.',
        'Convenience and traditional trade win on proximity and relationships, and are limited by space, cost per sale, and fragmented buying.',
        'Private label, direct-to-consumer, and franchising change who owns the product, the customer, and the capital, and all depend on standards and trust.',
      ],
    },
    'm3-assortment': {
      title: 'Products, Services & Segmentation',
      subtitle: 'Food, Merchandise, and Price Tiers',
      description: 'Map the food and general merchandise groups, the demand-based segments, and the price tiers that shape a grocery assortment.',
      takeaways: [
        'Grocery balances freshness, availability, affordability, and waste control, and each food category has its own shelf life and margin profile.',
        'General merchandise broadens revenue but can tie up working capital if the range grows too wide.',
        'A coherent assortment of tiers, national brands, and private labels gives customers a clear reason to shop at a retailer.',
      ],
    },
    'm3-segments': {
      description: 'Understand household, convenience, value-seeking, quality-conscious, and digital-first shoppers and what each needs from a retailer.',
      takeaways: [
        'Household shoppers value availability, total basket price, quality, and convenience, and routine shopping rewards predictability.',
        'Convenience shoppers trade range or price for time, so location, availability, and speed must back the premium.',
        'Quality-led shoppers reward trust, and digital-first shoppers expect accurate stock, clear fees, and reliable delivery.',
      ],
    },
    'm3-revenue': {
      description: 'See how grocers earn revenue from product sales and partnerships, where merchandise and operating costs sit, and how pricing turns into profit.',
      takeaways: [
        'Revenue growth must be read with gross margin, inventory turnover, and operating expenses, because discounting and fulfilment can lift sales without lifting profit.',
        'Merchandise cost and losses must be understood at category and item level, since selling price alone does not show profitability.',
        'A profitable overall assortment matters more than the margin on any single product, and thin net margins make waste and markdowns costly.',
      ],
    },
    'm3-store-economics': {
      title: 'Distribution & Sales Channels',
      subtitle: 'How Products Reach Shoppers',
      description: 'Follow how stores, wholesalers, marketplaces, and omnichannel fulfilment connect products to shoppers, and what each channel costs.',
      takeaways: [
        'Physical stores remain sales and access points, and their value depends on catchment demand, format fit, and sales per unit of space.',
        'Wholesalers and distributors widen coverage across fragmented retail but add cost, lead time, and distance from demand.',
        'Omnichannel advantage comes from integration, and last-mile grocery fulfilment is costly because baskets are small and often perishable.',
      ],
    },
    'm3-ecosystem': {
      description: 'Identify the participants, supporting providers, regulators, and power relationships that surround grocery retail, and how industry structure shapes competition.',
      takeaways: [
        'Retail performance depends on relationships across producers, manufacturers, importers, logistics providers, platforms, and customers, not only on stores.',
        'Supporting providers can differentiate, but dependence on one creates switching costs, and compliance is a basic requirement assessed by product and activity.',
        'Bargaining power is uneven and shifts, and industry structure includes switching costs, entry barriers, substitutes, and concentration.',
      ],
    },

    'm4-structure': {
      description: 'Analyse concentration within defined markets and formats, price and non-price competition, customer switching, entry barriers, and consolidation.',
      takeaways: [
        'Retailers do not compete in one uniform market, so concentration must be judged within a defined format, segment, and geography.',
        'Price is powerful, but lasting advantage needs a clear proposition backed by procurement, logistics, and store capability.',
        'Scale builds advantage in buying, technology, and logistics, while local knowledge and specialist offers still support smaller retailers.',
      ],
    },
    'm4-players': {
      description: 'Meet the global leaders, the major Vietnamese chains by format, and the digital platforms that compete with them.',
      takeaways: [
        'There is no single winning global model; leaders build capabilities that reinforce a chosen position.',
        'Vietnam\u2019s players compete in different formats, so they should be compared within grocery, large-format, and convenience segments.',
        'Marketplaces and social commerce reshape competition even for retailers with no online sales.',
      ],
    },
    'm4-benchmarking': {
      description: 'Build a benchmarking framework, compare global business models and Vietnam\u2019s grocery chains, and recognise the limits of the data.',
      takeaways: [
        'Benchmark scale and quality separately, using like-for-like peers, because store count and revenue alone do not show the strongest model.',
        'The strongest benchmark from global leaders is the capability behind the model, not its size.',
        'State the period, geography, segment, and metric of every figure, and mark data gaps instead of inventing precision.',
      ],
    },
    'm4-success': {
      description: 'Identify the capabilities a grocer must build to win consistently: efficient buying, reliable supply, viable stores, trust, digital integration, and execution.',
      takeaways: [
        'Sustainable price competitiveness comes from efficient procurement, less waste, and managed overhead, not from discounting alone.',
        'Availability and freshness depend on forecasting, supplier reliability, cold chain, and traceability, and network quality matters as much as size.',
        'Loyalty rests on consistent experience and trust, and digital capability and governance must be integrated to deliver at scale.',
      ],
    },
    'm4-swot': {
      description: 'Apply SWOT to the industry and to Vietnam, and work through the challenges of price pressure, fresh-food supply chains, digital transformation, and resilient expansion.',
      takeaways: [
        'Recurring demand sits beside thin margins and complex operations, so the central challenge is turning growth into sustainable profit.',
        'Vietnam\u2019s opportunity is to connect local suppliers, existing networks, modern distribution, and digital channels rather than to replace traditional retail.',
        'Growth must be supportable, with compliance, sustainability, and risk management built into core planning.',
      ],
    },

    'm5-consumer': {
      description: 'Track how value-seeking, health and food quality, convenience, digital engagement, and local relevance are changing grocery demand.',
      takeaways: [
        'Value-seeking means total value through price, freshness, quality, convenience, pack size, and promotions, not simply the cheapest product.',
        'Health positioning builds trust only with affordable access and credible evidence, and convenience has several dimensions beyond proximity.',
        'Personalisation works when it is relevant, transparent, and controllable, and local relevance differentiates when supply and quality are dependable.',
      ],
    },
    'm5-technology': {
      description: 'Explore AI, automation, unified commerce, retail media, traceability, and digital payments, and when each pays back.',
      takeaways: [
        'AI and automation pay when they improve measurable operational decisions and show a credible return after installation, integration, and training.',
        'Unified commerce depends on accurate inventory and efficient fulfilment, and retail media needs proof of reach, performance, and privacy.',
        'Traceability, cold-chain technology, and digital payments need reliable data, strong security, and inclusive options.',
      ],
    },
    'm5-channel': {
      description: 'Follow omnichannel integration, platform and social commerce, small-format growth, traditional and modern trade, regional expansion, and retail media collaboration.',
      takeaways: [
        'Omnichannel needs coordinated inventory, fulfilment, data, pricing, and service, and platforms widen reach but bring commissions and limited data.',
        'Small-format and regional growth are sustainable only when store economics and supply capacity support them.',
        'Traditional and modern trade will coexist, and retail media needs transparent measurement and supplier trust.',
      ],
    },
    'm5-regulatory': {
      description: 'Understand food safety and traceability, consumer protection, packaging and circular economy, food waste, energy, and responsible sourcing.',
      takeaways: [
        'Food safety and traceability are compliance duties and sources of trust, and prevention is more effective than reaction.',
        'Consumer-protection compliance must sit inside daily processes, and packaging should be judged across its full life cycle.',
        'Food-waste and energy projects improve profit and environment when measured, and sustainability needs targets, supplier accountability, and verifiable data.',
      ],
    },
    'm5-outlook': {
      description: 'Assess the 2026\u20132030 growth outlook and the strategic opportunities in modern trade, private label, supply chains, data, omnichannel, partnerships, and rural reach.',
      takeaways: [
        'Market growth, share gain, and profitable growth are different, and official targets are aims, not forecasts.',
        'Modern trade, private labels, integrated supply chains, and data-driven productivity are growth levers that must show measurable returns.',
        'Omnichannel, external growth, and rural reach need unit economics, integration capacity, and adaptation to local conditions.',
      ],
    },
  },
};
