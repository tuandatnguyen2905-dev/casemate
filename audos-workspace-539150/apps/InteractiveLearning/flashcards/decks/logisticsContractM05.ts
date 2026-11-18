// Contract Logistics & Warehousing, Module 05: one authored deck per lesson (apps/IndustryKnowledge/logisticsContractModule05.tsx).
// Excerpts are verbatim from the rendered chapter text. The figures on these cards come only from the chapters' own HYPOTHETICAL worked examples.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-contract',
  industryLabel: 'Contract Logistics & Warehousing',
  moduleId: 'lc-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'LOGISTICS_CONTRACT_MODULE05',
  file: 'apps/IndustryKnowledge/logisticsContractModule05.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

export const LOGISTICS_CONTRACT_M05_DECKS: FlashcardDeckContent[] = [
  defineLessonDeck({
    ...COMMON,
    deckId: 'logistics-contract-m5-customer-trends',
    title: 'Contract Logistics & Warehousing: Customer Trends',
    description: 'Flashcards for the lesson Customer Trends in Contract Logistics & Warehousing.',
    lessonId: 'lc-m5-l1',
    lessonTitle: 'Customer Trends',
    chapterIdPrefix: 'lc-m5-l1',
    mappingNotes: [
      'Excerpts are checked against the rendered chapter text.',
      'Chapter 1 has no cards because it displays only text shared with a sibling chapter plus a dimension list.',
    ],
    chapters: [
      { title: 'How Are Contract Logistics Customers’ Requirements Changing?', sourceTitle: 'How Are Contract Logistics Customers’ Requirements Changing?', citations: [] },
      { title: 'Why Are Flexibility, Reliability and Cost Transparency More Important?', sourceTitle: 'Why Are Flexibility, Reliability and Cost Transparency More Important?', citations: [] },
      { title: 'How Are Integrated and End-to-End Solutions Evolving?', sourceTitle: 'How Are Integrated and End-to-End Solutions Evolving?', citations: [] },
    ],
    cards: [
      {
        id: 'lc51-flexibility-versus-cost-recovery',
        ch: 2,
        front: 'Customers seek operational flexibility. What must providers still recover?',
        back: 'Facility, labor and equipment commitments.',
        explanation: 'One-year or flexible contracts reduce commitment but can constrain provider investment recovery.',
        example: 'In Vietnam, flexibility is aligned with minimums, forecasts and change-control rules.',
        terms: ['Flexible capacity', 'Adjustable commitments', 'Transparent pricing'],
        refs: [
          [2, 'Customers seek operational flexibility while providers must recover facility, labor and equipment commitments.'],
          [2, 'One-year or flexible contracts reduce commitment but can constrain provider investment recovery.'],
        ],
      },
      {
        id: 'lc51-reduced-complexity-not-more-categories',
        ch: 3,
        front: 'What do customers value in integrated, end-to-end solutions, rather than more service categories?',
        back: 'Reduced complexity and consistent outcomes.',
        explanation: 'Warehousing, inventory, fulfillment, transport, returns and reporting are coordinated under one operating relationship.',
        example: 'A retailer uses one inventory pool for stores, online orders and wholesale customers.',
        terms: ['End-to-end outsourcing', 'Single accountability', 'Process integration'],
        refs: [
          [3, 'Customers value reduced complexity and consistent outcomes—not more service categories by themselves.'],
          [3, 'A retailer uses one inventory pool for stores, online orders and wholesale customers.'],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: 'logistics-contract-m5-technology-and-innovation-trends',
    title: 'Contract Logistics & Warehousing: Technology & Innovation Trends',
    description: 'Flashcards for the lesson Technology & Innovation Trends in Contract Logistics & Warehousing.',
    lessonId: 'lc-m5-l2',
    lessonTitle: 'Technology & Innovation Trends',
    chapterIdPrefix: 'lc-m5-l2',
    mappingNotes: [
      'Excerpts are checked against the rendered chapter text.',
      'Chapter 3 has no cards because it displays only text shared with a sibling chapter plus a dimension list.',
    ],
    chapters: [
      { title: 'How Are Warehouse Automation and Robotics Changing Operations?', sourceTitle: 'How Are Warehouse Automation and Robotics Changing Operations?', citations: [] },
      { title: 'How Are WMS, Analytics and Digital Twins Improving Decisions?', sourceTitle: 'How Are WMS, Analytics and Digital Twins Improving Decisions?', citations: [] },
      { title: 'How Could AI and Connected Logistics Transform Warehousing?', sourceTitle: 'How Could AI and Connected Logistics Transform Warehousing?', citations: [] },
    ],
    cards: [
      {
        id: 'lc52-automate-measurable-bottlenecks',
        ch: 1,
        front: 'Which activities should be automated, according to the chapter?',
        back: 'Measurable bottlenecks, rather than every activity.',
        explanation: 'Automation is matched to volume, products and payback across storage, movement, sorting, picking, planning and equipment analytics.',
        example: 'AMRs can support travel-intensive picking but need WMS integration, safe workflows and maintenance.',
        terms: ['ASRS', 'AMRs', 'Robotic picking'],
        refs: [
          [1, 'Automate measurable bottlenecks rather than every activity.'],
          [1, 'AMRs can support travel-intensive picking but need WMS integration, safe workflows and maintenance.'],
        ],
      },
      {
        id: 'lc52-digital-twin-data-quality',
        ch: 2,
        front: 'A digital twin can test layout changes. What does the quality of its model depend on?',
        back: 'Valid data and assumptions.',
        explanation: 'Digital value comes from reliable data turned into timely operating decisions.',
        example: 'A layout test in a digital twin is only as good as the data and assumptions behind the model.',
        terms: ['Digital twins', 'Cloud WMS', 'Dashboards'],
        refs: [
          [2, 'A digital twin can test layout changes, but model quality depends on valid data and assumptions.'],
          [2, 'Digital value comes from reliable data turned into timely operating decisions.'],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: 'logistics-contract-m5-market-and-channel-trends',
    title: 'Contract Logistics & Warehousing: Market & Channel Trends',
    description: 'Flashcards for the lesson Market & Channel Trends in Contract Logistics & Warehousing.',
    lessonId: 'lc-m5-l3',
    lessonTitle: 'Market & Channel Trends',
    chapterIdPrefix: 'lc-m5-l3',
    mappingNotes: [
      'Excerpts are checked against the rendered chapter text.',
      'Chapter 2 has no cards because it displays only text shared with a sibling chapter plus a dimension list.',
    ],
    chapters: [
      { title: 'How Are Regional Logistics Networks and Supply Chains Evolving?', sourceTitle: 'How Are Regional Logistics Networks and Supply Chains Evolving?', citations: [] },
      { title: 'How Are E-Commerce and Omnichannel Fulfillment Developing?', sourceTitle: 'How Are E-Commerce and Omnichannel Fulfillment Developing?', citations: [] },
      { title: 'How Are Specialized and Integrated Logistics Services Expanding?', sourceTitle: 'How Are Specialized and Integrated Logistics Services Expanding?', citations: [] },
    ],
    cards: [
      {
        id: 'lc53-facilities-outlive-demand',
        ch: 1,
        front: 'When does geographic change create risk as well as opportunity?',
        back: 'When facilities outlive customer demand.',
        explanation: 'Sourcing and manufacturing shifts create inventory and distribution needs across regions.',
        example: 'Shared-user and partner networks can test new markets before dedicated investment.',
        terms: ['Regional DCs', 'Multicountry operations', 'Flexible capacity'],
        refs: [
          [1, 'Geographic change creates opportunity and risk when facilities outlive customer demand.'],
          [1, 'Shared-user and partner networks can test new markets before dedicated investment.'],
        ],
      },
      {
        id: 'lc53-spare-parts-availability',
        ch: 3,
        front: 'What does spare-parts logistics value more than average storage cost?',
        back: 'High availability and rapid small orders.',
        explanation: 'Growth is strongest where flexible fulfillment meets differentiated sector expertise.',
        example: 'A spare-parts operation is judged on how quickly it can fill small orders from stock that is available.',
        terms: ['Aftermarket', 'High-value goods', 'Customization'],
        refs: [
          [3, 'Spare-parts logistics values high availability and rapid small orders rather than average storage cost.'],
          [3, 'Growth is strongest where flexible fulfillment meets differentiated sector expertise.'],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: 'logistics-contract-m5-regulatory-and-sustainability-trends',
    title: 'Contract Logistics & Warehousing: Regulatory & Sustainability Trends',
    description: 'Flashcards for the lesson Regulatory & Sustainability Trends in Contract Logistics & Warehousing.',
    lessonId: 'lc-m5-l4',
    lessonTitle: 'Regulatory & Sustainability Trends',
    chapterIdPrefix: 'lc-m5-l4',
    mappingNotes: [
      'Excerpts are checked against the rendered chapter text.',
      'Every eligible chapter of this lesson has at least one card.',
      'Chapter 1 is held for review and has no cards.',
    ],
    chapters: [
      { title: 'How Do Safety, Product and Data Requirements Affect Warehouses?', sourceTitle: 'How Do Safety, Product and Data Requirements Affect Warehouses?', citations: [] },
      { title: 'How Are Green Warehousing and Resource Efficiency Evolving?', sourceTitle: 'How Are Green Warehousing and Resource Efficiency Evolving?', citations: [] },
      { title: 'How Are Traceability, Resilience and Responsible Operations Changing?', sourceTitle: 'How Are Traceability, Resilience and Responsible Operations Changing?', citations: [] },
    ],
    cards: [
      {
        id: 'lc54-led-versus-solar-evaluation',
        ch: 2,
        front: 'How do LED and controls differ from solar in the evaluation they need?',
        back: 'LED and controls can lower energy, while solar needs site, load, finance and contract evaluation.',
        explanation: 'Green warehousing covers building energy, handling equipment, packaging, waste, transport and facility design.',
        example: 'A provider can consider LED and controls to lower energy, but needs a fuller evaluation before choosing solar.',
        terms: ['Energy efficiency', 'Electric equipment', 'Waste'],
        refs: [
          [2, 'LED and controls can lower energy, while solar needs site, load, finance and contract evaluation.'],
          [2, 'building energy, handling equipment, packaging, waste, transport and facility design affecting resources and customer procurement.'],
        ],
      },
      {
        id: 'lc54-credible-methods-not-claims',
        ch: 3,
        front: 'What does sustainability need, rather than general claims?',
        back: 'Measurable benefits and credible methods.',
        explanation: 'In Vietnam, practical projects are prioritized when they align with customer requirements and asset horizon.',
        example: 'A provider that reports packaging or emissions improvements backs them with a credible method.',
        terms: ['Renewable energy', 'Packaging', 'Emissions methods'],
        refs: [
          [3, 'Sustainability needs measurable benefits and credible methods rather than general claims.'],
          [3, 'Prioritize practical projects aligned with customer requirements and asset horizon.'],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: 'logistics-contract-m5-growth-outlook-and-strategic-opportunities',
    title: 'Contract Logistics & Warehousing: Growth Outlook & Strategic Opportunities',
    description: 'Flashcards for the lesson Growth Outlook & Strategic Opportunities in Contract Logistics & Warehousing.',
    lessonId: 'lc-m5-l5',
    lessonTitle: 'Growth Outlook & Strategic Opportunities',
    chapterIdPrefix: 'lc-m5-l5',
    mappingNotes: [
      'Excerpts are checked against the rendered chapter text.',
      'Chapter 3 has no cards because it displays only text shared with a sibling chapter plus a dimension list.',
    ],
    chapters: [
      { title: 'What Factors Will Drive Future Contract Logistics Demand?', sourceTitle: 'What Factors Will Drive Future Contract Logistics Demand?', citations: [] },
      { title: 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', sourceTitle: 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', citations: [] },
      { title: 'How Should Contract Logistics Providers Position Themselves?', sourceTitle: 'How Should Contract Logistics Providers Position Themselves?', citations: [] },
    ],
    cards: [
      {
        id: 'lc55-growth-needs-more-than-revenue',
        ch: 1,
        front: 'What does long-term growth require, rather than revenue pursuit alone?',
        back: 'Productivity, retention and profitable service design.',
        explanation: 'The chapter\'s growth drivers include outsourcing, Asia-Pacific growth, technology, consolidation, specialized logistics and margin discipline.',
        example: 'A provider that chases revenue without margin discipline does not meet the growth test described here.',
        terms: ['Outsourcing', 'Margin discipline', 'Specialized logistics'],
        refs: [
          [1, 'Long-term growth requires productivity, retention and profitable service design—not revenue pursuit alone.'],
          [1, 'Key dimensions include Outsourcing, Asia-Pacific growth, Technology, Consolidation, Specialized logistics, Margin discipline.'],
        ],
      },
      {
        id: 'lc55-vietnam-integrated-managed-operations',
        ch: 2,
        front: 'How can Vietnam progress from storage and handling?',
        back: 'Toward integrated, technology-enabled managed operations.',
        explanation: 'Vietnam invests where customer outsourcing, service economics and operating capability are demonstrated.',
        example: 'A provider moves from basic storage and handling to managed operations that combine integration and technology.',
        terms: ['Warehouse networks', 'Specialized services', 'Manufacturing logistics'],
        refs: [
          [2, 'Vietnam can progress from storage and handling toward integrated, technology-enabled managed operations.'],
          [2, 'Invest where customer outsourcing, service economics and operating capability are demonstrated.'],
        ],
      },
    ],
  }),
];
