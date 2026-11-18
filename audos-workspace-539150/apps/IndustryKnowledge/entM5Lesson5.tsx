import { EntDeepDive, citeEnt5, entM5Chapter, entQuiz } from './entM5Core';
import type { EntM5LessonBundle } from './entM5Core';

const LESSON = '5. Growth Outlook & Strategic Opportunities';

const deck = [
  entM5Chapter({
    title: 'Global Market Growth and Investment Outlook', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read the global spending forecasts correctly and explain why growth is strong but uneven.',
    mateIntro: 'The headline numbers are big. The skill is knowing what each one covers, and which ones must never be added together.',
    keyInsight: 'Global technology spending is forecast to grow strongly in 2026, led by data-centre systems, software and AI, but growth is uneven across segments. The forecasts use overlapping definitions, so they must be read category by category and never added together.',
    statTiles: [
      { value: '6', label: 'Key outlook factors', subtitle: 'Spending to investment discipline', description: 'Overall IT spending, software growth, services growth, AI investment, uneven segment growth, and investment discipline and risk.' },
      { value: 'US$6,369B', label: 'Forecast worldwide IT spending in 2026, up 14.2%', subtitle: 'Gartner, July 2026 forecast', description: 'Software US$1,468B (+15.5%) and IT services US$1,570B (+5.3%) are inside this total.' },
      { value: '49.5%', label: 'Forecast growth in worldwide AI spending in 2026', subtitle: 'Gartner, September 2026 forecast', description: 'About US$2,670 billion, overlapping IT spending, software and services.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two forecasts overlap and neither is the size of the enterprise software and IT services market alone, so they must not be added together.',
    narrative: [
      { label: 'What it is', text: 'Analyst forecasts provide a view of where spending is expected to move. For 2026, Gartner forecasts worldwide IT spending of US$6,369 billion, up 14.2%, with software at US$1,468 billion (+15.5%), IT services at US$1,570 billion (+5.3%), data-centre systems at US$822 billion (+62.5%) and infrastructure as a service at US$287 billion (+29.3%).' },
      { label: 'Why it is happening', text: 'Much of the growth is tied to AI infrastructure and software, which is why data-centre systems and software grow faster than IT services. Gartner’s September forecast puts AI spending at about US$2.67 trillion in 2026, up 49.5% from about US$1.79 trillion in 2025, and notes that enterprises turn to service providers less for large transformation and more for smaller projects. Gartner’s analyst also cautions that this is not a market where a rising tide lifts all boats.' },
      { label: 'Real-world example', text: 'Planners look at overall IT spending for the size of the wider market; at software growth for demand for applications and platforms; at services growth for demand for implementation and operation; at AI investment for where new capability is being built; at differences between segments to see where growth is concentrated; and at investment discipline and risk, including the possibility that forecasts change or that spending does not turn into returns.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates Vietnam’s IT services market at US$2.37 billion in 2025, US$2.63 billion in 2026 and US$4.39 billion by 2031 (a 10.82% CAGR for 2026–2031), covering IT services only and not enterprise software. The Ministry of Science and Technology reports Vietnam’s digital technology industry revenue at about US$198 billion in 2025, but that total includes hardware and electronics exports of US$178 billion. These definitions differ from Gartner’s, so the figures cannot be compared or combined. No public forecast for Vietnam’s enterprise software market on a comparable basis was found.' },
      { label: 'Business impact', text: 'Growth is strong but selective, so providers should evaluate opportunities at segment level, avoid double counting and treat forecasts as ranges that can change. Investment should follow evidence of demand, not headlines.' },
    ],
    visualKind: 'ent-m5-51-global', visualHeading: 'Gartner 2026 forecasts, overlapping categories',
    visualIntro: 'Read the four bars as overlapping categories, not as parts of a whole.',
    imageAlt: 'Casemate bar chart of overlapping Gartner 2026 forecasts for IT spending, AI spending, IT services and software',
    keyTerms: [
      { term: 'Forecast', definition: 'An estimate of future values that can change as conditions change.' },
      { term: 'CAGR', definition: 'Compound annual growth rate: the steady yearly rate that would take a value from a start to an end figure.' },
      { term: 'Double counting', definition: 'Adding together figures that include the same spending.' },
      { term: 'Segment', definition: 'A defined part of a market, such as software or IT services.' },
    ],
    recap: [
      'Global IT spending is forecast to grow 14.2% in 2026.',
      'Data-centre systems, software and AI grow faster than IT services.',
      'Overlapping categories must never be added together.',
      'Vietnam estimates use different definitions and are not comparable.',
    ],
    chapterRecap: 'Growth is strong but selective, so providers should evaluate opportunities at segment level, avoid double counting and treat forecasts as ranges that can change. Investment should follow evidence of demand, not headlines.',
    deepDiveTitle: 'Why the four bars cannot be added',
    body: <EntDeepDive paragraphs={[
      'AI spending includes infrastructure, software and services, and those categories also appear inside the IT spending, software and services forecasts. Adding the bars would count the same money more than once.',
      'The safe use of each bar is to compare its growth rate with the others, not to build a total.' ]} evidence="The forecasts are from Gartner’s July and September 2026 releases; the Vietnam estimates are from Mordor Intelligence and the Ministry of Science and Technology as reported by VietnamPlus; the outlook factors are the content of the chapter’s activity list. The advice on using each bar is our own." />,
    sources: citeEnt5('gartnerJuly2026', 'gartnerAi', 'deloitteSoftware', 'mordorVietnamIt', 'vietnamplusDigitalTech'),
  }),
  entM5Chapter({
    title: 'Vietnam’s Growth Potential and Opportunities for Local Providers', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify where Vietnamese providers may find higher-value opportunities and what limits them.',
    mateIntro: 'Vietnam has engineers, momentum and policy support. The open question is whether local firms can move beyond lower-cost delivery.',
    keyInsight: 'Vietnam has meaningful growth potential in enterprise software and IT services, supported by strong engineering capability, rising digital adoption and policy attention. Local providers will capture the most value by moving toward specialised, higher-value offers rather than competing only on cost.',
    statTiles: [
      { value: '7', label: 'Key opportunity areas', subtitle: 'SME digitalisation to product development', description: 'SME digitalisation, AI adoption services, cloud migration and modernisation, cybersecurity services, export-oriented services, industry-specific solutions and product development.' },
      { value: 'US$4.39B', label: 'Projected value of Vietnam’s IT services market by 2031', subtitle: 'Mordor Intelligence, from US$2.37B in 2025', description: 'IT services only, not enterprise software.' },
      { value: '10.82%', label: 'Projected annual growth of Vietnam’s IT services market, 2026–2031', subtitle: 'Mordor Intelligence, a compound annual rate', description: 'A third-party projection that can change.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The market figures are one research firm’s projections for IT services and are not an official forecast or a measure of enterprise software.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s technology sector combines a large pool of engineers, a growing base of businesses adopting digital tools, and national strategies that prioritise data, AI and domestic capability. The opportunity for local providers lies in moving from lower-cost software development toward consulting, specialised services and products.' },
      { label: 'Why it is happening', text: 'Demand is rising at home as SMEs digitalise and the public sector modernises, and abroad as customers in Japan and other markets look for dependable delivery partners. At the same time, talent shortages, competition from larger hubs and fragmented rules limit how fast providers can move up. Moving to higher-value offers requires investment in skills, specialisation and commercial capability.' },
      { label: 'Real-world example', text: 'Opportunities include affordable accounting, ERP, CRM, HR, inventory and workflow solutions for small and medium-sized businesses; services that identify AI use cases, prepare data, integrate AI tools and measure outcomes; application migration, architecture redesign, cloud operations and cost optimisation; security assessments, managed detection, incident response and governance support; software engineering and consulting for Japan, South Korea, North America, Europe and other markets; technology for manufacturing, banking, retail, logistics, healthcare and public administration; and proprietary platforms and reusable assets that complement labour-based services.' },
      { label: 'Vietnam example', text: 'Tuoi Tre reports digital technology exports of about US$172 billion in 2025 and overseas revenue of Vietnamese technology firms of about US$15 billion, with over 1.9 million workers; VINASA says software accounts for US$13 billion of IT industry revenue, with exports of US$7 billion (2024). Ken Research estimates 183,000 paid cloud ERP subscriptions among SMEs, and CMC targets Japan revenue of US$200–250 million by 2028. Against that, a TopDev report cited by VnEconomy estimates a shortage of 150,000 to 200,000 tech workers a year. VINASA’s Top 10 firms, by its figures, hold over 40% of industry revenue, which suggests concentration among larger firms. These are press reports, association statements, third-party estimates and company targets.' },
      { label: 'Business impact', text: 'Long-term value for Vietnamese providers depends on technical depth, customer understanding, commercial discipline and a move to higher-value offers. Providers that specialise and build reusable assets will be less exposed to price competition and talent constraints.' },
    ],
    visualKind: 'ent-m5-52-vietnam', visualHeading: 'Seven opportunities for Vietnamese providers',
    visualIntro: 'Explore the seven opportunities branching from higher-value positions.',
    imageAlt: 'Casemate tree mind map of seven opportunities for Vietnamese enterprise software and IT service providers',
    keyTerms: [
      { term: 'Higher-value services', definition: 'Work such as consulting, architecture and managed services that relies on expertise rather than hours alone.' },
      { term: 'Reusable asset', definition: 'A framework, tool or component that can be used across many projects.' },
      { term: 'Export-oriented services', definition: 'Services delivered mainly to customers in other countries.' },
      { term: 'Industry-specific solution', definition: 'Technology designed around the processes and rules of one sector.' },
    ],
    recap: [
      'Vietnam has engineering capability, rising adoption and policy support.',
      'Seven areas offer routes to higher-value work.',
      'Talent shortages and competition limit speed.',
      'Specialisation and reusable assets reduce exposure to price competition.',
    ],
    chapterRecap: 'Long-term value for Vietnamese providers depends on technical depth, customer understanding, commercial discipline and a move to higher-value offers. Providers that specialise and build reusable assets will be less exposed to price competition and talent constraints.',
    deepDiveTitle: 'Why moving up the value chain is a choice, not a given',
    body: <EntDeepDive paragraphs={[
      'Strong export numbers show that Vietnamese firms are trusted for delivery, but they do not show how much of that work is high-value. Moving toward consulting, products and managed services needs different skills, pricing and sales capability.',
      'Firms that choose a narrow area and build depth there are better placed than those that try to enter all seven at once.' ]} evidence="The seven opportunity areas are the content of the chapter’s activity list; the market projections are from Mordor Intelligence and Ken Research; the export figures are from Tuoi Tre and VnEconomy quoting VINASA; the talent estimate is from VnEconomy citing TopDev; the Top 10 concentration is VINASA as reported by VietnamFinance. The advice to choose a narrow area is our own." />,
    sources: citeEnt5('mordorVietnamIt', 'tuoitreDigitalExports', 'vneconomyVinasa', 'vneconomyTalent', 'vinasaTop10', 'kenCloudErp', 'cmcJapan'),
  }),
  entM5Chapter({
    title: 'Strategic Priorities and Long-Term Growth Opportunities', chapterTitle: LESSON, readingTime: '7',
    objective: 'List the long-term priorities providers can invest in and explain how to choose among them.',
    mateIntro: 'There are more good ideas than budget. The priority list works only if each bet has demand, capability and a path to profit.',
    keyInsight: 'The strongest long-term opportunities sit where customer demand and provider capability overlap, with a defensible position and a clear path to profit. Providers should invest in a few priorities, measure results and keep adjusting as technology, regulation and customer needs change.',
    statTiles: [
      { value: '8', label: 'Key strategic priorities', subtitle: 'AI-enabled services to performance measurement', description: 'AI-enabled service transformation, higher-value consulting, recurring service revenue, proprietary technology, security and compliance specialisation, talent development, partnership-led expansion and performance measurement.' },
      { value: 'US$1.2T', label: 'Forecast AI services opportunity worldwide by 2030', subtitle: 'Gartner, September 2026 forecast', description: 'A forecast of an opportunity, not a measured market.' },
      { value: '150', label: 'Target number of Make in Vietnam AI models, products and services', subtitle: 'National Data Strategy, Decision 1308/QD-TTg', description: 'A policy target, together with 1,000 data and AI firms.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figure is a global forecast and the Vietnamese figure is a policy target, so neither shows what any provider will earn.',
    narrative: [
      { label: 'What it is', text: 'Strategic priorities are the choices that decide where a provider invests over several years. In enterprise software and IT services, they cover how a provider uses AI in its own delivery, how it moves toward higher-value work, how it builds recurring revenue and owned technology, and how it develops people and partnerships.' },
      { label: 'Why it is happening', text: 'AI is changing the economics of routine work, customers are asking for outcomes and trust, and recurring models are changing how revenue is earned. Gartner forecasts a US$1.2 trillion AI services opportunity by 2030, while Deloitte and Gartner predict that AI agents may replace or absorb some point-product software and reshape software teams. Providers that do not choose where to invest risk being squeezed between larger platforms and cheaper competitors.' },
      { label: 'Real-world example', text: 'Priorities include using AI to improve development productivity, testing, support and process automation; moving from technical execution toward business analysis, architecture, transformation planning and governance; developing managed services, subscriptions and ongoing optimisation; building reusable frameworks, industry platforms and differentiated intellectual property; developing security and compliance expertise that helps customers with technical and regulatory complexity; training staff in AI, data engineering, cloud architecture, cybersecurity and industry processes; forming technology alliances and international delivery networks; and tracking retention, revenue quality, service margins, implementation success and realised outcomes.' },
      { label: 'Vietnam example', text: 'FPT reports a shift from time-and-materials to managed services and an 8.2% productivity gain from AI-first delivery, both company statements. CMC describes an aim to become a global-scale AI transformation company, and the National Data Strategy sets targets of at least 150 Make in Vietnam AI products and 1,000 data and AI firms. Talent is the common constraint, with an estimated shortage of 150,000 to 200,000 tech workers a year. These are company statements, policy targets and an estimate. No public data was found on the share of Vietnamese providers with a formal strategy for any of the eight priorities.' },
      { label: 'Business impact', text: 'No single priority fits every provider. The strongest choices combine real demand, existing or buildable capability and a defensible position, and are tracked with measures that show whether the investment is paying off.' },
    ],
    visualKind: 'ent-m5-53-priorities', visualHeading: 'Eight long-term growth priorities',
    visualIntro: 'Move through the eight cards and ask, for each, where demand and capability overlap.',
    imageAlt: 'Casemate cards showing eight long-term strategic priorities for enterprise software and IT service providers',
    keyTerms: [
      { term: 'Defensible position', definition: 'An advantage that rivals cannot quickly copy, such as trust, data or specialist skills.' },
      { term: 'Revenue quality', definition: 'How stable, repeatable and profitable a provider’s income is.' },
      { term: 'Intellectual property', definition: 'Technology, designs and methods that a firm owns and can reuse.' },
      { term: 'Realised outcome', definition: 'A measured result a customer actually achieved, not only a planned one.' },
    ],
    recap: [
      'Eight priorities cover AI, advice, recurring revenue, technology, trust, talent, partnerships and measurement.',
      'Strong choices combine demand, capability and a defensible position.',
      'No single priority fits every provider.',
      'Results need to be tracked and priorities adjusted.',
    ],
    chapterRecap: 'No single priority fits every provider. The strongest choices combine real demand, existing or buildable capability and a defensible position, and are tracked with measures that show whether the investment is paying off.',
    deepDiveTitle: 'How to choose among eight priorities',
    body: <EntDeepDive paragraphs={[
      'A simple test is to ask three questions of each priority: is there evidence that customers will pay, can we build or buy the capability, and can a competitor copy it quickly. Priorities that fail the first question are hopes, not strategies.',
      'Because technology and rules change, the last priority, measuring performance, is what lets a provider drop a weak bet and strengthen a strong one.' ]} evidence="The eight priorities are the content of the chapter’s activity list; the forecast is from Gartner’s September 2026 release; the predictions are from Gartner and Deloitte; the Vietnamese items are from FPT’s annual report, CMC’s press release, Viet Nam News and VnEconomy. The three-question test is our own." />,
    sources: citeEnt5('gartnerAi', 'deloitteSaas', 'gartnerTrends2026', 'fptGlobalIt2025', 'cmcNtt', 'vnDataStrategy', 'vneconomyTalent'),
  }),
];

const quiz = entQuiz('ent-m5-l5', [
  { chapter: '1', objective: 'Read the headline forecast', question: 'How should Gartner’s US$6,369 billion figure be described?', application: 'A slide calls it the size of the enterprise software and IT services market. What is the correction?', correct: 'As a 2026 forecast of worldwide IT spending that is wider than that market', wrong: ['As audited Vietnam revenue', 'As a legal requirement', 'As software spending only'], explanation: 'Scope matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Avoid double counting', question: 'Why must the Gartner IT spending, AI spending, software and services forecasts not be added?', application: 'An analyst sums all four bars. What is wrong?', correct: 'Their categories overlap, so the same spending would be counted more than once', wrong: ['They use different currencies', 'They are all Vietnamese', 'They are all negative'], explanation: 'Overlap causes double counting. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare growth rates', question: 'Which forecast segment grows faster in 2026, software or IT services?', application: 'A planner compares growth of two segments. Which grows faster?', correct: 'Software, at 15.5% against 5.3% for IT services', wrong: ['IT services', 'They are equal', 'Neither grows'], explanation: 'Growth is uneven. Review Chapter 1.' },
  { chapter: '1', objective: 'Use evidence honestly', question: 'What should be said about comparing Mordor’s Vietnam IT services figures with Gartner’s global figures?', application: 'A slide shows Vietnam as a share of the global total. What is the correction?', correct: 'The definitions differ, so the figures cannot be compared or combined', wrong: ['Vietnam is exactly 1%', 'They are identical', 'Mordor covers hardware'], explanation: 'Keep definitions apart. Review Chapter 1.' },
  { chapter: '2', objective: 'Read a projection correctly', question: 'How should Mordor’s US$4.39 billion figure for 2031 be described?', application: 'A slide presents it as Vietnam’s enterprise software market. What is the correction?', correct: 'As a third-party projection for IT services only, not enterprise software', wrong: ['As audited 2025 revenue', 'As a government forecast', 'As the global market'], explanation: 'Check scope and source. Review Chapter 2.' },
  { chapter: '2', objective: 'Name an opportunity', question: 'Which is an opportunity area named for Vietnamese providers?', application: 'A provider lists opportunities. Which belongs?', correct: 'Cybersecurity services such as assessments, managed detection and incident response', wrong: ['Dairy farming', 'Apparel retail', 'Coffee roasting'], explanation: 'Seven areas are named. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe the main constraint', question: 'Which constraint limits how fast Vietnamese providers can move to higher-value work?', application: 'A firm wants to launch AI consulting quickly. What may hold it back?', correct: 'Talent shortages, including an estimated shortage of 150,000 to 200,000 tech workers a year', wrong: ['Too many engineers', 'No demand abroad', 'A ban on exports'], explanation: 'Skills limit growth. Review Chapter 2.' },
  { chapter: '3', objective: 'Apply the priority test', question: 'What combination marks the strongest long-term opportunities?', application: 'A provider ranks eight priorities. What should drive the choice?', correct: 'Where customer demand and provider capability overlap, with a defensible position and a path to profit', wrong: ['The most fashionable idea', 'The cheapest idea', 'The idea with the longest slide'], explanation: 'Demand plus capability. Review Chapter 3.' },
  { chapter: '3', objective: 'Classify a forecast', question: 'How should Gartner’s US$1.2 trillion AI services figure be described?', application: 'A slide says providers earned this in 2025. What is the correction?', correct: 'As a forecast opportunity worldwide by 2030, not a measured market', wrong: ['As audited revenue', 'As a Vietnamese tax figure', 'As a legal requirement'], explanation: 'It is a forecast. Review Chapter 3.' },
  { chapter: '3', objective: 'Classify a target', question: 'How should the 150 Make in Vietnam AI products figure be described?', application: 'A slide says 150 products already exist. What is the correction?', correct: 'As a policy target in Decision 1308/QD-TTg, not a result', wrong: ['As audited revenue', 'As a Gartner forecast', 'As a tax rate'], explanation: 'Targets are not outcomes. Review Chapter 3.' },
]);

export const LESSON_ENT5_5: EntM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read the 2026 spending forecasts without double counting, identify where Vietnamese providers may find higher-value opportunities, and apply a simple test to long-term strategic priorities.',
    keyTakeaways: [
      'Global IT spending is forecast to grow 14.2% in 2026, with software and AI growing faster than IT services.',
      'The Gartner categories overlap and must never be added together.',
      'Vietnam market estimates use different definitions and are not comparable with global forecasts.',
      'Higher-value opportunities depend on specialisation, talent and reusable assets.',
      'The strongest priorities combine demand, capability and a defensible position, and are measured.',
    ],
    businessImplications: 'Evaluate opportunities by segment, invest where demand and capability overlap, and track results so that weak bets can be dropped.',
    remember: 'A big forecast is a map of where to look, not a promise of where to win.',
    nextLesson: 'Back to module overview',
  },
};
