// FMCG balance pack B — Confectionery & Snacks, Personal Care & Home Care, Seasonings.
// Top-up cards so each sub-industry deck renders at least three cards in every topic group,
// particularly R&D & Product, Marketing & Sales and Surprising Insights.

import type { DepthCard } from './industryDepthTypes';

export const SNACKS_TOPUP_CARDS: DepthCard[] = [
  {
    module: 7, topic: 'rnd-product', emoji: '🌽', type: 'concept',
    title: 'Where a snack recipe actually comes from',
    front: 'New snack products are developed on a repeatable path, and knowing it stops you proposing launches that a factory cannot make.',
    back: [
      'Concept and benchmark first: define the occasion, the price point and the competitor product the new item must beat in a blind taste test. Without a benchmark there is no pass mark.',
      'Bench formulation: the food technologist builds the recipe at laboratory scale — base, seasoning, texture system and fat or oil — then iterates against sensory panel feedback.',
      'Scale-up is where most ideas die: a recipe that works in a kitchen may not survive a tunnel oven, a fryer or a high-speed seasoning drum, so pilot runs test whether the process can hold it consistently.',
      'Shelf-life validation runs in parallel under accelerated heat and humidity, because a snack that tastes excellent at week one and stale at month four is not a product.',
      'Cost engineering closes the loop: the recipe must land within the target cost per pack at the planned volume, which is why R&D and finance argue about ingredient specification long before launch.',
    ],
    diagram: ['Concept & benchmark', 'Bench formulation', 'Sensory panel', 'Pilot scale-up', 'Shelf-life test', 'Cost sign-off'],
  },
  {
    module: 8, topic: 'rnd-product', emoji: '🥗', type: 'fact',
    title: 'The healthier-snacking problem, honestly',
    front: 'Every brand plan now includes a healthier variant. Very few candidates can explain why they so often fail.',
    back: [
      'Salt, sugar and fat are doing structural work, not just adding flavour: they carry taste, create texture and extend shelf life. Removing them changes the eating experience in ways consumers notice immediately.',
      'Baked rather than fried is the classic example: it removes oil and also removes the crispness and mouth-coating that made the original enjoyable, so the reformulated product competes as a different item.',
      'Substitutes bring their own problems. High-intensity sweeteners have aftertastes, fibre and protein additions change texture, and clean-label preservative removal shortens shelf life.',
      'The commercial reality in Vietnam is that healthier snacking is real but still concentrated in urban modern trade and e-commerce, so volume expectations must be set accordingly.',
      'The credible interview answer: launch the healthier product as its own proposition for a defined occasion, rather than reformulating a beloved mainstream product and hoping nobody notices.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '🎂', type: 'concept',
    title: 'Building a gifting product, not just a bigger pack',
    front: 'Tet and Mid-Autumn gifting is the highest-margin occasion in snacking, and it is a genuinely different product design problem.',
    back: [
      'The buyer is not the eater. A gift is chosen for how it will be received, so presentation, perceived value, brand reputation and appropriateness matter more than taste preference.',
      'That inverts the design brief: pack architecture, materials, finish and box structure become the primary product, with the confectionery inside serving the presentation.',
      'Price points are socially calibrated. A gift that is visibly too cheap fails its purpose, so gifting ranges are built at recognised tiers for colleagues, family and business relationships.',
      'Corporate gifting is a channel of its own, buying in bulk with lead times, customisation and negotiated terms — much closer to business-to-business selling than to retail.',
      'The hard constraint: dated festival packaging is worthless the day after, so the entire margin opportunity is gated by forecast accuracy and a firm production cut-off.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🌙', type: 'fact',
    title: 'Mooncakes are a two-week business with a full-year cost base',
    front: 'Mid-Autumn confectionery is one of the most extreme seasonal businesses in Vietnamese FMCG, and it teaches a lesson that applies far beyond snacks.',
    back: [
      'Almost all sales occur in a short window before the festival, yet production, packaging design, ingredient procurement and temporary hiring are committed months ahead.',
      'Pricing collapses as the festival approaches its end, because the product loses its occasion entirely — discounting in the final days is a salvage operation, not a promotion.',
      'Premium and gifting formats carry the profit; the everyday-priced product largely exists to hold shelf presence and reach.',
      'The operational discipline required is unusual: build a plan you cannot adjust, then run a hard cut-off, because producing more late is worse than selling out early.',
      'The transferable lesson: in any seasonal business, the decision that matters is made before the season starts. By the time you see the demand signal, the capacity decision is already spent.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🔍', type: 'fact',
    title: 'Shrinkflation is a pricing strategy, not an accident',
    front: 'When input costs rise in Vietnamese impulse snacking, the pack often gets smaller before the price moves. That is a deliberate decision with real trade-offs.',
    back: [
      'Impulse snacking operates around familiar price points, and crossing one can cost far more volume than the equivalent percentage increase would suggest.',
      'So brands reduce grams per pack instead, holding the price point while restoring margin — a lever that only exists in categories where the shopper judges the price rather than the weight.',
      'The risk is trust. If the change is noticed and feels concealed, it damages the brand more than a transparent price increase would have.',
      'The honest approach is to declare the change, or to pair a smaller pack with a visible improvement so the exchange feels fair rather than extractive.',
      'For an interview: naming this mechanism and its trust risk shows you understand pricing psychology rather than just pricing arithmetic.',
    ],
  },
];

export const CARE_TOPUP_CARDS: DepthCard[] = [
  {
    module: 7, topic: 'rnd-product', emoji: '🧴', type: 'concept',
    title: 'What a surfactant actually does, and why it matters commercially',
    front: 'Surfactants are the working ingredient in shampoo, body wash, detergent and dishwashing liquid. Understanding them turns a vague product discussion into a technical one.',
    back: [
      'A surfactant molecule has a water-loving end and an oil-loving end, so it surrounds oil and dirt and lifts them into water. That is the entire cleaning mechanism, in every one of these products.',
      'The choice of surfactant system sets the trade-off between cleaning power, foam, mildness and cost. Aggressive systems clean well and strip the skin or hair; milder systems feel better and cost more.',
      'Foam is a perception lever rather than a performance one. Vietnamese consumers, like most, associate rich foam with effective cleaning, so formulators build foam deliberately even where it does not improve results.',
      'Enzymes in laundry detergent do a different job: they break down specific stain types such as protein, starch and fat at lower temperatures, which is what makes cold-water washing work.',
      'Commercial consequence: because these systems are well understood industry-wide, formulation rarely provides lasting differentiation — which is exactly why brand, claim and distribution carry the strategy.',
    ],
  },
  {
    module: 8, topic: 'rnd-product', emoji: '🌞', type: 'fact',
    title: 'Skin care built for Vietnamese conditions',
    front: 'Skin care is the fastest-premiumising care category in Vietnam, and the product development agenda is shaped by climate and local concerns rather than imported trends.',
    back: [
      'Sun protection is the largest structural opportunity: high ultraviolet exposure year-round, strong cultural preference for even skin tone, and daily motorbike travel that puts skin directly in the sun.',
      'Texture is a formulation constraint here. In heat and humidity, heavy creams are rejected, so gel, essence, lotion and lightweight emulsion formats dominate over the rich creams that succeed in temperate markets.',
      'The active ingredients driving premium demand — niacinamide, vitamin C, hyaluronic acid, retinoids, alpha-hydroxy acids — each carry stability, irritation and packaging constraints that decide shelf life and pack format.',
      'Dermocosmetics sold through pharmacies is a distinct and growing tier, where clinical evidence and pharmacist recommendation replace advertising as the trust mechanism.',
      'Scale check: L’Oréal’s portfolio breadth helped it reach about 29% of Vietnam skin-care value in 2025, which tells you how concentrated the premium end of this category has become.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '🏪', type: 'fact',
    title: 'How care products actually reach a Vietnamese shopper',
    front: 'Personal and home care runs the widest channel spread of any FMCG category, and each channel does a genuinely different job.',
    back: [
      'General trade carries the everyday volume: sachet shampoo, detergent, soap and toothpaste, bought close to home in small quantities. Reach and price point matter more than presentation.',
      'Modern trade sells the planned stock-up: larger packs, refills, multipacks and promotional bundles, with the shopper comparing options at the shelf.',
      'Health and beauty specialists and pharmacies convert the premium tier, because a shopper buying a serum or a dermocosmetic wants advice and a trust signal before spending.',
      'E-commerce and live commerce handle discovery and reviews, which is where premium beauty demand is now created before being fulfilled in whichever channel is most convenient.',
      'The planning discipline: define which pack and price tier belongs in which channel deliberately, because putting a premium regimen product into a general-trade shop wastes the listing and putting sachets into a beauty specialist wastes the space.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '☀️', type: 'fact',
    title: 'Whitening and sun care outsell anti-ageing here',
    front: 'Global beauty strategy centres on anti-ageing. In Vietnam the dominant concerns are different, and assuming otherwise is a visible error in a category interview.',
    back: [
      'Brightening, even skin tone and sun protection are the leading skin-care concerns, driven by climate, high ultraviolet exposure and long-standing cultural preferences around skin tone.',
      'Vietnam also has a young population, so anti-ageing addresses a smaller share of the consumer base than it does in North Asia or Europe.',
      'Acne and oil control matter more than in drier markets, because heat, humidity, pollution and daily motorbike commuting all worsen the problem.',
      'The commercial implication is direct: a portfolio copied from a European market will be weighted toward the wrong benefits and the wrong textures.',
      'The interview move: name the concern hierarchy before proposing a launch. It shows you are designing for the actual consumer rather than translating a global deck.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🚨', type: 'fact',
    title: 'Counterfeits are a strategic problem, not a legal footnote',
    front: 'In Vietnamese beauty and personal care, fake product is a live commercial threat, and how a brand responds is a real part of its strategy.',
    back: [
      'High-value, small-format products with strong brand recognition are the natural targets, and online marketplaces make distribution of counterfeits far easier than a physical shop ever did.',
      'The damage is not only lost revenue. A consumer who has a bad experience with a fake product blames the brand, so counterfeits destroy trust and future repeat purchase at the same time.',
      'The standard response set: authorised-seller programmes, official flagship stores on each platform, authentication codes and holograms, and active marketplace enforcement.',
      'This is one reason official brand storefronts matter so much on Vietnamese platforms — they are a trust mechanism as much as a sales channel.',
      'Interview relevance: if you are asked how to grow a premium beauty brand online in Vietnam, an answer that ignores authenticity and grey-market control is incomplete.',
    ],
  },
];

export const SEASONINGS_TOPUP_CARDS: DepthCard[] = [
  {
    module: 7, topic: 'rnd-product', emoji: '🧂', type: 'concept',
    title: 'Umami, MSG and the reformulation argument',
    front: 'Monosodium glutamate sits at the centre of the Vietnamese seasoning category, commercially and scientifically. Being able to discuss it precisely is a real differentiator.',
    back: [
      'Umami is the savoury taste produced by glutamates and certain nucleotides. It occurs naturally in fish sauce, soy sauce, dried shrimp, tomatoes and aged ingredients — so it is not an artificial invention, it is an isolated version of something traditional cooking already used.',
      'Commercially, MSG and nucleotide blends deliver depth of flavour at very low cost, which is why they appear across seasoning powders, instant noodles and processed foods.',
      'The consumer concern is real regardless of the scientific consensus on safety, so the market has moved toward reduced-MSG and no-added-MSG positioning in premium tiers.',
      'Reformulating away from it is genuinely hard: you must replace the savoury depth with yeast extract, fermented bases, mushroom or seaweed derivatives, or a higher-grade fish sauce — all of which cost more.',
      'The honest interview position: present the science and the perception separately. Consumers are entitled to a preference, and the commercial job is to meet it without making the food taste worse.',
    ],
  },
  {
    module: 8, topic: 'rnd-product', emoji: '🍜', type: 'fact',
    title: 'Instant noodles: the adjacency that built the food groups',
    front: 'Instant noodles sit beside condiments in nearly every Vietnamese food company, and understanding the product explains why the two travel together.',
    back: [
      'The process is a short, fast line: flour and water are mixed and sheeted, cut into wavy strands, steamed to gelatinise the starch, then either fried or air-dried to remove moisture and create the porous structure that rehydrates in three minutes.',
      'The seasoning sachet is where the brand lives. The noodle block is close to a commodity; the flavour system, oil sachet and any dried garnish are what a consumer chooses between.',
      'That is exactly why a condiment company has an advantage: it already owns flavour development capability, fermented bases and taste-panel discipline.',
      'Shelf life is governed by oil oxidation in fried varieties, so oil quality, antioxidants and packaging barrier are the technical controls — the same discipline as fried snacks.',
      'The category direction is premiumisation: higher-quality noodles, non-fried variants, real meat and vegetable garnishes, and bowl or cup formats that raise the price point beyond the everyday pack.',
    ],
  },
  {
    module: 8, topic: 'marketing-sales', emoji: '👩‍🍳', type: 'fact',
    title: 'Marketing to the person who actually cooks',
    front: 'Condiment marketing has one target that most global playbooks describe badly: the household member who cooks daily and has been using the same brand for years.',
    back: [
      'The purchase is habitual and low-deliberation, so awareness campaigns rarely move share. What moves share is a reason to try something in an actual dish.',
      'Recipe-led marketing is therefore the core mechanic: showing the product inside a specific familiar dish, which is why cooking content, packaging recipes and food creators work better here than lifestyle advertising.',
      'Sampling and in-store demonstration matter more than in most categories, because taste is the only genuine proof and a single successful meal can convert a household for years.',
      'Trust and safety claims carry unusual weight in staple foods, so provenance, testing and transparent labelling function as marketing rather than as compliance.',
      'The metric to focus on: household penetration and repeat rate. In a habitual staple, a new user acquired is a long annuity, and a lost one rarely returns.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🌏', type: 'fact',
    title: 'Vietnamese condiments have a global export market',
    front: 'The category is usually discussed as purely domestic. In fact it has an international demand base that most candidates never mention.',
    back: [
      'The Vietnamese diaspora sustains steady export demand for specific brands and taste profiles, because people abroad want the exact product they grew up with rather than a local substitute.',
      'Vietnamese cuisine’s international popularity extends that further: restaurants and home cooks outside Vietnam need authentic fish sauce, chilli sauce and cooking seasonings to reproduce the dishes.',
      'Exporting brings a different rule set: destination food-safety standards, labelling and language requirements, histamine and contaminant limits, and shelf-life expectations for long shipping times.',
      'The margin case is often better than domestic, because an authenticity product abroad competes on provenance rather than on the price of a household staple.',
      'Interview relevance: when asked how a mature Vietnamese food brand grows, exports and diaspora demand are a credible answer that almost nobody gives.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🫙', type: 'fact',
    title: 'The fish sauce argument that reshaped a category',
    front: 'Vietnam has had a genuine public dispute about what fish sauce is, and it is the best local example of how a trust controversy can move a whole market.',
    back: [
      'The dispute runs between traditionally fermented fish sauce, made only from anchovies and salt over many months, and industrially produced sauce that blends a fermented base with water, salt, sugar and flavour enhancers.',
      'The technical vocabulary matters: traditional producers compete on degrees of nitrogen, the protein grade, while industrial products compete on price, consistency and a milder taste.',
      'Public argument over quality and labelling pushed the category toward clearer standards, more explicit labelling and a visible premium tier built on traditional production.',
      'The commercial result was not the collapse of industrial sauce — it holds the volume — but the creation of a profitable craft segment alongside it, which is a familiar pattern from beer and coffee.',
      'The transferable lesson worth naming in an interview: when a category is challenged on authenticity, the usual outcome is segmentation rather than replacement. Both tiers can grow.',
    ],
  },
];
