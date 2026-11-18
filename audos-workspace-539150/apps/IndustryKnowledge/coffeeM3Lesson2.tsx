import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '2. Products, Services & Segmentation';

const deck = [
  c3Chapter({
    title: 'Core Product Categories and Menu Architecture', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the main product categories on a coffeehouse menu and how menu design lifts the average ticket.',
    mateIntro: 'A menu is not a list; it is a sales plan. What sits at the top, what pairs with what and what is offered at checkout all steer the bill.',
    keyInsight: 'Menu architecture decides what customers notice, what they add and what each visit is worth. A focused core of drinks brings traffic, while food, add-ons, size options and packaged products create the extra revenue and margin that a drink alone cannot.',
    statTiles: [
      { value: '6', label: 'Core menu categories', subtitle: 'Coffee to packaged goods', description: 'Coffee, tea, other beverages, food, seasonal items and packaged retail products.' },
      { value: '77%', label: 'Share of 200 sampled receipts with a drink only', subtitle: 'Q&Me, small sample', description: 'Most visits buy a drink and nothing else.' },
      { value: 'VND 88K to 162K', label: 'Average receipt with drink only against drink plus food', subtitle: 'Q&Me, small sample', description: 'Adding food lifted the ticket by about 84% in this sample.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The receipt figures come from only 200 receipts and are indicative; the 84% uplift is our own calculation from the two averages.',
    narrative: [
      { label: 'What it is', text: 'A coffeehouse menu typically combines coffee drinks, tea and other beverages, food, seasonal or limited items and, for some brands, packaged products sold to take away. Menu architecture is the way these items are grouped, priced, sized and presented.' },
      { label: 'Why it is happening', text: 'Drinks usually carry the traffic and food and add-ons carry margin and ticket size, so brands design menus to move customers from a single drink to a bundle. A tight menu also keeps preparation fast and inventory simple, while seasonal items create reasons to return.' },
      { label: 'Real-world example', text: 'A chain keeps a core of ten drinks, offers three sizes, pairs a pastry with a drink at a bundle price, rotates a seasonal item every quarter and sells bagged coffee at the till. Each choice nudges the average bill upwards without adding stores.' },
      { label: 'Vietnam example', text: 'A Q&Me study of 200 receipts from coffee chains found an average of about VND 110,000 a visit, with 77% drink-only and 18.5% drink plus food, and receipts with food averaging VND 162,000 against VND 88,000 for drink only; the sample is small, so treat it as indicative. Momentum Works put Vietnam’s coffee-chain segment at US$725 million in 2025 and combined coffee and tea chains at US$1.34 billion, which by subtraction leaves tea chains near US$615 million, so tea is a major category and not a side item. Phúc Long is built on tea and says its tea comes from two hills it owns, while Highlands built a roastery to supply its coffee. Vietnam’s production is about 97% Robusta, according to the International Coffee Organization, which shapes the coffee in local menus.' },
      { label: 'Business impact', text: 'Menu design shapes revenue per visit, preparation time and inventory complexity. A good menu lifts ticket size without slowing service, and an unfocused menu raises waste and training cost.' },
    ],
    visualKind: 'coffee-m3-21-menu', visualHeading: 'What sampled receipts show',
    visualIntro: 'Read the share of visits that bought a drink only against a drink with food.',
    imageAlt: 'Casemate bar chart of receipt mix from a small Vietnam coffee chain study',
    keyTerms: [
      { term: 'Menu architecture', definition: 'How items are grouped, sized, priced and presented to guide choices.' },
      { term: 'Average ticket', definition: 'The average amount spent per order or visit.' },
      { term: 'Attach rate', definition: 'The share of orders that add a second item, such as food to a drink.' },
      { term: 'Seasonal item', definition: 'A limited-time product that gives customers a reason to return.' },
    ],
    recap: [
      'A menu is a sales plan as well as a list.',
      'Drinks bring traffic; food and add-ons lift ticket and margin.',
      'In one small Vietnam study most receipts were drink only.',
      'A tight menu keeps service fast and waste low.',
    ],
    chapterRecap: 'Menu architecture links product, price and preparation. A focused core, supported by well-placed food, add-ons and seasonal items, raises the value of each visit without slowing the line.',
    deepDiveTitle: 'Why attach rate matters more than headline price',
    body: <C3DeepDive paragraphs={[
      'If three in four customers buy a drink only, then moving even a small share to drink plus food changes the bill more than a small price rise would, and customers are not asked to pay more for the same item.',
      'The sample behind these numbers is small, so the point is the method: count what customers actually buy per visit, not just what the menu offers.' ]} evidence="Receipt figures are from a Q&Me summary of 200 receipts and are indicative; chain market sizes are from VietnamPlus and VnExpress reporting of Momentum Works; the tea-chain figure is our subtraction of the two; the Robusta share is from the International Coffee Organization; Phúc Long and Highlands details are from company statements and press." />,
    sources: citeC3('qmeReceipts', 'vietnamplusChains', 'vnexpressChains', 'phucLongTea', 'highlandsRoastery', 'icoVietnam'),
  }),
  c3Chapter({
    title: 'Service Formats and Consumption Occasions', chapterTitle: LESSON, readingTime: '6',
    objective: 'Match service formats to the occasion each serves and explain what each demands from space, staff and menu.',
    mateIntro: 'The same latte is a different product when bought in a drive-through, at a study table or on a delivery app.',
    keyInsight: 'A service format is a bet on a particular consumption occasion. Dine-in, work and study, takeaway, drive-through, late-night and delivery formats each need different space, staffing, menu and pricing, so brands that choose clearly serve their occasion better than those that try to serve all of them.',
    statTiles: [
      { value: '6', label: 'Service formats', subtitle: 'Dine-in to delivery', description: 'Dine-in café, study and work space, takeaway, drive-through, late-night and delivery.' },
      { value: 'VND 45–65K', label: 'Typical student drink price in interviews', subtitle: 'VietNamNet, April 2025', description: 'Students spend a modest sum per drink but stay long.' },
      { value: '2–4 a week', label: 'Café visits reported by students interviewed', subtitle: 'VietNamNet, April 2025', description: 'A habit that repeats several times a week.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The student figures come from individual interviews, not a survey of all students.',
    narrative: [
      { label: 'What it is', text: 'Service formats describe how a customer consumes the product: seated in the café, working or studying for hours, taking a drink away, ordering from a car, visiting late at night or having it delivered. Each is linked to a different consumption occasion.' },
      { label: 'Why it is happening', text: 'Occasions differ in how long customers stay, how much they spend and what they value, from speed to comfort to price. Real estate, labour and equipment are costly, so each format is designed around the occasion it earns most from.' },
      { label: 'Real-world example', text: 'A study table customer buys one drink and stays three hours, using space and power sockets; a drive-through customer buys quickly and leaves in minutes. The first needs seating and a relaxed atmosphere, the second needs speed, a lane and a short menu.' },
      { label: 'Vietnam example', text: 'Students interviewed by VietNamNet in April 2025 visited cafés two to four times a week for VND 45,000–65,000 drinks, and one spent 10–15% of a monthly allowance, which makes study cafés a distinct occasion. Highlands opened Vietnam’s first drive-through in 2025, and E-Coffee offers formats from about four square metres for takeaway. The iPOS.vn first-half 2026 report lists 24/7 coffee among diners’ trend rankings, and delivery reached US$2.1 billion in 2025, with ShopeeFood and GrabFood at 48% each.' },
      { label: 'Business impact', text: 'Format choices set a store’s capital cost, staffing and capacity. Operators earn more when the format fits the occasion; they lose when they run a study-style space on takeaway-style prices.' },
    ],
    visualKind: 'coffee-m3-22-formats', visualHeading: 'Six formats and the occasion each serves',
    visualIntro: 'See six service formats branching from one menu and the occasion each serves.',
    imageAlt: 'Casemate map of six coffeehouse service formats and consumption occasions',
    keyTerms: [
      { term: 'Consumption occasion', definition: 'The situation in which a product is bought and used.' },
      { term: 'Dwell time', definition: 'How long a customer stays in the store.' },
      { term: 'Drive-through', definition: 'A service lane where customers order and collect from a vehicle.' },
      { term: 'Throughput', definition: 'The number of orders a store can complete in a given time.' },
    ],
    recap: [
      'A format is a bet on an occasion.',
      'Each format needs different space, staffing and menu.',
      'Study cafés turn few drinks into long stays; takeaway turns many into short ones.',
      'Operators earn more when format and price match the occasion.',
    ],
    chapterRecap: 'Service formats turn occasions into store designs. The most profitable operators pick the occasions they can serve best and design space, staff, menu and price around them.',
    deepDiveTitle: 'Why long stays and fast stays need different prices',
    body: <C3DeepDive paragraphs={[
      'A seat is a scarce resource. If one drink buys three hours of seat, the café earns little per hour; if the same seat serves six takeaway customers, revenue per hour is much higher.',
      'Some operators answer by adding food, minimum spend or paid work zones. Others choose formats with fewer seats, so the store sells speed rather than space.' ]} evidence="Student visit frequency and spend are from interviews reported by VietNamNet; the drive-through is from VietnamBiz; E-Coffee formats are from The Investor; trend rankings are from the iPOS.vn report; delivery data are from Momentum Works reported by VnExpress. The seat-revenue reasoning is an illustration, not a measured result." />,
    sources: citeC3('studentCafes', 'vietnambizChains', 'investorEcoffee', 'iposH12026', 'vnexpressDelivery'),
  }),
  c3Chapter({
    title: 'Price Positioning and Differentiation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how price positioning and differentiation work together and what happens when they fall out of line.',
    mateIntro: 'A price tells customers what to expect. If the cup does not match the price, customers notice quickly.',
    keyInsight: 'Price positioning only holds when it is supported by a visible difference in product, experience or brand. A chain that charges a premium without a clear reason invites discounting, while a chain with a clear difference can defend price even when costs rise.',
    statTiles: [
      { value: '6', label: 'Positioning dimensions', subtitle: 'Price to experience', description: 'Price level, product quality, experience, brand, convenience and value perception.' },
      { value: 'VND 90K', label: 'Starbucks medium drink in Vietnam in 2023', subtitle: 'BBC News', description: 'Set against an average wage of about US$345 a month cited in the same article.' },
      { value: '10–20%', label: 'Menu price rises at cafés in early 2025', subtitle: 'VTV report', description: 'A response to higher bean costs.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The BBC price and wage are from a 2023 article and are not current menu prices; the price rises are a television news report.',
    narrative: [
      { label: 'What it is', text: 'Price positioning is where a brand places itself on the price ladder, from street-stall prices to premium. Differentiation is what justifies that position: product quality, ambience, brand, convenience, service or a unique offer.' },
      { label: 'Why it is happening', text: 'Customers compare brands quickly, especially on mobile apps, and a premium that is not visible disappears. Costs also move: when beans, rent or wages rise, operators must choose between raising prices, shrinking portions or absorbing the cost.' },
      { label: 'Real-world example', text: 'A premium chain defends a high price through store design, service and exclusivity, while a value chain keeps prices low through small formats and a tight menu. A brand in the middle needs a clear reason to be there or customers drift both ways.' },
      { label: 'Vietnam example', text: 'BBC reporting in 2023 put a Starbucks medium drink near VND 90,000 against an average wage of about US$345 a month, and described Highlands starting as a luxury chain before cutting prices to reach more customers. In early 2025 VTV reported café price rises of 10–20% after bean costs rose, while some shops held prices and widened menus instead. An operator example reported by VnExpress puts a VND 25,000 coffee at the mass-market end. Starbucks Reserve at Bitexco, opened in April 2025, shows a premium positioning built on a landmark setting.' },
      { label: 'Business impact', text: 'Positioning drives margin, traffic and how exposed a brand is to cost shocks. Brands that can explain their price through a visible difference defend margin; those that cannot rely on promotions.' },
    ],
    visualKind: 'coffee-m3-23-price', visualHeading: 'Illustrative price and experience positions',
    visualIntro: 'Place five formats by price and by experience premium and note where the middle gets crowded.',
    imageAlt: 'Casemate matrix of coffeehouse price positioning against experience premium',
    keyTerms: [
      { term: 'Price positioning', definition: 'The price level a brand chooses relative to competitors.' },
      { term: 'Differentiation', definition: 'What makes a brand’s offer different in a way customers value.' },
      { term: 'Premiumisation', definition: 'Moving products or brands to higher quality and price tiers.' },
      { term: 'Value perception', definition: 'The customer’s sense of whether the price matches what they get.' },
    ],
    recap: [
      'Price tells customers what to expect.',
      'A premium only lasts with a visible reason behind it.',
      'Cost rises force a choice between price, portion and margin.',
      'In Vietnam, Highlands moved from luxury to lower prices, while others held prices and widened menus.',
    ],
    chapterRecap: 'Price and difference must move together. Brands that make their premium visible defend margin; those that do not end up competing on discounts.',
    deepDiveTitle: 'Why the middle of the price ladder is the hardest place to stand',
    body: <C3DeepDive paragraphs={[
      'A cheap kiosk wins on price and a premium café wins on experience. A brand in the middle has to beat the kiosk on quality and the premium café on price, and customers can compare both on a phone.',
      'The matrix is illustrative: it shows how to reason about positions, and each operator should map its own competitors with real prices.' ]} evidence="Prices and wages are from BBC News in 2023; Highlands’ shift from luxury to lower prices is described by the BBC; price rises are from a VTV report in March 2025; the cup example is an operator illustration in VnExpress; the Bitexco opening is from Vietstock. Matrix positions are illustrative and not measured." />,
    sources: citeC3('bbcStarbucks', 'vtvCoffeePrices', 'vnexpressCupCost', 'vietstockDrinks'),
  }),
];

const quiz = c3Quiz('coffee-m3-l2', [
  { chapter: '1', objective: 'State the role of menu architecture', question: 'What does menu architecture decide?', application: 'A chain wants a higher bill without raising prices. What should it design?', correct: 'What customers notice, what they add and what each visit is worth', wrong: ['Only the store colour', 'Only the supplier list', 'Only the opening hours'], explanation: 'It is a sales plan. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the receipt mix', question: 'What share of the 200 sampled receipts were drink only?', application: 'An analyst assumes most customers buy food. What does the sample show?', correct: '77%', wrong: ['18.5%', '4.5%', '100%'], explanation: 'Drink plus food was 18.5%. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply the caveat', question: 'Why should the receipt figures be treated as indicative?', application: 'A manager wants to cite the 77%. What should be added?', correct: 'The sample is only 200 receipts', wrong: ['They are audited', 'They cover every café', 'They are official statistics'], explanation: 'Small samples limit conclusions. Review Chapter 1.' },
  { chapter: '2', objective: 'Define a format', question: 'What is a service format a bet on?', application: 'A brand opens a drive-through. What is it betting on?', correct: 'A particular consumption occasion', wrong: ['Only a lower rent', 'Only a new logo', 'Only more staff'], explanation: 'Format follows occasion. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall student behaviour', question: 'How often did interviewed students visit cafés?', application: 'A founder plans a study café. What visit frequency did interviews show?', correct: 'Two to four times a week', wrong: ['Once a year', 'Never', 'Only at weekends'], explanation: 'Interviews are not a survey. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare occasions', question: 'Why do long-stay and fast-stay formats need different pricing?', application: 'One drink buys three hours of seat. What happens to revenue per hour?', correct: 'Seat time is scarce, so long stays earn less per hour unless priced or supplemented', wrong: ['Seats are unlimited', 'Time is free', 'Revenue is always equal'], explanation: 'Seats are a scarce resource. Review Chapter 2.' },
  { chapter: '3', objective: 'State the positioning rule', question: 'When does price positioning hold?', application: 'A chain charges a premium. What must back it?', correct: 'When a visible difference in product, experience or brand supports it', wrong: ['When it is the highest on the market', 'When it is hidden', 'When it changes weekly'], explanation: 'Price must match perceived value. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the BBC example', question: 'What did the BBC report about Highlands’ early pricing?', application: 'A case study asks about Highlands’ path. What happened?', correct: 'It started as a luxury chain and later cut prices', wrong: ['It always sold at street prices', 'It never changed prices', 'It started as a delivery-only brand'], explanation: 'Positioning can shift. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the price-rise report', question: 'By how much did VTV report some cafés raised prices in early 2025?', application: 'A shop owner asks what peers did. What range was reported?', correct: '10–20%', wrong: ['0.1%', '200%', '500%'], explanation: 'Some held prices instead. Review Chapter 3.' },
  { chapter: '3', objective: 'Read the matrix', question: 'Why are the matrix positions described as illustrative?', application: 'A student quotes the coordinates as data. What should be said?', correct: 'They show how to reason about positions and are not measured values', wrong: ['They are audited prices', 'They are government statistics', 'They are share-of-market data'], explanation: 'Check the note under the visual. Review Chapter 3.' },
]);

export const LESSON_C3_2: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how menu architecture, service formats and price positioning shape what a coffeehouse sells and to whom.',
    keyTakeaways: [
      'The menu is a sales plan: drinks bring traffic, food and add-ons lift ticket.',
      'Most sampled Vietnam receipts were drink only, so attach rate is a key lever.',
      'Each service format is a bet on a consumption occasion.',
      'Seat time is scarce, so long stays and fast stays need different pricing.',
      'A price premium needs a visible difference behind it.',
    ],
    businessImplications: 'Design menu, format and price together around the occasions you can serve best, and measure attach rate and ticket.',
    remember: 'A price is only as strong as the difference behind it.',
    nextLesson: 'Customer Segments & Needs',
  },
};
