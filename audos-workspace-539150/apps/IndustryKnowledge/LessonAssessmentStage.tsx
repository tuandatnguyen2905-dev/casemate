import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { QuestionLike } from './lessonFlowCore';
import { autoAdvanceDelay, planAnswer, prefersReducedMotion } from './assessmentAutoAdvance';
import { uiAnswerAll, uiQuestionPosition, uiText } from './localization/uiText';

const shell = 'mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10';
const primaryButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none';
const secondaryButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40';
const eyebrow = 'text-[10px] font-bold uppercase tracking-[0.16em] text-red-600';
const backLink = 'inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-red-600';

/**
 * One chapter's Knowledge Check, one question at a time.
 * Choosing an option records the answer straight away and, except on the final question, moves on to the next
 * question after a short confirmation. The final question never advances by itself: the learner submits it.
 */
export function LessonAssessmentStage<Q extends QuestionLike>({
  lessonTitle, chapterLabel, questions, answers, index, onSelect, onMove, onSubmit, onExit,
}: {
  lessonTitle: string;
  chapterLabel: string;
  questions: Q[];
  answers: Record<string, string>;
  index: number;
  onSelect: (questionId: string, optionId: string) => void;
  onMove: (index: number) => void;
  onSubmit: () => void;
  onExit: () => void;
}) {
  const question = questions[index];
  const total = questions.length;
  const answered = questions.filter((item) => answers[item.id]).length;
  const allAnswered = answered === total;
  const isLast = index === total - 1;
  const firstUnanswered = questions.findIndex((item) => !answers[item.id]);

  const [pending, setPending] = useState<{ questionId: string; optionId: string } | null>(null);
  const pendingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const focusHeadingRef = useRef(false);
  // The timer fires after the answer has re-rendered the parent, so it must call the latest handlers, not the ones from the click.
  const latest = useRef({ onMove, answers });
  latest.current = { onMove, answers };

  const cancelPending = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingRef.current = false;
    setPending(null);
  };

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingRef.current = false;
  }, []);

  useEffect(() => {
    if (timerRef.current !== null) cancelPending();
    if (focusHeadingRef.current) {
      focusHeadingRef.current = false;
      headingRef.current?.focus();
    }
  }, [question?.id]);

  if (!question) return null;

  const choose = (optionId: string) => {
    const decision = planAnswer(question, optionId, index, total, pendingRef.current);
    if (!decision.accept) return;
    onSelect(question.id, optionId);
    if (decision.advanceTo === null) return;
    const target = decision.advanceTo;
    const questionId = question.id;
    pendingRef.current = true;
    setPending({ questionId, optionId });
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      pendingRef.current = false;
      setPending(null);
      // Only move on once the answer is really stored in the draft; otherwise stay so the learner can answer again.
      if (latest.current.answers[questionId] !== optionId) return;
      focusHeadingRef.current = true;
      latest.current.onMove(target);
    }, autoAdvanceDelay(prefersReducedMotion()));
  };

  const go = (target: number) => {
    cancelPending();
    onMove(target);
  };

  /** Arrow keys move focus between options; Enter or Space chooses, so browsing options never advances the check. */
  const onOptionKey = (event: { key: string; preventDefault: () => void; currentTarget: HTMLElement }, optionIndex: number) => {
    const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (optionIndex + step + question.options.length) % question.options.length;
    (event.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  const current = answers[question.id];
  const feedback = pending
    ? `Answer recorded. Moving to question ${index + 2} of ${total}…`
    : current ? (isLast ? 'Answer recorded. You can change it before you submit.' : 'Answer recorded.') : '';

  return (
    <main className={shell} data-testid="lesson-assessment">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onExit} className={backLink}><ArrowLeft className="h-3.5 w-3.5" /> {uiText('Back to chapter')}</button>
        <span className="truncate text-xs font-semibold text-slate-400">{lessonTitle}</span>
      </div>
      <p className={`mt-5 ${eyebrow}`}>{chapterLabel}</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <h1 className="text-xl font-black tracking-tight text-slate-900">{uiText('Knowledge Check')}</h1>
        <span className="text-xs font-semibold text-slate-500" data-testid="assessment-position">{uiQuestionPosition(index + 1, total, answered)}</span>
      </div>
      {total > 1 && (
        <div className="mt-3 flex gap-1" role="list" aria-label="Knowledge Check progress">
          {questions.map((item, position) => (
            <button
              key={item.id}
              type="button"
              role="listitem"
              onClick={() => go(position)}
              aria-label={`Question ${position + 1}${answers[item.id] ? ', answered' : ', not answered'}`}
              aria-current={position === index ? 'step' : undefined}
              className={`h-1.5 flex-1 rounded-full transition motion-reduce:transition-none ${position === index ? 'bg-red-600' : answers[item.id] ? 'bg-slate-400' : 'bg-slate-200 hover:bg-slate-300'}`}
            />
          ))}
        </div>
      )}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby={`question-${question.id}`}>
        <h2 id={`question-${question.id}`} ref={headingRef} tabIndex={-1} className="text-base font-bold leading-7 text-slate-900 outline-none sm:text-lg">{question.question}</h2>
        <div className="mt-5 space-y-3" role="radiogroup" aria-labelledby={`question-${question.id}`}>
          {question.options.map((option, optionIndex) => {
            const selected = current === option.id;
            const dimmed = Boolean(pending) && !selected;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-disabled={pending ? true : undefined}
                tabIndex={selected || (!current && optionIndex === 0) ? 0 : -1}
                data-testid={`option-${option.id}`}
                onClick={() => choose(option.id)}
                onKeyDown={(event) => onOptionKey(event, optionIndex)}
                className={`flex w-full touch-manipulation items-start gap-3 rounded-xl border p-3.5 text-left text-sm leading-6 transition motion-reduce:transition-none ${pending ? 'cursor-default' : ''} ${dimmed ? 'opacity-60' : ''} ${selected ? 'border-red-500 bg-red-50/60 text-slate-900 ring-1 ring-red-500' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${selected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{selected ? <Check className="h-3.5 w-3.5" aria-hidden /> : String.fromCharCode(65 + optionIndex)}</span>
                <span className="min-w-0 flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 min-h-5 text-xs font-semibold text-slate-500" role="status" aria-live="polite" data-testid="answer-feedback">{feedback}</p>
      </section>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {total > 1 ? <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className={secondaryButton}><ArrowLeft className="h-4 w-4" /> {uiText('Previous')}</button> : <span />}
        {isLast ? (
          <button type="button" onClick={onSubmit} disabled={!allAnswered} className={primaryButton} data-testid="submit-assessment">{uiText('Submit')}</button>
        ) : (
          <button type="button" onClick={() => go(index + 1)} className={secondaryButton} data-testid="assessment-next">{uiText('Next')} <ArrowRight className="h-4 w-4" /></button>
        )}
      </div>
      {isLast && !allAnswered && total > 1 && (
        <p className="mt-3 text-right text-xs text-slate-500">
          {uiAnswerAll(total)}{' '}
          {firstUnanswered >= 0 && <button type="button" onClick={() => go(firstUnanswered)} className="font-semibold text-red-600 underline underline-offset-2">Go to question {firstUnanswered + 1}</button>}
        </p>
      )}
    </main>
  );
}
