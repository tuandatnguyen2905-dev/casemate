// GENERATED - Casemate Case Journey registry.
//
// A Case Journey is one business decision broken into linked drills:
// stage 1 diagnoses, stage 2 quantifies the implication, stage 3 commits to a
// defensible decision. Every drill is also a standalone library question, so a
// candidate can practise a single skill without running the whole journey.

import { CASE_JOURNEY_DRILLS_A } from './caseJourneyContentA';
import { CASE_JOURNEY_DRILLS_B } from './caseJourneyContentB';
import { CASE_JOURNEY_DRILLS_C } from './caseJourneyContentC';
import { CASE_JOURNEY_DRILLS_D } from './caseJourneyContentD';
import { CASE_JOURNEY_DRILLS_E1 } from './caseJourneyContentE1';
import { CASE_JOURNEY_DRILLS_E2 } from './caseJourneyContentE2';
import { CASE_JOURNEY_DRILLS_F1 } from './caseJourneyContentF1';
import { CASE_JOURNEY_DRILLS_F2 } from './caseJourneyContentF2';
import { CASE_JOURNEY_DRILLS_G1 } from './caseJourneyContentG1';
import { CASE_JOURNEY_DRILLS_G2 } from './caseJourneyContentG2';
import { CASE_JOURNEY_DRILLS_G3 } from './caseJourneyContentG3';
import { CASE_JOURNEY_DRILLS_G4 } from './caseJourneyContentG4';
import { CASE_JOURNEY_DRILLS_G5 } from './caseJourneyContentG5';
import { CASE_JOURNEY_DRILLS_G6 } from './caseJourneyContentG6';
import { CASE_JOURNEY_DRILLS_G7 } from './caseJourneyContentG7';
import { CASE_JOURNEY_DRILLS_G8 } from './caseJourneyContentG8';
import { CASE_JOURNEY_DRILLS_G9 } from './caseJourneyContentG9';
import type { LibraryQuestion, LibrarySkill } from './skillQuestionLibrary';

export interface CaseJourney {
  id: string;
  name: string;
  company: string;
  industry: string;
  domain: string;
  businessProblem: string;
  decision: string;
  timeframe: string;
  role: string;
  analyticalApproach: string;
  provenance: 'constructed-from-source-structure' | 'original';
  drillIds: string[];
  skills: LibrarySkill[];
  casePoolRef: string | null;
}

// Public Case Pool eligibility follows data/case-journey-manifest.json exactly:
// jrn-11/12 are complete original cases and jrn-13..24 are source-aligned.
// jrn-01..10 remain visible in Case Drill but are withheld from Case Pool until
// their manifest reviewStatus moves beyond needs-source-alignment.
export const CASE_POOL_ELIGIBLE_JOURNEY_IDS = new Set([
  'jrn-11', 'jrn-12', 'jrn-13', 'jrn-14', 'jrn-15', 'jrn-16', 'jrn-17',
  'jrn-18', 'jrn-19', 'jrn-20', 'jrn-21', 'jrn-22', 'jrn-23', 'jrn-24',
]);

export function casePoolCaseIdForJourney(journeyId: string | null | undefined): string | null {
  return journeyId && CASE_POOL_ELIGIBLE_JOURNEY_IDS.has(journeyId) ? `case-${journeyId}` : null;
}

