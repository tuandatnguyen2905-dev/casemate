// Casemate Domain Knowledge — shared types for the deep, research-backed industry card packs.
// Depth cards extend a base 20-card deck with Vietnam-specific market, operating,
// trend, company-intelligence and interview material (modules 6-10).

import type { TopicGroupId } from './topicGroups';

export type DepthCardType = 'fact' | 'concept' | 'quiz' | 'case' | 'role';

/**
 * Module map used by every depth pack so the numbering means the same thing
 * in every industry:
 *  6 — Vietnam market & business fundamentals
 *  7 — Inside the company: MT reality, KPIs, org design
 *  8 — Trends, disruption & policy
 *  9 — Company intelligence & recruitment
 * 10 — Interview-ready insights
 */
export type DepthModule = 6 | 7 | 8 | 9 | 10;

export interface DepthCard {
  module: DepthModule;
  /** Chapter this card is filed under inside its industry deck. */
  topic: TopicGroupId;
  /** Card-specific emoji shown on the card front — as specific as the subject allows. */
  emoji: string;
  type: DepthCardType;
  title: string;
  front: string;
  back: string[];
  diagram?: string[];
  /**
   * Structured visual rows rendered as responsive cards, value badges and progress bars.
   * Use them for cost stacks, process ladders, org trees and compact comparisons.
   */
  visual?: string[];
  options?: string[];
  answer?: number;
}

export const DEPTH_MODULE_TITLES: Record<DepthModule, string> = {
  6: 'Vietnam market & business fundamentals',
  7: 'Inside the company: MT reality, KPIs and org design',
  8: 'Trends, disruption and policy',
  9: 'Company intelligence and recruitment',
  10: 'Interview-ready insights',
};
