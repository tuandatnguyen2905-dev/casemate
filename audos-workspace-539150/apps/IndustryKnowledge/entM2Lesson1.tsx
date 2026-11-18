import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '1. Value Chain Overview';

const deck = [
  entM2Chapter({
    title: 'Value Chain Structure and Main Stages', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the three broad stages of the value chain and the feedback loop that connects them.',
    mateIntro: 'Software is never really finished. It is built, deployed, supported and improved again, so the chain behaves more like a loop than a line.',
    keyInsight: 'Value creation is distributed across a network of technology providers, service specialists, and customers. Competitive advantage depends on how effectively these participants coordinate their capabilities, rather than on any single stage operating independently.',
    statTiles: [
      { value: '4', label: 'Key activities in this chapter', subtitle: 'Upstream to lifecycle feedback', description: 'Upstream inputs, midstream development and delivery, downstream adoption and lifecycle feedback.' },
      { value: '3', label: 'Broad stages of the chain', subtitle: 'Upstream, midstream, downstream', description: 'The stages overlap because software is updated and supported throughout its life.' },
      { value: '80,052', label: 'Active digital technology firms in Vietnam in 2025', subtitle: 'Ministry of Science and Technology via VietnamPlus', description: 'A count for the whole digital technology industry, which includes hardware and electronics.' },
    ],
    statsNote: 'The first two tiles are counts from this lesson. The firm count is an official industry-wide figure that is not limited to enterprise software and IT services.',
    narrative: [
      { label: 'What it is', text: 'The industry’s value chain can be divided into three broad stages: upstream inputs and technology foundations, midstream software and service delivery, and downstream customer adoption and lifecycle support. These stages are not always sequential because enterprise software is frequently updated, integrated with other systems, and supported throughout its operating life.' },
      { label: 'Why it is happening', text: 'Software vendors may control product development and distribution, while IT service providers contribute consulting, implementation, customization, and maintenance. Cloud providers, technology partners, and customers also participate in creating the final business outcome.' },
      { label: 'Real-world example', text: 'Upstream, suppliers provide talent, development tools, cloud infrastructure, databases, cybersecurity technologies and software components. Midstream, teams translate requirements into software products, configured systems, integrations and managed technology solutions. Downstream, providers deploy solutions, train users, manage change, monitor performance and give ongoing technical support. Customer feedback, product telemetry, service incidents and usage data then flow back to improve the software and the service.' },
      { label: 'Vietnam example', text: 'FPT’s 2025 annual report shows one company spanning several stages: its technology sector covers digital, green and AI transformation consulting, national and provincial digital systems, FPT AI Factory, cybersecurity and semiconductor chip design. Its technology revenue of VND 44,475 billion (+13.7%) equals overseas IT services of VND 35,382 billion plus domestic IT services of VND 9,093 billion, which is our own addition of two reported figures. The Ministry of Science and Technology reports 80,052 active digital technology firms in 2025. No public Vietnam-wide split of value across the upstream, midstream and downstream stages was found.' },
      { label: 'Business impact', text: 'The value chain extends from technology foundations to customer outcomes and ongoing optimization. Its interconnected structure makes coordination, interoperability, and lifecycle management central to industry performance.' },
    ],
    visualKind: 'ent-m2-11-structure', visualHeading: 'Three stages and a feedback loop',
    visualIntro: 'Follow the four steps from upstream foundations to lifecycle feedback.',
    imageAlt: 'Casemate step diagram of the three value chain stages and the lifecycle feedback loop',
    keyTerms: [
      { term: 'Value chain', definition: 'The set of activities that turn inputs into a product or service a customer values.' },
      { term: 'Upstream', definition: 'Inputs and technology foundations such as talent, tools and cloud infrastructure.' },
      { term: 'Downstream', definition: 'Customer adoption, use and lifecycle support after a solution is delivered.' },
      { term: 'Telemetry', definition: 'Usage and performance data that software sends back to its provider.' },
    ],
    recap: [
      'The chain has upstream, midstream and downstream stages.',
      'The stages overlap because software keeps changing after delivery.',
      'Vendors, service providers, cloud providers, partners and customers all contribute.',
      'Feedback from customers and operations improves future products and services.',
    ],
    chapterRecap: 'The value chain extends from technology foundations to customer outcomes and ongoing optimization. Its interconnected structure makes coordination, interoperability, and lifecycle management central to industry performance.',
    deepDiveTitle: 'Why a loop describes the chain better than a line',
    body: <EntDeepDive paragraphs={[
      'The Enterprise Software & IT Services value chain describes how technology inputs, intellectual property, engineering capabilities, and customer requirements are transformed into software products and IT services. Unlike traditional manufacturing, value creation in this industry depends heavily on knowledge, reusable code, cloud infrastructure, data, specialized talent, and ongoing customer relationships.',
      'The value chain is interconnected: upstream participants provide technology foundations and talent; midstream participants design, develop, integrate, and deliver solutions; downstream participants deploy, use, and maintain those solutions. Feedback from customers then informs product updates, service improvements, and future innovation.' ]} evidence="Both paragraphs are the module overview from the supplied brief. FPT figures are from its 2025 annual and earnings reports and are company-reported; the firm count is from the Ministry of Science and Technology via VietnamPlus; the sum of the two FPT segments is our own arithmetic." />,
    sources: citeEnt('fptTechnology2025', 'fptEarnings2025', 'vietnamplusDigitalTech'),
  }),
  entM2Chapter({
    title: 'Key Participants and Their Roles', chapterTitle: LESSON, readingTime: '6',
    objective: 'Name the main participant groups and explain why customers are participants too.',
    mateIntro: 'Nobody builds enterprise technology alone. Each participant does one part well and depends on the others for the rest.',
    keyInsight: 'The industry’s ecosystem is built on specialization and partnerships. No single provider needs to own every capability, but successful delivery requires clear responsibilities, compatible technologies, and effective coordination across organizational boundaries.',
    statTiles: [
      { value: '6', label: 'Key participant groups', subtitle: 'Vendors to customers', description: 'Software vendors, cloud providers, integrators, managed-service providers, partners and customers.' },
      { value: '2,100+', label: 'Vietnamese firms exporting digital products and services', subtitle: 'Tuoi Tre News, December 2025', description: 'Among about 80,000 technology firms.' },
      { value: '~US$15B', label: 'Overseas revenue of Vietnamese technology firms in 2025', subtitle: 'Tuoi Tre News', description: 'A press-reported figure whose scope is not defined in the source.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are press-reported and cover the wider technology sector, not only enterprise software and IT services.',
    narrative: [
      { label: 'What it is', text: 'The industry includes several categories of participants with distinct but overlapping responsibilities. Software vendors develop and commercialize applications, cloud providers supply computing platforms, consulting firms design transformation programs, and systems integrators connect applications and infrastructure. Outsourcing and managed-service providers support ongoing operations, while distributors and resellers help reach particular markets.' },
      { label: 'Why it is happening', text: 'Customers are also active participants in the value chain. They provide business requirements, operational data, domain knowledge, and feedback, and they must often redesign processes and train employees to realize the intended benefits of technology investments.' },
      { label: 'Real-world example', text: 'Software vendors develop enterprise applications, platforms, APIs, upgrades and product support. Cloud and infrastructure providers supply computing, storage, networking, databases and platform services. Consulting and systems integration firms translate requirements into architecture, implementation plans and integrated systems. Outsourcing and managed-service providers deliver development, maintenance, technical support, infrastructure operations and monitoring. Technology partners and resellers support licensing, distribution, implementation and access to specialist solutions. Enterprise customers define requirements, provide data, manage implementation, adopt new workflows and assess results.' },
      { label: 'Vietnam example', text: 'Tuoi Tre News reports more than 2,100 Vietnamese firms exporting digital products and services among about 80,000 technology firms, with overseas revenue of about US$15 billion in 2025. FPT’s history shows one firm playing several roles: distributing hardware from IBM, Compaq and Olivetti in 1989–95, forming an Oracle alliance in 1997 and later delivering outsourced software. The national cloud programme (Decision 1121/QD-TTg) expects government agencies and state enterprises to use cloud services from domestic providers by 2030, which is a policy target. No Vietnam census of participants by role was found.' },
      { label: 'Business impact', text: 'Value creation relies on complementary capabilities across the ecosystem. Clear accountability and strong partner management help reduce integration risks and improve delivery quality.' },
    ],
    visualKind: 'ent-m2-12-participants', visualHeading: 'Six kinds of participant',
    visualIntro: 'Review each participant group and the role it plays in the chain.',
    imageAlt: 'Casemate cards showing six kinds of participant in the enterprise software and IT services value chain',
    keyTerms: [
      { term: 'Systems integrator', definition: 'A firm that connects applications, data and infrastructure into a working whole for a customer.' },
      { term: 'Managed-service provider', definition: 'A provider that runs and monitors technology for a customer under an agreed service contract.' },
      { term: 'Reseller', definition: 'A partner that sells another company’s software or services to its own customers.' },
      { term: 'API', definition: 'A defined way for one piece of software to ask another to do something or share data.' },
    ],
    recap: [
      'Vendors, cloud providers, integrators, operators, partners and customers each play a role.',
      'Customers supply requirements, data and domain knowledge.',
      'No single provider needs to own every capability.',
      'Clear accountability reduces integration risk.',
    ],
    chapterRecap: 'Value creation relies on complementary capabilities across the ecosystem. Clear accountability and strong partner management help reduce integration risks and improve delivery quality.',
    deepDiveTitle: 'Why the customer is also a supplier',
    body: <EntDeepDive paragraphs={[
      'A customer provides the requirements, the data and the knowledge of how the business works. Without them even excellent software cannot be configured correctly.',
      'That is why implementation fails when customers treat it as a purchase rather than a joint project.' ]} evidence="Participant roles are from the supplied brief; Vietnamese figures are from Tuoi Tre News, FPT’s history and milestones pages (company accounts) and the Vietnam Government news portal. The point about customers as joint contributors is our own reading of the brief." />,
    sources: citeEnt('tuoitreDigitalExports', 'fptMilestones', 'fptHistory', 'vietnamCloudProgram'),
  }),
  entM2Chapter({
    title: 'Value Flows, Dependencies, and Industry Economics', chapterTitle: LESSON, readingTime: '7',
    objective: 'Distinguish the five flows through the chain and explain why product and service economics differ.',
    mateIntro: 'Money is only one of the things that move through the chain. Code, data, knowledge and risk move too, and each has its own economics.',
    keyInsight: 'The industry’s economic value depends on both scalable intellectual property and effective service delivery. Businesses that combine reusable technology assets with repeatable implementation methods can improve scalability while maintaining customer-specific relevance.',
    statTiles: [
      { value: '5', label: 'Key flows and dependencies', subtitle: 'Technology to risk allocation', description: 'Technology, information, financial, knowledge reuse and risk allocation.' },
      { value: 'VND 35,382B', label: 'FPT overseas IT services revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'A company example of a financial flow from services contracts.' },
      { value: '+14.3%', label: 'Growth in FPT overseas IT services revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'Reported alongside a shift from time-and-materials to managed services.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The FPT figures are company-reported and describe one provider, not the industry.',
    narrative: [
      { label: 'What it is', text: 'Several flows move through the value chain simultaneously. Technology and intellectual property flow from vendors to customers; data and requirements flow between customers and providers; payments move through subscriptions, licenses, project fees, and service contracts; and knowledge flows through implementation, support, and product feedback.' },
      { label: 'Why it is happening', text: 'The economics of each stage differ. Software products can often be distributed to additional customers at relatively low incremental cost, although development, infrastructure, security, and support remain significant expenses. IT services depend more directly on skilled labor, delivery capacity, project utilization, and the complexity of customer requirements.' },
      { label: 'Real-world example', text: 'Technology flows as software, APIs, cloud resources, technical documentation and implementation knowledge. Information flows as requirements, business data, performance metrics, incident reports and feedback. Money flows through subscriptions, licences, project milestones, usage fees and managed-service contracts. Knowledge is reused when project experience, code, templates and standard configurations make later delivery more efficient. Risk is allocated by defining responsibility for uptime, data security, intellectual property, service levels and implementation outcomes.' },
      { label: 'Vietnam example', text: 'FPT reports overseas IT services revenue of VND 35,382 billion in 2025, up 14.3%, and says it is moving contracts from time-and-materials toward managed services, which changes how money flows from customers. It also reports an 8.2% productivity gain from its AI-first strategy, a company claim that illustrates knowledge reuse. VINASA says the software sector accounts for US$13 billion of Vietnam’s IT industry revenue, with US$7 billion exported (2024). No public Vietnam-wide data on margins by revenue model was found.' },
      { label: 'Business impact', text: 'The industry’s value chain combines financial, technological, informational, and knowledge flows. Understanding these dependencies helps explain differences in scalability, margins, customer retention, and operational risk across business models.' },
    ],
    visualKind: 'ent-m2-13-flows', visualHeading: 'Five flows through the chain',
    visualIntro: 'Explore the five flows around the centre and what each carries.',
    imageAlt: 'Casemate mind map of five value flows in the enterprise software and IT services value chain',
    keyTerms: [
      { term: 'Incremental cost', definition: 'The extra cost of serving one more customer.' },
      { term: 'Utilization', definition: 'The share of staff time that is billed to customers.' },
      { term: 'Service-level agreement', definition: 'A contract term that sets measurable commitments such as uptime and response time.' },
      { term: 'Reusable asset', definition: 'Code, templates or configurations that can be applied again on later projects.' },
    ],
    recap: [
      'Technology, information, money, knowledge and risk all flow through the chain.',
      'Software scales at low incremental cost, while services scale with skilled labour.',
      'Reuse of code and methods improves scalability.',
      'Risk allocation defines who answers for uptime, security and outcomes.',
    ],
    chapterRecap: 'The industry’s value chain combines financial, technological, informational, and knowledge flows. Understanding these dependencies helps explain differences in scalability, margins, customer retention, and operational risk across business models.',
    deepDiveTitle: 'Why services scale with people and software scales with code',
    body: <EntDeepDive paragraphs={[
      'A software product can be copied to another customer for little extra cost, but building, hosting, securing and supporting it still costs money. A services project needs skilled people for each engagement, so growth depends on hiring and keeping them busy.',
      'Providers that package their project experience into reusable assets move part of their business toward the first pattern while staying close to each customer.' ]} evidence="The five flows and economic contrast are from the supplied brief; FPT figures are from its annual report and are company-reported; VINASA figures are from VnEconomy. The remark on packaging experience into reusable assets restates the brief’s Key Insight in our own words." />,
    sources: citeEnt('fptGlobalIt2025', 'vneconomyVinasa', 'fptEarnings2025'),
  }),
];

const quiz = entQuiz('ent-m2-l1', [
  { chapter: '1', objective: 'Name the stages', question: 'Which three broad stages make up the value chain?', application: 'A student sketches the chain. What should the stages be?', correct: 'Upstream inputs, midstream delivery and downstream adoption and support', wrong: ['Design, print and sell', 'Plant, harvest and ship', 'Buy, store and discard'], explanation: 'The brief names these three. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain overlap', question: 'Why are the stages not always sequential?', application: 'A customer asks why updates continue after launch. What is the reason?', correct: 'Enterprise software is updated, integrated and supported throughout its operating life', wrong: ['Software is never delivered', 'Customers write all the code', 'Stages are decided by the government'], explanation: 'Software keeps changing. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe the feedback loop', question: 'What do customer feedback, telemetry, incidents and usage data do?', application: 'A product team reviews support tickets. Why?', correct: 'They inform product updates, service improvements and future innovation', wrong: ['They replace the upstream stage', 'They end the contract', 'They remove the need for testing'], explanation: 'Feedback closes the loop. Review Chapter 1.' },
  { chapter: '1', objective: 'State where advantage comes from', question: 'What does competitive advantage depend on in this chain?', application: 'A firm perfects one stage only. What is it missing?', correct: 'How effectively participants coordinate their capabilities', wrong: ['One stage working alone', 'The size of the logo', 'Avoiding all partners'], explanation: 'Value is distributed. Review Chapter 1.' },
  { chapter: '2', objective: 'Match roles', question: 'What does a systems integrator do?', application: 'A bank needs its new application connected to old systems. Who helps?', correct: 'Connects applications and infrastructure into integrated systems', wrong: ['Only prints licences', 'Only designs logos', 'Only trains accountants'], explanation: 'Integrators connect systems. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognise customers as participants', question: 'What do customers contribute to the chain?', application: 'A project lacks business data. Why does that matter?', correct: 'Requirements, operational data, domain knowledge and feedback', wrong: ['Nothing, they only pay', 'Only the hardware', 'Only the marketing plan'], explanation: 'Customers are active participants. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'How should the figure of about 80,000 technology firms be read?', application: 'A slide uses it as the count of enterprise software providers. What is the correction?', correct: 'As a count for the whole technology industry, not only enterprise software and IT services', wrong: ['As a Gartner forecast', 'As the number of FPT staff', 'As a count of banks'], explanation: 'Scope matters. Review Chapter 2.' },
  { chapter: '3', objective: 'List the flows', question: 'Which is one of the flows running through the chain?', application: 'A consultant maps the chain. Which flow belongs?', correct: 'Knowledge reuse', wrong: ['Rainfall', 'Fuel', 'Fabric'], explanation: 'Five flows are named. Review Chapter 3.' },
  { chapter: '3', objective: 'Contrast economics', question: 'How do software and IT services differ economically?', application: 'A founder compares two business models. What is the key contrast?', correct: 'Software can serve extra customers at low incremental cost, while services depend on skilled labour and utilisation', wrong: ['Software needs no support', 'Services need no people', 'They are the same'], explanation: 'Economics differ by stage. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a company claim', question: 'How should FPT’s reported 8.2% productivity gain be described?', application: 'A deck presents it as an industry average. What is the correction?', correct: 'As a company-reported claim about one provider', wrong: ['As a Vietnam-wide statistic', 'As a Gartner forecast', 'As a law'], explanation: 'Label company claims. Review Chapter 3.' },
]);

export const LESSON_ENT2_1: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the three stages of the value chain, the participants in it and the flows that connect them.',
    keyTakeaways: [
      'Value is created across upstream inputs, midstream delivery and downstream adoption.',
      'The stages overlap because software is updated and supported throughout its life.',
      'Vendors, cloud providers, integrators, operators, partners and customers each contribute.',
      'Technology, information, money, knowledge and risk all flow through the chain.',
      'Software and services scale differently, so their economics should be analysed separately.',
    ],
    businessImplications: 'Coordinate across the chain, define responsibilities clearly and package project experience into reusable assets.',
    remember: 'Advantage comes from coordination, not from any single stage.',
    nextLesson: 'Sourcing & Supplier Partnerships',
  },
};
