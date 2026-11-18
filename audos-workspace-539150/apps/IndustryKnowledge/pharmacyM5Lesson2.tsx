import { P5DeepDive, citeP5, p5Chapter, p5Quiz } from './pharmacyM5Core';
import type { PharmacyM5LessonBundle } from './pharmacyM5Core';

const LESSON = '2. Technology & Innovation Trends';

const deck = [
  p5Chapter({
    title: 'Digital Pharmacy Platforms and E-commerce', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain what Vietnam’s rules allow pharmacies to sell online and how to build digital services around them.',
    mateIntro: 'A pharmacy website or app is easy to build. The harder part is knowing exactly which products it may sell online, and proving the controls behind each sale.',
    keyInsight: 'Digital pharmacy retail creates opportunities to improve accessibility, but digitalization must be built around pharmaceutical compliance, product integrity, and professional oversight. An online storefront is not a substitute for appropriate dispensing controls.',
    statTiles: [
      { value: '7', label: 'Key digital-platform activities', subtitle: 'Product discovery to customer protection', description: 'Online product discovery, eligible e-commerce sales, regulatory verification, digital customer support, store integration, platform transparency and customer protection.' },
      { value: '1 Jul 2025', label: 'Date the amended Law on Pharmacy took effect', subtitle: 'Law 44/2024/QH15', description: 'It allows online retail of eligible non-prescription medicines under conditions.' },
      { value: '1 Jan 2025', label: 'Start of Long Châu’s VNeID-based online purchase service, as reported', subtitle: 'Market research summary', description: 'An example of a chain linking online ordering to a national digital identity.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the dates come from legal summaries and a market research report, so check the official texts for exact conditions.',
    narrative: [
      { label: 'What it is', text: 'Digital platforms are changing how consumers discover healthcare products, contact pharmacies, and access eligible purchasing services. Pharmacy websites and mobile applications can provide product catalogs, store information, customer support, order updates, and online purchasing options. These capabilities are especially relevant to organized chains that can connect digital services with a large physical-store network.' },
      { label: 'Why it is happening', text: 'Vietnam’s regulatory framework has also evolved to address pharmaceutical e-commerce. Since 1 July 2025, the amended Law on Pharmacy and its implementing regulations have permitted online retail of eligible non-prescription medicines, subject to restrictions and applicable conditions. Online retail of prescription medicines remains prohibited except for a narrowly defined public-health emergency exception involving isolation during a declared Group A infectious disease outbreak. Businesses must therefore design digital services around the legal status of each product and transaction.' },
      { label: 'Real-world example', text: 'A pharmacy provides accurate product information, availability and store details through its app; supports online orders only for permitted products; checks each product’s classification before enabling ordering; offers order updates and refers medicine questions to qualified staff; connects online orders with store inventory and fulfilment; shows the required business credentials; and sets up procedures for complaints and suspected counterfeits.' },
      { label: 'Vietnam example', text: 'Law 44/2024/QH15 took effect on 1 July 2025 with Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT. Online sellers must publish specified business information, and the rules also set packaging and labelling details. In April 2025 the Drug Administration, in dispatch 1136/QLD-KD, reminded businesses that online retail of certain medicines is banned. A market research summary reports Long Châu’s VNeID-based online purchase service and Pharmacity partnerships in 2025.' },
      { label: 'Business impact', text: 'Digital platforms can make pharmacy services more accessible and convenient. In Vietnam, the expansion of pharmaceutical e-commerce is accompanied by clear regulatory boundaries, making compliance, accurate product information, and reliable fulfillment essential to digital growth.' },
    ],
    visualKind: 'pharmacy-m5-21-platforms', visualHeading: 'What can be sold online, and what cannot',
    visualIntro: 'Compare what is generally allowed and not allowed online across five points.',
    imageAlt: 'Casemate comparison of what a pharmacy can and cannot sell online in Vietnam',
    keyTerms: [
      { term: 'Pharmaceutical e-commerce', definition: 'Selling medicines or health products online under pharmacy rules.' },
      { term: 'Eligible non-prescription medicine', definition: 'An over-the-counter medicine that the rules allow to be sold online.' },
      { term: 'Platform transparency', definition: 'Showing the required business and pharmaceutical information on a sales platform.' },
      { term: 'Group A infectious disease', definition: 'A category of dangerous infectious disease named in the public-health rules.' },
    ],
    recap: [
      'Eligible non-prescription medicines may be sold online from 1 July 2025.',
      'Prescription medicines are prohibited online apart from a narrow emergency exception.',
      'Platforms must show required business information.',
      'An online shop is not a substitute for dispensing controls.',
    ],
    chapterRecap: 'Digital platforms can make pharmacy services more accessible and convenient. In Vietnam, the expansion of pharmaceutical e-commerce is accompanied by clear regulatory boundaries, making compliance, accurate product information, and reliable fulfillment essential to digital growth.',
    deepDiveTitle: 'Why classification comes before the checkout button',
    body: <P5DeepDive paragraphs={[
      'A catalogue can list thousands of items, but each one has a legal status. Before enabling online ordering for a product, the business has to confirm whether it is an eligible non-prescription medicine.',
      'Building that check into product data, rather than relying on staff memory, is what turns a rule into a control.' ]} evidence="The seven activities are described in the supplied material. Legal points are from law-firm and government-gazette summaries of Law 44/2024/QH15, Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT, and a Drug Administration dispatch; check the official texts for exact conditions. Online-service details are from a market research summary." />,
    sources: citeP5('law44Summary', 'decree163', 'ecomRules', 'bakerMckenzie', 'dav1136', 'techsciEpharmacy'),
  }),
  p5Chapter({
    title: 'AI, Data Analytics and Intelligent Inventory Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how analytics and AI improve forecasting and stock control, and what they need in order to work.',
    mateIntro: 'Every sale, order and stock count is data. Pharmacies that use it well lose fewer sales to stockouts and write off fewer expired products.',
    keyInsight: 'Technology creates value when it improves decisions and execution. Better forecasting, fewer stockouts, and more efficient inventory management may generate more reliable benefits than adopting AI simply for innovation’s sake.',
    statTiles: [
      { value: '8', label: 'Key analytics activities', subtitle: 'Forecasting to technology evaluation', description: 'Demand forecasting, automated replenishment, expiry-risk monitoring, store performance analytics, customer-service automation, data quality management, privacy and security, and technology evaluation.' },
      { value: '~70,000', label: 'Orders a day handled through Long Châu’s central warehouses, as the company describes it', subtitle: 'Company statement', description: 'Shows the scale at which warehouse data systems must work.' },
      { value: '35,000 / 45,000 m²', label: 'Floor areas of two Long Châu central warehouses, as described by the company', subtitle: 'Company statement', description: 'Large sites that rely on warehouse management software.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the warehouse figures are company statements about a single chain, not industry averages.',
    narrative: [
      { label: 'What it is', text: 'Data analytics and artificial intelligence can support pharmacy operations by improving demand forecasting, replenishment planning, store performance analysis, and customer-service workflows. Pharmacy retailers generate operational data through sales transactions, stock movements, supplier orders, and customer inquiries. When appropriately managed, these data can help identify seasonal demand, frequently requested products, and potential inventory inefficiencies.' },
      { label: 'Why it is happening', text: 'Large pharmacy chains may be better positioned to deploy advanced analytics because they operate across multiple stores and can consolidate information centrally. Smaller pharmacies can also benefit from simpler digital inventory systems, automated alerts, and structured sales reporting. However, the quality of the results depends on accurate data, system integration, staff training, and appropriate safeguards for personal information.' },
      { label: 'Real-world example', text: 'A chain uses historical sales and seasonal patterns to forecast demand, generates reorder alerts from stock levels and lead times, flags products nearing expiry, compares sales, gross profit, turnover and expenses across outlets, uses a digital assistant for routine questions with escalation to staff, keeps product codes and stock records accurate, limits access to sensitive data, and checks whether each system pays for itself.' },
      { label: 'Vietnam example', text: 'Long Châu describes two central warehouses, about 70,000 orders a day and a 2025 warehouse management system that uses planning-based picking, OCR receiving and automated replenishment. Circular 11/2025 requires pharmacies to connect to the national data system from 1 January 2026, which raises the value of accurate stock and transaction records, and the 2025 Personal Data Protection Law, effective 1 January 2026, sets rules and fines for handling personal and health data.' },
      { label: 'Business impact', text: 'AI and analytics can improve forecasting, stock control, and operational visibility in pharmacy retail. Their effectiveness depends on accurate data, integration with everyday workflows, appropriate privacy safeguards, and measurable business outcomes.' },
    ],
    visualKind: 'pharmacy-m5-22-analytics', visualHeading: 'Eight ways data supports pharmacy operations',
    visualIntro: 'See eight uses of data around the centre and what each improves.',
    imageAlt: 'Casemate tree mind map of eight ways data and AI support pharmacy operations',
    keyTerms: [
      { term: 'Demand forecasting', definition: 'Estimating how much of each product will be needed.' },
      { term: 'Automated replenishment', definition: 'Reorder alerts generated from stock levels, lead times and forecasts.' },
      { term: 'Data quality', definition: 'The accuracy of product codes, stock records and transactions.' },
      { term: 'Escalation', definition: 'Passing a medicine-related issue from an automated tool to qualified staff.' },
    ],
    recap: [
      'Analytics improves forecasting, replenishment and store comparison.',
      'Chains can centralise data; small pharmacies can use simpler tools.',
      'Results depend on data quality, training and privacy safeguards.',
      'Judge each technology by measured benefit against cost.',
    ],
    chapterRecap: 'AI and analytics can improve forecasting, stock control, and operational visibility in pharmacy retail. Their effectiveness depends on accurate data, integration with everyday workflows, appropriate privacy safeguards, and measurable business outcomes.',
    deepDiveTitle: 'Why bad data makes smart systems unreliable',
    body: <P5DeepDive paragraphs={[
      'A forecasting tool is only as good as the sales and stock records it reads. If product codes are duplicated or stock counts are wrong, reorder alerts will be wrong too.',
      'Cleaning product and supplier data first, and checking forecasts against actual sales, is usually worth more than buying a more advanced tool.' ]} evidence="The eight activities are described in the supplied material. Warehouse details are company and group statements; the Circular 11/2025 and data-protection items are from official texts in English translation." />,
    sources: citeP5('longChauLogistics', 'longChauWms', 'circular11', 'pdplLaw'),
  }),
  p5Chapter({
    title: 'Digital Health Integration and Connected Pharmacy Services', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how pharmacies connect with digital health systems and the safeguards that connection requires.',
    mateIntro: 'Pharmacies are starting to plug into wider digital health systems. Done well, that saves customers effort. Done carelessly, it exposes sensitive data.',
    keyInsight: 'Connected pharmacy services can improve convenience and continuity, but interoperability, data protection, and clearly defined professional responsibilities are essential. Digital integration should support healthcare processes rather than encourage pharmacies to operate beyond their authorized role.',
    statTiles: [
      { value: '7', label: 'Key connected-service activities', subtitle: 'Customer support to professional escalation', description: 'Digital customer support, prescription-related workflows, health information integration, digital identity and service access, continuity of service, information security and professional escalation.' },
      { value: '1 Jul 2025', label: 'Date Circular 26/2025/TT-BYT took effect', subtitle: 'Electronic prescription roadmap', description: 'Sets the roadmap for electronic prescriptions in outpatient treatment.' },
      { value: '24 months', label: 'Period for keeping online consultation records under Circular 11/2025', subtitle: 'Legal summary', description: 'Shows how digital advice creates records the pharmacy must keep.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the dates and record period are taken from legal summaries, so check the official texts for scope and exceptions.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail is increasingly connected with wider digital health services, including electronic health records, digital health identification, prescription-related systems, and online professional support. Such integration can help improve access to information and coordinate customer interactions across healthcare touchpoints. The specific capabilities available depend on the systems involved, the relevant permissions, and the applicable legal framework.' },
      { label: 'Why it is happening', text: 'In Vietnam, pharmacy chains have been developing digital touchpoints such as mobile applications, customer-support services, and links with government or healthcare-related digital initiatives. These developments indicate a broader shift from isolated store transactions toward more connected healthcare experiences. However, access to health information must be authorized, secure, and limited to legitimate purposes.' },
      { label: 'Real-world example', text: 'A pharmacy answers service questions through digital channels; uses authorised electronic prescription systems where permitted while still verifying and dispensing under controls; links information systems only through authorised mechanisms; supports eligible healthcare digital initiatives such as digital identity; keeps product and order information consistent across channels; applies access controls and incident procedures; and routes symptoms or adverse reactions to qualified professionals.' },
      { label: 'Vietnam example', text: 'Circular 26/2025/TT-BYT, effective 1 July 2025, sets the electronic prescription roadmap, and a World Bank project document describes how pharmacies pull e-prescriptions by code and report sales to a national database. Circular 11/2025/TT-BYT adds IT connection duties from 1 January 2026 and rules for e-commerce consultation records and e-prescription handling. Long Châu offers a VNeID-based online purchase service, and the Personal Data Protection Law, effective 1 January 2026, covers health information in Article 26.' },
      { label: 'Business impact', text: 'Digital health integration may enable more connected and convenient pharmacy services. Its long-term value depends on secure interoperability, appropriate authorization, professional oversight, and the responsible use of customer information.' },
    ],
    visualKind: 'pharmacy-m5-23-connected', visualHeading: 'Seven parts of a connected pharmacy service',
    visualIntro: 'See seven parts of connected service and the condition each must meet.',
    imageAlt: 'Casemate sides mind map of seven parts of a connected pharmacy service',
    keyTerms: [
      { term: 'Interoperability', definition: 'The ability of different systems to exchange information securely.' },
      { term: 'Electronic prescription', definition: 'A prescription issued and retrieved through a digital system.' },
      { term: 'Digital identity', definition: 'An electronic credential used to access eligible services, such as VNeID.' },
      { term: 'Professional escalation', definition: 'Routing health-related questions to qualified professionals.' },
    ],
    recap: [
      'Pharmacies are linking to prescription, identity and health-data systems.',
      'Access to health information must be authorised and secure.',
      'Digital tools support, but do not replace, professional roles.',
      'Symptoms and adverse reactions go to qualified staff.',
    ],
    chapterRecap: 'Digital health integration may enable more connected and convenient pharmacy services. Its long-term value depends on secure interoperability, appropriate authorization, professional oversight, and the responsible use of customer information.',
    deepDiveTitle: 'What a pharmacy must still do when a prescription is digital',
    body: <P5DeepDive paragraphs={[
      'Retrieving an electronic prescription does not remove the pharmacy’s duty to check it, dispense correctly and keep records. The digital route changes how the information arrives, not who is responsible for using it safely.',
      'That is why staff training and clear procedures matter as much as the system connection.' ]} evidence="The seven activities are described in the supplied material. Circulars are official texts in English translation; the e-prescription description is from a World Bank project document, and the online-service item is from a market research summary." />,
    sources: citeP5('circular26', 'worldBankEprescription', 'circular11', 'techsciEpharmacy', 'pdplLaw'),
  }),
];

const quiz = p5Quiz('pharmacy-m5-l2', [
  { chapter: '1', objective: 'State what may be sold online', question: 'What may Vietnamese pharmacies sell online since 1 July 2025?', application: 'A chain launches an app. Which medicines can it list for online ordering?', correct: 'Eligible non-prescription medicines, under conditions', wrong: ['All prescription medicines', 'Any medicine at all', 'Nothing'], explanation: 'Scope is limited. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the prescription rule', question: 'What is the position on online retail of prescription medicines?', application: 'A platform wants to sell prescription medicines. What does the rule say?', correct: 'Prohibited, apart from a narrow public-health emergency exception for a declared Group A outbreak', wrong: ['Always allowed', 'Allowed with a coupon', 'Allowed for any buyer'], explanation: 'Controls cannot be bypassed. Review Chapter 1.' },
  { chapter: '1', objective: 'Order the compliance steps', question: 'What should happen before online ordering is enabled for a product?', application: 'A new product is added to the catalogue. What comes first?', correct: 'Confirm its classification and apply the right restrictions', wrong: ['Launch a promotion', 'Hide the information', 'Skip the check'], explanation: 'Classification comes first. Review Chapter 1.' },
  { chapter: '2', objective: 'State when technology creates value', question: 'When does technology create value in a pharmacy?', application: 'A shop wants to adopt AI. What should it ask?', correct: 'When it improves decisions and execution', wrong: ['When it is new', 'When it replaces staff', 'When it is expensive'], explanation: 'Benefit matters, not novelty. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a data prerequisite', question: 'What does the quality of analytics results depend on?', application: 'Reorder alerts keep being wrong. What should be checked?', correct: 'Accurate data, system integration, staff training and privacy safeguards', wrong: ['Colour of the screen', 'Store size only', 'Number of products only'], explanation: 'Bad data gives bad forecasts. Review Chapter 2.' },
  { chapter: '2', objective: 'Use expiry monitoring', question: 'What does expiry-risk monitoring help a pharmacy do?', application: 'Stock is nearing expiry. What can analytics support?', correct: 'Improve purchasing and stock-rotation decisions', wrong: ['Hide expired stock', 'Increase waste', 'Raise prices only'], explanation: 'It reduces waste. Review Chapter 2.' },
  { chapter: '2', objective: 'Handle customer-service automation', question: 'How should a digital assistant treat medicine-related issues?', application: 'A chatbot receives a question about symptoms. What should happen?', correct: 'Escalate clearly to qualified staff', wrong: ['Diagnose the customer', 'Ignore it', 'Recommend any product'], explanation: 'Escalation protects safety. Review Chapter 2.' },
  { chapter: '3', objective: 'State the condition for connected services', question: 'What are essential for connected pharmacy services?', application: 'A chain links its systems to a health data source. What must it ensure?', correct: 'Interoperability, data protection and clearly defined professional responsibilities', wrong: ['Maximum data sharing', 'No staff involvement', 'Speed only'], explanation: 'Integration needs safeguards. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the e-prescription circular', question: 'Which circular sets the electronic prescription roadmap that took effect on 1 July 2025?', application: 'A pharmacy checks the rule. Which is it?', correct: 'Circular 26/2025/TT-BYT', wrong: ['Circular 1/2020', 'Decree 1/2000', 'Circular 99/2030'], explanation: 'It covers outpatient prescribing. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply professional escalation', question: 'Where should digital interactions about adverse reactions go?', application: 'A customer reports a reaction through an app. What happens next?', correct: 'To qualified healthcare professionals when appropriate', wrong: ['To marketing', 'To nobody', 'To a discount tool'], explanation: 'Safety first. Review Chapter 3.' },
]);

export const LESSON_P5_2: PharmacyM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain the legal limits on online pharmacy sales, how analytics improves inventory decisions, and what connected digital health services require.',
    keyTakeaways: [
      'Eligible non-prescription medicines may be sold online from 1 July 2025; prescription medicines generally may not.',
      'An online storefront is not a substitute for dispensing controls.',
      'Analytics create value when they improve decisions, not for novelty.',
      'Data quality and privacy safeguards decide whether systems work.',
      'Connected services need authorisation, security and clear professional roles.',
    ],
    businessImplications: 'Build digital services around the legal status of each product, invest in clean data first and connect to health systems only with authorisation and safeguards.',
    remember: 'Technology serves compliance and care, not the other way round.',
    nextLesson: 'Market & Channel Trends',
  },
};
