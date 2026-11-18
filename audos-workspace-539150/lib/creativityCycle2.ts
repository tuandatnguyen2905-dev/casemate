import type { ExerciseRubric } from './caseScoringRubrics';
import type { LibraryQuestion } from './skillQuestionLibrary';
import { CREATIVITY_CASE_BANK_40 } from './creativityCaseBank40';

export type CreativityCategory = 'product-development' | 'big-idea-key-message' | 'imc-plan' | 'activation-retention';

export interface CreativityAnswerField { key: string; label: string; help: string; }
export interface CreativityBankCase {
  sourceCaseId: string;
  code: string;
  category: CreativityCategory;
  categoryLabel: string;
  title: string;
  brief: string;
  task: string;
  workedResponse: string;
  assessment: string;
  weakAnswerFeedback: string;
  scoringExampleAlternative: string;
  rubricVersion: string;
  sourceRubric: string;
  responseFields: CreativityAnswerField[];
  mappedWeights: [number, number, number, number, number];
  nextCaseId: string;
  poolIndustry: string;
  poolType: string;
}

export const CREATIVITY_CATEGORY_LABELS: Record<CreativityCategory, string> = {
  'product-development': 'Product Design',
  'big-idea-key-message': 'Big Ideas and Messages',
  'imc-plan': 'IMC Plans',
  'activation-retention': 'Activation and Retention',
};

export const CREATIVITY_CATEGORY_DESCRIPTIONS: Record<CreativityCategory, string> = {
  'product-development': 'Turn a target job and unmet need into a feasible concept, prototype, and validation test.',
  'big-idea-key-message': 'Connect an audience truth and product truth through one central idea, message, execution, and proof.',
  'imc-plan': 'Build a phased, budgeted channel plan that moves a defined audience toward a measurable objective.',
  'activation-retention': 'Change a specific behavior with a trigger, mechanic, user action, operational constraint, and experiment.',
};

const PD_FIELDS: CreativityAnswerField[] = [
  { key: 'target-job', label: 'Target and job', help: 'Who is the user, in what moment, and what are they trying to get done?' },
  { key: 'unmet-need', label: 'Unmet need', help: 'State the specific tension or failure in the current experience.' },
  { key: 'concept-differentiator', label: 'Concept and differentiator', help: 'Describe the product format and why it solves this need distinctly.' },
  { key: 'constraints', label: 'Constraints', help: 'Show how the concept fits the supplied operations, price, safety, or technical limits.' },
  { key: 'prototype-validation', label: 'Prototype and validation test', help: 'Define the prototype, real-user behavior, paid signal where relevant, and decision rule.' },
];
const BI_FIELDS: CreativityAnswerField[] = [
  { key: 'audience-truth', label: 'Audience truth', help: 'State the human tension in the exact use moment.' },
  { key: 'product-truth', label: 'Product truth', help: 'State the supplied, provable reason to believe.' },
  { key: 'central-idea', label: 'Central idea', help: 'Write the one organizing Big Idea.' },
  { key: 'key-message', label: 'One key message', help: 'Write one short, truthful message.' },
  { key: 'execution', label: 'Example execution', help: 'Show how the same idea appears in the requested touchpoints.' },
  { key: 'proof', label: 'Proof', help: 'Define visible proof and the comprehension or behavior test.' },
];
const IMC_FIELDS: CreativityAnswerField[] = [
  { key: 'objective-audience', label: 'Objective and audience', help: 'Restate the exact outcome, timeframe, and audience.' },
  { key: 'insight-message', label: 'Insight and message', help: 'Connect the audience occasion to one truthful message.' },
  { key: 'phases', label: 'Phases', help: 'Lay out the sequence and timing.' },
  { key: 'channel-roles', label: 'Channel roles', help: 'Give each channel one job and explain its handoff.' },
  { key: 'budget', label: 'Budget', help: 'Allocate the full supplied budget and reconcile the total.' },
  { key: 'measurement', label: 'Measurement', help: 'Define attribution, deduplication, KPI, guardrail, and correction trigger.' },
];
const AR_FIELDS: CreativityAnswerField[] = [
  { key: 'behavior', label: 'Behavior to change', help: 'Name the exact current and desired behavior.' },
  { key: 'trigger', label: 'Trigger', help: 'Define the user event that starts the intervention.' },
  { key: 'mechanic', label: 'Mechanic', help: 'Explain how the intervention works.' },
  { key: 'user-action', label: 'User action', help: 'State the concrete voluntary action the user takes.' },
  { key: 'constraint', label: 'Operational constraint', help: 'Show how the idea respects the supplied delivery constraint.' },
  { key: 'experiment-kpi', label: 'Experiment and KPI', help: 'Set exposure/control, primary behavior metric, guardrails, and failure response.' },
];

