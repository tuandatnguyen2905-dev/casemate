import { G4DeepDive, citeG4, g4Chapter, g4Quiz } from './groceryM4Core';
import type { GroceryM4LessonBundle } from './groceryM4Core';

const LESSON = '1. Industry Competition Structure';

const deck = [
  g4Chapter({
    title: 'Market Concentration and Competitive Intensity', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why concentration must be measured within a defined market, format and geography rather than for retail as a whole.',
    mateIntro: 'A retailer can be the biggest name in one kind of store and a small player in another. Before comparing rivals, you have to decide which market you are talking about.',
    keyInsight: 'Retailers do not compete in one uniform market. A company may be a leading player in hypermarkets but a relatively minor competitor in convenience retail or online grocery. Competitive analysis should therefore distinguish between the overall retail market and specific segments or formats.',
    statTiles: [
      { value: '6', label: 'Key concentration and intensity activities', subtitle: 'Concentration analysis to market definition', description: 'Market concentration analysis, format-based competition, geographic competition, scale assessment, channel competition and market definition.' },
      { value: '41% / 27%', label: 'Mobile World and Masan Consumer shares of supermarket value in 2025', subtitle: 'Euromonitor', description: 'Shows high concentration within the supermarket category.' },
      { value: '75.2%', label: 'Share of modern-trade sales held by the top ten chains in 2022', subtitle: 'FiinGroup estimate', description: 'A different scope: all modern trade, not supermarkets alone.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the shares come from different research firms with different scopes and years (supermarkets versus all modern trade), so they should not be compared with each other.',
    narrative: [
      { label: 'What it is', text: 'Grocery and general merchandise retail is structurally fragmented at the global level, but competition can be highly concentrated within individual countries, product categories and retail formats. Large multinational groups compete with national chains, regional operators, independent retailers, wholesalers and digital platforms. Competition is shaped by purchasing scale, store coverage, supplier relationships, assortment, pricing, logistics and access to consumer data, and the balance differs across supermarkets, convenience stores, traditional trade, discount retail and e-commerce.' },
      { label: 'Why it is happening', text: 'Each format serves a different shopping mission, so rivals are different in each. A chain that leads in one format has no automatic advantage in another, and local catchments can be crowded or empty regardless of national shares.' },
      { label: 'Real-world example', text: 'Analysts measure the sales or share held by leading retailers in a defined market; compare supermarkets with supermarkets, minimarts with minimarts and online with online; judge intensity by country, region, city or catchment; compare store networks, purchasing volume, distribution and investment capacity; assess overlap between stores, traditional markets, e-commerce and marketplaces; and separate grocery from wider general merchandise when it matters.' },
      { label: 'Vietnam example', text: 'Euromonitor reports that Vietnam’s supermarket category was highly concentrated in 2025, with Mobile World (Bach Hoa Xanh) at 41% of value and Masan Consumer at 27%, and FiinGroup estimated that the top ten modern-trade chains held 75.2% of modern-trade sales in 2022. Yet the leaders differ by format: WinCommerce has the most outlets in food retail, Circle K leads convenience stores with more than 460 outlets according to the Ministry of Industry and Trade (the company itself reported over 500 in July 2025), followed by GS25 with over 200 and 7-Eleven with about 150, while about 1.4 million traditional grocery stores still contribute up to 65% of fast-moving consumer goods sales according to NielsenIQ data.' },
      { label: 'Business impact', text: 'Industry concentration varies by geography and retail format. Defining the relevant market is essential before comparing market shares, competitive strength or barriers to entry.' },
    ],
    visualKind: 'grocery-m4-11-concentration', visualHeading: 'Six ways to read concentration and intensity',
    visualIntro: 'See six analytical activities around the centre and the question each answers.',
    imageAlt: 'Casemate orbit mind map of six ways to analyse market concentration and competitive intensity',
    keyTerms: [
      { term: 'Market concentration', definition: 'How much of a market is held by a small number of large players.' },
      { term: 'Market definition', definition: 'The choice of product, format and geography that a comparison covers.' },
      { term: 'Competitive intensity', definition: 'How strongly rivals compete for the same customers in a market.' },
      { term: 'Catchment area', definition: 'The area from which a store draws most of its customers.' },
    ],
    recap: [
      'Global retail is fragmented, but countries, categories and formats can be concentrated.',
      'Compare like with like: supermarkets with supermarkets, minimarts with minimarts.',
      'Scale, coverage, supplier ties, logistics and data shape competition.',
      'Define the relevant market before comparing shares or strength.',
    ],
    chapterRecap: 'Industry concentration varies by geography and retail format. Defining the relevant market is essential before comparing market shares, competitive strength, or barriers to entry.',
    deepDiveTitle: 'Why one national share figure hides more than it shows',
    body: <G4DeepDive paragraphs={[
      'A national share across all retail mixes hypermarkets, minimarts, markets and online orders that serve different needs. A retailer with a high share in one format may have little presence where its customers actually shop for another purpose.',
      'Defining the market first, by format, region and shopping mission, turns a headline number into a comparison that decision-makers can use.',
    ]} evidence="The activities are described qualitatively in the supplied material. Supermarket shares are summarised from a paywalled Euromonitor report, the top-ten share is a FiinGroup estimate for 2022 covering modern trade, outlet counts are from the Ministry of Industry and Trade’s 2025 report and Circle K’s own page, and store numbers and shares for traditional trade are NielsenIQ data reported by Viet Nam News." />,
    sources: citeG4('euromonitorSupermarkets', 'fiinModernTrade', 'moitDomestic2025', 'circleK', 'nielsenGrocery'),
  }),
  g4Chapter({
    title: 'Price Competition, Differentiation, and Customer Switching', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why price alone rarely gives lasting advantage and what must sit behind a competitive proposition.',
    mateIntro: 'A discount can win a shopper today and lose them tomorrow when a rival cuts too. Lasting advantage comes from being good at the things customers notice.',
    keyInsight: 'Price is a powerful competitive factor, but sustained advantage usually requires more than discounting. Retailers need a clear proposition that customers recognize and value, supported by an operating model capable of delivering it profitably.',
    statTiles: [
      { value: '6', label: 'Key activities of competitive differentiation', subtitle: 'Price benchmarking to promotional competition', description: 'Price benchmarking, assortment differentiation, freshness and quality, convenience positioning, loyalty development and promotional competition.' },
      { value: '15–45%', label: 'Discounts on essentials in a 2025 GO! campaign', subtitle: 'Reported by The Hanoi Times', description: 'Co.opmart and Lotte Mart ran offers of up to 50% in the same period.' },
      { value: '>90%', label: 'Share of domestic goods WinCommerce says it prioritises at WinMart+', subtitle: 'Ministry of Industry and Trade report', description: 'A sourcing choice that supports price, freshness and a local proposition.' },
    ],
    statsNote: 'The first tile is a count from this lesson; campaign discounts are one-off promotions and the domestic-goods share is a company priority reported by the ministry, so neither measures average prices or actual sales mix.',
    narrative: [
      { label: 'What it is', text: 'Retailers compete on price, assortment, freshness, convenience, product quality, service, store location and shopping experience. Discount retailers emphasise cost efficiency and affordable prices, while premium-oriented operators may differentiate through specialty products, service quality or curated assortments. Consumers can switch between retailers easily for many everyday products, although location convenience, loyalty benefits, availability, shopping habits and trust influence where they choose to shop.' },
      { label: 'Why it is happening', text: 'Everyday products are similar from store to store, so price differences are visible, and promotions are easy to copy. What is harder to copy is a supply chain, a network and a service level that make a proposition credible.' },
      { label: 'Real-world example', text: 'Retailers compare prices of frequently bought products with direct competitors; offer unique products, local specialties, private labels or a wider range; compete on product condition, sourcing standards and consistent availability; use accessible locations, long hours and efficient checkout; encourage repeat purchases through relevant benefits; and use discounts, bundles and seasonal campaigns while assessing the effect on margins.' },
      { label: 'Vietnam example', text: 'In 2025 GO! cut prices on essentials by 15–45%, Co.opmart offered up to 50% off local specialties with fivefold loyalty points, and Lotte Mart ran offers of up to 50%. Other retailers differentiate: WinCommerce reports private labels priced 10–20% below competing products and says WiN members, who shop about four times a month, generate 55% of its revenue; Saigon Co.op’s private-label lines are priced about 15–30% below comparable products; Bach Hoa Xanh builds on fresh food at about 40% of its products; and Circle K opens 24 hours a day. The Ministry of Industry and Trade says Vietnamese goods fill about 90% of shelves in domestic supermarkets.' },
      { label: 'Business impact', text: 'Retail competition combines price and non-price factors. Strong operators align customer-facing differentiation with procurement, logistics and store-level capabilities rather than relying on promotions alone.' },
    ],
    visualKind: 'grocery-m4-12-price-switching', visualHeading: 'Six ways to win and keep shoppers beyond price',
    visualIntro: 'See six competitive activities on two sides of the centre and what each needs to work.',
    imageAlt: 'Casemate mind map of six competitive activities and what each needs to work',
    keyTerms: [
      { term: 'Price benchmarking', definition: 'Comparing prices of key products with those of competitors.' },
      { term: 'Differentiation', definition: 'Offering something customers value that rivals do not match easily.' },
      { term: 'Switching', definition: 'Customers moving their purchases from one retailer to another.' },
      { term: 'Proposition', definition: 'The combined offer of price, range, service and convenience a retailer makes to customers.' },
    ],
    recap: [
      'Retailers compete on price, assortment, freshness, convenience, service and experience.',
      'Shoppers can switch easily, but location, loyalty, availability and trust hold them.',
      'Sustained advantage needs a recognised proposition and a model that delivers it profitably.',
      'Customer-facing differentiation must match procurement, logistics and store capability.',
    ],
    chapterRecap: 'Retail competition combines price and non-price factors. Strong operators align customer-facing differentiation with procurement, logistics, and store-level capabilities rather than relying on promotions alone.',
    deepDiveTitle: 'Why promotions are easy to copy and capability is not',
    body: <G4DeepDive paragraphs={[
      'A rival can match a discount within days, but it cannot match a farm network, a cold chain or a loyalty base so quickly. That is why durable advantage tends to sit in procurement, logistics and store execution rather than in the promotion itself.',
      'Measuring the extra sales and margin from each promotion keeps discounting from becoming a habit that raises sales while weakening profit.',
    ]} evidence="The competitive dimensions are described qualitatively in the supplied material. Campaign offers are reported by The Hanoi Times, private-label and loyalty figures are company statements reported by VnExpress International, Masan Group and a Vietnamese business magazine, and the domestic-goods figures are from the Ministry of Industry and Trade." />,
    sources: citeG4('hanoitimesPromo', 'vnexpressWincommerce', 'coopPrivateLabel2500', 'vnexpressFirstProfits', 'moitDomestic2025'),
  }),
  g4Chapter({
    title: 'Barriers to Entry and Industry Consolidation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify what a new entrant needs and explain how scale and consolidation change the competitive position of smaller operators.',
    mateIntro: 'Opening one shop is easy. Building a chain that buys well, delivers reliably and survives price wars takes money, sites, suppliers and systems.',
    keyInsight: 'Scale creates advantages in procurement, technology investment, logistics, and brand recognition, but local knowledge and specialized offerings can still support smaller retailers. The difficulty of entry depends on the target segment and the level of service the entrant intends to provide.',
    statTiles: [
      { value: '6', label: 'Key entry and consolidation activities', subtitle: 'Capital requirements to consolidation analysis', description: 'Capital requirements, supplier access, location access, operational capability, network expansion and consolidation analysis.' },
      { value: '2019', label: 'Year Masan acquired and restructured VinMart', subtitle: 'Became WinCommerce', description: 'Masan bought the VinMart supermarket and convenience network from Vingroup.' },
      { value: 'THB 22.5B', label: 'Transaction value in BJC’s plan to acquire MM Mega Market Vietnam', subtitle: 'Presented in January 2026', description: 'An announced plan by the Thai group, not a completed outcome in the source.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the acquisition year is as reported by VCCI and the transaction value is from the buyer’s investor presentation, which described an intention to acquire.',
    narrative: [
      { label: 'What it is', text: 'Entering grocery and general merchandise retail requires more than opening a store or launching a website. New entrants need access to suppliers, suitable locations, working capital, inventory systems, logistics, employees and customers, and the requirements vary widely from small independent stores to capital-intensive supermarket networks. As competition intensifies, retailers may pursue expansion, acquisitions, partnerships, franchising or restructuring, and consolidation can create purchasing and distribution advantages while increasing pressure on smaller operators.' },
      { label: 'Why it is happening', text: 'Buying, delivery and technology all get cheaper per unit as volume grows, so large chains can reach customers more cheaply. Smaller retailers survive where they know a neighbourhood or offer something specialised.' },
      { label: 'Real-world example', text: 'Entrants fund inventory, store fit-outs, distribution and technology; secure reliable products and sufficient volumes; obtain sites with suitable traffic; build inventory control, food safety, staffing and replenishment systems; enter new regions through organic growth, franchise partnerships or acquisitions; and monitor mergers, store transfers, exits and major-chain expansion.' },
      { label: 'Vietnam example', text: 'Masan acquired and restructured the VinMart network from Vingroup in 2019 and by the end of 2025 ran about 4,600 outlets and reported net cash. According to the ministry, AEON plans about US$1.5 billion of investment over ten years and Central Retail US$1.38–1.44 billion to 2027, showing the capital needed to expand. Franchise partners offer a lighter route: GS25 had 16 franchised stores by mid-2023 and Circle K operates under a licence from its United States owner. MM Mega Market’s Gia Tot programme had about 3,500 partner grocery stores by 2025, and BJC presented a plan in January 2026 to buy MM Mega Market Vietnam.' },
      { label: 'Business impact', text: 'Entry barriers differ across retail formats, while scale can reinforce competitive advantages over time. New entrants need a focused proposition and a viable operating model to overcome established competitors’ strengths.' },
    ],
    visualKind: 'grocery-m4-13-barriers', visualHeading: 'Six things a new entrant has to secure',
    visualIntro: 'See six entry and consolidation topics branching from the centre and the barrier each represents.',
    imageAlt: 'Casemate tree mind map of six entry and consolidation topics and the barrier each represents',
    keyTerms: [
      { term: 'Barrier to entry', definition: 'A cost or obstacle that makes it hard for a new competitor to enter a market.' },
      { term: 'Consolidation', definition: 'The combining of businesses through mergers, acquisitions or exits so fewer, larger players remain.' },
      { term: 'Working capital', definition: 'Cash available to fund inventory and short-term costs.' },
      { term: 'Organic growth', definition: 'Growth from opening own stores rather than buying other businesses.' },
    ],
    recap: [
      'Entry needs suppliers, sites, capital, systems, logistics, staff and customers.',
      'Requirements vary from small stores to supermarket networks.',
      'Scale helps in buying, technology, logistics and brand recognition.',
      'Local knowledge and specialised offers can still support smaller retailers.',
    ],
    chapterRecap: 'Entry barriers differ across retail formats, while scale can reinforce competitive advantages over time. New entrants need a focused proposition and a viable operating model to overcome established competitors’ strengths.',
    deepDiveTitle: 'Why asset-light growth lowers one barrier but not all of them',
    body: <G4DeepDive paragraphs={[
      'Franchising and licensing let a brand open more stores with partner capital, which lowers the funding barrier. The brand still has to secure supply, set standards and keep quality consistent, so execution barriers remain.',
      'Consolidation can add scale quickly, but combining supply chains, systems and cultures is its own challenge, and the benefit depends on whether the combined business buys and delivers better than before.',
    ]} evidence="The entry and consolidation activities are described qualitatively in the supplied material. The VinMart acquisition and 2025 outlets are from VCCI and Masan Group’s annual report, investment plans are from the Ministry of Industry and Trade’s 2025 report, franchise facts are from KED Global and Circle K, and the BJC plan and Gia Tot figures are from an investor presentation." />,
    sources: citeG4('vcciDomestic', 'masanAr2025', 'moitDomestic2025', 'kedGs25', 'bjcMmvn'),
  }),
];

const quiz = g4Quiz('grocery-m4-l1', [
  { chapter: '1', objective: 'Describe global versus local concentration', question: 'How is grocery and general merchandise retail structured?', application: 'An analyst compares the global market with one country. What differs?', correct: 'Fragmented globally, but competition can be highly concentrated within countries, categories and formats', wrong: ['Concentrated everywhere equally', 'Fragmented everywhere equally', 'Only dominated by one global retailer'], explanation: 'Concentration depends on market definition. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply format-based comparison', question: 'Why compare supermarkets with supermarkets and minimarts with minimarts?', application: 'A retailer leads in hypermarkets but is small in convenience retail. What follows?', correct: 'Retailers do not compete in one uniform market, so comparisons should use the relevant format or segment', wrong: ['All formats are one market', 'Format never matters', 'Only total revenue matters'], explanation: 'Leadership in one format does not carry over. Review Chapter 1.' },
  { chapter: '1', objective: 'List competitive shapers', question: 'Which factors shape competition in grocery retail?', application: 'An analyst lists drivers of competitive strength. Which belong?', correct: 'Purchasing scale, store coverage, supplier relationships, assortment, pricing, logistics and access to consumer data', wrong: ['Only logo design', 'Only store colour', 'Only opening dates'], explanation: 'These factors differ in weight by format. Review Chapter 1.' },
  { chapter: '1', objective: 'Define the first step', question: 'What is essential before comparing market shares or barriers to entry?', application: 'Two reports give different shares. What should be checked first?', correct: 'Defining the relevant market, including format and geography', wrong: ['Choosing the largest figure', 'Ignoring the format', 'Using only revenue'], explanation: 'Definition decides comparability. Review Chapter 1.' },
  { chapter: '2', objective: 'List competitive dimensions', question: 'Which are dimensions on which retailers compete?', application: 'A store competes on more than price. What else?', correct: 'Assortment, freshness, convenience, quality, service, location and shopping experience', wrong: ['Only price', 'Only advertising', 'Only staff numbers'], explanation: 'Retail competition is multi-dimensional. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain switching', question: 'What can influence where customers shop even though switching is easy?', application: 'A customer could shop elsewhere for a few cents less. What may keep them?', correct: 'Location convenience, loyalty benefits, product availability, habits and trust', wrong: ['Nothing', 'Only the logo', 'Only discount size'], explanation: 'Non-price factors hold customers. Review Chapter 2.' },
  { chapter: '2', objective: 'State sustained advantage', question: 'What does sustained advantage usually require beyond discounting?', application: 'A chain relies only on promotions. What is missing?', correct: 'A clear proposition customers value, supported by an operating model that delivers it profitably', wrong: ['More discounts only', 'Fewer stores only', 'No loyalty benefits'], explanation: 'Promotions are easy to copy. Review Chapter 2.' },
  { chapter: '3', objective: 'List entry requirements', question: 'What do new entrants need besides a store or website?', application: 'A founder plans a supermarket chain. What must be secured?', correct: 'Suppliers, locations, working capital, inventory systems, logistics, employees and customers', wrong: ['Only a brand name', 'Only a website', 'Only a lease'], explanation: 'Entry is more than opening a store. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain scale advantages', question: 'In which areas does scale create advantages?', application: 'A large chain buys and delivers more cheaply than a small one. Where does scale help?', correct: 'Procurement, technology investment, logistics and brand recognition', wrong: ['Only local knowledge', 'Only specialised offers', 'Only small baskets'], explanation: 'Scale reinforces advantage over time. Review Chapter 3.' },
  { chapter: '3', objective: 'Recognise remaining niches', question: 'What can still support smaller retailers against large chains?', application: 'A small shop competes with a chain. What can help it?', correct: 'Local knowledge and specialised offerings', wrong: ['Matching the chain’s scale', 'Avoiding customers', 'Removing all staff'], explanation: 'Difficulty of entry depends on target segment and service. Review Chapter 3.' },
]);

export const LESSON_G4_1: GroceryM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can define the relevant market before judging concentration, explain why price alone is not enough and list the barriers that shape entry and consolidation.',
    keyTakeaways: [
      'Retailers do not compete in one uniform market; compare by format, segment and geography.',
      'Concentration is high within some categories and countries even though global retail is fragmented.',
      'Price is powerful, but lasting advantage needs a proposition backed by procurement, logistics and stores.',
      'Customers switch easily on everyday items, so location, loyalty, availability and trust matter.',
      'Scale builds advantage, while local knowledge and specialist offers still support smaller retailers.',
    ],
    businessImplications: 'Define the market before benchmarking, invest in capabilities rivals cannot copy quickly, and size entry plans to the capital, supply and sites the target format needs.',
    remember: 'Define the market first, then compete on what is hard to copy.',
    nextLesson: 'Key Industry Players',
  },
};
