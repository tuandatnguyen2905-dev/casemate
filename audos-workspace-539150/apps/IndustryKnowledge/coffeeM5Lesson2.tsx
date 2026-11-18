import { C5DeepDive, citeC5, c5Chapter, c5Quiz } from './coffeeM5Core';
import type { CoffeeM5LessonBundle } from './coffeeM5Core';

const LESSON = '2. Technology & Innovation Trends';

const deck = [
  c5Chapter({
    title: 'Digital Ordering, Loyalty, and Customer Data', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how digital ordering, loyalty and customer data create value and why channel economics must be measured.',
    mateIntro: 'An app is easy to launch and hard to make pay. What matters is whether customers come back more often and whether the numbers improve.',
    keyInsight: 'Digital capability creates value when it improves both customer retention and operating economics. Simply launching an app or offering digital payment is not enough; the technology must encourage repeat purchases, improve service, or produce actionable business insights.',
    statTiles: [
      { value: '4', label: 'Key digital activities', subtitle: 'Ordering to channel economics', description: 'Digital ordering, loyalty integration, customer analytics and channel economics.' },
      { value: '19 Dec 2025', label: 'HighlandsĐI replaced Highlands Rewards', subtitle: 'Company announcement', description: 'Tiers based on 12-month spend, plus pre-order and prepaid top-up.' },
      { value: '20–30%', label: 'Typical commission on a delivery order', subtitle: 'Tuoi Tre, excluding advertising', description: 'The cost of reaching customers through third-party platforms.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Commissions are restaurants’ reports, not a fixed rate, and no public figures on app share of orders or loyalty retention for coffee chains were found beyond the Jollibee statement that the Highlands app is a growing share of digital sales.',
    narrative: [
      { label: 'What it is', text: 'Digital tools are becoming central to how coffeehouses and foodservice operators attract, serve, and retain customers. Ordering applications, QR menus, electronic payments, loyalty systems, and customer relationship management platforms can reduce friction across the customer journey.' },
      { label: 'Why it is happening', text: 'Owned digital channels can also provide first-party customer insights, while third-party delivery platforms provide access to established audiences. Each channel has different economics, however, and operators must evaluate platform commissions, promotional expenses, customer ownership, and the cost of maintaining their own technology.' },
      { label: 'Real-world example', text: 'Operators introduce QR ordering, mobile pre-ordering or self-service kiosks where they fit the format; connect points, membership benefits, vouchers and personalised offers to purchase histories; track repeat-purchase frequency, basket size, redemption and retention; and compare direct-ordering costs with marketplace commissions and promotional spending.' },
      { label: 'Vietnam example', text: 'Highlands launched the HighlandsĐI app on 19 December 2025 with pre-order, prepaid top-up and tiers based on 12-month spend, and Jollibee Group says most of Highlands’ digital sales so far transacted through third-party aggregators while the app is a growing share. Phúc Long gives one point per VND 10,000, Starbucks is reported as stressing loyalty and cashless payment, and a Zalo Mini App campaign reported by the vendor drew over 2 million users and identified 56.9% of them. Large chains with more than 100 outlets, including Highlands, Starbucks and Phúc Long, use self-service counters, and delivery commissions run 20–30% before advertising. Law 91/2025/QH15 now requires recorded consent for the data these tools collect.' },
      { label: 'Business impact', text: 'Digital ordering and loyalty tools can strengthen customer relationships and generate operational insights. Their impact should be measured through incremental sales, retention, service efficiency, and customer lifetime value rather than adoption figures alone.' },
    ],
    visualKind: 'coffee-m5-21-digital', visualHeading: 'Four digital tools and what to measure',
    visualIntro: 'Read each tool, the measure that proves its value and the Vietnam evidence.',
    imageAlt: 'Casemate table of digital ordering, loyalty, analytics and channel economics for coffeehouses',
    keyTerms: [
      { term: 'First-party data', definition: 'Customer information a business collects directly through its own channels.' },
      { term: 'Aggregator', definition: 'A platform that lists many restaurants and handles ordering and delivery.' },
      { term: 'Customer lifetime value', definition: 'The total value a customer is expected to bring over the whole relationship.' },
      { term: 'Incremental sales', definition: 'Sales that would not have happened without the tool or promotion.' },
    ],
    recap: [
      'Digital tools reduce friction across the customer journey.',
      'Owned channels give first-party data; platforms give reach at a cost.',
      'An app or digital payment alone is not enough.',
      'Measure incremental sales, retention and service efficiency.',
    ],
    chapterRecap: 'Digital ordering and loyalty tools can strengthen customer relationships and generate operational insights. Their impact should be measured through incremental sales, retention, service efficiency, and customer lifetime value rather than adoption figures alone.',
    deepDiveTitle: 'Why app downloads are the wrong scoreboard',
    body: <C5DeepDive paragraphs={[
      'A million downloads mean little if few customers order twice. The useful questions are how many identified customers return, how often, and whether they spend more than they did before.',
      'The Jollibee statement is a good example of the right framing: it tracks the app’s share of digital sales, not its downloads, and notes that aggregators still carry most of them.' ]} evidence="App and programme details are from Highlands’ announcement, the Jollibee Group release, Phúc Long’s website and DNSE; the Zalo result is a vendor case study; self-service counters are from Tuoi Tre; commissions are from Tuoi Tre; the data law is from the Official Gazette. The scoreboard argument is our own." />,
    sources: citeC5('highlandsApp', 'jollibeeHighlands', 'phucLongRewards', 'dnseChains', 'highlandsZalo', 'tuoitreRebalancing', 'tuoitreDelivery', 'pdplLaw'),
  }),
  c5Chapter({
    title: 'Automation, AI, and Smart Store Operations', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain where automation and AI add productivity in coffeehouses and what must be in place first.',
    mateIntro: 'A machine that makes a perfect drink in seconds is impressive. A machine that does so reliably, at lower cost and without slowing the queue is valuable.',
    keyInsight: 'The next stage of technology adoption is operational productivity, not technology adoption for its own sake. The strongest applications are those that reduce avoidable labor, waste, errors, and waiting time without weakening product quality or hospitality.',
    statTiles: [
      { value: '4', label: 'Key automation activities', subtitle: 'Beverage automation to performance monitoring', description: 'Beverage automation, demand forecasting, integrated store management and performance monitoring.' },
      { value: '~2 min', label: 'Time for one robot café to make a drink', subtitle: 'Dan Tri, March 2026', description: 'A single small café open about a month at the time.' },
      { value: '10+ min', label: 'Peak-hour wait reported at the same café', subtitle: 'CafeF, 2026', description: 'Automation does not remove queues at peak.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The robot café is one shop and not a market trend, and no public Vietnam coffee-chain data on forecasting accuracy, labour saved or equipment use was found.',
    narrative: [
      { label: 'What it is', text: 'Technology is increasingly being used to standardize preparation, manage inventory, forecast demand, and coordinate store operations. Automated beverage equipment, integrated point-of-sale systems, and digital kitchen workflows can improve consistency and throughput, particularly for chains with high transaction volumes.' },
      { label: 'Why it is happening', text: 'Artificial intelligence and predictive analytics can support demand forecasting, staffing decisions, menu recommendations, and inventory planning. However, the value of these tools depends on reliable data, staff training, system integration, and the suitability of the technology for each store’s operating model.' },
      { label: 'Real-world example', text: 'Operators use calibrated grinders, automated espresso equipment, portion-control systems and standard workflows; combine historical sales, seasonality, promotions and local demand to plan stock and staff; connect POS, procurement, stock control, scheduling and financial reporting; and measure preparation time, consistency, stockouts, waste, labour productivity and equipment utilisation.' },
      { label: 'Vietnam example', text: 'Momentum Works says Southeast Asian beverage chains are adopting industrialised operating models, and Tuoi Tre reports that Highlands, Starbucks and Phúc Long use self-service counters while Chagee uses QR-coded cups so machines can mix drinks in seconds with little staff input. A small Ho Chi Minh City café, open about a month in March 2026, uses Vietnamese-built robot arms to make a drink in about two minutes, with ordering by screen and QR payment, though peak waits can pass 10 minutes and staff stay on hand. Low-price takeaway kiosks near schools say a simple, takeaway-only model reduces staffing needs, and Highlands says its streamlined operating model delivers best-in-class store profitability, which is a company claim. No public Vietnam chain data on forecast accuracy or equipment use was found.' },
      { label: 'Business impact', text: 'Automation and AI can improve consistency and cost control, especially at scale. Operators should prioritize use cases with measurable returns and avoid investing in complex systems before establishing standardized processes and dependable data.' },
    ],
    visualKind: 'coffee-m5-22-automation', visualHeading: 'Four applications of automation and data',
    visualIntro: 'See the four applications and the Vietnam signal for each.',
    imageAlt: 'Casemate tree of four automation and data applications in coffeehouse stores',
    keyTerms: [
      { term: 'Throughput', definition: 'The number of orders a store can complete in a given time.' },
      { term: 'Demand forecasting', definition: 'Estimating future sales to plan stock and staffing.' },
      { term: 'Industrialised operating model', definition: 'Using technology and standard processes to raise store productivity.' },
      { term: 'Standardised process', definition: 'A documented, repeatable way of doing a task across stores.' },
    ],
    recap: [
      'Technology standardises preparation, stock and store coordination.',
      'AI helps forecasting and staffing only with reliable data and training.',
      'Prioritise use cases with measurable returns.',
      'Standard processes and good data come before complex systems.',
    ],
    chapterRecap: 'Automation and AI can improve consistency and cost control, especially at scale. Operators should prioritize use cases with measurable returns and avoid investing in complex systems before establishing standardized processes and dependable data.',
    deepDiveTitle: 'Why a robot barista does not remove the need for process',
    body: <C5DeepDive paragraphs={[
      'A robot follows the recipe it is given. If recipes, portions and ordering flow are not standard, automation only repeats variation faster. Peak-hour queues show the limit: one machine can still become the bottleneck.',
      'The brief’s advice follows: fix process and data first, then automate the steps where time, waste or errors are costly.' ]} evidence="Chain self-service, Chagee and kiosk comments are from Tuoi Tre and Vietnam.vn reporting Momentum Works; the robot café is a single-shop report from Dan Tri and CafeF; the Highlands claim is from the Jollibee Group release. The bottleneck reasoning is our own." />,
    sources: citeC5('tuoitreRebalancing', 'vietnamplusRegional', 'roboticCafe', 'jollibeeHighlands', 'investorLargerPlayers'),
  }),
  c5Chapter({
    title: 'Product Innovation and Data-Driven Menu Development', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how coffeehouses test, measure and refine products so innovation stays commercially repeatable.',
    mateIntro: 'A new drink can go viral in a week and be copied in two. What lasts is a product that sells repeatedly at a good margin without slowing the bar.',
    keyInsight: 'Innovation must be commercially repeatable. A product that attracts attention but creates excessive complexity or weak margins may not support long-term growth.',
    statTiles: [
      { value: '4', label: 'Key innovation activities', subtitle: 'Trend testing to rapid iteration', description: 'Trend testing, local ingredient integration, menu performance analysis and rapid product iteration.' },
      { value: '39.19%', label: 'Share of diners naming ultra-cheap fixed-price drinks the top trend in H1 2026', subtitle: 'iPOS.vn', description: 'A trend that rivals can copy quickly.' },
      { value: 'VND 7,000', label: 'Price of the cheapest drinks gaining traction', subtitle: 'Tuoi Tre, April 2026', description: 'Set by takeaway kiosks near schools and transport hubs.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The trend share is a survey ranking, and no public Vietnam data on limited-time-product performance, repeat purchase or menu margins was found.',
    narrative: [
      { label: 'What it is', text: 'Product innovation remains important in a market where competitors can quickly imitate popular flavors and formats. Operators are experimenting with signature beverages, specialty coffee, tea-based drinks, seasonal products, local ingredients, and food pairings that broaden consumption occasions.' },
      { label: 'Why it is happening', text: 'Data-driven menu management helps distinguish short-term trends from products that generate sustainable demand. Sales performance, customer feedback, ingredient costs, preparation complexity, and waste should all inform decisions about launching, retaining, or removing products.' },
      { label: 'Real-world example', text: 'Operators launch limited-time products to test demand before a permanent slot; explore regional coffee, tea, fruit, spices and specialty ingredients for authentic differentiation; assess sales volume, gross margin, repeat purchases, preparation time and ingredient overlap; and refine recipes, pricing, packaging and serving formats from store results and feedback.' },
      { label: 'Vietnam example', text: 'The iPOS.vn first-half 2026 ranking put ultra-cheap fixed-price drinks first at 39.19% and found that what trending models share is a clear reason to be chosen; Mixue-style chains pushed cups down to VND 8,000 in promotions, and takeaway kiosks advertise VND 7,000 drinks. Starbucks, long reluctant to localise, now launches trend items such as salt coffee, coconut coffee and matcha; Phúc Long balanced its menu across milk tea, coffee, fruit tea and ice-blended drinks and says cakes, ice cream and yoghurt drive growth; Katinat tells a story around Vietnamese produce, and Phúc Long says its tea comes from two hills it owns. No public data on limited-time-product results was found.' },
      { label: 'Business impact', text: 'Product innovation supports differentiation when it responds to customer demand and fits the operating model. Data-informed menu decisions can help businesses balance novelty, consistency, margin, and preparation efficiency.' },
    ],
    visualKind: 'coffee-m5-23-innovation', visualHeading: 'Four steps from idea to permanent menu slot',
    visualIntro: 'Follow the four steps and what each tests.',
    imageAlt: 'Casemate step diagram of product innovation and menu development in coffeehouses',
    keyTerms: [
      { term: 'Limited-time offer', definition: 'A temporary product used to test demand before a permanent listing.' },
      { term: 'Contribution margin', definition: 'Price less variable cost: what a sale adds toward fixed costs and profit.' },
      { term: 'Ingredient overlap', definition: 'Sharing ingredients across menu items to cut stock and waste.' },
      { term: 'Signature beverage', definition: 'A drink strongly associated with one brand.' },
    ],
    recap: [
      'Rivals imitate flavours and formats quickly.',
      'Data separates short-term trends from sustainable demand.',
      'Test with limited-time products and local ingredients.',
      'Weigh margin, complexity and waste before keeping a product.',
    ],
    chapterRecap: 'Product innovation supports differentiation when it responds to customer demand and fits the operating model. Data-informed menu decisions can help businesses balance novelty, consistency, margin, and preparation efficiency.',
    deepDiveTitle: 'Why the best-selling item is not always the best item',
    body: <C5DeepDive paragraphs={[
      'An item that sells in volume but needs unique ingredients, a long preparation time or leaves waste may earn less per hour of bar time than a plainer one. Looking at sales alone hides this.',
      'Menu performance analysis therefore combines volume, margin, preparation time and ingredient overlap, so the menu keeps the items that make money and move quickly.' ]} evidence="Trend ranking is from the iPOS.vn first-half 2026 press release; kiosk prices are from Tuoi Tre; Mixue’s promotional prices are from The Viet Media; Starbucks and Phúc Long menu details are from VietnamBiz and Vietnam.vn; Katinat commentary is from Vinalink; Phúc Long’s tea hills are a company claim. The bar-time argument is our own." />,
    sources: citeC5('iposH12026Detail', 'tuoitreRebalancing', 'vietmediaSplit', 'vietnambizShakeout', 'phucLongResults', 'katinatProfile', 'phucLongTea'),
  }),
];

const quiz = c5Quiz('coffee-m5-l2', [
  { chapter: '1', objective: 'State when digital creates value', question: 'When does digital capability create value?', application: 'A chain launches an app. What must it also achieve?', correct: 'When it improves both customer retention and operating economics', wrong: ['When it has many downloads', 'When it replaces all staff', 'When it is free'], explanation: 'Adoption alone is not enough. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the app change', question: 'When did HighlandsĐI replace Highlands Rewards?', application: 'A member asks when the new app started. What date applies?', correct: '19 December 2025', wrong: ['1 January 2010', '30 June 2018', '4 July 2030'], explanation: 'It added tiers and pre-order. Review Chapter 1.' },
  { chapter: '1', objective: 'Read the Jollibee statement', question: 'According to Jollibee Group, where did most of Highlands’ digital sales transact?', application: 'An analyst assesses reliance on platforms. What is the picture?', correct: 'Through third-party aggregators, with the app a growing share', wrong: ['Only through the app', 'Only in stores', 'Through Zalo only'], explanation: 'Aggregators still carry most. Review Chapter 1.' },
  { chapter: '1', objective: 'Choose the right metrics', question: 'How should the impact of loyalty tools be measured?', application: 'A manager reports 500,000 sign-ups. What else is needed?', correct: 'Incremental sales, retention, service efficiency and customer lifetime value', wrong: ['Adoption figures only', 'Logo size', 'Staff headcount'], explanation: 'Adoption alone misleads. Review Chapter 1.' },
  { chapter: '2', objective: 'State the automation insight', question: 'What is the next stage of technology adoption, according to the chapter?', application: 'A chain wants a robot because rivals have one. What should it ask?', correct: 'Operational productivity, not adoption for its own sake', wrong: ['More screens in every store', 'Replacing recipes', 'Removing all staff'], explanation: 'Use cases need measurable returns. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the robot café limits', question: 'What does the robot café example show about peak hours?', application: 'An owner assumes a robot ends queues. What was reported?', correct: 'Waits can exceed 10 minutes at peak despite a drink time of about 2 minutes', wrong: ['There are never any waits', 'The robot serves in 20 seconds', 'It cannot make coffee'], explanation: 'One machine can be a bottleneck. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe Chagee’s approach', question: 'How does Chagee use QR-coded cups?', application: 'A founder asks how Chagee automates mixing. What is the mechanism?', correct: 'The code identifies the recipe so machines mix drinks in seconds with little staff input', wrong: ['It tracks employees', 'It pays suppliers', 'It prints receipts only'], explanation: 'Reported by Tuoi Tre. Review Chapter 2.' },
  { chapter: '3', objective: 'State the innovation insight', question: 'What must innovation be to support long-term growth?', application: 'A viral drink needs a rare ingredient and a long prep time. What is the risk?', correct: 'Commercially repeatable', wrong: ['As unusual as possible', 'Always limited-time', 'Always cheap'], explanation: 'Complexity and weak margins undermine it. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the trend ranking', question: 'Which trend ranked first in the iPOS.vn H1 2026 survey?', application: 'An analyst reads the trend list. What led it?', correct: 'Ultra-cheap fixed-price drinks at 39.19%', wrong: ['Robot baristas', 'Reusable cups', 'Delivery-only kitchens'], explanation: 'A trend rivals can copy fast. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on the results of limited-time products in Vietnamese coffee chains?', application: 'A deck quotes launch success rates. Is there a public source?', correct: 'No public data was found', wrong: ['They always succeed', 'They always fail', 'They are published monthly'], explanation: 'Gaps are stated explicitly. Review Chapter 3.' },
]);

export const LESSON_C5_2: CoffeeM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how digital tools, automation and data-driven menus create value for coffeehouses and what evidence exists in Vietnam.',
    keyTakeaways: [
      'Digital tools matter when they improve retention and economics.',
      'Most Highlands digital sales still come through aggregators; the app is growing.',
      'Automation is about productivity, and process and data must come first.',
      'Innovation must be commercially repeatable.',
      'Evidence for forecasting accuracy and limited-time product results in Vietnam is missing.',
    ],
    businessImplications: 'Measure digital tools by retention and incremental sales, standardise before automating and manage the menu by margin and speed.',
    remember: 'Technology pays only when it makes the store faster, cheaper or more loyal.',
    nextLesson: 'Market & Channel Trends',
  },
};
