// Hotels & Resorts Knowledge Check v3: a wording rebalance of the 87 chapter-specific v2 seeds, registered through a
// second versioned assessment migration (v2 IDs retired by the manifest, v3 IDs introduced). Question stems, applied
// variants, chapter links and the explanation (the chapter's own Key insight, supplied by the deck at build time) are
// inherited unchanged from v2; only the answer options are reworded, for two reasons:
//   1. Length cue. In v2 the correct option was the second longest of four in 146 of 174 questions (83.9%) because the
//      first distractor was lengthened to sit just above it. The four options of every seed now have similar lengths
//      (spread of at most 15 characters, 9 on average) and the correct option's length rank is spread evenly:
//      longest 22, second 22, third 22, shortest 21 of the 87 seeds. Seed a and b share the same option set, so the same
//      split holds across the 174 questions (44 / 44 / 44 / 42).
//   2. Redundant distractors. In m2-l2-3, m2-l3-1, m3-l1-2, m3-l6-3, m5-l1-2 and m5-l5-3 one distractor was a shortened
//      copy of another; each now has three distinct wrong answers.
// Each replaced seed keeps its slot, so `pairedQuiz` still rotates its options and selects its questions exactly as before:
// the correct option keeps its position. Only the question ID changes (`<lesson>-v2-<n>a|b` becomes
// `<lesson>-v3-<n>a|b`). Retired IDs are never reused or edited, and stored attempts, scores, drafts and completion
// records are never rewritten: they keep the IDs of the questions answered. Held chapter M5-10 (REV-P0-01) has no entry.

import { HOTEL_KC_V2 } from './hospitalityHotelsKnowledgeChecksV2';
import type { HotelKcV2Seed } from './hospitalityHotelsKnowledgeChecksV2';

export const HOTEL_KC_V3_VERSION = 'hospitality-hotels-kc-v3';

type HotelKcV3Wording = readonly [correct: string, wrong: [string, string, string]];