const RETIRED_CREATIVITY_CYCLE_2_CASES: CreativityBankCase[] = [
  {
    sourceCaseId: 'CM-CRE-PD01', code: 'PD01', category: 'product-development', categoryLabel: 'Product Development', title: 'Moc commuter breakfast',
    brief: 'Moc has a dry-food packing line but no cold chain. Commuters need breakfast they can prepare in under three minutes before or after travel. Target shelf price is at most VND 25,000 per serving.',
    task: 'Specify the serving format, point of preparation, how it uses the current line, a price hypothesis, and a paid test with a decision rule.',
    workedResponse: 'Concept: A dry savory oat-and-bean cup carried in a bag and prepared with hot water at work, where a kettle is available. Target VND 24,000; confirm ingredient, cup and retailer margins before promising that price. Use moment: Prepare in under three minutes after the commute, then eat at a desk without refrigerated storage. Test: Observe 30 commuters preparing three recipes; reject recipes that exceed three minutes or spill in transit. Sell the preferred version for four weeks in two commuter-area stores and compare paid trial and second purchase with the pre-agreed pilot thresholds. Interview non-repeat buyers about taste, price and preparation. The dry line can pack ingredients, but cup filling and hot-water instructions still need an operational check.',
    assessment: 'Give credit for a specific occasion, a line-compatible format and behavior-based testing. Flag any claim that the VND 24,000 price is profitable before costing.',
    weakAnswerFeedback: '“A healthy breakfast for busy people” gives neither a product format nor a preparation point. Ask for the pack, preparation sequence and paid-repeat test.',
    scoringExampleAlternative: 'Example: 1/10 = occasion 1, constraint fit 0, mechanism 0, test 0. A different dry cereal format can score highly if it fits the three-minute use and is tested with paying commuters.',
    rubricVersion: 'creativity-pd-bank-v1', sourceRubric: 'Occasion/problem 2 | constraint fit 2 | product mechanism 3 | feasibility and paid test 3', responseFields: PD_FIELDS, mappedWeights: [20, 20, 30, 15, 15], nextCaseId: 'CM-CRE-PD02', poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-PD02', code: 'PD02', category: 'product-development', categoryLabel: 'Product Development', title: 'Luma compact cleaner refill',
    brief: 'Luma serves renters in small apartments. Its current liquid-mixing and sachet-sealing lines are available, but new bottle tooling is not. Consumers dislike storing several bulky cleaners. Retail price must stay below VND 50,000.',
    task: 'Define the refill and reuse system, dilution behavior, manufacturing fit, safety steps and a real-home validation plan.',
    workedResponse: 'Concept: One pre-measured concentrate sachet to refill a specified existing 500 mL bottle; printed water-fill line and step-by-step dilution instructions make the refill usable without new bottle tooling. Set VND 45,000 as a test price, pending cost and retail margin. Mechanism: Less storage is needed because the consumer keeps one bottle and stores flat sachets. Test: Verify sachet seals and stability, then run a two-week paid home trial with renters. Observe how many dilute correctly without help, whether the bottle is compatible, cleaning satisfaction, leakage, repeat purchase and complaints. Do not assert superior cleaning until tested. A failure on dilution or leakage triggers a redesign even if purchase intent is high.',
    assessment: 'Score the storage problem, existing equipment, actual dilution and safe usage together. A refill that needs a new proprietary bottle breaks the tooling constraint.',
    weakAnswerFeedback: '“Launch a premium eco-spray” assumes new packaging and leaves the use behavior vague. Replace it with a measured sachet and a compatibility test.',
    scoringExampleAlternative: 'Example: 2/10 = problem 1, constraint fit 0, mechanism 1, test 0. A tablet refill is also valid only if the existing lines can safely produce and pack it.',
    rubricVersion: 'creativity-pd-bank-v1', sourceRubric: 'Occasion/problem 2 | constraint fit 2 | product mechanism 3 | feasibility and paid test 3', responseFields: PD_FIELDS, mappedWeights: [20, 20, 30, 15, 15], nextCaseId: 'CM-CRE-PD03', poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-PD03', code: 'PD03', category: 'product-development', categoryLabel: 'Product Development', title: 'Nexo night-shift snack',
    brief: 'Nexo can use its existing baking and dry-packing lines. Warehouse staff need a snack they can eat with one hand during short night breaks. No refrigeration or nuts are allowed. Shelf price is capped at VND 20,000.',
    task: 'Describe the snack texture and pack, why it works during a short night break, line and allergen fit, and a paid field test.',
    workedResponse: 'Concept: Two individually wrapped, low-crumb oat-and-seed bites that can be opened and eaten with one hand; the dry pack uses the existing bake-and-pack setup and needs no refrigeration. Target VND 19,000 after a unit-cost check. Occasion: A worker takes a short break without a plate or clean table. Validation: Observe two recipes on actual night shifts for one-hand opening, mess and time to eat. Sell a small batch at the staff kiosk rather than relying only on survey liking; track paid take-up, second purchase and discarded packs. Audit ingredient and shared-line allergen controls before sale. If the bar crumbles or needs both hands, the concept fails the core use occasion even with positive flavor feedback.',
    assessment: 'Reward observable use details and a paid repeat signal. Penalize an appealing flavor concept that cannot be eaten cleanly in the stated setting.',
    weakAnswerFeedback: '“An energy bar for everyone” ignores one-hand use and the nut ban. Specify texture, packaging and the observed shift test.',
    scoringExampleAlternative: 'Example: 0/10 if the answer is only a slogan and gives no usable food concept. A savory baked bite can also earn full credit if one-hand use and allergen controls are demonstrated.',
    rubricVersion: 'creativity-pd-bank-v1', sourceRubric: 'Occasion/problem 2 | constraint fit 2 | product mechanism 3 | feasibility and paid test 3', responseFields: PD_FIELDS, mappedWeights: [20, 20, 30, 15, 15], nextCaseId: 'CM-CRE-PD04', poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-PD04', code: 'PD04', category: 'product-development', categoryLabel: 'Product Development', title: 'Aster first-apartment pan',
    brief: 'Aster makes induction-compatible cookware. Young renters want one pan for simple meals and have limited storage. The team may alter size and handle shape but cannot add a new coating process. Target retail price is at most VND 300,000.',
    task: 'Propose a pan, explain the storage and cooking benefit, identify the technical failure mode, and set a test sequence.',
    workedResponse: 'Concept: A compact induction pan using Aster’s current base and coating, with a detachable handle for small-cabinet storage; VND 289,000 is a retail target pending engineering and margin checks. Use: A renter cooks one simple meal, detaches the cooled handle and stores the pan vertically. Feasibility gate: Test induction heat distribution and repeat handle locking, including a hot-pan misuse scenario. Only after safety and durability gates pass, invite 20 renters to complete real meals and store the pan in their own kitchens. Then test a small paid run for price acceptance, returns and handle defects. A compact shape alone is insufficient if the handle loosens; do not invent a new non-stick coating process.',
    assessment: 'Score the trade-off between storage convenience and safe cooking. Safety and heat performance take priority over styling or purchase intent.',
    weakAnswerFeedback: '“A revolutionary non-stick pan” introduces unsupported coating technology. Rework around dimensions, handle mechanism and lock reliability.',
    scoringExampleAlternative: 'Example: 1/10 = occasion 0, constraint fit 0, mechanism 1, test 0. A fixed-handle nesting design can be as strong as a detachable handle if storage and safety are proven.',
    rubricVersion: 'creativity-pd-bank-v1', sourceRubric: 'Occasion/problem 2 | constraint fit 2 | product mechanism 3 | feasibility and paid test 3', responseFields: PD_FIELDS, mappedWeights: [20, 20, 30, 15, 15], nextCaseId: 'CM-CRE-BI01', poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-BI01', code: 'BI01', category: 'big-idea-key-message', categoryLabel: 'Big Idea and Key Message', title: 'Treo pocket bag',
    brief: 'Treo sells a reusable bag that folds into a pocket-sized pouch. Students support reusing bags but forget one on unplanned errands. No environmental impact figures are available.',
    task: 'Provide a human truth, the central Big Idea, a short key message, two connected executions, proof and one comprehension test.',
    workedResponse: 'Human truth: Students remember a reusable bag for planned groceries but not for an unplanned stop after class. Product truth: Treo folds into a pouch small enough to carry routinely. Big Idea: “The bag already in your pocket.” Message: “Carry it small; open it when plans change.” Executions: A short campus film follows an unexpected purchase and the real fold-out moment; at a store counter, a pocket-sized display invites shoppers to try folding it themselves. Both executions show the same carry-small behavior. Proof and test: Demonstrate actual folded dimensions and carrying, then ask viewers to explain the behavior unprompted and measure whether shoppers take it on a later errand. Avoid environmental savings numbers that the brief does not provide.',
    assessment: 'Score the tension-feature connection, one coherent idea and visible proof; an attractive line with no fold-out demonstration is not enough.',
    weakAnswerFeedback: '“Save the planet with Treo” is generic and implies unmeasured impact. Tie the message to the missed-bag moment and the pocket format.',
    scoringExampleAlternative: 'Example: 1/10 = tension 1, product truth 0, idea 0, proof 0. Another slogan is acceptable if every execution links the forgotten-bag tension to verified portability.',
    rubricVersion: 'creativity-bi-bank-v1', sourceRubric: 'Audience tension 2 | product truth 2 | coherent idea and message 3 | proof and test 3', responseFields: BI_FIELDS, mappedWeights: [20, 20, 30, 10, 20], nextCaseId: 'CM-CRE-BI02', poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-BI02', code: 'BI02', category: 'big-idea-key-message', categoryLabel: 'Big Idea and Key Message', title: 'Oro bottle on the move',
    brief: 'Oro sells a slim refillable water bottle with visible volume marks. Office commuters forget how much they have drunk while moving between work and transit. The product brief supplies no health-outcome claims.',
    task: 'Build one platform idea from the commuter tension and both product features; show how it works in two touchpoints and how to test it.',
    workedResponse: 'Tension: A mobile workday interrupts a person’s awareness of how much water remains. Truth: Oro’s slim bottle travels easily, and visible marks make volume easy to see. Big Idea: “Your day, in visible sips.” Message: “See your next refill before the next stop.” Execution: A short film shows the bottle fitting into a work bag and its marks at transit, desk and afternoon refill; a product-page sequence repeats those same two demonstrations. The marks are a cue, not a health prescription. Proof and test: Show actual bag fit and legible marks; compare an idea-led ad with a feature-only ad on correct feature recall and qualified product-page visits. Check that viewers do not infer unsupported health outcomes.',
    assessment: 'Reward an idea that remains recognizable across film and product page. Do not treat a generic hydration slogan as a distinctive idea.',
    weakAnswerFeedback: '“Drink more, live better” could fit any bottle and may imply health claims. Show a visible-volume moment and the slim fit.',
    scoringExampleAlternative: 'Example: 1/10 = tension 1, product truth 0, idea 0, proof 0. A commuting ritual can be a valid alternative if both bottle features remain visible and claims remain grounded.',
    rubricVersion: 'creativity-bi-bank-v1', sourceRubric: 'Audience tension 2 | product truth 2 | coherent idea and message 3 | proof and test 3', responseFields: BI_FIELDS, mappedWeights: [20, 20, 30, 10, 20], nextCaseId: 'CM-CRE-BI03', poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-BI03', code: 'BI03', category: 'big-idea-key-message', categoryLabel: 'Big Idea and Key Message', title: 'Mela cold-mix coffee',
    brief: 'Mela has an instant coffee sachet that dissolves in cold water. Students studying in shared libraries often cannot access a kettle. No claim about energy, concentration or nutrition is provided.',
    task: 'State the barrier, the product reason to believe, a Big Idea and message, then design a repeatable execution and a test.',
    workedResponse: 'Barrier: A student in a shared library has cold water but no kettle and little time. Product truth: The sachet dissolves in cold water. Big Idea: “Coffee without the kettle.” Message: “Cold water is enough when the break is short.” Execution: A single continuous shot at the library water station shows water, sachet, stirring and a drinkable cup; a shelf card near cold water repeats the same preparation steps. Keep the visible action consistent across both touchpoints. Proof and test: Verify dissolving time in the actual cup; expose students to the film, then check whether they can explain the preparation and choose it in a small paid trial. Do not claim improved focus or energy effects from the case brief.',
    assessment: 'Score a barrier-led idea and unedited product proof. A line can be catchy and still fail if it does not explain cold mixing.',
    weakAnswerFeedback: '“Study harder with Mela” invents a performance benefit. Shift the message to preparation without hot water.',
    scoringExampleAlternative: 'Example: 1/10 = tension 1, product truth 0, idea 0, proof 0. An idea about the cold-water station can also work if the product action is unmistakable.',
    rubricVersion: 'creativity-bi-bank-v1', sourceRubric: 'Audience tension 2 | product truth 2 | coherent idea and message 3 | proof and test 3', responseFields: BI_FIELDS, mappedWeights: [20, 20, 30, 10, 20], nextCaseId: 'CM-CRE-BI04', poolIndustry: 'fmcg', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-BI04', code: 'BI04', category: 'big-idea-key-message', categoryLabel: 'Big Idea and Key Message', title: 'MateLab ten-minute practice',
    brief: 'MateLab offers ten-minute consulting case drills with feedback. Applicants postpone practice because a full case feels too time-consuming. The product cannot promise interview success.',
    task: 'Translate a practice barrier into one Big Idea, a truthful message, a proof sequence, two touchpoints and a behavioral success metric.',
    workedResponse: 'Tension: Applicants postpone a full case because they cannot see a manageable first step. Truth: MateLab offers a ten-minute drill and specific feedback. Big Idea: “One short case. One clearer next step.” Message: “Use ten minutes to find the reasoning gap to work on next.” Execution: In a short ad, show a real timer, an answer and one actionable feedback card; on the landing screen, reuse the same message beside a single suggested drill. Proof: The visible sample feedback must correspond to the shown answer, with no fabricated improvement claim. Test: Compare first-drill starts, meaningful completions and subsequent revision against the current entry message; monitor early exits. Clicks alone do not establish activation.',
    assessment: 'Give credit when the creative connects time commitment to diagnostic value, then routes the learner to a specific first action.',
    weakAnswerFeedback: '“Ace every interview” overpromises and fails to show the drill. Demonstrate the ten-minute action and feedback instead.',
    scoringExampleAlternative: 'Example: 1/10 = tension 1, product truth 0, idea 0, proof 0. A “start with one gap” route can score equally well if it proves time and feedback.',
    rubricVersion: 'creativity-bi-bank-v1', sourceRubric: 'Audience tension 2 | product truth 2 | coherent idea and message 3 | proof and test 3', responseFields: BI_FIELDS, mappedWeights: [20, 20, 30, 10, 20], nextCaseId: 'CM-CRE-IM01', poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-IM01', code: 'IM01', category: 'imc-plan', categoryLabel: 'IMC Plan', title: 'Mela university tea launch',
    brief: 'Mela launches ready-to-drink herbal tea near universities. The eight-week goal is 6,000 verified first trials among students aged 18-24. Budget: VND 300 million. The brief does not support health-effect claims.',
    task: 'Set an occasion-led message, phased channel roles and budget that totals 300 million VND; define verified first trial and a correction trigger.',
    workedResponse: 'Message: “A quick pause between classes,” with no health-effect promise. Sequence: Weeks 1-2, student-made occasion videos (80 million VND) make the product relevant near campus. Weeks 3-6, staffed sampling at partner stores (140 million VND) converts awareness into first taste; each unique student receives a one-time claim code. Weeks 7-8, consent-based follow-up plus stock-location posts (80 million VND) help interested students find the drink. Measurement: Sum 300 million VND; target 6,000 deduplicated verified first trials, implying a VND 50,000 budget per target trial if fully achieved. Attribute by code and store; watch later paid purchase separately. Reallocate within the budget if one campus produces much higher verified cost, but first check staffing and stock availability.',
    assessment: 'Score the pathway from occasion to verified trial, the full budget and deduplication. Do not count views or sampled cups as unique people.',
    weakAnswerFeedback: '“Use TikTok, KOLs and sampling” gives no channel job, timing or trial measurement. Assign each channel one role and an attributable action.',
    scoringExampleAlternative: 'Example: 1/10 = objective 0, roles 1, budget 0, KPI 0. Other media mixes can score well if they total 300 million VND and lead to verified unique first trials.',
    rubricVersion: 'creativity-imc-bank-v1', sourceRubric: 'Objective/audience 2 | phased channel roles 3 | full budget and feasibility 2 | attribution and KPI 3', responseFields: IMC_FIELDS, mappedWeights: [20, 15, 15, 20, 30], nextCaseId: 'CM-CRE-IM02', poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-IM02', code: 'IM02', category: 'imc-plan', categoryLabel: 'IMC Plan', title: 'Vera first fitness plan',
    brief: 'Vera is a beginner fitness app. Over six weeks it seeks 4,000 users who complete their first seven-day plan, not merely install the app. Budget: VND 200 million. The app can track plan starts and completion.',
    task: 'Create a six-week plan for completed seven-day plans, allocate 200 million VND, show how each channel hands off to the next, and set a guardrail.',
    workedResponse: 'Promise: “Begin with a realistic first week.” Weeks 1-2, creator demonstrations (50 million VND) show the actual seven-day routine and link to its start screen. Weeks 2-5, gym-partner QR onboarding (90 million VND) helps beginners select the same plan. Weeks 3-6, opted-in reminders to unfinished starters (60 million VND) reopen the exact next session. Measurement: Budget totals 200 million VND; 4,000 unique completers implies VND 50,000 budget per target completion. Track creator or partner source, plan start, day-seven completion and cost per completion; deduplicate across touchpoints. Monitor reminder opt-outs and users who complete by skipping sessions. If installs rise but completion does not, improve the start-to-finish handoff before scaling media.',
    assessment: 'Award points for continuity of one plan across channels and measuring completion. Installs are a diagnostic, not the stated goal.',
    weakAnswerFeedback: '“Get 10,000 downloads through influencers” changes the objective. Work backward from 4,000 valid seven-day completions.',
    scoringExampleAlternative: 'Example: 1/10 = objective 0, roles 1, budget 0, KPI 0. A campus-led alternative is valid if it measures the completed plan, not merely sign-ups.',
    rubricVersion: 'creativity-imc-bank-v1', sourceRubric: 'Objective/audience 2 | phased channel roles 3 | full budget and feasibility 2 | attribution and KPI 3', responseFields: IMC_FIELDS, mappedWeights: [20, 15, 15, 20, 30], nextCaseId: 'CM-CRE-IM03', poolIndustry: 'tech', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-IM03', code: 'IM03', category: 'imc-plan', categoryLabel: 'IMC Plan', title: 'Aster induction pan demos',
    brief: 'Aster introduces an induction-compatible pan in ten retailers over ten weeks. Goals: 2,000 qualified product demonstrations and 400 purchases. Budget: VND 500 million. The supplied proof is induction compatibility, not an untested durability claim.',
    task: 'Assign a role to creator content, retail demos and follow-up; allocate 500 million VND and explain the purchase conversion required.',
    workedResponse: 'Proof: Cook on an induction hob on camera; avoid untested durability claims. Weeks 1-3, creator demonstrations (120 million VND) direct interested viewers to one of ten stores. Weeks 3-8, trained staff run in-store demonstrations (280 million VND), scanning store-specific QR codes and collecting consent for follow-up. Weeks 6-10, availability messages (100 million VND) point demonstrators to stocked retailers. Measurement: 500 million VND total; 2,000 qualified unique demonstrations and 400 receipt-verified purchases require 20% demo-to-purchase conversion if every sale comes through this path. Match demonstration IDs to receipts without counting repeat demos twice. Review staffing, stock and conversion by store. Shift demonstration days toward stores with lower verified cost per purchase only after checking comparable traffic.',
    assessment: 'Score product proof, store handoff, budget and both targets. An attractive online reach number does not establish 400 purchases.',
    weakAnswerFeedback: '“Go viral on social” offers no path to a qualified demonstration. Specify the store visit and receipt linkage.',
    scoringExampleAlternative: 'Example: 0/10 for a pure virality idea with no demo or sales path. A retailer-first mix is acceptable if 2,000 qualified demos and 400 purchases remain measurable.',
    rubricVersion: 'creativity-imc-bank-v1', sourceRubric: 'Objective/audience 2 | phased channel roles 3 | full budget and feasibility 2 | attribution and KPI 3', responseFields: IMC_FIELDS, mappedWeights: [20, 15, 15, 20, 30], nextCaseId: 'CM-CRE-IM04', poolIndustry: 'retail', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-IM04', code: 'IM04', category: 'imc-plan', categoryLabel: 'IMC Plan', title: 'Orin cafe inventory SaaS',
    brief: 'Orin sells a simple inventory-alert tool to independent cafes. In eight weeks it wants 100 qualified owner demos with a VND 150 million budget. A qualified lead operates a cafe and agrees to a live product walkthrough.',
    task: 'Build a sequence to 100 qualified cafe-owner demos, assign 150 million VND, state qualification and describe deduplication and handoff.',
    workedResponse: 'Message: “See a stock alert before a shortage becomes a service problem.” Weeks 1-2, cafe association explainers (30 million VND) surface the stockout routine. Weeks 2-6, live webinars with an actual alert workflow (60 million VND) demonstrate fit. Weeks 4-8, consented owner follow-up and booked one-to-one walkthroughs (60 million VND) convert interest into qualified demos. Qualification: The attendee runs an independent cafe and attends a live product walkthrough; a webinar view alone is not a qualified demo. Budget totals 150 million VND, or 1.5 million VND per target qualified demo if 100 are achieved. Use owner or business ID to deduplicate association, webinar and sales records. Track booked-to-attended rate; if booking is strong but attendance weak, adjust scheduling and reminders before buying more traffic.',
    assessment: 'Score the business audience, demonstration of the actual workflow, qualified outcome and channel attribution.',
    weakAnswerFeedback: '“Generate 1,000 leads” rewards unqualified names. Define ownership, attendance and source before scoring success.',
    scoringExampleAlternative: 'Example: 0/10 for lead volume alone. A direct-sales or association-heavy plan is valid if cafe ownership, attendance and the 150 million VND allocation are clear.',
    rubricVersion: 'creativity-imc-bank-v1', sourceRubric: 'Objective/audience 2 | phased channel roles 3 | full budget and feasibility 2 | attribution and KPI 3', responseFields: IMC_FIELDS, mappedWeights: [20, 15, 15, 20, 30], nextCaseId: 'CM-CRE-AR01', poolIndustry: 'tech', poolType: 'growth',
  },
  {
    sourceCaseId: 'CM-CRE-AR01', code: 'AR01', category: 'activation-retention', categoryLabel: 'Activation and Retention', title: 'MateLab fix one mistake',
    brief: 'Many MateLab users finish one practice case but do not return the following week. The team can build a progress view and reminder but cannot create new lessons this month.',
    task: 'Specify the trigger, concrete next action, exposure and control conditions, primary metric, guardrails and what happens on a poor test result.',
    workedResponse: 'Trigger: A user finishes a case and receives a specific reasoning gap. Mechanic: Save that gap as a small revision task on the progress screen; at a time chosen by the user, a reminder opens the exact answer step. The learner edits and resubmits, then sees what improved. This uses existing content, not new lessons. Experiment: Randomize case completers into the mechanic or current results page. Primary measure: meaningful second practice within seven days, where a non-empty revised answer or a completed second case counts. Check opt-outs, empty resubmissions and feedback quality. Segment by initial score so a large effect is not merely caused by strong users. If returns increase through empty submissions, tighten the completion definition rather than declaring success.',
    assessment: 'Score a next step grounded in the user’s own mistake and a defensible measure of real practice.',
    weakAnswerFeedback: '“Add badges and daily pushes” supplies neither a case-specific task nor evidence of useful revision. Link to the exact missed reasoning step.',
    scoringExampleAlternative: 'Example: 1/10 = trigger 0, action 1, test 0, guardrails 0. A personalized next-case recommendation can also work if it addresses the diagnosed gap.',
    rubricVersion: 'creativity-ar-bank-v1', sourceRubric: 'Behavioral trigger 2 | useful repeat action 3 | valid test and metric 3 | guardrails 2', responseFields: AR_FIELDS, mappedWeights: [20, 15, 15, 30, 20], nextCaseId: 'CM-CRE-AR02', poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-AR02', code: 'AR02', category: 'activation-retention', categoryLabel: 'Activation and Retention', title: 'Nami second grocery order',
    brief: 'Nami has many first grocery orders but few second orders within 30 days. It can save baskets and send opted-in reminders, but has no discount budget this month.',
    task: 'Design a no-discount second-order mechanism with timing control, a comparison group, primary metric and two quality guardrails.',
    workedResponse: 'Trigger: A first grocery order has been delivered successfully. Mechanic: Let the shopper save recurring staples as a reusable basket, choose when to be reminded, edit quantities, then confirm a new paid order; never auto-purchase. The saved basket removes repetitive setup without discount spend. Test: Randomize first-order customers to the new post-delivery flow or current thank-you screen. Primary metric: second paid order within 30 days per first-order customer. Also inspect contribution per repeat order, cancellations, unwanted reminders and opt-outs, not only order count. Compare at equal follow-up age to avoid favoring early entrants. If repeat orders increase but contribution falls, revise timing or basket defaults before rollout.',
    assessment: 'Score fit with the natural replenishment cycle, user control and paid repeat behavior under the no-discount constraint.',
    weakAnswerFeedback: '“Send a coupon every day” breaks budget and timing constraints. Use a saved basket and an opt-in restock reminder.',
    scoringExampleAlternative: 'Example: 0/10 when the sole mechanic is an unfunded daily coupon. A replenishment checklist can be equally strong if it leads to a voluntary second paid order.',
    rubricVersion: 'creativity-ar-bank-v1', sourceRubric: 'Behavioral trigger 2 | useful repeat action 3 | valid test and metric 3 | guardrails 2', responseFields: AR_FIELDS, mappedWeights: [20, 15, 15, 30, 20], nextCaseId: 'CM-CRE-AR03', poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-AR03', code: 'AR03', category: 'activation-retention', categoryLabel: 'Activation and Retention', title: 'Casemate knowledge to practice',
    brief: 'Users read FMCG Domain Knowledge cards but often do not attempt a case afterward. Casemate can link existing cards and existing drills this sprint; it cannot author new material.',
    task: 'Define the card-to-drill match, placement, next action, an A/B test and the measures that show learning rather than clicks.',
    workedResponse: 'Trigger: The learner completes a Domain Knowledge card quiz. Mechanic: Show one existing Case Drill exercise that applies the same FMCG concept, with a one-sentence link such as “Use channel margin knowledge to diagnose this distribution case.” Provide start and bookmark actions; do not invent new content this sprint. Experiment: Randomize eligible card completers between this contextual recommendation and the current next-card view. Primary metric: completion of a relevant drill within seven days per eligible learner. Track recommendation views, starts and meaningful submissions to locate drop-off. Guardrails: card completion, quiz accuracy and irrelevant-match reports. If starts improve but completions fall, inspect drill difficulty and context relevance before expanding the recommender.',
    assessment: 'Score exact concept matching and progression to a completed case; a generic navigation button is too weak.',
    weakAnswerFeedback: '“Explore all drills” transfers selection work to the user. Show one matched drill and explain the connection.',
    scoringExampleAlternative: 'Example: 1/10 = trigger 0, action 1, test 0, guardrails 0. A card-specific practice queue is valid if it uses existing drills and raises completed practice.',
    rubricVersion: 'creativity-ar-bank-v1', sourceRubric: 'Behavioral trigger 2 | useful repeat action 3 | valid test and metric 3 | guardrails 2', responseFields: AR_FIELDS, mappedWeights: [20, 15, 15, 30, 20], nextCaseId: 'CM-CRE-AR04', poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    sourceCaseId: 'CM-CRE-AR04', code: 'AR04', category: 'activation-retention', categoryLabel: 'Activation and Retention', title: 'Tally recurring-expense setup',
    brief: 'Tally is a budgeting app. Users sign up but seldom log a second expense. The team can add manual recurring-expense rules but cannot connect bank accounts this quarter.',
    task: 'Propose a first-week second-entry mechanism without bank integration, including the prompt, user control, experiment and false-positive guardrail.',
    workedResponse: 'Trigger: After a user manually logs the first expense, invite them to save its category and next expected date as an optional recurring rule. Mechanic: When due, show a prefilled draft that must be confirmed, edited or skipped; it never records spending automatically. This reduces repeated entry effort while respecting uncertainty. Test: Randomize new first-entry users into this flow or the current onboarding. Primary metric: at least two user-confirmed entries within seven days per first-entry user. Watch false reminders, skipped drafts, opt-outs and incorrect amounts; distinguish a confirmed repeat expense from merely opening a reminder. If false prompts rise, narrow rules to predictable categories before scaling. No bank connection is assumed or required.',
    assessment: 'Score a feasible second action and accurate logging, not notification opens or automatically created entries.',
    weakAnswerFeedback: '“Sync the user’s bank and import transactions” ignores the quarter’s delivery constraint. Use confirmation of manual recurring drafts.',
    scoringExampleAlternative: 'Example: 0/10 for a bank-sync dependency this quarter. A manual “copy last entry” prompt can be valid if users confirm actual transactions.',
    rubricVersion: 'creativity-ar-bank-v1', sourceRubric: 'Behavioral trigger 2 | useful repeat action 3 | valid test and metric 3 | guardrails 2', responseFields: AR_FIELDS, mappedWeights: [20, 15, 15, 30, 20], nextCaseId: 'CM-CRE-PD01', poolIndustry: 'tech', poolType: 'strategy',
  },
];

