import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '4. Downstream Activities';

const deck = [
  c2Chapter({
    title: 'Store Operations and Food & Beverage Preparation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the daily operating cycle of a store and what decides its productivity.',
    mateIntro: 'The store is where a purchase order becomes a drink. How the team, equipment and menu fit together decides how many customers it can serve well.',
    keyInsight: 'Store productivity depends on aligning people, equipment, menus, and workflows with customer demand. Standardized recipes and procedures are most effective when combined with sufficient staff training and a layout that supports efficient preparation.',
    statTiles: [
      { value: '6', label: 'Key store operating activities', subtitle: 'Opening preparation to store performance control', description: 'Opening preparation, beverage production, food preparation, workflow management, cleaning and sanitation, and store performance control.' },
      { value: '300–400 vs 600–800', label: 'Cups a day at a typical store versus leading chains', subtitle: 'Momentum Works, via VnExpress', description: 'Throughput varies widely between operators.' },
      { value: 'VND 5.31M', label: 'Minimum monthly wage in Region I from 1 January 2026', subtitle: 'Decree 293/2025/ND-CP, up 7.2% on average', description: 'Labour is a major store cost in the biggest cities.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the cup figures are a regional chain-report estimate, and the wage is the legal minimum for the most developed areas, not an average café wage.',
    narrative: [
      { label: 'What it is', text: 'Store operations transform ingredients into products that customers can purchase and consume. Core activities include opening and closing procedures, equipment preparation, ingredient handling, beverage production, cooking or assembly, cleaning, staff coordination, and daily performance monitoring.' },
      { label: 'Why it is happening', text: 'The store format determines the complexity of these activities. A takeaway coffee kiosk may prioritize fast beverage preparation and transaction throughput, while a full-service restaurant requires more extensive kitchen coordination, seating management, and table service.' },
      { label: 'Real-world example', text: 'Staff check equipment, prepare ingredients, confirm stock and complete hygiene checks before opening; grind, dose, brew, steam milk and verify presentation; cook, assemble, reheat, portion and package food; organise order queues and assign roles; clean equipment, food-contact surfaces, storage and customer spaces; and watch sales, preparation time, labour productivity, waste and consistency.' },
      { label: 'Vietnam example', text: 'Momentum Works estimates a typical café serves 300–400 cups a day while leading chains sell 600–800, and Highlands opened Vietnam’s first drive-through coffee store in 2025 while reporting same-store sales growth of more than 8% for the year. From 1 January 2026 the Region I minimum wage rose to VND 5.31 million a month, an average increase of 7.2% across regions. Vietnam’s Law on Food Safety sets conditions on water, waste, storage and the hygiene, health and training of staff who handle food. The sources reviewed give no published preparation-time or labour-productivity data for Vietnamese chains, so none are stated.' },
      { label: 'Business impact', text: 'Store operations are where upstream inputs become the products and experiences customers recognize. Efficient workflows, consistent preparation, and strong hygiene practices support both customer satisfaction and outlet profitability.' },
    ],
    visualKind: 'coffee-m2-41-store', visualHeading: 'Six steps in a store’s daily operating cycle',
    visualIntro: 'Follow six steps from opening to performance control and see what each supports.',
    imageAlt: 'Casemate six-step flow of a coffeehouse store’s daily operating cycle',
    keyTerms: [
      { term: 'Workflow', definition: 'The sequence of tasks and roles used to serve an order.' },
      { term: 'Throughput', definition: 'How many orders or cups a store can serve in a period.' },
      { term: 'Labour productivity', definition: 'Sales or transactions per hour of labour.' },
      { term: 'Food-contact surface', definition: 'A surface that touches food or drink and must be kept clean.' },
    ],
    recap: [
      'Stores turn ingredients into products through preparation and assembly.',
      'Format decides complexity: kiosks stress speed, restaurants need more coordination.',
      'Recipes work best with training and a suitable layout.',
      'Hygiene and daily performance control support satisfaction and profit.',
    ],
    chapterRecap: 'Store operations are where upstream inputs become the products and experiences customers recognize. Efficient workflows, consistent preparation, and strong hygiene practices support both customer satisfaction and outlet profitability.',
    deepDiveTitle: 'Why store layout affects how many cups a bar can serve',
    body: <C2DeepDive paragraphs={[
      'If the grinder, espresso machine and milk fridge are far apart, every drink costs extra steps and seconds. Across hundreds of drinks a day, that limits how many a bar can serve at peak.',
      'A layout designed around the steps of the most common drinks, with clear roles for each staff member, lets the same team serve more customers without lowering quality.' ]} evidence="The six activities are described in the supplied material. Cup figures and the drive-through are from Momentum Works data reported by VnExpress and VietnamBiz; same-store sales is from The Viet Media; wages are from a Vietnam Social Security summary of Decree 293/2025/ND-CP; food-safety conditions are from the consolidated Law on Food Safety." />,
    sources: citeC2('vnexpressChains', 'vietnambizChains', 'vietmediaChains', 'minWageDecree', 'foodSafetyLaw'),
  }),
  c2Chapter({
    title: 'Customer Service, Sales, and Experience Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how repeated service interactions build habits and how price changes affect loyalty.',
    mateIntro: 'Customers remember the wait, the smile, the mistake and the fix. Those small moments decide whether a first visit becomes a habit.',
    keyInsight: 'Customer experience is created through repeated operational interactions, not just marketing communication. Reliable service and product consistency help convert first-time visits into habitual purchasing and long-term customer relationships.',
    statTiles: [
      { value: '6', label: 'Key customer-facing activities', subtitle: 'Order taking to customer insight collection', description: 'Order taking, service execution, experience design, complaint resolution, customer retention and customer insight collection.' },
      { value: '> 8%', label: 'Highlands’ same-store sales growth in 2025', subtitle: 'The Viet Media, excluding new openings', description: 'Suggests existing stores kept customers while the network grew.' },
      { value: '~60%', label: 'Share of customers said to be sensitive to price increases', subtitle: 'VTV report, an unattributed statistic', description: 'A reminder that service must justify price.' },
    ],
    statsNote: 'The first tile is a count from this lesson; same-store growth is a press-reported company figure, and the price-sensitivity share is a statistic quoted in a television report without a named source, so treat it as indicative.',
    narrative: [
      { label: 'What it is', text: 'Customer-facing activities include welcoming customers, explaining menus, taking orders, processing payments, delivering products, resolving complaints, and maintaining the store environment. In coffeehouses, the experience may include ambience, seating, music, Wi-Fi, and opportunities to socialize or work. In quick-service and casual dining formats, speed, accuracy, and convenience may be more central.' },
      { label: 'Why it is happening', text: 'Service quality also affects brand perception and repeat purchasing. Customers evaluate not only product taste but also waiting time, staff interactions, cleanliness, order accuracy, and the consistency of the experience across visits.' },
      { label: 'Real-world example', text: 'Staff help customers understand options, sizes, customisations, ingredients and prices; deliver correct orders within expected times; design a store environment suited to the brand’s occasions and target customers; correct order errors and handle feedback promptly; use loyalty programmes, memberships and personal offers to bring customers back; and analyse reviews, surveys and purchase patterns for improvements.' },
      { label: 'Vietnam example', text: 'Highlands reported same-store sales growth of more than 8% in 2025, while a VTV report in March 2025 said one chain of over 3,000 stores saw revenue fall by nearly 20% after raising prices, and about 60% of customers were said to be price-sensitive. Phúc Long’s CEO said it plans to connect its loyalty programme to Masan’s retail ecosystem so that points earned at WinMart can be used at Phúc Long. The iPOS.vn survey named the multi-purpose café, where people can work and meet, a leading beverage trend in early 2026.' },
      { label: 'Business impact', text: 'Customer service links product delivery with brand trust and repeat demand. Operators should manage experience quality as a measurable operating priority rather than an intangible marketing benefit.' },
    ],
    visualKind: 'coffee-m2-42-service', visualHeading: 'Six customer-facing activities',
    visualIntro: 'See six activities around the centre and what each builds.',
    imageAlt: 'Casemate orbit mind map of six customer-facing activities in coffeehouse retail',
    keyTerms: [
      { term: 'Service recovery', definition: 'Fixing a service failure so the customer stays loyal.' },
      { term: 'Experience design', definition: 'Shaping the store environment for the brand’s target occasions.' },
      { term: 'Customer retention', definition: 'Keeping customers returning over time.' },
      { term: 'Same-store sales', definition: 'Sales growth from stores open in both periods compared.' },
    ],
    recap: [
      'Customer-facing work covers ordering, payment, delivery, complaints and the environment.',
      'Customers judge taste, waiting, staff, cleanliness, accuracy and consistency.',
      'Experience is built through repeated operational interactions.',
      'Manage service quality as a measurable priority.',
    ],
    chapterRecap: 'Customer service links product delivery with brand trust and repeat demand. Operators should manage experience quality as a measurable operating priority rather than an intangible marketing benefit.',
    deepDiveTitle: 'How to measure an experience that feels intangible',
    body: <C2DeepDive paragraphs={[
      'Waiting time, order accuracy, complaint rate, repeat visit rate and review scores can all be tracked. Reading them together shows whether customers are being served well, not just served.',
      'Reviewing these figures by store and by time of day points to where training or workflow changes will help most.' ]} evidence="The six activities are described in the supplied material. Same-store sales is from The Viet Media; the price-rise and price-sensitivity items are from a VTV report with no named source for the statistic; the loyalty plan is from a Masan Group interview; the trend is from the iPOS.vn first-half 2026 report." />,
    sources: citeC2('vietmediaChains', 'vtvCoffeePrices', 'masanPhucLong', 'iposH12026'),
  }),
  c2Chapter({
    title: 'Omnichannel Sales, Delivery, and Post-Sale Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how different sales channels change order handling and economics, and how to judge channel profit.',
    mateIntro: 'A drink sold at the counter and a drink sold through an app look the same to the customer. To the owner, they can be very different sales.',
    keyInsight: 'Omnichannel growth is valuable when it creates incremental demand without undermining store performance. Channel profitability should be assessed after accounting for commissions, promotions, packaging, labor, refunds, and fulfillment costs.',
    statTiles: [
      { value: '6', label: 'Key omnichannel activities', subtitle: 'Dine-in and takeaway to channel analytics', description: 'Dine-in and takeaway, digital ordering, delivery fulfillment, menu-channel adaptation, customer support and channel analytics.' },
      { value: 'US$2.1B', label: 'Online food delivery value in Vietnam in 2025', subtitle: 'Momentum Works, up 19%', description: 'Counts completed app orders only, not orders placed directly with restaurants.' },
      { value: '48% / 48%', label: 'Shares of ShopeeFood and GrabFood', subtitle: 'Momentum Works', description: 'Two platforms hold most measured delivery value.' },
    ],
    statsNote: 'The first tile is a count from this lesson; delivery figures are a regional research firm’s estimate and exclude direct orders and cancellations.',
    narrative: [
      { label: 'What it is', text: 'Downstream retail now includes multiple fulfillment options. Customers may dine in, collect takeaway orders, use drive-through facilities, order through a brand application, or purchase via third-party delivery platforms. Each channel introduces different requirements for order processing, packaging, payment, production sequencing, and customer communication.' },
      { label: 'Why it is happening', text: 'Off-premise channels can extend a store’s reach but may also increase packaging expenses, platform commissions, and order congestion. Delivery quality depends on the suitability of the menu, preparation timing, packaging, handoff procedures, and the distance between the outlet and customer.' },
      { label: 'Real-world example', text: 'A store balances service speed, seating, accuracy and customer flow for dine-in and takeaway; connects app, website or marketplace orders to store production and payment; prepares, checks, packages and hands over orders to couriers; chooses products that hold quality in transit; resolves missing items, delays, wrong orders and payment problems; and compares sales, average order value, repeat purchasing, contribution margin and complaints across channels.' },
      { label: 'Vietnam example', text: 'Online food delivery in Vietnam was worth US$2.1 billion in 2025, up 19%, with ShopeeFood and GrabFood at 48% each, after Baemin, Gojek and Loship withdrew and as Xanh SM Ngon entered in June 2025. Restaurants report commissions of 20–30% per order, so a VND 100,000 order at 30% leaves VND 70,000 before other costs, while GrabFood added group ordering and solo-diner options and ShopeeFood used AI and live streaming to drive demand. Highlands’ drive-through shows a channel built into the store itself. The sources reviewed give no published channel-level margin data for chains, so none is stated.' },
      { label: 'Business impact', text: 'Omnichannel fulfillment expands access and convenience but increases operational complexity. Retailers need coordinated ordering systems and channel-level profitability analysis to ensure that sales growth creates genuine value.' },
    ],
    visualKind: 'coffee-m2-43-channels', visualHeading: 'An in-store sale versus a delivery order',
    visualIntro: 'Compare an in-store sale with a delivery order across revenue, packaging, production, quality and relationship.',
    imageAlt: 'Casemate comparison of an in-store sale and a delivery order in coffeehouse retail',
    keyTerms: [
      { term: 'Incremental demand', definition: 'Sales that would not have happened without the channel.' },
      { term: 'Contribution margin', definition: 'Sales minus the direct costs of making and delivering them.' },
      { term: 'Menu-channel adaptation', definition: 'Choosing menu items that hold quality in a given channel.' },
      { term: 'Handoff', definition: 'The moment an order passes from the store to a courier or customer.' },
    ],
    recap: [
      'Customers can dine in, take away, use drive-through, order by app or use delivery platforms.',
      'Off-premise channels extend reach but add commission, packaging and congestion.',
      'Delivery quality depends on menu, timing, packaging and handoff.',
      'Judge each channel after commissions, discounts, packaging, labour, refunds and fulfilment.',
    ],
    chapterRecap: 'Omnichannel fulfillment expands access and convenience but increases operational complexity. Retailers need coordinated ordering systems and channel-level profitability analysis to ensure that sales growth creates genuine value.',
    deepDiveTitle: 'A simple channel profit check',
    body: <C2DeepDive paragraphs={[
      'For one drink, list the selling price, then subtract ingredients, packaging, platform commission, any discount funded by the shop, labour for the extra preparation and the cost of refunds. What remains is the real contribution.',
      'Doing the same for an in-store sale shows whether delivery is adding profit or only revenue.' ]} evidence="The six activities are described in the supplied material. Delivery figures are from Momentum Works data as reported by VnExpress and VCCI; commissions are from a Tuoi Tre report of restaurant complaints; the drive-through is from VietnamBiz." />,
    sources: citeC2('vnexpressDelivery', 'vcciDelivery', 'tuoitreDelivery', 'vietnambizChains'),
  }),
];

const quiz = c2Quiz('coffee-m2-l4', [
  { chapter: '1', objective: 'State what store productivity depends on', question: 'What does store productivity depend on?', application: 'A store has good recipes but long queues. What may be missing?', correct: 'Aligning people, equipment, menus and workflows with demand', wrong: ['Only recipe cards', 'Only the logo', 'Only music'], explanation: 'Alignment matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Contrast formats', question: 'What does a takeaway kiosk prioritise compared with a full-service restaurant?', application: 'A kiosk and a restaurant plan staffing. What differs?', correct: 'Fast beverage preparation and transaction throughput rather than kitchen and table coordination', wrong: ['Table service', 'Large kitchens', 'Seating management'], explanation: 'Format sets complexity. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the wage fact', question: 'What was the Region I monthly minimum wage from 1 January 2026?', application: 'A planner budgets labour. What is the minimum?', correct: 'VND 5.31 million', wrong: ['VND 0.531 million', 'VND 53.1 million', 'VND 3.7 million'], explanation: 'It is a legal minimum. Review Chapter 1.' },
  { chapter: '1', objective: 'List store controls', question: 'Which is a store performance control?', application: 'A manager reviews daily results. Which belongs?', correct: 'Monitoring sales, preparation time, labour productivity, waste and consistency', wrong: ['Choosing logos', 'Printing menus', 'Ordering furniture'], explanation: 'It measures execution. Review Chapter 1.' },
  { chapter: '2', objective: 'State how experience is created', question: 'How is customer experience created?', application: 'A brand relies only on advertising. What is missing?', correct: 'Through repeated operational interactions, not just marketing', wrong: ['By advertising alone', 'By discounts alone', 'By store size alone'], explanation: 'Operations deliver experience. Review Chapter 2.' },
  { chapter: '2', objective: 'List what customers judge', question: 'What do customers evaluate besides taste?', application: 'A café has great coffee but slow, inaccurate service. What suffers?', correct: 'Waiting time, staff interactions, cleanliness, order accuracy and consistency', wrong: ['Only logo colour', 'Only the supplier name', 'Only the building'], explanation: 'Service shapes perception. Review Chapter 2.' },
  { chapter: '2', objective: 'Treat a statistic carefully', question: 'How should the claim that about 60% of customers are price-sensitive be read?', application: 'A slide quotes the figure. What is the caution?', correct: 'As an unattributed statistic quoted in a television report, so indicative only', wrong: ['As official census data', 'As audited fact', 'As a legal limit'], explanation: 'Source matters. Review Chapter 2.' },
  { chapter: '3', objective: 'State when omnichannel is valuable', question: 'When is omnichannel growth valuable?', application: 'Delivery orders rise but store sales fall. What is the test?', correct: 'When it creates incremental demand without undermining store performance', wrong: ['When orders rise at any cost', 'When commissions rise', 'When stores close'], explanation: 'Incremental demand matters. Review Chapter 3.' },
  { chapter: '3', objective: 'List channel costs', question: 'Which costs should channel profitability account for?', application: 'An owner judges delivery profit. What should be deducted?', correct: 'Commissions, promotions, packaging, labour, refunds and fulfilment costs', wrong: ['Only ingredients', 'Only rent', 'Nothing'], explanation: 'All channel costs count. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply the delivery example', question: 'At a 30% commission, what is left of a VND 100,000 delivery order before other costs?', application: 'An owner prices a delivery drink. What does the platform leave?', correct: 'VND 70,000', wrong: ['VND 30,000', 'VND 100,000', 'VND 130,000'], explanation: 'Commission cuts net revenue. Review Chapter 3.' },
]);

export const LESSON_C2_4: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how store operations, customer service and omnichannel fulfilment turn ingredients into customer experiences and profit.',
    keyTakeaways: [
      'Store productivity depends on aligning people, equipment, menus and workflows.',
      'Format decides how complex store operations are.',
      'Customer experience is built through repeated operational interactions.',
      'Delivery extends reach but adds commission, packaging and congestion.',
      'Judge each channel by profit after all its costs.',
    ],
    businessImplications: 'Design store workflow around the most common orders, track service measures by store and test each channel’s contribution margin.',
    remember: 'Revenue through a channel is not the same as profit from it.',
    nextLesson: 'Inputs, Outputs & Value Creation',
  },
};
