export type PawviaTable = {
  columns: string[];
  rows: Array<Array<string | number>>;
};

export type PawviaExhibit = {
  id: number;
  title: string;
  description: string;
  unit?: string;
  table: PawviaTable;
  secondaryTable?: PawviaTable;
  profiles?: Array<{ segment: string; description: string }>;
  caveats: string[];
  chart: {
    type: 'bar' | 'line' | 'grouped-bar' | 'stacked-bar';
    categories: string[];
    series: Array<{ name: string; values: number[] }>;
    unit: string;
  };
};

export const PAWVIA_CASE = {
  caseId: 'master-pawvia-v1',
  version: '1.0.0',
  frozenAt: '2026-09-28T00:00:00.000Z',
  source: {
    title: 'Pawvia New Product Line and Profitability',
    subtitle: 'MASTER CASE | Product strategy and go to market | Candidate brief',
    pageCount: 4,
    sourceChecksum: 'pawvia-pdf-4-pages-validated-2026-09-28',
  },
  candidate: {
    title: 'Pawvia New Product Line and Profitability',
    businessBrief: [
      'Pawvia is a fictional pet-food company operating in Vietnam. It sells dry and wet food, treats and snacks. The brand entered Vietnam in 2018 and leads the urban pet-food market by volume. Rising logistics, labour and imported-input costs now put pressure on its economics. Its growth has relied heavily on distribution and recommendations from other pet owners.',
      'As strategy director, you must recommend one new product line and a viable launch plan. The board wants a specific target buyer, evidence that the opportunity can grow the category and Pawvia, and a path to protect operating profit.',
      'Your proposal must connect consumer demand, product concept, pricing, channels, marketing, supply chain and investment choices. The analysis concerns four urban markets: Ho Chi Minh City, Hanoi, Da Nang and Can Tho.',
    ],
    definitions: [
      'Value is million VND; volume is thousand kilograms; average price is thousand VND per kilogram.',
      '“YoY” compares the current year with the previous year. Figures are rounded independently.',
      'Premium means above 96 thousand VND per kilogram; mainstream means 64 to 96; economy means below 64.',
      'Penetration is the share of all households buying at least once; it is not brand share.',
      'Top-two rating means the share of respondents selecting one of the two highest response options; it is not a purchase forecast.',
    ],
    exhibits: [
      {
        id: 1,
        title: 'Urban market and brand growth',
        description: 'Full-year household panel for Ho Chi Minh City, Hanoi, Da Nang and Can Tho.',
        unit: 'Value: million VND · Volume: thousand kg · Average price: thousand VND/kg',
        table: {
          columns: ['Metric', 'Category current', 'Category YoY', 'Pawvia current', 'Pawvia YoY'],
          rows: [
            ['Sales value', '230,380', '+18.2%', '71,369', '+13.7%'],
            ['Sales volume', '2,700', '+11.7%', '950', '+12.3%'],
            ['Average price', '85.3', '+5.9%', '75.1', '+1.2%'],
            ['Buyer households, thousand', '295', '+10.1%', '140', '+13.3%'],
            ['Penetration of all households', '9.3%', '+6.9%', '4.4%', '+10.0%'],
            ['Annual shopping trips per buyer', '6.1', '-15.3%', '3.8', '-9.5%'],
            ['Volume per trip, kg', '1.5', '+19.7%', '1.8', '+9.6%'],
            ['Annual volume per buyer, kg', '9.2', '+1.4%', '6.8', '-0.9%'],
            ['Annual spend per buyer, thousand VND', '780.8', '+7.4%', '511.3', '+0.3%'],
          ],
        },
        caveats: [
          'The panel covers approximately 3.173 million households.',
          'Pawvia has about 35% category volume share (950 / 2,700) but about 31% value share (71,369 / 230,380).',
          'Buyer count, trips, spend and volume are rounded survey estimates and need not multiply to exact reported sales.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Sales value YoY', 'Sales volume YoY', 'Average price YoY', 'Buyer households YoY'],
          series: [
            { name: 'Category', values: [18.2, 11.7, 5.9, 10.1] },
            { name: 'Pawvia', values: [13.7, 12.3, 1.2, 13.3] },
          ],
          unit: '% YoY',
        },
      },
      {
        id: 2,
        title: 'Where the category is moving',
        description: 'Shares of category sales volume in the same four cities.',
        unit: 'Category volume share',
        table: {
          columns: ['Category measure', 'Prior year', 'Current year'],
          rows: [
            ['Wet food share', '8.6%', '9.6%'],
            ['Food for cats', '51.7%', '54.5%'],
            ['Premium, above 96 thousand VND/kg', '10.0%', '14.5%'],
            ['Mainstream, 64 to 96 thousand VND/kg', '45.0%', '48.2%'],
            ['Economy, below 64 thousand VND/kg', '45.0%', '37.3%'],
          ],
        },
        caveats: [
          'Other pet types account for the remaining current volume after cat and dog food.',
          'Premium, mainstream and economy tiers sum to 100% in each year.',
          'Price-tier changes are shifts in volume mix, not category revenue growth rates.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Wet food', 'Food for cats', 'Premium', 'Mainstream', 'Economy'],
          series: [
            { name: 'Prior year', values: [8.6, 51.7, 10.0, 45.0, 45.0] },
            { name: 'Current year', values: [9.6, 54.5, 14.5, 48.2, 37.3] },
          ],
          unit: '% category volume',
        },
      },
      {
        id: 3,
        title: 'Competitors and route to market',
        description: 'Current brand volume share and year-on-year volume growth, plus current category channel mix.',
        unit: 'Category volume',
        table: {
          columns: ['Brand', 'Volume share now', 'Volume growth YoY'],
          rows: [
            ['Pawvia', '35%', '+12%'],
            ['HappyPaws', '21%', '-10%'],
            ['LoyalPet', '18%', '+14%'],
            ['PureTail', '17%', '+6%'],
            ['KindredPet', '9%', '+22%'],
          ],
        },
        secondaryTable: {
          columns: ['Channel', 'Current volume share'],
          rows: [
            ['Street shops', '37.7%'],
            ['Specialty pet stores', '26.4%'],
            ['Online', '20.6%'],
            ['All other channels', '15.3%'],
          ],
        },
        caveats: [
          'Online and convenience-led shopping are emerging behaviours, but the case does not provide channel-specific growth, Pawvia distribution by channel or channel margins.',
          'Do not assume that the biggest current channel delivers the best launch economics.',
          'The gap between Pawvia volume share and value share is consistent with its lower reported average price; it does not by itself prove that a price increase is feasible.',
          'Competition, buyer response and promotional effects require validation.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Pawvia', 'HappyPaws', 'LoyalPet', 'PureTail', 'KindredPet'],
          series: [
            { name: 'Volume share now', values: [35, 21, 18, 17, 9] },
          ],
          unit: '%',
        },
      },
      {
        id: 4,
        title: 'Buyer segments',
        description: 'Consumer segmentation research estimates the share of category buyers and how each group views pets. Segment names and product descriptions have been adapted for this fictional case.',
        unit: 'Share of category buyers and Pawvia share within segment',
        table: {
          columns: ['Segment', 'Buyer share', 'Pawvia share within segment'],
          rows: [
            ['Family carers', '32%', '28%'],
            ['Active companions', '45%', '47%'],
            ['Status seekers', '14%', '20%'],
            ['Comfort seekers', '9%', '25%'],
          ],
        },
        profiles: [
          { segment: 'Family carers', description: 'Nutritious fresh meals; pets as family' },
          { segment: 'Active companions', description: 'Flexible food choices; outings with pets' },
          { segment: 'Status seekers', description: 'Premium grooming and portable treats' },
          { segment: 'Comfort seekers', description: 'Care and companionship; mixed wet and dry' },
        ],
        caveats: [
          'Share within segment is Pawvia share of that segment, not the share of Pawvia total sales.',
          'Segment volume, purchase frequency and profit per buyer are not directly provided.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Family carers', 'Active companions', 'Status seekers', 'Comfort seekers'],
          series: [
            { name: 'Pawvia share within segment', values: [28, 47, 20, 25] },
          ],
          unit: '%',
        },
      },
      {
        id: 5,
        title: 'Competitive standing by segment',
        description: 'Brand shares within each buyer segment.',
        unit: 'Share within segment',
        table: {
          columns: ['Brand', 'Family carers', 'Active companions', 'Status seekers', 'Comfort seekers'],
          rows: [
            ['Pawvia', '28%', '47%', '20%', '25%'],
            ['HappyPaws', '20%', '19%', '10%', '20%'],
            ['LoyalPet', '12%', '18%', '25%', '22%'],
            ['PureTail', '14%', '14%', '17%', '33%'],
            ['KindredPet', '26%', '2%', '28%', '0%'],
          ],
        },
        caveats: [
          'The shares within each segment sum to 100%.',
          'Avoid multiplying buyer share by brand share and calling the result sales value without spending and purchase-volume data.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Family carers', 'Active companions', 'Status seekers', 'Comfort seekers'],
          series: [
            { name: 'Pawvia', values: [28, 47, 20, 25] },
            { name: 'HappyPaws', values: [20, 19, 10, 20] },
            { name: 'LoyalPet', values: [12, 18, 25, 22] },
            { name: 'PureTail', values: [14, 14, 17, 33] },
            { name: 'KindredPet', values: [26, 2, 28, 0] },
          ],
          unit: '% within segment',
        },
      },
      {
        id: 6,
        title: 'Consumer concept test',
        description: 'Concept A is a broadly appealing nutritious meal range for everyday feeding. Concept B is a more distinctive portable premium treat range for early adopters. The descriptions make the survey profiles actionable; results are adapted fictional test results.',
        unit: 'Top-two rating share',
        table: {
          columns: ['Test measure', 'Concept A', 'Concept B'],
          rows: [
            ['Purchase intent', '68%', '60%'],
            ['Appeal', '65%', '58%'],
            ['Uniqueness', '48%', '68%'],
            ['Relevance', '50%', '44%'],
            ['Excitement', '70%', '71%'],
            ['Believability', '80%', '65%'],
          ],
        },
        caveats: [
          'Each percentage is the share of respondents giving a top-two rating, not a forecast of purchases.',
          'The study does not supply sample sizes, prices, unit costs or results by buyer segment.',
          'Do not interpret an eight-point gap in stated intent as an eight-point difference in actual market conversion.',
        ],
        chart: {
          type: 'grouped-bar',
          categories: ['Purchase intent', 'Appeal', 'Uniqueness', 'Relevance', 'Excitement', 'Believability'],
          series: [
            { name: 'Concept A', values: [68, 65, 48, 50, 70, 80] },
            { name: 'Concept B', values: [60, 58, 68, 44, 71, 65] },
          ],
          unit: '% top-two rating',
        },
      },
      {
        id: 7,
        title: 'Pawvia income statement',
        description: 'Amounts are million VND. Percentages and absolute values are rounded. The 2019 operating-profit value is reconciled from displayed gross profit and expenses, correcting an inconsistent source total.',
        unit: 'million VND unless stated',
        table: {
          columns: ['Metric', '2019', '2020', '2021'],
          rows: [
            ['Gross sales', '57,079.7', '62,798.5', '71,369.0'],
            ['Trade spend', '(5,708.0)', '(6,279.9)', '(7,136.9)'],
            ['Net sales', '51,371.7', '56,518.7', '64,232.1'],
            ['Gross profit', '20,548.7', '22,042.3', '25,050.5'],
            ['Gross margin / net sales', '40.0%', '39.0%', '39.0%'],
            ['Marketing and selling', '(5,137.2)', '(6,217.1)', '(8,350.2)'],
            ['Marketing and selling / net sales', '10.0%', '11.0%', '13.0%'],
            ['General and other expenses', '(2,568.6)', '(2,825.9)', '(3,211.6)'],
            ['Operating profit', '12,842.9', '12,999.3', '13,488.7'],
            ['Operating margin / net sales', '25.0%', '23.0%', '21.0%'],
          ],
        },
        caveats: [
          'Trade spend is 10% of gross sales in each year.',
          'Operating profit = gross profit − marketing and selling expenses − general and other expenses.',
          'Sales and operating profit are growing in absolute terms, while operating margin declines.',
          'A launch recommendation must show a credible route to profitable incremental growth.',
        ],
        chart: {
          type: 'line',
          categories: ['2019', '2020', '2021'],
          series: [
            { name: 'Net sales', values: [51371.7, 56518.7, 64232.1] },
            { name: 'Gross profit', values: [20548.7, 22042.3, 25050.5] },
            { name: 'Operating profit', values: [12842.9, 12999.3, 13488.7] },
          ],
          unit: 'million VND',
        },
      },
    ] as PawviaExhibit[],
    assignment: [
      'Diagnose the growth and profit problem. Decompose category and Pawvia growth into buyer reach, purchase frequency, volume per trip and price. Explain the gap between volume share and value share and the three-year operating-margin decline. Distinguish facts, arithmetic implications and untested hypotheses.',
      'Choose one primary buyer segment and one new product concept. Compare the addressable opportunity, brand right to win, competitive intensity, survey results and risks of cannibalising Pawvia existing products. Explain why your selected concept is preferable to the alternative under the stated evidence.',
      'Design a staged go-to-market plan covering product proposition, price and pack architecture, initial channels, marketing, supply-chain readiness, owners and timing. Address cost inflation and the shift toward premium, wet food and online purchasing without treating every trend as a separate launch mandate.',
      'Present a simple financial case. Set out the incremental sales, gross profit, launch spending, cannibalisation and operating-profit formula; calculate break-even conditions using explicit assumptions. Identify the data required before a full rollout. The case does not give unit costs, media effectiveness or concept-specific conversion, so do not fabricate a precise ROI.',
    ],
    deliverable: 'A 15-minute board recommendation with a clear issue tree, target choice, concept choice, phased test, measurable decision gates and a defensible path to growth with protected operating profit. No single concept or segment is automatically correct; support your judgment with the exhibits.',
  },
} as const;

