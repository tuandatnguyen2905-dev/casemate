// Casemate — Situational Judgement Test question bank.
//
// The five founder-supplied AssessmentDay question/answer pairs use four
// formats. This bank follows their Rated Responses format exactly: each
// workplace situation has five actions and the candidate assigns each label
// once — Very Effective, Effective, Slightly Effective, Ineffective, or
// Counterproductive. The source PDFs are explicitly untimed, so these tests
// are untimed too. Scoring uses normalized rank distance to award partial
// credit; the references publish model orders but no proprietary numeric
// scoring formula.

export type SituationalDifficulty = 'easy' | 'medium' | 'hard';

export const SITUATIONAL_OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;
export const SITUATIONAL_RATING_LABELS = [
  'Very Effective',
  'Effective',
  'Slightly Effective',
  'Ineffective',
  'Counterproductive',
] as const;

export interface SituationalQuestion {
  id: string;
  kind: 'situational';
  difficulty: SituationalDifficulty;
  prompt: string;
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  optimalRanking: string[];
  competency: string;
  explanation: string;
}

export interface SituationalTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  difficultyBreakdown: string;
  timeLimitSeconds: number;
  questions: SituationalQuestion[];
}

interface WorkplaceTheme {
  organisation: string;
  role: string;
  project: string;
  counterpart: string;
  colleague: string;
  manager: string;
  location: string;
  pressure: string;
}

interface Dilemma {
  difficulty: SituationalDifficulty;
  competency: string;
  scenario: string;
  responses: [string, string, string, string, string];
  rationale: string;
}

