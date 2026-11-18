import { C1DeepDive, citeC1, c1Chapter, c1Quiz } from './coffeeM1Core';
import type { CoffeeM1LessonBundle } from './coffeeM1Core';

const LESSON = '2. Industry History & Development';

const deck = [
  c1Chapter({
    title: 'Evolution of Coffeehouses and Modern Café Culture', chapterTitle: LESSON, readingTime: '7',
    objective: 'Trace how the coffeehouse moved from a social meeting place to a multi-purpose consumption space.',
    mateIntro: 'Long before chains, coffeehouses were places to talk. Today they are also workplaces, social venues and lifestyle brands.',
    keyInsight: 'The coffeehouse has evolved from a primarily product-centered venue into a multi-purpose consumption space. Consumers may visit for the beverage itself, but also for convenience, social connection, work, leisure, and brand experience.',
    statTiles: [
      { value: '5', label: 'Key stages in coffeehouse evolution', subtitle: 'Traditional coffee culture to premiumization', description: 'Traditional coffee culture, branded café development, the specialty coffee movement, lifestyle positioning and premiumization.' },
      { value: '1554–55', label: 'Years an Ottoman historian dates the first Istanbul coffeehouses', subtitle: 'Early Ottoman account', description: 'Described as meeting places for conversation, literature and games.' },
      { value: '~3,000', label: 'Estimated coffeehouses in England by 1675', subtitle: 'British Museum guide', description: 'After the first London coffeehouse opened in 1652.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the dates and the 3,000 figure come from historical accounts and estimates and are indicative.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouses have historically served as places for beverage consumption, social interaction, discussion, and cultural exchange. Over time, the format evolved from traditional coffee-serving establishments into modern cafés that combine beverages, food, retail design, and lifestyle experiences.' },
      { label: 'Why it is happening', text: 'The development of modern coffeehouse retail has been influenced by urbanization, rising disposable incomes, changing work patterns, global travel, and the spread of standardized café brands. Coffee has increasingly become both a daily consumption habit and a product associated with identity and lifestyle.' },
      { label: 'Real-world example', text: 'Traditional neighbourhood cafés keep local brewing methods and social rituals; branded chains standardise menus, design and service across sites; specialty roasters focus on bean origin, roasting and brewing; lifestyle cafés design for ambience and working or meeting; and premium operators charge more for distinctive ingredients, craft and experience.' },
      { label: 'Vietnam example', text: 'French missionaries introduced coffee to Vietnam in 1857 and Robusta now makes up about 97% of Vietnamese production, so the habit is long-standing and family-run sidewalk cafés are part of everyday life. Highlands Coffee opened its first shop in 2002 and began as a premium chain before cutting prices, while Starbucks has stayed small in a market with strong local coffee habits. In the first half of 2026 the iPOS.vn survey named the multi-purpose café, where customers can work and meet, as a leading beverage trend.' },
      { label: 'Business impact', text: 'Coffeehouse development reflects a shift from basic beverage consumption toward a combination of product quality, convenience, social experience, and lifestyle positioning.' },
    ],
    visualKind: 'coffee-m1-21-evolution', visualHeading: 'Five stages in the coffeehouse’s evolution',
    visualIntro: 'Follow five stages and see what each one added to the café proposition.',
    imageAlt: 'Casemate five-step flow of the evolution of coffeehouses and modern café culture',
    keyTerms: [
      { term: 'Specialty coffee', definition: 'Coffee valued for origin, roasting, brewing and sensory quality.' },
      { term: 'Lifestyle positioning', definition: 'Designing a café around ambience, aesthetics and the customer’s way of living.' },
      { term: 'Premiumisation', definition: 'Customers paying more for differentiated ingredients, craft or experience.' },
      { term: 'Third place', definition: 'A venue other than home or work where people meet and spend time.' },
    ],
    recap: [
      'Coffeehouses began as places for conversation and exchange.',
      'Modern cafés add food, design and lifestyle experiences.',
      'Urbanisation, incomes and work patterns shaped the format.',
      'Customers now visit for convenience, connection, work and brand.',
    ],
    chapterRecap: 'Coffeehouse development reflects a shift from basic beverage consumption toward a combination of product quality, convenience, social experience, and lifestyle positioning.',
    deepDiveTitle: 'Why the stages are layers, not replacements',
    body: <C1DeepDive paragraphs={[
      'A traditional sidewalk café, a branded chain, a specialty roaster and a lifestyle café can all exist on the same street, serving different needs. Each new stage added options without removing the earlier ones.',
      'That is why the industry is so varied, and why a single store format rarely fits every customer.' ]} evidence="The five stages are described in the supplied material. Historical dates are from an Ottoman historian quoted in an academic paper and a British Museum exhibition guide; Vietnamese history is from International Coffee Organization and Columbia Business School sources, a secondary encyclopedia entry for Highlands, and a BBC report; the wave descriptions are from a secondary overview." />,
    sources: citeC1('kafadarCoffee', 'britishMuseumCoffee', 'coffeeWavesOverview', 'icoVietnam', 'columbiaTrungNguyen', 'highlandsProfile', 'bbcStarbucks', 'iposH12026'),
  }),
  c1Chapter({
    title: 'Development of Organized Foodservice Retail', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how standardisation, central buying and technology let chains scale, and what they must protect as they grow.',
    mateIntro: 'A good café can be run by instinct. A thousand stores cannot. Organised foodservice grew by turning know-how into systems.',
    keyInsight: 'The shift toward organized foodservice creates competitive advantages for operators that can standardize execution without losing relevance to local tastes. Scale can improve procurement and brand visibility, but it also increases the complexity of managing people, locations, and service quality.',
    statTiles: [
      { value: '5', label: 'Key stages of organised foodservice', subtitle: 'Standardised operations to brand management', description: 'Standardized operations, centralized procurement, chain expansion, operational technology and brand management.' },
      { value: '80 → 985', label: 'Highlands Coffee shops in 2009 and at the end of 2025', subtitle: 'Company history and Jollibee report', description: 'A chain growing from a few cities to a national network.' },
      { value: '3', label: 'Cafés Trung Nguyên opened in each cluster from 1998', subtitle: 'Columbia Business School case', description: 'Clusters let managers keep control of design, service and quality.' },
    ],
    statsNote: 'The first tile is a count from this lesson; Highlands’ 2009 count is from a secondary company-history source and its 2025 count from a parent-company report as reported by the press.',
    narrative: [
      { label: 'What it is', text: 'Foodservice retail has gradually moved from fragmented independent operators toward more organized business models characterized by standardized recipes, centralized procurement, formal training, and structured quality control. Chain operators have used these capabilities to expand across locations while maintaining a recognizable customer proposition.' },
      { label: 'Why it is happening', text: 'Technology and modern retail management have further transformed operations. Point-of-sale systems, inventory software, delivery aggregators, and customer databases allow operators to coordinate demand, staffing, pricing, and promotions more systematically.' },
      { label: 'Real-world example', text: 'A chain writes down recipes, preparation steps, service protocols and training; buys ingredients centrally for consistency and supplier terms; replicates a store format across neighbourhoods and cities; links point of sale, inventory, labour scheduling and sales reports; and applies one visual identity, product standard and promotional campaign.' },
      { label: 'Vietnam example', text: 'Trung Nguyên opened cafés in clusters of three from 1998 to keep control while it advertised its brand, and Highlands Coffee grew from 80 shops in six cities in 2009 to 985 stores at the end of 2025 after Jollibee bought 50% in 2012. In 2025 Highlands opened a roasting plant reported at VND 500 billion near the Cai Mep port, added the first drive-through format and kept opening more than 100 stores a year, while a Vietnamese survey found 57.11% of F&B operators worried about e-invoicing and standardised tax rules.' },
      { label: 'Business impact', text: 'Organized foodservice retail has developed through standardization, technology, and chain expansion. These capabilities support scale but require strong systems to preserve service quality and local-market fit.' },
    ],
    visualKind: 'coffee-m1-22-organised', visualHeading: 'Five layers of organised foodservice retail',
    visualIntro: 'Climb from standardised operations at the base to brand management at the top.',
    imageAlt: 'Casemate pyramid of five layers of organised foodservice retail',
    keyTerms: [
      { term: 'Standardised operations', definition: 'Documented recipes, procedures, service protocols and training.' },
      { term: 'Centralised procurement', definition: 'Buying ingredients for all stores through one function.' },
      { term: 'Point of sale (POS)', definition: 'The system that records transactions and often links to stock and reports.' },
      { term: 'Local-market fit', definition: 'How well a menu and format suit local tastes.' },
    ],
    recap: [
      'Foodservice moved from fragmented independents to organised chains.',
      'Standard recipes, central buying and training support consistency.',
      'Technology coordinates demand, staffing, pricing and promotions.',
      'Scale adds complexity in people, sites and quality.',
    ],
    chapterRecap: 'Organized foodservice retail has developed through standardization, technology, and chain expansion. These capabilities support scale but require strong systems to preserve service quality and local-market fit.',
    deepDiveTitle: 'Standardising without losing local appeal',
    body: <C1DeepDive paragraphs={[
      'A fixed menu and recipe make a drink taste the same in every store. But if the menu ignores local tastes, customers may still choose a neighbourhood rival.',
      'Chains therefore standardise the core and test local variations, such as seasonal or regional drinks, on a small scale first.' ]} evidence="The five stages are described in the supplied material. Trung Nguyên details are from a Columbia Business School case; Highlands figures are from a secondary company profile, VietnamBiz and VietnamPlus; the e-invoicing concern is from the iPOS.vn and Nestlé Professional survey as reported by VCCI." />,
    sources: citeC1('columbiaTrungNguyen', 'highlandsProfile', 'vietnambizChains', 'vietnamplusRegional', 'vcciFnbEnglish'),
  }),
  c1Chapter({
    title: 'Digitalization and the Omnichannel Shift', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how digital channels change discovery, ordering and economics, and why they do not automatically raise profit.',
    mateIntro: 'Customers now find a café on a map, order on an app and pay on a phone. Each step creates sales and a cost.',
    keyInsight: 'Digital channels create growth opportunities, but they do not automatically improve profitability. Operators must assess the incremental demand they generate against commissions, discounts, technology costs, packaging expenses, and operational complexity.',
    statTiles: [
      { value: '5', label: 'Key digital activities', subtitle: 'Online discovery to data-driven operations', description: 'Online discovery, mobile ordering, delivery integration, digital loyalty and data-driven operations.' },
      { value: 'US$2.1B', label: 'Value of online food delivery in Vietnam in 2025', subtitle: 'Momentum Works, up 19%', description: 'Counts completed orders placed through delivery apps only.' },
      { value: '48% / 48%', label: 'Shares of ShopeeFood and GrabFood in 2025', subtitle: 'Momentum Works', description: 'Two platforms dominate the measured market.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the delivery figures are a regional research firm’s estimate that excludes orders placed directly with restaurants.',
    narrative: [
      { label: 'What it is', text: 'Digitalization has expanded the ways customers discover, order, pay for, and receive food and beverages. Mobile ordering, digital loyalty programs, cashless payments, social media marketing, and third-party delivery have become important elements of the modern foodservice experience.' },
      { label: 'Why it is happening', text: 'The digital shift also changes the relationship between stores and customers. Sales increasingly occur through multiple touchpoints, while digital platforms influence visibility, customer acquisition costs, transaction data, and the distribution of revenue between operators and intermediaries.' },
      { label: 'Real-world example', text: 'A café attracts new customers through search, maps, social media and creator content; lets customers order before arriving; uses marketplaces or its own delivery to reach further; rewards repeat purchases with points, memberships and stored value; and analyses transactions to adjust menus, promotions, staffing and stock.' },
      { label: 'Vietnam example', text: 'Vietnam’s online food delivery reached US$2.1 billion in 2025, up 19%, with ShopeeFood and GrabFood at 48% each and beFood at 4%, after Baemin left in December 2023, Gojek in September 2024 and Loship by the end of 2024, and as Xanh SM Ngon entered in June 2025. Restaurants report commissions of 20–30% per order, ShopeeFood promoted a VND 39,000 solo-meal collection, and Highlands opened the first drive-through coffee store.' },
      { label: 'Business impact', text: 'Digitalization has transformed foodservice discovery and fulfillment. The strongest models integrate digital convenience with efficient store operations and a customer relationship that remains valuable beyond paid platform traffic.' },
    ],
    visualKind: 'coffee-m1-23-digital', visualHeading: 'Five digital channels and what each must prove',
    visualIntro: 'See five digital channels on two sides of the centre and the test each one must pass.',
    imageAlt: 'Casemate sides mind map of five digital channels in foodservice and the test each must pass',
    keyTerms: [
      { term: 'Omnichannel', definition: 'Linking stores, apps, delivery and social media into one customer experience.' },
      { term: 'Commission', definition: 'The share of each order that a delivery platform keeps.' },
      { term: 'Digital loyalty', definition: 'Points, memberships and offers delivered through an app.' },
      { term: 'Incremental demand', definition: 'Sales that would not have happened without a channel.' },
    ],
    recap: [
      'Digital tools change discovery, ordering, payment and delivery.',
      'Platforms influence visibility, customer cost, data and revenue split.',
      'Growth through a channel does not equal profit.',
      'Own the customer relationship beyond paid platform traffic.',
    ],
    chapterRecap: 'Digitalization has transformed foodservice discovery and fulfillment. The strongest models integrate digital convenience with efficient store operations and a customer relationship that remains valuable beyond paid platform traffic.',
    deepDiveTitle: 'Is a delivery order really extra demand?',
    body: <C1DeepDive paragraphs={[
      'If a delivery customer would otherwise have walked into the store, the platform commission is a cost on a sale the operator already had. If the customer lives too far to visit, the order is genuinely new.',
      'Comparing delivery orders with and without the platform, and counting packaging and discounts, shows whether the channel adds profit.' ]} evidence="The five activities are described in the supplied material. Delivery figures are from Momentum Works data as reported by VnExpress and VCCI; commission ranges are from a Tuoi Tre report of restaurant complaints; the drive-through item is from VietnamBiz." />,
    sources: citeC1('vnexpressDelivery', 'vcciDelivery', 'tuoitreDelivery', 'vietnambizChains'),
  }),
];

const quiz = c1Quiz('coffee-m1-l2', [
  { chapter: '1', objective: 'State how the coffeehouse has evolved', question: 'How has the coffeehouse evolved?', application: 'A founder thinks customers only come for the drink. What does the chapter say?', correct: 'From a product-centred venue into a multi-purpose consumption space', wrong: ['From a multi-purpose space into a kiosk', 'From a café into a farm', 'It has not changed'], explanation: 'Visits serve many purposes. Review Chapter 1.' },
  { chapter: '1', objective: 'List visit motives', question: 'Beyond the beverage, why may consumers visit a café?', application: 'A customer stays two hours with a laptop. Which motive is that?', correct: 'Convenience, social connection, work, leisure and brand experience', wrong: ['Only to buy beans', 'Only to avoid cooking', 'Only for discounts'], explanation: 'Experience adds value. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall a Vietnam fact', question: 'Who introduced coffee to Vietnam in 1857?', application: 'A guide explains local coffee history. Who brought it?', correct: 'French missionaries', wrong: ['Japanese traders', 'American chains', 'British merchants'], explanation: 'Coffee has a long local history. Review Chapter 1.' },
  { chapter: '2', objective: 'State the advantage of organisation', question: 'What advantage does organised foodservice give?', application: 'A chain wants to grow while staying relevant. What must it do?', correct: 'Standardise execution without losing relevance to local tastes', wrong: ['Ignore local tastes', 'Remove all training', 'Stop buying centrally'], explanation: 'Standardise and adapt. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a scale risk', question: 'What does scale increase?', application: 'A chain doubles its stores. What gets harder?', correct: 'The complexity of managing people, locations and service quality', wrong: ['Nothing changes', 'Fewer staff are needed', 'Recipes become irrelevant'], explanation: 'Systems must keep up. Review Chapter 2.' },
  { chapter: '2', objective: 'Define centralised procurement', question: 'What does centralised procurement mean?', application: 'A chain buys milk for all stores in one contract. What is that called?', correct: 'Consolidating ingredient purchasing to improve consistency and supplier negotiation', wrong: ['Each store buys alone', 'Only customers buy', 'Buying only online'], explanation: 'One buyer, many stores. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Highlands’ growth', question: 'About how many Highlands stores were reported at the end of 2025?', application: 'A student sizes the chain. What is the figure?', correct: '985', wrong: ['85', '9,850', '25'], explanation: 'Highlands scaled steadily. Review Chapter 2.' },
  { chapter: '3', objective: 'State the digital caution', question: 'What must operators assess about digital channels?', application: 'Delivery orders are rising. What should the owner check?', correct: 'The incremental demand against commissions, discounts, technology costs, packaging and complexity', wrong: ['Only the order count', 'Only the app design', 'Nothing'], explanation: 'Growth is not profit. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall delivery share', question: 'What shares did ShopeeFood and GrabFood hold of measured delivery in 2025?', application: 'An analyst describes the delivery market. What is the structure?', correct: '48% each, a near-duopoly', wrong: ['10% each', '90% and 10%', '1% and 99%'], explanation: 'Two platforms dominate. Review Chapter 3.' },
  { chapter: '3', objective: 'Define digital loyalty value', question: 'What should the customer relationship remain valuable beyond?', application: 'A brand relies on platform traffic. What is safer?', correct: 'Paid platform traffic', wrong: ['Store design', 'Staff training', 'Menu printing'], explanation: 'Own the relationship. Review Chapter 3.' },
]);

export const LESSON_C1_2: CoffeeM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can trace how the coffeehouse became a multi-purpose space, how foodservice became organised, and how digital channels reshaped discovery and ordering.',
    keyTakeaways: [
      'The coffeehouse moved from product-centred to multi-purpose.',
      'The stages are layers, and all coexist today.',
      'Standardisation supports scale but adds complexity.',
      'Standardise the core and keep local fit.',
      'Digital channels add reach, not automatic profit.',
    ],
    businessImplications: 'Build systems before scale, adapt to local taste, and judge every channel by the profit it adds.',
    remember: 'Scale needs systems; channels need arithmetic.',
    nextLesson: 'How the Global Market Is Structured',
  },
};
