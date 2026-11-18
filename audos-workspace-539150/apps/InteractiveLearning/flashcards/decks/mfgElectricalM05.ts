// Pinned-ID authored flashcard decks: Electrical Equipment Manufacturing, Module 05 (apps/IndustryKnowledge/mfgElectricalModule05.tsx).
// Excerpts are checked against the rendered chapter text, not the raw source file.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-electrical',
  industryLabel: 'Electrical Equipment Manufacturing',
  moduleId: 'me-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'MFG_ELECTRICAL_MODULE05',
  file: 'apps/IndustryKnowledge/mfgElectricalModule05.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ME_M05_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m5-consumer-trends',
  title: 'Electrical Equipment Manufacturing: Consumer Trends',
  description: 'What total cost of ownership includes and when premium or connected equipment creates value.',
  lessonId: 'me-m5-l1',
  lessonTitle: 'Consumer Trends',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m5-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Utility and Industrial Customer Requirements Changing?', sourceTitle: 'How Are Utility and Industrial Customer Requirements Changing?', citations: [] },
    { title: 'Why Are Reliability, Efficiency and TCO More Important?', sourceTitle: 'Why Are Reliability, Efficiency and TCO More Important?', citations: [] },
    { title: 'How Are Connected Equipment and Service Expectations Evolving?', sourceTitle: 'How Are Connected Equipment and Service Expectations Evolving?', citations: [] },
  ],
  cards: [
    {
      id: 'me51-tco-definition',
      ch: 1,
      front: 'What does total cost of ownership include?',
      back: 'Acquisition, installation, losses, operation, maintenance, downtime, financing and end-of-life cost.',
      explanation: 'Customers increasingly buy lifecycle reliability and operating value, not electrical hardware alone.',
      example: 'A supplier documents efficiency, warranty, maintenance assumptions, parts access and response coverage.',
      terms: ['Total cost of ownership'],
      refs: [
        [1, 'Acquisition, installation, losses, operation, maintenance, downtime, financing and end-of-life cost.'],
        [1, 'Customers increasingly buy lifecycle reliability and operating value, not electrical hardware alone.'],
      ],
    },
    {
      id: 'me51-critical-facility-premium',
      ch: 2,
      front: 'When can a critical facility justify premium equipment?',
      back: 'When lower failure risk and faster service protect operations.',
      explanation: 'Procurement is based on losses, uptime, safety, service life, maintenance and support.',
      example: 'A facility where lower failure risk and faster service protect operations can justify premium equipment.',
      terms: ['Reliability', 'Service response'],
      refs: [
        [2, 'A critical facility can justify premium equipment when lower failure risk and faster service protect operations.'],
        [2, 'utility, industrial, commercial and infrastructure procurement based on losses, uptime, safety, service life, maintenance and support'],
      ],
    },
    {
      id: 'me51-connected-breaker-value',
      ch: 3,
      front: 'When does a connected breaker or relay create value?',
      back: 'When alerts are understandable, interfaces are dependable and action is clear.',
      explanation: 'Customer experience now includes connectivity, manageability and integration across the installed system.',
      example: 'A supplier prioritizes open documentation, practical integration, cybersecurity and technician skills.',
      terms: ['Remote monitoring', 'Usability'],
      refs: [
        [3, 'A connected breaker or relay creates value when alerts are understandable, interfaces are dependable and action is clear.'],
        [3, 'Customer experience now includes connectivity, manageability and integration across the installed system.'],
        [3, 'Prioritize open documentation, practical integration, cybersecurity, technician skills and maintainable architectures.'],
      ],
    },
  ],
});

