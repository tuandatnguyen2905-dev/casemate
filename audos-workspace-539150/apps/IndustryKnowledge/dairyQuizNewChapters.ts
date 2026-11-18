import type { DairyQuizQuestion } from './dairyQuizCore';

/**
 * Knowledge-check seeds for the chapters the dairy-full-v1 re-chaptering ADDED. Those chapters
 * inherit no source chapter (`legacyIndexes: []`), so no legacy seed in the dairyQuiz*.ts files can
 * map to them and they would otherwise show "Under Preparation".
 *
 * `chapter` here is the NEW, lesson-local, 1-based chapter number. These questions are appended by
 * standardizeDairyQuiz after the legacy remapping, so they are never renumbered. Each seed is grounded
 * only in the text that chapter displays (its single concept: summary, points, detail, why it matters).
 */
interface DairyNewChapterSeed {
  chapter: number;
  objective: string;
  question: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
}

const OPTION_IDS = ['a', 'b', 'c', 'd'];

let nextCorrectPosition = 0;

function newChapterQuiz(prefix: string, seeds: DairyNewChapterSeed[]): DairyQuizQuestion[] {
  return seeds.map((seed, index) => {
    const position = nextCorrectPosition % OPTION_IDS.length;
    nextCorrectPosition += 1;
    const texts = [...seed.wrong];
    texts.splice(position, 0, seed.correct);
    return {
      id: `${prefix}-c${seed.chapter}-${index + 1}`,
      question: seed.question,
      options: texts.map((text, optionIndex) => ({ id: OPTION_IDS[optionIndex], text })),
      correctOptionId: OPTION_IDS[position],
      explanation: seed.explanation,
      moduleId: String(seed.chapter),
      objective: seed.objective,
    };
  });
}

const M01_L1_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Explain what makes dairy both a stable everyday market and a competitive one.',
    question: 'Which of these is one of the five characteristics that make dairy both a stable everyday market and a highly competitive one?',
    correct: 'Quality-sensitive purchasing: safety, nutrition, taste, brand reputation, and suitability influence consumer decisions',
    wrong: [
      'Single-use demand: dairy products serve only household drinking needs',
      'Price-only purchasing: safety, taste, and brand play no role in buying decisions',
      'Fixed costs: raw milk, feed, packaging, and energy prices never change',
    ],
    explanation: 'The chapter lists quality-sensitive purchasing among the five characteristics: safety, nutrition, taste, brand reputation, and suitability all influence what consumers buy.',
  },
  {
    chapter: 2,
    objective: 'Explain what makes dairy both a stable everyday market and a competitive one.',
    question: 'According to this chapter, why does dairy performance depend on differentiation, trust, and cost control?',
    correct: 'Because demand is steady, so demand growth alone does not decide results',
    wrong: [
      'Because demand falls sharply every year, so companies must cut prices to survive',
      'Because regulation sets every brand\'s price, leaving nothing else to compete on',
      'Because dairy products are bought only by industrial customers',
    ],
    explanation: 'Demand is steady, so performance depends on differentiation, trust, and cost control rather than on demand growth alone.',
  },
  {
    chapter: 3,
    objective: 'Describe what liquid milk covers within the dairy industry.',
    question: 'Which products does the chapter list within the liquid milk segment?',
    correct: 'Pasteurized fresh milk, UHT milk, reconstituted milk, and ready-to-drink nutritional beverages',
    wrong: [
      'Yogurt, cheese, butter, and cream',
      'Infant formula, milk powder, and specialized adult nutrition',
      'Plant-based drinks made from soy, oat, and almond',
    ],
    explanation: 'Liquid milk covers everyday milk for households and general consumers: pasteurized fresh milk, UHT milk, reconstituted milk, and ready-to-drink nutritional beverages.',
  },
  {
    chapter: 3,
    objective: 'Describe what liquid milk covers within the dairy industry.',
    question: 'Why do distribution reach and brand recognition decide success in the liquid milk segment?',
    correct: 'High purchase frequency and broad availability make them decisive',
    wrong: [
      'Liquid milk is bought rarely, so each sale must carry a very high margin',
      'Liquid milk is sold through only a few specialist outlets',
      'Brand does not matter because buyers choose on shelf life alone',
    ],
    explanation: 'Because liquid milk is consumed frequently and is widely available, distribution reach and brand recognition are decisive in this segment.',
  },
];

