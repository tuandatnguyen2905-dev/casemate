import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '5. Distribution & Sales Channels';

const deck = [
  p3Chapter({
    title: 'Physical Pharmacy Stores and Retail Networks', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why physical stores remain the central sales channel and what makes a store network perform.',
    mateIntro: 'Most medicine is still bought at a counter, from a person who can answer questions. Where the store is and how well it is run decide how much it sells.',
    keyInsight: 'Physical retail competitiveness depends on accessibility, reliable stock, and service quality. A broad store network can improve market coverage, but each outlet still needs sufficient local demand and disciplined cost management.',
    statTiles: [
      { value: '6', label: 'Key physical-retail activities', subtitle: 'Location selection to outlet monitoring', description: 'Location selection, store assortment planning, store operations, network standardisation, local demand analysis and outlet performance monitoring.' },
      { value: '2,417', label: 'Long Chau pharmacies at end-2025', subtitle: 'Plus vaccination centres', description: 'The largest pharmacy network in Vietnam by store count.' },
      { value: '1,420 of 1,977', label: 'Long Chau stores outside Hanoi and Ho Chi Minh City in a 2025 survey', subtitle: 'Q&Me modern-trade report', description: 'Shows how far a chain can extend into provincial markets.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store figures are a broker report at end-2025 and a survey at an earlier point in 2025, so they differ in date.',
    narrative: [
      { label: 'What it is', text: 'Physical stores remain a central channel because they give direct access to medicines, healthcare products and professional help. Store performance depends on location, opening hours, visibility, local healthcare demand, assortment and service, and pharmacies near homes or healthcare facilities may benefit from convenient access although location alone does not guarantee sales. Networks allow chains to standardise layouts, share inventory information, centralise some management and use network data for buying and replenishment, while independents rely more on local demand and individual supplier relationships.' },
      { label: 'Why it is happening', text: 'Customers often need medicine quickly and want to ask a person, so nearby, well-stocked stores win. Chains add stores where demand and rent allow, but each store must still earn enough to cover its own costs.' },
      { label: 'Real-world example', text: 'A chain evaluates residential density, accessibility, nearby healthcare facilities, competition and rent; adapts inventory to local needs while keeping handling standards; manages staffing, hours, displays, checkout and enquiries; sets consistent procedures for inventory, service, training and management; compares sales patterns and requests across locations; and tracks sales, gross profit, availability, satisfaction and costs by outlet.' },
      { label: 'Vietnam example', text: 'FPT Long Châu ended 2025 with 2,417 pharmacies, and a Q&Me survey found 1,420 of its 1,977 stores outside Hanoi and Ho Chi Minh City, 322 in Ho Chi Minh City and 235 in Hanoi, while Pharmacity had 425 of 938 stores in the provinces and An Khang had 77 stores in Ho Chi Minh City and none in Hanoi. A 2023 broker report notes that Long Châu runs a pharmacy-only model unlike Pharmacity’s convenience-store style, and that provincial premises cost much less than city premises.' },
      { label: 'Business impact', text: 'Physical pharmacies provide convenient access and direct professional support. Store networks can improve consistency and coordination, but long-term performance depends on local demand, service quality, inventory availability, and the economics of each outlet.' },
    ],
    visualKind: 'pharmacy-m3-51-physical', visualHeading: 'Where Long Chau’s stores were in a 2025 survey',
    visualIntro: 'Compare the number of stores outside the two largest cities with those in Ho Chi Minh City and Hanoi.',
    imageAlt: 'Casemate bar chart of Long Chau stores outside Hanoi and Ho Chi Minh City, in Ho Chi Minh City and in Hanoi',
    keyTerms: [
      { term: 'Network standardisation', definition: 'Using consistent procedures for inventory, service, training and management across stores.' },
      { term: 'Catchment', definition: 'The area from which a store draws its customers.' },
      { term: 'Outlet performance', definition: 'Sales, gross profit, availability, satisfaction and cost for a single store.' },
      { term: 'Pharmacy-only model', definition: 'A format focused on medicines and healthcare products instead of general convenience goods.' },
    ],
    recap: [
      'Physical stores give direct access to medicines and professional help.',
      'Performance depends on location, hours, assortment and service.',
      'Networks allow standardisation and shared data.',
      'Each outlet still needs local demand and cost discipline.',
    ],
    chapterRecap: 'Physical pharmacies provide convenient access and direct professional support. Store networks can improve consistency and coordination, but long-term performance depends on local demand, service quality, inventory availability, and the economics of each outlet.',
    deepDiveTitle: 'Why a store that is close can still fail',
    body: <P3DeepDive paragraphs={[
      'Proximity brings customers in, but if the product is out of stock, staff are overstretched or rent is too high for the local sales, the store loses money or customers. Location is necessary but not enough.',
      'Outlet-level reports of sales, gross profit, availability and cost help a chain find the stores that need help or closure.' ]} evidence="The six activities are described qualitatively in the supplied material. Store counts are from a broker report and a Q&Me survey reported by CafeBiz, and the format and premises-cost points are from a 2023 broker report; dates differ." />,
    sources: citeP3('frtReport2026', 'qmeChains', 'kbsvFrt'),
  }),
  p3Chapter({
    title: 'E-commerce, Mobile Applications and Omnichannel Retail', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how digital channels add value to pharmacy retail and how medicine rules shape them.',
    mateIntro: 'Apps and websites make it easier to find products and check an order, but a pharmacy sale is still a regulated transaction.',
    keyInsight: 'Digital channels create value when they improve the customer journey and operational coordination. Technology expands convenience, but it does not remove the legal and professional requirements associated with medicine sales.',
    statTiles: [
      { value: '7', label: 'Key e-commerce activities', subtitle: 'Online catalogues to digital compliance controls', description: 'Online product catalogues, digital customer support, integrated stock information, order management, customer relationship tools, omnichannel coordination and digital compliance controls.' },
      { value: '1 Jan 2025', label: 'Date Long Chau began offering online purchase with VNeID verification', subtitle: 'Company-reported partnership', description: 'An electronic identity check for online medicine purchases.' },
      { value: '1 Jul 2025', label: 'Date online retail of eligible OTC medicines became permitted', subtitle: 'Amended Law on Pharmacy', description: 'Prescription, controlled and restricted-retail medicines remain barred online.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are a market research report and a legal summary, and describe rules and services, not how large online sales are.',
    narrative: [
      { label: 'What it is', text: 'Digital channels let pharmacy retailers give product information, answer enquiries and support eligible online transactions. Websites and apps help customers find products, check availability, see order information and talk to customer service, and can complement physical stores. Omnichannel retail connects digital interactions with inventory, order processing, customer support and store operations, and in pharmacy it must also reflect prescription status, product classification, dispensing requirements, privacy and the rules for online pharmaceutical transactions.' },
      { label: 'Why it is happening', text: 'Customers expect to check and order from their phones, and retailers want to link online demand to store stock. But medicines are a regulated category, so the law limits what may be sold online and how.' },
      { label: 'Real-world example', text: 'A pharmacy presents accurate product information and eligible purchase options; answers general product and order enquiries while medicine questions go to qualified staff; connects online availability with store or warehouse stock; coordinates confirmation, payment, preparation and communication; sends relevant updates with consent; links online discovery with store help and permitted fulfilment; and applies restrictions and verification to regulated products.' },
      { label: 'Vietnam example', text: 'From 1 July 2025, eligible OTC medicines may be sold through licensed e-commerce platforms, apps or websites with online ordering, not through social media or livestreams, and sellers must publish their certificate, pharmacist and medicine information, consult buyers before selling and keep records for 24 months. The Drug Administration wrote to Shopee and Meta in April 2025 about illegal medicine sales. Long Châu began online purchase with VNeID verification on 1 January 2025, and a third-party profile describes Pharmacity’s app, website and corporate health sales.' },
      { label: 'Business impact', text: 'E-commerce and omnichannel services can improve convenience, information access, and coordination between customers and stores. Their success depends on reliable technology, accurate inventory, responsible communication, and compliance with applicable pharmaceutical regulations.' },
    ],
    visualKind: 'pharmacy-m3-52-ecommerce', visualHeading: 'Seven parts of e-commerce and omnichannel pharmacy retail',
    visualIntro: 'See seven parts of digital retail as cards and what each guards against.',
    imageAlt: 'Casemate cards showing seven parts of e-commerce and omnichannel pharmacy retail',
    keyTerms: [
      { term: 'E-commerce platform', definition: 'A licensed online platform, app or website with online ordering.' },
      { term: 'Order management', definition: 'Coordinating confirmation, payment, preparation and customer communication.' },
      { term: 'Digital compliance control', definition: 'A check that restricts regulated products and verifies transactions.' },
      { term: 'VNeID', definition: 'Vietnam’s electronic identity application, used for identity verification.' },
    ],
    recap: [
      'Digital channels give information, support and eligible online transactions.',
      'Omnichannel links digital interactions with stock, orders, support and stores.',
      'Prescription status, classification, privacy and online rules still apply.',
      'Technology does not remove legal and professional requirements.',
    ],
    chapterRecap: 'E-commerce and omnichannel services can improve convenience, information access, and coordination between customers and stores. Their success depends on reliable technology, accurate inventory, responsible communication, and compliance with applicable pharmaceutical regulations.',
    deepDiveTitle: 'Why social media sales are treated differently from platform sales',
    body: <P3DeepDive paragraphs={[
      'A licensed platform, app or website can show the seller\u2019s certificate, the pharmacist and the product registration, and can keep records. A social media post or livestream usually cannot, which is why the amended law bars selling medicines that way.',
      'Pharmacies should therefore direct customers to their licensed ordering channel and avoid taking medicine orders in social media chats.' ]} evidence="The seven activities are described qualitatively in the supplied material. Legal points are from a Ministry of Health notice, a Drug Administration dispatch, a government gazette summary of Decree 163/2025/ND-CP and the English text of Circular 11/2025/TT-BYT; the VNeID and Pharmacity items are from a market research report and a third-party profile." />,
    sources: citeP3('dav1136', 'ecomRules', 'circular11', 'techsciEpharmacy', 'aktaPharmacity'),
  }),
  p3Chapter({
    title: 'Warehousing, Distribution and Last-Mile Fulfillment', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how warehousing and last-mile fulfilment affect availability, quality and customer experience.',
    mateIntro: 'Fast delivery sounds good, but only if the right product arrives and has been kept in the right conditions.',
    keyInsight: 'Distribution performance affects both customer experience and product quality. Fast delivery has limited value if products arrive late, are unavailable, or have not been handled under the required conditions.',
    statTiles: [
      { value: '7', label: 'Key logistics activities', subtitle: 'Warehouse management to logistics performance monitoring', description: 'Warehouse management, order consolidation, store replenishment, temperature controls, delivery coordination, traceability and performance monitoring.' },
      { value: '80,000 m²', label: 'Combined area of Long Chau’s two central warehouses', subtitle: 'Calculated from 35,000 and 45,000 m²', description: 'Company-described warehouses in Hanoi and Long An meeting GDP and GSP standards.' },
      { value: '~70,000', label: 'Orders a day the warehouses can typically handle', subtitle: 'Company-described capacity', description: 'A capacity description, not a measured daily outcome.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other tiles are company descriptions of one chain, with the combined area calculated here, and are not industry averages.',
    narrative: [
      { label: 'What it is', text: 'Warehousing and distribution connect pharmaceutical suppliers with pharmacies. Depending on the model, products may pass through authorised wholesalers, distribution centres or other approved arrangements before reaching stores, and efficient logistics help maintain availability, control replenishment cost and handle products by their storage and transport needs. Last-mile fulfilment is the final stage of delivering an eligible order to a customer or supplying products to a retail location, and pharmacies must balance delivery speed with integrity, traceability and dispensing controls.' },
      { label: 'Why it is happening', text: 'A product that arrives quickly but warm, damaged or unrecorded cannot safely be used. So speed has to be combined with condition, records and the right product, which are controlled in warehouses and handovers.' },
      { label: 'Real-world example', text: 'A warehouse organises stock by product characteristics, storage needs, expiry and priority; combines demand across stores to improve transport efficiency; uses sales and stock data to schedule deliveries and reduce stockouts; keeps required conditions for specialised products; selects delivery methods and providers by product and rules; keeps batch and movement records; and measures reliability, fulfilment time, damage and cost.' },
      { label: 'Vietnam example', text: 'FPT Long Châu describes two central warehouses of 35,000 m² in Hanoi and 45,000 m² in Long An meeting GDP and GSP standards, with about 70,000 orders a day capacity and a commitment to deliver to customers within two hours. Under Circular 11/2025/TT-BYT, online parcels must show storage conditions and the latest delivery time, and a US$5 million pharmaceutical-grade e-commerce fulfilment centre by SwiftHub was announced in November 2024.' },
      { label: 'Business impact', text: 'Warehousing and distribution support product availability across the pharmacy network, while last-mile fulfillment connects inventory with the end customer. Strong logistics depend on accurate records, appropriate handling, efficient replenishment, and reliable delivery performance.' },
    ],
    visualKind: 'pharmacy-m3-53-logistics', visualHeading: 'Seven logistics activities from warehouse to last mile',
    visualIntro: 'See seven logistics activities on two sides of the centre and what each improves.',
    imageAlt: 'Casemate sides mind map of seven logistics activities from warehouse to last mile',
    keyTerms: [
      { term: 'Last-mile fulfilment', definition: 'The final step of delivering an order to the customer or store.' },
      { term: 'Order consolidation', definition: 'Combining demand across stores to improve transport efficiency.' },
      { term: 'Traceability', definition: 'Keeping batch and movement records so products can be followed.' },
      { term: 'Logistics performance', definition: 'Reliability, fulfilment time, damage and cost of distribution.' },
    ],
    recap: [
      'Warehouses and distribution connect suppliers with pharmacies.',
      'Efficient logistics supports availability and controls cost.',
      'Last-mile fulfilment must balance speed with integrity and traceability.',
      'Performance should be measured on reliability, time, damage and cost.',
    ],
    chapterRecap: 'Warehousing and distribution support product availability across the pharmacy network, while last-mile fulfillment connects inventory with the end customer. Strong logistics depend on accurate records, appropriate handling, efficient replenishment, and reliable delivery performance.',
    deepDiveTitle: 'Why delivery time and delivery quality need separate measures',
    body: <P3DeepDive paragraphs={[
      'A fast average delivery time can hide late or damaged orders. Measuring on-time rate, damage rate and condition on arrival separately shows where the problems are.',
      'For products with storage conditions, delivery partners should be briefed and checked, and the pharmacy remains responsible for the result.' ]} evidence="The seven activities are described qualitatively in the supplied material. Warehouse and delivery figures are company descriptions in the chain’s own and technology news articles, the parcel rule is from the English text of Circular 11/2025/TT-BYT and the fulfilment-centre investment is from a market research report." />,
    sources: citeP3('longChauLogistics', 'longChauWms', 'circular11', 'techsciEpharmacy'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l5', [
  { chapter: '1', objective: 'State what physical retail depends on', question: 'What does physical retail competitiveness depend on?', application: 'A store is well located but often out of stock. What is missing?', correct: 'Accessibility, reliable stock and service quality', wrong: ['Only location', 'Only advertising', 'Only store size'], explanation: 'Location is not enough. Review Chapter 1.' },
  { chapter: '1', objective: 'State the network condition', question: 'What does a broad store network still need at each outlet?', application: 'A chain opens many stores. What must each one have?', correct: 'Sufficient local demand and disciplined cost management', wrong: ['Identical sales', 'No staff', 'No local adaptation'], explanation: 'Each outlet must pay its way. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall network benefits', question: 'What can chain networks do that independents often cannot?', application: 'A chain shares stock data across stores. What is this an example of?', correct: 'Standardise layouts, share inventory information and use network data for buying and replenishment', wrong: ['Avoid regulation', 'Avoid competition', 'Avoid staff'], explanation: 'Networks enable coordination. Review Chapter 1.' },
  { chapter: '2', objective: 'State the digital principle', question: 'When do digital channels create value?', application: 'An app has many downloads but poor order fulfilment. What is missing?', correct: 'When they improve the customer journey and operational coordination', wrong: ['When they remove legal rules', 'When they hide stock levels', 'When they replace stores'], explanation: 'Value comes from coordination. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall online scope', question: 'What may be sold through licensed e-commerce channels in Vietnam from 1 July 2025?', application: 'A pharmacy plans its online range. What can it list?', correct: 'Eligible OTC medicines, but not prescription, specially controlled or restricted-retail medicines', wrong: ['All medicines', 'Only prescription medicines', 'Any medicine through livestreams'], explanation: 'Online scope is limited. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the consultation record rule', question: 'What must online sellers do before selling and afterwards?', application: 'An online seller completes a sale. What record must it keep?', correct: 'Consult the buyer before selling and keep evidence of the consultation for at least 24 months', wrong: ['Skip consultation', 'Keep records for one day', 'Delete all records'], explanation: 'Circular 11/2025 sets this duty. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain the role of stock accuracy', question: 'Why is accurate stock information important online?', application: 'An app shows a product as available but the shelf is empty. What is the result?', correct: 'It reduces failed orders and protects trust', wrong: ['It has no effect', 'It increases failed orders', 'It replaces delivery'], explanation: 'Accuracy protects the journey. Review Chapter 2.' },
  { chapter: '3', objective: 'State the logistics principle', question: 'When does fast delivery have limited value?', application: 'A parcel arrives in an hour but was kept warm. What is the issue?', correct: 'When products arrive late, are unavailable or have not been handled under the required conditions', wrong: ['Never', 'Only for large orders', 'Only on weekends'], explanation: 'Speed needs quality. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall parcel information', question: 'What must online parcels show under Circular 11/2025/TT-BYT?', application: 'A pharmacy prepares an online parcel. What details are needed?', correct: 'Buyer and pharmacy names and addresses, storage conditions and the latest delivery time', wrong: ['Only the price', 'Only the brand', 'Nothing'], explanation: 'Parcels carry handling information. Review Chapter 3.' },
  { chapter: '3', objective: 'List logistics measures', question: 'Which should logistics performance monitoring measure?', application: 'A manager wants to judge distribution. What should be tracked?', correct: 'Delivery reliability, fulfilment time, product damage and transportation costs', wrong: ['Only vehicle colour', 'Only driver count', 'Only advertising reach'], explanation: 'Measure what matters. Review Chapter 3.' },
]);

export const LESSON_P3_5: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain the role of physical store networks, digital and omnichannel channels, and warehousing and last-mile fulfilment in getting products to pharmacy customers.',
    keyTakeaways: [
      'Physical competitiveness rests on accessibility, reliable stock and service quality.',
      'A broad network widens coverage but each outlet needs local demand and cost control.',
      'Digital channels add value by improving the journey, not by removing medicine rules.',
      'Online scope in Vietnam is limited by product, with consultation records kept for 24 months.',
      'Fast delivery is only valuable if products arrive intact and traceable.',
    ],
    businessImplications: 'Judge each store on its own economics, build digital services on accurate stock and compliant processes, and measure delivery on condition and reliability as well as speed.',
    remember: 'Reach, speed and compliance must travel together.',
    nextLesson: 'Industry Ecosystem & Stakeholders',
  },
};
