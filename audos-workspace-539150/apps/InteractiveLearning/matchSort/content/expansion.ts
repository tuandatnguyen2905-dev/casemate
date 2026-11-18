// Registry of the packs added by the practice-content expansion, in curriculum order.
// The two original packs (Commercial Banking M01 lesson 1.1, Consumer Finance M01) stay in index.ts
// and are never edited here. Add new packs to EXPANSION_PACKS; nothing else needs to change.

import type { MatchSortPack } from '../types';
import { COMMERCIAL_BANKING_M01_EXTENDED_PACK } from './commercialBankingM01Extended';
import { COMMERCIAL_BANKING_M02_PACK } from './commercialBankingM02';
import { COMMERCIAL_BANKING_M03_PACK } from './commercialBankingM03';
import { COMMERCIAL_BANKING_M04_PACK } from './commercialBankingM04';
import { COMMERCIAL_BANKING_M05_PACK } from './commercialBankingM05';
import { CONSUMER_FINANCE_M01_EXTENDED_PACK } from './consumerFinanceM01Extended';
import { CONSUMER_FINANCE_M02_PACK } from './consumerFinanceM02';
import { CONSUMER_FINANCE_M03_PACK } from './consumerFinanceM03';
import { CONSUMER_FINANCE_M04_PACK } from './consumerFinanceM04';
import { CONSUMER_FINANCE_M05_PACK } from './consumerFinanceM05';
import { FMCG_EXPANSION_PACKS } from './fmcgExpansion';

export const EXPANSION_PACKS: MatchSortPack[] = [
  COMMERCIAL_BANKING_M01_EXTENDED_PACK,
  COMMERCIAL_BANKING_M02_PACK,
  COMMERCIAL_BANKING_M03_PACK,
  COMMERCIAL_BANKING_M04_PACK,
  COMMERCIAL_BANKING_M05_PACK,
  CONSUMER_FINANCE_M01_EXTENDED_PACK,
  CONSUMER_FINANCE_M02_PACK,
  CONSUMER_FINANCE_M03_PACK,
  CONSUMER_FINANCE_M04_PACK,
  CONSUMER_FINANCE_M05_PACK,
  ...FMCG_EXPANSION_PACKS,
];
