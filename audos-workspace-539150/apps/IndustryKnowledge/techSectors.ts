import type { RetailSectorContent } from './retailSectorTypes';
import { TECH_ECOMMERCE_CONTENT, TECH_ENTERPRISE_SW_CONTENT } from './techSectorsEnterpriseEcommerce';
import { TECH_ELECTRONICS_CONTENT, TECH_GAMING_CONTENT } from './techSectorsGamingElectronics';
import { TECH_ADTECH_CONTENT, TECH_TELECOM_CONTENT } from './techSectorsTelecomAdtech';
import { TECH_SOCIAL_CONTENT } from './techSectorsSocial';

/**
 * Module cards and lesson summaries for the seven Technology & Digital sub-industries. They reuse the five-module,
 * lesson-card structure of the retail sectors; the lesson cards carry a description and takeaways only, and
 * full chapter decks are added to a sector later.
 */
export const TECH_SECTOR_CONTENT: Record<string, RetailSectorContent> = {
  'tech-enterprise-sw': TECH_ENTERPRISE_SW_CONTENT,
  'tech-ecommerce': TECH_ECOMMERCE_CONTENT,
  'tech-gaming': TECH_GAMING_CONTENT,
  'tech-electronics': TECH_ELECTRONICS_CONTENT,
  'tech-telecom': TECH_TELECOM_CONTENT,
  'tech-adtech': TECH_ADTECH_CONTENT,
  'tech-social': TECH_SOCIAL_CONTENT,
};