export const PAWVIA_REBUTTAL_BANK = {
  Finance: [
    'Operating margin declined despite growing sales between 2019 and 2021. Identify the expense line(s) driving this and explain what assumptions your team needs for a launch break-even estimate.',
    'Your team’s recommendation requires a new product launch. What is the minimum incremental revenue needed to maintain the 2021 operating profit level, assuming no change in the existing expense structure?',
  ],
  Marketing: [
    'Concept A and Concept B had different purchase-intent and uniqueness scores. Walk through why your team chose one over the other, citing the specific exhibit values.',
    'Which buyer segment did your team prioritise for the launch, and which exhibit most strongly supports targeting that segment over the others?',
  ],
  'Sales/Commercial': [
    'Your team’s go-to-market plan names an initial channel. Without assuming channel profitability from volume share data alone, what data would you need to confirm that channel is commercially viable?',
    'The exhibit shows channel volume share. What is the difference between volume share and value share, and why does this distinction matter for your channel recommendation?',
  ],
  'Supply Chain': [
    'How does your proposed product line affect Pawvia’s input-cost risk or production capacity? What assumption did your team make about manufacturing feasibility?',
    'If the proposed launch requires a new SKU, what supply chain capability or partnership does Pawvia most urgently need to build or secure?',
  ],
  Strategy: [
    'Describe the issue tree your team used to diagnose Pawvia’s core problem. Which branch did you prioritise and why?',
    'Your recommendation protects operating profit. What is the single biggest risk to that goal in year 1, and how did your team account for it?',
  ],
  'Human Resources': [
    'What capabilities and ownership does Pawvia need to execute the launch you’ve recommended? Identify the most critical role or team and explain why.',
    'The PDF does not contain HR performance data. Given that limitation, what HR assumption did your team make, and how would you validate it before launch?',
  ],
} as const;

export const CASE_MASTERY_STAGES = [
  { id: 'checkin', label: 'Warm-up / check-in', minutes: 20 },
  { id: 'solve', label: 'Solve Pawvia', minutes: 60 },
  { id: 'rebuttal', label: 'Function-specific rebuttal', minutes: 30 },
  { id: 'peer_review', label: 'Peer review', minutes: 10 },
  { id: 'feedback', label: 'Feedback', minutes: 40 },
] as const;
