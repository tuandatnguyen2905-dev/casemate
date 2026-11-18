import type { ExpertRubricItem, LibraryDifficulty, LibraryQuestion } from './skillQuestionLibrary';
import { blockingUnitShorthand } from './unitLabels';

/**
 * Market Sizing case banks 2-4 (C01-C08, D01-D08, E01-E08).
 *
 * One record per exercise. Case Drill (Market Sizing) and Case Pool (Sizing)
 * both derive their entries from this list, so brief, solution, difficulty and
 * rubric cannot drift apart. Before submission learners see only `brief` and
 * `task`; every other text field is revealed after submission through
 * components/MarketSizingBankReveal.tsx.
 */

export type MarketSizingBankSourceLabel = 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';

export interface MarketSizingBankCase {
  code: string;
  bank: 'C' | 'D' | 'E';
  title: string;
  /** Per-case label printed in the source PDF; the app scale is `difficulty`. */
  sourceLabel: MarketSizingBankSourceLabel;
  difficulty: LibraryDifficulty;
  industry: string;
  geography: string;
  poolIndustry: string;
  brief: string;
  /** Learner-facing task. Neutral: it never lists the decomposition steps. */
  task: string;
  /** The source's model decomposition route. Revealed after submission only. */
  modelRoute: string;
  workedCalculation: string;
  driverLogic: string;
  howToAssess: string;
  scoringExample: string;
}

export interface MarketSizingBankMeta {
  code: string;
  bank: 'C' | 'D' | 'E';
  sourceLabel: MarketSizingBankSourceLabel;
  industry: string;
  geography: string;
}

export const MARKET_SIZING_BANK_NAMES: Record<'C' | 'D' | 'E', string> = {
  C: 'Bank 2 · Easy to Intermediate',
  D: 'Bank 3 · Intermediate to Advanced',
  E: 'Bank 4 · Advanced to Expert',
};

export const MARKET_SIZING_REVEAL_NOTICE =
  'Figures in the worked solution are illustrative assumptions, not verified market facts, and not the only correct answer. A different estimate is accepted when its method is sound.';

export const MARKET_SIZING_BANK_ACCEPT_ALTERNATIVES =
  'Accept a different estimate when its method is sound; judge the method, not the figure.';

const BANK_LEARNER_TASK = 'Estimate the annual market defined in the brief and state the result in VND per year.';

export const MARKET_SIZING_BANK_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Scope', points: 1, description: 'Defines what the market includes and excludes, in line with the brief.' },
  { criterion: 'Driver logic', points: 3, description: 'Breaks the market into logical drivers, separating stocks from yearly flows and applying each filter once.' },
  { criterion: 'Assumption rationale', points: 2, description: 'States each assumption and explains why it is reasonable.' },
  { criterion: 'Arithmetic', points: 2, description: 'Carries the numbers through correctly, with units.' },
  { criterion: 'Sensitivity', points: 1, description: 'Varies the most uncertain driver and shows the range.' },
  { criterion: 'Check', points: 1, description: 'Cross-checks the result against an independent or practical constraint.' },
];

