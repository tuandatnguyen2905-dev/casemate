// Hotels & Resorts Knowledge Check v5: removes the absolute-wording cue and the length cue from the distractors of the
// EXTRA_SEEDS of hospitalityHotelsCore.tsx, registered through a fourth versioned assessment migration (the generic
// extra-seed IDs are retired by the manifest, v5 IDs introduced).
// Why: v4 cleaned the 87 chapter-specific seeds but left the 42 extra seeds (21 lessons x 2). Their 126 distractors still
// carried absolute words (always, never, only, every, no, alone, guarantee, nothing, none, nowhere, neither) in 77 of 126
// cases (61.1%) against 3 of 42 correct options (7.1%), and the correct option was the longest of four in 28 of 42 seeds
// (66.7%) with a mean spread of 29.8 characters between the longest and the shortest option (31 seeds above 15).
// What changed: 109 distractors in 39 of the 42 extra seeds are reworded into wrong answers that are wrong for a concrete
// reason (a wrong mechanism, a wrong party, a wrong measure, a reversed relationship, or something the topic really does show),
// without absolute words and without a hedging pile-up. Where a seed is reworded its three distractors are re-balanced so that
// the spread of the four options is at most 15 characters (mean 9.1 over the 42 seeds) and the correct option's length rank is
// spread evenly (longest 10, second 11, third 11, shortest 10 of 42). The 3 seeds that had no absolute-word or softer-absolute
// distractor keep their wording and their generic IDs: m2-l1 extra 1 (spread 18), m2-l2 extra 2 (spread 6) and m2-l5 extra 1 (spread 14).
// The one seed reworded without a listed absolute word is m5-l5 extra 2 ("automatically", "rarely").
// What did not change: the correct option, stem, applied variant, chapter link and explanation of every extra seed (they stay in
// hospitalityHotelsCore.tsx and are never restated here), the slot of every seed (so `pairedQuiz` rotation and question
// selection are unchanged and the correct option keeps its position), the 10 questions of every lesson, and the 87
// chapter-specific seeds handled by v2, v3 and v4.
// Slots: every lesson of modules 2 to 5 has exactly three chapter seeds, so the two extra seeds occupy generic slots 4 and 5
// (`<lesson>-4a|b` and `<lesson>-5a|b`). Only the question ID changes (`<lesson>-<n>a|b` becomes `<lesson>-v5-<n>a|b`) and only for
// the seeds listed below. Retired IDs are never reused or edited, and stored attempts, scores, drafts and completion records are
// never rewritten: they keep the IDs of the questions answered. Held chapter M5-10 (REV-P0-01, chapter 1 of m5-l4) has no entry:
// the extra seeds of m5-l4 name chapters 2 and 3.

export const HOTEL_KC_V5_VERSION = 'hospitality-hotels-kc-v5';

/** Generic slot of the first EXTRA_SEEDS entry; the second entry takes the next slot. */
export const HOTEL_KC_V5_FIRST_EXTRA_SLOT = 4;

type HotelKcV5Distractors = [string, string, string];

export interface HotelKcV5Seed {
  /** Lesson-local chapter number (1-based) named by the extra seed, the question's `moduleId`. */
  chapter: number;
  wrong: HotelKcV5Distractors;
}

const e = (chapter: number, ...wrong: HotelKcV5Distractors): HotelKcV5Seed => ({ chapter, wrong });