// The first 16 stable IDs above are retained in source as migration context.
// The reviewed bank below merges those duplicates under the same IDs and adds
// PD05-PD10, BI05-BI10, IM05-IM10, and AR05-AR10.
export const CREATIVITY_CYCLE_2_CASES: CreativityBankCase[] = CREATIVITY_CASE_BANK_40;
void RETIRED_CREATIVITY_CYCLE_2_CASES;

const COMMON_CRITERIA = [
  ['problem_audience', 'Problem and audience'],
  ['case_grounded_idea', 'Case-grounded idea'],
  ['specific_mechanism', 'Specific mechanism'],
  ['feasibility_tradeoffs', 'Feasibility and trade-offs'],
  ['test_success_measure', 'Test and success measure'],
] as const;

export function creativityRubricForCase(item: CreativityBankCase): ExerciseRubric {
  const descriptions = [
    'Frames the exact problem, audience, behavior, occasion, objective, and supplied constraints.',
    'Builds from facts in this brief without inventing claims, figures, capabilities, or evidence.',
    'Explains specifically how the product, message, channel sequence, or behavior-change mechanic works.',
    'Respects operational, budget, safety, technical, timing, and user-control limits and names material trade-offs.',
    'Defines an observable behavior, valid comparison or paid signal, success metric, guardrail, and decision rule.',
  ];
  return {
    id: item.rubricVersion,
    label: `${item.categoryLabel} · ${item.sourceCaseId}`,
    criteria: COMMON_CRITERIA.map(([key, label], index) => ({ key, label, weight: item.mappedWeights[index], description: descriptions[index] })),
  };
}

