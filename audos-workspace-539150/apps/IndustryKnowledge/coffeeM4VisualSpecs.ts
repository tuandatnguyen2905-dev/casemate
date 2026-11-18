import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Coffee & Foodservice Retail Module 04, keyed by visualKind. */
export const COFFEE_M4_VISUALS: Record<string, ChapterVisual> = {
  'coffee-m4-11-fragmentation': {
    heading: 'Chains edge up from a small base as weaker outlets exit',
    intro: 'Independents still earn most food and beverage revenue. Look at the forces slowly shifting share toward organised chains, and the one that holds them back.',
    spec: {
      layout: 'driverTree', title: 'Market Fragmentation and Industry Consolidation', kicker: '',
      root: { label: 'Chain share of 2025 F&B revenue', detail: '8.3% for chains of at least 10 branded outlets, up from about 7.3% in 2024' },
      drivers: [
        { label: 'Chain expansion', detail: 'Organised operators open more outlets and enter new districts', op: '+', children: [{ label: 'Highlands’ 1,000th outlet', detail: 'June 2026 in Tây Hồ, in premises another café chain had run' }] },
        { label: 'Exits of weaker operators', detail: 'About 50,000 F&B outlets reported closed in the first half of 2025', op: '+' },
        { label: 'Format diversification', detail: 'Kiosks, takeaway outlets, flagship cafés and smaller neighbourhood stores', op: '+' },
        { label: 'Portfolio rationalisation', detail: 'Underperforming outlets closed, leases renegotiated or formats repositioned', op: '+' },
        { label: 'Independent strength', detail: 'Local familiarity, flexible operations and owner-led service keep 91.7% of revenue', op: '−' },
      ],
      note: 'Revenue shares are from the iPOS.vn and Nestlé Professional report deck and cover all food and beverage outlets, not coffee alone; the closure figure is as reported by VietnamBiz.',
      takeaway: 'The market is organising without becoming chain-only: scale helps, but local relevance and store economics decide who survives.',
    },
  },
  'coffee-m4-12-dimensions': {
    heading: 'Which dimension wins depends on who is buying',
    intro: 'A commuter, a coffee enthusiast and a student weigh different things. Follow each customer to the dimension a café must win for them, and see what happens without a clear target.',
    spec: {
      layout: 'decision', title: 'Competitive Dimensions and Basis of Competition', kicker: '',
      root: { label: 'Six competitive dimensions', detail: 'Product, price and value, location, experience, brand and operational efficiency' },
      question: 'Which customer and occasion is the brand built to serve?',
      branches: [
        { condition: 'Commuter on the way to work', outcome: 'Location and convenience', detail: 'Proximity, opening hours and takeaway speed', tone: 'positive' },
        { condition: 'Specialty coffee customer', outcome: 'Product differentiation', detail: 'Bean quality and preparation expertise', tone: 'positive' },
        { condition: 'Student who wants a seat', outcome: 'Experience and space', detail: 'Seat comfort, ambience and how the store feels', tone: 'positive' },
        { condition: 'No clear target customer', outcome: 'Squeezed middle', detail: 'Chains at VND 30,000–40,000 without the brand pull of Highlands or Starbucks', tone: 'negative' },
      ],
      note: 'Highlands (VND 29,000–75,000) and Phúc Long (VND 35,000–70,000) sit in nearly the same reported price band (VietnamBiz, July 2025), so customers choose on experience, space and taste.',
      takeaway: 'Pick a coherent position for one target customer and deliver it at viable cost, rather than trying to excel on every dimension.',
    },
  },
  'coffee-m4-13-barriers': {
    heading: 'Easy to open a café, hard to build a chain that lasts',
    intro: 'The barriers change as a business grows from one outlet to many. Compare what a single café must clear with what a sustainable chain must build.',
    spec: {
      layout: 'compare', title: 'Barriers to Entry and Competitive Intensity', kicker: '',
      leftTitle: 'Opening one café', rightTitle: 'Building a sustainable chain',
      rows: [
        { label: 'Money', a: 'Startup capital and equipment', b: 'Fit-out, deposits, working capital and early losses across sites' },
        { label: 'Sites', a: 'One suitable premises', b: 'Many sites with traffic at affordable occupancy cost' },
        { label: 'Operations', a: 'Supplier access, food safety compliance and staff recruitment', b: 'Standardisation, management, technology, logistics and brand consistency' },
        { label: 'Customers', a: 'Local marketing, social media, promotions and referrals', b: 'Repeat demand when customers can switch at almost no cost' },
        { label: 'Reason to choose', a: 'A new concept may attract initial interest', b: 'A differentiated proposition and a viable cost structure' },
      ],
      note: 'Mixue passed 1,000 stores by 2023 before its outlets began cannibalising each other; Café Amazon never passed 30 stores and left Vietnam in 2025. Causes are as described by the press.',
      takeaway: 'Low barriers to opening a store do not mean low barriers to building a chain: repeat demand and store economics are the real hurdle.',
    },
  },
  'coffee-m4-21-local': {
    heading: 'Everyday scale versus a coffee-heritage story',
    intro: 'Both brands are Vietnamese, but they win in different ways. Compare where each draws its advantage and how much public evidence exists for its results.',
    spec: {
      layout: 'compare', title: 'Highlands Coffee and Trung Nguyên', kicker: '',
      leftTitle: 'Highlands Coffee', rightTitle: 'Trung Nguyên',
      rows: [
        { label: 'Core proposition', a: 'Accessible, standardised café experience', b: 'Vietnamese coffee heritage, coffee culture and premium experiences' },
        { label: 'Store network', a: '985 stores at end-2025; 1,000th outlet in June 2026', b: 'About 106 Legend stores plus 17 Coffee World stores' },
        { label: 'Ownership model', a: '800 company-owned and 128 franchised at end-September 2025', b: 'E-Coffee: roughly 800 franchise stores, zero-fee policy' },
        { label: 'Signature moves', a: 'VND 500 billion roastery and Vietnam’s first drive-through in 2025', b: 'Cafés opened in clusters of three in 1998 to advertise the brand' },
        { label: 'Evidence of results', a: '2025 EBITDA reported at about VND 1.1 trillion; same-store sales up over 8%', b: 'No public financial results found; effort tilted to exports' },
      ],
      note: 'Store counts are tied to each source’s date; Legend’s count includes one store in Cambodia and one in Thailand. Jollibee Foods holds 60% of the company that owns the Highlands operator.',
      takeaway: 'Heritage and scale are both advantages only when execution turns them into an experience customers value.',
    },
  },
  'coffee-m4-22-brands': {
    heading: 'One kept growing, one grew by design, one shrank',
    intro: 'Phúc Long, Katinat and The Coffee House all started with strong images. Read each approach beside a dated store count, and treat every count as a snapshot.',
    spec: {
      layout: 'table', title: 'Phúc Long, Katinat, and The Coffee House', kicker: '',
      headers: ['Brand', 'How it competes', 'Dated snapshot'],
      rows: [
        { label: 'Phúc Long', a: 'Tea-led, with coffee, food and WinMart kiosks; Unicorn format', b: '237 stores at end-2025 (+79); 2025 revenue nearly VND 1,900 billion' },
        { label: 'Katinat', a: 'Visually distinctive, company-run stores; no franchising', b: '93 stores in January 2025 to 114; targets 120 in 2026' },
        { label: 'The Coffee House', a: 'Restructured after Golden Gate bought it in January 2025', b: 'Near 150 at peak; later reports give 48, over 80 or 78' },
      ],
      note: 'Counts differ by date and by whether kiosks are included. Masan owns 85% of Phúc Long; Golden Gate’s VND 270 billion price is provisional as reported.',
      takeaway: 'A strong image does not guarantee growth: store productivity, repeat purchase and cost discipline decide the trajectory.',
    },
  },
  'coffee-m4-23-adjacent': {
    heading: 'Everyone a morning-coffee customer could choose instead',
    intro: 'Start from the occasion, not the category. See which formats compete for the same coffee break, breakfast or meal, and what each one competes on.',
    spec: {
      layout: 'ecosystem', title: 'International Brands and Broader Foodservice Competitors', kicker: '',
      center: { label: 'The customer occasion', detail: 'Breakfast, snacks, coffee breaks, meals and social gatherings' },
      actors: [
        { label: 'Starbucks', relation: 'Premium brand, customisation and localised flavours; about 150 Vietnam stores around end-2025', flows: ['product', 'money'] },
        { label: 'Quick-service restaurants', relation: 'Coffee, breakfast, snacks and meals with efficient systems', flows: ['product', 'service'] },
        { label: 'Bakery cafés', relation: 'Drinks combined with pastries and light meals', flows: ['product'] },
        { label: 'Convenience stores', relation: 'Accessible drinks and packaged food', flows: ['product'] },
        { label: 'Independent specialty cafés', relation: 'Craft, local identity and personalised service', flows: ['service'] },
        { label: 'Low-price tea chains', relation: 'Mixue-style cups from VND 25,000, down to 8,000 in promotions', flows: ['money'] },
      ],
      note: 'Starbucks is also reported at 127, 139 and 147 stores by other trackers at other dates. No Vietnam data on convenience-store or quick-service coffee sales was found.',
      takeaway: 'Define rivals by the alternatives customers actually weigh for each occasion, not by who calls itself a coffee chain.',
    },
  },
  'coffee-m4-31-network': {
    heading: 'Dated network moves of 2025 and 2026, read beside same-store sales',
    intro: 'Every count below belongs to a date and a definition. Watch the store totals rise, then check the same-store figures that show whether existing outlets are busier.',
    spec: {
      layout: 'timeline', title: 'Store Network, Geographic Coverage, and Accessibility', kicker: '',
      events: [
        { period: 'January 2025', label: 'Highlands at 815 stores', detail: 'Opening more than 100 a year', status: 'historical' },
        { period: 'Mid-2025', label: 'Starbucks opens five Mekong Delta stores', status: 'historical' },
        { period: 'End-2025', label: 'Highlands at 985; Phúc Long at 237 with kiosks', detail: 'Nearly 200 Phúc Long stores outside WinMart by VietnamBiz’s count', status: 'historical' },
        { period: 'Second quarter of 2026', label: 'Highlands same-store sales up 11.5%', detail: 'Up over 8% in 2025; Phúc Long has 220 standalone outlets', status: 'historical' },
        { period: 'June 2026', label: 'Highlands reaches 1,000 outlets', status: 'historical' },
        { period: '2026', label: 'Phúc Long plans 40–50 new stores', detail: 'With a focus on Hanoi', status: 'current' },
      ],
      note: 'Chains are also moving into universities, such as Katinat at Hoa Sen University. Milano Coffee’s ~2,500 outlets include points of sale in a largely franchise-agency model, so they are not comparable with company-run counts. Momentum Works estimated the coffee-chain segment at US$725 million in 2025.',
      takeaway: 'Outlet count shows reach, not leadership: read each count with its date and definition, and beside same-store growth.',
    },
  },
  'coffee-m4-32-proposition': {
    heading: 'Equal menu prices, unequal value to the customer',
    intro: 'When reported price bands overlap, price alone cannot separate brands. Trace the other drivers of perceived value, and note which still lack public evidence.',
    spec: {
      layout: 'driverTree', title: 'Product Assortment, Pricing, and Customer Experience', kicker: '',
      root: { label: 'Perceived value of one drink', detail: 'What the customer gets for the price, across product, place and service' },
      drivers: [
        { label: 'Price architecture', detail: 'Highlands VND 29,000–75,000; Phúc Long and Katinat VND 35,000–70,000; Starbucks clearly higher' },
        { label: 'Menu breadth', detail: 'Phúc Long Unicorn has four drink groups; food aimed at about 11% of 2026 revenue' },
        { label: 'Product differentiation', detail: 'Starbucks added salt coffee, coconut coffee and matcha' },
        { label: 'Digital convenience', detail: 'HighlandsĐI app from 19 December 2025; Phúc Long gives one point per VND 10,000' },
        { label: 'Customer experience', detail: 'Wait time, seating, cleanliness and service: no public brand-level survey data found' },
      ],
      note: 'Price bands are reported ranges, and one source gives Katinat at VND 40,000–60,000. Customer perception has to be gathered first-hand, for example by visiting each brand at the same daypart.',
      takeaway: 'Benchmark the whole proposition, because near-equal prices push the customer’s choice onto experience, space and taste.',
    },
  },
  'coffee-m4-33-financial': {
    heading: 'EBITDA here, net profit there: reading chain results safely',
    intro: 'Popularity and expansion are not proof of profit. Read what each chain actually disclosed, then the caution that prevents an unlike-for-unlike comparison.',
    spec: {
      layout: 'table', title: 'Financial Performance, Operational Efficiency, and Digital Capability', kicker: '',
      headers: ['Measure', 'What was reported', 'Caution'],
      rows: [
        { label: 'Highlands EBITDA', a: 'About VND 1,097 billion for 2025; same-store sales up over 8%', b: 'Parent-group figure, before depreciation and financing costs' },
        { label: 'Highlands store EBITDA', a: 'Near VND 640 million per half-year, about VND 3.5 million a day', b: 'Press average from one excerpt' },
        { label: 'Phúc Long net profit', a: 'VND 195 billion on nearly VND 1,900 billion revenue, above 10%', b: 'Before minority interests; not comparable with EBITDA' },
        { label: 'Phúc Long daily store sales', a: 'VND 22.8 million in 2025; VND 26.2 million in the second quarter of 2026', b: 'Company-reported average per store' },
        { label: 'Phúc Long 2026 targets', a: 'Revenue VND 2,300–2,500 billion; EBITDA VND 370–418 billion', b: 'Company targets, not results' },
        { label: 'Katinat and Starbucks', a: 'No comparable Vietnam unit economics found', b: 'Evidence gap' },
      ],
      note: 'A Vietnam-wide survey found 42.7% of surveyed establishments with revenue down at least 5% in the first half of 2026, so chain results are not the whole market.',
      takeaway: 'Compare like with like (one measure, year and definition) and keep reported results apart from estimates and targets.',
    },
  },
  'coffee-m4-41-product': {
    heading: 'Differentiation earns the first visit; consistency earns the next',
    intro: 'Start from a clear brand position, see the routes Vietnamese chains use to stand out, then the consistency and feedback that turn a first visit into a habit.',
    spec: {
      layout: 'pathway', title: 'Product Quality, Menu Differentiation, and Brand Positioning', kicker: '',
      trunk: [
        { label: 'Brand positioning', detail: 'Price, store design, communication and quality aligned to the target segment', kind: 'stage' },
      ],
      optionsLabel: 'Routes to a distinctive offer',
      options: [
        { label: 'Coffee heritage', detail: 'Trung Nguyên leans on Vietnamese coffee culture' },
        { label: 'Local flavours', detail: 'Starbucks added salt coffee, coconut coffee and matcha' },
        { label: 'New formats and categories', detail: 'Phúc Long’s Unicorn format, plus cakes, ice cream and yoghurt' },
        { label: 'Control of quality at source', detail: 'Highlands’ VND 500 billion roastery; its certifications are company claims' },
        { label: 'Distinctive stores', detail: 'Katinat’s store design, credited by commentators for its growth' },
      ],
      afterLabel: 'What brings customers back',
      after: [
        { label: 'Product consistency', detail: 'Standard recipes, ingredient specifications and quality checks at every outlet', kind: 'stage' },
        { label: 'Customer feedback', detail: 'Sales patterns, reviews and repeat-purchase data refine the offer', kind: 'stage' },
        { label: 'Reason to return', detail: 'The same taste on every visit, at a price that feels right', kind: 'outcome' },
      ],
      note: 'Phúc Long’s aim of about 11% of 2026 revenue from food is a company target, not a result. No public repeat-purchase data by brand was found.',
      takeaway: 'Differentiation attracts attention, but only consistent quality and value sustain loyalty.',
    },
  },
  'coffee-m4-42-location': {
    heading: 'One outlet’s life from site choice to keep, fix or close',
    intro: 'Follow a store from the site decision through daily running to the portfolio review. Each stage decides whether brand demand turns into returns.',
    spec: {
      layout: 'flow', title: 'Location Strategy, Store Economics, and Operational Excellence', kicker: '',
      steps: [
        { label: 'Site evaluation', detail: 'Traffic, catchment demand, accessibility, competitors, rent and expected sales', kind: 'stage' },
        { label: 'Store-format selection', detail: 'Size, seating, equipment and staffing matched to site; WinMart kiosks borrow supermarket traffic', kind: 'stage' },
        { label: 'Standardised operations', detail: 'Common training, recipes, service standards and reporting', kind: 'stage' },
        { label: 'Cost and demand control', detail: 'Ingredients, labour and occupancy monitored; stock and staff matched to daypart', kind: 'stage' },
        { label: 'Portfolio review', detail: 'Expand successful formats, improve weak outlets, close persistently unviable ones', kind: 'decision' },
      ],
      loop: 'Same-store sales show whether existing sites earn more: Highlands rose over 8% in 2025 and 11.5% in the second quarter of 2026.',
      note: 'Costs press on every stage: the Region I minimum wage is VND 5.31 million a month from 1 January 2026, and 50–60% of beverage operators reported higher raw-material costs.',
      takeaway: 'Expansion quality is measured by returns per outlet, not by the number of stores opened.',
    },
  },
  'coffee-m4-43-loyalty': {
    heading: 'Habits, data and controls that scale beyond promotions',
    intro: 'Discounts buy a visit; systems buy a habit. Group the capabilities into customer, digital and management families, each with its Vietnam evidence.',
    spec: {
      layout: 'taxonomy', title: 'Customer Loyalty, Digital Capability, and Scalable Management', kicker: '',
      root: 'A chain that grows without losing its customers', rootDetail: 'Technology earns its place by improving retention, productivity and profit',
      groups: [
        { label: 'Customer loyalty and analytics', detail: 'Rewards linked to an account show who returns and what they buy', items: ['HighlandsĐI tiers on 12-month spend, from 19 December 2025', 'Phúc Long: one point per VND 10,000', 'Zalo Mini App campaign: over 2 million users, 56.9% identified (vendor-reported)'] },
        { label: 'Omnichannel digital capability', detail: 'Ordering, stores, delivery and payment working as one system', items: ['Pre-order and prepaid top-up in HighlandsĐI', 'Masan plans to link Phúc Long loyalty to its retail ecosystem', 'Starbucks reported to stress loyalty and cashless payment'] },
        { label: 'Scalable management', detail: 'Training, performance tracking and governance as the network grows', items: ['Training in preparation, service, hygiene and brand standards', 'Store sales, margins, service times and waste tracked', 'Highlands plans a Vietnam listing in the first quarter of 2027'] },
      ],
      note: 'No public data on staff training, turnover or loyalty-member counts was found; the Zalo result is a vendor case study.',
      takeaway: 'Digital tools pay off when they strengthen retention and operating decisions, not as isolated innovation.',
    },
  },
  'coffee-m4-51-swot': {
    heading: 'A coffee-loving market that is also a crowded one',
    intro: 'Strengths and threats are both large here. Read each quadrant with its Vietnam evidence, then ask which side a particular business model falls on.',
    spec: {
      layout: 'taxonomy', title: 'SWOT Analysis of Vietnam’s Coffeehouse & Foodservice Retail Industry', kicker: '',
      root: 'Vietnam coffeehouse and foodservice retail', rootDetail: 'The same market is an opportunity for one operator and a threat for another',
      groups: [
        { label: 'Strengths', detail: 'Coffee and tea chains about US$1.34 billion in 2025 (Momentum Works)', items: ['Established coffee culture', 'Frequent out-of-home consumption', 'Diverse domestic supply base', 'Room for local brand differentiation'] },
        { label: 'Weaknesses', detail: 'Independents earn 91.7% of F&B revenue (iPOS.vn survey)', items: ['Fragmented competition', 'Uneven operational standards', 'Limited resources among small operators', 'Vulnerability to poor store economics'] },
        { label: 'Opportunities', detail: 'Highlands opened its 1,000th outlet; Phúc Long lifted daily revenue per standard store 18.5%', items: ['Modern chain expansion', 'Secondary-city growth', 'Digital ordering and loyalty', 'Specialty and localised concepts'] },
        { label: 'Threats', detail: '42.7% of surveyed establishments saw revenue fall at least 5% in the first half of 2026', items: ['Rising operating costs', 'Intense price competition', 'Shifting consumer preferences', 'Delivery expense and store closures'] },
      ],
      note: 'The chain-market figure covers coffee and tea chains only, while the survey covers surveyed F&B establishments, so the two describe different parts of the market.',
      takeaway: 'Market potential does not cancel fragmentation and cost risk; clear positioning and operating discipline turn it into returns.',
    },
  },
  'coffee-m4-52-challenges': {
    heading: 'Why cost, imitation and complexity hit a growing chain together',
    intro: 'Each challenge is manageable alone. See how commercial, operational and organisational pressures stack against one outcome: growth that stays profitable.',
    spec: {
      layout: 'driverTree', title: 'Major Strategic Challenges', kicker: '',
      root: { label: 'Profitable, repeatable growth', detail: 'Openings, volume and digital sales count only if they turn into returns' },
      drivers: [
        { label: 'Commercial pressures', detail: 'Costs rise while rivals copy', op: '−', children: [
          { label: 'Margin pressure', detail: '50–60% of beverage operators report higher raw-material costs' },
          { label: 'Weak differentiation', detail: 'Drinks, trends and store aesthetics are easy to copy' },
          { label: 'Customer retention', detail: 'Discounts and paid acquisition replace repeat purchase' },
        ] },
        { label: 'Operational pressures', detail: 'More channels and less predictable demand', op: '−', children: [
          { label: 'Channel complexity', detail: 'Delivery commissions of 20–30%; dine-in, takeaway and delivery can congest operations' },
          { label: 'Demand uncertainty', detail: 'Menus, staffing and stock must follow changing demand' },
        ] },
        { label: 'Organisational pressures', detail: 'Growth outruns people and control', op: '−', children: [
          { label: 'Workforce', detail: 'Recruiting and training staff to standard; Region I minimum wage VND 5.31 million' },
          { label: 'Expansion risk', detail: 'Weak sites and heavy commitments; Mixue outlets cannibalised each other' },
        ] },
      ],
      note: 'A VCCI report of the iPOS.vn survey gives 69.38% of businesses facing higher raw-material costs, and USDA reports the average local coffee price up 125% in 2024/25. No public data on staff turnover was found.',
      takeaway: 'Challenges compound: a brand that is easy to copy cannot pass on rising costs, so differentiation and cost control are one problem.',
    },
  },
  'coffee-m4-53-responses': {
    heading: 'Foundation first, then capabilities, then selective growth',
    intro: 'Strategic responses build on each other. Settle positioning and unit economics first, strengthen the capabilities that fit the model, and only then add stores.',
    spec: {
      layout: 'pathway', title: 'Strategic Responses and Future Competitive Priorities', kicker: '',
      trunk: [
        { label: 'Strengthen positioning', detail: 'Target customer, core occasion, price level and distinctive proposition', kind: 'stage' },
        { label: 'Improve unit economics', detail: 'Site selection, store contribution, staffing, menu margins, waste and payback', kind: 'stage' },
      ],
      optionsLabel: 'Capabilities to strengthen, by model',
      options: [
        { label: 'Customer retention', detail: 'Reliable service, relevant loyalty and targeted communication' },
        { label: 'Channel optimisation', detail: 'Digital ordering where it adds demand at acceptable contribution' },
        { label: 'Supply resilience', detail: 'Diversified suppliers and better forecasting; Highlands’ roastery, Phúc Long’s own tea hills' },
        { label: 'People and systems', detail: 'Standard training, quality control and reporting' },
      ],
      afterLabel: 'Then',
      after: [
        { label: 'Expand selectively', detail: 'Markets and formats where demand, brand relevance and economics are validated', kind: 'outcome' },
      ],
      note: 'Phúc Long targets 40–50 new stores focused on Hanoi and a shorter payback in 2026 (company targets); Highlands same-store sales rose 11.5% in the second quarter of 2026. The order is a teaching sequence, not a measured ranking.',
      takeaway: 'Improve the whole business system so customer value, cost efficiency, consistency and growth reinforce one another.',
    },
  },
};
