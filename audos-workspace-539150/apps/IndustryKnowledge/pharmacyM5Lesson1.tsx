import { P5DeepDive, citeP5, p5Chapter, p5Quiz } from './pharmacyM5Core';
import type { PharmacyM5LessonBundle } from './pharmacyM5Core';

const LESSON = '1. Consumer Trends';

const deck = [
  p5Chapter({
    title: 'Increasing Healthcare Awareness and Preventive Health Consumption', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how preventive-health interest widens pharmacy demand and why trust limits how far it can grow.',
    mateIntro: 'More customers now think about staying well, not only about treating illness. That opens new products for pharmacies, and new ways to lose trust.',
    keyInsight: 'Preventive healthcare creates opportunities to expand pharmacy product categories, but long-term growth depends on consumer trust and responsible recommendations rather than simply increasing product sales.',
    statTiles: [
      { value: '6', label: 'Key preventive-health activities', subtitle: 'Assortment to trend monitoring', description: 'Preventive assortment, consumer education, wellness category management, responsible recommendations, accessible health information and consumer trend monitoring.' },
      { value: '~75%', label: 'Share of out-of-pocket health spending that went to pharmaceuticals in 2022', subtitle: 'World Bank description', description: 'Shows how much household health spending already flows through medicine purchases.' },
      { value: '~40%', label: 'Share of current health expenditure paid out of pocket', subtitle: 'World Bank', description: 'Households pay a large part of health costs directly, which makes their purchase choices matter.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other two are the World Bank’s own description of household spending and are not shares of pharmacy sales.',
    narrative: [
      { label: 'What it is', text: 'Consumer demand in pharmacy retail is influenced by increasing attention to personal health, preventive care, and everyday wellness. Customers may visit pharmacies not only to obtain medicines for existing conditions, but also to purchase vitamins, supplements, medical devices, and personal care products. This broadens the pharmacy’s role from a medicine-dispensing outlet to a more comprehensive healthcare retail destination.' },
      { label: 'Why it is happening', text: 'In Vietnam, this trend creates opportunities for pharmacies to serve customers seeking convenient access to healthcare products and reliable information. However, consumer interest in wellness products does not necessarily translate into appropriate use. Customers may be influenced by social media, recommendations from acquaintances, or promotional claims, making accurate product information and responsible consultation increasingly important.' },
      { label: 'Real-world example', text: 'A pharmacy offers relevant vitamins, supplements, thermometers and blood-pressure monitors; explains what each product is for and what it cannot do; watches demand by age group so it does not overstock slow movers; avoids claiming that a supplement replaces prescribed treatment; makes instructions and safety information easy to read; and tracks customer questions and sales to spot changing interests.' },
      { label: 'Vietnam example', text: 'The World Bank reports that about 40% of Vietnam’s current health spending is paid out of pocket and that pharmaceuticals were about 75% of out-of-pocket spending in 2022, even though health-insurance coverage is about 91%, so households make many medicine and health-product choices themselves. An independent analyst of Long Châu’s Plus format says supplements and personal care carry higher margins, although other sources disagree on which category earns the most, so margin claims should be read with care.' },
      { label: 'Business impact', text: 'Increasing attention to preventive health can broaden pharmacy retail demand beyond medicines. Retailers can benefit by offering relevant products and trustworthy information while maintaining responsible communication and appropriate product-use guidance.' },
    ],
    visualKind: 'pharmacy-m5-11-preventive', visualHeading: 'Six ways to serve preventive-health demand',
    visualIntro: 'See six activities around the centre and what each one protects.',
    imageAlt: 'Casemate orbit mind map of six ways pharmacies serve preventive health demand',
    keyTerms: [
      { term: 'Preventive healthcare', definition: 'Actions and products aimed at staying healthy and avoiding illness.' },
      { term: 'Wellness category', definition: 'Products such as vitamins, supplements and devices bought for everyday health.' },
      { term: 'Responsible recommendation', definition: 'Advice that avoids unsupported claims and stays within professional scope.' },
      { term: 'Out-of-pocket spending', definition: 'Health costs paid directly by households.' },
    ],
    recap: [
      'Preventive health widens what customers buy from pharmacies.',
      'Interest in wellness does not always mean appropriate use.',
      'Accurate information and responsible advice protect trust.',
      'Stock wellness lines to real demand, not hope.',
    ],
    chapterRecap: 'Increasing attention to preventive health can broaden pharmacy retail demand beyond medicines. Retailers can benefit by offering relevant products and trustworthy information while maintaining responsible communication and appropriate product-use guidance.',
    deepDiveTitle: 'Why overstocking wellness products is a trust problem too',
    body: <P5DeepDive paragraphs={[
      'A range of supplements and devices ties up cash and can expire unsold. The risk is not only financial: a pharmacy under pressure to clear stock may push products harder than a customer needs.',
      'Tracking demand by age group and customer questions helps stock what customers actually ask for, and keeps recommendations tied to need.' ]} evidence="The six activities are described in the supplied material. Spending shares are the World Bank’s description of household health spending, and the margin comment is an independent analyst view that other sources do not confirm." />,
    sources: citeP5('worldBankOop', 'kennoLongChau', 'vietcapTraditional'),
  }),
  p5Chapter({
    title: 'Aging Population and Growth in Chronic Disease Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how ageing and chronic disease create recurring demand and what reliable service for these customers requires.',
    mateIntro: 'Many customers are not buying once. They need the same medicines month after month, and they notice quickly when a pharmacy lets them down.',
    keyInsight: 'The growth of long-term healthcare needs increases the importance of reliable replenishment, continuity of service, and medication-use support. Pharmacies that serve recurring needs consistently can strengthen customer relationships while contributing to safer medicine use.',
    statTiles: [
      { value: '7', label: 'Key activities for recurring-care customers', subtitle: 'Availability to performance monitoring', description: 'Chronic-care availability, repeat-purchase support, medication-use guidance, older-adult accessibility, inventory forecasting, service continuity and performance monitoring.' },
      { value: '14.2M', label: 'People aged 60 and over in Vietnam in 2024', subtitle: 'VietnamPlus', description: 'A large group more likely to need ongoing medicines and help understanding instructions.' },
      { value: '73.7%', label: 'Share of disease burden and deaths from non-communicable diseases', subtitle: 'Ministry of Health figure via Vietnam Social Security', description: 'Shows why long-term conditions drive pharmacy demand.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other two are reported population and health figures, and UNFPA’s medium projection puts people aged 60 and over at 16.53% of the population in 2029.',
    narrative: [
      { label: 'What it is', text: 'Population aging and the long-term management of chronic conditions influence the demand for medicines and pharmacy services. Customers managing conditions such as hypertension, diabetes, and cardiovascular disease may need recurring prescriptions, ongoing medication-use support, and dependable access to healthcare products. Older adults may also need assistance understanding instructions or managing multiple medicines.' },
      { label: 'Why it is happening', text: 'For pharmacy retailers, these needs can create recurring demand and opportunities to improve service continuity. However, serving these customers requires appropriate stock planning, qualified personnel, clear communication, and respect for the boundaries between pharmacy services and medical diagnosis or treatment.' },
      { label: 'Real-world example', text: 'A pharmacy keeps frequently requested medicines in stock, helps customers plan refills in line with prescription rules, explains instructions and refers clinical questions to professionals, makes labels and store navigation easier for older customers, forecasts from recurring demand, keeps support consistent without pushing extra purchases, and tracks availability and satisfaction for these customers.' },
      { label: 'Vietnam example', text: 'VietnamPlus reports 14.2 million people aged 60 and over in 2024, UNFPA’s medium projection reaches 16.53% of the population in 2029, and the Ministry of Health attributes 73.7% of disease burden and deaths to non-communicable diseases. A household survey of families with older members describes chronic conditions and an out-of-pocket burden that can cause financial distress. A peer-reviewed article gives 3.41 pharmacists per 10,000 people in 2016 data against a 2025–2030 target of 4.0, so qualified support is scarce.' },
      { label: 'Business impact', text: 'Aging and chronic disease management are important long-term demand drivers for pharmacy retail. Their commercial and social value depends on reliable supply, appropriate professional support, and consistent service rather than sales volume alone.' },
    ],
    visualKind: 'pharmacy-m5-12-chronic', visualHeading: 'Seven steps to serve a recurring-care customer',
    visualIntro: 'Follow seven steps and see the failure each one prevents.',
    imageAlt: 'Casemate seven-step flow for serving recurring-care pharmacy customers',
    keyTerms: [
      { term: 'Chronic disease', definition: 'A long-term condition such as hypertension or diabetes.' },
      { term: 'Repeat purchase', definition: 'Buying the same medicine again to continue treatment.' },
      { term: 'Service continuity', definition: 'Consistent support from one visit to the next.' },
      { term: 'Medication-use support', definition: 'Explaining instructions while referring clinical questions to professionals.' },
    ],
    recap: [
      'Ageing and chronic disease create recurring demand.',
      'Reliable stock and refills matter more than one-off sales.',
      'Pharmacies support medicine use but do not diagnose or treat.',
      'Older customers need clearer information and navigation.',
    ],
    chapterRecap: 'Aging and chronic disease management are important long-term demand drivers for pharmacy retail. Their commercial and social value depends on reliable supply, appropriate professional support, and consistent service rather than sales volume alone.',
    deepDiveTitle: 'Where pharmacy support ends and medical care begins',
    body: <P5DeepDive paragraphs={[
      'A pharmacist can explain how to take a medicine and when to see a doctor, but cannot change a treatment plan. Staying within that boundary keeps customers safe and protects the pharmacy.',
      'Clear escalation routes for clinical questions are therefore part of good service, not a limit on it.' ]} evidence="The seven activities are described in the supplied material. Population and disease figures are from VietnamPlus, UNFPA projections and a Ministry of Health figure reported by Vietnam Social Security; pharmacist density is from a peer-reviewed article citing national data." />,
    sources: citeP5('vnplusAging', 'unfpaAgeing', 'vssNcd', 'springerElderly', 'pensoftPharmacists'),
  }),
  p5Chapter({
    title: 'Demand for Convenience, Personalization and Trusted Advice', chapterTitle: LESSON, readingTime: '6',
    objective: 'Show how convenience and personalisation help only when credible professional advice stays at the centre.',
    mateIntro: 'Customers want faster, easier and more tailored service. In health, they also want to know that the person advising them can be trusted.',
    keyInsight: 'The consumer proposition is evolving toward convenient access combined with credible advice. Pharmacy retailers need to improve the customer journey without sacrificing the professional standards that distinguish them from general retailers.',
    statTiles: [
      { value: '7', label: 'Key convenience and advice activities', subtitle: 'Store access to experience measurement', description: 'Convenient store access, faster transactions, digital product discovery, relevant communication, personalised service, professional consultation and customer experience measurement.' },
      { value: '< 2 hours', label: 'Delivery commitment stated by the Long Châu group', subtitle: 'Company-group statement', description: 'A commitment applying to eligible orders, not an independent measure.' },
      { value: '~70%', label: 'Returning-customer rate claimed for Long Châu', subtitle: 'Company-group statement', description: 'Not independently checked.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other two are company-group statements and have not been independently verified.',
    narrative: [
      { label: 'What it is', text: 'Consumers increasingly expect convenient shopping experiences, clear information, and services suited to their individual needs. In pharmacy retail, convenience may mean finding a nearby outlet, checking product availability, receiving efficient service, or using digital channels for eligible transactions. Personalization may involve relevant product information or service reminders, provided that these practices respect privacy and do not replace professional judgment.' },
      { label: 'Why it is happening', text: 'At the same time, healthcare purchases differ from ordinary consumer purchases because customers may need help understanding product suitability, instructions, and precautions. As a result, technology and convenience are most valuable when combined with trustworthy professional support. Customers may use digital tools to research a product but still rely on pharmacists for appropriate guidance.' },
      { label: 'Real-world example', text: 'A pharmacy improves location coverage, opening-hour information and in-store navigation; speeds up checkout and prescription processing while keeping the required checks; gives accurate online product and availability details; sends service reminders only with suitable consent; responds to stated needs without medical assumptions; makes qualified staff available for medicine questions; and tracks satisfaction, waiting time, repeat visits and complaints.' },
      { label: 'Vietnam example', text: 'The Long Châu group states a delivery commitment of under two hours and a returning-customer rate of about 70%, both company claims, and a VNeID-based online purchase service for Long Châu was reported in 2025. Circular 11/2025 requires consultation records for e-commerce sales to be kept, Law 44/2024 limits what can be sold online, and the Personal Data Protection Law, effective 1 January 2026, treats health information as sensitive, so personalised reminders need consent and safeguards.' },
      { label: 'Business impact', text: 'Convenience and personalization are becoming important elements of pharmacy retail, but trust remains fundamental. Retailers that combine accessible services, relevant information, and professional guidance can respond more effectively to changing consumer expectations.' },
    ],
    visualKind: 'pharmacy-m5-13-convenience', visualHeading: 'Convenience gained versus trust required',
    visualIntro: 'Place five features on a matrix of how much convenience they give and how much professional trust they need.',
    imageAlt: 'Casemate matrix of pharmacy service features by convenience gained and professional trust required',
    keyTerms: [
      { term: 'Personalization', definition: 'Tailoring information or reminders to a customer’s stated needs.' },
      { term: 'Consent', definition: 'A customer’s agreement to receive reminders or have data used.' },
      { term: 'Professional consultation', definition: 'Access to qualified staff for medicine-related questions.' },
      { term: 'Customer experience measurement', definition: 'Tracking satisfaction, waiting time, repeat visits and complaints.' },
    ],
    recap: [
      'Customers want convenience, clarity and tailored service.',
      'Personalisation must respect privacy and professional judgement.',
      'Digital tools help research; pharmacists still guide use.',
      'Improve the journey without lowering professional standards.',
    ],
    chapterRecap: 'Convenience and personalization are becoming important elements of pharmacy retail, but trust remains fundamental. Retailers that combine accessible services, relevant information, and professional guidance can respond more effectively to changing consumer expectations.',
    deepDiveTitle: 'Why a reminder can help or harm',
    body: <P5DeepDive paragraphs={[
      'A refill reminder that a customer agreed to can support continuity and safe use. A reminder that implies a condition the customer never told the pharmacy about can feel intrusive and may breach data rules.',
      'Asking for consent, limiting what data is used and keeping messages factual lets personalisation add convenience without losing trust.' ]} evidence="The seven activities are described in the supplied material. Delivery and returning-customer figures are group statements; the online-purchase service is from a market research summary; the legal items are from the Circular 11/2025 text, a summary of Law 44/2024 and the 2025 Personal Data Protection Law." />,
    sources: citeP5('chungtaTouchpoints', 'techsciEpharmacy', 'circular11', 'law44Summary', 'pdplLaw'),
  }),
];

const quiz = p5Quiz('pharmacy-m5-l1', [
  { chapter: '1', objective: 'State the limit on preventive-health growth', question: 'What does long-term growth in preventive health products depend on?', application: 'A pharmacy plans to stock more supplements. What must it protect?', correct: 'Consumer trust and responsible recommendations, not simply more product sales', wrong: ['Maximum stock of every supplement', 'Promotion alone', 'Lower prices only'], explanation: 'Trust sets the limit. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply responsible recommendation', question: 'Which statement should a pharmacy avoid making?', application: 'A customer asks whether a supplement can replace a prescribed medicine. Which answer must the pharmacy not give?', correct: 'That a supplement replaces prescribed treatment', wrong: ['That a product has a stated purpose', 'That instructions should be read', 'That questions can go to a pharmacist'], explanation: 'Unsupported claims harm trust. Review Chapter 1.' },
  { chapter: '1', objective: 'Manage wellness stock', question: 'Why monitor demand by age group in wellness categories?', application: 'A shop holds many slow-moving supplements. What would help?', correct: 'To avoid overstocking slow-moving products', wrong: ['To raise prices', 'To remove all supplements', 'To stop customer questions'], explanation: 'Match stock to demand. Review Chapter 1.' },
  { chapter: '2', objective: 'Explain the value of recurring needs', question: 'What can pharmacies serving recurring needs consistently strengthen?', application: 'A customer collects the same medicine monthly. What does consistent service build?', correct: 'Customer relationships, while contributing to safer medicine use', wrong: ['Only short-term sales', 'Diagnosis of conditions', 'Prescriptions'], explanation: 'Continuity builds trust. Review Chapter 2.' },
  { chapter: '2', objective: 'Respect professional boundaries', question: 'What should pharmacy staff do with clinical questions about treatment?', application: 'A customer asks to change a dose. What is appropriate?', correct: 'Direct them to qualified healthcare professionals', wrong: ['Change the dose', 'Diagnose the condition', 'Ignore the question'], explanation: 'Pharmacy is not diagnosis or treatment. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the ageing figure', question: 'How many people aged 60 and over did VietnamPlus report for 2024?', application: 'A planner sizes the older-customer group. What is the figure?', correct: '14.2 million', wrong: ['1.4 million', '42 million', '4.2 million'], explanation: 'It supports long-term demand. Review Chapter 2.' },
  { chapter: '2', objective: 'Use inventory forecasting', question: 'How can recurring demand patterns help a pharmacy?', application: 'Refill demand is steady. What can the store do?', correct: 'Plan stock levels and reduce avoidable shortages', wrong: ['Stop forecasting', 'Raise every price', 'Reduce all stock'], explanation: 'Forecasting supports availability. Review Chapter 2.' },
  { chapter: '3', objective: 'State the evolving proposition', question: 'What combination is the consumer proposition evolving toward?', application: 'A chain improves its app. What must it keep?', correct: 'Convenient access combined with credible advice', wrong: ['Speed alone', 'Discounts alone', 'Technology alone'], explanation: 'Advice distinguishes pharmacies. Review Chapter 3.' },
  { chapter: '3', objective: 'Treat a company claim carefully', question: 'How should the claim that about 70% of Long Châu customers return be read?', application: 'A slide quotes the figure. What should be noted?', correct: 'As a company-group statement that has not been independently checked', wrong: ['As an audited fact', 'As a government statistic', 'As a global average'], explanation: 'Source type matters. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply data protection to reminders', question: 'What do personalised service reminders need?', application: 'A pharmacy plans refill reminders. What must be in place?', correct: 'Suitable consent and data safeguards', wrong: ['Nothing', 'A medical diagnosis', 'Unlimited data sharing'], explanation: 'Health information is sensitive. Review Chapter 3.' },
]);

export const LESSON_P5_1: PharmacyM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how preventive health, ageing and chronic disease, and demand for convenience and advice are changing pharmacy retail, and what limits each trend.',
    keyTakeaways: [
      'Preventive health widens pharmacy demand, but trust limits growth.',
      'Ageing and chronic disease create recurring needs that reward reliable service.',
      'Pharmacies support medicine use; they do not diagnose or treat.',
      'Convenience and personalisation work best with credible advice.',
      'Consent and data safeguards make personalisation acceptable.',
    ],
    businessImplications: 'Stock to real demand, keep recommendations responsible, and improve convenience without lowering professional standards.',
    remember: 'Convenience wins visits; trust wins customers.',
    nextLesson: 'Technology & Innovation Trends',
  },
};
