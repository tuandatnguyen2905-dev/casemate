import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Dairy Module 02 (Industry Value Chain), keyed by exact chapter title. */
export const DAIRY_M2_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  '01 How Does the Dairy Value Chain Work?': {
    heading: 'From cattle genetics to a glass of milk in five stages',
    intro: 'Before studying any single stage, see the whole chain at once. Follow the five stages in order and notice where large companies integrate several of them.',
    spec: {
      layout: 'flow', title: 'How Does the Dairy Value Chain Work?', kicker: '',
      steps: [
        { label: 'Ingredient supply', detail: 'Livestock genetics, animal feed, vaccines and veterinary supplies', kind: 'stage' },
        { label: 'Farm production', detail: 'Raising dairy cattle and producing raw milk', kind: 'stage' },
        { label: 'Processing and packaging', detail: 'Treating raw milk and manufacturing finished dairy products', kind: 'stage' },
        { label: 'Distribution and marketing', detail: 'Warehousing, transport, wholesale, retail and promotion', kind: 'stage' },
        { label: 'Consumption', detail: 'Household, institutional and food-service buyers', kind: 'outcome' },
      ],
      note: 'Major dairy companies may integrate several stages through their own farms, plants, distribution networks and retail channels.',
      takeaway: 'Mapping the stages reveals operational dependencies, bottlenecks and chances to improve efficiency and profit.',
    },
  },
  '02 Who Participates in the Dairy Value Chain?': {
    heading: 'Upstream, midstream, downstream: locating any activity',
    intro: 'The five stages group into three operational layers. Place each stage in its layer so you can tell where a cost or risk sits.',
    spec: {
      layout: 'taxonomy', title: 'Who Participates in the Dairy Value Chain?', kicker: '',
      root: 'Dairy value chain', rootDetail: 'Five stages grouped into three operational layers',
      groups: [
        { label: 'Upstream', detail: 'Supply and farming', items: ['Ingredient supply', 'Farm production'] },
        { label: 'Midstream', detail: 'Turning milk into products', items: ['Processing', 'Packaging'] },
        { label: 'Downstream', detail: 'Reaching the consumer', items: ['Distribution', 'Marketing', 'Consumption'] },
      ],
      note: 'The chain is also connected by four flows: goods, services, information and finance.',
      takeaway: 'Grouping the stages tells you where in the chain a given activity, cost or risk belongs.',
    },
  },
  '03 How Do Products, Money, and Information Flow?': {
    heading: 'One milk delivery, four flows at once',
    intro: 'A single delivery from farm to plant moves goods, services, information and money together. Read each flow with what it carries.',
    spec: {
      layout: 'table', title: 'How Do Products, Money, and Information Flow?', kicker: '',
      headers: ['Flow', 'What moves along the chain', 'In one farm-to-plant delivery'],
      rows: [
        { label: 'Goods', a: 'Feed and breeding stock, raw milk, finished products to retail', b: 'The farm sends raw milk to the plant' },
        { label: 'Services', a: 'Veterinary care, artificial insemination, maintenance, cold-chain logistics', b: 'Refrigerated transport carries it' },
        { label: 'Information', a: 'Cattle sensor data, milk test results, traceability records, ERP/DMS orders', b: 'Quality test results go with it' },
        { label: 'Finance', a: 'Payments to farmers, distributor transactions, retail sales, settlements', b: 'The farm is paid under a milk procurement agreement' },
      ],
      note: 'IoT sensors, ERP systems and distribution management systems make the flows visible and easier to coordinate.',
      takeaway: 'A disruption in any one flow can hurt quality, delivery speed, cost or cash flow.',
    },
  },
  '01 How Do Dairy Farms and Herds Produce Milk?': {
    heading: 'The suppliers a dairy farm cannot work without',
    intro: 'Upstream competitiveness starts with feed, genetics and veterinary care. See who supplies each input and where outside markets can reach into farm costs.',
    spec: {
      layout: 'ecosystem', title: 'How Do Dairy Farms and Herds Produce Milk?', kicker: '',
      center: { label: 'Dairy farm', detail: 'Turns inputs into raw milk; input quality drives yield, health, cost and consistency' },
      actors: [
        { label: 'Cattle genetics suppliers', relation: 'High-yield Holstein Friesian cattle from countries such as Australia and the United States', flows: ['product', 'money'] },
        { label: 'Feed suppliers', relation: 'Total Mixed Ration: oat grass, corn silage, soybean meal, trace minerals', flows: ['product', 'money', 'risk'] },
        { label: 'Animal health suppliers', relation: 'Vaccines, veterinary medicines and health supplies', flows: ['product', 'service'] },
        { label: 'Global commodity markets', relation: 'Feed-ingredient prices and import disruptions reach the farm', flows: ['risk'] },
      ],
      takeaway: 'Farms with dependable suppliers produce steadier volumes of consistent milk.',
    },
  },
  '02 How Do Feed, Animal Health, and Farm Inputs Shape Output?': {
    heading: 'Big farms standardize; linked smallholders widen supply',
    intro: 'Vietnam sources milk from two farm models. Compare what each contributes and what it needs, including the cooling that protects milk before it leaves the farm.',
    spec: {
      layout: 'compare', title: 'How Do Feed, Animal Health, and Farm Inputs Shape Output?', kicker: '',
      leftTitle: 'Large-scale industrial farms', rightTitle: 'Linked smallholder farms',
      rows: [
        { label: 'How milk is supplied', a: 'Modern management systems run the farm', b: 'Households supply processors through collection networks' },
        { label: 'Main strength', a: 'Standardized processes', b: 'Expand domestic sourcing without processors owning every farm' },
        { label: 'What it needs', a: 'Automated milking, rotary parlors, barn cooling, IoT collars', b: 'Clear procurement standards, quality testing and reliable cooling' },
        { label: 'Quality safeguard', a: 'Rapid cooling below 4°C', b: 'Cooling and hygienic handling across many suppliers' },
      ],
      note: 'Feed is an estimated 60–70% of farming costs. The 6,000–8,000 linked households cited need their scope and year verified.',
      takeaway: 'Combining both models scales supply, as long as collection keeps milk cold and consistent.',
    },
  },
  '03 How Are Raw Milk Quality and Collection Managed?': {
    heading: 'Feed bills and sick cows: the upstream swing factors',
    intro: 'Feed costs and animal health are the biggest variables in farm economics. See each risk next to the response that contains it.',
    spec: {
      layout: 'driverTree', title: 'How Are Raw Milk Quality and Collection Managed?', kicker: '',
      root: { label: 'Farm profitability and milk entering processing', detail: 'Protected by managing four upstream risks' },
      drivers: [
        { label: 'Feed costs', detail: 'About 60–70% of farming costs', children: [{ label: 'Response: feed optimization and forage production' }] },
        { label: 'Animal disease', detail: 'Mastitis and foot-and-mouth disease', children: [{ label: 'Response: veterinary programs' }] },
        { label: 'Feed price swings', detail: 'Corn, soybean meal, forage and mineral prices move cost per liter', children: [{ label: 'Response: supplier diversification' }] },
        { label: 'Inconsistent small-supplier milk', children: [{ label: 'Response: supplier audits and quality incentives' }] },
      ],
      takeaway: 'Upstream risk management protects farm margins, supply continuity and the quality of milk reaching the plant.',
    },
  },
  '01 How Is Raw Milk Processed?': {
    heading: 'Cold, documented and tested before it is accepted',
    intro: 'Midstream begins by protecting quality. Follow raw milk from the collection station to the plant gate, where it is accepted or rejected.',
    spec: {
      layout: 'flow', title: 'How Is Raw Milk Processed?', kicker: '',
      steps: [
        { label: 'Collect and cool', detail: 'Intermediate collection stations chill milk, commonly below 4°C', kind: 'stage' },
        { label: 'Transport cold', detail: 'Specialized insulated or refrigerated tankers', kind: 'stage' },
        { label: 'Sample and inspect', detail: 'Density, acidity, microbiological quality and antibiotic residues', kind: 'stage' },
        { label: 'Accept or reject', detail: 'Clear criteria and traceability records decide', kind: 'decision' },
        { label: 'Into production', detail: 'Only compliant milk is processed', kind: 'outcome' },
      ],
      note: 'Standardized sampling and traceability records make accept-or-reject decisions consistent between collection centers and plants.',
      takeaway: 'Intake testing keeps contaminated or non-compliant milk out and protects finished-product safety.',
    },
  },
  '02 How Do Manufacturing, Quality Assurance, and Packaging Work?': {
    heading: 'The process decides shelf life and how far milk travels',
    intro: 'Each processing technology produces a different product with different storage needs. Match the process to the product and its route to market.',
    spec: {
      layout: 'table', title: 'How Do Manufacturing, Quality Assurance, and Packaging Work?', kicker: '',
      headers: ['Process', 'What it does', 'Product and storage'],
      rows: [
        { label: 'UHT', a: 'Around 135–140°C for a few seconds', b: 'Liquid milk; unopened at ambient temperature in aseptic packs' },
        { label: 'Pasteurization', a: 'Lower temperature, longer holding time', b: 'Liquid milk that normally needs refrigeration' },
        { label: 'Homogenization', a: 'Reduces fat globule size', b: 'Physically stable milk texture' },
        { label: 'Fermentation', a: 'Cultures milk', b: 'Spoonable and drinkable yogurt, kept in a cold chain' },
        { label: 'Spray drying', a: 'Turns liquid milk into powder', b: 'Milk powder' },
      ],
      note: 'Exact storage requirements depend on formulation and validated processing conditions.',
      takeaway: 'Process choice drives warehouse design, transport cost, shelf life and market reach.',
    },
  },
  '03 What Drives Processing Efficiency and Economics?': {
    heading: 'What the pack has to balance',
    intro: 'Packaging protects the product and sets its shelf life, while storage systems keep stock accurate. See the factors behind each format choice.',
    spec: {
      layout: 'driverTree', title: 'What Drives Processing Efficiency and Economics?', kicker: '',
      root: { label: 'Packaging format choice', detail: 'Multilayer cartons, HDPE bottles or metal cans, filled on aseptic lines from makers such as Tetra Pak and SIG' },
      drivers: [
        { label: 'Product type and shelf life', detail: 'What the product needs to stay protected' },
        { label: 'Transport conditions', detail: 'How the pack travels' },
        { label: 'Cost', detail: 'Format cost against the protection it gives' },
        { label: 'Sustainability', detail: 'Environmental impact of the material' },
      ],
      note: 'After packing, automated storage and retrieval systems (ASRS) and ERP-based inventory management keep stock accurate and available.',
      takeaway: 'The right format protects the product while keeping cost and environmental impact in balance.',
    },
  },
  '01 How Does Dairy Reach Distribution and Retail?': {
    heading: 'One network out of the factory, two ways to keep it fresh',
    intro: 'Finished dairy moves from factories to regional hubs and wholesalers. Follow the route, then see why ambient and refrigerated goods need different logistics.',
    spec: {
      layout: 'pathway', title: 'How Does Dairy Reach Distribution and Retail?', kicker: '',
      trunk: [
        { label: 'Factories', detail: 'Ship finished products', kind: 'stage' },
        { label: 'Regional distribution centers', detail: 'Allocate inventory and schedule deliveries', kind: 'stage' },
        { label: 'Exclusive distributors and first-tier wholesalers', detail: 'Fulfil orders for retail, institutional and food-service demand', kind: 'stage' },
      ],
      optionsLabel: 'Logistics by product type',
      options: [
        { label: 'Ambient products', detail: 'Standard logistics arrangements' },
        { label: 'Refrigerated products', detail: 'Cold-chain storage and transport' },
      ],
      takeaway: 'Good distribution reduces stockouts, controls logistics cost and gets products to the right markets on time.',
    },
  },
  '02 How Do Cold Chain and Shelf Life Shape Delivery?': {
    heading: 'Four channels, four kinds of shopper',
    intro: 'Each sales channel serves different occasions, places and price expectations. Group the channels by what each one gives a dairy brand.',
    spec: {
      layout: 'taxonomy', title: 'How Do Cold Chain and Shelf Life Shape Delivery?', kicker: '',
      root: 'Dairy sales channels', rootDetail: 'A balanced portfolio serves traditional, supermarket and online buyers',
      groups: [
        { label: 'General trade (GT)', detail: 'Extensive local reach', items: ['Traditional grocery stores', 'Independent retailers'] },
        { label: 'Modern trade (MT)', detail: 'Organized shelf space, high-traffic sites', items: ['Supermarkets', 'Convenience store chains'] },
        { label: 'Direct-to-consumer (D2C)', detail: 'Control of the customer experience', items: ['Company-owned stores', 'Direct sales'] },
        { label: 'E-commerce', detail: 'Digital accessibility', items: ['Online marketplaces', 'Digital sales platforms'] },
      ],
      note: 'The source cites 200,000+ traditional grocery stores; the current count and scope need verification. Multiple channels require managing pricing, promotions, inventory and channel conflict.',
      takeaway: 'Relying on one channel limits reach and raises exposure to retailer and shopper changes.',
    },
  },
  '03 How Do Marketing and Merchandising Create Consumer Access?': {
    heading: 'Build demand, protect trust, then measure both',
    intro: 'Marketing creates demand while service and traceability protect the brand. Follow the activities into the indicators that show whether they work.',
    spec: {
      layout: 'pathway', title: 'How Do Marketing and Merchandising Create Consumer Access?', kicker: '',
      trunk: [
        { label: 'Marketing and after-sales activity', kind: 'stage' },
      ],
      optionsLabel: 'Activities',
      options: [
        { label: 'Advertising and repositioning', detail: 'Multichannel campaigns' },
        { label: 'School and community programs', detail: 'Sponsorships and local marketing' },
        { label: 'Point of sale', detail: 'Displays and in-store promotions' },
        { label: 'Complaints and batch traceability', detail: 'Protect trust and find quality issues' },
      ],
      afterLabel: 'How results are judged',
      after: [
        { label: 'Sales growth and coverage', kind: 'stage' },
        { label: 'Conversion and repeat purchase', kind: 'stage' },
        { label: 'Awareness and customer feedback', kind: 'outcome' },
      ],
      takeaway: 'Measuring outcomes shows which activities build demand and which need to change.',
    },
  },
  '01 What Inputs and Outputs Move Through Dairy Production?': {
    heading: 'What each stage receives and what it hands on',
    intro: 'Every stage turns its input into something the next stage values. Read the transformations row by row to spot waste and cost drivers.',
    spec: {
      layout: 'table', title: 'What Inputs and Outputs Move Through Dairy Production?', kicker: '',
      headers: ['Stage', 'Input', 'Output'],
      rows: [
        { label: 'Ingredient supply', a: 'Feed, livestock genetics, veterinary inputs', b: 'Production resources for farms' },
        { label: 'Farm production', a: 'Production resources', b: 'Raw milk' },
        { label: 'Processing and packaging', a: 'Raw milk', b: 'Drinking milk, yogurt, cheese, milk powder; sometimes whey' },
        { label: 'Distribution and marketing', a: 'Finished goods', b: 'Products available at sales outlets' },
        { label: 'Consumption', a: 'Purchased products', b: 'Nutritional and functional benefits' },
      ],
      note: 'By-products such as whey may be recovered for additional products.',
      takeaway: 'Defining each output clearly shows what the next stage needs and where the chain loses efficiency.',
    },
  },
  '02 How Do Conversion, Yield, and Losses Affect Economics?': {
    heading: 'Creating value is not the same as keeping it',
    intro: 'Every stage adds value, but not every stage earns the same profit. Compare value creation with value capture before reading any margin figure.',
    spec: {
      layout: 'compare', title: 'How Do Conversion, Yield, and Losses Affect Economics?', kicker: '',
      leftTitle: 'Value creation', rightTitle: 'Value capture',
      rows: [
        { label: 'Meaning', a: 'Extra utility or economic value from production, processing, packaging, branding and distribution', b: 'The share a participant keeps as revenue or profit after costs and contracts' },
        { label: 'Who generates or keeps it', a: 'Farmers, processors, distributors, retailers and specialty businesses', b: 'Depends on bargaining power, scale and efficiency' },
        { label: 'What shapes it', a: 'Technology, quality assurance and differentiation', b: 'Market structure, procurement contracts and competition' },
      ],
      note: 'The source cites 41–42% gross margins for processors and 14–15% margins for selected specialty categories; definitions, periods and accounting bases differ, so do not compare them directly.',
      takeaway: 'Which stage is most profitable cannot be read without capital needs, risk, volume and operating costs.',
    },
  },
  '03 Where Are Value and Costs Created?': {
    heading: 'Own the supply or spread it?',
    intro: 'Reliable raw milk is one of several sources of advantage. Weigh integration against a diversified supplier network for securing it.',
    spec: {
      layout: 'decision', title: 'Where Are Value and Costs Created?', kicker: '',
      root: { label: 'Securing raw milk supply', detail: 'One advantage among technology, quality systems, reach, brands and coordination' },
      question: 'Which supply model suits the company’s scale, investment capacity and priorities?',
      branches: [
        { condition: 'Vertical integration', outcome: 'Control and supply security', detail: 'Own herds and coordinate procurement, production and sales', tone: 'positive' },
        { condition: 'Diversified supplier network', outcome: 'Flexibility', detail: 'Less dependence on any single source', tone: 'positive' },
      ],
      note: 'Advantage can lower costs, improve consistency, extend reach to district and commune level, or support a premium price.',
      takeaway: 'Choosing between control and flexibility is a strategic decision, not a default.',
    },
  },
  '01 How Does Global Dairy Sourcing Work?': {
    heading: 'Export-built dairy systems versus Vietnam’s hybrid chain',
    intro: 'Developed dairy producers and Vietnam build their chains differently. Compare the two structures and what each depends on.',
    spec: {
      layout: 'compare', title: 'How Does Global Dairy Sourcing Work?', kicker: '',
      leftTitle: 'New Zealand, the United States, the European Union', rightTitle: 'Vietnam',
      rows: [
        { label: 'Farming', a: 'Specialized dairy farming', b: 'Expanding modern farms plus linked farming households' },
        { label: 'Ingredients', a: 'Domestic milk supply', b: 'Imported milk powder and other dairy ingredients' },
        { label: 'Processing and sales', a: 'Established infrastructure and export systems', b: 'Domestic processing, branding, distribution and retail' },
      ],
      note: 'Developed systems are not identical: pasture, feed costs, climate, farm scale, regulation and export orientation vary.',
      takeaway: 'Chain structure shapes production cost, input security, quality and the ability to compete at home and abroad.',
    },
  },
  '02 How Is Vietnam\'s Dairy Supply Chain Structured?': {
    heading: 'Resilience without chasing full self-sufficiency',
    intro: 'Vietnam’s farms do not cover its processors’ needs. See which factors decide how resilient the supply chain is.',
    spec: {
      layout: 'driverTree', title: 'How Is Vietnam\'s Dairy Supply Chain Structured?', kicker: '',
      root: { label: 'Supply-chain resilience', detail: 'Local production cited at 30–45% of raw milk demand; imports at 55–70% of processing inputs' },
      drivers: [
        { label: 'Domestic productivity and quality', detail: 'Competitive, consistent local milk' },
        { label: 'Imported ingredient cost and availability' },
        { label: 'Exchange rates and commodity prices' },
        { label: 'Food safety and import rules' },
        { label: 'Sourcing balance', detail: 'Local supply alongside diversified international procurement' },
      ],
      note: 'Both shares need verifying for a consistent year and definition, and they are not exact inverses. Distinguish fresh milk from recombined products.',
      takeaway: 'Complete self-sufficiency is not necessarily efficient; productivity plus diversified imports can be more resilient.',
    },
  },
  '03 How Do Localization and Imported Inputs Shape Dependency?': {
    heading: 'Going abroad: wider reach, new risks',
    intro: 'Vietnamese dairy companies join international value chains in several ways. Group the routes, the gains they offer and the risks they add.',
    spec: {
      layout: 'taxonomy', title: 'How Do Localization and Imported Inputs Shape Dependency?', kicker: '',
      root: 'International participation', rootDetail: 'Verify the latest company disclosures before citing examples',
      groups: [
        { label: 'Routes abroad', items: ['Overseas farms and agricultural projects', 'Foreign processing facilities', 'Exports and overseas distribution', 'Partnerships and sourcing networks'] },
        { label: 'Potential gains', items: ['Diversified revenue', 'Stronger regional access', 'More production or distribution capability'] },
        { label: 'Added risks', items: ['Regulatory', 'Currency', 'Integration', 'Execution'] },
      ],
      takeaway: 'International expansion pays only if the added regulatory, currency and execution risks are managed.',
    },
  },
};
