import { useMemo, useRef, useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { tw } from '../lib/colors';
import FormattedNumberInput from './FormattedNumberInput';
import { formatNumberDisplay, formatNumbersInText, formatNumericEntry } from '../lib/numberDisplay';
import { numericUnitSpec, parseNumericQuantity } from '../lib/numericUnits';
import { clarifyUnitLabel, clarifyUnitText } from '../lib/unitLabels';
import { equivalentScaleHint } from '../lib/calculationAnswerModel';
import {
  StructureTreeEditor,
  normalizeOrders,
  treeActionButtonClass,
  treeUid,
  type TreeNode,
} from './StructureTree';

export type MarketSizingOperator = '×' | '+' | '−' | '÷';
export type MarketSizingValueUnit = 'number' | 'percent';

export type MarketSizingIssueNode = TreeNode;

const ISSUE_TREE_ROOT_PREFIX = 'root-';
const ISSUE_TREE_PLACEHOLDER = 'New branch';

export interface MarketSizingComponentValue {
  id: string;
  label: string;
  value: string;
  unit: MarketSizingValueUnit;
  operator: MarketSizingOperator;
}

export interface MarketSizingAnswerDraft {
  schemaVersion: 2;
  issueTree: MarketSizingIssueNode[];
  components: MarketSizingComponentValue[];
  manualResult: string;
}

const ATTEMPT_PREFIX = 'CASEMATE_MARKET_SIZING_V2\n';

function uid(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createInitialMarketSizingDraft(): MarketSizingAnswerDraft {
  return {
    schemaVersion: 2,
    issueTree: [],
    components: [
      { id: uid('component'), label: '', value: '', unit: 'number', operator: '×' },
      { id: uid('component'), label: '', value: '', unit: 'number', operator: '×' },
      { id: uid('component'), label: '', value: '', unit: 'number', operator: '×' },
    ],
    manualResult: '',
  };
}

export function normalizeMarketSizingDraft(
  value: unknown,
  legacyComponents?: Array<Record<string, unknown>>,
  legacyManualResult?: string,
): MarketSizingAnswerDraft {
  const source = value && typeof value === 'object' ? value as Record<string, any> : {};
  const rawComponents = Array.isArray(source.components)
    ? source.components
    : Array.isArray(legacyComponents)
      ? legacyComponents
      : [];
  const components = rawComponents.map((item: Record<string, any>, index: number) => ({
    id: String(item?.id || uid(`component-${index + 1}`)),
    label: String(item?.label || ''),
    value: String(item?.value || ''),
    unit: item?.unit === 'percent' || item?.valueUnit === 'percent' ? 'percent' as const : 'number' as const,
    operator: ['×', '+', '−', '÷'].includes(String(item?.operator)) ? item.operator as MarketSizingOperator : '×' as const,
  }));
  const rawTree = Array.isArray(source.issueTree) ? source.issueTree.filter((item: unknown) => item && typeof item === 'object') : [];
  const issueTree = normalizeOrders(rawTree.map((item: Record<string, any>, index: number) => ({
    id: String(item.id || uid('determinant')),
    parentId: item.parentId == null ? null : String(item.parentId),
    text: String(item.text || item.label || '').trim() || ISSUE_TREE_PLACEHOLDER,
    order: Number.isFinite(Number(item.order)) && item.order != null ? Number(item.order) : index,
  })));
  return {
    schemaVersion: 2,
    issueTree,
    components: components.length ? components : createInitialMarketSizingDraft().components,
    manualResult: String(source.manualResult ?? legacyManualResult ?? ''),
  };
}

export function ensureMarketSizingIssueTreeRoot(nodes: MarketSizingIssueNode[], rootText: string): MarketSizingIssueNode[] {
  const known = new Set(nodes.map((node) => node.id));
  const roots = nodes.filter((node) => node.parentId === null || !known.has(node.parentId));
  if (roots.length === 1 && roots[0].id.startsWith(ISSUE_TREE_ROOT_PREFIX)) {
    return roots[0].parentId === null ? nodes : nodes.map((node) => node.id === roots[0].id ? { ...node, parentId: null } : node);
  }
  const baseId = `${ISSUE_TREE_ROOT_PREFIX}market-sizing`;
  const rootId = known.has(baseId) ? treeUid(ISSUE_TREE_ROOT_PREFIX.slice(0, -1)) : baseId;
  const rootIds = new Set(roots.map((node) => node.id));
  return normalizeOrders([
    { id: rootId, parentId: null, text: rootText.trim() || 'Market size', order: 0 },
    ...nodes.map((node) => rootIds.has(node.id) ? { ...node, parentId: rootId } : node),
  ]);
}

export function marketSizingIssueTreeBoxCount(nodes: MarketSizingIssueNode[]): number {
  return nodes.filter((node) => !node.id.startsWith(ISSUE_TREE_ROOT_PREFIX)).length;
}

export function parseMarketSizingValue(value: string, unit: MarketSizingValueUnit): { value: number | null; error: string } {
  const raw = String(value || '').trim();
  if (!raw) return { value: null, error: '' };
  const parsed = parseNumericQuantity(raw, unit === 'percent' ? 'Percent' : 'number');
  if (!parsed.ok || parsed.value === null) return { value: null, error: parsed.message || 'Enter a valid finite number.' };
  return { value: unit === 'percent' ? parsed.value / 100 : parsed.value, error: '' };
}

export function calculateMarketSizingResult(components: MarketSizingComponentValue[]): { result: number | null; errors: Record<string, string> } {
  const terms: Array<{ value: number; operator: MarketSizingOperator }> = [];
  const errors: Record<string, string> = {};
  components.forEach((component) => {
    const parsed = parseMarketSizingValue(component.value, component.unit);
    if (parsed.error) errors[component.id] = parsed.error;
    if (parsed.value !== null) terms.push({ value: parsed.value, operator: component.operator });
  });
  if (Object.keys(errors).length || terms.length === 0) return { result: null, errors };
  let total = 0;
  let current = terms[0].value;
  for (let index = 1; index < terms.length; index += 1) {
    const term = terms[index];
    if (term.operator === '×') current *= term.value;
    else if (term.operator === '÷') {
      if (term.value === 0) return { result: null, errors: { ...errors, calculation: 'A component used as a divisor cannot be zero.' } };
      current /= term.value;
    } else {
      total += current;
      current = term.operator === '+' ? term.value : -term.value;
    }
  }
  const result = total + current;
  return Number.isFinite(result)
    ? { result, errors }
    : { result: null, errors: { ...errors, calculation: 'These component values do not produce a finite result.' } };
}

export function formatMarketSizingResult(value: number): string {
  return formatNumberDisplay(value, 6);
}

const SCALE_WORD = /(?:trillion|billion|million|thousand|tỷ|triệu|nghìn)\s*/iu;

function marketSizingFinalValue(draft: Pick<MarketSizingAnswerDraft, 'components' | 'manualResult'>): number | null {
  const calculated = calculateMarketSizingResult(draft.components).result;
  return calculated ?? parseMarketSizingValue(draft.manualResult, 'number').value;
}

/**
 * Components are raw numbers, so a model result such as 162,000,000,000 is written in
 * base units. Beside a "billion VND per year" field it is labelled "VND per year"; the
 * same |value| >= scale rule is how parseNumericQuantity reads an appended suffix.
 */
export function marketSizingResultUnit(value: number | null, answerUnit?: string): string {
  const label = clarifyUnitLabel(answerUnit);
  const spec = numericUnitSpec(label);
  if (!label || value === null || spec.scale <= 1 || Math.abs(value) < spec.scale) return label;
  return label.replace(SCALE_WORD, '').trim() || label;
}

function displayNumberish(raw: string): string {
  const grouped = formatNumericEntry(raw);
  return grouped === raw ? formatNumbersInText(raw) : grouped;
}

export function marketSizingGradableText(draft: MarketSizingAnswerDraft, answerUnit?: string): string {
  const calculation = calculateMarketSizingResult(draft.components);
  const finalResult = calculation.result === null ? draft.manualResult.trim() : formatMarketSizingResult(calculation.result);
  const finalUnit = marketSizingResultUnit(marketSizingFinalValue(draft), answerUnit);
  const lines = draft.components
    .filter((component) => component.label.trim() || component.value.trim())
    .map((component, index) => {
      const shownValue = component.unit === 'percent' && component.value.trim() && !component.value.trim().endsWith('%')
        ? `${component.value.trim()}%`
        : component.value.trim() || '[empty]';
      return `${index ? `${component.operator} ` : ''}${component.label.trim() || `Component ${index + 1}`}: ${shownValue}`;
    });
  return [
    `Bottom-up components:\n${lines.length ? lines.join('\n') : '[empty]'}`,
    `Final estimate: ${finalResult || '[empty]'}${finalUnit ? ` ${finalUnit}` : ''}`,
  ].join('\n\n');
}

export function serializeMarketSizingAttempt(draft: MarketSizingAnswerDraft, answerUnit?: string): string {
  return `${ATTEMPT_PREFIX}${JSON.stringify({ ...draft, gradableAnswer: marketSizingGradableText(draft, answerUnit) })}`;
}

export function parseMarketSizingAttempt(value: string | null | undefined): MarketSizingAnswerDraft | null {
  const text = String(value || '');
  if (!text.startsWith(ATTEMPT_PREFIX)) return null;
  try {
    return normalizeMarketSizingDraft(JSON.parse(text.slice(ATTEMPT_PREFIX.length)));
  } catch {
    return null;
  }
}

export function marketSizingAttemptTextForDisplay(value: string | null | undefined): string {
  const text = String(value || '');
  if (!text.startsWith(ATTEMPT_PREFIX)) return text;
  try {
    const parsed = JSON.parse(text.slice(ATTEMPT_PREFIX.length));
    return formatNumbersInText(String(parsed?.gradableAnswer || marketSizingGradableText(normalizeMarketSizingDraft(parsed))));
  } catch {
    return text;
  }
}

export default function MarketSizingAnswerBuilder({
  value,
  onChange,
  answerUnit,
  disabled,
  rootText = '',
}: {
  value: MarketSizingAnswerDraft;
  onChange: (value: MarketSizingAnswerDraft) => void;
  answerUnit?: string;
  disabled?: boolean;
  rootText?: string;
}) {
  const componentsRef = useRef<HTMLDivElement>(null);
  const [confirmation, setConfirmation] = useState('');
  const calculation = useMemo(() => calculateMarketSizingResult(value.components), [value.components]);
  const treeDraft = useMemo(
    () => ({ nodes: ensureMarketSizingIssueTreeRoot(value.issueTree, rootText), crossLinks: [] }),
    [value.issueTree, rootText],
  );
  const setComponents = (components: MarketSizingComponentValue[]) => onChange({ ...value, components });
  const useAsComponent = (label: string) => {
    const clean = label.trim();
    if (!clean) return;
    const existing = value.components.some((component) => component.label.trim().toLocaleLowerCase() === clean.toLocaleLowerCase());
    if (!existing) {
      const blank = value.components.find((component) => !component.label.trim() && !component.value.trim());
      setComponents(blank
        ? value.components.map((component) => component.id === blank.id ? { ...component, label: clean } : component)
        : [...value.components, { id: uid('component'), label: clean, value: '', unit: 'number', operator: '×' }]);
    }
    setConfirmation(existing ? `“${clean}” is already in Components.` : `Added “${clean}” to Components.`);
    window.setTimeout(() => setConfirmation(''), 2200);
    window.setTimeout(() => componentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const resultText = calculation.result === null ? value.manualResult : formatMarketSizingResult(calculation.result);
  const resultValue = marketSizingFinalValue(value);
  const fieldUnit = clarifyUnitLabel(answerUnit);
  const unitLabel = marketSizingResultUnit(resultValue, answerUnit);
  const inFieldScale = resultValue !== null && unitLabel !== fieldUnit
    ? `= ${formatMarketSizingResult(resultValue / numericUnitSpec(fieldUnit).scale)} ${fieldUnit}`
    : '';
  const scaleHint = equivalentScaleHint(answerUnit);
  const rootDisplay = rootText.trim() || 'Market size';
  const formatTreeText = (text: string) => formatNumbersInText(text === rootDisplay ? clarifyUnitText(text) : text);

  return (
    <div className="space-y-4" data-testid="market-sizing-answer-builder">
      <div data-testid="market-sizing-issue-tree">
        <StructureTreeEditor
          draft={treeDraft}
          onChange={(next) => onChange({ ...value, issueTree: next.nodes })}
          disabled={disabled}
          formatDisplay={formatTreeText}
          eyebrow="Thinking tool · Issue tree"
          description="Break the market into determinants. Select a box to show actions, then use “Use as component” to send it to Components. This tree is saved with your attempt but is never graded."
          testId="market-sizing-tree-canvas"
          renderExtraActions={(node) => {
            const label = node.text.trim();
            const usable = !!label && label.toLocaleLowerCase() !== ISSUE_TREE_PLACEHOLDER.toLocaleLowerCase();
            return (
              <button type="button" disabled={!usable} onClick={() => useAsComponent(label)} className={treeActionButtonClass} title={usable ? 'Add this box to Components' : 'Name this box first'} data-testid="button-use-as-component">
                Use as component
              </button>
            );
          }}
        />
        {confirmation ? <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--space-semantic-success)]" role="status"><CheckCircle2 className="h-4 w-4" /> {confirmation}</p> : null}
      </div>

      <section ref={componentsRef} className="scroll-mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 sm:p-5" data-testid="market-sizing-components">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Components · Bottom-up sizing model</p>
            <h3 className="mt-1 text-base font-bold text-[var(--space-text-primary)]">Build the calculation</h3>
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">Add components from the tree or type them here. Percentages are multiplied as fractions: 50% = 0.5.</p>
          </div>
          <button type="button" disabled={disabled} onClick={() => setComponents([...value.components, { id: uid('component'), label: '', value: '', unit: 'number', operator: '×' }])} className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold ${tw.button.secondary}`}>
            <Plus className="h-4 w-4" /> Add component
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {value.components.map((component, index) => (
            <div key={component.id}>
              {index > 0 ? (
                <div className="flex h-10 items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--space-border-default)]" />
                  <select value={component.operator} disabled={disabled} onChange={(event) => setComponents(value.components.map((item) => item.id === component.id ? { ...item, operator: event.target.value as MarketSizingOperator } : item))} aria-label={`Operator before component ${index + 1}`} className="h-8 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2 text-xs font-bold text-[var(--space-text-brand)]">
                    <option value="×">× Multiply</option><option value="+">+ Add</option><option value="−">− Subtract</option><option value="÷">÷ Divide</option>
                  </select>
                  <span className="h-px flex-1 bg-[var(--space-border-default)]" />
                </div>
              ) : null}
              <div className="grid gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.7fr)_44px] sm:items-start">
                <label className="block text-xs font-bold text-[var(--space-text-secondary)]">Component {index + 1}<input value={component.label} disabled={disabled} onChange={(event) => setComponents(value.components.map((item) => item.id === component.id ? { ...item, label: event.target.value } : item))} placeholder="e.g. Eligible households" className={`${tw.input.base} ${tw.input.default} mt-1.5 text-sm`} /></label>
                <div>
                  <label className="block text-xs font-bold text-[var(--space-text-secondary)]">Value</label>
                  <div className="mt-1.5 flex rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] focus-within:border-[var(--space-brand-primary-600)]">
                    <FormattedNumberInput value={component.value} group={component.unit !== 'percent'} disabled={disabled} inputMode="decimal" onValueChange={(next) => setComponents(value.components.map((item) => item.id === component.id ? { ...item, value: next } : item))} placeholder={component.unit === 'percent' ? '50 or 50%' : '0'} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-bold tabular-nums outline-none" />
                    <div className="flex border-l border-[var(--space-border-default)] p-1">
                      {(['number', 'percent'] as const).map((unit) => <button key={unit} type="button" disabled={disabled} onClick={() => setComponents(value.components.map((item) => item.id === component.id ? { ...item, unit } : item))} className={`rounded-lg px-2 text-[10px] font-bold ${component.unit === unit ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'text-[var(--space-text-muted)]'}`}>{unit === 'number' ? 'Number' : '%'}</button>)}
                    </div>
                  </div>
                  {calculation.errors[component.id] ? <p className="mt-1 text-[11px] text-[var(--space-semantic-danger)]" role="alert">{calculation.errors[component.id]}</p> : null}
                </div>
                <button type="button" disabled={disabled || value.components.length === 1} onClick={() => setComponents(value.components.filter((item) => item.id !== component.id))} className="mt-5 flex h-10 items-center justify-center rounded-xl border border-[var(--space-border-default)] text-[var(--space-semantic-danger)] disabled:opacity-35" aria-label={`Remove component ${index + 1}`}><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
        {calculation.errors.calculation ? <p className="mt-2 text-xs text-[var(--space-semantic-danger)]" role="alert">{calculation.errors.calculation}</p> : null}
      </section>

      <section className="overflow-hidden rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] shadow-md" data-testid="market-sizing-result-box">
        <div className="border-b border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] px-4 py-3 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Calculated result</p>
          <p className="mt-1 text-xs text-[var(--space-text-secondary)]">{calculation.result === null ? 'Enter a final figure if your component model is incomplete.' : 'Updated automatically from Components.'}</p>
        </div>
        <div className="px-4 py-5 sm:px-6 sm:py-7">
          <label className="text-xs font-bold text-[var(--space-text-secondary)]">Final market size
            <div className="mt-2 flex items-baseline gap-2">
              <FormattedNumberInput value={resultText} disabled={disabled} readOnly={calculation.result !== null} inputMode="decimal" onValueChange={(next) => onChange({ ...value, manualResult: next })} placeholder="Enter your final estimate" className="min-w-0 flex-1 bg-transparent text-3xl font-extrabold tabular-nums tracking-tight text-[var(--space-text-primary)] outline-none placeholder:text-[var(--space-text-muted)] sm:text-4xl" />
              {unitLabel ? <span className="max-w-[45%] shrink-0 break-words text-right text-sm font-semibold text-[var(--space-text-brand)]" data-testid="market-sizing-result-unit">{unitLabel}</span> : null}
            </div>
          </label>
          {inFieldScale ? <p className="mt-2 text-sm font-semibold tabular-nums text-[var(--space-text-secondary)]" data-testid="market-sizing-result-in-field-unit">{inFieldScale}</p> : null}
          {scaleHint ? <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="market-sizing-result-scale-hint">{scaleHint}</p> : null}
        </div>
      </section>
    </div>
  );
}

export function MarketSizingAttemptSummary({ value, answerUnit }: { value: MarketSizingAnswerDraft; answerUnit?: string }) {
  const calculation = calculateMarketSizingResult(value.components);
  const resultText = calculation.result === null ? displayNumberish(value.manualResult) : formatMarketSizingResult(calculation.result);
  const resultUnit = marketSizingResultUnit(marketSizingFinalValue(value), answerUnit);
  return (
    <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="submitted-market-sizing-model">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Your submitted bottom-up model</p>
      <ol className="mt-2 space-y-1.5">
        {value.components.filter((component) => component.label.trim() || component.value.trim()).map((component, index) => {
          const shown = component.unit === 'percent' && component.value.trim() && !component.value.trim().endsWith('%') ? `${component.value}%` : (component.unit === 'percent' ? component.value : displayNumberish(component.value)) || 'not provided';
          return <li key={component.id} className="text-sm leading-6 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">{index > 0 ? `${component.operator} ` : ''}{component.label || `Component ${index + 1}`}:</span> {shown}</li>;
        })}
      </ol>
      <p className="mt-3 text-sm font-bold text-[var(--space-text-primary)]">Result: {resultText || 'Not provided'}{resultUnit ? ` ${resultUnit}` : ''}</p>
      {marketSizingIssueTreeBoxCount(value.issueTree) ? <p className="mt-2 text-xs text-[var(--space-text-muted)]">Issue tree saved with this attempt · {marketSizingIssueTreeBoxCount(value.issueTree)} determinant{marketSizingIssueTreeBoxCount(value.issueTree) === 1 ? '' : 's'} · not graded</p> : null}
    </section>
  );
}