export const MARKET_SIZING_BANK_CASES: MarketSizingBankCase[] = [
  {
    code: "C01", bank: "C", title: "Bicycle tune-ups in Ho Chi Minh City", sourceLabel: "Easy", difficulty: "easy",
    industry: "Consumer services", geography: "Ho Chi Minh City", poolIndustry: "retail",
    brief: "Estimate yearly consumer spending on basic bicycle tune-ups in Ho Chi Minh City. Define a paid tune-up; exclude parts and major repairs.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Move from bicycles owned to active bicycles, then to yearly paid visits. Set a blended service fee, vary frequency, and check workshop throughput.",
    workedCalculation: "Illustrative assumptions: 2.5 million bicycles, 45% actively used, 1.2 paid tune-ups per active bicycle per year and VND 120,000 per visit. Value = 2.5 million x 45% x 1.2 x 120,000 = 162 billion VND/year. At 0.8-1.6 visits, the range is 108 billion-216 billion VND.",
    driverLogic: "The active-use filter removes unused bicycles. Frequency converts a stock into visits; a bicycle may have more than one visit. At the base case, 1.35 million visits/year are about 3,700/day citywide. Compare that with shop count x visits per day and operating days.",
    howToAssess: "Counting every bicycle as one paid visit misses both non-use and repeat visits.",
    scoringExample: "An active-bicycle-times-fee answer with no visit frequency might earn 2/10. A workshop-first route is valid if it excludes major repair bills.",
  },
  {
    code: "C02", bank: "C", title: "Water-filter cartridges in Hanoi", sourceLabel: "Easy", difficulty: "easy",
    industry: "Consumer goods", geography: "Hanoi", poolIndustry: "retail",
    brief: "How large might annual retail sales of replacement cartridges for household water filters be in Hanoi? Exclude new filter machines and installation.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Estimate household device stock, cartridges replaced per year and price. Explain why households without a filter do not buy cartridges; vary device ownership.",
    workedCalculation: "Illustrative assumptions: 1.5 million households, 25% own a compatible filter, two cartridge purchases per device each year, VND 180,000 per cartridge. Value = 1.5 million x 25% x 2 x 180,000 = 135 billion VND/year. At 15%-35% ownership, value is 81 billion-189 billion VND.",
    driverLogic: "The estimate covers 375,000 devices and 750,000 yearly cartridge sales. The price blends common cartridge types. A household with multiple devices would require a devices-per-household factor. Check with appliance retailers, service plans and import volumes.",
    howToAssess: "Households x cartridge price assumes everyone owns a filter and ignores replacement frequency.",
    scoringExample: "That one-purchase-per-home answer is around 1/10. A device-installation-cohort route also works if old and new devices are counted once.",
  },
  {
    code: "C03", bank: "C", title: "Home air-conditioner cleaning in Vietnam", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Home services", geography: "Vietnam", poolIndustry: "retail",
    brief: "Estimate annual household spending on paid air-conditioner cleaning in Vietnam. Ignore offices, repairs and electricity.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Split the household base into AC-owning homes, units per home, paid cleaning share and yearly cleans per paid unit. Test paid share and technician capacity.",
    workedCalculation: "Illustrative assumptions: 12 million homes, 40% own AC, 1.2 units per owning home, 70% use paid cleaning, 1.5 cleans per paid unit yearly, VND 180,000 per clean. Value = 12 million x 40% x 1.2 x 70% x 1.5 x 180,000 = 1.089 trillion VND/year. At 50%-80% paid share: 777.6 billion-1.244 trillion VND.",
    driverLogic: "There are 5.76 million installed units in this model, but only 6.048 million paid cleaning visits/year. The fee is per visit, not per home. Compare implied daily jobs with working technicians and the seasonal service peak.",
    howToAssess: "Valuing every unit at an annual fee ignores do-it-yourself cleaning and visit frequency.",
    scoringExample: "A stock-times-fee result with no paid-share or frequency logic is about 2/10. A technician-throughput route is acceptable if residential jobs are isolated.",
  },
  {
    code: "C04", bank: "C", title: "Paid dog boarding in Ho Chi Minh City", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Pet services", geography: "Ho Chi Minh City", poolIndustry: "retail",
    brief: "Estimate yearly spending on overnight dog boarding in Ho Chi Minh City. Count paid nights, not every pet owner or free care by relatives.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Build dog-owning households, boarding uptake, nights per using household and price per night. Explain travel-driven demand and test kennel capacity.",
    workedCalculation: "Illustrative assumptions: 500,000 dog-owning homes, 15% board a dog in a year, six paid nights per using home, VND 250,000/night. Value = 500,000 x 15% x 6 x 250,000 = 112.5 billion VND/year. Four to nine nights gives 75 billion-168.75 billion VND.",
    driverLogic: "The model assumes one boarded dog per using household; multiple dogs need an extra factor. Base volume is 450,000 dog-nights/year, or 1,230 occupied spaces per day on average. Peak holidays demand higher capacity. Check occupancy, kennel count and booking records.",
    howToAssess: "Pet owners are not all boarding customers, and using households are not equal to nights.",
    scoringExample: "Owners x price is around 1/10. A kennel-beds x occupancy route can cross-check paid nights if day-care is removed.",
  },
  {
    code: "C05", bank: "C", title: "Scheduling software for small gyms", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "B2B software (fitness and wellness)", geography: "Vietnam", poolIndustry: "tech",
    brief: "Estimate annual subscription fees from independent gyms and studios in Vietnam for class and member scheduling software. Exclude large chains and setup fees.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Separate total venues, suitable venues, paying adoption, monthly fee and annual billing; vary adoption rather than multiplying every venue by list price.",
    workedCalculation: "Illustrative assumptions: 25,000 independent venues, 60% with a suitable class or membership workflow, 30% of those pay, VND 300,000/month. Value = 25,000 x 60% x 30% x 300,000 x 12 = 16.2 billion VND/year. At 20%-40% uptake: 10.8 billion-21.6 billion VND.",
    driverLogic: "Eligibility is a workflow test; uptake is a buying decision. The base has 4,500 subscribers, not 25,000. The fee should be an actual paid average after discounts. Check provider subscriber counts and conversion from free trials.",
    howToAssess: "All venues x annual list price treats free users and unsuitable studios as paying customers.",
    scoringExample: "A flat all-venue estimate might score 1/10. Cohort-based subscriber modelling is valid when it separates new sign-ups and churn.",
  },
  {
    code: "C06", bank: "C", title: "Cleaning rooftop solar panels at factories", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Renewable energy services", geography: "Vietnam", poolIndustry: "logistics",
    brief: "Estimate annual service revenue from cleaning factory rooftop solar panels in Vietnam. Exclude installation, household rooftops and electricity sales.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Estimate factory sites, solar-equipped share, cleans per year and charge per job. Show how roof size enters the blended fee and test service-team capacity.",
    workedCalculation: "Illustrative assumptions: 18,000 factory sites, 20% with suitable rooftop panels, two paid cleaning jobs annually, 8 million VND per job. Value = 18,000 x 20% x 2 x 8 million VND = 57.6 billion VND/year. A 10%-30% equipped share produces 28.8 billion-86.4 billion VND.",
    driverLogic: "The site base is a hypothetical proxy. The 8 million VND charge blends roof areas; if site sizes vary sharply, segment by array size. The base requires 7,200 jobs/year. Compare teams x jobs per day x safe weather days.",
    howToAssess: "Factory count x fee misses both solar eligibility and repeated service visits.",
    scoringExample: "That simple result earns about 1/10. An installed-megawatt x cleaning-cost-per-MW method is valid if rooftop and ground arrays are separated.",
  },
  {
    code: "C07", bank: "C", title: "Reusable containers for office food delivery", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Food delivery and packaging", geography: "Ho Chi Minh City", poolIndustry: "retail",
    brief: "How much yearly service-fee revenue could reusable lunch-container providers earn from office food deliveries in Ho Chi Minh City? Ignore refundable deposits and meal revenue.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Work from delivery orders per workday to eligible orders, opt-in rate, annual turns and fee. Check container circulation and avoid applying workdays twice.",
    workedCalculation: "Illustrative assumptions: 500,000 office-area meal deliveries per workday, 250 workdays/year, 20% of orders from participating merchants, 30% customer opt-in, VND 5,000 service fee per chosen order. Value = 500,000 x 250 x 20% x 30% x 5,000 = 37.5 billion VND/year. At 15%-45% opt-in: 18.75 billion-56.25 billion VND.",
    driverLogic: "The base yields 7.5 million paid container turns/year, or 30,000 per workday. The 20% filter measures order coverage by participating merchants, not customer preference. Check whether available containers can complete the required daily wash-and-return cycles.",
    howToAssess: "Adding deposits as revenue or counting all deliveries as users misstates the defined service market.",
    scoringExample: "An all-orders x fee answer is around 2/10. A container-stock x turns route is credible if loss rates and operating days are explicit.",
  },
  {
    code: "C08", bank: "C", title: "Home EV charger installations for condo residents", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Mobility and energy", geography: "Fictional market (Vietnamese city)", poolIndustry: "logistics",
    brief: "Estimate yearly spending on privately funded home EV (electric vehicle) charger installation for condominium car owners in a fictional Vietnamese city. Exclude public charging and charger electricity.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Convert car stock to residents with condo parking permission, then to installations this year. Include a per-installation bill and a check on installer capacity.",
    workedCalculation: "Illustrative assumptions: 50,000 electric cars, 40% owned by condo residents, 50% of those have installable parking, 25% of eligible owners install this year, 10 million VND per installation. Value = 50,000 x 40% x 50% x 25% x 10 million VND = 25 billion VND/year. At a 15%-35% annual install rate: 15 billion-35 billion VND.",
    driverLogic: "The base has 10,000 eligible owners but only 2,500 contracts this year. The rate must fall once suitable parking spaces are installed; a multiyear forecast needs remaining eligible stock. Check building permissions and installer jobs per month.",
    howToAssess: "Pricing the whole eligible stock as this year's demand confuses the addressable base with purchase flow.",
    scoringExample: "All eligible owners x bill is roughly 2/10. A building-by-building estimate can be stronger if shared chargers are excluded.",
  },
  {
    code: "D01", bank: "D", title: "Cold-storage cabinets for pharmacies", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Healthcare and pharmacy equipment", geography: "Fictional market", poolIndustry: "healthcare",
    brief: "Estimate yearly sales of new medicine cold-storage cabinets to private pharmacies in a fictional market. Exclude hospital purchases, maintenance and ordinary refrigerators.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Filter stores needing specialist storage, then estimate the fraction buying a new cabinet this year and average contract size. Explain replacement versus first purchase.",
    workedCalculation: "Illustrative assumptions: 50,000 private pharmacies, 20% need a dedicated cabinet, 10% of eligible stores purchase this year, 20 million VND per cabinet. Value = 50,000 x 20% x 10% x 20 million VND = 20 billion VND/year. At a 5%-15% buying rate: 10 billion-30 billion VND.",
    driverLogic: "Ten thousand stores are eligible; only 1,000 buy under the annual timing assumption. The buying rate can combine new installations and replacements, provided one store is counted only once. Check distributor sales and cabinet life.",
    howToAssess: "Eligible shops x price values a stock as if every shop replaces equipment yearly.",
    scoringExample: "That answer earns about 2/10. A pharmacy-cohort model is valid if new openings and replacement cycles are separated.",
  },
  {
    code: "D02", bank: "D", title: "Rented hotel linen in Vietnam", sourceLabel: "Intermediate", difficulty: "medium",
    industry: "Hospitality services", geography: "Vietnam", poolIndustry: "retail",
    brief: "Estimate annual fees earned by firms renting and laundering bed linen for hotels in Vietnam. Count serviced room-nights; exclude linen the hotels own and wash themselves.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Derive occupied room-nights, eligible outsourcing share, linen changes per room-night and fee per set. Test occupancy and laundry throughput.",
    workedCalculation: "Illustrative assumptions: 300,000 rooms, 60% average occupancy, 365 days, 70% of occupied room-nights at hotels using rental linen, 0.8 sets changed per night, VND 25,000 per set. Value = 300,000 x 60% x 365 x 70% x 0.8 x 25,000 = 919.8 billion VND/year. At 50%-70% occupancy: 766.5 billion-1.073 trillion VND.",
    driverLogic: "A room is not a sale every day; occupancy converts capacity into use. The 0.8 factor covers guests staying multiple nights without a daily change. The service needs about 36.8 million sets/year. Check laundry plants x daily sets x operating days.",
    howToAssess: "Room stock x 365 x fee overstates use and misses outsourced share and change frequency.",
    scoringExample: "A room-days-only estimate is around 2/10. Starting from hotel laundry throughput can work if hotel-owned linen is excluded.",
  },
  {
    code: "D03", bank: "D", title: "Dental 3D printing for clear-aligner plans", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Dental healthcare", geography: "Fictional market", poolIndustry: "healthcare",
    brief: "Estimate yearly sales of outsourced 3D-printed planning models for clear-aligner treatment in a fictional market. Count printed models, not full treatment revenue.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Start with dental visits, isolate orthodontic consultations, then treatment starts and models per patient. Explain why visits do not equal unique treatment starts.",
    workedCalculation: "Illustrative assumptions: 15 million dental visits/year, 4% are first orthodontic consultations, 25% of these become new clear-aligner patients, 80% use outside labs, 10 printed models per outsourced patient, VND 30,000/model. Value = 15 million x 4% x 25% x 80% x 10 x 30,000 = 36 billion VND/year. At 6-14 models: 21.6 billion-50.4 billion VND.",
    driverLogic: "The first-consultation filter is essential: follow-up visits should not restart the patient funnel. The model yields 150,000 new patients, 120,000 using outside labs and 1.2 million outsourced models. Check lab print capacity and clinic procurement.",
    howToAssess: "Multiplying all dental visits by an aligner price values the wrong service and repeats patients.",
    scoringExample: "That response scores 0-2/10. A clinic x starts per month build is acceptable if models are linked to a unique patient cohort.",
  },
  {
    code: "D04", bank: "D", title: "Airport luggage wrapping", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Airports and travel services", geography: "Fictional market (country)", poolIndustry: "logistics",
    brief: "Estimate annual consumer spending on checked-bag wrapping at airports in a fictional country. Define departing journeys, not unique travelers or both arrival and departure.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Model checked-bag travelers, wrapping uptake, wrapped bags per buyer and price. Check kiosk throughput during peak departures.",
    workedCalculation: "Illustrative assumptions: 80 million departing passenger journeys/year, 60% check a bag, 5% of bag-checking travelers buy wrapping, 1.1 wrapped bags per buyer, VND 100,000/bag. Value = 80 million x 60% x 5% x 1.1 x 100,000 = 264 billion VND/year. At 3%-8% uptake: 158.4 billion-422.4 billion VND.",
    driverLogic: "The output is 2.64 million wrapped bags/year, about 7,230/day nationwide. Journey counts already include repeat travelers; do not multiply by trips again. Compare airport departures, kiosk number, working hours and wraps per hour.",
    howToAssess: "Applying a wrap fee to all passengers ignores baggage and behavior; adding arrivals doubles the base.",
    scoringExample: "An all-passengers answer is about 1/10. A kiosk-transaction estimate also works with airport coverage and peak utilization.",
  },
  {
    code: "D05", bank: "D", title: "Factory water-leak detection contracts", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Industrial services", geography: "Fictional market", poolIndustry: "logistics",
    brief: "Estimate annual spending on outsourced water-leak audits and follow-on monitoring devices at factories in a fictional market. Exclude repair construction.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Build audit contracts from eligible sites, paid adoption and visit frequency. Add devices only for a subset of audited sites; keep service and hardware prices separate.",
    workedCalculation: "Illustrative assumptions: 10,000 large factories, 60% have complex water systems, 25% buy audits, two audits/year at 25 million VND each. Audit value = 75 billion VND. Suppose 20% of audited sites also buy a 30 million VND sensor package: 10,000 x 60% x 25% x 20% x 30 million VND = 9 billion VND. Total = 84 billion VND/year. At 15%-35% audit adoption: 50.4 billion-117.6 billion VND.",
    driverLogic: "The device branch starts from 1,500 audited customers, not from all 10,000 sites. Two visits create 3,000 audits, but not two sensor purchases per site. Check field-team audit capacity and device vendor shipments.",
    howToAssess: "Applying a hardware package to each audit double counts customers who receive two visits.",
    scoringExample: "A single audit-only branch with good logic is partial credit, about 5-6/10. A liters-lost route is a useful demand check, not billable market revenue by itself.",
  },
  {
    code: "D06", bank: "D", title: "Post-discharge remote monitoring", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Healthcare services", geography: "Fictional market (country)", poolIndustry: "healthcare",
    brief: "Estimate annual patient spending on a paid remote-monitoring service after hospital discharge in a fictional country. Exclude inpatient care, insurer transfers and device purchases.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Move from discharge episodes to eligible conditions, offered patients, acceptance, monitored days and fee per day. Explain repeat admissions and capacity.",
    workedCalculation: "Illustrative assumptions: 4 million discharge episodes/year, 20% condition-eligible, 25% are offered a paid service, 60% accept, 20 monitored days per accepted episode, VND 20,000/day. Value = 4 million x 20% x 25% x 60% x 20 x 20,000 = 48 billion VND/year. At 40%-80% acceptance: 32 billion-64 billion VND.",
    driverLogic: "The base is 120,000 enrolled episodes and 2.4 million monitored days. An episode is the correct unit if a repeat admission starts a separate course, but overlapping monitoring days must not be billed twice. Test nurse caseload and actual paid renewals.",
    howToAssess: "Treating all discharges as paying 20-day users ignores eligibility, offering and acceptance.",
    scoringExample: "A raw discharges x fee x days answer earns about 1/10. A provider-capacity build is credible if it prices only billable patient days.",
  },
  {
    code: "D07", bank: "D", title: "Aquaculture water-sensor subscriptions", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Aquaculture and agri-tech", geography: "Fictional market (aquaculture region)", poolIndustry: "fmcg",
    brief: "Estimate annual subscription and new-installation spending on pond water sensors in a fictional aquaculture region. Do not confuse existing paying ponds with new installations.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Filter pond stock by intensive farming, connectivity and paid uptake. Price recurring probes, then add installation only for the new-subscriber cohort.",
    workedCalculation: "Illustrative assumptions: 120,000 ponds x 30% intensive x 50% connected x 20% paying = 3,600 subscribing ponds. At 1.5 probes/pond and VND 200,000/probe/month, recurring fees = 12.96 billion VND/year. If 20% of these ponds install this year and pay 1 million VND per probe once, installation adds 1.08 billion VND. Total = 14.04 billion VND. At 10%-30% paid uptake: 7.02 billion-21.06 billion VND.",
    driverLogic: "The active probe stock is 5,400; the new-install flow is 1,080 probes. Applying the setup fee to all 5,400 every year overstates annual revenue. Check vendor subscribers, probe replacements and field-install capacity.",
    howToAssess: "A pond x subscription calculation alone misses eligibility; charging every subscriber for a new installation confuses stock and flow.",
    scoringExample: "One clean recurring branch without setup could earn 6-7/10. A cohort model earns full credit if renewals and new adds reconcile.",
  },
  {
    code: "D08", bank: "D", title: "Depot chargers for electric delivery vans", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Logistics and mobility", geography: "Fictional market (city)", poolIndustry: "logistics",
    brief: "Estimate annual new-installation spending on depot chargers for electric delivery vans in a fictional city. Include required electrical upgrades, not vehicle purchases or energy bills.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Filter electric vans to depot fleets lacking chargers, estimate the share installing this year, convert vans into charger connectors, then add site upgrade costs.",
    workedCalculation: "Illustrative assumptions: 100,000 delivery vans x 10% electric x 50% based at fleet depots x 40% lack charging x 25% install this year = 500 vans served. At two vans per 50 million VND connector, 250 connectors cost 12.5 billion VND. Group five connectors per depot: 50 depots. If half need a 200 million VND electrical upgrade per site, add 5 billion VND. Total = 17.5 billion VND/year. At 15%-35% annual installation: 10.5 billion-24.5 billion VND.",
    driverLogic: "Grouping is necessary because grid upgrades are site costs, not connector costs. The base has 25 upgrading depots, each with five connectors. Check project approvals, installers and grid readiness.",
    howToAssess: "Charging every electric van for a connector and every connector for a full site upgrade overstates both branches.",
    scoringExample: "A van x charger-price calculation is about 2/10. A depot-by-depot method is stronger if fleets and shared connectors are handled explicitly.",
  },
  {
    code: "E01", bank: "E", title: "Offshore wind blade inspections by drone", sourceLabel: "Advanced", difficulty: "hard",
    industry: "Energy (offshore wind)", geography: "Fictional market (coastal power market)", poolIndustry: "logistics",
    brief: "Estimate yearly outsourced drone-inspection revenue for offshore wind turbine blades in a fictional coastal power market. Count scheduled and incident-driven jobs; exclude repairs.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Convert installed turbines to serviceable units, split scheduled visits from incident follow-ups and apply separate outsourced shares and prices. Test weather-limited capacity.",
    workedCalculation: "Illustrative assumptions: 900 turbines x 70% accessible x two scheduled visits/year x 40% outsourced to drone firms x 10 million VND/visit = 5.04 billion VND. Separately, 4% of accessible turbines need an extra incident visit, 50% outsourced at 25 million VND: 315 million VND. Total = 5.355 billion VND/year. If scheduled outsourcing is 25%-55%, total = 3.465 billion-7.245 billion VND.",
    driverLogic: "An incident visit is additional to scheduled work; if it replaces a planned visit, subtract the displaced job. The base implies 504 scheduled contracted visits plus about 13 extra jobs. Check vessels, flyable days and inspections per crew-day.",
    howToAssess: "Turbines x fee misses inspection frequency; adding all incident jobs to all contracted scheduled jobs may duplicate work.",
    scoringExample: "A one-branch answer can earn partial credit, around 5/10. A MW (megawatt) capacity route works if turbines per MW and inspection cadence are explicit.",
  },
  {
    code: "E02", bank: "E", title: "Cryogenic storage for research samples", sourceLabel: "Expert", difficulty: "expert",
    industry: "Life sciences", geography: "Fictional market (research hub)", poolIndustry: "healthcare",
    brief: "Estimate annual fees paid to outsourced cryogenic biobanks in a fictional research hub. Include intake processing and ongoing storage, but not genetic testing.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Convert annual new samples into a steady active stock using retention years. Separate one-time accession from yearly storage and test cold-room capacity.",
    workedCalculation: "Illustrative assumptions: 4 million new research samples/year, 20% need deep-freeze storage, 35% outsourced: 280,000 new outsourced samples. If each remains four years in a steady-state system, 1.12 million samples are in storage. At VND 20,000/sample-year, storage is 22.4 billion VND; at VND 30,000/new sample for accession, intake is 8.4 billion VND. Total = 30.8 billion VND/year. At two to six retention years: 19.6 billion-42 billion VND.",
    driverLogic: "Four years turns an annual entry flow into a stored stock only under stable intake and retention. Price accession on this year's entrants, storage on active inventory. Check vial slots, freezer utilization and historical inflow.",
    howToAssess: "Charging the accession fee to the entire stored stock every year overstates the one-time service.",
    scoringExample: "A sample-inflow-only answer is partial, around 4/10. A cohort survival curve is stronger if retention differs by sample type.",
  },
  {
    code: "E03", bank: "E", title: "Ground-station passes for satellites", sourceLabel: "Expert", difficulty: "expert",
    industry: "Space and satellite services", geography: "Fictional market (satellite corridor)", poolIndustry: "tech",
    brief: "Estimate yearly ground-station downlink revenue in a fictional satellite corridor. Technical demand can exceed antenna capacity; price actual billable passes.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Filter candidate passes for technical fit and purchase, cap them by antenna throughput and uptime, then add a premium fee only to premium passes.",
    workedCalculation: "Illustrative assumptions: 600 candidate passes/day x 365 x 25% compatible x 20% purchased = 10,950 demanded passes/year. Four antennas x six passes/day x 365 x 75% uptime = 6,570 deliverable passes. The smaller number is billed: 6,570 x VND 500,000 = 3.285 billion VND. If 10% pay VND 300,000 extra, add 197.1 million VND. Total = 3.482 billion VND. At 75%-90% uptime, value is 3.482 billion-4.179 billion VND.",
    driverLogic: "Candidate passes are geometry windows, not sales. Compatibility and purchase are distinct filters. Premium is an increment, not a second full pass. Cross-check scheduling logs, antenna idle time and conflicts between satellites.",
    howToAssess: "Multiplying demand by price despite the smaller supply capacity sells the same antenna time twice.",
    scoringExample: "A demand-only answer with coherent filters earns 5-6/10; a correct capacity minimum and premium reconciliation complete it.",
  },
  {
    code: "E04", bank: "E", title: "Outsourced surgical-tray sterilization", sourceLabel: "Expert", difficulty: "expert",
    industry: "Healthcare services", geography: "Fictional market", poolIndustry: "healthcare",
    brief: "Estimate annual fees for sterilizing reusable surgical trays for private hospitals in a fictional market. Exclude single-use supplies and in-house sterilization.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Start with operating theatres and surgery days, then reusable trays per operation, outsourced share, standard fee and rush surcharge. Check plant throughput.",
    workedCalculation: "Illustrative assumptions: 250 hospitals x four theatres x two operations/day x 300 days = 600,000 operations. If 60% use reusable trays at 1.5 trays per operation, there are 540,000 trays; 40% outsourced means 216,000 paid trays. At VND 180,000 each, base fees are 38.88 billion VND. A 10% rush share pays VND 80,000 extra, adding 1.728 billion VND. Total = 40.608 billion VND. At 25%-55% outsourced share: 25.38 billion-55.836 billion VND.",
    driverLogic: "The rush premium is added to a subset of outsourced trays, not all surgeries. The model counts reprocessing cycles; a physical tray may be used many times. Check sterilizer cycles, transport time and theater scheduling peaks.",
    howToAssess: "Pricing all operations as outsourced trays ignores both reuse type and the outsourcing decision.",
    scoringExample: "An operations x fee answer is around 1/10. Starting from sterilizer capacity is valid if hospitals' internal cycles are removed.",
  },
  {
    code: "E05", bank: "E", title: "Transformer oil diagnostic testing", sourceLabel: "Expert", difficulty: "expert",
    industry: "Power and utilities", geography: "Fictional market (grid)", poolIndustry: "logistics",
    brief: "Estimate yearly outsourced laboratory revenue from dissolved-gas oil tests for industrial power transformers in a fictional grid. Exclude oil replacement and repair work.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Split installed assets by risk and test cadence, apply outsourced share, then price standard and abnormal-sample follow-up tests without double counting.",
    workedCalculation: "Illustrative assumptions: 20,000 transformers; 30% high-risk tested twice yearly, 70% routine tested once every three years. Annual standard tests = 20,000 x (30% x 2 + 70% / 3) = about 16,667. If 80% are outsourced at 1 million VND, base revenue is 13.333 billion VND. If 10% of outsourced samples need a 4 million VND advanced test, add 5.333 billion VND. Total = 18.667 billion VND. At 20%-40% high-risk share: 14.933 billion-22.4 billion VND.",
    driverLogic: "The one-in-three-year cycle annualizes routine asset stock. Advanced tests are extra paid jobs on flagged outsourced samples. The base implies about 13,333 lab samples. Check lab equipment capacity and utility test schedules.",
    howToAssess: "Testing all assets twice every year ignores risk mix; applying the advanced fee to every sample ignores abnormal incidence.",
    scoringExample: "A correctly annualized standard-test branch without follow-ups is about 6/10. Segmenting by voltage class is an acceptable alternative.",
  },
  {
    code: "E06", bank: "E", title: "Subsea cable inspection and fault response", sourceLabel: "Expert", difficulty: "expert",
    industry: "Energy infrastructure", geography: "Fictional market (island grid)", poolIndustry: "logistics",
    brief: "Estimate annual outsourced service fees for subsea power-cable inspection and fault-response vessels in a fictional island grid. Exclude cable construction and replacement parts.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Annualize high-risk and routine inspection kilometers separately, then estimate incident flow and outsourced repair-callout fees. Test vessel days and weather windows.",
    workedCalculation: "Illustrative assumptions: 6,000 cable-km; 20% high-risk inspected each year and 80% routine inspected once every four years. Annual inspected length = 1,200 + 1,200 = 2,400 km. At 5 million VND/km, inspections earn 12 billion VND. At 0.002 faults per cable-km-year, expect 12 faults; 75% hire a vessel at 1.5 billion VND per callout, adding 13.5 billion VND. Total = 25.5 billion VND. Fault rate 0.001-0.003 implies 18.75 billion-32.25 billion VND.",
    driverLogic: "Fault callouts are separate from planned inspection runs; if work is bundled on one trip, avoid counting the same vessel mobilization twice. Check vessel-day demand and port-to-site travel.",
    howToAssess: "Cable stock x annual inspection price overstates routine coverage; fault counts without a per-km-year rate have no time basis.",
    scoringExample: "A good inspection-only branch earns partial credit, about 5/10. An operator-contract route is valid if planned and emergency fees remain distinct.",
  },
  {
    code: "E07", bank: "E", title: "Captured CO2 mineralization services", sourceLabel: "Expert", difficulty: "expert",
    industry: "Climate tech and cement", geography: "Fictional market (industrial region)", poolIndustry: "logistics",
    brief: "Estimate annual processing-fee revenue for turning captured cement-plant CO2 into minerals in a fictional industrial region. Price tonnes actually processed, not all emissions.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Build technical and contracted CO2 demand, then compare it with usable processing capacity. Explain which bottleneck determines billable tonnes.",
    workedCalculation: "Illustrative assumptions: 40 cement plants x 25% capture-ready x 1 million tonnes clinker/year x 0.6 tonnes CO2 per tonne clinker x 30% captured x 70% contracted for mineralization = 1.26 million tonnes potential processing demand. Three facilities x 250,000 tonnes annual nameplate x 80% uptime can process 600,000 tonnes. At VND 350,000/tonne, billable revenue = min(1.26 million, 600,000) x 350,000 = 210 billion VND. Two to four such facilities imply 140 billion-280 billion VND.",
    driverLogic: "The capture rate, customer contract rate and processing uptime are separate constraints. Do not add mineral-product sales unless scope includes that second revenue stream. Check transport range, input purity and facility logs.",
    howToAssess: "Pricing all plant emissions as processed volume ignores readiness, contracts and the binding capacity ceiling.",
    scoringExample: "An uncapped demand-side estimate is partial, about 4-5/10. A plant-by-plant tonnes model works if material flows reconcile.",
  },
  {
    code: "E08", bank: "E", title: "Immersion-cooling retrofits at data centers", sourceLabel: "Expert", difficulty: "expert",
    industry: "Data centers and IT infrastructure", geography: "Fictional market", poolIndustry: "tech",
    brief: "Estimate annual new retrofit-contract spending on immersion cooling for high-density data-center racks in a fictional market. Exclude new data-center builds and recurring power bills.",
    task: BANK_LEARNER_TASK,
    modelRoute: "Filter sites by rack density and retrofit window, apply customer choice, price racks and site works, then cap projects by integrator installation capacity.",
    workedCalculation: "Illustrative assumptions: 120 data centers x 40% technically suitable x 25% entering a retrofit window this year x 50% choosing immersion = six requested projects. Each has 80 racks at 1 billion VND/rack plus 10 billion VND in site piping: 90 billion VND/project. Four integrators x two projects/year provide an eight-project cap, so annual spend = min(6, 8) x 90 billion VND = 540 billion VND. At 25%-75% choice, demand is three to nine projects; the eight-project cap gives 270 billion-720 billion VND.",
    driverLogic: "The site filter and timing filter differ: technically suitable sites are not all buying now. The 10 billion VND site work is charged once per project, not per rack. Check delivered projects, engineer days and downtime windows.",
    howToAssess: "Sites x all racks x retrofit price treats every rack and every site as an annual buyer.",
    scoringExample: "An uncapped but well-filtered route is about 6/10. A rack-cohort method is credible if it keeps site costs and crew capacity distinct.",
  },
];

