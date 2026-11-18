import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Inputs, Outputs & Value Creation';

const deck = [
  ecomM2Chapter({
    title: 'Key Inputs and Resource Requirements', chapterTitle: LESSON, readingTime: '8',
    objective: 'Compare the seven input groups and explain how business model changes capital intensity, capability needs and scalability.',
    mateIntro: 'Two commerce businesses can sell the same product and require completely different resources because one owns inventory while the other coordinates sellers.',
    keyInsight: 'The resource requirements of e-commerce vary significantly by business model. Understanding the main cost and capability drivers helps explain differences in scalability, capital intensity, margins, and competitive advantage.',
    statTiles: [
      { value: '7', label: 'Input groups', subtitle: 'Products through governance', description: 'The chapter covers physical, digital, financial, human and relationship resources.' },
      { value: '4', label: 'Business models compared', subtitle: 'Inventory, marketplace, software, services', description: 'Each emphasizes a different resource mix.' },
      { value: '4', label: 'Strategic effects', subtitle: 'Scale, capital, margin, advantage', description: 'Input requirements help explain all four.' },
    ],
    statsNote: 'These are structural counts from the chapter; no investment or cost benchmark is introduced.',
    narrative: [
      { label: 'What it is', text: 'E-commerce combines products, technology, finance, people, data, external services and governance. The required balance depends on whether the business owns inventory, operates a marketplace, supplies commerce software or provides transaction services.' },
      { label: 'Why it is happening', text: 'Inventory-led retailers need working capital for stock and warehouses. Marketplaces may invest more heavily in platform technology, customer acquisition, seller management, payments and trust and safety.' },
      { label: 'Real-world example', text: 'Product inputs include merchandise and specifications; technology includes platforms and cloud; finance funds stock, marketing and logistics; people run engineering and operations; data informs demand; partners provide services; and governance controls sellers and fraud.' },
      { label: 'Vietnam example', text: 'A Vietnamese inventory-led retailer may commit capital to imported or locally sourced stock, while a marketplace serving the same category may emphasize seller onboarding, platform reliability, payment integration and trust controls.' },
      { label: 'Business impact', text: 'The input mix determines the cost structure and how reliably a business can scale. Data, skilled people and partner coordination remain important in both inventory-led and marketplace models.' },
    ],
    visualKind: 'ecom-m2-51-inputs', visualHeading: 'Seven resource groups behind e-commerce', visualIntro: 'Compare each input group with the operating outcome it determines.', imageAlt: 'Casemate table of seven e-commerce resource groups',
    keyTerms: [
      { term: 'Working capital', definition: 'Funding tied up in inventory and day-to-day operating requirements.' },
      { term: 'Capital intensity', definition: 'The amount of financial and physical investment required to operate and grow.' },
      { term: 'Governance capability', definition: 'Seller verification, fraud, compliance and quality controls.' },
      { term: 'Resource mix', definition: 'The relative combination of products, technology, finance, people, data and services.' },
    ],
    recap: ['Seven input groups support e-commerce operations.', 'Inventory-led businesses commit more capital to stock.', 'Marketplaces emphasize coordination, technology and trust.', 'Input mix shapes scale, margin and advantage.'],
    chapterRecap: 'E-commerce requires coordinated investment in products, technology, people, data, and service infrastructure. The mix of inputs determines the business’s cost structure and its ability to scale reliably.',
    deepDiveTitle: 'Why asset-light does not mean input-light',
    body: <EcomDeepDive paragraphs={[
      'A marketplace may avoid owning merchandise, but it still needs technology, acquisition, seller management, payments, service and trust controls. Inventory risk is exchanged for coordination risk rather than removed.',
      'Comparing models requires looking at the complete resource mix, not only the most visible asset on the balance sheet.'
    ]} evidence="The seven inputs and model differences come directly from the supplied chapter." />,
    sources: citeEcom('unctadDigitalEconomy', 'unctadMeasuring'),
  }),
  ecomM2Chapter({
    title: 'Tangible and Intangible Outputs', chapterTitle: LESSON, readingTime: '8',
    objective: 'Distinguish immediate transaction outputs from intangible assets that strengthen future performance.',
    mateIntro: 'An order creates a delivery today and data, trust and operating knowledge that may improve thousands of future transactions.',
    keyInsight: 'The value generated by e-commerce extends beyond the sale itself. Reliable service, trusted transactions, useful data, and strong buyer-seller relationships can improve retention and strengthen the overall platform ecosystem.',
    statTiles: [
      { value: '7', label: 'Output activities', subtitle: 'Commercial through learning', description: 'The chapter covers immediate outcomes and capabilities created over time.' },
      { value: '2', label: 'Output classes', subtitle: 'Tangible and intangible', description: 'Both matter to sustainable performance.' },
      { value: '5', label: 'Intangible assets', subtitle: 'Brand, trust, liquidity, relationships, knowledge', description: 'Their value depends on maintenance and commercial use.' },
    ],
    statsNote: 'The figures count output categories and assets described in the chapter; no asset valuation is claimed.',
    narrative: [
      { label: 'What it is', text: 'Outputs include transactions, delivered products, digital services and operating records. They provide immediate value while creating data and relationships that can improve later transactions.' },
      { label: 'Why it is happening', text: 'Beyond sales, e-commerce produces brand recognition, customer trust, marketplace liquidity, seller relationships, discovery capability and operational knowledge.' },
      { label: 'Real-world example', text: 'A completed order creates fulfillment and payment records; the customer receives access and visibility; the merchant receives reach and infrastructure; and the platform learns from demand, fraud, inventory and feedback patterns.' },
      { label: 'Vietnam example', text: 'A Vietnamese seller can gain immediate revenue and longer-term learning about category demand, service expectations and channel performance. The value depends on maintaining permission, data quality and customer trust.' },
      { label: 'Business impact', text: 'Intangible assets differentiate only when they are preserved and converted into better recommendations, forecasts, fraud detection, inventory decisions and service quality.' },
    ],
    visualKind: 'ecom-m2-52-outputs', visualHeading: 'Immediate outputs and long-term assets', visualIntro: 'Compare what one transaction produces now with what repeated execution can build.', imageAlt: 'Casemate comparison of tangible e-commerce outputs and intangible assets',
    keyTerms: [
      { term: 'Marketplace liquidity', definition: 'The ability to match buyer demand with suitable seller supply efficiently.' },
      { term: 'Operational knowledge', definition: 'Learning accumulated from orders, fulfillment, payment and service experience.' },
      { term: 'Intangible asset', definition: 'A non-physical capability or relationship that may support future commercial value.' },
      { term: 'Data-driven capability', definition: 'Forecasting, recommendation, fraud or inventory decisions improved through relevant data.' },
    ],
    recap: ['Completed orders create immediate commercial outputs.', 'Operational records support future decisions.', 'Trust, liquidity and relationships are intangible assets.', 'Learning matters only when it improves later performance.'],
    chapterRecap: 'E-commerce creates both immediate transaction outcomes and longer-term intangible value. The ability to preserve trust, learn from data, and strengthen relationships can support sustainable growth beyond short-term sales performance.',
    deepDiveTitle: 'Why the transaction is both an output and an input',
    body: <EcomDeepDive paragraphs={[
      'A completed order is the end of one value-chain cycle and the source of records, feedback and relationship history for the next. That is why operating quality can compound.',
      'The same loop can also compound poor quality. Inaccurate data and unresolved service failures create misleading signals and weaker trust unless corrected.'
    ]} evidence="The immediate and intangible outputs come directly from the supplied chapter. No financial valuation is assigned to them." />,
    sources: citeEcom('unctadDigitalEconomy', 'unctadMeasuring'),
  }),
  ecomM2Chapter({
    title: 'Value Creation, Capture and Distribution', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain how buyers, sellers, platforms and partners receive value and why sustainable ecosystems require balanced distribution.',
    mateIntro: 'A transaction can create convenience for the buyer, demand for the seller and fees for the platform. The ecosystem lasts only if each participant keeps enough value to continue.',
    keyInsight: 'A healthy e-commerce ecosystem must create sufficient value for buyers, merchants, platforms, and service partners. If one participant captures too much value at the expense of others, seller participation, service quality, or long-term ecosystem growth may weaken.',
    statTiles: [
      { value: '6', label: 'Value perspectives', subtitle: 'Buyer through measurement', description: 'The chapter maps benefits, revenue and economics across participants.' },
      { value: '5', label: 'Platform revenue routes', subtitle: 'Commission, ads, subscription, transaction, fulfillment', description: 'Each captures part of the value created.' },
      { value: '6', label: 'Performance measures', subtitle: 'GMV through lifetime value', description: 'No single measure describes the whole ecosystem.' },
    ],
    statsNote: 'The figures count value perspectives, revenue routes and measures named in the chapter; no fee or margin benchmark is claimed.',
    narrative: [
      { label: 'What it is', text: 'Value is created when digital commerce reduces search cost, improves convenience, expands access, simplifies transactions or coordinates fulfillment efficiently.' },
      { label: 'Why it is happening', text: 'Value capture converts those benefits into revenue and profit. Retailers earn product margins; marketplaces earn commission, advertising and service income; payments and logistics earn transaction and service fees.' },
      { label: 'Real-world example', text: 'Buyers gain choice and convenience, sellers gain demand and infrastructure, platforms earn coordination income, retailers retain product margin, and partners earn payment, shipping, warehousing or technology fees.' },
      { label: 'Vietnam example', text: 'A Vietnamese merchant may accept marketplace fees in exchange for traffic and transaction infrastructure, while also investing in an owned channel to retain more customer relationship and margin. The balance depends on contribution, reach and capability.' },
      { label: 'Business impact', text: 'Value distribution depends on bargaining power, competition, operating cost and participant contribution. GMV, recognized revenue, conversion, contribution, repeat purchase and lifetime value answer different questions.' },
    ],
    visualKind: 'ecom-m2-53-value', visualHeading: 'How value is created, captured and distributed', visualIntro: 'Map the value received by buyers, sellers, platforms, retailers and partners.', imageAlt: 'Casemate two-sided mind map of e-commerce value distribution',
    keyTerms: [
      { term: 'Value creation', definition: 'Producing convenience, access, efficiency or another benefit participants value.' },
      { term: 'Value capture', definition: 'Converting created value into revenue and profit.' },
      { term: 'Value distribution', definition: 'How benefits and economic returns are divided among participants.' },
      { term: 'Recognized revenue', definition: 'Income recorded by the business under its model, distinct from total transaction value.' },
    ],
    recap: ['Buyers value convenience, choice and trust.', 'Sellers value demand and infrastructure.', 'Platforms, retailers and partners capture value differently.', 'Excessive capture by one participant can weaken the ecosystem.'],
    chapterRecap: 'E-commerce creates value by connecting buyers and sellers through digital and operational infrastructure. Sustainable performance depends on capturing sufficient economic value while maintaining attractive outcomes for the wider ecosystem.',
    deepDiveTitle: 'Why ecosystem economics are a balance, not a maximum',
    body: <EcomDeepDive paragraphs={[
      'A platform can raise fees and capture more value in the short term, but the result may be weaker seller participation, higher prices or lower service investment. The same tension applies to discounts funded by merchants or delivery partners.',
      'Sustainable capture keeps participation worthwhile across the ecosystem. The objective is not the maximum share in one transaction but durable value across many transactions.'
    ]} evidence="The value perspectives, revenue routes and ecosystem warning come directly from the supplied chapter." />,
    sources: citeEcom('unctadMeasuring', 'econSea'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l5', [
  { chapter: '1', objective: 'Identify inputs', question: 'Which is a governance input?', application: 'A platform invests in seller verification and fraud controls. Which resource group?', correct: 'Verification, fraud, compliance and quality assurance', wrong: ['Merchandise only', 'Delivery output only', 'Customer loyalty only'], explanation: 'Governance is one of seven input groups. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare resource models', question: 'Which input is especially important for inventory-led retail?', application: 'A retailer buys stock before sale. What must it fund?', correct: 'Working capital for inventory and warehousing', wrong: ['No financial resources', 'Only seller onboarding', 'Only advertising data'], explanation: 'Owned inventory increases capital intensity. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain marketplace inputs', question: 'What may a marketplace emphasize instead of stock ownership?', application: 'A platform hosts third-party sellers. Where does investment shift?', correct: 'Technology, acquisition, seller management, payments and trust controls', wrong: ['Eliminating all people', 'Removing data systems', 'Avoiding customer service'], explanation: 'Asset-light does not mean input-light. Review Chapter 1.' },
  { chapter: '2', objective: 'Distinguish outputs', question: 'Which is an intangible e-commerce output?', application: 'Repeated reliable service improves customer confidence. What is created?', correct: 'Customer trust and brand reputation', wrong: ['A physical parcel only', 'Warehouse rent', 'Supplier invoice'], explanation: 'Trust is a non-physical asset. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognize operational outputs', question: 'Which records are operational outputs?', application: 'A team analyzes settlement and inventory updates. What type of output?', correct: 'Order, fulfillment, payment, inventory and service records', wrong: ['Only product manufacturing', 'Only office design', 'Only customs law'], explanation: 'Transactions generate operating records. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply learning loops', question: 'How can transaction data create longer-term value?', application: 'A platform improves recommendations and forecasting. What enabled it?', correct: 'Relevant data and feedback improve future decisions', wrong: ['Every record is valuable without quality', 'Data replaces service', 'Trust no longer matters'], explanation: 'Data must be maintained and used well. Review Chapter 2.' },
  { chapter: '3', objective: 'Define value creation', question: 'What creates buyer value in e-commerce?', application: 'A platform reduces search cost and expands choice. What is happening?', correct: 'Convenience, access, comparison and transaction efficiency improve', wrong: ['Only fees increase', 'Only stock cost rises', 'Only advertising changes'], explanation: 'Value creation produces useful benefits. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare capture models', question: 'How does a marketplace commonly capture value?', application: 'An operator does not own goods. Which income can it earn?', correct: 'Commissions, advertising, subscriptions and service fees', wrong: ['Product margin only', 'Consumer tax only', 'Warehouse ownership only'], explanation: 'Marketplace revenue differs from retail margin. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply ecosystem balance', question: 'What can happen if one participant captures too much value?', application: 'Fees rise until sellers reduce service and leave. What does this show?', correct: 'Participation, service quality and long-term growth may weaken', wrong: ['The ecosystem always strengthens', 'Customer value automatically rises', 'Costs disappear'], explanation: 'Healthy ecosystems maintain attractive outcomes. Review Chapter 3.' },
  { chapter: '3', objective: 'Distinguish measures', question: 'Why should GMV and recognized revenue remain separate?', application: 'A deck uses total transaction value as platform income. What is wrong?', correct: 'GMV measures transaction activity; recognized revenue is what the business records', wrong: ['They are always identical', 'Revenue is always larger', 'GMV measures customer support'], explanation: 'The measures answer different questions. Review Chapter 3.' },
]);

export const LESSON_ECOM2_5: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can compare resource inputs, distinguish immediate outputs from intangible assets and explain value distribution across the ecosystem.',
    keyTakeaways: ['Seven input groups combine differently by business model.', 'Asset-light marketplaces still require substantial coordination capability.', 'Transactions create both immediate outputs and longer-term assets.', 'Buyers, sellers, platforms and partners capture value differently.', 'Sustainable ecosystems keep participation attractive across the chain.'],
    businessImplications: 'Compare models through their complete resource mix and measure value capture without weakening the partners required to create it.',
    remember: 'The sale is one output; trust, data and relationships shape the next transaction.',
    nextLesson: 'Global vs. Local Value Chain',
  },
};
