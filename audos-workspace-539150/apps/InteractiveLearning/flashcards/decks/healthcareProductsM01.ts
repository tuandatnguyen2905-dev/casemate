// Healthcare Products & Nutrition Module 01 (apps/IndustryKnowledge/healthcareProductsModule01.tsx).
// Excerpts are verbatim from the rendered chapter text; they are checked against the rebuilt chapters, not the raw file.
// Chapters that only repeat another chapter's shared text, and the review-held chapter, carry no cards.
// Hypothetical worked numbers stay labelled as hypothetical; no real-world figures, doses or approval thresholds appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'healthcare-products',
  industryLabel: 'Healthcare Products & Nutrition',
  moduleId: 'hp-m01',
  moduleLabel: 'Module 01',
  moduleKey: 'HEALTHCARE_PRODUCTS_MODULE01',
  file: 'apps/IndustryKnowledge/healthcareProductsModule01.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const HP_M01_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m1-industry-definition-and-scope',
  title: 'Healthcare Products: Industry Definition & Scope',
  description: 'What the industry covers, where its boundaries lie, and why product category, intended use and evidence differ.',
  lessonId: 'hp-m1-l1',
  lessonTitle: 'Industry Definition & Scope',
  chapterIdPrefix: 'hp-m1-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'What Is the Healthcare Products & Nutrition Industry?', sourceTitle: 'What Is the Healthcare Products & Nutrition Industry?', citations: [] },
    { title: 'What Makes Healthcare and Nutrition Products Unique?', sourceTitle: 'What Makes Healthcare and Nutrition Products Unique?', citations: [] },
    { title: 'Where Does the Industry Begin and End?', sourceTitle: 'Where Does the Industry Begin and End?', citations: [] },
    { title: 'Understanding Product Categories and Regulatory Classifications', sourceTitle: 'Understanding Product Categories and Regulatory Classifications', citations: [] },
    { title: 'Who Are the Industry\'s Consumers, Buyers and Stakeholders?', sourceTitle: 'Who Are the Industry\'s Consumers, Buyers and Stakeholders?', citations: [] },
  ],
  cards: [
    {
      id: 'hp11-industry-scope-products',
      ch: 1,
      front: 'Which kinds of products does the healthcare products and nutrition industry span?',
      back: 'Products supporting health maintenance, disease prevention, nutritional adequacy, recovery or defined needs across medicines, devices, supplements, foods and specialized nutrition.',
      explanation: 'The industry spans medicines, devices, supplements, foods and specialized nutrition.',
      example: 'A product list is sorted into medicines, devices, supplements, foods and specialized nutrition.',
      terms: ['Healthcare products', 'Specialized nutrition'],
      refs: [
        [1, 'products supporting health maintenance, disease prevention, nutritional adequacy, recovery or defined needs across medicines, devices, supplements, foods and specialized nutrition.'],
      ],
    },
    {
      id: 'hp11-intended-use-defined',
      ch: 1,
      front: 'In healthcare product classification, what does "intended use" mean?',
      back: 'The purpose for which a product is designed, represented and used. It can affect classification and requirements.',
      explanation: 'Intended use is one of the dimensions the chapter links to how a product is classified.',
      example: 'Intended use can affect classification and requirements for a product.',
      terms: ['Intended use', 'Product classification'],
      refs: [
        [1, 'The purpose for which a product is designed, represented and used; it can affect classification and requirements.'],
      ],
    },
    {
      id: 'hp11-strategy-starts-with-need',
      ch: 2,
      front: 'Why must commercial strategy begin with the target health need and legal product category?',
      back: 'Because related products can face very different evidence, claim, quality and channel requirements.',
      explanation: 'Starting from need and legal category keeps later decisions on evidence, claims, quality and channels tied to the right requirements.',
      example: 'A team planning a new product first fixes the target health need and the legal product category, then plans evidence, claims, quality and channels.',
      terms: ['Health need', 'Product classification'],
      refs: [
        [2, 'Commercial strategy must begin with the target health need and legal product category because related products can face very different evidence, claim, quality and channel requirements.'],
      ],
    },
    {
      id: 'hp11-not-medicine-boundary',
      ch: 3,
      front: 'In the industry boundary chapter, what are dietary supplements and functional foods said not to be, and what is general nutrition said not to be?',
      back: 'Dietary supplements and functional foods are not medicines, and general nutrition is not medical nutrition. Classification, evidence, claims and permitted channels differ by product and jurisdiction.',
      explanation: 'The boundary depends on the actual classification of each product, not on a shared health theme.',
      example: 'A vitamin supplement, a fortified food and a medical-nutrition product can address related needs while following different evidence, labeling and use conditions.',
      terms: ['Dietary supplement', 'Functional food', 'Medical nutrition'],
      refs: [
        [3, 'Dietary supplement and functional food are not medicines; general nutrition is not medical nutrition; classification, evidence, claims and permitted channels differ by product and jurisdiction.'],
        [3, 'A vitamin supplement, fortified food and medical-nutrition product can address related needs while following different evidence, labeling and use conditions.'],
      ],
    },
    {
      id: 'hp11-registration-not-proof-of-efficacy',
      ch: 4,
      front: 'According to the classification chapter, what is registration or notification not, what is safety not, and what is a marketing statement not?',
      back: 'Registration or notification is not clinical proof of efficacy, safety is not guaranteed benefit, and a marketing statement is not scientific evidence.',
      explanation: 'Registration or notification, safety and a marketing statement are each different from clinical proof, benefit and scientific evidence.',
      example: 'A registered or notified product has not thereby shown clinical efficacy, and a marketing statement is not scientific evidence.',
      terms: ['Product classification', 'Health claim'],
      refs: [
        [4, 'Registration or notification is not clinical proof of efficacy; safety is not guaranteed benefit; a marketing statement is not scientific evidence.'],
      ],
    },
    {
      id: 'hp11-ingredient-evidence-not-finished-product',
      ch: 4,
      front: 'A supplier shows research on one ingredient. Does that automatically substantiate the finished product and its claimed outcome?',
      back: 'No. Evidence about an ingredient does not automatically substantiate the finished product, formulation, serving, population or claimed outcome.',
      explanation: 'Substantiation has to fit the product, serving, population and outcome being claimed.',
      example: 'Evidence about an ingredient does not automatically cover the finished product, formulation, serving or population.',
      terms: ['Claim substantiation', 'Product classification'],
      refs: [
        [4, 'Evidence about an ingredient does not automatically substantiate the finished product, formulation, serving, population or claimed outcome.'],
      ],
    },
    {
      id: 'hp11-health-need-drives-demand',
      ch: 5,
      front: 'In market segmentation, what does health need drive, and what do classification and purchase context determine?',
      back: 'Health need drives demand. Classification and purchase context determine evidence, professional involvement, communication and route to market.',
      explanation: 'Demand and route to market are linked but are set by different factors.',
      example: 'Two products sold to the same buyers can still need different evidence, professional involvement and communication because their classification and purchase context differ.',
      terms: ['Health need', 'Professional supervision'],
      refs: [
        [5, 'Health need drives demand, while classification and purchase context determine evidence, professional involvement, communication and route to market.'],
      ],
    },
    {
      id: 'hp11-overlapping-households-not-interchangeable',
      ch: 5,
      front: 'A general vitamin supplement, infant formula and disease-related nutrition product may reach the same households. Are they interchangeable?',
      back: 'No. They may reach overlapping households but are not interchangeable products or regulatory pathways.',
      explanation: 'Shared buyers do not make products or regulatory pathways the same.',
      example: 'A household may buy all three, yet each follows its own product category and pathway.',
      terms: ['Target population', 'Product classification'],
      refs: [
        [5, 'A general vitamin supplement, infant formula and disease-related nutrition product may reach overlapping households but are not interchangeable products or regulatory pathways.'],
      ],
    },
  ],
});