export function creativityCaseBySourceId(sourceCaseId?: string): CreativityBankCase | null {
  return CREATIVITY_CYCLE_2_CASES.find((item) => item.sourceCaseId === sourceCaseId) || null;
}

export function serializeCreativityAnswers(item: CreativityBankCase, answers: Record<string, string>): string {
  return item.responseFields.map((field) => `${field.label}: ${String(answers[field.key] || '').trim() || '[empty]'}`).join('\n\n');
}

export const CREATIVITY_CYCLE_2_QUESTIONS: LibraryQuestion[] = CREATIVITY_CYCLE_2_CASES.map((item) => ({
  id: item.sourceCaseId,
  sourceCaseId: item.sourceCaseId,
  contentVersion: 'creativity-case-bank-v2',
  skill: 'creativity',
  difficulty: 'medium',
  title: `${item.code} · ${item.title}`,
  businessContext: item.brief,
  instruction: item.task,
  question: item.task,
  correctAnswer: item.workedResponse,
  explanation: `${item.assessment}\n\n${item.scoringExampleAlternative}\n\nSource rubric: ${item.sourceRubric}`,
  answerMode: 'text',
  workingPrompt: item.responseFields.map((field) => field.label).join(' · '),
  estimatedMinutes: 10,
  drillType: item.categoryLabel,
  industry: 'Cross-industry teaching case',
  businessProblem: item.categoryLabel,
  primarySkill: item.categoryLabel,
  reviewStatus: 'Published',
  calibrationStatus: 'already-at-target-v1',
  scoringRubric: creativityRubricForCase(item).criteria.map((criterion) => ({ criterion: criterion.label, points: criterion.weight, description: criterion.description })),
  alternativeConclusions: [item.scoringExampleAlternative, 'A different mechanism can earn full credit when it uses the same case facts, respects every constraint, and defines a valid test.'],
  personalizedFeedbackTemplate: 'Score and criterion breakdown; what the learner wrote using their actual words; first decisive gap; worked example; one or two prioritized revisions; next exercise.',
  commonMistake: item.weakAnswerFeedback,
  commonMistakes: [item.weakAnswerFeedback],
  learningObjective: item.assessment,
  recommendedNextDrillId: item.nextCaseId,
  weakAnswerFeedback: item.weakAnswerFeedback,
  creativityCategory: item.category,
  creativityAnswerFields: item.responseFields,
  creativityRubricVersion: item.rubricVersion,
}));

