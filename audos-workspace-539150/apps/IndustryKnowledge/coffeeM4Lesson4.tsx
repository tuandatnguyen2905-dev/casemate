import { C4DeepDive, citeC4, c4Chapter, c4Quiz } from './coffeeM4Core';
import type { CoffeeM4LessonBundle } from './coffeeM4Core';

const LESSON = '4. Key Success Factors';

const deck = [
  c4Chapter({
    title: 'Product Quality, Menu Differentiation, and Brand Positioning', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how product consistency, differentiation and positioning give customers a reason to visit and to return.',
    mateIntro: 'A new drink gets a customer through the door once. A drink that tastes the same every time, at a price that feels right, gets them back.',
    keyInsight: 'A successful brand needs both a compelling reason for customers to visit and a reliable reason for them to return. Product differentiation attracts attention, while consistent quality and value sustain loyalty.',
    statTiles: [
      { value: '6', label: 'Product and brand success activities', subtitle: 'Consistency to customer feedback', description: 'Product consistency, menu differentiation, local relevance, menu innovation, brand positioning and customer feedback.' },
      { value: '~11%', label: 'Share of revenue Phúc Long targets from food in 2026', subtitle: 'Vietnam.vn, reporting Masan', description: 'Food is being built as a second product pillar beside drinks.' },
      { value: 'VND 500B', label: 'Cost of the Highlands roastery near Cái Mép', subtitle: 'Viet Nam News, April 2025', description: 'An investment in control of coffee quality and supply.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The food target is a company aim for 2026, not a result, and the roastery capacity is a company claim.',
    narrative: [
      { label: 'What it is', text: 'Product quality is fundamental to coffeehouse and foodservice competition because customers evaluate taste, freshness, consistency, presentation, and perceived value across repeated visits. A recognizable menu and a distinctive brand proposition help retailers stand out in markets where many businesses offer similar core products.' },
      { label: 'Why it is happening', text: 'Differentiation may come from Vietnamese coffee heritage, specialty brewing, signature beverages, local flavors, premium ingredients, bakery expertise, or a distinctive dining environment. However, differentiation must remain relevant to target customers and practical to deliver at scale.' },
      { label: 'Real-world example', text: 'Chains standardize recipes, ingredient specifications, preparation methods and quality checks; build signature products that are hard to substitute directly; bring Vietnamese coffee culture and local flavours into the menu; test seasonal products and new categories without excess complexity; align price, store design, communication and quality with the intended segment; and use sales patterns, reviews and repeat-purchase data to refine the offer.' },
      { label: 'Vietnam example', text: 'Phúc Long changed its brand identity, opened a first flagship and launched Unicorn, a premium format whose menu balances milk tea, coffee, fruit tea and ice-blended drinks; before Masan it served only phin-brewed coffee and now offers machine coffee too, and cakes, ice cream and yoghurt are described as a main growth driver. Starbucks added salt coffee, coconut coffee and matcha to keep up with local trends, and Highlands invested VND 500 billion in a roastery whose food-safety certifications are company claims. Katinat’s distinctive store design is credited by commentators for its growth, though its best-sellers are reported to be milk tea and fruit tea, and Trung Nguyên leans on coffee heritage. No public data on repeat-purchase rates by brand was found.' },
      { label: 'Business impact', text: 'Product quality and brand differentiation are foundational success factors. Retailers must create a clear customer proposition and maintain consistent delivery across outlets and channels.' },
    ],
    visualKind: 'coffee-m4-41-product', visualHeading: 'Six ways to build a reason to visit and return',
    visualIntro: 'See six activities around the central proposition and what each builds.',
    imageAlt: 'Casemate tree of six product quality and brand positioning success factors',
    keyTerms: [
      { term: 'Signature product', definition: 'A recognisable item strongly associated with one brand.' },
      { term: 'Product consistency', definition: 'The same taste and quality at every outlet and on every visit.' },
      { term: 'Menu innovation', definition: 'Introducing new items or categories, balanced against operational complexity.' },
      { term: 'Local relevance', definition: 'Fit with the tastes, habits and culture of local customers.' },
    ],
    recap: [
      'Customers judge taste, freshness and consistency across repeat visits.',
      'Differentiation attracts; consistency and value retain.',
      'Differentiation must be relevant and practical at scale.',
      'Vietnam brands are widening menus and localising flavours.',
    ],
    chapterRecap: 'Product quality and brand differentiation are foundational success factors. Retailers must create a clear customer proposition and maintain consistent delivery across outlets and channels.',
    deepDiveTitle: 'Why a food push needs a kitchen plan',
    body: <C4DeepDive paragraphs={[
      'Adding cakes, ice cream or yoghurt raises ticket size, but each item needs storage, preparation and waste control. A chain that adds food without redesigning workflow risks slower service and spoilage.',
      'Phúc Long’s aim of about 11% of revenue from food is therefore a test of whether menu growth can be delivered consistently across many stores.' ]} evidence="Phúc Long’s menu changes and growth drivers are from VietnamBiz; the 11% food target is from Vietnam.vn reporting Masan; Starbucks’ new items are from VietnamBiz; the roastery is from Viet Nam News and a Highlands announcement; Katinat commentary is from Vinalink. The workflow reasoning is our own." />,
    sources: citeC4('vietnambizShakeout', 'phucLongResults', 'highlandsRoastery', 'highlandsPlant2023', 'katinatProfile', 'columbiaTrungNguyen'),
  }),
  c4Chapter({
    title: 'Location Strategy, Store Economics, and Operational Excellence', chapterTitle: LESSON, readingTime: '7',
    objective: 'Link site choice and repeatable operations to store returns and explain how weak outlets are managed.',
    mateIntro: 'Two stores can have the same logo and the same menu. One earns steadily, the other drains cash. Usually the difference is where it sits and how well it runs.',
    keyInsight: 'The most important measure of expansion quality is not the number of stores opened, but whether each outlet can generate sustainable returns. Disciplined site selection and repeatable store operations convert brand demand into profitable growth.',
    statTiles: [
      { value: '6', label: 'Location and operations activities', subtitle: 'Site evaluation to portfolio management', description: 'Site evaluation, store-format selection, cost management, operational standardization, demand planning and store portfolio management.' },
      { value: '100+', label: 'New Highlands stores opened each year', subtitle: 'VietnamBiz', description: 'A steady rollout, with same-store sales also rising.' },
      { value: '+18.5%', label: 'Rise in Phúc Long daily revenue per standard store in Q2 2026', subtitle: 'The Investor, citing Masan', description: 'Reached VND 26.2 million, attributed to store-level efficiency.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The openings figure is a press description of recent pace, and Phúc Long’s daily revenue refers to standard stores and excludes WinMart kiosks.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice businesses depend heavily on the productivity of their physical outlets. Location affects customer traffic, accessibility, rent, competitive exposure, and the consumption occasions a store can serve. Even a recognizable brand may struggle when its site cannot generate enough sales to support operating expenses.' },
      { label: 'Why it is happening', text: 'Operational excellence is equally important. Efficient procurement, staffing, inventory management, preparation workflows, and waste control determine whether customer demand translates into profit. For multi-store operators, these capabilities must be repeatable across different locations.' },
      { label: 'Real-world example', text: 'Operators assess traffic, catchment demand, accessibility, competitors, rent and expected sales for each site; match outlet size, seating, equipment and staffing to the location and occasion; monitor ingredient, labour, occupancy, utility and packaging costs; apply common training, recipes, service standards and reporting; adjust inventory and staffing to daypart, promotions and seasons; and expand successful formats, improve weak outlets and close persistently unviable ones.' },
      { label: 'Vietnam example', text: 'Highlands opens more than 100 stores a year and lifted same-store sales over 8% in 2025 and 11.5% in the second quarter of 2026, while Phúc Long’s daily revenue per standard store reached VND 26.2 million in the same quarter and it aims to shorten payback in Hanoi. Phúc Long’s WinMart kiosks cut occupancy cost by using supermarket traffic, and Katinat concentrates on prominent corner sites but a commentator expects lease expiries in 2028–29 to test it. Costs press on stores: the Region I minimum wage is VND 5.31 million a month from 1 January 2026, housing, electricity and water prices rose 6.08% in 2025, and local reports say 50–60% of beverage operators saw raw-material costs rise. The Coffee House closed stores after Golden Gate’s takeover, showing portfolio management in practice.' },
      { label: 'Business impact', text: 'Location quality and operating discipline are essential to long-term competitiveness. Chains that combine sound site selection with consistent store execution can expand more sustainably and withstand periods of weaker demand.' },
    ],
    visualKind: 'coffee-m4-42-location', visualHeading: 'Six disciplines that turn sites into returns',
    visualIntro: 'Read the six disciplines and what each protects.',
    imageAlt: 'Casemate cards of six location, store economics and operational excellence success factors',
    keyTerms: [
      { term: 'Catchment', definition: 'The area from which a store draws most of its customers.' },
      { term: 'Payback period', definition: 'The time needed to recover the investment in a store from its cash flow.' },
      { term: 'Portfolio management', definition: 'Deciding which stores and formats to expand, fix or close.' },
      { term: 'Operational standardisation', definition: 'Common processes applied identically across stores.' },
    ],
    recap: [
      'Location drives traffic, rent and the occasions a store can serve.',
      'Operations decide whether demand becomes profit.',
      'Expansion quality is returns per outlet, not the number of stores.',
      'Weak outlets are fixed or closed.',
    ],
    chapterRecap: 'Location quality and operating discipline are essential to long-term competitiveness. Chains that combine sound site selection with consistent store execution can expand more sustainably and withstand periods of weaker demand.',
    deepDiveTitle: 'Why same-store sales is the honest test of expansion',
    body: <C4DeepDive paragraphs={[
      'Total sales rise whenever a chain opens stores, so total growth cannot show whether stores are good. Same-store sales strip out new openings and show whether existing sites are earning more.',
      'Highlands and Phúc Long both report this kind of measure, which is why analysts treat them as stronger evidence than store counts.' ]} evidence="Highlands same-store sales are from The Viet Media and The Investor; openings pace is from VietnamBiz; Phúc Long figures are from The Investor and DNSE; the lease commentary is from Vinalink; wage, price and cost data are from Vietnam Social Security, the iPOS.vn report deck and The Viet Media. The explanation of same-store sales is general." />,
    sources: citeC4('vietnambizShakeout', 'vietmediaSplit', 'investorLargerPlayers', 'dnseChains', 'katinatProfile', 'minWageDecree', 'iposReportDeck', 'agroMilano'),
  }),
  c4Chapter({
    title: 'Customer Loyalty, Digital Capability, and Scalable Management', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how loyalty, digital tools and management systems work together to protect a growing chain.',
    mateIntro: 'Discounts buy a visit. Loyalty, data and good management buy a habit, and they scale across stores in a way that promotions do not.',
    keyInsight: 'Digital capability creates the greatest value when it strengthens customer relationships and operational decisions. Technology should improve retention, productivity, and profitability rather than serve as an isolated innovation initiative.',
    statTiles: [
      { value: '6', label: 'Loyalty, digital and management activities', subtitle: 'Loyalty management to scalable governance', description: 'Loyalty management, customer analytics, omnichannel integration, workforce development, performance management and scalable governance.' },
      { value: '19 Dec 2025', label: 'HighlandsĐI replaced Highlands Rewards', subtitle: 'Company announcement', description: 'Adds tiers based on 12-month spend, plus pre-order and prepaid top-up.' },
      { value: '1 pt / VND 10K', label: 'Phúc Long points rule', subtitle: 'Company website', description: 'A free medium drink costs 100 points, about VND 1 million of spend.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The spend per free drink is our arithmetic from the stated rules, and no public member counts or retention rates for these programmes were found.',
    narrative: [
      { label: 'What it is', text: 'Customer loyalty reduces dependence on constant customer acquisition and discounting. Reliable products, convenient access, good service, relevant rewards, and a distinctive brand experience encourage repeat purchases and strengthen customer relationships.' },
      { label: 'Why it is happening', text: 'Digital tools support these objectives through mobile ordering, loyalty programs, transaction analytics, inventory visibility, and demand forecasting. At the same time, scalable management systems help growing businesses maintain consistent quality, train employees, monitor store performance, and respond to operational problems.' },
      { label: 'Real-world example', text: 'Chains offer rewards, membership benefits and incentives for repeat purchasing; analyse purchase frequency, preferred products, spending patterns and promotion response; connect online ordering, stores, delivery, payments and support; train staff in preparation, service, hygiene and brand standards; track store sales, margins, service times, waste and feedback; and set clear procedures, accountability and quality monitoring as the network grows.' },
      { label: 'Vietnam example', text: 'Highlands launched the HighlandsĐI app on 19 December 2025 with tiers based on 12-month spend, pre-order and prepaid top-up, and a Zalo Mini App campaign reported by the vendor drew over 2 million users and identified 56.9% of them. Phúc Long gives one point per VND 10,000 and Masan plans to integrate its loyalty programme with the group’s retail ecosystem, while Starbucks is reported as stressing loyalty and cashless payment. Highlands plans to list in Vietnam in the first quarter of 2027, which raises the bar on reporting and governance, and its same-store sales growth suggests that its systems are keeping stores productive as it grows. No public data on staff training, turnover or loyalty-member counts was found.' },
      { label: 'Business impact', text: 'Customer retention, digital integration, and scalable management help businesses protect their competitive position as they grow. These capabilities are especially valuable when combined with strong product quality and disciplined store economics.' },
    ],
    visualKind: 'coffee-m4-43-loyalty', visualHeading: 'Six capabilities that make growth scalable',
    visualIntro: 'Read the six layers from governance at the top to loyalty at the base.',
    imageAlt: 'Casemate pyramid of six loyalty, digital and management capabilities',
    keyTerms: [
      { term: 'Loyalty programme', definition: 'A scheme that rewards repeat purchases with points, tiers or offers.' },
      { term: 'Customer analytics', definition: 'Using purchase data to understand frequency, preferences and response to promotions.' },
      { term: 'Omnichannel integration', definition: 'Connecting stores, apps, delivery and payments as one system.' },
      { term: 'Governance', definition: 'The procedures and accountability that keep a growing business consistent.' },
    ],
    recap: [
      'Loyalty reduces dependence on discounting and constant acquisition.',
      'Digital tools matter when they improve retention and operations.',
      'Management systems keep quality consistent as networks grow.',
      'Public data on members, training and turnover is missing.',
    ],
    chapterRecap: 'Customer retention, digital integration, and scalable management help businesses protect their competitive position as they grow. These capabilities are especially valuable when combined with strong product quality and disciplined store economics.',
    deepDiveTitle: 'Why loyalty data is only useful if customers are identified',
    body: <C4DeepDive paragraphs={[
      'A discount to an anonymous customer cannot be measured, but a reward linked to an account shows who returns and what they buy. That is why apps and Zalo campaigns focus on capturing identity.',
      'Identified data then guides menus, promotions and staffing, which is what turns a digital tool from a novelty into a source of profit.' ]} evidence="HighlandsĐI is from a company announcement; the Zalo result is a vendor case study; Phúc Long’s points rule is from its website and the Masan plan from a Masan Group interview; Starbucks loyalty is from DNSE; the listing target is from Agro.gov.vn. The explanation of identity is our own." />,
    sources: citeC4('highlandsApp', 'highlandsZalo', 'phucLongRewards', 'masanPhucLong', 'dnseChains', 'agroMilano'),
  }),
];

const quiz = c4Quiz('coffee-m4-l4', [
  { chapter: '1', objective: 'State the loyalty rule', question: 'What do product differentiation and consistent quality each do?', application: 'A brand has a striking new drink but uneven quality. What is missing?', correct: 'Differentiation attracts attention; consistent quality and value sustain loyalty', wrong: ['Differentiation sustains loyalty alone', 'Quality is irrelevant', 'Both only affect price'], explanation: 'Both a reason to visit and a reason to return are needed. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall a menu change', question: 'Which drink groups does Phúc Long Unicorn’s menu balance?', application: 'A student describes the premium format. What does it offer?', correct: 'Milk tea, coffee, fruit tea and ice-blended drinks', wrong: ['Only coffee', 'Only beer', 'Only soup'], explanation: 'It broadened beyond milk tea. Review Chapter 1.' },
  { chapter: '1', objective: 'Judge a claim', question: 'How should the Highlands roastery’s food-safety certifications be described?', application: 'A slide lists FSSC 22000 as fact. What caution applies?', correct: 'As company claims', wrong: ['As government findings', 'As audited by this module', 'As irrelevant'], explanation: 'Label company statements. Review Chapter 1.' },
  { chapter: '2', objective: 'State the expansion measure', question: 'What is the most important measure of expansion quality?', application: 'A chain boasts 100 openings. What should it show?', correct: 'Whether each outlet generates sustainable returns', wrong: ['The number of stores opened', 'The size of the logo', 'The number of promotions'], explanation: 'Returns per outlet matter. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall same-store growth', question: 'By how much did Highlands’ same-store sales rise in Q2 2026 in Vietnam?', application: 'An analyst checks the productivity of existing stores. What was reported?', correct: '11.5%', wrong: ['0.5%', '115%', 'It fell'], explanation: 'Same-store sales exclude new openings. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain portfolio management', question: 'What does store portfolio management involve?', application: 'A chain has some persistently loss-making outlets. What should it do?', correct: 'Expand successful formats, improve weak outlets and close persistently unviable ones', wrong: ['Open more of every format', 'Keep all outlets forever', 'Stop measuring performance'], explanation: 'Decisions follow outlet returns. Review Chapter 2.' },
  { chapter: '3', objective: 'State the digital rule', question: 'When does digital capability create the greatest value?', application: 'A chain launches an app. What should it judge it by?', correct: 'When it strengthens customer relationships and operational decisions', wrong: ['When it is the newest', 'When it replaces all staff', 'When it is isolated from stores'], explanation: 'Technology serves retention and productivity. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a launch date', question: 'When did HighlandsĐI replace Highlands Rewards?', application: 'A member asks when the new app began. What date applies?', correct: '19 December 2025', wrong: ['1 January 2000', '30 June 2010', '4 July 2030'], explanation: 'It added tiers and pre-order. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply the points rule', question: 'Under Phúc Long’s rule of 1 point per VND 10,000, about how much spend earns 100 points?', application: 'A customer wants a free medium drink. What spend is needed?', correct: 'About VND 1 million', wrong: ['About VND 10,000', 'About VND 100,000', 'About VND 100 million'], explanation: '100 points times VND 10,000. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on loyalty-member counts and staff turnover for the main chains?', application: 'A report quotes retention rates. Is there a public source?', correct: 'No public data was found', wrong: ['Members exceed 10 million', 'Turnover is zero', 'Counts are published monthly'], explanation: 'Gaps are stated explicitly. Review Chapter 3.' },
]);

export const LESSON_C4_4: CoffeeM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can name the capabilities that decide who wins in coffeehouse retail and see how Vietnamese chains are building them.',
    keyTakeaways: [
      'Winners give customers a reason to visit and a reason to return.',
      'Expansion quality means returns per outlet, not store count.',
      'Same-store sales and daily revenue per store test whether sites earn more.',
      'Digital tools matter when they strengthen retention and operations.',
      'Loyalty and governance systems keep quality consistent as networks scale.',
    ],
    businessImplications: 'Invest in consistent product, disciplined sites and identity-based loyalty before adding more stores.',
    remember: 'Winning brands earn the visit, then earn the return.',
    nextLesson: 'SWOT & Strategic Challenges',
  },
};