const M01_L2_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Identify the technologies that reshaped dairy processing and preservation.',
    question: 'Which four technologies does the chapter say reshaped the entire dairy industry?',
    correct: 'Pasteurization, UHT processing, aseptic packaging, and automated dairy farming',
    wrong: [
      'Pasteurization, homogenization, freeze-drying, and cold storage',
      'UHT processing, plant-based formulation, e-commerce, and organic certification',
      'Aseptic packaging, cheese ripening, feed additives, and robotic delivery',
    ],
    explanation: 'The four breakthroughs named are pasteurization, ultra-high-temperature (UHT) processing, aseptic packaging, and automated dairy farming.',
  },
  {
    chapter: 2,
    objective: 'Identify the technologies that reshaped dairy processing and preservation.',
    question: 'What do aseptic packaging systems do for processed milk?',
    correct: 'They protect it from recontamination, extending shelf life and facilitating transportation',
    wrong: [
      'They heat it rapidly at very high temperatures to achieve commercial sterility',
      'They reduce harmful microorganisms through heat treatment to improve safety',
      'They support consistent milking and herd management on the farm',
    ],
    explanation: 'Aseptic packaging protects processed milk from recontamination, which extends shelf life and makes transportation easier. The other options describe UHT, pasteurization, and automated farming.',
  },
  {
    chapter: 3,
    objective: 'Explain why early constraints still shape Vietnam\'s dairy industry.',
    question: 'Why did Vietnam historically have a less-developed dairy cattle sector?',
    correct: 'Hot and humid weather makes cattle management and milk productivity difficult, and farming tradition was limited',
    wrong: [
      'Moc Chau\'s highland conditions prevented dairy farming in the north',
      'Domestic manufacturers never expanded their processing capacity',
      'The climate was ideal for cattle, so limited tradition came down to cost alone',
    ],
    explanation: 'The chapter attributes the less-developed sector to climate and geography: hot, humid weather creates challenges for cattle management and milk productivity, alongside limited dairy farming tradition.',
  },
  {
    chapter: 3,
    objective: 'Explain why early constraints still shape Vietnam\'s dairy industry.',
    question: 'Why do Vietnam\'s early dairy constraints of climate, geography, and limited tradition still matter today?',
    correct: 'They still shape Vietnam\'s current import dependence and investment priorities',
    wrong: [
      'They have been fully removed by modern farming and no longer affect decisions',
      'They matter only for historical records, not for current decisions',
      'They explain why domestic production now covers all of Vietnam\'s dairy demand',
    ],
    explanation: 'The early constraints still shape Vietnam\'s current import dependence and investment priorities.',
  },
];

const M01_L3_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Recognise the headwinds that affect measured global dairy market performance.',
    question: 'Which concerns does the chapter link to changing dietary preferences that influence dairy product development and demand?',
    correct: 'Plant-based alternatives and concerns about sugar, lactose, and environmental impact',
    wrong: [
      'Fortified milk and premium pricing',
      'Aseptic packaging and recontamination risk',
      'Cooperative ownership and farmer milk pooling',
    ],
    explanation: 'Changing dietary preferences include plant-based alternatives and concerns about sugar, lactose, and environmental impact, which influence product development and demand.',
  },
  {
    chapter: 2,
    objective: 'Recognise the headwinds that affect measured global dairy market performance.',
    question: 'What do the structural headwinds explain about the global dairy market?',
    correct: 'Why the overall growth rate can be low even when underlying demand is stable',
    wrong: [
      'Why dairy demand has collapsed in every region',
      'Why international prices for milk powder never change',
      'Why plant-based alternatives have fully replaced dairy',
    ],
    explanation: 'Commodity volatility, inflation and affordability pressure, and changing dietary preferences explain why overall growth can be low even when underlying demand is stable.',
  },
  {
    chapter: 4,
    objective: 'Explain how urbanization is reshaping Southeast Asian dairy demand.',
    question: 'How does the chapter describe the structural change in urbanization-driven dairy markets?',
    correct: 'They are moving from unpackaged to branded and from basic to premium',
    wrong: [
      'They are moving from branded to unpackaged and from premium to basic',
      'They are growing in size but not changing in structure',
      'They are moving from imported dairy to exclusively domestic dairy',
    ],
    explanation: 'Urbanization-driven markets are not just growing in size; they are changing in structure, moving from unpackaged to branded and from basic to premium.',
  },
  {
    chapter: 4,
    objective: 'Explain how urbanization is reshaping Southeast Asian dairy demand.',
    question: 'Which nutrition and health interests does the chapter say create opportunities for product differentiation in Southeast Asia?',
    correct: 'Protein, digestive health, and reduced-sugar products',
    wrong: [
      'Higher-fat, longer-shelf-life, and bulk-pack products',
      'High-sugar, unfortified, and unbranded products',
      'Unpackaged raw milk sold at traditional markets',
    ],
    explanation: 'Interest in protein, digestive health, and reduced-sugar products creates opportunities for product differentiation among nutrition-aware consumers.',
  },
];