/** Lesson prefix → generic seed number (1-based) → reworded correct option and three distractors. */
const HOTEL_KC_V3_WORDING: Record<string, Record<number, HotelKcV3Wording>> = {
  'hospitality-hotels-m1-l1': {
    1: ["Hotels sell time-limited capacity plus services, and each added department brings its own costs", ["Profit depends on how many rooms are filled, since other departments add income at no extra cost", "Occupancy is the single measure of hotel profitability, so a full hotel is a profitable hotel", "Food, spa and event income sit outside hotel revenue, so only the rooms department counts toward results"]],
    2: ["It perishes each night while most costs stay fixed, so an unsold night is lost", ["It can be held for busier dates, so an unsold night is seldom a real loss", "Its capacity stretches with demand, so peak nights rarely turn guests away", "Its costs fall to near zero when empty, so an unsold night costs the hotel little"]],
    3: ["What the property sells, to whom and under which legal accommodation category", ["Whether the building carries an international brand name and a recognised star rating", "The number of floors and rooms in the building, compared with other local properties", "Whether the property operates its own restaurant, spa or meeting facilities"]],
    4: ["Its broader onsite amenities need more teams and staff to deliver", ["Fewer onsite amenities mean guests need more help from each staff member", "Staffing depends on room count rather than on how many services are offered", "Full-service hotels drop restaurants and meeting space, which keeps teams small"]],
    5: ["Ownership, operation and branding can sit with separate businesses that measure success differently", ["The owner, operator and brand are one business under every contract, so any dispute comes from guests", "The brand owns the building it licenses and sets its renovation budget without owner approval", "Guests choose renovation budgets under standard contracts, which leaves the owner little say"]],
  },
  'hospitality-hotels-m1-l2': {
    1: ["Guests wanted predictable quality and owners wanted help reaching distant travelers", ["Governments required independent inns to join chains and follow national standards", "Chains had to own every building they operated, so growth followed property purchases", "Travelers lost interest in service quality, so owners sought lower prices through scale"]],
    2: ["By selling brand, booking network and loyalty access to many owners under contracts", ["By buying most hotels that joined, so every property in the system was brand-owned", "By operating only hotels in their home country, which avoided any need for contracts", "By avoiding loyalty programs and central reservation systems, which kept their costs low"]],
    3: ["A management contract, under which the operator runs the hotel in return for fees", ["A franchise, under which the brand sends its own team to run the hotel", "Neither model, because both transfer ownership of the hotel to the brand", "A franchise, because it removes every fee the owner would otherwise pay"]],
    4: ["Present destinations and the accommodation framework, not a dated growth history", ["A year-by-year record of hotel openings and occupancy showing how fast the sector grew", "Verified occupancy trends for each region, with comparable growth rates", "A complete list of operators with their annual returns and ownership structures"]],
    5: ["A coherent destination stay that leisure guests may pay more for than rooms alone", ["Extra facilities that add income without fixed cost, so no demand evidence is needed", "Steady business demand that does not depend on the destination or the season", "A lower-cost stay, because shared facilities let resorts price below rooms-only hotels"]],
  },
  'hospitality-hotels-m1-l3': {
    1: ["The separate owner, operator, brand and distributor roles, each holding part of the economics", ["A single company that owns, runs, brands and sells each hotel, so economics sit in one place", "The brand alone, because it earns the hotel's profit and sets every owner's return", "The guest alone, because guests set every price and decide which hotels survive in a market"]],
    2: ["Comparisons are fair only within the same segment, location type and demand type", ["Any two hotels in a country are comparable once their room counts are similar", "Hotels can be compared whenever they report the same metric, whatever their segment", "Segment matters only in luxury markets, so other hotels compare directly"]],
    3: ["New rooms take time to build, so supply lags and markets swing between tight and oversupplied", ["Supply responds to rising arrivals within weeks, so markets rarely become tight or oversupplied", "Visitor arrivals convert into rooms sold one for one, so rooms available follow demand exactly", "Rooms available never change once a market opens, so tight markets stay tight for decades"]],
    4: ["Participant types earn money differently, so their revenue measures are not alike", ["Fee revenue includes the room revenue of every hotel in the group, so the two add up", "Single hotels earn no room revenue, so only group fee revenue can be reported", "All participant types share one business model, so their revenue is directly comparable"]],
    5: ["Profit, because all three measure room revenue and capacity rather than costs", ["Whether rooms were sold, because these metrics count bookings rather than room revenue", "The average rate paid for rooms sold, because the metrics ignore pricing entirely", "Room revenue earned per available room, because that needs a cost allocation"]],
  },
  'hospitality-hotels-m1-l4': {
    1: ["Each region has its own guests, access and season, so a national average misjudges each market", ["All Vietnamese destinations share one demand calendar, so a national average fits each market", "National averages are more accurate than regional figures, since they smooth out local noise", "Access conditions are the same in every region, so only guest origin differs between markets"]],
    2: ["Resort demand clusters around holidays, weather and flight access, unlike spread-out city demand", ["Both follow the same weekday business pattern, so city staffing and pricing can be copied", "Resorts face no low season, since coastal guests travel evenly through every month of the entire year", "City hotels depend mainly on school holidays, so they follow the same calendar as resorts"]],
    3: ["Its own reservations analysed by origin, purpose and length of stay", ["National arrival and trip totals, scaled to the resort's share of local rooms", "The national count of domestic tourist trips, divided by the number of hotels", "The number of international flights landing in the country each month"]],
    4: ["Amended Article 22 conditions such as reception and 24-hour staffing still apply beside brand standards", ["Brand standards replace the decree's hotel conditions once a property signs with a major international brand", "The original Article 22 tourism-training clause is still a current hotel minimum under the amended decree", "Branded hotels are exempt from accommodation conditions because the brand audits compliance for them"]],
    5: ["The challenges reinforce each other and raise the break-even point", ["Each challenge offsets another, so the combined effect on break-even is small", "Low season lowers fixed costs automatically, so the pressures ease together", "Channel cost matters only during peak season, so the risks stay separate"]],
  },
  'hospitality-hotels-m1-l5': {
    1: ["Business demand follows work activity and events, while leisure follows holidays and attractions", ["Both are driven mainly by room rate, so weekday and weekend patterns come from pricing alone", "Leisure demand is strongest on weekdays, while business demand peaks at weekends and holidays", "Business demand depends mainly on school holidays, while leisure follows corporate calendars"]],
    2: ["Calendar swings and access limits set when it earns money and when it must conserve cash", ["An annual average describes every month well, so seasonality and access can be ignored", "Access affects only business hotels, so a leisure resort plans around the calendar", "Seasonality removes the need for cash planning, because quiet months offset busy ones"]],
    3: ["Costs reach profit quickly because labor and operating costs cannot adjust instantly", ["Profit moves in line with revenue, so flat revenue means flat profit whatever costs do", "Labor cost falls automatically as occupancy slips, so wage rises are quickly absorbed", "Flow-through tracks guest satisfaction, which has no link to wage and energy costs"]],
    4: ["When systems share data and staff use them consistently in daily work", ["Whenever a system goes live on schedule, even if it shares no data with others", "When the hotel moves every booking to online agencies and drops its own channels", "When guests are asked to use self-service tools for every request during a stay"]],
    5: ["Tourism Law Article 49 sets general conditions, and amended Article 22 sets hotel-specific minimums", ["The original Article 22 utilities and training clauses remain current minimums for every hotel", "Voluntary certifications such as EDGE are legal minimum conditions for every hotel in Vietnam", "Only brand standards set a hotel's obligations, so national rules apply to the operator alone"]],
  },
  'hospitality-hotels-m2-l1': {
    1: ["A handoff between sales and the front office, which weakens the whole experience", ["The marketing campaign, because a confirmed booking guarantees the rest of the stay", "The booking itself, because a confirmed reservation shows nothing went wrong", "The guest's choice of booking channel, which decides how the arrival is handled"]],
    2: ["A responsibility matrix that allocates each task, decision and cost", ["Leaving the online agency to decide, since it holds the guest relationship", "Assuming the brand pays every cost, since it set the standards that failed", "Leaving roles to be settled after opening, once the first results are known"]],
    3: ["The hotel's own reservation, folio and finance records for the period", ["National visitor counts scaled by the hotel's share of local rooms", "Channel advertising impressions and website visit counts for the same period", "Online review scores and ranking positions on booking platforms"]],
  },
  'hospitality-hotels-m2-l2': {
    1: ["A strong market does not guarantee one project's return, and early choices lock in fixed costs", ["Strong tourism markets guarantee every project's return, so a base case is enough for lenders", "Financing choices can be changed freely after opening, so early structure carries little risk", "Feasibility studies cover building design, so demand and cash scenarios belong to operations"]],
    2: ["Capital cost, replacement cycles and energy use over the asset's whole life", ["The guest's first impression on opening day, since finishes are swapped cheaply", "Staffing levels and wage rates, since finishes decide how many people are hired", "The brand's fee level and the owner's share of room revenue under the contract"]],
    3: ["The operator, which is generally responsible for hiring, training and supervising", ["The franchisor, because the brand is responsible for staff wherever its name appears", "The owner, which recruits and trains the whole team and pays the operator only a fee", "The guest-facing booking intermediary, which supplies staff for rooms it sells"]],
  },
  'hospitality-hotels-m2-l3': {
    1: ["Stay restrictions such as minimum nights, to protect more valuable demand", ["Accepting every request at the lowest rate, because any occupancy beats an empty room", "Closing housekeeping for the weekend, because short stays create too much cleaning", "Raising the public rate on every channel at once, whatever the length of stay"]],
    2: ["Real-time room status with clear codes and a defined escalation route", ["A larger marketing budget, so more bookings force departments to coordinate", "A new loyalty tier for guests who accept later room assignments", "Later checkout times for all guests, which give front office time"]],
    3: ["Full-service departments share schedules, spaces and budgets, so one plan changes the others' workload", ["Events are managed by the sales office alone, so operating departments carry no extra workload", "Events use only function space and need no extra staff, so other departments are unaffected", "Engineering is needed only for building emergencies, so event plans do not involve maintenance"]],
  },
  'hospitality-hotels-m2-l4': {
    1: ["Fixing the cause stops the failure repeating and shows which assets need repair", ["Offering a bigger gesture each time, since compensation alone stops complaints recurring", "Holding complaints until checkout, so that one settlement covers every issue", "Keeping maintenance out of recovery, so that front office owns every complaint"]],
    2: ["A booking is not a stayed and settled room night, so revenue and occupancy are overstated", ["No-shows always pay the full rate, so counting every booking as a stay gives the same result", "Cancellation fees are room revenue, so counting every booking changes nothing material", "Completed stays and bookings are the same measure, so the total needs no adjustment"]],
    3: ["When the data was gathered with consent and is used responsibly for stated purposes", ["Whenever any data has been collected, because stored preferences can be reused for offers", "Whenever the guest's review was positive, since satisfied guests accept any offer", "Whenever the guest booked through an agency, since the agency holds the consent"]],
  },
  'hospitality-hotels-m2-l5': {
    1: ["Labor hours and consumables, while rooms and facilities stay fixed", ["The number of rooms built, because capacity can be added or removed quickly", "The floor area of the building, since partitions can be moved within a week", "The legal accommodation category, which can be changed as soon as demand drops"]],
    2: ["Rooms, guests, covers and functions are different units, so one cannot stand in for another", ["Rooms sold always equal guests served, so breakfasts per room sold compare hotels fairly", "Breakfasts are counted per available room, so the two hotels are already comparable", "Outputs need no definition before comparison, since each hotel reports its own totals"]],
    3: ["Rising costs absorbed the growth in revenue, which the profit metrics reveal", ["Profit rose with revenue, since energy and commissions sit outside profit", "Value stayed constant, since higher rates cancel out wage and energy increases", "Value fell, because room revenue growth is not counted in hotel results"]],
  },
  'hospitality-hotels-m2-l6': {
    1: ["Reimbursement for centralized programs such as loyalty, reservations and marketing", ["Taxes collected for the government, which the brand passes on without keeping any share", "Refunds owed to guests whose bookings were made through the brand's central channels", "Payments toward the owner's building loan, arranged through the brand's lenders"]],
    2: ["Concentration risk, which makes the channel mix a commercial decision", ["A stable source of demand, since one large partner cuts channel risk", "A legal requirement for Vietnamese hotels that sell through tour operators", "A cost saving that has no downside, because commissions fall as volume rises"]],
    3: ["Weak access or deferred maintenance, which stay with the property after joining", ["Access to a central reservation system, which a new owner can get only by joining", "The service standards that the brand applies to rooms and public areas", "The reach of the loyalty program among travelers who book through the brand"]],
  },
  'hospitality-hotels-m3-l1': {
    1: ["The whole margin and the whole risk, including finding capable managers", ["Only the brand fee income, because running the hotel itself removes real estate risk", "A guaranteed incentive fee, with the real estate risk carried by the lenders", "Half the margin and half the risk, shared with the brand that licenses the name"]],
    2: ["Contract term, performance tests and termination rights written into the agreement", ["Guest review scores and online agency commission rates, which set the operator's tenure", "National visitor arrivals and tourism growth rates for the destination as a whole", "The number of room categories at the hotel and the size of its function space"]],
    3: ["Fee-based groups depend on owners investing, while integrated resorts carry heavy fixed cost", ["Both carry identical cost structures, because each earns fees from hotels owned by others", "Integrated resorts earn only licensing fees, so their risk is lower than that of asset-light groups", "Asset-light groups own most of their hotels, so they carry the heavier fixed cost and risk"]],
  },
  'hospitality-hotels-m3-l2': {
    1: ["They complicate sales, housekeeping and inventory control across the property", ["They raise ADR, because each extra category adds a higher price point at no extra work", "They cut maintenance workload, because each category has its own fixed upkeep cycle", "They remove pricing decisions, since each category carries one fixed rate"]],
    2: ["Events are booked in advance and peak on different days from leisure", ["Events peak together with leisure demand, so they can share the same staffing plan", "Events need no kitchens, staff or equipment beyond the rooms already in use", "Events are booked on the day of arrival, so planning can wait for guest numbers"]],
    3: ["They need steady demand to cover fixed cost and can sit idle in low season", ["They add no revenue per guest, so their only purpose is marketing the destination", "They need no extra staff or capital, so they can be added to any property", "They remove seasonality from the business, so low season stops being a concern"]],
  },
  'hospitality-hotels-m3-l3': {
    1: ["Its total contribution, because a negotiated rate trades rate for dependable volume", ["Only the number of nights it brings, because volume outweighs the negotiated discount", "Only the hotel's public rate, because a negotiated rate is set by the account", "Only the guests' review scores, because they decide whether the account renews"]],
    2: ["Length of stay changes housekeeping workload, ancillary spend and rate", ["All leisure guests buy the same product, so one room type and service set fits all", "Length of stay does not affect cost, since the nightly rate covers every service", "Families pay the highest rate, so couples and long-stay guests can be priced alike"]],
    3: ["How far the group may reduce its room commitment before a penalty applies", ["The public room rate, which the group must pay for each room it releases", "The online agency's commission on the block, paid by the hotel after the event", "The guests' loyalty tier, which sets the discount applied to each room"]],
  },
  'hospitality-hotels-m3-l5': {
    1: ["Net cost per booking, including marketing and technology, and repeat behavior", ["The commission saved, because direct bookings carry no marketing or technology cost", "Website traffic and app downloads, because these show how many guests booked", "Rate parity across channels, because direct prices must match agency prices"]],
    2: ["Commission payments, plus part of the guest relationship and the guest's data", ["Part ownership of the building, because agencies take an equity stake in listed hotels", "Its legal accommodation category, which the agency assigns to listed properties", "Control of its own channel rates, which the agency sets for each listed room"]],
    3: ["Programs from other hotels, banks and airlines compete for the same members", ["Members never book elsewhere, so the program faces no competition for their stays", "Loyalty programs carry no cost, since members fund them through their own points", "Only hotels run loyalty programs, so rivals in other industries cannot compete"]],
  },
  'hospitality-hotels-m3-l6': {
    1: ["So that operating results are not confused with returns on the property itself", ["Because holding combined roles is not allowed, so each role must be separate", "Because only the brand earns profit, so owner returns need no separate review", "Because owners never bear capital risk, so only operating results matter"]],
    2: ["So that complaints, invoices and loyalty credit reach the right party", ["Because the payer is always the guest, so one record field is enough", "Because agents never book for others, so booker records can be left out", "Because only guests can be invoiced, so payer fields are not needed"]],
    3: ["Tourism Law general conditions plus amended Article 22 minimums, with the hotel still accountable", ["Outsourcing hands every legal duty to the vendor, so the hotel only checks the contract price", "Only the original Article 22 text applies, because later amendments cover non-hotel businesses", "Only brand standards apply to outsourced work, so national rules bind the vendor and not the hotel"]],
  },
  'hospitality-hotels-m4-l1': {
    1: ["Guest power, online agency power, supplier power, new entry and rivalry", ["Rivalry between brands alone, because guests and suppliers do not affect pricing", "National tax policy and exchange rates, which set hotel prices in every market", "Guest reviews and star ratings, since these decide competitive pressure alone"]],
    2: ["Reputation and service quality, made visible through guest reviews", ["Room count, because the larger resort can usually offer the lower rate", "The age of the brand, because older brands are trusted over newer ones", "Distance from the capital city, because shorter journeys decide preference"]],
    3: ["Guests mostly lose loyalty benefits, while owners face sunk capital, debt and exit terms", ["Owners can change brands at no cost, while guests pay exit fees for changing hotels", "Both face the same switching costs, because each commits capital when choosing a hotel", "Switching is hard for guests because their loyalty points expire, yet easy for owners"]],
  },
  'hospitality-hotels-m4-l2': {
    1: ["Groups grow by adding owners' properties under contract, so owners are customers too", ["Groups must buy every hotel they add, so owners matter only as sellers of the buildings", "Owners have no choice of brand, because groups assign each property to a brand", "Guests sign the management contracts, so owners are not part of the sales effort"]],
    2: ["Comparisons should adjust for segment, size and positioning before ranking", ["Room count shows positioning, so the boutique hotel ranks lower on every measure", "Small hotels earn weak returns, so their results are not worth ranking", "Boutique hotels cannot be benchmarked, because no chain hotel shares their segment"]],
    3: ["Each format follows different operating patterns, so segmentation by destination and format is needed", ["All formats share one operating pattern, so a single Vietnamese average describes them fairly", "Integrated resorts earn no ancillary revenue, so their rooms results fit the urban average", "Urban hotels face no competition, so their results are not worth comparing with resorts"]],
  },
  'hospitality-hotels-m4-l3': {
    1: ["Whether the RevPAR gap comes from the hotel itself or from the market", ["The hotel's legal accommodation category, which explains the whole gap", "The brand's fee income, which sets how much of the gap is owed to the owner", "National tourism growth, which explains any gap with local rivals"]],
    2: ["Exchange-rate treatment, such as constant, historical or fixed rates", ["Guest review scores, since ADR is adjusted for satisfaction before reporting", "The number of sales channels, because each channel reports its own ADR", "The decree's effective date, because ADR is restated whenever rules change"]],
    3: ["Labor hours, departmental and undistributed costs and the cost of each sale", ["Nowhere further, since RevPAR already deducts labor and departmental costs", "Only the brand's fee revenue, which sets how much profit each hotel keeps", "Only national visitor numbers, which decide profit for city hotels alike"]],
  },
  'hospitality-hotels-m4-l4': {
    1: ["A specific demand generator, such as airport traffic or passing road travelers", ["Beach access, because every hotel outside a city depends on leisure demand", "School holidays, because roadside and airport hotels follow the family calendar", "Conventions, because these properties sell mostly to large organised groups"]],
    2: ["Net room revenue after commission, discounts and other costs of sale", ["Occupancy alone, because a fuller hotel always earns more after channel costs", "Gross booking value alone, because commissions are paid by the channel", "The number of channels used, since more channels always lift contribution"]],
    3: ["Service consistency and hiring cost, because service is produced by people on every shift", ["The building's energy use, because turnover has no effect on service consistency", "Nothing in operations, because the brand supplies trained staff to every property", "Distribution cost, because turnover changes how much commission agencies charge"]],
  },
  'hospitality-hotels-m4-l5': {
    1: ["A high share of fixed cost makes profit rise or fall faster than revenue", ["Variable costs rise faster than revenue, so profit grows more slowly than sales", "Profit moves exactly with revenue, because costs rise and fall in step with occupancy", "Fixed costs fall away in peak season, so margins widen by the same percentage"]],
    2: ["Which demand evidence justifies investment and which early signal triggers cost action", ["The base-case forecast, because scenarios and early signals add little to one plan", "National arrival totals and tourism targets, which set the timing of each opening", "The brand's growth plan, since the group chooses which signals the resort tracks"]],
    3: ["A collection that lets owners affiliate with a chain while keeping their name and design", ["A full brand conversion, in which the owner adopts the chain's name and standards", "A management contract under which the chain takes ownership of the hotel's buildings", "A loyalty tier that rewards guests who stay in several hotels of one chain"]],
  },
  'hospitality-hotels-m5-l1': {
    1: ["It ties experiences to a destination's distinct culture, which rivals elsewhere cannot easily copy", ["It removes the need for guest consent, because local stories do not use personal data at all", "It guarantees higher occupancy, because cultural stories attract guests in every season", "It replaces the need for service quality, since the destination itself delivers the experience"]],
    2: ["Rate, length of stay or on-property spend by more than its build, staffing and upkeep cost", ["Peak-season occupancy, because premium facilities pay back whenever the resort is full", "Guest satisfaction scores, because a well-reviewed facility always repays its cost", "The resort's star rating, since a higher category lets every rate rise at once"]],
    3: ["They can lift occupancy on weak nights but may need different rates and services", ["They always arrive at peak rates, so no change to services or rate fences is needed", "They book only in peak season, so they cannot lift weak midweek or shoulder nights", "They should be measured by national trip counts, so the hotel needs no local data"]],
  },
  'hospitality-hotels-m5-l2': {
    1: ["One system of record per data item, timely interfaces and shared rules", ["A larger marketing budget, so more bookings expose the missing cancellation", "More room categories, so that each system can hold a separate rate for them", "A new loyalty tier, so that cancelled guests stay linked to the program"]],
    2: ["Amended Article 22 retains reception and 24-hour staffing conditions for hotels", ["The decree requires digital check-in, so staffed reception is optional with kiosks", "Digital tools remove all identity checks, so reception staff are no longer needed", "The original training clause requires kiosks at every hotel's entrance"]],
    3: ["Only as far as its history fits current conditions, so it must be checked when conditions change", ["Always, once the model is installed, because it updates itself to any change in conditions", "Whenever guests consent to reviews being shared, because reviews supply the model's data", "Only on fully booked dates, because sold-out nights show the true level of guest demand"]],
  },
  'hospitality-hotels-m5-l3': {
    1: ["Where marketing, payment and technology cost still leave a real saving", ["Always, because direct bookings carry no marketing, payment or technology cost", "Never, because agencies are always cheaper than any direct channel", "Only when rate parity is removed, since parity prevents any direct saving"]],
    2: ["The brand's reach across the system, not the profit of any single hotel", ["Each owner's growth in returns, because fees fall as the brand adds more hotels", "Guaranteed occupancy for new hotels, because the brand sends them its guests", "Lower fees for every owner, since larger systems pass on their scale savings"]],
    3: ["Early-stage projects are less likely to be completed than those in later stages", ["Proposed projects are as certain as hotels under construction, so both count as supply", "Projects in final planning are already open and should be counted as existing rooms", "Pipeline phase does not affect completion, so all announced rooms arrive on schedule"]],
  },
  'hospitality-hotels-m5-l4': {
    2: ["Article 49 covers general conditions, while labor, building and data duties need their own sources", ["Article 22 alone covers every duty, including labor, building and guest-data rules for hotels", "The original Article 22 training clause covers labor duties, so no other labor source is needed", "Data duties pass to the vendor once it holds the data, so the hotel needs no separate source"]],
    3: ["Savings that were never measured against a baseline cannot be shown to have happened", ["Certified claims need no evidence, because a label proves the savings have happened", "Baselines are needed only for water use, so energy claims can stand without one", "Any reduction in use proves a profit gain, so profit claims need no baseline either"]],
  },
  'hospitality-hotels-m5-l5': {
    1: ["An analytical measure of how far a destination's visitor flows become paid room nights", ["An official count of hotel room nights published alongside national arrival figures", "The number of international arrivals reported for the destination each quarter", "A hotel's occupancy index measured against the same period of the previous year"]],
    2: ["Revenue from the closed rooms is lost while fixed costs continue to accrue", ["Fixed costs stop during the works, so downtime only delays revenue and loses none", "Downtime lifts revenue at once, because fewer rooms sell at higher rates", "Downtime affects only food and beverage, because rooms stay available for sale"]],
    3: ["Investment cost divided by the yearly saving or extra yearly contribution", ["Investment cost multiplied by the yearly saving, which gives the years to payback", "The asset's depreciation charge divided by its expected years of useful life", "Revenue divided by rooms available, which gives the payback per room"]],
  },
};

