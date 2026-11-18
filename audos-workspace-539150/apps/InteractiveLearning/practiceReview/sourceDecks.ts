import { COMMERCIAL_BANKING_MODULE01_DECKS, COMMERCIAL_BANKING_MODULE01_QUIZZES, COMMERCIAL_BANKING_MODULE01_TAKEAWAYS } from '../../IndustryKnowledge/commercialBankingM01';
import { COMMERCIAL_BANKING_MODULE02_DECKS, COMMERCIAL_BANKING_MODULE02_QUIZZES, COMMERCIAL_BANKING_MODULE02_TAKEAWAYS } from '../../IndustryKnowledge/commercialBankingM02';
import { COMMERCIAL_BANKING_MODULE03_DECKS, COMMERCIAL_BANKING_MODULE03_QUIZZES, COMMERCIAL_BANKING_MODULE03_TAKEAWAYS } from '../../IndustryKnowledge/commercialBankingM03';
import { COMMERCIAL_BANKING_MODULE04_DECKS, COMMERCIAL_BANKING_MODULE04_QUIZZES, COMMERCIAL_BANKING_MODULE04_TAKEAWAYS } from '../../IndustryKnowledge/commercialBankingM04';
import { COMMERCIAL_BANKING_MODULE05_DECKS, COMMERCIAL_BANKING_MODULE05_QUIZZES, COMMERCIAL_BANKING_MODULE05_TAKEAWAYS } from '../../IndustryKnowledge/commercialBankingM05';
import { CONSUMER_FINANCE_MODULE01_DECKS, CONSUMER_FINANCE_MODULE01_QUIZZES, CONSUMER_FINANCE_MODULE01_TAKEAWAYS } from '../../IndustryKnowledge/consumerFinanceModule01';
import { CONSUMER_FINANCE_MODULE02_DECKS, CONSUMER_FINANCE_MODULE02_QUIZZES, CONSUMER_FINANCE_MODULE02_TAKEAWAYS } from '../../IndustryKnowledge/consumerFinanceModule02';
import { CONSUMER_FINANCE_MODULE03_DECKS, CONSUMER_FINANCE_MODULE03_QUIZZES, CONSUMER_FINANCE_MODULE03_TAKEAWAYS } from '../../IndustryKnowledge/consumerFinanceModule03';
import { CONSUMER_FINANCE_MODULE04_DECKS, CONSUMER_FINANCE_MODULE04_QUIZZES, CONSUMER_FINANCE_MODULE04_TAKEAWAYS } from '../../IndustryKnowledge/consumerFinanceModule04';
import { CONSUMER_FINANCE_MODULE05_DECKS, CONSUMER_FINANCE_MODULE05_QUIZZES, CONSUMER_FINANCE_MODULE05_TAKEAWAYS } from '../../IndustryKnowledge/consumerFinanceModule05';
import { applyReviewHolds } from '../../IndustryKnowledge/reviewHolds';
import { FMCG_EXPANSION_MODULES } from '../../IndustryKnowledge/fmcgExpansionRegistry';
import * as MFG_BUILDING_M1 from '../../IndustryKnowledge/mfgBuildingModule01';
import * as MFG_BUILDING_M2 from '../../IndustryKnowledge/mfgBuildingModule02';
import * as MFG_BUILDING_M3 from '../../IndustryKnowledge/mfgBuildingModule03';
import * as MFG_BUILDING_M4 from '../../IndustryKnowledge/mfgBuildingModule04';
import * as MFG_BUILDING_M5 from '../../IndustryKnowledge/mfgBuildingModule05';
import * as MFG_PACKAGING_M1 from '../../IndustryKnowledge/mfgPackagingModule01';
import * as MFG_PACKAGING_M2 from '../../IndustryKnowledge/mfgPackagingModule02';
import * as MFG_PACKAGING_M3 from '../../IndustryKnowledge/mfgPackagingModule03';
import * as MFG_PACKAGING_M4 from '../../IndustryKnowledge/mfgPackagingModule04';
import * as MFG_PACKAGING_M5 from '../../IndustryKnowledge/mfgPackagingModule05';
import * as MFG_ELECTRICAL_M1 from '../../IndustryKnowledge/mfgElectricalModule01';
import * as MFG_ELECTRICAL_M2 from '../../IndustryKnowledge/mfgElectricalModule02';
import * as MFG_ELECTRICAL_M3 from '../../IndustryKnowledge/mfgElectricalModule03';
import * as MFG_ELECTRICAL_M4 from '../../IndustryKnowledge/mfgElectricalModule04';
import * as MFG_ELECTRICAL_M5 from '../../IndustryKnowledge/mfgElectricalModule05';
import * as HEALTHCARE_PRODUCTS_M1 from '../../IndustryKnowledge/healthcareProductsModule01';
import * as HEALTHCARE_PRODUCTS_M2 from '../../IndustryKnowledge/healthcareProductsModule02';
import * as HEALTHCARE_PRODUCTS_M3 from '../../IndustryKnowledge/healthcareProductsModule03';
import * as HEALTHCARE_PRODUCTS_M4 from '../../IndustryKnowledge/healthcareProductsModule04';
import * as HEALTHCARE_PRODUCTS_M5 from '../../IndustryKnowledge/healthcareProductsModule05';
import * as PROFESSIONAL_AUDIT_M1 from '../../IndustryKnowledge/auditAssuranceModule01';
import * as PROFESSIONAL_AUDIT_M2 from '../../IndustryKnowledge/auditAssuranceModule02';
import * as PROFESSIONAL_AUDIT_M3 from '../../IndustryKnowledge/auditAssuranceModule03';
import * as PROFESSIONAL_AUDIT_M4 from '../../IndustryKnowledge/auditAssuranceModule04';
import * as PROFESSIONAL_AUDIT_M5 from '../../IndustryKnowledge/auditAssuranceModule05';
import * as LOGISTICS_CONTRACT_M1 from '../../IndustryKnowledge/logisticsContractModule01';
import * as LOGISTICS_CONTRACT_M2 from '../../IndustryKnowledge/logisticsContractModule02';
import * as LOGISTICS_CONTRACT_M3 from '../../IndustryKnowledge/logisticsContractModule03';
import * as LOGISTICS_CONTRACT_M4 from '../../IndustryKnowledge/logisticsContractModule04';
import * as LOGISTICS_CONTRACT_M5 from '../../IndustryKnowledge/logisticsContractModule05';
import * as LOGISTICS_EXPRESS_M1 from '../../IndustryKnowledge/logisticsExpressModule01';
import * as LOGISTICS_EXPRESS_M2 from '../../IndustryKnowledge/logisticsExpressModule02';
import * as LOGISTICS_EXPRESS_M3 from '../../IndustryKnowledge/logisticsExpressModule03';
import * as LOGISTICS_EXPRESS_M4 from '../../IndustryKnowledge/logisticsExpressModule04';
import * as LOGISTICS_EXPRESS_M5 from '../../IndustryKnowledge/logisticsExpressModule05';
import type { SourceModuleKey } from '../matchSort/types';
import type { SourceDecks } from '../matchSort/validation';