/** New exhibits found in legacy Creativity are routed out of Creativity because they test chart reading or structuring. */
export const CREATIVITY_ROUTED_EXHIBIT_QUESTIONS: LibraryQuestion[] = [
  {
    id: 'charts-carecircle-retention-route-v1', sourceCaseId: 'creativity-hard-insight-401', contentVersion: 'creativity-chart-route-v1', skill: 'charts', difficulty: 'medium', title: 'CareCircle retention evidence',
    businessContext: 'CareCircle is a subscription telehealth service. Management wants one retention initiative that can be tested within eight weeks using the current clinical team.',
    question: 'What is the decisive insight across the churn-reason and option-screen exhibits, what evidence supports it, and what does it imply for the first retention pilot?',
    correctAnswer: 'Slow follow-up is the largest churn reason at 35%. Automated follow-up has the strongest combined option screen at 8/10 expected impact and 9/10 feasibility, so it is the best first pilot under the no-new-capacity constraint.',
    explanation: 'The exhibit belongs in Charts because the skill is evidence → insight → implication, not creative ideation. The source values and source case ID are unchanged.', answerMode: 'text', drillType: 'Insight, evidence and implication', industry: 'Digital health', businessProblem: 'Customer retention', estimatedMinutes: 7,
    exhibits: [
      { id: 'carecircle-churn-treemap', datasetId: 'carecircle-churn-reasons', kind: 'treemap', title: 'Primary Reasons for Subscription Churn', unit: 'Percent of churned members', timePeriod: 'Last 6 months', categories: ['Slow follow-up', 'Price', 'Generic care plan', 'App friction', 'Other'], series: [{ name: 'Share', values: [35, 25, 20, 12, 8] }], analyticalPurpose: 'Identify the largest customer needs behind churn.', metrics: ['Churn reason share'], periods: ['Last 6 months'] },
      { id: 'carecircle-option-screen', datasetId: 'carecircle-retention-options', kind: 'grouped-bar', title: 'Retention Initiative Screen', unit: 'Score out of 10', timePeriod: 'Eight-week pilot estimate', categories: ['Automated follow-up', 'Price discount', 'Personalised care plan', 'App redesign'], series: [{ name: 'Expected retention impact', values: [8, 6, 7, 4] }, { name: 'Feasibility with current team', values: [9, 8, 6, 5] }], analyticalPurpose: 'Compare customer impact and delivery feasibility under the capacity constraint.', metrics: ['Expected impact', 'Feasibility'], periods: ['Pilot estimate'] },
    ],
  },
  {
    id: 'structures-swiftcare-growth-route-v1', sourceCaseId: 'creativity-expert-201', contentVersion: 'creativity-chart-route-v1', skill: 'structures', difficulty: 'medium', title: 'SwiftCare constrained-growth issue tree',
    businessContext: 'SwiftCare wants at least 20 billion VND of annualised gross profit within 12 months, cannot add employed clinicians, has 6 billion VND, three engineering squads, and a 12-month payback limit.',
    question: 'Build a case-specific issue tree to choose and sequence a growth portfolio. Separate demand and customer need, commercial impact, operational feasibility, and experiment gates.',
    correctAnswer: 'Root: Which focused growth portfolio can add at least 20 billion VND annualised gross profit in 12 months? Branches: demand evidence by segment; gross-profit path and payback; clinician, budget and engineering feasibility; sequencing, pilot design and scale gates.',
    explanation: 'The exhibits support a distinct case-specific issue tree, so the source is routed to Structures with its source case ID and figures preserved.', answerMode: 'text', drillType: 'Case-specific issue tree', industry: 'Digital health', businessProblem: 'Profitable growth', estimatedMinutes: 9,
  },
];

