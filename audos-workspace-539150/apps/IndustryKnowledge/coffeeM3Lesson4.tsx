import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '4. Revenue Streams & Cost Structure';

const deck = [
  c3Chapter({
    title: 'Core Revenue Streams and Sales Mix', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the revenue streams of coffeehouse businesses and explain who earns each one.',
    mateIntro: 'A cup of coffee is the main product, but it is rarely the only way a coffee business makes money.',
    keyInsight: 'Coffeehouse revenue comes from several streams, led by beverages, with food, packaged products, supply to partners, fees and delivery adding to the mix. The same cup can create income for an operator, a brand owner or a platform, so the first question about any revenue figure is who actually earns it.',
    statTiles: [
      { value: '6', label: 'Core revenue streams', subtitle: 'Beverages to delivery', description: 'Beverage sales, food and add-ons, packaged products, supply to agents, franchise fees and delivery sales.' },
      { value: 'VND 110K', label: 'Average receipt per visit in a 200-receipt study', subtitle: 'Q&Me, indicative', description: 'The average ticket across drink-only and drink-plus-food visits.' },
      { value: '18.5%', label: 'Share of sampled receipts that included food', subtitle: 'Q&Me, indicative', description: 'Food is a minority of visits but a large uplift on the ticket.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The receipt figures come from only 200 receipts, and company revenue figures are as reported by the press from parent groups.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse businesses earn from beverage sales, food and add-ons, packaged coffee and tea sold at retail, supply of coffee and materials to agents, franchise fees and, for brand owners, royalties. Delivery orders add revenue but share it with the platform.' },
      { label: 'Why it is happening', text: 'Beverages bring customers in and carry most revenue, but their margin is limited by competition. Operators broaden the mix with food and packaged goods, while brand owners add fee and supply income that does not depend on running every store.' },
      { label: 'Real-world example', text: 'A chain sells drinks and pastries in its stores, bags of beans in supermarkets, and syrups and cups to franchise partners, and takes a delivery order from an app that keeps a commission. Each stream has different margin, risk and customer.' },
      { label: 'Vietnam example', text: 'Highlands was reported to earn about VND 15–16 million a day per store at end-2024 across 850 stores, a system estimate calculated by the reporter from parent-group disclosures. Phúc Long reported first-half 2025 revenue of VND 858 billion and sells packaged tea and coffee through supermarkets as well as its own stores. Milano Coffee says it earns from supplying coffee to agents, E-Coffee advertises a zero-fee franchise, and delivery orders carry platform commissions of 20–30% before advertising, so a VND 100,000 order at a 30% commission leaves VND 70,000.' },
      { label: 'Business impact', text: 'The sales mix determines how resilient a business is to cost shocks and how much it depends on any one customer, partner or platform. Diverse streams can add stability, but only when each is profitable on its own terms.' },
    ],
    visualKind: 'coffee-m3-41-revenue', visualHeading: 'Six revenue streams and who earns them',
    visualIntro: 'Read the six streams and note who earns each one.',
    imageAlt: 'Casemate cards of six revenue streams of coffeehouse businesses',
    keyTerms: [
      { term: 'Sales mix', definition: 'The share of total revenue that comes from each product or stream.' },
      { term: 'Royalty', definition: 'A continuing fee paid by a franchisee to the brand owner.' },
      { term: 'Commission', definition: 'A share of each sale retained by a platform or intermediary.' },
      { term: 'Packaged products', definition: 'Retail goods such as bagged coffee or tea sold for use away from the café.' },
    ],
    recap: [
      'Beverages lead revenue, with food, packaged goods, supply, fees and delivery adding to it.',
      'Food is a minority of visits but lifts the ticket.',
      'Different streams are earned by operators, brand owners or platforms.',
      'Delivery revenue is shared with the platform.',
    ],
    chapterRecap: 'Revenue analysis starts with who earns each stream. A broad mix adds resilience when every stream is profitable and none is dependent on a single partner.',
    deepDiveTitle: 'Why revenue and income are not the same thing for a delivery order',
    body: <C3DeepDive paragraphs={[
      'A delivery sale of VND 100,000 appears in revenue at that figure, but at a 30% commission the operator keeps VND 70,000 before ingredients, packaging and labour. Two stores with equal revenue can earn very different profit if one sells more through apps.',
      'Operators therefore track revenue by channel and net it down by commission, packaging and promotions before comparing channels.' ]} evidence="The per-store figure is from CafeBiz reporting Jollibee Foods Corporation and is the reporter’s estimate; Phúc Long revenue is from a Doanh nhan report; commissions are from Tuoi Tre; Milano and E-Coffee terms are company statements; receipt figures are from a small Q&Me study. The worked example uses the Tuoi Tre figures." />,
    sources: citeC3('qmeReceipts', 'highlandsModelMix', 'chainRace2025', 'phucLongAbout', 'milanoFranchise', 'investorEcoffee', 'tuoitreDelivery'),
  }),
  c3Chapter({
    title: 'Cost Structure and Operating Leverage', chapterTitle: LESSON, readingTime: '7',
    objective: 'Break down the cost of a cup and explain how fixed costs create operating leverage.',
    mateIntro: 'The price on the menu is not the profit. Ingredients, staff, rent and platform fees all take a share before anything is left.',
    keyInsight: 'A coffeehouse has a mix of variable costs that rise with every cup and fixed costs that must be paid however many cups are sold. Because fixed costs are spread over volume, extra sales raise profit faster than revenue, and falling sales cut it faster, which is operating leverage.',
    statTiles: [
      { value: '6', label: 'Main cost lines', subtitle: 'Ingredients to platform fees', description: 'Ingredients, labour, rent, utilities, marketing and platform fees, and depreciation and other overheads.' },
      { value: 'VND 5,500 of 25,000', label: 'Ingredient cost in an operator’s example cup', subtitle: 'VnExpress', description: 'About 22% of the price, with labour of about VND 4,500 and fixed costs of about VND 5,000.' },
      { value: '+6.08%', label: 'Rise in housing, electricity and water prices in 2025', subtitle: 'iPOS.vn report deck', description: 'Occupancy costs rose faster than overall consumer prices, up 3.31%.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The cup breakdown is an operator example reported by VnExpress, not an audit, and the 22% share is our arithmetic.',
    narrative: [
      { label: 'What it is', text: 'Variable costs, such as ingredients, packaging and platform commission, rise with each cup sold. Fixed costs, such as rent, core staff, utilities and equipment charges, stay the same over a range of volumes. Operating leverage is the effect of fixed costs on how profit responds to sales.' },
      { label: 'Why it is happening', text: 'Because rent and core staffing are set in advance, a café that sells more cups spreads them thinner and profit rises quickly. A café whose volume falls keeps paying them, so profit can fall sharply even on a small sales decline.' },
      { label: 'Real-world example', text: 'A shop with VND 2 million of daily fixed costs spreads VND 10,000 per cup over 200 cups and VND 5,000 per cup over 400 cups. Doubling volume halves fixed cost per cup, which can turn a loss into a profit without any price change. These figures are our illustration.' },
      { label: 'Vietnam example', text: 'An operator example in VnExpress breaks a VND 25,000 coffee into ingredients of about VND 5,500, labour of about VND 4,500 and fixed costs of about VND 5,000. VTV reported ingredients at about 20–35% of a cup’s cost, and the VnExpress example sits at about 22%. In the VCCI report of the iPOS.vn survey, 69.38% of businesses faced rising raw-material costs. From 1 January 2026 the Region I minimum wage is VND 5.31 million a month, an average rise of 7.2% across regions, and the iPOS.vn deck shows housing, electricity and water prices up 6.08% in 2025.' },
      { label: 'Business impact', text: 'Operating leverage rewards busy stores and punishes quiet ones, so location and traffic matter as much as price. Understanding which costs are fixed tells operators how much volume they must protect.' },
    ],
    visualKind: 'coffee-m3-42-cost', visualHeading: 'Where the money goes in a VND 25,000 coffee',
    visualIntro: 'Compare the itemised costs of an operator’s example cup and the unexplained balance.',
    imageAlt: 'Casemate bar chart of the illustrative cost of a VND 25,000 coffee',
    keyTerms: [
      { term: 'Variable cost', definition: 'A cost that rises and falls with the number of cups sold.' },
      { term: 'Fixed cost', definition: 'A cost that stays the same over a range of volumes, such as rent.' },
      { term: 'Operating leverage', definition: 'The extent to which fixed costs make profit change faster than sales.' },
      { term: 'Contribution', definition: 'Price less variable cost: what each cup adds toward fixed costs and profit.' },
    ],
    recap: [
      'Variable costs rise per cup; fixed costs do not.',
      'Fixed costs spread over volume, which creates operating leverage.',
      'Ingredient cost in a reported example was about 22% of the price.',
      'Wages and occupancy costs rose in Vietnam in 2025–26.',
    ],
    chapterRecap: 'Costs behave differently with volume. Knowing which costs are fixed shows how far traffic must be protected and why volume swings affect profit more than revenue.',
    deepDiveTitle: 'Why the balance of a cup is not the same as profit',
    body: <C3DeepDive paragraphs={[
      'In the VnExpress example, three itemised costs add to VND 15,000 of a VND 25,000 cup, leaving VND 10,000. The source does not say what that VND 10,000 contains, so it should not be read as profit; it may cover other costs, platform fees, tax or margin.',
      'The lesson is to ask what a cost breakdown leaves out before judging profitability from it.' ]} evidence="The cup example is from VnExpress; the balance is our own calculation; the ingredient share range is from VTV; wage data are from Vietnam Social Security; inflation and occupancy data are from the iPOS.vn report deck; the raw-material figure is from VCCI. The VND 2 million fixed-cost illustration is hypothetical." />,
    sources: citeC3('vnexpressCupCost', 'vtvCoffeePrices', 'vcciFnb2026', 'minWageDecree', 'iposReportDeck'),
  }),
  c3Chapter({
    title: 'Unit Economics, Break-Even, and Profitability', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how a single store is judged on sales per day, contribution, break-even and payback.',
    mateIntro: 'Chains talk about hundreds of stores, but money is made or lost one store at a time.',
    keyInsight: 'Unit economics judge the single store: daily sales against variable and fixed costs, the volume needed to break even and the time to recover the investment. Chain-level averages hide strong and weak stores, so profitability depends on opening stores that clear their break-even point quickly.',
    statTiles: [
      { value: '6', label: 'Unit economics measures', subtitle: 'Sales per day to payback', description: 'Daily sales, ticket, contribution margin, fixed costs, break-even volume and payback.' },
      { value: 'VND 15–16M', label: 'Reported average daily sales per Highlands store at end-2024', subtitle: 'CafeBiz, reporter’s calculation', description: 'An average across 850 stores that hides differences between stores.' },
      { value: '~VND 1,050B', label: 'Highlands profit figure reported for 2024', subtitle: 'Reported as EBITDA by one outlet and as pre-tax profit by another', description: 'Two reports use the same figure with different labels.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Highlands figures are press reports from the parent group, and one outlet calls the profit figure EBITDA while another calls it pre-tax profit, so use it as scale, not as a precise margin.',
    narrative: [
      { label: 'What it is', text: 'Unit economics measure what one store earns and spends: sales per day, average ticket, contribution after variable costs, fixed costs, the break-even volume at which contribution covers fixed costs and the payback period for the opening investment.' },
      { label: 'Why it is happening', text: 'A chain’s profit is the sum of its stores. Strong stores can hide weak ones in an average, and a chain that opens too many stores below break-even can grow revenue while profit shrinks.' },
      { label: 'Real-world example', text: 'Suppose a cup sells for VND 25,000 with ingredient cost of VND 5,500, a contribution of VND 19,500. If daily fixed costs were VND 6 million, break-even would be about 308 cups a day. A store selling 300 cups loses money; one selling 450 earns a clear profit. This is our illustration with assumed fixed costs.' },
      { label: 'Vietnam example', text: 'Momentum Works reported that a typical Vietnam store serves 300–400 cups a day while leading brands sell 600–800. Highlands was reported to average VND 15–16 million a day per store in 2024, with a profit figure of about VND 1,050 billion. Phúc Long reported first-half 2025 revenue of VND 858 billion and profit after tax of VND 86 billion, a margin of about 10% by our arithmetic. A secondary consultancy page gives indicative payback ranges, from 4–8 months for kiosks to 18–36 months for premium cafés, which are unaudited rules of thumb.' },
      { label: 'Business impact', text: 'Store-level economics decide where to open, which stores to fix and which to close. Operators who track break-even and payback by store can scale confidently, while those who watch only total sales may expand into losses.' },
    ],
    visualKind: 'coffee-m3-43-unit', visualHeading: 'Five steps from daily sales to payback',
    visualIntro: 'Follow the five steps a store passes through before it recovers its investment.',
    imageAlt: 'Casemate step diagram from daily sales to break-even and payback for a coffeehouse store',
    keyTerms: [
      { term: 'Unit economics', definition: 'The revenue and costs attributable to a single unit, here one store.' },
      { term: 'Break-even', definition: 'The sales volume at which contribution equals fixed costs.' },
      { term: 'Payback period', definition: 'The time needed to recover the opening investment from store cash flow.' },
      { term: 'EBITDA', definition: 'Earnings before interest, tax, depreciation and amortisation.' },
    ],
    recap: [
      'Judge each store on sales per day, contribution and fixed costs.',
      'Break-even is the volume at which contribution covers fixed costs.',
      'Averages hide weak and strong stores.',
      'Payback ranges from secondary sources are indicative only.',
    ],
    chapterRecap: 'Chains are built from single stores. The strongest operators measure each store against its break-even point and opening cost, and they grow where stores reach those thresholds quickly.',
    deepDiveTitle: 'Why an average of VND 15–16 million a day does not describe every store',
    body: <C3DeepDive paragraphs={[
      'An average is the total divided by the number of stores. Some stores in prime sites will sell far more and some in weak sites far less, and the average describes neither.',
      'The reporter’s system estimate is also a calculation from parent-group disclosures, not a figure the company published store by store.' ]} evidence="Daily sales per store and the profit figure are from CafeBiz reporting Jollibee Foods Corporation; the alternative label for the profit figure is from Doanh nhan; cups a day are from VnExpress International reporting Momentum Works; Phúc Long results are from Doanh nhan and the margin is our arithmetic; payback ranges are from a Validator.vn page and are indicative only. The break-even example is hypothetical." />,
    sources: citeC3('highlandsModelMix', 'chainRace2025', 'vnexpressChains', 'vnexpressCupCost', 'secondaryUnitEconomics'),
  }),
];

const quiz = c3Quiz('coffee-m3-l4', [
  { chapter: '1', objective: 'List revenue streams', question: 'Which of these is a revenue stream for a brand owner, not only an operator?', application: 'A brand sells coffee to agents. What kind of stream is it?', correct: 'Supply to agents and franchise fees', wrong: ['Rent paid to a landlord', 'Staff wages', 'Utilities'], explanation: 'Brand owners earn from supply and fees. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the food share', question: 'What share of sampled receipts included food?', application: 'An owner plans a bakery. What does the sample suggest about attach rate?', correct: '18.5%', wrong: ['77%', '100%', '1%'], explanation: 'Most receipts were drink only. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply a commission', question: 'At a 30% commission, how much of a VND 100,000 delivery order does the operator keep before costs?', application: 'An owner reviews a delivery sale. What is left?', correct: 'VND 70,000', wrong: ['VND 100,000', 'VND 30,000', 'VND 130,000'], explanation: 'Commission reduces net revenue. Review Chapter 1.' },
  { chapter: '2', objective: 'Define operating leverage', question: 'What is operating leverage?', application: 'Sales rise 10% and profit rises more. Why?', correct: 'The effect of fixed costs making profit change faster than sales', wrong: ['A bank loan', 'A type of coffee bean', 'A discount scheme'], explanation: 'Fixed costs are spread over volume. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the cup breakdown', question: 'In the VnExpress example, what were the ingredient costs of a VND 25,000 coffee?', application: 'A student asks how much of the cup is ingredients. What is the figure?', correct: 'About VND 5,500', wrong: ['About VND 15,000', 'About VND 25,000', 'About VND 500'], explanation: 'That is about 22% of the price. Review Chapter 2.' },
  { chapter: '2', objective: 'Read the balance carefully', question: 'Why should the VND 10,000 balance not be read as profit?', application: 'A founder calls it the margin. What should be said?', correct: 'The source does not say what it contains', wrong: ['It is audited profit', 'It is tax only', 'It is the supplier price'], explanation: 'Balance is our arithmetic. Review Chapter 2.' },
  { chapter: '3', objective: 'Define break-even', question: 'What is break-even in store economics?', application: 'A store sells enough to cover fixed costs and nothing more. Where is it?', correct: 'The volume at which contribution equals fixed costs', wrong: ['The first day of trading', 'The day of highest sales', 'The point at which all loans are repaid'], explanation: 'Contribution must cover fixed cost. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare cups a day', question: 'How many cups a day did Momentum Works report for a typical store and for leading brands?', application: 'An analyst benchmarks a store. What range applies?', correct: '300–400 for a typical store and 600–800 for leading brands', wrong: ['10 and 20', '3,000 and 8,000', '50 and 60'], explanation: 'Leaders sell about twice as many. Review Chapter 3.' },
  { chapter: '3', objective: 'Handle conflicting labels', question: 'How should the Highlands VND 1,050 billion figure be treated?', application: 'Two articles label it differently. What should an analyst do?', correct: 'Use it as scale and note that it is called EBITDA by one outlet and pre-tax profit by another', wrong: ['Treat it as audited net profit', 'Ignore both', 'Treat it as monthly profit'], explanation: 'Labels differ. Review Chapter 3.' },
  { chapter: '3', objective: 'Judge payback sources', question: 'How reliable are the 4–36 month payback ranges?', application: 'A founder plans a kiosk on a 4-month payback. What caution applies?', correct: 'They are unaudited rules of thumb from a secondary source', wrong: ['They are audited results', 'They are guaranteed by law', 'They come from stock filings'], explanation: 'Treat as indicative. Review Chapter 3.' },
]);

export const LESSON_C3_4: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can map coffeehouse revenue streams, split a cup into costs and judge a store on break-even and payback.',
    keyTakeaways: [
      'Revenue comes from several streams, and each is earned by an operator, brand owner or platform.',
      'Variable costs rise per cup; fixed costs do not, which creates operating leverage.',
      'Wages and occupancy costs rose in Vietnam in 2025–26.',
      'Judge each store on break-even and payback, not chain averages.',
      'Reported averages and payback ranges are indicative and labelled by source.',
    ],
    businessImplications: 'Track revenue net of commission, protect volume against fixed costs and open stores that clear break-even quickly.',
    remember: 'Profit is made one store at a time.',
    nextLesson: 'Distribution & Sales Channels',
  },
};