export type PracticeSourceModule = [SourceModuleKey, Record<string, any[]>, Record<string, any[]>, Record<string, unknown>];

/** A generated-curriculum module file exports `<KEY>_DECKS`, `<KEY>_QUIZZES` and `<KEY>_TAKEAWAYS`. */
const rowFor = (key: string, module: Record<string, any>): PracticeSourceModule => [key as SourceModuleKey, module[`${key}_DECKS`], module[`${key}_QUIZZES`], module[`${key}_TAKEAWAYS`]];

/** Every curriculum module Practice & Review has content for. Add a module here when it gets decks or activities. */
export const PRACTICE_SOURCE_MODULES: PracticeSourceModule[] = [
  ['COMMERCIAL_BANKING_MODULE01', COMMERCIAL_BANKING_MODULE01_DECKS, COMMERCIAL_BANKING_MODULE01_QUIZZES, COMMERCIAL_BANKING_MODULE01_TAKEAWAYS],
  ['COMMERCIAL_BANKING_MODULE02', COMMERCIAL_BANKING_MODULE02_DECKS, COMMERCIAL_BANKING_MODULE02_QUIZZES, COMMERCIAL_BANKING_MODULE02_TAKEAWAYS],
  ['COMMERCIAL_BANKING_MODULE03', COMMERCIAL_BANKING_MODULE03_DECKS, COMMERCIAL_BANKING_MODULE03_QUIZZES, COMMERCIAL_BANKING_MODULE03_TAKEAWAYS],
  ['COMMERCIAL_BANKING_MODULE04', COMMERCIAL_BANKING_MODULE04_DECKS, COMMERCIAL_BANKING_MODULE04_QUIZZES, COMMERCIAL_BANKING_MODULE04_TAKEAWAYS],
  ['COMMERCIAL_BANKING_MODULE05', COMMERCIAL_BANKING_MODULE05_DECKS, COMMERCIAL_BANKING_MODULE05_QUIZZES, COMMERCIAL_BANKING_MODULE05_TAKEAWAYS],
  ['CONSUMER_FINANCE_MODULE01', CONSUMER_FINANCE_MODULE01_DECKS, CONSUMER_FINANCE_MODULE01_QUIZZES, CONSUMER_FINANCE_MODULE01_TAKEAWAYS],
  ['CONSUMER_FINANCE_MODULE02', CONSUMER_FINANCE_MODULE02_DECKS, CONSUMER_FINANCE_MODULE02_QUIZZES, CONSUMER_FINANCE_MODULE02_TAKEAWAYS],
  ['CONSUMER_FINANCE_MODULE03', CONSUMER_FINANCE_MODULE03_DECKS, CONSUMER_FINANCE_MODULE03_QUIZZES, CONSUMER_FINANCE_MODULE03_TAKEAWAYS],
  ['CONSUMER_FINANCE_MODULE04', CONSUMER_FINANCE_MODULE04_DECKS, CONSUMER_FINANCE_MODULE04_QUIZZES, CONSUMER_FINANCE_MODULE04_TAKEAWAYS],
  ['CONSUMER_FINANCE_MODULE05', CONSUMER_FINANCE_MODULE05_DECKS, CONSUMER_FINANCE_MODULE05_QUIZZES, CONSUMER_FINANCE_MODULE05_TAKEAWAYS],
  ...Object.values(FMCG_EXPANSION_MODULES).map((module): PracticeSourceModule => [module.key as SourceModuleKey, module.decks, module.quizzes, module.takeaways]),
  // Sub-industries whose flashcards are authored decks (flashcards/decks/<stem>M0N.ts): the access check needs their live, held chapters.
  ...[MFG_BUILDING_M1, MFG_BUILDING_M2, MFG_BUILDING_M3, MFG_BUILDING_M4, MFG_BUILDING_M5].map((module, index) => rowFor(`MFG_BUILDING_MODULE0${index + 1}`, module)),
  ...[MFG_PACKAGING_M1, MFG_PACKAGING_M2, MFG_PACKAGING_M3, MFG_PACKAGING_M4, MFG_PACKAGING_M5].map((module, index) => rowFor(`MFG_PACKAGING_MODULE0${index + 1}`, module)),
  ...[MFG_ELECTRICAL_M1, MFG_ELECTRICAL_M2, MFG_ELECTRICAL_M3, MFG_ELECTRICAL_M4, MFG_ELECTRICAL_M5].map((module, index) => rowFor(`MFG_ELECTRICAL_MODULE0${index + 1}`, module)),
  ...[HEALTHCARE_PRODUCTS_M1, HEALTHCARE_PRODUCTS_M2, HEALTHCARE_PRODUCTS_M3, HEALTHCARE_PRODUCTS_M4, HEALTHCARE_PRODUCTS_M5].map((module, index) => rowFor(`HEALTHCARE_PRODUCTS_MODULE0${index + 1}`, module)),
  ...[PROFESSIONAL_AUDIT_M1, PROFESSIONAL_AUDIT_M2, PROFESSIONAL_AUDIT_M3, PROFESSIONAL_AUDIT_M4, PROFESSIONAL_AUDIT_M5].map((module, index) => rowFor(`PROFESSIONAL_AUDIT_MODULE0${index + 1}`, module)),
  ...[LOGISTICS_CONTRACT_M1, LOGISTICS_CONTRACT_M2, LOGISTICS_CONTRACT_M3, LOGISTICS_CONTRACT_M4, LOGISTICS_CONTRACT_M5].map((module, index) => rowFor(`LOGISTICS_CONTRACT_MODULE0${index + 1}`, module)),
  ...[LOGISTICS_EXPRESS_M1, LOGISTICS_EXPRESS_M2, LOGISTICS_EXPRESS_M3, LOGISTICS_EXPRESS_M4, LOGISTICS_EXPRESS_M5].map((module, index) => rowFor(`LOGISTICS_EXPRESS_MODULE0${index + 1}`, module)),
];

let held: SourceDecks | null = null;

/** The live Match & Sort and flashcard source modules after review holds, built once. */
export function heldSourceDecks(): SourceDecks {
  if (!held) {
    held = Object.fromEntries(PRACTICE_SOURCE_MODULES.map(([key, decks, quizzes, takeaways]) => [key, applyReviewHolds(key, decks, quizzes, takeaways).decks])) as SourceDecks;
  }
  return held;
}
