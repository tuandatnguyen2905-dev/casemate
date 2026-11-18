// Registry of the lesson decks added by the practice-content expansion, in curriculum order.
// The two original decks (Commercial Banking 1.1, Consumer Finance Lesson 1) stay in index.ts and
// are never edited here. Add new deck files to EXPANSION_DECKS; nothing else needs to change.

import type { FlashcardDeckContent } from '../models';
import { COMMERCIAL_BANKING_M01B1_DECKS } from './commercialBankingM01B1';
import { COMMERCIAL_BANKING_M01B2_DECKS } from './commercialBankingM01B2';
import { COMMERCIAL_BANKING_M01B3_DECKS } from './commercialBankingM01B3';
import { COMMERCIAL_BANKING_M02B4_DECKS } from './commercialBankingM02B4';
import { COMMERCIAL_BANKING_M02B5_DECKS } from './commercialBankingM02B5';
import { COMMERCIAL_BANKING_M03B01_DECKS } from './commercialBankingM03B01';
import { COMMERCIAL_BANKING_M03B02_DECKS } from './commercialBankingM03B02';
import { COMMERCIAL_BANKING_M04B03_DECKS } from './commercialBankingM04B03';
import { COMMERCIAL_BANKING_M04B03L43_DECKS } from './commercialBankingM04B03L43';
import { COMMERCIAL_BANKING_M04B04_DECKS } from './commercialBankingM04B04';
import { COMMERCIAL_BANKING_M05B01_DECKS } from './commercialBankingM05B01';
import { COMMERCIAL_BANKING_M05B02_DECKS } from './commercialBankingM05B02';
import { COMMERCIAL_BANKING_M05B03_DECKS } from './commercialBankingM05B03';
import { CONSUMER_FINANCE_M01_DECKS } from './consumerFinanceM01';
import { CONSUMER_FINANCE_M02_DECKS } from './consumerFinanceM02';
import { CONSUMER_FINANCE_M03_DECKS } from './consumerFinanceM03';
import { CONSUMER_FINANCE_M04_DECKS } from './consumerFinanceM04';
import { CONSUMER_FINANCE_M05_DECKS } from './consumerFinanceM05';
import { MFG_BUILDING_M01_DECKS } from './mfgBuildingM01';
import { MFG_BUILDING_M02_DECKS } from './mfgBuildingM02';
import { MFG_BUILDING_M03_DECKS } from './mfgBuildingM03';
import { MFG_BUILDING_M04_DECKS } from './mfgBuildingM04';
import { MFG_BUILDING_M05_DECKS } from './mfgBuildingM05';
import { MFG_PACKAGING_M01_DECKS } from './mfgPackagingM01';
import { MFG_PACKAGING_M02_DECKS } from './mfgPackagingM02';
import { MFG_PACKAGING_M03_DECKS } from './mfgPackagingM03';
import { MFG_PACKAGING_M04_DECKS } from './mfgPackagingM04';
import { MFG_PACKAGING_M05_DECKS } from './mfgPackagingM05';
import { MFG_ELECTRICAL_M01_DECKS } from './mfgElectricalM01';
import { MFG_ELECTRICAL_M02_DECKS } from './mfgElectricalM02';
import { MFG_ELECTRICAL_M03_DECKS } from './mfgElectricalM03';
import { MFG_ELECTRICAL_M04_DECKS } from './mfgElectricalM04';
import { MFG_ELECTRICAL_M05_DECKS } from './mfgElectricalM05';
import { HEALTHCARE_PRODUCTS_M01_DECKS } from './healthcareProductsM01';
import { HEALTHCARE_PRODUCTS_M02_DECKS } from './healthcareProductsM02';
import { HEALTHCARE_PRODUCTS_M03_DECKS } from './healthcareProductsM03';
import { HEALTHCARE_PRODUCTS_M04_DECKS } from './healthcareProductsM04';
import { HEALTHCARE_PRODUCTS_M05_DECKS } from './healthcareProductsM05';
import { PROFESSIONAL_AUDIT_M01_DECKS } from './professionalAuditM01';
import { PROFESSIONAL_AUDIT_M02_DECKS } from './professionalAuditM02';
import { PROFESSIONAL_AUDIT_M03_DECKS } from './professionalAuditM03';
import { PROFESSIONAL_AUDIT_M04_DECKS } from './professionalAuditM04';
import { PROFESSIONAL_AUDIT_M05_DECKS } from './professionalAuditM05';
import { LOGISTICS_CONTRACT_M01_DECKS } from './logisticsContractM01';
import { LOGISTICS_CONTRACT_M02_DECKS } from './logisticsContractM02';
import { LOGISTICS_CONTRACT_M03_DECKS } from './logisticsContractM03';
import { LOGISTICS_CONTRACT_M04_DECKS } from './logisticsContractM04';
import { LOGISTICS_CONTRACT_M05_DECKS } from './logisticsContractM05';
import { LOGISTICS_EXPRESS_M01_DECKS } from './logisticsExpressM01';
import { LOGISTICS_EXPRESS_M02_DECKS } from './logisticsExpressM02';
import { LOGISTICS_EXPRESS_M03_DECKS } from './logisticsExpressM03';
import { LOGISTICS_EXPRESS_M04_DECKS } from './logisticsExpressM04';
import { LOGISTICS_EXPRESS_M05_DECKS } from './logisticsExpressM05';
import { FMCG_EXPANSION_DECKS } from './fmcgExpansion';

