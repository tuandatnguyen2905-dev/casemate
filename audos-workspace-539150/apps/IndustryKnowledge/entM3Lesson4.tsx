import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '4. Revenue Streams & Cost Structure';

const deck = [
  entM3Chapter({
    title: 'Revenue Models and Income Sources', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the main ways providers charge and explain why revenue quality matters more than revenue size.',
    mateIntro: 'The same dollar can be worth more or less depending on whether it repeats, how much it cost to win and what it takes to deliver.',
    keyInsight: 'Revenue quality depends on predictability, customer retention, contract economics, and the cost of delivery. Recurring revenue can improve visibility, but it is only attractive when service obligations and customer acquisition costs remain commercially sustainable.',
    statTiles: [
      { value: '6', label: 'Key revenue sources', subtitle: 'Subscriptions to partner and licensing revenue', description: 'Subscription, licence, project, managed-service, usage-based and partner and licensing revenue.' },
      { value: 'US$126.8M', label: 'Estimated Vietnam cloud ERP for SMEs market in 2025', subtitle: 'Ken Research, third-party estimate', description: 'Projected to reach US$356.7 million by 2031. Covers subscriptions and related services.' },
      { value: '21.0%', label: 'Estimated paid cloud ERP penetration of addressable Vietnamese SMEs in 2025', subtitle: 'Ken Research, third-party estimate', description: 'Excludes standalone accounting products, so it understates cloud software use.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Both figures are one research firm’s estimates for a narrow product category and cannot be extended to the whole industry.',
    narrative: [
      { label: 'What it is', text: 'Enterprise Software & IT Services companies generate revenue through different combinations of product sales, subscriptions, licenses, implementation projects, consulting engagements, and recurring support contracts. The mix depends on whether the business primarily sells software, provides professional services, operates technology environments, or combines multiple offerings.' },
      { label: 'Why it is happening', text: 'Software subscriptions can create recurring revenue, while project-based services generate revenue as work is delivered under agreed commercial terms. Managed services provide recurring income in exchange for ongoing operational responsibilities. Some providers also earn revenue from usage-based pricing, software marketplaces, resale arrangements, and intellectual property licensing.' },
      { label: 'Real-world example', text: 'Providers charge monthly or annual fees for access, users, modules or tiers; sell rights to use proprietary software on defined terms; bill consulting, development, implementation, migration and integration by fixed fee, time and materials or milestones; earn recurring fees for application maintenance, cloud management, infrastructure operations or cybersecurity; charge by transactions, computing use, API calls or data volume; and earn income from authorised resale, technology distribution, licensing or partner arrangements.' },
      { label: 'Vietnam example', text: 'MISA sells AMIS Accounting as an annual subscription from VND 2,950,000 for one user, a vendor list price. Ken Research estimates the Vietnam cloud ERP for SMEs market, which covers subscriptions and related services, at about US$126.8 million in 2025 and US$356.7 million by 2031. FPT reports that it is moving overseas contracts from time-and-materials toward managed services, a company statement. No public Vietnam-wide split of provider revenue by model was found, and the figures above use different definitions.' },
      { label: 'Business impact', text: 'Revenue models determine how companies monetize technology and expertise. Providers should build a balanced revenue mix that matches their capabilities, customer needs, and ability to deliver services profitably.' },
    ],
    visualKind: 'ent-m3-41-revenue', visualHeading: 'Six revenue sources and what to watch',
    visualIntro: 'Read across the table for how each source is charged and what to watch.',
    imageAlt: 'Casemate table of six revenue sources, how they are charged and what to watch',
    keyTerms: [
      { term: 'Time and materials', definition: 'A contract that bills for the hours and resources actually used.' },
      { term: 'Milestone billing', definition: 'Payment tied to the completion of agreed project stages.' },
      { term: 'Usage-based pricing', definition: 'Charging according to how much of a service the customer uses.' },
      { term: 'Revenue mix', definition: 'The share of income that comes from each type of revenue source.' },
    ],
    recap: [
      'Revenue comes from subscriptions, licences, projects, managed services, usage and partners.',
      'The mix depends on whether a firm sells software, services or both.',
      'Recurring revenue improves visibility.',
      'It is attractive only if delivery and acquisition costs stay sustainable.',
    ],
    chapterRecap: 'Revenue models determine how companies monetize technology and expertise. Providers should build a balanced revenue mix that matches their capabilities, customer needs, and ability to deliver services profitably.',
    deepDiveTitle: 'Why not all revenue is equally valuable',
    body: <EntDeepDive paragraphs={[
      'A subscription that renews for years is worth more than a one-off project of the same size, but only if keeping the customer is cheap. A project can be profitable and predictable in a different way if the price covers the work.',
      'Comparing revenue by predictability, cost to win and cost to serve is more useful than comparing totals.' ]} evidence="The revenue sources are from the supplied brief; the subscription price is from MISA’s website; the market estimate is from Ken Research; FPT’s statement is from its annual report. The comparison of revenue quality restates the brief’s Key Insight in our own words." />,
    sources: citeEnt3('kenCloudErp', 'misaAccounting', 'fptGlobalIt2025'),
  }),
  entM3Chapter({
    title: 'Cost Structure and Major Operating Expenses', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify the main cost groups and explain how product-led and service-led businesses scale differently.',
    mateIntro: 'Software costs a lot to build and little to copy. Services cost less to start but a bit more with every new project.',
    keyInsight: 'Cost efficiency depends on the business model and how effectively resources are reused. Software vendors must control product development and infrastructure expenses, while service providers must manage staffing, utilization, project scope, and delivery productivity.',
    statTiles: [
      { value: '6', label: 'Key cost groups', subtitle: 'Personnel to compliance', description: 'Personnel, research and development, cloud and infrastructure, sales and marketing, service delivery, and administration and compliance.' },
      { value: '150–200K', label: 'Forecast annual shortage of tech workers in Vietnam', subtitle: 'TopDev via VnEconomy', description: 'Talent scarcity pushes up the main cost, people.' },
      { value: '~30%', label: 'Share of IT graduates reported as job-ready', subtitle: 'Viet Nam News and VnEconomy', description: 'Of roughly 50,000 IT graduates a year.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Workforce figures are recruiter and broker estimates reported by news outlets, and sources differ.',
    narrative: [
      { label: 'What it is', text: 'The industry’s cost structure is shaped by talent, technology infrastructure, product development, sales, customer support, and service delivery. Software vendors often incur substantial upfront investment in research and development, while IT service providers face ongoing labor costs associated with project teams and customer contracts.' },
      { label: 'Why it is happening', text: 'Cloud infrastructure, software licenses, cybersecurity, sales commissions, recruitment, training, and customer acquisition can also contribute significantly to expenses. Cost structures differ by business model: a scalable software product may serve additional customers with relatively low incremental costs, whereas a customized implementation typically requires more direct labor as project scope expands.' },
      { label: 'Real-world example', text: 'Costs include salaries, benefits, recruitment, training and retention for engineers, consultants, sales teams and support staff; product design, software engineering, testing, innovation and maintenance; computing, storage, networking, hosting, monitoring and security services; lead generation, sales compensation, demonstrations, partner programmes and customer acquisition; project management, implementation teams, travel, subcontractors and customer support; and finance, legal services, insurance, governance and certification.' },
      { label: 'Vietnam example', text: 'VnEconomy, citing a TopDev report, estimates a Vietnamese IT workforce of 530,000 and a shortage of 150,000 to 200,000 workers a year, and Viet Nam News reports that only about 30% of IT graduates are job-ready, which points to training and retention costs. Law 71/2025/QH15 on the Digital Technology Industry covers human resources and incentives. Gartner forecasts worldwide IaaS spending up 29.3% in 2026, a global figure. FPT reports domestic IT services revenue up 11.5% but pre-tax profit down 9.7%, without a single stated cause. No public data on the cost structure of Vietnamese software or services firms, such as the share of costs spent on people, was found.' },
      { label: 'Business impact', text: 'Cost structures vary between product-led and service-led businesses. Effective cost management requires understanding which expenses scale with revenue, which are fixed, and which can be reduced through automation, standardization, and reuse.' },
    ],
    visualKind: 'ent-m3-42-costs', visualHeading: 'Six main cost groups',
    visualIntro: 'Explore the six cost groups around the cost base.',
    imageAlt: 'Casemate mind map of six main cost groups of enterprise software and IT services businesses',
    keyTerms: [
      { term: 'Incremental cost', definition: 'The extra cost of serving one more customer.' },
      { term: 'Fixed cost', definition: 'A cost that stays the same whatever the volume of sales.' },
      { term: 'Subcontractor', definition: 'An outside firm or person hired to carry out part of a project.' },
      { term: 'Standardization', definition: 'Using the same methods, templates and components across projects to cut effort.' },
    ],
    recap: [
      'Software has high upfront development cost and low incremental cost.',
      'Services carry continuing labour cost that grows with project scope.',
      'Cloud, security, sales, delivery and compliance add further costs.',
      'Automation, standardization and reuse reduce cost.',
    ],
    chapterRecap: 'Cost structures vary between product-led and service-led businesses. Effective cost management requires understanding which expenses scale with revenue, which are fixed, and which can be reduced through automation, standardization, and reuse.',
    deepDiveTitle: 'Why scarce talent changes the economics of services',
    body: <EntDeepDive paragraphs={[
      'When skilled people are scarce, salaries, recruitment and retention programmes take a growing share of cost, and a firm that cannot hire cannot take on more projects. Revenue growth then depends on productivity as well as demand.',
      'Software vendors feel this too, but reuse lets them spread engineering cost across many customers.' ]} evidence="The cost groups are from the supplied brief; workforce figures are from VnEconomy (TopDev) and Viet Nam News; the law is from the Ministry of Science and Technology legal database; the IaaS forecast is from Gartner; FPT figures are from its earnings report. The link between talent scarcity and cost is our own reading." />,
    sources: citeEnt3('vneconomyTalent', 'vietnamnewsItWorkforce', 'digitalTechLaw', 'gartnerJuly2026', 'fptEarnings2025'),
  }),
  entM3Chapter({
    title: 'Profitability, Unit Economics, and Financial Sustainability', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain the key unit-economics measures for SaaS and services and why growth alone does not create value.',
    mateIntro: 'A fast-growing company can still be losing money on every customer. Unit economics tells you whether growth is worth having.',
    keyInsight: 'Revenue growth creates sustainable value only when unit economics and cash flow remain healthy. Companies need to measure profitability at the product, customer, project, and contract levels rather than relying solely on total sales growth.',
    statTiles: [
      { value: '5', label: 'Key financial activities', subtitle: 'SaaS economics to cash flow', description: 'SaaS unit economics, project profitability, resource utilization, customer retention and cash flow management.' },
      { value: '~80%', label: 'Share of firms using a free cloud ERP platform right after training', subtitle: 'World Bank study of one Vietnamese provider', description: 'Usage fell to about 40% afterwards and 35% about 18 months later.' },
      { value: '35%', label: 'Share of those firms still using the platform about 18 months later', subtitle: 'World Bank study of one Vietnamese provider', description: 'Free access, so this shows adoption drop-off, not paid churn.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures come from one study of one provider’s free programme and are not paid-customer churn or an industry average.',
    narrative: [
      { label: 'What it is', text: 'Profitability depends on the relationship between revenue, delivery costs, investment requirements, customer retention, and operating expenses. SaaS companies commonly evaluate recurring revenue, gross margin, customer acquisition cost, churn, and customer lifetime value. IT service providers focus more heavily on project margins, employee utilization, billable rates, delivery efficiency, and contract profitability.' },
      { label: 'Why it is happening', text: 'Growth can create financial pressure if companies recruit ahead of demand, accept underpriced projects, spend excessively on customer acquisition, or maintain unprofitable contracts. Conversely, reusable software assets, standardized delivery methods, strong renewal rates, and disciplined resource planning can improve financial performance.' },
      { label: 'Real-world example', text: 'SaaS firms monitor annual and monthly recurring revenue, churn, customer acquisition cost and lifetime value; service firms compare contracted fees with actual labour hours, subcontracting, rework and delivery overhead; managers track billable utilization, staffing capacity, project pipeline and productivity; teams evaluate renewals, expansion revenue, service quality and the cost of keeping accounts; and finance monitors payment terms, milestones, receivables, working capital and investment commitments.' },
      { label: 'Vietnam example', text: 'In the World Bank study of a Vietnamese cloud ERP provider, close to 80% of firms used the platform after initial training, about 40% afterwards and 35% about 18 months later, although access was free. MISA says it expected its accounting customers to grow 32.3% in 2025 to 283,385 and that its revenue rose 72.9% on the same period a year earlier, vendor claims without a stated profit measure. Dividing FPT’s reported pre-tax profit by revenue gives about 15.5% for overseas and 4.6% for domestic IT services in 2025, our own arithmetic for one company. No public Vietnam data on churn, acquisition cost or lifetime value was found.' },
      { label: 'Business impact', text: 'Financial sustainability depends on more than revenue growth. Providers need transparent unit economics, realistic pricing, disciplined delivery, and appropriate investment in products, people, and infrastructure.' },
    ],
    visualKind: 'ent-m3-43-economics', visualHeading: 'Use after a free-access programme',
    visualIntro: 'Compare the share of firms using the platform at three points in time.',
    imageAlt: 'Casemate bar chart of SME platform use after training, afterwards and about 18 months later',
    keyTerms: [
      { term: 'ARR and MRR', definition: 'Annual and monthly recurring revenue from subscriptions.' },
      { term: 'Churn', definition: 'The rate at which customers stop paying or using a product.' },
      { term: 'CAC', definition: 'Customer acquisition cost: what it costs to win one new customer.' },
      { term: 'LTV', definition: 'Customer lifetime value: the revenue or margin a customer brings over time.' },
    ],
    recap: [
      'SaaS firms track recurring revenue, margin, CAC, churn and LTV.',
      'Service firms track project margin, utilization and billable rates.',
      'Growth can hide underpriced projects and costly acquisition.',
      'Measure profit by product, customer, project and contract.',
    ],
    chapterRecap: 'Financial sustainability depends on more than revenue growth. Providers need transparent unit economics, realistic pricing, disciplined delivery, and appropriate investment in products, people, and infrastructure.',
    deepDiveTitle: 'Why customer count is not the same as customer value',
    body: <EntDeepDive paragraphs={[
      'A vendor can report rising customer numbers while many customers barely use the product and may not renew. Adoption data, renewals and expansion show whether the count converts into lasting revenue.',
      'The World Bank study shows how quickly use can decay even when the product is free, which is why retention belongs next to acquisition in unit economics.' ]} evidence="The financial measures are from the supplied brief; adoption figures are from a World Bank blog on one provider; MISA figures are from its own press release and are vendor claims; FPT figures are company-reported and the two percentages are our own division. The point about customer count versus value is our own reading." />,
    sources: citeEnt3('worldBankSme', 'misaPress', 'fptGlobalIt2025', 'fptEarnings2025'),
  }),
];

const quiz = entQuiz('ent-m3-l4', [
  { chapter: '1', objective: 'List revenue sources', question: 'Which is a revenue source for the industry?', application: 'A CFO lists income lines. Which belongs?', correct: 'Subscriptions, licences, projects, managed services, usage fees or partner revenue', wrong: ['Crop sales', 'Fuel sales', 'Fabric sales'], explanation: 'These are named sources. Review Chapter 1.' },
  { chapter: '1', objective: 'Define revenue quality', question: 'What does revenue quality depend on?', application: 'Two firms have equal sales. How do you judge which is healthier?', correct: 'Predictability, retention, contract economics and delivery cost', wrong: ['The size of the logo', 'The number of offices', 'The length of the contract text'], explanation: 'Quality, not size. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare recurring and project revenue', question: 'How does managed-service revenue differ from project revenue?', application: 'A provider chooses a contract type. What is the difference?', correct: 'It is recurring in exchange for ongoing operational responsibility, while project revenue arrives as work is delivered', wrong: ['It never recurs', 'It needs no staff', 'It is always usage-based'], explanation: 'Recurring versus delivered. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a market estimate', question: 'How should Ken Research’s US$126.8 million be described?', application: 'A slide calls it the Vietnamese software market. What is wrong?', correct: 'It is a third-party estimate for cloud ERP for SMEs only', wrong: ['It is an official budget', 'It is Gartner’s total', 'It is FPT’s revenue'], explanation: 'Scope is narrow. Review Chapter 1.' },
  { chapter: '2', objective: 'Contrast cost structures', question: 'How do product and service costs differ?', application: 'A founder compares models. What is the contrast?', correct: 'Software has high upfront R&D and low incremental cost, while services carry ongoing labour cost that grows with scope', wrong: ['They are identical', 'Software has no costs', 'Services have no labour'], explanation: 'Scale differs. Review Chapter 2.' },
  { chapter: '2', objective: 'List cost groups', question: 'Which is a major cost group?', application: 'A budget lists expenses. Which belongs?', correct: 'Personnel, R&D, cloud, sales and marketing, delivery or compliance', wrong: ['Harvesting', 'Fabric dyeing', 'Roasting'], explanation: 'These are named groups. Review Chapter 2.' },
  { chapter: '2', objective: 'Read workforce data', question: 'How should Vietnam’s 150,000–200,000 annual shortage be described?', application: 'A slide calls it an official statistic. What is the correction?', correct: 'As a recruiter estimate reported by a news outlet', wrong: ['As a census count', 'As a law', 'As a Gartner forecast'], explanation: 'Label estimates. Review Chapter 2.' },
  { chapter: '3', objective: 'Define SaaS metrics', question: 'Which measures do SaaS companies commonly evaluate?', application: 'A board reviews a SaaS business. What should it look at?', correct: 'Recurring revenue, gross margin, customer acquisition cost, churn and lifetime value', wrong: ['Only headcount', 'Only office rent', 'Only brand colours'], explanation: 'These show unit economics. Review Chapter 3.' },
  { chapter: '3', objective: 'State the growth caution', question: 'When does revenue growth create sustainable value?', application: 'A firm doubles sales but loses cash. What was missed?', correct: 'Only when unit economics and cash flow remain healthy', wrong: ['Whenever sales rise', 'Only when staff grow', 'Never'], explanation: 'Growth is not enough. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a calculation correctly', question: 'How should the 15.5% and 4.6% FPT pre-tax shares be described?', application: 'A slide presents them as industry margins. What is the correction?', correct: 'As our own division of one company’s reported segment figures', wrong: ['As official statistics', 'As Gartner forecasts', 'As legal limits'], explanation: 'Label calculations. Review Chapter 3.' },
]);

export const LESSON_ENT3_4: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how enterprise technology providers earn, what they spend on and how to judge their financial health.',
    keyTakeaways: [
      'Revenue comes from subscriptions, licences, projects, managed services, usage and partners.',
      'Revenue quality depends on predictability, retention and delivery cost.',
      'Product and service businesses have different cost structures and scale differently.',
      'Unit economics matter more than total sales growth.',
      'Vietnam estimates, vendor claims and our own calculations are labelled and not mixed.',
    ],
    businessImplications: 'Build a balanced revenue mix, manage the cost lines that do not scale and measure profit by product, customer, project and contract.',
    remember: 'Growth only counts if each customer and project pays its way.',
    nextLesson: 'Distribution & Sales Channels',
  },
};
