import {
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle,
  Clock3,
  Cpu,
  DollarSign,
  Globe,
  Landmark,
  Lightbulb,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  Target,
  Truck,
  Users,
  Workflow,
} from 'lucide-react';
import { RETAIL_FASHION_CONTENT } from './retailSectorFashion';
import { RETAIL_GROCERY_CONTENT } from './retailSectorGrocery';
import { RETAIL_PHARMACY_CONTENT } from './retailSectorPharmacy';
import { RETAIL_COFFEE_CONTENT } from './retailSectorCoffee';
import { TECH_SECTOR_CONTENT } from './techSectors';
import { MANUFACTURING_SECTOR_CONTENT } from './manufacturingSectors';
import { LOGISTICS_SECTOR_CONTENT } from './logisticsSectors';
import { AGRICULTURE_SECTOR_CONTENT } from './agricultureSectors';
import { REAL_ESTATE_SECTOR_CONTENT } from './realEstateSectors';
import { HOSPITALITY_SECTOR_CONTENT } from './hospitalitySectors';
import { HEALTHCARE_SECTOR_CONTENT } from './healthcareSectors';
import { PROFESSIONAL_SECTOR_CONTENT } from './professionalSectors';
import { CONSUMER_FINANCE_CONTENT } from './consumerFinanceSector';
import { LIFE_INSURANCE_CONTENT } from './lifeInsuranceSector';
import { PAYMENTS_FINTECH_CONTENT } from './paymentsFintechSector';
import { FMCG_EXPANSION_SECTOR_CONTENT } from './fmcgExpansionRegistry';
import type {
  RetailLessonBlueprint,
  RetailLessonPresentation,
  RetailModuleBlueprint,
  RetailModuleResolution,
  RetailSectorContent,
} from './retailSectorTypes';

export type {
  RetailLessonPresentation,
  RetailModuleResolution,
  RetailSectorContent,
} from './retailSectorTypes';

/**
 * The five standard modules and their lesson chrome, shared by every retail sector.
 * `moduleTitle` must match the KNOWLEDGE_SECTIONS industry card titles exactly.
 * Only the copy (module description, lesson description, takeaways) differs per sector.
 */
export const RETAIL_MODULE_BLUEPRINT: RetailModuleBlueprint[] = [
  {
    moduleTitle: 'How the Industry Works',
    lessons: [
      { key: 'm1-scope', title: 'What the Industry Includes', subtitle: 'Scope, Formats, and Boundaries', icon: BookOpen },
      { key: 'm1-history', title: 'How the Industry Evolved', subtitle: 'From Early Formats to Modern Retail', icon: Clock3 },
      { key: 'm1-global', title: 'How the Global Market Is Structured', subtitle: 'Global Scale and Leading Markets', icon: Globe },
      { key: 'm1-vietnam', title: 'How the Vietnam Market Works', subtitle: 'Local Structure and Participants', icon: Landmark },
      { key: 'm1-drivers', title: 'What Drives Industry Change', subtitle: 'Economic, Consumer, and Policy Forces', icon: Sparkles },
    ],
  },
  {
    moduleTitle: 'How Value Moves Through the Industry',
    lessons: [
      { key: 'm2-overview', title: 'Value Chain Overview', subtitle: 'How the Retail Chain Fits Together', icon: Workflow },
      { key: 'm2-sourcing', title: 'Sourcing & Supplier Partnerships', subtitle: 'Buying, Vendors, and Own Brand', icon: Sprout },
      { key: 'm2-logistics', title: 'Distribution, Logistics & Inventory', subtitle: 'Warehousing, Replenishment, and Stock Flow', icon: Truck },
      { key: 'm2-stores', title: 'Store Network & Channel Operations', subtitle: 'Formats, Locations, and Daily Execution', icon: Store },
      { key: 'm2-customer', title: 'Customer Journey & Service', subtitle: 'Discovery, Purchase, and After-Sales', icon: Users },
      { key: 'm2-value', title: 'Where Retail Value Is Created', subtitle: 'Margin, Leakage, and Value Capture', icon: DollarSign },
    ],
  },
  {
    moduleTitle: 'How Companies Make Money',
    lessons: [
      { key: 'm3-models', title: 'Industry Business Models', subtitle: 'How Retailers Organise to Earn', icon: Building2 },
      { key: 'm3-assortment', title: 'Assortment & Category Architecture', subtitle: 'Range, Tiers, and Own Brand', icon: ShoppingCart },
      { key: 'm3-segments', title: 'Customer Segments & Needs', subtitle: 'Who Buys, When, and Why', icon: Users },
      { key: 'm3-revenue', title: 'Revenue Streams & Cost Structure', subtitle: 'Where Revenue and Costs Sit', icon: DollarSign },
      { key: 'm3-store-economics', title: 'Store Economics & Unit Profitability', subtitle: 'Sales Density, Basket, and Payback', icon: BarChart3 },
      { key: 'm3-ecosystem', title: 'Industry Ecosystem & Stakeholders', subtitle: 'Suppliers, Landlords, and Regulators', icon: Workflow },
    ],
  },
  {
    moduleTitle: 'Who Competes—and Why They Win',
    lessons: [
      { key: 'm4-structure', title: 'Industry Competition Structure', subtitle: 'Concentration and Five Forces', icon: BarChart3 },
      { key: 'm4-players', title: 'Key Industry Players', subtitle: 'International Chains and Local Leaders', icon: Globe },
      { key: 'm4-benchmarking', title: 'Competitor Benchmarking', subtitle: 'Compare Rivals Side by Side', icon: Target },
      { key: 'm4-success', title: 'Key Success Factors', subtitle: 'What Winning Retailers Get Right', icon: CheckCircle },
      { key: 'm4-swot', title: 'SWOT & Strategic Challenges', subtitle: 'Strengths, Risks, and Hard Choices', icon: ShieldCheck },
    ],
  },
  {
    moduleTitle: 'What Is Changing Next',
    lessons: [
      { key: 'm5-consumer', title: 'Consumer Trends', subtitle: 'How Shopper Demand Is Evolving', icon: Users },
      { key: 'm5-technology', title: 'Technology & Innovation Trends', subtitle: 'Digital, Data, and Store Technology', icon: Cpu },
      { key: 'm5-channel', title: 'Market & Channel Trends', subtitle: 'Where Growth and Channels Are Moving', icon: Store },
      { key: 'm5-regulatory', title: 'Regulatory & Sustainability Trends', subtitle: 'Compliance, Safety, and ESG', icon: Sprout },
      { key: 'm5-outlook', title: 'Growth Outlook & Strategic Opportunities', subtitle: 'Where the Next Moves Are', icon: Lightbulb },
    ],
  },
];