const M01_L4_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Identify the constraints on growth and profitability in the Vietnam dairy market.',
    question: 'Why does dependence on imported ingredients constrain Vietnamese dairy manufacturers?',
    correct: 'It exposes them to international price fluctuations and foreign exchange movements',
    wrong: [
      'It guarantees stable costs through fixed long-term contracts',
      'It removes competition from multinational brands',
      'It insulates them from commodity price changes',
    ],
    explanation: 'Dependence on imported ingredients exposes manufacturers to international price fluctuations and foreign exchange movements.',
  },
  {
    chapter: 2,
    objective: 'Identify the constraints on growth and profitability in the Vietnam dairy market.',
    question: 'What do the affordability, competition, and input-cost constraints explain?',
    correct: 'Why market value growth does not automatically improve profit margins for all players',
    wrong: [
      'Why Vietnamese households have stopped buying dairy products',
      'Why imported products have disappeared from the market',
      'Why every player\'s profit margin rises whenever market value rises',
    ],
    explanation: 'These constraints explain why market value growth does not automatically translate to profit margin improvement for all players.',
  },
  {
    chapter: 4,
    objective: 'Recognise the consumer preference shifts reshaping Vietnam\'s dairy demand.',
    question: 'Which three preference shifts does the chapter say are reshaping Vietnam\'s dairy demand?',
    correct: 'Health-oriented choices, premium and specialized products, and convenience',
    wrong: [
      'Lower prices, larger bulk packs, and longer shelf life',
      'Unpackaged products, regional brands, and seasonal supply',
      'Wet-market sales, loose milk, and cash pricing',
    ],
    explanation: 'The three shifts are health-oriented choices, premium and specialized products, and convenience.',
  },
  {
    chapter: 4,
    objective: 'Recognise the consumer preference shifts reshaping Vietnam\'s dairy demand.',
    question: 'What opportunity do emerging consumer preferences open for Vietnamese dairy brands?',
    correct: 'Premium-tier opportunities that command higher margins than mainstream liquid milk',
    wrong: [
      'Lower margins than mainstream liquid milk, offset by bulk volume',
      'Mass-market pricing that replaces liquid milk',
      'A shift toward unpackaged raw milk',
    ],
    explanation: 'Emerging preferences are opening premium-tier opportunities that command higher margins than mainstream liquid milk.',
  },
];

const M02_L1_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Group the five value chain stages into operational layers.',
    question: 'How are the five stages of the dairy value chain commonly grouped?',
    correct: 'Into three operational layers: upstream, midstream, and downstream',
    wrong: [
      'Into two layers: farm gate and retail',
      'Into four layers by product type: liquid, powder, yogurt, and cheese',
      'Into a single continuous layer with no grouping',
    ],
    explanation: 'The five stages are commonly grouped into three operational layers: upstream, midstream, and downstream.',
  },
  {
    chapter: 2,
    objective: 'Group the five value chain stages into operational layers.',
    question: 'Which activities does the chapter place in the midstream layer?',
    correct: 'Processing and packaging',
    wrong: [
      'Ingredient supply and farm production',
      'Distribution, marketing, and reaching consumers',
      'Regulatory approval and brand licensing',
    ],
    explanation: 'Midstream covers processing and packaging. Upstream is ingredient supply and farm production, and downstream is distribution, marketing, and reaching consumers.',
  },
];

