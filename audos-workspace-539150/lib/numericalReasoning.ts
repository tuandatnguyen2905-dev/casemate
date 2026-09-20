// Casemate — Numerical Reasoning: 30 tests × 30 original questions.
//
// The supplied references use a small data exhibit followed by calculation and
// interpretation questions. Each test here has six unique exhibits and five
// questions per exhibit. Every correct answer is calculated from the same data
// object rendered by the UI, preventing answer/table drift across all 900
// questions. Options are always A–D and each test has a 9/12/9 difficulty mix.

export type NumericalDifficulty = 'easy' | 'medium' | 'hard';

export interface NumericalDataTable {
  title: string;
  note?: string;
  headers: string[];
  rows: string[][];
}

export interface NumericalQuestion {
  kind: 'numerical';
  id: string;
  difficulty: NumericalDifficulty;
  table: NumericalDataTable;
  prompt: string;
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  explanation: string;
  patternName: string;
}

export interface NumericalTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  timeLimitSeconds: number;
  questions: NumericalQuestion[];
}

export const NUMERICAL_TEST_COUNT = 30;
export const NUMERICAL_QUESTIONS_PER_TEST = 30;
export const NUMERICAL_TIME_LIMIT_SECONDS = 1800;

const LABELS = ['A', 'B', 'C', 'D'];
const DIFFICULTIES: NumericalDifficulty[][] = [
  ['easy', 'easy', 'medium', 'medium', 'hard'],
  ['easy', 'medium', 'medium', 'hard', 'hard'],
  ['easy', 'easy', 'medium', 'hard', 'hard'],
  ['easy', 'medium', 'medium', 'medium', 'hard'],
  ['easy', 'easy', 'medium', 'medium', 'hard'],
  ['easy', 'medium', 'medium', 'hard', 'hard'],
];

const COMPANIES = [
  'Lotus Retail', 'Mekong Mobile', 'An Phu Foods', 'Viet Horizon Bank', 'Blue River Logistics',
  'Sunrise Health', 'Red Bridge Consumer', 'Green Delta Energy', 'Nova Commerce', 'Golden Field Dairy',
  'HarbourTech', 'Bamboo Finance', 'Central Star Manufacturing', 'Cloud Nine Services', 'Saigon Fresh',
  'Northwind Electronics', 'Pacific Homecare', 'Everlight Insurance', 'Dragon Gate Mobility', 'Emerald Textiles',
  'Cedar Analytics', 'Orchid Pharmacy', 'Silver Coast Seafood', 'Pioneer Payments', 'Morning Star Coffee',
  'Unity Telecom', 'Riverstone Materials', 'Bright Path Education', 'Atlas Advisory', 'Lighthouse Aviation',
];
const CITIES = ['HCMC', 'Hanoi', 'Da Nang', 'Can Tho', 'Hai Phong', 'Hue', 'Binh Duong', 'Dong Nai'];

interface QuestionDraft {
  prompt: string;
  correct: string;
  distractors: string[];
  explanation: string;
  pattern: string;
}

interface DataSet {
  table: NumericalDataTable;
  drafts: QuestionDraft[];
}

function seed(test: number, group: number, row: number, base: number, span: number): number {
  return base + ((test * 29 + group * 17 + row * 13) % span);
}

