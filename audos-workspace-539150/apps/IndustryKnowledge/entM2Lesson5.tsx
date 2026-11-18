import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '5. Inputs, Outputs & Value Creation';

const deck = [
  entM2Chapter({
    title: 'Key Inputs and Resource Requirements', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the main inputs of a software or services business and explain why their mix differs by business model.',
    mateIntro: 'A software vendor and a consulting firm use the same words but spend their money on very different things.',
    keyInsight: 'The quality and availability of inputs influence both delivery efficiency and final customer outcomes. Providers must manage talent, technology, data, and intellectual property as interconnected resources.',
    statTiles: [
      { value: '5', label: 'Key input groups', subtitle: 'People to financial resources', description: 'Human capital, technology assets, intellectual property, customer information and financial resources.' },
      { value: '700K', label: 'Estimated demand for IT workers in Vietnam by end-2025', subtitle: 'An Binh Securities via Viet Nam News', description: 'Human capital is the input in shortest supply.' },
      { value: '~500K', label: 'Qualified candidates from domestic training', subtitle: 'An Binh Securities via Viet Nam News', description: 'Against the demand estimate, a broker figure.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Workforce figures are broker estimates reported by a news outlet and other sources give different numbers.',
    narrative: [
      { label: 'What it is', text: 'The main inputs for Enterprise Software & IT Services include skilled labor, intellectual property, development tools, cloud infrastructure, software components, customer requirements, business data, and financial capital. The relative importance of each input varies by business model. A SaaS vendor may invest heavily in product development and cloud operations, while a consulting firm depends more heavily on professional expertise and project delivery capacity.' },
      { label: 'Why it is happening', text: 'Data quality and customer domain knowledge are particularly important for enterprise projects. Even advanced software may produce poor results if underlying data is incomplete, workflows are unclear, or business requirements have not been adequately understood.' },
      { label: 'Real-world example', text: 'Providers employ engineers, consultants, architects, testers, project managers and support specialists; use development environments, cloud platforms, databases, APIs and security tools; develop proprietary software, reusable components, frameworks, templates and methods; gather requirements, business rules, existing system documentation and operational data; and fund research, infrastructure, recruitment, training, marketing and delivery.' },
      { label: 'Vietnam example', text: 'Viet Nam News, citing An Binh Securities, reports demand for 700,000 IT workers by end-2025 against about 500,000 qualified candidates, which shows the pressure on the human-capital input. FPT lists FPT AI Factory and semiconductor chip design among its technology services, a company report of investment in its own technology assets. Vietnam’s Law on Data (60/2024/QH15) and Personal Data Protection Law (91/2025/QH15) set rules that affect how customer information can be handled as an input. No public data on research spending or capital investment by Vietnamese providers was found.' },
      { label: 'Business impact', text: 'The industry’s outputs depend on a combination of people, technology, knowledge, and customer-specific information. Strong resource management supports quality, productivity, and the ability to scale.' },
    ],
    visualKind: 'ent-m2-51-inputs', visualHeading: 'Five input groups',
    visualIntro: 'Read across the table for examples of each input and why it matters.',
    imageAlt: 'Casemate table of five input groups for enterprise software and IT services',
    keyTerms: [
      { term: 'Intellectual property', definition: 'Original software, methods and designs that a firm owns and can reuse.' },
      { term: 'Capital', definition: 'Money invested in research, infrastructure, hiring and delivery.' },
      { term: 'Business rules', definition: 'The policies and conditions a customer’s processes follow, which software must reflect.' },
      { term: 'Data quality', definition: 'How complete, accurate and consistent a body of data is.' },
    ],
    recap: [
      'Inputs include people, technology, intellectual property, customer information and money.',
      'The mix differs between a SaaS vendor and a consulting firm.',
      'Poor data or unclear requirements undermine even advanced software.',
      'Resources should be managed as an interconnected set.',
    ],
    chapterRecap: 'The industry’s outputs depend on a combination of people, technology, knowledge, and customer-specific information. Strong resource management supports quality, productivity, and the ability to scale.',
    deepDiveTitle: 'Why customer data is an input the provider does not control',
    body: <EntDeepDive paragraphs={[
      'Providers choose their own tools and staff, but the quality of a customer’s data and the clarity of its processes are outside their control. They still decide whether a project succeeds.',
      'Early data checks and clear requirements are therefore part of delivery, not an afterthought.' ]} evidence="Input groups are from the supplied brief; workforce figures are from Viet Nam News (An Binh Securities); FPT services are from its annual report; the data laws are from Regulations.AI and the Official Gazette. The point on early data checks is our own reading of the brief." />,
    sources: citeEnt('vietnamnewsItWorkforce', 'fptTechnology2025', 'dataLawOverview', 'pdplGazette'),
  }),
  entM2Chapter({
    title: 'Tangible and Intangible Outputs', chapterTitle: LESSON, readingTime: '6',
    objective: 'Distinguish the tangible and intangible outputs of the industry and explain why both must be measured.',
    mateIntro: 'Customers receive a system, but what they really want is a better way of working. The second is harder to measure.',
    keyInsight: 'Technology deliverables are only one part of the industry’s output; the ultimate objective is improved organizational capability. Providers should evaluate both technical completion and the business outcomes that follow from implementation.',
    statTiles: [
      { value: '5', label: 'Key output groups', subtitle: 'Products to business outcomes', description: 'Software products, integrated environments, IT services, knowledge assets and business outcomes.' },
      { value: '47.3%', label: 'Share of FPT overseas IT services revenue from digital transformation in 2025', subtitle: 'FPT annual report, company-reported', description: 'VND 16,751 billion, up 16.8%.' },
      { value: '8.2%', label: 'Productivity gain FPT reports from its AI-first strategy', subtitle: 'FPT annual report, company-reported', description: 'A company claim, not an independently measured result.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Both FPT figures are company-reported and describe one provider.',
    narrative: [
      { label: 'What it is', text: 'The industry’s outputs include software applications, integrated systems, cloud environments, data platforms, cybersecurity solutions, technical documentation, and managed technology services. Some outputs are tangible in the form of deployed infrastructure or documented deliverables, but much of the industry’s value is intangible.' },
      { label: 'Why it is happening', text: 'Intangible outputs include intellectual property, process knowledge, automation capability, organizational learning, and improved decision-making. These outcomes may be more valuable than the software itself, although they can be harder to measure and often require a baseline and clear performance indicators.' },
      { label: 'Real-world example', text: 'Providers deliver licensed applications, SaaS platforms, enterprise modules and custom-built systems; connect applications, databases, cloud services and business workflows; provide consulting, development, implementation, testing, support and managed operations; produce documentation, architectures, operating procedures and reusable components; and help customers achieve faster processing, improved reporting, fewer errors, better service and stronger control.' },
      { label: 'Vietnam example', text: 'FPT’s 2025 annual report lists national and provincial digital systems, FPT AI Factory and semiconductor chip design among its outputs, and reports digital transformation revenue of VND 16,751 billion, about 47.3% of its overseas IT services revenue, all company-reported. No public Vietnam-wide data on measured business outcomes from technology projects was found.' },
      { label: 'Business impact', text: 'Industry outputs range from software products and technical services to intangible improvements in business capability. Measuring both deliverables and outcomes helps establish whether technology investments create meaningful value.' },
    ],
    visualKind: 'ent-m2-52-outputs', visualHeading: 'Tangible and intangible outputs',
    visualIntro: 'Compare what the industry delivers that can be seen with what it delivers that cannot.',
    imageAlt: 'Casemate comparison of tangible and intangible outputs of enterprise software and IT services',
    keyTerms: [
      { term: 'Deliverable', definition: 'A concrete item handed to a customer, such as a system or a document.' },
      { term: 'Baseline', definition: 'A starting measurement against which improvement is judged.' },
      { term: 'Organisational learning', definition: 'Knowledge an organisation gains and keeps from doing a project.' },
      { term: 'Performance indicator', definition: 'An agreed measure of progress, such as processing time or error rate.' },
    ],
    recap: [
      'Outputs include software, systems, services and documents.',
      'Much of the value is intangible: knowledge, automation and better decisions.',
      'Intangible outcomes are harder to measure without a baseline.',
      'Evaluate technical completion and business outcomes together.',
    ],
    chapterRecap: 'Industry outputs range from software products and technical services to intangible improvements in business capability. Measuring both deliverables and outcomes helps establish whether technology investments create meaningful value.',
    deepDiveTitle: 'Why outcomes need a baseline',
    body: <EntDeepDive paragraphs={[
      'A claim such as faster processing can only be tested against how long processing took before. Without that starting point, both sides can read the result as they please.',
      'Agreeing indicators before the project starts turns an outcome promise into evidence.' ]} evidence="Output groups are from the supplied brief; FPT figures and descriptions are from its 2025 annual report and are company-reported. The advice on baselines restates the brief’s comment on performance indicators in our own words." />,
    sources: citeEnt('fptTechnology2025', 'fptGlobalIt2025'),
  }),
  entM2Chapter({
    title: 'Value Creation, Capture, and Distribution', chapterTitle: LESSON, readingTime: '7',
    objective: 'Separate creating customer value from capturing it commercially and describe who shares the value.',
    mateIntro: 'A product can change a customer’s business and still earn little if it is priced weakly or easily replaced.',
    keyInsight: 'The ability to create customer value and the ability to capture commercial value are related but distinct. A provider may deliver substantial benefits yet earn limited returns if pricing is weak, delivery costs are high, or its contribution is easily substituted.',
    statTiles: [
      { value: '5', label: 'Key value activities', subtitle: 'Monetization to value distribution', description: 'Product monetization, service monetization, productivity improvement, value measurement and value distribution.' },
      { value: '15.5%', label: 'FPT overseas IT services pre-tax profit as a share of revenue in 2025', subtitle: 'Our calculation from company-reported figures', description: 'VND 5,467 billion on VND 35,382 billion.' },
      { value: '4.6%', label: 'FPT domestic IT services pre-tax profit as a share of revenue in 2025', subtitle: 'Our calculation from company-reported figures', description: 'VND 416 billion on VND 9,093 billion.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two percentages are our own division of figures FPT reports. They describe one company’s segments, which have different cost bases, and are not industry margins.',
    narrative: [
      { label: 'What it is', text: 'Value creation occurs when technology improves the way an organization operates, serves customers, manages risks, or develops new products. Value capture refers to how providers convert those benefits into revenue and profit through subscriptions, licenses, project fees, usage-based pricing, and managed-service contracts.' },
      { label: 'Why it is happening', text: 'Value is distributed among multiple stakeholders. Customers benefit from improved operations, software vendors earn product revenue, service providers monetize implementation expertise, and infrastructure providers earn fees for computing and platform resources. The distribution depends on intellectual property ownership, bargaining power, contract structure, switching costs, and the availability of alternative providers.' },
      { label: 'Real-world example', text: 'Providers capture value through subscriptions, licences, usage charges and premium features, and through fees for consulting, implementation, development, maintenance and managed services. They raise productivity by reusing code, templates, automation and standard methods, compare project costs with gains in processing time, error rates, operating costs or revenue, and manage agreements among customers, vendors, implementation partners and infrastructure providers.' },
      { label: 'Vietnam example', text: 'FPT reports a technology sector that provided 63.4% of group revenue but 45.3% of pre-tax profit in 2025. Within it, dividing its reported pre-tax profit by revenue gives about 15.5% for overseas IT services and about 4.6% for domestic IT services, our own calculation, which suggests that where and how work is sold affects what is captured. FPT also says it is shifting overseas contracts from time-and-materials toward managed services. No public Vietnam-wide data on margins by provider type was found.' },
      { label: 'Business impact', text: 'Value creation depends on improving customer capabilities, while value capture depends on commercial positioning and efficient delivery. Sustainable providers align their pricing, operating model, and customer outcomes.' },
    ],
    visualKind: 'ent-m2-53-value', visualHeading: 'Capturing value differs by segment',
    visualIntro: 'Compare FPT’s overseas and domestic pre-tax profit as a share of revenue.',
    imageAlt: 'Casemate bar chart of FPT pre-tax profit as a share of revenue for overseas and domestic IT services in 2025',
    keyTerms: [
      { term: 'Value capture', definition: 'How a provider turns customer benefit into its own revenue and profit.' },
      { term: 'Switching cost', definition: 'The time, money and risk a customer faces in moving to another provider.' },
      { term: 'Bargaining power', definition: 'The ability to influence price and terms in a negotiation.' },
      { term: 'Usage-based pricing', definition: 'Charging according to how much of a service the customer uses.' },
    ],
    recap: [
      'Value creation and value capture are related but distinct.',
      'Customers, vendors, service providers and infrastructure providers share the value.',
      'Pricing, delivery cost and substitutability shape the returns.',
      'Measuring results against cost shows whether value is real.',
    ],
    chapterRecap: 'Value creation depends on improving customer capabilities, while value capture depends on commercial positioning and efficient delivery. Sustainable providers align their pricing, operating model, and customer outcomes.',
    deepDiveTitle: 'Why the same company earns different returns on different work',
    body: <EntDeepDive paragraphs={[
      'Overseas and domestic work differ in customers, contract types, competition and costs. A higher return in one segment may reflect pricing power, scale or the mix of services, and the company reports do not say which.',
      'The lesson is to ask what drives a margin before copying a business model.' ]} evidence="Value activities are from the supplied brief; the revenue and profit figures are from FPT’s annual and earnings reports and are company-reported; the two percentages are our own division of reported figures. The reasons for the difference are not stated in the sources and the comment above is our own reading." />,
    sources: citeEnt('fptTechnology2025', 'fptGlobalIt2025', 'fptEarnings2025'),
  }),
];

const quiz = entQuiz('ent-m2-l5', [
  { chapter: '1', objective: 'List inputs', question: 'Which is a main input for the industry?', application: 'A manager lists inputs. Which belongs?', correct: 'Skilled labour, intellectual property, cloud infrastructure and customer data', wrong: ['Raw cotton', 'Crude oil', 'Coffee beans'], explanation: 'These are named inputs. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare business models', question: 'How does a SaaS vendor’s input mix differ from a consulting firm’s?', application: 'Two firms plan budgets. How do they differ?', correct: 'A SaaS vendor invests heavily in product development and cloud operations, while a consulting firm relies on professional expertise and delivery capacity', wrong: ['They are the same', 'SaaS needs no staff', 'Consulting needs no people'], explanation: 'Mix varies by model. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain data importance', question: 'Why do data quality and domain knowledge matter?', application: 'A project uses incomplete data. What is the risk?', correct: 'Even advanced software may produce poor results if data or requirements are weak', wrong: ['Software fixes all data', 'Data never matters', 'Only hardware matters'], explanation: 'Inputs shape outcomes. Review Chapter 1.' },
  { chapter: '1', objective: 'Read workforce data', question: 'How should the 700,000 IT worker demand figure be described?', application: 'A slide calls it an official statistic. What is wrong?', correct: 'It is a broker estimate reported by a news outlet', wrong: ['It is a census count', 'It is a Gartner forecast', 'It is a law'], explanation: 'Label estimates. Review Chapter 1.' },
  { chapter: '2', objective: 'Name intangible outputs', question: 'Which is an intangible output?', application: 'A report lists outputs. Which is intangible?', correct: 'Process knowledge, automation capability or improved decision-making', wrong: ['A deployed server', 'A printed manual', 'A laptop'], explanation: 'Intangibles are knowledge-based. Review Chapter 2.' },
  { chapter: '2', objective: 'State the ultimate objective', question: 'What is the ultimate objective of technology deliverables?', application: 'A client asks what the project is for. What is the answer?', correct: 'Improved organizational capability', wrong: ['More servers', 'More documents', 'Longer contracts'], explanation: 'Capability is the aim. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain baselines', question: 'Why are baselines needed?', application: 'A vendor claims faster processing. What do you need?', correct: 'To compare outcomes with a starting measurement and agreed indicators', wrong: ['To raise prices', 'To avoid testing', 'To remove staff'], explanation: 'Measurement needs a start. Review Chapter 2.' },
  { chapter: '3', objective: 'Distinguish creation from capture', question: 'How do value creation and value capture differ?', application: 'A product transforms a customer but earns little. Why?', correct: 'Creation is customer benefit; capture is converting it to revenue and profit, and they are related but distinct', wrong: ['They are identical', 'Capture means free software', 'Creation means price only'], explanation: 'Returns depend on pricing and cost. Review Chapter 3.' },
  { chapter: '3', objective: 'List value stakeholders', question: 'Who shares in the value of enterprise technology?', application: 'A map shows who benefits. Which groups appear?', correct: 'Customers, software vendors, service providers and infrastructure providers', wrong: ['Only customers', 'Only governments', 'Nobody'], explanation: 'Value is distributed. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a calculation correctly', question: 'How should the 15.5% and 4.6% FPT percentages be described?', application: 'A slide presents them as industry margins. What is the correction?', correct: 'As our own division of one company’s reported segment figures, not industry margins', wrong: ['As official statistics', 'As Gartner forecasts', 'As legal limits'], explanation: 'Label calculations. Review Chapter 3.' },
]);

export const LESSON_ENT2_5: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can list the inputs and outputs of the industry and explain how value is created, captured and shared.',
    keyTakeaways: [
      'Inputs include talent, technology, intellectual property, customer data and capital.',
      'Customer data and requirements strongly affect outcomes.',
      'Outputs include tangible systems and intangible capability.',
      'Value creation and capture are related but distinct.',
      'Company figures and our own calculations are labelled and are not industry averages.',
    ],
    businessImplications: 'Manage inputs as one connected set, measure outcomes against a baseline and align pricing with the value delivered.',
    remember: 'Delivering value and earning from it are two different problems.',
    nextLesson: 'Global vs. Local Value Chain',
  },
};
