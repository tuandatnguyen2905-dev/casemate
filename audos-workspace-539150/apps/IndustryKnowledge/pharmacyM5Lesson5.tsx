import { P5DeepDive, citeP5, p5Chapter, p5Quiz } from './pharmacyM5Core';
import type { PharmacyM5LessonBundle } from './pharmacyM5Core';

const LESSON = '5. Growth Outlook & Strategic Opportunities';

const deck = [
  p5Chapter({
    title: 'Market Growth and Expansion Potential', chapterTitle: LESSON, readingTime: '7',
    objective: 'Assess the growth outlook for pharmacy retail and separate structural potential from guaranteed results.',
    mateIntro: 'Demand is rising and organised retail is still small. That is an opportunity, but history is not a promise for any single retailer.',
    keyInsight: 'The market offers opportunities for continued growth, particularly as organized pharmacy retail develops. However, the most attractive growth opportunities will be those that combine customer demand with sustainable store economics and operational capability.',
    statTiles: [
      { value: '7', label: 'Key growth activities', subtitle: 'Demand assessment to market monitoring', description: 'Market-demand assessment, modern retail expansion, regional growth, store productivity improvement, product availability, financial discipline and market monitoring.' },
      { value: '~14%', label: 'Estimated share of modern pharmacies in the market in 2024', subtitle: 'Vietcap estimate', description: 'Leaves considerable room for organised retail to grow.' },
      { value: '16.53%', label: 'Projected share of Vietnam’s population aged 60 and over in 2029', subtitle: 'UNFPA medium projection', description: 'A projection that supports long-term healthcare demand.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other two are a broker estimate and a medium-variant projection, not forecasts of any retailer’s results.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s pharmacy retail market has long-term growth potential supported by healthcare demand, pharmaceutical consumption, and the gradual expansion of organized retail chains. As customers seek convenient access to medicines and healthcare products, pharmacy operators have opportunities to improve store coverage, service quality, and product availability. The development of modern chains may also increase the level of standardization across parts of the market.' },
      { label: 'Why it is happening', text: 'Industry research published in 2025 reported that Vietnam’s pharmaceutical market had grown over the 2020–2024 period, with retail pharmaceutical sales and hospital pharmaceutical sales both contributing to market development. MBS Research also highlighted the relatively low penetration of modern pharmacy chains as an opportunity for further organization and expansion. These historical trends support a positive structural outlook, but they should not be interpreted as a guarantee of future growth for every retailer.' },
      { label: 'Real-world example', text: 'A retailer analyses consumption, local needs, demographics and buying patterns; looks for underserved locations that organised stores could serve better; expands only where demand, suppliers and staff support operations; improves existing stores before opening new ones; fixes assortment and replenishment to capture unmet demand; checks expected sales, cost, investment and payback; and keeps industry forecasts apart from reported company results.' },
      { label: 'Vietnam example', text: 'Vietcap estimates that modern pharmacies held about 14% of the market in 2024, KIS counted 3,475 modern pharmacies in the second quarter of 2025, and about 95% of more than 50,000 outlets are traditional. UNFPA’s medium projection puts people aged 60 and over at 16.53% of the population in 2029. Market-size estimates for Vietnam differ by publisher because they define the market differently, so they are not combined here, and forecasts such as OTC projections are labelled as forecasts.' },
      { label: 'Business impact', text: 'Vietnam’s pharmacy retail market has structural growth potential as healthcare demand and organized retail develop. Retailers will be best positioned to benefit when expansion is supported by local demand, efficient operations, and sustainable financial performance.' },
    ],
    visualKind: 'pharmacy-m5-51-growth', visualHeading: 'Seven ways to turn growth into results',
    visualIntro: 'See seven growth activities around the centre and the question each answers.',
    imageAlt: 'Casemate orbit mind map of seven ways to turn market growth into store results',
    keyTerms: [
      { term: 'Structural growth', definition: 'Growth supported by lasting changes such as ageing and organised retail.' },
      { term: 'Penetration', definition: 'The share of a market held by a type of retailer.' },
      { term: 'Payback period', definition: 'The time a new store takes to recover its investment.' },
      { term: 'Forecast', definition: 'An estimate of the future, as opposed to a reported result.' },
    ],
    recap: [
      'Demand and organised retail support long-term growth.',
      'Past growth is not a guarantee for every retailer.',
      'Improve existing stores before relying on new ones.',
      'Keep forecasts separate from reported results.',
    ],
    chapterRecap: 'Vietnam’s pharmacy retail market has structural growth potential as healthcare demand and organized retail develop. Retailers will be best positioned to benefit when expansion is supported by local demand, efficient operations, and sustainable financial performance.',
    deepDiveTitle: 'How to read a market forecast without over-trusting it',
    body: <P5DeepDive paragraphs={[
      'A forecast is built on assumptions about demand, prices and competition. It is useful for direction, but a single retailer’s results depend on its own stores, costs and execution.',
      'Compare the forecast with what companies have actually reported, note the date and definition, and treat the gap as a question to investigate.' ]} evidence="The seven activities are described in the supplied material. The 14% share is a Vietcap estimate; the 3,475 count is from a KIS review; the traditional share is from Vietcap research; the ageing figure is a UNFPA medium projection. The brief names an MBS Research report that could not be retrieved, so Vietcap and KIS are used instead." />,
    sources: citeP5('vietcapFrt', 'vietcapTraditional', 'kisRetail2q25', 'unfpaAgeing', 'imarcRetail', 'vneconomyPharma'),
  }),
  p5Chapter({
    title: 'Strategic Opportunities in Digitalization, Services and Customer Experience', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify digital and service opportunities and how to judge whether each one pays.',
    mateIntro: 'Digital tools and better service can set a pharmacy apart, but only if they are measured. A feature nobody uses is simply cost.',
    keyInsight: 'The greatest opportunity is to integrate technology with pharmacy operations and professional service. Digital tools should improve availability, efficiency, and customer confidence rather than become costly features without measurable benefits.',
    statTiles: [
      { value: '8', label: 'Key digital and service activities', subtitle: 'Inventory digitalization to ROI measurement', description: 'Inventory digitalization, customer-facing platforms, omnichannel service, data-driven decisions, professional service development, customer relationship management, operational automation and return-on-investment measurement.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most violations of the data protection law', subtitle: 'Personal Data Protection Law 2025, Article 8', description: 'Shows the cost of handling customer data carelessly.' },
      { value: '28M', label: 'Customers and families Long Châu said it served in July 2025', subtitle: 'Company statement', description: 'The scale at which customer data and digital service must work.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the fine is a legal summary, so check the law for exceptions, and the customer figure is a company statement.',
    narrative: [
      { label: 'What it is', text: 'Digitalization creates opportunities for pharmacy retailers to improve inventory management, customer communication, order processing, and service accessibility. Digital tools can help customers find eligible products and obtain service information, while integrated inventory systems can support more accurate replenishment and better coordination between stores. These improvements may be especially valuable for chains managing large networks.' },
      { label: 'Why it is happening', text: 'Retailers can also develop their service proposition through better product education, appropriate medication-use support, and more convenient customer journeys. These opportunities require suitable technology, qualified staff, responsible use of customer information, and compliance with the rules governing medicine dispensing and digital transactions.' },
      { label: 'Real-world example', text: 'A retailer digitalises stock to improve accuracy, expiry monitoring and replenishment; builds an app with accurate information and eligible online ordering; connects digital inquiries to store operations; uses sales and inventory data to refine range and forecasts; trains staff and educates customers within professional scope; sends relevant reminders with privacy safeguards; automates routine admin while keeping regulated tasks supervised; and measures the effect on availability, productivity, satisfaction and cost.' },
      { label: 'Vietnam example', text: 'Long Châu said in July 2025 that it served 28 million customers and families, runs a VNeID-based online purchase service, and operates a 2025 warehouse system that automates replenishment. Pharmacity announced digital partnerships in 2025, according to a market research summary. The Personal Data Protection Law, effective 1 January 2026, covers health information in Article 26 and sets maximum administrative fines in Article 8, and Circular 11/2025 adds IT connection duties from 1 January 2026, so digital investment carries compliance costs as well as benefits.' },
      { label: 'Business impact', text: 'Digitalization and service improvement offer opportunities to strengthen pharmacy retail competitiveness. The strongest initiatives connect technology to measurable operational and customer outcomes while maintaining professional standards and regulatory compliance.' },
    ],
    visualKind: 'pharmacy-m5-52-digital', visualHeading: 'Eight digital and service opportunities',
    visualIntro: 'See eight opportunities as cards and how each can be measured.',
    imageAlt: 'Casemate cards of eight digital and service opportunities for pharmacy retailers',
    keyTerms: [
      { term: 'Inventory digitalization', definition: 'Using systems to keep stock records accurate and current.' },
      { term: 'Customer relationship management', definition: 'Managing customer contact and reminders with privacy safeguards.' },
      { term: 'Operational automation', definition: 'Automating routine administrative tasks.' },
      { term: 'Return on investment', definition: 'The benefit gained compared with the money spent.' },
    ],
    recap: [
      'Digital tools improve stock, communication and coordination.',
      'Service quality depends on trained staff and responsible data use.',
      'Regulated activities stay under professional oversight.',
      'Measure every investment against clear outcomes.',
    ],
    chapterRecap: 'Digitalization and service improvement offer opportunities to strengthen pharmacy retail competitiveness. The strongest initiatives connect technology to measurable operational and customer outcomes while maintaining professional standards and regulatory compliance.',
    deepDiveTitle: 'A simple test for any digital investment',
    body: <P5DeepDive paragraphs={[
      'Before buying a system, state the problem it should solve and the number that should change, such as stock accuracy, fulfilment rate or time saved. Without that, success cannot be judged.',
      'After launch, compare the measure with the baseline and the full running cost, including compliance and training.' ]} evidence="The eight activities are described in the supplied material. Customer figures and warehouse details are company statements; the online service and partnerships are from a market research summary; legal items are from the 2025 Personal Data Protection Law and Circular 11/2025 as summarised in English translations." />,
    sources: citeP5('vietnamnetLongChau', 'longChauWms', 'techsciEpharmacy', 'pdplLaw', 'circular11'),
  }),
  p5Chapter({
    title: 'Strategic Positioning and Long-Term Competitive Priorities', chapterTitle: LESSON, readingTime: '8',
    objective: 'Match a retailer’s strategy to its model and set the priorities and measures that will matter over the long term.',
    mateIntro: 'Not every retailer should chase every trend. The strongest plans choose a position and build the capabilities to hold it.',
    keyInsight: 'A sustainable competitive strategy requires a clear position in the market and the capability to deliver it consistently. The objective is not to adopt every industry trend, but to invest in the capabilities that create durable customer value and profitable operations.',
    statTiles: [
      { value: '9', label: 'Key strategic priorities', subtitle: 'National-chain strategy to strategic review', description: 'National-chain, regional-chain and independent-pharmacy strategy, digital investment priorities, portfolio development, risk management, capability development, performance measurement and strategic review.' },
      { value: '2,000–2,300', label: 'Stores Pharmacity targets by 2030', subtitle: 'The Investor', description: 'A selective path compared with its earlier 5,000-store ambition.' },
      { value: '+500', label: 'Stores Pharmacity plans over three years', subtitle: 'CafeF report', description: 'Tied to new store cohorts reaching break-even.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the Pharmacity figures are plans reported by the press and may change.',
    narrative: [
      { label: 'What it is', text: 'Future growth will not benefit all pharmacy retailers equally. Large chains may be able to leverage procurement scale, brand recognition, integrated systems, and network coverage. Regional chains may focus on local market density and operational specialization, while independent pharmacies can differentiate themselves through neighborhood accessibility, established relationships, and responsive service.' },
      { label: 'Why it is happening', text: 'Retailers therefore need to identify which capabilities match their resources and customer segments. Expansion, digital transformation, product diversification, and service development should be prioritized according to their potential contribution to long-term performance. Businesses must also prepare for competitive pressure, regulatory changes, supply-chain risks, and changing customer expectations.' },
      { label: 'Real-world example', text: 'A national chain improves network productivity, buying efficiency and integrated services; a regional chain concentrates resources where local knowledge and density help; an independent strengthens relationships, stock and cost discipline; each picks digital systems that solve identifiable problems, grows its range based on demand and capacity, monitors rules, suppliers, staff and store-level exposure, builds people and systems, tracks profit, turnover, availability, satisfaction and compliance, and reviews its model regularly.' },
      { label: 'Vietnam example', text: 'Pharmacity now targets 2,000 to 2,300 stores by 2030 instead of 5,000 by 2025 and plans 500 more stores over three years as new cohorts break even, An Khang stresses store quality and slower expansion, and Long Châu pairs 2,417 pharmacies with store productivity and automated warehouse replenishment. Trung Sơn Pharma, with Dongwha’s 51% stake, concentrates on the south, while about 95% of more than 50,000 outlets remain traditional and pharmacist density was 3.41 per 10,000 in 2016 data against a 2025–2030 target of 4.0.' },
      { label: 'Business impact', text: 'Long-term competitiveness will depend on the ability to align market positioning with operational capability. Retailers that invest selectively, manage risk, and deliver consistent value will be better placed to benefit from industry development.' },
    ],
    visualKind: 'pharmacy-m5-53-positioning', visualHeading: 'Nine long-term priorities',
    visualIntro: 'Read nine priorities with their focus and how to measure each.',
    imageAlt: 'Casemate table of nine long-term strategic priorities for pharmacy retailers',
    keyTerms: [
      { term: 'Strategic positioning', definition: 'The clear place a business chooses in the market.' },
      { term: 'Portfolio development', definition: 'Expanding product categories according to demand and capability.' },
      { term: 'Capability development', definition: 'Building people, systems and quality assurance.' },
      { term: 'Strategic review', definition: 'Reassessing the model as conditions change.' },
    ],
    recap: [
      'Growth will not benefit all retailers equally.',
      'National, regional and independent models need different strategies.',
      'Prioritise investments by their contribution to long-term performance.',
      'Review the model regularly as conditions change.',
    ],
    chapterRecap: 'Long-term competitiveness will depend on the ability to align market positioning with operational capability. Retailers that invest selectively, manage risk, and deliver consistent value will be better placed to benefit from industry development.',
    deepDiveTitle: 'Why choosing not to follow a trend is also a strategy',
    body: <P5DeepDive paragraphs={[
      'A small independent that skips an expensive app and instead improves stock availability and personal service has made a strategic choice. What matters is that the choice fits its customers and resources.',
      'Writing down what the business will not do keeps limited money and attention on the capabilities that create lasting value.' ]} evidence="The nine priorities are described in the supplied material. Pharmacity figures are from The Investor, CafeF and a company press release; An Khang and Long Châu items are from Vietnamese financial news and company reports; the traditional share is from Vietcap research and pharmacist density is from a peer-reviewed article." />,
    sources: citeP5('investorPharmacity', 'cafefPharmacity', 'pharmacityPress', 'anKhang2025', 'fptRetail2025', 'vnexpressGs25', 'vietcapTraditional', 'pensoftPharmacists'),
  }),
];

const quiz = p5Quiz('pharmacy-m5-l5', [
  { chapter: '1', objective: 'Read historical trends carefully', question: 'How should past market growth be interpreted?', application: 'A report shows growth from 2020 to 2024. What can be concluded?', correct: 'It supports a positive structural outlook but is not a guarantee for every retailer', wrong: ['It guarantees profit for all', 'It proves growth will stop', 'It is irrelevant'], explanation: 'History is not a promise. Review Chapter 1.' },
  { chapter: '1', objective: 'Choose the best growth opportunities', question: 'Which growth opportunities are the most attractive?', application: 'Two sites are available. Which is better?', correct: 'Those combining customer demand with sustainable store economics and operational capability', wrong: ['Any with low rent', 'Any in a big city', 'Any a rival has left'], explanation: 'Demand alone is not enough. Review Chapter 1.' },
  { chapter: '1', objective: 'Improve before expanding', question: 'What should a retailer do before relying only on new-store openings?', application: 'A chain wants more sales. What comes first?', correct: 'Improve the effectiveness of existing outlets', wrong: ['Close all stores', 'Raise all prices', 'Stop monitoring'], explanation: 'Productivity first. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate forecasts from results', question: 'How should industry forecasts be treated?', application: 'A slide shows a growth forecast beside company results. What should be done?', correct: 'Distinguish forecasts from reported results', wrong: ['Treat them as results', 'Ignore company data', 'Average them'], explanation: 'Dates and definitions matter. Review Chapter 1.' },
  { chapter: '2', objective: 'State the greatest digital opportunity', question: 'What is the greatest opportunity in digitalisation?', application: 'A board reviews its tech plan. What should it aim for?', correct: 'Integrating technology with pharmacy operations and professional service', wrong: ['Adding as many features as possible', 'Replacing pharmacists', 'Copying rivals'], explanation: 'Integration creates value. Review Chapter 2.' },
  { chapter: '2', objective: 'Test a digital investment', question: 'What should a digital tool improve to be worthwhile?', application: 'A team debates buying a new system. What test should it use?', correct: 'Availability, efficiency and customer confidence in a measurable way', wrong: ['Only novelty', 'Only the logo', 'Only the screen size'], explanation: 'Measure benefits. Review Chapter 2.' },
  { chapter: '2', objective: 'Keep regulated activities supervised', question: 'What should stay under professional oversight when routine tasks are automated?', application: 'A pharmacy automates admin. What must remain supervised?', correct: 'Regulated activities', wrong: ['Stock labels only', 'Marketing only', 'Nothing'], explanation: 'Oversight protects patients. Review Chapter 2.' },
  { chapter: '3', objective: 'State what a sustainable strategy needs', question: 'What does a sustainable competitive strategy require?', application: 'A retailer lists many trends. What should it do?', correct: 'A clear market position and the capability to deliver it consistently', wrong: ['Adopt every trend', 'Copy the market leader', 'Avoid change entirely'], explanation: 'Selection and capability. Review Chapter 3.' },
  { chapter: '3', objective: 'Match strategy to model', question: 'How can independent pharmacies differentiate themselves?', application: 'A neighbourhood pharmacy plans its position. What can it emphasise?', correct: 'Neighbourhood accessibility, established relationships and responsive service', wrong: ['Nationwide buying power', 'A national brand', 'The largest network'], explanation: 'Local strengths. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Pharmacity’s revised target', question: 'What store target does Pharmacity now state for 2030?', application: 'A report cites its plan. What is it?', correct: '2,000 to 2,300 stores, instead of its earlier 5,000 by 2025', wrong: ['5,000 by 2025', 'Fewer than 500', 'No target'], explanation: 'It moved to selective expansion. Review Chapter 3.' },
]);

export const LESSON_P5_5: PharmacyM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can assess the growth outlook for pharmacy retail, identify digital and service opportunities, and set long-term priorities that match a retailer’s model and capabilities.',
    keyTakeaways: [
      'The market has structural growth potential, but growth is not guaranteed for every retailer.',
      'The best growth combines demand with sustainable store economics.',
      'Integrate technology with operations and professional service, and measure results.',
      'National chains, regional chains and independents need different strategies.',
      'Invest in durable capabilities rather than every trend.',
    ],
    businessImplications: 'Improve existing stores first, expand where economics and capability support it, measure every digital investment and review your position regularly.',
    remember: 'Choose a position, then build the capability to hold it.',
    nextLesson: 'Back to the module overview',
  },
};
