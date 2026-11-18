import { EcomDeepDive, citeEcom, ecomChapter, ecomQuiz } from './ecomM1Core';
import type { EcomM1LessonBundle } from './ecomM1Core';

const LESSON = 'Vietnam Market Overview';

const deck = [
  ecomChapter({
    title: 'Market Size, Growth and Digital Adoption', chapterTitle: LESSON, readingTime: '7',
    objective: 'Size Vietnam’s e-commerce market using verified publisher, period and scope labels, and explain why published figures disagree.',
    mateIntro: 'The figures look similar enough to combine and different enough to confuse. One set is the Ministry’s 2025 estimate; the other is VECOM’s estimate for 2024. Keep the labels attached.',
    keyInsight: 'Vietnam’s e-commerce market offers significant growth potential, but market size alone does not indicate profitability. Sustainable expansion will depend on consumer purchasing power, merchant capabilities, logistics performance, customer trust, and the ability of platforms to manage operating costs.',
    statTiles: [
      { value: 'US$31B', label: 'Vietnam e-commerce market, 2025', subtitle: 'Ministry of Industry and Trade estimate', description: 'Published by MOIT on 23 October 2026; reported as 25.5% higher than the prior year.' },
      { value: '11%', label: 'Share of retail goods and consumer-service revenue, 2025', subtitle: 'MOIT, same estimate', description: 'The denominator is total retail sales of goods and consumer-service revenue.' },
      { value: 'US$32B', label: 'VECOM total e-commerce estimate, 2024', subtitle: 'EBI 2025, quoted by MOIT', description: 'Includes US$22.5B of online retail goods and was estimated at about 12% of the same broad retail denominator.' },
    ],
    statsNote: 'MOIT’s 2025 estimate is US$31B and 11%. The US$32B / US$22.5B / 12% set belongs to VECOM’s estimate for 2024. Different publisher, period and methodology mean the two sets are not a clean time series.',
    narrative: [
      { label: 'What it is', text: 'Vietnam is an important emerging e-commerce market in Southeast Asia. Its development is supported by high internet usage, widespread smartphone adoption, a growing digital economy, expanding digital payment options and strong consumer engagement with online marketplaces and social platforms.' },
      { label: 'Why it is happening', text: 'The Ministry of Industry and Trade reported Vietnam’s 2025 e-commerce market at about US$31 billion, up 25.5% from the prior year and equal to about 11% of total retail sales of goods and consumer-service revenue. Separately, the VECOM E-Business Index 2025 estimated the 2024 market at US$32 billion, including US$22.5 billion of online retail goods and about 12% of the same broad retail denominator.' },
      { label: 'Real-world example', text: 'The fact that VECOM’s 2024 total is higher than MOIT’s 2025 total does not establish a market decline: they are estimates from different publishers and may use different coverage. Figures from MOIT, VECOM and commercial researchers should be compared only after checking publisher, period, definition and methodology.' },
      { label: 'Vietnam example', text: 'Digital access lets consumers discover products and complete transactions on mobile devices; fashion, beauty, electronics and household goods contribute to online sales; e-wallets, banking applications, QR payments and electronic transfers support checkout; and major platforms give merchants access to large customer bases. Small businesses in particular use marketplaces and social channels to reach customers without building physical distribution.' },
      { label: 'Business impact', text: 'Scale is not the same as profitability. Whether this market rewards a business depends on purchasing power, merchant capability, logistics performance, customer trust and the operating cost of serving each order — none of which is visible in a headline market size.' },
    ],
    visualKind: 'ecom-m1-41-vietnam', visualHeading: 'Vietnam market figures: publisher and period matter',
    visualIntro: 'Compare MOIT’s 2025 estimate with VECOM’s 2024 estimate without mixing their labels.',
    imageAlt: 'Casemate mind map comparing MOIT 2025 and VECOM 2024 Vietnam e-commerce estimates',
    keyTerms: [
      { term: 'Component versus total', definition: 'A figure contained inside a larger one; adding the two double counts the same transactions.' },
      { term: 'Total retail sales of goods and consumer services', definition: 'Vietnam’s official whole-economy retail measure, used as the denominator for the e-commerce share.' },
      { term: 'Methodology', definition: 'The coverage and definitions behind a published figure, which decide whether two estimates can be compared.' },
      { term: 'Digital adoption', definition: 'The spread of internet access, smartphones and digital payment that makes online purchase practical.' },
    ],
    recap: [
      'MOIT reported about US$31 billion and 11% for 2025.',
      'VECOM estimated US$32 billion for 2024, including US$22.5 billion of online retail goods.',
      'VECOM’s 2024 share was about 12% of total retail goods and consumer-service revenue.',
      'The two datasets differ by publisher, period and methodology and are not a clean time series.',
    ],
    chapterRecap: 'Vietnam’s e-commerce sector has reached substantial scale and continues to develop as part of the country’s digital economy. Reliable market analysis requires consistent definitions and a distinction between online retail sales and broader e-commerce activity.',
    deepDiveTitle: 'Reading two Vietnamese datasets correctly',
    body: <EcomDeepDive paragraphs={[
      'MOIT’s 2025 estimate is about US$31 billion and 11%. VECOM’s estimate for 2024 is US$32 billion, including US$22.5 billion of online retail goods and equal to about 12%. The VECOM goods figure is a component of its total, not another market to add on top.',
      'The lower 2025 MOIT total does not prove contraction because the publisher and methodology changed. The defensible habit is to keep publisher, period, definition and whether a number is a total or component beside every figure. Use the broad retail share as context, then size a specific product category separately.',
    ]} evidence="Verified on 25 October 2026 against two MOIT pages: MOIT’s 2025 market report states US$31 billion, 25.5% growth and about 11%; a separate MOIT article quotes VECOM EBI 2025 estimates for 2024 of US$32 billion, US$22.5 billion online retail goods and about 12%." />,
    sources: citeEcom('moitMarket2025', 'vecomEbi2025', 'nsoRetail', 'vecom'),
  }),
  ecomChapter({
    title: 'Major Platforms and Competitive Landscape in Vietnam', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare the routes to the Vietnamese customer and explain how a seller should choose between them.',
    mateIntro: 'A Vietnamese seller can reach buyers through marketplaces, social platforms, retailer apps and owned stores, and every route changes the economics. Choosing badly is expensive long before it looks like a mistake.',
    keyInsight: 'Vietnamese e-commerce competition is increasingly shaped by the combination of marketplace search and content-led discovery. Sellers must select channels according to product category, target audience, margins, brand positioning, and the cost of acquiring and retaining customers.',
    statTiles: [
      { value: '6', label: 'Routes to the customer', subtitle: 'Marketplace to retailer omnichannel', description: 'Shopee, TikTok Shop, Lazada, brand-owned, social commerce and retailer omnichannel.' },
      { value: '2', label: 'Discovery modes competing', subtitle: 'Marketplace search and content', description: 'They attract different demand and reward different seller skills.' },
      { value: '5', label: 'Criteria for choosing a channel', description: 'Product category, target audience, margin, brand positioning and the cost of acquiring and keeping customers.' },
    ],
    statsNote: 'The tiles count the channels and criteria described in this lesson. No platform market shares, commission rates or traffic figures are supplied in the brief, so none are quoted.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s digital commerce market includes large marketplaces, social commerce channels, brand-owned websites, retailer applications and specialised online platforms. These channels compete for consumer attention, merchant participation, transaction volume and advertising expenditure.' },
      { label: 'Why it is happening', text: 'Major platforms such as Shopee, TikTok Shop and Lazada operate alongside domestic retailers and direct-to-consumer businesses. Their approaches differ in product discovery, promotional strategy, seller tools, content integration, fulfilment and customer engagement, so a seller is not choosing between identical options.' },
      { label: 'Real-world example', text: 'Shopee competes through marketplace assortment, promotions, seller participation and integrated shopping functions. TikTok Shop connects short-form video, livestreaming, creator recommendation and purchasing. Lazada provides a marketplace model supported by seller services and regional commerce infrastructure.' },
      { label: 'Vietnam example', text: 'Competition also occurs beyond marketplaces. Merchants reach customers through social media, messaging applications and their own digital storefronts, while established retailers connect online ordering with physical stores, inventory, delivery and customer service. A single Vietnamese brand may be operating in four of these channels at once.' },
      { label: 'Business impact', text: 'Each channel balances reach against fees, promotional spending, customer ownership and profitability differently. The practical decision is not which platform is biggest but which combination fits the product, the margin and the kind of customer relationship the business is trying to build.' },
    ],
    visualKind: 'ecom-m1-42-platforms', visualHeading: 'Six routes to the Vietnamese customer',
    visualIntro: 'Compare how each channel competes with what a seller gives up to use it.',
    imageAlt: 'Casemate cascading mind map of Vietnamese e-commerce channels and seller trade-offs',
    keyTerms: [
      { term: 'Content-led discovery', definition: 'Demand created inside video, livestream or social content rather than started by a search.' },
      { term: 'Customer ownership', definition: 'Whether the seller or the platform holds the customer relationship and data after the sale.' },
      { term: 'Promotional spend', definition: 'Vouchers, discounts and campaign participation a seller funds to stay visible on a platform.' },
      { term: 'Channel mix', definition: 'The combination of marketplaces, social channels and owned storefronts a merchant sells through.' },
    ],
    recap: [
      'Marketplaces, social commerce, brand sites and retailer apps all compete.',
      'Shopee, TikTok Shop and Lazada take different approaches to discovery and sellers.',
      'Competition extends to social media, messaging and owned storefronts.',
      'Channel choice follows category, audience, margin, positioning and customer cost.',
    ],
    chapterRecap: 'Vietnam’s competitive landscape combines marketplace-led commerce, content-driven shopping and independent online retail. Merchants need a channel strategy that balances reach and conversion with fees, promotional spending, customer ownership and profitability.',
    deepDiveTitle: 'The channel that is cheap until it is not',
    body: <EcomDeepDive paragraphs={[
      'Marketplaces and social platforms are inexpensive to start on, which is exactly why they fill up. A seller lists, joins a campaign, wins orders and concludes the channel works. The costs that follow are less visible: commission on every order, voucher funding to stay in promotions, advertising to hold a ranking position, and return handling on goods bought on impulse.',
      'A seller that builds nothing of its own during the profitable early period has no alternative later, and a channel with no alternative sets its own price. The usual recommendation is unexciting but sound: use platform reach to find customers, and spend part of the margin it generates on something the business keeps — a customer list, a direct storefront, a brand people ask for by name.',
    ]} evidence="The platforms, their approaches and the criteria for channel selection are from the supplied brief, which gives no commission rates, platform shares or acquisition costs. The analysis of how channel costs escalate for a seller with no owned channel is our own." />,
    sources: citeEcom('econSea', 'vietnamBriefing'),
  }),
  ecomChapter({
    title: 'Consumer Behaviour, Merchant Participation and Local Characteristics', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe what Vietnamese shoppers expect and what those expectations cost the merchants serving them.',
    mateIntro: 'Vietnamese shoppers are highly digitally engaged and attentive to price, promotions and service. Those expectations arrive together, and merchants live in the gap between them.',
    keyInsight: 'Vietnam’s market combines strong digital engagement with demanding expectations around price, convenience, and trust. Sustainable growth requires improvements in product authenticity, seller quality, customer service, and merchant economics.',
    statTiles: [
      { value: '6', label: 'Behaviours shaping the market', subtitle: 'Price sensitivity to fulfilment expectation', description: 'Each one sets a cost the merchant has to carry.' },
      { value: 'Mobile-first', label: 'Where discovery and purchase happen', description: 'Mobile applications and social platforms rather than desktop search.' },
      { value: 'Diverse', label: 'The merchant base', subtitle: 'Brands to household sellers', description: 'Professional retailers alongside household businesses and small independent sellers.' },
    ],
    statsNote: 'The tiles summarise the behaviours and merchant types described in this lesson. The brief supplies no measured return rates, basket values or seller counts, so none are stated.',
    narrative: [
      { label: 'What it is', text: 'Vietnamese online shoppers are influenced by convenience, price, promotions, product variety, reviews, creator recommendations and delivery options. Mobile devices play an important role in product discovery and purchasing, while social media increasingly influences awareness and consideration.' },
      { label: 'Why it is happening', text: 'The merchant landscape is diverse, ranging from established brands and professional online retailers to household businesses and small independent sellers. Marketplaces help smaller merchants reach customers quickly, but those sellers may struggle with product differentiation, content creation, fulfilment, platform fees and competition from lower-priced alternatives.' },
      { label: 'Real-world example', text: 'Consumers compare prices, vouchers, shipping fees and promotional offers across platforms, while ratings, customer photos, creator demonstrations and livestream interaction shape purchase confidence. Clear product information, reliable sellers, transparent return policies and responsive support reduce the uncertainty of buying from an unfamiliar merchant.' },
      { label: 'Vietnam example', text: 'Household businesses and SMEs use marketplace infrastructure to reach customer groups they could never access alone, which widens participation but also widens the range of service quality a buyer may encounter. That variability is why authenticity and seller standards are treated as market-level problems rather than individual ones.' },
      { label: 'Business impact', text: 'Customers increasingly value accurate delivery estimates, convenient payment methods and straightforward returns. Each of those is a cost, and in a market where price comparison is routine, the merchant frequently cannot recover it through price — which is why service quality and merchant economics have to be improved together rather than traded against each other.' },
    ],
    visualKind: 'ecom-m1-43-behaviour', visualHeading: 'What Vietnamese buyers and sellers each need',
    visualIntro: 'Read each behaviour against the pressure it places on the merchant serving it.',
    imageAlt: 'Casemate quadrant mind map of Vietnamese consumer behaviours and the merchant pressures they create',
    keyTerms: [
      { term: 'Social proof', definition: 'Ratings, photos, demonstrations and comments that let a buyer judge a product through other buyers.' },
      { term: 'Household business', definition: 'A small family-run seller, a significant part of Vietnam’s online merchant base.' },
      { term: 'Product authenticity', definition: 'Confidence that goods are genuine and as described, a persistent concern in open marketplaces.' },
      { term: 'Merchant economics', definition: 'What a seller actually keeps after platform fees, promotions, fulfilment and returns.' },
    ],
    recap: [
      'Shoppers weigh convenience, price, promotions, variety, reviews and delivery.',
      'Mobile devices and social platforms drive discovery and purchase.',
      'The merchant base ranges from established brands to household sellers.',
      'Authenticity, seller quality, service and merchant economics all need improvement.',
    ],
    chapterRecap: 'Vietnam’s consumer and merchant ecosystem creates opportunities for digital commerce but also puts pressure on service quality and commercial efficiency. Platforms and sellers must build trust while managing price competition and the practical costs of online selling.',
    deepDiveTitle: 'Why trust is a cost line, not a slogan',
    body: <EcomDeepDive paragraphs={[
      'Every mechanism that makes a stranger’s product safe to buy costs somebody money. Free returns are paid for in reverse logistics. Responsive support is paid for in staff. Seller verification and listing review are paid for by the platform and passed on in fees. Authentic product costs more than a convincing imitation. None of this is optional in a market where buyers compare and talk, but none of it is free either.',
      'The difficulty is that price comparison is routine, so the merchant investing in trust usually cannot charge more for it directly. What it can do is convert that investment into repeat purchase, where there is no acquisition cost to pay again. A seller whose buyers come back twice is running a different business from one winning every order fresh, even if their listings look identical.',
    ]} evidence="The consumer behaviours, the merchant landscape and the pressures on authenticity, seller quality and service are from the supplied brief, which gives no measured return rates or basket values. The argument that trust is recovered through repeat purchase rather than price is our own." />,
    sources: citeEcom('worldBankVietnam', 'vecom', 'vietnamBriefing'),
  }),
];

