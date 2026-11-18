// Hotels & Resorts Knowledge Check v4: removes the absolute-wording cue from the distractors of the chapter-specific seeds,
// registered through a third versioned assessment migration (v3 IDs retired by the manifest, v4 IDs introduced).
// Why: in v3, 114 of 261 distractors (44%) contained an absolute word (always, never, only, every, no, alone, guarantee,
// nothing, none, nowhere, neither) against 6 of 87 correct options (7%), so a learner could avoid those options and beat chance.
// What changed: 135 distractors in 67 of the 87 seeds are reworded into wrong answers that are wrong for a concrete reason
// (a wrong mechanism, a wrong party, a wrong measure or a wrong source), with a qualifier only where the original claim was
// otherwise sound. The other 20 seeds had no absolute-word distractor and keep their v3 wording and v3 IDs.
// What did not change: the correct option of every seed (read from v3 and never restated here), the question stem, applied
// variant, chapter link and explanation (the chapter's own Key insight), the slot of every seed (so `pairedQuiz` rotation and
// question selection are unchanged and the correct option keeps its position), the length rank of the correct option in every
// seed (longest 22, second 22, third 22, shortest 21 of 87, as in v3), and the option-length spread (at most 15 characters).
// Only the question ID changes (`<lesson>-v3-<n>a|b` becomes `<lesson>-v4-<n>a|b`) and only for the seeds listed below.
// Retired IDs are never reused or edited, and stored attempts, scores, drafts and completion records are never rewritten:
// they keep the IDs of the questions answered. Held chapter M5-10 (REV-P0-01) has no entry.

import { HOTEL_KC_V3 } from './hospitalityHotelsKnowledgeChecksV3';
import type { HotelKcV2Seed } from './hospitalityHotelsKnowledgeChecksV2';

export const HOTEL_KC_V4_VERSION = 'hospitality-hotels-kc-v4';

type HotelKcV4Distractors = [string, string, string];

