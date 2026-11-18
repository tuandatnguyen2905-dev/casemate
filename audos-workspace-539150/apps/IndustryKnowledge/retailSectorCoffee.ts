import type { RetailSectorContent } from './retailSectorTypes';

export const RETAIL_COFFEE_CONTENT: RetailSectorContent = {
  modules: {
    'How the Industry Works': 'Understand what coffeehouse and foodservice retail covers — the store formats, the occasions, and the customer frequency that drives the model.',
    'How Value Moves Through the Industry': 'Follow the journey from bean and ingredient sourcing through roasting and commissary to the counter, the cup, and the customer.',
    'How Companies Make Money': 'Explore how coffee and foodservice chains earn: menu economics, ticket and frequency, delivery mix, and the unit economics of a single store.',
    'Who Competes—and Why They Win': 'Understand how international chains, local coffee brands, independent cafes, and street vendors compete on location, price, and experience.',
    'What Is Changing Next': 'Explore how delivery platforms, premium specialty coffee, and changing social habits are reshaping Vietnamese coffeehouse retail.',
  },
  lessons: {
    'm1-scope': {
      description: 'Learn how coffeehouse and foodservice retail is defined, which overlapping formats it includes, and how revenue and operating models differ.',
      takeaways: [
        'The industry is experience-driven, location-sensitive, and operationally intensive, so traffic, ticket, repeat visits, and store productivity jointly decide performance.',
        'Specialty coffeehouses, caf\u00e9 chains, independents, quick-service restaurants, casual dining, and bakery caf\u00e9s overlap, so rivals should be grouped by occasion, product mix, service model, and price.',
        'Company-owned, franchised, and hybrid models trade control against speed, and revenue growth means little if rent, labour, ingredients, and delivery commissions erode store margins.',
      ],
    },
    'm1-history': {
      description: 'Follow how coffeehouses became multi-purpose spaces, how foodservice became organised, and how digital channels reshaped ordering.',
      takeaways: [
        'The coffeehouse has moved from a product-centred venue to a multi-purpose space for convenience, social connection, work, leisure, and brand experience.',
        'Standardised recipes, central buying, and technology let chains scale, but scale raises the complexity of people, sites, and service quality.',
        'Digital channels create reach, but delivery commissions, discounts, and costs mean they do not automatically raise profit.',
      ],
    },
    'm1-global': {
      description: 'Read global coffee and foodservice market estimates with their definitions, and compare regional models and operating trends.',
      takeaways: [
        'Global coffee and foodservice coffee estimates use different definitions, so they cannot be compared or read as coffeehouse revenue.',
        'No single global model guarantees success, so operators adapt menus, prices, formats, and service to local patterns.',
        'Advantage is shifting toward integrating brand, operational discipline, digital engagement, and efficient fulfilment, and expansion without them adds complexity faster than value.',
      ],
    },
    'm1-vietnam': {
      description: 'See how large and fragmented Vietnam\u2019s foodservice market is, which coffeehouse formats compete, and how customers and channels shape pricing.',
      takeaways: [
        'Vietnam\u2019s foodservice market is large but fragmented, and different studies give different sizes that should not be combined.',
        'Coffeehouse formats range from sidewalk caf\u00e9s to local chains, specialty shops, and a few international brands, and chain estimates cover chains only.',
        'Customers are selective rather than uniformly trading up or down, and delivery commissions of about 20\u201330% reduce channel economics.',
      ],
    },
    'm1-drivers': {
      description: 'Understand how income, urbanisation, tourism, culture, technology, and regulation move coffeehouse and foodservice retail.',
      takeaways: [
        'Economic growth expands potential demand, but purchasing power and confidence decide how much becomes spending.',
        'Relevance needs more than following trends: local taste, a clear identity, consistent quality, and an experience worth repeating.',
        'Technology, food-safety rules, and invoicing duties shape cost and the ability to expand, and scaling without systems raises waste and compliance risk.',
      ],
    },

    'm2-overview': {
      description: 'See the stages, participants, and flows that connect ingredient sourcing to the cup in the customer\u2019s hand.',
      takeaways: [
        'The value chain is a connected operating system, and coordination between procurement, inventory, preparation, service, and forecasting decides consistency, speed, waste, and profit.',
        'Value and bargaining power are spread unevenly, favouring strong brands, scarce ingredients, customer relationships, and efficient distribution.',
        'Product, information, and financial flows must stay synchronised, because accurate sales data and timely replenishment cut stockouts, spoilage, and excess stock.',
      ],
    },
    'm2-sourcing': {
      description: 'Explore how coffee and foodservice chains source ingredients, process them into menu items, and manage supplier and equipment risk.',
      takeaways: [
        'Procurement is a cost function and a source of differentiation, aiming for consistent quality, availability, and appropriate cost rather than the lowest price.',
        'Product innovation creates value only when it can be delivered consistently and economically with the retailer\u2019s equipment, skills, and workflow.',
        'Supply resilience needs qualified alternatives, clear specifications, supplier monitoring, and contingency plans, with price swings and EU deforestation rules as live coffee risks.',
      ],
    },
    'm2-logistics': {
      description: 'Understand how warehousing, distribution, and production planning keep every outlet stocked, fresh, and traceable.',
      takeaways: [
        'Inventory management balances availability against waste and holding cost, with each product stored to its own temperature and shelf-life needs.',
        'Distribution should be designed around product characteristics and each outlet, and in Vietnam logistics cost is high with last-mile delivery the costliest leg.',
        'Forecasts, production schedules, inventory records, and quality controls should inform one another, with traceability records kept from receiving onward.',
      ],
    },
    'm2-stores': {
      description: 'Learn how store operations, customer service, and omnichannel delivery turn ingredients into customer experiences and profit.',
      takeaways: [
        'Store productivity depends on aligning people, equipment, menus, and workflows with demand, and format decides how complex operations are.',
        'Customer experience is built through repeated operational interactions, so reliable service and consistency turn first visits into habits.',
        'Delivery extends reach but adds commission, packaging, and congestion, so each channel should be judged on profit after all its costs.',
      ],
    },
    'm2-customer': {
      title: 'Inputs, Outputs & Value Creation',
      subtitle: 'Resources, Results, and Value Capture',
      description: 'Map the inputs a coffeehouse combines, the outputs customers value, and how financial value is created and measured.',
      takeaways: [
        'Retailers combine physical, human, financial, technological, and intangible inputs, and the lowest-cost input can be the costliest through waste or poor quality.',
        'Outputs include products, experiences, relationships, and information, and value is created when the experience meets expectations at a fair price.',
        'Store-level contribution and return on invested capital are more informative than sales growth alone.',
      ],
    },
    'm2-value': {
      title: 'Global vs. Local Value Chain',
      subtitle: 'Sourcing Reach, Resilience, and Vietnam',
      description: 'Compare global supply networks with Vietnam\u2019s domestic supply base, and see why fit between model and market decides advantage.',
      takeaways: [
        'Global sourcing gives access to quality, variety, and specialised capability but adds lead time, currency, freight, and supplier risk.',
        'Vietnam\u2019s domestic supply base can support cost and differentiation when quality control and supplier development are in place.',
        'International standards strengthen consistency and local knowledge improves relevance, so advantage depends on the fit between model and market.',
      ],
    },

    'm3-models': {
      description: 'Compare independent cafés, company-owned chains, franchise and agency networks, and hybrid or asset-light formats, and what each trades between control, capital, and speed.',
      takeaways: [
        'Independents compete on local identity and flexibility rather than scale, and they still earn most Vietnam food and beverage revenue while chains gain share from a small base.',
        'Company ownership gives control and full store profit but needs capital, while franchise and agency networks grow faster by depending on outside operators and supply income.',
        'Kiosks, shop-in-shop counters, and drive-throughs cut capital, but each trades away control, margin, or the customer relationship.',
      ],
    },
    'm3-assortment': {
      title: 'Products, Services & Segmentation',
      subtitle: 'Menu, Services, and Positioning',
      description: 'Map the menu architecture, service formats, and price positioning that shape a coffeehouse offer and who it serves.',
      takeaways: [
        'The menu is a sales plan: drinks bring traffic, while food, add-ons, and packaged products lift the ticket, and in one small Vietnam receipt study most visits were drink only.',
        'A service format is a bet on a consumption occasion, so study cafés, takeaway counters, drive-throughs, and delivery each need different space, staffing, and pricing.',
        'A price premium holds only with a visible difference behind it, and cost rises force a choice between price, portion, and margin.',
      ],
    },
    'm3-segments': {
      description: 'Understand demographic and lifestyle segments, behavioural occasions, and the needs and loyalty programmes that drive coffeehouse choice.',
      takeaways: [
        'A segment is useful only if it predicts a difference in behaviour, and in Vietnam students, budget-conscious Gen Z, and tourists are visible while other groups lack public data.',
        'Group size, adding food, and occasion move the ticket more than headline price, so operators should read their own receipts before assuming what a segment is worth.',
        'Quality and value win the visit, convenience and rewards win the return, and loyalty programmes work when they identify customers and reward repeat behaviour.',
      ],
    },
    'm3-revenue': {
      description: 'See how coffeehouse businesses earn revenue, how a cup splits into costs, and how store unit economics decide profit.',
      takeaways: [
        'Revenue comes from beverages, food, packaged goods, supply to agents, franchise fees, and delivery, and the first question about any figure is who actually earns it.',
        'Fixed costs spread over volume create operating leverage, so extra cups lift profit faster than sales and falling volume cuts it faster.',
        'Each store is judged on sales per day, break-even, and payback, and reported averages and payback ranges are indicative only.',
      ],
    },
    'm3-store-economics': {
      title: 'Distribution & Sales Channels',
      subtitle: 'How Products Reach Customers',
      description: 'Follow how physical stores, delivery platforms, direct digital channels, and integrated fulfilment get drinks to coffeehouse customers.',
      takeaways: [
        'The store is both factory and shop, so location is the main form of distribution, and store counts should be read with their dates and sources.',
        'Delivery platforms rent reach at the price of commission and customer data, and two platforms hold 96% of Vietnam delivery value, so brand-owned channels build a customer asset.',
        'Omnichannel growth adds value only when one operation can fulfil in-store, pre-order, and delivery orders without hurting service.',
      ],
    },
    'm3-ecosystem': {
      description: 'Identify the supply partners, platforms and gatekeepers, regulators, and associations that surround coffeehouse retail.',
      takeaways: [
        'Growers, roasters, ingredient and equipment suppliers, logistics, and technology vendors add capability but also create dependence.',
        'Delivery platforms, landlords, and retail partners control access to customers and take a share of value or set the terms.',
        'Food safety, e-invoicing, minimum wage, and packaging rules shape cost and the licence to operate, so operators should confirm current legal text before planning around a date.',
      ],
    },

    'm4-structure': {
      description: 'See how fragmented and consolidating coffeehouse and foodservice retail is, what rivals compete on, and which barriers shape entry and rivalry.',
      takeaways: [
        'The market is becoming more organised but is not chain-only: independents still earn about 91.7% of Vietnam F&B revenue while chains gain share from a small base.',
        'There is no single basis of competition, so brands should choose a coherent position and deliver it consistently at viable cost.',
        'Low barriers to opening one café do not mean low barriers to a sustainable chain, and several fast-growing chains have shrunk or exited.',
      ],
    },
    'm4-players': {
      description: 'Meet Highlands Coffee, Trung Nguyên, Phúc Long, Katinat, The Coffee House, Starbucks, and the adjacent formats that compete for the same occasions.',
      takeaways: [
        'Highlands competes on scale and accessibility and Trung Nguyên on coffee heritage and format diversity, and heritage works only when turned into a relevant experience.',
        'A strong brand and store concept do not guarantee growth: Phúc Long and Katinat expanded while The Coffee House shrank, and store counts are dated snapshots.',
        'The competitive set depends on the customer occasion, not the product category, so fast food, bakeries, convenience stores and tea chains also compete.',
      ],
    },
    'm4-benchmarking': {
      description: 'Benchmark rivals on network and coverage, the full customer proposition, and financial, operating and digital performance, using like-for-like data.',
      takeaways: [
        'Network scale matters when it improves accessibility and efficiency, and outlet count must be read with its date, definition and productivity.',
        'Benchmark the whole customer proposition, since the big chains’ reported price bands overlap and experience, space and taste separate them.',
        'Expansion and popularity are not proof of profit, so compare like with like and separate reported results from estimates.',
      ],
    },
    'm4-success': {
      description: 'Identify the product, site, operating and loyalty capabilities that decide who wins in coffeehouse retail.',
      takeaways: [
        'Winners give customers both a reason to visit and a reason to return: differentiation attracts, while consistent quality and value retain.',
        'Expansion quality is returns per outlet, not stores opened, and disciplined sites with repeatable operations turn brand demand into profit.',
        'Digital capability pays when it strengthens retention and operating decisions, supported by workforce and governance systems that scale.',
      ],
    },
    'm4-swot': {
      description: 'Connect the industry SWOT with the main strategic challenges and the responses and priorities that follow from them.',
      takeaways: [
        'The central opportunity is to turn strong consumer familiarity into differentiated businesses, and the principal risk is expanding or discounting without operating capability.',
        'The hardest challenge is balancing growth with economic sustainability, because cost pressure, imitation and complexity compound each other.',
        'The strongest response improves the whole business system, so customer value, cost efficiency, consistency and profitable growth reinforce one another.',
      ],
    },

    'm5-consumer': {
      description: 'See how experience-led visits, value-conscious spending, and health and personalisation preferences are changing coffeehouse demand.',
      takeaways: [
        'The café experience is becoming part of the product, but experiential investment must generate enough traffic and spending to justify its cost.',
        'The market is moving toward value justification: in Vietnam, drink spending shifted out of the cheapest band into the mid-priced band, so every price point needs a visible reason.',
        'Personalisation pays when it adds relevance without friction, and Vietnam’s data law now requires clear, recorded consent.',
      ],
    },
    'm5-technology': {
      description: 'Explore digital ordering and loyalty, automation and AI, and data-driven menu development in coffeehouse operations.',
      takeaways: [
        'Digital tools create value when they improve retention and operating economics, and most Highlands digital sales still come through third-party aggregators.',
        'The next stage of technology adoption is operational productivity, so standardise processes and data before automating.',
        'Innovation must be commercially repeatable, balancing novelty against margin, complexity and waste.',
      ],
    },
    'm5-channel': {
      description: 'Follow omnichannel and delivery economics, selective chain expansion and consolidation, and hybrid store formats.',
      takeaways: [
        'Omnichannel growth needs channel-specific economics, and two platforms hold about 96% of Vietnam delivery value.',
        'Competitive advantage is shifting from opening more stores to building a productive, replicable network, with weak outlets closed or redesigned.',
        'Formats should be matched to occasions and piloted, since a kiosk and a destination café have different financial models.',
      ],
    },
    'm5-regulatory': {
      description: 'Understand food safety and compliance, sustainable packaging and waste, and responsible marketing and data governance.',
      takeaways: [
        'Compliance is a foundation for trust and scalability, and rule texts such as the e-invoice decree should be checked for their current form.',
        'Credible sustainability links measurable environmental gains to operational feasibility; unsupported claims risk greenwashing.',
        'Trust is an operating asset: Law 91/2025 and Decree 330/2026 make consent records and partner oversight essential.',
      ],
    },
    'm5-outlook': {
      description: 'Assess market growth and demand drivers, value-chain opportunities, and the strategic priorities that sustain advantage.',
      takeaways: [
        'Distinguish genuine demand growth from price-, promotion- or outlet-driven sales growth, and read chain market sizes at their scope.',
        'Value-chain integration is about coordinating critical activities, not owning every stage.',
        'Sustainable advantage combines differentiation with execution discipline, and company targets are aims rather than forecasts.',
      ],
    },
  },
};
