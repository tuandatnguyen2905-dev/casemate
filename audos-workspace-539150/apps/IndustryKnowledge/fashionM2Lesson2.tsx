import { F2DeepDive, citeF2, f2Chapter, f2Quiz } from './fashionM2Core';
import type { FashionM2LessonBundle } from './fashionM2Core';

const LESSON = '2. Upstream Activities';

const deck = [
  f2Chapter({
    title: 'Raw Materials, Components and Supplier Networks', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the material inputs each product category depends on and explain how supplier qualification shapes quality, cost and risk.',
    mateIntro: 'Nothing downstream can fix a bad material decision. By the time fabric reaches a cutting table, the product’s quality ceiling, its cost floor and most of its supply risk are already set.',
    keyInsight: 'Upstream sourcing decisions influence both product competitiveness and operational risk. Material availability, price volatility, supplier reliability, quality consistency, and environmental standards can affect production schedules, retail prices, and profit margins.',
    statTiles: [
      { value: '4', label: 'Input groups', subtitle: 'Textile, footwear, technical, accessory', description: 'Each category draws on a different material base.' },
      { value: '6', label: 'Qualification criteria', subtitle: 'Before price is discussed', description: 'Capacity, quality, delivery, compliance, cost, and environmental or social standards.' },
      { value: 'Upstream', label: 'Where quality is set', description: 'Material choice fixes the quality ceiling the factory can reach.' },
    ],
    statsNote: 'Counts describe the sourcing framework used in this lesson, not measured material cost shares or supplier numbers.',
    narrative: [
      { label: 'What it is', text: 'Upstream activities cover the supply of raw materials, components and production resources required to manufacture fashion, sports and lifestyle products. These activities establish the foundation for product quality, manufacturing cost, sustainability performance and supply chain reliability.' },
      { label: 'Why it is happening', text: 'Material requirements differ across categories. Apparel depends on fibres, yarns, fabrics, dyes and trims; footwear requires leather, textiles, rubber, foam and synthetic components; lifestyle products may require plastics, metals, wood and specialised packaging. A single sourcing approach cannot serve all three.' },
      { label: 'Real-world example', text: 'Sports and outdoor products add a further layer: technical fabrics, moisture-management materials, insulation, water-resistant coatings and impact-absorbing components support claims that a general-purpose fabric cannot. If the material cannot deliver the property, the performance claim cannot be made at all.' },
      { label: 'Vietnam example', text: 'Vietnam has substantial garment and footwear assembly capacity but sources a significant share of its fabrics, technical textiles and specialised components from abroad. That split matters upstream: a factory can be highly competitive on make cost while still depending on imported inputs for the material properties a buyer specifies.' },
      { label: 'Business impact', text: 'Buyers assess suppliers according to production capacity, quality standards, delivery reliability, compliance, cost and relevant environmental or social requirements. Recycled polyester, responsibly sourced natural fibres and lower-impact alternatives may support sustainability objectives, but only to the extent their actual environmental performance and traceability can be evidenced.' },
    ],
    visualKind: 'fashion-m2-21-materials', visualHeading: 'What the chain consumes before anything is made',
    visualIntro: 'Compare the material base of each input group with what that group actually determines about the finished product.',
    imageAlt: 'Casemate table of raw materials and components across apparel, footwear, sports and lifestyle products',
    keyTerms: [
      { term: 'Trims', definition: 'The non-fabric components of a garment — zips, buttons, labels, thread and fastenings — that affect both cost and finish.' },
      { term: 'Supplier qualification', definition: 'Assessing a supplier on capacity, quality, delivery reliability, compliance, cost and environmental or social standards before placing orders.' },
      { term: 'Technical fabric', definition: 'A textile engineered for a specific property such as moisture management, insulation or water resistance rather than appearance alone.' },
      { term: 'Traceability', definition: 'Documented evidence of where a material came from and how it was produced, required to support a sourcing or sustainability claim.' },
    ],
    recap: [
      'Apparel, footwear, sports and lifestyle products draw on different material bases.',
      'Material choice sets the quality ceiling and much of the cost floor.',
      'Suppliers are qualified on capacity, quality, delivery, compliance, cost and standards.',
      'Sustainable material claims depend on real environmental performance and traceability.',
    ],
    chapterRecap: 'Upstream activities determine the availability, quality and cost of important production inputs. Effective supplier management and material sourcing help retailers maintain product standards, manage risks and support more reliable production planning.',
    deepDiveTitle: 'Why the material decision is the expensive one',
    body: <F2DeepDive paragraphs={[
      'Material and component choices are made early, committed in volume, and very hard to reverse. A fabric selected at development becomes a minimum order quantity, a lead time, a shade standard and a care label; changing it mid-season means re-testing, re-sampling and often re-pricing. That is why upstream decisions carry more downstream consequence than their share of the calendar suggests.',
      'The same logic applies to sustainability claims. A recycled-content statement is only as strong as the chain of documentation behind it, and that documentation has to be designed into the sourcing arrangement rather than requested afterwards. A brand that cannot evidence a material claim has acquired a liability rather than a differentiator.',
    ]} evidence="The research material lists material categories and qualification criteria qualitatively. It supplies no measured material cost share, price index or supplier count, so none are stated here." />,
    sources: citeF2('textileExchange', 'iloSectors', 'moitTrade'),
  }),
  f2Chapter({
    title: 'Sourcing Strategy, Technology and Supply Risks', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare sourcing models and explain the trade-offs between cost, responsiveness, capability and supply continuity.',
    mateIntro: 'Every sourcing decision buys you something and exposes you to something else. The cheapest option usually buys price and sells you lead time; the fastest usually buys speed and sells you margin.',
    keyInsight: 'The optimal sourcing strategy balances cost efficiency with quality, responsiveness, and supply continuity. Excessive dependence on a small number of suppliers or production locations can expose businesses to significant disruption.',
    statTiles: [
      { value: '6', label: 'Sourcing levers', subtitle: 'From global scale to nearshoring', description: 'Each buys one advantage and exposes a different risk.' },
      { value: 'Concentration', label: 'The main avoidable risk', description: 'Dependence on few suppliers or one country magnifies any disruption.' },
      { value: '3', label: 'Balance to strike', subtitle: 'Cost, responsiveness, continuity', description: 'Optimising any one of the three alone weakens the other two.' },
    ],
    statsNote: 'Counts describe the sourcing framework used in this lesson; the research material supplies no measured lead times, freight rates or disruption frequencies.',
    narrative: [
      { label: 'What it is', text: 'Companies use different sourcing models depending on their product categories, required technical capabilities, production volumes, delivery schedules and commercial objectives. Some brands purchase materials directly, while others rely on manufacturers that manage material procurement and production as an integrated service.' },
      { label: 'Why it is happening', text: 'Global sourcing gives access to specialised capabilities, competitive costs and established manufacturing networks. Supplier diversification reduces dependence on a single source. Neither is free: diversification splits volume and raises coordination cost, while concentration lowers cost and raises exposure.' },
      { label: 'Real-world example', text: 'Material prices, minimum order quantities, exchange rates, freight costs and supplier payment terms all influence the total cost of procurement. Procurement platforms and supplier databases can support order tracking, supplier evaluation, document management and communication, while digital records and certification documentation may help monitor material origins and supplier compliance.' },
      { label: 'Vietnam example', text: 'Vietnam is frequently chosen as a diversification destination by buyers reducing concentration elsewhere, which has built capacity but also tied local suppliers to the same global freight routes, trade rules and buyer forecasts. A Vietnamese manufacturer’s risk profile therefore tracks its customers’ sourcing strategy as much as its own operations.' },
      { label: 'Business impact', text: 'Volatile commodity prices, geopolitical developments, trade restrictions, natural disasters, production disruptions and supplier non-compliance can all affect material availability and delivery schedules. Nearshoring or regional sourcing may reduce some transportation and lead-time risk, but it may not offer the lowest production cost or the required technical capabilities.' },
    ],
    visualKind: 'fashion-m2-22-sourcing', visualHeading: 'Every sourcing decision buys something and exposes something',
    visualIntro: 'Read each sourcing lever against both what it delivers and what it puts at risk.',
    imageAlt: 'Casemate table comparing sourcing strategies against the supply risks each one creates',
    keyTerms: [
      { term: 'Supplier diversification', definition: 'Qualifying alternative suppliers or production locations so no single source can halt supply.' },
      { term: 'Minimum order quantity', definition: 'The smallest volume a supplier will produce, which sets the inventory a buyer must commit to per style or colour.' },
      { term: 'Nearshoring', definition: 'Moving production closer to the selling market to shorten lead time and reduce transport risk, usually at higher unit cost.' },
      { term: 'Supply continuity', definition: 'The ability to keep receiving materials and product despite disruption at a supplier, port or production region.' },
    ],
    recap: [
      'Sourcing models vary with category, capability, volume, schedule and objective.',
      'Diversification lowers concentration risk but raises coordination cost.',
      'Procurement technology and traceability records support monitoring, not certainty.',
      'Nearshoring trades unit cost for lead time and transport risk.',
    ],
    chapterRecap: 'Upstream sourcing involves strategic decisions about suppliers, production locations, cost structures and risk exposure. Companies that combine suitable sourcing networks with supplier monitoring and contingency planning can improve supply chain resilience.',
    deepDiveTitle: 'The real cost of a cheap unit price',
    body: <F2DeepDive paragraphs={[
      'A lower factory price is easy to measure and a longer lead time is not, which is why sourcing decisions skew toward cost. But a nine-month lead time means buying against a forecast made before the season started, and the cost of that forecast being wrong shows up later as markdown, not as procurement. Comparing sourcing options on unit price alone systematically understates the option that ships faster.',
      'A defensible comparison puts landed cost, lead time and flexibility in the same table: what the unit costs delivered, how long before it can be on a shelf, and how much of the order can still be changed once demand is visible. For a basic, stable line the cheap long-lead option usually wins. For a trend-sensitive line it frequently loses, because the markdown it causes is larger than the price advantage it gained.',
    ]} evidence="The research material describes sourcing models and risk categories qualitatively and supplies no measured lead times, freight rates or markdown percentages, so none are claimed here." />,
    sources: citeF2('unctadMaritime', 'worldBankLpi', 'betterWork'),
  }),
];

