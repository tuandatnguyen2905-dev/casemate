import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '1. Industry Business Models';

const deck = [
  p3Chapter({
    title: 'Independent Pharmacies vs. Pharmacy Chains', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare independent pharmacies with chains and explain why both must keep professional standards and compliance.',
    mateIntro: 'A neighbourhood pharmacist who knows every customer and a national chain with thousands of stores sell similar medicines, yet they run very different businesses.',
    keyInsight: 'The core distinction is local flexibility versus operational scale. Independent pharmacies can build trust through personal relationships, whereas chains can use purchasing power, standardized procedures, and network-wide data to improve consistency and efficiency. Both models must maintain appropriate professional standards and regulatory compliance.',
    statTiles: [
      { value: '5', label: 'Key model activities', subtitle: 'Ownership to Vietnam examples', description: 'Ownership and management, procurement, customer relationships, operational standardisation and Vietnam market examples.' },
      { value: '~85%', label: 'Share of Vietnam’s market held by independents in a trade estimate', subtitle: 'More than 60,000 outlets', description: 'Reported by Vietnam Investment Review; definitions vary by source.' },
      { value: 'VND 1.2B vs 550M', label: 'Average monthly revenue per store in 2025', subtitle: 'Long Chau versus An Khang', description: 'Company and press averages with different definitions, so not a like-for-like comparison.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the share is a trade-press estimate and the store averages come from different publications, so they show scale differences only roughly.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail runs through independent pharmacies and organised chains. Independents usually serve a local community, with purchasing, range and service decided in the store; their strengths are convenient neighbourhood sites, familiar relationships with repeat customers and flexibility to respond to local demand. Chains run multiple outlets under one brand and management, coordinating procurement, standardising operations, using integrated inventory systems and investing in marketing and training across the network.' },
      { label: 'Why it is happening', text: 'Medicine is both a local trust purchase and a regulated, stock-heavy business. Local ties win customers who value familiarity, while scale lowers the cost of buying, systems and compliance per store, so each model grows where its strength matters most.' },
      { label: 'Real-world example', text: 'Independent stores are managed by individual owners or small operators and rely on local supplier relationships and personal familiarity; chains use central management and reporting, consolidate demand across outlets, apply loyalty programmes and service standards, and use common procedures for layouts, inventory, training and service.' },
      { label: 'Vietnam example', text: 'Long Châu, Pharmacity and An Khang illustrate organised retail, while independents remain important across residential neighbourhoods and smaller markets; Vietnam Investment Review reports over 60,000 private pharmacies and about 85% of the market. Long Châu reported average revenue of about VND 1.2 billion per store per month in 2025 and 2,417 pharmacies, while An Khang averaged about VND 550 million and still lost VND 112.96 billion.' },
      { label: 'Business impact', text: 'Independent pharmacies and retail chains serve overlapping customer needs through different operating structures. Local relationships and flexibility can support independent outlets, while scale and standardization can benefit chains. Competitive performance depends on how effectively each model combines accessibility, product availability, professional service, and cost control.' },
    ],
    visualKind: 'pharmacy-m3-11-models', visualHeading: 'Independent pharmacies versus pharmacy chains',
    visualIntro: 'Compare the two models across ownership, procurement, relationships, standardisation and Vietnam examples.',
    imageAlt: 'Casemate comparison of independent pharmacies and pharmacy chains',
    keyTerms: [
      { term: 'Independent pharmacy', definition: 'A locally owned outlet that is not part of a multi-store chain.' },
      { term: 'Pharmacy chain', definition: 'Many outlets under one brand and management structure.' },
      { term: 'Operational standardisation', definition: 'Using common procedures for layout, inventory, training and service.' },
      { term: 'Loyalty programme', definition: 'A scheme that rewards repeat customers under stated terms.' },
    ],
    recap: [
      'Independents rely on local relationships and flexibility.',
      'Chains rely on central management, scale and standard systems.',
      'Procurement and customer relationships differ by model.',
      'Both must keep professional standards and comply with the rules.',
    ],
    chapterRecap: 'Independent pharmacies and retail chains serve overlapping customer needs through different operating structures. Local relationships and flexibility can support independent outlets, while scale and standardization can benefit chains. Competitive performance depends on how effectively each model combines accessibility, product availability, professional service, and cost control.',
    deepDiveTitle: 'Why neither model is automatically better',
    body: <P3DeepDive paragraphs={[
      'A chain can negotiate and systemise but may feel impersonal and carries heavy fixed cost. An independent is flexible and trusted but may lack buying power and formal systems. Which wins depends on the neighbourhood, the product and the customer.',
      'That is why chains and independents coexist, and why even leading chains test formats and adjust their networks.' ]} evidence="The five activities are described qualitatively in the supplied material. Market share is from Vietnam Investment Review, and store averages are from Vietnamese financial news and a broker report; they use different definitions and are not like-for-like." />,
    sources: citeP3('virChains', 'longChauAvg2025', 'anKhang2025', 'frtReport2026'),
  }),
  p3Chapter({
    title: 'Franchise, Partnership and Specialty Pharmacy Models', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe franchise, partnership and specialty models and the requirements that keep them compliant.',
    mateIntro: 'A pharmacy can stand out by sharing a brand, partnering with others, or focusing on one kind of customer need, rather than only by opening more stores.',
    keyInsight: 'Alternative business models allow pharmacies to differentiate themselves without relying exclusively on store count. However, commercial partnerships and specialization do not remove the need for appropriate licensing, professional accountability, and product-specific controls.',
    statTiles: [
      { value: '6', label: 'Key alternative-model activities', subtitle: 'Franchise to operating requirements', description: 'Franchise or licensed brand, strategic partnerships, chronic-care, medical-device and family-health specialisation, and operating requirements.' },
      { value: '500+', label: 'Pharmacies Medi Pharma says operate in its franchise system', subtitle: 'Company claim', description: 'A franchise programme where the partner invests and the company supplies systems, training and marketing.' },
      { value: '230+', label: 'Trung Son Pharma pharmacies when it launched a pharmacy and GS25 model', subtitle: 'Press report', description: 'Shows a chain partnering with a convenience-store brand.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are a company’s own statement and a press report, so they are not independent measures of how widespread these models are.',
    narrative: [
      { label: 'What it is', text: 'Beyond conventional independents and corporate chains, pharmacies may use partnership arrangements or specialise in particular customer needs. Franchise-like structures can support expansion through local operators, and partnerships may link pharmacies with healthcare providers, suppliers or service organisations, with each party’s responsibilities set by contract and the legal framework. Specialty pharmacies organise range and services around specific needs, such as chronic care, medical devices or maternal and infant care, which builds expertise but may need extra training, storage control or inventory.' },
      { label: 'Why it is happening', text: 'Store count is expensive and slow to build, and large chains already dominate generic locations. Franchise, partnership and focus let smaller operators gain brand, supply and know-how or concentrate where they can be best.' },
      { label: 'Real-world example', text: 'Local operators use a shared brand or operating framework where legally and commercially available; pharmacies coordinate with eligible healthcare or service partners without losing professional independence; chronic-care ranges focus on diabetes or cardiovascular needs; device-focused stores emphasise permitted equipment; family-health stores focus on parents and caregivers; and specialised categories need extra knowledge, supplier verification and handling controls.' },
      { label: 'Vietnam example', text: 'Medi Pharma says more than 500 pharmacies operate in its franchise system, with the partner investing while the company provides supply, ERP, training and marketing, and CIRCA publishes tiered partnership packages with exclusive radius protection. Phano started franchising in 2016 and later joined Masan’s WinMart ecosystem, and Trung Son Pharma opened a pharmacy and convenience-store model with GS25. All are company or press statements, and each pharmacy still needs its own licence and responsible pharmacist.' },
      { label: 'Business impact', text: 'Partnership-based and specialty models can create distinct value propositions through shared capabilities or focused expertise. Their viability depends on clear responsibilities, sufficient customer demand, and the ability to maintain appropriate professional and regulatory standards.' },
    ],
    visualKind: 'pharmacy-m3-12-partnership', visualHeading: 'Six building blocks of franchise, partnership and specialty models',
    visualIntro: 'See six building blocks branching from alternative models and what each needs.',
    imageAlt: 'Casemate tree mind map of franchise, partnership and specialty pharmacy model building blocks',
    keyTerms: [
      { term: 'Franchise', definition: 'An arrangement where a local operator uses a brand and operating system under agreed terms.' },
      { term: 'Strategic partnership', definition: 'A coordinated arrangement with another organisation to improve access, referral or supply.' },
      { term: 'Specialty pharmacy', definition: 'A pharmacy focused on particular needs or product categories.' },
      { term: 'Professional independence', definition: 'Keeping prescribing, dispensing and advice free from improper commercial influence.' },
    ],
    recap: [
      'Franchise and licensed-brand models can support expansion through local operators.',
      'Partnerships can improve access, referral or supply if independence is kept.',
      'Specialisation builds expertise but needs training, controls and inventory.',
      'Every outlet still needs licensing and professional accountability.',
    ],
    chapterRecap: 'Partnership-based and specialty models can create distinct value propositions through shared capabilities or focused expertise. Their viability depends on clear responsibilities, sufficient customer demand, and the ability to maintain appropriate professional and regulatory standards.',
    deepDiveTitle: 'What a franchise agreement should make clear in pharmacy',
    body: <P3DeepDive paragraphs={[
      'In pharmacy, a franchised outlet is still a licensed pharmacy with its own responsible pharmacist. The agreement should therefore state who buys stock, who keeps records, who trains staff and who answers to the regulator for each duty.',
      'Blurred responsibilities are the most common weakness: if both parties assume the other handles compliance, gaps appear.' ]} evidence="The six activities are described qualitatively in the supplied material. Franchise and partnership details are company websites and press reports, including a 2021 article on Phano, and are claims rather than audited data; the legal point reflects the licensing rules described in the Official Gazette and IBA summaries." />,
    sources: citeP3('mediPharma', 'circaFranchise', 'vbiPhano', 'vnexpressGs25', 'ibaSurvey'),
  }),
  p3Chapter({
    title: 'Omnichannel and Digital-Enabled Pharmacy Models', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how omnichannel pharmacy models connect digital tools to physical stores within the rules for medicines.',
    mateIntro: 'An app can show products and take orders, but a medicine order still needs stock, a qualified person and the right handling behind it.',
    keyInsight: 'The value of an omnichannel model comes from connecting digital convenience with reliable physical operations and safe dispensing. Digital reach alone is insufficient if inventory information is inaccurate, orders cannot be fulfilled, or the channel does not adequately control regulated transactions.',
    statTiles: [
      { value: '6', label: 'Key omnichannel activities', subtitle: 'Digital discovery to data integration', description: 'Digital product discovery, store-based fulfilment, inventory visibility, customer support, delivery coordination and data integration.' },
      { value: '1 Jul 2025', label: 'Date online retail of eligible OTC medicines became permitted', subtitle: 'Amended Law on Pharmacy', description: 'Prescription medicines remain generally prohibited online.' },
      { value: '24 months', label: 'Minimum time to keep evidence of online consultation', subtitle: 'Circular 11/2025/TT-BYT', description: 'A record of buyer contact and a summary of the guidance given.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are legal summaries and describe the rules, not how many pharmacies sell online.',
    narrative: [
      { label: 'What it is', text: 'Digital-enabled pharmacy retail combines physical outlets with online product discovery, digital customer communication and permitted ordering or fulfilment. Websites and apps help customers find products, get general information, check orders and contact staff, while stores remain central to dispensing, consultation and local fulfilment. Because medicines are not ordinary goods, promotion, ordering, prescription checks, dispensing and delivery must follow the rules for each product category and transaction.' },
      { label: 'Why it is happening', text: 'Digital commerce has raised customer expectations for convenience and responsiveness. But medicines carry risk, so lawmakers limit what may be sold online and require information, consultation and handling controls.' },
      { label: 'Real-world example', text: 'Websites and apps provide searchable catalogues within advertising rules; a physical pharmacy prepares eligible orders; integrated systems show availability; digital channels give order updates while medicine questions go to qualified staff; retailers arrange eligible deliveries with required handling; and sales, stock and service data inform forecasts, subject to privacy rules.' },
      { label: 'Vietnam example', text: 'Since 1 July 2025, eligible OTC medicines may be sold through licensed e-commerce platforms, apps or websites with online ordering, but not prescription, specially controlled or restricted-retail medicines, and not through social media or livestreams. The Drug Administration wrote to Shopee and Meta in April 2025 about illegal medicine sales. Long Châu began offering online purchase with VNeID verification from 1 January 2025 and sells online under the consultation and record-keeping rules.' },
      { label: 'Business impact', text: 'Omnichannel pharmacy retail integrates physical stores, digital tools, and fulfillment processes to improve customer convenience. Its effectiveness depends on accurate information, coordinated inventory, responsible customer communication, and compliance with medicine-specific requirements.' },
    ],
    visualKind: 'pharmacy-m3-13-omnichannel', visualHeading: 'Six links in an omnichannel pharmacy journey',
    visualIntro: 'Follow six links in the journey and what each depends on.',
    imageAlt: 'Casemate step diagram of six links in an omnichannel pharmacy journey',
    keyTerms: [
      { term: 'Omnichannel', definition: 'Connecting stores, websites and apps into one customer experience.' },
      { term: 'Store-based fulfilment', definition: 'Preparing online orders from a physical pharmacy’s stock.' },
      { term: 'Inventory visibility', definition: 'Seeing which products are in stock and where.' },
      { term: 'Regulated transaction', definition: 'A sale whose conditions are set by medicine-specific rules.' },
    ],
    recap: [
      'Digital tools help customers find products, check orders and contact staff.',
      'Physical stores remain central to dispensing, consultation and fulfilment.',
      'Online rules differ by product category and transaction.',
      'Accurate stock and controlled transactions are essential.',
    ],
    chapterRecap: 'Omnichannel pharmacy retail integrates physical stores, digital tools, and fulfillment processes to improve customer convenience. Its effectiveness depends on accurate information, coordinated inventory, responsible customer communication, and compliance with medicine-specific requirements.',
    deepDiveTitle: 'Why the physical store becomes the fulfilment node',
    body: <P3DeepDive paragraphs={[
      'A licensed pharmacy already holds stock, qualified staff and records, so it is the natural place to prepare eligible online orders. That links digital demand to local inventory and keeps dispensing controls in one place.',
      'It also means a stock mismatch between app and shelf directly causes failed orders, so inventory accuracy matters more online than in a purely walk-in store.' ]} evidence="The six activities are described qualitatively in the supplied material. Legal points are from the amended law as quoted in a Drug Administration dispatch, a Ministry of Health notice and the English text of Circular 11/2025/TT-BYT; the VNeID service is from a market research report." />,
    sources: citeP3('dav1136', 'circular11', 'techsciEpharmacy', 'ecomRules'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l1', [
  { chapter: '1', objective: 'State the core distinction', question: 'What is the core distinction between independent pharmacies and chains?', application: 'A founder asks which model is better. What is the real difference?', correct: 'Local flexibility versus operational scale', wrong: ['Only the size of the sign', 'Only whether staff wear uniforms', 'Only the colour of the shelves'], explanation: 'Each model has a different strength. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe chain advantages', question: 'What can chains use that independents often lack?', application: 'A chain negotiates better terms than a single pharmacy. Why?', correct: 'Purchasing power, standard procedures and network-wide data', wrong: ['Exemption from regulation', 'Free stock', 'Ownership of every supplier'], explanation: 'Scale gives chains these tools. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the shared duty', question: 'What must both independents and chains maintain?', application: 'A chain argues it needs fewer controls because it is large. Is that right?', correct: 'Appropriate professional standards and regulatory compliance', wrong: ['Only sales targets', 'Only low prices', 'Nothing special'], explanation: 'Both models are regulated. Review Chapter 1.' },
  { chapter: '2', objective: 'State the purpose of alternative models', question: 'Why do alternative pharmacy models matter?', application: 'A small operator cannot match chain store counts. What can it do?', correct: 'They allow differentiation without relying exclusively on store count', wrong: ['They remove licensing', 'They guarantee profit', 'They replace pharmacists'], explanation: 'Differentiation can come from brand, partnership or focus. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall what is not removed', question: 'What do commercial partnerships and specialisation not remove?', application: 'A pharmacy joins a partner programme. What remains its duty?', correct: 'Licensing, professional accountability and product-specific controls', wrong: ['The need for stock', 'The need for customers', 'The need for a location'], explanation: 'Regulation still applies. Review Chapter 2.' },
  { chapter: '2', objective: 'Define specialty models', question: 'What does a specialty pharmacy do?', application: 'A store focuses on diabetes care. What does that involve?', correct: 'Organises its range and services around specific needs or categories, which may need extra training, controls or inventory', wrong: ['Sells only one brand', 'Avoids qualified staff', 'Ignores regulations'], explanation: 'Focus brings expertise and complexity. Review Chapter 2.' },
  { chapter: '3', objective: 'State where omnichannel value comes from', question: 'Where does omnichannel value come from?', application: 'An app has many users but orders often fail. What is missing?', correct: 'Connecting digital convenience with reliable physical operations and safe dispensing', wrong: ['Digital reach alone', 'More advertising', 'Fewer stores'], explanation: 'Reach is not enough. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall what online sales Vietnam permits', question: 'What may be sold online in Vietnam from 1 July 2025?', application: 'A pharmacy plans its online range. What is allowed?', correct: 'Eligible OTC medicines through licensed platforms, apps or websites, but not prescription, specially controlled or restricted-retail medicines', wrong: ['All medicines', 'Only prescription medicines', 'Any product through social media'], explanation: 'Online scope is product-specific. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the record duty', question: 'How long must evidence of online consultation be kept?', application: 'A pharmacy sells online. How long must it keep consultation records?', correct: 'At least 24 months', wrong: ['One week', 'Never', 'Until the order ships'], explanation: 'Circular 11/2025 sets this duty. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain the fulfilment role of stores', question: 'Why do physical stores remain central in digital pharmacy?', application: 'An online order arrives for an eligible OTC product. Where is it prepared?', correct: 'They hold stock and qualified staff and handle dispensing, consultation and local fulfilment', wrong: ['They are no longer needed', 'They only display ads', 'They only store paperwork'], explanation: 'Stores link digital and physical. Review Chapter 3.' },
]);

export const LESSON_P3_1: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can compare independents with chains, describe franchise, partnership and specialty models, and explain how omnichannel models connect digital tools to physical stores within medicine rules.',
    keyTakeaways: [
      'The core distinction is local flexibility versus operational scale.',
      'Both independents and chains must keep professional standards and compliance.',
      'Franchise, partnership and specialty models differentiate without relying only on store count.',
      'Licensing and professional accountability never transfer to a partner.',
      'Omnichannel value comes from connecting digital convenience with reliable stores and safe dispensing.',
    ],
    businessImplications: 'Choose a model that fits your strengths, define responsibilities clearly in any partnership, and build digital services on accurate stock and controlled transactions.',
    remember: 'Scale and focus both work, but only with compliance behind them.',
    nextLesson: 'Products, Services & Segmentation',
  },
};
