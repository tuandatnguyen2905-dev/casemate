import type { VerbalQuestion, VerbalTest } from './verbalReasoning';

// 42 original Assumptions practice tests in the AssessmentDay format: four short
// statements per test, three proposed assumptions per statement, 12 questions in
// 12 minutes. Every statement is a template filled from a workplace context, and
// every assumption carries its own verified key and explanation, so the answer
// can never disagree with the statement. Statement/context pairs are unique
// across the whole set.

type Key = 'M' | 'N';
type Item = [string, Key, string];
type Schema = [string, Item[]];

interface Context {
  O: string;
  P: string;
  M: string;
  T: string;
  G: string;
  K: string;
}

const CONTEXTS: Context[] = [
  { O: 'Lotus Commercial Bank', P: 'a mobile savings app', M: 'Ho Chi Minh City', T: 'the digital team', G: 'young professionals', K: 'new account openings' },
  { O: 'Mekong Beverages', P: 'a low-sugar tea range', M: 'the Mekong Delta', T: 'the sales team', G: 'convenience-store shoppers', K: 'monthly sales volumes' },
  { O: 'An Nam Retail', P: 'a same-day delivery service', M: 'Hanoi', T: 'the operations team', G: 'online shoppers', K: 'repeat orders' },
  { O: 'VietWave Telecom', P: 'a student data plan', M: 'Da Nang', T: 'the marketing team', G: 'university students', K: 'subscriber numbers' },
  { O: 'Harmony Clinics', P: 'an online booking system', M: 'Hue', T: 'the front-desk staff', G: 'outpatients', K: 'patient waiting times' },
  { O: 'Red River Manufacturing', P: 'a new packaging line', M: 'Hai Phong', T: 'the production team', G: 'factory operators', K: 'output levels' },
  { O: 'Saigon Logistics', P: 'a route-planning tool', M: 'Binh Duong', T: 'the dispatch team', G: 'delivery drivers', K: 'late-delivery rates' },
  { O: 'Orchid Fashion', P: 'an eco-friendly clothing line', M: 'Nha Trang', T: 'the design team', G: 'tourists', K: 'store revenue figures' },
  { O: 'Thang Long Academy', P: 'an evening English course', M: 'Can Tho', T: 'the admissions team', G: 'working adults', K: 'course enrolments' },
  { O: 'Sunrise Property', P: 'a show-apartment tour', M: 'Vung Tau', T: 'the sales team', G: 'first-time buyers', K: 'viewing bookings' },
];

