import type { PaymentsFintechChapterVisual } from './paymentsFintechVisualSpecs';

/** Chapter-specific Learning Visuals for Payments & Fintech Module 05, keyed by visualKind. */
export const PAYMENTS_FINTECH_M5_VISUALS: Record<string, PaymentsFintechChapterVisual> = {
  'payments-fintech-m5-1': {
    heading: 'Changing preferences show up across stores, e-commerce and person-to-person payments',
    intro: 'Consumer habits are shifting toward contactless, wallets, choice and frictionless checkout. A retailer, for example, offers QR, card and wallet options for different preferences.',
    spec: {
      layout: 'table', title: '01 How Are Consumer Payment Preferences Changing?', kicker: '',
      headers: ['Preference', 'Where it shows up', 'Measure it by'],
      rows: [
        { label: 'Contactless', a: 'Paying in stores', b: 'Active use by method' },
        { label: 'Mobile wallet', a: 'Stores, e-commerce and person-to-person', b: 'Frequency, not availability' },
        { label: 'Payment choice', a: 'Retailers offering QR, card and wallet', b: 'Success rate by method' },
        { label: 'Frictionless checkout', a: 'E-commerce checkout', b: 'Complaints and fraud by method' },
      ],
      note: 'Measure active use, frequency, success, complaints and fraud by method, not method availability alone.',
      takeaway: 'Consumers increasingly value convenience, speed, choice, visibility and consistent channel experiences.',
    },
  },
  'payments-fintech-m5-2': {
    heading: 'Wallet and cashless adoption grows with convenience, speed, visibility and consistent channels',
    intro: 'QR, instant transfer and transaction visibility each answer something consumers value. Adoption should be read from active use, not from the method merely being available.',
    spec: {
      layout: 'driverTree', title: '02 What Drives Digital Wallet and Cashless Payment Adoption?', kicker: '',
      root: { label: 'Wallet and cashless adoption', detail: 'Measured by active use and frequency' },
      drivers: [
        { label: 'Convenience', children: [{ label: 'QR', detail: 'Scan to pay' }] },
        { label: 'Speed', children: [{ label: 'Instant transfer' }] },
        { label: 'Visibility', children: [{ label: 'Transaction visibility', detail: 'Users see status and history' }] },
        { label: 'Consistent channels', detail: 'Same experience in stores, online and person-to-person' },
      ],
      note: 'Measure active use, frequency, success, complaints and fraud by method.',
      takeaway: 'Consumers increasingly value convenience, speed, choice, visibility and consistent channel experiences.',
    },
  },
  'payments-fintech-m5-3': {
    heading: 'Sustained use needs confidence, transparency and suitable access on top of convenience',
    intro: 'Trust, literacy, security and inclusion shape how consumers and merchants behave. A provider can improve alerts and fraud education for suspicious activity.',
    spec: {
      layout: 'taxonomy', title: '03 How Do Convenience, Trust, and Merchant Acceptance Influence Behavior?', kicker: '',
      root: 'Conditions behind lasting payment behaviour', rootDetail: 'Considered together, not in sequence',
      groups: [
        { label: 'Confidence', detail: 'Users feel safe paying', items: ['Transaction safety', 'Scam prevention', 'Notification'] },
        { label: 'Transparency', detail: 'Users know what they pay', items: ['Transparent fee'] },
        { label: 'Suitable access', detail: 'Users can actually use the service', items: ['Digital literacy', 'Financial access', 'User education'] },
      ],
      note: 'Use accessible language, controls, support and redress while avoiding overstatement that technology alone prevents scams.',
      takeaway: 'Convenience cannot sustain adoption without confidence and suitable access.',
    },
  },
  'payments-fintech-m5-4': {
    heading: 'Real-time monitoring scores each payment and asks for extra verification only when needed',
    intro: 'AI-supported monitoring identifies fraud and assesses risk in real time. Unusual patterns trigger extra verification while routine activity proceeds.',
    spec: {
      layout: 'flow', title: '04 How Are Real-Time Payments and New Payment Rails Evolving?', kicker: '',
      steps: [
        { label: 'Real-time payment request' },
        { label: 'Behavioural analytics', detail: 'Compares activity with usual patterns' },
        { label: 'Fraud model', detail: 'Assesses the risk of this request' },
        { label: 'Adaptive authentication', detail: 'Extra verification only when unusual', kind: 'decision' },
        { label: 'Payment proceeds or is verified', kind: 'outcome' },
      ],
      loop: 'Model governance: lawful data, validation by transaction and customer cohorts, drift and false-positive monitoring, accountable review.',
      takeaway: 'Analytics improves detection and efficiency only when data, privacy and model limitations are governed.',
    },
  },
  'payments-fintech-m5-5': {
    heading: 'An AI risk score decides whether a payment flows, gets checked or is reviewed as a false positive',
    intro: 'Automation lets routine payments proceed while unusual ones get extra checks. False positives must be monitored, because blocking legitimate users is also a cost.',
    spec: {
      layout: 'decision', title: '05 How Are APIs, AI, and Automation Transforming Payments?', kicker: '',
      root: { label: 'Anomaly detection', detail: 'Produces a risk score for each transaction' },
      question: 'How unusual is this activity?',
      branches: [
        { condition: 'Routine pattern', outcome: 'Proceeds automatically', detail: 'No added friction', tone: 'positive' },
        { condition: 'Unusual pattern', outcome: 'Extra verification', detail: 'Customer confirms before completion', tone: 'caution' },
        { condition: 'Flagged but legitimate', outcome: 'Record as false positive', detail: 'Feeds drift monitoring and accountable review', tone: 'negative' },
      ],
      note: 'Use lawful data, validate by transaction and customer cohorts, monitor drift and false positives and retain accountable review.',
      takeaway: 'Analytics improves detection and efficiency only when data, privacy and model limitations are governed.',
    },
  },
  'payments-fintech-m5-6': {
    heading: 'API-initiated instant transfers can run from initiation to automated reconciliation',
    intro: 'Instant rails and API-based integration connect institutions, merchants and applications. A business initiates eligible transfers and reconciles confirmations through an API.',
    spec: {
      layout: 'flow', title: '06 What Emerging Technologies Could Reshape Financial Infrastructure?', kicker: '',
      steps: [
        { label: 'Initiate via Payment API', detail: 'Consent and authentication first', owner: 'Business' },
        { label: 'Orchestration', detail: 'Routes to a supported provider and rail', owner: 'Provider' },
        { label: 'Account-to-account transfer', detail: 'Instant transfer between accounts', owner: 'Institutions' },
        { label: 'Confirmation', detail: 'Finality or exception returned', owner: 'Institutions' },
        { label: 'Automated reconciliation', detail: 'Confirmations matched to records', kind: 'outcome', owner: 'Business' },
      ],
      note: 'Open finance and interoperability extend this connectivity across institutions; align API access, consent, finality, exceptions, data and licensed roles with domestic infrastructure.',
      takeaway: 'Faster payments and connectivity reduce friction only when infrastructure and controls are reliable.',
    },
  },
  'payments-fintech-m5-7': {
    heading: 'Store, mobile and online payments converge into one refund and reconciliation operation',
    intro: 'Physical, online and mobile payments are being connected into unified transaction operations. A retailer, for example, consolidates store and e-commerce transactions and refunds.',
    spec: {
      layout: 'pathway', title: '07 How Are Digital Payment Distribution Channels Evolving?', kicker: '',
      trunk: [{ label: 'Customer pays', detail: 'Wherever the customer chooses' }],
      optionsLabel: 'Payment channels — alternatives, not steps',
      options: [
        { label: 'Store terminal', detail: 'In-store acceptance' },
        { label: 'Mobile payment', detail: 'Phone-based payment' },
        { label: 'E-commerce', detail: 'Online store checkout' },
      ],
      afterLabel: 'Unified operations behind every channel',
      after: [
        { label: 'Refund', detail: 'Handled the same way whatever the channel' },
        { label: 'Central reconciliation', detail: 'One view of status and settlement', kind: 'outcome' },
      ],
      note: 'Preserve channel-specific rail and risk details while standardizing status, settlement, reporting and customer support.',
      takeaway: 'Merchants seek consistent acceptance, reporting and customer experience across channels.',
    },
  },
  'payments-fintech-m5-8': {
    heading: 'Merchant platforms replace separate channel set-ups with one checkout layer and one report',
    intro: 'Merchants want online checkout, reporting and routing to work as one system. Orchestration and unified reports keep the experience consistent across channels.',
    spec: {
      layout: 'compare', title: '08 How Are Embedded Payments and Merchant Platforms Expanding?', kicker: '',
      leftTitle: 'Separate channel set-ups', rightTitle: 'Unified merchant platform',
      rows: [
        { label: 'Online checkout', a: 'Each method integrated separately', b: 'One checkout across supported methods' },
        { label: 'Routing', a: 'Fixed per provider', b: 'Orchestration across methods and providers' },
        { label: 'Reporting', a: 'Reports per channel', b: 'Unified report' },
        { label: 'Status and settlement', a: 'Differ by channel', b: 'Standardized, keeping rail and risk detail' },
      ],
      note: 'Example: a retailer consolidates store and e-commerce transactions and refunds.',
      takeaway: 'Merchants seek consistent acceptance, reporting and customer experience across channels.',
    },
  },
  'payments-fintech-m5-9': {
    heading: 'Embedded payment networks link a platform with providers, sellers, customers and software partners',
    intro: 'Payment functionality is being built into software, marketplaces and non-financial customer journeys. Business software, for example, lets users issue invoices and collect payment in one application.',
    spec: {
      layout: 'ecosystem', title: '09 How Are Domestic and Cross-Border Payment Networks Developing?', kicker: '',
      center: { label: 'Platform or marketplace', detail: 'Payment inside a non-financial journey' },
      actors: [
        { label: 'Payment provider', relation: 'Payment API and processing', flows: ['product', 'money'] },
        { label: 'Sub-merchants', relation: 'Merchant onboarding and split settlement', flows: ['money', 'service'] },
        { label: 'Customers', relation: 'Marketplace payment inside the journey', flows: ['money'] },
        { label: 'Software partner', relation: 'Software integration and transaction report', flows: ['information'] },
        { label: 'Platform partner', relation: 'Platform partnership extends reach', flows: ['service', 'information'] },
      ],
      note: 'Define provider, merchant, sub-merchant, funds, settlement, data, disputes and customer ownership across the platform.',
      takeaway: 'Embedded payments reduce friction and deepen platforms by placing transactions inside workflows.',
    },
  },
  'payments-fintech-m5-10': {
    heading: 'Compliance now enters product, partner and technology design from the start',
    intro: 'Expectations for payment services, financial crime, data, cyber and continuity keep evolving. A provider strengthens merchant verification and monitoring before scaling services.',
    spec: {
      layout: 'table', title: '10 How Do Payment Regulations Affect Industry Development?', kicker: '',
      headers: ['Control category', 'Where it enters design', 'Map current duties to'],
      rows: [
        { label: 'Payment license', a: 'Product: which services may be offered', b: 'Each service and role' },
        { label: 'AML', a: 'Merchant verification and monitoring', b: 'Each participant' },
        { label: 'Third-party risk', a: 'Partner selection and oversight', b: 'Each partner relationship' },
        { label: 'Operational resilience', a: 'Technology and system continuity', b: 'Each critical system' },
      ],
      note: 'Map current payment, AML, data, electronic-transaction, cyber and incident duties to each participant and service; this visual states no legal threshold.',
      takeaway: 'Compliance is increasingly part of product, partner and technology design.',
    },
  },
  'payments-fintech-m5-11': {
    heading: 'Security, AML and consumer-protection expectations each centre on a different control',
    intro: 'Requirements for financial crime, protection, data, cyber and continuity are evolving together. Map each control to the participant and service it applies to.',
    spec: {
      layout: 'taxonomy', title: '11 How Are Security, AML, and Consumer Protection Requirements Evolving?', kicker: '',
      root: 'Evolving requirement areas', rootDetail: 'Control categories — verify current duties for each service',
      groups: [
        { label: 'AML', detail: 'Know who is transacting', items: ['Customer verification'] },
        { label: 'Consumer protection', detail: 'Handle customer data responsibly', items: ['Personal data'] },
        { label: 'Security', detail: 'Escalate and report incidents', items: ['Incident reporting'] },
      ],
      note: 'Example: a provider strengthens merchant verification and monitoring before scaling services. Map current payment, AML, data, electronic-transaction, cyber and incident duties to each participant.',
      takeaway: 'Compliance is increasingly part of product, partner and technology design.',
    },
  },
  'payments-fintech-m5-12': {
    heading: 'Responsible expansion must make payments affordable, understandable, secure and appropriate',
    intro: 'Expanding access for underserved consumers and small merchants needs responsible service design. A provider offers simplified merchant onboarding and transparent pricing to small businesses.',
    spec: {
      layout: 'driverTree', title: '12 What Governance and Operational Resilience Challenges Matter Most?', kicker: '',
      root: { label: 'Sustainable digital finance', detail: 'Not merely reachable' },
      drivers: [
        { label: 'Affordable', children: [{ label: 'Low-cost payment' }, { label: 'Transparent fee' }] },
        { label: 'Understandable', children: [{ label: 'Accessible interface' }, { label: 'Financial literacy' }] },
        { label: 'Secure', children: [{ label: 'Responsible data' }] },
        { label: 'Appropriate', children: [{ label: 'Merchant digitisation' }, { label: 'Underserved business' }] },
      ],
      note: 'Measure access, activation, retained use, cost, successful settlement, support and customer outcome separately.',
      takeaway: 'Sustainable digital finance must be affordable, understandable, secure and appropriate, not merely reachable.',
    },
  },
  'payments-fintech-m5-13': {
    heading: 'Each growth factor pays off only where it meets a real merchant need',
    intro: 'Future demand spans acceptance, automation, instant payments, reconciliation, analytics and service tools. A merchant platform, for example, adds reconciliation and analytics beyond processing.',
    spec: {
      layout: 'table', title: '13 What Factors Will Drive Future Digital Payment Growth?', kicker: '',
      headers: ['Growth factor', 'Merchant need it meets', 'Test before scale'],
      rows: [
        { label: 'SME acceptance', a: 'Accepting digital payments affordably', b: 'Merchant problem and pricing' },
        { label: 'Embedded finance', a: 'Payment inside business workflows', b: 'Integration and licence' },
        { label: 'Real-time transfer', a: 'Instant payments', b: 'Bank and rail access' },
        { label: 'Value-added service', a: 'Reconciliation and analytics beyond processing', b: 'Retention and unit economics' },
      ],
      note: 'Test merchant problem, bank and rail access, licence, integration, pricing, risk, retention and unit economics before scale.',
      takeaway: 'Opportunity is strongest where transaction activity meets unmet merchant need, better infrastructure and convenient experiences.',
    },
  },
  'payments-fintech-m5-14': {
    heading: 'New fintech opportunities start from an unmet merchant need and must pass the same tests',
    intro: 'Cross-border payment, payment automation and merchant retention are alternative places to look for opportunity. Whichever is chosen, test access and economics before scaling.',
    spec: {
      layout: 'pathway', title: '14 Where Are New Fintech Business Opportunities Emerging?', kicker: '',
      trunk: [
        { label: 'Transaction activity', detail: 'Where merchants already transact' },
        { label: 'Unmet merchant need', detail: 'A problem current services leave open' },
      ],
      optionsLabel: 'Emerging opportunity areas — alternatives, not steps',
      options: [
        { label: 'Cross-border payment', detail: 'Paying and getting paid across markets' },
        { label: 'Payment automation', detail: 'Less manual payment work' },
        { label: 'Merchant retention', detail: 'Tools that keep merchants active' },
      ],
      afterLabel: 'Before scaling any of them',
      after: [
        { label: 'Verify access', detail: 'Bank and rail access, licence, integration' },
        { label: 'Prove economics', detail: 'Pricing, risk, retention and unit economics', kind: 'outcome' },
      ],
      takeaway: 'Opportunity is strongest where transaction activity meets unmet merchant need, better infrastructure and convenient experiences.',
    },
  },
  'payments-fintech-m5-15': {
    heading: 'Future positioning combines secure infrastructure, scalable integration, merchant value and sound economics',
    intro: 'Providers invest in architecture, risk, APIs, merchant tools, standards, resilience, retention and profitable transactions. A provider can differentiate with secure processing, flexible APIs and merchant analytics.',
    spec: {
      layout: 'taxonomy', title: '15 How Should Payment Providers Position for Future Competition?', kicker: '',
      root: 'Positioning investments', rootDetail: 'Pursued together, not in sequence',
      groups: [
        { label: 'Secure infrastructure', detail: 'Reliable and protected processing', items: ['Modern architecture', 'AI risk control', 'Operational resilience'] },
        { label: 'Scalable integration', detail: 'Easy to connect and extend', items: ['Developer tool', 'Interoperability'] },
        { label: 'Merchant value', detail: 'Reasons merchants stay', items: ['Merchant service'] },
        { label: 'Sustainable economics', detail: 'Growth that pays', items: ['Profitable growth'] },
      ],
      note: 'Prioritize accountable owners, tested failover, secure systems, partner governance, active cohorts and contribution metrics.',
      takeaway: 'Future advantage combines reliable secure infrastructure, scalable integration, partnerships and sustainable unit economics.',
    },
  },
};
