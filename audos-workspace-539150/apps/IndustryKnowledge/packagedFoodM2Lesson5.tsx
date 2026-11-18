import { EvidenceNote, chapter, citePfM2, pairedQuiz } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.5 Inputs, Outputs & Value Creation';

const deck: PackagedFoodCardData[] = [
  chapter({
    title: 'Understanding Inputs and Outputs Across the Value Chain',
    chapterTitle: LESSON,
    readingTime: '7',
    objective: 'Classify the physical, financial and intangible inputs used by each stage and the saleable and non-saleable outputs they create.',
    mateIntro: 'A packaged-food value chain does more than turn ingredients into packs. It also consumes capital, energy, labour, logistics and brand investment—and produces waste streams that still carry cost.',
    keyInsight: 'Value-chain economics become clearer when every stage is read as an input–transformation–output system, including by-products, waste and information.',
    narrative: [
      { label: 'What it is', text: 'Upstream inputs include cocoa, wheat, sugar, oils, dairy, grains and packaging materials. Manufacturing adds labour, energy, equipment and quality systems. Downstream adds inventory, logistics, distributor service, retailer terms and marketing.' },
      { label: 'How it works', text: 'Each stage transforms an input into an output valued by the next stage: crops become ingredients, ingredients become consistent branded SKUs, and factory stock becomes outlet availability and consumer purchase.' },
      { label: 'Global example', text: 'Mondelez reported sourcing about 90% of its cocoa through Cocoa Life and reducing manufacturing emissions by about 38% versus 2018. These company indicators connect supply security and operating footprint to the chain.' },
      { label: 'Vietnam example', text: 'A Vietnam biscuit or confectionery plant combines local labour, conversion and distribution with globally priced or imported ingredients. Its output is locally made, but its input economics can remain globally exposed.' },
      { label: 'Why it matters', text: 'Managers improve the chain by identifying which input constrains throughput, quality, resilience or margin—and by treating waste, wastewater and packaging impacts as real outputs rather than external details.' },
    ],
    visualKind: 'packaged-food-m2-25-1',
    visualHeading: 'Read every stage as input → transformation → output',
    visualIntro: 'Track physical materials, enabling resources, saleable products, information and waste across the chain.',
    imageAlt: 'Packaged-food input transformation and output map across upstream, manufacturing and downstream stages',
    statTiles: [
      { value: '~90%', label: 'Mondelez cocoa sourced through Cocoa Life, 2024', subtitle: 'Global company indicator', description: 'Audited company-reported sourcing share in the research.' },
      { value: '~38%', label: 'Manufacturing-emissions reduction versus 2018', subtitle: 'Mondelez, reported in FY2024 material', description: 'Company operational-footprint indicator; it is not an industry-wide reduction.' },
    ],
    keyTerms: [
      { term: 'Input', definition: 'A material, resource, service or capability consumed or used by a process.' },
      { term: 'Output', definition: 'A saleable product, by-product, information signal or waste stream produced by a process.' },
      { term: 'Yield', definition: 'Usable output generated from a given amount of material input.' },
      { term: 'SKU', definition: 'A distinct stock-keeping unit defined by product, pack and other sellable attributes.' },
    ],
    recap: [
      'Inputs include more than ingredients.',
      'Each stage creates an output for the next participant.',
      'Branded SKUs are saleable outputs; waste streams remain economic outputs.',
      'Yield, quality and resource use determine how efficiently value is added.',
    ],
    chapterRecap: 'Map every input and output before deciding where cost, risk or value can be improved.',
    deepDiveTitle: 'The hidden outputs in a product P&L',
    body: (
      <div className="space-y-4">
        <p>Trimmings, rejected batches, wastewater, energy use and used packaging may not appear as consumer products, but they affect material yield, disposal cost, compliance and reputation. Reducing them can improve both economics and environmental performance.</p>
        <p>Information is also an output. Quality results, point-of-sale data and forecasts travel between stages and change future production, stock and promotion decisions.</p>
        <EvidenceNote>Row 23 does not provide plant-level energy, water or waste per tonne for a named Vietnam manufacturer. The lesson therefore explains the mechanism without inventing intensity benchmarks.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02'),
  }),
  chapter({
    title: 'Where Costs and Profits Are Generated',
    chapterTitle: LESSON,
    readingTime: '8',
    objective: 'Explain category-specific cost drivers and where value is captured without fabricating cost shares or profit margins.',
    mateIntro: 'There is no single “packaged-food cost structure.” Chocolate moves with cocoa; biscuits with wheat, oils and sugar; candy with sugar; and every category carries packaging and distribution.',
    keyInsight: 'Raw materials are essential but commoditised; differentiated brand, product, mix and distribution create pricing power, while yield and utilisation protect the cost side.',
    narrative: [
      { label: 'What it is', text: 'Cost begins with category-specific ingredients, packaging, manufacturing labour and overhead, energy, depreciation, logistics and marketing. Profit depends on the revenue left after these resources and commercial terms are paid.' },
      { label: 'How it works', text: 'A commodity shock raises unit cost. A company can respond through pricing, smaller or redesigned packs, procurement, hedging, reformulation, productivity or a richer sales mix. Each response has volume, brand and execution trade-offs.' },
      { label: 'Global example', text: 'Mondelez reported 7.4% chocolate revenue growth in FY2024 despite record cocoa inflation and anticipated an approximately 10% adjusted-EPS decline for 2025. Nestlé reported CHF91.354 billion of total group sales while confectionery grew mid-single-digit led by KitKat; the group total is scale context, not confectionery revenue.' },
      { label: 'Vietnam example', text: 'Orion reportedly absorbed an approximately 70% ingredient-cost surge while holding prices flat from 2018. This describes a pricing and margin squeeze, not a verified gross-margin percentage.' },
      { label: 'Why it matters', text: 'Commercial teams need mix and price; operations need yield and utilisation; procurement needs supply and commodity discipline. Profit is the combined result, not the work of one function.' },
    ],
    visualKind: 'packaged-food-m2-25-2',
    visualHeading: 'Locate the main cost and value levers',
    visualIntro: 'Separate category-specific swing costs from shared cost blocks and the intangible sources of value.',
    imageAlt: 'Packaged-food cost blocks and value-capture levers by category',
    statTiles: [
      { value: '+7.4%', label: 'Mondelez chocolate revenue growth, FY2024', subtitle: 'Global corporate result', description: 'Audited company result during cocoa inflation; not an industry margin.' },
      { value: '~10% decline', label: 'Anticipated adjusted EPS change for 2025', subtitle: 'Mondelez outlook reported with FY2024 results', description: 'A forward-looking company expectation associated with record cocoa inflation, not an actual category margin.' },
      { value: 'CHF91.354bn', label: 'Nestlé total group sales, 2024', subtitle: 'Confectionery grew mid-single-digit', description: 'Audited group-scale context; this is not confectionery-segment revenue or profit.' },
      { value: '~70%', label: 'Ingredient-cost surge reportedly absorbed by Orion', subtitle: 'Vietnam example; approximate', description: 'VnExpress report that prices were held flat from 2018; no margin percentage was verified.' },
    ],
    keyTerms: [
      { term: 'Cost driver', definition: 'A factor that materially changes the amount or unit cost of resources consumed.' },
      { term: 'Mix', definition: 'The relative contribution of categories, brands, packs or price tiers to total sales.' },
      { term: 'Premiumisation', definition: 'Growing value by shifting demand toward higher-priced or more differentiated offers.' },
      { term: 'Cost pass-through', definition: 'The extent to which higher input cost is reflected in customer or consumer prices.' },
    ],
    recap: [
      'Cost drivers differ by food category.',
      'Packaging and distribution matter across categories.',
      'Revenue growth does not guarantee profit growth.',
      'Pricing, mix, procurement and productivity jointly defend economics.',
    ],
    chapterRecap: 'Ask which cost moved, whether it was passed through, and what happened to volume, mix and productivity.',
    deepDiveTitle: 'Why a margin waterfall is useful—but unsupported here',
    body: (
      <div className="space-y-4">
        <p>A margin waterfall would normally quantify the effects of commodity inflation, price, volume, mix, productivity and currency between two periods. It prevents teams from crediting premiumisation for a result actually caused by price, or blaming volume for a currency effect.</p>
        <p>The row 23 evidence can identify the mechanisms and several company outcomes, but it cannot populate a complete waterfall for a Vietnam confectioner. Itemised raw-material, packaging, energy and logistics percentages were not verified.</p>
        <EvidenceNote>No audited Vietnam confectioner gross or net margin and no named-company itemised cost split was sourced in this research pass. Any such percentage would be an invention, so none is shown.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s03', 'pf-m02-s06'),
  }),
  chapter({
    title: 'How Packaged Food Companies Create Competitive Value',
    chapterTitle: LESSON,
    readingTime: '8',
    objective: 'Connect brand, innovation, distribution, scale, recipes and responsible sourcing to durable competitive value.',
    mateIntro: 'A recipe can be copied more quickly than a trusted brand, a national route to market or a resilient supplier system. Competitive value comes from capabilities that reinforce one another.',
    keyInsight: 'The strongest packaged-food moats combine consumer pull, distinctive products, distribution depth, scale economics and secure supply rather than relying on one isolated advantage.',
    narrative: [
      { label: 'What it is', text: 'Competitive value is the ability to create a benefit customers recognise and to retain part of that value through price, repeat purchase, lower cost, better availability or reduced risk.' },
      { label: 'How it works', text: 'Brand creates preference; innovation creates reasons to choose or trade up; distribution turns preference into availability; scale improves procurement and fixed-cost absorption; recipes and sourcing systems make delivery harder to copy.' },
      { label: 'Global example', text: 'Cocoa Life was reported as heading toward a cumulative US$1 billion commitment by 2030 and about 300,000 farmers. Reported farmer net-income increases were about 15% in Ghana and 33% in Côte d’Ivoire.' },
      { label: 'Vietnam example', text: 'Orion’s local workforce and distribution helped build ChocoPie to about 66% of Vietnam’s “pie” segment. The share applies only to that defined segment, but it illustrates the combination of brand and route-to-market.' },
      { label: 'Why it matters', text: 'A moat is strategically useful only if it improves willingness to buy, cost, resilience or execution and if competitors cannot reproduce it quickly or cheaply.' },
    ],
    visualKind: 'packaged-food-m2-25-3',
    visualHeading: 'Build the packaged-food value flywheel',
    visualIntro: 'See how brand, innovation, distribution, scale and supply security reinforce repeat purchase and reinvestment.',
    imageAlt: 'Competitive value flywheel linking brand innovation distribution scale and secure sourcing',
    statTiles: [
      { value: 'US$1bn', label: 'Cocoa Life cumulative commitment target by 2030', subtitle: 'Company-stated programme commitment', description: 'Trade-press report; increased from the US$400m commitment at launch in 2012.' },
      { value: '~300,000', label: 'Farmers targeted by Cocoa Life', subtitle: 'Programme target', description: 'Company-stated target reported by Confectionery Production.' },
      { value: '~15% / ~33%', label: 'Reported farmer net-income increases', subtitle: 'Ghana / Côte d’Ivoire', description: 'Approximate company programme figures reported in trade press; not sector-wide farm margins.' },
    ],
    keyTerms: [
      { term: 'Brand equity', definition: 'The accumulated consumer awareness, associations and trust that influence choice.' },
      { term: 'Competitive moat', definition: 'A capability or asset that protects value because it is difficult to reproduce.' },
      { term: 'Proprietary recipe', definition: 'A formulation or process know-how controlled by a company.' },
      { term: 'Supply security', definition: 'The ability to obtain required inputs in the needed quality, quantity and timing.' },
    ],
    recap: [
      'Competitive value combines consumer and operating capabilities.',
      'Brand and innovation support willingness to pay.',
      'Distribution turns preference into physical sales.',
      'Scale and sourcing systems protect cost and continuity.',
    ],
    chapterRecap: 'A defensible advantage creates consumer value and strengthens the company’s ability to deliver it repeatedly.',
    deepDiveTitle: 'Sourcing programmes create more than a claim',
    body: (
      <div className="space-y-4">
        <p>A responsible-sourcing programme can support farmer capability and income, traceability, compliance and supply continuity. It also requires investment, measurement and long-term supplier relationships. The economic case is therefore broader than a marketing message.</p>
        <p>Evidence should still be read carefully. The reported Cocoa Life outcomes are programme and company figures, not proof that every participating farmer experienced the average or that the programme alone caused every change.</p>
        <EvidenceNote>The farmer-income figures are approximate, company-stated programme outcomes reported by trade press. The research does not provide a controlled causal evaluation or industry-wide farming margin.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s06', 'pf-m02-s11'),
  }),
];

const quiz: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l5', [
  { chapter: '1', objective: 'Map inputs and outputs', question: 'Which item is an enabling manufacturing input rather than an ingredient?', application: 'A plant’s product formula is unchanged, but output falls after equipment downtime. Which input constrained the process?', correct: 'Production equipment and available capacity', wrong: ['Finished branded SKUs', 'Retail sell-through data only', 'Consumer waste after use'], explanation: 'Equipment, labour, energy and capital enable conversion even though they are not recipe ingredients. Review Chapter 2.5.1.' },
  { chapter: '1', objective: 'Recognise non-saleable outputs', question: 'Which is a non-saleable output of food manufacturing?', application: 'A yield project reduces rejected product and wastewater. Why can this create value?', correct: 'Waste, trimmings or wastewater that still carry material and disposal cost', wrong: ['A premium branded SKU', 'A distributor order', 'A cocoa purchase contract'], explanation: 'Non-saleable outputs affect cost, compliance and environmental performance. Review Chapter 2.5.1.' },
  { chapter: '1', objective: 'Interpret operational evidence', question: 'What does Mondelez’s ~38% figure measure?', application: 'A slide calls it the packaged-food industry’s emissions reduction. What is the correction?', correct: 'Mondelez manufacturing-emissions reduction versus its 2018 baseline', wrong: ['Vietnam’s national food emissions decline', 'A 38% reduction in ingredient cost', 'An industry-wide packaging share'], explanation: 'It is a company operational indicator, not an industry benchmark. Review Chapter 2.5.1.' },
  { chapter: '2', objective: 'Distinguish category costs', question: 'Which ingredient is the pivotal swing cost for chocolate?', application: 'A chocolate portfolio is hit harder than a biscuit portfolio by the 2023/24 supply shock. Which exposure explains it?', correct: 'Cocoa', wrong: ['Wheat only', 'Potatoes only', 'Retail labour only'], explanation: 'Chocolate is especially exposed to cocoa, while other categories have different ingredient drivers. Review Chapter 2.5.2.' },
  { chapter: '2', objective: 'Separate revenue and profit', question: 'Why can revenue grow while profit falls?', application: 'Chocolate revenue rises 7.4%, but cocoa cost rises faster. What is the likely mechanism?', correct: 'Higher input cost can outweigh price, volume or mix gains', wrong: ['Revenue growth automatically removes COGS', 'Profit and revenue are identical', 'Cocoa affects only farmers'], explanation: 'Revenue and margin respond to different parts of the income statement. Review Chapter 2.5.2.' },
  { chapter: '2', objective: 'Use cost evidence responsibly', question: 'What cost information remains a research gap?', application: 'A manager asks for the exact packaging share of a Vietnam confectioner’s COGS. What is the evidence-based answer?', correct: 'No named-company itemised cost split was primary-verified in row 23', wrong: ['Packaging is verified at exactly 30%', 'Ingredients are always exactly half of COGS', 'Distribution has zero cost'], explanation: 'The source records itemised cost structure as an explicit gap. Review Chapter 2.5.2.' },
  { chapter: '2', objective: 'Understand cost pass-through', question: 'What is cost pass-through?', application: 'A company raises shelf prices after cocoa inflation rather than absorbing all of it. Which lever is it using?', correct: 'Reflecting some or all of higher input cost in customer or consumer prices', wrong: ['Increasing factory waste', 'Removing every distributor', 'Changing an HS classification'], explanation: 'Pass-through transfers part of a cost increase into price, with possible volume trade-offs. Review Chapter 2.5.2.' },
  { chapter: '3', objective: 'Explain competitive moats', question: 'Which combination is hardest for a new entrant to copy quickly?', application: 'A rival can imitate a flavour but lacks trust, outlet reach and secure cocoa supply. What protects the incumbent?', correct: 'Brand equity, distribution depth and a scaled sourcing system', wrong: ['One temporary discount', 'A generic ingredient list', 'A single social-media post'], explanation: 'Reinforcing capabilities form a stronger moat than an isolated product feature. Review Chapter 2.5.3.' },
  { chapter: '3', objective: 'Interpret sourcing metrics', question: 'What does the ~90% Cocoa Life figure represent?', application: 'An analyst calls it the global share of sustainable cocoa. What is the correction?', correct: 'The share of Mondelez cocoa reported as sourced through Cocoa Life', wrong: ['All global cocoa production', 'Vietnam’s cocoa import share', 'Every company’s sourcing rate'], explanation: 'The statistic is company-specific and must retain that scope. Review Chapter 2.5.3.' },
  { chapter: '3', objective: 'Assess value creation', question: 'How does distribution create competitive value?', application: 'Consumers prefer a brand but cannot find it in nearby outlets. Which part of the value system is weak?', correct: 'It converts consumer preference into reliable physical availability and purchase', wrong: ['It changes cocoa into chocolate liquor', 'It sets official market statistics', 'It guarantees commodity prices never rise'], explanation: 'Brand pull produces sales only when route-to-market execution supplies the product. Review Chapter 2.5.3.' },
]);

const takeaways: PackagedFoodTakeaways = {
  learned: 'You can map value-chain inputs and outputs, explain category-specific economics and identify the capabilities that create defensible packaged-food value.',
  keyTakeaways: [
    'Ingredients, packaging, people, energy, capital, logistics and marketing are all inputs.',
    'Waste and information are economically relevant outputs alongside branded SKUs.',
    'Chocolate, biscuits, candy and savoury snacks have different swing costs.',
    'Revenue growth can coexist with profit pressure when commodity costs rise.',
    'Brand, innovation, distribution, scale and secure sourcing reinforce one another.',
  ],
  businessImplications: 'A strong profitability plan names the affected category, cost driver, price and mix response, operational lever and evidence gap rather than applying a generic industry margin.',
  remember: 'Value is created through transformation and differentiation; profit is retained only when price, cost, mix and execution work together.',
  nextLesson: 'Global vs. Local Value Chain',
};

export const PACKAGED_FOOD_M2_LESSON5 = { deck, quiz, takeaways };
