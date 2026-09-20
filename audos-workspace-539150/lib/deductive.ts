// Casemate — Deductive Reasoning engine.
//
// Same design philosophy as lib/diagrammatic.ts and lib/inductive.ts: a
// question is never a scanned booklet page with a hand-keyed answer. Every
// answer here is COMPUTED from the premises — syllogism verdicts come from a
// hand-verified catalogue of logical forms, ordering verdicts are checked by
// enumerating every arrangement consistent with the premises, and numeric /
// plan-table answers are calculated from the same numbers the candidate sees.
// The premises and the answer key can never disagree.
//
// The question formats mirror the four AssessmentDay Deductive Reasoning
// booklets the founder supplied:
//   - a short passage of premises followed by a statement to judge
//     True / False / Insufficient Information (the dominant format), and
//   - a small data table (price plans, contracts) followed by a five-option
//     "which one fits" question A–E.
// Families: syllogisms, conditional (if–then) arguments, ranking / ordering,
// numeric relationships (the FruitBar-style simultaneous equations), and
// plan-selection tables — all in realistic business / MT-programme contexts.
//
// LANGUAGE: English end to end — the real aptitude round is sat in English.

/* ========================================================================== *
 * Types the UI consumes
 * ========================================================================== */

export type DeductiveDifficulty = 'easy' | 'medium' | 'hard';

export interface DeductiveExpandedQuestion {
  kind: 'deductive';
  id: string;
  difficulty: DeductiveDifficulty;
  /** The passage: each entry is one premise line, shown in order. */
  premises: string[];
  /** The statement / question the candidate must judge. */
  prompt: string;
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  explanation: string;
  patternName: string;
}

export interface DeductiveTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: string;
  timeLimitSeconds: number;
  questions: DeductiveExpandedQuestion[];
}

/* ========================================================================== *
 * Seeded RNG (mulberry32) + FNV hash — local copies, same as the other engines
 * ========================================================================== */

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

