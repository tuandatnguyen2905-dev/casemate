import { P5DeepDive, citeP5, p5Chapter, p5Quiz } from './pharmacyM5Core';
import type { PharmacyM5LessonBundle } from './pharmacyM5Core';

const LESSON = '4. Regulatory & Sustainability Trends';

const deck = [
  p5Chapter({
    title: 'Pharmaceutical Regulation and Online Sales Compliance', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how the 2025 pharmacy rules change daily operations and how to turn them into controls.',
    mateIntro: 'Rules are not a one-time licence check. Every change in the law has to reach the shelf, the app and the staff training plan.',
    keyInsight: 'Regulatory compliance is becoming increasingly important as pharmacy retailers expand their physical and digital operations. Businesses need systems that translate changing legal requirements into practical controls for product selection, online sales, dispensing, documentation, and staff responsibilities.',
    statTiles: [
      { value: '8', label: 'Key regulatory activities', subtitle: 'Monitoring to incident response', description: 'Regulatory monitoring, online sales controls, business credential disclosure, professional compliance, product traceability, staff training, compliance auditing and incident response.' },
      { value: '1 Jul 2025', label: 'Date Law 44/2024/QH15 and its guiding texts took effect', subtitle: 'Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT', description: 'The date the updated framework, including pharmaceutical e-commerce, began to apply.' },
      { value: '1 Jan 2026', label: 'Date Circular 11/2025/TT-BYT data-connection duties apply', subtitle: 'Legal summary', description: 'Shows that compliance dates continue after the main law took effect.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the dates are taken from legal texts and summaries, so check the official versions for scope and exceptions.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail is governed by requirements covering pharmaceutical business operations, professional qualifications, medicine quality, dispensing, product information, and distribution. Regulatory changes can affect how retailers structure their operations, source products, communicate with customers, and introduce new sales channels. Businesses must therefore treat regulatory monitoring as an ongoing operational responsibility rather than a one-time licensing exercise.' },
      { label: 'Why it is happening', text: 'In Vietnam, Law No. 44/2024/QH15 amending the Law on Pharmacy took effect on 1 July 2025, alongside implementing instruments including Decree No. 163/2025/NĐ-CP and Circular No. 31/2025/TT-BYT. The updated framework provides for pharmaceutical e-commerce under defined conditions, including online retail of eligible non-prescription medicines. It restricts online retail of prescription medicines, subject to a narrow exception for a specified public-health emergency scenario, and establishes requirements for participating pharmaceutical businesses.' },
      { label: 'Real-world example', text: 'A retailer tracks changes to laws, decrees and circulars; separates eligible non-prescription medicines from products that cannot be sold online; publishes the required business and pharmaceutical information; keeps staffing and qualifications in order; retains procurement, batch, storage and dispensing records; updates training when rules change; audits stores, platforms, suppliers and documents; and has a plan for counterfeits, quality problems, complaints and recalls.' },
      { label: 'Vietnam example', text: 'Besides Law 44/2024/QH15, Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT, Circular 11/2025/TT-BYT amended the good pharmacy, distribution and storage practice rules, adding IT connection duties from 1 January 2026, e-commerce consultation records and e-prescription handling. Circular 30/2025/TT-BYT sets how defective drugs are reported and recalled, and the Drug Administration’s April 2025 dispatch 1136/QLD-KD told businesses that certain online sales are banned. An International Bar Association survey notes that the legal documents took effect on 1 July 2025.' },
      { label: 'Business impact', text: 'Vietnam’s updated pharmaceutical framework creates opportunities for eligible digital transactions while maintaining restrictions on higher-risk medicine categories. Retailers that integrate compliance into daily operations will be better positioned to expand services while protecting customers and reducing legal risk.' },
    ],
    visualKind: 'pharmacy-m5-41-regulation', visualHeading: 'Eight layers of a compliance system',
    visualIntro: 'Climb from regulatory monitoring at the base to incident response at the top.',
    imageAlt: 'Casemate pyramid of eight layers of a pharmacy compliance system',
    keyTerms: [
      { term: 'Regulatory monitoring', definition: 'Tracking changes to laws, decrees and circulars.' },
      { term: 'Traceability', definition: 'Records that let a product be followed from supplier to customer.' },
      { term: 'Compliance audit', definition: 'A review of stores, platforms, suppliers and documents for gaps.' },
      { term: 'Recall', definition: 'Withdrawing a defective product from the market.' },
    ],
    recap: [
      'Regulation covers operations, staff, quality, dispensing and distribution.',
      'Monitoring change is an ongoing responsibility.',
      'Online sales need controls that separate eligible from ineligible products.',
      'Compliance built into daily routines lowers legal risk.',
    ],
    chapterRecap: 'Vietnam’s updated pharmaceutical framework creates opportunities for eligible digital transactions while maintaining restrictions on higher-risk medicine categories. Retailers that integrate compliance into daily operations will be better positioned to expand services while protecting customers and reducing legal risk.',
    deepDiveTitle: 'How a rule change reaches the shop floor',
    body: <P5DeepDive paragraphs={[
      'A new circular is only useful if someone reads it, decides what changes, updates procedures and trains staff before the effective date. Naming an owner for each step stops rules from sitting unread.',
      'An audit after the change checks whether the stores and the app actually follow the new procedure, which is where gaps usually appear.' ]} evidence="The eight activities are described in the supplied material. Legal points are from law-firm, government-gazette and legal-database summaries and an International Bar Association survey; the circulars are official texts in English translation. Check official versions for exact scope." />,
    sources: citeP5('law44Summary', 'decree163', 'bakerMckenzie', 'circular11', 'circular30', 'dav1136', 'ibaSurvey'),
  }),
  p5Chapter({
    title: 'Product Quality, Traceability and Responsible Pharmaceutical Supply', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how traceability, verified sourcing and fast response to quality concerns protect customers and trust.',
    mateIntro: 'A customer cannot see whether a medicine is genuine or has been stored properly. Everything depends on the pharmacy’s supply discipline.',
    keyInsight: 'Trust depends on the integrity of the entire supply chain. Traceability, verified sourcing, appropriate storage, and rapid response to quality concerns are essential capabilities, not optional differentiators.',
    statTiles: [
      { value: '8', label: 'Key quality and traceability activities', subtitle: 'Supplier verification to customer communication', description: 'Supplier verification, product documentation, batch and expiry tracking, storage management, product-quality response, digital traceability, staff capability and customer communication.' },
      { value: 'By level', label: 'Recall reporting depends on the level of the recall', subtitle: 'Circular 30/2025/TT-BYT', description: 'Defective drugs are assessed by level and recalled accordingly.' },
      { value: '> 90%', label: 'Raw-material import dependence of local manufacturers', subtitle: 'Press report', description: 'A reminder that quality risk can begin far upstream of the pharmacy.' },
    ],
    statsNote: 'The first tile is a count from this lesson; recall deadlines are set out in the official circular and should be read there, and the import figure is a newspaper report.',
    narrative: [
      { label: 'What it is', text: 'Product quality and traceability remain central to pharmacy retail because customers depend on pharmacies to provide legitimate medicines that have been appropriately stored and handled. Quality risks can arise at different stages of the supply chain, including manufacturing, importation, distribution, warehousing, and final dispensing. Retailers therefore need reliable supplier relationships and procedures that support product verification and traceability.' },
      { label: 'Why it is happening', text: 'As the pharmaceutical market becomes more digitally connected, information systems can help improve stock visibility, batch tracking, and response to product-quality alerts. However, technology does not replace supplier qualification, physical handling controls, or the responsibility to follow applicable quality and safety procedures.' },
      { label: 'Real-world example', text: 'A pharmacy buys through appropriate channels and keeps supplier documents; checks authorisation and registration; monitors stock by batch and expiry; keeps required storage conditions and monitors equipment; isolates affected stock and follows reporting, recall or corrective-action procedures; records stock movements digitally; trains staff to spot quality issues; and handles customer complaints responsibly.' },
      { label: 'Vietnam example', text: 'Circular 30/2025/TT-BYT sets how defective drugs are reported, assessed by level and recalled, and Circular 11/2025/TT-BYT amends the good storage and distribution practice rules. Long Châu describes a 2025 warehouse system with OCR receiving and automated replenishment that records goods as they arrive. Local manufacturers import more than 90% of their raw materials and the top three foreign-owned wholesalers hold about 40% of wholesale by one estimate, so a retailer’s own checks matter at the end of a long chain.' },
      { label: 'Business impact', text: 'Quality assurance and traceability protect customers and support the credibility of pharmacy retailers. Effective systems combine reliable suppliers, appropriate handling, accurate records, trained personnel, and timely responses to product-quality risks.' },
    ],
    visualKind: 'pharmacy-m5-42-traceability', visualHeading: 'Eight steps in responsible supply',
    visualIntro: 'Follow eight steps from supplier verification to customer communication and see what each prevents.',
    imageAlt: 'Casemate eight-step flow of traceable and responsible pharmacy supply',
    keyTerms: [
      { term: 'Supplier verification', definition: 'Checking that a supplier is legitimate and documented.' },
      { term: 'Batch tracking', definition: 'Following stock by manufacturing batch and expiry date.' },
      { term: 'Corrective action', definition: 'Steps taken to fix a quality problem and prevent repeats.' },
      { term: 'Digital traceability', definition: 'Recording stock movements so information can be retrieved.' },
    ],
    recap: [
      'Customers depend on pharmacies for legitimate, properly stored medicines.',
      'Quality risks arise at every stage of the supply chain.',
      'Systems help, but cannot replace supplier checks and physical handling.',
      'Respond quickly and communicate honestly when concerns arise.',
    ],
    chapterRecap: 'Quality assurance and traceability protect customers and support the credibility of pharmacy retailers. Effective systems combine reliable suppliers, appropriate handling, accurate records, trained personnel, and timely responses to product-quality risks.',
    deepDiveTitle: 'What to do in the first hour after a quality alert',
    body: <P5DeepDive paragraphs={[
      'The first step is to identify affected batches in stock and isolate them so they cannot be sold. Batch-level records make this fast; without them, a pharmacy may have to pull whole product lines.',
      'Then follow the reporting and recall steps required for that level of alert, and be ready to tell customers who bought the product what to do.' ]} evidence="The eight activities are described in the supplied material. Recall rules are from the Circular 30/2025 text and storage rules from Circular 11/2025; the warehouse system is a group description; the import figure and wholesale share are a newspaper report and a market-research estimate." />,
    sources: citeP5('circular30', 'circular11', 'longChauWms', 'nhandanApi', 'sgAnalytics'),
  }),
  p5Chapter({
    title: 'Sustainability, Waste Reduction and Responsible Operations', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how better inventory discipline cuts waste and cost while keeping medicines safe and available.',
    mateIntro: 'In pharmacy, the greenest action is often the least glamorous one: buying the right amount and rotating it properly.',
    keyInsight: 'The most practical sustainability gains often come from improving operational discipline. Better forecasting, stock rotation, energy management, and appropriate waste handling can reduce unnecessary resource use while supporting product quality and cost efficiency.',
    statTiles: [
      { value: '8', label: 'Key sustainability activities', subtitle: 'Expiry reduction to operational reporting', description: 'Expiry reduction, appropriate waste handling, energy efficiency, packaging management, transport efficiency, responsible procurement, waste monitoring and operational reporting.' },
      { value: '2', label: 'Central warehouses described by Long Châu', subtitle: 'Company statement', description: 'Central stock handling allows planned, system-driven replenishment.' },
      { value: 'None found', label: 'Published Vietnam pharmacy-chain figures on expiry losses or pharmaceutical waste in the sources reviewed', subtitle: 'Evidence gap', description: 'Examples here are operational, not measured sustainability results.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the warehouse count is a company statement, and the third tile records that no sector-level waste or expiry figures were found, so none are claimed.',
    narrative: [
      { label: 'What it is', text: 'Sustainability in pharmacy retail includes responsible inventory management, waste reduction, efficient energy use, and the appropriate handling of expired or damaged products. Pharmacies must manage product shelf life carefully because excessive purchasing can increase expiry losses, while poor storage can compromise product integrity. Packaging, energy consumption, transportation, and waste management may also contribute to a retailer’s environmental footprint.' },
      { label: 'Why it is happening', text: 'Sustainability initiatives must be compatible with pharmaceutical safety and applicable waste-management requirements. Expired medicines and pharmaceutical waste cannot simply be treated as ordinary consumer waste, and inventory reduction must not create avoidable shortages of important products. Responsible operations therefore require a balance between environmental considerations, customer access, and product quality.' },
      { label: 'Real-world example', text: 'A pharmacy improves demand forecasting and stock rotation to cut avoidable medicine waste, handles expired or damaged products as the rules require, improves lighting and equipment use while keeping storage conditions, reduces unnecessary packaging where protection and rules allow, coordinates deliveries, chooses reliable suppliers, tracks expiry losses and disposal, and includes waste and efficiency indicators in store reviews.' },
      { label: 'Vietnam example', text: 'The sources reviewed contain no published Vietnam pharmacy-chain figures for expiry losses, pharmaceutical waste or energy use, so none are stated here. Operational examples are available: Long Châu describes two central warehouses and a 2025 system that automates replenishment, which supports buying closer to demand, and Circular 30/2025/TT-BYT sets how defective drugs are handled and recalled, which governs what happens to affected stock.' },
      { label: 'Business impact', text: 'Sustainability in pharmacy retail is closely linked to product safety, inventory discipline, and responsible resource use. Retailers can reduce waste and operating inefficiencies while maintaining medicine availability and meeting applicable pharmaceutical and environmental requirements.' },
    ],
    visualKind: 'pharmacy-m5-43-sustainability', visualHeading: 'Sustainability actions by ease and benefit',
    visualIntro: 'Place five actions on a matrix of how easy they are to start and how much they help.',
    imageAlt: 'Casemate matrix of pharmacy sustainability actions by ease of starting and benefit to the business',
    keyTerms: [
      { term: 'Expiry loss', definition: 'Value lost when stock passes its expiry date unsold.' },
      { term: 'Stock rotation', definition: 'Selling older stock first so that it does not expire.' },
      { term: 'Pharmaceutical waste', definition: 'Expired, damaged or unsuitable medicines that need appropriate disposal.' },
      { term: 'Operational reporting', definition: 'Including waste and efficiency indicators in performance reviews.' },
    ],
    recap: [
      'Excess buying raises expiry losses; poor storage harms product integrity.',
      'Pharmaceutical waste is not ordinary consumer waste.',
      'Cutting stock must not create shortages of important products.',
      'Operational discipline gives the most practical gains.',
    ],
    chapterRecap: 'Sustainability in pharmacy retail is closely linked to product safety, inventory discipline, and responsible resource use. Retailers can reduce waste and operating inefficiencies while maintaining medicine availability and meeting applicable pharmaceutical and environmental requirements.',
    deepDiveTitle: 'Why cutting stock to cut waste can backfire',
    body: <P5DeepDive paragraphs={[
      'Lower stock reduces the chance of expiry but raises the chance of a stockout on an important medicine. The target is not the smallest stock; it is stock matched to demand and shelf life.',
      'Forecasting by store and category, and reviewing slow movers on a schedule, reduces waste without hurting availability.' ]} evidence="The eight activities are described in the supplied material. The illustrative matrix positions are our own framing. Warehouse details are group statements and the recall rule is from the Circular 30/2025 text; no Vietnam waste or energy statistics for pharmacy chains were found, so none are cited." />,
    sources: citeP5('longChauLogistics', 'longChauWms', 'circular30'),
  }),
];

const quiz = p5Quiz('pharmacy-m5-l4', [
  { chapter: '1', objective: 'State how to treat regulatory monitoring', question: 'How should businesses treat regulatory monitoring?', application: 'A pharmacy checks the law once at licensing. What is better?', correct: 'As an ongoing operational responsibility', wrong: ['As a one-time licensing exercise', 'As optional', 'As a marketing task'], explanation: 'Rules change. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the effective date', question: 'When did Law 44/2024/QH15 amending the Law on Pharmacy take effect?', application: 'A compliance officer dates the new rules. When did they start?', correct: '1 July 2025', wrong: ['1 July 2020', '1 January 2030', '1 July 2015'], explanation: 'The framework began mid-2025. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply online sales controls', question: 'What should online sales controls distinguish?', application: 'A product list is loaded into an app. What must be separated?', correct: 'Eligible non-prescription medicines from products that cannot be sold online', wrong: ['Cheap from expensive products', 'Old from new products', 'Large from small packs'], explanation: 'Legal status decides. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe incident response', question: 'What should an incident-response procedure cover?', application: 'A counterfeit is suspected. What must the procedure address?', correct: 'Suspected counterfeits, product-quality issues, complaints and recalls', wrong: ['Only advertising', 'Only prices', 'Only staff rotas'], explanation: 'Preparedness matters. Review Chapter 1.' },
  { chapter: '2', objective: 'State what trust depends on', question: 'What does trust depend on in pharmaceutical supply?', application: 'A customer cannot judge a medicine’s origin. What does trust rest on?', correct: 'The integrity of the entire supply chain', wrong: ['Package design', 'Store location only', 'Price only'], explanation: 'Integrity protects customers. Review Chapter 2.' },
  { chapter: '2', objective: 'Say what technology cannot replace', question: 'What does technology not replace in quality assurance?', application: 'A pharmacy installs traceability software. What still needs doing?', correct: 'Supplier qualification, physical handling controls and following safety procedures', wrong: ['Nothing', 'Staff entirely', 'Suppliers entirely'], explanation: 'Systems support controls. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply batch tracking', question: 'Why track stock by batch and expiry?', application: 'A quality alert arrives. What helps most?', correct: 'It lets affected stock be found and isolated quickly', wrong: ['It hides stock', 'It raises prices', 'It reduces records'], explanation: 'Batch records speed response. Review Chapter 2.' },
  { chapter: '3', objective: 'State where sustainability gains come from', question: 'Where do the most practical sustainability gains often come from?', application: 'A pharmacy wants to cut waste. Where should it start?', correct: 'Improving operational discipline such as forecasting and stock rotation', wrong: ['Only new packaging', 'Only new logos', 'Closing stores'], explanation: 'Discipline pays first. Review Chapter 3.' },
  { chapter: '3', objective: 'Handle pharmaceutical waste', question: 'How should expired medicines be treated?', application: 'Expired stock is found. What is correct?', correct: 'Handled as the applicable requirements say, not as ordinary consumer waste', wrong: ['Thrown with household waste', 'Resold', 'Hidden'], explanation: 'Medicine waste has rules. Review Chapter 3.' },
  { chapter: '3', objective: 'Recognise an evidence gap', question: 'What does Chapter 3 say about published Vietnam pharmacy-chain waste figures?', application: 'A student looks for expiry-loss statistics. What should they expect?', correct: 'None were found in the sources reviewed, so none are claimed', wrong: ['They are all above 50%', 'They are all below 1%', 'They are published monthly'], explanation: 'Do not invent figures. Review Chapter 3.' },
]);

export const LESSON_P5_4: PharmacyM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how Vietnam’s 2025 pharmacy rules shape operations, why traceability and supply integrity underpin trust, and how inventory discipline supports sustainability.',
    keyTakeaways: [
      'Regulatory monitoring is an ongoing operational responsibility.',
      'Compliance must become practical controls for products, online sales, records and staff.',
      'Trust depends on the integrity of the whole supply chain.',
      'Traceability and fast response to quality concerns are essential capabilities.',
      'Sustainability gains come first from operational discipline.',
    ],
    businessImplications: 'Assign owners for rule changes, keep batch-level records, and cut waste through forecasting and rotation without creating shortages.',
    remember: 'Compliance and sustainability both start with discipline.',
    nextLesson: 'Growth Outlook & Strategic Opportunities',
  },
};
