import { P2DeepDive, citeP2, p2Chapter, p2Quiz } from './pharmacyM2Core';
import type { PharmacyM2LessonBundle } from './pharmacyM2Core';

const LESSON = '1. Value Chain Overview';

const deck = [
  p2Chapter({
    title: 'Pharmacy Retail Value Chain Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the links of the pharmacy retail value chain and explain why coordination, not simple product transfer, creates value.',
    mateIntro: 'A medicine on a pharmacy shelf has travelled a long way and passed many checks. Seeing the whole chain shows where value and risk are created.',
    keyInsight: 'Pharmacy retail value creation depends on coordinating product availability, regulatory compliance, professional service, and inventory efficiency across the entire supply chain.',
    statTiles: [
      { value: '6', label: 'Key value-chain activities', subtitle: 'Manufacturing to customer follow-up', description: 'Research and manufacturing, regulatory authorisation, importation and wholesale, retail procurement and inventory, pharmacy operations, and customer support.' },
      { value: '~US$8B', label: 'Vietnam pharmaceutical market, 2025', subtitle: 'VND 213,621 billion, up 5% (IQVIA)', description: 'The market that the chain serves, excluding vaccines, as cited in a manufacturer’s annual report.' },
      { value: '~8,000', label: 'Wholesale establishments in Vietnam', subtitle: 'Industry count cited for 2025', description: 'Shows how many intermediaries stand between producers and the roughly 95,600 retail outlets.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the market and establishment figures are IQVIA and industry counts as cited in a company report and use that report’s definitions, so other sources give different counts.',
    narrative: [
      { label: 'What it is', text: 'The pharmacy retail value chain describes the activities that move medicines and healthcare products from manufacturers and authorised suppliers to end consumers. It starts with pharmaceutical research and manufacturing, continues through product authorisation, importation, wholesale distribution and procurement, and ends with retail dispensing, customer support and post-sale services. Unlike general merchandise retail, it operates under strict rules on quality, authorisation, storage, traceability, dispensing and professional accountability, and its structure differs between prescription medicines, OTC medicines and non-medicine healthcare products.' },
      { label: 'Why it is happening', text: 'A medicine can harm as well as help, so every stage is licensed and documented. Because many stages are owned by different companies, no one stage can guarantee a safe and available product alone, and value depends on how well the stages work together.' },
      { label: 'Real-world example', text: 'Manufacturers develop and produce medicines and ingredients; regulators and applicants obtain registrations and permissions; importers and wholesalers procure authorised products and supply pharmacies; retailers select suppliers, forecast demand and manage expiry; pharmacies receive, store, dispense and sell; and staff provide product information, support eligible repeat purchases and handle complaints.' },
      { label: 'Vietnam example', text: 'A manufacturer’s 2025 annual report, citing IQVIA, puts Vietnam’s pharmaceutical market (excluding vaccines) at VND 213,621 billion, more than US$8 billion and up 5%, served by nearly 8,000 wholesale establishments and around 95,600 retail drug outlets. Chains such as FPT Long Chau have built their own central warehouses between suppliers and stores, which shows how a retailer can take on more links of the chain to improve availability.' },
      { label: 'Business impact', text: 'The pharmacy retail value chain connects pharmaceutical production with safe and reliable access to medicines. Retailers create value by coordinating sourcing, inventory, professional service, and compliance rather than simply transferring products to consumers.' },
    ],
    visualKind: 'pharmacy-m2-11-chain', visualHeading: 'Six links from manufacturer to customer follow-up',
    visualIntro: 'Follow six links of the chain and see what each one adds.',
    imageAlt: 'Casemate step diagram of six links in the pharmacy retail value chain',
    keyTerms: [
      { term: 'Value chain', definition: 'The linked activities that move a product from producer to end customer and add value along the way.' },
      { term: 'Active pharmaceutical ingredient (API)', definition: 'The ingredient in a medicine that produces its intended effect.' },
      { term: 'Marketing authorisation', definition: 'Legal approval that allows a medicine to be marketed and supplied.' },
      { term: 'Traceability', definition: 'The ability to follow a product and its batch through the chain using records.' },
    ],
    recap: [
      'The chain runs from manufacturing to authorisation, wholesale, retail and follow-up.',
      'It operates under strict quality, storage, traceability and dispensing rules.',
      'Structure differs for prescription, OTC and non-medicine products.',
      'Value comes from coordinating the links, not from passing products on.',
    ],
    chapterRecap: 'The pharmacy retail value chain connects pharmaceutical production with safe and reliable access to medicines. Retailers create value by coordinating sourcing, inventory, professional service, and compliance rather than simply transferring products to consumers.',
    deepDiveTitle: 'Why a chain with many owners needs shared records',
    body: <P2DeepDive paragraphs={[
      'When a product passes through several companies, each one relies on the records of the one before. A batch number and a supplier document let a pharmacy prove where a product came from and let others act quickly if a problem appears.',
      'That is why even a small pharmacy keeps purchase records, and why larger chains invest in systems that carry batch and expiry data from receiving to sale.' ]} evidence="The six activities are described qualitatively in the supplied material. Market, wholesale and outlet counts are from a manufacturer annual report citing IQVIA and industry data, and the warehouse point is from company and press descriptions; they use different definitions and dates." />,
    sources: citeP2('dhgReport2025', 'longChauLogistics'),
  }),
  p2Chapter({
    title: 'Key Participants and Their Roles', chapterTitle: LESSON, readingTime: '6',
    objective: 'Name the main participants in the pharmacy value chain and explain how their reliability affects retail availability.',
    mateIntro: 'Eight different groups touch a medicine before it is used. Each has a clear job, and a weak link anywhere can empty a pharmacy shelf.',
    keyInsight: 'Pharmacy retail is an interdependent ecosystem. Retail performance depends not only on the pharmacy’s own capabilities but also on the reliability and compliance of upstream suppliers and distribution partners.',
    statTiles: [
      { value: '8', label: 'Key participant groups', subtitle: 'Manufacturers to consumers and patients', description: 'Manufacturers, importers and authorisation holders, wholesalers, logistics providers, regulators, pharmacy operators, pharmacists and staff, and consumers.' },
      { value: '245', label: 'Establishments for import, export and storage services', subtitle: 'Industry count cited for 2025', description: 'The upstream gateway between international supply and domestic wholesalers.' },
      { value: '~95,600', label: 'Retail drug outlets in Vietnam', subtitle: 'Industry count cited for 2025', description: 'The last link, where products reach patients.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the counts are industry figures cited in a manufacturer’s report and differ from other published outlet counts that use other definitions.',
    narrative: [
      { label: 'What it is', text: 'Many participants contribute to the pharmacy retail value chain: manufacturers, importers, wholesalers, logistics providers, regulators, pharmacy operators, healthcare professionals and consumers. Their responsibilities differ according to the products handled and the legal framework for each stage. The chain works well when accountability is clear and information flows reliably, because a manufacturing shortage, a distribution delay or a regulatory issue at one stage can affect product availability at the retail level.' },
      { label: 'Why it is happening', text: 'Medicines need specialised skills at each stage, from manufacturing quality to storage to dispensing, so work is split among licensed participants. The split makes each party depend on others for product integrity and availability.' },
      { label: 'Real-world example', text: 'Manufacturers produce medicines and keep quality systems; importers and authorisation holders manage authorisation and importation; wholesalers supply eligible products under distribution practices; logistics providers move and store products under suitable conditions; regulators oversee licensing and compliance; pharmacy operators procure, store and sell; pharmacists support appropriate use; and consumers use products as advised.' },
      { label: 'Vietnam example', text: 'A manufacturer’s report counts 245 establishments for import, export and storage services, nearly 8,000 wholesalers and around 95,600 retail outlets in 2025. A market research firm estimates that the three largest wholesalers, all foreign-owned, hold about 40% of wholesale and distribution, and that foreign pharmaceutical and logistics firms are not allowed to distribute directly and must sell to licensed domestic distributors. Retail outlets include pharmacies, drug shops and commune health-station cabinets, each with its own qualified person.' },
      { label: 'Business impact', text: 'Each participant contributes to product integrity, availability, or safe use. Effective coordination and clearly assigned responsibilities are essential for a reliable pharmacy retail value chain.' },
    ],
    visualKind: 'pharmacy-m2-12-participants', visualHeading: 'Eight participants and what each is accountable for',
    visualIntro: 'See eight participants as cards and what each one is accountable for.',
    imageAlt: 'Casemate cards showing eight participants in the pharmacy value chain and their accountabilities',
    keyTerms: [
      { term: 'Marketing authorisation holder', definition: 'The organisation legally responsible for a medicine’s authorisation in a market.' },
      { term: 'Wholesaler', definition: 'A licensed business that supplies medicines to pharmacies and other eligible buyers.' },
      { term: 'Responsible pharmacist', definition: 'The qualified person accountable for a pharmacy’s professional matters.' },
      { term: 'Interdependence', definition: 'A situation where one party’s performance depends on others.' },
    ],
    recap: [
      'Manufacturers, importers, wholesalers, logistics, regulators, pharmacies, staff and consumers all take part.',
      'Responsibilities differ by product and legal framework.',
      'Clear accountability and reliable information flows are essential.',
      'A disruption at one stage can affect retail availability.',
    ],
    chapterRecap: 'Each participant contributes to product integrity, availability, or safe use. Effective coordination and clearly assigned responsibilities are essential for a reliable pharmacy retail value chain.',
    deepDiveTitle: 'Why a pharmacist is a participant, not just an employee',
    body: <P2DeepDive paragraphs={[
      'The responsible pharmacist carries legal and professional accountability for how medicines are stored, dispensed and explained. That is different from a typical shop manager, whose accountability is commercial.',
      'This is why staffing a pharmacy is not only a cost decision: a store cannot operate lawfully without the required qualified person.' ]} evidence="The eight participant groups are described qualitatively in the supplied material. Establishment counts are from a manufacturer annual report, wholesale concentration and the foreign-distribution limit are from SG Analytics, and outlet types are from a secondary reference site; check the official texts." />,
    sources: citeP2('dhgReport2025', 'sgAnalytics', 'medibaseRetail', 'ibaSurvey'),
  }),
  p2Chapter({
    title: 'Product, Information, and Financial Flows', chapterTitle: LESSON, readingTime: '6',
    objective: 'Distinguish the product, information and financial flows and explain why they must stay aligned and traceable.',
    mateIntro: 'A pharmacy moves three things at once: boxes of medicine, data about those boxes, and money. If one falls out of step, safety and cash both suffer.',
    keyInsight: 'A pharmacy value chain is effective when physical products, regulatory and operational information, and financial transactions remain aligned and traceable.',
    statTiles: [
      { value: '6', label: 'Key flow activities', subtitle: 'Product, information, demand, financial, compliance and exception', description: 'Product flow, information flow, demand flow, financial flow, compliance documentation and exception management.' },
      { value: '1 Oct 2025', label: 'Deadline for hospitals to prescribe electronically', subtitle: 'Circular 26/2025/TT-BYT', description: 'Other facilities follow by 1 January 2026, which feeds prescription data to pharmacies.' },
      { value: '1 Jan 2026', label: 'Date pharmacies must connect and update data with the pharmaceutical information system', subtitle: 'Circular 11/2025/TT-BYT', description: 'Moves pharmacy sales records into a national system.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the dates are from legal summaries and are not a full statement of the obligations, so check the current official texts.',
    narrative: [
      { label: 'What it is', text: 'The value chain has three connected flows. Products move from manufacturers and suppliers through distribution to pharmacies and consumers. Information moves in both directions: product specifications, authorisation status, demand forecasts, prescriptions where applicable, inventory and safety alerts. Money moves as procurement payments, retail transactions, reimbursement where applicable and other settlements. These flows are sensitive because product identity, batch, expiry and authorised supply routes affect patient safety and compliance.' },
      { label: 'Why it is happening', text: 'A medicine is only useful if it is the right product, within date, legally supplied and paid for. When records, stock and payments disagree, errors, stockouts or compliance problems follow.' },
      { label: 'Real-world example', text: 'Medicines move through authorised channels with proper handling; suppliers share product, batch, expiry and safety information; sales and stock data guide replenishment; retailers pay suppliers on agreed terms while customers or eligible payers settle purchases; records support verification and reporting; and shortages, recalls, damage or suspected quality issues trigger documented procedures.' },
      { label: 'Vietnam example', text: 'Under Circular 26/2025/TT-BYT, hospitals had to prescribe electronically by 1 October 2025 and other facilities by 1 January 2026. A World Bank document describes how pharmacies pull a prescription from the national database by code and report the sale. Circular 11/2025/TT-BYT adds that pharmacies must connect and update data with the pharmaceutical information system from 1 January 2026, sell no more than the prescribed quantity and refuse expired prescriptions.' },
      { label: 'Business impact', text: 'Product, information, and financial flows must operate together to support safe, efficient pharmacy retail. Better integration can reduce errors, improve availability, and strengthen accountability.' },
    ],
    visualKind: 'pharmacy-m2-13-flows', visualHeading: 'Six flows that must stay aligned',
    visualIntro: 'Read the table to see what moves in each flow and which record keeps it traceable.',
    imageAlt: 'Casemate table of six flows in the pharmacy value chain and the records that keep them traceable',
    keyTerms: [
      { term: 'Batch', definition: 'A quantity of a product made together and identified by one batch number.' },
      { term: 'Reimbursement', definition: 'Payment of eligible healthcare costs by a public or private payer.' },
      { term: 'E-prescription', definition: 'A prescription issued and transmitted electronically to a national system.' },
      { term: 'Exception management', definition: 'Procedures for shortages, recalls, damage and quality concerns.' },
    ],
    recap: [
      'Products, information and money move together through the chain.',
      'Information covers specifications, authorisation, forecasts, prescriptions, inventory and alerts.',
      'Batch, expiry and supply-route data affect patient safety.',
      'Aligned and traceable flows reduce errors and improve availability.',
    ],
    chapterRecap: 'Product, information, and financial flows must operate together to support safe, efficient pharmacy retail. Better integration can reduce errors, improve availability, and strengthen accountability.',
    deepDiveTitle: 'Why the prescription code is a flow of information, not just a number',
    body: <P2DeepDive paragraphs={[
      'A prescription code lets the pharmacy retrieve what the doctor actually prescribed, and lets the system see that it has been dispensed. That reduces the chance of the same prescription being filled twice or after it has expired.',
      'For the pharmacy it also means the sale record has to be accurate on the same day, because the national system now sees what is dispensed.' ]} evidence="The six flow activities are described qualitatively in the supplied material. Legal dates are from the English text of Circular 26/2025/TT-BYT and Circular 11/2025/TT-BYT, and the pull-by-code description is from a World Bank document; they are summaries, not legal advice." />,
    sources: citeP2('circular26', 'circular11', 'worldBankEprescription'),
  }),
  p2Chapter({
    title: 'Regulatory and Quality Controls Across the Value Chain', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why compliance controls apply at every stage and name the controls from manufacturing to retail.',
    mateIntro: 'Quality is not checked once at the till. Rules and controls run through the whole chain, and a gap at one stage reaches the pharmacy.',
    keyInsight: 'Compliance is a cross-chain requirement. Weak controls at any stage can undermine product integrity, disrupt supply, and expose downstream retailers to operational and reputational risks.',
    statTiles: [
      { value: '6', label: 'Key control activities', subtitle: 'Manufacturing quality to audit and training', description: 'Manufacturing quality, product authorisation, distribution compliance, retail controls, traceability and recall, and audit and training.' },
      { value: '3', label: 'Practice circulars amended in 2025', subtitle: 'Pharmacy, distribution and storage practice', description: 'Circular 11/2025/TT-BYT amended the 2018 circulars on good pharmacy, distribution and storage practice.' },
      { value: '1 Jul 2025', label: 'Date the amended Law on Pharmacy and its guiding texts took effect', subtitle: 'Law 44/2024/QH15, Decree 163/2025/ND-CP', description: 'Reset the legal base for pharmaceutical business in Vietnam.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are from legal summaries and describe the instruments, not every obligation inside them.',
    narrative: [
      { label: 'What it is', text: 'Regulatory and quality controls apply across the whole pharmacy value chain, not only at the point of sale. Depending on the product and jurisdiction, requirements cover manufacturing quality, product registration, importation, wholesale distribution, storage, dispensing, advertising, recordkeeping and post-market safety monitoring. In Vietnam, pharmacy operations are governed by the Law on Pharmacy and its implementing rules, and retailers must verify the current requirements for their business, products and channels, including good-practice standards and limits on online medicine sales.' },
      { label: 'Why it is happening', text: 'A single defect can travel from a factory to many patients. Controls placed at several stages catch problems earlier and let the chain trace and remove affected products quickly.' },
      { label: 'Real-world example', text: 'Manufacturers apply pharmaceutical standards and quality controls; buyers verify the legal status of products before procurement; distributors maintain storage, transport and documentation; retailers follow rules on prescription handling and dispensing; records help identify affected batches and execute recalls; and audits and training keep procedures and people current.' },
      { label: 'Vietnam example', text: 'Circular 11/2025/TT-BYT amended the 2018 circulars on good pharmacy, distribution and storage practice and requires pharmacies to manage purchase and sale through software that ensures traceability and connects with the pharmaceutical information system. Circular 30/2025/TT-BYT sets how defective drugs are assessed by level and recalled, including quarantine, notification and reporting. These apply alongside Law 44/2024/QH15 and Decree 163/2025/ND-CP, which took effect on 1 July 2025.' },
      { label: 'Business impact', text: 'Quality and regulatory controls are embedded throughout the pharmacy value chain. Retailers need reliable suppliers, documented procedures, and continuous monitoring to maintain compliance and customer trust.' },
    ],
    visualKind: 'pharmacy-m2-14-controls', visualHeading: 'Controls stacked from the factory to the counter',
    visualIntro: 'See six controls stacked from manufacturing quality at the base up to audit and training.',
    imageAlt: 'Casemate pyramid of six regulatory and quality controls across the pharmacy value chain',
    keyTerms: [
      { term: 'Good pharmacy practice (GPP)', definition: 'Standards for how a retail pharmacy stores, dispenses and documents.' },
      { term: 'Good distribution practice (GDP)', definition: 'Standards for how wholesalers store, transport and document medicines.' },
      { term: 'Good storage practice (GSP)', definition: 'Standards for storing medicines and their ingredients.' },
      { term: 'Recall', definition: 'Removing a defective product from the market and from users.' },
    ],
    recap: [
      'Controls apply across the chain, not only at the point of sale.',
      'They cover manufacturing, authorisation, import, wholesale, storage, dispensing, advertising and monitoring.',
      'Weak control at one stage can disrupt supply and expose retailers.',
      'Retailers must verify current requirements for their products and channels.',
    ],
    chapterRecap: 'Quality and regulatory controls are embedded throughout the pharmacy value chain. Retailers need reliable suppliers, documented procedures, and continuous monitoring to maintain compliance and customer trust.',
    deepDiveTitle: 'Why a retailer cannot rely on the supplier alone',
    body: <P2DeepDive paragraphs={[
      'Upstream controls reduce risk but cannot remove it: a delivery can be damaged in transit, mislabelled or stored badly after it leaves the factory. Receiving checks at the pharmacy are the last chance to stop a problem before it reaches a customer.',
      'The same logic explains why regulators require records and traceability from every participant rather than only from the manufacturer.' ]} evidence="The six control activities are described qualitatively in the supplied material. Legal points are from the English texts of Circular 11/2025/TT-BYT and Circular 30/2025/TT-BYT and a Baker McKenzie summary of Decree 163/2025/ND-CP; they are summaries, not legal advice." />,
    sources: citeP2('circular11', 'circular30', 'bakerMckenzie', 'ibaSurvey'),
  }),
];

const quiz = p2Quiz('pharmacy-m2-l1', [
  { chapter: '1', objective: 'Describe the chain', question: 'What does the pharmacy retail value chain describe?', application: 'A manager sees a pharmacy as a place that resells boxes. What is missing?', correct: 'The activities that move medicines from manufacturers and authorised suppliers to consumers, with quality and professional controls', wrong: ['Only the retail store', 'Only advertising', 'Only manufacturing'], explanation: 'The chain spans many stages. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain how value is created', question: 'How do pharmacy retailers create value in the chain?', application: 'Two pharmacies stock the same products. What can differ?', correct: 'By coordinating sourcing, inventory, professional service and compliance, not just transferring products', wrong: ['By raising every price', 'By skipping documents', 'By ignoring suppliers'], explanation: 'Coordination creates value. Review Chapter 1.' },
  { chapter: '1', objective: 'Recognise product differences', question: 'What can make the chain differ between products?', application: 'A pharmacy sells prescription, OTC and non-medicine products. Is one route enough?', correct: 'The route varies by product category and market, especially between prescription, OTC and non-medicine products', wrong: ['All products follow one route', 'Only price decides the route', 'Only the store size decides the route'], explanation: 'Categories differ. Review Chapter 1.' },
  { chapter: '2', objective: 'State interdependence', question: 'Why is pharmacy retail described as an interdependent ecosystem?', application: 'A pharmacy cannot get a key medicine because of a supplier issue. What does it show?', correct: 'Retail performance depends on upstream and distribution partners’ reliability and compliance as well as the pharmacy’s own capabilities', wrong: ['Retail depends only on the pharmacy', 'Suppliers do not matter', 'Regulators have no role'], explanation: 'Retail depends on partners. Review Chapter 2.' },
  { chapter: '2', objective: 'Match roles', question: 'Which participant oversees licensing, product authorisation and compliance?', application: 'A pharmacy asks who sets the rules. Which participant is it?', correct: 'Regulatory authorities', wrong: ['Consumers', 'Logistics providers', 'Wholesalers'], explanation: 'Regulators oversee rules. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Vietnam limits', question: 'What limit applies to foreign pharmaceutical and logistics firms in Vietnam distribution?', application: 'A foreign maker wants to sell to pharmacies directly. What is the rule?', correct: 'They are not allowed to distribute directly and must sell to licensed domestic distributors', wrong: ['They may sell to anyone', 'They may sell only to consumers', 'They need no licence'], explanation: 'Distribution is through licensed domestic distributors. Review Chapter 2.' },
  { chapter: '3', objective: 'Name the three flows', question: 'Which three flows connect the pharmacy value chain?', application: 'A pharmacy tracks only stock. What else must it track?', correct: 'Product, information and financial flows', wrong: ['Only product flows', 'Only financial flows', 'Only marketing flows'], explanation: 'Three flows work together. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain why alignment matters', question: 'Why must product, information and financial flows stay aligned?', application: 'Records and stock disagree after a delivery. What risk follows?', correct: 'Alignment keeps products traceable and reduces errors, shortages and compliance problems', wrong: ['Alignment has no effect', 'Only money matters', 'Only stock matters'], explanation: 'Traceability protects safety and cash. Review Chapter 3.' },
  { chapter: '4', objective: 'State where controls apply', question: 'Where do regulatory and quality controls apply?', application: 'A buyer assumes only the pharmacy counter is regulated. Is that right?', correct: 'Across the whole chain, from manufacturing to retail and post-market monitoring', wrong: ['Only at the till', 'Only at the factory', 'Only for online sales'], explanation: 'Compliance is cross-chain. Review Chapter 4.' },
  { chapter: '4', objective: 'Describe the risk of weak controls', question: 'What can weak controls at one stage do?', application: 'A distributor stores products badly. What can happen to the pharmacy?', correct: 'Undermine product integrity, disrupt supply and expose downstream retailers to operational and reputational risk', wrong: ['Nothing downstream', 'Improve availability', 'Remove the need for checks'], explanation: 'Risks travel downstream. Review Chapter 4.' },
]);

export const LESSON_P2_1: PharmacyM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the pharmacy retail value chain, name its key participants, explain the three flows that connect it and see why compliance controls run across every stage.',
    keyTakeaways: [
      'The chain runs from manufacturing and authorisation through wholesale to retail and follow-up.',
      'Participants are interdependent, so retail availability depends on upstream reliability.',
      'Product, information and financial flows must stay aligned and traceable.',
      'Regulatory and quality controls apply at every stage, not just at the counter.',
      'Retailers create value by coordinating the chain, not by simply passing products on.',
    ],
    businessImplications: 'Assess suppliers and partners as part of your own capability, keep traceable records for every flow, and treat compliance as a chain-wide discipline.',
    remember: 'A pharmacy is only as reliable as the chain behind it.',
    nextLesson: 'Sourcing & Supplier Partnerships',
  },
};
