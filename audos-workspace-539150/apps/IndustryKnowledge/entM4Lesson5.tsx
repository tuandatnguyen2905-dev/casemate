import { EntDeepDive, citeEnt4, entM4Chapter, entQuiz } from './entM4Core';
import type { EntM4LessonBundle } from './entM4Core';

const LESSON = '5. SWOT & Strategic Challenges';

const deck = [
  entM4Chapter({
    title: 'Industry SWOT Analysis', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read an industry-level SWOT and connect each finding to a specific strategic action.',
    mateIntro: 'A SWOT list on its own changes nothing. It becomes useful when every line points to something you will do.',
    keyInsight: 'The industry benefits from strong demand for digital transformation and expanding technology capabilities, but success is not automatic. Companies must address skill shortages, cybersecurity risks, competitive pressure, and uncertainty about the commercial returns of new technologies.',
    statTiles: [
      { value: '4', label: 'Key SWOT actions', subtitle: 'Strength leverage to threat mitigation', description: 'Strength leverage, weakness reduction, opportunity capture and threat mitigation.' },
      { value: '~20%', label: 'Share of Vietnam’s cloud market the Deputy Prime Minister said domestic providers hold', subtitle: 'Press report of an official statement', description: 'Most of the market belongs to foreign firms.' },
      { value: '150–200K', label: 'Forecast annual shortage of tech workers in Vietnam', subtitle: 'TopDev via VnEconomy', description: 'A recruiter estimate reported by a news outlet.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are an official statement as reported by the press and a recruiter estimate, not audited statistics.',
    narrative: [
      { label: 'What it is', text: 'A SWOT analysis evaluates the industry’s internal strengths and weaknesses alongside external opportunities and threats. For enterprise software and IT services, the analysis should recognize the differences between software product companies, cloud providers, consulting firms, outsourcing providers, and domestic technology businesses.' },
      { label: 'Why it is happening', text: 'The following assessment presents broad industry-level themes. It is not a company-specific SWOT and should be adapted when analyzing an individual provider or a particular market segment.' },
      { label: 'Real-world example', text: 'Strengths include scalable software, recurring revenue potential, automation, global delivery models and accumulated technical expertise; weaknesses include legacy systems, integration complexity, talent dependence, uneven service quality and high transformation costs; opportunities include AI adoption, cloud migration, cybersecurity, data analytics, industry-specific software and digital transformation in Vietnam; and threats include AI-native entrants, price competition, cyberattacks, changing regulations, vendor concentration and economic uncertainty. Providers leverage strengths by expanding into adjacent services, reduce weaknesses by modernising delivery methods, capture opportunities in use cases with clear demand and measurable value, and mitigate threats through security, governance, contractual protections and contingency planning.' },
      { label: 'Vietnam example', text: 'On strengths, FPT reports global IT services revenue of VND 35,382 billion, up 14.3%, a company figure. On weaknesses, the Deputy Prime Minister was reported as saying domestic providers hold only about 20% of Vietnam’s cloud market, and a TopDev report cited by VnEconomy estimates a shortage of 150,000 to 200,000 tech workers a year. On opportunities, the 2025–30 national cloud programme (Decision 1121/QD-TTg) targets cloud use by government agencies and state enterprises with domestic providers, a policy target. On threats, the Personal Data Protection Law and Law on Cybersecurity raise compliance duties. This is a broad illustration, not a company SWOT.' },
      { label: 'Business impact', text: 'The industry’s strengths and opportunities create substantial potential for growth, but companies must address operational weaknesses and external threats. SWOT is most useful when each finding is connected to a specific strategic action.' },
    ],
    visualKind: 'ent-m4-51-swot', visualHeading: 'Industry-level SWOT',
    visualIntro: 'Read across the table for each dimension’s factors and the strategic implication.',
    imageAlt: 'Casemate table of an industry-level SWOT with key factors and strategic implications',
    keyTerms: [
      { term: 'SWOT', definition: 'A framework that lists strengths, weaknesses, opportunities and threats.' },
      { term: 'Legacy system', definition: 'An older system that is still essential to operations.' },
      { term: 'Vendor concentration', definition: 'Reliance on one or a few suppliers for critical technology.' },
      { term: 'Contingency planning', definition: 'Preparing responses in case something goes wrong.' },
    ],
    recap: [
      'SWOT weighs internal strengths and weaknesses against external opportunities and threats.',
      'This is an industry-level view, not a company SWOT.',
      'Demand is strong but success is not automatic.',
      'Each finding should link to a strategic action.',
    ],
    chapterRecap: 'The industry’s strengths and opportunities create substantial potential for growth, but companies must address operational weaknesses and external threats. SWOT is most useful when each finding is connected to a specific strategic action.',
    deepDiveTitle: 'Why one factor can be both a strength and a weakness',
    body: <EntDeepDive paragraphs={[
      'Talent expertise is a strength when it wins projects, but dependence on a few key people is a weakness if they leave. Global delivery is a strength for cost and reach, yet it adds coordination risk.',
      'Listing such tensions helps firms choose actions that keep the benefit and limit the risk.' ]} evidence="The SWOT table and actions are from the supplied brief; the Vietnam points come from FPT’s earnings report, a press report, VnEconomy citing TopDev, the Vietnam Government news portal and the law summaries. The strength-and-weakness tension is our own reading." />,
    sources: citeEnt4('fptEarnings2025', 'cmcGrowth', 'vneconomyTalent', 'vietnamCloudProgram', 'pdplGazette', 'cyberLaw2025'),
  }),
  entM4Chapter({
    title: 'Major Strategic Challenges', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the main strategic challenges and why converting technology change into value is the central one.',
    mateIntro: 'New tools arrive faster than customers can absorb them. The hard part is turning them into results that last.',
    keyInsight: 'The central challenge is converting technological change into sustainable business value. Companies that focus only on deploying new tools, without addressing adoption, governance, cost, and workflow redesign, may struggle to achieve lasting results.',
    statTiles: [
      { value: '6', label: 'Key strategic challenges', subtitle: 'AI monetization to customer adoption', description: 'AI monetization, cybersecurity and data governance, legacy modernization, talent transformation, margin pressure and customer adoption.' },
      { value: '8.2%', label: 'Productivity gain FPT reports from its AI-first strategy', subtitle: 'FPT annual report, company-reported', description: 'A company claim, not an independently measured result.' },
      { value: '~30%', label: 'Share of IT graduates reported as job-ready in Vietnam', subtitle: 'Viet Nam News and VnEconomy', description: 'Of roughly 50,000 IT graduates a year.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The FPT figure is a company claim and the graduate figure is a broker estimate reported by a news outlet.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software and IT services companies face challenges that extend beyond technology development. Customers increasingly expect rapid implementation, measurable returns, predictable costs, secure data handling, and compatibility with existing systems. Providers must satisfy these requirements while maintaining innovation, profitability, and service quality.' },
      { label: 'Why it is happening', text: 'AI is intensifying these pressures. It can improve software development and service delivery, but it can also enable new competitors, change customer expectations, and complicate pricing. Deloitte’s 2026 software outlook highlights the challenge of monetizing AI capabilities and demonstrating meaningful returns while adapting to AI-first development models.' },
      { label: 'Real-world example', text: 'Providers decide whether AI should be priced through subscriptions, usage, feature tiers or outcome-based arrangements; manage threats, access permissions, privacy expectations and the risks of exposing confidential information; integrate new applications with older systems while limiting downtime, migration risk and disruption; retrain employees as automation changes development practices and raises demand for AI, data and security expertise; balance competitive pricing with rising infrastructure costs, investment requirements and support obligations; and help organisations redesign workflows, train employees and evaluate realised benefits rather than relying on deployment metrics alone.' },
      { label: 'Vietnam example', text: 'FPT reports an 8.2% productivity gain from its AI-first strategy, a company claim. FPT also reports domestic IT services revenue up 11.5% in 2025 while pre-tax profit fell 9.7%, without stating a single cause, which is consistent with margin pressure but does not prove it. Viet Nam News reports that only about 30% of IT graduates are job-ready, which bears on talent transformation. Vietnam’s Personal Data Protection Law took effect on 1 January 2026. No public Vietnam data on how providers price AI or on customer adoption of AI products was found.' },
      { label: 'Business impact', text: 'Strategic challenges require coordinated responses across technology, people, operations, finance, and governance. Companies must demonstrate tangible outcomes while maintaining the trust and reliability expected of enterprise technology providers.' },
    ],
    visualKind: 'ent-m4-52-challenges', visualHeading: 'Six strategic challenges',
    visualIntro: 'Explore the six challenges around the idea of turning change into value.',
    imageAlt: 'Casemate mind map of six strategic challenges around turning technological change into value',
    keyTerms: [
      { term: 'AI monetization', definition: 'Deciding how to charge for AI capabilities and prove their return.' },
      { term: 'Data governance', definition: 'Rules and controls for how data is accessed, used and protected.' },
      { term: 'Margin pressure', definition: 'A squeeze on profit as costs rise or prices are pushed down.' },
      { term: 'Workflow redesign', definition: 'Changing how work is done so that new technology delivers its benefit.' },
    ],
    recap: [
      'Customers expect speed, measurable returns, predictable cost and security.',
      'AI helps delivery but also invites new rivals and pricing complexity.',
      'Deploying tools without adoption and governance rarely lasts.',
      'Responses must coordinate technology, people, operations, finance and governance.',
    ],
    chapterRecap: 'Strategic challenges require coordinated responses across technology, people, operations, finance, and governance. Companies must demonstrate tangible outcomes while maintaining the trust and reliability expected of enterprise technology providers.',
    deepDiveTitle: 'Why AI pricing is hard to settle',
    body: <EntDeepDive paragraphs={[
      'Deloitte expects pricing to move from seats and subscriptions toward hybrid usage and outcome models, which adds complexity for both vendors and customers. AI also carries real compute costs that vary with use.',
      'Providers must prove returns while keeping margins, which is why monetization is listed as a core challenge.' ]} evidence="The challenges are from the supplied brief; the pricing shift is from Deloitte’s 2026 software outlook and predictions; FPT figures are from its annual and earnings reports and are company-reported; the graduate figure is from Viet Nam News. The link between AI cost and pricing restates the Deloitte material in our own words." />,
    sources: citeEnt4('deloitteSoftware', 'deloitteSaas', 'fptGlobalIt2025', 'fptEarnings2025', 'vietnamnewsItWorkforce', 'pdplGazette'),
  }),
  entM4Chapter({
    title: 'Strategic Responses and Future Competitive Priorities', chapterTitle: LESSON, readingTime: '7',
    objective: 'Set out the strategic priorities that turn investment into differentiated, scalable and trusted solutions.',
    mateIntro: 'You cannot compete everywhere. The skill is choosing where to focus and then delivering reliably.',
    keyInsight: 'A sustainable competitive strategy combines selective innovation, clear differentiation, trusted delivery, and disciplined execution. The objective is not simply to adopt the newest technology, but to build capabilities that customers value and are willing to pay for over time.',
    statTiles: [
      { value: '7', label: 'Key strategic priorities', subtitle: 'Priority markets to moving up the value chain', description: 'Priority markets, AI-enabled offerings, cybersecurity, reusable assets, partnerships, commercial discipline and moving up the value chain.' },
      { value: '30', label: 'Countries CMC says it is present in', subtitle: 'CMC Telecom press release, company claim', description: 'With representative offices in more than 10.' },
      { value: 'US$100M+', label: 'Size of FPT’s first Japanese contract', subtitle: 'FPT annual report, company-reported', description: 'A company example of a higher-value engagement.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are company claims and company-reported figures for individual firms.',
    narrative: [
      { label: 'What it is', text: 'To remain competitive, providers need a strategy that combines focused investment with operational discipline. Large vendors may prioritize integrated platforms, AI capabilities, and ecosystem expansion. Service providers may focus on industry specialization, automation, consulting, and the development of reusable delivery assets. Vietnamese providers can pursue higher-value international engagements while strengthening their ability to serve domestic enterprises.' },
      { label: 'Why it is happening', text: 'Strategic priorities should be selected according to customer demand, existing capabilities, investment capacity, and competitive positioning. Attempting to compete in every technology category can spread resources too thinly, particularly for smaller providers.' },
      { label: 'Real-world example', text: 'Providers select customer segments and industries where they can build a defensible advantage; identify high-value AI use cases and integrate AI with appropriate governance; make security and resilience part of product design, implementation and service delivery; create proprietary components, industry templates, implementation frameworks and automation tools; collaborate with cloud platforms, enterprise software vendors, universities and specialist technology firms; track customer acquisition costs, retention, project profitability, service quality and return on technology investments; and, for Vietnamese service providers, expand from labour-based execution toward consulting, solution architecture, product ownership and strategic technology partnerships.' },
      { label: 'Vietnam example', text: 'FPT reports digital transformation revenue of VND 16,751 billion, about 47.3% of its overseas IT services revenue, and a first Japanese contract above US$100 million. CMC says it is present in 30 countries, signed a cooperation agreement with NTT DATA in January 2026, targets US$200–250 million of Japan revenue by 2028 and plans US$100 million for mini data centres there, and states an aim to become a global AI transformation company. MISA says it integrated AI agents for more than 170,000 enterprises. These are company statements and targets, not outcomes, and no public data on the returns from these moves was found.' },
      { label: 'Business impact', text: 'Future competitiveness will depend on how effectively firms translate technology investment into differentiated, scalable, and trusted solutions. Strategic focus and execution quality are essential for converting industry opportunities into sustainable growth.' },
    ],
    visualKind: 'ent-m4-53-priorities', visualHeading: 'Seven strategic priorities',
    visualIntro: 'Follow the seven priorities from focusing on priority markets to moving up the value chain.',
    imageAlt: 'Casemate step diagram of seven strategic priorities for competing in enterprise software and IT services',
    keyTerms: [
      { term: 'Reusable asset', definition: 'A component, template or tool that can be applied on many projects.' },
      { term: 'Value-chain move', definition: 'Shifting from basic execution toward consulting, architecture and product ownership.' },
      { term: 'Selective innovation', definition: 'Investing in a few chosen technology areas instead of every new trend.' },
      { term: 'Commercial discipline', definition: 'Tracking acquisition cost, retention, profitability and return on technology.' },
    ],
    recap: [
      'Strategy combines focused investment with operational discipline.',
      'Priorities should fit demand, capabilities, investment capacity and positioning.',
      'Competing in every category spreads resources too thinly.',
      'Execution quality turns opportunity into sustainable growth.',
    ],
    chapterRecap: 'Future competitiveness will depend on how effectively firms translate technology investment into differentiated, scalable, and trusted solutions. Strategic focus and execution quality are essential for converting industry opportunities into sustainable growth.',
    deepDiveTitle: 'Why focus beats breadth for smaller providers',
    body: <EntDeepDive paragraphs={[
      'A smaller provider that tries to match global platforms in every area will be outspent. One that chooses a segment and builds reusable assets, partnerships and references there can be best in its niche.',
      'The brief therefore stresses selecting priorities rather than adopting every one at once.' ]} evidence="The priorities are from the supplied brief; FPT figures are from its annual report and are company-reported; CMC statements are from its press release and VietnamPlus; MISA’s statement is from a VietnamPlus report of a company statement. The point on focus restates the brief in our own words." />,
    sources: citeEnt4('fptGlobalIt2025', 'cmcNtt', 'cmcJapan', 'vietnamplusIct'),
  }),
];

const quiz = entQuiz('ent-m4-l5', [
  { chapter: '1', objective: 'State the SWOT message', question: 'What does the industry SWOT conclude?', application: 'A leader assumes strong demand guarantees success. What is the correction?', correct: 'Demand is strong but success is not automatic: skills, security, competition and returns must be addressed', wrong: ['Success is automatic', 'Demand is weak', 'Only price matters'], explanation: 'Demand is not enough. Review Chapter 1.' },
  { chapter: '1', objective: 'List a weakness', question: 'Which is a listed industry weakness?', application: 'A team fills in a SWOT. Which belongs under weaknesses?', correct: 'Legacy systems, integration complexity, talent dependence and uneven service quality', wrong: ['Scalable software', 'AI adoption', 'Cloud migration'], explanation: 'These are weaknesses. Review Chapter 1.' },
  { chapter: '1', objective: 'Scope the SWOT', question: 'How should the industry SWOT be used?', application: 'A firm copies it as its own SWOT. What is wrong?', correct: 'It is a broad industry view and should be adapted for a specific provider or segment', wrong: ['It is a company SWOT', 'It is legally binding', 'It is a forecast'], explanation: 'It is industry-level. Review Chapter 1.' },
  { chapter: '1', objective: 'Read an official statement carefully', question: 'How should the 20% domestic cloud share be described?', application: 'A slide calls it a statistical office figure. What is the correction?', correct: 'As an official statement reported by the press', wrong: ['As an audited census', 'As a Gartner forecast', 'As a law'], explanation: 'Label the source. Review Chapter 1.' },
  { chapter: '2', objective: 'State the central challenge', question: 'What is the central strategic challenge?', application: 'A firm deploys many tools but sees no benefit. What was missing?', correct: 'Converting technological change into sustainable business value', wrong: ['Buying more tools', 'Avoiding all AI', 'Ignoring customers'], explanation: 'Value over tools. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain AI monetization', question: 'What choices does AI monetization involve?', application: 'A vendor adds AI features. How might it charge?', correct: 'Subscriptions, usage, feature tiers or outcome-based arrangements', wrong: ['Only free', 'Only hardware sales', 'Only advertising'], explanation: 'Pricing is unsettled. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a company claim', question: 'How should FPT’s 8.2% productivity gain be described?', application: 'A slide presents it as an industry average. What is the correction?', correct: 'As a company-reported claim about one provider', wrong: ['As a government statistic', 'As a Gartner forecast', 'As a law'], explanation: 'Label claims. Review Chapter 2.' },
  { chapter: '3', objective: 'State the strategy', question: 'What does a sustainable competitive strategy combine?', application: 'A firm chases every trend. What is it missing?', correct: 'Selective innovation, clear differentiation, trusted delivery and disciplined execution', wrong: ['Trend-chasing only', 'Price cuts only', 'Marketing only'], explanation: 'Focus and discipline. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain focus', question: 'Why can competing in every category be a problem?', application: 'A small provider enters ten segments. What is the risk?', correct: 'It can spread resources too thinly, particularly for smaller providers', wrong: ['It always wins', 'It lowers all costs', 'It removes competition'], explanation: 'Choose priorities. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe the Vietnamese move', question: 'How can Vietnamese service providers move up the value chain?', application: 'An outsourcer only supplies labour. What is the route up?', correct: 'From labour-based execution toward consulting, solution architecture, product ownership and strategic technology partnerships', wrong: ['By cutting prices only', 'By avoiding exports', 'By dropping engineering'], explanation: 'Value-chain move. Review Chapter 3.' },
]);

export const LESSON_ENT4_5: EntM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read an industry SWOT, name the main strategic challenges and set strategic priorities that fit capabilities and demand.',
    keyTakeaways: [
      'The industry has strong demand but success is not automatic.',
      'A SWOT is useful only when each finding is tied to an action.',
      'The central challenge is turning technological change into sustainable business value.',
      'Strategy means selecting priorities and executing with discipline.',
      'Company claims, official statements and targets are labelled and are not outcomes.',
    ],
    businessImplications: 'Tie each SWOT finding to an action, prove the value of AI investments and choose a few priorities where you can build a defensible advantage.',
    remember: 'Focus, trust and proof turn technology change into lasting growth.',
    nextLesson: 'Back to module overview',
  },
};
