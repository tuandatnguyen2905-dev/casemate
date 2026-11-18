import type { LifeInsuranceChapterVisual } from './lifeInsuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Life Insurance Module 02, keyed by visualKind. */
export const LIFE_INSURANCE_M2_VISUALS: Record<string, LifeInsuranceChapterVisual> = {
  'life-insurance-m2-1': {
    heading: 'A policy moves from protection need to benefit settlement',
    intro: 'The lifecycle runs from need analysis and actuarial pricing through distribution and issuance to premiums, servicing and claims. Responsibility must be clear at every stage.',
    spec: {
      layout: 'flow', title: '01 How Does the Life Insurance Policy Lifecycle Work?', kicker: '',
      steps: [
        { label: 'Need analysis', detail: 'Identify the protection need', owner: 'Distributor' },
        { label: 'Actuarial pricing', detail: 'Product designed and premiums set', owner: 'Insurer' },
        { label: 'Distribution and issuance', detail: 'Sale completed and contract evidenced', owner: 'Distributor and insurer' },
        { label: 'Premiums and servicing', detail: 'Recurring premiums keep coverage active', owner: 'Policyholder and insurer' },
        { label: 'Claims', detail: 'Benefit settled under the terms', kind: 'outcome', owner: 'Insurer' },
      ],
      note: 'Example: a customer buys term coverage, pays recurring premiums and remains protected during the agreed term.',
      takeaway: 'The value chain integrates risk assessment, long-term financial management, distribution and continuing policyholder relationships.',
    },
  },
  'life-insurance-m2-2': {
    heading: 'Product development, underwriting and servicing are separate jobs with separate owners',
    intro: 'Within the value chain, different participants design the product, assess each risk and look after the policy afterwards. Each produces different evidence.',
    spec: {
      layout: 'table', title: '02 Who Participates in the Life Insurance Value Chain?', kicker: '',
      headers: ['Activity', 'Who carries it out', 'What it produces'],
      rows: [
        { label: 'Product development', a: 'Insurer product and actuarial teams', b: 'Benefits, pricing and policy conditions' },
        { label: 'Underwriting', a: 'Underwriters using permitted information', b: 'Risk, eligibility and terms decision' },
        { label: 'Policy servicing', a: 'Insurer, with distributor support', b: 'Premium status, active coverage and service records' },
      ],
      note: 'Map insurer and distributor responsibility, contract evidence and claims at every stage.',
      takeaway: 'The value chain integrates risk assessment, long-term financial management, distribution and continuing policyholder relationships through distinct roles.',
    },
  },
  'life-insurance-m2-3': {
    heading: 'Money, risk, service and oversight all flow through the insurer',
    intro: 'Risk carriers, distributors, providers, customers and supervisors each contribute something different. A reinsurer, for example, assumes a defined share of exposure to help the primary insurer manage concentration.',
    spec: {
      layout: 'ecosystem', title: '03 How Do Operational, Financial, and Risk Flows Interact?', kicker: '',
      center: { label: 'Insurer', detail: 'Underwrites, administers, invests and settles claims' },
      actors: [
        { label: 'Policyholder', relation: 'Pays premiums and holds contractual rights', flows: ['money', 'service'] },
        { label: 'Reinsurer', relation: 'Assumes a defined share of exposure', flows: ['risk', 'money'] },
        { label: 'Agent', relation: 'Advises and distributes', flows: ['product', 'information'] },
        { label: 'Bank', relation: 'Provides customer access', flows: ['product', 'money'] },
        { label: 'Technology vendor', relation: 'Supplies administration systems', flows: ['information', 'service'] },
        { label: 'Regulator', relation: 'Supervises conduct and solvency', flows: ['oversight'] },
      ],
      note: 'Clarify who underwrites, distributes, advises, administers, invests, reinsures, services and settles claims.',
      takeaway: 'Value depends on effective coordination among risk carriers, distributors, providers, customers and supervisors.',
    },
  },
  'life-insurance-m2-4': {
    heading: 'Four financial resources stand behind every product’s long-term promise',
    intro: 'Product design only works if future obligations can be met. Reserves, investment assets, shareholder capital and reinsurance each support that capacity in a different way.',
    spec: {
      layout: 'driverTree', title: '04 How Do Actuarial Assumptions and Product Design Work?', kicker: '',
      root: { label: 'Capacity to meet future obligations', detail: 'What the product design relies on' },
      drivers: [
        { label: 'Reserve', detail: 'Liability set for future policy obligations', children: [{ label: 'Actuarial basis' }, { label: 'Accounting basis' }] },
        { label: 'Investment asset', detail: 'Assets backing the obligations', children: [{ label: 'Investment risk' }] },
        { label: 'Shareholder capital', detail: 'Disciplined capital buffer', children: [{ label: 'Solvency treatment' }] },
        { label: 'Reinsurance', detail: 'Defined risk transferred', children: [{ label: 'Large or concentrated risks' }, { label: 'Insurer keeps responsibility' }] },
      ],
      takeaway: 'Long-term liabilities require disciplined capital, investment and risk-transfer capacity behind each product design.',
    },
  },
  'life-insurance-m2-5': {
    heading: 'Premium inflows must be matched to obligations before solvency can be confirmed',
    intro: 'Premiums fund future contractual obligations only when assets and liabilities are managed together across timing, cash flow, risk and capital.',
    spec: {
      layout: 'flow', title: '05 How Are Premiums Priced and Risks Reinsured?', kicker: '',
      steps: [
        { label: 'Premium inflow', detail: 'Collected under the policy terms', owner: 'Insurer' },
        { label: 'Reinsurance placed', detail: 'Defined mortality exposure transferred', owner: 'Reinsurer' },
        { label: 'Asset-liability management', detail: 'Assets aligned to liability timing and cash flow', owner: 'Insurer' },
        { label: 'Solvency check', detail: 'Capacity measured against regulatory requirements', kind: 'decision' },
        { label: 'Obligations met', detail: 'Benefits paid when due', kind: 'outcome' },
      ],
      note: 'The insurer retains responsibility to policyholders even after reinsuring.',
      takeaway: 'Long-term liabilities require disciplined capital, investment and risk-transfer capacity, coordinated through solvency and asset-liability management.',
    },
  },
  'life-insurance-m2-6': {
    heading: 'The data behind pricing and reserves comes from experience, applicants, models and systems',
    intro: 'Actuaries combine mortality, expense, lapse and investment assumptions to estimate premiums and liabilities. Every data source needs documented population, period, validation and access controls.',
    spec: {
      layout: 'taxonomy', title: '06 How Do Capital, Investments, and ALM Support Product Design?', kicker: '',
      root: 'Data and models behind product design', rootDetail: 'Categories of evidence, used together',
      groups: [
        { label: 'Experience data', items: ['Mortality table', 'Morbidity data', 'Claims history'] },
        { label: 'Applicant evidence', items: ['Medical information'] },
        { label: 'Actuarial models', detail: 'Assumptions converting data into premiums and liabilities', items: ['Actuarial assumption'] },
        { label: 'Systems and controls', items: ['Policy system', 'Data security'] },
      ],
      note: 'Global tables require local suitability testing; document source, population, period, validation, access and privacy.',
      takeaway: 'Reliable data and actuarial models support pricing, underwriting, reserves and financial forecasting.',
    },
  },
  'life-insurance-m2-7': {
    heading: 'Underwriting evidence decides benefits, exclusions and premium terms',
    intro: 'Age, health disclosure and requested sum assured influence the underwriting decision. The outcome sets the policy benefit, any exclusion and the premium.',
    spec: {
      layout: 'decision', title: '07 How Are Applications and Underwriting Decisions Made?', kicker: '',
      root: { label: 'Completed application', detail: 'Age, health disclosure and requested sum assured' },
      question: 'How does the evidence place the applicant in a risk classification?',
      branches: [
        { condition: 'Standard risk', outcome: 'Accept on standard terms', detail: 'Full policy benefit at the standard premium', tone: 'positive' },
        { condition: 'Higher risk', outcome: 'Adjust premium or add exclusion', detail: 'Terms reflect the assessed risk', tone: 'caution' },
        { condition: 'Outside eligibility', outcome: 'Do not offer cover', detail: 'Eligibility criteria not met', tone: 'negative' },
      ],
      note: 'Separate guaranteed and non-guaranteed features and align medical and financial underwriting requirements.',
      takeaway: 'Product competitiveness balances affordability, adequate coverage, risk selection and long-term profitability.',
    },
  },
  'life-insurance-m2-8': {
    heading: 'Coverage term, riders and surrender provisions shape what an issued policy delivers',
    intro: 'Customer needs and actuarial evidence are translated into contract features. Each feature must be explained before the policy is issued.',
    spec: {
      layout: 'table', title: '08 How Are Policies Issued and Premiums Administered?', kicker: '',
      headers: ['Contract feature', 'What it sets', 'What to explain'],
      rows: [
        { label: 'Coverage term', a: 'How long protection lasts', b: 'Start, end and renewal conditions' },
        { label: 'Rider', a: 'An added benefit on the base policy', b: 'Its own premium, eligibility and exclusions' },
        { label: 'Surrender provision', a: 'What happens if the policy ends early', b: 'Surrender value, guaranteed and non-guaranteed parts' },
      ],
      takeaway: 'Product competitiveness balances affordability, adequate coverage, risk selection and long-term profitability through each contract feature.',
    },
  },
  'life-insurance-m2-9': {
    heading: 'Seven onboarding steps turn a proposal into an active contract',
    intro: 'Review and approval convert a proposal into an active contract with accepted terms and evidence. An eligible policy can be issued electronically once identity, disclosure and underwriting are complete.',
    spec: {
      layout: 'flow', title: '09 How Are Policies Serviced and Operational Risks Controlled?', kicker: '',
      steps: [
        { label: 'Application', detail: 'Proposal submitted with consent' },
        { label: 'Identity verification', detail: 'Applicant identity confirmed' },
        { label: 'Disclosure', detail: 'Accurate health and personal information' },
        { label: 'Medical assessment', detail: 'Where the product requires it' },
        { label: 'Underwriting decision', detail: 'Terms accepted or declined', kind: 'decision', owner: 'Underwriter' },
        { label: 'Electronic signature', detail: 'Valid electronic evidence kept' },
        { label: 'Policy delivery', detail: 'Free-look and customer rights begin', kind: 'outcome' },
      ],
      note: 'Fraud control and suitability must be preserved even when onboarding is fast.',
      takeaway: 'Efficient onboarding must preserve accurate disclosure, verification, fraud control and suitability.',
    },
  },
  'life-insurance-m2-10': {
    heading: 'Reminders, accurate collection and easy amendments keep policies in force',
    intro: 'Administration continues long after issuance. A portal can send premium reminders and enable eligible policy updates, which supports retention.',
    spec: {
      layout: 'driverTree', title: '10 How Are Claims Submitted, Assessed, and Paid?', kicker: '',
      root: { label: 'Retention', detail: 'Policies that stay active and effective' },
      drivers: [
        { label: 'Reminder', detail: 'Prompts before premiums fall due', children: [{ label: 'Portal notices' }] },
        { label: 'Premium collection', detail: 'Payments recorded accurately', children: [{ label: 'Premium allocation' }, { label: 'Coverage status' }] },
        { label: 'Policy amendment', detail: 'Eligible changes made easily', children: [{ label: 'Information updates' }, { label: 'Request records' }] },
      ],
      takeaway: 'High-quality servicing supports satisfaction, trust, policy effectiveness and persistency.',
    },
  },
  'life-insurance-m2-11': {
    heading: 'Three kinds of service request sustain the relationship after sale',
    intro: 'Persistency depends on ongoing support. Beneficiary updates, renewals and customer enquiries each need accurate records and clear communication.',
    spec: {
      layout: 'taxonomy', title: '11 How Do Customer Service, Renewal, and Persistency Work?', kicker: '',
      root: 'Service requests after issuance', rootDetail: 'Request types, not a sequence',
      groups: [
        { label: 'Beneficiary update', detail: 'Keep the designated beneficiary current and consented' },
        { label: 'Renewal', detail: 'Continue coverage where the terms allow' },
        { label: 'Customer enquiry', detail: 'Answer questions and record correspondence and complaints' },
      ],
      note: 'Keep coverage status, beneficiary, correspondence, consent, request and complaint records accurate.',
      takeaway: 'High-quality servicing supports satisfaction, trust, policy effectiveness and persistency.',
    },
  },
  'life-insurance-m2-12': {
    heading: 'Every claim follows one review path, then ends in payment or dispute',
    intro: 'Death, maturity and other eligible claims are received, assessed, communicated and settled. A beneficiary submits the required documents for assessment against the policy terms.',
    spec: {
      layout: 'pathway', title: '12 How Do Surrender, Lapse, Complaints, and Disputes Work?', kicker: '',
      trunk: [
        { label: 'Claim notification', detail: 'Beneficiary reports the event' },
        { label: 'Document review', detail: 'Required documents checked' },
        { label: 'Beneficiary verification', detail: 'Right person confirmed' },
        { label: 'Eligibility assessment', detail: 'Tested against policy terms' },
        { label: 'Fraud control', detail: 'Suspicious claims examined' },
      ],
      optionsLabel: 'Possible outcomes — alternatives, not steps',
      options: [
        { label: 'Benefit payment', detail: 'Valid benefit paid under current rules' },
        { label: 'Dispute resolution', detail: 'Reasons communicated and disagreement resolved' },
      ],
      note: 'Communicate requirements and reasons clearly, protect sensitive data and manage conflicts.',
      takeaway: 'Claims performance is the defining test of whether promised protection is delivered.',
    },
  },
  'life-insurance-m2-13': {
    heading: 'Capital, actuarial data and technology are converted into a settled claim',
    intro: 'Operations turn financial resources, risk information and expertise into coverage and service. Digital onboarding can speed processing while controls preserve decision quality.',
    spec: {
      layout: 'flow', title: '13 How Do Premiums, Liabilities, Claims, and Benefits Flow?', kicker: '',
      steps: [
        { label: 'Capital and actuarial data', detail: 'Resources and risk information committed', owner: 'Inputs' },
        { label: 'Technology-enabled onboarding', detail: 'Faster processing with controls', owner: 'Operations' },
        { label: 'Active policy and premium', detail: 'Issued terms and premiums reconciled', owner: 'Operations' },
        { label: 'Servicing', detail: 'Policy value and records maintained', owner: 'Operations' },
        { label: 'Claim settled', detail: 'Benefit paid and recorded', kind: 'outcome', owner: 'Output' },
      ],
      note: 'Reconcile proposal, issued terms, premium, in-force status, policy value, service, claim and benefit records.',
      takeaway: 'Operating performance converts financial resources, risk information and expertise into reliable coverage and service.',
    },
  },
  'life-insurance-m2-14': {
    heading: 'Distribution, issued policies and premiums are separate records of value',
    intro: 'A sale, an issued policy and a premium each prove something different. Treating them as one figure hides where value is created or lost.',
    spec: {
      layout: 'table', title: '14 How Do Costs, Distribution Expenses, and Investment Assets Shape Value?', kicker: '',
      headers: ['Record', 'What it confirms', 'What it does not prove'],
      rows: [
        { label: 'Distribution', a: 'A customer was reached and applied', b: 'That a policy was issued' },
        { label: 'Policy issued', a: 'Terms accepted and contract active', b: 'That premiums were collected' },
        { label: 'Premium', a: 'Amount due to maintain coverage', b: 'Cash collected or profit' },
      ],
      note: 'Proposals, applications, issued policies, premiums, active coverage, revenue, cash and profit are not interchangeable.',
      takeaway: 'Operating performance converts financial resources, risk information and expertise into reliable coverage, and each record measures a different step of it.',
    },
  },
  'life-insurance-m2-15': {
    heading: 'Insurer value decomposes into growth, profitability, resilience and policyholder outcomes',
    intro: 'Premium growth alone does not show value. Performance must be measured across products, cohorts and policy durations, with capital, persistency, claims and expenses included.',
    spec: {
      layout: 'driverTree', title: '15 How Do Capital and Long-Term Policyholder Outcomes Create Value?', kicker: '',
      root: { label: 'Long-term insurer value', detail: 'Defined on a stated metric and basis' },
      drivers: [
        { label: 'Growth', detail: 'New business written', children: [{ label: 'Premium growth' }, { label: 'New business value' }] },
        { label: 'Economics', detail: 'Cost of running the book', children: [{ label: 'Expense ratio' }, { label: 'Profitability' }] },
        { label: 'Resilience', detail: 'Capacity to meet obligations', children: [{ label: 'Solvency' }] },
        { label: 'Policyholder outcomes', detail: 'Promises kept over time', children: [{ label: 'Persistency' }, { label: 'Claims performance' }] },
      ],
      note: 'New business value is an actuarial estimate under stated assumptions, not cash profit.',
      takeaway: 'Premium growth alone does not show value; capital, persistency, claims, expense and profitability also matter.',
    },
  },
  'life-insurance-m2-16': {
    heading: 'A group supplies shared capabilities to a local subsidiary that keeps local authority',
    intro: 'Global methods, technology, expertise and investments support subsidiaries across markets. An international group can apply common risk governance while localizing products and administration.',
    spec: {
      layout: 'ecosystem', title: '16 How Do Global Life Insurer Operating Models Work?', kicker: '',
      center: { label: 'Local subsidiary', detail: 'Local board keeps product responsibility' },
      actors: [
        { label: 'Group risk framework', relation: 'Common risk governance', flows: ['oversight'] },
        { label: 'Actuarial method', relation: 'Shared modelling approach', flows: ['information'] },
        { label: 'Service centre', relation: 'Outsourced administration support', flows: ['service'] },
        { label: 'Investment capability', relation: 'Group investment expertise', flows: ['money'] },
        { label: 'Local regulator', relation: 'Review and regulator access', flows: ['oversight'] },
      ],
      note: 'Define local board and management authority, data transfer, outsourcing, review and regulator access.',
      takeaway: 'Shared capability improves consistency only when local rules and customer needs remain decisive.',
    },
  },
  'life-insurance-m2-17': {
    heading: 'When a Vietnam subsidiary should use a shared group capability',
    intro: 'Shared platforms, data governance and global reinsurance can add consistency. Each use must keep local authority, data rules and regulator access intact.',
    spec: {
      layout: 'decision', title: '17 How Does Vietnam’s Life Insurance Value Chain Operate?', kicker: '',
      root: { label: 'Group capability offered locally', detail: 'Shared platform or global reinsurance' },
      question: 'Do local rules, management authority and customer needs remain decisive?',
      branches: [
        { condition: 'Local authority preserved', outcome: 'Use the shared platform', detail: 'With local review and regulator access', tone: 'positive' },
        { condition: 'Data transfer required', outcome: 'Proceed only under data governance', detail: 'Define data transfer and consent', tone: 'caution' },
        { condition: 'Local accountability weakened', outcome: 'Keep the capability local', detail: 'Product responsibility stays with the local board', tone: 'negative' },
      ],
      note: 'Global reinsurance can support local risk while the local insurer retains policyholder responsibility.',
      takeaway: 'Shared capability improves consistency only when local rules and customer needs remain decisive.',
    },
  },
  'life-insurance-m2-18': {
    heading: 'What changes when a global model is adapted to Vietnam',
    intro: 'Insurance models cannot transfer unchanged. A Vietnam insurer may adapt premium frequency and bank partnerships to local customer access and cash flow.',
    spec: {
      layout: 'compare', title: '18 How Do Distribution, Reinsurance, Regulation, and Local Needs Differ?', kicker: '',
      leftTitle: 'Model as designed elsewhere', rightTitle: 'Adapted for local customers',
      rows: [
        { label: 'Local regulation', a: 'Home-market product rules', b: 'Local approval and conduct rules' },
        { label: 'Demographics', a: 'Benefits built for another population', b: 'Benefit relevance tested locally' },
        { label: 'Healthcare access', a: 'Assumed medical evidence', b: 'Evidence customers can actually obtain' },
        { label: 'Household income', a: 'Standard premium frequency', b: 'Premium frequency fitted to cash flow' },
        { label: 'Payment method', a: 'Home-market payment channels', b: 'Local payment and bank partnerships' },
        { label: 'Language', a: 'Documents in the group language', b: 'Explanations customers understand' },
        { label: 'Claims requirement', a: 'Imported claims process', b: 'Process tested with real customers' },
      ],
      takeaway: 'Insurance models cannot transfer unchanged because regulation, affordability, health systems and trust differ.',
    },
  },
};
