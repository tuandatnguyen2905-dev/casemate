import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '4. Downstream Activities';

const deck = [
  entM2Chapter({
    title: 'Distribution, Deployment, and Customer Onboarding', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how offers reach customers and why onboarding determines how fast value is realised.',
    mateIntro: 'Signing the contract is the start, not the finish. How well a customer is welcomed decides whether the product ever gets used.',
    keyInsight: 'Customer acquisition creates the commercial opportunity, but effective onboarding determines how quickly customers can realize value. A well-designed onboarding process reduces adoption friction and helps establish a foundation for retention and expansion.',
    statTiles: [
      { value: '5', label: 'Key downstream activities', subtitle: 'Sales to adoption measurement', description: 'Sales and contracting, software distribution, onboarding, training and enablement, and adoption measurement.' },
      { value: 'VND 9,093B', label: 'FPT domestic IT services revenue in 2025', subtitle: 'FPT earnings report, company-reported, +11.5%', description: 'Against VND 35,382 billion from overseas IT services.' },
      { value: '39.05%', label: 'Share of Vietnam IT services value held by IT outsourcing in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'For IT services only, not enterprise software.' },
    ],
    statsNote: 'The first tile is a count from this lesson. FPT figures are company-reported for one provider, and the Mordor share is a third-party estimate for services only.',
    narrative: [
      { label: 'What it is', text: 'Downstream activities begin when software and services are made available to customers. Software vendors may distribute products through direct sales, cloud marketplaces, resellers, or partner ecosystems. IT service providers typically acquire customers through sales teams, consulting relationships, tenders, referrals, and long-term enterprise contracts.' },
      { label: 'Why it is happening', text: 'Customer onboarding establishes the conditions for successful adoption. Depending on the solution, this may include account provisioning, licensing, environment setup, security configuration, user training, data access, and the definition of support arrangements.' },
      { label: 'Real-world example', text: 'Providers define requirements, pricing, scope, service levels, responsibilities and commercial terms; provide licences, subscriptions, downloads, cloud access or marketplace procurement; configure accounts, permissions, environments and initial workflows; help administrators and end users understand functions and procedures; and track activation, engagement, training completion and early implementation outcomes.' },
      { label: 'Vietnam example', text: 'FPT reports domestic IT services revenue of VND 9,093 billion in 2025, up 11.5%, though domestic pre-tax profit of VND 416 billion fell 9.7%; both are company-reported. Mordor Intelligence estimates that IT outsourcing held 39.05% of Vietnam IT services value in 2025 and that large enterprises held 67.72% while SME demand grows 12.74% a year. VINASA says a lack of local offices abroad limits trust-building with overseas clients. No public data on marketplace or reseller shares, or on onboarding times, was found for Vietnam.' },
      { label: 'Business impact', text: 'Distribution and onboarding connect industry offerings with actual customer use. Clear commercial agreements and structured onboarding help reduce friction and accelerate time to value.' },
    ],
    visualKind: 'ent-m2-41-onboarding', visualHeading: 'Five activities that lead to time to value',
    visualIntro: 'Explore the five activities around the goal of fast time to value.',
    imageAlt: 'Casemate mind map of five distribution and onboarding activities around time to value',
    keyTerms: [
      { term: 'Time to value', definition: 'How long it takes a customer to start getting the benefits it bought.' },
      { term: 'Provisioning', definition: 'Creating accounts, permissions and environments so users can start work.' },
      { term: 'Tender', definition: 'A formal competitive process in which providers bid for a contract.' },
      { term: 'Marketplace procurement', definition: 'Buying software through a cloud provider’s online catalogue.' },
    ],
    recap: [
      'Offers reach customers through direct sales, marketplaces, resellers and partners.',
      'Services are often won through sales teams, tenders and referrals.',
      'Onboarding sets the conditions for adoption.',
      'Structured onboarding shortens time to value.',
    ],
    chapterRecap: 'Distribution and onboarding connect industry offerings with actual customer use. Clear commercial agreements and structured onboarding help reduce friction and accelerate time to value.',
    deepDiveTitle: 'Why onboarding is a retention activity',
    body: <EntDeepDive paragraphs={[
      'A customer that does not see benefits in the first weeks tends to doubt the purchase. Good onboarding therefore protects renewal long before the renewal date arrives.',
      'Tracking early activation and training completion gives the provider an early warning if adoption is stalling.' ]} evidence="Downstream activities are from the supplied brief; FPT figures are from its earnings report and are company-reported; Mordor shares are third-party estimates; the trust point is from VINASA via VnEconomy. The link between onboarding and renewal is our own reading of the brief’s Key Insight." />,
    sources: citeEnt('fptEarnings2025', 'mordorVietnamIt', 'vneconomyVinasa'),
  }),
  entM2Chapter({
    title: 'Customer Support, Maintenance, and Managed Services', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how support and managed services sustain a system after delivery and why service levels follow criticality.',
    mateIntro: 'Once a system is running a business, it cannot be allowed to stop. Support is how providers keep that promise.',
    keyInsight: 'The post-implementation phase is a major source of recurring value and customer retention. Reliable support protects system continuity and provides opportunities for service providers to deepen relationships through continuous improvement.',
    statTiles: [
      { value: '5', label: 'Key downstream activities', subtitle: 'Support to service-level management', description: 'Technical support, software maintenance, managed operations, incident management and service-level management.' },
      { value: '11.86%', label: 'Annual growth rate of cloud and platform services in Vietnam', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The fastest-growing segment in the estimate, for IT services only.' },
      { value: 'VND 416B', label: 'FPT domestic IT services pre-tax profit in 2025', subtitle: 'FPT earnings report, company-reported, -9.7%', description: 'Profit fell while domestic revenue rose 11.5%.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Mordor figures are third-party estimates for services, and the FPT figure is company-reported for one provider.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software and IT systems require ongoing support after implementation. Software vendors provide updates, bug fixes, product documentation, and technical assistance, while IT service providers may monitor infrastructure, resolve incidents, manage applications, and maintain system performance.' },
      { label: 'Why it is happening', text: 'Support requirements differ according to system criticality, customer size, and service agreements. A business-critical financial platform may require stringent availability and incident-response commitments, while a less critical internal application may operate under more flexible support arrangements.' },
      { label: 'Real-world example', text: 'Providers resolve user issues, diagnose faults and give product or system guidance; deliver patches, version upgrades, compatibility updates and corrective fixes; monitor infrastructure, applications, performance, availability and capacity; classify and prioritise incidents, communicate status and document root causes; and measure response times, resolution times, uptime and other agreed service indicators.' },
      { label: 'Vietnam example', text: 'FPT says it is moving overseas contracts from time-and-materials toward managed services, a shift toward ongoing support relationships, and reports domestic IT services pre-tax profit of VND 416 billion in 2025, down 9.7% while revenue rose 11.5%; both are company-reported. Mordor Intelligence estimates cloud and platform services as the fastest-growing IT services segment in Vietnam, at 11.86% a year. The Law on Cybersecurity 116/2025/QH15 takes effect on 1 July 2026 and affects how information systems and online services are secured. No public data on uptime, ticket resolution times or service-level penalties for Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Support, maintenance, and managed services sustain customer value after deployment. Their quality affects customer trust, recurring revenue, service costs, and the long-term reliability of enterprise systems.' },
    ],
    visualKind: 'ent-m2-42-support', visualHeading: 'Service commitments follow criticality',
    visualIntro: 'Read how stringent support commitments become as a system grows more critical.',
    imageAlt: 'Casemate matrix of support commitment strictness against system criticality',
    keyTerms: [
      { term: 'Managed services', definition: 'Ongoing operation and monitoring of a customer’s technology under a service contract.' },
      { term: 'Incident', definition: 'An unplanned interruption or reduction in the quality of an IT service.' },
      { term: 'Root cause', definition: 'The underlying reason an incident occurred, documented to prevent a repeat.' },
      { term: 'Patch', definition: 'A software update that fixes a defect or security weakness.' },
    ],
    recap: [
      'Systems need updates, fixes and monitoring after implementation.',
      'Support commitments follow how critical the system is.',
      'Incident management and service levels make reliability measurable.',
      'Support is a major source of recurring value and retention.',
    ],
    chapterRecap: 'Support, maintenance, and managed services sustain customer value after deployment. Their quality affects customer trust, recurring revenue, service costs, and the long-term reliability of enterprise systems.',
    deepDiveTitle: 'Why recurring support can lift revenue while squeezing profit',
    body: <EntDeepDive paragraphs={[
      'Support creates steady revenue, but it also carries steady cost: staff on call, monitoring tools and penalties if service levels are missed. If the contract price does not reflect that cost, margins can fall even as revenue grows.',
      'FPT’s domestic result, with revenue up and profit down, is consistent with that pattern, though the company does not give a single cause.' ]} evidence="Support activities are from the supplied brief; the growth rate is from Mordor Intelligence; FPT figures and the managed-service shift are from its earnings and annual reports and are company-reported; the law date is from a Luat Viet Nam summary. The suggested link between support costs and margins is our own reading, not a finding in the sources." />,
    sources: citeEnt('mordorVietnamIt', 'fptGlobalIt2025', 'fptEarnings2025', 'cyberLaw2025'),
  }),
  entM2Chapter({
    title: 'Customer Success, Renewal, and Solution Expansion', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how customer success turns first sales into long-term relationships and when expansion is sustainable.',
    mateIntro: 'The best new customer is often an existing one who is getting results and wants more.',
    keyInsight: 'Long-term growth depends on demonstrating value throughout the customer lifecycle. Renewal and expansion become more achievable when customers can connect technology usage with measurable improvements in their business operations.',
    statTiles: [
      { value: '5', label: 'Key downstream activities', subtitle: 'Success management to customer advocacy', description: 'Customer success management, renewal, cross-selling and upselling, continuous optimization and advocacy.' },
      { value: '+16.8%', label: 'Growth in FPT digital transformation revenue from overseas clients in 2025', subtitle: 'FPT annual report, company-reported', description: 'To VND 16,751 billion, about 47.3% of its overseas IT services revenue.' },
      { value: '12.74%', label: 'Annual growth rate of Vietnam SME IT services demand', subtitle: 'Mordor Intelligence, third-party estimate', description: 'A growing segment where expansion within accounts may matter.' },
    ],
    statsNote: 'The first tile is a count from this lesson. FPT figures are company-reported, and the Mordor rate is a third-party estimate for services only.',
    narrative: [
      { label: 'What it is', text: 'Customer success focuses on whether customers achieve their intended outcomes from technology investments. Activities include monitoring usage, reviewing business performance, identifying adoption barriers, recommending improvements, and helping customers prepare for renewals or future implementations.' },
      { label: 'Why it is happening', text: 'As customer needs evolve, providers may expand relationships through additional software modules, more users, new business units, cloud migration, AI capabilities, cybersecurity services, or modernization projects. Expansion is most sustainable when it addresses validated needs rather than simply increasing the amount of technology sold.' },
      { label: 'Real-world example', text: 'Providers review adoption, satisfaction, business outcomes and unresolved challenges; assess contract performance, usage, service quality and upcoming needs ahead of renewal; introduce additional modules, integrations, managed services or higher product tiers; look for ways to improve workflows, cut unnecessary spending and raise utilisation; and develop references, case studies and long-term partnerships with satisfied customers.' },
      { label: 'Vietnam example', text: 'FPT reports digital transformation revenue from overseas clients of VND 16,751 billion in 2025, up 16.8% and about 47.3% of its overseas IT services revenue, and says its Japan business grew 25.4% with a first contract above US$100 million; these are company-reported. Mordor Intelligence estimates SME demand for IT services in Vietnam growing 12.74% a year. No public data on renewal rates, churn or expansion revenue for Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Customer success and lifecycle management convert initial sales into longer-term commercial relationships. Providers must link expansion to genuine customer needs and demonstrable business value to maintain trust.' },
    ],
    visualKind: 'ent-m2-43-success', visualHeading: 'From adoption review to advocacy',
    visualIntro: 'Read the five layers from customer success management at the base up to advocacy.',
    imageAlt: 'Casemate pyramid of five layers from customer success management to customer advocacy',
    keyTerms: [
      { term: 'Customer success', definition: 'The practice of helping customers achieve the outcomes they bought technology for.' },
      { term: 'Renewal', definition: 'A customer’s decision to continue a subscription or contract.' },
      { term: 'Upselling', definition: 'Selling a higher tier or more capacity to an existing customer.' },
      { term: 'Cross-selling', definition: 'Selling an additional product or service to an existing customer.' },
    ],
    recap: [
      'Customer success monitors outcomes, not just usage.',
      'Renewals are easier when value is visible.',
      'Expansion should follow validated needs.',
      'References and advocacy come from satisfied customers.',
    ],
    chapterRecap: 'Customer success and lifecycle management convert initial sales into longer-term commercial relationships. Providers must link expansion to genuine customer needs and demonstrable business value to maintain trust.',
    deepDiveTitle: 'Why expansion without validated need backfires',
    body: <EntDeepDive paragraphs={[
      'Selling more modules than a customer can adopt raises cost without raising results. At renewal the customer sees a bill for tools it barely uses.',
      'Tying each addition to a need the customer has confirmed makes the next renewal easier.' ]} evidence="Customer success activities are from the supplied brief; FPT figures are from its annual and earnings reports and are company-reported; the SME rate is from Mordor Intelligence. The renewal example is our own illustration." />,
    sources: citeEnt('fptGlobalIt2025', 'fptEarnings2025', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m2-l4', [
  { chapter: '1', objective: 'List distribution routes', question: 'How may software vendors distribute products?', application: 'A vendor plans its go-to-market. Which route fits?', correct: 'Direct sales, cloud marketplaces, resellers or partner ecosystems', wrong: ['Only through printed catalogues', 'Only through street stalls', 'Only through television'], explanation: 'Several routes exist. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain onboarding value', question: 'What does effective onboarding determine?', application: 'A customer is slow to adopt. What was missing?', correct: 'How quickly customers can realize value', wrong: ['The price of hardware', 'The weather', 'The vendor’s logo'], explanation: 'Onboarding drives time to value. Review Chapter 1.' },
  { chapter: '1', objective: 'Read company figures', question: 'How should FPT’s VND 9,093 billion domestic revenue be described?', application: 'A slide calls it Vietnam’s IT services market. What is wrong?', correct: 'It is one company’s reported domestic IT services revenue', wrong: ['It is the whole market', 'It is a Gartner forecast', 'It is a law'], explanation: 'One company is not the market. Review Chapter 1.' },
  { chapter: '2', objective: 'State the post-implementation role', question: 'Why is the post-implementation phase important?', application: 'A vendor ignores support after go-live. What is lost?', correct: 'It is a major source of recurring value and retention', wrong: ['It is irrelevant', 'It reduces trust', 'It ends the relationship'], explanation: 'Support sustains value. Review Chapter 2.' },
  { chapter: '2', objective: 'Match support to criticality', question: 'How do support commitments differ by system?', application: 'A bank’s payment platform and a minor internal tool need support. How should they differ?', correct: 'Business-critical systems need stricter availability and incident-response commitments', wrong: ['All systems need identical terms', 'Critical systems need none', 'Only internal tools need support'], explanation: 'Criticality drives service levels. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a service indicator', question: 'Which is an example of a service-level indicator?', application: 'A contract lists measures. Which fits?', correct: 'Response time, resolution time or uptime', wrong: ['Office size', 'Logo colour', 'Number of slides'], explanation: 'Indicators make service measurable. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a legal date', question: 'When does Vietnam’s Law on Cybersecurity 116/2025/QH15 take effect?', application: 'A plan needs the date. What is it?', correct: '1 July 2026', wrong: ['1 January 2010', '1 July 2036', '31 December 2020'], explanation: 'It replaces the 2018 law. Review Chapter 2.' },
  { chapter: '3', objective: 'State the growth condition', question: 'What does long-term growth depend on?', application: 'A provider wants renewals. What must it show?', correct: 'Demonstrating value throughout the customer lifecycle', wrong: ['Raising prices only', 'Reducing support', 'Hiding usage data'], explanation: 'Value must be visible. Review Chapter 3.' },
  { chapter: '3', objective: 'Define expansion discipline', question: 'When is expansion most sustainable?', application: 'A salesperson adds modules. What should guide the choice?', correct: 'When it addresses validated customer needs', wrong: ['When it increases the amount of technology sold', 'When customers have not asked', 'When it avoids measurement'], explanation: 'Needs come first. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about renewal and churn rates for Vietnamese providers?', application: 'A slide shows 95% renewal. What is the correction?', correct: 'No public data was found, so none is shown', wrong: ['They are always 95%', 'Gartner publishes them', 'They are set by law'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT2_4: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how offers reach customers, how support sustains systems and how customer success turns sales into long-term relationships.',
    keyTakeaways: [
      'Onboarding determines how quickly customers realise value.',
      'Support and managed services are a major source of recurring value.',
      'Service commitments should follow system criticality.',
      'Renewal and expansion depend on demonstrable value and validated needs.',
      'No public Vietnam data was found on onboarding times, service levels or renewal rates.',
    ],
    businessImplications: 'Design onboarding to shorten time to value, price support to reflect its cost and tie every expansion to a confirmed need.',
    remember: 'The sale opens the relationship; delivery of value keeps it.',
    nextLesson: 'Inputs, Outputs & Value Creation',
  },
};