const HP_M01_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m1-industry-history-and-development',
  title: 'Healthcare Products: Industry History & Development',
  description: 'How the industry moved from traditional practice toward standardized, specialized and evidence-led products.',
  lessonId: 'hp-m1-l2',
  lessonTitle: 'Industry History & Development',
  chapterIdPrefix: 'hp-m1-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 2 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Did Nutritional Science and Standardized Products Develop?', sourceTitle: 'How Did Nutritional Science and Standardized Products Develop?', citations: [] },
    { title: 'How Did Supplements and Specialized Nutrition Evolve?', sourceTitle: 'How Did Supplements and Specialized Nutrition Evolve?', citations: [] },
    { title: 'How Did Consumer Health Manufacturing and Safety Systems Develop?', sourceTitle: 'How Did Consumer Health Manufacturing and Safety Systems Develop?', citations: [] },
    { title: 'How Has Vietnam\'s Healthcare Products and Nutrition Industry Developed?', sourceTitle: 'How Has Vietnam\'s Healthcare Products and Nutrition Industry Developed?', citations: [] },
  ],
  cards: [
    {
      id: 'hp12-toward-standardized-evidence-led',
      ch: 1,
      front: 'In which direction has the industry moved, and what does consumer demand still favor?',
      back: 'It has moved toward more standardized, specialized and evidence-led products, while consumer demand still favors simple, convenient health propositions.',
      explanation: 'The industry has moved toward evidence-led products while consumer demand still favors simple, convenient propositions.',
      example: 'An evidence-led product is still offered as a simple, convenient health proposition.',
      terms: ['Evidence-led development', 'Standard manufacturing'],
      refs: [
        [1, 'The industry has moved toward more standardized, specialized and evidence-led products while consumer demand still favors simple, convenient health propositions.'],
      ],
    },
    {
      id: 'hp12-who-gmp-formalizes-quality',
      ch: 3,
      front: 'What does WHO GMP guidance formalize for medical-product manufacturing?',
      back: 'Quality management, personnel, hygiene, validation and complaint handling.',
      explanation: 'The chapter uses WHO GMP guidance as its example of formalized manufacturing quality.',
      example: 'A manufacturer reading the guidance would look at how it organizes quality management, personnel, hygiene, validation and complaints.',
      terms: ['Standard manufacturing', 'Fortification'],
      refs: [
        [3, 'WHO GMP guidance formalizes quality management, personnel, hygiene, validation and complaint handling for medical-product manufacturing.'],
      ],
    },
    {
      id: 'hp12-historical-use-not-enough',
      ch: 4,
      front: 'Can the historical use of an ingredient or remedy alone justify market entry and communication in Vietnam?',
      back: 'No. Historical use can guide research, but market entry and communication still require current classification, evidence, quality and applicable authorization.',
      explanation: 'Historical use can guide research, but market entry and communication still require current classification, evidence, quality and applicable authorization.',
      example: 'A company with a long-used traditional ingredient would still confirm current classification, evidence, quality and authorization before launching and advertising.',
      terms: ['Traditional practice', 'Standard manufacturing'],
      refs: [
        [4, 'Historical use can guide research, but market entry and communication still require current classification, evidence, quality and applicable authorization.'],
      ],
    },
  ],
});