export const CASE_JOURNEYS: CaseJourney[] = [{ id: 'jrn-01', name: 'Arctis - The Summer That Did Not Arrive', company: 'Arctis', industry: 'FMCG - frozen desserts', domain: 'FMCG', businessProblem: 'Volume decline in a growing category', decision: 'Fund a national summer trade-promotion package, or rebuild cold-chain distribution first.', timeframe: 'FY2025–FY2026', role: 'You are the commercial analyst supporting the Vietnam country manager.', analyticalApproach: 'Growth decomposition', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-701', 'calculations-journey-702', 'structures-journey-703'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-02', name: 'Velta - Growth That Costs More Than It Earns', company: 'Velta', industry: 'FMCG - beverages', domain: 'FMCG', businessProblem: 'Channel mix shift diluting margin', decision: 'Whether to keep scaling the e-commerce channel at its current economics.', timeframe: 'FY2025–FY2026', role: 'You are supporting Velta’s commercial director ahead of the FY2027 channel plan.', analyticalApproach: 'Channel strategy', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-704', 'calculations-journey-705', 'charts-journey-706'], skills: ['charts', 'calculations'], casePoolRef: null }, { id: 'jrn-03', name: 'Solara - The Campaign That Built Awareness and Lost Buyers', company: 'Solara', industry: 'Beauty and personal care', domain: 'Marketing', businessProblem: 'Marketing spend not converting to sales', decision: 'Where to move 30 billion VND of next-year media budget.', timeframe: 'FY2026', role: 'You are advising Solara’s head of brand ahead of the FY2027 media plan.', analyticalApproach: 'Marketing effectiveness', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-707', 'calculations-journey-708', 'creativity-journey-709'], skills: ['charts', 'calculations', 'creativity'], casePoolRef: null }, { id: 'jrn-04', name: 'Verdant Foods - Growing Into a Cash Crisis', company: 'Verdant Foods', industry: 'Packaged food manufacturing', domain: 'Finance', businessProblem: 'Working capital absorbing all profit', decision: 'Whether to fund further growth or release cash from the balance sheet first.', timeframe: 'FY2024–FY2026', role: 'You are supporting the CFO ahead of a bank covenant review.', analyticalApproach: 'Working capital', provenance: 'constructed-from-source-structure', drillIds: ['calculations-journey-710', 'charts-journey-711', 'structures-journey-712'], skills: ['calculations', 'charts', 'structures'], casePoolRef: null }, { id: 'jrn-05', name: 'Anvil Components - The Line That Cannot Keep Up', company: 'Anvil Components', industry: 'Industrial manufacturing', domain: 'Operations', businessProblem: 'Capacity constraint limiting revenue', decision: 'Buy a second heat-treatment line or recover capacity from the existing one.', timeframe: 'FY2026', role: 'You are advising the plant director on a 48 billion VND capital request.', analyticalApproach: 'Capacity and supply chain', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-713', 'calculations-journey-714', 'structures-journey-715'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-06', name: 'Kaya Foods - Sizing a Border Before Crossing It', company: 'Kaya Foods', industry: 'Packaged food - international expansion', domain: 'Market entry', businessProblem: 'Market entry sizing and mode choice', decision: 'Whether to enter a neighbouring market, and through which route.', timeframe: 'FY2027 entry plan', role: 'You are on the strategy team supporting Kaya’s regional managing director.', analyticalApproach: 'Market entry', provenance: 'constructed-from-source-structure', drillIds: ['market-sizing-journey-716', 'charts-journey-717', 'structures-journey-718'], skills: ['market-sizing', 'charts', 'structures'], casePoolRef: null }, { id: 'jrn-07', name: 'Orbita - A Price Ladder Nobody Climbs', company: 'Orbita', industry: 'Telecommunications', domain: 'Commercial strategy', businessProblem: 'Pricing architecture suppressing upgrades', decision: 'Whether to re-architect the plan ladder or raise prices across the board.', timeframe: 'FY2026', role: 'You are advising Orbita’s consumer pricing lead.', analyticalApproach: 'Pricing and promotions', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-719', 'calculations-journey-720', 'creativity-journey-721'], skills: ['charts', 'calculations', 'creativity'], casePoolRef: null }, { id: 'jrn-08', name: 'Lotus Court - Which Stores Actually Earn Their Space', company: 'Lotus Court', industry: 'Specialty retail', domain: 'Commercial strategy', businessProblem: 'Store network productivity and portfolio choice', decision: 'Which store formats to grow, hold, or exit at lease renewal.', timeframe: 'FY2026', role: 'You are supporting the retail director ahead of a lease-renewal cycle.', analyticalApproach: 'Portfolio choices', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-722', 'calculations-journey-723', 'structures-journey-724'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-09', name: 'Tutorloop - Buying Students Who Leave', company: 'Tutorloop', industry: 'Online education', domain: 'Other business problems', businessProblem: 'Subscription churn and acquisition quality', decision: 'Whether to keep scaling paid acquisition or change how students are acquired.', timeframe: 'FY2026', role: 'You are advising Tutorloop’s growth lead before the Series A data room opens.', analyticalApproach: 'Customer segmentation', provenance: 'constructed-from-source-structure', drillIds: ['market-sizing-journey-725', 'charts-journey-726', 'creativity-journey-727'], skills: ['market-sizing', 'charts', 'creativity'], casePoolRef: null }, { id: 'jrn-10', name: 'Swiftline - The Parcel That Comes Back', company: 'Swiftline', industry: 'Parcel logistics', domain: 'Operations', businessProblem: 'Service failure driving cost', decision: 'Whether to invest in parcel lockers or fix delivery execution.', timeframe: 'FY2026', role: 'You are advising Swiftline’s chief operating officer.', analyticalApproach: 'Profitability recovery', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-728', 'calculations-journey-729', 'structures-journey-730'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-11', name: 'Corvex Cloud - The Churn Behind the Growth Number', company: 'Corvex Cloud', industry: 'B2B software', domain: 'Original - technology', businessProblem: 'Net revenue retention and segment economics', decision: 'Whether to keep serving the SMB segment, and where to put the customer-success budget.', timeframe: 'FY2026', role: 'You are advising Corvex’s chief revenue officer before the FY2027 plan.', analyticalApproach: 'Growth decomposition', provenance: 'original', drillIds: ['charts-journey-731', 'calculations-journey-732', 'structures-journey-733'], skills: ['charts', 'calculations', 'structures'], casePoolRef: 'Related full case: SaaS retention and segment strategy (Case Pool)' }, { id: 'jrn-12', name: 'Harborlight Clinics - Full on Saturday, Empty on Tuesday', company: 'Harborlight Clinics', industry: 'Private healthcare', domain: 'Original - healthcare', businessProblem: 'Capacity utilisation and demand shaping', decision: 'Whether to open a fourth clinic or fill the capacity already built.', timeframe: 'FY2026', role: 'You are advising the managing director of a three-clinic private group.', analyticalApproach: 'Capacity and supply chain', provenance: 'original', drillIds: ['market-sizing-journey-734', 'charts-journey-735', 'creativity-journey-736'], skills: ['market-sizing', 'charts', 'creativity'], casePoolRef: 'Related full case: healthcare capacity and demand shaping (Case Pool)' }, { id: 'jrn-13', name: 'VitaFlow - The 4pm Moment', company: 'VitaFlow', industry: 'FMCG - dairy and chilled drinks', domain: 'Marketing', businessProblem: 'Premium positioning and consumption-occasion choice', decision: 'Which consumption moment to own, and which selling model reaches it.', timeframe: 'Year 1 launch plan', role: 'You are the brand manager launching a premium adult drinking yogurt.', analyticalApproach: 'Marketing effectiveness', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-737', 'calculations-journey-738', 'creativity-journey-739'], skills: ['charts', 'calculations', 'creativity'], casePoolRef: null }, { id: 'jrn-14', name: 'SweetVale - The Candy Aisle Stops Growing', company: 'SweetVale', industry: 'FMCG - confectionery', domain: 'FMCG', businessProblem: 'Portfolio concentrated in declining segments', decision: 'Whether to defend the candy core or enter health and wellness snacking, and how.', timeframe: 'Prior MAT to year 3', role: 'You are advising the commercial director of the confectionery share leader.', analyticalApproach: 'Portfolio choices', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-740', 'calculations-journey-741', 'structures-journey-742'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-15', name: 'CleanCo × GreenMart - The Plan Both Sides Can Sign', company: 'CleanCo', industry: 'FMCG - home and fabric care', domain: 'Commercial strategy', businessProblem: 'Retailer mix trading the category down', decision: 'Which joint business plan to take to a key retailer whose own numbers argue the other way.', timeframe: 'Current year to next year', role: 'You are the CleanCo category manager preparing the GreenMart annual plan.', analyticalApproach: 'Channel strategy', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-743', 'calculations-journey-744', 'structures-journey-745'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-16', name: 'ActiveShield - The Benefit Space Nobody Owns', company: 'ActiveShield', industry: 'Beauty and personal care', domain: 'Marketing', businessProblem: 'Line extension into an underserved consumer segment', decision: 'Which benefit space, which ingredient anchor, and how to deploy a 30 billion VND launch.', timeframe: 'Year 1 launch plan', role: 'You are the innovation lead building a men’s advanced-care body-wash line.', analyticalApproach: 'Marketing effectiveness', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-746', 'market-sizing-journey-747', 'creativity-journey-748'], skills: ['charts', 'market-sizing', 'creativity'], casePoolRef: null }, { id: 'jrn-17', name: 'PacificBev - The Profit That Improved Without Revenue', company: 'PacificBev', industry: 'FMCG - beverages', domain: 'Finance', businessProblem: 'Profitability improving while volume declines', decision: 'Which three actions to take to the board after a margin-expansion year.', timeframe: 'Y1–Y3', role: 'You are supporting a newly appointed CFO reviewing three years of results.', analyticalApproach: 'Profitability recovery', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-749', 'calculations-journey-750', 'structures-journey-751'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-18', name: 'PacificBev - The Peak and the Reversal', company: 'PacificBev', industry: 'FMCG - beverages', domain: 'Finance', businessProblem: 'Profit collapse after a record year', decision: 'Which margin-recovery lever to commit to, and how much volume to risk.', timeframe: 'Y4–Y7', role: 'You are advising the CFO on a board commitment to restore operating margin above 20%.', analyticalApproach: 'Profitability recovery', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-752', 'calculations-journey-753', 'structures-journey-754'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-19', name: 'FrostyBite - The Premium Entrant', company: 'FrostyBite', industry: 'FMCG - frozen desserts', domain: 'Commercial strategy', businessProblem: 'Premium entrant disrupting a single-incumbent category', decision: 'What to delist, what to reprice, and whether to launch a premium single-serve.', timeframe: 'Last year to next year', role: 'You are advising the commercial director of the incumbent ice-cream brand.', analyticalApproach: 'Portfolio choices', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-755', 'calculations-journey-756', 'structures-journey-757'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-20', name: 'BakePure - Thirty Years Old and Feeling It', company: 'BakePure', industry: 'FMCG - packaged bakery', domain: 'Marketing', businessProblem: 'Brand equity decline driving volume loss', decision: 'How to split 12 billion VND between volume recovery and brand equity.', timeframe: 'H1 this year to next twelve months', role: 'You are the marketing manager asked to recover both volume and brand meaning.', analyticalApproach: 'Marketing effectiveness', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-758', 'calculations-journey-759', 'creativity-journey-760'], skills: ['charts', 'calculations', 'creativity'], casePoolRef: null }, { id: 'jrn-21', name: 'DairyPeak - Twenty to Forty', company: 'DairyPeak', industry: 'Dairy - out-of-home channel', domain: 'Commercial strategy', businessProblem: 'Channel collapse and margin erosion', decision: 'Whether to rebuild the channel that closed or re-aim at venues that stayed open.', timeframe: 'Y1–Y4 and a four-year plan', role: 'You are advising the out-of-home channel director on a 40% share ambition.', analyticalApproach: 'Channel strategy', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-761', 'market-sizing-journey-762', 'structures-journey-763'], skills: ['charts', 'market-sizing', 'structures'], casePoolRef: null }, { id: 'jrn-22', name: 'PawJoy - A New Line in a Shifting Aisle', company: 'PawJoy', industry: 'Pet food', domain: 'Commercial strategy', businessProblem: 'Margin erosion as the channel mix shifts', decision: 'Which new product concept to launch, and into which channels.', timeframe: 'Y1–Y3 and a launch plan', role: 'You are the strategic director writing the new-line business case.', analyticalApproach: 'Customer segmentation', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-764', 'calculations-journey-765', 'creativity-journey-766'], skills: ['charts', 'calculations', 'creativity'], casePoolRef: null }, { id: 'jrn-23', name: 'Summit Gear - Buying the Backpack Market', company: 'Summit Gear', industry: 'Outdoor equipment', domain: 'Finance', businessProblem: 'Acquisition decision in a maturing segment', decision: 'Whether to acquire a backpack specialist at the asking price, bid lower, or walk away.', timeframe: 'Y1–Y6 and a three-year outlook', role: 'You are advising the Summit Gear board ahead of a Friday decision.', analyticalApproach: 'Portfolio choices', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-767', 'calculations-journey-768', 'structures-journey-769'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }, { id: 'jrn-24', name: 'TangyTaste - Top Three in Five Years', company: 'TangyTaste', industry: 'FMCG - cooking and table sauces', domain: 'Commercial strategy', businessProblem: 'Sub-scale brand with a share ambition', decision: 'Which route to a top-three position also clears a double-digit margin condition.', timeframe: 'Current year to year five', role: 'You are advising the commercial director of the number-five soy sauce brand.', analyticalApproach: 'Market entry', provenance: 'constructed-from-source-structure', drillIds: ['charts-journey-770', 'calculations-journey-771', 'structures-journey-772'], skills: ['charts', 'calculations', 'structures'], casePoolRef: null }];

export const CASE_JOURNEY_DRILLS: LibraryQuestion[] = [
  ...CASE_JOURNEY_DRILLS_A,
  ...CASE_JOURNEY_DRILLS_B,
  ...CASE_JOURNEY_DRILLS_C,
  ...CASE_JOURNEY_DRILLS_D,
  ...CASE_JOURNEY_DRILLS_E1,
  ...CASE_JOURNEY_DRILLS_E2,
  ...CASE_JOURNEY_DRILLS_F1,
  ...CASE_JOURNEY_DRILLS_F2,
  ...CASE_JOURNEY_DRILLS_G1,
  ...CASE_JOURNEY_DRILLS_G2,
  ...CASE_JOURNEY_DRILLS_G3,
  ...CASE_JOURNEY_DRILLS_G4,
  ...CASE_JOURNEY_DRILLS_G5,
  ...CASE_JOURNEY_DRILLS_G6,
  ...CASE_JOURNEY_DRILLS_G7,
  ...CASE_JOURNEY_DRILLS_G8,
  ...CASE_JOURNEY_DRILLS_G9,
];

const DRILLS_BY_ID = new Map(CASE_JOURNEY_DRILLS.map((drill) => [drill.id, drill]));
const JOURNEYS_BY_ID = new Map(CASE_JOURNEYS.map((journey) => [journey.id, journey]));

export function journeyFor(drill: Pick<LibraryQuestion, 'journeyId'>): CaseJourney | null {
  return drill.journeyId ? JOURNEYS_BY_ID.get(drill.journeyId) || null : null;
}

export function drillsInJourney(journeyId: string): LibraryQuestion[] {
  const journey = JOURNEYS_BY_ID.get(journeyId);
  if (!journey) return [];
  return journey.drillIds.map((id) => DRILLS_BY_ID.get(id)).filter((drill): drill is LibraryQuestion => Boolean(drill));
}

export function nextInJourney(drill: LibraryQuestion): LibraryQuestion | null {
  if (!drill.journeyId) return null;
  const siblings = drillsInJourney(drill.journeyId);
  const position = siblings.findIndex((item) => item.id === drill.id);
  return position >= 0 && position < siblings.length - 1 ? siblings[position + 1] : null;
}

export function journeyDrillsForSkill(skill: LibrarySkill): LibraryQuestion[] {
  return CASE_JOURNEY_DRILLS.filter((drill) => drill.skill === skill);
}

export const SHARED_CASE_DRILL_POOL_MAPPING = CASE_JOURNEYS
  .filter((journey) => CASE_POOL_ELIGIBLE_JOURNEY_IDS.has(journey.id))
  .map((journey) => ({
    casePoolId: casePoolCaseIdForJourney(journey.id) as string,
    journeyId: journey.id,
    drillIds: [...journey.drillIds],
  }));

function nearlyEqual(left: number, right: number, tolerance = 0.11): boolean {
  return Math.abs(left - right) <= tolerance;
}

function statedWaterfallClose(footnote: string | undefined): number | null {
  const match = String(footnote || '').match(/closing(?:\s+(?:arr|value))?\s*(?:is\s*)?(?:vnd|usd)?\s*([\d,]+(?:\.\d+)?)/i);
  if (!match) return null;
  const value = Number(match[1].replace(/,/g, ''));
  return Number.isFinite(value) ? value : null;
}

/**
 * Mathematical and identity checks for every journey shared by Case Drill and
 * Case Pool. Case Pool consumes these exact drill and exhibit objects, so one
 * passing source audit proves both surfaces use identical figures.
 */
export function validateSharedCaseDataIntegrity(): string[] {
  const errors: string[] = [];
  if (SHARED_CASE_DRILL_POOL_MAPPING.length !== CASE_POOL_ELIGIBLE_JOURNEY_IDS.size) {
    errors.push('Shared Case Mapping Does Not Cover Every Eligible Case Pool Journey.');
  }

  SHARED_CASE_DRILL_POOL_MAPPING.forEach(({ casePoolId, journeyId, drillIds }) => {
    const drills = drillsInJourney(journeyId);
    if (drills.length !== drillIds.length || drills.some((drill, index) => drill.id !== drillIds[index])) {
      errors.push(`${casePoolId} Drill IDs Do Not Match Its Canonical Journey Order.`);
    }
    if (drillIds.length !== 3) errors.push(`${casePoolId} Must Map To Exactly Three Case Drill Questions.`);

    drills.forEach((drill) => {
      const exhibits = drill.exhibits || (drill.exhibit ? [drill.exhibit] : []);
      exhibits.forEach((exhibit) => {
        const categories = (exhibit.categories || exhibit.labels || []).map(String);
        const series = exhibit.series || (exhibit.values ? [{ name: 'Value', values: exhibit.values }] : []);
        series.forEach((item) => {
          if (item.values.length !== categories.length || item.values.some((value) => !Number.isFinite(Number(value)))) {
            errors.push(`${drill.id} / ${exhibit.id || exhibit.title} Has Invalid Chart Dimensions Or Values.`);
          }
        });

        if (exhibit.kind === 'waterfall' && series[0]) {
          const values = series[0].values.map(Number);
          const finalLabel = categories[categories.length - 1] || '';
          const suppliedEnding = values[values.length - 1];
          const calculatedBeforeEnding = values.slice(0, -1).reduce((sum, value) => sum + value, 0);
          const finalLabelIsEnding = /\b(?:closing|ending|final|end value|at test|target|addressable|store profit|gross profit|net debt|operating profit|arr|ebit|ebitda|revenue)\b/i.test(finalLabel);
          const finalValueIsEnding = values.length > 1 && nearlyEqual(suppliedEnding, calculatedBeforeEnding);
          const hasExplicitEnding = values.length > 1 && (finalLabelIsEnding || finalValueIsEnding);
          const calculatedClose = hasExplicitEnding
            ? calculatedBeforeEnding
            : values.reduce((sum, value) => sum + value, 0);
          const statedClose = statedWaterfallClose(exhibit.footnote);
          const expectedClose = hasExplicitEnding ? suppliedEnding : statedClose;
          if (expectedClose !== null && !nearlyEqual(calculatedClose, expectedClose)) {
            errors.push(`${drill.id} / ${exhibit.id || exhibit.title} Waterfall Movements End At ${calculatedClose.toFixed(1)}, Not Its Supplied Ending Total ${expectedClose.toFixed(1)}.`);
          }
        }

        if ((exhibit.kind === 'pie' || exhibit.kind === 'donut') && /percent|%/i.test(exhibit.unit || '') && series[0]) {
          const total = series[0].values.reduce((sum, value) => sum + Number(value), 0);
          if (!nearlyEqual(total, 100, 2)) errors.push(`${drill.id} / ${exhibit.id || exhibit.title} Percentage Slices Total ${total.toFixed(1)}%, Not Approximately 100%.`);
        }

        if (exhibit.kind === 'stacked-100') {
          categories.forEach((category, categoryIndex) => {
            const total = series.reduce((sum, item) => sum + Number(item.values[categoryIndex] || 0), 0);
            if (!nearlyEqual(total, 100, 2)) errors.push(`${drill.id} / ${exhibit.id || exhibit.title} / ${category} Totals ${total.toFixed(1)}%, Not Approximately 100%.`);
          });
        }
      });
    });
  });
  return errors;
}

const SHARED_CASE_EXHIBITS = SHARED_CASE_DRILL_POOL_MAPPING.flatMap(({ journeyId }) =>
  drillsInJourney(journeyId).flatMap((drill) => drill.exhibits || (drill.exhibit ? [drill.exhibit] : [])),
);

export const SHARED_CASE_DATA_INTEGRITY_AUDIT = {
  sharedCases: SHARED_CASE_DRILL_POOL_MAPPING.length,
  sharedQuestions: SHARED_CASE_DRILL_POOL_MAPPING.reduce((sum, item) => sum + item.drillIds.length, 0),
  exhibitsChecked: SHARED_CASE_EXHIBITS.length,
  waterfallsChecked: SHARED_CASE_EXHIBITS.filter((exhibit) => exhibit.kind === 'waterfall').length,
  compositionChartsChecked: SHARED_CASE_EXHIBITS.filter((exhibit) => ['pie', 'donut', 'stacked-100'].includes(exhibit.kind)).length,
  roundingTolerance: 'Displayed figures reconcile within ±0.1 in their stated unit; percentage compositions within ±2 points.',
  mapping: SHARED_CASE_DRILL_POOL_MAPPING,
  validationErrors: validateSharedCaseDataIntegrity(),
};

/** Structural integrity checks surfaced alongside the core library validator. */
export function validateCaseJourneys(): string[] {
  const errors: string[] = [...validateSharedCaseDataIntegrity()];
  const seen = new Set<string>();
  CASE_JOURNEY_DRILLS.forEach((drill) => {
    if (seen.has(drill.id)) errors.push(`Journey Drill ${drill.id} Is Duplicated.`);
    seen.add(drill.id);
    if (!drill.journeyId || !JOURNEYS_BY_ID.has(drill.journeyId)) errors.push(`Journey Drill ${drill.id} Has No Registered Journey.`);
    if (!drill.exhibits?.length) errors.push(`Journey Drill ${drill.id} Has No Exhibits.`);
    if (!drill.modelAnswerSections?.keyInsight) errors.push(`Journey Drill ${drill.id} Has No Model Answer.`);
    if (!drill.scoringRubric?.length) errors.push(`Journey Drill ${drill.id} Has No Rubric.`);
  });
  CASE_JOURNEYS.forEach((journey) => {
    const missing = journey.drillIds.filter((id) => !DRILLS_BY_ID.has(id));
    if (missing.length) errors.push(`Journey ${journey.id} References Missing Drills: ${missing.join(', ')}.`);
    if (journey.drillIds.length < 2) errors.push(`Journey ${journey.id} Needs At Least Two Linked Drills.`);
  });
  return errors;
}
