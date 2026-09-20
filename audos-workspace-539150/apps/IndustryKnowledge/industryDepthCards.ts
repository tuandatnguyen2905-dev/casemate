// Casemate Domain Knowledge — registry of the deep, research-backed industry card packs.
// Each pack extends its base 20-card deck with Vietnam-specific market, operating, trend,
// company-intelligence and interview material (modules 6-10). Keyed by industry slug so a
// deck without a pack simply keeps its base cards.
//
// Phase 2 packs are merged in alongside the originals rather than replacing them: they add the
// chapters the first pass under-served (the operating process end to end, R&D and product,
// the commercial engine, and the counterintuitive insider facts), plus specialist depth for the
// six FMCG sub-industries, which previously had base cards only.

import type { DepthCard } from './industryDepthTypes';
import { BANKING_DEPTH_CARDS } from './industryDepthBanking';
import { TECH_DEPTH_CARDS } from './industryDepthTech';
import { RETAIL_DEPTH_CARDS } from './industryDepthRetail';
import { MANUFACTURING_DEPTH_CARDS } from './industryDepthManufacturing';
import { CONSULTING_DEPTH_CARDS } from './industryDepthConsulting';
import { LOGISTICS_DEPTH_CARDS } from './industryDepthLogistics';
import { INSURANCE_DEPTH_CARDS } from './industryDepthInsurance';
import { TOBACCO_DEPTH_CARDS } from './industryDepthTobacco';
import {
  BANKING_PHASE2_CARDS,
  TECH_PHASE2_CARDS,
  RETAIL_PHASE2_CARDS,
  MANUFACTURING_PHASE2_CARDS,
} from './industryDepthPhase2A';
import { CONSULTING_PHASE2_CARDS, LOGISTICS_PHASE2_CARDS } from './industryDepthPhase2B';
import { INSURANCE_PHASE2_CARDS, TOBACCO_PHASE2_CARDS } from './industryDepthPhase2C';
import { FMCG_CORE_DEPTH_CARDS } from './fmcgDepthCore';
import { DAIRY_DEPTH_CARDS, BEER_DEPTH_CARDS, BEVERAGE_DEPTH_CARDS } from './fmcgDepthA';
import { SNACKS_DEPTH_CARDS, CARE_DEPTH_CARDS, SEASONINGS_DEPTH_CARDS } from './fmcgDepthB';
import {
  TECH_TOPUP_CARDS,
  RETAIL_TOPUP_CARDS,
  MANUFACTURING_TOPUP_CARDS,
  CONSULTING_TOPUP_CARDS,
  LOGISTICS_TOPUP_CARDS,
  TOBACCO_TOPUP_CARDS,
} from './industryDepthTopUp';
import { DAIRY_TOPUP_CARDS, BEER_TOPUP_CARDS, BEVERAGE_TOPUP_CARDS } from './fmcgDepthTopUpA';
import { SNACKS_TOPUP_CARDS, CARE_TOPUP_CARDS, SEASONINGS_TOPUP_CARDS } from './fmcgDepthTopUpB';
import {
  BANKING_SPRINT_CARDS,
  TECH_SPRINT_CARDS,
  RETAIL_SPRINT_CARDS,
  MANUFACTURING_SPRINT_CARDS,
  LOGISTICS_SPRINT_CARDS,
  INSURANCE_SPRINT_CARDS,
  TOBACCO_SPRINT_CARDS,
} from './industrySprintExpansion';

export const INDUSTRY_DEPTH_CARDS: Record<string, DepthCard[]> = {
  banking: [...BANKING_DEPTH_CARDS, ...BANKING_PHASE2_CARDS, ...BANKING_SPRINT_CARDS],
  tech: [...TECH_DEPTH_CARDS, ...TECH_PHASE2_CARDS, ...TECH_TOPUP_CARDS, ...TECH_SPRINT_CARDS],
  retail: [...RETAIL_DEPTH_CARDS, ...RETAIL_PHASE2_CARDS, ...RETAIL_TOPUP_CARDS, ...RETAIL_SPRINT_CARDS],
  'industrial-manufacturing': [...MANUFACTURING_DEPTH_CARDS, ...MANUFACTURING_PHASE2_CARDS, ...MANUFACTURING_TOPUP_CARDS, ...MANUFACTURING_SPRINT_CARDS],
  consulting: [...CONSULTING_DEPTH_CARDS, ...CONSULTING_PHASE2_CARDS, ...CONSULTING_TOPUP_CARDS],
  logistics: [...LOGISTICS_DEPTH_CARDS, ...LOGISTICS_PHASE2_CARDS, ...LOGISTICS_TOPUP_CARDS, ...LOGISTICS_SPRINT_CARDS],
  insurance: [...INSURANCE_DEPTH_CARDS, ...INSURANCE_PHASE2_CARDS, ...INSURANCE_SPRINT_CARDS],
  tobacco: [...TOBACCO_DEPTH_CARDS, ...TOBACCO_PHASE2_CARDS, ...TOBACCO_TOPUP_CARDS, ...TOBACCO_SPRINT_CARDS],
  fmcg: [...FMCG_CORE_DEPTH_CARDS],
  'fmcg-dairy': [...DAIRY_DEPTH_CARDS, ...DAIRY_TOPUP_CARDS],
  'fmcg-beer': [...BEER_DEPTH_CARDS, ...BEER_TOPUP_CARDS],
  'fmcg-beverages': [...BEVERAGE_DEPTH_CARDS, ...BEVERAGE_TOPUP_CARDS],
  'fmcg-snacks': [...SNACKS_DEPTH_CARDS, ...SNACKS_TOPUP_CARDS],
  'fmcg-personal-home-care': [...CARE_DEPTH_CARDS, ...CARE_TOPUP_CARDS],
  'fmcg-seasonings': [...SEASONINGS_DEPTH_CARDS, ...SEASONINGS_TOPUP_CARDS],
};

// Depth cards are authored in module batches and appended over time, so they are ordered by
// module (6 -> 10) before being numbered into a deck. Sorting is stable, which keeps the
// authored sequence inside each module.
export function depthCardsFor(slug: string): DepthCard[] {
  const cards = INDUSTRY_DEPTH_CARDS[slug];
  if (!cards || cards.length === 0) return [];
  return cards.map((card, index) => ({ card, index })).sort((a, b) => (a.card.module - b.card.module) || (a.index - b.index)).map(({ card }) => card);
}

export const DEPTH_CARD_COUNT = Object.values(INDUSTRY_DEPTH_CARDS).reduce((sum, cards) => sum + cards.length, 0);
