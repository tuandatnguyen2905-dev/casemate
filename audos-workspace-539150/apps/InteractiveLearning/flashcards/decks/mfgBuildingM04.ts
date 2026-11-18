// Building Materials & Coatings Module 04, one deck per lesson (apps/IndustryKnowledge/mfgBuildingModule04.tsx).
// Excerpts are verbatim from the rendered chapter text and re-checked by decks.test.ts.
// Figures, dates and company data stay out of the cards; only hypothetical worked calculations carry numbers.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: "mfg-building",
  industryLabel: "Building Materials & Coatings",
  moduleId: 'mb-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'MFG_BUILDING_MODULE04',
  file: 'apps/IndustryKnowledge/mfgBuildingModule04.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

export const MFG_BUILDING_M04_DECKS: FlashcardDeckContent[] = [
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m4-industry-competition-structure",
    title: "Building Materials & Coatings: Industry Competition Structure",
    description: "Authored review cards for Industry Competition Structure in Building Materials & Coatings.",
    lessonId: 'mb-m4-l1',
    lessonTitle: "Industry Competition Structure",
    chapterIdPrefix: 'mb-m4-l1',
    chapters: [
      { title: "How Competitive Is Building Materials & Coatings?", sourceTitle: "How Competitive Is Building Materials & Coatings?", citations: [] },
      { title: "How Do Porter's Five Forces Apply Across Product Categories?", sourceTitle: "How Do Porter's Five Forces Apply Across Product Categories?", citations: [] },
      { title: "What Creates Scale, Location, Brand and Technical Barriers?", sourceTitle: "What Creates Scale, Location, Brand and Technical Barriers?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 3 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb41-commodity-vs-specialty-competition",
        ch: 1,
        front: "How do commodity segments and specialty segments differ in how they compete?",
        back: "Commodity segments compete through cost and scale, while specialty segments add formulation, brand and service differentiation.",
        explanation: "The basis of competition differs between commodity and specialty segments.",
        example: "A bulk material supplier competes on cost and scale, while a specialty coatings supplier competes through formulation, brand and service.",
        terms: ["Scale and utilization", "Brand"],
        refs: [
          [1, "Commodity segments compete through cost and scale while specialty segments add formulation, brand and service differentiation."],
        ],
      },
      {
        id: "mb41-cement-vs-protective-coatings-rivalry",
        ch: 2,
        front: "How does rivalry in cement differ from how protective coatings compete?",
        back: "Cement rivalry is regional and freight-sensitive, while protective coatings can compete through tested system performance and application support.",
        explanation: "Competition is shaped by product value-to-weight, fixed assets, resources, technical know-how, certification, distribution and customer trust.",
        example: "A cement producer competes within its region because of freight, while a coatings supplier competes with tested systems and application support.",
        terms: ["Regional freight", "Technical performance"],
        refs: [
          [2, "Cement rivalry is regional and freight-sensitive; protective coatings can compete through tested system performance and application support."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m4-key-industry-players",
    title: "Building Materials & Coatings: Key Industry Players",
    description: "Authored review cards for Key Industry Players in Building Materials & Coatings.",
    lessonId: 'mb-m4-l2',
    lessonTitle: "Key Industry Players",
    chapterIdPrefix: 'mb-m4-l2',
    chapters: [
      { title: "Who Are the Major Global Building-Materials Participants?", sourceTitle: "Who Are the Major Global Building-Materials Participants?", citations: [] },
      { title: "How Do Cement, Systems, Ceramics, Glass and Coatings Specialists Differ?", sourceTitle: "How Do Cement, Systems, Ceramics, Glass and Coatings Specialists Differ?", citations: [] },
      { title: "Which Manufacturers Shape Vietnam's Market?", sourceTitle: "Which Manufacturers Shape Vietnam's Market?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 3 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb42-no-unified-hierarchy",
        ch: 1,
        front: "Is there one ranking of the major players across cement, steel, systems, glass, ceramics and coatings?",
        back: "No. There is no unified hierarchy across cement, steel, systems, glass, ceramics and coatings.",
        explanation: "Participants are diversified international groups, coatings specialists, regional producers and Vietnamese manufacturers across distinct product categories.",
        example: "A company strong in coatings cannot simply be ranked against a cement or steel producer.",
        terms: ["Holcim", "Viglacera and Jotun"],
        refs: [
          [1, "There is no unified hierarchy across cement, steel, systems, glass, ceramics and coatings."],
          [1, "diversified international groups, coatings specialists, regional producers and Vietnamese manufacturers across distinct product categories."],
        ],
      },
      {
        id: "mb42-company-category-examples",
        ch: 2,
        front: "Which category does each of these illustrate: Holcim and Saint-Gobain, Sherwin-Williams, PPG and AkzoNobel, VICEM, Hoa Phat, and Viglacera?",
        back: "Holcim and Saint-Gobain illustrate broad construction solutions; Sherwin-Williams, PPG and AkzoNobel, coatings; VICEM, cement; Hoa Phat, steel; and Viglacera, glass and ceramics.",
        explanation: "Different players are strongest in different product categories.",
        example: "A reader comparing coatings specialists looks at Sherwin-Williams, PPG and AkzoNobel, not at cement or steel producers.",
        terms: ["VICEM and Hoa Phat", "PPG and AkzoNobel"],
        refs: [
          [2, "Holcim and Saint-Gobain illustrate broad construction solutions; Sherwin-Williams, PPG and AkzoNobel coatings; VICEM cement, Hoa Phat steel and Viglacera glass and ceramics."],
        ],
      },
      {
        id: "mb42-benchmark-comparable-only",
        ch: 2,
        front: "What should a manufacturer benchmark when comparing companies, rather than brand recognition alone?",
        back: "Only comparable products, geographies, customers and operating capabilities.",
        explanation: "Brand recognition does not show whether the operations are comparable.",
        example: "A team compares like products, like geographies and like customers instead of ranking by how well known each brand is.",
        terms: ["Sherwin-Williams", "Hoa Phat"],
        refs: [
          [2, "Benchmark only comparable products, geographies, customers and operating capabilities—not brand recognition alone."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m4-competitor-benchmarking",
    title: "Building Materials & Coatings: Competitor Benchmarking",
    description: "Authored review cards for Competitor Benchmarking in Building Materials & Coatings.",
    lessonId: 'mb-m4-l3',
    lessonTitle: "Competitor Benchmarking",
    chapterIdPrefix: 'mb-m4-l3',
    chapters: [
      { title: "How Should Building-Materials Manufacturers Be Compared?", sourceTitle: "How Should Building-Materials Manufacturers Be Compared?", citations: [] },
      { title: "How Do Capacity, Cost, Energy, Quality and Distribution Differ?", sourceTitle: "How Do Capacity, Cost, Energy, Quality and Distribution Differ?", citations: [] },
      { title: "Which Technical, Commercial and Sustainability Capabilities Create Advantage?", sourceTitle: "Which Technical, Commercial and Sustainability Capabilities Create Advantage?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 3 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb43-normalize-before-comparing",
        ch: 1,
        front: "What must be chosen and normalized before building-materials companies are compared?",
        back: "Category-specific units must be chosen, and period, mix, region and application normalized before comparing companies.",
        explanation: "Category-specific units are chosen and period, mix, region and application are normalized before companies are compared.",
        example: "Two plants are compared only after the same units, period, mix, region and application are used for both.",
        terms: ["Capacity and utilization", "Market reach"],
        refs: [
          [1, "Choose category-specific units and normalize period, mix, region and application before comparing companies."],
        ],
      },
      {
        id: "mb43-volume-alone-hides-weakness",
        ch: 2,
        front: "What can production volume alone hide when manufacturers are compared?",
        back: "Weak utilization, freight economics, quality, margin or cash conversion.",
        explanation: "Useful benchmarking connects operating performance to customer value and financial return.",
        example: "A plant with high production volume may still have weak utilization, freight economics, quality, margin or cash conversion.",
        terms: ["Product performance", "Margin and capital"],
        refs: [
          [2, "Production volume alone can hide weak utilization, freight economics, quality, margin or cash conversion."],
          [2, "Useful benchmarking connects operating performance to customer value and financial return."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m4-key-success-factors",
    title: "Building Materials & Coatings: Key Success Factors",
    description: "Authored review cards for Key Success Factors in Building Materials & Coatings.",
    lessonId: 'mb-m4-l4',
    lessonTitle: "Key Success Factors",
    chapterIdPrefix: 'mb-m4-l4',
    chapters: [
      { title: "Why Do Raw-Material Access, Cost and Utilization Matter?", sourceTitle: "Why Do Raw-Material Access, Cost and Utilization Matter?", citations: [] },
      { title: "How Do Quality, Reliability and Distribution Create Advantage?", sourceTitle: "How Do Quality, Reliability and Distribution Create Advantage?", citations: [] },
      { title: "How Do Brand, Technical Credibility and Service Support Growth?", sourceTitle: "How Do Brand, Technical Credibility and Service Support Growth?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 2 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb44-balance-utilization-and-cost",
        ch: 1,
        front: "What should a manufacturer balance with utilization and cost to build lasting advantage?",
        back: "Product quality, dealer availability, project service and credible sustainability evidence.",
        explanation: "Sustainable advantage combines operational discipline with customer-relevant differentiation.",
        example: "A producer keeps utilization and cost under control while also keeping product quality, dealer availability and project service strong.",
        terms: ["Cost and productivity", "Consistent quality"],
        refs: [
          [1, "Balance utilization and cost with product quality, dealer availability, project service and credible sustainability evidence."],
          [1, "Sustainable advantage combines operational discipline with customer-relevant differentiation."],
        ],
      },
      {
        id: "mb44-differentiated-system-fails-commercially",
        ch: 3,
        front: "Why can a differentiated waterproofing system fail commercially?",
        back: "It can fail commercially if stock, contractor skill or technical support is unreliable.",
        explanation: "Differentiation only counts when delivery and support are dependable.",
        example: "A technically better waterproofing system loses sales when stock runs out, the contractor lacks skill or technical support is unreliable.",
        terms: ["Technical products", "Reliable delivery"],
        refs: [
          [3, "A differentiated waterproofing system fails commercially if stock, contractor skill or technical support is unreliable."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m4-industry-swot-and-strategic-challenges",
    title: "Building Materials & Coatings: Industry SWOT & Strategic Challenges",
    description: "Authored review cards for Industry SWOT & Strategic Challenges in Building Materials & Coatings.",
    lessonId: 'mb-m4-l5',
    lessonTitle: "Industry SWOT & Strategic Challenges",
    chapterIdPrefix: 'mb-m4-l5',
    chapters: [
      { title: "What Are the Industry's Main Strengths and Weaknesses?", sourceTitle: "What Are the Industry's Main Strengths and Weaknesses?", citations: [] },
      { title: "What Opportunities and Threats Shape Building Materials?", sourceTitle: "What Opportunities and Threats Shape Building Materials?", citations: [] },
      { title: "What Strategic Choices Must Manufacturers Make?", sourceTitle: "What Strategic Choices Must Manufacturers Make?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Every eligible chapter of the lesson has at least one card.",
    ],
    cards: [
      {
        id: "mb45-swot-summary",
        ch: 1,
        front: "In the building-materials SWOT summary, what are the strengths, weaknesses, opportunities and threats?",
        back: "Strengths: essential demand and manufacturing. Weaknesses: capital, energy and freight. Opportunities: infrastructure, renovation and specialties. Threats: cycles, discounting and regulation.",
        explanation: "The SWOT sets the industry strengths and weaknesses against external opportunities and threats.",
        example: "A strategy review lists essential demand as a strength, energy as a weakness, renovation as an opportunity and discounting as a threat.",
        terms: ["Structural demand", "Capital intensity", "Cyclicality"],
        refs: [
          [1, "strengths in essential demand and manufacturing; weaknesses in capital, energy and freight;"],
          [1, "opportunities in infrastructure, renovation and specialties; threats from cycles, discounting and regulation."],
        ],
      },
      {
        id: "mb45-near-zero-cement-cost-challenge",
        ch: 2,
        front: "Near-zero cement can create long-term value. What cost challenge does early CCS-based production face?",
        back: "IEA estimates early CCS-based production costs are above conventional plants, and the gap varies by region.",
        explanation: "The figure is a regional production-cost range, not a retail price or a universal outcome.",
        example: "A manufacturer weighing near-zero cement considers that early CCS-based production costs more than a conventional plant.",
        terms: ["Transition cost", "Higher-value niches"],
        refs: [
          [2, "IEA estimates early CCS-based production costs"],
          [2, "above conventional plants by region."],
          [2, "Regional production-cost range—not retail price or universal outcome."],
        ],
      },
      {
        id: "mb45-selective-upgrading-challenge",
        ch: 3,
        front: "What is the strategic challenge for building-materials manufacturers when upgrading?",
        back: "Selective upgrading without losing cost discipline or overinvesting ahead of demand.",
        explanation: "Upgrading has to be staged against credible demand and implementation evidence.",
        example: "A manufacturer upgrades selected product lines while keeping cost discipline instead of investing far ahead of demand.",
        terms: ["Excess capacity", "Transition cost"],
        refs: [
          [3, "The strategic challenge is selective upgrading without losing cost discipline or overinvesting ahead of demand."],
        ],
      },
    ],
  }),
];