const THEMES: WorkplaceTheme[] = [
  { organisation: 'Lotus Commercial Bank', role: 'graduate transformation analyst', project: 'digital onboarding redesign', counterpart: 'the branch operations lead, Ms Lan', colleague: 'Minh', manager: 'Ms Phuong', location: 'Ho Chi Minh City', pressure: 'a regulatory checkpoint is approaching' },
  { organisation: 'Mekong Consumer Goods', role: 'route-to-market trainee', project: 'Delta distributor reset', counterpart: 'the regional sales director, Mr Khoa', colleague: 'Thao', manager: 'Ms Hanh', location: 'Can Tho', pressure: 'the peak Tet sell-in window is close' },
  { organisation: 'An Nam Retail', role: 'store operations graduate', project: 'same-day replenishment pilot', counterpart: 'the flagship store manager, Ms Yen', colleague: 'Bao', manager: 'Mr Thanh', location: 'Hanoi', pressure: 'weekend customer traffic is forecast to surge' },
  { organisation: 'VietWave Telecom', role: 'product launch analyst', project: '5G student plan launch', counterpart: 'the channel marketing head, Mr Son', colleague: 'Linh', manager: 'Ms Mai', location: 'Da Nang', pressure: 'the campaign date has already been advertised' },
  { organisation: 'Harmony Health Network', role: 'operations consulting associate', project: 'outpatient waiting-time programme', counterpart: 'the hospital COO, Dr Anh', colleague: 'Quynh', manager: 'Mr Duy', location: 'Hue', pressure: 'patient complaints are rising each week' },
  { organisation: 'Red River Manufacturing', role: 'continuous-improvement trainee', project: 'Line Three yield recovery', counterpart: 'the plant director, Mr Hieu', colleague: 'Nam', manager: 'Ms Trang', location: 'Hai Phong', pressure: 'a major export order enters production soon' },
  { organisation: 'SaigonCart', role: 'e-commerce category analyst', project: 'home-living marketplace refresh', counterpart: 'the category director, Ms Nhi', colleague: 'Tuan', manager: 'Mr Long', location: 'Ho Chi Minh City', pressure: 'the double-day promotion is two weeks away' },
  { organisation: 'EastGate Logistics', role: 'network planning graduate', project: 'northern hub redesign', counterpart: 'the transport operations head, Ms Ha', colleague: 'Phuc', manager: 'Mr Vinh', location: 'Bac Ninh', pressure: 'service penalties start next month' },
  { organisation: 'Green Horizon Energy', role: 'sustainability analyst', project: 'industrial solar transition', counterpart: 'the client sustainability director, Mr Quang', colleague: 'My', manager: 'Ms Chau', location: 'Binh Duong', pressure: 'the investment committee meets on Friday' },
  { organisation: 'Bao Viet Future Insurance', role: 'claims transformation trainee', project: 'motor-claims automation pilot', counterpart: 'the claims director, Ms Oanh', colleague: 'Khanh', manager: 'Mr Lam', location: 'Hanoi', pressure: 'the regulator has requested a progress update' },
  { organisation: 'Civic Impact Partners', role: 'public-service consulting analyst', project: 'district service-centre redesign', counterpart: 'the district programme owner, Ms Thu', colleague: 'Duc', manager: 'Mr Hoang', location: 'Da Nang', pressure: 'citizen satisfaction results will be published soon' },
  { organisation: 'Lantern Hotels', role: 'revenue management trainee', project: 'coastal occupancy recovery plan', counterpart: 'the hotel general manager, Ms Dao', colleague: 'An', manager: 'Mr Tien', location: 'Nha Trang', pressure: 'the summer booking period has started slowly' },
  { organisation: 'SkyBridge Aviation', role: 'customer-experience analyst', project: 'domestic disruption response', counterpart: 'the airport station manager, Mr Hai', colleague: 'Vy', manager: 'Ms Nga', location: 'Ho Chi Minh City', pressure: 'monsoon delays are affecting several routes' },
  { organisation: 'BrightPath Learning', role: 'growth strategy associate', project: 'provincial school partnership', counterpart: 'the academic partnerships head, Ms Giang', colleague: 'Huy', manager: 'Mr Binh', location: 'Nghe An', pressure: 'the new school term begins in six weeks' },
  { organisation: 'NovaPay', role: 'fintech risk analyst', project: 'merchant credit expansion', counterpart: 'the risk committee secretary, Mr T.Minh', colleague: 'Han', manager: 'Ms Lien', location: 'Ho Chi Minh City', pressure: 'competitors are approving merchants faster' },
  { organisation: 'Golden Field Foods', role: 'agri-supply-chain analyst', project: 'coffee traceability rollout', counterpart: 'the sourcing director, Ms Hoa', colleague: 'Trung', manager: 'Mr Cuong', location: 'Dak Lak', pressure: 'the next harvest cycle is beginning' },
  { organisation: 'VinaLife Pharma', role: 'commercial graduate', project: 'rural pharmacy access initiative', counterpart: 'the medical affairs lead, Dr Bich', colleague: 'Kiet', manager: 'Ms Van', location: 'Hanoi', pressure: 'the launch must meet strict promotional rules' },
  { organisation: 'UrbanLink Developments', role: 'project management analyst', project: 'mixed-use construction recovery', counterpart: 'the client project director, Mr Tuan Anh', colleague: 'Ngan', manager: 'Ms Huong', location: 'Thu Duc City', pressure: 'financing costs are increasing each month' },
  { organisation: 'Pacific Devices Vietnam', role: 'sales planning analyst', project: 'smart-home retail launch', counterpart: 'the key-account director, Ms Diep', colleague: 'Manh', manager: 'Mr Dung', location: 'Hanoi', pressure: 'retailers are finalising their shelf plans' },
  { organisation: 'Heritage Property Advisory', role: 'strategy associate', project: 'secondary-city investment study', counterpart: 'the fund strategy lead, Mr Loc', colleague: 'Tam', manager: 'Ms Ngoc', location: 'Quy Nhon', pressure: 'the fund has several competing opportunities' },
  { organisation: 'PeopleFirst Vietnam', role: 'people analytics trainee', project: 'frontline retention diagnostic', counterpart: 'the HR business partner, Ms Trinh', colleague: 'Dat', manager: 'Mr Nghia', location: 'Ho Chi Minh City', pressure: 'voluntary turnover has reached a two-year high' },
  { organisation: 'ShieldNet Consulting', role: 'cybersecurity programme analyst', project: 'identity-access remediation', counterpart: 'the client security officer, Ms Kim', colleague: 'Quan', manager: 'Mr Phong', location: 'Hanoi', pressure: 'an external audit starts next month' },
  { organisation: 'Community Futures Foundation', role: 'impact consulting associate', project: 'youth-employment fund review', counterpart: 'the programme director, Ms Dieu', colleague: 'Sang', manager: 'Mr T.Lam', location: 'Central Vietnam', pressure: 'donors expect evidence before renewing funding' },
  { organisation: 'QuickBite Vietnam', role: 'city operations analyst', project: 'delivery reliability sprint', counterpart: 'the city operations lead, Mr Nhat', colleague: 'Thuong', manager: 'Ms Uyen', location: 'Ho Chi Minh City', pressure: 'rainy-season cancellations are increasing' },
  { organisation: 'Dragon Motors', role: 'dealer-network analyst', project: 'electric-vehicle readiness programme', counterpart: 'the dealer development head, Ms Thuy', colleague: 'Viet', manager: 'Mr T.Hai', location: 'Hai Phong', pressure: 'the first vehicles arrive this quarter' },
  { organisation: 'Silk & Street', role: 'merchandising graduate', project: 'responsible-sourcing collection', counterpart: 'the buying director, Ms Le', colleague: 'Chi', manager: 'Mr Nam Anh', location: 'Ho Chi Minh City', pressure: 'samples must be approved before fashion week' },
  { organisation: 'Blue Lantern Media', role: 'campaign effectiveness analyst', project: 'national beverage campaign', counterpart: 'the client marketing director, Mr Huy Anh', colleague: 'Loan', manager: 'Ms Thuy Linh', location: 'Hanoi', pressure: 'media bookings become non-refundable tomorrow' },
  { organisation: 'SunRiver Renewables', role: 'project finance analyst', project: 'rooftop solar portfolio', counterpart: 'the investment director, Ms Kieu', colleague: 'Hoai', manager: 'Mr T.Quang', location: 'Southern Vietnam', pressure: 'lenders require a credible downside case' },
  { organisation: 'Vertex Advisory', role: 'consulting engagement analyst', project: 'consumer-bank cost transformation', counterpart: 'the client transformation officer, Mr Nghiem', colleague: 'Mai Anh', manager: 'Ms Thuy Nga', location: 'Hanoi', pressure: 'the steering committee expects measurable savings' },
  { organisation: 'ASEAN Growth Partners', role: 'market-entry consulting associate', project: 'Vietnam expansion strategy', counterpart: 'the regional CEO, Ms Celina Tan', colleague: 'Gia Bao', manager: 'Mr Minh Quan', location: 'Vietnam and Singapore', pressure: 'the board will choose a market-entry route this month' },
];

