// Casemate Domain Knowledge — Vietnam FMCG specialist decks.
// Research cut: public 2024–2025 company reports, Euromonitor/NIQ/Kantar summaries,
// government-policy reporting and Casemate's own MT fit rubrics.

interface QuizSeed { question: string; options: string[]; answer: number; explanation: string }
interface RoleSeed { name: string; intro: string; bullets: string[] }
interface CaseSeed { company: string; title: string; front: string; story: string[]; question: string }
interface FmcgIndustrySeed {
  slug: string;
  parentSlug: 'fmcg';
  label: string;
  shortLabel: string;
  badge: string;
  tagline: string;
  icon: string;
  accent: string;
  basics: { front: string; back: string[] };
  process: { title: string; flow: string[]; bullets: string[] };
  operations: { front: string; back: string[] };
  valueChain: { flow: string[]; bullets: string[] };
  economics: { front: string; back: string[] };
  metrics: string[];
  quizzes: QuizSeed[];
  roles: RoleSeed[];
  cases: CaseSeed[];
  interview: { front: string; back: string[] };
  synthesis: { flow: string[]; bullets: string[] };
}

export const FMCG_SUBINDUSTRY_SLUGS = [
  'fmcg-dairy',
  'fmcg-beer',
  'fmcg-beverages',
  'fmcg-snacks',
  'fmcg-personal-home-care',
  'fmcg-seasonings',
] as const;

