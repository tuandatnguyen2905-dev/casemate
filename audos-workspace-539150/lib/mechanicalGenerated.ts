import type { NumericalQuestion, NumericalTest } from './numericalReasoning';

// Mechanical Reasoning Test 5: an original 20-question paper in the AssessmentDay
// style (levers, pulleys, gears, belts, hydraulics, ramps, torque and work). The
// questions are written as short descriptions of a mechanism instead of pictures,
// every answer is computed from the numbers in the question, and each one has a
// worked explanation. Same 12-minute limit as the booklet tests.

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const SOURCE = 'Casemate original';
const HINT =
  'Name the principle first (moments about a pivot, rope sections sharing a load, gear teeth ratio, pressure = force / area, work = force x distance), write the formula, then substitute the numbers and check the units.';

function rng(seed: number): () => number {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Next = () => number;
const pick = <T,>(items: readonly T[], next: Next): T => items[Math.floor(next() * items.length)];

interface Draft {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

function fmt(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100);
}

/** Build a numeric multiple-choice draft; distractors are the classic slips. */
function numeric(prompt: string, correct: number, slips: number[], unit: string, explanation: string, next: Next): Draft {
  const values: number[] = [correct];
  slips.forEach((slip) => {
    if (slip > 0 && !values.some((v) => Math.abs(v - slip) < 1e-9)) values.push(slip);
  });
  let bump = 1;
  while (values.length < 4) {
    const extra = correct + bump * Math.max(1, Math.round(correct / 4));
    if (!values.some((v) => Math.abs(v - extra) < 1e-9)) values.push(extra);
    bump += 1;
  }
  const chosen = values.slice(0, 5);
  const shuffled = chosen.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    prompt,
    options: shuffled.map((v) => `${fmt(v)} ${unit}`.trim()),
    answer: shuffled.findIndex((v) => Math.abs(v - correct) < 1e-9),
    explanation,
  };
}