const DILEMMAS: Dilemma[] = [
  {
    difficulty: 'easy', competency: 'Planning & Organising',
    scenario: `You are the {role} at {organisation}, coordinating the {project} in {location}. Two days before a promised hand-off, {counterpart} asks for a substantial extra analysis without changing the deadline. {manager} is unavailable and the team has already committed to the agreed scope while {pressure}.`,
    responses: [
      `Clarify the purpose of the extra analysis, assess the impact with the {project} team, then offer {counterpart} explicit scope or timing trade-offs and confirm the revised plan in writing.`,
      `Tell {counterpart} you support the request and will check what the {project} team can reasonably add before confirming a limited revision later today.`,
      `Add a short preliminary section to the {project} deliverable using available information, clearly label its limits, and suggest a fuller follow-up.`,
      `Refuse the request because it was not in the original {organisation} brief and continue without discussing alternatives.`,
      `Promise the full request immediately, then tell {colleague} to work late without consulting the rest of the {project} team.`,
    ],
    rationale: `The strongest response clarifies the real need, checks feasibility, and manages expectations through transparent trade-offs rather than overpromising or refusing reflexively.`,
  },
  {
    difficulty: 'easy', competency: 'Drive to Achieve Results',
    scenario: `You depend on {colleague} for a data hand-off on the {project} at {organisation}. The hand-off is now a day late, and your own work cannot be completed until it arrives. {colleague} has usually been reliable, but you know the delay could matter because {pressure}.`,
    responses: [
      `Speak privately with {colleague}, understand the cause, agree a realistic recovery time and support needed, then update {manager} on any material {project} risk.`,
      `Ask {colleague} for the most critical portion first so you can restart the {project} work, and agree when the remainder will follow.`,
      `Begin an alternative task for {organisation} and send {colleague} a clear reminder that you still need the hand-off today.`,
      `Redo {colleague}'s entire contribution yourself without telling them, even if this duplicates work and delays another commitment.`,
      `Copy senior leaders into a message blaming {colleague} for putting the {project} at risk before asking what happened.`,
    ],
    rationale: `Direct, private problem-solving protects delivery and the relationship. Immediate public blame assumes bad intent and makes recovery harder.`,
  },
  {
    difficulty: 'easy', competency: 'Communicating, Influencing & Negotiating',
    scenario: `During the {project}, {counterpart} and {manager} give you conflicting priorities for the same deliverable. Both requests seem legitimate, but completing both fully is impossible within the available time. The disagreement is beginning to confuse {colleague} and the wider {organisation} team.`,
    responses: [
      `Set up a short alignment with {counterpart} and {manager}, show the capacity conflict and decision criteria, and secure one agreed priority for the {project}.`,
      `Prepare a concise comparison of both requests and ask {manager} to decide after considering {counterpart}'s stated outcome.`,
      `Progress the common elements of both requests while seeking clarification, avoiding work that would be wasted under either choice.`,
      `Choose the request from the more senior person without explaining the impact to the other {project} stakeholder.`,
      `Ask {colleague} to split the effort across both priorities even though neither can then meet the required standard.`,
    ],
    rationale: `Visible alignment around outcomes and constraints prevents silent prioritisation, duplicated effort, and damaged stakeholder trust.`,
  },
  {
    difficulty: 'easy', competency: 'Conscientiousness & Quality',
    scenario: `While checking the {project} pack, you find that one chart sent to {counterpart} contains an incorrect figure. The broader conclusion may still hold, but the client meeting begins in an hour. {colleague}, who prepared the chart, is currently travelling and cannot be reached.`,
    responses: [
      `Verify the correct figure, assess whether conclusions change, notify {manager} and {counterpart} promptly, and issue a clearly corrected {project} pack.`,
      `Correct the chart, mark the change in the meeting materials, and ask {manager} to help explain the update to {counterpart}.`,
      `Prepare the corrected chart and raise the discrepancy at the start of the meeting before anyone relies on the original number.`,
      `Quietly replace the chart in the {organisation} file and say nothing unless {counterpart} notices the difference.`,
      `Leave the error in place and tell the meeting that {colleague} owns all questions about the {project} data.`,
    ],
    rationale: `Accuracy and trust require rapid verification, ownership, correction, and proportionate disclosure—not concealment or blame.`,
  },
  {
    difficulty: 'easy', competency: 'Managing People',
    scenario: `{colleague}, a new analyst at {organisation}, is struggling with a task on the {project} and has missed two internal checkpoints. They appear anxious and have stopped asking questions. The next output matters because {pressure}.`,
    responses: [
      `Meet privately, clarify the expected output, ask what is blocking progress, agree smaller checkpoints, and provide targeted coaching or resources for the {project}.`,
      `Review {colleague}'s draft together, identify the highest-priority gaps, and arrange a follow-up before the next {project} checkpoint.`,
      `Give {colleague} a strong example from another {organisation} project and ask them to flag questions by the end of the day.`,
      `Move the task to another person without explanation so the {project} deadline is protected.`,
      `Tell the wider team that {colleague} may not be capable of work at this level and ask them to watch for further mistakes.`,
    ],
    rationale: `Supportive diagnosis plus clear standards develops the person while protecting delivery. Silent removal or public criticism damages learning and trust.`,
  },
  {
    difficulty: 'easy', competency: 'Relationship & Reputation Building',
    scenario: `{counterpart} criticises the {project} analysis sharply during a meeting and says {organisation} has misunderstood the business. You believe the work is evidence-based, but one assumption was provided by the stakeholder's own team. Several senior stakeholders are watching the exchange.`,
    responses: [
      `Stay calm, ask which conclusion or assumption concerns {counterpart}, walk through the evidence, and agree any fact-check or revision needed after the meeting.`,
      `Acknowledge the concern, summarise the {project} evidence briefly, and offer a focused follow-up with the right subject-matter experts.`,
      `Ask {manager} to take the question while you note the points that require validation for the {project}.`,
      `Defend every part of the analysis immediately and emphasise that the disputed assumption came from {counterpart}'s organisation.`,
      `End the discussion by saying that {organisation} cannot work effectively with clients who challenge professional analysis in public.`,
    ],
    rationale: `Curiosity, evidence, and a concrete follow-up preserve authority and the relationship. Defensiveness turns a solvable challenge into conflict.`,
  },
  {
    difficulty: 'easy', competency: 'Managing Tasks & Objectives',
    scenario: `A key {project} workshop is tomorrow, but two expected team members have been reassigned to an urgent {organisation} issue. The agenda now exceeds the capacity of the remaining team. Cancelling would inconvenience {counterpart}, yet an unprepared session could waste everyone's time.`,
    responses: [
      `Reprioritise the workshop around the decisions only the available group can make, confirm the revised purpose with {counterpart}, and schedule any specialist follow-up.`,
      `Ask {manager} whether one reassigned specialist can join only the critical {project} segment, while simplifying the rest of the agenda.`,
      `Send pre-reading and convert the workshop into a shorter fact-finding session with clear limits on what can be decided.`,
      `Run the full {project} agenda unchanged and improvise answers for topics outside the remaining team's expertise.`,
      `Cancel the workshop without discussing alternatives with {counterpart} because {organisation} caused the resourcing problem.`,
    ],
    rationale: `A focused, transparent redesign protects stakeholder time and keeps progress moving despite constrained resources.`,
  },
  {
    difficulty: 'easy', competency: 'Teamwork',
    scenario: `A cross-functional group at {organisation} has not responded to three requests needed for the {project}. Their team is handling a separate operational incident, and your last message only repeated the original deadline. The dependency could soon affect {counterpart}.`,
    responses: [
      `Contact their lead directly, acknowledge the incident, explain the exact {project} decision blocked, and agree a minimum response, owner, and realistic time.`,
      `Ask for only the two facts essential to keep the {project} moving and offer to prepare the rest of the material yourself.`,
      `Request help from {manager} in identifying another knowledgeable {organisation} contact while keeping the original team informed.`,
      `Continue sending the same reminder each morning and assume the cross-functional team will eventually prioritise the {project}.`,
      `Tell {counterpart} that another {organisation} department is uncooperative and therefore owns any delay.`,
    ],
    rationale: `Effective collaboration recognises the other team's context, makes the need specific, and creates a practical minimum commitment.`,
  },
  {
    difficulty: 'easy', competency: 'Service Ethos',
    scenario: `A service failure linked to the {project} has inconvenienced an important customer of {organisation}. The root cause is not yet known, but the customer needs an answer today and {counterpart} is concerned about reputation. {pressure} adds urgency to the response.`,
    responses: [
      `Acknowledge the impact, arrange an immediate practical remedy, give the customer a clear update time, and coordinate a fact-based root-cause review for the {project}.`,
      `Provide the customer with a temporary workaround and promise a fuller update once the {organisation} team verifies what happened.`,
      `Ask {counterpart} to approve a reasonable goodwill gesture while you continue investigating the {project} failure.`,
      `Wait for a complete root-cause analysis before contacting the customer so that {organisation} only communicates once.`,
      `Tell the customer that an external supplier probably caused the issue and that the {project} team cannot help until the supplier replies.`,
    ],
    rationale: `The best response solves the immediate customer need, sets expectations, and investigates without guessing or deflecting ownership.`,
  },
  {
    difficulty: 'medium', competency: 'Professional Integrity',
    scenario: `Before the {project} steering meeting, {manager} asks you to remove a material delivery risk from the summary because it may worry {counterpart}. The risk is supported by evidence, although mitigation is possible. You are junior, and {pressure} makes the meeting politically sensitive.`,
    responses: [
      `Explain respectfully why the risk should remain, propose concise wording with probability, impact and mitigation, and use the {organisation} escalation route if accurate reporting is still blocked.`,
      `Keep the risk in the detailed appendix and ensure {manager} understands that you will answer honestly if {counterpart} asks about it.`,
      `Soften the risk language in the {project} summary but retain the underlying evidence and mitigation actions.`,
      `Remove the risk as requested and keep a private copy in case the {project} later fails.`,
      `Send the unapproved risk directly to every steering-committee member and accuse {manager} of concealing information.`,
    ],
    rationale: `Integrity is best served by respectful challenge, accurate proportionate reporting, and formal escalation—not compliance or uncontrolled accusation.`,
  },
  {
    difficulty: 'medium', competency: 'Information Security',
    scenario: `You accidentally email a confidential {project} attachment to the wrong external recipient. The document contains commercially sensitive {organisation} assumptions but no personal data. The recipient has not replied, and {counterpart} does not yet know.`,
    responses: [
      `Activate the {organisation} incident process immediately, notify the appropriate security and project owners, request deletion from the recipient, and document the facts for {counterpart}.`,
      `Use email recall, contact the recipient at once, and simultaneously alert {manager} that the {project} information may have been exposed.`,
      `Ask the recipient to delete the file, preserve evidence of the request, and then seek guidance from the {organisation} security team.`,
      `Wait to see whether the recipient opens the attachment before creating concern around the {project}.`,
      `Delete the sent message from your mailbox and ask {colleague} not to mention the incident unless the recipient responds.`,
    ],
    rationale: `Fast containment and formal incident handling reduce harm and preserve trust; waiting or concealment removes options and compounds risk.`,
  },
  {
    difficulty: 'medium', competency: 'People & Relationship Skills',
    scenario: `{colleague} is the strongest technical contributor on the {project}, but repeatedly interrupts others and dismisses less experienced teammates. Output quality is high, while team members have started withholding ideas. {manager} asks you for a view because {pressure}.`,
    responses: [
      `Give {colleague} private, specific feedback on the behaviour and impact, listen to their perspective, set clear collaboration expectations, and follow up during the {project}.`,
      `Ask {manager} to reinforce inclusive meeting norms for everyone, then speak separately with {colleague} about the repeated pattern.`,
      `Change the {project} meeting format so each person contributes in turn and observe whether the behaviour improves.`,
      `Accept the behaviour because {colleague}'s technical contribution is unusually valuable to {organisation}.`,
      `Challenge {colleague} angrily in the next large meeting so the team can see that disrespect will be punished.`,
    ],
    rationale: `Private behavioural feedback plus explicit expectations addresses the cause without excusing harm or humiliating the contributor.`,
  },
  {
    difficulty: 'medium', competency: 'Analysis & Decision-Making',
    scenario: `Local staff in {location} say the proposed {project} design will not work for customers, while the central {organisation} data supports it. Their evidence is mostly anecdotal, but several examples are consistent. {counterpart} wants a recommendation this week.`,
    responses: [
      `Synthesize the central data and local examples, identify the disputed assumptions, and propose a targeted pilot or test before committing the full {project}.`,
      `Run a short structured interview with local staff and customers, then update the recommendation with clearly labelled evidence limits.`,
      `Recommend the central design with a local monitoring plan and predefined triggers for adapting the {project}.`,
      `Dismiss the local feedback because anecdotes are not statistically representative of {organisation}'s customer base.`,
      `Abandon the central design entirely and tell {counterpart} that frontline opinion is always more reliable than analysis.`,
    ],
    rationale: `Good judgement integrates quantitative and frontline evidence, then resolves uncertainty with a proportionate test.`,
  },
  {
    difficulty: 'medium', competency: 'Accountability',
    scenario: `Your {project} team will miss a milestone because an assumption you made during planning proved wrong. There is still time to protect the final outcome if decisions are made today. {counterpart} has not asked for an update, and {pressure}.`,
    responses: [
      `Tell {manager} and {counterpart} promptly, own the planning error, explain the impact, and present recovery options with a recommended decision.`,
      `Correct the assumption and ask the {project} team to produce a revised plan before giving stakeholders a same-day update.`,
      `Notify {counterpart} that the milestone is at risk and commit to a detailed recovery plan by a specific time.`,
      `Work quietly to recover the milestone and only disclose the error if the {project} still slips.`,
      `Describe the delay as a team estimation problem so that no individual at {organisation} appears responsible.`,
    ],
    rationale: `Early ownership and decision-ready recovery options protect the outcome and stakeholder trust better than concealment or diluted accountability.`,
  },
  {
    difficulty: 'medium', competency: 'Planning & Organising',
    scenario: `The brief for the next phase of the {project} uses vague terms such as “transformative” and “best in class.” {counterpart} expects work to begin immediately, but success measures, decision rights and constraints are unclear. {colleague} has already started building a detailed solution.`,
    responses: [
      `Pause deep solution work long enough to confirm outcomes, measures, constraints and decision owners with {counterpart}, then document the agreed {project} brief.`,
      `Draft a one-page interpretation of the {project} objectives and ask {counterpart} to correct it quickly while the team tackles reversible tasks.`,
      `Ask {manager} for examples of comparable {organisation} work and use them to frame clarification questions.`,
      `Let {colleague} continue because visible progress is more important than precise alignment at this stage.`,
      `Choose your own definition of “best in class” and present the completed {project} solution as a surprise to {counterpart}.`,
    ],
    rationale: `Clarifying the decision frame early prevents expensive rework while still allowing safe, reversible progress.`,
  },
  {
    difficulty: 'medium', competency: 'Ethical Judgement',
    scenario: `A supplier bidding for work on the {project} offers you an expensive weekend trip and says it is normal relationship-building. You are helping score the bids, and {organisation} policy requires gifts above a small threshold to be declared. The supplier asks you not to create unnecessary paperwork.`,
    responses: [
      `Decline the trip, disclose the offer through the {organisation} gifts and procurement process, and remove any doubt about your impartiality on the {project}.`,
      `Decline the trip and tell {manager} immediately so procurement can decide whether any further action is needed.`,
      `Ask procurement whether a modest, transparent meeting could replace the trip without affecting the {project} competition.`,
      `Accept the trip but promise yourself that it will not influence the {project} scores.`,
      `Accept the trip and give the supplier hints about rival bids because maintaining the relationship may benefit {organisation}.`,
    ],
    rationale: `A declared refusal protects both actual and perceived impartiality. Private intentions do not neutralise a conflict of interest.`,
  },
  {
    difficulty: 'medium', competency: 'Data Privacy',
    scenario: `The {project} team proposes using customer-level data for a new analysis that was not covered in the original consent or approval. Aggregated data could answer most questions but would be less detailed. {counterpart} argues that competitors probably use personal data this way already.`,
    responses: [
      `Pause the unapproved customer-level analysis, consult the {organisation} privacy owner, and design an aggregated or properly authorised route for the {project}.`,
      `Use aggregated data now and ask the privacy owner whether a more detailed {project} analysis can be approved later.`,
      `Create a small de-identified sample and obtain formal guidance before expanding any {project} use.`,
      `Proceed with the customer-level analysis because {counterpart} owns the business decision.`,
      `Copy the data to a personal tool so the {project} team can experiment without triggering {organisation} controls.`,
    ],
    rationale: `Purpose limitation and formal approval protect customers and the organisation; competitive pressure does not create permission.`,
  },
  {
    difficulty: 'medium', competency: 'Governance & Stakeholder Management',
    scenario: `A senior executive asks you to skip a mandatory review so the {project} can launch sooner. The review checks a risk that is unlikely but potentially serious. {manager} is inclined to agree because {pressure}.`,
    responses: [
      `Explain the review's purpose and potential impact, offer the fastest compliant path, and seek a documented decision from the authorised {organisation} risk owner.`,
      `Ask the review team for an accelerated assessment focused on the highest-risk {project} elements.`,
      `Prepare the launch materials in parallel while making clear that release remains conditional on the required review.`,
      `Skip the review because the executive is senior enough to accept the {project} risk.`,
      `Launch secretly before the review and ask the team to describe it as a limited pilot if anyone challenges it.`,
    ],
    rationale: `Constructive governance combines urgency with the control's real purpose; seniority alone does not replace authorised risk acceptance.`,
  },
  {
    difficulty: 'medium', competency: 'Learning Agility',
    scenario: `{manager} gives you unexpectedly critical feedback on your contribution to the {project}. Some comments feel unfair and no examples were provided. You are disappointed, but the next phase begins tomorrow and requires close collaboration.`,
    responses: [
      `Ask for specific examples and expected behaviours, listen without debating each point, reflect on patterns, and agree observable improvements for the next {project} phase.`,
      `Thank {manager}, summarise what you understood, and schedule a short follow-up after reviewing your {project} work.`,
      `Seek confidential perspective from a trusted colleague who observed the {project}, while avoiding a campaign to discredit the feedback.`,
      `Ignore the feedback because {manager} could not provide evidence during the conversation.`,
      `Send a long message to senior {organisation} leaders arguing that {manager} is biased before seeking clarification.`,
    ],
    rationale: `Specific examples, reflection, and measurable follow-up turn difficult feedback into learning while preserving the working relationship.`,
  },
  {
    difficulty: 'medium', competency: 'Supplier Management',
    scenario: `A vendor supporting the {project} delivers work that passes a basic check but fails an important quality standard. Replacing it could delay {counterpart}; accepting it could create downstream failure. The vendor says the standard was ambiguous in the contract.`,
    responses: [
      `Contain use of the work, verify the requirement and impact with experts, agree corrective action and timing with the vendor, and update {counterpart} on the {project} trade-off.`,
      `Ask the vendor to rework the highest-risk elements first while the {organisation} team validates the disputed standard.`,
      `Accept the low-risk portions conditionally and hold the rest until the {project} quality owner confirms compliance.`,
      `Accept all the work to protect the deadline and ask {colleague} to monitor for problems after launch.`,
      `Threaten to blacklist the vendor publicly before checking whether the {project} contract was genuinely ambiguous.`,
    ],
    rationale: `Containment, evidence, and negotiated correction balance quality and delivery; blind acceptance or premature threats increase risk.`,
  },
  {
    difficulty: 'medium', competency: 'Managing Wellbeing & Delivery',
    scenario: `The {project} team has worked late for several weeks, and quality errors are beginning to increase. {counterpart} keeps adding small requests, while {manager} praises the team's commitment. {pressure} makes another intense week tempting.`,
    responses: [
      `Show {manager} the workload and quality trend, reprioritise with {counterpart}, protect recovery time, and reset a sustainable {project} plan.`,
      `Ask the team which tasks can be stopped or delayed and use that evidence to negotiate the next {project} milestone.`,
      `Introduce a rotation for urgent coverage and a stricter quality check while seeking a broader scope decision.`,
      `Offer the team a social event after the deadline but keep every {project} commitment unchanged.`,
      `Tell the team that high-pressure work requires sacrifice and publicly compare anyone who leaves on time with {colleague}.`,
    ],
    rationale: `Sustainable performance requires changing demand and priorities, not rewarding or shaming people while preserving an unsafe workload.`,
  },
  {
    difficulty: 'hard', competency: 'Virtual Collaboration',
    scenario: `Two remote teams working on the {project} interpret a key decision differently. Each has built substantial work around its interpretation and believes the other ignored written notes. Reversing either path will cost time, and {counterpart} expects one integrated answer while {pressure}.`,
    responses: [
      `Bring the decision owners together, reconstruct the facts without blame, agree the governing outcome and criteria, choose the least harmful path, and record one clear {project} decision.`,
      `Ask both teams to quantify rework, risks and dependencies, then facilitate a rapid choice by the authorised {organisation} owner.`,
      `Freeze new work briefly and create a shared comparison so {counterpart} can resolve any genuine business trade-off.`,
      `Select the path used by the team furthest ahead, even if it does not best meet the {project} objective.`,
      `Forward old messages to senior leaders to prove which remote team caused the misunderstanding and demand that they absorb all rework.`,
    ],
    rationale: `A fact-based reset around decision rights and outcomes resolves ambiguity; progress sunk into one path is not enough to make it right.`,
  },
  {
    difficulty: 'hard', competency: 'Evidence-Based Communication',
    scenario: `A draft {project} proposal contains a powerful claim that would impress {counterpart}, but its only source is a small vendor-sponsored survey. The claim is directionally plausible and removing it may weaken the business case. Media bookings or investment decisions are imminent because {pressure}.`,
    responses: [
      `Remove or clearly qualify the claim, find stronger corroborating evidence, and explain to {counterpart} how the uncertainty changes the {project} case.`,
      `Present the claim as an early indicator, disclose the sample and sponsorship, and avoid using it as the main basis for the {project} decision.`,
      `Run a quick sensitivity showing whether the proposal still works if the claim is materially overstated.`,
      `Keep the claim prominent because the source is technically published and competitors make similar assertions.`,
      `Delete the source note so {counterpart} focuses on the compelling {project} message rather than research limitations.`,
    ],
    rationale: `Decision-useful communication distinguishes evidence from advocacy and tests whether uncertainty matters. Hiding limitations is deceptive.`,
  },
  {
    difficulty: 'hard', competency: 'Inclusion & Professional Courage',
    scenario: `In a {project} meeting, a senior stakeholder makes a dismissive comment about a quieter teammate's accent and several people laugh. The teammate becomes silent, while {counterpart} moves the agenda on. Challenging the comment could feel risky because the stakeholder influences {organisation}'s next decision.`,
    responses: [
      `Intervene calmly, state that the comment is not appropriate, redirect attention to the teammate's contribution, check in privately afterwards, and follow {organisation} policy.`,
      `Bring the conversation back to the teammate's idea immediately, then speak privately with the stakeholder and {manager} after the {project} meeting.`,
      `Check on the teammate after the meeting and support them in choosing whether and how to raise the incident formally.`,
      `Say nothing because protecting the {project} relationship is more important than one uncomfortable comment.`,
      `Repeat the comment later as a joke to show the team that everyone should be able to laugh at themselves.`,
    ],
    rationale: `Prompt, proportionate intervention protects inclusion and the work. Silence prioritises power over safety; repeating the harm compounds it.`,
  },
  {
    difficulty: 'hard', competency: 'Integrity Under Pressure',
    scenario: `{manager} suggests reclassifying a weak {project} result so the team can report that its quarterly target was met. The underlying customer outcome would not improve, but the definition is not written clearly in the dashboard guidance. Bonuses and {counterpart}'s confidence may depend on the number.`,
    responses: [
      `Refuse to manipulate the measure, clarify the intended definition with the {organisation} data owner, report the result transparently, and address the real performance gap.`,
      `Document both plausible definitions, show the result under each, and ask the authorised owner to standardise future {project} reporting.`,
      `Use the more favourable definition only if the dashboard includes a prominent note explaining the change and its effect.`,
      `Adopt the favourable definition quietly because the written {organisation} guidance is ambiguous.`,
      `Change the historical figures as well so the new {project} definition cannot be detected through comparison.`,
    ],
    rationale: `Metrics should represent the intended outcome consistently. Ambiguity calls for clarification and disclosure, not opportunistic gaming.`,
  },
  {
    difficulty: 'hard', competency: 'Decision-Making Under Uncertainty',
    scenario: `{counterpart} needs a {project} decision today, but two important data sources conflict and a definitive answer would take weeks. Delaying has a real commercial cost; deciding badly could also be expensive. {colleague} argues that the team should simply trust the larger dataset.`,
    responses: [
      `Identify which assumptions drive the decision, test source quality, choose a reversible or staged action where possible, and state triggers for changing course as evidence improves.`,
      `Run a focused sensitivity across both datasets and recommend the option that remains acceptable under the widest credible range.`,
      `Escalate the residual trade-off to {counterpart} with probabilities, impacts and a clear recommendation rather than pretending certainty.`,
      `Use the larger dataset automatically because sample size is the only objective way to resolve the {project} conflict.`,
      `Average the conflicting figures without investigating their definitions and present the result as the definitive {organisation} forecast.`,
    ],
    rationale: `Good uncertain decisions are explicit about assumptions, reversibility, robustness, and ownership—not falsely precise.`,
  },
  {
    difficulty: 'hard', competency: 'Priority Management',
    scenario: `You discover that two commitments for the {project} and another {organisation} priority cannot both be met. You accepted both before understanding the overlap, and each stakeholder believes their work is protected. Delegation options are limited while {pressure}.`,
    responses: [
      `Own the conflict early, compare business impact and immovable constraints with {manager}, then renegotiate one commitment transparently with a recovery plan.`,
      `Ask each stakeholder which elements are truly essential and use the answers to create a feasible minimum for both commitments.`,
      `Complete the highest-risk elements first while arranging a same-day priority decision from the appropriate {organisation} owner.`,
      `Work through the night alone and continue telling both stakeholders that their commitment is on track.`,
      `Miss the less visible commitment without warning and blame changing {project} requirements afterwards.`,
    ],
    rationale: `Transparent reprioritisation protects the most valuable outcome and trust. Hidden overcommitment shifts the cost to others.`,
  },
  {
    difficulty: 'hard', competency: 'Change Leadership',
    scenario: `Frontline users resist the new {project} process and say it adds work without solving their real problems. Senior sponsors want mandatory adoption next week, while early usage data is inconclusive. {counterpart} asks you to recommend whether {organisation} should force the launch.`,
    responses: [
      `Diagnose the resistance with users, separate design gaps from change friction, fix critical issues, and propose a measured rollout with training, support and adoption evidence.`,
      `Run a short pilot with representative users, define success measures, and bring the results to {counterpart} before scaling the {project}.`,
      `Proceed only with low-risk teams while collecting structured feedback and protecting an agreed route back if the process fails.`,
      `Make the {project} mandatory immediately because resistance is normal and usage will eventually create acceptance.`,
      `Label resistant users as blockers in the steering report so leaders pressure them into adopting the {organisation} process.`,
    ],
    rationale: `Effective change treats resistance as data while preserving momentum through pilots, support, and evidence—not coercion.`,
  },
  {
    difficulty: 'hard', competency: 'Safety & Regulatory Responsibility',
    scenario: `New evidence suggests the {project} could create a serious customer or safety risk, but the evidence has not yet been independently verified. Launch is scheduled for tomorrow, and pausing it would be costly for {organisation} and embarrassing for {counterpart}. {manager} asks whether the team can launch first and investigate quietly afterwards because {pressure}.`,
    responses: [
      `Contain the potentially affected {project} activity, alert the authorised safety or risk owner immediately, verify the evidence urgently, and give {counterpart} a decision based on customer protection and formal obligations.`,
      `Recommend a temporary pause on the highest-risk elements while an independent expert and the {organisation} risk owner review the evidence.`,
      `Propose a tightly controlled internal test with no customer exposure, provided the authorised {project} owner approves clear stop conditions.`,
      `Launch as planned with extra monitoring because the {project} evidence is not yet conclusive.`,
      `Remove the concern from the launch record and ask {colleague} to investigate after {counterpart} has announced the successful release.`,
    ],
    rationale: `A credible severe-risk signal requires proportionate containment, authorised review, and rapid verification. Commercial cost does not justify exposing customers first.`,
  },
  {
    difficulty: 'hard', competency: 'Organisational Learning',
    scenario: `After a visible {project} failure, senior leaders demand a post-mortem and already believe one team made the mistake. Evidence shows several small process gaps across {organisation}, including decisions approved by senior people. Team members are worried that speaking honestly will damage their careers.`,
    responses: [
      `Set a fact-based, psychologically safe review focused on the sequence, controls and decisions, include all levels, and assign systemic actions with owners and dates.`,
      `Collect evidence and perspectives confidentially first, then facilitate a review that distinguishes accountability from blame.`,
      `Publish the confirmed timeline and invite corrections before agreeing the highest-impact {project} prevention actions.`,
      `Support the leaders' preferred explanation so the post-mortem finishes quickly and {organisation} can move on.`,
      `Name junior individuals in the opening document before the review so senior approvers are protected from criticism.`,
    ],
    rationale: `Learning requires truth, psychological safety, and owned system improvements. Predetermined blame suppresses the evidence needed to prevent recurrence.`,
  },
];

