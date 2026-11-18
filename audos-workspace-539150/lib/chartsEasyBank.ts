import type { FullCase } from './casePoolLibrary';
import type { LibraryExhibit, LibraryQuestion } from './skillQuestionLibrary';
import { chartApproachTips } from './caseGuidance';
import { findUndefinedVagueLabels } from './vagueLabelAudit';
import { casePoolTaskFromDrill, poolCaseMcqProblems } from './casePoolMcqGuard';
import { chartsEasyPoolAnswer } from './chartsEasyPoolAnswer';
import { blockingUnitShorthand } from './unitLabels';

/**
 * Charts / Easy import: cases E-CH-001 to E-CH-026 and E-CH-044 to E-CH-068 of the
 * founder's 68-case Charts Easy bank (E-CH-027 to E-CH-043 are not imported yet).
 * Every figure, label, option, key and
 * explanation below is copied from the source PDFs; charts are rebuilt from the
 * printed DATA lines. One record feeds both Case Drill (QUESTION_LIBRARY) and
 * Case Pool (CASE_POOL_LIBRARY) so the two products can never disagree.
 */
export interface ChartsEasyRecord {
  code: string;
  chart: string;
  industry: string;
  title: string;
  question: string;
  options: [string, string, string, string];
  key: string;
  why: string;
  data: string;
  pool: [string, string];
  exhibits: LibraryExhibit[];
}

const ex = (code: string, index: number, exhibit: Omit<LibraryExhibit, 'id'>): LibraryExhibit => ({ id: `charts-easy-${code.slice(-3)}-ex${index}`, ...exhibit });