/** Lesson prefix → generic seed number (1-based) → the three distractors, in their v3 positions. Seeds not listed stay on v3. */
const HOTEL_KC_V4_WORDING: Record<string, Record<number, HotelKcV4Distractors>> = {
  'hospitality-hotels-m1-l1': {
    1: ["Profit is set by how many rooms are filled, because other departments earn income without added cost", "Occupancy is the single measure of hotel profitability, so a full hotel is a profitable hotel", "Food, spa and event income fall outside hotel revenue, so results depend on the rooms department"],
    5: ["The owner, operator and brand are the same business under standard contracts, so disputes come from guests", "The brand owns the building it licenses and sets its renovation budget without owner approval", "Guests choose renovation budgets under standard contracts, which leaves the owner little say"],
  },
  'hospitality-hotels-m1-l2': {
    1: ["Governments required independent inns to join chains and follow national standards", "Chains needed to own the buildings they operated, so growth followed property purchases", "Travelers lost interest in service quality, so owners sought lower prices through scale"],
    2: ["By buying the hotels that joined, so the whole system became brand-owned property", "By running hotels in their home market themselves, so owner contracts were unnecessary", "By avoiding loyalty programs and central reservation systems, which kept their costs low"],
    3: ["A franchise, under which the brand sends its own team to run the hotel", "Either model, because both transfer ownership of the hotel to the brand", "A franchise, because the owner keeps control and pays the brand a licence fee"],
    5: ["Extra facilities that pay for themselves from opening, so demand evidence is a formality", "Steady business demand that does not depend on the destination or the season", "A lower-cost stay, because shared facilities let resorts undercut hotels that sell rooms"],
  },
  'hospitality-hotels-m1-l3': {
    1: ["A single company that owns, runs, brands and sells each hotel, so economics sit in one place", "The brand, because it earns the hotel's profit and sets the return of each owner it licenses", "The guest, because guests set each price and decide which hotels survive in a market"],
    2: ["Two hotels in a country are comparable once their room counts are similar", "Hotels can be compared whenever they report the same metric, despite their segment", "Segment is a luxury concept, so other hotels compare directly in a country"],
    3: ["Supply responds to rising arrivals within weeks, so markets rarely become tight or oversupplied", "Visitor arrivals convert into rooms sold one for one, so rooms available follow demand closely", "Rooms available are fixed by the national plan, so tight markets stay tight for decades"],
    4: ["Fee revenue includes the room revenue of the hotels in the group, so the two add up", "Single hotels earn fees like groups, so group fee revenue is what gets reported", "The participant types share one business model, so their revenue is directly comparable"],
    5: ["Whether rooms were sold, because these metrics count bookings rather than room revenue", "The average rate paid for rooms sold, because the metrics leave out the pricing", "Room revenue earned per available room, because that needs a cost allocation"],
  },
  'hospitality-hotels-m1-l4': {
    1: ["Vietnamese destinations share one demand calendar, so a national average fits each market", "National averages are more accurate than regional figures, since they smooth out local noise", "Access conditions are similar across regions, so just guest origin differs between markets"],
    2: ["Both follow the same weekday business pattern, so city staffing and pricing can be copied", "Resorts keep a steady demand curve, since coastal guests travel evenly through the months of the year", "City hotels depend mainly on school holidays, so they follow the same calendar as resorts"],
    5: ["Each challenge offsets another, so the combined effect on break-even is small", "Low season lowers fixed costs in step, so the pressures ease together", "Channel cost matters during peak season, so the risks stay separate"],
  },
  'hospitality-hotels-m1-l5': {
    1: ["Both are driven by room rate, so weekday and weekend patterns come from price changes", "Leisure demand is strongest on weekdays, while business demand peaks at weekends and holidays", "Business demand depends mainly on school holidays, while leisure follows corporate calendars"],
    2: ["An annual average describes each month well, so seasonality and access are secondary", "Access affects business hotels, so a leisure resort plans around the calendar", "Seasonality removes the need for cash planning, because quiet months offset busy ones"],
    3: ["Profit moves in line with revenue, so flat revenue means flat profit despite rising costs", "Labor cost falls in step as occupancy slips, so wage rises are absorbed without margin loss", "Flow-through tracks guest satisfaction, which is separate from pay or energy costs"],
    4: ["When a system goes live on schedule, even if its data stays in separate silos", "When the hotel moves its bookings to online agencies and shrinks its own channels", "When guests are pushed to use self-service tools for routine requests during a stay"],
    5: ["The original Article 22 utilities and training clauses remain current minimums for hotels", "Voluntary certifications such as EDGE are legal minimum conditions for hotels in Vietnam", "Brand standards set a hotel's obligations, so national rules are the operator's duty"],
  },
  'hospitality-hotels-m2-l1': {
    1: ["The marketing campaign, because a confirmed booking secures the rest of the guest stay", "The booking itself, because a confirmed reservation proves service went well", "The guest's choice of booking channel, which decides how the arrival is handled"],
    2: ["Leaving the online agency to decide, since it holds the guest relationship", "Assuming the brand pays the cost, since it set the standards that failed", "Leaving roles to be settled after opening, once the first results are known"],
  },
  'hospitality-hotels-m2-l2': {
    1: ["Strong tourism markets secure a project's return, so a base case is enough for lenders", "Financing choices can be changed freely after opening, so early structure carries little risk", "Feasibility studies cover building design, so demand and cash scenarios belong to operations"],
    3: ["The franchisor, because the brand is responsible for staff wherever its name appears", "The owner, which recruits and trains the team and pays the operator a fee for advice", "The guest-facing booking intermediary, which supplies staff for rooms it sells"],
  },
  'hospitality-hotels-m2-l3': {
    1: ["Accepting requests at the lowest rate, because extra occupancy beats an empty room", "Closing housekeeping for the weekend, because short stays create too much cleaning", "Raising the public rate on each channel together, ignoring the length of stay"],
    2: ["A larger marketing budget, so more bookings force departments to coordinate", "A new loyalty tier for guests who accept later room assignments", "Later checkout times for guests, which give front office more time"],
    3: ["Events are run from the sales office, so operating departments keep their usual workload", "Events use function space and extra staff from outside, so other departments are unaffected", "Engineering is called in for building emergencies, so event plans do not involve maintenance"],
  },
  'hospitality-hotels-m2-l4': {
    1: ["Offering a bigger gesture each time, since compensation stops complaints from recurring", "Holding complaints until checkout, so one settlement covers the issues raised", "Keeping maintenance out of recovery, so front office owns each complaint"],
    2: ["Absent guests are billed the full rate, so counting each booking as a stay gives the same result", "Cancellation fees are room revenue, so counting each booking gives the correct total", "Completed stays and bookings are the same measure, so the total can be used as is"],
    3: ["Whenever data has been collected, because stored preferences can be reused for offers", "Whenever the guest's review was positive, since satisfied guests accept offers", "Whenever the guest booked through an agency, since the agency holds the consent"],
  },
  'hospitality-hotels-m2-l5': {
    2: ["Rooms sold match guests served, so breakfasts per room sold compare hotels fairly", "Breakfasts are counted per available room, so the two hotels are already comparable", "Outputs can be defined after the comparison, since each hotel reports its own totals"],
  },
  'hospitality-hotels-m2-l6': {
    1: ["Taxes collected for the government, which the brand passes on without keeping a share", "Refunds owed to guests whose bookings were made through the brand's central channels", "Payments toward the owner's building loan, arranged through the brand's lenders"],
    2: ["A stable source of demand, since one large partner cuts channel risk", "A legal requirement for Vietnamese hotels that sell through tour operators", "A cost saving with a clear upside, because commissions fall as volume rises"],
    3: ["Access to a central reservation system, which a new owner receives on joining a brand", "The service standards that the brand applies to rooms and public areas", "The reach of the loyalty program among travelers who book through the brand"],
  },
  'hospitality-hotels-m3-l1': {
    1: ["The brand fee income, because running the hotel itself removes real estate risk", "A fixed incentive fee, with the real estate risk carried by the hotel lenders", "Half the margin and half the risk, shared with the brand that licenses the name"],
    3: ["Both carry the same cost structures, because each earns fees from hotels owned by others", "Integrated resorts earn licensing fees, so their risk is lower than that of asset-light groups", "Asset-light groups own most of their hotels, so they carry the heavier fixed cost and risk"],
  },
  'hospitality-hotels-m3-l2': {
    1: ["They raise ADR, because each added category brings a higher price point without new work", "They cut maintenance workload, because each category has its own fixed upkeep cycle", "They remove pricing decisions, since each category carries one fixed rate"],
    2: ["Events peak together with leisure demand, so they can share the same staffing plan", "Events use the kitchens, staff and equipment already serving the rooms", "Events are booked on the day of arrival, so planning can wait for guest numbers"],
    3: ["They add revenue per guest at a lower margin, so their role is destination marketing", "They share room staff and capital, so they suit properties of any size", "They remove seasonality from the business, so low season stops being a concern"],
  },
  'hospitality-hotels-m3-l3': {
    1: ["The number of room nights it brings, because volume outweighs the negotiated discount", "The hotel's published rate, because a negotiated rate is set by the account itself", "The guests' review scores, because they decide whether the account renews"],
    2: ["Leisure guests buy the same product, so one room type and service set fits them", "Length of stay is a billing detail, since the nightly rate covers each service", "Families pay the highest rate, so couples and long-stay guests can be priced alike"],
  },
  'hospitality-hotels-m3-l5': {
    1: ["The commission saved, because direct bookings avoid marketing and technology cost", "Website traffic and app downloads, because these show how many guests booked", "Rate parity across channels, because direct prices must match agency prices"],
    3: ["Members stay with one program, so rivalry sits within each program's own tiers", "Loyalty programs run at a profit, since members fund them through their own points", "Hotel groups dominate loyalty programs, so rivals in other industries cannot compete"],
  },
  'hospitality-hotels-m3-l6': {
    1: ["Because holding combined roles is not allowed, so each role must be separate", "Because the brand earns the profit, so owner returns appear in its reports", "Because owners are paid by the operator, so operating results are what matter"],
    2: ["Because the payer is the guest, so a single record field is enough", "Because agents book for themselves, so separate booker data can be left out", "Because invoices go to guests, so payer fields are not needed"],
    3: ["Outsourcing hands the legal duty to the vendor, so the hotel just checks the contract price", "The original Article 22 text applies, because later amendments cover non-hotel businesses", "Brand standards govern outsourced work, so national rules bind the vendor rather than the hotel itself"],
  },
  'hospitality-hotels-m4-l1': {
    1: ["Rivalry between brands, because guests and suppliers do not affect pricing", "National tax policy and exchange rates, which set hotel prices in each market", "Guest reviews and star ratings, since these set the competitive pressure in a market"],
    3: ["Owners switch brands cheaply, while guests pay exit fees for changing hotels", "Both face the same switching costs, because each commits capital when choosing a hotel", "Switching is hard for guests because their loyalty points expire, yet easy for owners"],
  },
  'hospitality-hotels-m4-l2': {
    1: ["Groups must buy the hotels they add, so owners matter just as sellers of the buildings", "Owners leave brand choice to groups, because groups assign each property to a brand", "Guests sign the management contracts, so owners are not part of the sales effort"],
    2: ["Room count shows positioning, so the boutique hotel ranks lower on the key measures", "Small hotels earn weak returns, so their results are not worth ranking", "Boutique hotels sit in a separate market, because chain hotels differ in segment"],
    3: ["The formats share one operating pattern, so a single Vietnamese average describes them fairly", "Integrated resorts book ancillary revenue elsewhere, so their rooms results fit the urban average", "Urban hotels compete on a different basis, so their results are not worth comparing with resorts"],
  },
  'hospitality-hotels-m4-l3': {
    1: ["The hotel's legal accommodation category, which explains the gap in full", "The brand's fee income, which sets how much of the gap is owed to the owner", "National tourism growth, which explains gaps with local rivals"],
    3: ["At RevPAR itself, since it already deducts labor and departmental costs", "The brand's fee revenue, which sets how much profit a hotel keeps in total", "National visitor numbers, which set the profit of city hotels in a market"],
  },
  'hospitality-hotels-m4-l4': {
    1: ["Beach access, because hotels outside a city depend on coastal leisure demand", "School holidays, because roadside and airport hotels follow the family calendar", "Conventions, because these properties sell mostly to large organised groups"],
    2: ["Occupancy rate, because a fuller hotel earns more even after channel costs", "Gross booking value, because commissions are paid by the channel not the hotel", "The number of channels used, since each added channel lifts contribution"],
    3: ["The building's energy use, because turnover is unrelated to service consistency", "Operations stay the same, because the brand supplies trained staff to its properties", "Distribution cost, because turnover changes how much commission agencies charge"],
  },
  'hospitality-hotels-m4-l5': {
    1: ["Variable costs rise faster than revenue, so profit grows more slowly than sales", "Profit moves in line with revenue, because costs rise and fall in step with occupancy", "Fixed costs fall away in peak season, so margins widen by the same percentage"],
  },
  'hospitality-hotels-m5-l1': {
    1: ["It removes the need for guest consent, because local stories do not use personal data", "It secures higher occupancy, because cultural stories attract guests in each season of the year", "It replaces the need for service quality, since the destination itself delivers the experience"],
    2: ["Peak-season occupancy, because premium facilities pay back whenever the resort is full", "Guest satisfaction scores, because a well-reviewed facility repays its own cost", "The resort's star rating, since a higher category lets each rate rise in step with it"],
    3: ["They arrive at peak rates, so services and rate fences can stay as they were before", "They book in the peak season, so they cannot lift weak midweek or shoulder nights", "They should be measured by national trip counts, so the hotel can skip local data"],
  },
  'hospitality-hotels-m5-l2': {
    2: ["The decree requires digital check-in, so staffed reception is optional with kiosks", "Digital tools replace manual identity checks, so reception staff become unnecessary", "The original training clause requires self-service kiosks at hotel entrances"],
    3: ["Indefinitely after it is installed, because it updates itself to any change in conditions", "Whenever guests consent to reviews being shared, because reviews supply the model's data", "On fully booked dates, because sold-out nights show the true level of guest demand"],
  },
  'hospitality-hotels-m5-l3': {
    1: ["Once it sells direct, because direct bookings avoid marketing and system cost", "In cities, because agencies are cheaper than direct channels there", "When rate parity is removed, since parity prevents direct saving of commission"],
    2: ["Each owner's growth in returns, because fees fall as the brand adds more hotels", "Higher occupancy for new hotels, because the brand sends them its guests", "Lower fees for each owner, since larger systems pass on their scale savings"],
    3: ["Proposed projects are as certain as hotels under construction, so both count as supply", "Projects in final planning are already open and should be counted as existing rooms", "Pipeline phase does not affect completion, so announced rooms arrive on schedule"],
  },
  'hospitality-hotels-m5-l4': {
    2: ["Amended Article 22 covers the duties, including labor, building and guest-data rules for hotels", "The original Article 22 training clause covers labor duties, so other labor sources are optional", "Data duties pass to the vendor once it holds the data, so the hotel relies on the vendor's terms"],
    3: ["Certified claims need the label, because a label proves the savings have happened", "Baselines are needed for water use, so energy claims can stand without one", "A reduction in use proves a profit gain, so profit claims rest on that reduction"],
  },
  'hospitality-hotels-m5-l5': {
    2: ["Fixed costs stop during the works, so downtime delays revenue but does not lose it", "Downtime lifts revenue at once, because fewer rooms sell at higher rates", "Downtime affects food and beverage revenue, because rooms stay available for sale"],
  },
};

