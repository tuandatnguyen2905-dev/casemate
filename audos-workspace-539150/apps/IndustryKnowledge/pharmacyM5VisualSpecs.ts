import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Pharmacy Retail Module 05, keyed by visualKind. */
export const PHARMACY_M5_VISUALS: Record<string, ChapterVisual> = {
  'pharmacy-m5-11-preventive': {
    heading: 'Wellness shelves grow only as far as customers trust the advice',
    intro: 'Rising interest in staying well widens what a pharmacy can sell. See which activities build a relevant range and which protect the trust that keeps that demand going.',
    spec: {
      layout: 'driverTree', title: 'Increasing Healthcare Awareness and Preventive Health Consumption', kicker: '',
      root: { label: 'Lasting preventive-health demand', detail: 'Wellness sales that hold up because customers trust the pharmacy' },
      formula: 'Lasting demand = relevant range × customer trust',
      drivers: [
        {
          label: 'Relevant wellness range', detail: 'Stock what customers actually ask for', op: '×',
          children: [
            { label: 'Preventive assortment', detail: 'Vitamins, supplements, thermometers and blood-pressure monitors' },
            { label: 'Wellness category management', detail: 'Demand by age group, so slow movers are not overstocked' },
            { label: 'Trend monitoring', detail: 'Customer questions and sales reveal changing interests' },
          ],
        },
        {
          label: 'Customer trust', detail: 'Recommendations tied to need, not to clearing stock', op: '×',
          children: [
            { label: 'Consumer education', detail: 'What each product is for and what it cannot do' },
            { label: 'Responsible recommendations', detail: 'Never claim a supplement replaces prescribed treatment' },
            { label: 'Accessible health information', detail: 'Instructions and safety information easy to read' },
          ],
        },
      ],
      note: 'World Bank: about 40% of current health spending is paid out of pocket and pharmaceuticals were about 75% of out-of-pocket spending in 2022, despite about 91% insurance coverage. These are not shares of pharmacy sales.',
      takeaway: 'Preventive health widens the pharmacy’s range, but growth lasts only while recommendations stay responsible.',
    },
  },
  'pharmacy-m5-12-chronic': {
    heading: 'The refill cycle that keeps chronic-care customers coming back',
    intro: 'Customers with hypertension or diabetes return for the same medicines month after month. Follow the cycle a pharmacy must repeat reliably, and notice where clinical questions leave the counter.',
    spec: {
      layout: 'flow', title: 'Aging Population and Growth in Chronic Disease Management', kicker: '',
      steps: [
        { label: 'Forecast recurring demand', detail: 'Plan stock from repeat-purchase patterns to avoid stockouts', kind: 'stage' },
        { label: 'Keep chronic-care medicines available', detail: 'Frequently requested medicines and related products on the shelf', kind: 'stage' },
        { label: 'Plan the refill', detail: 'Replenishment in line with prescription rules', kind: 'stage' },
        { label: 'Explain use or refer', detail: 'Instructions explained; clinical questions go to professionals', kind: 'decision' },
        { label: 'Serve older customers clearly', detail: 'Easier labels, store navigation and communication', kind: 'stage' },
        { label: 'Track reliability and satisfaction', detail: 'Availability and satisfaction checked for recurring-care customers', kind: 'outcome' },
      ],
      loop: 'Each visit feeds the next forecast; consistent support without pushing extra purchases brings the customer back.',
      note: 'VietnamPlus reports 14.2 million people aged 60 and over in 2024; the Ministry of Health attributes 73.7% of disease burden and deaths to non-communicable diseases. A peer-reviewed article gives 3.41 pharmacists per 10,000 people (2016 data) against a 2025–2030 target of 4.0.',
      takeaway: 'Reliable replenishment and consistent support matter more for these customers than the size of any single sale.',
    },
  },
  'pharmacy-m5-13-convenience': {
    heading: 'Every pharmacy convenience needs a matching trust safeguard',
    intro: 'Faster service and tailored reminders win customers only if trust survives them. Read each convenience on the left against the safeguard it depends on.',
    spec: {
      layout: 'compare', title: 'Demand for Convenience, Personalization and Trusted Advice', kicker: '',
      leftTitle: 'Convenience the customer gains', rightTitle: 'Safeguard that keeps it trustworthy',
      rows: [
        { label: 'Store access', a: 'Nearby outlets, opening-hour information and easy in-store navigation', b: 'Accurate, current information' },
        { label: 'Faster transactions', a: 'Quicker checkout and prescription processing', b: 'The required checks are kept' },
        { label: 'Online product discovery', a: 'Product and availability details before visiting', b: 'Details match real stock and product facts' },
        { label: 'Personalised reminders', a: 'Service messages tailored to stated needs', b: 'Consent first, no medical assumptions' },
        { label: 'Professional consultation', a: 'Help with suitability, instructions and precautions', b: 'Qualified staff available for medicine questions' },
      ],
      note: 'The Long Châu group claims delivery in under two hours and a returning-customer rate of about 70% (company statements, not independently checked). The Personal Data Protection Law, effective 1 January 2026, treats health information as sensitive.',
      takeaway: 'Improve the customer journey without lowering the professional standards that set pharmacies apart from general retailers.',
    },
  },
  'pharmacy-m5-22-analytics': {
    heading: 'Clean pharmacy stock records first, smarter forecasts second',
    intro: 'Sales, stock movements, supplier orders and customer questions only help once the data is accurate and protected. See the uses that follow and the test every tool must pass.',
    spec: {
      layout: 'pathway', title: 'AI, Data Analytics and Intelligent Inventory Management', kicker: '',
      trunk: [
        { label: 'Operational data captured', detail: 'Sales transactions, stock movements, supplier orders and customer inquiries', kind: 'stage' },
        { label: 'Accurate, protected data', detail: 'Correct product codes and stock records; access to sensitive data limited', kind: 'stage' },
      ],
      optionsLabel: 'What the data can then improve',
      options: [
        { label: 'Demand forecasting', detail: 'Historical sales and seasonal patterns' },
        { label: 'Automated replenishment', detail: 'Reorder alerts from stock levels and lead times' },
        { label: 'Expiry-risk monitoring', detail: 'Products nearing expiry flagged early' },
        { label: 'Store performance analytics', detail: 'Sales, gross profit, turnover and expenses compared across outlets' },
        { label: 'Customer-service automation', detail: 'Routine questions answered; medicine issues escalated to staff' },
      ],
      afterLabel: 'The test each tool must pass',
      after: [
        { label: 'Technology evaluation', detail: 'Does the measured benefit cover implementation and running cost?', kind: 'outcome' },
      ],
      note: 'Long Châu describes two central warehouses, about 70,000 orders a day and a 2025 warehouse system with OCR receiving and automated replenishment (company statements). Circular 11/2025 requires connection to the national data system from 1 January 2026.',
      takeaway: 'Fewer stockouts and write-offs come from good data and execution, not from adopting AI for its own sake.',
    },
  },
  'pharmacy-m5-23-connected': {
    heading: 'Who a connected pharmacy exchanges health data with, and on what terms',
    intro: 'A connected pharmacy sits between customers, prescription systems, national databases and qualified professionals. Check what flows along each link and the condition that keeps it lawful.',
    spec: {
      layout: 'ecosystem', title: 'Digital Health Integration and Connected Pharmacy Services', kicker: '',
      center: { label: 'Connected pharmacy', detail: 'Still verifies, dispenses and keeps records itself' },
      actors: [
        { label: 'Customers', relation: 'Digital support, VNeID-based access to eligible services, consistent order information', flows: ['service', 'information'] },
        { label: 'Electronic prescription system', relation: 'E-prescriptions pulled by code, then checked and dispensed under controls', flows: ['information'] },
        { label: 'National pharmacy database', relation: 'Sales reported; IT connection duties under Circular 11/2025 from 1 January 2026', flows: ['information', 'oversight'] },
        { label: 'Qualified professionals', relation: 'Symptoms and adverse reactions routed for professional judgement', flows: ['service', 'risk'] },
        { label: 'Data-protection rules', relation: 'Health information covered by Article 26; access controls and incident procedures', flows: ['oversight', 'risk'] },
      ],
      note: 'Circular 26/2025/TT-BYT, effective 1 July 2025, sets the e-prescription roadmap; online consultation records are kept for 24 months under Circular 11/2025 (legal summary). The Personal Data Protection Law took effect on 1 January 2026.',
      takeaway: 'Integration changes how health information arrives, not who is responsible for using it safely.',
    },
  },
  'pharmacy-m5-31-chains': {
    heading: 'Pharmacy chain growth that turned selective by 2025',
    intro: 'Chain store counts rose steeply, yet chains remain a small share of Vietnam’s pharmacy count. Follow the numbers and note who counted each one.',
    spec: {
      layout: 'timeline', title: 'Expansion of Modern Pharmacy Chains', kicker: '',
      events: [
        { period: '2019', label: 'Q&Me series starts at 492 chain stores', detail: 'The baseline for the chain-store count', status: 'historical' },
        { period: '2024', label: 'Modern pharmacies hold about 14% of the market', detail: 'Vietcap estimate; about 95% of more than 50,000 pharmacies are traditional', status: 'historical' },
        { period: '2025', label: 'Q&Me counts 3,457 chain stores', detail: 'Growth slows to about 7% for the year', status: 'historical' },
        { period: 'End of 2025', label: 'Leaders expand selectively', detail: 'Long Châu opens 474 to reach 2,417; Pharmacity grows from under 900 to 1,040; An Khang leaves Hanoi', status: 'historical' },
      ],
      note: 'Chains are about 5% of outlets by count but an estimated 14% of the market by sales value, so the two figures answer different questions. KIS separately counted 3,475 modern pharmacies in the second quarter of 2025; do not mix it with the Q&Me series.',
      takeaway: 'The next stage of chain growth depends on store productivity and financial sustainability, not on the number of openings.',
    },
  },
  'pharmacy-m5-32-omnichannel': {
    heading: 'One eligible medicine order, from online search to doorstep',
    intro: 'Omnichannel pharmacy borrows from e-commerce, but every step of a medicine order carries its own control. Follow one order through the stages.',
    spec: {
      layout: 'flow', title: 'Omnichannel Retail and Changing Fulfillment Expectations', kicker: '',
      steps: [
        { label: 'Research online', detail: 'Customer checks eligible products before choosing a channel', kind: 'stage' },
        { label: 'See real availability', detail: 'Displayed availability linked to actual stock records', kind: 'stage' },
        { label: 'Confirm online eligibility', detail: 'Only eligible non-prescription medicines can be retailed online', kind: 'decision' },
        { label: 'Prepare and verify', detail: 'Order checked before dispatch; consultation records kept under Circular 11/2025', kind: 'stage' },
        { label: 'Deliver in the right condition', detail: 'Timeliness and storage conditions checked; updates through authorised channels', kind: 'stage' },
        { label: 'Measure each channel', detail: 'Fulfilment success, waiting time, satisfaction and channel cost', kind: 'outcome' },
      ],
      note: 'Law 44/2024/QH15 permits online retail of eligible non-prescription medicines from 1 July 2025 and bans online retail of certain others. The Long Châu group states a delivery commitment of under two hours, a company claim.',
      takeaway: 'Omnichannel pays when digital ordering improves the performance of the physical stores behind it.',
    },
  },
  'pharmacy-m5-33-competition': {
    heading: 'Pharmacy formats that coexist because each wins differently',
    intro: 'Independents, national chains, regional chains and digital platforms chase overlapping needs. Compare each format’s advantage with the operators that represent it.',
    spec: {
      layout: 'taxonomy', title: 'Competition Between Traditional Pharmacies, Chains and Digital Platforms', kicker: '',
      root: 'Vietnam’s pharmacy retail formats', rootDetail: 'Competition stays differentiated rather than winner-takes-all',
      groups: [
        { label: 'Independent pharmacies', detail: 'Local access, trusted relationships and relevant stock', items: ['About 95% of more than 50,000 pharmacies are traditional (Vietcap)'] },
        { label: 'National chains', detail: 'Network, central buying, standard operations and brand', items: ['Long Châu: 2,417 pharmacies', 'Pharmacity: 1,040', 'An Khang: 382 (all end-2025)'] },
        { label: 'Regional and smaller chains', detail: 'Density and local knowledge in chosen areas', items: ['Trung Sơn Pharma: more than 230, Dongwha owning 51% since 2023', 'Guardian 126, Medicare 64, Matsumoto Kiyoshi 12 (Q&Me, 2025)'] },
        { label: 'Digital platforms', detail: 'Product discovery and eligible transactions under pharmaceutical e-commerce rules' },
      ],
      note: 'Vietcap says Long Châu held over half of chain stores by May 2025. Store counts come from company, broker and press reports at different dates and are not directly comparable.',
      takeaway: 'Each format should sharpen its own value proposition and fix its own weakness rather than copy rivals.',
    },
  },
  'pharmacy-m5-41-regulation': {
    heading: 'Turning each 2025 pharmacy rule into a shop-floor control',
    intro: 'The 2025 legal changes arrive as separate texts with their own dates. Read each one against the control it requires in stores and online.',
    spec: {
      layout: 'table', title: 'Pharmaceutical Regulation and Online Sales Compliance', kicker: '',
      headers: ['Legal text', 'What it changes', 'Control to build'],
      rows: [
        { label: 'Dispatch 1136/QLD-KD (April 2025)', a: 'Drug Administration tells businesses certain online sales are banned', b: 'Online sales controls that block ineligible products' },
        { label: 'Law 44/2024/QH15 (1 July 2025)', a: 'Eligible non-prescription medicines may be sold online; prescription medicines restricted', b: 'Credential disclosure and online product screening' },
        { label: 'Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT', a: 'Guiding texts taking effect with the law', b: 'Updated procedures, staffing and training' },
        { label: 'Circular 11/2025/TT-BYT', a: 'IT connection duties from 1 January 2026; e-commerce consultation records; e-prescription handling', b: 'Data links, record keeping and audits' },
        { label: 'Circular 30/2025/TT-BYT', a: 'How defective drugs are reported and recalled', b: 'Batch records and incident response' },
      ],
      note: 'Dates and scope come from legal summaries, official texts in English translation and an International Bar Association survey; check the official versions for exact scope and exceptions.',
      takeaway: 'Compliance is a routine, not a licence check: each new text needs an owner, updated procedures, training and an audit.',
    },
  },
  'pharmacy-m5-42-traceability': {
    heading: 'When a quality alert lands, batch records decide the response',
    intro: 'A customer cannot tell whether a medicine is genuine or was stored properly. See how batch-level records change what a pharmacy can do when a quality concern arrives.',
    spec: {
      layout: 'decision', title: 'Product Quality, Traceability and Responsible Pharmaceutical Supply', kicker: '',
      root: { label: 'Product-quality alert', detail: 'A defective or suspect medicine is reported somewhere in the supply chain' },
      question: 'Can the affected batches in stock be identified?',
      branches: [
        { condition: 'Yes, from batch records', outcome: 'Isolate only the affected batches', detail: 'Report and recall by the level set in Circular 30/2025/TT-BYT; tell buyers what to do', tone: 'positive' },
        { condition: 'No batch-level records', outcome: 'Whole product lines may be pulled', detail: 'A slower, broader response that removes far more stock than needed', tone: 'negative' },
      ],
      note: 'Local manufacturers import more than 90% of their raw materials (press report) and the top three foreign-owned wholesalers hold about 40% of wholesale (one estimate), so the retailer’s own checks come at the end of a long chain.',
      takeaway: 'Verified suppliers, proper storage and batch records make a fast, targeted response possible; technology alone does not.',
    },
  },
  'pharmacy-m5-43-sustainability': {
    heading: 'Too much stock wastes medicine; too little empties the shelf',
    intro: 'In a pharmacy, sustainability starts with buying the right amount. Compare the two ways stock levels go wrong and how each is avoided.',
    spec: {
      layout: 'compare', title: 'Sustainability, Waste Reduction and Responsible Operations', kicker: '',
      leftTitle: 'Over-buying', rightTitle: 'Cutting stock too far',
      rows: [
        { label: 'What goes wrong', a: 'Stock passes its expiry date unsold', b: 'An important medicine runs out' },
        { label: 'Who bears the cost', a: 'The pharmacy: expiry losses and disposal of pharmaceutical waste', b: 'Customers who cannot get the medicine they need' },
        { label: 'How to avoid it', a: 'Forecast by store and category; sell older stock first', b: 'Match stock to demand and shelf life, not the smallest level' },
        { label: 'What to track', a: 'Expiry losses and disposal in store reviews', b: 'Availability of important products' },
      ],
      note: 'No published Vietnam pharmacy-chain figures on expiry losses, pharmaceutical waste or energy use were found, so none are claimed. Long Châu’s two central warehouses and automated replenishment (company statement) support buying closer to demand.',
      takeaway: 'The most practical sustainability gain is operational discipline: stock matched to demand and shelf life.',
    },
  },
  'pharmacy-m5-51-growth': {
    heading: 'Pharmacy growth tailwinds still need store economics to pay off',
    intro: 'Ageing and a large traditional sector point to room for growth, but neither guarantees any single retailer’s results. Separate the market trends from the drivers a retailer controls.',
    spec: {
      layout: 'driverTree', title: 'Market Growth and Expansion Potential', kicker: '',
      root: { label: 'Growth a retailer can actually capture', detail: 'Customer demand combined with sustainable store economics' },
      formula: 'Captured growth = market potential × operating capability',
      drivers: [
        {
          label: 'Market potential', detail: 'Structural trends, not guarantees', op: '×',
          children: [
            { label: 'Ageing demand', detail: 'People aged 60 and over projected at 16.53% of the population in 2029 (UNFPA medium projection)' },
            { label: 'Room for organised retail', detail: 'Modern pharmacies about 14% of the market in 2024 (Vietcap estimate)' },
            { label: 'Underserved locations', detail: 'About 95% of more than 50,000 outlets are traditional' },
          ],
        },
        {
          label: 'Operating capability', detail: 'What the retailer itself controls', op: '×',
          children: [
            { label: 'Productive existing stores', detail: 'Improve current outlets before relying on new openings' },
            { label: 'Reliable availability', detail: 'Assortment and replenishment that capture unmet demand' },
            { label: 'Financial discipline', detail: 'Expected sales, cost, investment and payback checked' },
          ],
        },
      ],
      note: 'Vietnam market-size estimates differ by publisher because definitions differ, so none are combined here; keep forecasts apart from reported company results.',
      takeaway: 'The most attractive growth combines real customer demand with store economics the retailer can sustain.',
    },
  },
  'pharmacy-m5-52-digital': {
    heading: 'A digital pharmacy feature earns its place only by moving a number',
    intro: 'Apps, reminders and automation can set a pharmacy apart or simply add cost. Start from the problem and the number it should change, then judge the result against a baseline.',
    spec: {
      layout: 'pathway', title: 'Strategic Opportunities in Digitalization, Services and Customer Experience', kicker: '',
      trunk: [
        { label: 'Name the problem and target measure', detail: 'Such as stock accuracy, fulfilment rate or time saved', kind: 'stage' },
      ],
      optionsLabel: 'Opportunities and what each should improve',
      options: [
        { label: 'Inventory digitalisation', detail: 'Stock accuracy, expiry monitoring and replenishment' },
        { label: 'App and omnichannel service', detail: 'Accurate information, eligible online ordering, inquiries linked to stores' },
        { label: 'Data-driven range decisions', detail: 'Sales and inventory data refine range and forecasts' },
        { label: 'Professional service and reminders', detail: 'Trained staff, customer education, reminders with privacy safeguards' },
        { label: 'Operational automation', detail: 'Routine admin automated; regulated tasks stay supervised' },
      ],
      afterLabel: 'After launch',
      after: [
        { label: 'Compare with baseline and full cost', detail: 'Running cost includes compliance and training', kind: 'outcome' },
      ],
      note: 'Long Châu said in July 2025 it served 28 million customers and families (company statement). The Personal Data Protection Law, effective 1 January 2026, sets fines of up to VND 3 billion for most violations (legal summary).',
      takeaway: 'Digital tools should raise availability, efficiency and customer confidence, and that gain must be measured.',
    },
  },
  'pharmacy-m5-53-positioning': {
    heading: 'Picking a position: national scale, regional density or neighbourhood service',
    intro: 'Growth will not reward every pharmacy retailer equally. Start from the kind of operator the business is, then see which capabilities deserve its limited money and attention.',
    spec: {
      layout: 'decision', title: 'Strategic Positioning and Long-Term Competitive Priorities', kicker: '',
      root: { label: 'Long-term strategy', detail: 'Invest in capabilities that match resources and customers, not in every trend' },
      question: 'What kind of operator is the business?',
      branches: [
        { condition: 'National chain', outcome: 'Raise network productivity', detail: 'Buying efficiency and integrated services; Long Châu pairs 2,417 pharmacies with automated replenishment' },
        { condition: 'Regional chain', outcome: 'Concentrate where density helps', detail: 'Local knowledge in chosen markets; Trung Sơn Pharma focuses on the south' },
        { condition: 'Independent pharmacy', outcome: 'Deepen local relationships', detail: 'Stock availability, personal service and cost discipline, perhaps instead of an expensive app' },
      ],
      note: 'Pharmacity now targets 2,000 to 2,300 stores by 2030 instead of 5,000 by 2025, and plans 500 more over three years as new cohorts break even (press reports; plans may change).',
      takeaway: 'Choose a position, write down what the business will not do, and review the model as conditions change.',
    },
  },
};
