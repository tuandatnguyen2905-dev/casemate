import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '3. Customer Segments & Needs';

const deck = [
  p3Chapter({
    title: 'Chronic Disease Patients and Repeat-Purchase Customers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what chronic-care customers need from a pharmacy and why repeat purchase is not guaranteed loyalty.',
    mateIntro: 'People who manage a long-term condition come back again and again. What they want is not a discount but a pharmacy that always has their medicine and handles it well.',
    keyInsight: 'Chronic-care customers value continuity, reliability, and confidence in medicine handling. Pharmacies that consistently meet these needs can build durable relationships, provided that commercial retention activities do not interfere with clinical decisions or encourage unnecessary purchases.',
    statTiles: [
      { value: '6', label: 'Key chronic-care activities', subtitle: 'Repeat-purchase planning to retention measurement', description: 'Repeat-purchase planning, medicine availability, treatment-related guidance, customer records, service consistency and retention measurement.' },
      { value: '73.7%', label: 'Share of Vietnam’s disease burden and deaths from non-communicable diseases', subtitle: 'Ministry of Health figure', description: 'Shows the scale of long-term conditions behind recurring medicine demand.' },
      { value: '~7M', label: 'Vietnamese people diagnosed with diabetes', subtitle: 'Market research estimate', description: 'One large chronic group whose treatment depends on regular supply.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the disease burden is an official figure and the diabetes count is a market research estimate, and neither measures pharmacy sales.',
    narrative: [
      { label: 'What it is', text: 'Customers managing chronic conditions often need medicines and healthcare products over long periods, with visits that follow treatment schedules, repeat prescriptions or ongoing monitoring. For them, product availability, continuity of supply, clear instructions and convenient access matter most. The segment can produce recurring demand, but repeat purchasing is not guaranteed loyalty: customers may switch pharmacies because of stock shortages, price, location, service quality or a change in treatment.' },
      { label: 'Why it is happening', text: 'Long-term treatment cannot be interrupted, so a missed refill matters. Customers therefore reward the pharmacy that reliably has their product, and move quickly if it does not.' },
      { label: 'Real-world example', text: 'A pharmacy helps customers identify refill timing in line with prescriptions and instructions; monitors demand for frequently used products and keeps suitable stock; explains product-use instructions and sends clinical questions to the right professional; keeps relevant information lawfully while protecting health data; gives dependable service and clear communication when products are unavailable; and tracks repeat visits, satisfaction and fulfilment reliability.' },
      { label: 'Vietnam example', text: 'The Ministry of Health says non-communicable diseases cause up to 73.7% of Vietnam’s disease burden and deaths, and market research counts about seven million people with diabetes. Circular 26/2025/TT-BYT on outpatient prescribing aims to make drug use convenient for chronic patients, and under Circular 11/2025/TT-BYT a pharmacy selling on an e-prescription may not sell more than the prescribed quantity or sell on an expired prescription. A survey found older people had on average three chronic conditions.' },
      { label: 'Business impact', text: 'Chronic-care customers need reliable access and consistent support over time. Pharmacy retailers can serve this segment through dependable inventory, responsible communication, and convenient repeat purchasing without replacing the role of prescribing healthcare professionals.' },
    ],
    visualKind: 'pharmacy-m3-31-chronic', visualHeading: 'A repeat-purchase journey for chronic-care customers',
    visualIntro: 'Follow six steps in the journey and what each protects.',
    imageAlt: 'Casemate step diagram of six steps in a repeat-purchase journey for chronic-care customers',
    keyTerms: [
      { term: 'Chronic condition', definition: 'A long-lasting health condition that needs ongoing treatment.' },
      { term: 'Repeat purchase', definition: 'A purchase made again at regular intervals.' },
      { term: 'Service continuity', definition: 'Giving the same dependable service across visits.' },
      { term: 'Retention measurement', definition: 'Tracking repeat visits, satisfaction and fulfilment reliability.' },
    ],
    recap: [
      'Chronic-care customers need medicines and products over long periods.',
      'Availability, continuity, clear instructions and convenient access matter most.',
      'Repeat purchasing is not guaranteed loyalty.',
      'Retention activity must not interfere with clinical decisions or promote unnecessary purchases.',
    ],
    chapterRecap: 'Chronic-care customers need reliable access and consistent support over time. Pharmacy retailers can serve this segment through dependable inventory, responsible communication, and convenient repeat purchasing without replacing the role of prescribing healthcare professionals.',
    deepDiveTitle: 'Why refill reminders must be designed with care',
    body: <P3DeepDive paragraphs={[
      'A reminder that helps a customer refill on time supports adherence. A reminder that pushes extra products or ignores a change in treatment can encourage unnecessary purchases and breach trust.',
      'Reminders should be sent with consent, linked to the prescribed schedule and kept free of sales messages that go beyond the customer\u2019s own treatment.' ]} evidence="The six activities are described qualitatively in the supplied material. Disease burden is from the Ministry of Health as reported by Vietnam Social Security, the diabetes estimate is from a market research report, the older-person survey is from a peer-reviewed study and legal points are from the English text of Circular 11/2025/TT-BYT." />,
    sources: citeP3('vssNcd', 'imarcPharma', 'circular26', 'circular11', 'springerElderly'),
  }),
  p3Chapter({
    title: 'Families, Caregivers and Preventive Healthcare Consumers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what families, caregivers and preventive-care customers need and why responsible information matters.',
    mateIntro: 'Parents, adult children and health-conscious shoppers buy for people they care about. They want clear information and honest guidance, not scare tactics.',
    keyInsight: 'These customers value product suitability, understandable information, and reassurance about quality. Effective service depends on helping them make informed choices rather than encouraging purchases through fear, exaggerated benefits, or unnecessary product combinations.',
    statTiles: [
      { value: '6', label: 'Key family and prevention activities', subtitle: 'Family assortment to responsible recommendations', description: 'Family healthcare assortment, age-appropriate guidance, caregiver support, preventive-care education, product quality communication and responsible recommendations.' },
      { value: '14.2M', label: 'People aged 60 and over in Vietnam in 2024', subtitle: 'Nearly 18 million expected by 2030', description: 'Many relatives and caregivers buy for older family members.' },
      { value: '28M', label: 'Customers and families Long Chau says it served by July 2025', subtitle: 'Company claim, about one third of the population', description: 'Illustrates how many households use organised pharmacies.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the population count is a Ministry of Health official’s figure and the customer number is a company claim, so neither is an independent measure of family purchasing.',
    narrative: [
      { label: 'What it is', text: 'Families and caregivers buy medicines and healthcare products for children, older relatives and other dependants, with extra concern about age suitability, instructions, quality and safe storage. Preventive-care consumers look for vitamins, supplements, monitoring devices and other wellness products. Both groups need clear, trustworthy information, but their decisions can also be influenced by advertising, social media, recommendations and misconceptions, so retailers must separate helpful information from unsupported claims about prevention or treatment.' },
      { label: 'Why it is happening', text: 'People buying for someone else feel responsible for the outcome and are cautious. Prevention is a popular but poorly understood area, so customers can be misled by exaggerated promises unless the pharmacy informs them honestly.' },
      { label: 'Real-world example', text: 'A pharmacy provides eligible products for household needs, hygiene and devices; explains usage instructions and precautions and refers complex questions; helps caregivers read labels and storage instructions for dependants; gives accurate information about the intended use and limits of supplements and monitors; makes product information accessible without unsupported claims; and considers the stated need and existing treatment before recommending extras.' },
      { label: 'Vietnam example', text: 'Vietnam had about 14.2 million people aged 60 and over in 2024, with nearly 18 million expected by 2030, and many adult children buy medicines for older parents. FPT Long Châu said in July 2025 that it serves 28 million customers and families, and signed a partnership with Organon that trained more than 18,000 pharmacists on reproductive and women’s health consultation. Law 91/2025/QH15 requires consent for processing health information, which matters when pharmacies keep family purchase records.' },
      { label: 'Business impact', text: 'Families, caregivers, and preventive healthcare consumers seek safe, suitable products and reliable information. Pharmacies can strengthen trust by offering clear guidance, relevant assortments, and responsible recommendations.' },
    ],
    visualKind: 'pharmacy-m3-32-families', visualHeading: 'Six ways to serve families, caregivers and preventive-care customers',
    visualIntro: 'See six practices branching from family and prevention and what each avoids.',
    imageAlt: 'Casemate tree mind map of six ways to serve families, caregivers and preventive-care customers',
    keyTerms: [
      { term: 'Caregiver', definition: 'A person who buys or manages medicines for a dependant.' },
      { term: 'Preventive healthcare', definition: 'Products and habits intended to maintain health and avoid illness.' },
      { term: 'Age-appropriate guidance', definition: 'Advice that reflects the age of the person using the product.' },
      { term: 'Responsible recommendation', definition: 'Advice based on the stated need and existing treatment, without add-ons.' },
    ],
    recap: [
      'Families and caregivers buy for dependants and care about suitability and quality.',
      'Preventive customers seek vitamins, supplements and monitoring devices.',
      'Advertising and misconceptions can distort decisions.',
      'Service should enable informed choices, not fear-based purchases.',
    ],
    chapterRecap: 'Families, caregivers, and preventive healthcare consumers seek safe, suitable products and reliable information. Pharmacies can strengthen trust by offering clear guidance, relevant assortments, and responsible recommendations.',
    deepDiveTitle: 'How to explain a supplement honestly',
    body: <P3DeepDive paragraphs={[
      'Say what the product is intended for, what it does not do and when to see a doctor instead. Avoid wording that suggests it prevents or treats a disease unless the product is authorised to make that claim.',
      'A short written summary the customer can take home helps caregivers who are buying for someone else and cannot ask every question in the store.' ]} evidence="The six activities are described qualitatively in the supplied material. Population figures are from VietnamPlus, the customer number and partnership are company statements reported by VietnamNet, and the data-protection point is from the English text of Law 91/2025/QH15." />,
    sources: citeP3('vnplusAging', 'vietnamnetLongChau', 'pdplLaw'),
  }),
  p3Chapter({
    title: 'Price-Sensitive, Convenience-Oriented and Digitally Engaged Customers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how price, convenience and digital preferences overlap and how retailers should respond.',
    mateIntro: 'The same person can compare prices online, buy from the nearest store and still want a pharmacist’s opinion. Customers do not fit one box.',
    keyInsight: 'Customer convenience is multidimensional: price, location, speed, availability, and confidence in the pharmacy all influence purchasing decisions. Competing on price alone can weaken margins, while convenience without reliable fulfillment may fail to create loyalty.',
    statTiles: [
      { value: '6', label: 'Key customer-experience activities', subtitle: 'Price transparency to feedback analysis', description: 'Price transparency, location and opening hours, efficient service, digital product discovery, customer support integration and feedback analysis.' },
      { value: '~70%', label: 'Returning-customer rate FPT Retail says Long Chau achieves', subtitle: 'Company group claim', description: 'A company statement, not an independent loyalty measure.' },
      { value: '< 2 h', label: 'Delivery time Long Chau commits to', subtitle: 'Most urban orders under 1 hour per the group', description: 'A company service commitment.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are company-group statements and are not independent measures of loyalty or delivery performance.',
    narrative: [
      { label: 'What it is', text: 'Customers balance affordability, convenience and service quality differently. Price-sensitive customers compare prices and look for suitable lower-cost alternatives, convenience-oriented customers prioritise nearby locations, opening hours, availability and quick service, and digitally engaged customers research online or use digital tools to reach eligible services. These preferences overlap, so retailers should understand the whole purchasing journey instead of treating each customer as belonging to one fixed segment.' },
      { label: 'Why it is happening', text: 'Medicine decisions mix cost, urgency and trust. A customer may shop for price on a repeat product but go to the nearest store when ill, and may research online yet want face-to-face advice on a medicine question.' },
      { label: 'Real-world example', text: 'A pharmacy displays clear prices and explains eligible alternatives where permitted; aligns store coverage and hours with local demand; reduces waiting through staffing, stock organisation and checkout; provides accurate product information and availability through authorised digital channels; connects online enquiries with in-store service; and examines complaints, repeat visits, fulfilment failures and satisfaction.' },
      { label: 'Vietnam example', text: 'A World Bank study finds that about 40% of Vietnam’s current health expenditure is paid out of pocket and describes pharmaceutical out-of-pocket spending as especially high at 75%, which keeps price important. FPT says Long Châu commits to delivery in under two hours, with most urban orders under one hour, and reports about a 70% returning-customer rate. A Q&Me survey found 1,420 of its 1,977 stores outside Hanoi and Ho Chi Minh City, showing how location convenience extends into the provinces.' },
      { label: 'Business impact', text: 'Price-sensitive, convenience-oriented, and digitally engaged customers evaluate pharmacies through different but overlapping criteria. Retailers can improve their competitive position by combining transparent pricing, accessible locations, dependable stock, and consistent service.' },
    ],
    visualKind: 'pharmacy-m3-33-convenience', visualHeading: 'What price, convenience and digital customers each weigh',
    visualIntro: 'Read the table to see what the retailer does, who it serves most and what must back it up.',
    imageAlt: 'Casemate table of six customer-experience activities, who they serve and what must back them up',
    keyTerms: [
      { term: 'Price transparency', definition: 'Showing clear prices and permitted alternatives.' },
      { term: 'Convenience', definition: 'The combination of location, hours, availability and speed that saves a customer effort.' },
      { term: 'Digital engagement', definition: 'Using websites, apps and online tools to research or order eligible products.' },
      { term: 'Fulfilment reliability', definition: 'Delivering orders correctly and on time.' },
    ],
    recap: [
      'Customers balance affordability, convenience and service quality.',
      'Preferences overlap, so the whole journey matters.',
      'Price alone can weaken margins; convenience needs reliable fulfilment.',
      'Feedback shows where service falls short.',
    ],
    chapterRecap: 'Price-sensitive, convenience-oriented, and digitally engaged customers evaluate pharmacies through different but overlapping criteria. Retailers can improve their competitive position by combining transparent pricing, accessible locations, dependable stock, and consistent service.',
    deepDiveTitle: 'Why a failed order is worse than a slow one',
    body: <P3DeepDive paragraphs={[
      'A customer who is told a product is available and then finds it is not feels misled, and may not trust the pharmacy\u2019s information next time. A slower but accurate answer protects trust better.',
      'That is why accurate stock information and honest delivery estimates are central to convenience in pharmacy retail.' ]} evidence="The three customer groups are described qualitatively in the supplied material. Spending figures are from a World Bank report, delivery and repeat-customer statements are company-group claims in a technology news article, and store counts are from a Q&Me report at one point in 2025." />,
    sources: citeP3('worldBankOop', 'chungtaTouchpoints', 'qmeChains'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l3', [
  { chapter: '1', objective: 'State what chronic customers value', question: 'What do chronic-care customers value most?', application: 'A pharmacy offers a discount but is often out of stock of a patient’s medicine. What matters more?', correct: 'Continuity, reliability and confidence in medicine handling', wrong: ['Only the lowest price', 'Only loyalty points', 'Only a bigger sign'], explanation: 'Reliability earns loyalty. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate repeat purchase from loyalty', question: 'Is repeat purchasing the same as guaranteed loyalty?', application: 'A customer buys monthly. Will they always stay?', correct: 'No, they may switch because of shortages, price, location, service or treatment changes', wrong: ['Yes, always', 'Yes, if reminded', 'Yes, if given a coupon'], explanation: 'Repeat is not loyalty. Review Chapter 1.' },
  { chapter: '1', objective: 'State the limit on retention', question: 'What must retention activities avoid?', application: 'A reminder system suggests extra products. What is the problem?', correct: 'Interfering with clinical decisions or encouraging unnecessary purchases', wrong: ['Helping customers refill', 'Keeping records lawfully', 'Explaining instructions'], explanation: 'Retention has limits. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the e-prescription quantity rule', question: 'What must a pharmacy not do when selling on an e-prescription in Vietnam?', application: 'A customer asks for more than the prescribed quantity. What applies?', correct: 'Sell more than the prescribed quantity or sell on an expired prescription', wrong: ['Check the code', 'Record the sale', 'Explain instructions'], explanation: 'Circular 11/2025 sets these limits. Review Chapter 1.' },
  { chapter: '2', objective: 'State what families value', question: 'What do families and caregivers value?', application: 'A parent buys for a child. What matters?', correct: 'Product suitability, understandable information and reassurance about quality', wrong: ['Dramatic claims', 'Bundles of unrelated products', 'Fear-based messages'], explanation: 'Suitability and clarity matter. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe responsible recommendation', question: 'What is a responsible recommendation?', application: 'A pharmacist suggests an additional product. When is it responsible?', correct: 'One that considers the customer’s stated need and existing treatment instead of automatically adding products', wrong: ['One that adds extras to every sale', 'One that promises prevention', 'One that ignores existing treatment'], explanation: 'Need comes first. Review Chapter 2.' },
  { chapter: '2', objective: 'Avoid unsupported claims', question: 'What must a pharmacy avoid in preventive-care communication?', application: 'A supplement leaflet says it prevents illness. What is the risk?', correct: 'Unsupported claims about prevention or treatment', wrong: ['Accurate use information', 'Stating limits', 'Clear storage advice'], explanation: 'Claims must be supported. Review Chapter 2.' },
  { chapter: '3', objective: 'State the convenience principle', question: 'What does customer convenience combine?', application: 'A store is close but often out of stock. Is it convenient?', correct: 'Price, location, speed, availability and confidence in the pharmacy', wrong: ['Only location', 'Only price', 'Only opening hours'], explanation: 'Convenience has several dimensions. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the price-only risk', question: 'What can competing on price alone do?', application: 'A pharmacy cuts prices to win customers. What may follow?', correct: 'Weaken margins', wrong: ['Guarantee loyalty', 'Remove costs', 'Eliminate competition'], explanation: 'Price is only one factor. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain overlapping segments', question: 'Why should retailers look at the whole purchasing journey?', application: 'A customer researches online but wants advice in store. What does this show?', correct: 'Customer preferences overlap, so customers do not belong to one fixed segment', wrong: ['Segments never overlap', 'Online customers never visit stores', 'Price is the only factor'], explanation: 'Segments overlap. Review Chapter 3.' },
]);

export const LESSON_P3_3: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the needs of chronic-care customers, families and caregivers, and price-sensitive, convenience-oriented and digitally engaged customers, and how pharmacies should respond.',
    keyTakeaways: [
      'Chronic-care customers value continuity and reliability, and repeat purchase is not guaranteed loyalty.',
      'Retention activity must not interfere with clinical decisions.',
      'Families and caregivers want suitability, clear information and reassurance on quality.',
      'Recommendations should follow the stated need and existing treatment.',
      'Convenience combines price, location, speed, availability and confidence.',
    ],
    businessImplications: 'Protect availability for recurring needs, give honest, scoped guidance to families, and build convenience on accurate stock and reliable fulfilment rather than price alone.',
    remember: 'Serve the person’s need, not the sales target.',
    nextLesson: 'Revenue Streams & Cost Structure',
  },
};
