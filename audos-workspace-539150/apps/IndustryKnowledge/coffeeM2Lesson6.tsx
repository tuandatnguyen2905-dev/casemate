import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '6. Global vs. Local Value Chain';

const deck = [
  c2Chapter({
    title: 'Global Sourcing and International Supply Networks', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain what global sourcing offers a coffeehouse and what it adds in cost and risk.',
    mateIntro: 'Even a country that grows coffee imports some beans and almost all of its machines. Global sourcing is about choosing which inputs are worth bringing from afar.',
    keyInsight: 'Global sourcing creates access to quality, variety, and specialized capabilities, but it can increase cost and supply risk. Retailers should distinguish between inputs that require international sourcing for differentiation and those that can be sourced locally without compromising standards.',
    statTiles: [
      { value: '6', label: 'Key global sourcing activities', subtitle: 'International coffee sourcing to supplier qualification', description: 'International coffee sourcing, specialist ingredient sourcing, equipment sourcing, global brand systems, supply risk management and supplier qualification.' },
      { value: '45%', label: 'Laos’ share of Vietnam’s coffee imports in the first half of 2025/26', subtitle: 'USDA, from Vietnam Customs data', description: 'Followed by Indonesia (19%), Brazil (16%) and Uganda (10%).' },
      { value: '30 Dec 2026', label: 'Date the EU deforestation rules apply to large and medium operators', subtitle: 'European Commission', description: 'Soluble coffee is added from 30 December 2027.' },
    ],
    statsNote: 'The first tile is a count from this lesson; import shares are USDA reporting on customs data for six months, and the EU dates are the current published ones, which have been postponed before and should be checked.',
    narrative: [
      { label: 'What it is', text: 'Coffeehouse and foodservice retailers participate in global supply networks through coffee beans, cocoa, tea, specialized ingredients, machinery, packaging technologies, and international brand systems. Coffee is particularly exposed to global agricultural conditions because production is concentrated in specific growing regions and is affected by weather, crop cycles, and commodity-market movements.' },
      { label: 'Why it is happening', text: 'International supply networks provide access to diverse ingredients, specialist equipment, and established product standards. However, imports can also introduce longer lead times, exchange-rate exposure, freight costs, and dependence on external suppliers.' },
      { label: 'Real-world example', text: 'Buyers purchase beans from producing countries such as Brazil, Colombia, Ethiopia and Vietnam according to the desired product profile; import selected syrups, flavourings, cocoa products or teas where appropriate; buy espresso machines, grinders, refrigeration and kitchen technology from international makers; adopt standard recipes, manuals, service protocols and quality specifications; watch commodity prices, currencies, shipping and supplier availability; and check that imported materials meet food-safety, labelling, documentation and quality rules.' },
      { label: 'Vietnam example', text: 'Although Vietnam produced about 31.7 million bags of coffee in 2025/26, USDA reports imports of 1.3 million bags, led in the first half by Laos (45%), Indonesia (19%), Brazil (16%) and Uganda (10%), with Robusta 54% and Arabica 45% of green-bean imports. The EU took 47.2% of Vietnam’s export volume in 2024–25, so EU rules matter to coffee exporters, and eleven-month export prices rose about 91% for Arabica. Highlands equipped its roastery with German Probat technology, showing equipment sourced abroad. The sources reviewed give no published figures on exchange-rate or freight effects for café chains, so none are stated.' },
      { label: 'Business impact', text: 'Global supply networks provide access to differentiated ingredients and specialized capabilities. Their value depends on managing lead times, cost volatility, quality requirements, and the risks associated with international sourcing.' },
    ],
    visualKind: 'coffee-m2-61-global', visualHeading: 'Where Vietnam’s imported coffee came from',
    visualIntro: 'See the four largest origins of Vietnam’s coffee imports in the first half of 2025/26.',
    imageAlt: 'Casemate bar chart of Laos, Indonesia, Brazil and Uganda shares of Vietnam coffee imports',
    keyTerms: [
      { term: 'Lead time', definition: 'The time between ordering and receiving a product.' },
      { term: 'Exchange-rate exposure', definition: 'The risk that currency moves change the cost of imports.' },
      { term: 'Supplier qualification', definition: 'Checking that a supplier meets quality, safety and documentation standards.' },
      { term: 'Global brand system', definition: 'Standard recipes, manuals and protocols used across countries.' },
    ],
    recap: [
      'Coffeehouses depend on global supply for beans, ingredients, machines and systems.',
      'Coffee is exposed to weather, crop cycles and commodity prices.',
      'Imports give access but add lead time, currency, freight and supplier risk.',
      'Source internationally only what needs it for differentiation.',
    ],
    chapterRecap: 'Global supply networks provide access to differentiated ingredients and specialized capabilities. Their value depends on managing lead times, cost volatility, quality requirements, and the risks associated with international sourcing.',
    deepDiveTitle: 'Why a bean-producing country still imports beans',
    body: <C2DeepDive paragraphs={[
      'Processors may need particular grades, flavour profiles or volumes that local supply does not always offer at the right price, especially when local prices are high. Imported beans can fill that gap.',
      'The choice depends on the product: a mass-market blend may use local beans, while a specialty range may import specific origins.' ]} evidence="The six activities are described in the supplied material. Import data and production figures are from USDA reporting; EU dates are from the European Commission page; the export share is from the Ministry of Agriculture and Environment; export prices are from customs data reported by VOV; the roastery is from Viet Nam News." />,
    sources: citeC2('usdaCoffeeAnnual', 'usdaCoffeeSemi', 'eudrCommission', 'maeCropYear', 'vovCoffeePrices', 'highlandsRoastery'),
  }),
  c2Chapter({
    title: 'Vietnam’s Domestic Supply Base and Local Adaptation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe Vietnam’s domestic supply advantages and how retailers localise menus and sourcing.',
    mateIntro: 'Vietnam grows a great deal of coffee and has many food makers nearby. The challenge is turning that proximity into consistent quality.',
    keyInsight: 'Vietnam’s domestic supply base can support both cost efficiency and differentiation. The strongest local value chains combine domestic sourcing advantages with disciplined quality control and selective use of imported inputs.',
    statTiles: [
      { value: '6', label: 'Key local sourcing and adaptation activities', subtitle: 'Domestic coffee procurement to domestic distribution', description: 'Domestic coffee procurement, local agricultural sourcing, domestic processing, menu localization, local supplier development and domestic distribution.' },
      { value: '630,200 ha', label: 'Harvested area of Robusta in Vietnam in 2025/26', subtitle: 'USDA estimate', description: 'Supports about 30.5 million bags of Robusta.' },
      { value: '2.90 t/ha', label: 'Average Robusta yield in 2025/26', subtitle: 'USDA estimate', description: 'Up from 2.73 tonnes in 2024/25.' },
    ],
    statsNote: 'The first tile is a count from this lesson; area and yield are US government estimates for the marketing year, and the sources reviewed give no comparable data for local tea, dairy or produce suppliers.',
    narrative: [
      { label: 'What it is', text: 'Vietnam has an important domestic coffee-producing sector and a broad network of food manufacturers, dairy suppliers, agricultural producers, packaging providers, wholesalers, roasters, and logistics companies. Domestic sourcing can shorten replenishment cycles and support local product development, although availability and quality consistency vary by ingredient and supplier.' },
      { label: 'Why it is happening', text: 'Retailers also adapt international concepts to local consumption habits. Vietnamese coffee styles, local ingredients, familiar flavors, regional menu preferences, and different price points can help businesses create relevance while maintaining appropriate operating standards.' },
      { label: 'Real-world example', text: 'Buyers source Vietnamese coffee for traditional brews, espresso blends or locally positioned products; purchase fruits, vegetables, herbs and other ingredients from qualified domestic suppliers; work with local roasters, bakeries, dairy processors and food manufacturers; adapt sweetness, flavour combinations, drink formats and food to Vietnamese preferences; support consistent specifications, reliable delivery and quality assurance among suppliers; and use local wholesalers and logistics providers to replenish stores.' },
      { label: 'Vietnam example', text: 'USDA estimates 630,200 hectares of Robusta in 2025/26 yielding 2.90 tonnes a hectare, and the International Coffee Organization describes the Central Highlands provinces of Dak Lak, Lam Dong, Dak Nong, Gia Lai and Kon Tum as the main producing areas. Highlands built its roastery in the south near a port, Phúc Long owns tea hills in Thái Nguyên and Bảo Lộc and runs processing plants in Binh Duong, and Milano Coffee has about 2,500 outlets in a network built largely on a franchise-agency model. Arabica is only about 1.2 million of 31.7 million bags, so specialty buyers may look abroad. The sources reviewed give no published data on local produce or dairy supplier reliability, so none are stated.' },
      { label: 'Business impact', text: 'Domestic sourcing and menu localization help retailers respond to local tastes and operating conditions. Reliable quality standards and supplier development are necessary to convert local availability into a durable competitive advantage.' },
    ],
    visualKind: 'coffee-m2-62-local', visualHeading: 'Six ways to use the domestic supply base',
    visualIntro: 'See six local sourcing and adaptation activities on two sides of the centre and what each gives.',
    imageAlt: 'Casemate sides mind map of six ways to use Vietnam’s domestic supply base',
    keyTerms: [
      { term: 'Menu localisation', definition: 'Adapting flavours, sweetness and formats to local preferences.' },
      { term: 'Supplier development', definition: 'Helping suppliers meet specifications and delivery standards.' },
      { term: 'Robusta', definition: 'A coffee species that makes up most of Vietnam’s production.' },
      { term: 'Quality consistency', definition: 'Delivering the same quality from batch to batch.' },
    ],
    recap: [
      'Vietnam has a major coffee sector and a wide network of food suppliers.',
      'Local sourcing can shorten cycles and support local products.',
      'Availability and consistency vary by ingredient and supplier.',
      'Quality control and supplier development turn local supply into advantage.',
    ],
    chapterRecap: 'Domestic sourcing and menu localization help retailers respond to local tastes and operating conditions. Reliable quality standards and supplier development are necessary to convert local availability into a durable competitive advantage.',
    deepDiveTitle: 'What supplier development looks like in practice',
    body: <C2DeepDive paragraphs={[
      'A chain can share its specifications with a local dairy or bakery supplier, run trial batches, visit the plant and agree delivery windows and quality checks. Over time the supplier becomes a dependable partner.',
      'This takes effort, but it turns local proximity into reliability, which is worth more than proximity alone.' ]} evidence="The six activities are described in the supplied material. Production area and yield are USDA estimates; provinces are from an International Coffee Organization profile that is older than the USDA data; Highlands, Phúc Long and Milano details are from company statements and press reports." />,
    sources: citeC2('usdaCoffeeAnnual', 'icoVietnam', 'highlandsRoastery', 'phucLongTea', 'phucLongAbout', 'vietnamplusRegional'),
  }),
  c2Chapter({
    title: 'Global vs. Vietnam Value Chain Comparison', chapterTitle: LESSON, readingTime: '8',
    objective: 'Compare international and local value chains and explain why fit with the market decides advantage.',
    mateIntro: 'A global brand brings systems and recognition; a local brand brings taste and relationships. Each fits a market differently.',
    keyInsight: 'Competitive advantage depends on the fit between the business model and the market. International standards can strengthen consistency, while local knowledge improves relevance; combining both capabilities can support scalable growth in Vietnam.',
    statTiles: [
      { value: '6', label: 'Key comparison activities', subtitle: 'Sourcing strategy to growth strategy', description: 'Sourcing strategy, product development, operational systems, customer acquisition, cost structure and growth strategy.' },
      { value: '4.9M bags', label: 'Vietnam’s domestic coffee consumption in 2025/26', subtitle: 'USDA, against production of 31.7 million bags', description: 'Most of the crop is exported, which links local pricing to global markets.' },
      { value: '985 vs ~150', label: 'Highlands versus Starbucks stores in Vietnam at the end of 2025', subtitle: 'Reported by the press', description: 'A local chain far larger than an established global one.' },
    ],
    statsNote: 'The first tile is a count from this lesson; consumption and production are US government estimates and store counts are press-reported, so the comparison shows scale, not profitability.',
    narrative: [
      { label: 'What it is', text: 'The value chain in Vietnam shares the same fundamental structure as international markets: sourcing, processing, distribution, store operations, and customer service. Differences arise from the maturity of organized retail, local coffee culture, purchasing power, supplier capabilities, logistics infrastructure, and the balance between independent businesses and formal chains.' },
      { label: 'Why it is happening', text: 'International operators may bring established systems, brand recognition, and standardized operating procedures, while local businesses often benefit from cultural familiarity, local sourcing relationships, and flexibility in menu and price decisions. Neither approach guarantees superior performance without strong execution.' },
      { label: 'Real-world example', text: 'International networks give access to global ingredients while domestic ones may improve freshness, lead times and responsiveness; global chains adapt established menus while local operators build concepts around Vietnamese habits; larger chains gain from standard buying, training and inventory systems; international brands use awareness while local ones use community ties; costs for rent, labour, ingredients, distribution and platform commissions differ by location, format and scale; and chains replicate standard store models while independents expand selectively.' },
      { label: 'Vietnam example', text: 'Starbucks entered Vietnam in 2013 and had about 150 stores at the end of 2025, while locally founded Highlands reached 985 and Milano about 2,500, and Café Amazon left in November 2025 after five years. The BBC reports that Highlands began as a premium chain and later cut prices. Phúc Long’s CEO appointed in 2024 previously led Starbucks Vietnam for over 11 years, showing how international experience is brought into a local brand. USDA reports Vietnam’s domestic coffee consumption at 4.9 million bags against production of 31.7 million, so local operators buy in a market priced off global exchanges.' },
      { label: 'Business impact', text: 'Vietnam’s coffeehouse and foodservice value chain combines global inputs and operating practices with a strong domestic supply base and distinctive local consumption patterns. Retailers should build a model that integrates consistent standards, local relevance, supply resilience, and profitable store operations.' },
    ],
    visualKind: 'coffee-m2-63-comparison', visualHeading: 'International versus local operators',
    visualIntro: 'Compare international and local operators across sourcing, product development, systems, acquisition and growth.',
    imageAlt: 'Casemate comparison of international and local operators in Vietnam’s coffeehouse value chain',
    keyTerms: [
      { term: 'Fit', definition: 'How well a business model suits the market it serves.' },
      { term: 'Standardised procedures', definition: 'Fixed methods used across stores for buying, training and inventory.' },
      { term: 'Cultural familiarity', definition: 'Knowing local habits, tastes and expectations.' },
      { term: 'Replication', definition: 'Repeating a proven store model in new locations.' },
    ],
    recap: [
      'Vietnam shares the same chain structure as other markets.',
      'Differences come from retail maturity, culture, purchasing power, suppliers and logistics.',
      'International operators bring systems; local ones bring familiarity and flexibility.',
      'Neither wins without strong execution.',
    ],
    chapterRecap: 'Vietnam’s coffeehouse and foodservice value chain combines global inputs and operating practices with a strong domestic supply base and distinctive local consumption patterns. Retailers should build a model that integrates consistent standards, local relevance, supply resilience, and profitable store operations.',
    deepDiveTitle: 'Combining global systems with local taste',
    body: <C2DeepDive paragraphs={[
      'A chain can keep global-quality procurement, training and inventory systems while writing menus around local drinks and price points. The systems give consistency; the menu gives relevance.',
      'The test is whether customers see a familiar, trusted offer that works smoothly every time.' ]} evidence="The six activities are described in the supplied material. Store counts are from Momentum Works data reported by VietnamPlus and VnExpress and from VietnamBiz; Starbucks and Highlands history is from BBC reporting; the Phúc Long CEO’s background is from a Masan Group interview; consumption and production are USDA estimates." />,
    sources: citeC2('usdaCoffeeAnnual', 'vietnamplusRegional', 'vnexpressChains', 'vietnambizChains', 'bbcStarbucks', 'masanPhucLong'),
  }),
];

