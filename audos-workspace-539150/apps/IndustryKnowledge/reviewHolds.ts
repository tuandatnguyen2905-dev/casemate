// Internal review holds for Domain Knowledge. This file is metadata, not learner content.
// applyReviewHolds never removes or renumbers a chapter. A held chapter is replaced in place
// by a restricted placeholder that keeps its title, legacy fields and array position, so
// index-keyed notes, positions and completion records keep pointing at the same chapter.
// Held chapters also lose their MCQs (matched by lesson-local chapter number). A held lesson
// keeps its chapter slots as placeholders and loses its MCQs and takeaways.
// A chapter whose title cannot be matched fails closed: the whole lesson is held and the
// hold ID is reported in `unmatched`.

export type ReviewHoldScope = 'chapter' | 'lesson';

export interface ReviewHold {
  id: string;
  audit: string;
  moduleKey: string;
  lesson: string;
  chapter?: string;
  scope: ReviewHoldScope;
  status: 'Under Review';
  originalStatus: string;
  markerText: string;
  claim: string;
  sourceIds: string[];
  evidenceGap: string;
  releaseCondition: string;
}

const GATE = 'Verification Required \u2014 Do Not Publish';
const RELEASE = 'Verify against the primary text, record the reviewer decision, then remove this hold. Do not clear the hold by deleting the marker alone.';