const ME_M05_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m5-technology-and-innovation-trends',
  title: 'Electrical Equipment Manufacturing: Technology & Innovation Trends',
  description: 'When maintenance models are usable, what power quality describes and what a battery system needs.',
  lessonId: 'me-m5-l2',
  lessonTitle: 'Technology & Innovation Trends',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m5-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Smart Equipment, Monitoring and Automation Developing?', sourceTitle: 'How Are Smart Equipment, Monitoring and Automation Developing?', citations: [] },
    { title: 'How Are Power Electronics, Storage and Advanced Materials Evolving?', sourceTitle: 'How Are Power Electronics, Storage and Advanced Materials Evolving?', citations: [] },
    { title: 'How Can AI and Digital Twins Improve Manufacturing and Service?', sourceTitle: 'How Can AI and Digital Twins Improve Manufacturing and Service?', citations: [] },
  ],
  cards: [
    {
      id: 'me52-maintenance-model-validation',
      ch: 1,
      front: 'When can a maintenance model prioritize a transformer?',
      back: 'Only after data quality, thresholds and technician validation are established.',
      explanation: 'Digital intelligence should complement proven engineering, safety controls and accountable operations.',
      example: 'A team pilots a defined use case with baselines, secure interfaces and human review.',
      terms: ['Condition monitoring', 'AI diagnostics'],
      refs: [
        [1, 'A maintenance model can prioritize a transformer only after data quality, thresholds and technician validation are established.'],
        [1, 'Digital intelligence should complement proven engineering, safety controls and accountable operations.'],
        [1, 'Pilot defined use cases with baselines, secure interfaces, human review, skills and scale economics.'],
      ],
    },
    {
      id: 'me52-power-quality-definition',
      ch: 2,
      front: 'What does power quality describe?',
      back: 'Characteristics such as voltage, frequency and waveform that affect electrical-system performance.',
      explanation: 'Power electronics turns equipment from passive distribution toward active conversion and flexibility.',
      example: 'Semiconductor converters, digital controls, protection and thermal systems serve renewables, batteries, EVs, industrial drives and data centers.',
      terms: ['Power quality', 'Power electronics'],
      refs: [
        [2, 'Characteristics such as voltage, frequency and waveform that affect electrical-system performance.'],
        [2, 'Power electronics turns equipment from passive distribution toward active conversion and flexibility.'],
        [2, 'semiconductor converters, digital controls, protection and thermal systems across renewables, batteries, EVs, industrial drives and data centers'],
      ],
    },
    {
      id: 'me52-battery-system-needs',
      ch: 3,
      front: 'What does a battery system need besides cells?',
      back: 'Conversion, protection, monitoring, cooling, controls and grid integration.',
      explanation: 'PDP8 storage ambition creates potential for equipment, integration and service while project delivery remains uncertain.',
      example: 'A storage project is more than cells: it needs conversion, protection, cooling and controls to connect to the grid.',
      terms: ['Storage interfaces', 'Thermal design'],
      refs: [
        [3, 'A battery system needs conversion, protection, monitoring, cooling, controls and grid integration\u2014not cells alone.'],
        [3, 'PDP8 storage ambition creates potential for equipment, integration and service while project delivery remains uncertain.'],
      ],
    },
  ],
});

