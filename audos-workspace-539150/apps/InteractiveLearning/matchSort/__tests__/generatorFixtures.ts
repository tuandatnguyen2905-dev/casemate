import type { ChapterLike } from '../../../IndustryKnowledge/lessonFlowCore';

// Made-up chapters shaped like the reader's decks (no live curriculum), so the generator tests are self-contained.

export type FixtureChapter = ChapterLike & { keyTerms?: Array<{ term: string; definition: string }>; [field: string]: unknown };

export const RICH_TERMS_CHAPTER = {
  title: '01 How Cold Chains Protect Chilled Food',
  keyInsight: 'A cold chain only protects quality when every handover keeps the product inside its temperature band.',
  objective: 'Explain how cold chains protect chilled food.',
  keyTerms: [
    { term: 'Cold chain', definition: 'The temperature-controlled sequence of storage and transport that keeps chilled goods safe.' },
    { term: 'Temperature excursion', definition: 'Any period when a product leaves its required temperature band.' },
    { term: 'Reefer container', definition: 'A refrigerated shipping container with its own cooling unit.' },
    { term: 'Shelf life', definition: 'How long a product stays safe and saleable under stated storage conditions.' },
    { term: 'Cross-docking', definition: 'Moving goods straight from inbound to outbound vehicles without putting them into storage.' },
  ],
  narrative: [
    { label: 'What it is', text: 'A cold chain links chilled storage, refrigerated transport and monitored handovers from producer to shelf.' },
    { label: 'Why it is happening', text: 'Modern retail and longer supply routes increase the distance chilled food travels before it is sold.' },
    { label: 'How it works', text: 'Sensors record temperature at each stage, and handover checks decide whether a batch can move on.' },
    { label: 'Real-world example', text: 'A dairy distributor rejects a pallet after its logger shows the truck warmed during a long unloading delay.' },
    { label: 'Business impact', text: 'Broken cold chains raise waste, trigger recalls and weaken the trust retailers place in a supplier.' },
  ],
  recap: ['Every handover is a risk point.', 'Data loggers turn temperature into evidence.'],
} as FixtureChapter;

export const TEMPLATE_CHAPTER = {
  title: '02 Why Do Cold Chain Regulations Matter?',
  keyInsight: 'This chapter focuses specifically on Regulation, Audits, Labels.',
  keyTerms: [
    { term: 'Regulation', definition: 'A core Cold Chain Logistics concept related to regulation.' },
    { term: 'Audits', definition: 'A core Cold Chain Logistics concept related to audits.' },
    { term: 'Labels', definition: 'A key operating concept.' },
  ],
  narrative: [
    { label: 'What it is', text: 'Why Do Cold Chain Regulations Matter? examines Regulation, Audits, Labels.' },
    { label: 'Why it is happening', text: 'Trade flows, capacity, regulation and customer expectations are increasing the importance of this topic.' },
    { label: 'Vietnam example', text: 'Define the regulator, scope and evidence before acting.' },
    { label: 'Business impact', text: 'For decision-makers, regulation matters. Define scope before acting.' },
  ],
  recap: ['Key dimensions include Regulation, Audits, Labels.'],
} as FixtureChapter;

export const GROUPS_CHAPTER = {
  title: '03 Strengths and Weaknesses of Local Processors',
  keyInsight: 'Local processors win on proximity and lose on scale, so their strategy must protect the first and offset the second.',
  concepts: [
    { title: 'Key strengths', summary: 'Advantages local processors hold over importers.', points: ['Fresh supply: Milk reaches the plant within hours of collection.', 'Brand familiarity: Shoppers have bought the brand for decades of family meals.', 'Route reach: Distributors already serve small grocery stores nationwide.'] },
    { title: 'Key weaknesses', summary: 'Constraints that limit local processors against global rivals.', points: ['Small herds: Farms supply too little milk for continuous plant use.', 'Imported inputs: Feed and powder are bought abroad at volatile prices.', 'Thin research budgets: Product development lags behind multinational rivals.'] },
  ],
  narrative: [{ label: 'What it is', text: 'Local processors combine farm sourcing, processing plants and national distribution under one brand.' }],
} as FixtureChapter;

export const AMBIGUOUS_GROUPS_CHAPTER = {
  title: '04 Opportunities and Threats',
  concepts: [
    { title: 'Opportunities', summary: 'Openings in the market.', points: ['Premium yogurt: Urban shoppers trade up to higher-margin cups.', 'Price competition: Rivals cut prices in modern trade.'] },
    { title: 'Threats', summary: 'Pressures on margins.', points: ['Price competition: Rivals cut prices in modern trade.', 'Input inflation: Feed costs rise faster than shelf prices.'] },
  ],
} as FixtureChapter;

export const CHAIN_CHAPTER = {
  title: '05 How Goods Move From Farm to Shelf',
  keyInsight: 'Each stage of the chain depends on the one before it, so a delay early on reaches every later stage.',
  narrative: [
    { label: 'What it is', text: 'The farm-to-shelf chain moves milk through collection, processing and distribution in a fixed order.' },
    { label: 'How it works', text: 'Goods flow: Raw milk \u2192 Collection centres \u2192 Processing plants \u2192 Distribution centres \u2192 Retail outlets. Payments run in the opposite direction.' },
  ],
} as FixtureChapter;

export const PARTICIPANTS_CHAPTER = {
  title: '06 Who Participates in the Market?',
  keyInsight: 'Participants specialise, and control of distribution decides who captures value.',
  narrative: [
    { label: 'What it is', text: 'Farmers, processors, distributors, retailers and regulators each play a separate role in the market.' },
    { label: 'Real-world example', text: 'A processor may own farms while a retailer launches its own private-label milk.' },
  ],
} as FixtureChapter;

export const HELD_CHAPTER = { ...RICH_TERMS_CHAPTER, title: '07 Chilled Food Market Size', reviewStatus: 'Under Review' } as FixtureChapter;

/** A banking chapter used to prove nothing crosses into another curriculum. */
export const BANKING_CHAPTER = {
  title: '01 How Banks Fund Their Lending',
  keyInsight: 'A bank lends against funding it must keep stable, so deposit mix shapes how much it can safely lend.',
  keyTerms: [
    { term: 'Current account deposit', definition: 'Customer money held for payments that the bank pays little or no interest on.' },
    { term: 'Term deposit', definition: 'Customer money locked for an agreed period in exchange for a fixed interest rate.' },
    { term: 'Interbank borrowing', definition: 'Short-term funding a bank raises from other banks.' },
    { term: 'Loan-to-deposit ratio', definition: 'Outstanding loans divided by customer deposits, a test of funding pressure.' },
  ],
  narrative: [{ label: 'What it is', text: 'Banks fund loans mainly with customer deposits, topped up by borrowing from other banks and debt markets.' }],
} as FixtureChapter;

export const COLD_CHAIN_IDENTITY = 'logistics-coldchain::How the Industry Works::Cold Chain Basics';
export const BANKING_IDENTITY = 'banking-demo::How Banks Work::Funding';
