import type {
  CreativityAnswerField,
  CreativityBankCase,
  CreativityCategory,
} from './creativityCycle2';

interface CaseInput {
  code: string;
  title: string;
  brief: string;
  task: string;
  workedResponse: string;
  assessment: string;
  weakAnswerFeedback: string;
  poolIndustry: string;
  poolType: string;
}

const FIELDS: Record<CreativityCategory, CreativityAnswerField[]> = {
  'product-development': [
    { key: 'target-job', label: 'Target and job', help: 'Who is the user, in what moment, and what are they trying to get done?' },
    { key: 'unmet-need', label: 'Unmet need', help: 'State the specific tension or failure in the current experience.' },
    { key: 'concept-differentiator', label: 'Concept and differentiator', help: 'Describe the product format and why it solves this need distinctly.' },
    { key: 'constraints', label: 'Constraints', help: 'Show how the concept fits the supplied operations, price, safety, or technical limits.' },
    { key: 'prototype-validation', label: 'Prototype and validation test', help: 'Define the prototype, real-user behavior, paid signal where relevant, and decision rule.' },
  ],
  'big-idea-key-message': [
    { key: 'audience-truth', label: 'Audience truth', help: 'State the human tension in the exact use moment.' },
    { key: 'product-truth', label: 'Product truth', help: 'State the supplied, provable reason to believe.' },
    { key: 'central-idea', label: 'Central idea', help: 'Write the one organizing Big Idea.' },
    { key: 'key-message', label: 'One key message', help: 'Write one short, truthful message.' },
    { key: 'execution', label: 'Example execution', help: 'Show how the same idea appears in the requested touchpoints.' },
    { key: 'proof', label: 'Proof', help: 'Define visible proof and the comprehension or behavior test.' },
  ],
  'imc-plan': [
    { key: 'objective-audience', label: 'Objective and audience', help: 'Restate the exact outcome, timeframe, and audience.' },
    { key: 'insight-message', label: 'Insight and message', help: 'Connect the audience occasion to one truthful message.' },
    { key: 'phases', label: 'Phases', help: 'Lay out the sequence and timing.' },
    { key: 'channel-roles', label: 'Channel roles', help: 'Give each channel one job and explain its handoff.' },
    { key: 'budget', label: 'Budget', help: 'Allocate the full supplied budget and reconcile the total.' },
    { key: 'measurement', label: 'Measurement', help: 'Define attribution, deduplication, KPI, guardrail, and correction trigger.' },
  ],
  'activation-retention': [
    { key: 'behavior', label: 'Behavior to change', help: 'Name the exact current and desired behavior.' },
    { key: 'trigger', label: 'Trigger', help: 'Define the user event that starts the intervention.' },
    { key: 'mechanic', label: 'Mechanic', help: 'Explain how the intervention works.' },
    { key: 'user-action', label: 'User action', help: 'State the concrete voluntary action the user takes.' },
    { key: 'constraint', label: 'Operational constraint', help: 'Show how the idea respects the supplied delivery constraint.' },
    { key: 'experiment-kpi', label: 'Experiment and KPI', help: 'Set exposure/control, primary behavior metric, guardrails, and failure response.' },
  ],
};

const TRACKS: Record<CreativityCategory, {
  label: string;
  prefix: string;
  rubricVersion: string;
  sourceRubric: string;
  mappedWeights: [number, number, number, number, number];
}> = {
  'product-development': {
    label: 'Product Design', prefix: 'PD', rubricVersion: 'creativity-pd-bank-v2',
    sourceRubric: 'User problem 2 | meets limits 2 | how it works 3 | practical test 3',
    mappedWeights: [20, 20, 30, 15, 15],
  },
  'big-idea-key-message': {
    label: 'Big Ideas and Messages', prefix: 'BI', rubricVersion: 'creativity-bi-bank-v2',
    sourceRubric: 'Human tension 2 | product truth 2 | idea and message 3 | proof and test 3',
    mappedWeights: [20, 20, 30, 10, 20],
  },
  'imc-plan': {
    label: 'IMC Plans', prefix: 'IM', rubricVersion: 'creativity-imc-bank-v2',
    sourceRubric: 'Goal and audience 2 | channel jobs 3 | full budget 2 | tracking and results 3',
    mappedWeights: [20, 15, 15, 20, 30],
  },
  'activation-retention': {
    label: 'Activation and Retention', prefix: 'AR', rubricVersion: 'creativity-ar-bank-v2',
    sourceRubric: 'Right moment 2 | useful next step 3 | fair test and result 3 | quality checks 2',
    mappedWeights: [20, 15, 15, 30, 20],
  },
};