const DIFFICULTY_BY_LABEL: Record<MarketSizingBankSourceLabel, LibraryDifficulty> = {
  Easy: 'easy',
  Intermediate: 'medium',
  Advanced: 'hard',
  Expert: 'expert',
};

const DRILL_MINUTES: Record<LibraryDifficulty, number> = { easy: 7, medium: 9, hard: 12, expert: 15 };

export const MARKET_SIZING_BANK_FORMAT = 'ambiguous-estimation' as const;

export function marketSizingBankSourceId(code: string): string {
  return `CM-MS-${code}`;
}

export function marketSizingBankQuestionId(code: string): string {
  return `market-sizing-bank-${code.toLowerCase()}`;
}

export function getMarketSizingBankCase(sourceCaseId?: string | null): MarketSizingBankCase | undefined {
  if (!sourceCaseId) return undefined;
  return MARKET_SIZING_BANK_CASES.find((item) => marketSizingBankSourceId(item.code) === sourceCaseId);
}

export function marketSizingBankMeta(item: MarketSizingBankCase): MarketSizingBankMeta {
  return { code: item.code, bank: item.bank, sourceLabel: item.sourceLabel, industry: item.industry, geography: item.geography };
}

function referenceText(item: MarketSizingBankCase): string {
  return [
    `WORKED CALCULATION\n${item.workedCalculation}`,
    `DRIVER LOGIC / CHECK\n${item.driverLogic}`,
    `COMMON MISTAKES\n${item.howToAssess}`,
    `ALTERNATIVE APPROACH\n${item.scoringExample}`,
  ].join('\n\n');
}