export const RETAIL_SECTOR_CONTENT: Record<string, RetailSectorContent> = {
  'retail-fashion': RETAIL_FASHION_CONTENT,
  'retail-grocery': RETAIL_GROCERY_CONTENT,
  'retail-pharmacy': RETAIL_PHARMACY_CONTENT,
  'retail-coffee': RETAIL_COFFEE_CONTENT,
  ...TECH_SECTOR_CONTENT,
  ...MANUFACTURING_SECTOR_CONTENT,
  ...LOGISTICS_SECTOR_CONTENT,
  ...AGRICULTURE_SECTOR_CONTENT,
  ...REAL_ESTATE_SECTOR_CONTENT,
  ...HOSPITALITY_SECTOR_CONTENT,
  ...HEALTHCARE_SECTOR_CONTENT,
  ...PROFESSIONAL_SECTOR_CONTENT,
  'banking-consumer-finance': CONSUMER_FINANCE_CONTENT,
  'banking-insurance': LIFE_INSURANCE_CONTENT,
  'banking-fintech': PAYMENTS_FINTECH_CONTENT,
  ...FMCG_EXPANSION_SECTOR_CONTENT,
};

export const RETAIL_SECTOR_IDS: string[] = Object.keys(RETAIL_SECTOR_CONTENT);

const MODULE_BY_TITLE = new Map<string, RetailModuleBlueprint>(
  RETAIL_MODULE_BLUEPRINT.map((module) => [module.moduleTitle, module]),
);

const LESSON_BY_TITLE = new Map<string, RetailLessonBlueprint>(
  RETAIL_MODULE_BLUEPRINT.flatMap((module) => module.lessons.map((lesson) => [lesson.title, lesson] as [string, RetailLessonBlueprint])),
);

export function isRetailSector(industryId?: string): boolean {
  return Boolean(industryId && RETAIL_SECTOR_CONTENT[industryId]);
}

/** Sector-specific description and lesson list for one of the five standard modules. */
export function resolveRetailModule(industryId: string | undefined, moduleTitle: string): RetailModuleResolution | undefined {
  if (!industryId) return undefined;
  const sector = RETAIL_SECTOR_CONTENT[industryId];
  const blueprint = MODULE_BY_TITLE.get(moduleTitle);
  if (!sector || !blueprint) return undefined;
  const description = sector.modules[moduleTitle];
  if (!description) return undefined;
  const lessons = blueprint.lessons.flatMap((lesson) => {
    const content = sector.lessons[lesson.key];
    return content ? [{ title: content.title ?? lesson.title, description: content.description, takeaways: content.takeaways }] : [];
  });
  return { description, lessons };
}

/** Sector-specific header copy for one retail lesson. */
export function resolveRetailLessonPresentation(industryId: string | undefined, lessonTitle: string): RetailLessonPresentation | undefined {
  if (!industryId) return undefined;
  const sector = RETAIL_SECTOR_CONTENT[industryId];
  if (!sector) return undefined;
  const lesson = LESSON_BY_TITLE.get(lessonTitle)
    ?? RETAIL_MODULE_BLUEPRINT.flatMap((module) => module.lessons).find((item) => sector.lessons[item.key]?.title === lessonTitle);
  if (!lesson) return undefined;
  const content = sector.lessons[lesson.key];
  if (!content) return undefined;
  return { title: content.title ?? lesson.title, subtitle: content.subtitle ?? lesson.subtitle, description: content.description, icon: lesson.icon };
}