export const CHARTS_EASY_RECORDS: ChartsEasyRecord[] = [
  {
    code: 'E-CH-001',
    chart: 'line',
    industry: 'outpatient care',
    title: 'An Phuc Clinics: Whether evening clinics justify a shift in staffing',
    question: 'For An Phuc Clinics, what is the Q1-to-Q4 change in visits (thousand), and why would an endpoint-only conclusion need a caveat before whether evening clinics justify a shift in staffing?',
    options: [
      '-14 thousand; compare Q2 with Q4 instead of Q1.',
      '+2 thousand (+2.2%); the intervening quarters must be checked before extrapolating.',
      '+2 thousand (+2.1%); use Q4 as the denominator.',
      '+29 thousand (+31.5%); stop at Q3.',
    ],
    key: '+2 thousand (+2.2%); the intervening quarters must be checked before extrapolating.',
    why: 'Use Q4 minus Q1 = 94 - 92 = 2; divide by the Q1 base 92 for +2.2%. Q2 and Q3 show the path is not captured by endpoints alone.',
    data: 'Q1 92; Q2 108; Q3 121; Q4 94',
    pool: ['healthcare', 'growth'],
    exhibits: [
      ex('E-CH-001',1,{kind:'line',title:'An Phuc Clinics - Visits by quarter',unit:'thousand',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Visits',values:[92,108,121,94]}],axisConfig:{xLabel:'Quarter',yLabel:'Visits (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-002',
    chart: 'grouped bars',
    industry: 'recycled packaging',
    title: 'Beacon Plastics: Which resin line deserves the next production run',
    question: 'Which Beacon Plastics business line produces the highest gross profit, and what comparison matters for which resin line deserves the next production run?',
    options: [
      'Business Line A: 79 × 24% = 18.96 billion VND; compare absolute contribution, not margin alone.',
      'Business Line C: 60 × 27% = 16.20 billion VND',
      'Business Line B: 36 × 22% = 7.92 billion VND',
      'Business Line B: 36 × 27% = 9.72 billion VND',
    ],
    key: 'Business Line A: 79 × 24% = 18.96 billion VND; compare absolute contribution, not margin alone.',
    why: 'Multiply revenue by gross margin for each business line: Business Line A 18.96, Business Line B 7.92, Business Line C 16.20. Business Line C (16.20) and Business Line B (7.92) are the gross profits of the other lines and rank lower; 9.72 pairs Business Line B revenue with the Business Line C margin of 27%. Ranking by revenue alone (Business Line A 79 billion VND) or by margin alone (Business Line C 27%) mixes up size and rate, so compare absolute contribution.',
    data: 'Business Line A revenue 79 billion VND, gross margin 24%; Business Line B revenue 36 billion VND, gross margin 22%; Business Line C revenue 60 billion VND, gross margin 27%',
    pool: ['fmcg', 'strategy'],
    exhibits: [
      ex('E-CH-002',1,{kind:'grouped-bar',title:'Beacon Plastics - Revenue by business line',unit:'billion VND',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Revenue',values:[79,36,60]}],axisConfig:{xLabel:'Business line',yLabel:'Revenue (billion VND)'}}),
      ex('E-CH-002',2,{kind:'grouped-bar',title:'Beacon Plastics - Gross margin by business line',unit:'%',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Gross margin',values:[24,22,27],color:'#1d4ed8'}],axisConfig:{xLabel:'Business line',yLabel:'Gross margin (%)'}}),
    ],
  },
  {
    code: 'E-CH-003',
    chart: 'grouped bars',
    industry: 'inland freight',
    title: 'CanalLink: Where vessel delays are eroding contribution',
    question: 'Which channel changed most in percentage points for CanalLink, and what should be tested before where vessel delays are eroding contribution?',
    options: [
      'Other: -21% relative change; conflate pp and relative growth.',
      'Direct: +4 pp; overlook a larger channel movement.',
      'Partner: +17 pp; focus only on a gain.',
      'Other: -21 pp; test segment economics before reallocating.',
    ],
    key: 'Other: -21 pp; test segment economics before reallocating.',
    why: 'Subtract 2025 share from 2026 share for each channel: Direct +4 pp, Partner +17 pp, Other -21 pp. Shares sum to 100% in both years.',
    data: '2025: Direct 31%, Partner 19%, Other 50%; 2026: Direct 35%, Partner 36%, Other 29%',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-003',1,{kind:'grouped-bar',title:'CanalLink - Channel share by year',unit:'%',categories:['Direct','Partner','Other'],series:[{name:'2025',values:[31,19,50]},{name:'2026',values:[35,36,29]}],axisConfig:{xLabel:'Channel',yLabel:'Share of total (%)'},analyticalPurpose:'Compare each channel\'s 2025 and 2026 share side by side; the gap between its two bars is the change in percentage points.'}),
    ],
  },
  {
    code: 'E-CH-004',
    chart: 'waterfall',
    industry: 'frozen meals',
    title: 'Dawn Foods: Which supermarket format merits a rollout',
    question: 'What is the ending contribution for Dawn Foods, and which adverse driver is largest before which supermarket format merits a rollout?',
    options: [
      '34 billion VND; Cost (-4 billion VND) is the largest negative bridge.',
      '33 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '34 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '40 billion VND; Cost (-4 billion VND) is the largest negative bridge.',
    ],
    key: '34 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
    why: '33 +6 -6 +5 -4 = 34. Compare the negative bridge magnitudes, not their plotted positions. Naming Cost (-4) as the largest negative gives the right total but the wrong driver; reading the Start bar (33) or leaving out the Volume step (33 +6 +5 -4 = 40) gives the wrong total. Treating negative drivers as gains would give 54.',
    data: 'Start 33; Price 6; Volume -6; Mix 5; Cost -4; End 34',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-004',1,{kind:'waterfall',title:'Dawn Foods - Contribution bridge',unit:'billion VND',categories:['Start','Price','Volume','Mix','Cost','End'],series:[{name:'Contribution',values:[33,6,-6,5,-4,34]}]}),
    ],
  },
  {
    code: 'E-CH-005',
    chart: 'scatter',
    industry: 'rooftop energy',
    title: 'Eden Solar: Whether the installer network is meeting the payback gate',
    question: 'Using a minimum demand index of 25, which Eden Solar option has the highest contribution, and what does the exhibit leave unresolved?',
    options: [
      'E: demand 30, contribution 6 VND million',
      'A: demand 26, contribution 13 VND million; test the cost of scaling.',
      'D: demand 17, contribution 13 VND million',
      'B: demand 19, contribution 9 VND million',
    ],
    key: 'A: demand 26, contribution 13 VND million; test the cost of scaling.',
    why: 'Filter demand index ≥25, then compare contribution among eligible options. The scatter does not establish scalable unit economics. E (demand 30, contribution 6) clears the threshold but has the lowest contribution of the eligible options; D (17, 13) ties A on contribution and B (19, 9) is next, but both fall below the demand index of 25. Apply the threshold first, then compare contribution.',
    data: 'A demand 26, contribution 13; B demand 19, contribution 9; C demand 22, contribution 8; D demand 17, contribution 13; E demand 30, contribution 6',
    pool: ['logistics', 'operations'],
    exhibits: [
      ex('E-CH-005',1,{kind:'scatter',title:'Eden Solar - Demand vs contribution',unit:'VND million',categories:['A','B','C','D','E'],series:[{name:'Contribution',values:[13,9,8,13,6],xValues:[26,19,22,17,30],displayValues:['demand 26, contribution 13','demand 19, contribution 9','demand 22, contribution 8','demand 17, contribution 13','demand 30, contribution 6']}],axisConfig:{xLabel:'Demand index',yLabel:'Contribution (VND million)'}}),
    ],
  },
  {
    code: 'E-CH-006',
    chart: 'heatmap',
    industry: 'specialty beverages',
    title: 'Fjord Coffee: Which city cohort is sustaining repeat orders',
    question: 'Which Fjord Coffee region-month cell has the highest score, and why should a single peak not settle which city cohort is sustaining repeat orders?',
    options: [
      'Central, Month 3: 90 points; check repeatability across months.',
      'South, Month 1: 87 points',
      'North, Month 1: 84 points',
      'North, Month 3: 74 points',
    ],
    key: 'Central, Month 3: 90 points; check repeatability across months.',
    why: 'Inspect all 12 cells and distinguish the maximum cell from a regional average or sustained trend. The other cells quoted (South Month 1 87, North Month 1 84, North Month 3 74) are lower; a row total such as Central 237 or a month column such as Month 3 is not a single-cell score, so read each of the 12 cells rather than a row sum or regional average.',
    data: 'North: Month 1 84, Month 2 60, Month 3 74, Month 4 61; South: Month 1 87, Month 2 57, Month 3 90, Month 4 60; Central: Month 1 50, Month 2 49, Month 3 90, Month 4 48',
    pool: ['fmcg', 'operations'],
    exhibits: [
      ex('E-CH-006',1,{kind:'heatmap',title:'Fjord Coffee - Score by region and month',unit:'points',categories:['North','South','Central'],series:[{name:'Month 1',values:[84,87,50]},{name:'Month 2',values:[60,57,49]},{name:'Month 3',values:[74,90,90]},{name:'Month 4',values:[61,60,48]}]}),
    ],
  },
  {
    code: 'E-CH-007',
    chart: 'bullet',
    industry: 'telehealth',
    title: 'Grove Health: Whether reminders improve retained consultations',
    question: 'Which Grove Health site has the largest percentage shortfall to target, and what is the first diagnostic for whether reminders improve retained consultations?',
    options: [
      'Site C: 6.4% below target',
      'Site A: 1.0% below target',
      'Site B: 9.2% below target',
      'Site B: 8.4% below target; inspect the driver of its gap.',
    ],
    key: 'Site B: 8.4% below target; inspect the driver of its gap.',
    why: 'For each site calculate (target - actual)/target; different target bases make absolute gaps misleading. Site C is 7/109 = 6.4% and Site A is 1/99 = 1.0% below target; 9.2% divides Site B gap by its actual (10/109) instead of its target, and treating the unit gap of 10 as a percentage is the same kind of slip. Site D is above target.',
    data: 'Site A actual 98, target 99; Site B actual 109, target 119; Site C actual 102, target 109; Site D actual 108, target 88',
    pool: ['healthcare', 'operations'],
    exhibits: [
      ex('E-CH-007',1,{kind:'bullet',title:'Grove Health - Actual vs target by site',unit:'',categories:['Site A','Site B','Site C','Site D'],series:[{name:'Actual',values:[98,109,102,108]},{name:'Target',values:[99,119,109,88],color:'var(--space-semantic-danger-600)'}]}),
    ],
  },
  {
    code: 'E-CH-008',
    chart: 'slopegraph',
    industry: 'textiles',
    title: 'Hanoi Loom: Which export order mix protects gross profit',
    question: 'Which Hanoi Loom region gained the most share in percentage points, and what is not proven by that slope?',
    options: [
      'Coastal: +7 pp',
      'Metro: +3 pp',
      'Highland: +10 pp; the chart does not prove absolute volume growth.',
      'Delta: +1 pp',
    ],
    key: 'Highland: +10 pp; the chart does not prove absolute volume growth.',
    why: 'Compare end minus start for each region; share movement and volume movement are different measures. Coastal (+7 pp) has the highest end share (34%) but a smaller gain than Highland; Metro (+3 pp) and Delta (+1 pp) moved least. Reading the Highland gain as +10% would mix percentage points with relative growth.',
    data: 'Metro 17% → 20%; Coastal 27% → 34%; Highland 23% → 33%; Delta 27% → 28%',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-008',1,{kind:'slope',title:'Hanoi Loom - Share by region, start vs end',unit:'%',categories:['Start','End'],series:[{name:'Metro',values:[17,20]},{name:'Coastal',values:[27,34]},{name:'Highland',values:[23,33]},{name:'Delta',values:[27,28]}],axisConfig:{yLabel:'Share (%)'}}),
    ],
  },
  {
    code: 'E-CH-009',
    chart: 'area',
    industry: 'electric buses',
    title: 'Iris Mobility: Where charging downtime changes route economics',
    question: 'What is the peak-to-trough swing in Iris Mobility demand, and why is a single-month average insufficient for where charging downtime changes route economics?',
    options: [
      '68 thousand; the mean is the peak-to-trough range.',
      '40 thousand; Jan peaks at 82 and Feb bottoms at 42.',
      '82 thousand; the peak itself is the swing.',
      '40% without dividing by the trough.',
    ],
    key: '40 thousand; Jan peaks at 82 and Feb bottoms at 42.',
    why: 'Peak minus trough = 82 - 42 = 40; variation matters when capacity or allocation is fixed.',
    data: 'Jan 82; Feb 42; Mar 64; Apr 59; May 81; Jun 80',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-009',1,{kind:'area',title:'Iris Mobility - Demand by month',unit:'thousand',categories:['Jan','Feb','Mar','Apr','May','Jun'],series:[{name:'Demand',values:[82,42,64,59,81,80]}],axisConfig:{xLabel:'Month',yLabel:'Demand (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-010',
    chart: 'funnel',
    industry: 'digital payments',
    title: 'JadePay: Which merchant segment clears the activation hurdle',
    question: 'How many JadePay applications reach completion, and which conversion stage should be checked before which merchant segment clears the activation hurdle?',
    options: [
      '3,732 completed; apply 68%, 65%, then 76% sequentially.',
      '7,740 completed; average the three rates.',
      '8,444 completed; apply the last rate to all reached users.',
      '4,911 completed; starts and completions are interchangeable.',
    ],
    key: '3,732 completed; apply 68%, 65%, then 76% sequentially.',
    why: '11,110 × 68% × 65% × 76% ≈ 3,732 after stage rounding; inspect losses at each stage.',
    data: 'Reached 11,110; Eligible 7,555; Started 4,911; Completed 3,732',
    pool: ['tech', 'growth'],
    exhibits: [
      ex('E-CH-010',1,{kind:'funnel',title:'JadePay - Application funnel',unit:'applications',categories:['Reached','Eligible','Started','Completed'],series:[{name:'Applications',values:[11110,7555,4911,3732]}]}),
    ],
  },
  {
    code: 'E-CH-011',
    chart: 'donut',
    industry: 'online education',
    title: 'Kite Learning: Whether term-time acquisition remains efficient',
    question: 'What share do the two largest slices of the Kite Learning segment exhibit represent, and what concentration risk matters for whether term-time acquisition remains efficient?',
    options: [
      '48% (Segment A 25% + Segment B 23%)',
      '52% (Other segments 38% + Segment C 14%)',
      '37% (Segment B 23% + Segment C 14%)',
      '63% (Other segments 38% + Segment A 25%); test dependence on the leaders.',
    ],
    key: '63% (Other segments 38% + Segment A 25%); test dependence on the leaders.',
    why: 'Rank the slice shares before adding the two largest; the slices total 100%. Segment A + Segment B (48%) adds the first two slices in the order printed rather than the two largest; Other segments + Segment C (52%) pairs the largest slice with the smallest; Segment B + Segment C (37%) is the tail, not the leaders.',
    data: 'Segment A 25; Segment B 23; Segment C 14; Other segments 38',
    pool: ['tech', 'strategy'],
    exhibits: [
      ex('E-CH-011',1,{kind:'donut',title:'Kite Learning - Share by segment',unit:'%',categories:['Segment A','Segment B','Segment C','Other segments'],series:[{name:'Share',values:[25,23,14,38]}]}),
    ],
  },
  {
    code: 'E-CH-012',
    chart: 'combo bars and line',
    industry: 'container terminals',
    title: 'Lotus Ports: Which berth schedule reduces idle capacity',
    question: 'Which quarter has the highest estimated Lotus Ports sales value, and why can volume alone mislead which berth schedule reduces idle capacity?',
    options: [
      'Q4: 35 thousand × 177 thousand VND = 6.20 billion VND.',
      'Q1: 59 thousand × 121 thousand VND = 7.14 billion VND.',
      'Q2: 65 thousand × 139 thousand VND = 9.04 billion VND.',
      'Q3: 46 thousand × 155 thousand VND = 7.13 billion VND.',
    ],
    key: 'Q2: 65 thousand × 139 thousand VND = 9.04 billion VND.',
    why: 'Multiply order volume (thousands) by average order value (thousand VND), then divide by 1,000 for VND billion. The other quarters give Q4 6.20, Q1 7.14 and Q3 7.13, all lower. Q4 has the highest basket value, but sales depend on volume and value together; adding the two (65 + 139) would mix unlike units.',
    data: 'Q1 volume 59 thousand, AOV (average order value) 121 thousand VND; Q2 volume 65 thousand, AOV 139 thousand VND; Q3 volume 46 thousand, AOV 155 thousand VND; Q4 volume 35 thousand, AOV 177 thousand VND',
    pool: ['logistics', 'profitability'],
    exhibits: [
      ex('E-CH-012',1,{kind:'combo',title:'Lotus Ports - Volume and average order value by quarter',unit:'',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Volume',values:[59,65,46,35],unit:'thousand',color:'#1d4ed8'},{name:'Average order value (AOV)',values:[121,139,155,177],unit:'thousand VND',axis:'right',color:'var(--space-brand-primary-700)'}],axisConfig:{xLabel:'Quarter',yLabel:'Volume (thousand)',rightYLabel:'AOV (thousand VND)'}}),
    ],
  },
  {
    code: 'E-CH-013',
    chart: 'line',
    industry: 'fresh produce',
    title: 'Mango Fresh: Which cold-chain lane reduces spoilage',
    question: 'For Mango Fresh, what is the Q1-to-Q4 change in units (thousand), and why would an endpoint-only conclusion need a caveat before which cold-chain lane reduces spoilage?',
    options: [
      '-9 thousand; compare Q2 with Q4 instead of Q1.',
      '+7 thousand (+7.6%); the intervening quarters must be checked before extrapolating.',
      '+7 thousand (+7.1%); use Q4 as the denominator.',
      '+29 thousand (+31.5%); stop at Q3.',
    ],
    key: '+7 thousand (+7.6%); the intervening quarters must be checked before extrapolating.',
    why: 'Use Q4 minus Q1 = 99 - 92 = 7; divide by the Q1 base 92 for +7.6%. Q2 and Q3 show the path is not captured by endpoints alone.',
    data: 'Q1 92; Q2 108; Q3 121; Q4 99',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-013',1,{kind:'line',title:'Mango Fresh - Units by quarter',unit:'thousand',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Units',values:[92,108,121,99]}],axisConfig:{xLabel:'Quarter',yLabel:'Units (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-014',
    chart: 'grouped bars',
    industry: 'generic medicines',
    title: 'Nexa Pharma: Which therapy portfolio funds expansion',
    question: 'Which Nexa Pharma business line produces the highest gross profit, and what comparison matters for which therapy portfolio funds expansion?',
    options: [
      'Business Line B: 28 × 35% = 9.80 billion VND; compare absolute contribution, not margin alone.',
      'Business Line A: 42 × 22% = 9.24 billion VND',
      'Business Line C: 36 × 21% = 7.56 billion VND',
      'Business Line A: 42 × 35% = 14.70 billion VND',
    ],
    key: 'Business Line B: 28 × 35% = 9.80 billion VND; compare absolute contribution, not margin alone.',
    why: 'Multiply revenue by gross margin for each business line: Business Line A 9.24, Business Line B 9.80, Business Line C 7.56. Business Line A (9.24) and Business Line C (7.56) are the gross profits of the other lines and rank lower; 14.70 pairs Business Line A revenue with the Business Line B margin of 35%. Business Line A has the largest sales (42 billion VND) but a lower margin, so ranking by revenue alone favours the wrong line.',
    data: 'Business Line A revenue 42 billion VND, gross margin 22%; Business Line B revenue 28 billion VND, gross margin 35%; Business Line C revenue 36 billion VND, gross margin 21%',
    pool: ['healthcare', 'profitability'],
    exhibits: [
      ex('E-CH-014',1,{kind:'grouped-bar',title:'Nexa Pharma - Revenue by business line',unit:'billion VND',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Revenue',values:[42,28,36]}],axisConfig:{xLabel:'Business line',yLabel:'Revenue (billion VND)'}}),
      ex('E-CH-014',2,{kind:'grouped-bar',title:'Nexa Pharma - Gross margin by business line',unit:'%',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Gross margin',values:[22,35,21],color:'#1d4ed8'}],axisConfig:{xLabel:'Business line',yLabel:'Gross margin (%)'}}),
    ],
  },
  {
    code: 'E-CH-015',
    chart: 'grouped bars',
    industry: 'hospitality',
    title: 'Orchid Hotels: Whether weekend demand offsets weekday discounting',
    question: 'Which channel changed most in percentage points for Orchid Hotels, and what should be tested before whether weekend demand offsets weekday discounting?',
    options: [
      'Other: -15% relative change; conflate pp and relative growth.',
      'Direct: +14 pp; overlook a larger channel movement.',
      'Partner: +1 pp; focus only on a gain.',
      'Other: -15 pp; test segment economics before reallocating.',
    ],
    key: 'Other: -15 pp; test segment economics before reallocating.',
    why: 'Subtract 2025 share from 2026 share for each channel: Direct +14 pp, Partner +1 pp, Other -15 pp. Shares sum to 100% in both years.',
    data: '2025: Direct 29%, Partner 32%, Other 39%; 2026: Direct 43%, Partner 33%, Other 24%',
    pool: ['retail', 'growth'],
    exhibits: [
      ex('E-CH-015',1,{kind:'grouped-bar',title:'Orchid Hotels - Channel share by year',unit:'%',categories:['Direct','Partner','Other'],series:[{name:'2025',values:[29,32,39]},{name:'2026',values:[43,33,24]}],axisConfig:{xLabel:'Channel',yLabel:'Share of total (%)'},analyticalPurpose:'Compare each channel\'s 2025 and 2026 share side by side; the gap between its two bars is the change in percentage points.'}),
    ],
  },
  {
    code: 'E-CH-016',
    chart: 'waterfall',
    industry: 'mobile connectivity',
    title: 'Pulse Telecom: Which prepaid cohort has a profitable lifetime',
    question: 'What is the ending contribution for Pulse Telecom, and which adverse driver is largest before which prepaid cohort has a profitable lifetime?',
    options: [
      '22 billion VND; Cost (-5 billion VND) is the largest negative bridge.',
      '28 billion VND; Volume (-9 billion VND) is the largest negative bridge.',
      '22 billion VND; Volume (-9 billion VND) is the largest negative bridge.',
      '31 billion VND; Cost (-5 billion VND) is the largest negative bridge.',
    ],
    key: '22 billion VND; Volume (-9 billion VND) is the largest negative bridge.',
    why: '28 +5 -9 +3 -5 = 22. Compare the negative bridge magnitudes, not their plotted positions. Naming Cost (-5) as the largest negative gives the right total but the wrong driver; reading the Start bar (28) or leaving out the Volume step (28 +5 +3 -5 = 31) gives the wrong total. Treating negative drivers as gains would give 50.',
    data: 'Start 28; Price 5; Volume -9; Mix 3; Cost -5; End 22',
    pool: ['tech', 'profitability'],
    exhibits: [
      ex('E-CH-016',1,{kind:'waterfall',title:'Pulse Telecom - Contribution bridge',unit:'billion VND',categories:['Start','Price','Volume','Mix','Cost','End'],series:[{name:'Contribution',values:[28,5,-9,3,-5,22]}]}),
    ],
  },
  {
    code: 'E-CH-017',
    chart: 'scatter',
    industry: 'industrial metals',
    title: 'Quartz Steel: Which plant can absorb a new contract',
    question: 'Using a minimum demand index of 25, which Quartz Steel option has the highest contribution, and what does the exhibit leave unresolved?',
    options: [
      'C: demand 40, contribution 3 VND million',
      'B: demand 28, contribution 9 VND million; test the cost of scaling.',
      'E: demand 17, contribution 11 VND million',
      'A: demand 18, contribution 9 VND million',
    ],
    key: 'B: demand 28, contribution 9 VND million; test the cost of scaling.',
    why: 'Filter demand index ≥25, then compare contribution among eligible options. The scatter does not establish scalable unit economics. C (demand 40, contribution 3) has the highest demand and clears the threshold but earns the least of the eligible options; E (17, 11) has the highest contribution overall and A (18, 9) matches B, but both fall below the demand index of 25. Apply the threshold first, then compare contribution.',
    data: 'A demand 18, contribution 9; B demand 28, contribution 9; C demand 40, contribution 3; D demand 12, contribution 5; E demand 17, contribution 11',
    pool: ['logistics', 'operations'],
    exhibits: [
      ex('E-CH-017',1,{kind:'scatter',title:'Quartz Steel - Demand vs contribution',unit:'VND million',categories:['A','B','C','D','E'],series:[{name:'Contribution',values:[9,9,3,5,11],xValues:[18,28,40,12,17],displayValues:['demand 18, contribution 9','demand 28, contribution 9','demand 40, contribution 3','demand 12, contribution 5','demand 17, contribution 11']}],axisConfig:{xLabel:'Demand index',yLabel:'Contribution (VND million)'}}),
    ],
  },
  {
    code: 'E-CH-018',
    chart: 'heatmap',
    industry: 'skincare retail',
    title: 'Riva Beauty: Which store cluster earns incremental shelf space',
    question: 'Which Riva Beauty region-month cell has the highest score, and why should a single peak not settle which store cluster earns incremental shelf space?',
    options: [
      'North, Month 2: 89 points; check repeatability across months.',
      'North, Month 3: 88 points',
      'Central, Month 1: 87 points',
      'Central, Month 3: 86 points',
    ],
    key: 'North, Month 2: 89 points; check repeatability across months.',
    why: 'Inspect all 12 cells and distinguish the maximum cell from a regional average or sustained trend. The other cells quoted (North Month 3 88, Central Month 1 87, Central Month 3 86) are lower; a row total such as North 305 or a month column such as Month 2 is not a single-cell score, so read each of the 12 cells rather than a row sum or regional average.',
    data: 'North: Month 1 61, Month 2 89, Month 3 88, Month 4 67; South: Month 1 64, Month 2 73, Month 3 68, Month 4 77; Central: Month 1 87, Month 2 49, Month 3 86, Month 4 56',
    pool: ['retail', 'operations'],
    exhibits: [
      ex('E-CH-018',1,{kind:'heatmap',title:'Riva Beauty - Score by region and month',unit:'points',categories:['North','South','Central'],series:[{name:'Month 1',values:[61,64,87]},{name:'Month 2',values:[89,73,49]},{name:'Month 3',values:[88,68,86]},{name:'Month 4',values:[67,77,56]}]}),
    ],
  },
  {
    code: 'E-CH-019',
    chart: 'bullet',
    industry: 'last-mile delivery',
    title: 'Sora Logistics: Whether same-day parcels dilute route margin',
    question: 'Which Sora Logistics site has the largest percentage shortfall to target, and what is the first diagnostic for whether same-day parcels dilute route margin?',
    options: [
      'Site A: 15.3% below target',
      'Site C: 9.2% below target',
      'Site D: 49.3% below target',
      'Site D: 33.0% below target; inspect the driver of its gap.',
    ],
    key: 'Site D: 33.0% below target; inspect the driver of its gap.',
    why: 'For each site calculate (target - actual)/target; different target bases make absolute gaps misleading. Site A is 15/98 = 15.3% and Site C is 9/98 = 9.2% below target; 49.3% divides Site D gap by its actual (34/69) instead of its target, and treating the unit gap of 34 as a percentage is the same kind of slip. Site B is exactly on target.',
    data: 'Site A actual 83, target 98; Site B actual 91, target 91; Site C actual 89, target 98; Site D actual 69, target 103',
    pool: ['logistics', 'operations'],
    exhibits: [
      ex('E-CH-019',1,{kind:'bullet',title:'Sora Logistics - Actual vs target by site',unit:'',categories:['Site A','Site B','Site C','Site D'],series:[{name:'Actual',values:[83,91,89,69]},{name:'Target',values:[98,91,98,103],color:'var(--space-semantic-danger-600)'}]}),
    ],
  },
  {
    code: 'E-CH-020',
    chart: 'slopegraph',
    industry: 'quick-service dining',
    title: 'Tamarind Kitchen: Which menu group drives lunch profit',
    question: 'Which Tamarind Kitchen region gained the most share in percentage points, and what is not proven by that slope?',
    options: [
      'Delta: +2 pp',
      'Coastal: -7 pp',
      'Metro: +9 pp; the chart does not prove absolute volume growth.',
      'Metro: +27 pp',
    ],
    key: 'Metro: +9 pp; the chart does not prove absolute volume growth.',
    why: 'Compare end minus start for each region; share movement and volume movement are different measures. Delta (+2 pp) gained less; Coastal (-7 pp) has the steepest downward slope, which is a loss rather than a gain; +27 pp reads the Metro end share as its change. Reading the Metro gain as +9% would mix percentage points with relative growth.',
    data: 'Metro 18% → 27%; Coastal 26% → 19%; Highland 12% → 5%; Delta 18% → 20%',
    pool: ['retail', 'growth'],
    exhibits: [
      ex('E-CH-020',1,{kind:'slope',title:'Tamarind Kitchen - Share by region, start vs end',unit:'%',categories:['Start','End'],series:[{name:'Metro',values:[18,27]},{name:'Coastal',values:[26,19]},{name:'Highland',values:[12,5]},{name:'Delta',values:[18,20]}],axisConfig:{yLabel:'Share (%)'}}),
    ],
  },
  {
    code: 'E-CH-021',
    chart: 'area',
    industry: 'rental housing',
    title: 'UrbanNest: Whether furnished units earn their renovation cost',
    question: 'What is the peak-to-trough swing in UrbanNest demand, and why is a single-month average insufficient for whether furnished units earn their renovation cost?',
    options: [
      '67 thousand; the mean is the peak-to-trough range.',
      '31 thousand; Jan peaks at 84 and Jun bottoms at 53.',
      '84 thousand; the peak itself is the swing.',
      '31% without dividing by the trough.',
    ],
    key: '31 thousand; Jan peaks at 84 and Jun bottoms at 53.',
    why: 'Peak minus trough = 84 - 53 = 31; variation matters when capacity or allocation is fixed.',
    data: 'Jan 84; Feb 77; Mar 69; Apr 59; May 61; Jun 53',
    pool: ['real-estate', 'growth'],
    exhibits: [
      ex('E-CH-021',1,{kind:'area',title:'UrbanNest - Demand by month',unit:'thousand',categories:['Jan','Feb','Mar','Apr','May','Jun'],series:[{name:'Demand',values:[84,77,69,59,61,53]}],axisConfig:{xLabel:'Month',yLabel:'Demand (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-022',
    chart: 'funnel',
    industry: 'municipal utilities',
    title: 'Vela Water: Where leakage reduction gives the best return',
    question: 'How many Vela Water applications reach completion, and which conversion stage should be checked before where leakage reduction gives the best return?',
    options: [
      '3,878 completed; apply 55%, 83%, then 79% sequentially.',
      '7,779 completed; average the three rates.',
      '8,496 completed; apply the last rate to all reached users.',
      '4,909 completed; starts and completions are interchangeable.',
    ],
    key: '3,878 completed; apply 55%, 83%, then 79% sequentially.',
    why: '10,755 × 55% × 83% × 79% ≈ 3,878 after stage rounding; inspect losses at each stage.',
    data: 'Reached 10,755; Eligible 5,915; Started 4,909; Completed 3,878',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-022',1,{kind:'funnel',title:'Vela Water - Application funnel',unit:'applications',categories:['Reached','Eligible','Started','Completed'],series:[{name:'Applications',values:[10755,5915,4909,3878]}]}),
    ],
  },
  {
    code: 'E-CH-023',
    chart: 'donut',
    industry: 'SME lending',
    title: 'Willow Bank: Which origination channel combines volume and quality',
    question: 'What share do the two largest slices of the Willow Bank segment exhibit represent, and what concentration risk matters for which origination channel combines volume and quality?',
    options: [
      '53% (Segment B 37% + Segment C 16%)',
      '47% (Segment A 32% + Other segments 15%)',
      '31% (Segment C 16% + Other segments 15%)',
      '69% (Segment B 37% + Segment A 32%); test dependence on the leaders.',
    ],
    key: '69% (Segment B 37% + Segment A 32%); test dependence on the leaders.',
    why: 'Rank the slice shares before adding the two largest; the slices total 100%. The two largest slices are Segment B (37%) and Segment A (32%). Segment B + Segment C (53%) and Segment A + Other segments (47%) each pair a leader with a smaller slice; Segment C + Other segments (31%) is the tail, not the leaders.',
    data: 'Segment A 32; Segment B 37; Segment C 16; Other segments 15',
    pool: ['banking', 'strategy'],
    exhibits: [
      ex('E-CH-023',1,{kind:'donut',title:'Willow Bank - Share by segment',unit:'%',categories:['Segment A','Segment B','Segment C','Other segments'],series:[{name:'Share',values:[32,37,16,15]}]}),
    ],
  },
  {
    code: 'E-CH-024',
    chart: 'combo bars and line',
    industry: 'chilled dairy',
    title: 'Xuan Dairy: Which outlet mix stabilises weekly demand',
    question: 'Which quarter has the highest estimated Xuan Dairy sales value, and why can volume alone mislead which outlet mix stabilises weekly demand?',
    options: [
      'Q2: 55 thousand × 164 thousand VND = 9.02 billion VND.',
      'Q3: 50 thousand × 185 thousand VND = 9.25 billion VND.',
      'Q1: 66 thousand × 200 thousand VND = 13.20 billion VND.',
      'Q4: 34 thousand × 157 thousand VND = 5.34 billion VND.',
    ],
    key: 'Q1: 66 thousand × 200 thousand VND = 13.20 billion VND.',
    why: 'Multiply order volume (thousands) by average order value (thousand VND), then divide by 1,000 for VND billion. The other quarters give Q2 9.02, Q3 9.25 and Q4 5.34, all lower. Adding volume and value (66 + 200) would mix unlike units.',
    data: 'Q1 volume 66 thousand, AOV (average order value) 200 thousand VND; Q2 volume 55 thousand, AOV 164 thousand VND; Q3 volume 50 thousand, AOV 185 thousand VND; Q4 volume 34 thousand, AOV 157 thousand VND',
    pool: ['fmcg', 'operations'],
    exhibits: [
      ex('E-CH-024',1,{kind:'combo',title:'Xuan Dairy - Volume and average order value by quarter',unit:'',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Volume',values:[66,55,50,34],unit:'thousand',color:'#1d4ed8'},{name:'Average order value (AOV)',values:[200,164,185,157],unit:'thousand VND',axis:'right',color:'var(--space-brand-primary-700)'}],axisConfig:{xLabel:'Quarter',yLabel:'Volume (thousand)',rightYLabel:'AOV (thousand VND)'}}),
    ],
  },
  {
    code: 'E-CH-025',
    chart: 'line',
    industry: 'seafood exports',
    title: 'Yen Harbor: Whether premium grade growth offsets yield loss',
    question: 'For Yen Harbor, what is the Q1-to-Q4 change in shipments (thousand), and why would an endpoint-only conclusion need a caveat before whether premium grade growth offsets yield loss?',
    options: [
      '-11 thousand; compare Q2 with Q4 instead of Q1.',
      '+5 thousand (+5.4%); the intervening quarters must be checked before extrapolating.',
      '+5 thousand (+5.2%); use Q4 as the denominator.',
      '+29 thousand (+31.5%); stop at Q3.',
    ],
    key: '+5 thousand (+5.4%); the intervening quarters must be checked before extrapolating.',
    why: 'Use Q4 minus Q1 = 97 - 92 = 5; divide by the Q1 base 92 for +5.4%. Q2 and Q3 show the path is not captured by endpoints alone.',
    data: 'Q1 92; Q2 108; Q3 121; Q4 97',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-025',1,{kind:'line',title:'Yen Harbor - Shipments by quarter',unit:'thousand',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Shipments',values:[92,108,121,97]}],axisConfig:{xLabel:'Quarter',yLabel:'Shipments (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-026',
    chart: 'grouped bars',
    industry: 'power tools',
    title: 'Zenith Tools: Which dealer territory has a sustainable lead',
    question: 'Which Zenith Tools business line produces the highest gross profit, and what comparison matters for which dealer territory has a sustainable lead?',
    options: [
      'Business Line B: 59 × 28% = 16.52 billion VND; compare absolute contribution, not margin alone.',
      'Business Line A: 67 × 15% = 10.05 billion VND',
      'Business Line C: 37 × 24% = 8.88 billion VND',
      'Business Line A: 67 × 28% = 18.76 billion VND',
    ],
    key: 'Business Line B: 59 × 28% = 16.52 billion VND; compare absolute contribution, not margin alone.',
    why: 'Multiply revenue by gross margin for each business line: Business Line A 10.05, Business Line B 16.52, Business Line C 8.88. Business Line A (10.05) and Business Line C (8.88) are the gross profits of the other lines and rank lower; 18.76 pairs Business Line A revenue with the Business Line B margin of 28%. Business Line A has the largest sales (67 billion VND) but the lowest margin (15%), so ranking by revenue alone favours the wrong line.',
    data: 'Business Line A revenue 67 billion VND, gross margin 15%; Business Line B revenue 59 billion VND, gross margin 28%; Business Line C revenue 37 billion VND, gross margin 24%',
    pool: ['retail', 'profitability'],
    exhibits: [
      ex('E-CH-026',1,{kind:'grouped-bar',title:'Zenith Tools - Revenue by business line',unit:'billion VND',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Revenue',values:[67,59,37]}],axisConfig:{xLabel:'Business line',yLabel:'Revenue (billion VND)'}}),
      ex('E-CH-026',2,{kind:'grouped-bar',title:'Zenith Tools - Gross margin by business line',unit:'%',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Gross margin',values:[15,28,24],color:'#1d4ed8'}],axisConfig:{xLabel:'Business line',yLabel:'Gross margin (%)'}}),
    ],
  },
  {
    code: 'E-CH-044',
    chart: 'slopegraph',
    industry: 'battery storage',
    title: 'SilverGrid: Whether peak-shaving contracts clear the hurdle',
    question: 'Which SilverGrid region gained the most share in percentage points, and what is not proven by that slope?',
    options: [
      'Metro: +9 pp',
      'Delta: +9 pp',
      'Highland: +11 pp; the chart does not prove absolute volume growth.',
      'Coastal: -3 pp',
    ],
    key: 'Highland: +11 pp; the chart does not prove absolute volume growth.',
    why: 'Compare end minus start for each region; share movement and volume movement are different measures. Metro and Delta each gained 9 pp, less than Highland; Coastal (-3 pp) lost share. Highland also has the highest end share (43%), but the question asks for the largest gain, which is end minus start; reading +11 pp as +11% would mix percentage points with relative growth.',
    data: 'Metro 26% → 35%; Coastal 19% → 16%; Highland 32% → 43%; Delta 18% → 27%',
    pool: ['tech', 'growth'],
    exhibits: [
      ex('E-CH-044',1,{kind:'slope',title:'SilverGrid - Share by region, start vs end',unit:'%',categories:['Start','End'],series:[{name:'Metro',values:[26,35]},{name:'Coastal',values:[19,16]},{name:'Highland',values:[32,43]},{name:'Delta',values:[18,27]}],axisConfig:{yLabel:'Share (%)'}}),
    ],
  },
  {
    code: 'E-CH-045',
    chart: 'area',
    industry: 'industrial chemicals',
    title: 'TerraChem: Which customer mix absorbs a feedstock increase',
    question: 'What is the peak-to-trough swing in TerraChem demand, and why is a single-month average insufficient for which customer mix absorbs a feedstock increase?',
    options: [
      '63 thousand; the mean is the peak-to-trough range.',
      '31 thousand; Jun peaks at 79 and Jan bottoms at 48.',
      '79 thousand; the peak itself is the swing.',
      '31% without dividing by the trough.',
    ],
    key: '31 thousand; Jun peaks at 79 and Jan bottoms at 48.',
    why: 'Peak minus trough = 79 - 48 = 31; variation matters when capacity or allocation is fixed.',
    data: 'Jan 48; Feb 66; Mar 60; Apr 48; May 78; Jun 79',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-045',1,{kind:'area',title:'TerraChem - Demand by month',unit:'thousand',categories:['Jan','Feb','Mar','Apr','May','Jun'],series:[{name:'Demand',values:[48,66,60,48,78,79]}],axisConfig:{xLabel:'Month',yLabel:'Demand (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-046',
    chart: 'funnel',
    industry: 'fitness clubs',
    title: 'Uplift Gym: Whether small-format sites outperform flagship clubs',
    question: 'How many Uplift Gym applications reach completion, and which conversion stage should be checked before whether small-format sites outperform flagship clubs?',
    options: [
      '2,867 completed; apply 66%, 62%, then 64% sequentially.',
      '7,007 completed',
      '4,344 completed',
      '4,480 completed',
    ],
    key: '2,867 completed; apply 66%, 62%, then 64% sequentially.',
    why: '10,948 × 66% × 62% × 64% ≈ 2,867 after stage rounding; inspect losses at each stage. 7,007 averages the three rates (64%) instead of compounding them; 4,480 stops at the Started stage; 4,344 skips the first conversion step (10,948 × 62% × 64%). Each stage rate applies only to the applicants who survived the previous stage.',
    data: 'Reached 10,948; Eligible 7,226; Started 4,480; Completed 2,867',
    pool: ['retail', 'growth'],
    exhibits: [
      ex('E-CH-046',1,{kind:'funnel',title:'Uplift Gym - Application funnel',unit:'applications',categories:['Reached','Eligible','Started','Completed'],series:[{name:'Applications',values:[10948,7226,4480,2867]}]}),
    ],
  },
  {
    code: 'E-CH-047',
    chart: 'donut',
    industry: 'online travel',
    title: 'Vista Travel: Which booking source has the lowest refund leakage',
    question: 'What share do the two largest slices of the Vista Travel segment exhibit represent, and what concentration risk matters for which booking source has the lowest refund leakage?',
    options: [
      '59% (Segment B 36% + Other segments 23%)',
      '51% (Segment A 28% + Other segments 23%)',
      '36% (Segment C 13% + Other segments 23%)',
      '64% (Segment B 36% + Segment A 28%); test dependence on the leaders.',
    ],
    key: '64% (Segment B 36% + Segment A 28%); test dependence on the leaders.',
    why: 'Rank the slice shares before adding the two largest; the slices total 100%. The two largest slices are Segment B (36%) and Segment A (28%). Segment B + Other segments (59%) and Segment A + Other segments (51%) each pair a leader with the third-largest slice; Segment C + Other segments (36%) is the tail, not the leaders.',
    data: 'Segment A 28; Segment B 36; Segment C 13; Other segments 23',
    pool: ['tech', 'strategy'],
    exhibits: [
      ex('E-CH-047',1,{kind:'donut',title:'Vista Travel - Share by segment',unit:'%',categories:['Segment A','Segment B','Segment C','Other segments'],series:[{name:'Share',values:[28,36,13,23]}]}),
    ],
  },
  {
    code: 'E-CH-048',
    chart: 'combo bars and line',
    industry: 'grocery e-commerce',
    title: 'WaveMart: Whether basket growth compensates delivery cost',
    question: 'Which quarter has the highest estimated WaveMart sales value, and why can volume alone mislead whether basket growth compensates delivery cost?',
    options: [
      'Q4: 43 thousand × 173 thousand VND = 7.44 billion VND.',
      'Q2: 45 thousand × 114 thousand VND = 5.13 billion VND.',
      'Q1: 55 thousand × 168 thousand VND = 9.24 billion VND.',
      'Q3: 64 thousand × 140 thousand VND = 8.96 billion VND.',
    ],
    key: 'Q1: 55 thousand × 168 thousand VND = 9.24 billion VND.',
    why: 'Multiply order volume (thousands) by average order value (thousand VND), then divide by 1,000 for VND billion. The other quarters give Q4 7.44, Q2 5.13 and Q3 8.96, all lower. Q3 has the highest volume and Q4 the highest basket value, but neither alone sets sales; adding volume and value (55 + 168) would mix unlike units.',
    data: 'Q1 volume 55 thousand, AOV (average order value) 168 thousand VND; Q2 volume 45 thousand, AOV 114 thousand VND; Q3 volume 64 thousand, AOV 140 thousand VND; Q4 volume 43 thousand, AOV 173 thousand VND',
    pool: ['retail', 'profitability'],
    exhibits: [
      ex('E-CH-048',1,{kind:'combo',title:'WaveMart - Volume and average order value by quarter',unit:'',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Volume',values:[55,45,64,43],unit:'thousand',color:'#1d4ed8'},{name:'Average order value (AOV)',values:[168,114,140,173],unit:'thousand VND',axis:'right',color:'var(--space-brand-primary-700)'}],axisConfig:{xLabel:'Quarter',yLabel:'Volume (thousand)',rightYLabel:'AOV (thousand VND)'}}),
    ],
  },
  {
    code: 'E-CH-049',
    chart: 'line',
    industry: 'medical labs',
    title: 'Xpress Labs: Which test bundle improves specimen utilisation',
    question: 'For Xpress Labs, what is the Q1-to-Q4 change in visits (thousand), and why would an endpoint-only conclusion need a caveat before which test bundle improves specimen utilisation?',
    options: [
      '-8 thousand; compare Q2 with Q4 instead of Q1.',
      '+8 thousand (+8.7%); the intervening quarters must be checked before extrapolating.',
      '+8 thousand (+8.0%); use Q4 as the denominator.',
      '+29 thousand (+31.5%); stop at Q3.',
    ],
    key: '+8 thousand (+8.7%); the intervening quarters must be checked before extrapolating.',
    why: 'Use Q4 minus Q1 = 100 - 92 = 8; divide by the Q1 base 92 for +8.7%. Q2 and Q3 show the path is not captured by endpoints alone.',
    data: 'Q1 92; Q2 108; Q3 121; Q4 100',
    pool: ['healthcare', 'growth'],
    exhibits: [
      ex('E-CH-049',1,{kind:'line',title:'Xpress Labs - Visits by quarter',unit:'thousand',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Visits',values:[92,108,121,100]}],axisConfig:{xLabel:'Quarter',yLabel:'Visits (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-050',
    chart: 'grouped bars',
    industry: 'aquaculture',
    title: 'Yonder Farms: Where feed efficiency drives harvest profit',
    question: 'Using revenue and gross margin, which Yonder Farms business line contributes the most current gross profit (revenue × gross margin)? This ranks today\'s gross profit only; it does not show where a feed-efficiency investment would add the most profit.',
    options: [
      'Business Line A: 54 × 28% = 15.12 billion VND',
      'Business Line B: 40 × 36% = 14.40 billion VND',
      'Business Line C: 31 × 23% = 7.13 billion VND',
      'Business Line C: 31 × 36% = 11.16 billion VND',
    ],
    key: 'Business Line A: 54 × 28% = 15.12 billion VND',
    why: 'Current gross profit = revenue × gross margin for each business line (billion VND): Business Line A 54 × 28% = 15.12, Business Line B 40 × 36% = 14.40, Business Line C 31 × 23% = 7.13. Business Line A contributes the most current gross profit. Business Line B has the highest margin (36%) but lower revenue than Business Line A, so its gross profit of 14.40 ranks second; 11.16 pairs Business Line C revenue with the Business Line B margin of 36%. The highest-revenue line and the highest-margin line are different lines here, so only the product of revenue and margin ranks them correctly. Limit of this evidence: revenue and gross margin show where gross profit comes from today, not where a feed-efficiency investment would generate the most incremental profit. That would also depend on each line\'s feed cost, its current feed efficiency and how much it could improve, none of which the exhibits give. So treat Business Line A as the largest current contributor, not as proof of where feed efficiency should be targeted.',
    data: 'Business Line A revenue 54 billion VND, gross margin 28%; Business Line B revenue 40 billion VND, gross margin 36%; Business Line C revenue 31 billion VND, gross margin 23%',
    pool: ['fmcg', 'profitability'],
    exhibits: [
      ex('E-CH-050',1,{kind:'grouped-bar',title:'Yonder Farms - Revenue by business line',unit:'billion VND',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Revenue',values:[54,40,31]}],axisConfig:{xLabel:'Business line',yLabel:'Revenue (billion VND)'}}),
      ex('E-CH-050',2,{kind:'grouped-bar',title:'Yonder Farms - Gross margin by business line',unit:'%',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Gross margin',values:[28,36,23],color:'#1d4ed8'}],axisConfig:{xLabel:'Business line',yLabel:'Gross margin (%)'}}),
    ],
  },
  {
    code: 'E-CH-051',
    chart: 'grouped bars',
    industry: 'packaged snacks',
    title: 'Zest Snacks: Which flavour launch wins net shelf contribution',
    question: 'Which channel changed most in percentage points for Zest Snacks, and what should be tested before which flavour launch wins net shelf contribution?',
    options: [
      'Other: +22% relative change; conflate pp and relative growth.',
      'Direct: -14 pp; overlook a larger channel movement.',
      'Partner: -8 pp; focus only on a gain.',
      'Other: +22 pp; test segment economics before reallocating.',
    ],
    key: 'Other: +22 pp; test segment economics before reallocating.',
    why: 'Subtract 2025 share from 2026 share for each channel: Direct -14 pp, Partner -8 pp, Other +22 pp. Shares sum to 100% in both years.',
    data: '2025: Direct 28%, Partner 45%, Other 27%; 2026: Direct 14%, Partner 37%, Other 49%',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-051',1,{kind:'grouped-bar',title:'Zest Snacks - Channel share by year',unit:'%',categories:['Direct','Partner','Other'],series:[{name:'2025',values:[28,45,27]},{name:'2026',values:[14,37,49]}],axisConfig:{xLabel:'Channel',yLabel:'Share of total (%)'},analyticalPurpose:'Compare each channel\'s 2025 and 2026 share side by side; the gap between its two bars is the change in percentage points.'}),
    ],
  },
  {
    code: 'E-CH-052',
    chart: 'waterfall',
    industry: 'passenger rail',
    title: 'Amber Rail: Whether commuter passes improve train occupancy',
    question: 'What is the ending contribution for Amber Rail, and which adverse driver is largest before whether commuter passes improve train occupancy?',
    options: [
      '32 billion VND; Cost (-5 billion VND) is the largest negative bridge.',
      '33 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '32 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '38 billion VND; Cost (-5 billion VND) is the largest negative bridge.',
    ],
    key: '32 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
    why: '33 +7 -6 +3 -5 = 32. Compare the negative bridge magnitudes, not their plotted positions. Naming Cost (-5) as the largest negative gives the right total but the wrong driver; reading the Start bar (33) or leaving out the Volume step (33 +7 +3 -5 = 38) gives the wrong total. Treating negative drivers as gains would give 54.',
    data: 'Start 33; Price 7; Volume -6; Mix 3; Cost -5; End 32',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-052',1,{kind:'waterfall',title:'Amber Rail - Contribution bridge',unit:'billion VND',categories:['Start','Price','Volume','Mix','Cost','End'],series:[{name:'Contribution',values:[33,7,-6,3,-5,32]}]}),
    ],
  },
  {
    code: 'E-CH-053',
    chart: 'scatter',
    industry: 'elder care',
    title: 'Banyan Care: Which service tier fits caregiver capacity',
    question: 'Using a minimum demand index of 25, which Banyan Care option has the highest contribution, and what does the exhibit leave unresolved?',
    options: [
      'E: demand 25, contribution 8 VND million',
      'B: demand 30, contribution 9 VND million; test the cost of scaling.',
      'C: demand 21, contribution 13 VND million',
      'D: demand 18, contribution 12 VND million',
    ],
    key: 'B: demand 30, contribution 9 VND million; test the cost of scaling.',
    why: 'Filter demand index ≥25, then compare contribution among eligible options. The scatter does not establish scalable unit economics. E (demand 25, contribution 8) meets the threshold exactly but earns less than B; C (21, 13) and D (18, 12) have the highest contributions overall but fall below the demand index of 25. Apply the threshold first, then compare contribution.',
    data: 'A demand 13, contribution 9; B demand 30, contribution 9; C demand 21, contribution 13; D demand 18, contribution 12; E demand 25, contribution 8',
    pool: ['healthcare', 'operations'],
    exhibits: [
      ex('E-CH-053',1,{kind:'scatter',title:'Banyan Care - Demand vs contribution',unit:'VND million',categories:['A','B','C','D','E'],series:[{name:'Contribution',values:[9,9,13,12,8],xValues:[13,30,21,18,25],displayValues:['demand 13, contribution 9','demand 30, contribution 9','demand 21, contribution 13','demand 18, contribution 12','demand 25, contribution 8']}],axisConfig:{xLabel:'Demand index',yLabel:'Contribution (VND million)'}}),
    ],
  },
  {
    code: 'E-CH-054',
    chart: 'heatmap',
    industry: 'critical minerals',
    title: 'Cobalt Mining: Which pit sequence avoids a cash trough',
    question: 'Which Cobalt Mining region-month cell has the highest score, and why should a single peak not settle which pit sequence avoids a cash trough?',
    options: [
      'North, Month 4: 89 points; check repeatability across months.',
      'South, Month 4: 77 points',
      'North, Month 1: 73 points',
      'Central, Month 2: 70 points',
    ],
    key: 'North, Month 4: 89 points; check repeatability across months.',
    why: 'Inspect all 12 cells and distinguish the maximum cell from a regional average or sustained trend. The other cells quoted (South Month 4 77, North Month 1 73, Central Month 2 70) are lower; a row total such as North 275 or a month column such as Month 4 is not a single-cell score, so read each of the 12 cells rather than a row sum or regional average.',
    data: 'North: Month 1 73, Month 2 66, Month 3 47, Month 4 89; South: Month 1 61, Month 2 57, Month 3 48, Month 4 77; Central: Month 1 60, Month 2 70, Month 3 51, Month 4 61',
    pool: ['logistics', 'operations'],
    exhibits: [
      ex('E-CH-054',1,{kind:'heatmap',title:'Cobalt Mining - Score by region and month',unit:'points',categories:['North','South','Central'],series:[{name:'Month 1',values:[73,61,60]},{name:'Month 2',values:[66,57,70]},{name:'Month 3',values:[47,48,51]},{name:'Month 4',values:[89,77,61]}]}),
    ],
  },
  {
    code: 'E-CH-055',
    chart: 'bullet',
    industry: 'apparel retail',
    title: 'Drift Fashion: Whether online promotion cannibalises stores',
    question: 'Which Drift Fashion site has the largest percentage shortfall to target, and what is the first diagnostic for whether online promotion cannibalises stores?',
    options: [
      'Site C: 17.9% below target',
      'Site D: 16.5% below target',
      'Site B: 29.6% below target',
      'Site B: 22.9% below target; inspect the driver of its gap.',
    ],
    key: 'Site B: 22.9% below target; inspect the driver of its gap.',
    why: 'For each site calculate (target - actual)/target; different target bases make absolute gaps misleading. Site C is 21/117 = 17.9% and Site D is 19/115 = 16.5% below target; 29.6% divides Site B gap by its actual (24/81) instead of its target, and treating the unit gap of 24 as a percentage is the same kind of slip. Site A is only 2.9% below target.',
    data: 'Site A actual 99, target 102; Site B actual 81, target 105; Site C actual 96, target 117; Site D actual 96, target 115',
    pool: ['retail', 'operations'],
    exhibits: [
      ex('E-CH-055',1,{kind:'bullet',title:'Drift Fashion - Actual vs target by site',unit:'',categories:['Site A','Site B','Site C','Site D'],series:[{name:'Actual',values:[99,81,96,96]},{name:'Target',values:[102,105,117,115],color:'var(--space-semantic-danger-600)'}]}),
    ],
  },
  {
    code: 'E-CH-056',
    chart: 'slopegraph',
    industry: 'paper packaging',
    title: 'Elm Packaging: Which machine changeover reduces waste',
    question: 'Which Elm Packaging region gained the most share in percentage points, and what is not proven by that slope?',
    options: [
      'Metro: +7 pp',
      'Coastal: -5 pp',
      'Highland: +10 pp; the chart does not prove absolute volume growth.',
      'Highland: +26 pp',
    ],
    key: 'Highland: +10 pp; the chart does not prove absolute volume growth.',
    why: 'Compare end minus start for each region; share movement and volume movement are different measures. Metro (+7 pp) gained less; Coastal (-5 pp) lost share; +26 pp reads the Highland end share as its change. Reading the Highland gain as +10% would mix percentage points with relative growth.',
    data: 'Metro 15% → 22%; Coastal 22% → 17%; Highland 16% → 26%; Delta 17% → 27%',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-056',1,{kind:'slope',title:'Elm Packaging - Share by region, start vs end',unit:'%',categories:['Start','End'],series:[{name:'Metro',values:[15,22]},{name:'Coastal',values:[22,17]},{name:'Highland',values:[16,26]},{name:'Delta',values:[17,27]}],axisConfig:{yLabel:'Share (%)'}}),
    ],
  },
  {
    code: 'E-CH-057',
    chart: 'area',
    industry: 'cybersecurity',
    title: 'Falcon Security: Which customer segment supports renewals',
    question: 'What is the peak-to-trough swing in Falcon Security demand, and why is a single-month average insufficient for which customer segment supports renewals?',
    options: [
      '68 thousand; the mean is the peak-to-trough range.',
      '31 thousand; Feb peaks at 79 and Jan bottoms at 48.',
      '79 thousand; the peak itself is the swing.',
      '31% without dividing by the trough.',
    ],
    key: '31 thousand; Feb peaks at 79 and Jan bottoms at 48.',
    why: 'Peak minus trough = 79 - 48 = 31; variation matters when capacity or allocation is fixed.',
    data: 'Jan 48; Feb 79; Mar 71; Apr 79; May 57; Jun 77',
    pool: ['tech', 'growth'],
    exhibits: [
      ex('E-CH-057',1,{kind:'area',title:'Falcon Security - Demand by month',unit:'thousand',categories:['Jan','Feb','Mar','Apr','May','Jun'],series:[{name:'Demand',values:[48,79,71,79,57,77]}],axisConfig:{xLabel:'Month',yLabel:'Demand (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-058',
    chart: 'funnel',
    industry: 'fleet leasing',
    title: 'Glide Fleet: Whether electric vans beat diesel on total cost',
    question: 'How many Glide Fleet applications reach completion, and which conversion stage should be checked before whether electric vans beat diesel on total cost?',
    options: [
      '4,554 completed; apply 50%, 81%, then 76% sequentially.',
      '10,209 completed; average the three rates.',
      '11,244 completed; apply the last rate to all reached users.',
      '5,992 completed; starts and completions are interchangeable.',
    ],
    key: '4,554 completed; apply 50%, 81%, then 76% sequentially.',
    why: '14,795 × 50% × 81% × 76% ≈ 4,554 after stage rounding; inspect losses at each stage.',
    data: 'Reached 14,795; Eligible 7,398; Started 5,992; Completed 4,554',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-058',1,{kind:'funnel',title:'Glide Fleet - Application funnel',unit:'applications',categories:['Reached','Eligible','Started','Completed'],series:[{name:'Applications',values:[14795,7398,5992,4554]}]}),
    ],
  },
  {
    code: 'E-CH-059',
    chart: 'donut',
    industry: 'artisan bakery',
    title: 'Hearth Bakery: Which neighbourhood format covers rent',
    question: 'What share do the two largest slices of the Hearth Bakery segment exhibit represent, and what concentration risk matters for which neighbourhood format covers rent?',
    options: [
      '50% (Segment A 31% + Segment B 19%)',
      '51% (Segment A 31% + Segment C 20%)',
      '39% (Segment B 19% + Segment C 20%)',
      '61% (Segment A 31% + Other segments 30%); test dependence on the leaders.',
    ],
    key: '61% (Segment A 31% + Other segments 30%); test dependence on the leaders.',
    why: 'Rank the slice shares before adding the two largest; the slices total 100%. The two largest slices are Segment A (31%) and Other segments (30%). Segment A + Segment B (50%) adds the first two slices in the order printed and Segment A + Segment C (51%) skips the second-largest slice; Segment B + Segment C (39%) is the tail, not the leaders.',
    data: 'Segment A 31; Segment B 19; Segment C 20; Other segments 30',
    pool: ['fmcg', 'strategy'],
    exhibits: [
      ex('E-CH-059',1,{kind:'donut',title:'Hearth Bakery - Share by segment',unit:'%',categories:['Segment A','Segment B','Segment C','Other segments'],series:[{name:'Share',values:[31,19,20,30]}]}),
    ],
  },
  {
    code: 'E-CH-060',
    chart: 'combo bars and line',
    industry: 'warehouse automation',
    title: 'Ion Robotics: Where deployment delays erode project margin',
    question: 'Which quarter has the highest estimated Ion Robotics sales value, and why can volume alone mislead where deployment delays erode project margin?',
    options: [
      'Q2: 39 thousand × 140 thousand VND = 5.46 billion VND.',
      'Q4: 37 thousand × 135 thousand VND = 5.00 billion VND.',
      'Q1: 51 thousand × 138 thousand VND = 7.04 billion VND.',
      'Q1: 51 thousand × 138 thousand VND = 70.4 billion VND.',
    ],
    key: 'Q1: 51 thousand × 138 thousand VND = 7.04 billion VND.',
    why: 'Multiply order volume (thousands) by average order value (thousand VND), then divide by 1,000 for VND billion. Q2 (5.46) and Q4 (5.00) are lower; 70.4 shifts the decimal point when converting thousands to billions.',
    data: 'Q1 volume 51 thousand, AOV (average order value) 138 thousand VND; Q2 volume 39 thousand, AOV 140 thousand VND; Q3 volume 34 thousand, AOV 207 thousand VND; Q4 volume 37 thousand, AOV 135 thousand VND',
    pool: ['logistics', 'operations'],
    exhibits: [
      ex('E-CH-060',1,{kind:'combo',title:'Ion Robotics - Volume and average order value by quarter',unit:'',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Volume',values:[51,39,34,37],unit:'thousand',color:'#1d4ed8'},{name:'Average order value (AOV)',values:[138,140,207,135],unit:'thousand VND',axis:'right',color:'var(--space-brand-primary-700)'}],axisConfig:{xLabel:'Quarter',yLabel:'Volume (thousand)',rightYLabel:'AOV (thousand VND)'}}),
    ],
  },
  {
    code: 'E-CH-061',
    chart: 'line',
    industry: 'ready-to-drink tea',
    title: 'Jasmine Tea: Which route-to-market maximises net revenue',
    question: 'For Jasmine Tea, what is the Q1-to-Q4 change in units (thousand), and why would an endpoint-only conclusion need a caveat before which route-to-market maximises net revenue?',
    options: [
      '-10 thousand; compare Q2 with Q4 instead of Q1.',
      '+6 thousand (+6.5%); the intervening quarters must be checked before extrapolating.',
      '+6 thousand (+6.1%); use Q4 as the denominator.',
      '+29 thousand (+31.5%); stop at Q3.',
    ],
    key: '+6 thousand (+6.5%); the intervening quarters must be checked before extrapolating.',
    why: 'Use Q4 minus Q1 = 98 - 92 = 6; divide by the Q1 base 92 for +6.5%. Q2 and Q3 show the path is not captured by endpoints alone.',
    data: 'Q1 92; Q2 108; Q3 121; Q4 98',
    pool: ['fmcg', 'growth'],
    exhibits: [
      ex('E-CH-061',1,{kind:'line',title:'Jasmine Tea - Units by quarter',unit:'thousand',categories:['Q1','Q2','Q3','Q4'],series:[{name:'Units',values:[92,108,121,98]}],axisConfig:{xLabel:'Quarter',yLabel:'Units (thousand)'}}),
    ],
  },
  {
    code: 'E-CH-062',
    chart: 'grouped bars',
    industry: "children's apparel",
    title: 'Koala Kids: Whether school-season inventory is balanced',
    question: 'Which Koala Kids business line produces the highest gross profit, and what comparison matters for whether school-season inventory is balanced?',
    options: [
      'Business Line B: 75 × 31% = 23.25 billion VND; compare absolute contribution, not margin alone.',
      'Business Line A: 55 × 29% = 15.95 billion VND',
      'Business Line C: 29 × 26% = 7.54 billion VND',
      'Business Line A: 55 × 31% = 17.05 billion VND',
    ],
    key: 'Business Line B: 75 × 31% = 23.25 billion VND; compare absolute contribution, not margin alone.',
    why: 'Multiply revenue by gross margin for each business line: Business Line A 15.95, Business Line B 23.25, Business Line C 7.54. Business Line A (15.95) and Business Line C (7.54) are the gross profits of the other lines and rank lower; 17.05 pairs Business Line A revenue with the Business Line B margin of 31%. Business Line B leads on both revenue and margin here, but the comparison still has to be made on absolute contribution, not on one measure alone.',
    data: 'Business Line A revenue 55 billion VND, gross margin 29%; Business Line B revenue 75 billion VND, gross margin 31%; Business Line C revenue 29 billion VND, gross margin 26%',
    pool: ['retail', 'profitability'],
    exhibits: [
      ex('E-CH-062',1,{kind:'grouped-bar',title:'Koala Kids - Revenue by business line',unit:'billion VND',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Revenue',values:[55,75,29]}],axisConfig:{xLabel:'Business line',yLabel:'Revenue (billion VND)'}}),
      ex('E-CH-062',2,{kind:'grouped-bar',title:'Koala Kids - Gross margin by business line',unit:'%',categories:['Business Line A','Business Line B','Business Line C'],series:[{name:'Gross margin',values:[29,31,26],color:'#1d4ed8'}],axisConfig:{xLabel:'Business line',yLabel:'Gross margin (%)'}}),
    ],
  },
  {
    code: 'E-CH-063',
    chart: 'grouped bars',
    industry: 'island transport',
    title: 'Lagoon Ferries: Which sailing schedule matches demand',
    question: 'Which channel changed most in percentage points for Lagoon Ferries, and what should be tested before which sailing schedule matches demand?',
    options: [
      'Direct: -2 pp',
      'Other: -22 pp',
      'Partner: +46 pp',
      'Partner: +24 pp; test segment economics before reallocating.',
    ],
    key: 'Partner: +24 pp; test segment economics before reallocating.',
    why: 'Subtract 2025 share from 2026 share for each channel: Direct -2 pp, Partner +24 pp, Other -22 pp. Shares sum to 100% in both years. Direct (-2 pp) and Other (-22 pp) moved less than Partner; +46 pp reads the 2026 Partner share as its change instead of subtracting the 2025 share.',
    data: '2025: Direct 29%, Partner 22%, Other 49%; 2026: Direct 27%, Partner 46%, Other 27%',
    pool: ['logistics', 'growth'],
    exhibits: [
      ex('E-CH-063',1,{kind:'grouped-bar',title:'Lagoon Ferries - Channel share by year',unit:'%',categories:['Direct','Partner','Other'],series:[{name:'2025',values:[29,22,49]},{name:'2026',values:[27,46,27]}],axisConfig:{xLabel:'Channel',yLabel:'Share of total (%)'},analyticalPurpose:'Compare each channel\'s 2025 and 2026 share side by side; the gap between its two bars is the change in percentage points.'}),
    ],
  },
  {
    code: 'E-CH-064',
    chart: 'waterfall',
    industry: 'solar retail',
    title: 'Mosaic Energy: Whether financing improves installation conversion',
    question: 'What is the ending contribution for Mosaic Energy, and which adverse driver is largest before whether financing improves installation conversion?',
    options: [
      '41 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '43 billion VND; Volume (-6 billion VND) is the largest negative bridge.',
      '41 billion VND; Cost (-8 billion VND) is the largest negative bridge.',
      '49 billion VND; Cost (-8 billion VND) is the largest negative bridge.',
    ],
    key: '41 billion VND; Cost (-8 billion VND) is the largest negative bridge.',
    why: '41 +8 -6 +6 -8 = 41. Compare the negative bridge magnitudes, not their plotted positions. Naming Volume (-6) as the largest negative gives the right total but the wrong driver; leaving out the Mix and Cost steps gives 43 (41 +8 -6) and forgetting the final Cost step gives 49. Treating negative drivers as gains would give 69.',
    data: 'Start 41; Price 8; Volume -6; Mix 6; Cost -8; End 41',
    pool: ['retail', 'growth'],
    exhibits: [
      ex('E-CH-064',1,{kind:'waterfall',title:'Mosaic Energy - Contribution bridge',unit:'billion VND',categories:['Start','Price','Volume','Mix','Cost','End'],series:[{name:'Contribution',values:[41,8,-6,6,-8,41]}]}),
    ],
  },
  {
    code: 'E-CH-065',
    chart: 'scatter',
    industry: 'cloud infrastructure',
    title: 'Nimbus Data: Which workload tier earns capacity allocation',
    question: 'Using a minimum demand index of 25, which Nimbus Data option has the highest contribution, and what does the exhibit leave unresolved?',
    options: [
      'B: demand 13, contribution 13 VND million',
      'A: demand 34, contribution 13 VND million; test the cost of scaling.',
      'D: demand 28, contribution 5 VND million',
      'E: demand 22, contribution 9 VND million',
    ],
    key: 'A: demand 34, contribution 13 VND million; test the cost of scaling.',
    why: 'Filter demand index ≥25, then compare contribution among eligible options. The scatter does not establish scalable unit economics. D (demand 28, contribution 5) clears the threshold but earns less than A; B (13, 13) ties A on contribution and E (22, 9) is next, but both fall below the demand index of 25. Apply the threshold first, then compare contribution.',
    data: 'A demand 34, contribution 13; B demand 13, contribution 13; C demand 27, contribution 3; D demand 28, contribution 5; E demand 22, contribution 9',
    pool: ['tech', 'operations'],
    exhibits: [
      ex('E-CH-065',1,{kind:'scatter',title:'Nimbus Data - Demand vs contribution',unit:'VND million',categories:['A','B','C','D','E'],series:[{name:'Contribution',values:[13,13,3,5,9],xValues:[34,13,27,28,22],displayValues:['demand 34, contribution 13','demand 13, contribution 13','demand 27, contribution 3','demand 28, contribution 5','demand 22, contribution 9']}],axisConfig:{xLabel:'Demand index',yLabel:'Contribution (VND million)'}}),
    ],
  },
  {
    code: 'E-CH-066',
    chart: 'heatmap',
    industry: 'dental care',
    title: 'Oasis Clinics: Where no-shows waste chair time',
    question: 'Which Oasis Clinics region-month cell has the highest score, and why should a single peak not settle where no-shows waste chair time?',
    options: [
      'Central, Month 1: 87 points; check repeatability across months.',
      'North, Month 4: 86 points',
      'North, Month 3: 77 points',
      'South, Month 1: 74 points',
    ],
    key: 'Central, Month 1: 87 points; check repeatability across months.',
    why: 'Inspect all 12 cells and distinguish the maximum cell from a regional average or sustained trend. The other cells quoted (North Month 4 86, North Month 3 77, South Month 1 74) are lower; a row total such as Central 245 or a month column such as Month 1 is not a single-cell score, so read each of the 12 cells rather than a row sum or regional average.',
    data: 'North: Month 1 70, Month 2 53, Month 3 77, Month 4 86; South: Month 1 74, Month 2 70, Month 3 46, Month 4 48; Central: Month 1 87, Month 2 50, Month 3 50, Month 4 58',
    pool: ['healthcare', 'operations'],
    exhibits: [
      ex('E-CH-066',1,{kind:'heatmap',title:'Oasis Clinics - Score by region and month',unit:'points',categories:['North','South','Central'],series:[{name:'Month 1',values:[70,74,87]},{name:'Month 2',values:[53,70,50]},{name:'Month 3',values:[77,46,50]},{name:'Month 4',values:[86,48,58]}]}),
    ],
  },
  {
    code: 'E-CH-067',
    chart: 'bullet',
    industry: 'plant-based food',
    title: 'Prairie Foods: Whether trial purchases become repeat demand',
    question: 'Which Prairie Foods site has the largest percentage shortfall to target, and what is the first diagnostic for whether trial purchases become repeat demand?',
    options: [
      'Site B: 18.2% below target',
      'Site A: 17.8% below target',
      'Site C: 26.4% below target',
      'Site C: 20.9% below target; inspect the driver of its gap.',
    ],
    key: 'Site C: 20.9% below target; inspect the driver of its gap.',
    why: 'For each site calculate (target - actual)/target; different target bases make absolute gaps misleading. Site B is 20/110 = 18.2% and Site A is 21/118 = 17.8% below target; the lowest actual (Site B) is not automatically the furthest below target. 26.4% divides Site C gap by its actual (24/91) instead of its target. Site D is above target.',
    data: 'Site A actual 97, target 118; Site B actual 90, target 110; Site C actual 91, target 115; Site D actual 104, target 101',
    pool: ['fmcg', 'operations'],
    exhibits: [
      ex('E-CH-067',1,{kind:'bullet',title:'Prairie Foods - Actual vs target by site',unit:'',categories:['Site A','Site B','Site C','Site D'],series:[{name:'Actual',values:[97,90,91,104]},{name:'Target',values:[118,110,115,101],color:'var(--space-semantic-danger-600)'}]}),
    ],
  },
  {
    code: 'E-CH-068',
    chart: 'slopegraph',
    industry: 'fiber broadband',
    title: 'Quill Telecom: Which installation region reduces payback',
    question: 'Which Quill Telecom region gained the most share in percentage points, and what is not proven by that slope?',
    options: [
      'Delta: +6 pp',
      'Metro: -9 pp',
      'Coastal: +10 pp; the chart does not prove absolute volume growth.',
      'Highland: -4 pp',
    ],
    key: 'Coastal: +10 pp; the chart does not prove absolute volume growth.',
    why: 'Compare end minus start for each region; share movement and volume movement are different measures. Delta (+6 pp) gained less; Metro (-9 pp) has the steepest downward slope and Highland (-4 pp) also lost share, so neither is a gain. Reading the Coastal gain as +10% would mix percentage points with relative growth.',
    data: 'Metro 17% → 8%; Coastal 12% → 22%; Highland 26% → 22%; Delta 13% → 19%',
    pool: ['tech', 'growth'],
    exhibits: [
      ex('E-CH-068',1,{kind:'slope',title:'Quill Telecom - Share by region, start vs end',unit:'%',categories:['Start','End'],series:[{name:'Metro',values:[17,8]},{name:'Coastal',values:[12,22]},{name:'Highland',values:[26,22]},{name:'Delta',values:[13,19]}],axisConfig:{yLabel:'Share (%)'}}),
    ],
  },
];

const capitalise = (value: string): string => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value);

const CHART_LABELS: Record<string, string> = {
  line: 'Line chart',
  'grouped bars': 'Grouped bars',
  '100% stacked bars': '100% stacked bars',
  waterfall: 'Waterfall',
  scatter: 'Scatter plot',
  heatmap: 'Heatmap',
  bullet: 'Bullet chart',
  slopegraph: 'Slopegraph',
  area: 'Area chart',
  funnel: 'Funnel',
  donut: 'Donut',
  'combo bars and line': 'Combo bars and line',
};

const CHARTS_EASY_DISPLAY_TITLES: Record<string, string> = {
  'E-CH-001': 'Outpatient Care Quarterly Visits Trend',
  'E-CH-002': 'Recycled Packaging Gross Profit By Line',
  'E-CH-003': 'Inland Freight Channel Share Shift',
  'E-CH-004': 'Frozen Meals Contribution Bridge',
  'E-CH-005': 'Rooftop Energy Demand And Contribution',
  'E-CH-006': 'Specialty Beverages Region-Month Score Heatmap',
  'E-CH-007': 'Telehealth Site Target Shortfall',
  'E-CH-008': 'Textiles Regional Share Slope',
  'E-CH-009': 'Electric Buses Monthly Demand Swing',
  'E-CH-010': 'Digital Payments Application Funnel',
  'E-CH-011': 'Online Education Segment Concentration',
  'E-CH-012': 'Container Terminals Volume And Order Value',
  'E-CH-013': 'Fresh Produce Quarterly Units Trend',
  'E-CH-014': 'Generic Medicines Gross Profit By Line',
  'E-CH-015': 'Hospitality Channel Share Shift',
  'E-CH-016': 'Mobile Connectivity Contribution Bridge',
  'E-CH-017': 'Industrial Metals Demand And Contribution',
  'E-CH-018': 'Skincare Retail Region-Month Score Heatmap',
  'E-CH-019': 'Last-Mile Delivery Site Target Shortfall',
  'E-CH-020': 'Quick-Service Dining Regional Share Slope',
  'E-CH-021': 'Rental Housing Monthly Demand Swing',
  'E-CH-022': 'Municipal Utilities Application Funnel',
  'E-CH-023': 'SME Lending Segment Concentration',
  'E-CH-024': 'Chilled Dairy Volume And Order Value',
  'E-CH-025': 'Seafood Exports Quarterly Shipments Trend',
  'E-CH-026': 'Power Tools Gross Profit By Line',
  'E-CH-044': 'Battery Storage Regional Share Slope',
  'E-CH-045': 'Industrial Chemicals Monthly Demand Swing',
  'E-CH-046': 'Fitness Clubs Application Funnel',
  'E-CH-047': 'Online Travel Segment Concentration',
  'E-CH-048': 'Grocery E-Commerce Volume And Order Value',
  'E-CH-049': 'Medical Labs Quarterly Visits Trend',
  'E-CH-050': 'Aquaculture Gross Profit By Line',
  'E-CH-051': 'Packaged Snacks Channel Share Shift',
  'E-CH-052': 'Passenger Rail Contribution Bridge',
  'E-CH-053': 'Elder Care Demand And Contribution',
  'E-CH-054': 'Critical Minerals Region-Month Score Heatmap',
  'E-CH-055': 'Apparel Retail Site Target Shortfall',
  'E-CH-056': 'Paper Packaging Regional Share Slope',
  'E-CH-057': 'Cybersecurity Monthly Demand Swing',
  'E-CH-058': 'Fleet Leasing Application Funnel',
  'E-CH-059': 'Artisan Bakery Segment Concentration',
  'E-CH-060': 'Warehouse Automation Volume And Order Value',
  'E-CH-061': 'Ready-To-Drink Tea Quarterly Units Trend',
  'E-CH-062': "Children's Apparel Gross Profit By Line",
  'E-CH-063': 'Island Transport Channel Share Shift',
  'E-CH-064': 'Solar Retail Contribution Bridge',
  'E-CH-065': 'Cloud Infrastructure Demand And Contribution',
  'E-CH-066': 'Dental Care Region-Month Score Heatmap',
  'E-CH-067': 'Plant-Based Food Site Target Shortfall',
  'E-CH-068': 'Fiber Broadband Regional Share Slope',
};

/** The learner-facing name. `record.code` is the internal source id and is never displayed. */
export function chartsEasyDisplayTitle(record: ChartsEasyRecord): string {
  return CHARTS_EASY_DISPLAY_TITLES[record.code] || capitalise(record.industry);
}

/**
 * Filter label for the Drill Type dropdown. Kept identical to what the generic
 * title/question keyword inference produced for these cases before they were
 * renamed, so renaming the display title never moves a case between filters.
 */
function chartsEasyDrillType(record: ChartsEasyRecord): string {
  const text = `${record.title} ${record.question}`.toLowerCase();
  if (text.includes('trend')) return 'Trend Analysis';
  if (text.includes('mix')) return 'Mix-Shift Analysis';
  if (text.includes('profit')) return 'Profitability Analysis';
  return CHART_LABELS[record.chart] || capitalise(record.chart);
}

/**
 * Says what the generic labels in a record's exhibits stand for, and no more than the
 * question itself supports. Business Line / Segment A-C replace the earlier Core / Growth /
 * Pilot / Adjacency names, which implied product types and maturity stages the source never gave.
 */
function chartsEasyLabelDefinition(record: ChartsEasyRecord, company: string, audience: 'drill' | 'pool' = 'drill'): string {
  const first = (record.exhibits[0]?.categories || [])[0];
  const business = `${company}'s ${record.industry} business`;
  if (first === 'Business Line A') {
    return `Business Lines A, B and C are three distinct ${record.industry} operating lines of ${company}; the exhibits give each line's revenue and gross margin and do not describe the lines further.`;
  }
  if (first === 'Segment A') {
    return `Segments A, B and C are three distinct ${record.industry} business segments of ${company} and "Other segments" is every remaining segment combined; the exhibit gives each slice as a percentage share of the total and does not describe the segments further.`;
  }
  if (first === 'Direct') {
    return `Direct, Partner and Other are three channels of ${business} and "Other" is every remaining channel combined; the exhibit gives each channel's percentage share of the total in 2025 and 2026.`;
  }
  switch (record.chart) {
    case 'heatmap':
      return `North, South and Central are three regions of ${business} and Month 1 to Month 4 are four months of the period shown; each cell is the score for one region in one month.`;
    case 'slopegraph':
      return `Metro, Coastal, Highland and Delta are four distinct regions of ${business}; the exhibit gives each region's percentage share at the start and at the end.`;
    case 'bullet':
      return `Sites A to D are four distinct ${company} sites; the exhibit compares each site's actual result with that site's own target.`;
    case 'scatter':
      return `Options A to E are five alternative ${record.industry} options for ${company}; the exhibit plots each option's demand index and contribution (${audience === 'pool' ? 'the letters label the points in the exhibit' : 'the letters label the points in the exhibit and are separate from the answer letters'}).`;
    case 'waterfall':
      return `Price, Volume, Mix and Cost are the four drivers that move contribution from the Start value to the End value; each bar is that driver's change in billion VND.`;
    case 'funnel':
      return `Reached, Eligible, Started and Completed are four successive stages of the application funnel; each bar counts the applications that reached that stage.`;
    default:
      return '';
  }
}

/**
 * The shared brief. Case Drill (`drill`) may talk about answer letters because it is a multiple-choice item;
 * Case Pool (`pool`) is open-ended and must not mention answer options at all.
 */
export function chartsEasyContext(record: ChartsEasyRecord, audience: 'drill' | 'pool' = 'drill'): string {
  const [company, heading] = record.title.split(': ');
  const definition = chartsEasyLabelDefinition(record, company, audience);
  return `${company} operates in ${record.industry}. Management is deciding ${heading.charAt(0).toLowerCase()}${heading.slice(1)}. The exhibit is an internal planning snapshot; validate assumptions before committing resources.${definition ? ` ${definition}` : ''}`;
}

export const CHARTS_EASY_QUESTIONS: LibraryQuestion[] = CHARTS_EASY_RECORDS.map((record) => ({
  id: record.code,
  skill: 'charts' as const,
  difficulty: 'easy' as const,
  title: chartsEasyDisplayTitle(record),
  question: record.question,
  options: [...record.options],
  correctAnswer: record.key,
  explanation: record.why,
  answerMode: 'choice' as const,
  businessContext: chartsEasyContext(record),
  exhibits: record.exhibits,
  industry: capitalise(record.industry),
  businessProblem: capitalise(record.title.split(': ')[1] || ''),
  drillType: chartsEasyDrillType(record),
  drillTypeLocked: true,
  sourceCaseId: record.code,
}));

const CHARTS_EASY_POOL_INSTRUCTION = 'Show your calculation from the exhibits, state your answer with its unit, and explain your reasoning in your own words.';

/** Open-ended wording for a case whose drill question leans on the answer or on a claim the exhibits cannot support. */
const CHARTS_EASY_POOL_TASK_OVERRIDES: Record<string, string> = {
  'E-CH-050': 'Using the revenue and gross margin exhibits, which Yonder Farms business line contributes the most current gross profit (revenue × gross margin)? Calculate the gross profit of each business line, then explain why this ranking of today\'s gross profit does not by itself show where a feed-efficiency investment would generate the most incremental profit, and what extra information management would need before prioritizing feed-efficiency improvements.',
};

/**
 * The Case Pool task for a Charts Easy record. The four Case Drill options, the keyed option and the
 * explanations of the wrong ones stay in the record's own `options`, `key` and `why`; none of them is read here.
 */
export function chartsEasyPoolTask(record: ChartsEasyRecord): string {
  return CHARTS_EASY_POOL_TASK_OVERRIDES[record.code] || casePoolTaskFromDrill(record.question, CHARTS_EASY_POOL_INSTRUCTION);
}

export const CHARTS_EASY_CASE_POOL_CASES: FullCase[] = CHARTS_EASY_RECORDS.map((record) => {
  const task = chartsEasyPoolTask(record);
  const worked = chartsEasyPoolAnswer(record);
  return {
    id: `case-${record.code.toLowerCase()}`,
    title: chartsEasyDisplayTitle(record),
    industry: record.pool[0],
    type: record.pool[1],
    difficulty: 'easy' as const,
    situation: `${chartsEasyContext(record, 'pool')}\n\nExhibit data as printed: ${record.data}`,
    key_question: task,
    data_exhibits: [],
    journey_exhibits: record.exhibits,
    framework_hints: [],
    approach_tips: chartApproachTips(record.chart, record.exhibits[0]),
    objective: task,
    constraints: ['Use only the figures in the exhibit.', 'State your answer with its unit and show the calculation behind it.'],
    estimated_minutes: 5,
    skill_focus: ['charts' as const],
    related_drill_ids: [record.code],
    source_status: 'original-complete' as const,
    data_status: 'shared-validated' as const,
    review_status: 'active' as const,
    model_answer: {
      situation_analysis: worked.situation_analysis,
      framework_applied: worked.framework_applied,
      key_calculations: worked.key_calculations,
      key_findings: worked.key_findings,
      recommendation: worked.recommendation,
    },
    tags: [record.chart, record.industry, 'Charts Easy bank'],
  };
});

const CHARTS_EASY_EXPECTED_CODES: string[] = [
  ...Array.from({ length: 26 }, (_, index) => index + 1),
  ...Array.from({ length: 25 }, (_, index) => index + 44),
].map((number) => `E-CH-${String(number).padStart(3, '0')}`);

export function validateChartsEasyBank(): string[] {
  const errors: string[] = [];
  if (CHARTS_EASY_RECORDS.length !== CHARTS_EASY_EXPECTED_CODES.length) errors.push(`Charts Easy import must contain ${CHARTS_EASY_EXPECTED_CODES.length} cases; found ${CHARTS_EASY_RECORDS.length}.`);
  const displayTitles = CHARTS_EASY_RECORDS.map(chartsEasyDisplayTitle);
  if (new Set(displayTitles).size !== displayTitles.length) errors.push('Charts Easy display titles must be unique.');
  CHARTS_EASY_RECORDS.forEach((record, index) => {
    const displayTitle = chartsEasyDisplayTitle(record);
    if (!CHARTS_EASY_DISPLAY_TITLES[record.code]) errors.push(`${record.code} has no display title.`);
    if (/E-CH|\d/i.test(displayTitle)) errors.push(`${record.code} display title must not contain a source code or number.`);
    const expected = CHARTS_EASY_EXPECTED_CODES[index];
    if (record.code !== expected) errors.push(`${record.code} is out of order; expected ${expected}.`);
    if (new Set(record.options).size !== 4) errors.push(`${record.code} must have four distinct options.`);
    if (record.options.filter((option) => option === record.key).length !== 1) errors.push(`${record.code} key must match exactly one option.`);
    if (!record.exhibits.length) errors.push(`${record.code} has no exhibit.`);
  });
  findUndefinedVagueLabels(CHARTS_EASY_RECORDS.map((record) => ({
    id: record.code,
    text: `${chartsEasyContext(record)} ${record.question}`,
    exhibits: record.exhibits,
  }))).forEach((problem) => errors.push(problem));
  CHARTS_EASY_CASE_POOL_CASES.forEach((item) => poolCaseMcqProblems(item).forEach((problem) => errors.push(problem)));
  blockingUnitShorthand(CHARTS_EASY_RECORDS.map((record) => ({ id: record.code, record }))).forEach((problem) => errors.push(problem));
  return errors;
}
