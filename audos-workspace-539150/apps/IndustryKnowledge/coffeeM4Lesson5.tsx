import { C4DeepDive, citeC4, c4Chapter, c4Quiz } from './coffeeM4Core';
import type { CoffeeM4LessonBundle } from './coffeeM4Core';

const LESSON = '5. SWOT & Strategic Challenges';

const deck = [
  c4Chapter({
    title: 'SWOT Analysis of Vietnam’s Coffeehouse & Foodservice Retail Industry', chapterTitle: LESSON, readingTime: '6',
    objective: 'Summarise the industry’s strengths, weaknesses, opportunities and threats and state its central strategic opportunity and risk.',
    mateIntro: 'A SWOT puts the good news and the bad news on one page. Here both are large: a coffee-loving market, and a very crowded one.',
    keyInsight: 'The industry’s central strategic opportunity is to convert strong consumer familiarity with coffee and foodservice into sustainable, differentiated businesses. The principal risk is expanding or competing on price without building the operating capabilities needed to generate repeat demand and acceptable returns.',
    statTiles: [
      { value: '5', label: 'SWOT elements', subtitle: 'Strengths to strategic prioritization', description: 'Strengths, weaknesses, opportunities, threats and strategic prioritization.' },
      { value: 'US$1.34B', label: 'Vietnam coffee and tea chain market in 2025', subtitle: 'Momentum Works via VnExpress and The Viet Media', description: 'Third largest in Southeast Asia; both segments grew nearly 30% between 2023 and 2025.' },
      { value: '42.7%', label: 'Share of surveyed establishments with revenue down at least 5% in H1 2026', subtitle: 'iPOS.vn survey via The Investor', description: 'Only 20.22% grew by more than 5%.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The chain-market figure covers coffee and tea chains only, and the survey covers surveyed F&B establishments, so the two describe different parts of the market.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s coffeehouse and foodservice industry benefits from an established coffee culture, frequent out-of-home consumption, a diverse domestic supply base, and growing consumer exposure to modern foodservice concepts. At the same time, the market is fragmented, competition is intense, and operators face challenges related to costs, differentiation, and consistent store performance.' },
      { label: 'Why it is happening', text: 'The industry also presents opportunities for organized chains to expand, digital channels to improve customer access, and local brands to develop distinctive propositions. However, the market remains sensitive to purchasing power, rent, labor, input costs, and changes in consumer preferences.' },
      { label: 'Real-world example', text: 'Strengths include an established coffee culture, broad domestic ingredient availability, diverse consumer occasions and room for local brand differentiation. Weaknesses are fragmented competition, uneven operational standards, limited resources among small operators and vulnerability to poor store economics. Opportunities include modern chain expansion, secondary-city growth, digital ordering, loyalty programmes, specialty products and localised concepts; threats include rising operating costs, intense price competition, shifting preferences, delivery expense and store closures. Each business should match expansion and investment to the strengths of its own model.' },
      { label: 'Vietnam example', text: 'Momentum Works puts Vietnam’s coffee and tea chains at US$1.34 billion in 2025, with coffee chains at US$725 million and tea chains at US$617 million, and USDA reports Vietnam produced about 31.7 million bags of coffee in 2025/26 and used 4.9 million at home. The iPOS.vn survey shows independents earning 91.7% of F&B revenue, and in the first half of 2026 42.7% of surveyed establishments had revenue down at least 5%, even as Highlands opened its 1,000th outlet and Phúc Long raised daily revenue per standard store 18.5%. iPOS.vn describes a squeezed middle between strong brands and low-cost players, and Mixue closed over 400 international outlets after fast expansion.' },
      { label: 'Business impact', text: 'The industry’s strengths and growth opportunities are significant, but they do not eliminate the risks associated with fragmentation and cost pressure. Businesses need clear positioning and operational discipline to convert market potential into sustainable performance.' },
    ],
    visualKind: 'coffee-m4-51-swot', visualHeading: 'SWOT with Vietnam evidence',
    visualIntro: 'Read each SWOT element, what it covers and the Vietnam evidence for it.',
    imageAlt: 'Casemate table of SWOT elements and Vietnam evidence for the coffeehouse and foodservice industry',
    keyTerms: [
      { term: 'SWOT', definition: 'A summary of strengths, weaknesses, opportunities and threats.' },
      { term: 'Out-of-home consumption', definition: 'Eating and drinking outside the home, as in cafés and restaurants.' },
      { term: 'Squeezed middle', definition: 'Mid-priced brands neither cheap nor distinctive enough to hold customers.' },
      { term: 'Strategic prioritisation', definition: 'Choosing which opportunities to pursue given a business’s own strengths.' },
    ],
    recap: [
      'Strong coffee culture and frequent out-of-home consumption are core strengths.',
      'Fragmentation and uneven standards are core weaknesses.',
      'Chain growth, digital and localised concepts are opportunities.',
      'Costs, price competition and closures are threats.',
    ],
    chapterRecap: 'The industry’s strengths and growth opportunities are significant, but they do not eliminate the risks associated with fragmentation and cost pressure. Businesses need clear positioning and operational discipline to convert market potential into sustainable performance.',
    deepDiveTitle: 'Why a growing market and falling revenue can both be true',
    body: <C4DeepDive paragraphs={[
      'Chain-market value rose nearly 30% in two years, yet 42.7% of surveyed establishments reported lower revenue. Growth is concentrated in strong brands, which take share from weaker or less differentiated outlets.',
      'This is why a SWOT must be applied to a specific business model: the same market is an opportunity for one operator and a threat for another.' ]} evidence="Chain-market values are from Momentum Works as reported by VnExpress, VietnamPlus and The Viet Media; the survey result is from The Investor reporting iPOS.vn; the production figures are from USDA; the revenue shares are from the iPOS.vn deck. The explanation of concentrated growth is our own reasoning." />,
    sources: citeC4('vnexpressChains', 'vietmediaSplit', 'vietnamplusChains', 'investorLargerPlayers', 'iposReportDeck', 'usdaCoffeeAnnual', 'agroMilano'),
  }),
  c4Chapter({
    title: 'Major Strategic Challenges', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the main strategic challenges and explain how they interact.',
    mateIntro: 'Each challenge is manageable alone. The difficulty is that cost pressure, imitation and complexity all arrive together.',
    keyInsight: 'The industry’s most difficult challenge is balancing growth with economic sustainability. Businesses must avoid treating store openings, transaction volume, or digital sales as success indicators unless those measures translate into profitable and repeatable performance.',
    statTiles: [
      { value: '7', label: 'Major strategic challenges', subtitle: 'Margin pressure to demand uncertainty', description: 'Margin pressure, differentiation, customer retention, expansion risk, workforce, channel complexity and demand uncertainty.' },
      { value: '50–60%', label: 'Share of beverage operators reporting higher raw-material costs over the past year', subtitle: 'Local media, via The Viet Media', description: 'Alongside higher rents and labour costs.' },
      { value: 'VND 5.31M', label: 'Region I minimum wage a month from 1 January 2026', subtitle: 'Vietnam Social Security', description: 'An average rise of 7.2% across regions.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The operator share is a media report, not a survey we could check, and a separate VCCI report of the iPOS.vn survey gives 69.38% of businesses facing higher raw-material costs.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retailers face a combination of commercial, operational, and organizational challenges. Intense competition makes customer acquisition difficult, while similar menus and store concepts can weaken differentiation. At the same time, rent, labor, ingredients, utilities, and delivery expenses can place pressure on margins.' },
      { label: 'Why it is happening', text: 'Expansion introduces additional complexity. A business that performs well at a small number of outlets may struggle to maintain product quality, employee capability, and management control across a larger network. Digital channels can extend reach but may also increase promotional dependence and fulfillment costs.' },
      { label: 'Real-world example', text: 'Margins are squeezed by ingredient inflation, rent, labour, utilities and platform commissions; easily copied beverages, temporary trends or store aesthetics weaken differentiation; reliance on discounts and paid acquisition undermines retention; weak sites and heavy commitments raise expansion risk; recruiting and training staff to standard is hard; dine-in, takeaway and delivery can congest operations or produce unprofitable sales; and menus, staffing and stock must follow changing demand.' },
      { label: 'Vietnam example', text: 'Local reports say 50–60% of beverage operators saw raw-material costs rise, the VCCI report of the iPOS.vn survey puts it at 69.38% of businesses, USDA reports the average local coffee price up 125% in 2024/25 and VTV reported menu price rises of 10–20%. Region I minimum wage rose to VND 5.31 million and housing, electricity and water prices rose 6.08% in 2025. Restaurants complain of delivery commissions of 20–30%. Mixue’s rapid rollout led to outlets of the same brand cannibalising each other, and Phúc Long calls delivery an increasingly important part of retail revenue. No public data on staff turnover or delivery congestion for café chains was found.' },
      { label: 'Business impact', text: 'Strategic challenges arise from the interaction between customer expectations, cost pressure, competitive imitation, and operating complexity. Successful businesses address these issues through disciplined investment, differentiated value, and continuous performance improvement.' },
    ],
    visualKind: 'coffee-m4-52-challenges', visualHeading: 'Seven challenges around one tension',
    visualIntro: 'See seven challenges around the central tension between growth and sustainability.',
    imageAlt: 'Casemate map of seven strategic challenges facing Vietnamese coffeehouse and foodservice retailers',
    keyTerms: [
      { term: 'Margin pressure', definition: 'Rising costs that squeeze the gap between price and cost.' },
      { term: 'Imitation risk', definition: 'The risk that rivals copy easily replicated products or aesthetics.' },
      { term: 'Promotional dependence', definition: 'Reliance on discounts to generate sales.' },
      { term: 'Channel congestion', definition: 'Delays caused by too many orders from different channels in one operation.' },
    ],
    recap: [
      'Costs, imitation and complexity press on margins together.',
      'Growth can outrun quality, people and control.',
      'Digital sales can raise promotion dependence and fulfilment cost.',
      'Success measures must be profitable and repeatable, not just large.',
    ],
    chapterRecap: 'Strategic challenges arise from the interaction between customer expectations, cost pressure, competitive imitation, and operating complexity. Successful businesses address these issues through disciplined investment, differentiated value, and continuous performance improvement.',
    deepDiveTitle: 'How cost pressure and imitation compound each other',
    body: <C4DeepDive paragraphs={[
      'When costs rise, a brand that is easy to copy cannot raise prices without losing customers to rivals who hold prices. A brand with a clear difference can pass on more of the cost.',
      'This is why differentiation and cost control are one challenge, not two, and why Mixue-style low-price chains with no room to raise prices found the squeeze hardest.' ]} evidence="Cost shares are from The Viet Media and a VCCI report; coffee prices are from USDA and VTV; wage data are from Vietnam Social Security; price indices are from the iPOS.vn deck; commissions are from Tuoi Tre; the Mixue point is from The Viet Media; Phúc Long’s delivery comment is from Vietnam.vn. The compounding explanation is our own." />,
    sources: citeC4('vietmediaSplit', 'vcciFnb2026', 'usdaCoffeeSemi', 'vtvCoffeePrices', 'minWageDecree', 'iposReportDeck', 'tuoitreDelivery', 'phucLongResults'),
  }),
  c4Chapter({
    title: 'Strategic Responses and Future Competitive Priorities', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the strategic responses that fit different business models and the priorities shaping future competition.',
    mateIntro: 'If store count is no longer the whole game, what is? Increasingly, it is how well each store, each customer and each supplier is managed.',
    keyInsight: 'The strongest competitive response is to improve the complete business system rather than optimize one visible dimension. Customer value, cost efficiency, operating consistency, and profitable growth must reinforce one another.',
    statTiles: [
      { value: '7', label: 'Strategic responses', subtitle: 'Positioning to selective expansion', description: 'Strengthen positioning, improve unit economics, build retention, optimize channels, improve supply resilience, develop people and systems, and expand selectively.' },
      { value: '+11.5%', label: 'Highlands same-store sales growth in Vietnam in Q2 2026', subtitle: 'The Investor, citing Jollibee', description: 'Existing stores earning more, not just new ones opening.' },
      { value: '+18.5%', label: 'Phúc Long daily revenue per standard store in Q2 2026', subtitle: 'The Investor, citing Masan', description: 'Reached VND 26.2 million.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Same-store figures are company-reported and cover different store definitions, and the response order in the visual is a teaching sequence, not a measured ranking.',
    narrative: [
      { label: 'What it is', text: 'The next stage of competition is likely to place greater emphasis on operating efficiency, customer retention, digital infrastructure, and supply-chain optimization rather than expansion alone. Recent reporting on Vietnam’s coffee and tea chain market similarly points to operational efficiency and stronger digital and supply capabilities as important areas of future competition.' },
      { label: 'Why it is happening', text: 'Strategic responses should reflect the retailer’s size and positioning. Independent cafés may prioritize a focused menu and neighborhood loyalty, while large chains may invest in procurement systems, data infrastructure, workforce development, and network optimization. Premium concepts need to reinforce product quality and experience, whereas value-oriented businesses need to maintain affordability without sacrificing essential standards.' },
      { label: 'Real-world example', text: 'Businesses define the target customer, core occasion, price level and distinctive proposition; review site selection, store contribution, staffing, menu margins, waste and payback; use reliable service, relevant loyalty and targeted communication to raise repeat visits; expand digital ordering where it adds demand at acceptable contribution; diversify critical suppliers and improve forecasting; standardise training, quality control and reporting; and prioritise markets and formats where demand, brand relevance and economics are validated.' },
      { label: 'Vietnam example', text: 'Momentum Works’ head of market research says success now depends less on the best drinks or the largest network and more on systems across supply chains, store management and digital infrastructure, and iPOS.vn and industry observers expect competition to shift from store-count growth to per-store efficiency, customer experience and financial resilience. Phúc Long targets 2026 revenue of VND 2,300–2,500 billion, EBITDA of VND 370–418 billion, 40–50 new stores focused on Hanoi, food at about 11% of revenue and a shorter payback period, and Highlands, which reached 1,000 outlets in June 2026, plans a Vietnam listing in early 2027. Chagee is cited as a template for QR-coded cups and automated drink-mixing, and Starbucks follows a selective-growth approach. Highlands’ roastery and Phúc Long’s own tea hills show supply investment.' },
      { label: 'Business impact', text: 'Future competitiveness will depend on a retailer’s ability to connect customer insight with efficient execution. Sustainable growth requires a clear proposition, strong operating systems, and disciplined decisions about where and how to expand.' },
    ],
    visualKind: 'coffee-m4-53-responses', visualHeading: 'Seven responses in a sensible order',
    visualIntro: 'Follow the seven responses and what each aims at.',
    imageAlt: 'Casemate step diagram of seven strategic responses for coffeehouse retailers',
    keyTerms: [
      { term: 'Unit economics', definition: 'Revenue and cost per store or per order.' },
      { term: 'Supply resilience', definition: 'The ability to keep supply steady when shocks hit suppliers or prices.' },
      { term: 'Selective expansion', definition: 'Opening stores only where demand, brand fit and economics are validated.' },
      { term: 'Business system', definition: 'The linked set of product, cost, operations and growth choices that make a business work.' },
    ],
    recap: [
      'Future competition rewards efficiency, retention, digital and supply capability.',
      'Responses should fit the size and positioning of each business.',
      'Improve the whole business system, not one visible dimension.',
      'Expand where demand and economics are validated.',
    ],
    chapterRecap: 'Future competitiveness will depend on a retailer’s ability to connect customer insight with efficient execution. Sustainable growth requires a clear proposition, strong operating systems, and disciplined decisions about where and how to expand.',
    deepDiveTitle: 'Why one visible fix rarely works',
    body: <C4DeepDive paragraphs={[
      'A new loyalty app will not rescue a store with poor site economics, and a lower price will not rescue a brand with no clear difference. Each fix works only if the other parts of the system can support it.',
      'That is why the responses are ordered from positioning and unit economics outward: the foundation has to be sound before channels and expansion add weight.' ]} evidence="The regional and iPOS.vn perspectives are from VietnamPlus and The Viet Media; Phúc Long’s targets and same-store figures are from Vietnam.vn and The Investor; Highlands’ listing aim is from Agro.gov.vn; Chagee and Starbucks details are from The Viet Media and Vietstock; supply details are from Viet Nam News and Phúc Long’s website. The ordering rationale is our own teaching sequence." />,
    sources: citeC4('vietnamplusRegional', 'momentumChains', 'vietmediaSplit', 'phucLongResults', 'investorLargerPlayers', 'agroMilano', 'vietstockRepositioning', 'highlandsRoastery', 'phucLongTea'),
  }),
];

const quiz = c4Quiz('coffee-m4-l5', [
  { chapter: '1', objective: 'State the central opportunity', question: 'What is the industry’s central strategic opportunity?', application: 'A founder sees strong coffee habits. What should they build?', correct: 'To convert consumer familiarity into sustainable, differentiated businesses', wrong: ['To copy every competitor', 'To compete only on price', 'To avoid growth'], explanation: 'Familiarity is not a business model. Review Chapter 1.' },
  { chapter: '1', objective: 'State the principal risk', question: 'What is the principal risk named in the SWOT?', application: 'A chain expands by cutting prices. What is the risk?', correct: 'Expanding or competing on price without the operating capabilities for repeat demand and returns', wrong: ['Having too many customers', 'Having strong brands', 'Low rent'], explanation: 'Capabilities are the safeguard. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the chain market', question: 'How large were Vietnam’s coffee and tea chains combined in 2025, according to Momentum Works reporting?', application: 'An analyst sizes the segment. What is the figure?', correct: 'About US$1.34 billion', wrong: ['About US$13 million', 'About US$134 billion', 'About US$1.3 trillion'], explanation: 'It covers chains only. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a growth paradox', question: 'How can the chain market grow while 42.7% of surveyed establishments see revenue fall?', application: 'A student sees both facts. What explains them?', correct: 'Growth is concentrated in strong brands that take share from weaker outlets', wrong: ['One of the figures must be false', 'All outlets grew equally', 'The survey covered only chains'], explanation: 'Different parts of the market. Review Chapter 1.' },
  { chapter: '2', objective: 'State the hardest challenge', question: 'What does the chapter call the most difficult challenge?', application: 'A chain counts store openings as success. What is missing?', correct: 'Balancing growth with economic sustainability', wrong: ['Choosing a logo', 'Finding customers who never leave', 'Avoiding all competition'], explanation: 'Openings are not proof of profit. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the wage floor', question: 'What is the Region I minimum wage from 1 January 2026?', application: 'A manager budgets payroll in a Region I city. What is the floor?', correct: 'VND 5.31 million a month', wrong: ['VND 531 a month', 'VND 53 million a month', 'There is none'], explanation: 'It is set by Decree 293/2025. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare cost reports', question: 'How should the 50–60% and 69.38% raw-material cost figures be treated?', application: 'Two reports give different shares. What should an analyst do?', correct: 'Cite each with its source and definition, noting they come from different reports', wrong: ['Average them silently', 'Use only the larger', 'Ignore both'], explanation: 'Do not merge sources. Review Chapter 2.' },
  { chapter: '3', objective: 'State the strongest response', question: 'What is the strongest competitive response?', application: 'A brand launches an app but ignores site economics. What is wrong?', correct: 'Improve the complete business system rather than optimise one visible dimension', wrong: ['Optimise only price', 'Open more stores', 'Copy the market leader'], explanation: 'The parts must reinforce one another. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a same-store figure', question: 'By how much did Phúc Long’s daily revenue per standard store rise in Q2 2026?', application: 'An analyst checks productivity. What was reported?', correct: '18.5%', wrong: ['1.85%', '185%', 'It fell'], explanation: 'It reached VND 26.2 million. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe the shift', question: 'According to iPOS.vn and observers, what is competition expected to shift toward?', application: 'A chain still counts stores as success. What should it track?', correct: 'Per-store efficiency, customer experience and financial resilience', wrong: ['Store count growth alone', 'Logo redesign', 'Price cuts only'], explanation: 'Efficiency overtakes expansion. Review Chapter 3.' },
]);

export const LESSON_C4_5: CoffeeM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can summarise the industry’s SWOT, name its main strategic challenges and describe the responses that fit different business models.',
    keyTakeaways: [
      'The central opportunity is turning consumer familiarity into differentiated, sustainable businesses.',
      'The market is growing in value yet many outlets are losing revenue.',
      'Cost pressure, imitation and complexity compound each other.',
      'Store openings and digital sales are not success measures unless profitable and repeatable.',
      'The strongest response improves the whole business system.',
    ],
    businessImplications: 'Match investment to your model’s strengths, track per-store returns and build positioning, systems and supply resilience together.',
    remember: 'Growth only counts when each store can sustain it.',
    nextLesson: 'Consumer Trends',
  },
};
