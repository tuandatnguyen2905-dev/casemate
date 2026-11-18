import { F4DeepDive, citeF4, f4Chapter, f4Quiz } from './fashionM4Core';
import type { FashionM4LessonBundle } from './fashionM4Core';

const LESSON = '1. Industry Competition Structure';

const deck = [
  f4Chapter({
    title: 'Types of Competition', chapterTitle: LESSON, readingTime: '6',
    objective: 'Distinguish direct, indirect, cross-category and channel competition and explain why mapping only direct rivals leaves blind spots.',
    mateIntro: 'Ask a brand who its competitors are and it will name two or three labels. Ask a customer and the answer is different: the other brand, the other category, or simply the other app. Competition is wider than the shelf next to yours.',
    keyInsight: 'Competition is multidimensional. Brands must understand both their direct competitors and alternative businesses that satisfy similar customer needs.',
    statTiles: [
      { value: '4', label: 'Types of competition', subtitle: 'Direct, indirect, cross-category, channel', description: 'Each type puts pressure on a brand from a different direction.' },
      { value: '55% / 42%', label: 'Shopee and TikTok Shop share of platform revenue, H1 2025', description: 'Across the four main Vietnamese platforms and all categories, which shows channels competing for the same shopper.' },
      { value: '+148%', label: 'TikTok Shop revenue growth, H1 2025', subtitle: 'Year on year', description: 'The only one of the four main platforms with growth at this scale, in all categories.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the platform figures come from YouNet ECI research for the first half of 2025, cover all categories and are not specific to fashion.',
    narrative: [
      { label: 'What it is', text: 'Competition in Fashion, Sports & Lifestyle Retail takes place between brands offering similar products, businesses targeting overlapping consumer needs, and retailers competing for consumer spending. Pressure extends beyond product features to pricing, brand identity, customer experience and distribution. As product categories overlap, sportswear brands compete with fashion labels in athleisure and streetwear, while online retailers compete with physical stores through convenience, availability and pricing.' },
      { label: 'Why it is happening', text: 'Customers do not shop by industry category. They shop by need and budget, so any business that satisfies the same need is a competitor, whether or not it sells the same product. Overlapping categories and new channels make the set of alternatives larger than most brands track.' },
      { label: 'Real-world example', text: 'Nike and Adidas are direct competitors in sportswear, competing through product innovation, endorsements and brand positioning. Indirect competition appears when consumers choose between sportswear, casual fashion and other lifestyle products according to need and budget. Cross-category competition arises when athleisure brands compete with traditional fashion retailers for everyday apparel spending. Channel competition occurs when physical stores, brand websites and online marketplaces compete for customer attention and purchases.' },
      { label: 'Vietnam example', text: 'In the first half of 2025, YouNet ECI reported that Shopee held 55% and TikTok Shop 42% of revenue across Vietnam’s four main e-commerce platforms, with TikTok Shop growing 148% in the half-year. Cimigo’s reading of the same data found Gen Z favouring entertainment-led TikTok Shop and Millennials leaning toward Shopee. Platforms are therefore competing as channels for the same fashion shopper, alongside the brands that sell on them.' },
      { label: 'Business impact', text: 'Understanding the different types of competition helps a business identify its relevant competitors, anticipate market pressure and develop more effective positioning. A competitor list built only from direct rivals misses the substitutes and channels that may take the customer first.' },
    ],
    visualKind: 'fashion-m4-11-types', visualHeading: 'Four ways a brand can lose a customer',
    visualIntro: 'See each type of competition with an example and what to watch for.',
    imageAlt: 'Casemate cards of direct, indirect, cross-category and channel competition with examples',
    keyTerms: [
      { term: 'Direct competition', definition: 'Rivalry between brands that sell similar products to the same customers.' },
      { term: 'Indirect competition', definition: 'Rivalry from different products that satisfy a similar need or compete for the same budget.' },
      { term: 'Cross-category competition', definition: 'Rivalry between businesses from different categories that overlap, such as athleisure and traditional fashion.' },
      { term: 'Channel competition', definition: 'Rivalry between ways of selling, such as stores, brand websites and marketplaces.' },
    ],
    recap: [
      'Competition comes from direct rivals, indirect substitutes, other categories and other channels.',
      'Customers choose by need and budget, not by industry label.',
      'Overlapping categories make the set of alternatives larger.',
      'Map competitors by the customer need they satisfy.',
    ],
    chapterRecap: 'Understanding different types of competition helps businesses identify their relevant competitors, anticipate market pressure, and develop more effective positioning strategies.',
    deepDiveTitle: 'Why a competitor list should start from the customer',
    body: <F4DeepDive paragraphs={[
      'A list that starts from your own product category will name the brands you already watch. A list that starts from the customer’s need, such as something to wear for exercise and for the office, will also name labels and channels you do not.',
      'The practical test is to ask where a customer would go if your product were unavailable. The answers include other brands, other categories and other channels, and each one calls for a different response in range, price or distribution.',
    ]} evidence="The four types of competition are described qualitatively in the supplied material. The platform shares are YouNet ECI figures for the first half of 2025 covering four platforms and all categories, and the generational preferences are from Cimigo’s reading of the same research." />,
    sources: citeF4('bofStateOfFashion', 'younetEciPlatforms', 'cimigoEcommerce'),
  }),
  f4Chapter({
    title: 'Competitive Intensity and Market Dynamics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify the main sources of competitive pressure and explain why differentiation and cost discipline matter together.',
    mateIntro: 'When a new style, a price comparison and a new seller are all one tap away, pressure comes from every side at once. The question is not whether competition is intense but where the pressure lands on your segment.',
    keyInsight: 'High competitive intensity makes differentiation and cost discipline equally important. Businesses that rely only on discounts may attract short-term demand but risk weakening margins and brand perception.',
    statTiles: [
      { value: '5', label: 'Sources of pressure', subtitle: 'Price, product, marketing, speed, digital', description: 'Price competition, product differentiation, marketing, speed to market and digital price transparency.' },
      { value: '−32.1%', label: 'Shopee sellers with revenue, H1 2025', subtitle: 'Year on year', description: 'YouNet ECI linked the fall to rising platform fees; the figure covers all categories.' },
      { value: '7,500+', label: 'Fewer sellers with revenue on four platforms', subtitle: 'H1 2025 versus H1 2024', description: 'Revenue is increasingly concentrated among brands that operate professionally.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the seller figures come from YouNet ECI for the first half of 2025 and cover all categories on Shopee, TikTok Shop, Lazada and Tiki.',
    narrative: [
      { label: 'What it is', text: 'Competitive intensity reflects the pressure a business faces from existing competitors, new entrants, substitute products and changing consumer expectations. In Fashion, Sports & Lifestyle Retail it is heightened by relatively frequent product launches, changing trends, digital price comparison and the accessibility of online selling channels. It varies by segment: luxury brands may compete through exclusivity and heritage, while mass-market retailers face stronger pressure on price, availability and operating efficiency.' },
      { label: 'Why it is happening', text: 'Low barriers to online selling and easy price comparison mean any product can be benchmarked in seconds, and trends change quickly enough to date a range within weeks. Each source of pressure pushes businesses toward discounts, faster launches or heavier marketing, which raises cost for everyone.' },
      { label: 'Real-world example', text: 'Retailers use promotions, seasonal sales and loyalty discounts to attract price-sensitive customers, while brands invest in distinctive design, technical features, materials and quality. Companies compete through advertising, celebrity partnerships, athlete endorsements and social media. Fashion retailers improve product development and replenishment to respond to changing trends, and online platforms increase price transparency so customers can compare alternatives easily.' },
      { label: 'Vietnam example', text: 'YouNet ECI reported that the four main platforms generated VND 222.1 trillion in the first half of 2025, up 23%, yet more than 7,500 fewer sellers earned revenue, with Shopee sellers with revenue down 32.1% as platform fees rose. Revenue is concentrating among professionally run brands, and Gen Z shoppers favouring discounts of over 30% show how promotion shapes the competition.' },
      { label: 'Business impact', text: 'Competitive intensity influences pricing, marketing investment, product development and profitability. Businesses that identify the sources of pressure most relevant to their segment can respond with a mix of differentiation and cost discipline instead of defaulting to discounts.' },
    ],
    visualKind: 'fashion-m4-12-intensity', visualHeading: 'Five sources of competitive pressure',
    visualIntro: 'Compare how each source of pressure shows up and what a sound response looks like.',
    imageAlt: 'Casemate table of five sources of competitive pressure and the response to each',
    keyTerms: [
      { term: 'Competitive intensity', definition: 'The degree of pressure a business faces from rivals, entrants, substitutes and changing expectations.' },
      { term: 'Price transparency', definition: 'How easily customers can compare prices across sellers and platforms.' },
      { term: 'Speed to market', definition: 'How quickly a business turns a trend into products available to buy.' },
      { term: 'Differentiation', definition: 'Giving customers a reason to choose you beyond price.' },
    ],
    recap: [
      'Pressure comes from price, product, marketing, speed and digital transparency.',
      'Intensity varies by segment: luxury competes on exclusivity, mass market on price and availability.',
      'Discounts alone attract short-term demand and risk margin and brand perception.',
      'Differentiation and cost discipline matter together.',
    ],
    chapterRecap: 'Competitive intensity influences pricing, marketing investment, product development, and profitability. Businesses need to identify the sources of competitive pressure most relevant to their market segment.',
    deepDiveTitle: 'Why discounting is a defence, not a strategy',
    body: <F4DeepDive paragraphs={[
      'A discount answers a rival’s price immediately, which is why it is the most common response to pressure. Because rivals can match it just as quickly, the gain is short and the cost, in margin and in what customers think the product is worth, stays.',
      'Businesses that hold up under intensity pair a reason to buy, such as design, performance or service, with cost discipline that lets them price sensibly. Either one alone is fragile: a distinctive product with a heavy cost base, or a cheap product with no reason to prefer it.',
    ]} evidence="The pressure sources are described qualitatively in the supplied material. The seller counts are YouNet ECI figures for the first half of 2025 across four platforms and all categories, and the platform-fee explanation is YouNet’s, not a measured cause." />,
    sources: citeF4('bofStateOfFashion', 'younetGrowthRanking', 'cimigoEcommerce'),
  }),
  f4Chapter({
    title: 'Competition Across Market Segments', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why competitors should be judged within a segment and name what each segment competes on.',
    mateIntro: 'You would not judge a luxury house and a value retailer by the same scorecard. Each segment rewards a different strength, and the competitors that matter are the ones fighting for the same customer.',
    keyInsight: 'A brand’s competitive strategy must align with the expectations of its target segment. Competing outside that positioning without a clear value proposition can weaken brand identity and reduce customer loyalty.',
    statTiles: [
      { value: '283', label: 'Yody stores', subtitle: 'Vietnamese mass-market chain, March 2025', description: 'A domestic chain with a dense national network in the affordable apparel segment.' },
      { value: '29', label: 'Uniqlo stores', subtitle: 'International functional essentials, March 2025', description: 'A smaller network built around everyday functional apparel.' },
      { value: '3', label: 'Zara stores', subtitle: 'International trend-led fashion, March 2025', description: 'A small presence in Vietnam compared with the domestic mass-market chains.' },
    ],
    statsNote: 'Store counts come from a desktop survey by Q&Me Vietnam as of March 2025; they show network scale only and say nothing about sales, profit or market share.',
    narrative: [
      { label: 'What it is', text: 'Fashion, Sports & Lifestyle Retail consists of segments differentiated by price, product functionality, customer expectations and brand positioning, each with distinct competitive priorities. Luxury and premium brands emphasise exclusivity and perceived value; mass-market retailers prioritise affordability and accessibility; sportswear specialists compete through performance and technical innovation; lifestyle brands focus on design, identity and everyday usability.' },
      { label: 'Why it is happening', text: 'Customers in different segments value different things, so the capabilities that win in one segment can be irrelevant or even harmful in another. A premium brand that discounts heavily, or a value retailer that chases exclusivity, sends a mixed message and loses the customers it was built for.' },
      { label: 'Real-world example', text: 'In luxury and premium, Louis Vuitton and Gucci emphasise craftsmanship, heritage, exclusivity and desirability. In mass-market and fast fashion, Zara and H&M compete through accessible pricing, variety and trend responsiveness. In sports and performance, Nike and ASICS differentiate through athletic performance, technology and specialised needs. In lifestyle and athleisure, Lululemon combines functional apparel with wellness, community and lifestyle positioning, while value-oriented retailers emphasise affordability, essential products and operational efficiency.' },
      { label: 'Vietnam example', text: 'A March 2025 desktop count by Q&Me Vietnam found Yody with 283 stores, Owen with 214 and Canifa with 110, against 29 for Uniqlo, 14 for H&M and 3 for Zara. Vietnamese mass-market chains therefore compete on network reach and accessible pricing, while the international brands compete on a defined style or functional promise through far smaller networks.' },
      { label: 'Business impact', text: 'Segment-based analysis clarifies which competitors matter most and which capabilities are necessary to compete. Businesses should benchmark against brands with comparable target audiences, positioning and business models rather than against every name in the industry.' },
    ],
    visualKind: 'fashion-m4-13-segments', visualHeading: 'Where each segment sits: price pressure against need to differentiate',
    visualIntro: 'See how the five segments differ in how hard price pushes on them and how much they must stand apart.',
    imageAlt: 'Casemate positioning matrix of five market segments by price pressure and need to differentiate',
    keyTerms: [
      { term: 'Market segment', definition: 'A group of customers and competitors defined by price, function, expectations and positioning.' },
      { term: 'Fast fashion', definition: 'A model built on trend-led assortments, accessible prices and frequent product updates.' },
      { term: 'Athleisure', definition: 'Performance-inspired apparel designed to be worn in everyday life.' },
      { term: 'Value proposition', definition: 'The combined reason a customer in a segment chooses one brand over another.' },
    ],
    recap: [
      'Segments differ in price, function, expectations and positioning.',
      'Each segment has its own competitive priorities.',
      'Competing outside your positioning can weaken identity and loyalty.',
      'Benchmark against comparable audiences, positioning and business models.',
    ],
    chapterRecap: 'Segment-based analysis clarifies which competitors matter most and which capabilities are necessary to compete effectively. Businesses should benchmark against brands with comparable target audiences, positioning, and business models.',
    deepDiveTitle: 'Why the same scorecard does not fit every segment',
    body: <F4DeepDive paragraphs={[
      'Judging a luxury house on price competitiveness or a value retailer on exclusivity gives results that are accurate and useless. Each is succeeding or failing against a different standard, set by its own customers.',
      'A better approach is to choose the segment first, then list the three or four capabilities that decide choice within it, and compare rivals on those. This keeps the comparison honest and points to the capabilities worth building.',
    ]} evidence="The segment priorities are described qualitatively in the supplied material. Store counts are a Q&Me Vietnam desktop survey as of March 2025 and are indicative; they do not measure sales, profit or share." />,
    sources: citeF4('bofStateOfFashion', 'qmeStoreCount', 'deloitteRetail'),
  }),
];

const quiz = f4Quiz('fashion-m4-l1', [
  { chapter: '1', objective: 'Name the types of competition', question: 'Which are the types of competition described in this chapter?', application: 'A brand lists Adidas, casual fashion and a marketplace as threats. Which types are these?', correct: 'Direct, indirect, cross-category and channel competition', wrong: ['Only direct and legal competition', 'Only local and global competition', 'Only price and seasonal competition'], explanation: 'Competition is multidimensional and includes direct, indirect, cross-category and channel competition. Review Chapter 1.' },
  { chapter: '1', objective: 'Recognise cross-category competition', question: 'What is cross-category competition?', application: 'An athleisure brand takes everyday apparel spending from a traditional fashion retailer. What is this?', correct: 'Athleisure brands competing with traditional fashion retailers for everyday apparel spending', wrong: ['Two brands competing in the same store', 'A brand competing only with its own range', 'Competition between two suppliers'], explanation: 'Overlapping categories create cross-category competition. Review Chapter 1.' },
  { chapter: '1', objective: 'Recognise channel competition', question: 'What does channel competition describe?', application: 'A shopper compares a brand’s store, its website and a marketplace listing. What is competing?', correct: 'Physical stores, brand websites and online marketplaces competing for attention and purchases', wrong: ['Factories competing for contracts', 'Brands competing only on price', 'Customers competing for stock'], explanation: 'Channels compete for customer attention and purchases. Review Chapter 1.' },
  { chapter: '2', objective: 'State the impact of high intensity', question: 'What does high competitive intensity make equally important?', application: 'Competitors are cutting prices and launching often. What must a brand balance?', correct: 'Differentiation and cost discipline', wrong: ['Only advertising spending', 'Only store openings', 'Only product returns'], explanation: 'High intensity makes differentiation and cost discipline equally important. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognise the risk of discount reliance', question: 'What is the risk of relying only on discounts?', application: 'A retailer wins sales with constant promotions. What can it lose?', correct: 'Short-term demand may rise, but margins and brand perception can weaken', wrong: ['Nothing, because discounts build loyalty', 'Only the cost of advertising', 'Only the number of suppliers'], explanation: 'Discounts alone risk weakening margins and brand perception. Review Chapter 2.' },
  { chapter: '2', objective: 'List sources of pressure', question: 'Which of these is a source of competitive pressure in the industry?', application: 'A buyer can compare prices instantly across platforms. Which pressure is this?', correct: 'Digital competition that increases price transparency', wrong: ['A fall in the number of suppliers', 'Longer store opening hours', 'Lower transport costs only'], explanation: 'Online platforms increase price transparency and make comparison easier. Review Chapter 2.' },
  { chapter: '3', objective: 'Explain segment-based analysis', question: 'Why should businesses not evaluate every competitor by the same criteria?', application: 'A value retailer is scored on exclusivity. What is wrong?', correct: 'Segments have distinct competitive priorities', wrong: ['All segments value the same things', 'Competitors never overlap', 'Scorecards are never useful'], explanation: 'Each segment has distinct priorities, so benchmark within comparable segments. Review Chapter 3.' },
  { chapter: '3', objective: 'Match brands to segments', question: 'Which segment do Louis Vuitton and Gucci represent in this lesson?', application: 'A brand emphasises craftsmanship, heritage and exclusivity. Which segment fits?', correct: 'Luxury and premium', wrong: ['Value-oriented retail', 'Mass-market and fast fashion', 'Sports and performance'], explanation: 'Luxury and premium brands emphasise craftsmanship, heritage and exclusivity. Review Chapter 3.' },
  { chapter: '3', objective: 'Match brands to segments', question: 'What do Zara and H&M compete through?', application: 'A retailer offers frequent trend-led products at accessible prices. Which segment is it?', correct: 'Accessible pricing, product variety and trend responsiveness', wrong: ['Exclusivity and heritage only', 'Athletic performance only', 'Wellness and community only'], explanation: 'Mass-market and fast-fashion retailers compete through accessible pricing, variety and trend responsiveness. Review Chapter 3.' },
  { chapter: '3', objective: 'Choose benchmark peers', question: 'Whom should a business benchmark against?', application: 'A brand wants a useful comparison set. Whom should it choose?', correct: 'Brands with comparable target audiences, positioning and business models', wrong: ['Every brand in the industry equally', 'Only the largest global brand', 'Only brands in the same country'], explanation: 'Benchmark against brands with comparable audiences, positioning and models. Review Chapter 3.' },
]);

export const LESSON_4_1: FashionM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can identify the four types of competition, describe the sources of competitive pressure and explain why competitors should be judged within a segment.',
    keyTakeaways: [
      'Competition comes from direct rivals, substitutes, other categories and other channels.',
      'Customers choose by need and budget, not by industry label.',
      'Five sources of pressure: price, product, marketing, speed and digital transparency.',
      'Discounts alone can weaken margin and brand perception.',
      'Benchmark against brands with comparable audiences, positioning and models.',
    ],
    businessImplications: 'Build the competitor list from the customer need, respond to intensity with differentiation as well as cost discipline, and compare against peers in your own segment.',
    remember: 'Know who competes for the same customer, in which segment and through which channel.',
    nextLesson: 'Key Industry Players',
  },
};
