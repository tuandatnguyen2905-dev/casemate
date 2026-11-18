/**
 * calculationWorkedAnswers.ts - plain-English worked answers for the 24 "Calculations" bank cases.
 *
 * Each entry is index-aligned with the case's numericChecks, so every requested result
 * keeps its own formula and step-by-step explanation together. Shown only after submission.
 */

export interface CalculationWorkedResult {
  /** Formula with the case's own numbers, ending in the result. */
  formula: string;
  /** Plain, everyday-English steps for reaching this one result. */
  steps: string[];
}

export interface CalculationWorkedAnswer {
  results: CalculationWorkedResult[];
  /** The decision the numbers support, and the limit that governs it. */
  decision: string;
}

/** One result as the Worked answer block displays it. */
export interface CalculationWorkedItem {
  id: string;
  label: string;
  /** The worked number, already formatted with its unit. */
  answer: string;
  /** Formula shown directly under the number. */
  formula: string;
  steps: string[];
  /** Filled in after submission so the learner's own number sits beside the worked one. */
  learnerValue?: string;
  note?: string;
  tone?: 'good' | 'warn' | 'neutral';
}

export const CALCULATION_WORKED_ANSWERS: Record<string, CalculationWorkedAnswer> = {
  "CM-CALC-H01": {
    decision: `Proceed on this one-month test: the proposal earns VND 853 million against VND 800 million today, so it is VND 53 million better. The answer only holds if 19,000 packs and the VND 63,000 cost per pack turn out to be realistic, so check those two before committing.`,
    results: [
      { formula: `20,000 × (100,000 − 60,000) = 800,000,000`, steps: [
        `Start with what one pack earns after its own cost: 100,000 − 60,000 = VND 40,000 per pack.`,
        `Multiply by the 20,000 packs sold each month: 20,000 × 40,000 = VND 800,000,000, which is VND 800 million.`,
      ] },
      { formula: `19,000 × (110,000 − 63,000) − 40,000,000 = 853,000,000`, steps: [
        `Under the new price, one pack earns 110,000 − 63,000 = VND 47,000.`,
        `Multiply by the 19,000 packs now expected: 19,000 × 47,000 = VND 893,000,000.`,
        `The campaign is a one-time cost this month, so take it off once: 893,000,000 − 40,000,000 = VND 853,000,000, which is VND 853 million.`,
      ] },
      { formula: `(800,000,000 + 40,000,000) ÷ 47,000 = 17,872.34, rounded up to 17,873`, steps: [
        `To match today's VND 800 million after paying for the campaign, the new price must first earn 800 million + 40 million = VND 840 million.`,
        `Each pack earns VND 47,000, so divide: 840,000,000 ÷ 47,000 = 17,872.34 packs.`,
        `You cannot sell part of a pack and you must at least match the baseline, so round up to 17,873 packs.`,
      ] },
    ],
  },
  "CM-CALC-E01": {
    decision: `Launch: after the lost sales of the old product and the VND 180 million launch spend, the new product still adds about VND 70 million a month. Before relying on it, check the 20% substitution rate and the 40/60 channel mix, because both drive the answer.`,
    results: [
      { formula: `4,000 × (120,000 − 70,000 − 10,000) + 6,000 × (100,000 − 70,000 − 10,000) − 10,000 × 20% × 15,000 − 180,000,000 = 70,000,000`, steps: [
        `Direct sales: each unit earns 120,000 − 70,000 − 10,000 = VND 40,000, so 4,000 units earn VND 160 million.`,
        `Retail: each unit earns 100,000 − 70,000 − 10,000 = VND 20,000, so 6,000 units earn VND 120 million.`,
        `Cannibalization: 20% of the 10,000 units, which is 2,000 units, would have been the old product at VND 15,000 each, so VND 30 million is lost.`,
        `Add the gains and take off the losses and the launch spend: 160 + 120 − 30 − 180 = VND 70 million.`,
      ] },
      { formula: `180,000,000 ÷ (40% × 40,000 + 60% × 20,000 − 20% × 15,000) = 7,200`, steps: [
        `Work out what an average new unit really adds. Direct is 40% of units at VND 40,000 = 16,000; retail is 60% at VND 20,000 = 12,000.`,
        `Each new unit also takes a sale from the old product 20% of the time: 20% × 15,000 = VND 3,000 lost.`,
        `Average gain per unit = 16,000 + 12,000 − 3,000 = VND 25,000.`,
        `Divide the launch spend by that: 180,000,000 ÷ 25,000 = 7,200 units.`,
      ] },
      { formula: `(280,000,000 − 180,000,000) ÷ (10,000 × 15,000) = 0.6667 = 66.67%`, steps: [
        `At 10,000 units, before any cannibalization, the two channels earn 160 + 120 = VND 280 million.`,
        `Take off the launch spend of VND 180 million: VND 100 million is the most the lost old-product sales could cost before the launch just breaks even.`,
        `If every one of the 10,000 new units took a sale from the old product, the loss would be 10,000 × 15,000 = VND 150 million.`,
        `So the break-even share is 100 ÷ 150 = 0.6667, which is 66.67%.`,
      ] },
    ],
  },
  "CM-CALC-H02": {
    decision: `Do not run it at the forecast of 12,500 bottles if the only test is this period's contribution: it falls from VND 400 million to VND 335 million. Only run it if you can show a longer-term benefit worth at least VND 65 million, or if you can reach about 14,667 bottles.`,
    results: [
      { formula: `10,000 × (100,000 − 60,000) = 400,000,000`, steps: [
        `Each bottle earns 100,000 − 60,000 = VND 40,000.`,
        `Multiply by the 10,000 bottles normally sold: 10,000 × 40,000 = VND 400,000,000, which is VND 400 million.`,
      ] },
      { formula: `12,500 × (90,000 − 60,000) − 40,000,000 = 335,000,000`, steps: [
        `With the VND 10,000 discount the price is 90,000, so each bottle earns 90,000 − 60,000 = VND 30,000.`,
        `Multiply by the 12,500 bottles expected: 12,500 × 30,000 = VND 375,000,000.`,
        `Take off the VND 40 million cost of running the promotion: 375,000,000 − 40,000,000 = VND 335,000,000, which is VND 335 million. That is VND 65 million below the baseline.`,
      ] },
      { formula: `(400,000,000 + 40,000,000) ÷ 30,000 = 14,666.67, rounded up to 14,667`, steps: [
        `To break even the promotion must earn the baseline VND 400 million plus the VND 40 million it costs to run: VND 440 million.`,
        `Each discounted bottle earns VND 30,000, so 440,000,000 ÷ 30,000 = 14,666.67 bottles.`,
        `Whole bottles only, and we must at least match the baseline, so round up to 14,667.`,
      ] },
    ],
  },
  "CM-CALC-E02": {
    decision: `Run the coupon under Treo's estimate that 60% of redeemers are genuinely new buyers, because that is above the 54.17% break-even share. The gain is thin, so check the 60% with a control group before rolling it out.`,
    results: [
      { formula: `30,000 × (100,000 − 60,000) = 1,200,000,000`, steps: [
        `Each bag earns 100,000 − 60,000 = VND 40,000.`,
        `Multiply by the 30,000 bags sold normally: 30,000 × 40,000 = VND 1,200,000,000, which is VND 1,200 million.`,
      ] },
      { formula: `(30,000 − 12,000 × 40%) × 40,000 + 12,000 × (100,000 − 15,000 − 60,000) − 80,000,000 = 1,228,000,000`, steps: [
        `Of the 12,000 coupon buyers, 40% would have bought at full price anyway: 12,000 × 40% = 4,800 people. So full-price buyers fall to 30,000 − 4,800 = 25,200.`,
        `Those 25,200 still earn VND 40,000 each: 25,200 × 40,000 = VND 1,008 million.`,
        `A coupon buyer pays 100,000 − 15,000 = 85,000 and the bag costs 60,000, so each earns VND 25,000. Then 12,000 × 25,000 = VND 300 million.`,
        `Add them and take off the VND 80 million coupon administration: 1,008 + 300 − 80 = VND 1,228 million. That is VND 28 million above the baseline.`,
      ] },
      { formula: `260,000,000 ÷ 480,000,000 = 0.5417 = 54.17%`, steps: [
        `Let s be the share of the 12,000 redemptions that are genuinely new buyers.`,
        `Compared with baseline, the coupon buyers add 12,000 × 25,000 = VND 300 million, but the (1 − s) share who would have paid full price each lose VND 40,000 of margin, and the campaign costs VND 80 million.`,
        `Change versus baseline = 300 − 480 × (1 − s) − 80 = 480 × s − 260 (in VND million).`,
        `Set this to zero for break-even: s = 260 ÷ 480 = 0.5417, which is 54.17%.`,
      ] },
    ],
  },
  "CM-CALC-H03": {
    decision: `Today each buyer costs VND 80,000. If the redesign lifts registrations from 20% to 25%, the model shows 500 buyers for the same spend, so VND 64,000 per buyer. That is only a model: it does not prove the redesign will really reach 25%, so it should be tested.`,
    results: [
      { formula: `500,000 × 5% × 20% × 8% = 400`, steps: [
        `Impressions to visitors: 500,000 × 5% = 25,000 people click.`,
        `Visitors to registrations: 25,000 × 20% = 5,000 people register.`,
        `Registrations to buyers: 5,000 × 8% = 400 buyers.`,
      ] },
      { formula: `32,000,000 ÷ 400 = 80,000`, steps: [
        `Customer acquisition cost is spend divided by buyers.`,
        `VND 32,000,000 ÷ 400 buyers = VND 80,000 per buyer.`,
      ] },
      { formula: `500,000 × 5% × 25% × 8% = 500`, steps: [
        `Clicks stay at 25,000 because the ad spend is unchanged.`,
        `With the redesign, registrations are 25,000 × 25% = 6,250.`,
        `Buyers are 6,250 × 8% = 500.`,
      ] },
      { formula: `32,000,000 ÷ 500 = 64,000`, steps: [
        `The spend is still VND 32,000,000.`,
        `Divide by the new 500 buyers: 32,000,000 ÷ 500 = VND 64,000 per buyer.`,
      ] },
    ],
  },
  "CM-CALC-E03": {
    decision: `Move the VND 10 million from Channel B to Channel A: on the stated assumptions total contribution rises from VND 60.8 million to VND 65.6 million. Because the assumption is that conversion stays the same as spend grows, test A's marginal results before moving more money.`,
    results: [
      { formula: `30,000 × 20% × 10% × 180,000 − 60,000,000 = 48,000,000`, steps: [
        `Clicks to registrations: 30,000 × 20% = 6,000.`,
        `Registrations to buyers: 6,000 × 10% = 600 buyers.`,
        `Each buyer contributes VND 180,000, so 600 × 180,000 = VND 108 million before ad spend.`,
        `Take off the VND 60 million ad spend: 108 − 60 = VND 48 million.`,
      ] },
      { formula: `20,000 × 15% × 8% × 220,000 − 40,000,000 = 12,800,000`, steps: [
        `Clicks to registrations: 20,000 × 15% = 3,000.`,
        `Registrations to buyers: 3,000 × 8% = 240 buyers.`,
        `Each buyer contributes VND 220,000, so 240 × 220,000 = VND 52.8 million.`,
        `Take off the VND 40 million ad spend: 52.8 − 40 = VND 12.8 million.`,
      ] },
      { formula: `48,000,000 + 12,800,000 = 60,800,000`, steps: [
        `Add the two channels together after their own ad spend: 48 + 12.8 = VND 60.8 million.`,
      ] },
      { formula: `100 × 180,000 − 60 × 220,000 = 4,800,000`, steps: [
        `Channel A gets VND 10 million more. Clicks per dong stay constant: 30,000 clicks for VND 60 million, so VND 10 million buys 5,000 more clicks.`,
        `5,000 clicks × 20% × 10% = 100 more A buyers, worth 100 × 180,000 = VND 18 million.`,
        `Channel B loses VND 10 million, which is 5,000 fewer clicks (20,000 clicks for VND 40 million). 5,000 × 15% × 8% = 60 fewer B buyers, costing 60 × 220,000 = VND 13.2 million.`,
        `Total ad spend does not change, so the gain is just 18 − 13.2 = VND 4.8 million.`,
      ] },
      { formula: `60,800,000 + 4,800,000 = 65,600,000`, steps: [
        `Start from today's total of VND 60.8 million.`,
        `Add the VND 4.8 million gain from moving the budget: 60.8 + 4.8 = VND 65.6 million.`,
      ] },
    ],
  },
  "CM-CALC-H04": {
    decision: `The cohort stays profitable over three months: about VND 343 million after acquisition and platform costs. That only covers three months with a constant 15% churn at each month end, so it does not prove the cohort is profitable over its whole life.`,
    results: [
      { formula: `2,000 + 2,000 × 85% + 2,000 × 85% × 85% = 5,145`, steps: [
        `Churn happens at the end of each billed month, so everyone is billed in month 1: 2,000 subscribers.`,
        `Month 2: 15% left, so 85% remain: 2,000 × 85% = 1,700 subscribers.`,
        `Month 3: 1,700 × 85% = 1,445 subscribers.`,
        `Add the billed months together: 2,000 + 1,700 + 1,445 = 5,145 subscriber-months.`,
      ] },
      { formula: `5,145 × (120,000 − 30,000) − 60,000,000 − 3 × 20,000,000 = 343,050,000`, steps: [
        `Each billed subscriber-month earns 120,000 − 30,000 = VND 90,000.`,
        `5,145 × 90,000 = VND 463,050,000.`,
        `Take off the one-time acquisition cost of VND 60 million and three months of platform cost, 3 × 20 = VND 60 million.`,
        `463.05 − 60 − 60 = VND 343.05 million.`,
      ] },
    ],
  },
  "CM-CALC-E04": {
    decision: `Raise the price on a three-month view: the higher price earns about VND 845 million against VND 793 million, an advantage of VND 52 million, and it still wins as long as monthly retention stays above about 69.69%. Check that the retention drop does not get worse after month 3 or in particular customer segments.`,
    results: [
      { formula: `5,000 × (1 + 0.8 + 0.8 × 0.8) × (100,000 − 35,000) = 793,000,000`, steps: [
        `Everyone is billed in month 1. Then 80% stay each month, so month 2 is 0.8 and month 3 is 0.8 × 0.8 = 0.64 of the cohort.`,
        `Billed months per subscriber = 1 + 0.8 + 0.64 = 2.44, so 5,000 × 2.44 = 12,200 subscriber-months.`,
        `Each earns 100,000 − 35,000 = VND 65,000, so 12,200 × 65,000 = VND 793 million.`,
      ] },
      { formula: `5,000 × (1 + 0.75 + 0.75 × 0.75) = 11,562.5`, steps: [
        `At the new price retention starts falling to 75% after month 1: month 2 is 0.75 and month 3 is 0.75 × 0.75 = 0.5625.`,
        `Billed months per subscriber = 1 + 0.75 + 0.5625 = 2.3125.`,
        `5,000 × 2.3125 = 11,562.5 subscriber-months (an expected figure, so a half is fine).`,
      ] },
      { formula: `11,562.5 × (115,000 − 35,000) − 80,000,000 = 845,000,000`, steps: [
        `Each subscriber-month now earns 115,000 − 35,000 = VND 80,000.`,
        `11,562.5 × 80,000 = VND 925 million.`,
        `Take off the VND 80 million one-time communication cost: 925 − 80 = VND 845 million.`,
      ] },
      { formula: `845,000,000 − 793,000,000 = 52,000,000`, steps: [
        `Subtract the baseline from the proposal: 845 − 793 = VND 52 million in favour of the new price.`,
      ] },
      { formula: `(−1 + √(1 + 4 × 1.1825)) ÷ 2 = 0.6969 = 69.69%`, steps: [
        `Let r be the new monthly retention. Contribution = 5,000 × 80,000 × (1 + r + r²) − 80,000,000.`,
        `Set it equal to the baseline VND 793 million: 400,000,000 × (1 + r + r²) = 873,000,000, so 1 + r + r² = 2.1825.`,
        `Rearranged, r² + r − 1.1825 = 0.`,
        `Solving this gives r = 0.6969, so retention must stay above 69.69%.`,
      ] },
    ],
  },
  "CM-CALC-H05": {
    decision: `Shift the 1,000 units: it adds a net VND 5 million after the marketing. This relies on direct demand really absorbing 1,000 more units without taking sales from other direct customers.`,
    results: [
      { formula: `6,000 × (120,000 − 70,000 − 10,000) + 4,000 × (95,000 − 70,000 − 5,000) = 320,000,000`, steps: [
        `Direct: each unit earns 120,000 − 70,000 − 10,000 = VND 40,000, so 6,000 units earn VND 240 million.`,
        `Retail: each unit earns 95,000 − 70,000 − 5,000 = VND 20,000, so 4,000 units earn VND 80 million.`,
        `Add them: 240 + 80 = VND 320 million.`,
      ] },
      { formula: `1,000 × (40,000 − 20,000) = 20,000,000`, steps: [
        `Moving a unit from retail to direct changes what it earns from VND 20,000 to VND 40,000, a gain of VND 20,000.`,
        `For 1,000 units: 1,000 × 20,000 = VND 20 million before the extra marketing.`,
      ] },
      { formula: `20,000,000 − 15,000,000 = 5,000,000`, steps: [
        `Take the extra direct marketing of VND 15 million off the gain: 20 − 15 = VND 5 million net.`,
      ] },
    ],
  },
  "CM-CALC-E05": {
    decision: `Go with the proposal: modelled contribution is about VND 315.8 million against VND 143.9 million for all-retail, VND 171.9 million better. Check that the same 14,000 shipments can really be sold at the assumed direct and retail prices and return rates.`,
    results: [
      { formula: `(5,400 × 70,000 − 6,000 × 10,000 − 600 × 5,000) + (7,600 × 20,000 − 8,000 × 5,000 − 400 × 3,000) − 60,000,000 − 50,000,000 = 315,800,000`, steps: [
        `Direct: 10% of 6,000 shipments come back, which is 600, so 5,400 are kept. Each kept unit earns 140,000 − 70,000 = VND 70,000, giving 5,400 × 70,000 = VND 378 million.`,
        `Direct costs on every shipment and return: shipping 6,000 × 10,000 = VND 60 million and return handling 600 × 5,000 = VND 3 million. Direct earns 378 − 60 − 3 = VND 315 million before its fixed cost.`,
        `Retail: 5% of 8,000 come back (400), so 7,600 are kept. Each kept unit earns 95,000 − 70,000 − 5,000 = VND 20,000, so VND 152 million. Take off distribution 8,000 × 5,000 = VND 40 million and returns 400 × 3,000 = VND 1.2 million: VND 110.8 million before onboarding.`,
        `Add direct and retail and take off the fixed costs of VND 60 million (direct platform) and VND 50 million (retail onboarding): 315 + 110.8 − 60 − 50 = VND 315.8 million.`,
      ] },
      { formula: `13,300 × 20,000 − 14,000 × 5,000 − 700 × 3,000 − 50,000,000 = 143,900,000`, steps: [
        `All 14,000 go through retail, and 5% come back: 700 returns, so 13,300 are kept.`,
        `Each kept unit earns VND 20,000, so 13,300 × 20,000 = VND 266 million.`,
        `Take off distribution 14,000 × 5,000 = VND 70 million, return handling 700 × 3,000 = VND 2.1 million, and the VND 50 million onboarding.`,
        `266 − 70 − 2.1 − 50 = VND 143.9 million.`,
      ] },
      { formula: `315,800,000 − 143,900,000 = 171,900,000`, steps: [
        `Subtract the all-retail result from the proposal: 315.8 − 143.9 = VND 171.9 million in favour of the proposal.`,
      ] },
    ],
  },
  "CM-CALC-H06": {
    decision: `Accepting the contract costs VND 1.1 million of contribution every week, so only accept it if it brings at least that much extra benefit elsewhere.`,
    results: [
      { formula: `(1,000 − 800 × 1) ÷ 2 = 100`, steps: [
        `Compare what each machine hour earns: Product A earns 50,000 ÷ 2 = VND 25,000 per hour; Product B earns VND 36,000 per hour. B is better, so fill B first.`,
        `B demand is capped at 800 units, which uses 800 × 1 = 800 hours.`,
        `The 200 hours left go to A at 2 hours a unit: 200 ÷ 2 = 100 units of A.`,
      ] },
      { formula: `min(800 demand, 1,000 hours ÷ 1) = 800`, steps: [
        `Product B is the better use of an hour, so make as much as demand allows: 800 units.`,
        `That uses 800 of the 1,000 hours, so it fits.`,
      ] },
      { formula: `Contract minimum = 150 units of A`, steps: [
        `The contract forces at least 150 units of A. Making more than that earns less per hour than B, so make exactly 150.`,
      ] },
      { formula: `(1,000 − 150 × 2) ÷ 1 = 700`, steps: [
        `150 units of A use 150 × 2 = 300 hours.`,
        `The remaining 1,000 − 300 = 700 hours go to B at 1 hour a unit: 700 units.`,
      ] },
      { formula: `100 × 50,000 + 800 × 36,000 = 33,800,000`, steps: [
        `Product A: 100 × 50,000 = VND 5 million.`,
        `Product B: 800 × 36,000 = VND 28.8 million.`,
        `Total: 5 + 28.8 = VND 33.8 million.`,
      ] },
      { formula: `150 × 50,000 + 700 × 36,000 = 32,700,000`, steps: [
        `Product A: 150 × 50,000 = VND 7.5 million.`,
        `Product B: 700 × 36,000 = VND 25.2 million.`,
        `Total: 7.5 + 25.2 = VND 32.7 million.`,
      ] },
      { formula: `33,800,000 − 32,700,000 = 1,100,000`, steps: [
        `The cost of the contract is what you give up: 33.8 − 32.7 = VND 1.1 million per week.`,
      ] },
    ],
  },
  "CM-CALC-E06": {
    decision: `Rent the machine hours: after the VND 1.2 million fee, weekly contribution rises from VND 36 million to VND 36.6 million. Check that both demand caps of 400 units still hold and that each of the 60 hours is really worth VND 30,000.`,
    results: [
      { formula: `B = (2 × 900 − 900) ÷ 3 = 300, A = 900 − 2 × 300 = 300`, steps: [
        `Both resources are used up, so write two equations: machine hours 2A + B = 900 and labor hours A + 2B = 900.`,
        `Double the labor equation: 2A + 4B = 1,800. Subtract the machine equation: 3B = 900, so B = 300.`,
        `Put B back into the machine equation: 2A + 300 = 900, so A = 300.`,
        `Both are below the demand cap of 400, so this works.`,
      ] },
      { formula: `B = 300 (from 2A + B = 900 and A + 2B = 900)`, steps: [
        `From the same two equations, doubling the labor equation and subtracting the machine equation gives 3B = 900.`,
        `So B = 300 units.`,
      ] },
      { formula: `300 × 70,000 + 300 × 50,000 = 36,000,000`, steps: [
        `Product A: 300 × 70,000 = VND 21 million.`,
        `Product B: 300 × 50,000 = VND 15 million.`,
        `Total: 21 + 15 = VND 36 million.`,
      ] },
      { formula: `A = (2 × 960 − 900) ÷ 3 = 340`, steps: [
        `With 960 machine hours the equations are 2A + B = 960 and A + 2B = 900.`,
        `Double the labor equation (2A + 4B = 1,800) and subtract the machine equation: 3B = 840, so B = 280.`,
        `Put B back into the machine equation: 2A + 280 = 960, so A = 340. (Equivalently A = (2 × 960 − 900) ÷ 3 = 340.)`,
      ] },
      { formula: `B = 960 − 2 × 340 = 280`, steps: [
        `From the machine equation 2A + B = 960 with A = 340: B = 960 − 680 = 280 units.`,
        `Check labor: 340 + 2 × 280 = 900 hours, which fits. Both numbers are below the demand cap of 400.`,
      ] },
      { formula: `340 × 70,000 + 280 × 50,000 − 1,200,000 = 36,600,000`, steps: [
        `Product A: 340 × 70,000 = VND 23.8 million. Product B: 280 × 50,000 = VND 14 million.`,
        `Before the fee: 23.8 + 14 = VND 37.8 million.`,
        `Take off the VND 1.2 million rental fee: 37.8 − 1.2 = VND 36.6 million.`,
      ] },
      { formula: `36,600,000 − 36,000,000 = 600,000`, steps: [
        `Subtract the old result from the new one after the fee: 36.6 − 36 = VND 0.6 million more.`,
        `Gross, the extra hours earn 37.8 − 36 = VND 1.8 million, which is VND 30,000 for each of the 60 hours.`,
      ] },
    ],
  },
  "CM-CALC-H07": {
    decision: `Cutting returns from 8% to 5% is worth about VND 19.2 million, as long as it really costs nothing extra to achieve. It is worth doing.`,
    results: [
      { formula: `9,200 × 40,000 + 800 × (30,000 − 50,000) − 10,000 × 6,000 − 800 × 4,000 = 288,800,000`, steps: [
        `8% of 10,000 orders are returned: 800 items. So 9,200 are kept.`,
        `A kept item earns 90,000 − 50,000 = VND 40,000, so 9,200 × 40,000 = VND 368 million.`,
        `A returned item is refunded but still cost 50,000 to produce and is salvaged for 30,000, so it loses 20,000: 800 × 20,000 = VND 16 million lost.`,
        `Shipping is paid on all 10,000 orders: 10,000 × 6,000 = VND 60 million. Handling is paid on the 800 returns: 800 × 4,000 = VND 3.2 million.`,
        `368 − 16 − 60 − 3.2 = VND 288.8 million.`,
      ] },
      { formula: `9,500 × 40,000 + 500 × (30,000 − 50,000) − 10,000 × 6,000 − 500 × 4,000 = 308,000,000`, steps: [
        `At 5% returns, 500 items come back and 9,500 are kept.`,
        `Kept: 9,500 × 40,000 = VND 380 million. Returned loss: 500 × 20,000 = VND 10 million.`,
        `Shipping stays VND 60 million, handling is 500 × 4,000 = VND 2 million.`,
        `380 − 10 − 60 − 2 = VND 308 million.`,
      ] },
      { formula: `308,000,000 − 288,800,000 = 19,200,000`, steps: [
        `Subtract the current result from the improved result: 308 − 288.8 = VND 19.2 million.`,
        `Check: 300 fewer returns, each worth 40,000 + 20,000 + 4,000 = VND 64,000, gives 300 × 64,000 = VND 19.2 million.`,
      ] },
    ],
  },
  "CM-CALC-E07": {
    decision: `Reserve the surge option: it is worth about VND 6 million more than doing nothing (VND 442 million against VND 436 million). The surge supply is only activated when demand is high, and the option pays as long as the reservation fee is below VND 18 million.`,
    results: [
      { formula: `40% × (8,000 × 100,000 + 2,000 × 20,000 − 10,000 × 50,000) + 60% × (10,000 × 100,000 − 10,000 × 50,000) = 436,000,000`, steps: [
        `Low demand (8,000 units): sales 8,000 × 100,000 = VND 800 million, plus salvage of the 2,000 leftovers 2,000 × 20,000 = VND 40 million, minus the purchase cost 10,000 × 50,000 = VND 500 million. That is VND 340 million.`,
        `High demand: Pavo only has 10,000 units, so sales are 10,000 × 100,000 = VND 1,000 million minus the VND 500 million cost = VND 500 million.`,
        `Weight them by probability: 40% × 340 + 60% × 500 = 136 + 300 = VND 436 million.`,
      ] },
      { formula: `60% × (2,000 × (100,000 − 75,000) − 20,000,000) = 18,000,000`, steps: [
        `The surge supplier is only used when demand is high.`,
        `Each extra unit earns 100,000 − 75,000 = VND 25,000, so 2,000 units earn VND 50 million. Take off the VND 20 million activation fee: VND 30 million.`,
        `High demand has a 60% chance, so the expected gross benefit is 60% × 30 = VND 18 million.`,
      ] },
      { formula: `436,000,000 + 18,000,000 − 12,000,000 = 442,000,000`, steps: [
        `Start from the expected result without the option: VND 436 million.`,
        `Add the expected gross benefit of VND 18 million and take off the VND 12 million reservation fee, which is paid in every case.`,
        `436 + 18 − 12 = VND 442 million, which is VND 6 million better.`,
      ] },
      { formula: `Break-even fee = expected gross option benefit = 18,000,000`, steps: [
        `The fee is worth paying until it uses up the whole expected benefit.`,
        `The expected gross benefit is VND 18 million, so a reservation fee of VND 18 million leaves the option exactly as good as doing nothing.`,
      ] },
    ],
  },
  "CM-CALC-H08": {
    decision: `With the retail price fixed, a weaker dong cuts the batch contribution by VND 55 million. The model assumes neither the supplier nor customers react to the exchange rate.`,
    results: [
      { formula: `(5 × 25,000) + (5 × 25,000 × 10%) + 10,000 = 147,500`, steps: [
        `Convert the invoice: USD 5 × VND 25,000 = VND 125,000 per unit.`,
        `Import duty is 10% of that: 125,000 × 10% = VND 12,500.`,
        `Add domestic handling of VND 10,000: 125,000 + 12,500 + 10,000 = VND 147,500 per unit.`,
      ] },
      { formula: `10,000 × (200,000 − 147,500) − 100,000,000 = 425,000,000`, steps: [
        `Each unit earns the price minus landed cost: 200,000 − 147,500 = VND 52,500.`,
        `For 10,000 units: VND 525 million.`,
        `Take off the VND 100 million fixed marketing: 525 − 100 = VND 425 million.`,
      ] },
      { formula: `(5 × 26,000) + (5 × 26,000 × 10%) + 10,000 = 153,000`, steps: [
        `Convert at the new rate: USD 5 × VND 26,000 = VND 130,000.`,
        `Duty is 10%: 130,000 × 10% = VND 13,000.`,
        `Add handling of VND 10,000: 130,000 + 13,000 + 10,000 = VND 153,000 per unit.`,
      ] },
      { formula: `10,000 × (200,000 − 153,000) − 100,000,000 = 370,000,000`, steps: [
        `Each unit now earns 200,000 − 153,000 = VND 47,000.`,
        `For 10,000 units: VND 470 million.`,
        `Take off the VND 100 million marketing: 470 − 100 = VND 370 million.`,
      ] },
      { formula: `370,000,000 − 425,000,000 = −55,000,000`, steps: [
        `Subtract the old contribution from the new one: 370 − 425 = −VND 55 million.`,
        `Check: each unit costs VND 5,500 more (5,000 higher invoice plus 500 more duty), and 10,000 × 5,500 = VND 55 million.`,
      ] },
    ],
  },
  "CM-CALC-E08": {
    decision: `Choose Supplier B at VND 25,000 per USD: it is about VND 24.6 million cheaper for the same 9,504 good units. Supplier A would only become cheaper if the dong strengthened to about VND 24,507 per USD, with everything else unchanged.`,
    results: [
      { formula: `9,900 × (4.8 × 25,000 × 1.05 + 8,000) − 396 × 20,000 = 1,318,680,000`, steps: [
        `Convert Supplier A's price: USD 4.80 × 25,000 = VND 120,000. Add 5% duty: 120,000 × 1.05 = VND 126,000. Add shipping of VND 8,000: VND 134,000 per purchased unit.`,
        `A purchases 9,900 units to end up with 9,504 good ones: 9,900 × 134,000 = VND 1,326.6 million.`,
        `The 396 defective units are sold for salvage: 396 × 20,000 = VND 7.92 million.`,
        `Net cost: 1,326.6 − 7.92 = VND 1,318.68 million.`,
      ] },
      { formula: `9,600 × (132,000 + 3,000) − 96 × 20,000 = 1,294,080,000`, steps: [
        `Supplier B costs 132,000 + 3,000 shipping = VND 135,000 per purchased unit.`,
        `B purchases 9,600 units: 9,600 × 135,000 = VND 1,296 million.`,
        `The 96 defective units are salvaged: 96 × 20,000 = VND 1.92 million.`,
        `Net cost: 1,296 − 1.92 = VND 1,294.08 million.`,
      ] },
      { formula: `1,318,680,000 − 1,294,080,000 = 24,600,000`, steps: [
        `Subtract B's net cost from A's: 1,318.68 − 1,294.08 = VND 24.6 million.`,
        `B is cheaper by that amount.`,
      ] },
      { formula: `((1,294,080,000 + 7,920,000) ÷ 9,900 − 8,000) ÷ (4.8 × 1.05) = 24,507`, steps: [
        `Let x be the exchange rate. A's net cost is 9,900 × (4.8 × x × 1.05 + 8,000) − 7,920,000, and we want it to equal B's VND 1,294,080,000.`,
        `Add back the salvage and divide by 9,900: (1,294,080,000 + 7,920,000) ÷ 9,900 = 131,515.15 per purchased unit.`,
        `Take off shipping: 131,515.15 − 8,000 = 123,515.15, which is 4.8 × x × 1.05, so divide by 4.8 × 1.05 = 5.04.`,
        `x = 123,515.15 ÷ 5.04 ≈ VND 24,507 per USD.`,
      ] },
    ],
  },
  "CM-CALC-H09": {
    decision: `Rework the failures: at a 50% recovery rate it adds about VND 30 million, and it only needs 12.5% to be worth doing. The raw cost is paid either way, so it is not counted again.`,
    results: [
      { formula: `18,000 × 40,000 − 20,000 × 20,000 = 320,000,000`, steps: [
        `90% of 20,000 pass inspection: 18,000 good units, sold at VND 40,000: VND 720 million.`,
        `All 20,000 raw units were bought at VND 20,000: VND 400 million.`,
        `720 − 400 = VND 320 million.`,
      ] },
      { formula: `320,000,000 + 2,000 × 50% × 40,000 − 2,000 × 5,000 = 350,000,000`, steps: [
        `Reworking 2,000 failed units recovers 50%, which is 1,000 good units, worth 1,000 × 40,000 = VND 40 million.`,
        `Rework costs 2,000 × 5,000 = VND 10 million.`,
        `The extra gain is 40 − 10 = VND 30 million, so the total is 320 + 30 = VND 350 million.`,
      ] },
      { formula: `5,000 ÷ 40,000 = 0.125 = 12.5%`, steps: [
        `For each failed unit, rework costs VND 5,000 and a recovered unit earns VND 40,000.`,
        `Expected gain = recovery rate × 40,000 − 5,000. It is zero when the rate is 5,000 ÷ 40,000 = 0.125.`,
        `So rework pays whenever more than 12.5% of reworked units become saleable.`,
      ] },
    ],
  },
  "CM-CALC-E09": {
    decision: `Buy the overtime and rework every reject: total contribution becomes VND 287.8 million against VND 247.95 million at best without overtime, VND 39.85 million better. Compare overtime with the best no-overtime plan, not with doing no rework at all.`,
    results: [
      { formula: `450 ÷ 75% = 600`, steps: [
        `Without overtime the finishing line can take 10,050 good units, and the first pass already gives 9,600. That leaves 450 slots.`,
        `Only 75% of reworked units become good, so to fill 450 slots we need 450 ÷ 0.75 = 600 rework attempts.`,
      ] },
      { formula: `10,050 − 9,600 = 450`, steps: [
        `The first pass yields 12,000 × 80% = 9,600 good units.`,
        `The line takes 10,050 without overtime, so only 10,050 − 9,600 = 450 more units can be finished.`,
      ] },
      { formula: `12,000 × 20% = 2,400`, steps: [
        `With overtime the capacity is 11,400 good units, enough to finish 9,600 + 1,800.`,
        `So every reject can be reworked: 12,000 − 9,600 = 2,400 attempts.`,
      ] },
      { formula: `2,400 × 75% = 1,800`, steps: [
        `75% of the 2,400 reworked units become good: 2,400 × 0.75 = 1,800.`,
        `9,600 + 1,800 = 11,400, which exactly fits the overtime capacity.`,
      ] },
      { formula: `9,600 × (60,000 − 5,000) − 12,000 × 25,000 = 228,000,000`, steps: [
        `Each good unit earns 60,000 − 5,000 finishing = VND 55,000, so 9,600 × 55,000 = VND 528 million.`,
        `The raw units cost 12,000 × 25,000 = VND 300 million.`,
        `528 − 300 = VND 228 million. Both options share this starting point.`,
      ] },
      { formula: `228,000,000 + 450 × (60,000 − 5,000) − 600 × 8,000 = 247,950,000`, steps: [
        `The 450 recovered units earn 450 × 55,000 = VND 24.75 million.`,
        `The 600 rework attempts cost 600 × 8,000 = VND 4.8 million.`,
        `Net extra: 24.75 − 4.8 = VND 19.95 million, so the total is 228 + 19.95 = VND 247.95 million.`,
      ] },
      { formula: `228,000,000 + 1,800 × 55,000 − 2,400 × 8,000 − 20,000,000 = 287,800,000`, steps: [
        `The 1,800 recovered units earn 1,800 × 55,000 = VND 99 million.`,
        `The 2,400 rework attempts cost 2,400 × 8,000 = VND 19.2 million and the overtime costs VND 20 million.`,
        `Net extra: 99 − 19.2 − 20 = VND 59.8 million, so the total is 228 + 59.8 = VND 287.8 million.`,
      ] },
      { formula: `287,800,000 − 247,950,000 = 39,850,000`, steps: [
        `Subtract the best no-overtime plan from the overtime plan: 287.8 − 247.95 = VND 39.85 million in favour of overtime.`,
      ] },
    ],
  },
  "CM-CALC-H10": {
    decision: `Do not widen the voucher program at the forecast of 17,000 orders: it earns VND 170 million against VND 180 million today. It would need 18,000 orders, which is 1,000 more than forecast, to break even.`,
    results: [
      { formula: `15,000 × (12% × 200,000 − 3,000 − 5,000) − 15,000 × 40% × 10,000 = 180,000,000`, steps: [
        `Commission per order: 12% × 200,000 = VND 24,000.`,
        `After payment and servicing costs: 24,000 − 3,000 − 5,000 = VND 16,000 per order.`,
        `15,000 orders: 15,000 × 16,000 = VND 240 million.`,
        `40% of orders get a VND 10,000 voucher: 6,000 × 10,000 = VND 60 million. So 240 − 60 = VND 180 million.`,
      ] },
      { formula: `17,000 × 16,000 − 17,000 × 60% × 10,000 = 170,000,000`, steps: [
        `17,000 orders at VND 16,000 each: VND 272 million.`,
        `60% of the orders get a voucher: 17,000 × 60% = 10,200 vouchers × 10,000 = VND 102 million.`,
        `272 − 102 = VND 170 million, which is VND 10 million below the current program.`,
      ] },
      { formula: `180,000,000 ÷ (16,000 − 60% × 10,000) = 18,000`, steps: [
        `With 60% voucher share, the average voucher cost is 60% × 10,000 = VND 6,000 per order.`,
        `So each order earns 16,000 − 6,000 = VND 10,000.`,
        `To match the current VND 180 million: 180,000,000 ÷ 10,000 = 18,000 orders.`,
      ] },
    ],
  },
  "CM-CALC-E10": {
    decision: `Do not launch at the forecast: contribution would fall from VND 260 million to VND 195 million. It only breaks even at 32,223 orders at a 50% subsidy, or at 25,000 orders if no more than about 28.33% of orders get the subsidy. A narrower eligibility rule or stronger uplift is worth testing.`,
    results: [
      { formula: `20,000 × (10% × 180,000 − 2,000 − 3,000) = 260,000,000`, steps: [
        `Commission per order: 10% × 180,000 = VND 18,000.`,
        `After processing and support: 18,000 − 2,000 − 3,000 = VND 13,000 per order.`,
        `20,000 orders: 20,000 × 13,000 = VND 260 million.`,
      ] },
      { formula: `25,000 × (10% × 200,000 − 2,000 − 3,000 − 50% × 12,000) − 30,000,000 = 195,000,000`, steps: [
        `Commission per order: 10% × 200,000 = VND 20,000. After processing and support: 20,000 − 5,000 = VND 15,000.`,
        `The subsidy is VND 12,000 on half of the orders, so the average is 50% × 12,000 = VND 6,000 per order.`,
        `Contribution per order: 15,000 − 6,000 = VND 9,000, so 25,000 × 9,000 = VND 225 million.`,
        `Take off the VND 30 million fixed campaign spend: 225 − 30 = VND 195 million. That is VND 65 million below today.`,
      ] },
      { formula: `(260,000,000 + 30,000,000) ÷ 9,000 = 32,222.22, rounded up to 32,223`, steps: [
        `To match today's VND 260 million after the VND 30 million fixed cost, the orders must earn 260 + 30 = VND 290 million.`,
        `Each order earns VND 9,000, so 290,000,000 ÷ 9,000 = 32,222.22 orders.`,
        `You need at least that many whole orders, so round up to 32,223.`,
      ] },
      { formula: `(15,000 − 290,000,000 ÷ 25,000) ÷ 12,000 = 0.2833 = 28.33%`, steps: [
        `At 25,000 orders the campaign needs to earn VND 290 million before the fixed cost, which is 290,000,000 ÷ 25,000 = VND 11,600 per order.`,
        `Before any subsidy each order earns VND 15,000, so the average subsidy can be at most 15,000 − 11,600 = VND 3,400.`,
        `Each subsidized order costs VND 12,000, so the share of orders that can get it is 3,400 ÷ 12,000 = 0.2833, which is 28.33%.`,
      ] },
    ],
  },
  "CM-CALC-H11": {
    decision: `The base case pays back in exactly 12 months, just meeting the requirement, but the downside case takes 17 months and fails it. Simple payback also ignores the time value of money, so treat it as a first screen only.`,
    results: [
      { formula: `350,000,000 × (1 − 60%) − 90,000,000 = 50,000,000`, steps: [
        `Revenue left after variable costs of 60%: 350 × 40% = VND 140 million.`,
        `Take off fixed rent and payroll of VND 90 million: 140 − 90 = VND 50 million per month.`,
      ] },
      { formula: `600,000,000 ÷ 50,000,000 = 12`, steps: [
        `Payback is the investment divided by the monthly cash earned.`,
        `600 ÷ 50 = 12 months.`,
      ] },
      { formula: `350,000,000 × 90% × (1 − 60%) − 90,000,000 = 36,000,000`, steps: [
        `Downside revenue is 10% lower: 350 × 90% = VND 315 million.`,
        `After variable costs of 60%: 315 × 40% = VND 126 million.`,
        `Take off VND 90 million of fixed costs: 126 − 90 = VND 36 million per month.`,
      ] },
      { formula: `600,000,000 ÷ 36,000,000 = 16.67, rounded up to 17`, steps: [
        `Divide the investment by the downside monthly cash: 600 ÷ 36 = 16.67 months.`,
        `The case says to round up to a full month, so 17 months.`,
      ] },
    ],
  },
  "CM-CALC-E11": {
    decision: `Accept the project: the net present value is about +VND 366 million at a 10% discount rate, well above the zero hurdle. Test the cash-flow forecasts and the VND 200 million resale value before committing.`,
    results: [
      { formula: `−900 + 350 ÷ 1.10 + 420 ÷ 1.10² + 800 ÷ 1.10³ = 366.34 (VND million)`, steps: [
        `Time 0: pay VND 800 million for equipment and VND 100 million for working capital, so −VND 900 million.`,
        `Year 3 also includes the VND 200 million resale and the VND 100 million working capital coming back: 500 + 200 + 100 = VND 800 million.`,
        `Bring each year-end cash flow back to today by dividing by 1.10 once for each year: 350 ÷ 1.10 = 318.18; 420 ÷ 1.21 = 347.11; 800 ÷ 1.331 = 601.05.`,
        `Add them up with the time-0 cash flow: −900 + 318.18 + 347.11 + 601.05 = VND 366.34 million.`,
      ] },
    ],
  },
  "CM-CALC-H12": {
    decision: `Choose the sure contract: at a 40% chance of high demand the launch is expected to earn VND 190 million, VND 30 million less than the sure VND 220 million. The launch only catches up if high demand is at least 50% likely. This uses expected value only; how much risk to take is a separate judgement.`,
    results: [
      { formula: `40% × 400,000,000 + 60% × 100,000,000 − 30,000,000 = 190,000,000`, steps: [
        `High demand has a 40% chance of VND 400 million: 0.4 × 400 = VND 160 million.`,
        `Low demand has a 60% chance of VND 100 million: 0.6 × 100 = VND 60 million.`,
        `Add them and take off the VND 30 million validation cost, paid either way: 160 + 60 − 30 = VND 190 million.`,
      ] },
      { formula: `Sure contract = 220,000,000`, steps: [
        `The sure contract pays VND 220 million with certainty, so there is nothing to weigh.`,
        `Compare: 220 − 190 = VND 30 million more than the expected launch result.`,
      ] },
      { formula: `(220 − 70) ÷ 300 = 0.5 = 50%`, steps: [
        `Let p be the chance of high demand. Expected launch = p × 400 + (1 − p) × 100 − 30 (in VND million).`,
        `Simplify: 400p + 100 − 100p − 30 = 70 + 300p.`,
        `Set it equal to the sure VND 220 million: 70 + 300p = 220, so p = 150 ÷ 300 = 0.5, which is 50%.`,
      ] },
    ],
  },
  "CM-CALC-E12": {
    decision: `Run the pilot, but only narrowly: it is worth VND 122 million against VND 120 million for launching now, a gain of just VND 2 million. Launch after a positive signal and decline after a negative one. The pilot only pays if it costs less than VND 42 million, and the thin edge depends on how accurate the signal really is.`,
    results: [
      { formula: `40% × 600,000,000 + 60% × (−200,000,000) = 120,000,000`, steps: [
        `High demand: 0.4 × 600 = VND 240 million.`,
        `Low demand: 0.6 × (−200) = −VND 120 million.`,
        `Add: 240 − 120 = VND 120 million expected if you launch now.`,
      ] },
      { formula: `(40% × 80%) × 600,000,000 + (60% × 25%) × (−200,000,000) = 162,000,000`, steps: [
        `A positive signal in a high-demand market has probability 0.4 × 0.8 = 0.32. A positive signal in a low-demand market has probability 0.6 × 0.25 = 0.15.`,
        `Launch payoff from those two cases: 0.32 × 600 = 192 and 0.15 × (−200) = −30.`,
        `192 − 30 = VND 162 million (counted across all markets, positive signal cases only).`,
      ] },
      { formula: `162,000,000 ÷ 0.47 = 344,680,851`, steps: [
        `The chance of any positive signal is 0.32 + 0.15 = 0.47.`,
        `Given a positive signal, the average launch payoff is the VND 162 million divided by 0.47 = about VND 344.68 million.`,
        `That is clearly positive, so launch after a positive signal.`,
      ] },
      { formula: `(40% × 20%) × 600,000,000 + (60% × 75%) × (−200,000,000) = −42,000,000`, steps: [
        `A negative signal in a high-demand market has probability 0.4 × 0.2 = 0.08. A negative signal in a low-demand market has probability 0.6 × 0.75 = 0.45.`,
        `Launch payoff from those two cases: 0.08 × 600 = 48 and 0.45 × (−200) = −90.`,
        `48 − 90 = −VND 42 million, so decline after a negative signal.`,
      ] },
      { formula: `162,000,000 − 40,000,000 = 122,000,000`, steps: [
        `Launch only after a positive signal, which is worth VND 162 million; after a negative signal do nothing, worth zero.`,
        `Take off the VND 40 million pilot cost: 162 − 40 = VND 122 million.`,
      ] },
      { formula: `122,000,000 − 120,000,000 = 2,000,000`, steps: [
        `Compare the pilot strategy with launching now: 122 − 120 = VND 2 million better.`,
      ] },
      { formula: `162,000,000 − 120,000,000 = 42,000,000`, steps: [
        `The pilot is worth the extra VND 162 − 120 = VND 42 million before its cost.`,
        `So the pilot is at least as good as launching now for any pilot cost up to VND 42 million.`,
      ] },
    ],
  },
};

export function calculationWorkedAnswerFor(sourceCaseId: string | null | undefined): CalculationWorkedAnswer | null {
  return (sourceCaseId && CALCULATION_WORKED_ANSWERS[sourceCaseId]) || null;
}
