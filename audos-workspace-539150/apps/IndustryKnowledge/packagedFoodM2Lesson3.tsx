import { chapter, citePfM2, pairedQuiz, EvidenceNote } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.3 Midstream Activities';

export const PACKAGED_FOOD_M2_LESSON3_DECK: PackagedFoodCardData[] = [
  chapter({
    title: 'How Packaged Foods and Confectionery Are Manufactured',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Compare the core manufacturing steps for biscuits, chocolate, candy and savoury snacks.',
    mateIntro: 'A biscuit oven, a chocolate conche and a candy cooker all convert ingredients, but they control different physical changes.',
    keyInsight: 'The category-defining process—baking, refining and conching, boiling, or extrusion and frying—shapes the equipment, skills and economics of each product.',
    narrative: [
      { label: 'What it is', text: 'Midstream manufacturing converts agricultural and processed inputs into safe, standardised, shelf-ready products. Formulation defines the recipe; processing creates structure, texture and flavour.' },
      { label: 'How it works', text: 'Biscuits are mixed, formed, baked and cooled. Chocolate is mixed, refined, conched, tempered and moulded or enrobed. Candy syrups are cooked and deposited, moulded or extruded. Many savoury snacks are extruded or fried, then seasoned.' },
      { label: 'Global example', text: 'Cocoa grinding sits between cocoa farms and chocolate factories, turning beans into usable cocoa products. Global grindings were about 4.855 million tonnes in 2023/24.' },
      { label: 'Vietnam example', text: 'A ChocoPie-type product combines several systems: baked cake, a marshmallow layer and chocolate enrobing. It therefore requires coordination across bakery, filling and coating steps.' },
      { label: 'Why it matters', text: 'A product idea must fit a stable process. Small changes in moisture, temperature, particle size or cooling can affect quality, line speed and waste.' },
    ],
    visualKind: 'packaged-food-m2-23-1',
    visualHeading: 'Compare four conversion routes',
    visualIntro: 'Follow the major steps from weighed ingredients to a finished, unpacked product.',
    imageAlt: 'Manufacturing routes for biscuits, chocolate, candy and savoury snacks',
    statTiles: [
      { value: '4.855 Mt', label: 'World cocoa grindings, 2023/24', subtitle: 'Down 4.3% year on year', description: 'ICCO global industry processing measure reported by BusinessGhana.' },
    ],
    keyTerms: [
      { term: 'Formulation', definition: 'The recipe and technical specification for ingredients, process and finished-product performance.' },
      { term: 'Conching', definition: 'Extended mixing and aeration that develops chocolate texture and flavour.' },
      { term: 'Tempering', definition: 'Controlled heating and cooling that creates stable cocoa-butter crystals in chocolate.' },
      { term: 'Extrusion', definition: 'Forcing a prepared food mix through a shaped opening, often with heat and pressure.' },
    ],
    recap: [
      'Each product family has a different conversion route.',
      'Cocoa grinding is a distinct midstream step.',
      'ChocoPie-type products combine several process systems.',
      'Process control creates repeatable texture, flavour and output.',
    ],
    chapterRecap: 'The recipe says what goes in; the process determines whether the intended product comes out consistently.',
    deepDiveTitle: 'What each process is trying to control',
    body: (
      <div className="space-y-4">
        <p>Baking removes moisture and sets structure. Chocolate refining and conching control particle size, coating and flavour development; tempering controls crystal form. Candy cooking controls solids and final texture. Extrusion combines mixing, shaping and thermal or pressure effects.</p>
        <p>Cooling is part of manufacturing, not waiting time. A product packed too warm can create condensation, texture loss or unstable chocolate. Handoffs between forming, heating, cooling and packaging therefore need clear limits and checks.</p>
        <EvidenceNote>The research provides global cocoa-grinding volume but no primary-verified plant capacity or output figure for Mondelez Kinh Do, Bibica or another named Vietnam confectionery plant.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06', 'pf-m02-s08'),
  }),
  chapter({
    title: 'Food Safety, Quality Control, and Packaging',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Explain how preventive food-safety systems, quality checks and packaging protect every batch.',
    mateIntro: 'A fast line is not successful if it produces unsafe food or a pack that loses freshness before its date.',
    keyInsight: 'Food safety prevents harm, quality control keeps the product within specification, and packaging preserves both outcomes through distribution.',
    narrative: [
      { label: 'What it is', text: 'Food safety controls hazards that can harm consumers. Quality control checks attributes such as weight, moisture, appearance, texture and seal integrity. Packaging protects the product and carries required information.' },
      { label: 'How it works', text: 'Plants identify hazards, define controls, inspect incoming materials, monitor critical process conditions and test or release finished batches. Traceability records connect ingredients, line conditions and packed product.' },
      { label: 'Global example', text: 'Codex Alimentarius is the joint FAO/WHO collection of food standards, guidelines and codes of practice covering safety, composition and labelling. Companies also use management systems such as HACCP and ISO 22000.' },
      { label: 'Vietnam example', text: 'A Vietnam plant must apply local food-safety law and relevant national technical regulations as well as its company systems. A global framework does not replace local legal compliance.' },
      { label: 'Why it matters', text: 'A failure can harm consumers, stop production, trigger a recall and damage trust. Prevention and traceability make the response faster and more precise.' },
    ],
    visualKind: 'packaged-food-m2-23-2',
    visualHeading: 'Build quality into the line',
    visualIntro: 'See the control points from incoming materials through process checks, pack inspection and batch release.',
    imageAlt: 'Food safety and quality control gates across a packaged food production line',
    statTiles: [
      { value: '96%', label: 'Mondelez recyclable packaging share', subtitle: 'Company-reported, 2024 context', description: 'A corporate packaging metric, not an industry rate or a food-safety measure.' },
    ],
    keyTerms: [
      { term: 'HACCP', definition: 'A preventive method for identifying, evaluating and controlling significant food-safety hazards.' },
      { term: 'Codex Alimentarius', definition: 'International food standards, guidelines and codes of practice developed through the joint FAO/WHO programme.' },
      { term: 'Critical control point', definition: 'A step where control is essential to prevent, eliminate or reduce a significant food-safety hazard.' },
      { term: 'Batch release', definition: 'Formal confirmation that a production batch meets required checks before sale or shipment.' },
    ],
    recap: [
      'Food safety and product quality are related but different.',
      'Prevention starts with materials and process design.',
      'Packaging protects shelf life and carries information.',
      'Global frameworks do not replace Vietnam legal requirements.',
    ],
    chapterRecap: 'Safety and quality are designed into the process, verified with evidence and protected by the pack.',
    deepDiveTitle: 'From hazard prevention to batch release',
    body: (
      <div className="space-y-4">
        <p>A practical control plan starts with the product and process. Teams ask what biological, chemical, physical or allergen hazard could occur, how it will be controlled and what record proves the control worked. Quality checks then confirm the consumer promise, such as crispness, weight or appearance.</p>
        <p>Packaging has its own controls: correct material, coding, seal strength, label and pack weight. A line can make safe food but still create a non-compliant product if allergen information or date coding is wrong.</p>
        <EvidenceNote>The research verified the Codex programme overview, not the exact Codex compositional standards for chocolate or sugar confectionery. It also did not pull a primary source for specific Vietnam QCVN requirements, so this lesson does not name or paraphrase an unverified regulation.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s02', 'pf-m02-s04'),
  }),
  chapter({
    title: 'Production Efficiency and Manufacturing Economics',
    chapterTitle: LESSON,
    readingTime: '6',
    objective: 'Explain how throughput, yield, utilisation, downtime and scale shape manufacturing cost without inventing margin benchmarks.',
    mateIntro: 'A factory can make the right product and still lose money if the line runs slowly, wastes material or sits idle.',
    keyInsight: 'Manufacturing economics improve when a plant turns more good output from the same time, materials and fixed assets—without weakening safety or quality.',
    narrative: [
      { label: 'What it is', text: 'Efficiency covers throughput, yield, changeover time, downtime, labour productivity, energy use and asset utilisation. The economic goal is good saleable output, not maximum speed alone.' },
      { label: 'How it works', text: 'Fixed costs are spread across output, while ingredient, packaging and energy losses increase unit cost. Automation can improve consistency and speed, but it adds capital cost and still requires maintenance and skilled operators.' },
      { label: 'Global example', text: 'Nestlé reported CHF91.354 billion in total group sales in 2024. This shows corporate scale, but it is not a confectionery segment figure and does not by itself prove plant-level efficiency.' },
      { label: 'Vietnam example', text: 'Orion Food Vina was reported to have about 3,600 employees, with only about 21 South Korean staff. This illustrates a deeply localised operation, not a labour-productivity benchmark.' },
      { label: 'Why it matters', text: 'Manufacturing trainees are judged on safe output, yield, waste, reliability and problem solving. Finance and R&D need the same data to understand recipe and process economics.' },
    ],
    visualKind: 'packaged-food-m2-23-3',
    visualHeading: 'See the levers behind unit cost',
    visualIntro: 'Connect good output, losses, time and fixed assets without confusing speed with value.',
    imageAlt: 'Manufacturing economics diagram showing throughput, yield, downtime, changeovers and fixed costs',
    statTiles: [
      { value: 'CHF91.354bn', label: 'Nestlé 2024 group sales', subtitle: 'Audited corporate scale context', description: 'Total group sales, not confectionery revenue or a plant-efficiency measure.' },
      { value: '~3,600', label: 'Orion Food Vina employees', subtitle: 'Reported 2022 company context', description: 'About 21 were South Korean; this is localisation evidence, not output per employee.' },
    ],
    keyTerms: [
      { term: 'Throughput', definition: 'The amount of product a process produces in a defined time.' },
      { term: 'Yield', definition: 'Good saleable output relative to the material or product entering a process.' },
      { term: 'Downtime', definition: 'Time when equipment planned for production is not producing.' },
      { term: 'Capacity utilisation', definition: 'Actual output relative to the output available from installed capacity over a period.' },
    ],
    recap: [
      'Efficiency means more good output, not speed alone.',
      'Yield and downtime directly affect unit cost.',
      'Automation brings capability and capital cost.',
      'Company scale or headcount is not a plant-productivity metric.',
    ],
    chapterRecap: 'The best line balances safety, quality, output, waste, reliability and cost.',
    deepDiveTitle: 'Reading a simple factory loss tree',
    body: (
      <div className="space-y-4">
        <p>Start with planned production time. Remove changeovers, breakdowns and waiting to find running time. Then compare actual speed with designed speed. Finally, remove rejects and rework to reach good saleable output. Each loss needs a different response.</p>
        <p>A faster line can create more defects, while a larger batch can reduce changeovers but increase inventory. Efficiency decisions therefore cross functions: Operations, Quality, Maintenance, Planning, Procurement and Sales must agree on the trade-offs.</p>
        <EvidenceNote>The research did not primary-verify plant-level output per employee, energy or water per tonne, yield, utilisation or named-company manufacturing margins in Vietnam. No benchmark or margin has been invented.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s03', 'pf-m02-s06'),
  }),
];

export const PACKAGED_FOOD_M2_LESSON3_QUIZ: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l3', [
  { chapter: '1', objective: 'Compare manufacturing routes', question: 'Which process is most closely associated with biscuits?', application: 'A trainee maps the core biscuit conversion step. Which one belongs in the centre?', correct: 'Baking formed dough in an oven', wrong: ['Conching cocoa mass only', 'Boiling sugar syrup only', 'Grinding cocoa beans only'], explanation: 'Biscuits are mixed and formed before baking and cooling.' },
  { chapter: '1', objective: 'Compare manufacturing routes', question: 'What does conching do in chocolate production?', application: 'A chocolate product needs smoother texture and developed flavour. Which process is relevant?', correct: 'It mixes and aerates chocolate to develop texture and flavour', wrong: ['It bakes biscuit dough', 'It prints retail receipts', 'It grows cocoa trees'], explanation: 'Conching is a category-specific chocolate process after mixing and refining.' },
  { chapter: '1', objective: 'Understand combined processes', question: 'Why is a ChocoPie-type product operationally complex?', application: 'A planner treats it as one simple baking step. What did the plan miss?', correct: 'It combines cake baking, filling and chocolate enrobing', wrong: ['It requires no cooling', 'It uses no packaging', 'It is only raw cocoa'], explanation: 'Several process systems and handoffs must be coordinated in one finished product.' },
  { chapter: '2', objective: 'Separate safety and quality', question: 'Which statement best distinguishes food safety from quality?', application: 'A biscuit is safe but outside its target crispness. How should it be classified?', correct: 'Safety controls harm; quality controls whether the product meets its specification', wrong: ['They are always identical', 'Quality only checks advertising', 'Safety only checks pack colour'], explanation: 'A product may be safe yet fail a sensory or physical quality specification.' },
  { chapter: '2', objective: 'Use preventive controls', question: 'What is HACCP designed to do?', application: 'A plant wants to prevent hazards instead of relying only on final testing. Which approach fits?', correct: 'Identify significant hazards and control them at defined process points', wrong: ['Set consumer prices', 'Measure market share', 'Replace every local law'], explanation: 'HACCP is a preventive food-safety method focused on hazards and controls.' },
  { chapter: '2', objective: 'Understand packaging controls', question: 'Why must label and date-code checks be part of production control?', application: 'The food is safe, but the allergen label is wrong. Can the batch be released?', correct: 'Wrong label or date information can make the batch non-compliant and unsafe', wrong: ['Date codes matter only for export orders, not domestic sales', 'Label checks replace microbiological testing of the batch', 'Retailers re-label products after delivery, so errors are corrected downstream'], explanation: 'Correct coding and allergen information are essential controls on the packed product.' },
  { chapter: '2', objective: 'Interpret standards evidence', question: 'What is Codex Alimentarius in this lesson?', application: 'A manager says Codex replaces Vietnam law. What is the correction?', correct: 'A joint FAO/WHO collection of international standards and guidance that does not replace local legal compliance', wrong: ['A chocolate manufacturer', 'A Vietnam retail chain', 'A factory efficiency ratio'], explanation: 'Codex provides international reference material; plants must still follow applicable national requirements.' },
  { chapter: '3', objective: 'Understand efficiency', question: 'Why is maximum line speed not the same as efficiency?', application: 'A line runs faster but produces more rejects. What measure should lead the decision?', correct: 'Good saleable output after losses, while maintaining safety and quality', wrong: ['Motor speed alone', 'Headcount alone', 'Corporate revenue alone'], explanation: 'Speed that creates defects or unsafe conditions does not improve useful output.' },
  { chapter: '3', objective: 'Diagnose losses', question: 'What does downtime measure?', application: 'A line waits two hours for a repair during planned production. Where does the loss belong?', correct: 'Planned production time when equipment is not producing', wrong: ['Consumer demand only', 'Retail shelf space', 'The cocoa harvest'], explanation: 'Breakdowns and waiting reduce available running time and are downtime losses.' },
  { chapter: '3', objective: 'Label company evidence', question: 'How should Orion Food Vina’s reported employee count be interpreted?', application: 'A slide calls 3,600 employees an industry productivity benchmark. What is wrong?', correct: 'It illustrates one company’s localised workforce, not output per employee for the industry', wrong: ['It is global cocoa grinding', 'It is Nestlé confectionery revenue', 'It is a food-safety limit'], explanation: 'A headcount without output and comparable scope cannot measure plant productivity.' },
]);

export const PACKAGED_FOOD_M2_LESSON3_TAKEAWAYS: PackagedFoodTakeaways = {
  learned: 'You can compare manufacturing routes, explain preventive safety and quality controls, and identify the main levers of manufacturing economics.',
  keyTakeaways: [
    'Baking, conching, boiling and extrusion create different production systems.',
    'Safety prevents harm; quality keeps the product within specification.',
    'Packaging protects the product and carries controlled information.',
    'Throughput, yield, downtime and utilisation shape unit cost.',
  ],
  businessImplications: 'Manufacturing performance is cross-functional: Operations, Quality, Maintenance, R&D, Planning and Finance must improve good output without trading away safety or consumer trust.',
  remember: 'Measure good saleable output—not speed, scale or headcount in isolation.',
  nextLesson: 'Downstream Activities',
};