export function marketSizingBankCaseToQuestion(item: MarketSizingBankCase): LibraryQuestion {
  return {
    id: marketSizingBankQuestionId(item.code),
    sourceCaseId: marketSizingBankSourceId(item.code),
    contentVersion: 'market-sizing-bank-2-4-v1',
    skill: 'market-sizing',
    difficulty: item.difficulty,
    title: `${item.code} · ${item.title}`,
    businessContext: item.brief,
    question: `YOUR TASK\n${item.task}`,
    instruction: 'Break the market into determinants, add the ones you need as Components, assign values, and build the bottom-up model and result.',
    correctAnswer: referenceText(item),
    explanation: MARKET_SIZING_BANK_ACCEPT_ALTERNATIVES,
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    calculationRequired: true,
    estimatedMinutes: DRILL_MINUTES[item.difficulty],
    status: 'published',
    reviewStatus: 'Published',
    calibrationStatus: item.difficulty === 'easy' || item.difficulty === 'medium' ? 'already-at-target-v1' : undefined,
    industry: item.industry,
    businessProblem: 'Market opportunity',
    drillType: 'Ambiguous Estimation',
    primarySkill: 'Defining and defending a driver-based estimate',
    workingPrompt: 'Issue tree (not graded) → Components → bottom-up model → calculated result.',
    commonMistake: item.howToAssess,
    weakAnswerFeedback: item.howToAssess,
    alternativeConclusions: [item.scoringExample],
    scoringRubric: MARKET_SIZING_BANK_RUBRIC,
    answerUnit: 'VND per year',
    exhibits: [],
    marketSizingFormat: MARKET_SIZING_BANK_FORMAT,
    marketSizingRubricVersion: 'market-sizing-ambiguous-v3-components',
    marketSizingIllustrativeAssumptions: [],
    marketSizingBank: marketSizingBankMeta(item),
  } as LibraryQuestion;
}

