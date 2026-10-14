import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, RotateCcw, Target } from 'lucide-react';
import ExhibitRenderer from './ExhibitRenderer';
import { casePoolCaseIdForJourney, journeyFor, nextInJourney } from '../lib/caseJourneys';
import { tw } from '../lib/colors';
import { ALL_LIBRARY_QUESTIONS } from '../lib/skillQuestionLibrary';
import type { LibraryQuestion } from '../lib/skillQuestionLibrary';
import { scoreExpertResponse } from '../lib/expertDrillScoring';
import type { ExpertResponse } from '../lib/expertDrillScoring';

const EMPTY_RESPONSE: ExpertResponse = {
  calculation: '',
  keyInsight: '',
  supportingEvidence: '',
  businessImplication: '',
  recommendedAction: '',
};

interface Props {
  question: LibraryQuestion;
  onBack: () => void;
  onOpenQuestion: (question: LibraryQuestion) => void;
  onSubmitted: () => void;
}

function levelTone(level: string): string {
  if (level === 'Expert') return 'bg-[color-mix(in_srgb,var(--space-semantic-success)_14%,transparent)] text-[var(--space-semantic-success-700)]';
  if (level === 'Strong') return 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]';
  if (level === 'Developing') return 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning-700)]';
  return 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_12%,transparent)] text-[var(--space-semantic-danger-700)]';
}

function Field({ id, label, help, value, rows = 4, onChange }: { id: string; label: string; help: string; value: string; rows?: number; onChange: (value: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[var(--space-text-primary)]">{label}</label>
      <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-muted)]">{help}</p>
      <textarea id={id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className={`${tw.input.base} ${tw.input.default} mt-2 text-sm leading-6`} />
    </div>
  );
}