const ME_M05_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m5-market-and-channel-trends',
  title: 'Electrical Equipment Manufacturing: Market & Channel Trends',
  description: 'What constrains grid modernization, how grid figures are read and what a customer portal connects.',
  lessonId: 'me-m5-l3',
  lessonTitle: 'Market & Channel Trends',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m5-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Grid Investment and Electrification Shaping Demand?', sourceTitle: 'How Are Grid Investment and Electrification Shaping Demand?', citations: [] },
    { title: 'How Are Localization and Manufacturing Diversification Evolving?', sourceTitle: 'How Are Localization and Manufacturing Diversification Evolving?', citations: [] },
    { title: 'How Are Project, Digital and Service-Led Channels Developing?', sourceTitle: 'How Are Project, Digital and Service-Led Channels Developing?', citations: [] },
  ],
  cards: [
    {
      id: 'me53-grid-modernization-constraints',
      ch: 1,
      front: 'What constrains grid modernization as a structural opportunity?',
      back: 'Permitting, supply chains, skills and long lead times.',
      explanation: 'Transformers, cables, switchgear, substations, controls and power-quality equipment are needed for rising demand and queued generation, storage and large loads.',
      example: 'A supplier aligns capacity with funded projects, procurement timing, technical requirements and regional service.',
      terms: ['Grid modernization', 'Lead time'],
      refs: [
        [1, 'Grid modernization is a structural opportunity constrained by permitting, supply chains, skills and long lead times.'],
        [1, 'transformers, cables, switchgear, substations, controls and power-quality equipment needed for rising demand and queued generation, storage and large loads'],
        [1, 'Align capacity with funded projects, procurement timing, technical requirements and regional service'],
      ],
    },
    {
      id: 'me53-grid-figures-not-revenue',
      ch: 2,
      front: 'How should the grid-investment and connection-queue figures be read?',
      back: 'As global system context: investment is not equipment revenue, the required increase is a forward-looking requirement rather than confirmed spending, and the queue is an indicative backlog, not completed capacity.',
      explanation: 'The figures describe the grid system worldwide, not the revenue of equipment suppliers.',
      example: 'A supplier treats the queue as an indicative backlog and not as completed capacity.',
      terms: ['Grid investment', 'Queue backlog'],
      refs: [
        [2, 'Global system investment context\u2014not equipment revenue.'],
        [2, 'Forward-looking investment requirement, not confirmed spending.'],
        [2, 'Renewables, storage and large loads worldwide; indicative backlog, not completed capacity.'],
      ],
    },
    {
      id: 'me53-customer-portal',
      ch: 3,
      front: 'What can a customer portal connect in a hybrid digital and service-led commercial model?',
      back: 'Product selection, certificates, installed assets, warranties, parts and service history.',
      explanation: 'The commercial model is becoming hybrid: digital convenience plus technical sales, integration and lifecycle service.',
      example: 'A supplier integrates accurate technical data with distributor inventory, EPC relationships, local technicians and accountable fulfillment.',
      terms: ['Customer portal', 'Asset records'],
      refs: [
        [3, 'A customer portal can connect product selection, certificates, installed assets, warranties, parts and service history.'],
        [3, 'The commercial model is becoming hybrid: digital convenience plus technical sales, integration and lifecycle service.'],
        [3, 'Integrate accurate technical data with distributor inventory, EPC relationships, local technicians and accountable fulfillment.'],
      ],
    },
  ],
});

const ME_M05_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m5-regulatory-and-sustainability-trends',
  title: 'Electrical Equipment Manufacturing: Regulatory & Sustainability Trends',
  description: 'What the EU ESPR provides and which lifecycle evidence suppliers should develop.',
  lessonId: 'me-m5-l4',
  lessonTitle: 'Regulatory & Sustainability Trends',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m5-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
    'Chapter 1 is held for review and has no cards.',
  ],
  chapters: [
    { title: 'How Do Electrical Safety and Product Standards Affect Manufacturers?', sourceTitle: 'How Do Electrical Safety and Product Standards Affect Manufacturers?', citations: [] },
    { title: 'How Are Energy Efficiency and Sustainable Manufacturing Evolving?', sourceTitle: 'How Are Energy Efficiency and Sustainable Manufacturing Evolving?', citations: [] },
    { title: 'How Are Circularity, Cybersecurity and Lifecycle Requirements Changing?', sourceTitle: 'How Are Circularity, Cybersecurity and Lifecycle Requirements Changing?', citations: [] },
  ],
  cards: [
    {
      id: 'me54-espr-framework',
      ch: 2,
      front: 'What does the EU ESPR provide, and what does it not impose?',
      back: 'A framework for future product-specific rules and digital passports, not identical duties for every electrical product.',
      explanation: 'Efficiency and lifecycle design can lower customer cost while supporting credible sustainability requirements.',
      example: 'A manufacturer checks which duties apply to its own product instead of assuming the same duties for every electrical product.',
      terms: ['ESPR', 'Digital product passport'],
      refs: [
        [2, 'The EU ESPR provides a framework for future product-specific rules and digital passports, not identical duties for every electrical product.'],
        [2, 'Efficiency and lifecycle design can lower customer cost while supporting credible sustainability requirements.'],
      ],
    },
    {
      id: 'me54-lifecycle-evidence',
      ch: 3,
      front: 'What evidence should suppliers develop on losses, materials and end-of-life while checking destination requirements?',
      back: 'Evidence for losses, materials, maintenance, repair and end-of-life, while checking applicable destination requirements.',
      explanation: 'Loss reduction, material use, durability, repairability, upgrades, recovery and environmental information run across the product lifecycle.',
      example: 'A supplier gathers data on losses and materials and records on maintenance and repair for its products.',
      terms: ['Circularity', 'Product information'],
      refs: [
        [3, 'Develop evidence for losses, materials, maintenance, repair and end-of-life while checking applicable destination requirements.'],
        [3, 'loss reduction, material use, durability, repairability, upgrades, recovery and environmental information across the product lifecycle'],
      ],
    },
  ],
});