const PD: CaseInput[] = [
  {
    code: 'PD01', title: 'Moc commuter breakfast',
    brief: 'Moc sells shelf-stable food through convenience stores near offices and transit hubs. Commuters are the target audience. In 12 exploratory conversations, some said they have less than three minutes at home, while others can use hot water at work but will not carry a prepared meal on a crowded trip. These comments suggest a possible use occasion, not proven demand. Moc can blend dry food and pack small packets, but it has no refrigeration or cold chain. The product must be portable, low-mess, ready within three minutes, and priced at no more than VND 25,000. An early estimate puts dry mix and packet cost at VND 9,000; cup, filling, retailer margin, profit, and repeat demand are still unknown.',
    task: 'Choose one serving format and where preparation happens. Explain the fit with Moc’s current equipment, state a test price, and design an observed paid pilot with clear continue-or-stop rules.',
    workedResponse: 'Use a dry savory oat-and-bean cup prepared with hot water at work, so commuters carry only a sealed dry serving. Moc can blend and packet the mix now; it should cost cup filling and decide whether a partner is needed before promising margin. Test VND 24,000 after costing. Observe preparation time and spills, then sell two recipes in commuter stores. Continue only if at least 90% prepare it within three minutes without a spill, unit profit meets Moc’s minimum, and at least 20% of first-time buyers purchase again within 14 days.',
    assessment: 'Look for an observable commuter occasion, a specific format and preparation point, fit with current equipment, and a paid repeat signal. Interview interest and a target price are not proof of demand or margin.',
    weakAnswerFeedback: '“A healthy breakfast for busy people” does not specify the food, pack, preparation point, production fit, or a paid behavior test.',
    poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    code: 'PD02', title: 'Luma compact cleaner refill',
    brief: 'Luma sells household cleaners to renters in small apartments. Customers say bulky bottles compete for limited shelf space, and many keep a bottle after it is empty. Luma can mix liquids and seal small packets on existing lines, but it has no budget for a new bottle mold. The team wants a refill that stores flat and is prepared at home. The main risk is inconsistent dilution because customers own bottles of different sizes; too much or too little water could reduce cleaning performance or create unsafe use. The refill must retail below VND 50,000. In eight home visits, five renters kept an empty bottle, but dilution accuracy, leakage, satisfaction, and repeat purchase have not been tested.',
    task: 'Design the refill-and-reuse system, exact user steps, bottle compatibility and safety controls. Then define a paid real-home test with a safety failure gate.',
    workedResponse: 'Sell one measured concentrate packet for a clearly specified 500 mL compatible bottle, with a fill line and simple dilution steps. Use VND 45,000 as a test price only after checking costs and retailer margin. Validate seal integrity, stability, labeling, and safe handling first. In a two-week paid home test, observe unassisted dilution, bottle fit, leakage, cleaning satisfaction, and second purchase. Stop or redesign if dilution errors or leaks exceed preset safety limits, regardless of purchase interest.',
    assessment: 'Reward a compact system that customers can use safely with current production assets. A custom bottle, vague dilution, or an untested superior-cleaning claim breaks the brief.',
    weakAnswerFeedback: 'A premium “eco spray” with a new bottle ignores the tooling limit and does not solve safe dilution or bottle compatibility.',
    poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    code: 'PD03', title: 'Nexo night-shift snack',
    brief: 'Nexo supplies shelf-stable snacks to warehouse kiosks. Night-shift staff take short breaks and may eat while standing away from a table. One kiosk manager says large packs are often unfinished and crumbly food is awkward near workstations; treat this as an early clue, not a large study. Nexo can bake and dry-pack, and the retailer will not provide refrigeration. Nuts are prohibited, so ingredients and shared-line allergen exposure must be checked before sale. The pack should open and be eaten with one hand, create little mess, and cost no more than VND 20,000 at retail.',
    task: 'Design the snack texture and package. Show how it fits the line and nut-free requirement, then define real-shift observation and a paid kiosk test with a rejection rule.',
    workedResponse: 'Trial two low-crumb, individually wrapped oat-and-seed bites at a VND 19,000 test price. Audit ingredients and shared-line controls before sale. During real night shifts, observe opening time, whether one hand is enough, crumbs, and discarded portions. Sell a small batch at the staff kiosk and track unique paid take-up and second purchase rather than taste ratings alone. Reject the concept if it needs both hands, crumbles, or cannot pass allergen controls.',
    assessment: 'A generic energy bar is not enough. Strong answers specify texture, pack mechanics, actual break behavior, safety verification, and repeat purchase.',
    weakAnswerFeedback: '“An energy bar for everyone” ignores one-hand use, mess, the price cap, and the nut-free production requirement.',
    poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    code: 'PD04', title: 'Aster first-apartment pan',
    brief: 'Aster makes induction-compatible cookware with an established base and coating process. Young renters in compact kitchens want one pan for simple meals, but storage is limited and a full set is too expensive. This cycle Aster may change diameter, profile, and handle shape; it cannot add a coating line. A detachable handle could save space but creates locking and hot-pan misuse risks. A fixed nesting handle is less novel but may be simpler to make. The retail price must stay at or below VND 300,000. In ten home visits, seven cabinets were less than 30 cm deep. Heat distribution, lock durability, storage gain, and manufacturing cost remain unknown.',
    task: 'Choose one pan route. Explain its cooking and storage value, identify the main technical failure, and sequence engineering, home-use, and paid-launch tests.',
    workedResponse: 'Prototype a compact induction pan using the current base and coating. Test a detachable handle only if costing supports a VND 289,000 retail trial. First verify heat distribution and repeated locking under normal and likely hot-pan misuse. Then observe 20 renters cooking and storing it at home. If safety passes, sell a limited run and monitor returns, handle defects, storage use, and price acceptance. A fixed nesting handle is equally valid if it provides storage gain more safely.',
    assessment: 'Prioritize safe cooking, manufacturing fit, and reasonable economics over novelty. New coating technology is out of scope.',
    weakAnswerFeedback: 'A “revolutionary non-stick pan” invents a new coating process and does not resolve the handle and storage trade-off.',
    poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    code: 'PD05', title: 'Pico small study lamp',
    brief: 'Pico makes low-cost desk lamps for students. In shared rooms, students often study at a narrow desk while a roommate sleeps. In ten home visits, six students aimed their lamp at a wall to keep light away from the other bed. Pico may change the lamp head and shade but must retain its current LED parts and plug-in power supply. A battery model would require new testing and is outside this launch. A smaller shade may save space but could increase glare or heat. The target price is at most VND 250,000. Pico can build 30 test units; heat, light level, glare, desk fit, and real study use still need validation.',
    task: 'Propose one lamp shape and use moment. Explain how it uses current parts, then set safety, comfort, home-use, and paid-demand gates before a larger launch.',
    workedResponse: 'Build a narrow-base lamp with a movable head and a deeper shade that directs light onto one book while using Pico’s existing LED and plug. Measure heat, glare, and light level after long use before home testing. Give 30 units to students for two weeks and observe desk fit, aiming, reading comfort, and spill toward roommates. After safety passes, offer a small paid sale at a costed price. Continue only if safety limits pass, most students can aim it easily, and the price covers costs.',
    assessment: 'The concept should solve shared-room light spill with existing parts. A battery lamp breaks the launch limit, and demand interest cannot overrule heat or glare failures.',
    weakAnswerFeedback: 'Adding a battery or app makes the concept sound new but ignores the allowed parts, price, heat, glare, and roommate problem.',
    poolIndustry: 'retail', poolType: 'growth',
  },
  {
    code: 'PD06', title: 'Rova apartment parcel handoff',
    brief: 'Rova provides a simple app for apartment staff. In busy buildings, staff write parcel names in a notebook; residents sometimes collect the wrong parcel or make repeated trips to the desk. Managers want a faster arrival-to-pickup process without buying lockers or scanners this quarter. Staff can use shared phones and print basic labels, while some residents do not want to install an app. One test building handles about 120 parcels per day, with 15% arriving during the evening rush. Residents can receive an SMS link, but the process needs a safe fallback for people without a phone or when a code fails.',
    task: 'Design the complete parcel arrival, notification, verification, and pickup flow, including fallback. Define a two-week building test with speed, error, and rush-hour measures.',
    workedResponse: 'Give each parcel a simple printed ID. Staff photograph it, record the flat number, and send an SMS pickup code. At collection, match both code and flat number before marking the item collected; use an ID check and staff lookup as the no-phone fallback. Test normal and evening-rush periods for two weeks against the notebook process. Compare pickup time, wrong handoffs, repeat visits, and unresolved notifications. Stop if wrong handoffs increase even when the queue is faster.',
    assessment: 'Credit a complete handoff, dual verification, and a workable fallback. An app-only answer excludes some residents and does not address failed codes.',
    weakAnswerFeedback: '“Build a resident app” ignores the no-install group, existing shared-phone constraint, and the need to prevent a wrong handoff.',
    poolIndustry: 'tech', poolType: 'operations',
  },
  {
    code: 'PD07', title: 'Hapi bike rain cover',
    brief: 'Hapi sews bags and light outdoor accessories. Motorbike riders often arrive with a wet backpack, yet many rain covers are hard to fit after rain has already started. Short street interviews suggest riders want a cover they can pull on without removing the backpack. Hapi can cut and sew coated fabric but cannot add a seam-sealing machine this season. The buyer wants a retail price below VND 120,000 and fit across common backpack sizes. The intended user should be able to fit the cover in under one minute, even while wearing a helmet. Water may still enter near seams or straps, so claims must match test results.',
    task: 'Describe the cover shape, storage and fitting action. Identify the main water-entry risk, then design real-rain and paid-sale tests with preset failure limits.',
    workedResponse: 'Use an elastic-edge cover with two easy-to-find pull tabs and a pouch fixed to the bag strap. Test fit across common bags and measure fitting time while riders wear helmets in light and heavy rain. Inspect wet spots at seams and straps; call it water-resistant rather than waterproof if leakage remains. Sell a small batch near commuter routes and track returns, price response, and repeat use across rainy days. Redesign if fitting time or wet contents exceed preset limits.',
    assessment: 'Strong answers address speed, bag-size fit, water entry, honest claims, and current sewing limits rather than color or styling alone.',
    weakAnswerFeedback: 'A bright waterproof cover is only a description; it does not explain quick fitting or how unsealed seams affect the claim.',
    poolIndustry: 'retail', poolType: 'growth',
  },
  {
    code: 'PD08', title: 'Folio interview prep cards',
    brief: 'Folio prints study cards for university students. Career clubs say members want to practise interview answers together, but long guidebooks are rarely carried to meetings. Folio can change the question set, pack size, and instructions on its existing card-printing line; it cannot build an app this term. The pack should help two students complete useful practice and feedback in a 20-minute session without presenting one model answer as the only correct response. Target retail price is at most VND 99,000. Four clubs with 8–12 students each can test the pack. Success means completed rounds and specific feedback, not card sales alone.',
    task: 'Design the card types, partner practice steps, and feedback method. Define what the four-club test and a limited paid run must show before wider printing.',
    workedResponse: 'Create three card types: interview question, short answer structure, and feedback prompt. One partner draws a question, answers for two minutes, and gets feedback tied to the prompt; then they swap. In four meetings, observe whether pairs complete several rounds within 20 minutes and can each name one specific improvement. Sell a limited batch to clubs and check whether they use it again at the next meeting. Rewrite confusing cards before a larger print run.',
    assessment: 'The physical pack must create repeated practice and useful peer feedback. A list of questions without a session flow is too thin.',
    weakAnswerFeedback: 'A deck of model answers risks imitation and does not create a two-person practice and feedback routine.',
    poolIndustry: 'retail', poolType: 'growth',
  },
  {
    code: 'PD09', title: 'Clipster neater shared desks',
    brief: 'Clipster makes small plastic desk parts for students using shared study tables. Chargers and cables are often moved to create space, then left tangled for the next person. The source PDF redacts one production noun; for this fictional exercise, use the stated operating fact that Clipster’s current setup can make one clip shape in two sizes, with no electronics. A campus library will allow a two-week trial on 20 desks if the clips do not mark tables or block cleaning. The clip must fit different cable widths, be removable quickly, and retail below VND 39,000 for a set of two.',
    task: 'Choose the clip shape, attachment method, and user action. Define fit, surface-safety, cleaning, observed-use, and paid-sale tests with a clear stop rule.',
    workedResponse: 'Try a soft-edge clip in two sizes that grips a charger cable at the table edge without glue. Bench-test common cable widths and repeated attachment, removal, and cleaning for marks. Place clips on 20 library desks for two weeks and observe whether students can use them unaided and whether cleaners leave them in place. Offer a small paid two-pack at VND 35,000 after costing. Stop if tables are marked, cable fit is poor, or cleaning staff must repeatedly remove the clips.',
    assessment: 'The answer should solve the shared-desk problem while protecting library surfaces and cleaning access. Electronics or permanent adhesive break the constraints.',
    weakAnswerFeedback: 'A smart cable tracker adds electronics and does not address marks, cleaning, two cable sizes, or the low price.',
    poolIndustry: 'retail', poolType: 'operations',
  },
  {
    code: 'PD10', title: 'Lensa low-data interview practice',
    brief: 'Lensa offers practice questions for students preparing for internship interviews. Many use mobile data on the way to campus and cannot reliably play long video lessons. Lensa already has text prompts and an answer recorder that can save a draft on the phone. It cannot build live video calls or fund new question writing this term. Students want feedback they can act on later but worry that a recorded answer will disappear when the signal drops. The team can test with 40 students using low-data settings and should track completed answers, revisions, upload recovery, and lost drafts.',
    task: 'Design a short weak-connection practice flow, local-save status, upload-failure recovery, and a 40-student test of reliability and learning usefulness.',
    workedResponse: 'Show one short text question and allow a two-minute recorded or typed answer. Save the draft locally before upload and show separate “saved on this phone” and “sent” states. If upload fails, keep the draft and offer Retry when connected. In low-data tests, ask 40 students to complete, review, and revise one answer. Track saved completions, successful later uploads, revisions, and lost-draft reports rather than page opens. Do not promise live coaching.',
    assessment: 'Strong answers protect the learner’s work, explain offline and online states, and test meaningful completed practice under weak connectivity.',
    weakAnswerFeedback: 'A live video coach breaks the delivery limit and makes the weak-connection problem worse.',
    poolIndustry: 'tech', poolType: 'operations',
  },
];