export function validateCreativityCycle2(): string[] {
  const errors: string[] = [];
  if (CREATIVITY_CYCLE_2_CASES.length !== 40) errors.push(`Creativity bank must contain 40 source cases; found ${CREATIVITY_CYCLE_2_CASES.length}.`);
  (Object.keys(CREATIVITY_CATEGORY_LABELS) as CreativityCategory[]).forEach((category) => {
    const cases = CREATIVITY_CYCLE_2_CASES.filter((item) => item.category === category);
    if (cases.length !== 10) errors.push(`${CREATIVITY_CATEGORY_LABELS[category]} must contain ten source cases; found ${cases.length}.`);
  });
  const sourceIds = new Set(CREATIVITY_CYCLE_2_CASES.map((item) => item.sourceCaseId));
  if (sourceIds.size !== CREATIVITY_CYCLE_2_CASES.length) errors.push('Creativity bank contains duplicate source case IDs.');
  CREATIVITY_CYCLE_2_CASES.forEach((item) => {
    if (!item.brief || !item.task || !item.workedResponse || !item.assessment || !item.weakAnswerFeedback || !item.scoringExampleAlternative) errors.push(`${item.sourceCaseId} is missing source content.`);
    if (item.responseFields.length < 5 || item.responseFields.some((field) => !field.key || !field.label || !field.help)) errors.push(`${item.sourceCaseId} has incomplete category response fields.`);
    if (item.mappedWeights.reduce((sum, weight) => sum + weight, 0) !== 100) errors.push(`${item.sourceCaseId} rubric weights must total 100.`);
    if (creativityRubricForCase(item).criteria.map((criterion) => criterion.label).join('|') !== COMMON_CRITERIA.map((criterion) => criterion[1]).join('|')) errors.push(`${item.sourceCaseId} does not use the five approved feedback labels.`);
    if (!sourceIds.has(item.nextCaseId)) errors.push(`${item.sourceCaseId} points to an unknown next exercise.`);
  });
  return errors;
}