const M03_L1_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Describe how the farmer-owned cooperative model works.',
    question: 'Which description fits the farmer-owned cooperative model in this chapter?',
    correct: 'Members supply the milk and share in the cooperative\'s ownership structure and economic results',
    wrong: [
      'Independent contractors supply milk but hold no ownership stake',
      'Retailers own the cooperative and set the price paid for milk',
      'A government agency collects all milk and distributes the profits',
    ],
    explanation: 'In a farmer-owned cooperative, members supply the milk and participate in the cooperative\'s ownership structure and economic performance.',
  },
  {
    chapter: 2,
    objective: 'Describe how the farmer-owned cooperative model works.',
    question: 'Because members supply the milk, what must a farmer-owned cooperative do?',
    correct: 'Find a market for all member milk',
    wrong: [
      'Refuse member milk whenever demand is low',
      'Buy milk only from farms that are not members',
      'Pass the risk of unsold milk back to retailers',
    ],
    explanation: 'Members supply the milk and share in results, so the cooperative must find a market for all member milk. This ties raw milk supply to its owners, which stabilizes supply but shapes pricing and investment decisions.',
  },
];

const M04_L1_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Explain how capital requirements act as a barrier to entry.',
    question: 'Which investments make capital requirements a barrier to entering dairy at national scale?',
    correct: 'Farms, processing facilities, UHT production lines, quality assurance systems, and distribution infrastructure',
    wrong: [
      'Only brand advertising campaigns and sponsorships',
      'Only licence and regulatory filing fees',
      'Only retailer shelf-listing fees',
    ],
    explanation: 'Farms, processing facilities, UHT production lines, quality assurance systems, and distribution infrastructure all require substantial investment, which slows entry at national scale.',
  },
  {
    chapter: 2,
    objective: 'Explain how capital requirements act as a barrier to entry.',
    question: 'What effect does heavy upfront investment have on competition in dairy?',
    correct: 'It protects incumbents and slows new entrants',
    wrong: [
      'It speeds up new entry by lowering fixed costs',
      'It has no effect on competition',
      'It protects only importers of finished products',
    ],
    explanation: 'Heavy upfront investment protects incumbents and slows new entrants.',
  },
];

const M05_L1_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Interpret premiumization as a driver of dairy demand.',
    question: 'Which products does the chapter name as examples of expanding premium dairy demand?',
    correct: 'Organic milk, milk from environmentally managed farms, and A2-protein milk',
    wrong: [
      'Reconstituted milk, bulk powder, and low-price UHT multipacks',
      'Unpackaged raw milk sold at wet markets',
      'Plant-based drinks made from soy, oat, and almond',
    ],
    explanation: 'Demand is expanding for higher-value products such as organic milk, milk from environmentally managed farms, and A2-protein milk.',
  },
  {
    chapter: 2,
    objective: 'Interpret premiumization as a driver of dairy demand.',
    question: 'What limit does the chapter place on premium dairy demand?',
    correct: 'Actual demand varies with income level and consumer awareness',
    wrong: [
      'Premium demand is the same across every income level',
      'Premium products can be sold only through online channels',
      'Premium demand has disappeared because consumers care only about price',
    ],
    explanation: 'Premium demand is real but narrow: actual demand varies by income level and consumer awareness, so companies should target segments able to pay.',
  },
];

const M05_L2_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Explain what automated milking offers dairy farms and what limits it.',
    question: 'What benefits do automated milking systems offer, according to the chapter?',
    correct: 'Less repetitive manual work and information about individual animals',
    wrong: [
      'They remove the need for feeding and herd-management systems',
      'They lower investment needs for smaller farms',
      'They replace animal health management entirely',
    ],
    explanation: 'Automated milking can reduce reliance on repetitive manual tasks and collect information about individual animals, and integrated with feeding and herd-management systems it helps monitor productivity and animal health.',
  },
  {
    chapter: 2,
    objective: 'Explain what automated milking offers dairy farms and what limits it.',
    question: 'What does automation shift, so that farm scale and technical support decide the payback?',
    correct: 'Cost from labor to capital',
    wrong: [
      'Cost from capital to labor',
      'Cost from feed to packaging',
      'Cost from farms to retailers',
    ],
    explanation: 'Automation shifts cost from labor to capital, so farm scale and technical support decide the payback. High initial investment and maintenance can limit adoption among smaller farms.',
  },
];

