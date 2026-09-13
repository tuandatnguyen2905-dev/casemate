// FMCG balance pack A — Dairy, Beer & Alcoholic Drinks, Soft Drinks.
// Top-up cards so each sub-industry deck renders at least three cards in every topic group,
// particularly R&D & Product, Marketing & Sales and Surprising Insights.

import type { DepthCard } from './industryDepthTypes';

export const DAIRY_TOPUP_CARDS: DepthCard[] = [
  {
    module: 8, topic: 'rnd-product', emoji: '👶', type: 'concept',
    title: 'Infant formula: the most regulated product in the category',
    front: 'Formula carries the highest margin and the tightest rules in Vietnamese dairy. Knowing why explains a lot about how the whole category behaves.',
    back: [
      'The product must match a defined nutritional composition, so formulation is a compliance exercise before it is a marketing one: protein source, fat blend, carbohydrate, vitamins, minerals and functional ingredients are all specified.',
      'Marketing of breast-milk substitutes for the youngest age groups is restricted in Vietnam in line with international practice, which is why brand building concentrates on follow-on and growing-up milks and on healthcare-professional trust.',
      'Manufacturing runs to pharmaceutical-adjacent standards: powder plants demand rigorous hygienic zoning, moisture control and pathogen testing, and a contamination event is a recall and a brand-level crisis.',
      'Because trust dominates the purchase, imported provenance carries real weight with Vietnamese parents — which is why domestic players invest in visible quality proof and some produce abroad to sell back home.',
      'Interview relevance: this is the clearest FMCG example of a category where regulation, science and trust set the strategy, and a conventional advertising-led plan is simply not lawful.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '🏫', type: 'fact',
    title: 'School milk and institutional channels',
    front: 'A large slice of Vietnamese dairy volume never passes through a shop. Institutional channels are invisible to consumers and very visible in a company’s plan.',
    back: [
      'School milk programmes deliver volume at scale on predictable schedules, with product specification, fortification and food-safety standards set by the buyer rather than by the brand.',
      'The commercial logic is habit formation as much as volume: a child who drinks a brand daily at school carries that familiarity into household purchasing.',
      'Hospitals, canteens, hotels, cafes and bakeries form a separate food-service channel buying in bulk formats with entirely different pack sizes, service levels and payment terms.',
      'The economics differ sharply from retail: lower price per litre, far lower marketing cost, higher volume certainty, and tender-based competition where cost and compliance beat brand equity.',
      'The trap in a case: quoting a retail market share while a competitor holds institutional volume understates their real scale. Ask which channels the share figure covers.',
    ],
  },
  {
    module: 7, topic: 'marketing-sales', emoji: '🧊', type: 'concept',
    title: 'Winning the chiller: dairy in-store execution',
    front: 'In chilled dairy the fixture is finite, cold and shared. Execution inside that box decides the category outcome more than advertising does.',
    back: [
      'Chiller space is the scarcest asset in the store, so brands fund refrigeration units in outlets and then negotiate what may be stocked inside them — the equivalent of buying shelf in general trade.',
      'Planogram logic inside a chiller is different: shoppers scan a smaller area, temperature limits how long a door stays open, and stock rotation must be strict because the product expires.',
      'First-expiry-first-out discipline is a daily execution task. A chiller full of product two days from expiry is a markdown queue, not availability.',
      'The sales representative’s audit list is therefore specific: temperature, facings, chiller purity, date codes, and whether the promotional price is actually on the shelf edge.',
      'The metric pairing to quote: weighted distribution tells you the quality of the outlets carrying you, and expiry rate tells you whether that distribution is profitable.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🌱', type: 'fact',
    title: 'Plant-based milk is a Vietnamese tradition, not an import',
    front: 'Global plant-based positioning treats nut and soy milks as a modern lifestyle choice. In Vietnam they are an established habit, which changes the entire commercial argument.',
    back: [
      'Soy milk and nut-based drinks have long been part of everyday Vietnamese consumption, sold fresh by street vendors as well as packaged — so the category is not creating a new behaviour, it is formalising an existing one.',
      'That means the competitive reference point is homemade and street-vendor product on freshness and price, not a premium Western almond-milk brand on lifestyle positioning.',
      'Euromonitor’s outlook for Vietnam points to growth led by high-protein, organic, nut milk and nutrition for older consumers — so this sits alongside dairy rather than simply cannibalising it.',
      'The strategic implication: a plant-based launch here should argue on taste, convenience, hygiene and fortification rather than on the sustainability narrative that works in Europe.',
      'The interview move: whenever a global trend is presented to you, ask whether the behaviour already exists locally under a different name. In Vietnam it very often does.',
    ],
  },
];

export const BEER_TOPUP_CARDS: DepthCard[] = [
  {
    module: 8, topic: 'rnd-product', emoji: '🍼', type: 'concept',
    title: 'Making beer without the alcohol',
    front: 'Zero and low-alcohol beer became a real Vietnamese segment because of enforcement rather than health positioning. Making it well is genuinely difficult.',
    back: [
      'There are two technical routes. Restricted fermentation stops the yeast before much alcohol forms, which is cheap but leaves a sweet, worty character. Dealcoholisation brews normally and then removes the alcohol by vacuum distillation or membrane filtration, which tastes better and costs more.',
      'Alcohol carries body, aroma and mouthfeel, so removing it strips out much of the drinking experience. Brewers compensate with hop aroma additions, adjusted carbonation and body-building ingredients.',
      'Microbiological risk rises. Alcohol is itself a preservative, so a zero-alcohol product needs tighter hygiene, pasteurisation and packaging control to hold its shelf life.',
      'The commercial payoff is occasion expansion: lunchtime, workplace, driving and daytime social occasions that Decree 100 enforcement closed off for full-strength beer.',
      'Interview relevance: this is a clean example of regulation creating a technical R&D agenda, which is exactly the kind of connection a category interviewer is listening for.',
    ],
  },
  {
    module: 7, topic: 'rnd-product', emoji: '🔬', type: 'fact',
    title: 'Quality control from tank to outlet',
    front: 'Beer is a living product that degrades measurably after it leaves the brewery. Protecting it in the trade is a technical job, not a merchandising one.',
    back: [
      'Dissolved oxygen is the primary enemy. Oxygen picked up during filling ages the beer into stale, cardboard-like notes, so fillers are engineered and monitored specifically to minimise it.',
      'Light and heat do the rest: ultraviolet light creates off-flavours in clear and green glass, and warm storage accelerates staling — which is why brown glass, cans and cool storage are commercial decisions.',
      'Freshness is therefore managed as a date-code discipline in the trade, with stock rotation audited at outlets exactly as it would be for a chilled food product.',
      'Draught beer adds its own control set: line cleaning, dispense temperature, gas pressure and glassware hygiene all change what the drinker actually tastes.',
      'The practical insight: a brand can lose a blind comparison purely because of how it was stored and dispensed, which makes trade execution part of product quality rather than a support activity.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '🎊', type: 'fact',
    title: 'Occasion marketing where you cannot advertise freely',
    front: 'Alcohol advertising is restricted in Vietnam, so beer brands build meaning through occasions and through the outlet itself.',
    back: [
      'The Law on Prevention and Control of Harmful Effects of Alcohol and Beer restricts advertising, sponsorship and certain sales practices, so mass-media brand building is bounded in a way it is not for soft drinks.',
      'The occasion becomes the medium: Tet gatherings, weddings, football, year-end company parties and hot-weather social drinking are where brands invest, because presence at the moment of consumption is lawful and effective.',
      'The outlet is the second medium: signage, coolers, glassware, staff engagement and menu presence in on-trade venues do the work that television would otherwise do.',
      'Responsible-drinking messaging is not decoration here. After Decree 100, designated-driver and ride-hailing partnerships became both a compliance signal and a genuine service to the occasion.',
      'The case discipline: when the media toolkit is restricted, differentiation shifts to availability, cold service, pack format and the quality of the drinking occasion you enable.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '♻️', type: 'fact',
    title: 'The returnable bottle is a hidden balance-sheet business',
    front: 'A large volume of Vietnamese beer moves in returnable glass, and the bottle behaves like an asset rather than packaging. Almost no candidate knows this.',
    back: [
      'The brewery owns a float of bottles and crates circulating through distributors, outlets and consumers, financed up front and recovered only when the empties come back.',
      'That creates real cost lines outsiders never consider: breakage and loss rates, deposit administration, washing and inspection, and reverse logistics on trucks that would otherwise return empty.',
      'It also creates a working-capital question: how large must the float be to cover the Tet peak, and what does that capital cost during the eleven quieter months?',
      'The environmental argument is genuinely strong — a returnable bottle reused many times beats single-use packaging — but only while the return rate stays high, which depends entirely on the distributor relationship.',
      'Interview move: if asked to cut packaging cost in beer, ask first whether the pack is returnable. The answer changes which levers even exist.',
    ],
  },
];

export const BEVERAGE_TOPUP_CARDS: DepthCard[] = [
  {
    module: 7, topic: 'rnd-product', emoji: '💧', type: 'concept',
    title: 'Water treatment is the quiet core of a beverage plant',
    front: 'The largest ingredient by far is water, and treating it correctly is the least glamorous and most consequential technical process on the site.',
    back: [
      'Incoming water is filtered, softened, disinfected and adjusted to a fixed mineral specification, because water chemistry changes taste, foam, shelf life and how flavours are perceived.',
      'Different products need different water: a carbonate, a bottled mineral water and an aseptic tea each have distinct specifications, so a multi-product plant may run several treatment streams.',
      'Microbiological safety is absolute. Contamination in a shelf-stable beverage is a recall, so filtration, ultraviolet treatment and continuous testing are non-negotiable controls.',
      'Water is also a sustainability metric customers and regulators now watch: litres of water used per litre of product is a standard efficiency measure, and reducing it saves cost and reputation together.',
      'The lesson for an interview: in beverages the cheapest input carries the largest quality and reputational risk. Cost and criticality are not the same thing.',
    ],
  },
  {
    module: 8, topic: 'rnd-product', emoji: '⚡', type: 'fact',
    title: 'Functional drinks: where the growth and the risk both sit',
    front: 'Energy, sports, vitamin and herbal drinks are the fastest-moving part of Vietnamese beverages and the part most exposed to claims regulation.',
    back: [
      'The functional ingredient is the product: caffeine, taurine, B vitamins, electrolytes, collagen or herbal extracts, each with a dosage that must be safe, effective and lawfully declared.',
      'Claims are regulated. What may be said on pack about energy, immunity, beauty or performance is bounded by food and advertising rules, and substantiation must exist before the campaign does.',
      'Formulation is a taste problem as much as a science problem: many functional ingredients taste bitter or metallic, so masking and flavour balance decide whether repeat purchase happens.',
      'The Vietnamese context is favourable: energy drinks have strong traction with working and manual-labour consumers, and herbal and traditional ingredients carry existing cultural credibility.',
      'The 2027 sugar tax interacts here too, since many functional drinks sit above 5 grams of sugar per 100 millilitres — pushing reformulation into the growth segment first.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '🛵', type: 'fact',
    title: 'The motorbike economy shapes beverage demand',
    front: 'Vietnamese consumption is built around motorbike travel and outdoor life in a hot climate. That physical reality drives the pack and the placement.',
    back: [
      'Immediate consumption dominates: a drink bought at a roadside shop is opened within seconds, so single-serve formats, cold service and one-handed opening matter more than pack aesthetics.',
      'Trip frequency is high and basket size is small, which favours dense availability across many small outlets rather than fewer large stores — the same physics that drives Vietnamese grocery.',
      'Heat drives volume directly and unpredictably, so a hot week moves sales sharply. Capacity, inventory and delivery frequency must be planned against weather rather than a smooth annual curve.',
      'Street-side eateries and beverage stalls are a genuine channel in their own right, not an afterthought, and they buy very differently from a modern-trade account.',
      'The go-to-market conclusion: in beverages, distribution intensity and cold availability substitute for brand preference more than in almost any other FMCG category.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🧋', type: 'fact',
    title: 'The biggest competitor is not in a bottle',
    front: 'Packaged beverage brands in Vietnam compete against a vast informal market of fresh drinks that no market-share chart includes.',
    back: [
      'Street vendors and small stalls sell fresh sugarcane juice, iced tea, coconut water, soy milk and Vietnamese iced coffee at prices packaged brands cannot match, prepared to order.',
      'Iced tea in particular is frequently served free or nearly free with a meal, which sets a powerful reference price for any packaged refreshment drink competing for the same occasion.',
      'That is why the credible packaged proposition is convenience, hygiene, consistency, portability and cold availability rather than price — the same argument modern trade makes against wet markets.',
      'It also explains why local ready-to-drink tea brands built on Vietnamese taste preferences scaled successfully: they formalised a habit that already existed instead of importing a new one.',
      'Sizing discipline for a case: if you size the Vietnamese beverage market from packaged sales alone, you have measured the formal share of a much larger consumption pool.',
    ],
  },
];
