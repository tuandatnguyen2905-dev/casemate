import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '5. Inputs, Outputs & Value Creation';

const deck = [
  c2Chapter({
    title: 'Key Inputs and Operational Resources', chapterTitle: LESSON, readingTime: '7',
    objective: 'Group the resources a coffeehouse combines and explain why the cheapest input is not always the best.',
    mateIntro: 'Beans and milk are only part of what a café needs. People, money, data and brand are inputs too, and each has a cost.',
    keyInsight: 'Input management should focus on the resources that most directly affect customer value and operating performance. The lowest-cost input is not always the most economical choice if it compromises quality, increases waste, or reduces service reliability.',
    statTiles: [
      { value: '6', label: 'Key input and resource groups', subtitle: 'Physical inputs to operating infrastructure', description: 'Physical inputs, human resources, financial resources, technology and data, intangible resources, and operating infrastructure.' },
      { value: '69.38%', label: 'Share of surveyed F&B businesses hit by higher raw-material costs in 2025', subtitle: 'iPOS.vn and Nestlé Professional, via VCCI', description: 'Input costs are a widely felt pressure.' },
      { value: 'VND 500B', label: 'Highlands’ investment in its roastery', subtitle: 'Company and press reports', description: 'An example of the capital that infrastructure can require.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the cost-pressure share is a survey of about 3,000 businesses and the roastery cost is a company-reported figure.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retailers combine physical inputs with human, financial, technological, and intangible resources. Physical inputs include ingredients, packaging, equipment, utilities, and store facilities. Other essential resources include employees, recipes, brand identity, supplier relationships, operational knowledge, customer data, and working capital.' },
      { label: 'Why it is happening', text: 'The relative importance of each input depends on the business model. A specialty café may place greater emphasis on coffee quality and barista expertise, while a high-volume quick-service restaurant may prioritize procurement scale, kitchen productivity, and standardized workflows.' },
      { label: 'Real-world example', text: 'A retailer needs coffee beans, milk, ingredients, packaging, machines, furniture and utilities; baristas, chefs, service staff, managers, trainers and buyers; start-up money, working capital, rent, payroll and expansion funding; point of sale, inventory software, customer data and analytics; brand reputation, recipes, service standards, loyalty and supplier relationships; and sites, kitchens, warehouses, central production and distribution networks.' },
      { label: 'Vietnam example', text: 'In the iPOS.vn survey of 3,001 businesses, 69.38% reported pressure from sharply higher raw-material costs in 2025, and 57.11% were concerned about e-invoicing and tax rules. From 1 January 2026 the Region I monthly minimum wage rose to VND 5.31 million. Highlands invested about VND 500 billion in a roastery, and Phúc Long plans to link its loyalty programme to Masan’s retail ecosystem, so data and brand are treated as inputs too. The sources reviewed give no published rent benchmarks for café sites, so none are stated.' },
      { label: 'Business impact', text: 'Value creation begins with combining the right inputs in a way that supports the brand’s customer proposition. Resource allocation should reflect product quality requirements, store economics, and the capabilities needed to deliver consistent service.' },
    ],
    visualKind: 'coffee-m2-51-inputs', visualHeading: 'Six kinds of input and resource',
    visualIntro: 'Read six groups of inputs, with examples and why each matters.',
    imageAlt: 'Casemate table of six groups of inputs and operating resources for coffeehouse retailers',
    keyTerms: [
      { term: 'Working capital', definition: 'Cash tied up in stock and short-term obligations.' },
      { term: 'Intangible resource', definition: 'A non-physical asset such as brand, recipes or relationships.' },
      { term: 'Operating infrastructure', definition: 'The sites, kitchens and networks a business runs on.' },
      { term: 'Input management', definition: 'Choosing and controlling the resources a business uses.' },
    ],
    recap: [
      'Retailers combine physical, human, financial, technological and intangible inputs.',
      'Importance depends on the business model.',
      'Focus on inputs that drive customer value and performance.',
      'The cheapest input can cost more through waste, quality or reliability.',
    ],
    chapterRecap: 'Value creation begins with combining the right inputs in a way that supports the brand’s customer proposition. Resource allocation should reflect product quality requirements, store economics, and the capabilities needed to deliver consistent service.',
    deepDiveTitle: 'Treating data and brand as inputs with a cost',
    body: <C2DeepDive paragraphs={[
      'A loyalty programme costs money to build and run, yet it also produces customer data and repeat visits. Brand reputation takes years to earn and can be lost by inconsistent service.',
      'Listing such intangibles next to beans and rent helps owners decide where to invest, and what to protect.' ]} evidence="The six groups are described in the supplied material. The survey shares are from the iPOS.vn and Nestlé Professional report as reported by VCCI; the wage is from a Vietnam Social Security summary of Decree 293/2025/ND-CP; the roastery is from Viet Nam News; the loyalty plan is from a Masan Group interview." />,
    sources: citeC2('vcciFnb2026', 'vcciFnbEnglish', 'minWageDecree', 'highlandsRoastery', 'masanPhucLong'),
  }),
  c2Chapter({
    title: 'Core Processes, Outputs, and Customer Value', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the outputs of a coffeehouse beyond the drink itself and how customer value depends on their combination.',
    mateIntro: 'Customers pay for more than a drink: speed, a seat, a friendly face, a place to work. Each format sells a different mix.',
    keyInsight: 'Retail value is created when the delivered experience meets or exceeds customer expectations at a price the customer considers reasonable. Product quality, service reliability, convenience, and perceived value jointly influence satisfaction and repeat purchasing.',
    statTiles: [
      { value: '6', label: 'Key process and output activities', subtitle: 'Product transformation to feedback-driven improvement', description: 'Product transformation, service delivery, convenience creation, experience delivery, customer relationship development and feedback-driven improvement.' },
      { value: '65.58%', label: 'Share of surveyed businesses with stable or growing revenue in 2025', subtitle: 'iPOS.vn and Nestlé Professional, via VCCI', description: 'Most operators held or grew sales.' },
      { value: '~43%', label: 'Share of outlets reporting lower revenue in the first half of 2026', subtitle: 'iPOS.vn and Nestlé Professional', description: 'Customer value is not evenly delivered across outlets.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the revenue shares come from surveys of operators in different periods and show the spread of results, not an industry total.',
    narrative: [
      { label: 'What it is', text: 'The core transformation process converts ingredients and operational resources into ready-to-consume food and beverages, supported by service, convenience, and the retail environment. The outputs may include finished products, completed orders, hospitality experiences, customer relationships, and operational information that supports future decisions.' },
      { label: 'Why it is happening', text: 'Customer value extends beyond the physical product. Customers may value taste, freshness, convenience, speed, customization, price, ambience, or the suitability of a location for social interaction and work. Different formats emphasize different combinations of these benefits.' },
      { label: 'Real-world example', text: 'A café converts ingredients into drinks, meals and desserts; delivers accurate, timely, customised service; offers accessible locations, efficient ordering, flexible pickup and suitable hours; provides ambience, comfort or a distinctive setting; builds repeat visits through consistency, loyalty benefits and relevant offers; and uses sales and comments to refine recipes, service and procedures.' },
      { label: 'Vietnam example', text: 'The iPOS.vn survey found 65.58% of businesses had stable or growing revenue in 2025, and in the first half of 2026 about 43% of outlets reported lower revenue, with only 15.82% of beverage outlets growing against 25.64% of food outlets. Its trend ranking put ultra-cheap fixed-price drinks first at 39.19% and named multi-purpose cafés and 24/7 coffee among the trends, while USDA reports that consumer preferences are shifting toward premium, specialty and creative coffee. Different formats therefore serve different mixes of price, convenience and ambience.' },
      { label: 'Business impact', text: 'The outputs of foodservice retail include both tangible products and intangible experiences. Businesses create stronger customer value when the product, service, price, and environment work together coherently.' },
    ],
    visualKind: 'coffee-m2-52-outputs', visualHeading: 'Formats by ambience and speed',
    visualIntro: 'Place five formats on a matrix of how much ambience and how much speed customers expect.',
    imageAlt: 'Casemate matrix of five coffeehouse formats by importance of ambience and importance of speed',
    keyTerms: [
      { term: 'Customer value', definition: 'The benefits a customer receives compared with the price paid.' },
      { term: 'Perceived value', definition: 'How worthwhile the customer judges the offer to be.' },
      { term: 'Customisation', definition: 'Adjusting a product to the customer’s request.' },
      { term: 'Feedback loop', definition: 'Using customer responses to improve products and service.' },
    ],
    recap: [
      'Outputs include products, orders, experiences, relationships and information.',
      'Customers value taste, freshness, speed, customisation, price, ambience and location.',
      'Formats emphasise different mixes of benefits.',
      'Product, service, price and environment must fit together.',
    ],
    chapterRecap: 'The outputs of foodservice retail include both tangible products and intangible experiences. Businesses create stronger customer value when the product, service, price, and environment work together coherently.',
    deepDiveTitle: 'Why the same price can feel fair in one venue and not in another',
    body: <C2DeepDive paragraphs={[
      'A customer may happily pay more for a drink in a quiet, comfortable café where they can work for two hours, yet consider the same price too high at a kiosk where they stand for a minute.',
      'Perceived value depends on the whole experience, so price, product and environment should be planned as one proposition.' ]} evidence="The six activities are described in the supplied material. Survey shares and trend rankings are from the iPOS.vn and Nestlé Professional reports as reported by VCCI and the first-half 2026 release; preference shifts are from USDA reporting." />,
    sources: citeC2('vcciFnb2026', 'iposH12026', 'usdaCoffeeAnnual'),
  }),
  c2Chapter({
    title: 'Financial Value Creation and Performance Measurement', chapterTitle: LESSON, readingTime: '8',
    objective: 'Use store-level measures to judge which products, channels and outlets earn a return.',
    mateIntro: 'Sales can rise while profit falls. The numbers that matter are the ones that show what each store, product and channel actually keeps.',
    keyInsight: 'Store-level contribution and return on invested capital are more informative than sales growth alone. Retailers need to understand which products, outlets, and channels create sustainable margins and which consume resources without generating sufficient returns.',
    statTiles: [
      { value: '6', label: 'Key financial measurement activities', subtitle: 'Revenue analysis to store investment evaluation', description: 'Revenue analysis, average transaction value, gross margin management, labour productivity, waste and shrinkage control, and store investment evaluation.' },
      { value: 'VND 86B', label: 'Phúc Long’s profit after tax in the first half of 2025', subtitle: 'Reported up 63.5% on revenue of VND 858 billion', description: 'Profit grew faster than revenue, which rose 10.3%.' },
      { value: '~VND 1.1T', label: 'Highlands’ EBITDA in 2025', subtitle: 'The Viet Media, with same-store sales up over 8%', description: 'EBITDA is earnings before interest, tax, depreciation and amortisation.' },
    ],
    statsNote: 'The first tile is a count from this lesson; both results are company figures as reported by the press, for different periods and measures, and they are not like-for-like.',
    narrative: [
      { label: 'What it is', text: 'Financial value is generated when revenue from food, beverages, and related services exceeds the costs required to acquire inputs, operate stores, serve customers, and support the business. Major cost categories include ingredients, labor, rent, utilities, equipment, packaging, delivery commissions, marketing, and corporate overhead.' },
      { label: 'Why it is happening', text: 'Because many costs are incurred regardless of daily sales volume, store utilization and sales productivity are important. High revenue does not necessarily indicate strong profitability if a store requires excessive staffing, has high rent, generates substantial waste, or depends heavily on discounted orders.' },
      { label: 'Real-world example', text: 'An operator tracks sales by product category, store, daypart, customer segment and channel; measures average spending per order and cross-selling; watches ingredient costs, pricing, portions and mix; measures sales or transactions per labour hour; monitors expired ingredients, errors, unsold food and stock gaps; and assesses start-up cost, payback, contribution margin and return on invested capital for each store.' },
      { label: 'Vietnam example', text: 'Phúc Long reported first-half 2025 revenue of VND 858 billion, up 10.3%, and profit after tax of VND 86 billion, up 63.5%, and its third-quarter net margin was reported at 10.8%. Highlands’ EBITDA was reported at about VND 1.1 trillion in 2025 with same-store sales up more than 8%, and its parent reported pre-tax profit of about VND 1,050 billion in 2024. At the other end, a VTV report put ingredients at about 20–35% of a cup’s cost, and the iPOS.vn survey found 69.38% of operators facing higher raw-material costs. The sources reviewed give no published payback periods or store-level contribution margins, so none are stated.' },
      { label: 'Business impact', text: 'Financial value creation requires coordinated management of revenue, direct costs, store expenses, and investment. Strong operators measure performance at product, channel, and store levels to identify profitable growth opportunities.' },
    ],
    visualKind: 'coffee-m2-53-financial', visualHeading: 'Six measures of financial value creation',
    visualIntro: 'Read six measures, what each shows and what to do with it.',
    imageAlt: 'Casemate table of six financial measures for coffeehouse and foodservice retail',
    keyTerms: [
      { term: 'Contribution margin', definition: 'Sales minus the direct costs of the product or store.' },
      { term: 'Return on invested capital', definition: 'Profit earned compared with the money invested.' },
      { term: 'EBITDA', definition: 'Earnings before interest, tax, depreciation and amortisation.' },
      { term: 'Payback period', definition: 'The time a store takes to recover its investment.' },
    ],
    recap: [
      'Profit exists when revenue exceeds input, operating, service and overhead costs.',
      'Many costs are fixed, so utilisation and productivity matter.',
      'High revenue can hide high rent, staffing, waste or discounting.',
      'Measure by product, channel and store to find profitable growth.',
    ],
    chapterRecap: 'Financial value creation requires coordinated management of revenue, direct costs, store expenses, and investment. Strong operators measure performance at product, channel, and store levels to identify profitable growth opportunities.',
    deepDiveTitle: 'Why a store with high sales can still earn little',
    body: <C2DeepDive paragraphs={[
      'A busy store in a prime location may pay high rent, employ extra staff for peak hours and sell many discounted drinks. After those costs, its contribution can be lower than a quieter, cheaper site.',
      'Calculating contribution and return on the capital invested, store by store, reveals which sites deserve more investment and which need fixing.' ]} evidence="The six activities are described in the supplied material. Phúc Long and Highlands results are company figures reported by Doanh nhan, Kinh te Do thi and The Viet Media and are for different periods and measures; the ingredient share is from a VTV report; the cost-pressure share is from the iPOS.vn survey as reported by VCCI." />,
    sources: citeC2('chainRace2025', 'highlandsPhucLongQ3', 'vietmediaChains', 'vtvCoffeePrices', 'vcciFnb2026'),
  }),
];

const quiz = c2Quiz('coffee-m2-l5', [
  { chapter: '1', objective: 'State the input focus', question: 'What should input management focus on?', application: 'A manager tracks every cost equally. What should be the priority?', correct: 'The resources that most directly affect customer value and operating performance', wrong: ['The cheapest items only', 'The largest items only', 'Items nobody uses'], explanation: 'Focus on what drives value. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the cheapest-input trap', question: 'Why is the lowest-cost input not always the most economical?', application: 'A cheap bean causes waste and complaints. What was missed?', correct: 'It may compromise quality, increase waste or reduce service reliability', wrong: ['It always saves money', 'It never affects quality', 'Customers never notice'], explanation: 'Total cost matters. Review Chapter 1.' },
  { chapter: '1', objective: 'List resource groups', question: 'Which is an intangible resource?', application: 'A founder lists non-physical assets. Which belongs?', correct: 'Brand reputation', wrong: ['Espresso machines', 'Rent', 'Cups'], explanation: 'Brand is intangible. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the survey share', question: 'What share of surveyed F&B businesses reported higher raw-material costs in 2025?', application: 'A planner checks cost pressure. What is the figure?', correct: '69.38%', wrong: ['6.9%', '19.4%', '99%'], explanation: 'A widely felt pressure. Review Chapter 1.' },
  { chapter: '2', objective: 'State when value is created', question: 'When is retail value created?', application: 'A café has a great drink but a slow queue. What is missing?', correct: 'When the delivered experience meets or exceeds expectations at a price the customer considers reasonable', wrong: ['When price is lowest', 'When sales are highest', 'When stores are largest'], explanation: 'Expectation and price. Review Chapter 2.' },
  { chapter: '2', objective: 'List outputs', question: 'Which is an output of foodservice retail beyond finished products?', application: 'A manager lists non-product outputs. Which belongs?', correct: 'Hospitality experiences and customer relationships', wrong: ['Only waste', 'Only invoices', 'Only equipment'], explanation: 'Outputs include experiences. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare formats', question: 'Why do different formats emphasise different benefits?', application: 'A kiosk and a lifestyle café differ. Why?', correct: 'They serve different combinations of speed, convenience, price and ambience', wrong: ['They sell identical things', 'They ignore customers', 'They share a menu'], explanation: 'Each fits an occasion. Review Chapter 2.' },
  { chapter: '3', objective: 'State the better financial measure', question: 'What is more informative than sales growth alone?', application: 'An investor sees rising sales. What else should be checked?', correct: 'Store-level contribution and return on invested capital', wrong: ['Number of posters', 'Staff count', 'Menu length'], explanation: 'Sales can hide weak returns. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain fixed-cost leverage', question: 'Why do store utilisation and sales productivity matter?', application: 'Rent is the same every day. What drives profit?', correct: 'Many costs are incurred regardless of daily sales, so sales per store matters', wrong: ['Costs vary with every sale', 'Rent disappears', 'Staff cost nothing'], explanation: 'Fixed costs need volume. Review Chapter 3.' },
  { chapter: '3', objective: 'Treat company figures carefully', question: 'How should the Phúc Long and Highlands results be read together?', application: 'A slide compares them directly. What is the caution?', correct: 'They are company figures for different periods and measures, so not like for like', wrong: ['They are audited and identical', 'They cover the same year', 'They are official statistics'], explanation: 'Compare like with like. Review Chapter 3.' },
]);

export const LESSON_C2_5: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can group the inputs a coffeehouse combines, describe the outputs customers value and use store-level measures to judge financial value.',
    keyTakeaways: [
      'Retailers combine physical, human, financial, technological and intangible inputs.',
      'The cheapest input can be the costliest through waste or poor quality.',
      'Outputs include products, experiences, relationships and information.',
      'Value is created when experience meets expectation at a fair price.',
      'Store-level contribution and return matter more than sales growth alone.',
    ],
    businessImplications: 'Invest in the inputs that drive customer value, design the format around the benefits customers want and measure returns store by store.',
    remember: 'Measure what each store keeps, not just what it sells.',
    nextLesson: 'Global vs. Local Value Chain',
  },
};
