import { P3DeepDive, citeP3, p3Chapter, p3Quiz } from './pharmacyM3Core';
import type { PharmacyM3LessonBundle } from './pharmacyM3Core';

const LESSON = '4. Revenue Streams & Cost Structure';

const deck = [
  p3Chapter({
    title: 'Revenue Sources and Product-Mix Economics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how pharmacy revenue comes from a mix of categories and why revenue growth differs from gross-profit growth.',
    mateIntro: 'A pharmacy earns from medicines, health products and sometimes services. Which products sell most and which earn most are often not the same.',
    keyInsight: 'Revenue growth and gross-profit growth are not the same. Sustainable performance depends on the mix of products sold, procurement terms, customer demand, and the costs required to deliver each sale.',
    statTiles: [
      { value: '7', label: 'Key revenue activities', subtitle: 'Prescription sales to service-related revenue', description: 'Prescription sales, OTC sales, consumer healthcare sales, category contribution analysis, basket analysis, revenue forecasting and service-related revenue.' },
      { value: '23.4%', label: 'Long Chau gross margin in 2025', subtitle: 'Up from 22.2% in 2024, broker estimate', description: 'The share of revenue left after the cost of products sold.' },
      { value: '~30%', label: 'Margin a broker expects on high-value products such as Sybrava and Ozempic', subtitle: 'Broker expectation, not a result', description: 'Shows why mix matters: some products are expected to earn much more than average.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the margins are broker estimates and a broker expectation, and companies do not publish category-level margins, so they are indicative only.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retailers earn most of their revenue from selling medicines and other healthcare products. How much comes from prescription medicines, OTC products, supplements, devices and personal care depends on store format, customers, location and strategy, and some operators also earn from permitted healthcare services. Categories contribute differently to sales and gross profit: a high-volume category may not have the highest margin, and an attractive-margin product may sell slowly or need more inventory, so revenue must be read with product cost, turnover and operating needs.' },
      { label: 'Why it is happening', text: 'Each category has its own purchase frequency, price level, supplier terms and shelf life. A retailer that looks only at sales may overinvest in lines that sell well but earn little, or underinvest in lines that earn more but need patience.' },
      { label: 'Real-world example', text: 'A pharmacy earns from compliant dispensing of prescribed medicines and permitted OTC products; adds medical devices, supplements and personal care; compares sales, gross profit, inventory turnover and expiry risk across categories; studies which products are bought together without pushing unnecessary purchases; forecasts demand from history, seasons and demographics; and assesses permitted service revenue separately.' },
      { label: 'Vietnam example', text: 'Long Châu reported 2025 revenue of about VND 34.5 trillion, up about 36%, with a gross margin of 23.4% against 22.2% in 2024, and a broker describes medicines as roughly 60 to 70% of its sales. A broker expects margins of around 30% on high-value products such as Sybrava and Ozempic that Long Châu distributes through partnerships with Novo Nordisk and others. A third-party profile lists Pharmacity’s revenue as retail sales, e-commerce, corporate health sales and private-label products.' },
      { label: 'Business impact', text: 'Pharmacy revenue comes from a diverse product mix, but sales volume alone cannot determine commercial success. Category-level analysis helps retailers identify sustainable growth opportunities while accounting for stock requirements, margins, and customer needs.' },
    ],
    visualKind: 'pharmacy-m3-41-revenue', visualHeading: 'Seven sources and analyses behind pharmacy revenue',
    visualIntro: 'See seven revenue sources and analyses around pharmacy revenue and what each looks at.',
    imageAlt: 'Casemate orbit mind map of seven revenue sources and analyses in pharmacy retail',
    keyTerms: [
      { term: 'Gross margin', definition: 'Sales minus the cost of goods sold, as a share of sales.' },
      { term: 'Product mix', definition: 'The balance of product categories in a store’s sales.' },
      { term: 'Basket analysis', definition: 'Studying which products customers buy together.' },
      { term: 'Category contribution', definition: 'What a category adds to sales and gross profit after its costs and risks.' },
    ],
    recap: [
      'Most revenue comes from medicines and other healthcare products.',
      'The mix varies by format, customers, location and strategy.',
      'High sales do not guarantee high gross profit.',
      'Revenue must be read with cost, turnover and operating needs.',
    ],
    chapterRecap: 'Pharmacy revenue comes from a diverse product mix, but sales volume alone cannot determine commercial success. Category-level analysis helps retailers identify sustainable growth opportunities while accounting for stock requirements, margins, and customer needs.',
    deepDiveTitle: 'Why basket analysis needs a safety filter in pharmacy',
    body: <P3DeepDive paragraphs={[
      'In ordinary retail, finding products often bought together suggests where to place or promote them. In pharmacy, a pairing may reflect a medical need and should not be turned into an automatic upsell.',
      'A safety filter keeps analysis for planning and range decisions, and leaves recommendations to a pharmacist\u2019s judgement about the customer\u2019s situation.' ]} evidence="The seven activities are described qualitatively in the supplied material. Margins and revenue are from ACBS and GTJA broker reports, the mix description is from a broker report, and Pharmacity’s revenue lines are from a third-party profile; all are indicative and not audited." />,
    sources: citeP3('acbsFrt', 'frtReport2026', 'rongvietFrt', 'aktaPharmacity', 'kennoLongChau'),
  }),
  p3Chapter({
    title: 'Procurement, Labor, Occupancy and Operating Costs', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the main cost blocks of a pharmacy and explain why total cost to serve matters more than purchase price.',
    mateIntro: 'Stock has to be bought before it is sold, staff and rent are fixed, and compliance costs money. Together they decide how much of each sale is left as profit.',
    keyInsight: 'Cost competitiveness depends on more than negotiating lower purchase prices. Retailers must manage the total cost of serving customers, including labor, inventory handling, occupancy, technology, and compliance.',
    statTiles: [
      { value: '7', label: 'Key cost activities', subtitle: 'Procurement cost to store-level reporting', description: 'Procurement cost management, labour planning, occupancy, logistics efficiency, technology investment, compliance spending and store-level reporting.' },
      { value: '~VND 12M', label: 'Average monthly pay of a pharmacist at Long Chau', subtitle: 'Company statement, April 2025', description: 'Managers were quoted at VND 17–20 million a month.' },
      { value: '5,000', label: 'Pharmacy staff Long Chau planned to hire in 2025', subtitle: 'For 400–500 new pharmacies', description: 'Shows how much expansion depends on professional staff.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the pay and hiring figures are company statements to the press and describe one chain only.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail has a cost structure shaped by product procurement, staffing, locations, logistics, technology and regulatory compliance. Procurement is usually the largest cost because inventory must be bought before sales are made. Staffing reflects the need for pharmacists and other employees, and rent and utilities depend on store size, location and hours. Chains may invest in central distribution, systems, management and brand, while independents run smaller teams and simpler systems, but lower overhead does not guarantee lower total cost once purchasing terms, stock losses and efficiency are counted.' },
      { label: 'Why it is happening', text: 'A pharmacy must keep qualified people on site during opening hours, hold stock before it sells, and meet record and storage rules. These costs do not fall in proportion to sales, so utilisation of each store matters.' },
      { label: 'Real-world example', text: 'A buyer compares supplier terms, quality, reliability and delivery; schedules staff to traffic while keeping required professional cover; evaluates rent, visibility, access and the sales needed to support each outlet; coordinates warehouse, delivery and replenishment; assesses inventory software, point-of-sale and digital platforms; budgets for licensing, documents, training and quality controls; and compares expenses across outlets.' },
      { label: 'Vietnam example', text: 'FPT Long Châu told the press in April 2025 that pharmacists earn about VND 12 million a month on average and managers VND 17 to 20 million, and that it planned 400 to 500 new pharmacies and 80 vaccination centres needing 5,000 pharmacy staff. A 2023 broker report noted that provincial premises cost much less than big-city premises. For FRT as a whole, selling, general and administrative costs were about VND 8,696 billion on net sales of VND 51,083 billion in 2025, or about 17% (calculated), including FPT Shop.' },
      { label: 'Business impact', text: 'Procurement, staffing, occupancy, logistics, and compliance shape the economics of pharmacy retail. Effective cost management requires balancing efficiency with the professional staffing, product quality, and controls necessary for safe operations.' },
    ],
    visualKind: 'pharmacy-m3-42-costs', visualHeading: 'Seven cost areas that shape pharmacy economics',
    visualIntro: 'See seven cost areas branching from total cost to serve and how each is managed.',
    imageAlt: 'Casemate tree mind map of seven cost areas in pharmacy retail',
    keyTerms: [
      { term: 'Cost to serve', definition: 'The total cost of delivering a product and service to a customer.' },
      { term: 'Occupancy cost', definition: 'Rent and related costs of the premises.' },
      { term: 'SG&A', definition: 'Selling, general and administrative expenses.' },
      { term: 'Compliance cost', definition: 'The cost of licences, documents, training and quality controls.' },
    ],
    recap: [
      'Procurement is a major cost because stock is bought before it is sold.',
      'Staffing and occupancy depend on opening hours, size and location.',
      'Chains and independents have different overhead patterns.',
      'Total cost to serve, not purchase price alone, decides competitiveness.',
    ],
    chapterRecap: 'Procurement, staffing, occupancy, logistics, and compliance shape the economics of pharmacy retail. Effective cost management requires balancing efficiency with the professional staffing, product quality, and controls necessary for safe operations.',
    deepDiveTitle: 'Why a cheap supplier can raise total cost',
    body: <P3DeepDive paragraphs={[
      'A supplier with a low price but poor delivery causes stockouts, extra orders and wasted staff time. A supplier with long dates causes expiry losses. Both raise total cost even though the purchase price looks low.',
      'Comparing suppliers on fill rate, delivery accuracy and expiry profile as well as price gives a truer picture of cost.' ]} evidence="The seven cost activities are described qualitatively in the supplied material. Pay and hiring figures are company statements reported by VnExpress, the premises-cost point is from a 2023 broker report, and the SG&A ratio is calculated here from a broker report’s consolidated figures for FRT." />,
    sources: citeP3('vnexpressRecruit', 'kbsvFrt', 'frtReport2026', 'circular11'),
  }),
  p3Chapter({
    title: 'Inventory Economics, Profitability and Unit Economics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how inventory productivity and store-level economics determine pharmacy returns.',
    mateIntro: 'A pharmacy can have strong sales and still lose money if stock sits too long or new stores take too long to pay back.',
    keyInsight: 'Healthy pharmacy economics require a balance between product availability, inventory productivity, and store-level profitability. Maximizing stock or opening more outlets does not necessarily improve returns if inventory and operating costs grow faster than demand.',
    statTiles: [
      { value: '8', label: 'Key unit-economics activities', subtitle: 'Inventory turnover to working-capital control', description: 'Inventory turnover, expiry monitoring, stockout measurement, gross-margin analysis, store contribution, break-even, expansion evaluation and working-capital control.' },
      { value: '~6 months', label: 'Time management said a new Long Chau store needs to break even', subtitle: 'Management statement cited in 2023', description: 'A company statement for a period of rapid rural expansion.' },
      { value: '~2.1%', label: 'Long Chau net profit margin in 2025', subtitle: 'Press report', description: 'Shows how little of revenue becomes net profit even for the leading chain.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the break-even time is management’s own claim from 2023 and the net margin is a press report, so neither shows typical store results.',
    narrative: [
      { label: 'What it is', text: 'Inventory links the revenue and cost sides of pharmacy retail. Stock ties up working capital until it sells, and some products have short shelf lives or special storage needs. Excess inventory raises expiry risk and financing needs, while too little inventory loses sales and customer confidence. Unit economics assesses the financial performance of a single store or transaction: gross profit against labour, rent, logistics, stock losses and other costs, and chains may also look at how quickly a new store reaches acceptable results.' },
      { label: 'Why it is happening', text: 'Because margins are modest and stock is perishable, small changes in turnover, expiry loss or store sales have large effects on profit. That is why stores are judged one by one, not only in total.' },
      { label: 'Real-world example', text: 'A pharmacy measures how efficiently stock converts into sales; tracks products near expiry and follows procedures for expired or damaged stock; monitors unavailable products and lost sales; compares prices with cost across categories; weighs a store’s sales and gross profit against its labour, rent and utilities; estimates the sales needed to cover costs; evaluates demand, set-up cost and payback before opening; and aligns purchasing and replenishment with demand and supplier lead times.' },
      { label: 'Vietnam example', text: 'A 2023 broker report said Long Châu management expected new stores to break even in about six months, letting older stores fund new openings. In 2025 brokers estimate its gross margin at 23.4% and pre-tax profit at about VND 1,137 billion, while the press reports a net margin of about 2.1%; its average sales were about VND 1.2 billion per store per month. An Khang’s average of about VND 550 million came with a VND 112.96 billion loss and accumulated losses of VND 1,115.3 billion.' },
      { label: 'Business impact', text: 'Inventory productivity and unit economics are essential to sustainable pharmacy retail profitability. Retailers need to maintain adequate product availability while minimizing expiry losses, working-capital pressure, and unproductive operating expenditure.' },
    ],
    visualKind: 'pharmacy-m3-43-unit-economics', visualHeading: 'Long Chau’s margin ladder in 2025',
    visualIntro: 'Compare gross margin, calculated pre-tax margin and net margin as a share of revenue.',
    imageAlt: 'Casemate bar chart of Long Chau gross, pre-tax and net margins',
    keyTerms: [
      { term: 'Inventory turnover', definition: 'How quickly stock is sold and replaced over a period.' },
      { term: 'Break-even', definition: 'The sales level at which revenue covers costs.' },
      { term: 'Unit economics', definition: 'The financial performance of a single store, order or other unit.' },
      { term: 'Working capital', definition: 'The cash tied up in stock and day-to-day operations.' },
    ],
    recap: [
      'Inventory ties up working capital until sold, and some stock expires.',
      'Excess stock raises expiry and financing cost; too little loses sales and trust.',
      'Unit economics weighs a store’s gross profit against its own costs.',
      'More stock or more stores does not improve returns if costs outgrow demand.',
    ],
    chapterRecap: 'Inventory productivity and unit economics are essential to sustainable pharmacy retail profitability. Retailers need to maintain adequate product availability while minimizing expiry losses, working-capital pressure, and unproductive operating expenditure.',
    deepDiveTitle: 'A simple break-even calculation for a new pharmacy',
    body: <P3DeepDive paragraphs={[
      'Add monthly fixed costs such as rent, staff and utilities, then divide by the gross margin rate to estimate the monthly sales needed to cover them. If gross margin is about 23%, every VND 100 of costs needs roughly VND 435 of sales.',
      'Comparing that figure with realistic local demand shows quickly whether a site is worth opening, and how long working capital will stay tied up.' ]} evidence="The eight activities are described qualitatively in the supplied material. Margins and profit are from an ACBS broker report and a Vietnamese press report, break-even timing is management’s 2023 statement in a KB Securities report, and the pre-tax margin and the break-even example are simple calculations." />,
    sources: citeP3('acbsFrt', 'longChauNetMargin', 'kbsvFrt', 'longChauAvg2025', 'anKhang2025'),
  }),
];

const quiz = p3Quiz('pharmacy-m3-l4', [
  { chapter: '1', objective: 'Separate revenue growth from profit growth', question: 'Are revenue growth and gross-profit growth the same?', application: 'A pharmacy’s sales rise but gross profit does not. What does it show?', correct: 'No, sustainable performance depends on product mix, procurement terms, demand and the cost of each sale', wrong: ['Yes, always', 'Only in chains', 'Only for supplements'], explanation: 'Mix and cost matter. Review Chapter 1.' },
  { chapter: '1', objective: 'Use category analysis', question: 'Why compare categories on sales, gross profit, turnover and expiry risk?', application: 'A high-selling category earns little. What does analysis reveal?', correct: 'A high-volume category may not have the highest margin, and an attractive-margin product may sell slowly', wrong: ['All categories earn the same', 'Sales alone show profit', 'Expiry never matters'], explanation: 'Category contribution differs. Review Chapter 1.' },
  { chapter: '1', objective: 'Treat service revenue carefully', question: 'How should service revenue be treated?', application: 'A team assumes consultations will be a major income source. What is wiser?', correct: 'Assess permitted service revenue separately instead of assuming it is a major source of income', wrong: ['Assume it is large', 'Ignore it entirely', 'Merge it with product sales'], explanation: 'Do not overestimate services. Review Chapter 1.' },
  { chapter: '2', objective: 'State the main cost principle', question: 'What does cost competitiveness depend on?', application: 'A buyer focuses only on negotiating purchase prices. What is missing?', correct: 'Total cost of serving customers, including labour, handling, occupancy, technology and compliance', wrong: ['Only the lowest purchase price', 'Only the lowest rent', 'Only fewer staff'], explanation: 'Total cost matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain why procurement is a major cost', question: 'Why is procurement typically a major cost?', application: 'A new pharmacy needs stock before it opens. What does that show?', correct: 'Inventory must be purchased before sales are made', wrong: ['Stock is free until sold', 'Suppliers pay the pharmacy', 'Stock is not needed'], explanation: 'Cash goes out first. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognise overhead differences', question: 'Does lower organisational overhead guarantee lower total cost?', application: 'An independent has a small team. Is its total cost automatically lower?', correct: 'No, purchasing terms, stock losses and operating efficiency also matter', wrong: ['Yes, always', 'Yes, if rent is low', 'Yes, if there is no technology'], explanation: 'Total cost includes losses and terms. Review Chapter 2.' },
  { chapter: '3', objective: 'State the economics balance', question: 'What do healthy pharmacy economics require balancing?', application: 'A chain wants to hold large stock to avoid stockouts. What must it weigh?', correct: 'Product availability, inventory productivity and store-level profitability', wrong: ['Only availability', 'Only turnover', 'Only store count'], explanation: 'Balance prevents waste. Review Chapter 3.' },
  { chapter: '3', objective: 'Define unit economics', question: 'What does unit economics evaluate in a pharmacy?', application: 'A manager wants to judge one store. What should be compared?', correct: 'The financial performance of a store or transaction, comparing gross profit with labour, rent, logistics and stock losses', wrong: ['Only total company sales', 'Only brand value', 'Only the number of staff'], explanation: 'Store results matter. Review Chapter 3.' },
  { chapter: '3', objective: 'Warn about expansion', question: 'Why does opening more outlets not always improve returns?', application: 'A chain opens many stores but profit falls. What may explain it?', correct: 'Inventory and operating costs may grow faster than demand', wrong: ['More stores always lift profit', 'Costs never rise', 'Demand always follows stores'], explanation: 'Growth must pay back. Review Chapter 3.' },
  { chapter: '3', objective: 'Read margin context', question: 'What does a gross margin above 20% and a net margin near 2% suggest?', application: 'A leading chain reports these figures. What does it show?', correct: 'Most of the gross margin is absorbed by operating costs, so inventory and store productivity decide returns', wrong: ['Costs are negligible', 'Profit is guaranteed', 'Margins are the same at every level'], explanation: 'Costs absorb margin. Review Chapter 3.' },
]);

export const LESSON_P3_4: PharmacyM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain pharmacy revenue sources and product-mix economics, the cost blocks that shape profitability, and how inventory productivity and unit economics determine returns.',
    keyTakeaways: [
      'Revenue growth and gross-profit growth are not the same.',
      'Category-level analysis shows which lines earn their keep.',
      'Total cost to serve matters more than purchase price alone.',
      'Inventory productivity links availability, expiry risk and working capital.',
      'Store-level unit economics decide whether expansion creates value.',
    ],
    businessImplications: 'Analyse categories, not just sales; budget total cost to serve; manage inventory against expiry and cash; and test each new store’s break-even before opening.',
    remember: 'Margin is made or lost in inventory and store costs.',
    nextLesson: 'Distribution & Sales Channels',
  },
};
