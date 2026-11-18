// Pinned card IDs for every expansion deck, in registry order (see ../decks/expansion.ts).
// Add each new module's pin file here, in the same position as its decks in the registry.

import { CB_M01_CARD_IDS } from './expansionPinsCbM01';
import { CB_M02_CARD_IDS } from './expansionPinsCbM02';
import { CB_M03_CARD_IDS } from './expansionPinsCbM03';
import { CB_M04_CARD_IDS } from './expansionPinsCbM04';
import { CB_M05_CARD_IDS } from './expansionPinsCbM05';
import { CF_M01_CARD_IDS } from './expansionPinsCfM01';
import { CF_M02_TO_M05_CARD_IDS } from './expansionPinsCfM02toM05';
import { MFG_BUILDING_CARD_IDS } from './expansionPinsMfgBuilding';
import { MFG_PACKAGING_CARD_IDS } from './expansionPinsMfgPackaging';
import { MFG_ELECTRICAL_CARD_IDS } from './expansionPinsMfgElectrical';
import { HEALTHCARE_PRODUCTS_CARD_IDS } from './expansionPinsHealthcareProducts';
import { PROFESSIONAL_AUDIT_CARD_IDS } from './expansionPinsProfessionalAudit';
import { LOGISTICS_CONTRACT_CARD_IDS } from './expansionPinsLogisticsContract';
import { LOGISTICS_EXPRESS_CARD_IDS } from './expansionPinsLogisticsExpress';

export const EXPANSION_CARD_IDS: Record<string, string[]> = {
  ...CB_M01_CARD_IDS,
  ...CB_M02_CARD_IDS,
  ...CB_M03_CARD_IDS,
  ...CB_M04_CARD_IDS,
  ...CB_M05_CARD_IDS,
  ...CF_M01_CARD_IDS,
  ...CF_M02_TO_M05_CARD_IDS,
  ...MFG_BUILDING_CARD_IDS,
  ...MFG_PACKAGING_CARD_IDS,
  ...MFG_ELECTRICAL_CARD_IDS,
  ...HEALTHCARE_PRODUCTS_CARD_IDS,
  ...PROFESSIONAL_AUDIT_CARD_IDS,
  ...LOGISTICS_CONTRACT_CARD_IDS,
  ...LOGISTICS_EXPRESS_CARD_IDS,
};

/** Removed or superseded cards (2026-11-08 integrity pass; 2026-11-18 AUD-11 chapter rewrite). Their review history is left untouched and the IDs are never reused. */
export const RETIRED_CARD_IDS: string[] = [
  'cff-credit-risk', 'cb24-digital-journey-measures', 'cb42-market-position-test-steps',
  // Audit & Assurance: the chapter each card was grounded in was rewritten (AUD-11), so its excerpt is no longer displayed.
  'pa32-fixed-fee-uneconomic', 'pa33-leverage-matches-complexity', 'pa33-automation-and-judgment',
  'pa35-specialization-and-diversification', 'pa35-different-sector-capabilities', 'pa36-international-code-not-override',
  'pa42-quality-standards-emphasis', 'pa42-reputation-sustained-by-evidence', 'pa42-assess-firm-beyond-prestige',
  'pa44-parallel-deadlines', 'pa44-compete-only-where-fit',
  'pa51-future-capability-mix', 'pa51-professional-skepticism-meaning', 'pa52-cyber-assurance-limits',
  'pa53-isa-600-strengthens', 'pa53-align-local-and-group', 'pa54-verify-before-promising-sustainability',
  // Healthcare Products Module 3: same reason.
  'hp32-scale-lowers-cost-only-when', 'hp32-who-gmp-connected-controls', 'hp32-evaluate-contract-manufacturer',
  'hp33-distribution-access-and-intelligence', 'hp33-sell-through-versus-shipments', 'hp33-distributor-contracts-define',
  'hp35-net-sales-reconciled-with-costs',
  'hp36-defensible-advantage', 'hp36-barriers-differ-by-category', 'hp36-select-model-after-testing',
];
