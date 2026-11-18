import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '3. Customer Segments & Needs';

const deck = [
  c3Chapter({
    title: 'Demographic and Lifestyle-Based Segments', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify the main demographic and lifestyle segments of coffeehouse customers and judge how strong the evidence is for each.',
    mateIntro: 'Not every customer wants the same café. Students, tourists, office workers and families each use coffeehouses differently, and not all are measured equally well.',
    keyInsight: 'Demographic and lifestyle segments are only useful where they predict a difference in behaviour, spending or needs. Operators should build offers around segments they can describe with evidence, and treat the rest as hypotheses to test.',
    statTiles: [
      { value: '6', label: 'Segment dimensions', subtitle: 'Age to lifestyle', description: 'Generation, income, occupation, household, location and lifestyle.' },
      { value: '21.2M', label: 'International visitors to Vietnam in 2025', subtitle: 'National Authority of Tourism, up 20.4%', description: 'A visitor segment that is large and growing.' },
      { value: '49%', label: 'Share of Gen Z respondents holding strictly to a spending budget', subtitle: 'Decision Lab survey, date not shown', description: 'A price-sensitive segment even in a growing market.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Decision Lab survey does not show its date on the page, and student figures come from interviews; no public Vietnam coffee-specific data on families or higher-income groups was found.',
    narrative: [
      { label: 'What it is', text: 'Demographic segments divide customers by age, generation, income, occupation or household type. Lifestyle segments group them by habits and values, such as students who study in cafés, remote workers, social groups or tourists seeking local experiences.' },
      { label: 'Why it is happening', text: 'A segment matters to an operator only if it behaves differently: it visits at a different time, spends a different amount, values a different feature or reacts differently to price. Segments with no measurable difference do not need a different offer.' },
      { label: 'Real-world example', text: 'A café near a university sells filter drinks at student prices and stays open late; a hotel-district café sells local specialities in English to visitors. The two share a brand but need different prices, staffing and signage.' },
      { label: 'Vietnam example', text: 'Students interviewed by VietNamNet in April 2025 visited cafés two to four times a week for VND 45,000–65,000 drinks, and one spent 10–15% of a monthly allowance. A Decision Lab survey found that 84% of respondents set limits on out-of-home spending, with 49% of Gen Z holding strictly to a budget, and that 57% enjoy drinks at cafés and milk-tea shops. Vietnam received nearly 21.2 million international visitors in 2025, up 20.4%. No public Vietnam coffee-specific data was found on families or higher-income households, so those segments remain hypotheses.' },
      { label: 'Business impact', text: 'Segment choice determines location, price, menu and format. Operators that name their core segment and design for it build clearer brands; operators that try to serve everyone end up with a generic offer.' },
    ],
    visualKind: 'coffee-m3-31-segments', visualHeading: 'Segments and the quality of the evidence',
    visualIntro: 'Read each segment, what the evidence shows and how strong the evidence is.',
    imageAlt: 'Casemate table of demographic and lifestyle segments with evidence quality for Vietnam coffeehouses',
    keyTerms: [
      { term: 'Segment', definition: 'A group of customers with similar behaviour or needs.' },
      { term: 'Gen Z', definition: 'The generation born roughly between the mid-1990s and the early 2010s.' },
      { term: 'Core segment', definition: 'The customer group a brand designs its offer around first.' },
      { term: 'Hypothesis', definition: 'An assumption to be tested with data before it guides investment.' },
    ],
    recap: [
      'Segments matter when they behave differently.',
      'Students, budget-conscious Gen Z and tourists are visible segments in Vietnam.',
      'Evidence quality varies: interviews, undated surveys and official counts.',
      'Families and higher-income groups have no public coffee-specific data.',
    ],
    chapterRecap: 'Good segmentation links a described group to a measurable difference in behaviour. Name your core segment, test the evidence behind it and treat unmeasured groups as hypotheses.',
    deepDiveTitle: 'Why a budget-conscious generation can still drive café growth',
    body: <C3DeepDive paragraphs={[
      'A strict budget does not mean no café visits; it means choosing where to spend. A drink priced at VND 45,000–65,000 can be the main out-of-home treat of a week for a student, so cafés compete for a fixed budget with other treats.',
      'That is why price, value perception and loyalty rewards matter more for this segment than for tourists, who often spend less carefully on a short trip.' ]} evidence="Student figures are from VietNamNet interviews; budget and café enjoyment figures are from a Decision Lab survey whose date is not shown on the page; tourist numbers are from the Vietnam News Agency reporting the National Authority of Tourism. The comparison between students and tourists is our own reasoning, not a measured result." />,
    sources: citeC3('studentCafes', 'decisionLabBudget', 'vnaTourism'),
  }),
  c3Chapter({
    title: 'Behavioral Segments and Purchase Occasions', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how behaviour, group size and basket content shape coffeehouse spending per visit.',
    mateIntro: 'Who you come with and whether you add food can change the bill more than which brand you choose.',
    keyInsight: 'Behaviour predicts spending better than demographics alone. Visit frequency, group size, order content and purchase occasion together decide the average ticket, so operators should read their own receipts before assuming what a segment is worth.',
    statTiles: [
      { value: '6', label: 'Behavioural dimensions', subtitle: 'Frequency to channel', description: 'Visit frequency, occasion, group size, basket content, channel and time of day.' },
      { value: '61–62%', label: 'Share of sampled receipts for solo visits', subtitle: 'Q&Me, 200 receipts', description: 'Most visits in the sample were made alone.' },
      { value: 'VND 180K', label: 'Top of the reported spend range for group visits', subtitle: 'Q&Me, 200 receipts', description: 'Groups spend more per receipt than the sample average of about VND 110,000.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The receipt study has only 200 receipts and its figures are indicative; no public Vietnam data on visits by time of day was found.',
    narrative: [
      { label: 'What it is', text: 'Behavioural segments divide customers by what they do rather than who they are: how often they visit, what occasion brings them, how many people come together, what they order and whether they buy in store or through an app.' },
      { label: 'Why it is happening', text: 'Two customers of the same age can behave very differently. A solo commuter buying one drink and a group of friends ordering drinks and food produce very different revenue, even in the same store on the same day.' },
      { label: 'Real-world example', text: 'A café reads its receipts and finds most visits are solo drinks at lunch, while groups come in the evening and add food. It staffs and prices accordingly, creating a lunchtime combo for solo customers and shareable items for groups.' },
      { label: 'Vietnam example', text: 'A Q&Me study of 200 receipts from coffee chains found solo visits at 61–62%, an average of about VND 110,000 a visit, drink-only receipts of about VND 88,000 and receipts with food of about VND 162,000, with group spending reported up to VND 180,000. The sample is small, so it shows how to analyse behaviour rather than a market-wide fact. Delivery, which reached US$2.1 billion in 2025, adds a separate occasion at home or in the office. No public Vietnam data on visits by time of day was found.' },
      { label: 'Business impact', text: 'Understanding behaviour shapes staffing, menu design, promotions and channel mix. Operators that track occasions can build offers for each, while those that look only at average sales miss large differences.' },
    ],
    visualKind: 'coffee-m3-32-behaviour', visualHeading: 'Average spend by occasion',
    visualIntro: 'Compare average spend for drink-only, average, drink-plus-food and group visits.',
    imageAlt: 'Casemate bar chart of average spend per order by occasion from a Vietnam receipt study',
    keyTerms: [
      { term: 'Behavioural segment', definition: 'A customer group defined by actions such as frequency, occasion or basket.' },
      { term: 'Purchase occasion', definition: 'The reason and setting that lead to a purchase.' },
      { term: 'Basket', definition: 'The items bought in a single order.' },
      { term: 'Daypart', definition: 'A part of the day, such as morning, lunch or evening.' },
    ],
    recap: [
      'Behaviour predicts spend better than demographics alone.',
      'In one small study most visits were solo.',
      'Adding food or visiting in a group raises the ticket.',
      'Read your own receipts before assuming what a segment is worth.',
    ],
    chapterRecap: 'Behavioural data shows what customers actually do. Receipts, occasions and baskets reveal differences that demographic labels miss.',
    deepDiveTitle: 'What a receipt can tell an operator that a survey cannot',
    body: <C3DeepDive paragraphs={[
      'A receipt records what was bought, when and for how much, without asking customers to remember or to say what sounds right. It shows real behaviour, but not why customers chose it.',
      'Combined with a short question or a loyalty identity, receipts become a strong tool for linking occasion, basket and customer type.' ]} evidence="All receipt figures are from a Q&Me summary of 200 receipts and are indicative; delivery value is from Momentum Works reported by VnExpress. The explanation of what receipts can show is our own reasoning." />,
    sources: citeC3('qmeReceipts', 'vnexpressDelivery'),
  }),
  c3Chapter({
    title: 'Customer Needs, Purchase Criteria, and Loyalty', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe what customers look for when choosing a coffeehouse and how loyalty programmes try to turn choice into habit.',
    mateIntro: 'A customer chooses a café for taste, price, place and mood. Loyalty programmes try to make the next choice easier.',
    keyInsight: 'Customers choose a coffeehouse on a bundle of criteria, led by product quality and value, and return when convenience and rewards make the choice easy. Loyalty programmes work when they capture identified customers and tie rewards to repeat behaviour, not when they only give discounts.',
    statTiles: [
      { value: '6', label: 'Purchase criteria', subtitle: 'Taste to rewards', description: 'Taste and quality, price and value, convenience, ambience, speed and service, and rewards.' },
      { value: '100 points', label: 'Phúc Long points for a free medium drink', subtitle: 'Company website', description: 'Earned at 1 point per VND 10,000 spent, so about VND 1 million of spend.' },
      { value: '56.9%', label: 'Share of users identified in a Highlands Zalo campaign', subtitle: 'Vendor case study, March 2025', description: 'Shows how a campaign can turn anonymous traffic into known customers.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Zalo and The Coffee House results are vendor-reported case studies, the spend per free drink is our arithmetic from the stated points rules, and no public member counts for the main chains were found.',
    narrative: [
      { label: 'What it is', text: 'Purchase criteria are the factors customers weigh when choosing a coffeehouse, such as taste, price, convenience, atmosphere, speed and rewards. Loyalty is repeated choice, supported by habit, satisfaction and sometimes programmes that reward it.' },
      { label: 'Why it is happening', text: 'Customers have many choices and compare quickly. Quality gets a customer in, value keeps the visit within a budget, convenience decides on a busy day, and loyalty rewards give a reason to return to the same brand.' },
      { label: 'Real-world example', text: 'A chain launches an app where each purchase earns points, higher spenders unlock tiers, and pre-ordering skips the queue. The app captures who the customer is, which lets the chain offer personal rewards instead of blanket discounts.' },
      { label: 'Vietnam example', text: 'Phúc Long gives one point per VND 10,000 spent, with 100 points exchanged for a free medium drink, which means about VND 1 million of spend per reward. Highlands replaced Highlands Rewards with the HighlandsĐI app on 19 December 2025, with tiers based on 12-month spend, and a Zalo Mini App voucher campaign was reported by the vendor to draw over 2 million users, identify 56.9% of them and gain 347,000 Zalo follows. The Coffee House’s vendor case study describes 20 points for a free drink and about 100,000 downloads after two years. A Decision Lab survey found 84% of respondents set limits on out-of-home spending, so value matters. No public member counts for these programmes were found.' },
      { label: 'Business impact', text: 'Loyalty programmes build data, repeat visits and a direct channel to customers, reducing reliance on platforms. They also cost money, so operators should measure incremental visits rather than just sign-ups.' },
    ],
    visualKind: 'coffee-m3-33-loyalty', visualHeading: 'From quality to loyalty in five layers',
    visualIntro: 'Read the layers from the base up and see what Vietnam evidence supports each.',
    imageAlt: 'Casemate pyramid from taste and quality up to loyalty and advocacy for coffeehouse customers',
    keyTerms: [
      { term: 'Purchase criteria', definition: 'The factors a customer weighs when choosing between options.' },
      { term: 'Loyalty programme', definition: 'A scheme that rewards repeat purchases with points, tiers or offers.' },
      { term: 'Identified customer', definition: 'A customer whose purchases are linked to a known account or phone number.' },
      { term: 'Incremental visit', definition: 'A visit that would not have happened without the programme.' },
    ],
    recap: [
      'Customers weigh quality, value, convenience, mood and rewards.',
      'Quality and value get the customer in; convenience and rewards bring them back.',
      'Loyalty programmes work by identifying customers and rewarding repeat behaviour.',
      'Vendor case studies need caution, and public member counts are missing.',
    ],
    chapterRecap: 'Loyalty rests on a product customers value, at a price that fits their budget, in a form that is easy to repeat. Programmes strengthen this only when they capture identity and reward the right behaviour.',
    deepDiveTitle: 'Why identity matters more than the points themselves',
    body: <C3DeepDive paragraphs={[
      'A discount given to anonymous customers cannot be targeted or measured. A reward linked to an account lets the operator see who returns, what they buy and what lapses.',
      'That data can then guide personal offers, menu choices and store planning, which is why chains invest in apps even when downloads grow slowly.' ]} evidence="Points rules are from Phúc Long’s website; the HighlandsDI launch is a company announcement; Zalo and The Coffee House results are vendor-reported case studies; the 84% budget figure is from an undated Decision Lab survey. The arithmetic of spend per reward and the explanation of identity are our own." />,
    sources: citeC3('phucLongRewards', 'highlandsApp', 'highlandsZalo', 'coffeeHouseApp', 'decisionLabBudget'),
  }),
];

const quiz = c3Quiz('coffee-m3-l3', [
  { chapter: '1', objective: 'State when a segment is useful', question: 'When is a demographic or lifestyle segment useful?', application: 'A manager proposes a new segment. What test should it pass?', correct: 'When it predicts a difference in behaviour, spending or needs', wrong: ['When it has a catchy name', 'When it is the largest group', 'When competitors ignore it'], explanation: 'Segments must behave differently. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall tourist numbers', question: 'About how many international visitors came to Vietnam in 2025?', application: 'A founder sizes the tourist segment. What is the figure?', correct: 'Nearly 21.2 million', wrong: ['About 2 million', 'About 212 million', 'About 500,000'], explanation: 'Arrivals were up 20.4%. Review Chapter 1.' },
  { chapter: '1', objective: 'Note an evidence gap', question: 'What did the research find on families and higher-income households?', application: 'A report claims a family café market size. Is there a public source?', correct: 'No public Vietnam coffee-specific data was found', wrong: ['They are the largest segment', 'They never visit cafés', 'They spend VND 1 million a visit'], explanation: 'Gaps are stated explicitly. Review Chapter 1.' },
  { chapter: '2', objective: 'State what behaviour shows', question: 'Why can behaviour predict spending better than demographics?', application: 'Two customers are the same age but spend differently. What explains it?', correct: 'Frequency, group size, basket and occasion decide the ticket', wrong: ['Age alone decides spend', 'Location decides everything', 'Spending is random'], explanation: 'Behaviour is what customers do. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall solo share', question: 'What share of sampled receipts were solo visits?', application: 'An owner designs seating. What does the sample suggest?', correct: '61–62%', wrong: ['5%', '99%', '12%'], explanation: 'Most visits were alone. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply the caveat', question: 'Why is the receipt study indicative only?', application: 'An analyst quotes it as a market fact. What is wrong?', correct: 'It covers only 200 receipts', wrong: ['It is a census', 'It covers every chain', 'It is audited'], explanation: 'Small samples limit conclusions. Review Chapter 2.' },
  { chapter: '3', objective: 'State how loyalty works', question: 'When do loyalty programmes work best?', application: 'A chain plans an app. What should it capture?', correct: 'When they identify customers and reward repeat behaviour', wrong: ['When they give blanket discounts to anonymous customers', 'When they hide rewards', 'When they ignore data'], explanation: 'Identity enables measurement. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply the points rule', question: 'Under Phúc Long’s rule of 1 point per VND 10,000, about how much spend earns 100 points?', application: 'A customer wants a free drink. What spend is needed?', correct: 'About VND 1 million', wrong: ['About VND 10,000', 'About VND 100,000', 'About VND 100 million'], explanation: '100 points times VND 10,000. Review Chapter 3.' },
  { chapter: '3', objective: 'Judge a source', question: 'What type of source is the Zalo campaign result?', application: 'A slide cites 56.9%. What caution applies?', correct: 'A vendor-reported case study', wrong: ['An audited filing', 'A census', 'A court ruling'], explanation: 'Vendor results may flatter. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall budget limits', question: 'What share of respondents set limits on out-of-home spending in the Decision Lab survey?', application: 'A founder tests price sensitivity. What does the survey show?', correct: '84%', wrong: ['8%', '15%', '100%'], explanation: 'The survey date is not shown. Review Chapter 3.' },
]);

export const LESSON_C3_3: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe coffeehouse customer segments, how behaviour shapes spend and how loyalty is built.',
    keyTakeaways: [
      'A segment is useful only if it predicts a difference in behaviour.',
      'Students, budget-conscious Gen Z and tourists are visible Vietnam segments; other groups lack public data.',
      'Behaviour, such as group size and adding food, moves the ticket.',
      'Quality and value win the visit; convenience and rewards win the return.',
      'Loyalty programmes work when they identify customers and reward repeat behaviour.',
    ],
    businessImplications: 'Name a core segment, read your own receipts and use identity-based loyalty to build a direct customer relationship.',
    remember: 'Customers return when the choice is easy and the value is clear.',
    nextLesson: 'Revenue Streams & Cost Structure',
  },
};
