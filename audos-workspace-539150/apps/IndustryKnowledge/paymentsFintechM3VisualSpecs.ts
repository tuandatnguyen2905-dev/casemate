import type { PaymentsFintechChapterVisual } from './paymentsFintechVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Payments & Fintech Module 03, keyed by visualKind. */
export const PAYMENTS_FINTECH_M3_VISUALS: Record<string, PaymentsFintechChapterVisual> = {
  'payments-fintech-m3-1': {
    heading: 'Payment revenue comes from volume, pricing, payment method and chain position together',
    intro: 'Payment businesses monetize transaction processing, acceptance and merchant services through fixed, variable or subscription pricing. A processor, for example, charges merchants under agreed terms for eligible processed transactions.',
    spec: {
      layout: 'driverTree', title: '01 How Do Payment and Fintech Companies Make Money?', kicker: '',
      root: { label: 'Provider revenue', detail: 'Earned under agreed terms on eligible processed transactions' },
      drivers: [
        { label: 'Chain position', detail: 'Which part of the transaction the provider serves', children: [{ label: 'Merchant acquiring', detail: 'Acceptance and merchant services' }, { label: 'Gateway', detail: 'Connection from checkout to processing' }] },
        { label: 'Pricing', detail: 'Fixed, variable or subscription', children: [{ label: 'Transaction fee', detail: 'Charged per eligible transaction' }, { label: 'Pricing agreement', detail: 'Merchant terms behind the fee' }] },
        { label: 'Volume', detail: 'Eligible transactions actually processed' },
        { label: 'Payment method', detail: 'Different methods carry different economics' },
      ],
      note: 'Define gross and net fee, network and bank cost, settlement, tax, refund, fraud and merchant-support responsibility before counting revenue.',
      takeaway: 'Revenue depends on volume, pricing, payment method and the provider’s chain position.',
    },
  },
  'payments-fintech-m3-2': {
    heading: 'Payment roles differ by which business line they sell and how it is priced',
    intro: 'Wallets, processors, networks and acquirers can earn from processing, facilitation or merchant services. Separate those lines before comparing what each provider earns.',
    spec: {
      layout: 'table', title: '02 How Do Wallets, Processors, Networks, and Acquirers Differ?', kicker: '',
      headers: ['Business line', 'What the provider sells', 'How it is typically priced'],
      rows: [
        { label: 'Payment processing', a: 'Handling eligible transactions for merchants', b: 'Charged under agreed terms per processed transaction' },
        { label: 'Payment facilitation', a: 'Simpler merchant access to payment acceptance', b: 'Fee agreed with each onboarded merchant' },
        { label: 'Merchant service', a: 'Acceptance support, settlement and tools', b: 'Fixed, variable or subscription pricing' },
      ],
      note: 'One provider can hold several lines. Check each role’s actual responsibilities for network and bank cost, refunds, fraud and merchant support.',
      takeaway: 'Revenue depends on the provider’s chain position: identify which business line a wallet, processor, network or acquirer is really paid for.',
    },
  },
  'payments-fintech-m3-3': {
    heading: 'Infrastructure, platform and embedded-finance models bundle different building blocks',
    intro: 'Wallet and software ecosystems embed payment functionality into commerce and business workflows, as when an e-commerce platform embeds checkout and seller-payment management.',
    spec: {
      layout: 'taxonomy', title: '03 How Do Infrastructure, Platform, and Embedded-Finance Models Work?', kicker: '',
      root: 'Payment models beyond processing', rootDetail: 'Model types — a provider can combine several',
      groups: [
        { label: 'Infrastructure model', detail: 'Connectivity other businesses build on', items: ['Payment orchestration', 'Financial API'] },
        { label: 'Platform model', detail: 'Engagement and tools around the payment', items: ['Digital wallet', 'Merchant tool', 'Platform partnership'] },
        { label: 'Embedded-finance model', detail: 'Payment and services inside another workflow', items: ['Embedded payment', 'Ancillary service'] },
      ],
      note: 'Separate stored value or credentials, payment service, lending or insurance distribution and technology roles.',
      takeaway: 'Platforms combine payments with engagement, software and complementary services.',
    },
  },
  'payments-fintech-m3-4': {
    heading: 'Each payment product mainly solves a convenience, acceptance, automation or reach need',
    intro: 'Payment methods and infrastructure services are segmented by use case, customer and chain position. Each service has its own rail, consent, refund and licence checks.',
    spec: {
      layout: 'table', title: '04 How Are Payment Products and Services Segmented?', kicker: '',
      headers: ['Product or service', 'Need it mainly solves', 'Verify before offering'],
      rows: [
        { label: 'Digital wallet', a: 'Convenience: stored credentials or value', b: 'Supported rail and refund handling' },
        { label: 'QR payment', a: 'Acceptance: simple payment at the counter', b: 'Authorization and settlement path' },
        { label: 'Gateway', a: 'Automation: online and recurring collection', b: 'Recurring consent where billing repeats' },
        { label: 'Cross-border payment', a: 'Reach: paying across markets', b: 'Licence scope for the service' },
      ],
      note: 'Example: a subscription business uses recurring billing for eligible customer payments under agreed terms.',
      takeaway: 'Different products solve distinct convenience, acceptance and automation needs.',
    },
  },
  'payments-fintech-m3-5': {
    heading: 'Consumers pick a way to pay; merchants need a way to accept and get settled',
    intro: 'Card payments and bank transfers are what consumers use, while acquiring is what lets a merchant accept them and receive funds.',
    spec: {
      layout: 'compare', title: '05 How Do Consumer and Merchant Payment Solutions Differ?', kicker: '',
      leftTitle: 'Consumer payment solution', rightTitle: 'Merchant payment solution',
      rows: [
        { label: 'Example products', a: 'Card payment, bank transfer', b: 'Acquiring that accepts those methods' },
        { label: 'Core need', a: 'A convenient way to pay', b: 'Acceptance and settled funds' },
        { label: 'Recurring payments', a: 'Gives recurring consent', b: 'Runs recurring billing under agreed terms' },
        { label: 'What to verify', a: 'Authorization and refund rights', b: 'Supported rail, settlement and licence scope' },
      ],
      takeaway: 'Different products solve distinct convenience, acceptance and automation needs for each side of the payment.',
    },
  },
  'payments-fintech-m3-6': {
    heading: 'Providers tailor offerings to segments that differ in volume, integration, settlement and risk',
    intro: 'Segments are defined by user type, frequency, value, complexity, operations and exposure. A shop chooses simple QR while a marketplace needs routing, split settlement and reconciliation.',
    spec: {
      layout: 'taxonomy', title: '06 How Do Payment Providers Differentiate Their Offerings?', kicker: '',
      root: 'Customer segments', rootDetail: 'Segments, not stages — match the offering to actual characteristics',
      groups: [
        { label: 'Individuals', detail: 'Everyday paying and transfers', items: ['Consumer'] },
        { label: 'Smaller merchants', detail: 'Simple acceptance such as QR', items: ['Micro-merchant', 'SME'] },
        { label: 'Complex merchants', detail: 'Routing, split settlement, reconciliation', items: ['Large retailer', 'Marketplace', 'Enterprise'] },
        { label: 'Institutions', detail: 'Payment capabilities for other providers', items: ['Financial institution'] },
      ],
      note: 'Match product, onboarding, service, pricing and risk to actual transaction and merchant characteristics.',
      takeaway: 'Needs differ substantially by transaction volume, integration, settlement and risk.',
    },
  },
  'payments-fintech-m3-7': {
    heading: 'Individuals and small businesses want similar simplicity for different reasons',
    intro: 'Core customers need accessible transactions, records, settlement and support. A small shop, for example, accepts QR to reduce cash handling and simplify records.',
    spec: {
      layout: 'compare', title: '07 Who Are the Main Customers of Payment Providers?', kicker: '',
      leftTitle: 'Individual users', rightTitle: 'Small businesses',
      rows: [
        { label: 'Main need', a: 'Easy transfer', b: 'Affordable acceptance' },
        { label: 'Typical method', a: 'QR to pay', b: 'QR to accept and keep records' },
        { label: 'Getting started', a: 'Simple account onboarding', b: 'Simple merchant onboarding with eligibility checks' },
        { label: 'Confidence', a: 'Clear fees, status and scam education', b: 'Clear fees, settlement and support' },
      ],
      takeaway: 'Adoption depends on convenience, acceptance, transparent pricing and confidence in security.',
    },
  },
  'payments-fintech-m3-8': {
    heading: 'Consumer adoption rests on four drivers, not convenience alone',
    intro: 'Consumers adopt a payment method when it is convenient, widely accepted, clearly priced and trusted. Wallet payment, transaction tracking and fast settlement each feed one of these drivers.',
    spec: {
      layout: 'driverTree', title: '08 What Determines Consumer Payment Adoption?', kicker: '',
      root: { label: 'Consumer payment adoption', detail: 'Repeated use, not just sign-up' },
      drivers: [
        { label: 'Convenience', detail: 'Paying is quick and easy', children: [{ label: 'Wallet payment' }, { label: 'Fast settlement' }] },
        { label: 'Acceptance', detail: 'Merchants actually take the method' },
        { label: 'Transparent pricing', detail: 'Clear fees before paying' },
        { label: 'Confidence in security', detail: 'Users can see and trust what happened', children: [{ label: 'Transaction tracking' }, { label: 'Scam education' }] },
      ],
      note: 'Use clear fees, status, scam education, support and accessible interfaces while verifying merchant and customer eligibility.',
      takeaway: 'Adoption depends on convenience, acceptance, transparent pricing and confidence in security.',
    },
  },
  'payments-fintech-m3-9': {
    heading: 'Enterprise payment needs group into integration, money movement, control, reliability and reach',
    intro: 'Complex merchants and institutions need automation, reporting, availability, settlement and market reach. A marketplace, for example, coordinates customer payments, merchant settlement and refunds across sellers.',
    spec: {
      layout: 'taxonomy', title: '09 What Do Merchants and Enterprises Need From Payment Platforms?', kicker: '',
      root: 'Enterprise platform needs', rootDetail: 'Requirements considered together when choosing a platform',
      groups: [
        { label: 'Integration', detail: 'Connect payments to own systems', items: ['Payment API'] },
        { label: 'Money movement', detail: 'Collect and pay out at scale', items: ['Recurring billing', 'Bulk disbursement'] },
        { label: 'Control', detail: 'Match transaction, fee, refund and settlement records', items: ['Reconciliation'] },
        { label: 'Reliability', detail: 'Stay up at high volume', items: ['High availability'] },
        { label: 'Reach', detail: 'Serve customers across markets', items: ['Cross-border', 'Multi-market operation'] },
      ],
      note: 'Define service levels, integration, data, split funds, settlement, operational resilience and incident escalation.',
      takeaway: 'Large customers prioritize scale, integration, control, fraud prevention and high-volume reliability.',
    },
  },
  'payments-fintech-m3-10': {
    heading: 'The merchant’s gross fee is not the provider’s revenue: pass-through amounts come out first',
    intro: 'Move the sliders to see how a hypothetical merchant fee splits into pass-through amounts and the provider’s retained revenue. All values are illustrative, not company or market data.',
    spec: {
      layout: 'scenario', title: '10 How Do Payment Companies Generate Revenue?', kicker: H,
      inputs: [
        { key: 'count', label: 'Eligible card transactions', min: 100, max: 10000, step: 100, value: 1000, unit: 'transactions' },
        { key: 'ticket', label: 'Average transaction value', min: 10, max: 500, step: 10, value: 100, unit: 'currency units' },
        { key: 'mdr', label: 'Gross merchant fee (MDR)', min: 0.5, max: 4, step: 0.1, value: 2, unit: '% of value' },
        { key: 'pass', label: 'Pass-through share (issuer, scheme, partner)', min: 0, max: 95, step: 5, value: 70, unit: '% of fee' },
      ],
      outputs: [
        { label: 'Gross fee paid by merchant', unit: 'currency units', digits: 0, compute: (v) => v.count * v.ticket * v.mdr / 100 },
        { label: 'Passed through to others', unit: 'currency units', digits: 0, compute: (v) => v.count * v.ticket * v.mdr / 100 * v.pass / 100 },
        { label: 'Provider retained revenue', unit: 'currency units', digits: 0, compute: (v) => v.count * v.ticket * v.mdr / 100 * (1 - v.pass / 100) },
        { label: 'Retained revenue per transaction', unit: 'currency units', digits: 2, compute: (v) => v.ticket * v.mdr / 100 * (1 - v.pass / 100) },
      ],
      assumption: `${H}. Illustrative inputs, not market data or a company claim. Mirrors the chapter’s HYPOTHETICAL 1: contractually defined issuer, scheme and acquiring costs are passed through; the processor recognizes only its retained component.`,
      note: 'Disclose basis, taxes, network and bank pass-through, refunds, chargebacks, settlement deductions and partner sharing.',
      takeaway: 'The gross fee paid by a merchant can include pass-through amounts; provider-recognized net revenue is not automatically the full MDR.',
    },
  },
  'payments-fintech-m3-11': {
    heading: 'Payment cost stacks pass-through fees, infrastructure, growth spend, losses and operations',
    intro: 'Processing cost is more than the fee a network charges. In the chapter’s HYPOTHETICAL 2, TPV grows rapidly but incentives, processing expense, fraud losses and customer acquisition consume the retained revenue.',
    spec: {
      layout: 'driverTree', title: '11 What Determines Payment Processing Costs?', kicker: '',
      root: { label: 'Total payment cost', detail: 'Composition varies by rail and provider role' },
      formula: 'Pass-through fees + infrastructure + acquisition and incentives + fraud and disputes + operations',
      drivers: [
        { label: 'Pass-through fees', detail: 'Issuer or network economics where relevant', children: [{ label: 'Interchange' }, { label: 'Scheme fee' }] },
        { label: 'Infrastructure', detail: 'Running the processing stack', children: [{ label: 'Processing infrastructure' }, { label: 'Cloud cost' }] },
        { label: 'Growth spend', detail: 'Winning and keeping users and merchants', children: [{ label: 'Merchant acquisition' }, { label: 'Incentive', detail: 'For example cashback' }] },
        { label: 'Risk losses', children: [{ label: 'Fraud and dispute loss' }] },
        { label: 'Operations', detail: 'Compliance, support, settlement and liquidity needs' },
      ],
      note: 'HYPOTHETICAL 2 contains no figures: it shows how growth in TPV can hide weak profit when these costs consume retained revenue.',
      takeaway: 'Payment cost combines pass-through fees, infrastructure, compliance, acquisition, incentives, fraud, support, settlement and liquidity needs, and its composition varies by rail and provider role.',
    },
  },
  'payments-fintech-m3-12': {
    heading: 'Profitability is driven by retained revenue, success, acquisition and unit cost — not TPV alone',
    intro: 'Each KPI needs an explicit definition. In the chapter’s HYPOTHETICAL 3, volume is unchanged, yet better routing, lower infrastructure expense and stronger merchant retention improve contribution economics.',
    spec: {
      layout: 'driverTree', title: '12 Which KPIs Drive Payment and Fintech Profitability?', kicker: '',
      root: { label: 'Contribution margin', detail: 'Leading to operating margin' },
      formula: 'Retained revenue − cost per transaction × successful transactions − acquisition cost',
      drivers: [
        { label: 'Retained revenue', detail: 'Revenue captured from volume', children: [{ label: 'TPV' }, { label: 'Take rate', detail: 'Stated numerator, denominator and period' }] },
        { label: 'Completed transactions', children: [{ label: 'Transaction count' }, { label: 'Success rate', detail: 'Share of eligible attempts that succeed' }] },
        { label: 'Unit economics', children: [{ label: 'Revenue per transaction' }, { label: 'Cost per transaction', detail: 'Including fraud loss' }] },
        { label: 'Acquisition and retention', children: [{ label: 'CAC' }, { label: 'Retention', detail: 'Lowers replacement acquisition spend' }] },
      ],
      note: 'Reconcile TPV, gross revenue, net revenue, cost per transaction, contribution, cash and profit by cohort and rail.',
      takeaway: 'Profitability depends on retained revenue per relevant volume or transaction, success, acquisition and retention, fraud, cost per transaction and operating leverage, not TPV alone.',
    },
  },
  'payments-fintech-m3-13': {
    heading: 'Every acquisition channel must lead to a first successful transaction and repeat use',
    intro: 'Website, inside sales and referral bring people in, but growth only counts once users activate. A wallet app, for example, guides eligible users to a first successful transaction.',
    spec: {
      layout: 'pathway', title: '13 How Do Payment Providers Acquire Consumers and Merchants?', kicker: '',
      trunk: [{ label: 'Target consumer or merchant', detail: 'Eligible prospect to acquire' }],
      optionsLabel: 'Acquisition channels — alternatives, not steps',
      options: [
        { label: 'Website', detail: 'Direct digital sign-up' },
        { label: 'Inside sales', detail: 'Remote sales to merchants' },
        { label: 'Referral', detail: 'Existing users invite others' },
      ],
      afterLabel: 'What every channel must achieve',
      after: [
        { label: 'Self-service onboarding', detail: 'Register and verify' },
        { label: 'First successful transaction' },
        { label: 'Repeat use', detail: 'Frequency and retention', kind: 'outcome' },
      ],
      note: 'Track verified account, active user, first transaction, frequency, retention, fraud and acquisition cost separately.',
      takeaway: 'Digital acquisition scales only when customers activate and transact repeatedly.',
    },
  },
  'payments-fintech-m3-14': {
    heading: 'Mobile app, field sales and digital marketing reach different customers and need different metrics',
    intro: 'Banks, platforms and partners distribute payment services through direct and digital channels that register, verify, activate, support and retain users and merchants.',
    spec: {
      layout: 'table', title: '14 How Do Banks, Platforms, and Partners Distribute Payment Services?', kicker: '',
      headers: ['Channel', 'Role in distribution', 'Track separately'],
      rows: [
        { label: 'Mobile app', a: 'Users register, verify and pay in one place', b: 'Active users and first transaction' },
        { label: 'Field sales', a: 'Signs up and supports merchants in person', b: 'Activated merchants, not sign-ups' },
        { label: 'Digital marketing', a: 'Builds awareness and drives registrations', b: 'Acquisition cost against retained activity' },
      ],
      note: 'Track verified account, active user, first transaction, frequency, retention, fraud and acquisition cost separately for each channel.',
      takeaway: 'Digital acquisition scales only when customers activate and transact repeatedly, whichever channel brings them in.',
    },
  },
  'payments-fintech-m3-15': {
    heading: 'Embedded distribution grows reach through partners who place payment inside their workflows',
    intro: 'Bank, merchant, software and platform relationships integrate payment and settlement into existing products. Accounting software, for example, lets users collect invoice payments without leaving the product.',
    spec: {
      layout: 'ecosystem', title: '15 How Do Integration, Acceptance, and Retention Affect Growth?', kicker: '',
      center: { label: 'Payment provider', detail: 'Supplies payment and settlement capability' },
      actors: [
        { label: 'Bank partner', relation: 'Accounts and settlement access', flows: ['money', 'service'] },
        { label: 'Merchant partner', relation: 'Accepts payments and drives retention', flows: ['money', 'product'] },
        { label: 'E-commerce plugin', relation: 'Puts checkout into online stores', flows: ['product'] },
        { label: 'Software integration', relation: 'Embeds payment in business software', flows: ['information', 'product'] },
        { label: 'Platform API', relation: 'Lets platforms call payment functions', flows: ['information'] },
      ],
      note: 'Agree revenue share and customer ownership up front, along with onboarding, data, funds, settlement, support, disputes and incentives.',
      takeaway: 'Embedded distribution expands reach by placing payment inside existing workflows.',
    },
  },
  'payments-fintech-m3-16': {
    heading: 'Four participants each bring a distinct capability to one payment',
    intro: 'Payment transactions run on commercial and technical relationships. A wallet, for example, works with banks and infrastructure providers for eligible payments.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Payments & Fintech Ecosystem?', kicker: '',
      center: { label: 'Payment transaction', detail: 'Executed and served by several participants' },
      actors: [
        { label: 'Issuing bank', relation: 'Account: provides the payer’s account or instrument', flows: ['money', 'risk'] },
        { label: 'Network', relation: 'Routing between participants', flows: ['information'] },
        { label: 'Gateway', relation: 'Interface from checkout to processing', flows: ['information', 'service'] },
        { label: 'Payment facilitator', relation: 'Acceptance for onboarded merchants', flows: ['service', 'money'] },
      ],
      note: 'Map transaction and funds responsibilities, contracts, fees, dependencies, data and service levels for each participant.',
      takeaway: 'Participants provide distinct account, routing, processing, acceptance and interface capabilities.',
    },
  },
  'payments-fintech-m3-17': {
    heading: 'Collaboration works when each partner’s capability and responsibility is written down',
    intro: 'Banks, fintechs and networks combine their capabilities to serve one payment. Map what each contributes and what the contract must settle.',
    spec: {
      layout: 'table', title: '17 How Do Banks, Fintechs, and Payment Networks Collaborate?', kicker: '',
      headers: ['Participant', 'Capability contributed', 'Agree in the contract'],
      rows: [
        { label: 'Wallet', a: 'Customer interface for eligible payments', b: 'Data and service levels' },
        { label: 'Processor', a: 'Transaction processing', b: 'Fees and technical dependencies' },
        { label: 'Payment network', a: 'Routing between participants', b: 'Network fees and rules' },
        { label: 'Acquiring bank', a: 'Merchant acceptance and funds', b: 'Funds responsibility and settlement' },
      ],
      note: 'Example: a wallet works with banks and infrastructure providers for eligible payments.',
      takeaway: 'Participants provide distinct account, routing, processing, acceptance and interface capabilities, so collaboration depends on clearly mapped responsibilities.',
    },
  },
  'payments-fintech-m3-18': {
    heading: 'Oversight, shared rules and trust controls frame every industry relationship',
    intro: 'Institutions and standards govern market participation, security, settlement, financial crime, data and disputes. A provider completes required security and compliance controls before launch.',
    spec: {
      layout: 'taxonomy', title: '18 How Do Regulation, Technology, and Trust Shape Industry Relationships?', kicker: '',
      root: 'What governs payment relationships', rootDetail: 'Control categories — verify current duties for each role',
      groups: [
        { label: 'Public oversight', detail: 'Who sets and supervises participation', items: ['Central bank', 'Payment regulator'] },
        { label: 'Shared rules and standards', detail: 'What makes systems interoperate', items: ['Network rule', 'Technical standard'] },
        { label: 'Trust controls', detail: 'What protects integrity and users', items: ['AML control', 'Data protection', 'Dispute management'] },
      ],
      note: 'Verify current licence, settlement, AML, cyber, data, incident and consumer obligations for each role and service.',
      takeaway: 'Oversight and shared standards support interoperability, integrity, resilience and confidence.',
    },
  },
};
