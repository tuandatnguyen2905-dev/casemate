/**
 * caseFeedbackGuides.ts - how Mate writes the Feedback ("What worked / What to fix")
 * and Suggested Answer ("Worked answer") text for Case Drill and Case Pool.
 *
 * Condensed from the Casemate AI Feedback references (01 Charts, 02 Calculations,
 * 03 Structures, 04 Creative Options, 05 Market Sizing). These rules govern wording
 * only: they never change a rubric, weight, score or result state. The same text is
 * pasted into the casemate-micro-drill-v1 and casemate-case-drill-v4 server functions
 * (FEEDBACK_WRITING_RULES / FEEDBACK_SKILL_LENSES); keep the three copies identical.
 */

export type FeedbackSkill = 'charts' | 'calculations' | 'structures' | 'creativity' | 'market_sizing';

export const FEEDBACK_WRITING_RULES = [
  'FEEDBACK AND WORKED-ANSWER WRITING RULES (these govern wording only; apply every scoring rule, weight and criterion above unchanged):',
  '1. Every criterion reason, stronger_answer, matched or missing item, evidence_to_revisit item and next_step must refer to what the candidate actually wrote (quote or paraphrase their claim, figure, component or branch) and to a verified fact, exhibit value or worked-answer step from THIS case. No generic praise and no stock rubric wording.',
  '2. Diagnose in this order: the strongest valid move the candidate made; the single most consequential gap or error (the one that most changes the conclusion or the score); why it matters for this case\u2019s decision; one concrete next action. Do not list every small issue.',
  '3. Match depth to the question. A narrow or Easy item needs one precise observation, not a full consulting answer; a full case may need the decisive calculation, counter-signal and recommendation. Never criticise the absence of something the question did not ask for.',
  '4. Credit reasonable alternative structures, routes, assumptions and conclusions that are consistent with the case evidence, and say they are valid instead of listing them as missing. A correct insight worded differently from the worked answer is correct.',
  '5. Keep case facts, the candidate\u2019s assumptions and the worked answer\u2019s illustrative assumptions separate. Never invent a fact, figure, quote or exhibit to explain a score. Never say evidence was overlooked without naming the exhibit or fact, its value, and why it changes the interpretation.',
  '6. Use the same case facts, figures, units and definitions as the worked answer: the feedback and the worked answer must never contradict each other, and each reason must agree with its own score (no complaint on a 10, no praise on a low score).',
  '7. If the exhibit, case data and answer key disagree, or the case lacks an input needed for a trustworthy answer, do not blame the candidate: say plainly in the relevant reason that the case evidence is inconsistent, and describe the problem in content_flags. Otherwise return content_flags as [].',
].join('\n');