export default function ExpertDrillExperience({ question, onBack, onOpenQuestion, onSubmitted }: Props) {
  const [response, setResponse] = useState<ExpertResponse>(EMPTY_RESPONSE);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const result = useMemo(() => submitted ? scoreExpertResponse(question, response) : null, [question, response, submitted]);
  const journey = journeyFor(question);
  const casePoolCaseId = casePoolCaseIdForJourney(journey?.id);
  const nextDrill = nextInJourney(question);
  // Inside a journey the next stage always wins over the generic suggestion,
  // so the candidate continues the same business decision rather than jumping.
  const recommended = nextDrill || ALL_LIBRARY_QUESTIONS.find((item) => item.id === question.recommendedNextDrillId) || null;
  const exhibits = question.exhibits || [];
  const isHard = question.difficulty === 'hard';

  const update = (key: keyof ExpertResponse, value: string) => {
    setResponse((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const submit = () => {
    const required = [response.keyInsight, response.supportingEvidence, response.businessImplication, response.recommendedAction];
    if (question.calculationRequired) required.unshift(response.calculation);
    if (required.some((value) => !value.trim())) {
      setError(isHard
        ? 'Complete Key Observation, Key Insight, Business Implication, and Recommended Next Step before submitting.'
        : 'Complete every required section before submitting. Expert responses must connect evidence, insight, implication, and action.');
      return;
    }
    setSubmitted(true);
    try { localStorage.setItem(`casemate-expert-completed:${question.id}`, new Date().toISOString()); } catch { /* Completion tracking is best-effort. */ }
    onSubmitted();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setResponse(EMPTY_RESPONSE);
    setSubmitted(false);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-5" data-testid={`expert-drill-${question.id}`}>
      <button type="button" onClick={onBack} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.ghost}`}>
        <ArrowLeft className="h-4 w-4" /> Back To Question Library
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isHard ? 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]' : 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]'}`}>{isHard ? 'Hard' : 'Expert'}</span>
        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{question.drillType}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{isHard ? '2 connected exhibits' : '2–3 connected exhibits'}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">Insight and implication required</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{question.estimatedMinutes} min</span>
      </div>

      {journey ? (
        <section className="mt-4 rounded-2xl border border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4 sm:p-5" data-testid="journey-framing">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">
            Case Journey · {question.journeyStageRole}
          </p>
          <h2 className="mt-1 text-base font-bold text-[var(--space-text-primary)]">{journey.name}</h2>
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Your role</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{journey.role}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">The decision</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{journey.decision}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Timeframe</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{journey.timeframe}</dd></div>
          </dl>
          {casePoolCaseId ? (
            <button
              type="button"
              onClick={() => {
                try { sessionStorage.setItem('casemate-open-case-pool', casePoolCaseId); } catch { /* best effort */ }
                window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill-log' } }));
              }}
              className={`mt-3 inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold ${tw.button.primary}`}
              data-testid="journey-case-pool-link"
            >
              Solve the full case <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </section>
      ) : null}

      <div className="mt-4">
        <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 sm:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{question.industry} · {question.businessProblem}</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-[var(--space-text-primary)]">{question.title}</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]">{question.businessContext}</p>
          <div className="mt-4 rounded-xl border-l-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Client objective</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{question.clientObjective}</p>
          </div>
        </section>

        <div className="mt-4">
          <ExhibitRenderer exhibits={exhibits} displayMode="advanced" />
        </div>

        <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 sm:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Question</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[var(--space-text-brand)]">{question.instruction}</p>
          <p className="mt-2 text-base font-bold leading-7 text-[var(--space-text-primary)]">{question.question}</p>
          <p className="mt-3 text-xs text-[var(--space-text-muted)]"><span className="font-bold">Primary consulting skill:</span> {question.primarySkill}</p>
        </section>

        <div className="mt-4 space-y-4">
          {!submitted ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6" data-testid="expert-answer-area">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Structured {isHard ? 'Hard' : 'Expert'} Answer</p>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{isHard ? 'Use specific exhibit values, then explain what they mean. Keep the path direct and decision-focused.' : 'Reference at least Exhibit 1 and Exhibit 2 with specific numbers. A correct number without interpretation cannot receive a high score.'}</p>
              <div className="mt-5 space-y-5">
                {question.calculationRequired ? <Field id="expert-calculation" label="Calculation" help="Show formulas, units, assumptions, and the reconciled result before interpreting it." value={response.calculation} onChange={(value) => update('calculation', value)} rows={5} /> : null}
                {isHard ? <Field id="hard-observation" label="1. Key Observation" help="State what the exhibits show, using the decisive values. Keep interpretation for the next field." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={5} /> : null}
                <Field id="expert-insight" label={`${isHard ? '2' : '1'}. Key Insight`} help="State the most important conclusion and underlying reason in 1–2 sentences." value={response.keyInsight} onChange={(value) => update('keyInsight', value)} />
                {!isHard ? <Field id="expert-evidence" label="2. Supporting Evidence" help="Cite at least two exhibits and use specific, reconciled numbers." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={5} /> : null}
                <Field id="expert-implication" label="3. Business Implication" help="Explain why the insight matters to the client objective, economics, or risk." value={response.businessImplication} onChange={(value) => update('businessImplication', value)} />
                <Field id="expert-action" label={`4. ${isHard ? 'Recommended Next Step' : 'Recommended Action'}`} help="Recommend what management should do or investigate next, with a practical decision gate." value={response.recommendedAction} onChange={(value) => update('recommendedAction', value)} rows={5} />
              </div>
              {error ? <p className="mt-4 text-sm font-semibold text-[var(--space-semantic-danger)]">{error}</p> : null}
              <button type="button" onClick={submit} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary}`} data-testid="button-submit-expert-answer"><Check className="h-4 w-4" /> Submit For {isHard ? 'Hard' : 'Expert'} Feedback</button>
            </section>
          ) : result ? (
            <section className="space-y-4" data-testid="expert-feedback">
              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">1. Overall Score</p>
                <div className="mt-3 flex items-end gap-3"><span className="text-5xl font-black tabular-nums text-[var(--space-text-primary)]">{result.score}</span><span className="pb-1 text-lg font-bold text-[var(--space-text-muted)]">/ 100</span><span className={`ml-auto rounded-full px-3 py-1.5 text-xs font-bold ${levelTone(result.level)}`}>{result.level}</span></div>
                <div className="mt-4 space-y-2">{result.breakdown.map((item) => <div key={item.label}><div className="flex justify-between gap-3 text-xs"><span className="font-semibold text-[var(--space-text-secondary)]">{item.label}</span><span className="font-bold tabular-nums text-[var(--space-text-primary)]">{item.score}/{item.maximum}</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"><div className="h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${item.score / item.maximum * 100}%` }} /></div></div>)}</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-semantic-success)]">2. Strongest Part</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.strongestPart}</p></div>
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-semantic-warning)]">3. Most Important Missing Insight</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.missingInsight}</p></div>
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">4. Evidence Used Correctly</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.evidenceUsed.join(' · ')}</p></div>
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">5. Evidence Overlooked Or Misinterpreted</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.evidenceOverlooked.join(' · ')}</p></div>
                {!isHard ? <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">6. Business Implication Quality</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.implicationFeedback}</p></div> : null}
                {!isHard ? <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">7. Recommendation Quality</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{result.recommendationFeedback}</p></div> : null}
              </div>

              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Observation → Insight → Implication → Action</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">{[['Observation', 'What the data shows'], ['Insight', 'What explains it'], ['Implication', 'Why it matters'], ['Action', 'What management should do']].map(([label, copy]) => <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] p-3"><p className="text-xs font-bold text-[var(--space-text-primary)]">{label}</p><p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">{copy}</p></div>)}</div>
              </div>

              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{isHard ? '6' : '8'}. {question.skill === 'creativity' ? 'One Possible Answer Path' : 'Model Answer'}</p>{question.skill === 'creativity' ? <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">Multiple structures can work; this is one clear, evidence-backed route rather than a required framework.</p> : null}<pre className="mt-3 whitespace-pre-wrap font-[inherit] text-sm leading-6 text-[var(--space-text-secondary)]">{question.correctAnswer}</pre>{question.alternativeConclusions?.length ? <div className="mt-4"><p className="text-xs font-bold text-[var(--space-text-primary)]">Acceptable alternative conclusions</p><ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--space-text-secondary)]">{question.alternativeConclusions.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}</div>

              <div className="rounded-2xl border border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-5"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{isHard ? '7' : '9'}. {nextDrill ? 'Next In This Journey' : 'Recommended Next Drill'}</p>{recommended ? <><p className="mt-2 text-sm font-bold text-[var(--space-text-primary)]">{recommended.title}</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{nextDrill ? `${recommended.journeyStageRole} · ` : ''}{recommended.drillType} · {recommended.estimatedMinutes} min</p><button type="button" onClick={() => onOpenQuestion(recommended)} className={`mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.primary}`} data-testid="button-next-in-journey">{nextDrill ? 'Continue The Journey' : 'Open Next Drill'} <ChevronRight className="h-4 w-4" /></button></> : <p className="mt-2 text-sm text-[var(--space-text-secondary)]">{journey ? 'You have finished this journey. Pick another journey or drill in the library.' : `Choose another ${isHard ? 'Hard' : 'Expert'} drill in the library.`}</p>}</div>

              <button type="button" onClick={reset} className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}><RotateCcw className="h-4 w-4" /> Retry This Drill</button>
            </section>
          ) : null}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-xs leading-5 text-[var(--space-text-muted)]"><Target className="mr-1 inline h-3.5 w-3.5" /> Scoring guardrail: correct numbers alone cannot earn a high score without interpretation, business implication, and an evidence-linked recommendation{isHard ? '.' : ' supported by multiple exhibits.'}</div>
    </div>
  );
}
