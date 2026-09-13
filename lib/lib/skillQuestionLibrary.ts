export type LibrarySkill = 'charts' | 'structures' | 'calculations' | 'creativity' | 'market-sizing';
export type LibraryDifficulty = 'easy' | 'medium' | 'hard';
export type LibraryAnswerMode = 'choice' | 'number' | 'text';
export type ExhibitKind = 'bar' | 'line' | 'pie' | 'table';

export interface LibraryExhibit {
  kind: ExhibitKind;
  title: string;
  unit: string;
  columns?: string[];
  rows?: string[][];
  labels?: string[];
  values?: number[];
}

export interface LibraryQuestion {
  id: string;
  skill: LibrarySkill;
  difficulty: LibraryDifficulty;
  title: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  answerMode: LibraryAnswerMode;
  numericAnswer?: number;
  numericTolerance?: number;
  answerUnit?: string;
  workingPrompt?: string;
  exhibit?: LibraryExhibit;
}

export interface SkillMeta {
  id: LibrarySkill;
  label: string;
  shortLabel: string;
  description: string;
}

export const SKILL_META: SkillMeta[] = [
  { id: 'charts', label: 'Charts', shortLabel: 'Charts', description: 'Read exhibits, calculate what matters, and state the management insight.' },
  { id: 'structures', label: 'Structures', shortLabel: 'Structures', description: 'Build MECE issue trees and choose the right decomposition for the decision.' },
  { id: 'calculations', label: 'Calculations', shortLabel: 'Calculations', description: 'Practise revenue, margin, cost, breakeven, percentage, and growth maths.' },
  { id: 'creativity', label: 'Creativity', shortLabel: 'Creativity', description: 'Generate broad, original, and commercially grounded ideas.' },
  { id: 'market-sizing', label: 'Market Sizing', shortLabel: 'Market Sizing', description: 'Estimate Vietnamese and global markets with explicit assumptions and checks.' },
];

const difficulties: LibraryDifficulty[] = ['easy', 'medium', 'hard'];
const difficultyOf = (index: number): LibraryDifficulty => difficulties[index % difficulties.length];
const round = (value: number, digits = 1): number => Number(value.toFixed(digits));
const pct = (value: number): string => `${round(value, 1)}%`;