const SCHEMAS: Schema[] = [
  ['{O} has decided to introduce {P} in {M} to improve {K}.', [
    ['{P} is expected to have some effect on {K}.', 'M', 'Introducing it in order to improve {K} only makes sense if {O} expects it to have an effect on them.'],
    ['{P} will improve {K} more than any other option {O} considered.', 'N', 'The statement gives the aim, not a comparison with other options. {O} may not have considered any alternative.'],
    ['{G} in {M} are able to use {P}.', 'M', 'The plan can only improve {K} if {G} in {M} can actually use {P}; this is taken for granted.'],
  ]],
  ['{T} at {O} will start sending managers a weekly summary because managers say they lack up-to-date information about {K}.', [
    ['A weekly summary can give managers more up-to-date information than they have now.', 'M', 'The change is the proposed fix, so it is assumed to help.'],
    ['Managers will stop asking {T} for ad hoc updates.', 'N', 'The statement says nothing about what managers will do afterwards; they may still ask.'],
    ['Managers want to be informed about {K}.', 'M', 'Managers complained about missing information on {K}, which assumes they want it.'],
  ]],
  ['Because {G} in {M} are changing how they shop, {O} will move its marketing budget for {P} from print to online advertising.', [
    ['{G} in {M} can be reached through online advertising.', 'M', 'Moving the budget online only makes sense if the audience can be reached there.'],
    ['Print advertising has never worked for {O}.', 'N', 'The move is justified by a change in shopper behaviour, not by past failure of print.'],
    ['Online advertising is expected to be at least as effective as print for reaching {G}.', 'M', 'If {O} expected online to be worse, it would have no reason to move the budget.'],
  ]],
  ['{O} will give {T} a bonus if {K} improve this quarter.', [
    ['{T} can influence {K}.', 'M', 'An incentive linked to {K} assumes the people rewarded can affect them.'],
    ['{T} is currently not working hard enough.', 'N', 'An incentive does not imply current effort is poor; it may simply reward good results.'],
    ['{T} values the bonus.', 'M', 'A bonus only works as an incentive if the people offered it value it.'],
  ]],
  ['The manager at {O} announced that no new hires will be made in {T} until {K} stabilise.', [
    ['{K} are not yet stable.', 'M', 'A freeze lasting until they stabilise assumes they are currently unstable.'],
    ['Existing members of {T} will be made redundant.', 'N', 'A hiring freeze says nothing about dismissals.'],
    ['{K} will stabilise at some point.', 'M', 'Setting stabilisation as the end of the freeze assumes it will happen.'],
  ]],
  ['Customer feedback at {O} shows that {G} in {M} find {P} hard to use, so {T} will simplify the sign-up steps.', [
    ['Simplifying the sign-up steps will make {P} easier to use.', 'M', 'The action is chosen as the remedy, so it is assumed to work.'],
    ['All {G} who find {P} hard to use will switch to a competitor.', 'N', 'The statement does not predict what {G} will do.'],
    ['{T} is able to change the sign-up steps.', 'M', 'A plan to simplify the steps assumes {T} has the ability or authority to do so.'],
  ]],
  ['{O} chose {M} for its next site because rents there are lower than in nearby cities.', [
    ['Lower rents are an advantage for {O}.', 'M', 'Lower rent is given as the reason for the choice, so it is treated as an advantage.'],
    ['{M} has more {G} than any nearby city.', 'N', 'The only reason given is rent; nothing is said about the number of {G}.'],
    ['Rents in {M} will stay lower for the next ten years.', 'N', 'The statement compares current rents; it makes no prediction about the future.'],
  ]],
  ['To reduce errors, {T} at {O} will add a second check before any order is confirmed.', [
    ['A second check is likely to catch errors that the first check misses.', 'M', 'Adding a check only reduces errors if it can catch something that currently gets through.'],
    ['No errors will occur once the second check is added.', 'N', 'The aim is to reduce errors, not to remove them completely.'],
    ['Errors currently occur.', 'M', 'There would be nothing to reduce if errors did not already occur.'],
  ]],
  ['{O} advertises {P} as the fastest choice for {G} in {M}, so it expects {G} to prefer it.', [
    ['{G} in {M} care about speed.', 'M', 'Advertising speed to win preference assumes the audience values speed.'],
    ['{G} in {M} have used no other product.', 'N', 'Nothing in the statement suggests {G} are new to the market.'],
    ['Advertising a feature can influence what {G} prefer.', 'M', 'The expectation that the advert will win preference depends on advertising having some influence.'],
  ]],
  ['{T} at {O} has decided to hold training sessions on Friday afternoons because most staff finish their urgent work by then.', [
    ['Staff are able to attend sessions on Friday afternoons.', 'M', 'Choosing the slot because urgent work is done assumes staff are free to attend.'],
    ['Staff prefer Friday afternoons to any other time.', 'N', 'The reason given is availability, not preference.'],
    ['Training on other days will be cancelled.', 'N', 'The statement concerns where these sessions are held, not other training.'],
  ]],
  ['{O} will survey {G} in {M} before deciding the price of {P}.', [
    ['The views of {G} are useful for deciding the price.', 'M', 'Surveying first only makes sense if the answers will inform the price.'],
    ['The price has not yet been decided.', 'M', 'The decision is described as coming after the survey.'],
    ['{G} in {M} will ask for a lower price.', 'N', 'The survey outcome is unknown; the statement does not predict it.'],
  ]],
  ['Since {P} was launched, {K} at {O} have improved, so {T} credits the launch.', [
    ['{P} is at least partly responsible for the improvement in {K}.', 'M', 'Crediting the launch assumes it contributed to the improvement.'],
    ['{K} will keep improving every month.', 'N', 'The statement describes what has happened so far, not a future trend.'],
    ['{T} played no part in the improvement.', 'N', 'Crediting the launch does not exclude the contribution of {T}.'],
  ]],
  ['{O} plans to open {P} to {G} in {M} in stages, starting with a small trial group.', [
    ['A small trial can reveal problems before a full release.', 'M', 'Staging the release only makes sense if early use shows what needs fixing.'],
    ['The trial group will love {P}.', 'N', 'A trial exists because the outcome is uncertain; satisfaction is not assumed.'],
    ['{O} wants to limit the risk of the full release.', 'M', 'A staged release is a way of limiting risk, which is assumed to be desirable.'],
  ]],
  ['The director of {T} at {O} said: We cannot meet the deadline unless we receive the data by Monday.', [
    ['The data is needed to complete the work.', 'M', 'The deadline depends on the data, so it is treated as necessary.'],
    ['The data will arrive on Monday.', 'N', 'The director states a condition, not a prediction that it will be met.'],
    ['The deadline cannot be moved.', 'N', 'The director says the current deadline is at risk; nothing is said about moving it.'],
  ]],
  ['{O} will compare its prices for {P} with those of other suppliers every month, because it wants {G} to see it as good value.', [
    ['{G} compare prices when choosing a supplier.', 'M', 'Price monitoring to win a good-value image assumes price influences how {G} judge value.'],
    ['Monthly checking will let {O} notice when it becomes more expensive than others.', 'M', 'This is the purpose of regular comparison.'],
    ['{O} will always be the cheapest supplier.', 'N', 'The aim is to be seen as good value, which does not require being the cheapest.'],
  ]],
  ['{T} at {O} has asked every manager to list their top three priorities, so that resources can be shared fairly.', [
    ['Managers can identify their own priorities.', 'M', 'The request assumes managers are able to name their priorities.'],
    ['Resources are limited.', 'M', 'There would be no need to share resources fairly if there were enough for everything.'],
    ['All three priorities of every manager will be funded.', 'N', 'Limited resources are being shared, so funding everything cannot be assumed.'],
  ]],
  ['As more {G} in {M} use smartphones, {O} will build a mobile version of {P}.', [
    ['{G} in {M} will use the mobile version.', 'M', 'Building it in response to smartphone use assumes {G} will make use of it.'],
    ['Everyone in {M} owns a smartphone.', 'N', 'The statement only says more {G} are using smartphones, not all of them.'],
    ['{O} will close its website.', 'N', 'Adding a mobile version does not imply closing anything.'],
  ]],
  ['{O} says that {P} is safe for {G}, because it has passed every test required by law.', [
    ['Passing the tests required by law is relevant to whether {P} is safe.', 'M', 'The reason offered only supports the claim if the tests bear on safety.'],
    ['{P} will never need to be tested again.', 'N', 'The statement concerns tests already passed, not future testing.'],
    ['{G} do not care whether {P} is safe.', 'N', 'The claim is made to reassure {G}, which suggests the opposite.'],
  ]],
  ['{T} at {O} has proposed shortening the monthly report from twenty pages to five so that more people read it.', [
    ['Some people do not read the report now because it is long.', 'M', 'Shortening it to widen readership assumes length is a barrier.'],
    ['Five pages can contain the key information.', 'M', 'The proposal only makes sense if the short version remains useful.'],
    ['Nobody currently reads the report.', 'N', 'The aim is that more people read it, which implies some already do.'],
  ]],
  ['{O} tested {P} with a sample of {G} in {M} and concluded that most {G} will like it.', [
    ['The sample is representative of {G}.', 'M', 'Generalising from a sample to all {G} assumes the sample reflects them.'],
    ['Every member of the sample liked {P}.', 'N', 'The conclusion refers to most people, which allows for some who did not like it.'],
    ['{P} will not need any changes after launch.', 'N', 'Liking the product in a test does not mean it cannot be improved.'],
  ]],
  ['Because {K} fell last month, {T} at {O} will review its processes.', [
    ['Reviewing processes may reveal the cause of the fall.', 'M', 'A review is chosen as the response, which assumes it can identify the problem.'],
    ['The fall in {K} was entirely the fault of {T}.', 'N', 'A process review does not assign blame to one team.'],
    ['{T} wants {K} to recover.', 'M', 'Acting in response to the fall assumes that recovery is wanted.'],
  ]],
  ['{O} has promised {G} in {M} a reply within one working day, and {T} has been told to meet the promise.', [
    ['{T} is capable of replying within one working day.', 'M', 'Instructing {T} to meet the promise assumes it is achievable.'],
    ['{G} will contact {O} more often than before.', 'N', 'The promise is about reply times, not contact volume.'],
    ['A prompt reply is something {G} value.', 'M', 'Making such a promise to {G} assumes they value speed of reply.'],
  ]],
  ['{O} will stop selling {P} in {M} because it has not met its targets.', [
    ['Targets are an appropriate way to judge {P}.', 'M', 'Stopping because of missed targets treats the targets as a fair standard.'],
    ['{P} will never succeed anywhere.', 'N', 'The decision concerns {M} only.'],
    ['{O} will stop selling {P} everywhere else.', 'N', 'Nothing is said about other places.'],
  ]],
  ['Only {G} who register in advance will be admitted to the {O} open day, so that the numbers can be managed.', [
    ['There is a limit to how many people can be managed at once.', 'M', 'Managing numbers by registration assumes capacity is limited.'],
    ['Registration gives {O} an idea of how many will come.', 'M', 'This is how registration helps manage numbers.'],
    ['Fewer {G} will attend than in previous years.', 'N', 'The statement says nothing about past attendance.'],
  ]],
];