const HP_M01_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m1-global-market-overview',
  title: 'Healthcare Products: Global Market Overview',
  description: 'How global healthcare and nutrition markets are structured and why market figures need clear boundaries.',
  lessonId: 'hp-m1-l3',
  lessonTitle: 'Global Market Overview',
  chapterIdPrefix: 'hp-m1-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Is the Global Healthcare Products and Nutrition Market Structured?', sourceTitle: 'How Is the Global Healthcare Products and Nutrition Market Structured?', citations: [] },
    { title: 'How Are Healthcare and Nutrition Markets Measured?', sourceTitle: 'How Are Healthcare and Nutrition Markets Measured?', citations: [] },
    { title: 'Which Product Segments and Regions Drive Demand?', sourceTitle: 'Which Product Segments and Regions Drive Demand?', citations: [] },
    { title: 'Who Are the Major Global Participant Types?', sourceTitle: 'Who Are the Major Global Participant Types?', citations: [] },
    { title: 'How Do Health Needs, Access and Evidence Shape Demand?', sourceTitle: 'How Do Health Needs, Access and Evidence Shape Demand?', citations: [] },
  ],
  cards: [
    {
      id: 'hp13-headline-figure-misleading',
      ch: 1,
      front: 'When is a single headline market figure misleading?',
      back: 'Unless the included products, geography, period, channel and revenue basis are explicit.',
      explanation: 'A headline market figure is misleading unless the included products, geography, period, channel and revenue basis are explicit.',
      example: 'A market figure is read together with its included products, geography, period, channel and revenue basis.',
      terms: ['Healthcare access', 'Global supply'],
      refs: [
        [1, 'A single headline market figure is misleading unless included products, geography, period, channel and revenue basis are explicit.'],
      ],
    },
    {
      id: 'hp13-estimates-not-added',
      ch: 2,
      front: 'Why must supplement, nutrition, OTC and pharmaceutical market estimates not simply be added together?',
      back: 'Market estimates can include different products, channels, prescription status, geographies and revenue bases, so incompatible estimates must not be added.',
      explanation: 'Different scopes make the estimates incompatible even when each looks like a market size.',
      example: 'A retail supplement estimate and a hospital medical-nutrition estimate can overlap or use different channels and should remain separate.',
      terms: ['Supplement market', 'Pharmaceutical market', 'OTC scope'],
      refs: [
        [2, 'Market estimates can include different products, channels, prescription status, geographies and revenue bases. Incompatible supplement, nutrition, OTC and pharmaceutical estimates must not be added.'],
        [2, 'A retail supplement estimate and hospital medical-nutrition estimate can overlap or use different channels and should remain separate.'],
      ],
    },
    {
      id: 'hp13-revenue-is-not-profit',
      ch: 2,
      front: 'In market measurement, what is market revenue not, what is product registration not, what is consumer awareness not and what is patient reach not?',
      back: 'Market revenue is not manufacturer profit, product registration is not use, consumer awareness is not efficacy and patient reach is not clinical outcome.',
      explanation: 'Market revenue, product registration, consumer awareness and patient reach are each different from profit, use, efficacy and clinical outcome.',
      example: 'A large revenue figure does not show manufacturer profit, and wide awareness does not show that a product works.',
      terms: ['Manufacturer revenue', 'Patient reach'],
      refs: [
        [2, 'Market revenue is not manufacturer profit, product registration is not use, consumer awareness is not efficacy and patient reach is not clinical outcome.'],
      ],
    },
    {
      id: 'hp13-who-versus-codex-scope',
      ch: 4,
      front: 'How does the scope of WHO regulatory guidance differ from that of Codex supplement guidance?',
      back: 'WHO regulatory guidance covers medical products. Codex supplement guidance applies only where vitamin and mineral supplements are regulated as foods.',
      explanation: 'WHO regulatory guidance covers medical products, while Codex supplement guidance applies only where vitamin and mineral supplements are regulated as foods.',
      example: 'A supplement regulated as food falls under the Codex guidance, while the WHO guidance concerns medical products.',
      terms: ['Medicines', 'Supplements'],
      refs: [
        [4, 'WHO regulatory guidance covers medical products, while Codex supplement guidance applies only where vitamin and mineral supplements are regulated as foods.'],
      ],
    },
    {
      id: 'hp13-global-evidence-then-local-test',
      ch: 5,
      front: 'How should global segment evidence be used when assessing the Vietnam market?',
      back: 'As context, followed by tests of local classification, affordability, professional practice, channel maturity and supply feasibility.',
      explanation: 'Global evidence informs the question but does not answer the local one.',
      example: 'A team that finds a strong global segment still checks local classification, affordability, professional practice, channel maturity and supply feasibility.',
      terms: ['Healthcare access', 'Global supply'],
      refs: [
        [5, 'Use global segment evidence as context, then test local classification, affordability, professional practice, channel maturity and supply feasibility.'],
      ],
    },
  ],
});

