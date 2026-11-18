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

/** Removed or superseded cards (2026-11-08 integrity pass). Their review history is left untouched and the IDs are never reused. */
export const RETIRED_CARD_IDS: string[] = ['cff-credit-risk', 'cb24-digital-journey-measures', 'cb42-market-position-test-steps'];
