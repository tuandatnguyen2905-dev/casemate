import { Calculator, CheckCircle2, Circle, CircleAlert, FileText, Layers, Lightbulb, ListOrdered, Target } from 'lucide-react';
import {
  MS_SOURCE_LABELS,
  compareMarketSizingAttempt,
  type MarketSizingWorkedModel,
  type MsLearnerComponent,
  type MsSource,
} from '../lib/marketSizingWorkedModels';

const sectionLabel = 'flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]';

function SourceBadge({ source }: { source: MsSource }) {
  const given = source === 'given';
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold ${given
        ? 'border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-primary)]'
        : 'border-[color-mix(in_srgb,var(--space-semantic-warning)_55%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning-700)]'}`}
      data-testid={`factor-source-${source}`}
    >
      {given ? <FileText className="h-3 w-3" aria-hidden="true" /> : <Lightbulb className="h-3 w-3" aria-hidden="true" />}
      {MS_SOURCE_LABELS[source]}
    </span>
  );
}

/**
 * Post-submission Market Sizing worked answer: definition, formula, factor table,
 * numbered calculation, then sanity check and sensitivity. Every figure comes from
 * the computed model, so the table and the arithmetic always agree.
 */
export default function MarketSizingWorkedAnswer({ model }: { model: MarketSizingWorkedModel }) {
  if (model.contentRepair) {
    return (
      <p className="rounded-xl border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]" data-testid="market-sizing-worked-held">
        This worked answer is being reviewed, so no figures are shown yet. Your score comes from the rubric criteria only.
      </p>
    );
  }
  const ambiguous = model.format === 'ambiguous-estimation';
  const hasAssumptions = model.factors.some((factor) => factor.source === 'assumption');
  const definition = model.definition;
  return (
    <div className="mt-3 space-y-5" data-testid="market-sizing-worked-answer" data-format={model.format}>
      <p className="rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_25%,transparent)] bg-[var(--space-surface-accent-soft)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="market-sizing-worked-note">
        {hasAssumptions
          ? 'Figures labelled Model assumption are illustrative values chosen for this example, not verified market facts. A different decomposition with consistent assumptions can score just as well.'
          : 'Every factor below is given by the case. A different calculation order that uses the same facts is equally valid.'}
      </p>

      <section data-testid="market-sizing-definition">
        <p className={sectionLabel}><Target className="h-3.5 w-3.5" aria-hidden="true" /> 1 · Market definition</p>
        <dl className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            ['What is counted', definition.counts],
            ['Not counted', definition.excludes],
            ['Geography', definition.geography],
            ['Time period', definition.period],
            ['Measure', definition.measure],
          ].map(([term, detail]) => (
            <div key={term} className="min-w-0 rounded-xl bg-[var(--space-surface-muted)] p-2.5">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{term}</dt>
              <dd className="mt-0.5 break-words text-sm leading-5 text-[var(--space-text-primary)]">{detail.charAt(0).toUpperCase() + detail.slice(1)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section data-testid="market-sizing-formula">
        <p className={sectionLabel}><Layers className="h-3.5 w-3.5" aria-hidden="true" /> 2 · Bottom-up formula</p>
        <p className="mt-2 break-words rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{model.formula}</p>
        {model.segments.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Segments">
            {model.segments.map((segment) => (
              <span key={segment} className="rounded-full border border-[var(--space-border-default)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">{segment}</span>
            ))}
          </div>
        ) : null}
      </section>

      <section data-testid="market-sizing-factors">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={sectionLabel}><FileText className="h-3.5 w-3.5" aria-hidden="true" /> 3 · Factors</p>
          <div className="flex flex-wrap gap-1.5">
            {model.factors.some((factor) => factor.source === 'given') ? <SourceBadge source="given" /> : null}
            {hasAssumptions ? <SourceBadge source="assumption" /> : null}
          </div>
        </div>
        <ul className="mt-2 divide-y divide-[var(--space-border-default)] overflow-hidden rounded-xl border border-[var(--space-border-default)]">
          {model.factors.map((factor) => (
            <li
              key={factor.key}
              className={`p-3 ${factor.source === 'assumption' ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_6%,transparent)]' : 'bg-[var(--space-surface-card)]'}`}
              data-testid={`market-sizing-factor-${factor.key}`}
              data-source={factor.source}
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="min-w-0 break-words text-sm font-bold leading-5 text-[var(--space-text-primary)]">{factor.label}</p>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="whitespace-nowrap text-sm font-extrabold tabular-nums text-[var(--space-text-primary)]" data-testid="factor-value">{factor.display}</span>
                  <SourceBadge source={factor.source} />
                </div>
              </div>
              <p className="mt-1 break-words text-xs leading-5 text-[var(--space-text-secondary)]">{factor.rationale}</p>
            </li>
          ))}
        </ul>
      </section>

      <section data-testid="market-sizing-steps">
        <p className={sectionLabel}><ListOrdered className="h-3.5 w-3.5" aria-hidden="true" /> 4 · Step-by-step calculation</p>
        <ol className="mt-2 space-y-2">
          {model.steps.map((step, index) => (
            <li
              key={step.key}
              className={`flex gap-2.5 rounded-xl p-2.5 ${step.isFinal ? 'border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)]' : 'bg-[var(--space-surface-muted)]'}`}
              data-testid={step.isFinal ? 'market-sizing-final-step' : `market-sizing-step-${index + 1}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-card)] text-[10px] font-bold text-[var(--space-text-brand)]">{index + 1}</span>
              <div className="min-w-0 text-sm leading-6 text-[var(--space-text-secondary)]">
                <p className="font-bold text-[var(--space-text-primary)]">{step.label}</p>
                <p className="break-words tabular-nums">
                  {step.expression} = <strong className="font-extrabold text-[var(--space-text-primary)]">{step.display}</strong>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-base font-extrabold leading-7 text-[var(--space-text-primary)]" data-testid="market-sizing-final-estimate">
          {ambiguous ? 'Illustrative estimate' : 'Result'}: {model.final.display}
          {model.finalInRequestedUnit ? <span className="block text-sm font-semibold text-[var(--space-text-secondary)]">= {model.finalInRequestedUnit}</span> : null}
        </p>
      </section>

      <section data-testid="market-sizing-checks">
        <p className={sectionLabel}><Calculator className="h-3.5 w-3.5" aria-hidden="true" /> 5 · Sanity check{model.sensitivity ? ' and sensitivity' : ''}</p>
        <ul className="mt-2 space-y-1.5">
          {model.sanity.map((item) => (
            <li key={item} className="flex gap-2 break-words text-sm leading-6 text-[var(--space-text-secondary)]">
              <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" aria-hidden="true" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
          {model.sensitivity ? (
            <li className="flex gap-2 break-words rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_10%,transparent)] p-2.5 text-sm leading-6 text-[var(--space-text-secondary)]" data-testid="market-sizing-sensitivity">
              <CircleAlert className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-warning)]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="font-bold text-[var(--space-text-primary)]">Range: {model.sensitivity.rangeLowDisplay} to {model.sensitivity.rangeHighDisplay}. </span>
                {model.sensitivity.driverText}
              </span>
            </li>
          ) : null}
        </ul>
        {model.commonMistake ? (
          <p className="mt-3 break-words text-xs leading-5 text-[var(--space-text-muted)]"><span className="font-bold text-[var(--space-text-secondary)]">Common mistake: </span>{model.commonMistake}</p>
        ) : null}
        {model.alternatives.length ? (
          <p className="mt-1.5 break-words text-xs leading-5 text-[var(--space-text-muted)]"><span className="font-bold text-[var(--space-text-secondary)]">Other valid routes: </span>{model.alternatives.join(' ')}</p>
        ) : null}
      </section>
    </div>
  );
}

const STATUS_META = {
  included: { icon: CheckCircle2, tone: 'text-[var(--space-semantic-success)]', label: 'Included' },
  combined: { icon: Layers, tone: 'text-[var(--space-text-brand)]', label: 'Combined' },
  missing: { icon: Circle, tone: 'text-[var(--space-text-muted)]', label: 'Not found' },
} as const;

/** Factor-by-factor comparison of the learner's submitted Components with the worked model. */
export function MarketSizingAttemptFeedback({
  model,
  components,
  result,
}: {
  model: MarketSizingWorkedModel;
  components: MsLearnerComponent[];
  result: number | null;
}) {
  if (model.contentRepair) return null;
  const comparison = compareMarketSizingAttempt(model, components, result);
  const ambiguous = model.format === 'ambiguous-estimation';
  return (
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="market-sizing-attempt-feedback">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Your model vs the worked answer</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]" data-testid="market-sizing-coverage-summary">
        {comparison.answered
          ? `You covered ${comparison.includedCount} of ${model.factors.length} factors in the worked ${ambiguous ? 'route' : 'model'}.`
          : 'You did not submit any component values, so there was nothing to compare.'}
        {ambiguous && comparison.answered ? <span className="block text-xs font-normal text-[var(--space-text-muted)]">Your own factors and values can differ; this list shows which drivers the worked route uses.</span> : null}
      </p>
      <ul className="mt-3 space-y-2">
        {comparison.factors.map((item) => {
          const meta = STATUS_META[item.status];
          const Icon = meta.icon;
          return (
            <li key={item.factorKey} className="flex gap-2.5 rounded-xl bg-[var(--space-surface-muted)] p-2.5" data-testid={`market-sizing-coverage-${item.factorKey}`} data-status={item.status}>
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.tone}`} aria-hidden="true" />
              <div className="min-w-0 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-bold text-[var(--space-text-primary)]">{item.factorLabel}</span>
                  <span className="tabular-nums">worked: {item.modelDisplay}</span>
                  <span className={`font-bold ${meta.tone}`}>{meta.label}</span>
                </p>
                {item.status !== 'missing' ? (
                  <p className="break-words">Your component: <span className="font-semibold text-[var(--space-text-primary)]">{item.componentLabel}</span> = <span className="tabular-nums">{item.componentDisplay}</span></p>
                ) : null}
                <p className="break-words">{item.note}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {comparison.extraComponents.length && !comparison.alternativeRoute ? (
        <p className="mt-2 break-words text-xs leading-5 text-[var(--space-text-muted)]">Other components you used: {comparison.extraComponents.join(', ')}. Check that each one is applied once and has a clear unit.</p>
      ) : null}
      <div className="mt-3 space-y-2 border-t border-[var(--space-border-default)] pt-3 text-sm leading-6">
        <p className={comparison.calculationTone === 'good' ? 'text-[var(--space-text-primary)]' : 'text-[var(--space-text-secondary)]'} data-testid="market-sizing-calculation-feedback">
          <span className="font-bold text-[var(--space-text-primary)]">Calculation: </span>{comparison.calculation}
        </p>
        {comparison.alternativeRoute ? (
          <p className="text-[var(--space-text-secondary)]" data-testid="market-sizing-alternative-route"><span className="font-bold text-[var(--space-text-primary)]">Your route: </span>{comparison.alternativeRoute}</p>
        ) : null}
        <p className="text-xs leading-5 text-[var(--space-text-muted)]" data-testid="market-sizing-checks-feedback"><span className="font-bold text-[var(--space-text-secondary)]">Checks: </span>{comparison.checks}</p>
      </div>
    </section>
  );
}