const MADE = 'Assumption Made';
const NOT_MADE = 'Assumption Not Made';
const TEST_COUNT = 42;
const SOURCE = 'Casemate original';

function fill(template: string, context: Context): string {
  const text = template.replace(/\{([OPMTGK])\}/g, (_match, key: keyof Context) => context[key]);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testIndex: number): VerbalTest {
  const questions: VerbalQuestion[] = [];
  let number = 0;
  for (let slot = 0; slot < 4; slot += 1) {
    const k = testIndex * 4 + slot;
    const schemaIndex = k % SCHEMAS.length;
    const context = CONTEXTS[(Math.floor(k / SCHEMAS.length) + schemaIndex * 3) % CONTEXTS.length];
    const [statement, items] = SCHEMAS[schemaIndex];
    const rotation = k % items.length;
    const ordered = items.slice(rotation).concat(items.slice(0, rotation));
    const passage = fill(statement, context);
    ordered.forEach((item, itemIndex) => {
      number += 1;
      const answer = item[1] === 'M' ? MADE : NOT_MADE;
      questions.push({
        kind: 'verbal',
        id: `ct-gen-${testIndex + 1}-q${pad2(number)}`,
        difficulty: 'mixed',
        passage,
        passageLabel: 'Statement',
        promptLabel: `Proposed assumption ${itemIndex + 1} of ${ordered.length}`,
        prompt: fill(item[0], context),
        options: [MADE, NOT_MADE],
        optionLabels: [MADE, NOT_MADE],
        correctAnswer: answer,
        explanation: `Correct answer: ${answer}.\n\n${fill(item[2], context)}`,
        patternName: `${SOURCE} Assumptions Practice Test ${testIndex + 1} - statement ${slot + 1}`,
        sourceOrganization: SOURCE,
        sourceQuestionNumber: number,
        answerKeySource: 'derived',
        hint: 'Ask whether the statement only works if the proposed assumption is true. An assumption is made when it is taken for granted; it is not made when the statement merely allows it, goes beyond it, or never mentions it.',
      } as VerbalQuestion);
    });
  }
  return {
    id: `ct-gen-${testIndex + 1}`,
    name: `Assumptions Practice Test ${testIndex + 1}`,
    subtitle: `CT-${pad2(testIndex + 1)} \u00b7 ${questions.length} questions`,
    description: 'Critical thinking in the AssessmentDay format: read a short statement, then decide for each of three proposed assumptions whether the statement takes it for granted (Assumption Made) or not (Assumption Not Made). Judge each one on its own and use only the statement. Every question has a written explanation.',
    difficulty: 'mixed',
    timeLimitSeconds: 12 * 60,
    questions,
    sourceOrganization: SOURCE,
    answerKeySource: 'derived',
  } as VerbalTest;
}

let cache: VerbalTest[] | null = null;

export function loadGeneratedCriticalThinkingTests(): VerbalTest[] {
  if (!cache) {
    cache = Array.from({ length: TEST_COUNT }, (_, index) => buildTest(index));
  }
  return cache;
}