const BUILDERS: Array<(next: Next) => Draft> = [
  // Lever: effort to balance a load.
  (next) => {
    const w = pick([40, 60, 80, 120, 150], next);
    const d1 = pick([1, 2, 3], next);
    const d2 = pick([4, 5, 6], next);
    const correct = (w * d1) / d2;
    return numeric(
      `A uniform lever rests on a pivot. A load of ${w} N hangs ${d1} m to the left of the pivot. At what force, applied downwards ${d2} m to the right of the pivot, will the lever balance? (Ignore the weight of the lever.)`,
      correct, [(w * d2) / d1, w * d1, w + d2, w - d1], 'N',
      `Moments balance: load x distance = effort x distance, so ${w} x ${d1} = F x ${d2}, giving F = ${fmt(correct)} N. The long arm needs less force than the short arm.`, next);
  },
  // Seesaw with two loads: find the distance.
  (next) => {
    const w1 = pick([200, 300, 400], next);
    const d1 = pick([2, 3, 4], next);
    const w2 = pick([100, 150, 200], next);
    const correct = (w1 * d1) / w2;
    return numeric(
      `A seesaw balances on a central pivot. A child weighing ${w1} N sits ${d1} m from the pivot on one side. A child weighing ${w2} N sits on the other side. How far from the pivot must the second child sit for the seesaw to balance?`,
      correct, [(w2 * d1) / w1, d1 + (w1 - w2) / 100, w1 / w2, d1 * 2], 'm',
      `Clockwise moment = anticlockwise moment: ${w1} x ${d1} = ${w2} x d, so d = ${fmt(correct)} m. A lighter person must sit further from the pivot.`, next);
  },
  // Pulley: rope sections.
  (next) => {
    const n = pick([2, 3, 4, 5], next);
    const load = n * pick([30, 40, 50, 60], next);
    const correct = load / n;
    return numeric(
      `A block and tackle has ${n} rope sections supporting the moving block. It lifts a ${load} N load at a steady speed. Ignoring friction and the weight of the pulleys, what pulling force is needed on the free end of the rope?`,
      correct, [load, load * n, load / (n + 1), load / (n - 1 || 1)], 'N',
      `The load is shared equally between the ${n} supporting sections, so the pull is ${load} / ${n} = ${fmt(correct)} N.`, next);
  },
  // Pulley: distance pulled.
  (next) => {
    const n = pick([2, 3, 4], next);
    const rise = pick([1, 2, 3], next);
    const correct = n * rise;
    return numeric(
      `A load is raised by a pulley system with ${n} supporting rope sections. By how many metres must the free end of the rope be pulled to raise the load by ${rise} m?`,
      correct, [rise, rise / n, rise + n, correct + n], 'm',
      `Each supporting section must shorten by ${rise} m, so the free end moves ${n} x ${rise} = ${correct} m. The force is reduced by the same factor that the distance is increased.`, next);
  },
  // Gear speed.
  (next) => {
    const a = pick([20, 24, 30, 40], next);
    const b = pick([10, 12, 15, 60], next);
    const r = pick([60, 90, 120], next);
    const correct = (r * a) / b;
    return numeric(
      `Gear A has ${a} teeth and meshes directly with gear B, which has ${b} teeth. Gear A turns at ${r} revolutions per minute. How fast does gear B turn?`,
      correct, [(r * b) / a, r + (a - b), r * a, r], 'rpm',
      `A smaller gear driven by a larger gear turns faster. Speed B = ${r} x ${a} / ${b} = ${fmt(correct)} rpm.`, next);
  },
  // Gear train direction.
  (next) => {
    const n = pick([3, 4, 5, 6, 7], next);
    const dir = n % 2 === 1 ? 'clockwise' : 'anticlockwise';
    const other = dir === 'clockwise' ? 'anticlockwise' : 'clockwise';
    return {
      prompt: `${n} identical gears are meshed in a straight line. The first gear is turned clockwise. In which direction does the last gear turn?`,
      options: dir === 'clockwise'
        ? ['Clockwise', 'Anticlockwise', 'It locks and cannot turn', 'It alternates direction']
        : ['Anticlockwise', 'Clockwise', 'It locks and cannot turn', 'It alternates direction'],
      answer: 0,
      explanation: `Each meshing reverses the direction. Gear 1 is clockwise, gear 2 ${other}, and so on, so odd-numbered gears turn clockwise and even-numbered gears turn anticlockwise. Gear ${n} turns ${dir}.`,
    };
  },
  // Belt drive.
  (next) => {
    const d1 = pick([10, 15, 20], next);
    const d2 = pick([30, 40, 60], next);
    const r = pick([600, 900, 1200], next);
    const correct = (r * d1) / d2;
    return numeric(
      `A belt connects a driver pulley of diameter ${d1} cm turning at ${r} rpm to a driven pulley of diameter ${d2} cm. The belt does not slip. At what speed does the driven pulley turn?`,
      correct, [(r * d2) / d1, r, r - (d2 - d1), r * d1], 'rpm',
      `The belt moves at the same speed over both rims, so speed x diameter is constant: ${r} x ${d1} = N x ${d2}, giving N = ${fmt(correct)} rpm.`, next);
  },
  // Hydraulic press.
  (next) => {
    const a1 = pick([5, 10, 20], next);
    const a2 = a1 * pick([4, 5, 10], next);
    const f1 = pick([50, 80, 100, 200], next);
    const correct = (f1 * a2) / a1;
    return numeric(
      `In a hydraulic press a force of ${f1} N is applied to a small piston of area ${a1} cm2. The large piston has an area of ${a2} cm2. What force does the large piston produce?`,
      correct, [(f1 * a1) / a2, f1 + (a2 - a1), f1, f1 * a2], 'N',
      `Pressure is the same throughout the fluid: ${f1} / ${a1} = F / ${a2}, so F = ${fmt(correct)} N. The force is multiplied by the area ratio.`, next);
  },
  // Pressure.
  (next) => {
    const f = pick([200, 300, 600, 900], next);
    const a = pick([2, 3, 5, 6], next);
    const correct = f / a;
    return numeric(
      `A force of ${f} N is spread evenly over an area of ${a} m2. What is the pressure on that area?`,
      correct, [f * a, a / f, f - a, f + a], 'N/m2',
      `Pressure = force / area = ${f} / ${a} = ${fmt(correct)} N/m2.`, next);
  },
  // Ramp.
  (next) => {
    const h = pick([1, 2, 3], next);
    const l = h * pick([3, 4, 5], next);
    const w = pick([300, 400, 600, 900], next);
    const correct = (w * h) / l;
    return numeric(
      `A crate weighing ${w} N is pushed up a smooth ramp ${l} m long to a platform ${h} m high. Ignoring friction, what force parallel to the ramp is needed?`,
      correct, [(w * l) / h, w, w - l, w * h], 'N',
      `The work done is the same as lifting the crate straight up: F x ${l} = ${w} x ${h}, so F = ${fmt(correct)} N. A longer ramp needs less force over a longer distance.`, next);
  },
  // Work.
  (next) => {
    const f = pick([40, 60, 75, 120], next);
    const d = pick([3, 4, 5, 8], next);
    const correct = f * d;
    return numeric(
      `A constant force of ${f} N moves a trolley ${d} m in the direction of the force. How much work is done?`,
      correct, [f / d, f + d, f * d * 2, d / f], 'J',
      `Work = force x distance = ${f} x ${d} = ${correct} J.`, next);
  },
  // Efficiency.
  (next) => {
    const input = pick([200, 400, 500, 800], next);
    const pct = pick([50, 60, 75, 80], next);
    const output = (input * pct) / 100;
    return numeric(
      `A machine is supplied with ${input} J of energy and delivers ${fmt(output)} J of useful work. What is its efficiency?`,
      pct, [100 - pct, pct + 10, input - output, Math.max(5, pct - 15)], '%',
      `Efficiency = useful output / input = ${fmt(output)} / ${input} = ${pct}%. The rest is lost, mostly as heat.`, next);
  },
  // Torque.
  (next) => {
    const f = pick([20, 30, 40, 50], next);
    const d = pick([0.2, 0.3, 0.4, 0.5], next);
    const correct = Math.round(f * d * 100) / 100;
    return numeric(
      `A force of ${f} N is applied at right angles to the end of a spanner ${d} m long. What turning moment (torque) is applied to the nut?`,
      correct, [f / d, f + d, f * d * 10, f - d], 'N m',
      `Torque = force x perpendicular distance = ${f} x ${d} = ${fmt(correct)} N m.`, next);
  },
  // Longer handle.
  (next) => {
    const d1 = pick([0.2, 0.25, 0.3], next);
    const mult = pick([2, 3, 4], next);
    const f1 = pick([60, 90, 120], next);
    const correct = f1 / mult;
    return numeric(
      `A nut needs a turning moment that takes ${f1} N applied on a spanner ${d1} m long. What force is needed on a spanner ${mult} times as long?`,
      correct, [f1 * mult, f1, f1 - mult, f1 / (mult * 2)], 'N',
      `The turning moment needed is fixed. Force x length is constant, so a spanner ${mult} times longer needs ${f1} / ${mult} = ${fmt(correct)} N.`, next);
  },
  // Rotating wheel speed.
  (next) => {
    const r = pick([30, 40, 50], next);
    const rev = pick([5, 10, 20], next);
    const correct = (2 * 3 * r * rev) / 100;
    return numeric(
      `A wheel with a radius of ${r} cm turns ${rev} full revolutions. Taking pi as 3, how far does a point on its rim travel in total?`,
      correct, [(3 * r * rev) / 100, (2 * 3 * r) / 100, 2 * 3 * r * rev, (2 * r * rev) / 100], 'm',
      `Circumference = 2 x 3 x ${r} = ${2 * 3 * r} cm. In ${rev} revolutions the rim travels ${2 * 3 * r * rev} cm = ${fmt(correct)} m.`, next);
  },
];

