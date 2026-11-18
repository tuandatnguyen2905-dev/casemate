import type { PaymentsFintechChapterVisual } from './paymentsFintechVisualSpecs';

/** Chapter-specific Learning Visuals for Payments & Fintech Module 04, keyed by visualKind. */
export const PAYMENTS_FINTECH_M4_VISUALS: Record<string, PaymentsFintechChapterVisual> = {
  'payments-fintech-m4-1': {
    heading: 'Payment providers compete for the same transactions on different bases of advantage',
    intro: 'Networks, processors, wallets, gateways and platforms compete across ecosystem positions. One provider wins through merchant acceptance while another differentiates with developer-friendly APIs.',
    spec: {
      layout: 'pathway', title: '01 How Competitive Is the Payments & Fintech Industry?', kicker: '',
      trunk: [{ label: 'Payment demand', detail: 'Users and merchants choosing where to transact' }],
      optionsLabel: 'Bases of advantage — providers compete on one or several',
      options: [
        { label: 'Network scale', detail: 'Reach across participants' },
        { label: 'Active user', detail: 'Real engagement, not registrations' },
        { label: 'API integration', detail: 'Ease for developers and merchants' },
        { label: 'Ecosystem breadth', detail: 'Range of connected services' },
      ],
      note: 'Compare role, rail, active use, accepted merchant, successful and settled transaction and service scope, not registrations alone.',
      takeaway: 'Advantage depends on scale, reach, acceptance, integration, reliability and engagement.',
    },
  },
  'payments-fintech-m4-2': {
    heading: 'Acceptance, volume and reliability are the market-structure factors this chapter uses to read competitive pressure',
    intro: 'Apply a structured competition lens using the factors the chapter gives: where users can pay, how much volume flows, and how dependably it is processed.',
    spec: {
      layout: 'table', title: '02 How Do Porter’s Five Forces Apply to Digital Payments?', kicker: '',
      headers: ['Market-structure factor', 'Why it shapes competition', 'Evidence to compare'],
      rows: [
        { label: 'Merchant acceptance', a: 'Decides where users can actually pay', b: 'Accepted merchants, not registrations' },
        { label: 'Payment volume', a: 'Scale is a basis of advantage', b: 'Successful and settled transactions' },
        { label: 'Reliability', a: 'Failures push users and merchants elsewhere', b: 'Service scope and successful transaction outcomes' },
      ],
      note: 'The chapter’s text covers these factors only; it does not assign them to individual forces, so do not read a full five-force map into it.',
      takeaway: 'Advantage depends on scale, reach, acceptance, integration, reliability and engagement.',
    },
  },
  'payments-fintech-m4-3': {
    heading: 'Barriers to entry are regulatory, technical, access-related and commercial',
    intro: 'A customer app is easier to launch than trusted infrastructure access. A wallet can attract users with promotions but needs acceptance and repeat use to persist.',
    spec: {
      layout: 'taxonomy', title: '03 What Creates Competitive Barriers and Network Advantages?', kicker: '',
      root: 'Barriers to building a payment business', rootDetail: 'Barrier types that apply together, not in sequence',
      groups: [
        { label: 'Regulatory', detail: 'Permission to operate', items: ['License', 'Compliance cost'] },
        { label: 'Technical', detail: 'Connecting securely to the system', items: ['Network integration', 'Security investment'] },
        { label: 'Access', detail: 'Banking and settlement relationships', items: ['Bank access'] },
        { label: 'Commercial', detail: 'Advantages incumbents already hold', items: ['Network effect', 'Trust'] },
      ],
      note: 'Verify permission, banking and settlement relationships, security, operational capacity, funding and retention economics.',
      takeaway: 'Customer applications are easier to launch than trusted infrastructure access and sustainable scale.',
    },
  },
  'payments-fintech-m4-4': {
    heading: 'Global payment players fall into infrastructure types that enable routing and acceptance',
    intro: 'Institutions and providers enable domestic and international routing, authorization, processing and merchant acceptance. Classify players by type; this chapter names and ranks no company.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Payments & Fintech Players?', kicker: '',
      root: 'Global infrastructure participants', rootDetail: 'Participant types, not a ranking',
      groups: [
        { label: 'Card network', detail: 'Routing and authorization between participants' },
        { label: 'Acquirer', detail: 'Lets merchants accept payments and receive settlement' },
        { label: 'Processor', detail: 'Supports card acceptance through acquiring relationships' },
        { label: 'Cross-border provider', detail: 'International routing and payment' },
      ],
      note: 'Infrastructure reliability is the common test: benchmark each participant on its actual rail, role, reach, settlement, availability and responsibility.',
      takeaway: 'Infrastructure participants benefit from scale, acceptance, relationships and embedded connectivity.',
    },
  },
  'payments-fintech-m4-5': {
    heading: 'Issuer and processor models compete on different relationships and sources of reach',
    intro: 'An issuer provides the customer payment account or instrument and authorizes eligible use; a processor supports acceptance through acquiring relationships and infrastructure.',
    spec: {
      layout: 'compare', title: '05 How Do Different Payment Business Models Compete?', kicker: '',
      leftTitle: 'Issuer model', rightTitle: 'Processor model',
      rows: [
        { label: 'Core role', a: 'Provides the account or instrument', b: 'Processes transactions for acceptance' },
        { label: 'Key relationship', a: 'The paying customer', b: 'Merchants via acquiring relationships' },
        { label: 'Decision it controls', a: 'Authorizes eligible use', b: 'Routing and processing of requests' },
        { label: 'Transaction reach', a: 'Customers holding its instrument', b: 'Participants connected to its infrastructure' },
      ],
      note: 'Benchmark each participant on its actual rail, role, reach, settlement, availability and responsibility.',
      takeaway: 'Infrastructure participants benefit from scale, acceptance, relationships and embedded connectivity, but issuers and processors build them differently.',
    },
  },
  'payments-fintech-m4-6': {
    heading: 'Vietnam’s payment providers are best understood by technology role, not by name',
    intro: 'Customer interfaces, merchant technology and software integration support payment acquisition and operations. A platform API, for example, integrates multiple supported methods into one checkout.',
    spec: {
      layout: 'taxonomy', title: '06 Who Are the Key Payment Providers in Vietnam?', kicker: '',
      root: 'Provider roles in Vietnam', rootDetail: 'Roles to distinguish — one provider may hold several; no ranking',
      groups: [
        { label: 'Customer interface', items: ['Wallet'] },
        { label: 'Merchant technology', items: ['Gateway', 'Merchant tool'] },
        { label: 'Software integration', items: ['API', 'Orchestration', 'Embedded payment'] },
        { label: 'Partnerships', items: ['Platform partnership'] },
      ],
      note: 'Distinguish wallet, intermediary, gateway, software and financial-institution roles and permissions.',
      takeaway: 'Technology-led differentiation comes from experience, integration, transaction data and service breadth.',
    },
  },
  'payments-fintech-m4-7': {
    heading: 'Fix the business role and definitions before comparing any payment metric',
    intro: 'Compare providers by model using aligned entity, geography, period, currency, transaction stage and gross-versus-net basis. A card network’s switched volume cannot be compared directly with a wallet’s registered accounts or a gateway’s merchant count.',
    spec: {
      layout: 'flow', title: '07 How Should Payment and Fintech Companies Be Compared?', kicker: '',
      steps: [
        { label: 'Identify business role', detail: 'Network, processor, acquirer, gateway, wallet, bank-tech or platform' },
        { label: 'Align scope', detail: 'Same entity, geography, period and currency' },
        { label: 'Set accounting scope', detail: 'Transaction stage and gross-versus-net basis' },
        { label: 'Pick a like-for-like metric', detail: 'Transaction count, TPV, active users, active merchants or revenue', kind: 'decision' },
        { label: 'Compare within the same role', detail: 'Include failure and refund cost', kind: 'outcome' },
      ],
      note: 'Use the same transaction, merchant, rail, volume, tax and settlement assumptions on both sides.',
      takeaway: 'Benchmarking starts with provider role and aligned definitions; registered accounts, active users, merchants, TPV, revenue and profit cannot be ranked as if they measure the same thing.',
    },
  },
  'payments-fintech-m4-8': {
    heading: 'The cheapest transaction fee is not the same as the best merchant outcome',
    intro: 'Merchant and user functionality, pricing, onboarding, checkout, dashboard, settlement and disputes all differ. Two gateways with similar fees can differ in methods, developer effort and conversion.',
    spec: {
      layout: 'compare', title: '08 How Do Transaction Scale, Acceptance, and Platform Economics Differ?', kicker: '',
      leftTitle: 'Judging by transaction fee alone', rightTitle: 'Judging total merchant outcome',
      rows: [
        { label: 'Price', a: 'Headline transaction fee', b: 'Fee plus failure and refund cost' },
        { label: 'Integration', a: 'Assumed equal', b: 'Developer effort and supported methods' },
        { label: 'Checkout conversion', a: 'Not measured', b: 'Share of checkouts that succeed' },
        { label: 'Service', a: 'Ignored', b: 'Coverage, settlement and dispute support' },
      ],
      note: 'Use the same transaction, merchant, rail, volume, tax and settlement assumptions for every provider compared.',
      takeaway: 'Lowest fee can underperform if success, coverage or support is weak.',
    },
  },
  'payments-fintech-m4-9': {
    heading: 'Competitive advantage balances reliability, conversion, risk and profit',
    intro: 'Infrastructure, cyber, fraud and commercial performance must be compared under the same stages and definitions. A provider improves authorization while monitoring whether fraud rises beyond appetite.',
    spec: {
      layout: 'driverTree', title: '09 Which Capabilities Explain Competitive Advantage?', kicker: '',
      root: { label: 'Sustainable competitive advantage', detail: 'Growth that stays reliable, safe and profitable' },
      drivers: [
        { label: 'Reliability', children: [{ label: 'Availability' }, { label: 'Scalability' }] },
        { label: 'Conversion', children: [{ label: 'Authorisation rate', detail: 'Approved over eligible requests' }, { label: 'API quality' }] },
        { label: 'Risk', children: [{ label: 'Fraud loss', detail: 'Watched as authorization improves' }] },
        { label: 'Profit', children: [{ label: 'Processing cost' }, { label: 'Operating margin' }] },
      ],
      note: 'Define stage, eligible requests, denominator, false positives, settled outcomes, revenue basis and period before comparison.',
      takeaway: 'Sustainable competitiveness balances transaction growth with reliability, risk, compliance and profit.',
    },
  },
  'payments-fintech-m4-10': {
    heading: 'The same four capabilities build trust when they hold and destroy it when they fail',
    intro: 'Technical and security capabilities process payments and integrate merchants and institutions. Redundant infrastructure and monitoring reduce disruption during peaks.',
    spec: {
      layout: 'compare', title: '10 Why Do Trust, Security, and Reliability Drive Success?', kicker: '',
      leftTitle: 'When the capability holds', rightTitle: 'When it fails',
      rows: [
        { label: 'Success rate', a: 'Small gains add value at scale', b: 'Failed payments erode confidence' },
        { label: 'API performance', a: 'Merchants integrate and stay', b: 'Checkout slows or breaks' },
        { label: 'Authentication', a: 'Only permitted people approve actions', b: 'A breach rapidly damages trust' },
        { label: 'Incident response', a: 'Redundancy and monitoring contain disruption', b: 'An outage spreads to users and merchants' },
      ],
      note: 'Test capacity, failover, reconciliation, recovery, incident communication, dependencies and regulatory reporting.',
      takeaway: 'Small reliability gains create scale value while outages and breaches rapidly damage trust.',
    },
  },
  'payments-fintech-m4-11': {
    heading: 'A merchant network is only as strong as its availability, interoperability and fraud detection',
    intro: 'Merchant networks rely on technical and security capabilities that keep payments running and connect merchants and institutions. Test each before scaling distribution.',
    spec: {
      layout: 'table', title: '11 How Do Merchant Networks and Distribution Create Advantages?', kicker: '',
      headers: ['Capability', 'Why the merchant network depends on it', 'Test before scaling'],
      rows: [
        { label: 'System availability', a: 'Merchants can accept payments at peaks', b: 'Capacity, failover and recovery' },
        { label: 'Interoperability', a: 'Participants exchange and use payment information reliably', b: 'Dependencies and reconciliation' },
        { label: 'Fraud detection', a: 'Merchants and users stay confident', b: 'Incident communication and regulatory reporting' },
      ],
      note: 'Example: redundant infrastructure and monitoring reduce disruption during peaks.',
      takeaway: 'Small reliability gains create scale value while outages and breaches rapidly damage trust across a merchant network.',
    },
  },
  'payments-fintech-m4-12': {
    heading: 'Merchant coverage and active use reinforce each other in a growth loop',
    intro: 'Commercial capabilities acquire and retain active merchants and consumers through useful acceptance and service. A wallet increases repeat use by expanding relevant merchant acceptance.',
    spec: {
      layout: 'flow', title: '12 How Do Technology, Scale, and Unit Economics Support Growth?', kicker: '',
      steps: [
        { label: 'Partner distribution', detail: 'Reach merchants through partners', owner: 'Provider' },
        { label: 'Onboarding', detail: 'Simple, priced and supported sign-up', owner: 'Merchants' },
        { label: 'Merchant coverage', detail: 'More relevant places to pay', owner: 'Merchants' },
        { label: 'Active user', detail: 'Users pay where they shop', owner: 'Consumers' },
        { label: 'Transaction frequency', detail: 'Repeat use across channels', kind: 'outcome', owner: 'Consumers' },
      ],
      loop: 'More active users make acceptance more valuable to merchants; pricing and merchant support keep them on board.',
      note: 'Track verified merchants, active merchants, active users, frequency, retained cohorts, subsidy and contribution.',
      takeaway: 'Ecosystems gain value when users can pay and merchants can accept across relevant channels.',
    },
  },
  'payments-fintech-m4-13': {
    heading: 'Each industry strength comes with a matching weakness or exposure',
    intro: 'Industry strengths and weaknesses vary by rail, provider, customer and market. A provider can expand SME services while investing in fraud and resilience.',
    spec: {
      layout: 'compare', title: '13 What Are the Industry’s Main Strengths and Weaknesses?', kicker: '',
      leftTitle: 'Strength', rightTitle: 'Weakness or exposure',
      rows: [
        { label: 'Demand', a: 'Convenience draws digital demand', b: 'Intense competition for the same users' },
        { label: 'Scale', a: 'Network effect as users and merchants join', b: 'Infrastructure cost to serve that scale' },
        { label: 'Economics', a: 'High transaction frequency', b: 'Thin margin' },
        { label: 'Infrastructure', a: 'Connected systems', b: 'Cyber threat' },
      ],
      note: 'Evaluate SWOT by role, rail, merchant segment and economics rather than one market-wide score.',
      takeaway: 'Digital demand creates opportunity while infrastructure cost, risk and intense competition determine sustainability.',
    },
  },
  'payments-fintech-m4-14': {
    heading: 'Every opportunity in payments brings its own threat to manage',
    intro: 'Opportunities and threats vary by rail, provider, customer and market. A provider expanding SME services, for example, must invest in fraud control and resilience at the same time.',
    spec: {
      layout: 'compare', title: '14 What Opportunities and Threats Shape Competition?', kicker: '',
      leftTitle: 'Opportunity', rightTitle: 'Linked threat',
      rows: [
        { label: 'Technology', a: 'Scalable technology serves more volume', b: 'Infrastructure cost and risk grow with it' },
        { label: 'Distribution', a: 'Embedded opportunity inside partner workflows', b: 'Partner dependence for access and customers' },
        { label: 'New segments', a: 'Expanding SME services', b: 'More fraud and resilience exposure' },
      ],
      note: 'Evaluate opportunities and threats by role, rail and merchant segment, not as one industry-wide verdict.',
      takeaway: 'Digital demand creates opportunity while infrastructure cost, risk and intense competition determine sustainability.',
    },
  },
  'payments-fintech-m4-15': {
    heading: 'Whether to keep scaling depends on retention, contribution and risk triggers',
    intro: 'Rapid acquisition pressures unit economics, compliance, infrastructure and support. A provider cuts promotions when acquired users do not generate recurring activity.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Payment Providers Make?', kicker: '',
      root: { label: 'Acquisition push', detail: 'Promotion cost spent to win users and merchants' },
      question: 'Do acquired cohorts generate recurring, profitable activity within risk triggers?',
      branches: [
        { condition: 'Retained and contributing', outcome: 'Keep scaling', detail: 'Profitability holds as cohorts mature', tone: 'positive' },
        { condition: 'Fraud, outage or partner trigger hit', outcome: 'Pause and remediate', detail: 'Fraud loss, service outage, regulatory complexity or partner dependence', tone: 'caution' },
        { condition: 'No recurring activity', outcome: 'Cut promotions', detail: 'Customer churn: acquired users do not transact again', tone: 'negative' },
      ],
      note: 'Set triggers for fraud, availability, complaints, partner concentration, cohort retention and contribution remediation.',
      takeaway: 'Rapid acquisition pressures unit economics, compliance, infrastructure and support.',
    },
  },
};