/** Lesson prefix → extra seed number (1 = first EXTRA_SEEDS entry, 2 = second) → chapter link and the three distractors. */
export const HOTEL_KC_V5: Record<string, Record<number, HotelKcV5Seed>> = {
  'hospitality-hotels-m2-l1': {
    2: e(3, "Room status systems settle each payment on booking, so a gap between the totals is a rounding effect", "Both figures come from one ledger on the same day, so a gap between them is an entry error", "The gap reflects guest satisfaction scores, which cut recorded revenue after the stay is over"),
  },
  'hospitality-hotels-m2-l2': {
    1: e(2, "Lower capital expenditure because premium materials are standard", "Operating cost is unchanged once the hotel has opened", "Lower staffing needs because premium rooms need less service"),
  },
  'hospitality-hotels-m2-l3': {
    1: e(1, "Commission rates drop with volume, so a full hotel lifts contribution", "Discounted rooms cost less to clean, so low rates protect contribution", "Occupancy measures service quality, so it cannot change contribution"),
    2: e(2, "The booking agency must confirm payment for the stay first", "The room must be re-listed on the booking channels first", "The previous guest must have settled the minibar account"),
  },
  'hospitality-hotels-m2-l4': {
    1: e(1, "An apology and a voucher for a later stay, leaving the room as it is until the guest leaves", "Waiting until checkout to settle the complaint, so one conversation covers the stay", "Billing the guest for the repair and offering a later checkout time as compensation"),
    2: e(3, "One is calculated directly from the other", "Both measure how clean the rooms are", "Repeat rate is a section of the review form"),
  },
  'hospitality-hotels-m2-l5': {
    2: e(3, "RevPAR already nets off operating costs", "GOPPAR counts room nights, not profit", "The two metrics move together by definition"),
  },
  'hospitality-hotels-m2-l6': {
    1: e(1, "The number of hotels and rooms that operate under the brand name, across its markets", "The reach of its reservation network, which the brand reports as part of its scale", "The range of brands and segments that the group offers to hotel owners worldwide"),
    2: e(2, "Each arrival equals one room night, so arrivals can size demand at one hotel", "Arrivals are a revenue figure, so they measure what one hotel earns", "Arrivals already match occupancy once domestic guests are excluded"),
  },
  'hospitality-hotels-m3-l1': {
    1: e(1, "GOP already deducts debt service and capital expenditure before it is reported", "Owner-operators fund debt from other income, so GOP is what reaches the owner", "GOP equals owner net cash when one entity both owns and operates the property"),
    2: e(2, "A franchisor runs daily operations for fees, while a manager licenses its brand and systems and the owner meets the costs", "Both models transfer ownership of the hotel asset to the brand, which then runs the property and keeps the profit", "Both models leave the owner in operating control, with the brand supplying standards and charging fees on room revenue"),
  },
  'hospitality-hotels-m3-l2': {
    1: e(1, "ADR rises when the hotel adds categories priced at one rate", "ADR rises when the hotel renames categories with premium labels", "ADR rises once housekeeping work per room is reduced"),
    2: e(2, "The attendance at each event compared with the same event last year", "The room revenue earned on the same dates as each banquet", "The total banquet revenue compared with the budget for the year"),
  },
  'hospitality-hotels-m3-l3': {
    1: e(2, "Housekeeping cost per stay, because longer stays raise the nightly rate and leave cleaning cost unchanged", "Business traveler demand, because long-stay guests want the same rooms and services as short-stay guests", "Seasonal occupancy, because long-stay guests arrive in peak months and pay the full published rate"),
    2: e(3, "Group blocks bring a higher ADR than transient guests", "Group demand changes F&B revenue but leaves rooms available", "It removes the cancellation risk of the dates it covers"),
  },
  'hospitality-hotels-m3-l5': {
    1: e(1, "Yes: direct bookings avoid agency commission, so website and system cost drop out of the comparison", "Yes: loyalty members book direct, and so cost less to win than agency bookings do in peak weeks", "No: direct channels cost more than agencies, since agencies carry the hotel's marketing cost"),
    2: e(3, "The date the block contract was signed", "The OTA commission charged on the block", "Loyalty points redeemed by the group"),
  },
  'hospitality-hotels-m3-l6': {
    1: e(1, "As one combined return, since a single party holds the roles", "Through the brand fee it would otherwise have paid", "Through the guest satisfaction scores of the hotel"),
    2: e(2, "The payer, booker and guest are the same person in standard contracts, so one record covers the three", "The travel agent holds the reservation, so its details are enough to serve the staying guest", "The paying company sets the service level, so the staying guest's own details can be dropped"),
  },
  'hospitality-hotels-m4-l1': {
    1: e(1, "Use national averages, because rivalry follows the same pattern in each destination and each month of the year", "Compare with the largest hotels in the country, because market share is set by room count, not by place or date", "Plan around yearly totals, because unsold room nights can be held back and sold on dates later in the year"),
    2: e(2, "Brand loyalty outweighs property condition, because loyal guests accept worn rooms to keep their points", "Guest reviews set aside maintenance once a brand is attached, so the flag decides the review score", "A premium flag brings guests in despite the repair state, so maintenance can safely be postponed"),
  },
  'hospitality-hotels-m4-l2': {
    1: e(1, "Group fee revenue and property revenue are measured the same way, so they compare directly", "Group fees are larger than the revenue of a hotel, so the comparison favours the group", "Property revenue leaves out room income, so group fee revenue is the closer match"),
    2: e(3, "The loyalty program and booking system that the property is connected to under the brand", "The service segment and brand standards that the property is meant to meet", "The brand family and category the hotel is sold under in booking channels"),
  },
  'hospitality-hotels-m4-l3': {
    1: e(1, "A comp set should span the national market, so that small city hotels and large island resorts are benchmarked together", "Room count and facilities affect costs but not the rate and occupancy that a comparison measures, so size can be left out", "The two hotels quote their rates in different currencies, so the comparison works after conversion to one currency"),
    2: e(2, "Room revenue earned per available room, which RevPAR measures directly", "The combined effect of room rate and occupancy on room revenue per room", "How room revenue performs relative to rivals in the same comp set"),
  },
  'hospitality-hotels-m4-l4': {
    1: e(1, "When the hotel is a short walk from the beach", "When rates sit below those of nearby rivals", "When the hotel has fewer facilities than rivals"),
    2: e(3, "A saving that guests accept, since older rooms sell at the same rate", "Higher achievable rates, because older assets feel authentic", "Lower labor cost, since older assets need fewer repairs"),
  },
  'hospitality-hotels-m4-l5': {
    1: e(1, "Hotel costs are mostly variable and fall in line with occupancy, so low season is easy to absorb", "Low season lowers food and beverage sales but leaves rooms on plan, so cash planning is aimed at outlets", "Room capacity can be stored for the peak season, so the weakness is a marketing gap rather than fixed cost"),
    2: e(3, "Build the full set of facilities in year one, because a complete product lifts room returns and rates", "Hold back investment in repositioning, because a repositioned hotel cannot lift its achievable rate", "Add the facilities first and look for demand afterwards, because facilities create their own bookings"),
  },
  'hospitality-hotels-m5-l1': {
    1: e(1, "Personalization raises loyalty as it collects more guest data", "Consent is needed from business travelers, not leisure guests", "Personalization can stand in for service quality at the stay"),
    2: e(2, "A strong guest review score, which shows the facilities will pay back", "The facilities that competitors already offer in the same area", "A brand-approved design for the family and wellness areas"),
  },
  'hospitality-hotels-m5-l2': {
    1: e(2, "A mobile app downloaded before arrival, with reception closed to walk-ins", "A self-service kiosk at the entrance, with staff moved to housekeeping", "Automated checks that replace the staff controls once the system is live"),
    2: e(3, "As confirmed savings that the vendor has already measured at similar hotels", "As savings tied to energy use, which the vendor's own report is enough to prove", "As proof that staff oversight of room settings is not needed from now on"),
  },
  'hospitality-hotels-m5-l3': {
    1: e(2, "Group portfolio growth lifts each owner's returns", "Asset-light models cover owners' capital spend", "Fees fall as the brand adds more hotels"),
    2: e(3, "Announced projects and open hotels, because both add to supply from the date of the announcement", "Announced projects and future occupancy, because announcements show how many nights will sell", "Pipeline and openings, because funded projects count as open rooms from the announcement"),
  },
  'hospitality-hotels-m5-l4': {
    1: e(2, "Outsourcing security or data work moves the duty to the vendor", "Duties cover work done by hotel staff, not vendor work", "Duties on guest data end once a vendor stores it"),
    2: e(3, "EDGE thresholds promise a fixed profit uplift once a hotel has met them", "EDGE thresholds are fixed national standards set without a local baseline", "EDGE thresholds measure guest satisfaction rather than resource use"),
  },
  'hospitality-hotels-m5-l5': {
    1: e(2, "The number of wellness and event facilities that competitors already have in the destination", "The extra revenue that each product could add, with its cost judged after the works are done", "Guest reviews from the previous year, because past comments show demand for the new products"),
    2: e(3, "Going live on schedule proves the investment has paid off", "New systems cut labour cost from go-live, so payback follows adoption", "Technology changes front-office tasks but not productivity"),
  },
};