interface Qualitative {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUALITATIVE: Qualitative[] = [
  {
    prompt: 'A wheelbarrow carries a heavy load. Which change makes the load feel lighter to lift?',
    options: ['Moving the load closer to the wheel', 'Moving the load closer to the handles', 'Holding the handles nearer the wheel', 'Using a smaller wheel'],
    answer: 0,
    explanation: 'The wheel is the pivot. The nearer the load is to the pivot, the shorter its lever arm and the smaller the effort needed at the handles.',
  },
  {
    prompt: 'Two identical bricks sit on a table, one lying flat and one standing on its end. Which statement about the pressure on the table is correct?',
    options: ['The standing brick exerts more pressure', 'The flat brick exerts more pressure', 'Both exert the same pressure', 'Neither exerts any pressure'],
    answer: 0,
    explanation: 'The weight is the same, but the standing brick has a smaller contact area, and pressure = force / area.',
  },
  {
    prompt: 'A pair of gears has a small driver gear and a large driven gear. Compared with the driver, the driven gear turns:',
    options: ['More slowly with more turning force', 'Faster with more turning force', 'More slowly with less turning force', 'At the same speed'],
    answer: 0,
    explanation: 'A large driven gear turns more slowly than a small driver, and the speed lost is gained as turning force (torque).',
  },
  {
    prompt: 'A heavy object is lifted with a single fixed pulley. Compared with lifting it directly by hand, the pulling force is:',
    options: ['The same, but the direction is changed', 'Half as large', 'Twice as large', 'Zero'],
    answer: 0,
    explanation: 'A single fixed pulley only changes the direction of the force. There is no mechanical advantage.',
  },
  {
    prompt: 'Which of these objects is the most stable against tipping over?',
    options: ['A wide, low box', 'A tall, narrow box', 'A tall box standing on its edge', 'A cone balanced on its point'],
    answer: 0,
    explanation: 'A low centre of gravity above a wide base means the object must be tilted much further before its weight falls outside the base.',
  },
  {
    prompt: 'The fulcrum of a lever is moved closer to the load while the effort stays at the same place. The effort needed to lift the load will:',
    options: ['Decrease', 'Increase', 'Stay the same', 'Become zero'],
    answer: 0,
    explanation: 'The load arm becomes shorter and the effort arm longer, so a smaller effort balances the same load.',
  },
];

const COMPUTED_COUNT = 14;

function buildQuestion(index: number): NumericalQuestion {
    const id = `mr-5-q${String(index + 1).padStart(2, '0')}`;
  let draft: Draft;
  if (index < COMPUTED_COUNT) {
    draft = BUILDERS[index](rng(9100 + index * 37));
  } else {
    draft = QUALITATIVE[index - COMPUTED_COUNT];
  }
  const next = rng(7000 + index * 11);
  const order = draft.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  draft = { ...draft, options: order.map((i) => draft.options[i]), answer: order.indexOf(draft.answer) };
  const correctLetter = LETTERS[draft.answer];
  return {
    kind: 'numerical',
    id,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    prompt: draft.prompt,
    options: draft.options,
    optionLabels: draft.options.map((_, i) => LETTERS[i]),
    correctAnswer: correctLetter,
    explanation: `Correct answer: ${correctLetter} (${draft.options[draft.answer]}).\n\nWorked solution: ${draft.explanation}`,
    patternName: `${SOURCE} Mechanical Reasoning Test 5 - question ${index + 1}`,
    hint: HINT,
  } as unknown as NumericalQuestion;
}

export function loadGeneratedMechanicalTests(): NumericalTest[] {
  const questions = Array.from({ length: COMPUTED_COUNT + QUALITATIVE.length }, (_, index) => buildQuestion(index));
  return [
    {
      id: 'mr-5',
      name: 'Mechanical Reasoning Test 5',
      subtitle: `MR-05 \u00b7 ${questions.length} questions`,
      description: 'Original practice paper in the AssessmentDay style: levers and seesaws, pulleys, gear trains and belts, hydraulics, ramps, torque, work and efficiency. Each question describes the mechanism in words, every answer is calculated from the numbers given, and every question has a worked solution.',
      difficulty: 'mixed',
      timeLimitSeconds: 12 * 60,
      sourceOrganization: SOURCE,
      instructions: `This mechanical reasoning test has ${questions.length} questions and a 12-minute limit. Each question describes a mechanism; choose the one option that is correct. Ignore friction and the weight of the parts unless the question says otherwise.`,
      questions,
    } as unknown as NumericalTest,
  ];
}
