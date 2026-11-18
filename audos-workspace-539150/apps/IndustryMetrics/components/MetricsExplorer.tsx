import { useMemo, useState } from 'react';
import { CATALOG_GROUPS, CATALOG_SUB_INDUSTRIES, subIndustryById } from '../catalog/catalogSnapshot';
import { getFormula } from '../core/formulas';
import type { VariableSpec } from '../core/formulaEngine';
import { filterByCategory, searchMetrics } from '../core/query';
import { assessMetric } from '../core/readiness';
import type { MetricReadiness } from '../core/readiness';
import { getSource } from '../core/sources';
import { METRIC_CATEGORIES, VERIFICATION_LABELS } from '../core/types';
import type { MetricCategory, MetricDefinition } from '../core/types';
import { formatValue, UNITS } from '../core/units';
import { getMetric, metricsForCurriculum } from '../content/library';
import type { CurriculumMetricEntry } from '../content/library';

export interface MetricsExplorerProps {
  /** Implemented curriculum id to open first (e.g. "banking-commercial"). */
  initialCurriculumId?: string;
  initialMetricId?: string;
  /** Show the reviewer toggle that reveals metrics pending verification or rejected. Default false: learner views never expose them. */
  allowPendingToggle?: boolean;
}

interface Row extends CurriculumMetricEntry {
  readiness: MetricReadiness;
}

const CATEGORY_LABEL = Object.fromEntries(METRIC_CATEGORIES.map((c) => [c.id, c.label])) as Record<MetricCategory, string>;
const FREQUENCY_LABEL: Record<string, string> = {
  daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual',
  'per-period': 'Per period', 'per-project': 'Per project', 'per-season': 'Per season',
};

