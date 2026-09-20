// Casemate — Verbal Reasoning: 30 tests × 30 original questions.
//
// The supplied AssessmentDay references use a 25-minute paper made from short
// passages followed by True / False / Cannot Say statements. This library
// mirrors that contract with six 150–250 word passages per test and five
// statements per passage. Facts, entities and figures are generated
// deterministically from the test number, giving 180 distinct passages and 900
// distinct statements while keeping every answer auditable from its passage.

export type VerbalDifficulty = 'easy' | 'medium' | 'hard';
export type VerbalAnswer = 'True' | 'False' | 'Cannot Say';

export interface VerbalQuestion {
  kind: 'verbal';
  id: string;
  difficulty: VerbalDifficulty;
  passage: string;
  prompt: string;
  options: VerbalAnswer[];
  optionLabels: VerbalAnswer[];
  correctAnswer: VerbalAnswer;
  explanation: string;
  patternName: string;
}

export interface VerbalTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  timeLimitSeconds: number;
  questions: VerbalQuestion[];
}

export const VERBAL_TEST_COUNT = 30;
export const VERBAL_QUESTIONS_PER_TEST = 30;
export const VERBAL_TIME_LIMIT_SECONDS = 1500;

const ANSWERS: VerbalAnswer[] = ['True', 'False', 'Cannot Say'];
const DIFFICULTIES: VerbalDifficulty[][] = [
  ['easy', 'easy', 'medium', 'medium', 'hard'],
  ['easy', 'medium', 'medium', 'hard', 'hard'],
  ['easy', 'easy', 'medium', 'hard', 'hard'],
  ['easy', 'medium', 'medium', 'medium', 'hard'],
  ['easy', 'easy', 'medium', 'medium', 'hard'],
  ['easy', 'medium', 'medium', 'hard', 'hard'],
];

const ORGANISATIONS = [
  'Lotus Retail', 'Mekong Mobile', 'An Phu Foods', 'Viet Horizon Bank', 'Blue River Logistics',
  'Sunrise Health', 'Red Bridge Consumer', 'Green Delta Energy', 'Nova Commerce', 'Golden Field Dairy',
  'HarbourTech', 'Bamboo Finance', 'Central Star Manufacturing', 'Cloud Nine Services', 'Saigon Fresh',
  'Northwind Electronics', 'Pacific Homecare', 'Everlight Insurance', 'Dragon Gate Mobility', 'Emerald Textiles',
  'Cedar Analytics', 'Orchid Pharmacy', 'Silver Coast Seafood', 'Pioneer Payments', 'Morning Star Coffee',
  'Unity Telecom', 'Riverstone Materials', 'Bright Path Education', 'Atlas Advisory', 'Lighthouse Aviation',
];

const LOCATIONS = [
  'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Can Tho', 'Hai Phong', 'Binh Duong', 'Dong Nai', 'Hue',
  'Quang Ninh', 'Bac Ninh', 'Nha Trang', 'Vung Tau', 'Long An', 'Thai Nguyen', 'Thanh Hoa',
  'Nghe An', 'Quang Nam', 'Lam Dong', 'Kien Giang', 'Binh Dinh', 'Hai Duong', 'Phu Tho',
  'Tay Ninh', 'Ben Tre', 'An Giang', 'Quang Ngai', 'Ha Nam', 'Nam Dinh', 'Dak Lak', 'Soc Trang',
];

interface PassageSet {
  passage: string;
  topic: string;
  statements: Array<{ text: string; answer: VerbalAnswer; explanation: string }>;
}

function n(test: number, group: number, base: number, span: number): number {
  return base + ((test * 17 + group * 23) % span);
}

function organisation(test: number, group: number): string {
  return ORGANISATIONS[(test - 1 + group * 7) % ORGANISATIONS.length];
}

function location(test: number, group: number): string {
  return LOCATIONS[(test * 3 + group * 11) % LOCATIONS.length];
}

