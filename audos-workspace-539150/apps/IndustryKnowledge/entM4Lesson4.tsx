import { EntDeepDive, citeEnt4, entM4Chapter, entQuiz } from './entM4Core';
import type { EntM4LessonBundle } from './entM4Core';

const LESSON = '4. Key Success Factors';

const deck = [
  entM4Chapter({
    title: 'Technology Innovation and Product Differentiation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why innovation is a success factor and when it turns into commercial advantage.',
    mateIntro: 'New technology only counts when customers can trust it and see the benefit. Innovation is the start, not the finish.',
    keyInsight: 'Innovation creates competitive advantage only when it delivers useful, secure, and commercially sustainable outcomes. Providers must balance experimentation with reliability, governance, integration, and customer adoption.',
    statTiles: [
      { value: '6', label: 'Key innovation activities', subtitle: 'R&D to continuous improvement', description: 'Research and development, AI integration, product usability, interoperability, industry specialization and continuous improvement.' },
      { value: '40%', label: 'Share of enterprise application portfolios predicted to include custom apps built on AI-native platforms by 2030', subtitle: 'Gartner prediction, up from 2% in 2025', description: 'An analyst prediction about global enterprises.' },
      { value: '72B', label: 'Parameters in the language model CMC says it trained', subtitle: 'VietnamPlus, press report of a company statement', description: 'A company claim about one model.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figure is a prediction, and the CMC figure is a company claim as reported by the press.',
    narrative: [
      { label: 'What it is', text: 'Technology innovation is a core success factor because enterprise customers continually seek better ways to automate processes, manage information, improve decision-making, and strengthen operational resilience. Providers must evolve their products and services as cloud computing, AI, data platforms, cybersecurity, and software development practices change.' },
      { label: 'Why it is happening', text: 'Innovation includes both developing new technology and applying existing technology to real business problems. In 2026, AI-native development and multiagent systems are among the strategic technology trends identified by Gartner, while Deloitte highlights the shift toward AI-first products and engineering. These developments increase the importance of innovation speed, practical AI deployment, and sustainable product economics.' },
      { label: 'Real-world example', text: 'Providers invest in product improvements, software architecture, automation and emerging technologies; embed AI in workflows while maintaining data protection, human oversight and appropriate access controls; design intuitive interfaces and workflows that reduce training and improve adoption; make solutions work with existing applications, databases, cloud environments and third-party systems; build solutions for sector-specific workflows, regulations and operating conditions; and use customer feedback, product analytics, testing and release management to refine offerings.' },
      { label: 'Vietnam example', text: 'Press reports of company statements say CMC trained a 72-billion-parameter language model and completed its CMC Cloud platform, VNPT deployed generative AI platforms at 30 administrative units, and MISA integrated AI agents for more than 170,000 enterprises. FPT reports an 8.2% productivity gain from its AI-first strategy, a company claim. These are not independently verified results, and no public data on customer adoption or returns from these AI products was found.' },
      { label: 'Business impact', text: 'Technology innovation supports differentiation, but commercial success depends on converting innovation into trusted products and measurable customer value. Companies must continuously improve their capabilities without compromising reliability or security.' },
    ],
    visualKind: 'ent-m4-41-innovation', visualHeading: 'From research to continuous improvement',
    visualIntro: 'Follow the six steps from research and development to continuous improvement.',
    imageAlt: 'Casemate step diagram of six innovation activities from research and development to continuous improvement',
    keyTerms: [
      { term: 'AI-native development', definition: 'Building software with generative AI so small teams can produce applications faster.' },
      { term: 'Multiagent system', definition: 'A set of specialised AI agents that share work on a complex task.' },
      { term: 'Interoperability', definition: 'The ability of different systems to exchange and use each other’s data.' },
      { term: 'Product analytics', definition: 'Data on how customers use a product, used to improve it.' },
    ],
    recap: [
      'Customers keep looking for better automation, information, decisions and resilience.',
      'Innovation means new technology and new uses of existing technology.',
      'AI-native development and AI-first products raise the stakes on speed and economics.',
      'Value comes from useful, secure and commercially sustainable results.',
    ],
    chapterRecap: 'Technology innovation supports differentiation, but commercial success depends on converting innovation into trusted products and measurable customer value. Companies must continuously improve their capabilities without compromising reliability or security.',
    deepDiveTitle: 'Why speed to build is not speed to value',
    body: <EntDeepDive paragraphs={[
      'AI-native tools make software cheaper and faster to create, which also makes it easier for competitors and customers to build their own. Advantage then shifts toward trust, integration, governance and proof of results.',
      'Gartner itself advises piloting, security guardrails and platform teams, which recognises that speed without control brings risk.' ]} evidence="The innovation activities are from the supplied brief; the 2026 trends are from Gartner and Deloitte; the Vietnamese AI points are from a VietnamPlus report of company statements, and the productivity claim is from FPT’s annual report. The shift in advantage restates points in the Gartner and Deloitte material in our own words." />,
    sources: citeEnt4('gartnerTrends2026', 'deloitteSoftware', 'vietnamplusIct', 'fptGlobalIt2025'),
  }),
  entM4Chapter({
    title: 'Talent, Delivery Excellence, and Customer Relationships', chapterTitle: LESSON, readingTime: '6',
    objective: 'Show how skilled people and reliable delivery reinforce customer trust.',
    mateIntro: 'Good people make good delivery, and good delivery earns trust. The loop keeps feeding itself.',
    keyInsight: 'Talent and customer trust reinforce each other. Skilled teams improve delivery quality, while strong customer relationships provide the feedback, domain knowledge, and recurring business needed to develop deeper expertise.',
    statTiles: [
      { value: '6', label: 'Key talent and delivery practices', subtitle: 'Recruitment to knowledge retention', description: 'Technical recruitment, continuous learning, delivery governance, customer success, relationship management and knowledge retention.' },
      { value: '132,000+', label: 'Engineers employed by the 81 firms in VINASA’s 2025 Top 10 programme', subtitle: 'VietnamFinance, reporting VINASA', description: 'Firms with combined 2024 revenue above VND 160,000 billion.' },
      { value: '5,800+', label: 'Employees CMC reports', subtitle: 'Vietnam.vn press report, company figure', description: 'CMC Global describes a pool of 3,000-plus talents.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are association and company figures, and the 132,000 covers the verified Top 10 firms only.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software and IT services depend heavily on skilled employees who can design, develop, implement, secure, and maintain complex technology systems. Talent availability affects delivery capacity, project quality, innovation, and the ability to serve customers across industries and geographies.' },
      { label: 'Why it is happening', text: 'Customer relationships are equally important because enterprise technology projects often involve long implementation periods, organizational change, and ongoing technical support. Providers that communicate clearly, understand customer operations, and maintain consistent service quality are more likely to retain accounts and expand existing engagements.' },
      { label: 'Real-world example', text: 'Providers attract software engineers, architects, data specialists, cybersecurity experts and cloud professionals; maintain certifications, technical training, leadership development and knowledge-sharing programmes; apply clear project milestones, quality assurance, risk management and change control; track adoption, service quality, business outcomes, renewal risks and improvement opportunities; keep communication open among technical teams, business stakeholders, procurement and executive sponsors; and document systems, standardise delivery methods and reduce reliance on individual employees.' },
      { label: 'Vietnam example', text: 'VINASA’s Top 10 firms employ more than 132,000 engineers, and CMC reports more than 5,800 employees and describes a talent pipeline that includes CMC University, which are association and company statements. A TopDev report cited by VnEconomy estimates a Vietnamese shortage of 150,000 to 200,000 tech workers a year, and Viet Nam News reports that only about 30% of IT graduates are job-ready. Law 71/2025/QH15 covers human resources and incentives for the digital technology industry. No public data on staff turnover or customer retention at Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Technical talent and reliable execution are central to competitiveness, especially for service providers. Strong customer relationships further support retention, repeat business, and the accumulation of industry-specific expertise.' },
    ],
    visualKind: 'ent-m4-42-talent', visualHeading: 'Six practices that join talent and trust',
    visualIntro: 'Explore the six practices around the idea of talent and trust.',
    imageAlt: 'Casemate mind map of six practices that join talent and customer trust',
    keyTerms: [
      { term: 'Delivery governance', definition: 'Milestones, quality checks, risk management and change control that keep projects on track.' },
      { term: 'Customer success', definition: 'Tracking whether customers achieve the outcomes they bought technology for.' },
      { term: 'Knowledge retention', definition: 'Documenting systems and methods so expertise does not depend on one person.' },
      { term: 'Certification', definition: 'Formal proof that staff can implement a specific technology.' },
    ],
    recap: [
      'Skilled staff set delivery capacity, quality and innovation.',
      'Long projects make customer relationships equally important.',
      'Learning, governance and knowledge retention sustain quality.',
      'Trust brings feedback, domain knowledge and recurring work.',
    ],
    chapterRecap: 'Technical talent and reliable execution are central to competitiveness, especially for service providers. Strong customer relationships further support retention, repeat business, and the accumulation of industry-specific expertise.',
    deepDiveTitle: 'Why knowledge retention is a competitive asset',
    body: <EntDeepDive paragraphs={[
      'If a project depends on one expert, losing that person can stall delivery and damage the customer relationship. Documented methods and shared knowledge keep quality steady when staff move on.',
      'In a market with scarce talent, that resilience is hard for rivals to copy quickly.' ]} evidence="The practices are from the supplied brief; the engineer count is from VietnamFinance reporting VINASA; CMC figures are from a press report and its marketing material; the workforce figures are from VnEconomy and Viet Nam News; the law is from the Ministry of Science and Technology database. The reasoning on knowledge retention is our own." />,
    sources: citeEnt4('vinasaTop10', 'cmcGrowth', 'cmcDeck', 'vneconomyTalent', 'vietnamnewsItWorkforce', 'digitalTechLaw'),
  }),
  entM4Chapter({
    title: 'Commercial Sustainability, Security, and Scalability', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how revenue quality, cost control, security and scalability keep growth sustainable.',
    mateIntro: 'Fast growth can break the very things that win customers: cost control, security and service. Staying power needs balance.',
    keyInsight: 'Long-term success requires a balance between growth, profitability, trust, and operational resilience. Rapid expansion without disciplined cost management or security controls can weaken the very advantages that attract customers.',
    statTiles: [
      { value: '6', label: 'Key sustainability practices', subtitle: 'Revenue quality to risk diversification', description: 'Revenue quality, cost management, scalability, cybersecurity, compliance and governance, and risk diversification.' },
      { value: '1 Jul 2026', label: 'Effective date of Vietnam’s Law on Cybersecurity 116/2025/QH15', subtitle: 'Luat Viet Nam, English summary', description: 'It replaces the 2018 Cybersecurity Law.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most violations of the Personal Data Protection Law', subtitle: 'Law 91/2025/QH15, effective 1 January 2026', description: 'One of several consequences of non-compliance.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Legal dates and fines come from official or secondary summaries and should be checked against the current text before use.',
    narrative: [
      { label: 'What it is', text: 'Successful providers must sustain a business model that can fund innovation, support customers, and remain profitable as demand changes. Software vendors often benefit from subscription and usage-based revenue, while IT service firms must manage staffing costs, project utilization, delivery efficiency, and the balance between new business and recurring contracts.' },
      { label: 'Why it is happening', text: 'Security, compliance, and scalability are increasingly important as enterprise systems handle sensitive information and mission-critical operations. Providers must demonstrate that their products and services can grow with customer needs while maintaining appropriate performance, reliability, and governance.' },
      { label: 'Real-world example', text: 'Providers build predictable subscription, renewal and managed-service revenue where appropriate; control cloud infrastructure expenses, project overruns, staffing costs and support requirements; design platforms and delivery processes that can accommodate larger workloads and more customers; apply secure development, identity controls, vulnerability management, monitoring and incident response; address privacy, data protection, contractual and sector-specific requirements; and reduce excessive dependence on a single customer, vendor, geography, technology platform or revenue stream.' },
      { label: 'Vietnam example', text: 'FPT reports pre-tax profit of VND 5,467 billion on global IT services revenue of VND 35,382 billion and VND 416 billion on domestic revenue of VND 9,093 billion in 2025, which is about 15.5% and 4.6% by our own division, and says it is shifting overseas contracts toward managed services. CMC is reported to have earned VND 737 billion pre-tax on VND 10,555 billion, about 7.0%, as a whole group. These are not like for like. Vietnam’s Personal Data Protection Law took effect on 1 January 2026 and its Law on Cybersecurity takes effect on 1 July 2026, and the Deputy Prime Minister was reported as noting that most of the domestic cloud market belongs to foreign firms, a dependency risk. No public Vietnam data on customer concentration at providers was found.' },
      { label: 'Business impact', text: 'Commercial sustainability depends on reliable revenue, disciplined costs, scalable delivery, and strong security practices. Providers that integrate these capabilities into their operating models are better positioned to sustain growth and customer confidence.' },
    ],
    visualKind: 'ent-m4-43-sustainability', visualHeading: 'Pre-tax profit as a share of revenue',
    visualIntro: 'Compare three company-level margins, noting that they are not like for like.',
    imageAlt: 'Casemate bar chart of pre-tax profit as a share of revenue for FPT global and domestic IT services and the CMC group',
    keyTerms: [
      { term: 'Revenue quality', definition: 'How predictable, repeatable and profitable a firm’s revenue is.' },
      { term: 'Scalability', definition: 'The ability to serve more customers or larger workloads without a matching rise in cost or failure.' },
      { term: 'Incident response', definition: 'The steps taken to detect, contain and report a security incident.' },
      { term: 'Risk diversification', definition: 'Spreading dependence across customers, vendors, geographies and revenue streams.' },
    ],
    recap: [
      'A sustainable model funds innovation and support while staying profitable.',
      'Security, compliance and scalability become more important as systems grow critical.',
      'Fast growth without cost discipline or security can erode advantage.',
      'Diversification reduces reliance on one customer, vendor or region.',
    ],
    chapterRecap: 'Commercial sustainability depends on reliable revenue, disciplined costs, scalable delivery, and strong security practices. Providers that integrate these capabilities into their operating models are better positioned to sustain growth and customer confidence.',
    deepDiveTitle: 'Why growth can outrun control',
    body: <EntDeepDive paragraphs={[
      'Hiring ahead of demand, accepting underpriced projects or skipping security work can all buy short-term growth at the cost of margins and trust. The damage often appears later as overruns, incidents or lost customers.',
      'Tracking acquisition cost, project profitability and security measures alongside growth keeps expansion honest.' ]} evidence="The sustainability practices are from the supplied brief; FPT figures are from its earnings and annual reports and are company-reported; CMC figures are from a press report; the margins are our own division; the laws are from the Official Gazette and Luat Viet Nam summaries; the cloud-share statement is from a press report. The discussion of growth outrunning control is our own." />,
    sources: citeEnt4('fptEarnings2025', 'fptGlobalIt2025', 'cmcGrowth', 'pdplGazette', 'cyberLaw2025'),
  }),
];

const quiz = entQuiz('ent-m4-l4', [
  { chapter: '1', objective: 'State when innovation pays', question: 'When does innovation create competitive advantage?', application: 'A firm launches an AI feature. What must it also show?', correct: 'When it delivers useful, secure and commercially sustainable outcomes', wrong: ['Whenever it is new', 'Whenever it is expensive', 'Whenever it is complex'], explanation: 'Outcomes matter. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall 2026 trends', question: 'Which trend is identified by Gartner for 2026?', application: 'A strategist cites trends. Which belongs?', correct: 'AI-native development platforms and multiagent systems', wrong: ['Typewriters', 'Fax networks', 'Paper ledgers'], explanation: 'These are 2026 trends. Review Chapter 1.' },
  { chapter: '1', objective: 'Read predictions carefully', question: 'How should Gartner’s 40% figure be described?', application: 'A slide says 40% of firms have already done this. What is the correction?', correct: 'As an analyst prediction for 2030, up from 2% in 2025', wrong: ['As audited 2025 data', 'As a Vietnam statistic', 'As a law'], explanation: 'Predictions are not measurements. Review Chapter 1.' },
  { chapter: '1', objective: 'Label company claims', question: 'How should CMC’s 72-billion-parameter model be described?', application: 'A slide calls it independently verified. What is wrong?', correct: 'As a company claim reported by the press', wrong: ['As a government standard', 'As a Gartner finding', 'As a law'], explanation: 'Label claims. Review Chapter 1.' },
  { chapter: '2', objective: 'State the talent-trust link', question: 'How do talent and customer trust relate?', application: 'A firm invests only in recruitment. What is it missing?', correct: 'They reinforce each other: skilled teams improve delivery, and trust brings feedback and recurring business', wrong: ['They are unrelated', 'Trust replaces skill', 'Skill replaces trust'], explanation: 'A loop. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a delivery practice', question: 'Which is a delivery governance practice?', application: 'A project plan lists controls. Which belongs?', correct: 'Project milestones, quality assurance, risk management and change control', wrong: ['Logo design', 'Office decor', 'Email signatures'], explanation: 'Governance keeps delivery reliable. Review Chapter 2.' },
  { chapter: '2', objective: 'Read workforce data', question: 'How should the 150,000–200,000 annual shortage be described?', application: 'A slide calls it an official statistic. What is the correction?', correct: 'As a recruiter estimate reported by a news outlet', wrong: ['As a census count', 'As a law', 'As a Gartner forecast'], explanation: 'Label estimates. Review Chapter 2.' },
  { chapter: '3', objective: 'State the balance', question: 'What does long-term success require?', application: 'A firm grows fast and cuts security spending. What is the risk?', correct: 'A balance between growth, profitability, trust and operational resilience', wrong: ['Growth only', 'Profit only', 'Security only'], explanation: 'Balance matters. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a diversification target', question: 'Which dependence should providers reduce?', application: 'A firm gets 80% of revenue from one client. What should it do?', correct: 'Excessive dependence on a single customer, vendor, geography, technology platform or revenue stream', wrong: ['Dependence on gravity', 'Dependence on sunlight', 'Dependence on rainfall'], explanation: 'Diversify risk. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a calculation correctly', question: 'Why are the FPT and CMC margins not like for like?', application: 'A slide ranks them. What is wrong?', correct: 'FPT shows segments, CMC shows a whole group on a basis not stated, and they are our own divisions', wrong: ['They are in different currencies', 'They are forecasts', 'They are legal limits'], explanation: 'Compare like with like. Review Chapter 3.' },
]);

export const LESSON_ENT4_4: EntM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how innovation, talent, trust, financial discipline, security and scalability combine to sustain success.',
    keyTakeaways: [
      'Innovation creates advantage only when outcomes are useful, secure and commercially sustainable.',
      'Talent and customer trust reinforce each other.',
      'Growth must be balanced with cost discipline, security and resilience.',
      'AI claims, predictions and company margins are labelled and not mixed.',
      'Some Vietnam data, such as turnover and customer concentration, was not found.',
    ],
    businessImplications: 'Invest in innovation that customers can trust, protect talent and knowledge, and keep growth within cost, security and risk limits.',
    remember: 'Advantage lasts only if growth, trust and control move together.',
    nextLesson: 'SWOT & Strategic Challenges',
  },
};