function choiceOptions(correct: string, alternatives: string[], offset: number): string[] {
  const values = [correct, ...alternatives.filter((value) => value !== correct)].slice(0, 4);
  const shift = offset % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

const businesses = [
  ['Lotus Mart', 'Vietnamese grocery retailer'],
  ['Mekong Mobile', 'Consumer electronics chain'],
  ['Saigon Sip', 'Ready-to-drink beverage brand'],
  ['Northstar Bank', 'Retail bank'],
  ['Harbor Health', 'Private clinic network'],
  ['GreenRide', 'Electric mobility platform'],
  ['CloudDesk', 'B2B software company'],
  ['SwiftShip', 'Parcel delivery operator'],
  ['BrightHome', 'Home appliance manufacturer'],
  ['Urban Bowl', 'Quick-service restaurant chain'],
  ['LearnLoop', 'Online education platform'],
  ['VietHarvest', 'Packaged food producer'],
  ['NovaTel', 'Telecommunications provider'],
  ['Sunrise Hotels', 'Regional hotel group'],
  ['CarePlus', 'Pharmacy chain'],
  ['OceanPay', 'Digital payments provider'],
  ['FreshCart', 'Online grocery marketplace'],
  ['BuildRight', 'Construction materials producer'],
  ['AeroAsia', 'Regional airline'],
  ['EcoPack', 'Sustainable packaging supplier'],
] as const;

function buildCalculations(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => {
    const revenue = 120 + companyIndex * 17;
    const margin = 28 + (companyIndex % 8) * 3;
    const fixedCost = 18 + companyIndex * 2;
    const costBase = 70 + companyIndex * 9;
    const questions: LibraryQuestion[] = [];

    const growth = 6 + (companyIndex % 7) * 2;
    const nextRevenue = round(revenue * (1 + growth / 100), 1);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 1).padStart(3, '0')}`,
      skill: 'calculations',
      difficulty: difficultyOf(companyIndex * 5),
      title: `${company} Revenue Growth`,
      question: `${company}, a ${industry}, generated VND ${revenue} billion of revenue last year. Management expects revenue to grow by ${growth}%. What revenue should it plan for next year?`,
      options: choiceOptions(`VND ${nextRevenue} billion`, [`VND ${round(revenue + growth, 1)} billion`, `VND ${round(revenue * (1 + growth / 10), 1)} billion`, `VND ${round(revenue / (1 - growth / 100), 1)} billion`], companyIndex),
      correctAnswer: `VND ${nextRevenue} billion`,
      explanation: `Multiply VND ${revenue} billion by 1 + ${growth}%: ${revenue} × ${(1 + growth / 100).toFixed(2)} = VND ${nextRevenue} billion.`,
      answerMode: 'number', numericAnswer: nextRevenue, numericTolerance: 0.2, answerUnit: 'VND Billion',
      workingPrompt: 'Show The Growth Multiplier And Final Revenue.',
    });

    const opex = 14 + (companyIndex % 6) * 2;
    const grossProfit = revenue * margin / 100;
    const operatingProfit = round(grossProfit - opex, 1);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 2).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 1), title: `${company} Operating Profit`,
      question: `${company} has revenue of VND ${revenue} billion, a gross margin of ${margin}%, and operating expenses of VND ${opex} billion. What is operating profit?`,
      options: choiceOptions(`VND ${operatingProfit} billion`, [`VND ${round(grossProfit, 1)} billion`, `VND ${round(revenue - opex, 1)} billion`, `VND ${round(revenue * (margin - opex) / 100, 1)} billion`], companyIndex + 1),
      correctAnswer: `VND ${operatingProfit} billion`,
      explanation: `Gross profit is ${revenue} × ${margin}% = VND ${round(grossProfit, 1)} billion. Subtract VND ${opex} billion of operating expenses to get VND ${operatingProfit} billion.`,
      answerMode: 'number', numericAnswer: operatingProfit, numericTolerance: 0.2, answerUnit: 'VND Billion',
      workingPrompt: 'Calculate Gross Profit First, Then Subtract Operating Expenses.',
    });

    const contribution = 30 + (companyIndex % 6) * 5;
    const breakEvenUnits = round((fixedCost * 1000) / contribution, 0);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 3).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 2), title: `${company} Breakeven Volume`,
      question: `${company} is considering a new offer with fixed costs of VND ${fixedCost} million and contribution of VND ${contribution} thousand per sale. How many sales are required to break even?`,
      options: choiceOptions(`Sales: ${breakEvenUnits.toLocaleString()}`, [`Sales: ${Math.round(breakEvenUnits / 10).toLocaleString()}`, `Sales: ${Math.round(breakEvenUnits * 1.2).toLocaleString()}`, `Sales: ${Math.round((fixedCost * 1000) / (contribution + 10)).toLocaleString()}`], companyIndex + 2),
      correctAnswer: `Sales: ${breakEvenUnits.toLocaleString()}`,
      explanation: `Convert fixed costs to VND ${fixedCost * 1000} thousand, then divide by VND ${contribution} thousand contribution per sale: ${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()} sales.`,
      answerMode: 'number', numericAnswer: breakEvenUnits, numericTolerance: 1, answerUnit: 'Sales',
      workingPrompt: 'Align The Units Before Dividing Fixed Cost By Contribution.',
    });

    const priceIncrease = 5 + (companyIndex % 5) * 2;
    const volumeDecline = 2 + (companyIndex % 4);
    const revenueChange = round((1 + priceIncrease / 100) * (1 - volumeDecline / 100) * 100 - 100, 1);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 4).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 3), title: `${company} Price–Volume Impact`,
      question: `${company} raises price by ${priceIncrease}% and expects unit volume to decline by ${volumeDecline}%. What is the resulting percentage change in revenue?`,
      options: choiceOptions(`Revenue Change: ${pct(revenueChange)}`, [`Revenue Change: ${pct(priceIncrease - volumeDecline)}`, `Revenue Change: ${pct(priceIncrease + volumeDecline)}`, `Revenue Change: ${pct(-volumeDecline)}`], companyIndex + 3),
      correctAnswer: `Revenue Change: ${pct(revenueChange)}`,
      explanation: `Use multiplicative effects: ${(1 + priceIncrease / 100).toFixed(2)} × ${(1 - volumeDecline / 100).toFixed(2)} − 1 = ${pct(revenueChange)}. Adding the percentages misses the interaction term.`,
      answerMode: 'number', numericAnswer: revenueChange, numericTolerance: 0.15, answerUnit: 'Percent',
      workingPrompt: 'Use A Price Multiplier Times A Volume Multiplier.',
    });

    const addressableShare = 20 + (companyIndex % 5) * 5;
    const savingRate = 8 + (companyIndex % 6) * 2;
    const savings = round(costBase * addressableShare / 100 * savingRate / 100, 2);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 5).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 4), title: `${company} Cost-Savings Opportunity`,
      question: `${company} has a VND ${costBase} billion cost base. Procurement represents ${addressableShare}% of costs, and a sourcing programme can reduce procurement spend by ${savingRate}%. What annual savings should management expect?`,
      options: choiceOptions(`VND ${savings} billion`, [`VND ${round(costBase * savingRate / 100, 2)} billion`, `VND ${round(costBase * addressableShare / 100, 2)} billion`, `VND ${round(costBase * (addressableShare + savingRate) / 100, 2)} billion`], companyIndex + 4),
      correctAnswer: `VND ${savings} billion`,
      explanation: `Apply both percentages to the cost base: ${costBase} × ${addressableShare}% × ${savingRate}% = VND ${savings} billion.`,
      answerMode: 'number', numericAnswer: savings, numericTolerance: 0.03, answerUnit: 'VND Billion',
      workingPrompt: 'Isolate Addressable Spend, Then Apply The Saving Rate.',
    });
    return questions;
  });
}

const chartContexts = [
  'Retail Channels', 'Product Segments', 'Customer Cohorts', 'Vietnamese Regions', 'Store Formats',
  'Digital Products', 'Delivery Routes', 'Hotel Markets', 'Banking Products', 'Clinic Services',
  'Mobility Modes', 'Software Plans', 'Food Categories', 'Telecom Packages', 'Pharmacy Categories',
  'Payment Methods', 'Grocery Missions', 'Building Materials', 'Airline Routes', 'Packaging Materials',
  'Sales Territories', 'Factory Lines', 'Restaurant Dayparts', 'Education Courses', 'Energy Sources',
];

function buildCharts(): LibraryQuestion[] {
  return chartContexts.flatMap((context, contextIndex) => {
    const base = 30 + contextIndex * 3;
    const labels = ['Alpha', 'Bravo', 'Charlie', 'Delta'];
    const barValues = [base, base + 12 + contextIndex % 4, base - 5, base + 6];
    const maxBar = Math.max(...barValues);
    const maxBarLabel = labels[barValues.indexOf(maxBar)];
    const start = 80 + contextIndex * 4;
    const lineValues = [start, round(start * 1.08, 0), round(start * 1.18, 0), round(start * 1.32, 0)];
    const totalGrowth = round((lineValues[3] / lineValues[0] - 1) * 100, 1);
    const pieValues = [36 + contextIndex % 5, 28, 21, 15 - contextIndex % 5];
    const tableRows = labels.map((label, index) => {
      const revenue = base + index * 9;
      const marginValue = 18 + ((contextIndex + index * 3) % 13);
      return [label, String(revenue), `${marginValue}%`, String(round(revenue * marginValue / 100, 1))];
    });
    const highestProfitRow = tableRows.reduce((best, row) => Number(row[3]) > Number(best[3]) ? row : best, tableRows[0]);
    const firstId = contextIndex * 4 + 1;
    return [
      {
        id: `charts-${String(firstId).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId - 1),
        title: `${context} Performance Comparison`,
        question: `Which category leads the exhibit, and what should management investigate before reallocating resources toward it?`,
        options: choiceOptions(`${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`, labels.filter((label) => label !== maxBarLabel).map((label) => `${label}; Scale Immediately Without Further Checks`), contextIndex),
        correctAnswer: `${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`,
        explanation: `${maxBarLabel} has the highest value at ${maxBar}. A consultant should verify margin, growth durability, and capacity before recommending reallocation.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'bar' as const, title: `${context} — Current Performance`, unit: 'Index', labels, values: barValues },
      },
      {
        id: `charts-${String(firstId + 1).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId),
        title: `${context} Four-Year Trend`,
        question: `What is the total growth from Year 1 to Year 4, and what is the clearest implication?`,
        options: choiceOptions(`Growth: ${pct(totalGrowth)}; Growth Accelerated Across The Period`, [`Growth: ${pct(round((lineValues[3] - lineValues[0]) / lineValues[3] * 100, 1))}; The Base Is Year 4`, `Growth: ${pct(round((lineValues[1] / lineValues[0] - 1) * 100, 1))}; Only Year 1 Matters`, `Growth: ${lineValues[3] - lineValues[0]}%; Absolute Change Equals Percentage Change`], contextIndex + 1),
        correctAnswer: `Growth: ${pct(totalGrowth)}; Growth Accelerated Across The Period`,
        explanation: `Total growth is (${lineValues[3]} ÷ ${lineValues[0]} − 1) × 100 = ${pct(totalGrowth)}. The rising increments indicate strengthening momentum, although drivers still need validation.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'line' as const, title: `${context} — Yearly Index`, unit: 'Index', labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], values: lineValues },
      },
      {
        id: `charts-${String(firstId + 2).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 1),
        title: `${context} Mix Analysis`,
        question: `What share do Alpha and Bravo represent together, and why does that matter?`,
        options: choiceOptions(`Combined Share: ${pieValues[0] + pieValues[1]}%; The Portfolio Is Concentrated In Two Categories`, [`Combined Share: ${pieValues[0]}%; Only The Largest Slice Counts`, `Combined Share: ${100 - pieValues[0] - pieValues[1]}%; The Smaller Categories Dominate`, `Combined Share: ${pieValues[0] - pieValues[1]}%; The Difference Is The Combined Share`], contextIndex + 2),
        correctAnswer: `Combined Share: ${pieValues[0] + pieValues[1]}%; The Portfolio Is Concentrated In Two Categories`,
        explanation: `Add Alpha (${pieValues[0]}%) and Bravo (${pieValues[1]}%) to get ${pieValues[0] + pieValues[1]}%. This concentration can create both focus benefits and portfolio risk.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'pie' as const, title: `${context} — Share Of Total`, unit: 'Percent', labels, values: pieValues },
      },
      {
        id: `charts-${String(firstId + 3).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 2),
        title: `${context} Profitability Table`,
        question: `Which category generates the highest absolute profit, and which two figures support your answer?`,
        options: choiceOptions(`${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`, tableRows.filter((row) => row !== highestProfitRow).map((row) => `${row[0]}; Revenue ${row[1]} And Margin ${row[2]}`), contextIndex + 3),
        correctAnswer: `${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`,
        explanation: `Absolute profit equals revenue multiplied by margin. ${highestProfitRow[0]} produces ${highestProfitRow[3]} profit units, the highest value in the final column.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'table' as const, title: `${context} — Revenue And Profitability`, unit: 'Revenue In VND Billion', columns: ['Category', 'Revenue', 'Margin', 'Profit'], rows: tableRows },
      },
    ];
  });
}

const structureObjectives = [
  { title: 'Profit Decline', prompt: 'Profit has fallen for two years. Which issue tree is the strongest starting point?', correct: 'Revenue: Price, Volume, And Mix; Costs: Fixed And Variable; Then Segment By Product, Customer, Channel, And Geography', alternatives: ['Marketing, Sales, Finance, And Operations Departments', 'Competitors, Customers, And Regulation Without A Profit Bridge', 'List Every Cost Line Before Testing Revenue'], explanation: 'Start with the profit equation, keep revenue and cost branches mutually exclusive, then segment the drivers to locate the source of deterioration.' },
  { title: 'Market Entry', prompt: 'The client is considering entering a new market. Which structure best supports the decision?', correct: 'Market Attractiveness; Ability To Win; Entry Economics; Entry Mode And Risks', alternatives: ['Product, Price, Place, And Promotion Only', 'Revenue And Cost Only', 'Customers, Competitors, And Company History'], explanation: 'A complete entry structure tests whether the market is attractive, whether the client can win, whether returns clear the hurdle, and how to enter safely.' },
  { title: 'Growth Strategy', prompt: 'The client wants to double revenue in three years. Which decomposition is most decision-useful?', correct: 'Grow The Core; Expand Into Adjacent Customers, Products, And Geographies; Build New Businesses; Test Enablers And Economics', alternatives: ['Organic Growth And Inorganic Growth Without Further Detail', 'Raise Prices Across Every Product', 'Brainstorm Products Before Diagnosing The Core'], explanation: 'The structure separates core growth, adjacencies, and new businesses while testing capabilities and economics, making the options MECE and actionable.' },
  { title: 'Operations Bottleneck', prompt: 'Service levels are worsening despite stable demand. Which issue tree should the team use?', correct: 'Demand Pattern; Process Capacity By Step; Labour And Asset Availability; Scheduling And Variability; Quality And Rework', alternatives: ['Revenue, Cost, And Profit', 'Customer Segments And Brand Awareness', 'Technology Projects And Vendor List'], explanation: 'A bottleneck diagnosis follows demand through each process step, then tests capacity, availability, variability, and rework as distinct root causes.' },
  { title: 'Acquisition Due Diligence', prompt: 'A private-equity client is evaluating an acquisition. Which structure is most complete?', correct: 'Market And Competitive Position; Revenue Quality; Cost And Margin Sustainability; Management And Operations; Deal Economics And Risks', alternatives: ['Revenue Growth And EBITDA Only', 'Customer Interviews Without Financial Validation', 'Synergies Before Testing The Standalone Business'], explanation: 'Commercial diligence must link market quality and competitive position to sustainable revenue, margins, operational capability, and deal returns.' },
] as const;

function buildStructures(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => structureObjectives.map((objective, objectiveIndex) => ({
    id: `structures-${String(companyIndex * 5 + objectiveIndex + 1).padStart(3, '0')}`,
    skill: 'structures' as const, difficulty: difficultyOf(companyIndex * 5 + objectiveIndex), title: `${company} ${objective.title} Structure`,
    question: `${company}, a ${industry}, faces this case: ${objective.prompt}`,
    options: choiceOptions(objective.correct, [...objective.alternatives], companyIndex + objectiveIndex),
    correctAnswer: objective.correct,
    explanation: `${objective.explanation} For ${company}, the candidate should tailor the second level to the economics of a ${industry}.`,
    answerMode: 'choice' as const,
  })));
}

const creativityThemes = [
  ['New Revenue Streams', 'Generate ideas for new revenue streams without damaging the core proposition.'],
  ['Customer Retention', 'Generate initiatives that could materially improve customer retention.'],
  ['Low-Cost Growth', 'Generate growth ideas that require limited upfront capital.'],
  ['Digital Extension', 'Generate digital products or services that extend the current customer relationship.'],
  ['Sustainability Advantage', 'Generate commercially viable ideas that turn sustainability into an advantage.'],
] as const;

function buildCreativity(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => creativityThemes.map(([theme, prompt], themeIndex) => {
    const id = companyIndex * 5 + themeIndex + 1;
    return {
      id: `creativity-${String(id).padStart(3, '0')}`, skill: 'creativity' as const, difficulty: difficultyOf(id - 1), title: `${company} ${theme}`,
      question: `${company}, a ${industry}, asks: ${prompt} Produce at least six ideas across three distinct idea buckets, then identify the most promising idea and one risk.`,
      correctAnswer: `Customer-Led Ideas: Create A Premium Tier And A Loyalty-Based Bundle.\nProduct-Led Ideas: Add A Complementary Service And A Data-Enabled Personalisation Offer.\nChannel-Led Ideas: Launch A Partner Marketplace And A B2B Distribution Route.\nBest Bet: Pilot The Idea With The Strongest Customer Need, Margin Potential, And Capability Fit.\nKey Risk: Validate Cannibalisation, Operational Complexity, And Willingness To Pay Before Scaling.`,
      explanation: `Strong creativity answers combine breadth and originality with commercial filters. A good response spans customer, product, channel, partnership, and business-model ideas before prioritising by impact, feasibility, and strategic fit.`,
      answerMode: 'text' as const, workingPrompt: 'Write One Idea Per Line, Grouped Into Distinct Buckets.',
    };
  }));
}

const markets = [
  ['Takeaway Coffee', 68, 42, 95, 45, 3.2], ['Bubble Tea', 38, 36, 42, 58, 4.1],
  ['Meal Delivery', 72, 28, 30, 92, 8.5], ['Electric Scooters', 55, 9, 0.25, 28000, 1450],
  ['Online Tutoring', 24, 18, 24, 180, 12], ['Air Purifiers', 62, 8, 0.2, 5200, 310],
  ['Pet Food', 22, 34, 18, 240, 16], ['Fitness Memberships', 58, 12, 12, 650, 38],
  ['Streaming Subscriptions', 74, 31, 12, 120, 9], ['Private Health Checks', 64, 16, 0.8, 2100, 140],
  ['Solar Rooftops', 48, 5, 0.08, 68000, 4200], ['Cloud Software Seats', 18, 27, 12, 320, 22],
  ['Domestic Flights', 70, 22, 1.6, 1800, 125], ['Premium Skincare', 46, 29, 4, 720, 48],
  ['Digital Wallet Payments', 78, 57, 110, 6, 0.45], ['Coworking Desks', 16, 8, 8, 2100, 145],
  ['Home Insurance', 52, 7, 1, 1600, 115], ['Robot Vacuums', 44, 6, 0.16, 8900, 520],
  ['Language Learning Apps', 61, 14, 8, 190, 14], ['Sustainable Packaging', 26, 24, 12, 480, 34],
] as const;

const sizingRegions = [
  { name: 'Vietnam', population: 101, currency: 'VND' as const },
  { name: 'Ho Chi Minh City', population: 9.5, currency: 'VND' as const },
  { name: 'Hanoi', population: 8.6, currency: 'VND' as const },
  { name: 'Southeast Asia', population: 690, currency: 'USD' as const },
  { name: 'Global Urban Markets', population: 4600, currency: 'USD' as const },
];

function buildMarketSizing(): LibraryQuestion[] {
  return markets.flatMap(([market, eligible, adoption, frequency, priceVndK, priceUsd], marketIndex) => sizingRegions.map((region, regionIndex) => {
    const id = marketIndex * 5 + regionIndex + 1;
    const eligiblePeople = region.population * eligible / 100;
    const buyers = eligiblePeople * adoption / 100;
    const isVnd = region.currency === 'VND';
    const tam = round(buyers * frequency * (isVnd ? priceVndK : priceUsd), 1);
    const unit = isVnd ? 'VND Billion Per Year' : 'USD Million Per Year';
    const priceLabel = isVnd ? `VND ${priceVndK} thousand` : `USD ${priceUsd}`;
    return {
      id: `market-sizing-${String(id).padStart(3, '0')}`, skill: 'market-sizing' as const, difficulty: difficultyOf(id - 1),
      title: `${region.name} ${market} Market Size`,
      question: `Estimate the annual ${market.toLowerCase()} market in ${region.name}. Use a population of ${region.population} million, an eligible share of ${eligible}%, adoption of ${adoption}% among eligible people, annual purchase frequency of ${frequency}, and an average price of ${priceLabel}. Show each step and state the result in ${unit}.`,
      correctAnswer: `Market Size: ${tam.toLocaleString()} ${unit}`,
      explanation: `Eligible Population: ${region.population} million × ${eligible}% = ${round(eligiblePeople, 2)} million.\nAdopting Buyers: ${round(eligiblePeople, 2)} million × ${adoption}% = ${round(buyers, 2)} million.\nAnnual Units: ${round(buyers, 2)} million × ${frequency} = ${round(buyers * frequency, 2)} million.\nAnnual Market Value: ${round(buyers * frequency, 2)} million × ${priceLabel} = ${tam.toLocaleString()} ${unit}.\nSanity Check: Compare The Implied Spend Per Buyer With A Realistic Household Or Business Budget.`,
      answerMode: 'number' as const, numericAnswer: tam, numericTolerance: Math.max(0.2, tam * 0.01), answerUnit: unit,
      workingPrompt: 'Build The Estimate From Population To Eligible Users, Buyers, Frequency, And Price.',
    };
  }));
}

export const QUESTION_LIBRARY: Record<LibrarySkill, LibraryQuestion[]> = {
  charts: buildCharts(), structures: buildStructures(), calculations: buildCalculations(), creativity: buildCreativity(), 'market-sizing': buildMarketSizing(),
};

export const ALL_LIBRARY_QUESTIONS = SKILL_META.flatMap((skill) => QUESTION_LIBRARY[skill.id]);

export function questionCountFor(skill: LibrarySkill): number {
  return QUESTION_LIBRARY[skill].length;
}

export function validateQuestionLibrary(): string[] {
  const errors: string[] = [];
  for (const skill of SKILL_META) {
    const questions = QUESTION_LIBRARY[skill.id];
    if (questions.length !== 100) errors.push(`${skill.label} Has ${questions.length} Questions Instead Of 100.`);
    const ids = new Set(questions.map((question) => question.id));
    if (ids.size !== questions.length) errors.push(`${skill.label} Contains Duplicate Question IDs.`);
    questions.forEach((question) => {
      if (!question.question || !question.correctAnswer || !question.explanation) errors.push(`${question.id} Is Missing Required Content.`);
    });
  }
  return errors;
}
