import { EntDeepDive, citeEnt4, entM4Chapter, entQuiz } from './entM4Core';
import type { EntM4LessonBundle } from './entM4Core';

const LESSON = '1. Industry Competition Structure';

const deck = [
  entM4Chapter({
    title: 'Market Structure and Competitive Intensity', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the layered structure of competition and why it is becoming ecosystem-based.',
    mateIntro: 'There is no single race. Platform giants, specialists, service firms and AI newcomers all compete at once, in overlapping fields.',
    keyInsight: 'Competition is increasingly ecosystem-based rather than product-based. Vendors that connect software, cloud infrastructure, AI capabilities, implementation services, and customer support can deliver more integrated solutions and strengthen customer retention. However, specialized providers can remain competitive by solving specific business problems better than general-purpose platforms.',
    statTiles: [
      { value: '5', label: 'Key forms of competition', subtitle: 'Broad platforms to competitive intensity', description: 'Broad-platform, specialist, service-based and emerging competition, and competitive intensity.' },
      { value: '60%', label: 'Share of the total addressable software market that AI agent-powered solutions could represent by 2030', subtitle: 'Deloitte, 2026 outlook, an estimate', description: 'Deloitte also expects a hybrid market of incumbents and AI-native tools.' },
      { value: '40%', label: 'Share of enterprise application portfolios predicted to include custom apps built on AI-native platforms by 2030', subtitle: 'Gartner prediction, up from 2% in 2025', description: 'An analyst prediction, not a measurement.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are analyst estimates and predictions about global software, not Vietnam and not measured outcomes.',
    narrative: [
      { label: 'What it is', text: 'The enterprise software and IT services industry is highly competitive, with competition occurring across several interconnected markets: enterprise applications, cloud infrastructure, cybersecurity, data analytics, AI platforms, consulting, systems integration, and IT outsourcing. Companies compete not only on product functionality and price but also on reliability, integration capabilities, implementation expertise, and long-term customer relationships.' },
      { label: 'Why it is happening', text: 'The market combines large technology groups with broad portfolios, specialized software vendors, consulting firms, regional IT service providers, and emerging AI-native companies. Competitive intensity differs by segment. Established vendors benefit from brand recognition, extensive partner networks, and switching costs, while smaller competitors can gain ground through specialized expertise, faster innovation, and more flexible pricing.' },
      { label: 'Real-world example', text: 'Large vendors compete across several technology categories so customers can buy integrated solutions from one ecosystem; specialist vendors focus on CRM, ERP, human resources, cybersecurity or analytics; IT service providers compete through implementation quality, technical expertise, delivery speed, cost efficiency and industry knowledge; AI-native firms and open-source communities challenge traditional vendors with new development methods, flexible tools and alternative pricing; and rivalry is high in cloud services, enterprise applications, software development and AI-enabled business solutions, where Deloitte identifies AI-first products and new competitors as important forces reshaping software competition in 2026.' },
      { label: 'Vietnam example', text: 'The Deputy Prime Minister was reported as saying that domestic providers hold only about 20% of Vietnam’s cloud computing market, most of which belongs to foreign firms, and that Vietnamese technology firms’ revenue is a very small share of the market; this is an official statement as reported by the press. VINASA’s 2025 digital technology map placed 257 firms in 389 positions across 23 maps, which shows how many segments the market divides into. No public concentration ratio or market-share table for Vietnamese enterprise software and IT services was found.' },
      { label: 'Business impact', text: 'The industry has a layered competitive structure in which large technology ecosystems, specialized software providers, and IT service firms compete through different strengths. Competitive advantage increasingly depends on how effectively companies combine technology, service delivery, and measurable business outcomes.' },
    ],
    visualKind: 'ent-m4-11-structure', visualHeading: 'Five forms of competition',
    visualIntro: 'Explore the five forms of competition around the idea of layered competition.',
    imageAlt: 'Casemate mind map of five forms of competition in enterprise software and IT services',
    keyTerms: [
      { term: 'Ecosystem', definition: 'A network of software, cloud, AI, services and partners that together serve a customer.' },
      { term: 'AI-native company', definition: 'A firm built around AI from the start rather than adding AI to an older product.' },
      { term: 'Switching cost', definition: 'The time, money and risk a customer faces in moving to another provider.' },
      { term: 'Competitive intensity', definition: 'How strongly rivals compete in a market.' },
    ],
    recap: [
      'Competition spans applications, cloud, security, data, AI, consulting and outsourcing.',
      'Large ecosystems, specialists, service firms and AI-native firms all compete.',
      'Incumbents rely on brands, partners and switching costs.',
      'Smaller firms win through expertise, speed and flexible pricing.',
    ],
    chapterRecap: 'The industry has a layered competitive structure in which large technology ecosystems, specialized software providers, and IT service firms compete through different strengths. Competitive advantage increasingly depends on how effectively companies combine technology, service delivery, and measurable business outcomes.',
    deepDiveTitle: 'Why incumbents and AI-native firms may coexist',
    body: <EntDeepDive paragraphs={[
      'Deloitte expects a hybrid outcome: customers may keep incumbents for mission-critical, tightly integrated workflows and use AI-native tools for targeted, high-impact uses. Incumbents are also expected to buy or partner with AI firms to widen their platforms.',
      'For smaller providers the lesson is to be clear about which of those jobs they want to win.' ]} evidence="The competitive forms are from the supplied brief; the Deloitte points are from its 2026 software outlook and a related 2026 prediction; the Gartner figure is from its 2026 strategic trends document; the Vietnam statements are from a press report and VietnamFinance reporting VINASA. The advice to choose a job to win is our own." />,
    sources: citeEnt4('deloitteSoftware', 'gartnerTrends2026', 'cmcGrowth', 'vinasaTop10'),
  }),
  entM4Chapter({
    title: 'Competitive Boundaries and Market Segmentation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why competitors should be analysed by segment and why the boundaries between segments are blurring.',
    mateIntro: 'A cloud giant and a local ERP specialist may serve the same customer yet never meet in a bid. Segments tell you who your rivals really are.',
    keyInsight: 'A competitor’s relevance depends on the customer’s specific problem, technology environment, budget, and procurement criteria. A segment-based approach provides a more accurate view of rivalry than comparing companies solely by total revenue or company size.',
    statTiles: [
      { value: '6', label: 'Key market segments', subtitle: 'Applications to managed services', description: 'Enterprise applications, cloud and infrastructure, data and AI, cybersecurity, IT professional services, and managed services and outsourcing.' },
      { value: '23', label: 'Maps in VINASA’s 2025 Vietnam digital technology company map', subtitle: 'VietnamFinance, reporting VINASA', description: 'A segment-by-segment way to place firms.' },
      { value: '257', label: 'Firms VINASA placed on its 2025 maps', subtitle: 'VietnamFinance, reporting VINASA', description: 'In 389 positions, so many firms appear on more than one map.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The map figures describe one association’s first-year mapping exercise and are not a count of all competitors.',
    narrative: [
      { label: 'What it is', text: 'Competition should be analyzed by market segment rather than by treating all enterprise software and IT services companies as direct competitors. A cloud infrastructure provider, ERP vendor, cybersecurity specialist, and outsourced software development firm may all serve the same enterprise customer but address different needs and purchasing decisions.' },
      { label: 'Why it is happening', text: 'Competitive boundaries are also becoming less distinct. Cloud platforms increasingly include data and AI services, software vendors offer implementation and consulting, and IT service providers develop proprietary platforms or industry-specific solutions. As a result, companies may compete in one market while partnering in another.' },
      { label: 'Real-world example', text: 'Enterprise applications include ERP, CRM, human capital management, supply chain management and productivity software; cloud and infrastructure cover public cloud, hybrid cloud, databases, storage, computing and platform services; data and AI cover business intelligence, data engineering, machine learning platforms, generative AI and AI agents; cybersecurity covers identity management, endpoint protection, cloud security, governance and threat detection; IT professional services cover consulting, custom development, systems integration, modernisation and digital transformation; and managed services and outsourcing cover infrastructure management, application maintenance, technical support and outsourced development teams.' },
      { label: 'Vietnam example', text: 'VINASA’s first Vietnam digital technology company map placed 257 firms in 389 positions across 23 maps, and its Top 10 programme verified 81 firms holding 169 positions, which shows firms competing in several segments at once. MISA claims a 33% share of accounting software in the second quarter of 2025, a vendor figure for one narrow segment. No public Vietnam market-share data for the other segments was found.' },
      { label: 'Business impact', text: 'Market segmentation identifies the relevant competitive set for each product or service. It also reveals where competitors overlap, where partnerships are possible, and where new entrants may challenge established market boundaries.' },
    ],
    visualKind: 'ent-m4-12-segments', visualHeading: 'Six segments and their competitive questions',
    visualIntro: 'Read across the table for what each segment covers and the question buyers ask in it.',
    imageAlt: 'Casemate table of six market segments and the competitive question each one asks',
    keyTerms: [
      { term: 'Market segment', definition: 'A group of products or services that meet a similar customer need and compete with each other.' },
      { term: 'Competitive set', definition: 'The firms a customer realistically compares for a given purchase.' },
      { term: 'Hyperscaler', definition: 'A very large cloud provider operating infrastructure at huge scale.' },
      { term: 'Co-opetition', definition: 'Competing in one market while partnering in another.' },
    ],
    recap: [
      'Rivals should be identified segment by segment.',
      'Different providers can serve one customer with different offers.',
      'Boundaries blur as clouds add AI and vendors add services.',
      'Firms may compete in one market and partner in another.',
    ],
    chapterRecap: 'Market segmentation identifies the relevant competitive set for each product or service. It also reveals where competitors overlap, where partnerships are possible, and where new entrants may challenge established market boundaries.',
    deepDiveTitle: 'Why size is a poor way to pick your rivals',
    body: <EntDeepDive paragraphs={[
      'A very large vendor may be irrelevant to a niche bid if it does not sell what the customer needs, while a small specialist may be the most dangerous rival. Revenue rankings hide that.',
      'Starting from the customer\u2019s problem and procurement criteria gives a more accurate list of competitors.' ]} evidence="The segments and the blurring of boundaries are from the supplied brief; the map figures are from VietnamFinance reporting VINASA; the share claim is from MISA’s own press release. The advice to start from the customer’s problem restates the brief’s Key Insight in our own words." />,
    sources: citeEnt4('vinasaTop10', 'vinasaTechMap', 'misaPress'),
  }),
  entM4Chapter({
    title: 'Sources of Competitive Advantage and Barriers to Entry', chapterTitle: LESSON, readingTime: '7',
    objective: 'List the sources of advantage and explain how entry barriers differ between software products and services.',
    mateIntro: 'Anyone can launch a simple app. Replacing the system a bank runs on is another matter, and that gap is what advantage is made of.',
    keyInsight: 'The strongest competitive positions are built through capabilities that are difficult to replicate quickly. These include trusted customer relationships, proprietary technology, industry-specific knowledge, certified talent, integration expertise, and a demonstrated record of delivering business value.',
    statTiles: [
      { value: '6', label: 'Key sources of advantage', subtitle: 'Technology to ecosystem development', description: 'Technology and intellectual property, switching costs, economies of scale, talent, trust and compliance, and ecosystem development.' },
      { value: '35%', label: 'Share of point-product SaaS tools Gartner expects to be replaced by AI agents or absorbed into larger agent ecosystems by 2030', subtitle: 'Gartner, quoted by Deloitte', description: 'An analyst prediction about one kind of offer.' },
      { value: '80%', label: 'Share of organizations Gartner expects to turn large software engineering teams into smaller AI-augmented teams by 2030', subtitle: 'Gartner, 2026 trends, a prediction', description: 'It may lower the cost of building some software.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other two figures are analyst predictions about the global market and are not measurements. Whether they lower entry barriers is our own reading.',
    narrative: [
      { label: 'What it is', text: 'Competitive advantage in enterprise software and IT services comes from a combination of technology, organizational capabilities, commercial relationships, and delivery performance. Software vendors can benefit from recurring revenue, intellectual property, product scalability, and integration with widely used business systems. Service providers rely more heavily on talent, delivery processes, project experience, and the ability to maintain customer trust.' },
      { label: 'Why it is happening', text: 'Entry barriers vary by segment. Developing a simple business application may require relatively limited initial investment, whereas building enterprise-grade infrastructure, satisfying stringent security requirements, or replacing mission-critical systems requires substantial resources. Established vendors can also benefit from customer switching costs and established partner networks.' },
      { label: 'Real-world example', text: 'Advantage comes from proprietary platforms, software architecture, patents, algorithms and differentiated features; from switching costs such as data migration, retraining, integration and operational risk; from economies of scale that spread research, infrastructure, development and support costs across many customers; from recruiting and keeping engineers, cloud architects, security specialists, consultants and industry experts; from demonstrating security, reliability, data governance, regulatory alignment and service continuity; and from relationships with cloud providers, implementation partners, resellers, developers and industry associations.' },
      { label: 'Vietnam example', text: 'CMC reports more than 5,800 employees and says CMC Global has a pool of 3,000-plus engineers, company figures that illustrate talent as a barrier, while a TopDev report cited by VnEconomy estimates a shortage of 150,000 to 200,000 tech workers a year in Vietnam. CMC signed a cooperation agreement with NTT DATA in January 2026, an example of building an ecosystem. Vietnam’s Personal Data Protection Law and Law on Cybersecurity raise trust and compliance requirements. No public data on customer switching costs in Vietnam was found.' },
      { label: 'Business impact', text: 'Competitive barriers differ between software products and labor-intensive services, but both depend on accumulated capabilities and customer confidence. Firms entering the market must establish a clear differentiation strategy rather than relying on price alone.' },
    ],
    visualKind: 'ent-m4-13-advantage', visualHeading: 'Six sources of advantage',
    visualIntro: 'Read the six layers from technology and intellectual property at the base up to ecosystem development.',
    imageAlt: 'Casemate pyramid of six sources of competitive advantage and entry barriers',
    keyTerms: [
      { term: 'Entry barrier', definition: 'Something that makes it costly or difficult for a new firm to compete.' },
      { term: 'Economies of scale', definition: 'Lower cost per customer as fixed costs are spread over more customers.' },
      { term: 'Intellectual property', definition: 'Proprietary technology, designs and methods a firm owns.' },
      { term: 'Differentiation', definition: 'Offering something customers value that rivals do not.' },
    ],
    recap: [
      'Advantage combines technology, capabilities, relationships and delivery performance.',
      'Entry barriers are low for simple apps and high for mission-critical systems.',
      'Switching costs and partner networks protect incumbents.',
      'Newcomers need a clear differentiation strategy, not only a low price.',
    ],
    chapterRecap: 'Competitive barriers differ between software products and labor-intensive services, but both depend on accumulated capabilities and customer confidence. Firms entering the market must establish a clear differentiation strategy rather than relying on price alone.',
    deepDiveTitle: 'Why trust is the hardest advantage to copy',
    body: <EntDeepDive paragraphs={[
      'A competitor can hire engineers or copy a feature, but it cannot quickly copy a record of running critical systems without failure. That record takes years of delivery and is visible only to customers who have lived it.',
      'This is why references, certifications and compliance evidence carry so much weight in enterprise purchasing.' ]} evidence="The sources of advantage and entry barriers are from the supplied brief; the predictions are from Gartner and Deloitte; CMC figures are company claims as reported by the press and its marketing deck; the shortage estimate is from VnEconomy citing TopDev; the laws are from the Official Gazette and Luat Viet Nam. The comment on trust is our own reading." />,
    sources: citeEnt4('deloitteSaas', 'gartnerTrends2026', 'cmcGrowth', 'cmcDeck', 'cmcNtt', 'vneconomyTalent', 'pdplGazette', 'cyberLaw2025'),
  }),
];

const quiz = entQuiz('ent-m4-l1', [
  { chapter: '1', objective: 'State the competitive shift', question: 'How is competition changing in the industry?', application: 'A vendor sells only a standalone product. What trend is it facing?', correct: 'It is increasingly ecosystem-based rather than product-based', wrong: ['It is moving to price only', 'It has ended', 'It is limited to hardware'], explanation: 'Integrated ecosystems matter. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain how specialists compete', question: 'How can specialized providers remain competitive?', application: 'A small CRM vendor faces a platform giant. What is its route?', correct: 'By solving specific business problems better than general-purpose platforms', wrong: ['By copying every feature', 'By ignoring customers', 'By avoiding integration'], explanation: 'Depth wins niches. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a prediction correctly', question: 'How should Deloitte’s 60% figure for AI agent-powered solutions be described?', application: 'A slide states it as fact for 2026. What is the correction?', correct: 'As an estimate of what such solutions could represent by 2030', wrong: ['As audited 2025 revenue', 'As a Vietnam statistic', 'As a legal requirement'], explanation: 'It is an estimate. Review Chapter 1.' },
  { chapter: '1', objective: 'Use evidence honestly', question: 'What should be said about market-share tables for Vietnamese enterprise software and IT services?', application: 'A slide shows a concentration ratio. What is the correction?', correct: 'No public table was found, so none is shown', wrong: ['FPT holds 100%', 'Gartner publishes it', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 1.' },
  { chapter: '2', objective: 'Explain segment analysis', question: 'Why analyse competition by segment?', application: 'A bid team lists the biggest firms as rivals. What is wrong?', correct: 'Different providers address different needs and purchasing decisions for the same customer', wrong: ['All firms are identical', 'Size is the only factor', 'Segments never overlap'], explanation: 'Use the customer’s problem. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe blurring boundaries', question: 'How are competitive boundaries changing?', application: 'A software vendor starts selling consulting. What does it show?', correct: 'Cloud platforms add data and AI, vendors offer services, and service firms build platforms', wrong: ['Boundaries are hardening', 'Only hardware matters', 'Services have disappeared'], explanation: 'Boundaries blur. Review Chapter 2.' },
  { chapter: '2', objective: 'List segments', question: 'Which is a market segment named in the chapter?', application: 'A strategist lists segments. Which belongs?', correct: 'Cybersecurity', wrong: ['Apparel retail', 'Dairy farming', 'Coffee roasting'], explanation: 'Six segments are named. Review Chapter 2.' },
  { chapter: '3', objective: 'Define the strongest positions', question: 'What builds the strongest competitive positions?', application: 'A firm relies on a low price. What is it missing?', correct: 'Capabilities that are difficult to replicate quickly, such as trusted relationships and proprietary technology', wrong: ['A bigger logo', 'More slides', 'A longer office lease'], explanation: 'Hard-to-copy capabilities last. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare entry barriers', question: 'How do entry barriers differ by segment?', application: 'Two founders start a simple app and a core banking system. How do their barriers differ?', correct: 'A simple app needs limited investment, while enterprise-grade infrastructure and mission-critical systems need substantial resources', wrong: ['They are identical', 'Apps are harder', 'There are no barriers'], explanation: 'Barriers vary. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a switching cost', question: 'Which is a switching cost?', application: 'A customer hesitates to change vendor. What is holding it back?', correct: 'Data migration, employee retraining, system integration and operational risk', wrong: ['Office decoration', 'Logo design', 'Email signatures'], explanation: 'Switching is costly. Review Chapter 3.' },
]);

export const LESSON_ENT4_1: EntM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the layered structure of competition, analyse rivals by segment and name the sources of advantage and barriers to entry.',
    keyTakeaways: [
      'Competition spans applications, cloud, security, data, AI, consulting and outsourcing.',
      'It is increasingly ecosystem-based, but specialists still win by solving specific problems.',
      'Rivals should be identified segment by segment, not by size.',
      'Advantage rests on hard-to-copy capabilities such as trust, talent and technology.',
      'Analyst predictions, press reports and company claims are labelled in this module.',
    ],
    businessImplications: 'Map competitors by segment, build capabilities that are slow to copy and avoid competing on price alone.',
    remember: 'Know which segment you are in before you name your rivals.',
    nextLesson: 'Key Industry Players',
  },
};