/** Replaces the distractors of an extra seed. Everything else, including the correct option, stays as the core defines it. */
export function reviseHotelExtraSeedV5<S extends { wrong: [string, string, string] }>(lesson: string, extraNumber: number, seed: S): S {
  const revised = HOTEL_KC_V5[lesson]?.[extraNumber];
  return revised ? { ...seed, wrong: revised.wrong } : seed;
}

export interface HotelKcV5MigrationEntry {
  lesson: string;
  /** The generic ID retired by this migration. */
  retiredId: string;
  replacementId: string;
  chapter: number;
  migrationVersion: typeof HOTEL_KC_V5_VERSION;
}

/** Versioned assessment migration manifest (generic extra-seed IDs to v5): every retired ID and the new ID that replaces it. */
export function buildHotelKnowledgeCheckMigrationV5(): HotelKcV5MigrationEntry[] {
  return Object.entries(HOTEL_KC_V5).flatMap(([lesson, seeds]) =>
    Object.entries(seeds).flatMap(([extraNumber, seed]) => {
      const slot = HOTEL_KC_V5_FIRST_EXTRA_SLOT + Number(extraNumber) - 1;
      return (['a', 'b'] as const).map((variant) => ({
        lesson,
        retiredId: `${lesson}-${slot}${variant}`,
        replacementId: `${lesson}-v5-${slot}${variant}`,
        chapter: seed.chapter,
        migrationVersion: HOTEL_KC_V5_VERSION,
      }));
    }),
  );
}

/** Renames the questions generated from revised extra seeds to their v5 IDs. Everything else is returned untouched. */
export function applyHotelKnowledgeCheckV5<Q extends { id: string }>(lesson: string, questions: Q[]): Q[] {
  const revised = HOTEL_KC_V5[lesson];
  if (!revised) return questions;
  return questions.map((question) => {
    const match = question.id.match(/^(.*)-(\d+)([ab])$/);
    if (!match || match[1] !== lesson || !revised[Number(match[2]) - HOTEL_KC_V5_FIRST_EXTRA_SLOT + 1]) return question;
    return { ...question, id: `${lesson}-v5-${match[2]}${match[3]}` };
  });
}
