import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { tw } from '../lib/colors';
import { reorderCalculationSteps } from '../lib/calculationStepReorder';
import FormattedNumberInput from './FormattedNumberInput';
import { clarifyUnitText } from '../lib/unitLabels';
import {
  answerToleranceText,
  answerUnitLabel,
  calculationResultSummaries,
  createCalculationFormulaRow,
  createCalculationNumberSlot,
  equivalentScaleHint,
  evaluateCalculationFormula,
  formatCalculationValue,
  formulaRowsForCalculationResult,
  parseSerializedCalculationResults,
  type CalculationAnswerPayload,
  type CalculationFinalAnswerSpec,
  type CalculationFormulaRow,
  type CalculationOperator,
  type CalculationResultSummary,
} from '../lib/calculationAnswerModel';

const OPERATORS: CalculationOperator[] = ['×', '+', '−', '÷'];

export function CalculationResultSummaryView({
  value,
  serialized,
  specs = [],
  results: explicitResults,
  title = 'Your calculated results',
}: {
  value?: CalculationAnswerPayload;
  serialized?: string;
  specs?: CalculationFinalAnswerSpec[];
  results?: CalculationResultSummary[];
  title?: string;
}) {
  const results: CalculationResultSummary[] = explicitResults || (value
    ? calculationResultSummaries(value)
    : parseSerializedCalculationResults(serialized || '', specs));
  if (!results.length) return null;

  return (
    <section className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="calculation-result-summary">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">{title}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {results.map((result) => {
          const shownValue = clarifyUnitText(result.value);
          const unit = answerUnitLabel(result.unit);
          return (
          <article key={result.id} className="min-w-0 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid={`calculation-result-${result.id}`}>
            <p className="break-words text-xs font-bold text-[var(--space-text-secondary)]">{clarifyUnitText(result.label)}</p>
            <p className="mt-1 break-words text-xl font-extrabold tabular-nums text-[var(--space-text-primary)]">
              {shownValue}{unit && !shownValue.toLowerCase().includes(unit.toLowerCase()) ? <span className="ml-1.5 text-xs font-bold text-[var(--space-text-muted)]">{unit}</span> : null}
            </p>
            {result.formulas.length ? (
              <div className="mt-2 space-y-1.5 border-t border-[var(--space-border-default)] pt-2">
                {result.formulas.map((formula, index) => (
                  <p key={`${formula}-${index}`} className="whitespace-pre-wrap break-words font-mono text-[11px] leading-5 text-[var(--space-text-muted)]" data-testid={`calculation-result-formula-${result.id}-${index}`}>
                    <span className="font-sans font-bold text-[var(--space-text-secondary)]">Formula{result.formulas.length > 1 ? ` ${index + 1}` : ''}: </span>{clarifyUnitText(formula)}
                  </p>
                ))}
              </div>
            ) : null}
          </article>
          );
        })}
      </div>
    </section>
  );
}

