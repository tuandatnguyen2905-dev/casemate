import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Pharmacy Retail Module 03, keyed by visualKind. */
export const PHARMACY_M3_VISUALS: Record<string, ChapterVisual> = {
  'pharmacy-m3-11-models': {
    heading: 'Neighbourhood trust against network scale in medicine retail',
    intro: 'Both models sell similar medicines under the same professional rules. Compare where each one gets its edge, and what each gives up to get it.',
    spec: {
      layout: 'compare', title: 'Independent Pharmacies vs. Pharmacy Chains', kicker: '',
      leftTitle: 'Independent pharmacy', rightTitle: 'Pharmacy chain',
      rows: [
        { label: 'Who runs it', a: 'Individual owner or small operator deciding in the store', b: 'Central management and reporting across outlets under one brand' },
        { label: 'How stock is bought', a: 'Local supplier relationships, but less buying power', b: 'Demand consolidated across outlets' },
        { label: 'How customers are kept', a: 'Personal familiarity with repeat customers', b: 'Loyalty programmes and service standards' },
        { label: 'How work is standardised', a: 'Flexible, with fewer formal systems', b: 'Common layouts, inventory, training and service, at heavy fixed cost' },
        { label: 'Vietnam picture', a: 'Over 60,000 private pharmacies, about 85% of the market (trade estimate)', b: 'Long Châu, Pharmacity and An Khang' },
      ],
      note: 'Store averages for 2025 use different definitions: about VND 1.2 billion a month at Long Châu against about VND 550 million at An Khang, which still lost VND 112.96 billion.',
      takeaway: 'Neither model wins everywhere: the neighbourhood, product and customer decide, and both must meet the same professional and legal standards.',
    },
  },
  'pharmacy-m3-12-partnership': {
    heading: 'Growing a pharmacy brand without owning every store',
    intro: 'Franchising, partnering and specialising let pharmacies stand out without simply adding outlets. Notice that every route still ends at a licensed outlet with its own responsible pharmacist.',
    spec: {
      layout: 'taxonomy', title: 'Franchise, Partnership and Specialty Pharmacy Models', kicker: '',
      root: 'Alternative pharmacy models', rootDetail: 'Differentiate without relying only on store count',
      groups: [
        { label: 'Franchise or licensed brand', detail: 'Local operators use a shared brand and operating system under agreed terms', items: ['Medi Pharma: 500+ franchised pharmacies (company claim)', 'CIRCA: tiered packages with exclusive radius protection', 'Phano: franchising since 2016'] },
        { label: 'Strategic partnership', detail: 'Links with healthcare providers, suppliers or service organisations, set by contract', items: ['Phano later joined Masan’s WinMart ecosystem', 'Trung Son Pharma: pharmacy and GS25 convenience model (press report)'] },
        { label: 'Specialty focus', detail: 'Range and services built around one kind of need', items: ['Chronic care: diabetes and cardiovascular needs', 'Medical devices: permitted equipment', 'Family health: parents and caregivers'] },
      ],
      note: 'Whatever the model, the agreement should state who buys stock, keeps records, trains staff and answers to the regulator; blurred responsibilities are the most common weakness.',
      takeaway: 'Partnership and focus can differentiate a pharmacy, but they never remove licensing, professional accountability or product-specific controls.',
    },
  },
  'pharmacy-m3-13-omnichannel': {
    heading: 'The licensed store behind every app order',
    intro: 'An app can show products and take orders, but the medicine still comes from a pharmacy with stock, staff and records. See what flows between that store and each digital link.',
    spec: {
      layout: 'ecosystem', title: 'Omnichannel and Digital-Enabled Pharmacy Models', kicker: '',
      center: { label: 'Licensed physical pharmacy', detail: 'Holds stock, qualified staff and records; prepares eligible online orders' },
      actors: [
        { label: 'Website and app', relation: 'Searchable catalogue and general information within advertising rules', flows: ['information'] },
        { label: 'Online customer', relation: 'Orders eligible products and gets updates; medicine questions go to qualified staff', flows: ['money', 'information'] },
        { label: 'Integrated stock systems', relation: 'Show availability; sales and stock data inform forecasts within privacy rules', flows: ['information'] },
        { label: 'Delivery', relation: 'Eligible orders carried with the required handling', flows: ['product'] },
        { label: 'Medicine rules', relation: 'Eligible OTC medicines online since 1 July 2025; consultation evidence kept 24 months', flows: ['oversight'] },
      ],
      note: 'Prescription, specially controlled and restricted-retail medicines stay offline, and social media and livestream sales are barred. A stock mismatch between app and shelf directly causes failed orders.',
      takeaway: 'Digital reach only creates value when stock data are accurate, orders can be fulfilled and regulated transactions stay controlled.',
    },
  },
  'pharmacy-m3-21-medicines': {
    heading: 'Two medicine routes: the doctor’s decision and the customer’s own choice',
    intro: 'A prescription treatment and a cough remedy share a pharmacy but follow different rules. Compare what triggers each sale and what the counter must check.',
    spec: {
      layout: 'compare', title: 'Prescription Medicines and Over-the-Counter Medicines', kicker: '',
      leftTitle: 'Prescription medicine', rightTitle: 'OTC medicine',
      rows: [
        { label: 'Who decides', a: 'A doctor, under legal conditions', b: 'The customer, often needing advice' },
        { label: 'What drives demand', a: 'Consultations and ongoing treatment', b: 'Common symptoms and immediate needs' },
        { label: 'Typical range', a: 'Prescribed treatments kept available', b: 'Pain, allergy, cough and cold, digestive complaints' },
        { label: 'Counter controls', a: 'Check prescription requirements; follow dispensing procedures', b: 'Explain approved instructions within the pharmacist’s scope' },
      ],
      note: 'OTC sales were about US$1.8 billion in 2025, 23.4% of pharma sales (research forecast reported by VIR). A broker puts medicines at roughly 60 to 70% of Long Châu’s sales (approximate). Prescription medicines generally cannot be sold online.',
      takeaway: 'Keep the two routes separate: the aim is the appropriate product through a compliant, safe process, not the most medicine sold.',
    },
  },
  'pharmacy-m3-22-consumer': {
    heading: 'Beyond the dispensing counter: categories that widen the basket',
    intro: 'Supplements, devices and family-care products bring customers in for prevention and routine buys. For each group, look at what it needs before it earns its shelf space.',
    spec: {
      layout: 'taxonomy', title: 'Consumer Healthcare, Supplements and Medical Devices', kicker: '',
      root: 'Non-medicine pharmacy categories', rootDetail: 'More convenience and revenue, more stock and information to control',
      groups: [
        { label: 'Vitamins and supplements', detail: 'Need careful explanation of intended use and limits', items: ['Ranged by demand, supplier reliability and quality', 'Claims kept consistent with the rules'] },
        { label: 'Medical devices', detail: 'Need operating instructions', items: ['Thermometers', 'Blood-pressure monitors', 'Glucose meters', 'Wound care'] },
        { label: 'Personal and family care', detail: 'Need suitability for the person using them', items: ['Skincare', 'Oral care', 'Hygiene', 'Maternal and baby products'] },
        { label: 'Controls across every category', detail: 'Applied before a line is added or promoted', items: ['Sourcing, documents, packaging and registration verified', 'Organised by need, frequency, shelf space and turnover', 'Complementary products only when relevant'] },
      ],
      note: 'Long Châu Plus carries more than 1,500 items (analyst description); Pharmacity has run a private label since 2015. A 2021 report put medicines and health products above 50% of sales at Long Châu and An Khang but 27 to 40% at Pharmacity (historical).',
      takeaway: 'A line that sells slowly or expires costs more than it earns, so category growth must rest on quality, honest claims and clear separation from medicines.',
    },
  },
  'pharmacy-m3-23-services': {
    heading: 'Where counter advice stops and a referral begins',
    intro: 'Many customers treat the pharmacy as their first stop for advice. Follow how a pharmacist decides whether to answer, offer a check or send the customer on.',
    spec: {
      layout: 'decision', title: 'Pharmacy Services and Professional Consultation', kicker: '',
      root: { label: 'A customer question at the counter', detail: 'Dosage, side effects, storage, interactions or safe use of several medicines' },
      question: 'Does answering it need diagnosis, a treatment decision or assessment beyond the pharmacist’s scope?',
      branches: [
        { condition: 'No: a medicine-use question', outcome: 'The pharmacist explains', detail: 'Prescribed instructions, precautions, labels and storage, in understandable terms', tone: 'positive' },
        { condition: 'The customer wants a measurement', outcome: 'Offer it only if authorised', detail: 'Selected measurements only where equipped, staffed and authorised', tone: 'caution' },
        { condition: 'Yes: symptoms or reactions', outcome: 'Refer to a physician', detail: 'Direct the customer to a physician or other professional for assessment', tone: 'caution' },
      ],
      note: 'Long Châu reported more than 18,000 pharmacists across 2,222 pharmacies in July 2025 (company statement). Vietnam had 3.41 pharmacists per 10,000 people in 2016 data, against a 2025–2030 target of 4.0.',
      takeaway: 'Trust comes from accurate, understandable and appropriately limited guidance, and that depends on protected pharmacist time.',
    },
  },
  'pharmacy-m3-31-chronic': {
    heading: 'Keeping a long-term patient’s refills on schedule',
    intro: 'Chronic-care customers come back because their treatment cannot pause. Follow one refill cycle and spot where a shortage or a pushy reminder could send them elsewhere.',
    spec: {
      layout: 'flow', title: 'Chronic Disease Patients and Repeat-Purchase Customers', kicker: '',
      steps: [
        { label: 'Refill timing identified', detail: 'Matched to the prescription and instructions; reminders only with consent', kind: 'stage' },
        { label: 'Frequent products kept in stock', detail: 'Demand monitored so the customer’s medicine is on the shelf', kind: 'stage' },
        { label: 'Shortages explained openly', detail: 'Clear communication when a product is unavailable', kind: 'decision' },
        { label: 'Dispense and explain use', detail: 'No more than the prescribed quantity; clinical questions go to the right professional', kind: 'stage' },
        { label: 'Records kept lawfully', detail: 'Relevant information kept while protecting health data', kind: 'stage' },
        { label: 'Retention measured', detail: 'Repeat visits, satisfaction and fulfilment reliability tracked', kind: 'outcome' },
      ],
      loop: 'The next refill restarts the cycle, unless stock shortages, price, location, service quality or a change in treatment send the customer elsewhere.',
      note: 'Non-communicable diseases cause up to 73.7% of Vietnam’s disease burden and deaths (Ministry of Health); about seven million people have diabetes (market research estimate).',
      takeaway: 'Repeat purchase is earned at every refill, and retention activity must never interfere with clinical decisions or push unneeded products.',
    },
  },
  'pharmacy-m3-32-families': {
    heading: 'Buying health products for someone you care about',
    intro: 'Parents, adult children and prevention-minded shoppers are cautious because the outcome matters to them. Read what each worries about and what helps them choose well.',
    spec: {
      layout: 'table', title: 'Families, Caregivers and Preventive Healthcare Consumers', kicker: '',
      headers: ['Buyer', 'What concerns them', 'What helps them decide'],
      rows: [
        { label: 'Parents buying for children', a: 'Age suitability, instructions, quality and safe storage', b: 'Age-appropriate guidance, with complex questions referred' },
        { label: 'Adult children buying for older parents', a: 'Labels, storage and how a product fits existing treatment', b: 'A short written summary to take home' },
        { label: 'Preventive-care consumers', a: 'Advertising, social media and misconceptions about prevention', b: 'What the product is for, what it does not do, when to see a doctor' },
      ],
      note: 'Vietnam had about 14.2 million people aged 60 and over in 2024, with nearly 18 million expected by 2030. Law 91/2025/QH15 requires consent for processing health information kept in family purchase records.',
      takeaway: 'Help these customers make informed choices: no fear, no exaggerated benefits and no unnecessary product combinations.',
    },
  },
  'pharmacy-m3-33-convenience': {
    heading: 'Price, proximity, speed and confidence pull on one purchase',
    intro: 'The same person may compare prices online, walk to the nearest store and still want a pharmacist’s view. See the drivers that together decide where a purchase lands.',
    spec: {
      layout: 'driverTree', title: 'Price-Sensitive, Convenience-Oriented and Digitally Engaged Customers', kicker: '',
      root: { label: 'Where the customer buys', detail: 'Preferences overlap, so the whole purchasing journey matters' },
      drivers: [
        { label: 'Price', detail: 'Clear prices and permitted lower-cost alternatives', children: [{ label: 'Out-of-pocket pressure', detail: 'About 40% of health spending, 75% for pharmaceuticals (World Bank)' }] },
        { label: 'Location and hours', detail: 'Store coverage and opening hours matched to local demand', children: [{ label: 'Provincial reach', detail: '1,420 of 1,977 Long Châu stores outside Hanoi and Ho Chi Minh City (Q&Me survey)' }] },
        { label: 'Speed', detail: 'Short waits through staffing, stock organisation and checkout', children: [{ label: 'Delivery promise', detail: 'Long Châu commits to under two hours (company claim)' }] },
        { label: 'Availability', detail: 'Accurate stock information through authorised digital channels' },
        { label: 'Confidence', detail: 'Online enquiries connected with in-store service', children: [{ label: 'Returning customers', detail: 'About 70% at Long Châu, per FPT Retail (company claim)' }] },
      ],
      note: 'Competing on price alone can weaken margins, and convenience without reliable fulfilment may not create loyalty.',
      takeaway: 'An accurate answer that comes a little slower protects trust better than a fast promise the store cannot keep.',
    },
  },
  'pharmacy-m3-41-revenue': {
    heading: 'Best sellers are not always best earners on the pharmacy shelf',
    intro: 'Each category has its own purchase frequency, price, supplier terms and shelf life. Read what brings in each sale and what to weigh before calling a category profitable.',
    spec: {
      layout: 'table', title: 'Revenue Sources and Product-Mix Economics', kicker: '',
      headers: ['Revenue source', 'What brings the sale', 'Read it alongside'],
      rows: [
        { label: 'Prescription medicines', a: 'Compliant dispensing of prescribed medicines', b: 'Procurement terms and the stock it needs' },
        { label: 'OTC medicines', a: 'Permitted self-care needs', b: 'Inventory turnover and expiry risk' },
        { label: 'Devices, supplements and personal care', a: 'Broader household and prevention needs', b: 'Gross profit against inventory held' },
        { label: 'Permitted healthcare services', a: 'Services some operators offer', b: 'Assessed separately from product sales' },
      ],
      note: 'Long Châu’s 2025 revenue was about VND 34.5 trillion, up about 36%, with a 23.4% gross margin against 22.2% in 2024 (broker estimates). A broker expects around 30% on high-value products such as Sybrava and Ozempic: an expectation, not a result.',
      takeaway: 'Revenue growth is not gross-profit growth: the mix, buying terms and the cost of each sale decide what is left.',
    },
  },
  'pharmacy-m3-42-costs': {
    heading: 'Why a cheap supplier can still raise the cost to serve',
    intro: 'A low purchase price is only one input. See the cost blocks that together decide how much of each sale remains, and why they do not shrink when sales do.',
    spec: {
      layout: 'driverTree', title: 'Procurement, Labor, Occupancy and Operating Costs', kicker: '',
      root: { label: 'Total cost to serve', detail: 'What it takes to deliver each product and service to a customer' },
      formula: 'Cost to serve = procurement + labour + occupancy + logistics + technology + compliance',
      drivers: [
        { label: 'Procurement', detail: 'Usually the largest cost, because stock is bought before it sells', op: '+', children: [{ label: 'More than the price', detail: 'Fill rate, delivery accuracy and expiry profile also count' }] },
        { label: 'Labour', detail: 'Required pharmacist cover across opening hours', op: '+', children: [{ label: 'Long Châu pay', detail: 'About VND 12 million a month for pharmacists, 17 to 20 million for managers (company)' }] },
        { label: 'Occupancy', detail: 'Rent and utilities by size, location and hours', op: '+' },
        { label: 'Logistics', detail: 'Warehouse, delivery and replenishment', op: '+' },
        { label: 'Technology', detail: 'Inventory software, point-of-sale and digital platforms', op: '+' },
        { label: 'Compliance', detail: 'Licences, documents, training and quality controls', op: '+' },
      ],
      note: 'For FRT as a whole, including FPT Shop, SG&A was about VND 8,696 billion on net sales of VND 51,083 billion in 2025, about 17% (calculated from broker figures).',
      takeaway: 'Lower overhead or a lower price does not guarantee lower total cost once purchasing terms, stock losses and efficiency are counted.',
    },
  },
  'pharmacy-m3-43-unit-economics': {
    heading: 'How gross margin sets the sales a new store must reach',
    intro: 'Move the sliders for a hypothetical store to see how monthly fixed costs and gross margin set the sales needed just to break even.',
    spec: {
      layout: 'scenario', title: 'Inventory Economics, Profitability and Unit Economics', kicker: '',
      inputs: [
        { key: 'fixed', label: 'Monthly fixed costs (rent, staff, utilities)', min: 50, max: 500, step: 10, value: 100, unit: 'VND million' },
        { key: 'margin', label: 'Gross margin rate', min: 15, max: 35, step: 0.5, value: 23, unit: '%' },
      ],
      outputs: [
        { label: 'Monthly sales needed to break even', unit: 'VND million', digits: 0, compute: (v) => v.fixed / (v.margin / 100) },
        { label: 'Sales needed per VND 100 of costs', unit: 'VND', digits: 0, compute: (v) => 100 / (v.margin / 100) },
      ],
      assumption: 'Hypothetical store, not company data. Break-even sales = monthly fixed costs ÷ gross margin rate, the chapter’s own rule: at about 23% margin, VND 100 of costs needs roughly VND 435 of sales.',
      note: 'For scale only: Long Châu’s 2025 gross margin was about 23.4% (broker estimate) and its net margin about 2.1% (press report); in 2023 management expected new stores to break even in about six months (company statement).',
      takeaway: 'With thin margins, small changes in costs, turnover or expiry losses move break-even a long way, so each store is judged on its own.',
    },
  },
  'pharmacy-m3-51-physical': {
    heading: 'Does this neighbourhood justify one more pharmacy?',
    intro: 'Proximity brings customers in, but it does not pay the rent by itself. Follow how a chain judges a candidate site and what happens when one condition fails.',
    spec: {
      layout: 'decision', title: 'Physical Pharmacy Stores and Retail Networks', kicker: '',
      root: { label: 'Candidate store location', detail: 'Residential density, access, nearby healthcare facilities, competition and rent evaluated' },
      question: 'Will local demand cover this outlet’s own costs with reliable stock and service?',
      branches: [
        { condition: 'Yes', outcome: 'Open and run to network standards', detail: 'Adapt the range locally; track sales, gross profit, availability and cost by outlet', tone: 'positive' },
        { condition: 'Busy, but stock or staff fall short', outcome: 'The store loses customers', detail: 'Out-of-stock products and overstretched staff send people elsewhere', tone: 'caution' },
        { condition: 'Close to homes, but rent too high', outcome: 'The store loses money', detail: 'Outlet reports flag it for help or closure', tone: 'negative' },
      ],
      note: 'Long Châu ended 2025 with 2,417 pharmacies (broker report). An earlier 2025 Q&Me survey found 1,420 of its 1,977 stores outside Hanoi and Ho Chi Minh City, where premises cost much less (2023 broker report).',
      takeaway: 'Location is necessary but not enough: each outlet must earn its own costs through local demand, stock and service.',
    },
  },
  'pharmacy-m3-52-ecommerce': {
    heading: 'Sorting an online medicine order by what the law allows',
    intro: 'An app makes ordering easy, but every product keeps its legal category. Follow an online order from the catalogue through the eligibility split to fulfilment.',
    spec: {
      layout: 'pathway', title: 'E-commerce, Mobile Applications and Omnichannel Retail', kicker: '',
      trunk: [
        { label: 'Online product catalogue', detail: 'Accurate information and eligible purchase options on a licensed platform, app or website', kind: 'stage' },
        { label: 'Classification and prescription check', detail: 'Digital compliance controls restrict and verify regulated products', kind: 'decision' },
      ],
      optionsLabel: 'What happens to the order',
      options: [
        { label: 'Eligible OTC medicine', detail: 'May be sold online since 1 July 2025, after consulting the buyer; records kept 24 months' },
        { label: 'Prescription, controlled or restricted-retail', detail: 'Remains barred online' },
        { label: 'Social media or livestream request', detail: 'Barred; direct the customer to the licensed ordering channel' },
      ],
      afterLabel: 'Fulfilling an eligible order',
      after: [
        { label: 'Order management', detail: 'Confirmation, payment, preparation and customer communication', kind: 'stage' },
        { label: 'Stock-linked fulfilment', detail: 'Online availability tied to store or warehouse stock, with store help', kind: 'outcome' },
      ],
      note: 'Sellers must publish their certificate, pharmacist and medicine information. Long Châu began online purchase with VNeID verification on 1 January 2025 (company-reported); the Drug Administration wrote to Shopee and Meta in April 2025 about illegal sales.',
      takeaway: 'Technology widens convenience, but it does not remove the legal and professional rules attached to each medicine sale.',
    },
  },
  'pharmacy-m3-53-logistics': {
    heading: 'From central warehouse to the customer’s door, intact and on record',
    intro: 'Fast delivery only counts if the right product arrives in the right condition. Follow stock through each handover and what each stage must protect.',
    spec: {
      layout: 'flow', title: 'Warehousing, Distribution and Last-Mile Fulfillment', kicker: '',
      steps: [
        { label: 'Authorised supply in', detail: 'Through authorised wholesalers, distribution centres or other approved arrangements', kind: 'stage' },
        { label: 'Warehouse organisation', detail: 'Stock arranged by product characteristics, storage needs, expiry and priority', kind: 'stage' },
        { label: 'Consolidation and replenishment', detail: 'Demand combined across stores; sales and stock data schedule deliveries', kind: 'stage' },
        { label: 'Last-mile delivery', detail: 'Method and provider chosen by product and rules; required conditions kept', kind: 'stage' },
        { label: 'Right product, right condition', detail: 'Batch and movement records let every product be followed', kind: 'outcome' },
      ],
      loop: 'Reliability, fulfilment time, damage and cost are measured separately, because a fast average can hide late or damaged orders.',
      note: 'Long Châu describes two central warehouses, 35,000 m² in Hanoi and 45,000 m² in Long An, meeting GDP and GSP standards, with capacity of about 70,000 orders a day (company description). Online parcels must show storage conditions and the latest delivery time.',
      takeaway: 'Speed only has value when the product is available, intact and traceable on arrival.',
    },
  },
  'pharmacy-m3-61-upstream': {
    heading: 'Rule-makers, manufacturers and wholesalers a pharmacy cannot do without',
    intro: 'A pharmacy cannot make or register its own medicines. See what each upstream party supplies, from legal permission to product and paperwork, and where disruption would start.',
    spec: {
      layout: 'ecosystem', title: 'Regulators, Manufacturers and Pharmaceutical Distributors', kicker: '',
      center: { label: 'Pharmacy retailer', detail: 'Needs appropriate suppliers, documents and controls for its activities' },
      actors: [
        { label: 'Ministry of Health and Drug Administration', relation: 'Set rules on business, quality, registration, dispensing and practice; issue quality alerts and recalls', flows: ['oversight', 'information'] },
        { label: 'Manufacturers', relation: 'Produce medicines; assessed on quality, reliability, documentation and capacity', flows: ['product'] },
        { label: 'Importers', relation: 'Bring in eligible products; foreign firms must sell to licensed domestic distributors', flows: ['product'] },
        { label: 'Wholesale distributors', relation: 'Nearly 8,000 establishments; Zuellig Pharma, Diethelm and Mega Products hold about 40% (estimate)', flows: ['product', 'money'] },
      ],
      note: 'Law 44/2024/QH15, Decree 163/2025/ND-CP and Circulars 11, 30 and 31 of 2025 took effect on 1 July 2025; Circular 30/2025/TT-BYT governs recalls. The national strategy aims for 80% of volume from domestic production by 2030.',
      takeaway: 'Upstream partners supply more than stock: quality, traceability, delivery reliability and compliance all flow down to the shelf.',
    },
  },
  'pharmacy-m3-62-professionals': {
    heading: 'Who decides, who dispenses and who runs the pharmacy',
    intro: 'A prescription passes through several hands before it reaches the patient. Follow it step by step and notice where commercial pressure must never reach.',
    spec: {
      layout: 'flow', title: 'Pharmacy Operators, Pharmacists and Healthcare Providers', kicker: '',
      steps: [
        { label: 'Diagnose and prescribe', detail: 'Outpatient prescribing moves to a national e-prescription system', owner: 'Physician', kind: 'stage' },
        { label: 'Retrieve the prescription', detail: 'The pharmacy pulls it from the system by code', owner: 'Pharmacy', kind: 'stage' },
        { label: 'Verify and dispense', detail: 'Required verification and dispensing process', owner: 'Pharmacist', kind: 'stage' },
        { label: 'Explain and escalate', detail: 'Explain use; spot situations needing further assessment and refer', owner: 'Pharmacist', kind: 'decision' },
        { label: 'Report the sale', detail: 'Sale reported back to the e-prescription system', owner: 'Pharmacy', kind: 'outcome' },
      ],
      loop: 'The operator supports every step with staffing, training and complaint review, and sets targets for store sales rather than for particular medicines.',
      note: 'Each outlet needs a responsible person holding a pharmacy practice certificate; e-prescribing is set by Circular 26/2025/TT-BYT. Long Châu reports more than 18,000 pharmacists (company statement); Vietnam had 3.41 pharmacists per 10,000 people in 2016 data, against a 4.0 target for 2025–2030.',
      takeaway: 'Commercial performance and care quality can be managed together only if sales targets never override dispensing or clinical judgement.',
    },
  },
  'pharmacy-m3-63-partners': {
    heading: 'Partners that speed up a pharmacy without taking its responsibilities',
    intro: 'Software, payment, delivery and platform partners fill gaps a chain cannot build alone. See what each one handles, and note that compliance and customer data stay with the pharmacy.',
    spec: {
      layout: 'ecosystem', title: 'Technology Providers, Logistics Partners and Consumers', kicker: '',
      center: { label: 'Pharmacy, still accountable', detail: 'Responsible for its own compliance, customer data and medicine handling' },
      actors: [
        { label: 'Software providers', relation: 'Inventory, point-of-sale, reporting and management systems; FPT Software built Long Châu’s 2025 warehouse system', flows: ['information'] },
        { label: 'Digital platforms', relation: 'Websites, apps, enquiries and eligible online ordering; VNeID verification for online purchases', flows: ['information'] },
        { label: 'Payment providers', relation: 'Electronic payments and reconciliation', flows: ['money'] },
        { label: 'Logistics partners', relation: 'Transport with handling and accountability arrangements; SwiftHub announced a US$5 million fulfilment centre', flows: ['product'] },
        { label: 'Consumers and caregivers', relation: 'Set demand through purchases, service expectations and trust; feedback shows what to improve', flows: ['money', 'information'] },
      ],
      note: 'Partner agreements should state what data may be accessed, for what purpose, for how long, and how incidents are reported. Law 91/2025/QH15 sets fines of up to VND 3 billion for most data-protection violations.',
      takeaway: 'Partners can raise efficiency, but poor integration or weak controls create service failures that the pharmacy still answers for.',
    },
  },
};