/** Same shape as the v2 seeds: stem, applied variant and chapter come from v2, the options from the v3 wording. */
export const HOTEL_KC_V3: Record<string, Record<number, HotelKcV2Seed>> = (() => {
  const seeds: Record<string, Record<number, HotelKcV2Seed>> = {};
  Object.entries(HOTEL_KC_V3_WORDING).forEach(([lesson, wordings]) => {
    seeds[lesson] = {};
    Object.entries(wordings).forEach(([number, [correct, wrong]]) => {
      const base = HOTEL_KC_V2[lesson]?.[Number(number)];
      if (!base) throw new Error(`Hotels KC v3 wording for ${lesson}-${number} has no v2 seed to revise`);
      seeds[lesson][Number(number)] = { ...base, correct, wrong };
    });
  });
  return seeds;
})();

export interface HotelKcV3MigrationEntry {
  lesson: string;
  /** The v2 ID retired by this migration. */
  retiredId: string;
  /** The generic ID that v2 retired before it. */
  originalId: string;
  replacementId: string;
  chapter: number;
  migrationVersion: typeof HOTEL_KC_V3_VERSION;
}

/** Versioned assessment migration manifest (v2 to v3): every retired v2 ID and the new ID that replaces it. */
export function buildHotelKnowledgeCheckMigrationV3(): HotelKcV3MigrationEntry[] {
  return Object.entries(HOTEL_KC_V3).flatMap(([lesson, seeds]) =>
    Object.entries(seeds).flatMap(([number, seed]) =>
      (['a', 'b'] as const).map((variant) => ({
        lesson,
        retiredId: `${lesson}-v2-${number}${variant}`,
        originalId: `${lesson}-${number}${variant}`,
        replacementId: `${lesson}-v3-${number}${variant}`,
        chapter: seed.chapter,
        migrationVersion: HOTEL_KC_V3_VERSION,
      })),
    ),
  );
}

/** Renames the questions that carry v2 IDs to their v3 IDs. Everything else is returned untouched. */
export function applyHotelKnowledgeCheckV3<Q extends { id: string }>(lesson: string, questions: Q[]): Q[] {
  const revised = HOTEL_KC_V3[lesson];
  if (!revised) return questions;
  return questions.map((question) => {
    const match = question.id.match(/^(.*)-v2-(\d+)([ab])$/);
    if (!match || match[1] !== lesson || !revised[Number(match[2])]) return question;
    return { ...question, id: `${lesson}-v3-${match[2]}${match[3]}` };
  });
}
