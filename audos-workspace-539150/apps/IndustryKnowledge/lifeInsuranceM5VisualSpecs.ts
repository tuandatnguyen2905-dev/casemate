import type { LifeInsuranceChapterVisual } from './lifeInsuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Life Insurance Module 05, keyed by visualKind. */
export const LIFE_INSURANCE_M5_VISUALS: Record<string, LifeInsuranceChapterVisual> = {
  'life-insurance-m5-1': {
    heading: 'Changing households call for cover that is reviewed, not set once',
    intro: 'Demographic and household changes reshape protection, retirement and legacy priorities. Cover chosen for one life stage can stop fitting the next.',
    spec: {
      layout: 'compare', title: '01 How Are Protection Needs and Demographics Changing?', kicker: '',
      leftTitle: 'One-off sale', rightTitle: 'Periodic needs review',
      rows: [
        { label: 'Family structure', a: 'Assumed fixed at purchase', b: 'Rechecked as the household changes' },
        { label: 'Dependants', a: 'Cover sized once', b: 'Cover adjusted as dependants change' },
        { label: 'Retirement', a: 'Left to a later product', b: 'Planned alongside protection' },
        { label: 'Premium', a: 'Fixed commitment, lapse if unaffordable', b: 'Flexible premium where terms allow' },
      ],
      note: 'Example: a young household prioritises affordable income protection before complex long-term products.',
      takeaway: 'Customers need solutions reflecting life stage, obligations and ability to maintain premiums.',
    },
  },
  'life-insurance-m5-2': {
    heading: 'Employment income makes income protection the first priority; legacy comes later',
    intro: 'Households protect earned income before turning to long-term or legacy goals. Transparent, affordable terms decide whether later priorities are added.',
    spec: {
      layout: 'pathway', title: '02 How Are Transparency, Affordability, and Trust Changing Demand?', kicker: '',
      trunk: [
        { label: 'Employment income', detail: 'What the household depends on' },
        { label: 'Income protection first', detail: 'Affordable cover for that income' },
      ],
      optionsLabel: 'Later priorities — alternatives, chosen as affordability and trust allow',
      options: [
        { label: 'Legacy', detail: 'Provision for heirs' },
        { label: 'Retirement', detail: 'Long-term savings goal' },
        { label: 'Stay with protection only', detail: 'When budget does not allow more' },
      ],
      afterLabel: 'Throughout',
      after: [{ label: 'Periodic review', detail: 'Need, debt, existing cover and payment capacity', kind: 'outcome' }],
      note: 'Example: a young household prioritises affordable income protection before complex long-term products.',
      takeaway: 'Customers need solutions reflecting life stage, obligations and ability to maintain premiums.',
    },
  },
  'life-insurance-m5-3': {
    heading: 'From awareness to a kept policy: trust and understanding are the gates',
    intro: 'Confidence, literacy, reputation and communication influence both purchase and policy continuity. Awareness alone does not lead to adoption.',
    spec: {
      layout: 'flow', title: '03 How Are Household Financial Priorities and Behaviors Evolving?', kicker: '',
      steps: [
        { label: 'Product awareness', detail: 'Customer learns cover exists' },
        { label: 'Seeks opinions', detail: 'Agent recommendation and online review' },
        { label: 'Provider trust', detail: 'Confidence the insurer will pay', kind: 'decision' },
        { label: 'Policy comprehension', detail: 'Benefits, exclusions, fees and surrender understood', kind: 'decision' },
        { label: 'Long-term commitment', detail: 'Policy bought and kept in force', kind: 'outcome' },
      ],
      loop: 'Claims experience feeds back into reviews, recommendations and trust for the next customer.',
      note: 'Example: interactive comparisons explain protection-only versus investment-linked policies using consistent terms.',
      takeaway: 'Awareness does not produce adoption unless customers trust providers and understand commitments.',
    },
  },
  'life-insurance-m5-4': {
    heading: 'Automation handles routine cases; complex ones go to a human underwriter',
    intro: 'AI and analytics support applications, risk assessment and claims under legal and ethical controls. Routing decides which cases a person must review.',
    spec: {
      layout: 'decision', title: '04 How Is Digital Underwriting Evolving?', kicker: '',
      root: { label: 'Incoming application or claim', detail: 'Checked by AI review and predictive analytics' },
      question: 'Is the case routine and within what the model has been validated for?',
      branches: [
        { condition: 'Routine, within validated scope', outcome: 'Automated processing', detail: 'Monitor performance and drift', tone: 'positive' },
        { condition: 'Complex or flagged', outcome: 'Human underwriter decides', detail: 'Claims triage routes it to a person', tone: 'caution' },
        { condition: 'Model unfair or drifting', outcome: 'Suspend and review', detail: 'Human oversight and documented overrides', tone: 'negative' },
      ],
      note: 'Use lawful purpose and data, validate fairness and provide review paths for customers.',
      takeaway: 'Automation improves speed only with appropriate data governance, validation and accountable review.',
    },
  },
  'life-insurance-m5-5': {
    heading: 'The same AI tools behave differently with and without governance',
    intro: 'AI can support underwriting and fraud detection, but personal data must be used lawfully. Governance decides whether speed comes with fairness.',
    spec: {
      layout: 'compare', title: '05 How Are AI, Analytics, and Claims Technology Changing Operations?', kicker: '',
      leftTitle: 'Automation without governance', rightTitle: 'Governed automation',
      rows: [
        { label: 'Underwriting support', a: 'Model output accepted unchecked', b: 'Validated, with complex cases reviewed by people' },
        { label: 'Fraud detection', a: 'Flags treated as proof', b: 'Flags investigated, overrides documented' },
        { label: 'Privacy', a: 'Data used beyond its purpose', b: 'Lawful purpose and lawful data only' },
        { label: 'Customer recourse', a: 'No way to challenge a decision', b: 'Clear review path' },
      ],
      note: 'Example: routine application checks are automated while complex cases go to a human underwriter.',
      takeaway: 'Automation improves speed only with appropriate data governance, validation and accountable review.',
    },
  },
  'life-insurance-m5-6': {
    heading: 'Digital service spans self-service, claims, communication and connected journeys',
    intro: 'Mobile administration, electronic records, connected financial journeys and tailored communications change the policy experience. Each must keep terms, consent and support consistent.',
    spec: {
      layout: 'taxonomy', title: '06 How Is Digital Customer Service Changing the Policy Experience?', kicker: '',
      root: 'Digital policy experience', rootDetail: 'Service areas, used side by side',
      groups: [
        { label: 'Self-service', items: ['Mobile policy', 'Electronic document', 'Premium reminders'] },
        { label: 'Claims', items: ['Digital claim'] },
        { label: 'Communication', items: ['Personalized communication'] },
        { label: 'Connected journeys', items: ['Bank integration', 'Employee benefit'] },
      ],
      note: 'Example: a mobile service lets customers review cover, retrieve documents and receive premium reminders.',
      takeaway: 'Digital tools create value when they simplify decisions and service rather than digitizing complexity.',
    },
  },
  'life-insurance-m5-7': {
    heading: 'One customer journey crosses online research, an agent and the mobile app',
    intro: 'Connected online and offline journeys combine education, advice, issuance, service and policy management. A shared customer record keeps them consistent.',
    spec: {
      layout: 'flow', title: '07 How Is the Agency Channel Transforming?', kicker: '',
      steps: [
        { label: 'Research online', detail: 'Education and lead capture', owner: 'Customer' },
        { label: 'Consult an adviser', detail: 'Needs, suitability and advice record', owner: 'Agent' },
        { label: 'Policy issued', detail: 'Consistent terms and consent', owner: 'Insurer' },
        { label: 'Manage on mobile', detail: 'Self-service policy management', owner: 'Mobile app' },
        { label: 'Ongoing support', detail: 'Questions, changes and complaints', kind: 'outcome', owner: 'Call centre' },
      ],
      loop: 'A shared customer record carries advice, consent and service history across every touchpoint.',
      note: 'Preserve suitability evidence and complaint ownership across channels.',
      takeaway: 'Customers may discover online but still need professional advice for complex long-term choices.',
    },
  },
  'life-insurance-m5-8': {
    heading: 'After online discovery, advice can come from a bank, a website or a virtual meeting',
    intro: 'Customers often start online, then choose how to get advice. Every route must keep the same terms and suitability evidence.',
    spec: {
      layout: 'pathway', title: '08 How Are Bancassurance and Partnerships Evolving?', kicker: '',
      trunk: [{ label: 'Online discovery', detail: 'Customer researches cover' }],
      optionsLabel: 'Advice routes — alternatives, not steps',
      options: [
        { label: 'Bank', detail: 'Adviser alongside banking services' },
        { label: 'Website', detail: 'Self-directed for simpler choices' },
        { label: 'Virtual consultation', detail: 'Remote professional advice' },
      ],
      afterLabel: 'Whichever route',
      after: [{ label: 'Consistent records', detail: 'Terms, suitability, consent and service ownership', kind: 'outcome' }],
      note: 'Example: a customer researches online, consults an adviser and manages the issued policy on mobile.',
      takeaway: 'Customers may discover online but still need professional advice for complex long-term choices.',
    },
  },
  'life-insurance-m5-9': {
    heading: 'Partners bring customers to the insurer; the insurer stays accountable for conduct',
    intro: 'Insurance is increasingly distributed through financial, workplace and commercial ecosystems. Each partner relationship needs training, conduct rules and post-sale service ownership.',
    spec: {
      layout: 'ecosystem', title: '09 How Are Digital Distribution, Acquisition, and Retention Changing?', kicker: '',
      center: { label: 'Insurer', detail: 'Risk carrier accountable for sales conduct' },
      actors: [
        { label: 'Bank partner', relation: 'Offers cover kept separate from banking decisions', flows: ['product', 'money'] },
        { label: 'Employer', relation: 'Provides cover as a workplace benefit', flows: ['product', 'money'] },
        { label: 'Affinity group', relation: 'Reaches members of a community', flows: ['information'] },
        { label: 'Financial platform', relation: 'Embeds cover in a digital journey', flows: ['information', 'product'] },
        { label: 'Customer', relation: 'Receives disclosure and post-sale service', flows: ['service'] },
      ],
      note: 'Example: a bank and insurer redesign the journey around customer need and clear insurance disclosure. Govern partner training, scripts, incentives and consent.',
      takeaway: 'Partnerships lower acquisition barriers only when recommendations, incentives and accountability are transparent.',
    },
  },
  'life-insurance-m5-10': {
    heading: 'Policyholder protection now rests on capital, conduct and automated-decision rules',
    intro: 'Regulatory expectations now cover capital, distribution, data and AI as well as claims and complaints. Together they protect the policyholder.',
    spec: {
      layout: 'driverTree', title: '10 How Are Solvency, Capital, and Insurance Regulation Evolving?', kicker: '',
      root: { label: 'Policyholder protection', detail: 'Distinguish binding law from guidance' },
      drivers: [
        { label: 'Solvency', detail: 'Capacity to meet obligations', children: [{ label: 'Capital' }, { label: 'Third-party oversight' }] },
        { label: 'Sales conduct', detail: 'Fair distribution and advice', children: [{ label: 'Product disclosure' }, { label: 'Complaint handling' }] },
        { label: 'Automated decision', detail: 'AI used with lawful data', children: [{ label: 'Data access and consent' }, { label: 'Cyber resilience' }] },
      ],
      note: 'Example: an insurer reviews data access and consent before AI-supported underwriting.',
      takeaway: 'Compliance increasingly connects customer experience, resilience and provider credibility.',
    },
  },
  'life-insurance-m5-11': {
    heading: 'Vietnam’s insurance, electronic-transaction, data and cyber laws took effect in stages',
    intro: 'Product governance, personal data and cybersecurity duties come from several laws with different effective dates. Map each current requirement to the activity it governs.',
    spec: {
      layout: 'timeline', title: '11 How Are Market Conduct, Consumer Protection, and Disclosure Evolving?', kicker: '',
      events: [
        { period: '1 January 2023', label: 'Law on Insurance Business', detail: 'No. 08/2022/QH15: insurer and intermediary conduct', status: 'historical' },
        { period: '1 July 2024', label: 'Law on Electronic Transactions', detail: 'No. 20/2023/QH15: electronic records and contracts', status: 'historical' },
        { period: '1 January 2026', label: 'Law on Personal Data Protection', detail: 'No. 91/2025/QH15: duties depend on processing role and purpose', status: 'historical' },
        { period: '1 July 2026', label: 'Cybersecurity Law', detail: 'No. 116/2025/QH15: depends on organisation, system and data', status: 'historical' },
        { period: 'Now', label: 'Map current requirements', detail: 'Product governance, personal data and cybersecurity owners', status: 'current' },
      ],
      note: 'Effective dates as given in the chapter sources. Verify amendments, implementing instruments and applicability; distinguish guidance from law.',
      takeaway: 'Compliance increasingly connects customer experience, resilience and provider credibility.',
    },
  },
  'life-insurance-m5-12': {
    heading: 'Responsible growth combines inclusive design with wider sustainability risks',
    intro: 'Inclusive product design widens access, while environmental and social risks affect assets and operations. Both shape long-term policyholder outcomes.',
    spec: {
      layout: 'taxonomy', title: '12 How Do Long-Term Investment and Sustainability Considerations Matter?', kicker: '',
      root: 'Responsible growth', rootDetail: 'Two areas measured separately',
      groups: [
        { label: 'Inclusive product design', items: ['Simplified product', 'Affordable protection', 'Accessible channel'] },
        { label: 'Fair customer outcomes', items: ['Financial education', 'Fair treatment'] },
        { label: 'Wider sustainability risk', items: ['Climate investment risk', 'Operational resilience'] },
      ],
      note: 'Example: an insurer offers affordable cover to an underserved segment with transparent eligibility and benefits. Test climate assumptions and continuity plans.',
      takeaway: 'Responsible growth balances commercial viability with affordability, fairness and long-term policyholder need.',
    },
  },
  'life-insurance-m5-13': {
    heading: 'A protection-gap pilot scales only when the cohort persists',
    intro: 'Underserved and family protection needs are a growth opportunity, but a digital journey must prove need, understanding and persistency before scaling.',
    spec: {
      layout: 'decision', title: '13 Where Are the Main Protection Gaps and Inclusion Opportunities?', kicker: '',
      root: { label: 'Protection-gap pilot', detail: 'Family protection through a digital journey' },
      question: 'Does the pilot cohort show real need met, understanding and persistency?',
      branches: [
        { condition: 'Yes on all tests', outcome: 'Scale', detail: 'Keep monitoring claims and service', tone: 'positive' },
        { condition: 'Mixed results', outcome: 'Adjust and retest', detail: 'Change price, journey or underwriting', tone: 'caution' },
        { condition: 'Weak persistency or understanding', outcome: 'Stop', detail: 'Gap not genuinely closed', tone: 'negative' },
      ],
      note: 'Example: an insurer offers modular first-time-buyer protection adjustable as circumstances change.',
      takeaway: 'Opportunity is strongest where genuine protection gaps meet affordability, access and trusted service.',
    },
  },
  'life-insurance-m5-14': {
    heading: 'Growth areas: what need each serves and what to test first',
    intro: 'Growth comes from underserved segments, retirement needs and tailored cover. Each needs its own evidence before it is scaled.',
    spec: {
      layout: 'table', title: '14 Which Products, Segments, and Channels Offer Growth?', kicker: '',
      headers: ['Growth area', 'Need it serves', 'Test before scaling'],
      rows: [
        { label: 'First-time buyer', a: 'Affordable entry protection', b: 'Understanding and premium continuity' },
        { label: 'Retirement need', a: 'Long-term income planning', b: 'Need, price and understanding' },
        { label: 'Modular coverage', a: 'Cover adjustable as circumstances change', b: 'Service, claims and cohort persistency' },
      ],
      note: 'Example: an insurer offers modular first-time-buyer protection adjustable as circumstances change. Set stop-or-scale criteria in advance.',
      takeaway: 'Opportunity is strongest where genuine protection gaps meet affordability, access and trusted service.',
    },
  },
  'life-insurance-m5-15': {
    heading: 'Future competitiveness rests on risk control, simplicity, technology and service together',
    intro: 'Systems, AI, products, channels, retention and service must align with changing expectations and regulation. Each driver needs an accountable owner and a measurable outcome.',
    spec: {
      layout: 'driverTree', title: '15 What Financial, Operating, and Strategic Risks Shape the Outlook?', kicker: '',
      root: { label: 'Future competitiveness', detail: 'Judged by measurable outcomes' },
      drivers: [
        { label: 'Sound risk management', detail: 'Validated, resilient operations', children: [{ label: 'Responsible AI' }, { label: 'Operational resilience' }] },
        { label: 'Simple products, trusted advice', detail: 'Customers understand what they buy', children: [{ label: 'Product simplification' }, { label: 'Distribution governance' }] },
        { label: 'Efficient technology', detail: 'Secure architecture', children: [{ label: 'Core modernization' }] },
        { label: 'Consistent service', detail: 'Long relationships', children: [{ label: 'Customer retention' }, { label: 'Measurable outcome' }] },
      ],
      note: 'Example: an insurer combines self-service, professional advice and proactive reviews to strengthen long relationships.',
      takeaway: 'Future competitiveness combines sound risk management, simple products, trusted advice, efficient technology and consistent service.',
    },
  },
};