export const MARKET_SIZING_BANK_QUESTIONS: LibraryQuestion[] = MARKET_SIZING_BANK_CASES.map(marketSizingBankCaseToQuestion);

export function validateMarketSizingBank(): string[] {
  const errors: string[] = [];
  const expected = ['C', 'D', 'E'].flatMap((bank) => Array.from({ length: 8 }, (_, index) => `${bank}0${index + 1}`));
  const codes = MARKET_SIZING_BANK_CASES.map((item) => item.code);
  if (codes.join(',') !== expected.join(',')) errors.push('Market Sizing banks 2-4 must contain C01-C08, D01-D08 and E01-E08 in order.');
  if (new Set(codes).size !== codes.length) errors.push('Market Sizing bank codes must be unique.');
  if (MARKET_SIZING_BANK_RUBRIC.reduce((sum, item) => sum + item.points, 0) !== 10) errors.push('The Market Sizing bank rubric must total 10 points.');
  MARKET_SIZING_BANK_CASES.forEach((item) => {
    if (item.code[0] !== item.bank) errors.push(`${item.code} is filed under the wrong bank.`);
    if (item.difficulty !== DIFFICULTY_BY_LABEL[item.sourceLabel]) errors.push(`${item.code} difficulty does not match its source label.`);
    if (!item.brief || !item.task || !item.modelRoute || !item.workedCalculation || !item.driverLogic || !item.howToAssess || !item.scoringExample) errors.push(`${item.code} is missing source content.`);
    if (item.task.includes(item.modelRoute) || item.brief.includes(item.modelRoute)) errors.push(`${item.code} shows its model decomposition before submission.`);
    if (!item.industry || !item.geography || !item.poolIndustry) errors.push(`${item.code} is missing industry or geography.`);
    // The shared task names the answer unit ("VND per year"); that label is not a figure.
    if (/\d{2,}|\d[.,]\d|%|VND/i.test(`${item.brief} ${item.task.replace(/\bVND per year\b/gi, 'the stated unit')}`)) errors.push(`${item.code} brief or task shows figures before submission.`);
  });
  MARKET_SIZING_BANK_QUESTIONS.forEach((question) => {
    if ((question.exhibits || []).length || question.exhibit) errors.push(`${question.id} must not depend on a chart.`);
    if (question.businessContext !== MARKET_SIZING_BANK_CASES.find((item) => marketSizingBankQuestionId(item.code) === question.id)?.brief) errors.push(`${question.id} pre-submit context must be the brief only.`);
    if (/WORKED CALCULATION|DRIVER LOGIC|COMMON MISTAKES/.test(`${question.businessContext} ${question.question} ${question.instruction} ${question.explanation}`)) errors.push(`${question.id} exposes post-submission content before submission.`);
  });
  blockingUnitShorthand(MARKET_SIZING_BANK_CASES.map((item) => ({ id: item.code, record: item }))).forEach((problem) => errors.push(problem));
  return errors;
}