const BI: CaseInput[] = [
  {
    code: 'BI01', title: 'Treo pocket bag',
    brief: 'Treo sells a reusable shopping bag that folds into a small pouch. Campus interviews reveal a common tension: students remember a bag for planned grocery trips but forget one when an errand appears after class. Treo has no verified life-cycle or waste-savings figures, so the campaign cannot quantify environmental impact. A nearby campus retailer can host a counter display, and the brand can produce one short social film. The true product behavior is that the bag folds small enough to carry routinely, but the actual folded dimensions must be verified. The desired behavior is carrying it for later unplanned errands.',
    task: 'State the human tension, Big Idea, short message, two connected executions, product proof, and one comprehension or later-carry behavior test.',
    workedResponse: 'Human tension: good intentions fail when an errand is unplanned. Big Idea: “The bag already in your pocket.” Message: “Carry it small; open it when plans change.” The film follows an after-class purchase and shows the real unfold; the counter display lets shoppers repeat the pocket-to-bag action. Verify the folded size. Ask viewers to explain the message unaided, then check whether buyers carry the bag on a later errand. Keep environmental benefits qualitative unless measured.',
    assessment: 'The idea must connect the forgotten-bag moment to visible portability. A generic environmental slogan lacks distinctive product proof.',
    weakAnswerFeedback: '“Save the planet with Treo” implies unmeasured impact and could advertise any reusable bag.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    code: 'BI02', title: 'Oro bottle on the move',
    brief: 'Oro sells a slim refillable water bottle with visible volume marks to people moving between transit, shared workspaces, and meetings. Early comments suggest wide bottles feel awkward in packed bags and users may not notice how much remains, but these comments are not evidence of a health problem. Oro can fund one short video and a product-page sequence. The visible proofs are bag fit and readable marks in ordinary light; both must be verified on camera. The campaign must not make health outcomes, daily-intake advice, or performance claims.',
    task: 'Create one Big Idea and key message that links the mobile-workday tension to both product features. Show the same proof in video and product-page modules, then test understanding.',
    workedResponse: 'Big Idea: “Your day, in visible sips.” Message: “See your next refill before the next stop.” Film the bottle fitting into a real work bag, then show readable marks at transit, desk, and refill. Repeat those exact proof moments on the product page. Compare comprehension and recall with a feature-only version, and check for unintended health inferences. Do not prescribe water intake.',
    assessment: 'A generic hydration line could fit any bottle. Reward a coherent idea that demonstrates slim fit and visible marks without a health promise.',
    weakAnswerFeedback: '“Drink more, live better” does not prove either feature and suggests an unsupported health outcome.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    code: 'BI03', title: 'Mela cold-mix coffee',
    brief: 'Mela sells instant coffee in a packet designed to dissolve in cold water. Students studying in shared libraries often have a water station but no kettle; some spaces restrict hot drinks or allow only short breaks. Mela has demonstrated cold mixing internally, but public proof of dissolving time and result in an ordinary student cup is still needed. The brand can make one short preparation video and a small point-of-sale card near campus. It cannot claim better concentration, energy, or nutrition.',
    task: 'State the preparation barrier and product proof, then create a Big Idea, message, repeatable visual action across two touchpoints, and a paid learning test.',
    workedResponse: 'Big Idea: “Coffee without the kettle.” Message: “Cold water is enough when the break is short.” Use one continuous shot showing water, packet, stirring, and a drinkable cup; repeat the same steps on the shelf card. Verify dissolving time and taste in an ordinary cup. Test whether students can explain preparation unaided and whether exposed students buy it in a small paid trial. Avoid study-performance claims.',
    assessment: 'A strong idea removes the no-kettle barrier visibly. “Study harder” does not prove the product action.',
    weakAnswerFeedback: 'A performance slogan invents a benefit and hides the only supplied reason to believe: cold-water preparation.',
    poolIndustry: 'fmcg', poolType: 'strategy',
  },
  {
    code: 'BI04', title: 'MateLab ten-minute practice',
    brief: 'MateLab offers ten-minute consulting case drills followed by feedback tied to the learner’s reasoning. Applicants often delay practice because a full case feels like a 45–60 minute commitment. In a small onboarding review, several prospects opened the library but did not choose a first exercise; time, difficulty, and choice overload are all possible causes. The next campaign can change the ad and landing screen but cannot promise interview success. The product truth is one ten-minute drill with answer-specific feedback. Success is meaningful completion and revision, not clicks alone.',
    task: 'Translate the barrier into one Big Idea and truthful message. Show the timer-answer-feedback proof across an ad and one recommended landing-screen drill, then define behavioral success.',
    workedResponse: 'Big Idea: “One short case. One clearer next step.” Message: “Use ten minutes to find the reasoning gap to work on next.” Show a real timer, submitted answer, and corresponding feedback in the ad; link to the same recommended drill on landing. Audit that the sample feedback matches the shown answer. Compare first-drill starts, meaningful completions, and revisions with the current entry message.',
    assessment: 'Reward a clear first action and honest diagnostic proof. “Ace every interview” overpromises and does not show how the product works.',
    weakAnswerFeedback: 'An interview-success promise ignores the ten-minute action, answer-specific feedback, and meaningful completion metric.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'BI05', title: 'Nola folding lunch box',
    brief: 'Nola makes a lunch box that folds flat after use. Office workers who bring lunch on public transport dislike carrying an empty rigid box home on a crowded train. Nola can film one commute and use product photos on its shop page. The clean, empty box has been measured at 2 cm thick when folded, but the seal when full still needs checking. Nola has not measured environmental impact or cost savings, so those claims are unavailable. The creative task is to make the change from a full lunch container to a small object on the journey home easy to understand in both touchpoints.',
    task: 'State the human truth, Big Idea, short message, matching film and shop-page executions, required product proof, and a paid-response test.',
    workedResponse: 'Big Idea: “Lunch comes home lighter.” Message: “Carry lunch full. Carry the box flat.” The film shows morning packing, lunch, cleaning, the 2 cm fold, and the ride home; the shop page repeats the full-versus-flat comparison beside a work bag. Verify the full-box seal before sale. Ask viewers what changes after lunch, then test paid orders and monitor returns for leaks or difficult folding. Avoid unmeasured green claims.',
    assessment: 'The message should explain the real after-lunch transformation. Product demonstration matters more than a vague sustainability line.',
    weakAnswerFeedback: '“A greener lunch” is unsupported and does not explain why the folded box helps on the commute home.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    code: 'BI06', title: 'Velo wet umbrella sleeve',
    brief: 'Velo sells a washable sleeve for a closed wet umbrella. Commuters entering a bus, office, or shop face an awkward doorway moment when water drips onto floors and belongings. The sleeve opens easily and has a small inner water pocket, but Velo has not proved that it keeps every bag dry in heavy rain. The brand has one short video and signs at a transit-side shop. It needs one simple idea and repeatable action that show the doorway problem and real product use without exceeding the tested claim. Speed of use and leakage after carrying remain proof questions.',
    task: 'Write the Big Idea and key message, define one shared visual action across video and shop sign, and set comprehension, speed, leak, and trial measures.',
    workedResponse: 'Big Idea: “Rain stops at the door.” Message: “Close it. Sleeve it. Walk in.” The video shows those three steps at a bus door, and the shop sign uses the same sequence. Test how quickly commuters can use it and whether water leaks in normal rain before making any dry-bag claim. Ask viewers to explain the steps without help and observe whether shoppers try the sleeve at the display.',
    assessment: 'The idea should dramatize the doorway tension and visible sleeve action in both places, with claims limited to tested rain conditions.',
    weakAnswerFeedback: '“Never get wet again” overclaims and does not explain the three-step use moment.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    code: 'BI07', title: 'Hilo quick expense entry',
    brief: 'Hilo is a simple daily-spending app. Users often remember a purchase when they see the receipt but delay opening a full budgeting screen. Hilo has a one-tap entry start followed by amount and recent-category confirmation. It cannot connect to banks or import transactions automatically, and it has no evidence that logging makes people save money. The brand can use one short social clip and the welcome screen. A useful outcome is a real first confirmed entry followed by a second confirmed entry within one week.',
    task: 'Create a Big Idea, message, matching social and welcome-screen executions, visible product proof, and a behavior test based on confirmed entries.',
    workedResponse: 'Big Idea: “Catch it while it is fresh.” Message: “Log the purchase before the receipt disappears.” Show a receipt, one-tap start, entered amount, and category confirmation in the clip; the welcome screen opens with the same action. Check whether viewers can explain the steps, then compare first and second confirmed entries with the current welcome screen. Do not claim savings from logging alone.',
    assessment: 'Credit a simple action tied to the receipt moment and real confirmation. A savings promise is not supported.',
    weakAnswerFeedback: '“Save more money with Hilo” claims an outcome the app has not demonstrated and hides the entry flow.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'BI08', title: 'Casemate see your next gap',
    brief: 'Casemate helps students prepare for a chosen Management Trainee or consulting path. Some already know their target but cannot tell which part of their profile to improve first. Casemate can review a CV and answers, then show an evidence-based fit breakdown and preparation plan. The result guides preparation; it does not predict an offer or guarantee an interview. The campaign can change a social ad and the first screen. Success is a completed Target Fit review followed by starting one plan task, not clicks.',
    task: 'Write the human tension, Big Idea, message, matching ad and first-screen sequence, product proof, and a behavior test that avoids hiring predictions.',
    workedResponse: 'Big Idea: “Know the gap. Make the next move.” Message: “Choose your target, see what to improve, start with one task.” In the ad, show target selection, one evidence-backed gap, and the first action; use the same sequence on the first screen. Test whether viewers understand the score as preparation guidance. Compare completed fit reviews and first plan tasks with the current message.',
    assessment: 'The idea should connect a known target to a specific preparation action without treating fit as an offer prediction.',
    weakAnswerFeedback: '“Find out whether you will get the job” turns guidance into an unsupported hiring prediction.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'BI09', title: 'Fora battery level in sight',
    brief: 'Fora sells a small portable charger with a clear percentage display. Commuters sometimes leave home unsure whether the charger has enough power for their day. Fora can demonstrate the display in one short video and on a store card. It has not verified fast charging, charging time across different phones, or an all-day battery promise. The useful moment is checking what to pack before a commute, and the only supplied product truth is the visible battery percentage.',
    task: 'Write one Big Idea and message, show the same pre-commute display action in video and store card, and define a test of feature understanding and purchase usefulness.',
    workedResponse: 'Big Idea: “Know before you go.” Message: “Check the number. Take the power you have.” Show a commuter checking the display while packing, then repeat the same close-up on the store card. Test whether viewers remember the percentage feature and can explain when it helps; ask buyers whether it affected their choice. Do not imply fast charging or guaranteed all-day power.',
    assessment: 'The display must matter at a real departure moment. Extra battery-performance claims are unsupported.',
    weakAnswerFeedback: '“Power all day, instantly” adds two claims the brief explicitly does not prove.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
  {
    code: 'BI10', title: 'Kite wipe-and-reuse note cards',
    brief: 'Kite sells study note cards that can be written on and wiped clean with a supplied cloth. Study groups create quick question cards but often discard paper after one session. Kite can demonstrate writing, quizzing, and wiping on camera, but it does not know how many reuse cycles each card survives or how much waste is reduced. The available touchpoints are a campus short video and a shelf display. The creative job is to make a repeat-study routine easy to picture without an exact durability or environmental claim.',
    task: 'State the group-study truth, Big Idea, message, linked video and shelf-display actions, product proof, and a paid repeat-use test.',
    workedResponse: 'Big Idea: “One card, another round.” Message: “Write it. Quiz it. Wipe it. Try again.” Show the entire group routine in the video and repeat the same steps on the shelf display. Test wipe quality through several rounds and ask viewers to explain the routine unaided. In a small paid trial, observe whether groups bring the cards to a second study session. Avoid exact reuse or waste-saving numbers.',
    assessment: 'The idea should make the repeat action memorable and prove what the card does without quantifying untested durability or impact.',
    weakAnswerFeedback: '“Zero-waste studying forever” claims both environmental impact and durability that have not been measured.',
    poolIndustry: 'retail', poolType: 'strategy',
  },
];

const IM: CaseInput[] = [
  {
    code: 'IM01', title: 'Mela university tea launch',
    brief: 'Mela is launching ready-to-drink herbal tea through partner stores near four university areas. The audience is students aged 18–24. In eight weeks, Mela wants 6,000 unique verified first trials using a total VND 300 million for media, sampling, and follow-up. Students buy drinks between classes, but a free cup does not prove a unique person tried it or knows where to buy it again. Each partner store estimates up to 250 staffed handoffs per week if stock and staffing hold. Duplicate sampling, shared codes, and later paid purchase must be separated. The brief supports no health-effect claim.',
    task: 'Build an occasion-led message, phased channel roles, and a full 300 million VND budget. Define verified unique trial, attribution, deduplication, and a correction trigger.',
    workedResponse: 'Use “A quick pause between classes.” Spend 80 million VND on student-made occasion videos in weeks 1–2, 140 million VND on staffed partner-store sampling in weeks 3–6, and 80 million VND on consent-based stock-location follow-up in weeks 7–8. Verify first trial with a staff-scanned one-use token and count each person once; report cups served and later paid purchase separately. The budget is VND 50,000 per target trial. Shift spend only after checking stock and staff coverage.',
    assessment: 'Look for a credible awareness-to-unique-trial path, exact budget math, operational capacity checks, and no unsupported health claim.',
    weakAnswerFeedback: 'A list of TikTok, KOLs, and sampling has no channel handoff, budget reconciliation, or definition of a unique verified trial.',
    poolIndustry: 'fmcg', poolType: 'growth',
  },
  {
    code: 'IM02', title: 'Vera first fitness plan',
    brief: 'Vera is a beginner fitness app with a seven-day introductory plan. Over six weeks, the business wants 4,000 unique users to complete the plan using VND 200 million. Installs are already healthy, but many users start and stop after an early session. In a previous group, 40% of starters completed every required session, though paid-channel users may behave differently. Vera can attribute starts and session completion to acquisition source, use creator demonstrations, onboard through gym QR codes, and send reminders only to people who opt in.',
    task: 'Design a six-week sequence, allocate the full budget, explain channel handoffs, define valid plan completion, and set a quality check and correction rule.',
    workedResponse: 'Promise “Begin with a realistic first week.” Spend 50 million VND on creator demonstrations linked to the plan start, 90 million VND on gym QR onboarding, and 60 million VND on optional reminders for the next unfinished session. Count one valid completion only when all required sessions are completed, not skipped. The budget is VND 50,000 per target completion. Track start-to-completion by source and reminder turn-offs; if installs rise but completions do not, fix onboarding before buying more traffic.',
    assessment: 'Credit continuity around one seven-day plan and a valid completion definition. Optimizing installs changes the objective.',
    weakAnswerFeedback: '“Get 10,000 downloads” ignores the stated completion outcome and the start-to-finish drop-off.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM03', title: 'Aster induction pan demos',
    brief: 'Aster is launching an induction-compatible pan through ten retailers over ten weeks. The budget is VND 500 million, with goals of 2,000 unique valid demonstrations and 400 receipt-verified purchases. Two stores lack a working induction hob, and staffed sessions can handle about four visitors per hour. Creator video can prove induction use but cannot let viewers test handling. Durability is not yet validated. If every purchase follows a demo, the required demo-to-purchase conversion is 20%. Staffing and stock vary by store.',
    task: 'Give creator content, retail demos, and follow-up distinct roles; allocate all 500 million VND; define valid demos, source-to-receipt tracking, and a store-level correction rule.',
    workedResponse: 'Spend 120 million VND on creator induction demonstrations in weeks 1–3, 280 million VND on trained staff and working store setups in weeks 3–8, and 100 million VND on consent-based availability follow-up in weeks 6–10. Count a valid demo when one unique visitor sees cooking on a working induction hob and handles the pan. Link store demo IDs to receipts. Track demos and purchases per staffed hour and stocked day; do not claim durability.',
    assessment: 'Reward the online-to-store handoff, working demo capacity, receipt linkage, full budget, and both outcome targets. Reach alone is insufficient.',
    weakAnswerFeedback: 'A viral creator campaign does not produce or verify 2,000 hands-on demonstrations and 400 purchases.',
    poolIndustry: 'retail', poolType: 'growth',
  },
  {
    code: 'IM04', title: 'Orin cafe inventory SaaS',
    brief: 'Orin sells a simple inventory-alert tool to independent cafes. Owners often discover ingredient shortages during service but have little time for a long sales call. In eight weeks, Orin wants 100 unique valid live owner demos using VND 150 million. It can work with a cafe association, run short live webinars, and book one-to-one walkthroughs. A past webinar produced 100 registrations, 45 attendees, 12 booked owner demos, and seven attended demos. A webinar viewer may be staff or a supplier, so cafe ownership, appointment, attendance, and deduplication are required.',
    task: 'Design the channel sequence and full budget. Define lead qualification, one-person counting, attended-demo attribution, and the correction trigger suggested by the past funnel.',
    workedResponse: 'Lead with “See a stock alert before a shortage becomes a service problem.” Allocate 30 million VND to association explainers, 60 million VND to live workflow webinars, and 60 million VND to qualifying, booking, and running one-to-one demos. Validate that the attendee owns or operates an independent cafe and deduplicate by person and cafe. The target budget is 1.5 million VND per attended demo. If bookings are healthy but attendance is weak, fix timing and reminders before buying more leads.',
    assessment: 'A registration or webinar view is not the valid outcome. Strong answers verify cafe operators and count attended live walkthroughs once.',
    weakAnswerFeedback: '“Generate 1,000 leads” replaces the qualified attended-demo goal with an easier but less useful number.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM05', title: 'Riva campus resale week',
    brief: 'Riva runs a student resale platform. Across three campuses, it wants 1,000 completed item exchanges in eight weeks using VND 120 million. A listing or chat is not an exchange because a buyer may not show up and a seller may remove the item. Student clubs can make item videos, Riva can host supervised pickup days, and the app can send permission-based meeting reminders. Each campus has different club reach and pickup space; each can host two pickup days per week. The app records listings and messages, but a valid handoff must be confirmed by both buyer and seller for the same item ID.',
    task: 'Assign each channel one job, allocate all 120 million VND, define a verified deduplicated handoff funnel, and set a rule for shifting spend when one campus falls behind.',
    workedResponse: 'Put 30 million VND into club videos showing real items, 65 million VND into staffed pickup days, and 25 million VND into opted-in reminders and campus maps. Count an exchange only when buyer and seller confirm the same item ID. Track views, chats, booked handoffs, and completed handoffs by campus. The target budget is VND 120,000 per exchange. If chats are high but handoffs are low, fix meeting times, safety, and pickup space before buying more reach.',
    assessment: 'Reward a safe path to a real exchange, full budget, two-sided verification, and a campus-level correction rule. Listings alone do not meet the goal.',
    weakAnswerFeedback: 'More listings and views are not proof that 1,000 buyer-seller handoffs happened.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM06', title: 'Pico lamp retail launch',
    brief: 'Pico will sell a small study lamp through eight electronics stores over ten weeks. The campaign has VND 300 million and must produce 1,500 real hands-on demonstrations plus 300 receipt-verified purchases. Students need to see how the lamp lights one book without illuminating a roommate’s space. Creator clips can show the moment, but three stores lack a suitable quiet demo corner. Staff can be trained and corners can be installed. If every sale follows a demo, required demo-to-purchase conversion is 20%.',
    task: 'Set one truthful message, phased channel jobs, timing, and a complete 300 million VND budget. Define valid demos, handoff tracking, and diagnostic actions when visits, demos, or sales are weak.',
    workedResponse: 'Use “Light for your desk, not the whole room.” Spend 70 million VND on creator proof in weeks 1–3, 170 million VND on trained staff and working demo corners in weeks 2–8, and 60 million VND on store-availability posts and opted-in follow-up in weeks 6–10. Use one demo code per visitor and match it to receipts where possible. If visits rise but demos do not, fix setup and staffing; if demos rise but purchases do not, test price and product fit.',
    assessment: 'A good plan funds the in-store proof and tracks people from content to useful demonstration to purchase.',
    weakAnswerFeedback: 'Putting the whole budget into creator reach ignores the three unusable store environments and the hands-on target.',
    poolIndustry: 'retail', poolType: 'growth',
  },
  {
    code: 'IM07', title: 'Orin cafe stock alerts',
    brief: 'Orin is entering a new city with its inventory-alert tool for independent cafes. It has eight weeks, VND 120 million, and a goal of 80 cafe owners or managers who attend a live product walkthrough. A local cafe group can share one message, and Orin can run short live sessions showing a real stock alert. In a small earlier test, 40 people registered for a webinar, 20 attended, and four owners later attended a one-to-one demo. Treat this funnel as a clue, not a forecast. Raw names and webinar views are not valid demos.',
    task: 'Build the education, booking, and attended-demo sequence; allocate all 120 million VND; define qualification, source handoff, and a correction rule using the early funnel.',
    workedResponse: 'Spend 25 million VND on the cafe group message, 45 million VND on live stock-alert sessions, and 50 million VND on calls that qualify, book, and run owner demos. Confirm owner or manager status before counting. The target budget is 1.5 million VND per valid demo. Track signup, webinar attendance, booking, and attended one-to-one demo by source. If bookings are high but attendance is low, improve timing and reminders before expanding awareness.',
    assessment: 'Count live qualified owner demos, not webinar views or names. Use the small test diagnostically without assuming its rates will repeat.',
    weakAnswerFeedback: 'A lead target avoids the harder requirement that 80 real cafe decision-makers attend a product walkthrough.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM08', title: 'Casemate Target Fit launch',
    brief: 'Casemate is launching a free Target Fit review for students who already have a Management Trainee or consulting goal. In six weeks, it wants 2,000 people to finish the review and 800 to start a first plan task using VND 250 million. The current public message mainly asks people to discover a career path, so the new target-first route must be clear. Available channels are campus groups, student creators, and a short permission-based email sequence. A completed review requires target selection, CV check, and all questions. Drop-off may occur at sign-up, CV upload, questions, or plan start.',
    task: 'Create the target-first message, phased channel jobs, full budget, step-by-step funnel measurement, and a rule for fixing the weakest step.',
    workedResponse: 'Use “Know where you stand for your target.” Spend 60 million VND on creator stories showing target choice, 110 million VND on campus workshops that help students begin, and 80 million VND on opted-in follow-up to finish and start one task. Track every stage by source. The goal requires 40% of review completers to start a task. If many begin but fail at CV upload, improve instructions and reliability before buying more traffic.',
    assessment: 'The plan should explain the target-first route and measure finished reviews plus first plan actions. Registrations alone are too weak.',
    weakAnswerFeedback: 'A sign-up campaign does not demonstrate the full review or the first useful preparation action.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM09', title: 'Vita first weekly study plan',
    brief: 'Vita is a study-planner app for university students. In six weeks, it wants 3,000 students to build a first weekly plan and check off at least three tasks, using VND 180 million. Student creators can demonstrate their own planning session, campus mentors can run short setup tables, and users may opt into reminders. The app records plan creation and task completion. In an earlier group, 50% of plan creators checked off at least three tasks; treat that as an initial benchmark, not a guarantee for new channels.',
    task: 'Set the message, time order, channel roles, and full 180 million VND budget. Define the valid outcome and what to diagnose if plans increase but completed tasks do not.',
    workedResponse: 'Use “Make a small plan you can finish.” Spend 45 million VND on creator planning demonstrations, 85 million VND on mentor setup tables, and 50 million VND on opted-in reminders for the next planned task. Count one outcome when a unique user creates a plan and checks off at least three tasks. The target budget is VND 60,000 per completer. If plan creation rises but task completion does not, simplify the first plan and reminders before buying more installs.',
    assessment: 'Connect marketing to completed study work, reconcile the budget, and separate plan creation from the three-task outcome.',
    weakAnswerFeedback: 'An install target ignores whether students create a usable plan or complete any planned work.',
    poolIndustry: 'tech', poolType: 'growth',
  },
  {
    code: 'IM10', title: 'Boro breakfast preorders',
    brief: 'Boro is a neighborhood bakery near offices. It wants 2,000 paid and collected breakfast packs in eight weeks using VND 90 million. The bakery can prepare about 80 preorder packs each weekday morning, while the counter is busiest from 7:30 to 8:15. Available channels are short local videos, office-group offers, and pickup signs. Orders can be paid online and scanned when collected. A view, unpaid reservation, or paid pack that is never collected does not meet the goal. The campaign must respect kitchen and counter capacity.',
    task: 'Define channel roles, budget, timing, capacity-aware ordering, the paid-and-collected measure, and a stop-or-fix rule for long waits or refunds.',
    workedResponse: 'Spend 25 million VND on local videos showing the pickup routine, 35 million VND on office-group outreach, and 30 million VND on signs, packaging, and morning staff. Limit paid order slots to real daily capacity and scan each pack at collection. Track cost per collected pack, wait times, late orders, and refunds. If demand is high but waits rise, spread slots or add staff before buying more ads.',
    assessment: 'A strong plan respects production and pickup constraints while measuring completed paid collections rather than awareness or reservations.',
    weakAnswerFeedback: 'Driving unlimited reservations risks broken promises and does not deliver 2,000 paid collected packs.',
    poolIndustry: 'retail', poolType: 'operations',
  },
];

const AR: CaseInput[] = [
  {
    code: 'AR01', title: 'MateLab fix one mistake',
    brief: 'MateLab users often complete one consulting practice case and read feedback, then do no further practice the following week. The result already identifies a specific reasoning gap, but the learner must browse the library to decide what to do next. This month the team can add a progress task and an optional user-chosen reminder; it cannot create lessons or rewrite the case bank. Current meaningful second practice within seven days is 18% of eligible completers. Success must reflect a revised answer or completed second case, not notification opens or empty taps.',
    task: 'Define the trigger, gap-specific action, user control, randomized comparison, primary measure, quality checks, and response to a shallow result.',
    workedResponse: 'After a case, save the diagnosed gap as a revision task on the result and progress view. Let the learner choose a reminder that reopens the exact answer step, then show what changed after resubmission. Randomly split eligible completers between this flow and the current result page. Measure meaningful second practice within seven days. Track reminder turn-offs, empty resubmissions, and feedback quality; if only empty actions rise, tighten the event definition and redesign the prompt.',
    assessment: 'Credit a next step based on the learner’s own gap and a fair comparison. Badges or daily pushes alone do not demonstrate learning.',
    weakAnswerFeedback: 'Generic streaks and daily notifications do not connect the diagnosed mistake to meaningful second practice.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR02', title: 'Nami second grocery order',
    brief: 'Nami has many successfully delivered first grocery orders but few second paid orders within 30 days. Households often repeat staples, though replenishment timing varies. After delivery, the app can save items as an editable basket and send a reminder with permission. There is no discount budget. Stock and quantities may change, so the shopper must see live availability, choose substitutions, and explicitly confirm payment. Current second-order rate is 17%. The business should protect profit after direct costs and avoid cancellations or unwanted reminders.',
    task: 'Design a no-discount repeat-order mechanic, timing control, random comparison, primary measure, and at least two order-quality guardrails.',
    workedResponse: 'Offer an editable staples basket after successful delivery and let the shopper choose reminder timing. On return, show current availability, permit quantity and substitution changes, and require explicit payment. Randomly split first-order customers against the current thank-you screen. Measure second paid order within 30 days at equal follow-up age. Monitor profit after direct costs, cancellations, and reminder turn-offs; revise defaults if repeat rises but quality falls.',
    assessment: 'The action should fit replenishment behavior and keep timing, substitutions, and purchase under user control. Coupons break the constraint.',
    weakAnswerFeedback: 'A daily discount campaign has no budget, ignores replenishment timing, and may inflate low-quality orders.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR03', title: 'Casemate knowledge to practice',
    brief: 'Casemate learners read FMCG Domain Knowledge cards and may finish the quiz, but many do not start a Case Drill afterward. Existing drills cover distribution, channel margin, and go-to-market decisions. This sprint can link cards to those drills but cannot commission new content or change scoring. A generic library button leaves the learner to choose, while a poor recommendation can reduce trust. Current seven-day card-to-drill start is 12%, and relevant drill completion is 6% of card completers. Mappings need editorial review.',
    task: 'Specify card-to-drill matching, placement, the next action, randomized exposure and control, the main learning measure, and relevance quality checks.',
    workedResponse: 'After a specific card quiz, recommend one editorially reviewed drill using the same concept, such as channel margin to distribution diagnosis. Explain the link in one sentence and offer Start or Bookmark. Randomize eligible completers against the current next-card view. Measure relevant drill completion within seven days, with views, starts, and real submissions as diagnostics. Monitor card completion, quiz accuracy, and irrelevant-match reports; if starts rise but completions fall, revisit difficulty and match quality.',
    assessment: 'A concept-specific path to completed practice is stronger than a generic button or click metric.',
    weakAnswerFeedback: '“Explore drills” transfers selection work to the learner and does not establish content relevance.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR04', title: 'Tally recurring-expense setup',
    brief: 'Tally is a budgeting app where many new users record one expense but not a second. Interviews suggest repeating the same category and amount feels tedious, but Tally cannot verify spending automatically. This quarter it may add manual recurring rules; bank integration is unavailable. A prompt after the first entry could make a later entry easier, but dates and amounts change. Current seven-day second confirmed entry is 24%. The design must not silently create transactions or pressure people to confirm expenses they did not make.',
    task: 'Design the first-week second-entry flow, editable draft and user control. Define a randomized test, primary metric, false-entry checks, and response to poor prompt accuracy.',
    workedResponse: 'After the first confirmed expense, invite the user to save its category and an expected next date. When due, show an editable draft that can be confirmed, changed, or skipped; never post automatically. Randomize first-entry users against current onboarding. Measure at least two user-confirmed entries within seven days. Track skipped drafts, wrong amounts, false prompts, and reminder turn-offs. If false prompts rise, limit suggestions to user-chosen predictable categories and change timing.',
    assessment: 'Only real user-confirmed expenses count. Reminder opens and auto-created drafts are not activation.',
    weakAnswerFeedback: 'Bank sync is outside scope, and automatic posting creates inaccurate financial records.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR05', title: 'Lexi second language lesson',
    brief: 'Lexi is a language-learning app. Many users finish one short lesson but do not return for a second during the next week. Lexi already knows which words each learner missed. This month it can save those words and add user-chosen reminders but cannot create new lessons. Study schedules vary, and daily alerts may annoy users. Current second lesson within seven days is 21% of first-lesson completers. The team should distinguish meaningful practice from quick taps and watch wrong-answer rates and reminder turn-offs.',
    task: 'Design the mistake-based next step, reminder control, randomized comparison, primary repeat-practice measure, and two quality checks.',
    workedResponse: 'After lesson one, show three missed words and a two-minute practice link, then let the learner choose whether and when to be reminded. Randomly split first-lesson completers between this flow and the current result screen. Measure a completed word-practice set or second lesson within seven days. Check later wrong-answer rate and reminder turn-offs. If taps rise without completed practice, change the task rather than calling it a win.',
    assessment: 'The next action must use the learner’s own mistakes and produce real second practice. A generic streak alert is weaker.',
    weakAnswerFeedback: 'A daily streak push ignores personal errors, user timing, and whether any second practice was completed.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR06', title: 'Washly second laundry pickup',
    brief: 'Washly offers booked laundry pickup. Many customers try one order but do not book again in the next month. After successful delivery, the app knows the prior bag size and preferred pickup time. It can save those choices and send an optional reminder but cannot offer discounts. Slots and prices may change, so the customer must confirm current details and payment. Current second paid booking within 30 days is 16%. Service quality risks include cancellations, missed pickups, and driver time per order.',
    task: 'Design the rebooking action and timing control, then define a randomized comparison, primary paid-repeat measure, and service-quality response.',
    workedResponse: 'After delivery, offer a “Book this again” draft using the last bag size and preferred time. Let the customer choose a reminder and require confirmation of a live slot, current price, and address before payment. Randomize first-order customers against the current thank-you page. Measure second paid booking within 30 days. Track cancellations, missed pickups, and driver time; if bookings rise but service problems grow, change suggested slots.',
    assessment: 'Make a real second booking easier without discounts or silent auto-booking, and protect operational quality.',
    weakAnswerFeedback: 'Automatic weekly pickup removes user control and may create missed pickups when needs or slots change.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR07', title: 'Casemate review one aptitude error',
    brief: 'Casemate learners finish an Aptitude Test and see missed questions, yet many leave without practising the same skill again. The bank already contains unused questions tagged by skill and difficulty. This sprint can link one missed skill to a short existing set but cannot write new questions or change scores. Tags may be wrong and need review. Current seven-day second practice is 14% of test completers. A click on the set is not evidence of improvement; completed practice, later unseen-question accuracy, complaints, and early exits matter.',
    task: 'Define the recommended set, placement, match logic, random test groups, main completion measure, later-learning check, and response to poor matching.',
    workedResponse: 'On the result page, show “Practice the skill behind your biggest mistake” and one short set of unused questions at the right difficulty. Explain which missed question led to the recommendation. Randomize eligible test completers against the current result screen. Measure completed short sets within seven days, then check accuracy on later unseen questions. Watch complaints and early exits; if starts rise without later accuracy, fix tags, match, or feedback.',
    assessment: 'Tie one actual error to relevant completed practice and later evidence. A generic test-bank link or click metric is insufficient.',
    weakAnswerFeedback: 'Sending everyone to the full test bank ignores the diagnosed skill, difficulty, and meaningful completion.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR08', title: 'Cove return to a local event',
    brief: 'Cove helps people discover small local workshops. Many attend once but never book a second event. After an event, the app can ask what the attendee liked and recommend existing nearby sessions, but it has no coupon or host-payment budget. Interests change, and sold-out events should not be shown. Current second paid booking within 60 days is 12% of first-time attendees. The team should watch actual attendance, refunds, and people turning off messages rather than treating every booking as success.',
    task: 'Design the post-event trigger, interest choice, open-seat recommendation, user control, randomized comparison, primary paid-repeat measure, and quality checks.',
    workedResponse: 'After the first event, ask for one interest and show two nearby workshops with open seats in the next month. Let users save one or choose a reminder; never book automatically. Randomize first-time attendees against the current thank-you screen. Measure second paid booking within 60 days, then check attendance, refunds, and reminder turn-offs. If bookings rise but attendance falls, improve event matching before rollout.',
    assessment: 'The recommendation should reflect what the attendee liked and lead to a real second event while avoiding sold-out inventory and noisy messages.',
    weakAnswerFeedback: 'A daily coupon blast breaks the budget and ignores changing interests, open seats, and actual attendance.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR09', title: 'Arc start lesson two',
    brief: 'Arc sells a short online course. Many buyers watch lesson one but do not return to lesson two. The player knows where each person stopped, can save a note, and can send a reminder only when requested. Arc cannot record new lessons this month. Some learners pause because of work, so daily pushes may annoy them. Current meaningful lesson-two viewing within seven days is 28% of lesson-one viewers. Quality checks include how much of lesson two is watched, reminder turn-offs, and refunds.',
    task: 'Design the end-of-lesson step, value preview, saved position and reminder choice. Define a random comparison, meaningful lesson-two metric, and response to shallow starts.',
    workedResponse: 'At the end of lesson one, show one sentence about what lesson two enables and a Resume button. Save the learner’s position and let them choose a reminder. Randomize lesson-one completers against the current end screen. Measure meaningful lesson-two viewing within seven days, such as at least half the lesson. Watch turn-offs and refunds; if starts rise but early exits also rise, fix the promise or handoff.',
    assessment: 'Count real progress into lesson two, not button taps. Respect learner timing and the no-new-content constraint.',
    weakAnswerFeedback: 'Daily forced reminders may annoy busy learners and do not establish that lesson two was meaningfully viewed.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
  {
    code: 'AR10', title: 'Taro second plant check-in',
    brief: 'Taro helps new plant owners record watering and light conditions. Users often add one plant but do not check it again the following week. The app can save plant type, prior notes, and a user-chosen check-in day, but it cannot diagnose plant health from a photo this quarter. Water needs vary, so a fixed daily watering alarm could give bad advice. Current second confirmed condition note within 14 days is 19%. The team should watch unwanted reminders and empty entries made only to clear an alert.',
    task: 'Design the user-chosen next check-in and context shown on return. Define the control group, primary behavior measure, two quality checks, and response to shallow entries.',
    workedResponse: 'After the first note, invite the owner to choose a check-in day. On that day, show the prior light and water notes and ask what changed; do not automatically tell them to water. Randomize new users against the current screen. Measure a second user-confirmed condition note within 14 days. Check reminder turn-offs and empty notes; if shallow entries rise, improve the question or reduce frequency.',
    assessment: 'Support observation and user choice without untested plant-care advice. Only a meaningful second condition note counts.',
    weakAnswerFeedback: 'A universal daily watering alert could harm plants and does not use the owner’s chosen schedule or observations.',
    poolIndustry: 'tech', poolType: 'strategy',
  },
];

function buildTrack(category: CreativityCategory, entries: CaseInput[]): CreativityBankCase[] {
  const track = TRACKS[category];
  return entries.map((item) => ({
    sourceCaseId: `CM-CRE-${item.code}`,
    code: item.code,
    category,
    categoryLabel: track.label,
    title: item.title,
    brief: item.brief,
    task: item.task,
    workedResponse: item.workedResponse,
    assessment: item.assessment,
    weakAnswerFeedback: item.weakAnswerFeedback,
    scoringExampleAlternative: `A different answer can earn full credit when it uses the same case facts, respects every practical constraint, and meets this /10 guide: ${track.sourceRubric}.`,
    rubricVersion: track.rubricVersion,
    sourceRubric: track.sourceRubric,
    responseFields: FIELDS[category],
    mappedWeights: track.mappedWeights,
    nextCaseId: '',
    poolIndustry: item.poolIndustry,
    poolType: item.poolType,
  }));
}

const ordered = [
  ...buildTrack('product-development', PD),
  ...buildTrack('big-idea-key-message', BI),
  ...buildTrack('imc-plan', IM),
  ...buildTrack('activation-retention', AR),
];

export const CREATIVITY_CASE_BANK_40: CreativityBankCase[] = ordered.map((item, index) => ({
  ...item,
  nextCaseId: ordered[(index + 1) % ordered.length].sourceCaseId,
}));