const quiz = c2Quiz('coffee-m2-l6', [
  { chapter: '1', objective: 'State what global sourcing offers', question: 'What does global sourcing create access to?', application: 'A chain wants a specialty ingredient not made locally. What helps?', correct: 'Quality, variety and specialised capabilities', wrong: ['Only lower rent', 'Only more staff', 'Only larger stores'], explanation: 'It broadens options. Review Chapter 1.' },
  { chapter: '1', objective: 'List import risks', question: 'Which is a risk of imports?', application: 'A retailer imports syrups. What risk grows?', correct: 'Longer lead times, exchange-rate exposure, freight costs and supplier dependence', wrong: ['Shorter lead times', 'No cost changes', 'No supplier risk'], explanation: 'Distance adds risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply the sourcing choice', question: 'How should retailers choose between international and local sourcing?', application: 'A buyer weighs two sources. What is the test?', correct: 'Distinguish inputs that need international sourcing for differentiation from those that can be local without lowering standards', wrong: ['Always import', 'Always buy local', 'Always pick the cheapest'], explanation: 'It depends on the input. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the largest import origin', question: 'Which country supplied 45% of Vietnam’s coffee imports in the first half of 2025/26?', application: 'A student reads USDA data. Who led?', correct: 'Laos', wrong: ['Brazil', 'Uganda', 'Indonesia'], explanation: 'Laos led, then Indonesia. Review Chapter 1.' },
  { chapter: '2', objective: 'State the local base’s role', question: 'What can Vietnam’s domestic supply base support?', application: 'A chain wants fresher supply. What can help?', correct: 'Both cost efficiency and differentiation', wrong: ['Only imports', 'Only exports', 'Only advertising'], explanation: 'Local supply is an advantage. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a localisation step', question: 'What is menu localisation?', application: 'A global brand changes sweetness and flavours for Vietnam. What is that?', correct: 'Adapting sweetness, flavours, formats and food to Vietnamese preferences', wrong: ['Removing the menu', 'Raising all prices', 'Closing stores'], explanation: 'Relevance matters. Review Chapter 2.' },
  { chapter: '2', objective: 'State what turns local supply into advantage', question: 'What do domestic suppliers need for local availability to become an advantage?', application: 'A local supplier is nearby but inconsistent. What is missing?', correct: 'Reliable quality standards and supplier development', wrong: ['Nothing', 'Higher prices only', 'Fewer deliveries'], explanation: 'Consistency makes the advantage. Review Chapter 2.' },
  { chapter: '3', objective: 'State what advantage depends on', question: 'What does competitive advantage depend on?', application: 'A global chain enters a new market. What decides its success?', correct: 'The fit between the business model and the market', wrong: ['Brand origin alone', 'Store size alone', 'Price alone'], explanation: 'Fit decides. Review Chapter 3.' },
  { chapter: '3', objective: 'Contrast strengths', question: 'What do local businesses often benefit from?', application: 'A local café holds customers against a global chain. Why?', correct: 'Cultural familiarity, local sourcing relationships and flexibility in menu and price', wrong: ['Global brand awareness', 'Standard global manuals', 'Larger procurement scale'], explanation: 'Local strengths. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a store-count comparison', question: 'About how many stores did Highlands and Starbucks have in Vietnam at the end of 2025?', application: 'A student compares the chains. What are the figures?', correct: '985 and about 150', wrong: ['85 and 1,500', '150 and 985', '9,850 and 15'], explanation: 'A local chain far larger. Review Chapter 3.' },
]);

export const LESSON_C2_6: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain what global sourcing offers, how Vietnam’s domestic supply base supports local adaptation and why fit with the market decides advantage.',
    keyTakeaways: [
      'Global sourcing gives access to quality and variety but adds cost and risk.',
      'Source internationally only the inputs that need it.',
      'Vietnam’s domestic supply can support both cost and differentiation.',
      'Quality control and supplier development turn local supply into advantage.',
      'Advantage depends on the fit between model and market.',
    ],
    businessImplications: 'Combine consistent global-standard systems with local menus and suppliers, and import only what truly differentiates.',
    remember: 'Global systems, local taste.',
    nextLesson: 'How Companies Make Money',
  },
};