function fill(template: string, theme: WorkplaceTheme): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: keyof WorkplaceTheme) => theme[key] || key);
}

function contextualizeResponse(template: string, theme: WorkplaceTheme): string {
  const filled = fill(template, theme);
  if (/\{\w+\}/.test(template)) return filled;
  return `For the ${theme.project} at ${theme.organisation}, ${filled.charAt(0).toLowerCase()}${filled.slice(1)}`;
}

function shuffled<T>(values: T[], seed: number): T[] {
  const result = values.slice();
  let state = seed >>> 0;
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function encodeSituationalRatings(slots: Array<string | null>): string {
  return Array.from({ length: 5 }, (_, index) => slots[index] || '-').join('>');
}

export function parseSituationalRatings(value: string | null | undefined): Array<string | null> {
  const parts = value ? value.split('>') : [];
  if (parts.length > 5) return new Array(5).fill(null);
  const seen = new Set<string>();
  return Array.from({ length: 5 }, (_, index) => {
    const label = parts[index] || '';
    if (!SITUATIONAL_OPTION_LABELS.includes(label as (typeof SITUATIONAL_OPTION_LABELS)[number]) || seen.has(label)) {
      return null;
    }
    seen.add(label);
    return label;
  });
}

export function isCompleteSituationalRating(value: string | null | undefined): boolean {
  const slots = parseSituationalRatings(value);
  return slots.every(Boolean) && new Set(slots).size === 5;
}

export interface SituationalScore {
  points: number;
  maxPoints: 12;
  distance: number;
  credit: number;
  exact: boolean;
}

/**
 * Five forced ratings are an ordered permutation. The maximum Spearman
 * footrule distance for five items is 12, so adjacent mistakes lose less than
 * reversing the model order. Incomplete questions receive no credit.
 */
export function scoreSituationalRatings(
  candidateValue: string | null | undefined,
  optimalRanking: string[],
): SituationalScore {
  const candidate = parseSituationalRatings(candidateValue);
  if (!candidate.every(Boolean) || new Set(candidate).size !== 5) {
    return { points: 0, maxPoints: 12, distance: 12, credit: 0, exact: false };
  }
  const ranking = candidate as string[];
  const distance = optimalRanking.reduce(
    (sum, label, expectedIndex) => sum + Math.abs(ranking.indexOf(label) - expectedIndex),
    0,
  );
  const points = Math.max(0, 12 - distance);
  return { points, maxPoints: 12, distance, credit: points / 12, exact: distance === 0 };
}

function makeQuestion(theme: WorkplaceTheme, themeIndex: number, dilemma: Dilemma, dilemmaIndex: number, questionIndex: number): SituationalQuestion {
  const ranked = dilemma.responses.map((response, responseIndex) => ({
    text: contextualizeResponse(response, theme),
    quality: 5 - responseIndex,
  }));
  const presented = shuffled(ranked, (themeIndex + 1) * 1009 + (dilemmaIndex + 1) * 9176);
  const optionLabels = SITUATIONAL_OPTION_LABELS.slice();
  const optimalRanking = presented
    .map((response, optionIndex) => ({ ...response, label: optionLabels[optionIndex] }))
    .sort((a, b) => b.quality - a.quality)
    .map((response) => response.label);

  return {
    id: `sjt-${String(themeIndex + 1).padStart(2, '0')}-q${String(questionIndex + 1).padStart(2, '0')}`,
    kind: 'situational',
    difficulty: dilemma.difficulty,
    prompt: fill(dilemma.scenario, theme),
    options: presented.map((response) => response.text),
    optionLabels: optionLabels.slice(),
    correctAnswer: encodeSituationalRatings(optimalRanking),
    optimalRanking,
    competency: dilemma.competency,
    explanation: fill(dilemma.rationale, theme),
  };
}

let cachedLibrary: SituationalTest[] | null = null;

/** 30 deterministic tests × 30 unique situations = 900 questions. */
export function loadSituationalJudgementLibrary(): SituationalTest[] {
  if (cachedLibrary) return cachedLibrary;
  cachedLibrary = THEMES.map((theme, themeIndex) => {
    const questions = Array.from({ length: 30 }, (_, questionIndex) => {
      // A coprime stride changes the order in every test while retaining the
      // exact 9 Easy / 12 Medium / 9 Hard mix.
      const dilemmaIndex = (questionIndex * 7 + themeIndex * 11) % DILEMMAS.length;
      return makeQuestion(theme, themeIndex, DILEMMAS[dilemmaIndex], dilemmaIndex, questionIndex);
    });
    return {
      id: `sjt-${String(themeIndex + 1).padStart(2, '0')}`,
      name: `Test ${themeIndex + 1}`,
      subtitle: '5-option forced rating · Untimed',
      description: `${theme.role} scenarios at ${theme.organisation}: rate every response from Very Effective to Counterproductive, using each rating once.`,
      difficulty: 'mixed',
      difficultyBreakdown: '9 Easy · 12 Medium · 9 Hard',
      timeLimitSeconds: 0,
      questions,
    };
  });
  return cachedLibrary;
}
