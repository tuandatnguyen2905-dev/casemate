import { C1DeepDive, citeC1, c1Chapter, c1Quiz } from './coffeeM1Core';
import type { CoffeeM1LessonBundle } from './coffeeM1Core';

const LESSON = '5. Industry Drivers & External Factors';

const deck = [
  c1Chapter({
    title: 'Economic, Demographic, and Tourism Drivers', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how income, urbanisation, tourism and uncertainty shape foodservice demand and how operators should respond.',
    mateIntro: 'More people, more cities and more visitors mean more potential customers. Whether they spend depends on their confidence and budgets.',
    keyInsight: 'Economic growth expands the potential customer base, but consumer purchasing power and confidence determine how much of that potential becomes actual spending. Operators need to align prices, formats, and locations with the economic conditions of their target segments.',
    statTiles: [
      { value: '5', label: 'Key economic and demographic drivers', subtitle: 'Disposable income to economic uncertainty', description: 'Disposable income, urbanization, tourism, lifestyle changes and economic uncertainty.' },
      { value: '21.2M', label: 'International visitors to Vietnam in 2025', subtitle: 'National Authority of Tourism, up 20.4%', description: 'A record, and 17.8% above 2019.' },
      { value: '25M', label: 'International visitor target for 2026', subtitle: 'National Authority of Tourism', description: 'A target, not a forecast of actual arrivals.' },
    ],
    statsNote: 'The first tile is a count from this lesson; visitor numbers are official statistics reported by the press and the 2026 figure is a policy target.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice demand is influenced by household income, employment, urbanization, tourism, and the frequency with which consumers eat or drink outside the home. Growing urban activity can increase demand for convenient meals, café visits, social gatherings, and branded beverage experiences.' },
      { label: 'Why it is happening', text: 'Economic conditions also influence how customers allocate discretionary spending. Inflation and pressure on household budgets can encourage consumers to choose lower-priced products, reduce visit frequency, or reserve premium experiences for selected occasions. In Vietnam, tourism recovery provides an additional source of demand, particularly in major cities and destination markets.' },
      { label: 'Real-world example', text: 'Higher purchasing power supports premium drinks, specialty coffee and higher-value dining; dense residential and commercial areas support accessible cafés, takeaway outlets and quick-service formats; visitors support demand near hotels, transport hubs, attractions and shopping districts; busy schedules lift takeaway and delivery; and uncertainty makes customers more promotion-sensitive and drives them toward affordable brands or smaller purchases.' },
      { label: 'Vietnam example', text: 'Euromonitor says tourism rebounded strongly in 2025 and the cultural habit of eating out, especially among younger consumers, supported consumer foodservice, while rising inflation and operating costs, including labour, rent and ingredients, limited margins and made operators cautious about expansion. Vietnam received nearly 21.2 million international visitors in 2025, up 20.4% and 17.8% above 2019, with a 2026 target of 25 million. The iPOS.vn survey found 69.38% of businesses hit by higher raw-material costs and, in early 2026, nearly three times as many diners planning to cut eating-out spending as to raise it.' },
      { label: 'Business impact', text: 'Economic, demographic, and tourism conditions shape the volume and value of foodservice demand. Operators should use local purchasing power, customer traffic patterns, and occasion-based demand to guide site selection and pricing.' },
    ],
    visualKind: 'coffee-m1-51-economy', visualHeading: 'Five drivers of foodservice demand',
    visualIntro: 'See five economic and demographic drivers around the centre and what each guides.',
    imageAlt: 'Casemate orbit mind map of five economic, demographic and tourism drivers of foodservice demand',
    keyTerms: [
      { term: 'Disposable income', definition: 'Money households have left to spend after essentials.' },
      { term: 'Urbanisation', definition: 'The growth of cities and dense urban areas.' },
      { term: 'Promotion sensitivity', definition: 'How strongly customers respond to discounts.' },
      { term: 'Occasion-based demand', definition: 'Demand that depends on the moment and reason for a visit.' },
    ],
    recap: [
      'Income, urbanisation, tourism and habits drive potential demand.',
      'Confidence and purchasing power decide actual spending.',
      'Inflation can push customers to cheaper options or fewer visits.',
      'Match prices, formats and sites to local purchasing power.',
    ],
    chapterRecap: 'Economic, demographic, and tourism conditions shape the volume and value of foodservice demand. Operators should use local purchasing power, customer traffic patterns, and occasion-based demand to guide site selection and pricing.',
    deepDiveTitle: 'Why potential demand is not the same as spending',
    body: <C1DeepDive paragraphs={[
      'A district with many offices and visitors has potential customers, but if prices are above what they will pay, visits stay low. Site selection should look at purchasing power and traffic at the times the store is open.',
      'Testing a few price points and product sizes in a new area is a cheap way to find the level that converts potential into sales.' ]} evidence="The five drivers are described in the supplied material. Euromonitor points are from the publisher’s summary; tourism figures are from the National Authority of Tourism as reported by the Vietnam News Agency; survey findings are from the iPOS.vn and Nestlé Professional reports as reported by VCCI." />,
    sources: citeC1('euromonitorFoodservice', 'vnaTourism', 'vcciFnb2026', 'iposH12026'),
  }),
  c1Chapter({
    title: 'Consumer Preferences and Sociocultural Factors', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how culture, social habits and trends shape what customers buy and how operators should use them.',
    mateIntro: 'Coffee is part of daily life in Vietnam, and cafés are social spaces. Trends spread fast through social media, and fade just as fast.',
    keyInsight: 'Consumer relevance requires more than following trends. Sustainable differentiation comes from combining local taste preferences, a clear brand identity, consistent product quality, and an experience that customers consider worth repeating.',
    statTiles: [
      { value: '5', label: 'Key sociocultural factors', subtitle: 'Local taste to trend responsiveness', description: 'Local taste adaptation, social consumption, lifestyle positioning, health and ingredient awareness, and trend responsiveness.' },
      { value: '14.24%', label: 'Diners who had not tried any current trend in early 2026', subtitle: 'iPOS.vn and Nestlé Professional', description: 'Most diners are experimenters.' },
      { value: '15.82% vs 25.64%', label: 'Beverage versus food outlets recording growth in early 2026', subtitle: 'iPOS.vn and Nestlé Professional', description: 'Growth was uneven between categories.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the other two are first-half 2026 survey results and show participation and growth among surveyed outlets, not market totals.',
    narrative: [
      { label: 'What it is', text: 'Food and beverage consumption is strongly shaped by culture, social habits, lifestyle aspirations, and evolving expectations of quality. In Vietnam, coffee is embedded in everyday routines, while cafés also function as social venues, informal meeting spaces, and environments for studying or working.' },
      { label: 'Why it is happening', text: 'Consumers increasingly encounter new beverage concepts, international food trends, and specialty products through social media and travel. These influences create opportunities for innovation, but they can also accelerate changes in customer preferences and shorten the commercial lifespan of trend-driven products.' },
      { label: 'Real-world example', text: 'Operators offer Vietnamese coffee styles and familiar flavours; design spaces and menus for groups, informal meetings and shared dining; build environments for work, study, relaxation or social-media sharing; respond to interest in ingredient transparency, customisation and lower-sugar options; and test seasonal drinks and new food concepts before a large rollout.' },
      { label: 'Vietnam example', text: 'Vietnamese coffee habits date back to the French introduction of coffee in 1857 and are carried by family-run sidewalk cafés. In the first half of 2026 the iPOS.vn survey found only 14.24% of diners had not tried any current trend, ranked ultra-cheap fixed-price drinks first at 39.19%, and named the multi-purpose café where customers can work and connect a leading beverage trend. Imported concepts have not all fitted: Café Amazon left in November 2025 and Mixue was reported to be scaling back. The sources reviewed give no Vietnam figures on lower-sugar or ingredient-transparency demand, so none are stated.' },
      { label: 'Business impact', text: 'Sociocultural factors influence what consumers buy, where they go, and how they evaluate brands. Businesses should use customer insight to guide innovation while avoiding excessive dependence on short-lived trends.' },
    ],
    visualKind: 'coffee-m1-52-culture', visualHeading: 'Five sociocultural factors and operator responses',
    visualIntro: 'Read five factors with what customers look for and how operators respond.',
    imageAlt: 'Casemate table of five sociocultural factors in Vietnamese café consumption and how operators respond',
    keyTerms: [
      { term: 'Local taste adaptation', definition: 'Offering styles and flavours that suit local preferences.' },
      { term: 'Social consumption', definition: 'Buying drinks and food for groups, meetings or shared occasions.' },
      { term: 'Trend responsiveness', definition: 'Testing new products quickly before a large rollout.' },
      { term: 'Multi-purpose café', definition: 'A café designed for work, social connection and relaxation together.' },
    ],
    recap: [
      'Culture and social habits shape what and where customers buy.',
      'Social media and travel speed up trend change.',
      'Trend-driven products can have a short life.',
      'Lasting differentiation needs taste, identity, quality and experience.',
    ],
    chapterRecap: 'Sociocultural factors influence what consumers buy, where they go, and how they evaluate brands. Businesses should use customer insight to guide innovation while avoiding excessive dependence on short-lived trends.',
    deepDiveTitle: 'A low-risk way to test a trend',
    body: <C1DeepDive paragraphs={[
      'Before rolling a new seasonal drink across a network, an operator can offer it in a few stores for a limited period and watch repeat purchases, not only first-time sales.',
      'If customers return for it, it may deserve a permanent place; if not, little has been lost.' ]} evidence="The five factors are described in the supplied material. Survey findings are from the iPOS.vn and Nestlé Professional first-half 2026 report; coffee history is from International Coffee Organization and Columbia Business School sources; the Café Amazon and Mixue items are from VnExpress International." />,
    sources: citeC1('iposH12026', 'icoVietnam', 'columbiaTrungNguyen', 'vnexpressChains', 'vietnambizChains'),
  }),
  c1Chapter({
    title: 'Technology, Regulation, and Environmental Pressures', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain how technology, compliance and cost pressures affect operations and why systems must keep up with growth.',
    mateIntro: 'Behind every smooth coffee order are systems, licences and supply chains. When they fail, cost, safety and trust suffer together.',
    keyInsight: 'Technology and compliance are not merely support functions. They influence cost control, customer trust, operational resilience, and the ability to expand. Businesses that scale without adequate systems can face greater inconsistency, waste, and compliance risk.',
    statTiles: [
      { value: '6', label: 'Key technology and compliance pressures', subtitle: 'Digital infrastructure to operational resilience', description: 'Digital infrastructure, food safety and hygiene, cost inflation, environmental management, data governance and operational resilience.' },
      { value: '57.11%', label: 'Operators concerned about e-invoicing and standardised tax rules', subtitle: 'iPOS.vn and Nestlé Professional, via VCCI', description: 'Compliance is a widely felt pressure.' },
      { value: '20 working days', label: 'Processing time for a food-safety compliance certificate application', subtitle: 'Official procedure summary', description: 'A reminder that licensing takes time to plan for.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the survey share is a press-reported finding and the processing time is from a legal procedure summary, so check current requirements with the local authority.',
    narrative: [
      { label: 'What it is', text: 'Technology is reshaping how foodservice businesses manage orders, payments, customer data, inventory, labor, and marketing. Digital platforms increase customer reach, while point-of-sale systems and analytics improve visibility into product performance and operating costs.' },
      { label: 'Why it is happening', text: 'External pressures extend beyond technology. Food safety requirements, business licensing, labor conditions, rent, utility expenses, packaging waste, and fluctuations in coffee and food ingredient prices can materially affect performance. Vietnam’s foodservice sector has increasingly emphasized operational discipline and regulatory compliance as the market matures.' },
      { label: 'Real-world example', text: 'An operator integrates point of sale, online ordering, payments, loyalty and reporting; keeps safe storage, preparation, sanitation, traceability and staff training; manages changes in the cost of beans, dairy, produce, packaging, utilities, labour and rent; cuts food waste and optimises packaging; handles customer information with proper controls; and develops alternative suppliers and plans for disruption.' },
      { label: 'Vietnam example', text: 'Vietnam’s consolidated Law on Food Safety sets conditions for premises that prepare and serve food and drink, including water, waste handling, storage and the health and training of food handlers, and the certificate file for a food-service establishment includes a health confirmation for the owner and handlers and a trained-staff list. Decree 70/2025/ND-CP, effective 1 June 2025, extended point-of-sale e-invoices to qualifying restaurants, and a secondary source reports that Decree 254/2026/ND-CP replaced it from 1 July 2026, so current rules should be checked. In the iPOS.vn survey 57.11% of operators worried about e-invoicing and tax rules and 69.38% faced higher raw-material costs. The sources reviewed give no Vietnam figures on foodservice packaging waste or data-protection enforcement, so none are stated.' },
      { label: 'Business impact', text: 'Technology, regulation, and environmental pressures influence both daily operations and long-term competitiveness. Strong systems help operators control costs, maintain safety, protect trust, and build a more resilient business.' },
    ],
    visualKind: 'coffee-m1-53-pressures', visualHeading: 'Six technology, regulatory and environmental pressures',
    visualIntro: 'See six pressures branching from the centre and what each protects.',
    imageAlt: 'Casemate tree mind map of six technology, regulatory and environmental pressures on foodservice operators',
    keyTerms: [
      { term: 'Point-of-sale e-invoice', definition: 'An electronic invoice issued from a cash register connected to the tax authority.' },
      { term: 'Traceability', definition: 'The ability to follow ingredients back to their source.' },
      { term: 'Data governance', definition: 'Rules and controls for handling customer information.' },
      { term: 'Operational resilience', definition: 'The ability to keep operating through supplier or system disruption.' },
    ],
    recap: [
      'Technology improves reach and visibility into costs and products.',
      'Licensing, food safety, rent, utilities, packaging and ingredient prices all matter.',
      'Compliance is rising as the market matures.',
      'Scaling without systems raises inconsistency, waste and risk.',
    ],
    chapterRecap: 'Technology, regulation, and environmental pressures influence both daily operations and long-term competitiveness. Strong systems help operators control costs, maintain safety, protect trust, and build a more resilient business.',
    deepDiveTitle: 'Why compliance is a growth issue, not just a legal one',
    body: <C1DeepDive paragraphs={[
      'A new store cannot open until its licences and food-safety certificate are in place, and a chain with weak records may face delays as it adds outlets. Compliance therefore sets the pace of expansion.',
      'Building licence, health-certificate and training records into the opening checklist for every new store turns compliance into a repeatable routine.' ]} evidence="The six pressures are described in the supplied material. Legal points are from the consolidated Law on Food Safety, a government procedure summary and Decree 70/2025/ND-CP, with a secondary accounting-software source on its replacement; survey figures are from the iPOS.vn and Nestlé Professional report as reported by VCCI." />,
    sources: citeC1('foodSafetyLaw', 'foodSafetyCertificate', 'decree70', 'decree70Review', 'vcciFnbEnglish', 'vcciFnb2026'),
  }),
];

const quiz = c1Quiz('coffee-m1-l5', [
  { chapter: '1', objective: 'State what economic growth does', question: 'What does economic growth expand?', application: 'The economy is growing. What does it enlarge, and what decides spending?', correct: 'The potential customer base; purchasing power and confidence decide actual spending', wrong: ['Guaranteed sales', 'Fixed prices', 'Only tourism'], explanation: 'Potential is not spending. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe inflation’s effect', question: 'How can inflation change customer behaviour?', application: 'Prices rise across the economy. What may customers do?', correct: 'Choose lower-priced products, reduce visits or reserve premium for selected occasions', wrong: ['Buy more premium daily', 'Stop all consumption', 'Ignore prices'], explanation: 'Budgets tighten. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the tourism figure', question: 'About how many international visitors did Vietnam receive in 2025?', application: 'A planner sizes tourist demand. What is the figure?', correct: 'Nearly 21.2 million', wrong: ['About 2.1 million', 'About 212 million', 'About 12 million'], explanation: 'A record year. Review Chapter 1.' },
  { chapter: '1', objective: 'Align strategy to economy', question: 'What should operators align with the economic conditions of their segments?', application: 'A chain plans a new area. What should match local income?', correct: 'Prices, formats and locations', wrong: ['Logos only', 'Opening dates only', 'Supplier names only'], explanation: 'Fit to purchasing power. Review Chapter 1.' },
  { chapter: '2', objective: 'State what relevance requires', question: 'What does consumer relevance require beyond following trends?', application: 'A brand chases every viral drink. What is missing?', correct: 'Local taste, a clear identity, consistent quality and a repeat-worthy experience', wrong: ['More trends', 'Lower quality', 'No identity'], explanation: 'Substance lasts. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain trend risk', question: 'How can social media and travel affect products?', application: 'A trending drink peaks and fades. Why?', correct: 'They accelerate changes in preferences and can shorten the life of trend-driven products', wrong: ['They lengthen all product lives', 'They stop innovation', 'They remove competition'], explanation: 'Trends move fast. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply low-risk testing', question: 'How can operators test a new seasonal drink?', application: 'A brand has an untested idea. What is safer than a full launch?', correct: 'Test it in a few stores before committing to a large rollout', wrong: ['Launch everywhere at once', 'Never test', 'Copy a rival exactly'], explanation: 'Limit the downside. Review Chapter 2.' },
  { chapter: '3', objective: 'State technology and compliance’s role', question: 'What are technology and compliance beyond support functions?', application: 'A founder treats licences as paperwork. What is the better view?', correct: 'Factors that influence cost control, trust, resilience and the ability to expand', wrong: ['Irrelevant costs', 'Only marketing tools', 'Only legal formalities'], explanation: 'They shape growth. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a scaling risk', question: 'What can businesses that scale without adequate systems face?', application: 'A chain adds stores faster than systems. What follows?', correct: 'Greater inconsistency, waste and compliance risk', wrong: ['Lower costs', 'No risk', 'Guaranteed quality'], explanation: 'Systems must keep up. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a survey share', question: 'What share of surveyed operators were concerned about e-invoicing and standardised tax rules?', application: 'A consultant reports compliance concerns. What does the survey show?', correct: '57.11%', wrong: ['5.7%', '11.57%', '95%'], explanation: 'Compliance is widely felt. Review Chapter 3.' },
]);

export const LESSON_C1_5: CoffeeM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how economic, social, technological and regulatory factors shape demand and operations in coffeehouse and foodservice retail.',
    keyTakeaways: [
      'Economic growth expands potential demand, but confidence decides spending.',
      'Tourism and urbanisation add demand in specific places.',
      'Relevance needs more than following trends.',
      'Technology and compliance shape cost, trust and the ability to expand.',
      'Scaling without systems raises inconsistency, waste and compliance risk.',
    ],
    businessImplications: 'Match prices and sites to local purchasing power, test trends before scaling and build compliance and systems into every opening.',
    remember: 'Demand opens the door; systems keep you in the room.',
    nextLesson: 'How Value Moves Through the Industry',
  },
};
