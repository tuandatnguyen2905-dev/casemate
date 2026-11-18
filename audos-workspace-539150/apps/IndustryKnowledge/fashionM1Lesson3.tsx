import { F1DeepDive, citeF1, f1Chapter, f1Quiz } from './fashionM1Core';
import type { FashionM1LessonBundle } from './fashionM1Core';

const LESSON = '3. Global Market Overview';

const deck = [
  f1Chapter({
    title: 'Global Market Size and Segment Outlook', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read the global apparel and sportswear estimates correctly, and explain why they must not be combined into a single industry total.',
    mateIntro: 'Two big numbers are about to appear. Before you use either of them, note that sportswear may already be counted inside apparel — adding them together would be the fastest way to lose credibility.',
    keyInsight: 'The industry offers opportunities across both established apparel markets and specialised sportswear categories. But market sizes must be interpreted carefully, because sportswear may overlap the broader apparel market and should not automatically be added to total clothing expenditure.',
    statTiles: [
      { value: '$1,749.7B', label: 'Global apparel, 2025', subtitle: 'Fortune Business Insights', description: 'Supplied estimate; verify the category definition before quoting.' },
      { value: '$399.4B', label: 'Global sportswear, 2025', subtitle: 'Grand View Research', description: 'Different methodology; may overlap the apparel total above.' },
      { value: '10.7%', label: 'Sportswear CAGR, 2026–2033', subtitle: 'vs 3.52% for apparel', description: 'Sportswear is projected to grow roughly three times faster.' },
    ],
    statsNote: 'All figures are estimates supplied in the research material and have not been independently verified. Apparel is also projected to reach about USD 2,307 billion by 2034.',
    narrative: [
      { label: 'What it is', text: 'The global industry covers several large but overlapping product markets. Apparel is the major component, while sportswear and related lifestyle products serve consumers seeking performance, comfort and versatility. Estimates vary by product definition, geographic coverage and research methodology.' },
      { label: 'Why it is happening', text: 'Research firms draw the category boundary differently. One may count athletic footwear inside sportswear, another inside apparel, and a third inside footwear as a separate market. The same underlying spending therefore appears in different totals.' },
      { label: 'Real-world example', text: 'Fortune Business Insights estimates global apparel at approximately USD 1,749.7 billion in 2025, potentially reaching USD 2,307 billion by 2034 at a 3.52% CAGR. Grand View Research estimates global sportswear at approximately USD 399.4 billion in 2025, with a 10.7% CAGR projected from 2026 to 2033.' },
      { label: 'Vietnam example', text: 'The supplied estimates indicate a materially higher growth rate for sportswear than for apparel overall. Differences in category definition and methodology must be considered before comparing the two figures or ranking the segments.' },
      { label: 'Business impact', text: 'Apparel and sportswear estimates are useful indicators of scale, but they do not represent the whole Fashion, Sports & Lifestyle Retail market on a consistent, consolidated basis. Any investment case built on a summed total is built on double counting.' },
    ],
    visualKind: 'fashion-m1-31-market', visualHeading: 'Apparel and sportswear: two estimates, one caution',
    visualIntro: 'Read each supplied estimate alongside the rule that governs how it may be used.',
    imageAlt: 'Casemate table of global apparel and sportswear market estimates with interpretation rules',
    keyTerms: [
      { term: 'CAGR', definition: 'Compound Annual Growth Rate — the steady annual rate that would produce the same cumulative result as the actual growth over a period.' },
      { term: 'Market definition', definition: 'The set of categories and geographies a research firm counts, which is why two credible reports can give very different totals.' },
      { term: 'Segment overlap', definition: 'Where the same spending is counted inside two reported markets, making the two figures unsafe to add together.' },
      { term: 'Consolidated basis', definition: 'A single consistent set of definitions and periods, required before market sizes can be combined or compared.' },
    ],
    recap: [
      'Global apparel is estimated at about USD 1,749.7 billion in 2025.',
      'Global sportswear is estimated at about USD 399.4 billion in 2025.',
      'Sportswear is projected to grow faster, at 10.7% against 3.52%.',
      'The two estimates are not on a consistent, consolidated basis.',
    ],
    chapterRecap: 'Before comparing market sizes or growth rates, establish consistent definitions and distinguish total category spending from overlapping subsegments.',
    deepDiveTitle: 'The double-counting trap',
    body: <F1DeepDive paragraphs={[
      'Adding USD 1,749.7 billion to USD 399.4 billion produces a tidy-looking USD 2.15 trillion industry. It is almost certainly wrong. A running shoe sold as sportswear is apparel-adjacent footwear; an athleisure legging is both sportswear and clothing. Whichever report counted it first, the second report counting it again inflates the total.',
      'The defensible approach is to pick one source and one definition for the question being answered. If the question is total clothing spend, use the apparel figure. If the question is where growth is fastest, use the growth rates and say which source each came from. Never present a summed figure without showing the overlap you had to assume away.',
    ]} evidence="Both figures are commercial estimates supplied in the research material and have not been independently verified here. The material explicitly warns that sportswear may overlap apparel." />,
    sources: citeF1('fortuneApparel', 'grandViewSportswear', 'bofStateOfFashion'),
  }),
  f1Chapter({
    title: 'Global Markets, Supply Chains and Competition', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the major consumer regions, manufacturing hubs and international competitors, and explain what global competitiveness actually requires.',
    mateIntro: 'The industry makes product in one set of countries and sells it in another. Competitiveness lives in how well a company connects the two.',
    keyInsight: 'Global competitiveness depends on coordinating product development, sourcing, cost management and distribution while responding to different consumer expectations across regions.',
    statTiles: [
      { value: '3', label: 'Major consumer regions', subtitle: 'North America, Europe, Asia-Pacific', description: 'Relative weight varies by category, spending and measurement method.' },
      { value: '5', label: 'Named manufacturing hubs', subtitle: 'China leads', description: 'Plus Bangladesh, Vietnam, India and Türkiye.' },
      { value: '6', label: 'Benchmark global brands', subtitle: 'Different competitive models', description: 'Nike, Adidas, Inditex/Zara, H&M, Uniqlo, Lululemon.' },
    ],
    statsNote: 'Counts reflect the regions, hubs and companies named in the research material, not an exhaustive global list.',
    narrative: [
      { label: 'What it is', text: 'Global Fashion, Sports & Lifestyle Retail depends on interconnected networks of consumer markets, manufacturing centres, sourcing partners, logistics providers and retail channels. Different countries play different roles in production, export, product development and final consumption.' },
      { label: 'Why it is happening', text: 'Manufacturing concentrated where capability and cost aligned, while consumption concentrated where purchasing power did. The gap between the two is bridged by sourcing relationships, freight and trade terms, each of which carries cost and risk.' },
      { label: 'Real-world example', text: 'China plays a major role in global textile and apparel supply chains, with Bangladesh, Vietnam, India and Türkiye also important production and export centres. Nike, Adidas, Inditex/Zara, H&M, Uniqlo and Lululemon illustrate different competitive approaches across fashion and sportswear.' },
      { label: 'Vietnam example', text: 'Brands compete through product design, pricing, innovation, performance, speed to market, brand identity and customer experience. International sourcing gives access to different manufacturing capabilities but exposes retailers to logistics costs, supplier risk, production lead times and changing trade conditions.' },
      { label: 'Business impact', text: 'Global brands must adapt assortment, pricing, marketing and distribution to local purchasing power and preferences. A plan that works in one region can fail in another on price point alone, even with the identical product.' },
    ],
    visualKind: 'fashion-m1-32-global', visualHeading: 'Where the industry makes and where it sells',
    visualIntro: 'Map consumer regions, manufacturing hubs, benchmark brands and supply chain exposure in one view.',
    imageAlt: 'Casemate table mapping global consumer regions, manufacturing hubs and competing brands',
    keyTerms: [
      { term: 'Sourcing network', definition: 'The set of suppliers and manufacturing partners a retailer uses across countries to access capability and manage cost.' },
      { term: 'Speed to market', definition: 'How quickly a retailer can move a product from design decision to available stock, a core fast-fashion advantage.' },
      { term: 'Lead time', definition: 'The elapsed time between placing a production order and receiving sellable stock.' },
      { term: 'Market adaptation', definition: 'Adjusting assortment, price, marketing and distribution to local purchasing power and consumer preference.' },
    ],
    recap: [
      'North America, Europe and Asia-Pacific are the major consumer regions.',
      'China, Bangladesh, Vietnam, India and Türkiye are key production and export centres.',
      'Brands compete on design, price, innovation, performance, speed, identity and experience.',
      'International sourcing adds logistics, supplier, lead-time and trade exposure.',
    ],
    chapterRecap: 'The global industry combines dispersed production networks with competitive consumer markets; retailers must balance sourcing efficiency, brand differentiation, flexibility and local responsiveness.',
    deepDiveTitle: 'Why the same product sells differently by region',
    body: <F1DeepDive paragraphs={[
      'A price that reads as accessible premium in one market can read as luxury in another. That is not a marketing problem but a positioning one: the same retail price occupies a different rung of the local price ladder, which changes the competitor set, the expected service level and the acceptable discount depth.',
      'This is why global scale does not automatically produce global advantage. Centralised sourcing lowers unit cost, but it also standardises assortment — and a standardised assortment can miss local fit preferences, climate needs and occasion mix. The companies that hold both tend to centralise the buy and localise the range.',
    ]} evidence="The research material names regions, hubs and brands qualitatively and does not supply verified regional revenue splits or company market shares, so none are stated." />,
    sources: citeF1('wtoStats', 'unctadTrade', 'deloitteRetail'),
  }),
];

