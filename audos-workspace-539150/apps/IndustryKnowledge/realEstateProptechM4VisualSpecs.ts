import type { RealEstateProptechChapterVisual } from './realEstateProptechVisualSpecs';

/** Chapter-specific Learning Visuals for Property Technology & Marketplaces Module 04 (competitive landscape), keyed by visualKind. */
export const REAL_ESTATE_PROPTECH_M4_VISUALS: Record<string, RealEstateProptechChapterVisual> = {
  'realestate-proptech-m4-1': {
    heading: 'Five forces that set competitive pressure on a PropTech product',
    intro: 'Data sources, platforms, enterprise buyers, brokers and technology alternatives shape power. The balance differs between marketplaces, SaaS and connected-building products.',
    spec: {
      layout: 'driverTree', title: 'Five Forces in PropTech', kicker: '',
      root: { label: 'Competitive pressure', detail: 'Assessed per workflow and customer' },
      drivers: [
        { label: 'Supplier data power', detail: 'Who controls the property data a product needs' },
        { label: 'Customer power', detail: 'Enterprise buyers and brokers negotiating terms' },
        { label: 'Threat of entry', detail: 'Low-code entry is easy; trusted liquidity is not' },
        { label: 'Substitutes', detail: 'Technology alternatives and offline workarounds' },
        { label: 'Rivalry', detail: 'Platforms competing for the same workflow' },
      ],
      note: 'Low-code entry is easier than building trusted liquidity or deep integrations. Assess by workflow and customer.',
      takeaway: 'Competitive forces vary between marketplaces, SaaS and connected-building products.',
    },
  },
  'realestate-proptech-m4-2': {
    heading: 'How verified local supply and successful matches feed each other',
    intro: 'Relevant verified listings attract demand, which can attract suppliers when matching succeeds. The loop works city by city, and only when quality holds.',
    spec: {
      layout: 'flow', title: 'Network Effects and Marketplace Liquidity', kicker: '',
      steps: [
        { label: 'Supply', detail: 'Relevant, verified listings in a local market' },
        { label: 'Demand', detail: 'Searchers drawn by that inventory' },
        { label: 'Match', detail: 'Successful contact between both sides', kind: 'decision' },
        { label: 'Retention', detail: 'Suppliers and searchers stay and return', kind: 'outcome' },
      ],
      loop: 'Successful matches attract more suppliers, which attracts more demand in the same local market.',
      note: 'National listing count can hide weak city-level liquidity. Measure local cohorts and successful contacts.',
      takeaway: 'Network effects are local and quality-dependent, not automatic.',
    },
  },
  'realestate-proptech-m4-3': {
    heading: 'Why switching is hard in SaaS but depends on liquidity in marketplaces',
    intro: 'SaaS switching costs arise from migration, integrations, training and process dependence; marketplaces depend more on liquidity and brand.',
    spec: {
      layout: 'compare', title: 'Switching Costs, Data and Technology Barriers', kicker: '',
      leftTitle: 'Property SaaS', rightTitle: 'Property marketplace',
      rows: [
        { label: 'Main barrier', a: 'Migration, integration and training', b: 'Liquidity and brand' },
        { label: 'Role of history', a: 'Governed records embedded in workflows', b: 'Accumulated listings and user activity' },
        { label: 'Trust and reliability', a: 'Process dependence on a reliable system', b: 'Users return when listings are trustworthy' },
        { label: 'Risk', a: 'Lock-in without value raises churn', b: 'Lost liquidity weakens the barrier' },
      ],
      note: 'Lock-in without value increases churn risk. Build portability and trust.',
      takeaway: 'Embedded workflows and governed data can create barriers.',
    },
  },
  'realestate-proptech-m4-4': {
    heading: 'Product breadth and monetization routes of global property portals',
    intro: 'Companies can monetize advertising, subscriptions, leads, referrals or transactions. Global portals illustrate different product breadth, so compare by product and geography, not by provider claims.',
    spec: {
      layout: 'taxonomy', title: 'Global Property Marketplaces', kicker: '',
      root: 'Global property portal', rootDetail: 'Building blocks — combined differently by each company',
      groups: [
        { label: 'Search and listings', detail: 'Core consumer discovery' },
        { label: 'Monetization routes', items: ['Advertising', 'Subscriptions', 'Leads', 'Referrals', 'Transactions'] },
        { label: 'Adjacent services', detail: 'e.g. Zillow covers homes, rentals, agents and loans' },
        { label: 'Data services', detail: 'e.g. Rightmove Data Services: market data, comparables, automated valuation' },
      ],
      note: 'Provider claims are not independent market rankings. Compare product and geography.',
      takeaway: 'Global portals illustrate different monetization and product breadth.',
    },
  },
  'realestate-proptech-m4-5': {
    heading: 'Where enterprise software and data providers compete',
    intro: 'Yardi and CoStar illustrate software, analytics and marketplace combinations. Enterprise providers compete on data depth, workflow coverage and integration.',
    spec: {
      layout: 'table', title: 'Enterprise Software and Data Providers', kicker: '',
      headers: ['Competes on', 'What it means', 'Illustration in the sources'],
      rows: [
        { label: 'Data depth', a: 'Property-level and commercial data', b: 'Yardi Matrix: rents, occupancy, pipelines' },
        { label: 'Workflow coverage', a: 'PMS and lease workflows', b: 'CoStar Group: lease management' },
        { label: 'Analytics', a: 'Turning data into decisions', b: 'Both describe analytics products' },
        { label: 'Combined offering', a: 'Software, data and marketplaces together', b: 'CoStar Group: data, analytics, marketplaces' },
      ],
      note: 'Group revenue is not product ARR or customer ROI. Use matched disclosures; company pages are examples, not rankings.',
      takeaway: 'Enterprise providers compete through data depth, workflow coverage and integration.',
    },
  },
  'realestate-proptech-m4-6': {
    heading: 'Types of participant in Vietnam PropTech and the workflow each serves',
    intro: 'Portals, agencies, startups, developers and software vendors differ in roles and operating status. They serve discovery, sales, management and data workflows.',
    spec: {
      layout: 'taxonomy', title: 'Vietnam PropTech Participants', kicker: '',
      root: 'Vietnam PropTech participants', rootDetail: 'Verify current product and entity for each',
      groups: [
        { label: 'Portals', detail: 'Discovery, e.g. Batdongsan.com.vn' },
        { label: 'Broker tech', detail: 'Agency sales workflows' },
        { label: 'Developer tech', detail: 'Project sales and marketing' },
        { label: 'PMS vendors', detail: 'Property management workflows' },
        { label: 'Local data', detail: 'e.g. Housing and Real Estate Market Information System' },
      ],
      note: 'Self-reported leadership is not verified market share. Verify current product and entity.',
      takeaway: 'Vietnam businesses serve discovery, sales, management and data workflows.',
    },
  },
  'realestate-proptech-m4-7': {
    heading: 'Raw traffic metrics versus quality-adjusted marketplace benchmarks',
    intro: 'Compare active users, unique fresh listings, verification, response and qualified conversion. Raw counts can overstate liquidity.',
    spec: {
      layout: 'table', title: 'Marketplace Engagement and Quality', kicker: '',
      headers: ['Benchmark', 'Raw version (can overstate)', 'Quality-adjusted version'],
      rows: [
        { label: 'Users', a: 'Registered users', b: 'MAU: active users' },
        { label: 'Supply', a: 'Raw listings', b: 'Unique, fresh active listings' },
        { label: 'Verification', a: 'Listings published', b: 'Verified rate' },
        { label: 'Demand', a: 'Inquiries received', b: 'Responded, qualified leads' },
        { label: 'Outcome', a: 'Contacts made', b: 'Qualified conversion' },
      ],
      note: 'Registered users and raw listings can overstate liquidity. Normalize cohort and geography.',
      takeaway: 'Traffic and supply metrics need quality and funnel context.',
    },
  },
  'realestate-proptech-m4-8': {
    heading: 'Retention and adoption decide the quality of recurring revenue',
    intro: 'Benchmark ARPA, gross margin, churn, GRR, NRR, activation, usage and payback under aligned definitions.',
    spec: {
      layout: 'driverTree', title: 'SaaS Retention and Product Adoption', kicker: '',
      root: { label: 'Recurring revenue quality', detail: 'ARR that lasts and grows' },
      drivers: [
        { label: 'Retention', detail: 'Revenue kept from existing accounts', children: [{ label: 'GRR' }, { label: 'NRR' }, { label: 'Churn' }] },
        { label: 'Adoption', detail: 'Whether customers really use the product', children: [{ label: 'Activation' }, { label: 'Usage' }] },
        { label: 'Account economics', detail: 'Value per account and recovery of cost', children: [{ label: 'ARPA' }, { label: 'Gross margin' }, { label: 'Payback' }] },
      ],
      note: 'ARR should not be ranked against marketplace GMV. Use a consistent contract basis.',
      takeaway: 'Recurring revenue quality depends on retention and adoption.',
    },
  },
  'realestate-proptech-m4-9': {
    heading: 'Benchmark areas that link data and reliability to unit economics',
    intro: 'Benchmark provenance, freshness, integrations, availability, acquisition and support cost, and include security and compliance.',
    spec: {
      layout: 'taxonomy', title: 'Data, Technology and Cost Efficiency', kicker: '',
      root: 'Technology benchmark', rootDetail: 'Areas compared together, not in sequence',
      groups: [
        { label: 'Data', items: ['Coverage', 'Accuracy', 'Provenance', 'Freshness'] },
        { label: 'Technology', items: ['API integrations', 'Uptime'] },
        { label: 'Cost efficiency', items: ['Cloud cost', 'CAC', 'Support cost'] },
        { label: 'Security and compliance', detail: 'Data rights and protection' },
      ],
      note: 'More data is not better when rights or accuracy are weak.',
      takeaway: 'Technology advantage connects data and reliability to unit economics.',
    },
  },
  'realestate-proptech-m4-10': {
    heading: 'Testing whether a product solves a repeated, costly workflow',
    intro: 'Strong fit links features to conversion, efficiency, service, risk or operating savings. Adoption without an outcome may not renew.',
    spec: {
      layout: 'decision', title: 'Product-Market Fit and Workflow Value', kicker: '',
      root: { label: 'Candidate product', detail: 'Defined user and workflow problem' },
      question: 'Does it solve a frequent, costly problem with a measurable outcome the user will pay for?',
      branches: [
        { condition: 'Repeated problem, measured outcome, willingness to pay', outcome: 'Fit: grow on retention evidence', detail: 'Measure first value and retention', tone: 'positive' },
        { condition: 'Adopted but no clear outcome', outcome: 'At risk at renewal', detail: 'Tie features to an outcome first', tone: 'caution' },
        { condition: 'Infrequent or low-cost problem', outcome: 'Weak fit', detail: 'Revisit the user and problem', tone: 'negative' },
      ],
      note: 'Adoption without outcome may not renew.',
      takeaway: 'Products win by solving a repeated costly workflow.',
    },
  },
  'realestate-proptech-m4-11': {
    heading: 'Trust controls a property platform needs and what fails without them',
    intro: 'Platforms need accurate listings, controlled identities, explainable estimates and secure data practices. Stale listings destroy marketplace utility.',
    spec: {
      layout: 'table', title: 'Data Quality, Trust and Verification', kicker: '',
      headers: ['Trust control', 'What it protects', 'Failure without it'],
      rows: [
        { label: 'Authority', a: 'Controlled identities and authorized listings', b: 'Listings no one is entitled to post' },
        { label: 'Freshness', a: 'Current, available inventory', b: 'Stale listings destroy utility' },
        { label: 'Duplicate control', a: 'One record per property', b: 'Inflated, confusing supply' },
        { label: 'Security', a: 'User and property data', b: 'Data exposure and lost trust' },
        { label: 'Transparency', a: 'Explainable estimates and stated limits', b: 'Users over-rely on outputs' },
      ],
      note: 'Expose verification and limitations.',
      takeaway: 'Trust is infrastructure for property technology.',
    },
  },
  'realestate-proptech-m4-12': {
    heading: 'What adds to and subtracts from customer contribution as a product scales',
    intro: 'Acquisition, implementation, cloud, support, churn and expansion jointly shape value. Rapid user growth can deepen losses when these are negative.',
    spec: {
      layout: 'driverTree', title: 'Distribution, Reliability and Unit Economics', kicker: '',
      root: { label: 'Customer contribution', detail: 'Value per customer after serving cost' },
      formula: 'Contribution = retained and expanded revenue − acquisition − implementation − cloud and support',
      drivers: [
        { label: 'Retention and expansion', op: '+', detail: 'Low churn and account growth', children: [{ label: 'Retention' }, { label: 'Expansion' }] },
        { label: 'Acquisition cost', op: '−', detail: 'Depends on the channel', children: [{ label: 'Channel' }] },
        { label: 'Implementation', op: '−', detail: 'Integration work per customer', children: [{ label: 'Integration' }] },
        { label: 'Cloud and support', op: '−', detail: 'Cost of keeping the service available', children: [{ label: 'Availability' }] },
      ],
      note: 'Rapid user growth can deepen losses. Scale after cohort evidence.',
      takeaway: 'Scalable growth needs reliable technology and positive customer economics.',
    },
  },
  'realestate-proptech-m4-13': {
    heading: 'Software scale on one side, fragmented data and offline transactions on the other',
    intro: 'Asset-light models can grow while acquisition and verification costs remain high. Traffic scale does not guarantee monetization.',
    spec: {
      layout: 'compare', title: 'Strengths and Weaknesses', kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Growth', a: 'Software and asset-light models can scale', b: 'Acquisition costs remain high' },
        { label: 'Workflows', a: 'Automation improves property workflows', b: 'Transactions remain offline-intensive' },
        { label: 'Data', a: 'Software captures workflow data', b: 'Property data is fragmented' },
        { label: 'Trust', a: 'Platforms can verify listings', b: 'Trust gap; verification costs stay high' },
        { label: 'Cash', a: 'Traffic can scale quickly', b: 'Cash burn when traffic is not monetized' },
      ],
      note: 'Traffic scale does not guarantee monetization. Track contribution and trust.',
      takeaway: 'Software can scale and improve workflows, but property data is fragmented and transactions remain offline-intensive.',
    },
  },
  'realestate-proptech-m4-14': {
    heading: 'Each growth area pairs an opportunity with a threat',
    intro: 'B2B SaaS, data and building operations can grow as marketplaces consolidate. Incumbents, regulation and cybersecurity threaten the same areas.',
    spec: {
      layout: 'table', title: 'Opportunities and Threats', kicker: '',
      headers: ['Area', 'Opportunity', 'Threat'],
      rows: [
        { label: 'Digitization', a: 'Digital adoption widens demand', b: 'Cybersecurity threats grow with it' },
        { label: 'B2B SaaS and data', a: 'Can grow as marketplaces consolidate', b: 'Incumbent platform rivals' },
        { label: 'Smart building', a: 'Building operations technology can grow', b: 'Regulatory and security exposure' },
        { label: 'Adjacent expansion', a: 'New workflows to serve', b: 'Diluted focus and added compliance' },
      ],
      note: 'Adjacent expansion can dilute focus and add compliance. Choose defensible workflows.',
      takeaway: 'Digital adoption creates opportunity alongside incumbent, regulatory and cybersecurity threats.',
    },
  },
  'realestate-proptech-m4-15': {
    heading: 'Choose a defensible workflow, then one of four strategic positions',
    intro: 'Companies choose broad ecosystem, vertical specialization, enterprise software or hybrid models. Whichever they choose, model, channel and capital needs must align.',
    spec: {
      layout: 'pathway', title: 'Strategic Positioning and Profitable Growth', kicker: '',
      trunk: [
        { label: 'Defensible workflow', detail: 'Where the company can win' },
        { label: 'Align model, channel and capital', detail: 'Match capital needs to the model' },
      ],
      optionsLabel: 'Strategic positions — alternatives, not steps',
      options: [
        { label: 'Broad ecosystem', detail: 'Marketplace with adjacent services' },
        { label: 'Vertical specialization', detail: 'Deep in one workflow or segment' },
        { label: 'Enterprise software', detail: 'SaaS and data for businesses' },
        { label: 'Hybrid', detail: 'Marketplace, SaaS and data combined' },
      ],
      afterLabel: 'Whichever position',
      after: [
        { label: 'Staged investment', detail: 'Release capital on evidence' },
        { label: 'Stop criteria', detail: 'Exit when monetization stays unproven', kind: 'decision' },
      ],
      note: 'Cross-subsidizing unprofitable users requires credible monetization. Use staged investment and stop criteria.',
      takeaway: 'Strategy should align business model, channel and capital needs.',
    },
  },
};