export function hashDeductive(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pick<T>(items: readonly T[], next: () => number): T {
  return items[Math.floor(next() * items.length)];
}

function pickN<T>(items: readonly T[], n: number, next: () => number): T[] {
  return shuffle(items, next).slice(0, n);
}

/* ========================================================================== *
 * Shared answer scaffolding
 * ========================================================================== */

const TFC_OPTIONS = ['True', 'False', 'Insufficient Information'];
const TFC_LABELS = ['A', 'B', 'C'];
const MC_LABELS = ['A', 'B', 'C', 'D', 'E'];

type Verdict = 'true' | 'false' | 'cannot';

const VERDICT_LABEL: Record<Verdict, string> = { true: 'A', false: 'B', cannot: 'C' };

function tfcQuestion(
  id: string,
  difficulty: DeductiveDifficulty,
  patternName: string,
  premises: string[],
  prompt: string,
  verdict: Verdict,
  explanation: string,
): DeductiveExpandedQuestion {
  return {
    kind: 'deductive',
    id,
    difficulty,
    premises,
    prompt,
    options: TFC_OPTIONS,
    optionLabels: TFC_LABELS,
    correctAnswer: VERDICT_LABEL[verdict],
    explanation,
    patternName,
  };
}

/* ========================================================================== *
 * Word pools — business / MT-programme flavoured
 * ========================================================================== */

const TEAMS = [
  'Finance', 'Sales', 'HR', 'Audit', 'Product', 'Legal', 'Support', 'Data', 'Design', 'Marketing',
  'Operations', 'Procurement',
];

// Present-perfect verb phrases: "…has {PROP}".
const PROPS = [
  'completed the compliance training',
  'attended the town hall',
  'submitted a Q3 timesheet',
  'passed the security review',
  'received a laptop upgrade',
  'signed the code of conduct',
  'finished the onboarding course',
  'mentored an intern',
  'presented to a client',
  'earned a professional certificate',
  'joined the mentoring scheme',
  'booked annual leave for December',
];

const NAMES = [
  'An', 'Binh', 'Chi', 'Duc', 'Giang', 'Hoa', 'Khanh', 'Linh', 'Minh', 'Nam',
  'Phuong', 'Quan', 'Thao', 'Trang', 'Tuan', 'Vy', 'Daniel', 'Emma', 'James', 'Laura',
  'Marco', 'Nina', 'Oliver', 'Sofia',
];

const RANK_METRICS = [
  { intro: 'are ranked by quarterly sales, best first', rel: 'ranks higher than', at: 'ranks' },
  { intro: 'finished a timed case exercise, fastest first', rel: 'finished ahead of', at: 'finished' },
  { intro: 'are ranked by the number of deals closed this month, most first', rel: 'ranks higher than', at: 'ranks' },
  { intro: 'are listed by seniority, most senior first', rel: 'is more senior than', at: 'is' },
  { intro: 'are ranked by their aptitude test score, highest first', rel: 'scored higher than', at: 'placed' },
];

const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth'];

// Conditional chains: three events that make narrative sense in sequence.
// Each event carries a hand-written present ("if …") and past form.
interface Ev {
  cond: string; // "the budget is approved" (used after If / only if / unless)
  past: string; // "The budget was approved"
  negPast: string; // "The budget was not approved"
}

const EVENT_CHAINS: [Ev, Ev, Ev][] = [
  [
    { cond: 'the budget is approved', past: 'The budget was approved', negPast: 'The budget was not approved' },
    { cond: 'the project goes ahead', past: 'The project went ahead', negPast: 'The project did not go ahead' },
    { cond: 'a project manager is assigned', past: 'A project manager was assigned', negPast: 'No project manager was assigned' },
  ],
  [
    { cond: 'the pilot succeeds', past: 'The pilot succeeded', negPast: 'The pilot did not succeed' },
    { cond: 'the national rollout begins', past: 'The national rollout began', negPast: 'The national rollout did not begin' },
    { cond: 'a second warehouse is opened', past: 'A second warehouse was opened', negPast: 'No second warehouse was opened' },
  ],
  [
    { cond: 'the demo impresses the client', past: 'The demo impressed the client', negPast: 'The demo did not impress the client' },
    { cond: 'the contract is signed', past: 'The contract was signed', negPast: 'The contract was not signed' },
    { cond: 'onboarding begins', past: 'Onboarding began', negPast: 'Onboarding did not begin' },
  ],
  [
    { cond: 'the audit finds no issues', past: 'The audit found no issues', negPast: 'The audit found issues' },
    { cond: 'the annual bonus is paid', past: 'The annual bonus was paid', negPast: 'The annual bonus was not paid' },
    { cond: 'the savings scheme is extended', past: 'The savings scheme was extended', negPast: 'The savings scheme was not extended' },
  ],
  [
    { cond: 'the candidate passes the aptitude test', past: 'The candidate passed the aptitude test', negPast: 'The candidate did not pass the aptitude test' },
    { cond: 'an interview is scheduled', past: 'An interview was scheduled', negPast: 'No interview was scheduled' },
    { cond: 'a hiring decision is made', past: 'A hiring decision was made', negPast: 'No hiring decision was made' },
  ],
  [
    { cond: 'the report is submitted on time', past: 'The report was submitted on time', negPast: 'The report was not submitted on time' },
    { cond: 'the review meeting is held', past: 'The review meeting was held', negPast: 'The review meeting was not held' },
    { cond: 'the findings are published', past: 'The findings were published', negPast: 'The findings were not published' },
  ],
  [
    { cond: 'the server migration is completed', past: 'The server migration was completed', negPast: 'The server migration was not completed' },
    { cond: 'the legacy system is retired', past: 'The legacy system was retired', negPast: 'The legacy system was not retired' },
    { cond: 'the maintenance contract is cancelled', past: 'The maintenance contract was cancelled', negPast: 'The maintenance contract was not cancelled' },
  ],
  [
    { cond: 'the sales target is met', past: 'The sales target was met', negPast: 'The sales target was not met' },
    { cond: 'the team offsite is booked', past: 'The team offsite was booked', negPast: 'The team offsite was not booked' },
    { cond: 'next year’s budget is increased', past: 'Next year’s budget was increased', negPast: 'Next year’s budget was not increased' },
  ],
  [
    { cond: 'the training course is completed', past: 'The training course was completed', negPast: 'The training course was not completed' },
    { cond: 'the safety badge is issued', past: 'The safety badge was issued', negPast: 'The safety badge was not issued' },
    { cond: 'warehouse access is granted', past: 'Warehouse access was granted', negPast: 'Warehouse access was not granted' },
  ],
  [
    { cond: 'the prototype passes testing', past: 'The prototype passed testing', negPast: 'The prototype did not pass testing' },
    { cond: 'mass manufacturing starts', past: 'Mass manufacturing started', negPast: 'Mass manufacturing did not start' },
    { cond: 'the launch date is announced', past: 'The launch date was announced', negPast: 'The launch date was not announced' },
  ],
  [
    { cond: 'the funding round closes', past: 'The funding round closed', negPast: 'The funding round did not close' },
    { cond: 'two new analysts are hired', past: 'Two new analysts were hired', negPast: 'No new analysts were hired' },
    { cond: 'the research programme is expanded', past: 'The research programme was expanded', negPast: 'The research programme was not expanded' },
  ],
  [
    { cond: 'the supplier confirms the order', past: 'The supplier confirmed the order', negPast: 'The supplier did not confirm the order' },
    { cond: 'the assembly line is scheduled', past: 'The assembly line was scheduled', negPast: 'The assembly line was not scheduled' },
    { cond: 'the delivery date is confirmed', past: 'The delivery date was confirmed', negPast: 'The delivery date was not confirmed' },
  ],
];

// Product triples for numeric questions: small item, second item, bundle.
const PRODUCT_SETS: { a: string; b: string; bundle: string; unit: string }[] = [
  { a: 'NutBar', b: 'FruitBar', bundle: 'SnackBox', unit: 'bar' },
  { a: 'Basic seat', b: 'Pro seat', bundle: 'Team pack', unit: 'seat' },
  { a: 'Filter pod', b: 'Espresso pod', bundle: 'Pod bundle', unit: 'pod' },
  { a: 'Day pass', b: 'Week pass', bundle: 'Month pass', unit: 'pass' },
  { a: 'Pocket notebook', b: 'Desk notebook', bundle: 'Stationery set', unit: 'notebook' },
  { a: 'Standard ticket', b: 'Flex ticket', bundle: 'Group pack', unit: 'ticket' },
];

const PLAN_NAME_SETS: string[][] = [
  ['Sparrow', 'Falcon', 'Heron', 'Osprey', 'Kestrel'],
  ['Alpha', 'Beta', 'Gamma', 'Delta', 'Echo'],
  ['Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium'],
  ['Coral', 'Amber', 'Jade', 'Onyx', 'Opal'],
  ['Comet', 'Meteor', 'Orbit', 'Nova', 'Pulsar'],
];

const PLAN_CONTEXTS = [
  { thing: 'mobile data plans', per: 'devices' },
  { thing: 'broadband packages', per: 'devices' },
  { thing: 'software subscription tiers', per: 'user licences' },
  { thing: 'office phone contracts', per: 'handsets' },
];

/* ========================================================================== *
 * Family 1 — Syllogisms (hand-verified catalogue of forms)
 * ========================================================================== */

interface SylForm {
  id: string;
  difficulty: DeductiveDifficulty;
  build: (team: string, prop1: string, prop2: string, team2: string) => {
    premises: string[];
    prompt: string;
    verdict: Verdict;
    explanation: string;
  };
}

const SYL_FORMS: SylForm[] = [
  {
    id: 'chain-all', difficulty: 'easy',
    build: (team, p1, p2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `Everyone who has ${p1} has also ${p2}.`,
      ],
      prompt: `Every member of the ${team} team has ${p2}.`,
      verdict: 'true',
      explanation: `Membership chains through: every ${team} team member has ${p1}, and everyone with ${p1} has ${p2}, so every ${team} team member must have ${p2}. True.`,
    }),
  },
  {
    id: 'all-then-none', difficulty: 'easy',
    build: (team, p1, p2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `No one who has ${p1} has ${p2}.`,
      ],
      prompt: `No member of the ${team} team has ${p2}.`,
      verdict: 'true',
      explanation: `Every ${team} team member has ${p1}, and having ${p1} rules out having ${p2}. So no ${team} team member can have ${p2}. True.`,
    }),
  },
  {
    id: 'all-then-none-some', difficulty: 'easy',
    build: (team, p1, p2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `No one who has ${p1} has ${p2}.`,
      ],
      prompt: `Some members of the ${team} team have ${p2}.`,
      verdict: 'false',
      explanation: `Every ${team} team member has ${p1}, and no one with ${p1} has ${p2} — so not a single ${team} team member can have ${p2}. The statement contradicts the premises. False.`,
    }),
  },
  {
    id: 'no-converse', difficulty: 'easy',
    build: (team, p1) => ({
      premises: [`No member of the ${team} team has ${p1}.`],
      prompt: `No one who has ${p1} is a member of the ${team} team.`,
      verdict: 'true',
      explanation: `"No A are B" works in both directions: if no ${team} team member has ${p1}, then anyone who HAS ${p1} cannot be on the ${team} team. True.`,
    }),
  },
  {
    id: 'some-converse', difficulty: 'easy',
    build: (team, p1) => ({
      premises: [`Some members of the ${team} team have ${p1}.`],
      prompt: `Some people who have ${p1} are members of the ${team} team.`,
      verdict: 'true',
      explanation: `"Some A are B" converts directly: those same people are both on the ${team} team and have ${p1}, so some people with ${p1} are on the ${team} team. True.`,
    }),
  },
  {
    id: 'all-some-trap', difficulty: 'medium',
    build: (team, p1, p2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `Some people who have ${p1} have also ${p2}.`,
      ],
      prompt: `Some members of the ${team} team have ${p2}.`,
      verdict: 'cannot',
      explanation: `The people with both ${p1} and ${p2} might all be OUTSIDE the ${team} team — the premises do not say the overlap includes any ${team} member. It could be true, but it does not have to be. Insufficient Information.`,
    }),
  },
  {
    id: 'no-all-disjoint', difficulty: 'medium',
    build: (team, p1, _p2, team2) => ({
      premises: [
        `No member of the ${team} team has ${p1}.`,
        `Everyone on the ${team2} project has ${p1}.`,
      ],
      prompt: `No member of the ${team} team is on the ${team2} project.`,
      verdict: 'true',
      explanation: `Everyone on the ${team2} project has ${p1}, but no ${team} team member has ${p1}. If someone were on both, they would have to both have and not have ${p1} — impossible. True.`,
    }),
  },
  {
    id: 'converse-trap', difficulty: 'medium',
    build: (team, p1) => ({
      premises: [`Every member of the ${team} team has ${p1}.`],
      prompt: `Everyone who has ${p1} is a member of the ${team} team.`,
      verdict: 'cannot',
      explanation: `"All A are B" does not reverse. People outside the ${team} team may also have ${p1} — the premise says nothing about them. Insufficient Information.`,
    }),
  },
  {
    id: 'some-not-escape', difficulty: 'medium',
    build: (team, p1, _p2, team2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `Some members of the ${team2} team have not ${p1}.`,
      ],
      prompt: `Some members of the ${team2} team are not members of the ${team} team.`,
      verdict: 'true',
      explanation: `Take a ${team2} member who has not ${p1}. Every ${team} member HAS ${p1}, so that person cannot be on the ${team} team. True.`,
    }),
  },
  {
    id: 'some-some-trap', difficulty: 'hard',
    build: (team, p1, p2) => ({
      premises: [
        `Some members of the ${team} team have ${p1}.`,
        `Some people who have ${p1} have also ${p2}.`,
      ],
      prompt: `Some members of the ${team} team have ${p2}.`,
      verdict: 'cannot',
      explanation: `Two "some" premises never chain. The ${team} members with ${p1} and the people with both ${p1} and ${p2} could be entirely different people. Insufficient Information.`,
    }),
  },
  {
    id: 'some-overlap-trap', difficulty: 'hard',
    build: (team, p1, _p2, team2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `Some members of the ${team2} team have ${p1}.`,
      ],
      prompt: `Some members of the ${team2} team are members of the ${team} team.`,
      verdict: 'cannot',
      explanation: `Having ${p1} does not make someone a ${team} member — the first premise only says ${team} membership guarantees ${p1}, not the reverse. The ${team2} members with ${p1} may have it for other reasons. Insufficient Information.`,
    }),
  },
  {
    id: 'no-some-cross', difficulty: 'hard',
    build: (team, p1, _p2, team2) => ({
      premises: [
        `No member of the ${team} team has ${p1}.`,
        `Some members of the ${team2} team are also members of the ${team} team.`,
      ],
      prompt: `Some members of the ${team2} team have not ${p1}.`,
      verdict: 'true',
      explanation: `The ${team2} members who are also on the ${team} team cannot have ${p1} (no ${team} member does). Those people are ${team2} members without ${p1}. True.`,
    }),
  },
  {
    id: 'exclusion-trap', difficulty: 'hard',
    build: (team, p1, p2) => ({
      premises: [
        `Every member of the ${team} team has ${p1}.`,
        `No member of the ${team} team has ${p2}.`,
      ],
      prompt: `No one who has ${p1} has ${p2}.`,
      verdict: 'cannot',
      explanation: `The premises only describe the ${team} team. Someone OUTSIDE the team could have both ${p1} and ${p2} — nothing rules that out. Insufficient Information.`,
    }),
  },
];

