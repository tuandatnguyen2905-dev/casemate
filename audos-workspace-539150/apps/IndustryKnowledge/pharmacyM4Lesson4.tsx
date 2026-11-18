import { P4DeepDive, citeP4, p4Chapter, p4Quiz } from './pharmacyM4Core';
import type { PharmacyM4LessonBundle } from './pharmacyM4Core';

const LESSON = '4. Key Success Factors';

const deck = [
  p4Chapter({
    title: 'Supply Reliability, Product Quality and Procurement Efficiency', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why reliable, legitimate and efficient supply is a competitive capability in pharmacy retail.',
    mateIntro: 'A pharmacy that is often out of stock, or cannot prove where its medicines came from, loses customers fast. Supply is where trust is won or lost.',
    keyInsight: 'Supply-chain performance is a core competitive capability, not a back-office function.',
    statTiles: [
      { value: '8', label: 'Steps in a reliable supply capability', subtitle: 'Supplier qualification to supplier review', description: 'Supplier qualification, procurement coordination, demand forecasting, inventory availability, expiry management, quality assurance, shortage management and supplier performance review.' },
      { value: '> 90%', label: 'Raw-material import dependence of local manufacturers', subtitle: 'Press report', description: 'A reminder that supply starts far upstream of the pharmacy shelf.' },
      { value: '~40%', label: 'Estimated share of wholesale held by the top three foreign-owned wholesalers', subtitle: 'Market research estimate', description: 'Shows how concentrated the wholesale tier can be.' },
    ],
    statsNote: 'The first tile is a count of steps from this lesson; the import and wholesale figures are a newspaper report and a market-research estimate, and wholesale counts and shares vary by publisher.',
    narrative: [
      { label: 'What it is', text: 'Supply reliability means having the right products, in good condition, from legitimate sources, when customers need them. Product quality means storage, handling and traceability are kept to standard. Procurement efficiency means buying at good terms without compromising either. Together they decide whether a pharmacy can keep customer trust, and a chain with strong supply can serve many stores consistently while a weaker one suffers stockouts and write-offs.' },
      { label: 'Why it is happening', text: 'Medicines are regulated, perishable and often hard to substitute. Customers who cannot find a product go elsewhere, and a quality failure can harm health and reputation, so supply discipline protects both sales and licence to operate.' },
      { label: 'Real-world example', text: 'A chain verifies each supplier’s credentials, consolidates demand where appropriate, forecasts replenishment from sales patterns, keeps common products in stock, monitors shelf life, maintains documentation and traceability, manages shortages by offering alternatives only where permitted, and reviews supplier delivery and quality regularly.' },
      { label: 'Vietnam example', text: 'Long Châu describes two central warehouses, and a 2025 warehouse management system that uses planning-based picking, OCR receiving and automated replenishment. Local manufacturers import more than 90% of their raw materials, and a market-research estimate puts the top three foreign-owned wholesalers at about 40% of wholesale. Circular 30/2025 sets how defective drugs are assessed and recalled, and Circular 11/2025 amends the good pharmacy, distribution and storage practice rules, so quality and traceability are compliance duties as well as competitive ones.' },
      { label: 'Business impact', text: 'Reliable, legitimate supply keeps shelves stocked and customers loyal, while efficient procurement protects margin. Chains that treat supply as a strategic capability can scale with fewer stockouts and quality failures.' },
    ],
    visualKind: 'pharmacy-m4-41-supply', visualHeading: 'Eight steps in a reliable supply capability',
    visualIntro: 'Follow eight steps from qualifying a supplier to reviewing its performance and see what each prevents.',
    imageAlt: 'Casemate eight-step flow of a reliable pharmacy supply capability',
    keyTerms: [
      { term: 'Procurement', definition: 'Buying products from suppliers on agreed terms.' },
      { term: 'Traceability', definition: 'The ability to follow a product back to its source.' },
      { term: 'Stockout', definition: 'A product being unavailable when a customer asks for it.' },
      { term: 'Replenishment', definition: 'Reordering stock to replace what has been sold.' },
    ],
    recap: [
      'Supply reliability keeps customers and trust.',
      'Legitimate sources and traceability protect quality.',
      'Forecasting and replenishment reduce stockouts and expiry.',
      'Supply is a strategic capability, not back-office work.',
    ],
    chapterRecap: 'Reliable, legitimate supply keeps shelves stocked and customers loyal, while efficient procurement protects margin. Chains that treat supply as a strategic capability can scale with fewer stockouts and quality failures.',
    deepDiveTitle: 'Why availability and expiry have to be managed together',
    body: <P4DeepDive paragraphs={[
      'Holding more stock lowers the risk of a stockout but raises the risk of expiry and ties up cash. Holding less does the opposite. Neither extreme works for products with limited shelf life.',
      'Forecasting by store and category, and reviewing slow movers regularly, is how chains keep availability high without writing off large amounts of stock.' ]} evidence="The eight steps are described qualitatively in the supplied material. Warehouse details are company and group statements; the import figure is from a Vietnamese newspaper report, the wholesale share is a market-research estimate, and the circulars are official texts in English translation." />,
    sources: citeP4('longChauLogistics', 'longChauWms', 'nhandanApi', 'sgAnalytics', 'circular30', 'circular11'),
  }),
  p4Chapter({
    title: 'Qualified Workforce, Professional Service and Customer Trust', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how qualified staff and consistent standards turn into customer trust that rivals cannot copy quickly.',
    mateIntro: 'A pharmacy sells advice as well as products. Trained, accountable staff are what make a customer return rather than just buy once.',
    keyInsight: 'Professional capability and customer trust are slow to copy, and become a lasting advantage when supported by qualified staff and consistent standards.',
    statTiles: [
      { value: '8', label: 'Layers from qualified staffing to trust measurement', subtitle: 'Workforce to proof of trust', description: 'Qualified staffing, continuous training, standard operating procedures, responsible consultation, service consistency, complaint management, professional accountability and trust measurement.' },
      { value: '18,000+', label: 'Pharmacists reported at Long Châu in July 2025', subtitle: 'Company statement', description: 'Reported alongside 2,222 pharmacies and 28 million customers and families.' },
      { value: '3.41 → 4.0', label: 'Pharmacists per 10,000 people, from 2016 data to the 2025–2030 target', subtitle: 'Peer-reviewed article', description: 'Shows how scarce qualified staff are compared with national goals.' },
    ],
    statsNote: 'The first tile is a count of layers from this lesson; the pharmacist figures are a company statement and a peer-reviewed article citing national data, at different dates.',
    narrative: [
      { label: 'What it is', text: 'A qualified workforce means staff who meet professional and legal requirements, are trained continuously and follow consistent procedures. Professional service means giving appropriate information, referring customers when needed and never letting sales targets override judgement. Customer trust is the result, and it shows up in repeat visits, fewer complaints and willingness to ask for advice. Because trust builds slowly and is easily lost, it is hard for rivals to copy.' },
      { label: 'Why it is happening', text: 'Customers cannot judge medicine quality themselves, so they rely on the person who advises them. Pharmacists are also scarce, so chains that can recruit, train and keep them have a real edge.' },
      { label: 'Real-world example', text: 'A chain checks staffing requirements for each store, trains staff on products, procedures and rules, uses standard procedures for prescriptions, storage and documents, sets expectations for responsible consultation, audits service across outlets, investigates complaints and tracks satisfaction and repeat visits.' },
      { label: 'Vietnam example', text: 'Long Châu said in July 2025 that it had 2,222 pharmacies, more than 18,000 pharmacists and 28 million customers and families, and the group planned 2025 recruitment including FPT Polytechnic students. A peer-reviewed article reports 3.41 pharmacists per 10,000 people in 2016 data against a 2025–2030 target of 4.0. The amended Law on Pharmacy sets practice-certificate and pharmacist-in-charge conditions, including for pharmacy chains, and the 2025 data protection law covers health information, so trust now includes how customer data is handled.' },
      { label: 'Business impact', text: 'Professional capability and trust are among the slowest advantages to build and the slowest to copy. Chains and independents that invest in qualified staff, training and consistent standards protect their right to operate and their customer relationships.' },
    ],
    visualKind: 'pharmacy-m4-42-workforce', visualHeading: 'Eight layers from qualified staff to trust',
    visualIntro: 'Climb from qualified staffing at the base to the measurement of trust at the top.',
    imageAlt: 'Casemate pyramid of eight layers from qualified staffing to measuring customer trust',
    keyTerms: [
      { term: 'Pharmacist in charge', definition: 'The qualified person responsible for professional operations at a pharmacy or chain.' },
      { term: 'Standard operating procedure', definition: 'A written, repeatable way to carry out a task.' },
      { term: 'Responsible consultation', definition: 'Giving appropriate information and referring customers when needed.' },
      { term: 'Service consistency', definition: 'Delivering comparable standards across all outlets.' },
    ],
    recap: [
      'Qualified staff are the base of professional service.',
      'Training and procedures keep standards consistent.',
      'Accountability means targets never override judgement.',
      'Trust is slow to build and slow to copy.',
    ],
    chapterRecap: 'Professional capability and trust are among the slowest advantages to build and the slowest to copy. Chains and independents that invest in qualified staff, training and consistent standards protect their right to operate and their customer relationships.',
    deepDiveTitle: 'How to show that trust is real and not just claimed',
    body: <P4DeepDive paragraphs={[
      'Trust can be measured indirectly. Repeat-visit rates, complaint counts and how quickly complaints are closed show whether customers keep coming back and whether problems are fixed.',
      'Publishing a number is not enough on its own. A chain also needs a process that turns complaints into changes in training or procedure, which is the step customers eventually notice.' ]} evidence="The eight layers are described qualitatively in the supplied material. Long Châu staffing figures are company statements reported by the press; the pharmacist density is from a peer-reviewed article; the legal conditions are from the consolidated Law on Pharmacy and its 2024 amendment, and the data law is the 2025 Personal Data Protection Law." />,
    sources: citeP4('vietnamnetLongChau', 'vnexpressRecruit', 'pensoftPharmacists', 'pharmacyLawConsolidated', 'law44Summary', 'pdplLaw'),
  }),
  p4Chapter({
    title: 'Store Productivity, Digital Systems and Scalable Operations', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how chains keep each new store productive while growing the network.',
    mateIntro: 'Anyone can open a store. The skill is opening the next hundred without letting each one earn less than the last.',
    keyInsight: 'The ability to scale separates a successful chain from a network that outgrows its operating capabilities.',
    statTiles: [
      { value: '8', label: 'Capabilities of scalable operations', subtitle: 'Cohort planning to payback review', description: 'Cohort-based expansion, store-level indicators, stock systems, central warehousing, data analytics, standard procedures, training at scale and payback review.' },
      { value: '~6 months', label: 'Break-even time for new Long Châu stores stated by management in 2023', subtitle: 'Broker initiation report', description: 'A management claim recorded by a broker, not an audited figure.' },
      { value: '> 20%', label: 'Pharmacity same-store sales growth in the first quarter of 2026', subtitle: 'Company statement', description: 'Reported alongside over 35% revenue growth.' },
    ],
    statsNote: 'The first tile is a count of capabilities from this lesson; the break-even time is a 2023 management claim and the Pharmacity figure is a company statement, so neither is an independent measure.',
    narrative: [
      { label: 'What it is', text: 'Scalable operations are the processes, systems and management routines that let a chain add stores without losing control of quality or cost. They include tracking each store’s sales and profit, planning openings in cohorts and checking payback, running central stock and warehouse systems, using data for forecasting and range decisions, standardising procedures and training staff at volume. The aim is to move toward fast and productive growth without letting productivity fall.' },
      { label: 'Why it is happening', text: 'New stores take time to mature, and fast opening multiplies risk if systems and people do not keep pace. Chains that grew faster than their operating capabilities have had to close or restructure stores.' },
      { label: 'Real-world example', text: 'A chain opens stores in planned cohorts, tracks how each cohort’s sales and profit develop against its payback plan, uses central warehousing and replenishment systems to keep availability, applies analytics to local range decisions, and pauses openings when new stores fall short.' },
      { label: 'Vietnam example', text: 'In 2023 management told a broker that new Long Châu stores broke even in about six months, and the 2025 average was about VND 1.2 billion per store per month. Long Châu’s 2025 warehouse system automates replenishment. Pharmacity, after shrinking from over 1,100 stores to under 900 and back above 1,100, reported same-store sales growth above 20% in the first quarter of 2026, says its new store cohorts reach break-even, and plans 500 more stores over three years.' },
      { label: 'Business impact', text: 'Scalable operations decide whether growth adds value or just adds cost. Chains that build systems, data and procedures before accelerating expansion can keep new stores productive, while those that outgrow their capabilities risk the closures and losses seen elsewhere in the market.' },
    ],
    visualKind: 'pharmacy-m4-43-scalable', visualHeading: 'Growth styles by speed and productivity',
    visualIntro: 'Place five growth styles on a matrix of how fast the network grows and how productive each store is.',
    imageAlt: 'Casemate matrix of five growth styles by speed of network growth and store productivity',
    keyTerms: [
      { term: 'Cohort', definition: 'A group of stores opened in the same period and tracked together.' },
      { term: 'Payback period', definition: 'The time a new store takes to recover its investment.' },
      { term: 'Same-store sales growth', definition: 'Sales growth from stores open in both periods compared.' },
      { term: 'Scalability', definition: 'The ability to grow without losing control of quality or cost.' },
    ],
    recap: [
      'Opening stores is easy; keeping them productive is the test.',
      'Cohort tracking and payback review guide expansion.',
      'Systems and data keep availability and cost under control.',
      'The aim is fast growth without falling productivity.',
    ],
    chapterRecap: 'Scalable operations decide whether growth adds value or just adds cost. Chains that build systems, data and procedures before accelerating expansion can keep new stores productive, while those that outgrow their capabilities risk the closures and losses seen elsewhere in the market.',
    deepDiveTitle: 'Reading the growth matrix without over-reading it',
    body: <P4DeepDive paragraphs={[
      'The matrix positions are illustrative, not measured. They show the logic: fast growth with falling store productivity is the risky corner, while selective growth with high productivity is the target.',
      'A chain can move around the matrix over time. The useful question is which corner it is heading towards, and what in its systems or discipline is pushing it there.' ]} evidence="The eight capabilities and the matrix positions are illustrative and our own framing of the supplied material. Break-even time is a management claim recorded in a 2023 broker initiation; Pharmacity figures are from a company press release and Vietnamese financial news; Long Châu average sales and warehouse details are from the press and group statements." />,
    sources: citeP4('kbsvFrt', 'longChauAvg2025', 'longChauWms', 'pharmacityPress', 'investorPharmacity', 'cafefPharmacity'),
  }),
];

