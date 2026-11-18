import { EntDeepDive, citeEnt5, entM5Chapter, entQuiz } from './entM5Core';
import type { EntM5LessonBundle } from './entM5Core';

const LESSON = '1. Consumer Trends';

const deck = [
  entM5Chapter({
    title: 'Enterprise Customer Expectations and Buying Behavior', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe what enterprise buyers now expect and why purchasing is shifting toward outcomes and evidence.',
    mateIntro: 'Buyers used to compare feature lists. Now they ask what the system will change in the business, how fast, and how risky it is.',
    keyInsight: 'Enterprise buyers are shifting from buying technology features to buying business outcomes. Providers that show a clear return, lower implementation risk, and support for long-term objectives are better placed to win and keep customers.',
    statTiles: [
      { value: '6', label: 'Key buyer expectations', subtitle: 'ROI to evidence-based procurement', description: 'Return on investment, faster implementation, integration, security and reliability, user adoption, and evidence-based procurement.' },
      { value: '69%', label: 'Share of surveyed Vietnamese businesses at basic digital use, such as email and accounting software', subtitle: 'VINASME and Ministry survey, 2025, reported by VietnamPlus', description: 'Only 10% were fully digitised with AI.' },
      { value: '35%', label: 'Share of firms in one World Bank case study still using a free cloud platform about 18 months later', subtitle: 'World Bank blog, 605 SMEs', description: 'Close to 80% had used it after initial training.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures describe one national survey and one provider’s trial, not all enterprise buyers, and they should not be compared with each other.',
    narrative: [
      { label: 'What it is', text: 'Enterprise customers increasingly evaluate software and IT services through the business outcomes they can produce. Buyers still compare functionality, price and vendor reputation, but they also ask how quickly a solution can be deployed, how it will connect to existing systems, and how success will be measured after go-live.' },
      { label: 'Why it is happening', text: 'Software is easier to try and cheaper to start with than in the past, which makes failed implementations more visible and more costly in staff time. Buyers have learned that licences alone do not create value, so they ask for references, pilots and documented metrics, and they involve finance, operations and security leaders alongside IT.' },
      { label: 'Real-world example', text: 'Buyers expect a return on investment, meaning lower costs, higher productivity, faster processes or better revenue performance; value quickly, without long deployment cycles or heavy customisation; integration with existing ERP, CRM, finance, HR, data and operational platforms; data protection, uptime, disaster recovery, access controls and vendor risk management; usability, training, workflow fit and change management so that employees actually use the system; and evidence in the form of case studies, references, pilot programmes and documented performance metrics.' },
      { label: 'Vietnam example', text: 'A national survey of businesses across 60 provinces by VINASME and the Ministry of Science and Technology, reported by VietnamPlus, found 69% at basic use, 16% at system integration, 10% fully digitised with AI and 5% not started. A World Bank case study of a Vietnamese cloud ERP provider found that 605 SMEs took up a free one-year offer, close to 80% used it after initial training, and only 35% still used it about 18 months later, which shows that adoption, not signing up, is the hard part. These are one survey and one provider’s trial, and no public Vietnam-wide data on enterprise buying criteria was found.' },
      { label: 'Business impact', text: 'Enterprise customers are becoming more outcome-focused, more cautious about risk and more demanding of proof. Providers that can show measurable results, simple integration and trustworthy delivery will have an advantage over providers that compete on features alone.' },
    ],
    visualKind: 'ent-m5-11-buying', visualHeading: 'Six things enterprise buyers now look for',
    visualIntro: 'Explore the six expectations around the idea of outcome-based buying.',
    imageAlt: 'Casemate mind map of six enterprise buyer expectations in enterprise software and IT services',
    keyTerms: [
      { term: 'Return on investment (ROI)', definition: 'The benefit a customer gets compared with what it spends.' },
      { term: 'Time to value', definition: 'How long it takes from signing a contract until the customer sees a benefit.' },
      { term: 'Pilot', definition: 'A small, time-limited trial used to test a solution before a full commitment.' },
      { term: 'Change management', definition: 'The work of preparing people to adopt a new way of working.' },
    ],
    recap: [
      'Buyers want outcomes, not feature lists.',
      'Speed, integration, security and adoption all influence the decision.',
      'References, pilots and metrics reduce perceived risk.',
      'Winning and keeping customers depends on measurable results.',
    ],
    chapterRecap: 'Enterprise customers are becoming more outcome-focused, more cautious about risk and more demanding of proof. Providers that can show measurable results, simple integration and trustworthy delivery will have an advantage over providers that compete on features alone.',
    deepDiveTitle: 'Why adoption is the real test of a purchase',
    body: <EntDeepDive paragraphs={[
      'A contract is not an outcome. In the World Bank case study, a free offer drew 605 firms and most of them used it after training, yet about 18 months later only 35% still did. The product had not changed; use had faded.',
      'Buyers who have seen this pattern ask vendors how they will drive adoption, not only how they will deploy. Providers that can answer with training, support and usage data have a stronger case.' ]} evidence="The six expectations are the content of the chapter’s activity list; the survey is from VietnamPlus reporting a VINASME and Ministry of Science and Technology survey; the trial figures are from the World Bank blog. The reading that adoption is the real test is our own interpretation of one case study." />,
    sources: citeEnt5('vietnamplusSme', 'worldBankSme', 'gartnerJuly2026'),
  }),
  entM5Chapter({
    title: 'Demand for AI-Enabled Productivity and Automation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why demand for AI is rising and why value depends on use cases, data and governance.',
    mateIntro: 'Everyone is buying AI. The harder question is which tasks it actually improves, and what the business has to fix first.',
    keyInsight: 'Demand for AI is growing quickly, but customers are asking for practical productivity gains rather than technology for its own sake. Providers must connect AI to specific workflows, prepare the data behind it, and put governance around it.',
    statTiles: [
      { value: '6', label: 'Key forms of AI-enabled demand', subtitle: 'Productivity to measurable results', description: 'Customer service, document and knowledge work, software development, IT operations, finance and back-office automation, and decision support.' },
      { value: '49.5%', label: 'Forecast growth in worldwide AI spending in 2026', subtitle: 'Gartner, September 2026 forecast', description: 'About US$2.67 trillion, up from about US$1.79 trillion in 2025.' },
      { value: '10%', label: 'Share of surveyed Vietnamese businesses fully digitised with AI', subtitle: 'VINASME and Ministry survey, 2025', description: 'A snapshot of adoption among businesses of all sizes.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Gartner’s figure is a worldwide forecast that overlaps broader IT categories, and the survey figure is a different measure from Gartner’s spending, so they are not comparable.',
    narrative: [
      { label: 'What it is', text: 'Organisations are looking to AI to reduce repetitive work, speed up decisions and improve service quality. In enterprise software, this appears as AI assistants inside business applications, automation of multistep workflows, and AI used by service providers to write, test and support software.' },
      { label: 'Why it is happening', text: 'Software vendors are embedding AI features, including agentic AI, in the products customers already use, which lowers the effort of trying them. At the same time, buyers are under pressure to raise productivity without adding staff, and AI is the most visible lever. Gartner notes that enterprises are turning to service providers less for large transformation programmes and more for smaller projects, which fits a market that wants specific, measurable gains.' },
      { label: 'Real-world example', text: 'Customers look for AI that can answer service requests and summarise cases; search, draft and summarise documents and enterprise knowledge; write, test and document software; triage IT incidents and monitor operations; process invoices and automate finance and back-office tasks; and support decisions through analytics. In each case buyers ask for clear use cases, reliable data, integration with existing systems, human oversight and measurable results.' },
      { label: 'Vietnam example', text: 'FPT reports an 8.2% productivity gain from its AI-first strategy in its global IT services business, a company claim. VietnamPlus reports MISA integrating AI agents for more than 170,000 enterprises, a press report of company statements, while the national survey found only 10% of businesses fully digitised with AI. Together these show supply moving ahead of broad adoption. No public Vietnam-wide figure for spending on AI-enabled enterprise software was found.' },
      { label: 'Business impact', text: 'AI is becoming a standard part of the enterprise software and IT services offer. The strongest propositions will link AI to a specific workflow with a measurable result, backed by clean data, security controls and human supervision.' },
    ],
    visualKind: 'ent-m5-12-ai-demand', visualHeading: 'Worldwide AI spending forecast',
    visualIntro: 'Read the three bars as a forecast path rather than a measured result.',
    imageAlt: 'Casemate bar chart of Gartner worldwide AI spending for 2025, 2026 and 2027',
    keyTerms: [
      { term: 'AI agent', definition: 'Software that can plan and carry out several steps of a task with some autonomy.' },
      { term: 'Use case', definition: 'A specific task or workflow where a technology is applied for a defined benefit.' },
      { term: 'Data readiness', definition: 'How well an organisation’s data is organised, accurate and accessible enough to be used by AI.' },
      { term: 'Human oversight', definition: 'People reviewing or approving what an AI system produces or does.' },
    ],
    recap: [
      'AI spending is forecast to rise sharply, but forecasts are not outcomes.',
      'Buyers want productivity gains tied to specific workflows.',
      'Data readiness, integration and governance decide whether AI delivers.',
      'Supply of AI features is moving ahead of broad adoption in Vietnam.',
    ],
    chapterRecap: 'AI is becoming a standard part of the enterprise software and IT services offer. The strongest propositions will link AI to a specific workflow with a measurable result, backed by clean data, security controls and human supervision.',
    deepDiveTitle: 'Why a bigger AI budget does not guarantee a better result',
    body: <EntDeepDive paragraphs={[
      'Gartner’s forecast covers infrastructure, software, services and other AI-related spending, and about 56% of the 2026 figure is infrastructure. Much of the growth is therefore in the physical and platform layers that make AI possible, not only in finished business applications.',
      'For a customer, the practical question is narrower: which workflow improves, by how much, and how will it be measured?' ]} evidence="The forecast figures are from Gartner’s September 2026 press release; the survey is from VietnamPlus; the productivity claim is from FPT’s annual report; the MISA statement is from a VietnamPlus press report of company statements. The reading that value depends on a narrow use case is our own." />,
    sources: citeEnt5('gartnerAi', 'vietnamplusSme', 'fptGlobalIt2025', 'vietnamplusIct'),
  }),
  entM5Chapter({
    title: 'Demand for Flexible, Scalable, and Industry-Specific Solutions', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why customers want modular, scalable and sector-specific technology that avoids wholesale replacement.',
    mateIntro: 'A buyer rarely wants to replace everything at once. Flexible technology lets them start small, scale up and keep what already works.',
    keyInsight: 'Customers increasingly want technology they can adopt in steps, scale as needs change and adapt to the way their sector works. Flexibility and industry fit are now buying criteria alongside price and features.',
    statTiles: [
      { value: '6', label: 'Key flexibility options', subtitle: 'Modular purchasing to low-code', description: 'Modular purchasing, cloud scalability, industry-specific solutions, hybrid deployment, managed services, and low-code and no-code tools.' },
      { value: '21.0%', label: 'Estimated paid penetration of addressable Vietnamese SMEs by cloud ERP in 2025', subtitle: 'Ken Research, about 183,000 paid subscriptions', description: 'A third-party estimate for one product category.' },
      { value: '97%', label: 'Share of Vietnam’s roughly 900,000 active businesses that were SMEs in 2024', subtitle: 'Ken Research', description: 'It shows how many customers need affordable, flexible offers.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Ken Research figures are third-party estimates of cloud ERP for SMEs only and exclude standalone accounting products and large-enterprise contracts.',
    narrative: [
      { label: 'What it is', text: 'Enterprise customers increasingly prefer solutions that can start with a limited scope, grow as needs expand and reflect the terminology, processes and rules of their own sector. This reduces up-front risk and makes it easier to prove value before committing more budget.' },
      { label: 'Why it is happening', text: 'Business conditions change faster than multi-year implementation plans, and many organisations run a mix of old and new systems that cannot be replaced overnight. Cloud services make capacity easy to adjust, while generic software often needs heavy customisation to fit a sector. Customers therefore look for modular products, deployment options and providers that already understand their industry.' },
      { label: 'Real-world example', text: 'Customers choose modular purchasing, acquiring selected modules or services instead of one large implementation; cloud scalability, adjusting computing resources and service capacity as workloads change; industry-specific applications and workflows for sector terminology and processes; hybrid deployment that combines public cloud, private cloud and on-premises systems; managed services that outsource selected IT operations for continuity and specialist expertise; and low-code and no-code tools that let business users build simple workflows within governance boundaries.' },
      { label: 'Vietnam example', text: 'MISA describes its AMIS platform as a cloud platform of more than 40 applications across finance, sales, HR and operations with a pay-as-you-go model, a vendor claim. Ken Research estimates about 183,000 paid cloud ERP subscriptions among Vietnamese SMEs in 2025, 21.0% of addressable SMEs, in a market where SMEs are over 97% of about 900,000 active businesses. The national survey found 69% of businesses at basic use, which suggests many would begin with a small step. No public data on demand for industry-specific software by Vietnamese sector was found.' },
      { label: 'Business impact', text: 'Customers want technology that fits their environment and can change with the business. Providers that offer modular entry points, flexible deployment and real sector knowledge can lower buying risk and build longer relationships.' },
    ],
    visualKind: 'ent-m5-13-flexible', visualHeading: 'Six ways customers buy flexibility',
    visualIntro: 'Move through the six cards to see how each option lowers the risk of a large commitment.',
    imageAlt: 'Casemate cards showing six ways customers buy flexible, scalable and industry-specific solutions',
    keyTerms: [
      { term: 'Modular software', definition: 'Software sold as separate components that can be added over time.' },
      { term: 'Elastic capacity', definition: 'Computing resources that can be increased or reduced quickly as demand changes.' },
      { term: 'Vertical solution', definition: 'Software designed for the needs of one industry.' },
      { term: 'Low-code', definition: 'A way to build applications with little hand-written code, using visual tools.' },
    ],
    recap: [
      'Customers prefer to start small and expand.',
      'Cloud, hybrid and managed options make capacity adjustable.',
      'Sector-specific fit reduces customisation effort.',
      'Low-code tools need governance to stay safe.',
    ],
    chapterRecap: 'Customers want technology that fits their environment and can change with the business. Providers that offer modular entry points, flexible deployment and real sector knowledge can lower buying risk and build longer relationships.',
    deepDiveTitle: 'Why flexibility lowers the risk of buying',
    body: <EntDeepDive paragraphs={[
      'A large, one-step implementation puts the whole budget at risk before value is proved. A modular entry lets the customer test one process, measure the result and then decide on the next step.',
      'For the provider, the same approach means a smaller first sale but a clearer path to expansion if the first step works.' ]} evidence="The six options are the content of the chapter’s activity list; the platform description is MISA’s own; the penetration and SME figures are Ken Research estimates; the survey is from VietnamPlus. The comment on risk is our own reasoning." />,
    sources: citeEnt5('kenCloudErp', 'misaPlatform', 'vietnamplusSme'),
  }),
];

const quiz = entQuiz('ent-m5-l1', [
  { chapter: '1', objective: 'State the shift in buying', question: 'How is enterprise buying behaviour changing?', application: 'A vendor leads its pitch with a long feature list. What are buyers looking for instead?', correct: 'Business outcomes, supported by a clear return and lower implementation risk', wrong: ['Only the lowest licence price', 'The most features', 'The longest contract'], explanation: 'Outcomes lead. Review Chapter 1.' },
  { chapter: '1', objective: 'Name evidence buyers request', question: 'Which is evidence that buyers often request before purchase?', application: 'A buyer wants proof before signing. What might it ask for?', correct: 'Case studies, references, pilot programmes and documented performance metrics', wrong: ['A larger office', 'A new logo', 'A longer slide deck'], explanation: 'Evidence reduces risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a case study correctly', question: 'What did the World Bank case study show about a free cloud platform offer?', application: 'A slide says sign-ups prove demand. What is the correction?', correct: 'About 80% used it after training but only 35% still used it about 18 months later', wrong: ['All 605 firms kept using it', 'No firm used it', 'It proved all Vietnamese firms are digitised'], explanation: 'Adoption fades without support. Review Chapter 1.' },
  { chapter: '1', objective: 'Use evidence honestly', question: 'What should be said about Vietnam-wide data on enterprise buying criteria?', application: 'A slide lists the top buying criteria in Vietnam as a statistic. What is the correction?', correct: 'No public Vietnam-wide data was found, so only one survey and one case study are shown', wrong: ['It is published by Gartner', 'It is set by law', 'It equals the 69% survey figure'], explanation: 'State evidence gaps. Review Chapter 1.' },
  { chapter: '2', objective: 'Describe the AI spending forecast', question: 'How should Gartner’s US$2.67 trillion figure for 2026 be described?', application: 'A slide calls it the revenue of AI software vendors. What is the correction?', correct: 'As a forecast of worldwide AI spending that includes infrastructure, software and services', wrong: ['As audited Vietnam revenue', 'As a legal requirement', 'As spending on software only'], explanation: 'Scope matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain what AI buyers ask for', question: 'What do customers increasingly ask of AI offers?', application: 'A vendor adds an AI button. What will buyers want to see?', correct: 'Practical productivity gains tied to specific workflows', wrong: ['AI for its own sake', 'Fewer security controls', 'No human review'], explanation: 'Value is practical. Review Chapter 2.' },
  { chapter: '2', objective: 'Name AI success conditions', question: 'Which conditions affect whether AI delivers value?', application: 'A pilot fails because the data is messy. Which condition was missing?', correct: 'Data readiness, integration with existing systems and governance', wrong: ['A bigger logo', 'More meetings', 'A longer contract'], explanation: 'Foundations matter. Review Chapter 2.' },
  { chapter: '3', objective: 'Define modular purchasing', question: 'What is modular purchasing?', application: 'A customer buys only the HR module first. What is it doing?', correct: 'Acquiring selected modules or services instead of one large implementation', wrong: ['Buying hardware only', 'Cancelling all software', 'Building everything in-house'], explanation: 'Start small and expand. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe hybrid deployment', question: 'What does hybrid deployment combine?', application: 'A bank keeps core systems in its own data centre and uses public cloud for analytics. What is this?', correct: 'Public cloud, private cloud and on-premises systems where necessary', wrong: ['Only public cloud', 'Only paper records', 'Only mobile apps'], explanation: 'Mixed estates are common. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a market estimate correctly', question: 'How should Ken Research’s 21.0% paid penetration be described?', application: 'A slide presents it as the share of all Vietnamese businesses using software. What is the correction?', correct: 'As a third-party estimate of paid cloud ERP penetration among addressable SMEs in 2025', wrong: ['As an official census', 'As a statement about banks', 'As a law'], explanation: 'It is a narrow estimate. Review Chapter 3.' },
]);

export const LESSON_ENT5_1: EntM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how enterprise buying is moving toward outcomes, why AI demand depends on practical use cases, and why customers want flexible, scalable and sector-specific technology.',
    keyTakeaways: [
      'Buyers want measurable outcomes, quick value, integration, security, adoption and proof.',
      'AI spending is forecast to grow strongly, but value depends on workflows, data and governance.',
      'Customers prefer modular, scalable, hybrid and sector-specific offers they can adopt in steps.',
      'Adoption is the real test: in one World Bank case, only 35% still used a free platform after about 18 months.',
      'Surveys, forecasts, vendor claims and third-party estimates are labelled in this module.',
    ],
    businessImplications: 'Lead with a measurable outcome, offer a small first step and plan for adoption, not only deployment.',
    remember: 'Customers buy results, not features.',
    nextLesson: 'Technology & Innovation Trends',
  },
};