function retailPassage(test: number): PassageSet {
  const company = organisation(test, 0);
  const city = location(test, 0);
  const stores = n(test, 0, 18, 43);
  const newStores = n(test, 1, 4, 9);
  const online = n(test, 2, 21, 26);
  const target = online + n(test, 3, 5, 9);
  const privateLabel = n(test, 4, 11, 14);
  const passage = `${company} operates ${stores} neighbourhood stores in ${city} and nearby provinces. During the latest financial year, revenue grew despite a small decline in customer visits because the average basket became larger. Management attributes part of that increase to a redesigned loyalty programme, although it has not isolated the programme’s effect from inflation. Online orders represented ${online}% of sales, compared with a target of ${target}%. The company will open ${newStores} compact outlets next year, all beside public-transport routes, while closing two oversized stores whose leases expire. Compact outlets carry fewer imported brands but devote more shelf space to fresh food and the company’s private-label range, which currently contributes ${privateLabel}% of revenue. A six-month pilot found that compact outlets used less electricity per transaction than conventional stores. However, the pilot covered only urban sites, so management has not claimed that the same saving would occur in rural provinces. Suppliers will continue delivering directly to large stores; compact outlets will be replenished from a shared distribution centre. The board approved the expansion without publishing a forecast for next year’s total profit.`;
  return {
    passage,
    topic: 'Retail strategy',
    statements: [
      { text: `${company} recorded revenue growth even though customer visits fell slightly.`, answer: 'True', explanation: 'The passage directly states that revenue grew while visits declined slightly.' },
      { text: `Online orders met or exceeded ${company}’s sales target.`, answer: 'False', explanation: `Online sales were ${online}%, below the ${target}% target.` },
      { text: `${company} will have exactly ${stores + newStores - 2} stores after next year’s changes.`, answer: 'Cannot Say', explanation: 'The passage gives planned openings and two lease closures, but does not say that no other openings or closures will occur.' },
      { text: `Every new compact outlet will be located beside a public-transport route.`, answer: 'True', explanation: 'The passage says all planned compact outlets will be beside public-transport routes.' },
      { text: `Compact outlets use less electricity per transaction in rural provinces.`, answer: 'Cannot Say', explanation: 'The energy pilot covered only urban sites, and management did not extend the finding to rural areas.' },
    ],
  };
}

function bankingPassage(test: number): PassageSet {
  const bank = organisation(test, 1);
  const city = location(test, 1);
  const digital = n(test, 2, 54, 31);
  const branch = n(test, 3, 13, 18);
  const fraud = n(test, 4, 7, 12);
  const wait = n(test, 5, 9, 8);
  const passage = `${bank}, a mid-sized financial institution headquartered in ${city}, has shifted routine service from counters to its mobile application. In the second quarter, ${digital}% of active retail customers used the app at least once, while branch transactions fell by ${branch}% from the same quarter a year earlier. The figures do not show whether app users stopped visiting branches entirely. A new identity check asks customers to combine a password with a one-time code. Since its introduction, confirmed account-takeover cases have declined by ${fraud}%, but attempted fraud has increased. The bank says the two trends can coexist because more attempts are being blocked before any money leaves an account. It has not compared its fraud rate with that of other banks. Rather than closing branches, ${bank} is converting selected sites into advisory centres for mortgages and small-business lending. A pilot centre reduced the median appointment wait to ${wait} minutes, although customer satisfaction was not measured. Employees whose counter roles disappear are offered training for advisory or remote-support positions; the bank does not guarantee that every participant will pass the training. Regulators have approved the identity check, but they have not endorsed the wider branch-conversion programme.`;
  return {
    passage,
    topic: 'Digital banking',
    statements: [
      { text: `More than half of ${bank}’s active retail customers used its app in the second quarter.`, answer: 'True', explanation: `${digital}% is more than half.` },
      { text: `The decline in branch transactions proves that app users stopped visiting branches.`, answer: 'False', explanation: 'The passage explicitly says the figures do not show that app users stopped visiting branches entirely.' },
      { text: `${bank} has a lower fraud rate than every competing bank.`, answer: 'Cannot Say', explanation: 'No comparison with other banks was made.' },
      { text: `Confirmed account-takeover cases fell after the new identity check was introduced.`, answer: 'True', explanation: `Confirmed cases declined by ${fraud}%.` },
      { text: `Every employee offered retraining will move into an advisory or remote-support role.`, answer: 'Cannot Say', explanation: 'The bank does not guarantee that every participant will pass the training.' },
    ],
  };
}

