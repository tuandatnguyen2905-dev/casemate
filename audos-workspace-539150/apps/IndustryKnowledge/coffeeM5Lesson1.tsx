import { C5DeepDive, citeC5, c5Chapter, c5Quiz } from './coffeeM5Core';
import type { CoffeeM5LessonBundle } from './coffeeM5Core';

const LESSON = '1. Consumer Trends';

const deck = [
  c5Chapter({
    title: 'Experience-Driven Consumption and Lifestyle Integration', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why the café experience is becoming part of the product and what it takes for experience-led positioning to pay.',
    mateIntro: 'People now choose a café for the place as much as the drink: somewhere to work, meet, study or unwind. The challenge is to make that place earn its cost.',
    keyInsight: 'The café experience is becoming part of the product itself. Brands that create a recognizable atmosphere and a clear reason to visit can differentiate themselves beyond beverage recipes, although experiential investment must generate sufficient customer traffic and spending to justify its cost.',
    statTiles: [
      { value: '4', label: 'Key experience activities', subtitle: 'Store design to experience consistency', description: 'Experience-based store design, occasion-based marketing, community building and experience consistency.' },
      { value: '14.24%', label: 'Share of diners who had tried none of the listed food and drink trends', subtitle: 'iPOS.vn, first half of 2026', description: 'So about 86% had tried at least one, by our arithmetic.' },
      { value: '2–4 a week', label: 'Café visits reported by students interviewed', subtitle: 'VietNamNet, April 2025', description: 'A study-and-social habit built around the space.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The trend figure is a survey share and the 86% is our own calculation; the student figure comes from individual interviews, not a survey, and no public Vietnam data on dwell time or revenue per seat was found.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouses are increasingly serving purposes beyond beverage consumption. Consumers use cafés as places to socialize, study, work remotely, hold informal meetings, and spend leisure time. Interior design, atmosphere, seating comfort, music, and location therefore contribute to the overall value proposition.' },
      { label: 'Why it is happening', text: 'This trend encourages operators to build concepts around specific lifestyles and consumption occasions. Nevertheless, experience-led positioning must be supported by consistent product quality, convenient service, and prices that customers consider reasonable.' },
      { label: 'Real-world example', text: 'Operators create distinct environments for socializing, studying, remote working or premium coffee appreciation; develop offers for morning routines, afternoon breaks, group gatherings and evening visits; organize workshops, product tastings, creative events or local collaborations that encourage repeat visits; and align store ambience, staff service, product presentation and brand communication across locations.' },
      { label: 'Vietnam example', text: 'The iPOS.vn first-half 2026 report found that only 14.24% of diners had tried none of the listed trends and said the models driving trends share not low prices but a clear reason to be chosen; 24/7 coffee was among the trends. Students interviewed in 2025 visited cafés two to four times a week for VND 45,000–65,000 drinks. Starbucks held a concert called Siren Calling for 12,000 people, Highlands, Katinat and Trung Nguyên Legend run small music nights at larger stores, and chains are moving into universities, large workplaces and cultural sites after taking many of the best street sites. Phúc Long added a flagship and the Unicorn format, and a Ho Chi Minh City robot café pairs coffee with a self-service flower shop that a customer likened to a workshop. The iPOS.vn summit theme for 2026 asked whether a venue gives customers enough reason to return.' },
      { label: 'Business impact', text: 'Lifestyle integration expands the role of coffeehouses from beverage outlets into social and experiential destinations. Successful operators must balance differentiated experiences with accessible pricing and sustainable store economics.' },
    ],
    visualKind: 'coffee-m5-11-experience', visualHeading: 'Four ways experience becomes part of the product',
    visualIntro: 'See the four activities that build the café as a destination and what each builds.',
    imageAlt: 'Casemate map of four activities that make the café experience part of the product',
    keyTerms: [
      { term: 'Value proposition', definition: 'The combination of product, service and experience a brand offers customers.' },
      { term: 'Consumption occasion', definition: 'The situation in which a product is bought and used, such as a work break or a meeting.' },
      { term: 'Dwell time', definition: 'How long a customer stays in the store.' },
      { term: 'Experience consistency', definition: 'Delivering the same standard of atmosphere and service at every location.' },
    ],
    recap: [
      'Cafés serve social, study, work and leisure needs as well as drinks.',
      'Design, atmosphere, comfort, music and location add to the value proposition.',
      'Experience-led positioning needs consistent quality, convenience and fair prices.',
      'Experience spending must be justified by traffic and spend.',
    ],
    chapterRecap: 'Lifestyle integration expands the role of coffeehouses from beverage outlets into social and experiential destinations. Successful operators must balance differentiated experiences with accessible pricing and sustainable store economics.',
    deepDiveTitle: 'Why a space that is loved is not always a space that pays',
    body: <C5DeepDive paragraphs={[
      'A popular, photogenic café can be full of people who buy one drink and stay for hours. The experience then draws attention, but revenue per seat may stay low unless food, events or pricing lift the spend.',
      'This is why the brief ties experience to traffic and spending: the test is whether the extra investment in design and events produces visits and sales that cover it.' ]} evidence="Trend and summit details are from the iPOS.vn first-half 2026 press release; student visits are from interviews reported by VietNamNet; the concert, small music nights and university moves are from VietnamBiz; Phúc Long’s flagship is from VietnamBiz; the robot café is a single-shop report from Dan Tri. The seat-revenue reasoning is our own." />,
    sources: citeC5('iposH12026Detail', 'studentCafes', 'vietnambizShakeout', 'roboticCafe'),
  }),
  c5Chapter({
    title: 'Value-Conscious Consumption and Premiumization', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how value-conscious spending and selective premiumisation coexist and how a price ladder serves both.',
    mateIntro: 'Customers are watching every dong, yet many are still choosing a better drink. The common thread is that they want to see what they are paying for.',
    keyInsight: 'The market is moving toward value justification rather than price competition alone. Operators need a clear relationship between price, product quality, portion size, convenience, and experience.',
    statTiles: [
      { value: '4', label: 'Key value and premium activities', subtitle: 'Price ladder to premium development', description: 'Good-better-best pricing, menu engineering, affordable bundling and premium product development.' },
      { value: '29.44%', label: 'Share of diners spending under VND 35,000 a drink in H1 2026', subtitle: 'iPOS.vn, down from 41.64%', description: 'The cheapest spending band shrank.' },
      { value: '61.78%', label: 'Share spending VND 36,000–70,000 a drink in H1 2026', subtitle: 'iPOS.vn, up from 48.29%', description: 'The mid-priced band grew.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The spending figures are survey shares of diners, not sales values, and the release does not date the earlier comparison point.',
    narrative: [
      { label: 'What it is', text: 'Consumers are balancing discretionary spending with expectations for quality, convenience, and product differentiation. Inflation and operating-cost pressures make customers more attentive to whether a beverage or meal provides sufficient value for its price.' },
      { label: 'Why it is happening', text: 'At the same time, premiumization remains possible when higher prices are supported by better ingredients, distinctive preparation, specialty products, superior service, or a compelling brand experience. Premiumization therefore does not necessarily mean that all customers are willing to spend more; it means that some are prepared to pay more for clearly perceived benefits.' },
      { label: 'Real-world example', text: 'Operators offer entry-level products, core bestsellers and premium options to serve different spending capacities; identify products that combine customer demand, contribution margin and operational simplicity; bundle drinks with bakery items, snacks or meals to raise perceived value and average transaction size; and introduce specialty coffee, signature beverages, seasonal menus or traceable ingredients where customers recognise the added value.' },
      { label: 'Vietnam example', text: 'The iPOS.vn first-half 2026 report found that drink spending did not fall even as cheap formats multiplied: diners spending under VND 35,000 fell from 41.64% to 29.44%, while those spending VND 36,000–70,000 rose from 48.29% to 61.78%. It describes the VND 21,000–35,000 band as squeezed between VND 7,000–15,000 kiosks and mid-tier brands. Highlands and Phúc Long price in nearly the same band (VND 29,000–75,000 and VND 35,000–70,000), Starbucks was near VND 90,000 for a medium drink in a 2023 BBC report, and Phúc Long aims for about 11% of revenue from food. In the 200-receipt Q&Me study, receipts with food averaged VND 162,000 against VND 88,000 for drink only, a small sample.' },
      { label: 'Business impact', text: 'Value-conscious consumption requires operators to protect affordability while preserving differentiation. A well-designed price ladder can serve budget-conscious customers and premium-seeking segments without relying entirely on discounting.' },
    ],
    visualKind: 'coffee-m5-12-value', visualHeading: 'Where drink spending moved',
    visualIntro: 'Compare the share of diners in the cheapest and the mid-priced drink bands.',
    imageAlt: 'Casemate bar chart of drink spending bands in Vietnam, first half of 2026',
    keyTerms: [
      { term: 'Premiumization', definition: 'Moving products or brands to higher quality and price tiers where customers see added value.' },
      { term: 'Price ladder', definition: 'A range of entry, core and premium products at different prices.' },
      { term: 'Menu engineering', definition: 'Choosing and pricing items by demand, margin and ease of preparation.' },
      { term: 'Bundling', definition: 'Selling several items together at a combined price.' },
    ],
    recap: [
      'Customers weigh price against quality, portion, convenience and experience.',
      'Premiumization works when the benefit is clearly perceived.',
      'In Vietnam, spending moved from the cheapest band into the mid-priced band.',
      'A good price ladder serves both budget and premium customers.',
    ],
    chapterRecap: 'Value-conscious consumption requires operators to protect affordability while preserving differentiation. A well-designed price ladder can serve budget-conscious customers and premium-seeking segments without relying entirely on discounting.',
    deepDiveTitle: 'Why trading up and watching prices can happen together',
    body: <C5DeepDive paragraphs={[
      'A customer who skips the very cheapest drink may do so because it tastes worse or feels less special, not because money is no object. The same customer may still reject a premium price that has no visible reason behind it.',
      'That is why value justification matters: a mid-priced drink with a clear benefit can win both from cheaper options and from drinks that cost more with no extra reason.' ]} evidence="Spending shares and the squeezed band are from the iPOS.vn first-half 2026 press release; price bands are from VietnamBiz; the 2023 Starbucks price is from the BBC; the food target is from Vietnam.vn reporting Masan; receipt figures are from a small Q&Me study. The trade-up explanation is our own reasoning." />,
    sources: citeC5('iposH12026Detail', 'vietnambizHighlandsPhucLong', 'bbcStarbucks', 'phucLongResults', 'qmeReceipts'),
  }),
  c5Chapter({
    title: 'Health, Personalization, and Responsible Consumption', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how customisation, health-oriented products and responsible personalisation can add value without adding friction.',
    mateIntro: 'More customers want a drink made their way. The art is giving them choices that are easy to understand and easy for the store to deliver.',
    keyInsight: 'Personalization is most valuable when it improves relevance without adding friction. Operators should make customization easy to understand and operationally manageable, rather than expanding menu complexity without sufficient demand.',
    statTiles: [
      { value: '4', label: 'Key health and personalization activities', subtitle: 'Customizable menus to responsible personalization', description: 'Customizable menus, health-oriented innovation, transparent product information and responsible personalization.' },
      { value: 'VND 10K + 2 Stars', label: 'Starbucks incentive for bringing a reusable cup', subtitle: 'Starbucks Vietnam, company post', description: 'A reward for a responsible-consumption habit.' },
      { value: '1 Jan 2026', label: 'Date Law 91/2025/QH15 on personal data protection took effect', subtitle: 'Official Gazette', description: 'Sets consent rules for personalised marketing.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Starbucks terms are a company promotion whose current form was not checked, and no Vietnam coffeehouse data on lower-sugar demand or the share of customised orders was found.',
    narrative: [
      { label: 'What it is', text: 'Consumer preferences are diversifying around sweetness, caffeine intake, ingredient composition, dietary needs, and perceived freshness. This creates opportunities for customizable beverages, reduced-sugar options, plant-based alternatives, and products that communicate ingredient origins more clearly.' },
      { label: 'Why it is happening', text: 'Personalization also extends to service and customer engagement. Digital ordering, saved preferences, and loyalty programs can help brands provide relevant recommendations, provided that data collection is transparent and customers retain reasonable control over their information.' },
      { label: 'Real-world example', text: 'Operators provide clear options for sweetness, ice, milk, serving size and add-ons; test lower-sugar recipes, lighter beverages and ingredient alternatives against demand; communicate ingredients, allergens, serving sizes and nutritional information accurately; and use customer preferences to improve recommendations while giving clear privacy notices and consent mechanisms.' },
      { label: 'Vietnam example', text: 'Katinat positions itself around Vietnamese agricultural produce and regional stories, according to a commentary. Highlands (from 19 December 2025) and Phúc Long run loyalty programmes that can hold customer preferences, and Law 91/2025/QH15, effective 1 January 2026, requires clear, specific, recorded consent, with silence and default consent not allowed; Decree 330/2026/ND-CP sets fines of VND 30–50 million for processing without valid consent and VND 50–70 million for treating silence as consent. On responsible consumption, Starbucks offers VND 10,000 off and 2 bonus Stars for a reusable cup and has charged VND 500 per paper bag since 26 December 2024, while Highlands has given VND 8,000 off for a personal cup, reported at one outlet as applying on Mondays. No Vietnam data on lower-sugar demand was found.' },
      { label: 'Business impact', text: 'Health-conscious and personalized consumption creates room for targeted product innovation. Commercial success depends on customer acceptance, reliable product information, and the ability to deliver customization without slowing service or increasing waste excessively.' },
    ],
    visualKind: 'coffee-m5-13-personalisation', visualHeading: 'Four steps to personalisation without friction',
    visualIntro: 'Read the four steps and what each protects.',
    imageAlt: 'Casemate cards of four health and personalisation activities for coffeehouses',
    keyTerms: [
      { term: 'Customisation', definition: 'Letting customers choose options such as sweetness, ice, milk and size.' },
      { term: 'Consent', definition: 'A customer’s clear, specific and recorded agreement to how their data is used.' },
      { term: 'Menu complexity', definition: 'The number of items and options a store must prepare, which affects speed and waste.' },
      { term: 'Reusable cup', definition: 'A customer-owned cup that replaces a single-use cup, often with a discount.' },
    ],
    recap: [
      'Customers want choices on sweetness, ingredients and freshness.',
      'Personalisation helps when it adds relevance without friction.',
      'Accurate product information and clear consent build trust.',
      'Too many options can slow service and raise waste.',
    ],
    chapterRecap: 'Health-conscious and personalized consumption creates room for targeted product innovation. Commercial success depends on customer acceptance, reliable product information, and the ability to deliver customization without slowing service or increasing waste excessively.',
    deepDiveTitle: 'Why a longer menu is not the same as better personalisation',
    body: <C5DeepDive paragraphs={[
      'Every extra option adds ingredients to hold, steps to train and chances for errors. A short list of clear modifiers can give customers most of the control they want while keeping the line moving.',
      'Data-based personalisation has the same limit: recommendations help only if customers understand what is collected and can say no, which Vietnamese law now requires to be recorded.' ]} evidence="Katinat’s positioning is commentary from Vinalink; loyalty details are from Highlands’ announcement and Phúc Long’s website; the data law is from the Official Gazette, a LexData summary and the Chinhphu.vn text of Decree 330/2026/ND-CP; reusable-cup and bag details are from Greenstyle, a Starbucks post and a Highlands report. The menu-complexity reasoning is our own." />,
    sources: citeC5('katinatProfile', 'highlandsApp', 'phucLongRewards', 'pdplLaw', 'pdplConsent', 'decree330', 'greenstyleReusable', 'starbucksByoc'),
  }),
];

const quiz = c5Quiz('coffee-m5-l1', [
  { chapter: '1', objective: 'State the experience insight', question: 'What does the chapter say is becoming part of the product itself?', application: 'A brand copies a rival’s recipes but not its atmosphere. What is missing?', correct: 'The café experience', wrong: ['The delivery fee', 'The supplier’s name', 'The tax invoice'], explanation: 'Atmosphere is part of the offer. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the trend survey', question: 'What share of diners had tried none of the listed trends in the iPOS.vn H1 2026 survey?', application: 'An analyst sizes the experiment-ready customer base. What was the share?', correct: '14.24%', wrong: ['0.14%', '86%', '99%'], explanation: 'So most diners had tried at least one. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply the cost test', question: 'What must experiential investment achieve?', application: 'A chain spends heavily on interiors. How should it judge the spend?', correct: 'Generate enough traffic and spending to justify its cost', wrong: ['Be as expensive as possible', 'Avoid any customer data', 'Replace the menu'], explanation: 'Experience must pay. Review Chapter 1.' },
  { chapter: '2', objective: 'State the value insight', question: 'What is the market moving toward, according to the chapter?', application: 'A brand cuts prices to win customers. What is the better question?', correct: 'Value justification rather than price competition alone', wrong: ['Price competition only', 'No pricing at all', 'Premium pricing for all'], explanation: 'Customers want to see what they pay for. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the spending shift', question: 'What happened to the share of diners spending VND 36,000–70,000 a drink, according to the iPOS.vn H1 2026 report?', application: 'An analyst asks whether customers traded down. What does the band show?', correct: 'It rose from 48.29% to 61.78%', wrong: ['It fell to 29.44%', 'It did not change', 'It disappeared'], explanation: 'Many moved into the mid-priced band. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain premiumization', question: 'What does premiumization mean in this chapter?', application: 'A café raises prices on a specialty drink. What must be true?', correct: 'Some customers are prepared to pay more for clearly perceived benefits', wrong: ['All customers will pay more', 'Prices must never rise', 'Quality is irrelevant'], explanation: 'Not everyone trades up. Review Chapter 2.' },
  { chapter: '2', objective: 'Use the price ladder', question: 'What does a well-designed price ladder do?', application: 'A chain wants to serve budget and premium customers. What helps?', correct: 'Serves both groups without relying entirely on discounting', wrong: ['Removes all entry products', 'Sets every price equal', 'Only sells premium'], explanation: 'Good-better-best options. Review Chapter 2.' },
  { chapter: '3', objective: 'State the personalization insight', question: 'When is personalization most valuable?', application: 'A brand adds 40 customisation options. What should it check?', correct: 'When it improves relevance without adding friction', wrong: ['When it adds many options', 'When it hides ingredients', 'When it needs no data'], explanation: 'Keep it easy and manageable. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the data law date', question: 'When did Law 91/2025/QH15 on personal data protection take effect?', application: 'A loyalty team checks its consent forms. Which date applies?', correct: '1 January 2026', wrong: ['1 January 2015', '30 June 2020', '4 July 2030'], explanation: 'Consent must be clear and recorded. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on Vietnam demand for lower-sugar coffeehouse drinks?', application: 'A deck quotes the share of customers asking for less sugar. Is there a source?', correct: 'No public Vietnam data was found', wrong: ['It is 90%', 'It is 0%', 'It is published monthly'], explanation: 'Gaps are stated explicitly. Review Chapter 3.' },
]);

export const LESSON_C5_1: CoffeeM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how experience, value and personalisation are changing what coffeehouse customers expect.',
    keyTakeaways: [
      'The café experience is becoming part of the product, but must earn its cost.',
      'Customers watch value: spending shifted from the cheapest band into the mid-priced band.',
      'Premiumization works only when benefits are clearly perceived.',
      'Personalisation helps when it is easy and consent is clear.',
      'Evidence on health-driven demand in Vietnam coffeehouses is thin.',
    ],
    businessImplications: 'Build a recognisable experience, justify every price point and offer personalisation that is simple, consented and easy to deliver.',
    remember: 'Customers pay for what they can see the value in.',
    nextLesson: 'Technology & Innovation Trends',
  },
};