export const REVIEW_HOLDS: ReviewHold[] = [
  { id: 'REV-P0-01', audit: 'P0-01', moduleKey: 'HOSPITALITY_HOTELS_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'Accommodation, Classification and Consumer Rules', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify current official rules; unresolved claims held', markerText: GATE + ' for unresolved claims.', claim: 'Accommodation minimum conditions, classification and consumer transaction rules by property type.', sourceIds: ['vnDecree', 'vnDecree142', 'vnTourismLaw'], evidenceGap: 'The amended hotel minimums are now identified, but classification, consumer-transaction duties and applicability by accommodation type remain unresolved; provider claims do not prove compliance.', releaseCondition: RELEASE },
  { id: 'REV-P0-02', audit: 'P0-02', moduleKey: 'HOSPITALITY_RESTAURANTS_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'Food Safety, Hygiene and Traceability', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify current official requirements', markerText: GATE + ' for unresolved legal detail.', claim: 'Food safety, hygiene and traceability legal duties for restaurants, including certification.', sourceIds: ['vnConsumer', 'vnFoodLaw'], evidenceGap: 'Cited consumer note does not cover certification; no article-level food safety source.', releaseCondition: RELEASE },
  { id: 'REV-P0-03a', audit: 'P0-03', moduleKey: 'REAL_ESTATE_DEVELOPMENT_MODULE01', lesson: 'Vietnam Market Overview', chapter: 'How Do Legal Readiness and Financing Shape Vietnam Projects?', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify current primary law; unresolved claims remain held', markerText: GATE + '.', claim: 'Legal readiness, approvals and project financing requirements for Vietnam development.', sourceIds: ['mocDisclosure', 'unHabitatLand'], evidenceGap: 'No current Vietnamese law or approval source in the chapter.', releaseCondition: RELEASE },
  { id: 'REV-P0-03b', audit: 'P0-03', moduleKey: 'REAL_ESTATE_DEVELOPMENT_MODULE02', lesson: 'Upstream Activities', chapter: 'Due Diligence and Development Rights', scope: 'chapter', status: 'Under Review', originalStatus: 'Unresolved rights remain held', markerText: GATE + '.', claim: 'Title, boundary and development-right restrictions for Vietnam sites.', sourceIds: [], evidenceGap: 'No Vietnam title or rights source; default sources are generic.', releaseCondition: RELEASE },
  { id: 'REV-P0-03c', audit: 'P0-03', moduleKey: 'REAL_ESTATE_DEVELOPMENT_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'Land, Planning and Development Regulation', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify current obligations; unresolved claims held', markerText: GATE + ' for unresolved claims.', claim: 'Development obligations by project, entity and date.', sourceIds: ['unHabitatLand', 'mocDisclosure'], evidenceGap: 'Neither cited source is current primary law.', releaseCondition: RELEASE },
  { id: 'REV-P0-04a', audit: 'P0-04', moduleKey: 'REAL_ESTATE_ADVISORY_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'Brokerage and Valuation Requirements', scope: 'chapter', status: 'Under Review', originalStatus: 'Unresolved claims held', markerText: GATE + ' for unresolved claims.', claim: 'Brokerage and valuation assignment requirements under Vietnam real estate business rules.', sourceIds: [], evidenceGap: 'Legal scope not verified against primary text.', releaseCondition: RELEASE },
  { id: 'REV-P0-04b', audit: 'P0-04', moduleKey: 'REAL_ESTATE_ADVISORY_MODULE01', lesson: 'Industry Drivers & External Factors', chapter: 'How Do Regulation and Professional Standards Matter?', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify official Vietnamese law; unresolved claims held', markerText: GATE + '.', claim: 'Vietnamese valuation and advisory regulation; overbroad statement that Ministry of Finance standards govern all valuation assignments.', sourceIds: [], evidenceGap: 'Circular 42/2024 scope is narrower than the chapter text.', releaseCondition: RELEASE },
  { id: 'REV-P0-05', audit: 'P0-05', moduleKey: 'PROFESSIONAL_ADVISORY_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Construction Regulations and Technical Standards Affect Advisory Firms?', scope: 'chapter', status: 'Under Review', originalStatus: 'Flag unsupported legal or technical claims', markerText: GATE + '.', claim: 'Construction regulation and technical standards applicable to advisory firms in Vietnam.', sourceIds: [], evidenceGap: 'No consolidated Vietnamese law source for the chapter claims.', releaseCondition: RELEASE },
  { id: 'REV-P0-06', audit: 'P0-06', moduleKey: 'LOGISTICS_DISTRIBUTION_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'Trade and Distribution Requirements', scope: 'chapter', status: 'Under Review', originalStatus: 'Unresolved legal claims held', markerText: GATE + ' for unresolved legal claims.', claim: 'Trade and distribution legal requirements in Vietnam.', sourceIds: ['dms2025', 'dkshConsumer'], evidenceGap: 'Default sources are not legal sources.', releaseCondition: RELEASE },
  { id: 'REV-P0-07', audit: 'P0-07', moduleKey: 'LOGISTICS_FREIGHT_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Maritime and Trade Regulations Affect Freight Operations?', scope: 'chapter', status: 'Under Review', originalStatus: 'Verify primary requirements; unsupported thresholds held', markerText: GATE + '.', claim: 'Maritime and trade regulatory thresholds and entitlements affecting freight operations.', sourceIds: [], evidenceGap: 'Primary requirements and thresholds not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-08', audit: 'P0-08', moduleKey: 'MFG_ELECTRICAL_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Electrical Safety and Product Standards Affect Manufacturers?', scope: 'chapter', status: 'Under Review', originalStatus: 'Flag unresolved claims', markerText: GATE + '.', claim: 'Electrical safety and product standards, mandatory adoption of IEC standards and certification scope.', sourceIds: ['iec', 'espr'], evidenceGap: 'No QCVN or TCVN number; adoption route for IEC standards in Vietnam not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-09', audit: 'P0-09', moduleKey: 'HEALTHCARE_PRODUCTS_MODULE02', lesson: 'Upstream Activities', chapter: 'How Are Product-Specific Evidence and Claims Planned?', scope: 'chapter', status: 'Under Review', originalStatus: 'Flag unsupported high-stakes claims', markerText: GATE + '.', claim: 'Product-specific evidence and health claim rules, including advertising constraints.', sourceIds: ['fdaClaims', 'whoReg'], evidenceGap: 'No claim or advertising rule source for Vietnam.', releaseCondition: RELEASE },
  { id: 'REV-P0-10', audit: 'P0-10', moduleKey: 'PROFESSIONAL_AUDIT_MODULE02', lesson: 'Global vs. Local Value Chain', chapter: 'How Do International Standards and Vietnam-Adopted Requirements Interact?', scope: 'chapter', status: 'Under Review', originalStatus: 'Flag unresolved applicability', markerText: GATE + '.', claim: 'Applicability of international auditing standards in Vietnam.', sourceIds: [], evidenceGap: 'Vietnamese source did not render; adoption status not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-15', audit: 'P0-15', moduleKey: 'PHARMACY_MODULE05', lesson: 'Technology & Innovation Trends', chapter: 'Digital Pharmacy Platforms and E-commerce', scope: 'chapter', status: 'Under Review', originalStatus: 'Legal rule for online prescription sales not verified', markerText: 'Online retail of prescription medicines remains prohibited except for a narrowly defined public-health emergency exception.', claim: 'Online retail of prescription medicines is prohibited except a Group A emergency isolation exception.', sourceIds: ['law44Summary', 'dav1136'], evidenceGap: 'Cited notes state only that certain online sales are banned; the exception is not in any source.', releaseCondition: 'Check against the official text of the Pharmacy Law and Law 44/2024 provisions, then remove this hold. Chapter quiz items that repeat the claim stay held until then.' },
  { id: 'REV-P0-16a', audit: 'QA-2026-11-07 DK-QA-017', moduleKey: 'MFG_PACKAGING_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Product Safety, Food Contact and Labeling Rules Differ?', scope: 'chapter', status: 'Under Review', originalStatus: 'Learner text says unresolved claims remain Verification Required', markerText: GATE + '.', claim: 'Product safety, food-contact and labelling requirements for packaging and label manufacturers in Vietnam.', sourceIds: [], evidenceGap: 'The chapter itself flags its legal claims as unresolved; no article-level Vietnamese source is verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-16b', audit: 'QA-2026-11-07 DK-QA-017', moduleKey: 'MFG_TEXTILES_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Labor, Safety and Product-Origin Requirements Affect Manufacturers?', scope: 'chapter', status: 'Under Review', originalStatus: 'Learner text says unsupported thresholds are Verification Required', markerText: GATE + '.', claim: 'Labour, safety and product-origin requirements and thresholds for textile and apparel manufacturers.', sourceIds: [], evidenceGap: 'The chapter itself flags its thresholds as unsupported; primary requirements are not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-16c', audit: 'QA-2026-11-07 DK-QA-017', moduleKey: 'MFG_BUILDING_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Product Safety and Technical Rules Affect Manufacturers?', scope: 'chapter', status: 'Under Review', originalStatus: 'Learner text says unsupported thresholds are Verification Required', markerText: GATE + '.', claim: 'Product safety, technical regulation and certification thresholds for building-material and coatings manufacturers.', sourceIds: [], evidenceGap: 'The chapter itself flags its thresholds as unsupported; no QCVN or TCVN reference is verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-16d', audit: 'QA-2026-11-07 DK-QA-017', moduleKey: 'LOGISTICS_CONTRACT_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Safety, Product and Data Requirements Affect Warehouses?', scope: 'chapter', status: 'Under Review', originalStatus: 'Learner text says unsupported thresholds or permissions are Verification Required', markerText: GATE + '.', claim: 'Facility safety, product-handling permissions and data requirements for contract-logistics warehouses in Vietnam.', sourceIds: [], evidenceGap: 'The chapter itself flags its thresholds and permissions as unsupported; facility- and product-specific requirements are not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-16e', audit: 'QA-2026-11-07 DK-QA-017', moduleKey: 'LOGISTICS_EXPRESS_MODULE05', lesson: 'Regulatory & Sustainability Trends', chapter: 'How Do Postal, Transport, Safety and Data Rules Affect Delivery?', scope: 'chapter', status: 'Under Review', originalStatus: 'Learner text says unsupported thresholds or permissions are Verification Required', markerText: GATE + '.', claim: 'Postal, transport, dangerous-goods and data requirements for express and last-mile delivery in Vietnam.', sourceIds: [], evidenceGap: 'The chapter itself flags its thresholds and permissions as unsupported; service-specific requirements are not verified.', releaseCondition: RELEASE },
  { id: 'REV-P0-12', audit: 'P0-12', moduleKey: 'COMMERCIAL_BANKING_MODULE05', lesson: '5.4 Regulatory & Sustainability Trends', scope: 'lesson', status: 'Under Review', originalStatus: 'Ready for Review', markerText: 'Ready for Review \u2014 learn verified prudential, depositor-protection, cyber, fintech, and sustainable-finance mechanisms.', claim: 'Article-level detail: Law 96/2025 Articles 198a-198c; Decree 86/2024 provisioning rates 0/5/20/50/100%; Law 111/2025 deposit insurance Articles 17-18 and 21-24.', sourceIds: ['cb-m05-s09', 'cb-m05-s08', 'cb-m02-s20', 'cb-m03-s16', 'cb-m03-s20', 'cb-m01-s13'], evidenceGap: 'Registry marks these as restricted, not rendered or not read (cb-m03-s20, cb-m02-s20, cb-m03-s16, cb-m01-s13); M05 presents them as verified.', releaseCondition: 'Read each primary text, resolve each registry conflict, record the decision, then remove this hold for the whole lesson.' },
  { id: 'REV-P0-13', audit: 'P0-13', moduleKey: 'PACKAGED_FOOD_MODULE05', lesson: 'Regulatory & Sustainability Trends', scope: 'lesson', status: 'Under Review', originalStatus: 'Legal gate, draft-only', markerText: 'Verification Required - Do Not Publish: this lesson remains draft-only until every material Vietnam EPR/SCT scope and article reference is reconciled against current official consolidated text. The proposed chewing-gum exemption remains unresolved.', claim: 'Vietnam EPR and SCT scope and article references (Decree 08/2022 and newer decrees not reconciled), Law 66/2025 effective date, Decrees 48/2026 and 110/2026 (no official source in registry), EUDR dates, chewing-gum exemption.', sourceIds: ['pf-m05-s04', 'pf-m05-s08', 'pf-m05-s09', 'pf-m05-s14'], evidenceGap: 'pf-m05-s08 is a secondary legal briefing and pf-m05-s09 a tracker that says draft details need official confirmation; pf-m05-s14 is secondary press reporting. No official source for Decrees 48/2026, 110/2026, Law 66/2025 dates or EUDR dates. pf-m05-s02 (company results) is not legal evidence and is excluded.', releaseCondition: 'Reconcile each article reference against the official consolidated text and add an official source record for every date. Only then remove this lesson-level hold.' }
];

export interface HeldUnits {
  decks: Record<string, any[]>;
  quizzes: Record<string, any[]>;
  takeaways: Record<string, unknown>;
  unmatched: string[];
}

const UNDER_REVIEW_BODY = 'This content is under review and is not available yet.';

const normalise = (value: unknown): string =>
  String(value ?? '')
    .replace(/^\s*\d+(\.\d+)*\.?\s+/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

function restrictedChapter(card: any): any {
  return {
    ...card,
    objective: 'This chapter is under review.',
    mateIntro: '',
    keyInsight: '',
    concepts: [],
    narrative: [],
    visualKind: undefined,
    visualHeading: '',
    visualIntro: '',
    imageAlt: '',
    statTiles: [],
    statsNote: '',
    keyTerms: [],
    recap: [],
    chapterRecap: '',
    deepDiveTitle: '',
    body: UNDER_REVIEW_BODY,
    sources: [],
    reviewStatus: 'Under Review',
  };
}

export function applyReviewHolds(
  moduleKey: string,
  decks?: Record<string, any[]> | null,
  quizzes?: Record<string, any[]> | null,
  takeaways?: Record<string, unknown> | null,
): HeldUnits {
  const sourceDecks = decks ?? {};
  const sourceQuizzes = quizzes ?? {};
  const sourceTakeaways = takeaways ?? {};
  const outDecks: Record<string, any[]> = { ...sourceDecks };
  const outQuizzes: Record<string, any[]> = { ...sourceQuizzes };
  const outTakeaways: Record<string, unknown> = { ...sourceTakeaways };
  const unmatched: string[] = [];
  const heldIndexes = new Map<string, Set<number>>();
  const heldLessons = new Set<string>();

  for (const hold of REVIEW_HOLDS.filter((entry) => entry.moduleKey === moduleKey)) {
    const lessonKey = Object.keys(sourceDecks).find((key) => normalise(key) === normalise(hold.lesson));
    if (!lessonKey) {
      unmatched.push(hold.id);
      continue;
    }
    if (hold.scope === 'lesson') {
      heldLessons.add(lessonKey);
      continue;
    }
    const deck = sourceDecks[lessonKey] ?? [];
    const index = deck.findIndex((card) => normalise(card?.title) === normalise(hold.chapter));
    if (index < 0) {
      unmatched.push(hold.id);
      heldLessons.add(lessonKey);
      continue;
    }
    const indexes = heldIndexes.get(lessonKey) ?? new Set<number>();
    indexes.add(index);
    heldIndexes.set(lessonKey, indexes);
  }

  for (const lessonKey of heldLessons) {
    outDecks[lessonKey] = (sourceDecks[lessonKey] ?? []).map(restrictedChapter);
    delete outQuizzes[lessonKey];
    delete outTakeaways[lessonKey];
  }

  for (const [lessonKey, indexes] of heldIndexes) {
    if (heldLessons.has(lessonKey)) continue;
    const heldModuleIds = new Set(Array.from(indexes).map((index) => String(index + 1)));
    outDecks[lessonKey] = (sourceDecks[lessonKey] ?? []).map((card, index) => (indexes.has(index) ? restrictedChapter(card) : card));
    outQuizzes[lessonKey] = (sourceQuizzes[lessonKey] ?? []).filter((question) => !heldModuleIds.has(String(question?.moduleId)));
  }

  return { decks: outDecks, quizzes: outQuizzes, takeaways: outTakeaways, unmatched };
}