const M05_L3_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Assess the role of e-commerce and direct-to-consumer channels in dairy.',
    question: 'How can subscription models and recurring orders help dairy companies, according to the chapter?',
    correct: 'They may support customer retention',
    wrong: [
      'They remove the need for temperature control',
      'They replace supermarkets and convenience stores entirely',
      'They eliminate fulfillment costs',
    ],
    explanation: 'Subscription models and recurring orders may support customer retention, while online promotions and customer data can help companies personalize offers.',
  },
  {
    chapter: 2,
    objective: 'Assess the role of e-commerce and direct-to-consumer channels in dairy.',
    question: 'Online sales add convenience and customer data. What demands do they also raise?',
    correct: 'Fulfillment and temperature-control demands',
    wrong: [
      'Lower inventory-visibility needs',
      'Reduced need for customer data',
      'Fewer product categories to ship',
    ],
    explanation: 'Online sales add convenience and customer data, but they raise fulfillment and temperature-control demands.',
  },
];

const M05_L4_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Interpret what certification and quality-assurance standards do and do not show.',
    question: 'What can standards such as VietGAP, GlobalG.A.P., and applicable organic certification frameworks support?',
    correct: 'More consistent farming practices, food safety, and traceability',
    wrong: [
      'A guaranteed higher milk yield per cow',
      'Automatic approval to sell in every market',
      'Fixed retail prices for certified products',
    ],
    explanation: 'These standards and certification systems can support more consistent farming practices, food safety, and traceability.',
  },
  {
    chapter: 2,
    objective: 'Interpret what certification and quality-assurance standards do and do not show.',
    question: 'How should a certificate be described, according to the chapter?',
    correct: 'As proof of compliance with a defined scope, not of every quality or environmental benefit',
    wrong: [
      'As proof of every quality and environmental benefit',
      'As relevant to every operation regardless of target market',
      'As a guarantee that a product costs less to produce',
    ],
    explanation: 'A certificate proves compliance with a defined scope, not every quality or environmental benefit, so it should be described precisely. Its relevance depends on the operation, target market, and certification requirements.',
  },
];

const M05_L5_NEW: DairyNewChapterSeed[] = [
  {
    chapter: 2,
    objective: 'Evaluate export expansion as a growth opportunity.',
    question: 'What could continued export expansion provide for dairy companies, according to the chapter?',
    correct: 'An additional source of revenue, including possible double-digit growth in selected Asian markets',
    wrong: [
      'A guaranteed reduction in raw milk costs',
      'A full replacement for domestic sales in every market',
      'Protection from all exchange-rate movements',
    ],
    explanation: 'Continued export expansion, including potential double-digit growth in selected Asian markets, could provide an additional source of revenue.',
  },
  {
    chapter: 2,
    objective: 'Evaluate export expansion as a growth opportunity.',
    question: 'How should the export outlook be treated?',
    correct: 'Validated against reported export data for each market, since outcomes depend on market-specific performance',
    wrong: [
      'Accepted as certain growth in every market',
      'Applied uniformly to all Asian markets',
      'Ignored, because exports cannot offset domestic softness',
    ],
    explanation: 'Exports can offset domestic softness, but the actual outcome depends on market-specific performance and should be validated against reported export data for each market.',
  },
];

/** Keyed by lesson title, like DAIRY_LESSON_QUIZZES. Chapter numbers are the new lesson-local numbers. */
export const DAIRY_NEW_CHAPTER_QUIZZES: Record<string, DairyQuizQuestion[]> = {
  'What the Industry Includes': newChapterQuiz('dairy-m01-l1', M01_L1_NEW),
  'How the Industry Evolved': newChapterQuiz('dairy-m01-l2', M01_L2_NEW),
  'How the Global Market Is Structured': newChapterQuiz('dairy-m01-l3', M01_L3_NEW),
  'How the Vietnam Market Works': newChapterQuiz('dairy-m01-l4', M01_L4_NEW),
  'Value Chain Overview': newChapterQuiz('dairy-m02-l1', M02_L1_NEW),
  'Industry Business Models': newChapterQuiz('dairy-m03-l1', M03_L1_NEW),
  'Industry Competition Structure': newChapterQuiz('dairy-m04-l1', M04_L1_NEW),
  'Consumer Trends': newChapterQuiz('dairy-m05-l1', M05_L1_NEW),
  'Technology & Innovation Trends': newChapterQuiz('dairy-m05-l2', M05_L2_NEW),
  'Market & Channel Trends': newChapterQuiz('dairy-m05-l3', M05_L3_NEW),
  'Regulatory & Sustainability Trends': newChapterQuiz('dairy-m05-l4', M05_L4_NEW),
  'Growth Outlook & Strategic Opportunities': newChapterQuiz('dairy-m05-l5', M05_L5_NEW),
};