function company(test: number, group: number): string {
  return COMPANIES[(test - 1 + group * 7) % COMPANIES.length];
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function fmt(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function pct(value: number, decimals = 1): string {
  return `${fmt(value, decimals)}%`;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

function ratio(a: number, b: number): string {
  const divisor = gcd(a, b);
  return `${a / divisor}:${b / divisor}`;
}

function moneyBn(value: number, decimals = 1): string {
  return `${fmt(value, decimals)} bn VND`;
}

function optionsFor(correct: string, distractors: string[], rotation: number): { options: string[]; correctAnswer: string } {
  const unique = distractors.filter((value, index, all) => value !== correct && all.indexOf(value) === index).slice(0, 3);
  let fallback = 1;
  while (unique.length < 3) {
    const candidate = `${correct} (${fallback})`;
    if (!unique.includes(candidate)) unique.push(candidate);
    fallback += 1;
  }
  const position = ((rotation % 4) + 4) % 4;
  const options = unique.slice();
  options.splice(position, 0, correct);
  return { options, correctAnswer: LABELS[position] };
}

function fmcgData(test: number): DataSet {
  const name = company(test, 0);
  const categories = ['Beverages', 'Snacks', 'Personal Care', 'Home Care'];
  const values = categories.map((_, row) => [0, 1, 2, 3].map((quarter) => seed(test, 0, row * 4 + quarter, 42, 69)));
  const total0 = values[0].reduce((sum, value) => sum + value, 0);
  const totalAll = values.flat().reduce((sum, value) => sum + value, 0);
  const change2 = ((values[2][3] - values[2][0]) / values[2][0]) * 100;
  const ratioValue = ratio(values[0][1], values[3][1]);
  const projection = values[0][3] * 1.1 + values[1][3] * 0.95 + values[2][3] + values[3][3];
  return {
    table: {
      title: `${name} quarterly unit sales`,
      note: 'Units sold (thousands)',
      headers: ['Category', 'Q1', 'Q2', 'Q3', 'Q4'],
      rows: categories.map((category, row) => [category, ...values[row].map((value) => fmt(value))]),
    },
    drafts: [
      { prompt: `How many thousand ${categories[1]} units did ${name} sell in Q4?`, correct: fmt(values[1][3]), distractors: [fmt(values[1][2]), fmt(values[0][3]), fmt(values[1][3] * 10)], explanation: `Read the ${categories[1]} row and Q4 column: ${values[1][3]} thousand.`, pattern: 'Table lookup' },
      { prompt: `What were ${name}’s annual ${categories[0]} unit sales?`, correct: `${fmt(total0)} thousand`, distractors: [`${fmt(total0 - values[0][0])} thousand`, `${fmt(total0 + values[0][3])} thousand`, `${fmt(Math.round(total0 / 4))} thousand`], explanation: `${values[0].join(' + ')} = ${total0} thousand.`, pattern: 'Row total' },
      { prompt: `What was the percentage change in ${categories[2]} sales from Q1 to Q4 (nearest 0.1%)?`, correct: pct(change2), distractors: [pct(Math.abs(change2)), pct(change2 + 5), pct((values[2][3] / values[2][0]) * 100)], explanation: `(${values[2][3]} − ${values[2][0]}) ÷ ${values[2][0]} × 100 = ${pct(change2)}.`, pattern: 'Percentage change' },
      { prompt: `What was the ratio of Q2 ${categories[0]} sales to Q2 ${categories[3]} sales in simplest form?`, correct: ratioValue, distractors: [ratio(values[3][1], values[0][1]), `${values[0][1]}:${values[3][1]}`, '1:1'], explanation: `${values[0][1]}:${values[3][1]} simplifies to ${ratioValue}.`, pattern: 'Ratio' },
      { prompt: `If next quarter ${categories[0]} rises 10%, ${categories[1]} falls 5%, and the other Q4 categories stay level, what total is projected?`, correct: `${fmt(projection, 1)} thousand`, distractors: [`${fmt(totalAll / 4, 1)} thousand`, `${fmt(projection * 1.05, 1)} thousand`, `${fmt(projection - values[1][3] * 0.05, 1)} thousand`], explanation: `${values[0][3]}×1.10 + ${values[1][3]}×0.95 + ${values[2][3]} + ${values[3][3]} = ${fmt(projection, 1)} thousand.`, pattern: 'Multi-step projection' },
    ],
  };
}

function bankingData(test: number): DataSet {
  const name = company(test, 1);
  const branches = [0, 1, 2, 3].map((row) => CITIES[(test + row * 2) % CITIES.length]);
  const values = branches.map((_, row) => ({
    customers: seed(test, 1, row, 68, 73),
    deposits: seed(test, 1, row + 4, 32, 37),
    loans: seed(test, 1, row + 8, 24, 33),
    npl: seed(test, 1, row + 12, 12, 16) / 10,
    digital: seed(test, 1, row + 16, 48, 39),
  }));
  const totalLoans = values.reduce((sum, item) => sum + item.loans, 0);
  const ltd = (values[1].loans / values[1].deposits) * 100;
  const badLoans = values[2].loans * values[2].npl / 100;
  const digitalCustomers = values[3].customers * values[3].digital / 100;
  return {
    table: {
      title: `${name} retail branch portfolio`,
      note: 'Customers in thousands; deposits and loans in trillion VND',
      headers: ['Branch', 'Customers', 'Deposits', 'Loans', 'NPL rate', 'Digital users'],
      rows: branches.map((branch, row) => [branch, fmt(values[row].customers), fmt(values[row].deposits), fmt(values[row].loans), pct(values[row].npl), pct(values[row].digital, 0)]),
    },
    drafts: [
      { prompt: `What deposit balance is shown for ${name}’s ${branches[0]} branch?`, correct: `${values[0].deposits} tn VND`, distractors: [`${values[0].loans} tn VND`, `${values[1].deposits} tn VND`, `${values[0].deposits * 10} tn VND`], explanation: `The ${branches[0]} deposits cell shows ${values[0].deposits} trillion VND.`, pattern: 'Table lookup' },
      { prompt: `What is the total loan balance across all four ${name} branches?`, correct: `${totalLoans} tn VND`, distractors: [`${values.reduce((sum, item) => sum + item.deposits, 0)} tn VND`, `${totalLoans - values[0].loans} tn VND`, `${Math.round(totalLoans / 4)} tn VND`], explanation: `${values.map((item) => item.loans).join(' + ')} = ${totalLoans} trillion VND.`, pattern: 'Column total' },
      { prompt: `What is the loan-to-deposit ratio for the ${branches[1]} branch (nearest 0.1%)?`, correct: pct(ltd), distractors: [pct(100 - ltd), pct((values[1].deposits / values[1].loans) * 100), pct(ltd + 10)], explanation: `${values[1].loans} ÷ ${values[1].deposits} × 100 = ${pct(ltd)}.`, pattern: 'Percentage' },
      { prompt: `Approximately how much of the ${branches[2]} loan book is non-performing?`, correct: `${fmt(badLoans, 2)} tn VND`, distractors: [`${fmt(values[2].loans / values[2].npl, 2)} tn VND`, `${fmt(badLoans * 10, 2)} tn VND`, `${fmt(values[2].npl, 2)} tn VND`], explanation: `${values[2].loans} × ${pct(values[2].npl)} = ${fmt(badLoans, 2)} trillion VND.`, pattern: 'Rate applied to value' },
      { prompt: `Approximately how many digital users does the ${branches[3]} branch have?`, correct: `${fmt(digitalCustomers, 1)} thousand`, distractors: [`${fmt(values[3].customers - digitalCustomers, 1)} thousand`, `${fmt(values[3].digital, 1)} thousand`, `${fmt(digitalCustomers * 10, 1)} thousand`], explanation: `${values[3].customers} thousand × ${values[3].digital}% = ${fmt(digitalCustomers, 1)} thousand.`, pattern: 'Population percentage' },
    ],
  };
}

function workforceData(test: number): DataSet {
  const name = company(test, 2);
  const departments = ['Commercial', 'Operations', 'Technology', 'Finance', 'People'];
  const values = departments.map((_, row) => ({ staff: seed(test, 2, row, 84, 91), women: seed(test, 2, row + 5, 38, 31), hires: seed(test, 2, row + 10, 8, 16), exits: seed(test, 2, row + 15, 4, 13), salary: seed(test, 2, row + 20, 18, 23) }));
  const totalHires = values.reduce((sum, item) => sum + item.hires, 0);
  const net = values.reduce((sum, item) => sum + item.hires - item.exits, 0);
  const women = values[2].staff * values[2].women / 100;
  const payroll = values[3].staff * values[3].salary * 12 / 1000;
  return {
    table: { title: `${name} workforce dashboard`, note: 'Average salary in million VND per month', headers: ['Department', 'Staff', 'Women', 'Hires', 'Departures', 'Avg salary'], rows: departments.map((department, row) => [department, fmt(values[row].staff), pct(values[row].women, 0), fmt(values[row].hires), fmt(values[row].exits), fmt(values[row].salary)]) },
    drafts: [
      { prompt: `How many employees work in ${name}’s ${departments[0]} department?`, correct: fmt(values[0].staff), distractors: [fmt(values[1].staff), fmt(values[0].hires), fmt(values[0].staff + values[0].hires)], explanation: `Read the ${departments[0]} Staff cell: ${values[0].staff}.`, pattern: 'Table lookup' },
      { prompt: `How many people did ${name} hire across all departments?`, correct: fmt(totalHires), distractors: [fmt(values.reduce((sum, item) => sum + item.exits, 0)), fmt(totalHires - values[0].hires), fmt(Math.round(totalHires / 5))], explanation: `${values.map((item) => item.hires).join(' + ')} = ${totalHires}.`, pattern: 'Column total' },
      { prompt: `What was the net workforce change from hires and departures?`, correct: `${net >= 0 ? '+' : ''}${net}`, distractors: [`+${totalHires}`, `${values.reduce((sum, item) => sum + item.exits, 0)}`, `${-net}`], explanation: `Total hires minus total departures = ${net}.`, pattern: 'Net change' },
      { prompt: `Approximately how many women work in ${name}’s ${departments[2]} department?`, correct: fmt(women, 0), distractors: [fmt(values[2].women), fmt(values[2].staff - women, 0), fmt(women * 10, 0)], explanation: `${values[2].staff} × ${values[2].women}% ≈ ${fmt(women, 0)}.`, pattern: 'Percentage of workforce' },
      { prompt: `What is the approximate annual payroll for the ${departments[3]} department?`, correct: moneyBn(payroll), distractors: [moneyBn(values[3].staff * values[3].salary / 1000), moneyBn(payroll / 12), moneyBn(payroll * 1.1)], explanation: `${values[3].staff} × ${values[3].salary} million × 12 = ${moneyBn(payroll)}.`, pattern: 'Multi-step payroll' },
    ],
  };
}

function demographicData(test: number): DataSet {
  const title = `${company(test, 3)} regional market study`;
  const provinces = [0, 1, 2, 3].map((row) => CITIES[(test * 2 + row) % CITIES.length]);
  const values = provinces.map((_, row) => ({ population: seed(test, 3, row, 620, 580), under25: seed(test, 3, row + 4, 28, 19), urban: seed(test, 3, row + 8, 44, 43), employed: seed(test, 3, row + 12, 61, 19), income: seed(test, 3, row + 16, 7, 9) }));
  const totalPopulation = values.reduce((sum, item) => sum + item.population, 0);
  const young = values[1].population * values[1].under25 / 100;
  const employed = values[2].population * (100 - values[2].under25) / 100 * values[2].employed / 100;
  const weightedIncome = values.reduce((sum, item) => sum + item.population * item.income, 0) / totalPopulation;
  return {
    table: { title, note: 'Population in thousands; income in million VND per month', headers: ['Area', 'Population', 'Under 25', 'Urban', 'Employment rate*', 'Avg income'], rows: provinces.map((province, row) => [province, fmt(values[row].population), pct(values[row].under25, 0), pct(values[row].urban, 0), pct(values[row].employed, 0), fmt(values[row].income)]).concat([['* Employment rate applies to residents aged 25+', '', '', '', '', '']]) },
    drafts: [
      { prompt: `What population is shown for ${provinces[0]} in the ${title}?`, correct: `${fmt(values[0].population)} thousand`, distractors: [`${fmt(values[1].population)} thousand`, `${fmt(values[0].population * 1000)} thousand`, `${fmt(totalPopulation)} thousand`], explanation: `The ${provinces[0]} row shows ${values[0].population} thousand residents.`, pattern: 'Table lookup' },
      { prompt: `What is the combined population of the four areas shown?`, correct: `${fmt(totalPopulation)} thousand`, distractors: [`${fmt(totalPopulation - values[0].population)} thousand`, `${fmt(Math.round(totalPopulation / 4))} thousand`, `${fmt(totalPopulation * 10)} thousand`], explanation: `${values.map((item) => item.population).join(' + ')} = ${totalPopulation} thousand.`, pattern: 'Column total' },
      { prompt: `Approximately how many residents of ${provinces[1]} are under 25?`, correct: `${fmt(young, 0)} thousand`, distractors: [`${fmt(values[1].under25)} thousand`, `${fmt(values[1].population - young, 0)} thousand`, `${fmt(young * 10, 0)} thousand`], explanation: `${values[1].population} × ${values[1].under25}% ≈ ${fmt(young, 0)} thousand.`, pattern: 'Demographic percentage' },
      { prompt: `Approximately how many employed residents aged 25+ live in ${provinces[2]}?`, correct: `${fmt(employed, 0)} thousand`, distractors: [`${fmt(values[2].population * values[2].employed / 100, 0)} thousand`, `${fmt(values[2].population * (100 - values[2].under25) / 100, 0)} thousand`, `${fmt(employed * 1.1, 0)} thousand`], explanation: `${values[2].population} × ${(100 - values[2].under25)}% × ${values[2].employed}% ≈ ${fmt(employed, 0)} thousand.`, pattern: 'Multi-step population' },
      { prompt: `What is the population-weighted average monthly income across the four areas?`, correct: `${fmt(weightedIncome, 1)}m VND`, distractors: [`${fmt(values.reduce((sum, item) => sum + item.income, 0) / 4, 1)}m VND`, `${fmt(weightedIncome * 12, 1)}m VND`, `${fmt(weightedIncome - 1, 1)}m VND`], explanation: `Sum of population × income divided by total population = ${fmt(weightedIncome, 1)} million VND.`, pattern: 'Weighted average' },
    ],
  };
}

function marketData(test: number): DataSet {
  const name = company(test, 4);
  const brands = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  const values = brands.map((_, row) => ({ units: seed(test, 4, row, 42, 55), price: seed(test, 4, row + 4, 58, 41), margin: seed(test, 4, row + 8, 18, 17), ads: seed(test, 4, row + 12, 3, 8) }));
  const revenues = values.map((item) => item.units * item.price / 1000);
  const totalUnits = values.reduce((sum, item) => sum + item.units, 0);
  const unitShare = values[1].units / totalUnits * 100;
  const grossProfit = revenues[2] * values[2].margin / 100;
  const adRatio = values[3].ads / revenues[3] * 100;
  return {
    table: { title: `${name} category brand performance`, note: 'Units in thousands; average price in thousand VND; revenue calculations are in billion VND', headers: ['Brand', 'Units', 'Avg price', 'Gross margin', 'Ad spend (bn)'], rows: brands.map((brand, row) => [brand, fmt(values[row].units), fmt(values[row].price), pct(values[row].margin, 0), fmt(values[row].ads)]) },
    drafts: [
      { prompt: `What revenue did ${brands[0]} generate for ${name}?`, correct: moneyBn(revenues[0]), distractors: [moneyBn(values[0].units + values[0].price), moneyBn(revenues[1]), moneyBn(revenues[0] * 10)], explanation: `${values[0].units} thousand × ${values[0].price} thousand VND = ${moneyBn(revenues[0])}.`, pattern: 'Revenue calculation' },
      { prompt: `How many units did all four ${name} brands sell?`, correct: `${fmt(totalUnits)} thousand`, distractors: [`${fmt(totalUnits - values[0].units)} thousand`, `${fmt(Math.round(totalUnits / 4))} thousand`, `${fmt(totalUnits * 10)} thousand`], explanation: `${values.map((item) => item.units).join(' + ')} = ${totalUnits} thousand.`, pattern: 'Column total' },
      { prompt: `What share of unit sales did ${brands[1]} represent (nearest 0.1%)?`, correct: pct(unitShare), distractors: [pct(values[1].units), pct(100 - unitShare), pct(values[1].units / 4)], explanation: `${values[1].units} ÷ ${totalUnits} × 100 = ${pct(unitShare)}.`, pattern: 'Market share' },
      { prompt: `Approximately what gross profit did ${brands[2]} generate?`, correct: moneyBn(grossProfit), distractors: [moneyBn(revenues[2]), moneyBn(values[2].margin), moneyBn(grossProfit * 10)], explanation: `Revenue ${moneyBn(revenues[2])} × ${values[2].margin}% = ${moneyBn(grossProfit)}.`, pattern: 'Margin calculation' },
      { prompt: `${brands[3]} ad spend equals approximately what percentage of its revenue?`, correct: pct(adRatio), distractors: [pct(values[3].ads), pct(values[3].margin), pct(100 - adRatio)], explanation: `${values[3].ads} ÷ ${fmt(revenues[3], 1)} × 100 = ${pct(adRatio)}.`, pattern: 'Cost as percentage of revenue' },
    ],
  };
}

function financialData(test: number): DataSet {
  const name = company(test, 5);
  const years = ['2022', '2023', '2024', '2025'];
  const values = years.map((_, row) => ({ revenue: seed(test, 5, row, 480, 290) + row * 35, cost: seed(test, 5, row + 4, 310, 170) + row * 22, capex: seed(test, 5, row + 8, 28, 37), employees: seed(test, 5, row + 12, 820, 420) + row * 35, exports: seed(test, 5, row + 16, 22, 39) }));
  const profit = values[0].revenue - values[0].cost;
  const margin = (values[1].revenue - values[1].cost) / values[1].revenue * 100;
  const perEmployee = values[2].revenue * 1000 / values[2].employees;
  const exportRevenue = values[3].revenue * values[3].exports / 100;
  const annualChange = (values[3].revenue - values[0].revenue) / 3;
  return {
    table: { title: `${name} financial summary`, note: 'Revenue, operating cost and capex in billion VND', headers: ['Year', 'Revenue', 'Operating cost', 'Capex', 'Employees', 'Export share'], rows: years.map((year, row) => [year, fmt(values[row].revenue), fmt(values[row].cost), fmt(values[row].capex), fmt(values[row].employees), pct(values[row].exports, 0)]) },
    drafts: [
      { prompt: `What operating profit before capex did ${name} make in ${years[0]}?`, correct: moneyBn(profit), distractors: [moneyBn(values[0].cost), moneyBn(values[0].revenue + values[0].cost), moneyBn(profit - values[0].capex)], explanation: `${values[0].revenue} − ${values[0].cost} = ${profit} billion VND.`, pattern: 'Subtraction' },
      { prompt: `What was ${name}’s operating margin in ${years[1]} (nearest 0.1%)?`, correct: pct(margin), distractors: [pct(values[1].cost / values[1].revenue * 100), pct(values[1].revenue / values[1].cost * 100), pct(margin + 5)], explanation: `(${values[1].revenue} − ${values[1].cost}) ÷ ${values[1].revenue} × 100 = ${pct(margin)}.`, pattern: 'Profit margin' },
      { prompt: `What was ${name}’s ${years[2]} revenue per employee?`, correct: `${fmt(perEmployee, 1)}m VND`, distractors: [`${fmt(values[2].revenue / values[2].employees, 1)}m VND`, `${fmt(perEmployee * 12, 1)}m VND`, `${fmt(perEmployee - values[2].capex, 1)}m VND`], explanation: `${values[2].revenue} billion ÷ ${values[2].employees} employees = ${fmt(perEmployee, 1)} million VND per employee.`, pattern: 'Per-capita calculation' },
      { prompt: `How much ${years[3]} revenue came from exports?`, correct: moneyBn(exportRevenue), distractors: [moneyBn(values[3].exports), moneyBn(values[3].revenue - exportRevenue), moneyBn(exportRevenue * 10)], explanation: `${values[3].revenue} × ${values[3].exports}% = ${moneyBn(exportRevenue)}.`, pattern: 'Percentage of revenue' },
      { prompt: `What was the average annual change in revenue from ${years[0]} to ${years[3]}?`, correct: `${moneyBn(Math.abs(annualChange))} ${annualChange >= 0 ? 'increase' : 'decrease'}`, distractors: [moneyBn(values[3].revenue - values[0].revenue), moneyBn((values[3].revenue - values[0].revenue) / 4), moneyBn(values.reduce((sum, item) => sum + item.revenue, 0) / 4)], explanation: `(${values[3].revenue} − ${values[0].revenue}) ÷ 3 yearly intervals = ${moneyBn(annualChange)}.`, pattern: 'Average annual change' },
    ],
  };
}

const BUILDERS = [fmcgData, bankingData, workforceData, demographicData, marketData, financialData];

function buildTest(testNumber: number): NumericalTest {
  const id = `nr-${pad2(testNumber)}`;
  const questions: NumericalQuestion[] = [];
  BUILDERS.forEach((builder, groupIndex) => {
    const dataSet = builder(testNumber);
    dataSet.drafts.forEach((draft, questionIndex) => {
      const number = groupIndex * 5 + questionIndex + 1;
      const choice = optionsFor(draft.correct, draft.distractors, testNumber + groupIndex + questionIndex);
      questions.push({
        kind: 'numerical',
        id: `${id}-q${pad2(number)}`,
        difficulty: DIFFICULTIES[groupIndex][questionIndex],
        table: dataSet.table,
        prompt: draft.prompt,
        options: choice.options,
        optionLabels: LABELS.slice(),
        correctAnswer: choice.correctAnswer,
        explanation: draft.explanation,
        patternName: draft.pattern,
      });
    });
  });
  return {
    id,
    name: `Numerical Test ${testNumber}`,
    subtitle: `NR-${pad2(testNumber)} · Mixed`,
    description: 'Six original data exhibits covering FMCG, banking, workforce, demographics, market share and company financials.',
    difficulty: 'mixed',
    timeLimitSeconds: NUMERICAL_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadNumericalReasoningLibrary(): NumericalTest[] {
  if (!cache) cache = Array.from({ length: NUMERICAL_TEST_COUNT }, (_, index) => buildTest(index + 1));
  return cache;
}
