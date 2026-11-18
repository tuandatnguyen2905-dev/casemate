/*
 * Worked answers for the Charts Easy cases in Case Pool.
 *
 * Case Drill asks each Charts Easy question as a four-option item. Case Pool asks
 * the same question as an open task, so its worked answer is computed here from the
 * case's own exhibit data: the calculation for every item in the exhibit, the
 * ranking, and what the exhibit cannot prove. It is shown only after submission
 * and is also the grader's reference. It never repeats the Case Drill options,
 * the keyed option letter, a distractor or an explanation of a wrong choice.
 *
 * No imports: this module only reads plain exhibit data, so it can be tested on
 * its own and cannot create an import cycle with the bank.
 */

export interface PoolAnswerSeries {
  name: string;
  values: number[];
  xValues?: number[];
  unit?: string;
}

export interface PoolAnswerExhibit {
  title: string;
  unit: string;
  categories?: string[];
  series?: PoolAnswerSeries[];
}

export interface PoolAnswerSource {
  code: string;
  chart: string;
  question: string;
  key: string;
  why: string;
  exhibits: PoolAnswerExhibit[];
}

export interface PoolWorkedAnswer {
  situation_analysis: string;
  framework_applied: string;
  key_calculations: string[];
  key_findings: string[];
  recommendation: string;
}

const trim = (value: number, digits = 2): string => String(Number(value.toFixed(digits)));
const signed = (value: number, digits = 0): string => `${value > 0 ? '+' : value < 0 ? '-' : ''}${Math.abs(value).toFixed(digits)}`;
const withCommas = (value: number): string => value.toLocaleString('en-US');
const indexOfMax = (values: number[]): number => values.indexOf(Math.max(...values));
const indexOfMin = (values: number[]): number => values.indexOf(Math.min(...values));

interface Reading {
  situation: string;
  approach: string;
}

const READING: Record<string, Reading> = {
  line: {
    situation: 'The exhibit tracks one measure over four quarters. The answer needs the change between the first and last quarter, and a view of what those two points hide.',
    approach: 'Subtract the first quarter from the last, divide by the first-quarter base, then read the quarters in between before trusting the endpoints.',
  },
  'grouped bars': {
    situation: 'The exhibits give each business line or channel two measures that only answer the question when they are combined.',
    approach: 'Combine the two measures for every item, rank the results, then say what the exhibits leave unproven.',
  },
  waterfall: {
    situation: 'The first and last bars are totals; every bar between them is one driver that moves the total.',
    approach: 'Add the drivers to the start value to reach the ending total, then compare the size of the negative drivers.',
  },
  scatter: {
    situation: 'Each point is one option placed by two measures. A minimum on one measure decides which options may be considered at all.',
    approach: 'Apply the minimum first, then compare the second measure among the options that remain.',
  },
  heatmap: {
    situation: 'Each cell is one region-and-month score. The question asks for a single cell, but a single cell is not yet a pattern.',
    approach: 'Read every cell, find the maximum, then test whether that region scores well in the other months too.',
  },
  bullet: {
    situation: 'Each site has an actual value and its own target, so absolute gaps are measured against different bases.',
    approach: 'Express each shortfall as a percentage of that site’s own target, then compare the percentages.',
  },
  slopegraph: {
    situation: 'Each line joins a region’s share at the start to its share at the end. The slope shows share, not volume.',
    approach: 'Subtract the start share from the end share for every region, then say what a share change does and does not prove.',
  },
  area: {
    situation: 'The exhibit shows demand month by month. When capacity or allocation is fixed, the spread of the series matters more than one month or the average.',
    approach: 'Find the highest and lowest months and take the difference.',
  },
  funnel: {
    situation: 'Each stage is a share of the stage above it, so the final count is the product of the stage conversion rates.',
    approach: 'Work out the conversion rate at every stage, then see which stage loses the most.',
  },
  donut: {
    situation: 'The slices are shares of one total and add to 100%. The question is about how concentrated that total is.',
    approach: 'Rank the slices, add the two largest, then say what that concentration means for risk.',
  },
  'combo bars and line': {
    situation: 'Bars and line measure different things on different axes. Sales value needs both together.',
    approach: 'Multiply volume by average order value for every quarter, convert to the stated unit, then compare the quarters.',
  },
};

