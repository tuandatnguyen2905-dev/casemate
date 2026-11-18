import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '5. Distribution & Sales Channels';

const deck = [
  entM3Chapter({
    title: 'Direct Sales and Enterprise Account Management', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how direct sales work for complex solutions and why account management drives long-term relationships.',
    mateIntro: 'When a purchase is big and complicated, customers want to talk to people who understand it. That is what direct sales provide.',
    keyInsight: 'Direct sales are most effective when the solution requires consultative selling and close customer coordination. Strong account management helps providers understand business priorities, build trust, and identify opportunities for long-term relationships.',
    statTiles: [
      { value: '5', label: 'Key direct-sales activities', subtitle: 'Lead generation to account development', description: 'Lead generation, needs assessment, solution demonstration, proposal and contract management, and strategic account development.' },
      { value: 'US$100M+', label: 'Size of FPT’s first Japanese contract', subtitle: 'FPT annual report, company-reported', description: 'A company example of a large enterprise engagement.' },
      { value: '+25.4%', label: 'Growth in FPT’s Japan business in 2025', subtitle: 'FPT earnings report, company-reported', description: 'Japan is its main overseas market.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The FPT figures are company-reported and describe one provider’s largest overseas market.',
    narrative: [
      { label: 'What it is', text: 'Direct sales allow software vendors and IT service providers to engage customers through internal sales teams, solution consultants, business development managers, and strategic account managers. This channel is particularly important for complex enterprise solutions that require detailed needs assessment, technical demonstrations, security reviews, procurement negotiations, and implementation planning.' },
      { label: 'Why it is happening', text: 'Enterprise sales cycles can be lengthy because purchasing decisions involve multiple stakeholders and significant financial or operational commitments. Providers therefore need structured account planning, accurate qualification, and coordination between commercial teams and technical specialists.' },
      { label: 'Real-world example', text: 'Teams find prospects through industry research, professional networks, events, referrals and targeted outreach; learn the customer’s business challenges, current systems, budget limits, decision criteria and expected outcomes; present functionality, architecture, security capabilities and relevant use cases; define scope, pricing, implementation milestones, service levels and commercial terms; and keep relationships, monitor satisfaction and look for renewal or expansion opportunities.' },
      { label: 'Vietnam example', text: 'FPT reports that Japan is its main overseas market, that its Japan business grew 25.4% in 2025 and that it signed a first Japanese contract above US$100 million, all company-reported. VINASA says the lack of local offices abroad limits trust-building for Vietnamese outsourcing firms, which is an association comment and not a measurement. No public Vietnam data on sales-cycle length, win rates or pipeline conversion was found.' },
      { label: 'Business impact', text: 'Direct sales enable providers to manage complex customer relationships and communicate differentiated value. Their effectiveness depends on qualified leads, consultative expertise, reliable proposals, and coordinated delivery commitments.' },
    ],
    visualKind: 'ent-m3-51-direct', visualHeading: 'From lead to strategic account',
    visualIntro: 'Follow the five steps of a direct sale from lead generation to account development.',
    imageAlt: 'Casemate step diagram of a direct sale from lead generation to strategic account development',
    keyTerms: [
      { term: 'Consultative selling', definition: 'Selling by understanding the customer’s problems and shaping a solution, rather than pushing a product.' },
      { term: 'Qualification', definition: 'Judging whether a prospect has the need, budget and authority to buy.' },
      { term: 'Security review', definition: 'A customer’s check of a provider’s security controls before buying.' },
      { term: 'Account management', definition: 'Looking after a customer relationship over time to support renewals and growth.' },
    ],
    recap: [
      'Direct sales use sales teams, consultants and account managers.',
      'They suit complex solutions with many stakeholders and long cycles.',
      'Needs assessment, demonstration, proposals and contracts structure the sale.',
      'Account management builds trust and finds renewal and expansion opportunities.',
    ],
    chapterRecap: 'Direct sales enable providers to manage complex customer relationships and communicate differentiated value. Their effectiveness depends on qualified leads, consultative expertise, reliable proposals, and coordinated delivery commitments.',
    deepDiveTitle: 'Why proposals must match delivery capacity',
    body: <EntDeepDive paragraphs={[
      'A proposal that promises more than the delivery team can do wins the contract and loses the relationship. Coordination between sales and technical specialists therefore protects both margin and trust.',
      'Qualifying leads carefully avoids spending effort on prospects that will never buy.' ]} evidence="The sales activities are from the supplied brief; FPT figures are from its annual and earnings reports and are company-reported; the trust comment is from VINASA via VnEconomy. The point about proposals and delivery capacity restates the brief in our own words." />,
    sources: citeEnt3('fptGlobalIt2025', 'fptEarnings2025', 'vneconomyVinasa'),
  }),
  entM3Chapter({
    title: 'Channel Partners, Resellers, and Technology Ecosystems', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what indirect channels add, what they cost and why they need active governance.',
    mateIntro: 'Partners can open doors a vendor could never open alone. But every partner also takes a share of the relationship and the margin.',
    keyInsight: 'Partner ecosystems can accelerate market access and expand delivery capacity, but they require active governance. Providers must align incentives and ensure that partners represent products and services accurately.',
    statTiles: [
      { value: '5', label: 'Key channel activities', subtitle: 'Resellers to partner enablement', description: 'Reseller networks, cloud marketplaces, implementation partnerships, technology alliances and partner enablement.' },
      { value: '1997', label: 'Year FPT formed an Oracle alliance', subtitle: 'FPT milestones, company account', description: 'An early technology alliance in its history.' },
      { value: '1989–95', label: 'Years FPT distributed Olivetti, IBM and Compaq hardware', subtitle: 'FPT milestones, company account', description: 'Distribution partnerships before it became a software exporter.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The dates come from FPT’s own milestones page and describe one company’s history.',
    narrative: [
      { label: 'What it is', text: 'Indirect channels allow providers to reach customers through resellers, distributors, implementation partners, cloud marketplaces, consulting firms, and technology alliances. These partners may provide access to established customer networks, regional expertise, complementary products, and implementation capabilities.' },
      { label: 'Why it is happening', text: 'Partner channels can reduce the need to build every sales and delivery capability internally. However, they may also reduce margins, complicate customer ownership, and create dependence on partner performance. Providers need clear rules governing lead attribution, revenue sharing, customer support, branding, and contractual responsibilities.' },
      { label: 'Real-world example', text: 'Providers authorise partners to sell software licences, subscriptions and related services; distribute applications through established cloud purchasing platforms; collaborate with specialist firms that configure, integrate and maintain enterprise systems; combine complementary products, APIs, infrastructure and services into integrated offerings; and give partners training, certification, sales materials, technical documentation and escalation processes.' },
      { label: 'Vietnam example', text: 'FPT’s milestones page records distribution partnerships with Olivetti, IBM and Compaq in 1989–95 and an Oracle alliance in 1997, a company account of partnership-led growth. MISA says its accounting software connects with sales software, electronic invoices, digital signatures and e-commerce platforms, a vendor statement. Vietnam Briefing links growth to nearshore outsourcing demand from Japan and the United States. No public data on reseller or marketplace shares of Vietnamese software sales was found.' },
      { label: 'Business impact', text: 'Indirect channels help providers scale distribution and extend their capabilities. Successful partnerships depend on aligned commercial incentives, consistent service standards, and clear responsibility for customer outcomes.' },
    ],
    visualKind: 'ent-m3-52-partners', visualHeading: 'What indirect channels add and cost',
    visualIntro: 'Compare what partner channels add with what they cost, row by row.',
    imageAlt: 'Casemate comparison of what indirect channels add and what they cost',
    keyTerms: [
      { term: 'Reseller', definition: 'A partner that sells another company’s products to its own customers.' },
      { term: 'Cloud marketplace', definition: 'An online catalogue run by a cloud provider where customers buy software and services.' },
      { term: 'Lead attribution', definition: 'Deciding which party gets credit and commission for a sales opportunity.' },
      { term: 'Partner enablement', definition: 'Training and materials that help partners sell and support a product well.' },
    ],
    recap: [
      'Indirect channels include resellers, marketplaces, implementers and alliances.',
      'They add reach, expertise and delivery capacity.',
      'They can reduce margin and complicate customer ownership.',
      'Clear rules and aligned incentives keep partners accountable.',
    ],
    chapterRecap: 'Indirect channels help providers scale distribution and extend their capabilities. Successful partnerships depend on aligned commercial incentives, consistent service standards, and clear responsibility for customer outcomes.',
    deepDiveTitle: 'Who owns the customer when a partner sells',
    body: <EntDeepDive paragraphs={[
      'If a reseller makes the sale and supports the customer, the vendor may never learn why the customer stays or leaves. Contracts that settle lead attribution, support responsibility and data sharing keep that visibility.',
      'Providers that treat partners as an extension of their own team, with training and escalation routes, tend to protect quality better.' ]} evidence="The channel descriptions are from the supplied brief; FPT dates are from its own milestones page; the MISA integrations are from its press release and are vendor claims; the nearshore point is from Vietnam Briefing. The customer-ownership discussion is our own reading of the brief." />,
    sources: citeEnt3('fptMilestones', 'fptHistory', 'misaPress', 'vietnamBriefingIt'),
  }),
  entM3Chapter({
    title: 'Digital Channels, Self-Service, and Hybrid Go-to-Market Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how digital self-service and hybrid journeys match sales effort to customer complexity.',
    mateIntro: 'Some customers want to click and buy. Others want a conversation. A good go-to-market model gives each what they need.',
    keyInsight: 'The optimal sales channel depends on product complexity, contract value, customer needs, and acquisition economics. Digital self-service supports scale, while human-led sales and technical guidance remain important for complex enterprise purchases.',
    statTiles: [
      { value: '5', label: 'Key digital-channel activities', subtitle: 'Lead generation to channel measurement', description: 'Digital lead generation, self-service trials, online subscription management, hybrid sales journeys and channel performance measurement.' },
      { value: '605', label: 'Firms that responded to Facebook and VnExpress advertising for a cloud ERP programme', subtitle: 'World Bank study, 2021', description: 'Average of about 40 employees each.' },
      { value: '183,000', label: 'Estimated paid SME cloud ERP subscriptions in Vietnam in 2025', subtitle: 'Ken Research, third-party estimate', description: 'Excludes standalone accounting products.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The response count is from one provider’s programme, and the subscription figure is a research firm’s estimate.',
    narrative: [
      { label: 'What it is', text: 'Digital channels allow software providers to generate leads, demonstrate products, deliver trials, onboard customers, and manage subscriptions with less reliance on traditional sales interactions. These channels are particularly relevant to standardized SaaS products and lower-complexity solutions, where customers can evaluate features and pricing independently.' },
      { label: 'Why it is happening', text: 'For larger or more complex customers, digital self-service is often combined with direct sales, technical consulting, and implementation support. A hybrid go-to-market model can therefore serve different customer segments while controlling acquisition costs and maintaining the level of assistance required for successful adoption.' },
      { label: 'Real-world example', text: 'Providers attract prospects through websites, search, content marketing, webinars and professional platforms; let potential customers explore functionality through demos, sandboxes or free trials; support purchasing, upgrades, renewals, billing and account administration online; combine digital discovery with consultations, technical demonstrations and implementation support; and compare conversion rates, acquisition costs, sales-cycle length, retention and revenue by channel.' },
      { label: 'Vietnam example', text: 'MISA publishes plan prices for AMIS Accounting online with a buy option, a vendor website. In a World Bank study of a Vietnamese cloud ERP provider, advertising on Facebook and VnExpress drew 605 interested firms, but usage fell from close to 80% after training to 35% about 18 months later, which shows that online acquisition does not ensure adoption. Ken Research estimates about 183,000 paid SME cloud ERP subscriptions in 2025. No public data on conversion rates or acquisition cost by channel for Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Digital and hybrid distribution models allow providers to match sales effort with customer complexity. Channel decisions should be based on measurable acquisition economics and the level of assistance customers need to succeed.' },
    ],
    visualKind: 'ent-m3-53-digital', visualHeading: 'Matching the channel to the solution',
    visualIntro: 'See where five channel approaches sit by solution complexity and need for human-led selling.',
    imageAlt: 'Casemate matrix placing five go-to-market approaches by solution complexity and need for human-led selling',
    keyTerms: [
      { term: 'Self-service', definition: 'A buying and onboarding path the customer completes alone, without a salesperson.' },
      { term: 'Free trial', definition: 'Time-limited access to a product so a prospect can evaluate it.' },
      { term: 'Hybrid go-to-market', definition: 'A mix of digital self-service and human-led selling.' },
      { term: 'Conversion rate', definition: 'The share of prospects that become customers.' },
    ],
    recap: [
      'Digital channels generate leads, trials and subscriptions with less human selling.',
      'They suit standardized SaaS and simpler solutions.',
      'Complex customers still need consultations and implementation support.',
      'Compare channels by conversion, cost, cycle length, retention and revenue.',
    ],
    chapterRecap: 'Digital and hybrid distribution models allow providers to match sales effort with customer complexity. Channel decisions should be based on measurable acquisition economics and the level of assistance customers need to succeed.',
    deepDiveTitle: 'Why low-touch acquisition still needs onboarding',
    body: <EntDeepDive paragraphs={[
      'Online advertising can bring in many interested firms cheaply, but the World Bank study shows that interest does not equal use. Without onboarding and support, most of the early users had stopped within about 18 months.',
      'A hybrid model can add guided onboarding for smaller customers and consultative selling for larger ones, so effort follows need.' ]} evidence="The channel activities are from the supplied brief; the programme figures are from a World Bank blog on one provider; the subscription estimate is from Ken Research; MISA’s online pricing is from its website. The matrix positions and the hybrid-journey comment are our own illustration." />,
    sources: citeEnt3('worldBankSme', 'kenCloudErp', 'misaAccounting'),
  }),
];

const quiz = entQuiz('ent-m3-l5', [
  { chapter: '1', objective: 'State when direct sales work', question: 'When are direct sales most effective?', application: 'A vendor sells a complex ERP. Which channel fits?', correct: 'When the solution requires consultative selling and close customer coordination', wrong: ['When the product is a free app', 'When there are no customers', 'When no demonstration is needed'], explanation: 'Complexity needs people. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain long cycles', question: 'Why can enterprise sales cycles be lengthy?', application: 'A deal takes a year. Why?', correct: 'Purchasing decisions involve multiple stakeholders and significant commitments', wrong: ['Nobody reads the proposal', 'Contracts are automatic', 'The product has no price'], explanation: 'Many decisions. Review Chapter 1.' },
  { chapter: '1', objective: 'List direct-sales activities', question: 'Which is a direct-sales activity?', application: 'A sales plan lists steps. Which belongs?', correct: 'Needs assessment, solution demonstration, proposal and contract management', wrong: ['Harvesting crops', 'Printing fabrics', 'Roasting coffee'], explanation: 'These structure the sale. Review Chapter 1.' },
  { chapter: '1', objective: 'Read company figures', question: 'How should FPT’s US$100 million Japanese contract be described?', application: 'A slide says it is the average deal size. What is wrong?', correct: 'As one company-reported contract, not an average', wrong: ['As a government figure', 'As a Gartner forecast', 'As a law'], explanation: 'One example is not an average. Review Chapter 1.' },
  { chapter: '2', objective: 'List indirect channels', question: 'Which is an indirect channel?', application: 'A vendor plans partners. Which fits?', correct: 'Resellers, distributors, implementation partners, cloud marketplaces or technology alliances', wrong: ['Only its own sales team', 'Only radio advertising', 'Only a shop window'], explanation: 'Partners extend reach. Review Chapter 2.' },
  { chapter: '2', objective: 'State the trade-off', question: 'What may partner channels reduce or complicate?', application: 'A vendor relies on resellers. What should it watch?', correct: 'Margins and customer ownership, with dependence on partner performance', wrong: ['Nothing', 'Product quality only', 'The need for contracts'], explanation: 'Partners share the relationship. Review Chapter 2.' },
  { chapter: '2', objective: 'Name governance topics', question: 'What should clear partner rules cover?', application: 'A partner programme is drafted. What belongs in it?', correct: 'Lead attribution, revenue sharing, customer support, branding and contractual responsibilities', wrong: ['Only logos', 'Only holidays', 'Only office size'], explanation: 'Governance prevents conflict. Review Chapter 2.' },
  { chapter: '3', objective: 'Say who digital channels suit', question: 'Which products suit digital self-service most?', application: 'A vendor picks a channel for a simple SaaS tool. What fits?', correct: 'Standardized SaaS products and lower-complexity solutions', wrong: ['Multi-year national transformation programmes', 'Custom-built core banking', 'Nothing'], explanation: 'Simple products sell themselves. Review Chapter 3.' },
  { chapter: '3', objective: 'Define hybrid go-to-market', question: 'What does a hybrid go-to-market combine?', application: 'A firm sells to SMEs and banks. What model helps?', correct: 'Digital self-service with direct sales, technical consulting and implementation support', wrong: ['Only advertising', 'Only invoices', 'Only trials'], explanation: 'Effort matches complexity. Review Chapter 3.' },
  { chapter: '3', objective: 'Interpret the study', question: 'What did the World Bank study show about online-recruited SME users?', application: 'A vendor assumes ads guarantee adoption. What is the correction?', correct: 'Interest was high, but use fell from about 80% to 35% over about 18 months', wrong: ['Everyone kept using it', 'Nobody was interested', 'Use rose every month'], explanation: 'Acquisition is not adoption. Review Chapter 3.' },
]);

export const LESSON_ENT3_5: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe direct, partner and digital channels and when each suits a provider.',
    keyTakeaways: [
      'Direct sales suit complex solutions that need consultative selling.',
      'Partner channels extend reach and capacity but need governance.',
      'Digital self-service supports scale for standardized products.',
      'Hybrid models match sales effort to customer complexity.',
      'Acquisition does not ensure adoption, so channel economics must include retention.',
    ],
    businessImplications: 'Choose channels by complexity, contract value and acquisition economics, set clear partner rules and pair digital acquisition with onboarding.',
    remember: 'The right channel depends on how much help the customer needs to succeed.',
    nextLesson: 'Industry Ecosystem & Stakeholders',
  },
};
