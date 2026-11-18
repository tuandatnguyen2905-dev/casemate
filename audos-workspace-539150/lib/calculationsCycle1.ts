import type { HonestScoreResult } from './caseScoringRubrics';
import type { CalculationAnswerPayload } from './calculationAnswerModel';
import { calculationAttemptFromPayload } from './calculationScoringAdapter';
import {
  attemptFromSerializedAnswer,
  scoreCalculationAttempt,
  type CalculationScoreOutcome,
  type CalculationScoringCheck,
} from './calculationScoring';
import { calculationWorkedAnswerFor, type CalculationWorkedItem } from './calculationWorkedAnswers';
import type { LibraryQuestion } from './skillQuestionLibrary';

export interface CalculationNumericCheck { label: string; value: number; tolerance: number; unit: string; }
export interface CalculationAnswerField { key: 'inputs' | 'working' | 'finalResults' | 'interpretation'; label: string; help: string; }
export interface CalculationBankCase {
  sourceCaseId: string; code: string; title: string; difficulty: 'hard' | 'expert'; family: string;
  brief: string; task: string; answerKey: string; decisionAndLimit: string; scoringEmphasis: string;
  weakAnswerFeedback: string; numericChecks: CalculationNumericCheck[]; roundingRule: string;
  nextCaseId: string; answerFields: CalculationAnswerField[];
}
export type CalculationSubmission = CalculationAnswerPayload;
export interface CalculationFeedback { scoring: HonestScoreResult; summary: string; firstDecisiveError: string; revisions: string[]; nextCaseId: string; outcome: CalculationScoreOutcome; }

