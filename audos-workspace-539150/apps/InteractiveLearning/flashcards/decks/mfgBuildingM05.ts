// Building Materials & Coatings Module 05, one deck per lesson (apps/IndustryKnowledge/mfgBuildingModule05.tsx).
// Excerpts are verbatim from the rendered chapter text and re-checked by decks.test.ts.
// Figures, dates and company data stay out of the cards; only hypothetical worked calculations carry numbers.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: "mfg-building",
  industryLabel: "Building Materials & Coatings",
  moduleId: 'mb-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'MFG_BUILDING_MODULE05',
  file: 'apps/IndustryKnowledge/mfgBuildingModule05.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

export const MFG_BUILDING_M05_DECKS: FlashcardDeckContent[] = [
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m5-consumer-trends",
    title: "Building Materials & Coatings: Consumer Trends",
    description: "Authored review cards for Consumer Trends in Building Materials & Coatings.",
    lessonId: 'mb-m5-l1',
    lessonTitle: "Consumer Trends",
    chapterIdPrefix: 'mb-m5-l1',
    chapters: [
      { title: "How Are Construction and Renovation Requirements Changing?", sourceTitle: "How Are Construction and Renovation Requirements Changing?", citations: [] },
      { title: "Why Are Durability, Quality and Lifecycle Value More Important?", sourceTitle: "Why Are Durability, Quality and Lifecycle Value More Important?", citations: [] },
      { title: "How Are Climate and Design Expectations Shaping Products?", sourceTitle: "How Are Climate and Design Expectations Shaping Products?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 1 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb51-complete-building-outcomes",
        ch: 2,
        front: "Why is product price alone becoming a weaker basis for customer choice in building materials?",
        back: "Customers increasingly evaluate complete building outcomes rather than product price alone.",
        explanation: "Durability, quality and lifecycle value matter alongside price.",
        example: "A customer compares complete building outcomes, including maintenance and weather performance, instead of only the price of the product.",
        terms: ["Durability", "Lifecycle cost"],
        refs: [
          [2, "Customers increasingly evaluate complete building outcomes rather than product price alone."],
        ],
      },
      {
        id: "mb51-reflective-coating-assessment",
        ch: 3,
        front: "How can a reflective exterior coating be assessed?",
        back: "Through appearance, application, weatherability, maintenance and building conditions.",
        explanation: "Climate and design expectations are shaping products.",
        example: "A buyer assesses a reflective exterior coating on appearance, application, weatherability, maintenance and building conditions.",
        terms: ["Weatherability", "Climate response"],
        refs: [
          [3, "A reflective exterior coating can be assessed through appearance, application, weatherability, maintenance and building conditions."],
        ],
      },
      {
        id: "mb51-translate-climate-needs",
        ch: 3,
        front: "How should local climate and contractor needs be translated into products?",
        back: "Into compatible systems, instructions, training and realistic performance claims.",
        explanation: "Climate needs shape what products must do, and contractors need instructions and training to apply them.",
        example: "A manufacturer turns local climate and contractor needs into compatible systems with instructions, training and realistic performance claims.",
        terms: ["Climate response", "Ease of application"],
        refs: [
          [3, "Translate local climate and contractor needs into compatible systems, instructions, training and realistic performance claims."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m5-technology-and-innovation-trends",
    title: "Building Materials & Coatings: Technology & Innovation Trends",
    description: "Authored review cards for Technology & Innovation Trends in Building Materials & Coatings.",
    lessonId: 'mb-m5-l2',
    lessonTitle: "Technology & Innovation Trends",
    chapterIdPrefix: 'mb-m5-l2',
    chapters: [
      { title: "How Are Automation and Digital Quality Monitoring Evolving?", sourceTitle: "How Are Automation and Digital Quality Monitoring Evolving?", citations: [] },
      { title: "How Are Advanced Materials and Coating Technologies Developing?", sourceTitle: "How Are Advanced Materials and Coating Technologies Developing?", citations: [] },
      { title: "How Are Energy-Efficient Processes and Digital Product Data Evolving?", sourceTitle: "How Are Energy-Efficient Processes and Digital Product Data Evolving?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 2 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb52-technology-creates-value-when",
        ch: 1,
        front: "When does technology create value in building-materials manufacturing?",
        back: "When it improves measurable factory or customer performance.",
        explanation: "Examples include sensors, predictive maintenance, laboratory systems and digital records.",
        example: "Sensors or predictive maintenance count as value only if they improve measurable factory or customer performance.",
        terms: ["Automation", "Process analytics"],
        refs: [
          [1, "Technology creates value when it improves measurable factory or customer performance."],
          [1, "sensors, predictive maintenance, laboratory systems, protective formulations, insulation,"],
        ],
      },
      {
        id: "mb52-bim-object-needs-current-data",
        ch: 3,
        front: "When does a BIM object support product selection?",
        back: "Only when product data, system compatibility and technical documentation are current.",
        explanation: "Digital product data is useful for selection only if it is kept up to date.",
        example: "A specifier relies on a BIM object only when its product data, system compatibility and technical documentation are current.",
        terms: ["BIM data", "Traceability"],
        refs: [
          [3, "A BIM object supports selection only when product data, system compatibility and technical documentation are current."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m5-market-and-channel-trends",
    title: "Building Materials & Coatings: Market & Channel Trends",
    description: "Authored review cards for Market & Channel Trends in Building Materials & Coatings.",
    lessonId: 'mb-m5-l3',
    lessonTitle: "Market & Channel Trends",
    chapterIdPrefix: 'mb-m5-l3',
    chapters: [
      { title: "How Are Infrastructure, Renovation and Project Channels Evolving?", sourceTitle: "How Are Infrastructure, Renovation and Project Channels Evolving?", citations: [] },
      { title: "How Are Consolidation, Exports and Channel Modernization Developing?", sourceTitle: "How Are Consolidation, Exports and Channel Modernization Developing?", citations: [] },
      { title: "How Are Integrated Systems and Higher-Value Portfolios Expanding?", sourceTitle: "How Are Integrated Systems and Higher-Value Portfolios Expanding?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 1 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb53-bundled-systems-simplify-procurement",
        ch: 3,
        front: "How can a manufacturer simplify compatibility and procurement for customers?",
        back: "It can bundle waterproofing, adhesives, grouts and finishes.",
        explanation: "Bundling is aimed at simplifying compatibility and procurement.",
        example: "A manufacturer offers waterproofing, adhesives, grouts and finishes as one bundle that is compatible and easier to procure.",
        terms: ["Integrated systems", "Project procurement"],
        refs: [
          [3, "A manufacturer can bundle waterproofing, adhesives, grouts and finishes to simplify compatibility and procurement."],
        ],
      },
      {
        id: "mb53-market-access-needs-coordination",
        ch: 2,
        front: "What does market access increasingly require in building materials?",
        back: "Coordinated physical distribution, digital information and technical engagement.",
        explanation: "Channel modernization combines physical, digital and technical elements.",
        example: "A manufacturer coordinates dealer distribution with digital information and technical engagement to reach customers.",
        terms: ["Digital discovery", "New construction"],
        refs: [
          [2, "Market access increasingly requires coordinated physical distribution, digital information and technical engagement."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m5-regulatory-and-sustainability-trends",
    title: "Building Materials & Coatings: Regulatory & Sustainability Trends",
    description: "Authored review cards for Regulatory & Sustainability Trends in Building Materials & Coatings.",
    lessonId: 'mb-m5-l4',
    lessonTitle: "Regulatory & Sustainability Trends",
    chapterIdPrefix: 'mb-m5-l4',
    chapters: [
      { title: "How Do Product Safety and Technical Rules Affect Manufacturers?", sourceTitle: "How Do Product Safety and Technical Rules Affect Manufacturers?", citations: [] },
      { title: "How Are Industrial Emissions and Resource Efficiency Requirements Evolving?", sourceTitle: "How Are Industrial Emissions and Resource Efficiency Requirements Evolving?", citations: [] },
      { title: "How Are Low-Carbon Materials, Circularity and Claims Developing?", sourceTitle: "How Are Low-Carbon Materials, Circularity and Claims Developing?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Every eligible chapter of the lesson has at least one card.",
      "Chapter 1 is review-held (shown as under review) and has no cards.",
    ],
    cards: [
      {
        id: "mb54-digital-product-information-regulation",
        ch: 2,
        front: "What does the EU construction-products regulation support, and what does it leave dependent on product rules?",
        back: "It supports digital construction-product information and a future DPP system, but detailed duties depend on product rules and implementation.",
        explanation: "Requirements depend on the relevant technical rules and timelines.",
        example: "A manufacturer prepares digital product information but still checks product rules and implementation before assuming specific duties.",
        terms: ["Digital Product Passport", "Construction Products Regulation"],
        refs: [
          [2, "supports digital construction-product information and a future DPP system, but detailed duties depend on product rules and implementation."],
        ],
      },
      {
        id: "mb54-stage-low-carbon-investments",
        ch: 2,
        front: "How should energy, SCM, alternative-fuel and formulation investments be handled?",
        back: "They should be staged against economics, while traceable performance and environmental data are developed.",
        explanation: "Energy, SCM, alternative-fuel and formulation investments are weighed against economics.",
        example: "A producer stages energy, SCM, alternative-fuel and formulation investments against economics while building traceable performance and environmental data.",
        terms: ["Lower-carbon cement", "Lifecycle assessment"],
        refs: [
          [2, "Develop traceable performance and environmental data while staging energy, SCM, alternative-fuel and formulation investments against economics."],
        ],
      },
      {
        id: "mb54-sustainability-needs-product-evidence",
        ch: 3,
        front: "Why does sustainability now matter for market access and investment in building materials?",
        back: "It is becoming a market-access and investment issue that requires product-specific evidence.",
        explanation: "Claims about low-carbon materials and circularity need to be substantiated.",
        example: "A manufacturer making a sustainability claim supports it with product-specific evidence.",
        terms: ["Credible claims", "Lower-emission coatings"],
        refs: [
          [3, "Sustainability is becoming a market-access and investment issue that requires product-specific evidence."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m5-growth-outlook-and-strategic-opportunities",
    title: "Building Materials & Coatings: Growth Outlook & Strategic Opportunities",
    description: "Authored review cards for Growth Outlook & Strategic Opportunities in Building Materials & Coatings.",
    lessonId: 'mb-m5-l5',
    lessonTitle: "Growth Outlook & Strategic Opportunities",
    chapterIdPrefix: 'mb-m5-l5',
    chapters: [
      { title: "What Factors Will Drive Future Building-Materials Demand?", sourceTitle: "What Factors Will Drive Future Building-Materials Demand?", citations: [] },
      { title: "Where Are Higher-Value Opportunities Emerging in Vietnam and Global Markets?", sourceTitle: "Where Are Higher-Value Opportunities Emerging in Vietnam and Global Markets?", citations: [] },
      { title: "How Should Building-Materials Companies Position Themselves?", sourceTitle: "How Should Building-Materials Companies Position Themselves?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Every eligible chapter of the lesson has at least one card.",
    ],
    cards: [
      {
        id: "mb55-growth-does-not-guarantee-profit",
        ch: 1,
        front: "Does growth in coatings or materials guarantee profit?",
        back: "No. Profit is not guaranteed when discounting, freight, energy, idle capacity or receivables deteriorate.",
        explanation: "Demand growth has to be read together with cost and cash factors.",
        example: "A producer sells more but loses profit because discounting, freight, energy, idle capacity or receivables deteriorate.",
        terms: ["Infrastructure", "Renovation"],
        refs: [
          [1, "Growth in coatings or materials does not guarantee profit when discounting, freight, energy, idle capacity or receivables deteriorate."],
        ],
      },
      {
        id: "mb55-recovery-plus-upgrading",
        ch: 2,
        front: "What do the strongest building-materials opportunities combine?",
        back: "Demand recovery with selective product and capability upgrading.",
        explanation: "Opportunities include premium finishes, waterproofing, corrosion protection, repair, technical service, energy efficiency and verifiable environmental information.",
        example: "A producer pairs recovery in core materials with selective upgrading into higher-value products and capabilities.",
        terms: ["Protective systems", "Operational upgrading"],
        refs: [
          [2, "The strongest opportunities combine demand recovery with selective product and capability upgrading."],
        ],
      },
      {
        id: "mb55-prioritize-where-returns-hold",
        ch: 3,
        front: "Which segments should a building-materials company prioritize for sustainable returns?",
        back: "Segments where customer demand, channel access, technical capability and willingness to pay support sustainable returns.",
        explanation: "Customer demand, channel access, technical capability and willingness to pay all need to support the returns.",
        example: "A company ranks segments by customer demand, channel access, technical capability and willingness to pay.",
        terms: ["Integrated solutions", "Sustainability differentiation"],
        refs: [
          [3, "Prioritize segments where customer demand, channel access, technical capability and willingness to pay support sustainable returns."],
        ],
      },
    ],
  }),
];