const quiz = p4Quiz('pharmacy-m4-l4', [
  { chapter: '1', objective: 'State supply’s strategic role', question: 'How should supply-chain performance be viewed in a pharmacy chain?', application: 'A board treats supply as back-office work. What should change?', correct: 'As a core competitive capability', wrong: ['As a cost to cut at any price', 'As unrelated to customers', 'As only a legal formality'], explanation: 'Supply drives availability and trust. Review Chapter 1.' },
  { chapter: '1', objective: 'Name a supply step', question: 'Which step helps prevent unsafe substitution during a shortage?', application: 'A product is unavailable. What should the pharmacy do?', correct: 'Shortage management, offering alternatives only where permitted', wrong: ['Substituting any product', 'Hiding the shortage', 'Raising the price'], explanation: 'Substitution has rules. Review Chapter 1.' },
  { chapter: '1', objective: 'Balance availability and expiry', question: 'What is the trade-off in holding more stock?', application: 'A chain wants to avoid stockouts. What risk rises?', correct: 'Expiry and cash tied up in inventory', wrong: ['Fewer customers', 'Lower prices', 'Less traceability'], explanation: 'Stock has a cost. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall import dependence', question: 'What does the report say about local manufacturers’ raw materials?', application: 'An analyst explains upstream risk. What is the figure?', correct: 'More than 90% are imported', wrong: ['About 10% are imported', 'None are imported', 'Exactly half are imported'], explanation: 'Supply starts upstream. Review Chapter 1.' },
  { chapter: '2', objective: 'State the workforce advantage', question: 'Why are professional capability and trust a lasting advantage?', application: 'A rival copies a chain’s promotions. Can it copy trust?', correct: 'They are slow to build and slow to copy', wrong: ['They are cheap to copy', 'They never change', 'They only depend on price'], explanation: 'Trust takes time. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe responsible consultation', question: 'What does responsible consultation involve?', application: 'A customer describes symptoms that need a doctor. What should staff do?', correct: 'Giving appropriate information and referring the customer when needed', wrong: ['Selling the most expensive product', 'Avoiding questions', 'Ignoring the symptoms'], explanation: 'Judgement comes first. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the pharmacist density figures', question: 'What pharmacist density target applies to 2025–2030?', application: 'A planner checks national goals. What is the target?', correct: '4.0 per 10,000 people, from 3.41 in 2016 data', wrong: ['40 per 10,000', '0.4 per 10,000', 'No target'], explanation: 'Pharmacists are scarce. Review Chapter 2.' },
  { chapter: '3', objective: 'State what separates winners', question: 'What separates a successful chain from one that outgrows its capabilities?', application: 'Two chains open many stores. What decides the outcome?', correct: 'The ability to scale operations while keeping stores productive', wrong: ['The number of logos', 'Only the opening date', 'Only advertising'], explanation: 'Scale needs systems. Review Chapter 3.' },
  { chapter: '3', objective: 'Define a cohort', question: 'What is a store cohort?', application: 'A chain tracks stores opened in the same year together. What is that group called?', correct: 'A group of stores opened in the same period and tracked together', wrong: ['A supplier group', 'A staff team', 'A product category'], explanation: 'Cohorts show payback patterns. Review Chapter 3.' },
  { chapter: '3', objective: 'Treat a claim carefully', question: 'How should the six-month break-even claim for Long Châu stores be described?', application: 'A slide quotes it as fact. What should be noted?', correct: 'As a 2023 management claim recorded by a broker, not an audited figure', wrong: ['As a legal requirement', 'As a 2026 audit', 'As an industry average'], explanation: 'Source matters. Review Chapter 3.' },
]);

export const LESSON_P4_4: PharmacyM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain why reliable supply, a qualified workforce and scalable store operations are the capabilities that decide who wins in pharmacy retail.',
    keyTakeaways: [
      'Supply-chain performance is a core competitive capability.',
      'Availability and expiry must be managed together.',
      'Professional capability and trust are slow to copy.',
      'Store productivity must be kept as the network grows.',
      'Systems and data come before accelerating expansion.',
    ],
    businessImplications: 'Invest in supply, people and operating systems before adding stores, and measure whether each new cohort pays back.',
    remember: 'Scale rewards the chain that can run it.',
    nextLesson: 'SWOT & Strategic Challenges',
  },
};