const STYLES = `
.imx-root{--imx-navy:#0F172A;--imx-slate:#475569;--imx-muted:#64748B;--imx-line:#E2E8F0;--imx-soft:#F8FAFC;--imx-red:#CC0000;
  font-family:Inter,system-ui,-apple-system,sans-serif;color:var(--imx-slate);background:#fff;font-size:14px;line-height:1.55;}
.imx-root *{box-sizing:border-box;}
.imx-root h1,.imx-root h2,.imx-root h3,.imx-root h4{color:var(--imx-navy);margin:0;font-weight:600;letter-spacing:-0.01em;}
.imx-head{padding:20px 24px 12px;border-bottom:1px solid var(--imx-line);}
.imx-head h1{font-size:20px;}
.imx-head p{margin:4px 0 0;font-size:13px;color:var(--imx-muted);}
.imx-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;padding:14px 24px;border-bottom:1px solid var(--imx-line);}
.imx-field{display:flex;flex-direction:column;gap:4px;min-width:180px;flex:1 1 180px;}
.imx-field label{font-size:12px;font-weight:600;color:var(--imx-navy);}
.imx-field select,.imx-field input[type=search]{height:36px;border:1px solid var(--imx-line);border-radius:6px;padding:0 10px;font:inherit;color:var(--imx-navy);background:#fff;}
.imx-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 24px;border-bottom:1px solid var(--imx-line);}
.imx-chip{border:1px solid var(--imx-line);background:#fff;color:var(--imx-slate);border-radius:999px;padding:4px 12px;font:inherit;font-size:12px;cursor:pointer;}
.imx-chip[aria-pressed=true]{border-color:var(--imx-navy);color:var(--imx-navy);font-weight:600;background:var(--imx-soft);}
.imx-toggle{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--imx-slate);}
.imx-body{display:grid;grid-template-columns:minmax(260px,340px) 1fr;min-height:420px;}
@media (max-width:820px){.imx-body{grid-template-columns:1fr;}.imx-list{border-right:none;border-bottom:1px solid var(--imx-line);max-height:none;}}
.imx-list{border-right:1px solid var(--imx-line);padding:16px;overflow:auto;max-height:78vh;}
.imx-list h2{font-size:14px;}
.imx-summary{font-size:12px;color:var(--imx-muted);margin:4px 0 12px;}
.imx-list ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;}
.imx-item{width:100%;text-align:left;border:1px solid var(--imx-line);border-left:3px solid transparent;background:#fff;border-radius:6px;padding:10px 12px;font:inherit;color:var(--imx-slate);cursor:pointer;}
.imx-item:hover{background:var(--imx-soft);}
.imx-item[aria-current=true]{border-left-color:var(--imx-red);background:var(--imx-soft);}
.imx-item strong{display:block;color:var(--imx-navy);font-weight:600;font-size:13px;}
.imx-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;font-size:11px;color:var(--imx-muted);}
.imx-badge{display:inline-flex;align-items:center;border-radius:4px;padding:1px 6px;font-size:11px;font-weight:600;border:1px solid var(--imx-line);color:var(--imx-navy);background:#fff;}
.imx-badge.ok{border-color:#A7F3D0;color:#065F46;background:#ECFDF5;}
.imx-badge.pending{border-color:#FDE68A;color:#92400E;background:#FFFBEB;}
.imx-badge.rejected{border-color:#FECACA;color:#B91C1C;background:#FEF2F2;}
.imx-badge.caveat{border-color:#CBD5E1;color:#0F172A;background:#F1F5F9;}
.imx-caveats{border:1px solid var(--imx-line);border-left:3px solid var(--imx-navy);background:var(--imx-soft);border-radius:6px;padding:10px 12px;margin:10px 0;}
.imx-caveats strong{color:var(--imx-navy);font-size:13px;}
.imx-caveats ul{margin:4px 0 0;padding-left:18px;}
.imx-badge.core{border-color:#FECACA;color:#B91C1C;background:#fff;}
.imx-detail{padding:20px 24px;overflow:auto;max-height:78vh;}
.imx-detail h2{font-size:20px;}
.imx-detail h3{font-size:14px;margin:20px 0 6px;}
.imx-detail p{margin:4px 0;}
.imx-badges{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 4px;}
.imx-formula{border:1px solid var(--imx-line);border-radius:6px;padding:10px 12px;background:var(--imx-soft);color:var(--imx-navy);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;}
.imx-table{width:100%;border-collapse:collapse;font-size:13px;}
.imx-table th,.imx-table td{border-bottom:1px solid var(--imx-line);padding:6px 8px;text-align:left;vertical-align:top;}
.imx-table th{color:var(--imx-navy);font-weight:600;font-size:12px;}
.imx-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
.imx-box{border:1px solid var(--imx-line);border-radius:6px;padding:10px 12px;}
.imx-box h4{font-size:12px;margin-bottom:4px;}
.imx-box ul,.imx-detail ol,.imx-detail ul{margin:4px 0;padding-left:18px;}
.imx-example{border:1px solid var(--imx-line);border-radius:6px;padding:12px 14px;}
.imx-example-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--imx-red);}
.imx-output{font-size:16px;font-weight:600;color:var(--imx-navy);}
.imx-related{display:flex;flex-wrap:wrap;gap:6px;}
.imx-link{border:1px solid var(--imx-line);background:#fff;border-radius:6px;padding:4px 10px;font:inherit;font-size:12px;color:var(--imx-navy);cursor:pointer;}
.imx-link:disabled{color:var(--imx-muted);cursor:not-allowed;background:var(--imx-soft);}
.imx-empty{padding:24px;color:var(--imx-muted);}
.imx-note{font-size:12px;color:var(--imx-muted);}
.imx-root a{color:var(--imx-navy);}
.imx-root button:focus-visible,.imx-root select:focus-visible,.imx-root input:focus-visible,.imx-root a:focus-visible{outline:2px solid var(--imx-red);outline-offset:2px;}
`;

function rangeText(variable: VariableSpec): string {
  const lo = variable.min !== undefined ? formatValue(variable.min, variable.unit) : null;
  const hi = variable.max !== undefined ? formatValue(variable.max, variable.unit) : null;
  if (lo && hi) return `${lo} to ${hi}`;
  if (lo) return variable.denominator ? `Above ${lo}` : `${lo} or more`;
  if (hi) return `Up to ${hi}`;
  return 'Any value';
}

function statusTone(status: MetricDefinition['evidence']['status']): string {
  if (status === 'source-verified') return 'ok';
  if (status === 'verified-with-caveat') return 'caveat';
  return status === 'rejected' ? 'rejected' : 'pending';
}

