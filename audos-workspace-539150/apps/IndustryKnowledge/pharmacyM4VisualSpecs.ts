import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Pharmacy Retail Module 04, keyed by visualKind. */
export const PHARMACY_M4_VISUALS: Record<string, ChapterVisual> = {
  'pharmacy-m4-11-structure': {
    heading: 'Chains spread into the provinces while independents keep most outlets',
    intro: 'Follow the chain count from 2019 to 2025 and watch where the new stores went, and why a broker now calls this a consolidation phase rather than a land grab.',
    spec: {
      layout: 'timeline', title: 'Market Fragmentation and Industry Consolidation', kicker: '',
      events: [
        { period: '2019', label: '492 chain pharmacy stores', detail: 'Only about 22% outside Ho Chi Minh City and Hanoi, calculated from Q&Me counts', status: 'historical' },
        { period: '2024', label: 'Modern penetration about 14%', detail: 'Vietcap estimate; about 95% of more than 50,000 pharmacies are still traditional', status: 'historical' },
        { period: 'Second quarter of 2025', label: 'KIS counts 3,475 modern pharmacies', detail: 'Broker view: a consolidation phase, as store growth no longer matched sales growth', status: 'historical' },
        { period: '2025', label: '3,457 chain stores in the Q&Me count', detail: 'About 63% now outside the two biggest cities', status: 'historical' },
      ],
      note: 'Q&Me store counts are survey data reproduced by a report aggregator; the KIS count comes from a different publisher, and the outlet shares and penetration are Vietcap estimates. Definitions differ by source.',
      takeaway: 'The market is organising and moving into provincial markets, but with most outlets still traditional, consolidation sharpens competition rather than removing independents.',
    },
  },
  'pharmacy-m4-12-dimensions': {
    heading: 'The reason for the visit decides which pharmacy wins the sale',
    intro: 'Price is always in the mix, but its weight changes with why the customer walked in. Follow each purchase occasion to the dimension that usually decides it.',
    spec: {
      layout: 'decision', title: 'Competitive Dimensions and Basis of Competition', kicker: '',
      root: { label: 'A customer choosing a pharmacy', detail: 'Weighs price, availability, location, range, service, trust and convenience at once' },
      question: 'What brought the customer in?',
      branches: [
        { condition: 'Urgent need', outcome: 'Availability and proximity first', detail: 'About 33,000 people per modern pharmacy, against about 4,000 in China (Vietcap estimate)', tone: 'positive' },
        { condition: 'Repeat purchase', outcome: 'Reliable service and consistent supply', detail: 'FPT reports a returning-customer rate of about 70% at Long Châu, a company claim', tone: 'positive' },
        { condition: 'Prescription medicine', outcome: 'Dispensing and professional responsibility', detail: 'Accurate information and dispensing support matter more than a small saving', tone: 'caution' },
        { condition: 'OTC or non-medicine goods', outcome: 'Visible price and range comparisons', detail: 'About 40% of health spending is paid out of pocket (World Bank), so price stays important', tone: 'caution' },
      ],
      note: 'FPT says Long Châu commits to delivery in under two hours, and Pharmacity says it offers more than 7,000 active products; both are company statements.',
      takeaway: 'A discount is matched quickly, so a pharmacy that wins several dimensions at once, such as proximity, stock and advice, is harder to displace.',
    },
  },
  'pharmacy-m4-13-barriers': {
    heading: 'A qualified pharmacist per outlet is the first gate, not the last',
    intro: 'Every pharmacy format passes the same legal gate, but the conditions differ by format. After the gate, look at what decides whether a new operator survives.',
    spec: {
      layout: 'pathway', title: 'Barriers to Entry and Competitive Intensity', kicker: '',
      trunk: [
        { label: 'Responsible person with practice certificate', detail: 'Required for each outlet under the Law on Pharmacy', kind: 'stage' },
      ],
      optionsLabel: 'Conditions by format',
      options: [
        { label: 'Drug counter', detail: 'Person in charge needs a pharmacy degree and 18 months of practice' },
        { label: 'Single pharmacy', detail: 'University pharmacy degree and two years of practice; less capital than a chain' },
        { label: 'Pharmacy chain', detail: 'Since 1 July 2025 the chain’s person in charge also needs a degree and two years; each store keeps its own' },
      ],
      afterLabel: 'What decides staying power',
      after: [
        { label: 'Fund stock and staff early', detail: 'Inventory, fit-out, deposits and technology paid before sales cover them', kind: 'stage' },
        { label: 'Recruit and keep pharmacists', detail: 'Store openings are capped by qualified staff, not by money alone', kind: 'stage' },
        { label: 'Build trust against rivals', detail: 'Eligible, traceable supply and local demand checked before opening', kind: 'stage' },
        { label: 'Compliant, sustainable stores', detail: 'Market access turned into trusted, profitable operation', kind: 'outcome' },
      ],
      note: 'Conditions summarise the consolidated Law on Pharmacy and Law 44/2024/QH15 from a legal database; check the current official text. Pharmacity’s losses and restructuring show capital and efficiency barriers bind large chains too.',
      takeaway: 'Regulation sets only the minimum; capital, pharmacist supply and customer trust decide who operates profitably after entry.',
    },
  },
  'pharmacy-m4-21-longchau': {
    heading: 'Long Châu’s lead rests on sales per store as much as store count',
    intro: 'Chain revenue grows when stores are added or when each store sells more. Read both branches, then the capabilities that stop new outlets diluting the average.',
    spec: {
      layout: 'driverTree', title: 'Long Châu', kicker: '',
      root: { label: 'Long Châu revenue, 2025', detail: 'VND 34,501 billion, up 36%; about two-thirds of FPT Retail’s revenue' },
      formula: 'Revenue = number of pharmacies × average sales per pharmacy',
      drivers: [
        {
          label: 'Store network', detail: '2,417 pharmacies at end-2025 after 474 openings in the year', op: '×',
          children: [
            { label: 'Share of chain stores', detail: 'More than half by May 2025, according to Vietcap' },
            { label: 'Expansion discipline', detail: 'Openings checked against local demand and payback' },
          ],
        },
        {
          label: 'Sales per store', detail: 'About VND 1.2 billion a month in 2025, company-reported', op: '×',
          children: [
            { label: '2023 broker comparison', detail: 'About US$43,000 a month, against US$18,000 at Pharmacity and US$16,000 at An Khang' },
            { label: 'What lifts it', detail: 'Broad assortment, centralised procurement, recognisable service and eligible digital channels' },
          ],
        },
      ],
      note: 'Store counts and revenue are company-reported figures published by a broker and the press; the 2023 comparison is from a Vietcap investor presentation. FPT Retail says it serves about 33 million customers.',
      takeaway: 'Store count builds reach, but only steady sales per store show that customers prefer the offer and new outlets are not cannibalising old ones.',
    },
  },
  'pharmacy-m4-22-pharmacity': {
    heading: 'Two chains that had to cut stores before they could grow again',
    intro: 'Both chains expanded, shrank and restructured. Compare their network paths and profit signals to see why store economics, not store count, set the pace of recovery.',
    spec: {
      layout: 'compare', title: 'Pharmacity and An Khang', kicker: '',
      leftTitle: 'Pharmacity', rightTitle: 'An Khang',
      rows: [
        { label: 'How the network began', a: 'Built a large network early in modern pharmacy expansion', b: 'Grew with the backing of Mobile World Investment Corporation' },
        { label: 'Store count path', a: 'More than 1,100 (September 2022), fewer than 900 (end-2024), over 1,100 (2026)', b: 'About 527 (2023), 326 (end-2024), 382 (end-2025)' },
        { label: 'Profit signal', a: 'Profit reported from the fourth quarter of 2025', b: 'Lost VND 112.96 billion in 2025; accumulated losses VND 1,115.3 billion' },
        { label: 'Latest move', a: 'First quarter of 2026: revenue up over 35%, same-store sales up over 20%', b: 'Withdrew from Hanoi' },
        { label: 'Growth ambition', a: '2,000 to 2,300 stores by 2030, replacing an earlier 5,000 by 2025', b: 'A smaller network, still loss-making in 2025' },
      ],
      note: 'Pharmacity figures come from a company press release, The Investor and CafeF; An Khang figures from Vietcap and Vietnamese financial news. Store counts differ by source and date.',
      takeaway: 'Closing weak stores cuts losses quickly, but recovery depends on whether the remaining stores offer something customers choose over rivals.',
    },
  },
  'pharmacy-m4-23-others': {
    heading: 'Regional, niche and neighbourhood rivals behind the national chains',
    intro: 'Pharmacy strength is local. Sort the competitors behind the largest chains by how they compete, and notice that each layer wins in a different place.',
    spec: {
      layout: 'taxonomy', title: 'Other Competitors and Independent Pharmacy Networks', kicker: '',
      root: 'Competition beyond the national chains', rootDetail: 'Strength depends on local density, supplier access, trust and execution',
      groups: [
        { label: 'Regional chains', detail: 'Scale in chosen areas without going nationwide', items: ['Trung Sơn Pharma: 230+ pharmacies in the Mekong Delta and Ho Chi Minh City', 'Dongwha bought 51% in 2023 for about US$30 million', 'Pharmacy and convenience model with GS25'] },
        { label: 'Smaller organised chains', detail: 'Shared brand, procurement and procedures over a limited network', items: ['Guardian: 126 stores in 2025', 'Medicare: 64 stores', 'Matsumoto Kiyoshi: 12 stores'] },
        { label: 'Independent community pharmacies', detail: 'About 95% of more than 50,000 pharmacies are traditional (Vietcap)', items: ['Convenient neighbourhood sites', 'Personal relationships', 'Knowledge of local buying'] },
        { label: 'Levers for smaller players', items: ['Regional specialisation', 'Partnerships or acquisitions where viable and legal', 'Monthly tracking of nearby rivals'] },
      ],
      note: 'Store counts are Q&Me survey and press figures, and sources differ for some chains. Press reports of Vietdata figures show Trung Sơn’s 2023 revenue fell about 7%, with a net loss of nearly VND 60 billion.',
      takeaway: 'National chains compete on scale, regional chains on focus and independents on local access, so a nearby opening matters more than a national total.',
    },
  },
  'pharmacy-m4-31-network': {
    heading: 'One survey date, very different maps of reach',
    intro: 'Totals hide where a chain can actually serve customers. Read where each chain’s stores sit in the 2025 Q&Me count before comparing sizes.',
    spec: {
      layout: 'table', title: 'Store Network, Geographic Coverage and Accessibility', kicker: '',
      headers: ['Chain', 'Where the stores sit (2025 survey)', 'Stores counted'],
      rows: [
        { label: 'Long Châu', a: '322 in Ho Chi Minh City, 235 in Hanoi, 1,420 elsewhere: about 72% outside (own calculation)', b: '1,977' },
        { label: 'Pharmacity', a: 'Strongest in Ho Chi Minh City, with 397 stores', b: '938' },
        { label: 'An Khang', a: 'No store in Hanoi', b: '326' },
        { label: 'Smaller organised chains', a: 'Guardian 126, Medicare 64, Phano 14, Matsumoto Kiyoshi 12', b: 'Limited networks' },
        { label: 'All chain pharmacies', a: 'Up from 492 in 2019', b: '3,457' },
      ],
      note: 'Q&Me survey counts reproduced by a report aggregator; company-reported networks at other dates differ (Long Châu reports 2,417 at end-2025). Vietcap says Long Châu held more than half of chain stores by May 2025.',
      takeaway: 'Store count shows reach, but fair benchmarks compare where stores are and what each sells, using one source and one reporting date.',
    },
  },
  'pharmacy-m4-32-experience': {
    heading: 'Running a like-for-like basket check across rival pharmacies',
    intro: 'Customers judge range, price, stock and service together. Follow the benchmarking visit step by step and note where a fair comparison needs adjusting.',
    spec: {
      layout: 'flow', title: 'Product Assortment, Pricing and Customer Experience', kicker: '',
      steps: [
        { label: 'Choose a small basket', detail: 'A prescription-free medicine, a supplement and a personal-care item, exact brand and pack', kind: 'stage' },
        { label: 'Visit rivals the same day', detail: 'Record which items are in stock and each price', kind: 'stage' },
        { label: 'Adjust prices like for like', detail: 'Correct for pack size and formulation before comparing', kind: 'stage' },
        { label: 'Observe the counter', detail: 'Waiting time, whether staff asked about symptoms, how they explain use and referral', kind: 'stage' },
        { label: 'Repeat before concluding', detail: 'Compare on other days before judging whose proposition is stronger', kind: 'outcome' },
      ],
      note: 'Long Châu’s about 70% returning-customer rate and under-two-hour delivery commitment are group claims. Law 44/2024 bans online retail of certain medicines, so digital convenience has legal limits.',
      takeaway: 'Promotions can win a first visit, but stock, credible value and dependable service decide repeat purchases and trust.',
    },
  },
  'pharmacy-m4-33-financial': {
    heading: 'Sales per outlet separates the profitable chain from the loss-makers',
    intro: 'Line up each chain’s sales per store with its profit signal. Keep each figure inside its own year, currency and source.',
    spec: {
      layout: 'table', title: 'Financial Performance, Operational Efficiency and Digital Capability', kicker: '',
      headers: ['Chain', 'Monthly sales per store', 'Profit signal'],
      rows: [
        { label: 'Long Châu', a: 'About US$43,000 (2023); about VND 1.2 billion (2025)', b: 'Small profit in 2023; 2025 gross margin 23.4% (22.2% a year earlier), net about 2.1%' },
        { label: 'Pharmacity', a: 'About US$18,000 (2023)', b: 'Loss in 2023; profit reported from the fourth quarter of 2025' },
        { label: 'An Khang', a: 'About US$16,000 (2023)', b: 'Lost VND 112.96 billion in 2025; accumulated losses VND 1,115.3 billion' },
      ],
      note: '2023 figures are from a Vietcap investor presentation; 2025 figures are broker and company-reported. A healthy gross margin can still end in a loss if sales per store do not cover operating costs.',
      takeaway: 'Market position becomes earnings only when each store sells enough to cover its stock, staff and rent.',
    },
  },
  'pharmacy-m4-41-supply': {
    heading: 'Keeping legitimate medicine on the shelf, from supplier check to supplier review',
    intro: 'Each step guards against a different failure, from illegitimate stock to expiry write-offs. Follow the cycle and see how the review feeds back into supplier choice.',
    spec: {
      layout: 'flow', title: 'Supply Reliability, Product Quality and Procurement Efficiency', kicker: '',
      steps: [
        { label: 'Qualify suppliers', detail: 'Verify credentials and product documents so supply stays legitimate', kind: 'stage' },
        { label: 'Coordinate procurement', detail: 'Consolidate demand where appropriate for better terms', kind: 'stage' },
        { label: 'Forecast replenishment', detail: 'Plan by store and category from sales patterns', kind: 'stage' },
        { label: 'Balance stock and expiry', detail: 'Keep common products available while monitoring shelf life', kind: 'stage' },
        { label: 'Assure quality and traceability', detail: 'Storage, handling and documents kept to standard; alternatives only where permitted', kind: 'stage' },
        { label: 'Review supplier performance', detail: 'Reliability, delivery times, quality and responsiveness', kind: 'outcome' },
      ],
      loop: 'Supplier reviews feed back into which suppliers stay qualified and how demand is consolidated.',
      note: 'Local manufacturers import more than 90% of raw materials (press report); the top three foreign-owned wholesalers hold about 40% of wholesale (market-research estimate). Circular 30/2025 on recalls and Circular 11/2025 on good practice make quality a compliance duty.',
      takeaway: 'Supply-chain performance is a front-line competitive capability that protects sales, margin and the licence to operate.',
    },
  },
  'pharmacy-m4-42-workforce': {
    heading: 'Why pharmacist-led trust is the slowest advantage to copy',
    intro: 'Trust is the outcome customers notice; its drivers sit underneath. See which inputs build it and why scarce pharmacists make the base so valuable.',
    spec: {
      layout: 'driverTree', title: 'Qualified Workforce, Professional Service and Customer Trust', kicker: '',
      root: { label: 'Customer trust', detail: 'Shown in repeat visits, fewer complaints and willingness to ask for advice' },
      drivers: [
        {
          label: 'Qualified staffing', detail: 'Practice-certificate and pharmacist-in-charge conditions met, including for chains', op: '+',
          children: [
            { label: 'Long Châu, July 2025', detail: 'More than 18,000 pharmacists across 2,222 pharmacies (company statement)' },
            { label: 'National scarcity', detail: '3.41 pharmacists per 10,000 people (2016 data) against a 2025–2030 target of 4.0' },
          ],
        },
        { label: 'Training and procedures', detail: 'Continuous training plus standard procedures for prescriptions, storage and documents', op: '+' },
        { label: 'Responsible consultation', detail: 'Appropriate information and referral; sales targets never override judgement', op: '+' },
        { label: 'Complaint handling', detail: 'Complaints investigated and turned into changes in training or procedure', op: '+' },
        { label: 'Customer data protection', detail: 'The 2025 data protection law covers health information', op: '+' },
      ],
      note: 'Pharmacist density is from a peer-reviewed article citing national data; Long Châu figures are company statements reported by the press.',
      takeaway: 'Qualified staff and consistent standards build trust slowly, which is exactly why rivals cannot copy it quickly.',
    },
  },
  'pharmacy-m4-43-scalable': {
    heading: 'Open the next store cohort only when the last one pays back',
    intro: 'Scalable chains open stores in groups and track each group against its payback plan. Follow the answers to see when expansion should continue, restart or pause.',
    spec: {
      layout: 'decision', title: 'Store Productivity, Digital Systems and Scalable Operations', kicker: '',
      root: { label: 'New store cohort under review', detail: 'Sales and profit tracked against the payback plan; central replenishment keeps stock available' },
      question: 'Is the cohort reaching its payback plan?',
      branches: [
        { condition: 'Yes, on plan', outcome: 'Open the next cohort', detail: 'Long Châu management told a broker in 2023 that new stores broke even in about six months', tone: 'positive' },
        { condition: 'Recovering after pruning', outcome: 'Restart selectively', detail: 'Pharmacity: same-store sales up over 20% in the first quarter of 2026; 500 more stores planned', tone: 'caution' },
        { condition: 'No, falling short', outcome: 'Pause openings', detail: 'Chains that grew faster than their systems and people had to close or restructure stores', tone: 'negative' },
      ],
      note: 'The break-even time is a 2023 management claim recorded by a broker and the Pharmacity figures are company statements; neither is an independent measure. Long Châu averaged about VND 1.2 billion per store per month in 2025.',
      takeaway: 'Scaling well means adding stores without letting each one earn less, which takes systems, data and the discipline to pause.',
    },
  },
  'pharmacy-m4-51-swot': {
    heading: 'Steady pharmacy demand meets uneven execution capability',
    intro: 'Read the four quadrants, then pair them: which strength can capture which opportunity, and which weakness leaves a business exposed to which threat.',
    spec: {
      layout: 'taxonomy', title: 'SWOT Analysis of Vietnam’s Pharmacy Retail Industry', kicker: '',
      root: 'Vietnam pharmacy retail', rootDetail: 'Demand is not the constraint; execution is',
      groups: [
        { label: 'Strengths', detail: '14.2 million people aged 60 and over in 2024 (VietnamPlus)', items: ['Essential, recurring demand', 'Pharmacists’ professional role', 'Potential to standardise'] },
        { label: 'Weaknesses', detail: 'About 95% of more than 50,000 outlets are traditional', items: ['Fragmented market', 'Uneven capabilities', 'Inventory complexity', 'Thin technology budgets for small operators'] },
        { label: 'Opportunities', detail: 'Modern pharmacies about 14% of the market in 2024 (Vietcap estimate)', items: ['Modern network growth', 'Better systems', 'Convenient services', 'Stronger quality controls'] },
        { label: 'Threats', detail: 'An Khang’s accumulated losses reached VND 1,115.3 billion', items: ['Price competition and rising costs', 'Supply disruption', 'Rule changes, such as the 2024 pharmacy law amendments', 'Staffing pressure', 'Unprofitable expansion'] },
      ],
      note: 'The World Bank reports pharmaceuticals were about 75% of out-of-pocket health spending in 2022. KIS counted 3,475 modern pharmacies in the second quarter of 2025, a different count from the Q&Me figure.',
      takeaway: 'Demand growth is an opportunity, not a guarantee of profit: chains need scale and efficiency, independents local relationships and discipline.',
    },
  },
  'pharmacy-m4-52-challenges': {
    heading: 'When expansion outruns control, every pressure lands at once',
    intro: 'Each challenge looks manageable alone. See who applies each pressure, and imagine them compounding when a chain opens stores faster than it can control them.',
    spec: {
      layout: 'ecosystem', title: 'Major Strategic Challenges for Pharmacy Retailers', kicker: '',
      center: { label: 'Pharmacy retailer', detail: 'Balancing growth pace with operational control' },
      actors: [
        { label: 'New outlets', relation: 'Must earn enough to cover operating expenses; An Khang lost VND 112.96 billion in 2025', flows: ['money'] },
        { label: 'Rival pharmacies', relation: 'Price competition that erodes margin if unmanaged', flows: ['money'] },
        { label: 'Suppliers', relation: 'Concentration, shortages, delays and quality concerns; stock ties up working capital', flows: ['product', 'risk'] },
        { label: 'Qualified staff', relation: 'Hard to recruit and keep; turnover affects service', flows: ['service'] },
        { label: 'Regulators', relation: 'Circulars 11/2025 and 30/2025 raise documentation and recall duties; some online sales restricted', flows: ['oversight'] },
        { label: 'Customers', relation: 'Trust lost quickly through unsupported claims or sales-first practices; health data must be protected', flows: ['information'] },
      ],
      note: 'Pharmacity cut its goal from 5,000 stores by 2025 to 2,000–2,300 by 2030. Globally, Walgreens planned to close about 1,200 stores over three years, so scale does not guarantee success.',
      takeaway: 'When stockouts, write-offs, staff turnover and audit findings rise together, slowing openings is how a chain protects the stores it already has.',
    },
  },
  'pharmacy-m4-53-responses': {
    heading: 'Each strategic response paired with the number that proves it works',
    intro: 'A priority without a measure is only an intention. Read each response alongside the indicator a board would review every quarter.',
    spec: {
      layout: 'table', title: 'Strategic Responses and Future Competitive Priorities', kicker: '',
      headers: ['Priority', 'What to do', 'How to measure'],
      rows: [
        { label: 'Strengthen core operations', a: 'Stock accuracy, replenishment, supplier management and cost control', b: 'Stockout and expiry rates' },
        { label: 'Focus on store productivity', a: 'Review each outlet’s sales, profit and local demand', b: 'Sales and profit per store' },
        { label: 'Differentiate the proposition', a: 'Compete on range, service, convenience or professional support', b: 'Customer satisfaction' },
        { label: 'Develop the workforce', a: 'Train and retain staff to consistent standards', b: 'Training and turnover' },
        { label: 'Use data in decisions', a: 'Apply analytics to forecasting and assortment', b: 'Forecast accuracy' },
        { label: 'Expand selectively', a: 'Open only where demand and economics are realistic', b: 'Payback of new cohorts' },
        { label: 'Integrate digital services', a: 'Eligible online services with stock visibility and controls', b: 'Order fulfilment rate' },
        { label: 'Strengthen risk management', a: 'Monitor rules, suppliers, quality and financial exposure', b: 'Audit findings' },
      ],
      note: 'Reviewed together, the measures form a balanced scorecard. Pharmacity, for example, plans 500 more stores in three years toward 2,000 to 2,300 by 2030, tied to new cohorts breaking even; these are press-reported plans.',
      takeaway: 'Future competition rewards proven execution over market presence, so every priority needs a measure that leaders review regularly.',
    },
  },
};
