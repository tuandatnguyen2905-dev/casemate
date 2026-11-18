import type { UnitId } from './types';

export type FormulaErrorCode =
  | 'UNKNOWN_FORMULA'
  | 'MISSING_INPUT'
  | 'INVALID_INPUT'
  | 'DIVISION_BY_ZERO'
  | 'OUT_OF_RANGE'
  | 'INVALID_COMBINATION'
  | 'NO_SOLUTION'
  | 'UNDEFINED_RESULT';

export type FormulaResult =
  | { ok: true; value: number }
  | { ok: false; error: FormulaErrorCode; message: string; variable?: string };

export interface VariableSpec {
  id: string;
  label: string;
  unit: UnitId;
  min?: number;
  max?: number;
  /** Why the range is valid (definition, physical limit or reporting convention). */
  rangeNote: string;
  /** A zero value makes the formula divide by zero. */
  denominator?: boolean;
  /** Plain-language explanation of what the variable is and where to find it. */
  meaning?: string;
}

export interface FormulaConstraint {
  message: string;
  code: 'INVALID_COMBINATION' | 'DIVISION_BY_ZERO' | 'NO_SOLUTION';
  holds: (v: Record<string, number>) => boolean;
}

/**
 * Unit rules checked by the test suite:
 * share — every variable has the same unit; output is percent or times.
 * change — two same-unit variables; output is percent.
 * rate — output unit is numerator per denominator; numeratorVars/denominatorVars must match.
 * days — stock and flow share a unit; output is days.
 * additive — every variable already has the output unit.
 * product-of-percents — every variable and the output are percent.
 * custom — mixed units; unitNote must explain the dimensional result.
 */
export type UnitRule = 'share' | 'change' | 'rate' | 'days' | 'additive' | 'product-of-percents' | 'custom';

export type KernelId = 'ratio' | 'percent-change' | 'margin' | 'stock-days' | 'sum' | 'product' | 'cagr' | 'npv' | 'irr';

export interface FormulaSpec {
  id: string;
  expression: string;
  kernel: KernelId;
  variables: VariableSpec[];
  outputUnit: UnitId;
  unitRule: UnitRule;
  numeratorVars?: string[];
  denominatorVars?: string[];
  unitNote?: string;
  constraints?: FormulaConstraint[];
  compute: (v: Record<string, number>) => number;
}

export class FormulaComputationError extends Error {
  constructor(public code: FormulaErrorCode, message: string) {
    super(message);
  }
}

// Shared kernels: every formula in the registry is built from these, so each arithmetic
// relationship is written once and reused across industries.
export const kernels = {
  ratio: (numerator: number, denominator: number): number => numerator / denominator,
  percentChange: (current: number, prior: number): number => (current - prior) / prior,
  margin: (revenue: number, cost: number): number => (revenue - cost) / revenue,
  stockDays: (stock: number, flow: number, daysInPeriod = 365): number => (stock / flow) * daysInPeriod,
  sum: (...terms: number[]): number => terms.reduce((acc, term) => acc + term, 0),
  product: (...factors: number[]): number => factors.reduce((acc, factor) => acc * factor, 1),
  cagr: (ending: number, beginning: number, years: number): number => Math.pow(ending / beginning, 1 / years) - 1,
  npv: (rate: number, cashFlows: number[]): number =>
    cashFlows.reduce((acc, cashFlow, period) => acc + cashFlow / Math.pow(1 + rate, period), 0),
  irr: (cashFlows: number[]): number => {
    const hasOutflow = cashFlows.some((cf) => cf < 0);
    const hasInflow = cashFlows.some((cf) => cf > 0);
    if (!hasOutflow || !hasInflow) {
      throw new FormulaComputationError('NO_SOLUTION', 'IRR needs at least one negative and one positive cash flow.');
    }
    let low = -0.99;
    let high = 10;
    let npvLow = kernels.npv(low, cashFlows);
    const npvHigh = kernels.npv(high, cashFlows);
    if (npvLow * npvHigh > 0) {
      throw new FormulaComputationError('NO_SOLUTION', 'No IRR between -99% and 1,000%: NPV does not change sign.');
    }
    for (let i = 0; i < 200; i += 1) {
      const mid = (low + high) / 2;
      const npvMid = kernels.npv(mid, cashFlows);
      if (Math.abs(npvMid) < 1e-10) return mid;
      if (npvLow * npvMid < 0) {
        high = mid;
      } else {
        low = mid;
        npvLow = npvMid;
      }
    }
    return (low + high) / 2;
  },
};

export function evaluateSpec(spec: FormulaSpec, inputs: Record<string, unknown> | null | undefined): FormulaResult {
  const source = inputs ?? {};
  const values: Record<string, number> = {};
  for (const variable of spec.variables) {
    if (!(variable.id in source) || source[variable.id] === undefined || source[variable.id] === null || source[variable.id] === '') {
      return { ok: false, error: 'MISSING_INPUT', message: `${variable.label} is required.`, variable: variable.id };
    }
    const raw = source[variable.id];
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      return { ok: false, error: 'INVALID_INPUT', message: `${variable.label} must be a finite number.`, variable: variable.id };
    }
    values[variable.id] = raw;
  }
  for (const variable of spec.variables) {
    if (variable.denominator && values[variable.id] === 0) {
      return { ok: false, error: 'DIVISION_BY_ZERO', message: `${variable.label} cannot be zero because the formula divides by it.`, variable: variable.id };
    }
  }
  for (const variable of spec.variables) {
    const value = values[variable.id];
    if ((variable.min !== undefined && value < variable.min) || (variable.max !== undefined && value > variable.max)) {
      return { ok: false, error: 'OUT_OF_RANGE', message: `${variable.label} is outside the valid range. ${variable.rangeNote}`, variable: variable.id };
    }
  }
  for (const constraint of spec.constraints ?? []) {
    if (!constraint.holds(values)) return { ok: false, error: constraint.code, message: constraint.message };
  }
  let value: number;
  try {
    value = spec.compute(values);
  } catch (error) {
    if (error instanceof FormulaComputationError) return { ok: false, error: error.code, message: error.message };
    return { ok: false, error: 'UNDEFINED_RESULT', message: 'The formula could not be evaluated for these inputs.' };
  }
  if (!Number.isFinite(value)) {
    return { ok: false, error: 'UNDEFINED_RESULT', message: 'The result is not a finite number for these inputs.' };
  }
  return { ok: true, value };
}
