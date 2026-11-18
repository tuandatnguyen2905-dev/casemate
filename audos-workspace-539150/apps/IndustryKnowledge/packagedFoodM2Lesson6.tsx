import { EvidenceNote, chapter, citePfM2, pairedQuiz } from './packagedFoodM2Core';
import type {
  PackagedFoodCardData,
  PackagedFoodQuestion,
  PackagedFoodTakeaways,
} from './packagedFoodM2Core';

const LESSON = '2.6 Global vs. Local Value Chain';

const deck: PackagedFoodCardData[] = [
  chapter({
    title: 'How Global Packaged Food Supply Chains Operate',
    chapterTitle: LESSON,
    readingTime: '7',
    objective: 'Explain why agricultural inputs are sourced globally while much finished-food manufacturing and distribution remain close to consumers.',
    mateIntro: 'A chocolate bar can be global upstream and local downstream: cocoa follows climate and commodity trade, while recipes, packs, factories and routes to market follow consumers.',
    keyInsight: 'Packaged-food multinationals globalise climate-bound commodity sourcing and selected capabilities, then localise bulky, taste-sensitive production and distribution.',
    narrative: [
      { label: 'What it is', text: 'Global supply chains connect agricultural origins, traders, ingredient processors, packaging suppliers, factories and national routes to market. Different stages sit in different countries because their location economics differ.' },
      { label: 'How it works', text: 'Cocoa, wheat, sugar, oils and dairy can be pooled and procured across borders. Manufacturing is often placed near demand to reduce finished-goods transport, improve freshness and tailor recipes, packs and service to local channels.' },
      { label: 'Global example', text: 'Ghana and Côte d’Ivoire together supply more than 60% of global cocoa. World gross cocoa production was projected at 4,461 thousand tonnes in 2023/24, down 11.7% year on year, transmitting a concentrated upstream shock into chocolate makers worldwide.' },
      { label: 'Vietnam example', text: 'A Vietnam chocolate or biscuit factory can manufacture for local shoppers while buying commodities whose prices are set globally. Local production therefore does not remove commodity, currency or import-logistics exposure.' },
      { label: 'Why it matters', text: 'Network design balances scale, landed cost, resilience, freshness, local fit and control. The cheapest source in a stable year may not be the best source after disruption or currency movement.' },
    ],
    visualKind: 'packaged-food-m2-26-1',
    visualHeading: 'Split the chain by location logic',
    visualIntro: 'See why climate-bound origins, scaled ingredient processing, local factories and local retail networks occupy different geographies.',
    imageAlt: 'Global-to-local packaged-food supply chain from commodity origins to local consumers',
    statTiles: [
      { value: '>60%', label: 'Combined global cocoa share of Ghana and Côte d’Ivoire', subtitle: 'West African concentration', description: 'Secondary news source in the research; illustrates geographic concentration, not a company sourcing share.' },
      { value: '4,461kt', label: 'World gross cocoa production, 2023/24', subtitle: 'Projected, down 11.7% YoY', description: 'ICCO Quarterly Bulletin figure reported by BusinessGhana.' },
    ],
    keyTerms: [
      { term: 'Global procurement', definition: 'Coordinating supply across countries to obtain scale, quality, price or resilience benefits.' },
      { term: 'Landed cost', definition: 'The full cost of an imported input after price, freight, insurance, duties and related charges.' },
      { term: 'Geographic concentration', definition: 'Dependence on a large share of supply coming from a small number of places.' },
      { term: 'Network design', definition: 'Choosing where sourcing, inventory, production and distribution activities should sit.' },
    ],
    recap: [
      'Agricultural origins follow climate and capability.',
      'Commodity procurement can be global even when production is local.',
      'Finished-food factories often sit close to demand.',
      'Concentration creates correlated weather and supply risk.',
    ],
    chapterRecap: 'Globalise where origin and scale matter; localise where freshness, taste and route-to-market matter.',
    deepDiveTitle: 'How an upstream shock crosses borders',
    body: (
      <div className="space-y-4">
        <p>A production shortfall can reduce available stocks, raise commodity prices and increase working-capital needs. Contracts and hedges can delay the effect, but they do not create the missing physical crop. Manufacturers then balance procurement, pricing, pack changes, mix and reformulation.</p>
        <p>Concentration also creates common exposure: several brands may diversify suppliers yet still depend on the same producing region. True resilience examines origin, processor, port, currency and logistics route—not supplier count alone.</p>
        <EvidenceNote>The &gt;60% cocoa share comes from a secondary source and the 4,461kt figure is an ICCO projection reported through BusinessGhana. Both retain their source and period labels.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s08', 'pf-m02-s09'),
  }),
  chapter({
    title: "Vietnam's Packaged Food Value Chain",
    chapterTitle: LESSON,
    readingTime: '8',
    objective: 'Map Vietnam’s import-dependent upstream and localised manufacturing, workforce, packaging and distribution system.',
    mateIntro: 'Vietnam’s packaged-food chain is not simply imported or domestic. Its midstream and downstream can be deeply local even when pivotal agricultural inputs arrive from abroad.',
    keyInsight: 'Vietnam localises conversion and market execution while remaining exposed to imported wheat and to globally priced cocoa and other inputs.',
    narrative: [
      { label: 'What it is', text: 'The Vietnam chain combines imported and local ingredients, domestic milling and food conversion, packaging, quality control, warehouses, distributors, family shops, organised retailers and digital platforms.' },
      { label: 'How it works', text: 'Inputs clear import and inland logistics, enter local processing or food plants, and become locally tailored SKUs. Local sales teams and distributors then manage price points, seasonal ranges and fragmented outlet reach.' },
      { label: 'Global example', text: 'Multinationals can retain global procurement standards, technology and brand systems while employing local workforces and adapting products and route-to-market by country.' },
      { label: 'Vietnam example', text: 'U.S. Wheat Associates states that Vietnam grows no wheat and its flour millers import more than 1.8 million tonnes of milling wheat annually. Orion reportedly employed about 3,600 people, with only about 21 South Korean staff, showing deep operational localisation.' },
      { label: 'Why it matters', text: 'Management teams must operate two systems at once: global commodity, FX and import-risk management upstream, and intensely local product, people and channel execution downstream.' },
    ],
    visualKind: 'packaged-food-m2-26-2',
    visualHeading: 'Map Vietnam’s hybrid value chain',
    visualIntro: 'Separate imported or globally exposed inputs from the activities performed locally in Vietnam.',
    imageAlt: 'Vietnam hybrid packaged-food chain showing imported inputs and local manufacturing distribution and retail',
    statTiles: [
      { value: '>1.8Mt/yr', label: 'Vietnam milling-wheat imports', subtitle: 'No domestic wheat crop', description: 'U.S. Wheat Associates trade-body estimate; snippet-only verification and should be reconfirmed against primary trade data.' },
      { value: '~3,600', label: 'Orion Food Vina employees, 2022', subtitle: 'About 21 reportedly South Korean', description: 'VnExpress company profile; approximate workforce figures illustrate localisation.' },
      { value: 'VND7,846bn', label: 'Consideration for 80% of Kinh Do Binh Duong confectionery, 2014', subtitle: 'About US$370m at the time', description: 'Company-source account of Mondelez’s localisation by acquisition.' },
    ],
    keyTerms: [
      { term: 'Import dependency', definition: 'Reliance on foreign supply for an input, product or capability.' },
      { term: 'Operational localisation', definition: 'Building local people, production, suppliers, decisions and market execution.' },
      { term: 'Foreign direct investment (FDI)', definition: 'Investment that gives a foreign company a lasting operating interest in a local business or asset.' },
      { term: 'FX exposure', definition: 'The effect of exchange-rate changes on costs, revenue, cash flow or asset values.' },
    ],
    recap: [
      'Vietnam’s chain combines imported inputs with local activity.',
      'Wheat is a clear upstream import dependency.',
      'Manufacturing, people and route-to-market can be deeply localised.',
      'Foreign ownership does not mean finished goods are merely imported.',
    ],
    chapterRecap: 'Vietnam’s chain is locally operated downstream but globally exposed upstream.',
    deepDiveTitle: 'Local production is not the same as local value content',
    body: (
      <div className="space-y-4">
        <p>A product labelled as made in Vietnam may combine imported commodity inputs, local labour, local packaging, domestic factory depreciation, local logistics and a global brand. A binary imported-versus-domestic label cannot reveal the value added at each stage.</p>
        <p>Localisation can progress in steps: workforce and distribution, then packaging and selected ingredients, then technical capability or supplier development. The best next step depends on quality, scale, total cost and resilience.</p>
        <EvidenceNote>The wheat figure is a snippet-only trade-body estimate. Named-company percentages for imported versus locally sourced inputs were not verified, so no local-content ratio is stated.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06', 'pf-m02-s07', 'pf-m02-s10'),
  }),
  chapter({
    title: 'Localization, Imports, Exports, and Supply Dependencies',
    chapterTitle: LESSON,
    readingTime: '8',
    objective: 'Evaluate localisation choices, distinguish input and finished-goods trade, and identify the dependencies that management must monitor.',
    mateIntro: '“Localise everything” is not a strategy. Some inputs cannot be grown competitively in Vietnam, some capabilities benefit from global scale, and some products require local production to win on cost and taste.',
    keyInsight: 'Resilience comes from deliberate dependency management: localise where Vietnam has an advantage, diversify unavoidable imports and preserve the global capabilities that create scale or quality.',
    narrative: [
      { label: 'What it is', text: 'Localisation can cover workforce, recipes, pack sizes, packaging, ingredients, factories and distribution. Imports can be raw materials, intermediate ingredients or premium finished goods; exports can be locally processed snacks and confectionery.' },
      { label: 'How it works', text: 'A make-versus-import decision compares landed cost, minimum scale, quality, freshness, lead time, tariffs, FX, resilience and consumer fit. It should be made input by input and SKU by SKU, not through a blanket target.' },
      { label: 'Global example', text: 'Cocoa remains tied to producing origins such as West Africa, so a Vietnam manufacturer manages that dependency through supplier diversity, contracts, inventory and sourcing programmes rather than attempting full agricultural localisation.' },
      { label: 'Vietnam example', text: 'Mass biscuits, candy and ChocoPie-type products can be made locally, while some premium chocolate and speciality confectionery arrive as finished imports. Vietnam also exports some processed products regionally, but row 23 does not quantify those flows.' },
      { label: 'Why it matters', text: 'A dependency map turns broad supply-chain risk into actions: alternative origins, dual suppliers, inventory policy, FX protection, local supplier development or product reformulation.' },
    ],
    visualKind: 'packaged-food-m2-26-3',
    visualHeading: 'Choose what to globalise, localise, import or export',
    visualIntro: 'Evaluate each flow by feasibility, economics, consumer fit and resilience rather than by ownership label.',
    imageAlt: 'Decision matrix for localising importing exporting and managing packaged-food dependencies',
    statTiles: [
      { value: '~2kg', label: 'Vietnam confectionery consumption per person, 2022', subtitle: 'Versus about 3kg globally', description: 'Secondary industry estimate via VnExpress; signals possible headroom, not a guaranteed growth outcome.' },
      { value: '>60%', label: 'Global cocoa supplied by Ghana and Côte d’Ivoire combined', subtitle: 'Concentrated origin dependency', description: 'Secondary-source share illustrating why cocoa cannot simply be localised by a Vietnam manufacturer.' },
    ],
    keyTerms: [
      { term: 'Localisation', definition: 'Adapting or moving activities, inputs and capabilities closer to a local market.' },
      { term: 'Finished-goods import', definition: 'A completed consumer product shipped into a country for sale.' },
      { term: 'Dual sourcing', definition: 'Qualifying more than one supplier or source for an input to reduce dependency.' },
      { term: 'Supply dependency', definition: 'Reliance on a specific origin, supplier, route, currency or capability.' },
    ],
    recap: [
      'Localisation decisions should be activity- and input-specific.',
      'Input imports and finished-goods imports are different flows.',
      'Some dependencies are structural and must be managed, not eliminated.',
      'Vietnam export and import claims need quantified trade data before precise conclusions.',
    ],
    chapterRecap: 'The objective is not maximum localisation; it is the best balance of value, fit, control and resilience.',
    deepDiveTitle: 'Preserve the directional claims—and the gaps',
    body: (
      <div className="space-y-4">
        <p>The research supports a clear wheat dependency and directionally describes reliance on imported industrial cocoa plus significant refined-sugar imports. Vietnam also has a small domestic cocoa crop and material domestic sugar output, so “imports all cocoa and sugar” would be false.</p>
        <p>Likewise, the research says Vietnam exports some processed snacks and confectionery regionally and imports premium finished chocolate, but it does not provide HS-line values or a net-trade balance. Those claims should remain qualitative until Customs or UN Comtrade data are added.</p>
        <EvidenceNote>Vietnam cocoa, sugar and confectionery import/export volumes and values were not primary-quantified in row 23. The directional wording is intentionally preserved and no trade share is inferred.</EvidenceNote>
      </div>
    ),
    sources: citePfM2('pf-m02-s06', 'pf-m02-s09', 'pf-m02-s10'),
  }),
];

const quiz: PackagedFoodQuestion[] = pairedQuiz('pf-m2-l6', [
  { chapter: '1', objective: 'Explain global-to-local design', question: 'Why are many finished snacks manufactured near consumers?', application: 'A company considers importing every biscuit from one distant factory. Which local-production advantages should it test?', correct: 'Lower finished-goods transport, freshness, local adaptation and faster market service', wrong: ['The ability to grow cocoa in every market', 'Elimination of all quality controls', 'Guaranteed immunity from commodity prices'], explanation: 'Bulky, taste-sensitive finished products often benefit from local manufacturing and distribution. Review Chapter 2.6.1.' },
  { chapter: '1', objective: 'Understand concentration risk', question: 'Why does the >60% cocoa figure matter?', application: 'A chocolate maker has several suppliers, but all source from Ghana and Côte d’Ivoire. What risk remains?', correct: 'Common geographic exposure to weather, crop disease and regional disruption', wrong: ['No cocoa-price exposure', 'Only a retail shelf risk', 'A guaranteed production increase'], explanation: 'Supplier count does not remove shared origin concentration. Review Chapter 2.6.1.' },
  { chapter: '1', objective: 'Trace a commodity shock', question: 'What was projected for world cocoa production in 2023/24?', application: 'A team needs the sourced production anchor for the cocoa shock. Which statement is supported?', correct: '4,461 thousand tonnes, down 11.7% year on year', wrong: ['4,461 million tonnes, up 11.7%', 'Exactly 60% of 2022 output', '1.8 million tonnes grown in Vietnam'], explanation: 'ICCO projected 4,461kt and an 11.7% decline for 2023/24. Review Chapter 2.6.1.' },
  { chapter: '2', objective: 'Map Vietnam’s hybrid chain', question: 'Which description best fits Vietnam’s packaged-food chain?', application: 'A locally made biscuit uses imported wheat and local labour, packaging and distribution. How should it be classified?', correct: 'A hybrid chain with globally exposed inputs and local midstream/downstream value creation', wrong: ['A wholly imported finished product', 'A chain with no FX exposure', 'A wholly domestic agricultural chain'], explanation: 'Origin, processing and route-to-market can have different geographic footprints. Review Chapter 2.6.2.' },
  { chapter: '2', objective: 'Use wheat evidence carefully', question: 'What does the >1.8Mt figure represent?', application: 'A slide calls it official Vietnam Customs data for all grain. What is the correction?', correct: 'A trade-body estimate of annual milling-wheat imports, with snippet-only verification', wrong: ['Official cocoa production', 'All packaged-food imports', 'Orion’s annual output'], explanation: 'The source is U.S. Wheat Associates and should be reconfirmed against primary trade data. Review Chapter 2.6.2.' },
  { chapter: '2', objective: 'Interpret localisation', question: 'What does Orion’s workforce example demonstrate?', application: 'A foreign-owned company employs about 3,600 people with about 21 South Korean staff. What is the strongest supported inference?', correct: 'Foreign ownership can coexist with deep local operational staffing', wrong: ['Every input is locally sourced', 'The company has no global links', 'Vietnam exports all of its output'], explanation: 'Workforce localisation does not prove complete input localisation. Review Chapter 2.6.2.' },
  { chapter: '2', objective: 'Explain localisation by acquisition', question: 'What did Mondelez’s VND7,846bn transaction purchase?', application: 'A multinational wants local brands, plants and market access faster than building from zero. Which mechanism fits?', correct: 'An 80% interest in Kinh Do Binh Duong’s confectionery business', wrong: ['Vietnam’s wheat crop', 'All General Trade outlets', 'Ghana’s cocoa production'], explanation: 'The 2014 acquisition illustrates localisation through buying an established operating platform. Review Chapter 2.6.2.' },
  { chapter: '3', objective: 'Evaluate localisation choices', question: 'What is the best principle for deciding whether to localise an input?', application: 'A local supplier is available but has inconsistent quality and higher total cost. What should management do?', correct: 'Compare quality, scale, landed cost, lead time, resilience and consumer fit input by input', wrong: ['Localise every input regardless of economics', 'Import every input regardless of risk', 'Choose solely by supplier nationality'], explanation: 'Localisation is a strategic trade-off, not an automatic target. Review Chapter 2.6.3.' },
  { chapter: '3', objective: 'Preserve directional evidence', question: 'Which statement about Vietnam cocoa and sugar is supported?', application: 'An analyst writes that Vietnam imports all cocoa and sugar. How should the claim be corrected?', correct: 'Vietnam relies heavily on imported industrial cocoa and supplements domestic sugar with significant refined-sugar imports, but the shares were not quantified', wrong: ['Vietnam has no domestic cocoa or sugar output', 'Vietnam is fully self-sufficient in both', 'Exact import shares were primary-verified'], explanation: 'The research deliberately uses directional wording and records the missing trade data. Review Chapter 2.6.3.' },
  { chapter: '3', objective: 'Manage dependencies', question: 'Which action directly reduces single-source dependency?', application: 'A manufacturer depends on one origin and one supplier for a critical input. Which response adds resilience?', correct: 'Qualify alternative suppliers or origins and set an appropriate inventory policy', wrong: ['Rename the finished SKU', 'Ignore FX and lead time', 'Assume local production removes import risk'], explanation: 'Dependency management combines source diversity, inventory, contracts and contingency design. Review Chapter 2.6.3.' },
]);

const takeaways: PackagedFoodTakeaways = {
  learned: 'You can explain global-to-local network design, map Vietnam’s hybrid value chain and assess localisation, trade flows and structural supply dependencies.',
  keyTakeaways: [
    'Climate-bound commodities are globally sourced while many finished foods are produced near demand.',
    'Cocoa concentration transmits West African disruption into global chocolate economics.',
    'Vietnam combines imported upstream inputs with deeply local manufacturing and distribution.',
    'Wheat dependency is evidenced; cocoa, sugar and trade-flow shares remain unquantified.',
    'The best localisation decision balances cost, quality, consumer fit, control and resilience.',
  ],
  businessImplications: 'Vietnam managers must pair local product and route-to-market excellence with global commodity, FX, supplier and import-logistics risk management.',
  remember: 'Locally made does not mean locally sourced, and globally owned does not mean locally disconnected.',
  nextLesson: 'Industry Business Models',
};

export const PACKAGED_FOOD_M2_LESSON6 = { deck, quiz, takeaways };
