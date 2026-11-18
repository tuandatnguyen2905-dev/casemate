/**
 * Spec types and authoring helpers for the Market Sizing worked models
 * (marketSizingWorkedCycle3.ts, marketSizingWorkedBank.ts). Values reproduce each
 * source case's own worked calculation; `stated` holds the source's published result
 * and range so the audit can prove the engine reproduces them.
 */

export type MsOperator = '×' | '÷' | '+' | '−' | 'min';
export type MsTerm = string | { c: number; label: string };

export interface MsFactorSpec {
  k: string;
  label: string;
  v: number;
  unit: string;
  pct?: boolean;
  src: 'given' | 'assumption';
  why: string;
  kw: string[];
  not?: string[];
}

export interface MsStepSpec {
  k: string;
  label: string;
  unit: string;
  expr: [MsTerm, ...Array<[MsOperator, MsTerm]>];
}

export interface MsSanityCalc {
  a: string;
  b: string;
  as?: 'pct';
  unit?: string;
}

export interface MsModelSpec {
  id: string;
  format: 'provided-data' | 'ambiguous-estimation';
  definition: { counts: string; excludes: string; geography: string; period: string; measure: string };
  formula: string;
  segments?: string[];
  factors: MsFactorSpec[];
  steps: MsStepSpec[];
  stated?: { final: number; low?: number; high?: number; tolerance?: number };
  sens?: { k: string; low: number; high: number; note?: string };
  sanity?: Array<string | { text: string; calc: MsSanityCalc[] }>;
  mistake?: string;
  alternatives?: string[];
  repair?: string;
}

export type Extra = { not?: string[] };
export const g = (k: string, label: string, v: number, unit: string, why: string, kw: string[], extra: Extra = {}): MsFactorSpec => ({ k, label, v, unit, src: 'given', why, kw, ...extra });
export const gp = (k: string, label: string, v: number, why: string, kw: string[], extra: Extra = {}): MsFactorSpec => ({ k, label, v, unit: '', pct: true, src: 'given', why, kw, ...extra });
export const a = (k: string, label: string, v: number, unit: string, why: string, kw: string[], extra: Extra = {}): MsFactorSpec => ({ k, label, v, unit, src: 'assumption', why, kw, ...extra });
export const ap = (k: string, label: string, v: number, why: string, kw: string[], extra: Extra = {}): MsFactorSpec => ({ k, label, v, unit: '', pct: true, src: 'assumption', why, kw, ...extra });
export const s = (k: string, label: string, unit: string, ...expr: MsStepSpec['expr']): MsStepSpec => ({ k, label, unit, expr });

export const MONTHS: MsTerm = { c: 12, label: '12 months/year' };
export const DAYS: MsTerm = { c: 365, label: '365 days/year' };
export const ALL: MsTerm = { c: 1, label: '100%' };
export const B = 1e9;
export const T = 1e12;

export const YEAR = 'One year';
export const VALUE_VND = 'Value (VND per year)';

export const NOT_URBAN = ['non-urban', 'non urban', 'nonurban', 'rural'];
