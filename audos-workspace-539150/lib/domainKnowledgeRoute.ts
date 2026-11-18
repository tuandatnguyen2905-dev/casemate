/*
 * Pending route handed to Domain Knowledge. A caller writes it to sessionStorage and then
 * dispatches the `openApp` event for `industry-knowledge`; Domain Knowledge reads and clears
 * it as soon as it opens (or is already open and receives the event).
 *
 * Writers today: My Roadmap (industrySlug + subcategoryId + pillar), My Roadmap's
 * recommendations (sector group id + sub-industry id, e.g. fmcg + fmcg-dairy) and the Case Pool
 * "Suggested Framework" link (basic-economics + economics-toolkits + cardTitle). A route to
 * basic-economics + consulting-tools may carry a consulting framework id as cardId.
 */

export const DOMAIN_PENDING_ROUTE_KEY = 'casemate-domain-pending-route';
export const BASIC_ECONOMICS_SLUG = 'basic-economics';
export const BASIC_ECONOMICS_TOOLKITS_PILLAR = 'economics-toolkits';
/** The full consulting framework library (lib/consultingFrameworks.ts), formerly Case Pool's Consulting Toolkit tab. */
export const BASIC_ECONOMICS_CONSULTING_TOOLS_PILLAR = 'consulting-tools';

/** A route nobody opened within this window is stale (for example the paywall blocked the app). */
const PENDING_ROUTE_MAX_AGE_MS = 10 * 60 * 1000;

export interface DomainPendingRoute {
  industrySlug: string;
  subcategoryId?: string | null;
  pillar?: string | null;
  /** Exact Domain Knowledge card title, e.g. 'Worked toolkit: profitability tree'. */
  cardTitle?: string;
  /** Stable card id; wins over cardTitle when both are present. */
  cardId?: string;
}