function limitOfEvidence(why: string): string[] {
  const match = /Limit of this evidence:\s*([\s\S]+)$/.exec(why);
  return match ? [`Limit of this evidence: ${match[1].trim()}`] : [];
}

function lineAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const values = exhibit.series?.[0]?.values || [];
  if (values.length < 3 || categories.length !== values.length) return null;
  const first = values[0];
  const last = values[values.length - 1];
  const diff = last - first;
  const percent = (diff / first) * 100;
  const peak = indexOfMax(values);
  return {
    calculations: [
      `${categories[categories.length - 1]} - ${categories[0]} = ${last} - ${first} = ${signed(diff)} ${exhibit.unit}`,
      `${signed(diff)} ÷ ${first} (the ${categories[0]} base) = ${signed(percent, 1)}%`,
    ],
    findings: [
      `The quarters in between read ${categories.map((category, index) => `${category} ${values[index]}`).join(', ')}, so the ${categories[0]}-to-${categories[categories.length - 1]} change alone hides the high point at ${categories[peak]} (${values[peak]}).`,
      'An endpoint-only conclusion needs a caveat: check the intervening periods before extrapolating the trend.',
    ],
  };
}

function grossProfitAnswer(revenue: PoolAnswerExhibit, margin: PoolAnswerExhibit, why: string): { calculations: string[]; findings: string[] } | null {
  const categories = revenue.categories || [];
  const revenueValues = revenue.series?.[0]?.values || [];
  const marginValues = margin.series?.[0]?.values || [];
  if (categories.length < 2 || revenueValues.length !== categories.length || marginValues.length !== categories.length) return null;
  const profit = revenueValues.map((value, index) => (value * marginValues[index]) / 100);
  const ranked = categories.map((category, index) => ({ category, profit: profit[index] })).sort((a, b) => b.profit - a.profit);
  const top = indexOfMax(profit);
  const topRevenue = indexOfMax(revenueValues);
  const topMargin = indexOfMax(marginValues);
  const comparison = topRevenue !== top || topMargin !== top
    ? `${categories[topRevenue]} has the highest revenue (${revenueValues[topRevenue]}) and ${categories[topMargin]} has the highest margin (${marginValues[topMargin]}%), so neither revenue alone nor margin alone ranks the lines; only revenue × margin does.`
    : `${categories[top]} leads on revenue, on margin and on gross profit, so every comparison points the same way.`;
  return {
    calculations: categories.map((category, index) => `${category}: ${revenueValues[index]} × ${marginValues[index]}% = ${profit[index].toFixed(2)} ${revenue.unit}`),
    findings: [
      `Ranked by gross profit: ${ranked.map((entry) => `${entry.category} ${entry.profit.toFixed(2)}`).join(' > ')} ${revenue.unit}.`,
      comparison,
      'Compare absolute gross-profit contribution, not margin alone.',
      ...limitOfEvidence(why),
    ],
  };
}

function channelShareAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const [before, after] = exhibit.series || [];
  if (!before || !after || before.values.length !== categories.length || after.values.length !== categories.length) return null;
  const change = categories.map((_, index) => after.values[index] - before.values[index]);
  const biggest = change.reduce((best, value, index) => (Math.abs(value) > Math.abs(change[best]) ? index : best), 0);
  const total = (values: number[]) => values.reduce((sum, value) => sum + value, 0);
  return {
    calculations: [
      ...categories.map((category, index) => `${category}: ${after.values[index]} - ${before.values[index]} = ${signed(change[index])} pp`),
      `Check: the shares total ${total(before.values)}% in ${before.name} and ${total(after.values)}% in ${after.name}.`,
    ],
    findings: [
      `${categories[biggest]} moved most, by ${signed(change[biggest])} pp.`,
      'These are changes in share measured in percentage points (pp), not relative growth in the channel.',
      'A share shift does not show whether a channel is more or less profitable, so test segment economics before reallocating.',
    ],
  };
}

function waterfallAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const values = exhibit.series?.[0]?.values || [];
  if (values.length < 4 || categories.length !== values.length) return null;
  const start = values[0];
  const end = values[values.length - 1];
  const drivers = values.slice(1, -1).map((value, index) => ({ label: categories[index + 1], value }));
  const total = drivers.reduce((sum, driver) => sum + driver.value, start);
  const negatives = drivers.filter((driver) => driver.value < 0).sort((a, b) => a.value - b.value);
  const terms = drivers.map((driver) => `${driver.value >= 0 ? '+' : '-'} ${Math.abs(driver.value)}`).join(' ');
  return {
    calculations: [
      `${categories[0]} ${start} ${terms} = ${trim(total)} ${exhibit.unit}${total === end ? ` (this equals the ${categories[categories.length - 1]} bar)` : ''}`,
      ...(negatives.length ? [`Negative drivers by size: ${negatives.map((driver) => `${driver.label} ${driver.value}`).join(', ')} ${exhibit.unit}.`] : []),
    ],
    findings: [
      negatives.length
        ? `The largest adverse driver is ${negatives[0].label} (${negatives[0].value} ${exhibit.unit}).`
        : 'No driver is negative, so there is no adverse driver to rank.',
      'Compare the size of the negative steps, not where they sit on the chart.',
      `The ${categories[0]} and ${categories[categories.length - 1]} bars are totals; the steps between them explain the movement.`,
    ],
  };
}

function scatterAnswer(exhibit: PoolAnswerExhibit, question: string): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const series = exhibit.series?.[0];
  if (!series || !series.xValues || series.xValues.length !== categories.length || series.values.length !== categories.length) return null;
  const minimum = Number(/minimum demand index of (\d+(?:\.\d+)?)/i.exec(question)?.[1]);
  const points = categories.map((label, index) => ({ label, demand: series.xValues![index], contribution: series.values[index] }));
  const describe = (point: { label: string; demand: number; contribution: number }) => `${point.label} (demand ${point.demand}, contribution ${point.contribution})`;
  const eligible = Number.isFinite(minimum) ? points.filter((point) => point.demand >= minimum) : points;
  const excluded = points.filter((point) => !eligible.includes(point));
  if (!eligible.length) return null;
  const best = eligible.reduce((top, point) => (point.contribution > top.contribution ? point : top), eligible[0]);
  return {
    calculations: [
      Number.isFinite(minimum) ? `Demand index of at least ${minimum}: ${eligible.map(describe).join('; ')}` : `All points: ${eligible.map(describe).join('; ')}`,
      ...(excluded.length ? [`Below the minimum, so set aside: ${excluded.map(describe).join('; ')}`] : []),
      `Highest contribution among the points that remain: ${best.label} at ${best.contribution} ${exhibit.unit}.`,
    ],
    findings: [
      'Apply the demand minimum first, then compare contribution; a point below the minimum is out however high its contribution.',
      'The scatter shows demand and contribution only. It does not establish scalable unit economics, so test the cost of scaling before committing.',
    ],
  };
}

function heatmapAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const regions = exhibit.categories || [];
  const months = exhibit.series || [];
  if (!regions.length || !months.length || months.some((month) => month.values.length !== regions.length)) return null;
  let best = { region: 0, month: 0, value: -Infinity };
  months.forEach((month, monthIndex) => month.values.forEach((value, regionIndex) => {
    if (value > best.value) best = { region: regionIndex, month: monthIndex, value };
  }));
  const rowOf = (regionIndex: number) => months.map((month) => `${month.name} ${month.values[regionIndex]}`).join(', ');
  const others = months.filter((_, index) => index !== best.month).map((month) => `${month.name} ${month.values[best.region]}`).join(', ');
  return {
    calculations: [
      ...regions.map((region, index) => `${region}: ${rowOf(index)}`),
      `Highest single cell: ${regions[best.region]}, ${months[best.month].name} = ${best.value} ${exhibit.unit}.`,
    ],
    findings: [
      `A single peak is not a pattern: ${regions[best.region]} scores ${others} in the other months, so check repeatability across months before concluding that it is sustaining the result.`,
      'Read all the cells rather than a row total or a regional average; the question asks for one cell.',
    ],
  };
}

function bulletAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const sites = exhibit.categories || [];
  const [actual, target] = exhibit.series || [];
  if (!actual || !target || actual.values.length !== sites.length || target.values.length !== sites.length) return null;
  const shortfall = sites.map((_, index) => ((target.values[index] - actual.values[index]) / target.values[index]) * 100);
  const worst = indexOfMax(shortfall);
  return {
    calculations: sites.map((site, index) => (shortfall[index] > 0
      ? `${site}: (${target.values[index]} - ${actual.values[index]}) ÷ ${target.values[index]} = ${shortfall[index].toFixed(1)}% below target`
      : `${site}: ${actual.values[index]} against a target of ${target.values[index]} is on or above target`)),
    findings: [
      `The largest percentage shortfall is ${sites[worst]}, at ${shortfall[worst].toFixed(1)}% below its own target.`,
      'Each shortfall is measured against that site’s own target, so a larger absolute gap is not automatically a larger percentage shortfall.',
      'Inspect the driver of the largest gap first.',
    ],
  };
}

function slopeAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const series = (exhibit.series || []).filter((entry) => entry.values.length === 2);
  if (series.length < 2) return null;
  const change = series.map((entry) => entry.values[1] - entry.values[0]);
  const best = indexOfMax(change);
  return {
    calculations: series.map((entry, index) => `${entry.name}: ${entry.values[1]}% - ${entry.values[0]}% = ${signed(change[index])} pp`),
    findings: [
      `${series[best].name} gained the most share, ${signed(change[best])} pp.`,
      'The slope shows each region’s share of the total, not its volume: a rising share does not prove absolute volume growth, and percentage points are not percentage growth.',
    ],
  };
}

function areaAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const values = exhibit.series?.[0]?.values || [];
  if (values.length < 3 || categories.length !== values.length) return null;
  const high = indexOfMax(values);
  const low = indexOfMin(values);
  return {
    calculations: [`Peak ${values[high]} (${categories[high]}) - trough ${values[low]} (${categories[low]}) = ${values[high] - values[low]} ${exhibit.unit}`],
    findings: [
      'One month’s figure or the average hides the swing in demand.',
      `The range from ${values[low]} to ${values[high]} matters when capacity or allocation is fixed: planning to the average leaves a shortfall at the peak and idle capacity at the trough.`,
    ],
  };
}

function funnelAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const stages = exhibit.categories || [];
  const values = exhibit.series?.[0]?.values || [];
  if (values.length < 3 || stages.length !== values.length) return null;
  const rates = values.slice(1).map((value, index) => (value / values[index]) * 100);
  const weakest = indexOfMin(rates);
  const last = values.length - 1;
  return {
    calculations: [
      ...rates.map((rate, index) => `${stages[index + 1]} ÷ ${stages[index]} = ${withCommas(values[index + 1])} ÷ ${withCommas(values[index])} = ${Math.round(rate)}%`),
      `${stages[last]}: ${withCommas(values[last])} of ${withCommas(values[0])} ${stages[0].toLowerCase()} (${((values[last] / values[0]) * 100).toFixed(1)}%)`,
    ],
    findings: [
      `Conversion compounds stage by stage. The weakest step is the ${stages[weakest + 1]} stage (${Math.round(rates[weakest])}% convert), so inspect the losses there first.`,
      'Each stage is a share of the stage above it, not of everything reached.',
    ],
  };
}

function donutAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const values = exhibit.series?.[0]?.values || [];
  if (values.length < 3 || categories.length !== values.length) return null;
  const ranked = categories.map((category, index) => ({ category, value: values[index] })).sort((a, b) => b.value - a.value);
  const total = values.reduce((sum, value) => sum + value, 0);
  const topTwo = ranked[0].value + ranked[1].value;
  return {
    calculations: [
      `Two largest slices: ${ranked[0].category} ${ranked[0].value}% + ${ranked[1].category} ${ranked[1].value}% = ${topTwo}%`,
      `Check: the slices total ${total}%.`,
    ],
    findings: [
      'Rank the slice shares first, then add the two largest.',
      `Concentration risk: ${topTwo}% of the total rests on two slices, so test how dependent the result is on those leaders.`,
    ],
  };
}

function comboAnswer(exhibit: PoolAnswerExhibit): { calculations: string[]; findings: string[] } | null {
  const categories = exhibit.categories || [];
  const [volume, order] = exhibit.series || [];
  if (!volume || !order || volume.values.length !== categories.length || order.values.length !== categories.length) return null;
  const sales = categories.map((_, index) => (volume.values[index] * order.values[index]) / 1000);
  const best = indexOfMax(sales);
  const topVolume = indexOfMax(volume.values);
  const topOrder = indexOfMax(order.values);
  return {
    calculations: [
      'Multiply order volume (thousands) by average order value (thousand VND), then divide by 1,000 for VND billion.',
      ...categories.map((category, index) => `${category}: ${volume.values[index]} thousand × ${order.values[index]} thousand VND = ${sales[index].toFixed(2)} billion VND`),
    ],
    findings: [
      topVolume === best && topOrder === best
        ? `${categories[best]} leads on volume, on average order value and on sales value.`
        : `${categories[topVolume]} has the highest volume and ${categories[topOrder]} the highest average order value, but sales value needs both together: ${categories[best]} ranks first once they are multiplied.`,
      'Volume alone, or order value alone, can point to the wrong quarter.',
    ],
  };
}

export function chartsEasyPoolAnswer(record: PoolAnswerSource): PoolWorkedAnswer {
  const exhibits = record.exhibits || [];
  const first = exhibits[0];
  let computed: { calculations: string[]; findings: string[] } | null = null;
  if (first) {
    switch (record.chart) {
      case 'line': computed = lineAnswer(first); break;
      case 'grouped bars': computed = exhibits.length >= 2 ? grossProfitAnswer(first, exhibits[1], record.why) : channelShareAnswer(first); break;
      case 'waterfall': computed = waterfallAnswer(first); break;
      case 'scatter': computed = scatterAnswer(first, record.question); break;
      case 'heatmap': computed = heatmapAnswer(first); break;
      case 'bullet': computed = bulletAnswer(first); break;
      case 'slopegraph': computed = slopeAnswer(first); break;
      case 'area': computed = areaAnswer(first); break;
      case 'funnel': computed = funnelAnswer(first); break;
      case 'donut': computed = donutAnswer(first); break;
      case 'combo bars and line': computed = comboAnswer(first); break;
      default: computed = null;
    }
  }
  const reading = READING[record.chart] || {
    situation: 'The answer comes from reading the exhibit, calculating the requested figure for every item, and then comparing them.',
    approach: 'Calculate the requested figure for each item before comparing.',
  };
  return {
    situation_analysis: reading.situation,
    framework_applied: reading.approach,
    key_calculations: computed?.calculations || [],
    key_findings: computed?.findings || [`Conclusion: ${record.key}`],
    recommendation: record.key,
  };
}
