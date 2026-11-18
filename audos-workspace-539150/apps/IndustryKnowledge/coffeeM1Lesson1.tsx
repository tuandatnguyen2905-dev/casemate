import { C1DeepDive, citeC1, c1Chapter, c1Quiz } from './coffeeM1Core';
import type { CoffeeM1LessonBundle } from './coffeeM1Core';

const LESSON = '1. Industry Definition & Scope';

const deck = [
  c1Chapter({
    title: 'Industry Definition and Core Characteristics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Define coffeehouse and foodservice retail and explain why it is an experience-driven, location-sensitive and operationally intensive sector.',
    mateIntro: 'A café sells a drink, but customers also buy a seat, a mood and a routine. That mix is what makes this industry different from selling packaged goods.',
    keyInsight: 'The industry is not simply a food and beverage market. It is an experience-driven, location-sensitive, and operationally intensive retail sector in which customer traffic, average transaction value, repeat visits, and store-level productivity jointly determine performance.',
    statTiles: [
      { value: '5', label: 'Key activities of the industry', subtitle: 'Beverage preparation to customer relationships', description: 'Beverage preparation, food preparation and service, hospitality and experience delivery, retail transactions, and customer relationship management.' },
      { value: 'VND 678T', label: 'Consumer foodservice value sales in Vietnam in 2025', subtitle: 'Euromonitor, up 5% in current terms', description: 'Covers cafés and bars, restaurants, cafeterias and street stalls.' },
      { value: '~329,500', label: 'Food and beverage outlets in Vietnam in 2025', subtitle: 'iPOS.vn and Nestlé Professional estimate', description: 'A survey-based estimate; most outlets are independent.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the market value and outlet count are separate research estimates with different definitions and should not be combined.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retail refers to businesses that prepare, serve, and sell beverages and ready-to-eat food directly to consumers through physical outlets, takeaway services, delivery platforms, and increasingly integrated digital channels.' },
      { label: 'Why it is happening', text: 'The industry combines food and beverage production with hospitality and retail operations. Unlike packaged consumer goods, its products are often prepared close to the point of consumption, making service speed, product consistency, location, and customer experience central to competitiveness.' },
      { label: 'Real-world example', text: 'A café prepares espresso-based drinks, brewed coffee, tea and seasonal specials; sells pastries, sandwiches, desserts and light meals; provides seating, ambience and a place to meet, study or work; serves dine-in, takeaway, drive-through, click-and-collect and delivery orders; and uses loyalty programmes, an app and personalised offers to encourage return visits.' },
      { label: 'Vietnam example', text: 'Euromonitor puts Vietnam’s consumer foodservice at VND 678 trillion in 2025, up 5% in current terms, a measure that includes cafés and bars, full- and limited-service restaurants, cafeterias and street stalls. The iPOS.vn and Nestlé Professional survey counts about 329,500 outlets, most of them independent. Highlands Coffee opened what was reported as Vietnam’s first drive-through coffee store in 2025, and online food delivery was worth about US$2.1 billion, showing how one business now serves seat, car and app.' },
      { label: 'Business impact', text: 'Coffeehouse and foodservice retail integrates food and beverage preparation, hospitality, and consumer retail. Its performance depends on both the products sold and the quality and efficiency of the overall customer experience.' },
    ],
    visualKind: 'coffee-m1-11-definition', visualHeading: 'Five activities that define the industry',
    visualIntro: 'See the five core activities around the centre and what each drives.',
    imageAlt: 'Casemate orbit mind map of five activities that define coffeehouse and foodservice retail',
    keyTerms: [
      { term: 'Average transaction value', definition: 'The average amount a customer spends per visit.' },
      { term: 'Store-level productivity', definition: 'How much sales and profit each outlet produces.' },
      { term: 'Click-and-collect', definition: 'Ordering ahead and picking the order up in store.' },
      { term: 'Dwell time', definition: 'How long a customer stays in the venue.' },
    ],
    recap: [
      'The industry sells prepared drinks and food directly to consumers.',
      'It blends food production, hospitality and retail.',
      'Speed, consistency, location and experience set competitiveness.',
      'Traffic, ticket, repeat visits and store productivity drive results.',
    ],
    chapterRecap: 'Coffeehouse and foodservice retail integrates food and beverage preparation, hospitality, and consumer retail. Its performance depends on both the products sold and the quality and efficiency of the overall customer experience.',
    deepDiveTitle: 'Why four numbers explain most of a café’s performance',
    body: <C1DeepDive paragraphs={[
      'Sales equal customers times visits times spend. Traffic shows how many people come, repeat visits show whether they return, average transaction value shows what they buy, and store productivity shows what the site earns for the space and staff used.',
      'Improving only one of these can hide a problem in another, which is why operators track them together.' ]} evidence="The five activities are described in the supplied material. Market value is from a Euromonitor summary, the outlet count from the iPOS.vn and Nestlé Professional survey as reported by VCCI, and the drive-through and delivery items from Vietnamese press reports." />,
    sources: citeC1('euromonitorFoodservice', 'iposReport2025', 'vcciFnbEnglish', 'vietnambizChains', 'vnexpressDelivery'),
  }),
  c1Chapter({
    title: 'Industry Scope and Business Categories', chapterTitle: LESSON, readingTime: '7',
    objective: 'Distinguish the main formats in the industry and explain why they overlap.',
    mateIntro: 'A coffee chain sells croissants and a burger chain sells coffee. To analyse competition, we need to group businesses by what they offer and when customers use them.',
    keyInsight: 'Industry boundaries should be defined by consumer-facing foodservice activities and operating formats, rather than by a single product category. This allows analysis of both direct coffeehouse competitors and adjacent foodservice businesses competing for the same consumer spending.',
    statTiles: [
      { value: '6', label: 'Key business categories', subtitle: 'Specialty coffeehouses to bakery cafés and hybrids', description: 'Specialty coffeehouses, mainstream café chains, independent cafés, quick-service restaurants, casual and fast-casual dining, and bakery cafés and hybrid formats.' },
      { value: '985', label: 'Highlands Coffee stores at the end of 2025', subtitle: 'Jollibee Foods Corporation report', description: 'Vietnam’s largest coffee chain by company-reported network.' },
      { value: '~2,500', label: 'Milano Coffee outlets, self-published', subtitle: 'Reported by Momentum Works', description: 'A network built largely on a franchise-agency model.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store counts are company or press-reported, use different outlet definitions and should not be compared like for like.',
    narrative: [
      { label: 'What it is', text: 'The industry includes multiple formats that differ in menu complexity, service level, pricing, customer occasions, and operating models. Coffeehouses emphasize beverages and café experiences, while broader foodservice retail includes businesses where prepared food may account for a larger share of sales.' },
      { label: 'Why it is happening', text: 'These categories overlap in practice. For example, a coffee chain may sell bakery products and light meals, while a quick-service restaurant may develop coffee-led menus to capture breakfast and afternoon beverage occasions.' },
      { label: 'Real-world example', text: 'Specialty coffeehouses focus on espresso quality, brewing methods and origin; mainstream chains offer standard menus and consistent service across many stores; independents compete through local identity and owner-led service; quick-service restaurants prioritise speed, takeaway and delivery; casual and fast-casual restaurants offer broader menus and more substantial meals; and bakery cafés and hybrids combine coffee, pastries and seating to add purchase occasions.' },
      { label: 'Vietnam example', text: 'Highlands Coffee, controlled by Jollibee Foods Corporation, ended 2025 with 985 stores and in 2025 brought the Paris Baguette bakery brand under its umbrella, a bakery-café hybrid move. Milano Coffee reports about 2,500 outlets on a franchise-agency model, Starbucks about 150 stores, and Katinat about 114 in September 2025, while The Coffee House halved its stores and Café Amazon left Vietnam in November 2025. Highlands began as a premium chain before cutting prices to broaden its appeal.' },
      { label: 'Business impact', text: 'The industry encompasses several overlapping formats. A useful competitive analysis distinguishes businesses by customer occasion, product mix, service model, and price positioning rather than treating all foodservice outlets as identical.' },
    ],
    visualKind: 'coffee-m1-12-categories', visualHeading: 'Six overlapping business categories',
    visualIntro: 'See the six formats as cards and what each mainly wins on.',
    imageAlt: 'Casemate cards of six overlapping coffeehouse and foodservice business categories',
    keyTerms: [
      { term: 'Quick-service restaurant (QSR)', definition: 'A restaurant built for speed, convenience and standard menus.' },
      { term: 'Fast-casual', definition: 'A format between quick-service and sit-down dining with broader menus.' },
      { term: 'Hybrid format', definition: 'A venue that combines coffee, bakery, meals and seating.' },
      { term: 'Customer occasion', definition: 'The reason and moment for which a customer visits.' },
    ],
    recap: [
      'Formats differ by menu, service, price, occasion and operating model.',
      'Coffeehouses lead with drinks; broader foodservice may lead with food.',
      'Categories overlap, so rivals include adjacent formats.',
      'Group businesses by occasion, mix, service and price.',
    ],
    chapterRecap: 'The industry encompasses several overlapping formats. A useful competitive analysis distinguishes businesses by customer occasion, product mix, service model, and price positioning rather than treating all foodservice outlets as identical.',
    deepDiveTitle: 'Why a burger chain can be a coffee competitor',
    body: <C1DeepDive paragraphs={[
      'A customer deciding where to spend VND 40,000 on a morning drink may compare a café, a bakery and a fast-food outlet. If the customer occasion is the same, the businesses compete even when their formats differ.',
      'Defining rivals by occasion and spend, not by product label, avoids missing the competitors that take the customer.' ]} evidence="The six categories are described in the supplied material. Store counts and format moves are from VietnamPlus and VnExpress reports of Momentum Works data, a Jollibee Foods Corporation figure as reported by the press, and VietnamBiz; the BBC article describes Highlands’ pricing history." />,
    sources: citeC1('vietnamplusChains', 'vnexpressChains', 'vietnambizChains', 'vietmediaChains', 'bbcStarbucks'),
  }),
  c1Chapter({
    title: 'Revenue Models and Operating Formats', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare company-owned, franchised and hybrid models and show why store economics decide long-term success.',
    mateIntro: 'Opening a store is easy to imagine and hard to make profitable. How a brand funds and runs its stores decides how fast it grows and how much it keeps.',
    keyInsight: 'Store economics and the ability to replicate a profitable operating model are fundamental to long-term success. Revenue growth alone is insufficient if rent, labor, ingredients, delivery commissions, and store-level overhead erode margins.',
    statTiles: [
      { value: '5', label: 'Key revenue and operating models', subtitle: 'Company-owned to ancillary revenue', description: 'Company-owned stores, franchising, hybrid expansion, multi-channel sales and ancillary revenue.' },
      { value: '300–400 / 600–800', label: 'Cups a day at a typical store versus leading chains', subtitle: 'Momentum Works, via VnExpress', description: 'Shows how throughput varies across operators.' },
      { value: '20–30%', label: 'Typical commission per delivery order', subtitle: 'Reported by restaurants, excluding advertising', description: 'A large deduction from delivery sales.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the cup counts are a regional chain-report estimate and the commission range is a press report of restaurant complaints, not a fixed rate.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retailers generate revenue primarily through direct sales of beverages, food, and related products. Additional revenue may come from catering, merchandise, packaged coffee, subscriptions, delivery, and branded products, depending on the business model.' },
      { label: 'Why it is happening', text: 'Operating structures range from independent owner-operated stores to company-owned chains, franchised networks, and hybrid systems. Each structure creates different trade-offs in capital requirements, operating control, expansion speed, and consistency.' },
      { label: 'Real-world example', text: 'A company-owned chain invests in its outlets and controls staffing, service and pricing; a franchisor lets partners fund and run outlets under its brand for fees or royalties; a hybrid brand keeps flagship stores while franchising elsewhere; one store serves dine-in, takeaway, delivery, catering and digital orders; and a brand sells packaged coffee, merchandise or gift cards on the side.' },
      { label: 'Vietnam example', text: 'In the third quarter of 2025 Highlands Coffee opened 109 self-operated stores and 4 franchised stores, showing a mostly company-operated model, while Milano Coffee built about 2,500 outlets largely through franchise agency. Momentum Works estimates a typical store serves 300–400 cups a day while leading brands sell 600–800. Restaurants report delivery commissions of 20–30% per order, so a VND 100,000 order at 30% leaves VND 70,000 before any other cost.' },
      { label: 'Business impact', text: 'Revenue models vary, but successful operators generally require a repeatable store format, disciplined cost management, reliable product quality, and a clear rationale for each sales channel.' },
    ],
    visualKind: 'coffee-m1-13-models', visualHeading: 'Company-owned versus franchised stores',
    visualIntro: 'Compare the two models across capital, control, growth speed, consistency and economics.',
    imageAlt: 'Casemate comparison of company-owned and franchised coffeehouse stores',
    keyTerms: [
      { term: 'Franchising', definition: 'A model where partners fund and run outlets under a brand and pay fees or royalties.' },
      { term: 'Hybrid expansion', definition: 'Combining company-owned and franchised outlets.' },
      { term: 'Ancillary revenue', definition: 'Extra income from packaged coffee, merchandise, gift cards or similar products.' },
      { term: 'Store economics', definition: 'The sales, costs and profit of a single outlet.' },
    ],
    recap: [
      'Revenue comes mainly from direct drink and food sales.',
      'Company-owned and franchised models trade control against speed.',
      'Delivery commission and overheads can erode margin.',
      'A repeatable, profitable store format is the foundation.',
    ],
    chapterRecap: 'Revenue models vary, but successful operators generally require a repeatable store format, disciplined cost management, reliable product quality, and a clear rationale for each sales channel.',
    deepDiveTitle: 'A worked example of delivery commission',
    body: <C1DeepDive paragraphs={[
      'If a drink sells for VND 100,000 on a delivery app at a 30% commission, the operator receives VND 70,000 before ingredients, packaging, labour and rent. The same order in store keeps the full amount.',
      'Delivery can still be worth it if it adds orders that would not otherwise occur, but the operator should compare the extra profit with the commission and discounts it gives away.' ]} evidence="The five models are described in the supplied material. Network and format counts are from Momentum Works data as reported by VietnamPlus and VnExpress and a Jollibee Foods Corporation figure as reported by the press; the commission example is from a Tuoi Tre news report of restaurant complaints." />,
    sources: citeC1('vnexpressChains', 'vietnamplusChains', 'vietnamplusRegional', 'highlandsPhucLongQ3', 'tuoitreDelivery'),
  }),
];

const quiz = c1Quiz('coffee-m1-l1', [
  { chapter: '1', objective: 'State what the industry is', question: 'How does the chapter describe the industry?', application: 'An analyst treats it as a simple food and beverage market. What is missing?', correct: 'As an experience-driven, location-sensitive and operationally intensive retail sector', wrong: ['As a packaged goods manufacturer', 'As only a coffee farming business', 'As a wholesale trade'], explanation: 'Experience and location matter. Review Chapter 1.' },
  { chapter: '1', objective: 'List performance drivers', question: 'Which four factors jointly determine performance?', application: 'A manager tracks only sales growth. What should be added?', correct: 'Customer traffic, average transaction value, repeat visits and store-level productivity', wrong: ['Logo, colour, slogan and font', 'Advertising spend only', 'Number of suppliers only'], explanation: 'They work together. Review Chapter 1.' },
  { chapter: '1', objective: 'Contrast with packaged goods', question: 'Why are service speed and consistency central in this industry?', application: 'A café makes drinks to order. What does that imply?', correct: 'Products are often prepared close to the point of consumption', wrong: ['Products are stored for months', 'Customers never see the product made', 'Quality does not vary'], explanation: 'Preparation is part of the sale. Review Chapter 1.' },
  { chapter: '2', objective: 'Define the boundary', question: 'How should the industry’s boundaries be defined?', application: 'A study counts only coffee shops. What does this miss?', correct: 'By consumer-facing foodservice activities and operating formats, not a single product category', wrong: ['By coffee beans only', 'By price only', 'By the owner’s nationality'], explanation: 'Adjacent businesses compete for the same spend. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain overlap', question: 'Why do the categories overlap in practice?', application: 'A burger chain launches a coffee menu. What does it show?', correct: 'Coffee chains sell food and quick-service restaurants build coffee-led menus to capture occasions', wrong: ['Formats never change', 'Only independents sell coffee', 'Restaurants cannot sell drinks'], explanation: 'Occasions are shared. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a format', question: 'Which format prioritises speed, convenience, takeaway and delivery?', application: 'A customer wants a fast breakfast. Which format fits?', correct: 'Quick-service restaurants', wrong: ['Specialty coffeehouses only', 'Fine dining', 'Wholesale suppliers'], explanation: 'Speed defines QSRs. Review Chapter 2.' },
  { chapter: '2', objective: 'Use the right grouping', question: 'What should a useful competitive analysis group businesses by?', application: 'An investor lists all outlets as identical. What is better?', correct: 'Customer occasion, product mix, service model and price positioning', wrong: ['Alphabetical order', 'Opening year only', 'Colour of the logo'], explanation: 'Occasion decides competition. Review Chapter 2.' },
  { chapter: '3', objective: 'State the foundation of success', question: 'What is fundamental to long-term success?', application: 'A chain’s revenue is rising but profit is not. What matters?', correct: 'Store economics and a replicable profitable operating model', wrong: ['Revenue growth alone', 'The number of menu items', 'Slogan changes'], explanation: 'Costs can erode margin. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare models', question: 'What is a typical trade-off of franchising?', application: 'A brand wants fast expansion with partner capital. What is the trade-off?', correct: 'Faster growth with less direct control over consistency', wrong: ['Slower growth with more capital', 'No fees to receive', 'No brand standards needed'], explanation: 'Control and speed trade off. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply the delivery example', question: 'At a 30% commission, how much of a VND 100,000 delivery order does the operator receive before other costs?', application: 'An owner prices a delivery drink. What is left?', correct: 'VND 70,000', wrong: ['VND 30,000', 'VND 100,000', 'VND 130,000'], explanation: 'Commission reduces net sales. Review Chapter 3.' },
]);

export const LESSON_C1_1: CoffeeM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can define coffeehouse and foodservice retail, distinguish its overlapping formats and compare the main revenue and operating models.',
    keyTakeaways: [
      'The industry is experience-driven, location-sensitive and operationally intensive.',
      'Traffic, ticket, repeat visits and store productivity drive performance together.',
      'Define rivals by occasion, product mix, service model and price.',
      'Company-owned and franchised models trade control against speed.',
      'Revenue growth means little if costs erode store margins.',
    ],
    businessImplications: 'Analyse competitors by occasion and format, and judge any growth plan by store economics and a repeatable operating model.',
    remember: 'A café is sold by the visit, not just by the cup.',
    nextLesson: 'How the Industry Evolved',
  },
};
