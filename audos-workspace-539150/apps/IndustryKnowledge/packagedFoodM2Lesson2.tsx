import { chapter, citePfM2, pairedQuiz, EvidenceNote } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.2 Upstream Activities';

export const PACKAGED_FOOD_M2_LESSON2_DECK: PackagedFoodCardData[] = [
  chapter({
    title: 'Where Packaged Food Ingredients Come From',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Connect each major product family to its agricultural ingredients and sourcing geography.',
    mateIntro: 'The ingredient list reveals the upstream chain. Cocoa links a chocolate bar to tropical farms; flour links a biscuit to wheat fields and mills.',
    keyInsight: 'Each product family has a different input basket, so it also has a different exposure to climate, geography and commodity prices.',
    narrative: [
      { label: 'What it is', text: 'Chocolate relies on cocoa, sugar and often dairy. Biscuits use flour, fats or oils and sugar. Candy uses sugar, glucose syrups, flavours and gelling agents. Savoury snacks use potato, corn or other grains, oils and seasonings.' },
      { label: 'How it works', text: 'Farm output is collected, graded, traded and processed into factory-ready ingredients. Cocoa beans become cocoa mass, butter and powder; wheat becomes flour; milk may become milk powder or butterfat.' },
      { label: 'Global example', text: 'Ghana and Côte d’Ivoire together produce over 60% of global cocoa. This concentration makes chocolate supply especially sensitive to West African weather, crop disease and farm conditions.' },
      { label: 'Vietnam example', text: 'Vietnam grows no wheat according to the cited trade-body source, so flour millers import more than 1.8 million tonnes of milling wheat annually. Local biscuit production can therefore remain exposed to global wheat prices and foreign exchange.' },
      { label: 'Why it matters', text: 'A procurement team cannot manage “food ingredients” as one category. It must understand the crop cycle, supplier market, quality specification and currency exposure of each input.' },
    ],
    visualKind: 'packaged-food-m2-22-1',
    visualHeading: 'Match each product to its upstream basket',
    visualIntro: 'Compare the crops, intermediate ingredients and geographic risks behind four product families.',
    imageAlt: 'Ingredient map connecting chocolate, biscuits, candy and savoury snacks to agricultural sources',
    statTiles: [
      { value: '4.461 Mt', label: 'World cocoa production, 2023/24', subtitle: 'Down 11.7% year on year', description: 'ICCO projection reported by BusinessGhana.' },
      { value: '>60%', label: 'Ghana + Côte d’Ivoire cocoa share', subtitle: 'Global production concentration', description: 'Secondary news source; illustrates geographic concentration, not company sourcing share.' },
      { value: '>1.8 Mt/year', label: 'Vietnam milling-wheat imports', subtitle: 'Trade-body estimate', description: 'U.S. Wheat Associates search snippet; re-confirm against primary trade data before publication.' },
    ],
    keyTerms: [
      { term: 'Commodity', definition: 'A broadly standardised raw material traded in markets, such as cocoa, wheat or sugar.' },
      { term: 'Intermediate ingredient', definition: 'A processed input used by a food factory, such as flour, cocoa butter or milk powder.' },
      { term: 'Geographic concentration', definition: 'A large share of supply coming from a small number of places.' },
      { term: 'Foreign-exchange exposure', definition: 'The risk that currency changes alter the local cost of imported inputs.' },
    ],
    recap: [
      'Product families use different ingredient baskets.',
      'Cocoa supply is highly concentrated in West Africa.',
      'Vietnam’s biscuit chain depends on imported milling wheat.',
      'Local manufacturing does not remove global commodity exposure.',
    ],
    chapterRecap: 'Begin upstream analysis with the recipe, then trace every important ingredient to its crop, processor, geography and currency.',
    deepDiveTitle: 'From crop to factory-ready ingredient',
    body: (
      <div className="space-y-4">
        <p>A food factory rarely buys an agricultural crop in the exact form used in the recipe. Traders aggregate supply, and processors clean, mill, grind, refine or standardise it. Each extra step creates a quality specification and another point where cost or disruption can enter.</p>
        <p>Ingredient origin also shapes lead time. Imported wheat or cocoa must be contracted, shipped, cleared and stored. A buyer therefore balances price with quality, reliability, working capital and the risk of interruption.</p>
        <EvidenceNote>The research did not verify primary Vietnam trade volumes for cocoa, sugar or edible oil. The statement that Vietnam relies heavily on imported industrial cocoa and supplements domestic sugar with imports is directional; Vietnam also has a small cocoa crop and material domestic sugar production.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s08', 'pf-m02-s09', 'pf-m02-s10'),
  }),
  chapter({
    title: 'Suppliers, Agricultural Inputs, and Packaging Materials',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Explain how supplier capability, responsible sourcing and packaging materials support a reliable food operation.',
    mateIntro: 'A recipe can fail before production begins if an ingredient misses specification or the wrapper cannot protect the product.',
    keyInsight: 'Upstream performance depends on more than price: suppliers must deliver the right quality, volume, traceability and packaging function at the right time.',
    narrative: [
      { label: 'What it is', text: 'The supplier base includes farmers, cooperatives, traders, ingredient processors, flavour and dairy suppliers, packaging converters and equipment providers. Packaging inputs include flexible film, foil, cartons and plastics.' },
      { label: 'How it works', text: 'Manufacturers approve suppliers against technical and commercial requirements, then manage contracts, audits, delivery, batch documents and traceability. Packaging is specified for barrier performance, machine compatibility, food contact and shelf life.' },
      { label: 'Global example', text: 'Mondelez’s Cocoa Life programme links cocoa sourcing with farmer support and traceability. The company reports about 90% of its cocoa sourced through the programme and a cumulative commitment targeted at US$1 billion by 2030.' },
      { label: 'Vietnam example', text: 'A Vietnam biscuit or confectionery plant may buy imported ingredients through regional or global suppliers while sourcing some cartons, films and services locally. The right mix depends on quality, cost, lead time and available capability.' },
      { label: 'Why it matters', text: 'Supplier selection affects safety, continuity, cost and reputation. Ethical issues such as cocoa deforestation and child labour are therefore procurement risks, not only communications topics.' },
    ],
    visualKind: 'packaged-food-m2-22-2',
    visualHeading: 'Build a resilient supplier system',
    visualIntro: 'See how ingredients and packaging move through approval, contracting, delivery and verification.',
    imageAlt: 'Supplier system for agricultural ingredients, processed inputs and packaging materials',
    statTiles: [
      { value: '~90%', label: 'Mondelez cocoa via Cocoa Life', subtitle: 'Company-reported, 2024 context', description: 'A corporate sourcing share, not the sustainable share of global cocoa.' },
      { value: 'US$1bn', label: 'Cocoa Life commitment target', subtitle: 'Cumulative by 2030', description: 'Company programme target reported by confectionery trade press.' },
      { value: '~300,000', label: 'Farmers targeted', subtitle: 'Cocoa Life by 2030', description: 'Programme reach target reported by confectionery trade press.' },
    ],
    keyTerms: [
      { term: 'Supplier qualification', definition: 'The process of checking whether a supplier can meet technical, safety, legal and delivery requirements.' },
      { term: 'Traceability', definition: 'Records that connect a material to its origin, batches and movements through the chain.' },
      { term: 'Barrier property', definition: 'A package material’s ability to limit moisture, oxygen, light or aroma transfer.' },
      { term: 'Responsible sourcing', definition: 'Purchasing that addresses environmental, labour and community risks as well as quality and cost.' },
    ],
    recap: [
      'Suppliers are assessed on quality, continuity and traceability as well as price.',
      'Packaging is a functional input, not decoration alone.',
      'Responsible sourcing can protect supply and reputation.',
      'Cocoa Life figures describe one company programme.',
    ],
    chapterRecap: 'A strong supplier creates a reliable specification and delivery system, not merely a low quoted price.',
    deepDiveTitle: 'Why packaging belongs upstream',
    body: (
      <div className="space-y-4">
        <p>Packaging enters the factory as a purchased material and must match the product and the line. A film that does not seal consistently can slow output or shorten shelf life. A carton that fails in transport can damage saleable packs even when the food is perfect.</p>
        <p>Supplier development can improve both resilience and cost. A manufacturer may work with suppliers on material reduction, local availability or traceability. The decision still requires testing because a cheaper or thinner material can create larger losses downstream.</p>
        <EvidenceNote>The research says packaging is a major cost block and can rival food cost for low-value candy, but it does not provide a primary-verified percentage breakdown. No packaging-cost share is presented here.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s11'),
  }),
  chapter({
    title: 'Understanding Input Costs and Supply Risks',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Assess how commodity prices, climate, concentration, currency and lead time affect input cost and continuity.',
    mateIntro: 'The cheapest quotation today may become the most expensive choice if a crop fails, a currency moves or a shipment arrives after the factory runs out.',
    keyInsight: 'Procurement manages total risk-adjusted cost: purchase price plus quality, currency, inventory, disruption and responsibility risks.',
    narrative: [
      { label: 'What it is', text: 'Input risk includes price volatility, crop and climate risk, geographic concentration, foreign exchange, logistics disruption, quality failure and environmental or labour exposure.' },
      { label: 'How it works', text: 'Teams use multiple suppliers, contracts, inventory buffers, forecasts, local-sourcing projects and sometimes commodity or currency hedges. Each tool reduces one risk but may add cost or complexity.' },
      { label: 'Global example', text: 'World cocoa production was projected to fall 11.7% in 2023/24, creating a large supply deficit. Because production is concentrated, the shock became a major cost issue for chocolate manufacturers.' },
      { label: 'Vietnam example', text: 'Orion Food Vina reportedly absorbed an approximately 70% ingredient-cost increase while holding prices flat from 2018. This is a company example of cost pressure and commercial response, not a Vietnam industry cost index.' },
      { label: 'Why it matters', text: 'Input shocks can reduce margin, change pack sizes, delay production or force pricing decisions. Procurement, Finance, R&D and Sales must respond together.' },
    ],
    visualKind: 'packaged-food-m2-22-3',
    visualHeading: 'Turn input exposure into a risk map',
    visualIntro: 'Rank risks by likelihood, impact and the time available to respond.',
    imageAlt: 'Risk map for commodity price, climate, concentration, currency, logistics and supplier quality',
    statTiles: [
      { value: '-11.7%', label: 'World cocoa production change', subtitle: '2023/24 projection', description: 'ICCO industry measure reported by BusinessGhana.' },
      { value: '-439 kt', label: 'Cocoa supply deficit', subtitle: '2023/24 projection', description: 'Global industry balance, not one company’s shortfall.' },
      { value: '~70%', label: 'Orion ingredient-cost increase', subtitle: 'Reported company experience', description: 'Approximate increase absorbed while prices were held flat from 2018; not an industry average.' },
    ],
    keyTerms: [
      { term: 'Hedging', definition: 'Using contracts or financial tools to reduce uncertainty in a commodity price or exchange rate.' },
      { term: 'Dual sourcing', definition: 'Using more than one approved supplier for an important input.' },
      { term: 'Safety stock', definition: 'Extra inventory held to reduce the risk of running out during uncertainty.' },
      { term: 'Total cost of ownership', definition: 'Purchase price plus the wider costs and risks of quality, logistics, inventory and failure.' },
    ],
    recap: [
      'Input price is only one part of procurement cost.',
      'Climate and concentration make cocoa especially exposed.',
      'Imported inputs add currency and logistics risk in Vietnam.',
      'Company experiences must stay separate from industry measures.',
    ],
    chapterRecap: 'The best sourcing decision balances cost, continuity, quality, cash and responsibility over time.',
    deepDiveTitle: 'Choosing a response to an input shock',
    body: (
      <div className="space-y-4">
        <p>A short disruption may be covered by inventory. A structural shortage may require new origins, supplier development, reformulation, pack-price changes or customer pricing. Hedging can reduce near-term volatility, but it cannot create a crop that was never harvested.</p>
        <p>Responses also have timing gaps. Contracts and inventory can delay the impact of a market price change, while retailer price changes may take time. That is why a shock can reach company margin before it reaches the shelf.</p>
        <EvidenceNote>No itemised cost-of-goods breakdown was primary-verified for a named biscuit or confectionery maker. The research also lacks primary Vietnam import series for cocoa, sugar and edible oils, so no invented input shares or import percentages are used.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06', 'pf-m02-s08', 'pf-m02-s09', 'pf-m02-s10'),
  }),
];

export const PACKAGED_FOOD_M2_LESSON2_QUIZ: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l2', [
  { chapter: '1', objective: 'Match ingredients to categories', question: 'Which input is most distinctive to chocolate economics?', application: 'A buyer is mapping the main crop risk for a chocolate line. Which input belongs at the centre?', correct: 'Cocoa', wrong: ['Potatoes only', 'Wheat only', 'Carton ink only'], explanation: 'Chocolate depends on cocoa products, making cocoa availability and price a pivotal exposure.' },
  { chapter: '1', objective: 'Match ingredients to categories', question: 'Which input basket best fits biscuits?', application: 'A biscuit team monitors only cocoa. Which wider basket should it add?', correct: 'Wheat or flour, fats or oils, and sugar', wrong: ['Only cocoa beans', 'Only potatoes and salt', 'Only coffee and tea'], explanation: 'Biscuits are mainly exposed to flour, fats or oils and sugar, although recipes can contain other ingredients.' },
  { chapter: '1', objective: 'Understand concentration', question: 'Why is cocoa geographic concentration a supply risk?', application: 'Poor weather affects West Africa. Why can the impact become global?', correct: 'Ghana and Côte d’Ivoire together provide over 60% of global cocoa', wrong: ['Every cocoa bean comes from Vietnam', 'Cocoa is made in supermarkets', 'Chocolate uses no farm inputs'], explanation: 'A shock in a region holding a large supply share can affect availability and price across the market.' },
  { chapter: '1', objective: 'Interpret Vietnam exposure', question: 'What does the cited wheat evidence say about Vietnam?', application: 'A local biscuit plant assumes local production removes wheat import risk. What is the correction?', correct: 'Vietnam grows no wheat and flour millers import over 1.8 million tonnes annually', wrong: ['Vietnam exports all global wheat', 'Vietnam biscuits use no flour', 'The figure is an audited factory capacity'], explanation: 'The trade-body evidence points to import dependence, though it should be re-confirmed with primary trade data.' },
  { chapter: '2', objective: 'Evaluate suppliers', question: 'Which is the best basis for supplier qualification?', application: 'The lowest bidder cannot provide traceability or reliable quality. What should the buyer do?', correct: 'Assess technical, safety, delivery and traceability performance as well as price', wrong: ['Approve on price alone', 'Ignore batch documents', 'Remove all specifications'], explanation: 'A low quote does not offset quality, continuity or compliance failure.' },
  { chapter: '2', objective: 'Understand packaging', question: 'Why is packaging treated as an upstream input?', application: 'A wrapper fails to seal on the line. What does this show?', correct: 'Its material and performance must be sourced and specified before manufacturing succeeds', wrong: ['Packaging only matters after consumption', 'The recipe replaces the wrapper', 'Packaging has no shelf-life role'], explanation: 'Packaging is a purchased functional material that must protect the product and run reliably.' },
  { chapter: '2', objective: 'Label company evidence', question: 'What does the roughly 90% Cocoa Life figure describe?', application: 'A slide calls it the sustainable share of all global cocoa. What is the correction?', correct: 'Mondelez’s reported share of cocoa sourced through its company programme', wrong: ['Every manufacturer’s sourcing share', 'Vietnam’s cocoa import share', 'The cocoa production decline'], explanation: 'The figure is company-specific and must not be generalized to the whole industry.' },
  { chapter: '3', objective: 'Assess total cost', question: 'What does total cost of ownership include beyond purchase price?', application: 'A cheaper ingredient creates waste and late deliveries. Which framework reveals the true cost?', correct: 'Quality, logistics, inventory and failure costs and risks', wrong: ['Only the invoice price', 'Only advertising spend', 'Only retail shelf colour'], explanation: 'A sourcing choice should include the wider costs created throughout use and delivery.' },
  { chapter: '3', objective: 'Choose risk tools', question: 'What is dual sourcing designed to reduce?', application: 'One approved supplier is disrupted. Which prior action could improve continuity?', correct: 'Dependence on a single supplier', wrong: ['The need for specifications', 'Every commodity price movement', 'Consumer demand'], explanation: 'A second qualified source can reduce single-supplier disruption risk, though it adds management complexity.' },
  { chapter: '3', objective: 'Interpret cost evidence', question: 'How should Orion’s roughly 70% ingredient-cost increase be used?', application: 'An analyst applies 70% to every Vietnam food maker. What is wrong?', correct: 'Treat it as a reported company example, not an industry-wide cost index', wrong: ['Treat it as an official inflation rate', 'Treat it as global cocoa output', 'Treat it as a retailer margin'], explanation: 'The evidence describes Orion Food Vina’s experience and cannot be generalized without industry data.' },
]);

export const PACKAGED_FOOD_M2_LESSON2_TAKEAWAYS: PackagedFoodTakeaways = {
  learned: 'You can connect product families to their upstream inputs, evaluate suppliers and packaging, and assess cost and continuity risks.',
  keyTakeaways: [
    'Chocolate, biscuits, candy and savoury snacks have different input baskets.',
    'Cocoa concentration and Vietnam’s wheat imports create clear geographic exposure.',
    'Supplier quality, traceability and delivery matter alongside price.',
    'Procurement manages total risk-adjusted cost, not the cheapest quotation.',
  ],
  businessImplications: 'Procurement, Supply Chain, Finance and R&D must coordinate when an input shock affects availability, recipe economics, working capital and shelf price.',
  remember: 'Trace the ingredient to its source, specification, currency and fallback option.',
  nextLesson: 'Midstream Activities',
};
