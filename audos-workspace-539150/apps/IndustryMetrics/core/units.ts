import type { UnitId } from './types';

export interface UnitSpec {
  id: UnitId;
  label: string;
  /** Compound units record the base units they divide, used by unit-consistency checks. */
  per?: { numerator: UnitId; denominator: UnitId };
}

export const UNITS: Record<UnitId, UnitSpec> = {
  currency: { id: 'currency', label: 'Currency units (CU, hypothetical)' },
  percent: { id: 'percent', label: 'Percent (%)' },
  times: { id: 'times', label: 'Times (×)' },
  days: { id: 'days', label: 'Days' },
  count: { id: 'count', label: 'Count' },
  units: { id: 'units', label: 'Physical units' },
  hours: { id: 'hours', label: 'Hours' },
  minutes: { id: 'minutes', label: 'Minutes' },
  hectares: { id: 'hectares', label: 'Hectares (ha)' },
  tonnes: { id: 'tonnes', label: 'Tonnes (t)' },
  sqm: { id: 'sqm', label: 'Square metres (m²)' },
  years: { id: 'years', label: 'Years' },
  'currency-per-unit': { id: 'currency-per-unit', label: 'CU per unit', per: { numerator: 'currency', denominator: 'units' } },
  'currency-per-sqm': { id: 'currency-per-sqm', label: 'CU per m²', per: { numerator: 'currency', denominator: 'sqm' } },
  'currency-per-hectare': { id: 'currency-per-hectare', label: 'CU per ha', per: { numerator: 'currency', denominator: 'hectares' } },
  'currency-per-tonne': { id: 'currency-per-tonne', label: 'CU per tonne', per: { numerator: 'currency', denominator: 'tonnes' } },
  'currency-per-room': { id: 'currency-per-room', label: 'CU per room night', per: { numerator: 'currency', denominator: 'count' } },
  'currency-per-order': { id: 'currency-per-order', label: 'CU per order or transaction', per: { numerator: 'currency', denominator: 'count' } },
  'currency-per-customer': { id: 'currency-per-customer', label: 'CU per customer or user', per: { numerator: 'currency', denominator: 'count' } },
  'currency-per-hour': { id: 'currency-per-hour', label: 'CU per hour', per: { numerator: 'currency', denominator: 'hours' } },
  'currency-per-fte': { id: 'currency-per-fte', label: 'CU per full-time equivalent', per: { numerator: 'currency', denominator: 'count' } },
  'tonnes-per-hectare': { id: 'tonnes-per-hectare', label: 'Tonnes per ha', per: { numerator: 'tonnes', denominator: 'hectares' } },
  'units-per-hour': { id: 'units-per-hour', label: 'Units per hour', per: { numerator: 'units', denominator: 'hours' } },
  'units-per-order': { id: 'units-per-order', label: 'Units per transaction', per: { numerator: 'units', denominator: 'count' } },
  'currency-per-thousand': { id: 'currency-per-thousand', label: 'CU per 1,000 impressions' },
  'currency-per-seat-hour': { id: 'currency-per-seat-hour', label: 'CU per available seat-hour' },
  'currency-per-engagement': { id: 'currency-per-engagement', label: 'CU per engagement', per: { numerator: 'currency', denominator: 'count' } },
  months: { id: 'months', label: 'Months' },
  kg: { id: 'kg', label: 'Kilograms (kg)' },
  'kg-per-day': { id: 'kg-per-day', label: 'kg per day', per: { numerator: 'kg', denominator: 'days' } },
};

function trimNumber(value: number, digits: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: digits });
}

export function formatValue(value: number, unit: UnitId): string {
  if (!Number.isFinite(value)) return '—';
  switch (unit) {
    case 'percent':
      return `${trimNumber(value * 100, 2)}%`;
    case 'times':
      return `${trimNumber(value, 2)}×`;
    case 'days':
      return `${trimNumber(value, 1)} days`;
    case 'years':
      return `${trimNumber(value, 2)} years`;
    case 'hours':
      return `${trimNumber(value, 2)} h`;
    case 'minutes':
      return `${trimNumber(value, 1)} min`;
    case 'currency':
      return `${trimNumber(value, 2)} CU`;
    default: {
      const spec = UNITS[unit];
      return `${trimNumber(value, 2)} ${spec.per ? spec.label : spec.label.toLowerCase()}`;
    }
  }
}
