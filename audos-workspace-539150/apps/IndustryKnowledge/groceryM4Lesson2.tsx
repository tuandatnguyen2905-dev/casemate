import { G4DeepDive, citeG4, g4Chapter, g4Quiz } from './groceryM4Core';
import type { GroceryM4LessonBundle } from './groceryM4Core';

const LESSON = '2. Key Industry Players';

const deck = [
  g4Chapter({
    title: 'Major Global Retailers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how the largest global retailers differ in model and why there is no single winning formula.',
    mateIntro: 'The biggest retailers in the world are not copies of each other. One wins on price, another on membership, another on logistics. What they share is that every part of the business supports the position they chose.',
    keyInsight: 'There is no single winning retail model globally. Competitive leaders build capabilities that reinforce their chosen positioning, whether through low prices, broad assortment, membership economics, convenience, or integrated digital and physical operations.',
    statTiles: [
      { value: '6', label: 'Global retailers profiled', subtitle: 'Walmart to Carrefour', description: 'Walmart, Amazon, Schwarz Group, Aldi, Costco and Carrefour, each with a different approach to scale, value and digital commerce.' },
      { value: 'US$676B', label: 'Walmart total company revenue in 2024', subtitle: 'From 10,692 stores', description: 'Walmart remained the largest retailer in the NRF and Kantar 2025 ranking.' },
      { value: '890', label: 'Costco stores worldwide', subtitle: 'US$246B company revenue', description: 'The fewest stores among the top five, showing the membership warehouse model.' },
    ],
    statsNote: 'The first tile is a count from this lesson; revenue and store counts are as listed by NRF and Kantar for 2024, and the rank is set by points from retail revenue at home and abroad, not by total revenue alone.',
    narrative: [
      { label: 'What it is', text: 'The global grocery and general merchandise landscape includes multinational retailers, discount groups, warehouse clubs, supermarket chains and e-commerce platforms. Their models differ in assortment breadth, pricing strategy, private-label penetration, store formats, membership systems and digital capabilities. The 2025 National Retail Federation (NRF) ranking, compiled with Kantar from retailers’ 2024 performance, placed Walmart first, followed by Amazon, Schwarz Group, Aldi and Costco, which illustrate different approaches to scale, value retailing, digital commerce and operational efficiency.' },
      { label: 'Why it is happening', text: 'Customers value different things, so more than one position can succeed. What does not succeed is a position that the operating model cannot support, such as low prices without efficient buying.' },
      { label: 'Real-world example', text: 'Walmart combines large-format retail, grocery, general merchandise, e-commerce and store-based fulfilment to compete on scale and convenience; Amazon uses e-commerce, marketplace services and logistics to reach a broad customer base; Schwarz Group runs Lidl and Kaufland, combining discount retail with larger formats and strong private labels; Aldi emphasises limited assortments, simplicity, private labels and value pricing; Costco uses membership, bulk buying, a curated range and its Kirkland Signature label; and Carrefour operates hypermarkets, supermarkets, convenience formats and digital commerce in several markets.' },
      { label: 'Vietnam example', text: 'Several global groups are present or have left their mark in Vietnam. Japan’s AEON entered in 2011 and Thailand’s Central Retail in 2012, and Korea’s Lotte and GS Retail (GS25) operate supermarkets and convenience stores. MM Mega Market was Metro Cash & Carry until its rebranding in 2016, and the 7-Eleven brand belongs to the Seven & i group, ranked eighth in the NRF list. The ministry notes that foreign retail groups bring finance, systems and format experience while domestic groups such as WinCommerce, Bach Hoa Xanh and Saigon Co.op lead on outlet numbers.' },
      { label: 'Business impact', text: 'Global leaders demonstrate that scale, operational discipline and a coherent business model are central to competitive advantage. Their strategies provide useful benchmarks, but their success factors must be adapted to local market conditions.' },
    ],
    visualKind: 'grocery-m4-21-global', visualHeading: 'Total company revenue of the top five global retailers',
    visualIntro: 'Compare 2024 total company revenue of the five leading retailers in the NRF and Kantar ranking.',
    imageAlt: 'Casemate bar chart of 2024 total company revenue of Walmart, Amazon, Costco, Schwarz Group and Aldi',
    keyTerms: [
      { term: 'Warehouse club', definition: 'A membership-based store selling goods in bulk at low prices.' },
      { term: 'Discount retailer', definition: 'A retailer that keeps prices low through limited ranges and simple operations.' },
      { term: 'Private label', definition: 'A product sold under a retailer’s own brand.' },
      { term: 'Omnichannel', definition: 'Selling through connected stores, apps and delivery with shared stock and data.' },
    ],
    recap: [
      'Global leaders include multinationals, discounters, warehouse clubs and e-commerce platforms.',
      'Their models differ in range, pricing, private label, formats, membership and digital capability.',
      'Each builds capabilities that reinforce its chosen position.',
      'Their lessons must be adapted to local conditions.',
    ],
    chapterRecap: 'Global leaders demonstrate that scale, operational discipline, and a coherent business model are central to competitive advantage. Their strategies provide useful benchmarks, but their success factors must be adapted to local market conditions.',
    deepDiveTitle: 'Why the ranking is not simply a list of the biggest revenues',
    body: <G4DeepDive paragraphs={[
      'The NRF and Kantar ranking gives points for retail revenue at home and abroad and requires direct operations in at least three countries. A retailer with large revenue mostly in one country can therefore rank below one with a more international footprint, as Costco, with higher revenue than Schwarz Group or Aldi, ranks fifth.',
      'Amazon’s total company revenue also includes non-retail businesses, so a revenue comparison and a ranking answer different questions.',
    ]} evidence="The retailer profiles are from the supplied material. The ranking, revenues and store counts are from the NRF and Kantar 2025 list based on 2024 operations, and the Vietnam entry dates and outlet descriptions are from the Ministry of Industry and Trade’s 2025 report and MM Mega Market’s company page." />,
    sources: citeG4('nrfTop50', 'nrfPress', 'nrfBlog', 'moitDomestic2025', 'mmvnAbout'),
  }),
  g4Chapter({
    title: 'Major Grocery and General Merchandise Retailers in Vietnam', chapterTitle: LESSON, readingTime: '7',
    objective: 'Name the major Vietnamese grocery competitors by format and explain why they must be compared within segments.',
    mateIntro: 'A WinMart+ minimart, a GO! hypermarket and a Circle K store sell some of the same products, but they serve different trips. Comparing them as one group would mislead.',
    keyInsight: 'Vietnam’s retail competition is increasingly about both geographic reach and operational execution. Retailers need to establish a strong position in their target regions while improving sourcing, freshness, store productivity, and digital integration.',
    statTiles: [
      { value: '7', label: 'Competitor groups profiled', subtitle: 'WinCommerce to convenience chains', description: 'WinCommerce, Bách Hóa Xanh, Saigon Co.op, Central Retail Vietnam, AEON Vietnam, LOTTE Mart and the convenience chains.' },
      { value: '4,592', label: 'WinCommerce stores at the end of 2025', subtitle: '130 supermarkets and 4,462 minimarts', description: 'Company-reported network of WinMart, WinMart+ and Win stores.' },
      { value: '2,559', label: 'Bách Hóa Xanh stores at the end of 2025', subtitle: 'The ministry and VCCI cite about 2,000', description: 'Company-reported by Mobile World Group; publishers differ, so the source is named.' },
    ],
    statsNote: 'The first tile is a count from this lesson; store counts are company-reported (Masan Group, Mobile World Group), while the Ministry of Industry and Trade and VCCI used a lower approximate figure for Bách Hóa Xanh, so counts depend on the source and date.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s competitive landscape combines domestic retail groups, international operators, traditional retailers and digital platforms. Major participants include WinCommerce, Saigon Co.op, Mobile World Investment Corporation’s Bách Hóa Xanh, Central Retail Vietnam, AEON Vietnam, LOTTE Mart and convenience operators such as Circle K, GS25 and 7-Eleven. They compete across different formats rather than as direct substitutes in every category: supermarkets and hypermarkets serve broader shopping missions, minimarts frequent neighbourhood purchases, and convenience stores accessibility and immediate consumption.' },
      { label: 'Why it is happening', text: 'Domestic groups expanded fast in small formats and rural areas, while foreign groups brought large-format and convenience experience. The result is overlapping competition that differs by city and by trip type.' },
      { label: 'Real-world example', text: 'WinCommerce runs WinMart supermarkets and WinMart+ and Win convenience formats with a focus on network reach; Bách Hóa Xanh focuses on grocery and fresh food with expansion and supply-chain priorities; Saigon Co.op uses Co.opmart and Co.op Food formats for household shopping; Central Retail operates GO! and Tops Market; AEON competes through malls, supermarkets and broader retail experiences; LOTTE Mart uses large formats; and Circle K, GS25 and 7-Eleven compete through accessibility, ready-to-eat products and quick trips.' },
      { label: 'Vietnam example', text: 'At the end of 2025 WinCommerce had 4,592 stores and Bach Hoa Xanh 2,559 by company reports, and Saigon Co.op had over 800 outlets and 2025 revenue above VND 32 trillion. Central Retail operated 43 GO! hypermarkets and 47 supermarkets under the GO!, Tops Market and LanChi brands. AEON had 8 malls, 15 general merchandise stores and hypermarkets, 45 medium supermarkets and 180 convenience stores, and LOTTE Mart had 15 supermarkets, according to the ministry. In convenience, Circle K had over 460 outlets by the ministry’s count, GS25 over 200 and 7-Eleven about 150.' },
      { label: 'Business impact', text: 'Vietnam’s major players follow distinct format and positioning strategies. Comparing them requires separating grocery retail, large-format retail, convenience retail and broader general merchandise rather than treating all operators as one competitive group.' },
    ],
    visualKind: 'grocery-m4-22-vietnam-players', visualHeading: 'Seven groups of Vietnamese competitors and their focus',
    visualIntro: 'See seven competitor groups around the centre and the focus that defines each.',
    imageAlt: 'Casemate orbit mind map of seven groups of Vietnamese grocery competitors and the focus of each',
    keyTerms: [
      { term: 'Hypermarket', definition: 'A very large store combining a full grocery range with non-food products.' },
      { term: 'Minimart', definition: 'A small self-service store focused on everyday goods close to customers.' },
      { term: 'Convenience chain', definition: 'A network of small stores built around accessibility, ready-to-eat items and speed.' },
      { term: 'Network reach', definition: 'How many locations and regions a retailer serves.' },
    ],
    recap: [
      'Vietnam’s landscape mixes domestic groups, international operators, traditional retail and platforms.',
      'Supermarkets, minimarts and convenience stores serve different trips.',
      'Competition is about geographic reach and operational execution.',
      'Compare players within their segments.',
    ],
    chapterRecap: 'Vietnam’s major players follow distinct format and positioning strategies. Comparing them requires separating grocery retail, large-format retail, convenience retail, and broader general merchandise rather than treating all operators as one competitive group.',
    deepDiveTitle: 'Why store counts alone mislead when formats differ',
    body: <G4DeepDive paragraphs={[
      'A chain of 4,000 small stores and a chain of 40 hypermarkets cannot be compared on count: each hypermarket sells far more per visit, while small stores reach far more neighbourhoods. The right comparison pairs counts with format, area and sales per store.',
      'Counts also depend on the date and on who reports them, as the different Bach Hoa Xanh figures show, so analysts should name the source and the period.',
    ]} evidence="The competitor descriptions are from the supplied material. Counts are company-reported (Masan Group, Mobile World Group, Saigon Co.op) or from the Ministry of Industry and Trade’s 2025 report, VCCI and Vietnamese press; where figures differ, the text says so." />,
    sources: citeG4('masanFy2025', 'mwgBusiness2025', 'coop2025', 'moitDomestic2025', 'vcciDomestic', 'centralRetailNews', 'centralRetailFood', 'aeonExpansion'),
  }),
  g4Chapter({
    title: 'Digital Platforms and Emerging Competitors', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how marketplaces and social commerce compete with physical retailers even without stores.',
    mateIntro: 'A shopper can compare prices, watch a livestream and order by phone without entering a store. Platforms change what customers expect of every retailer.',
    keyInsight: 'Digital competition extends beyond online retailers. Physical retailers must also respond to platform-based promotions, livestream commerce, cross-border sellers, and the convenience of digital payments and home delivery.',
    statTiles: [
      { value: '6', label: 'Key digital competition activities', subtitle: 'Marketplaces to cross-channel competition', description: 'Marketplace competition, social commerce, direct digital sales, digital promotions, fulfilment partnerships and cross-channel competition.' },
      { value: '~12%', label: 'E-commerce share of Vietnam’s retail sales of goods and services in 2025', subtitle: 'Ministry of Industry and Trade estimate', description: 'About VND 830 trillion, equal to about US$32 billion.' },
      { value: '41.31%', label: 'TikTok Shop share of four-platform sales in 2025', subtitle: 'Up from about 29% in 2024', description: 'Shopee held 56.04%, according to Metric.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the e-commerce share is a ministry estimate for all retail, and the platform shares are Metric data across all product categories, not grocery alone.',
    narrative: [
      { label: 'What it is', text: 'Digital marketplaces and social-commerce platforms influence how consumers discover and buy packaged goods, household products, personal care and other merchandise. Platforms such as Shopee, Lazada and TikTok Shop compete for online transactions and attention, while retailer-owned apps and websites support direct customer relationships. They may not run the same physical model as supermarkets or minimarts, but they compete for consumer spending and shape expectations on price comparison, promotions, delivery and product discovery.' },
      { label: 'Why it is happening', text: 'Smartphones, digital payments and delivery services make it easy to compare and buy, so physical retailers are judged against the best digital experience a customer has had elsewhere.' },
      { label: 'Real-world example', text: 'Marketplaces connect third-party sellers with consumers; social commerce uses livestreams, creator content and social discovery to stimulate purchases; retailers operate their own websites and apps; platforms and retailers compete through coupons, campaign events and personalised offers; delivery and logistics partners complete online orders; and customers compare online and physical prices, availability, service and delivery costs.' },
      { label: 'Vietnam example', text: 'Metric reports that four platforms sold VND 429.7 trillion in 2025, with Shopee at 56.04% and TikTok Shop at 41.31%, up from about 29%, and the ministry puts e-commerce at about 12% of retail sales and notes that 67% of Vietnamese consumers surveyed by PwC shop online. GrabMart delivers in 15–30 minutes with partners such as WinMart, ShopeeMart offers grocery delivery, GO! sells through Grab, Now, Baemin and Tiki, and Bach Hoa Xanh reported about 5% of 2025 revenue online, up about 150%.' },
      { label: 'Business impact', text: 'Digital platforms reshape competitive dynamics even when they do not replicate a retailer’s physical network. Retailers must decide where to partner with platforms, where to develop owned channels and how to protect profitability across both.' },
    ],
    visualKind: 'grocery-m4-23-digital', visualHeading: 'Six ways platforms compete for the same spending',
    visualIntro: 'See six forms of digital competition on two sides of the centre and how a retailer can respond.',
    imageAlt: 'Casemate mind map of six forms of digital competition and the retailer response to each',
    keyTerms: [
      { term: 'Social commerce', definition: 'Selling through social media content such as livestreams and creator posts.' },
      { term: 'Marketplace', definition: 'A platform where many sellers list products for customers.' },
      { term: 'Cross-border seller', definition: 'A seller shipping goods to customers in another country.' },
      { term: 'Fulfilment partner', definition: 'A delivery or logistics provider that completes online orders.' },
    ],
    recap: [
      'Marketplaces and social commerce compete for online transactions and attention.',
      'Retailer-owned apps support direct customer relationships.',
      'Platforms set expectations on price comparison, promotion, delivery and discovery.',
      'Retailers choose where to partner and where to own the channel.',
    ],
    chapterRecap: 'Digital platforms reshape competitive dynamics even when they do not directly replicate a retailer’s physical network. Retailers must decide where to partner with platforms, where to develop owned channels, and how to protect profitability across both.',
    deepDiveTitle: 'Why partnering and owning a channel is a trade-off, not a choice',
    body: <G4DeepDive paragraphs={[
      'A marketplace gives reach and traffic but charges commission and holds the customer relationship. An owned app gives data and control but must pay for its own traffic and delivery.',
      'Most retailers do both and judge each channel on profit per order, not only on sales, so that neither drains margin.',
    ]} evidence="The activities are described qualitatively in the supplied material. Platform figures are Metric data reported by The Investor and Viet Nam News and cover all categories, e-commerce share and the PwC survey are from the Ministry of Industry and Trade’s 2025 report, GO! channels are from Central Retail Vietnam’s page, and Bach Hoa Xanh figures are company results reported by VnExpress." />,
    sources: citeG4('metricEcommerce2025', 'moitDomestic2025', 'superApps', 'centralRetailFood', 'vnexpressBhx'),
  }),
];

const quiz = g4Quiz('grocery-m4-l2', [
  { chapter: '1', objective: 'Recall the 2025 NRF top five', question: 'Which retailers led the 2025 NRF and Kantar global ranking, in order?', application: 'A report cites the NRF Top 50 for 2025. What are the first five?', correct: 'Walmart, Amazon, Schwarz Group, Aldi and Costco', wrong: ['Costco, Walmart, Aldi, Amazon and Carrefour', 'Amazon, Walmart, Costco, Aldi and Schwarz Group', 'Carrefour, Walmart, Amazon, Aldi and Costco'], explanation: 'The ranking is based on 2024 performance. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify the Aldi approach', question: 'Which model emphasises limited assortments, operational simplicity and private labels?', application: 'A discounter keeps its range small to hold prices low. Which retailer is this?', correct: 'Aldi', wrong: ['Costco', 'Amazon', 'Carrefour'], explanation: 'Aldi is a value-oriented discounter. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify the Costco approach', question: 'Which model uses membership, bulk purchasing and a curated assortment?', application: 'A warehouse club sells under Kirkland Signature. Which retailer is it?', correct: 'Costco', wrong: ['Walmart', 'Schwarz Group', 'Carrefour'], explanation: 'Membership economics define Costco. Review Chapter 1.' },
  { chapter: '1', objective: 'State the central lesson', question: 'What do global leaders show about winning in retail?', application: 'Different leaders use different models. What do they share?', correct: 'There is no single winning model; leaders build capabilities that reinforce their chosen positioning', wrong: ['Only low price wins', 'Only e-commerce wins', 'Only the largest store wins'], explanation: 'Their strategies must be adapted locally. Review Chapter 1.' },
  { chapter: '2', objective: 'Name Vietnamese competitor groups', question: 'Which retailers are major competitors in Vietnam?', application: 'An analyst lists the main Vietnamese grocery competitors. Which belong?', correct: 'WinCommerce, Bách Hóa Xanh, Saigon Co.op, Central Retail Vietnam, AEON Vietnam, LOTTE Mart and convenience chains', wrong: ['Only Walmart', 'Only Amazon', 'Only Costco'], explanation: 'Vietnam combines domestic and international groups. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain format differences', question: 'How do formats differ in the shopping missions they serve?', application: 'A hypermarket, a minimart and a convenience store each draw different trips. How?', correct: 'Supermarkets and hypermarkets serve broader missions, minimarts frequent neighbourhood purchases, convenience stores accessibility and immediate consumption', wrong: ['All formats serve the same trip', 'Only hypermarkets serve households', 'Only convenience stores sell food'], explanation: 'Formats are not direct substitutes in every category. Review Chapter 2.' },
  { chapter: '2', objective: 'Avoid treating all players as one group', question: 'Why should Vietnamese players not be treated as one competitive group?', application: 'A table ranks all operators by store count. What is wrong?', correct: 'Grocery, large-format, convenience and general merchandise operators compete differently and need separate comparison', wrong: ['All operators compete identically', 'Store count is always enough', 'Formats are irrelevant'], explanation: 'Segment comparison is essential. Review Chapter 2.' },
  { chapter: '3', objective: 'List digital competitors', question: 'Which platforms compete for online transactions in Vietnam?', application: 'A retailer reviews online rivals. Which are platform competitors?', correct: 'Shopee, Lazada and TikTok Shop', wrong: ['Only wet markets', 'Only wholesalers', 'Only regulators'], explanation: 'Platforms compete for transactions and attention. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe indirect competition', question: 'How can platforms affect physical retailers that do not sell online?', application: 'A supermarket has no app but loses customers. Why?', correct: 'Platforms shape expectations on price comparison, promotions, delivery and product discovery', wrong: ['They do not affect physical stores', 'They only affect factories', 'They only affect regulators'], explanation: 'Digital competition extends beyond online retailers. Review Chapter 3.' },
  { chapter: '3', objective: 'State the strategic choice', question: 'What decision must retailers make about platforms?', application: 'A chain considers a marketplace and its own app. What must it decide?', correct: 'Where to partner with platforms, where to develop owned channels and how to protect profitability across both', wrong: ['Whether to ignore platforms', 'Whether to close all stores', 'Whether to remove loyalty benefits'], explanation: 'Both routes have costs and benefits. Review Chapter 3.' },
]);

export const LESSON_G4_2: GroceryM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how global leaders differ, name the major Vietnamese competitors by format and explain how platforms compete with physical retailers.',
    keyTakeaways: [
      'There is no single winning global model; leaders reinforce a chosen position.',
      'Rankings use points, so total revenue and rank answer different questions.',
      'Vietnam’s players compete in different formats and should be compared within segments.',
      'Store counts depend on the source, date and format, so name them when comparing.',
      'Platforms reshape competition even for retailers with no online sales.',
    ],
    businessImplications: 'Benchmark against leaders for capability, not size; compare Vietnamese rivals within segments; and decide deliberately where to partner with platforms and where to own the channel.',
    remember: 'Compare players by format and by capability, not by headline size.',
    nextLesson: 'Competitor Benchmarking',
  },
};
