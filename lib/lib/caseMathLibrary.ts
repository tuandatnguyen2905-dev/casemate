/**
 * caseMathLibrary.ts — 100 prebuilt case-math problems for Case Drill.
 *
 * The manifest of all 100 problems lives in data/case-math-library.json; the
 * full text of each is built here by DETERMINISTIC builder functions (see
 * lib/caseLibraryShared.ts for why the content lives in code, not JSON).
 *
 * Iron rule: every answer and every solution step is COMPUTED from the
 * problem's own data tables, so a problem can never contradict its solution.
 *
 * Distribution per the brief: profitability 25 · market-sizing 20 · pricing 15 ·
 * cost-analysis 15 · investment 10 · operations 10 · growth 5.
 * Difficulty: easy 30 · medium 50 · hard 20.
 * Each template runs exactly 5 times with 5 different parameter sets, so no
 * two problems share a data table.
 */

import {
  CaseDifficulty,
  CaseExhibit,
  chart,
  metric,
  money,
  n,
  pct,
  round1,
  round2,
  spread,
  table,
} from './caseLibraryShared';

export type { CaseDifficulty, CaseExhibit } from './caseLibraryShared';

export interface CaseMathQuestion {
  question: string;
  answer: string;
  solution_steps: string[];
}

export interface CaseMathProblem {
  id: string;
  title: string;
  difficulty: CaseDifficulty;
  type: string;
  scenario: string;
  data_exhibits: CaseExhibit[];
  questions: CaseMathQuestion[];
  tags: string[];
}

export const MATH_TYPE_LABELS: Record<string, string> = {
  profitability: 'Profitability',
  'market-sizing': 'Market Sizing',
  pricing: 'Pricing',
  'cost-analysis': 'Cost Analysis',
  investment: 'Investment & NPV',
  operations: 'Operations',
  growth: 'Growth',
};

function q(question: string, answer: string, solutionSteps: string[]): CaseMathQuestion {
  return { question, answer, solution_steps: solutionSteps };
}

/* --------------------------------------------------------------------------
 * Vietnamese / Southeast Asian business context pool
 * ------------------------------------------------------------------------ */

type Trio = [string, string, string];

const RETAIL: Trio[] = [
  ['Central Retail Việt Nam', 'GO! Mall', 'TP.HCM'],
  ['WinMart+', 'WinMart+ stores', 'Hà Nội'],
  ['Bách Hóa Xanh', 'Bách Hóa Xanh stores', 'Bình Dương'],
  ['Thế Giới Di Động', 'TGDĐ phone stores', 'Đà Nẵng'],
  ['Nhà thuốc Long Châu', 'Long Châu pharmacies', 'Cần Thơ'],
  ['Co.opmart', 'Co.opmart supermarkets', 'TP.HCM'],
  ['AEON Việt Nam', 'AEON supermarkets', 'Hà Nội'],
  ['PNJ', 'PNJ jewellery stores', 'TP.HCM'],
  ['Highlands Coffee', 'Highlands Coffee shops', 'TP.HCM'],
  ['The Coffee House', 'The Coffee House shops', 'Hà Nội'],
];

const FMCG: Trio[] = [
  ['Masan Consumer', 'Nam Ngư fish sauce', 'condiments'],
  ['Vinamilk', '180ml fresh-milk cartons', 'dairy'],
  ['Suntory PepsiCo Việt Nam', 'TEA+ oolong tea', 'soft drinks'],
  ['Nestlé Việt Nam', '180ml MILO cartons', 'nutritional drinks'],
  ['Acecook Việt Nam', 'Hảo Hảo instant noodles', 'instant noodles'],
  ['TH True Milk', '180ml TH fresh milk', 'dairy'],
  ['Sabeco', 'Saigon Lager beer', 'beer'],
  ['Nutifood', 'GrowPLUS formula milk', 'formula milk'],
  ['Trung Nguyên Legend', 'G7 instant coffee', 'coffee'],
  ['Kido Group', 'Merino ice cream', 'ice cream'],
];

const LOGI: Trio[] = [
  ['Viettel Post', 'intra-city parcels', 'TP.HCM'],
  ['Giao Hàng Nhanh', 'e-commerce orders', 'Hà Nội'],
  ['J&T Express Việt Nam', 'inter-province orders', 'Đồng Nai'],
  ['Gemadept', 'port containers', 'Hải Phòng'],
  ['Ninja Van Việt Nam', 'COD orders', 'Bình Dương'],
  ['Bee Logistics', 'export shipments', 'TP.HCM'],
  ['Transimex', 'cold-storage pallets', 'TP.HCM'],
  ['ITL Corp', '5-tonne truck runs', 'Long An'],
  ['Vinafco', 'B2B orders', 'Hà Nội'],
  ['Lazada Logistics', 'last-mile orders', 'TP.HCM'],
];

const TECH: Trio[] = [
  ['Tiki', 'TikiNOW orders', 'e-commerce'],
  ['MoMo', 'MoMo e-wallet transactions', 'fintech'],
  ['VNG', 'Zalo Cloud plans', 'technology'],
  ['Grab Việt Nam', 'GrabBike rides', 'ride-hailing'],
  ['Coolmate', 'D2C orders', 'online fashion'],
  ['KiotViet', 'retail software plans', 'SaaS'],
  ['Sendo', 'marketplace orders', 'e-commerce'],
  ['Base.vn', 'Base Work+ plans', 'SaaS'],
  ['VNPay', 'QR payments', 'fintech'],
  ['be Group', 'beCar rides', 'ride-hailing'],
];

type Builder = (k: number, diff: CaseDifficulty) => Omit<CaseMathProblem, 'id'>;

/* ==========================================================================
 * PROFITABILITY (25 problems — 5 templates × 5 businesses)
 * ======================================================================== */