const HP_M01_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m1-vietnam-market-overview',
  title: 'Healthcare Products: Vietnam Market Overview',
  description: 'The structure of the Vietnam healthcare and nutrition market and the checks needed before launch.',
  lessonId: 'hp-m1-l4',
  lessonTitle: 'Vietnam Market Overview',
  chapterIdPrefix: 'hp-m1-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 1, 3, 4 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'What Does Vietnam\'s Healthcare Products and Nutrition Ecosystem Look Like?', sourceTitle: 'What Does Vietnam\'s Healthcare Products and Nutrition Ecosystem Look Like?', citations: [] },
    { title: 'Which Product Categories and Consumer Needs Drive Demand?', sourceTitle: 'Which Product Categories and Consumer Needs Drive Demand?', citations: [] },
    { title: 'Who Are the Domestic and International Participants?', sourceTitle: 'Who Are the Domestic and International Participants?', citations: [] },
    { title: 'How Do Manufacturing, Imports and Distribution Shape Access?', sourceTitle: 'How Do Manufacturing, Imports and Distribution Shape Access?', citations: [] },
    { title: 'What Regulatory and Commercial Constraints Shape Vietnam\'s Market?', sourceTitle: 'What Regulatory and Commercial Constraints Shape Vietnam\'s Market?', citations: [] },
  ],
  cards: [
    {
      id: 'hp14-trust-not-brand-awareness',
      ch: 2,
      front: 'What do Vietnam opportunities require, and what can brand awareness alone not substitute for?',
      back: 'They require trusted, compliant and accessible products. Brand awareness alone cannot substitute for authenticity, evidence, quality or regulatory readiness.',
      explanation: 'Vietnam opportunities require trusted, compliant and accessible products.',
      example: 'A well-known brand that cannot show authenticity, evidence, quality or regulatory readiness has not met these requirements.',
      terms: ['Consumer trust'],
      refs: [
        [2, 'Vietnam opportunities require trusted, compliant and accessible products; brand awareness alone cannot substitute for authenticity, evidence, quality or regulatory readiness.'],
      ],
    },
    {
      id: 'hp14-medicine-law-versus-food-law',
      ch: 5,
      front: 'Which Vietnamese legal texts does the chapter name for medicines versus for food categories?',
      back: 'The Pharmacy Law covers medicines and pharmacy activity. The consolidated Food Safety Law and Decree 15 govern relevant food categories and activities.',
      explanation: 'The Pharmacy Law covers medicines and pharmacy activity; the Food Safety Law and Decree 15 govern relevant food categories and activities.',
      example: 'Medicines and pharmacy activity are covered by the Pharmacy Law; relevant food categories and activities are governed by the Food Safety Law and Decree 15.',
      terms: ['Product classification', 'Regulatory oversight'],
      refs: [
        [5, 'Pharmacy Law 105/2016/QH13 covers medicines and pharmacy activity, while the consolidated Food Safety Law and Decree 15/2018 govern relevant food categories and activities.'],
      ],
    },
    {
      id: 'hp14-confirm-duties-before-launch',
      ch: 5,
      front: 'Before launching a product category in Vietnam, which duties should be confirmed?',
      back: 'Current registration or declaration, documentation, labeling, advertising, distribution, privacy and post-market duties for each product category.',
      explanation: 'The check is made for each product category, before launch.',
      example: 'A launch checklist for one category lists registration or declaration, documentation, labeling, advertising, distribution, privacy and post-market duties.',
      terms: ['Product classification', 'Consumer trust'],
      refs: [
        [5, 'Confirm current registration or declaration, documentation, labeling, advertising, distribution, privacy and post-market duties for each product category before launch.'],
      ],
    },
  ],
});