const workedFixture = (sourceCaseId: string): string => CREATIVITY_CYCLE_2_CASES.find((item) => item.sourceCaseId === sourceCaseId)?.workedResponse || '';

export const CREATIVITY_CALIBRATION_FIXTURES = [
  { sourceCaseId: 'CM-CRE-PD03', category: 'product-development', strength: 'weak', expectedScoreBand: [0, 2], answer: 'An energy bar for everyone.' },
  { sourceCaseId: 'CM-CRE-PD03', category: 'product-development', strength: 'partial', expectedScoreBand: [3, 6], answer: 'Target and job: warehouse staff need a quick night snack. Concept: a low-crumb baked bite in a small pack that can be eaten one-handed. Target price VND 19,000. I would ask workers whether they like it.' },
  { sourceCaseId: 'CM-CRE-PD03', category: 'product-development', strength: 'strong', expectedScoreBand: [8, 10], answer: workedFixture('CM-CRE-PD03') },
  { sourceCaseId: 'CM-CRE-PD03', category: 'product-development', strength: 'alternative-valid', expectedScoreBand: [8, 10], answer: 'Target and job: warehouse staff need a clean one-hand snack during short night breaks. Concept: two savory rice-and-seed crisps in a tear-open sleeve, made on the existing bake-and-dry-pack line with no nuts or refrigeration. Constraint gate: allergen audit, one-hand opening, low crumbs, and unit costing below the VND 20,000 shelf cap. Prototype two textures on real night shifts, reject either if it needs two hands or leaves visible crumbs, then sell the winner at the staff kiosk for four weeks and use paid take-up, second purchase, discarded packs, and allergen complaints as the rollout decision.' },
  { sourceCaseId: 'CM-CRE-BI03', category: 'big-idea-key-message', strength: 'weak', expectedScoreBand: [0, 2], answer: 'Study harder with Mela.' },
  { sourceCaseId: 'CM-CRE-BI03', category: 'big-idea-key-message', strength: 'partial', expectedScoreBand: [3, 6], answer: 'Audience truth: students in libraries cannot find a kettle. Product truth: Mela mixes in cold water. Big Idea: Coffee without the kettle. Execution: show a student mixing it at the library water station.' },
  { sourceCaseId: 'CM-CRE-BI03', category: 'big-idea-key-message', strength: 'strong', expectedScoreBand: [8, 10], answer: workedFixture('CM-CRE-BI03') },
  { sourceCaseId: 'CM-CRE-BI03', category: 'big-idea-key-message', strength: 'alternative-valid', expectedScoreBand: [8, 10], answer: 'Audience truth: a short study break often offers cold water but no kettle. Product truth: Mela dissolves in cold water. Central idea: The coffee at the cold-water station. Message: Add Mela where you already refill. Execution: one uncut preparation film at the station and a shelf card repeating water, sachet, stir. Proof: verify dissolving time in the shown cup, ask exposed students to explain the steps without prompting, then compare paid choice against the current pack. Make no focus or energy claim.' },
  { sourceCaseId: 'CM-CRE-IM03', category: 'imc-plan', strength: 'weak', expectedScoreBand: [0, 2], answer: 'Go viral on social.' },
  { sourceCaseId: 'CM-CRE-IM03', category: 'imc-plan', strength: 'partial', expectedScoreBand: [3, 6], answer: 'Objective: promote the induction pan. Use creator videos first and store demonstrations second. Spend 150 million VND on creators and 350 million VND in stores. Track views and sales.' },
  { sourceCaseId: 'CM-CRE-IM03', category: 'imc-plan', strength: 'strong', expectedScoreBand: [8, 10], answer: workedFixture('CM-CRE-IM03') },
  { sourceCaseId: 'CM-CRE-IM03', category: 'imc-plan', strength: 'alternative-valid', expectedScoreBand: [8, 10], answer: 'Objective: 2,000 unique qualified demonstrations and 400 receipt-verified purchases in ten weeks. Message and proof: show the pan cooking on a real induction hob, with no durability claim. Weeks 1–2 retailer CRM and local creator demos, 100 million VND, book store slots. Weeks 2–9 trained retailer events, 320 million VND, use one demonstration ID per visitor. Weeks 5–10 consented stock and appointment follow-up, 80 million VND, link demo IDs to receipts. The budget totals 500 million VND and requires 20% demo-to-purchase conversion. Deduplicate people and repeat demos; check staffing, stock, comparable traffic, cost per qualified demo, conversion, and verified cost per purchase before shifting event days.' },
  { sourceCaseId: 'CM-CRE-AR04', category: 'activation-retention', strength: 'weak', expectedScoreBand: [0, 2], answer: 'Sync the user’s bank and import transactions.' },
  { sourceCaseId: 'CM-CRE-AR04', category: 'activation-retention', strength: 'partial', expectedScoreBand: [3, 6], answer: 'After the first expense, ask whether it repeats and remind the user next week. Let the user confirm the second expense. Measure reminder opens.' },
  { sourceCaseId: 'CM-CRE-AR04', category: 'activation-retention', strength: 'strong', expectedScoreBand: [8, 10], answer: workedFixture('CM-CRE-AR04') },
  { sourceCaseId: 'CM-CRE-AR04', category: 'activation-retention', strength: 'alternative-valid', expectedScoreBand: [8, 10], answer: 'Behavior: move from one manual entry to two user-confirmed entries in the first week. Trigger: immediately after the first expense, offer an optional “copy this later” rule for predictable categories. Mechanic and action: on the chosen date, open a copy of the prior entry as a draft that the user must edit, confirm, or skip; never auto-record it. Constraint: manual only, with no bank connection. Randomize first-entry users against current onboarding. Primary KPI: at least two confirmed entries within seven days. Guardrails: skipped drafts, wrong amount/category reports, opt-outs, and false prompts. If false prompts rise, limit the option to user-chosen predictable categories before rollout.' },
] as const;
