import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '2. Products, Services & Segmentation';

const deck = [
  p3Chapter({
    title: 'Prescription Medicines and Over-the-Counter Medicines', chapterTitle: LESSON, readingTime: '6',
    objective: 'Distinguish prescription from OTC medicines and explain how each affects assortment, staffing and guidance.',
    mateIntro: 'Medicines are the heart of a pharmacy, but a prescription medicine and a cough remedy are sold under very different rules.',
    keyInsight: 'Medicine retail requires a balance between commercial availability and responsible dispensing. The objective is not simply to maximize medicine sales, but to ensure that customers receive appropriate products through compliant and safe processes.',
    statTiles: [
      { value: '6', label: 'Key medicine activities', subtitle: 'Prescription management to availability monitoring', description: 'Prescription medicine management, OTC assortment planning, product classification, stock and expiry control, customer guidance and availability monitoring.' },
      { value: '23.4%', label: 'OTC share of Vietnam pharma sales, 2025 forecast', subtitle: 'About US$1.8 billion', description: 'A research forecast reported by Vietnam Investment Review.' },
      { value: '~60–70%', label: 'Approximate share of medicines in Long Chau’s sales', subtitle: 'Broker report, approximate', description: 'The rest is mainly supplements and other products.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the OTC figure is a forecast and the Long Chau mix is a broker’s approximate description, not an audited breakdown.',
    narrative: [
      { label: 'What it is', text: 'Medicines are the core product category in pharmacy retail, divided into categories with different dispensing requirements and customer behaviour. Prescription medicines are supplied under prescription and dispensing rules, while OTC medicines can be supplied without a prescription where permitted. Both need suitable selection, storage, quality control and accurate information. Prescription demand is often linked to consultations and ongoing treatment, OTC demand to common symptoms and immediate needs, which affects assortment, inventory planning, staff duties and the guidance needed at the counter.' },
      { label: 'Why it is happening', text: 'A prescription is a doctor’s decision with legal conditions, while an OTC purchase is a customer’s own choice that often needs advice. Mixing them up would create safety and compliance risk, so retailers set separate processes.' },
      { label: 'Real-world example', text: 'A pharmacy keeps prescribed treatments available, checks prescription requirements and follows dispensing procedures; stocks OTC products for pain, allergy, cough and cold and digestive complaints; separates prescription from non-prescription products; monitors batches, dates and storage; explains approved instructions within the pharmacist’s scope; and tracks frequent requests and recurring shortages.' },
      { label: 'Vietnam example', text: 'A research forecast reported by VIR puts OTC sales at about US$1.8 billion in 2025, or 23.4% of pharma sales. A broker report says Long Châu emphasises prescription drugs and a diversified portfolio, helps customers check drug origin amid counterfeits, and has signed partnerships with Abbott and Novo Nordisk, and an analyst report describes medicines as roughly 60 to 70% of its sales. Prescription medicines generally cannot be sold online under the amended law.' },
      { label: 'Business impact', text: 'Prescription and OTC medicines form the foundation of pharmacy retail but require different dispensing controls. Effective assortment planning must combine customer demand, reliable availability, appropriate professional oversight, and regulatory compliance.' },
    ],
    visualKind: 'pharmacy-m3-21-medicines', visualHeading: 'Medicine groups by dispensing control and purchase frequency',
    visualIntro: 'See where six medicine groups sit between lower and higher dispensing control and occasional and frequent purchase.',
    imageAlt: 'Casemate matrix placing six medicine groups by dispensing control and purchase frequency',
    keyTerms: [
      { term: 'Prescription medicine', definition: 'A medicine supplied only under a valid prescription and the dispensing rules.' },
      { term: 'OTC medicine', definition: 'A medicine that may be supplied without a prescription where permitted.' },
      { term: 'Product classification', definition: 'The legal category that sets how a product may be sold.' },
      { term: 'Availability monitoring', definition: 'Tracking frequently requested medicines and recurring shortages.' },
    ],
    recap: [
      'Medicines are the core category, split into prescription and OTC.',
      'Prescription demand links to consultations and ongoing treatment; OTC to common symptoms.',
      'The two need different dispensing controls and guidance.',
      'The goal is appropriate products through compliant, safe processes.',
    ],
    chapterRecap: 'Prescription and OTC medicines form the foundation of pharmacy retail but require different dispensing controls. Effective assortment planning must combine customer demand, reliable availability, appropriate professional oversight, and regulatory compliance.',
    deepDiveTitle: 'Why a stockout of a prescription medicine costs more than a lost sale',
    body: <P3DeepDive paragraphs={[
      'A patient who cannot fill a prescription may have to travel, delay treatment or go to another pharmacy, and that pharmacy may keep the customer. The cost is trust as well as revenue.',
      'That is why pharmacies track which prescription products are asked for most and protect their availability before trimming range elsewhere.' ]} evidence="The six activities are described qualitatively in the supplied material. OTC figures are a research forecast reported by Vietnam Investment Review, Long Chau statements are from broker reports and the online rule is from a Drug Administration dispatch; none is an audited market measure." />,
    sources: citeP3('virChains', 'acbsFrt', 'frtReport2026', 'rongvietFrt', 'dav1136'),
  }),
  p3Chapter({
    title: 'Consumer Healthcare, Supplements and Medical Devices', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how non-medicine categories broaden a pharmacy and what quality and communication controls they need.',
    mateIntro: 'Vitamins, thermometers and baby products fill a pharmacy too. They add convenience and revenue, and they add risk if claims or quality slip.',
    keyInsight: 'Non-medicine products can diversify revenue and increase customer convenience, but an expanding assortment also creates greater inventory and product-information complexity. Category growth should be supported by product quality, appropriate claims, and clear differentiation between healthcare products and medicines.',
    statTiles: [
      { value: '6', label: 'Key consumer-healthcare activities', subtitle: 'Supplements to responsible cross-selling', description: 'Vitamins and supplements, medical devices, personal and family care, category management, supplier and quality checks and responsible cross-selling.' },
      { value: '>1,500', label: 'Items in the Long Chau Plus pharmacy and convenience format', subtitle: 'Analyst description', description: 'A wider range of supplements, personal care and mother-and-baby goods than a standard store.' },
      { value: '2015', label: 'Year Pharmacity launched its private-label range', subtitle: 'Third-party profile', description: 'Now described as hundreds of products across supplements, personal care and convenience goods.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are an analyst and a third-party profile, and sources disagree on which category earns the higher margin, so no category margin is stated.',
    narrative: [
      { label: 'What it is', text: 'Besides medicines, pharmacies sell vitamins, dietary supplements, personal care and hygiene items and medical devices. These categories meet broader household needs and offer chances to serve customers who come for prevention, self-care or routine purchases. They differ in purchase frequency, margin, storage and information needs: supplements need careful explanation of intended use and limits, medical devices need operating instructions, and promotional claims must stay consistent with the rules.' },
      { label: 'Why it is happening', text: 'Customers want to buy health-related items in one trusted place, and retailers want baskets that include more than medicines. But each added category brings more products, more supplier checks and more claims to control.' },
      { label: 'Real-world example', text: 'A pharmacy manages supplement ranges by demand, supplier reliability, quality and accurate information; stocks thermometers, blood-pressure monitors, glucose meters and wound care; offers eligible skincare, oral care, hygiene, maternal and baby products; organises products by need, frequency, shelf space and turnover; verifies sourcing, documents, packaging and registration; and recommends complementary products only when relevant.' },
      { label: 'Vietnam example', text: 'Long Châu has opened Long Châu Plus, a pharmacy and convenience format with more than 1,500 items and a wider range of supplements, personal care and mother-and-baby products, and analysts expect such categories to lift margins. Pharmacity has run a private-label range since 2015 and signed partnerships with Nestlé Health Science in August 2025 and Biocodex in December 2025. A 2021 report found medicines and health products were over 50% of sales at Long Châu and An Khang but only 27 to 40% at Pharmacity.' },
      { label: 'Business impact', text: 'Consumer healthcare products, supplements, and medical devices broaden the pharmacy’s role beyond medicine dispensing. Effective category management improves convenience and commercial performance while preserving product quality and responsible communication.' },
    ],
    visualKind: 'pharmacy-m3-22-consumer', visualHeading: 'Six non-medicine activities in a pharmacy',
    visualIntro: 'See six non-medicine activities around consumer healthcare and what each checks.',
    imageAlt: 'Casemate orbit mind map of six non-medicine activities in a pharmacy',
    keyTerms: [
      { term: 'Category management', definition: 'Organising products by customer need, frequency, shelf space and contribution.' },
      { term: 'Private label', definition: 'Products sold under the retailer’s own brand.' },
      { term: 'Cross-selling', definition: 'Recommending complementary products alongside a purchase.' },
      { term: 'Unsupported claim', definition: 'A statement of benefit not backed by evidence or permitted by the rules.' },
    ],
    recap: [
      'Pharmacies also sell vitamins, supplements, personal care and medical devices.',
      'These categories add convenience and revenue.',
      'They also add inventory and information complexity.',
      'Growth should rest on quality, appropriate claims and clear separation from medicines.',
    ],
    chapterRecap: 'Consumer healthcare products, supplements, and medical devices broaden the pharmacy’s role beyond medicine dispensing. Effective category management improves convenience and commercial performance while preserving product quality and responsible communication.',
    deepDiveTitle: 'Why a wider range can reduce profit if it is not managed',
    body: <P3DeepDive paragraphs={[
      'Each added product needs shelf space, stock cash and staff knowledge. If it sells slowly or expires, it costs more than it earns, even if its gross margin looks attractive.',
      'Category reviews that compare sales, margin, turnover and expiry exposure help retailers prune lines that do not pay their way.' ]} evidence="The six activities are described qualitatively in the supplied material. Format and partnership details are from an independent analysis, a market research report and a third-party profile; the sales mix is from a 2021 market report and is historical." />,
    sources: citeP3('kennoLongChau', 'aktaPharmacity', 'techsciEpharmacy', 'vietbiz2021'),
  }),
  p3Chapter({
    title: 'Pharmacy Services and Professional Consultation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe pharmacy services and the limits that keep professional consultation safe and trusted.',
    mateIntro: 'A pharmacist’s explanation is part of what customers receive. It builds trust only when it is accurate and stays inside what a pharmacist is allowed to do.',
    keyInsight: 'Professional services distinguish pharmacy retail from ordinary consumer retail. Trust is built when the pharmacy provides accurate, understandable, and appropriately limited guidance rather than focusing solely on transactions.',
    statTiles: [
      { value: '7', label: 'Key service activities', subtitle: 'Dispensing guidance to service quality management', description: 'Dispensing guidance, medication-use support, adherence assistance, product education, health monitoring, referral and service quality management.' },
      { value: '18,000+', label: 'Pharmacists the company reported at Long Chau, July 2025', subtitle: 'Across 2,222 pharmacies', description: 'A company statement of the size of its professional workforce.' },
      { value: '3.41', label: 'Pharmacists per 10,000 people in Vietnam in 2016 data', subtitle: 'Target of 4.0 for 2025–2030', description: 'Shows that professional capacity is a national constraint.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the workforce number is a company statement and the density is an older journal-reported figure, so neither measures service quality.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy services create value by helping customers understand and use healthcare products appropriately. Depending on capabilities and rules, they may include dispensing support, medication-use guidance, adherence assistance, product education and selected health monitoring. Their scope varies by place, operator, staffing and authorisation. Consultation matters when customers ask about dosage, side effects, storage, interactions or safe use of several medicines, and pharmacists must refer customers when a question needs diagnosis, treatment decisions or assessment beyond their scope.' },
      { label: 'Why it is happening', text: 'Many customers use the pharmacy as the first and most accessible point of advice. That access is valuable, but it only works if pharmacists are trained, have time to talk and know when to refer.' },
      { label: 'Real-world example', text: 'A pharmacist explains prescribed instructions and precautions; helps customers understand labels and storage; supports organising repeat purchases where appropriate; explains the correct use of eligible devices; offers selected measurements only where equipped, staffed and authorised; directs customers to a physician when symptoms or reactions need assessment; and trains staff and reviews feedback.' },
      { label: 'Vietnam example', text: 'FPT Long Châu told press in July 2025 that it had more than 18,000 pharmacists across 2,222 pharmacies and ran training with partners such as Organon for them, and said pharmacists earn about VND 12 million a month on average. A journal article reports 3.41 pharmacists per 10,000 people in Vietnam in 2016 data against a 2025–2030 target of 4.0, and Circular 11/2025/TT-BYT requires online sellers to consult buyers before selling and to keep records for 24 months.' },
      { label: 'Business impact', text: 'Pharmacy services contribute to customer trust, safe product use, and long-term relationships. Their value depends on staff competence, clear service boundaries, and consistent professional standards.' },
    ],
    visualKind: 'pharmacy-m3-23-services', visualHeading: 'Seven pharmacy services and what each needs',
    visualIntro: 'See seven pharmacy services as cards and what each needs.',
    imageAlt: 'Casemate cards showing seven pharmacy services and what each needs',
    keyTerms: [
      { term: 'Adherence', definition: 'How consistently patients follow their treatment instructions.' },
      { term: 'Professional scope', definition: 'The activities a pharmacist is authorised and trained to perform.' },
      { term: 'Referral', definition: 'Directing a customer to another healthcare professional.' },
      { term: 'Health-monitoring service', definition: 'A measurement or screening a pharmacy may offer where authorised.' },
    ],
    recap: [
      'Services help customers understand and use products appropriately.',
      'Scope varies by location, operator, staffing and authorisation.',
      'Pharmacists must refer when questions go beyond their scope.',
      'Trust comes from accurate, understandable and appropriately limited guidance.',
    ],
    chapterRecap: 'Pharmacy services contribute to customer trust, safe product use, and long-term relationships. Their value depends on staff competence, clear service boundaries, and consistent professional standards.',
    deepDiveTitle: 'Why time at the counter is a cost and an investment',
    body: <P3DeepDive paragraphs={[
      'Good consultation takes pharmacist time, which is limited and costs money. In a busy store, long conversations can push up waiting times and tempt staff to shorten advice.',
      'Chains handle this with training, scripts and rosters; independents rely on experience. Either way, protecting consultation time is a deliberate choice, not an accident.' ]} evidence="The seven service activities are described qualitatively in the supplied material. Workforce figures are company statements reported in the press and a journal article citing 2016 data; the consultation rule is from the English text of Circular 11/2025/TT-BYT." />,
    sources: citeP3('vietnamnetLongChau', 'vnexpressRecruit', 'pensoftPharmacists', 'circular11'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l2', [
  { chapter: '1', objective: 'State the medicine balance', question: 'What does medicine retail need to balance?', application: 'A manager sets a target to maximise medicine sales. What is the better aim?', correct: 'Commercial availability with responsible dispensing, so customers receive appropriate products through compliant, safe processes', wrong: ['Only maximum sales', 'Only lowest price', 'Only fast service'], explanation: 'The aim is appropriate supply. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate Rx and OTC', question: 'How do prescription and OTC demand differ?', application: 'A planner uses one rule for both. What is missing?', correct: 'Prescription demand links to consultations and ongoing treatment, while OTC demand links to common symptoms and immediate needs', wrong: ['They are identical', 'Both need no guidance', 'OTC always needs a prescription'], explanation: 'Different drivers need different controls. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the online rule for prescriptions', question: 'Can prescription medicines generally be sold online in Vietnam under the amended law?', application: 'A pharmacy wants to list prescription medicines in its app. What applies?', correct: 'No, apart from a narrow outbreak-isolation exception', wrong: ['Yes, always', 'Yes, with a coupon', 'Yes, on social media'], explanation: 'Online scope is product-specific. Review Chapter 1.' },
  { chapter: '2', objective: 'State the benefit and cost of non-medicine', question: 'What do non-medicine products add to a pharmacy?', application: 'A pharmacy adds supplements and devices. What changes?', correct: 'More revenue and convenience, with more inventory and information complexity', wrong: ['No change', 'Only lower costs', 'Exemption from claims rules'], explanation: 'Breadth brings both. Review Chapter 2.' },
  { chapter: '2', objective: 'State the growth condition', question: 'What should category growth be supported by?', application: 'A retailer wants to grow supplements fast. What must support it?', correct: 'Product quality, appropriate claims and clear differentiation from medicines', wrong: ['Larger discounts only', 'Fewer supplier checks', 'Stronger health claims'], explanation: 'Quality and claims matter. Review Chapter 2.' },
  { chapter: '2', objective: 'Define responsible cross-selling', question: 'What is responsible cross-selling?', application: 'A pharmacist suggests an add-on. When is it appropriate?', correct: 'Recommending complementary products only when relevant, without implying unsupported medical benefits', wrong: ['Adding items to every sale', 'Promising cures', 'Ignoring existing treatment'], explanation: 'Relevance and honesty matter. Review Chapter 2.' },
  { chapter: '3', objective: 'State what distinguishes pharmacy', question: 'What distinguishes pharmacy retail from ordinary consumer retail?', application: 'A manager says pharmacy is just a shop. What is missing?', correct: 'Professional services', wrong: ['Larger signs', 'Longer receipts', 'Only lower prices'], explanation: 'Services build trust. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe the limit of guidance', question: 'What must pharmacists do when a question needs diagnosis or treatment decisions?', application: 'A customer describes worrying symptoms. What is the right step?', correct: 'Refer the customer to a physician or other qualified professional', wrong: ['Diagnose and treat', 'Ignore the question', 'Sell more products'], explanation: 'Know the limits of scope. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall service conditions', question: 'When may a pharmacy offer health-monitoring services?', application: 'A store wants to offer screening. What conditions apply?', correct: 'Only where appropriately equipped, staffed and authorised', wrong: ['Always', 'Never', 'Only if free'], explanation: 'Services need authorisation. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the capacity constraint', question: 'What does the pharmacist-density figure for Vietnam indicate?', application: 'Chains plan rapid expansion. What constraint appears?', correct: 'Professional capacity is limited, with a target of 4.0 per 10,000 people for 2025–2030', wrong: ['There is an oversupply', 'Pharmacists are unnecessary', 'It measures service quality'], explanation: 'Staffing limits growth. Review Chapter 3.' },
]);

export const LESSON_P3_2: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can distinguish prescription from OTC medicines, manage consumer healthcare categories responsibly, and describe pharmacy services and their professional limits.',
    keyTakeaways: [
      'Medicine retail balances availability with responsible dispensing.',
      'Prescription and OTC medicines need different controls and guidance.',
      'Non-medicine products add revenue but also complexity and claims risk.',
      'Professional services distinguish pharmacy from ordinary retail.',
      'Guidance must stay accurate, understandable and within scope.',
    ],
    businessImplications: 'Plan assortment by category, protect the availability of critical medicines, control claims on non-medicine lines and invest in consultation capacity and referral practice.',
    remember: 'The product is only half of what a pharmacy sells.',
    nextLesson: 'Customer Segments & Needs',
  },
};