export function writeDomainPendingRoute(route: DomainPendingRoute): void {
  try {
    sessionStorage.setItem(DOMAIN_PENDING_ROUTE_KEY, JSON.stringify({ ...route, at: Date.now() }));
  } catch {
    /* Domain Knowledge still opens at its home when session storage is unavailable. */
  }
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

/** Reads and clears the pending route. Returns null when absent, unreadable or stale. */
export function takeDomainPendingRoute(): DomainPendingRoute | null {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(DOMAIN_PENDING_ROUTE_KEY);
    if (raw !== null) sessionStorage.removeItem(DOMAIN_PENDING_ROUTE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const industrySlug = text(parsed?.industrySlug);
    if (!industrySlug) return null;
    const at = Number(parsed?.at);
    if (Number.isFinite(at) && Date.now() - at > PENDING_ROUTE_MAX_AGE_MS) return null;
    return {
      industrySlug,
      subcategoryId: text(parsed?.subcategoryId) ?? null,
      pillar: text(parsed?.pillar) ?? null,
      cardTitle: text(parsed?.cardTitle),
      cardId: text(parsed?.cardId),
    };
  } catch {
    return null;
  }
}

/**
 * Roadmap and Case Pool name industries by learning-deck slug; the Domain Knowledge screen is
 * organised by sector group and sub-industry. Where a deck subcategory has no sub-industry of
 * its own the route falls back to the sector group.
 */
interface SectorTarget {
  groupId: string;
  /** Sub-industry used when the route names the industry without a subcategory. */
  categoryId?: string;
  /** Deck subcategory id -> Domain Knowledge sub-industry id. */
  subcategories?: Record<string, string>;
}

const SECTOR_TARGETS: Record<string, SectorTarget> = {
  fmcg: { groupId: 'fmcg' },
  banking: {
    groupId: 'banking',
    subcategories: {
      'commercial-banking': 'banking-commercial',
      'banking-insurance': 'banking-insurance',
      'banking-fintech': 'banking-fintech',
    },
  },
  tech: {
    groupId: 'tech',
    subcategories: {
      'telecom-industry': 'tech-telecom',
      'semiconductor-hardware': 'tech-electronics',
      'software-saas': 'tech-enterprise-sw',
      'gaming-interactive-entertainment': 'tech-gaming',
      'ecommerce-technology': 'tech-ecommerce',
    },
  },
  retail: {
    groupId: 'retail',
    subcategories: {
      'hypermarket-supermarket': 'retail-grocery',
      'fashion-apparel': 'retail-fashion',
      'pharmacy-health-retail': 'retail-pharmacy',
    },
  },
  'industrial-manufacturing': {
    groupId: 'mfg',
    subcategories: {
      'energy-oil-gas': 'mfg-electrical',
      'construction-real-estate': 'mfg-building',
    },
  },
  consulting: {
    groupId: 'professional',
    subcategories: {
      'strategy-consulting': 'professional-consulting',
      'management-operations-consulting': 'professional-consulting',
      'it-technology-consulting': 'professional-consulting',
    },
  },
  logistics: {
    groupId: 'logistics',
    subcategories: {
      'freight-shipping': 'logistics-freight',
      'last-mile-delivery': 'logistics-express',
      'warehousing-fulfillment': 'logistics-contract',
      '3pl-integrated-logistics': 'logistics-contract',
    },
  },
  insurance: { groupId: 'banking', categoryId: 'banking-insurance' },
  tobacco: { groupId: 'fmcg', categoryId: 'fmcg-tobacco' },
};

export interface ResolvedSectorRoute {
  groupId: string;
  categoryId?: string;
}

/**
 * Domain Knowledge sector route for a pending route, or null when the industry is unknown.
 * `isCategoryAvailable` keeps the route off sub-industries whose content is not published.
 */
export function resolveSectorRoute(
  pending: Pick<DomainPendingRoute, 'industrySlug' | 'subcategoryId'>,
  isCategoryAvailable: (categoryId: string) => boolean,
): ResolvedSectorRoute | null {
  const target = SECTOR_TARGETS[pending.industrySlug];
  const candidate = target && ((pending.subcategoryId && target.subcategories?.[pending.subcategoryId]) || target.categoryId);
  if (target && candidate && isCategoryAvailable(candidate)) return { groupId: target.groupId, categoryId: candidate };
  // The route may also name a sub-industry directly, with its sector group as industrySlug.
  if (pending.subcategoryId && isCategoryAvailable(pending.subcategoryId)) {
    return { groupId: target?.groupId ?? pending.industrySlug, categoryId: pending.subcategoryId };
  }
  return target ? { groupId: target.groupId } : null;
}

/** Analytics ids for a Domain Knowledge screen: slugs and ids only, never titles or text. */
export interface DomainTrackingIds {
  industry_slug: string | null;
  sector_id: string | null;
  company_id: string | null;
  topic_id: string | null;
  lesson_id: string | null;
}

export function domainTrackingSlug(value: string | null | undefined): string | null {
  if (!value) return null;
  const slug = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || null;
}

export function domainTrackingIdsFor(route: {
  groupId?: string | null;
  categoryId?: string | null;
  companyId?: string | null;
  cardTitle?: string | null;
  lessonTitle?: string | null;
}): DomainTrackingIds {
  return {
    industry_slug: route.groupId || null,
    sector_id: route.categoryId || null,
    company_id: route.companyId || null,
    topic_id: domainTrackingSlug(route.cardTitle),
    lesson_id: domainTrackingSlug(route.lessonTitle),
  };
}

/** Ids of the Domain Knowledge screen currently in the address bar (the dk* route params). */
export function readDomainTrackingIds(): DomainTrackingIds {
  try {
    const params = new URLSearchParams(window.location.search);
    return domainTrackingIdsFor({
      groupId: params.get('dkGroup'),
      categoryId: params.get('dkIndustry'),
      companyId: params.get('dkCompany'),
      cardTitle: params.get('dkModule'),
      lessonTitle: params.get('dkLesson'),
    });
  } catch {
    return domainTrackingIdsFor({});
  }
}

/** One lesson across the whole catalogue: lesson titles repeat between sectors and modules. */
export function domainLessonItemId(ids: DomainTrackingIds): string | null {
  if (!ids.lesson_id) return null;
  return [ids.sector_id ?? '-', ids.topic_id ?? '-', ids.lesson_id].join(':');
}

let moveFromItemId: string | null = null;
let moveByNextButton = false;

/** A knowledge check was submitted in this lesson, so opening a different lesson next is a move. */
export function noteDomainTestCompleted(itemId: string | null): void {
  if (!itemId) return;
  moveFromItemId = itemId;
  moveByNextButton = false;
}

/** The learner pressed the lesson's Continue to Next Lesson button. */
export function noteDomainNextItem(): void {
  if (moveFromItemId) moveByNextButton = true;
}

/** Returns (and clears) the pending move when a lesson other than the tested one opens. */
export function takeDomainMove(openedItemId: string | null): { moveType: 'next_case_button' | 'self_exit_choose_other'; fromItemId: string } | null {
  if (!moveFromItemId || !openedItemId || openedItemId === moveFromItemId) return null;
  const move = { moveType: moveByNextButton ? 'next_case_button' as const : 'self_exit_choose_other' as const, fromItemId: moveFromItemId };
  moveFromItemId = null;
  moveByNextButton = false;
  return move;
}
