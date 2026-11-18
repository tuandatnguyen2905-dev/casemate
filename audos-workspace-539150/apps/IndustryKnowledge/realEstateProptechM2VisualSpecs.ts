import type { RealEstateProptechChapterVisual } from './realEstateProptechVisualSpecs';

/** Chapter-specific Learning Visuals for Property Technology & Marketplaces Module 02 (value chain), keyed by visualKind. */
export const REAL_ESTATE_PROPTECH_M2_VISUALS: Record<string, RealEstateProptechChapterVisual> = {
  'realestate-proptech-m2-1': {
    heading: 'Different PropTech products serve different stages of a property’s life',
    intro: 'Solutions support discovery, transactions, development, leasing, management, building operation and investment decisions. A marketplace and a property management system solve different lifecycle problems.',
    spec: {
      layout: 'flow', title: 'Technology Across the Property Lifecycle', kicker: '',
      steps: [
        { label: 'Develop', detail: 'Plan and build the property' },
        { label: 'Search', detail: 'Discovery of available property', owner: 'Marketplace' },
        { label: 'Transact', detail: 'Sale or lease workflow and documents' },
        { label: 'Finance', detail: 'Funding and investment decisions' },
        { label: 'Manage', detail: 'Leasing and property management', owner: 'PMS' },
        { label: 'Operate', detail: 'Building systems and maintenance', kind: 'outcome' },
      ],
      note: 'Map the user, property and offline handoff at each stage before choosing a product.',
      takeaway: 'PropTech creates value by improving a defined property workflow rather than digitizing activity for its own sake.',
    },
  },
  'realestate-proptech-m2-2': {
    heading: 'A platform sits between property roles without taking them over',
    intro: 'Owners, agents, developers, managers, lenders, technology vendors and users keep distinct roles. A listing platform can route a lead to an independent broker.',
    spec: {
      layout: 'ecosystem', title: 'Stakeholders and Technology Intermediaries', kicker: '',
      center: { label: 'Technology platform', detail: 'Intermediates; does not own the property' },
      actors: [
        { label: 'Owner', relation: 'Holds the asset and supplies listings', flows: ['product'] },
        { label: 'Consumer', relation: 'Searches and sends inquiries', flows: ['information'] },
        { label: 'Broker', relation: 'Receives routed leads, serves the client', flows: ['service', 'money'] },
        { label: 'SaaS vendor', relation: 'Supplies workflow software', flows: ['service'] },
        { label: 'Operator', relation: 'Manages the building and tenants', flows: ['service'] },
        { label: 'Lender', relation: 'Finances the purchase', flows: ['money', 'risk'] },
      ],
      note: 'Identify the asset owner and the revenue entity for every flow.',
      takeaway: 'Technology intermediates relationships without automatically owning property or delivering every service.',
    },
  },
  'realestate-proptech-m2-3': {
    heading: 'Six digital flows, each with a different verification and legal status',
    intro: 'Property data, user actions, documents, transaction values, fees and building telemetry move through systems and partners. GMV can flow through a platform while only the take rate becomes revenue.',
    spec: {
      layout: 'table', title: 'Data, Product and Financial Flows', kicker: '',
      headers: ['Flow', 'What moves', 'What to verify'],
      rows: [
        { label: 'Listing', a: 'Property data', b: 'Source and accuracy' },
        { label: 'Identity', a: 'Who the user or lister is', b: 'Authority to act' },
        { label: 'Lead', a: 'User actions and inquiries', b: 'Not yet a transaction' },
        { label: 'Contract', a: 'Documents', b: 'Legal status of the record' },
        { label: 'Payment', a: 'Transaction values and fees', b: 'GMV versus take-rate revenue' },
        { label: 'Telemetry', a: 'Building system data', b: 'Source and reconciliation' },
      ],
      takeaway: 'Digital flows have different verification and legal status.',
    },
  },
  'realestate-proptech-m2-4': {
    heading: 'Product discovery runs from user research to proof of willingness to pay',
    intro: 'Teams research user jobs, offline friction, alternatives, measurable outcomes and adoption barriers. A feature request is not proof of willingness to pay.',
    spec: {
      layout: 'flow', title: 'Customer Problem and Product Discovery', kicker: '',
      steps: [
        { label: 'User research', detail: 'Study user jobs and alternatives' },
        { label: 'Pain point', detail: 'Find costly, repeated offline friction' },
        { label: 'Workflow', detail: 'Map where the product fits' },
        { label: 'Outcome', detail: 'Define a measurable result' },
        { label: 'Willingness to pay', detail: 'Test it, not just feature requests', kind: 'decision' },
      ],
      note: 'Test with local users and property types.',
      takeaway: 'Strong products start from costly, repeated property problems.',
    },
  },
  'realestate-proptech-m2-5': {
    heading: 'Five quality checks every property record needs before it is trusted',
    intro: 'Listings and property records come from owners, brokers, developers, public records, partners and sensors. Advertised price is not verified transaction price.',
    spec: {
      layout: 'table', title: 'Property Data Collection and Verification', kicker: '',
      headers: ['Check', 'Question it answers', 'Record to keep'],
      rows: [
        { label: 'Source', a: 'Owner, broker, developer, public record, partner or sensor?', b: 'Provenance' },
        { label: 'Authority', a: 'May this supplier list the property?', b: 'Who confirmed it' },
        { label: 'Freshness', a: 'Is the record still current?', b: 'Timestamps' },
        { label: 'Duplicate', a: 'Is this one property listed twice?', b: 'Merged record' },
        { label: 'Transaction', a: 'Advertised price or verified price?', b: 'Price status' },
      ],
      note: 'Each check is a product capability and an operating cost.',
      takeaway: 'Data quality is a product capability and operating cost.',
    },
  },
  'realestate-proptech-m2-6': {
    heading: 'Build, integrate or partner: matching architecture to workflow and risk',
    intro: 'Engineering, data pipelines, identity, APIs and strategic partnerships create the service foundation. A payment or brokerage partner adds separate obligations.',
    spec: {
      layout: 'decision', title: 'Architecture, Development and Partnerships', kicker: '',
      root: { label: 'Capability the product needs', detail: 'Runs on cloud, APIs and security controls' },
      question: 'Which route fits the workflow, integration needs and risk?',
      branches: [
        { condition: 'Core workflow the team can secure', outcome: 'Build', detail: 'Own the engineering and data pipeline', tone: 'positive' },
        { condition: 'Existing system already does it', outcome: 'Integrate through APIs', detail: 'Define data access and identity', tone: 'caution' },
        { condition: 'Payment or brokerage service', outcome: 'Partner', detail: 'Accept separate obligations', tone: 'caution' },
      ],
      note: 'Whatever the route, define access and incident ownership.',
      takeaway: 'Product architecture should fit workflow, integration and risk.',
    },
  },
  'realestate-proptech-m2-7': {
    heading: 'The listing lifecycle a marketplace team runs, from onboarding to retirement',
    intro: 'Teams onboard, deduplicate, verify, rank and retire listings. More listings can reduce user value when they are stale or duplicated.',
    spec: {
      layout: 'flow', title: 'Marketplace and Listing Operations', kicker: '',
      steps: [
        { label: 'Onboard', detail: 'Add new supply' },
        { label: 'Deduplicate', detail: 'Moderate repeated listings' },
        { label: 'Verify', detail: 'Check details and authority' },
        { label: 'Rank', detail: 'Order search results by relevance' },
        { label: 'Retire', detail: 'Remove stale listings', kind: 'outcome' },
      ],
      loop: 'Retiring stale listings keeps active unique verified supply useful for search.',
      takeaway: 'Marketplace operations balance supply growth with relevance and trust.',
    },
  },
  'realestate-proptech-m2-8': {
    heading: 'The online-to-offline funnel from search query to signed documents',
    intro: 'Search, recommendations, messaging, scheduling, document and partner workflows support online-to-offline conversion. Inquiry volume is not completed transaction conversion.',
    spec: {
      layout: 'flow', title: 'Search, Matching and Transaction Workflows', kicker: '',
      steps: [
        { label: 'Query', detail: 'User searches for property', owner: 'User' },
        { label: 'Recommendation', detail: 'Platform matches relevant listings', owner: 'Platform' },
        { label: 'Lead', detail: 'Messaging or inquiry to the supplier' },
        { label: 'Visit', detail: 'Scheduled offline viewing' },
        { label: 'Document', detail: 'Partner and document workflow to completion', kind: 'outcome' },
      ],
      note: 'Instrument each funnel stage separately.',
      takeaway: 'Digital matching should connect users to qualified next steps.',
    },
  },
  'realestate-proptech-m2-9': {
    heading: 'Enterprise software creates value only after five implementation steps',
    intro: 'Teams configure data, migrate records, integrate systems, train users and monitor activation. A signed subscription can remain shelfware.',
    spec: {
      layout: 'flow', title: 'SaaS Implementation and Product Analytics', kicker: '',
      steps: [
        { label: 'Configure', detail: 'Set up data and settings' },
        { label: 'Migrate', detail: 'Move existing records' },
        { label: 'Integrate', detail: 'Connect other systems' },
        { label: 'Train', detail: 'Prepare users' },
        { label: 'Adopt', detail: 'Monitor activation and usage', kind: 'outcome' },
      ],
      note: 'Track value milestones and support load, not just contract signature.',
      takeaway: 'Enterprise value depends on implementation and adoption, not software access alone.',
    },
  },
  'realestate-proptech-m2-10': {
    heading: 'Shared signup, then different activation milestones by customer type',
    intro: 'Consumer, broker and enterprise onboarding use different milestones. Registered users are not active or activated users.',
    spec: {
      layout: 'pathway', title: 'Customer Onboarding and Activation', kicker: '',
      trunk: [
        { label: 'Signup', detail: 'Account created — not yet activation' },
        { label: 'Setup', detail: 'Profile and basic configuration' },
      ],
      optionsLabel: 'Milestones by customer type — alternatives, not steps',
      options: [
        { label: 'Consumer', detail: 'Reaches first value quickly' },
        { label: 'Broker', detail: 'First value in daily work' },
        { label: 'Enterprise', detail: 'Permissions and training come first' },
      ],
      afterLabel: 'Counts as activation',
      after: [{ label: 'Outcome linked to retention', detail: 'Measured for an eligible cohort and window', kind: 'outcome' }],
      takeaway: 'Activation should represent an outcome correlated with retention.',
    },
  },
  'realestate-proptech-m2-11': {
    heading: 'Recurring growth splits into keeping revenue and expanding it',
    intro: 'Customer success resolves issues, drives adoption, renews contracts and expands relevant usage. NRR can exceed 100% while logo churn remains material.',
    spec: {
      layout: 'driverTree', title: 'Support, Retention and Expansion', kicker: '',
      root: { label: 'Recurring growth', detail: 'From retained customer value' },
      drivers: [
        { label: 'Support', detail: 'Resolve issues and drive adoption' },
        { label: 'Renewal', detail: 'Keep existing contracts', children: [{ label: 'GRR', detail: 'Revenue kept from existing customers' }] },
        { label: 'Upsell', detail: 'Expand relevant usage', children: [{ label: 'NRR', detail: 'Retention including expansion' }] },
      ],
      note: 'Report GRR and NRR separately: NRR can exceed 100% while logo churn remains material.',
      takeaway: 'Recurring growth depends on retained customer value.',
    },
  },
  'realestate-proptech-m2-12': {
    heading: 'Estimated performance versus measured customer outcomes',
    intro: 'Teams track conversion, time saved, uptime, energy or maintenance outcomes and contribution. Estimated efficiency is not measured ROI.',
    spec: {
      layout: 'compare', title: 'Performance Measurement and Feedback', kicker: '',
      leftTitle: 'Estimated', rightTitle: 'Measured',
      rows: [
        { label: 'Conversion', a: 'Activity counts', b: 'Verified customer outcomes' },
        { label: 'Availability', a: 'Expected uptime', b: 'Tracked uptime' },
        { label: 'Efficiency', a: 'Projected time or energy saved', b: 'Savings against a baseline' },
        { label: 'ROI', a: 'Estimated efficiency', b: 'Outcome net of cost and contribution' },
        { label: 'Method', a: 'Assumptions', b: 'Experiments and controlled comparisons' },
      ],
      takeaway: 'Performance should connect product use to verified customer outcomes and cost.',
    },
  },
  'realestate-proptech-m2-13': {
    heading: 'Workflow outcomes depend on governed data, talent and infrastructure together',
    intro: 'Core inputs include data rights, product talent, cloud, models, integrations and security. Low cloud cost cannot offset poor data quality.',
    spec: {
      layout: 'driverTree', title: 'Data, Engineering and Infrastructure Inputs', kicker: '',
      root: { label: 'Workflow outcome', detail: 'At a tracked lifecycle cost' },
      drivers: [
        { label: 'Governed data', detail: 'Data rights and quality', children: [{ label: 'Data rights' }, { label: 'Data quality' }] },
        { label: 'Software capability', children: [{ label: 'Engineers' }, { label: 'Models' }, { label: 'Integrations' }] },
        { label: 'Infrastructure', children: [{ label: 'Cloud' }, { label: 'Security' }] },
      ],
      note: 'Low cloud cost cannot offset poor data quality; track lifecycle cost.',
      takeaway: 'PropTech transforms governed data and software capability into workflow outcomes.',
    },
  },
  'realestate-proptech-m2-14': {
    heading: 'Marketplaces and SaaS strengthen through different network mechanisms',
    intro: 'Marketplaces improve with matching liquidity; SaaS improves through embedded workflows and integrations. Raw user growth is not proof of network value.',
    spec: {
      layout: 'compare', title: 'Network Effects and Product Adoption', kicker: '',
      leftTitle: 'Marketplace', rightTitle: 'SaaS',
      rows: [
        { label: 'Improves through', a: 'Matching liquidity', b: 'Embedded workflows and integrations' },
        { label: 'Who must participate', a: 'Relevant supply and demand', b: 'Activated users' },
        { label: 'Proof of value', a: 'Successful interactions', b: 'Retention' },
        { label: 'What to measure locally', a: 'Local liquidity', b: 'Cohort retention' },
      ],
      note: 'Raw user growth is not proof of network value in either model.',
      takeaway: 'Network effects require relevant participation and successful interaction.',
    },
  },
  'realestate-proptech-m2-15': {
    heading: 'Customer value and provider economics must both hold',
    intro: 'Products can improve search, occupancy, collections, maintenance or energy while generating fees. A product can save customer time yet lose money per account.',
    spec: {
      layout: 'compare', title: 'Customer Value and Unit Economics', kicker: '',
      leftTitle: 'Value for the customer', rightTitle: 'Sustainability for the provider',
      rows: [
        { label: 'What improves', a: 'Search, occupancy, collections, maintenance, energy', b: 'Fees generated' },
        { label: 'How it is measured', a: 'Time, conversion, cost and risk', b: 'Contribution per account' },
        { label: 'Failure mode', a: 'Benefit cannot be demonstrated', b: 'Saves time but loses money per account' },
        { label: 'Before scaling', a: 'Show the outcome', b: 'Test contribution' },
      ],
      takeaway: 'Value must be demonstrable for customers and sustainable for the provider.',
    },
  },
  'realestate-proptech-m2-16': {
    heading: 'Global PropTech models and the local fit each must prove',
    intro: 'Consumer portals, commercial data businesses, PMS and smart-building vendors use distinct ecosystems. A mature-market data product may lack Vietnam data coverage.',
    spec: {
      layout: 'table', title: 'Global Marketplace and SaaS Models', kicker: '',
      headers: ['Global model', 'Ecosystem it relies on', 'Local fit check'],
      rows: [
        { label: 'Consumer portal', a: 'Listing supply and searching consumers', b: 'Local supply and workflow' },
        { label: 'Commercial data business', a: 'Broad property data coverage', b: 'Vietnam data coverage' },
        { label: 'PMS subscription', a: 'Enterprise property workflows', b: 'Local workflow and economics' },
        { label: 'Smart-building vendor', a: 'Building systems and integrations', b: 'Local building infrastructure' },
      ],
      note: 'Yardi and CoStar Group illustrate data and software models; they are patterns, not proof of local fit.',
      takeaway: 'Global models provide patterns, not automatic local product-market fit.',
    },
  },
  'realestate-proptech-m2-17': {
    heading: 'Vietnam’s ecosystem links online discovery to offline agents and legal steps',
    intro: 'Portals, agencies, developers, banks, managers and software providers cooperate across fragmented data. Online interest still requires verified property and transaction execution.',
    spec: {
      layout: 'ecosystem', title: 'Vietnam PropTech Ecosystem', kicker: '',
      center: { label: 'Buyer or renter', detail: 'Starts online, completes offline' },
      actors: [
        { label: 'Portal', relation: 'Digital discovery', flows: ['information'] },
        { label: 'Broker', relation: 'Site visits and offline execution', flows: ['service', 'money'] },
        { label: 'Developer', relation: 'Supplies project inventory', flows: ['product'] },
        { label: 'Bank', relation: 'Finances the transaction', flows: ['money', 'risk'] },
        { label: 'Building manager', relation: 'Manages the property and its building', flows: ['service'] },
        { label: 'SaaS provider', relation: 'Software for agencies and managers', flows: ['service', 'information'] },
      ],
      note: 'Build trusted partner handoffs; data is fragmented across participants.',
      takeaway: 'Vietnam combines digital discovery with offline agents, site visits and legal workflows.',
    },
  },
  'realestate-proptech-m2-18': {
    heading: 'Scaling in Vietnam rests on legal and technical infrastructure',
    intro: 'Data protection, electronic transactions, real-estate roles, payments and building systems shape products. One compliance model cannot cover every activity.',
    spec: {
      layout: 'taxonomy', title: 'Regulatory, Infrastructure and Scaling Differences', kicker: '',
      root: 'What a scaling product depends on', rootDetail: 'Conditions checked together, not in sequence',
      groups: [
        { label: 'Data law', detail: 'Law 91/2025/QH15, effective 1 January 2026' },
        { label: 'E-transaction', detail: 'Law 20/2023/QH15, effective 1 July 2024' },
        { label: 'Real-estate roles', detail: 'Law 29/2023/QH15 on real-estate business' },
        { label: 'Payment', detail: 'Activity-specific obligations' },
        { label: 'Cloud and integration', items: ['Cloud', 'Integration', 'Building systems'] },
      ],
      note: 'Verify primary sources; duties depend on activity, role and current implementing rules.',
      takeaway: 'Scaling depends on local legal and technical infrastructure.',
    },
  },
};