const profQuarterly: Builder = (i, diff) => {
  const [name, , city] = RETAIL[i % RETAIL.length];
  const base = 90 + i * 11;
  const rev = [base, Math.round(base * 1.18), Math.round(base * 1.29), Math.round(base * 1.41)];
  const fixed = Math.round(base * 0.32);
  const vari = rev.map((r, j) => round1(r * (0.44 + 0.01 * j)));
  const gp = rev.map((r, j) => round1(r - fixed - vari[j]));
  const m2 = (gp[1] / rev[1]) * 100;
  const m4 = (gp[3] / rev[3]) * 100;
  const yoy = ((rev[3] - rev[0]) / rev[0]) * 100;
  const be = fixed / (1 - vari[3] / rev[3]);

  const questions = [
    q(
      'Compute Q2 operating profit and operating margin.',
      `${money(gp[1])} — ${pct(m2)}`,
      [
        `Q2 profit = Revenue − Fixed costs − Variable costs = ${n(rev[1])} − ${n(fixed)} − ${n(vari[1])} = ${money(gp[1])}`,
        `Margin = ${n(gp[1])} / ${n(rev[1])} = ${pct(m2)}`,
      ],
    ),
    q('By what percentage did Q4 revenue grow versus Q1?', pct(yoy), [
      `Absolute increase = ${n(rev[3])} − ${n(rev[0])} = ${money(rev[3] - rev[0])}`,
      `Growth = ${n(rev[3] - rev[0])} / ${n(rev[0])} = ${pct(yoy)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Is the Q4 margin higher or lower than Q2’s? What is the main cause?',
        `Q4 = ${pct(m4)}, ${m4 > m2 ? 'higher' : 'lower'} than Q2 (${pct(m2)}) — fixed costs are spread over a larger revenue base (operating leverage)`,
        [
          `Q4 margin = ${n(gp[3])} / ${n(rev[3])} = ${pct(m4)}`,
          `Difference versus Q2 = ${pct(m4)} − ${pct(m2)} = ${pct(m4 - m2)}`,
          `Fixed costs stay at ${money(fixed)} across all four quarters, so as revenue grows ${pct(yoy)} the fixed-cost share falls from ${pct((fixed / rev[1]) * 100)} to ${pct((fixed / rev[3]) * 100)}.`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    questions.push(
      q('With the Q4 cost structure, what is the quarterly break-even revenue?', money(be), [
        `Q4 variable-cost ratio = ${n(vari[3])} / ${n(rev[3])} = ${pct((vari[3] / rev[3]) * 100)}`,
        `Contribution-margin ratio = 100% − ${pct((vari[3] / rev[3]) * 100)} = ${pct(100 - (vari[3] / rev[3]) * 100)}`,
        `Break-even revenue = Fixed costs / Contribution-margin ratio = ${n(fixed)} / ${n(1 - vari[3] / rev[3], 3)} = ${money(be)}`,
      ]),
    );
  }

  return {
    title: `Quarterly profit analysis — ${name}`,
    difficulty: diff,
    type: 'profitability',
    scenario:
      `${name} has just closed its financial year in the ${city} market. Management sees revenue rising steadily across four quarters ` +
      'but isn’t sure profit rose to match. You have 5 minutes to read the condensed P&L and answer.',
    data_exhibits: [
      table(
        'Revenue and costs by quarter (billion VND)',
        ['Quarter', 'Revenue', 'Fixed costs', 'Variable costs'],
        rev.map((r, j) => [`Q${j + 1}`, r, fixed, vari[j]]),
      ),
      chart('bar', 'Revenue by quarter', ['Q1', 'Q2', 'Q3', 'Q4'], rev, 'billion VND'),
    ],
    questions,
    tags: ['margin', 'profitability', 'retail', 'operating-leverage'],
  };
};

const profSku: Builder = (i, diff) => {
  const [name, product, cat] = FMCG[i % FMCG.length];
  const skus = ['SKU A (500ml bottle)', 'SKU B (1L bottle)', 'SKU C (5-pack)', 'SKU D (case of 24)'];
  const vol = [round1(2.4 + i * 0.3), round1(1.6 + i * 0.2), round1(3.1 + i * 0.25), round1(0.9 + i * 0.1)];
  const price = [18 + i, 31 + i, 12 + i, 260 + 4 * i];
  const vcost = price.map((p, j) => round1(p * (0.62 + 0.03 * j)));
  const cm = price.map((p, j) => round1(p - vcost[j]));
  const totalCm = cm.map((c, j) => round1(c * vol[j]));
  const worst = [0, 1, 2, 3].reduce((a, b) => (cm[a] / price[a] <= cm[b] / price[b] ? a : b));
  const best = [0, 1, 2, 3].reduce((a, b) => (totalCm[a] >= totalCm[b] ? a : b));

  const questions = [
    q('What is SKU B’s contribution margin per unit?', `${n(cm[1])} thousand VND/unit`, [
      `Contribution margin = Price − Variable cost = ${n(price[1])} − ${n(vcost[1])} = ${n(cm[1])} thousand VND`,
    ]),
    q(
      'Which SKU contributes the largest total contribution margin?',
      `${skus[best]} — ${money(totalCm[best])}`,
      ['Total contribution = Unit contribution × Volume:']
        .concat(skus.map((s, j) => `${s}: ${n(cm[j])} × ${n(vol[j])} = ${money(totalCm[j])}`))
        .concat([`Largest: ${skus[best]} at ${money(totalCm[best])}`]),
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Which SKU has the lowest contribution-margin ratio, and should it be cut immediately?',
        `${skus[worst]} — ${pct((cm[worst] / price[worst]) * 100)}; don’t cut yet while it still contributes ${money(totalCm[worst])} toward fixed costs`,
        ['Contribution-margin ratio = Unit contribution / Price:']
          .concat(skus.map((s, j) => `${s}: ${n(cm[j])} / ${n(price[j])} = ${pct((cm[j] / price[j]) * 100)}`))
          .concat([
            `Lowest: ${skus[worst]} (${pct((cm[worst] / price[worst]) * 100)}).`,
            `But its contribution is still positive (${money(totalCm[worst])}/year) — cutting it loses that contribution to fixed costs, unless the production capacity can shift to a higher-margin SKU.`,
          ]),
      ),
    );
  }
  if (diff === 'hard') {
    const total = round1(totalCm.reduce((a, b) => a + b, 0));
    const fixedCost = round1(total * 0.68);
    questions.push(
      q(
        `Portfolio fixed costs are ${money(fixedCost)}. What is the portfolio’s operating profit?`,
        money(round1(total - fixedCost)),
        [
          `Total contribution = ${totalCm.map((x) => n(x)).join(' + ')} = ${money(total)}`,
          `Operating profit = ${n(total)} − ${n(fixedCost)} = ${money(round1(total - fixedCost))}`,
          `Profit as a share of total contribution = ${pct(((total - fixedCost) / total) * 100)}`,
        ],
      ),
    );
  }

  return {
    title: `Profit by product line — ${name}`,
    difficulty: diff,
    type: 'profitability',
    scenario:
      `${name} is reviewing its ${cat} portfolio, whose flagship product is ${product}. The category director wants to know which SKUs ` +
      'genuinely create profit before deciding what to cut. Prices and costs are in thousand VND/unit; volumes in million units/year.',
    data_exhibits: [
      table(
        'Price, variable cost, and volume by SKU',
        ['SKU', 'Price (thousand VND)', 'Variable cost (thousand VND)', 'Volume (million units)'],
        skus.map((s, j) => [s, price[j], vcost[j], vol[j]]),
      ),
      chart('bar', 'Total contribution by SKU (billion VND)', ['SKU A', 'SKU B', 'SKU C', 'SKU D'], totalCm, 'billion VND'),
    ],
    questions,
    tags: ['contribution-margin', 'profitability', 'FMCG', 'portfolio'],
  };
};

const profStore: Builder = (i, diff) => {
  const [name, store, city] = RETAIL[(i + 3) % RETAIL.length];
  const stores = ['District 1 store', 'District 7 store', 'Thủ Đức store', 'Bình Thạnh store'];
  const area = [180 + 40 * i, 320 + 20 * i, 260 + 30 * i, 150 + 25 * i];
  const rev = area.map((a, j) => round2(a * (0.052 + 0.004 * j)));
  const cost = rev.map((r, j) => round2(r * (0.86 + 0.03 * j)));
  const profit = rev.map((r, j) => round2(r - cost[j]));
  const perM2 = profit.map((p, j) => round2((p / area[j]) * 1000));
  const best = [0, 1, 2, 3].reduce((a, b) => (perM2[a] >= perM2[b] ? a : b));
  const worst = [0, 1, 2, 3].reduce((a, b) => (perM2[a] <= perM2[b] ? a : b));
  const topProfit = [0, 1, 2, 3].reduce((a, b) => (profit[a] >= profit[b] ? a : b));
  const totalRev = round2(rev.reduce((a, b) => a + b, 0));
  const totalProfit = round2(profit.reduce((a, b) => a + b, 0));

  const questions = [
    q(
      'Which store earns the highest absolute profit?',
      `${stores[topProfit]} — ${money(profit[topProfit], 'billion VND', 2)}/year`,
      stores.map((s, j) => `${s}: ${n(rev[j], 2)} − ${n(cost[j], 2)} = ${money(profit[j], 'billion VND', 2)}`),
    ),
    q(
      'Which store is most efficient per m² of selling space?',
      `${stores[best]} — ${n(perM2[best], 2)} million VND profit/m²/year`,
      ['Profit per m² = Profit / Area (convert billions to millions by multiplying by 1,000):'].concat(
        stores.map((s, j) => `${s}: ${n(profit[j], 2)} bn / ${n(area[j])} m² = ${n(perM2[j], 2)} million VND/m²`),
      ),
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Why is the store with the biggest absolute profit not necessarily the model to replicate?',
        `Because absolute profit is dominated by floor area; true efficiency is profit/m² — ${stores[best]} leads at ${n(perM2[best], 2)} million/m²`,
        [
          `Efficiency gap between the best and worst stores = ${n(perM2[best], 2)} − ${n(perM2[worst], 2)} = ${n(perM2[best] - perM2[worst], 2)} million VND/m²`,
          `Replicating the ${stores[best]} model on 1,000 new m² gives expected profit ≈ ${n(perM2[best], 2)} × 1,000 / 1,000 = ${money(perM2[best], 'billion VND', 2)}/year.`,
          'Conclusion: expansion decisions must rest on profit/m² or profit per unit of capital — not absolute profit.',
        ],
      ),
    );
  }
  if (diff === 'hard') {
    questions.push(
      q(
        'If the chain targets a 12% system-wide margin, how much more profit must it find?',
        money(round2(totalRev * 0.12 - totalProfit), 'billion VND', 2),
        [
          `System revenue = ${money(totalRev, 'billion VND', 2)}; current profit = ${money(totalProfit, 'billion VND', 2)}`,
          `Current margin = ${n(totalProfit, 2)} / ${n(totalRev, 2)} = ${pct((totalProfit / totalRev) * 100)}`,
          `Required profit = ${n(totalRev, 2)} × 12% = ${money(round2(totalRev * 0.12), 'billion VND', 2)}`,
          `Gap = ${n(totalRev * 0.12, 2)} − ${n(totalProfit, 2)} = ${money(round2(totalRev * 0.12 - totalProfit), 'billion VND', 2)}`,
        ],
      ),
    );
  }

  return {
    title: `Store-level performance — ${name}`,
    difficulty: diff,
    type: 'profitability',
    scenario:
      `${name} is considering opening more ${store} in ${city} and wants to know which store model deserves replication. ` +
      'Its four existing stores differ widely in size.',
    data_exhibits: [
      table(
        'Results by store (billion VND/year)',
        ['Store', 'Area (m²)', 'Revenue', 'Total costs'],
        stores.map((s, j) => [s, area[j], rev[j], cost[j]]),
      ),
      chart('bar', 'Profit per m² (million VND/m²/year)', stores, perM2, 'million VND/m²'),
    ],
    questions,
    tags: ['profitability', 'retail', 'unit-economics', 'store-productivity'],
  };
};

const profChannel: Builder = (i, diff) => {
  const [name, product] = FMCG[(i + 5) % FMCG.length];
  const ch = ['Modern trade (supermarkets)', 'General trade (mom-and-pop)', 'Online', 'HORECA'];
  const share = [34, 41, 17, 8];
  const revTotal = 640 + 55 * i;
  const rev = share.map((s) => round1((revTotal * s) / 100));
  const gm = [26 + (i % 4), 33 - (i % 3), 21 + (i % 5), 38 - (i % 4)];
  const sm = rev.map((r, j) => round1(r * (0.14 + 0.02 * j)));
  const op = rev.map((r, j) => round1((r * gm[j]) / 100 - sm[j]));
  const best = [0, 1, 2, 3].reduce((a, b) => (op[a] >= op[b] ? a : b));
  const losing = [0, 1, 2, 3].filter((j) => op[j] < 0);

  const questions = [
    q('What is the general-trade channel’s gross profit?', money(round1((rev[1] * gm[1]) / 100)), [
      `Gross profit = Revenue × Gross margin = ${n(rev[1])} × ${gm[1]}% = ${money(round1((rev[1] * gm[1]) / 100))}`,
    ]),
    q(
      'After sales & marketing costs, which channel contributes the most profit?',
      `${ch[best]} — ${money(op[best])}`,
      ch.map((c, j) => `${c}: ${n(rev[j])} × ${gm[j]}% − ${n(sm[j])} = ${money(op[j])}`),
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Which channel is weakest at the contribution level, and what does that say about budget allocation?',
        (losing.length > 0 ? `${losing.map((j) => ch[j]).join(', ')} ${losing.length > 1 ? 'are' : 'is'} negative` : 'No channel is negative, but the contribution spread is very wide') +
          `; budget should shift toward ${ch[best]}`,
        ['Compare post-selling-cost contribution across the four channels:']
          .concat(ch.map((c, j) => `${c}: ${money(op[j])} (${pct((op[j] / rev[j]) * 100)} of channel revenue)`))
          .concat([
            `The leading channel, ${ch[best]}, contributes at ${pct((op[best] / rev[best]) * 100)} — each dong of revenue shifted here creates the most extra profit.`,
          ]),
      ),
    );
  }
  if (diff === 'hard') {
    const shift = round1(rev[1] * 0.1);
    const gain = round2((shift * (gm[best] - gm[1])) / 100);
    questions.push(
      q(
        `If 10% of general-trade revenue shifts to ${ch[best]} at the same margin structure, how does gross profit change?`,
        `${gain >= 0 ? '+' : ''}${n(gain, 2)} billion VND`,
        [
          `Revenue shifted = ${n(rev[1])} × 10% = ${money(shift)}`,
          `Gross-margin gap = ${gm[best]}% − ${gm[1]}% = ${gm[best] - gm[1]} percentage points`,
          `Gross-profit change = ${n(shift)} × ${gm[best] - gm[1]}% = ${n(gain, 2)} billion VND`,
          'Note: this assumes cost-to-serve per channel is unchanged — in practice, check the incremental cost to serve.',
        ],
      ),
    );
  }

  return {
    title: `Profit by distribution channel — ${name}`,
    difficulty: diff,
    type: 'profitability',
    scenario:
      `${name} distributes ${product} through four channels. Annual revenue totals ${money(revTotal)} but profit is flat. ` +
      'The commercial director wants to know which channels genuinely earn after sales & marketing costs.',
    data_exhibits: [
      table(
        'Revenue, gross margin, and selling costs by channel',
        ['Channel', 'Revenue (billion VND)', 'Gross margin (%)', 'S&M costs (billion VND)'],
        ch.map((c, j) => [c, rev[j], gm[j], sm[j]]),
      ),
      chart('pie', 'Revenue mix by channel', ch, rev, 'billion VND'),
    ],
    questions,
    tags: ['profitability', 'channel-mix', 'FMCG', 'margin'],
  };
};

const profDecline: Builder = (i, diff) => {
  const [name, product] = FMCG[(i + 7) % FMCG.length];
  const p0 = 24 + i;
  const p1 = round1(p0 * (0.94 + 0.01 * (i % 3)));
  const v0 = 12 + i;
  const v1 = round1(v0 * (1.06 + 0.01 * (i % 4)));
  const c0 = round1(p0 * 0.68);
  const c1 = round1(c0 * 1.09);
  const rev0 = round1(p0 * v0);
  const rev1 = round1(p1 * v1);
  const gp0 = round1((p0 - c0) * v0);
  const gp1 = round1((p1 - c1) * v1);
  const priceEff = round1((p1 - p0) * v1);
  const volEff = round1((v1 - v0) * (p0 - c0));
  const costEff = round1(-(c1 - c0) * v1);

  const questions = [
    q(
      'How did this year’s gross profit change versus last year?',
      `${gp1 - gp0 >= 0 ? '+' : ''}${n(round1(gp1 - gp0))} billion VND (${pct(((gp1 - gp0) / gp0) * 100)})`,
      [
        `Last year’s gross profit = (${n(p0)} − ${n(c0)}) × ${n(v0)} = ${money(gp0)}`,
        `This year’s gross profit = (${n(p1)} − ${n(c1)}) × ${n(v1)} = ${money(gp1)}`,
        `Change = ${n(gp1)} − ${n(gp0)} = ${n(round1(gp1 - gp0))} billion VND`,
      ],
    ),
    q(
      'Did revenue rise or fall, and does that contradict the profit result?',
      `Revenue ${rev1 > rev0 ? 'rose' : 'fell'} from ${money(rev0)} to ${money(rev1)} while gross profit ${gp1 < gp0 ? 'fell' : 'rose'} — volume offset the price move but couldn’t offset costs`,
      [
        `Last year’s revenue = ${n(p0)} × ${n(v0)} = ${money(rev0)}`,
        `This year’s revenue = ${n(p1)} × ${n(v1)} = ${money(rev1)}`,
        `Difference = ${n(round1(rev1 - rev0))} billion VND (${pct(((rev1 - rev0) / rev0) * 100)})`,
      ],
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Decompose the profit change into price, volume, and cost effects.',
        `Price ${n(priceEff)} · Volume ${volEff >= 0 ? '+' : ''}${n(volEff)} · Cost ${n(costEff)} (billion VND)`,
        [
          `Price effect = (New price − Old price) × New volume = (${n(p1)} − ${n(p0)}) × ${n(v1)} = ${n(priceEff)} billion VND`,
          `Volume effect = (New volume − Old volume) × Old unit margin = (${n(v1)} − ${n(v0)}) × ${n(round1(p0 - c0))} = ${n(volEff)} billion VND`,
          `Cost effect = −(New cost − Old cost) × New volume = −(${n(c1)} − ${n(c0)}) × ${n(v1)} = ${n(costEff)} billion VND`,
          `Check: ${n(priceEff)} + ${n(volEff)} + ${n(costEff)} = ${n(round1(priceEff + volEff + costEff))} ≈ ${n(round1(gp1 - gp0))} billion VND`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const need = (gp0 - gp1) / v1;
    questions.push(
      q(
        'How much must price rise (volume unchanged) for gross profit to return to last year’s level?',
        `${n(need, 2)} thousand VND/unit (≈ ${pct((need / p1) * 100)} of the current price)`,
        [
          `Profit gap to close = ${n(gp0)} − ${n(gp1)} = ${n(round1(gp0 - gp1))} billion VND`,
          `Each 1 thousand VND of price adds ${n(v1)} billion VND of profit (since volume = ${n(v1)} million units)`,
          `Required increase = ${n(round1(gp0 - gp1))} / ${n(v1)} = ${n(need, 2)} thousand VND/unit`,
          `That is ${pct((need / p1) * 100)} of the current price — check demand elasticity before recommending it.`,
        ],
      ),
    );
  }

  return {
    title: `Why profit fell while revenue grew — ${name}`,
    difficulty: diff,
    type: 'profitability',
    scenario:
      `The CEO of ${name} asks the classic question: "We sold more ${product} than last year and revenue grew — ` +
      'so why did profit go backwards?" You have both years’ price — volume — unit-cost table.',
    data_exhibits: [
      table('Price, volume, and unit cost across two years', ['Metric', 'Last year', 'This year'], [
        ['Price (thousand VND/unit)', p0, p1],
        ['Volume (million units)', v0, v1],
        ['Variable cost (thousand VND/unit)', c0, c1],
      ]),
      chart('bar', 'Gross profit across two years (billion VND)', ['Last year', 'This year'], [gp0, gp1], 'billion VND'),
    ],
    questions,
    tags: ['profitability', 'price-volume-mix', 'FMCG', 'diagnosis'],
  };
};

/* ==========================================================================
 * MARKET SIZING (20 problems — 4 templates × 5)
 * ======================================================================== */

const CITIES = ['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Bình Dương', 'Đồng Nai', 'Nha Trang'];

const msPopulation: Builder = (i, diff) => {
  const products: Array<[string, string, number, number]> = [
    ['takeaway machine-brewed coffee', 'cup', 35, 3.2],
    ['bubble tea', 'cup', 42, 2.4],
    ['probiotic drinking yoghurt', 'bottle', 12, 4.5],
    ['voluntary health insurance', 'policy', 3200, 0.9],
    ['sunscreen', 'tube', 180, 1.6],
  ];
  const [prod, unit, price, freq] = products[i % products.length];
  const city = CITIES[i % CITIES.length];
  const pop = [9.5, 8.4, 1.3, 1.2, 2.1, 2.7, 3.2, 0.45][i % 8];
  const urban = 0.72 + 0.02 * (i % 5);
  const targetShare = 0.28 + 0.03 * (i % 4);
  const users = pop * urban * targetShare;
  const annualUnits = users * freq * 12;
  const market = annualUnits * price; // million units × thousand VND = billion VND
  const share = 6 + (i % 7);

  const questions = [
    q(`Estimate the target user base for ${prod} in ${city}.`, `≈ ${n(users, 2)} million people`, [
      `${city} population ≈ ${n(pop, 1)} million`,
      `Share of urban residents with suitable income ≈ ${pct(urban * 100, 0)} → ${n(pop * urban, 2)} million`,
      `Of those, the group that actually consumes ${prod} ≈ ${pct(targetShare * 100, 0)} → ${n(users, 2)} million people`,
    ]),
    q(`What is the annual market size for ${prod} in ${city}?`, money(market, 'billion VND', 0), [
      `Consumption frequency ≈ ${n(freq, 1)} ${unit}s/person/month → ${n(freq * 12, 1)} ${unit}s/person/year`,
      `Total volume = ${n(users, 2)} million × ${n(freq * 12, 1)} = ${n(annualUnits, 1)} million ${unit}s/year`,
      `Average price = ${n(price)} thousand VND/${unit}`,
      `Market size = ${n(annualUnits, 1)} million × ${n(price)} thousand VND = ${money(market, 'billion VND', 0)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        `If the client wants ${share}% of the market after 3 years, what is the revenue target?`,
        money((market * share) / 100, 'billion VND', 0),
        [
          `Revenue target = ${n(market, 0)} × ${share}% = ${money((market * share) / 100, 'billion VND', 0)}`,
          `If each outlet generates 3.6 billion VND/year, that needs ≈ ${n((market * share) / 100 / 3.6, 0)} outlets.`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    questions.push(
      q(
        'Which three assumptions are most fragile in this estimate, and how would you verify each?',
        'Penetration rate, consumption frequency, and average price',
        [
          `(1) Penetration ${pct(targetShare * 100, 0)}: verify with a survey or Nielsen/Kantar district-level data.`,
          `(2) Frequency ${n(freq, 1)} ${unit}s/month: verify with an existing chain’s transaction data (membership cards).`,
          `(3) Average price ${n(price)} thousand VND: survey prices at 20–30 outlets and take a volume-weighted average.`,
          `Sensitivity: if penetration drops to ${pct((targetShare - 0.05) * 100, 0)}, the market falls to ${money((market * (targetShare - 0.05)) / targetShare, 'billion VND', 0)} — down ${pct((0.05 / targetShare) * 100)}.`,
        ],
      ),
    );
  }

  return {
    title: `Sizing the ${prod} market in ${city}`,
    difficulty: diff,
    type: 'market-sizing',
    scenario:
      `An F&B chain is weighing expansion in ${city} and needs a market-size number for ${prod} before facing the investment committee. ` +
      'No market report exists — you must estimate top-down.',
    data_exhibits: [
      table('Input assumptions', ['Assumption', 'Value', 'Source'], [
        [`${city} population (million)`, pop, 'General Statistics Office (rounded)'],
        ['Share of urban residents with suitable income', `${Math.round(urban * 100)}%`, 'Interview assumption'],
        [`Share consuming ${prod}`, `${Math.round(targetShare * 100)}%`, 'Interview assumption'],
        [`Frequency (${unit}s/person/month)`, freq, 'Interview assumption'],
        [`Average price (thousand VND/${unit})`, price, 'Price survey'],
      ]),
      chart(
        'bar',
        'Estimation funnel (million people)',
        ['Population', 'Suitable urban residents', 'Target consumers'],
        [round2(pop), round2(pop * urban), round2(users)],
        'million people',
      ),
    ],
    questions,
    tags: ['market-sizing', 'top-down', 'F&B', 'estimation'],
  };
};

const msHousehold: Builder = (i, diff) => {
  const goods: Array<[string, number, number, number]> = [
    ['air purifiers', 4.8, 6, 5200],
    ['front-load washing machines', 9.5, 8, 12000],
    ['robot vacuums', 3.2, 5, 9000],
    ['side-by-side refrigerators', 6.1, 10, 22000],
    ['solar water heaters', 2.4, 12, 15000],
  ];
  const [good, pen, life, priceK] = goods[i % goods.length];
  const hh = 27.5;
  const owning = (hh * pen) / 10;
  const replace = owning / life;
  const newHh = hh * 0.022;
  const newUnits = (newHh * pen) / 10;
  const totalUnits = replace + newUnits;
  const market = totalUnits * priceK; // million units × thousand VND = billion VND

  const questions = [
    q(`How many ${good} does the Vietnamese market consume each year?`, `≈ ${n(totalUnits, 2)} million units/year`, [
      `Total households ≈ ${n(hh, 1)} million`,
      `Ownership rate of ${good} ≈ ${pct(pen * 10, 0)} → ${n(owning, 2)} million owning households`,
      `Replacement demand = ${n(owning, 2)} / ${life}-year product life = ${n(replace, 2)} million units/year`,
      `New demand = new households per year (${n(newHh, 2)} million) × ownership rate ${pct(pen * 10, 0)} = ${n(newUnits, 2)} million units`,
      `Total demand = ${n(replace, 2)} + ${n(newUnits, 2)} = ${n(totalUnits, 2)} million units/year`,
    ]),
    q(`What is the ${good} market size in value terms?`, money(market, 'billion VND', 0), [
      `Average retail price ≈ ${n(priceK)} thousand VND/unit`,
      `Market size = ${n(totalUnits, 2)} million × ${n(priceK)} thousand VND = ${money(market, 'billion VND', 0)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'How much of demand is replacement versus genuine growth? What is the strategic implication?',
        `Replacement is ${pct((replace / totalUnits) * 100)}; new demand only ${pct((newUnits / totalUnits) * 100)}`,
        [
          `Replacement share = ${n(replace, 2)} / ${n(totalUnits, 2)} = ${pct((replace / totalUnits) * 100)}`,
          `New-demand share = ${pct((newUnits / totalUnits) * 100)}`,
          'A mostly-replacement market → competition happens by taking competitors’ customers (trade-in programs, warranty, service), not by growing the market.',
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const pen2 = pen + 1.5;
    const owning2 = (hh * pen2) / 10;
    const total2 = owning2 / life + (newHh * pen2) / 10;
    questions.push(
      q(
        `If the ownership rate rises to ${pct(pen2 * 10, 0)} in 5 years, what is year-5 volume?`,
        `≈ ${n(total2, 2)} million units (+${pct(((total2 - totalUnits) / totalUnits) * 100)})`,
        [
          `Owning households then = ${n(hh, 1)} × ${pct(pen2 * 10, 0)} = ${n(owning2, 2)} million`,
          `Replacement demand = ${n(owning2, 2)} / ${life} = ${n(owning2 / life, 2)} million units`,
          `Demand from new households = ${n(newHh, 2)} × ${pct(pen2 * 10, 0)} = ${n((newHh * pen2) / 10, 2)} million units`,
          `Total = ${n(total2, 2)} million units, up ${pct(((total2 - totalUnits) / totalUnits) * 100)} versus today.`,
        ],
      ),
    );
  }

  return {
    title: `Sizing the ${good} market in Vietnam`,
    difficulty: diff,
    type: 'market-sizing',
    scenario:
      `A Japanese appliance group wants to know how big Vietnam’s ${good} market is before bringing in a new product line. ` +
      'Approach: start from household counts and product life (household bottom-up).',
    data_exhibits: [
      table('Input assumptions', ['Assumption', 'Value'], [
        ['Households (million)', hh],
        ['Current ownership rate', `${Math.round(pen * 10)}%`],
        ['Product life (years)', life],
        ['Household growth per year', '2.2%'],
        ['Avg retail price (thousand VND)', priceK],
      ]),
      chart('pie', 'Annual demand mix (million units)', ['Replacement demand', 'New-household demand'], [round2(replace), round2(newUnits)], 'million units'),
    ],
    questions,
    tags: ['market-sizing', 'bottom-up', 'durables', 'replacement-demand'],
  };
};

const msBottomUp: Builder = (i, diff) => {
  const [name, store, city] = RETAIL[(i + 2) % RETAIL.length];
  const stores = 120 + 45 * i;
  const tickets = 210 + 30 * i;
  const aov = 92 + 11 * i;
  const days = 350;
  const revStore = (tickets * aov * days) / 1000000;
  const revChain = revStore * stores;

  const questions = [
    q(`What is the average annual revenue of one of the ${store}?`, money(revStore, 'billion VND', 2), [
      `Daily revenue = ${n(tickets)} receipts × ${n(aov)} thousand VND = ${n(tickets * aov)} thousand VND`,
      `Annual revenue = ${n(tickets * aov)} × ${days} days = ${n(tickets * aov * days)} thousand VND = ${money(revStore, 'billion VND', 2)}`,
    ]),
    q('What is the whole chain’s annual revenue?', money(revChain, 'billion VND', 0), [
      `Chain revenue = ${n(revStore, 2)} bn × ${n(stores)} stores = ${money(revChain, 'billion VND', 0)}`,
    ]),
  ];
  if (diff !== 'easy') {
    const up = 8;
    questions.push(
      q(
        `If average order value rises ${up}% with unchanged foot traffic, how much does chain revenue grow?`,
        `+${money((revChain * up) / 100, 'billion VND', 0)} → ${money(revChain * (1 + up / 100), 'billion VND', 0)}`,
        [
          `Revenue scales with AOV when receipt count is unchanged → it grows exactly ${up}%`,
          `Increase = ${n(revChain, 0)} × ${up}% = ${money((revChain * up) / 100, 'billion VND', 0)}`,
          `New revenue = ${money(revChain * (1 + up / 100), 'billion VND', 0)}`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const newStores = 40;
    const grossAdd = revStore * newStores;
    const netAdd = grossAdd * 0.85;
    questions.push(
      q(
        `Opening ${newStores} more stores, but 15% of their revenue cannibalizes existing stores. What is the real revenue gain?`,
        money(netAdd, 'billion VND', 0),
        [
          `Gross added revenue = ${n(revStore, 2)} × ${newStores} = ${money(grossAdd, 'billion VND', 0)}`,
          `Cannibalization at 15% = ${money(grossAdd * 0.15, 'billion VND', 0)}`,
          `Net added revenue = ${n(grossAdd, 0)} − ${n(grossAdd * 0.15, 0)} = ${money(netAdd, 'billion VND', 0)}`,
          `Net chain growth = ${pct((netAdd / revChain) * 100)}`,
        ],
      ),
    );
  }

  return {
    title: `Bottom-up chain revenue estimate — ${name}`,
    difficulty: diff,
    type: 'market-sizing',
    scenario:
      `You are asked to estimate ${name}'s revenue in ${city} without any financial statements. ` +
      'All you have is in-store observation data: receipt traffic and average order value.',
    data_exhibits: [
      table('In-store observation data', ['Metric', 'Value'], [
        ['Stores in the chain', stores],
        ['Receipts/day/store', tickets],
        ['Avg order value (thousand VND)', aov],
        ['Trading days/year', days],
      ]),
      metric('Estimated chain revenue', money(revChain, 'billion VND', 0), `${n(stores)} stores × ${money(revStore, 'billion VND', 2)}/store/year`),
    ],
    questions,
    tags: ['market-sizing', 'bottom-up', 'retail', 'unit-economics'],
  };
};

const msB2B: Builder = (i, diff) => {
  const [name, product] = TECH[(i + 1) % TECH.length];
  const firms = 920000;
  const targetPct = 4 + (i % 5);
  const target = (firms * targetPct) / 100;
  const adopt = 0.18 + 0.02 * (i % 4);
  const seats = 12 + 3 * (i % 5);
  const priceSeat = 120 + 20 * (i % 6);
  const customers = target * adopt;
  const market = (customers * seats * priceSeat * 12) / 1000000; // thousand VND → billion VND
  const share = 9 + (i % 6);
  const arr = (market * share) / 100;

  const questions = [
    q(`How many companies sit in the target segment for ${product}?`, `≈ ${n(target, 0)} companies`, [
      `Active companies ≈ ${n(firms)}`,
      `Target segment (SMEs with 20+ office staff) ≈ ${targetPct}% → ${n(target, 0)} companies`,
    ]),
    q(`What is the annual revenue market size for ${product}?`, money(market, 'billion VND', 0), [
      `Share willing to pay for software ≈ ${pct(adopt * 100, 0)} → ${n(customers, 0)} potential customers`,
      `Average licences = ${seats} seats/company; price ${n(priceSeat)} thousand VND/seat/month`,
      `Annual revenue = ${n(customers, 0)} × ${seats} × ${n(priceSeat)} thousand × 12 = ${money(market, 'billion VND', 0)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        `The client targets ${share}% market share. What are the target ARR and required customer count?`,
        `ARR ${money(arr, 'billion VND', 0)} · ≈ ${n((customers * share) / 100, 0)} customers`,
        [
          `Target ARR = ${n(market, 0)} × ${share}% = ${money(arr, 'billion VND', 0)}`,
          `Average revenue/customer = ${seats} × ${n(priceSeat)} × 12 = ${n((seats * priceSeat * 12) / 1000, 1)} million VND/year`,
          `Customers needed = ${n(arr * 1000, 0)} million / ${n((seats * priceSeat * 12) / 1000, 1)} million ≈ ${n((customers * share) / 100, 0)} customers`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const churn = 14;
    const base = (customers * share) / 100;
    questions.push(
      q(
        `With ${churn}% annual churn, how many new customers must be sold each year just to stay flat?`,
        `≈ ${n((base * churn) / 100, 0)} customers/year`,
        [
          `Existing customers in the share scenario above ≈ ${n(base, 0)}`,
          `Customers churning each year = ${n(base, 0)} × ${churn}% = ${n((base * churn) / 100, 0)}`,
          'This is the SaaS treadmill: you must sell exactly as many new customers as churn away before growth even starts.',
        ],
      ),
    );
  }

  return {
    title: `B2B market size — ${product} (${name})`,
    difficulty: diff,
    type: 'market-sizing',
    scenario:
      `${name} is preparing a Series B raise and needs TAM/SAM numbers for ${product} in Vietnam. ` +
      'Investors demand a bottom-up calculation from company counts — no generic report citations accepted.',
    data_exhibits: [
      table('Bottom-up assumptions', ['Assumption', 'Value'], [
        ['Active companies', n(firms)],
        ['Share in the target segment', `${targetPct}%`],
        ['Share willing to pay for software', `${Math.round(adopt * 100)}%`],
        ['Average seats/customer', seats],
        ['Price (thousand VND/seat/month)', priceSeat],
      ]),
      chart(
        'bar',
        'Market funnel (thousand companies)',
        ['All companies', 'Target segment', 'Willing to pay'],
        [round1(firms / 1000), round1(target / 1000), round1(customers / 1000)],
        'thousand companies',
      ),
    ],
    questions,
    tags: ['market-sizing', 'B2B', 'SaaS', 'TAM'],
  };
};

/* ==========================================================================
 * PRICING (15 problems — 3 templates × 5)
 * ======================================================================== */

const prElasticity: Builder = (i, diff) => {
  const [name, product] = FMCG[(i + 2) % FMCG.length];
  const p = 26 + 3 * i;
  const v = 8 + 1.4 * i;
  const c = round1(p * 0.61);
  const up = 8 + (i % 5);
  const elast = -1.2 - 0.2 * (i % 4);
  const p2 = round1(p * (1 + up / 100));
  const v2 = round2(v * (1 + (elast * up) / 100));
  const gp1 = round1((p - c) * v);
  const gp2 = round1((p2 - c) * v2);
  const beDrop = (p - c) / (p2 - c);

  const questions = [
    q(`What is ${product}’s current gross profit?`, money(gp1), [
      `Gross profit = (${n(p)} − ${n(c)}) × ${n(v)} million units = ${money(gp1)}`,
    ]),
    q(
      `Raising price ${up}% with elasticity ${n(elast, 1)}, what is the new gross profit?`,
      `${money(gp2)} (${gp2 >= gp1 ? '+' : ''}${n(round1(gp2 - gp1))} billion VND)`,
      [
        `New price = ${n(p)} × (1 + ${up}%) = ${n(p2)} thousand VND`,
        `New volume = ${n(v)} × (1 + ${n(elast, 1)} × ${up}%) = ${n(v2, 2)} million units`,
        `New gross profit = (${n(p2)} − ${n(c)}) × ${n(v2, 2)} = ${money(gp2)}`,
        `Difference = ${n(gp2)} − ${n(gp1)} = ${n(round1(gp2 - gp1))} billion VND`,
      ],
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        `How much volume loss can the ${up}% price rise absorb before profit breaks even?`,
        pct((1 - beDrop) * 100),
        [
          `Old unit margin = ${n(p)} − ${n(c)} = ${n(round1(p - c))} thousand VND`,
          `New unit margin = ${n(p2)} − ${n(c)} = ${n(round1(p2 - c))} thousand VND`,
          `Minimum volume / old volume = ${n(round1(p - c))} / ${n(round1(p2 - c))} = ${n(beDrop, 3)}`,
          `Maximum allowable drop = 1 − ${n(beDrop, 3)} = ${pct((1 - beDrop) * 100)}`,
          `The current elasticity pulls volume down ${pct(Math.abs(elast) * up)} — ${Math.abs(elast) * up < (1 - beDrop) * 100 ? 'still inside the threshold, so raise the price' : 'beyond the threshold, so the price rise would cut profit'}.`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const worseElast = elast - 0.6;
    const v3 = v * (1 + (worseElast * up) / 100);
    const gp3 = round1((p2 - c) * v3);
    questions.push(
      q(
        'Which market conditions would make real elasticity worse than assumed?',
        'Competitors holding prices, low product differentiation, private labels on supermarket shelves, and highly price-sensitive mass-market customers',
        [
          `If real elasticity were ${n(worseElast, 1)} instead of ${n(elast, 1)}: new volume = ${n(v3, 2)} million units`,
          `Gross profit then = (${n(p2)} − ${n(c)}) × ${n(v3, 2)} = ${money(gp3)}`,
          `Versus today’s ${money(gp1)} → ${gp3 > gp1 ? 'still up' : 'turns into a decline'}.`,
          'Conclusion: pilot the price in 2–3 regions before a national rollout.',
        ],
      ),
    );
  }

  return {
    title: `Price rise and demand elasticity — ${name}`,
    difficulty: diff,
    type: 'pricing',
    scenario:
      `${name}’s input costs are rising and management wants to raise the price of ${product} by ${up}%. ` +
      'The trade-marketing team fears losing volume. You have an elasticity estimate from last year’s promotion data.',
    data_exhibits: [
      table('Price — volume — cost data', ['Metric', 'Value'], [
        ['Current price (thousand VND/unit)', p],
        ['Variable cost (thousand VND/unit)', c],
        ['Annual volume (million units)', round1(v)],
        ['Proposed price increase', `${up}%`],
        ['Price elasticity of demand', n(elast, 1)],
      ]),
      chart('bar', 'Gross profit before and after the price rise (billion VND)', ['Now', 'After the rise'], [gp1, gp2], 'billion VND'),
    ],
    questions,
    tags: ['pricing', 'elasticity', 'FMCG', 'margin'],
  };
};

const prTiers: Builder = (i, diff) => {
  const [name, product] = TECH[(i + 4) % TECH.length];
  const tiers = ['Basic plan', 'Pro plan', 'Business plan'];
  const price = [99 + 10 * i, 249 + 20 * i, 599 + 40 * i];
  const rawUsers = [42 - 2 * i, 34 + i, 12 + i];
  const tot = rawUsers.reduce((a, b) => a + b, 0);
  const users = rawUsers.map((u) => round1((u / tot) * 100));
  const base = 24000 + 3000 * i;
  const arpu = price.reduce((sum, p, j) => sum + (p * users[j]) / 100, 0);
  const rev = (arpu * base) / 1000000; // thousand VND → billion VND

  const questions = [
    q(
      'What is current ARPU (average revenue per customer per month)?',
      `${n(arpu)} thousand VND`,
      ['ARPU = Σ (Plan price × Customer share):']
        .concat(tiers.map((t, j) => `${t}: ${n(price[j])} × ${n(users[j], 1)}% = ${n((price[j] * users[j]) / 100, 1)} thousand VND`))
        .concat([`Total ARPU = ${n(arpu)} thousand VND/month`]),
    ),
    q('What is monthly revenue across the whole customer base?', money(rev, 'billion VND', 2), [
      `Revenue = ${n(arpu)} thousand VND × ${n(base)} customers = ${n(arpu * base, 0)} thousand VND = ${money(rev, 'billion VND', 2)}`,
    ]),
  ];
  if (diff !== 'easy') {
    const shift = 6;
    const newUsers = [round1(users[0] - shift), round1(users[1] + shift), users[2]];
    const arpu2 = price.reduce((sum, p, j) => sum + (p * newUsers[j]) / 100, 0);
    questions.push(
      q(
        `If ${shift}% of Basic customers upgrade to Pro, how do ARPU and monthly revenue change?`,
        `ARPU ${n(arpu2)} thousand VND (+${n(round1(arpu2 - arpu))}) · revenue +${money(((arpu2 - arpu) * base) / 1000000, 'billion VND', 2)}`,
        [
          `New mix: Basic ${n(newUsers[0], 1)}%, Pro ${n(newUsers[1], 1)}%, Business ${n(newUsers[2], 1)}%`,
          `New ARPU = ${price.map((p, j) => `${n(p)}×${n(newUsers[j], 1)}%`).join(' + ')} = ${n(arpu2)} thousand VND`,
          `ARPU difference = ${n(round1(arpu2 - arpu))} thousand VND → revenue up ${n(round1(arpu2 - arpu))} × ${n(base)} = ${money(((arpu2 - arpu) * base) / 1000000, 'billion VND', 2)}/month`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const disc = 15;
    const lost = ((price[1] * disc) / 100) * (users[1] / 100);
    const gainPerPct = (price[1] * (1 - disc / 100) - price[0]) / 100;
    questions.push(
      q(
        `Marketing proposes a ${disc}% Pro discount to drive upgrades. What share of Basic customers must upgrade to break even on revenue?`,
        pct(lost / gainPerPct),
        [
          `Discounted Pro price = ${n(price[1])} × (1 − ${disc}%) = ${n(price[1] * (1 - disc / 100), 1)} thousand VND`,
          `Revenue lost on existing Pro customers = ${n((price[1] * disc) / 100, 1)} × ${n(users[1], 1)}% = ${n(lost, 2)} thousand VND/customer`,
          `Each 1% of Basic upgrading adds (${n(price[1] * (1 - disc / 100), 1)} − ${n(price[0])}) × 1% = ${n(gainPerPct, 2)} thousand VND/customer`,
          `Break-even upgrade rate = ${n(lost, 2)} / ${n(gainPerPct, 2)} = ${pct(lost / gainPerPct)} of the Basic base`,
        ],
      ),
    );
  }

  return {
    title: `Price tiers and ARPU — ${name}`,
    difficulty: diff,
    type: 'pricing',
    scenario:
      `${name} sells ${product} in three price tiers. Revenue is growing more slowly than the customer count, and management suspects ` +
      'the tier mix is dragging ARPU down. Units: thousand VND/month.',
    data_exhibits: [
      table('Price tiers and customer mix', ['Plan', 'Price (thousand VND/month)', 'Customer share (%)'], tiers.map((t, j) => [t, price[j], users[j]])),
      chart('pie', 'Customer mix by plan', tiers, users, '%'),
    ],
    questions,
    tags: ['pricing', 'SaaS', 'ARPU', 'tiering'],
  };
};

const prDiscount: Builder = (i, diff) => {
  const [name, , city] = RETAIL[(i + 6) % RETAIL.length];
  const p = 480 + 60 * i;
  // Deeper discounts must land on higher-margin items — otherwise the
  // break-even volume rockets to several hundred percent and the problem
  // loses its point.
  const c = Math.round(p * [0.72, 0.66, 0.6, 0.54][i % 4]);
  const disc = 10 + 5 * (i % 4);
  const v = 26000 + 4000 * i;
  const m0 = p - c;
  const m1 = p * (1 - disc / 100) - c;
  const need = m0 / m1;

  const questions = [
    q('What is the per-unit gross margin before the promotion?', `${n(m0)} thousand VND (${pct((m0 / p) * 100)})`, [
      `Margin = ${n(p)} − ${n(c)} = ${n(m0)} thousand VND → ${n(m0)} / ${n(p)} = ${pct((m0 / p) * 100)}`,
    ]),
    q(
      `After the ${disc}% discount, what margin remains?`,
      `${n(m1)} thousand VND (${pct((m1 / (p * (1 - disc / 100))) * 100)} of the new price)`,
      [
        `Discounted price = ${n(p)} × (1 − ${disc}%) = ${n(p * (1 - disc / 100))} thousand VND`,
        `New margin = ${n(p * (1 - disc / 100))} − ${n(c)} = ${n(m1)} thousand VND`,
        `Margin falls ${pct(((m0 - m1) / m0) * 100)} even though price only fell ${disc}% — the margin-leverage effect.`,
      ],
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q('By what % must volume rise for the promotion not to cut profit?', pct((need - 1) * 100), [
        `Required volume / old volume = Old margin / New margin = ${n(m0)} / ${n(m1)} = ${n(need, 3)}`,
        `Required increase = ${n(need, 3)} − 1 = ${pct((need - 1) * 100)}`,
        `That means selling ${n(v * (need - 1), 0)} more units on top of today’s ${n(v)}.`,
      ]),
    );
  }
  if (diff === 'hard') {
    // Actual volume is set around the break-even threshold — some problems
    // clear it (the promotion pays off), some fall short — so learners can’t
    // guess the conclusion in advance.
    const actual = Math.max(5, Math.round(((need - 1) * 100 * (i % 2 === 0 ? 1.15 : 0.8)) / 5) * 5);
    const gp0 = (m0 * v) / 1000000;
    const gp1 = (m1 * v * (1 + actual / 100)) / 1000000;
    questions.push(
      q(
        `In reality volume only rose ${actual}%. How does gross profit change?`,
        `${money(gp1, 'billion VND', 2)} versus ${money(gp0, 'billion VND', 2)} → ${gp1 >= gp0 ? '+' : ''}${n(round2(gp1 - gp0), 2)} billion VND`,
        [
          `Gross profit before = ${n(m0)} × ${n(v)} = ${money(gp0, 'billion VND', 2)}`,
          `Post-promotion volume = ${n(v)} × (1 + ${actual}%) = ${n(v * (1 + actual / 100), 0)} units`,
          `Gross profit after = ${n(m1)} × ${n(v * (1 + actual / 100), 0)} = ${money(gp1, 'billion VND', 2)}`,
          `Conclusion: the ${actual}% increase ${actual > (need - 1) * 100 ? 'clears' : 'falls short of'} the ${pct((need - 1) * 100)} break-even threshold → the promotion ${gp1 > gp0 ? 'pays off' : 'cuts profit'}.`,
        ],
      ),
    );
  }

  return {
    title: `Is the ${disc}% promotion worth it — ${name}`,
    difficulty: diff,
    type: 'pricing',
    scenario:
      `${name} is preparing a ${disc}% holiday discount in ${city}. The CFO asks: ` +
      'how much more must we sell for the promotion not to dent profit? Units: thousand VND/product.',
    data_exhibits: [
      table('Unit economics', ['Metric', 'Value (thousand VND)'], [
        ['Price', p],
        ['Cost of goods', c],
        ['Gross margin', m0],
        [`Price after ${disc}% off`, Math.round(p * (1 - disc / 100))],
        ['Gross margin after discount', m1],
      ]),
      chart('bar', 'Gross margin per unit (thousand VND)', ['Before promotion', 'After promotion'], [m0, m1], 'thousand VND'),
    ],
    questions,
    tags: ['pricing', 'discount', 'retail', 'break-even'],
  };
};

/* ==========================================================================
 * COST ANALYSIS (15 problems — 3 templates × 5)
 * ======================================================================== */

const caStructure: Builder = (i, diff) => {
  const [name, , cat] = FMCG[(i + 1) % FMCG.length];
  const items = ['Raw materials', 'Direct labour', 'Energy & plant operations', 'Logistics & warehousing', 'Sales & marketing', 'General & admin'];
  const share = [42, 13, 9, 11, 17, 8];
  const total = 780 + 90 * i;
  const vals = share.map((s) => round1((total * s) / 100));
  const target = 6 + (i % 4);
  const save = round1((total * target) / 100);
  const top2 = vals[0] + vals[4];

  const questions = [
    q('What share of total cost do the three biggest cost lines represent?', pct(share[0] + share[4] + share[3]), [
      `Raw materials ${share[0]}% + Sales & marketing ${share[4]}% + Logistics ${share[3]}% = ${share[0] + share[4] + share[3]}%`,
      `That is ${money(round1((total * (share[0] + share[4] + share[3])) / 100))} out of ${money(total)} total`,
    ]),
    q(`Management demands a ${target}% cut in total costs. What absolute saving is required?`, money(save), [
      `Required saving = ${n(total)} × ${target}% = ${money(save)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q('If cuts can only come from raw materials and marketing, what average cut rate is needed?', pct((save / top2) * 100), [
        `Size of the two lines = ${n(vals[0])} + ${n(vals[4])} = ${money(round1(top2))}`,
        `Required cut rate = ${n(save)} / ${n(round1(top2))} = ${pct((save / top2) * 100)}`,
        'That is very steep for raw materials → split the target: negotiate purchase prices (−3–5%), optimize formulations, and cut only low-ROI marketing spend.',
      ]),
    );
  }
  if (diff === 'hard') {
    const cutMkt = round1(vals[4] * 0.3);
    const revBase = round1(total * 1.18);
    const lostRev = round1(revBase * 0.04);
    questions.push(
      q('Which line should be cut last, and why?', 'High-performing marketing — cutting it loses more future revenue than it saves', [
        `Marketing is ${share[4]}% of cost (${money(vals[4])}) but it is demand-creating spend.`,
        `If cutting 30% of marketing (= ${money(cutMkt)}) drops revenue 4% on a base of ${money(revBase)}, the loss is ${money(lostRev)}.`,
        `Compare: saving ${money(cutMkt)} ${cutMkt < lostRev ? '<' : '>'} revenue damage ${money(lostRev)} → ${cutMkt < lostRev ? 'do not cut it first' : 'worth considering'}.`,
        'Suggested order: general & admin → logistics (route optimization) → raw materials (negotiation) → marketing (only the low-ROI portion).',
      ]),
    );
  }

  return {
    title: `Cost structure and the savings target — ${name}`,
    difficulty: diff,
    type: 'cost-analysis',
    scenario:
      `${name}’s margin has been eroding for two straight years. The CFO asks you to read the ${cat} category’s cost structure ` +
      'and point out where to cut first.',
    data_exhibits: [
      table('Annual cost structure (billion VND)', ['Line item', 'Value', 'Share (%)'], items.map((it, j) => [it, vals[j], share[j]])),
      chart('pie', 'Cost mix', items, share, '%'),
    ],
    questions,
    tags: ['cost-analysis', 'cost-structure', 'FMCG', 'margin'],
  };
};

const caMakeBuy: Builder = (i, diff) => {
  const [name, item, city] = LOGI[(i + 3) % LOGI.length];
  const vol = 1200000 + 250000 * i;
  const buy = 34 + 3 * i;
  const makeVar = round1(buy * 0.68);
  const makeFixed = Math.round((vol * (buy - makeVar) * 0.72) / 1000); // million VND
  const beVol = (makeFixed * 1000) / (buy - makeVar);
  const costBuy = (vol * buy) / 1000000;
  const costMake = (vol * makeVar) / 1000000 + makeFixed / 1000;

  const questions = [
    q('What is the total cost if outsourcing continues (buy)?', money(costBuy, 'billion VND', 2), [
      `Cost = ${n(vol)} units × ${n(buy)} thousand VND = ${n(vol * buy)} thousand VND = ${money(costBuy, 'billion VND', 2)}`,
    ]),
    q('What is the total cost of doing it in-house (make)?', money(costMake, 'billion VND', 2), [
      `Variable cost = ${n(vol)} × ${n(makeVar)} thousand VND = ${money((vol * makeVar) / 1000000, 'billion VND', 2)}`,
      `Fixed investment & operating cost = ${money(makeFixed / 1000, 'billion VND', 2)}`,
      `Total = ${money((vol * makeVar) / 1000000, 'billion VND', 2)} + ${money(makeFixed / 1000, 'billion VND', 2)} = ${money(costMake, 'billion VND', 2)}`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q('What is the break-even volume between the two options?', `≈ ${n(beVol, 0)} units/year`, [
        `Variable-cost gap = ${n(buy)} − ${n(makeVar)} = ${n(round1(buy - makeVar))} thousand VND/unit`,
        `Break-even volume = Fixed cost / Variable-cost gap = ${n(makeFixed)} million VND / ${n(round1(buy - makeVar))} thousand VND = ${n(beVol, 0)} units`,
        `Current volume ${n(vol)} ${vol > beVol ? '>' : '<'} break-even → the ${vol > beVol ? 'make' : 'buy'} option is cheaper.`,
      ]),
    );
  }
  if (diff === 'hard') {
    const lowVol = vol * 0.8;
    const lowMake = (lowVol * makeVar) / 1000000 + makeFixed / 1000;
    const lowBuy = (lowVol * buy) / 1000000;
    questions.push(
      q('Beyond the numbers, which three qualitative risks belong in the recommendation?', 'Volume-decline risk, lost capital flexibility, and internal operating capability', [
        `(1) If volume falls 20% to ${n(lowVol, 0)} units: make costs ${money(lowMake, 'billion VND', 2)} versus buy ${money(lowBuy, 'billion VND', 2)} → ${lowMake < lowBuy ? 'still cheaper' : 'more expensive'}.`,
        '(2) Fixed costs turn working capital into sunk capital, reducing room to manoeuvre if the market turns.',
        '(3) Operating capability (hiring, quality, safety) usually makes the "make" option run 10–20% over budget.',
        `Recommendation: in-source only the base volume (about ${n(beVol * 1.3, 0)} units) and outsource the seasonal peak.`,
      ]),
    );
  }

  return {
    title: `Make or buy — ${name}`,
    difficulty: diff,
    type: 'cost-analysis',
    scenario:
      `${name} currently outsources the handling of ${item} in ${city}. Management wants to know whether to invest in its own ` +
      'operations centre. Cost unit: thousand VND/unit.',
    data_exhibits: [
      table('Comparing the two options', ['Metric', 'Outsource (Buy)', 'In-house (Make)'], [
        ['Variable cost (thousand VND/unit)', buy, makeVar],
        ['Annual fixed cost (million VND)', 0, makeFixed],
        ['Annual volume (units)', n(vol), n(vol)],
      ]),
      chart('bar', 'Total annual cost (billion VND)', ['Outsource', 'In-house'], [round2(costBuy), round2(costMake)], 'billion VND'),
    ],
    questions,
    tags: ['cost-analysis', 'make-vs-buy', 'logistics', 'break-even'],
  };
};

const caCapacity: Builder = (i, diff) => {
  const [name, item, city] = LOGI[(i + 6) % LOGI.length];
  const cap = 100000 + 20000 * i;
  const used = Math.round(cap * (0.62 + 0.04 * (i % 5)));
  const fixed = 48 + 7 * i; // billion VND
  const vari = 62 + 5 * i; // thousand VND/unit
  const unitFixed = (fixed * 1000000) / used; // thousand VND
  const unitTotal = unitFixed + vari;
  const unitFixedFull = (fixed * 1000000) / cap;
  const unitTotalFull = unitFixedFull + vari;

  const questions = [
    q('What fixed cost is allocated per unit at current utilization?', `${n(unitFixed)} thousand VND/unit`, [
      `Utilization = ${n(used)} / ${n(cap)} = ${pct((used / cap) * 100)}`,
      `Fixed cost = ${n(fixed)} billion VND = ${n(fixed * 1000000)} thousand VND`,
      `Fixed cost/unit = ${n(fixed * 1000000)} / ${n(used)} = ${n(unitFixed)} thousand VND`,
    ]),
    q('What is the current total cost per unit?', `${n(unitTotal)} thousand VND/unit`, [
      'Total cost/unit = Fixed cost/unit + Variable cost/unit',
      `= ${n(unitFixed)} + ${n(vari)} = ${n(unitTotal)} thousand VND`,
      `Fixed cost makes up ${pct((unitFixed / unitTotal) * 100)} — a share that only falls as volume rises.`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'If the centre runs at full capacity, how much does unit cost fall?',
        `To ${n(unitTotalFull)} thousand VND — a ${pct(((unitTotal - unitTotalFull) / unitTotal) * 100)} drop`,
        [
          `Fixed cost/unit at 100% capacity = ${n(fixed * 1000000)} / ${n(cap)} = ${n(unitFixedFull)} thousand VND`,
          `Total cost/unit = ${n(unitFixedFull)} + ${n(vari)} = ${n(unitTotalFull)} thousand VND`,
          `Reduction = ${n(unitTotal)} − ${n(unitTotalFull)} = ${n(unitTotal - unitTotalFull)} thousand VND (${pct(((unitTotal - unitTotalFull) / unitTotal) * 100)})`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const priceBid = round1(unitTotal * 0.92);
    const idle = cap - used;
    const contrib = ((priceBid - vari) * idle) / 1000000;
    questions.push(
      q(
        `A customer offers ${n(priceBid)} thousand VND per unit for the idle capacity. Should you take it?`,
        `Yes — the price still beats the ${n(vari)} thousand VND variable cost, adding ${money(contrib, 'billion VND', 2)}/year of contribution`,
        [
          `Idle capacity = ${n(cap)} − ${n(used)} = ${n(idle)} units`,
          `The incremental cost of each idle unit is only the variable cost ${n(vari)} thousand VND (fixed cost is incurred whether it runs or not).`,
          `Contribution per unit = ${n(priceBid)} − ${n(vari)} = ${n(priceBid - vari)} thousand VND`,
          `Total extra contribution = ${n(priceBid - vari)} × ${n(idle)} = ${money(contrib, 'billion VND', 2)}/year`,
          `Warning: this price sits below the full cost of ${n(unitTotal)} thousand VND — accept only if the price can’t leak to existing customers and the contract is time-limited.`,
        ],
      ),
    );
  }

  return {
    title: `Unit cost and idle capacity — ${name}`,
    difficulty: diff,
    type: 'cost-analysis',
    scenario:
      `${name}’s operations centre in ${city} was designed for ${n(cap)} ${item}/year but runs at only ${n(used)}. ` +
      'The operations director wants to understand how unit cost moves with utilization.',
    data_exhibits: [
      table('Operations-centre cost structure', ['Metric', 'Value'], [
        ['Design capacity (units/year)', n(cap)],
        ['Actual volume (units/year)', n(used)],
        ['Annual fixed cost (billion VND)', fixed],
        ['Variable cost (thousand VND/unit)', vari],
      ]),
      chart(
        'line',
        'Unit cost by utilization level (thousand VND)',
        ['60%', '70%', '80%', '90%', '100%'],
        [0.6, 0.7, 0.8, 0.9, 1].map((r) => round1((fixed * 1000000) / (cap * r) + vari)),
        'thousand VND/unit',
      ),
    ],
    questions,
    tags: ['cost-analysis', 'capacity', 'logistics', 'unit-cost'],
  };
};

/* ==========================================================================
 * INVESTMENT & NPV (10 problems — 2 templates × 5)
 * ======================================================================== */

const annuityFactor = (rate: number, years: number) => {
  let sum = 0;
  for (let t = 1; t <= years; t += 1) sum += 1 / Math.pow(1 + rate, t);
  return sum;
};

const invStore: Builder = (i, diff) => {
  const [name, store, city] = RETAIL[(i + 1) % RETAIL.length];
  const capex = round1(6.5 + 1.2 * i);
  const cf = round2(capex / (2.6 + 0.2 * i));
  const years = 5;
  const af = annuityFactor(0.12, years);
  const npv = -capex + cf * af;
  const payback = capex / cf;

  const questions = [
    q('What is the simple payback time of one new store?', `${n(payback, 1)} years`, [
      `Payback = Investment / Annual cash flow = ${n(capex, 1)} / ${n(cf, 2)} = ${n(payback, 1)} years`,
    ]),
    q(
      `What is the project’s ${years}-year NPV at a 12% cost of capital?`,
      money(npv, 'billion VND', 2),
      Array.from({ length: years }, (_unused, t) => t + 1)
        .map((t) => `Year-${t} discount factor = 1/(1.12^${t}) = ${n(1 / Math.pow(1.12, t), 3)} → discounted cash flow = ${money(cf / Math.pow(1.12, t), 'billion VND', 2)}`)
        .concat([
          `Total discounted cash flow = ${money(cf * af, 'billion VND', 2)}`,
          `NPV = ${n(cf * af, 2)} − ${n(capex, 1)} = ${money(npv, 'billion VND', 2)}`,
        ]),
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Should the project be approved, and what threshold flips the decision?',
        `${npv > 0 ? 'Approve' : 'Don’t approve yet'} — NPV ${money(npv, 'billion VND', 2)}; the decision flips if annual cash flow falls below ${money(capex / af, 'billion VND', 2)}`,
        [
          `5-year annuity factor at 12% = ${n(af, 3)}`,
          `Minimum cash flow for NPV = 0: ${n(capex, 1)} / ${n(af, 3)} = ${money(capex / af, 'billion VND', 2)}/year`,
          `Projected cash flow ${money(cf, 'billion VND', 2)} is ${cf > capex / af ? 'above' : 'below'} that threshold.`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const cf2 = round2(cf * 0.8);
    const npv2 = -capex + cf2 * af;
    questions.push(
      q(
        'Downside case: cash flow comes in 20% under forecast. What is the NPV, and what do you recommend?',
        `${money(npv2, 'billion VND', 2)} — ${npv2 > 0 ? 'still positive; the project absorbs the shock' : 'negative; renegotiate the rent or cut the investment'}`,
        [
          `Downside cash flow = ${n(cf, 2)} × 80% = ${money(cf2, 'billion VND', 2)}/year`,
          `NPV = −${n(capex, 1)} + ${n(cf2, 2)} × ${n(af, 3)} = ${money(npv2, 'billion VND', 2)}`,
          `Maximum investment that still breaks even in the downside case = ${money(cf2 * af, 'billion VND', 2)}`,
          'Recommendation: negotiate the investment below that level, or sign a lease with a 24-month exit clause.',
        ],
      ),
    );
  }

  return {
    title: `Should a new store open — ${name} ${city}`,
    difficulty: diff,
    type: 'investment',
    scenario:
      `${name} is weighing a new ${store.replace(/s$/, '')} in ${city}. Initial investment ${money(capex)}, expected free cash flow ` +
      `${money(cf, 'billion VND', 2)}/year for 5 years. The company’s cost of capital is 12%.`,
    data_exhibits: [
      table(
        'Project cash flows (billion VND)',
        ['Year', 'Cash flow', '12% discount factor', 'Discounted cash flow'],
        ([[0, -capex, 1, -capex]] as Array<Array<string | number>>).concat(
          Array.from({ length: years }, (_unused, t) => [t + 1, cf, round2(1 / Math.pow(1.12, t + 1)), round2(cf / Math.pow(1.12, t + 1))]),
        ),
      ),
      chart(
        'line',
        'Cumulative discounted cash flow (billion VND)',
        ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        Array.from({ length: years + 1 }, (_unused, kk) => round2(-capex + cf * annuityFactor(0.12, kk))),
        'billion VND',
      ),
    ],
    questions,
    tags: ['investment', 'NPV', 'payback', 'retail'],
  };
};

function crossoverRate(aCapex: number, aCf: number, bCapex: number, bCf: number): number {
  const dc = aCapex - bCapex;
  const dcf = aCf - bCf;
  let lo = 0.0001;
  let hi = 2;
  for (let step = 0; step < 200; step += 1) {
    const mid = (lo + hi) / 2;
    const npv = -dc + dcf * annuityFactor(mid, 5);
    if (npv > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const invCompare: Builder = (i, diff) => {
  const [name, , cat] = TECH[(i + 6) % TECH.length];
  const aCapex = 40 + 6 * i;
  const aCf = round1(aCapex / 3.1);
  const bCapex = round1(aCapex * 0.55);
  const bCf = round1(bCapex / 2.6);
  const years = 5;
  const af = annuityFactor(0.14, years);
  const aNpv = -aCapex + aCf * af;
  const bNpv = -bCapex + bCf * af;
  const aPi = (aCf * af) / aCapex;
  const bPi = (bCf * af) / bCapex;

  const questions = [
    q('What is each project’s NPV?', `Project A ${money(aNpv, 'billion VND', 2)} · Project B ${money(bNpv, 'billion VND', 2)}`, [
      `5-year annuity factor at 14% = ${n(af, 3)}`,
      `NPV(A) = −${n(aCapex)} + ${n(aCf, 1)} × ${n(af, 3)} = ${money(aNpv, 'billion VND', 2)}`,
      `NPV(B) = −${n(bCapex, 1)} + ${n(bCf, 1)} × ${n(af, 3)} = ${money(bNpv, 'billion VND', 2)}`,
    ]),
    q(
      'If only one project can be chosen, which one?',
      `Project ${aNpv > bNpv ? 'A' : 'B'} — its NPV is ${money(Math.abs(aNpv - bNpv), 'billion VND', 2)} higher`,
      [`Compare NPVs: ${money(aNpv, 'billion VND', 2)} vs ${money(bNpv, 'billion VND', 2)} → gap ${money(Math.abs(aNpv - bNpv), 'billion VND', 2)}`],
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'If capital is constrained, does the profitability index (PI) change the answer?',
        `PI(A) = ${n(aPi, 2)} · PI(B) = ${n(bPi, 2)} → prioritize project ${bPi > aPi ? 'B' : 'A'}`,
        [
          'PI = Present value of cash flows / Investment',
          `PI(A) = ${n(aCf * af, 1)} / ${n(aCapex)} = ${n(aPi, 2)}`,
          `PI(B) = ${n(bCf * af, 1)} / ${n(bCapex, 1)} = ${n(bPi, 2)}`,
          `When capital is scarce, each dong belongs in the higher-PI project → project ${bPi > aPi ? 'B' : 'A'}.`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const cross = crossoverRate(aCapex, aCf, bCapex, bCf);
    questions.push(
      q('At what cost of capital does the ranking flip?', `When the cost of capital exceeds roughly ${pct(cross * 100)}`, [
        `Differential cash flow (A − B): year 0 = −${n(round1(aCapex - bCapex))}, years 1–5 = +${n(round1(aCf - bCf))}`,
        `The differential cash flow’s internal rate of return (crossover rate) ≈ ${pct(cross * 100)}`,
        'Below this rate the bigger-capex project wins; above it, the faster-payback project wins.',
      ]),
    );
  }

  return {
    title: `Choosing between two investments — ${name}`,
    difficulty: diff,
    type: 'investment',
    scenario: `${name} has two investment proposals for its ${cat} business but budget for only one. Cost of capital 14%, 5-year life for both.`,
    data_exhibits: [
      table('The two options (billion VND)', ['Metric', 'Project A', 'Project B'], [
        ['Initial investment', aCapex, bCapex],
        ['Free cash flow/year', aCf, bCf],
        ['Life (years)', years, years],
      ]),
      chart('bar', 'NPV of the two projects (billion VND)', ['Project A', 'Project B'], [round2(aNpv), round2(bNpv)], 'billion VND'),
    ],
    questions,
    tags: ['investment', 'NPV', 'capital-rationing', 'tech'],
  };
};

/* ==========================================================================
 * OPERATIONS (10 problems — 2 templates × 5)
 * ======================================================================== */

const opBottleneck: Builder = (i, diff) => {
  const [name, item, city] = LOGI[(i + 1) % LOGI.length];
  const steps = ['Receiving', 'Sorting', 'Packing', 'Dispatch'];
  const caps = [1400 + 80 * i, 950 + 40 * i, 1150 + 60 * i, 1600 + 70 * i];
  const bn = caps.indexOf(Math.min(...caps));
  const demand = 1250 + 50 * i;
  const second = caps.slice().sort((a, b) => a - b)[1];

  const questions = [
    q(
      'What is the whole line’s maximum throughput?',
      `${n(caps[bn])} ${item}/hour — constrained at the ${steps[bn]} step`,
      [
        'Line throughput = the slowest step’s capacity:',
        steps.map((s, j) => `${s} ${n(caps[j])}`).join(' · '),
        `Bottleneck = ${steps[bn]} at ${n(caps[bn])} ${item}/hour`,
      ],
    ),
    q(
      `Demand is ${n(demand)} ${item}/hour. What is the shortfall?`,
      demand > caps[bn] ? `${n(demand - caps[bn])} ${item}/hour` : 'No shortfall',
      [`Shortfall = ${n(demand)} − ${n(caps[bn])} = ${n(demand - caps[bn])} ${item}/hour (${pct(((demand - caps[bn]) / demand) * 100)} of demand)`],
    ),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        `If the ${steps[bn]} step’s capacity rises 40%, what is the new line throughput?`,
        `${n(Math.min(second, caps[bn] * 1.4))} ${item}/hour`,
        [
          `New ${steps[bn]} capacity = ${n(caps[bn])} × 1.4 = ${n(caps[bn] * 1.4)}`,
          `The second-slowest step runs at ${n(second)} → the bottleneck shifts there.`,
          `New line throughput = min(${n(caps[bn] * 1.4)}; ${n(second)}) = ${n(Math.min(second, caps[bn] * 1.4))} ${item}/hour`,
          'Lesson: improving a bottleneck only pays until the bottleneck moves to another step.',
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const cost = round1(3.2 + 0.4 * i);
    const gain = (Math.min(second, caps[bn] * 1.4) - caps[bn]) * 16 * 300;
    const margin = 4.5;
    const profit = (gain * margin) / 1000000;
    questions.push(
      q(`Investing ${money(cost)} to upgrade the bottleneck — what is the payback time?`, `${n(cost / profit, 2)} years`, [
        `Extra throughput per hour = ${n(Math.min(second, caps[bn] * 1.4) - caps[bn])} ${item}`,
        `Operating hours/year = 16 hours × 300 days = 4,800 hours → extra volume = ${n(gain)} ${item}/year`,
        `Contribution margin = ${n(margin, 1)} thousand VND each → extra profit = ${money(profit, 'billion VND', 2)}/year`,
        `Payback = ${n(cost, 1)} / ${n(profit, 2)} = ${n(cost / profit, 2)} years`,
      ]),
    );
  }

  return {
    title: `The operations bottleneck — ${name}`,
    difficulty: diff,
    type: 'operations',
    scenario:
      `${name}’s sorting centre in ${city} can’t keep up with peak season. Its four steps have different capacities ` +
      `(unit: ${item}/hour).`,
    data_exhibits: [
      table('Capacity by step', ['Step', `Capacity (${item}/hour)`], steps.map((s, j) => [s, caps[j]])),
      chart('bar', 'Capacity by step', steps, caps, `${item}/hour`),
    ],
    questions,
    tags: ['operations', 'bottleneck', 'logistics', 'throughput'],
  };
};

const opInventory: Builder = (i, diff) => {
  const [name, item, city] = LOGI[(i + 8) % LOGI.length];
  const demand = 240000 + 30000 * i;
  const orderCost = 4500 + 500 * i;
  const hold = 9 + i; // thousand VND/unit/year
  const eoq = Math.sqrt((2 * demand * orderCost) / (hold * 1000));
  const orders = demand / eoq;
  const total = (orders * orderCost) / 1000 + (eoq / 2) * hold; // thousand VND

  const questions = [
    q('What is the economic order quantity (EOQ)?', `≈ ${n(eoq, 0)} units/order`, [
      'EOQ = √(2 × Annual demand × Ordering cost / Unit holding cost)',
      `= √(2 × ${n(demand)} × ${n(orderCost)} / ${n(hold * 1000)})`,
      `= √${n((2 * demand * orderCost) / (hold * 1000), 0)} ≈ ${n(eoq, 0)} units`,
    ]),
    q('How many orders are needed per year?', `≈ ${n(orders, 1)} orders/year`, [
      `Orders = ${n(demand)} / ${n(eoq, 0)} = ${n(orders, 1)}`,
    ]),
  ];
  if (diff !== 'easy') {
    const currentQ = Math.round(eoq * 1.8);
    const curTotal = ((demand / currentQ) * orderCost) / 1000 + (currentQ / 2) * hold;
    questions.push(
      q(
        `The company currently orders ${n(currentQ)} units at a time. How much does switching to EOQ save?`,
        money((curTotal - total) / 1000, 'million VND', 2),
        [
          `Current total cost = (${n(demand)}/${n(currentQ)}) × ${n(orderCost)} + (${n(currentQ)}/2) × ${n(hold * 1000)} = ${n(curTotal * 1000, 0)} VND`,
          `Total cost at EOQ = ${n(total * 1000, 0)} VND`,
          `Saving = ${money((curTotal - total) / 1000, 'million VND', 2)}/year`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    const lead = 12;
    const daily = demand / 365;
    const safety = Math.round(daily * 6);
    const rop = Math.round(daily * lead + safety);
    questions.push(
      q(`Lead time is ${lead} days and 6 days of safety stock are required. What is the reorder point (ROP)?`, `${n(rop)} units`, [
        `Daily demand = ${n(demand)} / 365 = ${n(daily, 0)} units/day`,
        `Demand during lead time = ${n(daily, 0)} × ${lead} = ${n(daily * lead, 0)} units`,
        `Safety stock = ${n(daily, 0)} × 6 = ${n(safety)} units`,
        `ROP = ${n(daily * lead, 0)} + ${n(safety)} = ${n(rop)} units`,
      ]),
    );
  }

  return {
    title: `Inventory optimization and the reorder point — ${name}`,
    difficulty: diff,
    type: 'operations',
    scenario:
      `${name}’s warehouse in ${city} is holding too much ${item} stock, tying up working capital. ` +
      'You are asked to recompute the ordering policy.',
    data_exhibits: [
      table('Inventory parameters', ['Parameter', 'Value'], [
        ['Annual demand (units)', n(demand)],
        ['Cost per order (VND)', n(orderCost)],
        ['Holding cost (thousand VND/unit/year)', hold],
      ]),
      metric('EOQ', `${n(eoq, 0)} units`, `≈ ${n(orders, 1)} orders per year`),
    ],
    questions,
    tags: ['operations', 'inventory', 'EOQ', 'logistics'],
  };
};

/* ==========================================================================
 * GROWTH (5 problems)
 * ======================================================================== */

const grDecomp: Builder = (i, diff) => {
  const pool = TECH.concat(FMCG);
  const [name, product] = pool[i % pool.length];
  const y = [100 + 12 * i, 0, 0, 0];
  const growth = [0.18, 0.24, 0.15];
  for (let j = 1; j < 4; j += 1) y[j] = round1(y[j - 1] * (1 + growth[j - 1]));
  const cagr = Math.pow(y[3] / y[0], 1 / 3) - 1;
  const target = round1(y[3] * 2);
  const need = Math.pow(2, 1 / 3) - 1;
  const cust = 480 + 40 * i;
  const arpu = (y[3] * 1000) / cust;

  const questions = [
    q('What was revenue CAGR over the past three years?', pct(cagr * 100), [
      'CAGR = (Ending revenue / Starting revenue)^(1/years) − 1',
      `= (${n(y[3])} / ${n(y[0])})^(1/3) − 1 = ${n(Math.pow(y[3] / y[0], 1 / 3), 4)} − 1 = ${pct(cagr * 100)}`,
    ]),
    q('What CAGR is needed to double revenue in the next 3 years?', pct(need * 100), [
      `Target revenue = ${n(y[3])} × 2 = ${money(target)}`,
      `Required CAGR = 2^(1/3) − 1 = ${pct(need * 100)}`,
      `Versus the current CAGR of ${pct(cagr * 100)} → a gap of ${n((need - cagr) * 100, 1)} percentage points per year.`,
    ]),
  ];
  if (diff !== 'easy') {
    questions.push(
      q(
        'Decompose the target into customers and ARPU: how many more customers are needed if ARPU stays flat?',
        `${n(cust)} thousand more customers (doubling to ${n(cust * 2)} thousand)`,
        [
          `Current ARPU = ${n(y[3])} bn / ${n(cust)} thousand customers = ${n(arpu, 2)} million VND/customer/year`,
          `With ARPU flat, doubling revenue ⇒ doubling customers: ${n(cust)} → ${n(cust * 2)} thousand`,
          `That means adding ${n(cust)} thousand customers in 3 years ≈ ${n(cust / 36, 1)} thousand new customers a month (before churn).`,
        ],
      ),
    );
  }
  if (diff === 'hard') {
    questions.push(
      q('If ARPU can rise 25%, what % more customers are needed?', pct((2 / 1.25 - 1) * 100), [
        'Revenue = Customers × ARPU. To get revenue ×2 with ARPU ×1.25:',
        `Customer multiplier = 2 / 1.25 = ${n(2 / 1.25, 2)} → up ${pct((2 / 1.25 - 1) * 100)}`,
        `Target customers = ${n(cust)} × ${n(2 / 1.25, 2)} = ${n((cust * 2) / 1.25, 0)} thousand`,
        'Lesson: a 25% ARPU lift cuts the customer-growth burden from 100% to 60%.',
      ]),
    );
  }

  return {
    title: `Growth decomposition and the doubling target — ${name}`,
    difficulty: diff,
    type: 'growth',
    scenario:
      `${name}’s board targets doubling ${product} revenue in 3 years. ` +
      'You must show the gap between the current trajectory and the target, then decompose it into levers.',
    data_exhibits: [
      table(
        'Revenue, last 4 years (billion VND)',
        ['Year', 'Revenue', 'Growth (%)'],
        ([['Year 1', y[0], '—']] as Array<Array<string | number>>).concat(
          [1, 2, 3].map((j) => [`Year ${j + 1}`, y[j], round1(growth[j - 1] * 100)]),
        ),
      ),
      chart('line', 'Revenue by year (billion VND)', ['Year 1', 'Year 2', 'Year 3', 'Year 4'], y, 'billion VND'),
    ],
    questions,
    tags: ['growth', 'CAGR', 'decomposition', 'strategy'],
  };
};

/* ==========================================================================
 * Assemble the library — exact type and difficulty distribution per the brief
 * ======================================================================== */

const TYPE_PLAN: Array<[string, number]> = [
  ['profitability', 25],
  ['market-sizing', 20],
  ['pricing', 15],
  ['cost-analysis', 15],
  ['investment', 10],
  ['operations', 10],
  ['growth', 5],
];

const DIFF_PLAN: Record<string, [number, number, number]> = {
  profitability: [8, 12, 5],
  'market-sizing': [6, 10, 4],
  pricing: [4, 8, 3],
  'cost-analysis': [5, 7, 3],
  investment: [3, 5, 2],
  operations: [3, 5, 2],
  growth: [1, 3, 1],
};

const BUILDERS: Record<string, Builder[]> = {
  profitability: [profQuarterly, profSku, profStore, profChannel, profDecline],
  'market-sizing': [msPopulation, msHousehold, msBottomUp, msB2B],
  pricing: [prElasticity, prTiers, prDiscount],
  'cost-analysis': [caStructure, caMakeBuy, caCapacity],
  investment: [invStore, invCompare],
  operations: [opBottleneck, opInventory],
  growth: [grDecomp],
};

function buildLibrary(): CaseMathProblem[] {
  const out: CaseMathProblem[] = [];
  TYPE_PLAN.forEach(([kind, count]) => {
    const [easy, medium, hard] = DIFF_PLAN[kind];
    const diffs = spread<CaseDifficulty>(
      (new Array(easy).fill('easy') as CaseDifficulty[])
        .concat(new Array(medium).fill('medium'))
        .concat(new Array(hard).fill('hard')),
      7,
    );
    const builders = BUILDERS[kind];
    const per = Math.floor(count / builders.length);
    const plan: Array<[Builder, number]> = [];
    builders.forEach((builder, bIndex) => {
      const take = bIndex < builders.length - 1 ? per : count - per * (builders.length - 1);
      for (let kk = 0; kk < take; kk += 1) plan.push([builder, kk]);
    });
    plan.forEach(([builder, kk], index) => {
      out.push({ id: `math-${String(out.length + 1).padStart(3, '0')}`, ...builder(kk, diffs[index]) });
    });
  });
  return out;
}

export const CASE_MATH_LIBRARY: CaseMathProblem[] = buildLibrary();

export const MATH_TYPES: string[] = TYPE_PLAN.map(([kind]) => kind);

/* --------------------------------------------------------------------------
 * Instant draws + "You should practise" suggestions
 * ------------------------------------------------------------------------ */

export interface MathFilters {
  difficulty?: CaseDifficulty | 'all';
  type?: string | 'all';
  excludeIds?: string[];
}

/** Draw a random problem — synchronous, no AI call, under a millisecond. */
export function pickRandomMathCase(filters: MathFilters = {}): CaseMathProblem | null {
  const matches = (p: CaseMathProblem) =>
    (!filters.difficulty || filters.difficulty === 'all' || p.difficulty === filters.difficulty) &&
    (!filters.type || filters.type === 'all' || p.type === filters.type);
  const exclude = new Set(filters.excludeIds || []);
  let pool = CASE_MATH_LIBRARY.filter((p) => matches(p) && !exclude.has(p.id));
  // If everything in the filter has been practised, drop the exclusion instead of returning empty.
  if (pool.length === 0) pool = CASE_MATH_LIBRARY.filter(matches);
  if (pool.length === 0) pool = CASE_MATH_LIBRARY;
  return pool[Math.floor(Math.random() * pool.length)] || null;
}

export interface PracticeRecord {
  case_id?: string | null;
  case_type?: string | null;
  difficulty?: string | null;
}

/**
 * "You should practise": prioritizes the types and difficulty levels the user
 * has practised least. No history → a balanced set of 1 easy / 1 medium / 1 hard
 * across three different types.
 */
export function recommendMathCases(history: PracticeRecord[], count = 3): CaseMathProblem[] {
  const done = new Set(history.map((h) => String(h.case_id || '')).filter(Boolean));
  const fresh = CASE_MATH_LIBRARY.filter((p) => !done.has(p.id));
  const source = fresh.length >= count ? fresh : CASE_MATH_LIBRARY;

  if (history.length === 0) {
    const picks: CaseMathProblem[] = [];
    (['easy', 'medium', 'hard'] as CaseDifficulty[]).forEach((level) => {
      const usedTypes = new Set(picks.map((p) => p.type));
      const candidate = source.find((p) => p.difficulty === level && !usedTypes.has(p.type)) || source.find((p) => p.difficulty === level);
      if (candidate && !picks.includes(candidate)) picks.push(candidate);
    });
    return picks.slice(0, count);
  }

  const typeCount = new Map<string, number>();
  const diffCount = new Map<string, number>();
  MATH_TYPES.forEach((t) => typeCount.set(t, 0));
  (['easy', 'medium', 'hard'] as CaseDifficulty[]).forEach((d) => diffCount.set(d, 0));
  history.forEach((h) => {
    const t = String(h.case_type || '');
    const d = String(h.difficulty || '');
    if (typeCount.has(t)) typeCount.set(t, (typeCount.get(t) || 0) + 1);
    if (diffCount.has(d)) diffCount.set(d, (diffCount.get(d) || 0) + 1);
  });
  const maxType = Math.max(1, ...Array.from(typeCount.values()));
  const maxDiff = Math.max(1, ...Array.from(diffCount.values()));

  const scored = source
    .map((p) => ({
      problem: p,
      // Higher score = practised less = suggest first. Type weighs double difficulty.
      score: (1 - (typeCount.get(p.type) || 0) / maxType) * 2 + (1 - (diffCount.get(p.difficulty) || 0) / maxDiff),
    }))
    .sort((a, b) => b.score - a.score);

  const picks: CaseMathProblem[] = [];
  const seenTypes = new Set<string>();
  scored.forEach((entry) => {
    if (picks.length >= count || seenTypes.has(entry.problem.type)) return;
    seenTypes.add(entry.problem.type);
    picks.push(entry.problem);
  });
  scored.forEach((entry) => {
    if (picks.length < count && !picks.includes(entry.problem)) picks.push(entry.problem);
  });
  return picks.slice(0, count);
}

export function mathRecommendationReason(history: PracticeRecord[], problem: CaseMathProblem): string {
  if (history.length === 0) return 'A balanced starter set — begin here';
  const sameType = history.filter((h) => h.case_type === problem.type).length;
  const sameDiff = history.filter((h) => h.difficulty === problem.difficulty).length;
  if (sameType === 0) return `You haven’t practised ${MATH_TYPE_LABELS[problem.type] || problem.type} yet`;
  if (sameDiff === 0) return `You haven’t tried ${problem.difficulty === 'easy' ? 'Easy' : problem.difficulty === 'medium' ? 'Medium' : 'Hard'} yet`;
  return `You’ve only practised ${MATH_TYPE_LABELS[problem.type] || problem.type} ${sameType} time${sameType === 1 ? '' : 's'}`;
}
