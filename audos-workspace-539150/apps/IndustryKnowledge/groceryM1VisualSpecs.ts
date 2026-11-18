import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Grocery & General Merchandise Retail Module 01, keyed by visualKind. */
export const GROCERY_M1_VISUALS: Record<string, ChapterVisual> = {
  'grocery-m1-11-definition': {
    heading: 'What gets sold, and the work that keeps it on the shelf',
    intro: 'The industry is defined as much by its operating work as by its products. Look at the two product sides, then at the four activities that keep everyday goods available.',
    spec: {
      layout: 'taxonomy', title: 'Industry Definition and Core Activities', kicker: '',
      root: 'Grocery & general merchandise retail', rootDetail: 'Food, beverages, household essentials and non-food goods sold to end customers',
      groups: [
        { label: 'Grocery retail', detail: 'Driven by purchase frequency and availability', items: ['Fresh produce', 'Packaged foods and beverages', 'Dairy and frozen foods', 'Everyday necessities'] },
        { label: 'General merchandise retail', detail: 'Driven by assortment breadth, price and discretionary spending', items: ['Household products', 'Personal care', 'Clothing and toys', 'Basic electronics'] },
        { label: 'Running the shelf', detail: 'The operating work behind every format', items: ['Assortment: products, brands, pack sizes, price points', 'Merchandising: displays, promotions, shelf space', 'Inventory and replenishment: storage, rotation, restocking', 'Customer service: checkout, payment, delivery, returns'] },
      ],
      note: 'National Statistics Office: food and beverages were 35.7% of Vietnam’s 2024 retail market, household goods, tools and equipment 10.7% and clothing 5.5%; these shares cover all retail, not only grocery stores.',
      takeaway: 'A grocer that runs out of milk or rice loses the visit, so reliable availability is part of what the industry sells.',
    },
  },
  'grocery-m1-12-categories': {
    heading: 'A tomato and a toaster need different operating rules',
    intro: 'Each product group makes its own demands on storage, replenishment and range planning. Read across each row and notice where the industry boundary blurs into other sectors.',
    spec: {
      layout: 'table', title: 'Product Categories and Industry Boundaries', kicker: '',
      headers: ['Product group', 'Typical products', 'What it demands of the retailer'],
      rows: [
        { label: 'Fresh and perishable food', a: 'Fruits, vegetables, meat, seafood, dairy and bakery', b: 'Quality control, temperature control and fast stock rotation' },
        { label: 'Packaged food and beverages', a: 'Canned goods, snacks, bottled drinks, cooking ingredients', b: 'Frequent, steady replenishment of shelf-stable stock' },
        { label: 'Household essentials', a: 'Cleaning supplies, paper products, kitchen consumables', b: 'Reliable availability of everyday items' },
        { label: 'Personal care and health-related goods', a: 'Toiletries, cosmetics, hygiene and permitted over-the-counter products', b: 'Compliance; the boundary overlaps with pharmacy' },
        { label: 'General merchandise', a: 'Homeware, clothing, toys, stationery, basic electronics, seasonal goods', b: 'Range planning, product lifecycle and slower-moving stock' },
        { label: 'Adjacent activities', a: 'Pharmacy, foodservice, fuel, financial services', b: 'A written rule on whether they are included before sizing' },
      ],
      note: 'Food and foodstuffs were 34.1% of Vietnam’s retail goods sales in 2025 (ministry report) and clothing 5.5% of the 2024 retail market (statistics office); the bases and years differ, so they are not directly comparable.',
      takeaway: 'Define the core activity first and state which adjacent activities are in, or market sizes and growth rates will not match.',
    },
  },
  'grocery-m1-13-formats': {
    heading: 'Which shopping trip each store format is built to win',
    intro: 'The same customer makes a quick top-up one day and a large monthly shop another. Group the seven formats by the mission they serve, then see where Vietnam’s outlets fit.',
    spec: {
      layout: 'taxonomy', title: 'Retail Formats and Business Models', kicker: '',
      root: 'Grocery and general merchandise formats', rootDetail: 'Store size, range, price and location matched to a shopping mission',
      groups: [
        { label: 'Quick, close-to-home trips', detail: 'Proximity and speed for frequent small baskets', items: ['Traditional grocery stores', 'Convenience stores and minimarts: Circle K, GS25, 7-Eleven'] },
        { label: 'Regular and one-stop shops', detail: 'Broad selection for larger baskets', items: ['Supermarkets: 1,293 in Vietnam at end-2024', 'Hypermarkets and big-box: GO! and Big C'] },
        { label: 'Value-led trips', detail: 'Low prices from streamlined or selected ranges', items: ['Discount retailers', 'Membership-based retail for enrolled customers'] },
        { label: 'Trips without a store visit', detail: 'Online ordering with pickup or delivery', items: ['E-commerce and omnichannel retailers'] },
      ],
      note: 'Ministry of Industry and Trade counts at end-2024: about 8,274 traditional markets, 1,293 supermarkets, 276 shopping centres and nearly 7,000 convenience stores. They count outlets, not sales or share.',
      takeaway: 'Compare each format with its own peers, on measures that fit its mission rather than sales per square metre alone.',
    },
  },
  'grocery-m1-14-channels': {
    heading: 'Small grocers hold most of the value while online grows fastest',
    intro: 'Shop counts hide where the money goes. Split Vietnam’s 2024 food retail value by channel, and read each share together with its growth rate.',
    spec: {
      layout: 'driverTree', title: 'Channel Structure: How Food Retail Sales Divide Across Formats', kicker: '',
      root: { label: 'Vietnam food retail sales, 2024', detail: 'US$55.5 billion, up about 1% (Euromonitor via USDA FAS)' },
      formula: 'Food retail value = traditional channels + modern trade + specialists + food e-commerce',
      drivers: [
        { label: 'Small local grocers and wet markets', detail: '83% of value: the traditional base', op: '+' },
        { label: 'Modern trade', detail: '13% of value', op: '+', children: [
          { label: 'Supermarkets', detail: '9%, grew 13%' },
          { label: 'Hypermarkets', detail: '3%' },
          { label: 'Convenience stores', detail: '1%' },
        ] },
        { label: 'Food and drink specialists', detail: '3% of value', op: '+' },
        { label: 'Food e-commerce', detail: '1% of value, grew 29%: the fastest channel', op: '+' },
      ],
      note: 'All shares use Euromonitor’s food-retail definition reported by USDA; they are not comparable with the ministry’s US$269 billion for all retail of goods and consumer services in 2025.',
      takeaway: 'State share and growth together: the traditional base carries volume, the fast-growing channels show direction.',
    },
  },
  'grocery-m1-21-traditional': {
    heading: 'How fresh food reaches a household without a supermarket',
    intro: 'Before chains, and still today, food moves through a short local chain built on relationships. Follow it from producer to household and notice what keeps customers coming back.',
    spec: {
      layout: 'flow', title: 'Traditional Retail and Local Market Systems', kicker: '',
      steps: [
        { label: 'Local producers', detail: 'Supply fresh produce, meat, seafood and local products', kind: 'stage' },
        { label: 'Wholesalers and regional networks', detail: 'Buy in bulk and distribute to small retailers', kind: 'stage' },
        { label: 'Wet markets and neighbourhood shops', detail: 'Sell close to home in flexible, small quantities', kind: 'stage' },
        { label: 'Households buying little and often', detail: 'Frequent trips and small transaction values, served by familiar sellers', kind: 'outcome' },
      ],
      loop: 'Personal relationships and local knowledge turn each small trip into repeat business.',
      note: 'Official counts: markets fell from 8,581 in 2020 to 8,274 in 2024, down 3.6%. NielsenIQ Vietnam puts traditional channels at 75–83% of fast-moving consumer goods sales, with nearly 1.4 million grocery stores, as reported by Viet Nam News.',
      takeaway: 'Proximity, flexibility and relationships are lasting advantages, which is why modern chains copy them with small stores near homes.',
    },
  },
  'grocery-m1-22-modern': {
    heading: 'From a Memphis shopping basket to small chain stores in Vietnam',
    intro: 'Each new format added scale or standard processes. Follow the origins abroad, then see how Vietnam adopted those capabilities mostly through smaller stores.',
    spec: {
      layout: 'timeline', title: 'Emergence of Modern Retail Formats', kicker: '',
      events: [
        { period: '1916', label: 'Piggly Wiggly opens in Memphis', detail: 'First true self-service grocery: baskets, open shelves, no clerks fetching goods', status: 'historical' },
        { period: '1930', label: 'King Kullen opens in Queens', detail: 'Regarded as the first true supermarket: departments, volume pricing, parking', status: 'historical' },
        { period: '1963', label: 'Carrefour’s first hypermarket', detail: '2,500 m² and 400 parking spaces, with food and non-food under one roof', status: 'historical' },
        { period: '2012', label: 'Central Retail enters Vietnam', detail: 'Now about 330 outlets under Go!, Big C and Tops Market', status: 'historical' },
        { period: 'Late 2015', label: 'Bach Hoa Xanh is founded', detail: 'A domestic chain of small organised stores', status: 'historical' },
        { period: '2019', label: 'Masan restructures VinMart', detail: 'Acquired from Vingroup to create WinCommerce', status: 'historical' },
        { period: '2020 to 2024', label: 'Supermarkets rise from 1,163 to 1,293', detail: 'Most are smaller class III stores close to homes', status: 'historical' },
      ],
      note: 'Format dates and sizes are company and historical accounts of origins, not adoption rates; Vietnamese chain details are as reported by VCCI and supermarket counts come from a government publication.',
      takeaway: 'The lasting legacy is the capabilities, purchasing scale, standard processes and cold chains, which work in a small store as well as a large one.',
    },
  },
  'grocery-m1-23-digital': {
    heading: 'Whether an online grocery order makes or loses money',
    intro: 'Online, the retailer does the picking and carrying the customer used to do. See what separates convenience at a sustainable cost from orders that erase the margin.',
    spec: {
      layout: 'decision', title: 'Digitalization and Omnichannel Transformation', kicker: '',
      root: { label: 'Online grocery order', detail: 'Picking, packaging, chilled transit and delivery are now paid for by the retailer' },
      question: 'Are digital systems integrated with stores and logistics?',
      branches: [
        { condition: 'Yes', outcome: 'Convenience at a sustainable cost', detail: 'Stores act as pick points, delivery routes are planned and order accuracy is watched', tone: 'positive' },
        { condition: 'No', outcome: 'The margin disappears', detail: 'Out-of-stock replacements and one wrong or late order erase the margin on several good ones', tone: 'negative' },
      ],
      note: 'Ministry estimate: online retail about US$32 billion in 2025, nearly 12% of retail sales (US$22.5 billion for goods). Euromonitor via USDA: food e-commerce grew 29% in 2024 but was about 1% of food retail value.',
      takeaway: 'Digitalization in grocery is mostly operations: integrate systems, stores and logistics before adding a channel.',
    },
  },
  'grocery-m1-24-consolidation': {
    heading: 'Western owners sold up as Thai and Vietnamese groups bought in',
    intro: 'Familiar store signs in Vietnam now sit with different owners. Read each deal for who sold, who bought and what the new owner changed.',
    spec: {
      layout: 'table', title: 'Consolidation and Changing Ownership in Vietnamese Retail', kicker: '',
      headers: ['Chain', 'Who sold to whom', 'What changed after the deal'],
      rows: [
        { label: 'Big C Vietnam', a: 'Casino Group, in Vietnam since 1998, to Central Group in April 2016', b: '43 stores and 30 shopping centres reported; renamed GO! and Tops Market in 2021' },
        { label: 'Metro Cash & Carry Vietnam', a: 'Metro to Thailand’s TCC Group, completed in 2016', b: '19 wholesale centres, renamed MM Mega Market' },
        { label: 'Auchan’s Vietnam business', a: 'Auchan Retail, entered 2015, to Saigon Co.op on its 2019 exit', b: '18 supermarkets and the online business; kept stores reopen as Co.opmart, Co.opXtra or Finelife' },
      ],
      note: 'Deal facts from Vietnam Investment Review and VietNamNet. Reported values for the Big C deal differ between outlets, so no single figure is shown; store counts are as reported at the time of each deal.',
      takeaway: 'Track the owner, not the store sign: buying teams, supplier terms, private labels and formats change after a deal.',
    },
  },
  'grocery-m1-31-global-size': {
    heading: 'Before any market number, ask what is inside it',
    intro: 'Market sizes from different sources rarely line up because they count different things. Read the scope of each figure before setting it beside another.',
    spec: {
      layout: 'table', title: 'Global Market Size and Growth', kicker: '',
      headers: ['Figure', 'What it counts', 'Source and caveat'],
      rows: [
        { label: 'US$648 billion, fiscal 2023', a: 'Walmart’s retail revenue, up 6.0%, including non-grocery sales', b: 'Deloitte ranking; one retailer’s scale, not a market size' },
        { label: 'About US$269 billion, 2025', a: 'Vietnam’s total retail of goods and consumer services', b: 'Ministry of Industry and Trade estimate' },
        { label: 'US$55.5 billion, 2024', a: 'Vietnam food retail only, up 1%', b: 'Euromonitor data in a USDA report' },
      ],
      note: 'Estimates also differ on whether they include foodservice, wholesale trade, online marketplaces, fuel and non-food categories.',
      takeaway: 'Fix product scope, geography, channels and period before comparing any two market sizes.',
    },
  },
  'grocery-m1-32-regions': {
    heading: 'Each region asks a retailer to adapt something different',
    intro: 'Regions differ in income, space, infrastructure and habits, and retail structure follows. Compare the mix of formats in each region before assuming a model will transfer.',
    spec: {
      layout: 'taxonomy', title: 'Major Regional Markets and Retail Development', kicker: '',
      root: 'Regional grocery and general merchandise markets', rootDetail: 'Mature supermarket networks at one end, traditional and modern formats mixed at the other',
      groups: [
        { label: 'North America', detail: 'Mature market', items: ['Large-format supermarkets', 'Warehouse clubs and discount retailers', 'Established grocery e-commerce'] },
        { label: 'Europe', detail: 'Mature market', items: ['Supermarkets and convenience formats', 'Discount chains', 'Efficient sourcing and sustainability'] },
        { label: 'Asia-Pacific', detail: 'Mixed market', items: ['Traditional markets', 'Convenience stores and supermarkets', 'Rapidly developing digital channels'] },
        { label: 'Emerging Asia, including Vietnam', detail: 'Room to expand modern retail', items: ['Neighbourhood stores still serve most households', 'Modern retail about 13% of food retail value, 2024', 'Aeon’s eighth Vietnamese mall, Tan An, September 2025'] },
      ],
      note: 'Aeon calls Vietnam its largest Southeast Asian market and its second largest worldwide after China, a company statement in a USDA report; the 13% share is Euromonitor data.',
      takeaway: 'Combine global operating capability with local knowledge: adjust ranges, pack sizes, prices and formats, then scale what works.',
    },
  },
  'grocery-m1-33-models': {
    heading: 'Each winning model is a discipline, not a bigger footprint',
    intro: 'Walmart, Costco, Aldi and 7-Eleven win with completely different bets. Compare what each model offers and the discipline it must keep to hold customers.',
    spec: {
      layout: 'table', title: 'Global Retail Competition and Leading Business Models', kicker: '',
      headers: ['Business model', 'Named example', 'Discipline that makes it work'],
      rows: [
        { label: 'Large-format supermarkets', a: 'Walmart, Carrefour', b: 'Broad assortments and purchasing networks turned into low prices' },
        { label: 'Membership retail', a: 'Costco, US$242 billion retail revenue', b: 'Membership renewal, bulk purchasing and a curated range' },
        { label: 'Discount retail', a: 'Aldi (US$124 billion, +8.7%) and Lidl', b: 'A short, cost-efficient range' },
        { label: 'Convenience retail', a: '7-Eleven', b: 'Store density and speed for frequent small baskets' },
        { label: 'Digital grocery', a: 'Online grocers', b: 'Ordering convenience and reliable fulfilment' },
        { label: 'Private label', a: 'Retailers’ own brands', b: 'Alternatives at different price points' },
      ],
      note: 'Revenues are from Deloitte’s fiscal 2023 ranking and include non-grocery sales; they show scale, not profitability. In Vietnam, Circle K has more than 460 outlets, GS25 over 200 and 7-Eleven about 150 (VCCI, end of 2025).',
      takeaway: 'A large network wins only when it is converted into attractive prices and reliable availability.',
    },
  },
  'grocery-m1-34-challenges': {
    heading: 'Thin margins demand cost discipline and a reason to return',
    intro: 'A small rise in wages, freight or energy can erase retail margins. See the drivers that together keep a retailer competitive, and why cutting costs alone is not enough.',
    spec: {
      layout: 'driverTree', title: 'Global Industry Challenges and Growth Drivers', kicker: '',
      root: { label: 'Long-term competitiveness', detail: 'Reliable availability and attractive value while shopping habits change' },
      formula: 'Competitiveness = cost efficiency + customer relevance + supply-chain resilience, supported by targeted investment',
      drivers: [
        { label: 'Cost efficiency', op: '+', children: [
          { label: 'Procurement and energy efficiency' },
          { label: 'Labour productivity and logistics' },
        ] },
        { label: 'Customer relevance', op: '+', children: [
          { label: 'Prices and ranges for different budgets' },
          { label: 'Formats for underserved locations' },
        ] },
        { label: 'Supply-chain resilience', op: '+', children: [
          { label: 'Diversified sourcing and supplier coordination' },
          { label: 'Traceability and quality controls' },
        ] },
        { label: 'Targeted digital investment', detail: 'Forecasting, inventory systems, payment infrastructure and fulfilment', op: '+' },
      ],
      note: 'Vietnam 2025: inflation 3.31% (National Statistics Office), retail sales up 9–10% and services spending up 12–14% (ministry estimates); WinCommerce added about 800 stores, roughly 70% rural (VCCI).',
      takeaway: 'No cost saving offsets lost sales, and convenience without cost discipline cannot keep prices attractive.',
    },
  },
  'grocery-m1-35-concentration': {
    heading: 'A market run by five chains versus one run by small shops',
    intro: 'Concentration decides who suppliers negotiate with and how entrants win share. Compare a mature, concentrated market with Vietnam’s fragmented one, keeping the different measures in mind.',
    spec: {
      layout: 'compare', title: 'Market Concentration: Mature and Fragmented Grocery Markets', kicker: '',
      leftTitle: 'Great Britain: concentrated', rightTitle: 'Vietnam: fragmented',
      rows: [
        { label: 'Who holds the sales', a: 'Five grocers hold 73.6% combined; Tesco alone 27.8%', b: 'Small local grocers and wet markets: 83% of food retail value' },
        { label: 'The rest of the field', a: 'Sainsbury’s 15.2%, Asda 11.5%, Aldi 10.5%, Lidl 8.6%', b: 'Modern trade 13% in total' },
        { label: 'How entrants win share', a: 'Price or format, as discounters did: Lidl rose from 1.4% to fifth largest', b: 'Reach, distribution and store expansion that convert traditional shopping' },
        { label: 'Supplier bargaining', a: 'Suppliers negotiate with a few powerful buyers', b: 'Even the largest chains hold a small share of the total' },
        { label: 'How it is measured', a: 'Worldpanel by Numerator till-roll panel, 12 weeks to 4 October 2026', b: 'Euromonitor channel share via USDA FAS, 2024' },
      ],
      note: 'The combined 73.6% is the sum of the five reported shares. The two sources measure different things, so the contrast shows structure, not a ranking of markets.',
      takeaway: 'Concentrated and fragmented markets reward different strategies, so check how a share is measured before comparing.',
    },
  },
  'grocery-m1-41-vietnam-demand': {
    heading: 'Cutting the US$269 billion headline down to grocery demand',
    intro: 'A headline retail figure includes services, cars and much else. Follow the steps that narrow it to the spending a grocery or minimart plan can actually use.',
    spec: {
      layout: 'flow', title: 'Market Size, Growth, and Consumer Demand', kicker: '',
      steps: [
        { label: 'Start from the national total', detail: 'About US$269 billion of goods and consumer services in 2025, up 9–10% (ministry estimate)', kind: 'stage' },
        { label: 'Carve out the category', detail: 'Food and beverages 35.7% of the 2024 retail market; household goods 10.7%', kind: 'stage' },
        { label: 'Split by region', detail: 'Major cities, secondary cities and rural areas', kind: 'stage' },
        { label: 'Narrow to the catchment', detail: 'What nearby households spend on food and essentials', kind: 'stage' },
        { label: 'A figure a plan can use', detail: 'Each step checked against spending surveys and consumer research', kind: 'outcome' },
      ],
      note: 'Another government statement gives the 2024 retail market at about VND 4,922 trillion, around US$190 billion; totals differ with definition and year. Category shares are National Statistics Office figures.',
      takeaway: 'Growth in the total does not spread evenly, so analyse grocery as a specific category before using any headline.',
    },
  },
  'grocery-m1-42-infrastructure': {
    heading: 'Counting the outlets in Vietnam’s mixed retail system',
    intro: 'A market with hundreds of stalls and a large supermarket each count as one outlet. Read the counts as a map of infrastructure and the role each format plays, not as sales.',
    spec: {
      layout: 'table', title: 'Traditional Trade and Modern Retail Structure', kicker: '',
      headers: ['Format', 'Outlets at end-2024', 'Role in the system'],
      rows: [
        { label: 'Traditional markets', a: '8,274, down from 8,581 in 2020', b: 'Fresh food and frequent small purchases' },
        { label: 'Supermarkets', a: '1,293, up from 1,163; 863 are class III', b: 'Organised assortments and larger shopping trips' },
        { label: 'Shopping centres', a: '276, up from 250', b: 'Concentrated in the large cities' },
        { label: 'Convenience stores', a: 'Nearly 7,000', b: 'Quick purchases close to homes' },
      ],
      note: 'Official counts from the Ministry of Industry and Trade and National Statistics Office. Nearly half of modern outlets are in Hanoi, Ho Chi Minh City, Da Nang and Hai Phong, leaving remote areas reliant on traditional markets.',
      takeaway: 'Modernisation is evolving a mixed system rather than replacing traditional trade, so pair outlet counts with sales data.',
    },
  },
  'grocery-m1-43-players': {
    heading: 'Every rival in Vietnam is after the same household budget',
    intro: 'A chain of thousands of tiny stores, a convenience brand, independent shops and a phone app all compete for one shopper. See how each group reaches that household.',
    spec: {
      layout: 'ecosystem', title: 'Major Retail Players and Competitive Structure', kicker: '',
      center: { label: 'Vietnamese household', detail: 'Shops for quick top-ups, fresh food and larger trips' },
      actors: [
        { label: 'Domestic chains', relation: 'WinCommerce about 4,600 outlets, Bach Hoa Xanh about 2,000, Co.op Food nearly 800', flows: ['product', 'money'] },
        { label: 'International and regional operators', relation: 'Central Retail’s about 330 Go!, Big C and Tops Market outlets; MM Mega Market', flows: ['product', 'money'] },
        { label: 'Convenience networks', relation: 'Circle K 460+, GS25 over 200, 7-Eleven about 150', flows: ['product', 'service'] },
        { label: 'Independent stores and market vendors', relation: 'Strong local relationships for frequent purchases', flows: ['product', 'information'] },
        { label: 'E-commerce platforms', relation: 'Shopee and Lazada sell packaged food and household products online', flows: ['product', 'service'] },
      ],
      note: 'Outlet counts are company figures reported by VCCI at the end of 2025; they show network size only, not sales, profitability or market share.',
      takeaway: 'Benchmark like with like, minimarts with minimarts and platforms with platforms, on store density, price and range.',
    },
  },
  'grocery-m1-44-digital-journey': {
    heading: 'Where an online grocery order can break down',
    intro: 'Vietnamese shoppers find products on marketplaces, social feeds and apps, then pay with a tap. Follow one order and see what must work at each step for it to pay.',
    spec: {
      layout: 'flow', title: 'E-commerce, Digital Payments, and Omnichannel Development', kicker: '',
      steps: [
        { label: 'Discover', detail: 'Marketplaces, social platforms, retailer apps and livestream selling', kind: 'stage' },
        { label: 'Order', detail: 'Packaged foods, beverages, household supplies and selected fresh products, against accurate stock', kind: 'stage' },
        { label: 'Pay', detail: 'Cashless checkout through e-wallets and digital banking', kind: 'stage' },
        { label: 'Fulfil', detail: 'Store pickup, delivery or store-based picking, fresh, accurate and fast', kind: 'stage' },
        { label: 'Learn', detail: 'Transaction and inventory data improve forecasting and targeted promotions', kind: 'outcome' },
      ],
      loop: 'What the data shows feeds back into range, stock and promotions for the next order.',
      note: 'Ministry estimates for 2025: online retail about US$32 billion, nearly 12% of retail sales (US$22.5 billion for goods), with internet use above 80%. Food e-commerce was about 1% of food retail value in 2024 (Euromonitor). The Law on E-commerce took effect on 1 July 2026.',
      takeaway: 'Integrate digital channels with store stock, fulfilment and service instead of running e-commerce as a separate activity.',
    },
  },
  'grocery-m1-45-behaviour': {
    heading: 'One household uses market, grocer, supermarket and app',
    intro: 'The same household often splits its shopping across several channels, each used where it is best. Rural households lean more on traditional ones, so the shift is uneven.',
    spec: {
      layout: 'ecosystem', title: 'Consumer Behavior and Local Market Characteristics', kicker: '',
      center: { label: 'One Vietnamese household', detail: 'Splits spending by mission, not by loyalty to one channel' },
      actors: [
        { label: 'Morning market', relation: 'Fresh vegetables bought each morning from familiar sellers', flows: ['product', 'money'] },
        { label: 'Neighbourhood grocery store', relation: 'More than 70% of surveyed consumers prefer it for prices, convenience and personal connections', flows: ['product', 'service'] },
        { label: 'Weekend supermarket', relation: 'Larger stock-up with organised ranges; supermarkets grew 13% in 2024', flows: ['product', 'money'] },
        { label: 'Online ordering', relation: 'Packaged goods delivered; food e-commerce grew 29% in 2024', flows: ['product', 'information'] },
      ],
      note: 'The survey and NielsenIQ figures (traditional channels 75–83% of fast-moving consumer goods sales) are as reported by Viet Nam News; growth rates are Euromonitor food-retail data, in a year when food retail rose only 1%.',
      takeaway: 'Plan from local missions and relevance rather than assuming a uniform shift to modern retail.',
    },
  },
  'grocery-m1-51-economics': {
    heading: 'Higher incomes buy better rice, not more rice',
    intro: 'Necessities and extras respond to the economy very differently. Compare the two kinds of demand before reading what Vietnam’s 2025 growth means for a store.',
    spec: {
      layout: 'compare', title: 'Economic and Demographic Drivers', kicker: '',
      leftTitle: 'Necessities: food and household essentials', rightTitle: 'Discretionary general merchandise',
      rows: [
        { label: 'Demand pattern', a: 'Recurring, bought regardless of the economy', b: 'Variable; purchases can be postponed' },
        { label: 'Most sensitive to', a: 'Inflation and prices, through household budgets', b: 'Disposable income and economic expectations' },
        { label: 'When incomes rise', a: 'Quality upgrades while quantities change little', b: 'A new kettle, or extra money goes to savings and services' },
        { label: 'Where the retailer gains', a: 'Product mix and basket value', b: 'Sales that follow consumer confidence' },
      ],
      note: 'Vietnam 2025 (National Statistics Office): retail sales up 9.2% in current prices and 6.7% excluding price rises, with inflation of 3.31%. A USDA report gives a population of about 101 million and GDP per capita of about US$4,700.',
      takeaway: 'Watch real growth and split demand into necessities and extras to see what a rising economy means for a store.',
    },
  },
  'grocery-m1-52-lifestyle': {
    heading: 'What is this trip for? The question that picks the channel',
    intro: 'The same person shops in several places for different reasons. Start from the mission and see which offer becomes the natural choice for it.',
    spec: {
      layout: 'decision', title: 'Consumer Behavior and Lifestyle Changes', kicker: '',
      root: { label: 'One shopper, many trips', detail: 'Milk on the way home, a month of rice online, gifts at a hypermarket' },
      question: 'What is this particular trip for?',
      branches: [
        { condition: 'A quick everyday top-up', outcome: 'Small format close to home', detail: 'Quick-purchase ranges and fast checkout' },
        { condition: 'Stretching a tight budget', outcome: 'Price tiers and pack sizes', detail: 'Different brands and package sizes for varied budgets' },
        { condition: 'Saving time', outcome: 'Online ordering and delivery', detail: 'Food e-commerce grew 29% in 2024, from about 1% of food retail value' },
        { condition: 'Fresh, healthy food', outcome: 'Quality and clear information', detail: 'Freshness, careful handling of perishables and clear product information' },
      ],
      note: 'Euromonitor data in a USDA report: Vietnam’s food retail rose only 1% in 2024 as consumers became price-conscious, while supermarkets grew 13%.',
      takeaway: 'Map each mission, how often it occurs and what matters in it, to win a larger share of the same customers.',
    },
  },
  'grocery-m1-53-technology': {
    heading: 'Start from the waste or empty-shelf problem, then pick the tool',
    intro: 'Strawberries sell out by noon or are thrown away by evening. Begin from a measurable problem, choose the system that addresses it, and measure the change.',
    spec: {
      layout: 'pathway', title: 'Technology, Digitalization, and Supply-Chain Innovation', kicker: '',
      trunk: [
        { label: 'Name a measurable problem', detail: 'Waste, out-of-stocks, markdown cost or slow checkout', kind: 'stage' },
      ],
      optionsLabel: 'Systems that address it',
      options: [
        { label: 'Inventory management systems', detail: 'Stock levels, replenishment needs and availability' },
        { label: 'Demand forecasting', detail: 'Sales history, seasonality, promotions and market signals' },
        { label: 'Point of sale and digital payments', detail: 'Transaction data, sales reporting and cashless checkout' },
        { label: 'Warehouse and logistics systems', detail: 'Receiving, storage, order picking and distribution' },
        { label: 'Retail analytics', detail: 'Product performance and assortment opportunities' },
      ],
      afterLabel: 'Prove the value',
      after: [
        { label: 'Measure before and after', detail: 'Waste as a share of sales, out-of-stock rate and markdown cost', kind: 'outcome' },
      ],
      note: 'Internet use above 80% (ministry report) supports cashless checkout and online ordering. Since 1 June 2025, Decree 70/2025 requires compliant e-invoicing, so point-of-sale and back-office systems must be connected.',
      takeaway: 'Question any technology investment that cannot show movement on availability, waste, productivity or convenience.',
    },
  },
  'grocery-m1-54-regulation': {
    heading: 'Keeping the shelf promise from supplier to checkout',
    intro: 'A product on the shelf promises it is safe, correctly labelled and priced as shown. Follow the controls a retailer applies at each stage before the customer has to check.',
    spec: {
      layout: 'flow', title: 'Regulatory, Food Safety, and Trade Policies', kicker: '',
      steps: [
        { label: 'Verify suppliers', detail: 'Credentials, product documentation and compliance records keep counterfeit goods out', kind: 'stage' },
        { label: 'Store and handle safely', detail: 'Hygiene, handling and temperature-control procedures', kind: 'stage' },
        { label: 'Label and price accurately', detail: 'Ingredients, origin and usage; clear prices and promotion conditions', kind: 'stage' },
        { label: 'Check and respond in store', detail: 'Spot checks of labels and prices, and complaint handling', kind: 'stage' },
        { label: 'Trust the retailer can show', detail: 'Records that answer an inspector or a worried customer quickly', kind: 'outcome' },
      ],
      loop: 'A named person tracks changes in tax, trade, product-safety and operating rules and updates each step.',
      note: 'Vietnam: amended goods-labelling rules (Decree 111/2021) from 15 February 2022; packaging recycling duties from 1 January 2024; platforms removed more than 33,000 violating products and handled over 11,000 booths in the first half of 2025.',
      takeaway: 'Compliance is a continuous process built into sourcing, storage and selling, not a one-off check.',
    },
  },
  'grocery-m1-55-sustainability': {
    heading: 'Where sustainability work saves a grocer money',
    intro: 'Every discarded item was already paid for, moved and stored. Group the activities by the cost or risk they reduce, and note what each should be measured by.',
    spec: {
      layout: 'taxonomy', title: 'Sustainability, Climate, and Environmental Pressures', kicker: '',
      root: 'Sustainability in grocery retail', rootDetail: 'Practical operations, judged by measured outcomes',
      groups: [
        { label: 'Food waste', detail: 'Measure waste as a share of sales by category', items: ['Better forecasting and stock rotation', 'Well-timed markdowns', 'Redistribution of surplus food'] },
        { label: 'Packaging', detail: 'Measure packaging volumes first', items: ['Less unnecessary packaging', 'Reusable or recyclable alternatives', 'Recycling duties on own-brand or imported goods'] },
        { label: 'Energy', detail: 'Track store energy use', items: ['Refrigeration', 'Lighting', 'Store energy management'] },
        { label: 'Sourcing and climate', detail: 'Track sourcing indicators', items: ['Environmental and social supplier standards', 'Diversified sourcing for weather disruption'] },
      ],
      note: 'Under Decree 08/2022, first-period recycling rates of 10–22% apply from 2024; producers with previous-year revenue below VND 30 billion and importers below VND 20 billion are exempt, as reported by VietnamPlus.',
      takeaway: 'Waste and energy savings improve margins and resilience, and only measured results make the claims credible.',
    },
  },
  'grocery-m1-56-infrastructure': {
    heading: 'Roads, warehouses and sites decide where the next store goes',
    intro: 'Demand alone does not open a store. See how local infrastructure steers a chain toward one format or another, and why the gaps can be an opening.',
    spec: {
      layout: 'decision', title: 'Competitive and Infrastructure Drivers', kicker: '',
      root: { label: 'A chain plans its next area', detail: 'Assesses population density, access, rent, nearby competitors and supply routes' },
      question: 'Can local roads, warehouses and sites support a large format?',
      branches: [
        { condition: 'Yes', outcome: 'A large store can work', detail: 'A hypermarket needs a large site, strong roads and a catchment with spending power', tone: 'positive' },
        { condition: 'No', outcome: 'A small standard format', detail: 'A village store supplied by regular delivery from a regional hub', tone: 'caution' },
      ],
      note: 'Nearly half of modern outlets are in four large cities and 66.8% of supermarkets are class III (ministry reporting). WinCommerce targeted 4,500 WinMart+ outlets in 2025, 42% rural, a company target; it added about 800 stores, roughly 70% rural.',
      takeaway: 'Infrastructure gaps limit expansion but open room for formats designed for underserved places.',
    },
  },
};