export const CALCULATION_CYCLE_1_CASES: CalculationBankCase[] = [
  {
    "sourceCaseId": "CM-CALC-H01",
    "code": "H01",
    "title": "Kiva price increase",
    "difficulty": "hard",
    "family": "Pricing and contribution",
    "brief": "Kiva sells 20,000 snack packs per month at VND 100,000 each. Variable cost is VND 60,000 per pack. Management proposes a price of VND 110,000; expected sales fall to 19,000, variable cost rises to VND 63,000, and a one-time campaign costs VND 40 million this month. Unchanged fixed costs can be ignored.",
    "task": "Calculate baseline and proposed monthly contribution after campaign spending. Should Kiva proceed on this one -month criterion? What is the minimum whole-unit volume at the proposed economics needed to match baseline?",
    "answerKey": "1. Baseline = 20,000 × (100,000 − 60,000) = 800 million VND. 2. Proposal = 19,000 × (110,000 − 63,000) − 40 million VND = 853 million VND. 3. Increment = 53 million VND. Equality volume = (800 million + 40 million) ÷ 47,000 ≈ 17,872.34; at least 17,873 whole packs are needed.",
    "decisionAndLimit": "Proceed under the stated one-month assumption; verify whether 19,000 units and VND 63,000 unit cost are credible.",
    "scoringEmphasis": "Credit the baseline comparison, campaign cost once, correct threshold and conditional recommendation.",
    "weakAnswerFeedback": "If a learner compares revenue only, explain that unit contribution changes with cost and volume. Have them calculate 800 million VND versus 853 million VND before deciding.",
    "numericChecks": [
      {
        "label": "Baseline contribution",
        "value": 800,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Proposed contribution",
        "value": 853,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even volume",
        "value": 17873,
        "tolerance": 0,
        "unit": "packs"
      }
    ],
    "roundingRule": "Round the minimum volume threshold up to the next whole pack.",
    "nextCaseId": "CM-CALC-H02",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E01",
    "code": "E01",
    "title": "Nami premium line launch",
    "difficulty": "expert",
    "family": "Pricing and contribution",
    "brief": "Nami proposes a new product with two channels. Direct sales: 4,000 units at VND 120,000, with VND 70,000 production and VND 10,000 fulfillment per unit. Retail: 6,000 units at a VND 100,000 realized price, with VND 70,000 production and VND 10,000 trade cost per unit. Twenty percent of the 10,000 new-product units replace purchases of an existing Nami product earning VND 15,000 contribution each. Launch fixed spending is VND 180 million. Hold the 40% direct/60% retail mix and 20% cannibalization rate constant for any volume comparison.",
    "task": "Calculate incremental contribution, break-even new-product units and the cannibalization rate at 10,000 units that would make the launch break even. State a decision.",
    "answerKey": "1. Direct contribution = 4,000 × (120,000 − 70,000 − 10,000) = 160 million VND; retail = 6,000 × (100,000 − 70,000 − 10,000) = 120 million VND. 2. Lost incumbent contribution = 10,000 × 20% × 15,000 = 30 million VND. Net incremental contribution = 160 million + 120 million − 30 million − 180 million = 70 million VND. 3. Weighted contribution per launch unit after cannibalization = 40% × 40,000 + 60% × 20,000 − 20% × 15,000 = VND 25,000. Break-even units = 180 million ÷ 25,000 = 7,200. 4. At 10,000 units, pre-cannibalization contribution is 280 million VND. Maximum loss before reaching zero after fixed spend = 100 million VND; 100 million ÷ (10,000 × 15,000) = 66.67% cannibalization.",
    "decisionAndLimit": "Launch under the stated contribution assumptions; validate the estimated substitution rate and channel mix.",
    "scoringEmphasis": "Check channel-specific margins, displaced incumbent profit, fixed spend, constant-mix threshold and conditional interpretation.",
    "weakAnswerFeedback": "If a learner reports 100 million VND, they probably omitted 30 million VND of incumbent contribution; preserve credit for both correct channel calculations. Promotion economics",
    "numericChecks": [
      {
        "label": "Net incremental contribution",
        "value": 70,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even volume",
        "value": 7200,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Cannibalization threshold",
        "value": 66.67,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Keep contribution in VND million; report the break-even volume as an exact whole number of units and the cannibalization threshold to two decimals.",
    "nextCaseId": "CM-CALC-E02",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H02",
    "code": "H02",
    "title": "Mela limited discount",
    "difficulty": "hard",
    "family": "Promotion economics",
    "brief": "Mela normally sells 10,000 bottles per period at VND 100,000 each and pays VND 60,000 variable cost per bottle. A proposed VND 10,000 price discount is expected to lift period sales to 12,500 bottles. The promotion also costs VND 40 million to run. Assume all sales in the promotion period receive the discount and other costs are unchanged.",
    "task": "Compare baseline and promotion contribution. Should Mela run it on this period’s contribution? How many whole bottles must it sell under the promotion to break even with baseline?",
    "answerKey": "1. Baseline = 10,000 × 40,000 = 400 million VND. 2. Promotion = 12,500 × (90,000 − 60,000) − 40 million = 335 million VND; change = −65 million VND. 3. Break-even promotional sales = (400 million + 40 million) ÷ 30,000 ≈ 14,666.67, or at least 14,667 bottles.",
    "decisionAndLimit": "Do not run at the forecast 12,500 bottles solely for this period’s contribution; test whether any longer-term benefit justifies the gap.",
    "scoringEmphasis": "Check discount application to every promoted unit, fixed campaign spend and the whole-unit threshold.",
    "weakAnswerFeedback": "If a learner says more units mean more profit, show that per-unit contribution falls from VND 40,000 to VND 30,000 and ask for a net comparison.",
    "numericChecks": [
      {
        "label": "Baseline contribution",
        "value": 400,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Promotion contribution",
        "value": 335,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even volume",
        "value": 14667,
        "tolerance": 0,
        "unit": "bottles"
      }
    ],
    "roundingRule": "Round the minimum volume threshold up to the next whole bottle.",
    "nextCaseId": "CM-CALC-H03",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E02",
    "code": "E02",
    "title": "Treo coupon incrementality",
    "difficulty": "expert",
    "family": "Promotion economics",
    "brief": "Treo normally sells 30,000 bags at VND 100,000, with VND 60,000 variable cost each. In a proposed period it would issue a VND 15,000 coupon on exactly 12,000 purchases. Treo estimates that 40% of coupon purchases would otherwise have occurred at full price; the remaining 60% are genuinely additional. All other full-price purchases remain unchanged. Coupon administration costs VND 80 million. There are no stockouts, and each shopper buys one bag.",
    "task": "Compare period contribution with and without the coupon. At the fixed 12,000 redemptions, what minimum incremental - buyer share makes the campaign break even with baseline?",
    "answerKey": "1. Baseline = 30,000 × (100,000 − 60,000) = 1,200 million VND. 2. Existing buyers using a coupon = 12,000 × 40% = 4,800; remaining full-price purchases = 30,000 − 4,800 = 25,200. Coupon contribution/unit = 100,000 − 15,000 − 60,000 = VND 25,000. 3. Campaign contribution = 25,200 × 40,000 + 12,000 × 25,000 − 80 million = 1,008 million + 300 million − 80 million = 1,228 million VND, or 28 million VND above baseline. 4. Let s be the incremental share of redemptions. Change versus baseline = 12,000 × 25,000 − 12,000 × (1 − s) × 40,000 − 80 million = 480 million × s − 260 million. Equality occurs at s = 54.17%.",
    "decisionAndLimit": "Run under the estimated 60% incremental share, but verify incrementality with a control group; 54.17% is the contribution break-even share.",
    "scoringEmphasis": "Check substitution, coupon unit economics, campaign expense and the algebraic incremental-share threshold.",
    "weakAnswerFeedback": "If a learner calls all 12,000 coupons new customers, explain that 4,800 displaced full -price transactions in the stated estimate. Funnel and acquisition cost",
    "numericChecks": [
      {
        "label": "Baseline contribution",
        "value": 1200,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Campaign contribution",
        "value": 1228,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even incremental share",
        "value": 54.17,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Report the incremental-buyer share to two decimal places.",
    "nextCaseId": "CM-CALC-E03",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H03",
    "code": "H03",
    "title": "Nexo paid acquisition funnel",
    "difficulty": "hard",
    "family": "Funnel and acquisition cost",
    "brief": "Nexo buys 500,000 ad impressions for VND 32 million. Five percent click; 20% of visitors register; 8% of registrants buy. Each impression belongs to this single campaign. A landing-page redesign may raise the registration rate to 25% while spend and the other rates stay unchanged.",
    "task": "Compute current buyers and customer acquisition cost. Recalculate buyers and acquisition cost in the redesign scenario. State what the calculation does not prove.",
    "answerKey": "1. Visitors = 500,000 × 5% = 25,000; registrations = 25,000 × 20% = 5,000; buyers = 5,000 × 8% = 400. 2. Current acquisition cost = 32 million ÷ 400 = VND 80,000 per buyer. 3. Scenario registrations = 25,000 × 25% = 6,250; buyers = 500; acquisition cost = VND 64,000 per buyer.",
    "decisionAndLimit": "The modeled improvement adds 100 buyers at the same spend; it is not evidence that the redesign will actually achieve a 25% registration rate.",
    "scoringEmphasis": "Check the denominator of every funnel step, fixed spend, cost per buyer and scenario caveat.",
    "weakAnswerFeedback": "If a learner applies 25% directly to impressions, point to the 25,000 visitors as the registration denominator and ask them to recompute.",
    "numericChecks": [
      {
        "label": "Current buyers",
        "value": 400,
        "tolerance": 0,
        "unit": "buyers"
      },
      {
        "label": "Current acquisition cost",
        "value": 80000,
        "tolerance": 1,
        "unit": "VND per buyer"
      },
      {
        "label": "Redesign buyers",
        "value": 500,
        "tolerance": 0,
        "unit": "buyers"
      },
      {
        "label": "Redesign acquisition cost",
        "value": 64000,
        "tolerance": 1,
        "unit": "VND per buyer"
      }
    ],
    "roundingRule": "Report buyers as whole people and acquisition cost in VND per buyer.",
    "nextCaseId": "CM-CALC-H04",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E03",
    "code": "E03",
    "title": "Nexo budget reallocation",
    "difficulty": "expert",
    "family": "Funnel and acquisition cost",
    "brief": "Nexo spends VND 60 million in Channel A for 30,000 clicks; 20% register and 10% of registrants buy. It spends VND 40 million in Channel B for 20,000 clicks; 15% register and 8% of registrants buy. After non -ad variable costs, each A buyer contributes VND 180,000 and each B buyer contributes VND 220,000. Nexo can move VND 10 million from B to A next period; assume clicks per VND and both channels’ conversion rates stay constant and A can absorb the spend.",
    "task": "Calculate each channel’s net contribution after ad spend, the total, and the incremental effect of reallocating VND 10 million. Recommend an allocation under the assumptions.",
    "answerKey": "1. A buyers = 30,000 × 20% × 10% = 600; contribution after ads = 600 × 180,000 − 60 million = 48 million VND. 2. B buyers = 20,000 × 15% × 8% = 240; after ads = 240 × 220,000 − 40 million = 12.8 million VND. Current total = 60.8 million VND. 3. 10 million VND moved to A adds 100 A buyers; 10 million VND removed from B loses 60 B buyers. Total ad spend is unchanged, so incremental contribution = 100 × 180,000 − 60 × 220,000 = 4.8 million VND; new total = 65.6 million VND.",
    "decisionAndLimit": "Reallocate on modeled net contribution, then test marginal conversion efficiency rather than assuming it remains linear as spend changes.",
    "scoringEmphasis": "Check acquisition funnel by channel, contribution after ads, incremental buyers per VND and unchanged total spend.",
    "weakAnswerFeedback": "If a learner compares buyer contributions only, show the cost of acquiring those buyers and calculate the marginal effect of shifting spend. Subscription cohort economics",
    "numericChecks": [
      {
        "label": "Channel A contribution after ads",
        "value": 48,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Channel B contribution after ads",
        "value": 12.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Current total contribution",
        "value": 60.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Reallocation increment",
        "value": 4.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "New total contribution",
        "value": 65.6,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report contribution in VND million to one decimal where needed.",
    "nextCaseId": "CM-CALC-E04",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H04",
    "code": "H04",
    "title": "MateLab three-month cohort",
    "difficulty": "hard",
    "family": "Subscription cohort economics",
    "brief": "MateLab acquires 2,000 new subscribers at the start of month 1. Each billed subscriber pays VND 120,000 per month and requires VND 30,000 in monthly variable service cost. Fifteen percent of active subscribers leave at the end of each billed month. Acquisition costs VND 60 million once; platform fixed costs are VND 20 million in each of the three months. Ignore taxes and any new cohorts.",
    "task": "Estimate billed subscriber-months and three-month contribution after the stated acquisition and fixed costs. Explain the timing of churn.",
    "answerKey": "1. Billed subscribers: month 1 = 2,000; month 2 = 2,000 × 85% = 1,700; month 3 = 1,700 × 85% = 1,445. Total = 5,145 subscriber-months. 2. Unit monthly margin = 120,000 − 30,000 = VND 90,000. 3. Three-month contribution = 5,145 × 90,000 − 60 million − 3 × 20 million = 343.05 million VND.",
    "decisionAndLimit": "The cohort remains positive over three months under constant 15% end-of-month churn; this does not establish lifetime profitability beyond month 3.",
    "scoringEmphasis": "Check churn timing, subscriber-months, acquisition cost once and fixed cost three times.",
    "weakAnswerFeedback": "If a learner removes 15% before billing month 1, explain that departures happen at month -end and restore the initial 2,000 billed users.",
    "numericChecks": [
      {
        "label": "Billed subscriber-months",
        "value": 5145,
        "tolerance": 0,
        "unit": "subscriber-months"
      },
      {
        "label": "Three-month contribution",
        "value": 343.05,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Bill the opening cohort before end-of-month churn; subscriber-months are whole in this case.",
    "nextCaseId": "CM-CALC-H05",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E04",
    "code": "E04",
    "title": "MateLab price and retention",
    "difficulty": "expert",
    "family": "Subscription cohort economics",
    "brief": "MateLab has a cohort of 5,000 subscribers billed at the start of month 1. Baseline price is VND 100,000 per billed month, variable service cost is VND 35,000, and 80% of users remain for each following month. A proposed VND 115,000 price would lower monthly retention to 75%, starting after month 1, and requires VND 80 million in one-time communication spending. Compare the same initial cohort over three billed months. Ignore acquisition costs because they are identical under both options.",
    "task": "Compute three-month contribution under each option and the proposal’s advantage or disadvantage. What minimum monthly retention at the new price makes its three-month contribution equal to baseline?",
    "answerKey": "1. Baseline subscriber-months = 5,000 × (1 + 0.8 + 0.8²) = 12,200; contribution = 12,200 × (100,000 − 35,000) = 793 million VND. 2. Proposal subscriber-months = 5,000 × (1 + 0.75 + 0.75²) = 11,562.5 expected; contribution = 11,562.5 × 80,000 − 80 million = 845 million VND. Improvement = 52 million VND. 3. At new-price retention r, 5,000 × 80,000 × (1 + r + r²) − 80 million = 793 million. Therefore r² + r − 1.1825 = 0, giving r ≈ 69.69%.",
    "decisionAndLimit": "Raise price under the stated three-month contribution assumptions; check whether the retention change persists beyond month 3 and whether churn differs by segment.",
    "scoringEmphasis": "Check retention applied after billing month 1, geometric cohort, one-time communication cost and threshold root.",
    "weakAnswerFeedback": "If a learner compares only VND 115,000 with VND 100,000, show that the higher price changes the number of billed subscriber-months. Channel contribution",
    "numericChecks": [
      {
        "label": "Baseline contribution",
        "value": 793,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Proposal expected subscriber-months",
        "value": 11562.5,
        "tolerance": 0.1,
        "unit": "subscriber-months"
      },
      {
        "label": "Proposal contribution",
        "value": 845,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Proposal improvement",
        "value": 52,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Minimum monthly retention",
        "value": 69.69,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Keep the expected cohort in fractional subscriber-months (do not round it) and report retention to two decimals.",
    "nextCaseId": "CM-CALC-E05",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H05",
    "code": "H05",
    "title": "Treo channel shift",
    "difficulty": "hard",
    "family": "Channel contribution",
    "brief": "Treo sells 6,000 units direct at VND 120,000 each. Each direct unit costs VND 70,000 to produce and VND 10,000 to fulfill. It sells 4,000 units to retailers at a realized price of VND 95,000, with the same production cost and VND 5,000 trade cost per unit. Treo could shift 1,000 existing retail units to direct without changing total demand; doing so requires VND 15 million additional direct marketing.",
    "task": "Calculate current total contribution and the net contribution change from shifting 1,000 units. Should Treo shift the units under these assumptions?",
    "answerKey": "1. Direct unit contribution = 120,000 − 70,000 − 10,000 = VND 40,000; 6,000 units yield 240 million VND. 2. Retail unit contribution = 95,000 − 70,000 − 5,000 = VND 20,000; 4,000 units yield 80 million VND. Current total = 320 million VND. 3. Shift gain before marketing = 1,000 × (40,000 − 20,000) = 20 million VND; net gain = 5 million VND.",
    "decisionAndLimit": "Shift on the stated contribution criterion, subject to the assumption that direct demand can absorb 1,000 units without displacing other sales.",
    "scoringEmphasis": "Check realized wholesale price, channel-specific variable costs, unchanged total units and the 15 million VND incremental spend.",
    "weakAnswerFeedback": "If a learner counts the shifted direct revenue as all incremental, show that the same 1,000 units would otherwise earn retail contribution.",
    "numericChecks": [
      {
        "label": "Current contribution",
        "value": 320,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Gross shift benefit",
        "value": 20,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Net shift benefit",
        "value": 5,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report contribution in VND million; do not treat shifted sales as incremental volume.",
    "nextCaseId": "CM-CALC-H06",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E05",
    "code": "E05",
    "title": "Vela distribution redesign",
    "difficulty": "expert",
    "family": "Channel contribution",
    "brief": "Vela expects 14,000 shipments. Under a proposal, 6,000 ship direct at VND 140,000 each; 10% are returned for full refund. Direct production costs VND 70,000 per retained unit; returned units recover their full production cost. Outbound shipping is VND 10,000 on every direct shipment and return handling is VND 5,000 per return. Another 8,000 ship through retail at a VND 95,000 realized price; 5% are returned and fully credited. Retail production and VND 5,000 trade cost apply only to retained units, while outbound distribution is VND 5,000 per shipment and return handling is VND 3,000 per return. Direct platform fixed cost is VND 60 million and retail onboarding is VND 50 million. The alternative is to ship all 14,000 through retail with the same retail return economics and only the VND 50 million onboarding cost. Assume channel demand and return rates remain as specified.",
    "task": "Calculate net contribution under the proposal and the all-retail alternative, then the proposal’s incremental contribution. Identify the key assumption to validate.",
    "answerKey": "1. Direct: 5,400 retained × (140,000 − 70,000) − 6,000 × 10,000 − 600 × 5,000 = 315 million VND before platform fixed cost. 2. Retail in proposal: 7,600 retained × (95,000 − 70,000 − 5,000) − 8,000 × 5,000 − 400 × 3,000 = 110.8 million VND before onboarding. Proposal net = 315 million + 110.8 million − 60 million − 50 million = 315.8 million VND. 3. All-retail: 13,300 retained × 20,000 − 14,000 × 5,000 − 700 × 3,000 − 50 million = 143.9 million VND. Increment = 171.9 million VND.",
    "decisionAndLimit": "The proposal wins on modeled contribution; verify that the same 14,000 shipments can be sold at the assumed direct/retail prices and return rates.",
    "scoringEmphasis": "Check refund treatment, recovery of production cost on returns, outbound costs on all shipments and fixed costs for each option.",
    "weakAnswerFeedback": "If a learner excludes shipping on returned orders, point to the outbound cost on every shipment and recompute both channels. Capacity and opportunity cost",
    "numericChecks": [
      {
        "label": "Proposal contribution",
        "value": 315.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "All-retail contribution",
        "value": 143.9,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Proposal increment",
        "value": 171.9,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report contribution in VND million to one decimal.",
    "nextCaseId": "CM-CALC-E06",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H06",
    "code": "H06",
    "title": "Orin factory product mix",
    "difficulty": "hard",
    "family": "Capacity and opportunity cost",
    "brief": "Orin makes Product A for VND 50,000 contribution per unit using two machine hours, and Product B for VND 36,000 contribution per unit using one machine hour. Next week it has 1,000 machine hours. Demand is capped at 300 A and 800 B units. A proposed customer contract would require at least 150 A units. All quantities can be produced and sold; there are no other constraints or fixed costs.",
    "task": "Find the optimal mix without the contract and the optimal mix with it. What is the weekly contribution cost of accepting the minimum-A requirement?",
    "answerKey": "1. Contribution per machine hour: A = VND 25,000; B = VND 36,000. Without the contract, make 800 B (800 hours) and 100 A (200 hours). 2. Unconstrained contribution = 800 × 36,000 + 100 × 50,000 = 33.8 million VND. 3. With at least 150 A, use 300 hours on A and 700 on B: contribution = 150 × 50,000 + 700 × 36,000 = 32.7 million VND. Cost = 1.1 million VND.",
    "decisionAndLimit": "The contract needs at least 1.1 million VND of extra benefit to compensate for the lost weekly contribution.",
    "scoringEmphasis": "Check contribution per scarce hour, demand limits, capacity feasibility and opportunity cost.",
    "weakAnswerFeedback": "If a learner favors A because it has a higher unit margin, show that it uses twice as many scarce machine hours.",
    "numericChecks": [
      {
        "label": "Unconstrained Product A units",
        "value": 100,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Unconstrained Product B units",
        "value": 800,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Contract Product A units",
        "value": 150,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Contract Product B units",
        "value": 700,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Unconstrained contribution",
        "value": 33.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Contract contribution",
        "value": 32.7,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Opportunity cost",
        "value": 1.1,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Continuous planning is not allowed here; use whole units and report contribution in VND million.",
    "nextCaseId": "CM-CALC-H07",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E06",
    "code": "E06",
    "title": "Orin dual-bottleneck factory",
    "difficulty": "expert",
    "family": "Capacity and opportunity cost",
    "brief": "Orin makes Product A with VND 70,000 contribution, two machine hours and one labor hour per unit. Product B earns VND 50,000 contribution, one machine hour and two labor hours per unit. Next week Orin has 900 machine hours and 900 labor hours, and can sell at most 400 units of each product. It can rent 60 additional machine hours for VND 1.2 million; labor capacity remains 900. Units may be planned continuously for this short-range exercise.",
    "task": "Find the contribution-maximizing mix before and after renting machine time, net of the rental fee. Should Orin rent it?",
    "answerKey": "1. Original binding constraints: 2A + B = 900 machine hours and A + 2B = 900 labor hours. Solution A = 300, B = 300; contribution = 300 × 70,000 + 300 × 50,000 = 36 million VND. Demand limits are not violated. 2. With 960 machine hours: 2A + B = 960 and A + 2B = 900. Solution A = 340, B = 280; contribution before fee = 37.8 million VND. 3. After 1.2 million VND rental fee, contribution = 36.6 million VND, 0.6 million VND more than baseline. The incremental machine capacity is worth 1.8 million VND gross, or VND 30,000 per hour over this 60-hour range.",
    "decisionAndLimit": "Rent the hours under the stated linear constraints; check that both demand caps still hold and the marginal value remains valid over the full 60 hours.",
    "scoringEmphasis": "Check both constraints, corner/intersection feasibility, demand caps and rental fee only in the rental option.",
    "weakAnswerFeedback": "If a learner maximizes contribution per machine hour alone, show that labor is also scarce and the feasible intersection matters. Returns and salvage",
    "numericChecks": [
      {
        "label": "Baseline Product A units",
        "value": 300,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Baseline Product B units",
        "value": 300,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Baseline contribution",
        "value": 36,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Rental mix Product A",
        "value": 340,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Rental mix Product B",
        "value": 280,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Contribution after rental fee",
        "value": 36.6,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Rental increment",
        "value": 0.6,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Continuous short-range planning is allowed; the optimum happens to be whole units.",
    "nextCaseId": "CM-CALC-E07",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H07",
    "code": "H07",
    "title": "Luma returns reduction",
    "difficulty": "hard",
    "family": "Returns and salvage",
    "brief": "Luma ships 10,000 paid orders. Each item sells for VND 90,000 and costs VND 50,000 to produce. Eight percent are returned and fully refunded; each returned item has VND 30,000 salvage value. Luma pays VND 6,000 outbound shipping on every order and VND 4,000 handling on each return. Production cost is incurred for all 10,000 shipped units. A service change could reduce returns to 5% without additional cost.",
    "task": "Calculate contribution at the current and improved return rates and the value of the improvement. Show clearly how returned units are treated.",
    "answerKey": "1. Current: 9,200 retained sales × VND 40,000 margin + 800 returned units × (30,000 salvage − 50,000 production) − 10,000 × 6,000 shipping − 800 × 4,000 handling = 288.8 million VND. 2. At 5% returns: 9,500 × 40,000 + 500 × (30,000 − 50,000) − 60 million − 500 × 4,000 = 308 million VND. 3. Improvement = 19.2 million VND. Equivalently, each avoided return recovers VND 64,000, across 300 orders.",
    "decisionAndLimit": "Reducing returns is financially valuable under the stated no-additional-cost condition.",
    "scoringEmphasis": "Check full refunds, salvage recovery, production cost for every shipment, shipping on all orders and handling only on returns.",
    "weakAnswerFeedback": "If a learner treats returned sales as revenue, identify the full-refund condition and replace the sale with salvage value.",
    "numericChecks": [
      {
        "label": "Current contribution",
        "value": 288.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Improved contribution",
        "value": 308,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Improvement value",
        "value": 19.2,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report contribution in VND million to one decimal.",
    "nextCaseId": "CM-CALC-H08",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E07",
    "code": "E07",
    "title": "Pavo seasonal stock option",
    "difficulty": "expert",
    "family": "Inventory and uncertainty",
    "brief": "Pavo commits to 10,000 units before a season at VND 50,000 each. Low demand is 8,000 units with 40% probability; high demand is 12,000 with 60% probability. Price is VND 100,000 per sold unit; leftovers salvage for VND 20,000 each. Lost sales have no penalty beyond missed revenue. Pavo may pay a VND 12 million non -refundable reservation fee now for a surge supplier. If demand is high, the supplier can deliver 2,000 additional saleable units at VND 75,000 each plus a VND 20 million activation fee, paid only if used. Demand is known before activation; no surge units are bought in low demand.",
    "task": "Calculate expected contribution without and with the reservation, and the maximum reservation fee at which the option is as good as doing nothing.",
    "answerKey": "1. Without option: low = 8,000 × 100,000 + 2,000 × 20,000 − 10,000 × 50,000 = 340 million VND; high = 10,000 × 100,000 − 10,000 × 50,000 = 500 million VND. Expected = 40% × 340 million + 60% × 500 million = 436 million VND. 2. In high demand, activation adds 2,000 × (100,000 − 75,000) − 20 million = 30 million VND. Expected gross option benefit = 60% × 30 million = 18 million VND. 3. After 12 million VND reservation fee, option expected contribution = 442 million VND, or 6 million VND more. Maximum break-even reservation fee = 18 million VND.",
    "decisionAndLimit": "Reserve the surge option under the probabilities and no other capacity constraint; activation itself is worthwhile only in high demand.",
    "scoringEmphasis": "Check probability-weighted states, salvage only in low demand, two different option fees and timing of activation.",
    "weakAnswerFeedback": "If a learner subtracts the 20 million VND activation fee in both states, show that the supplier is used only when demand exceeds base stock. Foreign exchange and landed cost",
    "numericChecks": [
      {
        "label": "Expected contribution without option",
        "value": 436,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Gross option benefit",
        "value": 18,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Expected contribution after reservation fee",
        "value": 442,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even reservation fee",
        "value": 18,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Probability-weight state values; report fees and contribution in VND million.",
    "nextCaseId": "CM-CALC-E08",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H08",
    "code": "H08",
    "title": "Aster imported appliance margin",
    "difficulty": "hard",
    "family": "Foreign exchange and landed cost",
    "brief": "Aster imports and sells 10,000 small appliances. The invoice is USD 5 per unit. Exchange rate is VND 25,000 per USD; import duty is 10% of the converted invoice; domestic handling costs VND 10,000 per unit. Retail price is VND 200,000 per unit, and this batch needs VND 100 million of fixed marketing. All units sell. Compare the current rate with VND 26,000 per USD; other terms remain fixed.",
    "task": "Compute landed unit cost and batch contribution after marketing at both exchange rates. How much does a VND 1,000/USD weakening reduce contribution?",
    "answerKey": "1. At 25,000: invoice = VND 125,000; duty = VND 12,500; handling = VND 10,000. Landed cost = VND 147,500; batch contribution = 10,000 × (200,000 − 147,500) − 100 million = 425 million VND. 2. At 26,000: invoice = VND 130,000; duty = VND 13,000; handling = VND 10,000. Landed cost = VND 153,000; contribution = 370 million VND. 3. Difference = −55 million VND: VND 5,000 higher invoice plus VND 500 higher duty on each of 10,000 units.",
    "decisionAndLimit": "If the retail price is fixed, currency risk directly reduces margin; the model does not assume a supplier or customer repricing response.",
    "scoringEmphasis": "Check currency conversion before duty, handling only once and fixed marketing only once.",
    "weakAnswerFeedback": "If a learner increases invoice cost but not duty, point out that duty is charged on the converted invoice and changes with FX too.",
    "numericChecks": [
      {
        "label": "Landed unit cost at VND 25,000/USD",
        "value": 147500,
        "tolerance": 1,
        "unit": "VND per unit"
      },
      {
        "label": "Contribution at VND 25,000/USD",
        "value": 425,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Landed unit cost at VND 26,000/USD",
        "value": 153000,
        "tolerance": 1,
        "unit": "VND per unit"
      },
      {
        "label": "Contribution at VND 26,000/USD",
        "value": 370,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Contribution change",
        "value": -55,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report landed unit cost in VND and batch contribution in VND million.",
    "nextCaseId": "CM-CALC-H09",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E08",
    "code": "E08",
    "title": "Aster supplier comparison",
    "difficulty": "expert",
    "family": "Foreign exchange and landed cost",
    "brief": "Aster needs 9,504 saleable units. Supplier A charges USD 4.80 per purchased unit at VND 25,000/USD, plus 5% import duty on the converted invoice and VND 8,000 shipping per purchased unit. Four percent are defective. Supplier B is domestic at VND 132,000 plus VND 3,000 shipping per purchased unit, with 1% defective. Each defective unit can be salvaged for VND 20,000; saleable units require no further cost. For planning, use expected defect rates exactly: A purchases 9,900 units and B purchases 9,600, each yielding 9,504 good units. Ignore FX hedging and all other costs.",
    "task": "Compare net sourcing cost to deliver the same number of good units. Which supplier is cheaper? At what approximate VND/USD rate would Supplier A tie Supplier B, holding defect rates and all non-FX (foreign exchange) terms fixed?",
    "answerKey": "1. A purchased-unit invoice = 4.8 × 25,000 = VND 120,000; duty = VND 6,000; shipping = VND 8,000. Gross = 9,900 × 134,000 = 1,326.6 million VND; salvage = 396 × 20,000 = 7.92 million VND; net = 1,318.68 million VND. 2. B gross = 9,600 × (132,000 + 3,000) = 1,296 million VND; salvage = 96 × 20,000 = 1.92 million VND; net = 1,294.08 million VND. B is cheaper by 24.6 million VND. 3. Let x be VND per USD. Equality: 9,900 × (4.8 × x × 1.05 + 8,000) − 396 × 20,000 = 1,294,080,000. Solve x ≈ VND 24,507/USD.",
    "decisionAndLimit": "Choose B at VND 25,000/USD; Supplier A becomes cheaper below about VND 24,507/USD if every other assumption holds.",
    "scoringEmphasis": "Check equal good-unit volume, duty on converted invoice, defects, salvage offset and currency threshold.",
    "weakAnswerFeedback": "If a learner compares quoted unit prices only, show why higher defect rates require Aster to buy 300 more units from A. Production yield",
    "numericChecks": [
      {
        "label": "Supplier A net cost",
        "value": 1318.68,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Supplier B net cost",
        "value": 1294.08,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Supplier B cost advantage",
        "value": 24.6,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Tie exchange rate",
        "value": 24507,
        "tolerance": 2,
        "unit": "VND per USD"
      }
    ],
    "roundingRule": "Use expected purchase quantities exactly and report the tie exchange rate to the nearest VND/USD.",
    "nextCaseId": "CM-CALC-E09",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H09",
    "code": "H09",
    "title": "Pavo rework decision",
    "difficulty": "hard",
    "family": "Production yield",
    "brief": "Pavo processes 20,000 raw units costing VND 20,000 each. Ninety percent pass inspection and can be sold for VND 40,000 per good unit. The 2,000 failed units have no salvage value unless reworked. Reworking a failed unit costs VND 5,000 and makes 50% of reworked units saleable at the same price. Rework is available for all failed units with no capacity constraint.",
    "task": "Calculate contribution before and after rework, and the minimum rework recovery rate needed for rework to add contribution.",
    "answerKey": "1. Without rework: 18,000 × 40,000 revenue − 20,000 × 20,000 raw cost = 320 million VND. 2. Rework all 2,000 failures: 1,000 extra good units × 40,000 − 2,000 × 5,000 rework cost = 30 million VND increment; total = 350 million VND. 3. Per failed unit, expected incremental contribution = recovery rate × 40,000 − 5,000. Break-even recovery rate = 12.5%.",
    "decisionAndLimit": "Rework at a 50% recovery rate; raw input cost is common to both choices and should not be charged a second time.",
    "scoringEmphasis": "Check that rework cost applies to every attempted unit, while sale revenue applies only to recovered units.",
    "weakAnswerFeedback": "If a learner charges VND 5,000 only to the 1,000 recovered units, have them account for the 1,000 failed attempts too.",
    "numericChecks": [
      {
        "label": "Contribution before rework",
        "value": 320,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Contribution after rework",
        "value": 350,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even recovery rate",
        "value": 12.5,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Report the recovery threshold as a percentage to one decimal place.",
    "nextCaseId": "CM-CALC-H10",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E09",
    "code": "E09",
    "title": "Pavo finishing bottleneck",
    "difficulty": "expert",
    "family": "Production yield",
    "brief": "Pavo starts with 12,000 raw units at VND 25,000 each. Eighty percent pass the first inspection. Each good unit sells at VND 60,000 but needs VND 5,000 finishing. The 2,400 rejected units may be reworked at VND 8,000 per attempted unit; 75% of attempted units then become good and also need finishing. Rejected units have zero salvage. The finishing line can handle 10,050 good units without overtime. For a fixed VND 20 million, overtime raises capacity by 1,350 good units, to 11,400. Rework may be applied to only a chosen number of rejects. All saleable units sell.",
    "task": "Find the best contribution with no overtime and with overtime, including rework choices and the overtime fee. Should the firm buy overtime?",
    "answerKey": "1. Common first-pass contribution = 9,600 × (60,000 − 5,000) − 12,000 × 25,000 = 228 million VND. 2. Without overtime, 450 finishing slots remain. To recover 450 units at 75% yield, rework 600 rejects. Extra contribution = 450 × (60,000 − 5,000) − 600 × 8,000 = 19.95 million VND; total = 247.95 million VND. 3. With overtime, all 2,400 rejects can be reworked into 1,800 recovered good units, filling 11,400 total slots. Extra contribution = 1,800 × 55,000 − 2,400 × 8,000 − 20 million = 59.8 million VND; total = 287.8 million VND. 4. Overtime improves the optimized no-overtime result by 39.85 million VND.",
    "decisionAndLimit": "Buy overtime and rework every reject under the stated yields and demand; do not compare overtime to a no-rework baseline.",
    "scoringEmphasis": "Check finishing capacity, attempted versus recovered units, rework costs for all attempts, common raw cost and optimized baselines.",
    "weakAnswerFeedback": "If a learner reworks all 2,400 without overtime, explain that only 450 recovered units can be finished in the base capacity. Marketplace unit economics",
    "numericChecks": [
      {
        "label": "No-overtime rework attempts",
        "value": 600,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "No-overtime recovered units",
        "value": 450,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Overtime rework attempts",
        "value": 2400,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "Overtime recovered units",
        "value": 1800,
        "tolerance": 0,
        "unit": "units"
      },
      {
        "label": "First-pass contribution",
        "value": 228,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Best contribution without overtime",
        "value": 247.95,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Best contribution with overtime",
        "value": 287.8,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Overtime increment",
        "value": 39.85,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Use fractional expected yield only through the stated 75% rate; report contribution in VND million.",
    "nextCaseId": "CM-CALC-E10",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H10",
    "code": "H10",
    "title": "Vela buyer vouchers",
    "difficulty": "hard",
    "family": "Marketplace unit economics",
    "brief": "Vela processes 15,000 orders with a VND 200,000 average basket. It earns 12% commission on each order and pays VND 3,000 payment cost plus VND 5,000 servicing cost. Forty percent of orders receive a VND 10,000 voucher paid by Vela. A wider voucher program might raise volume to 17,000 orders, but 60% would then receive a voucher. All other rates and costs remain unchanged.",
    "task": "Compare contribution in the two scenarios and find the minimum whole-number orders needed for the wider program to match current contribution at a 60% voucher share.",
    "answerKey": "1. Commission per order = VND 24,000; contribution before voucher = 24,000 − 3,000 − 5,000 = VND 16,000. 2. Current = 15,000 × 16,000 − (15,000 × 40%) × 10,000 = 180 million VND. Wider program = 17,000 × 16,000 − (17,000 × 60%) × 10,000 = 170 million VND. 3. At 60% voucher share, average contribution/order = VND 10,000; 180 million ÷ 10,000 = 18,000 orders to match current.",
    "decisionAndLimit": "Do not widen at the forecast 17,000 orders on one-period contribution; the forecast is 1,000 orders below break-even.",
    "scoringEmphasis": "Check commission on basket value, voucher incidence rather than every order, and the average contribution threshold.",
    "weakAnswerFeedback": "If a learner applies the voucher to all orders, show that only 40% or 60% receive it in the relevant scenario.",
    "numericChecks": [
      {
        "label": "Current contribution",
        "value": 180,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Wider-program contribution",
        "value": 170,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even order volume",
        "value": 18000,
        "tolerance": 0,
        "unit": "orders"
      }
    ],
    "roundingRule": "Report the break-even volume as a whole number of orders.",
    "nextCaseId": "CM-CALC-H11",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E10",
    "code": "E10",
    "title": "Vela shipping subsidy",
    "difficulty": "expert",
    "family": "Marketplace unit economics",
    "brief": "Vela currently handles 20,000 orders at VND 180,000 average order value. It earns 10% commission and pays VND 2,000 processing plus VND 3,000 support per order. Customers pay their own shipping. A proposed free-shipping campaign would raise volume to 25,000 orders and average order value to VND 200,000. Vela would pay a VND 12,000 shipping subsidy on 50% of orders and VND 30 million fixed campaign spend. Processing and support costs per order stay unchanged; assume the forecast volume and basket can coexist.",
    "task": "Compare contribution before and after the campaign. At a fixed 50% subsidy share, how many whole campaign orders would be needed to match current contribution? At 25,000 orders, what is the maximum subsidy share that would match it?",
    "answerKey": "1. Current contribution/order = 10% × 180,000 − 2,000 − 3,000 = VND 13,000; total = 260 million VND. 2. Campaign contribution/order before subsidy = 10% × 200,000 − 2,000 − 3,000 = VND 15,000. Average subsidy = 50% × 12,000 = VND 6,000, so campaign contribution = 25,000 × 9,000 − 30 million = 195 million VND, down 65 million VND. 3. At 50% subsidy, equality volume = (260 million + 30 million) ÷ 9,000 ≈ 32,222.22, so at least 32,223 orders. 4. At 25,000 orders, required pre-fixed contribution/order is 290 million ÷ 25,000 = VND 11,600. Maximum average subsidy = 15,000 − 11,600 = VND 3,400; eligible share = 3,400 ÷ 12,000 = 28.33%.",
    "decisionAndLimit": "Do not launch at the current forecast solely for this period’s contribution; test a narrower eligibility rule or stronger order uplift.",
    "scoringEmphasis": "Check commission on new basket, subsidy incidence, fixed spend, volume threshold and eligibility threshold.",
    "weakAnswerFeedback": "If a learner focuses on 5,000 additional orders, show the VND 6,000 average subsidy and 30 million VND campaign spend. Store economics",
    "numericChecks": [
      {
        "label": "Current contribution",
        "value": 260,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Campaign contribution",
        "value": 195,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even order volume",
        "value": 32223,
        "tolerance": 0,
        "unit": "orders"
      },
      {
        "label": "Maximum subsidy share",
        "value": 28.33,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Round the minimum order threshold up to the next whole order; report subsidy share to two decimals.",
    "nextCaseId": "CM-CALC-E11",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H11",
    "code": "H11",
    "title": "Sora store payback",
    "difficulty": "hard",
    "family": "Store economics",
    "brief": "Sora would spend VND 600 million to open a kiosk. Expected monthly revenue is VND 350 million, variable costs are 60% of revenue, and fixed rent and payroll are VND 90 million per month. Ignore tax, depreciation, financing, inflation and end - of-life value. A downside case has revenue 10% below the forecast, with the same variable-cost ratio and fixed costs. Management requires payback within 12 months.",
    "task": "Calculate monthly operating cash contribution and simple payback in months for the base and downside cases. Round payback up to a full month.",
    "answerKey": "1. Base monthly contribution = 350 million × (1 − 60%) − 90 million = 50 million VND; 600 million ÷ 50 million = 12 months. 2. Downside revenue = 315 million; monthly contribution = 315 million × 40% − 90 million = 36 million VND. 3. Downside payback = 600 million ÷ 36 million ≈ 16.67, meaning 17 full months.",
    "decisionAndLimit": "Base payback meets a 12-month threshold exactly; downside does not. Simple payback ignores the time value of money.",
    "scoringEmphasis": "Check variable cost as a percentage of revenue, fixed cost each month and whole-month rounding.",
    "weakAnswerFeedback": "If a learner divides capex by revenue, show that only operating cash contribution can repay the investment.",
    "numericChecks": [
      {
        "label": "Base monthly contribution",
        "value": 50,
        "tolerance": 0.01,
        "unit": "VND million per month"
      },
      {
        "label": "Base payback",
        "value": 12,
        "tolerance": 0,
        "unit": "months"
      },
      {
        "label": "Downside monthly contribution",
        "value": 36,
        "tolerance": 0.01,
        "unit": "VND million per month"
      },
      {
        "label": "Downside payback",
        "value": 17,
        "tolerance": 0,
        "unit": "months"
      }
    ],
    "roundingRule": "Round simple payback up to the next full month (any fractional month counts as a full month).",
    "nextCaseId": "CM-CALC-H12",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E11",
    "code": "E11",
    "title": "Sora three-year investment",
    "difficulty": "expert",
    "family": "Discounted cash flow",
    "brief": "Sora considers a three-year kiosk rollout. At time 0 it pays VND 800 million capital expenditure and commits VND 100 million working capital. Incremental operating cash flows occur at each year-end: VND 350 million in year 1, VND 420 million in year 2, and VND 500 million in year 3. At the end of year 3 the equipment can be sold for VND 200 million and the VND 100 million working capital is fully released. Use a 10% annual discount rate; ignore tax and any cash flows after year 3.",
    "task": "Calculate NPV (net present value) in VND million and decide on a zero-NPV hurdle. Explain why the terminal receipts are included in year 3.",
    "answerKey": "1. Time-0 cash flow = −800 million − 100 million = −900 million VND. 2. Year-3 total cash flow = 500 million operating + 200 million resale + 100 million released working capital = 800 million VND. 3. NPV = −900 million + 350 million/1.10 + 420 million/1.10² + 800 million/1.10³ ≈ 366.34 million VND.",
    "decisionAndLimit": "Accept on the stated 10% discount and zero-NPV hurdle; test cash-flow forecasts and exit value before committing.",
    "scoringEmphasis": "Check time-0 working capital, year-end discount powers, year-3 release and terminal sale only once.",
    "weakAnswerFeedback": "If a learner omits the 100 million VND working-capital release, point to the end-of-project recovery rather than treating working capital as a permanent expense. Expected value and threshold",
    "numericChecks": [
      {
        "label": "Net present value",
        "value": 366.34,
        "tolerance": 0.05,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Report NPV in VND million to about two decimals; discount year-end cash flows with the correct powers.",
    "nextCaseId": "CM-CALC-E12",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-H12",
    "code": "H12",
    "title": "Rami market-entry risk",
    "difficulty": "hard",
    "family": "Expected value and threshold",
    "brief": "Rami can choose a sure contract generating VND 220 million contribution. A speculative launch generates VND 400 million if demand is high and VND 100 million if demand is low; management estimates a 40% high-demand probability. The launch requires a VND 30 million validation expense paid in either demand state. These amounts cover the same period and have no other differences.",
    "task": "Calculate the launch’s expected contribution after validation cost, choose on expected contribution, and find the minimum high-demand probability at which the launch equals the sure contract.",
    "answerKey": "1. Expected launch contribution = 40% × 400 million + 60% × 100 million − 30 million = 190 million VND. 2. Sure contract = 220 million VND, so the contract is higher by 30 million VND at a 40% high-demand probability. 3. At probability p, launch expected contribution = p × 400 million + (1 − p) × 100 million − 30 million = 70 million + 300 million × p. Equality with 220 million gives p = 50%.",
    "decisionAndLimit": "Choose the sure contract at the stated 40% probability under a risk-neutral expected-contribution rule; examine risk tolerance separately.",
    "scoringEmphasis": "Check probability weights sum to one, validation expense once and the threshold equation.",
    "weakAnswerFeedback": "If a learner takes the simple average of 400 million VND and 100 million VND, show why the outcomes need 40% and 60% weights.",
    "numericChecks": [
      {
        "label": "Launch expected contribution",
        "value": 190,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Sure-contract contribution",
        "value": 220,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even high-demand probability",
        "value": 50,
        "tolerance": 0.05,
        "unit": "percent"
      }
    ],
    "roundingRule": "Report the probability threshold as a percentage.",
    "nextCaseId": "CM-CALC-H01",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  },
  {
    "sourceCaseId": "CM-CALC-E12",
    "code": "E12",
    "title": "Rami pilot before rollout",
    "difficulty": "expert",
    "family": "Expected value and threshold",
    "brief": "Rami can launch nationally now: a high-demand market yields VND 600 million contribution and a low-demand market loses VND 200 million. Prior probability of high demand is 40%. Alternatively, Rami can run a pilot costing VND 40 million. The pilot gives a positive signal in 80% of high-demand markets and in 25% of low-demand markets. After observing the signal, Rami may launch only if doing so has positive expected contribution; otherwise it may decline with no additional payoff. Pilot and rollout profits refer to the same decision horizon. Assume risk neutrality and no delay cost.",
    "task": "Calculate expected value from launching now, the optimal action after each pilot signal, expected value of the pilot strategy, and the maximum pilot cost that makes it at least as good as launching now.",
    "answerKey": "1. Launch now = 40% × 600 million + 60% × (−200 million) = 120 million VND. 2. Positive signal probability = 0.4 × 0.8 + 0.6 × 0.25 = 0.47. High-and-positive probability = 0.32; low-and-positive = 0.15. Positive-signal unconditional launch payoff = 0.32 × 600 million + 0.15 × (−200 million) = 162 million VND, or 344.68 million VND conditional on a positive signal. Launch after positive. 3. Negative-signal unconditional launch payoff = 0.08 × 600 million + 0.45 × (−200 million) = −42 million VND, so decline after negative. Pilot strategy = 162 million VND − 40 million pilot cost = 122 million VND. 4. Pilot is 2 million VND better than launching now. Break-even pilot cost = 162 million − 120 million = 42 million VND.",
    "decisionAndLimit": "Choose the pilot narrowly on expected value; the 2 million VND edge is sensitive to signal accuracy, timing and the assumed demand outcomes.",
    "scoringEmphasis": "Check joint probabilities rather than averaging signals, conditional decisions after each signal, pilot cost once and comparison with immediate launch.",
    "weakAnswerFeedback": "If a learner launches after a negative signal, show that those state-weighted launch payoffs sum to −42 million VND before any pilot cost.",
    "numericChecks": [
      {
        "label": "Launch-now expected value",
        "value": 120,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Positive-signal launch payoff",
        "value": 162,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Conditional positive-signal payoff",
        "value": 344.68,
        "tolerance": 0.05,
        "unit": "VND million"
      },
      {
        "label": "Negative-signal launch payoff",
        "value": -42,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Pilot-strategy expected value",
        "value": 122,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Pilot advantage",
        "value": 2,
        "tolerance": 0.01,
        "unit": "VND million"
      },
      {
        "label": "Break-even pilot cost",
        "value": 42,
        "tolerance": 0.01,
        "unit": "VND million"
      }
    ],
    "roundingRule": "Use joint probabilities; report expected values and the break-even pilot cost in VND million.",
    "nextCaseId": "CM-CALC-E01",
    "answerFields": [
      {
        "key": "inputs",
        "label": "Inputs and formula",
        "help": "Identify the case inputs and write the model or formula you will use."
      },
      {
        "key": "working",
        "label": "Calculation steps",
        "help": "Show each arithmetic step so Mate can identify the first divergence."
      },
      {
        "key": "finalResults",
        "label": "Final results with units",
        "help": "Answer every requested numerical output and label its unit."
      },
      {
        "key": "interpretation",
        "label": "Decision, assumption and limit",
        "help": "State the recommendation, the assumption it depends on, and the stated limit."
      }
    ]
  }
];
export const CALCULATION_CYCLE_1_CASES_JSON = JSON.stringify(CALCULATION_CYCLE_1_CASES);

export const CALCULATION_BANK_RUBRIC = [
  { criterion: 'Model and formula', points: 20, description: 'Selects the right commercial model and formula.' },
  { criterion: 'Arithmetic and sequence', points: 30, description: 'Carries the arithmetic correctly and in a traceable order.' },
  { criterion: 'Units and boundaries', points: 20, description: 'Uses the right units, time boundary, threshold, and rounding.' },
  { criterion: 'Commercial interpretation', points: 20, description: 'States the decision and the assumption or limit that governs it.' },
  { criterion: 'Traceability', points: 10, description: 'Shows enough intermediate work to locate the first divergent step.' },
];

export const CALCULATION_CYCLE_1_QUESTIONS: LibraryQuestion[] = CALCULATION_CYCLE_1_CASES.map((item) => ({
  id: item.sourceCaseId,
  sourceCaseId: item.sourceCaseId,
  contentVersion: 'calculations-cycle-1-v1',
  skill: 'calculations',
  difficulty: item.difficulty,
  title: item.title,
  industry: 'Cross-industry commercial calculations',
  businessProblem: item.family,
  drillType: item.family,
  primarySkill: 'Commercial formula selection, multi-step arithmetic, units, assumptions, and business decision',
  businessContext: item.brief,
  clientObjective: item.task,
  instruction: 'No chart is required. Show the model, each arithmetic step, every final result with units, and the decision with its limiting assumption.',
  question: item.task,
  answerMode: 'text',
  answerFormat: 'structured-expert',
  structuredAnswer: true,
  calculationRequired: true,
  evidenceRequired: 0,
  estimatedMinutes: item.difficulty === 'hard' ? 10 : 14,
  status: 'draft-pending-review',
  reviewStatus: 'Draft',
  correctAnswer: `${item.answerKey}

Decision and limit: ${item.decisionAndLimit}`,
  explanation: item.weakAnswerFeedback,
  modelAnswerSections: {
    calculation: item.answerKey,
    keyInsight: item.decisionAndLimit,
    supportingEvidence: item.scoringEmphasis,
    businessImplication: item.decisionAndLimit,
    recommendedAction: item.decisionAndLimit,
  },
  scoringRubric: CALCULATION_BANK_RUBRIC,
  personalizedFeedbackTemplate: item.weakAnswerFeedback,
  alternativeConclusions: ['Accept a coherent alternative method when it reaches equivalent values, uses the correct units and boundaries, and supports the same conditional business decision.'],
  commonMistake: item.weakAnswerFeedback,
  commonMistakes: [item.weakAnswerFeedback],
  learningObjective: item.scoringEmphasis,
  numericalValidation: item.numericChecks.map((check) => `${check.label} = ${check.value} ${check.unit} (tolerance ${check.tolerance})`),
  recommendedNextDrillId: item.nextCaseId,
  calculationAnswerFields: item.answerFields,
  calculationNumericChecks: item.numericChecks,
  roundingRule: item.roundingRule,
  weakAnswerFeedback: item.weakAnswerFeedback,
  exhibits: [],
}));

export function calculationCaseById(sourceCaseId: string | null | undefined): CalculationBankCase | null {
  return CALCULATION_CYCLE_1_CASES.find((item) => item.sourceCaseId === sourceCaseId) || null;
}

export function calculationCaseChecks(item: CalculationBankCase): CalculationScoringCheck[] {
  return item.numericChecks.map((check) => ({ label: check.label, value: check.value, tolerance: check.tolerance, unit: check.unit }));
}

/** Everything the learner can read in the case: the numbers they are allowed to use. */
export function calculationCaseText(item: CalculationBankCase): string {
  return `${item.brief}\n${item.task}`;
}

export function formatCalculationExpected(check: CalculationNumericCheck): string {
  const value = check.value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return /percent/i.test(check.unit) ? `${value}%` : `${value} ${check.unit}`.trim();
}

function toneForStatus(status: string): CalculationWorkedItem['tone'] {
  return status === 'exact' || status === 'close' || status === 'carried' ? 'good' : 'warn';
}

/** One entry per requested result, each carrying its own formula and plain-English steps. */
export function calculationWorkedItems(
  item: CalculationBankCase,
  outcome?: CalculationScoreOutcome | null,
): { items: CalculationWorkedItem[]; decision: string } {
  const worked = calculationWorkedAnswerFor(item.sourceCaseId);
  const items = item.numericChecks.map((check, index): CalculationWorkedItem => {
    const result = worked?.results[index];
    const assessment = outcome?.results[index];
    return {
      id: `final-${index + 1}`,
      label: check.label,
      answer: formatCalculationExpected(check),
      formula: result?.formula || '',
      steps: result?.steps || [],
      learnerValue: assessment
        ? (assessment.learnerValue === null
          ? 'No number entered'
          : formatCalculationExpected({ ...check, value: Number(assessment.learnerValue.toFixed(4)) }))
        : undefined,
      note: assessment ? assessment.note : undefined,
      tone: assessment ? toneForStatus(assessment.status) : undefined,
    };
  });
  return { items, decision: worked?.decision || item.decisionAndLimit };
}

function feedbackFromOutcome(item: CalculationBankCase, outcome: CalculationScoreOutcome): CalculationFeedback {
  const firstOff = outcome.results.find((result) => result.status !== 'exact' && result.status !== 'close');
  const revisions = outcome.usesCaseNumbers
    ? [
      firstOff ? `Repair ${firstOff.label} first and carry that correction through the later steps.` : 'Keep the checked arithmetic and tighten the written assumption.',
      item.weakAnswerFeedback,
    ]
    : ['Start from the figures in the case brief and build the first formula from them.', item.roundingRule];
  return {
    scoring: { rubricId: 'calculations-cycle-1-v1', scale: 10, overallScore: outcome.overallScore, criteria: outcome.criteria },
    summary: outcome.summary,
    firstDecisiveError: outcome.firstDivergence,
    revisions: revisions.slice(0, 2),
    nextCaseId: item.nextCaseId,
    outcome,
  };
}

export function scoreCalculationSubmission(item: CalculationBankCase, submission: CalculationSubmission): CalculationFeedback {
  const outcome = scoreCalculationAttempt({
    caseText: calculationCaseText(item),
    checks: calculationCaseChecks(item),
    attempt: calculationAttemptFromPayload(submission),
    roundingRule: item.roundingRule,
    decisionAndLimit: item.decisionAndLimit,
  });
  return feedbackFromOutcome(item, outcome);
}

/** Re-mark a saved Case Pool answer (serialized text) with the current rules. */
export function scoreSerializedCalculationAnswer(item: CalculationBankCase, serialized: string): CalculationFeedback {
  const outcome = scoreCalculationAttempt({
    caseText: calculationCaseText(item),
    checks: calculationCaseChecks(item),
    attempt: attemptFromSerializedAnswer(serialized),
    roundingRule: item.roundingRule,
    decisionAndLimit: item.decisionAndLimit,
  });
  return feedbackFromOutcome(item, outcome);
}