const quiz = f2Quiz('fashion-m2-l2', [
  { chapter: '1', objective: 'Explain what upstream establishes', question: 'What do upstream activities establish for the rest of the chain?', application: 'A team tries to fix product quality at final inspection. Why is that too late?', correct: 'The foundation for product quality, manufacturing cost, sustainability performance and supply reliability', wrong: ['Only the retail price of the finished product', 'Only the store layout and merchandising plan', 'Only the advertising budget for the season'], explanation: 'Upstream activities establish quality, cost, sustainability performance and supply chain reliability. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify apparel inputs', question: 'Which materials does apparel production primarily depend on?', application: 'A bill of materials lists rubber outsoles for a shirt range. What belongs there instead?', correct: 'Fibres, yarns, fabrics, dyes and trims', wrong: ['Rubber outsoles, foam and adhesives', 'Plastics, metals and wood', 'Insulation and impact-absorbing components'], explanation: 'Apparel depends on fibres, yarns, fabrics, dyes and trims. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify footwear components', question: 'Which components does footwear manufacturing require?', application: 'A sourcing plan for trainers lists only fabric. What else is needed?', correct: 'Leather, textiles, rubber, foam and synthetic components', wrong: ['Only cotton yarn and dye', 'Only zippers, buttons and buckles', 'Only packaging and labelling materials'], explanation: 'Footwear requires leather, textiles, rubber, foam and synthetic components. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply supplier qualification', question: 'On what basis do buyers qualify suppliers?', application: 'A buyer selects a supplier on price alone and misses two deliveries. What was skipped?', correct: 'Capacity, quality standards, delivery reliability, compliance, cost and environmental or social requirements', wrong: ['Price per unit considered on its own', 'Factory size measured in floor area', 'Length of time the supplier has traded'], explanation: 'Suppliers are assessed on capacity, quality, delivery reliability, compliance, cost and relevant environmental or social requirements. Review Chapter 1.' },
  { chapter: '1', objective: 'Evaluate sustainable sourcing claims', question: 'What determines whether a sustainable material claim holds?', application: 'A brand advertises recycled content but cannot document its origin. What is the problem?', correct: 'Its actual environmental performance and traceability', wrong: ['The size of the marketing campaign behind it', 'The retail price premium charged for it', 'The number of colours offered in the range'], explanation: 'Lower-impact alternatives support sustainability objectives only to the extent their actual performance and traceability can be evidenced. Review Chapter 1.' },
  { chapter: '2', objective: 'Balance the sourcing strategy', question: 'What does an effective sourcing strategy balance?', application: 'A company optimises purely for the lowest unit cost. What is it risking?', correct: 'Cost efficiency against quality, responsiveness and supply continuity', wrong: ['Unit cost against advertising reach', 'Store rent against staffing levels', 'Packaging design against label compliance'], explanation: 'The optimal strategy balances cost efficiency with quality, responsiveness and supply continuity. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify concentration risk', question: 'What is the main risk of depending on very few suppliers or locations?', application: 'One port closes and a retailer cannot ship a whole season. What exposed it?', correct: 'Significant exposure to disruption at a single point', wrong: ['Higher coordination cost across partners', 'Loss of access to specialised capability', 'Automatic failure of quality inspection'], explanation: 'Excessive dependence on a small number of suppliers or production locations exposes a business to significant disruption. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify procurement cost drivers', question: 'Which factors influence the total cost of procurement?', application: 'A buyer compares factory quotes and ignores everything else. What is missing?', correct: 'Material prices, minimum order quantities, exchange rates, freight costs and payment terms', wrong: ['Only the quoted factory price per unit', 'Only the store rent in the selling market', 'Only the advertising cost per impression'], explanation: 'Material prices, minimum order quantities, exchange rates, freight costs and payment terms all influence procurement cost. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify supply risks', question: 'Which developments can disrupt material availability and delivery schedules?', application: 'A supplier misses a window after a trade restriction changes. Which risk group is this?', correct: 'Commodity price volatility, geopolitical change, trade restrictions, disasters, production disruption and non-compliance', wrong: ['Only seasonal changes in consumer taste', 'Only competitor discounting in the market', 'Only store opening hours and staffing levels'], explanation: 'Volatile prices, geopolitics, trade restrictions, disasters, production disruption and supplier non-compliance all affect availability. Review Chapter 2.' },
  { chapter: '2', objective: 'Assess nearshoring trade-offs', question: 'What trade-off does nearshoring or regional sourcing involve?', application: 'A brand moves production closer to market and unit cost rises. Was that expected?', correct: 'Lower transport and lead-time risk, but not always the lowest cost or the needed capability', wrong: ['Lower cost and lower risk with no trade-off', 'Higher cost with no reduction in lead time', 'Identical cost, lead time and capability'], explanation: 'Nearshoring may reduce transport and lead-time risk but may not offer the lowest cost or required technical capabilities. Review Chapter 2.' },
]);

export const LESSON_2_2: FashionM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can identify the material inputs behind each product category, apply supplier qualification criteria, and weigh sourcing strategies against the risks they create.',
    keyTakeaways: [
      'Material choice sets the quality ceiling and most of the cost floor before production starts.',
      'Suppliers are qualified on capacity, quality, delivery, compliance, cost and standards.',
      'Sustainability claims need traceability designed in, not requested afterwards.',
      'Diversification reduces concentration risk and raises coordination cost.',
      'Nearshoring buys lead time and sells unit cost; neither option is free.',
    ],
    businessImplications: 'Compare sourcing options on landed cost, lead time and flexibility together: unit price alone systematically favours the long-lead option and hides the markdown it causes on trend-sensitive lines.',
    remember: 'Nothing downstream can repair an upstream material decision.',
    nextLesson: 'Midstream Activities',
  },
};