// Commercial Banking lesson 5.4 is under review (REV-P0-12) and intentionally has no deck.
// The seven generated-curriculum sub-industries below have one authored deck per lesson (verified against the rendered chapter text).
// A curriculum with authored decks no longer gets runtime chapter cards (practiceReview/flashcardScopes.ts). Held chapters have no cards.
export const EXPANSION_DECKS: FlashcardDeckContent[] = [
  ...COMMERCIAL_BANKING_M01B1_DECKS,
  ...COMMERCIAL_BANKING_M01B2_DECKS,
  ...COMMERCIAL_BANKING_M01B3_DECKS,
  ...COMMERCIAL_BANKING_M02B4_DECKS,
  ...COMMERCIAL_BANKING_M02B5_DECKS,
  ...COMMERCIAL_BANKING_M03B01_DECKS,
  ...COMMERCIAL_BANKING_M03B02_DECKS,
  ...COMMERCIAL_BANKING_M04B03_DECKS,
  ...COMMERCIAL_BANKING_M04B03L43_DECKS,
  ...COMMERCIAL_BANKING_M04B04_DECKS,
  ...COMMERCIAL_BANKING_M05B01_DECKS,
  ...COMMERCIAL_BANKING_M05B02_DECKS,
  ...COMMERCIAL_BANKING_M05B03_DECKS,
  ...CONSUMER_FINANCE_M01_DECKS,
  ...CONSUMER_FINANCE_M02_DECKS,
  ...CONSUMER_FINANCE_M03_DECKS,
  ...CONSUMER_FINANCE_M04_DECKS,
  ...CONSUMER_FINANCE_M05_DECKS,
  ...MFG_BUILDING_M01_DECKS,
  ...MFG_BUILDING_M02_DECKS,
  ...MFG_BUILDING_M03_DECKS,
  ...MFG_BUILDING_M04_DECKS,
  ...MFG_BUILDING_M05_DECKS,
  ...MFG_PACKAGING_M01_DECKS,
  ...MFG_PACKAGING_M02_DECKS,
  ...MFG_PACKAGING_M03_DECKS,
  ...MFG_PACKAGING_M04_DECKS,
  ...MFG_PACKAGING_M05_DECKS,
  ...MFG_ELECTRICAL_M01_DECKS,
  ...MFG_ELECTRICAL_M02_DECKS,
  ...MFG_ELECTRICAL_M03_DECKS,
  ...MFG_ELECTRICAL_M04_DECKS,
  ...MFG_ELECTRICAL_M05_DECKS,
  ...HEALTHCARE_PRODUCTS_M01_DECKS,
  ...HEALTHCARE_PRODUCTS_M02_DECKS,
  ...HEALTHCARE_PRODUCTS_M03_DECKS,
  ...HEALTHCARE_PRODUCTS_M04_DECKS,
  ...HEALTHCARE_PRODUCTS_M05_DECKS,
  ...PROFESSIONAL_AUDIT_M01_DECKS,
  ...PROFESSIONAL_AUDIT_M02_DECKS,
  ...PROFESSIONAL_AUDIT_M03_DECKS,
  ...PROFESSIONAL_AUDIT_M04_DECKS,
  ...PROFESSIONAL_AUDIT_M05_DECKS,
  ...LOGISTICS_CONTRACT_M01_DECKS,
  ...LOGISTICS_CONTRACT_M02_DECKS,
  ...LOGISTICS_CONTRACT_M03_DECKS,
  ...LOGISTICS_CONTRACT_M04_DECKS,
  ...LOGISTICS_CONTRACT_M05_DECKS,
  ...LOGISTICS_EXPRESS_M01_DECKS,
  ...LOGISTICS_EXPRESS_M02_DECKS,
  ...LOGISTICS_EXPRESS_M03_DECKS,
  ...LOGISTICS_EXPRESS_M04_DECKS,
  ...LOGISTICS_EXPRESS_M05_DECKS,
  ...FMCG_EXPANSION_DECKS,
];