function manufacturingPassage(test: number): PassageSet {
  const company = organisation(test, 2);
  const province = location(test, 2);
  const output = n(test, 1, 72, 35);
  const recycled = n(test, 2, 28, 29);
  const energy = n(test, 3, 8, 11);
  const defect = n(test, 4, 14, 14) / 10;
  const passage = `${company} manufactures household components at a plant in ${province}. The factory ran at ${output}% of rated capacity last year, with monthly output highest in the final quarter. Capacity utilisation alone does not reveal whether the plant was profitable because the company has not disclosed unit margins. To reduce exposure to imported raw materials, purchasing managers signed two-year contracts with three domestic suppliers. Those suppliers currently provide ${recycled}% of the aluminium used at the site, and all of that material contains recycled content. Imported aluminium remains necessary for one high-strength product line. Rooftop solar panels supplied ${energy}% of the plant’s electricity during daylight hours, but the factory still drew power from the grid at night and during heavy cloud. A new inspection camera reduced the share of finished items requiring rework to ${defect.toFixed(1)}%. The previous rework rate was higher, although the exact figure was not published. No production workers were dismissed when the camera was installed; several inspectors moved to maintenance and process-improvement roles. ${company} plans to test a second camera on the packaging line before deciding whether to automate inspections at its other factories.`;
  return {
    passage,
    topic: 'Manufacturing operations',
    statements: [
      { text: `${company} used some imported aluminium last year.`, answer: 'True', explanation: 'Imported aluminium remained necessary for a high-strength product line.' },
      { text: `Solar panels supplied all electricity used by the plant during daylight hours.`, answer: 'False', explanation: `They supplied ${energy}% during daylight hours, not all electricity.` },
      { text: `The plant made a profit last year.`, answer: 'Cannot Say', explanation: 'Unit margins and profitability were not disclosed.' },
      { text: `The inspection camera was associated with a lower rework rate.`, answer: 'True', explanation: 'The passage states that the camera reduced the share of items requiring rework.' },
      { text: `${company} has decided to automate inspections at every factory.`, answer: 'False', explanation: 'It will run another test before deciding whether to automate at other factories.' },
    ],
  };
}

function healthcarePassage(test: number): PassageSet {
  const network = organisation(test, 3);
  const city = location(test, 3);
  const clinics = n(test, 0, 7, 9);
  const remote = n(test, 1, 16, 21);
  const missed = n(test, 2, 5, 9);
  const minutes = n(test, 3, 18, 16);
  const passage = `${network} runs ${clinics} outpatient clinics across ${city}. It introduced video consultations for follow-up appointments in three specialties, but first appointments still take place in person unless a clinician grants an exception. In the first four months, ${remote}% of eligible follow-ups were completed by video. Patients using video were less likely to miss an appointment than patients booked into clinics, with missed visits falling by ${missed} percentage points. The comparison was observational, so it does not establish that video itself caused the difference. Nurses reported that remote appointments saved an average of ${minutes} minutes of administrative time, partly because digital forms were completed in advance. Doctors did not report a reduction in consultation time. The network encrypts video calls and stores clinical notes in its existing patient-record system; it does not record the calls. A patient survey found that convenience was the most frequently selected benefit, while unreliable home internet was the most frequently selected problem. ${network} will add two specialties to the programme, but only after its medical board reviews clinical-safety data. The board has not yet set a date for that review.`;
  return {
    passage,
    topic: 'Healthcare delivery',
    statements: [
      { text: `Video consultations are available for some follow-up appointments at ${network}.`, answer: 'True', explanation: 'The programme covers eligible follow-ups in three specialties.' },
      { text: `All first appointments at ${network} must take place in person without exception.`, answer: 'False', explanation: 'A clinician may grant an exception.' },
      { text: `Video consultations caused the reduction in missed appointments.`, answer: 'Cannot Say', explanation: 'The comparison was observational and does not establish causation.' },
      { text: `${network} records every video consultation.`, answer: 'False', explanation: 'The passage says calls are not recorded.' },
      { text: `The medical board will review safety data before two more specialties are added.`, answer: 'True', explanation: 'Expansion is explicitly conditional on that review.' },
    ],
  };
}

function workforcePassage(test: number): PassageSet {
  const company = organisation(test, 4);
  const city = location(test, 4);
  const hybrid = n(test, 0, 2, 3);
  const applicants = n(test, 1, 12, 19);
  const turnover = n(test, 2, 3, 8);
  const training = n(test, 3, 18, 25);
  const passage = `${company}, an employer based in ${city}, allows office staff to work remotely for up to ${hybrid} days each week. Factory and field-service roles remain site-based because they require specialised equipment or customer visits. After the policy began, applications for office vacancies rose by ${applicants}%, but applications for site-based jobs were broadly unchanged. Human-resources analysts warn that the increase may also reflect a national rise in graduate recruitment. Voluntary turnover among office employees fell by ${turnover} percentage points over the same period. The company did not survey employees who resigned, so it cannot attribute the decline solely to hybrid work. Managers complete ${training} hours of training on leading distributed teams, including modules on written communication and fair allocation of visible assignments. Promotion panels receive reports comparing career outcomes for remote and office-based staff. The first report found no material difference in promotion rates, but it covered only one year. ${company} reimburses basic home-working equipment but not household electricity or internet charges. New graduates spend their first month mainly in the office before becoming eligible for the hybrid schedule.`;
  return {
    passage,
    topic: 'Workforce trends',
    statements: [
      { text: `Every employee at ${company} may work remotely for up to ${hybrid} days a week.`, answer: 'False', explanation: 'Factory and field-service roles remain site-based.' },
      { text: `Applications for office vacancies increased after the hybrid policy began.`, answer: 'True', explanation: `They rose by ${applicants}%.` },
      { text: `Hybrid work was the only reason voluntary turnover fell.`, answer: 'Cannot Say', explanation: 'The company cannot attribute the decline solely to hybrid work.' },
      { text: `${company} pays employees’ household internet charges.`, answer: 'False', explanation: 'Internet and electricity charges are not reimbursed.' },
      { text: `The first career-outcomes report covered more than one year.`, answer: 'False', explanation: 'It covered only one year.' },
    ],
  };
}