/** Same shape as the v3 seeds: everything, including the correct option, comes from v3; only the distractors are replaced. */
export const HOTEL_KC_V4: Record<string, Record<number, HotelKcV2Seed>> = (() => {
  const seeds: Record<string, Record<number, HotelKcV2Seed>> = {};
  Object.entries(HOTEL_KC_V4_WORDING).forEach(([lesson, wordings]) => {
    seeds[lesson] = {};
    Object.entries(wordings).forEach(([number, wrong]) => {
      const base = HOTEL_KC_V3[lesson]?.[Number(number)];
      if (!base) throw new Error(`Hotels KC v4 wording for ${lesson}-${number} has no v3 seed to revise`);
      seeds[lesson][Number(number)] = { ...base, wrong };
    });
  });
  return seeds;
})();

export interface HotelKcV4MigrationEntry {
  lesson: string;
  /** The v3 ID retired by this migration. */
  retiredId: string;
  /** The generic ID that v2 retired before it. */
  originalId: string;
  replacementId: string;
  chapter: number;
  migrationVersion: typeof HOTEL_KC_V4_VERSION;
}

/** Versioned assessment migration manifest (v3 to v4): every retired v3 ID and the new ID that replaces it. */
export function buildHotelKnowledgeCheckMigrationV4(): HotelKcV4MigrationEntry[] {
  return Object.entries(HOTEL_KC_V4).flatMap(([lesson, seeds]) =>
    Object.entries(seeds).flatMap(([number, seed]) =>
      (['a', 'b'] as const).map((variant) => ({
        lesson,
        retiredId: `${lesson}-v3-${number}${variant}`,
        originalId: `${lesson}-${number}${variant}`,
        replacementId: `${lesson}-v4-${number}${variant}`,
        chapter: seed.chapter,
        migrationVersion: HOTEL_KC_V4_VERSION,
      })),
    ),
  );
}

/** Renames the questions that carry v3 IDs to their v4 IDs. Everything else is returned untouched. */
export function applyHotelKnowledgeCheckV4<Q extends { id: string }>(lesson: string, questions: Q[]): Q[] {
  const revised = HOTEL_KC_V4[lesson];
  if (!revised) return questions;
  return questions.map((question) => {
    const match = question.id.match(/^(.*)-v3-(\d+)([ab])$/);
    if (!match || match[1] !== lesson || !revised[Number(match[2])]) return question;
    return { ...question, id: `${lesson}-v4-${match[2]}${match[3]}` };
  });
}
