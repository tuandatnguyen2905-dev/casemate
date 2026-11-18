import type { LifeInsuranceChapterVisual } from './lifeInsuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Life Insurance Module 04, keyed by visualKind. */
export const LIFE_INSURANCE_M4_VISUALS: Record<string, LifeInsuranceChapterVisual> = {
  'life-insurance-m4-1': {
    heading: 'Premium share is one driver of competitive position, read within product and channel scope',
    intro: 'Insurers compete across protection, savings and investment-linked products, segments, channels and advice. Concentration means little unless it is measured within a defined product and channel scope.',
    spec: {
      layout: 'driverTree', title: '01 How Concentrated Is Life Insurance Competition?', kicker: '',
      root: { label: 'Competitive position', detail: 'Within a stated product and channel scope' },
      drivers: [
        { label: 'Premium share', detail: 'Measured for the same products and period', children: [{ label: 'Premium' }, { label: 'Active policies' }] },
        { label: 'Product focus', detail: 'Where the insurer chooses to compete', children: [{ label: 'Savings product' }, { label: 'Accessible protection' }] },
        { label: 'Distribution reach', detail: 'How customers are reached and advised' },
        { label: 'Service quality', detail: 'What keeps policies in force', children: [{ label: 'Persistency' }, { label: 'Claims' }] },
      ],
      note: 'Example: one insurer focuses on accessible protection while another emphasises retirement and wealth planning.',
      takeaway: 'Advantage depends on trust, suitability, financial strength and service—not market share alone.',
    },
  },
  'life-insurance-m4-2': {
    heading: 'Each of the five forces works through protection products, segments and trust',
    intro: 'The Five Forces frame competition across products, segments, channels, affordability and advice. In life insurance, brand trust shapes several forces at once.',
    spec: {
      layout: 'taxonomy', title: '02 How Do Porter’s Five Forces Apply to Life Insurance?', kicker: '',
      root: 'Five forces in life insurance', rootDetail: 'Forces act together, not in sequence',
      groups: [
        { label: 'Rivalry among insurers', detail: 'Competition by protection product and customer segment' },
        { label: 'Threat of new entrants', detail: 'Limited by licensing, financial strength and brand trust' },
        { label: 'Substitutes', detail: 'Other savings or investment choices for the same money' },
        { label: 'Buyer power', detail: 'Customer segments weigh affordability and advice' },
        { label: 'Channel and partner power', detail: 'Distributors control access to customers' },
      ],
      note: 'Compare firms within product and channel scope and keep premium, active policy, coverage, persistency and claim distinctions.',
      takeaway: 'Advantage depends on trust, suitability, financial strength and service—not market share alone.',
    },
  },
  'life-insurance-m4-3': {
    heading: 'Only an entrant able to carry long-term risk can become an insurer',
    intro: 'Market entry and scale need financial, regulatory, actuarial, operational, distribution and reputational capability. Without them a newcomer can only work alongside a licensed insurer.',
    spec: {
      layout: 'decision', title: '03 How Do Licensing, Capital, Distribution, and Trust Create Barriers?', kicker: '',
      root: { label: 'Prospective entrant', detail: 'Product idea or digital interface' },
      question: 'Can it hold a licence, capital and actuarial expertise to carry long-term risk?',
      branches: [
        { condition: 'Licence, capital and actuarial expertise', outcome: 'Enter as a risk carrier', detail: 'Still needs distribution access, core technology and brand credibility', tone: 'positive' },
        { condition: 'Distribution or technology only', outcome: 'Partner with a licensed insurer', detail: 'Acquire leads; the insurer underwrites and issues', tone: 'caution' },
        { condition: 'Neither capability nor credibility', outcome: 'Not a viable entry', detail: 'Long-term risk and trust cannot be skipped', tone: 'negative' },
      ],
      note: 'Example: a digital intermediary acquires leads but needs a licensed insurer to underwrite and issue policies.',
      takeaway: 'Life insurance requires long-term risk and trust capability beyond launching a product or digital interface.',
    },
  },
  'life-insurance-m4-4': {
    heading: 'Insurer types are compared by resources and fit, not by name or rank',
    intro: 'Licensed domestic and foreign-owned insurers compete through portfolios, distribution, financial strength and service. This chapter names no firms: it shows what each resource offers and how to check it.',
    spec: {
      layout: 'table', title: '04 Who Are the Major Global Life Insurers?', kicker: '',
      headers: ['Insurer type or resource', 'What it brings', 'Check before relying on it'],
      rows: [
        { label: 'Domestic insurer', a: 'Local ownership and familiarity with local rules', b: 'Current licence and product range' },
        { label: 'Capital resource', a: 'Financial strength to carry long commitments', b: 'Solvency of the licensed entity itself' },
        { label: 'Agency network', a: 'Advice and relationships at scale', b: 'Sales quality, persistency and complaints' },
        { label: 'Local market knowledge', a: 'Products adapted to local needs and rules', b: 'Evidence of service and claims performance' },
      ],
      note: 'Example: an international group transfers actuarial expertise while adapting products to local rules.',
      takeaway: 'Insurers differ in ownership, resources, products, channels and market experience, but fit is product- and customer-specific.',
    },
  },
  'life-insurance-m4-5': {
    heading: 'A Vietnam insurer is judged as the licensed local entity, not by its parent group',
    intro: 'International groups can contribute product expertise, and bancassurance partners can contribute reach. The customer still deals with the locally licensed insurer.',
    spec: {
      layout: 'ecosystem', title: '05 Who Are the Major Life Insurers in Vietnam?', kicker: '',
      center: { label: 'Licensed insurer in Vietnam', detail: 'Domestic or foreign-owned; named in the policy' },
      actors: [
        { label: 'International group', relation: 'May supply capital and actuarial expertise', flows: ['money', 'information'] },
        { label: 'Bancassurance partner', relation: 'Distributes policies through a bank', flows: ['product', 'money'] },
        { label: 'Policyholders', relation: 'Pay premiums and rely on service and claims', flows: ['money', 'service'] },
        { label: 'Insurance supervisor', relation: 'Licenses and oversees the local entity', flows: ['oversight'] },
      ],
      note: 'Use current licensed-entity, product, premium, active policy, channel and service evidence—not parent-group scale alone.',
      takeaway: 'Insurers differ in ownership, resources, products, channels and market experience, but fit is product- and customer-specific.',
    },
  },
  'life-insurance-m4-6': {
    heading: 'Platforms and technology partners support access but do not carry insurance risk',
    intro: 'Platforms and vendors support comparison, acquisition, onboarding, servicing and analytics under insurer relationships. The licensed insurer remains the risk carrier.',
    spec: {
      layout: 'taxonomy', title: '06 How Do Insurer Portfolios, Channels, and Operating Models Differ?', kicker: '',
      root: 'Technology partners around insurers', rootDetail: 'Types of role — identify each one’s boundary',
      groups: [
        { label: 'Distribution platforms', items: ['Digital broker', 'Comparison platform', 'Embedded insurance'] },
        { label: 'Operational enablers', items: ['Technology intermediary', 'Automated service', 'Analytics'] },
        { label: 'Risk carrier', detail: 'Licensed insurer, linked by an insurer partnership' },
      ],
      note: 'Example: a marketplace compares eligible products issued by licensed insurers. Identify the distributor, advice role, data controller, complaint path and incentive.',
      takeaway: 'Technology providers can improve access and experience without assuming insurance risk.',
    },
  },
  'life-insurance-m4-7': {
    heading: 'Premium and APE figures can be compared only after their reporting bases are aligned',
    intro: 'Benchmarking uses disclosed premium and new-business measures. Mixing parent-group, subsidiary, annualised and accounting bases produces false comparisons.',
    spec: {
      layout: 'decision', title: '07 How Should Premiums, New Business, APE, and Product Mix Be Compared?', kicker: '',
      root: { label: 'Two disclosed measures', detail: 'Premium inflow, new business premium or APE' },
      question: 'Do product mix, reporting period, entity scope, currency and method all match?',
      branches: [
        { condition: 'All aligned', outcome: 'Compare directly', detail: 'State the basis alongside the result', tone: 'positive' },
        { condition: 'Period, currency or method differ', outcome: 'Restate or label as not comparable', detail: 'APE follows each entity’s stated method', tone: 'caution' },
        { condition: 'Entity scope differs', outcome: 'Do not rank', detail: 'Group totals are not subsidiary results', tone: 'negative' },
      ],
      note: 'Example: a global group total cannot be ranked directly against a Vietnam subsidiary’s APE or new-business premium.',
      takeaway: 'Premium, APE and new-business measures are comparable only when product, period, entity, currency and methodology align.',
    },
  },
  'life-insurance-m4-8': {
    heading: 'Each benchmark answers its own question and proves nothing beyond it',
    intro: 'Policy quality, actuarial value, financial resilience and reported performance are compared under each insurer’s stated method. Each measure needs an aligned assumption basis.',
    spec: {
      layout: 'table', title: '08 How Should Persistency, VNB, Solvency, and Profitability Be Compared?', kicker: '',
      headers: ['Measure', 'Question it answers', 'What it does not prove'],
      rows: [
        { label: 'Persistency', a: 'Do policies stay in force at a stated duration?', b: 'Profitability of those policies' },
        { label: 'VNB', a: 'What value does new business add?', b: 'Cash generation, solvency or IFRS profit' },
        { label: 'Embedded value', a: 'Net assets plus future profits from in-force business', b: 'Value under different assumptions' },
        { label: 'Solvency and capital adequacy', a: 'Can obligations be met under regulatory rules?', b: 'Growth or customer outcomes' },
        { label: 'Profitability', a: 'What accounting profit was reported?', b: 'Long-term value or policy quality' },
      ],
      note: 'Check the assumption basis and disclosure method before comparing any of these across insurers.',
      takeaway: 'Persistency, VNB, embedded value, solvency and accounting profit answer different questions and require aligned assumptions and disclosure bases.',
    },
  },
  'life-insurance-m4-9': {
    heading: 'Long-term value needs growth that persists, efficient delivery and resilience',
    intro: 'Comparing financial resilience, policy quality, channel productivity and claims needs compatible data. Premium growth alone says little about value.',
    spec: {
      layout: 'driverTree', title: '09 How Should Distribution, Claims, Service, and Investment Portfolios Be Compared?', kicker: '',
      root: { label: 'Sustainable long-term value', detail: 'Compared on matching basis, cohort and period' },
      drivers: [
        { label: 'Quality of growth', detail: 'Sales that stay in force', children: [{ label: 'Premium growth' }, { label: 'Persistency' }] },
        { label: 'Distribution efficiency', detail: 'Cost and dependence of channels', children: [{ label: 'Expense ratio' }, { label: 'Partner concentration' }] },
        { label: 'Promise delivery', detail: 'Fair and reliable claims', children: [{ label: 'Claims performance' }] },
        { label: 'Financial resilience', detail: 'Capacity to keep commitments', children: [{ label: 'Solvency' }, { label: 'Profitability' }] },
      ],
      note: 'Example: strong new sales with weak persistency can destroy long-term value despite premium growth. Label estimates and company claims.',
      takeaway: 'Growth and distribution must be supported by capital, underwriting, controls and reliable service.',
    },
  },
  'life-insurance-m4-10': {
    heading: 'Success is built capability by capability across the policy life',
    intro: 'Insurers need capabilities to price risk, recommend appropriate cover, maintain policies and fulfil eligible obligations. A weakness at any stage shows up later as lapse, complaints or disputed claims.',
    spec: {
      layout: 'flow', title: '10 Why Do Pricing, Underwriting, and Persistency Drive Success?', kicker: '',
      steps: [
        { label: 'Actuarial pricing', detail: 'Premiums set for the risk and expenses' },
        { label: 'Underwriting with fraud control', detail: 'Risk accepted on honest, permitted information', kind: 'decision' },
        { label: 'Suitability', detail: 'Appropriate cover recommended and understood' },
        { label: 'Policy maintained', detail: 'Persistency through service and reminders' },
        { label: 'Claims handling', detail: 'Eligible obligations fulfilled fairly', kind: 'outcome' },
      ],
      loop: 'Monitor underwriting exceptions, replacement sales, complaints, lapse, claim reasons and turnaround, then remediate.',
      note: 'Example: an insurer strengthens file review to reduce unsuitable recommendations and improve understanding.',
      takeaway: 'Sustainable success balances growth with underwriting discipline, transparent sales and fair claims.',
    },
  },
  'life-insurance-m4-11': {
    heading: 'Disciplined selling trades short-term volume for policies that persist',
    intro: 'Risk selection, product governance and persistency separate growth that lasts from growth that unwinds. File review and transparent sales are the levers.',
    spec: {
      layout: 'compare', title: '11 Why Do Distribution Quality, Trust, and Claims Management Matter?', kicker: '',
      leftTitle: 'Volume-first distribution', rightTitle: 'Quality-first distribution',
      rows: [
        { label: 'Risk selection', a: 'Exceptions waved through to close sales', b: 'Underwriting discipline applied consistently' },
        { label: 'Product governance', a: 'Products pushed regardless of fit', b: 'Products matched to the target customer' },
        { label: 'Customer understanding', a: 'Commitments poorly explained', b: 'File review checks understanding' },
        { label: 'Persistency', a: 'Avoidable lapses and replacement sales', b: 'Policies stay in force as intended' },
        { label: 'Claims and trust', a: 'Disputes and complaints rise', b: 'Fair claims reinforce trust' },
      ],
      note: 'Example: an insurer strengthens file review to reduce unsuitable recommendations and improve understanding.',
      takeaway: 'Sustainable success balances growth with underwriting discipline, transparent sales and fair claims.',
    },
  },
  'life-insurance-m4-12': {
    heading: 'Financial credibility, distribution quality and service trust reinforce each other',
    intro: 'Capital, investment, channel, communication and service capabilities support policyholder confidence. They must be tracked together because commitments last decades.',
    spec: {
      layout: 'driverTree', title: '12 Why Do Capital Strength, ALM, and Operational Efficiency Matter?', kicker: '',
      root: { label: 'Policyholder confidence', detail: 'Over decades-long commitments' },
      drivers: [
        { label: 'Financial credibility', detail: 'Ability to pay when due', children: [{ label: 'Capital adequacy' }, { label: 'Asset-liability management' }] },
        { label: 'Accessible distribution', detail: 'Advice customers can understand', children: [{ label: 'Adviser quality' }, { label: 'Customer education' }] },
        { label: 'Trusted service', detail: 'Experience after the sale', children: [{ label: 'Service consistency' }, { label: 'Complaint resolution' }, { label: 'Brand reputation' }] },
      ],
      note: 'Example: clear explanations of exclusions, fees and values reduce misunderstanding and strengthen trust.',
      takeaway: 'Financial credibility, accessible distribution and trust reinforce one another over decades-long commitments.',
    },
  },
  'life-insurance-m4-13': {
    heading: 'One strength, weakness, opportunity and threat for the industry',
    intro: 'Strengths, weaknesses, opportunities and threats vary by insurer, product, channel, customer and market. This view picks one example of each from the chapter.',
    spec: {
      layout: 'taxonomy', title: '13 What Are the Industry’s Strengths and Weaknesses?', kicker: '',
      root: 'Life insurance SWOT', rootDetail: 'Evaluate by product, channel, cohort and policy duration',
      groups: [
        { label: 'Strength', items: ['Risk pooling'], detail: 'Shares individual risks across many policyholders' },
        { label: 'Weakness', items: ['Acquisition cost'], detail: 'Costly to win and advise each customer' },
        { label: 'Opportunity', items: ['Protection gap'], detail: 'Genuine needs remain uncovered' },
        { label: 'Threat', items: ['Trust threat'], detail: 'Poor sales or service erodes confidence' },
      ],
      note: 'Example: digital onboarding expands access only when customer understanding and sales quality remain strong.',
      takeaway: 'Protection needs create opportunity while complexity, affordability, reputation and regulation remain challenges.',
    },
  },
  'life-insurance-m4-14': {
    heading: 'Digital access is an opportunity only if customers still understand what they buy',
    intro: 'Digital onboarding can widen access and start long relationships. Product complexity decides whether that access produces lasting, suitable cover.',
    spec: {
      layout: 'decision', title: '14 Where Are the Protection, Inclusion, and Product Opportunities?', kicker: '',
      root: { label: 'Digital access opportunity', detail: 'New customers reached online' },
      question: 'Do customer understanding and sales quality stay strong for this product?',
      branches: [
        { condition: 'Simple product, clear understanding', outcome: 'Scale digital access', detail: 'Builds a long relationship', tone: 'positive' },
        { condition: 'Complex product', outcome: 'Simplify or add advice', detail: 'Reduce product complexity before scaling', tone: 'caution' },
        { condition: 'Understanding weak', outcome: 'Do not expand', detail: 'Access gains turn into lapse and mistrust', tone: 'negative' },
      ],
      note: 'Evaluate the opportunity by product, channel, cohort and policy duration rather than one market-wide score.',
      takeaway: 'Protection needs create opportunity while complexity, affordability, reputation and regulation remain challenges.',
    },
  },
  'life-insurance-m4-15': {
    heading: 'Each strategic challenge needs its own trigger for action',
    intro: 'Sales conduct, persistency, acquisition, technology, cyber, workforce and operating challenges hurt growth in different ways. Each needs a defined trigger for review.',
    spec: {
      layout: 'table', title: '15 What Trust, Distribution, Financial, and Regulatory Challenges Matter Most?', kicker: '',
      headers: ['Challenge', 'How it hurts', 'Trigger for action'],
      rows: [
        { label: 'Mis-selling', a: 'Unsuitable policies and complaints', b: 'Sales review' },
        { label: 'Rising commission', a: 'Incentives drift from customer need', b: 'Partner remediation' },
        { label: 'Policy lapse', a: 'Protection lost and value destroyed', b: 'Policy conservation' },
        { label: 'Legacy system', a: 'Slow, error-prone servicing', b: 'System resilience plan' },
        { label: 'Cyber threat', a: 'Customer data and operations at risk', b: 'Security and recovery review' },
        { label: 'Talent shortage', a: 'Too few capable advisers and specialists', b: 'Workforce capability plan' },
        { label: 'Service failure', a: 'Delayed claims and lost trust', b: 'Complaint and claims improvement' },
      ],
      note: 'Example: an insurer redesigns communication and reminders to reduce avoidable lapses.',
      takeaway: 'Growth underperforms when incentives, complexity, processes and customer needs are misaligned.',
    },
  },
};