function VerificationBadges({ metric, readiness }: { metric: MetricDefinition; readiness: MetricReadiness }) {
  return (
    <>
      <span className={`imx-badge ${statusTone(metric.evidence.status)}`}>{VERIFICATION_LABELS[metric.evidence.status]}</span>
      {readiness.formulaTested ? <span className="imx-badge ok">Formula-tested</span> : <span className="imx-badge pending">Formula not tested</span>}
    </>
  );
}

function MetricDetail({ metric, readiness, industryNote, industryLabel, onSelect, isSelectable }: {
  metric: MetricDefinition;
  readiness: MetricReadiness;
  industryNote?: string;
  industryLabel: string;
  onSelect: (metricId: string) => void;
  isSelectable: (metricId: string) => boolean;
}) {
  const formula = getFormula(metric.formulaId);
  const variables = formula?.variables ?? [];
  const varById = new Map(variables.map((v) => [v.id, v]));
  const i = metric.interpretation;
  return (
    <article aria-labelledby="imx-detail-title">
      <h2 id="imx-detail-title">{metric.name}{metric.acronym ? ` (${metric.acronym})` : ''}</h2>
      <div className="imx-badges">
        <span className="imx-badge">{CATEGORY_LABEL[metric.category]}</span>
        <VerificationBadges metric={metric} readiness={readiness} />
        {metric.shared ? <span className="imx-badge">Shared cross-industry metric</span> : null}
      </div>

      <h3>Definition</h3>
      <p>{metric.definition}</p>
      {metric.evidence.caveats && metric.evidence.caveats.length > 0 ? (
        <div className="imx-caveats" role="note" aria-label="Caveats">
          <strong>Read with these caveats</strong>
          <ul>{metric.evidence.caveats.map((text) => <li key={text}>{text}</li>)}</ul>
        </div>
      ) : null}
      <h3>Why it matters</h3>
      <p>{metric.businessMeaning}</p>
      {industryNote ? (
        <>
          <h3>In {industryLabel}</h3>
          <p>{industryNote}</p>
        </>
      ) : <p className="imx-note">Not part of the {industryLabel} key-metric list; shown for reference.</p>}

      <h3>Formula</h3>
      <div className="imx-formula">{metric.name} = {formula?.expression ?? 'Formula unavailable'}</div>
      {variables.length > 0 ? (
        <table className="imx-table" aria-label="Formula variables">
          <thead><tr><th scope="col">Variable</th><th scope="col">Unit</th><th scope="col">Valid range</th></tr></thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.id}><td>{v.label}{v.meaning ? <div className="imx-note">{v.meaning}</div> : null}</td><td>{UNITS[v.unit].label}</td><td>{rangeText(v)}<div className="imx-note">{v.rangeNote}</div></td></tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <p className="imx-note">Output unit: {UNITS[metric.unit].label} · Frequency: {FREQUENCY_LABEL[metric.frequency] ?? metric.frequency} · Scope: {metric.reportingScope}</p>
      {metric.variants.length > 0 ? (
        <>
          <h3>Definition variants</h3>
          <ul>{metric.variants.map((text) => <li key={text}>{text}</li>)}</ul>
        </>
      ) : null}

      <h3>How to interpret movements</h3>
      <div className="imx-grid">
        <div className="imx-box"><h4>Higher generally means</h4><p>{i.higher}</p></div>
        <div className="imx-box"><h4>Lower generally means</h4><p>{i.lower}</p></div>
        <div className="imx-box"><h4>Exceptions</h4><ul>{i.exceptions.map((text) => <li key={text}>{text}</li>)}</ul></div>
        <div className="imx-box"><h4>Drivers</h4><ul>{i.drivers.map((text) => <li key={text}>{text}</li>)}</ul></div>
      </div>

      <h3>How managers use it</h3>
      <ul>{i.managementUses.map((text) => <li key={text}>{text}</li>)}</ul>
      <p className="imx-note">Case application: {metric.suggestedApplication}</p>
      <h3>Common pitfalls</h3>
      <ul>{i.pitfalls.map((text) => <li key={text}>{text}</li>)}</ul>

      <h3>Worked example</h3>
      <section className="imx-example" aria-label="Worked example">
        <div className="imx-example-label">{metric.example.label}</div>
        <p>{metric.example.scenario}</p>
        <table className="imx-table" aria-label="Example inputs">
          <tbody>
            {Object.entries(metric.example.inputs).map(([id, value]) => {
              const v = varById.get(id);
              return <tr key={id}><td>{v?.label ?? id}</td><td>{v ? formatValue(value, v.unit) : value}</td></tr>;
            })}
          </tbody>
        </table>
        <h4 style={{ marginTop: 10 }}>Assumptions</h4>
        <ul>{metric.example.assumptions.map((text) => <li key={text}>{text}</li>)}</ul>
        <h4>Calculation</h4>
        <ol>{metric.example.steps.map((text) => <li key={text}>{text}</li>)}</ol>
        <p className="imx-output">Result: {formatValue(metric.example.output, metric.unit)}</p>
        <p>{metric.example.interpretation}</p>
      </section>

      <h3>Sources and verification</h3>
      {metric.evidence.sources.length > 0 ? (
        <ul>
          {metric.evidence.sources.map((ref) => {
            const source = getSource(ref.sourceId);
            return (
              <li key={`${ref.sourceId}-${ref.locator}`}>
                {source ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a> : ref.sourceId}
                {source ? ` — ${source.publisher}` : ''}. {ref.locator}: {ref.confirms}
                {source ? <span className="imx-note"> (read {source.accessedOn})</span> : null}
              </li>
            );
          })}
        </ul>
      ) : <p>{metric.evidence.status === 'rejected' ? 'This metric was rejected and is not shown to learners.' : 'No authoritative source has been verified for this metric yet.'}</p>}
      <p className="imx-note">{metric.evidence.note}{metric.evidence.applicableStandard ? ` Standard: ${metric.evidence.applicableStandard}.` : ''}</p>
      {metric.evidence.review ? (
        <div className="imx-note">
          <p>Review on {metric.evidence.review.reviewedOn}{metric.evidence.review.checkedThisReview ? ' (searched in this review)' : ' (not re-researched in this review)'}.</p>
          {metric.evidence.review.sourcesChecked.length > 0 ? <ul>{metric.evidence.review.sourcesChecked.map((text) => <li key={text}>{text}</li>)}</ul> : null}
          {metric.evidence.review.nextStep ? <p>Next step: {metric.evidence.review.nextStep}</p> : null}
        </div>
      ) : null}

      <h3>Related metrics</h3>
      <div className="imx-related">
        {metric.relatedMetricIds.map((id) => {
          const related = getMetric(id);
          if (!related) return null;
          if (!isSelectable(id)) return null;
          const visibleToLearners = assessMetric(related).learnerReady;
          return (
            <button key={id} type="button" className="imx-link" onClick={() => onSelect(id)}
              title={visibleToLearners ? undefined : `${VERIFICATION_LABELS[related.evidence.status]} — review mode only, not shown to learners`}>
              {related.name}{visibleToLearners ? '' : ` (${VERIFICATION_LABELS[related.evidence.status].toLowerCase()})`}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default function MetricsExplorer({ initialCurriculumId, initialMetricId, allowPendingToggle = false }: MetricsExplorerProps) {
  const initial = subIndustryById(initialCurriculumId ?? '') ?? CATALOG_SUB_INDUSTRIES.find((s) => s.availability === 'implemented')!;
  const [groupId, setGroupId] = useState(initial.groupId);
  const [curriculumId, setCurriculumId] = useState(initial.id);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MetricCategory | 'all'>('all');
  const [includePendingChoice, setIncludePending] = useState(false);
  const includePending = allowPendingToggle && includePendingChoice;
  const [selectedId, setSelectedId] = useState<string | null>(initialMetricId ?? null);

  const subIndustries = useMemo(() => CATALOG_SUB_INDUSTRIES.filter((s) => s.groupId === groupId && s.availability === 'implemented'), [groupId]);
  const allRows: Row[] = useMemo(() => metricsForCurriculum(curriculumId).map((entry) => ({ ...entry, readiness: assessMetric(entry.metric) })), [curriculumId]);
  const visibleRows = useMemo(() => allRows.filter((row) => includePending || row.readiness.learnerReady), [allRows, includePending]);
  const shownRows = useMemo(() => searchMetrics(filterByCategory(visibleRows, category), query), [visibleRows, category, query]);
  const readyCount = allRows.filter((row) => row.readiness.learnerReady).length;
  const industryLabel = subIndustryById(curriculumId)?.label ?? curriculumId;

  const isSelectable = (metricId: string) => {
    const metric = getMetric(metricId);
    return Boolean(metric) && (includePending || assessMetric(metric!).learnerReady);
  };
  const activeId = selectedId && isSelectable(selectedId) ? selectedId : shownRows[0]?.metric.metricId ?? null;
  const activeMetric = activeId ? getMetric(activeId) : undefined;
  const activeRow = allRows.find((row) => row.metric.metricId === activeId);

  const changeGroup = (nextGroup: string) => {
    setGroupId(nextGroup);
    const first = CATALOG_SUB_INDUSTRIES.find((s) => s.groupId === nextGroup && s.availability === 'implemented');
    if (first) setCurriculumId(first.id);
    setSelectedId(null);
  };

  return (
    <div className="imx-root">
      <style>{STYLES}</style>
      <header className="imx-head">
        <h1>Industry Metrics Library</h1>
        <p>What each metric measures, how it is calculated, why it matters, how to read movements and how managers use it.</p>
      </header>

      <div className="imx-controls">
        <div className="imx-field">
          <label htmlFor="imx-group">Industry</label>
          <select id="imx-group" value={groupId} onChange={(e) => changeGroup(e.target.value)}>
            {CATALOG_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </div>
        <div className="imx-field">
          <label htmlFor="imx-sub">Sub-industry</label>
          <select id="imx-sub" value={curriculumId} onChange={(e) => { setCurriculumId(e.target.value); setSelectedId(null); }}>
            {subIndustries.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="imx-field">
          <label htmlFor="imx-search">Search by name or acronym</label>
          <input id="imx-search" type="search" value={query} placeholder="e.g. NIM, RevPAR, gross margin" onChange={(e) => setQuery(e.target.value)} />
        </div>
        {allowPendingToggle ? (
          <label className="imx-toggle">
            <input type="checkbox" checked={includePending} onChange={(e) => setIncludePending(e.target.checked)} />
            Include metrics pending verification or rejected (review mode only)
          </label>
        ) : null}
      </div>

      <div className="imx-chips" role="group" aria-label="Filter by category">
        <button type="button" className="imx-chip" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All categories</button>
        {METRIC_CATEGORIES.map((c) => (
          <button key={c.id} type="button" className="imx-chip" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</button>
        ))}
      </div>

      <div className="imx-body">
        <section className="imx-list" aria-label={`Key metrics for ${industryLabel}`}>
          <h2>Key metrics: {industryLabel}</h2>
          <p className="imx-summary">
            {includePending
              ? `${readyCount} learner-visible of ${allRows.length} authored · showing pending and rejected metrics for review.`
              : `${readyCount} ${readyCount === 1 ? 'metric' : 'metrics'} for this sub-industry.`}
          </p>
          {shownRows.length === 0 ? (
            <p className="imx-empty">
              {visibleRows.length === 0 ? 'No verified metrics are available for this sub-industry yet.' : 'No metrics match this search or category. Clear the search or choose “All categories”.'}
            </p>
          ) : (
            <ul>
              {shownRows.map((row) => (
                <li key={row.metric.metricId}>
                  <button type="button" className="imx-item" aria-current={row.metric.metricId === activeId} onClick={() => setSelectedId(row.metric.metricId)}>
                    <strong>{row.metric.name}{row.metric.acronym ? ` (${row.metric.acronym})` : ''}</strong>
                    <span className="imx-meta">
                      <span>{CATEGORY_LABEL[row.metric.category]}</span>
                      {row.priority === 'core' ? <span className="imx-badge core">Core</span> : null}
                      {row.readiness.learnerReady
                        ? (row.metric.evidence.status === 'verified-with-caveat' ? <span className="imx-badge caveat">Caveat</span> : null)
                        : <span className={`imx-badge ${statusTone(row.metric.evidence.status)}`}>{VERIFICATION_LABELS[row.metric.evidence.status]}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="imx-detail" aria-live="polite" aria-label="Metric detail">
          {activeMetric ? (
            <MetricDetail
              metric={activeMetric}
              readiness={assessMetric(activeMetric)}
              industryNote={activeRow?.interpretation}
              industryLabel={industryLabel}
              onSelect={setSelectedId}
              isSelectable={isSelectable}
            />
          ) : <p className="imx-empty">Select a metric to see its definition, formula and worked example.</p>}
        </section>
      </div>
    </div>
  );
}
