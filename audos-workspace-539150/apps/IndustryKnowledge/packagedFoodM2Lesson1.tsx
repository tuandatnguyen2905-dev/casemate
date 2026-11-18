import { chapter, citePfM2, pairedQuiz, EvidenceNote } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.1 Value Chain Overview';

export const PACKAGED_FOOD_M2_LESSON1_DECK: PackagedFoodCardData[] = [
  chapter({
    title: 'From Raw Ingredients to Packaged Food Products',
    chapterTitle: LESSON,
    readingTime: '5',
    objective: 'Map the upstream, midstream and downstream stages that turn agricultural inputs into packaged food.',
    mateIntro: 'A biscuit on a shop shelf is the end of a long journey. Crops, packaging, factory work, logistics and selling must all connect before the pack reaches a shopper.',
    keyInsight: 'The value chain has three linked blocks: upstream supplies inputs, midstream converts them, and downstream brings finished products to market.',
    narrative: [
      { label: 'What it is', text: 'A value chain is the full set of activities that turns raw inputs into a product a customer can buy. In packaged food, the three broad blocks are upstream, midstream and downstream.' },
      { label: 'How it works', text: 'Upstream supplies cocoa, wheat, sugar, oils, dairy, grains and packaging. Midstream uses category-specific processes such as baking, conching, boiling or extrusion, then checks and packs the product. Downstream distributes, markets and sells it.' },
      { label: 'Global example', text: 'A chocolate chain can run from cocoa farms and traders to cocoa grinding, chocolate making, packaging, distributors and retailers. Cocoa output fell sharply in 2023/24, showing how an upstream shock can reach the whole chain.' },
      { label: 'Vietnam example', text: 'A biscuit sold in Vietnam may combine globally traded ingredients with local manufacturing, local packaging and distribution through supermarkets, convenience stores and family-run shops.' },
      { label: 'Why it matters', text: 'The map shows where a delay or cost shock begins. It also shows where Procurement, Manufacturing, Quality, Sales and Brand teams work.' },
    ],
    visualKind: 'packaged-food-m2-21-1',
    visualHeading: 'Follow one pack through three blocks',
    visualIntro: 'Trace ingredients and packaging into the plant, then follow the finished product to the shopper.',
    imageAlt: 'Packaged food value chain from agricultural and packaging inputs through manufacturing to distribution and retail',
    statTiles: [
      { value: '4.461 Mt', label: 'World cocoa production, 2023/24', subtitle: 'Down 11.7% year on year', description: 'ICCO projection reported by BusinessGhana; an upstream industry measure, not company output.' },
      { value: '~US$3.73tn', label: 'Broad packaged-food estimate, 2025', subtitle: 'Commercial vendor estimate', description: 'Shows the broad market served by many value chains; it does not measure value captured at each stage.' },
    ],
    keyTerms: [
      { term: 'Value chain', definition: 'The linked activities that create and deliver a product from inputs to the final customer.' },
      { term: 'Upstream', definition: 'Agricultural ingredients, packaging materials, equipment and supplier activities before manufacturing.' },
      { term: 'Midstream', definition: 'Processing, formulation, quality control and packaging inside or close to manufacturing.' },
      { term: 'Downstream', definition: 'Distribution, wholesale, retail, marketing and the final route to the shopper.' },
    ],
    recap: [
      'Upstream supplies ingredients and packaging.',
      'Midstream converts inputs into safe, standardised products.',
      'Downstream creates access and demand.',
      'A shock in one block can affect the others.',
    ],
    chapterRecap: 'Start with the three-block map, then identify the category-specific process and risk inside each block.',
    deepDiveTitle: 'Why one chain contains several product systems',
    body: (
      <div className="space-y-4">
        <p>Biscuits, chocolate, candy and savoury snacks share the same broad chain, but they do not use the same conversion step. Biscuits are baked; chocolate is refined, conched and tempered; candy is boiled and formed; many savoury snacks are fried or extruded. That difference changes equipment, skills, energy use and shelf-life management.</p>
        <p>The chain is also global and local at the same time. Commodities can cross borders, while manufacturing and distribution are often placed near consumers. This lets a company adapt taste and pack size locally, but it does not remove exposure to global ingredient prices.</p>
        <EvidenceNote>The research did not quantify how much value each stage captures, and it did not verify a Vietnam-wide value-added or employment figure. The US$3.73tn figure is a broad commercial market estimate, not an official value-chain measure.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s01', 'pf-m02-s08'),
  }),
  chapter({
    title: 'Who Creates Value Across the Supply Chain?',
    chapterTitle: LESSON,
    readingTime: '5',
    objective: 'Identify the main participants and explain how each one adds value or manages risk.',
    mateIntro: 'The farmer does not make the wrapper, the factory does not own every shop, and the retailer does not develop the recipe. Value appears when specialists coordinate.',
    keyInsight: 'Participants create different forms of value: supply, transformation, assurance, availability, information and brand preference.',
    narrative: [
      { label: 'What it is', text: 'The chain includes farmers, commodity traders, ingredient and packaging suppliers, manufacturers, co-packers, logistics firms, distributors, retailers, e-commerce platforms and service partners.' },
      { label: 'How it works', text: 'Farmers produce commodities; traders aggregate and move them; suppliers prepare usable inputs; manufacturers create consistent SKUs; quality teams protect safety; distributors create reach; retailers provide access; marketing builds demand.' },
      { label: 'Global example', text: 'A global chocolate company may combine cocoa sourced across producer countries with central procurement, regional factories and local retailers. Its brand and distribution can capture value beyond the raw cocoa itself.' },
      { label: 'Vietnam example', text: 'A manufacturer serving Vietnam may use distributors to break bulk and reach many small outlets, while modern retailers offer fewer, larger accounts with data and planned promotions.' },
      { label: 'Why it matters', text: 'Knowing each participant’s role helps a manager find the real bottleneck: supply security, factory performance, distributor reach, shelf access or consumer demand.' },
    ],
    visualKind: 'packaged-food-m2-21-2',
    visualHeading: 'Match participants to the value they add',
    visualIntro: 'See how physical transformation, risk control, reach and brand work together.',
    imageAlt: 'Stakeholder map linking farmers, suppliers, manufacturers, distributors, retailers and consumers',
    statTiles: [
      { value: '+7.4%', label: 'Mondelez chocolate revenue, FY2024', subtitle: 'Company result', description: 'A corporate growth figure illustrating branded value capture; it is not an industry growth rate or margin.' },
    ],
    keyTerms: [
      { term: 'Ingredient supplier', definition: 'A business that turns farm commodities into materials suitable for food manufacturing.' },
      { term: 'Co-packer', definition: 'A company that manufactures or packs products for another brand owner.' },
      { term: 'Distributor', definition: 'A partner that holds stock, serves outlets and may provide credit and local delivery.' },
      { term: 'Value creation', definition: 'Making an input more useful through transformation, assurance, access, information or preference.' },
    ],
    recap: [
      'Every participant performs a different job.',
      'Manufacturers add formulation, consistency, safety and branding.',
      'Distributors and retailers create availability.',
      'Company results must not be presented as industry benchmarks.',
    ],
    chapterRecap: 'Value does not come only from making the food; it also comes from trust, reach and demand.',
    deepDiveTitle: 'Where value and bargaining power differ',
    body: (
      <div className="space-y-4">
        <p>Raw-material production is often commodity-based, while a branded product can earn a premium through a reliable recipe, familiar pack and wide distribution. That does not mean farmers are unimportant. Without secure, responsible supply, the manufacturer cannot make the product at all.</p>
        <p>Bargaining power can shift. A scarce ingredient can strengthen suppliers; a large retailer can demand better terms; a well-known brand can negotiate for shelf space. Managers therefore need to distinguish creating value from capturing profit.</p>
        <EvidenceNote>The research supports the participant map but does not provide a primary-verified percentage split of value or profit by stage. Mondelez’s 7.4% figure is company chocolate-revenue growth, not a chain-wide result.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s08'),
  }),
  chapter({
    title: 'How Materials, Products, Information, and Money Flow',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Trace the four connected flows and explain why information must move faster than physical goods.',
    mateIntro: 'A truck carries products forward, but the order that filled the truck and the payment that funds the next batch move in different directions.',
    keyInsight: 'Materials and products move mainly forward, money moves mainly backward, and information must move both ways to coordinate supply with demand.',
    narrative: [
      { label: 'What it is', text: 'Four flows connect the chain: materials, finished products, information and money. A fifth management lens is risk, because delays or errors can travel across all four.' },
      { label: 'How it works', text: 'Ingredients and packaging move to the factory; products move to distributors, retailers and shoppers. Payments return toward manufacturers and suppliers. Orders, forecasts, quality records and point-of-sale data move in both directions.' },
      { label: 'Global example', text: 'When cocoa supply tightens, production data and price signals reach buyers before every physical contract resets. Procurement, finance and commercial teams must coordinate the response.' },
      { label: 'Vietnam example', text: 'A promotion in Vietnam can generate store orders that move back through a distributor to the manufacturer. If that information arrives late, shelves can empty even when total factory capacity is sufficient.' },
      { label: 'Why it matters', text: 'Good flow coordination reduces shortages, excess inventory, waste and cash tied up in stock. It also helps a company respond without confusing a supply problem with a demand problem.' },
    ],
    visualKind: 'packaged-food-m2-21-3',
    visualHeading: 'See four flows on one chain',
    visualIntro: 'Follow goods forward, cash backward and information in both directions.',
    imageAlt: 'Bidirectional flow diagram showing materials and products, information and money across a packaged food chain',
    keyTerms: [
      { term: 'Demand forecast', definition: 'An estimate of future sales used to plan purchasing, production and inventory.' },
      { term: 'Point-of-sale data', definition: 'Information about products sold to shoppers at retail.' },
      { term: 'Working capital', definition: 'Cash tied up in day-to-day operations, including inventory and amounts owed by customers.' },
      { term: 'Traceability', definition: 'The ability to follow materials and products through defined stages and batches.' },
    ],
    recap: [
      'Materials and products move mainly toward the shopper.',
      'Money moves back toward retailers, manufacturers and suppliers.',
      'Information moves both ways.',
      'Better coordination reduces stockouts, waste and trapped cash.',
    ],
    chapterRecap: 'The physical chain performs only as well as the information and payment systems that coordinate it.',
    deepDiveTitle: 'What happens when the flows lose sync',
    body: (
      <div className="space-y-4">
        <p>If demand data arrives late, a factory may make the wrong SKU or pack size. If payment is delayed, a distributor or supplier may lack cash to replenish. If batch information is incomplete, a quality issue can force a wider recall than necessary.</p>
        <p>Management trainees can use a simple diagnostic: identify which flow failed, where the failure began and which partner needs a faster or more accurate signal. This turns a broad “supply-chain problem” into a specific operating question.</p>
        <EvidenceNote>The lesson does not quote an outlet count for Orion or any other Vietnam manufacturer. The research explicitly removed an unverified distribution-network figure, so the example remains qualitative.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s08'),
  }),
];

export const PACKAGED_FOOD_M2_LESSON1_QUIZ: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l1', [
  { chapter: '1', objective: 'Map the chain', question: 'Which sequence correctly maps the packaged-food value chain?', application: 'A team places retail before manufacturing. How should the sequence be corrected?', correct: 'Upstream inputs → midstream conversion → downstream distribution and sale', wrong: ['Retail → farming → packaging', 'Marketing → ingredients → factory', 'Consumer → retailer → raw materials'], explanation: 'Inputs are supplied upstream, converted midstream and moved to market downstream.' },
  { chapter: '1', objective: 'Separate category processes', question: 'Why should chocolate and biscuits not be treated as identical production systems?', application: 'A factory plan applies a biscuit tunnel oven process to a chocolate bar. What is the core error?', correct: 'Their category-defining conversion processes and equipment differ', wrong: ['They can never share retailers', 'Only biscuits use packaging', 'Chocolate has no ingredients'], explanation: 'Biscuits are baked, while chocolate requires processes such as refining, conching and tempering.' },
  { chapter: '1', objective: 'Connect shocks across stages', question: 'How can a cocoa production decline affect downstream companies?', application: 'A retailer asks why an upstream crop problem matters at the shelf. What is the best answer?', correct: 'It can raise or constrain a key chocolate input and pressure cost, supply and pricing', wrong: ['It automatically increases biscuit output', 'It removes the need for distribution', 'It fixes retail demand'], explanation: 'Upstream availability and cost can transmit through manufacturing and commercial decisions.' },
  { chapter: '2', objective: 'Identify participant roles', question: 'What value does a distributor usually add?', application: 'A brand needs to serve many small stores. Which partner capability is most relevant?', correct: 'Holding stock, breaking bulk and delivering to outlets', wrong: ['Growing every agricultural input', 'Writing global food law', 'Replacing all consumer marketing'], explanation: 'Distributors create reach and local service between manufacturers and fragmented outlets.' },
  { chapter: '2', objective: 'Distinguish value creation', question: 'Which activity is a manufacturer’s core form of value creation?', application: 'Raw ingredients vary, but shoppers expect the same snack each time. Which capability closes the gap?', correct: 'Turning inputs into a safe, consistent and branded SKU', wrong: ['Making weather predictable', 'Eliminating every retailer', 'Setting all commodity prices'], explanation: 'Formulation, processing, quality and branding create a repeatable consumer product.' },
  { chapter: '2', objective: 'Interpret company evidence', question: 'What does Mondelez’s 7.4% FY2024 chocolate revenue growth represent here?', application: 'A slide calls 7.4% the industry margin. What correction is required?', correct: 'A company chocolate-revenue growth figure, not an industry margin', wrong: ['A cocoa farm yield', 'A Vietnam market share', 'A retail discount'], explanation: 'Corporate revenue growth must remain labelled as company evidence and not be generalized to the industry.' },
  { chapter: '3', objective: 'Trace physical flow', question: 'In which direction do ingredients and finished products mainly move?', application: 'A process map points finished packs from shoppers back to farms. What should change?', correct: 'Forward from suppliers through factories and channels toward shoppers', wrong: ['Only backward toward farms', 'Only between banks', 'They do not move between stages'], explanation: 'The main physical flow runs from raw inputs toward the final customer.' },
  { chapter: '3', objective: 'Trace money flow', question: 'In which direction does money mainly move?', application: 'A shopper pays a retailer. How does that cash connect to upstream participants?', correct: 'Backward through the channel toward manufacturers, suppliers and farmers', wrong: ['Forward from farms to shoppers only', 'Only from factories to retailers', 'It never reaches suppliers'], explanation: 'Customer payments move back through commercial relationships along the chain.' },
  { chapter: '3', objective: 'Use information flow', question: 'Why must information move in both directions?', application: 'A promotion sells faster than forecast. Which signal should move upstream quickly?', correct: 'Orders and point-of-sale data so supply can respond to demand', wrong: ['Only package colours', 'Only historic weather with no order data', 'No signal until inventory is exhausted'], explanation: 'Demand data moves upstream while supply, quality and delivery information moves downstream.' },
  { chapter: '3', objective: 'Diagnose coordination', question: 'What is a likely result when product and information flows lose sync?', application: 'A factory has capacity but stores run out of one SKU. What should the team inspect first?', correct: 'Forecast, order and replenishment signals for that SKU', wrong: ['Whether cocoa is classified as a retailer', 'Whether money always moves forward', 'Whether consumers can manufacture it'], explanation: 'A stockout can result from slow or inaccurate demand and replenishment information, even when capacity exists.' },
]);

export const PACKAGED_FOOD_M2_LESSON1_TAKEAWAYS: PackagedFoodTakeaways = {
  learned: 'You can map the three value-chain blocks, identify who creates value and trace materials, products, information and money.',
  keyTakeaways: [
    'Upstream supplies inputs, midstream converts them and downstream creates market access.',
    'Category-specific processes make biscuit, chocolate, candy and snack chains different.',
    'Manufacturers, distributors and retailers create different forms of value.',
    'Goods move forward, money backward and information both ways.',
  ],
  businessImplications: 'A useful value-chain diagnosis names the stage, participant and flow where a problem begins instead of treating every issue as a general supply-chain failure.',
  remember: 'Map the block, participant and flow before proposing a solution.',
  nextLesson: 'Upstream Activities',
};
