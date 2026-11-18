import { C1DeepDive, citeC1, c1Chapter, c1Quiz } from './coffeeM1Core';
import type { CoffeeM1LessonBundle } from './coffeeM1Core';

const LESSON = '4. Vietnam Market Overview';

const deck = [
  c1Chapter({
    title: 'Market Size, Growth, and Industry Structure', chapterTitle: LESSON, readingTime: '8',
    objective: 'Describe the size and fragmented structure of Vietnam’s foodservice market and read competing estimates correctly.',
    mateIntro: 'Vietnam eats and drinks out a lot. Different studies size the market differently, and behind every figure sit hundreds of thousands of mostly independent outlets.',
    keyInsight: 'Vietnam is a large and active foodservice market, but it remains structurally fragmented. Growth opportunities coexist with intense competition, uneven outlet performance, and pressure to prove that new stores can generate sustainable returns.',
    statTiles: [
      { value: '5', label: 'Key structure activities', subtitle: 'Independent operators to operational consolidation', description: 'Independent operators, organized chains, market development, demand diversification and operational consolidation.' },
      { value: 'VND 678T', label: 'Consumer foodservice value sales in 2025', subtitle: 'Euromonitor, up 5% in current terms', description: 'Covers cafés and bars, restaurants, cafeterias and street stalls.' },
      { value: 'VND 726.5T', label: 'Total F&B revenue in 2025', subtitle: 'iPOS.vn and Nestlé Professional, as reported by VCCI', description: 'A survey-based estimate with a different scope.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the two market values use different methods and coverage, so they are separate estimates and not a range. A third figure of about VND 843.1 trillion from national statistics also counts accommodation.',
    narrative: [
      { label: 'What it is', text: 'Vietnam has a well-established coffee culture and a strong tradition of eating and drinking outside the home. The market includes independent cafés, traditional eateries, local restaurant groups, modern beverage chains, international brands, and digitally enabled delivery businesses.' },
      { label: 'Why it is happening', text: 'The broader foodservice industry continued to expand in 2025, although operators faced pressure from higher operating costs and more selective consumer spending.' },
      { label: 'Real-world example', text: 'Independent cafés and restaurants compete through location, affordability, personal service and local taste; organised chains use standard menus, buying, marketing and systems to expand across cities; operators target growing urban districts, commercial centres, residential communities and tourism destinations; they serve dine-in, takeaway, delivery, social, work and meal occasions; and better-capitalised businesses improve productivity and gain share as weaker operators face rising costs.' },
      { label: 'Vietnam example', text: 'Euromonitor reported that Vietnam’s consumer foodservice value sales reached approximately VND 678 trillion in 2025, representing 5% growth in current terms. A separate iPOS.vn and Nestlé Vietnam industry report, reported by VCCI, estimated total F&B revenue at approximately VND 726.5 trillion. These figures differ because the studies use different methodologies and market coverage. They should be treated as separate estimates rather than combined. The iPOS.vn survey of 3,001 businesses and about 3,045 diners found about 329,500 outlets, up 2.0%, with 65.58% of businesses reporting stable or growing revenue and 69.38% hit by higher raw-material costs; in the first half of 2026 revenue was about VND 432.7 trillion, up 6.55%, outlets were nearly unchanged and about 43% of outlets reported lower revenue.' },
      { label: 'Business impact', text: 'Vietnam offers substantial demand for foodservice and café consumption, but aggregate market growth should not be mistaken for guaranteed growth at the individual-store level. Operators need strong local positioning and disciplined cost management.' },
    ],
    visualKind: 'coffee-m1-41-market-size', visualHeading: 'Three 2025 figures with three definitions',
    visualIntro: 'Compare three differently defined 2025 estimates of Vietnam’s food and beverage activity.',
    imageAlt: 'Casemate bar chart of three differently defined 2025 Vietnam foodservice estimates in VND trillion',
    keyTerms: [
      { term: 'Consumer foodservice', definition: 'Eating and drinking out in cafés, restaurants, cafeterias and street stalls.' },
      { term: 'Fragmented market', definition: 'A market with many small operators and no dominant player.' },
      { term: 'Current terms', definition: 'Growth measured in nominal prices, not adjusted for inflation.' },
      { term: 'Consolidation', definition: 'Stronger operators gaining share as weaker ones close.' },
    ],
    recap: [
      'Vietnam has a strong tradition of eating and drinking out.',
      'The market mixes independents, chains, international brands and delivery.',
      'Different studies give different sizes; do not combine them.',
      'Aggregate growth does not guarantee store-level returns.',
    ],
    chapterRecap: 'Vietnam offers substantial demand for foodservice and café consumption, but aggregate market growth should not be mistaken for guaranteed growth at the individual-store level. Operators need strong local positioning and disciplined cost management.',
    deepDiveTitle: 'Why one market can have three sizes',
    body: <C1DeepDive paragraphs={[
      'Euromonitor counts consumer foodservice such as cafés, restaurants and street stalls. The iPOS.vn survey counts F&B revenue from operators. National statistics count accommodation and food services together.',
      'Each is correct for what it counts. A reader should choose the one that matches the question and say which one was used.' ]} evidence="The five activities are described in the supplied material. The Euromonitor figure is from the publisher’s summary; the iPOS.vn figures are from its press release and VCCI reports; the third figure is from a consultancy summary of an official series and is flagged as secondary." />,
    sources: citeC1('euromonitorFoodservice', 'iposReport2025', 'vcciFnb2026', 'vcciFnbEnglish', 'iposH12026', 'mwyFnb'),
  }),
  c1Chapter({
    title: 'Coffeehouse Market and Leading Business Formats', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe Vietnam’s coffeehouse formats and read chain estimates for what they do and do not cover.',
    mateIntro: 'Vietnam has sidewalk cafés, local chains, specialty roasters and a few international names. Chains are growing quickly, but they are only part of the picture.',
    keyInsight: 'Vietnam’s coffeehouse market is characterized by the coexistence of local cultural familiarity, modern chain expansion, and experience-based differentiation. Brands need to select a clear positioning rather than relying solely on attractive store design or temporary product trends.',
    statTiles: [
      { value: '5', label: 'Key coffeehouse formats', subtitle: 'Traditional cafés to hybrid beverage concepts', description: 'Traditional Vietnamese cafés, mainstream café chains, specialty coffee shops, lifestyle cafés and hybrid beverage concepts.' },
      { value: 'US$725M', label: 'Vietnam’s branded coffee-chain segment in 2025', subtitle: 'Momentum Works, up 27%', description: 'Covers coffee chains, not the whole coffeehouse market.' },
      { value: '985 / 237 / 150 / 114', label: 'Stores of Highlands, Phúc Long, Starbucks and Katinat', subtitle: 'End of 2025, with September for Katinat', description: 'Reported by the press at different dates.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the chain-market value is a research-firm estimate for coffee chains only, and store counts differ by reporter and date, for example Phúc Long is reported at 237 and as nearly 200 outside its WinMart points.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s coffeehouse market combines traditional Vietnamese coffee culture with contemporary cafés, specialty coffee concepts, international chains, and modern beverage brands. Coffee shops are used for more than refreshment: they serve as places for meetings, socializing, studying, working, and leisure.' },
      { label: 'Why it is happening', text: 'The modern chain segment has gained visibility and scale, while independent outlets remain important competitors. Momentum Works’ Southeast Asia Coffee and Tea Chains 2026 report, as summarized by VietnamPlus, estimated Vietnam’s branded coffee-chain segment at approximately US$725 million in 2025, up 27% year-on-year. This estimate covers coffee chains, not the entire coffeehouse market or all coffee consumption.' },
      { label: 'Real-world example', text: 'Traditional cafés serve familiar coffee styles and compete on price, convenience and neighbourhood ties; mainstream chains use recognisable branding, standard menus, broad coverage and consistent service; specialty shops differentiate through beans, brewing and barista skill; lifestyle cafés emphasise ambience, interiors, social-media appeal and suitability for work; and hybrid concepts combine coffee with tea, fruit drinks, bakery, desserts and light meals.' },
      { label: 'Vietnam example', text: 'Milano Coffee reports about 2,500 outlets through franchise agency, Highlands Coffee had 985 stores at the end of 2025 with revenue up nearly 16%, Phúc Long about 237 (nearly 200 outside its WinMart points), Starbucks about 150 and Katinat 114. Trung Nguyên Legend was expected to end 2025 with about 112 locations, while The Coffee House halved its stores and Café Amazon exited in November 2025, so chain growth has been selective.' },
      { label: 'Business impact', text: 'Vietnam’s coffeehouse market is diverse, with different formats serving distinct price points and consumption occasions. Brands should match their concept, menu, and store economics to a clearly defined target customer.' },
    ],
    visualKind: 'coffee-m1-42-formats', visualHeading: 'Leading chains by store count, 2025',
    visualIntro: 'Compare reported store counts of five leading coffee chains and note the different dates.',
    imageAlt: 'Casemate bar chart of store counts of leading coffee chains in Vietnam in 2025',
    keyTerms: [
      { term: 'Branded coffee chain', definition: 'A coffee business with a recognisable brand and many outlets.' },
      { term: 'Specialty coffee shop', definition: 'A shop focused on beans, brewing and barista skill.' },
      { term: 'Lifestyle café', definition: 'A café designed around ambience and use for work or social sharing.' },
      { term: 'Hybrid beverage concept', definition: 'A venue combining coffee with tea, fruit drinks, bakery and meals.' },
    ],
    recap: [
      'Traditional and modern formats coexist.',
      'Coffee shops serve meetings, socialising, study, work and leisure.',
      'The US$725M figure covers chains only.',
      'Match concept, menu and store economics to a defined customer.',
    ],
    chapterRecap: 'Vietnam’s coffeehouse market is diverse, with different formats serving distinct price points and consumption occasions. Brands should match their concept, menu, and store economics to a clearly defined target customer.',
    deepDiveTitle: 'Reading store counts without being misled',
    body: <C1DeepDive paragraphs={[
      'A count may include company-operated stores, franchised stores, kiosks or points inside supermarkets, and it may be taken at different dates. Milano’s figure is self-published and counts stores and points of sale.',
      'Compare chains only on the same date and definition, and treat counts as a measure of presence, not of sales or profit.' ]} evidence="The five formats are described in the supplied material. The chain-market estimate and Milano and Highlands counts are from Momentum Works data as reported by VietnamPlus and VnExpress; other counts are from VietnamBiz and The Viet Media, with differing dates and definitions." />,
    sources: citeC1('vietnamplusChains', 'vnexpressChains', 'vietmediaChains', 'vietnambizChains', 'vietnamplusRegional'),
  }),
  c1Chapter({
    title: 'Consumer Behavior, Pricing, and Channel Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how Vietnamese customers balance price, convenience and experience and how channels change the economics.',
    mateIntro: 'The same customer may buy a cheap everyday drink on Monday and a premium café experience on Saturday. Operators must serve both without giving away margin.',
    keyInsight: 'Consumers are not uniformly trading up or trading down. Many are selective about where to spend, choosing affordable everyday options for routine purchases and paying more when product quality, service, location, or experience justifies the difference.',
    statTiles: [
      { value: '5', label: 'Key consumer and channel activities', subtitle: 'Value purchases to customer retention', description: 'Value-oriented purchases, experience-led consumption, digital discovery, delivery and takeaway, and customer retention.' },
      { value: '39.19%', label: 'Diners naming ultra-cheap fixed-price drinks as the top trend in early 2026', subtitle: 'iPOS.vn and Nestlé Professional', description: 'Value formats lead the trend ranking.' },
      { value: '20–30%', label: 'Typical delivery commission per order', subtitle: 'Reported by restaurants, excluding advertising', description: 'Reduces the net revenue from delivery sales.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the trend share is a first-half 2026 survey of diners and the commission is a press report of restaurant complaints, not a fixed rate.',
    narrative: [
      { label: 'What it is', text: 'Vietnamese consumers balance affordability, convenience, product quality, social experience, and perceived value. Coffee and foodservice purchases may be frequent but discretionary, making customer behavior sensitive to economic confidence, promotions, location, and the perceived worth of the experience.' },
      { label: 'Why it is happening', text: 'Digital ordering and third-party delivery have expanded the range of ways customers access cafés and restaurants. However, delivery platforms can also introduce commission expenses and promotional pressure, while physical stores remain important for ambience, social interaction, and immediate consumption.' },
      { label: 'Real-world example', text: 'Value buyers choose entry-level drinks, lunch sets, bundles and promotions; experience buyers choose premium cafés, distinctive interiors and seasonal menus; customers discover venues through social media, reviews, maps and creator content; they order delivery or takeaway to save time; and operators keep them with points, memberships, personalised offers and consistent service.' },
      { label: 'Vietnam example', text: 'In the first half of 2026 the iPOS.vn survey ranked ultra-cheap fixed-price drinks as the top trend among diners at 39.19%, with fresh hand-sliced beef hotpot third at 35.12% and 24/7 coffee and garden barbecue also among the trends, and found the share of diners planning to cut eating-out spending nearly three times the share planning to spend more, though no worse than six months earlier. ShopeeFood promoted a VND 39,000 solo-meal collection, GrabFood offered restaurant vouchers of up to 50%, and restaurants complained of commissions of 20–30%, so that a VND 100,000 order at 30% leaves VND 70,000.' },
      { label: 'Business impact', text: 'Vietnamese customers seek a balance between price, convenience, quality, and experience. Businesses need a clear value proposition across dine-in and digital channels, with careful control of discounting and fulfillment costs.' },
    ],
    visualKind: 'coffee-m1-43-behavior', visualHeading: 'Value-oriented versus experience-led spending',
    visualIntro: 'Compare two kinds of purchase across what is bought, why, channel, discovery and retention.',
    imageAlt: 'Casemate comparison of value-oriented and experience-led spending in Vietnamese foodservice',
    keyTerms: [
      { term: 'Discretionary spending', definition: 'Spending a customer can choose to reduce or delay.' },
      { term: 'Promotion sensitivity', definition: 'How strongly a customer responds to discounts.' },
      { term: 'Customer retention', definition: 'Keeping customers returning through loyalty and consistent service.' },
      { term: 'Value proposition', definition: 'The benefits a brand promises for the price.' },
    ],
    recap: [
      'Customers weigh price, convenience, quality, experience and worth.',
      'Purchases are frequent but discretionary and confidence-sensitive.',
      'Delivery adds reach but also commission and promotion pressure.',
      'Stores still matter for ambience and immediate consumption.',
    ],
    chapterRecap: 'Vietnamese customers seek a balance between price, convenience, quality, and experience. Businesses need a clear value proposition across dine-in and digital channels, with careful control of discounting and fulfillment costs.',
    deepDiveTitle: 'Why not every customer is trading down',
    body: <C1DeepDive paragraphs={[
      'A customer may choose the cheapest drink on a work day and still pay more for a special venue at the weekend. Spending is split by occasion rather than moving uniformly up or down.',
      'A brand that offers an affordable everyday option and a distinct premium experience can serve both without confusing either.' ]} evidence="The five activities are described in the supplied material. Trend and spending-intent findings are from the iPOS.vn and Nestlé Professional first-half 2026 report; delivery commissions, ShopeeFood’s solo-meal collection and GrabFood’s vouchers are from a Tuoi Tre news report; delivery value is from Momentum Works as reported by VnExpress." />,
    sources: citeC1('iposH12026', 'tuoitreDelivery', 'vnexpressDelivery', 'vcciDelivery'),
  }),
];

const quiz = c1Quiz('coffee-m1-l4', [
  { chapter: '1', objective: 'State the market’s structure', question: 'How is Vietnam’s foodservice market described?', application: 'An investor sees large totals. What caution applies?', correct: 'Large and active but structurally fragmented, with intense competition and uneven outlet performance', wrong: ['Small and dominated by one chain', 'Fully consolidated', 'Closed to new operators'], explanation: 'Totals hide store-level variation. Review Chapter 1.' },
  { chapter: '1', objective: 'Read competing estimates', question: 'How should the Euromonitor and iPOS.vn figures be treated?', application: 'A slide adds the two numbers. What is wrong?', correct: 'As separate estimates with different methods and coverage, not combined', wrong: ['As one number to add', 'As identical figures', 'As a range of the same market'], explanation: 'Definitions differ. Review Chapter 1.' },
  { chapter: '1', objective: 'Avoid a common error', question: 'What should aggregate market growth not be mistaken for?', application: 'The market grows 5%. What does that not prove?', correct: 'Guaranteed growth at the individual-store level', wrong: ['Any customer demand', 'Any new store', 'Any tourism'], explanation: 'Store results vary. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall a survey result', question: 'What share of surveyed businesses faced higher raw-material costs?', application: 'A planner checks cost pressure. What does the survey report?', correct: '69.38%', wrong: ['6.38%', '9.9%', '99%'], explanation: 'Cost pressure was widespread. Review Chapter 1.' },
  { chapter: '2', objective: 'State what the chain estimate covers', question: 'What does the US$725 million estimate cover?', application: 'A reader uses it as the whole coffeehouse market. What is wrong?', correct: 'Coffee chains only, not the entire coffeehouse market or all coffee consumption', wrong: ['All coffee consumption', 'All food and beverage', 'Only coffee farming'], explanation: 'Scope matters. Review Chapter 2.' },
  { chapter: '2', objective: 'List a format', question: 'Which format differentiates through bean sourcing, brewing and barista expertise?', application: 'A shop sells single-origin coffee with brewing demonstrations. What is it?', correct: 'A specialty coffee shop', wrong: ['A mainstream chain', 'A hybrid beverage kiosk only', 'A cafeteria'], explanation: 'Craft defines specialty. Review Chapter 2.' },
  { chapter: '2', objective: 'State the positioning rule', question: 'What should brands select rather than rely only on design or trends?', application: 'A new café copies a viral look. What should it choose?', correct: 'A clear positioning', wrong: ['A random menu', 'A larger logo', 'A shorter name'], explanation: 'Positioning lasts. Review Chapter 2.' },
  { chapter: '2', objective: 'Read store counts carefully', question: 'Why should store counts from different reporters be compared with care?', application: 'Two reports give different numbers for the same chain. What explains it?', correct: 'They may use different dates and count different outlet types', wrong: ['One is always false', 'Stores never change', 'Counts include customers'], explanation: 'Dates and definitions differ. Review Chapter 2.' },
  { chapter: '3', objective: 'State consumer behaviour', question: 'How are consumers described?', application: 'A brand assumes everyone is trading down. What does the chapter say?', correct: 'Selective: affordable everyday options for routine and higher spend where experience justifies it', wrong: ['All trading up', 'All trading down', 'Never buying out of home'], explanation: 'Spend splits by occasion. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply delivery arithmetic', question: 'At a 30% commission, how much of a VND 100,000 order is left before other costs?', application: 'An owner prices a delivery order. What is left?', correct: 'VND 70,000', wrong: ['VND 30,000', 'VND 100,000', 'VND 130,000'], explanation: 'Commission cuts net revenue. Review Chapter 3.' },
]);

export const LESSON_C1_4: CoffeeM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can size Vietnam’s foodservice market with the right caveats, describe its coffeehouse formats and explain how customers and channels shape pricing.',
    keyTakeaways: [
      'Vietnam is large and active but structurally fragmented.',
      'Competing market estimates use different definitions and are not combined.',
      'Aggregate growth does not guarantee store-level returns.',
      'The chain estimate covers chains only, and store counts differ by date and definition.',
      'Customers are selective, and delivery commissions reduce channel economics.',
    ],
    businessImplications: 'Match concept and menu to a defined customer, use figures with their definitions, and manage discounting and delivery costs carefully.',
    remember: 'Big market, small margins: prove each store.',
    nextLesson: 'What Drives Industry Change',
  },
};
