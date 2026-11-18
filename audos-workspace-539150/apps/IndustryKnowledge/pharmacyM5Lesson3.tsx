import { P5DeepDive, citeP5, p5Chapter, p5Quiz } from './pharmacyM5Core';
import type { PharmacyM5LessonBundle } from './pharmacyM5Core';

const LESSON = '3. Market & Channel Trends';

const deck = [
  p5Chapter({
    title: 'Expansion of Modern Pharmacy Chains', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why modern chains are growing, how far organised retail has come, and why productivity now matters more than openings.',
    mateIntro: 'Chains are still a small part of Vietnam’s pharmacy count, but they are growing fast. The next stage depends on how well each new store performs.',
    keyInsight: 'The opportunity for modern pharmacy chains lies in converting a fragmented retail market into a more organized service network. The next stage of growth will depend not only on adding stores, but also on improving store productivity and financial sustainability.',
    statTiles: [
      { value: '7', label: 'Key chain-expansion activities', subtitle: 'Geographic expansion to independent adaptation', description: 'Geographic expansion, store-network optimization, centralized procurement, standardized operations, network-level analytics, selective expansion and independent pharmacy adaptation.' },
      { value: '~14%', label: 'Estimated share of modern pharmacies in the market in 2024', subtitle: 'Vietcap estimate', description: 'Shows how much room organised retail still has.' },
      { value: '3,475', label: 'Modern pharmacies in the second quarter of 2025', subtitle: 'KIS Vietnam count', description: 'Described by the broker as entering a consolidation phase.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the share is a broker estimate and the store count is a different publisher’s count from the 3,457 Q&Me figure, so do not mix the two.',
    narrative: [
      { label: 'What it is', text: 'Modern pharmacy chains have become increasingly important in Vietnam’s pharmaceutical retail market. Compared with traditional independent outlets, organized chains typically offer standardized store operations, coordinated procurement, integrated inventory systems, and more consistent customer-facing processes. These capabilities can support expansion into new locations and improve the management of product availability across multiple stores.' },
      { label: 'Why it is happening', text: 'Industry research indicates that modern pharmacy chains have expanded rapidly in recent years, although penetration remains relatively low compared with the broader pharmacy market. MBS Research’s December 2024 report identified significant room for organized retail growth, while its later retail outlook continued to highlight the advantages of large networks and digital capabilities. Expansion rates, however, can vary as operators adjust store openings to reflect local demand and profitability.' },
      { label: 'Real-world example', text: 'A chain opens stores in underserved areas where demand and economics support entry, reviews and improves weak outlets, buys centrally, applies the same procedures for stock, service, training and compliance, compares store performance across the network, assesses local competition, rent and staffing before each opening, and helps independents learn from these practices to stay competitive.' },
      { label: 'Vietnam example', text: 'Vietcap estimates that modern pharmacies held about 14% of the market in 2024 and says about 95% of more than 50,000 pharmacies are traditional. KIS counted 3,475 modern pharmacies in the second quarter of 2025. Q&Me counts show chain stores rising from 492 in 2019 to 3,457 in 2025, but growth slowed to about 7% in 2025. Long Châu opened 474 pharmacies in 2025 and ended the year with 2,417, Pharmacity grew from under 900 to 1,040, and An Khang withdrew from Hanoi, so expansion is selective.' },
      { label: 'Business impact', text: 'Modern pharmacy chains are likely to remain an important force in the organization of Vietnam’s pharmacy retail market. Long-term success will depend on disciplined expansion, effective store management, and the ability to deliver consistent service profitably.' },
    ],
    visualKind: 'pharmacy-m5-31-chains', visualHeading: 'Two ways of measuring the chains’ share',
    visualIntro: 'Compare chains’ share of outlets by count with modern pharmacies’ estimated market share.',
    imageAlt: 'Casemate bar chart comparing chain share of outlets by count with modern pharmacy market share in Vietnam',
    keyTerms: [
      { term: 'Modern pharmacy chain', definition: 'An organised group of pharmacies with shared procedures and procurement.' },
      { term: 'Penetration', definition: 'The share of the market held by a type of retailer.' },
      { term: 'Store-network optimisation', definition: 'Reviewing outlets and improving or closing weak ones.' },
      { term: 'Consolidation', definition: 'A market becoming more concentrated as larger operators grow.' },
    ],
    recap: [
      'Chains bring standard operations, central buying and integrated stock systems.',
      'Penetration is still low, so organised retail has room to grow.',
      'Expansion rates vary as operators adjust to local demand and profit.',
      'Productivity and financial health now guide growth.',
    ],
    chapterRecap: 'Modern pharmacy chains are likely to remain an important force in the organization of Vietnam’s pharmacy retail market. Long-term success will depend on disciplined expansion, effective store management, and the ability to deliver consistent service profitably.',
    deepDiveTitle: 'Why two share figures can both be right',
    body: <P5DeepDive paragraphs={[
      'Chains are about 5% of outlets by count but an estimated 14% of the market by value of sales, because chain stores are larger and busier than the average independent. The two figures answer different questions.',
      'Comparing a count-based figure with a sales-based one, or one publisher’s store count with another’s, will mislead. Always say what is being counted and by whom.' ]} evidence="The seven activities are described in the supplied material. The 14% share is a Vietcap estimate; the 95% traditional share is from Vietcap research; the 3,475 count is from a KIS review; store series are from a Q&Me report as reproduced by an aggregator. The brief names an MBS Research report that could not be retrieved, so Vietcap and KIS are used instead." />,
    sources: citeP5('vietcapFrt', 'vietcapTraditional', 'kisRetail2q25', 'qmeSeries', 'shsPharmacy', 'fptRetail2025'),
  }),
  p5Chapter({
    title: 'Omnichannel Retail and Changing Fulfillment Expectations', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how omnichannel pharmacy works and why medicine-specific controls limit how it can copy general e-commerce.',
    mateIntro: 'Customers want to check, order and collect through whichever route suits them. For medicines, each route needs its own safeguards.',
    keyInsight: 'Omnichannel growth is most valuable when digital services improve the performance of physical stores. Convenient ordering must be supported by accurate inventory, reliable fulfillment, and compliant product handling.',
    statTiles: [
      { value: '7', label: 'Key omnichannel activities', subtitle: 'Online-to-store to channel measurement', description: 'Online-to-store journeys, inventory visibility, order fulfillment, customer communication, channel integration, delivery quality and channel performance measurement.' },
      { value: '< 2 hours', label: 'Delivery commitment stated by the Long Châu group', subtitle: 'Company-group statement', description: 'Applies to eligible orders and is not independently measured.' },
      { value: '1 Jul 2025', label: 'Date online retail of eligible non-prescription medicines became permitted', subtitle: 'Law 44/2024/QH15', description: 'Sets the legal frame for online order and delivery models.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the delivery time is a company-group claim and the date is from legal summaries.',
    narrative: [
      { label: 'What it is', text: 'Customers increasingly expect convenient access to product information, efficient transactions, and responsive service across physical and digital touchpoints. Omnichannel pharmacy retail combines these interactions through store networks, websites, applications, customer support, and eligible delivery services. It can help customers research products before visiting a store and allow retailers to coordinate inventory and fulfillment more effectively.' },
      { label: 'Why it is happening', text: 'However, pharmaceutical retail cannot simply adopt every practice used by general e-commerce businesses. Product classification, prescription requirements, appropriate storage, and delivery controls affect which products can be sold online and how orders can be fulfilled. Retailers must therefore balance convenience with legal requirements and product integrity.' },
      { label: 'Real-world example', text: 'A pharmacy lets customers research eligible products online before choosing a channel, shows availability linked to real stock, prepares, verifies and delivers orders only where permitted, sends order updates through authorised channels, connects store staff and customer service with the digital system so answers match, checks delivery timeliness and storage conditions, and measures fulfilment success, waiting time, satisfaction and channel cost.' },
      { label: 'Vietnam example', text: 'The Long Châu group states a delivery commitment of under two hours and operates central warehouses with a 2025 system for automated replenishment. Law 44/2024/QH15 allows online retail of eligible non-prescription medicines from 1 July 2025 and bans online retail of certain others, and Circular 11/2025 requires consultation records for online sales to be kept. Pharmacity also announced digital partnerships in 2025 according to a market research summary, showing that omnichannel is spreading beyond the largest chain.' },
      { label: 'Business impact', text: 'Omnichannel retail can improve accessibility and customer experience by connecting digital services with physical pharmacy operations. The strongest models integrate information and fulfillment while preserving medicine-specific controls.' },
    ],
    visualKind: 'pharmacy-m5-32-omnichannel', visualHeading: 'Seven building blocks of omnichannel pharmacy',
    visualIntro: 'See seven building blocks as cards and what must be true for each.',
    imageAlt: 'Casemate cards of seven building blocks of omnichannel pharmacy retail',
    keyTerms: [
      { term: 'Omnichannel', definition: 'Joining stores, websites, apps and support into one customer experience.' },
      { term: 'Inventory visibility', definition: 'Availability information that matches real stock records.' },
      { term: 'Fulfilment', definition: 'Preparing, verifying and delivering an order.' },
      { term: 'Product integrity', definition: 'Keeping a medicine in its required condition until it reaches the customer.' },
    ],
    recap: [
      'Omnichannel joins stores, apps, support and eligible delivery.',
      'Medicine rules limit what general e-commerce practices can be copied.',
      'Accurate stock data underpins every promise made online.',
      'Measure fulfilment, waiting time, satisfaction and cost by channel.',
    ],
    chapterRecap: 'Omnichannel retail can improve accessibility and customer experience by connecting digital services with physical pharmacy operations. The strongest models integrate information and fulfillment while preserving medicine-specific controls.',
    deepDiveTitle: 'Why an out-of-stock promise is worse online',
    body: <P5DeepDive paragraphs={[
      'In a shop, an empty shelf is visible and the pharmacist can suggest what to do. Online, a product shown as available that is not creates a failed order and a loss of trust.',
      'Linking the online catalogue to live store stock, and updating it frequently, is a prerequisite for any fast-delivery promise.' ]} evidence="The seven activities are described in the supplied material. Delivery and warehouse details are group statements; legal points are from summaries of Law 44/2024/QH15, Circular 11/2025 and a Drug Administration dispatch; Pharmacity partnerships are from a market research summary." />,
    sources: citeP5('chungtaTouchpoints', 'longChauWms', 'law44Summary', 'dav1136', 'circular11', 'techsciEpharmacy'),
  }),
  p5Chapter({
    title: 'Competition Between Traditional Pharmacies, Chains and Digital Platforms', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show why different pharmacy formats can coexist and how each should position itself.',
    mateIntro: 'Independents, national chains, regional chains and digital platforms all compete for the same customers, but they win in different ways.',
    keyInsight: 'The industry is moving toward greater organization and digital integration, but different retail formats can coexist. Competitive advantage depends on matching the operating model to local demand, customer expectations, and the capabilities of the business.',
    statTiles: [
      { value: '7', label: 'Key competitive activities', subtitle: 'Independents to strategic adaptation', description: 'Independent pharmacies, national chains, regional chains, digital platforms, competitive differentiation, market monitoring and strategic adaptation.' },
      { value: '2,417 / 1,040 / 382', label: 'Long Châu, Pharmacity and An Khang stores at end-2025', subtitle: 'Company and press reports', description: 'The three largest chains, at the end of 2025.' },
      { value: '230+', label: 'Trung Sơn Pharma pharmacies in 2025', subtitle: 'Press report', description: 'A regional chain with outside investment.' },
    ],
    statsNote: 'The first tile is a count from this lesson; store counts are company, broker and press reports at different dates and are not directly comparable.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s pharmacy market includes independent community pharmacies, organized retail chains, regional operators, and digital platforms that support pharmaceutical commerce. These formats compete for overlapping customer needs, but their advantages differ. Independent pharmacies often benefit from local familiarity and proximity, chains can leverage scale and standardized systems, and digital platforms can improve product discovery and convenience for eligible transactions.' },
      { label: 'Why it is happening', text: 'Competition is therefore likely to remain differentiated rather than shifting completely toward one format. Traditional outlets may continue to serve areas where they have strong customer relationships, while organized chains may attract customers through assortment, consistency, and integrated services. Digital channels are likely to function as an additional layer of competition and service delivery, subject to applicable pharmaceutical regulations.' },
      { label: 'Real-world example', text: 'Independents focus on local access, trusted relationships and relevant stock; national chains use networks, central buying, standard operations and brand; regional chains concentrate where local knowledge and density help; digital platforms support discovery and eligible transactions under e-commerce rules; each defines a clear value proposition; each tracks local openings, closures, pricing and feedback; and each invests to fix its own weakness rather than copy rivals.' },
      { label: 'Vietnam example', text: 'Vietcap says about 95% of more than 50,000 pharmacies are traditional and that Long Châu held over half of chain stores by May 2025. At end-2025 Long Châu had 2,417 pharmacies, Pharmacity 1,040 and An Khang 382, while Trung Sơn Pharma had more than 230 pharmacies after Korea’s Dongwha bought 51% in 2023 and opened a pharmacy and convenience-store model with GS25. Q&Me counted 126 Guardian, 64 Medicare and 12 Matsumoto Kiyoshi stores in 2025, so smaller chains stay focused on limited networks.' },
      { label: 'Business impact', text: 'Competition is likely to intensify as organized chains and digital services develop, while independent and regional pharmacies retain opportunities through local strengths. Businesses will need a clear market position and efficient operations to remain competitive.' },
    ],
    visualKind: 'pharmacy-m5-33-competition', visualHeading: 'Four formats and where each competes',
    visualIntro: 'Read the table of four retail formats, their typical advantage and what to watch.',
    imageAlt: 'Casemate table of four pharmacy retail formats with their advantage and what to watch',
    keyTerms: [
      { term: 'Independent pharmacy', definition: 'A single or small-group pharmacy outside a national chain.' },
      { term: 'Regional chain', definition: 'A chain concentrated in selected parts of the country.' },
      { term: 'Value proposition', definition: 'The mix of benefits a business offers customers.' },
      { term: 'Market monitoring', definition: 'Tracking openings, closures, prices and feedback.' },
    ],
    recap: [
      'Four formats compete for overlapping needs with different advantages.',
      'Competition stays differentiated and not winner-takes-all.',
      'Digital channels add a layer of competition under pharmacy rules.',
      'A clear position and efficient operations decide who stays competitive.',
    ],
    chapterRecap: 'Competition is likely to intensify as organized chains and digital services develop, while independent and regional pharmacies retain opportunities through local strengths. Businesses will need a clear market position and efficient operations to remain competitive.',
    deepDiveTitle: 'Why copying a rival’s strategy often fails',
    body: <P5DeepDive paragraphs={[
      'A small independent that copies a national chain’s promotions cannot match its buying power. A national chain that copies an independent’s personal service may not be able to deliver it consistently across thousands of stores.',
      'The better question is which of the business’s own capabilities customers value, and which single weakness is most worth fixing.' ]} evidence="The seven activities are described in the supplied material. Store counts are from company, broker and press reports and a Q&Me survey; the traditional share and Long Châu’s share of chain stores are from Vietcap research; Trung Sơn figures are from press reports." />,
    sources: citeP5('vietcapTraditional', 'vietcapRace', 'shsPharmacy', 'fptRetail2025', 'vnexpressGs25', 'pharmacyPlayers', 'qmeSeries'),
  }),
];

const quiz = p5Quiz('pharmacy-m5-l3', [
  { chapter: '1', objective: 'State the chain opportunity', question: 'What is the opportunity for modern pharmacy chains?', application: 'An analyst looks at Vietnam’s pharmacy market. What is the opportunity?', correct: 'Converting a fragmented market into a more organised service network', wrong: ['Removing all independents', 'Raising prices', 'Ending regulation'], explanation: 'Organisation is the opportunity. Review Chapter 1.' },
  { chapter: '1', objective: 'Say what the next stage depends on', question: 'What will the next stage of chain growth depend on beyond adding stores?', application: 'A chain has opened many outlets. What must it now improve?', correct: 'Store productivity and financial sustainability', wrong: ['Only store count', 'Only advertising', 'Only logos'], explanation: 'Productivity matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare share figures', question: 'Why are chains about 5% of outlets but about 14% of the market?', application: 'Two figures seem to conflict. What explains it?', correct: 'They measure different things, count versus sales, and chain stores sell more per store', wrong: ['One is wrong', 'Chains have fewer customers', 'Independents are larger'], explanation: 'Different bases. Review Chapter 1.' },
  { chapter: '1', objective: 'Avoid mixing counts', question: 'Why should the 3,475 KIS count not be mixed with the 3,457 Q&Me count?', application: 'A report cites both. What should be done?', correct: 'They come from different publishers and definitions', wrong: ['They should be added', 'They should be averaged', 'Only the larger is valid'], explanation: 'Sources define counts differently. Review Chapter 1.' },
  { chapter: '2', objective: 'State where omnichannel adds value', question: 'When is omnichannel growth most valuable?', application: 'A chain launches an app. What should it improve?', correct: 'When digital services improve the performance of physical stores', wrong: ['When stores close', 'When prices rise', 'When staff are cut'], explanation: 'It supports stores. Review Chapter 2.' },
  { chapter: '2', objective: 'Name what must support ordering', question: 'What must convenient ordering be supported by?', application: 'A customer orders online. What must be right behind it?', correct: 'Accurate inventory, reliable fulfilment and compliant product handling', wrong: ['A bigger logo', 'Faster promotions', 'Fewer staff'], explanation: 'Operations back the promise. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain why pharmacy differs from general e-commerce', question: 'Why can pharmacies not copy every general e-commerce practice?', application: 'A start-up applies a grocery model to medicines. What does it miss?', correct: 'Product classification, prescription rules, storage and delivery controls limit what can be sold and how', wrong: ['Nothing differs', 'Medicines are cheap', 'Customers dislike delivery'], explanation: 'Medicines carry controls. Review Chapter 2.' },
  { chapter: '3', objective: 'State whether formats coexist', question: 'Is competition likely to move completely to one format?', application: 'A planner assumes chains will replace independents. What is the better view?', correct: 'No; formats can coexist with different advantages', wrong: ['Yes, all to chains', 'Yes, all to digital', 'Yes, all to independents'], explanation: 'Competition stays differentiated. Review Chapter 3.' },
  { chapter: '3', objective: 'Match advantage to format', question: 'What do independent pharmacies often benefit from?', application: 'A neighbourhood pharmacy holds its customers. Why?', correct: 'Local familiarity and proximity', wrong: ['Nationwide buying power', 'A national brand', 'Online delivery only'], explanation: 'Local strengths matter. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the share of traditional outlets', question: 'About what share of more than 50,000 pharmacies is traditional, according to Vietcap?', application: 'A student sizes the independent base. What is the figure?', correct: 'About 95%', wrong: ['About 5%', 'About 50%', 'About 14%'], explanation: 'Independents dominate by count. Review Chapter 3.' },
]);

export const LESSON_P5_3: PharmacyM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain why modern chains are growing, how omnichannel retail must stay within medicine rules, and why different pharmacy formats can coexist.',
    keyTakeaways: [
      'Chains turn a fragmented market into an organised service network.',
      'Productivity and financial health now matter more than openings.',
      'Omnichannel is valuable when it improves physical-store performance.',
      'Medicine-specific controls limit what general e-commerce practice can be copied.',
      'Independents, chains and digital platforms can all compete with different strengths.',
    ],
    businessImplications: 'Expand selectively, back every online promise with accurate stock and compliant fulfilment, and choose a format position that matches your capabilities.',
    remember: 'Fit beats imitation.',
    nextLesson: 'Regulatory & Sustainability Trends',
  },
};