function FormulaRowEditor({
  row,
  resultLabel,
  rowIndex,
  updateFormula,
  removeFormula,
  canRemove,
  disabled,
}: {
  row: CalculationFormulaRow;
  resultLabel: string;
  rowIndex: number;
  updateFormula: (rowId: string, updater: (current: CalculationFormulaRow) => CalculationFormulaRow) => void;
  removeFormula: (rowId: string) => void;
  canRemove: boolean;
  disabled: boolean;
}) {
  const result = evaluateCalculationFormula(row);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cleanupDragRef = useRef<(() => void) | null>(null);
  const [drag, setDrag] = useState<{
    from: number;
    dx: number;
    dy: number;
    indicator: { left: number; top: number; height: number } | null;
  } | null>(null);

  const moveNumber = (from: number, to: number) => {
    updateFormula(row.id, (current) => {
      if (from === to || from < 0 || to < 0 || from >= current.numbers.length || to >= current.numbers.length) return current;
      return { ...current, numbers: reorderCalculationSteps(current.numbers, from, to) };
    });
  };
  const moveNumberRef = useRef(moveNumber);
  moveNumberRef.current = moveNumber;

  useEffect(() => () => { cleanupDragRef.current?.(); }, []);

  const locateDropGap = (x: number, y: number, from: number, dx: number, dy: number) => {
    const container = containerRef.current;
    if (!container) return null;
    const bounds = container.getBoundingClientRect();
    const margin = 28;
    if (x < bounds.left - margin || x > bounds.right + margin || y < bounds.top - margin || y > bounds.bottom + margin) return null;
    const candidates: Array<{ index: number; edgeX: number; top: number; height: number; distance: number }> = [];
    const consider = (index: number, edgeX: number, top: number, height: number) => {
      candidates.push({ index, edgeX, top, height, distance: Math.hypot(x - edgeX, (y - (top + height / 2)) * 2) });
    };
    stepRefs.current.slice(0, row.numbers.length).forEach((element, index) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const offsetX = index === from ? dx : 0;
      const offsetY = index === from ? dy : 0;
      consider(index, rect.left - offsetX, rect.top - offsetY, rect.height);
      consider(index + 1, rect.right - offsetX, rect.top - offsetY, rect.height);
    });
    if (!candidates.length) return null;
    const hit = candidates.reduce((nearest, candidate) => candidate.distance < nearest.distance ? candidate : nearest);
    const noOp = hit.index === from || hit.index === from + 1;
    return {
      index: hit.index,
      indicator: noOp ? null : { left: hit.edgeX - bounds.left, top: hit.top - bounds.top, height: hit.height },
    };
  };

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, from: number) => {
    if (disabled) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    cleanupDragRef.current?.();
    const handle = event.currentTarget;
    const pointerId = event.pointerId;
    const startX = event.clientX;
    const startY = event.clientY;
    try { handle.setPointerCapture(pointerId); } catch { /* Pointer capture is a best-effort nicety. */ }
    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
    let started = false;
    let dropIndex: number | null = null;

    const onMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!started && Math.hypot(dx, dy) < 4) return;
      started = true;
      moveEvent.preventDefault();
      const hit = locateDropGap(moveEvent.clientX, moveEvent.clientY, from, dx, dy);
      dropIndex = hit ? hit.index : null;
      setDrag({ from, dx, dy, indicator: hit ? hit.indicator : null });
    };
    const cleanup = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      window.removeEventListener('keydown', onKeyDown, true);
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
      try { handle.releasePointerCapture(pointerId); } catch { /* Already released. */ }
      cleanupDragRef.current = null;
      setDrag(null);
    };
    const onUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      const target = dropIndex;
      cleanup();
      if (started && target !== null) moveNumberRef.current(from, target > from ? target - 1 : target);
    };
    const onCancel = (cancelEvent: PointerEvent) => {
      if (cancelEvent.pointerId !== pointerId) return;
      cleanup();
    };
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key !== 'Escape') return;
      keyEvent.preventDefault();
      keyEvent.stopPropagation();
      cleanup();
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    window.addEventListener('keydown', onKeyDown, true);
    cleanupDragRef.current = cleanup;
  };
  return (
    <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3" data-testid={`calculation-formula-${row.resultId}-${rowIndex}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-[var(--space-text-secondary)]">{rowIndex === 0 ? `Formula for ${resultLabel}` : `Additional formula ${rowIndex + 1}`}</p>
        <button
          type="button"
          onClick={() => removeFormula(row.id)}
          disabled={disabled || !canRemove}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--space-border-default)] text-[var(--space-semantic-danger)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-35"
          aria-label={`Remove formula ${rowIndex + 1} for ${resultLabel}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div ref={containerRef} className={`relative mt-3 flex flex-wrap items-end gap-2 ${drag ? 'select-none' : ''}`} aria-label={`Formula for ${resultLabel}`}>
        {row.numbers.map((slot, numberIndex) => (
          <div key={slot.id} className="contents">
            {numberIndex > 0 ? (
              <select
                value={row.operators[numberIndex - 1]}
                onChange={(event) => updateFormula(row.id, (current) => ({
                  ...current,
                  operators: current.operators.map((operator, index) => index === numberIndex - 1 ? event.target.value as CalculationOperator : operator),
                }))}
                disabled={disabled}
                aria-label={`Operator ${numberIndex} for ${resultLabel}`}
                title="Click to change operator"
                className="h-11 w-14 cursor-pointer appearance-none rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page)] px-2 text-center text-lg font-extrabold text-[var(--space-text-brand)] outline-none [text-align-last:center] focus:border-[var(--space-brand-primary-600)]"
              >
                {OPERATORS.map((operator) => <option key={operator} value={operator}>{operator}</option>)}
              </select>
            ) : null}

            <div
              ref={(element) => { stepRefs.current[numberIndex] = element; }}
              className={`relative w-full min-w-[9rem] flex-1 rounded-xl border bg-[var(--space-surface-page)] p-2 sm:max-w-[13rem] ${drag?.from === numberIndex ? 'z-30 border-[var(--space-brand-primary-600)] opacity-95 shadow-xl ring-2 ring-[color-mix(in_srgb,var(--space-brand-primary-500)_35%,transparent)]' : 'border-[var(--space-border-default)]'}`}
              style={drag?.from === numberIndex ? { transform: `translate3d(${drag.dx}px, ${drag.dy}px, 0) scale(1.03)`, pointerEvents: 'none' } : undefined}
              data-dragging={drag?.from === numberIndex ? 'true' : undefined}
              data-testid={`calculation-step-${row.id}-${numberIndex}`}
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onPointerDown={(event) => startDrag(event, numberIndex)}
                  onContextMenu={(event) => event.preventDefault()}
                  onKeyDown={(event) => {
                    if (disabled) return;
                    const earlier = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
                    const later = event.key === 'ArrowDown' || event.key === 'ArrowRight';
                    if (!earlier && !later) return;
                    event.preventDefault();
                    moveNumber(numberIndex, numberIndex + (later ? 1 : -1));
                  }}
                  disabled={disabled}
                  style={{ touchAction: 'none' }}
                  className={`inline-flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)] hover:text-[var(--space-text-primary)] disabled:cursor-not-allowed disabled:opacity-40 ${drag?.from === numberIndex ? 'cursor-grabbing' : 'cursor-grab'}`}
                  title="Press and drag to reorder this step"
                  aria-label={`Drag to reorder calculation step ${numberIndex + 1}`}
                  data-testid={`calculation-step-handle-${row.id}-${numberIndex}`}
                ><GripVertical className="h-4 w-4" /></button>
                <span className="min-w-0 flex-1" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => updateFormula(row.id, (current) => ({ ...current, numbers: current.numbers.map((item) => item.id === slot.id ? { ...item, openParenthesis: !item.openParenthesis } : item) }))}
                  disabled={disabled}
                  aria-pressed={slot.openParenthesis}
                  className={`h-7 w-7 rounded-md text-sm font-extrabold ${slot.openParenthesis ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-muted)]'}`}
                  aria-label={`Toggle opening parenthesis for number ${numberIndex + 1}`}
                >(
                </button>
                <button
                  type="button"
                  onClick={() => updateFormula(row.id, (current) => ({ ...current, numbers: current.numbers.map((item) => item.id === slot.id ? { ...item, closeParenthesis: !item.closeParenthesis } : item) }))}
                  disabled={disabled}
                  aria-pressed={slot.closeParenthesis}
                  className={`h-7 w-7 rounded-md text-sm font-extrabold ${slot.closeParenthesis ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-muted)]'}`}
                  aria-label={`Toggle closing parenthesis for number ${numberIndex + 1}`}
                >)
                </button>
              </div>
              <textarea
                rows={2}
                value={slot.label}
                onChange={(event) => updateFormula(row.id, (current) => ({ ...current, numbers: current.numbers.map((item) => item.id === slot.id ? { ...item, label: event.target.value.replace(/\s*\n+\s*/g, ' ') } : item) }))}
                onKeyDown={(event) => { if (event.key === 'Enter') event.preventDefault(); }}
                disabled={disabled}
                maxLength={40}
                placeholder="Label, e.g. units sold"
                title={slot.label || undefined}
                aria-label={`Label for number ${numberIndex + 1} in ${resultLabel}`}
                data-testid={`calculation-step-label-${row.id}-${numberIndex}`}
                className="mt-1 block w-full resize-none break-words bg-transparent px-1 text-xs font-semibold leading-4 text-[var(--space-text-secondary)] outline-none placeholder:text-[var(--space-text-muted)]"
              />
              <FormattedNumberInput
                inputMode="decimal"
                value={slot.value}
                onValueChange={(next) => updateFormula(row.id, (current) => ({ ...current, numbers: current.numbers.map((item) => item.id === slot.id ? { ...item, value: next } : item) }))}
                disabled={disabled}
                placeholder="Number"
                aria-label={`Number ${numberIndex + 1} in formula for ${resultLabel}`}
                className="mt-1.5 w-full bg-transparent px-1 text-base font-extrabold tabular-nums text-[var(--space-text-primary)] outline-none placeholder:text-[var(--space-text-muted)]"
              />
            </div>
          </div>
        ))}

        {drag?.indicator ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute z-20 w-1 -translate-x-1/2 rounded-full bg-[var(--space-brand-primary-600)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--space-brand-primary-500)_30%,transparent)]"
            style={{ left: drag.indicator.left, top: drag.indicator.top, height: drag.indicator.height }}
            data-testid="calculation-drop-indicator"
          />
        ) : null}
        <span className="flex h-11 items-center px-1 text-lg font-extrabold text-[var(--space-text-brand)]">=</span>
        <label className="min-w-[9rem] flex-1 sm:max-w-[13rem]">
          <span className="sr-only">Live formula result for {resultLabel}</span>
          <input
            readOnly
            value={result === null ? '' : formatCalculationValue(result)}
            placeholder="Live result"
            className="h-11 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 text-sm font-extrabold tabular-nums text-[var(--space-text-primary)] outline-none"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateFormula(row.id, (current) => ({
            ...current,
            numbers: [...current.numbers, createCalculationNumberSlot()],
            operators: [...current.operators, '×'],
          }))}
          disabled={disabled}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${tw.button.secondary}`}
        >
          <Plus className="h-3.5 w-3.5" /> Add step
        </button>
        <button
          type="button"
          onClick={() => updateFormula(row.id, (current) => ({
            ...current,
            numbers: current.numbers.slice(0, -1),
            operators: current.operators.slice(0, -1),
          }))}
          disabled={disabled || row.numbers.length <= 2}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold text-[var(--space-semantic-danger)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Trash2 className="h-3.5 w-3.5" /> Remove last
        </button>
      </div>
    </div>
  );
}

export default function CalculationAnswerBuilder({
  value,
  onChange,
  disabled = false,
  showCaveat = true,
}: {
  value: CalculationAnswerPayload;
  onChange: (next: CalculationAnswerPayload) => void;
  disabled?: boolean;
  /** Easy cases supply the interpretation, so they hide the assumption field. */
  showCaveat?: boolean;
}) {
  const updateFormula = (rowId: string, updater: (row: CalculationFormulaRow) => CalculationFormulaRow) => {
    onChange({ ...value, formulaRows: value.formulaRows.map((row) => row.id === rowId ? updater(row) : row) });
  };

  return (
    <div className="mt-5 space-y-5" data-testid="calculation-structured-answer">
      <section className="overflow-hidden rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] shadow-sm" data-testid="calculation-final-answers">
        <div className="border-b border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] bg-[var(--space-surface-accent-soft)] px-4 py-3 sm:px-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Final Numerical Answers</p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Enter each requested number, then build the formula underneath. Press and drag a step’s ⋮⋮ handle to reorder it; its brackets move with it. Parentheses are checked before a result is calculated.</p>
        </div>
        <div className="grid gap-4 p-4 sm:p-5">
          {value.finalAnswers.map((answer, answerIndex) => {
            const formulaRows = formulaRowsForCalculationResult(value, answer.id, answerIndex);
            const answerLabel = clarifyUnitText(answer.label);
            const unitLabel = answerUnitLabel(answer.unit);
            const scaleHint = equivalentScaleHint(answer.unit);
            return (
              <article key={answer.id} className="min-w-0 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-page)] p-3 sm:p-4" data-testid={`calculation-answer-result-${answer.id}`}>
                <label className="block">
                  <span className="break-words text-sm font-bold text-[var(--space-text-primary)]">{answerLabel}</span>
                  <div className="mt-2 flex min-h-16 overflow-hidden rounded-xl border-2 border-[var(--space-border-strong)] bg-[var(--space-surface-card)] focus-within:border-[var(--space-brand-primary-600)]">
                    <FormattedNumberInput
                      inputMode="decimal"
                      value={answer.value}
                      onValueChange={(next) => onChange({
                        ...value,
                        finalAnswers: value.finalAnswers.map((item) => item.id === answer.id ? { ...item, value: next } : item),
                      })}
                      disabled={disabled}
                      placeholder={unitLabel ? `Enter in ${unitLabel}` : 'Enter your number'}
                      aria-label={`${answer.label} final numerical answer`}
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-lg font-extrabold tabular-nums text-[var(--space-text-primary)] outline-none placeholder:text-[var(--space-text-muted)] disabled:opacity-70 sm:text-xl"
                      data-testid={`input-calculation-final-${answerIndex}`}
                    />
                    {unitLabel ? <span className="flex max-w-40 items-center border-l border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 text-xs font-bold text-[var(--space-text-muted)]" data-testid={`calculation-final-unit-${answerIndex}`}>{unitLabel}</span> : null}
                  </div>
                  {scaleHint ? <span className="mt-1.5 block text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid={`calculation-final-scale-hint-${answerIndex}`}>{scaleHint}</span> : null}
                  {unitLabel && answer.tolerance != null ? <span className="mt-1.5 block text-[11px] leading-4 text-[var(--space-text-muted)]">{answerToleranceText(answer.tolerance, answer.unit)}</span> : null}
                </label>

                <div className="mt-3 space-y-3 border-t border-[var(--space-border-default)] pt-3">
                  {formulaRows.map((row, rowIndex) => (
                    <FormulaRowEditor
                      key={row.id}
                      row={row}
                      resultLabel={answerLabel}
                      rowIndex={rowIndex}
                      updateFormula={updateFormula}
                      removeFormula={(rowId) => onChange({ ...value, formulaRows: value.formulaRows.filter((item) => item.id !== rowId) })}
                      canRemove={formulaRows.length > 1}
                      disabled={disabled}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => onChange({ ...value, formulaRows: [...value.formulaRows, createCalculationFormulaRow(answer.id)] })}
                    disabled={disabled}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold ${tw.button.secondary}`}
                    data-testid={`button-add-calculation-formula-${answer.id}`}
                  >
                    <Plus className="h-4 w-4" /> Add another formula for {answerLabel}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {showCaveat ? (
      <label className="block rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
        <span className="text-xs font-bold text-[var(--space-text-secondary)]">Key caveat or assumption</span>
        <input
          value={value.caveat}
          onChange={(event) => onChange({ ...value, caveat: event.target.value })}
          disabled={disabled}
          placeholder="One short limit, caveat, or assumption"
          className={`${tw.input.base} ${tw.input.default} mt-2 py-2.5 text-sm`}
          data-testid="input-calculation-caveat"
        />
      </label>
      ) : null}
    </div>
  );
}