const ME_M05_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m5-growth-outlook-and-strategic-opportunities',
  title: 'Electrical Equipment Manufacturing: Growth Outlook & Strategic Opportunities',
  description: 'How demand forecasts differ from equipment sales and how local firms can progress.',
  lessonId: 'me-m5-l5',
  lessonTitle: 'Growth Outlook & Strategic Opportunities',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m5-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'What Factors Will Drive Future Equipment Demand?', sourceTitle: 'What Factors Will Drive Future Equipment Demand?', citations: [] },
    { title: 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', sourceTitle: 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', citations: [] },
    { title: 'How Should Electrical Equipment Manufacturers Position Themselves?', sourceTitle: 'How Should Electrical Equipment Manufacturers Position Themselves?', citations: [] },
  ],
  cards: [
    {
      id: 'me55-demand-backdrop-not-forecast',
      ch: 1,
      front: 'How should an electricity-demand growth forecast be read against equipment sales?',
      back: 'As a demand backdrop, not an electrical-equipment sales forecast.',
      explanation: 'Long-term growth is supported by electrification, but each equipment segment follows different investment and replacement cycles.',
      example: 'Growth in electricity consumption is not category revenue.',
      terms: ['Demand backdrop', 'Equipment sales'],
      refs: [
        [1, 'is a demand backdrop, not a 3.6% electrical-equipment sales forecast.'],
        [1, 'Electricity consumption\u2014not category revenue.'],
        [1, 'Long-term growth is supported by electrification, but each equipment segment follows different investment and replacement cycles.'],
      ],
    },
    {
      id: 'me55-local-firm-progression',
      ch: 2,
      front: 'How can a local firm progress beyond distribution?',
      back: 'To panel engineering, factory testing, commissioning, remote support and qualified component production.',
      explanation: 'Vietnam can connect domestic demand with gradual capability upgrading and regional supply-chain participation.',
      example: 'Opportunities span cables, components, panels, enclosures, selected equipment, grid and storage integration, power management, commissioning, maintenance and retrofit.',
      terms: ['Supplier upgrading', 'Local manufacturing'],
      refs: [
        [2, 'A local firm can progress from distribution to panel engineering, factory testing, commissioning, remote support and qualified component production.'],
        [2, 'Vietnam can connect domestic demand with gradual capability upgrading and regional supply-chain participation.'],
      ],
    },
    {
      id: 'me55-targets-no-guarantee',
      ch: 3,
      front: 'What should customer-backed milestones cover, and what do PDP8 targets not guarantee?',
      back: 'Quality, testing, certification, engineering, cash, talent and partnerships. PDP8 targets do not guarantee orders.',
      explanation: 'Vietnam can connect domestic demand with gradual capability upgrading and regional supply-chain participation.',
      example: 'A manufacturer tracks milestones for quality, testing and engineering rather than treating a PDP8 target as an order.',
      terms: ['PDP8', 'Customer-backed milestones'],
      refs: [
        [3, 'Use customer-backed milestones for quality, testing, certification, engineering, cash, talent and partnerships; PDP8 targets do not guarantee orders.'],
      ],
    },
  ],
});

export const MFG_ELECTRICAL_M05_DECKS: FlashcardDeckContent[] = [ME_M05_L1_DECK, ME_M05_L2_DECK, ME_M05_L3_DECK, ME_M05_L4_DECK, ME_M05_L5_DECK];