const quiz = ecomQuiz('ecom-m1-l4', [
  { chapter: '1', objective: 'Recall the MOIT estimate', question: 'What did the Ministry of Industry and Trade report for Vietnam’s e-commerce market in 2025?', application: 'A deck labels US$32 billion as MOIT’s 2025 figure. What is the correction?', correct: 'About US$31 billion and 11% of retail goods and consumer-service revenue', wrong: ['US$32 billion and 12%', 'US$22.5 billion and 30%', 'US$6.419 trillion and 20.5%'], explanation: 'MOIT’s 2025 estimate is about US$31 billion and 11%; US$32 billion and 12% are VECOM’s 2024 estimates. Review Chapter 1.' },
  { chapter: '1', objective: 'Attribute the VECOM estimate', question: 'Which publisher and period belong to the US$32 billion / US$22.5 billion / 12% set?', application: 'An analyst calls those figures MOIT’s 2025 totals. What label should replace it?', correct: 'VECOM E-Business Index 2025 estimates for 2024, quoted by MOIT', wrong: ['MOIT’s own 2025 estimate', 'EMARKETER’s global 2025 forecast', 'Vietnam’s National Statistics Office census'], explanation: 'A MOIT article attributes that set to VECOM’s estimate for 2024. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate component from total', question: 'How does VECOM’s US$22.5 billion figure relate to its US$32 billion figure?', application: 'An analyst adds the two totals together. What is wrong?', correct: 'It is the online retail-goods component inside VECOM’s 2024 total', wrong: ['It is a separate 2025 market', 'It is a global forecast', 'It is payment volume outside e-commerce'], explanation: 'The US$22.5 billion is included within VECOM’s US$32 billion estimate and must not be added to it. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply comparison discipline', question: 'Why are the MOIT 2025 and VECOM 2024 totals not a clean growth series?', application: 'A chart treats US$32 billion in 2024 and US$31 billion in 2025 as proof of contraction. What is missing?', correct: 'They differ by publisher, period and potentially methodology and coverage', wrong: ['They use different currency symbols', 'One figure has no year', 'Both are company revenue'], explanation: 'A trend requires consistent definitions and methodology; these estimates come from different publishers. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify the competing channels', question: 'Which channels make up Vietnam’s digital commerce market?', application: 'A channel plan lists marketplaces only. What else competes?', correct: 'Large marketplaces, social commerce, brand-owned websites, retailer applications and specialised platforms', wrong: ['Only Shopee and Lazada', 'Only physical stores and catalogues', 'Only cross-border platforms'], explanation: 'All of these compete for attention, merchants, volume and advertising spend. Review Chapter 2.' },
  { chapter: '2', objective: 'Characterise TikTok Shop', question: 'How does TikTok Shop compete in Vietnam?', application: 'A seller wants creator-led demand. Which channel fits?', correct: 'By connecting short-form video, livestreaming, creator recommendations and purchasing', wrong: ['By operating physical department stores', 'By wholesale distribution to retailers', 'By printed catalogue ordering'], explanation: 'TikTok Shop combines content discovery with in-app purchasing. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply channel selection', question: 'On what basis should Vietnamese sellers select channels?', application: 'A merchant picks the biggest platform and loses money. What was not considered?', correct: 'Product category, target audience, margins, brand positioning and the cost of acquiring and retaining customers', wrong: ['Platform size alone', 'The platform’s launch date', 'The number of categories listed'], explanation: 'Channel choice must weigh category, audience, margin, positioning and customer cost. Review Chapter 2.' },
  { chapter: '3', objective: 'Identify consumer influences', question: 'What influences Vietnamese online shoppers?', application: 'A brand competes on product quality alone. What else drives the decision?', correct: 'Convenience, price, promotions, variety, reviews, creator recommendations and delivery options', wrong: ['Only the brand’s advertising budget', 'Only the seller’s registered capital', 'Only the warehouse location'], explanation: 'These influences shape discovery, consideration and purchase. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe the merchant base', question: 'How diverse is Vietnam’s online merchant landscape?', application: 'A platform designs tools for large brands only. Who else is selling?', correct: 'Established brands, professional online retailers, household businesses and small independent sellers', wrong: ['Only multinational brands', 'Only state-owned enterprises', 'Only foreign cross-border sellers'], explanation: 'The merchant base spans professional retailers through to household sellers. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain what sustainable growth needs', question: 'What does sustainable growth in Vietnam require?', application: 'A platform grows volume while complaints rise. What is missing?', correct: 'Improvements in product authenticity, seller quality, customer service and merchant economics', wrong: ['Deeper discounting on every order', 'Faster listing of more sellers alone', 'Removal of the review system'], explanation: 'Strong engagement comes with demanding expectations, so these four have to improve together. Review Chapter 3.' },
]);

export const LESSON_ECOM_4: EcomM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can size Vietnam’s e-commerce market from the official estimate without double counting it, compare the routes to the Vietnamese customer, and explain what local buyers expect and what it costs to meet.',
    keyTakeaways: [
      'MOIT reported about US$31 billion and 11% for 2025.',
      'VECOM estimated US$32 billion for 2024, including US$22.5 billion of online retail goods and about 12%.',
      'The VECOM goods figure sits inside its total; adding them invents a market.',
      'Marketplace search and content-led discovery now compete as parallel routes to demand.',
      'High engagement arrives with high expectations on price, convenience and trust.',
    ],
    businessImplications: 'Use platform reach to find customers, then spend part of the margin on something the business keeps — a customer list, a direct storefront, a brand asked for by name — because a channel with no alternative eventually sets its own price.',
    remember: 'Keep publisher, period, definition and total-versus-component beside every market figure.',
    nextLesson: 'Industry Drivers & External Factors',
  },
};
