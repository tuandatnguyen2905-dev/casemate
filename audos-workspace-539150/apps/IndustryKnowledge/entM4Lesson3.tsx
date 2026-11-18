import { EntDeepDive, citeEnt4, entM4Chapter, entQuiz } from './entM4Core';
import type { EntM4LessonBundle } from './entM4Core';

const LESSON = '3. Competitor Benchmarking';

const deck = [
  entM4Chapter({
    title: 'Benchmarking Dimensions and Evaluation Criteria', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the dimensions of a fair benchmark and explain why different business models need different indicators.',
    mateIntro: 'Comparing a software vendor with a services firm using the same ruler is like comparing a factory with a restaurant. Choose measures that fit.',
    keyInsight: 'A meaningful benchmark measures competitive fitness for a particular market, not simply company size. The best competitor for a customer or business opportunity is the company whose capabilities, cost structure, and strategic focus align most closely with the requirement.',
    statTiles: [
      { value: '6', label: 'Key benchmarking dimensions', subtitle: 'Financial to commercial attractiveness', description: 'Financial performance, product and technology, customer performance, operational efficiency, market position and commercial attractiveness.' },
      { value: '10', label: 'Criteria in VINASA’s Tech Map assessment', subtitle: 'VietnamNet, reporting VINASA', description: 'Grouped across two axes, Vision and Execution.' },
      { value: '4', label: 'Strategic categories VINASA uses to group firms', subtitle: 'VietnamNet, reporting VINASA', description: 'Leaders, capable performers, explorers and sector-advantage firms.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other two describe how one Vietnamese association structures its own assessment, not a global standard.',
    narrative: [
      { label: 'What it is', text: 'Competitor benchmarking compares organizations against a consistent set of criteria to identify relative strengths, weaknesses, and opportunities for differentiation. In enterprise software and IT services, a useful benchmark must account for differences in business models. Software vendors are often evaluated through product capabilities, recurring revenue, platform adoption, and customer retention, while IT service providers are assessed through delivery quality, workforce expertise, project execution, and client relationships.' },
      { label: 'Why it is happening', text: 'Benchmarking should combine quantitative indicators with qualitative assessments. Financial metrics reveal scale and commercial performance, while operational and strategic indicators help explain why one company may be better positioned than another. Comparisons should use consistent reporting periods, clearly defined metrics, and comparable business segments.' },
      { label: 'Real-world example', text: 'Analysts compare revenue growth, operating margin, recurring revenue share, profitability and R&D investment; product breadth, innovation speed, AI capabilities, cloud readiness, integration and cybersecurity; customer retention, satisfaction, implementation success, renewal rates and reference customers; project delivery time, utilisation, productivity, service quality and support responsiveness; target segments, geographic reach, industry expertise, brand recognition and partner ecosystem; and pricing flexibility, implementation cost, scalability, licensing transparency and total cost of ownership.' },
      { label: 'Vietnam example', text: 'VINASA’s 2025 Tech Map assesses firms against 10 criteria on two axes, Vision and Execution, and groups them into four strategic categories, with the 81 Top 10 firms verified directly by an expert council and holding 169 positions across 23 maps, as reported by VietnamNet and VietnamFinance. It is an example of a consistent, segment-based framework, although its detailed scores were not reviewed here. No public like-for-like benchmark of Vietnamese providers on retention or delivery quality was found.' },
      { label: 'Business impact', text: 'A structured benchmarking framework allows businesses to compare competitors fairly and identify the capabilities that matter most to their target customers. Different business models require different indicators, so software vendors and service providers should not be evaluated using identical financial measures alone.' },
    ],
    visualKind: 'ent-m4-31-dimensions', visualHeading: 'Six benchmarking dimensions',
    visualIntro: 'Explore the six dimensions around the idea of competitive fitness.',
    imageAlt: 'Casemate mind map of six benchmarking dimensions around competitive fitness',
    keyTerms: [
      { term: 'Benchmarking', definition: 'Comparing organizations against a consistent set of criteria.' },
      { term: 'Recurring revenue share', definition: 'The portion of revenue that repeats through subscriptions or service contracts.' },
      { term: 'Utilisation', definition: 'The share of staff time that is billed to customers.' },
      { term: 'Qualitative assessment', definition: 'A judgement based on evidence that is not purely numerical.' },
    ],
    recap: [
      'Benchmarks compare firms on consistent criteria.',
      'Vendors and service firms need different indicators.',
      'Combine financial, operational and strategic evidence.',
      'Use consistent periods, clear definitions and comparable segments.',
    ],
    chapterRecap: 'A structured benchmarking framework allows businesses to compare competitors fairly and identify the capabilities that matter most to their target customers. Different business models require different indicators, so software vendors and service providers should not be evaluated using identical financial measures alone.',
    deepDiveTitle: 'Why the best competitor depends on the requirement',
    body: <EntDeepDive paragraphs={[
      'For a customer needing a fast, low-cost offshore team, the closest match may be a mid-sized outsourcer, while for a multinational transformation it may be a global consultancy. The same company can rank very differently for the two jobs.',
      'Benchmarks should therefore start from the requirement, then choose the firms and measures that fit it.' ]} evidence="The benchmarking dimensions are from the supplied brief; the VINASA Tech Map description is from VietnamNet and VietnamFinance reporting VINASA. The example of two different requirements is our own illustration." />,
    sources: citeEnt4('vinasaTechMap', 'vinasaTop10'),
  }),
  entM4Chapter({
    title: 'Comparative Benchmarking of Major Competitors', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read a qualitative benchmark of competitor groups and know what must still be validated.',
    mateIntro: 'A qualitative table is a map, not a score. It tells you where to look, then the evidence has to confirm it.',
    keyInsight: 'No single competitor leads across all dimensions. Global software vendors often have stronger proprietary platforms and international ecosystems, consulting firms may be better positioned for complex transformation programs, and specialized or regional providers can be attractive when customers prioritize customization, flexibility, or cost efficiency.',
    statTiles: [
      { value: '5', label: 'Key comparison dimensions', subtitle: 'Portfolio to evidence quality', description: 'Portfolio breadth, technical differentiation, delivery capability, customer fit and evidence quality.' },
      { value: '15.5%', label: 'FPT global IT services pre-tax profit as a share of revenue in 2025', subtitle: 'Our calculation from company-reported figures', description: 'VND 5,467 billion on VND 35,382 billion.' },
      { value: '7.0%', label: 'CMC group pre-tax profit as a share of revenue reported for 2025', subtitle: 'Our calculation from press-reported figures', description: 'VND 737 billion on VND 10,555 billion; whole group, fiscal-year basis not stated.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two percentages are our own division of company figures with different scopes, not like for like and not a ranking.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software and IT services competitors can be grouped by their primary sources of differentiation. Global platform vendors generally emphasize integrated technology portfolios and scalable products. Consulting and IT services firms emphasize implementation expertise, transformation capabilities, and delivery scale. Vietnamese providers frequently compete through engineering capacity, flexible delivery, local knowledge, and cost efficiency.' },
      { label: 'Why it is happening', text: 'The comparison is a qualitative strategic benchmark, not a numerical ranking. Individual companies operate across multiple segments, and their relative performance can vary by customer size, geography, industry, and specific product or service category.' },
      { label: 'Real-world example', text: 'The brief’s comparison groups enterprise software and cloud platforms (Microsoft, SAP, Oracle, Salesforce) with scalable products and broad functionality but licensing complexity, migration costs and vendor dependence; cloud infrastructure providers (AWS, Azure, Google Cloud) with scale and data and AI capabilities but consumption-cost and technical complexity; global consulting and IT services (Accenture, IBM Consulting, TCS, Infosys) with transformation expertise and delivery scale but programme complexity and cost pressure; specialised software providers (ServiceNow, Workday, Adobe) with focused functionality but dependence on integrations; and Vietnamese providers (FPT, CMC, Viettel Solutions, TMA Solutions) with engineering talent, local knowledge and flexible delivery but variable differentiation and scale. Evidence should come from annual reports, documented case studies, customer references, product documentation and comparable performance indicators.' },
      { label: 'Vietnam example', text: 'FPT reports pre-tax profit of VND 5,467 billion on global IT services revenue of VND 35,382 billion and VND 416 billion on domestic IT services revenue of VND 9,093 billion in 2025, which gives about 15.5% and 4.6% by our own division. CMC is reported to have earned VND 737 billion pre-tax on VND 10,555 billion, about 7.0%, but this is a whole-group figure on a basis not stated. The three percentages are not like for like, and no comparable financial disclosure for Viettel Solutions, VNPT Technology or TMA Solutions was found, so none is shown.' },
      { label: 'Business impact', text: 'Qualitative benchmarking helps identify where each competitor is strongest and which gaps may create opportunities. The next step is to validate these assessments using current company disclosures, customer evidence, and segment-specific performance data.' },
    ],
    visualKind: 'ent-m4-32-compare', visualHeading: 'A qualitative benchmark of five competitor groups',
    visualIntro: 'Read across the table for each group’s strengths and potential limitations.',
    imageAlt: 'Casemate table of a qualitative benchmark of five competitor groups',
    keyTerms: [
      { term: 'Qualitative benchmark', definition: 'A comparison based on described strengths and limitations rather than scores.' },
      { term: 'Consumption cost', definition: 'Cloud charges that rise with how much a customer uses.' },
      { term: 'Vendor dependence', definition: 'Reliance on one supplier for critical technology.' },
      { term: 'Evidence quality', definition: 'How reliable and comparable the sources behind a judgement are.' },
    ],
    recap: [
      'Competitor groups differ in their main strengths and limitations.',
      'No one competitor leads on every dimension.',
      'The comparison is qualitative, not a numerical ranking.',
      'Validate with disclosures, customer evidence and segment data.',
    ],
    chapterRecap: 'Qualitative benchmarking helps identify where each competitor is strongest and which gaps may create opportunities. The next step is to validate these assessments using current company disclosures, customer evidence, and segment-specific performance data.',
    deepDiveTitle: 'Why profit margins from different firms are not comparable',
    body: <EntDeepDive paragraphs={[
      'A segment margin reflects its own cost base and mix of work, while a group margin blends several businesses. Different fiscal years and accounting treatments add further distortion.',
      'Margins are most useful for comparing a firm with its own past or a close peer on the same basis.' ]} evidence="The comparison table is from the supplied brief and is qualitative; FPT figures are from its earnings report and are company-reported; CMC figures are from a press report of company statements; the three percentages are our own division. The caution about comparability is our own." />,
    sources: citeEnt4('fptEarnings2025', 'cmcGrowth'),
  }),
  entM4Chapter({
    title: 'Competitive Positioning and Strategic Differentiation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the main positioning strategies and test whether a position is credible and defensible.',
    mateIntro: 'Why should a customer pick you? A good answer is specific, believable and hard for others to repeat.',
    keyInsight: 'The most defensible positioning combines a clear target market, a distinctive capability, and demonstrable customer value. Differentiation is stronger when supported by repeatable delivery methods, customer references, proprietary assets, and measurable results.',
    statTiles: [
      { value: '6', label: 'Key positioning strategies', subtitle: 'Premium innovation to outcome-based', description: 'Premium innovation, cost-efficiency, industry-specialist, local-market, integrated-solution and outcome-based positioning.' },
      { value: 'US$200–250M', label: 'CMC’s target revenue from Japan by 2028', subtitle: 'VietnamPlus, a company target', description: 'About half of its foreign-market revenue, as targeted.' },
      { value: '+25.4%', label: 'Growth in FPT’s Japan business in 2025', subtitle: 'FPT earnings report, company-reported', description: 'Japan is its main overseas market.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The CMC figure is a company target, not a forecast, and the FPT figure is company-reported for one market.',
    narrative: [
      { label: 'What it is', text: 'Competitive positioning defines why a customer should select one provider over alternatives. Enterprise software companies may differentiate through superior functionality, integrated platforms, security, usability, or specialized industry solutions. IT service providers may position themselves around technical depth, rapid delivery, transformation expertise, local support, or long-term managed services.' },
      { label: 'Why it is happening', text: 'Positioning must be credible and relevant to the target customer. Competing solely on low prices can weaken margins, while claiming broad technological leadership without clear evidence may fail to establish trust. Strong positioning connects specific capabilities to customer outcomes such as lower operating costs, faster processes, improved compliance, or increased revenue.' },
      { label: 'Real-world example', text: 'Premium innovation positioning emphasises advanced technology, product quality, security and sophisticated capabilities; cost-efficiency positioning offers competitive delivery costs, automation, standardised services and transparent pricing; industry-specialist positioning builds expertise in banking, manufacturing, healthcare, retail or logistics; local-market positioning provides Vietnamese-language support, local implementation expertise and solutions aligned with domestic requirements; integrated-solution positioning combines software, consulting, integration and ongoing support; and outcome-based positioning demonstrates measurable improvements in productivity, process speed, reliability or customer experience.' },
      { label: 'Vietnam example', text: 'FPT and CMC both position around Japan, with FPT reporting 25.4% growth there in 2025 and CMC targeting US$200–250 million of Japan revenue by 2028, the latter a company target. CMC describes itself as a best-shore, one-stop provider and states an aim to become a global AI transformation company. MISA positions itself as a Vietnam-compliant cloud accounting and management platform with a claimed 33% share of accounting software, all company statements. No public data on how customers rank these positions was found.' },
      { label: 'Business impact', text: 'Effective positioning requires more than a list of technical features. Providers must explain how their distinctive capabilities address customer priorities and why those advantages are difficult for competitors to reproduce.' },
    ],
    visualKind: 'ent-m4-33-positioning', visualHeading: 'Six positioning strategies compared',
    visualIntro: 'See where six strategies sit by breadth of offer and reliance on price.',
    imageAlt: 'Casemate matrix placing six positioning strategies by breadth of offer and reliance on price',
    keyTerms: [
      { term: 'Positioning', definition: 'The reason a target customer should choose one provider over others.' },
      { term: 'Industry specialist', definition: 'A provider with deep expertise in a particular sector.' },
      { term: 'Outcome-based positioning', definition: 'Selling on measurable improvements in the customer’s results.' },
      { term: 'Local-market advantage', definition: 'Strength from understanding domestic language, rules and operations.' },
    ],
    recap: [
      'Positioning explains why customers should choose a provider.',
      'It must be credible and relevant, not just a list of features.',
      'Low price alone weakens margins.',
      'Evidence, references and proprietary assets make positions defensible.',
    ],
    chapterRecap: 'Effective positioning requires more than a list of technical features. Providers must explain how their distinctive capabilities address customer priorities and why those advantages are difficult for competitors to reproduce.',
    deepDiveTitle: 'Why a claimed advantage needs evidence',
    body: <EntDeepDive paragraphs={[
      'Buyers hear similar claims from every provider. A position becomes believable when it is backed by references, repeatable methods and measured results that rivals cannot easily match.',
      'Without that evidence, a claim of leadership may weaken rather than build trust.' ]} evidence="The positioning strategies are from the supplied brief; CMC statements are from its press release, marketing deck and a VietnamPlus report; FPT’s figure is from its earnings report; MISA statements are from its press release. The matrix positions are our own illustration, and the comment on evidence restates the brief in our own words." />,
    sources: citeEnt4('cmcJapan', 'fptEarnings2025', 'cmcNtt', 'cmcDeck', 'misaPress'),
  }),
];

const quiz = entQuiz('ent-m4-l3', [
  { chapter: '1', objective: 'State what a benchmark measures', question: 'What should a meaningful benchmark measure?', application: 'An analyst compares only revenue. What is missing?', correct: 'Competitive fitness for a particular market, not simply company size', wrong: ['Office space', 'Logo recognition', 'Employee age'], explanation: 'Fitness, not size. Review Chapter 1.' },
  { chapter: '1', objective: 'Match indicators to model', question: 'Why must vendors and service providers use different indicators?', application: 'A team uses the same metrics for both. What is wrong?', correct: 'Their business models differ, so identical financial measures alone are misleading', wrong: ['They are identical', 'Services have no finances', 'Software has no customers'], explanation: 'Models differ. Review Chapter 1.' },
  { chapter: '1', objective: 'State benchmark hygiene', question: 'What should comparisons use?', application: 'Two firms report different year-ends. What is the risk?', correct: 'Consistent reporting periods, clearly defined metrics and comparable business segments', wrong: ['Any available figures', 'Only press headlines', 'Only logos'], explanation: 'Consistency matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a framework correctly', question: 'How should the VINASA Tech Map be described?', application: 'A slide calls it a global standard. What is the correction?', correct: 'As one Vietnamese association’s assessment of firms on 10 criteria across Vision and Execution', wrong: ['As a Gartner ranking', 'As a law', 'As an FPT report'], explanation: 'It is local. Review Chapter 1.' },
  { chapter: '2', objective: 'State the key insight', question: 'What does the benchmark conclude about competitor leadership?', application: 'A buyer assumes one firm leads everywhere. What is the correction?', correct: 'No single competitor leads across all dimensions', wrong: ['One firm leads everywhere', 'Leadership is irrelevant', 'Only size matters'], explanation: 'Each group has strengths and limits. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a limitation', question: 'Which is a potential limitation of enterprise software and cloud platforms in the benchmark?', application: 'A buyer weighs a large platform. What should it consider?', correct: 'Licensing complexity, migration costs and vendor dependence', wrong: ['No functionality', 'No customers', 'No scale'], explanation: 'Scale has costs. Review Chapter 2.' },
  { chapter: '2', objective: 'Know what to do next', question: 'What is the next step after a qualitative benchmark?', application: 'A team finishes the table. What should it do?', correct: 'Validate it with current company disclosures, customer evidence and segment-specific performance data', wrong: ['Publish it as final', 'Delete it', 'Rank firms by size'], explanation: 'Validate the judgements. Review Chapter 2.' },
  { chapter: '3', objective: 'State the strongest positioning', question: 'What does the most defensible positioning combine?', application: 'A firm lists features. What is missing?', correct: 'A clear target market, a distinctive capability and demonstrable customer value', wrong: ['A long feature list', 'The lowest price', 'A famous founder'], explanation: 'Specific and proven. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a positioning strategy', question: 'Which is a positioning strategy in the chapter?', application: 'A strategist lists options. Which belongs?', correct: 'Industry-specialist positioning', wrong: ['Weather positioning', 'Fabric positioning', 'Agricultural positioning'], explanation: 'Six strategies are named. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a target correctly', question: 'How should CMC’s US$200–250 million Japan figure be described?', application: 'A slide calls it a forecast. What is the correction?', correct: 'As a company target for 2028', wrong: ['As audited revenue', 'As a Gartner forecast', 'As a law'], explanation: 'Targets are aims. Review Chapter 3.' },
]);

export const LESSON_ENT4_3: EntM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can choose fair benchmarking criteria, read a qualitative competitor benchmark and judge whether a positioning claim is defensible.',
    keyTakeaways: [
      'A benchmark measures fitness for a market, not company size.',
      'Vendors and service firms need different indicators and consistent periods.',
      'No competitor leads on every dimension, and qualitative judgements need validation.',
      'The most defensible position joins a target market, a distinctive capability and proven value.',
      'Margins and revenues of different scopes are not compared directly in this module.',
    ],
    businessImplications: 'Benchmark on a like-for-like basis, validate with evidence and position around capabilities that rivals cannot easily reproduce.',
    remember: 'Compare like with like, and back every claim with evidence.',
    nextLesson: 'Key Success Factors',
  },
};