export const FMCG_SUBINDUSTRY_SEEDS: FmcgIndustrySeed[] = [
  {
    slug: 'fmcg-dairy', parentSlug: 'fmcg', label: 'Dairy & Nutritional Drinks', shortLabel: 'Dairy', badge: 'Dairy Category Analyst', icon: 'Milk', accent: 'var(--space-brand-primary-600)',
    tagline: 'Cold-chain economics, nutrition science and the Vietnamese family basket.',
    basics: {
      front: 'Vietnam’s broader dairy-and-eggs market was estimated at about US$8.5bn in 2024, while Vinamilk reported dairy consumer spending down 0.3% YoY as the category stabilized. Globally, dairy generated about US$637bn in 2024 with 3.4% historic CAGR (Research and Markets). Scope matters: liquid milk grows differently from yogurt, formula or plant-based alternatives.',
      back: [
        'MT takeaway: quote the category definition with the number—never compare a liquid-milk share with a total-dairy market size.',
        'Vinamilk remains the local value leader at more than 40% of industry revenue in brokerage estimates; TH true MILK, FrieslandCampina, Nestlé and Abbott compete by segment.',
        'Euromonitor’s outlook points to moderate single-digit Vietnam growth, led by high-protein, organic, nut milk and nutrition for older consumers.',
      ],
    },
    process: {
      title: 'From farm to chilled shelf',
      flow: ['Farm & feed', 'Milk collection', 'Quality test', 'Pasteurize / UHT', 'Fill & pack', 'Cold or ambient route'],
      bullets: ['MT takeaway: the process choice determines shelf life, service level and working capital.', 'Fresh pasteurized milk needs cold-chain discipline; UHT milk trades some freshness cues for ambient reach.', 'Fat, protein, microbiology and traceability are release-critical—not just factory throughput.'],
    },
    operations: {
      front: 'Dairy is a split-channel business. General trade gives national reach through distributors and neighborhood stores; modern trade gives refrigeration, shopper data and premium visibility. Vinamilk reported modern trade growing 6.5% in 2024 while traditional trade declined 2.1%; school, hospital, café and e-commerce channels create separate buying missions.',
      back: ['MT takeaway: propose different packs, service levels and trade terms by channel.', 'Demand peaks around Tet gifting, school terms and hot-weather refreshment; infant and senior nutrition are steadier need states.', 'Forecasting must protect short shelf-life products from both stock-outs and expiry waste.'],
    },
    valueChain: {
      flow: ['Feed & herd', 'Farm / imports', 'Processing', 'Cold warehouse', 'Distributor / key account', 'Household'],
      bullets: ['MT takeaway: dairy advantage is a quality-and-availability system, not one campaign.', 'Domestic raw milk covers only part of demand, so powder, feed and FX exposure matter.', 'Category management separates family staples, kids nutrition, adult nutrition, yogurt and indulgence by occasion and shelf temperature.'],
    },
    economics: {
      front: 'Revenue is realized price × volume × mix across everyday milk, yogurt, condensed milk and higher-margin nutrition. Gross margin moves with raw milk or powder, feed, packaging, energy, factory utilization and promotional depth. Vinamilk’s 2024 international revenue rose 12.6%, showing exports can diversify a slow domestic year.',
      back: ['MT takeaway: diagnose whether growth came from household consumption, premium mix, channel inventory or exports.', 'Small packs recruit and improve affordability; family packs raise basket value but require stronger cash outlay.', 'Reformulation, fortification and claims require R&D, sensory testing and regulatory evidence before media spend.'],
    },
    metrics: ['Household penetration & purchase frequency — who buys and how often', 'Weighted distribution / ACV — quality of stores carrying the SKU', 'Rate of sale & expiry — velocity versus freshness loss', 'Forecast accuracy & service level — planning quality', 'Gross margin / net revenue — after discounts and trade spend'],
    quizzes: [
      { question: 'Which format usually travels without refrigeration?', options: ['Pasteurized fresh milk', 'UHT aseptic milk', 'Open yogurt cup', 'Soft cheese'], answer: 1, explanation: 'UHT treatment plus aseptic packaging enables ambient distribution before opening.' },
      { question: 'Why can more dairy stock hurt profit?', options: ['Milk has no demand', 'Expiry and cold-space costs rise', 'It lowers service level automatically', 'Retailers reject every case'], answer: 1, explanation: 'Short shelf life makes excess inventory a direct waste and markdown risk.' },
      { question: 'Which KPI best weights high-value outlets?', options: ['Numeric distribution', 'Weighted distribution / ACV', 'Headcount', 'Farm acreage'], answer: 1, explanation: 'Weighted distribution reflects the category sales represented by carrying outlets.' },
      { question: 'What can lift dairy margin fastest?', options: ['Premium mix and lower product cost', 'More expired stock', 'Longer meetings', 'More SKUs without demand'], answer: 0, explanation: 'Mix, realized price, yield and input cost directly change unit economics.' },
      { question: 'Who validates a nutrition claim?', options: ['R&D with regulatory and quality', 'Sales alone', 'The media agency', 'Any influencer'], answer: 0, explanation: 'Claims need formulation evidence, compliant language and controlled quality.' },
    ],
    roles: [
      { name: 'Dairy Marketing MT', intro: 'You translate a life-stage need into proposition, pack and communication.', bullets: ['MT takeaway: link brand work to penetration, frequency or premium mix.', 'Read household panels and need-state research.', 'Brief claims, innovation and media with R&D and legal.', 'Track trial, repeat, brand power and marketing ROI.'] },
      { name: 'Dairy Sales MT', intro: 'You protect cold availability and profitable assortment outlet by outlet.', bullets: ['MT takeaway: separate sell-in from genuine off-take.', 'Ride GT routes and review distributor stock days.', 'Negotiate planograms, chillers and promotions in MT.', 'Track weighted distribution, rate of sale and expiry.'] },
      { name: 'Dairy Supply Chain MT', intro: 'You balance freshness, service and constrained processing capacity.', bullets: ['MT takeaway: explain the service–waste trade-off quantitatively.', 'Challenge forecasts by SKU and shelf life.', 'Plan milk collection, lines, cold storage and transport.', 'Track OTIF, forecast error, yield and waste.'] },
      { name: 'Dairy Finance & R&D MT', intro: 'Finance tests the P&L; R&D turns nutrition into a stable product.', bullets: ['MT takeaway: show both consumer value and margin viability.', 'Build renovation and innovation business cases.', 'Model commodity, FX and pack-size sensitivity.', 'Validate formula, sensory quality, claims and scale-up.'] },
    ],
    cases: [
      { company: 'Vinamilk', title: 'Premiumize a mature core', front: 'Vinamilk faced soft domestic dairy spending in 2024 while health-led niches grew. It invested in Green Farm, high-protein and specialized nutrition while using its broad route to market. The strategic question is how much premium architecture the mass market will support.', story: ['MT takeaway: leadership does not remove the need to recruit new occasions.', '2024 dairy spend declined 0.3%, but modern trade grew 6.5% according to Vinamilk.', 'A winning plan must define target household, claim, pack, channel and repeat KPI.', 'Interview question this unlocks: How would you grow dairy without discounting the core?'], question: 'How would you grow dairy without discounting the core?' },
      { company: 'Nestlé', title: 'Nutrition plus commercial rigor', front: 'Nestlé’s Vietnam portfolio spans nutrition and beverages, so candidates must connect science, affordability and route-to-market execution. Casemate’s #SparkTheNext rubric emphasizes business acumen, analytics, agility and values around nutrition, sustainability and respect.', story: ['MT takeaway: use a quantified consumer problem, not a generic health trend.', 'Translate the need into formula, claim, price-pack and channel.', 'Stress-test affordability against commodity and trade costs.', 'Track trial, repeat and gross margin together.', 'Interview question this unlocks: Design a senior-nutrition launch for tier-two cities.'], question: 'Design a senior-nutrition launch for tier-two cities.' },
      { company: 'TH true MILK', title: 'Make provenance pay', front: 'TH true MILK built differentiation around controlled farms, freshness and natural positioning. Provenance can justify premium pricing only when shoppers understand and trust the benefit. Distribution and cold execution still decide whether the promise reaches the basket.', story: ['MT takeaway: convert farm investment into a measurable shopper reason to choose.', 'Use traceability and quality as proof, not decorative storytelling.', 'Choose channels where premium cues and refrigeration are visible.', 'Guard against a price gap larger than perceived value.', 'Interview question this unlocks: Which proof point should TH scale first?'], question: 'Which proof point should TH scale first?' },
    ],
    interview: {
      front: 'Expect competency questions on field resilience, analytical trade-offs and influencing quality, sales or distributors without authority. A dairy case often asks whether to launch a high-protein SKU, improve cold availability or reduce expiry while protecting service.',
      back: ['MT takeaway: answer in STAR, quantify the decision, then name the category KPI.', 'Data point: modern trade +6.5% versus traditional trade -2.1% in dairy during 2024 (Vinamilk).', 'Structure cases as need state → claim → pack/price → channel → freshness → P&L.', 'Show learning agility and consumer purpose—the same themes in Casemate’s Nestlé and Unilever fit rubrics.'],
    },
    synthesis: { flow: ['Life-stage need', 'Science & claim', 'Pack-price', 'Cold / ambient route', 'Repeat & margin'], bullets: ['MT takeaway: every growth idea must survive science, affordability and shelf life.', 'Use penetration, repeat, weighted distribution and expiry as linked diagnostics.', 'Name one risk: commodity inflation, falling birth rate, claim credibility or cold-chain execution.'] },
  },
  {
    slug: 'fmcg-beer', parentSlug: 'fmcg', label: 'Beer & Alcoholic Drinks', shortLabel: 'Beer & Alcohol', badge: 'Beer Category Strategist', icon: 'Beer', accent: 'var(--space-semantic-warning-700)',
    tagline: 'Occasion-led portfolios, brewery constraints and regulated route-to-consumer.',
    basics: {
      front: 'Vietnam consumed roughly 4.6bn liters of beer in 2024 and remains one of the world’s largest beer markets; estimates place local value near US$7.9bn. The global beer market was about US$883bn in 2025 with a 4.2% forecast CAGR (Fortune Business Insights). Definitions and years differ, so use figures as directional anchors, not false precision.',
      back: ['MT takeaway: pair any market number with year, source and volume-versus-value scope.', 'Heineken and Sabeco together hold roughly three quarters of Vietnam volume; Carlsberg and Habeco are strong regional challengers.', 'Premiumization can lift value while regulation and affordability suppress volume.'],
    },
    process: {
      title: 'Brewery tanks set the clock',
      flow: ['Malt & adjuncts', 'Mash / boil', 'Ferment', 'Condition', 'Filter', 'Can / bottle / keg'],
      bullets: ['MT takeaway: brewing lead time makes forecast error a tank-capacity problem.', 'Fermentation and conditioning cannot be compressed like simple packing.', 'Pack mix changes line capacity, logistics, deposit economics and occasion.'],
    },
    operations: {
      front: 'Beer route-to-consumer splits between on-trade outlets such as restaurants and bars, and off-trade outlets such as GT shops, supermarkets and convenience stores. Traditional trade remains important for beer and impulse beverages in Vietnam. Demand spikes around Tet, football, weddings and hot weather, but drink-driving enforcement can shift occasions toward at-home and low/no-alcohol choices.',
      back: ['MT takeaway: build an occasion × channel plan, not one national promotion.', 'Distributors manage heavy cases, returnable bottles, cooling assets and outlet credit.', 'Responsible marketing, age controls and excise compliance are non-negotiable constraints.'],
    },
    valueChain: {
      flow: ['Malt / hops', 'Brewery', 'Pack line', 'Distributor', 'On / off trade', 'Legal-age consumer'],
      bullets: ['MT takeaway: value is won through portfolio, cold availability and execution within regulation.', 'Returnable glass can lower material cost but adds reverse logistics and bottle loss.', 'Category management separates mainstream, premium, craft and low/no-alcohol by occasion and price ladder.'],
    },
    economics: {
      front: 'Brewers earn through volume, price, premium mix and pack/channel mix, then absorb excise, raw materials, packaging, brewery conversion, logistics and trade investment. High fixed assets reward utilization, but loading distributors before Tet can create a post-holiday hangover. Vietnam’s amended excise path raises beer tax from 65% in 2026 toward 90% by 2031.',
      back: ['MT takeaway: model consumer price, volume elasticity, mix and margin after tax—not gross revenue alone.', 'Premium SKUs can offset volume pressure when the occasion supports willingness to pay.', 'Water, energy and carbon intensity make brewery efficiency a strategic and sustainability metric.'],
    },
    metrics: ['Depletions / off-take — distributor-to-outlet or shopper movement', 'Cold availability & perfect outlet — execution quality', 'Share of throat / market share — category choice', 'Revenue per hectoliter — price and portfolio mix', 'Brewery yield / OEE — good volume from installed assets'],
    quizzes: [
      { question: 'Why does brewing need longer planning?', options: ['Labels take years', 'Fermentation and conditioning occupy tanks', 'Beer has no seasonality', 'Retailers brew it'], answer: 1, explanation: 'Biological processing and tank residence create a real capacity lead time.' },
      { question: 'Which is an on-trade account?', options: ['Neighborhood grocery', 'Restaurant or bar', 'Distribution center', 'Packaging supplier'], answer: 1, explanation: 'On-trade means the drink is consumed at the licensed hospitality venue.' },
      { question: 'Which KPI captures price and premium mix?', options: ['Revenue per hectoliter', 'Headcount', 'Shelf width only', 'Factory age'], answer: 0, explanation: 'Revenue per hectoliter rises with realized price, pack and portfolio mix.' },
      { question: 'What should an excise case model?', options: ['Only tax rate', 'Price, elasticity, mix and net margin', 'Only media reach', 'Only bottle color'], answer: 1, explanation: 'Tax pass-through changes consumer price, demand, portfolio and profit together.' },
      { question: 'First screen for a beer campaign?', options: ['Virality', 'Legal, age and responsible-marketing compliance', 'Number of hashtags', 'Office preference'], answer: 1, explanation: 'Alcohol strategy starts inside legal and responsible-consumption boundaries.' },
    ],
    roles: [
      { name: 'Beer Sales MT', intro: 'You turn portfolio strategy into cold, visible and compliant outlets.', bullets: ['MT takeaway: show field grit and distributor influence.', 'Audit depletions, stock age and cooler execution.', 'Coach routes and segment outlets by occasion.', 'Track perfect outlet, off-take and trade ROI.'] },
      { name: 'Beer Marketing MT', intro: 'You build brands around adult occasions, not indiscriminate reach.', bullets: ['MT takeaway: define the occasion and responsible target precisely.', 'Manage portfolio roles and revenue per hectoliter.', 'Brief events, media and innovation within codes.', 'Measure equity, trial, frequency and mix.'] },
      { name: 'Brewery Supply MT', intro: 'You protect quality while balancing tanks, packs and peaks.', bullets: ['MT takeaway: translate demand into tank and line constraints.', 'Run S&OP scenarios for Tet and promotions.', 'Track OEE, yield, water, energy and OTIF.', 'Coordinate returnable bottles and packaging supply.'] },
      { name: 'Beer Finance MT', intro: 'You expose whether volume creates value after excise and trade spend.', bullets: ['MT takeaway: bridge gross-to-net revenue clearly.', 'Model tax, elasticity and premium mix.', 'Challenge promotion and cooler investment ROI.', 'Explain price-volume-mix and variance.'] },
    ],
    cases: [
      { company: 'Heineken', title: 'Premiumize under pressure', front: 'Heineken built Vietnam leadership through premium brands, route-to-consumer and strong on-trade execution. The market now combines premium demand with stricter drink-driving norms and rising excise. The answer is a portfolio and occasion strategy, not simply higher media spend.', story: ['MT takeaway: protect premium value while recruiting safer occasions.', 'Use Heineken, Tiger and low/no-alcohol roles without cannibalizing blindly.', 'Separate urban on-trade, at-home and regional mainstream occasions.', 'Track revenue per hectoliter, depletions and responsible-reach compliance.', 'Interview question this unlocks: How would you grow premium beer after an excise increase?'], question: 'How would you grow premium beer after an excise increase?' },
      { company: 'Sabeco', title: 'Defend mainstream leadership', front: 'Sabeco combines nationwide scale, strong Saigon Beer brands and a large brewery network. Its challenge is to modernize execution and premiumize while defending an affordable mainstream base. A plant footprint is an advantage only when demand, quality and distribution stay synchronized.', story: ['MT takeaway: diagnose region, segment and channel before changing price.', 'Sabeco held roughly one-third of Vietnam beer volume in recent estimates.', 'Use route productivity and pack architecture before blanket discounts.', 'Balance brewery utilization with healthy distributor inventory.', 'Interview question this unlocks: Where should Sabeco premiumize first?'], question: 'Where should Sabeco premiumize first?' },
      { company: 'Carlsberg', title: 'Win region by region', front: 'Carlsberg’s strength in Central Vietnam shows that beer markets are locally textured. Casemate’s Carlsberg GTP rubric emphasizes mobility, regional mindset, analytics and willingness to work across functions. A national plan must still respect local brand heritage and outlet economics.', story: ['MT takeaway: localization is a commercial system, not a translated slogan.', 'Map regional price ladders, occasions and distributor strength.', 'Pilot portfolio and outlet standards before scaling.', 'Show mobility and field evidence in GTP interviews.', 'Interview question this unlocks: How would you expand a Central stronghold southward?'], question: 'How would you expand a Central stronghold southward?' },
    ],
    interview: {
      front: 'Typical questions test ownership, mobility, responsible judgment and the ability to work with distributors or brewery teams. Case prompts often cover an excise increase, premium launch, falling on-trade traffic or a Tet stock imbalance.',
      back: ['MT takeaway: state the legal boundary, then solve occasion → channel → portfolio → capacity → P&L.', 'Data point: Vietnam consumed about 4.6bn liters in 2024; Heineken and Sabeco dominate.', 'Use price-volume-mix, depletions and stock days—never celebrate sell-in alone.', 'Carlsberg and AB InBev fit rubrics reward mobility, ownership, analytical thinking and field readiness.'],
    },
    synthesis: { flow: ['Adult occasion', 'Portfolio tier', 'Channel / cold', 'Brewery & stock', 'Net revenue after tax'], bullets: ['MT takeaway: beer cases are regulated occasion-and-capacity cases.', 'Always separate on-trade from off-trade and volume from value.', 'Name one guardrail: responsible reach, drink-driving context, stock age or water use.'] },
  },
  {
    slug: 'fmcg-beverages', parentSlug: 'fmcg', label: 'Soft Drinks & Refreshment Beverages', shortLabel: 'Soft Drinks', badge: 'Beverage Growth Operator', icon: 'CupSoda', accent: 'var(--space-brand-primary-500)',
    tagline: 'Cold availability, sugar reformulation and high-frequency refreshment occasions.',
    basics: {
      front: 'Vietnam sold about 4.66bn liters of soft drinks in 2023, up 4.8%; RTD tea led with 34.2%, followed by bottled water and carbonates (Research and Markets). The wider global non-alcoholic drinks market was US$1.46tn in 2023 and forecast to grow 6.0% annually to 2030; soft drinks were 23.9% of value. Category scope must distinguish carbonates, tea, water, energy, juice and sports drinks.',
      back: ['MT takeaway: define the beverage segment before quoting growth or share.', 'Suntory PepsiCo leads the consolidated Vietnam landscape; Coca-Cola and Tan Hiep Phat are major competitors with different portfolio strengths.', 'Growth is shifting from pure liters toward hydration, function, lower sugar and better price-pack architecture.'],
    },
    process: {
      title: 'From concentrate to cold drink',
      flow: ['Water treatment', 'Syrup / tea brew', 'Blend', 'Carbonate / hot fill', 'Bottle / can', 'Warehouse & cold route'],
      bullets: ['MT takeaway: water quality, line speed and package choice drive both trust and margin.', 'Carbonates, RTD tea and water use different process controls and fill technologies.', 'PET, cans and returnable glass create different costs, recyclability and channel fit.'],
    },
    operations: {
      front: 'GT outlets create reach and impulse availability; MT, convenience, foodservice and e-commerce create multipacks, data and planned hydration missions. Heat, travel, school and outdoor occasions drive demand, with major peaks around Tet and summer. Cold availability matters because a warm beverage can be physically present but commercially unavailable.',
      back: ['MT takeaway: audit cold availability and rate of sale, not distribution alone.', 'Route trucks balance case weight, drop size, cooler assets and frequent replenishment.', 'The best pack differs by mission: single-serve impulse, meal bundle, family PET or e-commerce multipack.'],
    },
    valueChain: {
      flow: ['Water / ingredients', 'Preform & packaging', 'Bottling', 'Distributor', 'Cooler / shelf', 'Consumption occasion'],
      bullets: ['MT takeaway: every bottle carries liquid, packaging, freight and trade economics.', 'Beverages are heavy and relatively low value per kilogram, so network design matters.', 'Category management groups hydration, energy, indulgence and meal accompaniment—not just brand blocks.'],
    },
    economics: {
      front: 'Beverage revenue grows through liters, realized price, pack/channel mix and cooler-driven availability. Vietnam’s sugar-sweetened beverage excise applies above 5g sugar per 100ml at 8% from 2027 and 10% from 2028, creating reformulation, pack and pricing choices. Companies must balance taste, tax threshold, input cost, PET exposure and marketing investment.',
      back: ['MT takeaway: model tax pass-through, elasticity, reformulation cost and cannibalization together.', 'Zero-sugar and functional products can premiumize, but only if repeat proves taste acceptance.', 'A smaller pack can preserve an accessible price point while changing price per liter.'],
    },
    metrics: ['Numeric & weighted distribution — reach and quality of reach', 'Cold availability — ready-to-consume presence', 'Rate of sale / off-take — units per outlet per day', 'Share of visible inventory / SOV — cooler and shelf visibility', 'Net revenue per liter — price, pack and trade-spend quality'],
    quizzes: [
      { question: 'Largest Vietnam soft-drink segment in 2023?', options: ['RTD tea', 'Sports drinks', 'Concentrates', 'Malt powder'], answer: 0, explanation: 'RTD tea represented about 34.2% of recorded soft-drink volume.' },
      { question: 'Why is cold availability distinct?', options: ['Warm stock may not serve impulse demand', 'Cold stock pays no tax', 'It removes distribution', 'It changes the formula'], answer: 0, explanation: 'A beverage can be listed but miss the immediate refreshment occasion if it is not chilled.' },
      { question: 'Which KPI compares price and pack mix?', options: ['Net revenue per liter', 'Employee tenure', 'Factory count', 'Followers'], answer: 0, explanation: 'Revenue per liter reflects realized price after mix and commercial deductions.' },
      { question: 'First response to sugar excise?', options: ['Assume full pass-through', 'Model reformulation, packs, price and elasticity', 'Stop measuring taste', 'Add every flavor'], answer: 1, explanation: 'The right choice depends on consumer response, threshold, cost and portfolio roles.' },
      { question: 'What does a Sales MT inspect?', options: ['Only ad recall', 'Stock, cooler, price and off-take', 'Only lab pH', 'Only payroll'], answer: 1, explanation: 'Beverage field execution converts brand demand into cold, visible, correctly priced stock.' },
    ],
    roles: [
      { name: 'Beverage Sales MT', intro: 'You run routes, distributors and cold execution at street level.', bullets: ['MT takeaway: prove field grit with outlet-level evidence.', 'Review sell-in, off-take, stock days and returns.', 'Segment outlets and deploy coolers by ROI.', 'Track perfect outlet and revenue per route.'] },
      { name: 'Beverage Marketing MT', intro: 'You own an occasion, portfolio role and measurable behavior change.', bullets: ['MT takeaway: connect communication to trial and repeat.', 'Read need-state, brand and pack data.', 'Design low/no-sugar and functional innovation.', 'Track penetration, frequency and SOV.'] },
      { name: 'Beverage Supply MT', intro: 'You keep fast lines and heavy networks aligned to volatile heat-driven demand.', bullets: ['MT takeaway: quantify service, capacity and inventory trade-offs.', 'Plan water, syrup, preforms, lines and transport.', 'Prepare summer and Tet scenarios.', 'Track OEE, yield, forecast error and OTIF.'] },
      { name: 'Beverage Finance & R&D MT', intro: 'You test whether reformulation and price-pack choices create value.', bullets: ['MT takeaway: join sensory evidence to a net-revenue bridge.', 'Model sugar tax and input-cost sensitivity.', 'Run taste, stability and scale-up trials.', 'Measure cannibalization, margin and payback.'] },
    ],
    cases: [
      { company: 'Suntory PepsiCo', title: 'Reformulate without losing repeat', front: 'Suntory PepsiCo leads Vietnam soft drinks across carbonates, tea, energy and water. The sugar-tax path raises the value of reformulation and zero-sugar portfolios, but taste remains the repeat engine. Casemate’s MT rubric also expects field grit, analytics and Yatte Minahare—go-for-it ownership.', story: ['MT takeaway: treat reformulation as a consumer-and-P&L experiment.', 'Choose SKUs by sugar exposure, volume and brand elasticity.', 'Test taste, claim, pack and channel before national rollout.', 'Track repeat, net revenue per liter and margin after tax.', 'Interview question this unlocks: Which SKU should be reformulated first?'], question: 'Which SKU should be reformulated first?' },
      { company: 'Coca-Cola', title: 'Make the cooler productive', front: 'Coca-Cola’s system advantage combines bottling, brand portfolio and ubiquitous cold equipment. A cooler is capital that must create incremental cold sales, not merely display stock. Outlet segmentation and replenishment discipline determine its return.', story: ['MT takeaway: allocate assets by incremental profit, not relationship alone.', 'Estimate outlet traffic, category velocity and electricity / service constraints.', 'Set assortment and planogram by mission.', 'Compare cooler uplift with capex and maintenance.', 'Interview question this unlocks: Where should the next 1,000 coolers go?'], question: 'Where should the next 1,000 coolers go?' },
      { company: 'Tan Hiep Phat', title: 'Scale Vietnamese tea occasions', front: 'Tan Hiep Phat built strong local RTD tea and energy brands around Vietnamese taste and broad distribution. Health concerns and stronger multinational competition now demand sharper claims and portfolio roles. Local insight is valuable only when quality and execution scale consistently.', story: ['MT takeaway: turn a cultural taste cue into a repeatable occasion.', 'Separate tea refreshment, energy and health propositions.', 'Use GT reach while improving modern and digital evidence.', 'Guard quality, sugar perception and pack affordability.', 'Interview question this unlocks: How should RTD tea defend against zero-sugar entrants?'], question: 'How should RTD tea defend against zero-sugar entrants?' },
    ],
    interview: {
      front: 'Expect questions on ownership, distributor influence, innovation under uncertainty and learning from field failure. Common cases ask for a sugar-tax response, cooler allocation, summer launch or recovery from a stock-out.',
      back: ['MT takeaway: use occasion → outlet → pack → cold execution → net revenue per liter.', 'Data point: 4.66bn liters in 2023; RTD tea represented 34.2% of volume.', 'Name GT and MT roles explicitly and separate sell-in from off-take.', 'Suntory PepsiCo’s fit rubric rewards analytics, result orientation, collaboration, innovation and field resilience.'],
    },
    synthesis: { flow: ['Need state', 'Formula / sugar', 'Pack-price', 'Cold outlet', 'Repeat & net revenue'], bullets: ['MT takeaway: beverages win when the right pack is cold at the exact occasion.', 'A tax response must protect taste, affordability and margin together.', 'Use rate of sale, cold availability and net revenue per liter as the core diagnostic trio.'] },
  },
  {
    slug: 'fmcg-snacks', parentSlug: 'fmcg', label: 'Confectionery & Snacks', shortLabel: 'Snacks', badge: 'Snacking Occasion Expert', icon: 'Cookie', accent: 'var(--space-semantic-warning-600)',
    tagline: 'Affordable indulgence, festive peaks and impulse-led category management.',
    basics: {
      front: 'Vietnam’s snack-food market was estimated near US$3.2bn in 2023, while global snacks reached about US$679bn in 2024 (Euromonitor) and grew roughly 4.2% in value. Savory snacks lead globally, but Vietnam combines everyday biscuits, chips and pies with large Tet and Mid-Autumn gifting missions. Market boundaries vary between snacks, bakery and confectionery.',
      back: ['MT takeaway: define whether your case covers savory, biscuits, chocolate, candy or festive products.', 'Mondelez Kinh Do, Orion, PepsiCo, URC and domestic players compete through taste, price points, novelty and reach.', 'Growth can come from more occasions, premium gifting or price/mix—not only more units.'],
    },
    process: {
      title: 'Bake, season and protect crunch',
      flow: ['Ingredients', 'Mix / form', 'Bake / fry', 'Season / coat', 'Primary pack', 'Carton & route'],
      bullets: ['MT takeaway: moisture, oil and packaging barrier determine shelf experience.', 'Changeovers and allergen controls constrain line flexibility.', 'Nitrogen, seals and secondary packaging protect breakage and freshness.'],
    },
    operations: {
      front: 'GT drives impulse and neighborhood reach; MT builds family packs, displays and gift boxes; convenience serves on-the-go; e-commerce expands bundles and seasonal gifting. Tet and Mid-Autumn create forecast, labor and display peaks, while school calendars and football create smaller occasions. Unsold festive inventory loses value quickly after the event.',
      back: ['MT takeaway: plan seasonality backward from the consumption date and exit inventory.', 'Single packs recruit; multipacks lift basket; gift boxes monetize presentation and trust.', 'Outlet execution must protect availability without crushing fragile packs or loading stale stock.'],
    },
    valueChain: {
      flow: ['Cocoa / flour / oil', 'Factory', 'Barrier packaging', 'Distributor', 'Shelf / display', 'Impulse or gifting'],
      bullets: ['MT takeaway: snacks sell sensory consistency plus availability and occasion cues.', 'Cocoa, sugar, oil and film volatility affect margin differently by subcategory.', 'Category management uses segments, price ladders, adjacencies and checkout visibility to grow the total shelf.'],
    },
    economics: {
      front: 'Revenue equals units × realized price, enriched by pack size, premium chocolate or festive gift mix. Major costs are ingredients, oil, energy, packaging, line conversion, freight, promotions and write-offs. Orion’s Vietnam revenue grew 7.9% in the first nine months of 2024 while pies and snacks contributed about 80% of local sales.',
      back: ['MT takeaway: separate repeatable core growth from one-off seasonal loading.', 'Small price points protect accessibility; grammage changes must avoid a trust backlash.', 'Gross margin can improve through yield, pack architecture, mix and disciplined seasonal sell-through.'],
    },
    metrics: ['Rate of sale — packs per outlet per period', 'Penetration & repeat — recruitment and habit', 'Share of shelf / SOV — visibility in impulse zones', 'Seasonal sell-through — sold before event end', 'Gross margin & waste — value after materials and write-offs'],
    quizzes: [
      { question: 'Biggest risk after a festival?', options: ['Too much evergreen demand', 'Obsolete seasonal stock', 'Lower cocoa cost', 'Extra shelf life'], answer: 1, explanation: 'Gift and event packaging loses relevance quickly, causing markdowns and write-offs.' },
      { question: 'Why use barrier packaging?', options: ['Protect moisture, oxygen and crunch', 'Increase NIM', 'Replace forecasting', 'Remove all allergens'], answer: 0, explanation: 'Freshness and texture depend on controlling moisture and oxidation.' },
      { question: 'Best seasonal execution KPI?', options: ['Sell-through before event end', 'Factory age', 'Email opens', 'Number of flavors'], answer: 0, explanation: 'Sell-through connects shipment, consumer demand and residual inventory risk.' },
      { question: 'What protects an accessible price?', options: ['Price-pack architecture', 'Only premium packs', 'More write-offs', 'Ignoring grammage'], answer: 0, explanation: 'Pack size and format let brands manage cash outlay and price per gram.' },
      { question: 'Who owns shelf productivity?', options: ['Sales and category / trade marketing', 'Only HR', 'Only lab staff', 'The courier alone'], answer: 0, explanation: 'Commercial teams combine shopper logic, retailer economics and execution.' },
    ],
    roles: [
      { name: 'Snacks Marketing MT', intro: 'You convert moods and occasions into distinctive products and packs.', bullets: ['MT takeaway: name the occasion, sensory promise and repeat goal.', 'Read penetration, repeat and brand data.', 'Plan flavor, format and festive calendars.', 'Track trial, repeat and incremental sales.'] },
      { name: 'Snacks Sales MT', intro: 'You win impulse visibility without overloading the channel.', bullets: ['MT takeaway: balance display ambition with sell-through.', 'Audit shelf, checkout and secondary displays.', 'Review distributor stock age and rate of sale.', 'Negotiate seasonal exit plans with key accounts.'] },
      { name: 'Snacks Supply MT', intro: 'You synchronize ingredients, ovens, fryers and packaging around sharp peaks.', bullets: ['MT takeaway: show a peak plan and downside scenario.', 'Plan capacity and changeovers by family.', 'Protect quality, allergens and packaging supply.', 'Track yield, OEE, forecast error and waste.'] },
      { name: 'Snacks Finance & R&D MT', intro: 'You make indulgence distinctive, scalable and profitable.', bullets: ['MT takeaway: quantify sensory win, cost and cannibalization.', 'Model cocoa, oil and packaging sensitivity.', 'Run recipe, shelf-life and scale-up trials.', 'Evaluate pack and promotion ROI.'] },
    ],
    cases: [
      { company: 'Mondelez Kinh Do', title: 'Own festive gifting', front: 'Mondelez Kinh Do combines global snack brands with deep Vietnamese festive equity. Tet and Mid-Autumn can create premium mix and enormous visibility, but late inventory destroys value. The operating answer links design, forecast, customer commitments and exit rules.', story: ['MT takeaway: a seasonal P&L includes markdown and write-off risk.', 'Build base, upside and downside demand scenarios.', 'Segment gift packs by recipient, price point and channel.', 'Track weekly sell-through, not shipment alone.', 'Interview question this unlocks: How would you reduce mooncake leftovers by half?'], question: 'How would you reduce mooncake leftovers by half?' },
      { company: 'Orion', title: 'Localize the core portfolio', front: 'Orion’s Vietnam sales grew 7.9% in the first nine months of 2024; pies were 40.8% and snacks 39.5% of revenue. Strong local factories and familiar ChocoPie equity create scale. Growth still requires new occasions without diluting the hero products.', story: ['MT takeaway: use a hero SKU to recruit adjacencies, not endless variants.', 'Identify unmet occasions by daypart and household.', 'Test localized flavor, pack and price.', 'Measure incrementality and line complexity.', 'Interview question this unlocks: Which adjacency deserves Orion capacity?'], question: 'Which adjacency deserves Orion capacity?' },
      { company: 'PepsiCo', title: 'Grow savory occasions', front: 'PepsiCo’s snack system combines global product know-how, local flavors and beverage route synergies. Shared outlets can lower execution cost, but snacks and drinks do not always share the same buyer or shelf logic. Bundles must create incremental occasions rather than subsidize existing demand.', story: ['MT takeaway: prove bundle incrementality and route efficiency separately.', 'Choose meal, sharing or entertainment occasions.', 'Align pack sizes and price points across categories.', 'Track attachment, rate of sale and margin.', 'Interview question this unlocks: Should Lay’s bundle with beverages for football season?'], question: 'Should Lay’s bundle with beverages for football season?' },
    ],
    interview: {
      front: 'Expect questions about consumer curiosity, handling peak pressure, influencing retailers and learning from a failed launch. Cases frequently cover Tet forecasting, healthy-snack renovation, checkout assortment or cocoa-cost inflation.',
      back: ['MT takeaway: structure occasion → sensory proposition → pack-price → display → sell-through → margin.', 'Data point: global snacks reached US$679bn in 2024; Vietnam Orion sales rose 7.9% in 9M2024.', 'Use weekly rate of sale and stock age to challenge seasonal sell-in.', 'For MT answers, show analytical rigor plus willingness to visit stores and taste-test with consumers.'],
    },
    synthesis: { flow: ['Mood / occasion', 'Taste & texture', 'Pack-price', 'Impulse visibility', 'Repeat / sell-through'], bullets: ['MT takeaway: snacks are small purchases with large occasion and execution detail.', 'Seasonal stock needs explicit exit rules.', 'Use rate of sale, repeat and gross margin after waste to judge a launch.'] },
  },
  {
    slug: 'fmcg-personal-home-care', parentSlug: 'fmcg', label: 'Personal Care & Home Care', shortLabel: 'Personal & Home Care', badge: 'Care Portfolio Builder', icon: 'Sparkles', accent: 'var(--space-brand-primary-700)',
    tagline: 'Science-backed routines, social commerce and household performance.',
    basics: {
      front: 'Vietnam beauty and personal care reached roughly VND98.3tn in 2025 after 8% current-value growth; home care reached about VND47.9tn with steadier 3% growth (Euromonitor summaries). Globally, beauty and personal care reached US$593bn in 2024; home care adds a separate large cleaning market. Never merge skin care, hygiene and laundry shares without naming scope.',
      back: ['MT takeaway: define routine, user and price tier before discussing “the beauty market”.', 'Unilever and L’Oréal lead broad beauty/personal care; P&G, Colgate-Palmolive, Diana Unicharm, local beauty brands and Lix compete by segment.', 'Science-led efficacy, social commerce, multifunctionality and sustainability shape current growth.'],
    },
    process: {
      title: 'From insight to safe formula',
      flow: ['Routine insight', 'Formula', 'Safety / efficacy', 'Scale-up', 'Pack', 'Launch & monitor'],
      bullets: ['MT takeaway: claims and safety evidence are part of the product, not post-launch decoration.', 'Home-care formulas optimize cleaning, dosage and material compatibility; beauty adds sensory and skin evidence.', 'Packaging must protect formula, dosing, convenience and regulatory information.'],
    },
    operations: {
      front: 'GT gives broad reach for detergent, shampoo sachets and oral care; MT enables larger packs and planned stock-up; pharmacies and beauty specialists add expert trust; e-commerce and TikTok Shop accelerate discovery, reviews and premium skin care. Laundry peaks before Tet cleaning, while sun care and deodorants strengthen in hot seasons. Routine categories require dependable replenishment year-round.',
      back: ['MT takeaway: choose channel by trust need, basket mission and pack economics.', 'Sachets recruit and maintain affordability; pumps, refills and multipacks optimize family routines.', 'Online sell-out data is fast but promotion-heavy; distinguish organic demand from platform subsidy.'],
    },
    valueChain: {
      flow: ['Actives / surfactants', 'Formulation', 'Fill & quality', 'Distributor / platform', 'Shelf / content', 'Routine & repeat'],
      bullets: ['MT takeaway: the value chain joins chemistry, trust, content and physical availability.', 'Category management organizes by problem and routine—acne, scalp, oral, laundry, surface—not only brands.', 'Reviews and creator content influence conversion, but repeat and complaint rates reveal product truth.'],
    },
    economics: {
      front: 'Revenue grows through penetration, routine frequency, premium mix and regimen cross-sell. Costs include actives, surfactants, fragrance, packaging, manufacturing, claims testing, media, creators, platform fees and trade spend. L’Oréal reached 29% of Vietnam skin-care value in 2025, illustrating how science-led premium portfolios and digital launches can concentrate value.',
      back: ['MT takeaway: calculate contribution after discounts, creators, returns and sampling—not gross GMV.', 'Concentrates and refills can lower packaging and shipping per use if adoption and dosing work.', 'A hero product can recruit a regimen, but forced bundles may inflate first purchase and hurt repeat.'],
    },
    metrics: ['Household penetration / regimen penetration — users recruited', 'Repeat & cohort retention — product truth over time', 'Share of search / SOV — digital consideration', 'Weighted distribution / ACV — physical quality of reach', 'Contribution margin / ROAS — profit after channel and media costs'],
    quizzes: [
      { question: 'Why are claims tests strategic?', options: ['They support trust and compliant efficacy', 'They replace distribution', 'They guarantee virality', 'They remove product cost'], answer: 0, explanation: 'Evidence underpins safe, credible claims and reduces regulatory and trust risk.' },
      { question: 'Best channel for expert skin trust?', options: ['Pharmacy / beauty specialist', 'Industrial wholesaler only', 'Freight depot', 'Any random outlet'], answer: 0, explanation: 'Advisor context and authenticated assortment can support dermocosmetic trust.' },
      { question: 'Which KPI exposes a weak formula?', options: ['Repeat and complaint rate', 'Impressions only', 'Factory count', 'Launch party size'], answer: 0, explanation: 'Trial can be bought; repeat and complaints reveal experienced value.' },
      { question: 'What must ROAS exclude?', options: ['Nothing', 'It should be read with margin and incrementality', 'All channel fees', 'Returns'], answer: 1, explanation: 'Attributed revenue can look strong while discounts, fees and non-incremental sales destroy profit.' },
      { question: 'What does an R&D MT balance?', options: ['Efficacy, safety, sensory and cost', 'Only bottle color', 'Only media reach', 'Only sales quota'], answer: 0, explanation: 'A scalable consumer formula must satisfy all four constraints.' },
    ],
    roles: [
      { name: 'Care Marketing MT', intro: 'You turn a routine tension into a science-backed proposition and content system.', bullets: ['MT takeaway: connect content to trial, repeat and brand trust.', 'Read social listening, search and household panels.', 'Build claims, regimen and channel launch plans.', 'Track penetration, repeat and SOV.'] },
      { name: 'Care Sales MT', intro: 'You tailor assortment and execution across GT, MT, pharmacy and platforms.', bullets: ['MT takeaway: show omnichannel commercial judgment.', 'Audit weighted distribution and shelf standards.', 'Negotiate key-account and platform calendars.', 'Separate sell-out growth from promotion loading.'] },
      { name: 'Care Supply MT', intro: 'You manage high SKU variety, formula quality and promotion volatility.', bullets: ['MT takeaway: quantify complexity before adding variants.', 'Plan materials, lines and campaign peaks.', 'Track service, forecast error, changeover and defects.', 'Coordinate sustainable packaging transitions.'] },
      { name: 'Care Finance & R&D MT', intro: 'You protect efficacy and economics from lab bench to P&L.', bullets: ['MT takeaway: prove consumer benefit and profitable scale.', 'Model actives, pack and media sensitivity.', 'Design safety, stability and efficacy protocols.', 'Evaluate creator, sampling and innovation ROI.'] },
    ],
    cases: [
      { company: 'Unilever', title: 'Scale purpose with performance', front: 'Unilever leads across laundry, home cleaning, hair, skin and oral routines in Vietnam. Its UFLP fit model prizes leadership, learning agility, analytics and purpose orientation. The commercial challenge is to make sustainability or social purpose reinforce superior product performance and affordable execution.', story: ['MT takeaway: purpose earns repeat only when the product job is excellent.', 'Choose a routine with a clear performance tension.', 'Build claim, pack, channel and cost architecture.', 'Measure repeat, complaints, penetration and margin.', 'Interview question this unlocks: How should Sunlight scale a refill format?'], question: 'How should Sunlight scale a refill format?' },
      { company: "L’Oréal", title: 'Win beauty O plus O', front: 'L’Oréal’s broad mass, premium and dermocosmetic portfolio helped it reach 29% of Vietnam skin-care value in 2025. Casemate’s SEEDZ rubric emphasizes entrepreneurship, analytics, BeautyTech and online-plus-offline commerce. Digital launch speed must still build authenticated trust and repeat.', story: ['MT takeaway: combine digital discovery with expert proof and offline availability.', 'Map search, creator, pharmacy / specialist and platform roles.', 'Use hero products to recruit a regimen carefully.', 'Track cohort repeat and contribution after platform spend.', 'Interview question this unlocks: Launch a dermocosmetic serum beyond Hanoi and HCMC.'], question: 'Launch a dermocosmetic serum beyond Hanoi and HCMC.' },
      { company: 'Diana Unicharm', title: 'Design for life stages', front: 'Diana Unicharm leads menstrual care through trusted brands, affordability and targeted innovation. Demographic shifts create both pressure and opportunity across feminine, baby and adult hygiene. Product design, education and discreet availability must evolve together.', story: ['MT takeaway: life-stage sizing is more useful than broad population growth.', 'Estimate users, frequency and format by cohort.', 'Build education and trial without stigma.', 'Plan packs and channels around cash outlay and discretion.', 'Interview question this unlocks: Which hygiene life stage should receive the next investment?'], question: 'Which hygiene life stage should receive the next investment?' },
    ],
    interview: {
      front: 'Expect competency questions on entrepreneurship, consumer empathy, ethical influence and using imperfect data. Cases often ask for an O+O launch, refill economics, low-income pack architecture or recovery from a claim / quality issue.',
      back: ['MT takeaway: structure routine problem → evidence → proposition → channel journey → repeat → contribution.', 'Data point: Vietnam beauty/personal care reached about VND98.3tn in 2025; L’Oréal held 29% of skin care.', 'Name GT, pharmacy / specialist and social-commerce roles separately.', 'Unilever UFLP and L’Oréal SEEDZ rubrics both reward leadership and analytics; SEEDZ adds entrepreneurial BeautyTech affinity.'],
    },
    synthesis: { flow: ['Routine tension', 'Formula & proof', 'Pack-price', 'O+O discovery', 'Repeat & contribution'], bullets: ['MT takeaway: care brands sell trusted performance repeated in routines.', 'Impressions are upstream; repeat, complaints and margin reveal quality.', 'Name one risk: claim credibility, counterfeit trust, SKU complexity or promotion dependency.'] },
  },
  {
    slug: 'fmcg-seasonings', parentSlug: 'fmcg', label: 'Seasonings & Processed Foods', shortLabel: 'Seasonings', badge: 'Flavor Platform Strategist', icon: 'CookingPot', accent: 'var(--space-semantic-danger-700)',
    tagline: 'Everyday Vietnamese flavor, convenience formats and pantry distribution.',
    basics: {
      front: 'Vietnam sauces, dips and condiments reached about US$1.59bn in 2022 and were forecast toward US$2.3bn by 2027; Masan held 30.1% and Ajinomoto 16.2% in 2022 (Euromonitor data summarized by Agriculture Canada). Globally, sauces, dressings and condiments were about US$174bn in 2024 with 5.3% forecast CAGR. Scope spans fish sauce, soy, chili, seasoning powders, bouillon and adjacent convenient foods.',
      back: ['MT takeaway: separate the condiment category from broader instant noodles and processed food.', 'Masan’s Chin-su / Nam Ngu, Ajinomoto, Unilever, Nestlé Maggi, Cholimex and regional producers compete through trust, taste and distribution.', 'Everyday cooking creates high frequency; convenience, reduced salt and exportable Vietnamese flavor create growth.'],
    },
    process: {
      title: 'Build consistent Vietnamese flavor',
      flow: ['Raw ingredients', 'Ferment / extract', 'Blend', 'Safety & sensory', 'Fill / sachet', 'Pantry route'],
      bullets: ['MT takeaway: consistency and food safety turn local taste into a scalable brand.', 'Fish and soy sauces may require fermentation; powders and instant foods require blending, drying or cooking controls.', 'Sensory panels, salt / acidity and contaminant limits protect both taste and compliance.'],
    },
    operations: {
      front: 'Independent grocers remain the dominant condiment channel because products are pantry staples bought close to home. MT supports portfolio blocking, premium sauces and larger packs; foodservice sells bulk formats; e-commerce supports bundles and exports. Tet lifts cooking, gifting and hosting, while rainy periods can support convenient meal solutions.',
      back: ['MT takeaway: GT availability and outlet recommendation are central to household penetration.', 'Sales routes must manage many low-ticket SKUs, sachets and regional taste preferences.', 'Foodservice and household packs need separate recipes, service levels and margin logic.'],
    },
    valueChain: {
      flow: ['Fish / soy / spices', 'Ferment / process', 'Blend & QA', 'Pack', 'GT / MT / foodservice', 'Meal habit'],
      bullets: ['MT takeaway: a trusted pantry brand monetizes repeat habits and adjacent meal solutions.', 'Category management groups cooking bases, table sauces, recipe aids and instant foods by meal task.', 'Local sourcing strengthens authenticity but adds agricultural quality and traceability variability.'],
    },
    economics: {
      front: 'Revenue grows through household penetration, daily frequency, premium mix, pack architecture and adjacency into convenient meals. Cost drivers include agricultural inputs, fermentation time, sugar / salt, oil, packaging, food safety, freight and distributor margin. Masan’s scale shows how a flavor platform can cross-sell, but synergies count only when they improve distribution, cost or repeat.',
      back: ['MT takeaway: build the P&L per meal or use, not only per bottle.', 'Sachets recruit and serve low cash-outlay missions; premium glass and imported cues lift value but add cost.', 'Reduced-salt reformulation must preserve taste, safety and repeat—not merely meet a claim.'],
    },
    metrics: ['Household penetration — kitchens buying the brand', 'Purchase frequency / consumption per household — pantry habit', 'Numeric & weighted distribution — reach and outlet quality', 'Rate of sale / stock age — velocity and freshness', 'Gross margin / cost per serving — economics shoppers actually feel'],
    quizzes: [
      { question: 'Why is GT critical for condiments?', options: ['Pantry staples are bought close to home', 'It bans sachets', 'It removes distributors', 'Only restaurants cook'], answer: 0, explanation: 'Neighborhood reach and retailer recommendation support frequent everyday replenishment.' },
      { question: 'Which process may take months?', options: ['Fermentation', 'Checkout scanning', 'Social posting', 'Shelf labeling'], answer: 0, explanation: 'Traditional fish or soy sauce character can depend on controlled fermentation and maturation.' },
      { question: 'Best habit metric?', options: ['Purchase frequency per household', 'Factory paint color', 'Followers alone', 'Office rent'], answer: 0, explanation: 'Frequency shows whether the product is embedded in repeated meal preparation.' },
      { question: 'How should lower-salt launch succeed?', options: ['Claim only', 'Taste, safety, repeat and margin', 'Remove sensory tests', 'Ignore foodservice'], answer: 1, explanation: 'Health renovation works only if the product still performs in real dishes.' },
      { question: 'Who validates flavor at scale?', options: ['R&D, quality and sensory teams', 'Sales alone', 'Any retailer', 'Payroll'], answer: 0, explanation: 'Scale-up must reproduce recipe, safety and sensory specifications batch after batch.' },
    ],
    roles: [
      { name: 'Foods Marketing MT', intro: 'You translate meal tensions and regional taste into a brand growth plan.', bullets: ['MT takeaway: begin with the dish and cooking task.', 'Study household menus and sensory preferences.', 'Build recipe, pack and communication architecture.', 'Track penetration, frequency and repeat.'] },
      { name: 'Foods Sales MT', intro: 'You make a broad pantry portfolio visible and productive across tiny outlets.', bullets: ['MT takeaway: show route discipline and assortment logic.', 'Review distributor reach, stock age and off-take.', 'Set must-stock lists by outlet cluster.', 'Track numeric distribution and rate of sale.'] },
      { name: 'Foods Supply MT', intro: 'You synchronize agricultural variability, long processes and food safety.', bullets: ['MT takeaway: distinguish aging inventory from harmful finished-goods stock.', 'Plan fermentation, materials and packaging.', 'Control traceability, yield and microbiology.', 'Track OTIF, waste and forecast error.'] },
      { name: 'Foods Finance & R&D MT', intro: 'You preserve beloved taste while improving health, cost and scalability.', bullets: ['MT takeaway: model cost per serving alongside sensory acceptance.', 'Evaluate commodity and pack sensitivity.', 'Run recipe, shelf-life and consumer tests.', 'Build adjacency and renovation business cases.'] },
    ],
    cases: [
      { company: 'Masan Consumer', title: 'Build a flavor platform', front: 'Masan leads Vietnam condiments with Chin-su, Nam Ngu and related cooking brands, supported by broad distribution. A flavor platform can expand into chili sauce, noodles and convenient meals, but every adjacency must earn household repeat. Retail ecosystem access is useful only when it improves availability, insight or economics.', story: ['MT takeaway: test synergy through distribution, basket and repeat.', 'Start with a trusted flavor credential and unmet meal task.', 'Choose pack, price and channel by household mission.', 'Measure incremental penetration and margin.', 'Interview question this unlocks: Which adjacent meal category should Chin-su enter next?'], question: 'Which adjacent meal category should Chin-su enter next?' },
      { company: 'Ajinomoto', title: 'Renovate everyday seasoning', front: 'Ajinomoto spans MSG, seasoning mixes, mayonnaise and convenient meal aids in Vietnam. Health concerns create demand for lower-salt or clearer ingredient propositions, but familiar taste is difficult to replace. Renovation must work inside actual Vietnamese recipes.', story: ['MT takeaway: test in dishes, not only in a laboratory solution.', 'Select a high-frequency meal and benchmark taste.', 'Design education around correct dosage and benefit.', 'Track blind preference, repeat and cost per serving.', 'Interview question this unlocks: How would you launch reduced-salt seasoning?'], question: 'How would you launch reduced-salt seasoning?' },
      { company: 'Nestlé Maggi', title: 'Localize global food capability', front: 'Maggi combines global food technology with local seasonings and recipe habits. The opportunity is to serve faster urban cooking without erasing regional taste. Casemate’s Nestlé fit rubric emphasizes nutrition, sustainability, respect, analytics and agility.', story: ['MT takeaway: local insight must shape formula, not only advertising.', 'Map regional dishes and pain points.', 'Co-create recipes with consumers and culinary experts.', 'Pilot GT and digital recipe content together.', 'Interview question this unlocks: Which Vietnamese meal deserves a Maggi solution?'], question: 'Which Vietnamese meal deserves a Maggi solution?' },
    ],
    interview: {
      front: 'Expect competency questions on field resilience, sensory curiosity, quality ownership and persuading cross-functional teams. Cases often ask for a lower-salt renovation, GT distribution expansion, premium fish sauce or an instant-food adjacency.',
      back: ['MT takeaway: structure meal task → taste proof → pack-price → GT availability → frequency → margin.', 'Data point: Vietnam sauces / condiments were US$1.59bn in 2022; Masan and Ajinomoto held 30.1% and 16.2%.', 'Use cost per serving and household frequency to make affordability concrete.', 'Tie MT examples to analytics, agility, food / nutrition interest and route-to-market evidence.'],
    },
    synthesis: { flow: ['Meal task', 'Taste & safety', 'Pack / cost per serve', 'Pantry reach', 'Habit & adjacency'], bullets: ['MT takeaway: seasonings win by becoming a trusted repeated cooking shortcut.', 'A health claim cannot compensate for weak taste.', 'Name one risk: input traceability, regional mismatch, GT execution or adjacency complexity.'] },
  },
];