const HP_M01_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m1-industry-drivers-and-external-factors',
  title: 'Healthcare Products: Industry Drivers & External Factors',
  description: 'The forces that shape demand, from health need and affordability to regulation, evidence and trust.',
  lessonId: 'hp-m1-l5',
  lessonTitle: 'Industry Drivers & External Factors',
  chapterIdPrefix: 'hp-m1-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 3, 5 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Demographics and Nutrition Needs Affect Demand?', sourceTitle: 'How Do Demographics and Nutrition Needs Affect Demand?', citations: [] },
    { title: 'How Do Income, Affordability and Access Shape Adoption?', sourceTitle: 'How Do Income, Affordability and Access Shape Adoption?', citations: [] },
    { title: 'How Are Science and Product Innovation Changing the Industry?', sourceTitle: 'How Are Science and Product Innovation Changing the Industry?', citations: [] },
    { title: 'Why Do Regulation, Safety and Evidence Standards Matter?', sourceTitle: 'Why Do Regulation, Safety and Evidence Standards Matter?', citations: [] },
    { title: 'How Do Trust, Information Quality and Supply Risk Shape the Industry?', sourceTitle: 'How Do Trust, Information Quality and Supply Risk Shape the Industry?', citations: [] },
  ],
  cards: [
    {
      id: 'hp15-drivers-listed',
      ch: 1,
      front: 'Which factors does the drivers chapter list as shaping the industry?',
      back: 'Aging, changing health patterns, nutrition awareness, professional recommendation, insurance and out-of-pocket spending, science, regulation, supply and misinformation.',
      explanation: 'The list mixes health, spending, science and information factors.',
      example: 'An outlook for a nutrition product would look at aging and changing health patterns alongside spending, regulation, supply and misinformation.',
      terms: ['Demographic change', 'Disease burden', 'Diet and lifestyle'],
      refs: [
        [1, 'aging, changing health patterns, nutrition awareness, professional recommendation, insurance and out-of-pocket spending, science, regulation, supply and misinformation.'],
      ],
    },
    {
      id: 'hp15-growth-is-interaction',
      ch: 2,
      front: 'What does growth reflect, according to the drivers chapter?',
      back: 'The interaction of health need, purchasing capacity, access, evidence and trust, not consumer interest alone.',
      explanation: 'Consumer interest is only one of the interacting elements.',
      example: 'A product with strong consumer interest may still grow slowly if purchasing capacity, access, evidence or trust is weak.',
      terms: ['Affordability', 'Healthcare access', 'Information quality'],
      refs: [
        [2, 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust'],
      ],
    },
    {
      id: 'hp15-who-effective-regulatory-systems',
      ch: 4,
      front: 'What does WHO emphasize that effective regulatory systems support?',
      back: 'Product quality, safety, efficacy, rational use information and action on safety or quality issues.',
      explanation: 'The chapter uses this WHO emphasis as its example for why regulation matters.',
      example: 'When a safety or quality issue appears, an effective regulatory system supports action on it.',
      terms: ['Regulatory oversight', 'Information quality'],
      refs: [
        [4, 'WHO emphasizes that effective regulatory systems support product quality, safety, efficacy, rational use information and action on safety or quality issues.'],
      ],
    },
  ],
});

export const HEALTHCARE_PRODUCTS_M01_DECKS: FlashcardDeckContent[] = [
  HP_M01_L1_DECK,
  HP_M01_L2_DECK,
  HP_M01_L3_DECK,
  HP_M01_L4_DECK,
  HP_M01_L5_DECK,
];