const quiz = f1Quiz('fashion-m1-l3', [
  { chapter: '1', objective: 'Recall the global apparel estimate', question: 'What is the supplied estimate for the global apparel market in 2025?', application: 'A deck cites global apparel at USD 175 billion for 2025. What is the correction?', correct: 'About USD 1,749.7 billion', wrong: ['About USD 175 billion', 'About USD 17.5 trillion', 'About USD 399.4 billion'], explanation: 'Fortune Business Insights estimates approximately USD 1,749.7 billion in 2025. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the global sportswear estimate', question: 'What is the supplied estimate for the global sportswear market in 2025?', application: 'An analyst needs the sportswear figure, not the apparel figure. Which applies?', correct: 'About USD 399.4 billion', wrong: ['About USD 1,749.7 billion', 'About USD 2,307 billion', 'About USD 32 billion'], explanation: 'Grand View Research estimates approximately USD 399.4 billion in 2025. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare the growth rates', question: 'How do the supplied growth rates compare between sportswear and apparel?', application: 'A strategy claims apparel grows faster than sportswear. What do the estimates show?', correct: 'Sportswear at 10.7% is projected to grow faster than apparel at 3.52%', wrong: ['Apparel at 10.7% grows faster than sportswear at 3.52%', 'Both are projected at the same rate', 'Both are projected to contract'], explanation: 'Sportswear is projected at a 10.7% CAGR against 3.52% for apparel. Review Chapter 1.' },
  { chapter: '1', objective: 'Avoid double counting', question: 'Why must the apparel and sportswear estimates not be added together?', application: 'Someone sums the two figures to claim a USD 2.15 trillion industry. What is wrong?', correct: 'Sportswear may already be counted inside the broader apparel market', wrong: ['The two figures use the same currency', 'Addition is never valid in market sizing', 'Sportswear is larger than apparel'], explanation: 'Sportswear may overlap apparel and should not automatically be added to total clothing expenditure. Review Chapter 1.' },
  { chapter: '1', objective: 'Read projections carefully', question: 'What does the USD 2,307 billion apparel figure represent?', application: 'A plan treats USD 2,307 billion as current market size. What is it actually?', correct: 'A projection for 2034, not a present-day value', wrong: ['The confirmed 2025 market size', 'The sportswear market in 2033', 'Vietnam’s total retail market'], explanation: 'Apparel is projected to potentially reach about USD 2,307 billion by 2034. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify consumer regions', question: 'Which regions are named as the major consumer markets?', application: 'A regional plan covers only Europe. Which other regions does the lesson name?', correct: 'North America, Europe and Asia-Pacific', wrong: ['Only Asia-Pacific and Africa', 'Only North America and South America', 'Only Europe and the Middle East'], explanation: 'North America, Europe and Asia-Pacific are the important consumer markets named. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify manufacturing hubs', question: 'Which countries are named as key production and export centres?', application: 'A sourcing map lists China only. Which other centres does the lesson name?', correct: 'Bangladesh, Vietnam, India and Türkiye alongside China', wrong: ['Japan, South Korea and Singapore', 'Germany, France and Italy', 'Brazil, Chile and Peru'], explanation: 'China plays a major role, with Bangladesh, Vietnam, India and Türkiye also important. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify benchmark competitors', question: 'Which companies are named to illustrate different competitive approaches?', application: 'A benchmarking exercise needs the comparison set from this lesson. Which is it?', correct: 'Nike, Adidas, Inditex/Zara, H&M, Uniqlo and Lululemon', wrong: ['Walmart, Costco, Target and Aldi', 'Apple, Samsung, Sony and LG', 'Shopee, Lazada, Tiki and Sendo'], explanation: 'These six illustrate different competitive approaches across fashion and sportswear retail. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify supply chain exposure', question: 'What risks does international sourcing expose a retailer to?', application: 'Freight rates spike and a supplier misses a delivery window. Which exposure is this?', correct: 'Logistics costs, supplier risk, production lead times and trade conditions', wrong: ['Only domestic retail competition', 'Only store rent inflation', 'Only currency conversion fees'], explanation: 'Sourcing internationally brings logistics, supplier, lead-time and trade exposure. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain local adaptation', question: 'What must global brands adapt to local markets?', application: 'A brand transplants its home assortment and pricing unchanged and underperforms. What was needed?', correct: 'Assortment, pricing, marketing and distribution adapted to local purchasing power and preferences', wrong: ['Only the logo and brand name', 'Only the store opening hours', 'Only the packaging colour'], explanation: 'Global brands must adapt assortment, pricing, marketing and distribution to local conditions. Review Chapter 2.' },
]);

export const LESSON_1_3: FashionM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can size the global market from the supplied estimates, explain why they cannot be summed, and map where the industry produces against where it sells.',
    keyTakeaways: [
      'Global apparel is estimated near USD 1,749.7 billion in 2025; sportswear near USD 399.4 billion.',
      'Sportswear is projected to grow about three times faster, 10.7% against 3.52%.',
      'The two estimates overlap and must never be added together.',
      'China, Bangladesh, Vietnam, India and Türkiye anchor production and export.',
      'Competitiveness means coordinating sourcing, cost, distribution and local response.',
    ],
    businessImplications: 'Pick one source and one definition for the question being asked: a summed market total hides double counting, and the same retail price occupies a different rung of the price ladder in each region.',
    remember: 'Never quote a market size without naming the source and what it counts.',
    nextLesson: 'Vietnam Market Landscape',
  },
};
