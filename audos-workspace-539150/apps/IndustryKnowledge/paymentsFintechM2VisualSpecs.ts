import type { PaymentsFintechChapterVisual } from './paymentsFintechVisualSpecs';

/** Chapter-specific Learning Visuals for Payments & Fintech Module 02, keyed by visualKind. */
export const PAYMENTS_FINTECH_M2_VISUALS: Record<string, PaymentsFintechChapterVisual> = {
  'payments-fintech-m2-1': {
    heading: 'A payment moves from initiation through routing and clearing to reconciliation',
    intro: 'The value chain is the set of stages through which payment data, instructions and funds move from request to completed and reconciled settlement. An online card payment passes through several participants on the way.',
    spec: {
      layout: 'flow', title: '01 How Does the Digital Payments Value Chain Work?', kicker: '',
      steps: [
        { label: 'Payment initiation', detail: 'An authorized user or service submits the instruction', owner: 'Customer or service' },
        { label: 'Routing', detail: 'The request is sent to the right rail and institution', owner: 'Processor or switch' },
        { label: 'Clearing', detail: 'Transmission, validation and calculation of obligations', owner: 'Network or clearing system' },
        { label: 'Settlement', detail: 'Funds transfer under system rules', owner: 'Settling institutions' },
        { label: 'Reconciliation', detail: 'Transaction, fee, refund and settlement records matched', kind: 'outcome', owner: 'Merchant and provider' },
      ],
      note: 'For each flow, identify the payment rail, stage, issuer, acquirer, processor, switch, settlement and exception responsibility.',
      takeaway: 'Transactions depend on coordinated infrastructure connecting customers, merchants, institutions, networks and providers.',
    },
  },
  'payments-fintech-m2-2': {
    heading: 'Authentication, authorisation and settlement are each decided by a different participant',
    intro: 'An online card payment triggers authentication, authorization, processing, clearing and settlement among participants. Knowing who performs each stage shows who is responsible when it fails.',
    spec: {
      layout: 'table', title: '02 Who Participates in a Payment Transaction?', kicker: '',
      headers: ['Stage', 'What happens', 'Who is responsible'],
      rows: [
        { label: 'Authentication', a: 'Person, device or credential verified', b: 'Customer with issuer or provider' },
        { label: 'Authorisation', a: 'Request approved or declined', b: 'Relevant institution or system' },
        { label: 'Processing and clearing', a: 'Request routed and obligations calculated', b: 'Processor, switch or network' },
        { label: 'Settlement', a: 'Final transfer of funds under system rules', b: 'Settling institutions' },
        { label: 'Exceptions', a: 'Reversals, disputes and failures', b: 'Owner documented per flow' },
      ],
      note: 'Identify payment rail, stage, issuer, acquirer, processor, switch, settlement and exception responsibility for each flow.',
      takeaway: 'Transactions depend on coordinated infrastructure connecting customers, merchants, institutions, networks and providers.',
    },
  },
  'payments-fintech-m2-3': {
    heading: 'Seven participants exchange money, information and oversight around one transaction',
    intro: 'Users and institutions contribute account access, merchant acceptance, routing, security, processing and oversight. A processor connects a merchant interface with acquiring and network infrastructure.',
    spec: {
      layout: 'ecosystem', title: '03 How Do Payment Instructions, Money, and Information Move?', kicker: '',
      center: { label: 'Payment transaction', detail: 'Instruction, funds and data' },
      actors: [
        { label: 'Consumer', relation: 'Initiates payment from an account', flows: ['money', 'information'] },
        { label: 'Merchant', relation: 'Accepts payment for goods or services', flows: ['product', 'money'] },
        { label: 'Issuer', relation: 'Provides the account and authorizes use', flows: ['money', 'information'] },
        { label: 'Acquirer', relation: 'Enables acceptance and receives settlement', flows: ['money'] },
        { label: 'Network', relation: 'Routes messages between institutions', flows: ['information'] },
        { label: 'Processor', relation: 'Connects merchant interface to acquiring', flows: ['information', 'service'] },
        { label: 'Regulator', relation: 'Oversees participants and services', flows: ['oversight'] },
      ],
      note: 'Document participant roles, funds custody, fees, data, disputes and liability rather than referring to a generic provider.',
      takeaway: 'Value depends on interoperability, reliability, acceptance, efficient settlement and coordinated accountability.',
    },
  },
  'payments-fintech-m2-4': {
    heading: 'Infrastructure access is built step by step: participation, connection, switching, settlement',
    intro: 'Payment infrastructure is the institutional and technical relationships connecting providers with banking, network, clearing and settlement mechanisms. A provider integrates eligible banking infrastructure for electronic transfers.',
    spec: {
      layout: 'flow', title: '04 How Is Payment Infrastructure Built and Operated?', kicker: '',
      steps: [
        { label: 'Confirm participation', detail: 'Eligibility and current license requirements', owner: 'Provider' },
        { label: 'Bank connection', detail: 'Certified connectivity to banking infrastructure', owner: 'Provider and bank' },
        { label: 'Payment switch', detail: 'Messages exchanged with other participants', owner: 'Switch operator' },
        { label: 'Settlement account', detail: 'Funds and liquidity for settlement', owner: 'Settlement bank' },
        { label: 'Interoperability', detail: 'Systems exchange payment information reliably', kind: 'outcome' },
      ],
      loop: 'Contingency arrangements keep the connection running when a component fails.',
      note: 'Confirm participation, certification, connectivity, settlement, liquidity, contingency and current license requirements.',
      takeaway: 'Reliable infrastructure access determines transaction reach, continuity and movement of funds.',
    },
  },
  'payments-fintech-m2-5': {
    heading: 'Banks, card networks, clearing systems and technology providers each supply a different link',
    intro: 'Providers depend on relationships with banking, network, clearing and settlement mechanisms. Each link has its own participation, certification and liquidity checks.',
    spec: {
      layout: 'table', title: '05 What Roles Do Banks, Networks, and Technology Providers Play?', kicker: '',
      headers: ['Participant', 'Role in the infrastructure', 'What to confirm'],
      rows: [
        { label: 'Banks', a: 'Eligible infrastructure for transfers', b: 'Settlement and liquidity' },
        { label: 'Card network', a: 'Connects institutions for card payments', b: 'Participation and certification' },
        { label: 'Clearing system', a: 'Clearing and settlement mechanisms', b: 'Connectivity and contingency' },
        { label: 'Technology providers', a: 'Integrate providers with the rails', b: 'Current license requirements' },
      ],
      note: 'Liquidity is needed so settlement can complete when obligations fall due.',
      takeaway: 'Reliable infrastructure access determines transaction reach, continuity and movement of funds.',
    },
  },
  'payments-fintech-m2-6': {
    heading: 'Speed, availability and fraud outcomes trace back to four groups of technology choices',
    intro: 'Software, data, connectivity and security are used to build and operate payment services. A gateway API connects merchant checkout with supported methods and processors.',
    spec: {
      layout: 'driverTree', title: '06 What Are the Core Costs and Risks of Payment Infrastructure?', kicker: '',
      root: { label: 'Technology quality', detail: 'Speed, availability, scale, fraud and experience' },
      drivers: [
        { label: 'Connectivity', detail: 'Links checkout to methods and processors', children: [{ label: 'API' }, { label: 'Cloud infrastructure' }] },
        { label: 'Processing', detail: 'Runs the payment logic', children: [{ label: 'Payment software' }] },
        { label: 'Security', detail: 'Protects users and data', children: [{ label: 'Identity verification' }, { label: 'Encryption' }, { label: 'Transaction monitoring' }] },
        { label: 'Resilience', detail: 'Keeps service available', children: [{ label: 'Redundancy' }] },
      ],
      note: 'Govern architecture, access, tokenization, encryption, logs, availability, incident response, vendors and personal data.',
      takeaway: 'Technology quality directly affects speed, availability, scale, fraud and experience.',
    },
  },
  'payments-fintech-m2-7': {
    heading: 'Authorization ends in an issuer decision: approve, decline or hold',
    intro: 'Authorization covers creation, authentication, routing and the issuer or account-provider decision on a payment request. It comes before clearing and settlement.',
    spec: {
      layout: 'flow', title: '07 How Does Payment Authorization Work?', kicker: '',
      steps: [
        { label: 'Payment initiation', detail: 'Instruction created and submitted', owner: 'Customer or service' },
        { label: 'Authentication', detail: 'Person, device or credential verified', owner: 'Issuer or provider' },
        { label: 'Authorization request', detail: 'Routed to the account provider', owner: 'Processor or network' },
        { label: 'Issuer decision', detail: 'Checks the request at a defined moment', kind: 'decision', owner: 'Issuer or account provider' },
        { label: 'Approval, decline or hold', detail: 'Approval is not yet settlement', kind: 'outcome' },
      ],
      note: 'A card purchase can be authorized at checkout and later reversed, cleared for a different final amount or fail before settlement.',
      takeaway: 'Authorization is an approval decision at a defined moment; it does not by itself mean clearing occurred or final funds settlement completed.',
    },
  },
  'payments-fintech-m2-8': {
    heading: 'After authorization, records are cleared, obligations netted, funds settled and payouts reconciled',
    intro: 'Clearing exchanges transaction records and calculates participant obligations; settlement moves funds. A card network clears records before institutions settle and the acquirer reconciles the merchant payout.',
    spec: {
      layout: 'flow', title: '08 How Do Clearing and Settlement Work?', kicker: '',
      steps: [
        { label: 'Transaction capture', detail: 'Authorized transactions recorded', owner: 'Acquirer' },
        { label: 'Clearing message', detail: 'Records exchanged and validated', owner: 'Card network' },
        { label: 'Net obligation', detail: 'What each participant owes is calculated', owner: 'Card network' },
        { label: 'Funds transfer', detail: 'Moved through settlement accounts', owner: 'Institutions' },
        { label: 'Finality', detail: 'Obligations discharged under system rules', kind: 'decision' },
        { label: 'Reconciliation', detail: 'Merchant payout matched to records', kind: 'outcome', owner: 'Acquirer' },
      ],
      note: 'Validate supported rail, fees, routing, timeout, retry, duplicate, reversal and user-notification behaviour.',
      takeaway: 'Clearing validates and calculates obligations, while settlement transfers funds or discharges obligations under the relevant system rules.',
    },
  },
  'payments-fintech-m2-9': {
    heading: 'Fraud and dispute prevention starts at onboarding: verify, set up, integrate, test, activate',
    intro: 'Customers and merchants are connected through KYC, KYB, technical configuration, testing and activation. An online merchant integrates and tests an API before accepting live payments.',
    spec: {
      layout: 'pathway', title: '09 How Are Failed Transactions, Fraud, and Disputes Handled?', kicker: '',
      trunk: [
        { label: 'Identity verification', detail: 'KYC on the customer or owner' },
        { label: 'Merchant due diligence', detail: 'KYB, category and prohibited activity' },
        { label: 'Account setup', detail: 'Settlement and data controls configured' },
      ],
      optionsLabel: 'Acceptance set-up — alternatives, not steps',
      options: [
        { label: 'API integration', detail: 'Online checkout' },
        { label: 'Terminal deployment', detail: 'Physical acceptance device' },
      ],
      afterLabel: 'Before live payments',
      after: [
        { label: 'Integration testing', detail: 'Failures caught before going live' },
        { label: 'Activation', detail: 'Live payments accepted', kind: 'outcome' },
      ],
      note: 'Apply current verification, beneficial-owner, merchant-category, prohibited-activity, data and settlement controls.',
      takeaway: 'Simple onboarding accelerates adoption only when verification, compliance and risk remain effective.',
    },
  },
  'payments-fintech-m2-10': {
    heading: 'After go-live, four operating services keep payments reaching merchants and customers',
    intro: 'Post-deployment operations cover transaction status, records, refunds, settlement, reporting, analytics and support. A merchant checks sales, settlement and fees in a dashboard.',
    spec: {
      layout: 'taxonomy', title: '10 How Do Payments Reach Consumers and Merchants?', kicker: '',
      root: 'Post-deployment operations', rootDetail: 'Run in parallel, not in sequence',
      groups: [
        { label: 'Monitoring', detail: 'Transaction status tracked', items: ['Transaction status', 'Records'] },
        { label: 'Refund', detail: 'Money returned to the customer' },
        { label: 'Merchant report', detail: 'Sales, fees and settlement reporting', items: ['Reporting', 'Analytics'] },
        { label: 'Service level', detail: 'Support and availability commitments', items: ['Support'] },
      ],
      note: 'Reconcile transaction IDs, timestamps, gross and net amount, fees, refunds, chargebacks and settlement bank records.',
      takeaway: 'Reliable transaction handling and merchant support sustain business relationships and trust.',
    },
  },
  'payments-fintech-m2-11': {
    heading: 'Merchants reconcile sales down to the settlement bank record, then analyse',
    intro: 'Merchants operate payments by tracking settlement and reconciling records. A merchant reconciles sales against settlement and fee records in a dashboard.',
    spec: {
      layout: 'flow', title: '11 How Do Merchants Integrate and Operate Payment Solutions?', kicker: '',
      steps: [
        { label: 'Sales records', detail: 'Transaction IDs and timestamps', owner: 'Merchant' },
        { label: 'Gross to net', detail: 'Fees, refunds and chargebacks deducted', owner: 'Provider statement' },
        { label: 'Settlement tracking', detail: 'Payouts followed to the settlement bank', owner: 'Merchant and bank' },
        { label: 'Reconciliation', detail: 'Records matched across systems and parties', kind: 'decision' },
        { label: 'Analytics', detail: 'Reconciled data used for decisions', kind: 'outcome' },
      ],
      note: 'Reconcile transaction IDs, timestamps, gross and net amount, fees, refunds, chargebacks and settlement bank records.',
      takeaway: 'Reliable transaction handling and merchant support sustain business relationships and trust.',
    },
  },
  'payments-fintech-m2-12': {
    heading: 'A risk score decides whether a payment proceeds, needs checks or is stopped',
    intro: 'Providers control suspicious activity, unauthorized payments, disputes, financial crime and incidents. An unusual transaction is routed for additional verification before proceeding.',
    spec: {
      layout: 'decision', title: '12 How Do Payment Providers Manage Customer Experience and Support?', kicker: '',
      root: { label: 'Incoming transaction', detail: 'Checked by fraud detection and limits' },
      question: 'What do the risk score and transaction limit indicate?',
      branches: [
        { condition: 'Normal risk', outcome: 'Proceed', detail: 'Legitimate payment succeeds', tone: 'positive' },
        { condition: 'Unusual activity', outcome: 'Additional verification', detail: 'Proceeds only after the check', tone: 'caution' },
        { condition: 'Suspicious or over limit', outcome: 'Stop and escalate', detail: 'AML monitoring and incident response', tone: 'negative' },
      ],
      note: 'Disputed card payments follow the dispute workflow and chargeback rules; keep clear communication and audit trails.',
      takeaway: 'Fraud prevention must balance security with legitimate transaction success.',
    },
  },
  'payments-fintech-m2-13': {
    heading: 'Settled transactions depend on bank connectivity, capital and merchant relationships',
    intro: 'Resources turn into outputs such as processed transactions, payment volume, merchant acceptance and settlement. A provider measures end-to-end success to evaluate processing reliability.',
    spec: {
      layout: 'driverTree', title: '13 What Resources Are Needed to Process Payments?', kicker: '',
      root: { label: 'Settled transaction', detail: 'The output that completes the payment' },
      drivers: [
        { label: 'Bank connectivity', detail: 'Reach to accounts and settlement' },
        { label: 'Capital', detail: 'Funds infrastructure and operations' },
        { label: 'Merchant relationship', detail: 'Brings acceptance and volume' },
        { label: 'End-to-end success', detail: 'Share of requests that settle', children: [{ label: 'Authorized' }, { label: 'Cleared' }, { label: 'Settled' }] },
      ],
      note: 'Define attempted, authenticated, authorized, cleared, settled, reversed and disputed statuses consistently.',
      takeaway: 'Performance converts infrastructure, technology, data and partnerships into reliable financial services.',
    },
  },
  'payments-fintech-m2-14': {
    heading: 'Processing cost sits in software, transaction data and security systems',
    intro: 'Software, transaction data and security systems are the resources consumed to process payments. A provider measures end-to-end success to see whether they deliver reliable processing.',
    spec: {
      layout: 'table', title: '14 Where Are Payment Processing Costs and Fees Generated?', kicker: '',
      headers: ['Cost-generating resource', 'Role in processing', 'Evidence it delivers'],
      rows: [
        { label: 'Software', a: 'Runs requests from attempt to settlement', b: 'End-to-end success' },
        { label: 'Transaction data', a: 'Records every status', b: 'Consistent status definitions' },
        { label: 'Security system', a: 'Authenticates and protects payments', b: 'Authenticated versus attempted' },
      ],
      note: 'Define attempted, authenticated, authorized, cleared, settled, reversed and disputed statuses consistently.',
      takeaway: 'Performance converts infrastructure, technology, data and partnerships into reliable financial services.',
    },
  },
  'payments-fintech-m2-15': {
    heading: 'Commercial value is revenue from volume and take rate, minus acquisition cost and fraud loss',
    intro: 'Providers create value through commercial, transaction, customer, merchant, risk and operational performance. A provider tests whether higher TPV improves contribution after processing cost and pricing changes.',
    spec: {
      layout: 'driverTree', title: '15 How Do Payment Providers Create Commercial Value?', kicker: '',
      root: { label: 'Contribution', detail: 'Value after costs and losses' },
      formula: 'TPV × take rate − processing and acquisition cost − fraud loss',
      drivers: [
        { label: 'Revenue', detail: 'Captured from payment value', children: [{ label: 'Total payment volume' }, { label: 'Take rate' }] },
        { label: 'Reliability', detail: 'Payments that complete', children: [{ label: 'Transaction count' }, { label: 'Success rate' }] },
        { label: 'Processing cost', op: '−', detail: 'Can rise with volume and pricing changes' },
        { label: 'Acquisition cost', op: '−', detail: 'Cost to win customers and merchants' },
        { label: 'Fraud loss', op: '−', detail: 'Losses from fraudulent payments' },
      ],
      note: 'State numerator, denominator, stage, rail, cohort and period for active use, success, fraud, take rate and margin.',
      takeaway: 'Volume alone does not guarantee profit; yield, cost, retention, fraud and reliability matter.',
    },
  },
  'payments-fintech-m2-16': {
    heading: 'An international card payment is processed, routed across networks under their rules, then settled with FX',
    intro: 'Networks, processors, messaging, rules and security connect participants and countries. A network links an international card transaction among participating institutions.',
    spec: {
      layout: 'flow', title: '16 How Do International Payment Networks Operate?', kicker: '',
      steps: [
        { label: 'Card transaction submitted', detail: 'Merchant side sends the request', owner: 'Participating institution' },
        { label: 'Processing', detail: 'Request prepared for the network', owner: 'Global processor' },
        { label: 'International routing', detail: 'Network links the institutions', owner: 'Card network' },
        { label: 'Network rules applied', detail: 'Common rules across systems', kind: 'decision', owner: 'Card network' },
        { label: 'Cross-border settlement', detail: 'FX, cross-border fees and settlement timing', kind: 'outcome', owner: 'Participating institutions' },
      ],
      note: 'Account for FX, cross-border fees, data, sanctions and AML, network rules, domestic requirements and settlement timing.',
      takeaway: 'Global infrastructure provides scale while common standards support transactions across systems.',
    },
  },
  'payments-fintech-m2-17': {
    heading: 'Vietnam connects to global standards such as ISO 20022, but domestic conditions still apply',
    intro: 'Cross-border platforms, shared messaging and security standards connect Vietnam with other systems. FX, fees, data, sanctions, AML, domestic requirements and settlement timing still differ.',
    spec: {
      layout: 'taxonomy', title: "17 How Does Vietnam's Payment Infrastructure Differ?", kicker: '',
      root: 'Vietnam cross-border connection', rootDetail: 'Global standards plus domestic conditions',
      groups: [
        { label: 'Global standards', items: ['ISO 20022', 'Security standard', 'Network rules'] },
        { label: 'Cross-border platform', detail: 'Scale across systems' },
        { label: 'Cross-border economics', items: ['FX', 'Cross-border fees', 'Settlement timing'] },
        { label: 'Domestic conditions', detail: 'Map and verify current duties', items: ['Domestic requirements', 'Data', 'Sanctions and AML'] },
      ],
      note: 'Educational content only; verify current law and service rules.',
      takeaway: 'Global infrastructure provides scale while common standards support transactions across systems.',
    },
  },
  'payments-fintech-m2-18': {
    heading: 'Licensed bank and switch access comes first, then local QR or instant transfer, then local settlement',
    intro: 'Domestic rails, bank connections, standards, settlement and merchant acceptance must fit customer behaviour. A provider integrates supported Vietnam channels for local QR and account transfers.',
    spec: {
      layout: 'pathway', title: '18 How Do Domestic and Cross-Border Payment Flows Connect?', kicker: '',
      trunk: [
        { label: 'Payment license', detail: 'Licensed service scope confirmed' },
        { label: 'Bank connection', detail: 'Participating institutions' },
        { label: 'Domestic switch', detail: 'Domestic rail access' },
      ],
      optionsLabel: 'Local payment methods — alternatives, not steps',
      options: [
        { label: 'QR standard', detail: 'Local QR acceptance' },
        { label: 'Instant transfer', detail: 'Account-to-account payment' },
      ],
      afterLabel: 'Completing locally',
      after: [
        { label: 'Local settlement', detail: 'Under domestic settlement rules' },
        { label: 'Merchant habit', detail: 'Acceptance that fits behaviour', kind: 'outcome' },
      ],
      note: 'Use current domestic specifications, participating institutions, settlement rules, dispute paths and licensed service scope.',
      takeaway: 'Local integration and alignment with regulation and habits determine market participation.',
    },
  },
};