function technologyPassage(test: number): PassageSet {
  const company = organisation(test, 5);
  const city = location(test, 5);
  const records = n(test, 0, 38, 41);
  const accuracy = n(test, 1, 84, 11);
  const seconds = n(test, 2, 7, 10);
  const review = n(test, 3, 4, 8);
  const passage = `${company} developed a forecasting tool for distributors in ${city}. The system combines historical orders, public-holiday calendars and local weather forecasts, but it does not use individual customers’ personal data. During a twelve-week pilot, it processed ${records},000 product-location records and produced a seven-day demand forecast each night. Forecast accuracy averaged ${accuracy}% for high-volume products and was lower for products launched during the pilot. The company has not published an accuracy figure for those new products. Generating a forecast took a median of ${seconds} seconds, excluding the time needed to import source files. Buyers remained responsible for approving purchase orders; the tool could recommend quantities but could not place an order on its own. Every recommendation above a value threshold required a second employee’s review. Auditors examined a sample of recommendations and found ${review} cases where users had overridden the model without recording a reason. ${company} responded by making the reason field mandatory. The pilot distributors intend to continue using the tool, but none has committed to deploying it in every warehouse. The developer will evaluate seasonal performance before offering the product outside Vietnam.`;
  return {
    passage,
    topic: 'Business technology',
    statements: [
      { text: `${company}’s forecasting tool uses local weather forecasts.`, answer: 'True', explanation: 'Weather forecasts are listed as one of the inputs.' },
      { text: `The tool can place purchase orders without human approval.`, answer: 'False', explanation: 'Buyers approve orders and the tool cannot place one by itself.' },
      { text: `Forecast accuracy for products launched during the pilot was exactly ${accuracy}%.`, answer: 'False', explanation: `${accuracy}% applied to high-volume products; accuracy for new products was lower and not published.` },
      { text: `At least one pilot distributor will deploy the tool in every warehouse.`, answer: 'Cannot Say', explanation: 'No distributor committed to deployment in every warehouse.' },
      { text: `Users must now record a reason when overriding a recommendation.`, answer: 'True', explanation: 'The developer made the reason field mandatory.' },
    ],
  };
}

const BUILDERS = [retailPassage, bankingPassage, manufacturingPassage, healthcarePassage, workforcePassage, technologyPassage];

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testNumber: number): VerbalTest {
  const id = `vr-${pad2(testNumber)}`;
  const questions: VerbalQuestion[] = [];
  BUILDERS.forEach((builder, groupIndex) => {
    const set = builder(testNumber);
    set.statements.forEach((statement, statementIndex) => {
      const questionNumber = groupIndex * 5 + statementIndex + 1;
      questions.push({
        kind: 'verbal',
        id: `${id}-q${pad2(questionNumber)}`,
        difficulty: DIFFICULTIES[groupIndex][statementIndex],
        passage: set.passage,
        prompt: statement.text,
        options: ANSWERS.slice(),
        optionLabels: ANSWERS.slice(),
        correctAnswer: statement.answer,
        explanation: statement.explanation,
        patternName: set.topic,
      });
    });
  });
  return {
    id,
    name: `Verbal Test ${testNumber}`,
    subtitle: `VR-${pad2(testNumber)} · Mixed`,
    description: 'Six original business passages with five True / False / Cannot Say statements each. Use only the information in the passage.',
    difficulty: 'mixed',
    timeLimitSeconds: VERBAL_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: VerbalTest[] | null = null;

export function loadVerbalReasoningLibrary(): VerbalTest[] {
  if (!cache) cache = Array.from({ length: VERBAL_TEST_COUNT }, (_, index) => buildTest(index + 1));
  return cache;
}
