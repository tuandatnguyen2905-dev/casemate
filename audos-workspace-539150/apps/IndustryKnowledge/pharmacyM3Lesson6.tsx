import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '6. Industry Ecosystem & Stakeholders';

const deck = [
  p3Chapter({
    title: 'Regulators, Manufacturers and Pharmaceutical Distributors', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how upstream stakeholders affect pharmacy retail beyond product availability.',
    mateIntro: 'A pharmacy depends on those who set the rules, make the medicines and bring them to its door. If any of them falters, the pharmacy feels it.',
    keyInsight: 'Pharmacy retailers depend on upstream partners for more than product availability. Supplier quality, traceability, delivery reliability, and regulatory compliance influence the safety and resilience of the entire retail operation.',
    statTiles: [
      { value: '7', label: 'Key upstream-stakeholder activities', subtitle: 'Regulatory oversight to regulatory monitoring', description: 'Regulatory oversight, manufacturer coordination, importer and distributor relationships, registration, quality and traceability, supply-risk management and regulatory monitoring.' },
      { value: '~40%', label: 'Share held by the three largest wholesalers', subtitle: 'SG Analytics estimate; all foreign-owned', description: 'Shows how concentrated pharmaceutical distribution is among a few groups.' },
      { value: '~8,000', label: 'Wholesale establishments in Vietnam', subtitle: 'Industry count cited for 2025', description: 'The network between manufacturers and about 95,600 retail outlets.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the concentration is a research estimate and the wholesale count is an industry figure cited in a manufacturer’s report, and other sources count wholesalers differently.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail operates inside a regulated supply chain of public authorities, manufacturers, importers and distributors. Regulators set rules on pharmaceutical business, medicine quality, registration, dispensing and professional practice; manufacturers produce medicines; and authorised importers and distributors move eligible products through the chain. Their performance affects pharmacies directly, because shortages, quality problems, regulatory change or unreliable delivery can disrupt stores and customer access, so retailers need appropriate suppliers and the documents and controls required for their activities.' },
      { label: 'Why it is happening', text: 'A pharmacy cannot make or register its own medicines, so it relies on upstream partners for product, proof of legitimacy and supply. Those partners, in turn, work within rules that retailers must also follow.' },
      { label: 'Real-world example', text: 'A pharmacy business monitors requirements from the Ministry of Health and the Drug Administration of Vietnam; assesses manufacturers on quality, reliability, documentation and capacity; buys through appropriate channels and checks supplier credentials; confirms products meet the legal conditions for supply and sale; keeps required documents and responds to quality alerts or recalls; identifies limited-source or recurring-shortage products and plans for them; and turns legal changes into procurement, storage, dispensing and documentation procedures.' },
      { label: 'Vietnam example', text: 'Law 44/2024/QH15, Decree 163/2025/ND-CP and Circulars 11, 30 and 31 of 2025 took effect on 1 July 2025 and set conditions for suppliers and pharmacies alike; Circular 30/2025/TT-BYT governs recalls. A research firm estimates that Zuellig Pharma, Diethelm and Mega Products hold about 40% of wholesale distribution and that foreign firms must sell to licensed domestic distributors, while a manufacturer report counts nearly 8,000 wholesale establishments and the national strategy aims for 80% of volume from domestic production by 2030.' },
      { label: 'Business impact', text: 'Regulators, manufacturers, importers, and distributors establish the foundation for compliant and reliable pharmacy supply. Retailers must maintain appropriate supplier relationships and quality controls to protect product integrity and reduce supply-chain disruption.' },
    ],
    visualKind: 'pharmacy-m3-61-upstream', visualHeading: 'How much pharmacies depend on each upstream stakeholder',
    visualIntro: 'See where six upstream items sit by influence over what a pharmacy may sell and day-to-day supply dependence.',
    imageAlt: 'Casemate matrix placing six upstream stakeholders by influence and supply dependence',
    keyTerms: [
      { term: 'Drug Administration of Vietnam', definition: 'The Ministry of Health agency that manages pharmaceutical affairs.' },
      { term: 'Marketing authorisation', definition: 'Legal approval to market a medicine.' },
      { term: 'Supply-risk management', definition: 'Identifying limited-source products and planning for shortages.' },
      { term: 'Recall', definition: 'Removing a defective product from the market.' },
    ],
    recap: [
      'Regulators, manufacturers, importers and distributors form the regulated supply base.',
      'Their performance affects pharmacies directly.',
      'Shortages, quality issues, rule changes and late deliveries disrupt stores.',
      'Retailers need appropriate suppliers, documents and controls.',
    ],
    chapterRecap: 'Regulators, manufacturers, importers, and distributors establish the foundation for compliant and reliable pharmacy supply. Retailers must maintain appropriate supplier relationships and quality controls to protect product integrity and reduce supply-chain disruption.',
    deepDiveTitle: 'Why a change in the rules is a stakeholder event',
    body: <P3DeepDive paragraphs={[
      'A rule change alters what suppliers can provide, which documents are needed and what a pharmacy may sell, so it ripples through every relationship at once. Teams that map their stakeholders can see which procedures to update.',
      'Assigning an owner for each legal update and sharing the summary with buying, store and digital teams turns a regulatory event into an orderly change.' ]} evidence="The seven activities are described qualitatively in the supplied material. Wholesale concentration is an SG Analytics estimate, counts are from a manufacturer annual report, and legal points are from the English texts of the 2025 circulars and a Baker McKenzie summary; they are not legal advice." />,
    sources: citeP3('sgAnalytics', 'dhgReport2025', 'bakerMckenzie', 'circular30', 'vneconomyStrategy'),
  }),
  p3Chapter({
    title: 'Pharmacy Operators, Pharmacists and Healthcare Providers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how operators, pharmacists and healthcare providers share responsibility and why professional independence matters.',
    mateIntro: 'The doctor decides the treatment, the pharmacist supplies and explains it, and the operator runs the business. Keeping those roles clear protects the patient.',
    keyInsight: 'The pharmacy’s role is to connect product access with responsible professional support. Commercial performance and healthcare quality must be managed together, without allowing sales targets to override appropriate dispensing or clinical judgment.',
    statTiles: [
      { value: '7', label: 'Key professional-relationship activities', subtitle: 'Pharmacy management to professional independence', description: 'Pharmacy management, pharmacist responsibilities, healthcare-provider coordination, prescription handling, staff development, service-quality monitoring and professional independence.' },
      { value: '18,000+', label: 'Pharmacists the company reported at Long Chau, July 2025', subtitle: 'Across 2,222 pharmacies', description: 'A company statement of the size of its professional workforce.' },
      { value: '3.41', label: 'Pharmacists per 10,000 people in Vietnam in 2016 data', subtitle: 'Target of 4.0 for 2025–2030', description: 'Shows professional capacity is a national constraint.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the workforce number is a company statement and the density is an older journal-reported figure, so neither measures professional quality.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy operators, pharmacists and healthcare providers connect pharmaceutical products with patient and consumer needs. Operators handle commercial and operating activities, pharmacists give professional dispensing and medication-use support within their scope, and hospitals, clinics and physicians shape demand through diagnosis, prescribing, treatment decisions and ongoing care. Their roles differ but share an interest in appropriate medicine use and continuity of care, and unclear responsibilities or improper commercial influence can undermine trust and standards.' },
      { label: 'Why it is happening', text: 'Pharmacies sit between prescribers and patients and run on commercial results, so they face a standing tension between service and sales. Clear roles and written procedures keep that tension from affecting patient care.' },
      { label: 'Real-world example', text: 'A pharmacy sets procedures for staffing, inventory, service, quality and compliance; pharmacists dispense, explain use and spot situations needing further assessment; the pharmacy supports continuity of care through communication and referral where permitted; prescriptions go through verification and dispensing processes; staff are trained in product knowledge, communication, safety and professional duties; complaints and errors are reviewed; and commercial arrangements are kept from improperly influencing prescribing, dispensing or recommendations.' },
      { label: 'Vietnam example', text: 'Vietnam’s rules require a responsible person holding a pharmacy practice certificate at each outlet, and Circular 26/2025/TT-BYT moves outpatient prescribing to a national e-prescription system from which pharmacies retrieve prescriptions by code and report sales. FPT Long Châu says it has more than 18,000 pharmacists and pays an average of about VND 12 million a month, and a journal article reports 3.41 pharmacists per 10,000 people in 2016 data against a 2025–2030 target of 4.0.' },
      { label: 'Business impact', text: 'Pharmacy operators and healthcare professionals play complementary roles in medicine access and responsible use. Effective coordination requires clear responsibilities, competent staff, appropriate communication, and protection of professional judgment.' },
    ],
    visualKind: 'pharmacy-m3-62-professionals', visualHeading: 'Seven layers of the pharmacy and healthcare relationship',
    visualIntro: 'See seven layers stacked from pharmacy management at the base to professional independence at the top.',
    imageAlt: 'Casemate pyramid of seven layers in the relationship between pharmacy operators, pharmacists and healthcare providers',
    keyTerms: [
      { term: 'Professional independence', definition: 'Keeping professional judgement free from improper commercial influence.' },
      { term: 'Continuity of care', definition: 'Coordinated care that continues smoothly across providers.' },
      { term: 'Prescription handling', definition: 'Verifying and dispensing prescriptions through the required process.' },
      { term: 'Responsible pharmacist', definition: 'The qualified person accountable for a pharmacy’s professional matters.' },
    ],
    recap: [
      'Operators, pharmacists and healthcare providers connect products with patient needs.',
      'Each has different responsibilities but a shared interest in appropriate use.',
      'Unclear roles or improper influence can undermine trust.',
      'Commercial performance and healthcare quality must be managed together.',
    ],
    chapterRecap: 'Pharmacy operators and healthcare professionals play complementary roles in medicine access and responsible use. Effective coordination requires clear responsibilities, competent staff, appropriate communication, and protection of professional judgment.',
    deepDiveTitle: 'How to keep sales targets from steering advice',
    body: <P3DeepDive paragraphs={[
      'Setting targets for store sales and not for the sale of particular medicines, rewarding service quality as well as revenue, and letting pharmacists escalate concerns without penalty all reduce pressure on advice.',
      'Regular review of complaints, near-misses and dispensing errors shows whether commercial pressure is affecting professional work.' ]} evidence="The seven activities are described qualitatively in the supplied material. Workforce figures are company statements reported in the press and a journal article citing 2016 data; legal points are from the English text of Circular 26/2025/TT-BYT, an IBA survey and a World Bank project document." />,
    sources: citeP3('vietnamnetLongChau', 'vnexpressRecruit', 'pensoftPharmacists', 'circular26', 'worldBankEprescription', 'ibaSurvey'),
  }),
  p3Chapter({
    title: 'Technology Providers, Logistics Partners and Consumers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how technology, logistics and payment partners and consumers shape the pharmacy ecosystem and who stays accountable.',
    mateIntro: 'Software, delivery firms and payment apps all help a pharmacy serve customers. They can make it faster, but they cannot take over its responsibilities.',
    keyInsight: 'The ecosystem’s effectiveness depends on coordination, trustworthy information, and clearly assigned responsibilities. Digital tools and external partners can improve efficiency, but poor integration or weak controls can create service failures and damage customer confidence.',
    statTiles: [
      { value: '8', label: 'Key ecosystem activities', subtitle: 'Software providers to ecosystem coordination', description: 'Pharmacy software, digital platforms, payments, logistics partners, data protection, consumer feedback, partner performance management and ecosystem coordination.' },
      { value: 'US$5M', label: 'Investment announced in a pharmaceutical-grade e-commerce fulfilment centre', subtitle: 'SwiftHub, November 2024', description: 'An example of a logistics partner specialising in pharmaceutical fulfilment.' },
      { value: '15–20', label: 'Firms estimated to run online business-to-business pharmacy platforms', subtitle: 'Press estimate', description: 'Shows how digital wholesale platforms are emerging around pharmacies.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the investment is a market research report item and the platform count is a press estimate, so neither measures how widely partners are used.',
    narrative: [
      { label: 'What it is', text: 'Technology providers, payment companies, logistics operators and consumers form another part of the pharmacy ecosystem. Technology supports inventory, transactions, customer communication and digital ordering, logistics providers transport products, and payment services enable convenient transactions, while consumers and caregivers set demand through purchases, service expectations and trust. These relationships matter more as retailers add digital services and larger networks, but digitalisation also brings needs for data security, privacy, system reliability and clear accountability between partners, and the pharmacy remains responsible for its own compliance.' },
      { label: 'Why it is happening', text: 'A chain of thousands of stores cannot build every system itself, and customers expect digital payment and delivery. Partners fill those gaps, but customer data and medicine handling remain the pharmacy’s duty.' },
      { label: 'Real-world example', text: 'Software providers supply inventory, point-of-sale, reporting and management systems; platform providers support websites, apps, enquiries and eligible online ordering; payment providers enable electronic payments and reconciliation; logistics partners provide transport with handling and accountability arrangements; the pharmacy applies safeguards to customer data; consumer feedback shows improvements; partner performance is assessed on reliability, quality, cost and compliance; and the ecosystem is coordinated so information stays accurate.' },
      { label: 'Vietnam example', text: 'FPT Software built Long Châu’s 2025 warehouse management system, and Long Châu works with the Ministry of Public Security’s population-data centre on VNeID verification for online purchases. SwiftHub announced a US$5 million pharmaceutical-grade e-commerce fulfilment centre in November 2024, and the press estimates 15 to 20 firms run online pharmacy wholesale platforms such as Thuocsi.vn. Law 91/2025/QH15 sets maximum fines of VND 3 billion for most data-protection violations, and Long Châu says it serves 28 million customers and families.' },
      { label: 'Business impact', text: 'Technology providers, logistics partners, payment services, and consumers influence pharmacy accessibility and service performance. Effective collaboration can improve convenience and operational efficiency, provided that data protection, product handling, and accountability remain clear.' },
    ],
    visualKind: 'pharmacy-m3-63-partners', visualHeading: 'Eight partner roles around a pharmacy',
    visualIntro: 'See eight partner roles as cards and what each is accountable for.',
    imageAlt: 'Casemate cards showing eight partner roles around a pharmacy and what each is accountable for',
    keyTerms: [
      { term: 'Ecosystem', definition: 'The set of partners and stakeholders around a business.' },
      { term: 'eB2B platform', definition: 'An online marketplace where businesses buy from wholesalers.' },
      { term: 'Data protection', definition: 'Safeguards for customer information, especially health-related data.' },
      { term: 'Partner performance management', definition: 'Assessing reliability, quality, cost and compliance of partners.' },
    ],
    recap: [
      'Technology, payment, logistics partners and consumers shape accessibility and service.',
      'Digital tools and partners improve efficiency but bring data and accountability needs.',
      'The pharmacy stays responsible for its own compliance.',
      'Clear responsibilities and accurate information keep the ecosystem working.',
    ],
    chapterRecap: 'Technology providers, logistics partners, payment services, and consumers influence pharmacy accessibility and service performance. Effective collaboration can improve convenience and operational efficiency, provided that data protection, product handling, and accountability remain clear.',
    deepDiveTitle: 'What a partner agreement should cover for health data',
    body: <P3DeepDive paragraphs={[
      'It should state what data the partner may access, for what purpose, how long it may keep it and how it must protect it. It should also set how incidents are reported and who answers to the customer and the regulator.',
      'Because health information needs consent and extra care, a pharmacy cannot transfer its own responsibility to a software or delivery partner.' ]} evidence="The eight activities are described qualitatively in the supplied material. The warehouse system and VNeID service are from a technology news article and a market research report, the fulfilment-centre item is from the same report, the platform count is a press estimate and the data-protection point is from the English text of Law 91/2025/QH15." />,
    sources: citeP3('longChauWms', 'techsciEpharmacy', 'nhipcauWholesale', 'pdplLaw', 'vietnamnetLongChau'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l6', [
  { chapter: '1', objective: 'State what retailers depend on upstream', question: 'What do pharmacy retailers depend on upstream partners for?', application: 'A pharmacy treats suppliers only as a source of boxes. What is missing?', correct: 'More than availability: quality, traceability, delivery reliability and regulatory compliance', wrong: ['Only product availability', 'Only discounts', 'Only advertising'], explanation: 'Upstream partners affect safety and resilience. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the regulators', question: 'Which authorities does the chapter name for Vietnam?', application: 'A pharmacy asks who sets pharmaceutical rules. Who are they?', correct: 'The Ministry of Health and the Drug Administration of Vietnam', wrong: ['Only local retailers', 'Only manufacturers', 'Only wholesalers'], explanation: 'These authorities oversee the sector. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain supply-risk management', question: 'What should retailers do about limited-source products?', application: 'A medicine has few suppliers. What is a sensible response?', correct: 'Identify them, assess risk and develop suitable contingency plans', wrong: ['Ignore them', 'Stop selling all medicines', 'Buy from any seller'], explanation: 'Plan for shortages. Review Chapter 1.' },
  { chapter: '2', objective: 'State the pharmacy’s role', question: 'What is the pharmacy’s role in the healthcare relationship?', application: 'A manager sets aggressive sales targets for medicines. What should guide decisions?', correct: 'Connecting product access with responsible professional support, without letting sales targets override dispensing or clinical judgement', wrong: ['Maximising medicine sales', 'Replacing physicians', 'Ignoring prescribers'], explanation: 'Sales must not override judgement. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe pharmacist responsibilities', question: 'What do pharmacists provide?', application: 'A customer asks about a medicine. What is a pharmacist’s role?', correct: 'Professional dispensing and medication-use support within their scope, and recognition of cases needing further assessment', wrong: ['Diagnosis of all conditions', 'Sales promotion only', 'Prescribing all treatments'], explanation: 'Scope matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the independence principle', question: 'What must commercial arrangements not do?', application: 'A supplier offers incentives linked to recommending one product. What is the concern?', correct: 'Improperly influence prescribing, dispensing or customer recommendations', wrong: ['Support operations', 'Provide stock', 'Fund training'], explanation: 'Professional independence protects patients. Review Chapter 2.' },
  { chapter: '3', objective: 'State the ecosystem principle', question: 'What does the ecosystem’s effectiveness depend on?', application: 'A pharmacy adds many digital partners. What must be clear?', correct: 'Coordination, trustworthy information and clearly assigned responsibilities', wrong: ['The number of partners', 'The lowest price', 'The newest technology'], explanation: 'Clarity keeps partners effective. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall who stays responsible', question: 'Who remains responsible for a pharmacy’s own compliance when it uses partners?', application: 'A delivery partner mishandles a parcel. Who is accountable to the regulator?', correct: 'The pharmacy', wrong: ['Only the delivery partner', 'Only the software provider', 'Nobody'], explanation: 'Partners support but do not replace responsibility. Review Chapter 3.' },
  { chapter: '3', objective: 'Name the digital risk', question: 'What additional requirements does digitalisation create?', application: 'A pharmacy launches an app. What must it plan for?', correct: 'Data security, privacy, system reliability and clear accountability between partners', wrong: ['No extra requirements', 'Only advertising', 'Only a new logo'], explanation: 'Digital tools add duties. Review Chapter 3.' },
  { chapter: '3', objective: 'Use consumer feedback', question: 'How can consumer feedback help a pharmacy?', application: 'A pharmacy collects complaints and reviews. What should it do with them?', correct: 'Identify improvements in service, delivery and information accuracy', wrong: ['Ignore them', 'Delete them', 'Use them only for advertising'], explanation: 'Feedback shows what to fix. Review Chapter 3.' },
]);

export const LESSON_P3_6: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how regulators, manufacturers and distributors, pharmacy professionals and healthcare providers, and technology, logistics and consumer partners shape the pharmacy ecosystem.',
    keyTakeaways: [
      'Upstream partners affect quality, traceability, reliability and compliance, not just availability.',
      'Pharmacy connects product access with responsible professional support.',
      'Sales targets must not override dispensing or clinical judgement.',
      'Partners can improve efficiency but cannot take over the pharmacy\u2019s responsibility.',
      'Clear roles, accurate information and data protection keep the ecosystem trustworthy.',
    ],
    businessImplications: 'Map your stakeholders, assign owners for each relationship, protect professional independence and write clear responsibilities and data rules into every partner agreement.',
    remember: 'The ecosystem helps, but accountability stays with the pharmacy.',
    nextLesson: 'Who Competes\u2014and Why They Win',
  },
};