export const FEEDBACK_SKILL_LENSES: Record<FeedbackSkill, string> = {
  charts: 'CHARTS LENS: check the reading first (metric, series, period, unit, scale, index base; absolute value vs share vs growth rate vs percentage-point change; a stacked component vs the total; waterfall signs and endpoints), then the decision-relevant comparison and its size, then the interpretation and its limit (alternative explanation; correlation or an index move is not proof of cause; what the data cannot establish). High-impact errors: wrong axis or unit, mixing company value with market value, reading a stacked component as the total, reversing a waterfall, ignoring a contradicting second exhibit, unsupported causal claims; imprecise wording or rounding that leaves the conclusion intact is minor. Feedback: what the candidate read correctly or incorrectly, the exact exhibit and value, the consequence for the decision, one next action; when the answer is correct, name the decisive comparison and one useful check. Worked answer: reading, then calculation or comparison, then implication, then a limitation or check, naming each exhibit and its basis and reconciling related exhibits with the same figures.',
  calculations: 'CALCULATIONS LENS: define the target quantity (revenue, gross profit, contribution, operating profit, share, growth rate, break-even, incremental value) and its denominator, rebuild the formula (same population and period, no double counting, correct base for percentage changes), check every substitution against the case data and the arithmetic, then the interpretation and an order-of-magnitude or sign check. Separate method, input, arithmetic, unit and interpretation errors and name the exact step; an equivalent unit or a rounding difference is not an error. If only a final number is given, comment on its equivalence and the result, never on invented unseen steps. Feedback: the one step most responsible for the result, the candidate\u2019s substitution if shown, the corrected value with its unit, the business consequence, one practical action. Worked answer: target metric, formula, inputs (case facts kept apart from assumptions), substituted calculation, result with unit, interpretation or check.',
  structures: 'STRUCTURES LENS: root question (the client\u2019s actual decision with objective, scope and constraints), then first-level branches that are causal or decision-relevant without double counting, then case-specific, testable sub-drivers (the metric or evidence that would confirm or refute each), then the priority and the finding that would change the recommendation. Several trees can be valid: judge coverage and decision usefulness, not labels, branch order or a named framework. Major issues: wrong root, a missing material economic driver, circular or duplicated branches, a symptom treated as a proven cause. Feedback: one strong structural choice and the most consequential missing or weak branch, why it matters for this case, and what to add or test first; name the missing mechanism instead of only saying "not MECE". Worked answer: root question, 2-4 top branches each with its key sub-driver and diagnostic evidence, the first priority and why, unverified points labelled as hypotheses, and one materially different valid organisation.',
  creativity: 'CREATIVE OPTIONS LENS: problem fit (target customer, unmet need, objective, stated constraints), then distinct mechanisms (options must differ in customer, offer, channel, revenue model or operations, not only in name), then feasibility and economics proportional to the task, then a choice with a measurable pilot and decision gate. Novelty alone is not value and is not proof of demand; a conventional idea with a useful adaptation is acceptable. Major issues: an idea that violates a stated constraint, misses the target problem, options sharing one mechanism, value claims with no plausible path. Feedback: the strongest idea or mechanism and why, one material gap (fit, distinctness, economics or test), the business risk that gap creates, one revision; compare the candidate\u2019s ideas with each other rather than praising generically. Worked answer: problem and target, distinct options with how each creates value, a constraint and economics check, the recommended pilot and decision gate; mark invented concept details as illustrative, not as case facts.',
  market_sizing: 'MARKET SIZING LENS: boundary (offering, buyer, geography, period, volume vs value; a stock such as households is not an annual flow such as purchases per year), then a non-overlapping decomposition segmented where behaviour differs, then a number and unit for every factor, then a substituted calculation with consistent units. Judge the model, not closeness to the worked answer\u2019s number; a different defensible assumption is not an error. Major issues: wrong boundary, double counting, missing values for required factors, incompatible units or annualisation, an error of about 1,000 times. Feedback: credit a valid structure even when the estimate differs; name exactly which factor, operator or unit drives the gap and its directional effect on the result, with a comparator or reason (never only "unrealistic"); if values are missing, ask for a number and unit for each factor and the multiplication to the final figure. Worked answer: market definition, formula, every factor with value, unit and status (case fact or illustrative assumption), step-by-step substitution with segment subtotals, final estimate, then the most sensitive factor and a sensible check or range.',
};

export const FEEDBACK_SKILL_ORDER: FeedbackSkill[] = ['structures', 'calculations', 'charts', 'market_sizing', 'creativity'];

/** Skills a Case Drill exercise type tests; a full case passes several. */
export function feedbackSkillsForExercise(exerciseType: string): FeedbackSkill[] {
  const type = String(exerciseType || '').toLowerCase();
  if (type.includes('market') && type.includes('siz')) return ['market_sizing'];
  if (type.includes('calcul') || type.includes('math')) return ['calculations'];
  if (type.includes('chart') || type.includes('data')) return ['charts'];
  if (type.includes('creativ')) return ['creativity'];
  return ['structures'];
}

export function feedbackGuideText(skills: FeedbackSkill[]): string {
  const wanted = FEEDBACK_SKILL_ORDER.filter((skill) => skills.includes(skill));
  const lenses = (wanted.length ? wanted : ['structures' as FeedbackSkill]).map((skill) => FEEDBACK_SKILL_LENSES[skill]);
  const combine = lenses.length > 1
    ? 'This case tests several skills: apply each lens only to the part of the answer it governs, keep the overall business decision in view, and make each point once.'
    : '';
  return [FEEDBACK_WRITING_RULES, ...lenses, combine].filter(Boolean).join('\n');
}