function genSyllogism(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion {
  const next = rng(hashDeductive(qid));
  const forms = SYL_FORMS.filter((f) => f.difficulty === difficulty);
  const form = pick(forms, next);
  const [team, team2] = pickN(TEAMS, 2, next);
  const [p1, p2] = pickN(PROPS, 2, next);
  const built = form.build(team, p1, p2, team2);
  return tfcQuestion(qid, difficulty, 'Syllogism', built.premises, built.prompt, built.verdict, built.explanation);
}

/* ========================================================================== *
 * Family 2 — Conditional (if–then) arguments
 * ========================================================================== */

interface CondForm {
  id: string;
  difficulty: DeductiveDifficulty;
  build: (e1: Ev, e2: Ev, e3: Ev) => {
    premises: string[];
    prompt: string;
    verdict: Verdict;
    explanation: string;
  };
}

const COND_FORMS: CondForm[] = [
  {
    id: 'modus-ponens', difficulty: 'easy',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e1.past}.`],
      prompt: `${e2.past}.`,
      verdict: 'true',
      explanation: `The rule says ${e1.cond} guarantees that ${e2.cond}. The condition happened, so the outcome must have followed. True.`,
    }),
  },
  {
    id: 'modus-tollens-false', difficulty: 'easy',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e2.negPast}.`],
      prompt: `${e1.past}.`,
      verdict: 'false',
      explanation: `If ${e1.cond}, the outcome (${e2.cond}) would have followed — but it did not. So the condition cannot have happened. False.`,
    }),
  },
  {
    id: 'modus-tollens-true', difficulty: 'easy',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e2.negPast}.`],
      prompt: `${e1.negPast}.`,
      verdict: 'true',
      explanation: `Had ${e1.cond}, then ${e2.cond} — but the outcome did not happen. The only consistent conclusion is that the condition did not happen either. True.`,
    }),
  },
  {
    id: 'ponens-negated', difficulty: 'easy',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e1.past}.`],
      prompt: `${e2.negPast}.`,
      verdict: 'false',
      explanation: `The condition happened, so by the rule the outcome (${e2.cond}) must have followed. Claiming it did not happen contradicts the premises. False.`,
    }),
  },
  {
    id: 'affirm-consequent', difficulty: 'medium',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e2.past}.`],
      prompt: `${e1.past}.`,
      verdict: 'cannot',
      explanation: `The rule only runs one way. The outcome (${e2.cond}) may have happened for a completely different reason — the premises do not say it ONLY happens when ${e1.cond}. Insufficient Information.`,
    }),
  },
  {
    id: 'deny-antecedent', difficulty: 'medium',
    build: (e1, e2) => ({
      premises: [`If ${e1.cond}, then ${e2.cond}.`, `${e1.negPast}.`],
      prompt: `${e2.negPast}.`,
      verdict: 'cannot',
      explanation: `The rule says what happens IF ${e1.cond} — it says nothing about what happens when it does not. The outcome could still have occurred another way. Insufficient Information.`,
    }),
  },
  {
    id: 'chain-ponens', difficulty: 'medium',
    build: (e1, e2, e3) => ({
      premises: [
        `If ${e1.cond}, then ${e2.cond}.`,
        `If ${e2.cond}, then ${e3.cond}.`,
        `${e1.past}.`,
      ],
      prompt: `${e3.past}.`,
      verdict: 'true',
      explanation: `Chain the two rules: ${e1.cond} forces ${e2.cond}, which in turn forces ${e3.cond}. The first condition happened, so the final outcome must have followed. True.`,
    }),
  },
  {
    id: 'chain-tollens', difficulty: 'hard',
    build: (e1, e2, e3) => ({
      premises: [
        `If ${e1.cond}, then ${e2.cond}.`,
        `If ${e2.cond}, then ${e3.cond}.`,
        `${e3.negPast}.`,
      ],
      prompt: `${e1.past}.`,
      verdict: 'false',
      explanation: `Work backwards: had ${e1.cond}, then ${e2.cond}, and then ${e3.cond} — but the final outcome did not happen. So the first condition cannot have happened. False.`,
    }),
  },
  {
    id: 'chain-middle-trap', difficulty: 'hard',
    build: (e1, e2, e3) => ({
      premises: [
        `If ${e1.cond}, then ${e2.cond}.`,
        `If ${e2.cond}, then ${e3.cond}.`,
        `${e2.past}.`,
      ],
      prompt: `${e1.past}.`,
      verdict: 'cannot',
      explanation: `${e2.past} guarantees the FORWARD step (${e3.cond}), but it does not prove what caused it — ${e2.cond} may have happened without ${e1.cond}. Insufficient Information.`,
    }),
  },
  {
    id: 'only-if', difficulty: 'hard',
    build: (e1, e2) => ({
      premises: [`${capitalize(e2.cond)} only if ${e1.cond}.`, `${e2.past}.`],
      prompt: `${e1.past}.`,
      verdict: 'true',
      explanation: `"Only if" makes the second clause a REQUIREMENT of the first — the outcome cannot happen without it. The outcome did happen, so the requirement must have been met. True.`,
    }),
  },
];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// "Unless" needs a BLOCKING event, not a chain — its own scenario pool.
// Premise: "<outcome> unless <blocker>." Each entry hand-writes the past forms.
const UNLESS_PAIRS: { outcome: Ev; blocker: Ev }[] = [
  {
    outcome: { cond: 'the weekly demo goes ahead', past: 'The weekly demo went ahead', negPast: 'The weekly demo did not go ahead' },
    blocker: { cond: 'the client cancels', past: 'The client cancelled', negPast: 'The client did not cancel' },
  },
  {
    outcome: { cond: 'the shipment leaves on Friday', past: 'The shipment left on Friday', negPast: 'The shipment did not leave on Friday' },
    blocker: { cond: 'customs holds it for inspection', past: 'Customs held it for inspection', negPast: 'Customs did not hold it for inspection' },
  },
  {
    outcome: { cond: 'the town hall is held on Monday', past: 'The town hall was held on Monday', negPast: 'The town hall was not held on Monday' },
    blocker: { cond: 'the CEO is travelling', past: 'The CEO was travelling', negPast: 'The CEO was not travelling' },
  },
  {
    outcome: { cond: 'the release ships on schedule', past: 'The release shipped on schedule', negPast: 'The release did not ship on schedule' },
    blocker: { cond: 'a critical bug is found', past: 'A critical bug was found', negPast: 'No critical bug was found' },
  },
  {
    outcome: { cond: 'the store opens at nine', past: 'The store opened at nine', negPast: 'The store did not open at nine' },
    blocker: { cond: 'the stock delivery is late', past: 'The stock delivery was late', negPast: 'The stock delivery was not late' },
  },
  {
    outcome: { cond: 'the quarterly review takes place', past: 'The quarterly review took place', negPast: 'The quarterly review did not take place' },
    blocker: { cond: 'the auditors request a delay', past: 'The auditors requested a delay', negPast: 'The auditors did not request a delay' },
  },
];

/** "<Outcome> unless <blocker>. <Outcome> did not happen." ⇒ blocker happened. */
function genUnless(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion {
  const next = rng(hashDeductive(qid));
  const { outcome, blocker } = pick(UNLESS_PAIRS, next);
  const variant = next() < 0.5;
  if (variant) {
    return tfcQuestion(qid, difficulty, 'Conditional argument',
      [`${capitalize(outcome.cond)} unless ${blocker.cond}.`, `${outcome.negPast}.`],
      `${blocker.past}.`,
      'true',
      `"Unless" means the outcome (${outcome.cond}) happens in every case EXCEPT when ${blocker.cond}. The outcome did not happen, so the exception must have occurred. True.`);
  }
  return tfcQuestion(qid, difficulty, 'Conditional argument',
    [`${capitalize(outcome.cond)} unless ${blocker.cond}.`, `${blocker.negPast}.`],
    `${outcome.past}.`,
    'true',
    `"Unless" guarantees the outcome in every case except when ${blocker.cond} — and that exception did not occur. So the outcome must have gone ahead. True.`);
}

function genConditional(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion {
  const next = rng(hashDeductive(qid));
  // Hard papers mix in the "unless" construction alongside the chain forms.
  if (difficulty === 'hard' && next() < 0.25) return genUnless(qid, difficulty);
  const forms = COND_FORMS.filter((f) => f.difficulty === difficulty);
  const form = pick(forms, next);
  const [e1, e2, e3] = pick(EVENT_CHAINS, next);
  const built = form.build(e1, e2, e3);
  return tfcQuestion(qid, difficulty, 'Conditional argument', built.premises, built.prompt, built.verdict, built.explanation);
}

/* ========================================================================== *
 * Family 3 — Ranking / ordering (verdicts checked by full enumeration)
 * ========================================================================== */

type OrdConstraint =
  | { k: 'above'; a: number; b: number }
  | { k: 'adjacent'; a: number; b: number } // a immediately above b
  | { k: 'at'; a: number; pos: number };

type OrdStatement =
  | { k: 'above'; a: number; b: number }
  | { k: 'at'; a: number; pos: number }
  | { k: 'adjacent'; a: number; b: number };

function permutations(n: number): number[][] {
  const out: number[][] = [];
  const arr = Array.from({ length: n }, (_, i) => i);
  const recur = (current: number[], rest: number[]) => {
    if (!rest.length) {
      out.push(current);
      return;
    }
    for (let i = 0; i < rest.length; i += 1) {
      recur([...current, rest[i]], rest.filter((_, j) => j !== i));
    }
  };
  recur([], arr);
  return out;
}

const PERMS_CACHE: Record<number, number[][]> = {};

function allPerms(n: number): number[][] {
  if (!PERMS_CACHE[n]) PERMS_CACHE[n] = permutations(n);
  return PERMS_CACHE[n];
}

/** perm[pos] = person index at that position (pos 0 = top / first). */
function posOf(perm: number[], person: number): number {
  return perm.indexOf(person);
}

function satisfies(perm: number[], c: OrdConstraint | OrdStatement): boolean {
  if (c.k === 'above') return posOf(perm, c.a) < posOf(perm, c.b);
  if (c.k === 'adjacent') return posOf(perm, c.b) - posOf(perm, c.a) === 1;
  return posOf(perm, c.a) === c.pos;
}

function constraintText(c: OrdConstraint, names: string[], rel: string): string {
  if (c.k === 'above') return `${names[c.a]} ${rel} ${names[c.b]}.`;
  if (c.k === 'adjacent') return `${names[c.a]} ${rel} ${names[c.b]}, with no one between them.`;
  return `${names[c.a]} placed ${ORDINALS[c.pos]}.`;
}

function statementText(s: OrdStatement, names: string[], rel: string): string {
  if (s.k === 'above') return `${names[s.a]} ${rel} ${names[s.b]}.`;
  if (s.k === 'adjacent') return `${names[s.a]} ${rel} ${names[s.b]}, with no one between them.`;
  return `${names[s.a]} placed ${ORDINALS[s.pos]}.`;
}

function orderWords(perm: number[], names: string[]): string {
  return perm.map((p) => names[p]).join(' → ');
}

function genOrdering(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion | null {
  const next = rng(hashDeductive(qid));
  const n = difficulty === 'easy' ? 4 : 5;
  const names = pickN(NAMES, n, next);
  const metric = pick(RANK_METRICS, next);
  const truth = shuffle(Array.from({ length: n }, (_, i) => i), next);

  // Build constraints that the ground truth satisfies. Easy: pin more down.
  const constraintCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 3 : 4;
  const constraints: OrdConstraint[] = [];
  const usedPairs = new Set<string>();
  let guard = 0;
  while (constraints.length < constraintCount && guard < 60) {
    guard += 1;
    const roll = next();
    let c: OrdConstraint;
    if (roll < (difficulty === 'easy' ? 0.35 : 0.2)) {
      const pos = Math.floor(next() * n);
      c = { k: 'at', a: truth[pos], pos };
    } else if (roll < 0.55) {
      const pos = Math.floor(next() * (n - 1));
      c = { k: 'adjacent', a: truth[pos], b: truth[pos + 1] };
    } else {
      const i = Math.floor(next() * (n - 1));
      const j = i + 1 + Math.floor(next() * (n - 1 - i));
      c = { k: 'above', a: truth[i], b: truth[j] };
    }
    // One constraint per pair (an "above" plus an "adjacent" on the same pair
    // is redundant) and one position pin per person.
    const key = c.k === 'at' ? `at:${c.a}` : `pair:${Math.min(c.a, c.b)}:${Math.max(c.a, c.b)}`;
    if (usedPairs.has(key)) continue;
    usedPairs.add(key);
    constraints.push(c);
  }

  const consistent = allPerms(n).filter((perm) => constraints.every((c) => satisfies(perm, c)));
  if (!consistent.length) return null; // should not happen — truth satisfies all
  // Hard questions should have genuine slack; easy ones can be tight or loose.
  if (difficulty === 'hard' && consistent.length < 2) return null;

  // Candidate statements, evaluated across every consistent order.
  const candidates: OrdStatement[] = [];
  for (let a = 0; a < n; a += 1) {
    for (let b = 0; b < n; b += 1) {
      if (a !== b) candidates.push({ k: 'above', a, b });
    }
    for (let pos = 0; pos < n; pos += 1) candidates.push({ k: 'at', a, pos });
  }
  for (let a = 0; a < n; a += 1) {
    for (let b = 0; b < n; b += 1) {
      if (a !== b) candidates.push({ k: 'adjacent', a, b });
    }
  }

  const verdictOf = (s: OrdStatement): Verdict => {
    let allTrue = true;
    let allFalse = true;
    for (const perm of consistent) {
      if (satisfies(perm, s)) allFalse = false;
      else allTrue = false;
      if (!allTrue && !allFalse) break;
    }
    return allTrue ? 'true' : allFalse ? 'false' : 'cannot';
  };

  // Skip statements that literally restate a premise.
  const premiseKeys = new Set(constraints.map((c) => JSON.stringify(c)));
  const pool = shuffle(candidates, next).filter((s) => !premiseKeys.has(JSON.stringify(s)));

  const targetOrder: Verdict[] = shuffle(['true', 'false', 'cannot'] as Verdict[], next);
  let chosen: { s: OrdStatement; verdict: Verdict } | null = null;
  for (const target of targetOrder) {
    for (const s of pool) {
      const v = verdictOf(s);
      if (v === target) {
        chosen = { s, verdict: v };
        break;
      }
    }
    if (chosen) break;
  }
  if (!chosen) return null;

  const premises = [
    `${n === 4 ? 'Four' : 'Five'} management trainees — ${names.join(', ')} — ${metric.intro}.`,
    ...constraints.map((c) => constraintText(c, names, metric.rel)),
  ];
  const prompt = statementText(chosen.s, names, metric.rel);

  let explanation: string;
  if (chosen.verdict === 'true') {
    explanation = `Every ranking consistent with the premises (for example ${orderWords(consistent[0], names)}) satisfies the statement — it is forced by the constraints. True.`;
  } else if (chosen.verdict === 'false') {
    explanation = `In every ranking consistent with the premises (for example ${orderWords(consistent[0], names)}) the statement fails — it contradicts the constraints. False.`;
  } else {
    const yes = consistent.find((perm) => satisfies(perm, chosen!.s));
    const no = consistent.find((perm) => !satisfies(perm, chosen!.s));
    explanation = `The premises allow more than one ranking. In ${orderWords(yes as number[], names)} the statement holds, but in ${orderWords(no as number[], names)} it does not — so it cannot be settled either way. Insufficient Information.`;
  }

  return tfcQuestion(qid, difficulty, 'Ranking & ordering', premises, prompt, chosen.verdict, explanation);
}

/* ========================================================================== *
 * Family 4 — Numeric relationships (computed, FruitBar style at hard level)
 * ========================================================================== */

function money(v: number): string {
  const rounded = Math.round(v * 100) / 100;
  return Number.isInteger(rounded) ? `£${rounded}` : `£${rounded.toFixed(2)}`;
}

function plural(name: string): string {
  return name.endsWith('s') ? `${name}es` : `${name}s`;
}

function genNumeric(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion | null {
  const next = rng(hashDeductive(qid));
  const set = pick(PRODUCT_SETS, next);

  if (difficulty === 'easy') {
    // b = k × a, a known. Statement about m × b.
    const k = pick([2, 3, 4], next);
    const aPrice = pick([5, 8, 10, 12, 15, 20, 25], next);
    const m = pick([2, 3], next);
    const trueTotal = m * k * aPrice;
    const mode = pick(['true', 'false', 'cannot'] as Verdict[], next);
    const premises = [
      `A ${set.b} costs ${k} times as much as a ${set.a}.`,
      `A ${set.a} costs ${money(aPrice)}.`,
    ];
    if (mode === 'cannot') {
      return tfcQuestion(qid, difficulty, 'Numeric deduction', premises,
        `A ${set.bundle} costs less than ${money(trueTotal)}.`,
        'cannot',
        `The premises price the ${set.a} and the ${set.b}, but say nothing at all about the ${set.bundle}. Its price cannot be worked out from the information given. Insufficient Information.`);
    }
    const shown = mode === 'true' ? trueTotal : trueTotal + pick([aPrice, k * 2, 10], next);
    return tfcQuestion(qid, difficulty, 'Numeric deduction', premises,
      `${m === 2 ? 'Two' : 'Three'} ${plural(set.b)} cost ${money(shown)} in total.`,
      mode,
      `A ${set.b} costs ${k} × ${money(aPrice)} = ${money(k * aPrice)}, so ${m} of them cost ${m} × ${money(k * aPrice)} = ${money(trueTotal)}. The statement says ${money(shown)}, so it is ${mode === 'true' ? 'true' : 'false'}.`);
  }

  if (difficulty === 'medium') {
    // Bundle = 2a + 2b − discount; a and ratio known.
    const k = pick([2, 3], next);
    const aPrice = pick([6, 8, 10, 12, 15], next);
    const bPrice = k * aPrice;
    const discount = pick([4, 5, 10], next);
    const bundlePrice = 2 * aPrice + 2 * bPrice - discount;
    const mode = pick(['true', 'false'] as Verdict[], next);
    const shown = mode === 'true' ? bundlePrice : bundlePrice + pick([discount, aPrice, 6], next);
    return tfcQuestion(qid, difficulty, 'Numeric deduction', [
      `A ${set.b} costs ${k} times as much as a ${set.a}.`,
      `A ${set.a} costs ${money(aPrice)}.`,
      `A ${set.bundle} contains two ${plural(set.a)} and two ${plural(set.b)} and costs ${money(discount)} less than buying them individually.`,
    ],
      `A ${set.bundle} costs ${money(shown)}.`,
      mode,
      `A ${set.b} costs ${k} × ${money(aPrice)} = ${money(bPrice)}. Bought individually, two of each cost 2 × ${money(aPrice)} + 2 × ${money(bPrice)} = ${money(2 * aPrice + 2 * bPrice)}. Take off the ${money(discount)} bundle saving: ${money(bundlePrice)}. The statement says ${money(shown)}, so it is ${mode === 'true' ? 'true' : 'false'}.`);
  }

  // Hard: simultaneous equations, exactly like the booklet's FruitBar item.
  // bundle = k × a  AND  bundle = 2a + 2b − d, with b known ⇒ a = (2b − d) / (k − 2).
  const k = pick([4, 6], next);
  const bPrice = pick([1.25, 1.5, 1.75, 2, 2.5, 3], next);
  const d = pick([0.5, 1], next);
  const aPrice = (2 * bPrice - d) / (k - 2);
  if (aPrice <= 0 || Math.round(aPrice * 20) !== aPrice * 20) return null; // keep to 5p amounts
  const m = pick([2, 3, 4], next);
  const trueTotal = m * aPrice;
  const mode = pick(['true', 'false', 'cannot'] as Verdict[], next);
  const kWords = k === 6 ? 'twice as much as three' : 'twice as much as two';
  const premises = [
    `A ${set.bundle} costs ${kWords} ${plural(set.a)}.`,
    `A ${set.bundle} contains two ${plural(set.a)} and two ${plural(set.b)} and is ${money(d)} cheaper than buying the ${plural(set.unit)} individually.`,
    `A ${set.b} costs ${money(bPrice)}.`,
  ];
  if (mode === 'cannot') {
    return tfcQuestion(qid, difficulty, 'Numeric deduction', premises,
      `More ${plural(set.a)} are sold than ${plural(set.b)}.`,
      'cannot',
      `The premises fix the PRICES of the items, but give no sales figures of any kind — how many of each are sold cannot be deduced. Insufficient Information.`);
  }
  const shown = mode === 'true' ? trueTotal : trueTotal + pick([0.25, 0.5, aPrice], next);
  const mWord = m === 2 ? 'Two' : m === 3 ? 'Three' : 'Four';
  return tfcQuestion(qid, difficulty, 'Numeric deduction', premises,
    `${mWord} ${plural(set.a)} cost ${money(shown)} in total.`,
    mode,
    `Write the ${set.bundle} two ways: ${set.bundle} = ${k}×${set.a}, and ${set.bundle} = 2×${set.a} + 2×${set.b} − ${money(d)}. Setting them equal: ${k}×${set.a} = 2×${set.a} + 2×${money(bPrice)} − ${money(d)}, so ${k - 2}×${set.a} = ${money(2 * bPrice - d)}, giving ${set.a} = ${money(aPrice)}. Then ${m} ${plural(set.a)} cost ${money(trueTotal)}. The statement says ${money(shown)}, so it is ${mode === 'true' ? 'true' : 'false'}.`);
}

/* ========================================================================== *
 * Family 5 — Plan selection tables (five options A–E)
 * ========================================================================== */

function genSelection(qid: string, difficulty: DeductiveDifficulty): DeductiveExpandedQuestion | null {
  const next = rng(hashDeductive(qid));
  const planNames = pick(PLAN_NAME_SETS, next);
  const context = pick(PLAN_CONTEXTS, next);

  // Build 5 plans with distinct prices.
  const deviceCaps = shuffle([2, 4, 6, 8, 10], next);
  const prices = shuffle([12.5, 16, 19.5, 22, 26.5, 31, 35.5, 40], next).slice(0, 5);
  const terms = Array.from({ length: 5 }, () => pick([12, 24], next));
  const plans = planNames.map((name, i) => ({
    name,
    devices: deviceCaps[i],
    price: prices[i],
    term: terms[i],
  }));

  const needDevices = pick([3, 4, 5, 6, 7], next);
  const needShortTerm = difficulty !== 'easy' && next() < 0.55;

  const qualifying = plans.filter(
    (p) => p.devices >= needDevices && (!needShortTerm || p.term === 12),
  );
  if (qualifying.length < 2) return null;

  const useTotalCost = difficulty === 'hard' && next() < 0.6;
  const costOf = (p: { price: number; term: number }) => (useTotalCost ? p.price * p.term : p.price);
  const sorted = qualifying.slice().sort((a, b) => costOf(a) - costOf(b));
  if (costOf(sorted[0]) === costOf(sorted[1])) return null; // must be a unique winner
  const winner = sorted[0];

  const premises = [
    `A provider offers five ${context.thing}:`,
    ...plans.map(
      (p) =>
        `${p.name}: up to ${p.devices} ${context.per}, ${money(p.price)} per month, ${p.term}-month contract.`,
    ),
  ];

  const who = pick(
    [
      `A team needs cover for ${needDevices} ${context.per}`,
      `A small office needs at least ${needDevices} ${context.per} connected`,
      `A department needs ${needDevices} ${context.per} supported`,
    ],
    next,
  );
  const prompt = `${who}${needShortTerm ? ' and cannot commit beyond 12 months' : ''}. ${
    useTotalCost
      ? 'Which plan meets the requirement at the lowest total cost over its full contract?'
      : 'Which plan meets the requirement at the lowest monthly price?'
  }`;

  const explanation = `Plans covering at least ${needDevices} ${context.per}${needShortTerm ? ' on a 12-month contract' : ''}: ${qualifying
    .map((p) => p.name)
    .join(', ')}. ${
    useTotalCost
      ? `Comparing total contract cost (${qualifying.map((p) => `${p.name} ${money(p.price * p.term)}`).join(', ')}), `
      : `Comparing monthly prices (${qualifying.map((p) => `${p.name} ${money(p.price)}`).join(', ')}), `
  }${winner.name} is the cheapest that qualifies.`;

  return {
    kind: 'deductive',
    id: qid,
    difficulty,
    premises,
    prompt,
    options: plans.map((p) => p.name),
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[plans.findIndex((p) => p.name === winner.name)],
    explanation,
    patternName: 'Plan selection',
  };
}

/* ========================================================================== *
 * Public builder — one question per (id, family, difficulty), with retries
 * ========================================================================== */

export type DeductiveFamily = 'syllogism' | 'conditional' | 'ordering' | 'numeric' | 'selection';

export const DEDUCTIVE_FAMILIES: DeductiveFamily[] = [
  'syllogism', 'conditional', 'ordering', 'numeric', 'selection',
];

export function buildDeductiveQuestion(
  qid: string,
  family: DeductiveFamily,
  difficulty: DeductiveDifficulty,
): DeductiveExpandedQuestion {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const seed = attempt === 0 ? qid : `${qid}x${attempt}`;
    let q: DeductiveExpandedQuestion | null = null;
    if (family === 'syllogism') q = genSyllogism(seed, difficulty);
    else if (family === 'conditional') q = genConditional(seed, difficulty);
    else if (family === 'ordering') q = genOrdering(seed, difficulty);
    else if (family === 'numeric') q = genNumeric(seed, difficulty);
    else q = genSelection(seed, difficulty);
    if (q) return { ...q, id: qid };
  }
  // Absolute fallback: syllogisms always build.
  return { ...genSyllogism(`${qid}:safe`, difficulty), id: qid };
}
