import type { LifeInsuranceChapterVisual } from './lifeInsuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Life Insurance Module 01, keyed by visualKind. */
export const LIFE_INSURANCE_M1_VISUALS: Record<string, LifeInsuranceChapterVisual> = {
  'life-insurance-m1-1': {
    heading: 'How a premium becomes risk protection between policyholder and insurer',
    intro: 'A life insurance contract exchanges premiums for a promised benefit when a specified death, survival or maturity event occurs. The policyholder and the insurer each carry obligations along the way.',
    spec: {
      layout: 'flow', title: '01 What Is the Life Insurance Industry?', kicker: '',
      steps: [
        { label: 'Premiums paid', detail: 'The policyholder meets premium obligations under the contract', owner: 'Policyholder' },
        { label: 'Risk pooled and carried', detail: 'The insurer accepts the covered risk for the agreed term', owner: 'Insurer' },
        { label: 'Covered event occurs', detail: 'A specified death, survival or maturity event', kind: 'decision' },
        { label: 'Benefit paid under terms', detail: 'Subject to exclusions and claim conditions', kind: 'outcome', owner: 'Insurer' },
      ],
      loop: 'While premiums continue, protection stays in force for the term; term life covers a specified period, whole life can be lifelong.',
      note: 'Life insurance is distinct from non-life, health and social security arrangements.',
      takeaway: 'Life insurance combines risk protection with long-term planning, and the policyholder–insurer exchange is where that protection is defined.',
    },
  },
  'life-insurance-m1-2': {
    heading: 'Life insurance is built around a death benefit tied to an insured person',
    intro: 'What sets a life contract apart is whose life is covered and what is paid when the covered event happens. The insured person need not be the policy owner.',
    spec: {
      layout: 'taxonomy', title: '02 What Makes Life Insurance Unique?', kicker: '',
      root: 'Distinctive features of a life contract', rootDetail: 'Features read together, not in sequence',
      groups: [
        { label: 'Death benefit', detail: 'Paid on the specified death event, under the policy terms' },
        { label: 'Insured person', detail: 'Person whose life or specified event is covered' },
        { label: 'Long-term promise', detail: 'A specified term, or lifelong coverage under whole life' },
        { label: 'Protection–savings balance', detail: 'Varies by product rather than being fixed' },
        { label: 'Outside this boundary', items: ['Non-life insurance', 'Health insurance', 'Social security'] },
      ],
      note: 'The insured person and the policyholder can be different people; verify both roles in the contract.',
      takeaway: 'Life insurance combines risk protection with long-term planning, and its uniqueness starts with the death benefit and the insured person it covers.',
    },
  },
  'life-insurance-m1-3': {
    heading: 'A simple test for whether a promise falls inside life insurance',
    intro: 'The industry ends where contracts stop paying death, survival or maturity benefits in exchange for premiums. A survival benefit, paid to the right beneficiary, sits inside the boundary.',
    spec: {
      layout: 'decision', title: '03 Where Does the Life Insurance Industry Begin and End?', kicker: '',
      root: { label: 'A financial promise to a household', detail: 'Check the covered event and who receives the benefit' },
      question: 'Does the contract pay a benefit on a specified death, survival or maturity event in exchange for premiums?',
      branches: [
        { condition: 'Yes, on survival or maturity', outcome: 'Inside: survival benefit', detail: 'Paid under the policy terms', tone: 'positive' },
        { condition: 'Yes, on death', outcome: 'Inside: benefit to beneficiary', detail: 'The designated beneficiary receives the eligible benefit', tone: 'positive' },
        { condition: 'Covers non-life or health risk', outcome: 'Outside life insurance', detail: 'Belongs to non-life or health insurance', tone: 'caution' },
        { condition: 'Public scheme', outcome: 'Outside: social security', detail: 'Not a life insurance contract', tone: 'negative' },
      ],
      note: 'Verify insurer, policy roles, covered event, term, exclusions, premium obligations, beneficiary and claim conditions.',
      takeaway: 'Life insurance combines risk protection with long-term planning; its boundary is set by the covered event, the survival benefit and the beneficiary entitled to it.',
    },
  },
  'life-insurance-m1-4': {
    heading: 'Four product types, each with a different benefit and a different thing to check',
    intro: 'Products range from basic protection to savings. Each must be read for its own structure, guaranteed and non-guaranteed elements, fees and surrender terms.',
    spec: {
      layout: 'table', title: '04 Understanding Life Insurance Products', kicker: '',
      headers: ['Product', 'What it provides', 'What to confirm'],
      rows: [
        { label: 'Term life', a: 'Protection for a specified period', b: 'Covered event, term and exclusions' },
        { label: 'Endowment', a: 'Protection combined with savings', b: 'Guaranteed elements and surrender terms' },
        { label: 'Participating policy', a: 'Eligibility for non-guaranteed bonuses or dividends', b: 'Bonuses depend on stated terms and insurer performance' },
        { label: 'Group life', a: 'Cover for eligible employees under a master policy', b: 'Employer eligibility rules and master policy terms' },
      ],
      note: 'Example: an employer buys group life coverage to protect eligible employees under the master policy terms.',
      takeaway: 'Product design reflects needs from basic income protection to savings, so term, endowment, participating and group products must each be judged on their own terms.',
    },
  },
  'life-insurance-m1-5': {
    heading: 'Different customers look for lifelong, flexible or investment-linked cover',
    intro: 'Individual, family, group and employer customers bring different needs. Whole life, universal life and investment-linked products answer those needs with different savings and investment characteristics.',
    spec: {
      layout: 'table', title: '05 Who Are the Life Insurance Industry’s Customers?', kicker: '',
      headers: ['Customer need', 'Product that may fit', 'What the customer must understand'],
      rows: [
        { label: 'Lifelong family protection', a: 'Whole life', b: 'Coverage terms that can run for life' },
        { label: 'Long-term savings and retirement', a: 'Universal life', b: 'Guaranteed versus non-guaranteed elements and fees' },
        { label: 'Wealth accumulation', a: 'Investment-linked insurance', b: 'Value and risk depend on the selected funds' },
        { label: 'Employee protection', a: 'Employer group cover', b: 'Eligibility under the master policy' },
      ],
      note: 'Advice needs differ by customer: confirm each product’s approved structure, surrender and investment risks.',
      takeaway: 'Product design reflects customer needs from basic income protection to retirement, savings and wealth accumulation.',
    },
  },
  'life-insurance-m1-6': {
    heading: 'From shared risk to priced, long-term policies',
    intro: 'Modern life insurance grew out of risk-sharing arrangements. Mortality knowledge made premium calculation possible, and long-term participating policies followed.',
    spec: {
      layout: 'timeline', title: '06 How Did Modern Life Insurance Begin?', kicker: '',
      events: [
        { period: 'Origins', label: 'Risk pooling', detail: 'Informal arrangements to share the cost of death', status: 'historical' },
        { period: 'Formal insurers', label: 'Mortality tables', detail: 'Death rates by population, age and period', status: 'historical' },
        { period: 'Actuarial pricing', label: 'Premium calculation', detail: 'Premiums set from mortality assumptions', status: 'historical' },
        { period: 'Long-term policies', label: 'Participating policies', detail: 'Protection plus non-guaranteed bonuses', status: 'historical' },
        { period: 'Now', label: 'Guarantees kept distinct', detail: 'Guaranteed benefits separated from illustrations and contingent bonuses', status: 'current' },
      ],
      note: 'Periods describe stages of development, not specific dates.',
      takeaway: 'The industry evolved with mortality knowledge and understanding of financial risk, turning risk pooling into priced, long-term contracts.',
    },
  },
  'life-insurance-m1-7': {
    heading: 'A risk pool lasts only when pricing, selection and distribution work together',
    intro: 'Actuarial science, underwriting and agency distribution grew into the disciplines that keep a long-term pool sound. Each one supports a different part of the promise.',
    spec: {
      layout: 'driverTree', title: '07 How Did Actuarial Science and Risk Pooling Evolve?', kicker: '',
      root: { label: 'A sustainable risk pool', detail: 'Premiums that can meet long-term promises' },
      drivers: [
        { label: 'Actuarial science', detail: 'Prices the pool from evidence', children: [{ label: 'Mortality knowledge' }, { label: 'Pricing assumptions' }] },
        { label: 'Underwriting', detail: 'Assesses each applicant', children: [{ label: 'Risk and eligibility' }, { label: 'Terms offered' }] },
        { label: 'Agency distribution', detail: 'Brings households into the pool', children: [{ label: 'Customer reach' }, { label: 'Explaining the policy' }] },
      ],
      note: 'Underwriting uses permitted information and professional judgment.',
      takeaway: 'The industry evolved with mortality knowledge and financial-risk understanding, as actuarial science, underwriting and agency distribution matured together.',
    },
  },
  'life-insurance-m1-8': {
    heading: 'Digital tools speed the journey, but exceptions and complex products still need people',
    intro: 'Markets developed electronic onboarding, automated workflows and digital service. An insurer may use a digital health questionnaire and rules engine for selected applications while escalating exceptions.',
    spec: {
      layout: 'flow', title: '08 How Did Global Life Insurance Markets Develop?', kicker: '',
      steps: [
        { label: 'Online application', detail: 'Electronic onboarding and digital health questionnaire', owner: 'Customer' },
        { label: 'Automated underwriting', detail: 'Rules engine handles selected applications', owner: 'Insurer' },
        { label: 'Exception check', detail: 'Exceptions escalated to accountable human review', kind: 'decision', owner: 'Underwriter' },
        { label: 'AI service', detail: 'Portals and automated support with consent and security' },
        { label: 'Customer education', detail: 'Complex products explained clearly', kind: 'outcome' },
      ],
      note: 'Apply electronic-transaction, personal-data and cyber requirements throughout.',
      takeaway: 'Digitalization improves access and efficiency, but complex products still require clear explanations and appropriate advice.',
    },
  },
  'life-insurance-m1-9': {
    heading: 'Electronic policies, digital claims and marketplaces each bring their own obligations',
    intro: 'Digital practice changes how policies are recorded, claims are made and products are found. Each capability needs consent, evidence, security and accountable human review.',
    spec: {
      layout: 'table', title: "09 How Has Vietnam's Life Insurance Industry Developed?", kicker: '',
      headers: ['Digital capability', 'What it changes', 'What must be in place'],
      rows: [
        { label: 'Electronic policy', a: 'Policy records kept and delivered electronically', b: 'Valid electronic evidence and consent' },
        { label: 'Digital claim', a: 'Claims submitted and tracked online', b: 'Personal-data protection and cyber security' },
        { label: 'Marketplace', a: 'Products compared and bought through digital distribution', b: 'Clear explanation and appropriate advice' },
      ],
      note: 'Apply electronic-transaction, personal-data and cyber requirements with accountable human review.',
      takeaway: 'Digitalization improves access and efficiency through electronic policies, digital claims and marketplaces, but complex products still require clear explanations.',
    },
  },
  'life-insurance-m1-10': {
    heading: 'Global demand is driven by retirement needs, protection gaps and household income',
    intro: 'Market scale is read through premiums, but the demand behind it comes from ageing, income, protection gaps and savings behaviour across mature and emerging markets.',
    spec: {
      layout: 'driverTree', title: '10 How Is the Global Life Insurance Market Structured?', kicker: '',
      root: { label: 'Global life insurance demand', detail: 'Observed through premium volume' },
      drivers: [
        { label: 'Retirement need', detail: 'Ageing raises long-horizon needs', children: [{ label: 'Retirement income' }, { label: 'Longevity protection' }, { label: 'Legacy planning' }] },
        { label: 'Protection gap', detail: 'Needs not yet covered', children: [{ label: 'Mature markets' }, { label: 'Emerging markets' }] },
        { label: 'Income and savings', detail: 'Capacity to fund cover', children: [{ label: 'Household income' }, { label: 'Savings behaviour' }] },
      ],
      note: 'Premium volume measures activity, not need; align period, geography and denominator before comparing.',
      takeaway: 'Global demand reflects ageing, income, protection gaps, savings behaviour and changing retirement needs.',
    },
  },
  'life-insurance-m1-11': {
    heading: 'Market measures fall into flows, stocks and value concepts that cannot be mixed',
    intro: 'Premium inflows, IFRS 17 insurance revenue, new business, in-force portfolios, APE, VNB and assets under management each have their own definition and period.',
    spec: {
      layout: 'taxonomy', title: '11 How Are Life Insurance Markets Measured?', kicker: '',
      root: 'Life insurance market measures', rootDetail: 'Each read on its original definition and period',
      groups: [
        { label: 'Flows in a period', detail: 'What came in or was sold', items: ['Premium volume', 'New business', 'APE'] },
        { label: 'Accounting measure', detail: 'IFRS 17 insurance services provided — not premium cash collected', items: ['Insurance revenue'] },
        { label: 'Stocks at a point', detail: 'What the insurer holds or owes', items: ['In-force portfolio', 'Assets under management'] },
        { label: 'Value concepts', detail: 'Estimates, not cash or profit', items: ['VNB'] },
      ],
      note: 'Two insurers can report similar premium inflows but different insurance revenue, VNB, capital needs and in-force portfolio quality.',
      takeaway: 'Premium inflows, IFRS 17 insurance revenue, new business, in-force portfolios, APE, VNB and assets under management measure different things and are not interchangeable.',
    },
  },
  'life-insurance-m1-12': {
    heading: 'Comparing regions only works when density and savings measures are aligned',
    intro: 'Regional activity is often compared through insurance density and household savings. Those comparisons hold only when period, geography and denominator match.',
    spec: {
      layout: 'decision', title: '12 Which Regions Drive Global Life Insurance Activity?', kicker: '',
      root: { label: 'Two regions to compare', detail: 'Insurance density and household savings figures' },
      question: 'Are the period, geography and denominator aligned for both regions?',
      branches: [
        { condition: 'Fully aligned', outcome: 'Compare density and savings', detail: 'Read differences as signals of demand', tone: 'positive' },
        { condition: 'Different periods or denominators', outcome: 'Restate before comparing', detail: 'Align the basis first', tone: 'caution' },
        { condition: 'Mixed measures', outcome: 'Do not combine', detail: 'Premiums, policy counts and sum assured are not one figure', tone: 'negative' },
      ],
      note: 'Ageing can increase demand for retirement income, longevity protection and legacy planning in any region.',
      takeaway: 'Global demand reflects ageing, income, protection gaps and savings behaviour, so regional comparisons need aligned density and savings measures.',
    },
  },
  'life-insurance-m1-13': {
    heading: 'A multinational insurer reaches customers through several kinds of channel',
    intro: 'Global and domestic insurers operate with different product mixes and channels. Some markets emphasize agency and bancassurance while others use independent advice or workplace coverage.',
    spec: {
      layout: 'ecosystem', title: '13 Who Are the Major Global Life Insurers?', kicker: '',
      center: { label: 'Multinational insurer', detail: 'An insurer type operating across several markets' },
      actors: [
        { label: 'Agency force', relation: 'Sells and services policies face to face', flows: ['product', 'service'] },
        { label: 'Independent adviser', relation: 'Advises customers across insurers', flows: ['information', 'product'] },
        { label: 'Digital channel', relation: 'Digital adoption for access and service', flows: ['information', 'service'] },
        { label: 'Policyholders', relation: 'Pay premiums for protection', flows: ['money'] },
        { label: 'Local supervisor', relation: 'Product approval and conduct rules', flows: ['oversight'] },
      ],
      note: 'This chapter names no insurers; compare insurer types and channel models, not brands.',
      takeaway: 'Competition varies with regulation, demographics, trust, distribution and financial-market maturity.',
    },
  },
  'life-insurance-m1-14': {
    heading: 'Bancassurance and employer benefits reach customers by different routes',
    intro: 'Global and domestic insurers use different channels by market. Some Asian markets emphasize bancassurance, while others rely on workplace coverage.',
    spec: {
      layout: 'compare', title: '14 How Do Global Insurance Markets and Capital Flows Interact?', kicker: '',
      leftTitle: 'Bancassurance', rightTitle: 'Employer benefit',
      rows: [
        { label: 'Who reaches the customer', a: 'A bank partner', b: 'An employer' },
        { label: 'Who is covered', a: 'Individual bank customers', b: 'Eligible employees' },
        { label: 'Where it is emphasized', a: 'Some Asian markets', b: 'Markets using workplace coverage' },
        { label: 'What to adapt locally', a: 'Product approval, advice and payment', b: 'Affordability, language and claims' },
      ],
      note: 'A domestic leader and a multinational insurer can both use either route; methods must be adapted to local requirements.',
      takeaway: 'Competition varies with regulation, demographics, trust, distribution and financial-market maturity, which is why channel routes differ by market.',
    },
  },
  'life-insurance-m1-15': {
    heading: 'Vietnam’s market potential rests on income, retirement planning and confidence',
    intro: 'Demand in Vietnam is shaped by income, dependants, savings, retirement and trust. Low penetration is not automatic demand.',
    spec: {
      layout: 'driverTree', title: "15 What Does Vietnam's Life Insurance Market Look Like?", kicker: '',
      root: { label: 'Vietnam life insurance potential', detail: 'Demand a household can sustain' },
      drivers: [
        { label: 'Household income', detail: 'Payment capacity', children: [{ label: 'Affordable long-term premiums' }, { label: 'Existing cover' }] },
        { label: 'Retirement planning', detail: 'Long-horizon savings need', children: [{ label: 'Savings goals' }, { label: 'Policy term' }] },
        { label: 'Consumer confidence', detail: 'Trust in the promise', children: [{ label: 'Protection awareness' }, { label: 'Policy understanding' }] },
      ],
      note: 'Example: a young working family considers income-replacement coverage for dependants.',
      takeaway: 'Vietnam’s potential depends on household capacity, protection awareness, confidence and affordable long-term premiums.',
    },
  },
  'life-insurance-m1-16': {
    heading: 'A protection gap becomes a suitable product only after the household is assessed',
    intro: 'Urbanization and changing household needs can widen the protection gap. Whether a product fits depends on need, existing cover, payment capacity, term and policy understanding.',
    spec: {
      layout: 'decision', title: '16 Which Life Insurance Products Are Available in Vietnam?', kicker: '',
      root: { label: 'Protection gap identified', detail: 'For example, an urban family with dependants' },
      question: 'Have need, existing cover, payment capacity, term and policy understanding been assessed?',
      branches: [
        { condition: 'Need confirmed and affordable', outcome: 'Consider income-replacement cover', detail: 'Match term to the dependants’ need', tone: 'positive' },
        { condition: 'Need confirmed, premium strained', outcome: 'Adjust cover or term', detail: 'Keep long-term premiums affordable', tone: 'caution' },
        { condition: 'Not assessed', outcome: 'Do not sell on the gap alone', detail: 'Low penetration is not automatic demand', tone: 'negative' },
      ],
      takeaway: 'Vietnam’s potential depends on household capacity, protection awareness, confidence and affordable long-term premiums, not on the protection gap alone.',
    },
  },
  'life-insurance-m1-17': {
    heading: 'Judge any insurer by how its offer fits a family’s responsibilities and budget',
    intro: 'The chapter names no insurers. Instead it asks what an insurer’s offer must match: a family’s responsibility to dependants and its ability to keep paying premiums.',
    spec: {
      layout: 'compare', title: '17 Who Are the Major Life Insurers in Vietnam?', kicker: '',
      leftTitle: 'What an insurer offers', rightTitle: 'What the family must test',
      rows: [
        { label: 'Family responsibility', a: 'Income-replacement coverage for dependants', b: 'Who depends on the income, and for how long' },
        { label: 'Premium affordability', a: 'Premium amount and payment schedule', b: 'Payment capacity across the full term' },
        { label: 'Existing cover', a: 'New policy terms', b: 'Cover the household already holds' },
        { label: 'Understanding', a: 'Policy documents and explanation', b: 'Whether the family understands the terms' },
      ],
      note: 'Compare insurer roles and offers, not brand names or rankings.',
      takeaway: 'Vietnam’s potential depends on household capacity, protection awareness, confidence and affordable long-term premiums.',
    },
  },
  'life-insurance-m1-18': {
    heading: 'Who acquires, sells and serves a Vietnam policy around the customer',
    intro: 'Insurers and intermediaries acquire and serve customers through agency, bancassurance and digital practices. A bank may distribute under an insurer partnership while the insurance contract remains distinct.',
    spec: {
      layout: 'ecosystem', title: '18 How Are Life Insurance Products Distributed in Vietnam?', kicker: '',
      center: { label: 'Customer', detail: 'Buys and holds the policy' },
      actors: [
        { label: 'Domestic insurer', relation: 'Issues the contract and carries the risk', flows: ['product', 'risk'] },
        { label: 'Bank partner', relation: 'Distributes eligible products under a partnership', flows: ['product', 'money'] },
        { label: 'Broker', relation: 'Intermediates between customer and insurer', flows: ['information'] },
        { label: 'Claims service', relation: 'Assesses claims and pays valid benefits', flows: ['service', 'money'] },
      ],
      note: 'Disclose insurer, distributor, incentives, product role, complaint ownership and post-sale service responsibilities.',
      takeaway: 'Competition depends on suitability, claims, transparency and trust as well as brand and distribution reach.',
    },
  },
  'life-insurance-m1-19': {
    heading: 'Trust is built by transparent insurers, suitable advice and accountable digital channels',
    intro: 'Adoption depends on more than reach. Customers need to know who the insurer is, who is advising them, what incentives apply and who owns complaints.',
    spec: {
      layout: 'driverTree', title: '19 What Factors Shape Insurance Adoption and Market Trust?', kicker: '',
      root: { label: 'Adoption and market trust', detail: 'Customers who buy and stay confident' },
      drivers: [
        { label: 'Insurer transparency', detail: 'Who carries the promise', children: [{ label: 'Foreign-owned or domestic' }, { label: 'Product role disclosed' }] },
        { label: 'Agent advice', detail: 'Suitability at the point of sale', children: [{ label: 'Incentives disclosed' }, { label: 'Need-based advice' }] },
        { label: 'Digital intermediary', detail: 'Reach with accountability', children: [{ label: 'Complaint ownership' }, { label: 'Post-sale service' }] },
      ],
      takeaway: 'Competition depends on suitability, claims, transparency and trust as well as brand and distribution reach.',
    },
  },
  'life-insurance-m1-20': {
    heading: 'How economic pressure turns into missed premiums and lapsed policies',
    intro: 'Household and macroeconomic conditions shape new purchases and premium continuity. Financial pressure can lead a household to cut spending or discontinue unaffordable coverage.',
    spec: {
      layout: 'flow', title: '20 How Do Economic Conditions Affect Life Insurance Demand?', kicker: '',
      steps: [
        { label: 'Economic pressure', detail: 'Lower disposable income or shifting interest rates' },
        { label: 'Premium burden rises', detail: 'Premiums take a larger share of the budget', owner: 'Household' },
        { label: 'Missed premium', detail: 'An early warning sign', kind: 'decision' },
        { label: 'Grace period', detail: 'Time to restore payment under the terms' },
        { label: 'Policy lapse', detail: 'Coverage discontinued', kind: 'outcome' },
      ],
      loop: 'Interest rates also shift preference between protection and savings products.',
      note: 'Monitor premium burden, missed premiums, grace and lapse behaviour by product and cohort—not sales alone.',
      takeaway: 'Long-term commitments make affordability, income stability, rates and sentiment central to demand and persistency.',
    },
  },
  'life-insurance-m1-21': {
    heading: 'Consumer protection starts with whether a household can keep paying',
    intro: 'Employment and household savings decide whether a long-term premium commitment is realistic. Selling cover a household cannot sustain harms the customer.',
    spec: {
      layout: 'decision', title: '21 Why Do Regulation and Consumer Protection Matter?', kicker: '',
      root: { label: 'Household considering long-term cover', detail: 'Employment and savings position reviewed' },
      question: 'Can employment income and household savings support premiums across the full term?',
      branches: [
        { condition: 'Stable employment and savings', outcome: 'Proceed with suitable cover', detail: 'Commitment matches capacity', tone: 'positive' },
        { condition: 'Uncertain employment', outcome: 'Choose smaller, affordable cover', detail: 'Monitor premium continuity', tone: 'caution' },
        { condition: 'No savings buffer', outcome: 'Do not push the sale', detail: 'High risk of discontinued coverage', tone: 'negative' },
      ],
      note: 'Fair treatment and responsible conduct principles apply to every sale.',
      takeaway: 'Long-term commitments make affordability and income stability central to demand and persistency, which is why consumer protection matters.',
    },
  },
  'life-insurance-m1-22': {
    heading: 'Data on affordability signals, not sales alone, shows whether cover survives inflation',
    intro: 'Inflation and premium affordability affect whether premiums keep being paid. Tracking the right signals by product and cohort shows where coverage is at risk.',
    spec: {
      layout: 'table', title: '22 How Are Technology and Data Transforming Life Insurance?', kicker: '',
      headers: ['Signal', 'What it shows', 'How to track it'],
      rows: [
        { label: 'Inflation', a: 'Pressure on household budgets', b: 'Alongside premium burden' },
        { label: 'Premium affordability', a: 'Premium burden relative to income', b: 'By product and cohort' },
        { label: 'Missed premiums', a: 'Early stress on continuity', b: 'At each due date' },
        { label: 'Grace and lapse', a: 'Coverage at risk or lost', b: 'By cohort, not sales alone' },
      ],
      takeaway: 'Long-term commitments make affordability, income stability and inflation central to demand and persistency.',
    },
  },
  'life-insurance-m1-23': {
    heading: 'External requirements follow the customer from licensing to claims',
    intro: 'Rules and demographic change affect insurer stability, product design, advice and claims. Each duty should be mapped to an owner.',
    spec: {
      layout: 'flow', title: '23 How Are Customer Needs and Demographics Changing?', kicker: '',
      steps: [
        { label: 'License', detail: 'Authority to operate under current insurance law', owner: 'Insurer' },
        { label: 'Product governance', detail: 'Clear exclusions, fees and surrender values', owner: 'Insurer' },
        { label: 'Advice and financial literacy', detail: 'Customer makes an informed decision', owner: 'Distributor and customer' },
        { label: 'Claims handling', detail: 'Valid claims assessed and paid', kind: 'outcome', owner: 'Insurer' },
      ],
      note: 'Map product, distributor, data, advice, claims and complaint duties to owners.',
      takeaway: 'Sustainable growth requires sound solvency, suitable products, transparent sales and effective protection.',
    },
  },
  'life-insurance-m1-24': {
    heading: 'Capital, disclosure and population ageing can each be a risk or an opportunity',
    intro: 'External requirements and demographic change affect insurer stability, product design and customer outcomes. The same factor can weaken or strengthen the industry.',
    spec: {
      layout: 'compare', title: '24 What External Risks and Opportunities Shape the Industry?', kicker: '',
      leftTitle: 'Risk', rightTitle: 'Opportunity',
      rows: [
        { label: 'Capital', a: 'Weak solvency threatens insurer stability', b: 'Sound capital supports sustainable growth' },
        { label: 'Disclosure', a: 'Unclear fees or exclusions mislead customers', b: 'Clear disclosure supports informed decisions' },
        { label: 'Population ageing', a: 'Product design and claims needs shift', b: 'Products adapted to changing needs' },
      ],
      takeaway: 'Sustainable growth requires sound solvency, suitable products, transparent sales and effective protection.',
    },
  },
};
